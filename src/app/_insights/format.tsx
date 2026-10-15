import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCorpusPage, getInsightsPage, type InsightsPage } from '@/content';
import type { CorpusPage } from '@/lib/corpus-types';
import { corpusMetadata } from '@/lib/corpus-metadata';
import { inlineToText } from '@/lib/inline';
import { insightFormatPath, ROUTES, type InsightFormatKind } from '@/lib/routes';
import { InsightsFormatIndex, type InsightsFormatIndexProps } from '@/templates';

import { closingOf } from './hub';
import {
  FORMAT_NAME,
  archiveOf,
  formatLead,
  formatRow,
  formatTitle,
  standIns,
  toItem,
  type FormatHref,
  type Query,
} from './shared';

/**
 * One insights format's own page — /insights/articles and its siblings (listings redesign, 15 Oct
 * 2026). The route files are composition only; this module reads the CMS, the corpus and the URL and
 * maps them onto InsightsFormatIndex. `/design/insights-format-index` runs `formatIndexProps` over
 * the fixture, so the specimen and the routes cannot drift.
 *
 * A format with nothing published 404s, so only formats with content have a page.
 */

const INSIGHTS_SLUG = ROUTES.insights.slice(1);
/** The archive's anchor: one stable name, the fragment every filter link ends in. */
const ARCHIVE_ID = 'archive';

/** The live format row: "All" to the hub, each format to its page. */
export const liveFormatHref: FormatHref = (kind) =>
  kind === 'all' ? ROUTES.insights : insightFormatPath(kind);

/**
 * The page's props: the hero from the corpus page when one exists (its title and lede verbatim — the
 * narrative is fixed), else the CMS's format card; the latest (featured, else newest) for the
 * covered kinds; the archive of every item of the format; and the hub's close. Null when the format
 * holds nothing.
 */
export function formatIndexProps(
  page: InsightsPage,
  corpus: CorpusPage | null,
  kind: InsightFormatKind,
  query: Query,
  path: string,
  hrefOf: FormatHref,
): InsightsFormatIndexProps | null {
  const all = page.resources.items.filter((item) => item.kind === kind);
  if (all.length === 0) return null;
  /* Events read by when they happen, newest first — the record's date, never the publish date;
     an event with no date goes last. Every other format keeps the source's newest-first order. */
  const resources =
    kind === 'event'
      ? [...all].sort(
          (a, b) =>
            (b.event ? Date.parse(b.event.startsAt) : -Infinity) -
            (a.event ? Date.parse(a.event.startsAt) : -Infinity),
        )
      : all;

  const name = FORMAT_NAME[kind];
  const covered = kind === 'article' || kind === 'video' || kind === 'podcast';
  const latest = covered
    ? (resources.find((item) => item.featured) ??
      resources.find((item) => item.image?.src) ??
      resources[0])
    : undefined;
  const lede = corpus?.hero.lede.map(inlineToText).find((paragraph) => paragraph.trim());

  const archive = archiveOf(page, resources, query, path, {
    id: ARCHIVE_ID,
    heading: `All ${name.toLowerCase()}`,
    noun: name.toLowerCase(),
    exclude: latest?.documentId,
  });

  return {
    kind,
    standIns: standIns(),
    breadcrumbs: [
      { label: 'Home', href: ROUTES.home },
      { label: 'Insights', href: ROUTES.insights },
      { label: name, href: insightFormatPath(kind) },
    ],
    hero: {
      title: corpus?.hero.titleText || formatTitle(page, kind),
      lede: lede ?? formatLead(page, kind),
    },
    formatRow: formatRow(page, kind, hrefOf),
    /* The latest stands above the archive only while nothing is held (see `archiveOf`). */
    latest: latest && archive.above ? toItem(latest) : undefined,
    archive,
    closing: closingOf(page),
  };
}

export async function formatIndexMetadata(kind: InsightFormatKind): Promise<Metadata> {
  const corpus = await getCorpusPage(insightFormatPath(kind));
  if (corpus) return corpusMetadata(corpus);
  return { title: `${FORMAT_NAME[kind]} | Tcules` };
}

type RouteProps = {
  kind: InsightFormatKind;
  searchParams: Promise<Query>;
};

/** The route body every /insights/<format>/page.tsx renders. */
export async function FormatIndexRoute({ kind, searchParams }: RouteProps) {
  const [page, corpus, query] = await Promise.all([
    getInsightsPage(INSIGHTS_SLUG),
    getCorpusPage(insightFormatPath(kind)),
    searchParams,
  ]);
  if (!page) notFound();
  const props = formatIndexProps(page, corpus, kind, query, insightFormatPath(kind), liveFormatHref);
  if (!props) notFound();
  return <InsightsFormatIndex {...props} />;
}
