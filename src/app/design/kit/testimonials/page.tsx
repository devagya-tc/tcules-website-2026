import type { ReactNode } from 'react';

import { Button, Layout, Media, Section, Texture, TextureShape } from '@/components';
import { getIdealServiceStory } from '@/content';
import { MEDIA_SPLIT } from '@/lib/image-sizes';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { caseStudyPath, ROUTES } from '@/lib/routes';
import {
  BlockCard,
  ContentSection,
  CtaRow,
  Proof,
  Slider,
  type ProofQuote,
  type ProofRating,
} from '@/patterns';

import { specimenStyles as s } from '../../_specimen/Specimen';

/* ── Content ─────────────────────────────────────────────────────────────────────────
   Two kinds, never mixed (visual-direction § 5.8):

   REAL — the one approved client quote and the real Clutch score, read from the content seam
   (the product-design story), so a re-read rating or an edited quote reaches this page too. No
   portrait: a stock face beside a real name is a fabricated likeness.

   FICTIONAL — invented people at invented companies, with stock portraits from the kit registry.
   They never sit beside a real mark or the real score, and they link to the work index rather than
   to a real case they did not commission. */

function realProof() {
  const story = getIdealServiceStory('product-design');
  for (const section of story?.sections ?? []) {
    if (!('blocks' in section)) continue;
    for (const block of section.blocks) if (block.kind === 'proof') return block;
  }
  return undefined;
}

const REAL = realProof();

const REAL_QUOTE: ProofQuote | undefined = REAL && {
  quoteHtml: `<p>${REAL.quote.text}</p>`,
  name: REAL.quote.name,
  role: REAL.quote.role,
  company: REAL.quote.company,
};

const REAL_RATING: ProofRating | undefined = REAL?.rating && {
  score: REAL.rating.score,
  platform: REAL.rating.platform,
  href: REAL.rating.href,
  mark: REAL.rating.mark,
};

const REAL_CASE = REAL?.case;
const REAL_CASE_HREF = REAL_CASE ? caseStudyPath(REAL_CASE.slug) : ROUTES.caseStudies;

const portrait = (id: PhotoId) => {
  const { src, width, height, sources } = getKitPhoto(id);
  return { src, width, height, sources };
};

const MAREN: ProofQuote = {
  quoteHtml:
    '<p>They asked better questions about our operations than our own roadmap did. Six weeks later the dispatch screens made sense to the people using them, and the support queue said so before we did.</p>',
  name: 'Maren Holt',
  role: 'Head of Product',
  company: 'Halden Freight',
  portrait: portrait('portrait-woman-grey'),
};

const DANIEL: ProofQuote = {
  quoteHtml:
    '<p>Tcules treated our design system as a product with users of its own. Engineers stopped rebuilding the same table, and releases stopped waiting on design.</p>',
  name: 'Daniel Okafor',
  role: 'Chief Product Officer',
  company: 'Brightwater Labs',
  portrait: portrait('portrait-man-blue-office'),
};

const ARJUN: ProofQuote = {
  quoteHtml:
    '<p>What we valued most was the restraint. Every screen they cut was one our clinicians never had to learn, and every one that stayed had been argued for.</p>',
  name: 'Arjun Mehta',
  role: 'Director of Clinical Product',
  company: 'Corvel Health',
  portrait: portrait('portrait-man-green'),
};

/* Group quotes: ≤ 25 words each (§ 1.5, five lines at 28 in a 392 track). */
const GROUP: readonly [ProofQuote, ProofQuote, ProofQuote] = [
  {
    quoteHtml:
      '<p>The research changed the brief, not just the screens. We built less, and it was the right less.</p>',
    name: 'Ines Duarte',
    role: 'Design Director',
    company: 'Lumen Ledger',
    portrait: portrait('portrait-woman-laughing'),
  },
  {
    quoteHtml:
      '<p>Clear decisions every week, written down. Nobody on our side had to chase a status update once.</p>',
    name: 'Tobias Reyes',
    role: 'VP Engineering',
    company: 'Quillstack',
    portrait: portrait('portrait-man-glasses'),
  },
  {
    quoteHtml:
      '<p>They designed with our constraints in the room, so engineering never opened a file and found a surprise.</p>',
    name: 'Maren Holt',
    role: 'Head of Product',
    company: 'Halden Freight',
    portrait: portrait('portrait-woman-grey'),
  },
];

/* Typographic, fictional: ≤ 35 words (§ 1.5). No portrait — the typographic band never shows one. */
const TOBIAS_TYPOGRAPHIC: ProofQuote = {
  quoteHtml:
    '<p>We came for a redesign and left with a way of making decisions. The interface is better, and the meetings about the interface are shorter. We did not expect the second part.</p>',
  name: 'Tobias Reyes',
  role: 'VP Engineering',
  company: 'Quillstack',
};

/* G-case, fictional: ≤ 45 words (§ 1.5). */
const MAREN_CASE: ProofQuote = {
  quoteHtml:
    '<p>The first month was listening: ride-alongs, call recordings, the spreadsheets nobody admits to keeping. What came out of it looks simple, and it is simple because the hard part was done first.</p>',
  name: 'Maren Holt',
  role: 'Head of Product',
  company: 'Halden Freight',
};

/* ── Bands ──────────────────────────────────────────────────────────────────────────── */

type Variation = { id: string; title: string; note: string };

const VARIATIONS = {
  typographic: {
    id: 'typographic',
    title: 'Typographic, centred, with the rating',
    note: 'A real quote with no portrait at the centred role (43), the quote rule turned on its side above it, the Clutch badge a block under the attribution. § 1.4 budget 421.',
  },
  typographicCta: {
    id: 'typographic-cta',
    title: 'Typographic, with a CtaRow',
    note: 'The same shape with the band’s way on — “Read the case” — centred under a hairline at the body measure. § 1.4 budget 517.',
  },
  case: {
    id: 'case',
    title: 'G-case: the work first, then the words',
    note: 'The owner-approved composition (1 Oct): the case card in the 381 track carrying the band’s image, the quote at the display role in the 763 so the client’s words lead the card’s title, the score a block under the attribution. Real quote, real score, stand-in cover. § 1.4 budget 508.',
  },
  caseBare: {
    id: 'case-without-rating',
    title: 'G-case without the rating',
    note: 'When there is no score to show, the quote ends at its attribution and nothing takes the badge’s place. Fictional speaker, so a stock cover rather than a studio photograph.',
  },
  featured: {
    id: 'featured',
    title: 'Featured, with a 1:1 portrait',
    note: '[5, 7] at section: the portrait at 477, radius 8, no frame; the quote at the display role, centred on it because the column ends in no action (§ 3.2 rule 2). Fictional speaker. § 1.4 budget 477.',
  },
  featuredCta: {
    id: 'featured-cta',
    title: 'Featured, with a CtaRow',
    note: 'With an ask: the link a block under the attribution, on the name’s indent, and the whole stack still centred on the portrait — the ask travels with the testimonial.',
  },
  group3: {
    id: 'group-of-3',
    title: 'Group of three',
    note: 'Three compact quotes as peers, 32 apart. Each 64 portrait (radius 4) sits beside its name, so face and name read as one person, and the attributions are pinned to one baseline however long each quote runs. § 1.4 budget 485.',
  },
  group2: {
    id: 'group-of-2',
    title: 'Group of two',
    note: 'The same item, two across.',
  },
  group3Cta: {
    id: 'group-of-3-cta',
    title: 'Group of three, with a CtaRow',
    note: '§ 1.4 budget 581.',
  },
  slider: {
    id: 'slider',
    title: 'Slider of featured slides',
    note: 'The testimonial use of Slider: one per view, no peek, no autoplay. Eyebrow and rail on the container’s start edge, controls on its end. Arrow keys are not hijacked; Tab reaches the controls and Previous / Next move one slide. § 1.4 budget 579.',
  },
  rating: {
    id: 'rating-led',
    title: 'Rating-led',
    note: 'The score is the band’s large thing: the numeral at the score role (105, serif, so the point sits close) over its pill, which carries the score in its link name; [5, 7] with the quote — its own silhouette, not the centred column. Real score, real quote. § 1.4 budget 347.',
  },
  ratingCta: {
    id: 'rating-led-cta',
    title: 'Rating-led, with a CtaRow',
    note: '§ 1.4 budget 443.',
  },
  paper: {
    id: 'surface-proof',
    title: 'Surface proof on paper',
    note: 'Surface proof — on pages, tint is the proof band only (§ 1.7). The same featured band on paper, to show every Proof token resolves on a second ground.',
  },
} satisfies Record<string, Variation>;

const ORDER = Object.values(VARIATIONS);

/** The titled band above each variation: its number, its name and what to look for. */
function Label({ variation }: { variation: Variation }) {
  const n = String(ORDER.indexOf(variation) + 1).padStart(2, '0');
  return (
    <Section density="tight" id={variation.id}>
      <Layout rowGap="tight" className={s.spec}>
        <p className={s.specTitle}>
          G · {n} — {variation.title}
        </p>
        <p className={s.specNote}>{variation.note}</p>
      </Layout>
    </Section>
  );
}

function Band({ variation, children }: { variation: Variation; children: ReactNode }) {
  return (
    <>
      <Label variation={variation} />
      {children}
    </>
  );
}

/** One linked case card, in the one-item list a BlockCard needs. */
function CaseCard({
  eyebrow,
  title,
  body,
  href,
  cover,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cover: PhotoId;
}) {
  return (
    <Layout as="ul" rowGap="none">
      <BlockCard
        eyebrow={eyebrow}
        title={title}
        body={body}
        href={href}
        ctaLabel="Read the case"
        media={{ type: 'image', image: getKitPhoto(cover, { standIn: true }) }}
        tracks={3}
      />
    </Layout>
  );
}

function RealCaseCard() {
  if (!REAL_CASE) return null;
  return (
    <CaseCard
      eyebrow={REAL_CASE.client}
      title={REAL_CASE.title}
      body={REAL_CASE.body}
      href={REAL_CASE_HREF}
      cover="studio-session-talk"
    />
  );
}

function featuredSlides() {
  return [MAREN, DANIEL, ARJUN].map((quote) => (
    <li key={quote.name}>
      <Proof arrangement="featured" quote={quote} />
    </li>
  ));
}

/**
 * Testimonials — the G family of the UI kit (visual-direction § 1.4, § 3.4 G, § 3.6, § 5.8).
 *
 * Every variation is a live band on tint, the ground G takes on a page (§ 1.7), each under a
 * titled paper band that says what it is and what to look for. The last variation is the one
 * surface proof on paper (§ 8.6).
 */
export default function TestimonialsKitPage() {
  if (!REAL_QUOTE || !REAL_RATING) {
    throw new Error('Testimonials kit: the product-design story lost its proof block.');
  }

  return (
    <>
      {/* ── Intro ─────────────────────────────────────────────────────────────────── */}
      <Section>
        {/* hero-foot (§ 6.3): a hero with a photograph, at the copy side's foot, clear of it. */}
        <Texture>
          <TextureShape
            kind="ellipse"
            bottom={-300}
            left={-200}
            width="50%"
            height={380}
            blur={180}
          />
        </Texture>
        <Layout
          columns={{ base: 1, lg: [7, 5] }}
          colGap="section"
          rowGap="stack"
          align="center"
        >
          <Layout rowGap="stack">
            <Layout rowGap="block">
              <p className={s.eyebrow}>UI kit · Family G</p>
              <h1>Testimonials</h1>
              <p className={s.specNote}>
                What clients said, set so it reads as evidence. The work first where there is a
                case; the speaker’s face where we may show one; the score only where it is real.
                Six arrangements of one Proof pattern, each a band on tint that fits one screen
                at 1470.
              </p>
            </Layout>
            <Layout as="ol" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="text">
              {ORDER.map((v, i) => (
                <li key={v.id}>
                  <Button as="a" href={`#${v.id}`} emphasis="link" tone="primary" size="sm">
                    {`${String(i + 1).padStart(2, '0')}  ${v.title}`}
                  </Button>
                </li>
              ))}
            </Layout>
          </Layout>
          <Media image={getKitPhoto('workshop-brick-room')} ratio="4/5" sizes={MEDIA_SPLIT} />
        </Layout>
      </Section>

      {/* ── 01 Typographic ────────────────────────────────────────────────────────── */}
      <Band variation={VARIATIONS.typographic}>
        <ContentSection surface="tint" align="center" eyebrow="In a client’s words">
          <Proof quote={REAL_QUOTE} align="center" rating={REAL_RATING} />
        </ContentSection>
      </Band>

      <Band variation={VARIATIONS.typographicCta}>
        <ContentSection
          surface="tint"
          align="center"
          eyebrow="In a client’s words"
          footer={
            <CtaRow
              align="center"
              actions={[{ label: 'Read the case', href: ROUTES.caseStudies }]}
            />
          }
        >
          <Proof quote={TOBIAS_TYPOGRAPHIC} align="center" />
        </ContentSection>
      </Band>

      {/* ── 03 G-case ─────────────────────────────────────────────────────────────── */}
      <Band variation={VARIATIONS.case}>
        <ContentSection
          surface="tint"
          heading="A client’s view of the work"
          headingId="kit-g-case"
        >
          <Proof
            arrangement="case"
            work={<RealCaseCard />}
            quote={REAL_QUOTE}
            rating={REAL_RATING}
          />
        </ContentSection>
      </Band>

      <Band variation={VARIATIONS.caseBare}>
        <ContentSection
          surface="tint"
          heading="The work, then the words"
          headingId="kit-g-case-bare"
        >
          <Proof
            arrangement="case"
            work={
              <CaseCard
                eyebrow="Halden Freight · Logistics"
                title="Dispatch screens rebuilt around the driver’s day"
                body="Field research with twelve dispatchers, carried into a routing model and a component library."
                href={ROUTES.caseStudies}
                cover="pair-at-laptop-sticky-wall"
              />
            }
            quote={MAREN_CASE}
          />
        </ContentSection>
      </Band>

      {/* ── 05 Featured ───────────────────────────────────────────────────────────── */}
      <Band variation={VARIATIONS.featured}>
        <Section surface="tint">
          <Proof arrangement="featured" quote={MAREN} />
        </Section>
      </Band>

      <Band variation={VARIATIONS.featuredCta}>
        <Section surface="tint">
          <Proof
            arrangement="featured"
            quote={DANIEL}
            footer={
              <CtaRow
                rule={false}
                actions={[{ label: 'Read the case', href: ROUTES.caseStudies }]}
              />
            }
          />
        </Section>
      </Band>

      {/* ── 07 Groups ─────────────────────────────────────────────────────────────── */}
      <Band variation={VARIATIONS.group3}>
        <ContentSection
          surface="tint"
          align="center"
          eyebrow="Client stories"
          heading="Three teams, in their words"
          headingId="kit-g-group-3"
        >
          <Proof arrangement="group" quotes={GROUP} />
        </ContentSection>
      </Band>

      <Band variation={VARIATIONS.group2}>
        <ContentSection
          surface="tint"
          align="center"
          eyebrow="Client stories"
          heading="Two teams, in their words"
          headingId="kit-g-group-2"
        >
          <Proof arrangement="group" quotes={[GROUP[0], GROUP[1]]} />
        </ContentSection>
      </Band>

      <Band variation={VARIATIONS.group3Cta}>
        <ContentSection
          surface="tint"
          align="center"
          eyebrow="Client stories"
          heading="Three teams, in their words"
          headingId="kit-g-group-3-cta"
          footer={
            <CtaRow
              align="center"
              actions={[{ label: 'See the work', href: ROUTES.caseStudies }]}
            />
          }
        >
          <Proof arrangement="group" quotes={GROUP} />
        </ContentSection>
      </Band>

      {/* ── 10 Slider ─────────────────────────────────────────────────────────────── */}
      <Band variation={VARIATIONS.slider}>
        <ContentSection surface="tint" eyebrow="Client stories">
          <Slider label="Client stories" perView={1}>
            {featuredSlides()}
          </Slider>
        </ContentSection>
      </Band>

      {/* ── 11 Rating-led ─────────────────────────────────────────────────────────── */}
      <Band variation={VARIATIONS.rating}>
        <ContentSection surface="tint" eyebrow="Independent reviews">
          <Proof arrangement="rating" rating={REAL_RATING} quote={REAL_QUOTE} />
        </ContentSection>
      </Band>

      <Band variation={VARIATIONS.ratingCta}>
        <ContentSection
          surface="tint"
          eyebrow="Independent reviews"
          footer={<CtaRow actions={[{ label: 'Read the case', href: REAL_CASE_HREF }]} />}
        >
          <Proof arrangement="rating" rating={REAL_RATING} quote={REAL_QUOTE} />
        </ContentSection>
      </Band>

      {/* ── 13 Surface proof ──────────────────────────────────────────────────────── */}
      <Band variation={VARIATIONS.paper}>
        <Section surface="paper">
          <Proof
            arrangement="featured"
            quote={ARJUN}
            footer={
              <CtaRow
                rule={false}
                actions={[{ label: 'Read the case', href: ROUTES.caseStudies }]}
              />
            }
          />
        </Section>
      </Band>
    </>
  );
}
