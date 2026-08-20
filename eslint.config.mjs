import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

/**
 * TIER BOUNDARY — the one rule that keeps this repo from becoming the last one.
 *
 * Imports flow ONE WAY only:
 *
 *     app  →  templates  →  patterns  →  components  →  lib / styles
 *
 * Never upward, and never sideways within a tier. A primitive that reaches for a pattern
 * has stopped being a primitive; a pattern that knows about a template has stopped being
 * reusable. The previous codebase grew 111 bespoke section folders precisely because
 * nothing stopped a block from importing whatever was nearest.
 *
 * SIDEWAYS, within a tier, is forbidden too — and until now only CLAUDE.md said so, which meant
 * the rule was a matter of discipline exactly where it claimed not to be. A primitive that imports
 * another primitive has decided which sibling its caller gets; the caller can no longer swap it,
 * and the two are welded for every future use. The repo already answers this the right way and has
 * from the start: `Button` never imports `Icon`, it takes a glyph as a `ReactNode` prop (`icon`,
 * `iconLeft`), so the CALLER composes and the control only sizes what it is handed. Zero components
 * imported a sibling when this rule was added, so it costs nothing and locks in the idiom.
 *
 * The relative `../*` pattern closes the back door: `@/components/Icon` and `../Icon` are the same
 * import, and a rule that only names the alias is a rule about spelling. `./` is untouched, which
 * is what lets a tier barrel re-export its own folders.
 *
 * A consequence worth stating, because the error message would otherwise misdiagnose it: **a
 * component is ONE FLAT FOLDER.** Component.tsx, Component.module.css, index.ts. There is no
 * `parts/` subfolder shape in this repo, so nothing legitimately needs to import `../` from inside
 * a component — and if a component ever grows large enough to want one, that is the signal to ask
 * whether it is really two components, not to punch a hole in this rule.
 *
 * `content/` sits outside the tiers: it is the CMS seam, imported by pages only — templates
 * are barred from it by the rule below, exactly as components and patterns are. A presentation
 * unit that imports it has bound itself to a data source, which is the coupling this repo
 * exists to avoid; the page reads content and passes it down as props.
 */
const UPWARD = {
  components: [
    '@/patterns',
    '@/patterns/*',
    '@/templates',
    '@/templates/*',
    '@/content',
    '@/content/*',
    // Sideways. See SIDEWAYS below.
    '@/components',
    '@/components/*',
    '../*',
  ],
  patterns: [
    '@/templates',
    '@/templates/*',
    '@/content',
    '@/content/*',
    // Sideways.
    '@/patterns',
    '@/patterns/*',
    '../*',
  ],
  templates: ['@/content', '@/content/*', '@/templates', '@/templates/*', '../*'],
  leaf: [
    '@/components',
    '@/components/*',
    '@/patterns',
    '@/patterns/*',
    '@/templates',
    '@/templates/*',
    '@/content',
    '@/content/*',
    // A leaf reaching upward by relative path is the same violation spelled differently.
    '../*',
  ],
  // The seam's own rule. `content/` is imported through its front door or not at all: the whole
  // point of source.ts is that switching fixtures for Strapi is ONE assignment, and a page that
  // reaches past it to `@/content/sources/fixtures` re-binds itself to the source and quietly
  // makes that guarantee false. Pages are the only tier allowed to import content at all, so
  // they are the only tier that can break this — which is why it needs its own rule.
  app: ['@/content/sources', '@/content/sources/*'],
};

const tier = (files, patterns, message) => ({
  files,
  rules: {
    'no-restricted-imports': ['error', { patterns: [{ group: patterns, message }] }],
  },
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  tier(
    ['src/components/**'],
    UPWARD.components,
    'Tier violation: a primitive may not import a pattern, template, content — or another primitive. Nothing above it, nothing beside it. To compose a sibling, take it as a ReactNode prop and let the caller pass it, exactly as Button takes `icon` rather than importing Icon.',
  ),
  tier(
    ['src/patterns/**'],
    UPWARD.patterns,
    'Tier violation: a pattern may not import a template, content, or another pattern. Patterns are route-blind and data-blind — take what you need as props, and compose siblings one tier up.',
  ),
  tier(
    ['src/templates/**'],
    UPWARD.templates,
    'Tier violation: a template may not import content or another template. The page reads content and passes it in as props.',
  ),
  tier(
    ['src/lib/**', 'src/styles/**'],
    UPWARD.leaf,
    'Tier violation: lib and styles are leaves. Nothing in them may import a component, pattern, template or content.',
  ),
  tier(
    ['src/app/**'],
    UPWARD.app,
    'Seam violation: import from `@/content`, never from `@/content/sources/*`. The one assignment in source.ts is what makes swapping fixtures for Strapi a one-line change; reaching past it binds this page to a source.',
  ),

  prettier,

  /* Vendored and generated code is not ours to lint. `ds-bundle/_vendor/**` is a checked-in React
     build whose internals trip react-hooks/rules-of-hooks 14 times — a linter reading a bundler's
     output is measuring the wrong thing, and it was the only thing making `npm run verify` red. */
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'ds-bundle/_vendor/**',
  ]),
]);

export default eslintConfig;
