/**
 * npm run illustrations:reasons — the Why Tcules reason drawings (component map C1, owner 29 Oct 2026):
 * the three offer reasons drawn so far (files in scripts/illustrations/reasons/, the copy's `why_tcules_reasons` set) and home's
 * own three, in the Reasons house style (ch05 §4a–§4b), each exported on both grounds the Reasons band
 * sits on. Each drawing is built from its reason's own claim, never mapped from a keyword or an older
 * scene; its message line is written above it and filed in REASON_FIGURES (src/content/sources/
 * reason-figures.ts) with the title it draws.
 *
 * One shared world box per set, so a band's three drawings sit at one scale. Strokes 1.5 (the kit's),
 * as Reasons. Left-facing; every route, thread and connector runs on the x / y / z axes and turns at a
 * corner (2026-10-23-illustration-lines-follow-iso-axes). One solid blue plane and one solid carried
 * item per drawing; the annotation layer is dropped (a Reasons figure is set at 160px, §4b).
 * Writes public/illustrations/reasons/<name>.<ground>.svg. Generated, never hand-edited. `--check`
 * fails if a file is stale.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

import { GROUNDS, HEX, Scene, onBlue, rgba } from './lib.mjs';
import * as knownBeforeDrawn from './reasons/known-before-drawn.mjs';
import * as provedInCode from './reasons/proved-in-code.mjs';
import * as sameSeatYears from './reasons/same-seat-years.mjs';

/** The ground the drawing is exported on: its occluding faces take this colour (§4a). */
let G = HEX.paper;
const quiet = rgba(HEX.blue, 0.45);
const SEAM = 2.6;

/* ── Home's three ─────────────────────────────────────────────────────────────── */

/* Home 1 · "Products customers rely on."
   Message: every day's work runs through the product we designed.
   The days are a field of tiles leading to the product; each day's work is a built echo on its
   tile, and the route carries it up the product's foundation, the blue plane, onto its screen. */
function reliedOn() {
  const s = new Scene({ id: 'h1' });
  s.plinth(120, 0, 180, 250, 0, 22, G);
  const z = 22;
  const zb = s.slab(130, 10, 150, 50, z, 14);
  const at = s.device(140, 270, 60, zb, 170, { fill: G });
  s.panelBar(at, 16, 146, 60, { solid: true });
  s.panelBar(at, 16, 130, 96, { h: 7 });
  s.panelBar(at, 16, 116, 70, { h: 7 });
  s.onPanel(at, 76, 20, 40, 30, { fill: G, stroke: quiet });
  // the days, oldest nearest
  for (const y of [190, 130, 76]) s.plane(170, y, 70, 46, z, { fill: G, stroke: HEX.blue });
  s.route([
    [205, 220, z],
    [205, 60, z],
    [205, 60, zb],
    [205, 60, zb + 60],
  ]);
  for (const y of [198, 138, 84]) s.echo(190, y, 30, 30, z, { state: 'built' });
  s.itemSolidOnPanel(at, 45, 60, 40, 30);
  return s;
}

/* Home 2 · "AI that reached production."
   Message: the AI feature proved in a coded demo is the same one running in production.
   Two screens: the coded demo on a paper plinth, the production product on the blue plane, the
   feature in the same place on both, held by the thread: a built echo in the demo, solid in
   production. */
function aiInProduction() {
  const s = new Scene({ id: 'h2' });
  // the coded demo, smaller, on the left
  s.plinth(150, 30, 140, 110, 0, 22, G);
  const demo = s.device(170, 280, 60, 22, 130, { fill: G });
  s.panelBar(demo, 12, 106, 44, { solid: true });
  s.panelBar(demo, 12, 92, 70, { h: 7 });
  s.echoOnPanel(demo, 12, 40, 50, 28, { state: 'built' });
  // production, on the blue plane
  const zb = s.slab(-30, 30, 160, 110, 0, 22);
  const prod = s.device(-20, 120, 60, zb, 170, { fill: G });
  s.panelBar(prod, 14, 146, 56, { solid: true });
  s.panelBar(prod, 14, 130, 100, { h: 7 });
  s.panelBar(prod, 14, 116, 72, { h: 7 });
  s.onPanel(prod, 80, 30, 46, 50, { fill: G, stroke: quiet });
  s.thread([
    [218, 60, 22 + 54],
    [106, 60, 22 + 54],
  ]);
  s.itemSolidOnPanel(prod, 14, 40, 56, 28);
  return s;
}

/* Home 3 · "Relationships that last."
   Message: the same seat stays with the client's product as it grows, year on year.
   The years are stacked planes, the newest on top, outline only so the continuity shows; the product
   grows on each, and our seat holds one position on every plane, joined by the thread: built
   echoes below, solid on the top plane, the blue plane, this year. */
function relationshipsLast() {
  const s = new Scene({ id: 'h3' });
  const W = 250;
  const D = 170;
  const gap = 80;
  const seat = [30, 110];
  // the product grows by one part a year, set toward the front so every plane's parts show
  const parts = (n, z, stroke) => {
    for (let k = 0; k < n; k++)
      s.plane(96 + k * 52, 104, 42, 42, z, { fill: 'none', stroke });
  };
  for (let i = 0; i < 2; i++) {
    const z = i * gap;
    s.plane(0, 0, W, D, z, { fill: 'none', stroke: HEX.blue });
    parts(i + 1, z, quiet);
    s.echo(seat[0], seat[1], 36, 36, z, { state: 'built' });
  }
  s.thread([
    [seat[0] + 18, seat[1] + 18, 0],
    [seat[0] + 18, seat[1] + 18, 2 * gap],
  ]);
  const zt = s.slab(0, 0, W, D, 2 * gap, 10);
  parts(3, zt, onBlue(0.6));
  s.itemSolid(seat[0], seat[1], 36, 36, zt, 40);
  return s;
}

const SETS = {
  offer: {
    'known-before-drawn': (g) => knownBeforeDrawn.draw(g),
    'proved-in-code': (g) => provedInCode.draw(g),
    'same-seat-years': (g) => sameSeatYears.draw(g),
  },
  home: {
    'relied-on': reliedOn,
    'ai-in-production': aiInProduction,
    'relationships-last': relationshipsLast,
  },
};

const M = 24;
const outDir = new URL('../../public/illustrations/reasons/', import.meta.url);
mkdirSync(outDir, { recursive: true });
let stale = 0;
let wrote = 0;
const sizes = {};
/* Sets drawn for a start-anchored slot are start-aligned in the shared box (the artwork's left edge on
   the margin), so every drawing's visible start lands on its title's start. Home's set predates this
   and stays centred: its figures were approved as they stand. */
const START_ALIGNED = new Set(['offer']);
for (const [set, figs] of Object.entries(SETS)) {
  for (const [ground, hex] of Object.entries(GROUNDS)) {
    G = hex;
    const scenes = Object.entries(figs).map(([n, fn]) => [n, fn(hex)]);
    const W = Math.max(...scenes.map(([, s]) => s.box[2] - s.box[0])) + M * 2;
    const H = Math.max(...scenes.map(([, s]) => s.box[3] - s.box[1])) + M * 2;
    for (const [name, s] of scenes) {
      const cx = (s.box[0] + s.box[2]) / 2;
      const by = s.box[3] + M;
      const x0 = START_ALIGNED.has(set) ? s.box[0] - M : cx - W / 2;
      const vb = [x0, by - H, W, H].map((n) => Math.round(n * 100) / 100);
      sizes[name] = [Math.round(vb[2]), Math.round(vb[3])];
      const body = (s.defs.length ? `<defs>${s.defs.join('')}</defs>` : '') + s.art.join('');
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" width="${Math.round(vb[2])}" height="${Math.round(vb[3])}" aria-hidden="true">${body.replaceAll('{{id}}', `${s.id}-${ground}`)}</svg>\n`;
      const file = new URL(`${name}.${ground}.svg`, outDir);
      if (process.argv.includes('--check')) {
        let cur = '';
        try {
          cur = readFileSync(file, 'utf8');
        } catch {}
        if (cur !== svg) stale++;
      } else {
        writeFileSync(file, svg);
        wrote++;
      }
    }
  }
}
/* The registry states each set's size; it must be the exported one. */
const registry = readFileSync(
  new URL('../../src/content/sources/reason-figures.ts', import.meta.url),
  'utf8',
);
for (const [set, figs] of Object.entries(SETS)) {
  const [w, h] = sizes[Object.keys(figs)[0]];
  if (!registry.includes(`${set}: { width: ${w}, height: ${h} }`)) {
    console.error(`reasons: REASON_FIGURE_SIZE.${set} is not { width: ${w}, height: ${h} }.`);
    stale++;
  }
}
if (stale) {
  console.error(`reasons: ${stale} drawing(s) stale. Run \`npm run illustrations:reasons\`.`);
  process.exit(1);
}
if (process.argv.includes('--sizes')) console.log(JSON.stringify(sizes));
console.log(
  `reasons: ${process.argv.includes('--check') ? 'current' : `wrote ${wrote} drawings`}`,
);
