import { Fragment, type ReactNode } from 'react';

import { Layout, Prose, type LayoutProps } from '@/components';
import { BlockCard, Callout, ContentSection, ContentSectionText, DataTable } from '@/patterns';
import type { CorpusBand, CorpusBlock, CorpusPage } from '@/lib/corpus-types';
import { inlineToHtml, type InlineRun } from '@/lib/inline';

import { CorpusHero, TableLegend, head, headingIdOf } from './blocks';
import { hasSlot, slotImage } from './images';
import { formBeforeFaq } from './order';
import styles from './CorpusPage.module.css';
import { blocksOf, html, plain } from './text';

export type ToolPageProps = { page: CorpusPage };

type TableBlock = Extract<CorpusBlock, { type: 'table' }>;
type ItemBlock = Extract<CorpusBlock, { type: 'item' }>;

/**
 * TIER 3 — the tool page: a free tool from the `_pages/` corpus (page-mapping § 4.7). A tool page is a
 * utility, not a showcase, so it has the bands its content has and no more: a short how-to, the tool's
 * own place, the tables that teach a reader to read its output, a limits note and a close.
 *
 * Every shape is decided from the words' structure and never from a band id:
 *
 *   - a band of paragraphs with a registered image slot is a media split, the instructions beside the
 *     tool's shot;
 *   - the band the hero's action points at (`#workspace`) holds the tool: its lead paragraph, then the
 *     mount. A `###` item in it is split into the next band so its table keeps a heading of its own;
 *   - a band with a table is one band, beside: the heading and lead in the head track, the scope note
 *     and then the table's tiles in the body, so the set sits under the heading it answers;
 *   - the workspace item's table is the trace the tool follows: one row across, read as a path;
 *   - the last band is the close, on tint.
 *
 * Paper carries the page; tint is the close alone. Nothing is reordered but the one shared rule
 * (a form above a FAQ, order.ts), and every word is the corpus's.
 */
export function ToolPage({ page }: ToolPageProps) {
  const [action] = page.hero.actions;
  const workspaceId = action?.href.startsWith('#') ? action.href.slice(1) : undefined;
  const bands = formBeforeFaq(page.bands);
  const last = bands.length - 1;

  return (
    <>
      <CorpusHero page={page} texture />
      {bands.map((band, index) => (
        <Fragment key={band.id}>
          <ToolBand
            page={page}
            band={band}
            isWorkspace={band.id === workspaceId}
            isClose={index === last}
          />
        </Fragment>
      ))}
    </>
  );
}

/** The paragraphs of a band before its first non-paragraph block, as runs. */
function leadingParagraphs(band: CorpusBand): InlineRun[][] {
  const out: InlineRun[][] = [];
  for (const block of band.blocks) {
    if (block.type === 'comment') continue;
    if (block.type !== 'paragraph') break;
    out.push(block.runs);
  }
  return out;
}

/** The paragraphs after a band's last table, as runs. */
function paragraphsAfter(blocks: readonly CorpusBlock[]): InlineRun[][] {
  const live = blocks.filter((block) => block.type !== 'comment');
  let at = -1;
  live.forEach((block, i) => {
    if (block.type === 'table') at = i;
  });
  return live
    .slice(at + 1)
    .flatMap((block) => (block.type === 'paragraph' ? [block.runs] : []));
}

const runsHtml = (paragraphs: readonly InlineRun[][]) => paragraphs.map(html).join('');

function ToolBand({
  page,
  band,
  isWorkspace,
  isClose,
}: {
  page: CorpusPage;
  band: CorpusBand;
  isWorkspace: boolean;
  isClose: boolean;
}) {
  const paragraphs = leadingParagraphs(band);
  const table = blocksOf(band, 'table')[0];
  const item = blocksOf(band, 'item')[0];

  /* The tool's own place: the lead, the mount, and the item (if any) in a band of its own. */
  if (isWorkspace) {
    const [lead, ...rest] = paragraphs;
    return (
      <>
        {/* Centred (§ 3.5): the head over the tool, the page's large object, the way a centred head
            sits over a full-column object. Its neighbours are start-weighted (the media split above,
            the item's table below), so the centre axis is what tells this band apart. */}
        <ContentSection
          {...head(band)}
          data-band="E"
          align="center"
          lead={lead ? plain(lead) : undefined}
        >
          <ToolMount />
          {rest.length > 0 ? (
            <ContentSectionText>
              <Prose html={runsHtml(rest)} />
            </ContentSectionText>
          ) : null}
        </ContentSection>
        {item ? <ToolItem item={item} id={`${band.id}-2`} /> : null}
      </>
    );
  }

  /* A close: the last band, on tint, its words (and the links inside them) as written. */
  if (isClose) {
    return (
      <ContentSection {...head(band)} data-band="L" surface="tint">
        <ContentSectionText>
          <Prose html={runsHtml(paragraphs)} />
        </ContentSectionText>
      </ContentSection>
    );
  }

  /* A band with a table: the heading and lead beside the scope note and the table's set. Split into
     two bands, the set sat a section's air below a head it had no visible tie to, and the note left the
     band's end half empty; beside, the head track holds the claim and the body holds its evidence. */
  if (table) {
    const [lead, ...note] = paragraphs;
    return (
      <ContentSection
        {...head(band)}
        data-band="C-table"
        arrangement="beside"
        lead={lead ? plain(lead) : undefined}
      >
        {note.length > 0 ? <Callout tone="example" html={runsHtml(note)} /> : null}
        <ToolTable table={table} labelledBy={headingIdOf(band)} />
      </ContentSection>
    );
  }

  /* Instructions with a shot of the tool beside them. */
  if (hasSlot(page, band.id)) {
    return (
      <ContentSection
        {...head(band)}
        data-band="B"
        arrangement="media"
        media={{
          image: slotImage(page, band.id),
          side: 'end',
          weight: 'photo',
          head: 'lg',
        }}
      >
        <ContentSectionText>
          <Prose html={runsHtml(paragraphs)} />
        </ContentSectionText>
      </ContentSection>
    );
  }

  /* Plain words: a limits note and the like stay plain, on the centre axis. Built start-weighted, the
     page ran four bands down the start edge with the right half empty (head + note, table, words,
     close); centred, the words read as a pause between the table and the close (§ 3.5: 3 to 5
     centred heads a page, never two adjacent; a centred body is centred as a block, its lines start-
     aligned). The tint close after it stays start-weighted. */
  return (
    <ContentSection {...head(band)} data-band="C-text" align="center">
      <ContentSectionText>
        <Prose html={runsHtml(paragraphs)} />
      </ContentSectionText>
    </ContentSection>
  );
}

/**
 * A `###` item split out of the workspace band (page-mapping 2b): a band with no heading of its own,
 * because ContentSection's heading is always an h2. The item's h3 carries its authored id, its table is
 * named by it, and the paragraph that follows the table is the band's closing words.
 */
function ToolItem({ item, id }: { item: ItemBlock; id: string }) {
  const table = blocksOf({ blocks: item.blocks } as CorpusBand, 'table')[0];
  const after = paragraphsAfter(item.blocks);
  const headingId = item.id ?? `${id}-heading`;
  return (
    <ContentSection id={id} data-band="E">
      <Layout rowGap="block">
        <h3 id={headingId}>{item.headingText}</h3>
        {table ? <ToolTable table={table} labelledBy={headingId} across="row" /> : null}
        {after.length > 0 ? (
          <ContentSectionText>
            <Prose html={runsHtml(after)} />
          </ContentSectionText>
        ) : null}
      </Layout>
    </ContentSection>
  );
}

/**
 * Tile tracks. `set` (default) is a body-track grid: two across, so a set beside a head never runs
 * to slivers. `row` is a path read across the full column: every row in one line from 1024, up to
 * four, numbered because a path has an order; more than four is not a path a reader can follow and
 * falls back to the set. A set is unnumbered: its rows are peers, and a numeral would rank them.
 */
type ToolTableAcross = 'set' | 'row';

function tileColumns(count: number, across: ToolTableAcross): LayoutProps['columns'] {
  if (across === 'row' && count >= 2 && count <= 4) {
    return { base: 1, md: 2, lg: count as 2 | 3 | 4 };
  }
  return { base: 1, md: 2 };
}

/**
 * M15 — a comparison table. A table of a key and one or two further columns is a set of things each
 * with a fact or two (a part of the interaction and what to specify, a finding and what to check):
 * tiles, the key as the title, the second column as the body and the third, where there is one, as
 * the labelled foot. A wider table, or a single row, stays the DataTable it is. Every word is the
 * table's; the headings of the columns become the foot's label.
 */
function ToolTable({
  table,
  labelledBy,
  across = 'set',
}: {
  table: TableBlock;
  labelledBy: string;
  across?: ToolTableAcross;
}) {
  const [key = [], ...columns] = table.header;
  const tiles = columns.length >= 1 && columns.length <= 2 && table.rows.length >= 2;

  if (!tiles) {
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

  const footLabel = columns[1] ? plain(columns[1]) : undefined;
  const bodyLabel = columns[0] ? plain(columns[0]) : undefined;
  return (
    <Layout rowGap="block">
      {/* The key and body columns' headings, once above the set (M17's legend), so the body keeps the
          label a tile has no room to repeat. The third column's heading is each tile's foot label. */}
      {bodyLabel ? <TableLegend from={plain(key)} to={bodyLabel} /> : null}
      <Layout
        as="ul"
        aria-labelledby={labelledBy}
        columns={tileColumns(table.rows.length, across)}
        colGap="gutter"
        rowGap="column"
        equalRows
      >
        {table.rows.map((row, i) => {
          const foot = footLabel && row[2] ? plain(row[2]) : undefined;
          return (
            <BlockCard
              key={`${labelledBy}-${i}`}
              index={across === 'row' ? i + 1 : undefined}
              title={plain(row[0] ?? [])}
              bodyHtml={[inlineToHtml(row[1] ?? [])]}
              detail={footLabel && foot ? { label: footLabel, value: foot } : undefined}
            />
          );
        })}
      </Layout>
    </Layout>
  );
}

/**
 * M24 / G10 — the tool mount. A labelled panel in the place the record builder will be, at the height
 * it will need. The tool is a product feature with its own spec; this pass reserves its place.
 */
function ToolMount(): ReactNode {
  return (
    <div className={styles.panel}>
      <Layout rowGap="tight">
        <p className={styles.panelLabel}>Tool workspace</p>
        <p className={styles.panelNote}>The record builder opens here once it is built.</p>
      </Layout>
    </div>
  );
}
