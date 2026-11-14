#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="${FLUVIO_SSH_HOST:-GrafanaFluvio}"
SOURCE="${SIWIS_SOURCE:-$ROOT/../../SIWIS-Custom-Forms/server.js}"
TEMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TEMP_DIR"' EXIT
# Read the same email settings as SIWIS without printing or committing secrets.
python3 - "$SOURCE" "$TEMP_DIR/enquiry.env" <<'PY'
import os,re,sys
from pathlib import Path
source=Path(sys.argv[1]).read_text()
settings={}
for key in ['SMTP_HOST','SMTP_PORT','SMTP_USER','SMTP_PASS','SUPPORT_TO_EMAIL']:
 value=os.environ.get(key)
 if not value:
  match=re.search(r'process\.env\.'+key+r"\s*\|\|\s*'([^']*)'",source)
  if not match: raise SystemExit('Set '+key+' in your environment before deploying')
  value=match.group(1)
 settings[key]=value
p=Path(sys.argv[2]);p.touch(mode=0o600)
p.write_text('\n'.join(k+'="'+v.replace('\\','\\\\').replace('"','\\"')+'"' for k,v in settings.items())+'\n')
PY
ssh "$TARGET" 'mkdir -p /tmp/fluvio-enquiry-upload && chmod 700 /tmp/fluvio-enquiry-upload'
scp "$ROOT"/server/enquiry/{package.json,package-lock.json,handler.mjs,server.mjs} "$TEMP_DIR/enquiry.env" "$TARGET:/tmp/fluvio-enquiry-upload/"
ssh "$TARGET" 'bash -s' <<'REMOTE'
set -euo pipefail
sudo mkdir -p /opt/fluvio-enquiry
sudo cp /tmp/fluvio-enquiry-upload/{package.json,package-lock.json,handler.mjs,server.mjs} /opt/fluvio-enquiry/
sudo install -m 600 /tmp/fluvio-enquiry-upload/enquiry.env /etc/fluvio-enquiry.env
rm -rf /tmp/fluvio-enquiry-upload
cd /opt/fluvio-enquiry
# sudo drops user PATH (including nvm). Keep an isolated runtime outside /home
# so DynamicUser + ProtectHome can execute it reliably.
if ! command -v node >/dev/null || ! command -v npm >/dev/null; then
  if [ -s "$HOME/.nvm/nvm.sh" ]; then
    set +u
    . "$HOME/.nvm/nvm.sh"
    set -u
  fi
fi
RUNTIME=/opt/fluvio-enquiry-runtime
if command -v node >/dev/null && command -v npm >/dev/null; then
  NODE_SOURCE="$(readlink -f "$(command -v node)")"
  NPM_CLI="$(readlink -f "$(command -v npm)")"
  NPM_ROOT="$(dirname "$(dirname "$NPM_CLI")")"
  test -f "$NPM_ROOT/bin/npm-cli.js"
  sudo mkdir -p "$RUNTIME/bin" "$RUNTIME/lib/node_modules"
  sudo cp "$NODE_SOURCE" "$RUNTIME/bin/node"
  sudo cp -R "$NPM_ROOT" "$RUNTIME/lib/node_modules/npm"
else
  # Use an isolated, checksum-verified Node release if this host has no runtime.
  case "$(uname -m)" in
    x86_64) NODE_ARCH=x64 ;;
    aarch64|arm64) NODE_ARCH=arm64 ;;
    *) echo 'Unsupported server architecture'; exit 1 ;;
  esac
  NODE_VERSION=v22.22.3
  NODE_ARCHIVE="node-$NODE_VERSION-linux-$NODE_ARCH.tar.xz"
  RUNTIME_TMP="$(mktemp -d)"
  (
    cd "$RUNTIME_TMP"
    curl -fsSLO "https://nodejs.org/dist/$NODE_VERSION/$NODE_ARCHIVE"
    curl -fsSLO "https://nodejs.org/dist/$NODE_VERSION/SHASUMS256.txt"
    awk -v archive="$NODE_ARCHIVE" '$2 == archive { print }' SHASUMS256.txt > checksum.txt
    test -s checksum.txt
    sha256sum -c checksum.txt
    sudo mkdir -p "$RUNTIME"
    sudo tar -xJf "$NODE_ARCHIVE" --strip-components=1 -C "$RUNTIME"
  )
  rm -rf "$RUNTIME_TMP"
fi
NODE_BIN="$RUNTIME/bin/node"
sudo "$NODE_BIN" -e 'if (+process.versions.node.split(".")[0] < 18) process.exit(1)'
sudo env PATH="$RUNTIME/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin" \
  "$NODE_BIN" "$RUNTIME/lib/node_modules/npm/bin/npm-cli.js" ci --omit=dev --ignore-scripts
sudo tee /etc/systemd/system/fluvio-enquiry.service >/dev/null <<SERVICE
[Unit]
Description=Fluvio website enquiries
After=network-online.target
[Service]
Type=simple
DynamicUser=yes
WorkingDirectory=/opt/fluvio-enquiry
EnvironmentFile=/etc/fluvio-enquiry.env
ExecStart=$NODE_BIN /opt/fluvio-enquiry/server.mjs
Restart=on-failure
RestartSec=5
NoNewPrivileges=yes
ProtectSystem=strict
ProtectHome=yes
PrivateTmp=yes
[Install]
WantedBy=multi-user.target
SERVICE
sudo systemctl daemon-reload
sudo systemctl enable fluvio-enquiry
sudo systemctl restart fluvio-enquiry
for attempt in $(seq 1 20); do
 if curl -fsS http://127.0.0.1:3311/health >/dev/null; then break; fi
 sleep 1
done
curl -fsS http://127.0.0.1:3311/health >/dev/null || { echo 'SMTP verification or service startup failed. Check sudo journalctl -u fluvio-enquiry'; exit 1; }
sudo python3 - <<'PY'
import subprocess,re,time
from pathlib import Path
config=subprocess.check_output(['nginx','-T'],stderr=subprocess.DEVNULL).decode()
sections=re.split(r'# configuration file ([^\n]+):\n',config)
files=[]
for i in range(1,len(sections),2):
 if re.search(r'server_name\s+[^;]*\bdata\.fluvio\.com\.au\b',sections[i+1]): files.append(Path(sections[i]))
files=list(dict.fromkeys(files))
if not files: raise SystemExit('Cannot locate data.fluvio.com.au nginx server. No nginx changes made.')
location='''    # Fluvio website enquiry endpoint
    location = /api/website-enquiry {
        client_max_body_size 16k;
        proxy_pass http://127.0.0.1:3311;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
        proxy_read_timeout 25s;
    }
'''
backups=[]
for p in files:
 s=p.read_text()
 if 'location = /api/website-enquiry' in s: continue
 backup_dir=Path('/var/backups/fluvio-enquiry');backup_dir.mkdir(parents=True,exist_ok=True)
 backup=backup_dir/(str(p).replace('/','_')+'.'+str(int(time.time())))
 backup.write_text(s);backups.append((p,s))
 s=re.sub(r'(^[ \t]*server_name\s+[^;]*\bdata\.fluvio\.com\.au\b[^;]*;)',lambda m:location+m.group(1),s,flags=re.M)
 p.write_text(s)
try: subprocess.run(['nginx','-t'],check=True)
except Exception:
 for p,s in backups: p.write_text(s)
 raise
subprocess.run(['systemctl','reload','nginx'],check=True)
PY
printf '\nEnquiry service installed; SMTP login verified. No test email sent.\n'
REMOTE
curl --fail --silent --show-error -X OPTIONS 'https://data.fluvio.com.au/api/website-enquiry' \
  -H 'Origin: https://fluvio-research.github.io' -H 'Access-Control-Request-Method: POST'
printf '\nEnquiry endpoint ready. Now push the website.\n'
