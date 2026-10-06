/**
 * fold:check — every band fits the fold (visual-direction § 1.3).
 *
 *   npm run fold:check                     the routes in fold.config.json
 *   npm run fold:check -- --base=http://…  against a server you already run
 *
 * A BAND is a Section: the full-width, isolated box Section renders (`isolation: isolate` at the
 * viewport's full width), found from the rendered page rather than from a class name, so the check
 * reads dev and production builds alike. An element carrying `data-band` counts too. A band inside
 * a `data-fold-exempt` block is reported and not failed — the specimen's deliberate failures.
 *
 * Viewports and ceilings come from fold.config.json: at 1470 × 830 every band ≤ 830, at 390 every
 * band ≤ 1700. Exit 1 on any band over its ceiling, on a horizontal overflow, or on a page error.
 *
 * Server: as `npm run shots` — this checkout's own `next dev` from its lockfile, or a fresh one on a
 * free port, never a well-known port.
 */
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { chromium } from 'playwright';

const config = JSON.parse(readFileSync('fold.config.json', 'utf8'));
const baseArg = process.argv.slice(2).find((a) => a.startsWith('--base='));

async function answers(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
    return res.status < 500;
  } catch {
    return false;
  }
}

function ownDevServer() {
  try {
    const lock = JSON.parse(readFileSync('.next/dev/lock', 'utf8'));
    process.kill(lock.pid, 0);
    return lock.appUrl ?? `http://localhost:${lock.port}`;
  } catch {
    return null;
  }
}

function freePort() {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.once('error', reject);
    probe.listen(0, () => {
      const { port } = probe.address();
      probe.close(() => resolve(port));
    });
  });
}

let server = null;
let base = baseArg ? baseArg.slice('--base='.length) : ownDevServer();
if (!base || !(await answers(`${base}/design`))) {
  if (baseArg) {
    console.error(`--base ${base} does not answer.`);
    process.exit(1);
  }
  const port = await freePort();
  server = spawn('npx', ['next', 'dev', '--port', String(port)], {
    stdio: 'ignore',
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
  });
  base = `http://localhost:${port}`;
  let up = false;
  for (let i = 0; i < 120 && !up; i++) {
    up = await answers(`${base}/design`);
    if (!up) await new Promise((r) => setTimeout(r, 1000));
  }
  if (!up) {
    server.kill();
    console.error('next dev did not answer within 120s');
    process.exit(1);
  }
}

const browser = await chromium.launch();
let failures = 0;

for (const route of config.routes) {
  for (const { width, height, maxBand } of config.viewports) {
    const page = await browser.newPage({ viewport: { width, height } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(String(error)));
    await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      for (const img of document.images) if (img.loading === 'lazy') img.loading = 'eager';
      await Promise.race([
        Promise.all([...document.images].map((img) => img.decode().catch(() => undefined))),
        new Promise((resolve) => setTimeout(resolve, 15000)),
      ]);
    });
    const result = await page.evaluate(() => {
      const full = document.documentElement.clientWidth;
      const bands = [...document.querySelectorAll('main *')].filter((el) => {
        if (el.hasAttribute('data-band')) return true;
        const style = getComputedStyle(el);
        return style.isolation === 'isolate' && el.getBoundingClientRect().width >= full - 1;
      });
      return {
        overflow: document.documentElement.scrollWidth - full,
        bands: bands.map((el) => ({
          height: Math.round(el.getBoundingClientRect().height),
          name: (el.querySelector('h1, h2')?.textContent ?? el.id ?? '').trim().slice(0, 48),
          exempt: Boolean(el.closest('[data-fold-exempt]')),
        })),
      };
    });

    const over = result.bands.filter((b) => b.height > maxBand);
    const failed = over.filter((b) => !b.exempt);
    const tallest = Math.max(0, ...result.bands.map((b) => b.height));
    const ok = failed.length === 0 && result.overflow <= 0 && errors.length === 0;
    if (!ok) failures++;
    console.log(
      `${ok ? 'ok  ' : 'FAIL'} ${route} @ ${width}: ${result.bands.length} bands, tallest ${tallest} (ceiling ${maxBand})` +
        (result.overflow > 0 ? `, overflows ${result.overflow}px` : ''),
    );
    for (const band of over) {
      console.log(`       ${band.exempt ? 'exempt' : 'over  '} ${band.height}  ${band.name}`);
    }
    for (const error of errors) console.log(`       page error: ${error}`);
    await page.close();
  }
}

await browser.close();
if (server) server.kill();
if (failures > 0) {
  console.error(`fold:check — ${failures} route × viewport combination(s) failed`);
  process.exit(1);
}
console.log('fold:check — every band fits its fold; no overflow, no page errors');
