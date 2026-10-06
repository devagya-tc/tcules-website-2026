import type { Metadata } from 'next';

import {
  BrandMark,
  ClientMark,
  Cluster,
  Icon,
  Layout,
  Media,
  RatingBadge,
  Section,
  Stat,
  TextureClosing,
  type IconName,
} from '@/components';
import { getNavigation } from '@/content';
import {
  Accordion,
  Banner,
  BlockCardSet,
  ContentSection,
  ContentSectionText,
  CtaRow,
  CtaSection,
  EnquiryForm,
  ListCard,
  PageHero,
  Proof,
  Slider,
  Statement,
  Steps,
  type AccordionItem,
  type BlockCardSetItem,
  type CtaPoint,
  type ProofQuote,
  type Step,
} from '@/patterns';
import { HEAD_TRACK } from '@/lib/image-sizes';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { ENDPOINTS, ROUTES } from '@/lib/routes';

import {
  DOODLE,
  KNOVOS,
  LATITUDEPAY,
  OMNY,
  PLEDGE,
  QUOTER,
  type ClientRecord,
} from '../../_specimen/clients';

export const metadata: Metadata = {
  title: 'Home · kit showcase | Design',
  robots: { index: false, follow: false },
};

/**
 * /design/kit/home — the home page composed from the finished Tcules UI kit (visual-direction § 8.3).
 *
 * The page judged against the references, so it opens on a photograph. Twelve bands, every one a
 * kit band fed showcase copy written inline (§ 8.4 — never the content fixtures a live route reads):
 *
 *    1  A   the announcement strip on tint, then the photograph hero (5:4) with its foot field
 *    2  H   the real client marks and the real Clutch rating, centred
 *    3  C   three services as image cards under the H-row and its section action
 *    4  J   one sentence at display scale, the head-half field in its empty corner
 *    5  B   the studio's own board at 4:5, four tiles beside it
 *    6  G   the proof band on tint: a slider of fictional clients with stock portraits
 *    7  F   the method, read down, beside its photograph
 *    8  S   four illustrative numerals, centred — no client mark in this band (§ 5.8)
 *    9  I   one 3:1 photograph under its H-row
 *   10  D   the questions, centred, before the last image band
 *   11  C   two pieces of writing beside a head that carries the way to all of them
 *   12  L   the close, the form beside the copy, the closing equaliser under it
 *
 * Texture signature (§ 6.4): the hero's foot field, head-half on the statement, closing on the
 * close — three placements, never adjacent. Photographs are one warm family (warm + neutral) with
 * one vivid frame, a portrait in the slider (§ 5.5); none appears twice. Every photograph is
 * atmosphere, so `alt=""` (photos.ts).
 */

const photo = (id: PhotoId) => getKitPhoto(id);
const cover = (id: PhotoId, standIn = false): BlockCardSetItem['media'] => ({
  type: 'image',
  image: getKitPhoto(id, standIn ? { standIn: true } : {}),
});
const portrait = (id: PhotoId) => {
  const { src, width, height, sources } = getKitPhoto(id);
  return { src, width, height, sources };
};

/* ── 2 · H ─────────────────────────────────────────────────────────────────────────────────
   Real marks beside the real rating only (§ 5.8). Six fit one centred line at 1240. */
const MARKS: readonly ClientRecord[] = [OMNY, LATITUDEPAY, QUOTER, KNOVOS, DOODLE, PLEDGE];

/* ── 3 · C-image-3 ─────────────────────────────────────────────────────────────────────────
   Titles ≤ 8 words, bodies ≤ 14 (§ 1.5 Card-3). Whole-card links, the blue arrow on each title. */
const SERVICES: readonly BlockCardSetItem[] = [
  {
    id: 'home-svc-product',
    title: 'Product design',
    body: 'The records, rules and behaviour first; the screens follow from them.',
    media: cover('hand-sketch-wireframe'),
    href: ROUTES.productDesign,
  },
  {
    id: 'home-svc-engineering',
    title: 'Design engineering',
    body: 'Designers who build in your codebase, reviewed like any other commit.',
    media: cover('designer-monitor-ui'),
    href: ROUTES.designEngineering,
  },
  {
    id: 'home-svc-modernisation',
    title: 'Product modernisation',
    body: 'An ageing product rebuilt around the work it supports, with no freeze.',
    media: cover('board-review-backs'),
    href: ROUTES.productModernisation,
  },
];

/* ── 5 · B ─────────────────────────────────────────────────────────────────────────────────
   Four tiles fill the 667 copy column, so the head keeps the h2 role (tiles ≤ 4 / ≤ 20 words). */
type Tile = { icon: IconName; title: string; body: string };
const HOW: readonly Tile[] = [
  {
    icon: 'users-group-rounded',
    title: 'The people who ship',
    body: 'The designers and engineers in the first workshop are the ones who release the work.',
  },
  {
    icon: 'chat-round-dots',
    title: 'Weekly working sessions',
    body: 'Ninety minutes at the board with your team, deciding rather than presenting.',
  },
  {
    icon: 'notebook',
    title: 'A written trail',
    body: 'Each decision logged with its reason, so a new hire can follow it a year later.',
  },
  {
    icon: 'eye',
    title: 'Tested before polished',
    body: 'Rough prototypes meet real users before anyone spends a week on pixels.',
  },
];
/* The board is the subject: anchored high so the column headings stay in the 4:3 phone crop. */
const STUDIO_BOARD = { ...photo('studio-sticky-board-ux'), focus: { x: 0.62, y: 0.2 } };

/* ── 6 · G slider ──────────────────────────────────────────────────────────────────────────
   Fictional people at fictional companies, stock portraits in the warm family (§ 5.8, § 8.3).
   Featured quotes ≤ 40 words. Never beside a real mark or the real score. */
const SLIDES: readonly ProofQuote[] = [
  {
    name: 'Daniel Okafor',
    role: 'Chief Product Officer',
    company: 'Brightwater Labs',
    portrait: portrait('portrait-man-blue-office'),
    quoteHtml:
      '<p>They asked better questions about our product in the first week than we had asked in a year. The redesign was the visible part; the decisions under it are what we still use.</p>',
  },
  {
    name: 'Hannah Reiss',
    role: 'Head of Product',
    company: 'Fernbrook Health',
    portrait: portrait('portrait-woman-grey'),
    quoteHtml:
      '<p>Every screen they cut was one our clinicians never had to learn, and every screen that stayed had been argued for with evidence from the ward.</p>',
  },
  {
    name: 'Arjun Mehta',
    role: 'Director of Product',
    company: 'Corvel Logistics',
    portrait: portrait('portrait-man-green'),
    quoteHtml:
      '<p>Design and engineering finally worked from one record. Our releases stopped waiting on files, and nobody opened a pull request to find a surprise.</p>',
  },
];

/* ── 7 · F ─────────────────────────────────────────────────────────────────────────────────
   Four steps, titles ≤ 4 words, bodies ≤ 18 (two lines). */
const STEPS: readonly Step[] = [
  {
    title: 'Frame the decision',
    body: 'What the product must decide, who owns the call, and what evidence would settle it.',
  },
  {
    title: 'Probe the risk',
    body: 'A coded prototype puts the riskiest assumption in front of real users first.',
  },
  {
    title: 'Design and build',
    body: 'One record of states, rules and data that design and engineering both build from.',
  },
  {
    title: 'Ship and measure',
    body: 'Released against a measure agreed up front, then read again once use settles.',
  },
];

/* ── 8 · S ─────────────────────────────────────────────────────────────────────────────────
   Illustrative numerals (§ 8.4), labels ≤ 12 words. No mark shares this band. */
const STATS = [
  {
    value: '64',
    unit: 'products',
    label: 'Designed and shipped with teams in fintech, health and logistics.',
  },
  {
    value: '6–8',
    unit: 'weeks',
    label: 'From the first question to a prototype users can test.',
  },
  { value: '9/10', label: 'Engagements extended past their first agreed phase.' },
  {
    value: '1',
    unit: 'record',
    label: 'Every decision and state, kept where both teams read it.',
  },
] as const;

/* ── 10 · D-faq ────────────────────────────────────────────────────────────────────────────
   Five questions at most (cmp-readdown), each ≤ 12 words, answers ≤ 80. */
const FAQ: readonly AccordionItem[] = [
  {
    question: 'How does a project with Tcules start?',
    answerHtml:
      '<p>With a thirty-minute call about the decision you are stuck on, then a one-page proposal: what we would look at, who we need from your side, and what you would hold after the first four weeks.</p>',
  },
  {
    question: 'How large is the team you put on a project?',
    answerHtml:
      '<p>Small on purpose: a lead designer and a design engineer, with a researcher for the weeks that need one. Fewer people in the room means nobody learns your product second-hand.</p>',
  },
  {
    question: 'Do you work inside our tools and repositories?',
    answerHtml:
      '<p>Yes. We design in your files, build in your stack and keep the decision record where your team already looks, so nothing needs migrating when we leave.</p>',
  },
  {
    question: 'What does the first month cost?',
    answerHtml:
      '<p>A fixed fee for a fixed scope, agreed before we start. You decide on the next phase from what the first month shows, not from a forecast.</p>',
  },
  {
    question: 'Who owns the work when we finish?',
    answerHtml:
      '<p>You do, from the first day: the files, the code, the research and the record of every decision.</p>',
  },
];

/* ── 11 · C-pair ───────────────────────────────────────────────────────────────────────────
   Pair cards: titles ≤ 8, bodies ≤ 20. The writing has no covers yet, so each takes a stand-in from
   the page's family, the studio's own crit first (§ 5.7) — never labelled. */
const THINKING: readonly BlockCardSetItem[] = [
  {
    id: 'home-read-crit',
    eyebrow: 'Article',
    title: 'Why we run design crits in the open',
    body: 'Reviewing work daily, with engineers in the room, costs an hour and saves the week that follows.',
    media: cover('studio-whiteboard-crit', true),
    href: ROUTES.articles,
  },
  {
    id: 'home-read-model',
    eyebrow: 'Guide',
    title: 'Model the product before the screens',
    body: 'A field guide to settling records, rules and owners before anyone opens a design file.',
    media: cover('pencil-wireframe-red', true),
    href: ROUTES.guides,
  },
];

/* ── 12 · L ────────────────────────────────────────────────────────────────────────────────
   Point labels ≤ 4 words, details ≤ 18 (two lines). */
const NEXT: readonly CtaPoint[] = [
  {
    label: 'A thirty-minute call',
    detail: 'We ask what you have tried, what it cost, and what has to be true next.',
  },
  {
    label: 'A written proposal',
    detail: 'Scope, team and timeline on one page, within a week of the call.',
  },
  {
    label: 'A fixed first phase',
    detail: 'A defined piece of work with a price, so you can judge us on output.',
  },
];

const FORM_CONTEXT = {
  originRoute: '/design/kit/home',
  placement: 'kit-home-close',
  family: 'home',
  serviceOrAudit: 'kit-home',
  referrer: '',
  campaign: '',
} as const;

export default async function KitHomePage() {
  const { footer } = await getNavigation();
  const rating = footer.brand.rating;

  return (
    <>
      {/* 1 · A — the strip, then the photograph hero. */}
      <Banner
        form="strip"
        label="New"
        message="Our field guide to modernising a live product, without stopping it, is out."
        link={{ label: 'Read the guide', href: ROUTES.guides }}
      />
      <PageHero
        data-band="A"
        data-fold-hero=""
        eyebrow="Product design studio"
        title="From first decision to shipped code"
        body={[
          'A senior team that settles what your product should do, designs how it behaves, and builds it in your codebase.',
        ]}
        actions={[
          { label: 'Start a project', href: ROUTES.contact },
          { label: 'See the work', href: ROUTES.caseStudies },
        ]}
        arrangement="beside"
        media={{ type: 'image', ratio: '5/4', image: photo('pair-at-laptop-sticky-wall') }}
        texture
      />

      {/* 2 · H — the real marks and the real rating. */}
      <ContentSection
        data-band="H"
        align="center"
        eyebrow="Clients"
        heading="Teams we have shipped with"
        headingId="home-clients"
      >
        <Layout rowGap="stack" justifyItems="center">
          <Cluster as="ul" colGap="stack" rowGap="stack" align="center" justify="center">
            {MARKS.map((mark) => (
              <li key={mark.name}>
                <ClientMark {...mark} />
              </li>
            ))}
          </Cluster>
          {rating ? (
            <RatingBadge
              score={rating.score}
              platform={rating.platform}
              href={rating.href}
              icon={<Icon name="star" size="sm" />}
              mark={<BrandMark name="clutch" />}
            />
          ) : null}
        </Layout>
      </ContentSection>

      {/* 3 · C-image-3 — the H-row with the section action, three linked services. */}
      <ContentSection
        data-band="C-image"
        arrangement="split-head"
        eyebrow="What we do"
        heading="Three ways in, one team"
        headingId="home-services"
        lead="Most clients start with one service, then keep the same people for the release after it."
        actions={
          <CtaRow
            rule={false}
            actions={[{ label: 'All six services', href: ROUTES.services }]}
          />
        }
      >
        <BlockCardSet items={SERVICES} lead="none" />
      </ContentSection>

      {/* 4 · J — one sentence at display scale; the head-half field in the empty corner. */}
      <Statement
        id="home-belief"
        eyebrow="What we believe"
        size="display"
        texture="head-half"
        actions={
          <CtaRow rule={false} actions={[{ label: 'How we work', href: ROUTES.howWeWork }]} />
        }
      >
        A good interface is a product decision someone finally made.
      </Statement>

      {/* 5 · B — the studio's own board, four tiles beside it. */}
      <ContentSection
        data-band="B"
        arrangement="media"
        media={{ image: STUDIO_BOARD, side: 'start', head: 'title' }}
        eyebrow="How we work"
        heading="Every screen points to a reason"
        headingId="home-how"
        lead="Research, product rules and interface design share one wall, so nothing is decided twice."
      >
        <Layout as="ul" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
          {HOW.map((tile) => (
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

      {/* 6 · G — the page's one tint band: fictional clients, one per view. */}
      <Section surface="tint" data-band="G-slider">
        <Slider label="Client stories" perView={1}>
          {SLIDES.map((quote) => (
            <li key={quote.name}>
              <Proof arrangement="featured" quote={quote} />
            </li>
          ))}
        </Slider>
      </Section>

      {/* 7 · F — the method beside its photograph. */}
      <ContentSection
        data-band="F"
        arrangement="beside"
        eyebrow="An engagement"
        heading="From first call to shipped build"
        headingId="home-method"
        lead="Each stage ends in something your team can read, question and push back on before the next begins."
        asideFill
        aside={<Media image={photo('workshop-brick-room')} fit="fill" sizes={HEAD_TRACK} />}
      >
        <Steps steps={STEPS} />
      </ContentSection>

      {/* 8 · S — illustrative numerals, centred. */}
      <ContentSection
        data-band="S"
        align="center"
        headingSize="md"
        eyebrow="In numbers"
        heading="Eight years of shipped work"
        headingId="home-numbers"
        lead="Counted the same way every quarter, from the first call to the release after ours."
      >
        <Layout as="ul" columns={{ md: 2, lg: 4 }} colGap="gutter" rowGap="gutter">
          {STATS.map((stat) => (
            <Stat key={stat.label} as="li" align="center" {...stat} />
          ))}
        </Layout>
      </ContentSection>

      {/* 9 · I — one 3:1 photograph under its H-row. */}
      <Banner
        eyebrow="The studio"
        heading="Small rooms, careful decisions"
        headingId="home-studio"
        lead="We keep teams small and calendars sparse, so the hard product calls get the attention they need."
        actions={
          <CtaRow rule={false} actions={[{ label: 'Meet the studio', href: ROUTES.about }]} />
        }
        image={photo('office-calm-interior')}
      />

      {/* 10 · D-faq — centred, then an image band, then the close (§ 3.3). */}
      <ContentSection
        data-band="D-faq"
        align="center"
        eyebrow="Before you call"
        heading="Questions we are asked first"
        headingId="home-faq"
      >
        <ContentSectionText>
          <Accordion items={FAQ} />
        </ContentSectionText>
      </ContentSection>

      {/* 11 · C-pair — two pieces of writing beside the way to all of them. */}
      <ContentSection
        data-band="C-pair"
        arrangement="beside"
        eyebrow="Latest thinking"
        heading="Notes from recent projects"
        headingId="home-thinking"
        lead="What we learned on recent work, written up while it was still fresh enough to use on yours."
        actions={
          <CtaRow rule={false} actions={[{ label: 'All insights', href: ROUTES.insights }]} />
        }
      >
        <BlockCardSet items={THINKING} lead="none" stagger />
      </ContentSection>

      {/* 12 · L — the close. */}
      <CtaSection
        data-band="L"
        eyebrow="Start a project"
        heading="Tell us what you are building"
        body={[
          'We reply within one working day with a named designer and a time to talk, not an automated acknowledgement.',
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
