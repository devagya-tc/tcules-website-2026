import {
  BrandMark,
  ClientMark,
  Icon,
  Layout,
  RatingBadge,
  Section,
  Stat,
  Texture,
  TextureShape,
  type StatProps,
} from '@/components';
import { getNavigation } from '@/content';
import { ContentSection, ListCard } from '@/patterns';

import { Specimen, specimenStyles as s } from '../../_specimen/Specimen';
import { CLIENTS } from '../../_specimen/clients';
import t from '../../_specimen/typeroles.module.css';

/**
 * Kit · Facts and figures — the family specimen (review 7 Oct, r7-facts).
 *
 * About four facts in one band: the aggregate rating, years, projects and team. No testimonial in
 * it (a rating never sits beside a quote). Composed from Stat and RatingBadge; the one addition is
 * Stat's `tally`, which draws each figure as its count, so the band is never a plain row of
 * numbers: 64 products are 64 squares, 18 people a block of 18, 11 years a run of ticks, and the
 * rating five stars with the fifth four-fifths full.
 *
 * Two arrangements, each a live band so `npm run fold:check` measures it (≤ 830 at 1470):
 *   01  the scoreboard — the rating at the score role beside three tallied stats; on paper, and on
 *       tint as the surface proof;
 *   02  with the client list — the rating as the band's hero beside the logo grid, the studio's
 *       three facts under the marks: "ratings go with the client list" (review 7 Oct,
 *       r7-testimonials).
 *
 * Figures: the rating is real, read through the seam (fixtures/ratings.ts via getNavigation). The
 * years, products and team are the owner-approved placeholders (8 Oct) — the 64 and 18 the home and
 * about showcases already carry — standing in for the studio's own figures, which is why they may
 * share a band with the real marks in 02. They must be the studio's real numbers before it ships
 * (§ 5.8: no illustrative numeral beside a real mark).
 */

type Fact = Pick<StatProps, 'value' | 'unit' | 'label' | 'tally'>;

/** The studio's three facts, each drawn as its count, each field a different shape. */
const STUDIO: readonly Fact[] = [
  {
    value: '11',
    unit: 'years',
    label: 'Designing and shipping software with product teams.',
    tally: { marks: 11, form: 'bar' },
  },
  {
    value: '64',
    unit: 'products',
    label: 'Designed and shipped with teams in fintech, health and logistics.',
    tally: { marks: 64, columns: 8 },
  },
  {
    value: '18',
    unit: 'people',
    label: 'Designers, researchers and design engineers, in one studio.',
    tally: { marks: 18, columns: 6 },
  },
];

/** All nine real marks, in the clients file's order: the grid 02 sets beside the rating. */
const GRID = CLIENTS;

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

function StudioFacts({ size = 'lg' }: { size?: StatProps['size'] }) {
  return (
    <Layout as="ul" columns={{ md: 3 }} colGap="gutter" rowGap="stack">
      {STUDIO.map((fact) => (
        <Stat key={fact.unit} as="li" size={size} {...fact} />
      ))}
    </Layout>
  );
}

export default async function KitFactsPage() {
  const { footer } = await getNavigation();
  const rating = footer.brand.rating;

  /* The rating as a fact: the score printed once, its scale as the unit, five stars as its tally,
     and the pill under the label carrying the source (showScore off — the number is already
     there, large). Rendered only when the seam holds a sourced score. */
  const ratingFact = (size: StatProps['size']) =>
    rating ? (
      <Stat
        size={size}
        value={rating.score}
        unit="out of 5"
        label={`Average of verified client reviews on ${rating.platform}.`}
        tally={{ marks: 5, filled: Number(rating.score), glyph: <Icon name="star" /> }}
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
    ) : null;

  const scoreboard = (
    <Layout columns={{ xl: [5, 7] }} colGap="column" rowGap="stack">
      {ratingFact('xl')}
      <StudioFacts />
    </Layout>
  );

  return (
    <>
      {/* ── Intro ───────────────────────────────────────────────────────────────────────── */}
      <Section>
        {/* hero-field (§ 6.3), in the empty end half of a head with no media, as on the logos
            family page: the ellipse clears the copy track at 1470 and starts past the column
            at 390, so only its feather reaches content. */}
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
              <p className={s.eyebrow}>UI kit · Facts and figures</p>
              <h1>Facts and figures</h1>
              <p className={t.lead}>
                Four facts about the studio, each drawn as its count: the rating as five stars, the
                years as ticks, the products and the people as fields of squares.
              </p>
            </Layout>
            <Layout as="ol" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
              <ListCard
                form="tile"
                marker={{ type: 'number', value: 1, tone: 'neutral' }}
                title="The shape is the number"
                body="Every mark is one unit of what the figure counts, never an ornament beside it."
              />
              <ListCard
                form="tile"
                marker={{ type: 'number', value: 2, tone: 'neutral' }}
                title="The rating keeps its source"
                body="Printed once, large, with the pill under it linking to the profile it was read from."
              />
            </Layout>
          </Layout>
        </Layout>
      </Section>

      {/* ── 01 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="01 · The scoreboard">
        The rating at the score role beside three tallied stats; every stat opens on the same
        hairline, and the fields of 11, 64 and 18 end on one floor so the figures share a line.
      </Label>
      <ContentSection
        data-band="facts"
        eyebrow="Facts and figures"
        heading="A small studio with a long record"
        headingId="facts-scoreboard"
        headingSize="md"
      >
        {scoreboard}
      </ContentSection>

      <Label title="01 · On tint">
        The surface proof: score, stars, ticks, squares and the pill each resolve on the deeper
        ground, the unfilled share of the fifth star included.
      </Label>
      <ContentSection
        data-band="facts"
        surface="tint"
        eyebrow="Facts and figures"
        heading="A small studio with a long record"
        headingId="facts-scoreboard-tint"
        headingSize="md"
      >
        {scoreboard}
      </ContentSection>

      {/* ── 02 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="02 · With the client list">
        The rating beside the logo grid, where a rating belongs, with the studio&rsquo;s three
        facts under the marks. The head is eyebrow-size context, so the marks and the score lead.
      </Label>
      <ContentSection data-band="facts" eyebrow="Teams we have shipped with">
        {/* The score is the band's hero in the leading track, at the score role: in mono at lg,
            "4.8" opened into three spaced cells beside the marks. The marks and the studio's
            facts stack in the two-thirds track, the facts at md so the marks keep the lead. */}
        <Layout columns={{ lg: [1, 2] }} colGap="column" rowGap="stack">
          {ratingFact('xl')}
          <Layout rowGap="stack">
            <Layout as="ul" columns={{ base: 2, md: 3 }} colGap="stack" rowGap="stack" align="center">
              {GRID.map((m) => (
                <li key={m.name}>
                  <ClientMark {...m} />
                </li>
              ))}
            </Layout>
            <StudioFacts size="md" />
          </Layout>
        </Layout>
      </ContentSection>
    </>
  );
}
