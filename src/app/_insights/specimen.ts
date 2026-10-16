import type { InsightsPage } from '@/content';
import { ROUTES } from '@/lib/routes';

import type { InsightFormatKind } from '@/lib/routes';

import { FORMAT_NAME, KINDS, type FormatHref } from './shared';

/**
 * The insights specimens' shared states over the stress fixture, so the hub's specimen
 * (/design/insights-index) and the format page's (/design/insights-format-index) judge the family
 * over one fixture and link to each other rather than to the live routes.
 */

/** The format page specimen's state for a kind: its plural, lower case ("articles"). */
export const formatState = (kind: keyof typeof FORMAT_NAME) => FORMAT_NAME[kind].toLowerCase();

/** The kind a format state names ("events" → event). */
export const kindOfState = (state: string | undefined): InsightFormatKind | undefined =>
  KINDS.find((kind) => formatState(kind) === state);

/** The specimen format row: "All" to the hub specimen (`hub`), each format to its specimen state. */
export const specimenFormatHref =
  (hub: string = ROUTES.designInsightsIndex): FormatHref =>
  (kind) =>
    kind === 'all' ? hub : `${ROUTES.designInsightsFormatIndex}?state=${formatState(kind)}`;

/**
 * The live CMS's shape today, made from the fixture: articles, events and podcasts only (Strapi's
 * guides and videos aside), no collections, no close, and most covers missing — what the templates
 * must still make a page of.
 */
export function sparse(page: InsightsPage): InsightsPage {
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
export function empty(page: InsightsPage): InsightsPage {
  return {
    ...page,
    collections: undefined,
    resources: { ...page.resources, items: [] },
  };
}
