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
const ARTICLE: readonly SketchName[] = [
  'code-review',
  'security-checklist',
  'prototype-to-production',
];
const SURFACES: readonly SectionSurface[] = ['paper', 'tint', 'ink'];
/** The scenes with a STORY drawing: the six the home bento shows. */
const STORY: readonly SketchName[] = NAMES.filter((name) => name !== 'new-product');

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
          <Specimen
            title={`S.3 · the story drawings, rest and solved · ${surface}`}
            note="Owner, 25 Oct 2026: the bento's service drawings, redrawn to the flat-graphics grammar, the problem at rest and solved when the link they sit in is hovered or focused, in one move on the owner's hover curve. Left: at rest (hover it). Right: held solved. Bare frame, light weight, as the bento sets them."
          >
            <Layout columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="gutter">
              {STORY.map((name) => (
                <Layout key={name} rowGap="tight">
                  <Layout columns={2} colGap="gutter" rowGap="tight">
                    <a
                      href={`#story-${name}`}
                      id={`story-${name}`}
                      aria-label={`Hover: ${name}`}
                    >
                      <Sketch name={name} frame="bare" weight="light" story />
                    </a>
                    <Sketch name={name} frame="bare" weight="light" story end />
                  </Layout>
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
