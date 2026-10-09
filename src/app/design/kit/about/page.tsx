import type { Metadata } from 'next';

import {
  BrandMark,
  Icon,
  Layout,
  RatingBadge,
  Section,
  Stat,
  type IconName,
} from '@/components';
import { getNavigation } from '@/content';
import {
  Breadcrumbs,
  ContentSection,
  CtaSection,
  EngagementModel,
  ListCard,
  PageHero,
  Statement,
  VideoTestimonial,
  type CtaPoint,
  type EngagementPoint,
  type VideoTestimonialFilm,
} from '@/patterns';
import { getKitPhoto } from '@/lib/photos';
import { ROUTES } from '@/lib/routes';
import { heroTrail } from '@/lib/trail';

export const metadata: Metadata = {
  title: 'About · kit showcase | Design',
  robots: { index: false, follow: false },
};

/**
 * /design/kit/about — the studio page composed from the components reviewed on 7 and 9 Oct, each
 * used once, in a narrative order (recomposed 9 Oct 2026):
 *
 *   1  A        who we are: the trail, the h1 over the Holi panorama. One blue solid, its ghost.
 *   2  B        how a week runs: four non-clickable hairline tiles (glyph, title, body, stacked)
 *               beside the studio board at the start
 *   3  J        why: one sentence, centred, a mark in the graphic slot above the eyebrow
 *   4  USP      how we engage: EngagementModel, compact — the answer to the statement above it
 *   5  G-video  a client, on film: VideoTestimonial `wide`, the band's only testimonial, on tint
 *   6  facts    the aggregate rating on its own, rating-led — no logos, quote or record in it
 *   7  close    CtaSection `open`: the page's main action again, its ghost partner
 *
 * Shapes alternate: stacked (A), split (B), centred (J), split (USP), stacked (G), split (facts),
 * centred (close) — never two splits back to back, never two text-heavy bands adjacent.
 *
 * Copy is the studio's own where it exists: the hero, week and statement lines are the approved
 * kit about copy; the engagement model is the how-we-work specimen's (tcules.com/about and the
 * owner's model, review-7-oct r7-howwework). The film is the kit's stand-in clip and its speaker
 * fictional (§ 5.8); the rating is real, read through the seam.
 */

/* The Holi frame: faces cluster in the middle band, so the 4:1 panorama holds 0.3–0.6 vertically. */
const HOLI = { ...getKitPhoto('studio-team-holi'), focus: { x: 0.5, y: 0.42 } };

/* The board at 4:5 — the one studio photograph that resolves there (§ 5.4). */
const STUDIO_BOARD = { ...getKitPhoto('studio-sticky-board-ux'), focus: { x: 0.62, y: 0.2 } };

type Tile = { icon: IconName; title: string; body: string };
const WEEK: readonly Tile[] = [
  {
    icon: 'flag',
    title: 'Monday framing',
    body: 'The week’s open decisions, named and owned before anyone draws.',
  },
  {
    icon: 'eye',
    title: 'Midweek crit',
    body: 'Work on the wall, engineers in the room, nothing precious.',
  },
  {
    icon: 'code-square',
    title: 'Pairing at one screen',
    body: 'A designer and an engineer settle each state together, in code.',
  },
  {
    icon: 'notebook',
    title: 'One wall, every decision',
    body: 'Research and screens share one board, so anyone can see why a screen exists.',
  },
];

const POINTS: readonly [EngagementPoint, EngagementPoint, EngagementPoint] = [
  {
    title: 'One team, first question to ship',
    body: 'The people who ask the first question are the people who ship the build, so nothing is lost in a handoff.',
  },
  {
    title: 'Part-time, and the idle time is ours',
    body: 'People are assigned to your product part-time. When the work goes quiet, the cost of that idle time is absorbed by Tcules.',
  },
  {
    title: 'A team that stretches',
    body: 'When the work peaks, the team stretches to meet it, so your product never waits on our capacity.',
  },
];

/* Stand-in film (public/kit/video/): the poster is the frame the clip was recorded from. */
const FILM: VideoTestimonialFilm = {
  sources: [{ src: '/kit/video/interview-chalkboard.webm', type: 'video/webm' }],
  captions: [{ src: '/kit/video/interview-chalkboard.en.vtt', srclang: 'en', label: 'English' }],
  duration: '4:52',
};

const CLOSE_POINTS = [
  {
    label: 'Start with the work',
    detail: 'Case studies that show the decisions, not only the screens.',
  },
  {
    label: 'Talk to a principal',
    detail: 'Thirty minutes with the person who would lead your project.',
  },
  { label: 'Leave with a plan', detail: 'A first phase, scoped and priced, within a week.' },
] as const satisfies readonly CtaPoint[];

const TITLE = 'Small on purpose';

export default async function KitAboutPage() {
  const { footer } = await getNavigation();
  const rating = footer.brand.rating;

  return (
    <>
      {/* 1 · A — who we are. */}
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
        body={['Researchers, designers and engineers in one room, from decision to code.']}
        actions={[
          { label: 'Work with us', href: ROUTES.contact },
          { label: 'See how we work', href: ROUTES.howWeWork },
        ]}
        arrangement="display"
        media={{ type: 'image', image: HOLI, shape: 'panorama' }}
      />

      {/* 2 · B — how a week runs: hairline tiles nobody clicks, beside the studio board. */}
      <ContentSection
        data-band="B"
        arrangement="media"
        media={{ image: STUDIO_BOARD, side: 'start', head: 'title' }}
        eyebrow="Inside the studio"
        heading="How a week runs here"
        headingId="about-week"
        lead="Eighteen people in one room, reviewing work every day rather than saving it for a milestone."
      >
        <Layout as="ul" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
          {WEEK.map((tile) => (
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

      {/* 3 · J — why the studio exists, centred, a mark in the graphic slot. */}
      <Statement
        id="about-why"
        eyebrow="Why we started"
        align="center"
        graphic={<Icon name="layers" />}
      >
        Good products kept dying in the handover, so we removed the handover.
      </Statement>

      {/* 4 · USP — the engagement model, compact: how the handover was removed. */}
      <EngagementModel
        arrangement="compact"
        eyebrow="How we work"
        heading="One accountable team, from the first question to the shipped build."
        headingId="about-model"
        lead="Less translation loss. Fewer handoffs. More ownership in the messy middle."
        points={POINTS}
        axis={['First question', 'Shipped build']}
        action={{ label: 'How we work', href: ROUTES.howWeWork }}
      />

      {/* 5 · G-video — one film, the band's only testimonial, on the page's one tint ground. */}
      <Section surface="tint" data-band="G-video-wide">
        <VideoTestimonial
          variant="wide"
          poster={getKitPhoto('conversation-chalkboard')}
          film={FILM}
          quote="Three weeks in, the booking flow had gone from eleven steps to four — and the planners were the ones asking for the next release."
          name="Asha Raman"
          role="Head of Product"
          company="Northwind Travel"
        />
      </Section>

      {/* 6 · facts — the aggregate rating on its own. */}
      {rating ? (
        <ContentSection
          data-band="facts"
          arrangement="beside"
          eyebrow="Client rating"
          heading="Rated by the teams we ship with"
          headingId="about-rating"
          headingSize="md"
          lead="Every score is a verified review from a client team, read where it was written."
        >
          <Stat
            size="xl"
            value={rating.score}
            unit="out of 5"
            source={
              <RatingBadge
                score={rating.score}
                platform={rating.platform}
                href={rating.href}
                icon={<Icon name="star" size="sm" />}
                mark={<BrandMark name="clutch" />}
                showScore={false}
                scale="5"
              />
            }
          />
        </ContentSection>
      ) : null}

      {/* 7 · close — the page's main action, once more, and its ghost partner. */}
      <CtaSection
        data-band="close"
        arrangement="open"
        eyebrow="Work with the studio"
        heading="Bring us the decision you are stuck on"
        body={[
          'A principal reads every enquiry, and your first call is with the person who would lead the work.',
        ]}
        points={CLOSE_POINTS}
        actions={[
          { label: 'Work with us', href: ROUTES.contact },
          { label: 'See case studies', href: ROUTES.caseStudies },
        ]}
      />
    </>
  );
}
