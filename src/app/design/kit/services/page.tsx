import type { ReactNode } from 'react';

import { Layout, Section, type IconName } from '@/components';
import { BlockCardSet, ContentSection, type BlockCardSetItem } from '@/patterns';
import { ROUTES } from '@/lib/routes';

import { specimenStyles as s } from '../../_specimen/Specimen';

/**
 * r7-cards — clickable-card sections, laid out as a page.
 *
 * The owner's arrangement from the 7 Oct review: an eyebrow, a heading and a body, then the cards.
 * Three, four and six, as icon cards and as text cards, every one a whole-card link. Two rules
 * from the same review hold on every band: no decorative image in a section that has clickable
 * cards. Icon cards are boxed (`frame="box"`, the router finish), text cards are opened by their
 * top hairline, and an icon card's glyph is the em of the title beside it (--bcrd-icon-size). Each band is live on the 1240 column
 * and fits a 1470 × 830 screen; `fold:check` measures them by their `data-band`.
 */

/* Icon cards: titles of five words or fewer, bodies of fourteen or fewer. One solid family, blue. */
const icon = (
  id: string,
  name: IconName,
  title: string,
  body: string,
  href: string,
): BlockCardSetItem => ({ id, icon: name, title, body, href });

const PRODUCT = icon(
  'product',
  'ruler-pen',
  'Product design',
  'When the product works in a demo and fights the people using it.',
  ROUTES.productDesign,
);
const SYSTEMS = icon(
  'systems',
  'layers',
  'Design systems',
  'When every team rebuilds the same table, each a little differently.',
  ROUTES.designSystems,
);
const ENGINEERING = icon(
  'engineering',
  'monitor',
  'Design engineering',
  'When the design changes shape between the file and the build.',
  ROUTES.designEngineering,
);
const AI = icon(
  'ai',
  'stars',
  'AI product UX',
  'When an AI feature impresses once, then loses trust in daily use.',
  ROUTES.aiProductUx,
);
const SOFTWARE = icon(
  'software',
  'database',
  'Software development',
  'When you need the build itself, held to the standard the design set.',
  ROUTES.softwareDevelopment,
);
const MODERNISATION = icon(
  'modernisation',
  'shield-check',
  'Product modernisation',
  'When the product is old enough that every change feels like a risk.',
  ROUTES.productModernisation,
);

const THREE_ICON = [PRODUCT, SYSTEMS, ENGINEERING];
const FOUR_ICON = [AI, ENGINEERING, SOFTWARE, MODERNISATION];
const SIX_ICON = [PRODUCT, SYSTEMS, AI, ENGINEERING, SOFTWARE, MODERNISATION];

/* Text cards: the hairline, then an index or an eyebrow, the title and the body. */
const THREE_TEXT: readonly BlockCardSetItem[] = [
  {
    id: 'start-call',
    title: 'A forty-minute call',
    body: 'You describe the decision the work has to improve. We say whether we are the right team.',
    href: ROUTES.contact,
  },
  {
    id: 'start-audit',
    title: 'A fixed-scope audit',
    body: 'Two to three weeks on one question, ending in a ranked list of what to change first.',
    href: ROUTES.audits,
  },
  {
    id: 'start-team',
    title: 'A standing team',
    body: 'The same senior people from the first question to the last release, sized to the work.',
    href: ROUTES.howWeWork,
  },
];

const FOUR_AUDITS: readonly BlockCardSetItem[] = [
  {
    id: 'audit-ux',
    eyebrow: 'Two weeks',
    title: 'UX product audit',
    body: 'Where people stall, and which of those moments costs you the most.',
    href: ROUTES.uxProductAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'audit-system',
    eyebrow: 'Three weeks',
    title: 'Design system audit',
    body: 'What the system covers, what teams rebuild beside it, and why.',
    href: ROUTES.designSystemAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'audit-code',
    eyebrow: 'Two weeks',
    title: 'Design-to-code audit',
    body: 'Where the build drifts from the design, and what leaving it costs.',
    href: ROUTES.designToCodeAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'audit-modern',
    eyebrow: 'Three weeks',
    title: 'Modernisation assessment',
    body: 'Capability by capability: repair, redesign, replatform or rebuild.',
    href: ROUTES.productModernisationAssessment,
    ctaLabel: 'See the assessment',
  },
];

const SIX_TEXT: readonly BlockCardSetItem[] = [
  {
    id: 'ind-fintech',
    eyebrow: 'Regulated',
    title: 'Fintech and insurtech',
    body: 'Products where every screen is also a compliance decision.',
    href: ROUTES.fintech,
  },
  {
    id: 'ind-health',
    eyebrow: 'Regulated',
    title: 'Healthtech and care',
    body: 'Clinical tools used in a hurry, by people who cannot afford a wrong tap.',
    href: ROUTES.healthtech,
  },
  {
    id: 'ind-ai',
    eyebrow: 'Technical buyers',
    title: 'AI and developer tools',
    body: 'Products bought by the people who will read your documentation first.',
    href: ROUTES.aiDeveloperTools,
  },
  {
    id: 'ind-data',
    eyebrow: 'Technical buyers',
    title: 'Data and decision products',
    body: 'Dashboards that have to change a decision, not decorate a meeting.',
    href: ROUTES.dataDecisionProducts,
  },
  {
    id: 'ind-market',
    eyebrow: 'Two-sided',
    title: 'Marketplaces and platforms',
    body: 'Two audiences with opposite incentives, served by one product.',
    href: ROUTES.marketplaces,
  },
  {
    id: 'ind-commerce',
    eyebrow: 'Two-sided',
    title: 'Commerce and transactions',
    body: 'Checkout, returns and the long tail of edge cases that cost real money.',
    href: ROUTES.commerce,
  },
];

/**
 * A caption band: the variation's index and name in the head track, what to look for in the body
 * track. Tight, so the live band beneath keeps its own air.
 */
function Caption({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Section>
      <Layout
        columns={{ lg: [1, 2] }}
        colGap="section"
        rowGap="tight"
        align="start"
        className={s.spec}
      >
        <p className={s.specTitle}>
          {index} · {title}
        </p>
        <p className={s.specNote}>{children}</p>
      </Layout>
    </Section>
  );
}

export default function KitServicesSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <p className={s.eyebrow}>Kit · r7-cards</p>
          <h1>Sections of clickable cards</h1>
          <p className={s.specNote}>
            The arrangement the 7 Oct review settled: an eyebrow, a heading and a body, then the
            cards. Three, four and six, as icon cards and as text cards, every card one link. No
            decorative image shares a band with clickable cards. Icon cards are boxed (the
            router finish), a text card is opened by its hairline, and an icon is the em of the
            title beside it, so it can never outgrow the words it labels.
          </p>
        </Layout>
      </Section>

      {/* ── S.1 · three icon cards ──────────────────────────────────────────────────────── */}
      <Caption index="S.1" title="Three icon cards">
        The smallest router: three doors at 392 each. Every glyph sits on its title&rsquo;s
        first line at the h5&rsquo;s em (22 at 1440, 20 at 390), each card is boxed, and the
        whole card is the target: point at one and its box takes a ground.
      </Caption>
      <ContentSection
        data-band="C-icon"
        eyebrow="Services"
        heading="Where most teams start"
        headingId="ks-three-icon"
        lead="Three practices, one senior team behind each, and a page for every one of them."
      >
        <BlockCardSet items={THREE_ICON} lead="none" across={3} frame="box" />
      </ContentSection>

      {/* ── S.2 · four icon cards, centred head ─────────────────────────────────────────── */}
      <Caption index="S.2" title="Four icon cards, the head centred">
        Four across at 286, the head centred over them so the row reads as one answer to one
        question. On a phone four linked cards become a sideways row with a progress rail, so
        the band never runs to a column of boxes.
      </Caption>
      <ContentSection
        data-band="C-icon"
        align="center"
        eyebrow="When the product is already live"
        heading="Change it without stopping it"
        headingId="ks-four-icon"
        lead="The work that happens to a product people already depend on, every day."
      >
        <BlockCardSet items={FOUR_ICON} lead="none" across={4} frame="box" />
      </ContentSection>

      {/* ── S.3 · six icon cards ────────────────────────────────────────────────────────── */}
      <Caption index="S.3" title="Six icon cards, three across">
        The full services router, two rows of three in boxes, a gutter (32) apart down the grid
        as across it. No photograph beside it: the six glyphs already give every item a shape,
        and an image here was the busy version the review retired.
      </Caption>
      <ContentSection
        data-band="C-icon"
        eyebrow="All services"
        heading="Start from the problem"
        headingId="ks-six-icon"
        lead="Six doors into one practice. Pick the one that sounds most like this week."
      >
        <BlockCardSet items={SIX_ICON} lead="none" across={3} frame="box" />
      </ContentSection>

      {/* ── S.4 · three numbered text cards on tint ─────────────────────────────────────── */}
      <Caption index="S.4" title="Three numbered text cards, on tint">
        A sequence rather than a menu, so the cards are numbered: hairline, blue index, title,
        body. The title is the cue. The tint carries the band as the page&rsquo;s one change of
        ground; the cards paint nothing on it.
      </Caption>
      <ContentSection
        data-band="C-text"
        surface="tint"
        eyebrow="Ways in"
        heading="Three ways to begin"
        headingId="ks-three-text"
        lead="None of them commits you to the next. Most clients have taken all three, in this order."
      >
        <BlockCardSet items={THREE_TEXT} lead="none" across={3} numbered cue="title" />
      </ContentSection>

      {/* ── S.5 · four text cards with an action ────────────────────────────────────────── */}
      <Caption index="S.5" title="Four text cards, each with its action">
        Fixed-scope offers, where the action is not obvious from the title, so each card carries
        the blue link at its foot, pinned level across the row. The eyebrow states the duration;
        the title holds still and the link answers the pointer.
      </Caption>
      <ContentSection
        data-band="C-text"
        eyebrow="Audits"
        heading="A fixed question, a fixed fee"
        headingId="ks-four-text"
        lead="Each audit ends in a ranked list of changes, costed and sequenced, that your team can act on alone."
      >
        <BlockCardSet items={FOUR_AUDITS} lead="none" across={4} cue="cta" />
      </ContentSection>

      {/* ── S.6 · six text cards, centred head ──────────────────────────────────────────── */}
      <Caption index="S.6" title="Six text cards, the head centred">
        Six destinations with no glyph to tell them apart, so the eyebrow groups them in pairs
        and the title is the cue. Rows sit a column (64) apart: a borderless text card needs the
        larger seam to read as the next object rather than the next paragraph.
      </Caption>
      <ContentSection
        data-band="C-text"
        align="center"
        eyebrow="Industries"
        heading="Products we have built before"
        headingId="ks-six-text"
        lead="Six markets where we already know what the hard screen is."
      >
        <BlockCardSet items={SIX_TEXT} lead="none" across={3} cue="title" />
      </ContentSection>
    </>
  );
}
