import type { ReactNode } from 'react';

import { ClientMark, Cluster, Layout, type ClientMarkProps } from '@/components';
import { cx } from '@/lib/cx';

import styles from './LogoGrid.module.css';

/** One client: the same record ClientMark takes, density included — it is what sizes the mark. */
export type LogoGridMark = Omit<ClientMarkProps, 'className'>;

/**
 * The width of the track the grid sits in, which decides how many cells fit across.
 *   full  the Section's whole column (1240 at 1470, 960 at 1024).
 *   body  a beside-head body track, two thirds of the column or less; the full column below 1024,
 *         where a beside head stacks. `arrangement="beside"` sets it for its own grid.
 */
export type LogoGridTrack = 'full' | 'body';

type Breakpoint = 'base' | 'md' | 'lg' | 'xl';

/**
 * Most and fewest cells across, per breakpoint. The floor is set by the widest mark: LatitudePay,
 * drawn by its density at 201 on desktop and 158 on a phone, must fit its cell with the guard.
 *
 * A phone is two across, every count (fix round, 9 Oct 2026). Three across a 390 column made ~108
 * cells and drew LatitudePay as an illegible tracked line ~90 wide; there is no padding to cut that
 * buys it back. Two across, a ~179 cell holds every mark at its full phone size, and a count with
 * one left over closes on a cell that spans the row (`lastFills`), so nine is still a whole
 * rectangle: four rows of two and one of one.
 */
const RANGE: Record<LogoGridTrack, Record<Breakpoint, [max: number, min: number]>> = {
  full: { base: [2, 2], md: [4, 3], lg: [5, 3], xl: [6, 3] },
  body: { base: [2, 2], md: [4, 3], lg: [3, 2], xl: [3, 2] },
};

/**
 * The column count for `count` cells: the most across, within the range, that divides the count,
 * so every row is full and the grid is a whole rectangle — 8 is 4 × 2, 9 is 3 × 3, 12 is 6 × 2 at
 * 1440 (4 × 3 at 1024). A count with no divisor in range (7, 11, 13) takes the count that leaves
 * the fewest empty places in the last row, the wider on a tie. Fewer cells than the floor sit in
 * one row.
 */
function columnsFor(count: number, [max, min]: [number, number]): number {
  if (count <= min) return Math.max(count, 1);
  let best = max;
  let bestEmpty = Infinity;
  for (let c = Math.min(max, count); c >= min; c -= 1) {
    const empty = (c - (count % c)) % c;
    if (empty === 0) return c;
    if (empty < bestEmpty) {
      best = c;
      bestEmpty = empty;
    }
  }
  return best;
}

/** The per-breakpoint columns for a count in a track — exported so a specimen can label them. */
export function logoGridColumns(count: number, track: LogoGridTrack = 'full') {
  const range = RANGE[track];
  return {
    base: columnsFor(count, range.base),
    md: columnsFor(count, range.md),
    lg: columnsFor(count, range.lg),
    xl: columnsFor(count, range.xl),
  };
}

const FILL_CLASS: Record<Breakpoint, string | undefined> = {
  base: styles.fillBase,
  md: styles.fillMd,
  lg: styles.fillLg,
  xl: styles.fillXl,
};

/**
 * The breakpoints at which the last row holds ONE cell, which then spans the row: nine on a phone
 * (4 × 2 + 1). One alone in a row of empty places reads as a hole; one cell the width of the grid
 * reads as its closing row. Two or more left over keep their own widths — `columnsFor` already
 * chose the count that leaves the fewest.
 */
function lastFills(count: number, columns: Record<Breakpoint, number>) {
  return (Object.keys(columns) as Breakpoint[]).filter(
    (bp) => columns[bp] > 1 && count % columns[bp] === 1,
  );
}

export type LogoGridProps = {
  /** The marks, in reading order. Which client leads is a content decision. */
  marks: readonly LogoGridMark[];
  /**
   * The context line: the band's heading, demoted to eyebrow size (7 Oct review: a full title
   * here was "a hero instrument", the IA reversed and the logos not leading). One short line —
   * "Product teams we have shipped with". Set in the eyebrow role, so it is uppercase in
   * presentation only; pass it in sentence case.
   */
  context?: string;
  /**
   * A short heading under the context line — "Nine teams, one way of working". Set at the h4 role
   * (28) on the band's h2 element, never at h2 scale (9 Oct review: a full h2 beside the grid
   * brought the hero instrument back). With a heading, the context line is a `p` above it.
   */
  heading?: string;
  /** The context line's element when there is no heading. Default `h2`: it names the band. */
  contextAs?: 'h2' | 'p';
  /** The id on the band's name — the heading if there is one, else the context line — for the
      Section's aria-labelledby. */
  headingId?: string;
  /**
   * A lead above the context line — a sourced RatingBadge, the doodle.com move. It leads the
   * band; the grid is still the body. Compose the badge at the call site and pass it here.
   */
  badge?: ReactNode;
  /** The head's actions, under it — a CtaRow with `rule={false}`. Composed at the call site. */
  action?: ReactNode;
  /**
   * `stacked` (default): the head over the grid. `beside`: from 1024 the head in a narrow leading
   * track and the grid in the trailing one, the head CENTRED on the grid's height so the two read
   * as one composition (9 Oct review: top-aligned, a 3 × 3 grid left ~200 of dead paper under a
   * short head). Below 1024 it stacks.
   */
  arrangement?: 'stacked' | 'beside';
  /** The head's alignment in `stacked`. The grid itself always spans its track. Default `start`. */
  align?: 'start' | 'center';
  /** The track the grid sits in when it is not this unit's own `beside`. Default `full`. */
  track?: LogoGridTrack;
  /**
   * `closed` (default, 9 Oct review): every cell a whole box, the outer edge drawn — the owner's
   * "each logo in its own boxed cell". `open` rules only BETWEEN cells, no frame round the set:
   * the alternative, for a band that wants the grid to sit in the paper rather than on it.
   */
  edges?: 'open' | 'closed';
  className?: string;
};

/**
 * The beside tracks: a quarter for the head at 1024 is ~224 (a 28 heading in three short lines),
 * which leaves the grid ~672 — three ~224 cells, LatitudePay's 201 inside them. From 1440 the
 * head takes 1 : 2, 392 beside 784.
 */
const BESIDE_COLUMNS = { lg: [1, 3], xl: [1, 2] };

/**
 * LogoGrid — client marks in equal hairline cells (band H; r7-logos, owner 8–9 Oct 2026).
 *
 * A composition of primitives with one job of its own: the cell. Layout owns the columns, chosen
 * from the count so the rows are always full (`columnsFor`); Cluster centres each mark in its
 * cell; ClientMark draws the mark, one ink, equal area of ink by its density. What this pattern
 * adds is the hairline box each mark sits in — the named exception to "no boxes", because a logo
 * cell is not a card — and the demoted head: an optional rating badge over an eyebrow-size
 * context line, and a short h4-scale heading and its action.
 *
 * It sets no outer spacing. The head-to-grid seam is `stack` (and `column` beside); inside the
 * head, `block`, then `stack` to the action.
 */
export function LogoGrid({
  marks,
  context,
  heading,
  contextAs,
  headingId,
  badge,
  action,
  arrangement = 'stacked',
  align = 'start',
  track = 'full',
  edges = 'closed',
  className,
}: LogoGridProps) {
  const beside = arrangement === 'beside';
  const centred = !beside && align === 'center';
  const hasHead = Boolean(badge || context || heading || action);

  const columns = logoGridColumns(marks.length, beside ? 'body' : track);
  const fills = lastFills(marks.length, columns);
  const Context = heading ? 'p' : (contextAs ?? 'h2');

  const cells = (
    <Layout as="ul" columns={columns} className={styles.open}>
      {marks.map((mark, i) => (
        <Cluster
          as="li"
          key={mark.name}
          justify="center"
          align="center"
          className={cx(
            styles.cell,
            ...(i === marks.length - 1 ? fills.map((bp) => FILL_CLASS[bp]) : []),
          )}
        >
          <ClientMark {...mark} />
        </Cluster>
      ))}
    </Layout>
  );
  /* `closed` frames the open grid: the frame draws the outer edge whole, with the photograph's
     radius (owner, 9 Oct 2026), and clips the cells to it. The inner rules stay the open grid's. */
  const grid = edges === 'open' ? cells : <div className={styles.closed}>{cells}</div>;

  if (!hasHead) return className ? <div className={className}>{grid}</div> : grid;

  const named = (
    <Layout rowGap="block" justifyItems={centred ? 'center' : undefined}>
      {badge}
      {context ? (
        <Context
          id={heading ? undefined : headingId}
          className={cx(styles.context, centred && styles.centred)}
        >
          {context}
        </Context>
      ) : null}
      {heading ? (
        <h2 id={headingId} className={cx(styles.heading, centred && styles.centred)}>
          {heading}
        </h2>
      ) : null}
    </Layout>
  );

  const head = action ? (
    <Layout rowGap="stack" justifyItems={centred ? 'center' : undefined}>
      {named}
      {action}
    </Layout>
  ) : (
    named
  );

  return (
    <Layout
      rowGap="stack"
      colGap={beside ? 'column' : undefined}
      columns={beside ? BESIDE_COLUMNS : undefined}
      align={beside ? 'center' : undefined}
      className={className}
    >
      {head}
      {grid}
    </Layout>
  );
}
