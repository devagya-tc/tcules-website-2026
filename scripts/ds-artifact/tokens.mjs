/**
 * tokens.json for the Design System artifact, READ OUT OF THE TOKEN LAYER — never hand-copied.
 *
 * The artifact's page reads one shape (artifact-type/reference/format.md): every family a LIST of
 * {name, value, usage}, colour with themes. Our surfaces are those themes — paper first, because a
 * token missing a later theme's value inherits the first's, exactly as paper is the :root default.
 *
 *   colour   every --color-* primitive (one value) and every component colour token declared per
 *            surface (four values, aliased to the primitive where the CSS reads one)
 *   type     the --text-* composites, resolved into size / line height / weight / family / tracking
 *   spacing  --gap-* (the scale) then --space-* (the ramp it is built from)
 *   radius, shadow, and the other plain families (border width, measure, z, opacity, duration)
 *
 * Values that the page's grammar cannot carry — color-mix(), transparent, currentColor, a calc() —
 * are skipped and returned in `skipped`, so the README's "Not synced" note can name them.
 */
import { readFileSync } from 'node:fs';

const SURFACES = ['paper', 'tint', 'ink', 'blue'];

/* ── parse ─────────────────────────────────────────────────────────────────────── */

/** Top-level blocks only: declarations inside @media are breakpoint steps, not tokens. */
function blocks(css) {
  const src = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const out = [];
  let i = 0;
  while (i < src.length) {
    const open = src.indexOf('{', i);
    if (open < 0) break;
    const selector = src.slice(i, open).trim();
    let depth = 1;
    let j = open + 1;
    while (j < src.length && depth) {
      if (src[j] === '{') depth++;
      else if (src[j] === '}') depth--;
      j++;
    }
    if (!selector.startsWith('@')) out.push({ selector, body: src.slice(open + 1, j - 1) });
    i = j;
  }
  return out;
}

function decls(body) {
  const out = [];
  for (const m of body.matchAll(/(--[A-Za-z0-9_-]+)\s*:\s*([^;]+);/g)) {
    out.push([m[1], m[2].replace(/\s+/g, ' ').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')').trim()]);
  }
  return out;
}

/** Which surfaces a selector declares for. `:root` alone is the paper default. */
function surfacesOf(selector) {
  const named = [...selector.matchAll(/data-surface=['"]?(\w+)/g)].map((m) => m[1]);
  if (named.length) return named;
  return /:root/.test(selector) ? ['root'] : [];
}

/* ── resolve ───────────────────────────────────────────────────────────────────── */

const HEX = /^#[0-9a-fA-F]{3,8}$/;
const FN_COLOR = /^(rgba?|hsla?|oklch|oklab|lab|lch|color)\([^()]*\)$/;

export function buildTokens({ primitives, components, name }) {
  const root = new Map(); // --name -> raw value (primitives + :root of component layers)
  const bySurface = Object.fromEntries(SURFACES.map((s) => [s, new Map()]));
  const surfaceNames = new Set();
  const origin = new Map(); // --name -> component file (for usage notes)

  for (const b of blocks(primitives)) {
    if (!surfacesOf(b.selector).includes('root')) continue;
    for (const [k, v] of decls(b.body)) root.set(k, v);
  }
  for (const { file, css } of components) {
    for (const b of blocks(css)) {
      for (const s of surfacesOf(b.selector)) {
        for (const [k, v] of decls(b.body)) {
          origin.set(k, file);
          if (s === 'root') root.set(k, v);
          else if (bySurface[s]) {
            bySurface[s].set(k, v);
            surfaceNames.add(k);
          }
        }
      }
    }
  }

  const lookup = (k, s) => (s && bySurface[s]?.has(k) ? bySurface[s].get(k) : root.get(k));
  /** Fully resolve var() chains to a literal, for lengths and type. */
  const literal = (v, s, depth = 0) =>
    depth > 16
      ? v
      : v.replace(/var\((--[A-Za-z0-9_-]+)(?:\s*,\s*([^)]+))?\)/g, (_, k, fb) => {
          const r = lookup(k, s) ?? fb;
          return r == null ? `var(${k})` : literal(r, s, depth + 1);
        });

  const skipped = [];
  const strip = (k) => k.replace(/^--/, '');
  const usage = (k, fallback) =>
    origin.has(k) ? `${fallback} Declared in tokens/components/${origin.get(k)}.` : fallback;

  /* colour */
  const colorPrims = [...root.keys()].filter((k) => k.startsWith('--color-'));
  const colorValue = (raw, s) => {
    const alias = /^var\((--color-[A-Za-z0-9_-]+)\)$/.exec(raw);
    if (alias && root.has(alias[1])) return `{${strip(alias[1])}}`;
    const lit = literal(raw, s);
    if (HEX.test(lit)) return lit.toLowerCase();
    if (FN_COLOR.test(lit)) return lit;
    return null;
  };
  const colorTokens = [];
  for (const k of colorPrims) {
    const v = colorValue(root.get(k));
    if (v) colorTokens.push({ name: strip(k), value: v, usage: 'Primitive ramp. Read through a component token wherever one exists.' });
    else skipped.push(`${k}: ${root.get(k)}`);
  }
  for (const k of surfaceNames) {
    const value = {};
    for (const s of SURFACES) {
      const raw = lookup(k, s);
      if (raw == null) continue;
      const v = colorValue(raw, s);
      if (v) value[s] = v;
    }
    if (!Object.keys(value).length) continue; // not a colour (a length declared per surface, or unrepresentable)
    if (Object.keys(value).length < SURFACES.length) {
      const missing = SURFACES.filter((s) => !(s in value));
      skipped.push(`${k}: no representable value on ${missing.join(', ')} (${missing.map((s) => lookup(k, s)).join(' / ')})`);
    }
    colorTokens.push({ name: strip(k), value, usage: usage(k, 'Per-surface colour.') });
  }

  /* type */
  const families = {};
  for (const k of root.keys()) {
    const m = /^--font-family-(\w+)$/.exec(k);
    if (m) families[m[1]] = root.get(k).replace(/'/g, '"');
  }
  const groups = new Map();
  for (const k of root.keys()) {
    const m = /^--text-([a-z0-9-]+)$/.exec(k);
    if (!m || /-(tracking|case)$/.test(k)) continue;
    const lit = literal(root.get(k));
    const t = /^(italic\s+)?(\d{3})\s+([\d.]+px)\/([\d.]+)\s+(.+)$/.exec(lit);
    if (!t) {
      skipped.push(`${k}: ${lit}`);
      continue;
    }
    const famKey = Object.keys(families).find((f) => families[f] === t[5].replace(/'/g, '"')) ?? 'sans';
    const style = { name: m[1], fontSize: t[3], lineHeight: Number(t[4]), fontWeight: Number(t[2]) };
    if (t[1]) style.fontStyle = 'italic';
    const tr = root.get(`--text-${m[1]}-tracking`);
    if (tr) {
      const trl = literal(tr);
      if (/^-?[\d.]+(em|px)$|^0$/.test(trl)) style.letterSpacing = trl;
    }
    if (famKey === 'mono' && m[1] !== 'code') style.usage = 'Mono label role: set uppercase in CSS (text-transform: var(--text-mono-case)), never in the string.';
    const g = { display: 'Display (serif)', sans: 'Sans', mono: 'Mono' }[famKey] ?? famKey;
    if (!groups.has(g)) groups.set(g, { name: g, family: famKey, styles: [] });
    groups.get(g).styles.push(style);
  }

  /* lengths and plain families */
  const list = (prefix, note, test = () => true) =>
    [...root.keys()]
      .filter((k) => k.startsWith(prefix) && test(k))
      .map((k) => ({ k, v: literal(root.get(k)) }))
      .filter(({ k, v }) => {
        const ok = /^-?[\d.]+(px|rem|em|%|ch|ms|s)?$|^0$/.test(v);
        if (!ok) skipped.push(`${k}: ${v}`);
        return ok;
      })
      .map(({ k, v }) => ({ name: strip(k), value: v, usage: note }));

  const plain = (prefix, note) =>
    [...root.keys()]
      .filter((k) => k.startsWith(prefix))
      .map((k) => ({ k, v: literal(root.get(k)) }))
      .filter(({ k, v }) => {
        const ok = /^[A-Za-z0-9 #%(),./+_-]{1,200}$/.test(v) && !/var\(|url\(/.test(v);
        if (!ok) skipped.push(`${k}: ${v}`);
        return ok;
      })
      .map(({ k, v }) => ({ name: strip(k), value: v, usage: note }));

  const shadow = [...root.keys()]
    .filter((k) => k.startsWith('--shadow-'))
    .map((k) => ({ name: strip(k), value: literal(root.get(k)), usage: 'Shadow. The system draws edges with borders, not shadows.' }));

  const tokens = {
    name,
    version: 1,
    color: { themes: SURFACES.map((id) => ({ id, name: id[0].toUpperCase() + id.slice(1) })), tokens: colorTokens },
    type: {
      fonts: [],
      families,
      groups: [...groups.values()],
    },
    spacing: {
      tokens: [
        ...list('--gap-', 'Gap scale: the only answer to "how far apart". Chosen by what it separates.'),
        ...list('--space-', 'Space ramp: builds the gap scale. Never a layout distance on its own.'),
      ],
    },
    radius: { tokens: list('--radius-', 'Corner radius.') },
    shadow: { tokens: shadow },
    borderWidth: { tokens: plain('--border-width-', 'Border width.') },
    measure: { tokens: plain('--measure-', 'Reading measure.') },
    zIndex: { tokens: plain('--z-', 'Stacking order.') },
    duration: { tokens: plain('--duration-', 'Transition duration (transform only).') },
    opacity: { tokens: plain('--opacity-', 'Opacity.') },
  };
  return { tokens, skipped };
}

export function readTokenLayer(dir = 'src/styles/tokens') {
  const index = readFileSync(`${dir}/index.css`, 'utf8');
  const files = [...index.matchAll(/@import\s+['"](?:\.\/)?components\/([^'"]+)\.css['"]/g)].map((m) => m[1]);
  return {
    primitives: readFileSync(`${dir}/primitives.css`, 'utf8'),
    components: files.map((file) => ({ file, css: readFileSync(`${dir}/components/${file}.css`, 'utf8') })),
  };
}
