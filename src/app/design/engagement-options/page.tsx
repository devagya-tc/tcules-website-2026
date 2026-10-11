import { Layout, Section } from '@/components';
import { Callout, EngagementOptions, type EngagementOption } from '@/patterns';

import { Variation } from '../_specimen/Variation';
import t from '../_specimen/typeroles.module.css';

/**
 * /design/engagement-options — ways to work with us, comparable at a glance (product-design round 6,
 * 11 Oct 2026; page-mapping § 23). Every arrangement: the four scopes with a note (the shape), three
 * options, an option with no drawing, and the paper and tint grounds. Sample words.
 */

const FOUR: EngagementOption[] = [
  { title: 'One workflow or feature.', body: 'One problem, solved properly.', scope: 'feature' },
  {
    title: 'A product area or a new product.',
    body: 'From research to designs ready to build.',
    scope: 'area',
  },
  {
    title: 'A designer in your team.',
    body: 'One of our designers in your tools and meetings, specialists joining when needed.',
    scope: 'embedded',
  },
  { title: 'Design and build.', body: 'We design it, then our engineers build it.', scope: 'build' },
];

const NOTE = (
  <Callout html="<p>We are at our best when there is real thinking to do. If every screen is already specified, a production team will suit you better.</p>" />
);

export default function EngagementOptionsSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <p className={t.eyebrow}>Pattern · tier 2</p>
          <h1>EngagementOptions</h1>
          <p className={t.lead}>
            Peers a reader chooses between, so each carries a scope drawing on the same dot field —
            one line, a region, one blue node among yours, a drawn region becoming a built one — in
            the EngagementModel chart&rsquo;s language. The drawings make the four comparable before
            a word is read. No icons, no discs, no boxes; none is featured.
          </p>
        </Layout>
      </Section>

      <Variation
        id="four"
        title="1 · Four scopes and a note — the shape"
        note="Four across from 1024, two from 768; below 768 each drawing sits beside its words (2 : 3). The note (the caller's Callout) a stack under the row."
      />
      <EngagementOptions
        heading="Ways to work with us"
        headingId="eop-four"
        options={FOUR}
        note={NOTE}
      />

      <Variation
        id="three-blank"
        title="2 · Three options, one with no drawing"
        note="Three take three tracks. An option whose name fits no scope shows its words alone rather than a wrong picture."
      />
      <EngagementOptions
        heading="Ways to work with us"
        headingId="eop-three"
        lead="Start where it fits; most engagements grow from the first."
        options={[
          FOUR[0] as EngagementOption,
          FOUR[1] as EngagementOption,
          { title: 'A review of what you have.', body: 'A fixed-scope look before anything is designed.' },
        ]}
      />

      <Variation
        id="tint"
        title="3 · Tint ground"
        note="Every --eop-* token restated on tint: the dot field steps to neutral-400, open nodes take paper-deep."
      />
      <EngagementOptions
        heading="Ways to work with us"
        headingId="eop-tint"
        options={FOUR}
        note={NOTE}
        surface="tint"
      />
    </>
  );
}
