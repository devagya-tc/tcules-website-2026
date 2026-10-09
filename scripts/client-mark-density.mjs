#!/usr/bin/env node
/**
 * Measure a client mark's OPTICAL density — the fraction of its viewBox the artwork inks — for the
 * `density` field ClientMark sizes it by (r7-logos fix round, 9 Oct 2026).
 *
 *   node scripts/client-mark-density.mjs public/clients/doodle.svg [more.svg …]
 *   node scripts/client-mark-density.mjs public/clients/quoter.svg --frame=Vector_9,Vector_10
 *
 * The file is rasterised at 1200 dpi (sharp, which ships with Next) and the alpha averaged over the
 * whole viewBox, so the figure is the file's own, independent of any size it is drawn at. Record
 * it, rounded to two places, beside the viewBox numbers.
 *
 * `--frame=<id,…>` leaves out the paths with those ids before measuring. A frame drawn round the
 * name — a pill, a box — is a container the eye reads past, not mass: Quoter measures 0.37 with its
 * pill and 0.22 without it, and at 0.37 it would be drawn smaller still. Name the frame's paths
 * only when the file has one, and say so in the record.
 */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const sharp = createRequire(import.meta.url)('sharp');

const args = process.argv.slice(2);
const frame = (args.find((a) => a.startsWith('--frame='))?.slice(8) ?? '')
  .split(',')
  .filter(Boolean);
const files = args.filter((a) => !a.startsWith('--'));
if (!files.length) {
  console.error('usage: client-mark-density.mjs <file.svg> [...] [--frame=id,id]');
  process.exit(1);
}

for (const file of files) {
  let svg = readFileSync(file, 'utf8');
  for (const id of frame)
    svg = svg.replace(new RegExp(`<path[^>]*\\bid="${id}"[^>]*>`, 'g'), '');
  const { data, info } = await sharp(Buffer.from(svg), { density: 1200 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let ink = 0;
  for (let i = 3; i < data.length; i += 4) ink += data[i] / 255;
  console.log(`${file}\t${(ink / (info.width * info.height)).toFixed(4)}`);
}
