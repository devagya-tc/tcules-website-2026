/**
 * View models — the shapes a PAGE consumes, not the shapes a CMS returns.
 *
 * This distinction is the point of the whole seam. If pages type against Strapi's response
 * shape, then every Strapi remodel is a change to every page. Typing against a view model
 * means a remodel is absorbed inside sources/strapi.ts and nothing above it moves.
 *
 * These are deliberately minimal — the real shapes get defined as pages get built, driven by
 * what the patterns need as props rather than by what the CMS happens to store.
 */

/** A resolved page: whatever the route needs to render, already flattened and normalised. */
export type Page = {
  slug: string;
  title: string;
  /** Ordered blocks the page renders top to bottom. Typed properly once patterns exist. */
  blocks: PageBlock[];
  seo?: PageSeo;
};

export type PageBlock = {
  /** Discriminant — maps 1:1 onto a pattern in @/patterns. */
  type: string;
  [key: string]: unknown;
};

export type PageSeo = {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
};

/**
 * The contract every source implements. Adding Strapi later means writing one more object
 * that satisfies this — no page changes, no pattern changes.
 */
export type ContentSource = {
  getPage(slug: string): Promise<Page | null>;
  listPages(): Promise<Pick<Page, 'slug' | 'title'>[]>;
};
