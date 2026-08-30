/**
 * Zero-dependency static server for the local content admin.
 * Usage: npm run cms  (serves this folder at http://localhost:4322)
 *
 * The admin is intentionally not part of the deployed site; it only ever
 * runs on a team member's machine.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT) || 4322;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.yml': 'text/yaml; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

createServer(async (request, response) => {
  const path = normalize(new URL(request.url, 'http://localhost').pathname).replace(/^([/\\])+/, '');
  const file = join(root, path === '' ? 'index.html' : path);
  if (!file.startsWith(root)) {
    response.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
  }
}).listen(port, () => {
  console.log(`Fluvio content admin: http://localhost:${port}`);
  console.log('Open it in Chrome or Edge and choose "Work with Local Repository".');
});
