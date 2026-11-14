"""Fluvio enquiry endpoint. Uses Python 3 standard library only."""
import json
import os
import re
import smtplib
import ssl
import threading
import time
from email.message import EmailMessage
from http.server import BaseHTTPRequestHandler, HTTPServer
from socketserver import ThreadingMixIn

ORIGINS = {'https://fluvio.com.au', 'https://www.fluvio.com.au', 'https://fluvio-research.github.io'}

def validate(data):
    if not isinstance(data, dict) or data.get('website'):
        return None
    clean = {}
    for key, limit in [('name', 100), ('email', 254), ('organisation', 150), ('location', 200), ('message', 4000)]:
        value = data.get(key, '')
        if not isinstance(value, str) or len(value.strip()) > limit:
            return None
        clean[key] = value.strip()
    if not clean['name'] or '\n' in clean['name'] or '\r' in clean['name']:
        return None
    if not re.fullmatch(r'[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+', clean['email']):
        return None
    return clean if len(clean['message']) >= 10 else None

def connect_smtp():
    port = int(os.environ.get('SMTP_PORT', '587'))
    context = ssl.create_default_context()
    if port == 465:
        client = smtplib.SMTP_SSL(os.environ['SMTP_HOST'], port, timeout=15, context=context)
    else:
        client = smtplib.SMTP(os.environ['SMTP_HOST'], port, timeout=15)
        try:
            client.ehlo()
            client.starttls(context=context)
            client.ehlo()
        except Exception:
            client.close()
            raise
    try:
        client.login(os.environ['SMTP_USER'], os.environ['SMTP_PASS'])
    except Exception:
        client.close()
        raise
    return client

def build_message(value):
    message = EmailMessage()
    message['From'] = os.environ['SMTP_USER']
    message['To'] = os.environ.get('SUPPORT_TO_EMAIL', 'info@fluvio.com.au')
    message['Reply-To'] = value['email']
    message['Subject'] = 'Fluvio website: project enquiry'
    message.set_content('Name: {name}\nEmail: {email}\nOrganisation: {organisation}\nLocation: {location}\n\n{message}'.format(**value))
    return message

def send_email(value):
    with connect_smtp() as client:
        rejected = client.send_message(build_message(value))
        if rejected:
            raise RuntimeError('Recipient rejected')

class Enquiry:
    def __init__(self, send=send_email, clock=time.time):
        self.send = send
        self.clock = clock
        self.attempts = {}
        self.lock = threading.Lock()

    def submit(self, origin, ip, raw):
        if origin not in ORIGINS:
            return 403, False
        with self.lock:
            now = self.clock()
            self.attempts = {key: entry for key, entry in self.attempts.items() if now - entry[0] < 3600}
            start, count = self.attempts.get(ip, (now, 0))
            if count >= 5 or len(self.attempts) >= 10000:
                return 429, False
            self.attempts[ip] = (start, count + 1)
        if len(raw) > 16384:
            return 413, False
        try:
            value = validate(json.loads(raw.decode('utf-8')))
        except (ValueError, UnicodeError):
            value = None
        if value is None:
            return 400, False
        try:
            self.send(value)
        except Exception as error:
            # Log only the error type, never customer data or SMTP credentials.
            print('Enquiry send failed: ' + type(error).__name__, flush=True)
            return 502, False
        return 200, True

class Handler(BaseHTTPRequestHandler):
    service = Enquiry()

    def setup(self):
        super().setup()
        self.connection.settimeout(20)

    def log_message(self, fmt, *args):
        pass

    def reply(self, status, value=None):
        self.send_response(status)
        self.send_header('Cache-Control', 'no-store')
        origin = self.headers.get('Origin', '')
        if origin in ORIGINS:
            self.send_header('Access-Control-Allow-Origin', origin)
            self.send_header('Vary', 'Origin')
        self.send_header('Content-Type', 'application/json')
        if self.command == 'OPTIONS':
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        if value is not None:
            self.wfile.write(json.dumps(value).encode('utf-8'))

    def do_GET(self):
        self.reply(200 if self.path == '/health' else 404, {'ok': self.path == '/health'})

    def do_OPTIONS(self):
        status = 204 if self.path == '/api/website-enquiry' and self.headers.get('Origin') in ORIGINS else 403
        self.reply(status)

    def do_POST(self):
        if self.path != '/api/website-enquiry':
            return self.reply(404, {'success': False})
        if self.headers.get('Origin') not in ORIGINS:
            return self.reply(403, {'success': False})
        if self.headers.get('Content-Type', '').split(';')[0].lower() != 'application/json':
            return self.reply(415, {'success': False})
        try:
            length = int(self.headers.get('Content-Length', '0'))
        except ValueError:
            return self.reply(400, {'success': False})
        if not 0 < length <= 16384:
            return self.reply(413, {'success': False})
        # nginx overwrites X-Real-IP; service binds exclusively to localhost.
        status, success = self.service.submit(self.headers.get('Origin'), self.headers.get('X-Real-IP', self.client_address[0]), self.rfile.read(length))
        self.reply(status, {'success': success})

class Server(ThreadingMixIn, HTTPServer):
    daemon_threads = True

if __name__ == '__main__':
    try:
        with connect_smtp() as smtp:
            smtp.noop()
    except Exception as error:
        raise SystemExit('SMTP verification failed: ' + type(error).__name__)
    Server(('127.0.0.1', 3311), Handler).serve_forever()
