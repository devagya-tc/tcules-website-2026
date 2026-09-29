import { Button, Cluster, Icon, Layout } from '@/components';
import { Accordion, BlockCard, BlockCardSet, Callout, Proof } from '@/patterns';
import type { StoryBlock, StoryCase, StorySlot } from '@/lib/service-story';

import { Bridge, Parts, Record, Representations, Slice, Spectrum, Thread } from './Diagrams';
import styles from './Blocks.module.css';

type Of<K extends StoryBlock['kind']> = Extract<StoryBlock, { kind: K }>;

/* What is NOT in this file (30 Sep 2026 pass): a side-by-side pair of two text items. A key beside
   its sentence, a title beside its one-line body, a number beside its paragraph — each read as two
   columns of one thing. Two tracks are for two blocks that each hold several items; anything
   smaller stacks. */

/* ── Signals ──────────────────────────────────────────────────────────────────
   A thing a reader can see, then what it may mean. The symptom is the title at h4, because the
   reader recognises it; the meaning is quieter and keyed, because it is the hypothesis. A top rule
   per tile, not a card: the row reads as one instrument with N readings. */
function Signals({ block }: { block: Of<'signals'> }) {
  return (
    <Layout
      as="ul"
      columns={{ base: 1, md: 2, lg: block.columns }}
      colGap="gutter"
      rowGap="stack"
    >
      {block.items.map((item) => (
        <li key={item.title} className={styles.tile}>
          <Layout rowGap="text">
            {item.icon ? (
              <span className={styles.glyph} aria-hidden="true">
                <Icon name={item.icon} size="xl" />
              </span>
            ) : null}
            <h3 className={styles.signalTitle}>{item.title}</h3>
            <Layout rowGap="inline">
              {block.key ? <span className={styles.key}>{block.key}</span> : null}
              <p className={styles.body}>{item.body}</p>
            </Layout>
          </Layout>
        </li>
      ))}
    </Layout>
  );
}

/* ── Steps ────────────────────────────────────────────────────────────────────
   A method: order matters, so the list is an <ol> and the number is visible — and the number is
   the only mark, because it is the only thing that carries the order. A worked example, when there
   is one, sits ABOVE the steps as the scene they are walked through. */
function Steps({ block }: { block: Of<'steps'> }) {
  const count = block.items.length;
  return (
    <Layout rowGap="stack">
      {block.example ? (
        <Layout rowGap="tight">
          <span className={styles.key}>{block.example.label}</span>
          <p className={styles.exampleBody}>{block.example.body}</p>
        </Layout>
      ) : null}
      <Layout
        as="ol"
        columns={count <= 5 ? { base: 1, md: 2, lg: count } : { base: 1, md: 2, lg: 3 }}
        colGap="gutter"
        rowGap="stack"
      >
        {block.items.map((item, index) => (
          <li key={item.title} className={styles.tile}>
            <Layout rowGap="text">
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.bodySmall}>{item.body}</p>
            </Layout>
          </li>
        ))}
      </Layout>
    </Layout>
  );
}

/* ── Ledger ───────────────────────────────────────────────────────────────────
   Named things with one marker each — a glyph for a kind of artefact, a number for a position.
   The marker leads; the title and its line stack beside it. In one column the rows close with a
   hairline; in two or three they are tiles on a top rule. */
function Ledger({ block }: { block: Of<'ledger'> }) {
  const single = block.columns === 1;
  const columns =
    block.columns === 1
      ? { base: 1 }
      : block.columns === 2
        ? { base: 1, md: 2 }
        : { base: 1, md: 2, lg: 3 };
  return (
    <Layout
      as={block.marker === 'number' ? 'ol' : 'ul'}
      columns={columns}
      colGap="gutter"
      rowGap={single ? 'none' : 'stack'}
      className={single ? styles.rows : undefined}
    >
      {block.items.map((item, index) => (
        <li key={item.title} className={single ? styles.row : styles.tile}>
          <Cluster nowrap colGap="block" align="start">
            <span className={styles.glyph} aria-hidden="true">
              {block.marker === 'icon' && item.icon ? (
                <Icon name={item.icon} size="xl" />
              ) : (
                <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
              )}
            </span>
            <Layout rowGap="tight" className={styles.grow}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              {item.body ? <p className={styles.body}>{item.body}</p> : null}
            </Layout>
          </Cluster>
        </li>
      ))}
    </Layout>
  );
}

/* ── Router ───────────────────────────────────────────────────────────────────
   "Which one is mine?" is answered by the condition, so the condition is the tile's content, in
   the reader's own words, and the service is where it leads: a plain link line at the tile's foot,
   never a heading. Each tile is one link. The non-service route (an audit, a self-check) is for
   the reader who cannot name their condition yet; it leads the set when the routes are an even
   count, so the grid never has a hole, and closes it when they are odd. */
function RouteTile({
  keyLabel,
  when,
  settles,
  label,
  href,
}: {
  keyLabel: string;
  when: string;
  settles?: string;
  label: string;
  href: string;
}) {
  return (
    <li className={styles.routeItem}>
      <a href={href} className={styles.route}>
        <Layout rowGap="block" pinLast className={styles.routeInner}>
          <Layout rowGap="text">
            <span className={styles.key}>{keyLabel}</span>
            <p className={styles.routeWhen}>{when}</p>
            {settles ? <p className={styles.bodySmall}>{settles}</p> : null}
          </Layout>
          <span className={styles.routeTo}>
            <span className={styles.routeName}>{label}</span>
            <span className={styles.routeArrow} aria-hidden="true">
              <Icon name="arrow-right" size="md" />
            </span>
          </span>
        </Layout>
      </a>
    </li>
  );
}

function Router({ block }: { block: Of<'router'> }) {
  const alsoLeads = Boolean(block.also) && block.items.length % 2 === 0;
  const total = block.items.length + (block.also ? 1 : 0);
  const columns =
    !alsoLeads && total % 3 === 0 ? { base: 1, md: 2, lg: 3 } : { base: 1, md: 2 };
  const also = block.also ? (
    <RouteTile
      key="also"
      keyLabel="Not sure yet"
      when={block.also.when}
      label={block.also.link.label}
      href={block.also.link.href}
    />
  ) : null;

  return (
    <Layout as="ul" columns={columns} colGap="gutter" rowGap="stack" equalRows lead={alsoLeads}>
      {alsoLeads ? also : null}
      {block.items.map((item) => (
        <RouteTile
          key={item.route.href}
          keyLabel="When"
          when={item.when}
          settles={item.settles}
          label={item.route.label}
          href={item.route.href}
        />
      ))}
      {!alsoLeads ? also : null}
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
      {block.note ? <Callout label="Scope" html={`<p>${block.note}</p>`} /> : null}
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
   The quotation beside the work it is about: a quote is a claim about a relationship, and the case
   beside it is where a reader goes to check it. The portrait sits left of the name (Proof's own). */
function ProofBlock({ block }: { block: Of<'proof'> }) {
  const quote = {
    quoteHtml: `<p>${block.quote.text}</p>`,
    name: block.quote.name,
    role: block.quote.role,
    company: block.quote.company,
    portrait: block.quote.portrait,
  };
  const caseCard = block.case;
  return (
    <Layout
      columns={caseCard ? { base: 1, lg: [3, 2] } : undefined}
      colGap={caseCard ? 'column' : undefined}
      rowGap="stack"
      align="center"
    >
      <Proof arrangement="display" quote={quote} />
      {caseCard ? (
        <Layout as="ul" rowGap="none">
          <BlockCard
            eyebrow={caseCard.client}
            title={caseCard.title}
            body={caseCard.body}
            href={caseCard.href}
            media={caseMedia(caseCard)}
            tracks={3}
          />
        </Layout>
      ) : null}
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
   the reader out of it before the argument was made. */
function Resources({ block }: { block: Of<'resources'> }) {
  const lg: 2 | 3 = block.items.length >= 3 ? 3 : 2;
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
      colGap="column"
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
      <Layout rowGap="text">
        <span className={styles.key}>
          Image slot · {slot.kind}
          {slot.ratio ? ` · ${slot.ratio.replace('/', ':')}` : ''}
        </span>
        <p className={styles.slotBrief}>{slot.brief}</p>
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
