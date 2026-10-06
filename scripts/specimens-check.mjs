#!/usr/bin/env node
/**
 * Assert that the proving-ground index is honest.
 *
 * CLAUDE.md calls "nothing gets a page route before it has a design/ route" the highest-leverage
 * rule in the file, and the SPECIMENS list in src/app/design/page.tsx is registered BY HAND so it
 * stays honest about what is actually covered. Nothing enforced that, and forgetting it is silent:
 * the component works, the index just quietly stops describing the system. That is precisely how
 * the previous codebase ended up with 111 sections nobody could see.
 *
 * Three assertions:
 *   1. every folder in src/{components,patterns,templates} appears as a SPECIMENS `name`
 *   2. every SPECIMENS href resolves to a real src/app/design/<segment>/page.tsx
 *   3. every non-underscore directory under src/app/design is linked from SPECIMENS
 *
 * Matched on `name`, NOT on a kebab-cased href. Prose is deliberately registered against
 * /design/typography — there is no /design/prose route and there should not be one — so a check
 * that demanded /design/<folder> would fail on a decision the repo made on purpose. Underscore
 * directories are Next's own "not a route" convention and are how _specimen/ holds the harness.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const INDEX = 'src/app/design/page.tsx';
const TIERS = ['components', 'patterns', 'templates'];

const index = readFileSync(INDEX, 'utf8');
const names = new Set([...index.matchAll(/name:\s*'([^']+)'/g)].map((m) => m[1]));
const hrefs = [...new Set([...index.matchAll(/href:\s*'\/design\/([^']+)'/g)].map((m) => m[1]))];

const dirs = (p) =>
  existsSync(p)
    ? readdirSync(p, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
    : [];

const problems = [];

for (const tier of TIERS) {
  for (const folder of dirs(`src/${tier}`)) {
    if (!names.has(folder)) {
      problems.push(
        `src/${tier}/${folder}  has no SPECIMENS entry in ${INDEX} — a component nobody can see is a component nobody reviews`,
      );
    }
  }
}

for (const href of hrefs) {
  if (!existsSync(`src/app/design/${href}/page.tsx`)) {
    problems.push(`${INDEX}  links /design/${href}, which has no page.tsx`);
  }
}

/* `_private` and `(group)` are both Next's own "this is not a route segment" conventions —
   `_specimen/` holds the harness, and a route group would be a way of sharing a layout across
   specimens. Neither is a specimen, so neither needs a SPECIMENS entry. */
const notARouteSegment = (d) => d.startsWith('_') || d.startsWith('(');

for (const dir of dirs('src/app/design').filter((d) => !notARouteSegment(d))) {
  /* A directory may group nested specimens (`kit/<family>`): linked when any href is under it. */
  if (!hrefs.some((href) => href === dir || href.startsWith(`${dir}/`))) {
    problems.push(`src/app/design/${dir}  exists but nothing in SPECIMENS links to it`);
  }
}

const folderCount = TIERS.reduce((n, t) => n + dirs(`src/${t}`).length, 0);
console.log(
  `specimens:check — ${folderCount} tier folders, ${names.size} registered specimens, ${hrefs.length} routes linked`,
);

if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}

console.log('every tier folder is registered; every specimen route resolves; no orphan routes');
