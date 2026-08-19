import { fixtureSource } from './sources/fixtures';
import type { ContentSource } from './types';

/**
 * THE SEAM.
 *
 * Pages import from here and from nowhere else in @/content/sources. Switching the whole site
 * from fixtures to Strapi is the one assignment below — every page and every pattern is
 * unaffected, because none of them ever knew which source they were reading.
 */
const source: ContentSource = fixtureSource;

export const getPage = source.getPage.bind(source);
export const listPages = source.listPages.bind(source);

export type { Page, PageBlock, PageSeo, ContentSource } from './types';
