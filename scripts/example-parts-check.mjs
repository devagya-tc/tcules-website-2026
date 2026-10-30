/**
 * npm run examples:check — the "Example:" footnote transform (src/templates/CorpusPage/text.ts
 * exampleParts) over every _pages paragraph that opens "Example", so a change to the transform or to the
 * copy cannot quietly leave a "Read the X case" in a sentence or lose its citation. Includes the three
 * expertise pages that take the hard-parts claim-row branch, where the example ends in a
 * "[Read the X case]" link (hard-parts-claims-lead-proof-footnotes).
 */
import { readFileSync } from 'node:fs';
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

const root = new URL('../', import.meta.url);
register(
  'data:text/javascript,' +
    encodeURIComponent(`export async function resolve(s, c, n) {
  if (s.startsWith('@/')) return n(${JSON.stringify(new URL('src/', root).href)} + s.slice(2) + '.ts', c);
  if (s.startsWith('./') && c.parentURL?.endsWith('.ts') && !/\\.\\w+$/.test(s)) return n(s + '.ts', c);
  return n(s, c);
}`),
  pathToFileURL('./'),
);
const { exampleParts, plain } = await import(new URL('src/templates/CorpusPage/text.ts', root).href);

/** Inline markdown reduced to InlineRun: text and links only, which is all an example paragraph holds. */
function runsOf(md) {
  const runs = [];
  let last = 0;
  for (const m of md.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    if (m.index > last) runs.push({ type: 'text', text: md.slice(last, m.index) });
    runs.push({ type: 'link', href: m[2], children: [{ type: 'text', text: m[1] }] });
    last = m.index + m[0].length;
  }
  if (last < md.length) runs.push({ type: 'text', text: md.slice(last) });
  return runs;
}

const fails = [];
let n = 0;
const pages = [
  'expertise__b2b-saas-workflow-software',
  'expertise__ai-products-developer-tools',
  'expertise__data-analytics-decision-products',
];
for (const page of pages) {
  const lines = readFileSync(new URL(`_pages/${page}.md`, root), 'utf8')
    .split('\n')
    .filter((l) => /^Example:/i.test(l));
  if (lines.length < 2) fails.push(`${page}: expected example paragraphs, found ${lines.length}`);
  for (const line of lines) {
    n++;
    const parts = exampleParts(runsOf(line));
    const text = parts ? plain(parts.sentence) : '';
    if (!parts) fails.push(`${page}: not recognised: ${line.slice(0, 60)}`);
    else if (!parts.cite?.name) fails.push(`${page}: no cite: ${line.slice(0, 60)}`);
    else if (/read the .* case/i.test(text)) fails.push(`${page}: "Read the … case" left: ${text}`);
    else if (/^example/i.test(text) || /^[a-z]/.test(text)) fails.push(`${page}: lead-in or case: ${text.slice(0, 40)}`);
  }
}
// the owner's named instance
const b2b = readFileSync(new URL('_pages/expertise__b2b-saas-workflow-software.md', root), 'utf8')
  .split('\n')
  .find((l) => /^Example: Auxentios/.test(l));
const a = exampleParts(runsOf(b2b));
if (!a || a.cite?.name !== 'Auxentios' || !plain(a.sentence).startsWith('Auxentios, a new quoting product'))
  fails.push(`Auxentios example did not come out as expected: ${a && plain(a.sentence).slice(0, 50)} / ${a?.cite?.name}`);

if (fails.length) {
  for (const f of fails) console.error(`examples: ${f}`);
  process.exit(1);
}
console.log(`examples — ${n} example paragraphs on ${pages.length} expertise pages read as footnotes`);
