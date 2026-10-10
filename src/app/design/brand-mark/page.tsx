import { BrandMark, Cluster, Layout, Section, type SectionSurface } from '@/components';

import { Specimen } from '../_specimen/Specimen';

const SURFACES: readonly SectionSurface[] = ['paper', 'tint', 'ink', 'blue'];

export default function BrandMarkSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>BrandMark</h1>
          <p>
            The three third-party marks — LinkedIn, YouTube, Clutch — at their owners&rsquo;
            published proportions, monochrome on the ink they sit in. Always decorative: the
            platform&rsquo;s name beside it is the accessible name. LinkedIn&rsquo;s letters are
            cut out of its tile in the surface&rsquo;s own ground, so one asset inverts on every
            surface.
          </p>
        </Layout>
      </Section>
      {SURFACES.map((surface, index) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="stack">
            {index === 0 ? <h2>1 · Four surfaces</h2> : null}
            <Specimen title={surface}>
              <Cluster colGap="block">
                <BrandMark name="linkedin" />
                <BrandMark name="youtube" />
                <BrandMark name="clutch" />
              </Cluster>
            </Specimen>
          </Layout>
        </Section>
      ))}
    </>
  );
}
