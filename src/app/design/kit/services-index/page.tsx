import type { Metadata } from 'next';

import { Media, TextureClosing, TextureHorizon, type IconName } from '@/components';
import { getIdealServiceStory } from '@/content';
import {
  Accordion,
  Banner,
  BlockCardSet,
  Breadcrumbs,
  Contrast,
  ContentSection,
  ContentSectionText,
  CtaRow,
  CtaSection,
  PageHero,
  Proof,
  Statement,
  type AccordionItem,
  type BlockCardSetItem,
  type CtaPoint,
  type ProofQuote,
  type ProofRating,
} from '@/patterns';
import { HEAD_TRACK } from '@/lib/image-sizes';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { ROUTES } from '@/lib/routes';
import { heroTrail } from '@/lib/trail';

export const metadata: Metadata = {
  title: 'Services · kit showcase | Design',
  robots: { index: false, follow: false },
};

/**
 * /design/kit/services-index — the services index composed from the finished Tcules UI kit
 * (visual-direction § 8.3). Eleven bands, the COOL family (cool + neutral photographs only, no vivid
 * frame), showcase copy written inline (§ 8.4):
 *
 *    1  A      the trail and the title-led hero: title and lead in three fifths, the ask on the
 *              lead's last line, then a 4:1 panorama of the studio at work across the column. Fix
 *              round 1: the no-media hero's pale field read as a faded placeholder, and its 2:1
 *              block at 390 was ~200 of near-empty dots in the first screen
 *    2  C-icon the router: six linked services beside a head and its photograph
 *    3  J      one sentence at display scale, the head-half field in its empty top-end corner — in
 *              place of a second icon grid straight after the router (fix round 1)
 *    4  C      four fixed-scope audits, centred display head, per-card links
 *    5  N      who the work is for: the page's media split, the photograph at the start and the
 *              two lists beside it (fix round 1: two ruled lists alone read as a document)
 *    6  C-pair two cases beside a head with its action; `horizon` at its foot, above the tint band
 *    7  G      rating-led on tint: the real Clutch score beside the real approved quote, the score in
 *              the stat voice every other figure takes. Its eyebrow starts rather than centres
 *    8  K      the offer, people at a workshop table at the end
 *    9  D-faq  the questions, centred, before the last image band
 *   10  I      one 3:1 photograph under its H-row
 *   11  L      the open close: a centred display ask over the closing equaliser, both sides — the
 *              index answers "which service?" with a conversation, so its close is two asks, not a
 *              form (the home and about closes carry the forms)
 *
 * Texture: head-half on J, horizon above G, closing on L — three, never adjacent (§ 6.4), and none
 * of them the stepped staircase the home hero carries. Proof is real where it is shown with the real
 * score (§ 5.8): the product-design story's approved quote, read through the content seam, with no
 * portrait. Media sides alternate: N start, K end.
 */

const photo = (id: PhotoId) => getKitPhoto(id);
const cover = (id: PhotoId, standIn = false): BlockCardSetItem['media'] => ({
  type: 'image',
  image: getKitPhoto(id, standIn ? { standIn: true } : {}),
});

/* ── The real proof, read through the seam ─────────────────────────────────────────────────── */
function realProof() {
  const story = getIdealServiceStory('product-design');
  let quote: ProofQuote | undefined;
  let rating: ProofRating | undefined;
  for (const section of story?.sections ?? []) {
    if (!('blocks' in section)) continue;
    for (const block of section.blocks) {
      if (block.kind === 'proof') {
        quote = {
          quoteHtml: `<p>${block.quote.text}</p>`,
          name: block.quote.name,
          role: block.quote.role,
          company: block.quote.company,
        };
        if (block.rating) rating = { ...block.rating };
      }
      if (block.kind === 'logos' && block.rating && !rating) rating = { ...block.rating };
    }
  }
  return { quote, rating };
}

/* ── 2 · C-icon-6 ──────────────────────────────────────────────────────────────────────────
   Icon cards: titles ≤ 5 words, bodies ≤ 14. One solid silhouette family, every glyph blue. */
const icon = (
  id: string,
  name: IconName,
  title: string,
  body: string,
  href: string,
): BlockCardSetItem => ({ id, icon: name, title, body, href });

const SERVICES: readonly BlockCardSetItem[] = [
  icon(
    'si-product',
    'ruler-pen',
    'Product design',
    'When the product works in a demo and fights the people using it.',
    ROUTES.productDesign,
  ),
  icon(
    'si-systems',
    'layers',
    'Design systems',
    'When every team rebuilds the same table, each a little differently.',
    ROUTES.designSystems,
  ),
  icon(
    'si-ai',
    'stars',
    'AI product UX',
    'When an AI feature impresses once, then loses trust in daily use.',
    ROUTES.aiProductUx,
  ),
  icon(
    'si-engineering',
    'monitor',
    'Design engineering',
    'When the design changes shape between the file and the build.',
    ROUTES.designEngineering,
  ),
  icon(
    'si-software',
    'database',
    'Software development',
    'When you need the build itself, held to the standard the design set.',
    ROUTES.softwareDevelopment,
  ),
  icon(
    'si-modern',
    'shield-check',
    'Product modernisation',
    'When the product is old enough that every change feels like a risk.',
    ROUTES.productModernisation,
  ),
];

/* ── 4 · C-image-4 ─────────────────────────────────────────────────────────────────────────
   Card-4: titles ≤ 8, bodies ≤ 12; per-card links, so no audit reads as recommended. */
const AUDITS: readonly BlockCardSetItem[] = [
  {
    id: 'si-audit-ux',
    title: 'UX product audit',
    body: 'Where the live product loses people, ranked by what it costs.',
    media: cover('hands-sticky-blue-pen'),
    href: ROUTES.uxProductAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'si-audit-system',
    title: 'Design system audit',
    body: 'Drift between file, code and production, product by product.',
    media: cover('desk-flatlay-devices'),
    href: ROUTES.designSystemAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'si-audit-code',
    title: 'Design-to-code audit',
    body: 'Every place the build disagrees with the design, and why.',
    media: cover('pencil-wireframe-violet'),
    href: ROUTES.designToCodeAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'si-audit-ai',
    title: 'AI product UX readiness',
    body: 'Whether an AI feature is ready for the people who must trust it.',
    media: cover('whiteboard-pair-laptop'),
    href: ROUTES.aiProductUxReadiness,
    ctaLabel: 'See the audit',
  },
];

/* ── 5 · N ─────────────────────────────────────────────────────────────────────────────────
   Three items a side, ≤ 12 words each, so the two lists sit in the 667 beside the 4:5 photograph. */
const FOR_YOU = {
  heading: 'Right for you if',
  items: [
    'A product in use, and a decision about it nobody can settle',
    'Your engineers want to be in the room, not handed a file',
    'You would rather see it working than read a strategy deck',
  ],
} as const;
const NOT_FOR_YOU = {
  heading: 'Not the right fit when',
  items: [
    'The brief is visual styling, with behaviour out of bounds',
    'Nothing realistic about the product can be shared',
    'What you need most is low-cost production capacity',
  ],
} as const;

/* The overhead table: laptops, notebooks and hands, cool daylight. Anchored on the table's centre so
   the 4:5 and the phone's 4:3 both keep the hands. */
const FIT_PHOTO = { ...photo('team-overhead-laptops'), focus: { x: 0.5, y: 0.55 } };

/* ── 6 · C-pair ────────────────────────────────────────────────────────────────────────────
   Pair cards: titles ≤ 8, bodies ≤ 20. Stand-in covers from the cool family (§ 5.7), unlabelled. */
const CASES: readonly BlockCardSetItem[] = [
  {
    id: 'si-case-underwriting',
    eyebrow: 'Insurance · Product design',
    title: 'Underwriting in one screen',
    body: 'The decision and its evidence side by side for the first time, in a tool underwriters asked to keep.',
    media: cover('conversation-chalkboard', true),
    href: ROUTES.caseStudies,
  },
  {
    id: 'si-case-catalogue',
    eyebrow: 'Manufacturing · Modernisation',
    title: 'Forty thousand parts, one search',
    body: 'Found by the names engineers actually use, and rebuilt without a freeze on releases.',
    media: cover('wall-sketching-portrait', true),
    href: ROUTES.caseStudies,
  },
];

/* ── 8 · K ─────────────────────────────────────────────────────────────────────────────────
   One-line points, ≤ 4 / ≤ 12 words, numbered: they happen in this order. */
const SPRINT_POINTS = [
  { label: 'Eight stakeholder interviews' },
  { label: 'A concept tested with five users' },
  { label: 'A recommendation, with a price' },
] as const satisfies readonly CtaPoint[];

/* ── 9 · D-faq ─────────────────────────────────────────────────────────────────────────────
   Five questions at most, each ≤ 12 words. */
const FAQ: readonly AccordionItem[] = [
  {
    question: 'How do we know which service we need?',
    answerHtml:
      '<p>Usually you do not have to. Describe the decision that is stuck, and the first call settles which service fits it, or whether a fixed-scope audit should come first.</p>',
  },
  {
    question: 'Can we combine services in one engagement?',
    answerHtml:
      '<p>Most engagements do. The same team carries research into design, design into a system and the system into code, so combining them adds no handover.</p>',
  },
  {
    question: 'How long does a typical engagement run?',
    answerHtml:
      '<p>A first phase runs two to six weeks. Teams that continue usually keep us for two or three releases, then run the work themselves.</p>',
  },
  {
    question: 'Do you work with our in-house designers and engineers?',
    answerHtml:
      '<p>Always. We work inside your team’s tools and rituals, and leave them owning everything we made together.</p>',
  },
  {
    question: 'What does a fixed first phase cost?',
    answerHtml:
      '<p>It depends on the scope, and the scope is agreed before we start, so the price is fixed before the first interview is booked.</p>',
  },
];

/* ── 11 · L ────────────────────────────────────────────────────────────────────────────────
   The open close: point labels ≤ 4 words, details ≤ 12. */
const NEXT: readonly CtaPoint[] = [
  {
    label: 'Tell us the problem',
    detail: 'Not the service: what is stuck, and what it costs you.',
  },
  {
    label: 'Meet the lead',
    detail: 'Thirty minutes with the principal who would run the work.',
  },
  {
    label: 'Get a fixed proposal',
    detail: 'Scope, team and price on one page, within a week.',
  },
];

const TITLE = 'One studio, six ways in';

export default function KitServicesIndexPage() {
  const { quote, rating } = realProof();

  return (
    <>
      {/* 1 · A — title-led: the split header, then the studio at work in a 4:1 panorama. */}
      <PageHero
        data-band="A"
        data-fold-hero=""
        trail={heroTrail(
          [
            { label: 'Home', href: ROUTES.home },
            { label: 'Services', href: ROUTES.services },
          ],
          TITLE,
          (trail) => (
            <Breadcrumbs {...trail} />
          ),
        )}
        title={TITLE}
        body={['Design, systems, engineering and modernisation, run as one practice.']}
        actions={[
          { label: 'Book an intro call', href: ROUTES.contact },
          { label: 'Find your service', href: '#si-services' },
        ]}
        arrangement="display"
        media={{
          type: 'image',
          ratio: { base: '3/2', lg: '4/1' },
          image: { ...photo('office-team-desks'), focus: { x: 0.55, y: 0.4 } },
        }}
      />

      {/* 2 · C-icon-6 — the router, the photograph ending on the grid's last line. */}
      <ContentSection
        data-band="C-icon"
        arrangement="beside"
        eyebrow="The services"
        heading="Start from the problem"
        headingId="si-services"
        lead="Each service has its own page. Most teams start with one, then add a second once it ships."
        asideFill
        aside={<Media image={photo('screen-over-shoulder')} fit="fill" sizes={HEAD_TRACK} />}
      >
        <BlockCardSet items={SERVICES} lead="none" across={2} />
      </ContentSection>

      {/* 3 · J — what every service shares, in one sentence; the head-half field. */}
      <Statement
        id="si-shared"
        eyebrow="Across every service"
        size="display"
        texture="head-half"
        actions={
          <CtaRow rule={false} actions={[{ label: 'How we work', href: ROUTES.howWeWork }]} />
        }
      >
        Whichever door you use, the same team ships it.
      </Statement>

      {/* 4 · C-image-4 — the fixed-scope audits, centred, a link on each. */}
      <ContentSection
        data-band="C-image"
        align="center"
        headingSize="display"
        eyebrow="Fixed-scope audits"
        heading="Not ready for a project?"
        headingId="si-audits"
        lead="Two to three weeks each, ending in a ranked list your team can act on alone."
      >
        <BlockCardSet items={AUDITS} lead="none" cue="cta" />
      </ContentSection>

      {/* 5 · N — who the work is for, beside the overhead table at the start. */}
      <ContentSection
        data-band="N"
        arrangement="media"
        media={{ image: FIT_PHOTO, side: 'start', head: 'title' }}
        eyebrow="Fit"
        heading="Who this work is for"
        headingId="si-fit"
        lead="We say no often, and early, so the projects we take are ones we can finish well."
      >
        <Contrast yes={FOR_YOU} no={NOT_FOR_YOU} />
      </ContentSection>

      {/* 6 · C-pair — two cases; horizon at the foot, above the tint band. */}
      <ContentSection
        data-band="C-pair"
        arrangement="beside"
        eyebrow="Selected work"
        heading="Two services, two products, in use"
        headingId="si-work"
        lead="Both started as a redesign brief. Both ended with a different product model and a team that owns it."
        actions={
          <CtaRow
            rule={false}
            actions={[{ label: 'All case studies', href: ROUTES.caseStudies }]}
          />
        }
        texture={<TextureHorizon />}
      >
        <BlockCardSet items={CASES} lead="none" />
      </ContentSection>

      {/* 7 · G — the real score and the real quote, on the one tint band. */}
      {quote && rating ? (
        <ContentSection data-band="G-rating" surface="tint" eyebrow="Independent reviews">
          <Proof arrangement="rating" rating={rating} quote={quote} />
        </ContentSection>
      ) : null}

      {/* 8 · K — the offer, its quiet photograph at the end. */}
      <CtaSection
        data-band="K"
        arrangement="offer"
        eyebrow="Discovery sprint"
        heading="Two weeks to a decision your team can defend"
        body={[
          'For when the brief is still an argument. You leave with evidence, a direction and a price for it.',
        ]}
        points={SPRINT_POINTS}
        actions={[
          { label: 'Plan a sprint', href: ROUTES.contact },
          { label: 'How discovery works', href: ROUTES.howWeWork },
        ]}
        media={{
          image: { ...photo('team-table-writing'), focus: { x: 0.42, y: 0.5 } },
          side: 'end',
        }}
      />

      {/* 9 · D-faq — centred, then the image band, then the close. */}
      <ContentSection
        data-band="D-faq"
        align="center"
        eyebrow="Choosing a service"
        heading="What teams ask before they pick"
        headingId="si-faq"
      >
        <ContentSectionText>
          <Accordion items={FAQ} />
        </ContentSectionText>
      </ContentSection>

      {/* 10 · I — one 3:1 photograph under its H-row. */}
      <Banner
        eyebrow="Engagements"
        heading="Most work starts at one screen"
        headingId="si-desk"
        lead="A principal and your product owner, one afternoon, and the decision that has been waiting longest."
        actions={
          <CtaRow
            rule={false}
            actions={[{ label: 'See how we work', href: ROUTES.howWeWork }]}
          />
        }
        image={{ ...photo('pair-laptop-pointing'), focus: { x: 0.45, y: 0.55 } }}
      />

      {/* 11 · L — the open close: centred, two asks, the equaliser on both sides. */}
      <CtaSection
        data-band="L"
        arrangement="open"
        eyebrow="Start a project"
        heading="Not sure which service? Start here"
        body={[
          'Describe what is not working. We will tell you which service fits, or whether you need one at all.',
        ]}
        points={NEXT}
        actions={[
          { label: 'Book an intro call', href: ROUTES.contact },
          { label: 'Write to the studio', href: 'mailto:hello@tcules.com' },
        ]}
        texture={<TextureClosing side="both" />}
      />
    </>
  );
}
