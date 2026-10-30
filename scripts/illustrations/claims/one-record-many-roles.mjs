/**
 * Claim · "Several people working on one record." (hard parts, decisions/2026-10-30-claim-visual-depicts-the-claim)
 *
 * Message: one record stands at the centre; each role reaches its own part of it, from its own place,
 * in no fixed order.
 *
 * The record is a card standing on the shared model (the one solid blue plane), facing left toward
 * the words. Its three parts step down the face diagonally, so no role's line crosses another part.
 * The roles are places, never figures (ch05 §4a Figures): three marked tiles on the plinth in front.
 * Each role's connector runs on the axes (2026-10-23-illustration-lines-follow-iso-axes): back
 * along the floor to the model's front edge, up its face, across the model to the record, then up
 * the record's face to its own part, where it ends in a diamond lying in the face's plane (C2). The
 * tiles stand side by side in a row, none ahead of another: no fixed order. The carried item is the
 * part being changed now, solid once on the face; it has no echo.
 */
import { HEX, Scene, onBlue, rgba } from '../lib.mjs';

export const meta = {
  title: 'Several people working on one record.',
  message:
    'One record stands at the centre; each role reaches its own part of it, from its own place, in no fixed order.',
};

/** A part not being changed: an outlined field on the record, in the line colour at 45%. */
const quiet = rgba(HEX.blue, 0.45);
/** The connector's dash (ch05 §4a --ill-dash-connector). */
const DASH_CONNECTOR = '8 6';

/** @param {string} G the ground hex; occluding faces take it (§4a). */
export function draw(G) {
  const s = new Scene({ id: 'c-one-record' });

  // the ground the roles stand on, and the shared model on it: the one solid blue plane
  s.plinth(0, 0, 300, 260, 0, 22, G);
  const z = 22;
  const zb = s.slab(30, 20, 240, 110, z, 16);

  // the record: one card standing on the model, facing left
  const at = s.device(50, 250, 70, zb, 200, { fill: G });
  s.onPanel(at, 16, 170, 14, 14, { fill: HEX.blue, stroke: 'none' });
  s.panelBar(at, 38, 173, 80, { solid: true });
  s.panelBar(at, 16, 150, 120, { h: 7 });

  // its three parts, stepped down the face; the middle one is being changed now
  s.onPanel(at, 16, 108, 56, 26, { fill: G, stroke: quiet });
  s.itemSolidOnPanel(at, 72, 74, 56, 26);
  s.onPanel(at, 128, 40, 56, 26, { fill: G, stroke: quiet });

  // the roles: three marked tiles side by side on the plinth in front
  const roles = [
    { x: 206, v: 108 }, // reaches the top part
    { x: 150, v: 74 }, // reaches the part being changed now
    { x: 94, v: 40 }, // reaches the bottom part
  ];
  for (const { x } of roles) {
    s.plane(x - 20, 190, 40, 40, z, { fill: G, stroke: HEX.blue });
    s.plane(x - 6, 204, 12, 12, z, { fill: HEX.blue, stroke: 'none' });
  }

  // each role's line to its part, on the axes. On the blue plane it turns paper (§4a: detail on the
  // solid blue plane is paper at 40–80%), so it stays one line from tile to part.
  const r = 8;
  for (const { x, v } of roles) {
    s.line(
      [
        [x, 190, z],
        [x, 130, z],
      ],
      { stroke: HEX.blue, dash: DASH_CONNECTOR },
    );
    s.line(
      [
        [x, 130, z],
        [x, 130, zb],
        [x, 70, zb],
      ],
      { stroke: onBlue(0.8), dash: DASH_CONNECTOR },
    );
    s.line(
      [
        [x, 70, zb],
        [x, 70, zb + v - r],
      ],
      { stroke: HEX.blue, dash: DASH_CONNECTOR },
    );
    // the end diamond lies in the record's face, its top point on the part's bottom-edge midpoint
    s.diamondOnPanel(at, 250 - x, v - r, r);
  }

  return s;
}
