/**
 * Claim · "Rules nobody has written down." (hard parts, round 6, owner 30 Oct 2026)
 *
 * Message: which meeting gives way is a rule people follow but never wrote down; heard in research,
 * it is written into the calendar, so the important meeting takes the slot and the other one moves.
 *
 * Carried item: the important meeting, which the rule puts first. The rule is raw as a glimmer in
 * the research field (screen-left, read first); the route runs from it to the calendar's back edge,
 * rises on the slab's hidden face and crosses the top to the contested slot, where the item is solid,
 * holding the slot. The meeting it displaced is pale blue in the next day's same hour, a short paper
 * arrow showing the move out of the slot. The calendar is the one solid blue plane: three days of
 * three hours, reading left to right.
 *
 * The rule, written down: a ghost card standing on the calendar's back edge, dashed (proposed: the
 * rule as we write it, not yet a screen). It carries the rule in the calendar's own terms, under a text line:
 * the item's echo, an arrow, the pale displaced block. The slot below obeys it.
 *
 * Left-facing (lib.mjs projection); every route and arrow runs on x / y / z and turns only at a
 * corner (2026-10-23-illustration-lines-follow-iso-axes). The route is one opaque peridot-200 path
 * (lib routeSolid), clipped to the blue plane where it comes up over the edge, and ends inside the
 * item's footprint so the item's own outline closes it. No labels: a claim figure is set at 320px
 * and below, so the annotation layer is never drawn (§4b).
 */
import { HEX, Scene, onBlue, rgba } from '../lib.mjs';

export const name = 'rules-unwritten';

export const meta = {
  title: 'Rules nobody has written down.',
  message:
    'Which meeting gives way is a rule people follow but never wrote down; heard in research, it is written into the calendar, so the important meeting takes the slot and the other one moves.',
};

/** The three days, screen-left (first) to screen-right (last), DAY wide with a 24 gap. */
const DAYS = [168, 100, 32];
/** The three hours, back to front, HOUR deep. */
const HOURS = [56, 112, 168];
const DAY = 44;
const HOUR = 32;
/** The row the rule runs along: the contested hour's centre line. */
const ROW = HOURS[1] + HOUR / 2;
/** The calendar's back edge (x), where the route goes under and rises on the hidden face. */
const BACK = 222;
/** The glimmer: the rule as it was heard. Its front edge clears the slab's shadowed run (§4a). */
const GX = 286;
const GR = 28;
/** The displaced meeting: pale blue, lower priority, moved. */
const MOVED = { fill: HEX.b200, stroke: HEX.blue };
/** The rule card: x 40–200 on the calendar's back edge, 140 tall. */
const CARD = { x0: 40, x1: 200, y: 20, h: 140 };

/** @param {string} G the ground hex the drawing is exported on; occluding faces take it (§4a). */
export function draw(G) {
  const s = new Scene({ id: name });

  // 1 · the product
  s.plinth(0, 0, 334, 240, 0, 22, G);
  const z = 22;

  // 2 · the research field, screen-left: raw, unresolved; the rule as it was heard. One 30-pitch
  //     field (rows 53 … 203, columns GX ± 15), laid as two runs so its four dots inside the ring
  //     (rows 113 / 143) give way to the glimmer and never sit on a peridot dot or the ring's line.
  s.dots(GX - 37, 38, 75, 60, z, { pitch: 30 });
  s.dots(GX - 37, 158, 75, 60, z, { pitch: 30 });
  s.glimmer(GX, ROW, z, GR);

  // 3 · the route leaves the glimmer and runs to the calendar's back edge. It is behind the slab,
  //     so it is painted first and the slab hides its rise on the far face (§4a occlusion).
  s.routeSolid([
    [GX - GR, ROW, z],
    [BACK - 10, ROW, z],
  ]);

  // 4 · the calendar: the one solid blue plane
  const zb = s.slab(10, 20, BACK - 10, 200, z, 16);

  // 5 · the rule, written down: a ghost card on the calendar's back edge, holding the rule as one
  //     row of the calendar: the item's echo, the move, the displaced block
  const at = s.panel(CARD.x0, CARD.x1, CARD.y, zb, CARD.h, {
    fill: rgba(HEX.paper, 0),
    stroke: HEX.blue,
    dash: '6 4',
  });
  s.panelBar(at, 14, 112, 70, { h: 7 });
  s.echoOnPanel(at, 14, 36, 56, 52);
  s.onPanel(at, 90, 36, 56, 52, MOVED);
  s.line([at(74, 62), at(80, 62)], { stroke: HEX.blue, width: 2 });
  s.poly([at(87, 62), at(79, 56), at(79, 68)], { fill: HEX.blue, stroke: 'none' });

  // 6 · the day headings, in front of the card's foot
  for (const x of DAYS) s.bar(x, 34, DAY, zb, { color: HEX.paper, alpha: 0.8, thick: 6 });

  // 7 · the slot grid, 3 days × 3 hours
  for (const x of DAYS)
    for (const y of HOURS) s.plane(x, y, DAY, HOUR, zb, { fill: 'none', stroke: onBlue(0.5) });

  // 8 · meetings kept where they are
  s.plane(DAYS[0], HOURS[0], DAY, HOUR, zb, { fill: G, stroke: HEX.blue });
  s.plane(DAYS[1], HOURS[2], DAY, HOUR, zb, { fill: G, stroke: HEX.blue });

  // 9 · the meeting that gives way: pale blue, moved to the next day in the same hour
  s.plane(DAYS[2], HOURS[1], DAY, HOUR, zb, MOVED);

  // 10 · the route crosses the calendar to the contested slot, clipped to the plane where it comes
  //      over the edge, and ends inside the item's footprint
  s.routeSolid(
    [
      [BACK + 10, ROW, zb],
      [DAYS[1] + DAY - 10, ROW, zb],
    ],
    { on: [10, 20, BACK - 10, 200, zb] },
  );

  // 11 · the move: out of the slot, along x, its tip on the moved meeting's back edge
  s.arrow(
    [
      [DAYS[1] - 4, ROW, zb],
      [DAYS[2] + DAY + 2, ROW, zb],
    ],
    { head: 9 },
  );

  // 12 · the important meeting holds the slot: the rule, solid once
  s.itemSolid(DAYS[1], HOURS[1], DAY, HOUR, zb, 16);

  return s;
}

export default draw;
