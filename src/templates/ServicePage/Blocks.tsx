import { Button, Cluster, Icon, Layout, Prose } from '@/components';
import {
  Accordion,
  BlockCard,
  BlockCardSet,
  Callout,
  ContentSectionText,
  Proof,
} from '@/patterns';
import type { StoryBlock, StoryCase, StorySlot } from '@/lib/service-story';

import { Bridge, Parts, Record, Representations, Slice, Spectrum, Thread } from './Diagrams';
import styles from './Blocks.module.css';

type Of<K extends StoryBlock['kind']> = Extract<StoryBlock, { kind: K }>;

/* ── Signals ──────────────────────────────────────────────────────────────────
   A thing a reader can see, then what it may mean. The symptom is the title at h4, because the
   reader recognises it; the meaning is quieter and keyed, because it is the hypothesis. A top rule
   per tile, not a card: the row reads as one instrument with N readings. */
function Signals({ block }: { block: Of<'signals'> }) {
  const lg = block.columns;
  return (
    <Layout
      as="ul"
      columns={{ base: 1, md: 2, lg }}
      colGap="gutter"
      rowGap="stack"
      className={styles.signals}
    >
      {block.items.map((item) => (
        <li key={item.title} className={styles.signal}>
          <Layout rowGap="text">
            {item.icon ? (
              <span className={styles.signalIcon} aria-hidden="true">
                <Icon name={item.icon} size="xl" />
              </span>
            ) : null}
            <h3 className={styles.signalTitle}>{item.title}</h3>
            <Layout rowGap="inline">
              {block.key ? <span className={styles.key}>{block.key}</span> : null}
              <p className={styles.signalBody}>{item.body}</p>
            </Layout>
          </Layout>
        </li>
      ))}
    </Layout>
  );
}

/* ── Statement ────────────────────────────────────────────────────────────────
   The page's thesis, once. Set into the right two-thirds rather than hung from the left edge, so
   it reads as a conclusion drawn from what sits above it — and so it is never the same shape as
   the section heading it follows. Its one marked phrase is the page's one peridot mark. */
function Statement({ block }: { block: Of<'statement'> }) {
  return (
    <Layout columns={{ base: 1, lg: [1, 2] }} colGap="column" offset={{ base: 0, lg: 1 }}>
      <p className={styles.statement}>
        {block.before}
        <mark className={styles.mark}>{block.marked}</mark>
        {block.after}
      </p>
    </Layout>
  );
}

/* ── Steps ────────────────────────────────────────────────────────────────────
   A method: order matters, so the list is an <ol> and the number is visible. From lg the steps
   run as one rail — a rule through a node per step — so the sequence is seen before it is read. */
function Steps({ block }: { block: Of<'steps'> }) {
  const count = block.items.length;
  const horizontal = count <= 5;
  return (
    <Layout rowGap="stack">
      {block.example ? (
        <Layout columns={{ base: 1, lg: [1, 2] }} colGap="column" rowGap="text" align="start">
          <span className={styles.key}>{block.example.label}</span>
          <p className={styles.example}>{block.example.body}</p>
        </Layout>
      ) : null}
      <Layout
        as="ol"
        columns={horizontal ? { base: 1, md: 2, lg: count } : { base: 1, md: 2 }}
        colGap="gutter"
        rowGap="stack"
        className={styles.steps}
      >
        {block.items.map((item, index) => (
          <li key={item.title} className={styles.step}>
            <Layout rowGap="text">
              <span className={styles.stepNumber} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.stepTitle}>{item.title}</h3>
              <p className={styles.stepBody}>{item.body}</p>
            </Layout>
          </li>
        ))}
      </Layout>
    </Layout>
  );
}

/* ── Ledger ───────────────────────────────────────────────────────────────────
   Named things with a marker each — a glyph for a kind of artefact, a number for a sequence. Not
   ListCard: ListCard is a row that finishes itself with a rule and hands its title the h3 scale;
   a ledger in a grid of three wants the glyph standing above the name, at 24, alone (ch04). */
function Ledger({ block }: { block: Of<'ledger'> }) {
  const columns =
    block.columns === 1
      ? { base: 1 }
      : block.columns === 2
        ? { base: 1, md: 2 }
        : { base: 1, md: 2, lg: 3 };
  const single = block.columns === 1;
  /* A title-only ledger (a list of questions) has nothing for a second track to hold. */
  const split = single && block.items.some((item) => item.body);
  return (
    <Layout
      as={block.marker === 'number' ? 'ol' : 'ul'}
      columns={columns}
      colGap="column"
      rowGap={single ? 'none' : 'stack'}
      className={single ? styles.ledgerRows : undefined}
    >
      {block.items.map((item, index) => (
        <li key={item.title} className={single ? styles.ledgerRow : styles.ledgerTile}>
          <Cluster nowrap colGap="block" align="start">
            <span className={styles.ledgerMarker} aria-hidden="true">
              {block.marker === 'icon' && item.icon ? (
                <Icon name={item.icon} size="xl" />
              ) : (
                <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
              )}
            </span>
            <Layout
              columns={split ? { base: 1, md: [2, 3] } : undefined}
              colGap={split ? 'gutter' : undefined}
              rowGap="tight"
              className={styles.ledgerCopy}
            >
              <h3 className={styles.ledgerTitle}>{item.title}</h3>
              {item.body ? <p className={styles.ledgerBody}>{item.body}</p> : null}
            </Layout>
          </Cluster>
        </li>
      ))}
    </Layout>
  );
}

/* ── Router ───────────────────────────────────────────────────────────────────
   "Which one is mine?" is answered by the condition, not by the service name — nobody arrives
   knowing the name. So the condition leads, in the reader's own terms, and the route is the
   destination: serif, trailing an arrow, the whole row one link. */
function Router({ block }: { block: Of<'router'> }) {
  return (
    <Layout rowGap="stack">
      <Layout as="ul" rowGap="none" className={styles.router}>
        <li className={styles.routerHead} aria-hidden="true">
          <Layout columns={{ base: 1, lg: [3, 2] }} colGap="column">
            <span className={styles.key}>When</span>
            <span className={styles.key}>Go to</span>
          </Layout>
        </li>
        {block.items.map((item) => (
          <li key={item.route.href}>
            <a href={item.route.href} className={styles.route}>
              <Layout
                columns={{ base: 1, lg: [3, 2] }}
                colGap="column"
                rowGap="tight"
                align="center"
              >
                <p className={styles.routeWhen}>{item.when}</p>
                <Layout rowGap="inline">
                  <span className={styles.routeName}>
                    {item.route.label}
                    <span className={styles.routeArrow} aria-hidden="true">
                      <Icon name="arrow-right" size="md" />
                    </span>
                  </span>
                  {item.settles ? (
                    <span className={styles.routeSettles}>{item.settles}</span>
                  ) : null}
                </Layout>
              </Layout>
            </a>
          </li>
        ))}
      </Layout>
      {block.also ? (
        <Layout columns={{ base: 1, lg: [3, 2] }} colGap="column" rowGap="text" align="center">
          <p className={styles.alsoBody}>{block.also.body}</p>
          <Cluster>
            <Button
              as="a"
              href={block.also.link.href}
              emphasis="ghost"
              tone="neutral"
              size="md"
              icon={<Icon name="arrow-right" />}
            >
              {block.also.link.label}
            </Button>
          </Cluster>
        </Layout>
      ) : null}
    </Layout>
  );
}

function caseMedia(item: StoryCase) {
  if (!item.cover) return undefined;
  return {
    type: 'image' as const,
    image: item.cover,
  };
}

/* ── Cases ────────────────────────────────────────────────────────────────────
   BlockCardSet, unchanged: it already features the first card and lays the rest two-up. The page's
   contribution is the copy — a title that says what the case shows for THIS service, not the
   case's own listing title — and the boundary note under the set. */
function Cases({ block }: { block: Of<'cases'> }) {
  return (
    <Layout rowGap="block">
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
   Two lists that mean opposite things. The glyph carries the polarity (check-circle / close-circle,
   ch04's fixed choices) in the text's own ink — never green and red, which are status colours. */
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
      <h3 className={styles.fitHeading}>{heading}</h3>
      <Layout as="ul" rowGap="none" className={styles.checks}>
        {items.map((item) => (
          <li key={item} className={styles.check}>
            <Cluster nowrap colGap="text" align="start">
              <span className={styles.checkIcon} aria-hidden="true">
                <Icon name={glyph} size="xl" />
              </span>
              <span className={styles.checkText}>{item}</span>
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
   The quotation beside the work it is about. A quote alone is a claim about a relationship; the
   case beside it is where a reader goes to check it. */
function ProofBlock({ block, slots }: { block: Of<'proof'>; slots: boolean }) {
  const quote = {
    quoteHtml: `<p>${block.quote.text}</p>`,
    name: block.quote.name,
    role: block.quote.role,
    company: block.quote.company,
  };
  const caseCard = block.case;
  return (
    <Layout
      columns={caseCard ? { base: 1, lg: [3, 2] } : undefined}
      colGap={caseCard ? 'column' : undefined}
      rowGap="stack"
      align="center"
    >
      <Layout rowGap="block">
        <Proof arrangement="display" quote={quote} />
        {slots && block.portrait ? <Slot slot={block.portrait} /> : null}
      </Layout>
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

/* ── Contrast ─────────────────────────────────────────────────────────────── */
function Contrast({ block }: { block: Of<'contrast'> }) {
  return (
    <Layout columns={{ base: 1, lg: 2 }} colGap="column" rowGap="stack" align="start">
      {block.sides.map((side) => (
        <Layout key={side.label} rowGap="block" className={styles.contrastSide}>
          <Layout rowGap="tight">
            <span className={styles.key}>{side.label}</span>
            <h3 className={styles.fitHeading}>{side.heading}</h3>
          </Layout>
          {side.style === 'chips' ? (
            /* A vocabulary, set as a run-in list at title scale rather than as chips: a row of 12px
               tags beside a column of checked claims read as the lighter half, which is backwards —
               these are the nouns the claims are about. */
            <ul className={styles.runIn}>
              {side.items.map((item) => (
                <li key={item} className={styles.runInItem}>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <Layout as="ul" rowGap="none" className={styles.checks}>
              {side.items.map((item) => (
                <li key={item} className={styles.check}>
                  <Cluster nowrap colGap="text" align="start">
                    <span className={styles.checkIcon} aria-hidden="true">
                      <Icon
                        name={side.style === 'checks' ? 'check-circle' : 'close-circle'}
                        size="xl"
                      />
                    </span>
                    <span className={styles.checkText}>{item}</span>
                  </Cluster>
                </li>
              ))}
            </Layout>
          )}
        </Layout>
      ))}
    </Layout>
  );
}

/* ── Stat ─────────────────────────────────────────────────────────────────── */
function Stat({ block }: { block: Of<'stat'> }) {
  return (
    <Layout
      columns={{ base: 1, lg: [1, 2] }}
      colGap="column"
      rowGap="block"
      align="end"
      className={styles.stat}
    >
      <Layout rowGap="tight">
        <span className={styles.statValue}>{block.value}</span>
        <span className={styles.key}>{block.label}</span>
      </Layout>
      <p className={styles.statBody}>{block.body}</p>
    </Layout>
  );
}

/* ── Nudge ────────────────────────────────────────────────────────────────────
   The mid-page ask, at the size of a sentence rather than a band. It sits inside the section whose
   argument earned it, between two rules, so it reads as the conclusion of that section and not as
   a new one. A CtaSection here was tried first and read as a stray heading. */
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

/* ── Links ────────────────────────────────────────────────────────────────── */
function Links({ block }: { block: Of<'links'> }) {
  /* Text links, not Buttons: these are titles of other pages, often six or eight words, and a
     Button label is two to four and never wraps. */
  return (
    <Layout
      columns={{ base: 1, lg: [1, 5] }}
      colGap="gutter"
      rowGap="tight"
      className={styles.links}
    >
      <span className={styles.key}>Read next</span>
      <Cluster as="ul" colGap="gutter" rowGap="tight">
        {block.items.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={styles.link}>
              {link.label}
            </a>
          </li>
        ))}
      </Cluster>
    </Layout>
  );
}

/* ── Slot ─────────────────────────────────────────────────────────────────────
   REVIEW MODE ONLY. Where an image should exist and does not yet: its kind, its ratio and the
   brief. Never rendered on a shipped page — a hole marked "image goes here" is the hole. */
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
    case 'statement':
      return <Statement block={block} />;
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
      return <ProofBlock block={block} slots={slots} />;
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
    case 'text':
      return (
        <ContentSectionText>
          <Prose html={block.html} />
        </ContentSectionText>
      );
    case 'links':
      return <Links block={block} />;
    case 'nudge':
      return <Nudge block={block} />;
    case 'slot':
      return slots ? <Slot slot={block.slot} /> : null;
  }
}
