#!/usr/bin/env node
/**
 * Screenshot every `/design/*` specimen at the two widths the tracker checks, 1440 and 390.
 *
 *   npm run shots                        every specimen
 *   npm run shots -- page-hero figure    only these
 *   npm run shots -- --base=http://localhost:3000    an explicit server, trusted as given
 *
 * Why this exists: "checked at 1440 and 390" is on every task's definition of done, and until now
 * it meant a person opening a browser and resizing it. The owner decides; they should not have to
 * look by hand to find out whether there is something to decide. This makes the look a file.
 *
 * What it writes, to `.shots/` (gitignored):
 *   <name>-1440.png, <name>-390.png    full-page captures
 *   index.html                         a contact sheet of all of them, side by side per specimen
 *   report.json                        per capture: page errors, and horizontal overflow
 *   <name>-<width>/NN-<title>.png      one crop per `Specimen` block, **only when specimens are named**
 *                                      on the command line: a targeted review wants the one row that
 *                                      changed, not a 45,000px page. A full run stays full-page only.
 *
 * It also checks one thing no other gate sees: **horizontal overflow**. A page wider than its
 * viewport scrolls sideways on a phone, and CLAUDE.md requires no horizontal page scroll. The
 * process exits 1 when any capture overflows or throws, so it can gate a PR like `verify` does.
 *
 * Server — it must be THIS checkout's code, never whatever happens to answer on a port:
 *   1. `--base`, if given. Explicit, so trusted.
 *   2. Otherwise this directory's own running `next dev`, found through `.next/dev/lock` — Next 16
 *      writes the pid and URL there, and the same lockfile stops a second `next dev` starting in
 *      this directory, so reusing it is the only option when one is running.
 *   3. Otherwise a fresh `next dev` on a free port, stopped at the end.
 * It used to fall back to http://localhost:3000 when that answered. In a worktree that silently
 * screenshotted the MAIN checkout's server — other code, other branch — and reported its problems
 * (and its passes) as this checkout's. Never probe a well-known port. Routes are discovered from `src/app/design/*`, so a new specimen is covered without an
 * edit here. The underscore-prefixed harness (`_specimen`) is not a route and is skipped.
 */
import { spawn } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { join } from 'node:path';
import { chromium } from 'playwright';

const WIDTHS = [1440, 390];
const OUT = '.shots';

const args = process.argv.slice(2);
const baseArg = args.find((a) => a.startsWith('--base='));
const only = args.filter((a) => !a.startsWith('--'));

const designDir = 'src/app/design';
const all = readdirSync(designDir).filter(
  (d) => !d.startsWith('_') && statSync(join(designDir, d)).isDirectory(),
);
const unknown = only.filter((n) => !all.includes(n));
if (unknown.length > 0) {
  console.error(`No specimen route for: ${unknown.join(', ')}`);
  process.exit(1);
}
const names = only.length > 0 ? only : ['index', ...all];

async function answers(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
    return res.status < 500;
  } catch {
    return false;
  }
}

/** This directory's own running `next dev`, from the lockfile Next 16 writes — or null. */
function ownDevServer() {
  try {
    const lock = JSON.parse(readFileSync('.next/dev/lock', 'utf8'));
    process.kill(lock.pid, 0); // throws if the process is gone and the lock is stale
    return lock.appUrl ?? `http://localhost:${lock.port}`;
  } catch {
    return null;
  }
}

/** A port nothing is listening on, from the OS rather than a guess. */
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
  const base = `http://localhost:${port}`;
  for (let i = 0; i < 120; i++) {
    if (await answers(`${base}/design`)) return { base, child };
    await new Promise((r) => setTimeout(r, 1000));
  }
  child.kill();
  throw new Error('next dev did not answer within 120s');
}

let server = null;
let base = baseArg ? baseArg.slice('--base='.length) : ownDevServer();
if (baseArg && !(await answers(`${base}/design`))) {
  console.error(`--base ${base} does not answer.`);
  process.exit(1);
}
if (!base || !(await answers(`${base}/design`))) {
  server = await startServer();
  base = server.base;
}
console.log(
  `shots: ${base} (${baseArg ? '--base' : server ? 'started here' : "this checkout's next dev"})`,
);

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const report = [];

try {
  for (const name of names) {
    const path = name === 'index' ? '/design' : `/design/${name}`;
    for (const width of WIDTHS) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(base + path, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      const file = `${name}-${width}.png`;
      await page.screenshot({ path: join(OUT, file), fullPage: true });
      const crops = [];
      if (only.length > 0) {
        // A Specimen's root carries the harness's `spec` module class, hashed by CSS Modules as
        // `specimen-module__<hash>__spec`; its title is the first <p>. Tag the roots, then crop each.
        await page.evaluate(() => {
          document.querySelectorAll('[class]').forEach((el) => {
            if ([...el.classList].some((c) => /^specimen-module__\w+__spec$/.test(c)))
              el.setAttribute('data-shot', '');
          });
        });
        const blocks = page.locator('[data-shot]');
        const count = await blocks.count();
        const dir = `${name}-${width}`;
        mkdirSync(join(OUT, dir), { recursive: true });
        for (let i = 0; i < count; i++) {
          const block = blocks.nth(i);
          const title = ((await block.locator('p').first().textContent()) ?? '').trim();
          const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 60);
          const crop = `${dir}/${String(i + 1).padStart(2, '0')}-${slug || 'untitled'}.png`;
          await block.screenshot({ path: join(OUT, crop) });
          crops.push({ title, file: crop });
        }
      }
      await page.close();
      report.push({ name, width, file, overflowPx: overflow, errors, crops });
      const flag = overflow > 0 ? `  OVERFLOW ${overflow}px` : '';
      const err = errors.length > 0 ? `  ${errors.length} error(s)` : '';
      console.log(`${path} @${width}${flag}${err}`);
    }
  }
} finally {
  await browser.close();
  server?.child.kill();
}

const rows = names
  .map((name) => {
    const cells = WIDTHS.map((w) => {
      const r = report.find((x) => x.name === name && x.width === w);
      const note = r.overflowPx > 0 ? ` · overflow ${r.overflowPx}px` : '';
      return `<figure><figcaption>${w}${note}</figcaption><a href="${r.file}"><img src="${r.file}" loading="lazy" alt="${name} at ${w}"></a></figure>`;
    }).join('');
    const crops = WIDTHS.map((w) => report.find((x) => x.name === name && x.width === w).crops);
    const blocks = crops[0]
      .map((c, i) => {
        const pair = crops
          .map((list, j) =>
            list[i]
              ? `<figure><figcaption>${WIDTHS[j]}</figcaption><img src="${list[i].file}" loading="lazy" alt=""></figure>`
              : '',
          )
          .join('');
        return `<h3>${c.title}</h3><div class="row">${pair}</div>`;
      })
      .join('');
    return `<section><h2>${name}</h2><div class="row">${cells}</div>${blocks}</section>`;
  })
  .join('\n');
writeFileSync(
  join(OUT, 'index.html'),
  `<!doctype html><meta charset="utf-8"><title>Specimen shots</title>
<style>body{font:14px system-ui;margin:24px;background:#f3f1ea}h2{font-size:16px;margin:32px 0 8px}h3{font-size:13px;margin:20px 0 6px}
.row{display:grid;grid-template-columns:3fr 1fr;gap:16px;align-items:start}figure{margin:0}
figcaption{font:12px ui-monospace,monospace;margin-bottom:4px}img{width:100%;border:1px solid #cfcfce;background:#fff}</style>
<h1>Specimen shots</h1>\n${rows}\n`,
);
writeFileSync(join(OUT, 'report.json'), JSON.stringify(report, null, 2));

const failed = report.filter((r) => r.overflowPx > 0 || r.errors.length > 0);
console.log(`\n${report.length} captures → ${OUT}/index.html · ${failed.length} with problems`);
process.exit(failed.length > 0 ? 1 : 0);
