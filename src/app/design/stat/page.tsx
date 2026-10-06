import { Layout, Section, Stat, type SectionSurface } from '@/components';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * Stat — one figure, its unit and what it counts (docs/specs/Stat.md). Every arrangement: the two
 * sizes, with and without a unit, a set of three and four, the stress shapes, and all four
 * surfaces. The family page (/design/kit/process) shows it inside its bands: S and the D aside.
 * Every numeral here is illustrative.
 */

const LABEL = 'From the first question to a tested, reviewable prototype.';
/* The 12-word ceiling (§ 1.5), which runs to two lines at 286. */
const LABEL_CEILING =
  'Of the engagements we started this year, the share extended past the first phase.';

const SET = [
  { value: '38', unit: 'products', label: 'Shipped with product teams in fintech, health and logistics.' },
  { value: '6–8', unit: 'weeks', label: LABEL },
  { value: '92%', label: 'Of engagements extended past their first agreed phase.' },
  { value: '1', unit: 'record', label: 'Every decision, kept where both teams read it.' },
] as const;

const SURFACES: SectionSurface[] = ['paper', 'tint', 'ink', 'blue'];

export default function StatSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Stat</h1>
          <p>
            One figure, its unit, and the line that says what it counts, opening on a hairline with a
            short blue mark at its start. The numeral is ink at every size: it is the band&rsquo;s
            large thing, and blue at 54px would be a mass, not an accent. Seen in its bands on{' '}
            <a href="/design/kit/process">the process and stats family page</a>.
          </p>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Specimen title="size · lg and md" note="lg is --text-stat-lg (54): the S row and the D aside. md is --text-stat (40), for a stat beside other content. Rule, mark, unit and label are the same at both.">
            <Layout columns={{ md: 2 }} colGap="column" rowGap="stack">
              <Stat value="6–8" unit="weeks" label={LABEL} />
              <Stat size="md" value="6–8" unit="weeks" label={LABEL} />
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

          <Specimen title="stress · the label ceiling and a wide value" note="A 12-word label (the § 1.5 ceiling) wraps to two lines at 286; a seven-character value with its unit wraps the unit under the figure rather than overflowing the track.">
            <Layout as="ul" columns={{ md: 2, lg: 4 }} colGap="gutter" rowGap="column">
              <Stat as="li" value="92%" label={LABEL_CEILING} />
              <Stat as="li" value="1,240+" unit="releases" label="Shipped to production through the same review." />
              <Stat as="li" size="md" value="92%" label={LABEL_CEILING} />
              <Stat as="li" size="md" value="1,240+" unit="releases" label="Shipped through the same review." />
            </Layout>
          </Specimen>
        </Layout>
      </Section>

      {SURFACES.map((surface) => (
        <Section key={surface} surface={surface} density="tight">
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
