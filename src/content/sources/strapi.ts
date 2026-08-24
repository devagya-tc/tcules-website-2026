import type { ContentSource } from '../types';

/**
 * The Strapi source — a stub. It exists so the seam is visible and so wiring the CMS is an
 * exercise in filling in one file rather than in discovering where the boundary should have
 * been.
 *
 * When this is implemented it is the ONLY place that knows about Strapi: the GraphQL client,
 * the queries, the response shapes, and the mapping from those shapes onto @/content/types.
 * Nothing above it learns that Strapi exists.
 *
 * ── Two obligations this file inherits, both load-bearing ────────────────────────────────────
 * 1. SANITISE every rich-text field before it becomes a `prose` block. `Prose` takes its `html`
 *    prop as already-trusted and says so; the guarantee is made here or nowhere.
 *
 * 2. REJECT embedded media in those fields. Long-form bodies are a block list — rich text, then
 *    a figure, then rich text — so an image is a `figure` block rendered by the `Figure` pattern
 *    and never an <img> or <figure> inside a body string. See the contract on `PageBlock` in
 *    ../types.ts for the three things that depend on it. When a body field arrives carrying
 *    either tag, that is a content-model violation: fail loudly in development rather than
 *    passing it through, because it renders as a figure with no note, no edge and no choice of
 *    width, and it will look like a second kind of figure on the same site.
 *
 * Neither obligation is coded yet, and deliberately so: there is no page pipeline to hang it on,
 * and a validator with no caller is worse than a stated contract. Both belong in the same edit
 * that first maps a body field.
 */
export const strapiSource: ContentSource = {
  async getPage() {
    throw new Error('strapiSource is not implemented yet — the active source is fixtureSource.');
  },
  async listPages() {
    throw new Error('strapiSource is not implemented yet — the active source is fixtureSource.');
  },
  async getNavigation() {
    throw new Error('strapiSource is not implemented yet — the active source is fixtureSource.');
  },
};
