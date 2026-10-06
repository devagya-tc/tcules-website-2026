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

/* The page's sourced score: the proof block's own, or — since product-design's fix round 1 moved
   the one Clutch pill to its logo band, a band above the proof — the logo band's. One source, so
   the score here is always the score the page shows. */
function realRating() {
  if (REAL?.rating) return REAL.rating;
  const story = getIdealServiceStory('product-design');
  for (const section of story?.sections ?? []) {
    if (!('blocks' in section)) continue;
    for (const block of section.blocks)
      if (block.kind === 'logos' && block.rating) return block.rating;
  }
  return undefined;
}
const RATING = realRating();

const REAL_QUOTE: ProofQuote | undefined = REAL && {
  quoteHtml: `<p>${REAL.quote.text}</p>`,
  name: REAL.quote.name,
  role: REAL.quote.role,
  company: REAL.quote.company,
};

const REAL_RATING: ProofRating | undefined = RATING && {
  score: RATING.score,
  platform: RATING.platform,
  href: RATING.href,
  mark: RATING.mark,
};

const REAL_CASE = REAL?.case;
const REAL_CASE_HREF = REAL_CASE ? caseStudyPath(REAL_CASE.slug) : ROUTES.caseStudies;

const portrait = (id: PhotoId) => {
  const { src, width, height, sources } = getKitPhoto(id);
  return { src, width, height, sources };
};

/* The stock faces, chosen for light, even grounds and an engaged expression (fix round 2, 6 Oct
   2026): the lead portrait is the largest image in the family and sets the tone under a quote that
   is praise, and a 64 thumbnail on tint only reads as a face when the ground around it is light.
   `portrait-woman-grey` (sombre, low-key) is no longer shown. One face is one person throughout. */
const FACES = {
  daniel: portrait('portrait-man-blue-office'),
  tobias: portrait('portrait-man-glasses'),
  ines: portrait('portrait-woman-laughing'),
  arjun: portrait('portrait-man-green'),
} as const;

const DANIEL = {
  name: 'Daniel Okafor',
  role: 'Chief Product Officer',
  company: 'Brightwater Labs',
  portrait: FACES.daniel,
};
const TOBIAS = {
  name: 'Tobias Reyes',
  role: 'VP Engineering',
  company: 'Quillstack',
  portrait: FACES.tobias,
};
const INES = {
  name: 'Ines Duarte',
  role: 'Design Director',
  company: 'Lumen Ledger',
  portrait: FACES.ines,
};
const ARJUN = {
  name: 'Arjun Mehta',
  role: 'Director of Clinical Product',
  company: 'Corvel Health',
  portrait: FACES.arjun,
};

/* Featured quotes: ≤ 35 words (§ 1.5), five lines at 34 in the 667. */
const DANIEL_FEATURED: ProofQuote = {
  ...DANIEL,
  quoteHtml:
    '<p>Tcules treated our design system as a product with users of its own. Our engineers stopped rebuilding the same table, and for the first time in two years, releases stopped waiting on design.</p>',
};

const INES_FEATURED: ProofQuote = {
  ...INES,
  quoteHtml:
    '<p>The research changed the brief, not just the screens. We shipped less than we had planned, and every part of it was in daily use with our customers within a week.</p>',
};

const TOBIAS_FEATURED: ProofQuote = {
  ...TOBIAS,
  quoteHtml:
    '<p>Clear decisions every week, written down where we could find them. Nobody on our side chased a status update once, and engineering never opened a file to find a surprise.</p>',
};

/* The slider opens on a speaker no other band shows, so it reads as its own variation. */
const SLIDES: readonly ProofQuote[] = [
  {
    ...ARJUN,
    quoteHtml:
      '<p>What we valued most was the restraint. Every screen they cut was one our clinicians never had to learn, and every screen that stayed had been argued for, with evidence.</p>',
  },
  {
    ...DANIEL,
    quoteHtml:
      '<p>The design review stopped being a meeting about taste. Every decision arrived with the research behind it, so we argued about evidence rather than about opinions.</p>',
  },
  {
    ...INES,
    quoteHtml:
      '<p>They left us a system our own team could extend. Six months on, we are still shipping from it, and nobody has had to ask how it works.</p>',
  },
];

/* Group quotes: ≤ 25 words each (§ 1.5), and written to one length — the blue rule runs the
   height of its quote, and it is the most saturated mark on the band, so peers of unequal length
   set a stagger along the row's top edge (fix round 2). Measured: the same line count at 1470, 1280 and 1024, where the three sit across. */
const GROUP: readonly [ProofQuote, ProofQuote, ProofQuote] = [
  {
    ...DANIEL,
    quoteHtml:
      '<p>Engineers stopped rebuilding tables, and releases stopped waiting on design files.</p>',
  },
  {
    ...TOBIAS,
    quoteHtml:
      '<p>Decisions every week, written down. Nobody on our side chased a status update.</p>',
  },
  {
    ...INES,
    quoteHtml:
      '<p>Their research changed the brief, not only the screens. We built less, and better.</p>',
  },
];

/* Typographic, fictional: ≤ 35 words (§ 1.5). No portrait — the typographic band never shows one. */
const TOBIAS_TYPOGRAPHIC: ProofQuote = {
  quoteHtml:
    '<p>We came for a redesign and left with a way of making decisions. The interface is better, and the meetings about the interface are shorter. We had not expected the second part at all.</p>',
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
    note: 'The owner-approved composition (1 Oct): the case card in the 381 track, the quote at the display role in the 763. The two tracks share a top and a bottom line — the quote starts level with the cover, and the attribution and score are pinned to the card’s foot. Real quote, real score, stand-in cover. § 1.4 G-case 564.',
  },
  caseBare: {
    id: 'case-without-rating',
    title: 'G-case without the rating',
    note: 'With no score, the attribution alone is pinned to the card’s foot. Fictional speaker, so a stock cover rather than a studio photograph.',
  },
  featured: {
    id: 'featured',
    title: 'Featured, with a 1:1 portrait',
    note: '[5, 7] at section: the portrait at 477, radius 8, no frame; the quote at the display role, centred on it because the column ends in no action (§ 3.2 rule 2). Fictional speaker, stock portrait. § 1.4 budget 477.',
  },
  featuredCta: {
    id: 'featured-cta',
    title: 'Featured, with a CtaRow',
    note: 'With an ask: the link a block under the attribution, on the name’s indent, and the whole stack still centred on the portrait — the ask travels with the testimonial.',
  },
  featuredReverse: {
    id: 'featured-reverse',
    title: 'Featured, mirrored',
    note: '`reverse`: the portrait at the end from 1024, the quote in the 7 at the start. Visual only — on a phone the person still comes first. Two pages using G-featured take opposite sides.',
  },
  group3: {
    id: 'group-of-3',
    title: 'Group of three',
    note: 'Three compact quotes as peers, 32 apart, written to one length so the three blue rules end together. Each 64 portrait (radius 4) sits beside its name, the two lines centred on the face, and the attributions share one baseline. § 1.4 budget 485.',
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
    note: 'The testimonial use of Slider: one per view, no peek, no autoplay, opening on a speaker no other band shows. The rail on the start edge, 48 outline steppers on the end. Arrow keys are not hijacked; Tab reaches the controls and Previous / Next move one slide. § 1.4 G-slider 549.',
  },
  rating: {
    id: 'rating-led',
    title: 'Rating-led',
    note: 'The score is the band’s large thing: the numeral at the score role (105, serif) with its scale and what it measures at its side, over the pill that carries it in its link name; [5, 7] with the quote. Real score, real quote. § 1.4 budget 347.',
  },
  ratingCta: {
    id: 'rating-led-cta',
    title: 'Rating-led, with a CtaRow',
    note: '§ 1.4 budget 443.',
  },
  paper: {
    id: 'surface-proof',
    title: 'Surface proof on paper',
    note: 'Surface proof — on pages G sits on tint (§ 1.7). Rating-led on paper, because it carries the most surface-dependent ink — score, scale, rule, quote, name and the badge’s own layer — to show every token resolves on a second ground.',
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
  return SLIDES.map((quote) => (
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
                Six arrangements of one Proof pattern, featured either way round, each a band on
                tint that fits one screen at 1470.
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
        <ContentSection
          surface="tint"
          align="center"
          eyebrow="In a client’s words"
          data-band="G-typographic"
        >
          <Proof quote={REAL_QUOTE} align="center" rating={REAL_RATING} />
        </ContentSection>
      </Band>

      <Band variation={VARIATIONS.typographicCta}>
        <ContentSection
          surface="tint"
          align="center"
          eyebrow="In a client’s words"
          data-band="G-typographic"
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
          data-band="G-case"
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
          data-band="G-case"
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
        <Section surface="tint" data-band="G-featured">
          <Proof arrangement="featured" quote={DANIEL_FEATURED} />
        </Section>
      </Band>

      <Band variation={VARIATIONS.featuredCta}>
        <Section surface="tint" data-band="G-featured">
          <Proof
            arrangement="featured"
            quote={INES_FEATURED}
            footer={
              <CtaRow
                rule={false}
                actions={[{ label: 'Read the case', href: ROUTES.caseStudies }]}
              />
            }
          />
        </Section>
      </Band>

      <Band variation={VARIATIONS.featuredReverse}>
        <Section surface="tint" data-band="G-featured">
          <Proof arrangement="featured" reverse quote={TOBIAS_FEATURED} />
        </Section>
      </Band>

      {/* ── 08 Groups ─────────────────────────────────────────────────────────────── */}
      <Band variation={VARIATIONS.group3}>
        <ContentSection
          surface="tint"
          align="center"
          eyebrow="Client stories"
          heading="Three teams, in their words"
          headingId="kit-g-group-3"
          data-band="G-group"
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
          data-band="G-group"
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
          data-band="G-group"
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

      {/* ── 11 Slider ─────────────────────────────────────────────────────────────── */}
      {/* No head: a one-up slide is its own large object, and the rail and steppers say what the
          band is. The § 1.4 row is portrait + block + controls, 549 (fix round 2: with an eyebrow
          a stack above, the band ran 603 against the 598 target). */}
      <Band variation={VARIATIONS.slider}>
        <Section surface="tint" data-band="G-slider">
          <Slider label="Client stories" perView={1}>
            {featuredSlides()}
          </Slider>
        </Section>
      </Band>

      {/* ── 12 Rating-led ─────────────────────────────────────────────────────────── */}
      <Band variation={VARIATIONS.rating}>
        <ContentSection surface="tint" eyebrow="Independent reviews" data-band="G-rating">
          <Proof arrangement="rating" rating={REAL_RATING} quote={REAL_QUOTE} />
        </ContentSection>
      </Band>

      <Band variation={VARIATIONS.ratingCta}>
        <ContentSection
          surface="tint"
          eyebrow="Independent reviews"
          data-band="G-rating"
          footer={<CtaRow actions={[{ label: 'Read the case', href: REAL_CASE_HREF }]} />}
        >
          <Proof arrangement="rating" rating={REAL_RATING} quote={REAL_QUOTE} />
        </ContentSection>
      </Band>

      {/* ── 14 Surface proof ──────────────────────────────────────────────────────── */}
      <Band variation={VARIATIONS.paper}>
        <ContentSection
          surface="paper"
          eyebrow="Independent reviews"
          data-band="G-rating"
          footer={<CtaRow actions={[{ label: 'Read the case', href: REAL_CASE_HREF }]} />}
        >
          <Proof arrangement="rating" rating={REAL_RATING} quote={REAL_QUOTE} />
        </ContentSection>
      </Band>
    </>
  );
}
