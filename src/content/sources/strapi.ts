import type { ContentSource } from '../types';

/**
 * The Strapi source — a stub. It exists so the seam is visible and so wiring the CMS is an
 * exercise in filling in one file rather than in discovering where the boundary should have
 * been.
 *
 * When this is implemented it is the ONLY place that knows about Strapi: the GraphQL client,
 * the queries, the response shapes, and the mapping from those shapes onto @/content/types.
 * Nothing above it learns that Strapi exists.
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
