/**
 * Claim · "Screens people work in for hours." (component map, hard parts; owner 30 Oct 2026,
 * claim-visual-depicts-the-claim). House style, ch05 §4a–§4b; strokes 1.5 (the kit's); left-facing.
 *
 * Message: the empty, loading, error and no-access screens are built from the same rules, and given
 * the same care, as the screen in the demo.
 *
 * Construction (remade round 6 after the read-back failed as "four screens on a shelf"). One light
 * base plate, the product. Five screens stand in a row along its back, each a device with the thin
 * edge every standing panel has (§4a), the same size and the same heading at the same place, read
 * screen-left to right: the demo, then the four states nobody demos. Each state carries ONE
 * signature legible at 200px:
 * - demo: real content, a row of copy and a bar chart;
 * - empty: an outline glyph, one line, one button;
 * - loading: skeleton bars;
 * - error: a field outlined heavy, a message bar under it;
 * - no access: a padlock, one line.
 * The shared rules are the centrepiece, the one solid blue plane, in front of the row; the rule the
 * screens draw from is the carried item, solid once on it (no echo: the screens show its effect,
 * the same heading and frame). One connector carries it back: paper on the blue plane, blue on the
 * plate, to a run along the row's foot that every screen stands on.
 */
import { HEX, Scene, onBlue, rgba } from '../lib.mjs';

export const meta = {
  title: 'Screens people work in for hours.',
  message:
    'The empty, loading, error and no-access screens are built from the same rules, and given the same care, as the screen in the demo.',
};

/** Outline of a secondary block on a screen (the kit's quiet line). */
const quiet = rgba(HEX.blue, 0.45);
/** The connector's dash (ch05 §4a --ill-dash-connector). */
const DASH_CONNECTOR = '8 6';
/** Five screens: 70 wide, 10 apart, 140 tall, faces at y 60. Demo first (screen-left, x high). */
const W = 70;
const H = 140;
const Y = 60;
const XS = [330, 250, 170, 90, 10];
/** The row's foot run, just in front of the faces. */
const FOOT = Y + 10;
/** The rules: the slab, and the rule on it. */
const SLAB = { x: 140, y: 100, w: 140, d: 60 };
const RULE = { x: 185, y: 115, w: 50, d: 30, h: 18 };

/** @param {string} G the ground hex; faces take it, so they read as opaque sheets (§4a). */
export function draw(G) {
  const s = new Scene({ id: 'every-state-cared-for' });
  const z = 22;

  // the product: one light base plate
  s.plinth(0, 0, 410, 175, 0, z, G);

  // one screen: a device with its thin edge, the same heading in the same place
  const screen = (x) => {
    const at = s.device(x, x + W, Y, z, H, { fill: G, t: 6 });
    s.panelBar(at, 10, 112, 32, { solid: true });
    return at;
  };

  // demo: real content, a row of copy and a bar chart
  const demo = screen(XS[0]);
  for (const [v, w] of [
    [96, 50],
    [86, 40],
    [76, 46],
  ])
    s.panelBar(demo, 10, v, w, { h: 5 });
  for (const [u, h] of [
    [10, 22],
    [22, 36],
    [34, 16],
    [46, 30],
  ])
    s.onPanel(demo, u, 14, 8, h, { fill: HEX.blue, stroke: 'none' });

  // empty: an outline glyph, one line, one button
  const empty = screen(XS[1]);
  s.onPanel(empty, 22, 62, 26, 26, { fill: G, stroke: quiet });
  s.panelBar(empty, 15, 48, 40, { h: 5 });
  s.onPanel(empty, 21, 24, 28, 12, { fill: HEX.blue, stroke: 'none' });

  // loading: skeleton bars, wide and pale
  const loading = screen(XS[2]);
  for (const [v, w] of [
    [88, 50],
    [72, 50],
    [56, 36],
    [40, 50],
    [24, 30],
  ])
    s.panelBar(loading, 10, v, w, { h: 9, color: HEX.blue });

  // error: a field outlined heavy, a message bar under it
  const error = screen(XS[3]);
  s.panelBar(error, 10, 90, 24, { h: 5 });
  s.onPanel(error, 10, 64, 50, 18, { fill: G, stroke: HEX.blue, width: 3 });
  s.onPanel(error, 10, 48, 50, 8, { fill: HEX.blue, stroke: 'none' });
  s.onPanel(error, 10, 18, 28, 12, { fill: G, stroke: quiet });

  // no access: a padlock, one line
  const locked = screen(XS[4]);
  s.onPanel(locked, 23, 46, 24, 20, { fill: HEX.blue, stroke: 'none' });
  s.line([locked(28, 66), locked(28, 76), locked(42, 76), locked(42, 66)], {
    stroke: HEX.blue,
    width: 3,
  });
  s.panelBar(locked, 13, 26, 44, { h: 5 });

  // the foot run every screen stands on, and the connector from it to the rule
  s.line(
    [
      [XS[0] + W / 2, FOOT, z],
      [XS[4] + W / 2, FOOT, z],
    ],
    { stroke: HEX.blue, dash: DASH_CONNECTOR },
  );
  const cx = RULE.x + RULE.w / 2;
  s.line(
    [
      [cx, FOOT, z],
      [cx, SLAB.y, z],
    ],
    { stroke: HEX.blue, dash: DASH_CONNECTOR },
  );

  // the shared rules: the one solid blue plane, the centrepiece
  const zb = s.slab(SLAB.x, SLAB.y, SLAB.w, SLAB.d, z, 14);
  s.line(
    [
      [cx, SLAB.y, zb],
      [cx, RULE.y, zb],
    ],
    { stroke: onBlue(0.8), dash: DASH_CONNECTOR },
  );

  // the rule the screens draw from: solid once
  s.itemSolid(RULE.x, RULE.y, RULE.w, RULE.d, zb, RULE.h);

  return s;
}
