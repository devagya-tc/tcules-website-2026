#!/usr/bin/env node
/* The enquiry close's drawing: a designer's desk with nobody at it (owner, 16 Oct 2026).
   ch05 holds that a person appears as their place, so the station stands in for the designer. It
   faces the form (mirrored), every object comes from the form's own copy: the monitor, the one blue
   plane, shows an enquiry just arrived with a reply being typed; the sketchbook, the phone and the
   old closed laptop are the lede's sketch, prototype and product; one peridot sticky note, one mug.
   Flat isometric planes, ink outlines, paper tops, and the right-hand faces filled with the site's
   pixel cell (src/styles/textures/pixel-grid.json), so the drawing is made of the band's texture.

   Generated, not hand-edited: run `node scripts/enquiry-desk.mjs` to rewrite
   public/illustrations/enquiry/designer-desk.svg. Colours are written as literals because the file
   is served as an image, where custom properties do not resolve. */
import { readFileSync, writeFileSync } from 'node:fs';

const grid = JSON.parse(readFileSync(new URL('../src/styles/textures/pixel-grid.json', import.meta.url)));
const CELL = (id) =>
  `<pattern id="${id}" width="${grid.pitch}" height="${grid.pitch}" patternUnits="userSpaceOnUse"><g fill="#292824">` +
  grid.cells.map((c) => `<rect x="${c.x}" y="${c.y}" width="${c.width}" height="${c.height}" fill-opacity="${c.alpha}"/>`).join('') +
  `</g></pattern>`;

function desk({ wide, uid, flip = true }) {
  const K = 22, Cc = Math.cos(Math.PI / 6);
  let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
  const P = (x, y, z = 0) => { const sx = (x - y) * Cc * K, sy = (x + y) * 0.5 * K - z * K;
    minX = Math.min(minX, sx); maxX = Math.max(maxX, sx); minY = Math.min(minY, sy); maxY = Math.max(maxY, sy); return [sx, sy]; };
  const pts = a => a.map(p => P(...p).map(n => n.toFixed(1)).join(",")).join(" ");
  const STROKE = `stroke="#292824" stroke-width="1.3" stroke-linejoin="round"`;
  /* Attributes merge rather than repeat: a repeated attribute is invalid XML, and the file is served as an image. */
  const merge = (...lists) => {
    const m = new Map();
    for (const list of lists) for (const [, k, v] of list.matchAll(/([\w-]+)="([^"]*)"/g)) m.set(k, v);
    return [...m].map(([k, v]) => `${k}="${v}"`).join(" ");
  };
  const poly = (a, fill, extra = "") => `<polygon ${merge(`points="${pts(a)}" fill="${fill}"`, STROKE, extra)}/>`;
  const tex = a => `<polygon points="${pts(a)}" fill="url(#dx-${uid})" stroke="none"/>`;
  const line = (a, attrs) => `<polyline points="${pts(a)}" fill="none" stroke-linecap="round" ${attrs}/>`;
  const TOP = "#fffefa", LEFT = "#e7e3d8", RIGHT = "#d9d4c6";
  function box(x0, y0, z0, dx, dy, dz, o = {}) {
    const x1 = x0 + dx, y1 = y0 + dy, z1 = z0 + dz;
    const right = [[x1,y0,z0],[x1,y1,z0],[x1,y1,z1],[x1,y0,z1]];
    const left = [[x0,y1,z0],[x1,y1,z0],[x1,y1,z1],[x0,y1,z1]];
    const top = [[x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1]];
    return poly(right, o.right || RIGHT) + (o.noTex ? "" : tex(right)) + poly(left, o.left || LEFT) + poly(top, o.top || TOP);
  }
  let s = "";

  // floor: a soft pool of texture under the desk

  // legs
  if (wide) {
    s += box(0.2, 0.2, 0, 0.4, 0.4, 6.7);
    s += box(12.4, 0.2, 0, 0.4, 0.4, 6.7);
    s += box(0.2, 5.9, 0, 0.4, 0.4, 6.7);
    s += box(12.4, 5.9, 0, 0.4, 0.4, 6.7);
  }
  // the desk top
  s += box(0, 0, 6.7, 13, 6.5, 0.5);
  const Z = 7.2;

  // the old laptop, closed: the product with years of history, a peridot sticky note on its lid
  s += box(10.0, 0.6, Z, 2.6, 2.0, 0.45);
  s += box(10.05, 0.65, Z + 0.45, 2.5, 1.9, 0.05, { top: "#f6f4ee", noTex: true });
  s += poly([[10.8,1.15,Z+0.51],[11.8,1.15,Z+0.51],[11.8,2.05,Z+0.51],[10.8,2.05,Z+0.51]], "#d7f04a");
  s += line([[11.0,1.45,Z+0.52],[11.6,1.45,Z+0.52]], `stroke="#292824" stroke-width="1.1"`);
  s += line([[11.0,1.7,Z+0.52],[11.4,1.7,Z+0.52]], `stroke="#292824" stroke-width="1.1"`);

  // the monitor: stand, then the screen, the one blue plane
  s += box(5.6, 0.5, Z, 2.0, 1.4, 0.14);
  s += box(6.35, 0.85, Z + 0.14, 0.5, 0.4, 0.8);
  const mx0 = 3.0, mx1 = 10.2, my0 = 1.0, my1 = 1.45, mz0 = Z + 0.8, mz1 = Z + 5.0;
  s += box(mx0, my0, mz0, mx1 - mx0, my1 - my0, mz1 - mz0, { left: "#292824" });
  const sy = my1 + 0.001, f = (x, z) => [flip ? mx0 + mx1 - x : x, sy, z];   // screen content keeps reading left to right
  s += poly([f(mx0+0.22,mz0+0.25), f(mx1-0.22,mz0+0.25), f(mx1-0.22,mz1-0.22), f(mx0+0.22,mz1-0.22)], "#0048ff", `stroke="none"`);
  // on screen: your enquiry, arrived (a paper card with the four fields filled in)
  const cx0 = mx0 + 0.6, cx1 = mx0 + 4.0, cz0 = mz0 + 0.6, cz1 = mz1 - 0.55;
  s += poly([f(cx0,cz0), f(cx1,cz0), f(cx1,cz1), f(cx0,cz1)], "#fffefa", `stroke="none"`);
  s += line([f(cx0+0.3, cz1-0.4), f(cx0+1.6, cz1-0.4)], `stroke="#0048ff" stroke-width="2.4"`);
  [0, 1, 2].forEach(i => {
    const z = cz1 - 1.0 - i * 0.6;
    s += line([f(cx0+0.3, z+0.18), f(cx0+0.3+[1.3,1.9,1.0][i], z+0.18)], `stroke="#292824" stroke-width="1.6"`);
    s += line([f(cx0+0.3, z), f(cx1-0.3, z)], `stroke="#b2b1ae" stroke-width="1"`);
  });
  s += line([f(cx0+0.3, cz0+0.75), f(cx1-0.5, cz0+0.75)], `stroke="#292824" stroke-width="1.6" opacity=".7"`);
  s += line([f(cx0+0.3, cz0+0.45), f(cx1-1.2, cz0+0.45)], `stroke="#292824" stroke-width="1.6" opacity=".7"`);
  // on screen: the reply being typed beside it, cursor in peridot
  const rx0 = cx1 + 0.5;
  // every line ends 0.5 inside the screen's edge (rx0 + 2.2 = mx1 - 0.5)
  s += line([f(rx0, cz1-0.4), f(rx0+1.8, cz1-0.4)], `stroke="#fffefa" stroke-width="2"`);
  s += line([f(rx0, cz1-0.9), f(rx0+2.2, cz1-0.9)], `stroke="#fffefa" stroke-width="2" opacity=".8"`);
  s += line([f(rx0, cz1-1.4), f(rx0+1.1, cz1-1.4)], `stroke="#fffefa" stroke-width="2" opacity=".8"`);
  s += poly([f(rx0+1.25, cz1-1.6), f(rx0+1.4, cz1-1.6), f(rx0+1.4, cz1-1.2), f(rx0+1.25, cz1-1.2)], "#d7f04a", `stroke="none"`);

  // the sketchbook, open: a wireframe drawn on the right page, a pencil across it
  s += box(0.6, 3.1, Z, 4.0, 2.6, 0.12, { noTex: true });
  const bz = Z + 0.121;
  s += line([[2.6,3.1,bz],[2.6,5.7,bz]], `stroke="#292824" stroke-width="1.1"`);
  [3.6, 4.0, 4.4, 4.8].forEach(y => s += line([[0.9,y,bz],[2.3,y,bz]], `stroke="#b2b1ae" stroke-width="1"`));
  s += poly([[2.95,3.4,bz],[4.25,3.4,bz],[4.25,5.4,bz],[2.95,5.4,bz]], "none", `stroke-width="1.1"`);
  s += line([[3.15,3.75,bz],[4.05,3.75,bz]], `stroke="#292824" stroke-width="1"`);
  s += poly([[3.15,4.0,bz],[4.05,4.0,bz],[4.05,4.65,bz],[3.15,4.65,bz]], "none", `stroke-width="1" stroke-dasharray="2 2"`);
  s += line([[3.15,4.9,bz],[3.8,4.9,bz]], `stroke="#292824" stroke-width="1"`);
  s += line([[1.0,6.1,bz+0.05],[3.9,5.0,bz+0.05]], `stroke="#292824" stroke-width="3"`);
  s += line([[1.0,6.1,bz+0.05],[3.9,5.0,bz+0.05]], `stroke="#fffefa" stroke-width="1.2"`);

  // the keyboard, in front of the screen
  s += box(5.2, 3.0, Z, 4.2, 1.3, 0.18);
  for (let r = 0; r < 3; r++) s += line([[5.5,3.3+r*0.35,Z+0.19],[9.1,3.3+r*0.35,Z+0.19]], `stroke="#b2b1ae" stroke-width="1" stroke-dasharray="3 2"`);

  // the phone, with a prototype on it
  s += box(10.0, 3.4, Z, 1.0, 1.9, 0.14);
  const fx = x => flip ? 21.0 - x : x;
  const pz = Z + 0.141;
  s += poly([[fx(10.12),3.55,pz],[fx(10.88),3.55,pz],[fx(10.88),5.15,pz],[fx(10.12),5.15,pz]], "#f6f4ee", `stroke-width="1"`);
  s += line([[fx(10.25),3.85,pz],[fx(10.7),3.85,pz]], `stroke="#292824" stroke-width="1.4"`);
  s += line([[fx(10.25),4.2,pz],[fx(10.75),4.2,pz]], `stroke="#b2b1ae" stroke-width="1"`);
  s += line([[fx(10.25),4.45,pz],[fx(10.6),4.45,pz]], `stroke="#b2b1ae" stroke-width="1"`);
  s += poly([[fx(10.25),4.75,pz],[fx(10.75),4.75,pz],[fx(10.75),4.95,pz],[fx(10.25),4.95,pz]], "#292824", `stroke="none"`);

  // the mug
  const [mcx, mcy] = P(12.0, 4.9, Z), [mtx, mty] = P(12.0, 4.9, Z + 1.0);
  const erx = Math.SQRT2 * 0.42 * Cc * K, ery = Math.SQRT2 * 0.42 * 0.5 * K;
  s += `<path d="M${mcx + erx + 3},${mty + 4} q12,2 10,10 q-2,8 -11,6" ${merge('fill="none"', STROKE, 'stroke-width="2.2"')}/>`;
  s += `<path d="M${mtx - erx},${mty} L${mcx - erx},${mcy} A${erx},${ery} 0 0 0 ${mcx + erx},${mcy} L${mtx + erx},${mty}" fill="${LEFT}" ${STROKE}/>`;
  s += `<ellipse cx="${mtx}" cy="${mty}" rx="${erx}" ry="${ery}" fill="${TOP}" ${STROKE}/>`;
  s += `<ellipse cx="${mtx}" cy="${mty + 1}" rx="${erx * 0.7}" ry="${ery * 0.6}" fill="#504f49"/>`;
  P(12.0 + 0.6, 4.9, Z); P(12.0, 4.9 + 0.6, Z + 1);

  // the chair, pulled out and empty (wide framing only)
  if (wide) {
    // centred on the desk's length (x 0..13, centre 6.5)
    s += box(5.0, 8.1, 0.9, 3.0, 0.3, 0.28);
    s += box(6.35, 6.6, 0.9, 0.3, 3.2, 0.28);
    [[5.0,8.25],[8.0,8.25],[6.5,6.6],[6.5,9.8]].forEach(([x, y]) => { const [a, b] = P(x, y, 0.45); s += `<circle cx="${a}" cy="${b}" r="4" fill="#fffefa" ${STROKE}/>`; });
    s += box(6.3, 8.05, 1.18, 0.4, 0.4, 3.0);
    s += box(5.0, 6.8, 4.18, 3.0, 2.6, 0.5);
    s += box(6.25, 9.15, 4.68, 0.5, 0.3, 0.6);
    s += box(5.2, 9.2, 5.2, 2.6, 0.35, 3.4, { left: "#e1ddd1" });
  }

  let pool = "";
  // the view: always the whole drawing
  const pad = 12;
  let vb;
  if (wide) vb = [minX - pad, minY - pad, maxX - minX + pad * 2, maxY - minY + pad * 2];
  else vb = [minX - pad, minY - pad, maxX - minX + pad * 2, maxY - minY + pad * 2];
  if (flip) vb[0] = -(vb[0] + vb[2]);
  return `<svg viewBox="${vb.map(n => n.toFixed(1)).join(" ")}" aria-hidden="true" focusable="false">
    <defs>${CELL(`dx-${uid}`)}
      <filter id="df-${uid}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="28"/></filter>
      <mask id="dm-${uid}" maskUnits="userSpaceOnUse" x="${minX - 200}" y="${minY - 200}" width="${maxX - minX + 400}" height="${maxY - minY + 400}"><ellipse cx="${P(7, 6, 0)[0]}" cy="${P(7, 6, 0)[1]}" rx="230" ry="90" fill="white" filter="url(#df-${uid})"/></mask>
    </defs><g ${flip ? 'transform="scale(-1,1)"' : ""}>${pool}${s}</g></svg>`;
}

const svg = desk({ wide: true, uid: 'desk' })
  .replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')
  .replace(/\s*<filter id="df-desk"[\s\S]*?<\/mask>/, '');
const [, , w, h] = svg.match(/viewBox="([-\d.]+) ([-\d.]+) ([\d.]+) ([\d.]+)"/).slice(1).map(Number);
const out = new URL('../public/illustrations/enquiry/designer-desk.svg', import.meta.url);
writeFileSync(out, svg.replace('<svg ', `<svg width="${Math.round(w)}" height="${Math.round(h)}" `) + '\n');
console.log(`designer-desk.svg ${Math.round(w)}×${Math.round(h)}`);
