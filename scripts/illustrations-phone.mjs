#!/usr/bin/env node
/**
 * The phone cut of each service-hero illustration, and the legend that goes with it.
 *
 *   node scripts/illustrations-phone.mjs           write the cuts and src/lib/illustration-legends.ts
 *   node scripts/illustrations-phone.mjs --check   exit 1 when either is missing or stale
 *
 * Why: the drawings are 962 units wide and their mono labels are 17 to 18 units. In the hero's
 * [1, 1] track at 1470 that is 0.59x, a 10.5px label. At 390 the column is 326, 0.34x, and the
 * labels render at about 6px, so the drawing loses its argument on a phone (cmp-hero fix round 1).
 * The labels are text inside an <img>, which CSS cannot reach, and scaling them in place was tried
 * and refused: the labels sit at the drawing's edges and against its parts, so a label large enough
 * to read runs off the viewBox or over the artwork.
 *
 * So the phone cut keeps every leader and arrowhead where it is and replaces each label with a
 * numbered marker at the leader's free end — a disc large enough that its numeral reads at 390
 * (32 units, about 11px) — and the words move into HTML under the drawing as a numbered legend,
 * which PageHero renders below 768. The marker keeps the label's own colour: a peridot pill
 * becomes a peridot disc with an ink numeral, a blue label a blue disc with a white one.
 *
 * Generated, never edited: the paper file is the source and both outputs are functions of it.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import * as prettier from 'prettier';

const DIR = 'public/illustrations/services';
const PUBLIC = '/illustrations/services';
const LEGENDS = 'src/lib/illustration-legends.ts';
/* Disc radius and numeral size in drawing units: × 0.34 at 390 is a 16px disc and an 11px numeral. */
const RADIUS = 24;
const NUMERAL = 32;
const MONO = 'Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace';

const check = process.argv.includes('--check');
const stale = [];
const legends = {};

const attr = (tag, name) => new RegExp(`\\b${name}="([^"]*)"`).exec(tag)?.[1];

for (const file of readdirSync(DIR).sort()) {
  if (!file.endsWith('.svg') || file.endsWith('.phone.svg')) continue;
  const source = readFileSync(join(DIR, file), 'utf8');
  const start = source.indexOf('<g id="annotation">');
  if (start === -1) continue;
  const end = source.indexOf('</g>', start);
  const group = source.slice(start, end);
  const parts = group.match(/<(polygon|line|rect|text)\b[^>]*?(?:\/>|>[^<]*<\/text>)/g) ?? [];

  const out = [];
  const items = [];
  let leader;
  let pill;
  for (const part of parts) {
    if (part.startsWith('<line')) {
      leader = part;
      out.push(part);
    } else if (part.startsWith('<rect')) {
      pill = part;
    } else if (part.startsWith('<text')) {
      /* The drawing sets its labels in capitals; the legend is a mono role, uppercased by its
         stylesheet, so the string is sentence case like every other authored label. */
      const drawn = />([^<]*)<\/text>/.exec(part)?.[1] ?? '';
      const label = drawn.charAt(0) + drawn.slice(1).toLowerCase();
      const accent = pill !== undefined;
      const x1 = Number(attr(leader, 'x1'));
      const y1 = Number(attr(leader, 'y1'));
      const x2 = Number(attr(leader, 'x2'));
      const y2 = Number(attr(leader, 'y2'));
      const length = Math.hypot(x2 - x1, y2 - y1) || 1;
      const cx = x2 + ((x2 - x1) / length) * RADIUS;
      const cy = y2 + ((y2 - y1) / length) * RADIUS;
      const n = `@@${items.length}@@`;
      const fill = accent ? '#D7F04A' : '#0048FF';
      const ink = accent ? '#1B1B18' : '#FFFFFF';
      const stroke = accent
        ? ' stroke="#1B1B18" stroke-width="1.5" vector-effect="non-scaling-stroke"'
        : '';
      out.push(
        `<circle cx="${+cx.toFixed(2)}" cy="${+cy.toFixed(2)}" r="${RADIUS}" fill="${fill}"${stroke}/>`,
        `<text x="${+cx.toFixed(2)}" y="${+(cy + NUMERAL * 0.36).toFixed(2)}" text-anchor="middle" font-family="${MONO}" font-weight="600" font-size="${NUMERAL}" fill="${ink}">${n}</text>`,
      );
      items.push({ label, tone: accent ? 'accent' : 'blue', cx, cy });
      pill = undefined;
    } else {
      out.push(part);
    }
  }

  /* Numbered in reading order, top to bottom and then left to right, not in the drawing's source
     order: a legend read 3, 2, 1 down the drawing would be a puzzle. */
  const order = items
    .map((item, index) => ({ ...item, index }))
    .sort((a, b) => (Math.abs(a.cy - b.cy) > 40 ? a.cy - b.cy : a.cx - b.cx));
  const numeral = new Map(order.map((item, rank) => [item.index, rank + 1]));
  const markup = out
    .join('')
    .replace(/@@(\d+)@@/g, (_, index) => String(numeral.get(Number(index))));
  const cut = source.slice(0, start) + '<g id="annotation">' + markup + source.slice(end);
  const ordered = order.map(({ label, tone }) => ({ label, tone }));
  const target = join(DIR, file.replace(/\.svg$/, '.phone.svg'));
  legends[`${PUBLIC}/${file}`] = {
    src: `${PUBLIC}/${file.replace(/\.svg$/, '.phone.svg')}`,
    items: ordered,
  };
  if (check) {
    if (!existsSync(target) || readFileSync(target, 'utf8') !== cut) stale.push(target);
  } else writeFileSync(target, cut);
}

const generated = `/**
 * GENERATED by scripts/illustrations-phone.mjs. Do not edit.
 *
 * Each service-hero illustration's phone cut (the drawing with its labels replaced by numbered
 * markers) and the labels, in marker order, that PageHero sets as a legend under it below 768.
 * Keyed by the illustration's own src, so a hero finds its phone cut without the call site
 * passing anything. \`tone\` is the label's colour in the drawing: \`accent\` the peridot pill, \`blue\`
 * a blue label.
 */
export type IllustrationLegendItem = { label: string; tone: 'accent' | 'blue' };
export type IllustrationLegend = { src: string; items: readonly IllustrationLegendItem[] };

export const ILLUSTRATION_LEGENDS: Readonly<Record<string, IllustrationLegend>> = ${JSON.stringify(legends)};
`;
const options = { ...(await prettier.resolveConfig(LEGENDS)), filepath: LEGENDS };
const formatted = await prettier.format(generated, options);
if (check) {
  if (!existsSync(LEGENDS) || readFileSync(LEGENDS, 'utf8') !== formatted) stale.push(LEGENDS);
} else writeFileSync(LEGENDS, formatted);

if (check && stale.length > 0) {
  console.error(`illustrations:phone --check — stale:\n  ${stale.join('\n  ')}`);
  process.exit(1);
}
console.log(
  `illustrations:phone — ${Object.keys(legends).length} cuts ${check ? 'current' : 'written'}.`,
);
