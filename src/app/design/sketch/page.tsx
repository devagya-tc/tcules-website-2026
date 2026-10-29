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
  'audits',
];
/** The OFFER scenes drawn for the 26 Oct copy's specialist services (owner, 29 Oct 2026, Q7). */
const SPECIALIST: readonly SketchName[] = [
  'specialist-research',
  'specialist-ia',
  'specialist-ui',
  'specialist-dataviz',
  'specialist-prototype',
  'specialist-new-product',
  'specialist-audit',
];
/** The article scenes: each drawn for one insight, its cover until a real one exists. */
const ARTICLE: readonly SketchName[] = [
  'code-review',
  'security-checklist',
  'prototype-to-production',
];
/** The kit scenes: EngagementOptions' scopes and TracePlates' stages, in the same grammar. */
const KIT: readonly SketchName[] = [
  'scope-feature',
  'scope-area',
  'scope-embedded',
  'scope-build',
  'scope-start',
  'scope-direct',
  'scope-inside',
  'scope-overlap',
  'scope-commercial',
  'trace-design',
  'trace-handoff',
  'trace-code',
  'trace-product',
  'trace-signoff',
];
const SURFACES: readonly SectionSurface[] = ['paper', 'tint', 'ink'];
/** The scenes with a STORY drawing: the six the home bento shows, and Audits (About's eighth tile). */
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
          <Specimen title={`S.1 · the service scenes · ${surface}`}>
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
            title={`S.4 · the kit scenes · ${surface}`}
            note="Owner, 26 Oct 2026 (S2): EngagementOptions' scopes and TracePlates' stages, drawn by Sketch in the same grammar as the service and article scenes, so the flat families cannot drift apart. The trace stages share one screen; its action sits on the trace's line at (110, 110)."
          >
            <Layout columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="gutter">
              {KIT.map((name) => (
                <Layout key={name} rowGap="tight">
                  <Sketch name={name} />
                  <code>{name}</code>
                </Layout>
              ))}
            </Layout>
          </Specimen>
          <Specimen
            title={`S.5 · the specialist services · ${surface}`}
            note="Owner, 26 Oct 2026, and 29 Oct 2026 (Q7): the product-design page's services you can hire on their own, each drawn from its own Best for line, drawn bare on the bento's tiles and held still. New Product Design (the prototype that holds everything made the release that holds one job for one person, what it leaves out hatched) and the UX & Product Audit (the lens finding what is wrong on the screen) joined the five. Plate above, bare (as the bento sets them) below."
          >
            <Layout columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="gutter">
              {SPECIALIST.map((name) => (
                <Layout key={name} rowGap="tight">
                  <Sketch name={name} />
                  <Sketch name={name} frame="bare" />
                  <code>{name}</code>
                </Layout>
              ))}
            </Layout>
          </Specimen>
          <Specimen
            title={`S.3 · the story drawings, rest and solved · ${surface}`}
            note="Owner, 25 Oct 2026: the bento's service drawings, redrawn to the flat-graphics grammar, the problem at rest and solved when the link they sit in is hovered or focused, in one move on the owner's hover curve. Left: at rest (hover it). Right: held solved. Bare frame, as the bento sets them. On a plate the same drawing is held solved and does not move (S.1)."
          >
            <Layout columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="gutter">
              {STORY.map((name) => (
                <Layout key={name} rowGap="tight">
                  <Layout columns={2} colGap="gutter" rowGap="tight">
                    <a
                      href={`#story-${surface}-${name}`}
                      id={`story-${surface}-${name}`}
                      aria-label={`Hover: ${name}`}
                    >
                      <Sketch name={name} frame="bare" story />
                    </a>
                    <Sketch name={name} frame="bare" story end />
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
