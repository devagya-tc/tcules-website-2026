import {
  BrandMark,
  Cluster,
  Icon,
  Layout,
  RatingBadge,
  Section,
  type SectionSurface,
} from '@/components';
import { EXTERNAL } from '@/lib/routes';

import { Specimen } from '../_specimen/Specimen';

const SURFACES: readonly SectionSurface[] = ['paper', 'tint', 'ink', 'blue'];

/* The specimen's own figure, not the live one: the live score lives behind the content seam
   (fixtures/ratings.ts) and a specimen route does not import content. */
const SCORE = '4.8';

export default function RatingBadgeSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>RatingBadge</h1>
          <p>
            A third-party score and the profile it comes from, as one outline pill that links to
            the source and opens in a new tab. An outline, not a fill: it is a claim with a
            source, and a filled chip beside a solid button would read as a second action. The
            platform mark is composed by the caller and passed in.
          </p>
        </Layout>
      </Section>
      {SURFACES.map((surface, index) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="stack">
            {index === 0 ? <h2>1 · Four surfaces · identical markup</h2> : null}
            <Specimen
              title={surface}
              note="with the Clutch mark, without a mark, showScore={false} (the score set large beside it; the name still carries it), and frame plain (no outline: the hero eyebrow, r7-hero)"
            >
              <Cluster colGap="block" rowGap="block">
                <RatingBadge
                  score={SCORE}
                  platform="Clutch"
                  href={EXTERNAL.clutch}
                  icon={<Icon name="star" size="sm" />}
                  mark={<BrandMark name="clutch" />}
                />
                <RatingBadge score="5.0" platform="Clutch" href={EXTERNAL.clutch} />
                <RatingBadge
                  score={SCORE}
                  platform="Clutch"
                  href={EXTERNAL.clutch}
                  icon={<Icon name="star" size="sm" />}
                  mark={<BrandMark name="clutch" />}
                  showScore={false}
                />
                <RatingBadge
                  score={SCORE}
                  platform="Clutch"
                  href={EXTERNAL.clutch}
                  icon={<Icon name="star" size="sm" />}
                  mark={<BrandMark name="clutch" />}
                  frame="plain"
                />
              </Cluster>
            </Specimen>
          </Layout>
        </Section>
      ))}
      <Section>
        <Layout rowGap="block">
          <h2>2 · What this page cannot force</h2>
          <p>
            Hover and keyboard focus move the ink and the rule together; the star holds. Tab to
            the badge to see the ring. Its accessible name is the score, the platform and
            &ldquo;(opens in a new tab)&rdquo;; with <code>showScore=&#123;false&#125;</code> it is
            &ldquo;Rated on Clutch, 4.8 (opens in a new tab)&rdquo; — the visible words first.
          </p>
        </Layout>
      </Section>
    </>
  );
}
