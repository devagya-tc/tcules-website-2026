/**
 * The `_pages/` corpus view models live in `@/lib/corpus-types` so a TEMPLATE can type against them
 * (a template may not import `@/content`, the same move `service-story.ts` made). This file is the
 * content seam's own door to them: `@/content` re-exports from here, so callers are unchanged.
 */
export type * from '../lib/corpus-types.ts';
