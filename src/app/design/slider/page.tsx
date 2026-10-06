import { Layout, Media, Section, type SectionSurface } from '@/components';
import { MEDIA_SPLIT } from '@/lib/image-sizes';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { ROUTES } from '@/lib/routes';
import { BlockCard, ContentSection, Proof, Slider, type ProofQuote } from '@/patterns';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/* ── Content ─────────────────────────────────────────────────────────────────────────────────
   Invented, in Tcules' voice (visual-direction § 8.4): work cards with stock photographs from the
   kit registry, warm and neutral only, so one specimen reads as one page family (§ 5.5). The
   testimonials are fictional people at fictional companies, with stock portraits (§ 5.8). Every
   card title is two lines at 392 and every body two lines — § 1.4's Card-3 at its ceiling. */

type Card = { title: string; body: string; image: PhotoId };

const WORK: readonly Card[] = [
  {
    title: 'A claims desk that reads like the work',
    body: 'Four queues became one, ordered by what the adjuster decides next.',
    image: 'whiteboard-two-hands',
  },
  {
    title: 'The design system a platform team adopted',
    body: 'Forty components, one token layer, and a release the engineers asked for.',
    image: 'wireframe-wall',
  },
  {
    title: 'An onboarding flow cut from nine steps to four',
    body: 'We removed what the bank already knew and asked the rest once.',
    image: 'hand-sketch-wireframe',
  },
  {
    title: 'A fleet console dispatchers trust at 3am',
    body: 'Alerts ranked by consequence, not by the order they arrived in.',
    image: 'pair-laptop-notebook',
  },
  {
    title: 'A research repository people actually open',
    body: 'Findings filed by the decision they changed, not by the study that found them.',
    image: 'team-laptops-table',
  },
  {
    title: 'A pricing page that stopped the sales calls',
    body: 'Three plans, one comparison, and the question every buyer was asking.',
    image: 'board-review-backs',
  },
  {
    title: 'A field app that works without signal',
    body: 'Inspections save offline and reconcile when the van is back in range.',
    image: 'workshop-hands-writing',
  },
  {
    title: 'A reporting suite with one source of truth',
    body: 'Every figure traces to the query that made it, one click away.',
    image: 'stylus-tablet-sketch',
  },
];

const photo = (id: PhotoId) => getKitPhoto(id);

/**
 * Linked image cards — the C-image set a Slider carries at five or more (§ 1.4 rule 3). Past eight
 * the list repeats, for the long-row specimen.
 */
function workCards(count: number, size?: 'sm') {
  return Array.from({ length: count }, (_, index) => WORK[index % WORK.length]!).map(
    (card, index) => (
      <BlockCard
        key={`${index}-${card.title}`}
        title={card.title}
        body={card.body}
        href={ROUTES.caseStudies}
        tracks={3}
        size={size}
        media={{ type: 'image', image: photo(card.image) }}
      />
    ),
  );
}

/** Text cards with no link: nothing focusable inside, so the row takes the tab stop itself. */
const PRINCIPLES = [
  {
    title: 'Read the real work first',
    body: 'Who does what, in which order, under whose authority. Then the screens.',
  },
  {
    title: 'Settle the product model',
    body: 'Which records exist and which rules bind them, before a single layout.',
  },
  {
    title: 'Design the behaviour',
    body: 'What the interface does when it is wrong, slow or empty, not only when it is right.',
  },
  {
    title: 'Ship the smallest true thing',
    body: 'One workflow end to end, in production, with the people who run it.',
  },
  {
    title: 'Leave a system behind',
    body: 'Tokens, components and the reasons for them, so the next team does not start over.',
  },
];

function principleCards() {
  return PRINCIPLES.map((card) => (
    <BlockCard key={card.title} title={card.title} body={card.body} />
  ));
}

/* Fictional clients, stock portraits — the G slider's slides (§ 8.3 band 6). */
const STORIES: readonly { quote: ProofQuote; portrait: PhotoId }[] = [
  {
    quote: {
      quoteHtml:
        '<p>They showed us which half of the roadmap was habit, and we cut it in a week. The half we kept shipped in a quarter.</p>',
      name: 'Mira Castellan',
      role: 'Head of Product',
      company: 'Dunmere',
    },
    portrait: 'portrait-man-blue-office',
  },
  {
    quote: {
      quoteHtml:
        '<p>Every review ended with a decision, and our engineers could see why the sequence changed.</p>',
      name: 'Tomasz Ellery',
      role: 'Engineering Lead',
      company: 'Aldermoor',
    },
    portrait: 'portrait-woman-grey',
  },
  {
    quote: {
      quoteHtml:
        '<p>The work felt considered without ever slowing delivery. That is rarer than it sounds.</p>',
      name: 'Priya Anand-Whitcombe',
      role: 'Director of Operations',
      company: 'Brightwell',
    },
    portrait: 'portrait-man-green',
  },
];

/**
 * A featured testimonial as one slide: the G "featured with portrait" shape, [5, 7] at `section`
 * — a 1:1 portrait at 477 beside the quote, centred on it (§ 3.2 rule 2: copy that does not end in
 * an action is centred on the image). cmp-testimonials owns this composition; here it is only the
 * slide the Slider is proven against, at § 1.4's 477.
 */
function storySlides() {
  return STORIES.map((story) => (
    <li key={story.quote.name}>
      <Layout columns={{ lg: [5, 7] }} colGap="section" rowGap="stack" align="center">
        <Media image={photo(story.portrait)} ratio="1/1" sizes={MEDIA_SPLIT} />
        <Proof quote={story.quote} />
      </Layout>
    </li>
  ));
}

const SURFACES: readonly SectionSurface[] = ['paper', 'tint', 'ink', 'blue'];

/**
 * A band-level note: a `spec` block holding only its title and note, which the shots harness crops
 * from this band through the live band that follows it (CtaSection's SpecimenNote, same shape).
 */
function Label({ title, children }: { title: string; children: string }) {
  return (
    <Section density="tight">
      <Layout rowGap="tight" className={s.spec}>
        <p className={s.specTitle}>{title}</p>
        <p className={s.specNote}>{children}</p>
      </Layout>
    </Section>
  );
}

/**
 * Slider — the proving ground.
 *
 * Sections 1 to 3 are the Slider where it lives, as live ContentSection bands: C-image-5+ under a
 * centred head and under a left head, and the G testimonial slider on tint. Then the per-view
 * ladder (4 and 2), text cards that hold nothing focusable, the edge counts, and the four
 * surfaces with identical markup. Layout's own scroll mode — `until-md` and `always` on plain
 * boxes — is proven on /design/layout.
 */
export default function SliderSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Slider</h1>
          <p className={s.specNote}>
            A row of slides that scrolls sideways — Layout{' '}
            <code>scroll=&quot;always&quot;</code>, CSS scroll-snap — with previous and next
            controls and a progress rail, 24 under the slides (§ 1.4: controls 24 + 40).{' '}
            <code>perView</code> states the count at the widest step and the Slider owns the
            ladder below it: one slide and a 24 peek below 768, exact counts from 768 up. The
            controls are blue at rest (Free, with the rail&rsquo;s thumb — the pager&rsquo;s
            current marker), fill on hover and focus, and go neutral and{' '}
            <code>aria-disabled</code> at an end, keeping focus. No autoplay. It swipes and
            snaps before hydration; the controls render disabled until then. Swipe at 390; Tab
            moves a linked row; arrow keys scroll a row that holds nothing focusable.
          </p>
        </Layout>
      </Section>

      {/* ── 1 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="1 · C-image-5+ under a centred head (perView 3, align center)">
        § 1.4 rule 3: an image set of five or more is a Slider showing three. H-title + 381 + 64
        = 578, under the 598 target. Centred head (§ 3.5), so the controls centre: previous, the
        rail, next. Six linked cards — every slide is focusable, so Tab moves the row.
      </Label>
      <ContentSection
        align="center"
        eyebrow="Recent work"
        heading="Six products, one way of working"
        headingId="slider-c-image-centred"
      >
        <Slider label="Recent work" align="center">
          {workCards(6)}
        </Slider>
      </ContentSection>

      {/* ── 2 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="2 · C-image-5+ under a left head (perView 3, align start, the default)">
        Left-weighted head, so the row&rsquo;s two ends meet the column&rsquo;s: the rail at the
        start, the two controls at the end. Eight cards, so the thumb is three eighths of the
        rail.
      </Label>
      <ContentSection
        eyebrow="Case studies"
        heading="Products we have shipped this year"
        headingId="slider-c-image-start"
      >
        <Slider label="Case studies">{workCards(8)}</Slider>
      </ContentSection>

      {/* ── 3 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="3 · G slider on tint (perView 1, align center)">
        § 3.4 G and § 8.3 band 6: one featured testimonial per view — a 1:1 portrait at 477
        beside the quote — under an eyebrow-only centred head. 14 + 24 + 477 + 64 = 579. Surface
        proof — on pages, tint is the proof band only (§ 1.7). The slides hold no link, so the
        row itself takes a tab stop and scrolls with the arrow keys.
      </Label>
      <ContentSection
        surface="tint"
        align="center"
        eyebrow="What clients say"
        headingId="slider-g"
      >
        <Slider label="What clients say" perView={1} align="center">
          {storySlides()}
        </Slider>
      </ContentSection>

      {/* ── 4 ──────────────────────────────────────────────────────────────────────────────── */}
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>4 · The per-view ladder</h2>
            <p className={s.specNote}>
              One number at the widest step. 4: one, two, three, four (1440 up) — Card-4 at 286,
              BlockCard <code>size=&quot;sm&quot;</code> (§ 7.2). 2: one, then two from 768.
            </p>
          </Layout>
          <Specimen
            title="perView={4} · eight Card-4 slides"
            note="Four in view at 1440 (286 each), three from 1024, two from 768, one and a peek below."
          >
            <Slider label="Work, four across" perView={4}>
              {workCards(8, 'sm')}
            </Slider>
          </Specimen>
          <Specimen
            title="perView={2} · five pair cards"
            note="Two in view from 768 (604 at the cap), one and a peek below."
          >
            <Slider label="Work, two across" perView={2}>
              {workCards(5)}
            </Slider>
          </Specimen>
        </Layout>
      </Section>

      {/* ── 5 ──────────────────────────────────────────────────────────────────────────────── */}
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>5 · Slides with nothing focusable</h2>
            <p className={s.specNote}>
              Unlinked text cards. A scroll row no key can reach fails WCAG 2.1.1, so when no
              slide holds a focusable element the row takes <code>tabIndex=0</code> after
              hydration: Tab to it (the ring is drawn round the row, 4 clear of the slides),
              then the arrow keys scroll it, snapping card by card.
            </p>
          </Layout>
          <Specimen
            title="perView={3} · five text cards, no links"
            note="Tab once to reach the row."
          >
            <Slider label="How we work">{principleCards()}</Slider>
          </Specimen>
        </Layout>
      </Section>

      {/* ── 6 ──────────────────────────────────────────────────────────────────────────────── */}
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>6 · Edge counts</h2>
            <p className={s.specNote}>
              A slider whose slides all fit has nothing to move: both controls rest disabled and
              the thumb fills the rail. That is the honest state, not a hidden one — but a set
              that fits at every width is a grid, not a Slider (§ 1.4 rule 3 starts at five).
            </p>
          </Layout>
          <Specimen
            title="three slides at perView={3}"
            note="Fits from 1024: both controls disabled, full thumb. Below 1024 it scrolls."
          >
            <Slider label="Three cards">{workCards(3)}</Slider>
          </Specimen>
          <Specimen
            title="twelve slides at perView={4}"
            note="A long row: the thumb is a third of the rail at 1440, and one press moves one slide."
          >
            <Slider label="Twelve cards" perView={4}>
              {workCards(12, 'sm')}
            </Slider>
          </Specimen>
          <Specimen
            title="two slides at perView={1}"
            note="The shortest real slider: one press to the end and one back."
          >
            <Slider label="Two stories" perView={1} align="center">
              {storySlides().slice(0, 2)}
            </Slider>
          </Specimen>
        </Layout>
      </Section>

      {/* ── 7 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="7 · Four surfaces, identical markup">
        The controls, the rail and the focus ring re-declare per surface (slider.css). Paper and
        tint: brandeis-500 glyph on a 300 rule. Ink: the glyph lifts to 200 (blue as ink fails
        on 950). Blue: white, filling white with a blue glyph. Surface proof — on pages, tint is
        the proof band only (§ 1.7), and no band is blue (§ 4.3).
      </Label>
      {SURFACES.map((surface) => (
        <Section key={surface} surface={surface} density="tight">
          <Specimen
            title={`surface="${surface}"`}
            note="Hover a control for the fill, press for the deeper step; Tab for the ring."
          >
            <Slider label={`Recent work on ${surface}`}>{workCards(5)}</Slider>
          </Specimen>
        </Section>
      ))}
    </>
  );
}
