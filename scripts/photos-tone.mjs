#!/usr/bin/env node
/**
 * Tag every photograph in `public/kit/photos/catalogue.json` with its tone, by MEASUREMENT.
 *
 *   npm run photos:tone            measure every file, write `temperature` and `saturation`
 *   npm run photos:tone -- --check measure, and exit 1 if any committed tag disagrees
 *
 * Why it exists (docs/kit/visual-direction.md § 5.5). Grading, duotone and tint are banned on our
 * photographs (ch05 § 5), so a page's finish comes from SELECTION alone: one temperature family per
 * page, at most one vivid photograph. A rule that is applied by eye drifts the first time two people
 * disagree about whether a photo is "warm", so the tag is a number with a threshold, and this script
 * is the only thing that writes it.
 *
 * The measurement. Each master is downsampled to fit 64 × 64 (alpha dropped), then over every pixel:
 *   temperature  mean(R) − mean(B), channels on a 0–1 scale
 *                  warm     ≥ 0.10
 *                  neutral  0.02 ≤ x < 0.10
 *                  cool     < 0.02
 *   saturation   mean HSV saturation, (max − min) / max per pixel (0 where max is 0)
 *                  vivid    ≥ 0.40
 *                  quiet    < 0.40
 * The raw numbers are written beside the tags (`tone.rb`, `tone.sat`) so a photo near a threshold is
 * visible as one, and a later change to a threshold can be judged against the numbers rather than
 * re-measured by eye. Thresholds live here and in § 5.5; a change to one is a change to both.
 *
 * Uses `sharp`, which is already in the tree through Next's image stack; it is not a new dependency.
 * Run it whenever a photograph is added to or replaced in the catalogue, then `npm run photos:derive`.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const DIR = 'public/kit/photos';
const CATALOGUE = join(DIR, 'catalogue.json');

const WARM_FROM = 0.1;
const COOL_BELOW = 0.02;
const VIVID_FROM = 0.4;
const SAMPLE = 64;

const check = process.argv.includes('--check');

/** The two numbers, from a 64px sample of the file. */
async function measure(file) {
  const { data } = await sharp(join(DIR, file))
    .resize(SAMPLE, SAMPLE, { fit: 'inside' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let r = 0;
  let b = 0;
  let s = 0;
  let n = 0;
  for (let i = 0; i < data.length; i += 3) {
    const R = data[i] / 255;
    const G = data[i + 1] / 255;
    const B = data[i + 2] / 255;
    const max = Math.max(R, G, B);
    const min = Math.min(R, G, B);
    r += R;
    b += B;
    s += max === 0 ? 0 : (max - min) / max;
    n += 1;
  }
  return { rb: Number(((r - b) / n).toFixed(3)), sat: Number((s / n).toFixed(3)) };
}

function temperatureOf(rb) {
  if (rb >= WARM_FROM) return 'warm';
  if (rb < COOL_BELOW) return 'cool';
  return 'neutral';
}

const saturationOf = (sat) => (sat >= VIVID_FROM ? 'vivid' : 'quiet');

const catalogue = JSON.parse(readFileSync(CATALOGUE, 'utf8'));
const drift = [];

for (const entry of catalogue) {
  const { rb, sat } = await measure(entry.file);
  const temperature = temperatureOf(rb);
  const saturation = saturationOf(sat);
  if (entry.temperature !== temperature || entry.saturation !== saturation) {
    drift.push(
      `${entry.file}: committed ${entry.temperature ?? '—'}/${entry.saturation ?? '—'}, measured ${temperature}/${saturation} (r−b ${rb}, sat ${sat})`,
    );
  }
  entry.temperature = temperature;
  entry.saturation = saturation;
  entry.tone = { rb, sat };
}

if (check) {
  if (drift.length > 0) {
    console.error(
      `photos:tone — ${drift.length} tag(s) disagree with the files:\n  ${drift.join('\n  ')}`,
    );
    console.error('Run `npm run photos:tone`, then `npm run photos:derive`.');
    process.exit(1);
  }
  console.log(
    `photos:tone — ${catalogue.length} photographs, every tag matches its measurement.`,
  );
} else {
  writeFileSync(CATALOGUE, `${JSON.stringify(catalogue, null, 2)}\n`);
  const count = (key, value) => catalogue.filter((e) => e[key] === value).length;
  console.log(
    `photos:tone — ${catalogue.length} measured: ${count('temperature', 'warm')} warm, ` +
      `${count('temperature', 'neutral')} neutral, ${count('temperature', 'cool')} cool; ` +
      `${count('saturation', 'vivid')} vivid.`,
  );
  if (drift.length > 0) console.log(`  changed:\n  ${drift.join('\n  ')}`);
}
