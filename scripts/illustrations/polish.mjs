// Polish pass on Bhumika's finals: three fixes only.
// 1. A slab's back outline takes the front outline's weight and colour.
// 2. A slab gets its corner edges: the crease where two visible side faces meet, and the two silhouette edges.
// 3. Connectors stop at the edge of what they reach and pass behind what is nearer (per-file config).
//
// Usage: node scripts/illustrations/polish.mjs <in.dc.html | in.svg> <out> '<config json>'
// The configs used on 30 Oct are in docs/illustrations/polish-2026-10-30/configs.json. Their numbers are
// shape indices (rect, path, circle and ellipse in document order) in the SOURCE file, so they hold only for
// that exact source; re-read them for a new version.
// Proposed rulings: decisions/2026-10-30-slab-outline-one-weight, -slab-draws-corner-edges,
// -connectors-end-at-the-edge.
import { chromium } from 'playwright';
import fs from 'fs';

const [, , inFile, outFile, cfgJson] = process.argv;
const cfg = JSON.parse(cfgJson || '{}');
const html = fs.readFileSync(inFile, 'utf8');
const svg = html.match(/<svg[\s\S]*?<\/svg>/)[0];
const styles = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 820, height: 820 } });
await p.setContent(`<html><head><style>${styles}</style></head><body style="margin:0">${svg}</body></html>`);

const result = await p.evaluate((cfg) => {
  const NS = 'http://www.w3.org/2000/svg';
  const root = document.querySelector('svg');
  const shapes = [...root.querySelectorAll('rect,path,circle,ellipse')];
  shapes.forEach((e, i) => (e.dataset.i = i));
  const byI = (i) => shapes[i];
  const log = [];

  const mat = (g) => {
    const m = (g.getAttribute('transform') || '').match(/^matrix\(([^)]+)\)$/);
    return m ? m[1].trim().split(/[\s,]+/).map(Number) : null;
  };
  // a face is a rect, or a rect inside a scale() group (the front face of a scaled screen)
  const rectOf = (g) => {
    let r = g.firstElementChild, k = 1;
    if (r && r.tagName === 'g') { const m = (r.getAttribute('transform') || '').match(/^scale\(([\d.]+)\)$/); if (!m) return null; k = +m[1]; r = r.firstElementChild; }
    if (!r || r.tagName !== 'rect') return null;
    return { el: r, x: k * +(r.getAttribute('x') || 0), y: k * +(r.getAttribute('y') || 0), w: k * +r.getAttribute('width'), h: k * +r.getAttribute('height'), rx: k * +(r.getAttribute('rx') || 0) };
  };
  const near = (p, q) => Math.abs(p - q) < 0.05;
  const same = (m1, r1, m2, r2) => m1 && m2 && r1 && r2 && [0, 1, 2, 3].every((k) => Math.abs(m1[k] - m2[k]) < 1e-6) && near(r1.w, r2.w) && near(r1.h, r2.h);
  const nonScaling = (el) => el.getAttribute('vector-effect') === 'non-scaling-stroke' || getComputedStyle(el).vectorEffect === 'non-scaling-stroke';

  // ---- 1 + 2: slabs -------------------------------------------------------
  const visited = new Set();
  for (const g of root.querySelectorAll('g')) {
    if (visited.has(g)) continue;
    const m0 = mat(g), r0 = rectOf(g);
    if (!m0 || !r0 || g.children.length !== 1) continue;
    const run = [g];
    let n = g.nextElementSibling;
    while (n && n.tagName === 'g' && n.children.length === 1 && same(m0, r0, mat(n), rectOf(n))) { run.push(n); n = n.nextElementSibling; }
    if (n && n.tagName === 'g' && same(m0, r0, mat(n), rectOf(n))) run.push(n); // front face carrying its UI
    if (run.length < 4) continue;
    run.forEach((x) => visited.add(x));
    const back = run[0], front = run[run.length - 1];
    const mb = mat(back), mf = mat(front), rb = rectOf(back), rf = rectOf(front);
    const fStroke = rf.el.getAttribute('stroke'), fW = +(rf.el.getAttribute('stroke-width') || 0);
    if (!fStroke || !fW) continue;
    const fNS = nonScaling(rf.el);

    // 1 · the back outline matches the front
    const before = `${rb.el.getAttribute('stroke')} ${rb.el.getAttribute('stroke-width')}${nonScaling(rb.el) ? ' ns' : ''}`;
    rb.el.setAttribute('stroke', fStroke);
    rb.el.setAttribute('stroke-width', fW);
    if (rf.el.getAttribute('stroke-opacity')) rb.el.setAttribute('stroke-opacity', rf.el.getAttribute('stroke-opacity'));
    if (fNS) rb.el.setAttribute('vector-effect', 'non-scaling-stroke'); else rb.el.removeAttribute('vector-effect');

    // 2 · corner edges, in the parent's coordinates
    const [a, bb, c, d, e, f] = mf;
    const v = [mb[4] - e, mb[5] - f];
    const P = (x, y) => [a * x + c * y + e, bb * x + d * y + f];
    const det = a * d - bb * c;
    const nScreen = ([nx, ny]) => [(d * nx - bb * ny) / det, (-c * nx + a * ny) / det]; // A^-T n
    const vis = (nl) => { const s = nScreen(nl); return s[0] * v[0] + s[1] * v[1] > 1e-9; };
    const faces = { top: vis([0, -1]), right: vis([1, 0]), bottom: vis([0, 1]), left: vis([-1, 0]) };
    const { x, y, w, h } = rf; const rx = Math.min(rf.rx, w / 2, h / 2);
    const corners = [
      { k: 'TL', cx: x + rx, cy: y + rx, t0: Math.PI, f1: 'top', f2: 'left' },
      { k: 'TR', cx: x + w - rx, cy: y + rx, t0: 1.5 * Math.PI, f1: 'top', f2: 'right' },
      { k: 'BR', cx: x + w - rx, cy: y + h - rx, t0: 0, f1: 'bottom', f2: 'right' },
      { k: 'BL', cx: x + rx, cy: y + h - rx, t0: 0.5 * Math.PI, f1: 'bottom', f2: 'left' },
    ];
    const lines = [];
    for (const k of corners) {
      const v1 = faces[k.f1], v2 = faces[k.f2];
      if (!v1 && !v2) continue;
      let th;
      if (v1 && v2) th = k.t0 + Math.PI / 4; // the crease: the middle of the corner
      else { // a silhouette: where the corner's screen tangent runs along the extrusion
        let best = 1e9;
        for (let s = 0; s <= 400; s++) {
          const t = k.t0 + (s / 400) * (Math.PI / 2);
          const tl = [-Math.sin(t), Math.cos(t)];
          const T = [a * tl[0] + c * tl[1], bb * tl[0] + d * tl[1]];
          const cr = Math.abs(T[0] * v[1] - T[1] * v[0]) / Math.hypot(...T);
          if (cr < best) { best = cr; th = t; }
        }
      }
      const p0 = P(k.cx + rx * Math.cos(th), k.cy + rx * Math.sin(th));
      lines.push(`M${p0[0].toFixed(2)} ${p0[1].toFixed(2)} L${(p0[0] + v[0]).toFixed(2)} ${(p0[1] + v[1]).toFixed(2)}`);
    }
    // the drawn width on screen: a scaling front stroke is shrunk by the matrix
    const screenW = fNS ? fW : fW * Math.sqrt(Math.abs(det));
    const edge = document.createElementNS(NS, 'path');
    edge.setAttribute('d', lines.join(' '));
    edge.setAttribute('fill', 'none');
    edge.setAttribute('stroke', fStroke);
    edge.setAttribute('stroke-width', screenW.toFixed(2));
    if (rf.el.getAttribute('stroke-opacity')) edge.setAttribute('stroke-opacity', rf.el.getAttribute('stroke-opacity'));
    edge.setAttribute('stroke-linecap', 'round');
    edge.setAttribute('vector-effect', 'non-scaling-stroke');
    edge.dataset.polish = 'corner-edges';
    front.after(edge);
    log.push(`slab ${rf.w}x${rf.h} rx${rf.rx} ×${run.length}: back ${before} → ${fStroke} ${fW}${fNS ? ' ns' : ''}; edges ${lines.length} (${Object.entries(faces).filter(([, s]) => s).map(([k]) => k).join('+')})`);
  }

  // ---- 3: connectors ------------------------------------------------------
  const toScreen = (el, x, y) => new DOMPoint(x, y).matrixTransform(el.getScreenCTM());
  const toLocal = (el, P) => P.matrixTransform(el.getScreenCTM().inverse());
  const inFill = (s, P) => s.isPointInFill(toLocal(s, P));
  const pts = (el) => [...el.getAttribute('d').matchAll(/(-?[\d.]+)[ ,](-?[\d.]+)/g)].map((m) => [+m[1], +m[2]]);
  const setPts = (el, ps) => el.setAttribute('d', ps.map((q, i) => `${i ? 'L' : 'M'}${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(' '));
  // move one end of a straight segment back along it until it leaves the target's fill
  const trimEnd = (el, which, targets) => {
    const ps = pts(el); const i = which === 'start' ? 0 : ps.length - 1, j = which === 'start' ? 1 : ps.length - 2;
    const A = ps[i], B = ps[j];
    let t = 0;
    for (let s = 0; s <= 2000; s++) {
      t = s / 2000; const q = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t];
      const S = toScreen(el, ...q);
      if (!targets.some((tg) => inFill(tg, S))) break;
    }
    ps[i] = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t];
    setPts(el, ps);
    return { t, pt: ps[i] };
  };
  let maskN = 0;
  const maskBehind = (el, occluders) => {
    const parent = el.parentNode;
    const m = document.createElementNS(NS, 'mask');
    const id = `polish-mask-${++maskN}`;
    m.setAttribute('id', id); m.setAttribute('maskUnits', 'userSpaceOnUse');
    m.setAttribute('x', -2000); m.setAttribute('y', -2000); m.setAttribute('width', 5000); m.setAttribute('height', 5000);
    const bg = document.createElementNS(NS, 'rect');
    bg.setAttribute('x', -2000); bg.setAttribute('y', -2000); bg.setAttribute('width', 5000); bg.setAttribute('height', 5000); bg.setAttribute('fill', '#fff');
    m.appendChild(bg);
    const pInv = parent.getScreenCTM().inverse();
    for (const o of occluders) {
      const k = o.cloneNode(true);
      k.removeAttribute('opacity'); k.querySelectorAll('[opacity]').forEach((z) => z.removeAttribute('opacity'));
      for (const z of [k, ...k.querySelectorAll('*')]) {
        if (['rect', 'path', 'circle', 'ellipse', 'polygon'].includes(z.tagName)) {
          if (z.getAttribute('fill') && z.getAttribute('fill') !== 'none') { z.setAttribute('fill', '#000'); z.setAttribute('fill-opacity', '1'); }
          if (z.getAttribute('stroke') && z.getAttribute('stroke') !== 'none') { z.setAttribute('stroke', '#000'); z.setAttribute('stroke-opacity', '1'); }
        }
      }
      const wrap = document.createElementNS(NS, 'g');
      const M = pInv.multiply(o.parentNode.getScreenCTM());
      wrap.setAttribute('transform', `matrix(${M.a} ${M.b} ${M.c} ${M.d} ${M.e} ${M.f})`);
      wrap.appendChild(k); m.appendChild(wrap);
    }
    let defs = parent.querySelector(':scope > defs');
    if (!defs) { defs = document.createElementNS(NS, 'defs'); parent.insertBefore(defs, parent.firstChild); }
    defs.appendChild(m);
    el.setAttribute('mask', `url(#${id})`);
  };
  const pick = (sel) => (typeof sel === 'number' ? byI(sel) : null);
  const commentNext = (text) => { const it = document.createNodeIterator(root, NodeFilter.SHOW_COMMENT); let c; while ((c = it.nextNode())) if (c.textContent.includes(text)) return c.nextElementSibling; return null; };
  const containing = (el, pt, fill) => shapes.find((s) => (s.getAttribute('fill') || '').toUpperCase() === fill && inFill(s, toScreen(el, ...pt)));

  for (const c of cfg.connectors || []) {
    const el = byI(c.path);
    if (c.start) { const r = trimEnd(el, 'start', c.start.map(pick)); log.push(`connector ${c.path}: start moved ${(r.t * 100).toFixed(0)}% in`); }
    if (c.end) { const r = trimEnd(el, 'end', c.end.map(pick)); const dot = pick(c.endDot); if (dot) dot.remove(); /* the line ends flush at the target edge; a dot there would overlap it again */ log.push(`connector ${c.path}: end moved ${(r.t * 100).toFixed(0)}% in`); }
    if (c.behind) maskBehind(el, c.behind.map((x) => (typeof x === 'number' ? byI(x) : commentNext(x))).filter(Boolean));
  }
  for (const i of cfg.remove || []) byI(i).remove();
  if (cfg.removeComment) for (const [text, count] of cfg.removeComment) { let n = commentNext(text); for (let k = 0; k < count && n; k++) { const nx = n.nextElementSibling; n.remove(); n = nx; } }

  // the rod (Design Engineering): trim all its paths by the same amount, butt ends at the card edges
  if (cfg.rod) {
    const paths = cfg.rod.paths.map(byI);
    const main = paths[0];
    const ps = pts(main);
    const tgt = cfg.rod.end.map(byI);
    let t = 1;
    for (let s = 0; s <= 2000; s++) { t = 1 - s / 2000; const q = [ps[0][0] + (ps[1][0] - ps[0][0]) * t, ps[0][1] + (ps[1][1] - ps[0][1]) * t]; if (!tgt.some((tg) => inFill(tg, toScreen(main, ...q)))) break; }
    for (const el of paths) { const q = pts(el); q[1] = [q[0][0] + (q[1][0] - q[0][0]) * t, q[0][1] + (q[1][1] - q[0][1]) * t]; setPts(el, q); el.setAttribute('stroke-linecap', 'butt'); }
    for (const i of cfg.rod.knobs) byI(i).remove();
    log.push(`rod: end trimmed to ${(t * 100).toFixed(1)}%, knobs removed, butt ends`);
  }

  // a dotted line through stacked screens (Modernisation): one segment per gap, each behind the nearer screen
  if (cfg.through) {
    const el = byI(cfg.through.path);
    const ps = pts(el);
    const pills = ps.map((q) => containing(el, q, '#D7F04A'));
    const stages = cfg.through.stages.map(commentNext);
    for (let s = 0; s < ps.length - 1; s++) {
      const seg = el.cloneNode(true);
      delete seg.dataset.i;
      setPts(seg, [ps[s], ps[s + 1]]);
      el.before(seg);
      trimEnd(seg, 'start', [pills[s]]);
      trimEnd(seg, 'end', [pills[s + 1]]);
      maskBehind(seg, [stages[s + 1]]);
    }
    el.remove();
    log.push(`through-line split into ${ps.length - 1} segments, each behind its nearer screen, pills found: ${pills.map(Boolean)}`);
  }

  shapes.forEach((e) => delete e.dataset.i);
  return { svg: root.outerHTML, log };
}, cfg);

fs.writeFileSync(outFile, html.replace(svg, () => result.svg));
console.log(result.log.join('\n'));
await b.close();
