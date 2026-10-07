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
  type LayoutProps,
} from '@/components';
import { getIdealServiceStory, getNavigation } from '@/content';
import { ROUTES } from '@/lib/routes';
import { ContentSection, CtaRow, ListCard, Proof, type ProofFigure } from '@/patterns';

import { Specimen, specimenStyles as s } from '../../_specimen/Specimen';
import {
  CLIENTS,
  DOODLE,
  GT_TOOLS,
  INCLUUDE,
  KNOVOS,
  LATITUDEPAY,
  OMNY,
  PLEDGE,
  QUOTER,
  SAFEXPAY,
  type ClientRecord,
} from '../../_specimen/clients';
import t from '../../_specimen/typeroles.module.css';

/**
 * Kit · H · Client logos — the family specimen (visual-direction § 3.4 H, § 5.8, § 5.9).
 *
 * The H band is a COMPOSITION, not a unit: ClientMark × n in a Cluster (a strip) or a Layout (a
 * grid), inside a ContentSection. This page adds no pattern and no component. Every band below is a
 * live ContentSection, so the bands sit edge to edge as on a route and `npm run fold:check` measures
 * each against the fold (≤ 830 at 1470 × 830).
 *
 * The bands differ in SHAPE, head and body both, so the page never repeats one rectangle:
 *   01  centred H-title, one centred line of marks, the sourced badge;
 *   02  a label over a strip justified to the column, on tint (the surface proof);
 *   03  H-beside-actions (no lead), a 3 × 3 grid in the body track;
 *   04  H-title, then Quantum-06's panel: marks beside the quote, the figure on its attribution line;
 *   05  split head with the sourced figure as its hero, the § 5.9 grid under it;
 *   06  the H-row with its action, the strip justified across the full measure.
 *
 * Honesty rules (§ 5.8): the marks are the nine real files in public/clients, one ink per set,
 * equal area, with the weight corrections recorded in ../../_specimen/clients.ts. A real mark sits
 * only beside real words or sourced numerals: the approved fixture quote (product-design's G band,
 * set with no portrait — the fixture's is a stand-in, and a stock face beside a real name is a
 * fabricated likeness), or the one sourced figure the seam holds, the Clutch rating
 * (fixtures/ratings.ts, via getNavigation). No illustrative stat shares any band here.
 */

/* ── The sets. Which marks a band shows is a content choice; each is sized for its track. ─── */

/** One centred line: six fit the 1240 column at stack (≈ 990), and wrap two to a row at 390. */
const LINE: readonly ClientRecord[] = [OMNY, LATITUDEPAY, QUOTER, KNOVOS, DOODLE, PLEDGE];

/** The tint strip, justified to the column. Six, so 390 is three full rows of two. */
const TINT: readonly ClientRecord[] = [KNOVOS, SAFEXPAY, PLEDGE, GT_TOOLS, INCLUUDE, OMNY];

/** Beside the quote: two across in the one-third track, so every mark must fit a 125 cell at 1024
    (the widest here is Pledge, 121). LatitudePay and Knovos are the two that would not. */
const BESIDE_QUOTE: readonly ClientRecord[] = [
  OMNY,
  QUOTER,
  SAFEXPAY,
  DOODLE,
  PLEDGE,
  INCLUUDE,
];

/** Under the H-row, justified across the full measure. */
const UNDER_ROW: readonly ClientRecord[] = [
  LATITUDEPAY,
  DOODLE,
  QUOTER,
  GT_TOOLS,
  KNOVOS,
  INCLUUDE,
];

/* ── The compositions. Each is ClientMark × n in a primitive, which owns every seam. ──────── */

function Marks({ marks }: { marks: readonly ClientRecord[] }) {
  return marks.map((m) => (
    <li key={m.name}>
      <ClientMark {...m} />
    </li>
  ));
}

/**
 * The strip (§ 5.9): a Cluster at `stack` on both axes, so 48 is the floor between marks and the
 * Cluster decides where a row breaks. `between` justifies a strip to its column — the seam grows,
 * never shrinks below 48 — so a start-aligned band's marks end on the column's end edge instead of
 * stopping short of it.
 */
function Strip({
  marks,
  justify,
}: {
  marks: readonly ClientRecord[];
  justify: 'center' | 'between';
}) {
  return (
    <Cluster as="ul" colGap="stack" rowGap="stack" align="center" justify={justify}>
      <Marks marks={marks} />
    </Cluster>
  );
}

/**
 * The grid (§ 5.9): equal cells in a Layout at `stack` on both axes, each mark at its cell's start
 * edge so the columns line up with the head. The column COUNT is the caller's, because the track
 * the grid sits in decides it — § 5.9's {base: 2, md: 3, lg: 5} in the full column, {base: 2, md: 3}
 * in a two-thirds body track. Base is always 2: a 139 cell holds the widest phone-size mark (137).
 * At 1024 alone the five-across and beside cells are 154 and 160, so LatitudePay (175) meets its
 * cell and letterboxes by 9–12% (max-inline-size), never spilling; from 1440 every cell is ≥ 202.
 */
function Grid({
  marks = CLIENTS,
  columns,
}: {
  marks?: readonly ClientRecord[];
  columns: LayoutProps['columns'];
}) {
  return (
    <Layout as="ul" columns={columns} colGap="stack" rowGap="stack" align="center">
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

/** The specimen's caption between bands: a hairline, a mono label and one line. */
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

  /* The one sourced figure the seam holds, read off the Clutch profile on 26 August 2026
     (fixtures/ratings.ts), so the integrity line says so. */
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
        {/* hero-field (§ 6.3), at the recipe's numbers: the empty end half of a hero with no
            media, ellipse top −220, end −160, 40% × 420, blur 200. At 1470 the box spans x ≥ 1042
            and y −220 to 200, clear of the copy track, which ends at ≈ 786; at 390 it starts at
            ≈ 394, past the 358 column edge. Only the feather reaches content. */}
        <Texture>
          <TextureShape
            kind="ellipse"
            top={-220}
            right={-160}
            width="40%"
            height={420}
            blur={200}
          />
        </Texture>
        <Layout columns={{ lg: [7, 5] }} colGap="column">
          <Layout rowGap="stack">
            <Layout rowGap="block">
              <p className={s.eyebrow}>UI kit · Band H</p>
              <h1>Client logos</h1>
              <p className={t.lead}>
                The teams we have shipped with, set as one quiet line of marks. A real mark sits
                only beside real words: an approved quote, or a figure checked against its
                source.
              </p>
            </Layout>
            <Layout as="ol" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
              <ListCard
                form="tile"
                marker={{ type: 'number', value: 1, tone: 'neutral' }}
                title="One ink, equal area"
                body="Each mark drawn in the ground's ink from the client's own file, sized by area, not width."
              />
              <ListCard
                form="tile"
                marker={{ type: 'number', value: 2, tone: 'neutral' }}
                title="Real marks, real words"
                body="Beside an approved quote or a sourced figure only, never an illustrative one."
              />
            </Layout>
          </Layout>
        </Layout>
      </Section>

      {/* ── 01 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="01 · Centred strip with an H-title">
        Six marks in one centred Cluster, the sourced Clutch badge a stack under them.
      </Label>
      <ContentSection
        align="center"
        eyebrow="Clients"
        heading="Teams we have shipped with"
        headingId="logos-strip"
      >
        <Layout rowGap="stack" justifyItems="center">
          <Strip marks={LINE} justify="center" />
          {badge}
        </Layout>
      </ContentSection>

      {/* ── 02 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="02 · Strip on tint">
        The surface proof: tint&rsquo;s --cmark-ink from the same files, under a one-line label.
      </Label>
      <ContentSection
        surface="tint"
        density="tight"
        eyebrow="Product teams we have shipped with"
      >
        <Strip marks={TINT} justify="between" />
      </ContentSection>

      {/* ── 03 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="03 · Grid beside a head">
        Nine in equal cells, three across beside a head with no lead; two across at 390.
      </Label>
      <ContentSection
        arrangement="beside"
        eyebrow="Clients"
        heading="Nine teams, one way of working"
        headingId="logos-grid"
        actions={<CtaRow actions={[HOW_WE_WORK]} rule={false} />}
      >
        <Grid columns={{ base: 2, md: 3 }} />
      </ContentSection>

      {/* ── 04 ──────────────────────────────────────────────────────────────────────────── */}
      {quote ? (
        <>
          <Label title="04 · Marks beside a real approved quote">
            Quantum-06&rsquo;s panel: the figure closes the quote&rsquo;s attribution line.
            Quote first at 390.
          </Label>
          <ContentSection
            surface="tint"
            eyebrow="In a client’s words"
            heading="What working with us is like"
            headingId="logos-quote"
          >
            {/* Source order is the phone's reading order — the words, the figure, then the marks —
                and `reverse` sets the marks in the leading track from 1024 for the eye (Layout's
                reverse: an evidence panel and its marks carry no order against each other). [2, 1]
                mirrored is 1fr 2fr with the quote panel still in the 2fr track.

                Why [1, 2] and not [1, 1]: in a 588 half the quote and the figure cannot share the
                attribution's line, and stacking them leaves the panel open at its foot. The
                figure sits beside the quote only from 1440, where the 784 track gives the quote
                480 (five lines of the large quote role); below that it stacks under the quote,
                which is what keeps "Overall rating on Clutch" on one line at 1024. */}
            <Layout
              columns={{ lg: [2, 1] }}
              reverse={{ lg: true }}
              colGap="column"
              rowGap="stack"
              align="center"
            >
              <Layout columns={{ xl: [2, 1] }} colGap="column" rowGap="stack" align="end">
                <Proof
                  arrangement="display"
                  quote={{
                    quoteHtml: `<p>${escapeHtml(quote.text)}</p>`,
                    name: quote.name,
                    role: quote.role,
                    company: quote.company,
                  }}
                />
                {figures.length > 0 ? <Proof figures={figures} /> : null}
              </Layout>
              <Grid marks={BESIDE_QUOTE} columns={{ base: 2 }} />
            </Layout>
          </ContentSection>
        </>
      ) : null}

      {/* ── 05 ──────────────────────────────────────────────────────────────────────────── */}
      {figures.length > 0 ? (
        <>
          <Label title="05 · Sourced figure over the grid">
            The Clutch rating as the band&rsquo;s hero, at stat-xl, over the § 5.9 grid.
          </Label>
          <ContentSection
            arrangement="split-head"
            eyebrow="On the record"
            heading="Rated by the teams we serve"
            headingId="logos-figures"
            actions={<Proof figures={figures} figureSize="xl" />}
          >
            <Grid columns={{ base: 2, md: 3, lg: 5 }} />
          </ContentSection>
        </>
      ) : null}

      {/* ── 06 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="06 · Strip with a CtaRow">
        The action on the head&rsquo;s row; the strip justified across the full measure.
      </Label>
      <ContentSection
        arrangement="split-head"
        eyebrow="Clients"
        heading="Recent work"
        headingId="logos-cta"
        lead="A selection of the products we have designed with their teams. The case studies show the decisions behind them."
        actions={<CtaRow actions={[SEE_WORK]} rule={false} />}
      >
        <Strip marks={UNDER_ROW} justify="between" />
      </ContentSection>

      {/* ── 07 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="07 · Each at 390">
        Strips two to a row, grids two across, the quote before its marks.
      </Label>
    </>
  );
}
