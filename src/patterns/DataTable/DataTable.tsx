import { useId } from 'react';

import { Layout, Prose } from '@/components';
import { cx } from '@/lib/cx';

import styles from './DataTable.module.css';

/**
 * How one column's cells behave. Column behaviour is PRESENTATION, set by the caller per column —
 * the column COUNT is data and is never a variant.
 *
 *   fluid    wraps and shrinks to share the width, down to --dtab-fluid-size (176). The default
 *            for a data column. Below that floor the table scrolls rather than crushing it.
 *   nowrap   never wraps, so never narrows below its longest line. For short keys and
 *            identifiers — "SC 2.5.8", "v2.4", a code span. A long nowrap cell widens the table:
 *            that is an authoring error the specimen shows, not a case this handles.
 *   hold     wraps, but never narrows below --dtab-hold-size (192). A column that must not be
 *            crushed by a greedy neighbour. The default for the key column.
 *   numeric  end-aligned with tabular figures, and nowrap. Head and cells align together. A data
 *            column only — the key column is a row header, and a number is not a name.
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
  /** Plain-text row header — `<th scope="row">`. */
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
 * `Layout` for the summary, caption and frame seams, `Prose` for every cell's
 * trusted rich text — which a primitive may not import.
 *
 * ── One reading order, a boxed frame ───────────────────────────────────────────────────────
 * It is a table at every width. The frame — outer border, head fill, body ground, the rule that
 * sets the key column off — is what makes it readable as a structure, so a narrow track does not
 * restructure it: when its columns' floors add up to more than the track, the frame scrolls
 * sideways and the table inside keeps its shape. The body is never re-laid out as a stack.
 *
 * The frame is a focusable, named region (`tabIndex={0}`, `role="region"`, labelled by the
 * caption), so a keyboard user can scroll it with the arrow keys — a scroll container nobody can
 * focus is a WCAG 2.1.1 failure. It is focusable at every width, including where nothing
 * overflows: knowing whether it overflows needs client JS, and one extra tab stop is the cheaper
 * error than a keyboard trap.
 *
 * ── What it tolerates ───────────────────────────────────────────────────────────────────────
 * It never drops content and never throws. Out-of-contract input renders and warns in
 * development: no data columns (the key column alone), more than five data columns, fewer than
 * three or more than eight rows, a blank row header, a row whose cell count disagrees with the
 * columns (padded with empty cells, or truncated — a cell with no column head cannot be read in
 * the stacked order). Zero rows renders nothing.
 */
export function DataTable({ caption, summary, keyColumn, columns, rows }: DataTableProps) {
  const captionId = useId();

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
      {/* The caption is the table's name, set above the frame rather than as a <caption> inside it:
          a <caption> would sit inside the border and scroll away with the columns. It stays the
          accessible name through aria-labelledby, and sits a --gap-text beat from the frame — it
          belongs to the table, so it is closer to it than the summary is. */}
      <Layout rowGap="text">
        {caption ? (
          <p id={captionId} className={styles.caption}>
            {caption}
          </p>
        ) : null}
        <div
          className={styles.frame}
          role="region"
          tabIndex={0}
          // Without a caption the region still needs a name to be announced by; the key column's
          // head is the nearest thing the table has to one.
          {...(caption
            ? { 'aria-labelledby': captionId }
            : { 'aria-label': `${keyColumn.heading} table` })}
        >
          <table
            className={styles.table}
            {...(caption ? { 'aria-labelledby': captionId } : {})}
          >
            <thead>
              <tr>
                <th scope="col" className={cx(styles.colHead, BEHAVIOUR_CLASS[keyBehaviour])}>
                  {keyColumn.heading}
                </th>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={cx(styles.colHead, BEHAVIOUR_CLASS[column.behaviour ?? 'fluid'])}
                  >
                    {column.heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
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
                  <tr key={rowIndex} className={styles.row}>
                    <th scope="row" className={cx(styles.key, BEHAVIOUR_CLASS[keyBehaviour])}>
                      <span className={styles.keyText}>{row.header}</span>
                    </th>
                    {columns.map((column, index) => {
                      const html = row.cellsHtml[index] ?? '';
                      return (
                        <td
                          key={index}
                          className={cx(
                            styles.cell,
                            BEHAVIOUR_CLASS[column.behaviour ?? 'fluid'],
                          )}
                        >
                          {html.trim() ? (
                            <Prose html={html} className={styles.value} />
                          ) : (
                            // An empty cell is still a cell: the screen reader announces it blank on
                            // its own, and the dash is for the eye, so a gap never reads as a bug.
                            <span className={styles.empty} aria-hidden="true">
                              —
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Layout>
    </Layout>
  );
}
