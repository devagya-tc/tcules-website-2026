import { Layout, Section } from '@/components';
import { OfferSheet, TestimonialCard, type TestimonialItem } from '@/patterns';
import { getKitPhoto } from '@/lib/photos';

import { Variation } from '../_specimen/Variation';
import t from '../_specimen/typeroles.module.css';

/**
 * /design/offer-sheet — "What you get" as one offer (product-design round 6, 11 Oct 2026;
 * page-mapping § 23). Every arrangement: four promises beside a testimonial (the shape), no aside
 * (full column), the six-promise ceiling, a long body, and the paper and tint grounds. Sample words,
 * written to the corpus's lengths, so the pattern is proven content-agnostic.
 */

const FOUR = [
  {
    title: 'A product that needs less explaining.',
    body: 'Workflows that match how the people using it actually work, so they find their way without a manual.',
  },
  {
    title: 'Hard rules, simple screens.',
    body: 'Roles, permissions and exceptions are settled before they reach the interface.',
  },
  {
    title: 'Fewer surprises in the build.',
    body: 'Designs that cover the awkward cases too, so engineers build instead of guessing.',
  },
  {
    title: 'An interface that feels finished.',
    body: 'Loading, empty and error states are designed too, so nothing looks half-built with real data.',
  },
];

const SIX = [
  ...FOUR,
  {
    title: 'A plan the team can follow.',
    body: 'Every decision written down where design and engineering both read it.',
  },
  {
    title: 'Proof before the build.',
    bodyHtml:
      'The riskiest idea tested with real users first, in a <strong>prototype</strong> or in code.',
  },
];

const VOICE: TestimonialItem = {
  quoteHtml:
    '<p>“They understood the workflow faster than we did, and every decision came with its reasons.”</p>',
  name: 'A client founder',
  role: 'Founder',
  company: 'A SaaS company',
  rating: 5,
};

export default function OfferSheetSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <p className={t.eyebrow}>Pattern · tier 2</p>
          <h1>OfferSheet</h1>
          <p className={t.lead}>
            What the buyer gets, read as one offer: the h2, then the promises two up in the leading 2
            of [2, 1], each opening on a hairline with a blue mark, its title at the h3 role. The
            caller&rsquo;s testimonial fills the trailing 1 and shares the promises&rsquo; top and
            bottom edges. No cards: only the voice takes a panel.
          </p>
        </Layout>
      </Section>

      <Variation
        id="four-aside"
        title="1 · Four promises and the testimonial — the shape"
        note="From 1024: two rows of two beside the rated card (TestimonialCard fill), whose top is the first rule and whose foot is the last body's line. Below 1024 one column, promises two up from 768, the card last."
      />
      <OfferSheet
        heading="What you get"
        headingId="ofs-four"
        items={FOUR}
        aside={<TestimonialCard item={VOICE} fill />}
      />

      <Variation
        id="no-aside"
        title="2 · No aside"
        note="Without a voice the promises take the full column, still two up: a sheet, not a row of four."
      />
      <OfferSheet heading="What you get" headingId="ofs-none" items={FOUR} />

      <Variation
        id="image"
        title="2b · An image beside, and a closing note"
        note="`asideImage`: the image fills the trailing 1 from the promises' top to their foot, cover-cropped (16:9 where it stacks below 1024). `note`: a closing line under the promises, in their column. The audit's &ldquo;What you receive&rdquo;."
      />
      <OfferSheet
        heading="What you receive"
        headingId="ofs-image"
        items={FOUR}
        asideImage={getKitPhoto('team-laptops-table')}
        note={<p className={t.body}>Your developers can work through the list themselves.</p>}
      />

      <Variation
        id="six"
        title="3 · Six promises, one body with emphasis (bodyHtml) — the ceiling"
        note="Three rows of two; the card stretches to the third row's foot. Beyond six the sheet warns in development."
      />
      <OfferSheet
        heading="Everything you leave with"
        headingId="ofs-six"
        items={SIX}
        aside={<TestimonialCard item={VOICE} fill />}
      />

      <Variation
        id="tint"
        title="4 · Tint ground"
        note="Every --ofs-* token is restated on tint: the rule steps to neutral-400 so it holds on the deeper ground."
      />
      <OfferSheet
        heading="What you get"
        headingId="ofs-tint"
        items={FOUR}
        surface="tint"
        aside={<TestimonialCard item={VOICE} fill />}
      />
    </>
  );
}
