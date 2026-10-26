/**
 * npm run illustrations:engagement — the four "Ways to work with us" drawings (product-design page,
 * owner 26 Oct 2026: drawn like home's Why Tcules), in the Reasons house style (ch05 §4a–§4b), one per
 * engagement scope, each exported on both grounds the Reasons band sits on. One shared world box, so
 * the four sit at one scale. Strokes 1.5 (the kit's), as Reasons. Left-facing; every route runs on the
 * x / y axes and turns at a corner. Writes public/illustrations/engagement/<scope>.<ground>.svg.
 * Generated, never hand-edited. `--check` fails if a file is stale.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

import { GROUNDS, HEX, Scene, rgba } from './lib.mjs';

/** The ground the drawing is exported on: its occluding faces take this colour (§4a). */
let G = HEX.paper;
const quiet = rgba(HEX.blue, 0.45);
const BOX = { x0: -20, x1: 300, y0: -20, y1: 220, z0: 0, z1: 250 };

/* 1 · A single workflow or feature — one screen on a small plinth; one route crosses its three
   steps, left to right, and ends where the carried item sits. Small and complete. */
function single() {
  const s = new Scene({ id: 'e1' });
  s.plinth(40, 40, 240, 170, 0, 22, G);
  const at = s.device(70, 250, 125, 22, 200, { fill: G });
  s.panelBar(at, 20, 172, 70, { solid: true });
  s.panelBar(at, 20, 154, 120, { h: 7 });
  for (const u of [20, 74, 128]) s.onPanel(at, u, 86, 32, 32, { fill: G, stroke: quiet });
  s.line([at(36, 102), at(128, 102)], { stroke: HEX.p400, width: 7.5, opacity: 0.55 });
  s.itemSolidOnPanel(at, 128, 86, 32, 32);
  s.panelBar(at, 20, 50, 100, { h: 7 });
  s.panelBar(at, 20, 34, 70, { h: 7 });
  return s;
}

/* 2 · A product area or a whole new product — a larger plinth holding the product as a grid of
   areas; one area is the solid blue plane, carrying the item; the designs stand behind them. */
function area() {
  const s = new Scene({ id: 'e2' });
  s.plinth(0, 0, 270, 200, 0, 22, G);
  const z = 22;
  const at = s.device(150, 260, 36, z, 180, { fill: G });
  s.panelBar(at, 14, 156, 52, { solid: true });
  for (let i = 0; i < 4; i++) s.panelBar(at, 14, 138 - i * 15, i % 2 ? 62 : 82, { h: 7 });
  s.onPanel(at, 14, 22, 82, 36, { fill: HEX.b50, stroke: quiet });
  for (const [x, y] of [
    [184, 76],
    [102, 76],
    [20, 76],
    [184, 140],
  ])
    s.plane(x, y, 70, 52, z, { fill: G, stroke: HEX.blue });
  s.plane(20, 140, 152, 52, z, { fill: HEX.blue, stroke: HEX.blue });
  s.bar(110, 150, 46, z, { color: HEX.paper, alpha: 0.6, thick: 7, along: 'x' });
  s.bar(110, 165, 30, z, { color: HEX.paper, alpha: 0.6, thick: 7, along: 'x' });
  s.itemSolid(36, 150, 46, 32, z, 18);
  return s;
}

/* 3 · A designer in your team — your team as a row of identical stations on one base; ours is one
   of them, carrying the item; a dashed place at the end for the specialists who join. */
function embedded() {
  const s = new Scene({ id: 'e3' });
  s.plinth(-20, 80, 310, 92, 0, 22, G);
  const z = 22;
  const xs = [230, 154, 78, 2];
  xs.forEach((x, i) => {
    if (i === 3) {
      s.edges(x, 102, 48, 48, z, {
        back: { dash: '6 4' },
        left: { dash: '6 4' },
        front: { dash: '6 4' },
        right: { dash: '6 4' },
      });
      return;
    }
    s.block(x, 102, 48, 48, z, 72, { top: G, shaded: HEX.b200, lit: HEX.b100 });
    if (i === 1) s.itemSolid(x + 9, 111, 30, 30, z + 72, 18);
  });
  return s;
}

/* 4 · Design and build — the plan (dashed, unbuilt) and the built screen on one plinth; the item
   echoes on the plan and stands solid on the build; its route runs on the plinth along the axes. */
function build() {
  const s = new Scene({ id: 'e4' });
  s.plinth(-40, 10, 300, 170, 0, 22, G);
  const z = 22;
  s.route([
    [205, 30, z],
    [205, 95, z],
    [25, 95, z],
    [25, 150, z],
  ]);
  const plan = s.panel(160, 250, 30, z, 180, { fill: 'none', dash: '6 4' });
  s.onPanel(plan, 12, 154, 50, 8, { fill: 'none', stroke: quiet, dash: '6 4' });
  s.onPanel(plan, 12, 134, 66, 7, { fill: 'none', stroke: quiet, dash: '6 4' });
  s.echoOnPanel(plan, 12, 40, 66, 28);
  const at = s.device(-20, 70, 150, z, 180, { fill: G });
  s.panelBar(at, 12, 154, 50, { solid: true });
  s.panelBar(at, 12, 138, 70, { h: 7 });
  s.panelBar(at, 12, 124, 54, { h: 7 });
  s.itemSolidOnPanel(at, 12, 40, 66, 28);
  return s;
}

const FIGS = { feature: single, area, embedded, build };
const M = 24;
const outDir = new URL('../../public/illustrations/engagement/', import.meta.url);
mkdirSync(outDir, { recursive: true });
let stale = 0;
for (const [ground, hex] of Object.entries(GROUNDS)) {
  G = hex;
  const scenes = Object.entries(FIGS).map(([n, fn]) => [n, fn()]);
  const W = Math.max(...scenes.map(([, s]) => s.box[2] - s.box[0])) + M * 2;
  const H = Math.max(...scenes.map(([, s]) => s.box[3] - s.box[1])) + M * 2;
  for (const [name, s] of scenes) {
    const cx = (s.box[0] + s.box[2]) / 2;
    const by = s.box[3] + M;
    const vb = [cx - W / 2, by - H, W, H].map((n) => Math.round(n * 100) / 100);
    const body = (s.defs.length ? `<defs>${s.defs.join('')}</defs>` : '') + s.art.join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" width="${Math.round(vb[2])}" height="${Math.round(vb[3])}" aria-hidden="true">${body.replaceAll('{{id}}', `${s.id}-${ground}`)}</svg>\n`;
    const file = new URL(`${name}.${ground}.svg`, outDir);
    if (process.argv.includes('--check')) {
      let cur = '';
      try {
        cur = readFileSync(file, 'utf8');
      } catch {}
      if (cur !== svg) stale++;
    } else writeFileSync(file, svg);
  }
}
if (stale) {
  console.error(
    `engagement: ${stale} drawing(s) stale. Run \`npm run illustrations:engagement\`.`,
  );
  process.exit(1);
}
console.log(`engagement: ${process.argv.includes('--check') ? 'current' : 'wrote 8 drawings'}`);
