/**
 * Claim · "Screens people work in for hours." (hard parts, round 7, owner 30 Oct 2026)
 * House style, ch05 §4a–§4b; strokes 1.5 (the kit's); left-facing.
 *
 * Message: a screen someone works in all day: the working day runs along its foot as hours, and it is
 * still in use late in the day.
 *
 * Construction: one light base plate, the product. One standing working screen (the same register in
 * every frame: a heading, a filter, four table rows; no chart, no state glyphs). In front of it, along
 * its foot, the one solid blue plane is the working day: six hour cells in a row, running from the
 * back-left to the front-right. Four are spent (paper, outlined), the fifth is the one solid peridot
 * item, now, late in the day, and the sixth is a dashed outline, the hour still to come. Every mark is explained by its place; no connector, no
 * labels.
 */
import { HEX, Scene } from '../lib.mjs';

export const name = 'screens-for-hours';

export const meta = {
  title: 'Screens people work in for hours.',
  message:
    'A screen someone works in all day: the working day runs along its foot as hours, and it is still in use late in the day.',
};

/** Six hour cells along x: width 44, pitch 52, from x 32. Time runs from the back-left, where the eye
 * starts, to the front-right, where it ends. */
const CELL = { w: 44, d: 40, pitch: 52, x0: 32, y: 118, n: 6 };

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
  const zb = s.slab(20, 100, 330, 56, z, 12);
  const at6 = (t) => CELL.x0 + (CELL.n - 1 - t) * CELL.pitch;
  // hours spent: back-left, first
  for (let t = 0; t < 4; t++)
    s.plane(at6(t), CELL.y, CELL.w, CELL.d, zb, { fill: G, stroke: HEX.blue });
  // now: the second-to-last hour, late in the day
  s.itemSolid(at6(4), CELL.y, CELL.w, CELL.d, zb, 14);
  // the hour still to come: a dashed outline, the same "not yet" as a ghost card
  s.plane(at6(5), CELL.y, CELL.w, CELL.d, zb, { fill: 'none', stroke: HEX.paper, dash: '6 4', width: 1.9 });

  return s;
}

export default draw;
