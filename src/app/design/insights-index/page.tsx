import type { Metadata } from 'next';

import { getInsightsFixturePage, type InsightsPage } from '@/content';
import { ROUTES } from '@/lib/routes';
import { InsightsIndex } from '@/templates';

import { insightsIndexProps } from '../../_insights/hub';

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
 * InsightsIndex over the stress fixture (src/content/sources/fixtures/insights.ts): all seven
 * formats, more items than any band shows, the longest titles and an unbroken one, missing covers
 * and descriptions, an event without a date. The same mapping as the live /insights
 * (src/app/_insights/hub.ts), pointed at this path, so every filter, "All …" and "Show more" link
 * works here as it does there.
 *
 *   ?state=sparse   the live CMS's shape
 *   ?state=empty    nothing published
 *
 * A template's specimen is the page itself rather than Specimen blocks: what is judged is the
 * composition down its length, which a row of crops cannot show.
 */
export default async function InsightsIndexSpecimen({ searchParams }: Props) {
  const [fixture, query] = await Promise.all([getInsightsFixturePage(), searchParams]);
  const state = Array.isArray(query.state) ? query.state[0] : query.state;
  const page =
    state === 'sparse' ? sparse(fixture) : state === 'empty' ? empty(fixture) : fixture;
  const path = state === 'sparse' || state === 'empty' ? `${PATH}?state=${state}` : PATH;

  return <InsightsIndex {...insightsIndexProps(page, query, path)} />;
}
