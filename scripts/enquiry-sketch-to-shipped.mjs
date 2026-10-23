#!/usr/bin/env node
/* The enquiry close's illustration (owner, 23 Oct 2026): one product, carried from sketch to shipped.
   Drawn in ch05 §4a–§4d and placed on the blue island (`CtaSection islandArrangement="halves"`).

   Message line: the same product, carried from sketch to shipped, wherever it starts.
   Concept chip: SKETCH TO SHIPPED (written with --labels; the close places it without, owner 23 Oct:
   the chip was too much text beside the heading, and §4b lets any placement drop the layer).

   §4d, in order:
   01 idea   — the chip and the line above.
   02 item   — the product's hero card image: the one peridot element.
   03 system — a dashed ground diamond (the field), three flat standing panels on it (no thickness),
               staggered front to back so the sequence reads left to right, toward the form. The
               product panel is the one solid plane.
   04 route  — the item holds one position on all three panels: a dashed ink thread joins them along
               the y axis. An echo on the sketch and the prototype, solid exactly once on the product,
               where it is raised on its own thickness.
   05 detail — sketch: dashed outline (unbuilt) and the dot grid (raw, not yet designed). Prototype:
               solid outline, structure only (blocks). Product: the solid plane, with UI shorthand.
   06 labels — the concept chip, its leader straight down the z axis to the solid item, in its own
               removable group.

   THE BLUE PALETTE. ch05 §4a has none (an illustration was not placed on blue until the owner placed
   this one there, 23 Oct 2026), so the paper palette is inverted by its own logic, not invented:
     line              paper            (paper ground: brandeis-500)
     plane face        the ground: brandeis-500, so a nearer plane hides a farther one
     one solid plane   paper, its detail in brandeis-500 at 40–80%   (paper ground: blue, detail paper)
     dot grid          paper at 30%
     item, solid       peridot-400, ink outline; left side face peridot-600
     item, echo        dashed peridot-400 outline; spec'd: peridot-200 with dashed ink outline
     ink thread        neutral-950, dashed
   Line weight 1.5, non-scaling, round joins and caps; every dash 6 4. Projection: §4a's formula.
   Every line from A to B runs along an axis (owner, 23 Oct 2026). Colours are literals because the
   file is served as an image, where custom properties do not resolve.

   Generated, not hand-edited: `node scripts/enquiry-sketch-to-shipped.mjs` rewrites
   public/illustrations/enquiry/sketch-to-shipped.svg. */
import { writeFileSync } from 'node:fs';

const PAPER = '#fffefa', BLUE = '#0048ff', INK = '#1b1b18';
const PER = '#d7f04a', PER_200 = '#edf79b', PER_600 = '#a1b71f';
const S = 0.62; // px per unit on the 1000-unit canvas

let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
/* §4a, placed by formula: sx = (x + y) × 0.7071, sy = (y − x) × 0.3536 − z × 0.8660 */
const P = (x, y, z = 0) => {
  const sx = (x + y) * 0.7071 * S, sy = ((y - x) * 0.3536 - z * 0.866) * S;
  minX = Math.min(minX, sx); maxX = Math.max(maxX, sx); minY = Math.min(minY, sy); maxY = Math.max(maxY, sy);
  return [sx, sy];
};
const pts = (a) => a.map((p) => P(...p).map((n) => n.toFixed(2)).join(',')).join(' ');
const NS = 'vector-effect="non-scaling-stroke"';
const stroke = (c, dashed) => `stroke="${c}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" ${dashed ? 'stroke-dasharray="6 4"' : ''} ${NS}`;
const poly = (a, fill, st = 'stroke="none"', extra = '') => `<polygon points="${pts(a)}" fill="${fill}" ${st} ${extra}/>`;
const line = (a, st) => `<polyline points="${pts(a)}" fill="none" ${st}/>`;

/* ── geometry ── */
const W = 260, H = 340, GAP = 220;                 // a panel: 260 along x, 340 tall; panels 220 apart along y
const PANELS = [0, 1, 2].map((i) => i * GAP);     // sketch, prototype, product (back to front, left to right)
/* a point on a panel's face, in the face's own coordinates: u along x, v up */
const F = (y, u, v) => [u, y, v];
const rectF = (y, u0, u1, v0, v1) => [F(y, u0, v0), F(y, u1, v0), F(y, u1, v1), F(y, u0, v1)];
/* the layout every panel shares (the same product at every stage) */
const L = {
  heading: [24, 120, 304, 316],
  hero: [24, 236, 168, 284],
  item: [148, 220, 184, 268],   // the carried item's place: the same on every panel
  bars: [[38, 128, 262], [38, 112, 246], [38, 96, 230]],
  blockA: [24, 124, 36, 148],
  blockB: [136, 236, 36, 148],
};
const ITEM_C = [(L.item[0] + L.item[1]) / 2, (L.item[2] + L.item[3]) / 2];

let art = '';

/* the field: a dashed ground diamond, in the line colour — context, not a thing */
art += poly([[-70, -90, 0], [W + 70, -90, 0], [W + 70, 2 * GAP + 90, 0], [-70, 2 * GAP + 90, 0]], 'none', stroke(PAPER, true));

/* draw back to front: sketch, thread, prototype, thread, product */
{ // sketch — unbuilt: dashed, no fill, the dot grid on its face
  const y = PANELS[0];
  for (let u = 18; u < W; u += 30) for (let v = 18; v < H; v += 30) {
    const [sx, sy] = P(...F(y, u, v));
    art += `<circle cx="${sx.toFixed(2)}" cy="${sy.toFixed(2)}" r="${(1.1 * S * 1.6).toFixed(2)}" fill="${PAPER}" fill-opacity="0.3"/>`;
  }
  art += poly(rectF(y, 0, W, 0, H), 'none', stroke(PAPER, true));
  for (const k of ['hero', 'blockA', 'blockB']) art += poly(rectF(y, ...L[k]), 'none', stroke(PAPER, true));
  art += poly(rectF(y, ...L.item), 'none', stroke(PER, true)); // the item, named: a dashed peridot outline
}
const thread = (y0, y1) => line([F(y0, ...ITEM_C), F(y1, ...ITEM_C)], stroke(INK, true));
art += thread(PANELS[0], PANELS[1]);
{ // prototype — built structure, not yet a product: solid outline, the ground's face, blocks only
  const y = PANELS[1];
  art += poly(rectF(y, 0, W, 0, H), BLUE, stroke(PAPER, false));
  for (const k of ['heading', 'hero', 'blockA', 'blockB']) art += poly(rectF(y, ...L[k]), 'none', stroke(PAPER, false));
  art += poly(rectF(y, ...L.item), PER_200, stroke(INK, true)); // spec'd: pale peridot, dashed ink outline
}
art += thread(PANELS[1], PANELS[2]);
{ // product — the one solid plane: paper, its detail in blue
  const y = PANELS[2];
  art += poly(rectF(y, 0, W, 0, H), PAPER, stroke(PAPER, false));
  art += poly(rectF(y, ...L.heading), BLUE);                                                     // heading bar
  for (const [u0, u1, v] of L.bars) art += poly(rectF(y, u0, u1, v - 3, v + 3), BLUE, 'stroke="none"', 'fill-opacity="0.45"'); // text bars
  for (const k of ['hero', 'blockA', 'blockB']) art += poly(rectF(y, ...L[k]), 'none', stroke(BLUE, false));
  // the item, solid once, raised on its own thickness off the face (toward the viewer, +y)
  const [u0, u1, v0, v1] = L.item, t = 12, yf = y + t;
  art += poly([[u0, y, v0], [u0, yf, v0], [u0, yf, v1], [u0, y, v1]], PER_600, stroke(INK, false)); // left side: the darker
  art += poly([[u0, y, v1], [u1, y, v1], [u1, yf, v1], [u0, yf, v1]], PER, stroke(INK, false));     // top
  art += poly(rectF(yf, u0, u1, v0, v1), PER, stroke(INK, false));                                  // face
}

/* ── the annotation layer: the concept chip, its leader down the z axis to the solid item ── */
const noLabels = !process.argv.includes('--labels');
let labels = '';
if (!noLabels) {
  const [u0, u1, , v1] = L.item, y = PANELS[2] + 12, cu = (u0 + u1) / 2;
  const top = P(...F(y, cu, H + 120)), tip = P(...F(y, cu, v1 + 4));
  labels += `<line x1="${top[0].toFixed(2)}" y1="${(top[1] + 10).toFixed(2)}" x2="${tip[0].toFixed(2)}" y2="${(tip[1] - 7).toFixed(2)}" ${stroke(INK, true)}/>`;
  labels += `<polygon points="${(tip[0] - 5).toFixed(2)},${(tip[1] - 8).toFixed(2)} ${(tip[0] + 5).toFixed(2)},${(tip[1] - 8).toFixed(2)} ${tip[0].toFixed(2)},${(tip[1] + 2).toFixed(2)}" fill="${INK}"/>`;
  const text = 'SKETCH TO SHIPPED', fs = 17 * S * 1.1, w = text.length * fs * 0.66 + 16, h = fs + 12;
  const x = top[0] - w / 2, yTop = top[1] - h + 10;
  labels += `<rect x="${x.toFixed(2)}" y="${yTop.toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" fill="${PER}" ${stroke(INK, false)}/>`;
  labels += `<text x="${top[0].toFixed(2)}" y="${(yTop + h / 2 + fs * 0.36).toFixed(2)}" text-anchor="middle" font-family="'Geist Mono', ui-monospace, monospace" font-weight="600" font-size="${fs.toFixed(2)}" letter-spacing="${(2 * S).toFixed(2)}" fill="${INK}">${text}</text>`;
  minX = Math.min(minX, x); maxX = Math.max(maxX, x + w); minY = Math.min(minY, yTop);
}

const pad = 4, w = maxX - minX + pad * 2, h = maxY - minY + pad * 2;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${(minX - pad).toFixed(1)} ${(minY - pad).toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}" width="${Math.round(w)}" height="${Math.round(h)}" aria-hidden="true">
<g id="art">${art}</g>
${noLabels ? '' : `<g id="labels">${labels}</g>`}
</svg>`;
const out = new URL('../public/illustrations/enquiry/sketch-to-shipped.svg', import.meta.url);
writeFileSync(out, svg);
console.log(`wrote ${out.pathname.split('/public/')[1]} · ${Math.round(w)}×${Math.round(h)} · aspect ${(w / h).toFixed(2)}`);
