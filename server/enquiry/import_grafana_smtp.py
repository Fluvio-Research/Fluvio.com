"""Import active Grafana SMTP configuration locally; never print credentials."""
import configparser
import os
import re
import subprocess
from pathlib import Path

def resolve(value, env):
    value = value.strip()
    if value.startswith('"""') and value.endswith('"""'):
        value = value[3:-3]
    value = re.sub(r'\$__env\{([^}]+)\}|\$\{([^}]+)\}', lambda m: env.get(m.group(1) or m.group(2), ''), value)
    value = re.sub(r'\$__file\{([^}]+)\}', lambda m: Path(m.group(1)).read_text().strip(), value)
    if '$__' in value:
        raise ValueError('Unsupported Grafana secret provider; configure SMTP explicitly')
    return value

def get_main_pid():
    output = subprocess.check_output(['systemctl', 'show', 'grafana-server', '--property=MainPID']).decode()
    properties = dict(line.split('=', 1) for line in output.splitlines() if '=' in line)
    return properties.get('MainPID', '').strip()

def main():
    pid = get_main_pid()
    if not pid.isdigit() or pid == '0':
        raise ValueError('Grafana is not running; cannot read its active configuration')
    env = dict(entry.decode().split('=', 1) for entry in Path('/proc/' + pid + '/environ').read_bytes().split(b'\0') if b'=' in entry)
    args = [x.decode() for x in Path('/proc/' + pid + '/cmdline').read_bytes().split(b'\0') if x]
    config_path = env.get('GF_PATHS_CONFIG', '/etc/grafana/grafana.ini')
    for index, arg in enumerate(args):
        if arg.startswith('--config=') or arg.startswith('-config='):
            config_path = arg.split('=', 1)[1]
        elif arg in ('--config', '-config') and index + 1 < len(args):
            config_path = args[index + 1]
    config = configparser.ConfigParser(interpolation=None, strict=False)
    config.read(config_path)
    def setting(key, default=''):
        value = env.get('GF_SMTP_' + key.upper(), config.get('smtp', key, fallback=default))
        for arg in args:
            prefix = 'cfg:smtp.' + key + '='
            if arg.startswith(prefix) and 'GF_SMTP_' + key.upper() not in env:
                value = arg[len(prefix):]
        return resolve(value, env)
    if setting('enabled', 'false').lower() != 'true':
        raise ValueError('SMTP is not enabled in active Grafana configuration')
    host_port = setting('host')
    if ':' not in host_port:
        raise ValueError('Grafana SMTP host must include a port')
    host, port = host_port.rsplit(':', 1)
    user, password = setting('user'), setting('password')
    if bool(user) != bool(password):
        raise ValueError('Grafana SMTP username/password configuration is incomplete')
    if setting('cert_file') or setting('key_file'):
        raise ValueError('SMTP client certificates need explicit configuration')
    settings = {'SMTP_HOST':host.strip('[]'), 'SMTP_PORT':str(int(port)), 'SMTP_USER':user, 'SMTP_PASS':password,
                'SMTP_FROM':setting('from_address', user), 'SUPPORT_TO_EMAIL':'info@fluvio.com.au'}
    if not settings['SMTP_FROM']:
        raise ValueError('Grafana SMTP sender is missing')
    if any('\n' in value or '\r' in value for value in settings.values()):
        raise ValueError('Unexpected newline in SMTP configuration')
    target = '/etc/fluvio-enquiry.env'
    fd = os.open(target, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    os.fchmod(fd, 0o600)
    with os.fdopen(fd, 'w') as out:
        out.write('\n'.join(key + '="' + value.replace('\\', '\\\\').replace('"', '\\"') + '"' for key, value in settings.items()) + '\n')
    print('Imported active Grafana SMTP settings. No credentials displayed.')

if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        # Configuration errors only; do not echo source content or secret values.
        if isinstance(error, ValueError) and not isinstance(error, configparser.Error):
            raise SystemExit(str(error))
        raise SystemExit('Could not read active Grafana SMTP configuration: ' + type(error).__name__)
