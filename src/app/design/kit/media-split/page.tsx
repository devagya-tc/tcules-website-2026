import type { Metadata } from 'next';

import {
  Button,
  Cluster,
  Icon,
  Layout,
  Section,
  Tag,
  Texture,
  TextureShape,
  type IconName,
} from '@/components';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { ROUTES } from '@/lib/routes';
import { ContentSection, CtaRow, ListCard, type ContentSectionMediaSide } from '@/patterns';

import t from '../../_specimen/typeroles.module.css';

export const metadata: Metadata = {
  title: 'Media split · kit | Design',
  robots: { index: false, follow: false },
};

/**
 * /design/kit/media-split — band B of the Tcules UI kit (visual-direction § 3.2, § 3.4 B, § 1.4).
 *
 * B is a COMPOSITION, not a unit: ContentSection `arrangement="media"` (fdn-section-head) with
 * ListCard tiles in a Layout and, where the band ends in an ask, a CtaRow footer. The one extension
 * this family makes is ContentSection's `texture` slot, so the `counterweight` placement can sit in
 * the band. Every band below is a live ContentSection, edge to edge as on a route, so each can be
 * measured against the fold (≤ 830 at 1470 × 830, ≤ 1700 at 390; fold.config.json lists the route).
 *
 * Laid out as a showcase: an intro band that indexes the family, then each variation as a tint
 * label strip followed by the band itself.
 *
 * The rules each band carries:
 *   - the photo is 4:5 in 5 of [5, 7] (477 × 596 at 1470), 4:3 above the copy below 1024, radius 8,
 *     no frame (§ 5.3), and resolves at ≥ 1.9× its box (§ 5.4);
 *   - the copy in 7 (667) is H-full plus ≤ 4 tiles (2 × 2, `gutter` across, `column` down), or
 *     ≤ 2 tiles and a CtaRow (§ 1.4 rule 9). Ending in a CtaRow under tiles, the copy stretches to
 *     the photo and pins the CtaRow to its bottom edge; otherwise it is centred on the photo (§ 3.2);
 *   - `counterweight` sits in the corner opposite the photo, its box inside the bottom padding, and
 *     is the band's one blue mass, so the band carries no solid button (§ 4.3);
 *   - blue is the foreground accent: the tiles' icon markers, every CtaRow link, the index links.
 *
 * Photographs: one temperature family for the whole page (§ 5.5 rule 1) — warm and neutral, every
 * one `quiet`, none twice.
 */

const photo = (id: PhotoId) => getKitPhoto(id);

/* ── The `counterweight` placement (visual-direction § 6.3) ────────────────────────────────────
   ellipse, bottom −260, side −180, 34% × 340, blur 180. The box rises 80 into the band, inside its
   96 of bottom padding, under the copy track in the corner opposite the photograph, and clears
   every content box; only the feather reaches the copy's foot. Composed here and handed to
   ContentSection's `texture` slot, which shows it from 1024 only (it has no phone form). The
   recipe constant is Texture's to own (fdn-texture); until it lands the numbers live here once. */
function Counterweight({ side }: { side: ContentSectionMediaSide }) {
  const anchor = side === 'end' ? { right: -180 } : { left: -180 };
  return (
    <Texture>
      <TextureShape
        kind="ellipse"
        bottom={-260}
        {...anchor}
        width="34%"
        height={340}
        blur={180}
      />
    </Texture>
  );
}

type Tile = { icon: IconName; title: string; body: string };

/**
 * The B tiles: ListCard `form="tile"` in a 2 × 2 Layout — `gutter` (32) across, the `column` (64)
 * row seam of a borderless card set down (§ 1.2). Each tile opens on its hairline, then a blue
 * Solar icon, an h5 title and a body-sm line or three (§ 1.5: ≤ 4 / ≤ 20 words).
 */
function Tiles({ tiles }: { tiles: readonly Tile[] }) {
  return (
    <Layout as="ul" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="column">
      {tiles.map((tile) => (
        <ListCard
          key={tile.title}
          form="tile"
          titleAs="h3"
          marker={{ type: 'icon', name: tile.icon }}
          title={tile.title}
          body={tile.body}
        />
      ))}
    </Layout>
  );
}

/* ── Copy. Tcules' voice: precise, calm, no hype. ─────────────────────────────────────────── */

const HOW_WE_WORK = {
  eyebrow: 'How we work',
  heading: 'Decisions you can trace',
  lead: 'Research, strategy and interface design sit on the same wall, so every screen points back to a reason.',
  tiles: [
    {
      icon: 'users-group-rounded',
      title: 'The people who build',
      body: 'The designers and engineers in the first workshop are the ones who ship the release.',
    },
    {
      icon: 'chat-round-dots',
      title: 'Weekly working sessions',
      body: 'Ninety minutes a week with your team at the board, deciding rather than presenting.',
    },
    {
      icon: 'notebook',
      title: 'A written trail',
      body: 'Every decision is logged with its reason, so a new hire can follow it months later.',
    },
    {
      icon: 'eye',
      title: 'Tested, then polished',
      body: 'Rough prototypes go in front of real users before anyone spends a week on pixels.',
    },
  ],
} as const satisfies { tiles: readonly Tile[] } & Record<string, unknown>;

const DIRECTION = {
  eyebrow: 'Design direction',
  heading: 'A visual language that lasts',
  lead: 'We set the direction on the wall first, then turn it into rules your designers apply without us.',
  tiles: [
    {
      icon: 'ruler-pen',
      title: 'Drawn against real screens',
      body: 'Type, colour and imagery are chosen on working screens and real content, not a moodboard.',
    },
    {
      icon: 'layers',
      title: 'Tokens, not opinions',
      body: 'Every decision lands as a named token, so the code and the design file read the same value.',
    },
    {
      icon: 'monitor',
      title: 'Judged in context',
      body: 'Each direction is reviewed on three screens side by side, never as a single hero image.',
    },
    {
      icon: 'document-text',
      title: 'Built to hand over',
      body: 'Your team receives the library, the reasoning behind it and a session on extending it.',
    },
  ],
} as const satisfies { tiles: readonly Tile[] } & Record<string, unknown>;

const DISCOVERY_TILES: readonly Tile[] = [
  {
    icon: 'graph-up',
    title: 'Ranked by value',
    body: 'Each opportunity is scored on reach, effort and risk, with the evidence for every score.',
  },
  {
    icon: 'clock-circle',
    title: 'Fixed time and fee',
    body: 'Ten working days at one price, agreed before the first interview is booked.',
  },
];

const ENGINEERING_TILES: readonly Tile[] = [
  {
    icon: 'widget',
    title: 'Components, not mockups',
    body: 'Screens are assembled from the real component library, so a review sees production behaviour.',
  },
  {
    icon: 'shield-check',
    title: 'Accessible from the start',
    body: 'Contrast, focus order and screen-reader names are checked in every review, not at launch.',
  },
  {
    icon: 'database',
    title: 'Real data early',
    body: 'Prototypes run on a copy of your data, so the empty and crowded states show up in week two.',
  },
  {
    icon: 'layers',
    title: 'One source of truth',
    body: 'Design files and code share one set of tokens, so a change in one is a change in both.',
  },
];

const PLAN_DISCOVERY = { label: 'Plan a discovery', href: ROUTES.contact };
const SEE_PLAN = { label: 'See a sample plan', href: ROUTES.caseStudies };
const SEE_WORK = { label: 'See the work', href: ROUTES.caseStudies };

/* ── The specimen chrome ─────────────────────────────────────────────────────────────────── */

type Variation = {
  id: string;
  /** The index label: a mono button label does not wrap, so it must fit 390. */
  short: string;
  name: string;
  note: string;
  facts: readonly string[];
};

const V = {
  studio: {
    id: 'photo-start-four-tiles',
    short: 'Photo start · 4 tiles',
    name: 'Photo left, four tiles, the counterweight at the end',
    note: 'The default B band, as product-design sets it. The studio board at 477 × 596 beside H-full and a 2 × 2 of tiles; the copy ends in tiles, not an action, so it is centred on the photograph. The texture rises from the far corner, inside the bottom padding, and is the band’s one blue mass.',
    facts: [
      '§ 1.4 · 596 + 192',
      'studio-sticky-board-ux · 1.93×',
      'counterweight · end',
      'Texture',
    ],
  },
  stock: {
    id: 'studio-against-stock',
    short: 'Studio against stock',
    name: 'The same band with a stock photograph',
    note: 'Identical copy and placement, so the photograph is the only difference. Studio comes first wherever it resolves, because it shows our own work; studio-sticky-board-ux is the one studio photo that meets 4:5 (1.93×, the 5% tolerance). Stock scenes resolve at 2.5× and take over everywhere else, chosen from the page’s temperature family.',
    facts: ['moodboard-wall-desk · 2.52×', 'warm · quiet', 'counterweight · end'],
  },
  end: {
    id: 'photo-end-four-tiles',
    short: 'Photo end · 4 tiles',
    name: 'Photo right, four tiles, the counterweight at the start',
    note: 'media.side="end" mirrors the tracks and keeps the photo’s 5; the counterweight follows to the opposite corner, under the copy. Consecutive media bands on a page alternate side (§ 3.2 rule 4). Below 1024 the photo still leads the copy.',
    facts: ['side · end', 'designer-monitor-ui · 2.52×', 'counterweight · start', 'Texture'],
  },
  ask: {
    id: 'two-tiles-ctarow',
    short: 'Two tiles · CtaRow',
    name: 'Photo left, two tiles and a CtaRow, edge-aligned',
    note: 'Copy that ends in an action under blocks stretches to the photograph: the eyebrow sits on its top edge and the CtaRow is pinned to its bottom edge (§ 3.2 rule 1). Two shared edges finish the split. The ask is a blue link, never a solid: the texture is this band’s blue mass.',
    facts: ['§ 1.4 · 470 in 596', 'pinLast', 'link CtaRow', 'counterweight · end'],
  },
  lead: {
    id: 'lead-ctarow',
    short: 'Lead · CtaRow',
    name: 'Photo left, the head and a CtaRow, centred',
    note: 'With nothing between the head and the action there is nothing to fill a stretch, and pinning would open ~400 of empty column under the lead. The copy is centred on the photograph instead, and the CtaRow drops its rule, which with no body above it would underline the lead.',
    facts: ['Centred', 'rule={false}', 'hands-sketches-markers · 2.52×', 'counterweight · end'],
  },
  bare: {
    id: 'no-texture',
    short: 'No texture',
    name: 'Photo right, four tiles, no texture',
    note: 'The band is complete without its texture. A page spends at most three placements and never two in adjacent bands (§ 6.4), so a B band that follows a textured band goes bare and keeps its shape. Blue stays in the foreground: the tiles’ icons.',
    facts: ['side · end', 'hands-trackpad · 2.52×', 'No blue mass'],
  },
  phone: {
    id: 'at-390',
    short: 'Every band at 390',
    name: 'Every band at 390: the photo above the copy',
    note: 'Below 1024 each band is one column in DOM order. The photo leads at 4:3 (a 4:5 at the 326 column would be 408 tall before the first word), then the head, the tiles one to a row and the CtaRow, every seam a stack. The counterweight is dropped: it has no phone form. Each band above is its own 390 proof.',
    facts: ['4:3 below 1024', '≤ 1700 tall', 'No texture'],
  },
} as const satisfies Record<string, Variation>;

const ORDER: readonly Variation[] = [V.studio, V.stock, V.end, V.ask, V.lead, V.bare, V.phone];

/** The tint strip that names a variation. Specimen chrome: it labels the band below it. */
function Label({ variation }: { variation: Variation }) {
  const index = ORDER.indexOf(variation);
  return (
    <Section surface="tint" density="tight" id={variation.id}>
      <Layout columns={{ lg: [1, 2] }} colGap="section" rowGap="block" align="start">
        <Layout rowGap="tight">
          <p className={t.index}>{String(index + 1).padStart(2, '0')}</p>
          <h2 className={t.h4}>{variation.name}</h2>
        </Layout>
        <Layout rowGap="block">
          <p className={t.body}>{variation.note}</p>
          <Cluster as="ul" colGap="tight" rowGap="tight">
            {variation.facts.map((fact) => (
              <li key={fact}>
                <Tag>{fact}</Tag>
              </li>
            ))}
          </Cluster>
        </Layout>
      </Layout>
    </Section>
  );
}

export default function MediaSplitKitSpecimen() {
  return (
    <>
      {/* ── Intro ───────────────────────────────────────────────────────────────────────── */}
      <Section density="open">
        <Layout columns={{ lg: [1, 1] }} colGap="section" rowGap="stack" align="end">
          <Layout rowGap="block">
            <p className={t.eyebrow}>UI kit · Band B</p>
            <h1 className={t.display}>A photograph beside the argument</h1>
            <p className={t.lead}>
              One ContentSection, one 4:5 photograph and a short run of tiles. The photograph is
              the band’s large thing; the copy carries the reasons, and blue marks where to
              look.
            </p>
          </Layout>
          <Layout as="ol" rowGap="text">
            {ORDER.map((variation, index) => (
              <li key={variation.id}>
                <Button
                  as="a"
                  href={`#${variation.id}`}
                  emphasis="link"
                  size="sm"
                  icon={<Icon name="arrow-right" />}
                >
                  {`${String(index + 1).padStart(2, '0')} · ${variation.short}`}
                </Button>
              </li>
            ))}
          </Layout>
        </Layout>
      </Section>

      {/* ── 01 · Studio, photo start, 4 tiles, counterweight end ───────────────────────── */}
      <Label variation={V.studio} />
      <ContentSection
        arrangement="media"
        media={{ image: photo('studio-sticky-board-ux') }}
        eyebrow={HOW_WE_WORK.eyebrow}
        heading={HOW_WE_WORK.heading}
        headingId="b-studio"
        lead={HOW_WE_WORK.lead}
        texture={<Counterweight side="end" />}
      >
        <Tiles tiles={HOW_WE_WORK.tiles} />
      </ContentSection>

      {/* ── 02 · The same band, stock ──────────────────────────────────────────────────── */}
      <Label variation={V.stock} />
      <ContentSection
        arrangement="media"
        media={{ image: photo('moodboard-wall-desk') }}
        eyebrow={HOW_WE_WORK.eyebrow}
        heading={HOW_WE_WORK.heading}
        headingId="b-stock"
        lead={HOW_WE_WORK.lead}
        texture={<Counterweight side="end" />}
      >
        <Tiles tiles={HOW_WE_WORK.tiles} />
      </ContentSection>

      {/* ── 03 · Photo end, 4 tiles, counterweight start ───────────────────────────────── */}
      <Label variation={V.end} />
      <ContentSection
        arrangement="media"
        media={{ image: photo('designer-monitor-ui'), side: 'end' }}
        eyebrow={DIRECTION.eyebrow}
        heading={DIRECTION.heading}
        headingId="b-end"
        lead={DIRECTION.lead}
        texture={<Counterweight side="start" />}
      >
        <Tiles tiles={DIRECTION.tiles} />
      </ContentSection>

      {/* ── 04 · 2 tiles + CtaRow, pinned ──────────────────────────────────────────────── */}
      <Label variation={V.ask} />
      <ContentSection
        arrangement="media"
        media={{ image: photo('workshop-brick-room') }}
        eyebrow="Discovery"
        heading="Two weeks to know what is worth building"
        headingId="b-ask"
        lead="A short, fixed engagement that ends with a ranked plan and the evidence behind every item on it."
        texture={<Counterweight side="end" />}
        footer={
          <CtaRow
            actions={[PLAN_DISCOVERY, SEE_PLAN]}
            note="Most of our engagements start here."
          />
        }
      >
        <Tiles tiles={DISCOVERY_TILES} />
      </ContentSection>

      {/* ── 05 · Lead only + CtaRow, centred ───────────────────────────────────────────── */}
      <Label variation={V.lead} />
      <ContentSection
        arrangement="media"
        media={{ image: photo('hands-sketches-markers') }}
        eyebrow="Sketch first"
        heading="Drawn on paper before it is built in code"
        headingId="b-lead"
        lead="A sketch is cheap to throw away and a coded screen is not, so every interface starts as one."
        texture={<Counterweight side="end" />}
        footer={<CtaRow actions={[SEE_WORK]} rule={false} />}
      />

      {/* ── 06 · No texture ────────────────────────────────────────────────────────────── */}
      <Label variation={V.bare} />
      <ContentSection
        arrangement="media"
        media={{ image: photo('hands-trackpad'), side: 'end' }}
        eyebrow="Design engineering"
        heading="Design and code, one table"
        headingId="b-bare"
        lead="Engineers join the design reviews from the first week, so what we draw is what can ship on time."
      >
        <Tiles tiles={ENGINEERING_TILES} />
      </ContentSection>

      {/* ── 07 · At 390 ────────────────────────────────────────────────────────────────── */}
      <Label variation={V.phone} />
    </>
  );
}
