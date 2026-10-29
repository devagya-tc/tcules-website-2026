import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCorpusPage, getInsightsFixturePage, type InsightsPage } from '@/content';
import { ROUTES } from '@/lib/routes';
import { ListingIndex, type CaseView } from '@/templates';

import { caseIndexProps } from '../../_corpus/case-index';
import { insightsIndexProps } from '../../_insights/hub';

export const metadata: Metadata = {
  title: 'ListingIndex · both listings | Design',
  robots: { index: false, follow: false },
};

const PATH = ROUTES.designListingIndex;

type Query = Record<string, string | string[] | undefined>;

type Props = {
  searchParams: Promise<Query>;
};

const one = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

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
 * The case index thinned: one view, a featured case without its cover, every other case's cover
 * gone, and a group of one — the shapes a group falls back to when the corpus gives it less.
 */
function sparseCases(views: CaseView[]): CaseView[] {
  return views.slice(0, 1).map((view) => ({
    ...view,
    groups: view.groups.map((group, index) => ({
      ...group,
      items: group.items
        .slice(0, index === view.groups.length - 1 ? 1 : group.items.length)
        .map((item, at) => (at % 2 === 1 ? { ...item, cover: undefined } : item)),
    })),
  }));
}

/**
 * ListingIndex — the one listing page type (owner, 22 Oct 2026: /insights and /case-studies share
 * one structure) — over both datasets, through the same mappings as the live routes
 * (src/app/_insights/hub.tsx, src/app/_corpus/case-index.tsx), so the specimen and the pages cannot
 * drift.
 *
 *   (default)             the insights hub over the stress fixture (src/content/sources/fixtures/
 *                         insights.ts) with the 26 Oct copy's shelves, format table, FAQ and close:
 *                         the copy's pieces match no fixture record, so every shelf shows its
 *                         pictureless forms (the panel beside a cover, the typographic shelf)
 *   ?copy=none            the hub without the copy: the CMS's words and the BY TYPE view, all seven
 *                         formats, the longest titles, missing covers, an event without a date
 *   ?type=articles&topic=… the finder: its picks over the results (any of the live page's
 *                         parameters); ticks, chips and "Show more" stay here, the state kept
 *   ?state=sparse         the live CMS's shape
 *   ?state=empty          nothing published
 *   ?data=cases           the case-study index from the copy and the Strapi list: client wall, the
 *                         finder (Stage, Industry, Service) over the curated view — one featured lead,
 *                         its cards, the four stage shelves — the proof wall, the island close, the
 *                         FAQ after it; add `&stage=…`, `&industry=…`, `&service=…` for the results
 *   ?data=cases&state=sparse   covers missing, a group of one
 *   ?data=cases&state=empty    no cases
 *
 * A template's specimen is the page itself rather than Specimen blocks: what is judged is the
 * composition down its length, which a row of crops cannot show.
 */
export default async function ListingIndexSpecimen({ searchParams }: Props) {
  const query = await searchParams;
  const state = one(query.state);

  if (one(query.data) === 'cases') {
    /* The finder's links and form come back to the specimen, the dataset and state kept. */
    const casePath = `${PATH}?${new URLSearchParams({ data: 'cases', ...(state ? { state } : {}) }).toString()}`;
    const props = await caseIndexProps(
      query,
      (views) => (state === 'empty' ? [] : state === 'sparse' ? sparseCases(views) : views),
      casePath,
    );
    if (!props) notFound();
    return <ListingIndex {...props} />;
  }

  const fixture = await getInsightsFixturePage();
  const page =
    state === 'sparse' ? sparse(fixture) : state === 'empty' ? empty(fixture) : fixture;
  /* The finder's links and form come back to the specimen, the state kept. */
  const path = state ? `${PATH}?${new URLSearchParams({ state }).toString()}` : PATH;
  const copy = one(query.copy) === 'none' ? null : await getCorpusPage(ROUTES.insights);
  return <ListingIndex {...insightsIndexProps(page, query, path, copy)} />;
}
