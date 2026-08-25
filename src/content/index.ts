/**
 * THE SEAM'S FRONT DOOR.
 *
 * Pages and the root layout import `@/content` and nothing deeper. Everything reachable from here
 * is a view model or a reader; nothing here knows which source answered.
 *
 * `@/content/sources/*` is off limits to callers — source.ts owns the assignments that keep every
 * route independent of the source answering it.
 */
export { getPage, listPages, getNavigation, getAuditPage } from './source';
export type {
  Page,
  PageBlock,
  PageSeo,
  AuditPage,
  AuditSection,
  AuditBlock,
  AuditSeo,
  AuditAction,
  AuditCard,
  AuditLabelledItem,
  AuditContentColumn,
  Navigation,
  ContentSource,
  AuditContentSource,
} from './types';
