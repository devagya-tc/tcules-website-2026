import type { ReactNode } from 'react';

import {
  Button,
  Cluster,
  Layout,
  Media,
  Section,
  Tag,
  Texture,
  TextureShape,
} from '@/components';
import { getIdealServiceStory } from '@/content';
import { MEDIA_SPLIT } from '@/lib/image-sizes';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { caseStudyPath, ROUTES } from '@/lib/routes';
import { BlockCard, ContentSection, CtaRow, Proof, Slider, type ProofQuote } from '@/patterns';

import { specimenStyles as s } from '../../_specimen/Specimen';

/* ── Content ─────────────────────────────────────────────────────────────────────────
   Two kinds, never mixed (visual-direction § 5.8):

   REAL — the one approved client quote, read from the content seam (the product-design story), so
   an edited quote reaches this page too. No portrait: a stock face beside a real name is a
   fabricated likeness. No score either, now on any quote (owner, 7 Oct 2026): "never put a rating
   beside a client quote".

   FICTIONAL — invented people at invented companies. Only the featured arrangements show a face
   (stock portraits from the kit registry; 7 Oct: no headshots elsewhere). They never sit beside a
   real mark, and they link to the work index rather than to a real case they did not commission. */

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

/** A speaker without the face: everywhere but the featured arrangements (7 Oct: no headshots). */
const voice = ({ name, role, company }: { name: string; role: string; company: string }) => ({
  name,
  role,
  company,
});

/* Group quotes: ≤ 25 words each (§ 1.5), and written to one length — the blue rule runs the
   height of its quote, and it is the most saturated mark on the band, so peers of unequal length
   set a stagger along the row's top edge (fix round 2). No faces (7 Oct): each leads with the tag
   that names the engagement, in the place the portrait took, and the names sit on the start edge. */
const GROUP: readonly [ProofQuote, ProofQuote, ProofQuote] = [
  {
    ...voice(DANIEL),
    tag: 'Design system',
    quoteHtml:
      '<p>Engineers stopped rebuilding tables, and releases stopped waiting on design files.</p>',
  },
  {
    ...voice(TOBIAS),
    tag: 'Delivery',
    quoteHtml:
      '<p>Decisions every week, written down. Nobody on our side chased a status update.</p>',
  },
  {
    ...voice(INES),
    tag: 'User research',
    quoteHtml:
      '<p>Their research changed the brief, not only the screens. We built less, and better.</p>',
  },
];

/* Typographic, fictional: ≤ 35 words (§ 1.5). No portrait — the typographic band never shows one. */
const TOBIAS_TYPOGRAPHIC: ProofQuote = {
  ...voice(TOBIAS),
  quoteHtml:
    '<p>We came for a redesign and left with a way of making decisions. The interface is better, and the meetings about the interface are shorter. We had not expected the second part at all.</p>',
};

/* The typographic slider: three voices written to one length (≈ 25 words, three lines at 43 in the
   lead measure at 1470), so the band does not change height as it turns, and the centred quote
   sits at one place on the page from slide to slide. */
const TYPOGRAPHIC_SLIDES: readonly ProofQuote[] = [
  TOBIAS_TYPOGRAPHIC,
  {
    ...voice(ARJUN),
    quoteHtml:
      '<p>Every screen they cut was one our clinicians never had to learn, and every screen that stayed had been argued for, with evidence on the table.</p>',
  },
  {
    ...voice(INES),
    quoteHtml:
      '<p>They left us a system our own team could extend. Six months on we still ship from it every week, and nobody has asked how it works.</p>',
  },
  {
    ...voice(DANIEL),
    quoteHtml:
      '<p>The design review stopped being a meeting about taste. Each decision arrived with the research behind it, so we argued about evidence instead of opinions.</p>',
  },
];

/* Featured without a photograph: the content on the start edge, the tag in the image's place. */
const ARJUN_NO_IMAGE: ProofQuote = {
  ...voice(ARJUN),
  tag: 'Clinical product',
  quoteHtml:
    '<p>What we valued most was the restraint. Every screen they cut was one our clinicians never had to learn, and every one that stayed had been argued for.</p>',
};

/* ── Bands ──────────────────────────────────────────────────────────────────────────── */

type Family = 'Typographic' | 'The work first' | 'Featured' | 'Group' | 'Surface';

type Variation = {
  id: string;
  family: Family;
  title: string;
  note: string;
  /** What the 7 Oct review changed here, if anything — shown as a Tag on the label and the index. */
  change?: 'New' | 'Changed';
};

const VARIATIONS = {
  typographicCta: {
    id: 'typographic-cta',
    family: 'Typographic',
    title: 'Typographic, with a CtaRow',
    note: 'The favourite (7 Oct), kept as it is: the quote at the centred role (43) under the rule turned on its side, the attribution, and the band’s way on — “Read the case” — centred under a hairline at the body measure. § 1.4 budget 517.',
  },
  typographicSlider: {
    id: 'typographic-slider',
    family: 'Typographic',
    title: 'Typographic slider, with a CtaRow',
    change: 'New',
    note: 'The same band, turning on its own: one quote every eight seconds, a row of plain bars, the current one filling over the hold (9 Oct: no numerals, no arrows, no pause circle, no rule above the quote). The bars are the controls: pressing one shows that quote and stops the turn for good; resting the pointer on the quote, or focusing a bar or the quote, holds it; with reduced motion it never turns. Four voices written to one length, so the band never changes height.',
  },
  typographic: {
    id: 'typographic',
    family: 'Typographic',
    title: 'Typographic, the real quote',
    change: 'Changed',
    note: 'The approved client quote with no portrait and, now, no score: a rating never sits beside a client quote (7 Oct). It goes with the client list, beside the CTA or enquiry, and in facts & figures.',
  },
  case: {
    id: 'case',
    family: 'The work first',
    title: 'G-case: the work first, then the words',
    change: 'Changed',
    note: 'Three parts, where the first version had five competing (7 Oct): the case card keeps its cover, client, title and link and loses its description — the quote beside it is the description — and the quote loses the score. Real quote, stand-in cover, the quote centred on the card.',
  },
  featured: {
    id: 'featured',
    family: 'Featured',
    title: 'Featured, with a 1:1 portrait',
    note: '[5, 7] at section: the portrait at 477, radius 8, no frame; the quote at the display role, centred on it. The large image is the band’s one idea — kept (7 Oct: “all good options”). Fictional speaker, stock portrait. § 1.4 budget 477.',
  },
  featuredCta: {
    id: 'featured-cta',
    family: 'Featured',
    title: 'Featured, with a CtaRow',
    note: 'With an ask: the link a block under the attribution, on the name’s indent, and the whole stack still centred on the portrait — the ask travels with the testimonial.',
  },
  featuredReverse: {
    id: 'featured-reverse',
    family: 'Featured',
    title: 'Featured, mirrored',
    note: '`reverse`: the portrait at the end from 1024, the quote in the 7 at the start. Visual only — on a phone the person still comes first. Two pages using G-featured take opposite sides.',
  },
  featuredSlider: {
    id: 'slider',
    family: 'Featured',
    title: 'Slider of featured slides',
    note: 'One per view, no peek, moved only by the reader: the rail on the start edge, 48 outline steppers on the end. Arrow keys are not hijacked; Tab reaches the controls. § 1.4 G-slider 549.',
  },
  featuredNoImage: {
    id: 'featured-no-image',
    family: 'Featured',
    title: 'Featured without an image',
    change: 'New',
    note: 'When a quote has no photograph the content shifts to the start and a tag takes the image’s place (7 Oct): the tag, the quote rule and the name share one edge, and the quote holds the display role.',
  },
  group3: {
    id: 'group-of-3',
    family: 'Group',
    title: 'Group of three',
    change: 'Changed',
    note: 'Three compact quotes as peers, 32 apart, written to one length so the three blue rules end together. No faces: each leads with the tag that names the engagement, and the names share one baseline on the start edge.',
  },
  group2: {
    id: 'group-of-2',
    family: 'Group',
    title: 'Group of two',
    change: 'Changed',
    note: 'The same item, two across.',
  },
  group3Cta: {
    id: 'group-of-3-cta',
    family: 'Group',
    title: 'Group of three, with a CtaRow',
    change: 'Changed',
    note: '§ 1.4 budget 581.',
  },
  paper: {
    id: 'surface-proof',
    family: 'Surface',
    title: 'Surface proof on paper',
    note: 'On pages G sits on tint (§ 1.7). The typographic slider on paper — the bars and their fill, the focus ring and the attribution all resolve on a second ground.',
  },
} satisfies Record<string, Variation>;

const ORDER: readonly Variation[] = Object.values(VARIATIONS);
const FAMILIES: readonly Family[] = [
  'Typographic',
  'The work first',
  'Featured',
  'Group',
  'Surface',
];

const number = (variation: Variation) => String(ORDER.indexOf(variation) + 1).padStart(2, '0');

/** The titled band above each variation: its number, its name, what changed and what to look for. */
function Label({ variation }: { variation: Variation }) {
  return (
    <Section id={variation.id}>
      <Layout rowGap="tight" className={s.spec}>
        <Cluster colGap="text" rowGap="tight" align="center">
          <span className={s.kitIndex}>G · {number(variation)}</span>
          <span className={s.specTitle}>{variation.title}</span>
          {variation.change ? <Tag>{variation.change}</Tag> : null}
        </Cluster>
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

/** One linked case card with no description (7 Oct), in the one-item list a BlockCard needs. */
function RealCaseCard() {
  if (!REAL_CASE) return null;
  return (
    <Layout as="ul" rowGap="none">
      <BlockCard
        eyebrow={REAL_CASE.client}
        title={REAL_CASE.title}
        href={REAL_CASE_HREF}
        ctaLabel="Read the case"
        media={{ type: 'image', image: getKitPhoto('studio-session-talk', { standIn: true }) }}
        tracks={3}
      />
    </Layout>
  );
}

function featuredSlides() {
  return SLIDES.map((quote) => (
    <li key={quote.name}>
      <Proof arrangement="featured" quote={quote} />
    </li>
  ));
}

/** The typographic slider band: G·02's shape, its quote in an auto-advancing one-up Slider. */
function TypographicSlider({ surface }: { surface: 'tint' | 'paper' }) {
  return (
    <ContentSection
      surface={surface}
      align="center"
      eyebrow="In our clients’ words"
      data-band="G-typographic-slider"
      footer={
        <CtaRow
          align="center"
          actions={[{ label: 'See the work', href: ROUTES.caseStudies }]}
        />
      }
    >
      <Slider label="Client quotes" slideName="testimonial" perView={1} align="center" autoplay>
        {TYPOGRAPHIC_SLIDES.map((quote) => (
          <li key={quote.name}>
            <Proof quote={quote} align="center" />
          </li>
        ))}
      </Slider>
    </ContentSection>
  );
}

/** The four standing rules from the 7 Oct review; each variation's label says which it shows. */
const RULES: readonly { title: string; body: string }[] = [
  {
    title: 'No score beside a quote',
    body: 'A client’s words stand alone. The rating goes with the client list, the CTA and the figures.',
  },
  {
    title: 'No headshots by default',
    body: 'Without a photograph the quote moves to the start edge and a tag takes the image’s place.',
  },
  {
    title: 'Three parts in G-case',
    body: 'Cover, title and link; then the words and who said them. No description, no badge.',
  },
  {
    title: 'Moves, and stops for you',
    body: 'The typographic slider turns on its own, holds under the pointer and focus, and waits under reduced motion.',
  },
];

/**
 * Testimonials — the G family of the UI kit (visual-direction § 1.4, § 3.4 G, § 3.6, § 5.8), as
 * revised by the 7 Oct 2026 review.
 *
 * Every variation is a live band on tint, the ground G takes on a page (§ 1.7), each under a
 * titled paper band that says what it is, what changed and what to look for. The last variation is
 * the one surface proof on paper (§ 8.6).
 */
export default function TestimonialsKitPage() {
  if (!REAL_QUOTE) {
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
              <p className={s.eyebrow}>UI kit · Family G · 7 Oct review</p>
              <h1>Testimonials</h1>
              <p className={s.specNote}>
                What clients said, set so it reads as evidence: the words first, then who said
                them. The work beside them where there is a case; a face only where the image is
                the band’s one idea; never a score. Thirteen bands from one Proof pattern and
                one Slider, each on tint and inside one screen at 1470.
              </p>
            </Layout>
            {/* The index, by family: each family a column of its numbered variations. */}
            <Layout columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="block">
              {FAMILIES.map((family) => (
                <Layout key={family} rowGap="tight">
                  <p className={s.specTitle}>{family}</p>
                  <Layout as="ol" rowGap="none">
                    {ORDER.filter((v) => v.family === family).map((v) => (
                      <li key={v.id}>
                        <Button
                          as="a"
                          href={`#${v.id}`}
                          emphasis="link"
                          tone="primary"
                          size="sm"
                        >
                          {`${number(v)}  ${v.title}`}
                        </Button>
                      </li>
                    ))}
                  </Layout>
                </Layout>
              ))}
            </Layout>
          </Layout>
          <Media image={getKitPhoto('workshop-brick-room')} ratio="4/5" sizes={MEDIA_SPLIT} />
        </Layout>
      </Section>

      {/* ── The rulings, each linked to the band that shows it ─────────────────────── */}
      <Section>
        <Layout as="ol" columns={{ base: 1, md: 2, lg: 4 }} colGap="gutter" rowGap="stack">
          {RULES.map((rule, index) => (
            <li key={rule.title}>
              <Layout rowGap="text" className={s.spec}>
                <span className={s.kitIndex}>{String(index + 1).padStart(2, '0')}</span>
                <Layout rowGap="tight">
                  <h2 className={s.kitRuleTitle}>{rule.title}</h2>
                  <p className={s.specNote}>{rule.body}</p>
                </Layout>
              </Layout>
            </li>
          ))}
        </Layout>
      </Section>

      {/* ── Typographic ───────────────────────────────────────────────────────────── */}
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

      <Band variation={VARIATIONS.typographicSlider}>
        <TypographicSlider surface="tint" />
      </Band>

      <Band variation={VARIATIONS.typographic}>
        <ContentSection
          surface="tint"
          align="center"
          eyebrow="In a client’s words"
          data-band="G-typographic"
        >
          <Proof quote={REAL_QUOTE} align="center" />
        </ContentSection>
      </Band>

      {/* ── G-case ────────────────────────────────────────────────────────────────── */}
      <Band variation={VARIATIONS.case}>
        <ContentSection
          surface="tint"
          heading="A client’s view of the work"
          headingId="kit-g-case"
          data-band="G-case"
        >
          <Proof arrangement="case" work={<RealCaseCard />} quote={REAL_QUOTE} />
        </ContentSection>
      </Band>

      {/* ── Featured ──────────────────────────────────────────────────────────────── */}
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

      {/* No head: a one-up slide is its own large object, and the rail and steppers say what the
          band is. The § 1.4 row is portrait + block + controls, 549. */}
      <Band variation={VARIATIONS.featuredSlider}>
        <Section surface="tint" data-band="G-slider">
          <Slider label="Client stories" perView={1}>
            {featuredSlides()}
          </Slider>
        </Section>
      </Band>

      <Band variation={VARIATIONS.featuredNoImage}>
        <Section surface="tint" data-band="G-featured">
          <Proof arrangement="featured" quote={ARJUN_NO_IMAGE} />
        </Section>
      </Band>

      {/* ── Groups ────────────────────────────────────────────────────────────────── */}
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

      {/* ── Surface proof ─────────────────────────────────────────────────────────── */}
      <Band variation={VARIATIONS.paper}>
        <TypographicSlider surface="paper" />
      </Band>
    </>
  );
}
