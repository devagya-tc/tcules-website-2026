import type { Metadata } from 'next';

import { Layout, Section, Stat, TextureClosing } from '@/components';
import {
  Banner,
  BlockCardSet,
  Breadcrumbs,
  ContentSection,
  CtaRow,
  CtaSection,
  EnquiryForm,
  PageHero,
  Proof,
  ReadDown,
  Statement,
  type BlockCardSetItem,
  type CtaIconPoint,
  type CtaPoint,
  type ProofQuote,
  type ReadDownRow,
} from '@/patterns';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { ENDPOINTS, ROUTES } from '@/lib/routes';
import { heroTrail } from '@/lib/trail';

export const metadata: Metadata = {
  title: 'About · kit showcase | Design',
  robots: { index: false, follow: false },
};

/**
 * /design/kit/about — the studio page composed from the finished Tcules UI kit (visual-direction
 * § 8.3). Ten bands, warm family, showcase copy written inline (§ 8.4):
 *
 *    1  A   the trail and the Holi photograph at 5:4, the foot field under the copy
 *    2  J   why the studio exists, one centred sentence at display scale
 *    3  C   four studio scenes, our own photographs, under the H-row
 *    4  D   the people you would work with, two columns, one figure in the head track
 *    5  B   the studio board at 4:5 beside a display head, two tiles, the counterweight field
 *    6  G   the proof band on tint: one featured client with a stock portrait, mirrored
 *    7  S   four illustrative numerals about the studio, centred
 *    8  I   a 3:2 photograph beside the copy, photo at the start
 *    9  K   the careers offer, its quiet photograph at the end
 *   10  L   the close, with the form and the closing equaliser
 *
 * Texture signature: the hero's foot field (start), counterweight on B (end), closing on L (start).
 * Media sides alternate down the page: B start, G end, I start, K end. One vivid photograph, the
 * offsite scene in the C set (§ 8.3). The names in D are invented, as every name on a showcase page
 * is (§ 8.4), and sit in their own band, away from the studio photographs.
 */

const photo = (id: PhotoId) => getKitPhoto(id);
const cover = (id: PhotoId): BlockCardSetItem['media'] => ({ type: 'image', image: photo(id) });

/* The Holi frame: faces cluster in the middle band, so the 5:4 crop holds 0.3–0.6 vertically. */
const HOLI = { ...photo('studio-team-holi'), focus: { x: 0.5, y: 0.45 } };

/* ── 3 · C-image-4 ─────────────────────────────────────────────────────────────────────────
   Our own studio photographs at 286 × 161, all ≥ 2× (§ 5.4). Card-4: titles ≤ 8, bodies ≤ 12. */
const WEEK: readonly BlockCardSetItem[] = [
  {
    id: 'about-week-monday',
    title: 'Monday framing',
    body: 'The week’s open decisions, named and owned before anyone draws.',
    media: cover('studio-session-talk'),
  },
  {
    id: 'about-week-crit',
    title: 'Midweek crit',
    body: 'Work on the wall, engineers in the room, nothing precious.',
    media: cover('studio-workshop-presenting'),
  },
  {
    id: 'about-week-pairing',
    title: 'Pairing at one screen',
    body: 'A designer and an engineer settle each state together, in code.',
    media: cover('studio-pair-at-monitor'),
  },
  {
    id: 'about-week-offsite',
    title: 'The quarterly offsite',
    body: 'A day away to argue about craft rather than deadlines.',
    media: cover('studio-offsite-talk'),
  },
];

/* ── 4 · D, two columns ────────────────────────────────────────────────────────────────────
   Names and roles, no portraits (§ 8.3). Titles ≤ 5 words, bodies ≤ 19. One glyph per discipline. */
const PEOPLE: readonly ReadDownRow[] = [
  {
    icon: 'ruler-pen',
    title: 'Meera Joshi',
    body: 'Principal designer. Leads the product model and the weekly crit, from the first workshop on.',
  },
  {
    icon: 'code-square',
    title: 'Kabir Shah',
    body: 'Design engineer. Builds the component library in your stack and reviews every change it touches.',
  },
  {
    icon: 'users-group-rounded',
    title: 'Ananya Rao',
    body: 'Research lead. Runs the interviews and ride-alongs that settle what the product must decide.',
  },
  {
    icon: 'layers',
    title: 'Rohan Desai',
    body: 'Design systems lead. Turns each decision into tokens and components engineers want to use.',
  },
  {
    icon: 'stars',
    title: 'Ishita Mehra',
    body: 'AI product designer. Designs how a model’s answer is shown, checked and corrected.',
  },
  {
    icon: 'shield-check',
    title: 'Vikram Patel',
    body: 'Delivery lead. Says early when scope and time stop agreeing, and what to cut first.',
  },
];

/* ── 5 · B with the counterweight ──────────────────────────────────────────────────────────
   A display head, its lead and one link: the copy column leaves the room the field needs (two tiles
   with it ran the band to 873, past the fold). The band's blue mass is the field, so the ask is a
   link, never a solid (§ 4.3). */
const STUDIO_BOARD = { ...photo('studio-sticky-board-ux'), focus: { x: 0.62, y: 0.2 } };

/* ── 6 · G featured ────────────────────────────────────────────────────────────────────────
   A fictional client at a fictional company, a warm stock portrait (§ 5.8). ≤ 40 words. The same
   face is the same person on every showcase page. */
const FEATURED: ProofQuote = {
  name: 'Daniel Okafor',
  role: 'Chief Product Officer',
  company: 'Brightwater Labs',
  portrait: (() => {
    const { src, width, height, sources } = getKitPhoto('portrait-man-blue-office');
    return { src, width, height, sources };
  })(),
  quoteHtml:
    '<p>It never felt like hiring an agency. The same four people sat with our team every week for a year, and they still answer when we call about a decision they made with us.</p>',
};

/* ── 7 · S ─────────────────────────────────────────────────────────────────────────────────
   Illustrative numerals (§ 8.4), labels ≤ 12 words; no client mark in the band. */
const STATS = [
  {
    value: '18',
    unit: 'people',
    label: 'Designers, researchers and design engineers in one studio.',
  },
  {
    value: '64',
    unit: 'products',
    label: 'Designed and shipped with product teams since the studio opened.',
  },
  {
    value: '3',
    unit: 'time zones',
    label: 'India, Europe and the US East Coast, covered every working day.',
  },
  {
    value: '0',
    unit: 'handoffs',
    label: 'Between the people who research, design and build your product.',
  },
] as const;

/* ── 9 · K careers offer ───────────────────────────────────────────────────────────────────
   One-line icon points (≤ 4 / ≤ 12 words): what the offer contains, not a sequence. */
const ROLE_POINTS = [
  { icon: 'users-group-rounded', label: 'Senior work from week one' },
  { icon: 'code-square', label: 'Design and code in one room' },
  { icon: 'clock-circle', label: 'A morning a week for craft' },
] as const satisfies readonly CtaIconPoint[];

/* ── 10 · L ────────────────────────────────────────────────────────────────────────────────
   Point labels ≤ 4 words, details ≤ 18. */
const NEXT: readonly CtaPoint[] = [
  {
    label: 'Meet the people',
    detail: 'Your first call is with the principal who would lead the work, not a salesperson.',
  },
  {
    label: 'See the studio',
    detail: 'Visit us in Ahmedabad, or join a crit on video and watch how we review.',
  },
  {
    label: 'Start small',
    detail: 'A fixed two-week first phase, so you judge the team on what it ships.',
  },
];

const FORM_CONTEXT = {
  originRoute: '/design/kit/about',
  placement: 'kit-about-close',
  family: 'about',
  serviceOrAudit: 'kit-about',
  referrer: '',
  campaign: '',
} as const;

const TITLE = 'A small studio that owns the whole product';

export default function KitAboutPage() {
  return (
    <>
      {/* 1 · A — the trail and the Holi photograph; no eyebrow, so nothing repeats "About". */}
      <PageHero
        data-band="A"
        data-fold-hero=""
        trail={heroTrail(
          [
            { label: 'Home', href: ROUTES.home },
            { label: 'About', href: ROUTES.about },
          ],
          TITLE,
          (trail) => (
            <Breadcrumbs {...trail} />
          ),
        )}
        title={TITLE}
        body={[
          'Researchers, designers and engineers in one room, accountable for the product decision and for the software it becomes.',
        ]}
        actions={[
          { label: 'Work with us', href: ROUTES.contact },
          { label: 'Meet the team', href: ROUTES.team },
        ]}
        arrangement="beside"
        media={{ type: 'image', ratio: '5/4', image: HOLI }}
        texture
      />

      {/* 2 · J — why the studio exists, centred at display scale. */}
      <Statement id="about-why" eyebrow="Why we started" size="display" align="center">
        Good products kept dying in the handover, so we removed the handover.
      </Statement>

      {/* 3 · C-image-4 — a week in the studio, our own photographs. */}
      <ContentSection
        data-band="C-image"
        arrangement="split-head"
        eyebrow="Inside the studio"
        heading="How a week runs here"
        headingId="about-week"
        lead="Eighteen people in one room, reviewing work every day rather than saving it for a milestone."
      >
        <BlockCardSet items={WEEK} lead="none" numbered label="How a week runs here" />
      </ContentSection>

      {/* 4 · D — the people, one figure in the head track. */}
      <ContentSection
        data-band="D"
        arrangement="beside"
        eyebrow="The people"
        heading="Who you would work with"
        headingId="about-people"
        lead="Senior people only, and the same people from the first workshop to the release."
        aside={
          <Stat
            value="11"
            unit="years"
            label="Average experience of the principal who would lead your work."
          />
        }
      >
        <ReadDown rows={PEOPLE} columns={2} />
      </ContentSection>

      {/* 5 · B — the board, a display head, two tiles, the counterweight at the copy's foot. */}
      <ContentSection
        data-band="B"
        arrangement="media"
        media={{ image: STUDIO_BOARD, side: 'start', head: 'display', counterweight: true }}
        eyebrow="How we decide"
        heading="One wall, every decision"
        headingId="about-wall"
        lead="Research, rules and interface design share one board all project, so anyone can see why a screen exists."
        actions={
          <CtaRow rule={false} actions={[{ label: 'How we work', href: ROUTES.howWeWork }]} />
        }
      />

      {/* 6 · G — the one tint band: a featured client, the portrait at the end. */}
      <Section surface="tint" data-band="G-featured">
        <Proof
          arrangement="featured"
          reverse
          quote={FEATURED}
          footer={
            <CtaRow
              rule={false}
              actions={[{ label: 'Read their story', href: ROUTES.caseStudies }]}
            />
          }
        />
      </Section>

      {/* 7 · S — the studio in four numbers. */}
      <ContentSection
        data-band="S"
        align="center"
        headingSize="md"
        eyebrow="The studio in numbers"
        heading="Small on purpose"
        headingId="about-numbers"
        lead="A studio sized so that everyone on your project has met everyone else on it."
      >
        <Layout as="ul" columns={{ md: 2, lg: 4 }} colGap="gutter" rowGap="gutter">
          {STATS.map((stat) => (
            <Stat key={stat.label} as="li" align="center" {...stat} />
          ))}
        </Layout>
      </ContentSection>

      {/* 8 · I — a 3:2 photograph beside the copy, the photograph at the start. */}
      <Banner
        form="beside"
        mediaSide="start"
        eyebrow="Where we work"
        heading="The flow is drawn before it is built"
        headingId="about-drawn"
        lead="Every state, edge and handover is sketched with the engineers who will ship it, so nothing is rediscovered in code."
        actions={
          <CtaRow
            rule={false}
            actions={[{ label: 'See design engineering', href: ROUTES.designEngineering }]}
          />
        }
        image={photo('whiteboard-two-hands')}
      />

      {/* 9 · K — the careers offer, its quiet photograph at the end. */}
      <CtaSection
        data-band="K"
        arrangement="offer"
        markers="icon"
        eyebrow="Careers"
        heading="Design engineers, come and build with us"
        body={[
          'We hire a few senior people a year, and every one of them works on real products from the first week.',
        ]}
        points={ROLE_POINTS}
        actions={[
          { label: 'See open roles', href: ROUTES.careers },
          { label: 'How we hire', href: ROUTES.team },
        ]}
        media={{ image: photo('pair-laptop-notebook'), side: 'end' }}
      />

      {/* 10 · L — the close. */}
      <CtaSection
        data-band="L"
        eyebrow="Work with the studio"
        heading="Bring us the decision you are stuck on"
        body={[
          'Describe what is not working. A principal reads every enquiry and replies within one working day.',
        ]}
        points={NEXT}
        form={
          <EnquiryForm
            action={`${ENDPOINTS.enquiryDesign}?outcome=success`}
            context={FORM_CONTEXT}
            scheduleHref={ROUTES.contact}
          />
        }
        texture={<TextureClosing />}
      />
    </>
  );
}
