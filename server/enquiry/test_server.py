import json
import os
import unittest
from unittest.mock import patch
from server import Enquiry, validate, build_message

VALID = dict(name='Test Visitor', email='test@example.com', message='A river monitoring enquiry.')
ORIGIN = 'https://fluvio-research.github.io'

class Tests(unittest.TestCase):
    def test_validation(self):
        self.assertIsNotNone(validate(VALID))
        for changes in [dict(email='a\nb@example.com'), dict(name='a\nb'), dict(message='short'), dict(name=42), dict(location='x'*201), dict(website='spam')]:
            self.assertIsNone(validate(dict(VALID, **changes)))
        self.assertIsNone(validate(None))

    def test_fixed_recipient(self):
        with patch.dict(os.environ, SMTP_USER='info@fluvio.com.au', SUPPORT_TO_EMAIL='info@fluvio.com.au'):
            message = build_message(validate(dict(VALID, to='attacker@example.com')))
        self.assertEqual(message['To'], 'info@fluvio.com.au')
        self.assertEqual(message['Reply-To'], VALID['email'])
        self.assertEqual(message.get_content_type(), 'text/plain')

    def test_send(self):
        sent=[]
        service=Enquiry(send=sent.append)
        self.assertEqual(service.submit(ORIGIN,'ip',json.dumps(VALID).encode()),(200,True))
        self.assertEqual(len(sent),1)

    def test_failure(self):
        def fail(value): raise RuntimeError('private')
        self.assertEqual(Enquiry(send=fail).submit(ORIGIN,'ip',json.dumps(VALID).encode()),(502,False))

    def test_rejections(self):
        sent=[]; service=Enquiry(send=sent.append)
        self.assertEqual(service.submit('https://evil.example','ip',b'{}'),(403,False))
        self.assertEqual(service.submit(ORIGIN,'ip',b'invalid'),(400,False))
        self.assertEqual(service.submit(ORIGIN,'ip',b'x'*17000),(413,False))
        self.assertFalse(sent)

    def test_rate_limit_and_expiry(self):
        now=[0];service=Enquiry(send=lambda v:None,clock=lambda:now[0]);raw=json.dumps(VALID).encode()
        for _ in range(5):self.assertEqual(service.submit(ORIGIN,'ip',raw),(200,True))
        self.assertEqual(service.submit(ORIGIN,'ip',raw),(429,False))
        now[0]=3601
        self.assertEqual(service.submit(ORIGIN,'ip',raw),(200,True))
