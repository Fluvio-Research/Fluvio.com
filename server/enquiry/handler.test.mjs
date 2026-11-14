import test from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { createHandler, validate } from './handler.mjs';
const valid = { name: 'Visitor', email: 'visitor@example.com', message: 'Monitoring a remote river site.' };
const origin = 'https://fluvio-research.github.io';
function setup(send = async () => {}) {
  return createHandler({ send, origins: [origin], sender: 'info@fluvio.com.au', recipient: 'info@fluvio.com.au' });
}
async function request(handler, data = valid, overrides = {}) {
  const req = Readable.from([Buffer.from(JSON.stringify(data))]);
  Object.assign(
    req,
    {
      url: '/api/website-enquiry',
      method: 'POST',
      headers: { origin, 'content-type': 'application/json' },
      socket: { remoteAddress: '127.0.0.1' },
    },
    overrides
  );
  const res = {
    headers: {},
    setHeader(k, v) {
      this.headers[k] = v;
    },
    writeHead(status) {
      this.status = status;
    },
    end(body) {
      this.body = body;
    },
  };
  await handler(req, res);
  return res;
}
test('validates required fields, email and input lengths', () => {
  assert.ok(validate(valid));
  for (const data of [
    { ...valid, email: 'a\nb@example.com' },
    { ...valid, name: 'a\nb' },
    { ...valid, message: 'short' },
    { ...valid, name: 42 },
    { ...valid, location: 'x'.repeat(201) },
  ])
    assert.equal(validate(data), null);
});
test('sends to fixed recipient with visitor reply address and plain text', async () => {
  let mail;
  const r = await request(
    setup(async (value) => {
      mail = value;
    }),
    { ...valid, to: 'attacker@example.com', message: '<b>Project details</b>' }
  );
  assert.equal(r.status, 200);
  assert.equal(mail.to, 'info@fluvio.com.au');
  assert.equal(mail.replyTo, valid.email);
  assert.equal(mail.html, undefined);
});
test('SMTP errors never report success', async () => {
  const r = await request(
    setup(async () => {
      throw Error('private credentials');
    })
  );
  assert.equal(r.status, 502);
  assert.equal(JSON.parse(r.body).success, false);
  assert.ok(!r.body.includes('private'));
});
test('rejects unapproved origins and honeypot submissions without sending', async () => {
  let count = 0;
  const h = setup(async () => count++);
  assert.equal((await request(h, valid, { headers: { origin: 'https://example.com' } })).status, 403);
  assert.equal((await request(h, { ...valid, website: 'spam' })).status, 400);
  assert.equal(count, 0);
});
test('rate limits requests and handles CORS preflight', async () => {
  const h = setup();
  assert.equal((await request(h, valid, { method: 'OPTIONS' })).status, 204);
  for (let i = 0; i < 5; i++) assert.equal((await request(h)).status, 200);
  assert.equal((await request(h)).status, 429);
});
test('rejects oversized payloads', async () => {
  assert.equal((await request(setup(), { ...valid, message: 'x'.repeat(17000) })).status, 413);
});
