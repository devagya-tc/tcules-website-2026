#!/usr/bin/env node
/**
 * fold:check — every band on the routes in fold.config.json fits the fold (visual-direction § 1.3).
 *
 *   npm run fold:check                                   every route in fold.config.json
 *   npm run fold:check -- /design/kit/media-split        only these
 *   npm run fold:check -- --base=http://localhost:4123   an explicit server, trusted as given
 *
 * A BAND is a top-level Section: an element carrying Section's module class with no Section above
 * it, outside the site chrome (a `header` or `footer` — the SiteNav bar and the SiteFooter). Each is measured at every viewport in the config and fails when it is taller than that
 * viewport's `maxBand` (830 at 1470 × 830, 1700 at 390). A band carrying `data-fold-exempt` is
 * reported and not failed — a long D band or a full route's footer may be argued past it. Also fails
 * on horizontal overflow, which shots checks too, because a band that only fits by overflowing has
 * not fitted.
 *
 * Server: the same rule as `npm run shots` — `--base`, else this checkout's own `next dev` (from
 * `.next/dev/lock`), else a fresh `next dev` on a free port. Never a well-known port: in a worktree
 * that measured the main checkout's code.
 */
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { chromium } from 'playwright';

const config = JSON.parse(readFileSync('fold.config.json', 'utf8'));
const args = process.argv.slice(2);
const baseArg = args.find((a) => a.startsWith('--base='));
const only = args.filter((a) => !a.startsWith('--'));
const routes = only.length > 0 ? only : config.routes;

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

async function startServer() {
  const port = await freePort();
  const child = spawn('npx', ['next', 'dev', '--port', String(port)], {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
  });
  const url = `http://localhost:${port}`;
  for (let i = 0; i < 120; i++) {
    if (await answers(`${url}/design`)) return { base: url, child };
    await new Promise((r) => setTimeout(r, 1000));
  }
  child.kill();
  throw new Error('next dev did not answer within 120s');
}

let server = null;
let base = baseArg ? baseArg.slice('--base='.length) : ownDevServer();
if (!base || !(await answers(`${base}/design`))) {
  if (baseArg) {
    console.error(`--base ${base} does not answer.`);
    process.exit(1);
  }
  server = await startServer();
  base = server.base;
}

const browser = await chromium.launch();
const failures = [];

try {
  for (const route of routes) {
    for (const { width, height, maxBand } of config.viewports) {
      const page = await browser.newPage({ viewport: { width, height } });
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const { bands, overflow } = await page.evaluate(() => {
        const isSection = (el) =>
          [...el.classList].some((c) => /^section-module__\w+__section$/i.test(c));
        const all = [...document.querySelectorAll('[class]')].filter(isSection);
        /* The site chrome is not a band: the SiteNav bar and the SiteFooter are Sections too, and
           a full footer is taller than a fold by design. */
        const top = all.filter((el) => {
          if (el.closest('header, footer')) return false;
          for (let p = el.parentElement; p; p = p.parentElement) if (isSection(p)) return false;
          return true;
        });
        return {
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          bands: top.map((el) => ({
            name:
              el.querySelector('h1, h2')?.textContent?.trim().slice(0, 48) ||
              el.id ||
              el.tagName.toLowerCase(),
            height: Math.round(el.getBoundingClientRect().height),
            exempt: el.hasAttribute('data-fold-exempt'),
          })),
        };
      });
      await page.close();
      const over = bands.filter((b) => b.height > maxBand);
      const tallest = Math.max(...bands.map((b) => b.height));
      console.log(
        `${route} @${width}: ${bands.length} bands, tallest ${tallest} (max ${maxBand})` +
          (overflow > 0 ? `  OVERFLOW ${overflow}px` : ''),
      );
      for (const b of over) {
        console.log(`  ${b.exempt ? 'exempt' : 'OVER  '} ${b.height}  ${b.name}`);
        if (!b.exempt) failures.push({ route, width, ...b });
      }
      if (overflow > 0) failures.push({ route, width, name: 'horizontal overflow', overflow });
    }
  }
} finally {
  await browser.close();
  server?.child.kill();
}

console.log(failures.length === 0 ? '\nfold:check passed' : `\n${failures.length} failure(s)`);
process.exit(failures.length > 0 ? 1 : 0);
