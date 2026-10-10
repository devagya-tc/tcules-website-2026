import { Layout, Section, type SectionSurface } from '@/components';
import { ProcessFlow, type ProcessFlowLane, type ProcessFlowStage } from '@/patterns';

import { Specimen } from '../_specimen/Specimen';

const ASSESS: ProcessFlowStage = {
  label: 'Assess',
  items: ['System assessment', 'Investment scope', 'Product semantics'],
};
const OPERATE: ProcessFlowStage = {
  label: 'Operate',
  items: ['Contribution', 'Release and migration', 'Adoption', 'Implementation QA'],
};

const STAGES: readonly ProcessFlowStage[] = [
  { label: 'Assess', items: ['System assessment', 'Investment scope', 'Product semantics'] },
  {
    label: 'Build',
    items: [
      'Foundations and components',
      'Figma architecture',
      'Coded components',
      'Storybook and documentation',
    ],
  },
  {
    label: 'Operate',
    items: ['Contribution', 'Release and migration', 'Adoption', 'Implementation QA'],
  },
];

const LANE: ProcessFlowLane = {
  label: 'Product teams keep, throughout',
  items: [
    'Product-specific composition',
    'User evidence',
    'Accessibility of what they release',
    'Decision and release authority',
  ],
};

const FIVE: readonly ProcessFlowStage[] = [
  { label: 'Frame', items: ['The decision', 'Who owns it'] },
  { label: 'Model', items: ['Objects and states'] },
  { label: 'Design', items: ['Behaviour', 'Recovery', 'Content'] },
  { label: 'Build', items: ['Components', 'Services'] },
  { label: 'Release', items: ['Acceptance', 'Monitoring'] },
];

const SURFACES: readonly SectionSurface[] = ['paper', 'tint', 'ink', 'blue'];

export default function ProcessFlowSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>ProcessFlow</h1>
          <p>
            Work that moves through stages, each stage holding its own items, with an arrow at
            the end of each stage&rsquo;s head pointing at the next. Not steps: a step list is
            one action per row, read down; a process is a few stages side by side, read across.
            An optional lane holds what another party keeps for the whole flow, drawn beneath
            every stage rather than as one more of them.
          </p>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <h2>1 · Three stages and a lane</h2>
          <Specimen title="actor · 3 stages · throughout" note="Design Systems, who owns what">
            <ProcessFlow actor="Tcules" stages={STAGES} throughout={LANE} />
          </Specimen>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <h2>2 · Stage counts</h2>
          <Specimen title="2 stages" note="the minimum: somewhere to go">
            <ProcessFlow stages={STAGES.slice(0, 2)} />
          </Specimen>
          <Specimen title="5 stages" note="the designed maximum; uneven item counts">
            <ProcessFlow stages={FIVE} />
          </Specimen>
        </Layout>
      </Section>

      {SURFACES.map((surface, index) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="stack">
            {index === 0 ? <h2>3 · Four surfaces · identical markup</h2> : null}
            <Specimen title={surface}>
              <ProcessFlow actor="Tcules" stages={STAGES} throughout={LANE} />
            </Specimen>
          </Layout>
        </Section>
      ))}

      <Section>
        <Layout rowGap="block">
          <h2>4 · Edge cases</h2>
          <p>
            A stage with a blank label or no items is omitted with a warning; fewer than two
            valid stages renders nothing; a lane with no items is omitted. Below 1024 the stages
            stack and each arrow turns to point down — resize to see it.
          </p>
          <Specimen title="one stage blank" note="omitted; the other two still flow">
            <ProcessFlow stages={[ASSESS, { label: ' ', items: ['x'] }, OPERATE]} />
          </Specimen>
        </Layout>
      </Section>
    </>
  );
}
