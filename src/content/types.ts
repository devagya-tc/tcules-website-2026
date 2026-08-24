import type { SiteFooterProps, SiteNavProps } from '@/patterns';

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

/**
 * One block in a page's flow. The discriminant maps 1:1 onto a pattern in @/patterns.
 *
 * ── Long-form bodies are a BLOCK LIST, never one rich-text field ─────────────────────────────
 * Decided 24 Aug 2026. An article or case study alternates: rich text, then a figure, then rich
 * text, then a figure. A `prose` block carries an HTML string and renders through `Prose`; an
 * image is its own `figure` block and renders through the `Figure` pattern.
 *
 * **An image never arrives inside a rich-text body string.** That is a contract, not a
 * preference, and three things depend on it — none of which a body string can express:
 *
 *   · the quieter NOTE under the caption. Prose sets one colour for a whole <figcaption>, so a
 *     two-tone legend would need a micro-format the CMS has to emit correctly forever;
 *   · the hairline that ends a light screenshot on a light ground. Prose styles the caption and
 *     leaves the image alone;
 *   · width. Inside .prose an image fills the text measure, and whether a figure runs the text
 *     column or the full section is the template's decision, which a string cannot carry.
 *
 * Enforced where sanitisation already happens — in sources/*, see the note in sources/strapi.ts.
 * A body field that arrives carrying <img> or <figure> is a content-model violation, not
 * something a component should quietly absorb.
 */
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
 * The site chrome — the header's and footer's information architecture.
 *
 * Content, not configuration, and the distinction matters. Every label, promise, rail compartment
 * and footer group is an editorial decision, so it belongs behind the seam and arrives at the two
 * patterns as props. Put it in @/lib instead and it becomes code, which means a copy change is a
 * deploy rather than an edit — and lib is a leaf, so it could not even reference the pattern shapes
 * it has to satisfy.
 *
 * The two shapes come FROM the patterns, which is the direction this seam runs: a view model is
 * defined by what a component needs in order to render, not by what a source happens to store. When
 * this moves to a CMS collection, sources/strapi.ts maps that response into these and nothing above
 * it learns that Strapi exists.
 */
export type Navigation = {
  nav: SiteNavProps;
  footer: SiteFooterProps;
};

/**
 * The contract every source implements. Adding Strapi later means writing one more object
 * that satisfies this — no page changes, no pattern changes.
 */
export type ContentSource = {
  getPage(slug: string): Promise<Page | null>;
  listPages(): Promise<Pick<Page, 'slug' | 'title'>[]>;
  /**
   * The header and footer IA. One call rather than two, because the root layout needs both on
   * every render and a source that fetches them will want one request.
   */
  getNavigation(): Promise<Navigation>;
};
