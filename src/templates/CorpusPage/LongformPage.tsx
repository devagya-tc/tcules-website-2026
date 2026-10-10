import { Fragment, type ReactNode } from 'react';

import { Layout, Media, Prose, Section } from '@/components';
import {
  BlockCardSet,
  ContentSection,
  ContentSectionText,
  CtaRow,
  DataTable,
  Statement,
  Steps,
  TableOfContents,
  type BlockCardSetItem,
  type TocItem,
} from '@/patterns';
import { corpusImage } from '@/lib/corpus-images';
import type { CorpusBand, CorpusBlock, CorpusCaseRef, CorpusPage } from '@/lib/corpus-types';
import { FULL_COLUMN } from '@/lib/image-sizes';
import { inlineToHtml, type InlineRun } from '@/lib/inline';
import { renderInline } from '@/lib/inline-render';

import { CorpusHero, EnquiryBand, TableLegend, bodyOf, head, headingIdOf } from './blocks';
import { coverFor } from './images';
import { blocksOf, hasLink, html, plain, trimStart } from './text';

export type LongformFamily = 'case';

export type LongformPageProps = {
  page: CorpusPage;
  family: LongformFamily;
  /** The cases the page cites, as each case's own page describes them (title, cover). */
  caseRefs: Readonly<Record<string, CorpusCaseRef>>;
};

type TableBlock = Extract<CorpusBlock, { type: 'table' }>;

/**
 * TIER 3 — the long-form page: a page you would read like an article, from the `_pages/` corpus
 * (page-mapping § 1.1, M19). Its argument is a run of sections in ONE shell: a table-of-contents rail
 * beside a reading column, so the outline names the document and the reader can leave and return. The
 * bands before and after the shell are composed: they are the page's facts and its calls to action.
 *
 * What a long-form page is NOT is a stack of bands. The column is Prose, and what breaks it is a
 * numbered method (Steps), a bound artefact (Media) or a table, so it never runs more than two
 * Prose-only sections in a row (§ 3). Every shape is read from the words' structure, not a band id:
 *
 *   case     the hero, then its last lede paragraph as the one large statement (a split from the
 *            hero, page-mapping J); the record ("At a glance": a table whose first row is a pair);
 *            the argument shell, from the first band after the record to the last band before a
 *            table of peers; the impact cards; the cases to read next; the enquiry.
 *
 * Nothing is reordered, and every word is the corpus's.
 */
export function LongformPage({ page, family, caseRefs }: LongformPageProps) {
  if (family !== 'case') return null;
  return <CasePage page={page} caseRefs={caseRefs} />;
}

/* ── The case ─────────────────────────────────────────────────────────────────── */

function CasePage({
  page,
  caseRefs,
}: {
  page: CorpusPage;
  caseRefs: LongformPageProps['caseRefs'];
}) {
  const { hero } = page;
  const anchor = page.conversion?.anchor ?? 'enquiry';
  const bands = page.bands;

  /* The structure, read from the bands' blocks: a leading record, the shell, then a table of peers,
     a set of links to other cases, and the form. */
  const record = bands[0] && isRecord(bands[0]) ? bands[0] : undefined;
  const close = bands.find((band) => band.id === anchor);
  const peers = bands.find((band) => band !== record && isPeers(band));
  const related = bands.find((band) => hasCaseLinks(band) && band !== close);
  const shellStart = record ? 1 : 0;
  const shellEnd = peers
    ? bands.indexOf(peers)
    : related
      ? bands.indexOf(related)
      : bands.length;
  const shell = bands.slice(shellStart, shellEnd);

  /* The hero keeps two ledes; a third paragraph that is one sentence is the case's thesis, and goes to
     the next band as a statement (J) so the hero holds its fold. */
  const [lede1, lede2, ...thesis] = hero.lede;
  const ledes = [lede1, lede2].filter((runs): runs is InlineRun[] => Boolean(runs));
  const outline: TocItem[] = shell.map((band) => ({
    label: band.headingText,
    href: `#${headingIdOf(band)}` as const,
  }));

  return (
    <>
      <CorpusHero page={page} ledes={ledes} texture />

      {thesis.map((runs, index) => (
        <Statement
          key={index}
          as="p"
          align="start"
          id={index === 0 ? 'case-thesis' : `case-thesis-${index + 1}`}
        >
          {plain(runs)}
        </Statement>
      ))}

      {record ? <RecordBand band={record} /> : null}

      {shell.length > 0 ? (
        /* The fold rule's exception for reading (visual-direction § 1.3): the argument is a document read by
           scrolling, beside its own outline, so no height could hold it. A plain wrapper, as the index's. */
        <div data-fold-exempt="Long-form argument: a document read by scrolling beside its outline (page-mapping M19).">
          <Section as="div" surface="paper" data-band="long-form">
            <Layout
              columns={outline.length >= 2 ? { base: 1, lg: [1, 4] } : { base: 1 }}
              colGap="column"
              rowGap="stack"
              align="start"
            >
              {outline.length >= 2 ? <TableOfContents items={outline} /> : null}
              <Layout as="article" rowGap="stack">
                {shell.map((band) => (
                  <ArticleSection key={band.id} page={page} band={band} />
                ))}
              </Layout>
            </Layout>
          </Section>
        </div>
      ) : null}

      {peers ? <ImpactBand band={peers} /> : null}
      {related ? <RelatedBand page={page} band={related} caseRefs={caseRefs} /> : null}
      {close ? <EnquiryBand page={page} band={close} surface="tint" /> : null}
    </>
  );
}

/** A table whose first body row is a pair and whose header is too: a record, not a comparison. */
function isRecord(band: CorpusBand): boolean {
  const table = blocksOf(band, 'table')[0];
  return Boolean(table && table.header.length === 2 && blocksOf(band, 'table').length === 1);
}

/** A band that is only a table of peers (rows with no list or prose around them). */
function isPeers(band: CorpusBand): boolean {
  const live = band.blocks.filter((block) => block.type !== 'comment');
  return live.length === 1 && live[0]?.type === 'table';
}

function hasCaseLinks(band: CorpusBand): boolean {
  return blocksOf(band, 'links').some((block) =>
    block.links.some((link) => link.href.startsWith('/case-studies/')),
  );
}

/* ── Record ───────────────────────────────────────────────────────────────────── */

/**
 * M16 — "At a glance": a key/value record whose first row is a pair, so it has no header row. The
 * markdown parser read the first pair as the header, so it is put back as the first row. The band's own
 * heading names the table, so no caption prints it twice. Words after the table (the related services,
 * with their inline links) follow it at reading width.
 */
function RecordBand({ band }: { band: CorpusBand }) {
  const table = blocksOf(band, 'table')[0];
  const after = band.blocks.flatMap((block) =>
    block.type === 'paragraph' ? [block.runs] : [],
  );
  const rows = table
    ? [table.header, ...table.rows].map((row) => ({
        header: plain(row[0] ?? []),
        cellsHtml: [inlineToHtml(row[1] ?? [])],
      }))
    : [];
  return (
    <ContentSection {...head(band)} data-band="E">
      {table ? (
        <DataTable
          head={false}
          labelledBy={headingIdOf(band)}
          keyColumn={{ heading: '' }}
          columns={[{ heading: '' }]}
          rows={rows}
        />
      ) : null}
      {after.length > 0 ? (
        <ContentSectionText>
          {after.map((runs, index) => (
            <p key={index}>{renderInline(runs)}</p>
          ))}
        </ContentSectionText>
      ) : null}
    </ContentSection>
  );
}

/* ── The argument shell ───────────────────────────────────────────────────────── */

/** A numbered list whose items each open with a one-word action and a full stop ("Stabilise. …"). */
function stepsOf(items: readonly InlineRun[][]) {
  const steps = items.map((runs) => {
    const [first, ...rest] = runs;
    if (first?.type !== 'text') return null;
    const match = /^([^.]{1,40}\.)\s+(.*)$/s.exec(first.text);
    if (!match) return null;
    const bodyRuns: InlineRun[] = [{ type: 'text', text: match[2] ?? '' }, ...rest];
    return { title: match[1] ?? '', ...bodyOf(trimStart(bodyRuns)) };
  });
  return steps.every(Boolean) ? (steps as NonNullable<(typeof steps)[number]>[]) : null;
}

const listHtml = (block: Extract<CorpusBlock, { type: 'list' }>) => {
  const tag = block.ordered ? 'ol' : 'ul';
  return `<${tag}>${block.items.map((item) => `<li>${inlineToHtml(item)}</li>`).join('')}</${tag}>`;
};

/**
 * One section of the argument: its h2, then its blocks in order. Consecutive paragraphs and lists share
 * one Prose flow; a numbered method is Steps; a table is a boxed DataTable; a bound artefact is a
 * Media placed after the section's last list, or else its last paragraph (the block that names it).
 */
function ArticleSection({ page, band }: { page: CorpusPage; band: CorpusBand }) {
  const binding = page.composition.mediaBindings.find(
    (b) => b.bound && b.supportsSection === band.id,
  );
  const blocks = band.blocks.filter((block) => block.type !== 'comment');

  let mediaAfter = -1;
  if (binding) {
    blocks.forEach((block, index) => {
      if (block.type === 'list') mediaAfter = index;
    });
    if (mediaAfter < 0) {
      blocks.forEach((block, index) => {
        if (block.type === 'paragraph') mediaAfter = index;
      });
    }
  }

  const out: ReactNode[] = [];
  let flow = '';
  const flush = () => {
    if (flow) out.push(<Prose key={`prose-${out.length}`} html={flow} />);
    flow = '';
  };

  blocks.forEach((block, index) => {
    switch (block.type) {
      case 'paragraph':
        flow += html(block.runs);
        break;
      case 'labelled':
        flow += `<p><strong>${inlineToHtml(block.label)}</strong> ${inlineToHtml(block.body)}</p>`;
        break;
      case 'list': {
        const steps = block.ordered ? stepsOf(block.items) : null;
        if (steps) {
          flush();
          out.push(<Steps key={`steps-${out.length}`} steps={steps} />);
        } else {
          flow += listHtml(block);
        }
        break;
      }
      case 'table':
        flush();
        out.push(
          <CorpusTable
            key={`table-${out.length}`}
            table={block}
            labelledBy={headingIdOf(band)}
          />,
        );
        break;
      case 'quote':
      case 'item':
      case 'links':
      case 'form':
        break;
    }
    if (binding && index === mediaAfter) {
      flush();
      out.push(
        <Media key={`media-${out.length}`} image={corpusImage(binding)} sizes={FULL_COLUMN} />,
      );
    }
  });
  flush();

  return (
    <Layout as="section" id={band.id} aria-labelledby={headingIdOf(band)} rowGap="block">
      <h2 id={headingIdOf(band)}>{band.headingText}</h2>
      {out.map((node, index) => (
        <Fragment key={index}>{node}</Fragment>
      ))}
    </Layout>
  );
}

function CorpusTable({ table, labelledBy }: { table: TableBlock; labelledBy: string }) {
  const [key = [], ...columns] = table.header;
  return (
    <DataTable
      labelledBy={labelledBy}
      keyColumn={{ heading: plain(key) }}
      columns={columns.map((cell) => ({ heading: plain(cell) }))}
      rows={table.rows.map((row) => ({
        header: plain(row[0] ?? []),
        cellsHtml: row.slice(1).map((cell) => inlineToHtml(cell)),
      }))}
    />
  );
}

/* ── Impact ───────────────────────────────────────────────────────────────────── */

/**
 * M17 — a table whose rows are peers (impact dimensions): cards under a centred head, the two header
 * words once above the set as a legend. A visual peak after the reading column.
 */
function ImpactBand({ band }: { band: CorpusBand }) {
  const table = blocksOf(band, 'table')[0];
  if (!table) return null;
  const [from, to] = table.header;
  const items: BlockCardSetItem[] = table.rows.map((row) => ({
    id: plain(row[0] ?? []),
    title: plain(row[0] ?? []),
    ...bodyOf(row[1] ?? []),
  }));
  return (
    <ContentSection {...head(band)} data-band="C-text" align="center">
      <Layout rowGap="block">
        <TableLegend from={plain(from ?? [])} to={plain(to ?? [])} />
        <BlockCardSet items={items} lead="none" across={3} frame="none" scroll="never" />
      </Layout>
    </ContentSection>
  );
}

/* ── Related ──────────────────────────────────────────────────────────────────── */

/** "Read the Gold Image Printing case" → "Gold Image Printing": the name a cover is filed under. */
const caseNameOf = (linkText: string) =>
  /^Read the (.+?) case\.?$/.exec(linkText)?.[1] ?? linkText;

/**
 * M8 — cases to read next, as cards: each case page's own title and cover (a pre-existing image the
 * corpus already points at, else the register's placeholder), linked with the authored link text. The
 * band's lead is its one paragraph; its last lone link, to a service, is the foot (M9).
 */
function RelatedBand({
  page,
  band,
  caseRefs,
}: {
  page: CorpusPage;
  band: CorpusBand;
  caseRefs: LongformPageProps['caseRefs'];
}) {
  const links = blocksOf(band, 'links').flatMap((block) => block.links);
  const caseLinks = links.filter((link) => link.href.startsWith('/case-studies/'));
  const foot = links.find((link) => !link.href.startsWith('/case-studies/'));
  const lead = band.blocks.find((block) => block.type === 'paragraph');
  const leadRuns = lead?.type === 'paragraph' ? lead.runs : [];

  const items: BlockCardSetItem[] = caseLinks.map((link) => {
    const ref = caseRefs[link.href];
    return {
      id: link.href,
      title: ref?.title ?? caseNameOf(link.labelText),
      media: { type: 'image', image: coverFor(page, caseNameOf(link.labelText), ref) },
      href: link.href,
      ctaLabel: link.labelText,
    };
  });

  return (
    <ContentSection
      {...head(band)}
      data-band="M"
      lead={leadRuns.length > 0 && !hasLink(leadRuns) ? plain(leadRuns) : undefined}
      footer={
        foot ? (
          <CtaRow rule actions={[{ label: foot.labelText, href: foot.href }]} />
        ) : undefined
      }
    >
      <BlockCardSet items={items} lead="none" cue="cta" scroll="never" />
    </ContentSection>
  );
}
