import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import {
  Button,
  Cluster,
  Icon,
  Layout,
  Section,
  Tag,
  TextureCounterweight,
  type IconName,
  type MediaFocus,
} from '@/components';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { ROUTES } from '@/lib/routes';
import { Accordion, ContentSection, CtaRow, ListCard } from '@/patterns';

import t from '../../_specimen/typeroles.module.css';

export const metadata: Metadata = {
  title: 'Media split · kit | Design',
  robots: { index: false, follow: false },
};

/**
 * /design/kit/media-split — band B of the Tcules UI kit (visual-direction § 3.2, § 3.4 B, § 1.4).
 *
 * B is a COMPOSITION, not a unit: ContentSection `arrangement="media"` with a body the route
 * chooses — ListCard tiles in a 2 × 2, a ruled ListCard list, or an Accordion — and, where the band
 * ends in an ask, a CtaRow footer. Every band below is a live ContentSection, edge to edge as on a
 * route, so each can be measured against the fold (≤ 830 at 1470 × 830, ≤ 1700 at 390;
 * fold.config.json lists the route and `npm run fold:check` measures it).
 *
 * Laid out as a showcase: an intro band that indexes the family, then each variation as a tint
 * label strip followed by the band itself. Each pair is one `data-shot` block, so `npm run shots --
 * kit/media-split` crops it at 1440 and 390 under its own name; the 390 crops are the phone proof.
 *
 * The rules each band carries:
 *   - the photo is at least 4:5 in 5 of [5, 7] (477 × 596 at 1470) and as tall as the copy where
 *     the copy is taller (1024–1280), 4:3 above the copy below 1024, radius 8, no frame (§ 5.3);
 *   - the head is display scale, the band's one dominant element beside a photo the fold holds at
 *     477 (see MediaSplit in ContentSection.tsx for the [5, 4] arithmetic);
 *   - the copy in 7 (667) is H-full plus ≤ 4 tiles, a ruled list or an accordion, or ≤ 2 tiles and a
 *     CtaRow. Ending in a CtaRow under blocks, the blocks and the CtaRow are pinned TOGETHER to the
 *     photo's bottom edge, so the stretch opens under the lead; otherwise the copy is centred (§ 3.2);
 *   - `TextureCounterweight` sits in the bottom corner opposite the photo, inside the padding and
 *     the end gutter, clear of every glyph, and is the band's one blue mass: no solid button (§ 4.3);
 *   - blue is the foreground accent in every band: the eyebrow, the markers, every link.
 *
 * Photographs: one temperature family for the whole page (§ 5.5 rule 1) — warm and neutral, every
 * one `quiet`, none twice.
 */

const photo = (id: PhotoId, focus?: MediaFocus) => {
  const image = getKitPhoto(id);
  return focus ? { ...image, focus } : image;
};

/* The studio board's master carries a dark wedge of ceiling in its top-left corner. At 4:5 the crop
   loses 8% of its height, and anchoring it low (y 0.8) spends most of that on the wedge while the 4:3 phone crop still keeps the hand at the board; when
   the box grows taller than 4:5 (1024–1280) the crop narrows instead, and x 0.62 spends it on the
   left edge where the wedge sits, keeping the hand at the board. A placement override (Media's
   `focus`), because the catalogue's own point serves its other crops. */
const STUDIO_BOARD = photo('studio-sticky-board-ux', { x: 0.62, y: 0.8 });

type Tile = { icon: IconName; title: string; body: string };

/**
 * The B tiles: ListCard `form="tile"` in a 2 × 2 Layout — `gutter` (32) across, `stack` (48) down
 * (fix round 1: the `column` seam stacked four tiles 64 apart on a phone, ~1500 of band, each icon
 * floating over its own seam; `stack` is the block-to-block step inside a section at every width,
 * and the 2 × 2 reads as one set rather than two rows). Every marker is a BARE Solar glyph — no
 * filled square or disc silhouettes — so a row of four reads as one system at 24.
 */
function Tiles({ tiles }: { tiles: readonly Tile[] }) {
  return (
    <Layout as="ul" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
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

/**
 * The second copy-side form: Meridian's single-column ruled list with a tick, as ListCard rows. Each
 * row closes on its hairline, the blue tick stands beside the copy, title over body. Reads DOWN, so
 * a page with two B bands gives one tiles and one a list and they no longer read as one shape.
 */
function Ticks({ items }: { items: readonly { title: string; body: string }[] }) {
  return (
    <Layout as="ul" rowGap="none">
      {items.map((item) => (
        <ListCard
          key={item.title}
          arrangement="split"
          size="sm"
          titleAs="h3"
          marker={{ type: 'icon', name: 'check-circle' }}
          title={item.title}
          body={item.body}
        />
      ))}
    </Layout>
  );
}

/* ── Copy. Tcules' voice: precise, calm, no hype. ─────────────────────────────────────────── */

const HOW_WE_WORK = {
  eyebrow: 'How we work',
  heading: 'Every decision traced',
  lead: 'Research, strategy and interface design share one wall, so every screen points back to a reason.',
  tiles: [
    {
      icon: 'users-group-rounded',
      title: 'The people who build',
      body: 'The designers and engineers in the first workshop are the ones who ship.',
    },
    {
      icon: 'refresh',
      title: 'Weekly working sessions',
      body: 'Ninety minutes a week at the board with your team, deciding, not presenting.',
    },
    {
      icon: 'flag',
      title: 'A written trail',
      body: 'Every decision is logged with its reason, so a new hire can follow it later.',
    },
    {
      icon: 'eye',
      title: 'Tested, then polished',
      body: 'Rough prototypes meet real users before anyone spends a week on pixels.',
    },
  ],
} as const satisfies { tiles: readonly Tile[] } & Record<string, unknown>;

const DIRECTION = {
  eyebrow: 'Design direction',
  heading: 'A language that lasts',
  lead: 'We set the direction on the wall first, then turn it into rules your designers apply without us.',
  tiles: [
    {
      icon: 'ruler-pen',
      title: 'Drawn on real screens',
      body: 'Type, colour and imagery are chosen against working screens, not a moodboard.',
    },
    {
      icon: 'layers',
      title: 'Tokens, not opinions',
      body: 'Each decision lands as a named token, read the same by code and design file.',
    },
    {
      icon: 'monitor',
      title: 'Judged in context',
      body: 'Every direction is reviewed on three screens side by side, never one hero.',
    },
    {
      icon: 'key',
      title: 'Built to hand over',
      body: 'Your team receives the library, its reasoning and a session on extending it.',
    },
  ],
} as const satisfies { tiles: readonly Tile[] } & Record<string, unknown>;

const DISCOVERY_TILES: readonly Tile[] = [
  {
    icon: 'flag',
    title: 'Ranked by value',
    body: 'Each opportunity is scored on reach, effort and risk, with the evidence shown.',
  },
  {
    icon: 'lock',
    title: 'Fixed time and fee',
    body: 'Ten working days at one price, agreed before the first interview is booked.',
  },
];

const RESEARCH_TICKS = [
  {
    title: 'Five users, every fortnight',
    body: 'A standing panel, so testing never waits for a recruitment brief.',
  },
  {
    title: 'Findings within two days',
    body: 'A short written read-out, ranked by how much each finding should change.',
  },
  {
    title: 'Your team in the room',
    body: 'Product owners watch the sessions live and take part in the synthesis.',
  },
];

const QUESTIONS = [
  {
    question: 'What does the first month look like?',
    answerHtml:
      '<p>Two weeks of discovery with your team, then a ranked plan and the first working prototype in front of users by the end of week four.</p>',
  },
  {
    question: 'Who from our side needs to be involved?',
    answerHtml:
      '<p>One product owner who can make decisions, and an engineer for the weekly session. Everyone else is welcome but optional.</p>',
  },
  {
    question: 'Can you work inside our design system?',
    answerHtml:
      '<p>Yes. We extend the system you have, and every new component lands in it with its tokens and documentation.</p>',
  },
  {
    question: 'How do you hand the work over?',
    answerHtml:
      '<p>Through the library itself, a written decision log and a working session with the team that will carry it on.</p>',
  },
];

const ENGINEERING_TILES: readonly Tile[] = [
  {
    icon: 'code',
    title: 'Components, not mockups',
    body: 'Screens are built from the real library, so a review sees production behaviour.',
  },
  {
    icon: 'shield-check',
    title: 'Accessible from day one',
    body: 'Contrast, focus order and names are checked in every review, not at launch.',
  },
  {
    icon: 'database',
    title: 'Real data early',
    body: 'Prototypes run on a copy of your data, so crowded states show up in week two.',
  },
  {
    icon: 'layers',
    title: 'One source of truth',
    body: 'Design files and code share one set of tokens, so one change is both.',
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
    short: 'Studio · 4 tiles',
    name: 'Photo left, four tiles, the counterweight at the end',
    note: 'The default B band, as product-design sets it. Our own studio board at 477 × 596 beside a display head and a 2 × 2 of tiles. The copy ends in tiles, not an action, so it is centred on the photograph. The texture sits in the far corner, inside the padding and clear of the copy.',
    facts: ['studio-sticky-board-ux', 'display head', 'counterweight · end'],
  },
  stock: {
    id: 'studio-against-stock',
    short: 'Stock · 4 tiles',
    name: 'The same band with a stock photograph',
    note: 'Identical copy and placement, so the photograph is the only difference. Studio comes first wherever it resolves, because it shows our own work; stock takes over everywhere else, chosen as a calm product scene from the page’s temperature family.',
    facts: ['designer-desk-monitor', 'neutral · quiet', 'counterweight · end'],
  },
  end: {
    id: 'photo-end-four-tiles',
    short: 'Photo end · 4 tiles',
    name: 'Photo right, four tiles, the counterweight at the start',
    note: 'media.side="end" mirrors the tracks and keeps the photo’s 5; the counterweight follows to the opposite corner. Consecutive media bands on a page alternate side (§ 3.2 rule 4). Below 1024 the photo still leads the copy.',
    facts: ['side · end', 'designer-monitor-ui', 'counterweight · start'],
  },
  ask: {
    id: 'two-tiles-ctarow',
    short: 'Two tiles · CtaRow',
    name: 'Photo left, two tiles and a CtaRow, edge-aligned',
    note: 'Copy that ends in an action under blocks stretches to the photograph: the eyebrow sits on its top edge, and the tiles and the CtaRow are pinned together to its bottom edge, so the stretch opens under the lead. The ask is a blue link, never a solid: the texture is the band’s blue mass.',
    facts: ['pinLast', 'two shared edges', 'counterweight · end'],
  },
  lead: {
    id: 'lead-ctarow',
    short: 'Lead · CtaRow',
    name: 'Photo left, the head and a CtaRow, centred',
    note: 'With nothing between the head and the action there is nothing to fill a stretch, so the copy is centred on the photograph and the CtaRow drops its rule. The blue eyebrow carries the accent above the display head.',
    facts: ['centred', 'rule={false}', 'counterweight · end'],
  },
  list: {
    id: 'ruled-list',
    short: 'Ruled list',
    name: 'Photo left, a ruled list with ticks',
    note: 'The second copy-side shape. Three ListCard rows, each closing on its hairline with a blue tick beside the copy: the set reads down rather than across, so a page with two B bands gives one tiles and the other this.',
    facts: ['ListCard row · sm', 'check-circle', 'counterweight · end'],
  },
  faq: {
    id: 'accordion',
    short: 'Accordion',
    name: 'Photo right, an accordion with the first row open',
    note: 'The third shape, after Executra: the copy column holds an Accordion, its first answer open so the band never lands closed. The open row is the one block of running text; the rest are questions a reader can scan.',
    facts: ['Accordion', 'first open', 'counterweight · start'],
  },
  bare: {
    id: 'no-texture',
    short: 'No texture',
    name: 'Photo right, four tiles, no texture',
    note: 'The band is complete without its texture. A page spends at most three placements and never two in adjacent bands (§ 6.4), so a B band after a textured band goes bare and keeps its shape. Blue stays in the foreground: the eyebrow and the icons.',
    facts: ['side · end', 'hands-trackpad', 'no blue mass'],
  },
} as const satisfies Record<string, Variation>;

const ORDER: readonly Variation[] = [
  V.studio,
  V.stock,
  V.end,
  V.ask,
  V.lead,
  V.list,
  V.faq,
  V.bare,
];

const number = (variation: Variation) => String(ORDER.indexOf(variation) + 1).padStart(2, '0');

/**
 * One variation: its tint label strip, then the band. The wrapper is the `data-shot` block the
 * shots gate crops, and its first `<p>` — the index line — names the crop, so the file is called
 * what the band is (fix round 1: crops were named off by one, and band 01 had no name at all).
 */
function Variant({ variation, children }: { variation: Variation; children: ReactNode }) {
  return (
    <div data-shot="">
      <Section surface="tint" density="tight" id={variation.id}>
        <Layout columns={{ lg: [1, 2] }} colGap="section" rowGap="block" align="start">
          <Layout rowGap="tight">
            <p className={t.index}>{`${number(variation)} · ${variation.short}`}</p>
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
      {children}
    </div>
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
            <h1 className={t.display}>The photograph and the argument</h1>
            <p className={t.lead}>
              One ContentSection, one 4:5 photograph and a display head over a short body: tiles,
              a ruled list or an accordion. Blue marks where to look. Every band is shot at 390
              too, where the photo moves above the copy at 4:3.
            </p>
          </Layout>
          <Layout as="ol" rowGap="text">
            {ORDER.map((variation) => (
              <li key={variation.id}>
                <Button
                  as="a"
                  href={`#${variation.id}`}
                  emphasis="link"
                  size="sm"
                  icon={<Icon name="arrow-right" />}
                >
                  {`${number(variation)} · ${variation.short}`}
                </Button>
              </li>
            ))}
          </Layout>
        </Layout>
      </Section>

      <Variant variation={V.studio}>
        <ContentSection
          arrangement="media"
          media={{ image: STUDIO_BOARD }}
          eyebrow={HOW_WE_WORK.eyebrow}
          heading={HOW_WE_WORK.heading}
          headingId="b-studio"
          lead={HOW_WE_WORK.lead}
          texture={<TextureCounterweight side="end" />}
        >
          <Tiles tiles={HOW_WE_WORK.tiles} />
        </ContentSection>
      </Variant>

      <Variant variation={V.stock}>
        <ContentSection
          arrangement="media"
          media={{ image: photo('designer-desk-monitor') }}
          eyebrow={HOW_WE_WORK.eyebrow}
          heading={HOW_WE_WORK.heading}
          headingId="b-stock"
          lead={HOW_WE_WORK.lead}
          texture={<TextureCounterweight side="end" />}
        >
          <Tiles tiles={HOW_WE_WORK.tiles} />
        </ContentSection>
      </Variant>

      <Variant variation={V.end}>
        <ContentSection
          arrangement="media"
          media={{ image: photo('designer-monitor-ui'), side: 'end' }}
          eyebrow={DIRECTION.eyebrow}
          heading={DIRECTION.heading}
          headingId="b-end"
          lead={DIRECTION.lead}
          texture={<TextureCounterweight side="start" />}
        >
          <Tiles tiles={DIRECTION.tiles} />
        </ContentSection>
      </Variant>

      <Variant variation={V.ask}>
        <ContentSection
          arrangement="media"
          media={{ image: photo('workshop-brick-room') }}
          eyebrow="Discovery"
          heading="Two weeks, one plan"
          headingId="b-ask"
          lead="A short, fixed engagement that ends with a ranked plan and the evidence behind every item on it."
          texture={<TextureCounterweight side="end" />}
          footer={
            <CtaRow
              actions={[PLAN_DISCOVERY, SEE_PLAN]}
              note="Most of our engagements start here."
            />
          }
        >
          <Tiles tiles={DISCOVERY_TILES} />
        </ContentSection>
      </Variant>

      <Variant variation={V.lead}>
        <ContentSection
          arrangement="media"
          media={{ image: photo('hands-sketches-markers') }}
          eyebrow="Sketch first"
          heading="Paper before pixels"
          headingId="b-lead"
          lead="A sketch is cheap to throw away and a coded screen is not, so every interface we make starts as one."
          texture={<TextureCounterweight side="end" />}
          footer={<CtaRow actions={[SEE_WORK]} rule={false} />}
        />
      </Variant>

      <Variant variation={V.list}>
        <ContentSection
          arrangement="media"
          media={{ image: photo('whiteboard-two-hands') }}
          eyebrow="User research"
          heading="Research on a rhythm"
          headingId="b-list"
          lead="Research runs on a fixed rhythm beside the design work, not as a phase before it."
          texture={<TextureCounterweight side="end" />}
        >
          <Ticks items={RESEARCH_TICKS} />
        </ContentSection>
      </Variant>

      <Variant variation={V.faq}>
        <ContentSection
          arrangement="media"
          media={{ image: photo('wireframe-wall'), side: 'end' }}
          eyebrow="Working together"
          heading="Before we start"
          headingId="b-faq"
          texture={<TextureCounterweight side="start" />}
        >
          <Accordion items={QUESTIONS} />
        </ContentSection>
      </Variant>

      <Variant variation={V.bare}>
        <ContentSection
          arrangement="media"
          media={{ image: photo('hands-trackpad'), side: 'end' }}
          eyebrow="Design engineering"
          heading="Designed to ship"
          headingId="b-bare"
          lead="Engineers join the design reviews from the first week, so what we draw can ship on time."
        >
          <Tiles tiles={ENGINEERING_TILES} />
        </ContentSection>
      </Variant>
    </>
  );
}
