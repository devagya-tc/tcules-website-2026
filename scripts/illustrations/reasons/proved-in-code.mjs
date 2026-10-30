/**
 * Reason · "We prove the hard parts in code while they can still change." (Why Tcules, offer set;
 * owner 30 Oct 2026, decisions/2026-10-30-reasons-take-illustrations). House style, ch05 §4a–§4b;
 * strokes 1.5 (the kit's); left-facing.
 *
 * Message: in a board whose design is still open, the one hard interaction, dragging a card to
 * another column, already works in code.
 *
 * Construction. One paper plinth holds a two-column board. Screen-left and behind, the open column:
 * a dashed outline on a dot field (§4a texture, not yet designed), its cards dashed (proposed).
 * Screen-right and in front, the column built in code: the one solid blue plane, raised as a slab,
 * its cards in the ground's colour with a text bar each. The two columns hold their cards at the
 * same three rows (y 34 / 75 / 116), so the board reads as one board.
 *
 * The carried item is the card being dragged. Its old place is the open column's middle row; its
 * route runs on the x axis from that place's centre across the plinth, rises on the slab's hidden
 * face (drawn before the slab, so the slab hides that stretch), and runs on along the blue plane to
 * the drop slot's centre. The slot is the item's NAMED echo (dashed peridot over 25% ink, on the
 * blue plane), with the item's own footprint. The item is solid once, in hand: lifted 130 above its
 * slot, because floating is the point of a drag (§4a Elevation). A dashed ink thread rises on the z
 * axis from the slot's centre to the item's bottom-face centre, drawn before the item so the item's
 * near faces cover its last stretch.
 *
 * The dot field is one lattice at pitch 40 (the top of §4a's 28–40 band) centred on the column:
 * x 160 / 200 by y 50 / 90 / 130, every point inside a dashed card and 10 or more units clear of
 * its outline. At pitch 30 the lattice lands on the card outlines. The one point the route covers,
 * (160, 90), is left out, so no dot shows through the route's 55%.
 *
 * Every coordinate is on the column's grid; artwork about 297 × 229 (aspect 1.30). The annotation
 * layer is dropped (a Reasons figure is set at 256px, §4b).
 */
import { HEX, Scene } from '../lib.mjs';

export const meta = {
  title: 'We prove the hard parts in code while they can still change.',
  message:
    'In a board whose design is still open, the one hard interaction, dragging a card to another column, already works in code.',
};

/** The board's rows: every card, dashed or built, and the slot, sit on these. */
const ROWS = { back: 34, mid: 75, front: 116 };
/** A card's footprint: 60 along x, 30 along y. The item, its slot and its old place share it. */
const CARD = { w: 60, d: 30 };
const DASHED = { fill: 'none', stroke: HEX.blue, dash: '6 4' };

export function draw(G) {
  const s = new Scene({ id: 'proved-in-code' });
  const z = 22;

  // 1 · the board's base
  s.plinth(0, 0, 240, 180, 0, z, G);

  // 2 · the open column (screen-left, behind): dashed outline on a dot field, dashed cards
  s.plane(130, 20, 100, 140, z, DASHED);
  // the field's lattice is x 160 / 200 by y 50 / 90 / 130; (160, 90) lies under the route, so
  // the middle row is emitted from its free half only
  s.dots(130, 30, 100, 40, z, { pitch: 40 });
  s.dots(180, 70, 40, 40, z, { pitch: 40 });
  s.dots(130, 110, 100, 40, z, { pitch: 40 });
  for (const y of [ROWS.back, ROWS.front]) s.plane(150, y, CARD.w, CARD.d, z, DASHED);
  // the card's old place
  s.plane(150, ROWS.mid, CARD.w, CARD.d, z, DASHED);
  // the route leaves the old place's centre along x; its end and its rise on the slab's hidden face
  // are drawn before the slab, so the slab hides them (painter's order, §4a occlusion)
  const cy = ROWS.mid + CARD.d / 2;
  s.route([
    [150 + CARD.w / 2, cy, z],
    [120, cy, z],
  ]);

  // 3 · the column built in code: the one solid blue plane
  const zb = s.slab(10, 20, 110, 140, z, 14);

  // 4 · its built cards, each with a text bar
  for (const y of [ROWS.back, ROWS.front]) {
    s.plane(35, y, CARD.w, CARD.d, zb, { fill: G, stroke: HEX.blue });
    s.bar(45, y + 9, 30, zb, { thick: 6 });
  }

  // 5 · the drop slot: the item's named echo on the blue plane
  s.echo(35, ROWS.mid, CARD.w, CARD.d, zb, { onBluePlane: true });

  // 6 · the route comes up over the slab's back edge and ends at the slot's centre
  const cx = 35 + CARD.w / 2;
  s.route([
    [120, cy, zb],
    [cx, cy, zb],
  ]);

  // 7 · the thread: slot centre up to the lifted card's bottom-face centre
  const lift = 130;
  s.thread([
    [cx, cy, zb],
    [cx, cy, zb + lift],
  ]);

  // 8 · the card in hand: solid once, lifted over its slot
  s.itemSolid(35, ROWS.mid, CARD.w, CARD.d, zb + lift, 16);
  return s;
}
