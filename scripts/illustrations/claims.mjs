/**
 * npm run illustrations:claims — the hard-parts claim drawings (owner 30 Oct 2026,
 * decisions/2026-10-30-claim-visual-depicts-the-claim): one isometric illustration per claim, in the
 * Reasons house style (ch05 §4a–§4b), exported on both grounds the band sits on. Each drawing is
 * built from its claim's own words; its message line is written above it (`meta` in
 * scripts/illustrations/claims/<name>.mjs) and filed in CLAIM_FIGURES (src/content/sources/
 * claim-figures.ts) with the title it draws.
 *
 * One shared world box for the set, so a band's rows sit at one scale. Each drawing is start-aligned
 * (its left edge on the margin) and bottom-aligned in it: the band anchors a figure at its start, so a
 * centred drawing's visible edge would land 20–70px in from its neighbour's. The annotation layer is never emitted. Writes
 * public/illustrations/claims/<name>.<ground>.svg, aria-hidden. Generated, never hand-edited.
 * `--check` fails if a file is stale or an artwork's aspect is outside 0.75–1.35; `--sizes` prints
 * the size.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

import { GROUNDS } from './lib.mjs';
import * as rulesUnwritten from './claims/rules-unwritten.mjs';
import * as oneRecordManyRoles from './claims/one-record-many-roles.mjs';
import * as orderReadsTheSame from './claims/order-reads-the-same.mjs';
import * as screensForHours from './claims/screens-for-hours.mjs';

const SET = {
  'rules-unwritten': rulesUnwritten,
  'one-record-many-roles': oneRecordManyRoles,
  'order-reads-the-same': orderReadsTheSame,
  'screens-for-hours': screensForHours,
};

const M = 24;
const check = process.argv.includes('--check');
const outDir = new URL('../../public/illustrations/claims/', import.meta.url);
mkdirSync(outDir, { recursive: true });
let stale = 0;
let wrote = 0;
let size;
for (const [ground, hex] of Object.entries(GROUNDS)) {
  const scenes = Object.entries(SET).map(([n, m]) => [n, m.draw(hex)]);
  const W = Math.max(...scenes.map(([, s]) => s.box[2] - s.box[0])) + M * 2;
  const H = Math.max(...scenes.map(([, s]) => s.box[3] - s.box[1])) + M * 2;
  for (const [name, s] of scenes) {
    const aw = s.box[2] - s.box[0];
    const ah = s.box[3] - s.box[1];
    const aspect = aw / ah;
    if (aspect < 0.75 || aspect > 1.35) {
      console.error(`claims: ${name} artwork aspect ${aspect.toFixed(2)} is outside 0.75–1.35.`);
      stale++;
    }
    // start-aligned: the band anchors the figure at its start, so the artwork's left edge sits on
    // the margin and every drawing's visible start lands at the same place beside its words
    const by = s.box[3] + M;
    const vb = [s.box[0] - M, by - H, W, H].map((n) => Math.round(n * 100) / 100);
    size = [Math.round(vb[2]), Math.round(vb[3])];
    const body = (s.defs.length ? `<defs>${s.defs.join('')}</defs>` : '') + s.art.join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" width="${size[0]}" height="${size[1]}" aria-hidden="true">${body.replaceAll('{{id}}', `${s.id}-${ground}`)}</svg>\n`;
    const file = new URL(`${name}.${ground}.svg`, outDir);
    if (check) {
      let cur = '';
      try {
        cur = readFileSync(file, 'utf8');
      } catch {}
      if (cur !== svg) stale++;
    } else {
      writeFileSync(file, svg);
      wrote++;
    }
  }
}
/* The registry states the set's size; it must be the exported one. */
const registry = readFileSync(
  new URL('../../src/content/sources/claim-figures.ts', import.meta.url),
  'utf8',
);
if (!registry.includes(`CLAIM_FIGURE_SIZE = { width: ${size[0]}, height: ${size[1]} }`)) {
  console.error(`claims: CLAIM_FIGURE_SIZE is not { width: ${size[0]}, height: ${size[1]} }.`);
  stale++;
}
if (stale) {
  console.error(`claims: ${stale} problem(s). Run \`npm run illustrations:claims\`.`);
  process.exit(1);
}
if (process.argv.includes('--sizes')) console.log(JSON.stringify({ claims: size }));
console.log(`claims: ${check ? 'current' : `wrote ${wrote} drawings`}`);
