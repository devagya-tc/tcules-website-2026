import type { InsightResource, InsightsPage } from '../types';

/**
 * The one place an insight's date is decided (critique 16 Oct 2026). Per format: an event is dated
 * by when it happens, everything else by when it was published (the authored date where the source
 * states one — strapi/insights.ts reads it). The result is written onto the record as `sortDate`
 * and `displayDate`, and the page's items are put in `sortDate` order, newest first, undated last.
 *
 * Applied at the seam (source.ts) to whatever source answered, so the CMS and the fixture cannot
 * disagree, and no page or template ever chooses between `publishedAt` and `event.startsAt`.
 */
function dateOf(item: InsightResource): string | undefined {
  if (item.kind === 'event') return item.event?.startsAt;
  return item.publishedAt;
}

const timeOf = (iso: string | undefined) => {
  const time = iso ? Date.parse(iso) : Number.NaN;
  return Number.isNaN(time) ? Number.NEGATIVE_INFINITY : time;
};

export function withInsightDates(page: InsightsPage): InsightsPage {
  const items = page.resources.items
    .map((item) => {
      const date = dateOf(item);
      return date ? { ...item, sortDate: date, displayDate: date } : item;
    })
    /* Stable: equal dates keep the source's order. */
    .sort((a, b) => timeOf(b.sortDate) - timeOf(a.sortDate));
  return { ...page, resources: { ...page.resources, items } };
}
