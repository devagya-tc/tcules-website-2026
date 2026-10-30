/**
 * npm run illustrations:reasons — the Why Tcules reason drawings (component map C1, owner 29 Oct 2026):
 * the seven reasons the offer pages draw from (the copy's `why_tcules_reasons` set, 1–7) and home's
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

/** The ground the drawing is exported on: its occluding faces take this colour (§4a). */
let G = HEX.paper;
const quiet = rgba(HEX.blue, 0.45);
const SEAM = 2.6;

/* ── The seven offer reasons ─────────────────────────────────────────────────── */

/* 1 · "We work out what the product has to know before we draw it."
   Message: the screen is built on top of what the product knows, worked out first.
   The model is the solid blue plane at the base, its records joined by connectors; the one fact
   that matters is named there (echo on blue), and the route carries it up onto the screen that
   stands on the model, where it is solid. */
function modelFirst() {
  const s = new Scene({ id: 'r1' });
  s.plinth(0, 0, 280, 200, 0, 22, G);
  const z = s.slab(20, 20, 240, 160, 22, 14);
  // the records and how they relate: tiles on the model, connectors on the axes
  s.plane(180, 120, 60, 40, z, { fill: G, stroke: HEX.blue });
  s.plane(180, 40, 60, 40, z, { fill: G, stroke: HEX.blue });
  s.plane(100, 120, 60, 40, z, { fill: G, stroke: HEX.blue });
  s.connector([
    [210, 120, z],
    [210, 88, z],
  ]);
  s.connector([
    [180, 140, z],
    [168, 140, z],
  ]);
  s.bar(190, 132, 36, z, { color: HEX.blue, alpha: 0.3, thick: 6 });
  s.bar(190, 52, 30, z, { color: HEX.blue, alpha: 0.3, thick: 6 });
  s.bar(110, 132, 30, z, { color: HEX.blue, alpha: 0.3, thick: 6 });
  // the fact the product has to know, named on the model
  s.echo(40, 130, 40, 30, z, { onBluePlane: true });
  s.connector([
    [100, 145, z],
    [88, 145, z],
  ]);
  // the screen, standing on the model, drawn only now
  const at = s.device(30, 170, 60, z, 170, { fill: G });
  s.panelBar(at, 16, 146, 60, { solid: true });
  s.panelBar(at, 16, 130, 100, { h: 7 });
  s.panelBar(at, 16, 116, 76, { h: 7 });
  s.onPanel(at, 16, 20, 56, 30, { fill: G, stroke: quiet });
  s.route([
    [60, 130, z],
    [60, 60, z],
    [60, 60, z + 70],
  ]);
  s.itemSolidOnPanel(at, 90, 70, 36, 26);
  return s;
}

/* 2 · "We know what to leave alone in a product people rely on."
   Message: almost all of a working product is kept as it is; one part is lifted out and replaced.
   The product is a field of parts on the blue plane, all plain and kept; one slot is opened
   (a dashed edge round the blue plane's paper dots) and its replacement, the item, hangs above it on its thread, about to drop in. */
function leaveAlone() {
  const s = new Scene({ id: 'r2' });
  const z = s.slab(0, 0, 212, 212, 0, 18);
  const cells = [];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) cells.push([8 + i * 68, 8 + j * 68]);
  const slot = [76, 144];
  for (const [x, y] of cells) {
    if (x === slot[0] && y === slot[1]) {
      // the opened slot: unresolved, so the blue plane's paper dot field (§4a), in a dashed edge
      s.dots(x, y, 60, 60, z, { pitch: 20, color: HEX.paper, alpha: 0.4 });
      s.edges(x, y, 60, 60, z, {
        back: { stroke: HEX.paper, dash: '6 4' },
        left: { stroke: HEX.paper, dash: '6 4' },
        front: { stroke: HEX.paper, dash: '6 4' },
        right: { stroke: HEX.paper, dash: '6 4' },
      });
      continue;
    }
    s.plane(x, y, 60, 60, z, { fill: G, stroke: HEX.blue });
    s.bar(x + 12, y + 12, 36, z, { thick: 6 });
    s.bar(x + 12, y + 26, 24, z, { thick: 6 });
  }
  // the new part, lifted above its slot on the one thread that holds its place
  const lift = 120;
  s.thread([
    [slot[0] + 30, slot[1] + 30, z],
    [slot[0] + 30, slot[1] + 30, z + lift],
  ]);
  s.itemSolid(slot[0], slot[1], 60, 60, z + lift, 14);
  return s;
}

/* 3 · "We prove the hard parts in code while they can still change."
   Message: the hardest part is built and working in code while the design around it is still open.
   One plane split by the ink seam: the design half unresolved (dot field, dashed parts still open,
   the item's place spec'd); the code half the blue plane, raised, the item solid on it. */
function hardPartsInCode() {
  const s = new Scene({ id: 'r3' });
  // design half (screen-left, +x), on a paper plinth
  s.plinth(140, 0, 150, 220, 0, 22, G);
  const zd = 22;
  s.dots(140, 0, 150, 220, zd, { pitch: 30 });
  s.plane(180, 24, 80, 50, zd, { fill: 'none', stroke: HEX.blue, dash: '6 4' });
  s.plane(180, 150, 80, 46, zd, { fill: 'none', stroke: HEX.blue, dash: '6 4' });
  s.echo(190, 90, 60, 44, zd);
  // the route leaves the echo and runs under the code half's edge (its rise is on the hidden face)
  s.route([
    [190, 112, zd],
    [140, 112, zd],
  ]);
  // code half (screen-right), the blue plane, raised: built
  const zc = s.slab(0, 0, 140, 220, 0, 30);
  for (const [y, len] of [
    [24, 80],
    [40, 56],
    [56, 92],
    [168, 70],
    [184, 96],
  ])
    s.bar(20, y, len, zc, { color: HEX.paper, alpha: 0.55, thick: 6 });
  // the seam, where design meets code
  s.line(
    [
      [140, 0, zd],
      [140, 0, zc],
      [140, 220, zc],
    ],
    { stroke: HEX.ink, width: SEAM },
  );
  s.route([
    [140, 112, zc],
    [110, 112, zc],
  ]);
  s.itemSolid(40, 90, 70, 44, zc, 20);
  return s;
}

/* 4 · "One studio can take it into working software, with the designers staying in the build."
   Message: the design carries on into the software, and the designer's place stands in the build.
   One plinth is the studio: the design sheet lies on it with the item spec'd; the build is the blue
   plane with the running screen standing on it, the item solid; the designer's station stands on
   the build beside the screen, not left behind at the design. */
function intoSoftware() {
  const s = new Scene({ id: 'r4' });
  s.plinth(0, 0, 320, 180, 0, 22, G);
  const z = 22;
  // the design: a sheet lying on the studio's plinth
  s.plane(190, 30, 110, 130, z, { fill: G, stroke: HEX.blue });
  s.bar(270, 44, 16, z, { alpha: 1, thick: 30, along: 'y' });
  s.bar(240, 44, 70, z, { thick: 8, along: 'y' });
  s.bar(222, 44, 50, z, { thick: 8, along: 'y' });
  s.echo(200, 110, 40, 36, z);
  // the route leaves the design and runs under the build's edge, rising on its hidden face
  s.route([
    [200, 128, z],
    [170, 128, z],
  ]);
  // the build: the blue plane, the screen standing on it
  const zb = s.slab(10, 20, 160, 140, z, 14);
  const at = s.device(30, 160, 60, zb, 160, { fill: G });
  s.panelBar(at, 14, 134, 56, { solid: true });
  s.panelBar(at, 14, 118, 92, { h: 7 });
  s.panelBar(at, 14, 104, 70, { h: 7 });
  // the route from the design onto the screen
  s.route([
    [170, 128, zb],
    [130, 128, zb],
    [130, 60, zb],
    [130, 60, zb + 40],
  ]);
  s.itemSolidOnPanel(at, 14, 40, 56, 30);
  // the designer's station, on the build, in front of the screen
  s.block(24, 96, 40, 40, zb, 66, { top: G, shaded: HEX.b200, lit: HEX.b100 });
  return s;
}

/* 5 · "We design AI that people can check and correct."
   Message: an AI answer stops at a person's station to be checked before it counts.
   The raw answer is a glimmer on an unresolved field; the route brings it to the station, where it
   waits as a spec'd echo in the dashed square of the check; past the check it lands solid on the
   blue plane, the product where it counts. */
function aiChecked() {
  const s = new Scene({ id: 'r5' });
  s.plinth(-20, 40, 340, 150, 0, 22, G);
  const z = 22;
  // the model's raw output
  s.dots(220, 60, 100, 110, z, { pitch: 30 });
  s.glimmer(270, 115, z, 34);
  // the check: a person's station, the answer held in front of it
  s.block(140, 50, 50, 40, z, 90, { top: G, shaded: HEX.b200, lit: HEX.b100 });
  s.plane(130, 96, 70, 70, z, { fill: 'none', stroke: HEX.blue, dash: '6 4' });
  s.route([
    [236, 131, z],
    [100, 131, z],
  ]);
  s.echo(145, 113, 40, 36, z);
  // where it counts: the route rises on the blue plane's hidden face
  const zb = s.slab(-10, 70, 110, 100, z, 16);
  s.bar(10, 86, 60, zb, { color: HEX.paper, alpha: 0.55, thick: 6 });
  s.bar(10, 100, 40, zb, { color: HEX.paper, alpha: 0.55, thick: 6 });
  s.route([
    [100, 131, zb],
    [70, 131, zb],
  ]);
  s.itemSolid(30, 113, 40, 36, zb, 18);
  return s;
}

/* 6 · "Senior people do the work, and clients keep us for years."
   Message: the same senior seat stays on the product year after year.
   The years are a field of tiles along the product; the product stands behind them, its screen the
   blue plane. Our place is on every year, held in one position by the thread: built echoes on the
   past years, the station itself on this one. */
function seniorYears() {
  const s = new Scene({ id: 'r6' });
  s.plinth(-20, 0, 330, 190, 0, 22, G);
  const z = 22;
  // the client's product, standing behind the years
  const at = s.device(10, 290, 40, z, 140, { fill: G });
  s.panelBar(at, 20, 112, 70, { solid: true });
  s.panelBar(at, 20, 96, 160, { h: 7 });
  s.onPanel(at, 20, 24, 70, 50, { fill: G, stroke: quiet });
  s.onPanel(at, 105, 24, 70, 50, { fill: G, stroke: quiet });
  s.onPanel(at, 190, 24, 70, 50, { fill: G, stroke: quiet });
  // the years, oldest at the left; this year is the blue plane
  const xs = [220, 150, 80];
  for (const x of xs) s.plane(x, 80, 60, 90, z, { fill: G, stroke: HEX.blue });
  s.thread([
    [250, 125, z],
    [70, 125, z],
  ]);
  for (const x of xs) s.echo(x + 15, 110, 30, 30, z, { state: 'built' });
  const zn = s.slab(0, 70, 70, 110, z, 12);
  s.thread([
    [70, 125, zn],
    [54, 125, zn],
  ]);
  s.itemSolid(20, 108, 34, 34, zn, 44);
  return s;
}

/* 7 · "We tell you what is really wrong."
   Message: the problems on the screen trace down to one cause beneath them.
   A cutaway of two layers: the screen above, outline only so what is under it shows, carrying three
   symptoms as echoes; the system below, the blue plane, holding the one cause, solid. The routes
   rise from the cause and run out on the axes to every symptom. */
function whatIsWrong() {
  const s = new Scene({ id: 'r7' });
  const z0 = s.slab(0, 0, 240, 200, 0, 16);
  for (const [x, y] of [
    [170, 20],
    [100, 20],
    [170, 120],
  ])
    s.plane(x, y, 50, 40, z0, { fill: 'none', stroke: onBlue(0.6) });
  s.bar(30, 30, 50, z0, { color: HEX.paper, alpha: 0.55, thick: 6 });
  s.bar(30, 44, 34, z0, { color: HEX.paper, alpha: 0.55, thick: 6 });
  s.itemSolid(40, 120, 50, 40, z0, 18);
  const z1 = 150;
  // the routes rise from the cause, then run out along the screen to each symptom
  s.route([
    [65, 140, z0 + 18],
    [65, 140, z1],
    [65, 40, z1],
    [180, 40, z1],
  ]);
  s.route([
    [65, 140, z1],
    [180, 140, z1],
  ]);
  s.route([
    [65, 90, z1],
    [110, 90, z1],
  ]);
  s.edges(0, 0, 240, 200, z1, {
    back: { stroke: HEX.blue },
    left: { stroke: HEX.blue },
    front: { stroke: HEX.blue },
    right: { stroke: HEX.blue },
  });
  for (const [x, y] of [
    [180, 22],
    [180, 122],
    [110, 72],
  ])
    s.echo(x, y, 40, 36, z1);
  // the screen's own corners, standing on the system
  for (const [x, y] of [
    [0, 200],
    [0, 0],
    [240, 200],
  ])
    s.line(
      [
        [x, y, z0],
        [x, y, z1],
      ],
      { stroke: quiet, dash: '6 4' },
    );
  return s;
}

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
    'model-first': modelFirst,
    'leave-alone': leaveAlone,
    'hard-parts-in-code': hardPartsInCode,
    'into-software': intoSoftware,
    'ai-checked': aiChecked,
    'senior-years': seniorYears,
    'what-is-wrong': whatIsWrong,
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
for (const figs of Object.values(SETS)) {
  for (const [ground, hex] of Object.entries(GROUNDS)) {
    G = hex;
    const scenes = Object.entries(figs).map(([n, fn]) => [n, fn()]);
    const W = Math.max(...scenes.map(([, s]) => s.box[2] - s.box[0])) + M * 2;
    const H = Math.max(...scenes.map(([, s]) => s.box[3] - s.box[1])) + M * 2;
    for (const [name, s] of scenes) {
      const cx = (s.box[0] + s.box[2]) / 2;
      const by = s.box[3] + M;
      const vb = [cx - W / 2, by - H, W, H].map((n) => Math.round(n * 100) / 100);
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
