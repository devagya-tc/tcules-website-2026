import { Layout, Section } from '@/components';
import { OfferParts, type OfferPart, type OfferPartsDeliverable } from '@/patterns';

import { Variation } from '../_specimen/Variation';
import t from '../_specimen/typeroles.module.css';

/**
 * /design/offer-parts — "What you get" as four rows in a label column (round 7, 30 Oct 2026;
 * decisions/2026-10-30-what-you-get-label-rows). The real words of /services/product-design
 * (five deliverables, three parts), then four, six, two parts, one part, an undrawn part and tint.
 * Every visual is a flat drawing; there is no photograph kind.
 */

const FIVE: OfferPartsDeliverable[] = [
  {
    title: 'A tested brief',
    body: 'What goes in, what waits and what stays out, checked against the people who use the product.',
    scene: 'outcome-brief',
  },
  {
    title: 'A model',
    body: 'A model of roles, records, permissions and workflows, drawn before the screens, so every screen agrees with the next.',
    scene: 'outcome-rules',
  },
  {
    title: 'Interaction & Visual Design',
    body: 'Interaction and visual design for every screen and state, inside your design system if you have one, down to the empty and error screens nobody demos.',
    scene: 'outcome-finished',
  },
  {
    title: 'Prototypes',
    body: 'Clickable or coded prototypes, tested with people who match your users.',
    scene: 'symptom-test',
  },
  {
    title: 'Ready to build',
    body: 'Designs ready to build, and our review of what your engineers ship.',
    scene: 'outcome-build',
  },
];

const PARTS: OfferPart[] = [
  {
    title: 'Who does the work',
    body: 'Your project is led by a senior product designer who also does the design, and an account lead keeps it running. Researchers, design engineers or developers join when the problem needs them.',
    scene: 'team-product-design',
  },
  {
    title: 'What we need from you',
    body: 'The research, analytics and support tickets you already hold, time with the people who use the product, and someone who can make the product calls.',
    scene: 'needs-product-design',
  },
  {
    title: 'Where our part stops',
    body: 'You make the product calls: what ships, when, and for which customers. Your engineers own your platform, data and infrastructure, even when ours build. Our part ends with designs ready to build and a review of what ships, unless you add coded prototypes or the build.',
    scene: 'stops-product-design',
  },
];

const LEAD =
  'Our digital product design services cover the thinking behind your product and every screen in it.';

export default function OfferPartsSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <p className={t.eyebrow}>Pattern · tier 2</p>
          <h1>OfferParts</h1>
          <p className={t.lead}>
            What you get as four rows in a label column: the deliverables as a strip of drawn items,
            then who does the work, what we need and where our part stops, each a 16:9 drawing
            beside its words. Every row opens on an h3 at one role, so none outranks another. Every
            visual is a flat drawing. No numbers, hairlines or containers.
          </p>
        </Layout>
      </Section>

      <Variation
        id="five"
        title="1 · Five deliverables and three parts — the shape"
        note="Four rows, the part's name in the label column from 1024; from 1440 five deliverables across the content column, 1024–1439 three then two; rows 2–4 a 16:9 drawing beside the words. Below 1024 the label sits over its content."
      />
      <OfferParts
        heading="What you get from our product design services"
        headingId="ofp-five"
        lead={LEAD}
        deliverablesTitle="What you receive"
        deliverables={FIVE}
        parts={PARTS}
      />

      <Variation
        id="four"
        title="2 · Four deliverables"
        note="Four deliverables: 2 + 2 below 1440 and four across at 1440."
      />
      <OfferParts
        heading="What you get"
        headingId="ofp-four"
        deliverablesTitle="What you receive"
        deliverables={FIVE.slice(0, 4)}
        parts={PARTS}
      />

      <Variation
        id="six"
        title="3 · Six deliverables"
        note="Six read three over three."
      />
      <OfferParts
        heading="What you get"
        headingId="ofp-six"
        deliverablesTitle="What you receive"
        deliverables={[
          ...FIVE,
          {
            title: 'A plan',
            body: 'Every decision written down where design and engineering both read it.',
            scene: 'outcome-explain',
          },
        ]}
        parts={PARTS}
      />

      <Variation id="two" title="4 · Two parts" note="Two parts: the rows are unchanged." />
      <OfferParts
        heading="What you get"
        headingId="ofp-two"
        deliverablesTitle="What you receive"
        deliverables={FIVE}
        parts={PARTS.slice(1)}
      />

      <Variation
        id="one"
        title="5 · One part"
        note="One part: the row is unchanged."
      />
      <OfferParts
        heading="What you get"
        headingId="ofp-one"
        deliverablesTitle="What you receive"
        deliverables={FIVE}
        parts={PARTS.slice(2)}
      />

      <Variation
        id="undrawn"
        title="6 · A part with no scene"
        note="Undrawn: the empty plate stands, and development warns."
      />
      <OfferParts
        heading="What you get"
        headingId="ofp-undrawn"
        deliverablesTitle="What you receive"
        deliverables={FIVE}
        parts={[PARTS[0]!, PARTS[1]!, { ...PARTS[2]!, scene: undefined }]}
      />

      <Variation id="tint" title="7 · Tint" note="Tint." />
      <OfferParts
        heading="What you get"
        headingId="ofp-tint"
        surface="tint"
        deliverablesTitle="What you receive"
        deliverables={FIVE}
        parts={PARTS}
      />
    </>
  );
}
