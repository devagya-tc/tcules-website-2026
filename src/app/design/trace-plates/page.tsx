import { Layout, Section } from '@/components';
import { TracePlates, type TraceStage } from '@/patterns';

import { Variation } from '../_specimen/Variation';
import t from '../_specimen/typeroles.module.css';

/**
 * /design/trace-plates — one screen followed from the approved design to what users see (the
 * design-to-code audit's "What we trace", 11 Oct 2026). Every arrangement: the five scenes on paper
 * and on tint, and a three-stage trace. Sample words.
 */

const FIVE: TraceStage[] = [
  { title: 'The approved design', body: 'the intended workflow, states and content.', scene: 'design' },
  { title: 'The handoff', body: 'what the specs said, and what they left out.', scene: 'handoff' },
  { title: 'The code', body: 'component options, tokens and data rules.', scene: 'code' },
  { title: 'The running product', body: 'keyboard use, loading, errors and real data.', scene: 'product' },
  { title: 'The sign-off', body: 'how the result was reviewed and accepted.', scene: 'signoff' },
];

export default function TracePlatesSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <p className={t.eyebrow}>Pattern · tier 2</p>
          <h1>TracePlates</h1>
          <p className={t.lead}>
            One screen followed through every hand-over. Each stage&rsquo;s plate draws that same
            screen as it is there — clean, specified with a gap, as code, running and loading,
            accepted — and one dashed trace runs through its action on every plate and across the
            gutters, from an open node to a filled one.
          </p>
        </Layout>
      </Section>

      <Variation
        id="five"
        title="1 · Five scenes — the shape"
        note="Five across from 1024, the connector crossing each gutter at the action's height; three from 768; two below. Plates 16:9 on the dot field."
      />
      <Section>
        <TracePlates stages={FIVE} />
      </Section>

      <Variation id="three" title="2 · Three stages" note="Any order of scenes; three take three tracks." />
      <Section>
        <TracePlates stages={[FIVE[0], FIVE[2], FIVE[4]] as TraceStage[]} />
      </Section>

      <Variation id="tint" title="3 · Tint ground" note="Every --trp-* token restated on tint: the plate turns paper." />
      <Section surface="tint">
        <TracePlates stages={FIVE} />
      </Section>
    </>
  );
}
