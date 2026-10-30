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
 * its cards in the ground's colour with a text bar each. The columns abut at x 120, are each 110
 * wide with cards inset 25 a side, span the same y 20–160 and hold their cards on the same three
 * rows (y 34 / 75 / 116), so the two read as one board: the open column's front edge runs on into
 * the slab's foot as one line.
 *
 * The carried item is the card being dragged, on the board's back row. Its old place is the open
 * column's back card; its route runs on the x axis from that place's centre across the plinth,
 * rises on the slab's hidden face (drawn before the slab, so the slab hides that stretch), and runs
 * on along the blue plane to the drop slot's centre. The slot is the item's NAMED echo (dashed
 * peridot over 25% ink, on the blue plane), with the item's own footprint. The item is solid once,
 * in hand: lifted 250 above its slot, high enough that the drawing fills the set's shared box
 * as its neighbours do, and a long drop line says the card is still in the air: it can still
 * change (§4a Elevation). A
 * dashed ink thread runs on the z axis between the slot's centre and the item's bottom-face centre;
 * it is drawn before the item, top down, so its dash phase starts under the item and a dash meets
 * the item's lower edge, and the item's near faces cover its last stretch.
 *
 * Polished at zoom from the prototype (same forms, same columns, same footprint):
 * - The drag runs on the back row, not the middle one. From the middle slot the thread's screen
 *   line (x + y = 155) grazed the back built card's corner (159) and crossed the slab's back edge
 *   exactly where the open column's back edge comes out from behind the slab (157). From the back
 *   slot (x + y = 114) it clears every corner by 26 or more.
 * - The plinth runs 30 behind the board instead of 20. At 20 the slab's back top edge drew 1.8
 *   units off the plinth's back edge: a doubled edge. At 30 they are 8 apart.
 * - The open column starts at x 120, against the slab, instead of 130 (cards at 145 instead of 150,
 *   keeping the 25 inset). With a 10 gap its right edge hid behind the slab except for a dashed
 *   stub that ran into the slab's front corner halfway up. Abutting, that edge is the slab's own
 *   hidden foot, and the front edges join end to end.
 * - The dot field is one lattice at pitch 40 (the top of §4a's 28–40 band) centred on the column,
 *   x 155 / 195 by y 50 / 90 / 130: every point inside a dashed card and 10 or more units clear of
 *   its outline (at pitch 30 the lattice lands on the outlines). The one point under the route,
 *   (155, 50), is left out, so no dot shows through the route.
 *
 * Artwork about 304 × 234 (aspect 1.30). The annotation layer is dropped (a Reasons figure is set
 * at 256px, §4b).
 */
import { HEX, Scene } from '../lib.mjs';

export const meta = {
  title: 'We prove the hard parts in code while they can still change.',
  message:
    'In a board whose design is still open, the one hard interaction, dragging a card to another column, already works in code.',
};

/** The board's rows: every card, dashed or built, the old place and the slot sit on these. */
const ROWS = { back: 34, mid: 75, front: 116 };
/** A card's footprint: 60 along x, 30 along y. The item, its slot and its old place share it. */
const CARD = { w: 60, d: 30 };
const DASHED = { fill: 'none', stroke: HEX.blue, dash: '6 4' };
/** Each column is 110 wide with its cards inset 25 a side: open x 120–230, built x 10–120. */
const OPEN_X = 145;
const BUILT_X = 35;
/** How far the card is lifted in hand. */
const LIFT = 250;

export function draw(G) {
  const s = new Scene({ id: 'proved-in-code' });
  const z = 22;

  // 1 · the board's base
  s.plinth(0, -10, 240, 190, 0, z, G);

  // 2 · the open column (screen-left, behind): dashed outline on a dot field, dashed cards
  s.plane(120, 20, 110, 140, z, DASHED);
  // lattice x 155 / 195 by y 50 / 90 / 130, less (155, 50) under the route
  s.dots(175, 30, 40, 40, z, { pitch: 40 });
  s.dots(120, 70, 110, 80, z, { pitch: 40 });
  for (const y of [ROWS.mid, ROWS.front]) s.plane(OPEN_X, y, CARD.w, CARD.d, z, DASHED);
  // the card's old place
  s.plane(OPEN_X, ROWS.back, CARD.w, CARD.d, z, DASHED);
  // the route leaves the old place's centre along x; its end and its rise on the slab's hidden face
  // are drawn before the slab, so the slab hides them (painter's order, §4a occlusion)
  const cy = ROWS.back + CARD.d / 2;
  s.routeSolid([
    [OPEN_X + CARD.w / 2, cy, z],
    [110, cy, z],
  ]);

  // 3 · the column built in code: the one solid blue plane
  const zb = s.slab(10, 20, 110, 140, z, 14);

  // 4 · its built cards, each with a text bar
  for (const y of [ROWS.mid, ROWS.front]) {
    s.plane(BUILT_X, y, CARD.w, CARD.d, zb, { fill: G, stroke: HEX.blue });
    s.bar(BUILT_X + 10, y + 9, 30, zb, { thick: 6 });
  }

  // 5 · the drop slot: the item's named echo on the blue plane
  s.echo(BUILT_X, ROWS.back, CARD.w, CARD.d, zb, { onBluePlane: true });

  // 6 · the route comes up over the slab's back-left edge and ends at the slot's centre
  const cx = BUILT_X + CARD.w / 2;
  s.routeSolid(
    [
      [130, cy, zb],
      [cx, cy, zb],
    ],
    { on: [10, 20, 110, 140, zb] },
  );

  // 7 · the thread between the slot's centre and the lifted card's bottom-face centre
  s.thread([
    [cx, cy, zb + LIFT],
    [cx, cy, zb],
  ]);

  // 8 · the card in hand: solid once, lifted over its slot
  s.itemSolid(BUILT_X, ROWS.back, CARD.w, CARD.d, zb + LIFT, 16);
  return s;
}
