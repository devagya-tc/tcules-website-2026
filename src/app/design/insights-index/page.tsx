import type { Metadata } from 'next';

import { getInsightsFixturePage } from '@/content';
import { ROUTES } from '@/lib/routes';
import { InsightsIndex } from '@/templates';

import { insightsIndexProps } from '../../_insights/hub';
import { empty, noClose, sparse, specimenFormatHref } from '../../_insights/specimen';

export const metadata: Metadata = {
  title: 'InsightsIndex · stress content | Design',
  robots: { index: false, follow: false },
};

const PATH = ROUTES.designInsightsIndex;

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const STATES = new Set(['sparse', 'no-close', 'empty']);

/**
 * InsightsIndex over the stress fixture (src/content/sources/fixtures/insights.ts): all seven
 * formats, more items than any group shows, the longest titles and an unbroken one, missing covers
 * and descriptions, an event without a date. The same mapping as the live /insights
 * (src/app/_insights/hub.ts); the format row and every "All …" go to the format page's specimen
 * (/design/insights-format-index) rather than the live format pages, so the family is judged over
 * one fixture.
 *
 *   ?state=sparse     the live CMS's shape
 *   ?state=no-close   every format, no close: the Lab is the last band, above the ink footer
 *   ?state=empty      nothing published
 *
 * A template's specimen is the page itself rather than Specimen blocks: what is judged is the
 * composition down its length, which a row of crops cannot show.
 */
export default async function InsightsIndexSpecimen({ searchParams }: Props) {
  const [fixture, query] = await Promise.all([getInsightsFixturePage(), searchParams]);
  const state = Array.isArray(query.state) ? query.state[0] : query.state;
  const page =
    state === 'sparse'
      ? sparse(fixture)
      : state === 'no-close'
        ? noClose(fixture)
        : state === 'empty'
          ? empty(fixture)
          : fixture;
  const hub = state && STATES.has(state) ? `${PATH}?state=${state}` : PATH;

  return <InsightsIndex {...insightsIndexProps(page, specimenFormatHref(hub))} />;
}
