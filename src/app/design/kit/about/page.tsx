import type { Metadata } from 'next';

import { Layout, Section, Stat, TextureHorizon, type IconName } from '@/components';
import {
  Banner,
  BlockCardSet,
  Breadcrumbs,
  ContentSection,
  CtaRow,
  CtaSection,
  EnquiryForm,
  ListCard,
  PageHero,
  Proof,
  Statement,
  type BlockCardSetItem,
  type CtaIconPoint,
  type ProofQuote,
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
 *    1  A   the trail and the Holi photograph LEADING (`wide`, 3:2 in 3 of 5) — the studio hero is
 *           not the home hero's [1, 1] 5:4 rectangle again (fix round 1)
 *    2  J   why the studio exists, one centred sentence at display scale, the corner field
 *    3  C   four studio scenes, our own photographs, under the H-row, numbered through the week
 *    4  B   the studio board at 4:5 beside a title head, two tiles and the way to the method
 *    5  D   the people you would work with: four portraits, centred, `horizon` at the foot above
 *           the tint band (fix round 1: six names behind arbitrary glyphs, 1662 tall on a phone)
 *    6  G   the proof band on tint: one featured client with a stock portrait, mirrored
 *    7  S   the studio in four numerals beside its head, 2 × 2
 *    8  I   THE IMAGE MOMENT: one 3:1 photograph across the column under its H-row
 *    9  K   the careers offer, beside: the head and its asks in the head track, the points in the
 *           body — no photograph, so the page's last three bands are not three splits
 *   10  L   the close: a warm photograph of people at work beside the compact form
 *
 * Shapes (fix round 1): the splits are B, G and L, never adjacent; the J statement, the centred
 * portrait row, the 3:1 banner and the beside offer sit between them. Texture signature: corner on
 * J, horizon on D — two placements, neither the home page's foot nor the closing equaliser, so the
 * texture marks this page as its own. Media sides alternate: B start, G end, L start. One vivid
 * photograph, the offsite scene in the C set (§ 8.3). Every name is invented, as every name on a
 * showcase page is (§ 8.4), and every portrait is stock: the studio's own pre-cut headshots are not
 * used (§ 9, ch05 § 3).
 */

const photo = (id: PhotoId) => getKitPhoto(id);
const cover = (id: PhotoId): BlockCardSetItem['media'] => ({ type: 'image', image: photo(id) });
const face = (id: PhotoId, y: number): BlockCardSetItem['media'] => ({
  type: 'image',
  image: { ...photo(id), focus: { x: 0.5, y } },
});

/* The Holi frame: faces cluster in the middle band, so the 3:2 crop holds 0.3–0.6 vertically. */
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

/* ── 4 · B ─────────────────────────────────────────────────────────────────────────────────
   The board at 4:5 in the 477 (the one studio photo that resolves there, § 5.4), the copy in 667: a
   title head, its lead, two tiles and a CtaRow fill the column to the photograph's height (fix
   round 1: the counterweight field filled the dead space under a lone head and read as filler).
   Tiles ≤ 4 / ≤ 20 words. */
const STUDIO_BOARD = { ...photo('studio-sticky-board-ux'), focus: { x: 0.62, y: 0.2 } };

type Tile = { icon: IconName; title: string; body: string };
const WALL: readonly Tile[] = [
  {
    icon: 'notebook',
    title: 'Research on the left',
    body: 'Every interview note goes up the day it is taken, so findings are seen before they are filed.',
  },
  {
    icon: 'ruler-pen',
    title: 'Screens on the right',
    body: 'Each screen sits beside the finding it answers, so a reviewer can ask why and point to it.',
  },
];

/* ── 5 · D, the people ─────────────────────────────────────────────────────────────────────
   Four people with faces (fix round 1). Stock portraits on plain light grounds, cropped 3:2 on the
   eyes; the name is the title, the role the eyebrow, one line of what they own (≤ 12 words). */
const PEOPLE: readonly BlockCardSetItem[] = [
  {
    id: 'about-person-meera',
    eyebrow: 'Principal designer',
    title: 'Meera Joshi',
    body: 'Leads the product model and the weekly crit.',
    media: face('portrait-woman-black-top', 0.34),
  },
  {
    id: 'about-person-tom',
    eyebrow: 'Design engineer',
    title: 'Tom Becker',
    body: 'Builds the component library in your stack, reviewed like any commit.',
    media: face('portrait-man-hat', 0.42),
  },
  {
    id: 'about-person-lena',
    eyebrow: 'Research lead',
    title: 'Lena Park',
    body: 'Runs the interviews that settle what the product must decide.',
    media: face('portrait-woman-glasses-plaid', 0.34),
  },
  {
    id: 'about-person-marco',
    eyebrow: 'Design systems lead',
    title: 'Marco Reyes',
    body: 'Turns each decision into tokens engineers want to use.',
    media: face('portrait-man-glasses-stripes', 0.4),
  },
];

/* ── 6 · G featured ────────────────────────────────────────────────────────────────────────
   A fictional client at a fictional company, a warm stock portrait (§ 5.8). ≤ 40 words. */
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
   Illustrative numerals (§ 8.4), labels ≤ 12 words; no client mark in the band. The 11 years moved
   here from the people band, which now carries faces rather than a figure. */
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
    value: '11',
    unit: 'years',
    label: 'Average experience of the principal who would lead your work.',
  },
  {
    value: '3',
    unit: 'time zones',
    label: 'India, Europe and the US East Coast, covered every working day.',
  },
] as const;

/* ── 9 · K careers offer ───────────────────────────────────────────────────────────────────
   Icon points (≤ 4 / ≤ 12 words): what the offer contains, not a sequence. No photograph (fix round
   1: the lifestyle home-office frame broke the page's tone), so it is the beside offer — the head
   and its asks in the head track, the points in the body. */
const ROLE_POINTS = [
  {
    icon: 'users-group-rounded',
    label: 'Senior work from week one',
    detail: 'Real products and real users, never a practice brief.',
  },
  {
    icon: 'code-square',
    label: 'Design and code in one room',
    detail: 'Designers ship to the repository; engineers sit in every crit.',
  },
  {
    icon: 'clock-circle',
    label: 'A morning a week for craft',
    detail: 'Protected time to study, sketch and teach each other.',
  },
] as const satisfies readonly CtaIconPoint[];

/* ── 10 · L ────────────────────────────────────────────────────────────────────────────────
   The compact ask beside people at work (cmp-form's L-photo): here the close is people and a short
   form, where home's is the full form over the equaliser and the services index's is centred. */
const CLOSE_PHOTO = { ...photo('team-table-laptops-smiling'), focus: { x: 0.62, y: 0.45 } };

const COMPACT_STEPS = [
  {
    label: 'A principal replies within a working day',
    detail: 'With what we would look at first, and a time to talk.',
  },
] as const;

const FORM_CONTEXT = {
  originRoute: ROUTES.designKitAbout,
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
      {/* 1 · A — the trail and the Holi photograph leading; no eyebrow, so nothing repeats "About". */}
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
        arrangement="wide"
        media={{ type: 'image', ratio: '3/2', image: HOLI }}
      />

      {/* 2 · J — why the studio exists, centred at display scale, the corner field. */}
      <Statement
        id="about-why"
        eyebrow="Why we started"
        size="display"
        align="center"
        texture="corner"
      >
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

      {/* 4 · B — the board at the start, a title head, two tiles and the way to the method. */}
      <ContentSection
        data-band="B"
        arrangement="media"
        media={{ image: STUDIO_BOARD, side: 'start', head: 'title' }}
        eyebrow="How we decide"
        heading="One wall, every decision"
        headingId="about-wall"
        lead="Research, rules and interface design share one board all project, so anyone can see why a screen exists."
        actions={
          <CtaRow rule={false} actions={[{ label: 'How we work', href: ROUTES.howWeWork }]} />
        }
      >
        <Layout as="ul" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
          {WALL.map((tile) => (
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

      {/* 5 · D — the people, with faces; horizon at the foot, above the tint band. */}
      <ContentSection
        data-band="D-people"
        align="center"
        eyebrow="The people"
        heading="Who you would work with"
        headingId="about-people"
        lead="Senior people only, and the same four from the first workshop to the release."
        texture={<TextureHorizon />}
      >
        <BlockCardSet items={PEOPLE} lead="none" label="Who you would work with" />
      </ContentSection>

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

      {/* 7 · S — the studio in four numbers, beside its head. */}
      <ContentSection
        data-band="S"
        arrangement="beside"
        eyebrow="The studio in numbers"
        heading="Small on purpose"
        headingId="about-numbers"
        lead="A studio sized so that everyone on your project has met everyone else on it."
      >
        <Layout as="ul" columns={2} colGap="gutter" rowGap="stack">
          {STATS.map((stat) => (
            <Stat key={stat.label} as="li" size="lg" {...stat} />
          ))}
        </Layout>
      </ContentSection>

      {/* 8 · I — the image moment: one 3:1 photograph under its H-row. */}
      <Banner
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

      {/* 9 · K — the careers offer, beside: no photograph. */}
      <CtaSection
        data-band="K"
        arrangement="offer"
        markers="icon"
        eyebrow="Careers"
        heading="Design engineers, build with us"
        body={[
          'We hire a few senior people a year, and every one of them works on real products from the first week.',
        ]}
        points={ROLE_POINTS}
        actions={[
          { label: 'See open roles', href: ROUTES.careers },
          { label: 'How we hire', href: ROUTES.team },
        ]}
      />

      {/* 10 · L — the close: people at work beside the compact form. */}
      <ContentSection
        data-band="L"
        arrangement="media"
        media={{ image: CLOSE_PHOTO, side: 'start', head: 'title' }}
        eyebrow="Work with the studio"
        heading="Bring us the decision you are stuck on"
        headingId="about-close"
        lead="Describe what is not working. A principal reads every enquiry, and your first call is with the person who would lead the work."
      >
        <EnquiryForm
          variant="compact"
          action={`${ENDPOINTS.enquiryDesign}?outcome=success`}
          context={FORM_CONTEXT}
          nextSteps={COMPACT_STEPS}
        />
      </ContentSection>
    </>
  );
}
