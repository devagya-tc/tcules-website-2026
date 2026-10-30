/**
 * Claim · "Customers and staff on the same records." (hard parts, decisions/2026-10-30-claim-visual-depicts-the-claim)
 *
 * Message: an order placed on the customer's screen arrives in the staff's production queue as the
 * same card.
 *
 * One product on one plinth. The customer's store screen stands at the back, facing the words; the
 * staff's production side is the one solid blue plane in front of it, its queue a row of job cards
 * lying on it. The carried item is the order card: solid once on the store screen, where the
 * customer taps it, and its BUILT echo (peridot-200, solid ink outline) in the queue, between two jobs
 * already there. All four cards are one card: 80 × 30 with the same inner lines (a mark and two
 * text lines) at the same places, so the staff read the order exactly as the customer placed it. On
 * the standing screen u runs screen-left to right (x falling) and v runs up; lying flat, the same
 * card maps u to x falling and v to y falling, so its lines sit where they sat upright.
 *
 * The route is one corner (2026-10-23-illustration-lines-follow-iso-axes): down the screen's face
 * on z from the order's bottom-edge midpoint to the foot, then along y on the plinth to the queue,
 * rising on the production side's hidden back face (painted before the slab, §4a occlusion) and on
 * along y across the blue plane to the echo's back-edge midpoint. Drawn as one opaque peridot-200
 * path (lib routeSolid), clipped to the blue plane where it comes up over the edge.
 */
import { HEX, Scene, rgba } from '../lib.mjs';

export const meta = {
  title: 'Customers and staff on the same records.',
  message:
    "An order placed on the customer's screen arrives in the staff's production queue as the same card.",
};

/** A product block on the store screen: an outlined field in the line colour at 45%. */
const quiet = rgba(HEX.blue, 0.45);
/** The card: 80 × 30, its inner lines at fixed (u, v). */
const CARD = { w: 80, h: 30 };
const MARK = { u: 8, v: 9, s: 12 };
const LINES = [
  { u: 28, v: 17, w: 40 },
  { u: 28, v: 8, w: 26 },
];
/** The store screen: x 100–240 at y 50, standing on the plinth. */
const SCREEN = { x0: 100, x1: 240, y: 50, h: 180 };
/** The order on the screen: u 30–110 (x 210–130, centre 170), v 36–66. */
const ORDER = { u: 30, v: 36 };
/** The production side and its queue: three cards along x, the order arriving in the middle. */
const SLAB = { x: 10, y: 100, w: 320, d: 90 };
const QUEUE_Y = 130;
const QUEUE_X = [230, 130, 30];

/** @param {string} G the ground hex; occluding faces take it (§4a). */
export function draw(G) {
  const s = new Scene({ id: 'c-order-reads' });
  const z = 22;

  // the card's inner lines, upright on a panel or lying flat at (x0, y0, zf)
  const linesOnPanel = (at, u0, v0, ink) => {
    s.onPanel(at, u0 + MARK.u, v0 + MARK.v, MARK.s, MARK.s, { fill: ink, stroke: 'none' });
    for (const l of LINES)
      s.onPanel(at, u0 + l.u, v0 + l.v, l.w, 5, { fill: rgba(ink, 0.45), stroke: 'none' });
  };
  const flat = (x0, y0, zf) => (u, v) => [x0 + CARD.w - u, y0 + CARD.h - v, zf];
  const linesFlat = (x0, y0, zf, ink, alpha) => {
    const at = flat(x0, y0, zf);
    const rect = (u, v, w, h, fill) =>
      s.poly([at(u, v), at(u + w, v), at(u + w, v + h), at(u, v + h)], { fill, stroke: 'none' });
    rect(MARK.u, MARK.v, MARK.s, MARK.s, ink);
    for (const l of LINES) rect(l.u, l.v, l.w, 5, rgba(ink, alpha));
  };

  // one product, one plinth: the customer's side and the staff's side share it
  s.plinth(0, 0, 340, 200, 0, z, G);

  // the store screen, at the back, facing the words: a heading, two products, a line of copy
  const at = s.device(SCREEN.x0, SCREEN.x1, SCREEN.y, z, SCREEN.h, { fill: G });
  s.panelBar(at, 16, 156, 54, { solid: true });
  s.onPanel(at, 16, 96, 50, 44, { fill: G, stroke: quiet });
  s.onPanel(at, 74, 96, 50, 44, { fill: G, stroke: quiet });
  s.panelBar(at, 16, 80, 90, { h: 7 });

  // the route, one corner: down the screen's face, then along y to the queue. Its run behind the
  // slab is painted first, so the slab hides it and its rise on the hidden back face.
  const rx = SCREEN.x1 - ORDER.u - CARD.w / 2;
  s.routeSolid([
    [rx, SCREEN.y, z + ORDER.v],
    [rx, SCREEN.y, z],
    [rx, SLAB.y + 10, z],
  ]);

  // the staff's production side: the one solid blue plane
  const zb = s.slab(SLAB.x, SLAB.y, SLAB.w, SLAB.d, z, 16);

  // on along y across the blue plane to the echo's back edge, clipped to the plane
  s.routeSolid(
    [
      [rx, SLAB.y - 10, zb],
      [rx, QUEUE_Y, zb],
    ],
    { on: [SLAB.x, SLAB.y, SLAB.w, SLAB.d, zb] },
  );

  // the queue: two jobs already in it, the same card in paper, and the order arrived between them
  for (const x of [QUEUE_X[0], QUEUE_X[2]]) {
    s.plane(x, QUEUE_Y, CARD.w, CARD.h, zb, { fill: G, stroke: HEX.blue });
    linesFlat(x, QUEUE_Y, zb, HEX.blue, 0.45);
  }
  s.echo(QUEUE_X[1], QUEUE_Y, CARD.w, CARD.h, zb, { state: 'built' });
  linesFlat(QUEUE_X[1], QUEUE_Y, zb, HEX.ink, 0.45);

  // the order, solid once: on the store screen, where the customer taps it. Drawn last.
  s.itemSolidOnPanel(at, ORDER.u, ORDER.v, CARD.w, CARD.h);
  linesOnPanel(at, ORDER.u, ORDER.v, HEX.ink);

  return s;
}
