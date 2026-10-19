/**
 * Bento's wave masks: the shapes the pixel grid shows through behind a bento's drawings (owner,
 * 19 Oct 2026, What we do mocks v6–v13). One shape per row of a four-track bento, drawn across the
 * whole row and clipped by each tile, so the texture reads as one field while every seam stays a
 * clean tile edge; and one for a tile on its own, below 1024, where the tiles no longer share a row.
 *
 * Each crest is a set of points (shares of the row's width and height) read off the owner's sketch,
 * through a Catmull-Rom curve. Everything under the crest is filled and feathered. The SVGs stretch
 * (`preserveAspectRatio="none"`) to the row they mask.
 *
 *   node scripts/bento-waves.mjs          write public/textures/bento-wave-*.svg
 *   node scripts/bento-waves.mjs --check  fail if a committed file is out of date
 */
import { readFileSync, writeFileSync } from 'node:fs';

const W = 1240;
const H = 280;
const BLUR = 18;

const SHAPES = {
  /* First row: Product Design wide, then two singles. */
  'row-a': [[0, .59], [.17, .84], [.33, .62], [.45, .34], [.53, .5], [.6, .76], [.68, .78], [.82, .69], [1, .56]],
  /* Second row: two singles, then Software Development wide. */
  'row-b': [[0, .76], [.12, .58], [.3, .63], [.44, .78], [.6, .72], [.7, .6], [.8, .26], [.87, .13], [.95, .2], [1, .38]],
  /* One tile on its own (below 1024): a gentle rise behind the drawing at its foot. */
  tile: [[0, .62], [.3, .8], [.62, .48], [1, .62]],
};

const r = (n) => Math.round(n * 10) / 10;

function path(points) {
  const pts = points.map(([x, y]) => [x * W, y * H]);
  pts.unshift([-80, pts[0][1]]);
  pts.push([W + 80, pts.at(-1)[1]]);
  let d = `M${r(pts[0][0])} ${r(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c = [
      p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6,
      p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6,
      p2[0], p2[1],
    ].map(r);
    d += ` C${c.join(' ')}`;
  }
  return `${d} L${W + 80} ${H + 80} L-80 ${H + 80} Z`;
}

const svg = (points) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">` +
  `<filter id="f" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="${BLUR}"/></filter>` +
  `<path filter="url(#f)" fill="black" d="${path(points)}"/></svg>\n`;

const check = process.argv.includes('--check');
let stale = 0;
for (const [name, points] of Object.entries(SHAPES)) {
  const file = new URL(`../public/textures/bento-wave-${name}.svg`, import.meta.url);
  const out = svg(points);
  if (check) {
    let now = '';
    try { now = readFileSync(file, 'utf8'); } catch {}
    if (now !== out) { console.error(`bento-waves: public/textures/bento-wave-${name}.svg is out of date`); stale++; }
  } else {
    writeFileSync(file, out);
    console.log(`wrote public/textures/bento-wave-${name}.svg`);
  }
}
if (stale) process.exit(1);
