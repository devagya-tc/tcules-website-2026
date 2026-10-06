import {
  BrandMark,
  ClientMark,
  Cluster,
  Icon,
  Layout,
  Media,
  RatingBadge,
  Section,
  Texture,
  TextureShape,
  type ClientMarkProps,
  type LayoutProps,
} from '@/components';
import { getIdealServiceStory, getNavigation } from '@/content';
import { MEDIA_SPLIT } from '@/lib/image-sizes';
import { getKitPhoto } from '@/lib/photos';
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
 * Honesty rules that shape the variations (§ 5.8):
 *   - the marks are the nine real client files in public/clients, one ink per set, equal area;
 *   - a real mark sits only beside real words or sourced numerals. The quote is the approved
 *     fixture quote (the product-design G band), set with NO portrait — the fixture's portrait is
 *     a stand-in, and a stock face beside a real name is a fabricated likeness;
 *   - the figures row reads the one sourced figure the content seam holds, the Clutch rating
 *     (fixtures/ratings.ts, via getNavigation), and nothing illustrative shares the band.
 */

type Mark = Omit<ClientMarkProps, 'className'>;

/* width / height are each file's viewBox; the correction is the one recorded with LatitudePay
   (ClientMark specimen, tracker 2.17). */
const mark = (name: string, file: string, width: number, height: number, correction?: number) =>
  ({ name, src: `/clients/${file}.svg`, width, height, correction }) satisfies Mark;

const OMNY = mark('Omny', 'omny', 93.982, 24.792);
const LATITUDEPAY = mark('LatitudePay', 'latitudepay', 133.896, 18.2, 0.05);
const QUOTER = mark('Quoter', 'quoter', 93.996, 28.002);
const KNOVOS = mark('Knovos', 'knovos', 85.232, 14);
const SAFEXPAY = mark('SafeXpay', 'safexpay', 83.02, 22.398);
const DOODLE = mark('Doodle', 'doodle', 104, 24);
const PLEDGE = mark('Pledge', 'pledge', 92.032, 19.6);
const GT_TOOLS = mark('GT Tools', 'gttools', 67.384, 19.6);
const INCLUUDE = mark('Incluude', 'incluude', 88.906, 16.851);

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
 * The centred strip, set as two courses — four over five. Nine marks at equal area are ~1470 wide
 * with their seams, so one Cluster in the 1240 column breaks 7 + 2 and strands two marks under a
 * full row. Two Clusters a `stack` apart give the band a balanced, staggered shape. The longer
 * course goes second so that at 390, where each course wraps two to a row, the one odd mark is the
 * last, centred under the set (five over four put it mid-strip). Still ClientMark × n in a
 * Cluster, twice: no new unit.
 */
function CentredStrip() {
  return (
    <Layout rowGap="stack" justifyItems="center">
      <Strip marks={CLIENTS.slice(0, 4)} justify="center" />
      <Strip marks={CLIENTS.slice(4)} justify="center" />
    </Layout>
  );
}

/**
 * The grid (§ 5.9): equal cells in a Layout at `stack`, each mark at its cell's start edge so the
 * columns line up with the head. `columns` is the caller's, because the track it sits in decides
 * it: the full column takes {base: 2, md: 3, lg: 5}; the 763 body track beside a head takes three,
 * because five tracks there are 114 wide — narrower than seven of the nine marks.
 */
function Grid({ columns }: { columns: LayoutProps['columns'] }) {
  return (
    <Layout as="ul" columns={columns} colGap="stack" rowGap="stack" align="center">
      <Marks marks={CLIENTS} />
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
     (fixtures/ratings.ts), so the integrity line says so. */
  const figures: ProofFigure[] = rating
    ? [
        {
          value: rating.score,
          label: `Overall rating on ${rating.platform}, from verified client reviews`,
          checkedOn: 'checked on 26 August 2026',
          sourceHref: rating.href,
        },
      ]
    : [];

  return (
    <>
      {/* ── Intro ───────────────────────────────────────────────────────────────────────── */}
      <Section>
        <Texture>
          {/* hero-foot (§ 6.3): under the copy side's foot, its box inside the bottom padding. */}
          <TextureShape
            kind="ellipse"
            bottom={-300}
            left={-200}
            width="50%"
            height={380}
            blur={180}
          />
        </Texture>
        <Layout rowGap="column">
          <Layout columns={{ lg: [7, 5] }} colGap="section" rowGap="stack" align="center">
            <Layout rowGap="block">
              <p className={s.eyebrow}>UI kit · Band H</p>
              <h1>Client logos</h1>
              <p className={t.lead}>
                The teams we have shipped with, set as one quiet line of marks. Not a component:
                a composition of ClientMark in a Cluster or a Layout, inside a ContentSection.
              </p>
            </Layout>
            <Media image={getKitPhoto('team-laptops-table')} ratio="4/3" sizes={MEDIA_SPLIT} />
          </Layout>
          <Layout as="ol" columns={{ base: 1, md: 2, lg: 4 }} colGap="gutter" rowGap="stack">
            <ListCard
              form="tile"
              marker={{ type: 'number', value: 1 }}
              title="One ink per set"
              body="Every mark is drawn in the ground's ink from its own file, never the client's colours."
            />
            <ListCard
              form="tile"
              marker={{ type: 'number', value: 2 }}
              title="Equal area, not width"
              body="A 7:1 wordmark and a 3:1 lockup carry the same visual weight, capped at 40 tall."
            />
            <ListCard
              form="tile"
              marker={{ type: 'number', value: 3 }}
              title="No tiles, no frames"
              body="Space delimits the set. The primitive owns every seam, at the stack step."
            />
            <ListCard
              form="tile"
              marker={{ type: 'number', value: 4 }}
              title="Real marks, real words"
              body="A mark sits only beside an approved quote or a sourced figure, never an illustrative one."
            />
          </Layout>
        </Layout>
      </Section>

      {/* ── 01 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="01 · Centred strip with an H-title">
        The default H band (§ 1.4: 277). A centred eyebrow and five-word h2, then the nine marks
        in two courses, four over five, a stack apart. Cluster at colGap and rowGap stack;
        nothing in the band is boxed.
      </Label>
      <ContentSection
        align="center"
        eyebrow="Clients"
        heading="Teams we have shipped with"
        headingId="logos-strip"
      >
        <CentredStrip />
      </ContentSection>

      {/* ── 02 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="02 · Strip on tint">
        Surface proof — on pages, tint is the proof band only (§ 1.7). Same markup, no colour
        prop: the marks take tint&apos;s --cmark-ink, a step under the heading, from the same
        files. An H-compact head this time, with its lead.
      </Label>
      <ContentSection
        surface="tint"
        align="center"
        eyebrow="Clients"
        heading="Products we have shaped"
        headingId="logos-tint"
        lead="Payments, scheduling, legal technology, retail and AI products, designed alongside the teams who run them."
      >
        <CentredStrip />
      </ContentSection>

      {/* ── 03 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="03 · Grid beside a head">
        § 1.4: 240. The head in the 381 track, the marks in equal cells in the 763 track, three
        across so nine fill three rows exactly and the grid ends level with the lead. Five
        across is the full-column wall; in this track its cells would be 114 wide, narrower than
        seven of the nine marks. Below 1024: stacked, three across, then two at 390.
      </Label>
      <ContentSection
        arrangement="beside"
        eyebrow="Clients"
        heading="Nine teams, one way of working"
        headingId="logos-grid"
        lead="Discovery through delivery, with the people who decide in the room from the first week."
      >
        <Grid columns={{ base: 2, md: 3, lg: 3 }} />
      </ContentSection>

      {/* ── 04 ──────────────────────────────────────────────────────────────────────────── */}
      {quote ? (
        <>
          <Label title="04 · Marks beside a real approved quote">
            § 1.4: 373. [1, 1] at column. The approved fixture quote at display size, then the
            real Clutch badge a block under the attribution — the client&apos;s words, then the
            market&apos;s score. No portrait: the fixture&apos;s is a stand-in, and a stock face
            beside a real name is a fabricated likeness (§ 5.8).
          </Label>
          <ContentSection
            eyebrow="In a client’s words"
            heading="What working with us is like"
            headingId="logos-quote"
          >
            <Layout columns={{ lg: [1, 1] }} colGap="column" rowGap="column" align="center">
              <Layout rowGap="block">
                <Proof
                  arrangement="display"
                  quote={{
                    quoteHtml: `<p>${escapeHtml(quote.text)}</p>`,
                    name: quote.name,
                    role: quote.role,
                    company: quote.company,
                  }}
                />
                {rating ? (
                  <Cluster>
                    <RatingBadge
                      score={rating.score}
                      platform={rating.platform}
                      href={rating.href}
                      icon={<Icon name="star" size="sm" />}
                      mark={<BrandMark name="clutch" />}
                    />
                  </Cluster>
                ) : null}
              </Layout>
              <Grid columns={{ base: 2, md: 3, lg: 3 }} />
            </Layout>
          </ContentSection>
        </>
      ) : null}

      {/* ── 05 ──────────────────────────────────────────────────────────────────────────── */}
      {figures.length > 0 ? (
        <>
          <Label title="05 · Sourced-figures row with the strip">
            Ratings fixture only. The content seam holds one sourced figure, the Clutch score,
            so the row is that one figure — never padded with illustrative numerals, which never
            share a band with real marks (§ 5.8). It is set level with the marks it qualifies, 1
            : 3 at section, where the 880 track holds the strip as four over five unforced;
            below 1024 the figure sits over the strip.
          </Label>
          <ContentSection
            eyebrow="On the record"
            heading="Rated by the teams we serve"
            headingId="logos-figures"
          >
            <Layout columns={{ lg: [1, 3] }} colGap="section" rowGap="stack" align="center">
              <Proof figures={figures} />
              <Strip justify="start" />
            </Layout>
          </ContentSection>
        </>
      ) : null}

      {/* ── 06 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="06 · Strip with a CtaRow">
        The strip as a body, then the band&apos;s foot: a hairline and one blue link a stack
        under it (§ 1.2: body → CtaRow). Split-head, so the band reads as one horizontal row
        before the marks, and the alignment alternates with the band above.
      </Label>
      <ContentSection
        arrangement="split-head"
        eyebrow="Clients"
        heading="Work that shipped"
        headingId="logos-cta"
        lead="A selection of the products we have designed with their teams. The case studies show the decisions."
        footer={<CtaRow actions={[SEE_WORK]} />}
      >
        <Strip justify="start" />
      </ContentSection>

      {/* ── 07 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="07 · Every band at 390">
        Each band above is its own 390 proof: the strip wraps two marks to a row, centred or
        start-aligned with its head; the grid takes two equal cells, and LatitudePay, the one
        mark wider than its cell, shrinks to it rather than spilling. Captured by the kit shots
        at 390.
      </Label>
      <Section>
        <Layout columns={{ base: 1, lg: [1, 1] }} colGap="column" rowGap="stack">
          <Specimen
            title="The strip in the 326 column"
            note="Cluster, two to a row; no mark shrinks to stay on a line."
          >
            <div className={s.trackMobile}>
              <Strip justify="start" />
            </div>
          </Specimen>
          <Specimen
            title="The grid in the 326 column"
            note="Layout, two equal cells; the first column lines up with the head."
          >
            <div className={s.trackMobile}>
              <Grid columns={{ base: 2 }} />
            </div>
          </Specimen>
        </Layout>
      </Section>
    </>
  );
}
