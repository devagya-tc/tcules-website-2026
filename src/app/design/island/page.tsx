import type { ReactNode } from 'react';

import {
  Button,
  Cluster,
  Island,
  Layout,
  Section,
  Texture,
  TextureCorner,
  TextureShape,
  type IslandSurface,
  type SectionSurface,
} from '@/components';
import { ROUTES } from '@/lib/routes';

import { specimenStyles as s } from '../_specimen/Specimen';

/**
 * Island — the proving ground. A bounded ground inside a band, with the band's ground around it on
 * every side; the surface is set per instance.
 *
 * Coverage: every admitted pairing of band and island (four — paper and tint islands on the two light
 * bands that are not their own, and on ink), the texture inside a paper island (corner and the
 * head-half field), the inset and radius at 1440 and 390 (the shots), and the refused pairings named
 * rather than rendered — a refused island renders the other light ground and warns, which a specimen
 * would only print as a duplicate of the pairing beside it.
 *
 * The content inside every island is identical on purpose: an eyebrow, an h2, a paragraph and the
 * solid + ghost pair, so the only thing that changes between blocks is the pairing, and the button
 * proves that the island's `data-surface` reaches a control two levels down.
 */

type Pairing = { band: SectionSurface; island: IslandSurface; title: string; note: string };

const PAIRINGS: readonly Pairing[] = [
  {
    band: 'paper',
    island: 'tint',
    title: 'Tint island on a paper band',
    note: 'The warm island: paper-deep on paper, one step (1.12:1) and no edge. The CtaSection close’s island default — the close’s tint moves from the band onto the box.',
  },
  {
    band: 'tint',
    island: 'paper',
    title: 'Paper island on a tint band',
    note: 'The bright island: the brightest object in its band, as the form panel is. The only pairing that carries a texture inside (texture is paper only, § 6.2).',
  },
  {
    band: 'ink',
    island: 'paper',
    title: 'Paper island on an ink band',
    note: 'Surface proof. The island re-declares its own surface, so the ink band’s white ink and lifted blue never leak in: the heading is neutral-900, the solid is brandeis-500.',
  },
  {
    band: 'ink',
    island: 'tint',
    title: 'Tint island on an ink band',
    note: 'Surface proof, the warm ground. No page carries an ink band above the footer; shown to prove self-containment.',
  },
];

function Caption({ title, note }: { title: string; note: string }) {
  return (
    <Layout columns={{ base: 1, lg: [1, 2] }} colGap="column" rowGap="text" className={s.spec}>
      <p className={s.specTitle}>{title}</p>
      <p className={s.specNote}>{note}</p>
    </Layout>
  );
}

function Contents({ heading }: { heading: string }) {
  return (
    <Layout rowGap="stack">
      <Layout rowGap="block">
        <p className={s.specTitle}>Island</p>
        <h2>{heading}</h2>
        <p className={s.specNote}>
          A bounded ground with the band&rsquo;s own ground around it on every side. It keeps
          the page gutter at every width, insets its content by the band&rsquo;s air, and
          arranges nothing.
        </p>
      </Layout>
      <Cluster colGap="block" rowGap="text">
        <Button emphasis="solid" href={ROUTES.contact}>
          Start a project
        </Button>
        <Button emphasis="ghost" href={ROUTES.howWeWork}>
          See how we work
        </Button>
      </Cluster>
    </Layout>
  );
}

function Band({ surface, children }: { surface: SectionSurface; children: ReactNode }) {
  return (
    <Section surface={surface}>
      <Layout rowGap="stack">{children}</Layout>
    </Section>
  );
}

export default function IslandSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Island</h1>
          <p className={s.specNote}>
            Tier 1, a surface. One bounded ground inside a band — paper or tint, chosen per
            instance — painted at the system&rsquo;s 8 radius with no edge and no shadow, so the
            ground step is the box. It declares its own <code>data-surface</code>, so a heading,
            a button and a texture inside it take the island&rsquo;s tokens. Inset: 96 on every
            side from 768; below 768, 64 above and below and the 32 gutter at the sides. It
            stays in Section&rsquo;s column at every width. CtaSection (<code>open</code>) and
            Statement consume it as <code>island</code>. An island equal to its band is refused
            — with no edge it would draw nothing, and tint on tint is two tints touching — and
            renders the other light ground with a development warning. Blue is never a ground,
            and ink is the footer&rsquo;s; neither is an island surface.
          </p>
        </Layout>
      </Section>

      {PAIRINGS.map((pairing) => (
        <Band key={`${pairing.band}-${pairing.island}`} surface={pairing.band}>
          <Caption
            title={`${pairing.band} band · ${pairing.island} island — ${pairing.title}`}
            note={pairing.note}
          />
          <Island surface={pairing.island}>
            <Contents heading={pairing.title} />
          </Island>
        </Band>
      ))}

      <Band surface="tint">
        <Caption
          title="Texture inside the island · corner"
          note="Island is positioned and isolated, so a Texture fills the ISLAND, not the band, and clips at its radius. TextureCorner in the island’s top-end corner, from 1024; the band around stays clean ground."
        />
        <Island surface="paper">
          <TextureCorner />
          <Contents heading="The field arrives from the island’s corner" />
        </Island>
      </Band>

      <Band surface="tint">
        <Caption
          title="Texture inside the island · head-half field"
          note="Statement’s head-half rect (top −200, end −120, 34% × 296, blur 160) on the island’s field: it starts past the island’s edge and is cut at the box, so it reads as atmosphere arriving from outside. Drawn at every width here; Statement switches it on from 1024."
        />
        <Island surface="paper">
          <Texture>
            <TextureShape top={-200} right={-120} width="34%" height={296} blur={160} />
          </Texture>
          <Contents heading="Atmosphere from past the edge" />
        </Island>
      </Band>
    </>
  );
}
