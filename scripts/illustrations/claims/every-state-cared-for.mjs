/**
 * Claim · "Screens people work in for hours." (component map, hard parts; owner 30 Oct 2026,
 * claim-visual-depicts-the-claim). House style, ch05 §4a–§4b; strokes 1.5 (the kit's); left-facing.
 *
 * Message: the empty, loading and error screens are built from the same parts, on the same rules,
 * as the screen in the demo.
 *
 * Construction. The blue slab is the shared rules: the one solid blue plane, and the base all four
 * screens stand on. Four flat standing panels of one size, coplanar at y = 50, read screen-left to
 * right: the demo, empty, loading, error. Same size, same care. Each carries the same heading and
 * the shared part (the filter/state bar) at one (u, v) = (12, 112), 86 × 14: a built echo on the
 * demo, empty and loading screens, and solid once on the error screen, the one a user meets after
 * hours. The four faces are coplanar, so the shared position is read along the row and needs no
 * thread. The panels are sheets, not devices: no thin edge on any of them.
 *
 * Artwork about 446 × 350 (aspect 1.27), the widest of the claims set, so it sets the shared box.
 */
import { HEX, Scene, rgba } from '../lib.mjs';

export const meta = {
  title: 'Screens people work in for hours.',
  message:
    'The empty, loading and error screens are built from the same parts, on the same rules, as the screen in the demo.',
};

/** Outline of a secondary block on a screen (the kit's quiet line, as reasons.mjs). */
const quiet = rgba(HEX.blue, 0.45);

/** The shared part, at one place on every screen. */
const PART = { u: 12, v: 112, w: 86, h: 14 };
const W = 110;
const H = 160;
const Y = 50;

/** G is the ground hex: the panels' faces take it, so they read as opaque sheets (§4a). */
export function draw(G) {
  const s = new Scene({ id: 'every-state-cared-for' });

  // the shared rules: the one solid blue plane, and the base every screen stands on
  const zb = s.slab(0, 0, 540, 90, 0, 16);

  // one screen, standing on the rules: the same heading and the shared part in the same place
  const screen = (x, solid) => {
    const at = s.panel(x, x + W, Y, zb, H, { fill: G });
    s.panelBar(at, 12, 138, 40, { solid: true });
    if (solid) s.itemSolidOnPanel(at, PART.u, PART.v, PART.w, PART.h);
    else s.echoOnPanel(at, PART.u, PART.v, PART.w, PART.h, { state: 'built' });
    return at;
  };

  // the demo: copy and a chart, the screen everyone is shown
  const demo = screen(410, false);
  for (const [v, w] of [
    [90, 80],
    [76, 60],
    [62, 74],
  ])
    s.panelBar(demo, 12, v, w, { h: 6 });
  for (const [u, h] of [
    [14, 22],
    [30, 34],
    [46, 16],
    [62, 28],
  ])
    s.onPanel(demo, u, 14, 10, h, { fill: HEX.blue, stroke: 'none' });

  // empty: nothing yet, a picture's block and one line
  const empty = screen(280, false);
  s.onPanel(empty, 30, 40, 50, 40, { fill: G, stroke: quiet });
  s.panelBar(empty, 30, 26, 50, { h: 6 });

  // loading: the skeleton of the copy, five bars
  const loading = screen(150, false);
  for (const [v, w] of [
    [90, 86],
    [76, 60],
    [62, 86],
    [48, 50],
    [34, 70],
  ])
    s.panelBar(loading, 12, v, w, { h: 6 });

  // error, the one met after hours: a mark beside its line, a line under, the way out
  const error = screen(20, true);
  s.onPanel(error, 12, 70, 14, 14, { fill: HEX.blue, stroke: 'none' });
  s.panelBar(error, 34, 74, 56, { h: 6 });
  s.panelBar(error, 12, 50, 74, { h: 6 });
  s.onPanel(error, 12, 18, 40, 16, { fill: HEX.blue, stroke: 'none' });

  return s;
}
