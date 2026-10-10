import {
  BrandMark,
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
import t from '../../_specimen/typeroles.module.css';

/**
 * Kit · Facts and figures — the family specimen (review 7 Oct, r7-facts; owner round 9 Oct).
 *
 * NEVER COMBINE PROOF TYPES (owner, 9 Oct 2026; visual-direction § 5.8). Client logos,
 * testimonials, the aggregate rating and the studio's record (years, projects, team) are each their
 * own kind of proof, so each gets its own band: the rating never sits beside the logo grid or the
 * record, and a facts band need not show every figure every time. Figures are plain Stats — the
 * tally graphics were removed (owner: "way too overboard").
 *
 * Three bands, each live so `npm run fold:check` measures it (≤ 830 at 1470):
 *   01  rating-led — the head beside the score at the score role, the pill under it as its source;
 *   02  the record, three figures, a stacked head over one row; on tint as the surface proof;
 *   03  the record, two figures, beside its head — a band need not carry every figure.
 *
 * Figures: the rating is real, read through the seam (fixtures/ratings.ts via getNavigation). The
 * years, products and team are the owner-approved placeholders (8 Oct) — the 64 and 18 the home and
 * about showcases already carry — and must be the studio's real numbers before a page ships them.
 */

type Fact = Pick<StatProps, 'value' | 'unit' | 'label'>;

const YEARS: Fact = {
  value: '11',
  unit: 'years',
  label: 'Designing and shipping software with product teams.',
};
const PRODUCTS: Fact = {
  value: '64',
  unit: 'products',
  label: 'Designed and shipped with teams in fintech, health and logistics.',
};
const PEOPLE: Fact = {
  value: '18',
  unit: 'people',
  label: 'Designers, researchers and design engineers, in one studio.',
};

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

function Record({ facts, columns }: { facts: readonly Fact[]; columns: number }) {
  return (
    <Layout as="ul" columns={{ md: columns }} colGap="gutter" rowGap="stack">
      {facts.map((fact) => (
        <Stat key={fact.unit} as="li" {...fact} />
      ))}
    </Layout>
  );
}

export default async function KitFactsPage() {
  const { footer } = await getNavigation();
  const rating = footer.brand.rating;

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
                The rating and the studio&rsquo;s record, each in a band of its own, set as
                plain figures.
              </p>
            </Layout>
            <Layout as="ol" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
              <ListCard
                form="tile"
                marker={{ type: 'number', value: 1, tone: 'neutral' }}
                title="Never combine proof types"
                body="Logos, testimonials, the rating and the record each get their own section."
              />
              <ListCard
                form="tile"
                marker={{ type: 'number', value: 2, tone: 'neutral' }}
                title="Not every figure, every time"
                body="A facts band carries the figures its page needs, two or three, never the full set by habit."
              />
            </Layout>
          </Layout>
        </Layout>
      </Section>

      {/* ── 01 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="01 · Rating-led">
        The rating on its own: the score printed once at the score role, the pill under it as
        its source. No line between them, and no other proof in the band.
      </Label>
      {rating ? (
        <ContentSection
          data-band="facts"
          arrangement="beside"
          eyebrow="Client rating"
          heading="Rated by the teams we ship with"
          headingId="facts-rating"
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

      {/* ── 02 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="02 · The record, three figures, on tint">
        Years, products and people as plain stats under a stacked head; every stat opens on the
        same hairline. On tint as the surface proof.
      </Label>
      <ContentSection
        data-band="facts"
        surface="tint"
        eyebrow="The studio"
        heading="A small studio with a long record"
        headingId="facts-record"
        headingSize="md"
      >
        <Record facts={[YEARS, PRODUCTS, PEOPLE]} columns={3} />
      </ContentSection>

      {/* ── 03 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="03 · The record, two figures, beside">
        A band need not carry every figure: two, beside the head, where the page&rsquo;s
        argument only needs the years and the products.
      </Label>
      <ContentSection
        data-band="facts"
        arrangement="beside"
        eyebrow="The studio"
        heading="Eleven years of shipped work"
        headingId="facts-record-two"
        headingSize="md"
      >
        <Record facts={[YEARS, PRODUCTS]} columns={2} />
      </ContentSection>
    </>
  );
}
