import type { MetadataRoute } from 'next';

import { listSitePages, type SitePage, type SitePageFamily } from '@/content';
import {
  auditPath,
  blogPath,
  CASE_SLUG_REDIRECTS,
  caseStudyPath,
  eventPath,
  expertisePath,
  glossaryPath,
  podcastPath,
  ROUTES,
  servicePath,
  SITE_ORIGIN,
  toolPath,
  type RouteKey,
} from '@/lib/routes';

import { PASS_1_CASE_ROUTES } from './_corpus/case';
import { PASS_1_LONGFORM_ROUTES } from './_corpus/longform';
import { PASS_1_OFFER_ROUTES } from './_corpus/offer';
import { PASS_1_TOOL_ROUTES } from './_corpus/tool';

/**
 * `/sitemap.xml`, generated: every page the site answers, rebuilt from the CMS every five minutes so
 * a page published in Strapi appears without a deploy.
 *
 * Three sources, merged and deduplicated by URL:
 *   1. the fixed pages — the routes with a `page.tsx` of their own and no slug. Named here because a
 *      route in ROUTES may have no page yet (the nav names a route before it exists); a new fixed
 *      page joins this list in the same edit that creates it.
 *   2. the corpus pages that have switched over (`_corpus/*` PASS_1 lists), less any that redirect.
 *   3. every entry Strapi publishes in a routed collection (`listSitePages`).
 *
 * `/design/**` is the proving ground and is never listed.
 */
export const revalidate = 300;

const FIXED_PAGES: readonly RouteKey[] = [
  'home',
  'services',
  'howWeWork',
  'caseStudies',
  'insights',
  'futureInterfacesLab',
  'futureInterfacesLabJoin',
  'matterDesignSystem',
  'about',
  'careers',
  'contact',
  'privacy',
  'terms',
];

const PATH_OF: Record<SitePageFamily, (slug: string) => string> = {
  service: servicePath,
  audit: auditPath,
  expertise: expertisePath,
  glossary: glossaryPath,
  tool: toolPath,
  insight: blogPath,
  podcast: podcastPath,
  event: eventPath,
  caseStudy: caseStudyPath,
};

const REDIRECTED: ReadonlySet<string> = new Set(
  Object.keys(CASE_SLUG_REDIRECTS).map(caseStudyPath),
);

const CORPUS_PAGES: readonly string[] = [
  ...PASS_1_OFFER_ROUTES,
  ...PASS_1_LONGFORM_ROUTES,
  ...PASS_1_TOOL_ROUTES,
  ...PASS_1_CASE_ROUTES,
].filter((path) => !REDIRECTED.has(path));

async function cmsPages(): Promise<SitePage[]> {
  try {
    return await listSitePages();
  } catch (error) {
    // A Strapi outage must not take the sitemap down with it: the fixed and corpus pages still list,
    // and the next revalidation brings the CMS pages back.
    console.error('sitemap: Strapi pages unavailable', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();
  const add = (path: string, lastModified?: string) => {
    const url = `${SITE_ORIGIN}${path === '/' ? '' : path}`;
    if (!entries.has(url)) entries.set(url, { url, ...(lastModified ? { lastModified } : {}) });
  };

  FIXED_PAGES.forEach((key) => add(ROUTES[key]));
  // CMS before corpus, so a page both sources name keeps Strapi's last-modified date.
  for (const page of await cmsPages()) add(PATH_OF[page.family](page.slug), page.updatedAt);
  CORPUS_PAGES.forEach((path) => add(path));

  return [...entries.values()].sort((a, b) => a.url.localeCompare(b.url));
}
