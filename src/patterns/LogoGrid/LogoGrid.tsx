import type { ReactNode } from 'react';

import { ClientMark, Cluster, Layout, type ClientMarkProps } from '@/components';
import { cx } from '@/lib/cx';

import styles from './LogoGrid.module.css';

/** One client: the same record ClientMark takes. The grid sets the size, so the record does not. */
export type LogoGridMark = Omit<ClientMarkProps, 'className' | 'size'>;

/**
 * The width of the track the grid sits in, which decides how many cells fit across.
 *   full  the Section's whole column (1240 at 1470, 960 at 1024).
 *   body  a beside-head body track (~686 at 1470, ~523 at 1024); the full column below 1024,
 *         where a beside head stacks.
 */
export type LogoGridTrack = 'full' | 'body';

type Breakpoint = 'base' | 'md' | 'lg' | 'xl';

/**
 * Most and fewest cells across, per breakpoint, so no cell is narrower than its widest mark and no
 * cell is a vacant stretch. The floor at every width is ~150 inside the hairlines: a 4:1 wordmark
 * is 112 and the widest corrected mark 184 (it letterboxes, never spills, in the few cells under
 * that). Three across at base, the ClientMark is `sm`, so ~119 cells hold every mark at full weight.
 */
const RANGE: Record<LogoGridTrack, Record<Breakpoint, [max: number, min: number]>> = {
  full: { base: [3, 2], md: [4, 3], lg: [5, 3], xl: [6, 3] },
  body: { base: [3, 2], md: [4, 3], lg: [3, 2], xl: [3, 2] },
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
  /** The context line's element. Default `h2`: it names the band. `p` when a heading beside the
      grid already does (a beside head), so the line does not open a second outline entry. */
  contextAs?: 'h2' | 'h3' | 'p';
  /** An id on the context line, for the Section's aria-labelledby. */
  contextId?: string;
  /**
   * A lead above the context line — a sourced RatingBadge, the doodle.com move. It leads the
   * band; the grid is still the body. Compose the badge at the call site and pass it here.
   */
  badge?: ReactNode;
  /** The head's alignment. The grid itself always spans its track. Default `start`. */
  align?: 'start' | 'center';
  /** The track the grid sits in. Default `full`. */
  track?: LogoGridTrack;
  /**
   * `open` (default) rules only BETWEEN cells, the reference's treatment: no frame round the set,
   * so it sits in the band rather than on it. `closed` adds the outer edge, every cell a whole box.
   */
  edges?: 'open' | 'closed';
  className?: string;
};

/**
 * LogoGrid — client marks in equal hairline cells (band H; r7-logos, owner 8 Oct 2026).
 *
 * A composition of primitives with one job of its own: the cell. Layout owns the columns, chosen
 * from the count so the rows are always full (`columnsFor`); Cluster centres each mark in its
 * cell; ClientMark draws the mark, one ink, equal area (`sm` when a phone sets three across). What this pattern adds is the
 * hairline box each mark sits in — the named exception to "no boxes", because a logo cell is not
 * a card — and the demoted head: an optional rating badge over an eyebrow-size context line.
 *
 * It sets no outer spacing. The head-to-grid seam is `stack`; badge to context is `block`.
 */
export function LogoGrid({
  marks,
  context,
  contextAs: Context = 'h2',
  contextId,
  badge,
  align = 'start',
  track = 'full',
  edges = 'open',
  className,
}: LogoGridProps) {
  const centred = align === 'center';
  const hasHead = Boolean(badge) || Boolean(context);

  const columns = logoGridColumns(marks.length, track);
  /* sm differs from md only below 768, and only a three-across phone grid needs it: two across,
     a ~179 cell holds the phone-size mark at full weight. */
  const size = columns.base >= 3 ? 'sm' : 'md';

  const grid = (
    <Layout
      as="ul"
      columns={columns}
      className={edges === 'open' ? styles.open : styles.closed}
    >
      {marks.map((mark) => (
        <Cluster
          as="li"
          key={mark.name}
          justify="center"
          align="center"
          className={styles.cell}
        >
          <ClientMark {...mark} size={size} />
        </Cluster>
      ))}
    </Layout>
  );

  if (!hasHead) return className ? <div className={className}>{grid}</div> : grid;

  return (
    <Layout rowGap="stack" className={className}>
      <Layout rowGap="block" justifyItems={centred ? 'center' : undefined}>
        {badge}
        {context ? (
          <Context id={contextId} className={cx(styles.context, centred && styles.centred)}>
            {context}
          </Context>
        ) : null}
      </Layout>
      {grid}
    </Layout>
  );
}
