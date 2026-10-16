import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCorpusPage, getInsightsFixturePage, type InsightsPage } from '@/content';
import { insightFormatPath, ROUTES } from '@/lib/routes';
import { InsightsFormatIndex } from '@/templates';

import { formatIndexProps } from '../../_insights/format';
import { heldQuery } from '../../_insights/shared';
import { kindOfState, sparse, specimenFormatHref } from '../../_insights/specimen';

export const metadata: Metadata = {
  title: 'InsightsFormatIndex · stress content | Design',
  robots: { index: false, follow: false },
};

const PATH = ROUTES.designInsightsFormatIndex;

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** The first topic option any article carries: what `filtered` and `empty` hold. */
function firstTopic(page: InsightsPage) {
  for (const group of page.resources.filters) {
    for (const option of group.options) {
      if (
        page.resources.items.some(
          (item) => item.kind === 'article' && item.filterIds.includes(option.id),
        )
      )
        return { group: group.id, option: option.id };
    }
  }
  return undefined;
}

/** The held topic matches nothing: every article loses it, so the archive's empty state shows. */
function withoutTopic(page: InsightsPage, option: string): InsightsPage {
  return {
    ...page,
    resources: {
      ...page.resources,
      items: page.resources.items.map((item) => ({
        ...item,
        filterIds: item.filterIds.filter((id) => id !== option),
      })),
    },
  };
}

/**
 * InsightsFormatIndex over the stress fixture (src/content/sources/fixtures/insights.ts): one
 * format's own page, with the hero from the corpus (`_pages/insights__<format>.md`) where it has one.
 * The same mapping as the live /insights/<format> routes (src/app/_insights/format.tsx), pointed at
 * this path, so every filter and "Show more" works here as it does there; the format row moves
 * between the states below and "All" goes to the hub's specimen.
 *
 *   ?state=articles (default)   cover tiles, the latest at full column, topic filters, two pages
 *   ?state=guides · videos · podcasts · events · research · interviews   each format's shape
 *   ?state=sparse               articles in the live CMS's shape, most covers missing
 *   ?state=filtered             articles with a topic held
 *   ?state=empty                a held topic that matches nothing
 */
export default async function InsightsFormatIndexSpecimen({ searchParams }: Props) {
  const [fixture, query] = await Promise.all([getInsightsFixturePage(), searchParams]);
  const state = (Array.isArray(query.state) ? query.state[0] : query.state) || 'articles';
  const kind = kindOfState(state) ?? 'article';

  let page = state === 'sparse' ? sparse(fixture) : fixture;
  let held = query;
  const topic = firstTopic(fixture);
  if ((state === 'filtered' || state === 'empty') && topic) {
    /* The held topic written through the archive's OWN URL encoding (`heldQuery`), so this state
       cannot drift from the live URL format again (critique 16 Oct 2026: it wrote the retired
       `filter-<id>` shape, which nothing read, and rendered exactly the default). The empty state
       encodes against the fixture that still offers the topic, then strips it from every article. */
    const articles = fixture.resources.items.filter((item) => item.kind === kind);
    held = { ...heldQuery(fixture, articles, [topic]), ...query };
    if (state === 'empty') page = withoutTopic(page, topic.option);
  }

  const corpus = await getCorpusPage(insightFormatPath(kind));
  const props = formatIndexProps(
    page,
    corpus,
    kind,
    held,
    `${PATH}?state=${state}`,
    specimenFormatHref(),
  );
  if (!props) notFound();

  return <InsightsFormatIndex {...props} />;
}
