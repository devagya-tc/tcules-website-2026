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
  // A slab is a back rect, a run of fill-only copies stepping toward the viewer, and a front face. Its outline is
  // redrawn in three parts so no fill ever sits on an outline: the front outline on top of the face's own content;
  // the visible part of the back outline joined to the two silhouette edges, on top of the fills; and the crease,
  // where the two visible side faces meet. Every part ends exactly on a corner (butt caps), and a two-tone side
  // fill is re-split so its shadow ends exactly on the crease.
  const visited = new Set();
  const fmt = (q) => `${q[0].toFixed(2)} ${q[1].toFixed(2)}`;
  const strokeLike = (el, from, w, ns) => {
    el.setAttribute('fill', 'none');
    el.setAttribute('stroke', from.getAttribute('stroke'));
    el.setAttribute('stroke-width', w);
    if (from.getAttribute('stroke-opacity')) el.setAttribute('stroke-opacity', from.getAttribute('stroke-opacity'));
    if (ns) el.setAttribute('vector-effect', 'non-scaling-stroke');
  };
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
    if (!rf.el.getAttribute('stroke') || !+rf.el.getAttribute('stroke-width')) continue;
    const fW = +rf.el.getAttribute('stroke-width');
    const fNS = nonScaling(rf.el);
    const [a, bb, c, d] = mf;
    const det = a * d - bb * c;
    const v = [mb[4] - mf[4], mb[5] - mf[5]];
    const Pm = (m, q) => [m[0] * q[0] + m[2] * q[1] + m[4], m[1] * q[0] + m[3] * q[1] + m[5]];
    const nScreen = ([nx, ny]) => [(d * nx - bb * ny) / det, (-c * nx + a * ny) / det]; // A^-T n
    const vis = (nl) => { const sN = nScreen(nl); return sN[0] * v[0] + sN[1] * v[1] > 1e-9; };
    const faces = { top: vis([0, -1]), right: vis([1, 0]), bottom: vis([0, 1]), left: vis([-1, 0]) };
    const geo = (r) => ({ ...r, rx: Math.min(r.rx, r.w / 2, r.h / 2) });
    const F = geo(rf), B = geo(rb);
    const CORNERS = [
      { k: 'TL', sx: 0, sy: 0, t0: Math.PI, f1: 'top', f2: 'left' },
      { k: 'TR', sx: 1, sy: 0, t0: 1.5 * Math.PI, f1: 'top', f2: 'right' },
      { k: 'BR', sx: 1, sy: 1, t0: 0, f1: 'bottom', f2: 'right' },
      { k: 'BL', sx: 0, sy: 1, t0: 0.5 * Math.PI, f1: 'bottom', f2: 'left' },
    ];
    const arcPt = (R, k, t) => {
      const cx = k.sx ? R.x + R.w - R.rx : R.x + R.rx, cy = k.sy ? R.y + R.h - R.rx : R.y + R.rx;
      return [cx + R.rx * Math.cos(t), cy + R.rx * Math.sin(t)];
    };
    const silTheta = (k) => {
      let best = 1e9, th = k.t0;
      for (let st = 0; st <= 2000; st++) {
        const t = k.t0 + (st / 2000) * (Math.PI / 2);
        const tl = [-Math.sin(t), Math.cos(t)];
        const T = [a * tl[0] + c * tl[1], bb * tl[0] + d * tl[1]];
        const cr = Math.abs(T[0] * v[1] - T[1] * v[0]) / Math.hypot(...T);
        if (cr < best) { best = cr; th = t; }
      }
      return th;
    };
    // the back face's perimeter, clockwise from TL's start, as [corner index, angle] stops
    const perim = (R, from, to) => { // from/to: {i, t}; walk clockwise, sampling arcs
      const out = [];
      let i = from.i, t = from.t;
      for (let guard = 0; guard < 6; guard++) {
        const k = CORNERS[i];
        const end = i === to.i && to.t >= t - 1e-9 ? to.t : k.t0 + Math.PI / 2;
        const steps = Math.max(1, Math.ceil(((end - t) / (Math.PI / 2)) * 24));
        for (let st = 0; st <= steps; st++) out.push(arcPt(R, k, t + ((end - t) * st) / steps));
        if (i === to.i && end === to.t) return out;
        i = (i + 1) % 4; t = CORNERS[i].t0;
      }
      return out;
    };
    const sil = [], crease = [];
    CORNERS.forEach((k, i) => {
      const v1 = faces[k.f1], v2 = faces[k.f2];
      if (v1 && v2) crease.push({ i, t: k.t0 + Math.PI / 4 });
      else if (v1 || v2) sil.push({ i, t: silTheta(k), vis: v1 ? k.f1 : k.f2 });
    });
    if (sil.length !== 2) continue;
    // walk from the silhouette whose visible face comes next clockwise
    const order = ['top', 'right', 'bottom', 'left'];
    const startSil = sil.find((s) => order[(CORNERS[s.i].k === 'TL' ? 0 : CORNERS[s.i].k === 'TR' ? 1 : CORNERS[s.i].k === 'BR' ? 2 : 3)] === s.vis) || sil[0];
    const endSil = sil.find((s) => s !== startSil);
    const backPts = perim(B, startSil, endSil).map((q) => Pm(mb, q));
    const s1f = Pm(mf, arcPt(F, CORNERS[startSil.i], startSil.t));
    const s2f = Pm(mf, arcPt(F, CORNERS[endSil.i], endSil.t));
    const outline = [s1f, ...backPts, s2f];

    // one on-screen width for every part of the outline. A scaling front stroke is skewed by the plate's matrix,
    // so it drew heavier on some sides than others: it becomes non-scaling at its average on-screen width.
    const rootK = Math.sqrt(Math.abs(root.getScreenCTM().a * root.getScreenCTM().d - root.getScreenCTM().b * root.getScreenCTM().c));
    const ctm = rf.el.getScreenCTM();
    const screenW = fNS ? fW : (fW * Math.sqrt(Math.abs(ctm.a * ctm.d - ctm.b * ctm.c))) / rootK;
    const make = (dd, tag) => {
      const pth = document.createElementNS(NS, 'path');
      pth.setAttribute('d', dd);
      strokeLike(pth, rf.el, screenW.toFixed(2), true);
      pth.setAttribute('stroke-linecap', 'butt');
      pth.setAttribute('stroke-linejoin', 'round');
      pth.dataset.polish = tag;
      return pth;
    };
    // the back outline and both silhouettes, as one stroke, above the fills and below the front face
    const before = `${rb.el.getAttribute('stroke')} ${rb.el.getAttribute('stroke-width')}`;
    rb.el.removeAttribute('stroke'); rb.el.removeAttribute('stroke-width');
    front.before(make(`M${outline.map(fmt).join(' L')}`, 'slab-outline'));
    // the crease, from the front corner to the back corner
    for (const k of crease) {
      const cf = Pm(mf, arcPt(F, CORNERS[k.i], k.t)), cb = Pm(mb, arcPt(B, CORNERS[k.i], k.t));
      front.before(make(`M${fmt(cf)} L${fmt(cb)}`, 'slab-crease'));
    }
    // the front outline, drawn after the face's own content so nothing sits on it
    const ring = rf.el.cloneNode(false);
    ring.removeAttribute('fill'); ring.removeAttribute('fill-opacity');
    strokeLike(ring, rf.el, screenW.toFixed(2), true);
    ring.dataset.polish = 'front-outline';
    rf.el.parentNode.appendChild(ring);
    rf.el.removeAttribute('stroke');

    // a two-tone side fill splits exactly on the crease
    let resplit = 0;
    if (crease.length === 1) {
      const fills = run.slice(0, run.length - 1).map(rectOf).filter(Boolean);
      const url = (fills[0]?.el.getAttribute('fill') || '').match(/^url\(#([^)]+)\)$/);
      const grad = url && document.getElementById(url[1]);
      if (grad && grad.tagName === 'linearGradient' && (grad.getAttribute('gradientUnits') || 'objectBoundingBox') === 'objectBoundingBox') {
        const R = geo(fills[0]);
        const pc = arcPt(R, CORNERS[crease[0].i], crease[0].t);
        const dl = [(d * v[0] - c * v[1]) / det, (-bb * v[0] + a * v[1]) / det]; // A^-1 v: the crease's direction, local
        let gv = [-dl[1], dl[0]];
        const L = Math.hypot(...gv); gv = [(gv[0] / L) * 1000, (gv[1] / L) * 1000];
        const num = (n2, dflt) => { const raw = grad.getAttribute(n2); return raw === null ? dflt : raw.endsWith('%') ? parseFloat(raw) / 100 : +raw; };
        const od = [(num('x2', 1) - num('x1', 0)) * R.w, (num('y2', 0) - num('y1', 0)) * R.h];
        const sx = (q) => a * q[0] + c * q[1];
        if (Math.sign(sx(gv)) !== Math.sign(sx(od))) gv = [-gv[0], -gv[1]];
        const ng = grad.cloneNode(true);
        ng.id = `${grad.id}-crease-${visited.size}`;
        ng.setAttribute('gradientUnits', 'userSpaceOnUse');
        ng.setAttribute('x1', (pc[0] - gv[0]).toFixed(3)); ng.setAttribute('y1', (pc[1] - gv[1]).toFixed(3));
        ng.setAttribute('x2', (pc[0] + gv[0]).toFixed(3)); ng.setAttribute('y2', (pc[1] + gv[1]).toFixed(3));
        grad.after(ng);
        for (const fr of fills) fr.el.setAttribute('fill', `url(#${ng.id})`);
        resplit = fills.length;
      }
    }
    log.push(`slab ${F.w.toFixed(0)}x${F.h.toFixed(0)} ×${run.length}: back ${before} → redrawn; ${crease.length} crease, 2 silhouettes; front outline on top${resplit ? `; side fill re-split on the crease (${resplit} layers)` : ''}`);
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
    if (c.start) { const r = trimEnd(el, 'start', c.start.map(pick)); const sd = pick(c.startDot); if (sd) { const k = c.startDotKeep ? sd : sd.cloneNode(true); delete k.dataset.i; const S2 = toScreen(el, ...r.pt); const L2 = toLocal(sd, S2); k.setAttribute('cx', L2.x.toFixed(1)); k.setAttribute('cy', L2.y.toFixed(1)); if (!c.startDotKeep) sd.after(k); } log.push(`connector ${c.path}: start moved ${(r.t * 100).toFixed(0)}% in`); }
    if (c.end) { const r = trimEnd(el, 'end', c.end.map(pick)); const dot = pick(c.endDot); if (dot) { const S2 = toScreen(el, ...r.pt); const L2 = toLocal(dot, S2); dot.setAttribute('cx', L2.x.toFixed(1)); dot.setAttribute('cy', L2.y.toFixed(1)); } log.push(`connector ${c.path}: end moved ${(r.t * 100).toFixed(0)}% in`); }
    if (c.behind) maskBehind(el, c.behind.map((x) => (typeof x === 'number' ? byI(x) : commentNext(x))).filter(Boolean));
  }
  // lines that left one point (a fan) keep one point: every start moves to the trimmed start of the middle
  // line, and the one start dot sits there
  if (cfg.fan) {
    const via = byI(cfg.fan.via); const p0 = pts(via)[0];
    for (const i of cfg.fan.paths) { const el = byI(i); const q = pts(el); q[0] = p0; setPts(el, q); }
    const dot = byI(cfg.fan.dot);
    if (dot) { const L2 = toLocal(dot, toScreen(via, ...p0)); dot.setAttribute('cx', L2.x.toFixed(1)); dot.setAttribute('cy', L2.y.toFixed(1)); }
    log.push(`fan: ${cfg.fan.paths.length} lines leave one point on the edge, one dot`);
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
