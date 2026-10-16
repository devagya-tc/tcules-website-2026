import type { Metadata } from 'next';

import { getInsightsFixturePage, type InsightResourceKind, type InsightsPage } from '@/content';
import { ROUTES } from '@/lib/routes';
import { InsightsFormat, InsightsIndex } from '@/templates';

import { formatsWithContent, insightsFormatProps, insightsIndexProps } from '../../_insights/hub';

export const metadata: Metadata = {
  title: 'InsightsIndex · stress content | Design',
  robots: { index: false, follow: false },
};

const PATH = ROUTES.designInsightsIndex;

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * The live CMS's shape today, made from the fixture: articles, events and podcasts only (Strapi's
 * guides and videos aside), no collections, no close, and most covers missing — what the template
 * must still make a page of.
 */
function sparse(page: InsightsPage): InsightsPage {
  const keep = new Set(['article', 'event', 'podcast']);
  return {
    ...page,
    collections: undefined,
    closing: undefined,
    resources: {
      ...page.resources,
      items: page.resources.items
        .filter((item) => keep.has(item.kind))
        .map((item, index) => ({
          ...item,
          featured: undefined,
          image: item.kind === 'podcast' || index % 5 === 4 ? item.image : undefined,
        })),
    },
  };
}

/** No items at all: the hub before anything is published. */
function empty(page: InsightsPage): InsightsPage {
  return {
    ...page,
    collections: undefined,
    resources: { ...page.resources, items: [] },
  };
}

/**
 * InsightsIndex and InsightsFormat over the stress fixture (src/content/sources/fixtures/insights.ts):
 * all seven formats, more items than any section shows, the longest titles and an unbroken one,
 * missing covers and descriptions, an event without a date. The same mapping as the live /insights
 * and /insights/<format> (src/app/_insights/hub.ts).
 *
 *   ?view=topic           the hub's BY TOPIC view
 *   ?state=sparse         the live CMS's shape
 *   ?state=empty          nothing published
 *   ?format=article …     a format page (InsightsFormat); its picker and "Show more" stay here
 *
 * A template's specimen is the page itself rather than Specimen blocks: what is judged is the
 * composition down its length, which a row of crops cannot show.
 */
export default async function InsightsIndexSpecimen({ searchParams }: Props) {
  const [fixture, query] = await Promise.all([getInsightsFixturePage(), searchParams]);
  const state = Array.isArray(query.state) ? query.state[0] : query.state;
  const page =
    state === 'sparse' ? sparse(fixture) : state === 'empty' ? empty(fixture) : fixture;
  const format = (Array.isArray(query.format) ? query.format[0] : query.format) as
    | InsightResourceKind
    | undefined;

  if (format && formatsWithContent(page).includes(format)) {
    const pathFor = (kind: InsightResourceKind) =>
      `${PATH}?${new URLSearchParams({ ...(state ? { state } : {}), format: kind }).toString()}`;
    return <InsightsFormat {...insightsFormatProps(page, format, query, pathFor)} />;
  }

  return <InsightsIndex {...insightsIndexProps(page, query)} />;
}
