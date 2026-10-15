import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getInsightsPage } from '@/content';
import { ROUTES } from '@/lib/routes';
import { InsightsIndex } from '@/templates';

import { liveFormatHref } from '../_insights/format';
import { insightsIndexProps } from '../_insights/hub';

const INSIGHTS_SLUG = ROUTES.insights.slice(1);

export async function generateMetadata(): Promise<Metadata> {
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
    page.resources.items.find((item) => item.image)?.image ??
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
 * The insights hub: every format as a group beside its outline, each linking out to the format's own
 * page (InsightsIndex, docs/specs/InsightsIndex.md). `insightsIndexProps` maps the CMS onto the
 * template; the specimen at /design/insights-index runs the same mapping over the stress fixture.
 */
export default async function InsightsPage() {
  const page = await getInsightsPage(INSIGHTS_SLUG);

  if (!page) notFound();

  return <InsightsIndex {...insightsIndexProps(page, liveFormatHref)} />;
}
