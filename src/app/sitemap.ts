import type { MetadataRoute } from 'next';

import { SITE_ORIGIN } from '@/lib/routes';

import { listSitemapGroups } from './_sitemap/pages';

/**
 * `/sitemap.xml`, generated from the same list the `/sitemap` page renders (`_sitemap/pages.ts`),
 * rebuilt from the CMS every five minutes so a page published in Strapi appears without a deploy.
 */
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await listSitemapGroups();
  return groups
    .flatMap((group) => group.entries)
    .map(({ path, lastModified }) => ({
      url: `${SITE_ORIGIN}${path === '/' ? '' : path}`,
      ...(lastModified ? { lastModified } : {}),
    }))
    .sort((a, b) => a.url.localeCompare(b.url));
}
