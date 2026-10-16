import type { IconName } from '@/components';
import type { InsightsPage } from '@/content';
import { glyphForRoute } from '@/lib/glyphs';
import { placeholderImage } from '@/lib/placeholders';
import { ROUTES } from '@/lib/routes';
import type { InsightsIndexProps } from '@/templates';

import {
  formatLead,
  formatRow,
  formatTitle,
  kindsIn,
  standIns,
  toItem,
  type FormatHref,
} from './shared';

/**
 * The insights hub's composition: the view model mapped onto InsightsIndex. Shared by the live
 * `/insights` and its specimen (`/design/insights-index`), so the two cannot drift; each passes where
 * the format row and each group's "All …" go — the live format pages, or the specimen's states.
 *
 * The hub holds no archive since the listings redesign (15 Oct 2026): every format's whole,
 * filterable archive is on that format's own page (`format.tsx`).
 */
export function insightsIndexProps(page: InsightsPage, hrefOf: FormatHref): InsightsIndexProps {
  const resources = page.resources.items;
  const kinds = kindsIn(page);

  return {
    standIns: standIns(),
    breadcrumbs: [
      { label: 'Home', href: ROUTES.home },
      { label: 'Insights', href: ROUTES.insights },
    ],
    hero: { title: page.hero.heading, lede: page.hero.description },
    formatRow: formatRow(page, 'all', hrefOf),
    items: resources.map(toItem),
    featuredId: resources.find((item) => item.featured)?.documentId,
    formats: kinds.map((kind) => ({
      kind,
      title: formatTitle(page, kind),
      lead: formatLead(page, kind),
      href: hrefOf(kind),
    })),
    collections: (page.collections ?? []).map((collection) => ({
      id: collection.id,
      title: collection.title,
      description: collection.description,
      icon: collection.related
        ? (glyphForRoute(collection.related.href) as IconName | undefined)
        : undefined,
      items: collection.items,
      related: collection.related
        ? { label: collection.related.label, href: collection.related.href }
        : undefined,
    })),
    lab: page.lab?.action
      ? {
          heading: page.lab.heading,
          body: page.lab.description,
          action: { label: page.lab.action.label, href: page.lab.action.href },
          /* The Lab illustration, commissioned later: its register placeholder holds the slot. */
          visual: placeholderImage(ROUTES.insights, 'lab'),
        }
      : undefined,
    closing: closingOf(page),
  };
}

/** The hub's close, shared by the format pages: rendered by the template only with its action. */
export function closingOf(page: InsightsPage): InsightsIndexProps['closing'] {
  return page.closing?.action
    ? {
        heading: page.closing.heading,
        body: page.closing.description,
        action: { label: page.closing.action.label, href: page.closing.action.href },
      }
    : undefined;
}
