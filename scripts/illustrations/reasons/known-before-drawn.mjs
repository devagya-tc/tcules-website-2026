/**
 * Reason · "We work out what the product has to know before we draw it." (Why Tcules, offer set;
 * decisions/2026-10-30-reasons-take-illustrations). House style, ch05 §4a–§4b; strokes 1.5 (the
 * kit's); left-facing; every line on the x / y / z axes (2026-10-23-illustration-lines-follow-iso-axes).
 *
 * Message: what the product has to know is worked out and solid first; the screen above it is still
 * a dashed outline.
 *
 * Construction. A stack of two planes over one footprint, read bottom to top (things carry up,
 * 2026-09-28-illustration-layers-carry-up): the model below, the screen above it, later.
 * - The model is the slab, the one solid blue plane. On it, what has been worked out: the four
 *   questions as four paper text bars along its back, and the three roles (detailer, quality
 *   engineer, approver) as three marked tiles along its front, each a paper tile with an avatar mark
 *   (a person is their place, never a body, ch05 §4a Figures). The roles hand on in the order they
 *   work, reading left to right (2026-09-28-illustrations-face-left-read-left-to-right), and the last
 *   feeds the carried item. Every connector is paper on the blue (§4b) and ends at an edge midpoint,
 *   its diamond tip stopping 4 units short of the edge it points at.
 * - The carried item, the thing the product has to know, sits at the model's centre: solid once
 *   (§4b), with thickness.
 * - The screen is not drawn yet: a dashed outline (context, not a thing, §4a Dashes) over a dot
 *   field (raw, not yet designed, §4a Texture), carrying the item only as a spec'd echo, directly
 *   above it. The dashed ink thread holds the item's one position on both planes (§4b Paths).
 *
 * Why the roles stand in front of the item and the questions behind it. A block shows two side faces
 * (x = x0 and y = y0 + d); its back faces are hidden, and so is the floor 1.22 × its height behind
 * them. A role behind the item would feed it out of sight, so the roles stand where their connectors
 * stay in view. Three roles and two visible faces: the roles hand on along their row and one
 * connector reaches the item, on its x = 100 face.
 *
 * Clearances, checked at 4×. The echo sits at the screen's centre, between the dots: 10 units clear
 * of the nearest column, 20 of the nearest row (pitch 40, the wide pitch §4 asks of a small
 * placement). The thread's line, x + y = 230, misses every dot by 20 units and crosses one question
 * bar mid-length, in front of it. Artwork about 325 × 327 (aspect 0.99).
 */
import { HEX, Scene } from '../lib.mjs';

export const meta = {
  title: 'We work out what the product has to know before we draw it.',
  message:
    'What the product has to know is worked out and solid first; the screen above it is still a dashed outline.',
};

/** The footprint both planes share. */
const W = 260;
const D = 200;
/** The base plate under the model: 30 wider than the footprint on every side, 22 high. */
const PLATE = { m: 30, h: 22 };
/** The screen's height above the ground (the model's top plus 156 of air). */
const Z_SCREEN = 196;
/** The carried item's footprint: centred under the screen's centre (130, 100). */
const ITEM = { x: 100, y: 80, w: 60, d: 40, h: 20 };
/** The three roles, screen-left to right: detailer, quality engineer, approver. */
const ROLES = [200, 110, 20];
const ROLE_Y = 150;
const ROLE = 40;

/** @param {string} G the ground hex; occluding faces take it (§4a). */
export function draw(G) {
  const s = new Scene({ id: 'known-before-drawn' });
  const ix = ITEM.x + ITEM.w / 2;
  const iy = ITEM.y + ITEM.d / 2;

  // the screen, not drawn yet: behind and above, so first
  s.plane(0, 0, W, D, Z_SCREEN, { fill: 'none', stroke: HEX.blue, dash: '6 4' });
  s.dots(0, 0, W, D, Z_SCREEN, { pitch: 40 });
  s.echo(ITEM.x, ITEM.y, ITEM.w, ITEM.d, Z_SCREEN);

  // the base plate: the light ground the model stands on, as the other two reasons have
  s.plinth(-PLATE.m, -PLATE.m, W + PLATE.m * 2, D + PLATE.m * 2, 0, PLATE.h, G);

  // the model: the one solid blue plane
  const zb = s.slab(0, 0, W, D, PLATE.h, 18);

  // the four questions, worked out: paper text bars along the model's back
  for (const x of [200, 140, 80, 20])
    s.bar(x, 10, 40, zb, { color: HEX.paper, alpha: 0.55, thick: 8 });

  // the three roles: marked tiles along the model's front
  for (const x of ROLES) {
    s.plane(x, ROLE_Y, ROLE, ROLE, zb, { fill: G, stroke: HEX.blue });
    s.plane(x + 14, ROLE_Y + 14, 12, 12, zb, { fill: HEX.blue, stroke: 'none' });
  }

  // each role hands on to the next, edge midpoint to edge midpoint, each end diamond 8 across its
  // half-diagonal, so the end point sits 12 units off the edge and the tip stops 4 short. The last
  // feeds the item: it ends ON the item's footprint edge (x = 100) with no diamond, so the item's
  // own face closes it and nothing lies under its foot.
  const paper = { color: HEX.paper };
  const rowV = ROLE_Y + ROLE / 2;
  s.connector(
    [
      [ROLES[0], rowV, zb],
      [ROLES[1] + ROLE + 12, rowV, zb],
    ],
    paper,
  );
  s.connector(
    [
      [ROLES[1], rowV, zb],
      [ROLES[2] + ROLE + 12, rowV, zb],
    ],
    paper,
  );
  s.connector(
    [
      [ROLES[2] + ROLE / 2, ROLE_Y, zb],
      [ROLES[2] + ROLE / 2, iy, zb],
      [ITEM.x, iy, zb],
    ],
    { ...paper, end: false },
  );

  // the thing the product has to know: solid once
  s.itemSolid(ITEM.x, ITEM.y, ITEM.w, ITEM.d, zb, ITEM.h);

  // the thread: from the item's top-face centre to the echo's centre, one position on both planes
  s.thread([
    [ix, iy, zb + ITEM.h],
    [ix, iy, Z_SCREEN],
  ]);
  return s;
}
