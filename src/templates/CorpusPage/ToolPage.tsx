import { Fragment, type ReactNode } from 'react';

import { Layout, Prose } from '@/components';
import { Callout, ContentSection, ContentSectionText, DataTable } from '@/patterns';
import type { CorpusBand, CorpusBlock, CorpusPage } from '@/lib/corpus-types';
import { inlineToHtml, type InlineRun } from '@/lib/inline';

import { CorpusHero, head, headingIdOf } from './blocks';
import { hasSlot, slotImage } from './images';
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
 *   - a band with a table is its heading, lead and scope note, then the table in its own band;
 *   - the last band is the close, on tint.
 *
 * Paper carries the page; tint is the close alone. Nothing is reordered, and every word is the
 * corpus's.
 */
export function ToolPage({ page }: ToolPageProps) {
  const [action] = page.hero.actions;
  const workspaceId = action?.href.startsWith('#') ? action.href.slice(1) : undefined;
  const last = page.bands.length - 1;

  return (
    <>
      <CorpusHero page={page} texture />
      {page.bands.map((band, index) => (
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
        <ContentSection {...head(band)} data-band="E" lead={lead ? plain(lead) : undefined}>
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

  /* A band with a table: its heading, lead and scope note, then the table in a band of its own. */
  if (table) {
    const [lead, ...note] = paragraphs;
    return (
      <>
        <ContentSection
          {...head(band)}
          data-band="C-text"
          lead={lead ? plain(lead) : undefined}
        >
          {note.length > 0 ? <Callout tone="example" html={runsHtml(note)} /> : null}
        </ContentSection>
        <ContentSection id={`${band.id}-2`} data-band="E">
          <ToolTable table={table} labelledBy={headingIdOf(band)} />
        </ContentSection>
      </>
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
          head: 'title',
        }}
      >
        <ContentSectionText>
          <Prose html={runsHtml(paragraphs)} />
        </ContentSectionText>
      </ContentSection>
    );
  }

  /* Plain words: a limits note and the like stay plain. */
  return (
    <ContentSection {...head(band)} data-band="C-text">
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
        {table ? <ToolTable table={table} labelledBy={headingId} /> : null}
        {after.length > 0 ? (
          <ContentSectionText>
            <Prose html={runsHtml(after)} />
          </ContentSectionText>
        ) : null}
      </Layout>
    </ContentSection>
  );
}

/** M15 — a comparison table, boxed, named by the heading above it. */
function ToolTable({ table, labelledBy }: { table: TableBlock; labelledBy: string }) {
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
