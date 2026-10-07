import type { Metadata } from 'next';

import { Layout, Section, Stat, TextureHorizon, type IconName } from '@/components';
import {
  Banner,
  BlockCard,
  BlockCardSet,
  Breadcrumbs,
  ContentSection,
  CtaRow,
  EnquiryForm,
  ListCard,
  PageHero,
  Proof,
  Statement,
  type BlockCardSetItem,
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
 *    1  A   title-led: the trail, the h1 at the display role over the Holi photograph at the full
 *           column, a 4:1 panorama from 1024 (fix round 2: the `wide` split was the home hero's
 *           copy-beside-photo rectangle again, with a different crop)
 *    2  J   why the studio exists, one centred sentence at display scale, the corner field (1024+)
 *    3  C   four studio scenes, our own photographs, under a stacked head, numbered through the week
 *    4  B   the studio board at 4:5 beside a title head, two tiles and the way to the method
 *    5  D   the people you would work with: four square headshots under a centred head (fix round
 *           2: 16:9 strips cut heads at the hat and chin, and repeated the week's card row), the
 *           `horizon` at the foot above the tint band
 *    6  G   the proof band on tint: one featured client with a stock portrait, mirrored
 *    7  S   the studio in four blue numerals in one row under its stacked head — not a head beside a grid
 *    8  I   THE IMAGE MOMENT, beside: the whiteboard at 3:2 in the 7, the copy centred on it in 5
 *    9  K   careers, a centred moment: the head, three offers in a row, the asks centred under them
 *   10  L   the close: the compact form beside the studio's own crit photograph, at the END
 *
 * Shapes (fix round 2): the lower half alternates split (G), row (S), split (I), centred (K),
 * split (L) — never two block-left-block-right bands back to back. The image moment here is the
 * `beside` banner, where home's is the 3:1 under its stacked head and the services index's a photo pair,
 * so the three pages do not share one stamped banner. Texture signature: corner on J, horizon on D
 * — two placements, neither the home page's head-half nor the closing equaliser. Media sides
 * alternate: B start, G end, I start, L end. One vivid photograph, the offsite scene in the C set
 * (§ 8.3). Every name is invented, as every name on a showcase page is (§ 8.4); the team are stock
 * portraits, because the studio's own pre-cut headshots are not used (§ 9, ch05 § 3), and the
 * close is the studio's own photograph.
 */

const photo = (id: PhotoId) => getKitPhoto(id);
const cover = (id: PhotoId): BlockCardSetItem['media'] => ({ type: 'image', image: photo(id) });

/* The Holi frame: faces cluster in the middle band, so the 4:1 panorama and the phone's 3:2 hold
   0.3–0.6 vertically, raised hands and all. */
const HOLI = { ...photo('studio-team-holi'), focus: { x: 0.5, y: 0.42 } };

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
   Four people with faces, each a SQUARE headshot (BlockCard `headshot`, fix round 2): the square
   stock portrait's own frame at every width, so no crop takes the hat or the chin. The role is the
   eyebrow, the name the title, one line of what they own (≤ 6 words, one line at 286). Two up on a phone. */
const PEOPLE = [
  {
    id: 'portrait-woman-black-top',
    role: 'Principal designer',
    name: 'Meera Joshi',
    owns: 'Leads the model and the crit.',
  },
  {
    id: 'portrait-man-hat',
    role: 'Design engineer',
    name: 'Tom Becker',
    owns: 'Builds the library in your stack.',
  },
  {
    id: 'portrait-woman-glasses-plaid',
    role: 'Research lead',
    name: 'Lena Park',
    owns: 'Runs the user interviews.',
  },
  {
    id: 'portrait-man-glasses-stripes',
    role: 'Design systems lead',
    name: 'Marco Reyes',
    owns: 'Turns decisions into tokens.',
  },
] as const satisfies readonly { id: PhotoId; role: string; name: string; owns: string }[];

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
   Illustrative numerals (§ 8.4), labels ≤ 12 words; no client mark in the band. One row of four
   under a stacked head (fix round 2: a head beside a 2 × 2 grid was one more block-left-block-right
   band), the numerals blue like every figure in the kit. */
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

/* ── 9 · K careers, centred ────────────────────────────────────────────────────────────────
   Three offers as icon tiles (≤ 5 / ≤ 12 words) in one row under a centred head, the two asks
   centred under them (fix round 2: the beside offer and the photo-beside-form close were two splits
   back to back). What the offer contains, not a sequence, so icons rather than numerals. */
const ROLE_POINTS = [
  {
    icon: 'users-group-rounded',
    title: 'Senior work from week one',
    body: 'Real products and real users, never a practice brief.',
  },
  {
    icon: 'code-square',
    title: 'Design and code in one room',
    body: 'Designers ship to the repository; engineers sit in every crit.',
  },
  {
    icon: 'clock-circle',
    title: 'A morning a week for craft',
    body: 'Protected time to study, sketch and teach each other.',
  },
] as const satisfies readonly { icon: IconName; title: string; body: string }[];

/* ── 10 · L ────────────────────────────────────────────────────────────────────────────────
   The compact ask beside the studio's own crit (cmp-form's L-photo, fix round 2): on the one page
   with real studio photography, the close is the studio at work, not a stock café table. The
   presenter stands at the frame's end, so the 4:5 crop anchors there. */
const CLOSE_PHOTO = { ...photo('studio-whiteboard-crit'), focus: { x: 0.8, y: 0.5 } };

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

const TITLE = 'Small on purpose';

export default function KitAboutPage() {
  return (
    <>
      {/* 1 · A — title-led: the h1 at display scale over the Holi panorama; no eyebrow, so nothing
          repeats "About". */}
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
          'Researchers, designers and engineers in one room, from decision to code.',
        ]}
        converts
        actions={[
          { label: 'Work with us', href: ROUTES.contact },
          { label: 'Meet the team', href: ROUTES.team },
        ]}
        arrangement="display"
        media={{ type: 'image', image: HOLI }}
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

      {/* 5 · D — the people, square headshots under a centred head; horizon at the foot. */}
      <ContentSection
        data-band="D-people"
        align="center"
        eyebrow="The people"
        heading="Who you would work with"
        headingId="about-people"
        lead="Senior people only, the same four from workshop to release."
        texture={<TextureHorizon />}
      >
        <Layout as="ul" columns={{ base: 2, lg: 4 }} colGap="gutter" rowGap="stack">
          {PEOPLE.map((person) => (
            <BlockCard
              key={person.id}
              eyebrow={person.role}
              title={person.name}
              body={person.owns}
              media={{ type: 'image', image: photo(person.id) }}
              ratio="headshot"
              tracks={3}
            />
          ))}
        </Layout>
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

      {/* 7 · S — the studio in four blue numerals, one row under its stacked head. */}
      <ContentSection
        data-band="S"
        eyebrow="The studio in numbers"
        heading="Four numbers, one room"
        headingId="about-numbers"
        lead="A studio sized so that everyone on your project has met everyone else on it."
      >
        <Layout as="ul" columns={{ md: 2, lg: 4 }} colGap="gutter" rowGap="stack">
          {STATS.map((stat) => (
            <Stat key={stat.label} as="li" size="lg" {...stat} />
          ))}
        </Layout>
      </ContentSection>

      {/* 8 · I — the image moment, beside: the whiteboard in the 7 at the start, the copy centred. */}
      <Banner
        form="beside"
        mediaSide="start"
        eyebrow="Where we work"
        heading="The flow is drawn before it is built"
        headingId="about-drawn"
        lead="Every state, edge and handover is sketched with the engineers who will ship it, so nothing is found again in code."
        actions={
          <CtaRow
            rule={false}
            actions={[{ label: 'See design engineering', href: ROUTES.designEngineering }]}
          />
        }
        image={photo('whiteboard-two-hands')}
      />

      {/* 9 · K — careers, a centred moment: three offers in a row, the asks centred under them. */}
      <ContentSection
        data-band="K"
        align="center"
        eyebrow="Careers"
        heading="Design engineers, build with us"
        headingId="about-careers"
        lead="We hire a few senior people a year, and every one of them works on real products from the first week."
        footer={
          <CtaRow
            align="center"
            emphasis="solid"
            converts={false}
            actions={[
              { label: 'See open roles', href: ROUTES.careers },
              { label: 'How we hire', href: ROUTES.team },
            ]}
          />
        }
      >
        <Layout as="ul" columns={{ md: 3 }} colGap="gutter" rowGap="stack">
          {ROLE_POINTS.map((point) => (
            <ListCard
              key={point.title}
              form="tile"
              titleAs="h3"
              marker={{ type: 'icon', name: point.icon }}
              title={point.title}
              body={point.body}
            />
          ))}
        </Layout>
      </ContentSection>

      {/* 10 · L — the close: the compact form beside the studio's own crit, at the end. */}
      <ContentSection
        data-band="L"
        arrangement="media"
        media={{ image: CLOSE_PHOTO, side: 'end', head: 'title' }}
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
