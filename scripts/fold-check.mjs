#!/usr/bin/env node
/**
 * fold:check — the fold rule of visual-direction § 1.3, measured rather than asserted.
 *
 *   npm run fold:check                         every route in fold.config.json
 *   npm run fold:check -- /design/kit/testimonials   only these
 *   npm run fold:check -- --base=http://localhost:4723
 *
 * For each route and each viewport in fold.config.json it measures two things:
 *
 *   band   every top-level band (a `section[data-surface]` or a `[data-band]`, with no band above it) is at most the
 *          viewport's `maxBand` tall: 830 at 1470, 1700 at 390. A band taller than that cannot be
 *          read in one screen, which is the whole of the rule.
 *   hero   every `[data-fold-hero]` ends inside the first screen once the nav is above it: its
 *          height plus the viewport's `nav` is at most the viewport's height. A specimen stacks
 *          many heroes on one page, so this is measured per hero rather than by page position.
 *
 * A measurement inside `[data-fold-exempt="reason"]` is REPORTED with its reason and never fails:
 * the exemption is an owner comparison or a shape whose image crosses the fold by design, and the
 * reason is the record of why. Exit 1 on any failure, so it can gate a PR like `verify`.
 *
 * Server, the same order `shots` uses: `--base`, else this directory's own `next dev` from
 * `.next/dev/lock`, else a fresh `next dev` on a free port, stopped at the end. Never a well-known
 * port, which in a worktree would measure another checkout's code.
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

async function server() {
  if (baseArg) return { base: baseArg.slice('--base='.length) };
  const own = ownDevServer();
  if (own && (await answers(`${own}/design`))) return { base: own };
  const port = await freePort();
  const child = spawn('npx', ['next', 'dev', '--port', String(port)], {
    stdio: 'ignore',
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
  });
  const base = `http://localhost:${port}`;
  for (let i = 0; i < 120; i++) {
    if (await answers(`${base}/design`)) return { base, child };
    await new Promise((r) => setTimeout(r, 1000));
  }
  child.kill();
  throw new Error('next dev did not answer within 120s');
}

const { base, child } = await server();
const browser = await chromium.launch();
const failures = [];
const exempt = [];
let measured = 0;

try {
  for (const viewport of config.viewports) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
    });
    for (const route of routes) {
      await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const rows = await page.evaluate(() => {
        /* A band's name: its variation wrapper, else its archetype (`data-band`) and the nearest
           id before it on the page (a specimen's titled label band), else its own id. */
        const before = (el) => {
          for (let node = el.previousElementSibling; node; node = node.previousElementSibling) {
            if (node.id) return node.id;
          }
          return undefined;
        };
        const label = (el) =>
          el.closest('[data-kit-variation]')?.getAttribute('data-kit-variation') ??
          (el.hasAttribute('data-band')
            ? `${el.getAttribute('data-band')}${before(el) ? ` #${before(el)}` : ''}`
            : null) ??
          el.getAttribute('id') ??
          el.getAttribute('data-arrangement') ??
          el.tagName.toLowerCase();
        const why = (el) => el.closest('[data-fold-exempt]')?.getAttribute('data-fold-exempt');
        /* Every top-level band: a Section's <section>, and anything marked with its archetype
           (`data-band`) — a ContentSection with no heading renders its band as a <div>, which only
           the marker finds. The site chrome (header, footer) is neither, and is not measured. */
        const BAND = 'section[data-surface], [data-band]';
        const bands = [...document.querySelectorAll(BAND)]
          .filter((el) => !el.parentElement?.closest(BAND))
          .map((el) => ({
            kind: 'band',
            name: label(el),
            height: Math.round(el.getBoundingClientRect().height),
            exempt: why(el),
          }));
        const heroes = [...document.querySelectorAll('[data-fold-hero]')].map((el) => ({
          kind: 'hero',
          name: label(el),
          height: Math.round(el.getBoundingClientRect().height),
          exempt: why(el),
        }));
        return [...bands, ...heroes];
      });
      /* The hero rule is stated per viewport: a viewport with no `nav` measures bands only. */
      const applicable = rows.filter(
        (row) => row.kind === 'band' || viewport.nav !== undefined,
      );
      for (const row of applicable) {
        measured += 1;
        const limit = row.kind === 'band' ? viewport.maxBand : viewport.height;
        const value = row.kind === 'band' ? row.height : row.height + (viewport.nav ?? 0);
        const line = `${route} @${viewport.width}  ${row.kind} ${row.name}: ${value} (limit ${row.kind === 'band' ? viewport.maxBand : viewport.height})`;
        if (value <= limit) continue;
        if (row.exempt) exempt.push(`${line}  exempt: ${row.exempt}`);
        else failures.push(line);
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
  child?.kill();
}

for (const line of exempt) console.log(`  reported  ${line}`);
if (failures.length > 0) {
  console.error(`fold:check — ${failures.length} over the fold:\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log(
  `fold:check — ${measured} measurements on ${routes.length} route(s), every band and hero inside the fold${exempt.length ? `, ${exempt.length} exempt` : ''}.`,
);
