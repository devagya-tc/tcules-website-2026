/**
 * Claim · "Screens people work in for hours." (hard parts, round 7, owner 30 Oct 2026)
 * House style, ch05 §4a–§4b; strokes 1.5 (the kit's); left-facing.
 *
 * Message: a screen someone works in all day: the working day runs along its foot as hours, and it is
 * still in use late in the day.
 *
 * Construction: one light base plate, the product. One standing working screen (the same register in
 * every frame: a heading, a filter, four table rows; no chart, no state glyphs). In front of it, along
 * its foot, the one solid blue plane is the working day: eight hour cells in a row. Six are spent
 * (paper, outlined), the seventh is the one solid peridot item, now, late in the day, and the eighth is
 * an outline only, the hour still to come. Every mark is explained by its place; no connector, no
 * labels.
 */
import { HEX, Scene, onBlue } from '../lib.mjs';

export const name = 'screens-for-hours';

export const meta = {
  title: 'Screens people work in for hours.',
  message:
    'A screen someone works in all day: the working day runs along its foot as hours, and it is still in use late in the day.',
};

/** Eight hour cells along x: width 32, pitch 38, from x 30. */
const CELL = { w: 32, d: 28, pitch: 38, x0: 30, y: 118 };

/** @param {string} G the ground hex; faces take it, so they read as opaque sheets (§4a). */
export function draw(G) {
  const s = new Scene({ id: name });
  const z = 22;

  // the product: one light base plate
  s.plinth(0, 0, 410, 175, 0, z, G);

  // the working screen: one register in every frame
  const at = s.device(150, 330, 50, z, 170, { fill: G, t: 6 });
  s.panelBar(at, 14, 150, 70, { solid: true });
  s.onPanel(at, 14, 128, 60, 10, { fill: G, stroke: HEX.blue });
  [
    [104, 140],
    [88, 120],
    [72, 140],
    [56, 100],
  ].forEach(([v, w]) => s.panelBar(at, 14, v, w, { h: 5 }));

  // the working day: the one blue plane along the screen's foot
  const zb = s.slab(20, 110, 320, 44, z, 12);
  for (let i = 0; i < 8; i++) {
    const x = CELL.x0 + i * CELL.pitch;
    if (i < 6) s.plane(x, CELL.y, CELL.w, CELL.d, zb, { fill: G, stroke: HEX.blue });
    else if (i === 6) s.itemSolid(x, CELL.y, CELL.w, CELL.d, zb, 14);
    else s.plane(x, CELL.y, CELL.w, CELL.d, zb, { fill: 'none', stroke: onBlue(0.5) });
  }

  return s;
}

export default draw;
