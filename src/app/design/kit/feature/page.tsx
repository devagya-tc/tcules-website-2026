import type { ReactNode } from 'react';

import {
  Cluster,
  Layout,
  Media,
  Section,
  Texture,
  TextureShape,
  type IconName,
} from '@/components';
import {
  BlockCard,
  BlockCardSet,
  ContentSection,
  CtaRow,
  PageHero,
  Slider,
  type BlockCardImage,
  type BlockCardMedia,
  type BlockCardSetItem,
} from '@/patterns';
import { HEAD_TRACK } from '@/lib/image-sizes';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { ROUTES } from '@/lib/routes';

import { specimenStyles as s } from '../../_specimen/Specimen';

/* ── Imagery ─────────────────────────────────────────────────────────────────────────────────
   Catalogue photographs through the registry (src/lib/photos.ts): atmosphere, so alt="". A card
   cover is a record, never a node, so the set can crop it to the count (16:9 for three or more,
   3:2 for a pair, § 1.4 rule 1). */

const photo = (id: PhotoId): BlockCardMedia => ({ type: 'image', image: getKitPhoto(id) });

/** A head-track aside: a 3:2 photograph at the head track's sizes (§ 1.4, 381 × 254). */
function Aside({ id }: { id: PhotoId }) {
  return <Media image={getKitPhoto(id)} ratio="3/2" sizes={HEAD_TRACK} />;
}

const DERIVED = (base: string, ext: string) =>
  [320, 652, 1240].map((width) => ({ src: `/design/media/${base}-${width}.${ext}`, width }));

/** The four kinds a card cover can be (ch05 § 2, § 4; visual-direction § 5.2). */
const KIND_ILLUSTRATION: BlockCardImage = {
  src: '/illustrations/services/design-systems.paper.svg',
  alt: '',
  width: 681,
  height: 569,
  kind: 'illustration',
};
const KIND_CAPTURE: BlockCardImage = {
  src: '/design/media/capture-listing.webp',
  alt: 'Listing editor with four bullet fields beside an AI assistance panel.',
  width: 1436,
  height: 883,
  kind: 'capture',
  sources: DERIVED('capture-listing', 'jpg'),
};
const KIND_CUTOUT: BlockCardImage = {
  src: '/design/media/cutout-flow.png',
  alt: 'Workflow node: an input connected to an AI feature card with a provider field and an output.',
  width: 1796,
  height: 1112,
  kind: 'cut-out',
  shadow: true,
  sources: DERIVED('cutout-flow', 'png'),
};

/* ── Copy ────────────────────────────────────────────────────────────────────────────────────
   Showcase copy in the Tcules voice (§ 8.4): invented, precise, calm. Every string is inside its
   § 1.5 ceiling — card titles ≤ 8 words, Card-3 bodies ≤ 14, Card-4 ≤ 12, text bodies ≤ 22 (≤ 14
   in a set of six), icon titles ≤ 5 and bodies ≤ 14 — so every band meets the fold by its copy,
   not by luck. */

const SERVICES: readonly BlockCardSetItem[] = [
  {
    id: 'svc-product',
    title: 'Product design',
    body: 'From the first map of the work to the screens your team ships.',
    media: photo('pair-laptop-notebook'),
    href: ROUTES.productDesign,
  },
  {
    id: 'svc-systems',
    title: 'Design systems',
    body: 'Tokens and components your engineers adopt because they are faster.',
    media: photo('screen-over-shoulder'),
    href: ROUTES.designSystems,
  },
  {
    id: 'svc-modernisation',
    title: 'Product modernisation',
    body: 'Rebuild an ageing product around the work it actually supports.',
    media: photo('board-review-backs'),
    href: ROUTES.productModernisation,
  },
];

const WORK: readonly BlockCardSetItem[] = [
  {
    id: 'work-claims',
    title: 'One record for a claims team of four hundred',
    body: 'Two systems, one customer, and the rule that settled which answer ships.',
    media: photo('team-laptops-table'),
    href: ROUTES.caseStudies,
  },
  {
    id: 'work-onboarding',
    title: 'Onboarding that operators finish on day one',
    body: 'Eleven steps became four, and support tickets halved in a quarter.',
    media: photo('pair-testing-overhead'),
    href: ROUTES.caseStudies,
  },
  {
    id: 'work-system',
    title: 'A component library the engineers asked for',
    body: 'Built in code first, documented where the team already works.',
    media: photo('whiteboard-pair-laptop'),
    href: ROUTES.caseStudies,
  },
];

const ENGAGEMENTS: readonly BlockCardSetItem[] = [
  {
    id: 'eng-sprint',
    title: 'A two-week discovery sprint',
    body: 'Interviews, a map of the work and a prioritised list of decisions.',
    media: photo('workshop-hands-writing'),
    href: ROUTES.howWeWork,
    ctaLabel: 'See the sprint',
  },
  {
    id: 'eng-audit',
    title: 'An audit of the live product',
    body: 'Where the product loses people, ranked by what it costs you.',
    media: photo('hands-sketches-markers'),
    href: ROUTES.uxProductAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'eng-team',
    title: 'An embedded product team',
    body: 'Designers and design engineers inside your roadmap, week by week.',
    media: photo('stylus-tablet-sketch'),
    href: ROUTES.services,
    ctaLabel: 'See the team',
  },
];

const CRAFT: readonly BlockCardSetItem[] = [
  {
    id: 'craft-research',
    title: 'Research',
    body: 'We watch the work before we draw anything for it.',
    media: photo('wireframe-wall'),
  },
  {
    id: 'craft-interaction',
    title: 'Interaction design',
    body: 'Flows that hold up in the unhappy paths, not only the demo.',
    media: photo('hand-sketch-wireframe'),
  },
  {
    id: 'craft-prototype',
    title: 'Prototyping',
    body: 'Real data in a working build, in front of real users.',
    media: photo('designer-tablet-monitor'),
  },
];

const WEEK: readonly BlockCardSetItem[] = [
  {
    id: 'week-crit',
    title: 'Monday crit at the wall',
    body: 'Every open screen reviewed against the task it serves.',
    media: photo('studio-whiteboard-crit'),
  },
  {
    id: 'week-session',
    title: 'A working session with your team',
    body: 'Decisions made in the room, with the people who own them.',
    media: photo('studio-session-talk'),
  },
  {
    id: 'week-review',
    title: 'Friday review in the build',
    body: 'What changed, what we learned, and what is decided next.',
    media: photo('workshop-whiteboard-lounge'),
  },
];

const STUDIO: readonly BlockCardSetItem[] = [
  {
    id: 'studio-pairing',
    title: 'Pairing at one desk',
    body: 'Designer and engineer on the same screen, the same hour.',
    media: photo('studio-desk-pairing'),
  },
  {
    id: 'studio-monitor',
    title: 'Critique over the shoulder',
    body: 'Short, frequent reviews instead of one long one at the end.',
    media: photo('studio-pair-at-monitor'),
  },
  {
    id: 'studio-presenting',
    title: 'Showing the work early',
    body: 'Clients see screens in week one, not a deck in week six.',
    media: photo('studio-workshop-presenting'),
  },
  {
    id: 'studio-offsite',
    title: 'Time away from the screen',
    body: 'Twice a year the studio thinks about how it works.',
    media: photo('studio-offsite-talk'),
  },
];

const AUDITS: readonly BlockCardSetItem[] = [
  {
    id: 'audit-ux',
    title: 'UX and product audit',
    body: 'Where your product loses people, ranked by cost.',
    media: photo('pencil-wireframe-violet'),
    href: ROUTES.uxProductAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'audit-system',
    title: 'Design-system audit',
    body: 'Which components drift, and what the drift costs.',
    media: photo('desk-minimal-white'),
    href: ROUTES.designSystemAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'audit-code',
    title: 'Design-to-code audit',
    body: 'Where the build departs from the design, and why.',
    media: photo('conversation-chalkboard'),
    href: ROUTES.designToCodeAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'audit-ai',
    title: 'AI product readiness',
    body: 'What an AI feature must show before people trust it.',
    media: photo('pair-desk-through-plants'),
    href: ROUTES.aiProductUxReadiness,
    ctaLabel: 'See the audit',
  },
];

const CASES: readonly { title: string; body: string; image: PhotoId }[] = [
  {
    title: 'A pricing tool sales teams trust',
    body: 'Every number on screen traceable to the rule that produced it.',
    image: 'sticky-wall-soft-focus',
  },
  {
    title: 'Field inspections without the paper',
    body: 'An offline-first app for crews who work where signal does not.',
    image: 'hand-mouse-detail',
  },
  {
    title: 'A care record nurses can scan',
    body: 'The six things a shift needs, first, on every patient.',
    image: 'wall-sketching-portrait',
  },
  {
    title: 'Search that knows the catalogue',
    body: 'Forty thousand parts, found by what engineers call them.',
    image: 'hands-trackpad',
  },
  {
    title: 'Underwriting in one screen, not nine',
    body: 'The decision and its evidence, side by side, for the first time.',
    image: 'office-calm-interior',
  },
  {
    title: 'A design system across four products',
    body: 'One token layer, four brands, and a release every fortnight.',
    image: 'moodboard-wall-desk',
  },
];

const PRINCIPLES: readonly BlockCardSetItem[] = [
  {
    id: 'pr-work',
    title: 'Start with the work, not the screen',
    body: 'We map who does what, in which order and under whose authority, before anything is drawn.',
  },
  {
    id: 'pr-decide',
    title: 'Decide in the room',
    body: 'Open questions are settled with the people who own them, and written down with the reason.',
  },
  {
    id: 'pr-ship',
    title: 'Ship it, then measure it',
    body: 'A design is finished when the product does what it says, in use, for the people it is for.',
  },
];

const READING: readonly BlockCardSetItem[] = [
  {
    id: 'rd-guide',
    eyebrow: 'Guide',
    title: 'Scoping a modernisation without a rewrite',
    body: 'How to find the decisions that slow a team down, and fix those first.',
    href: ROUTES.guides,
    ctaLabel: 'Read the guide',
  },
  {
    id: 'rd-research',
    eyebrow: 'Research',
    title: 'What operators do when the screen is wrong',
    body: 'Forty interviews on the workarounds teams build, and what they cost.',
    href: ROUTES.research,
    ctaLabel: 'Read the research',
  },
  {
    id: 'rd-article',
    eyebrow: 'Article',
    title: 'The roadmap is a claim about evidence',
    body: 'How to read a roadmap for what it assumes before a feature ships.',
    href: ROUTES.articles,
    ctaLabel: 'Read the article',
  },
];

const WHERE: readonly BlockCardSetItem[] = [
  {
    id: 'wh-fintech',
    eyebrow: 'Fintech',
    title: 'Decisions that must show their working',
    body: 'Underwriting, pricing and claims, where every number needs its source on screen.',
    href: ROUTES.fintech,
  },
  {
    id: 'wh-health',
    eyebrow: 'Healthtech',
    title: 'Records read at the end of a long shift',
    body: 'Care tools that put the six things a shift needs first, and nothing else.',
    href: ROUTES.healthtech,
  },
  {
    id: 'wh-field',
    eyebrow: 'Field operations',
    title: 'Work done where the signal is not',
    body: 'Offline-first tools for crews on sites, roofs and plant floors.',
    href: ROUTES.proptech,
  },
];

const METHOD: readonly BlockCardSetItem[] = [
  {
    id: 'm-map',
    title: 'Map the work',
    body: 'Who does what, in which order, and under whose authority.',
  },
  {
    id: 'm-model',
    title: 'Settle the model',
    body: 'Which records exist, who owns them and which rules bind them.',
  },
  {
    id: 'm-behaviour',
    title: 'Design the behaviour',
    body: 'What the product does in every path, including the unhappy ones.',
  },
  {
    id: 'm-surface',
    title: 'Draw the surface',
    body: 'Screens last, once the decisions underneath them hold.',
  },
  {
    id: 'm-build',
    title: 'Build it with your team',
    body: 'Design engineers in your codebase, in your review process.',
  },
  {
    id: 'm-hand',
    title: 'Hand it over, rehearsed',
    body: 'What your team runs after us, written down and practised once.',
  },
];

const icon = (
  id: string,
  name: IconName,
  title: string,
  body: string,
  href?: string,
): BlockCardSetItem => ({ id, icon: name, title, body, href });

const RECEIVE_4: readonly BlockCardSetItem[] = [
  icon('rc-model', 'database', 'A product model', 'The records, their owners and the rules that bind them.'),
  icon('rc-flows', 'layers', 'Flows that hold', 'Every path through the work, including the unhappy ones.'),
  icon('rc-set', 'widget', 'A component set', 'Built once in code and documented where the team works.'),
  icon('rc-plan', 'checklist', 'A handover plan', 'What your team runs after us, written down and rehearsed.'),
];

const RECEIVE_4B: readonly BlockCardSetItem[] = [
  icon('rb-map', 'users-group-rounded', 'A map of the people', 'Who touches the work, in which order, with what authority.'),
  icon('rb-risks', 'shield-check', 'Ranked risks', 'What breaks first under load, and what it costs when it does.'),
  icon('rb-proto', 'smartphone', 'A tested prototype', 'Real data in front of real users, before a line ships.'),
  icon('rb-roadmap', 'flag', 'A decided roadmap', 'The next three releases, each with the decision it settles.'),
];

const SERVICES_6: readonly BlockCardSetItem[] = [
  icon('s6-product', 'ruler-pen', 'Product design', 'From the first map of the work to the shipped screen.', ROUTES.productDesign),
  icon('s6-systems', 'widget', 'Design systems', 'Tokens and components your engineers adopt willingly.', ROUTES.designSystems),
  icon('s6-ai', 'cpu', 'AI product UX', 'AI features that show their working, so people trust them.', ROUTES.aiProductUx),
  icon('s6-engineering', 'code', 'Design engineering', 'Designers who ship in your codebase and review process.', ROUTES.designEngineering),
  icon('s6-software', 'server', 'Software development', 'The build behind the design, held to the same standard.', ROUTES.softwareDevelopment),
  icon('s6-modern', 'refresh', 'Product modernisation', 'An ageing product rebuilt around the work it supports.', ROUTES.productModernisation),
];

const PAIR: readonly BlockCardSetItem[] = [
  {
    id: 'pair-claims',
    title: 'Rebuilding a claims workflow around one record',
    body: 'Two teams, one customer, and the rule that settled which answer ships. Handling time fell by a third.',
    media: photo('pair-at-laptop-sticky-wall'),
    href: ROUTES.caseStudies,
  },
  {
    id: 'pair-system',
    title: 'A design system the engineers asked for',
    body: 'Tokens and components the product team adopted without being told to, across four products.',
    media: photo('whiteboard-two-hands'),
    href: ROUTES.caseStudies,
  },
];

/** One input, two outcomes (§ 3.1): the middle item has no cover. */
const MIXED: readonly BlockCardSetItem[] = [
  {
    id: 'mx-guide',
    title: 'Scoping a modernisation without a rewrite',
    body: 'Find the decisions that slow a team down, and fix those first.',
    media: photo('pencil-wireframe-red'),
    href: ROUTES.guides,
  },
  {
    id: 'mx-research',
    title: 'What operators do when the screen is wrong',
    body: 'Forty interviews on the workarounds teams build, and their cost.',
    href: ROUTES.research,
  },
  {
    id: 'mx-article',
    title: 'The roadmap is a claim about evidence',
    body: 'Read a roadmap for what it assumes before a feature ships.',
    media: photo('desk-sketch-flatlay'),
    href: ROUTES.articles,
  },
];
const MIXED_STAND_INS: readonly BlockCardImage[] = [getKitPhoto('studio-whiteboard-crit')];

const KINDS: readonly BlockCardSetItem[] = [
  {
    id: 'kind-photo',
    eyebrow: 'Photograph',
    title: 'People doing the work',
    body: 'Studio first, then stock. No frame of its own; the card rules it.',
    media: photo('studio-session-talk'),
  },
  {
    id: 'kind-illustration',
    eyebrow: 'Illustration',
    title: 'The argument, drawn',
    body: 'Unboxed everywhere else; in a card, cropped and ruled like the rest.',
    media: { type: 'image', image: KIND_ILLUSTRATION },
  },
  {
    id: 'kind-capture',
    eyebrow: 'Capture',
    title: 'The product, as shipped',
    body: 'A real screen. Its own hairline gives way to the card’s.',
    media: { type: 'image', image: KIND_CAPTURE },
  },
  {
    id: 'kind-cutout',
    eyebrow: 'Cut-out',
    title: 'One part, lifted out',
    body: 'A component on its own, with the one shadow ch05 allows.',
    media: { type: 'image', image: KIND_CUTOUT },
  },
];

/** M: three resources with no covers yet. The set takes a stand-in for each (§ 5.7). */
const RESOURCES: readonly BlockCardSetItem[] = [
  {
    id: 'res-checklist',
    title: 'A checklist for an AI feature review',
    body: 'Twelve questions to answer before people are asked to trust it.',
    href: ROUTES.tools,
  },
  {
    id: 'res-template',
    title: 'The decision log we use with clients',
    body: 'One page per decision: the question, the owner and the reason.',
    href: ROUTES.tools,
  },
  {
    id: 'res-guide',
    title: 'Running a design crit that decides',
    body: 'How to end a review with fewer open questions than it started.',
    href: ROUTES.guides,
  },
];
const RESOURCE_STAND_INS: readonly BlockCardImage[] = [
  getKitPhoto('studio-sticky-board-ux'),
  getKitPhoto('hands-sticky-blue-pen'),
  getKitPhoto('workshop-brick-room'),
];

const LINKED_4: readonly BlockCardSetItem[] = AUDITS.map((item) => ({
  ...item,
  ctaLabel: undefined,
}));

/* ── The showcase chrome ─────────────────────────────────────────────────────────────────────
   A variation's caption sits in the seam between two bands, in a FLUSH Section: the bands keep
   their own 96 + 96, so the caption floats in the middle of the 192 seam and the bands themselves
   are measured exactly as a page renders them. The hairline is the harness's `.spec` rule. */

function Caption({
  n,
  name,
  fit,
  children,
}: {
  n: number;
  name: string;
  fit?: string;
  children?: ReactNode;
}) {
  return (
    <Section flush>
      <Layout rowGap="tight" className={s.spec}>
        <Cluster colGap="block" rowGap="tight" align="baseline">
          <span className={s.kitIndex}>{String(n).padStart(2, '0')}</span>
          <p className={s.specTitle}>{name}</p>
          {fit ? <p className={s.specNote}>{fit}</p> : null}
        </Cluster>
        {children ? <p className={s.specNote}>{children}</p> : null}
      </Layout>
    </Section>
  );
}

const VARIATIONS = [
  'C-image-3 · H-compact centred · whole-card links',
  'C-image-3 · H-row with a section action',
  'C-image-3 · H-title · per-card CTA',
  'C-image-3 · H-title · CtaRow, one-line titles',
  'C-image-3 · unlinked, no CTA',
  'C-image-4 · H-full · lead none',
  'C-image-4 · H-compact · per-card CTA',
  'C-image-6 · Slider showing three',
  'C-text-3 · hairline + index, unlinked',
  'C-text-3 · per-card CTA',
  'C-text-3 · whole-card links · on tint',
  'C-text-6 · two-line bodies',
  'C-icon-4 · beside head + photo aside',
  'C-icon-4 · CtaRow under the grid',
  'C-icon-6 · photo aside · whole-card links',
  'C-pair · beside head with actions',
  'Mixed set · a stand-in fills the gap',
  'Mixed set · standIns={false} · C-text',
  'Card images · four kinds',
  'M resources · stand-in covers',
  'Phone · a linked set of four scrolls',
] as const;

/**
 * /design/kit/feature — the Feature family (C) and resources (M) of the Tcules UI kit.
 *
 * Every variation is a live ContentSection band composed from BlockCardSet / BlockCard, exactly as
 * a page composes it, so each band can be read at 1470 × 830 against § 1.4's arithmetic. The
 * numbers in each caption are the band's budgeted content height (target ≤ 598 at default
 * density). Feature sets pass `lead="none"`; the featured lead stays the case-study index's.
 */
export default function FeatureKitSpecimen() {
  return (
    <>
      <PageHero
        eyebrow="Tcules UI kit"
        title="Feature sections"
        body={[
          'Card sets that carry a band: image, text, icon and pair, each composed from BlockCardSet on ContentSection. Blue marks the way through; the words stay ink.',
        ]}
      >
        <Texture>
          <TextureShape top={-220} right={-160} width="40%" height={420} kind="ellipse" blur={200} />
        </Texture>
        <Layout as="ol" columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="text">
          {VARIATIONS.map((name, index) => (
            <li key={name}>
              <Cluster colGap="text" rowGap="inline" align="baseline">
                <span className={s.kitIndex}>{String(index + 1).padStart(2, '0')}</span>
                <span className={s.specNote}>{name}</span>
              </Cluster>
            </li>
          ))}
        </Layout>
      </PageHero>

      {/* 01 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={1} name={VARIATIONS[0]} fit="217 + 381 = 598">
        Whole-card links. Each title ends in the blue arrow at rest; on hover the title joins it
        and the cover leans in.
      </Caption>
      <ContentSection
        align="center"
        eyebrow="Services"
        heading="Three ways we help"
        headingId="kf-01"
        lead="Each one starts with the work your team does, and ends with a product that supports it."
      >
        <BlockCardSet items={SERVICES} lead="none" />
      </ContentSection>

      {/* 02 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={2} name={VARIATIONS[1]} fit="214 + 381 = 595">
        The H-row: heading beside the lead, the section&rsquo;s one action under it, the set full
        column beneath.
      </Caption>
      <ContentSection
        arrangement="split-head"
        eyebrow="Recent work"
        heading="Work that held up in use"
        headingId="kf-02"
        lead="Three products we designed and built with their teams, measured after launch rather than at handover."
        actions={
          <CtaRow rule={false} actions={[{ label: 'All case studies', href: ROUTES.caseStudies }]} />
        }
      >
        <BlockCardSet items={WORK} lead="none" />
      </ContentSection>

      {/* 03 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={3} name={VARIATIONS[2]} fit="133 + 381 + 64 = 578">
        Each card names its own destination in a blue link under the copy; the title stays ink.
      </Caption>
      <ContentSection
        align="center"
        eyebrow="Engagements"
        heading="Pick a starting point"
        headingId="kf-03"
      >
        <BlockCardSet items={ENGAGEMENTS} lead="none" cue="cta" />
      </ContentSection>

      {/* 04 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={4} name={VARIATIONS[3]} fit="133 + 347 + 96 = 576">
        Unlinked cards with one-line titles, and the band&rsquo;s ask in a CtaRow a stack below.
      </Caption>
      <ContentSection
        eyebrow="The craft"
        heading="What we do every week"
        headingId="kf-04"
        footer={
          <CtaRow
            note="Every engagement starts with a thirty-minute call."
            actions={[
              { label: 'Book a call', href: ROUTES.contact },
              { label: 'How we work', href: ROUTES.howWeWork },
            ]}
          />
        }
      >
        <BlockCardSet items={CRAFT} lead="none" />
      </ContentSection>

      {/* 05 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={5} name={VARIATIONS[4]} fit="217 + 381 = 598">
        No link and no CTA: the set describes, it does not route. Studio photographs, our own.
      </Caption>
      <ContentSection
        align="center"
        eyebrow="A working week"
        heading="How a week runs"
        headingId="kf-05"
        lead="Three fixed points hold the week together, whatever else the project needs from us."
      >
        <BlockCardSet items={WEEK} lead="none" />
      </ContentSection>

      {/* 06 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={6} name={VARIATIONS[5]} fit="264 + 301 = 565">
        Four across at 286, h5 over body-sm, 16:9. lead=&quot;none&quot;: no card is featured in a
        feature band. Unlinked, so it stays stacked on a phone.
      </Caption>
      <ContentSection
        eyebrow="The studio"
        heading="A small studio that works in the open with your team"
        headingId="kf-06"
        lead="Eighteen designers and design engineers in one room, reviewing work daily rather than at milestones."
      >
        <BlockCardSet items={STUDIO} lead="none" />
      </ContentSection>

      {/* 07 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={7} name={VARIATIONS[6]} fit="217 + 301 + 64 = 582">
        Four linked cards with per-card links. On a phone the row scrolls sideways, the next card
        peeking.
      </Caption>
      <ContentSection
        align="center"
        eyebrow="Audits"
        heading="Fixed-scope product audits"
        headingId="kf-07"
        lead="Two to three weeks each, with a ranked list of findings your team can act on the week after."
      >
        <BlockCardSet items={AUDITS} lead="none" cue="cta" />
      </ContentSection>

      {/* 08 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={8} name={VARIATIONS[7]} fit="133 + 381 + 64 = 578">
        Five or more image cards never wrap to a second row (826): they become a Slider showing
        three, composed around BlockCards by the page.
      </Caption>
      <ContentSection eyebrow="Case studies" heading="More of the work" headingId="kf-08">
        <Slider label="Case studies">
          {CASES.map((card) => (
            <BlockCard
              key={card.title}
              title={card.title}
              body={card.body}
              media={photo(card.image)}
              href={ROUTES.caseStudies}
              tracks={3}
              ratio="wide"
              size="md"
            />
          ))}
        </Slider>
      </ContentSection>

      {/* 09 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={9} name={VARIATIONS[8]} fit="217 + 217 = 434">
        A text card takes a hairline at its own top edge, the width of the card, then 24 to a blue
        index. The gutter breaks the rule, so it reads as three objects, not a table.
      </Caption>
      <ContentSection
        align="center"
        eyebrow="Principles"
        heading="Three things we hold to"
        headingId="kf-09"
        lead="They decide what we do first on every project, and what we refuse to skip when time is short."
      >
        <BlockCardSet items={PRINCIPLES} lead="none" numbered />
      </ContentSection>

      {/* 10 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={10} name={VARIATIONS[9]} fit="217 + 217 + 64 = 498">
        Text cards with an eyebrow and their own named link.
      </Caption>
      <ContentSection
        eyebrow="Further reading"
        heading="Where to read next"
        headingId="kf-10"
        lead="Three pieces from the studio on the decisions underneath the screens, at three lengths."
      >
        <BlockCardSet items={READING} lead="none" cue="cta" />
      </ContentSection>

      {/* 11 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={11} name={VARIATIONS[10]} fit="217 + 217 = 434">
        Surface proof — on pages, tint is the proof band only (§ 1.7). Whole-card links on text
        cards take the arrow cue.
      </Caption>
      <ContentSection
        align="center"
        surface="tint"
        eyebrow="Expertise"
        heading="Where we work best"
        headingId="kf-11"
        lead="Products where a wrong screen costs real money, real time or real trust, and someone has to answer for it."
      >
        <BlockCardSet items={WHERE} lead="none" cue="arrow" />
      </ContentSection>

      {/* 12 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={12} name={VARIATIONS[11]} fit="133 + 2 × 191 + 64 = 579">
        Six text cards, two rows of three, bodies held to two lines.
      </Caption>
      <ContentSection eyebrow="Method" heading="Six steps, in this order" headingId="kf-12">
        <BlockCardSet items={METHOD} lead="none" numbered />
      </ContentSection>

      {/* 13 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={13} name={VARIATIONS[12]} fit="240 + 48 + 254 = 542 · body 336">
        C-icon always carries a photograph in its head track, and never actions there.
      </Caption>
      <ContentSection
        arrangement="beside"
        eyebrow="What you receive"
        heading="Four things you keep"
        headingId="kf-13"
        lead="Everything we make is yours, documented where your team already works, and maintained after we leave."
        aside={<Aside id="hand-sketch-wireframe" />}
      >
        <BlockCardSet items={RECEIVE_4} lead="none" across={2} />
      </ContentSection>

      {/* 14 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={14} name={VARIATIONS[13]} fit="head 542 · body 336 + 96 = 432">
        C-icon-4 may close on a CtaRow under the grid. The head track still carries only the photo.
      </Caption>
      <ContentSection
        arrangement="beside"
        eyebrow="Discovery"
        heading="What the first month delivers"
        headingId="kf-14"
        lead="Four weeks, four artefacts, and a decision about whether to go further, made with you."
        aside={<Aside id="pencil-wireframe-violet" />}
        footer={
          <CtaRow actions={[{ label: 'Plan a discovery month', href: ROUTES.contact }]} />
        }
      >
        <BlockCardSet items={RECEIVE_4B} lead="none" across={2} />
      </ContentSection>

      {/* 15 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={15} name={VARIATIONS[14]} fit="head 542 · body 3 × 136 + 2 × 64 = 536">
        Six linked icon cards route to their pages; no CtaRow (632 would overflow). Icon sets of up
        to six stay stacked on a phone.
      </Caption>
      <ContentSection
        arrangement="beside"
        eyebrow="Services"
        heading="Six services, one studio"
        headingId="kf-15"
        lead="Each can stand alone. Most clients start with one and add a second once the first has shipped."
        aside={<Aside id="studio-whiteboard-crit" />}
      >
        <BlockCardSet items={SERVICES_6} lead="none" across={2} />
      </ContentSection>

      {/* 16 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={16} name={VARIATIONS[15]} fit="head 411 · body 429">
        A pair at 3:2 in the two-thirds track; the head track takes the actions instead of an aside.
      </Caption>
      <ContentSection
        arrangement="beside"
        eyebrow="Selected work"
        heading="Two projects that changed how a team works"
        headingId="kf-16"
        lead="Both started as a redesign brief. Both ended with a different product model, and a team that owns it."
        actions={
          <CtaRow
            rule={false}
            emphasis="solid"
            tone="primary"
            actions={[
              { label: 'Start a project', href: ROUTES.contact },
              { label: 'All case studies', href: ROUTES.caseStudies },
            ]}
          />
        }
      >
        <BlockCardSet items={PAIR} lead="none" />
      </ContentSection>

      {/* 17 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={17} name={VARIATIONS[16]} fit="217 + 381 = 598">
        The middle item has no cover. With a stand-in pool, the set takes the first fitting studio
        photograph for it: never a hole, never an empty frame, never a label.
      </Caption>
      <ContentSection
        align="center"
        eyebrow="Insights"
        heading="Notes from the studio"
        headingId="kf-17"
        lead="What we learned on recent projects, written up while it was still fresh enough to be useful."
      >
        <BlockCardSet items={MIXED} lead="none" standIns={MIXED_STAND_INS} />
      </ContentSection>

      {/* 18 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={18} name={VARIATIONS[17]} fit="217 + 191 = 408">
        The same three items with standIns=&#123;false&#125;: every card drops its cover and the
        set renders as C-text, hairlines and all.
      </Caption>
      <ContentSection
        eyebrow="Insights"
        heading="Notes from the studio"
        headingId="kf-18"
        lead="What we learned on recent projects, written up while it was still fresh enough to be useful."
      >
        <BlockCardSet items={MIXED} lead="none" standIns={false} />
      </ContentSection>

      {/* 19 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={19} name={VARIATIONS[18]} fit="217 + 331 = 548">
        Any card may carry any kind. In a card the crop box rules every kind with one hairline and
        an 8 radius; Media draws no edge of its own.
      </Caption>
      <ContentSection
        align="center"
        eyebrow="Imagery"
        heading="Four kinds of card image"
        headingId="kf-19"
        lead="A photograph, an illustration, a capture and a cut-out, each cropped to the set's 16:9."
      >
        <BlockCardSet items={KINDS} lead="none" />
      </ContentSection>

      {/* 20 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={20} name={VARIATIONS[19]} fit="217 + 381 = 598">
        Resources with no covers yet. The pool covers every item, so each takes a stand-in in the
        page&rsquo;s tone family (§ 5.7), unlabelled, replaced when the real cover exists.
      </Caption>
      <ContentSection
        align="center"
        eyebrow="Resources"
        heading="Tools we use with clients"
        headingId="kf-20"
        lead="Free to download and use as they are. Each one came out of a real engagement."
      >
        <BlockCardSet items={RESOURCES} lead="none" standIns={RESOURCE_STAND_INS} />
      </ContentSection>

      {/* 21 ─────────────────────────────────────────────────────────────────────────────── */}
      <Caption n={21} name={VARIATIONS[20]} fit="217 + 301 = 518">
        Below 768 a linked set of more than three is a sideways row, one card in view and the next
        peeking; Tab moves it. 06 above, unlinked, stays stacked. Here with the arrow cue.
      </Caption>
      <ContentSection
        eyebrow="Audits"
        heading="Start with an audit"
        headingId="kf-21"
        lead="A fixed scope, a fixed fee, and findings ranked by what they cost you to leave alone."
      >
        <BlockCardSet items={LINKED_4} lead="none" />
      </ContentSection>
    </>
  );
}
