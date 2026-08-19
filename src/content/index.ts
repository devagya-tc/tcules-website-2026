/**
 * THE SEAM'S FRONT DOOR.
 *
 * Pages and the root layout import `@/content` and nothing deeper. Everything reachable from here
 * is a view model or a reader; nothing here knows which source answered.
 *
 * `@/content/sources/*` is off limits to callers — that is the whole point of source.ts, which is
 * where the one assignment that switches fixtures for Strapi lives.
 */
export { getPage, listPages, getNavigation } from './source';
export type { Page, PageBlock, PageSeo, Navigation, ContentSource } from './types';
