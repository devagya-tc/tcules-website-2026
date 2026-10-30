/**
 * Claim · "Rules nobody has written down." (hard parts, round 7, owner 30 Oct 2026)
 *
 * Message: a rule people follow but never wrote down is heard in research and given its place in the
 * product.
 *
 * Read at 168px, so one idea: the rule (a glimmer, as it was heard, screen-left) is carried by one
 * route onto the product (the one solid blue slab) where it becomes the one solid peridot item. A
 * dashed ghost card stands on the slab's back edge holding the item's echo under one heading: the rule
 * is not yet a written document.
 *
 * Left-facing (lib.mjs projection); the route runs on x / y / z and turns only at a corner, one opaque
 * peridot-200 path (lib routeSolid), clipped to the slab where it comes up over the edge and ending
 * inside the item's footprint so the item's own outline closes it. No labels.
 */
import { HEX, Scene, rgba } from '../lib.mjs';

export const name = 'rules-unwritten';

export const meta = {
  title: 'Rules nobody has written down.',
  message:
    'A rule people follow but never wrote down is heard in research and given its place in the product.',
};

/** The item: centred on the slab, large enough to read at 168. */
const ITEM = { x: 88, y: 100, w: 60, d: 44, h: 18 };
/** The row the rule runs along: the item's centre line. */
const ROW = ITEM.y + ITEM.d / 2;
/** The slab's back edge (x), where the route goes under and rises on the hidden face. */
const BACK = 222;
/** The glimmer: the rule as it was heard. Its front edge clears the slab's shadowed run (§4a). */
const GX = 286;
const GR = 28;
/** The rule card: x 40–200 on the slab's back edge. */
const CARD = { x0: 40, x1: 200, y: 20, h: 170 };

/** @param {string} G the ground hex the drawing is exported on; occluding faces take it (§4a). */
export function draw(G) {
  const s = new Scene({ id: name });

  // 1 · the product
  s.plinth(0, 0, 334, 240, 0, 22, G);
  const z = 22;

  // 2 · the rule as it was heard: a glimmer, screen-left
  s.glimmer(GX, ROW, z, GR);

  // 3 · the route leaves the glimmer and runs to the slab's back edge. It is behind the slab, so it
  //     is painted first and the slab hides its rise on the far face (§4a occlusion).
  s.routeSolid([
    [GX - GR, ROW, z],
    [BACK - 10, ROW, z],
  ]);

  // 4 · the product: the one solid blue plane
  const zb = s.slab(10, 20, BACK - 10, 200, z, 16);

  // 5 · the rule, not yet written down: a ghost card on the slab's back edge, one heading and the
  //     item's echo
  const at = s.panel(CARD.x0, CARD.x1, CARD.y, zb, CARD.h, {
    fill: rgba(HEX.paper, 0),
    stroke: HEX.blue,
    dash: '6 4',
  });
  s.panelBar(at, 14, 96, 70, { h: 7 });
  s.echoOnPanel(at, 14, 28, 56, 52);

  // 6 · the route crosses the slab, clipped to the plane where it comes over the edge, and ends
  //     inside the item's footprint
  s.routeSolid(
    [
      [BACK + 10, ROW, zb],
      [ITEM.x + ITEM.w - 10, ROW, zb],
    ],
    { on: [10, 20, BACK - 10, 200, zb] },
  );

  // 7 · the rule, given its place: solid once
  s.itemSolid(ITEM.x, ITEM.y, ITEM.w, ITEM.d, zb, ITEM.h);

  return s;
}

export default draw;
