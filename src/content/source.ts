import { fixtureSource } from './sources/fixtures';
import { strapiSource } from './sources/strapi';
import type { AuditContentSource, ContentSource } from './types';

/**
 * THE SEAM.
 *
 * Pages import from here and from nowhere else in @/content/sources. The general page and chrome
 * collections remain on fixtures while the audit family is assigned to Strapi. Neither route nor
 * pattern code knows which source answered either reader.
 */
const source: ContentSource = fixtureSource;
const auditSource: AuditContentSource = strapiSource;

export const getPage = source.getPage.bind(source);
export const listPages = source.listPages.bind(source);
export const getNavigation = source.getNavigation.bind(source);
export const getAuditPage = auditSource.getAuditPage.bind(auditSource);

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
