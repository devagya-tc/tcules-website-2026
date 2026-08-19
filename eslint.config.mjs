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
 * `content/` sits outside the tiers: it is the CMS seam, imported by pages and templates
 * only. A component or pattern that imports it has bound a presentation unit to a data
 * source, which is the coupling this repo exists to avoid.
 */
const UPWARD = {
  components: ['@/patterns', '@/patterns/*', '@/templates', '@/templates/*', '@/content', '@/content/*'],
  patterns: ['@/templates', '@/templates/*', '@/content', '@/content/*'],
  templates: ['@/content', '@/content/*'],
  leaf: [
    '@/components',
    '@/components/*',
    '@/patterns',
    '@/patterns/*',
    '@/templates',
    '@/templates/*',
    '@/content',
    '@/content/*',
  ],
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
    'Tier violation: a primitive may not import a pattern, template or content. Primitives know nothing above them — build what you need inside the primitive, or compose it one tier up.',
  ),
  tier(
    ['src/patterns/**'],
    UPWARD.patterns,
    'Tier violation: a pattern may not import a template or content. Patterns are route-blind and data-blind — take what you need as props.',
  ),
  tier(
    ['src/templates/**'],
    UPWARD.templates,
    'Tier violation: a template may not import content. The page reads content and passes it in as props.',
  ),
  tier(
    ['src/lib/**', 'src/styles/**'],
    UPWARD.leaf,
    'Tier violation: lib and styles are leaves. Nothing in them may import a component, pattern, template or content.',
  ),

  prettier,

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
