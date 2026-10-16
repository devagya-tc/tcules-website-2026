import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getInsightsPage, type InsightResourceKind } from '@/content';
import { ROUTES } from '@/lib/routes';
import { InsightsFormat } from '@/templates';

import { FORMAT_ROUTE, insightsFormatProps } from './hub';

const INSIGHTS_SLUG = ROUTES.insights.slice(1);

type FormatPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * One format's page (/insights/articles …), the same composition for every format: each route file
 * is two lines naming its format. A format with nothing published is not a page.
 */
export function formatRoute(kind: InsightResourceKind) {
  async function generateMetadata(): Promise<Metadata> {
    const page = await getInsightsPage(INSIGHTS_SLUG);
    const has = page?.resources.items.some((item) => item.kind === kind);
    if (!page || !has) {
      return { title: 'Not found | Tcules', robots: { index: false, follow: false } };
    }
    const props = insightsFormatProps(page, kind, {});
    const title = `${props.hero.title} | Tcules Insights`;
    const description = props.hero.lede;
    const image = page.resources.items.find(
      (item) => item.kind === kind && item.image && !item.image.standIn,
    )?.image;
    return {
      title,
      description,
      alternates: { canonical: FORMAT_ROUTE[kind] },
      openGraph: {
        title,
        description,
        type: 'website',
        url: FORMAT_ROUTE[kind],
        images: image ? [{ url: image.src, alt: image.alt }] : [],
      },
    };
  }

  async function FormatPage({ searchParams }: FormatPageProps) {
    const [page, query] = await Promise.all([getInsightsPage(INSIGHTS_SLUG), searchParams]);
    if (!page || !page.resources.items.some((item) => item.kind === kind)) notFound();
    return <InsightsFormat {...insightsFormatProps(page, kind, query)} />;
  }

  return { generateMetadata, FormatPage };
}
