const emailPattern = /^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/;
export function validate(data) {
  if (!data || typeof data !== 'object') return null;
  const limits = { name: 100, email: 254, organisation: 150, location: 200, message: 4000 };
  const clean = {};
  for (const [key, max] of Object.entries(limits)) {
    if (data[key] != null && typeof data[key] !== 'string') return null;
    clean[key] = (data[key] || '').trim();
    if (clean[key].length > max) return null;
  }
  if (!clean.name || !emailPattern.test(clean.email) || clean.message.length < 10) return null;
  if (/[\r\n]/.test(clean.name)) return null;
  return clean;
}
export function createHandler({ send, origins, recipient, sender, now = Date.now }) {
  const attempts = new Map();
  return async (req, res) => {
    const origin = req.headers.origin;
    const reply = (status, data) => {
      res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify(data));
    };
    if (req.url === '/health' && req.method === 'GET') return reply(200, { ok: true });
    if (req.url !== '/api/website-enquiry') return reply(404, { success: false });
    if (!origins.includes(origin)) return reply(403, { success: false });
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.writeHead(204);
      res.end();
      return;
    }
    if (req.method !== 'POST') return reply(405, { success: false });
    if (!/^application\/json\b/i.test(req.headers['content-type'] || '')) return reply(415, { success: false });
    // Only the local reverse proxy can connect. It overwrites this header.
    const ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
    const time = now();
    for (const [key, entry] of attempts) if (time - entry.start >= 3600000) attempts.delete(key);
    const entry = attempts.get(ip) || { start: time, count: 0 };
    if (entry.count >= 5 || attempts.size >= 10000) return reply(429, { success: false });
    entry.count++;
    attempts.set(ip, entry);
    try {
      const chunks = [];
      let size = 0;
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 16384) return reply(413, { success: false });
        chunks.push(chunk);
      }
      const data = JSON.parse(Buffer.concat(chunks).toString());
      if (data.website) return reply(400, { success: false });
      const value = validate(data);
      if (!value) return reply(400, { success: false });
      await send({
        from: sender,
        to: recipient,
        replyTo: value.email,
        subject: 'Fluvio website: project enquiry',
        text: `Name: ${value.name}\nEmail: ${value.email}\nOrganisation: ${value.organisation}\nLocation: ${value.location}\n\n${value.message}`,
      });
      return reply(200, { success: true });
    } catch {
      return reply(502, { success: false });
    }
  };
}
