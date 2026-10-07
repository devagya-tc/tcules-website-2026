import type { Metadata } from 'next';

import {
  BrandMark,
  ClientMark,
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
  type CtaContact,
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
 *    1  A   the announcement strip, then the photograph hero (5:4). No foot field (fix round 2): at
 *           the grid's fixed strength it read as a faded placeholder stripe under the actions, so
 *           the photograph carries the hero alone
 *    2  H   the real client marks (a 6 / 3 / 2 grid, never 5 + 1) and the real Clutch rating, centred
 *    3  C   three services as image cards under a stacked head and its section action
 *    4  J   one sentence at display scale, the head-half field in its empty top-end corner
 *    5  B   the wireframe wall at the photograph's weight (6:5 in the 7), END, two tiles beside it,
 *           the head at the title role so it holds two lines in the 477
 *    6  G   the proof band on tint: a slider of fictional clients, the portrait at the start
 *    7  S   the studio in four numerals, centred, at the large stat role — a display-scale moment
 *           between two splits, with no mark in it (§ 5.8)
 *    8  F   the method, read down, its photograph at the END, cut to the steps' height
 *    9  I   THE IMAGE MOMENT: one 3:1 photograph across the column under its stacked head
 *   10  D   the questions, centred
 *   11  C   two pieces of writing beside a head that carries the way to all of them
 *   12  L   the close: the copy and three ways to reach the studio over the closing equaliser,
 *           the form beside — no numbered list, because the method (8) is the page's one
 *
 * Shapes (fix round 1): the splits (hero, B, G, F, C-pair, L) never run three together — S, I and D
 * break the run with a centred numeral row, a full-column photograph and a centred accordion, and
 * the 12 bands hold four splits where the first build had six. Media sides alternate (B end,
 * G start, F end). Texture signature (§ 6.4): head-half on J and closing on L — two placements,
 * never adjacent; the hero's foot field is dropped (fix round 2, recorded in brand-amendments.md).
 * The 3:1 image moment and the split J are this page's own: about's banner is `beside` and its J
 * centred, and the services index carries a photo pair and no J. Photographs are one warm family (warm + neutral) with one vivid frame, a portrait in the
 * slider (§ 5.5); none appears twice, or on the other two showcase pages. Every photograph is
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
   Real marks beside the real rating only (§ 5.8). The logo kit's GRID form, not its strip: six
   equal cells on one line from 1440, two rows of three below it, three rows of two on a phone. A
   wrapping strip set 5 + 1 at 1024, with one mark alone on its row (fix round 1). */
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
    media: cover('team-laptops-table'),
    href: ROUTES.productModernisation,
  },
];

/* ── 5 · B, the photograph's weight ───────────────────────────────────────────────────────
   The photograph takes the 7 (6:5, 667 × 556) and the copy the 477: a display head, its lead, two
   tiles and a CtaRow fill it (ContentSection `weight`). Tiles ≤ 4 / ≤ 20 words. */
type Tile = { icon: IconName; title: string; body: string };
const HOW: readonly Tile[] = [
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

/* ── 6 · G slider ──────────────────────────────────────────────────────────────────────────
   Fictional people at fictional companies, stock portraits in the warm family (§ 5.8, § 8.3).
   Featured quotes ≤ 40 words. Never beside a real mark or the real score. No person, and no face,
   appears on two showcase pages. */
const SLIDES: readonly ProofQuote[] = [
  {
    name: 'Hannah Reiss',
    role: 'Head of Product',
    company: 'Fernbrook Health',
    /* A warm, confident face beside a quote that praises the work (fix round 1: the grey portrait
       read sombre, near tearful, in the wrong register for it). */
    portrait: portrait('portrait-woman-sunset-smile'),
    quoteHtml:
      '<p>Every screen they cut was one our clinicians never had to learn, and every screen that stayed was argued for with evidence from our wards.</p>',
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

/* ── 8 · F ─────────────────────────────────────────────────────────────────────────────────
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

/* ── 7 · S ─────────────────────────────────────────────────────────────────────────────────
   Illustrative numerals (§ 8.4), labels ≤ 12 words. No mark shares this band. One set of studio
   figures across the showcase pages, so the about page's 64 and 18 are these. Centred four-up at
   the large stat role (fix round 1): the band that breaks the page's run of splits. */
const STATS = [
  {
    value: '64',
    unit: 'products',
    label: 'Designed and shipped with teams in fintech, health and logistics.',
  },
  {
    value: '6–8',
    unit: 'weeks',
    label: 'From the first question to a prototype real users can test.',
  },
  { value: '9/10', label: 'Engagements extended past their first agreed phase.' },
  {
    value: '18',
    unit: 'people',
    label: 'Designers, researchers and design engineers, in one studio.',
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
   the page's family (§ 5.7) — never labelled. People at work, not a hand on a mousepad (fix round 1). */
const THINKING: readonly BlockCardSetItem[] = [
  {
    id: 'home-read-crit',
    eyebrow: 'Article',
    title: 'Why we run design crits in the open',
    body: 'Reviewing work daily, with engineers in the room, costs an hour and saves the week that follows.',
    media: cover('colleagues-tablet-chat', true),
    href: ROUTES.articles,
  },
  {
    id: 'home-read-model',
    eyebrow: 'Guide',
    title: 'Model the product first',
    body: 'A field guide to settling records, rules and owners before anyone opens a design file.',
    media: cover('stylus-tablet-sketch', true),
    href: ROUTES.guides,
  },
];

/* ── 12 · L ────────────────────────────────────────────────────────────────────────────────
   The contact strip in place of numbered points (fix round 1): the method (8) is the page's one
   numbered list, and a second, four bands later, made numbering the page's default idiom. */
const CONTACT: readonly CtaContact[] = [
  { label: 'Write', value: 'hello@tcules.com', href: 'mailto:hello@tcules.com' },
  { label: 'Reply', value: 'Within one working day' },
  { label: 'Studio', value: 'Ahmedabad, India' },
];

const FORM_CONTEXT = {
  originRoute: ROUTES.designKitHome,
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
          <Layout
            as="ul"
            columns={{ base: 2, md: 3, xl: 6 }}
            colGap="stack"
            rowGap="stack"
            align="center"
            justifyItems="center"
          >
            {MARKS.map((mark) => (
              <li key={mark.name}>
                <ClientMark {...mark} />
              </li>
            ))}
          </Layout>
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

      {/* 3 · C-image-3 — a stacked head with the section action, three linked services. */}
      <ContentSection
        data-band="C-image"
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

      {/* 4 · J — one sentence at display scale; the head-half field in the empty top-end corner. */}
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

      {/* 5 · B — the wireframe wall at the photograph's weight, at the END; two tiles in the 477,
          stacked from 1024 to 1439, where the 477 is ~360 and two up squeezed each to 164. */}
      <ContentSection
        data-band="B"
        arrangement="media"
        media={{ image: photo('wireframe-wall'), side: 'end', weight: 'photo', head: 'title' }}
        eyebrow="How we work"
        heading="Every screen points to a reason"
        headingId="home-how"
        lead="Research, rules and interface design share one wall, so nothing is decided twice."
      >
        <Layout as="ul" columns={{ base: 1, md: 2, lg: 1, xl: 2 }} colGap="gutter" rowGap="stack">
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

      {/* 6 · G — the page's one tint band: fictional clients, one per view, the portrait first. */}
      <Section surface="tint" data-band="G-slider">
        <Slider label="Client stories" perView={1}>
          {SLIDES.map((quote) => (
            <li key={quote.name}>
              <Proof arrangement="featured" quote={quote} />
            </li>
          ))}
        </Slider>
      </Section>

      {/* 7 · S — the studio in four numerals, centred, at the large stat role. */}
      <ContentSection
        data-band="S"
        align="center"
        eyebrow="In numbers"
        heading="Eight years of shipped work"
        headingId="home-numbers"
        lead="Counted the same way every quarter, from the first call to the release after ours."
      >
        <Layout as="ul" columns={{ md: 2, lg: 4 }} colGap="gutter" rowGap="stack">
          {STATS.map((stat) => (
            <Stat key={stat.label} as="li" size="lg" align="center" {...stat} />
          ))}
        </Layout>
      </ContentSection>

      {/* 8 · F — the method, read down; the head and its photograph close the row at the END. */}
      <ContentSection
        data-band="F"
        arrangement="beside"
        headSide="end"
        eyebrow="An engagement"
        heading="From first call to shipped build"
        headingId="home-method"
        lead="Each stage ends in something your team can read, question and push back on before the next begins."
        asideFill
        aside={<Media image={photo('workshop-brick-room')} fit="fill" sizes={HEAD_TRACK} />}
      >
        <Steps steps={STEPS} />
      </ContentSection>

      {/* 9 · I — the image moment: one 3:1 photograph across the column under its stacked head. */}
      <Banner
        eyebrow="The studio"
        heading="Small rooms, careful calls"
        headingId="home-studio"
        lead="We keep teams small and calendars sparse, so the hard product calls get the attention they need."
        actions={
          <CtaRow rule={false} actions={[{ label: 'Meet the studio', href: ROUTES.about }]} />
        }
        image={photo('team-sticky-wall-bright')}
      />

      {/* 10 · D-faq — centred, between the image band and the writing. */}
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
        contact={CONTACT}
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
