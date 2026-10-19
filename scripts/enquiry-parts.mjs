#!/usr/bin/env node
/* The enquiry close's drawing, candidate two: a box of parts (owner, 19 Oct 2026, replacing the desk
   for "Tell us what you're building"). The visitor brings the pieces, however loose; we assemble
   them. Things carry UP:
     the box     open crate on the floor, loose interface parts in it at odd angles: the visitor's
                 raw material. The one blue part, the button, is among them;
     rising      two parts lift out and straighten as they climb: tilted, half-aligned, square;
     the screen  a browser window standing behind, the parts already placed, and dashed slots
                 waiting — the blue button's outline among them.
   Two variants: `rise` (the parts float up) and `hand` (a hand lifts the blue button out, so the work
   is visibly done by someone).

   Same construction as scripts/enquiry-desk.mjs: flat isometric planes, ink outlines, paper tops,
   the shaded faces filled with the site's pixel cell, mirrored so the drawing faces the form.
   Generated, not hand-edited: `node scripts/enquiry-parts.mjs` rewrites
   public/illustrations/enquiry/parts-box.svg and parts-box-hand.svg. Colours are literals because
   the file is served as an image, where custom properties do not resolve. */
import { readFileSync, writeFileSync } from 'node:fs';

const grid = JSON.parse(readFileSync(new URL('../src/styles/textures/pixel-grid.json', import.meta.url)));
const CELL = (id) =>
  `<pattern id="${id}" width="${grid.pitch}" height="${grid.pitch}" patternUnits="userSpaceOnUse"><g fill="#292824">` +
  grid.cells.map((c) => `<rect x="${c.x}" y="${c.y}" width="${c.width}" height="${c.height}" fill-opacity="${c.alpha}"/>`).join('') +
  `</g></pattern>`;

const INK = '#292824', TOP = '#fffefa', LEFT = '#e7e3d8', RIGHT = '#d9d4c6', INNER = '#cfc9b9';
const BLUE = '#0048ff', PERIDOT = '#d7f04a', QUIET = '#b2b1ae', PAGE = '#f6f4ee';

function draw({ variant, uid }) {
  const K = 22, Cc = Math.cos(Math.PI / 6);
  let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
  const P = (x, y, z = 0) => {
    const sx = (x - y) * Cc * K, sy = (x + y) * 0.5 * K - z * K;
    minX = Math.min(minX, sx); maxX = Math.max(maxX, sx); minY = Math.min(minY, sy); maxY = Math.max(maxY, sy);
    return [sx, sy];
  };
  const pts = (a) => a.map((p) => P(...p).map((n) => n.toFixed(1)).join(',')).join(' ');
  const STROKE = `stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"`;
  const merge = (...lists) => {
    const m = new Map();
    for (const list of lists) for (const [, k, v] of list.matchAll(/([\w-]+)="([^"]*)"/g)) m.set(k, v);
    return [...m].map(([k, v]) => `${k}="${v}"`).join(' ');
  };
  const poly = (a, fill, extra = '') => `<polygon ${merge(`points="${pts(a)}" fill="${fill}"`, STROKE, extra)}/>`;
  const tex = (a) => `<polygon points="${pts(a)}" fill="url(#dx-${uid})" stroke="none"/>`;
  const line = (a, attrs) => `<polyline points="${pts(a)}" fill="none" stroke-linecap="round" ${attrs}/>`;
  function box(x0, y0, z0, dx, dy, dz, o = {}) {
    const x1 = x0 + dx, y1 = y0 + dy, z1 = z0 + dz;
    const right = [[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]];
    const left = [[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]];
    const top = [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]];
    return poly(right, o.right || RIGHT) + (o.noTex ? '' : tex(right)) + poly(left, o.left || LEFT) + poly(top, o.top || TOP);
  }

  /* A part is a thin plate, laid out in its own (u, v) with u reading left to right on the final
     (mirrored) image, then turned and placed. Rest pose: standing in the screen's plane, face +y.
     yaw turns it about the vertical, tilt leans it back, roll spins it in its own plane. */
  const rad = (d) => (d * Math.PI) / 180;
  function plate({ c, w, h, t = 0.14, yaw = 0, tilt = 0, roll = 0 }) {
    const [cy, sy] = [Math.cos(rad(yaw)), Math.sin(rad(yaw))];
    const [ct, st] = [Math.cos(rad(tilt)), Math.sin(rad(tilt))];
    const [cr, sr] = [Math.cos(rad(roll)), Math.sin(rad(roll))];
    // local: a = across (reads left→right = −x), b = up (+z), n = out of the face (+y)
    const L = (a, b, n) => {
      let x = -a, y = n, z = b;
      [x, z] = [x * cr - z * sr, x * sr + z * cr]; //  roll, in the face's plane
      [y, z] = [y * ct - z * st, y * st + z * ct]; //  tilt, about x
      [x, y] = [x * cy - y * sy, x * sy + y * cy]; //  yaw, about z
      return [c[0] + x, c[1] + y, c[2] + z];
    };
    const corners = (n) => [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]].map(([a, b]) => L(a, b, n));
    const front = corners(0), back = corners(-t);
    const sides = [0, 1, 2, 3].map((i) => [front[i], front[(i + 1) % 4], back[(i + 1) % 4], back[i]]);
    const normal = (q) => {
      const [p0, p1, p2] = q, u = p1.map((v, k) => v - p0[k]), v = p2.map((v, k) => v - p0[k]);
      return [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    };
    const centre = L(0, 0, -t / 2);
    const seen = (q) => {
      const n = normal(q), m = q.reduce((s, p) => s.map((v, k) => v + p[k] / 4), [0, 0, 0]);
      const out = m.map((v, k) => v - centre[k]);
      const sign = Math.sign(n[0] * out[0] + n[1] * out[1] + n[2] * out[2]) || 1;
      return sign * (n[0] + n[1] + n[2]) > 0;
    };
    const at = (a, b) => L(a - w / 2, b - h / 2, 0.001); // (u, v) from the face's bottom-left
    return { front, back, sides, seen, at, faceSeen: seen(front) };
  }
  function drawPlate(p, faceFill, paint) {
    let s = '';
    if (!p.faceSeen) s += poly(p.back, RIGHT) + tex(p.back);
    for (const q of p.sides) if (p.seen(q)) s += poly(q, LEFT);
    if (p.faceSeen) s += poly(p.front, faceFill) + (paint ? paint(p.at) : '');
    return s;
  }
  const rect = (at, u, v, w, h, fill, extra = '') => poly([at(u, v), at(u + w, v), at(u + w, v + h), at(u, v + h)], fill, extra);
  const bar = (at, u, v, w, attrs) => line([at(u, v), at(u + w, v)], attrs);

  /* What each part shows on its face — the same paint wherever the part is, so a part in the box
     and its place on the screen are visibly one thing. */
  const PAINT = {
    button: (at) => bar(at, 0.35, 0.36, 1.1, `stroke="${TOP}" stroke-width="2.2"`),
    card: (at) =>
      rect(at, 0.25, 1.05, 0.55, 0.55, PERIDOT, `stroke-width="1"`) +
      bar(at, 1.0, 1.48, 1.3, `stroke="${INK}" stroke-width="1.6"`) +
      bar(at, 1.0, 1.18, 0.9, `stroke="${QUIET}" stroke-width="1"`) +
      bar(at, 0.25, 0.65, 2.3, `stroke="${QUIET}" stroke-width="1"`) +
      bar(at, 0.25, 0.38, 1.7, `stroke="${QUIET}" stroke-width="1"`),
    toggle: (at) => rect(at, 0.12, 0.12, 0.42, 0.36, TOP, `stroke-width="1"`),
    chart: (at) =>
      [0.5, 1.1, 0.8, 1.6, 1.25].map((h, i) => rect(at, 0.3 + i * 0.48, 0.3, 0.26, h, i === 3 ? INK : RIGHT, `stroke-width="1"`)).join(''),
    nav: (at) =>
      rect(at, 0.15, 0.13, 0.28, 0.28, INK, `stroke="none"`) +
      [0, 1, 2].map((i) => bar(at, 0.8 + i * 0.7, 0.27, 0.45, `stroke="${QUIET}" stroke-width="1.2"`)).join(''),
    text: (at) => [0, 1, 2].map((i) => bar(at, 0.2, 0.95 - i * 0.3, [1.4, 1.1, 1.3][i], `stroke="${QUIET}" stroke-width="1"`)).join(''),
  };
  const SIZE = { button: [2.0, 0.75], card: [2.8, 1.9], toggle: [1.0, 0.6], chart: [2.8, 2.2], nav: [3.0, 0.55], text: [1.8, 1.25] };

  let s = '';

  /* ── the screen: a browser window standing behind, on its own thin plinth ────────────────── */
  const SX0 = 0, SX1 = 8.6, SY = 0, SZ0 = 0.35, SZ1 = 8.2;
  s += box(-0.3, -0.9, 0, SX1 + 0.6, 1.4, 0.35);
  s += box(SX0, SY - 0.35, SZ0, SX1 - SX0, 0.35, SZ1 - SZ0, { left: TOP });
  const scr = (u, v) => [SX1 - u, SY + 0.001, SZ0 + v];
  const W = SX1 - SX0, Hh = SZ1 - SZ0;
  // chrome: the title bar and its three dots
  s += rect(scr, 0, Hh - 0.7, W, 0.7, PAGE, `stroke-width="1.1"`);
  [0, 1, 2].forEach((i) => {
    const [cx, cy] = P(...scr(0.4 + i * 0.32, Hh - 0.35));
    s += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="2.4" ${merge(`fill="${i ? TOP : INK}"`, STROKE, `stroke-width="1"`)}/>`;
  });
  // placed: nav, headline, chart
  const place = (kind, u, v) => {
    const [w, h] = SIZE[kind];
    const at = (a, b) => scr(u + a, v + b);
    return rect(scr, u, v, w, h, kind === 'button' ? BLUE : TOP, `stroke-width="1.1"`) + PAINT[kind](at);
  };
  const slot = (kind, u, v) => {
    const [w, h] = SIZE[kind];
    return rect(scr, u, v, w, h, 'none', `stroke="${INK}" stroke-width="1.1" stroke-dasharray="4 3" opacity=".75"`);
  };
  s += place('nav', 0.4, Hh - 1.5);
  s += bar(scr, 0.4, Hh - 2.25, 3.6, `stroke="${INK}" stroke-width="3"`);
  s += bar(scr, 0.4, Hh - 2.75, 2.4, `stroke="${QUIET}" stroke-width="1.2"`);
  s += place('chart', 0.4, 1.0);
  s += slot('card', 4.0 + 0.6, 3.4);
  s += slot('toggle', 6.95, 1.82);
  s += slot('button', 4.6, 1.75);

  /* ── the box: open crate in front of the screen, back walls, its load, then the front ──── */
  const BX0 = 4.2, BX1 = 9.4, BY0 = 4.0, BY1 = 8.2, BH = 2.6;
  const wallIn = (q) => poly(q, INNER) + tex(q);
  // the back flaps, standing open and leaning out
  s += poly([[BX0, BY0, BH], [BX1, BY0, BH], [BX1, BY0 - 0.8, BH + 0.9], [BX0, BY0 - 0.8, BH + 0.9]], LEFT);
  s += poly([[BX0, BY0, BH], [BX0, BY1, BH], [BX0 - 0.8, BY1, BH + 0.9], [BX0 - 0.8, BY0, BH + 0.9]], RIGHT) +
    tex([[BX0, BY0, BH], [BX0, BY1, BH], [BX0 - 0.8, BY1, BH + 0.9], [BX0 - 0.8, BY0, BH + 0.9]]);
  // the inside: the two far walls and the floor
  s += wallIn([[BX0, BY0, 0], [BX1, BY0, 0], [BX1, BY0, BH], [BX0, BY0, BH]]);
  s += wallIn([[BX0, BY0, 0], [BX0, BY1, 0], [BX0, BY1, BH], [BX0, BY0, BH]]);
  s += poly([[BX0, BY0, 0.02], [BX1, BY0, 0.02], [BX1, BY1, 0.02], [BX0, BY1, 0.02]], RIGHT);

  // the load: parts at odd angles, back to front. The blue button sits proud at the front.
  const part = (kind, o, fill = TOP) => {
    const [w, h] = SIZE[kind];
    return drawPlate(plate({ w, h, ...o }), fill, PAINT[kind]);
  };
  s += part('chart', { c: [7.6, 5.0, 2.2], yaw: -18, tilt: 22, roll: -9 });
  s += part('text', { c: [5.3, 5.2, 2.1], yaw: 32, tilt: 10, roll: 14 });
  s += part('nav', { c: [6.4, 6.2, 2.15], yaw: 64, tilt: -8, roll: 6 });
  const BUTTON_IN_BOX = { c: [7.0, 7.0, 2.65], yaw: -12, tilt: 18, roll: 16 };
  if (variant === 'rise') s += part('button', BUTTON_IN_BOX, BLUE);

  // the near walls and their rims
  s += poly([[BX1, BY0, 0], [BX1, BY1, 0], [BX1, BY1, BH], [BX1, BY0, BH]], RIGHT) + tex([[BX1, BY0, 0], [BX1, BY1, 0], [BX1, BY1, BH], [BX1, BY0, BH]]);
  s += poly([[BX0, BY1, 0], [BX1, BY1, 0], [BX1, BY1, BH], [BX0, BY1, BH]], LEFT);
  // a strip of tape down the near face, and the front flaps folded down and out
  s += poly([[BX0 + 2.2, BY1, BH], [BX0 + 2.9, BY1, BH], [BX0 + 2.9, BY1, BH - 1.0], [BX0 + 2.2, BY1, BH - 1.0]], PAGE, `stroke-width="1"`);
  s += poly([[BX0, BY1, BH], [BX1, BY1, BH], [BX1, BY1 + 1.0, BH - 1.3], [BX0, BY1 + 1.0, BH - 1.3]], TOP);
  s += poly([[BX1, BY0, BH], [BX1, BY1, BH], [BX1 + 1.0, BY1, BH - 1.3], [BX1 + 1.0, BY0, BH - 1.3]], TOP);

  /* ── rising: the toggle lower and tilted, the card higher and nearly square ──────────── */
  if (variant === 'rise') {
    s += part('card', { c: [5.6, 1.6, 5.6], yaw: 6, tilt: 6, roll: -4 });
    s += part('toggle', { c: [3.4, 3.0, 4.4], yaw: -20, tilt: 26, roll: 22 }, PERIDOT);
  } else {
    // hand: the card and the toggle have landed in their slots; the hand carries the last part
    s += place('card', 4.6, 3.4) + rect(scr, 6.95, 1.82, ...SIZE.toggle, PERIDOT, `stroke-width="1.1"`) + PAINT.toggle((a, b) => scr(6.95 + a, 1.82 + b));
    const BTN = { c: [6.4, 5.0, 4.9], yaw: -6, tilt: 10, roll: 8 };
    s += part('button', BTN, BLUE);
    // the hand, gripping the button's top edge from behind: thumb in front, fingers over
    const g = plate({ w: SIZE.button[0], h: SIZE.button[1], ...BTN });
    const [hx, hy] = P(...g.at(1.15, 0.7));
    const F = `fill="${TOP}" ${STROKE}`;
    // the sleeve runs up out of the frame, so the arm belongs to someone rather than floating
    const reach = Math.ceil(hy - minY + 14);
    s += `<g transform="translate(${hx.toFixed(1)},${hy.toFixed(1)}) scale(-1,1)">` +
      // sleeve and the back of the hand, coming down from above-right
      `<path d="M8,${-reach} L30,${-reach} L28,-44 L6,-44 Z" fill="${TOP}" ${STROKE}/>` + `<path d="M6.4,-50 L28.4,-50" ${STROKE}/>` +
      `<path d="M6,-46 C2,-34 -4,-20 -6,-8 L-2,2 C6,4 18,4 26,0 L30,-12 C32,-24 30,-36 28,-46 Z" ${F}/>` +
      // three fingers curled over the edge
      `<path d="M-4,-6 C-8,-2 -8,6 -2,8 C2,9 5,6 5,2" ${F}/>` +
      `<path d="M5,-2 C2,4 4,11 10,11 C14,11 16,7 15,2" ${F}/>` +
      `<path d="M15,-2 C13,4 16,10 21,9 C25,8 26,4 25,-1" ${F}/>` +
      // thumb in front of the button
      `<path d="M27,-14 C33,-8 34,2 30,10 C27,15 21,14 20,9 C19,4 23,-2 22,-8" ${F}/>` +
      `</g>`;
  }

  const pad = 12;
  const vb = [minX - pad, minY - pad, maxX - minX + pad * 2, maxY - minY + pad * 2];
  vb[0] = -(vb[0] + vb[2]);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(vb[2])}" height="${Math.round(vb[3])}" viewBox="${vb.map((n) => n.toFixed(1)).join(' ')}" aria-hidden="true" focusable="false"><defs>${CELL(`dx-${uid}`)}</defs><g transform="scale(-1,1)">${s}</g></svg>\n`;
}

for (const [variant, file] of [['rise', 'parts-box.svg'], ['hand', 'parts-box-hand.svg']]) {
  const svg = draw({ variant, uid: `parts-${variant}` });
  writeFileSync(new URL(`../public/illustrations/enquiry/${file}`, import.meta.url), svg);
  const [, w, h] = svg.match(/width="(\d+)" height="(\d+)"/);
  console.log(`${file} ${w}×${h}  aspect ${(w / h).toFixed(2)}`);
}
