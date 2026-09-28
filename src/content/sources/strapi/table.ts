import type { ContentTable } from '../../types';
import { richTextToHtml, richTextToPlainText } from './rich-text';

/**
 * The fields every Strapi table component carries — `ComponentAuditTable`, `ComponentServiceTable`,
 * `ComponentExpertiseTable`, `ComponentToolTable` and `ComponentGlossaryTable` are one shape under
 * five names, and each query aliases `columns`/`rows` to `tableColumns`/`tableRows` so the aliases
 * do not collide with a card grid's `columns` on the same union.
 *
 * Structural on purpose: the five block types each declare these fields, and none of them needs to
 * be named here for this mapper to accept it.
 */
export type StrapiTableFields = {
  caption?: string | null;
  summary?: string | null;
  tableColumns?: Array<{ id?: string | null; heading?: string | null }> | null;
  tableRows?: Array<{
    id?: string | null;
    rowHeading?: string | null;
    cells?: Array<{ id?: string | null; content?: unknown }> | null;
  }> | null;
};

function text(value: string | null | undefined): string {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Map a Strapi table block to the `ContentTable` view model that `DataTable` renders.
 *
 * This replaces five identical `renderTable` functions that stringified the block into a `<table>`
 * and put every cell through `richTextToPlainText`, which dropped the links and inline marks the
 * editors had written (a live Design Systems table links each row to its service page). Cells now
 * go through `richTextToHtml` — the same sanitiser every other rich-text field uses — so the marks
 * survive and nothing unescaped reaches the page.
 *
 * ── Where the row header comes from ─────────────────────────────────────────────────────────
 * The content model allows two ways to author it, and one of them is live. Measured across the 39 published tables on
 * 28 Sep 2026: every one sends `cells.length === columns.length`, so the first CELL is the row
 * header. `rowHeading` is null on most rows; where it is set it duplicates that first cell on 42 of
 * 46, and on the other four the first cell wins, as it always has. The older shape — `rowHeading` set
 * and one cell per DATA column — is still honoured, because the model permits it:
 *
 *   cells.length >= columns.length   the first cell is the row header (rowHeading as fallback)
 *   otherwise                        rowHeading is the row header, every cell is data
 *
 * The first column heading is always the key column's head, so the data columns are always the
 * headings after it. The old string renderer got this wrong for the second shape: it emitted N
 * column heads over N+1 columns.
 *
 * ── What it tolerates, and what it drops ────────────────────────────────────────────────────
 * · A row whose header AND cells are all empty is dropped — it is an authoring accident.
 * · A row with fewer cells than data columns is padded with empty cells; one with more is
 *   truncated. A cell with no column head cannot be read in the stacked order, so an extra cell
 *   has nowhere honest to go. DataTable warns on neither — the seam has already made them agree.
 * · No column heads → blank heads over the widest row's cells, rather than losing the cells.
 * · No columns and no rows → `undefined`, and the block disappears as the old string did.
 */
export function mapTable(block: StrapiTableFields): ContentTable | undefined {
  const headings = (block.tableColumns ?? []).map((column) => text(column.heading));
  const sourceRows = block.tableRows ?? [];
  if (headings.length === 0 && sourceRows.length === 0) return undefined;

  // With no column heads at all (possible in the model, absent from live content) the widest row
  // decides the count and every head is blank, rather than the cells being thrown away.
  const dataCount =
    headings.length > 0
      ? headings.length - 1
      : Math.max(0, ...sourceRows.map((row) => row.cells?.length ?? 0));

  const rows = sourceRows.flatMap((row) => {
    const rowHeading = text(row.rowHeading);
    const cells = row.cells ?? [];
    const firstCellIsHeader = headings.length > 0 && cells.length >= headings.length;
    const header = firstCellIsHeader
      ? richTextToPlainText(cells[0]?.content) || rowHeading
      : rowHeading;
    const dataCells = (firstCellIsHeader ? cells.slice(1) : cells).map((cell, index) =>
      richTextToHtml(cell.content, `table cell ${index + 1} of row "${header}"`),
    );

    // Pad or truncate to the data-column count, so the view model always agrees with its heads.
    const cellsHtml = Array.from({ length: dataCount }, (_, index) => dataCells[index] ?? '');
    if (!header && cellsHtml.every((cell) => cell === '')) return [];

    return [{ header, cellsHtml }];
  });

  if (rows.length === 0) return undefined;

  const caption = text(block.caption);
  const summary = text(block.summary);

  return {
    ...(caption ? { caption } : {}),
    ...(summary ? { summary } : {}),
    keyColumn: { heading: headings[0] ?? '' },
    columns: Array.from({ length: dataCount }, (_, index) => ({
      heading: headings[index + 1] ?? '',
    })),
    rows,
  };
}
