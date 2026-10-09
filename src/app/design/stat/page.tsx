import { Icon, Layout, Section, Stat, type SectionSurface } from '@/components';

import { ROUTES } from '@/lib/routes';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * Stat — one figure, its unit and what it counts (docs/specs/Stat.md). Every arrangement: the two
 * sizes, with and without a unit, a set of three and four, the stress shapes, and all four
 * surfaces, the tally (dot, bar, glyph, fractional) and the xl size with a source. The family pages
 * (/design/kit/process, /design/kit/facts) show it inside its bands.
 * Every numeral here is illustrative.
 */

const LABEL = 'From the first question to a tested, reviewable prototype.';
/* The 12-word ceiling (§ 1.5), which runs to two lines at 286. */
const LABEL_CEILING =
  'Of the engagements we started this year, the share extended past the first phase.';

const SET = [
  { value: '38', unit: 'products', label: 'Shipped with product teams in fintech, health and logistics.', tally: { marks: 38, columns: 8 } },
  { value: '6–8', unit: 'weeks', label: LABEL },
  { value: '92%', label: 'Of engagements extended past their first agreed phase.' },
  { value: '1', unit: 'record', label: 'Every decision, kept where both teams read it.', tally: { marks: 1 } },
] as const;

/* Paper, tint and ink. Blue is never a ground (owner, 6 Oct 2026): its tokens are declared, so a
   nested blue band could not inherit a wrong ink, but the site has no blue surface to show. */
const SURFACES: SectionSurface[] = ['paper', 'tint', 'ink'];

export default function StatSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Stat</h1>
          <p>
            One figure, its unit, and the line that says what it counts, opening on a hairline with a
            short blue mark at its start. One form at every width: the figure line, then the label. The numeral is blue at every size, the foreground accent
            numerals carry (§ 4.1); its unit and label stay in the quiet ink. Seen in its bands on{' '}
            <a href={ROUTES.designKitProcess}>the process and stats family page</a>.
          </p>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Specimen title="size · lg, a band's large thing" note="--text-stat-lg (54): the S row and the D aside. lg and md never share a row — 54 against 40 is too close a step to read as a hierarchy side by side.">
            <Layout columns={{ md: 2, lg: 4 }} colGap="gutter" rowGap="stack">
              <Stat value="6–8" unit="weeks" label={LABEL} />
            </Layout>
          </Specimen>

          <Specimen title="size · md, beside other content" note="--text-stat (40), for a stat that sits beside a paragraph or a card rather than carrying the band.">
            <Layout columns={{ md: [2, 1], lg: [2, 1, 1] }} colGap="gutter" rowGap="stack" align="start">
              <p>
                The first engagement is fixed: four weeks, one decision, and a prototype your team can
                put in front of users.
              </p>
              <Stat size="md" value="4" unit="weeks" label="A fixed first engagement." />
            </Layout>
          </Specimen>

          <Specimen title="align · center" note="For a row under a centred head (S): figure, label and the blue mark centre on the track, so the band has one axis — at every width, so an S band at 390 stays centred.">
            <Layout as="ul" columns={{ md: 3 }} colGap="gutter" rowGap="stack">
              <Stat as="li" align="center" value="40%" label="Fewer support tickets in the first quarter." />
              <Stat as="li" align="center" value="3×" label="Faster from approved design to reviewed code." />
              <Stat as="li" align="center" value="11" unit="days" label="Median time to the first visible change." />
            </Layout>
          </Specimen>

          <Specimen title="unit · a word, or part of the value" note="A word that counts the figure is the unit, mono on the figure's baseline, a tight (8) after it. A symbol that belongs to the number is part of the value string.">
            <Layout columns={{ md: 3 }} colGap="gutter" rowGap="stack">
              <Stat value="12" unit="AI products" label="Copilots, AI-native tools and integrations." />
              <Stat value="40%" label="Fewer support tickets in the first quarter." />
              <Stat value="3×" label="Faster from approved design to reviewed code." />
            </Layout>
          </Specimen>

          <Specimen title="a set of four · as=li in a Layout ul" note="The S row at 286. The gutter breaks the hairline, so four objects rather than one table row.">
            <Layout as="ul" columns={{ md: 2, lg: 4 }} colGap="gutter" rowGap="column">
              {SET.map((stat) => (
                <Stat key={stat.label} as="li" {...stat} />
              ))}
            </Layout>
          </Specimen>

          <Specimen title="stress · the label ceiling and a wide value" note="A 12-word label (the § 1.5 ceiling) wraps to two lines at 286; a seven-character value with its unit wraps the unit under the figure rather than overflowing the track. One size per row.">
            <Layout rowGap="column">
              <Layout as="ul" columns={{ md: 2, lg: 4 }} colGap="gutter" rowGap="column">
                <Stat as="li" value="92%" label={LABEL_CEILING} />
                <Stat as="li" value="1,240+" unit="releases" label="Shipped to production through the same review." />
              </Layout>
              <Layout as="ul" columns={{ md: 2, lg: 4 }} colGap="gutter" rowGap="column">
                <Stat as="li" size="md" value="92%" label={LABEL_CEILING} />
                <Stat as="li" size="md" value="1,240+" unit="releases" label="Shipped through the same review." />
              </Layout>
            </Layout>
          </Specimen>

          <Specimen title="tally · the figure drawn as its count" note="dot (64 as 8 × 8, 18 as 6 × 3) and bar (11 ticks). Every field at lg and md is one height with its marks on the floor, so figures under different shapes share a line. Decorative: the value is the claim.">
            <Layout as="ul" columns={{ md: 3 }} colGap="gutter" rowGap="column">
              <Stat as="li" value="11" unit="years" label="A run of ticks: a count of time." tally={{ marks: 11, form: 'bar' }} />
              <Stat as="li" value="64" unit="products" label="A square field: a count of things." tally={{ marks: 64, columns: 8 }} />
              <Stat as="li" value="18" unit="people" label="A low block on the same floor." tally={{ marks: 18, columns: 6 }} />
            </Layout>
          </Specimen>

          <Specimen title="tally · glyph and a fractional fill, md and centred" note="A caller's glyph for each mark; `filled` may be fractional, and the partial mark is clipped to its share. Centred, the field centres with the figure. Glyph rows floor like the rest. In mono a decimal opens into three cells (4 . 8), which is why a band's rating takes xl.">
            <Layout as="ul" columns={{ md: 3 }} colGap="gutter" rowGap="column">
              <Stat as="li" size="md" value="4.8" unit="out of 5" label="Five stars, the fifth four-fifths full." tally={{ marks: 5, filled: 4.8, glyph: <Icon name="star" /> }} />
              <Stat as="li" size="md" value="3" unit="of 5" label="Dots with three filled: a share of a scale." tally={{ marks: 5, filled: 3 }} />
              <Stat as="li" size="md" align="center" value="18" unit="people" label="Centred under a centred head." tally={{ marks: 18, columns: 6 }} />
            </Layout>
          </Specimen>

          <Specimen title="size · xl, one figure that is the band, with a source" note="--text-score (105, serif): the rating as a facts band's hero. Never for a set. `source` takes the caller's node, set after the label — in practice a RatingBadge with showScore off (see /design/kit/facts).">
            <Stat size="xl" value="4.8" unit="out of 5" label="Average of verified client reviews." tally={{ marks: 5, filled: 4.8, glyph: <Icon name="star" /> }} source={<a href={ROUTES.designKitFacts}>Where it is read from</a>} />
          </Specimen>
        </Layout>
      </Section>

      {SURFACES.map((surface) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="block">
            <p className={s.specTitle}>surface · {surface}</p>
            <Layout as="ul" columns={{ md: 2, lg: 4 }} colGap="gutter" rowGap="column">
              {SET.map((stat) => (
                <Stat key={stat.label} as="li" {...stat} />
              ))}
            </Layout>
          </Layout>
        </Section>
      ))}
    </>
  );
}
