#!/usr/bin/env node
/**
 * Assert that every custom property a stylesheet READS is actually DEFINED — either in the
 * token layer, or locally in the same file. Also flag raw hex colours outside the token layer.
 *
 * This exists because the token system's first rule ("if the value you need has no token, add
 * the token") has a silent failure mode: `var(--lay-gap-xl)` where the real token is
 * `--lay-gap-2xl` does not error — it computes to nothing. A collapsed gap or an unpainted
 * ground then looks like a layout bug and gets debugged as one. A plausible-but-wrong token
 * name is exactly the mistake a design tool suggesting names will make.
 */
import { readFileSync, globSync } from 'node:fs';

const TOKEN_GLOB = 'src/styles/tokens/**/*.css';
const CONSUMER_GLOBS = ['src/**/*.module.css', 'src/app/globals.css', 'src/styles/reset.css'];

/**
 * Custom properties set from JavaScript, via an inline style object, so no stylesheet declares
 * them. Keep this list SHORT and justified — it is a hole in the check, and every entry has to
 * name the file that writes it.
 *
 * --tmpl-{base,md,lg,xl}  written by columnsToVars() in src/components/Layout/Layout.tsx.
 *   Layout's column template cannot be a class: it takes an arbitrary count or fr ratio, so
 *   there is no finite set of classes to enumerate. Each is pinned to `initial` when unused so
 *   the var() fallback chain resolves to a single track rather than inheriting an ancestor's.
 */
const JS_INJECTED = new Set(['--tmpl-base', '--tmpl-md', '--tmpl-lg', '--tmpl-xl']);

const read = (f) => readFileSync(f, 'utf8');
const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const definedIn = (css) => new Set([...strip(css).matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
const usedIn = (css) => [...strip(css).matchAll(/var\(\s*(--[\w-]+)/g)].map((m) => m[1]);
const lineOf = (css, needle) => css.slice(0, css.indexOf(needle)).split('\n').length;

const tokenFiles = globSync(TOKEN_GLOB);
if (tokenFiles.length === 0) {
  console.error(`FAIL  no token files matched ${TOKEN_GLOB}`);
  process.exit(1);
}

const tokens = new Set();
for (const f of tokenFiles) for (const t of definedIn(read(f))) tokens.add(t);

const consumers = [...new Set(CONSUMER_GLOBS.flatMap((g) => globSync(g)))]
  .filter((f) => !f.includes('/tokens/'))
  .sort();

const problems = [];

for (const file of consumers) {
  const css = read(file);
  const local = definedIn(css);

  for (const v of new Set(usedIn(css))) {
    if (!tokens.has(v) && !local.has(v) && !JS_INJECTED.has(v)) {
      problems.push(`${file}:${lineOf(css, v)}  reads ${v}, which no token defines and this file does not declare`);
    }
  }

  for (const hex of new Set(strip(css).match(/#[0-9a-fA-F]{3,8}\b/g) ?? [])) {
    problems.push(`${file}:${lineOf(css, hex)}  writes the literal colour ${hex} — colour belongs to the token layer`);
  }
}

console.log(
  `tokens:check — ${tokens.size} tokens defined across ${tokenFiles.length} files, ` +
    `${consumers.length} consumer stylesheets checked`,
);

if (problems.length) {
  console.error(`\n${problems.length} problem${problems.length === 1 ? '' : 's'}:\n`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}

console.log('all custom properties resolve; no literal colours outside the token layer');
