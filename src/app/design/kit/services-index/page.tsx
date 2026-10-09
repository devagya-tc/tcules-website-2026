import type { Metadata } from 'next';

import { Layout, Media, TextureHorizon, type IconName } from '@/components';
import { getIdealServiceStory } from '@/content';
import {
  Accordion,
  BlockCardSet,
  Breadcrumbs,
  Contrast,
  ContentSection,
  ContentSectionText,
  CtaRow,
  CtaSection,
  ListCard,
  PageHero,
  Proof,
  type AccordionItem,
  type BlockCardSetItem,
  type CtaPoint,
  type ProofQuote,
  type ProofRating,
} from '@/patterns';
import { MEDIA_SPLIT, MEDIA_SPLIT_WIDE } from '@/lib/image-sizes';
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
 *    1  A      the trail and the no-media hero, the `hero-field` stepping up to the column's end
 *              from 1024 (§ 8.3); below 1024 it is not drawn (§ 3.7 item 5). Fix round 2: the
 *              title-led panorama moved to the about page, so no two showcase heroes share a shape
 *    2  C-icon the router: six linked services beside a head and its 1:1 photograph at the head
 *              track's full width (fix round 2: a 380 × 214 fill under the lead was a postage stamp)
 *    3  C      four fixed-scope audits, centred display head, per-card links
 *    4  B      what every service shares: the media split, the designer at the wall at the END
 *              and four tiles — in place of the J statement, which repeated home's (§ 8.3: B)
 *    5  N      who the work is for: a stacked head, then the two lists across the full column, the
 *              needs two up (Contrast `yes`). Fix round 2: in the media split's 667 the lists
 *              were 256 at 1024, every item three lines, and the band 852 tall
 *    6  C-pair two cases with their products on screen; `horizon` at its foot, above the tint band
 *    7  G      rating-led on tint: the real Clutch score beside the real approved quote. Its
 *              eyebrow starts rather than centres
 *    8  K      the offer, the team at the whiteboard at the end
 *    9  D-faq  the questions, centred
 *   10  I      THE IMAGE MOMENT as a photo pair: a 16:9 and a 3:2 side by side, bottoms level,
 *              under a start-set head — home's is one 3:1 under its stacked head and about's a beside
 *              banner, so no showcase page repeats another's
 *   11  L      the open close: a centred display ask over the closing equaliser, both sides — the
 *              index answers "which service?" with a conversation, so its close is two asks, not a
 *              form (the home and about closes carry the forms)
 *
 * Texture: hero-field on A, horizon above G, closing on L — three, never adjacent (§ 6.4). Proof is
 * real where it is shown with the real score (§ 5.8): the product-design story's approved quote,
 * read through the content seam, with no portrait. Media sides alternate: C-icon start, B end,
 * K end, the pair centred. Every photograph is people at work or the product on a screen, sharp
 * and in the cool family (fix round 2).
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
    media: cover('pencil-wireframe-violet'),
    href: ROUTES.designSystemAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'si-audit-code',
    title: 'Design-to-code audit',
    body: 'Every place the build disagrees with the design, and why.',
    media: cover('designer-tablet-monitor'),
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

/* ── 4 · B ─────────────────────────────────────────────────────────────────────────────────
   What every service shares, as four tiles (≤ 4 / ≤ 20 words) beside the designer at the wall:
   the media split, its photograph at the END (the router's is at the start). Portrait source, so
   the 4:5 frame takes it whole. */
type Tile = { icon: IconName; title: string; body: string };
const SHARED: readonly Tile[] = [
  {
    icon: 'users-group-rounded',
    title: 'One team throughout',
    body: 'The people who frame the problem are the people who ship it.',
  },
  {
    icon: 'code-square',
    title: 'Built in your stack',
    body: 'Design engineers commit to your repository, reviewed like any other change.',
  },
  {
    icon: 'notebook',
    title: 'A written record',
    body: 'Every decision is logged with its reason, where your team already looks.',
  },
  {
    icon: 'shield-check',
    title: 'A fixed first phase',
    body: 'Scope, team and price agreed before the first interview is booked.',
  },
];
const WALL_PHOTO = { ...photo('wall-sketching-portrait'), focus: { x: 0.5, y: 0.4 } };

/* ── 5 · N ─────────────────────────────────────────────────────────────────────────────────
   Three items a side, ≤ 12 words each, across the full column: the needs two up in the 2, the
   exclusions in the 1 (Contrast `yes`). */
const FOR_YOU = {
  heading: 'Right for you if',
  items: [
    'A live product, and a decision nobody can settle',
    'Engineers who want to be in the room',
    'You would rather see it working than read a deck',
    'You want to own the code and the record',
  ],
} as const;
const NOT_FOR_YOU = {
  heading: 'Not the right fit when',
  items: [
    'The brief is styling, not behaviour',
    'Nothing real about the product can be shown',
    'The main need is the lowest day rate',
  ],
} as const;

/* ── 6 · C-pair ────────────────────────────────────────────────────────────────────────────
   Pair cards: titles ≤ 8, bodies ≤ 20. Stand-in covers from the cool family (§ 5.7), unlabelled,
   and every one shows a PRODUCT ON A SCREEN (fix round 2): a product studio's work card with two
   people chatting on it reads as a SaaS template. */
const CASES: readonly BlockCardSetItem[] = [
  {
    id: 'si-case-underwriting',
    eyebrow: 'Insurance · Product design',
    title: 'Underwriting in one screen',
    body: 'The decision and its evidence side by side for the first time, in a tool underwriters asked to keep.',
    media: cover('screen-over-shoulder', true),
    href: ROUTES.caseStudies,
  },
  {
    id: 'si-case-catalogue',
    eyebrow: 'Manufacturing · Modernisation',
    title: 'Forty thousand parts, one search',
    body: 'Found by the names engineers actually use, and rebuilt without a freeze on releases.',
    media: cover('desk-flatlay-devices', true),
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

/* ── 10 · I, the photo pair ───────────────────────────────────────────────────────────────
   Two sharp cool frames of people at work, [7, 5] from 1024, bottoms level so the 3:2 stands lower
   than the 16:9 beside it: the pair reads as placed, not tiled. One column below 1024, both 3:2. */
const PAIR_WIDE = { ...photo('pair-testing-overhead'), focus: { x: 0.5, y: 0.5 } };
const PAIR_TALL = { ...photo('board-review-backs'), focus: { x: 0.45, y: 0.45 } };

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
      {/* 1 · A — no media, the hero-field stepping up to the column's end from 1024. */}
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
        body={[
          'Design, systems, engineering and modernisation, run as one practice by the same senior team.',
        ]}
        actions={[
          { label: 'Book an intro call', href: ROUTES.contact },
          { label: 'Find your service', href: '#si-services' },
        ]}
        texture
      />

      {/* 2 · C-icon-6 — the router: a stacked head over three across. No photograph (image pass,
          7 Oct 2026): a generic office beside six icon cards was decoration, and the icons already
          give every item a shape. A text head beside the cards would be the retired text-only
          split (owner ruling 2, 7 Oct), so the head stacks. */}
      <ContentSection
        data-band="C-icon"
        eyebrow="The services"
        heading="Start from the problem"
        headingId="si-services"
        lead="Six doors, and one team behind every one."
      >
        <BlockCardSet items={SERVICES} lead="none" across={3} />
      </ContentSection>

      {/* 3 · C-image-4 — the fixed-scope audits, centred, a link on each. */}
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

      {/* 4 · B — what every service shares, the designer at the wall at the END, four tiles. */}
      <ContentSection
        data-band="B"
        arrangement="media"
        media={{ image: WALL_PHOTO, side: 'end', head: 'title' }}
        eyebrow="Across every service"
        heading="Whichever door you use, the same team ships it"
        headingId="si-shared"
        actions={
          <CtaRow rule={false} actions={[{ label: 'How we work', href: ROUTES.howWeWork }]} />
        }
      >
        <Layout as="ul" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
          {SHARED.map((tile) => (
            <ListCard
              key={tile.title}
              form="tile"
              titleAs="h3"
              marker={{ type: 'icon', name: tile.icon }}
              title={tile.title}
              body={tile.body}
            />
          ))}
        </Layout>
      </ContentSection>

      {/* 5 · N — who the work is for: a stacked head, then the two lists across the full column. */}
      <ContentSection
        data-band="N"
        eyebrow="Fit"
        heading="Who this work is for"
        headingId="si-fit"
        lead="We say no often, and early, so the projects we take are ones we can finish well."
      >
        <Contrast emphasis="yes" yes={FOR_YOU} no={NOT_FOR_YOU} />
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

      {/* 8 · K — the offer, the team at the whiteboard at the end. */}
      <CtaSection
        data-band="K"
        arrangement="offer"
        eyebrow="Discovery sprint"
        heading="Two weeks to a decision your team can defend"
        body={[
          'For when the brief is still an argument. You leave with evidence, a direction and a price for it.',
        ]}
        points={SPRINT_POINTS}
        actions={[{ label: 'Plan a sprint', href: ROUTES.contact }]}
        media={{
          image: { ...photo('workshop-whiteboard-lounge'), focus: { x: 0.56, y: 0.5 } },
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

      {/* 10 · I — the photo pair under a start-set head, bottoms level. */}
      <ContentSection
        data-band="I"
        eyebrow="Engagements"
        heading="Most work starts at one table"
        headingId="si-desk"
        lead="A principal and your product owner, one afternoon, and the decision that has waited longest."
      >
        <Layout columns={{ lg: [7, 5] }} colGap="gutter" rowGap="gutter" align="end">
          <Media image={PAIR_WIDE} ratio={{ base: '3/2', lg: '16/9' }} sizes={MEDIA_SPLIT_WIDE} />
          <Media image={PAIR_TALL} ratio="3/2" sizes={MEDIA_SPLIT} />
        </Layout>
      </ContentSection>

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
      />
    </>
  );
}
