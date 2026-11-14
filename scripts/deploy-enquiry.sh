#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="${FLUVIO_SSH_HOST:-GrafanaFluvio}"
ssh "$TARGET" 'sudo systemctl stop fluvio-enquiry; mkdir -p /tmp/fluvio-enquiry-upload && chmod 700 /tmp/fluvio-enquiry-upload'
scp "$ROOT"/server/enquiry/{server.py,import_grafana_smtp.py} "$TARGET:/tmp/fluvio-enquiry-upload/"
ssh "$TARGET" 'bash -s' <<'REMOTE'
set -euo pipefail
sudo mkdir -p /opt/fluvio-enquiry
sudo cp /tmp/fluvio-enquiry-upload/server.py /opt/fluvio-enquiry/
sudo python3 /tmp/fluvio-enquiry-upload/import_grafana_smtp.py
rm -rf /tmp/fluvio-enquiry-upload
cd /opt/fluvio-enquiry
PYTHON_BIN="$(command -v python3)"
"$PYTHON_BIN" -c 'import sys, ssl, smtplib; assert sys.version_info >= (3, 6), "Python 3.6+ required"'
sudo tee /etc/systemd/system/fluvio-enquiry.service >/dev/null <<SERVICE
[Unit]
Description=Fluvio website enquiries
After=network-online.target
[Service]
Type=simple
User=nobody
WorkingDirectory=/opt/fluvio-enquiry
EnvironmentFile=/etc/fluvio-enquiry.env
ExecStart=$PYTHON_BIN /opt/fluvio-enquiry/server.py
Restart=on-failure
RestartSec=5
RestartPreventExitStatus=78
NoNewPrivileges=yes
ProtectSystem=full
ProtectHome=yes
PrivateTmp=yes
[Install]
WantedBy=multi-user.target
SERVICE
sudo systemctl daemon-reload
sudo systemctl enable fluvio-enquiry
sudo systemctl restart fluvio-enquiry
for attempt in $(seq 1 40); do
 if curl -fsS http://127.0.0.1:3311/health >/dev/null 2>&1; then break; fi
 if sudo systemctl is-failed --quiet fluvio-enquiry; then break; fi
 sleep 1
done
curl -fsS http://127.0.0.1:3311/health >/dev/null || { echo 'Email service did not start; diagnostics:'; sudo journalctl -u fluvio-enquiry -n 8 --no-pager; exit 1; }
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
