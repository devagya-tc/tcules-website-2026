import type { ReactNode } from 'react';

import { Layout, Section, type SectionSurface } from '@/components';
import { CtaRow, Statement } from '@/patterns';
import { ROUTES } from '@/lib/routes';

import { specimenStyles as s } from '../_specimen/Specimen';

/**
 * Statement — the proving ground. Coverage beside the family page (/design/kit/banner): both
 * elements, both textures, an action, absent eyebrow, the 3-line ceiling, the display size, both
 * alignments (start and centre — the split form was retired 7 Oct 2026), and three surfaces.
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
  ink: 'Surface proof — the eyebrow lifts to neutral-400 on ink.',
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
            <code>p</code>, never an h1. One column at every width: the eyebrow directly above the
            sentence (a block, 24), start-aligned by default or centred with{' '}
            <code>align=&quot;center&quot;</code>. The split form — eyebrow alone in a one-third
            track — is retired (owner, 7 Oct 2026): the label belongs on the thing it labels. Open
            density (128). Optional texture (paper, from 1024) and one optional action. ≤ 14
            words, ≤ 3 lines. For a page&rsquo;s display-scale moment,{' '}
            <code>size=&quot;display&quot;</code>, with the <code>corner</code> texture.
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
        Without an eyebrow the sentence opens the band on its own; nothing holds its place. Then
        14 words, the § 1.5 ceiling, on 3 lines.
      </Label>
      <Statement id="stmt-no-eyebrow">
        Good products are mostly decisions, made early, kept.
      </Statement>
      <Statement eyebrow="Our view" id="stmt-ceiling">
        A product slows down where nobody owns the decision its interface is asking for.
      </Statement>

      <Label title='4 · size="display"'>
        The sentence at the display role, the hero&rsquo;s, on the start edge: for the one J a
        page spends as its display-scale moment. Measure --stmt-sentence-measure-display. Then
        the service page&rsquo;s start form: display, the corner field and the link.
      </Label>
      <Statement eyebrow="How we work" id="stmt-display" size="display">
        One accountable team, from the first question to the shipped build.
      </Statement>
      <Statement
        eyebrow="AI-assisted engineering"
        id="stmt-display-start"
        size="display"
        texture="corner"
        actions={
          <CtaRow
            actions={[{ label: 'See how we work', href: ROUTES.howWeWork }]}
            rule={false}
          />
        }
      >
        Production responsibility does not move to the model.
      </Statement>

      <Label title='5 · align="center", texture="corner"'>
        One column on the band&rsquo;s axis at every width — the service page&rsquo;s J where
        neither neighbour is centred. The corner field sits in the top-end
        corner from 1024, clear of the eyebrow; below 1024 the corner is not drawn. Then the same without an action.
      </Label>
      <Statement
        eyebrow="How we work"
        id="stmt-centre"
        size="display"
        align="center"
        texture="corner"
        actions={
          <CtaRow
            actions={[{ label: 'See how we work', href: ROUTES.howWeWork }]}
            rule={false}
          />
        }
      >
        One accountable team, from the first question to the shipped build.
      </Statement>
      <Statement eyebrow="Our view" id="stmt-centre-h1" align="center">
        A product slows down where nobody owns the decision its interface is asking for.
      </Statement>

      <Label title="6 · three surfaces">
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
