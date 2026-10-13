import { Layout, Section, Sketch, type SectionSurface, type SketchName } from '@/components';

import { Specimen } from '../_specimen/Specimen';

const NAMES: readonly SketchName[] = [
  'new-product',
  'product-design',
  'product-modernisation',
  'design-systems',
  'ai-product-ux',
  'design-engineering',
  'software-development',
];
const SURFACES: readonly SectionSurface[] = ['paper', 'tint', 'ink'];

export default function SketchSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Sketch</h1>
          <p>
            A small drawing on its 16:9 plate, a stand-in where a block needs a visual subject and
            no illustration exists: one scene per service (home and About selectors), in the plate language of EngagementOptions
            and TracePlates. Decorative. The selector&rsquo;s answer on the ideal About leads with it.
          </p>
        </Layout>
      </Section>
      {SURFACES.map((surface) => (
        <Section key={surface} surface={surface}>
          <Specimen title={`S.1 · the seven scenes · ${surface}`}>
            <Layout columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="gutter">
              {NAMES.map((name) => (
                <Layout key={name} rowGap="tight">
                  <Sketch name={name} />
                  <code>{name}</code>
                </Layout>
              ))}
            </Layout>
          </Specimen>
        </Section>
      ))}
    </>
  );
}
