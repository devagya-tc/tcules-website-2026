#!/usr/bin/env node
/**
 * Assemble the component-spec brief that gets pasted into Claude Design — with the design
 * system's vocabulary READ OUT OF THE REPO rather than transcribed by hand.
 *
 * Why this script exists, and why the vocabulary is not simply typed into the prompt file:
 *
 * Claude Design cannot see this repo. Its only knowledge of the system is what the prompt
 * carries, so the prompt has to carry every token name the designer is allowed to write. A
 * hand-maintained list of those names is stale the day after it is written, and the failure is
 * silent in the worst possible way: a designer who cannot see a token name INVENTS one, and an
 * invented name that happens to exist renders perfectly and is wrong forever. `tokens:check`
 * catches a var() that resolves to nothing; nothing catches --color-neutral-800 where 700 was
 * meant.
 *
 * This is not hypothetical. The glyph set was drawn stroke-only with an --icon-stroke token,
 * then rebuilt as solid shapes with the token deleted — and a hand-written vocabulary block
 * described the old idiom for exactly as long as nobody re-read it. A glyph drawn to that
 * description renders NOTHING under `stroke: none`.
 *
 * So: the prose lives in docs/prompts/component-spec-brief.md, the names live in the token
 * layer, and this script is the seam. Run `npm run design:brief` and paste what it prints.
 *
 *   node scripts/design-brief.mjs            print the assembled brief
 *   node scripts/design-brief.mjs --check     assert every token named in docs/ resolves
 *
 * --check is in `npm run verify` so a renamed token cannot quietly falsify the docs.
 */
import { readFileSync, globSync, existsSync } from 'node:fs';

const PROMPT = 'docs/prompts/component-spec-brief.md';
/* Line-anchored, because the prose file legitimately TALKS about the marker in its own header
   note. A plain string marker substitutes the first occurrence, which spliced 136 lines of
   vocabulary into the middle of that note and left the real marker sitting in the output. */
const MARKER = /^<!-- VOCABULARY -->[ \t]*$/m;
const PRIMITIVES = 'src/styles/tokens/primitives.css';
const GLYPHS = 'src/components/Icon/glyphs.ts';
const SECTION_TOKENS = 'src/styles/tokens/components/section.css';
const SURFACES = ['paper', 'tint', 'ink', 'blue'];

const read = (f) => readFileSync(f, 'utf8');
const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

/* Declarations inside a breakpoint are the SAME role re-declared at another size — the ladder,
   not a new name. Dropping the at-rule blocks leaves one base value per token, which is what a
   spec quotes. The token layer writes these as `@media (...){:root{ ... }}` with no nesting
   below that, so a non-greedy match to the double close is exact rather than approximate. */
const dropAtRules = (css) => css.replace(/@media[^{]*\{\s*:root\s*\{[\s\S]*?\}\s*\}/g, '');

/** Every custom property declared at the base level, name → raw value. */
function declarations(css) {
  const map = new Map();
  for (const m of dropAtRules(strip(css)).matchAll(/(--[\w-]+)\s*:\s*([^;}]+)/g)) {
    map.set(m[1], m[2].trim());
  }
  return map;
}

const tokens = declarations(read(PRIMITIVES));

/** Follow a var() chain down to the literal it ends at. */
function resolve(value, depth = 0) {
  if (value == null || depth > 12) return value;
  const hit = value.match(/^var\(\s*(--[\w-]+)\s*\)$/);
  if (hit) return resolve(tokens.get(hit[1]), depth + 1);
  return value.replace(/var\(\s*(--[\w-]+)\s*\)/g, (_, n) => resolve(tokens.get(n), depth + 1) ?? '?');
}

const value = (name) => resolve(tokens.get(name)) ?? '(undeclared)';
const namesMatching = (re) => [...tokens.keys()].filter((n) => re.test(n));

/* ── The pieces ──────────────────────────────────────────────────────────────── */

function colourRamps() {
  const families = new Map();
  for (const name of namesMatching(/^--color-/)) {
    const family = name.replace(/-(\d+)$/, '');
    if (!families.has(family)) families.set(family, []);
    families.get(family).push(name);
  }
  const lines = [];
  for (const [family, members] of families) {
    if (members.length === 1) continue; // singletons are listed together below
    const steps = members
      .sort((a, b) => Number(a.match(/(\d+)$/)[1]) - Number(b.match(/(\d+)$/)[1]))
      .map((n) => `${n.match(/(\d+)$/)[1]} ${value(n)}`);
    lines.push(`- \`${family}-{${members.map((n) => n.match(/(\d+)$/)[1]).join(',')}}\` — ${steps.join(' · ')}`);
  }
  const singles = [...families].filter(([, m]) => m.length === 1).map(([, m]) => m[0]);
  if (singles.length) {
    lines.push(`- ${singles.map((n) => `\`${n}\` ${value(n)}`).join(' · ')}`);
  }
  return lines.join('\n');
}

function surfaceGrounds() {
  if (!existsSync(SECTION_TOKENS)) return SURFACES.map((s) => `| \`${s}\` | ? |`).join('\n');
  const css = strip(read(SECTION_TOKENS));
  const rows = [];
  for (const surface of SURFACES) {
    /* Each surface's block is `[data-surface='x']{ … }` — paper additionally rides on :root. */
    const block = css.match(
      new RegExp(`\\[data-surface=['"]${surface}['"]\\][^{]*\\{([^}]*)\\}`),
    );
    const ground = block?.[1].match(/--sec-ground\s*:\s*([^;]+)/)?.[1].trim();
    const raw = ground?.match(/var\(\s*(--[\w-]+)\s*\)/)?.[1];
    rows.push(`| \`${surface}\` | ${raw ? `\`${raw}\` ${value(raw)}` : ground ?? '?'} |`);
  }
  return rows.join('\n');
}

function gapScale() {
  const order = [
    ['--gap-inline', 'inside a key and its value'],
    ['--gap-tight', 'icon to label, chip padding, a stat and its unit'],
    ['--gap-text', 'paragraph to paragraph, cell padding on a dense table'],
    ['--gap-block', 'head to body inside a block — the most used step'],
    ['--gap-gutter', 'container gutter, and the gap between cards in a set'],
    ['--gap-stack', 'block to block inside a section'],
    ['--gap-column', 'column gutter where two halves must read as separate'],
    ['--gap-section', 'section padding, tight'],
    ['--gap-section-open', 'section padding, open'],
  ];
  const declared = new Set(namesMatching(/^--gap-/));
  const rows = order
    .filter(([n]) => declared.has(n))
    .map(([n, job]) => `| \`${n}\` | ${value(n)} | ${job} |`);
  /* A tenth step would be a system change, and the brief must not go on claiming there are nine. */
  const extra = [...declared].filter((n) => !order.some(([o]) => o === n));
  if (extra.length) rows.push(`| ${extra.map((n) => `\`${n}\` ${value(n)}`).join(' · ')} | | **NEW — the brief says nine; update it** |`);
  return { rows: rows.join('\n'), count: declared.size };
}

function textRoles() {
  const roles = namesMatching(/^--text-/).filter((n) => !n.endsWith('-tracking'));
  const withTracking = roles.filter((n) => tokens.has(`${n}-tracking`));
  const without = roles.filter((n) => !tokens.has(`${n}-tracking`));
  const rows = roles.map((n) => {
    const raw = tokens.get(n) ?? '';
    const size = resolve(raw.match(/var\(\s*(--font-size-[\w-]+)\s*\)/)?.[1] ? `var(${raw.match(/var\(\s*(--font-size-[\w-]+)\s*\)/)[1]})` : '') || '?';
    const family = raw.match(/var\(\s*--font-family-(\w+)\s*\)/)?.[1] ?? '?';
    const weight = raw.match(/var\(\s*--font-weight-(\w+)\s*\)/)?.[1] ?? '?';
    /* Size and ratio are ONE typographic decision here and are laddered together per role, so the
       brief prints them together — a designer given only the size will invent the ratio. */
    const lh = resolve(raw.match(/var\(\s*(--line-height-[\w-]+)\s*\)/)?.[1] ? `var(${raw.match(/var\(\s*(--line-height-[\w-]+)\s*\)/)[1]})` : '') || '?';
    return `| \`${n}\` | ${size} | ${lh} | ${family} | ${weight} | ${tokens.has(`${n}-tracking`) ? `\`${n}-tracking\`` : '**none**' } |`;
  });
  return { rows: rows.join('\n'), count: roles.length, withTracking, without };
}

function glyphSet() {
  if (!existsSync(GLYPHS)) return { names: [], list: '(glyphs.ts not found)' };
  /* Keys are quoted only when they have to be — `close-circle` needs quotes, `download` does not.
     A regex that assumes quotes silently reports a SHORT set, which is the dangerous direction:
     the designer then requests a glyph that already exists, or worse, is told one exists that
     does not. Match both forms. */
  const names = [...strip(read(GLYPHS)).matchAll(/^ {2}'?([a-z][a-z0-9-]*)'?\s*:/gm)].map((m) => m[1]).sort();
  return { names, list: names.map((n) => `\`${n}\``).join(' · ') };
}

/**
 * Each existing component layer's :root GEOMETRY, with values.
 *
 * The vocabulary used to list the taken prefixes and not one value behind them, and the cost showed
 * up immediately: a designer specifying a control had to ask "is --btn-height-md 48?" as a BLOCKING
 * question — a full round trip for a number sitting in the repo. A new control is almost always
 * sized against an existing one, so these are the numbers a spec is measured against.
 */
function componentGeometry() {
  const out = [];
  for (const file of globSync('src/styles/tokens/components/*.css').sort()) {
    const css = strip(read(file));
    /* :root holds geometry; the [data-surface] blocks hold colour, which is per-surface and is the
       designer's job to specify rather than to look up. */
    const root = css.match(/:root\s*\{([\s\S]*?)\n\}/);
    if (!root) continue;
    const local = declarations(css);
    const sizes = [...root[1].matchAll(/(--[\w-]+)\s*:/g)]
      .map((m) => m[1])
      .map((n) => {
        let v = local.get(n) ?? '';
        for (let i = 0; i < 6 && /var\(/.test(v); i++) {
          v = v.replace(/var\(\s*(--[\w-]+)\s*\)/g, (_, x) => tokens.get(x) ?? local.get(x) ?? '?');
        }
        return [n, v.trim()];
      })
      /* Lengths only. A duration, an easing curve and a shadow are system-wide and already listed. */
      .filter(([, v]) => /^-?[\d.]+(px|rem|em|ch|%)$/.test(v));
    if (sizes.length) {
      out.push(`- **${file.split('/').pop()}** — ${sizes.map(([n, v]) => `\`${n}\` ${v}`).join(' · ')}`);
    }
  }
  return out.join('\n');
}

function takenPrefixes() {
  const rows = [];
  for (const file of globSync('src/styles/tokens/components/*.css').sort()) {
    const counts = new Map();
    for (const m of strip(read(file)).matchAll(/(--[a-z]+)-[\w-]+\s*:/g)) {
      counts.set(m[1], (counts.get(m[1]) ?? 0) + 1);
    }
    const own = [...counts].sort((a, b) => b[1] - a[1])[0]?.[0];
    if (own) rows.push({ prefix: `${own}-`, file: file.replace('src/styles/tokens/', '') });
  }
  return rows;
}

/**
 * The three layout primitives' prop APIs, READ OUT OF THE SOURCE.
 *
 * The rehearsal that shaped this script found one clean pattern in what a designer with no repo
 * access got wrong: the token names transcribed by hand stayed right, and the CODE facts went
 * stale. A spec asking for `columns={{ mobile, tablet, desktop }}` costs a round trip, because the
 * real keys are base/md/lg/xl. Tokens are stable; a prop union changes the week someone adds a
 * variant. So the prop unions are generated for the same reason the glyph list is.
 */
function primitiveProps() {
  const out = [];
  for (const name of ['Section', 'Layout', 'Cluster']) {
    const file = `src/components/${name}/${name}.tsx`;
    if (!existsSync(file)) continue;
    const src = strip(read(file)).replace(/\/\/[^\n]*/g, '');

    /* The props object: from `type XProps = {` to the line that closes it. One level of nesting,
       so a depth counter is exact rather than a guess. */
    const start = src.search(new RegExp(`type ${name}Props\\s*=\\s*\\{`));
    if (start === -1) continue;
    let depth = 0;
    let end = start;
    for (let i = src.indexOf('{', start); i < src.length; i++) {
      if (src[i] === '{') depth++;
      else if (src[i] === '}') {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    const body = src.slice(src.indexOf('{', start) + 1, end);
    const props = [...body.matchAll(/^\s*([a-zA-Z'"[\]-]+)(\??):\s*([^;]+);/gm)].map((m) => ({
      name: m[1],
      optional: m[2] === '?',
      type: m[3].replace(/\s+/g, ' ').trim(),
    }));

    /* Any local alias a prop names, flattened onto one line so the designer sees the members. */
    const aliases = [];
    for (const referenced of new Set(props.flatMap((pr) => pr.type.match(/[A-Z][A-Za-z]+/g) ?? []))) {
      const decl = src.match(new RegExp(`\\btype ${referenced}\\s*=\\s*([\\s\\S]*?);\\s*\\n`));
      if (!decl) continue;
      let body = decl[1].replace(/\s+/g, ' ').replace(/^\| /, '').trim();
      /* Expand one level of alias-inside-alias. Columns = ColumnSpec | 'fit' | 'tile' | {...} is
         useless to a designer who is never told that ColumnSpec is `number | number[]` — i.e.
         that columns={3} and columns={[2,1]} are the two commonest legal forms. */
      for (const nested of new Set(body.match(/[A-Z][A-Za-z]+/g) ?? [])) {
        const inner = src.match(new RegExp(`\\btype ${nested}\\s*=\\s*([\\s\\S]*?);\\s*\\n`));
        if (inner) body = body.replace(new RegExp(`\\b${nested}\\b`), `(${inner[1].replace(/\s+/g, ' ').trim()})`);
      }
      aliases.push(`\`${referenced}\` = ${body}`);
    }

    out.push(
      `**\`${name}\`** — ${props
        .filter((pr) => !['className', 'style', 'id'].includes(pr.name))
        .map((pr) => `\`${pr.name}${pr.optional ? '?' : ''}: ${pr.type}\``)
        .join(' · ')}` + (aliases.length ? `\n\n  where ${aliases.join(' · ')}` : ''),
    );
  }
  return out.join('\n\n');
}

function tierFolders(tier) {
  return globSync(`src/${tier}/*/`)
    .map((p) => p.replace(/\/$/, '').split('/').pop())
    .sort();
}

function simpleFamily(re, label) {
  const names = namesMatching(re);
  if (!names.length) return null;
  return `- **${label}:** ${names.map((n) => `\`${n}\` ${value(n)}`).join(' · ')}`;
}

/* ── Assembly ────────────────────────────────────────────────────────────────── */

function vocabulary() {
  const gaps = gapScale();
  const type = textRoles();
  const glyphs = glyphSet();
  const prefixes = takenPrefixes();
  const components = tierFolders('components');
  const patterns = tierFolders('patterns');
  const templates = tierFolders('templates');

  return `<!-- GENERATED by scripts/design-brief.mjs from the token layer. Do not edit by hand;
     re-run \`npm run design:brief\` instead. Everything below is true of the repo as it is
     right now, which is the only reason it can be trusted. -->

### The four surfaces

Every component is correct on all four without being told which one it is on. Surface is declared
with \`data-surface="paper | tint | ink | blue"\` on an ancestor; \`paper\` is the \`:root\` default and
needs no attribute.

| Surface | Ground |
|---|---|
${surfaceGrounds()}

### Colour ramps — ${namesMatching(/^--color-/).length} tokens

${colourRamps()}

The hex values are given **so you can measure contrast**, and for no other reason. Never write a
hex in the spec — write the token name.

### Distance — the gap scale (${gaps.count} steps). The ONLY answer to "how far apart".

| Token | Value | Where it lands |
|---|---|---|
${gaps.rows}

### The space ramp — NOT for layout

\`${namesMatching(/^--space-/).join('` · `')}\`

Reach it only for an **optical correction**, with the justification sentence the brief requires.

### Type — ${type.count} roles, consumed as composites

\`font: var(--text-h2)\` **plus** \`letter-spacing: var(--text-h2-tracking)\`. Never restate a size, a
weight, a ratio or a family — all four are inside the composite.

| Role | Size | Line height | Family | Weight | Tracking companion |
|---|---|---|---|---|---|
${type.rows}

**${type.withTracking.length} roles have a tracking companion. ${type.without.length} have none** — pairing one with a role in that
second group names a token that does not exist: ${type.without.map((n) => `\`${n}\``).join(', ')}.

${simpleFamily(/^--measure-/, 'Measure (line length)') ?? ''}
${simpleFamily(/^--radius-/, 'Radius') ?? ''}
${simpleFamily(/^--border-width-/, 'Border width') ?? ''}
${simpleFamily(/^--focus-ring-/, 'Focus ring') ?? ''}
${simpleFamily(/^--duration-|^--easing-/, 'Motion') ?? ''}
${simpleFamily(/^--shadow-/, 'Elevation') ?? ''}
${simpleFamily(/^--z-/, 'Z-index') ?? ''}
${simpleFamily(/^--icon-/, 'Icon') ?? ''}
${simpleFamily(/^--breakpoint-/, 'Breakpoints') ?? ''}
${simpleFamily(/^--font-family-/, 'Families') ?? ''}
${simpleFamily(/^--font-weight-/, 'Weights') ?? ''}

### The glyph set — exactly these ${glyphs.names.length}

${glyphs.list}

Glyphs are **solid shapes** on a 24 box, filled in \`currentColor\` with counters cut through the
mass (\`fill-rule: evenodd\`) so they show whatever is behind them. **No stroke** — there is no
stroke-width token, and a glyph described as two crossing lines renders nothing. A glyph not on
that list is a **NEW GLYPH REQUEST**, and it describes a FILLED drawing.

### Component token prefixes already taken

${prefixes.map((p) => `\`${p.prefix}\` (${p.file})`).join(' · ')}

Yours must not collide with any of those, nor with a primitive family above.

**Their geometry, so you can size against it rather than guessing.** A new control is measured
against the controls beside it — if you are specifying one, say which of these it must line up with.

${componentGeometry()}

### The three layout primitives — their real prop APIs

Layout is done by these three. Always. Anything you specify is arranged by one of them.

${primitiveProps()}

Read the unions above literally: a key that is not in them does not exist. \`rowGap\` and \`colGap\`
take **gap-scale role names**, and neither has a default — an axis nobody states renders 0, on
purpose. State \`colGap\` only where you also set \`columns\`; a single-track stack has no column
seam to size.

### What already exists — check these before specifying anything new

- **Primitives** (\`src/components/\`): ${components.map((c) => `\`${c}\``).join(' · ') || '—'}
- **Patterns** (\`src/patterns/\`): ${patterns.map((c) => `\`${c}\``).join(' · ') || '—'}
- **Templates** (\`src/templates/\`): ${templates.map((c) => `\`${c}\``).join(' · ') || '— none yet'}
`;
}

/**
 * The glyph set is enumerated THREE times outside glyphs.ts, and two of those copies are invisible
 * to every other check:
 *
 *   1. the generated brief          — read from glyphs.ts at run time, so it cannot drift
 *   2. .design-sync/config.json     — `dtsPropsFor.Icon` hand-pins the IconName union, because
 *                                     `keyof typeof glyphs` collapses to `unknown` in the extractor
 *   3. .design-sync/previews/Icon.tsx — a NAMES array the preview card maps over
 *
 * .design-sync/NOTES.md records that both 2 and 3 "go stale silently — nothing checks them". This is
 * that check. The cost of the drift is specific: the design library that Claude Design composes from
 * would not offer a glyph this repo has, or would offer one it does not, and a designer working from
 * the card would specify against the wrong set.
 */
function glyphDrift() {
  const truth = glyphSet().names;
  if (truth.length === 0) return [];
  const out = [];

  const compare = (where, found) => {
    const missing = truth.filter((n) => !found.includes(n));
    const extra = found.filter((n) => !truth.includes(n));
    if (missing.length) out.push(`${where}  is missing ${missing.length} glyph(s) that ${GLYPHS} defines: ${missing.join(', ')}`);
    if (extra.length) out.push(`${where}  names ${extra.length} glyph(s) that ${GLYPHS} does not define: ${extra.join(', ')}`);
  };

  const cfgPath = '.design-sync/config.json';
  if (existsSync(cfgPath)) {
    const cfg = JSON.parse(read(cfgPath));
    const pinned = cfg?.dtsPropsFor?.Icon ?? '';
    const union = pinned.match(/name:\s*([^;]+);/)?.[1] ?? '';
    if (union) compare(`${cfgPath}  dtsPropsFor.Icon`, [...union.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]));
  }

  const previewPath = '.design-sync/previews/Icon.tsx';
  if (existsSync(previewPath)) {
    const block = strip(read(previewPath)).match(/const NAMES\s*=\s*\[([\s\S]*?)\]/);
    if (block) compare(`${previewPath}  NAMES`, [...block[1].matchAll(/'([a-z0-9-]+)'/g)].map((m) => m[1]));
  }

  return out;
}

/* ── --check: every token the docs name must resolve ─────────────────────────── */

/**
 * docs/vocabulary.md must equal what --vocabulary prints right now.
 *
 * That file is the ONE copy of the token vocabulary Claude Design reads, as a guidelines document
 * in the project. Nothing checked it until this function existed, and it rotted twice: the footer
 * rebuild added --measure-lede — a whole new usage token — and four --foot-* values without
 * regenerating it, so for a while the vocabulary a designer worked from did not contain a name the
 * repo had. That is the exact failure the generated brief exists to prevent, arriving through the
 * one door nothing was watching.
 *
 * A byte comparison rather than a token-by-token one, deliberately: the whole point is that this
 * file is generated, so any difference at all means somebody edited it by hand or forgot to re-run
 * the generator, and both need the same fix. The script's own comment used to say briefs-build.mjs
 * wrote and byte-checked it; that script is not in the repo, which is how the drift went unnoticed.
 *
 * The fix is always `npm run vocabulary`, and then pushing the file to the Claude Design project —
 * that second half is still manual and no check can see it.
 */
function vocabularyDrift() {
  const path = 'docs/vocabulary.md';
  if (!existsSync(path)) return [`${path} is missing — run \`npm run vocabulary\``];
  const expected = `${VOCAB_HEADER}\n${vocabulary()}\n`;
  if (read(path) === expected) return [];
  return [
    `${path} is stale — it no longer matches the token layer. Run \`npm run vocabulary\`, ` +
      `then push the file to the Claude Design project as its guidelines document.`,
  ];
}

function check() {
  const docs = [
    ...globSync('docs/**/*.md'),
    ...globSync('*.md'),
    /* The command and the skill name tokens too, and an agent reads them before every build. */
    ...globSync('.claude/**/*.md'),
    /* .design-sync/conventions.md is the OTHER hand-written vocabulary in this repo — it goes to
       Claude Design as the guidelines header, and it lists the type roles and which of them carry a
       tracking companion. That is precisely the content that went stale on the glyph set, so it is
       checked here rather than trusted. It is accurate today; this is what keeps it so. */
    ...globSync('.design-sync/**/*.md'),
  ].sort();
  const known = new Set(tokens.keys());
  for (const f of globSync('src/styles/tokens/**/*.css')) {
    for (const n of declarations(read(f)).keys()) known.add(n);
  }
  /* A doc may legitimately name a token that does not exist yet — as a NEW TOKEN REQUEST, or as
     the {abbrev} placeholder pattern. Both are marked, so both are skippable by shape. */
  const placeholder = /^--(\{|abbrev|xxx|name|proposed|component)/;

  /**
   * Tokens a doc names in order to say they DO NOT EXIST. Same discipline as JS_INJECTED in
   * tokens-check.mjs: keep this list short, and every entry names the file and the argument it
   * serves — an unexplained entry here is how a real drift gets waved through.
   *
   * --color-bg-hover  CLAUDE.md and tokens/index.css both cite it as the shared hover token this
   *   system deliberately does NOT have, because what a colour means depends on its surface and a
   *   single shared answer would be wrong three times out of four. The absence is the argument, so
   *   the name has to be sayable.
   */
  const namedToBeDenied = new Set(['--color-bg-hover']);
  const problems = [];
  for (const file of docs) {
    const text = read(file);
    if (/GENERATED by scripts\/design-brief\.mjs/.test(text)) continue;
    const lines = text.split('\n');
    lines.forEach((line, i) => {
      if (/NEW TOKEN REQUEST|NEW GLYPH REQUEST|Name:\s*--/.test(line)) return;
      /* Require a name segment after the family. A doc legitimately writes a bare prefix when it
         is talking about the family — "no @media block mentions `--gap-` or `--text-`" is a
         testable Don't the brief asks for, and failing it pushes the writer to soften a real test,
         which is the wrong direction for a checker to push anyone. */
      for (const m of line.matchAll(/`(--[a-z][\w-]*[a-z0-9])`/g)) {
        const name = m[1];
        if (placeholder.test(name) || known.has(name) || namedToBeDenied.has(name)) continue;
        /* A `--{abbrev}-…` family written out for illustration, e.g. --crd-body-ink. Only flag a
           name whose prefix belongs to the token layer — those are checkable claims. */
        const prefix = name.match(/^--([a-z]+)-/)?.[1];
        const real = ['color', 'space', 'gap', 'text', 'font', 'line', 'letter', 'radius', 'border', 'focus', 'duration', 'easing', 'shadow', 'z', 'icon', 'breakpoint', 'measure'];
        if (!real.includes(prefix)) continue;
        problems.push(`${file}:${i + 1}  names ${name}, which the token layer does not declare`);
      }
    });
  }
  problems.push(...glyphDrift());
  problems.push(...vocabularyDrift());

  console.log(
    `design:brief --check — ${docs.length} docs, ${known.size} known tokens, ` +
      `${glyphSet().names.length} glyphs cross-checked against .design-sync`,
  );
  if (problems.length) {
    console.error(`\n${problems.length} problem(s):\n`);
    for (const p of problems) console.error(`  ${p}`);
    console.error(
      '\nA token or glyph name in a doc is a promise to a designer who cannot read the repo.',
    );
    process.exit(1);
  }
  console.log('every token named in the docs resolves in the token layer');
}

/**
 * Preamble for the standalone vocabulary document.
 *
 * It arrives in Claude Design as always-on guidelines, not as part of a message, so it has to say
 * what it is and what it is for without the surrounding brief to explain it.
 */
const VOCAB_HEADER = `# The Tcules token vocabulary

**Every colour, distance, type role, glyph and prop union this design system actually has.** It is
generated out of the repository's token layer, so a name here is a name that resolves in the browser.

Use it when you are **specifying a new component**: the hex values are exact and are given so you
can compute WCAG contrast ratios and state a measured number in the spec. You will not need it to
*compose* a mockup out of the Tcules component library — those components are already correct on
every surface.

**Never write a token name that is not in this document.** A plausible-but-wrong name — 800 where
you meant 700 — renders perfectly and is wrong forever, and no build check can catch it. When a
value genuinely does not exist, raise a NEW TOKEN REQUEST instead.
`;

/* ── Main ────────────────────────────────────────────────────────────────────── */

if (process.argv.includes('--check')) {
  check();
} else if (process.argv.includes('--vocabulary')) {
  /* The vocabulary block on its own, for delivery to Claude Design as a GUIDELINES document rather
     than inside a pasted brief. One copy in the project beats a copy inside every brief: the block
     is 81% of the canonical brief's length, so duplicating it per component was ~5,400 lines of the
     same ramp tables.

     This prints to stdout; `npm run vocabulary` is what writes docs/vocabulary.md, and --check
     byte-compares the committed file against this output (see vocabularyDrift). An earlier version
     of this comment credited scripts/briefs-build.mjs with both jobs. That script is not in the
     repo — which is how the file went stale twice without anything noticing. */
  process.stdout.write(`${VOCAB_HEADER}\n${vocabulary()}\n`);
} else {
  if (!existsSync(PROMPT)) {
    console.error(`FAIL  ${PROMPT} not found — that file holds the prose half of the brief.`);
    process.exit(1);
  }
  const prose = read(PROMPT);
  const marks = prose.split('\n').filter((l) => MARKER.test(l)).length;
  if (marks !== 1) {
    console.error(
      `FAIL  ${PROMPT} has ${marks} marker lines; it needs exactly one.\n` +
        '      A line reading only "<!-- VOCABULARY -->" is where the generated block goes.',
    );
    process.exit(1);
  }
  /* The file opens with an HTML comment addressed to whoever maintains it in the repo — "do not
     paste this directly", how to run the script. That note must not travel into Claude Design,
     where it reads as an instruction about the very message it arrives in. Strip one leading
     comment block; everything after it is the brief. */
  const body = prose.replace(/^\s*<!--[\s\S]*?-->\s*/, '');
  /* A function replacement, so a `$` in a token value cannot be read as a capture reference. */
  process.stdout.write(body.replace(MARKER, () => vocabulary()));
}
