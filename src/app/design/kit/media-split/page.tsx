import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import {
  Button,
  Cluster,
  Icon,
  Layout,
  Section,
  Tag,
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
 * chooses — ListCard tiles, a ruled ListCard list, an Accordion, or nothing but a CtaRow — and the
 * photograph's WEIGHT chosen to match. Every band below is a live ContentSection, edge to edge as on
 * a route, so each can be measured against the fold (≤ 830 at 1470 × 830, ≤ 1700 at 390;
 * fold.config.json lists the route and `npm run fold:check` measures it).
 *
 * Laid out as a showcase: an intro band that indexes the family, then each variation as a tint
 * label strip followed by the band itself. Each pair is one `data-shot` block, so `npm run shots --
 * kit/media-split` crops it at 1440 and 390 under its own name; the 390 crops are the phone proof.
 *
 * The rules each band carries (final fix round, 6 Oct 2026):
 *   - copy that needs the width (four tiles, a ruled list) takes the 667 and the photo 4:5 in 477;
 *     copy that is short (a head and a CtaRow, an accordion, two tiles and a CtaRow) gives the photo
 *     the 667 at 6:5 (`media.weight="photo"`), so the photograph sets the band's weight;
 *   - the head is display scale unless the band sets `media.head="title"` — an explicit choice, and
 *     fold:check fails a head that runs long;
 *   - a copy column with room for it ends in the counterweight (`media.counterweight`), a defined
 *     field of the pixel grid on the photo's bottom edge; a full copy column carries none;
 *   - tiles are a mark over a head-and-body group, and an icon-and-title row on a phone;
 *   - blue is the foreground accent in every band: the eyebrow, the 32 icons, every link.
 *
 * Photographs: one temperature family for the whole page (§ 5.5 rule 1) — warm and neutral, every
 * one `quiet`, none twice. Landscape masters sit in the 6:5 photo-led slot and portrait masters in
 * the 4:5 one, so no frame is upscaled.
 */

const photo = (id: PhotoId, focus?: MediaFocus) => {
  const image = getKitPhoto(id);
  return focus ? { ...image, focus } : image;
};

/* The studio board (922 × 1248) is narrower than both of its slots, so the crop only ever trims its
   HEIGHT and only `y` matters: 8% at 4:5, 45% at the phone's 4:3. y 0.2 keeps the three column
   headings (Discovery, Strategy/UX, Visual/UI design) in the 4:3 crop, where the panel found them
   cut off — the board is the subject, not the hand. x 0.62 serves the 1024 case, where the box can
   stretch past 4:5 and the crop narrows instead. */
const STUDIO_BOARD = photo('studio-sticky-board-ux', { x: 0.62, y: 0.2 });

type Tile = { icon: IconName; title: string; body: string };

/**
 * The B tiles: ListCard `form="tile"` in a Layout — `gutter` (32) across, `stack` (48) down. Every
 * marker is a SOLID Solar Bold glyph with a mass of its own (no `refresh` or `code`, whose bold
 * drawings are line-weight arrows and chevrons), at the tile's 32, so a set reads as one system and
 * the blue reads as a mark rather than a speck. On a phone each tile is an icon-and-title row.
 *
 * `columns` is the set's, because the track it sits in is: two up from md in the copy-led 667,
 * and two up only from xl in the photo-led 477, which at 1024–1439 is too narrow for two.
 */
function Tiles({
  tiles,
  columns = { base: 1, md: 2 },
}: {
  tiles: readonly Tile[];
  columns?: { base: number; md: number; lg?: number; xl?: number };
}) {
  return (
    <Layout as="ul" columns={columns} colGap="gutter" rowGap="stack">
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
 * Unlinked rows sit flush with the column (ListCard `.still`), so the ticks hold the head's edge.
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
      icon: 'chat-round-dots',
      title: 'Weekly working sessions',
      body: 'Ninety minutes a week at the board with your team, deciding, not presenting.',
    },
    {
      icon: 'notebook',
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

const PLAN_DISCOVERY = { label: 'Plan a discovery', href: ROUTES.contact };
const SEE_PLAN = { label: 'See a sample plan', href: ROUTES.caseStudies };
const SEE_WORK = { label: 'See the work', href: ROUTES.caseStudies };
const TALK_ENGINEERING = { label: 'Talk to an engineer', href: ROUTES.contact };

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
    name: 'Photo left, four tiles',
    note: 'The copy-led band, as product design sets it: our own studio board at 4:5 in 477 beside a display head and a 2 × 2 of tiles in 667. The copy fills the photograph’s height, so it is centred on it and needs no counterweight — the tiles are the mass. On a phone each tile becomes an icon-and-title row.',
    facts: ['weight · copy', 'studio-sticky-board-ux', 'no texture'],
  },
  stock: {
    id: 'studio-against-stock',
    short: 'Stock · 4 tiles',
    name: 'The same band with a stock photograph',
    note: 'Identical copy and placement, so the photograph is the only difference. Studio comes first wherever it resolves, because it shows our own work; stock takes over everywhere else, chosen as a calm product scene from the page’s temperature family.',
    facts: ['weight · copy', 'designer-desk-monitor', 'neutral · quiet'],
  },
  end: {
    id: 'photo-end-four-tiles',
    short: 'Photo end · 4 tiles',
    name: 'Photo right, four tiles',
    note: 'media.side="end" mirrors the tracks and keeps the photo’s width. Consecutive media bands on a page alternate side (§ 3.2 rule 4). Below 1024 the photo still leads the copy.',
    facts: ['side · end', 'hands-sketches-markers', 'no texture'],
  },
  ask: {
    id: 'two-tiles-ctarow',
    short: 'Two tiles · CtaRow',
    name: 'Photo leads, two tiles and a CtaRow, edge-aligned',
    note: 'Short copy gives the photograph the 667 at 6:5. Two tiles and a CtaRow in 477 then fill the photo’s height, so the copy shares its top and bottom edges with nothing left to pin: the gap that pinning opened beside a 596 photo (open question 7) does not arise, and pinned and centred render alike.',
    facts: ['weight · photo', 'head · title', 'pinLast'],
  },
  lead: {
    id: 'lead-ctarow',
    short: 'Lead · CtaRow',
    name: 'Photo leads, the head and a CtaRow, the counterweight at the end',
    note: 'The shortest copy and the largest photograph. The display head, its lead and one link sit on the photo’s top edge; the counterweight, a defined field of the pixel grid, sits on its bottom edge in the copy column, as QuantumLab’s strip sits under its text. The ask is a blue link, never a solid: the field is the band’s blue mass.',
    facts: ['weight · photo', 'counterweight · end', 'display head'],
  },
  list: {
    id: 'ruled-list',
    short: 'Ruled list',
    name: 'Photo right, a ruled list with ticks, no texture',
    note: 'The second copy-side shape. Three ListCard rows, each closing on its hairline with a blue tick on the column’s edge: the set reads down rather than across, so a page with two B bands gives one tiles and the other this. The column is full, so the band goes bare.',
    facts: ['weight · copy', 'ListCard row · sm', 'no texture'],
  },
  faq: {
    id: 'accordion',
    short: 'Accordion',
    name: 'Photo leads, an accordion with the first row open',
    note: 'After Executra: the photograph at 6:5 in 667, the copy column an Accordion with its first answer open so the band never lands closed. The head keeps the h2 role (head="title") so four questions fit the photo’s height.',
    facts: ['weight · photo', 'head · title', 'Accordion'],
  },
  mirror: {
    id: 'counterweight-start',
    short: 'Counterweight start',
    name: 'Photo right, a head and two actions, the counterweight at the start',
    note: 'The counterweight follows the copy, so with the photo at the end it sits at the start. The head carries its actions (rule off) under the lead; the field closes the column on the photo’s bottom edge.',
    facts: ['side · end', 'weight · photo', 'counterweight · start'],
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
  V.mirror,
];

const number = (variation: Variation) => String(ORDER.indexOf(variation) + 1).padStart(2, '0');

/**
 * One variation: its tint label strip, then the band. The wrapper is the `data-shot` block the
 * shots gate crops, and its first `<p>` — the index line — names the crop, so the file is called
 * what the band is.
 */
function Variant({ variation, children }: { variation: Variation; children: ReactNode }) {
  return (
    <div data-shot="">
      <Section surface="tint" id={variation.id}>
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
      <Section>
        <Layout columns={{ lg: [1, 1] }} colGap="section" rowGap="stack" align="end">
          <Layout rowGap="block">
            <p className={t.eyebrow}>UI kit · Band B</p>
            <h1 className={t.display}>The photograph and the argument</h1>
            <p className={t.lead}>
              One ContentSection, one photograph and a short body: tiles, a ruled list, an
              accordion or a single ask. Long copy takes the wide column; short copy hands it to
              the photograph. Blue marks where to look. Every band is shot at 390 too, where the
              photo moves above the copy at 4:3.
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
        >
          <Tiles tiles={HOW_WE_WORK.tiles} />
        </ContentSection>
      </Variant>

      <Variant variation={V.end}>
        <ContentSection
          arrangement="media"
          media={{ image: photo('hands-sketches-markers'), side: 'end' }}
          eyebrow={DIRECTION.eyebrow}
          heading={DIRECTION.heading}
          headingId="b-end"
          lead={DIRECTION.lead}
        >
          <Tiles tiles={DIRECTION.tiles} />
        </ContentSection>
      </Variant>

      <Variant variation={V.ask}>
        <ContentSection
          arrangement="media"
          media={{ image: photo('workshop-whiteboard-lounge'), weight: 'photo', head: 'title' }}
          eyebrow="Discovery"
          heading="Two weeks, one plan"
          headingId="b-ask"
          lead="A fixed engagement that ends in a ranked plan, with the evidence for every item on it."
          footer={
            <CtaRow
              actions={[PLAN_DISCOVERY, SEE_PLAN]}
              emphasis="solid"
              converts
              note="Most of our engagements start here."
            />
          }
        >
          <Tiles tiles={DISCOVERY_TILES} columns={{ base: 1, md: 2, lg: 1, xl: 2 }} />
        </ContentSection>
      </Variant>

      <Variant variation={V.lead}>
        <ContentSection
          arrangement="media"
          media={{
            image: photo('hand-sketch-wireframe'),
            weight: 'photo',
            counterweight: true,
          }}
          eyebrow="Sketch first"
          heading="Paper before pixels"
          headingId="b-lead"
          lead="A sketch is cheap to throw away and a coded screen is not, so every interface we make starts on paper."
          footer={<CtaRow actions={[SEE_WORK]} rule={false} />}
        />
      </Variant>

      <Variant variation={V.list}>
        <ContentSection
          arrangement="media"
          media={{ image: photo('workshop-brick-room'), side: 'end' }}
          eyebrow="User research"
          heading="Research on a rhythm"
          headingId="b-list"
          lead="Research runs on a fixed rhythm beside the design work, not as a phase before it."
        >
          <Ticks items={RESEARCH_TICKS} />
        </ContentSection>
      </Variant>

      <Variant variation={V.faq}>
        <ContentSection
          arrangement="media"
          media={{ image: photo('pair-laptop-notebook'), weight: 'photo', head: 'title' }}
          eyebrow="Working together"
          heading="Before we start"
          headingId="b-faq"
        >
          <Accordion items={QUESTIONS} />
        </ContentSection>
      </Variant>

      <Variant variation={V.mirror}>
        <ContentSection
          arrangement="media"
          media={{
            image: photo('pair-at-laptop-sticky-wall'),
            side: 'end',
            weight: 'photo',
            counterweight: true,
          }}
          eyebrow="Design engineering"
          heading="Designed to ship"
          headingId="b-mirror"
          lead="Engineers sit in the design reviews from the first week, so what we draw is what ships."
          actions={
            <CtaRow
              actions={[TALK_ENGINEERING, SEE_WORK]}
              emphasis="solid"
              converts
              rule={false}
            />
          }
        />
      </Variant>
    </>
  );
}
