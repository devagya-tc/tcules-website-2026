import { Layout, Section, type SectionSurface } from '@/components';
import { Thread, type ThreadStage } from '@/patterns';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * Thread — stages one decision passes through, on one blue line (docs/specs/Thread.md). Every
 * arrangement: titles only and with bodies, two to twelve stages (one row up to six, two balanced
 * rows beyond), the return path, stress titles, and all four surfaces. Below 1024 every one turns
 * vertical. The family page (/design/kit/process) shows it in a full-column E band.
 */

const SIX: readonly ThreadStage[] = [
  { title: 'Open question', body: 'What the product must decide.' },
  { title: 'Coded probe', body: 'The cheapest version that could answer it.' },
  { title: 'Contract', body: 'States, rules and data the build owes.' },
  { title: 'Running behaviour', body: 'Shipped behind a measure.' },
  { title: 'Review finding', body: 'What production showed us.' },
  { title: 'Accepted decision', body: 'Recorded, and cited by the next.' },
];

/* software-development's delivery trace, verbatim from the fixture: nine stages, titles only. */
const NINE: readonly ThreadStage[] = [
  { title: 'Requirement' },
  { title: 'Decision owner' },
  { title: 'Design state' },
  { title: 'Technical contract' },
  { title: 'Implementation' },
  { title: 'Automated and manual acceptance' },
  { title: 'Deployment' },
  { title: 'Observation' },
  { title: 'Change' },
];

const FOUR: readonly ThreadStage[] = [
  { title: 'Product decision', body: 'And its consequence for the user.' },
  { title: 'Role and state model', body: 'What may happen, to whom, and when.' },
  { title: 'Data and API contract', body: 'What each part owes the others.' },
  { title: 'Acceptance and release', body: 'The evidence it works, and shipped.' },
];

const STRESS: readonly ThreadStage[] = [
  { title: 'Cross-functional acceptance and release-readiness review' },
  { title: 'Implementation' },
  { title: 'Observability instrumentation', body: 'Every event the review will need, named before the build.' },
];

const SURFACES: SectionSurface[] = ['paper', 'tint', 'ink', 'blue'];

export default function ThreadSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Thread</h1>
          <p>
            Named stages one decision passes through, strung on one blue line, with an arrowhead into
            every next node and the last node filled where the thread lands. Nothing is numbered and
            nothing is boxed: it is a chain of artefacts, not a method (Steps) and not stages with
            contents (ProcessFlow). Seen in its band on{' '}
            <a href="/design/kit/process#e-thread">the process and stats family page</a>.
          </p>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Specimen title="six stages, with bodies · one row" note="Five or six across, a track is 180 to 220 wide and the title steps to h6.">
            <Thread stages={SIX} />
          </Specimen>
          <Specimen title="four stages, with bodies, and a return path" note="Up to four across, h5 titles. The return path is drawn back beneath the stages from the far end into the first node's column, the sentence under it. Below 1024 it is the sentence beside a return glyph.">
            <Thread stages={FOUR} loop="What production shows returns to the next product decision." />
          </Specimen>
          <Specimen title="nine stages, titles only · two balanced rows" note="Seven to twelve stages break into two rows (9 → 5 + 4). The line at the end of the first row runs to its track's edge and points on.">
            <Thread stages={NINE} loop="Production observation returns to the next product decision." />
          </Specimen>
          <Specimen title="two stages · the minimum" note="Fewer than two renders nothing and warns.">
            <Thread stages={[{ title: 'Approved design' }, { title: 'Running software' }]} />
          </Specimen>
          <Specimen title="stress · long titles, a mixed set" note="A seven-word title wraps inside its track; a stage without a body sits beside one with a body, top edges level.">
            <Thread stages={STRESS} />
          </Specimen>
        </Layout>
      </Section>

      {SURFACES.map((surface) => (
        <Section key={surface} surface={surface} density="tight">
          <Layout rowGap="block">
            <p className={s.specTitle}>surface · {surface}</p>
            <Thread stages={FOUR} loop="What production shows returns to the next decision." />
          </Layout>
        </Section>
      ))}
    </>
  );
}
