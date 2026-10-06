import type { ReactNode } from 'react';

import { Layout, Section, type SectionSurface } from '@/components';
import { CtaRow, Statement } from '@/patterns';
import { ROUTES } from '@/lib/routes';

import { specimenStyles as s } from '../_specimen/Specimen';

/**
 * Statement — the proving ground. Coverage beside the family page (/design/kit/banner): both
 * elements, the texture, an action, absent eyebrow, the 3-line ceiling, and three surfaces.
 */

const SENTENCE =
  'Most product problems are decisions nobody has made yet, showing up on a screen.';
/* No blue band (fix round 1): blue is never a ground (owner ruling, § 4.3), and a specimen that
   paints one is the one place the branch would show it. The blue token block stays declared for
   self-containment, which tokens:check proves without a render. */
type ShownSurface = Exclude<SectionSurface, 'blue'>;
const SURFACES: readonly ShownSurface[] = ['paper', 'tint', 'ink'];
const SURFACE_NOTE: Record<ShownSurface, string> = {
  paper: 'Paper, the page ground.',
  tint: 'Surface proof — on pages, tint is the proof band only (§ 1.7).',
  ink: 'Surface proof — the mark lifts to brandeis-300 on ink.',
};

function Label({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Section density="tight">
      <Layout rowGap="block" className={s.spec}>
        <h2>{title}</h2>
        <p className={s.specNote}>{children}</p>
      </Layout>
    </Section>
  );
}

export default function StatementSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Statement</h1>
          <p className={s.specNote}>
            The J band: one sentence at the h1 role on an <code>h2</code> (default) or a{' '}
            <code>p</code>, never an h1. [1, 2] from 1024: eyebrow and a short blue mark in the
            head track, the sentence in the two-thirds track. Open density (128). Optional
            head-half texture (paper, from 1024) and one optional action. ≤ 14 words, ≤ 3 lines.
          </p>
        </Layout>
      </Section>

      <Label title="1 · as h2 and as p">
        The same scale; only the outline differs. The h2 names its band (a labelled section);
        the p band is a plain div.
      </Label>
      <Statement eyebrow="What we believe" id="stmt-h2">
        {SENTENCE}
      </Statement>
      <Statement eyebrow="In short" as="p">
        A small senior team, working in the open, from the first week to release.
      </Statement>

      <Label title="2 · head-half texture, and an action">
        The texture spends the band&rsquo;s one blue mass; the sentence stays ink. An action
        sits a stack under the sentence, a blue link.
      </Label>
      <Statement eyebrow="How we work" id="stmt-texture" texture="head-half">
        We design the decision first. The screen follows from it.
      </Statement>
      <Statement
        eyebrow="How we work"
        id="stmt-action"
        actions={
          <CtaRow
            actions={[{ label: 'See how we work', href: ROUTES.howWeWork }]}
            rule={false}
          />
        }
      >
        We design the decision first. The screen follows from it.
      </Statement>

      <Label title="3 · absent eyebrow, and the ceiling">
        Without an eyebrow the head track is empty: the mark leads its label and goes with it. Then 14 words, the § 1.5
        ceiling, on 3 lines.
      </Label>
      <Statement id="stmt-no-eyebrow">
        Good products are mostly decisions, made early, kept.
      </Statement>
      <Statement eyebrow="Our view" id="stmt-ceiling">
        A product slows down where nobody owns the decision its interface is asking for.
      </Statement>

      <Label title="4 · three surfaces">
        Identical markup; texture is paper only and is ignored elsewhere.
      </Label>
      {SURFACES.map((surface) => (
        <Layout key={surface} rowGap="none">
          <Section density="tight" surface={surface}>
            <p className={s.specTitle}>{SURFACE_NOTE[surface]}</p>
          </Section>
          <Statement surface={surface} eyebrow="What we believe" id={`stmt-${surface}`}>
            {SENTENCE}
          </Statement>
        </Layout>
      ))}
    </>
  );
}
