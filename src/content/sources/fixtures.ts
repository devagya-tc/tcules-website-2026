import type { ContentSource, Page } from '../types';

/**
 * The active source. Local, synchronous data behind an async interface, so swapping in Strapi
 * changes nothing about how callers await it.
 *
 * Empty on purpose — fixtures get added as pages get built.
 */
const PAGES: Page[] = [];

export const fixtureSource: ContentSource = {
  async getPage(slug) {
    return PAGES.find((page) => page.slug === slug) ?? null;
  },
  async listPages() {
    return PAGES.map(({ slug, title }) => ({ slug, title }));
  },
};
