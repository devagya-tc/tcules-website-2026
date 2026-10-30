/**
 * Isometric-line illustration kit — ch05 §4a–§4b, built so every point is placed by formula.
 *
 * World units are plane coordinates on the 1000-unit source canvas. The set is drawn LEFT-FACING:
 * on the site the content sits to the left of an illustration, so every screen and every front
 * face turns toward it. That is the §4a projection mirrored about the vertical:
 *
 *   sx = OX − (x + y) × 0.7071     sy = OY + (y − x) × 0.3536 − z × 0.8660
 *
 * +x runs up-left, +y runs down-left, +z runs up. Both axes keep the 2:1 slope (26.57°). The
 * nearest corner of any footprint is its minimum x and maximum y. Nothing is nudged by eye: every
 * coordinate in a composition is on a 10-unit grid, and every connector, route and leader starts
 * and ends on a named anchor — an edge midpoint, a face centre, an axis — never an arbitrary point.
 *
 * Painter's order is the caller's: back to front. Every surface is opaque in the ground's own
 * colour unless a rule says otherwise, so a nearer object hides a farther one (§4a occlusion).
 */

export const HEX = {
  blue: '#0048FF', // --color-brandeis-500 · line, and the one solid blue plane
  b50: '#EEF2FF', // --color-brandeis-50 · thin edges of standing panels
  b100: '#DBE4FF', // --color-brandeis-100 · paper plinth, lit face
  b200: '#B8C8FF', // --color-brandeis-200 · paper plinth, shaded face
  b600: '#003EE0', // --color-brandeis-600 · blue plinth, lit face
  b700: '#0031B0', // --color-brandeis-700 · blue plinth, shaded face
  p200: '#EDF79B', // --color-peridot-200 · echo fill
  p400: '#D7F04A', // --color-peridot-400 · the carried item, the chip
  p600: '#A1B71F', // --color-peridot-600 · carried item, shaded face
  ink: '#1B1B18', // --color-neutral-950 · item outline, seam, chip leader
  paper: '#FFFEFA', // --color-paper · detail on the blue plane, at 40–80%
};
export const GROUNDS = { paper: '#FFFEFA', 'paper-deep': '#F3F1EA' };

const K = 0.7071;
const H = 0.3536;
const V = 0.866;
const STROKE =
  'stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"';
const DASH = '6 4';
const DASH_CONNECTOR = '8 6';
const MONO = 'Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace';

export const rgba = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
};
/** Paper detail on the blue plane (§4a: 40–80%). */
export const onBlue = (a = 0.8) => rgba(HEX.paper, a);
const r2 = (n) => Math.round(n * 100) / 100;
const stroke = (w) => (w ? STROKE.replace('1.5', String(w)) : STROKE);

export class Scene {
  constructor({ ox = 1000, oy = 500, id = 'ill' } = {}) {
    this.ox = ox;
    this.oy = oy;
    this.id = id;
    this.defs = [];
    this.art = [];
    this.ann = [];
    this.box = [Infinity, Infinity, -Infinity, -Infinity];
  }

  /** §4a projection, mirrored so the drawing faces left. */
  p(x, y, z = 0) {
    return [this.ox - (x + y) * K, this.oy + (y - x) * H - z * V];
  }

  grow([sx, sy]) {
    const b = this.box;
    b[0] = Math.min(b[0], sx);
    b[1] = Math.min(b[1], sy);
    b[2] = Math.max(b[2], sx);
    b[3] = Math.max(b[3], sy);
  }

  pts(list) {
    return list
      .map((q) => {
        const s = this.p(...q);
        this.grow(s);
        return `${r2(s[0])},${r2(s[1])}`;
      })
      .join(' ');
  }

  poly(list, { fill = 'none', stroke: st = HEX.blue, dash, width } = {}) {
    const d = dash ? ` stroke-dasharray="${dash}"` : '';
    const s = st === 'none' ? '' : ` stroke="${st}" ${stroke(width)}${d}`;
    this.art.push(`<polygon points="${this.pts(list)}" fill="${fill}"${s}/>`);
  }

  line(list, { stroke: st = HEX.blue, dash, width, opacity } = {}) {
    const d = dash ? ` stroke-dasharray="${dash}"` : '';
    const o = opacity ? ` stroke-opacity="${opacity}"` : '';
    this.art.push(
      `<polyline points="${this.pts(list)}" fill="none" stroke="${st}" ${stroke(width)}${d}${o}/>`,
    );
  }

  /** A flat plane: corner (x, y), width along x, depth along y, at height z. */
  plane(x, y, w, d, z, opts = {}) {
    this.poly(
      [
        [x, y, z],
        [x + w, y, z],
        [x + w, y + d, z],
        [x, y + d, z],
      ],
      opts,
    );
  }

  /** A plane's outline drawn edge by edge, so some edges can be dashed and others solid. */
  edges(x, y, w, d, z, { back = {}, front = {}, left = {}, right = {} } = {}) {
    // back = the y = y0 edge, front = y = y0 + d, right = x = x0 (screen right), left = x = x0 + w
    const c = [
      [x, y, z],
      [x + w, y, z],
      [x + w, y + d, z],
      [x, y + d, z],
    ];
    if (back) this.line([c[0], c[1]], back);
    if (left) this.line([c[1], c[2]], left);
    if (front) this.line([c[2], c[3]], front);
    if (right) this.line([c[3], c[0]], right);
  }

  /**
   * A volume with thickness — a plinth or the carried item, nothing else (§4a construction).
   * Two side faces show: y = y0 + d faces down-left, x = x0 faces down-right. Light comes from
   * the upper right, so the down-left face is the shaded one.
   */
  block(x, y, w, d, z, h, { top, shaded, lit, stroke: st = HEX.blue } = {}) {
    const o = { stroke: st };
    this.poly(
      [
        [x, y + d, z],
        [x + w, y + d, z],
        [x + w, y + d, z + h],
        [x, y + d, z + h],
      ],
      { ...o, fill: shaded },
    );
    this.poly(
      [
        [x, y, z],
        [x, y + d, z],
        [x, y + d, z + h],
        [x, y, z + h],
      ],
      { ...o, fill: lit },
    );
    this.plane(x, y, w, d, z + h, { ...o, fill: top });
  }

  /** A paper plinth (§4a palette): shaded brandeis-200, lit brandeis-100, top in the ground. */
  plinth(x, y, w, d, z, h, g) {
    this.block(x, y, w, d, z, h, { top: g, shaded: HEX.b200, lit: HEX.b100 });
  }

  /**
   * Standing panel facing down-left (toward the page's content), along x from x0 to x1 at depth
   * y. Returns at(u, v): u measured from the panel's SCREEN-LEFT edge, v up from its foot, so a
   * screen's UI is laid out the way it reads.
   */
  panel(x0, x1, y, z, h, opts = {}) {
    this.poly(
      [
        [x0, y, z],
        [x1, y, z],
        [x1, y, z + h],
        [x0, y, z + h],
      ],
      opts,
    );
    const at = (u, v) => [x1 - u, y, z + v];
    at.w = x1 - x0;
    at.h = h;
    return at;
  }

  /** A rectangle on a standing panel's face, in the panel's (u, v), u from its screen-left. */
  onPanel(at, u, v, w, h, opts = {}) {
    this.poly([at(u, v), at(u + w, v), at(u + w, v + h), at(u, v + h)], opts);
  }

  /**
   * A connector's end diamond drawn IN a standing panel's plane at (u, v), half-diagonal r: for a
   * connector that ends on a face (C2), where a ground-plane diamond would sit off the anchor.
   */
  diamondOnPanel(at, u, v, r = 8, color = HEX.blue) {
    this.poly([at(u - r, v), at(u, v - r), at(u + r, v), at(u, v + r)], {
      fill: color,
      stroke: 'none',
    });
  }

  /** Text bar (30%) or heading bar (solid) on a panel (§4b UI shorthand). */
  panelBar(at, u, v, w, { h = 8, solid = false, color = HEX.blue } = {}) {
    this.onPanel(at, u, v, w, h, { fill: solid ? color : rgba(color, 0.3), stroke: 'none' });
  }

  /**
   * Cylinder standing at z, centred (cx, cy), radius r, height h, cut into `disks` equal disks.
   * A circle on a plane projects to an ellipse with ry = rx / 2. Returns the axis height of each
   * disk's centre, so anything that attaches to the cylinder attaches to its axis.
   */
  cylinder(cx, cy, z, r, h, { fill, disks = 1, stroke: st = HEX.blue } = {}) {
    const [bx, by] = this.p(cx, cy, z);
    const [, ty] = this.p(cx, cy, z + h);
    const ry = r / 2;
    this.grow([bx - r, ty - ry]);
    this.grow([bx + r, by + ry]);
    const f = r2;
    this.art.push(
      `<path d="M${f(bx - r)} ${f(ty)}L${f(bx - r)} ${f(by)}A${f(r)} ${f(ry)} 0 0 0 ${f(bx + r)} ${f(by)}L${f(bx + r)} ${f(ty)}Z" fill="${fill}" stroke="${st}" ${STROKE}/>`,
      `<ellipse cx="${f(bx)}" cy="${f(ty)}" rx="${f(r)}" ry="${f(ry)}" fill="${fill}" stroke="${st}" ${STROKE}/>`,
    );
    const step = h / disks;
    for (let i = 1; i < disks; i++) {
      const [, jy] = this.p(cx, cy, z + i * step);
      this.art.push(
        `<path d="M${f(bx - r)} ${f(jy)}A${f(r)} ${f(ry)} 0 0 0 ${f(bx + r)} ${f(jy)}" fill="none" stroke="${st}" ${STROKE}/>`,
      );
    }
    return Array.from({ length: disks }, (_, i) => z + step * (i + 0.5));
  }

  /** Dot field — raw or unresolved (§4a texture). Pitch 28–40, dots 2.2 units. */
  dots(x, y, w, d, z, { pitch = 32, color = HEX.blue, alpha = 0.3 } = {}) {
    const nx = Math.floor(w / pitch);
    const ny = Math.floor(d / pitch);
    const ix = (w - (nx - 1) * pitch) / 2;
    const iy = (d - (ny - 1) * pitch) / 2;
    for (let i = 0; i < nx; i++)
      for (let j = 0; j < ny; j++) {
        const [sx, sy] = this.p(x + ix + i * pitch, y + iy + j * pitch, z);
        this.art.push(
          `<circle cx="${r2(sx)}" cy="${r2(sy)}" r="2.2" fill="${rgba(color, alpha)}"/>`,
        );
      }
  }

  /** Dot field on a panel's face, centred in the given (u, v) box. */
  panelDots(at, u0, v0, w, h, { pitch = 28, color = HEX.blue, alpha = 0.3 } = {}) {
    const nu = Math.floor(w / pitch) + 1;
    const nv = Math.floor(h / pitch) + 1;
    const iu = (w - (nu - 1) * pitch) / 2;
    const iv = (h - (nv - 1) * pitch) / 2;
    for (let i = 0; i < nu; i++)
      for (let j = 0; j < nv; j++) {
        const [sx, sy] = this.p(...at(u0 + iu + i * pitch, v0 + iv + j * pitch));
        this.art.push(
          `<circle cx="${r2(sx)}" cy="${r2(sy)}" r="2.2" fill="${rgba(color, alpha)}"/>`,
        );
      }
  }

  /** Text bar (30%) or heading bar (solid) flat on a plane, along x or y. */
  bar(x, y, len, z, { color = HEX.blue, alpha = 0.3, thick = 10, along = 'x' } = {}) {
    const [w, d] = along === 'x' ? [len, thick] : [thick, len];
    this.plane(x, y, w, d, z, { fill: rgba(color, alpha), stroke: 'none' });
  }

  /** Connector: dashed 8 6, right-angled, ending in a small solid diamond (§4b). */
  connector(list, { color = HEX.blue, end = true } = {}) {
    this.line(list, { stroke: color, dash: DASH_CONNECTOR });
    if (!end) return;
    const [x, y, z] = list[list.length - 1];
    const s = 8;
    this.poly(
      [
        [x - s, y, z],
        [x, y - s, z],
        [x + s, y, z],
        [x, y + s, z],
      ],
      { fill: color, stroke: 'none' },
    );
  }

  /** The carried item's route: peridot at 55%, at 5× the stroke (§4a). Runs on the grid axes. */
  route(list) {
    this.line(list, { stroke: HEX.p400, width: 7.5, opacity: 0.55 });
  }

  /** The dashed ink thread — one item holding one position on several planes (§4b). */
  thread(list) {
    this.line(list, { stroke: rgba(HEX.ink, 0.7), dash: DASH });
  }

  /** The carried item, solid once: shipped, on screen, real to the user (§4b). */
  itemSolid(x, y, w, d, z, h = 18) {
    this.block(x, y, w, d, z, h, {
      top: HEX.p400,
      shaded: HEX.p600,
      lit: HEX.p400,
      stroke: HEX.ink,
    });
    this.item = {
      top: this.p(x + w / 2, y + d / 2, z + h),
      left: this.p(x + w, y + d, z + h / 2),
    };
  }

  itemSolidOnPanel(at, u, v, w, h) {
    this.onPanel(at, u, v, w, h, { fill: HEX.p400, stroke: HEX.ink });
    this.item = {
      left: this.p(...at(u, v + h / 2)),
      right: this.p(...at(u + w, v + h / 2)),
      top: this.p(...at(u + w / 2, v + h)),
    };
  }

  /** Echo: dashed for proposed, solid for built (§4b). On the blue plane: the "named" treatment. */
  echo(x, y, w, d, z, { state = 'proposed', onBluePlane = false } = {}) {
    if (onBluePlane)
      this.plane(x, y, w, d, z, {
        fill: rgba(HEX.ink, 0.25),
        stroke: HEX.p400,
        dash: DASH,
        width: 1.9,
      });
    else
      this.plane(x, y, w, d, z, {
        fill: HEX.p200,
        stroke: HEX.ink,
        dash: state === 'proposed' ? DASH : undefined,
      });
  }

  echoOnPanel(at, u, v, w, h, { state = 'proposed' } = {}) {
    this.onPanel(at, u, v, w, h, {
      fill: HEX.p200,
      stroke: HEX.ink,
      dash: state === 'proposed' ? DASH : undefined,
    });
  }

  /** Glimmer — loose peridot dots in a dashed ink ring, flat on a plane. Raw signal (§4b). */
  glimmer(cx, cy, z, r = 40) {
    const ring = [];
    for (let i = 0; i <= 48; i++) {
      const t = (i / 48) * Math.PI * 2;
      ring.push([cx + r * Math.cos(t), cy + r * Math.sin(t), z]);
    }
    this.line(ring, { stroke: HEX.ink, dash: DASH });
    for (const [dx, dy] of [
      [-16, -8],
      [10, -14],
      [-2, 6],
      [16, 8],
      [-14, 16],
      [4, -2],
    ]) {
      const [px, py] = this.p(cx + dx, cy + dy, z);
      this.art.push(`<circle cx="${r2(px)}" cy="${r2(py)}" r="3.2" fill="${HEX.p400}"/>`);
    }
  }

  /**
   * The solid blue plane as a slab: a blue top on a low blue plinth (§4a palette: shaded face
   * brandeis-700, lit face brandeis-600). Returns the height of its top, where everything on it sits.
   */
  slab(x, y, w, d, z = 0, h = 16) {
    this.block(x, y, w, d, z, h, { top: HEX.blue, shaded: HEX.b700, lit: HEX.b600 });
    return z + h;
  }

  /**
   * A standing panel with a thin edge — a device or a sheet (§4a: thin edges in brandeis-50).
   * The face is at depth y facing down-left; the thickness runs back to y − t. Returns at(u, v).
   */
  device(x0, x1, y, z, h, { fill, t = 8 } = {}) {
    this.poly(
      [
        [x0, y - t, z],
        [x0, y, z],
        [x0, y, z + h],
        [x0, y - t, z + h],
      ],
      { fill: HEX.b50 },
    );
    this.poly(
      [
        [x0, y - t, z + h],
        [x1, y - t, z + h],
        [x1, y, z + h],
        [x0, y, z + h],
      ],
      { fill: HEX.b50 },
    );
    return this.panel(x0, x1, y, z, h, { fill });
  }

  /** A cut face, hatched at 13% (§4a texture). */
  hatch(list) {
    const pid = `${this.id}-hatch`;
    if (!this.defs.length)
      this.defs.push(
        `<pattern id="${pid}" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)"><rect width="6" height="6" fill="none"/><line x1="0" y1="0" x2="0" y2="6" stroke="${HEX.blue}" stroke-opacity="0.52" stroke-width="1.5"/></pattern>`,
      );
    this.poly(list, { fill: `url(#${pid})` });
  }

  /* ---------------------------------------------------------------- annotation layer */

  /**
   * A label with a dashed leader and an arrowhead (§4b labels). `target` is a SCREEN point that
   * lies on an outline; the arrowhead stops `clear` px short of it, outside the shape, so the
   * head never sinks into a fill of its own colour. The leader is horizontal or vertical.
   * kind 'chip' = ink on a peridot block, ink leader; kind 'part' = line colour, no block.
   */
  label(text, [tx0, ty0], { kind = 'part', dir = 'right', gap = 60, clear = 4 } = {}) {
    const chip = kind === 'chip';
    const size = chip ? 17 : 18;
    const tw = text.length * (size * 0.6 + 2) - 2;
    const pad = chip ? 12 : 0;
    const bw = tw + pad * 2;
    const bh = chip ? 32 : 22;
    const ink = chip ? HEX.ink : HEX.blue;
    const lead = chip ? rgba(HEX.ink, 0.6) : HEX.blue;
    const A = 12;
    const v = dir === 'up' || dir === 'down';
    const s = dir === 'down' || dir === 'right' ? 1 : -1;
    const tx = v ? tx0 : tx0 + s * clear;
    const ty = v ? ty0 + s * clear : ty0;
    let bx, by, l1, l2, head;
    if (v) {
      bx = tx - bw / 2;
      by = s > 0 ? ty + gap : ty - gap - bh;
      l1 = [tx, ty + s * A];
      l2 = [tx, s > 0 ? by : by + bh];
      head = [
        [tx, ty],
        [tx + 5, ty + s * A],
        [tx - 5, ty + s * A],
      ];
    } else {
      by = ty - bh / 2;
      bx = s > 0 ? tx + gap : tx - gap - bw;
      l1 = [tx + s * A, ty];
      l2 = [s > 0 ? bx - (chip ? 0 : 8) : bx + bw + (chip ? 0 : 8), ty];
      head = [
        [tx, ty],
        [tx + s * A, ty - 5],
        [tx + s * A, ty + 5],
      ];
    }
    this.grow([bx, by]);
    this.grow([bx + bw, by + bh]);
    const f = r2;
    this.ann.push(
      `<polygon points="${head.map((q) => q.map(f).join(',')).join(' ')}" fill="${ink}"/>`,
    );
    this.ann.push(
      `<line x1="${f(l1[0])}" y1="${f(l1[1])}" x2="${f(l2[0])}" y2="${f(l2[1])}" stroke="${lead}" ${STROKE} stroke-dasharray="${DASH}"/>`,
    );
    if (chip)
      this.ann.push(
        `<rect x="${f(bx)}" y="${f(by)}" width="${f(bw)}" height="${bh}" fill="${HEX.p400}" stroke="${HEX.ink}" ${STROKE}/>`,
      );
    this.ann.push(
      `<text x="${f(bx + pad)}" y="${f(by + bh / 2 + size * 0.36)}" font-family="${MONO}" font-weight="600" font-size="${size}" letter-spacing="2" fill="${ink}" textLength="${f(tw)}" lengthAdjust="spacingAndGlyphs">${text}</text>`,
    );
  }

  /** Width over height of the drawing, labels included. The set keeps this between 0.75 and 1.35. */
  aspect() {
    const [x0, y0, x1, y1] = this.box;
    return (x1 - x0) / (y1 - y0);
  }

  /** Serialise. The annotation layer is its own group so it can be removed (§4b). */
  svg({ margin = 28, labels = true } = {}) {
    const [x0, y0, x1, y1] = this.box;
    const vb = [x0 - margin, y0 - margin, x1 - x0 + margin * 2, y1 - y0 + margin * 2].map(r2);
    return [
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" width="${vb[2]}" height="${vb[3]}">`,
      this.defs.length ? `<defs>${this.defs.join('')}</defs>` : '',
      `<g id="artwork">${this.art.join('')}</g>`,
      labels ? `<g id="annotation">${this.ann.join('')}</g>` : '',
      `</svg>`,
    ].join('');
  }
}
