/**
 * Claim · "Customers and staff on the same records." (hard parts, decisions/2026-10-30-claim-visual-depicts-the-claim)
 *
 * Message: an order placed on the customer's screen arrives in the staff's production queue in the
 * same form.
 *
 * One product on one plinth, read left to right (2026-09-28-illustrations-face-left-read-left-to-right):
 * the customer's store screen stands back-left, facing the words; the staff's production side is the
 * one solid blue plane, front-right, with its queue of jobs lying on it. The carried item is the
 * order: solid once on the store screen, where the customer taps it, and a BUILT echo (peridot-200,
 * solid ink outline) in the queue, between the two jobs already there, on the same 80 × 30
 * footprint, so the staff read the order exactly as the customer placed it. The route joins them on
 * the axes (2026-10-23-illustration-lines-follow-iso-axes): from the order's bottom-edge midpoint
 * down the screen's face, along y and then x across the plinth, up the production side's back face
 * (hidden, so the slab occludes it, §4a), and along x on the blue plane to the echo's edge midpoint.
 * The jobs are paper tiles on the blue plane, as the model's records are in the reasons set.
 */
import { HEX, Scene, rgba } from '../lib.mjs';

export const meta = {
  title: 'Customers and staff on the same records.',
  message:
    "An order placed on the customer's screen arrives in the staff's production queue in the same form.",
};

/** A product block on the store screen: an outlined field in the line colour at 45%. */
const quiet = rgba(HEX.blue, 0.45);

/** @param {string} G the ground hex; occluding faces take it (§4a). */
export function draw(G) {
  const s = new Scene({ id: 'c-order-reads' });

  // one product, one plinth: the customer's side and the staff's side share it
  s.plinth(0, 0, 380, 200, 0, 22, G);
  const z = 22;

  // the store screen, back-left, facing the words: a heading, two products, a line of copy
  const at = s.device(220, 360, 50, z, 180, { fill: G });
  s.panelBar(at, 16, 156, 54, { solid: true });
  s.onPanel(at, 16, 96, 50, 44, { fill: G, stroke: quiet });
  s.onPanel(at, 76, 96, 50, 44, { fill: G, stroke: quiet });
  s.panelBar(at, 16, 80, 90, { h: 7 });

  // the order's route, first leg: from its bottom-edge midpoint (u 80 → x 280, v 40 → z 62) down
  // the screen's face to its foot, along y, then along x to the production side's back edge. Drawn
  // before the slab, so the slab hides the run behind it and its rise on the hidden back face.
  s.route([
    [280, 50, 62],
    [280, 50, z],
    [280, 110, z],
    [180, 110, z],
  ]);

  // the staff's production side: the one solid blue plane
  const zb = s.slab(10, 20, 170, 170, z, 16);

  // the production queue: two jobs already in it, paper tiles on the blue plane
  for (const y of [40, 150]) {
    s.plane(60, y, 80, 30, zb, { fill: G, stroke: HEX.blue });
    s.bar(70, y + 10, 40, zb, { thick: 6 });
  }

  // second leg: over the slab's back edge and along x to the echo's edge midpoint (x 140, y 110).
  // Drawn before the echo, so the echo's outline closes over the route's round cap.
  s.route([
    [180, 110, zb],
    [140, 110, zb],
  ]);

  // the order, arrived: a built echo on the same 80 × 30 footprint, between the two jobs
  s.echo(60, 95, 80, 30, zb, { state: 'built' });

  // the order, solid once: on the store screen, where the customer taps it. Drawn last.
  s.itemSolidOnPanel(at, 40, 40, 80, 30);

  return s;
}
