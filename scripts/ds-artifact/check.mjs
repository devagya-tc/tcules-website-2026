#!/usr/bin/env node
/**
 * Render every built preview the way the artifact's frame does — libraries, bundle.css and
 * bundle.js preloaded — and fail on a page error, a mount error or a blank card. Run after
 * build.mjs and before publishing; nothing goes up that has not rendered here.
 *
 *   node scripts/ds-artifact/check.mjs [Name …]
 */
import { createServer } from 'node:http';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { chromium } from 'playwright';

const PROJECT = resolve(import.meta.dirname, '../../.design-sync/out/project');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.webm': 'video/webm', '.json': 'application/json', '.vtt': 'text/vtt' };

/* What the frame preloads, ahead of the card's own document. */
const PRELOAD = `<link rel="stylesheet" href="../bundle.css"><script src="../lib/react.js"></script><script src="../lib/react-dom.js"></script><script src="../bundle.js"></script>`;

const server = createServer((req, res) => {
  const path = join(PROJECT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!path.startsWith(PROJECT) || !existsSync(path)) return res.writeHead(404).end();
  let body = readFileSync(path);
  if (path.endsWith('preview.html')) body = body.toString().replace('<head>', `<head>${PRELOAD}`).replace('<html>', '<html data-theme="paper">');
  res.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream' }).end(body);
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;

const only = process.argv.slice(2);
const names = readdirSync(join(PROJECT, 'components')).filter(
  (n) => existsSync(join(PROJECT, 'components', n, 'preview.js')) && (!only.length || only.includes(n)),
);
const browser = await chromium.launch();
const failures = [];
const missing = new Set();
for (const name of names) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('response', (r) => r.status() === 404 && missing.add(new URL(r.url()).pathname));
  await page.goto(`${base}/components/${name}/preview.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const { text, height } = await page.evaluate(() => ({
    text: document.getElementById('root')?.innerText ?? '',
    height: document.getElementById('root')?.scrollHeight ?? 0,
  }));
  const warn = text.startsWith('⚠') ? text.split('\n')[0] : null;
  const verdict = errors.length || warn || height < 40 ? 'FAIL' : 'ok';
  if (verdict === 'FAIL') failures.push(name);
  console.log(`${verdict.padEnd(4)} ${name.padEnd(20)} ${String(height).padStart(6)}px ${warn ?? errors[0] ?? ''}`.trimEnd());
  await page.close();
}
await browser.close();
server.close();
if (missing.size) console.log(`\n404s (${missing.size}): ${[...missing].slice(0, 12).join(', ')}${missing.size > 12 ? ' …' : ''}`);
console.log(`\n${names.length - failures.length}/${names.length} previews render${failures.length ? `; failing: ${failures.join(', ')}` : ''}`);
process.exit(failures.length ? 1 : 0);
