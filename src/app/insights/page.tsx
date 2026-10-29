import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCorpusPage, getInsightsPage } from '@/content';
import { corpusMetadata } from '@/lib/corpus-metadata';
import { ROUTES } from '@/lib/routes';
import { ListingIndex } from '@/templates';

import { insightsIndexProps } from '../_insights/hub';

const INSIGHTS_SLUG = ROUTES.insights.slice(1);

type InsightsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata(): Promise<Metadata> {
  /* The 26 Oct 2026 copy's title, description and social card where it has them. */
  const copy = await getCorpusPage(ROUTES.insights);
  if (copy) return corpusMetadata(copy);
  const page = await getInsightsPage(INSIGHTS_SLUG);

  if (!page) {
    return {
      title: 'Insights not found | Tcules',
      robots: { index: false, follow: false },
    };
  }

  const title = page.seo?.title || page.hero.heading;
  const description = page.seo?.description || page.hero.description;
  const canonical = page.seo?.canonical;
  const image =
    page.resources.items.find((item) => item.image && !item.image.standIn)?.image ??
    page.formatCards.find((card) => card.image)?.image;

  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(page.seo?.robots ? { robots: page.seo.robots } : {}),
    openGraph: {
      title,
      description,
      type: 'website',
      ...(canonical ? { url: canonical } : {}),
      images: image ? [{ url: image.src, alt: image.alt }] : [],
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image.src] : [],
    },
  };
}

/**
 * The insights hub: the finder (ListingIndex), curated by the copy's problem shelves while nothing is
 * picked. The route reads the CMS (every piece), the copy (_pages/insights.md: the hub's words and
 * bands) and the URL (the picks); `insightsIndexProps` maps all three onto the template, and the
 * specimen at /design/listing-index runs the same mapping over the stress fixture.
 */
export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  const [page, copy, query] = await Promise.all([
    getInsightsPage(INSIGHTS_SLUG),
    getCorpusPage(ROUTES.insights),
    searchParams,
  ]);

  if (!page) notFound();

  return <ListingIndex {...insightsIndexProps(page, query, ROUTES.insights, copy)} />;
}
