import http from 'node:http';
import nodemailer from 'nodemailer';
import { createHandler } from './handler.mjs';
for (const key of ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS']) {
  if (!process.env[key]) throw new Error(`Missing ${key}`);
}
const port = Number(process.env.SMTP_PORT || 587);
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465,
  requireTLS: port !== 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});
await transport.verify();
const server = http.createServer(
  createHandler({
    send: (mail) => transport.sendMail(mail),
    sender: process.env.SMTP_USER,
    recipient: process.env.SUPPORT_TO_EMAIL || 'info@fluvio.com.au',
    origins: ['https://fluvio.com.au', 'https://www.fluvio.com.au', 'https://fluvio-research.github.io'],
  })
);
server.requestTimeout = 20000;
server.listen(3311, '127.0.0.1');
