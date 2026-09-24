#!/usr/bin/env node
/**
 * Export a texture from its geometry spec — SVG or PNG, any colour, any integer scale.
 *
 * The texture was born as a Figma shader, and a shader is not a portable thing: it lives in one
 * file, it cannot be dropped into a slide or a CSS background, and the only other way to reuse it
 * is to bake a screenshot, which fixes the size, the colour and the resolution at once. So the
 * pattern is stated once as geometry in src/styles/textures/<name>.json and every asset is
 * generated from that. Masking, fading and blurring stay with whoever applies it — the export is
 * the raw pattern and nothing else.
 *
 * Colour is a primitive name (`brandeis-500`, resolved from tokens/primitives.css so no hex is
 * restated here) or a literal hex. `--mask` ignores colour and writes black at the texture's
 * alphas, for use as a CSS `mask-image` over whatever colour the caller paints.
 *
 * Scale is integer only. The pitch is 5 layout px; at @1.5x a 1px dash lands across a pixel seam
 * and the export blurs, which is exactly the anti-aliasing the spec exists to get away from.
 *
 * No dependency: the PNG is encoded by hand with node:zlib.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { deflateSync } from 'node:zlib';

const HELP = `usage: npm run texture -- [options]

  --texture <name>     spec in src/styles/textures/ (default: pixel-grid)
  --color <c>          primitive name (brandeis-500) or hex (default: the spec's defaultColor)
  --ground <c>         paint a ground behind the pattern (default: transparent)
  --mask               black at the texture's alphas, for CSS mask-image; ignores --color
  --size <W>x<H>       output size in layout px (default: one tile)
  --scale <n>          integer pixel density, 1 | 2 | 3 … (default: 1)
  --format <svg|png>   (default: from --out's extension, else svg)
  --out <path>         (default: stdout for svg; required for png)

examples:
  npm run texture -- --out public/textures/pixel-grid.svg --mask
  npm run texture -- --color brandeis-200 --size 1080x1350 --scale 2 --out grid@2x.png
  npm run texture -- --ground paper --size 778x972 --out check.png`;

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};

if (flag('help') || flag('h')) {
  console.log(HELP);
  process.exit(0);
}

const fail = (msg) => {
  console.error(`texture: ${msg}\n\n${HELP}`);
  process.exit(1);
};

const name = opt('texture') ?? 'pixel-grid';
const spec = JSON.parse(readFileSync(`src/styles/textures/${name}.json`, 'utf8'));

const primitives = readFileSync('src/styles/tokens/primitives.css', 'utf8');
const resolve = (c) => {
  if (/^#[0-9a-f]{6}$/i.test(c)) return c.toLowerCase();
  const m = primitives.match(new RegExp(`--color-${c}:\\s*(#[0-9a-f]{6})`, 'i'));
  if (!m) fail(`"${c}" is neither a hex nor a --color-* primitive`);
  return m[1].toLowerCase();
};
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

const mask = flag('mask');
const color = mask ? '#000000' : resolve(opt('color') ?? spec.defaultColor);
const ground = opt('ground') && !mask ? resolve(opt('ground')) : null;

const scale = Number(opt('scale') ?? 1);
if (!Number.isInteger(scale) || scale < 1) fail('--scale must be a positive integer');

const size = opt('size') ?? `${spec.pitch}x${spec.pitch}`;
const [w, h] = size.split('x').map(Number);
if (!(w > 0 && h > 0)) fail(`--size "${size}" is not <W>x<H>`);

const out = opt('out');
const format = opt('format') ?? (out?.endsWith('.png') ? 'png' : 'svg');
if (format === 'png' && !out) fail('png needs --out');

let data;

if (format === 'svg') {
  // Width/height carry the density so a @2x file is honestly twice the pixels; the viewBox stays
  // in layout px, so the geometry is written once whatever the scale.
  const cells = spec.cells
    .map(
      (d) =>
        `<rect x="${d.x}" y="${d.y}" width="${d.width}" height="${d.height}" fill-opacity="${d.alpha}"/>`,
    )
    .join('');
  const tile = w === spec.pitch && h === spec.pitch;
  const body = tile
    ? cells
    : `<defs><pattern id="t" width="${spec.pitch}" height="${spec.pitch}" patternUnits="userSpaceOnUse">${cells}</pattern></defs><rect width="${w}" height="${h}" fill="url(#t)"/>`;
  data =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w * scale}" height="${h * scale}" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">` +
    (ground ? `<rect width="${w}" height="${h}" fill="${ground}"/>` : '') +
    `<g fill="${color}">${body}</g></svg>\n`;
} else if (format === 'png') {
  const W = w * scale;
  const H = h * scale;
  const p = spec.pitch * scale;
  // One tile, as final RGBA per pixel. Integer scale means every cell edge is a pixel edge, so
  // each pixel takes exactly one cell's alpha and nothing is anti-aliased. Cells do not overlap.
  const [cr, cg, cb] = rgb(color);
  const g = ground && rgb(ground);
  const paint = (a) =>
    g
      ? [cr, cg, cb].map((c, i) => Math.round(c * a + g[i] * (1 - a))).concat(255)
      : [cr, cg, cb, Math.round(a * 255)];
  const tile = Array.from({ length: p * p }, () => paint(0));
  for (const d of spec.cells)
    for (let y = d.y * scale; y < (d.y + d.height) * scale; y++)
      for (let x = d.x * scale; x < (d.x + d.width) * scale; x++)
        tile[y * p + x] = paint(d.alpha);

  const raw = Buffer.alloc((W * 4 + 1) * H);
  for (let y = 0; y < H; y++) {
    const row = y * (W * 4 + 1); // leading byte 0 = filter "none"
    for (let x = 0; x < W; x++) raw.set(tile[(y % p) * p + (x % p)], row + 1 + x * 4);
  }

  const crcTable = Array.from({ length: 256 }, (_, n) => {
    for (let k = 0; k < 8; k++) n = n & 1 ? 0xedb88320 ^ (n >>> 1) : n >>> 1;
    return n >>> 0;
  });
  const crc = (buf) => {
    let c = ~0;
    for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
    return ~c >>> 0;
  };
  const chunk = (type, body) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(body.length);
    const tb = Buffer.concat([Buffer.from(type), body]);
    const sum = Buffer.alloc(4);
    sum.writeUInt32BE(crc(tb));
    return Buffer.concat([len, tb, sum]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr.set([8, 6, 0, 0, 0], 8); // 8-bit RGBA
  data = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
} else {
  fail(`unknown --format "${format}"`);
}

if (out) {
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, data);
  console.error(`texture: wrote ${out} (${w}x${h} @${scale}x, ${mask ? 'mask' : color})`);
} else {
  process.stdout.write(data);
}
