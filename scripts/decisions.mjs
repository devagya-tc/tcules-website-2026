#!/usr/bin/env node
/**
 * The decision log: validate every entry in docs/decisions/ and regenerate its index.
 *
 *   npm run decisions               validate, then write docs/decisions/INDEX.md
 *   npm run decisions -- --check    exit 1 on an invalid entry; writes nothing
 *
 * The index is generated and git-ignored (owner, 22 Oct 2026). Committed, it was rewritten by every PR
 * that logged a ruling, so each merge left every other open PR in conflict over a file nobody edits
 * by hand. `verify` runs the writing form, so any checkout that has verified has a current index.
 *
 * The owner's rulings used to live in five places that did not know about each other: agent memory
 * on one machine, dated asides in CLAUDE.md, phase-2-decisions.md, the amendment redlines and the
 * brand chapters themselves. Nothing said which rulings the brand framework had not caught up with,
 * and a ruling nobody could find was a ruling the next session broke. One file per ruling, checked
 * here, is the fix.
 *
 * Asserted per entry:
 *   - the frontmatter parses and carries every field, each from its vocabulary
 *   - every `supersedes` names a real entry, and that entry is marked `superseded`
 *   - every `superseded` entry is named by exactly one later `supersedes` — a ruling cannot lapse
 *     silently, and two rulings cannot both claim to have replaced it
 *   - `dbf` names chapters that exist, and `dbf_status` agrees with whether `dbf` is empty
 *   - the body carries the three paragraphs the template asks for
 *
 * An open brand-framework backlog is a WARNING, never a failure. Rulings queue as `pending` and
 * /dbf-update applies a chapter's backlog in one versioned edit (owner, 19 Oct 2026); failing the
 * build on a pending ruling would force the per-PR chapter churn that batching exists to avoid.
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import yaml from 'js-yaml';

const DIR = 'docs/decisions';
const INDEX = `${DIR}/INDEX.md`;
const check = process.argv.includes('--check');

/* The vocabularies. An area is a reader's way in ("I am about to touch cards"), so the list is
   short on purpose: a twentieth area nobody browses by is a place a ruling goes to be lost. */
const AREAS = {
  process: 'How work is run, reviewed and shipped',
  layout: 'Arrangement, the primitives, page composition',
  spacing: 'The gap scale and section air',
  type: 'Roles, sizes, families, case',
  colour: 'Surfaces, grounds, accents',
  imagery: 'Photographs, captures, media delivery',
  illustration: 'Illustrations, sketches, drawn visuals',
  iconography: 'Glyphs and marks',
  motion: 'Hover, transition, animation',
  cards: 'Card sets and their variants',
  forms: 'Fields, choices, validation',
  proof: 'Logos, cases, testimonials, ratings',
  content: 'Copy, narrative, IA, the CMS seam',
  components: 'Contracts of a named component or pattern',
};
const STATUS = ['active', 'superseded'];
const DBF_STATUS = ['pending', 'applied', 'none'];
const CHAPTERS = {
  '00': '00 Cover and Contents',
  '02': '02 Colour',
  '03': '03 Typography',
  '04': '04 Iconography',
  '05': '05 Imagery',
  10: '10 Social media',
};
const REQUIRED = [
  'title',
  'date',
  'status',
  'area',
  'source',
  'supersedes',
  'dbf',
  'dbf_status',
  'enforced_by',
];
const BODY = ['**Why.**', '**The mistake it prevents.**', '**How to apply.**'];

const problems = [];
const warnings = [];

const files = readdirSync(DIR)
  .filter((f) => f.endsWith('.md') && f !== 'README.md' && f !== 'INDEX.md' && !f.startsWith('_'))
  .sort();

const entries = [];
for (const file of files) {
  const id = file.slice(0, -3);
  const say = (msg) => problems.push(`${DIR}/${file}  ${msg}`);
  if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9]+(-[a-z0-9]+)*$/.test(id))
    say('filename is not YYYY-MM-DD-kebab-slug.md');

  /* A Windows checkout with core.autocrlf turns every entry into CRLF; read both. */
  const text = readFileSync(`${DIR}/${file}`, 'utf8').replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) {
    say('no frontmatter');
    continue;
  }
  let fm;
  try {
    fm = yaml.load(m[1], { schema: yaml.JSON_SCHEMA });
  } catch (e) {
    say(`frontmatter does not parse: ${e.reason}`);
    continue;
  }
  const body = m[2];

  for (const k of REQUIRED) if (fm[k] === undefined || fm[k] === null) say(`missing \`${k}\``);
  /* JSON_SCHEMA keeps the date a string, so a typo cannot quietly become a Date in another year. */
  if (fm.date && String(fm.date) !== id.slice(0, 10))
    say(`date ${fm.date} disagrees with the filename`);
  if (fm.status && !STATUS.includes(fm.status))
    say(`status \`${fm.status}\` is not ${STATUS.join(' | ')}`);
  const area = Array.isArray(fm.area) ? fm.area : [fm.area];
  for (const a of area)
    if (!(a in AREAS)) say(`area \`${a}\` is not one of ${Object.keys(AREAS).join(', ')}`);
  for (const k of ['supersedes', 'dbf'])
    if (fm[k] && !Array.isArray(fm[k])) say(`\`${k}\` must be a list`);
  if (fm.dbf_status && !DBF_STATUS.includes(fm.dbf_status))
    say(`dbf_status \`${fm.dbf_status}\` is not ${DBF_STATUS.join(' | ')}`);

  const dbf = Array.isArray(fm.dbf) ? fm.dbf : [];
  for (const ref of dbf) {
    const c = String(ref).match(/^ch(\d{2})\b/);
    if (!c || !(c[1] in CHAPTERS))
      say(
        `dbf \`${ref}\` does not start with a chapter that exists (ch${Object.keys(CHAPTERS).join(', ch')})`,
      );
  }
  if (dbf.length && fm.dbf_status === 'none')
    say('names `dbf` sections but says dbf_status: none');
  if (!dbf.length && fm.dbf_status && fm.dbf_status !== 'none')
    say(`dbf_status \`${fm.dbf_status}\` with no \`dbf\` sections`);

  for (const h of BODY) if (!body.includes(h)) say(`body is missing ${h}`);
  if (/^#\s/m.test(body)) say('body carries a heading — the title is the frontmatter `title`');

  entries.push({
    id,
    file,
    ...fm,
    area,
    dbf,
    supersedes: Array.isArray(fm.supersedes) ? fm.supersedes : [],
  });
}

const byId = new Map(entries.map((e) => [e.id, e]));
const replacedBy = new Map();
for (const e of entries) {
  for (const old of e.supersedes) {
    const target = byId.get(old);
    if (!target) {
      problems.push(`${DIR}/${e.file}  supersedes \`${old}\`, which is not an entry`);
      continue;
    }
    if (target.status !== 'superseded')
      problems.push(
        `${DIR}/${target.file}  is superseded by ${e.id} but still says status: ${target.status}`,
      );
    if (target.id >= e.id)
      problems.push(`${DIR}/${e.file}  supersedes \`${old}\`, which is not older`);
    if (replacedBy.has(old))
      problems.push(
        `${DIR}/${target.file}  is superseded twice (${replacedBy.get(old)}, ${e.id})`,
      );
    replacedBy.set(old, e.id);
  }
}
for (const e of entries) {
  if (e.status === 'superseded' && !replacedBy.has(e.id)) {
    problems.push(`${DIR}/${e.file}  says superseded, but no entry lists it in \`supersedes\``);
  }
}

/* ── The generated index ─────────────────────────────────────────────────────────────────────── */

const link = (e) => `[${e.title}](${e.file})`;
const active = entries.filter((e) => e.status === 'active');
const lines = [
  '# Decision log index',
  '',
  'Generated by `npm run decisions` (and by `npm run verify`). Git-ignored: never edit it, never commit it. How the log works is in [README.md](README.md).',
  '',
];
lines.push(
  `${active.length} active rulings, ${entries.length - active.length} superseded. Newest first within each area; a ruling in several areas is listed under each.`,
  '',
);

const backlog = active.filter((e) => e.dbf_status === 'pending');
lines.push('## Brand framework backlog', '');
if (!backlog.length) {
  lines.push('Nothing pending. Every chapter says what the log says.', '');
} else {
  for (const [num, name] of Object.entries(CHAPTERS)) {
    const due = backlog.filter((e) => e.dbf.some((r) => String(r).startsWith(`ch${num}`)));
    if (!due.length) continue;
    lines.push(`**${name}** — \`/dbf-update ${num}\``, '');
    for (const e of due) {
      const where = e.dbf.filter((r) => String(r).startsWith(`ch${num}`)).join(', ');
      lines.push(`- ${where} · ${link(e)} (${e.date})`);
    }
    lines.push('');
    warnings.push(`${name}: ${due.length} ruling(s) not yet in the chapter`);
  }
}

lines.push('## By area', '');
for (const [area, blurb] of Object.entries(AREAS)) {
  const inArea = active
    .filter((e) => e.area.includes(area))
    .sort((a, b) => b.id.localeCompare(a.id));
  if (!inArea.length) continue;
  lines.push(`### ${area[0].toUpperCase()}${area.slice(1)}`, '', `*${blurb}.*`, '');
  for (const e of inArea)
    lines.push(
      `- ${e.date} · ${link(e)}${e.enforced_by && e.enforced_by !== 'review' ? ` · enforced by \`${e.enforced_by}\`` : ''}`,
    );
  lines.push('');
}

const superseded = entries
  .filter((e) => e.status === 'superseded')
  .sort((a, b) => b.id.localeCompare(a.id));
if (superseded.length) {
  lines.push(
    '## Superseded',
    '',
    'Kept so a reversal and its reason stay readable. Never apply one of these.',
    '',
  );
  for (const e of superseded)
    lines.push(
      `- ${e.date} · ~~${e.title}~~ (${e.file}) → ${link(byId.get(replacedBy.get(e.id)))}`,
    );
  lines.push('');
}

if (!check && !problems.length) writeFileSync(INDEX, lines.join('\n').trimEnd() + '\n');

for (const w of warnings) console.warn(`decisions — backlog: ${w}`);
if (problems.length) {
  console.error(`decisions — ${problems.length} problem(s):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(
  `decisions — ${entries.length} entries valid${check ? '' : `, ${INDEX} written`}.`,
);
