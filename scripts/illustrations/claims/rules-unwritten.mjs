/**
 * Claim · "Rules nobody has written down." (hard parts, round 6, owner 30 Oct 2026)
 *
 * Message: which meeting gives way is a rule people follow but never wrote down; heard in research,
 * it is built into the product's calendar before any screen is drawn.
 *
 * Carried item: the priority rule. Raw as a glimmer in the research field (screen-left, read first);
 * its route runs to the calendar's back edge, rises on the slab's hidden face and crosses the top to
 * the contested slot, where it is solid as the important meeting holding that slot. The meeting that
 * gives way has moved to the next day in the same hour, joined to the item by a paper connector on
 * blue. The calendar is the one solid blue plane: three days of three hours, the days reading left to
 * right. The screen stands on its back edge, dashed and empty: proposed, not drawn yet.
 *
 * Left-facing (lib.mjs projection); every route and connector runs on x / y / z and turns only at a
 * corner (2026-10-23-illustration-lines-follow-iso-axes). No labels: a claim figure is set at 320px
 * and below, so the annotation layer is never drawn (§4b).
 */
import { HEX, Scene, onBlue } from '../lib.mjs';

export const name = 'rules-unwritten';

export const meta = {
  title: 'Rules nobody has written down.',
  message:
    "Which meeting gives way is a rule people follow but never wrote down; heard in research, it is built into the product's calendar before any screen is drawn.",
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
/** A connector's diamond (lib.mjs connector, s = 8): its tip, not its centre, meets the edge. */
const TIP = 8;

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

  // 9a · the route leaves the glimmer and runs to the calendar's back edge. It is behind the slab,
  //      so it is painted first and the slab hides its rise on the far face (§4a occlusion).
  s.route([
    [GX - GR, ROW, z],
    [BACK, ROW, z],
  ]);

  // 3 · the calendar: the one solid blue plane
  const zb = s.slab(10, 20, BACK - 10, 200, z, 16);

  // 4 · the screen nobody has drawn yet, standing on the calendar's back edge. Dashed = proposed;
  //     no fill, no UI on it.
  s.panel(10, BACK, 20, zb, 140, { fill: 'none', stroke: HEX.blue, dash: '6 4' });

  // 5 · the day headings
  for (const x of DAYS) s.bar(x, 34, DAY, zb, { color: HEX.paper, alpha: 0.8, thick: 6 });

  // 6 · the slot grid, 3 days × 3 hours
  for (const x of DAYS)
    for (const y of HOURS) s.plane(x, y, DAY, HOUR, zb, { fill: 'none', stroke: onBlue(0.5) });

  // 7 · meetings kept where they are
  s.plane(DAYS[0], HOURS[0], DAY, HOUR, zb, { fill: G, stroke: HEX.blue });
  s.plane(DAYS[1], HOURS[2], DAY, HOUR, zb, { fill: G, stroke: HEX.blue });

  // 8 · the meeting that gives way: the next day, the same hour
  s.plane(DAYS[2], HOURS[1], DAY, HOUR, zb, { fill: G, stroke: HEX.blue });

  // 9b · the route crosses the calendar to the contested slot, ending at the item's back face
  s.route([
    [BACK, ROW, zb],
    [DAYS[1] + DAY, ROW, zb],
  ]);

  // 10 · the important meeting holds the slot: the rule, solid once
  s.itemSolid(DAYS[1], HOURS[1], DAY, HOUR, zb, 16);

  // 11 · the yield: from the item's front-right foot (its lit face's foot midpoint) to the moved
  //      meeting's back-edge midpoint, which the diamond's tip meets (as the reason set's connectors)
  s.connector(
    [
      [DAYS[1], ROW, zb],
      [DAYS[2] + DAY + TIP, ROW, zb],
    ],
    { color: HEX.paper },
  );

  return s;
}

export default draw;
