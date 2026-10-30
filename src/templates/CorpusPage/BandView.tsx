import type { CorpusPage, CorpusBand, CorpusCaseRef } from '@/lib/corpus-types';

import type { AvatarsById, RatingsById } from './blocks';
import { UnitView } from './OfferBands';
import { kindOf } from './plan';

export type CorpusBandViewProps = {
  page: CorpusPage;
  band: CorpusBand;
  /** Default paper; the proof wall (`quotes`) takes tint, as the plan gives it. */
  surface?: 'paper' | 'tint';
  ratings?: RatingsById;
  avatars?: AvatarsById;
  caseRefs?: Readonly<Record<string, CorpusCaseRef>>;
};

/**
 * One band of a corpus page, rendered as the plan's id table names it (plan.ts `BAND_KINDS`), for a
 * page whose template places its own bands around something else (component-map C13: the listings'
 * client wall, proof wall and FAQ around ListingIndex). The same renderer an offer page's band
 * gets, so an FAQ on a listing is the FAQ everywhere: no listing-only band shape exists.
 */
export function CorpusBandView({
  page,
  band,
  surface,
  ratings,
  avatars,
  caseRefs = {},
}: CorpusBandViewProps) {
  const kind = kindOf(band);
  return (
    <UnitView
      unit={{
        id: band.id,
        band,
        kind,
        part: 'whole',
        surface: surface ?? (kind === 'quotes' || kind === 'voice' ? 'tint' : 'paper'),
        visual: false,
      }}
      ctx={{ page, caseRefs, shared: {}, ratings, avatars }}
    />
  );
}
