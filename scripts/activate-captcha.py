#!/usr/bin/env python3
"""Run locally after publishing the website. Secrets travel only over SSH stdin."""
import getpass
import json
import os
from pathlib import Path
import subprocess
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
SITE_KEY = '6LcjiiIuAAAAAAVec0VSmoyKtrllkvtmuj5M6PZH'
TARGET = os.environ.get('FLUVIO_SSH_HOST', 'GrafanaFluvio')
URL = 'https://fluvio-research.github.io/Fluvio.com/contact/'
REMOTE = r'''
import json, os, shutil, sys, time
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError
value = json.load(sys.stdin)
# Check API access without sending an email or any visitor information.
request = Request(
    'https://recaptchaenterprise.googleapis.com/v1/projects/fluvio-sense-app/assessments',
    data=json.dumps({'event': {'token': 'configuration-check-invalid-token', 'siteKey': value['site'], 'expectedAction': 'enquiry'}}).encode(),
    headers={'Content-Type': 'application/json', 'X-Goog-Api-Key': value['api']}, method='POST')
try:
    with urlopen(request, timeout=15) as response:
        assessment = json.load(response)
    if 'tokenProperties' not in assessment:
        raise ValueError('Missing assessment')
except HTTPError as error:
    raise SystemExit('Google rejected API access (HTTP %s). Check API enablement, key restrictions and project. No settings changed.' % error.code)
except Exception:
    raise SystemExit('Could not verify Google API access. No settings changed.')
path = Path('/etc/fluvio-enquiry.env')
if not path.exists():
    raise SystemExit('Enquiry service configuration is missing.')
backup = Path('/var/backups/fluvio-enquiry')
backup.mkdir(parents=True, exist_ok=True)
backup_file = backup / ('captcha-env-' + str(int(time.time())))
shutil.copyfile(str(path), str(backup_file))
os.chmod(str(backup_file), 0o600)
lines = [line for line in path.read_text().splitlines() if not line.startswith('RECAPTCHA_')]
settings = {'RECAPTCHA_PROJECT_ID': 'fluvio-sense-app', 'RECAPTCHA_SITE_KEY': value['site'], 'RECAPTCHA_API_KEY': value['api'], 'RECAPTCHA_ENABLED': 'true', 'RECAPTCHA_MIN_SCORE': '0.5'}
lines.extend(key + '=' + json.dumps(val) for key, val in settings.items())
fd = os.open(str(path), os.O_WRONLY | os.O_TRUNC, 0o600)
os.fchmod(fd, 0o600)
with os.fdopen(fd, 'w') as out:
    out.write('\n'.join(lines) + '\n')
print('Google API access verified. CAPTCHA settings saved; previous configuration backed up securely.')
'''

def main():
    print('Checking that the public contact page has the new site key...')
    with urllib.request.urlopen(URL, timeout=20) as response:
        html = response.read().decode()
    if SITE_KEY not in html:
        raise SystemExit('Publish the website first and wait for GitHub Actions to finish, then run this script again.')
    subprocess.run(['ssh', TARGET, 'sudo -n true'], check=True)
    secret = getpass.getpass('Paste your private Google API key (hidden): ').strip()
    if not secret or not all(c.isalnum() or c in '_-' for c in secret):
        raise SystemExit('Invalid API key format; no changes made.')
    subprocess.run(['bash', str(ROOT / 'scripts/deploy-enquiry.sh')], check=True)
    import shlex
    subprocess.run(['ssh', TARGET, 'sudo -n python3 -c ' + shlex.quote(REMOTE)],
                   input=json.dumps({'api': secret, 'site': SITE_KEY}), text=True, check=True)
    subprocess.run(['ssh', TARGET, 'sudo systemctl restart fluvio-enquiry && sleep 2 && sudo systemctl is-active fluvio-enquiry && curl --fail --silent http://127.0.0.1:3311/health'], check=True)
    print('\nCAPTCHA enforcement enabled. Submit one labelled test enquiry on the deployed site and confirm receipt in the mailbox. No test email was sent by this script.')

if __name__ == '__main__':
    try:
        main()
    except subprocess.CalledProcessError:
        raise SystemExit('A deployment step failed. Review the message above; activation is not confirmed.')
    except (OSError, ValueError):
        raise SystemExit('Unable to complete the connection or configuration. Activation is not confirmed.')
