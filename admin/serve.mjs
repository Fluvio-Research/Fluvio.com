/**
 * Zero-dependency local app for editing and publishing Fluvio content.
 *
 *   npm run cms            (or double-click "Edit Fluvio Website.command")
 *
 * Serves the start page, the editor and the publish page at
 * http://localhost:4322, and exposes two local-only endpoints that run the
 * content checks and git on this machine. Nothing here is part of the
 * deployed site, and nothing listens beyond localhost.
 */
import { execFile } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const adminDir = fileURLToPath(new URL('.', import.meta.url));
const repoDir = fileURLToPath(new URL('..', import.meta.url));
const port = Number(process.env.PORT) || 4322;

const CONTENT_PATHS = ['src/data/fluvio/content', 'src/assets/images/fluvio'];

const types = {
  '.html': 'text/html; charset=utf-8',
  '.yml': 'text/yaml; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

const json = (response, status, body) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(body));
};

async function changedFiles() {
  const { stdout } = await run('git', ['status', '--porcelain', '--', ...CONTENT_PATHS], { cwd: repoDir });
  return stdout
    .split('\n')
    .filter(Boolean)
    .map((line) => line.slice(3).trim());
}

async function publish(message) {
  if ((await changedFiles()).length === 0) return { ok: false, stage: 'nothing', log: 'No changes to publish.' };

  try {
    await run('npm', ['test', '--silent'], { cwd: repoDir, maxBuffer: 10 * 1024 * 1024 });
  } catch (error) {
    const log = `${error.stdout ?? ''}\n${error.stderr ?? ''}`;
    const failing = log
      .split('\n')
      .filter((line) => /Invalid content|not ok|✖|AssertionError/.test(line))
      .slice(0, 12)
      .join('\n');
    return { ok: false, stage: 'checks', log: failing || log.slice(-2000) };
  }

  const description = (message || 'update site content').replace(/\s+/g, ' ').slice(0, 120);
  for (const step of [
    ['git', ['add', '--', ...CONTENT_PATHS]],
    ['git', ['commit', '-m', `content: ${description}`]],
    ['git', ['push', 'origin', 'main']],
  ]) {
    try {
      await run(step[0], step[1], { cwd: repoDir });
    } catch (error) {
      return { ok: false, stage: step[1][0], log: `${error.stdout ?? ''}\n${error.stderr ?? ''}`.slice(-2000) };
    }
  }
  return { ok: true };
}

createServer(async (request, response) => {
  const path = normalize(new URL(request.url, 'http://localhost').pathname);

  if (path === '/api/changes') {
    try {
      return json(response, 200, { files: await changedFiles() });
    } catch (error) {
      return json(response, 500, { files: [], error: String(error) });
    }
  }

  if (path === '/api/publish' && request.method === 'POST') {
    let body = '';
    for await (const chunk of request) body += chunk;
    let message = '';
    try {
      message = JSON.parse(body || '{}').message ?? '';
    } catch {
      /* default message */
    }
    try {
      return json(response, 200, await publish(String(message)));
    } catch (error) {
      return json(response, 200, { ok: false, stage: 'unexpected', log: String(error) });
    }
  }

  // Static files: / -> index.html, /publish -> publish.html, /editor/ -> the CMS.
  let file = path;
  if (file === '/') file = '/index.html';
  if (file === '/publish') file = '/publish.html';
  if (file.endsWith('/')) file += 'index.html';
  const resolved = join(adminDir, file.replace(/^([/\\])+/, ''));
  if (!resolved.startsWith(adminDir)) {
    response.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(resolved);
    response.writeHead(200, { 'Content-Type': types[extname(resolved)] ?? 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
  }
}).listen(port, '127.0.0.1', () => {
  const url = `http://localhost:${port}`;
  console.log(`Fluvio website editor: ${url}`);
  console.log('Keep this window open while editing. Close it when you are done.');
  if (process.platform === 'darwin' && !process.env.CMS_NO_OPEN) {
    execFile('open', [url], () => {});
  }
});
