import unittest
from unittest.mock import patch
from import_grafana_smtp import get_main_pid, resolve

class ImportTests(unittest.TestCase):
    def test_legacy_systemctl(self):
        with patch('import_grafana_smtp.subprocess.check_output', return_value=b'MainPID=1234\n') as run:
            self.assertEqual(get_main_pid(), '1234')
            self.assertNotIn('--value', run.call_args[0][0])

    def test_stopped_service(self):
        with patch('import_grafana_smtp.subprocess.check_output', return_value=b'MainPID=0\n'):
            self.assertEqual(get_main_pid(), '0')

    def test_secret_resolution(self):
        self.assertEqual(resolve('"""#example;value"""', {}), '#example;value')
        self.assertEqual(resolve('$__env{SMTP_SECRET}', {'SMTP_SECRET':'example'}), 'example')
        self.assertEqual(resolve('${SMTP_SECRET}', {'SMTP_SECRET':'example'}), 'example')
        with self.assertRaises(ValueError):
            resolve('$__vault{secret}', {})
