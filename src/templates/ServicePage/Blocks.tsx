import { Button, Cluster, Icon, Layout } from '@/components';
import { Accordion, BlockCard, BlockCardSet, Callout, ListCard, Proof } from '@/patterns';
import type { StoryBlock, StoryCase, StorySlot } from '@/lib/service-story';

import { Bridge, Parts, Record, Representations, Slice, Spectrum, Thread } from './Diagrams';
import styles from './Blocks.module.css';

type Of<K extends StoryBlock['kind']> = Extract<StoryBlock, { kind: K }>;

/* Story fields are PLAIN TEXT, and Callout and Proof take trusted HTML through Prose. So every plain
   field is escaped on its way into a paragraph: a quote with "<" or "&" in it is text, not markup. */
function paragraph(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return `<p>${escaped}</p>`;
}

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
   above, because in a grid only the tops of unequal items line up. */

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
  return (
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
          titleAs="h3"
          title={item.title}
          body={item.body}
          marker={
            block.marker === 'icon' && item.icon
              ? { type: 'icon', name: item.icon }
              : { type: 'number', value: index + 1 }
          }
        />
      ))}
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
  return (
    <Layout as="ul" rowGap="none">
      {block.items.map((item) => (
        <ListCard
          key={item.route.href}
          titleAs="h3"
          title={item.route.label}
          body={item.when}
          href={item.route.href}
        />
      ))}
      {block.also ? (
        <ListCard
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
   contribution is the copy — what the case shows for THIS service — and the boundary note. */
function Cases({ block }: { block: Of<'cases'> }) {
  return (
    <Layout rowGap="gutter">
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

/* ── Contrast ─────────────────────────────────────────────────────────────────
   One statement in parts — what one party does and what the other keeps. So it is drawn as ONE
   list split into two to four columns — one rule over all of them, the same row in each — and the
   key over each part is the only thing that differs. Two representations would say two ideas. */
function Contrast({ block }: { block: Of<'contrast'> }) {
  const count = block.sides.length;
  return (
    <Layout
      columns={count > 2 ? { base: 1, md: 2, lg: count } : { base: 1, lg: 2 }}
      colGap={count > 2 ? 'gutter' : 'column'}
      rowGap="stack"
      className={styles.split}
    >
      {block.sides.map((side) => (
        <Layout key={side.label} rowGap="text">
          <span className={styles.key}>{side.label}</span>
          <Layout as="ul" rowGap="none">
            {side.items.map((item) => (
              <li key={item} className={styles.rowTight}>
                <span className={styles.rowText}>{item}</span>
              </li>
            ))}
          </Layout>
        </Layout>
      ))}
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
      <Proof arrangement="compact" quote={quote} />
    </Layout>
  );
}

/* ── Stat ─────────────────────────────────────────────────────────────────────
   The figure, what it counts, then the sentence that qualifies it — stacked, one reading order. */
function Stat({ block }: { block: Of<'stat'> }) {
  return (
    <Layout rowGap="text" className={styles.stat}>
      <Layout rowGap="tight">
        <span className={styles.statValue}>{block.value}</span>
        <span className={styles.key}>{block.label}</span>
      </Layout>
      <p className={styles.statBody}>{block.body}</p>
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
   beside it — see ContentSection's `arrangement`. */
function Resources({ block }: { block: Of<'resources'> }) {
  const lg = 3;
  return (
    <Layout as="ul" columns={{ base: 1, md: 2, lg }} colGap="gutter" rowGap="stack" equalRows>
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

/* ── Nudge ────────────────────────────────────────────────────────────────────
   The mid-page ask, at the size of a sentence rather than a band, inside the section whose
   argument earned it, between two rules. */
function Nudge({ block }: { block: Of<'nudge'> }) {
  return (
    <Layout
      columns={{ base: 1, lg: [2, 1] }}
      colGap="section"
      rowGap="block"
      align="center"
      className={styles.nudge}
    >
      <p className={styles.nudgeBody}>{block.body}</p>
      <Cluster>
        <Button
          as="a"
          href={block.action.href}
          emphasis="solid"
          tone="primary"
          size="md"
          icon={<Icon name="arrow-right" />}
        >
          {block.action.label}
        </Button>
      </Cluster>
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
    case 'representations':
      return <Representations block={block} />;
    case 'record':
      return <Record block={block} />;
    case 'contrast':
      return <Contrast block={block} />;
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
    case 'nudge':
      return <Nudge block={block} />;
    case 'slot':
      return slots ? <Slot slot={block.slot} /> : null;
  }
}
