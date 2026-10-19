/**
 * npm run illustrations:situations — the six home gateway drawings ("What do you need next?", owner,
 * round 11, 19 Oct 2026), one per situation, in the Reasons house style (this kit, ch05 §4a–§4b).
 *
 * Each drawing tells one small story in TWO STATES: rest shows the problem, end shows it solved. The
 * parts that move are wrapped in `<g class="mv">` carrying their end-state displacement as
 * --sfig-tx / --sfig-ty / --sfig-rot (screen units); an outline that DRAWS itself is a dashed line
 * revealed through a mask whose stroke has class "trace". The SituationFigure primitive plays rest →
 * end when the link it sits in is hovered or focused. All six share one viewBox, so they are drawn
 * at one scale, and the strokes are 1.25 (lighter than the kit's 1.5, owner).
 *
 * Writes src/components/SituationFigure/figures.generated.ts. Generated, never hand-edited. Colours
 * are the kit's literals for the PAPER ground: the drawings are only placed on paper.
 */
import { writeFileSync } from 'node:fs';

import { HEX, Scene, rgba } from './lib.mjs';

const K = 0.7071, H = 0.3536, V = 0.866;
const G = HEX.paper;
const quiet = rgba(HEX.blue, 0.45);

/** Screen displacement of a world move. */
const d = (dx = 0, dy = 0, dz = 0) => [-(dx + dy) * K, (dy - dx) * H - dz * V].map((n) => Math.round(n * 100) / 100);

function open(s, [tx, ty]) {
  s.art.push(`<g class="mv" style="--sfig-tx:${tx}px;--sfig-ty:${ty}px">`);
}
const close = (s) => s.art.push('</g>');

/** One shared frame: the world box every figure is composed inside. */
const BOX = { x0: -20, x1: 260, y0: -20, y1: 180, z0: 0, z1: 262 };
function frame(s) {
  const pts = [];
  for (const x of [BOX.x0, BOX.x1]) for (const y of [BOX.y0, BOX.y1]) for (const z of [BOX.z0, BOX.z1]) pts.push(s.p(x, y, z));
  const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  // Trim the empty corners the iso box leaves top-left and bottom-right.
  const w = x1 - x0, h = y1 - y0;
  return [x0 + w * 0.06, y0 + h * 0.1, w * 0.88, h * 0.82].map((n) => Math.round(n * 100) / 100);
}

/* ── 1 · Launch a new product ──────────────────────────────────────────────────────────
   Rest: the plan stands on the plinth as a dashed outline; the real screen is still below
   the stage, its top edge just showing. End: the screen RISES into the plan and fills it
   exactly, carrying its release with it. The plan does not move:
   it is the promise the release keeps. */
function launch() {
  const s = new Scene({ id: 'g1' });
  s.block(0, 20, 220, 140, 0, 22, { top: G, shaded: HEX.b200, lit: HEX.b100 });
  s.dots(20, 40, 180, 100, 22, { pitch: 30, alpha: 0.28 });
  const drop = 142;
  // clip: everything above the plinth top along the screen's plane (y = 70)
  const c = [s.p(600, 70, 22), s.p(-400, 70, 22), s.p(-400, 70, 900), s.p(600, 70, 900)];
  s.defs.push(`<clipPath id="{{id}}-clip"><polygon points="${c.map((q) => q.map((n) => n.toFixed(2)).join(',')).join(' ')}"/></clipPath>`);
  s.art.push('<g clip-path="url(#{{id}}-clip)">');
  open(s, d(0, 0, drop));
  const at = s.panel(40, 180, 70, 22 - drop, 150, { fill: G });
  s.panelBar(at, 16, 128, 64, { solid: true });
  s.panelBar(at, 16, 112, 96);
  s.panelBar(at, 16, 100, 72);
  s.onPanel(at, 16, 20, 108, 62, { fill: HEX.b50, stroke: quiet });
  close(s);
  s.art.push('</g>');
  // the plan: dashed, in front of where the screen will stand, never moves
  s.panel(40, 180, 70, 22, 150, { fill: 'none', dash: '6 4' });
  // the release: rises with the screen, from just above
  open(s, d(0, 0, -26));
  const at2 = (u, v) => [180 - u, 70, 22 + v];
  s.onPanel(at2, 30, 36 + 26, 52, 22, { fill: HEX.p400, stroke: HEX.ink });
  close(s);
  return s;
}

/* ── 2 · Make your SaaS product easier to use ──────────────────────────────────────────
   Rest: the same task spread over three screens, one behind another. End: the two back
   screens CLOSE UP into the front one, like a concertina (the farthest travels most),
   leaving one screen. The front screen's one action lights a beat later. */
function easier() {
  const s = new Scene({ id: 'g2' });
  s.edges(0, 0, 240, 170, 0, { back: { dash: '6 4' }, left: { dash: '6 4' }, front: { dash: '6 4' }, right: { dash: '6 4' } });
  const screen = (y, busy) => {
    const at = s.panel(50, 190, y, 0, 150, { fill: G, stroke: busy ? quiet : HEX.blue });
    s.panelBar(at, 16, 128, 56, { solid: !busy, color: busy ? HEX.b200 : HEX.blue });
    for (let i = 0; i < (busy ? 5 : 2); i++) s.panelBar(at, 16, 108 - i * 14, busy ? 100 - (i % 2) * 28 : 88 - i * 24, { h: 6 });
    return at;
  };
  open(s, d(0, 100, 0));
  screen(20, true);
  close(s);
  open(s, d(0, 50, 0));
  screen(70, true);
  close(s);
  const at = screen(120, false);
  s.onPanel(at, 16, 22, 56, 22, { fill: HEX.p400, stroke: HEX.ink });
  return s;
}

/* ── 3 · Update an ageing product ──────────────────────────────────────────────────────
   Rest: the old screen on its plinth, crowded; the new one waits above it. End: the new
   screen DESCENDS on to the same plinth while the old one steps back behind it. The
   plinth, the habits customers rely on, never moves. */
function ageing() {
  const s = new Scene({ id: 'g3' });
  s.block(10, 30, 200, 130, 0, 22, { top: G, shaded: HEX.b200, lit: HEX.b100 });
  open(s, d(0, -40, 0));
  const old = s.panel(50, 190, 90, 22, 112, { fill: G, stroke: quiet });
  for (let i = 0; i < 6; i++) s.panelBar(old, 14, 94 - i * 13, i % 2 ? 84 : 108, { h: 6 });
  close(s);
  open(s, d(0, 0, -120));
  const at = s.panel(50, 190, 90, 22 + 120, 112, { fill: G });
  s.panelBar(at, 16, 90, 60, { solid: true });
  s.panelBar(at, 16, 76, 88, { h: 6 });
  s.onPanel(at, 16, 18, 108, 42, { fill: HEX.b50, stroke: HEX.blue });
  s.onPanel(at, 26, 29, 40, 20, { fill: HEX.p400, stroke: HEX.ink });
  close(s);
  return s;
}

/* ── 4 · Make your copilot or AI search easy to trust ──────────────────────────────────
   Story: the AI never edits the page behind your back. It shows its change BESIDE the page,
   with its reason under it, and the page marks where the change would go. Nothing happens
   until the person says yes.
   Rest: the change sits in the AI's pane (sparkle, reason lines), the page holds a dashed slot,
   the person's switch is off. End, in one motion: the switch slides on, the change travels out of
   the pane into its slot, and the AI's sparkle turns. */
function ai() {
  const s = new Scene({ id: 'g4' });
  s.edges(-10, 20, 270, 140, 0, { back: { dash: '6 4' }, left: { dash: '6 4' }, front: { dash: '6 4' }, right: { dash: '6 4' } });
  // the page (screen-left, farther)
  const at = s.panel(118, 258, 70, 0, 160, { fill: G });
  s.panelBar(at, 16, 136, 60, { solid: true });
  s.panelBar(at, 16, 120, 104, { h: 6 });
  s.panelBar(at, 16, 108, 80, { h: 6 });
  s.onPanel(at, 16, 62, 72, 26, { fill: 'none', stroke: HEX.blue, dash: '5 4' });
  s.panelBar(at, 16, 44, 100, { h: 6 });
  s.onPanel(at, 92, 14, 34, 16, { fill: HEX.b50, stroke: HEX.blue });
  open(s, d(-16, 0, 0));
  s.onPanel(at, 95, 17, 12, 10, { fill: HEX.blue, stroke: 'none' });
  close(s);
  // the AI's pane (screen-right, nearer): its change, and its reason under it
  const pane = s.panel(-4, 92, 70, 0, 112, { fill: G, stroke: quiet });
  s.panelBar(pane, 12, 30, 64, { h: 6 });
  s.panelBar(pane, 12, 18, 44, { h: 6 });
  s.onPanel(pane, 12, 50, 72, 26, { fill: 'none', stroke: quiet, dash: '5 4' });
  // the sparkle, on the pane's face, top right
  const sp = (cu, cv, r) => {
    const k = r * 0.28;
    return [[cu, cv + r], [cu + k, cv + k], [cu + r, cv], [cu + k, cv - k], [cu, cv - r], [cu - k, cv - k], [cu - r, cv], [cu - k, cv + k]].map(([u, v]) => pane(u, v));
  };
  s.art.push('<g class="mv" style="--sfig-rot:90deg">');
  s.poly(sp(76, 94, 10), { fill: HEX.blue, stroke: 'none' });
  close(s);
  // the change: from the pane (u 12, v 50) to the page's slot (u 16, v 62)
  open(s, d(258 - 16 - (92 - 12), 0, 12));
  s.onPanel(pane, 12, 50, 72, 26, { fill: HEX.p400, stroke: HEX.ink });
  close(s);
  return s;
}

/* ── 5 · Get every team building from the same system ──────────────────────────────────
   Story: five teams, five versions of the same part. A design system is one source that every
   team takes the part from, so the product looks like one product.
   Rest: the library panel holds the one true component; each team's screen has its own
   home-made version of it, each a different shape and place. End: copies are dealt from the
   library across every screen at once, fanning out, and cover the home-made versions, landing in
   the same place on every screen. */
function system() {
  const s = new Scene({ id: 'g5' });
  s.plane(-12, 30, 270, 130, 0, { fill: HEX.blue });
  const xs = [[190, 250], [124, 184], [58, 118], [-8, 52]];
  const ats = xs.map(([x0, x1], i) => {
    const at = s.panel(x0, x1, 80, 0, 112, { fill: i === 0 ? HEX.b50 : G });
    s.panelBar(at, 10, 92, i === 0 ? 40 : 30, { solid: true });
    s.panelBar(at, 10, 78, 40, { h: 6 });
    s.panelBar(at, 10, 16, 34, { h: 6 });
    return at;
  });
  // each team's own version: different shapes, all inside where the real one will land
  s.onPanel(ats[1], 12, 38, 26, 10, { fill: HEX.b50, stroke: quiet });
  s.onPanel(ats[2], 22, 34, 14, 14, { fill: HEX.b50, stroke: quiet });
  s.onPanel(ats[3], 13, 40, 34, 6, { fill: HEX.b50, stroke: quiet });
  // the source, and three copies stacked exactly on it
  s.onPanel(ats[0], 10, 30, 40, 22, { fill: HEX.p400, stroke: HEX.ink });
  for (let i = 1; i <= 3; i++) {
    open(s, d(xs[i][1] - xs[0][1], 0, 0));
    s.onPanel(ats[0], 10, 30, 40, 22, { fill: HEX.p400, stroke: HEX.ink });
    close(s);
  }
  return s;
}

/* ── 6 · Make sure what ships matches the design ───────────────────────────────────────
   Story: we hold what shipped up against what was designed. Nothing is rebuilt and nothing
   moves; the check is drawn.
   Rest: the shipped screen, alone. End: the design's outline DRAWS ITSELF round the screen,
   just outside its edge, and round each part that matters, all at once. The traces never sit
   on the screen's own lines, so nothing doubles. */
function ships() {
  const s = new Scene({ id: 'g6' });
  s.edges(0, 0, 240, 170, 0, { back: { dash: '6 4' }, left: { dash: '6 4' }, front: { dash: '6 4' }, right: { dash: '6 4' } });
  const at = s.panel(40, 200, 100, 0, 150, { fill: G });
  s.panelBar(at, 16, 126, 60, { solid: true });
  s.panelBar(at, 16, 110, 100, { h: 6 });
  s.panelBar(at, 16, 98, 72, { h: 6 });
  s.onPanel(at, 16, 30, 70, 30, { fill: HEX.p400, stroke: HEX.ink });
  const pts = (list) => list.map((q) => s.p(...at(...q)).map((n) => n.toFixed(2)).join(',')).join(' ');
  const trace = (n, list, closed, style) => {
    const p = pts(closed ? [...list, list[0]] : list);
    s.defs.push(`<mask id="{{id}}-m${n}" maskUnits="userSpaceOnUse" x="-3000" y="-3000" width="6000" height="6000"><polyline class="trace" points="${p}" pathLength="1" fill="none" stroke="#fff" stroke-width="10" stroke-linejoin="round"/></mask>`);
    s.art.push(`<polyline points="${p}" fill="none" ${style} mask="url(#{{id}}-m${n})"/>`);
  };
  const blue = `stroke="${HEX.blue}" stroke-width="1.25" stroke-dasharray="6 4" vector-effect="non-scaling-stroke"`;
  const ink = `stroke="${rgba(HEX.ink, 0.8)}" stroke-width="1.25" stroke-dasharray="4 3" vector-effect="non-scaling-stroke"`;
  trace(1, [[-14, 0], [-14, 164], [174, 164], [174, 0]], false, blue);
  trace(2, [[8, 119], [8, 141], [84, 141], [84, 119]], true, ink);
  trace(3, [[8, 22], [8, 68], [94, 68], [94, 22]], true, ink);
  return s;
}

const FIGS = {
  'new-product': launch,
  'product-design': easier,
  'product-modernisation': ageing,
  'ai-product-ux': ai,
  'design-systems': system,
  'design-engineering': ships,
};

const out = {};
for (const [name, fn] of Object.entries(FIGS)) {
  const s = fn();
  out[name] = {
    viewBox: frame(s).join(' '),
    markup: (s.defs.length ? `<defs>${s.defs.join('')}</defs>` : '') +
      s.art.join('').replaceAll('stroke-width="1.5"', 'stroke-width="1.25"'),
  };
}
const ts = `/* GENERATED by scripts/illustrations/situations.mjs — do not edit. Run \`npm run illustrations:situations\`. */

export type SituationFigureName = ${Object.keys(out).map((k) => `'${k}'`).join(' | ')};

/** Each drawing's viewBox and inner SVG. \`{{id}}\` is replaced per instance so clip and mask ids stay unique. */
export const SITUATION_FIGURES: Readonly<Record<SituationFigureName, { viewBox: string; markup: string }>> = ${JSON.stringify(out, null, 2)};
`;
const target = new URL('../../src/components/SituationFigure/figures.generated.ts', import.meta.url);
if (process.argv.includes('--check')) {
  const { readFileSync } = await import('node:fs');
  let cur = '';
  try { cur = readFileSync(target, 'utf8'); } catch {}
  if (cur !== ts) { console.error('situations: figures.generated.ts is stale. Run `npm run illustrations:situations`.'); process.exit(1); }
  console.log('situations: figures.generated.ts is current');
} else {
  writeFileSync(target, ts);
  console.log('situations: wrote', Object.keys(out).length, 'figures');
}
