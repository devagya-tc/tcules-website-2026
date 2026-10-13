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
/** The article scenes: each drawn for one insight, its cover until a real one exists. */
const ARTICLE: readonly SketchName[] = ['code-review', 'security-checklist', 'prototype-to-production'];
const SURFACES: readonly SectionSurface[] = ['paper', 'tint', 'ink'];

export default function SketchSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Sketch</h1>
          <p>
            A small drawing on its 16:9 plate, a stand-in where a block needs a visual subject
            and no illustration exists: one scene per service (home and About selectors), in the
            plate language of EngagementOptions and TracePlates. Decorative. The
            selector&rsquo;s answer on the ideal About leads with it.
          </p>
        </Layout>
      </Section>
      {SURFACES.map((surface) => (
        <Section key={surface} surface={surface}>
          <Specimen title={`S.1 · the seven service scenes · ${surface}`}>
            <Layout columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="gutter">
              {NAMES.map((name) => (
                <Layout key={name} rowGap="tight">
                  <Sketch name={name} />
                  <code>{name}</code>
                </Layout>
              ))}
            </Layout>
          </Specimen>
          <Specimen
            title={`S.2 · the article scenes · ${surface}`}
            note="Owner, 13 Oct 2026: each drawn for ONE insight from its own argument, its cover until a real one exists, and assigned to it by name in data. Never a service scene as a cover. Each faces left, toward the copy it sits beside."
          >
            <Layout columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="gutter">
              {ARTICLE.map((name) => (
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
