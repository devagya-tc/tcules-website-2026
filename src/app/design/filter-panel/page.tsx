import type { Metadata } from 'next';

import { Cluster, Section } from '@/components';
import { FilterPanel, type FilterPanelGroup } from '@/patterns';

import { Specimen } from '../_specimen/Specimen';

export const metadata: Metadata = {
  title: 'FilterPanel | Design',
  robots: { index: false, follow: false },
};

const PATH = '/design/filter-panel';

const GROUPS: readonly FilterPanelGroup[] = [
  {
    name: 'topic',
    label: 'Topic',
    options: [
      { value: 'design-system', label: 'Design system', checked: true },
      { value: 'high-fidelity-prototypes', label: 'High fidelity prototypes' },
      { value: 'modernise-replatform', label: 'Modernise & Replatform' },
      { value: 'information-design', label: 'Information design' },
    ],
  },
  {
    name: 'product',
    label: 'Product',
    options: [
      { value: '0-to-1', label: '0 to 1' },
      { value: 'growth-stage', label: 'Growth stage' },
    ],
  },
  {
    name: 'industry',
    label: 'Industry',
    options: [
      { value: 'fintech', label: 'FinTech' },
      { value: 'healthtech', label: 'HealthTech' },
    ],
  },
];

/**
 * FilterPanel — a listing's filters in a side panel (23 Oct 2026). Every arrangement: one filter in
 * effect (the trigger counts it, its group opens), none in effect, a single group (open), and each
 * surface the panel reads its ground from.
 */
export default function FilterPanelSpecimen() {
  const surfaces = ['paper', 'tint', 'ink', 'blue'] as const;
  return (
    <>
      <Section aria-label="In effect">
        <Specimen
          title="one in effect — the trigger counts it; its group opens"
          note="Open the panel: a popover down the screen's end edge, no script. Apply posts by GET; Reset is a link."
        >
          <Cluster justify="end">
            <FilterPanel id="fp-effect" action={PATH} groups={GROUPS} resetHref={PATH} />
          </Cluster>
        </Specimen>
      </Section>
      <Section aria-label="None">
        <Specimen title="none in effect, one group — the group opens">
          <Cluster justify="end">
            <FilterPanel
              id="fp-one"
              action={PATH}
              params={[['q', 'audit']]}
              groups={[{ ...GROUPS[1]! }]}
              resetHref={`${PATH}?q=audit`}
            />
          </Cluster>
        </Specimen>
      </Section>
      {surfaces.slice(1).map((surface) => (
        <Section key={surface} surface={surface} aria-label={`On ${surface}`}>
          <Specimen title={`on ${surface}`}>
            <Cluster justify="end">
              <FilterPanel
                id={`fp-${surface}`}
                action={PATH}
                groups={GROUPS}
                resetHref={PATH}
              />
            </Cluster>
          </Specimen>
        </Section>
      ))}
    </>
  );
}
