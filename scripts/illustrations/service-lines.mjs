/**
 * The six service-line illustrations, round 3. Briefs: docs/illustration-concepts.md §1.
 *
 * Every drawing faces left, toward the text it sits beside, and reads LEFT TO RIGHT: the first
 * thing in its sequence is furthest left, the last furthest right. None is much wider than it is
 * tall (build.mjs checks 0.75–1.35). Each uses its own construction:
 *   Product Design         depth: evidence, then the product model, then the screen
 *   Product Modernisation  a stack in time: current above, transition, the new foundation below
 *   Design Systems         a deck of representations threaded into the products that use it
 *   AI Product UX          a stack: the model proposes three, a person lets one through
 *   Design Engineering     a test bed: static design, then three coded screens under real data
 *   Software Development   a cutaway building: release, system and product floors
 *
 * A composition takes the ground it is exported for: the occluding plane face is the ground's own
 * colour (§4a), so paper and paper-deep are two exports of one source.
 */
import { Scene, HEX, onBlue, rgba } from './lib.mjs';

const DASH = '6 4';
const faint = rgba(HEX.blue, 0.3);

/* 1.1 Product Design ------------------------------------------------------------------------ */
function productDesign(g) {
  const s = new Scene({ id: 'pd' });
  const p8 = (a = 0.8) => ({ fill: onBlue(a), stroke: 'none' });

  // Evidence is the ground everything stands on: raw signal, with the decision's first trace in it.
  s.plane(-300, 0, 760, 300, 0, { fill: g, dash: DASH });
  s.dots(-300, 0, 760, 300, 0, { pitch: 30 });
  s.glimmer(380, 220, 0, 36);
  s.route([
    [380, 184, 0],
    [380, 100, 0],
  ]);

  // The product model, standing: what the product represents and permits, drawn on one board.
  const bd = s.device(120, 440, 100, 0, 300, { fill: HEX.blue });
  // The work item, and the rule on it.
  s.onPanel(bd, 20, 130, 80, 60, { stroke: onBlue() });
  // Roles, as their places, each wired to the work item by a rule.
  s.onPanel(bd, 50, 250, 20, 20, p8());
  s.connector([bd(60, 250), bd(60, 190)], { color: onBlue() });
  s.onPanel(bd, 20, 50, 20, 20, p8());
  s.connector([bd(30, 70), bd(30, 130)], { color: onBlue() });
  s.onPanel(bd, 240, 250, 20, 20, p8());
  s.connector([bd(250, 250), bd(250, 220), bd(120, 220), bd(120, 190)], { color: onBlue() });
  // Its history: the records the item carries.
  for (const k of [0, 1, 2])
    s.onPanel(bd, 150 + k * 10, 60 + k * 10, 50, 36, { fill: HEX.blue, stroke: onBlue(0.8) });
  s.connector([bd(150, 78), bd(120, 78), bd(120, 130)], { color: onBlue() });
  s.route([bd(60, 0), bd(60, 140)]);
  s.onPanel(bd, 30, 140, 60, 40, {
    fill: rgba(HEX.ink, 0.25),
    stroke: HEX.p400,
    dash: DASH,
    width: 1.9,
  });
  s.route([bd(90, 160), bd(300, 160), bd(300, 0)]);

  // Down onto the ground, and across to the screen.
  s.route([
    [140, 100, 0],
    [140, 260, 0],
    [-190, 260, 0],
    [-190, 220, 0],
  ]);

  // The screen, last and furthest right: finished-looking, and only the surface of the model.
  const at = s.device(-280, -40, 220, 0, 280, { fill: g });
  s.onPanel(at, 14, 252, 12, 12, { fill: HEX.blue, stroke: 'none' });
  s.panelBar(at, 32, 254, 70, { solid: true });
  [100, 80, 110, 70].forEach((w, k) => {
    const v = 214 - k * 28;
    s.onPanel(at, 14, v, 10, 10, { fill: HEX.blue, stroke: 'none' });
    s.panelBar(at, 30, v + 1, w);
    s.onPanel(at, 216, v, 10, 10, { fill: rgba(HEX.blue, 0.6), stroke: 'none' });
  });
  s.route([
    [-190, 220, 0],
    [-190, 220, 80],
  ]);
  s.itemSolidOnPanel(at, 100, 80, 100, 32);
  s.onPanel(at, 14, 80, 70, 32);

  s.label('MODEL FIRST', s.item.right, { kind: 'chip', dir: 'right', gap: 50 });
  s.label('EVIDENCE', s.p(460, 300, 0), { dir: 'left', gap: 40 });
  s.label('PRODUCT MODEL', s.p(...bd(0, 300)), { dir: 'up', gap: 40 });
  return s;
}

/* 1.2 Product Modernisation ----------------------------------------------------------------- */
function productModernisation(g) {
  const s = new Scene({ id: 'pm' });
  const W = 340;
  const [ZC, ZT] = [460, 230];
  const at = (i, j) => [30 + i * 100, 30 + j * 100];
  const tile = (i, j, z, opts = {}, bar = true, paper = false) => {
    const [x, y] = at(i, j);
    s.plane(x, y, 80, 80, z, opts);
    if (bar)
      s.bar(x + 20, y + 30, 40, z, {
        thick: 8,
        ...(paper ? { color: HEX.paper, alpha: 0.55 } : {}),
      });
  };
  const KEEP = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 2],
    [2, 0],
  ];
  // The work users depend on sits at the front corner, and its route runs down the front edge.
  const drop = (z0, z1) =>
    s.route([
      [70, W, z0],
      [70, W, z1],
      [70, 310, z1],
    ]);
  const stub = (z) =>
    s.route([
      [70, 310, z],
      [70, W, z],
    ]);

  // The new foundation, at the bottom: kept parts in place, the rebuilt one new, the retired one gone.
  const T = s.slab(0, 0, W, W);
  for (const [i, j] of KEEP) tile(i, j, T, { stroke: onBlue() }, true, true);
  tile(1, 1, T, { fill: onBlue(0.85), stroke: 'none' }, false);
  {
    const [x, y] = at(2, 1);
    s.plane(x, y, 80, 35, T, { stroke: onBlue() });
    s.plane(x, y + 45, 80, 35, T, { stroke: onBlue() });
  }
  drop(ZT, T);
  s.itemSolid(...at(0, 2), 80, 80, T, 22);
  const target = s.p(30, 230, T + 11);

  // Transition: staged. Most kept, one being rebuilt, one redesigned, one retiring.
  s.plane(0, 0, W, W, ZT, { fill: g, dash: DASH });
  for (const [i, j] of KEEP) tile(i, j, ZT);
  {
    const [x, y] = at(1, 1);
    s.plane(x, y, 80, 80, ZT, { dash: DASH });
    s.dots(x, y, 80, 80, ZT, { pitch: 20 });
  }
  tile(2, 1, ZT, { dash: DASH }, false);
  tile(2, 2, ZT, { dash: DASH, stroke: faint }, false);
  s.echo(...at(0, 2), 80, 80, ZT, { state: 'built' });
  stub(ZT);
  drop(ZC, ZT);

  // Current, at the top: every capability as it runs today.
  s.plane(0, 0, W, W, ZC, { fill: g });
  for (const [i, j] of [...KEEP, [1, 1], [2, 1], [2, 2]]) tile(i, j, ZC);
  s.echo(...at(0, 2), 80, 80, ZC, { state: 'built' });
  stub(ZC);

  s.label('CONTINUITY', target, { kind: 'chip', dir: 'right', gap: 70 });
  s.label('CURRENT', s.p(0, 0, ZC), { dir: 'right', gap: 40 });
  s.label('TARGET', s.p(W, W, T / 2), { dir: 'left', gap: 40 });
  return s;
}

/* 1.3 Design Systems ------------------------------------------------------------------------ */
function designSystems(g) {
  const s = new Scene({ id: 'ds' });
  const T = s.slab(-250, -20, 490, 340);
  const IX = [20, 70]; // the item's footprint on every face, in world x
  const IV = [110, 140]; // and its band, up from the face's foot
  const TZ = T + 125;
  const bar = (at, u, v, w, o = {}) => s.panelBar(at, u, v, w, o);
  const mark = (at, u, v, n = 10, a = 1) =>
    s.onPanel(at, u, v, n, n, { fill: rgba(HEX.blue, a), stroke: 'none' });

  // The products that use it, at the back and to the right: the end of the sequence.
  const main = s.device(0, 220, 0, T, 250, { fill: g });
  mark(main, 14, 222, 12);
  bar(main, 34, 224, 70, { solid: true });
  [196, 172, 148, 124].forEach((v) => mark(main, 14, v, 10, 0.6));
  s.onPanel(main, 40, 160, 70, 60);
  s.onPanel(main, 120, 160, 86, 60);
  [18, 30, 22, 38, 26].forEach((h, k) =>
    s.onPanel(main, 130 + k * 14, 168, 8, h, { fill: HEX.blue, stroke: 'none' }),
  );
  bar(main, 40, 88, 120);
  bar(main, 40, 74, 90);
  s.itemSolidOnPanel(main, 220 - IX[1], IV[0], IX[1] - IX[0], IV[1] - IV[0]);
  const solid = s.item;
  const q = s.device(-130, -30, 0, T, 200, { fill: g });
  mark(q, 12, 176, 10);
  bar(q, 28, 177, 60, { solid: true });
  bar(q, 12, 76, 76);
  bar(q, 12, 62, 70);
  s.onPanel(q, 12, 16, 76, 34);
  s.echoOnPanel(q, 25, IV[0], 50, IV[1] - IV[0], { state: 'built' });
  const r = s.device(-230, -150, 0, T, 170, { fill: g });
  mark(r, 12, 146, 10);
  bar(r, 28, 147, 50, { solid: true });
  bar(r, 12, 70, 56);
  s.onPanel(r, 12, 16, 56, 40);
  s.echoOnPanel(r, 15, IV[0], 50, IV[1] - IV[0], { state: 'built' });
  s.thread([
    [45, 0, TZ],
    [-190, 0, TZ],
  ]);

  // The representations, front to back — definition first — one decision at one point on each.
  const reps = [
    (at) => {
      // Code: the contract at runtime.
      bar(at, 16, 196, 80);
      bar(at, 32, 182, 110);
      bar(at, 32, 168, 70);
      bar(at, 48, 154, 90);
      bar(at, 32, 80, 100);
      bar(at, 16, 66, 60);
    },
    (at) => {
      // Component: the part and its properties.
      s.onPanel(at, 16, 40, 70, 150);
      bar(at, 26, 170, 50, { solid: true });
      bar(at, 26, 156, 36);
      s.onPanel(at, 26, 56, 50, 20);
    },
    (at) => {
      // Tokens: the values that express it.
      [1, 0.6, 0.3].forEach((a, k) => mark(at, 16 + k * 30, 170, 22, a));
      [100, 76, 52].forEach((w, k) => bar(at, 16, 80 - k * 14, w));
    },
    (at) => {
      // Definition: the rule, in words.
      bar(at, 16, 190, 100, { solid: true, h: 10 });
      bar(at, 16, 172, 150);
      bar(at, 16, 158, 120);
      bar(at, 16, 144, 140);
      bar(at, 16, 70, 110);
    },
  ];
  let front;
  [70, 140, 210, 280].forEach((y, k) => {
    s.thread([
      [45, y - 70, TZ],
      [45, y, TZ],
    ]);
    const at = s.device(0, 200, y, T, 220, { fill: g });
    reps[k](at);
    s.echoOnPanel(at, 200 - IX[1], IV[0], IX[1] - IX[0], IV[1] - IV[0], { state: 'built' });
    front = at;
  });

  s.label('ONE DECISION', solid.top, { kind: 'chip', dir: 'up', gap: 120 });
  s.label('REPRESENTATIONS', s.p(...front(0, 220)), { dir: 'up', gap: 40 });
  s.label('PRODUCTS', s.p(-150, 0, T + 170), { dir: 'up', gap: 40 });
  return s;
}

/* 1.4 AI Product UX ------------------------------------------------------------------------- */
function aiProductUx(g) {
  const s = new Scene({ id: 'ai' });
  const W = 480;
  const A = [40, 110];
  const B = [160, 230];
  const C = [280, 350];
  const OY = [380, 450];
  const mid = (c) => (c[0] + c[1]) / 2;
  const STATION = [110, 250]; // in the corridor between A and B

  // The model, over its sources. Raw signal across it.
  const Z0 = s.slab(0, 0, W, W);
  const Z1 = Z0 + 180;
  const Z2 = Z1 + 210;
  s.dots(0, 0, W, W, Z0, { color: HEX.paper, alpha: 0.4, pitch: 34 });
  for (const x of [40, 140]) {
    s.plane(x, 240, 70, 70, Z0, { fill: HEX.blue, stroke: onBlue() });
    s.bar(x + 12, 260, 46, Z0, { color: HEX.paper, alpha: 0.6, thick: 8 });
    s.bar(x + 12, 280, 30, Z0, { color: HEX.paper, alpha: 0.6, thick: 8 });
  }
  s.echo(A[0], OY[0], 70, 70, Z0, { onBluePlane: true });

  // It proposes three. They rise over the blue, so the two plain connectors are paper.
  s.route([
    [mid(A), OY[1], Z0],
    [mid(A), W, Z0],
    [mid(A), W, Z1],
  ]);
  for (const c of [B, C])
    s.connector(
      [
        [mid(c), W, Z0],
        [mid(c), W, Z1],
      ],
      { color: onBlue(), end: false },
    );

  // Review: three options in front of one person's station.
  s.plane(0, 0, W, W, Z1, { fill: g });
  for (const c of [B, C]) {
    s.plane(c[0], OY[0], 70, 70, Z1, { dash: DASH });
    s.connector([
      [mid(c), W, Z1],
      [mid(c), OY[1], Z1],
    ]);
  }
  s.route([
    [mid(A), W, Z1],
    [mid(A), OY[1], Z1],
  ]);
  s.echo(A[0], OY[0], 70, 70, Z1);
  // Undo: from the product back to the person, down the corridor between A and B.
  s.line(
    [
      [135, W, Z2],
      [135, W, Z1],
    ],
    { dash: '8 6' },
  );
  s.connector([
    [135, W, Z1],
    [135, STATION[1] + 50, Z1],
  ]);
  s.plinth(STATION[0], STATION[1], 50, 50, Z1, 16, g);
  s.plane(STATION[0] + 10, STATION[1] + 10, 30, 30, Z1 + 16, {
    fill: HEX.blue,
    stroke: 'none',
  });
  s.route([
    [mid(A), W, Z1],
    [mid(A), W, Z2],
  ]);

  // The product: only the approved one acts.
  s.plane(0, 0, W, W, Z2, { fill: g });
  for (let k = 0; k < 6; k++)
    s.plane(420, 60 + k * 50, 24, 24, Z2, k === 0 ? { fill: HEX.blue, stroke: 'none' } : {});
  s.bar(40, 24, 340, Z2, { alpha: 1, thick: 12 });
  s.plane(230, 60, 160, 120, Z2);
  [60, 90, 40, 110, 75].forEach((len, k) =>
    s.bar(250, 76 + k * 18, len, Z2, { alpha: 0.6, thick: 10 }),
  );
  s.plane(40, 60, 160, 120, Z2);
  s.bar(60, 80, 90, Z2);
  s.bar(60, 100, 120, Z2);
  s.plane(230, 210, 160, 200, Z2);
  s.bar(250, 230, 100, Z2);
  s.route([
    [mid(A), W, Z2],
    [mid(A), OY[1], Z2],
  ]);
  s.itemSolid(A[0], OY[0], 70, 70, Z2, 18);

  s.label('PERSON APPROVES', s.item.left, { kind: 'chip', dir: 'left', gap: 90 });
  s.label('MODEL', s.p(0, 0, Z0 / 2), { dir: 'right', gap: 40 });
  s.label('OPTIONS', s.p(C[1], OY[1], Z1), { dir: 'left', gap: 60 });
  return s;
}

/* 1.5 Design Engineering -------------------------------------------------------------------- */
function designEngineering(g) {
  const s = new Scene({ id: 'de' });
  const Y = 300;
  const T = 16;
  const V = T + 110; // the item's band starts here on every screen, in world z
  const H = 24;

  // Grounds and connectors first: they lie under everything that stands on them.
  s.plane(490, 240, 150, 100, 0, { fill: g, dash: DASH });
  s.slab(90, 60, 390, 280);
  s.connector(
    [
      [140, 110, T],
      [140, Y, T],
    ],
    { color: onBlue() },
  );
  s.connector(
    [
      [140, 110, T],
      [250, 110, T],
      [250, Y, T],
    ],
    { color: onBlue() },
  );
  s.connector(
    [
      [250, 110, T],
      [400, 110, T],
      [400, Y, T],
    ],
    { color: onBlue() },
  );
  // Real data, at the back. Every connector leaves it from its axis.
  s.cylinder(140, 110, T, 40, 96, { fill: g, disks: 3 });

  // Back to front by depth: static design, desktop, tablet, phone.
  // The static design, first and furthest left: persuasive, and not yet code.
  const st = s.panel(500, 630, Y, 0, 280, { fill: g, dash: DASH });
  s.panelBar(st, 14, 256, 60, { solid: true });
  s.onPanel(st, 14, 196, 102, 44);
  s.panelBar(st, 14, 90, 90);
  s.panelBar(st, 14, 76, 60);
  s.onPanel(st, 14, 20, 102, 40);
  s.echoOnPanel(st, 40, V, 50, H);
  // Desktop: real data expands.
  const dk = s.device(330, 470, Y, T, 270, { fill: g });
  [240, 220, 200, 180, 160].forEach((v) =>
    s.onPanel(dk, 10, v, 8, 8, { fill: rgba(HEX.blue, 0.6), stroke: 'none' }),
  );
  s.panelBar(dk, 26, 246, 60, { solid: true });
  [100, 86, 104, 70, 92].forEach((w, k) => s.panelBar(dk, 26, 226 - k * 12, w));
  [70, 58, 46].forEach((v) => s.panelBar(dk, 26, v, 60));
  [26, 42, 22, 50].forEach((h, k) =>
    s.onPanel(dk, 94 + k * 10, 20, 6, h, { fill: HEX.blue, stroke: 'none' }),
  );
  s.echoOnPanel(dk, 45, V - T, 50, H, { state: 'built' });
  // Tablet: a slow response leaves the content pending.
  const tb = s.device(210, 290, Y, T, 300, { fill: g });
  s.panelBar(tb, 10, 276, 40, { solid: true });
  s.panelDots(tb, 10, 170, 60, 90, { pitch: 20 });
  s.panelDots(tb, 10, 20, 60, 70, { pitch: 20 });
  s.echoOnPanel(tb, 15, V - T, 50, H);
  // Phone: the narrowest screen reflows, and the interaction still holds.
  const ph = s.device(110, 170, Y, T, 330, { fill: g });
  s.panelBar(ph, 8, 308, 30, { solid: true });
  s.onPanel(ph, 8, 246, 44, 44);
  s.onPanel(ph, 8, 170, 44, 60);
  s.onPanel(ph, 8, 20, 44, 70);
  s.itemSolidOnPanel(ph, 5, V - T, 50, H);

  s.thread([
    [565, Y, V + H / 2],
    [140, Y, V + H / 2],
  ]);

  s.label('HOLDS IN CODE', s.item.right, { kind: 'chip', dir: 'right', gap: 50 });
  s.label('STATIC DESIGN', s.p(630, Y, 280), { dir: 'up', gap: 30 });
  const [cx, cy] = s.p(140, 110, T + 96);
  s.label('REAL DATA', [cx, cy - 20], { dir: 'up', gap: 40 });
  return s;
}

/* 1.6 Software Development ------------------------------------------------------------------ */
function softwareDevelopment(g) {
  const s = new Scene({ id: 'sd' });
  const W = 360;
  const t = 12; // wall thickness
  const T = s.slab(0, -t, W + t, W + t);
  const ZM = T + 160;
  const ZP = ZM + 160;
  const I = [40, 280]; // the item's footprint corner on every floor: the front corner
  const riser = (z0, z1) =>
    s.route([
      [70, W, z0],
      [70, W, z1],
      [70, 340, z1],
    ]);
  const stub = (z) =>
    s.route([
      [70, 340, z],
      [70, W, z],
    ]);

  // Two walls stand at the back; the front two are cut away, so their cut faces are hatched.
  s.poly(
    [
      [0, 0, T],
      [W, 0, T],
      [W, 0, ZP],
      [0, 0, ZP],
    ],
    { fill: g },
  );
  s.poly(
    [
      [W, 0, T],
      [W, W, T],
      [W, W, ZP],
      [W, 0, ZP],
    ],
    { fill: g },
  );
  s.hatch([
    [0, -t, T],
    [0, 0, T],
    [0, 0, ZP],
    [0, -t, ZP],
  ]);
  s.hatch([
    [W, W, T],
    [W + t, W, T],
    [W + t, W, ZP],
    [W, W, ZP],
  ]);
  s.hatch([
    [0, -t, ZP],
    [W + t, -t, ZP],
    [W + t, W, ZP],
    [W, W, ZP],
    [W, 0, ZP],
    [0, 0, ZP],
  ]);
  // Release: the team can deploy and watch it. A chart on the back wall, at ground level.
  [40, 64, 48, 80, 56].forEach((h, k) =>
    s.poly(
      [
        [24 + k * 18, 0, T + 20],
        [36 + k * 18, 0, T + 20],
        [36 + k * 18, 0, T + 20 + h],
        [24 + k * 18, 0, T + 20 + h],
      ],
      { fill: HEX.blue, stroke: 'none' },
    ),
  );

  // Ground: data, on the blue release floor.
  s.cylinder(80, 190, T, 36, 70, { fill: g, disks: 2 });
  s.connector(
    [
      [150, 230, T],
      [190, 230, T],
    ],
    { color: onBlue(), end: false },
  );
  s.cylinder(190, 230, T, 36, 70, { fill: g, disks: 2 });
  s.echo(...I, 60, 60, T, { onBluePlane: true });
  stub(T);
  riser(T, ZM);

  // System: the records, rules and services behind the screen, and one integration out.
  s.plane(0, 0, W, W, ZM, { fill: g });
  s.connector([
    [100, 150, ZM],
    [190, 150, ZM],
    [190, 200, ZM],
  ]);
  s.connector([
    [220, 230, ZM],
    [W, 230, ZM],
  ]);
  s.plinth(40, 120, 60, 60, ZM, 18, g);
  s.plinth(160, 200, 60, 60, ZM, 18, g);
  for (const x of [240, 290]) s.plane(x, 280, 36, 36, ZM);
  s.echo(...I, 60, 60, ZM, { state: 'built' });
  stub(ZM);
  riser(ZM, ZP);

  // Product: the screen people use.
  s.plane(0, 0, W, W, ZP, { fill: g });
  s.bar(30, 24, 300, ZP, { alpha: 1, thick: 12 });
  for (let k = 0; k < 5; k++)
    s.plane(310, 60 + k * 50, 24, 24, ZP, k === 0 ? { fill: HEX.blue, stroke: 'none' } : {});
  s.plane(150, 60, 140, 120, ZP);
  s.plane(30, 60, 100, 120, ZP);
  s.plane(150, 200, 140, 130, ZP);
  [80, 110, 60].forEach((len, k) =>
    s.bar(170, 80 + k * 24, len, ZP, { alpha: 0.6, thick: 10 }),
  );
  stub(ZP);
  s.itemSolid(...I, 60, 60, ZP, 16);

  s.label('END TO END', s.p(I[0], I[1], ZP + 8), { kind: 'chip', dir: 'right', gap: 70 });
  s.label('SYSTEM', s.p(0, -t, ZM), { dir: 'right', gap: 40 });
  s.label('RELEASE', s.p(0, -t, T / 2), { dir: 'right', gap: 40 });
  return s;
}

export const SERVICE_LINES = [
  {
    slug: 'product-design',
    title: 'Product Design',
    draw: productDesign,
    message:
      'A screen is only the surface: the roles, rules and records beneath it decide what it can show.',
  },
  {
    slug: 'product-modernisation',
    title: 'Product Modernisation',
    draw: productModernisation,
    message:
      'Each capability is kept, rebuilt or retired on its own evidence, so the work users depend on keeps running through the change.',
  },
  {
    slug: 'design-systems',
    title: 'Design Systems',
    draw: designSystems,
    message:
      'One shared decision keeps the same meaning in every representation of the system and in every product that uses it.',
  },
  {
    slug: 'ai-product-ux',
    title: 'AI Product UX',
    draw: aiProductUx,
    message:
      'The model proposes several actions; a person approves the one that goes ahead, and can undo it.',
  },
  {
    slug: 'design-engineering',
    title: 'Design Engineering',
    draw: designEngineering,
    message:
      'An interaction is built in code and tested against real data, slow responses and narrow screens until it holds.',
  },
  {
    slug: 'software-development',
    title: 'Software Development',
    draw: softwareDevelopment,
    message:
      'A capability is finished when people can complete it, the system behind it holds together, and it can be released and watched.',
  },
];
