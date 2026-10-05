import { BrandMark, Cluster, Icon, Layout, RatingBadge } from '@/components';
import {
  Accordion,
  BlockCard,
  BlockCardSet,
  Callout,
  DataTable,
  ListCard,
  ProcessFlow,
  Proof,
  type ListCardForm,
  type ListCardSize,
} from '@/patterns';
import type { StoryBlock, StoryCase, StorySlot } from '@/lib/service-story';

import { Bridge, Matrix, Parts, Record, Slice, Spectrum, Thread } from './Diagrams';
import { paragraph } from './text';
import styles from './Blocks.module.css';

type Of<K extends StoryBlock['kind']> = Extract<StoryBlock, { kind: K }>;

/* What is NOT in this file (30 Sep 2026 pass): a side-by-side pair of two text items. A key beside
   its sentence, a title beside its one-line body, a number beside its paragraph — each read as two
   columns of one thing. Two tracks are for two blocks that each hold several items; anything
   smaller stacks. */

/* ── Item sets ────────────────────────────────────────────────────────────────
   Signals, steps, ledgers and routes are four JOBS and one ITEM. Each is a set of named things —
   a marker, a title, a line under it, sometimes a destination — and that item is ListCard. What the
   job decides is the set: one column or a grid, ordered or not, which marker. It never decides the
   item's anatomy, which is how this file came to draw four tiles of its own (1 Oct 2026, owner:
   "we have similar components that i think can be used here").

   One rule picks the form. A set in one column is rows; a set in a grid is tiles. A row closes on
   its rule and keeps its marker beside the copy; a tile opens on its rule and stands its marker
   above, because in a grid only the tops of unequal items line up.

   One rule picks the type step (visual-direction § 7.2). A row cannot see its siblings, so the set
   passes it: tiles, and any set of four rows or more, take `sm` (h5 over body-sm); a shorter set of
   rows keeps `md` (h4 over body). Card titles sit at least two rungs under the band's h2. */
const SMALL_SET_FROM = 4;

function setSize(count: number, form: ListCardForm): ListCardSize {
  return form === 'tile' || count >= SMALL_SET_FROM ? 'sm' : 'md';
}

/* ── Signals ──────────────────────────────────────────────────────────────────
   A thing a reader can see, then what it may mean: the symptom is the title, the hypothesis the
   body. Tiles, because the point is to see them side by side as one instrument with N readings. */
function Signals({ block }: { block: Of<'signals'> }) {
  return (
    <Layout
      as="ul"
      columns={{ base: 1, md: 2, lg: block.columns }}
      colGap="gutter"
      rowGap="stack"
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

/* ── Steps ────────────────────────────────────────────────────────────────────
   A method, read top to bottom (1 Oct 2026, owner): ListCard rows in an <ol>, the number as the
   marker, the step's name beside the line that says what happens in it. It was five tiles across
   a row, and a row is how this page shows PEERS — five 220px columns broke every title onto two
   lines and read as five options to compare rather than one order to follow. The worked example,
   when there is one, is a Callout above the steps: the scene they are walked through. */
function Steps({ block }: { block: Of<'steps'> }) {
  return (
    <Layout rowGap="stack">
      {block.example ? (
        <Callout label={block.example.label} html={paragraph(block.example.body)} />
      ) : null}
      <Layout as="ol" rowGap="none">
        {block.items.map((item, index) => (
          <ListCard
            key={item.title}
            size={setSize(block.items.length, 'row')}
            titleAs="h3"
            title={item.title}
            body={item.body}
            marker={{ type: 'number', value: index + 1 }}
          />
        ))}
      </Layout>
    </Layout>
  );
}

/* ── Ledger ───────────────────────────────────────────────────────────────────
   Named things with one marker each — a glyph for a kind of artefact, a number for a position. One
   column is a list of rows; two or three columns is a grid of tiles. */
function Ledger({ block }: { block: Of<'ledger'> }) {
  const single = block.columns === 1;
  const columns =
    block.columns === 1
      ? undefined
      : block.columns === 2
        ? { base: 1, md: 2 }
        : { base: 1, md: 2, lg: 3 };
  const set = (
    <Layout
      as={block.marker === 'number' ? 'ol' : 'ul'}
      columns={columns}
      colGap={single ? undefined : 'gutter'}
      rowGap={single ? 'none' : 'stack'}
    >
      {block.items.map((item, index) => (
        <ListCard
          key={item.title}
          {...(single ? { arrangement: 'stacked' as const } : { form: 'tile' as const })}
          size={setSize(block.items.length, single ? 'row' : 'tile')}
          titleAs={block.heading ? 'h4' : 'h3'}
          title={item.title}
          body={item.body || undefined}
          marker={
            block.marker === 'none'
              ? undefined
              : block.marker === 'icon' && item.icon
                ? { type: 'icon', name: item.icon }
                : { type: 'number', value: index + 1 }
          }
        />
      ))}
    </Layout>
  );
  /* A heading when the set is a sub-part of its section — the worked examples under a comparison —
     so the reader is told what the set is before reading it, rather than meeting a run of questions
     with no frame. */
  if (!block.heading) return set;
  /* One column with a heading is a split: the heading in the narrow leading track, the rows reading
     down beside it (1 Oct 2026, owner: "header on left and questions as a list on right"). A list
     reads down, so it can stand beside its heading — the same test ContentSection's `beside` uses.
     A grid with a heading stacks, because a grid reads across. */
  if (single) {
    return (
      <Layout columns={{ base: 1, lg: [1, 2] }} colGap="section" rowGap="block" align="start">
        <h3 className={styles.setHeading}>{block.heading}</h3>
        {set}
      </Layout>
    );
  }
  return (
    <Layout rowGap="block">
      <h3 className={styles.setHeading}>{block.heading}</h3>
      {set}
    </Layout>
  );
}

/* ── Router ───────────────────────────────────────────────────────────────────
   "Which one is mine?" One column of linked rows, split: the service on the left, the condition
   that sends you there on the right, the arrow at the end. The condition is the longer column and
   the one a reader scans; the service is the row's name, because it is where the row goes — a
   link is named by its destination. The non-service route (an audit, a self-check) is the last
   row, for the reader who cannot name their condition yet. */
function Router({ block }: { block: Of<'router'> }) {
  const size = setSize(block.items.length + (block.also ? 1 : 0), 'row');
  return (
    <Layout as="ul" rowGap="none">
      {block.items.map((item) => (
        <ListCard
          key={item.route.href}
          size={size}
          titleAs="h3"
          title={item.route.label}
          body={item.when}
          href={item.route.href}
        />
      ))}
      {block.also ? (
        <ListCard
          size={size}
          titleAs="h3"
          title={block.also.link.label}
          body={block.also.when}
          href={block.also.link.href}
        />
      ) : null}
    </Layout>
  );
}

function caseMedia(item: StoryCase) {
  return item.cover ? { type: 'image' as const, image: item.cover } : undefined;
}

/* ── Cases ────────────────────────────────────────────────────────────────────
   BlockCardSet, unchanged: it features the first card and lays the rest out. The page's
   contribution is the copy — what the case shows for THIS service — and the boundary note.

   The set and the note are a `stack` (48) apart, not a `gutter` (32): `gutter` separates peers
   inside a set, and this seam is block to block (visual-direction § 1.1, S4). */
function Cases({ block }: { block: Of<'cases'> }) {
  return (
    <Layout rowGap="stack">
      <BlockCardSet
        items={block.items.map((item) => ({
          id: item.slug,
          eyebrow: item.client,
          title: item.title,
          body: item.body,
          href: item.href,
          ctaLabel: 'Read the case',
          media: caseMedia(item),
        }))}
      />
      {block.note ? <Callout label="Scope" html={paragraph(block.note)} /> : null}
    </Layout>
  );
}

/* ── Fit ──────────────────────────────────────────────────────────────────────
   Two lists that mean opposite things. The glyph carries the polarity (check-circle and
   close-circle, ch04's fixed choices) in the text's own ink — never green and red. */
function FitList({
  heading,
  items,
  glyph,
}: {
  heading: string;
  items: readonly string[];
  glyph: 'check-circle' | 'close-circle';
}) {
  return (
    <Layout rowGap="block">
      <h3 className={styles.listHeading}>{heading}</h3>
      <Layout as="ul" rowGap="none" className={styles.rows}>
        {items.map((item) => (
          <li key={item} className={styles.rowTight}>
            <Cluster nowrap colGap="text" align="start">
              <span className={styles.glyph} aria-hidden="true">
                <Icon name={glyph} size="xl" />
              </span>
              <span className={styles.rowText}>{item}</span>
            </Cluster>
          </li>
        ))}
      </Layout>
    </Layout>
  );
}

function Fit({ block }: { block: Of<'fit'> }) {
  return (
    <Layout columns={{ base: 1, lg: 2 }} colGap="column" rowGap="stack" align="start">
      <FitList heading={block.yes.heading} items={block.yes.items} glyph="check-circle" />
      <FitList heading={block.no.heading} items={block.no.items} glyph="close-circle" />
    </Layout>
  );
}

/* ── Proof ────────────────────────────────────────────────────────────────────
   A quote is a claim about a relationship; the case it came from is where a reader checks it.

   With a case: the WORK first, then what the client said about it (1 Oct 2026, owner). The case
   card leads in the narrow track and carries the band's image, so the eye enters on the work; the
   quote follows in the wide track at the compact size (28) — a quote beside something takes the
   reading size (Proof.md, Amendment 1 Oct). A split, so --gap-section; tops aligned.

   Without a case: the quote ALONE, wide, at display (34). */
function ProofBlock({ block }: { block: Of<'proof'> }) {
  const quote = {
    quoteHtml: paragraph(block.quote.text),
    name: block.quote.name,
    role: block.quote.role,
    company: block.quote.company,
    portrait: block.quote.portrait,
  };
  const caseCard = block.case;
  if (!caseCard) return <Proof arrangement="display" quote={quote} />;
  return (
    <Layout columns={{ base: 1, lg: [1, 2] }} colGap="section" rowGap="stack" align="start">
      <Layout as="ul" rowGap="none">
        <BlockCard
          eyebrow={caseCard.client}
          title={caseCard.title}
          body={caseCard.body}
          href={caseCard.href}
          ctaLabel="Read the case"
          media={caseMedia(caseCard)}
          tracks={3}
        />
      </Layout>
      {block.rating ? (
        /* The client's words, then the market's score, as ONE piece of evidence: the badge sits a
           block (24) under the attribution, the same beat as the quote to its attribution. It was
           a stack (48) and read as a separate block floating below (1 Oct 2026, owner). One score
           source, shared with the footer (fixtures/ratings.ts). */
        <Layout rowGap="block">
          <Proof arrangement="compact" quote={quote} />
          {/* A Cluster around the badge so the grid cell does not stretch it across the column:
              the parent decides where the badge sits, and the badge sizes to its content. */}
          <Cluster>
            <RatingBadge
              score={block.rating.score}
              platform={block.rating.platform}
              href={block.rating.href}
              icon={<Icon name="star" size="sm" />}
              mark={<BrandMark name={block.rating.mark} />}
            />
          </Cluster>
        </Layout>
      ) : (
        <Proof arrangement="compact" quote={quote} />
      )}
    </Layout>
  );
}

/* ── Stat ─────────────────────────────────────────────────────────────────────
   The figure, what it counts, then the sentence that qualifies it — stacked, one reading order.

   With items, the figure and what the counted work consisted of are a SPLIT: the evidence in the
   narrow leading track, the responsibilities beside it as unnumbered rows (1 Oct 2026). They were a
   stat over eight numbered tiles, and the numbers did two jobs at once — 12 is a count, 01–08 were
   ordinals on items with no order — so the eye read one numeric sequence that meant nothing. */
function Stat({ block }: { block: Of<'stat'> }) {
  const figure = (
    <Layout rowGap="text" className={styles.stat}>
      <Layout rowGap="tight">
        <span className={styles.statValue}>{block.value}</span>
        <span className={styles.key}>{block.label}</span>
      </Layout>
      <p className={styles.statBody}>{block.body}</p>
    </Layout>
  );
  const items = block.items ?? [];
  if (items.length === 0) return figure;
  const size = setSize(items.length, 'row');
  return (
    <Layout columns={{ base: 1, lg: [1, 2] }} colGap="section" rowGap="stack" align="start">
      {figure}
      <Layout as="ul" rowGap="none">
        {items.map((item) => (
          <ListCard
            key={item.title}
            size={size}
            titleAs="h3"
            title={item.title}
            body={item.body}
          />
        ))}
      </Layout>
    </Layout>
  );
}

/* ── Resources ────────────────────────────────────────────────────────────────
   Where to read further, placed once, near the end, as its own section: text BlockCards with the
   content type as the eyebrow and a named cta. A row of links in the middle of an argument pulled
   the reader out of it before the argument was made.

   ALWAYS THREE TRACKS from lg, however many cards there are (1 Oct 2026). A card's width comes from
   the page's grid, not from its count: two cards stretched to halves were 604px objects on a page
   whose every other card set is 392, and the band read as a different kind of thing. Two cards
   leave the third track open, which is the honest shape of two. Stacked under its heading, never
   beside it — see ContentSection's `arrangement`.

   Rows a `column` (64) apart, the row seam of every borderless card set (visual-direction § 1.2,
   CLAUDE.md § the gap scale): down the grid each row is the next set of objects and must read as
   separate. It was `stack` (48), the step BlockCardSet tried and rejected on 29 Sep. Text cards
   keep BlockCard's default `md` step at any count (§ 7.2). */
function Resources({ block }: { block: Of<'resources'> }) {
  const lg = 3;
  return (
    <Layout as="ul" columns={{ base: 1, md: 2, lg }} colGap="gutter" rowGap="column" equalRows>
      {block.items.map((item) => (
        <BlockCard
          key={item.href}
          eyebrow={item.type}
          title={item.title}
          body={item.body}
          href={item.href}
          ctaLabel={item.cta}
          tracks={lg}
        />
      ))}
    </Layout>
  );
}

/* ── Slot ─────────────────────────────────────────────────────────────────────
   REVIEW MODE ONLY. Where an image should exist and does not yet. Never rendered on a shipped
   page — a hole marked "image goes here" is the hole. */
export function Slot({ slot }: { slot: StorySlot }) {
  return (
    <aside
      className={styles.slot}
      data-ratio={slot.ratio ?? 'auto'}
      aria-label="Image recommendation"
    >
      {/* What the image is for, then what is in it, then why it is here — the order a reviewer
          decides in. The message leads at the lead role because it is the decision. */}
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

export function StoryBlockView({ block, slots }: { block: StoryBlock; slots: boolean }) {
  switch (block.kind) {
    case 'signals':
      return <Signals block={block} />;
    case 'steps':
      return <Steps block={block} />;
    case 'ledger':
      return <Ledger block={block} />;
    case 'router':
      return <Router block={block} />;
    case 'cases':
      return <Cases block={block} />;
    case 'fit':
      return <Fit block={block} />;
    case 'proof':
      return <ProofBlock block={block} />;
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
      return <Thread block={block} />;
    case 'stat':
      return <Stat block={block} />;
    case 'faq':
      return <Accordion items={block.items} />;
    case 'note':
      return <Callout label={block.label} html={block.html} />;
    case 'resources':
      return <Resources block={block} />;
    case 'slot':
      return slots ? <Slot slot={block.slot} /> : null;
  }
}
