import {
  BrandMark,
  ClientMark,
  Cluster,
  Icon,
  Layout,
  RatingBadge,
  Section,
  Texture,
  TextureShape,
  type ClientMarkProps,
  type LayoutProps,
} from '@/components';
import { getIdealServiceStory, getNavigation } from '@/content';
import { ROUTES } from '@/lib/routes';
import { ContentSection, CtaRow, ListCard, Proof, type ProofFigure } from '@/patterns';

import { Specimen, specimenStyles as s } from '../../_specimen/Specimen';
import t from '../../_specimen/typeroles.module.css';

/**
 * Kit · H · Client logos — the family specimen (visual-direction § 3.4 H, § 5.8, § 5.9).
 *
 * The H band is a COMPOSITION, not a unit: ClientMark × n in a Cluster (a strip) or a Layout (a
 * grid), inside a ContentSection. This page adds no pattern and no component; every band below is
 * a live ContentSection, so the bands sit edge to edge as they do on a route and each can be
 * measured against the fold (≤ 830 at 1470 × 830, § 1.3).
 *
 * The bands deliberately differ in STRUCTURE, not only in where the head sits: a centred strip, a
 * grid beside a head, a quote panel with a column of marks (Quantum-06's shape, on tint), a figure
 * over a grid, and a strip closed by a CtaRow. Each carries one blue foreground mark (§ 4.2): the
 * RatingBadge star, a link-style action, the quote rule and stat numeral, the CtaRow link. The
 * marks themselves stay in one ink.
 *
 * Honesty rules that shape the variations (§ 5.8):
 *   - the marks are the nine real client files in public/clients, one ink per set, equal area;
 *   - a real mark sits only beside real words or sourced numerals. The quote is the approved
 *     fixture quote (the product-design G band), set with NO portrait — the fixture's portrait is
 *     a stand-in, and a stock face beside a real name is a fabricated likeness. The speaker's
 *     company (Auxentios) has no mark among the nine, so the column beside the quote is labelled
 *     as OTHER clients rather than left for a reader to search for the speaker's logo;
 *   - the figure reads the one sourced figure the content seam holds, the Clutch rating
 *     (fixtures/ratings.ts, via getNavigation), and nothing illustrative shares the band.
 */

type Mark = Omit<ClientMarkProps, 'className'>;

/* width / height are each file's viewBox. The corrections are the weight corrections recorded with
   each asset (ch05 §10, ±15%), judged by eye in the strip at 1440 and 390 (fix round 1, 6 Oct):
   Doodle, GT Tools and Incluude are heavy bold wordmarks and come down; SafeXpay's light strokes
   and Knovos's thin capitals come up. LatitudePay keeps +0.05, the most that takes effect: its
   fitted width meets the 160 width cap, so its weight can only be matched by bringing the heavy
   marks down to it — which is what the negative corrections do. Quoter's outlined lockup is
   nudged down so its ring does not read as a badge. */
const mark = (name: string, file: string, width: number, height: number, correction?: number) =>
  ({ name, src: `/clients/${file}.svg`, width, height, correction }) satisfies Mark;

const OMNY = mark('Omny', 'omny', 93.982, 24.792);
const LATITUDEPAY = mark('LatitudePay', 'latitudepay', 133.896, 18.2, 0.05);
const QUOTER = mark('Quoter', 'quoter', 93.996, 28.002, -0.06);
const KNOVOS = mark('Knovos', 'knovos', 85.232, 14, 0.04);
const SAFEXPAY = mark('SafeXpay', 'safexpay', 83.02, 22.398, 0.1);
const DOODLE = mark('Doodle', 'doodle', 104, 24, -0.13);
const PLEDGE = mark('Pledge', 'pledge', 92.032, 19.6);
const GT_TOOLS = mark('GT Tools', 'gttools', 67.384, 19.6, -0.12);
const INCLUUDE = mark('Incluude', 'incluude', 88.906, 16.851, -0.12);

/** The set, in the order the strip reads. Which mark leads is a content decision. */
const CLIENTS: readonly Mark[] = [
  OMNY,
  LATITUDEPAY,
  QUOTER,
  KNOVOS,
  SAFEXPAY,
  DOODLE,
  PLEDGE,
  GT_TOOLS,
  INCLUUDE,
];

/** The figure band's set: eight of the nine, four across in two full courses, so the grid ends
    level under the figure instead of leaving a ragged fifth column. */
const UNDER_FIGURE: readonly Mark[] = [
  OMNY,
  LATITUDEPAY,
  QUOTER,
  KNOVOS,
  DOODLE,
  PLEDGE,
  GT_TOOLS,
  INCLUUDE,
];

/** The quote panel's column: six of the nine, three rows of two, so it ends on a full course. */
const BESIDE_QUOTE: readonly Mark[] = [OMNY, LATITUDEPAY, QUOTER, KNOVOS, PLEDGE, SAFEXPAY];

/* ── The compositions. Each is ClientMark × n in a primitive, which owns every seam. ──────── */

function Marks({ marks }: { marks: readonly Mark[] }) {
  return marks.map((m) => (
    <li key={m.name}>
      <ClientMark {...m} />
    </li>
  ));
}

/**
 * The strip (§ 5.9): a Cluster at `stack` on both axes. The marks set no spacing of their own and
 * the Cluster decides where a row breaks.
 */
function Strip({
  marks = CLIENTS,
  justify,
}: {
  marks?: readonly Mark[];
  justify?: 'start' | 'center';
}) {
  return (
    <Cluster as="ul" colGap="stack" rowGap="stack" align="center" justify={justify}>
      <Marks marks={marks} />
    </Cluster>
  );
}

/**
 * The strip set as two courses — four over five. Nine marks at equal area are ~1400 wide with
 * their seams, so one Cluster in the 1240 column breaks 7 + 2 and strands two marks under a full
 * row. Two Clusters a `stack` apart give the band a balanced, staggered shape, centred or
 * start-aligned with its head. The longer course goes second so that at 390, where each course
 * wraps two to a row, the one odd mark is the last. Still ClientMark × n in a Cluster, twice.
 */
function Courses({ justify }: { justify: 'start' | 'center' }) {
  return (
    <Layout rowGap="stack" justifyItems={justify}>
      <Strip marks={CLIENTS.slice(0, 4)} justify={justify} />
      <Strip marks={CLIENTS.slice(4)} justify={justify} />
    </Layout>
  );
}

/**
 * The grid (§ 5.9): equal cells in a Layout at `stack`, each mark at its cell's start edge so the
 * columns line up with the head. `columns` is the caller's, because the track it sits in decides
 * it. The column seam is `gutter`, not § 5.9's `stack`, and deliberately: in equal cells the seam
 * is a floor, not the visible gap (a 209 cell around a 112 mark), so at 768 and up it changes
 * nothing you can see; at 390 it is what lets three cells sit in the 326 column at 87 wide rather
 * than 77, so a nine-mark grid is three short courses, not a five-row list (fix round 1). The row
 * seam stays `stack`. Specimen scaffolding: the ClientMark specimen has its own copy, and a page route that needs
 * one gets it built in the tier, not copied a third time.
 */
function Grid({
  marks = CLIENTS,
  columns,
}: {
  marks?: readonly Mark[];
  columns: LayoutProps['columns'];
}) {
  return (
    <Layout as="ul" columns={columns} colGap="gutter" rowGap="stack" align="center">
      <Marks marks={marks} />
    </Layout>
  );
}

/* ── Content read through the seam. ──────────────────────────────────────────────────────── */

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** The approved fixture quote, from the product-design story's proof band. */
function approvedQuote() {
  const story = getIdealServiceStory('product-design');
  for (const section of story?.sections ?? []) {
    if (!('blocks' in section)) continue;
    for (const block of section.blocks) {
      if (block.kind === 'proof') return block.quote;
    }
  }
  return null;
}

const SEE_WORK = { label: 'See the work', href: ROUTES.caseStudies };
const HOW_WE_WORK = { label: 'How we work', href: ROUTES.howWeWork };

/** The specimen's caption: a hairline, a mono label and a note, the band below it the rendering. */
function Label({ title, children }: { title: string; children: string }) {
  return (
    <Section flush>
      <Specimen title={title} note={children}>
        {null}
      </Specimen>
    </Section>
  );
}

export default async function KitLogosPage() {
  const { footer } = await getNavigation();
  const rating = footer.brand.rating;
  const quote = approvedQuote();

  /* The one sourced figure the seam holds. Read off the Clutch profile on 26 August 2026
     (fixtures/ratings.ts), so the integrity line says so. One short label: the numeral carries
     the figure, and the date and source are its evidence, not a second statement. */
  const figures: ProofFigure[] = rating
    ? [
        {
          value: rating.score,
          label: `Overall rating on ${rating.platform}`,
          checkedOn: 'Checked 26 August 2026',
          sourceHref: rating.href,
        },
      ]
    : [];

  const badge = rating ? (
    <RatingBadge
      score={rating.score}
      platform={rating.platform}
      href={rating.href}
      icon={<Icon name="star" size="sm" />}
      mark={<BrandMark name="clutch" />}
    />
  ) : null;

  return (
    <>
      {/* ── Intro ───────────────────────────────────────────────────────────────────────── */}
      <Section>
        <Texture>
          {/* The field the set sits on: a soft rect under the end column, the marks' ground. Only
              marks sit over it, never copy (§ 6). */}
          <TextureShape right={-160} width="56%" height="120%" radius={480} blur={220} />
        </Texture>
        <Layout columns={{ lg: [5, 7] }} colGap="section" rowGap="column" align="center">
          <Layout rowGap="stack">
            <Layout rowGap="block">
              <p className={s.eyebrow}>UI kit · Band H</p>
              <h1>Client logos</h1>
              <p className={t.lead}>
                The teams we have shipped with, set as one quiet line of marks. A composition of
                ClientMark in a Cluster or a Layout, never a component of its own.
              </p>
            </Layout>
            <Layout as="ol" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
              <ListCard
                form="tile"
                marker={{ type: 'number', value: 1 }}
                title="One ink, equal area"
                body="Drawn in the ground's ink from the client's own file, sized by area, not width."
              />
              <ListCard
                form="tile"
                marker={{ type: 'number', value: 2 }}
                title="Real marks, real words"
                body="Beside an approved quote or a sourced figure only, never an illustrative one."
              />
            </Layout>
          </Layout>
          <Grid columns={{ base: 3 }} />
        </Layout>
      </Section>

      {/* ── 01 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="01 · Centred strip with an H-title">
        The default H band (§ 1.4: 277). A centred eyebrow and h2, the nine marks in two
        courses, four over five, a stack apart, and the Clutch badge a stack under them: the
        band&apos;s one blue mark is the badge&apos;s star, and its numeral is sourced.
      </Label>
      <ContentSection
        align="center"
        eyebrow="Clients"
        heading="Teams we have shipped with"
        headingId="logos-strip"
      >
        <Layout rowGap="stack" justifyItems="center">
          <Courses justify="center" />
          {badge}
        </Layout>
      </ContentSection>

      {/* ── 02 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="02 · Grid beside a head">
        § 1.4: 240. The head in the 381 track with one blue link-style action under its lead;
        the marks in equal cells in the 763 track, three across, so nine end level in three
        rows. Five across here would be 114-wide cells, narrower than seven of the nine marks.
        Below 1024 the grid stacks under the head, three across at every width.
      </Label>
      <ContentSection
        arrangement="beside"
        eyebrow="Clients"
        heading="Nine teams, one way of working"
        headingId="logos-grid"
        lead="Discovery through delivery, with the people who decide in the room from the first week."
        actions={<CtaRow actions={[HOW_WE_WORK]} rule={false} />}
      >
        <Grid columns={{ base: 3 }} />
      </ContentSection>

      {/* ── 03 ──────────────────────────────────────────────────────────────────────────── */}
      {quote ? (
        <>
          <Label title="03 · Marks beside a real approved quote, on tint">
            § 1.4: 373, in Quantum-06&apos;s shape: a split head, then a column of marks beside
            the quote pane, the stat at its end. Also the surface proof: tint is the proof band
            (§ 1.7), and the marks take tint&apos;s --cmark-ink from the same files with no
            colour prop. The quote is from Auxentios, which has no mark in the set, so the
            column says plainly that these are other clients. Top-aligned to the quote&apos;s
            first line.
          </Label>
          <ContentSection
            surface="tint"
            arrangement="split-head"
            eyebrow="In a client’s words"
            heading="What working with us is like"
            headingId="logos-quote"
            lead="One client's words, and the market's score beside them. The marks are other teams we have shipped with."
          >
            <Layout columns={{ lg: [1, 2] }} colGap="section" rowGap="column" align="start">
              <Layout rowGap="block">
                <p className={s.eyebrow}>Also shipped with</p>
                <Grid marks={BESIDE_QUOTE} columns={{ base: 3, lg: 2 }} />
              </Layout>
              <Proof
                arrangement="display"
                quote={{
                  quoteHtml: `<p>${escapeHtml(quote.text)}</p>`,
                  name: quote.name,
                  role: quote.role,
                  company: quote.company,
                }}
                figures={figures.length > 0 ? figures : undefined}
              />
            </Layout>
          </ContentSection>
        </>
      ) : null}

      {/* ── 04 ──────────────────────────────────────────────────────────────────────────── */}
      {figures.length > 0 ? (
        <>
          <Label title="04 · Sourced figure over the strip">
            Ratings fixture only: the seam holds one sourced figure, the Clutch score, so the
            row is that one figure at the display stat role, in blue — never padded with
            illustrative numerals (§ 5.8). It sits over the marks at every width. The marks are
            eight of the nine in a grid that squares off: four across in two full courses from
            768, two across at 390. Nine in five tracks left a ragged fifth column; the set is a
            content choice.
          </Label>
          <ContentSection
            arrangement="split-head"
            eyebrow="On the record"
            heading="Rated by the teams we serve"
            headingId="logos-figures"
            lead="Every figure on this site is checked against its source and dated. This one is the overall score clients leave us on Clutch."
          >
            <Layout rowGap="column">
              <Proof figures={figures} />
              <Grid marks={UNDER_FIGURE} columns={{ base: 2, md: 4 }} />
            </Layout>
          </ContentSection>
        </>
      ) : null}

      {/* ── 05 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="05 · Strip with a CtaRow">
        The strip as a body, then the band&apos;s foot: a hairline and one blue link a stack
        under it (§ 1.2: body → CtaRow). Split-head, the marks in the same four-over-five
        courses as 01, start-aligned with the head, so the set ends on a balanced shape before
        the rule.
      </Label>
      <ContentSection
        arrangement="split-head"
        eyebrow="Clients"
        heading="Recent work"
        headingId="logos-cta"
        lead="A selection of the products we have designed with their teams. The case studies show the decisions behind them."
        footer={<CtaRow actions={[SEE_WORK]} />}
      >
        <Courses justify="start" />
      </ContentSection>

      {/* ── 06 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="06 · Every band at 390">
        Each band above is its own 390 proof, captured by the kit shots at 390. Below 768 the
        ClientMark size steps down (target side 44, height cap 32), so a strip wraps as a
        compact set two to a course rather than a wall that dwarfs its heading; the nine-mark
        grids hold three equal cells, three short courses, and a mark wider than its cell
        shrinks to it rather than spilling.
      </Label>
    </>
  );
}
