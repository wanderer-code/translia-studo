import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawn } from 'node:child_process';

const translatorUrls = [
  'https://chatgpt.com/translate/',
  'https://www.deepl.com/en?tab=translate-text',
  'https://translate.google.com/?sl=en&tl=fa&op=translate',
  'https://abadis.ir/',
];

function reply(res, status, message) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify({ message }));
}

function installLauncher(server) {
  server.middlewares.use('/__local/open-translators', (req, res) => {
    const host = req.headers.host || '';
    const origin = req.headers.origin || '';
    const localHosts = /^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i;
    const remote = req.socket.remoteAddress;
    if (req.method !== 'POST' || !['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(remote)
      || !localHosts.test(host) || origin !== `http://${host}`
      || req.headers['sec-fetch-site'] !== 'same-origin'
      || req.headers['x-translia-request'] !== 'open-translators') {
      reply(res, 403, 'This action is only available from the local app.');
      return;
    }
    if (process.platform !== 'win32') {
      reply(res, 501, 'The translator launcher currently supports Windows only.');
      return;
    }
    const chrome = [process.env.PROGRAMFILES, process.env['PROGRAMFILES(X86)'], process.env.LOCALAPPDATA]
      .filter(Boolean)
      .map((base) => join(base, 'Google', 'Chrome', 'Application', 'chrome.exe'))
      .find((path) => existsSync(path));
    if (!chrome) {
      reply(res, 404, 'Google Chrome was not found in its usual installation folders.');
      return;
    }
    const params = new URL(req.url, 'http://localhost').searchParams;
    const number = (name, min, max, fallback) => {
      const raw = params.get(name);
      const value = raw === null ? NaN : Number(raw);
      return Number.isInteger(value) && value >= min && value <= max ? value : fallback;
    };
    const width = number('width', 320, 10000, 540);
    const height = number('height', 300, 10000, 800);
    const left = number('left', -20000, 20000, 0);
    const top = number('top', -20000, 20000, 0);
    const child = spawn(chrome, ['--incognito', '--new-window', `--window-size=${width},${height}`,
      `--window-position=${left},${top}`, ...translatorUrls], {
      detached: true, stdio: 'ignore', windowsHide: false,
    });
    child.once('error', () => reply(res, 500, 'Chrome could not be started.'));
    child.once('spawn', () => {
      child.unref();
      reply(res, 200, 'Chrome started.');
    });
  });
}

export default function translationLauncher() {
  return {
    name: 'local-translation-launcher',
    configureServer: installLauncher,
    configurePreviewServer: installLauncher,
  };
}
