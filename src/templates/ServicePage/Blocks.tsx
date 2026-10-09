import {
  Layout,
  Media,
  Stat,
} from '@/components';
import {
  Accordion,
  BlockCard,
  BlockCardSet,
  Callout,
  Contrast,
  ContentSectionText,
  DataTable,
  ListCard,
  LogoGrid,
  ProcessFlow,
  Proof,
  ReadDown,
  Slider,
  Steps,
  Thread,
  type BlockCardSetItem,
  type ListCardForm,
  type ListCardSize,
} from '@/patterns';
import { HEAD_TRACK } from '@/lib/image-sizes';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import type {
  ServiceStory,
  StoryBlock,
  StoryCover,
  StorySlot,
} from '@/lib/service-story';

import { Bridge, Matrix, Parts, Record, Slice, Spectrum } from './Diagrams';
import { SetHeading } from './SetHeading';
import { paragraph } from './text';
import styles from './Blocks.module.css';

/**
 * The service page's blocks, as kit units (cmp-service-pages, 6 Oct 2026). Each StoryBlock is a
 * JOB, and each job renders as the kit unit that does it — Steps (F), ReadDown (D), the icon router
 * (C-icon), BlockCardSet (C-pair, M), Proof and its Slider (G), Contrast (N), Thread (E), the
 * LogoGrid (H), Stat (the D aside) — so this file draws no tile, row or card of its own. What stays
 * template-local is the six diagrams in Diagrams.tsx (Spectrum, Matrix, Record, Parts, Slice,
 * Bridge): each is one service page's argument, not a reusable unit (visual-direction § 3.4 E).
 *
 * Every word a reader sees comes from the story: the case link and the scope key are the story's
 * `labels`, so the template carries no page copy of its own (ServicePage audit, 6 Oct 2026).
 */

export type Of<K extends StoryBlock['kind']> = Extract<StoryBlock, { kind: K }>;
export type Labels = ServiceStory['labels'];

/* ── Item sets ────────────────────────────────────────────────────────────────
   A set in a grid is tiles; a set in one column is rows. Tiles take `sm`; rows of four or more take
   `sm` (h5 over body), shorter row sets keep `md` (visual-direction § 7.2). */
const SMALL_SET_FROM = 4;

function setSize(count: number, form: ListCardForm): ListCardSize {
  return form === 'tile' || count >= SMALL_SET_FROM ? 'sm' : 'md';
}

/** A photograph that fills a head-track aside box (ContentSection `asideFill`). */
export function AsidePhoto({ id }: { id: PhotoId }) {
  return <Media image={getKitPhoto(id)} fit="fill" sizes={HEAD_TRACK} />;
}

/** A card's cover as BlockCard's media slot: never an empty frame (§ 5.7). */
function coverMedia(cover: StoryCover | undefined) {
  return cover ? { type: 'image' as const, image: cover } : undefined;
}

/* ── Signals ──────────────────────────────────────────────────────────────────
   The symptom is the title, the hypothesis the body: tiles, a blue glyph over each. In B's copy
   column they are two up from md and a `stack` apart down (the media-split tiles); stacked under a
   head they run as many across as the set asks for at lg, a `column` apart (the row seam, § 1.2). */
export function Signals({ block, inSplit }: { block: Of<'signals'>; inSplit?: boolean }) {
  return (
    <Layout
      as="ul"
      columns={inSplit ? { base: 1, md: 2 } : { base: 1, md: 2, lg: block.columns }}
      colGap="gutter"
      rowGap={inSplit ? 'stack' : 'column'}
    >
      {block.items.map((item) => (
        <ListCard
          key={item.title}
          form="tile"
          size={setSize(block.items.length, 'tile')}
          titleAs="h3"
          title={item.title}
          body={item.body}
          marker={item.icon ? { type: 'icon', name: item.icon } : undefined}
        />
      ))}
    </Layout>
  );
}

/* ── Steps (F) ────────────────────────────────────────────────────────────────
   The approved method (§ 3.6): Steps, numbered rows read top to bottom, the worked example as an
   `example` Callout above them when the story has one. */
export function StepsBlock({ block }: { block: Of<'steps'> }) {
  const steps = <Steps steps={block.items} />;
  if (!block.example) return steps;
  return (
    <Layout rowGap="stack">
      <Callout
        tone="example"
        label={block.example.label}
        html={paragraph(block.example.body)}
      />
      {steps}
    </Layout>
  );
}

/* ── Ledger (D) ───────────────────────────────────────────────────────────────
   Named things with a glyph each read down as ReadDown rows: one column to three rows, two from
   four (§ 1.4 rule 8). A read-down set never exceeds six, so a longer ledger is a grid of tiles
   (the set reads across, two or three up), and a story that hits it should be cut to the six that
   matter. A numbered ledger keeps ListCard's numbered rows. A ledger with a heading names its set
   with SetHeading over it — the h3 role, always a step above the item titles (owner, 7 Oct 2026:
   the h5 heading sat under h4 rows), the items `h4` beneath it. A tile set's rows sit a `stack` apart, block to block (fix round 2: they were
   `column`, 64, which on a phone put a column gutter between every stacked tile and ran the stress
   stat band to 1699 of 1700). A tile opens on its own rule, so 48 still reads as the next object. */
const READ_DOWN_MAX = 6;

export function Ledger({ block }: { block: Of<'ledger'> }) {
  const tiles = block.marker !== 'number' && block.items.length > READ_DOWN_MAX;
  const rows = tiles ? (
    <Layout as="ul" columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="stack">
      {block.items.map((item) => (
        <ListCard
          key={item.title}
          form="tile"
          size="sm"
          titleAs={block.heading ? 'h4' : 'h3'}
          title={item.title}
          body={item.body || undefined}
          marker={
            block.marker === 'icon' && item.icon ? { type: 'icon', name: item.icon } : undefined
          }
        />
      ))}
    </Layout>
  ) : block.marker === 'number' ? (
    <Layout as="ol" rowGap="none">
      {block.items.map((item, index) => (
        <ListCard
          key={item.title}
          arrangement="stacked"
          size={setSize(block.items.length, 'row')}
          titleAs={block.heading ? 'h4' : 'h3'}
          title={item.title}
          body={item.body || undefined}
          marker={{ type: 'number', value: index + 1 }}
        />
      ))}
    </Layout>
  ) : (
    <ReadDown
      columns={block.items.length > 3 ? 2 : 1}
      titleAs={block.heading ? 'h4' : 'h3'}
      rows={block.items.map((item) => ({
        title: item.title,
        body: item.body || undefined,
        icon: block.marker === 'icon' ? item.icon : undefined,
      }))}
    />
  );
  if (!block.heading) return rows;
  return (
    <Layout rowGap="block">
      <SetHeading>{block.heading}</SetHeading>
      {rows}
    </Layout>
  );
}

/* ── Router ───────────────────────────────────────────────────────────────────
   "Which one is mine?" With a glyph on every route, the C-icon router (cmp-services): linked icon
   cards under the band's stacked head (owner, 9 Oct 2026: a section of clickable cards never sets
   its head beside them), the service as the card's name and the condition that sends you there as
   its body — boxed (owner, 7 Oct 2026; borderless since 9 Oct), so four to six destinations read
   as separate targets. The count picks the tracks (BlockCardSet): four across, or six as two rows
   of three. Without glyphs, the list router: linked ListCard rows. The non-service route (an
   audit) is the last item, for the reader who cannot name the condition. */
export function Router({ block }: { block: Of<'router'> }) {
  const all = [
    ...block.items.map((item) => ({ when: item.when, link: item.route, icon: item.icon })),
    ...(block.also ? [block.also] : []),
  ];
  if (all.every((item) => item.icon)) {
    const items: BlockCardSetItem[] = all.map((item) => ({
      id: item.link.href,
      icon: item.icon,
      title: item.link.label,
      body: item.when,
      href: item.link.href,
    }));
    /* Stacked on a phone (`scroll="never"`): a router shows every route at once, never one and a
       fifth of six behind a gesture (fix round 1). */
    return <BlockCardSet items={items} lead="none" scroll="never" frame="box" />;
  }
  const size = setSize(all.length, 'row');
  return (
    <Layout as="ul" rowGap="none">
      {all.map((item) => (
        <ListCard
          key={item.link.href}
          size={size}
          titleAs="h3"
          title={item.link.label}
          body={item.when}
          href={item.link.href}
        />
      ))}
    </Layout>
  );
}

/* ── Cases (C-pair, M) ────────────────────────────────────────────────────────
   BlockCardSet with `lead="none"`, peers and never a featured first card (§ 1.4 rule 4): two cards
   are the C-pair at 3:2 beside the head, three or more the M set at 16:9 under a centred head. The
   boundary note is the C-pair's CtaRow note, or a Callout a `stack` under the M set (§ 1.1 S4). */
export function Cases({
  block,
  labels,
  withNote,
}: {
  block: Of<'cases'>;
  labels: Labels;
  withNote: boolean;
}) {
  /* Stacked on a phone (`scroll="never"`, fix round 2): a page's cases are its proof, and a scroll
     row showed one card and a sliver of the next, two of three behind a gesture. */
  const set = (
    <BlockCardSet
      lead="none"
      scroll="never"
      items={block.items.map((item) => ({
        id: item.slug,
        eyebrow: item.client,
        title: item.title,
        body: item.body,
        href: item.href,
        ctaLabel: labels.caseCta,
        media: coverMedia(item.cover),
      }))}
    />
  );
  if (!withNote || !block.note) return set;
  return (
    <Layout rowGap="stack">
      {set}
      <Callout label={labels.scope} html={paragraph(block.note)} />
    </Layout>
  );
}

/* ── Proof (G) ────────────────────────────────────────────────────────────────
   Never a rating beside a client quote (owner, 7 Oct 2026): the score leads the hero instead.
   Without a case: the typographic quote, centred (kit G·02). With further voices it turns them in
   an auto-advancing one-up Slider (r7-testimonials' slider variant), each slide the same centred
   Proof. With a case: G-case, the WORK first, then what the client said (§ 3.6, owner 1 Oct) — the
   case card carries its client, title and link and NO description (owner, 7 Oct 2026: the card and
   the quote were five-plus competing elements). No portrait: a stock face beside a real name is a
   fabricated likeness (§ 5.8). */
type StoryQuote = Of<'proof'>['quote'];

function proofQuote(quote: StoryQuote) {
  return {
    quoteHtml: paragraph(quote.text),
    name: quote.name,
    role: quote.role,
    company: quote.company,
  };
}

export function ProofBlock({ block, labels }: { block: Of<'proof'>; labels: Labels }) {
  const quote = proofQuote(block.quote);
  const caseCard = block.case;
  if (!caseCard) {
    const voices = [block.quote, ...(block.voices ?? [])];
    if (voices.length < 2) return <Proof quote={quote} align="center" />;
    return (
      <Slider label="Client quotes" slideName="testimonial" perView={1} align="center" autoplay>
        {voices.map((voice) => (
          <li key={voice.name}>
            <Proof quote={proofQuote(voice)} align="center" />
          </li>
        ))}
      </Slider>
    );
  }
  return (
    <Proof
      arrangement="case"
      quote={quote}
      work={
        <Layout as="ul" rowGap="none">
          <BlockCard
            eyebrow={caseCard.client}
            title={caseCard.title}
            href={caseCard.href}
            ctaLabel={labels.caseCta}
            media={coverMedia(caseCard.cover)}
            tracks={3}
          />
        </Layout>
      }
    />
  );
}

/* ── Logos (H) ────────────────────────────────────────────────────────────────
   The client marks as the boxed LogoGrid (r7-logos): each mark in its own closed cell, equal weight.
   The band's head is the grid's own context line (Bands.tsx); here, a set after another block, it
   is the grid alone. Never the score beside the marks: proof types are not combined in one section
   (owner, 9 Oct 2026), so the story's rating leads the hero instead (ServicePage). */
export function Logos({
  block,
  context,
  headingId,
}: {
  block: Of<'logos'>;
  context?: string;
  headingId?: string;
}) {
  return <LogoGrid marks={block.marks} context={context} headingId={headingId} />;
}

/* ── Stat (D) ─────────────────────────────────────────────────────────────────
   One figure is the head track's large thing (§ 3.3: D always has an aside); what the counted work
   consisted of is the body, as ReadDown rows — unnumbered, because these are responsibilities, not
   an order (1 Oct 2026). The sentence that qualifies the figure is the band's lead's job. */
export function StatAside({ block }: { block: Of<'stat'> }) {
  return <Stat value={block.value} label={block.label} />;
}

export function StatRows({ block }: { block: Of<'stat'> }) {
  const items = block.items ?? [];
  if (items.length === 0) {
    return (
      <ContentSectionText>
        <p className={styles.statBody}>{block.body}</p>
      </ContentSectionText>
    );
  }
  if (items.length > READ_DOWN_MAX) {
    return (
      <Layout as="ul" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
        {items.map((item) => (
          <ListCard
            key={item.title}
            form="tile"
            size="sm"
            titleAs="h3"
            title={item.title}
            body={item.body}
          />
        ))}
      </Layout>
    );
  }
  return (
    <ReadDown
      columns={items.length > 3 ? 2 : 1}
      rows={items.map((item) => ({ title: item.title, body: item.body }))}
    />
  );
}

/* ── Resources (M) ────────────────────────────────────────────────────────────
   Where to read further: linked covers, three tracks from lg whatever the count — a card's width
   comes from the page's grid, not from its count (1 Oct 2026). */
export function Resources({ block }: { block: Of<'resources'> }) {
  return (
    <BlockCardSet
      lead="none"
      across={3}
      scroll="never"
      items={block.items.map((item) => ({
        id: item.href,
        eyebrow: item.type,
        title: item.title,
        body: item.body,
        href: item.href,
        ctaLabel: item.cta,
        media: coverMedia(item.cover),
      }))}
    />
  );
}

/* ── Slot ─────────────────────────────────────────────────────────────────────
   REVIEW MODE ONLY (`?slots=1`): where an image should exist and does not yet. Never rendered on a
   shipped page, so its keys are review chrome rather than page copy — they label the brief for the
   person deciding whether to commission the image, and no reader of the page meets them. */
export function Slot({ slot }: { slot: StorySlot }) {
  return (
    <aside
      className={styles.slot}
      data-ratio={slot.ratio ?? 'auto'}
      aria-label="Image recommendation"
    >
      <Layout rowGap="block">
        <span className={styles.key}>
          Image slot · {slot.kind}
          {slot.ratio ? ` · ${slot.ratio.replace('/', ':')}` : ''}
        </span>
        <Layout rowGap="tight">
          <span className={styles.key}>What it says</span>
          <p className={styles.slotMessage}>{slot.message}</p>
        </Layout>
        <Layout rowGap="tight">
          <span className={styles.key}>What it shows</span>
          <p className={styles.slotBrief}>{slot.shows}</p>
        </Layout>
        {slot.placement ? (
          <Layout rowGap="tight">
            <span className={styles.key}>Why here</span>
            <p className={styles.slotBrief}>{slot.placement}</p>
          </Layout>
        ) : null}
      </Layout>
    </aside>
  );
}

/**
 * Any block, in a band that does not give it a role of its own: the body of an E band, or a block
 * after the first in any band (a note under a set, a second diagram).
 */
export function StoryBlockView({
  block,
  labels,
  slots,
}: {
  block: StoryBlock;
  labels: Labels;
  slots: boolean;
}) {
  switch (block.kind) {
    case 'signals':
      return <Signals block={block} />;
    case 'steps':
      return <StepsBlock block={block} />;
    case 'ledger':
      return <Ledger block={block} />;
    case 'router':
      return <Router block={block} />;
    case 'cases':
      return <Cases block={block} labels={labels} withNote />;
    case 'fit':
      /* The needs lead and the exclusions are its quieter boundary (fix round 2): two equal text
         lists read as a document table. */
      return <Contrast yes={block.yes} no={block.no} emphasis="yes" />;
    case 'proof':
      return <ProofBlock block={block} labels={labels} />;
    case 'spectrum':
      return <Spectrum block={block} />;
    case 'table':
      return (
        <DataTable
          summary={block.summary}
          keyColumn={{ heading: block.keyColumn }}
          columns={block.columns.map((heading) => ({ heading }))}
          rows={block.rows.map((row) => ({
            header: row.header,
            cellsHtml: row.cells.map(paragraph),
          }))}
        />
      );
    case 'record':
      return <Record block={block} />;
    case 'matrix':
      return <Matrix block={block} />;
    case 'flow':
      return (
        <ProcessFlow actor={block.actor} stages={block.stages} throughout={block.throughout} />
      );
    case 'parts':
      return <Parts block={block} />;
    case 'slice':
      return <Slice block={block} />;
    case 'bridge':
      return <Bridge block={block} />;
    case 'thread':
      return <Thread stages={block.items} loop={block.loop} />;
    case 'logos':
      return <Logos block={block} />;
    case 'stat':
      return <StatRows block={block} />;
    case 'faq':
      return (
        <ContentSectionText>
          <Accordion items={block.items} />
        </ContentSectionText>
      );
    case 'note':
      return <Callout label={block.label} html={block.html} />;
    case 'resources':
      return <Resources block={block} />;
    case 'slot':
      return slots ? <Slot slot={block.slot} /> : null;
  }
}
