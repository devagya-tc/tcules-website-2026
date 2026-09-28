import { Layout, Prose } from '@/components';
import { cx } from '@/lib/cx';

import styles from './DataTable.module.css';

/**
 * How one column's cells behave. Column behaviour is PRESENTATION, set by the caller per column —
 * the column COUNT is data and is never a variant.
 *
 *   fluid    wraps and shrinks to share the width. The default for a data column.
 *   nowrap   never wraps, so never narrows below its longest line. For short keys and
 *            identifiers — "SC 2.5.8", "v2.4", a code span. A long nowrap cell widens the table:
 *            that is an authoring error the specimen shows, not a case this handles.
 *   hold     wraps, but never narrows below --dtab-hold-size (192). A column that must not be
 *            crushed by a greedy neighbour. The default for the key column.
 *   numeric  end-aligned with tabular figures, and nowrap. Head and cells align together. A data
 *            column only — the key column is a row header, and a number is not a name.
 *
 * Below the stacking threshold every behaviour is released: one value per line, start-aligned.
 */
export type DataTableKeyBehaviour = 'fluid' | 'nowrap' | 'hold';
export type DataTableColumnBehaviour = DataTableKeyBehaviour | 'numeric';

/** The first column: its head, over the row headers. */
export type DataTableKeyColumn = {
  heading: string;
  /** Defaults to `hold`. `numeric` is a compile error here, deliberately. */
  behaviour?: DataTableKeyBehaviour;
};

/** One data column. */
export type DataTableColumn = {
  heading: string;
  /** Defaults to `fluid`. */
  behaviour?: DataTableColumnBehaviour;
};

export type DataTableRow = {
  /** Plain-text row header — `<th scope="row">`, and the title of the row's group when stacked. */
  header: string;
  /**
   * One TRUSTED, seam-sanitised rich-text string per data column, in column order — the same
   * contract as `Prose`'s `html`. An empty string is an empty cell.
   */
  cellsHtml: readonly string[];
};

export type DataTableProps = {
  /** The table's name. Rendered as `<caption>`, so it is also the table's accessible name. */
  caption?: string;
  /** A plain-text lead-in, rendered as a paragraph immediately before the table. */
  summary?: string;
  keyColumn: DataTableKeyColumn;
  /** The data columns. One to five is the designed range; the count is data, never a variant. */
  columns: readonly DataTableColumn[];
  /** Three to eight is the designed range. Never sorted, filtered or paginated. */
  rows: readonly DataTableRow[];
};

const BEHAVIOUR_CLASS: Record<DataTableColumnBehaviour, string | undefined> = {
  fluid: undefined,
  nowrap: styles.nowrap,
  hold: styles.hold,
  numeric: styles.numeric,
};

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`DataTable: ${message}`);
}

/**
 * DataTable — the site's one table, built to docs/specs/DataTable.md (brief 10).
 *
 * A real `<table>`: an optional `<caption>`, a head row of `<th scope="col">`, and a body whose
 * first cell in every row is `<th scope="row">`. It is what a CMS `table` BLOCK becomes; Prose
 * keeps its own table rules for the long-form bodies that legitimately carry a markdown table.
 *
 * ── Why it is a pattern ─────────────────────────────────────────────────────────────────────
 * It consumes a content shape (columns × rows of rich text), and it composes two primitives —
 * `Layout` for the summary-to-table seam and each label/value pair, `Prose` for every cell's
 * trusted rich text — which a primitive may not import.
 *
 * ── Two reading orders, one markup ──────────────────────────────────────────────────────────
 * Wide, it is a table. Narrower than the md content column (703px and below — see the module),
 * every row becomes a group: the row header as its title, then each data cell as a key-above-value
 * pair whose key is the column head. The head row is then visually hidden but stays in the
 * accessibility tree, so a screen reader still reads a table with its header associations intact.
 * The repeated labels that make the stack readable by eye are `aria-hidden`, so they are not read
 * twice. No horizontal scroll at any width: the stack is the answer to a narrow track, never a
 * scroll container.
 *
 * ── Why the ARIA table roles are written out ────────────────────────────────────────────────
 * `role="table"`, `rowgroup`, `row`, `columnheader`, `rowheader` and `cell` restate what the
 * elements already mean, and at the wide arrangement they are redundant. They are here for the
 * stacked one: changing `display` on table elements makes WebKit drop their table semantics from
 * the accessibility tree, and the explicit roles are what keep the table a table in Safari once
 * its cells are blocks. Harmless where they are redundant; load-bearing where they are not.
 *
 * ── What it tolerates ───────────────────────────────────────────────────────────────────────
 * It never drops content and never throws. Out-of-contract input renders and warns in
 * development: no data columns (the key column alone), more than five data columns, fewer than
 * three or more than eight rows, a blank row header, a row whose cell count disagrees with the
 * columns (padded with empty cells, or truncated — a cell with no column head cannot be read in
 * the stacked order). Zero rows renders nothing.
 */
export function DataTable({ caption, summary, keyColumn, columns, rows }: DataTableProps) {
  if (rows.length === 0) {
    warn('received no rows; rendering nothing.');
    return null;
  }

  if (columns.length === 0) {
    warn(
      'received no data columns — a key column alone is a list, not a table. Rendering the row headers.',
    );
  } else if (columns.length > 5) {
    warn(`received ${columns.length} data columns; the designed maximum is five.`);
  }

  if (rows.length < 3 || rows.length > 8) {
    warn(`received ${rows.length} rows; the designed range is three to eight.`);
  }

  const keyBehaviour = keyColumn.behaviour ?? 'hold';

  return (
    <Layout rowGap="block" className={styles.root}>
      {summary ? (
        <Prose>
          <p>{summary}</p>
        </Prose>
      ) : null}
      <table className={styles.table} role="table">
        {caption ? <caption className={styles.caption}>{caption}</caption> : null}
        <thead className={styles.head} role="rowgroup">
          <tr role="row">
            <th
              scope="col"
              role="columnheader"
              className={cx(styles.colHead, BEHAVIOUR_CLASS[keyBehaviour])}
            >
              {keyColumn.heading}
            </th>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                role="columnheader"
                className={cx(styles.colHead, BEHAVIOUR_CLASS[column.behaviour ?? 'fluid'])}
              >
                {column.heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.body} role="rowgroup">
          {rows.map((row, rowIndex) => {
            if (!row.header.trim()) warn(`row ${rowIndex + 1} has a blank row header.`);
            if (row.cellsHtml.length !== columns.length) {
              warn(
                `row ${rowIndex + 1} has ${row.cellsHtml.length} cells for ${columns.length} data columns; ${
                  row.cellsHtml.length < columns.length
                    ? 'padding with empty cells'
                    : 'truncating'
                }.`,
              );
            }

            return (
              <tr key={rowIndex} className={styles.row} role="row">
                <th
                  scope="row"
                  role="rowheader"
                  className={cx(styles.key, BEHAVIOUR_CLASS[keyBehaviour])}
                >
                  {/* No stacked label here, deliberately: the row header is the NAME of its group,
                      not a value in it, and a key-column label repeated over every group title
                      ("Route", "Route", "Route") buried the one line that says which row this is. */}
                  <span className={styles.keyText}>{row.header}</span>
                </th>
                {columns.map((column, index) => {
                  const html = row.cellsHtml[index] ?? '';
                  return (
                    <td
                      key={index}
                      role="cell"
                      className={cx(styles.cell, BEHAVIOUR_CLASS[column.behaviour ?? 'fluid'])}
                    >
                      <Layout rowGap="inline">
                        {column.heading ? (
                          <span className={styles.label} aria-hidden="true">
                            {column.heading}
                          </span>
                        ) : null}
                        {html.trim() ? (
                          <Prose html={html} className={styles.value} />
                        ) : (
                          // An empty cell is still a cell: the screen reader announces it blank on
                          // its own, and the dash is for the eye, so a gap never reads as a bug.
                          <span className={styles.empty} aria-hidden="true">
                            —
                          </span>
                        )}
                      </Layout>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
}
