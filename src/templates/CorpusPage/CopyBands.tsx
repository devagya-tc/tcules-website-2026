import { Fragment, type ReactNode } from 'react';

import { Button, Icon, Layout, Media, Prose } from '@/components';
import {
  Bento,
  BlockCardSet,
  Callout,
  ContentSection,
  ContentSectionText,
  CtaRow,
  CtaSection,
  DataTable,
  ListCard,
  OfferSheet,
  ReadDown,
  Steps,
  Teaser,
  type BentoItem,
  type BlockCardSetItem,
  type OfferSheetItem,
  type ReadDownRow,
  type Step,
} from '@/patterns';
import type { CorpusBand, CorpusBlock, CorpusLink, CorpusPage } from '@/lib/corpus-types';
import { glyphForRoute } from '@/lib/glyphs';
import { inlineToHtml, type InlineRun } from '@/lib/inline';
import { getKitPhoto, HOME_SECTOR_PHOTOS } from '@/lib/photos';
import { placeholderImage } from '@/lib/placeholders';
import { serviceSceneFor } from '@/lib/sketches';

import { ListTiles, head } from './blocks';
import { hasSlot, slotImage, slugOf } from './images';
import { signature } from './plan';
import {
  boldLead,
  hasLink,
  labelTitle,
  leadOf,
  linkLead,
  plain,
  sentenceLead,
  trimStart,
} from './text';

/**
 * The 26 Oct 2026 copy's band renderers (docs/page-build/component-map.md § A, § B; 29 Oct 2026),
 * one per kind the plan's id table names. Shared by OfferPage, HomePage and AboutPage, so a band id
 * renders the same wherever the copy uses it. Every arrangement is Layout and the kit's units; no
 * margin, no distance, no ground of its own; every word is the copy's, in its order.
 */

type ItemBlock = Extract<CorpusBlock, { type: 'item' }>;
type TableBlock = Extract<CorpusBlock, { type: 'table' }>;
type LinkRun = Extract<InlineRun, { type: 'link' }>;

export const content = (band: CorpusBand) =>
  band.blocks.filter((block) => block.type !== 'comment');

/** Runs as a card or row body: plain text, or one paragraph of HTML when they carry markup. */
function bodyFields(runs: readonly InlineRun[]): { body: string } | { bodyHtml: string } {
  return hasLink(runs) || runs.some((run) => run.type !== 'text')
    ? { bodyHtml: inlineToHtml(runs) }
    : { body: plain(runs) };
}

/** The first link inside runs (a bold label authored as a link), if any. */
function linkIn(runs: readonly InlineRun[]): LinkRun | undefined {
  for (const run of runs) {
    if (run.type === 'link') return run;
    if ('children' in run) {
      const inner = linkIn(run.children);
      if (inner) return inner;
    }
  }
  return undefined;
}

/** A bold label with no words after it ("**What you receive**"): a label over what follows. */
const isBareLabel = (block: CorpusBlock): boolean => {
  const lead = leadOf(block);
  return lead !== null && plain(lead.body).trim().length === 0;
};

/* ── Links ───────────────────────────────────────────────────────────────────── */

/**
 * A band's closing links as its actions: one link is a CtaRow; two are CtaRow's PAIR, an outlined
 * button then the link in one row (owner, 30 Oct 2026: two actions side by side are never two
 * identical links; decisions/2026-10-30-two-actions-outline-then-link); three or more stack as a
 * list of links.
 */
export function LinkActions({
  links,
  rule = false,
  pair = true,
}: {
  links: readonly CorpusLink[];
  rule?: boolean;
  /**
   * Default true. Two links as one row with a hierarchy (CtaRow's pair). False only to force a
   * stacked list of two links — no current caller needs it.
   */
  pair?: boolean;
}): ReactNode {
  const [first, second] = links;
  if (!first) return null;
  if (links.length === 1) {
    return <CtaRow rule={rule} actions={[{ label: first.labelText, href: first.href }]} />;
  }
  if (pair && second && links.length === 2) {
    return (
      <CtaRow
        rule={rule}
        actions={[
          { label: first.labelText, href: first.href },
          { label: second.labelText, href: second.href },
        ]}
      />
    );
  }
  return (
    <Layout rowGap="text" justifyItems="start">
      {links.map((link) => (
        <Button
          key={`${link.href}-${link.labelText}`}
          as="a"
          href={link.href}
          emphasis="link"
          tone="primary"
          size="md"
          extendHitArea
          icon={<Icon name="arrow-right" />}
        >
          {link.labelText}
        </Button>
      ))}
    </Layout>
  );
}

/* ── A table, its key column linked (C6) ─────────────────────────────────────── */

/** A corpus table as the site's DataTable: a linked key cell keeps its link (`headerHtml`, C6). */
export function CorpusTable({ table, labelledBy }: { table: TableBlock; labelledBy?: string }) {
  const [key = [], ...columns] = table.header;
  return (
    <DataTable
      labelledBy={labelledBy}
      keyColumn={{ heading: plain(key) }}
      columns={columns.map((cell) => ({ heading: plain(cell) }))}
      rows={table.rows.map((row) => {
        const keyCell = row[0] ?? [];
        return {
          header: plain(keyCell),
          ...(hasLink(keyCell) ? { headerHtml: inlineToHtml(keyCell) } : {}),
          cellsHtml: row.slice(1).map((cell) => inlineToHtml(cell)),
        };
      })}
    />
  );
}

/* ── The rest of a band, in order ───────────────────────────────────────────── */

/**
 * Blocks in their authored order as kit units: running paragraphs as one Prose column, a run of
 * labelled claims as tiles, a table as DataTable, a list as Prose, a link line as its actions, an
 * `###` item as its h3 over its own blocks. What a band's main shape leaves over, so no word drops.
 */
export function BandBody({
  blocks,
  labelledBy,
}: {
  blocks: readonly CorpusBlock[];
  labelledBy?: string;
}): ReactNode {
  const groups: { type: string; blocks: CorpusBlock[] }[] = [];
  for (const block of blocks) {
    if (block.type === 'comment' || block.type === 'form') continue;
    const type =
      block.type === 'paragraph' && leadOf(block) && !isBareLabel(block)
        ? 'labelled'
        : block.type === 'paragraph' || block.type === 'list'
          ? 'prose'
          : block.type;
    const last = groups.at(-1);
    if (last && last.type === type && (type === 'prose' || type === 'labelled')) {
      last.blocks.push(block);
    } else {
      groups.push({ type, blocks: [block] });
    }
  }
  if (groups.length === 0) return null;
  return (
    <Layout rowGap="stack">
      {groups.map((group, index) => (
        <Fragment key={index}>{groupNode(group, labelledBy)}</Fragment>
      ))}
    </Layout>
  );
}

function proseHtml(blocks: readonly CorpusBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === 'paragraph') return `<p>${inlineToHtml(block.runs)}</p>`;
      if (block.type === 'list') {
        const tag = block.ordered ? 'ol' : 'ul';
        return `<${tag}>${block.items.map((item) => `<li>${inlineToHtml(item)}</li>`).join('')}</${tag}>`;
      }
      return '';
    })
    .join('');
}

function groupNode(
  group: { type: string; blocks: CorpusBlock[] },
  labelledBy?: string,
): ReactNode {
  switch (group.type) {
    case 'prose':
      return (
        <ContentSectionText>
          <Prose html={proseHtml(group.blocks)} />
        </ContentSectionText>
      );
    case 'labelled':
    case 'labelledBlock': {
      const rows = group.blocks.flatMap((block) => {
        const lead = leadOf(block);
        return lead ? [{ title: labelTitle(lead.label), ...rowBody(lead.body) }] : [];
      });
      return <ListTiles rows={rows} columns={rows.length % 3 === 0 ? 3 : 2} />;
    }
    case 'table':
      return group.blocks.map((block, index) =>
        block.type === 'table' ? (
          <CorpusTable key={index} table={block} labelledBy={labelledBy} />
        ) : null,
      );
    case 'links':
      return (
        <LinkActions
          links={group.blocks.flatMap((block) => (block.type === 'links' ? block.links : []))}
        />
      );
    case 'item':
      return group.blocks.map((block, index) =>
        block.type === 'item' ? (
          <Layout key={index} rowGap="block">
            <h3>{block.headingText}</h3>
            <BandBody blocks={block.blocks} labelledBy={labelledBy} />
          </Layout>
        ) : null,
      );
    case 'quote':
      return null;
    default:
      return null;
  }
}

const rowBody = (runs: readonly InlineRun[]) =>
  hasLink(runs) || runs.some((run) => run.type !== 'text')
    ? { bodyHtml: [inlineToHtml(runs)] }
    : { body: plain(runs) };

/* ── Sheets: what you get, a catalogue, argued items (C4, C7) ─────────────────── */

/**
 * One list item or claim as a promise. A bold lead is the title (a lead authored as a link keeps it,
 * C7); otherwise a colon inside the first seventy characters splits title from body; otherwise the
 * whole sentence is the title (component-map § A `what-you-get`).
 */
function sheetItem(runs: readonly InlineRun[]): OfferSheetItem {
  const lead = boldLead(runs);
  if (lead) {
    const link = linkIn(lead.label);
    const body = trimStart(lead.body);
    return {
      title: labelTitle(lead.label),
      ...(link ? { href: link.href } : {}),
      ...(body.length > 0 ? bodyFields(body) : {}),
    };
  }
  const text = plain(runs);
  const colon = text.indexOf(':');
  if (colon > 0 && colon < 70 && !hasLink(runs)) {
    const body = text.slice(colon + 1).trim();
    return {
      title: text.slice(0, colon).trim(),
      body: body.charAt(0).toUpperCase() + body.slice(1),
    };
  }
  /* No lead: the sentence is a statement, never a title (OfferSheetItem `title`). */
  return { id: text, ...bodyFields(trimStart(runs)) };
}

export type SheetParts = {
  lead?: string;
  /** Lead paragraphs after the first, which carry a link or are a second paragraph. */
  intro: CorpusBlock[];
  listLabel?: string;
  items: OfferSheetItem[];
  /** What follows the items, in order. */
  after: CorpusBlock[];
};

/**
 * A band read as a sheet of promises: an opening paragraph (the lead), a bare bold label over the
 * list, the items (a list, a run of labelled claims, or `###` items), and whatever follows.
 */
export function sheetParts(band: CorpusBand): SheetParts {
  const blocks = content(band);
  const listAt = blocks.findIndex((block) => block.type === 'list');
  const itemAt = blocks.findIndex((block) => block.type === 'item');
  const claimAt = blocks.findIndex((block) => leadOf(block) !== null && !isBareLabel(block));
  const starts = [listAt, itemAt, claimAt].filter((at) => at >= 0);
  const start = starts.length > 0 ? Math.min(...starts) : blocks.length;

  const before = blocks.slice(0, start);
  const labelBlock = before.find(isBareLabel);
  const opening = before.filter((block) => block !== labelBlock);
  const [first, ...intro] = opening;
  const lead =
    first?.type === 'paragraph' && !hasLink(first.runs) ? plain(first.runs) : undefined;
  const introBlocks = lead ? intro : opening;

  let items: OfferSheetItem[] = [];
  let end = start;
  const at = blocks[start];
  if (at?.type === 'list') {
    items = at.items.map(sheetItem);
    /* A set is titled throughout or not at all (review 29 Oct): where any promise is authored with
       no lead of its own, every promise is a statement, its words whole in the body role. */
    if (items.some((item) => !item.title)) {
      items = at.items.map((runs) => ({ id: plain(runs), ...bodyFields(trimStart(runs)) }));
    }
    end = start + 1;
  } else if (at?.type === 'item') {
    while (blocks[end]?.type === 'item') {
      const item = blocks[end] as ItemBlock;
      const paras = item.blocks.filter((block) => block.type === 'paragraph');
      items.push({
        title: item.headingText,
        ...(paras.length > 0
          ? {
              bodyHtml: paras
                .map((block) => (block.type === 'paragraph' ? inlineToHtml(block.runs) : ''))
                .join(' '),
            }
          : {}),
      });
      end += 1;
    }
  } else if (at) {
    while (
      blocks[end] &&
      leadOf(blocks[end] as CorpusBlock) &&
      !isBareLabel(blocks[end] as CorpusBlock)
    ) {
      const lead2 = leadOf(blocks[end] as CorpusBlock);
      if (lead2) {
        const link = linkIn(lead2.label);
        items.push({
          title: labelTitle(lead2.label),
          ...(link ? { href: link.href } : {}),
          ...bodyFields(lead2.body),
        });
      }
      end += 1;
    }
  }
  /* `###` items keep the blocks that are not paragraphs (a link line, a list) for after the set. */
  const itemRest =
    at?.type === 'item'
      ? blocks
          .slice(start, end)
          .flatMap((block) =>
            block.type === 'item'
              ? block.blocks.filter((inner) => inner.type !== 'paragraph')
              : [],
          )
      : [];
  return {
    lead,
    intro: introBlocks,
    listLabel:
      labelBlock && leadOf(labelBlock) ? labelTitle(leadOf(labelBlock)!.label) : undefined,
    items,
    after: [...itemRest, ...blocks.slice(end)],
  };
}

/** Promises per row: two for two or four, three for three, five or six (component-map § A). */
const acrossFor = (count: number): 2 | 3 => (count === 2 || count === 4 ? 2 : 3);

/**
 * A sheet band (`outcomes`, `catalog`): the promises as ONE OfferSheet, its lead, its list label, and
 * what follows as the note (the terms as tiles, a closing paragraph, the band's links). Seven or eight
 * promises, which the sheet is not built for, read down in two columns instead (component-map Q16).
 */
export function SheetBand({
  band,
  scenes,
}: {
  band: CorpusBand;
  scenes?: (title: string) => OfferSheetItem['scene'];
}) {
  const parts = sheetParts(band);
  const items = parts.items.map((item) => {
    /* A statement's scene is filed under its words, or under the words before its colon. */
    const key = item.title ?? item.id ?? '';
    const scene = scenes?.(key) ?? scenes?.(key.split(':')[0] ?? key);
    return scene ? { ...item, scene } : item;
  });
  const note =
    parts.intro.length > 0 || parts.after.length > 0 ? (
      <BandBody blocks={[...parts.intro, ...parts.after]} labelledBy={head(band).headingId} />
    ) : undefined;
  if (items.length > 6) {
    const rows: ReadDownRow[] = items.map((item) => ({
      title: item.title ?? item.id ?? '',
      ...(item.bodyHtml ? { bodyHtml: [item.bodyHtml] } : item.body ? { body: item.body } : {}),
    }));
    return (
      <ContentSection {...head(band)} data-band="D" lead={parts.lead} footer={note}>
        <Layout rowGap="block">
          {parts.listLabel ? <p>{parts.listLabel}</p> : null}
          <ReadDown rows={rows} columns={2} />
        </Layout>
      </ContentSection>
    );
  }
  return (
    <OfferSheet
      {...head(band)}
      lead={parts.lead}
      listLabel={parts.listLabel}
      items={items}
      across={acrossFor(items.length)}
      note={note}
    />
  );
}

/* ── Hard parts (challenges) ─────────────────────────────────────────────────── */

/**
 * The hard parts as a read-down: each problem (a bold label, or an `###` item) is a row's title and
 * its paragraphs, the "Example:" line included, its body. A band with its own photograph reads down
 * beside it; four or more without one read in two columns (component-map § A `hard-parts`).
 */
/** An image across the content column (1240 cap, 32 gutters). */
const WIDE_IMAGE = '(min-width: 1304px) 1240px, calc(100vw - 64px)';

export function ChallengesBand({ page, band }: { page: CorpusPage; band: CorpusBand }) {
  const blocks = content(band);
  const rows: ReadDownRow[] = [];
  const others: CorpusBlock[] = [];
  let leadText: string | undefined;
  let open: { title: string; paras: string[] } | undefined;
  const flush = () => {
    if (open) rows.push({ title: open.title, bodyHtml: open.paras });
    open = undefined;
  };
  blocks.forEach((block, index) => {
    const lead = leadOf(block);
    if (block.type === 'item') {
      flush();
      rows.push({
        title: block.headingText,
        bodyHtml: block.blocks.flatMap((inner) =>
          inner.type === 'paragraph' ? [inlineToHtml(inner.runs)] : [],
        ),
      });
    } else if (lead && !isBareLabel(block)) {
      flush();
      open = { title: labelTitle(lead.label), paras: [inlineToHtml(lead.body)] };
    } else if (block.type === 'paragraph' && open) {
      open.paras.push(inlineToHtml(block.runs));
    } else if (block.type === 'paragraph' && index === 0 && !hasLink(block.runs)) {
      leadText = plain(block.runs);
    } else {
      flush();
      others.push(block);
    }
  });
  flush();
  const photo = hasSlot(page, band.id) ? slotImage(page, band.id) : undefined;
  /* ReadDown's photo form is built for exactly three rows (it warns otherwise) and crops the image to
     their height. Any other count takes the image across the column at its own ratio, the rows two up
     under it: product-design's four hard parts beside the Doodle object model cropped the model to a
     tall slice and cut its words mid-line. */
  const readBeside = photo && rows.length === 3;
  const set = !photo ? (
    <ReadDown rows={rows} columns={rows.length >= 4 ? 2 : 1} />
  ) : readBeside ? (
    <ReadDown rows={rows} columns={1} photo={{ ...photo, alt: '' }} />
  ) : (
    <Layout rowGap="stack">
      <Media image={photo} sizes={WIDE_IMAGE} />
      <ReadDown rows={rows} columns={rows.length >= 4 ? 2 : 1} />
    </Layout>
  );
  return (
    <ContentSection {...head(band)} data-band="D" lead={leadText}>
      {others.length > 0 ? (
        <Layout rowGap="stack">
          <BandBody blocks={others} labelledBy={head(band).headingId} />
          {set}
        </Layout>
      ) : (
        set
      )}
    </ContentSection>
  );
}

/* ── Method (steps) ──────────────────────────────────────────────────────────── */

/** A step's title without the numeral the copy wrote into it ("**1. We read it.**"): Steps numbers. */
const stepTitle = (label: readonly InlineRun[]) => labelTitle(label).replace(/^\d+\.\s*/, '');

function stepOf(runs: readonly InlineRun[]): Step {
  const found = boldLead(runs);
  const lead = found ? sentenceLead(found) : null;
  if (lead) {
    const body = trimStart(lead.body);
    return {
      title: stepTitle(lead.label),
      ...(body.length > 0 ? rowBody(body) : {}),
    };
  }
  return { title: plain(runs) };
}

/**
 * A method: the ordered steps (a list, or a run of labelled claims) as Steps under the head; the
 * opening paragraph as the lead; everything else, a table included, in order around them.
 */
export function MethodBand({ band }: { band: CorpusBand }) {
  const blocks = content(band);
  const [first] = blocks;
  const leadText =
    first?.type === 'paragraph' && !leadOf(first) && !hasLink(first.runs)
      ? plain(first.runs)
      : undefined;
  const rest = leadText ? blocks.slice(1) : blocks;
  const listAt = rest.findIndex((block) => block.type === 'list');
  const claimAt = rest.findIndex((block) => leadOf(block) !== null && !isBareLabel(block));
  let steps: Step[] = [];
  let from = 0;
  let to = 0;
  if (claimAt >= 0 && (listAt < 0 || claimAt < listAt)) {
    from = claimAt;
    to = claimAt;
    while (
      rest[to] &&
      leadOf(rest[to] as CorpusBlock) &&
      !isBareLabel(rest[to] as CorpusBlock)
    ) {
      const lead = leadOf(rest[to] as CorpusBlock)!;
      steps.push({ title: stepTitle(lead.label), ...rowBody(lead.body) });
      to += 1;
    }
  } else if (listAt >= 0) {
    const list = rest[listAt] as Extract<CorpusBlock, { type: 'list' }>;
    steps = list.items.map(stepOf);
    from = listAt;
    to = listAt + 1;
  } else if (
    blocks.length >= 2 &&
    blocks.length <= 5 &&
    blocks.every((block) => block.type === 'paragraph' && !hasLink(block.runs))
  ) {
    /* Instructions authored as plain paragraphs, one each (/glossary `how-to-use`, review 29 Oct:
       the first of seven text bands in a row): each paragraph a step, its first sentence the title
       and the rest its body. Every word kept; no lead is taken, because the first paragraph is the
       first instruction. */
    steps = blocks.map((block) => {
      const text = block.type === 'paragraph' ? plain(block.runs).trim() : '';
      const match = /^(.+?[.?!])\s+([\s\S]+)$/.exec(text);
      return match ? { title: match[1] ?? text, body: match[2] ?? '' } : { title: text };
    });
    return (
      <ContentSection {...head(band)} data-band="F">
        <Steps steps={steps} />
      </ContentSection>
    );
  }
  const before = rest.slice(0, from);
  const after = rest.slice(to);
  return (
    <ContentSection {...head(band)} data-band="F" lead={leadText}>
      <Layout rowGap="stack">
        {before.length > 0 ? (
          <BandBody blocks={before} labelledBy={head(band).headingId} />
        ) : null}
        {steps.length > 0 ? <Steps steps={steps} /> : null}
        {after.length > 0 ? (
          <BandBody blocks={after} labelledBy={head(band).headingId} />
        ) : null}
      </Layout>
    </ContentSection>
  );
}

/* ── Tables (G11, G12, `compare`, `routes`) ──────────────────────────────────── */

/** A comparison or record band: its opening paragraph as the lead, then every block in order. */
export function TableBand({ band }: { band: CorpusBand }) {
  const blocks = content(band);
  const [first] = blocks;
  const leadText =
    first?.type === 'paragraph' && !leadOf(first) && !hasLink(first.runs)
      ? plain(first.runs)
      : undefined;
  return (
    <ContentSection {...head(band)} data-band="E" lead={leadText}>
      <BandBody
        blocks={leadText ? blocks.slice(1) : blocks}
        labelledBy={head(band).headingId}
      />
    </ContentSection>
  );
}

/* ── Related reading, term indexes, roles ────────────────────────────────────── */

export type Entry = {
  title: string;
  href?: string;
  body?: string;
  bodyHtml?: readonly string[];
};

/**
 * A paragraph that names a page by its link and then describes it in the next sentence ("[Prototype
 * Readiness Review]. For working prototypes …", /audits `prototype`): the link is the entry's title
 * and the sentence its body, as a colon-led line is. Only a whole sentence after the stop counts.
 */
function linkSentence(block: CorpusBlock): { link: LinkRun; body: InlineRun[] } | null {
  if (block.type !== 'paragraph') return null;
  const [first, second, ...rest] = block.runs;
  if (first?.type !== 'link' || second?.type !== 'text' || !/^\.\s+\S/.test(second.text))
    return null;
  return {
    link: first,
    body: [{ type: 'text', text: second.text.replace(/^\.\s*/, '') }, ...rest],
  };
}

/** The entries of a reading list: link-led lines, bold-linked list items, or `###` items. */
export function entriesOf(blocks: readonly CorpusBlock[]): {
  entries: Entry[];
  rest: CorpusBlock[];
} {
  const entries: Entry[] = [];
  const rest: CorpusBlock[] = [];
  for (const block of blocks) {
    const led = linkLead(block) ?? linkSentence(block);
    if (led) {
      entries.push({
        title: plain(led.link.children),
        href: led.link.href,
        /* A linked row is one link, so its body is plain text (a link may not hold another). */
        body: plain(trimStart(led.body)),
      });
      continue;
    }
    if (block.type === 'list') {
      for (const item of block.items) {
        const lead = boldLead(item);
        const link = lead ? linkIn(lead.label) : undefined;
        if (lead) {
          const body = trimStart(lead.body);
          entries.push({
            title: labelTitle(lead.label).replace(/\.$/, ''),
            ...(link ? { href: link.href } : {}),
            ...(body.length > 0 ? (link ? { body: plain(body) } : rowBody(body)) : {}),
          });
        } else {
          const [only] = item;
          entries.push(
            only?.type === 'link' && item.length === 1
              ? { title: plain(only.children), href: only.href }
              : { title: plain(item) },
          );
        }
      }
      continue;
    }
    if (block.type === 'item') {
      const paras = block.blocks.filter((inner) => inner.type === 'paragraph');
      entries.push({
        title: block.headingText,
        ...(paras.length > 0
          ? {
              body: paras
                .map((inner) => (inner.type === 'paragraph' ? plain(inner.runs) : ''))
                .join(' '),
            }
          : {}),
      });
      continue;
    }
    rest.push(block);
  }
  return { entries, rest };
}

/** A reading list as ruled rows (the long-form router), two columns from four entries. */
export function RelatedBand({ band }: { band: CorpusBand }) {
  const blocks = content(band);
  const [first] = blocks;
  const leadText =
    first?.type === 'paragraph' && !linkLead(first) && !hasLink(first.runs)
      ? plain(first.runs)
      : undefined;
  const { entries, rest } = entriesOf(leadText ? blocks.slice(1) : blocks);
  const footer = rest.length > 0 ? <BandBody blocks={rest} /> : undefined;
  /* A term index (every entry a link-led line, /glossary's five groups) is two columns from two
     entries, so the groups share one grid down the page instead of switching between one column
     and two by their counts (29 Oct 2026). Other lists keep one column under four. */
  const termIndex = entries.length >= 2 && /^A+P?$/.test(signature(band));
  return (
    /* One entry under a full-width head was a stub: ~500px of band for one row (/audits `prototype`,
       review 29 Oct). A single entry reads beside its head instead, the band a head's height. */
    <ContentSection
      {...head(band)}
      data-band="K"
      lead={leadText}
      footer={footer}
      {...(entries.length === 1 ? { arrangement: 'beside' as const } : {})}
    >
      <Layout
        as="ul"
        columns={entries.length >= 4 || termIndex ? { base: 1, md: 2 } : { base: 1 }}
        colGap="gutter"
        rowGap="none"
      >
        {entries.map((entry) => (
          <ListCard
            key={`${entry.href ?? ''}-${entry.title}`}
            titleAs="h3"
            title={entry.title}
            href={entry.href}
            {...(entry.bodyHtml ? { bodyHtml: entry.bodyHtml } : { body: entry.body })}
          />
        ))}
      </Layout>
    </ContentSection>
  );
}

/* ── Industries (S7, and home's approved sector cards) ───────────────────────── */

/** Sector links, from a link row or a sentence of links. */
function sectorLinks(band: CorpusBand): { href: string; title: string }[] {
  const out: { href: string; title: string }[] = [];
  for (const block of content(band)) {
    if (block.type === 'links') {
      out.push(...block.links.map((link) => ({ href: link.href, title: link.labelText })));
    } else if (block.type === 'paragraph') {
      for (const run of block.runs) {
        if (run.type === 'link') out.push({ href: run.href, title: plain(run.children) });
      }
    }
  }
  return out;
}

/** Counts the approved sector card set fills without a hole (three or four across). */
const WHOLE_ROWS: Readonly<Record<number, 3 | 4>> = { 3: 3, 4: 4, 6: 3, 8: 4, 9: 3, 12: 4 };

/**
 * The sectors a page knows. Where the count fills whole rows, home's approved sector cards (four or
 * three across, two on a phone, each its sector's photograph); otherwise S7 rows, each sector a row
 * with its photograph at the end, which hold any count without a hole (component-map § A, Q15). A
 * sentence of links (`P`) is the lead; a paragraph after the links is the footer.
 */
export function IndustriesBand({ page, band }: { page: CorpusPage; band: CorpusBand }) {
  const links = sectorLinks(band);
  const blocks = content(band);
  const sentence =
    blocks.length === 1 && blocks[0]?.type === 'paragraph' ? blocks[0] : undefined;
  const trailing = blocks.filter((block, index) => index > 0 && block.type === 'paragraph');
  const footer = trailing.length > 0 ? <BandBody blocks={trailing} /> : undefined;
  const image = (href: string, title: string) => {
    const photo = HOME_SECTOR_PHOTOS[href];
    return photo ? getKitPhoto(photo) : placeholderImage(page.route, band.id, slugOf(title));
  };
  const across = WHOLE_ROWS[links.length];
  if (across && !sentence) {
    const cards: BlockCardSetItem[] = links.map((link) => ({
      id: link.href,
      title: link.title,
      href: link.href,
      media: { type: 'image', image: image(link.href, link.title) },
    }));
    return (
      <ContentSection {...head(band)} data-band="C-image" footer={footer}>
        <BlockCardSet items={cards} lead="none" across={across} cue="title" phone="pair" />
      </ContentSection>
    );
  }
  return (
    <ContentSection
      {...head(band)}
      data-band="S7"
      footer={footer}
      {...(sentence ? { lead: plain(sentence.runs) } : {})}
    >
      <Layout as="ul" columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="none">
        {links.map((link) => {
          const img = image(link.href, link.title);
          return (
            <Teaser
              key={link.href}
              arrangement="row"
              size="sm"
              href={link.href}
              title={link.title}
              media={{ type: 'image', image: img }}
            />
          );
        })}
      </Layout>
    </ContentSection>
  );
}

/* ── Destinations (G16) ──────────────────────────────────────────────────────── */

/**
 * Items that each lead to a page: `###` items with a link line, or a link row alone. Where every
 * destination has its service scene, the approved Bento (four tracks for four or eight, else three);
 * otherwise one icon card each, under the full-width head (component-map G16).
 */
export function DestinationsBand({ band }: { band: CorpusBand }) {
  const blocks = content(band);
  const items = blocks.filter((block): block is ItemBlock => block.type === 'item');
  const firstOther = blocks.findIndex((block) => block.type !== 'paragraph');
  const leadParas = blocks.slice(0, firstOther < 0 ? blocks.length : firstOther);
  const [leadBlock, ...moreLead] = leadParas;
  const leadText =
    leadBlock?.type === 'paragraph' && !hasLink(leadBlock.runs)
      ? plain(leadBlock.runs)
      : undefined;
  const intro = leadText ? moreLead : leadParas;
  const dest =
    items.length > 0
      ? items.flatMap((item) => {
          const link = item.blocks.flatMap((inner) =>
            inner.type === 'links' ? inner.links : [],
          )[0];
          const paras = item.blocks.filter((inner) => inner.type === 'paragraph');
          return [
            {
              title: item.headingText,
              href: link?.href,
              ctaLabel: link?.labelText,
              bodyHtml: paras.map((inner) =>
                inner.type === 'paragraph' ? inlineToHtml(inner.runs) : '',
              ),
            },
          ];
        })
      : blocks
          .flatMap((block) => (block.type === 'links' ? block.links : []))
          .map((link) => ({
            title: link.labelText,
            href: link.href,
            ctaLabel: undefined,
            bodyHtml: [] as string[],
          }));
  const scenes = dest.map((d) => (d.href ? serviceSceneFor(d.href) : undefined));
  const introNode = intro.length > 0 ? <BandBody blocks={intro} /> : null;
  let set: ReactNode;
  if (dest.length >= 3 && scenes.every(Boolean) && dest.every((d) => d.href)) {
    const tiles: BentoItem[] = dest.map((d, index) => ({
      id: d.href as string,
      title: d.title,
      href: d.href as string,
      scene: scenes[index]!,
      ...(d.bodyHtml.length > 0
        ? { body: d.bodyHtml.map((h) => h.replace(/<[^>]+>/g, '')).join(' ') }
        : {}),
    }));
    set = <Bento items={tiles} tracks={dest.length % 4 === 0 ? 4 : 3} />;
  } else {
    const cards: BlockCardSetItem[] = dest.map((d) => ({
      id: d.href ?? d.title,
      title: d.title,
      ...(d.bodyHtml.length > 0 ? { bodyHtml: d.bodyHtml } : {}),
      ...(d.href ? { href: d.href, icon: glyphForRoute(d.href) } : {}),
      ...(d.ctaLabel ? { ctaLabel: d.ctaLabel } : {}),
    }));
    const labelled = cards.every((card) => card.ctaLabel);
    set = (
      <BlockCardSet
        items={cards}
        lead="none"
        across={cards.length % 4 === 0 ? 4 : 3}
        cue={labelled ? 'cta' : 'title'}
        scroll="never"
      />
    );
  }
  return (
    <ContentSection {...head(band)} data-band="C-icon" lead={leadText}>
      {introNode ? (
        <Layout rowGap="stack">
          {introNode}
          {set}
        </Layout>
      ) : (
        set
      )}
    </ContentSection>
  );
}

/* ── Tool groups (G23) ───────────────────────────────────────────────────────── */

/**
 * A tool hub group: each tool's bold linked name and the paragraph after it as one card, under the
 * head; a table or a closing paragraph follows the cards.
 *
 * Every tool is a worksheet with no cover yet, so each card is led by its tool's glyph (the icon
 * set), until the tools are drawn in the kit's Sketch style. Two across in every group.
 */
export function DirectoryBand({ band }: { page?: CorpusPage; band: CorpusBand }) {
  const blocks = content(band);
  const cards: BlockCardSetItem[] = [];
  const rest: CorpusBlock[] = [];
  /* Each tool is its bold linked name and the ONE paragraph after it; a linked card's body is
     plain text, since the whole card is the link and a link may not hold another. */
  let open: BlockCardSetItem | undefined;
  for (const block of blocks) {
    const lead = leadOf(block);
    if (lead) {
      const link = linkIn(lead.label);
      const body = trimStart(lead.body);
      const icon = link ? glyphForRoute(link.href) : undefined;
      open = {
        id: link?.href ?? labelTitle(lead.label),
        title: labelTitle(lead.label),
        ...(link ? { href: link.href } : {}),
        ...(icon ? { icon } : {}),
        ...(body.length > 0 ? { body: plain(body) } : {}),
      };
      cards.push(open);
    } else if (block.type === 'paragraph' && open && !open.body) {
      open.body = plain(block.runs);
    } else {
      open = undefined;
      rest.push(block);
    }
  }
  /* The tools as the borderless icon set (glyph, then title, then body), as /expertise `services`:
     a texture stand-in cover read as unfinished art (review 29 Oct), and a group of one took a
     horizontal box-beside-words shape its siblings did not. Every group is two across, so a single
     tool is the same card at the same track width as its neighbours. */
  const set = <BlockCardSet items={cards} lead="none" across={2} cue="title" scroll="never" />;
  return (
    <ContentSection {...head(band)} data-band="C-cards">
      {rest.length > 0 ? (
        <Layout rowGap="stack">
          {set}
          <BandBody blocks={rest} labelledBy={head(band).headingId} />
        </Layout>
      ) : (
        set
      )}
    </ContentSection>
  );
}

/* ── Prose, notes and closes (G19, G20) ──────────────────────────────────────── */

/**
 * The argument told in sentences: the paragraphs at the body measure, the band's links as its
 * footer. With a photograph of its own, a media split.
 */
export function TextBand({
  page,
  band,
  side = 'start',
}: {
  page: CorpusPage;
  band: CorpusBand;
  side?: 'start' | 'end';
}) {
  const blocks = content(band);
  const links = blocks.flatMap((block) => (block.type === 'links' ? block.links : []));
  const body = blocks.filter((block) => block.type !== 'links');
  const text = <BandBody blocks={body} />;
  const actions = links.length > 0 ? <LinkActions links={links} /> : undefined;
  if (page.composition.mediaBindings.some((b) => b.bound && b.supportsSection === band.id)) {
    return (
      <ContentSection
        {...head(band)}
        data-band="B"
        arrangement="media"
        media={{ image: slotImage(page, band.id), side, weight: 'photo' }}
        actions={actions}
      >
        {text}
      </ContentSection>
    );
  }
  return (
    <ContentSection {...head(band)} data-band="C-text" footer={actions}>
      {text}
    </ContentSection>
  );
}

/** A boundary on the band before it (`confidentiality`): one Callout under its own heading. */
export function NoteBand({ band }: { band: CorpusBand }) {
  return (
    <ContentSection {...head(band)} data-band="C-note">
      <ContentSectionText>
        <Callout html={proseHtml(content(band))} />
      </ContentSectionText>
    </ContentSection>
  );
}

/**
 * A page's last ask: the open close, its paragraphs the body (two at most), its link the action.
 * Without a link it is a short prose band. The open close is an ink island on CtaSection's own paper
 * band (decisions/2026-10-29-cta-band-is-an-ink-island), so it takes no surface from the plan.
 */
export function CloseBand({ page, band }: { page: CorpusPage; band: CorpusBand }) {
  const blocks = content(band);
  const links = blocks.flatMap((block) => {
    if (block.type === 'links') return block.links;
    if (block.type === 'paragraph') {
      const only =
        block.runs.length === 1 && block.runs[0]?.type === 'link' ? block.runs[0] : undefined;
      return only
        ? [{ href: only.href, label: only.children, labelText: plain(only.children) }]
        : [];
    }
    return [];
  });
  const paras = blocks.filter(
    (block): block is Extract<CorpusBlock, { type: 'paragraph' }> =>
      block.type === 'paragraph' &&
      !(block.runs.length === 1 && block.runs[0]?.type === 'link'),
  );
  const simple = paras.length <= 2 && paras.every((block) => !hasLink(block.runs));
  const others = blocks.some((block) => block.type !== 'paragraph' && block.type !== 'links');
  const [first, second] = links;
  if (first && simple && !others) {
    const body = paras.map((block) => plain(block.runs));
    return (
      <CtaSection
        id={band.id}
        data-band="L"
        arrangement="open"
        heading={band.headingText}
        body={body.length > 0 ? (body.slice(0, 2) as [string] | [string, string]) : undefined}
        actions={
          second
            ? [
                { label: first.labelText, href: first.href },
                { label: second.labelText, href: second.href },
              ]
            : [{ label: first.labelText, href: first.href }]
        }
      />
    );
  }
  return <TextBand page={page} band={band} />;
}
