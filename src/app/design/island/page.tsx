import { Fragment, type ReactNode } from 'react';

import {
  Button,
  Cluster,
  Island,
  Layout,
  Media,
  Section,
  Texture,
  TextureCorner,
  TextureShape,
  type IslandSurface,
  type SectionSurface,
} from '@/components';
import { CtaSection, EnquiryForm, type EnquiryDress } from '@/patterns';
import { ENDPOINTS, ROUTES } from '@/lib/routes';

import { specimenStyles as s } from '../_specimen/Specimen';

/**
 * Island — the proving ground. A bounded ground inside a band, with the band's ground around it on
 * every side; the surface is set per instance.
 *
 * Coverage: every admitted pairing of the general islands (four — paper and tint islands on the two
 * light bands that are not their own, and on ink), the texture inside a paper island (corner and the
 * head-half field), the blue and ink islands (16 Oct 2026) as the enquiry close that is their one
 * placement, the inset and radius at 1440 and 390 (the shots), and the refused pairings named rather
 * than rendered — a refused island renders the other light ground and warns, which a specimen would
 * only print as a duplicate of the pairing beside it.
 *
 * The content inside every general island is identical on purpose: an eyebrow, an h2, a paragraph and
 * the solid + ghost pair, so the only thing that changes between blocks is the pairing, and the button
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

const FORM_CONTEXT = {
  originRoute: ROUTES.designIsland,
  placement: 'component-specimen',
  family: 'design-system',
  serviceOrAudit: 'island',
  referrer: '',
  campaign: '',
} as const;

/** The island close's drawing, as the home close places it (scripts/enquiry-desk.mjs). */
const DESK = {
  src: '/illustrations/enquiry/designer-desk.svg',
  alt: '',
  width: 396,
  height: 459,
  kind: 'illustration',
} as const;

/* The blue and ink islands, as the one placement that uses them renders them: the enquiry close,
   with the home close's copy (/design/cta-section § 1b). The message's person is a placeholder. */
const ISLAND_CLOSES: readonly {
  island: 'blue' | 'ink';
  dress: EnquiryDress;
  title: string;
  note: string;
}[] = [
  {
    island: 'blue',
    dress: {
      kind: 'card',
      title: 'Start a project',
      prompt: 'A link, a Figma file, or two lines about the problem.',
      reply: 'We reply in 1 business day',
    },
    title: 'paper band · blue island — the enquiry close, with the card dress (what home carries)',
    note: 'Blue admitted 16 Oct 2026 (owner) for the enquiry close only: an exception to “blue is never a ground”, for an island that carries a paper object. Rendered as CtaSection composes it (island="blue", islandTexture="frame", art): the drawing, heading and lede on the island, TextureFrame framing the form, the form on CtaSection’s paper panel inside the island. The card dress and its siblings are documented at /design/enquiry-form.',
  },
  {
    island: 'ink',
    dress: {
      kind: 'message',
      from: {
        name: 'Rushali',
        role: 'Design lead · Tcules',
        portrait: '/kit/photos/studio-portrait-rushali.webp',
      },
      note: 'Tell us what you’re building. I’ll reply within a working day.',
      prompt: 'A link, a Figma file, or two lines about the problem.',
      writeTo: 'hello@tcules.com',
    },
    title: 'paper band · ink island — the enquiry close, with the message dress (the first message)',
    note: 'Ink admitted 16 Oct 2026 (owner) for the same close: neutral-900, one step off the footer’s 950, so the close and the footer a band below do not read as one dark block. The same composition as the blue close, here with the message dress.',
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
            Tier 1, a surface. One bounded ground inside a band, chosen per instance from{' '}
            <code>paper | tint | blue | ink</code>, painted at a 24 radius with no edge and no
            shadow, so the ground step is the box. It declares its own <code>data-surface</code>,
            so a heading, a button and a texture inside it take the island&rsquo;s tokens. Inset:
            48 on every side from 768; below 768, 48 above and below and the 32 gutter at the
            sides. It stays in Section&rsquo;s column at every width. CtaSection (
            <code>open</code>, and <code>split</code> for the enquiry close) and Statement consume
            it as <code>island</code>. An island equal to its band is refused — with no edge it
            would draw nothing, and tint on tint is two tints touching — and renders the other
            light ground with a development warning. Paper and tint are the general islands. Blue
            and ink were admitted on 16 Oct 2026 (owner) for one placement, the enquiry close: an
            island that carries a paper form, on a paper band. Blue is an exception to &ldquo;blue
            is never a ground&rdquo;; ink is neutral-900, one step off the footer&rsquo;s 950.
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

      <Band surface="paper">
        <Caption
          title="size sm · the tile — one cell of a grid"
          note="A block (24) inset on every side at every width, every island's radius, and the full height of its cell: beside a taller neighbour it stretches to end level with it. OfferTile is its one consumer (25 Oct 2026)."
        />
        <Layout columns={{ md: 3 }} colGap="gutter" rowGap="column">
          <Island surface="tint" size="sm">
            <p className={s.specNote}>A tile on a paper band, its own copy short.</p>
          </Island>
          <Island surface="tint" size="sm">
            <TextureCorner />
            <Layout rowGap="block">
              <p className={s.specTitle}>Its neighbour</p>
              <p className={s.specNote}>
                Longer copy sets the row&rsquo;s height, and the tile beside it fills to the same
                depth. The corner field arrives from the tile&rsquo;s own edge.
              </p>
            </Layout>
          </Island>
        </Layout>
      </Band>

      {/* Blue and ink exist for one placement, the enquiry close, so they are rendered AS that close:
          CtaSection composes the Island, its TextureFrame, the [5, 7] split and the form's paper
          panel. A stand-in box would show an island nobody ships. */}
      {ISLAND_CLOSES.map((close) => (
        <Fragment key={close.island}>
          <Band surface="paper">
            <Caption title={close.title} note={close.note} />
          </Band>
          <CtaSection
            island={close.island}
            islandTexture="frame"
            art={<Media image={DESK} sizes="240px" />}
            heading="Tell us what you're building"
            body={[
              'A sketch, a prototype or a product with years of history behind it. Start wherever you are.',
            ]}
            form={
              <EnquiryForm
                action={`${ENDPOINTS.enquiryDesign}?outcome=success`}
                context={FORM_CONTEXT}
                dress={close.dress}
              />
            }
          />
        </Fragment>
      ))}
    </>
  );
}
