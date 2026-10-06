import type { ReactNode } from 'react';

import { Layout, Media, Section, type IconName } from '@/components';
import {
  BlockCard,
  BlockCardSet,
  ContentSection,
  CtaRow,
  ListCard,
  PageHero,
  Slider,
  type BlockCardMedia,
  type BlockCardSetItem,
} from '@/patterns';
import { HEAD_TRACK } from '@/lib/image-sizes';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { ROUTES } from '@/lib/routes';

import { specimenStyles as s } from '../../_specimen/Specimen';
import t from '../../_specimen/typeroles.module.css';

/**
 * /design/kit/service-list — the service router family of the Tcules UI kit (cmp-services).
 *
 * "Which one is mine?" answered three ways (visual-direction § 3.3, § 3.4): an ICON router (C-icon,
 * a beside head with a photograph in its head track and whole-card links), an IMAGE router
 * (C-image-3 / -4 linked, or a Slider from five), and a LIST router (a beside head with its
 * actions over ruled ListCard rows, each with a 160 thumbnail and the arrow cue). A composition:
 * no unit is added. ServicePage's `Router` block is swapped for one of these by cmp-service-pages;
 * this route proves the shapes, and the template is not touched here.
 *
 * Every destination is a ROUTES name (src/lib/routes.ts), never a literal. Card copy is written as
 * a CONDITION — what sends a reader to that page — because a router is read for "is this me?",
 * and the service name is the link's name, because a link is named by its destination.
 *
 * The page is a cool-family page (§ 5.5 rule 1): every photograph is cool or neutral and quiet,
 * none appears twice, and the four audit cards are the studio's own photographs at the one
 * placement their 622px masters allow (4 across, § 5.4). Blue is the foreground accent only:
 * glyphs, title arrows, the thumbnail rows' cues, every link, the index numerals and the one
 * solid ask in the list router's head. Texture: the hero's `hero-plinth` and nothing else — every
 * other band here is cards or ruled rows, and texture never sits behind either (§ 6.2).
 *
 * Band order alternates the head (beside · centred · beside · H-row · beside · centred) so no two
 * neighbours are the same rectangle, which is the squint test (§ 8.5) applied to the specimen.
 */

const photo = (id: PhotoId): BlockCardMedia => ({ type: 'image', image: getKitPhoto(id) });

/** The C-icon head photograph, sized to end on the grid's last line (ContentSection asideFill). */
function Aside({ id }: { id: PhotoId }) {
  return <Media image={getKitPhoto(id)} fit="fill" sizes={HEAD_TRACK} />;
}

const icon = (
  id: string,
  name: IconName,
  title: string,
  body: string,
  href: string,
): BlockCardSetItem => ({ id, icon: name, title, body, href });

/* ── 01 · Icon router, six ─────────────────────────────────────────────────────────────────────
   Icon card ceilings (§ 1.5): title ≤ 5 words on one line, body ≤ 14 on two. */
const SIX: readonly BlockCardSetItem[] = [
  icon(
    'six-product',
    'ruler-pen',
    'Product design',
    'For a product that works on paper but fights the people who use it daily.',
    ROUTES.productDesign,
  ),
  icon(
    'six-systems',
    'widget',
    'Design systems',
    'For teams rebuilding the same button in every product, a little differently.',
    ROUTES.designSystems,
  ),
  icon(
    'six-ai',
    'stars',
    'AI product UX',
    'For AI features that impress in the demo, then lose people’s trust in use.',
    ROUTES.aiProductUx,
  ),
  icon(
    'six-engineering',
    'code-square',
    'Design engineering',
    'For designs that change shape somewhere between the file and the build.',
    ROUTES.designEngineering,
  ),
  icon(
    'six-software',
    'server',
    'Software development',
    'For the build behind the design, held to the same standard the design set.',
    ROUTES.softwareDevelopment,
  ),
  icon(
    'six-modern',
    'refresh-square',
    'Product modernisation',
    'For a product old enough that every change feels like a risk to someone.',
    ROUTES.productModernisation,
  ),
];

/* ── 02 · Image router, three ──────────────────────────────────────────────────────────────────
   Card-3 ceilings: title ≤ 8, body ≤ 14. */
const THREE: readonly BlockCardSetItem[] = [
  {
    id: 'in-product',
    title: 'Product design',
    body: 'When the work is clear, but the product makes it hard to do.',
    media: photo('hand-sketch-wireframe'),
    href: ROUTES.productDesign,
  },
  {
    id: 'in-engineering',
    title: 'Design engineering',
    body: 'When what ships is never quite what the team agreed to build.',
    media: photo('designer-monitor-ui'),
    href: ROUTES.designEngineering,
  },
  {
    id: 'in-ai',
    title: 'AI product UX',
    body: 'When an AI feature works, and people still do not trust it.',
    media: photo('pair-testing-overhead'),
    href: ROUTES.aiProductUx,
  },
];

/* ── 03 · List router ──────────────────────────────────────────────────────────────────────────
   One-column D row ceilings: title ≤ 5, body ≤ 28 on two lines. The thumbnail is the row's
   marker, 160 × 107 at 3:2 with the 8 radius and no frame (§ 5.3). */
const ROWS: readonly { title: string; body: string; image: PhotoId; href: string }[] = [
  {
    title: 'Design systems',
    body: 'When the screens are fine but every team builds them differently, and the product drifts a little with each release.',
    image: 'pencil-wireframe-violet',
    href: ROUTES.designSystems,
  },
  {
    title: 'Product modernisation',
    body: 'When the product is old enough that every change is a risk, and the people who knew why have moved on.',
    image: 'office-calm-interior',
    href: ROUTES.productModernisation,
  },
  {
    title: 'Software development',
    body: 'When the design is settled and you need the build behind it held to the same standard.',
    image: 'team-laptops-table',
    href: ROUTES.softwareDevelopment,
  },
];

/* ── 04 · Image router, four, per-card CTA ─────────────────────────────────────────────────────
   Card-4 ceilings: title ≤ 8, body ≤ 12. The studio's own photographs, at 286 × 161 (2.17×). */
const FOUR: readonly BlockCardSetItem[] = [
  {
    id: 'au-ux',
    title: 'UX and product audit',
    body: 'Where the product loses people, ranked by what it costs.',
    media: photo('studio-whiteboard-crit'),
    href: ROUTES.uxProductAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'au-system',
    title: 'Design-system audit',
    body: 'Which components drift, and what each drift costs a release.',
    media: photo('studio-pair-at-monitor'),
    href: ROUTES.designSystemAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'au-code',
    title: 'Design-to-code audit',
    body: 'Where the build departs from the design, and why.',
    media: photo('studio-desk-pairing'),
    href: ROUTES.designToCodeAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'au-ai',
    title: 'AI product readiness',
    body: 'What an AI feature must show before people trust it.',
    media: photo('studio-session-talk'),
    href: ROUTES.aiProductUxReadiness,
    ctaLabel: 'See the review',
  },
];

/* ── 05 · Icon router, four, CtaRow ────────────────────────────────────────────────────────────
   On a service page: what teams add after this one. */
const NEXT: readonly BlockCardSetItem[] = [
  icon(
    'nx-systems',
    'widget',
    'Design systems',
    'Once the screens ship, one shared set keeps the next ones consistent.',
    ROUTES.designSystems,
  ),
  icon(
    'nx-engineering',
    'code-square',
    'Design engineering',
    'Designers in your codebase, so the build matches what was decided.',
    ROUTES.designEngineering,
  ),
  icon(
    'nx-ai',
    'stars',
    'AI product UX',
    'When an AI feature lands in the product and has to earn trust.',
    ROUTES.aiProductUx,
  ),
  icon(
    'nx-modern',
    'refresh-square',
    'Product modernisation',
    'When an older product sits beside the new one and holds it back.',
    ROUTES.productModernisation,
  ),
];

/* ── 06 · Image router, six, Slider ────────────────────────────────────────────────────────────
   Five or more image cards never wrap to a 3 × 2 grid (826, § 1.4 rule 3): a Slider showing 3. */
const SLIDES: readonly { title: string; body: string; image: PhotoId; href: string }[] = [
  {
    title: 'Product design',
    body: 'The first map of the work, through to the screens your team ships.',
    image: 'whiteboard-pair-laptop',
    href: ROUTES.productDesign,
  },
  {
    title: 'Design systems',
    body: 'Tokens and components engineers adopt because they make the work faster.',
    image: 'desk-minimal-white',
    href: ROUTES.designSystems,
  },
  {
    title: 'AI product UX',
    body: 'AI features that show their working, so people know when to trust them.',
    image: 'hands-trackpad',
    href: ROUTES.aiProductUx,
  },
  {
    title: 'Design engineering',
    body: 'Designers who ship in your codebase, through your review process.',
    image: 'stylus-tablet-sketch',
    href: ROUTES.designEngineering,
  },
  {
    title: 'Software development',
    body: 'The build behind the design, held to the standard the design set.',
    image: 'designer-tablet-monitor',
    href: ROUTES.softwareDevelopment,
  },
  {
    title: 'Product modernisation',
    body: 'An ageing product rebuilt around the work it actually supports.',
    image: 'board-review-backs',
    href: ROUTES.productModernisation,
  },
];

/* ── The showcase chrome ─────────────────────────────────────────────────────────────────────── */

const VARIATIONS = [
  { id: 'icon-six', name: 'Icon router\u00a0· six' },
  { id: 'image-three', name: 'Image router\u00a0· three' },
  { id: 'list', name: 'List router\u00a0· three rows' },
  { id: 'image-four', name: 'Image router\u00a0· four' },
  { id: 'icon-four', name: 'Icon router\u00a0· four' },
  { id: 'slider', name: 'Image router\u00a0· Slider' },
] as const;

type VariationId = (typeof VARIATIONS)[number]['id'];

const indexOf = (id: VariationId) =>
  String(VARIATIONS.findIndex((v) => v.id === id) + 1).padStart(2, '0');

/**
 * The titled band in front of each variation: index and name in the head track, what to look for
 * in the body track. Its own tight Section, so the variation under it sits edge to edge with its
 * neighbours exactly as on a route and fold:check measures the band as a page renders it. The
 * `spec` class is the shots harness's crop handle.
 */
function Title({ id, children }: { id: VariationId; children: ReactNode }) {
  const variation = VARIATIONS.find((v) => v.id === id)!;
  return (
    <Section density="tight" id={id}>
      <Layout
        className={s.spec}
        columns={{ lg: [1, 2] }}
        colGap="section"
        rowGap="text"
        align="end"
      >
        <Layout rowGap="tight">
          <p className={s.eyebrow}>{indexOf(id)}</p>
          {/* An h2 at h3 scale, so the outline never steps h1 → h3 → h2 beside the band's h2. */}
          <h2 className={t.h3}>{variation.name}</h2>
        </Layout>
        <p className={s.specNote}>{children}</p>
      </Layout>
    </Section>
  );
}

export default function ServiceListKitSpecimen() {
  return (
    <>
      {/* ── Intro ──────────────────────────────────────────────────────────────────────────── */}
      <PageHero
        arrangement="beside"
        eyebrow="Tcules UI kit"
        title="Every service, one step away"
        body={[
          'Three ways a page routes a reader to the right service: icons beside a photograph, image cards, or ruled rows with a thumbnail.',
        ]}
        media={{ type: 'image', image: getKitPhoto('conversation-chalkboard') }}
        texture
      />

      {/* The index: every variation, linked to its band — itself a small router. */}
      <Section density="tight">
        <Layout as="ol" columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="none">
          {VARIATIONS.map((v, i) => (
            <ListCard
              key={v.id}
              title={v.name}
              href={`#${v.id}`}
              marker={{ type: 'number', value: i + 1 }}
              size="sm"
            />
          ))}
        </Layout>
      </Section>

      {/* ── 01 · C-icon-6 ──────────────────────────────────────────────────────────────────── */}
      <Title id="icon-six">
        C-icon-6: a beside head over six linked icon cards, the photograph in the head track
        ending on the grid&rsquo;s last line. Whole-card links, each title closed by the blue
        arrow; no CtaRow (§ 1.4 rule 7), and never actions in the head track, so the set never
        renders without its photo. At 390 the six are one sideways row, the next card peeking.
      </Title>
      <ContentSection
        arrangement="beside"
        data-band="C-icon"
        eyebrow="Services"
        heading="Find the service that fits"
        headingId="ksl-icon-six"
        lead="Each has its own page. Most teams start with one, then add a second once it ships."
        asideFill
        aside={<Aside id="pair-laptop-notebook" />}
      >
        <BlockCardSet items={SIX} lead="none" across={2} />
      </ContentSection>

      {/* ── 02 · C-image-3, H-compact centred ──────────────────────────────────────────────── */}
      <Title id="image-three">
        C-image-3 under a centred H-compact head at the display role: three linked cards at
        16:9, the copy written as the condition that sends a reader there. On hover the title
        joins its arrow in blue and the photograph leans in. At 390 the row scrolls.
      </Title>
      <ContentSection
        align="center"
        headingSize="display"
        data-band="C-image"
        eyebrow="Where to start"
        heading="Three ways in"
        headingId="ksl-image-three"
        lead="Pick the problem that sounds like yours. Each page says what we do first and what you get."
      >
        <BlockCardSet items={THREE} lead="none" />
      </ContentSection>

      {/* ── 03 · List router ───────────────────────────────────────────────────────────────── */}
      <Title id="list">
        The list router: a beside head carrying the band&rsquo;s actions (one solid ask, one
        blue link) over three ruled ListCard rows. Each row leads with a 160 × 107 thumbnail at
        radius 8 and ends on the blue arrow cue; the whole row is the link. Three rows at most,
        so the head track never needs an aside as well (§ 1.4 rule 6).
      </Title>
      <ContentSection
        arrangement="beside"
        data-band="D"
        eyebrow="Related services"
        heading="If product design is not the fit"
        headingId="ksl-list"
        lead="Three neighbouring services, each for a different problem. If none of them is yours either, a short call will find it."
        actions={
          <CtaRow
            rule={false}
            emphasis="solid"
            tone="primary"
            actions={[
              { label: 'Book a call', href: ROUTES.contact },
              { label: 'All services', href: ROUTES.services },
            ]}
          />
        }
      >
        <Layout as="ul" rowGap="none">
          {ROWS.map((row) => (
            <ListCard
              key={row.href}
              size="md"
              titleAs="h3"
              title={row.title}
              body={row.body}
              href={row.href}
              marker={{ type: 'thumbnail', image: getKitPhoto(row.image) }}
            />
          ))}
        </Layout>
      </ContentSection>

      {/* ── 04 · C-image-4, H-row, per-card CTA ────────────────────────────────────────────── */}
      <Title id="image-four">
        C-image-4 under the H-row: four across at 286, h5 over body-sm, lead=&quot;none&quot; so
        no audit looks recommended. Each card names its destination in a blue link pinned to the
        card&rsquo;s foot, so the four links share a line. The studio&rsquo;s own photographs.
      </Title>
      <ContentSection
        arrangement="split-head"
        data-band="C-image"
        eyebrow="Fixed-scope audits"
        heading="Start smaller, with an audit"
        headingId="ksl-image-four"
        lead="Two to three weeks and a fixed fee. You keep a ranked list of what to fix first."
      >
        <BlockCardSet items={FOUR} lead="none" cue="cta" />
      </ContentSection>

      {/* ── 05 · C-icon-4 + CtaRow ─────────────────────────────────────────────────────────── */}
      <Title id="icon-four">
        C-icon-4 on a service page: what teams add next. Four may close on a CtaRow under the
        grid; the head track still takes only its photograph. At 390, linked and more than
        three, the set is a sideways row.
      </Title>
      <ContentSection
        arrangement="beside"
        data-band="C-icon"
        eyebrow="Pairs well with"
        heading="What teams add next"
        headingId="ksl-icon-four"
        lead="Four services that most often follow product design, in the order clients add them."
        asideFill
        aside={<Aside id="hands-sticky-blue-pen" />}
        footer={
          <CtaRow
            note="Six services in all, each with its own page."
            actions={[{ label: 'All services', href: ROUTES.services }]}
          />
        }
      >
        <BlockCardSet items={NEXT} lead="none" across={2} />
      </ContentSection>

      {/* ── 06 · Slider ────────────────────────────────────────────────────────────────────── */}
      <Title id="slider">
        Five or more image cards never wrap to a 3 × 2 grid (826): they become a Slider showing
        three, the controls centred under a centred head. Measured at the tallest slide plus its
        controls. At 390, one card in view and the next peeking.
      </Title>
      <ContentSection
        align="center"
        headingSize="display"
        data-band="C-image"
        eyebrow="All services"
        heading="Six ways we can help"
        headingId="ksl-slider"
      >
        <Slider label="Services" align="center">
          {SLIDES.map((card) => (
            <BlockCard
              key={card.href}
              title={card.title}
              body={card.body}
              media={photo(card.image)}
              href={card.href}
              tracks={3}
              ratio="wide"
              size="md"
            />
          ))}
        </Slider>
      </ContentSection>
    </>
  );
}
