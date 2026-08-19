import type { ContentSource, Page } from '../../types';

import { NAVIGATION } from './navigation';

/**
 * The active source. Local, synchronous data behind an async interface, so swapping in Strapi
 * changes nothing about how callers await it.
 *
 * A folder rather than a file because the navigation IA is several hundred lines of editorial
 * copy — every service's promise, every rail compartment, the whole footer directory — and it has
 * nothing to do with page lookup. Both still arrive through one `fixtureSource`, so `source.ts`
 * did not change.
 *
 * PAGES is empty on purpose; fixtures get added as pages get built.
 */
const PAGES: Page[] = [];

export const fixtureSource: ContentSource = {
  async getPage(slug) {
    return PAGES.find((page) => page.slug === slug) ?? null;
  },
  async listPages() {
    return PAGES.map(({ slug, title }) => ({ slug, title }));
  },
  async getNavigation() {
    return NAVIGATION;
  },
};
