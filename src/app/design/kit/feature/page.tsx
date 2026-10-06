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

/** A head-track aside that fills its box: ContentSection `asideFill` sizes the box to end on the
    body's last line, and the photograph covers it at the head track's sizes (fix round 1). */
function Aside({ id }: { id: PhotoId }) {
  return <Media image={getKitPhoto(id)} fit="fill" sizes={HEAD_TRACK} />;
}

/** The four kinds a card cover can be (ch05 § 2, § 4; visual-direction § 5.2). */
/* Fix round 2: the illustration and the cut-out are CUT FOR THE PLACEMENT, as the capture already
   was. Shown whole at a 286 card, the full drawing was a 150-wide thumbnail with 4px labels and the
   whole workflow canvas set its UI text at 2px. Each is now one region at 16:9 or wider — the
   drawing's stacks and labels with the platform's foot cut, the canvas's run controls, the AI node's
   head and its provider row — so `contain` fills the well and the kind reads at card size. */
const KIND_ILLUSTRATION: BlockCardImage = {
  src: '/design/media/illustration-design-systems-card.svg',
  alt: '',
  width: 640,
  height: 360,
  kind: 'illustration',
};
/* One legible region, not the whole screen (fix round 1): at a 392 card the full 1436 capture set
   its text at about 7px. The region is the AI panel's benefit chips and their justification, cut at
   16:9 at its native pixels so nothing is resampled. */
const KIND_CAPTURE: BlockCardImage = {
  src: '/design/media/capture-listing-benefits.webp',
  alt: 'AI-suggested product benefits as chips, one open to show the review text that justifies it.',
  width: 392,
  height: 221,
  kind: 'capture',
};
const KIND_CUTOUT: BlockCardImage = {
  src: '/design/media/cutout-flow-card.png',
  alt: 'Workflow controls above an AI feature node, its provider set to Google.',
  width: 900,
  height: 454,
  kind: 'cut-out',
  shadow: true,
};

/* ── Copy ────────────────────────────────────────────────────────────────────────────────────
   Showcase copy in the Tcules voice (§ 8.4): invented, precise, calm. Every string is inside its
   § 1.5 ceiling — card titles ≤ 8 words, Card-3 bodies ≤ 14, Card-4 ≤ 12, text bodies ≤ 22 (≤ 14
   in a set of six), icon titles ≤ 5 and bodies ≤ 14 — so every band meets the fold by its copy,
   not by luck.

   Imagery (fix round 2): every photograph on this page appears ONCE. A showcase that put the same
   four photographs under two bands, and the same laptop pair under three, read as a template; 44
   catalogue frames cover 24 bands without a repeat, so each band carries its own. */

const SERVICES: readonly BlockCardSetItem[] = [
  {
    id: 'svc-product',
    title: 'Product design',
    body: 'From the first map of the work to the screens your team ships.',
    media: photo('screen-over-shoulder'),
    href: ROUTES.productDesign,
  },
  {
    id: 'svc-systems',
    title: 'Design systems',
    body: 'Tokens and components your engineers adopt because they are faster.',
    media: photo('pair-laptop-notebook'),
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

/* The wide lead: one case study given the 2:1 track, two beside it square — one cover height. */
const WIDE: readonly BlockCardSetItem[] = [
  {
    id: 'wd-underwriting',
    eyebrow: 'Insurance',
    title: 'Underwriting in one screen, not nine',
    body: 'The decision and its evidence side by side for the first time, in a tool underwriters asked to keep.',
    media: photo('conversation-chalkboard'),
    href: ROUTES.caseStudies,
  },
  {
    id: 'wd-search',
    eyebrow: 'Manufacturing',
    title: 'Search that knows the catalogue',
    body: 'Forty thousand parts, found by what engineers call them.',
    media: photo('wall-sketching-portrait'),
    href: ROUTES.caseStudies,
  },
  {
    id: 'wd-care',
    eyebrow: 'Healthcare',
    title: 'A care record nurses can scan',
    body: 'The six things a shift needs, first, on every patient.',
    media: photo('moodboard-wall-desk'),
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
    media: photo('sticky-notes-wall-dense'),
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
    media: photo('hand-mouse-detail'),
    href: ROUTES.uxProductAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'audit-system',
    title: 'Design-system audit',
    body: 'Which components drift, and what the drift costs.',
    media: photo('desk-flatlay-devices'),
    href: ROUTES.designSystemAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'audit-code',
    title: 'Design-to-code audit',
    body: 'Where the build departs from the design, and why.',
    media: photo('hands-trackpad'),
    href: ROUTES.designToCodeAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'audit-ai',
    title: 'AI product readiness',
    body: 'What an AI feature must show before people trust it.',
    media: photo('sticky-notes-mass'),
    href: ROUTES.aiProductUxReadiness,
    ctaLabel: 'See the audit',
  },
];

const CASES: readonly { title: string; body: string; image: PhotoId }[] = [
  {
    title: 'A pricing tool sales teams trust',
    body: 'Every number on screen traceable to the rule that produced it.',
    image: 'workshop-brick-room',
  },
  {
    title: 'Field inspections without the paper',
    body: 'An offline-first app for crews who work where signal does not.',
    image: 'office-calm-interior',
  },
  {
    title: 'Booking that survives a bad connection',
    body: 'Appointments made offline and settled when the signal returns.',
    image: 'workshop-sticky-sort',
  },
  {
    title: 'Onboarding a bank can audit',
    body: 'Every step a customer takes, recorded with the rule that allowed it.',
    image: 'designer-desk-monitor',
  },
  {
    title: 'Reports finance reads on Monday',
    body: 'Forty spreadsheets replaced by one view the team trusts.',
    image: 'sticky-wall-soft-focus',
  },
  {
    title: 'A design system across four products',
    body: 'One token layer, four brands, and a release every fortnight.',
    image: 'hands-sticky-blue-pen',
  },
];

/* The staggered pair: two ways in, the second dropped a section step (references § 3.4). */
const MODES: readonly BlockCardSetItem[] = [
  {
    id: 'md-project',
    title: 'A fixed-scope project',
    body: 'A defined problem, a fixed fee and a date. Discovery, design and build, handed over rehearsed.',
    media: photo('whiteboard-two-hands'),
    href: ROUTES.howWeWork,
    ctaLabel: 'How projects run',
  },
  {
    id: 'md-team',
    title: 'An embedded team',
    body: 'Designers and design engineers inside your roadmap, reviewing the work with you every week.',
    media: photo('pair-desk-through-plants'),
    href: ROUTES.services,
    ctaLabel: 'How teams embed',
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
  icon(
    'rc-model',
    'database',
    'A product model',
    'The records, their owners and the rules that bind them.',
  ),
  icon(
    'rc-flows',
    'layers',
    'Flows that hold',
    'Every path through the work, including the unhappy ones.',
  ),
  icon(
    'rc-set',
    'widget',
    'A component set',
    'Built once in code and documented where the team works.',
  ),
  icon(
    'rc-plan',
    'clipboard-check',
    'A handover plan',
    'What your team runs after us, written down and rehearsed.',
  ),
];

const RECEIVE_4B: readonly BlockCardSetItem[] = [
  icon(
    'rb-map',
    'users-group-rounded',
    'A map of the people',
    'Who touches the work, in which order, with what authority.',
  ),
  icon(
    'rb-risks',
    'shield-check',
    'Ranked risks',
    'What breaks first under load, and what it costs when it does.',
  ),
  icon(
    'rb-proto',
    'smartphone',
    'A tested prototype',
    'Real data in front of real users, before a line ships.',
  ),
  icon(
    'rb-roadmap',
    'flag',
    'A decided roadmap',
    'The next three releases, each with the decision it settles.',
  ),
];

/* Solid glyphs only (fix round 2): code, refresh and cpu are drawn as lines in Solar Bold and read
   as a second icon set beside the solid widget and server. Their solid forms carry the same
   meanings: code-square, refresh-square, and stars for AI. */
const SERVICES_6: readonly BlockCardSetItem[] = [
  icon(
    's6-product',
    'ruler-pen',
    'Product design',
    'From the first map of the work to the shipped screen.',
    ROUTES.productDesign,
  ),
  icon(
    's6-systems',
    'widget',
    'Design systems',
    'Tokens and components your engineers adopt willingly.',
    ROUTES.designSystems,
  ),
  icon(
    's6-ai',
    'stars',
    'AI product UX',
    'AI features that show their working, so people trust them.',
    ROUTES.aiProductUx,
  ),
  icon(
    's6-engineering',
    'code-square',
    'Design engineering',
    'Designers who ship in your codebase and review process.',
    ROUTES.designEngineering,
  ),
  icon(
    's6-software',
    'server',
    'Software development',
    'The build behind the design, held to the same standard.',
    ROUTES.softwareDevelopment,
  ),
  icon(
    's6-modern',
    'refresh-square',
    'Product modernisation',
    'An ageing product rebuilt around the work it supports.',
    ROUTES.productModernisation,
  ),
];

const PAIR: readonly BlockCardSetItem[] = [
  {
    id: 'pair-claims',
    title: 'Rebuilding a claims workflow around one record',
    body: 'Two teams, one customer, and the rule that settled which answer ships. Handling time fell by a third.',
    media: photo('desk-sketch-flatlay'),
    href: ROUTES.caseStudies,
  },
  {
    id: 'pair-system',
    title: 'A design system the engineers asked for',
    body: 'Tokens and components the product team adopted without being told to, across four products.',
    media: photo('pencil-wireframe-violet'),
    href: ROUTES.caseStudies,
  },
];

/** One input, two outcomes (§ 3.1): the middle item has no cover. */
const MIXED: readonly BlockCardSetItem[] = [
  {
    id: 'mx-guide',
    title: 'Scoping a modernisation without a rewrite',
    body: 'Find the decisions that slow a team down, and fix those first.',
    media: photo('hands-sketches-markers'),
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
    media: photo('pencil-wireframe-red'),
    href: ROUTES.articles,
  },
];
const MIXED_STAND_INS: readonly BlockCardImage[] = [getKitPhoto('studio-sticky-board-ux')];

const KINDS: readonly BlockCardSetItem[] = [
  {
    id: 'kind-photo',
    eyebrow: 'Photograph',
    title: 'The studio, as it is',
    body: 'Studio first, then stock. No frame of its own; the card rules it.',
    media: photo('studio-team-holi'),
  },
  {
    id: 'kind-illustration',
    eyebrow: 'Illustration',
    title: 'The argument, drawn',
    body: 'Unboxed everywhere else; in a card, ruled like the rest and cut to its region.',
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

/* M: three artefacts with no covers yet. `standIns="texture"` gives each the card's own texture
   cover with its glyph on it, the three fields in turn; `meta` and the download cue say what the
   file is before anyone opens it, so the band reads as things to take away, not more articles. */
const RESOURCES: readonly BlockCardSetItem[] = [
  {
    id: 'res-checklist',
    icon: 'clipboard-check',
    title: 'Reviewing an AI feature before launch',
    body: 'Twelve questions to answer before people are asked to trust it.',
    meta: 'Checklist · PDF · 4 pages',
    href: ROUTES.tools,
  },
  {
    id: 'res-template',
    icon: 'notebook',
    title: 'The decision log we use with clients',
    body: 'One page per decision: the question, the owner and the reason.',
    meta: 'Template · Notion',
    href: ROUTES.tools,
  },
  {
    id: 'res-guide',
    icon: 'document-text',
    title: 'Running a design crit that decides',
    body: 'How to end a review with fewer open questions than it started.',
    meta: 'Guide · PDF · 12 pages',
    href: ROUTES.guides,
  },
];

/* The spotlight: one case study with its cover, and two notes from it beside it. */
const SPOTLIGHT: readonly BlockCardSetItem[] = [
  {
    id: 'sp-lead',
    title: 'One record for a claims team of four hundred',
    body: 'Two systems gave two answers about one customer. We settled which ships, and handling time fell by a third.',
    media: photo('pair-at-laptop-sticky-wall'),
    href: ROUTES.caseStudies,
  },
  {
    id: 'sp-rule',
    eyebrow: 'What we learned',
    title: 'The rule that decides is the design',
    body: 'Most of the work was agreeing which system owns each fact. The screens followed in a fortnight.',
    href: ROUTES.caseStudies,
  },
  {
    id: 'sp-numbers',
    eyebrow: 'In numbers',
    title: 'Eleven screens became four',
    body: 'One place to look and one place to decide. Support tickets halved within the quarter.',
    href: ROUTES.caseStudies,
  },
];

/* The phone row: four linked TEXT cards (fix round 2). The audit band above already shows four
   covered cards; this one shows that the rule is about links, not covers — and repeats no image. */
const LINKED_4: readonly BlockCardSetItem[] = AUDITS.map((item) => ({
  ...item,
  media: undefined,
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
  'C-image-3 · display · centred · whole-card links',
  'C-spotlight · 2:1 lead beside a stacked pair',
  'C-image-3 · H-row with a section action',
  'C-wide · a 2:1 lead and two squares, one height',
  'C-image-3 · display H-compact · per-card CTA',
  'C-image-3 · display H-title · CtaRow, one-line titles',
  'C-image-3 · unlinked, numbered, no CTA',
  'C-image-4 · H-row · lead none · numbered',
  'C-image-4 · display H-compact · per-card CTA',
  'C-image-6 · Slider showing three',
  'C-pair · staggered, text beside',
  'C-text-3 · hairline + index, unlinked',
  'C-text-3 · H-row · per-card CTA',
  'C-text-3 · whole-card links · on tint',
  'C-text-6 · two-line bodies',
  'C-icon-4 · beside head + photo aside',
  'C-icon-4 · CtaRow under the grid',
  'C-icon-6 · photo aside · whole-card links',
  'C-pair · beside head with actions',
  'Mixed set · a stand-in fills the gap',
  'Mixed set · standIns={false} · C-text',
  'Card images · four kinds',
  'M resources · texture covers · download + format',
  'Phone · a linked set of four scrolls',
] as const;

/** The band's heading id and its caption number, from its place in VARIATIONS. */
const kf = (n: number) => `kf-${String(n).padStart(2, '0')}`;

/**
 * /design/kit/feature — the Feature family (C) and resources (M) of the Tcules UI kit.
 *
 * Every variation is a live ContentSection band composed from BlockCardSet / BlockCard, exactly as
 * a page composes it, so each band can be read at 1470 × 830 against § 1.4's arithmetic. The
 * numbers in each caption are the band's budgeted content height (target ≤ 638 at default
 * density). Feature sets pass `lead="none"` unless they are one of the three asymmetric shapes —
 * the spotlight (`beside`), the wide lead (`wide`) and the staggered pair (`stagger`) — which the
 * order below puts between the equal rows, so no two neighbouring bands are the same rectangle.
 *
 * Heads: centred H-compact and H-title heads take headingSize="display" (fix round 2), so the
 * head-to-card scale gap is the references' ~70 over 22–28; H-row and beside heads keep h2, where
 * the head shares its row with a lead or a body.
 */
export default function FeatureKitSpecimen() {
  return (
    <>
      <PageHero
        eyebrow="Tcules UI kit"
        title="Feature sections"
        body={[
          'Card sets that carry a band: image, text, icon, pair and three asymmetric shapes, each composed from BlockCardSet on ContentSection. Blue marks the way through; the words stay ink.',
        ]}
      >
        <Texture>
          <TextureShape
            top={-220}
            right={-160}
            width="40%"
            height={420}
            kind="ellipse"
            blur={200}
          />
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

      <Caption n={1} name={VARIATIONS[0]} fit="display head · 3-up 381">
        ContentSection headingSize=&quot;display&quot;: the band&rsquo;s h2 at the display role,
        so the head sits three rungs over its cards. Whole-card links; each title ends in the
        blue arrow, and on hover the title joins it and the cover leans in.
      </Caption>
      <ContentSection
        align="center"
        headingSize="display"
        eyebrow="Services"
        heading="Three ways we help"
        headingId={kf(1)}
        lead="Each one starts with the work your team does, and ends with a product that supports it."
      >
        <BlockCardSet items={SERVICES} lead="none" />
      </ContentSection>

      <Caption n={2} name={VARIATIONS[1]} fit="133 + 505 = 638">
        BlockCardSet lead=&quot;beside&quot;: the first card takes a 2:1 track at 21:9 and the
        lg step; the rest stack beside it as text notes. Where the notes run taller than the
        lead (at 1024), its cover grows to meet them rather than leaving a strip under it.
      </Caption>
      <ContentSection
        eyebrow="Selected work"
        heading="One project, three ways in"
        headingId={kf(2)}
      >
        <BlockCardSet items={SPOTLIGHT} lead="beside" />
      </ContentSection>

      <Caption n={3} name={VARIATIONS[2]} fit="190 + 381 = 571">
        The H-row: heading beside the lead, the section&rsquo;s one action a block under it, the
        set full column beneath.
      </Caption>
      <ContentSection
        arrangement="split-head"
        eyebrow="Recent work"
        heading="Work that held up in use"
        headingId={kf(3)}
        lead="Three products we designed and built with their teams, measured after launch rather than at handover."
        actions={
          <CtaRow
            rule={false}
            actions={[{ label: 'All case studies', href: ROUTES.caseStudies }]}
          />
        }
      >
        <BlockCardSet items={WORK} lead="none" />
      </ContentSection>

      <Caption n={4} name={VARIATIONS[3]} fit="163 + 453 = 616">
        BlockCardSet lead=&quot;wide&quot;: from 1024, [2, 1, 1] tracks with the lead at 2:1 and
        its companions square. A 2fr track is two 1fr tracks and a gutter, so 2:1 of it is 1:1
        of a 1fr: one cover height across the row, and the size contrast comes from the track,
        not a box.
      </Caption>
      <ContentSection
        headingSize="display"
        eyebrow="Case studies"
        heading="Three products, in use"
        headingId={kf(4)}
      >
        <BlockCardSet items={WIDE} lead="wide" />
      </ContentSection>

      <Caption n={5} name={VARIATIONS[4]} fit="display head · 381 + 64">
        Each card names its own destination in a blue link under the copy; the title stays ink.
      </Caption>
      <ContentSection
        align="center"
        headingSize="display"
        eyebrow="Engagements"
        heading="Pick a starting point"
        headingId={kf(5)}
      >
        <BlockCardSet items={ENGAGEMENTS} lead="none" cue="cta" />
      </ContentSection>

      <Caption n={6} name={VARIATIONS[5]} fit="display head · 347 + 96">
        Unlinked cards with one-line titles, and the band&rsquo;s ask in a CtaRow a stack below.
      </Caption>
      <ContentSection
        headingSize="display"
        eyebrow="The craft"
        heading="What we do every week"
        headingId={kf(6)}
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
        <BlockCardSet items={CRAFT} lead="none" numbered label="The craft" />
      </ContentSection>

      <Caption n={7} name={VARIATIONS[6]} fit="display head · 381">
        No link and no CTA: the set describes, it does not route. Studio photographs, our own.
        On a phone the row scrolls and, holding nothing focusable, takes the tab stop under its
        label.
      </Caption>
      <ContentSection
        align="center"
        headingSize="display"
        eyebrow="A working week"
        heading="How a week runs"
        headingId={kf(7)}
        lead="Three fixed points hold the week together, whatever else the project needs."
      >
        <BlockCardSet items={WEEK} lead="none" numbered label="A working week" />
      </ContentSection>

      <Caption n={8} name={VARIATIONS[7]} fit="264 + 301 = 565">
        Four across at 286, h5 over body-sm, 16:9, from 1024 (a 2×2 only between 768 and 1023).
        lead=&quot;none&quot;: no card is featured in a feature band.
      </Caption>
      <ContentSection
        arrangement="split-head"
        eyebrow="The studio"
        heading="A small studio that works in the open"
        headingId={kf(8)}
        lead="Eighteen designers and design engineers in one room, reviewing work daily rather than at milestones."
      >
        <BlockCardSet items={STUDIO} lead="none" numbered label="The studio" />
      </ContentSection>

      <Caption n={9} name={VARIATIONS[8]} fit="display head · 301 + 64">
        Four linked cards with per-card links. On a phone the row scrolls sideways, bleeding to
        the screen edge with the next card peeking.
      </Caption>
      <ContentSection
        align="center"
        headingSize="display"
        eyebrow="Audits"
        heading="Fixed-scope product audits"
        headingId={kf(9)}
        lead="Two to three weeks each, with a ranked list of findings your team can act on."
      >
        <BlockCardSet items={AUDITS} lead="none" cue="cta" />
      </ContentSection>

      <Caption n={10} name={VARIATIONS[9]} fit="display head · 381 + 64">
        Five or more image cards never wrap to a second row (826): they become a Slider showing
        three, composed around BlockCards by the page.
      </Caption>
      <ContentSection
        headingSize="display"
        eyebrow="Case studies"
        heading="More of the work"
        headingId={kf(10)}
      >
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

      <Caption n={11} name={VARIATIONS[10]} fit="head 240 · body 96 + 493 = 589">
        BlockCardSet stagger: from 1024 the second card drops a section step (Layout stagger, a
        track rather than a margin), so the pair reads as placed by hand beside its head, not
        tiled.
      </Caption>
      <ContentSection
        arrangement="beside"
        eyebrow="Ways to work"
        heading="Two ways to work with us"
        headingId={kf(11)}
        lead="Most clients start with a fixed-scope piece, then keep a team on once the first release has shipped."
      >
        <BlockCardSet items={MODES} lead="none" cue="cta" stagger />
      </ContentSection>

      <Caption n={12} name={VARIATIONS[11]} fit="display head · 217">
        A text card takes a hairline at its own top edge, the width of the card, then 24 to a
        blue index. The gutter breaks the rule, so it reads as three objects, not a table.
      </Caption>
      <ContentSection
        align="center"
        headingSize="display"
        eyebrow="Principles"
        heading="Three things we hold to"
        headingId={kf(12)}
        lead="They decide what we do first on every project, and what we refuse to skip when time is short."
      >
        <BlockCardSet items={PRINCIPLES} lead="none" numbered />
      </ContentSection>

      <Caption n={13} name={VARIATIONS[12]} fit="190 + 217 + 64 = 471">
        Text cards with an eyebrow and their own named link.
      </Caption>
      <ContentSection
        arrangement="split-head"
        eyebrow="Further reading"
        heading="Where to read next"
        headingId={kf(13)}
        lead="Three pieces from the studio on the decisions underneath the screens, at three lengths."
      >
        <BlockCardSet items={READING} lead="none" cue="cta" />
      </ContentSection>

      <Caption n={14} name={VARIATIONS[13]} fit="display head · 217">
        Surface proof — on pages, tint is the proof band only (§ 1.7). Whole-card links on text
        cards take the arrow cue.
      </Caption>
      <ContentSection
        align="center"
        surface="tint"
        headingSize="display"
        eyebrow="Expertise"
        heading="Where we work best"
        headingId={kf(14)}
        lead="Products where a wrong screen costs real money, real time or real trust."
      >
        <BlockCardSet items={WHERE} lead="none" cue="arrow" />
      </ContentSection>

      <Caption n={15} name={VARIATIONS[14]} fit="display head · 2 × 191 + 64">
        Six text cards, two rows of three, bodies held to two lines.
      </Caption>
      <ContentSection
        headingSize="display"
        eyebrow="Method"
        heading="Six steps, in this order"
        headingId={kf(15)}
      >
        <BlockCardSet items={METHOD} lead="none" numbered />
      </ContentSection>

      <Caption n={16} name={VARIATIONS[15]} fit="head 240 + 48 + aside · body 2 × 136 + 48">
        C-icon always carries a photograph in its head track, and never actions there. The photo
        ends on the grid&rsquo;s last line (asideFill). Icon cards are h5 and body-sm whatever
        the set is told: size is not an option for them.
      </Caption>
      <ContentSection
        arrangement="beside"
        eyebrow="What you receive"
        heading="Four things you keep"
        headingId={kf(16)}
        asideFill
        aside={<Aside id="designer-monitor-ui" />}
      >
        <BlockCardSet items={RECEIVE_4} lead="none" across={2} />
      </ContentSection>

      <Caption n={17} name={VARIATIONS[16]} fit="head 542 · body 320 + 96">
        C-icon-4 may close on a CtaRow under the grid. The head track still carries only the
        photo.
      </Caption>
      <ContentSection
        arrangement="beside"
        eyebrow="Discovery"
        heading="What the first month leaves you"
        headingId={kf(17)}
        lead="Four weeks, four artefacts, and a decision about whether to go further, made with you."
        asideFill
        aside={<Aside id="sticky-grid-minimal" />}
        footer={
          <CtaRow actions={[{ label: 'Plan a discovery month', href: ROUTES.contact }]} />
        }
      >
        <BlockCardSet items={RECEIVE_4B} lead="none" across={2} />
      </ContentSection>

      <Caption n={18} name={VARIATIONS[17]} fit="head 542 · body 3 × 136 + 2 × 48 = 504">
        Six linked icon cards route to their pages; no CtaRow. Rows sit on their content, one
        beat apart. Solid glyphs only. On a phone, linked and more than three, the set is a
        sideways row.
      </Caption>
      <ContentSection
        arrangement="beside"
        eyebrow="Services"
        heading="Six services, one studio"
        headingId={kf(18)}
        lead="Each can stand alone. Most clients start with one and add a second once the first has shipped."
        asideFill
        aside={<Aside id="desk-minimal-white" />}
      >
        <BlockCardSet items={SERVICES_6} lead="none" across={2} />
      </ContentSection>

      <Caption n={19} name={VARIATIONS[18]} fit="head 411 · body 429">
        A pair at 3:2 in the two-thirds track; the head track takes the actions instead of an
        aside.
      </Caption>
      <ContentSection
        arrangement="beside"
        eyebrow="Selected work"
        heading="Two projects that changed how a team works"
        headingId={kf(19)}
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

      <Caption n={20} name={VARIATIONS[19]} fit="display head · 381">
        The middle item has no cover. With a stand-in pool, the set takes the first fitting
        studio photograph for it: never a hole, never an empty frame, never a label.
      </Caption>
      <ContentSection
        align="center"
        headingSize="display"
        eyebrow="Insights"
        heading="Notes from the studio"
        headingId={kf(20)}
        lead="What we learned on recent projects, written up while it was still fresh enough to use."
      >
        <BlockCardSet items={MIXED} lead="none" standIns={MIXED_STAND_INS} />
      </ContentSection>

      <Caption n={21} name={VARIATIONS[20]} fit="217 + 191 = 408">
        The same three items with standIns=&#123;false&#125;: every card drops its cover and the
        set renders as C-text, hairlines and all.
      </Caption>
      <ContentSection
        eyebrow="Insights"
        heading="Notes from the studio"
        headingId={kf(21)}
        lead="What we learned on recent projects, written up while it was still fresh enough to use."
      >
        <BlockCardSet items={MIXED} lead="none" standIns={false} />
      </ContentSection>

      <Caption n={22} name={VARIATIONS[21]} fit="display head · 301">
        Any card may carry any kind. In a card the crop box rules every kind with one hairline
        and an 8 radius; Media draws no edge of its own. The illustration and the cut-out are
        cut to one region for the card and shown whole inside it, an 8 inset off the rule.
      </Caption>
      <ContentSection
        align="center"
        headingSize="display"
        eyebrow="Imagery"
        heading="Four kinds of card image"
        headingId={kf(22)}
        lead="A photograph, an illustration, a capture and a cut-out in the set's 16:9 box."
      >
        <BlockCardSet items={KINDS} lead="none" numbered label="Four kinds of card image" />
      </ContentSection>

      <Caption n={23} name={VARIATIONS[22]} fit="display head · 381 + 64">
        Resources with no covers yet. standIns=&quot;texture&quot; gives each the card&rsquo;s
        own texture cover — the grid at full strength over half the box, the glyph large in its
        corner — and the download cue and a format line say what the file is before it is
        opened.
      </Caption>
      <ContentSection
        align="center"
        headingSize="display"
        eyebrow="Resources"
        heading="Tools we use with clients"
        headingId={kf(23)}
        lead="Free to use as they are. Each one came out of a real engagement."
      >
        <BlockCardSet items={RESOURCES} lead="none" standIns="texture" cue="download" />
      </ContentSection>

      <Caption n={24} name={VARIATIONS[23]} fit="190 + 217 = 407">
        Below 768 a linked set of more than three is a sideways row, one card in view and the
        next peeking past the screen edge; Tab moves it. The rule is about links, not covers:
        these are text cards. Short unlinked text and icon sets (12, 16) stay stacked.
      </Caption>
      <ContentSection
        arrangement="split-head"
        eyebrow="Audits"
        heading="Start with an audit"
        headingId={kf(24)}
        lead="A fixed scope, a fixed fee, and findings ranked by what they cost you to leave alone."
      >
        <BlockCardSet items={LINKED_4} lead="none" cue="arrow" />
      </ContentSection>
    </>
  );
}
