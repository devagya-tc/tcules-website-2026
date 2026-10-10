import { Cluster, Layout, Section, TextureHorizon, type IconName } from '@/components';
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
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { ROUTES } from '@/lib/routes';

import { specimenStyles as s } from '../../_specimen/Specimen';
import t from '../../_specimen/typeroles.module.css';

/**
 * /design/kit/service-list — the service router family of the Tcules UI kit (cmp-services).
 *
 * "Which one is mine?" answered three ways (visual-direction § 3.3, § 3.4): an ICON router (C-icon,
 * a stacked head over borderless boxed whole-card links), an IMAGE router (C-image-3 / -4 linked,
 * or a Slider from five), and a LIST router (a stacked head with its actions over three ListCard
 * tiles, each with a 160 thumbnail). Every router stacks its head over its clickable cards and
 * carries no decorative photograph (owner, 9 Oct 2026). A composition:
 * no unit is added. ServicePage's `Router` block is swapped for one of these by cmp-service-pages;
 * this route proves the shapes, and the template is not touched here.
 *
 * Every destination is a ROUTES name (src/lib/routes.ts), never a literal. Card copy is written as
 * a CONDITION — what sends a reader to that page — because a router is read for "is this me?",
 * and the service name is the link's name, because a link is named by its destination.
 *
 * The page is a cool-family page (§ 5.5 rule 1): every photograph is cool or neutral and quiet, and
 * none appears twice. Grading is banned (ch05 § 5), so the family is held by SELECTION (fix round 2:
 * the warm studio snapshots on the audit cards and the warm, royal-blue-shirted aside in 01 were
 * replaced). Blue is the foreground accent only: every eyebrow's square, glyphs, a linked title on
 * hover, every link and its arrow, the rails' thumbs and the index numerals (the list router's
 * head action is a link since r7-buttons, 8 Oct 2026). Texture: one stepped `horizon` (TextureHorizon, § 6.3), at
 * the foot of the centred image router, directly above the change of ground into the tint list
 * router — the one place on the page where a band meets a different ground. It starts 56 under the
 * cards' last line; never behind cards or rows, never in the Slider. The hero carries none.
 *
 * Band order alternates the head, the ground and the card shape (icon boxes · centred covers · rows
 * on tint · four covers · a row of four icon boxes · a rail) so no two bands are the same rectangle, which is the squint test
 * (§ 8.5) applied to the specimen. The two image routers differ by shape as well as head: three whole
 * cards under a display head, then six on a rail that runs off the page's end edge.
 */

const photo = (id: PhotoId): BlockCardMedia => ({ type: 'image', image: getKitPhoto(id) });

const icon = (
  id: string,
  name: IconName,
  title: string,
  body: string,
  href: string,
): BlockCardSetItem => ({ id, icon: name, title, body, href });

/* ── 01 · Icon router, six ─────────────────────────────────────────────────────────────────────
   Icon card ceilings (§ 1.5): title ≤ 5 words on one line, body ≤ 14 on two.

   One silhouette family (fix round 1): every glyph is a solid Solar Bold shape drawn straight on
   the ground — pen and ruler, stacked layers, sparkles, a screen, a database, a shield. Round 1
   mixed three of those with three filled rounded tiles (code-square, server, refresh-square), so
   half the grid read as blue chips and half as marks, and the accent landed unevenly. The thin
   stroke glyphs (code, refresh) are a third weight and are left out for the same reason. */
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
    'layers',
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
    'monitor',
    'Design engineering',
    'For designs that change shape somewhere between the file and the build.',
    ROUTES.designEngineering,
  ),
  icon(
    'six-software',
    'database',
    'Software development',
    'For the build behind the design, held to the same standard the design set.',
    ROUTES.softwareDevelopment,
  ),
  icon(
    'six-modern',
    'shield-check',
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
   One-column D row ceilings: title ≤ 5, body ≤ 28 on two lines; here ≤ 12, one line at 1440 and
   three beside the phone thumbnail. The thumbnail is the row's marker, 160 × 107 at 3:2 with the
   8 radius and no frame (§ 5.3), 96 × 64 below md so it stays beside its title. Every photograph
   cool or neutral: round 1's violet-lit pencil was the page's one saturated non-blue colour. */
const ROWS: readonly { title: string; body: string; image: PhotoId; href: string }[] = [
  {
    title: 'Design systems',
    body: 'When every team builds the same screens a little differently.',
    image: 'screen-over-shoulder',
    href: ROUTES.designSystems,
  },
  {
    title: 'Product modernisation',
    body: 'When the product is old enough that every change feels risky.',
    image: 'office-calm-interior',
    href: ROUTES.productModernisation,
  },
  {
    title: 'Software development',
    body: 'When the design is settled and the build must hold to it.',
    image: 'team-laptops-table',
    href: ROUTES.softwareDevelopment,
  },
];

/* ── 04 · Image router, four, per-card CTA ─────────────────────────────────────────────────────
   Card-4 ceilings: title ≤ 8, body ≤ 12. Fix round 2: the studio's own 622px snapshots read warm and
   busy under fluorescent light, saturated pink and orange beside the page's cool editorial frames.
   Four cool or neutral, quiet frames instead, each a close reading of its audit's object: a flow
   mapped on a whiteboard, a component kit laid out, a screen against its phone build, a review in
   conversation. */
const FOUR: readonly BlockCardSetItem[] = [
  {
    id: 'au-ux',
    title: 'UX and product audit',
    body: 'Where the product loses people, ranked by what it costs.',
    media: photo('whiteboard-two-hands'),
    href: ROUTES.uxProductAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'au-system',
    title: 'Design-system audit',
    body: 'Which components drift, and what each drift costs a release.',
    media: photo('desk-flatlay-devices'),
    href: ROUTES.designSystemAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'au-code',
    title: 'Design-to-code audit',
    body: 'Where the build departs from the design, and why.',
    media: photo('designer-desk-monitor'),
    href: ROUTES.designToCodeAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'au-ai',
    title: 'AI product readiness',
    body: 'What an AI feature must show before people trust it.',
    media: photo('conversation-chalkboard'),
    href: ROUTES.aiProductUxReadiness,
    ctaLabel: 'See the review',
  },
];

/* ── 05 · Icon router, four, CtaRow ────────────────────────────────────────────────────────────
   On a service page: what teams add after this one. */
const NEXT: readonly BlockCardSetItem[] = [
  icon(
    'nx-systems',
    'layers',
    'Design systems',
    'Once the screens ship, one shared set keeps the next ones consistent.',
    ROUTES.designSystems,
  ),
  icon(
    'nx-engineering',
    'monitor',
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
    'shield-check',
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

/*
 * Names are "form, count": a comma, never a middot. Round 1's "Image router · three" bound the
 * middot to one word with a non-breaking space and wrapped at 1024 as "Image / router · three" or
 * left the middot dangling at a line end; a comma breaks where a reader expects and none of these
 * needs to (≤ 20 characters, one line in the 1024 index's 298 track).
 */
const VARIATIONS = [
  {
    id: 'icon-six',
    name: 'Icon router, six',
    note: 'Six services beside a photograph; each whole card is the link.',
  },
  {
    id: 'image-three',
    name: 'Image router, three',
    note: 'Three linked photographs under a centred display head.',
  },
  {
    id: 'list',
    name: 'List router, three',
    note: 'Thumbnail rows beside a head that carries the band’s actions.',
  },
  {
    id: 'image-four',
    name: 'Image router, four',
    note: 'Four fixed-scope audits, each naming its own next step.',
  },
  {
    id: 'icon-four',
    name: 'Icon router, four',
    note: 'What teams add next, closed by a link to all six.',
  },
  {
    id: 'slider',
    name: 'Image router, Slider',
    note: 'Six cards on a rail that runs off the page’s edge.',
  },
] as const;

type VariationId = (typeof VARIATIONS)[number]['id'];

const indexOf = (id: VariationId) =>
  String(VARIATIONS.findIndex((v) => v.id === id) + 1).padStart(2, '0');

/**
 * The titled band in front of each variation, on one line (fix round 1): the blue index, the name,
 * and a one-sentence note. Round 1's four-line spec paragraphs made the page read as documentation
 * between its bands; the rules each variation proves are in the comments beside its data instead.
 * Its own tight Section, so the variation under it sits edge to edge with its neighbours exactly as
 * on a route and fold:check measures the band as a page renders it. It takes the ground of the
 * band it introduces. The `spec` class is the specimen harness's ruled crop handle.
 */
function Title({ id, surface }: { id: VariationId; surface?: 'tint' }) {
  const variation = VARIATIONS.find((v) => v.id === id)!;
  return (
    <Section id={id} surface={surface}>
      <Cluster className={s.spec} colGap="block" rowGap="tight" align="baseline">
        <span className={s.kitIndex}>{indexOf(id)}</span>
        {/* An h2 at h4 scale, so the outline never steps h1 → h3 → h2 beside the band's h2. */}
        <h2 className={t.h4}>{variation.name}</h2>
        <p className={s.specNote}>{variation.note}</p>
      </Cluster>
    </Section>
  );
}

export default function ServiceListKitSpecimen() {
  return (
    <>
      {/* ── Intro ──────────────────────────────────────────────────────────────────────────── */}
      {/* The photograph hero at § 5.4's 5:4 (572 × 458 at 1470), so the image outweighs the copy as
          the references' do. No texture: the plinth under the lead was parked in the space the
          shorter photo left, and read as a skeleton loader. */}
      <PageHero
        arrangement="beside"
        eyebrow="Tcules UI kit"
        title="Every service, one step away"
        body={[
          'Three ways a page routes a reader to the right service: icons beside a photograph, image cards, or ruled rows with a thumbnail.',
        ]}
        actions={[
          { label: 'See the routers', href: '#icon-six' },
          { label: 'All services', href: ROUTES.services },
        ]}
        media={{ type: 'image', image: getKitPhoto('wall-sketching-portrait'), ratio: '5/4' }}
      />

      {/* The index: every variation, linked to its band — itself a small router, its numerals on
          the column edge the hero's copy holds. Neutral numerals: they index the page, they are not
          the band's information (ListCard spec, number tone). */}
      <Section>
        <Layout as="ol" columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="none">
          {VARIATIONS.map((v, i) => (
            <ListCard
              key={v.id}
              title={v.name}
              href={`#${v.id}`}
              marker={{ type: 'number', value: i + 1, tone: 'neutral' }}
              size="sm"
            />
          ))}
        </Layout>
      </Section>

      {/* ── 01 · C-icon-6 ──────────────────────────────────────────────────────────────────── */}
      {/* A stacked head over six linked icon cards, two rows of three, and no photograph: a
          section of clickable cards reads as its heading's continuation (owner, 9 Oct 2026).
          Whole-card links in borderless boxes; no CtaRow (§ 1.4 rule 7). At 390 the six are one sideways row, the next card peeking, with a progress rail under it
          whose thumb is a sixth of its length, so the count reads; the photo is a 21:9 banner. */}
      <Title id="icon-six" />
      <ContentSection
        data-band="C-icon"
        eyebrow="Services"
        heading="Find the service that fits"
        headingId="ksl-icon-six"
        lead="Each has its own page. Most teams start with one, then add a second once it ships."
      >
        <BlockCardSet items={SIX} lead="none" across={3} frame="box" />
      </ContentSection>

      {/* ── 02 · C-image-3, H-compact centred ──────────────────────────────────────────────── */}
      {/* Three linked cards at 16:9 under a centred display head, the copy written as the condition
          that sends a reader there; three across from 768 (BlockCardSet), a scroll row at 390. The
          `horizon` at its foot meets the tint list router below. */}
      <Title id="image-three" />
      <ContentSection
        align="center"
        headingSize="display"
        data-band="C-image"
        eyebrow="Where to start"
        heading="Three ways in"
        headingId="ksl-image-three"
        lead="Pick the problem that sounds like yours. Each page says what we do first and what you get."
        texture={<TextureHorizon />}
      >
        <BlockCardSet items={THREE} lead="none" />
      </ContentSection>

      {/* ── 03 · List router ───────────────────────────────────────────────────────────────── */}
      {/* A stacked head carrying the band's actions (one link — in-band, r7-buttons) over three
          linked ListCard tiles across the column: thumbnail, title, the condition under it.
          Clickable, so the head sits above them at full width (owner, 9 Oct 2026); tiles rather
          than rows, because three 171 rows under a full head ran the band to 989. On tint, the
          page's one change of ground, so the run of paper bands breaks where the shape does. */}
      <Title id="list" surface="tint" />
      <ContentSection
        surface="tint"
        data-band="D"
        eyebrow="Related services"
        heading="Not the right fit?"
        headingId="ksl-list"
        lead="Three neighbouring services, each for a different problem. If none is yours, a short call will find it."
        actions={
          <CtaRow rule={false} actions={[{ label: 'Book a call', href: ROUTES.contact }]} />
        }
      >
        <Layout as="ul" columns={{ base: 1, md: 3 }} colGap="gutter" rowGap="stack">
          {ROWS.map((row) => (
            <ListCard
              key={row.href}
              form="tile"
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

      {/* ── 04 · C-image-4, stacked head, per-card CTA ───────────────────────────────────── */}
      {/* Four across at 286, h5 over body-sm, lead="none" so no audit looks recommended. Each card
          names its destination in a blue link pinned to its foot, so the four links share a line.
          The studio's own photographs. */}
      <Title id="image-four" />
      <ContentSection
        data-band="C-image"
        eyebrow="Fixed-scope audits"
        heading="Start smaller, with an audit"
        headingId="ksl-image-four"
        lead="Two to three weeks and a fixed fee. You keep a ranked list of what to fix first."
      >
        <BlockCardSet items={FOUR} lead="none" cue="cta" />
      </ContentSection>

      {/* ── 05 · C-icon-4 + CtaRow ─────────────────────────────────────────────────────────── */}
      {/* On a service page: what teams add next. A stacked head over four linked icon cards in one
          row of four, and its CtaRow under them; no photograph, because the cards are clickable
          (owner, 9 Oct 2026). At 390, linked and more than three, the set is a sideways row with
          its progress rail. */}
      <Title id="icon-four" />
      <ContentSection
        data-band="C-icon"
        eyebrow="Pairs well with"
        heading="What teams add next"
        headingId="ksl-icon-four"
        lead="Four services that most often follow product design, in the order clients add them."
        footer={
          <CtaRow
            note="Six services in all, each with its own page."
            actions={[{ label: 'All services', href: ROUTES.services }]}
          />
        }
      >
        <BlockCardSet items={NEXT} lead="none" frame="box" />
      </ContentSection>

      {/* ── 06 · Slider ────────────────────────────────────────────────────────────────────── */}
      {/* Five or more image cards never wrap to a 3 × 2 grid (826): they become a Slider showing
          three, under a start-aligned head this time, and the row BLEEDS past the column's end
          edge, so the fourth card shows in the margin and the set reads as a rail. The controls
          are a split row a `stack` under the cards: the progress rail on the column's start edge,
          the steppers on its end edge. At 390, one card in view and the next peeking. */}
      <Title id="slider" />
      <ContentSection
        data-band="C-image"
        eyebrow="All services"
        heading="Six ways we can help"
        headingId="ksl-slider"
      >
        <Slider label="Services" bleed>
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
