import { Cluster, Icon, Layout, Section, StarRating, type SectionSurface } from '@/components';

import { Specimen } from '../_specimen/Specimen';

const SURFACES: readonly SectionSurface[] = ['paper', 'tint', 'ink', 'blue'];
const VALUES = [5, 4.5, 4, 3.5, 0] as const;

export default function StarRatingSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>StarRating</h1>
          <p>
            One review&rsquo;s score as five stars: filled, half or empty. A mark, like
            Stat&rsquo;s numeral; the star glyph is composed by the caller and passed in. The
            value is the accessible name (&ldquo;Rated 4.5 out of 5&rdquo;), so the glyphs are
            decorative. It is never an aggregate platform score: that is RatingBadge, with its
            source.
          </p>
        </Layout>
      </Section>
      {SURFACES.map((surface, index) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="stack">
            {index === 0 ? <h2>1 · Four surfaces · md and sm</h2> : null}
            <Specimen
              title={surface}
              note="5, 4.5, 4, 3.5 and 0 at md (18), then at sm (14), then md onCard. A half fills from the inline start. onCard takes the colours of a card with its own ground; they differ only on blue, whose cards are paper, so the third row reads blue on blue here by design (in place: /design/testimonial, Four surfaces)."
            >
              <Layout rowGap="block">
                <Cluster colGap="stack" rowGap="block">
                  {VALUES.map((value) => (
                    <StarRating key={value} value={value} glyph={<Icon name="star" />} />
                  ))}
                </Cluster>
                <Cluster colGap="stack" rowGap="block">
                  {VALUES.map((value) => (
                    <StarRating
                      key={value}
                      value={value}
                      size="sm"
                      glyph={<Icon name="star" />}
                    />
                  ))}
                </Cluster>
                <Cluster colGap="stack" rowGap="block">
                  {VALUES.map((value) => (
                    <StarRating key={value} value={value} onCard glyph={<Icon name="star" />} />
                  ))}
                </Cluster>
              </Layout>
            </Specimen>
          </Layout>
        </Section>
      ))}
      <Section>
        <Layout rowGap="block">
          <h2>2 · Out-of-range values</h2>
          <Specimen
            title="4.74 and 7"
            note="Rounded to the nearest half and clamped to 0–5, with a development warning: 4.5 and 5."
          >
            <Cluster colGap="stack">
              <StarRating value={4.74} glyph={<Icon name="star" />} />
              <StarRating value={7} glyph={<Icon name="star" />} />
            </Cluster>
          </Specimen>
        </Layout>
      </Section>
    </>
  );
}
