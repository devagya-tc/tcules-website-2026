import type { CSSProperties, ElementType, ReactNode } from 'react';

import { cx } from '@/lib/cx';

import styles from './Layout.module.css';

/**
 * The gap scale — the token system's nine steps, named for what they separate. Each resolves to
 * a `--gap-*` usage token; Layout declares no distances of its own.
 *
 *   inline        4   inside a key and its value
 *   tight         8   icon to label, chip padding, a stat and its unit
 *   text         16   paragraph to paragraph, cell padding on a dense table
 *   block        24   head to body inside a block — the most used step
 *   gutter       32   container gutter, and the gap between cards in a set
 *   stack        48   block to block inside a section
 *   column       64   column gutter where two halves must read as separate
 *   section      96   section padding, tight
 *   section-open 128  section padding, open
 *
 * A step is chosen by what it separates, never by how it looks at one width — the scale does not
 * shift responsively, the layout does. A distance that is not one of these nine is a mistake or
 * a new step; do not split the difference.
 *
 * `none` is not a step. It is the explicit statement that two rows share an edge, which is a
 * layout decision rather than a distance.
 */
type Gap =
  | 'none'
  | 'inline'
  | 'tight'
  | 'text'
  | 'block'
  | 'gutter'
  | 'stack'
  | 'column'
  | 'section'
  | 'section-open';

/** Block-axis placement of items within their row, and inline-axis placement within their track. */
type Place = 'stretch' | 'start' | 'center' | 'end';
/** Inline-axis distribution of the TRACKS themselves. Matches Cluster's `justify`, `between` included. */
type Distribute = 'start' | 'center' | 'end' | 'between';

/** Minimum track width for `columns="fit"` — component geometry, so a small local ramp. */
type MinTrack = 'xs' | 'sm' | 'md' | 'lg';

/**
 * A column shape: a count of equal tracks (`3`) or fractional weights (`[2, 1]`, `[1, 1, 2]`).
 * Children fill the tracks in order; each owns its own sizing.
 */
type ColumnSpec = number | number[];

/**
 * How the tracks are arranged. Two models, deliberately both available:
 *
 * BREAKPOINT-DRIVEN — a count/ratio (applies from md up, collapsing to 1 below), or a
 *   per-breakpoint object. You decide the arrangement per viewport.
 *
 * CONTENT-DRIVEN — as many tracks as fit at `minTrack` wide, reflowing continuously with no
 *   breakpoints, because that is the point: the content's own width decides. Two flavours,
 *   differing only in what happens to LEFTOVER space:
 *     "fit"  — tracks stretch to absorb it (1fr). The common case; a part-full last row spreads.
 *     "tile" — tracks keep their width and the leftover stays leftover, so `justify` can
 *              distribute it. This is what makes a part-full last row of cards stay card-width
 *              and centre instead of stretching, and it is the only arrangement where
 *              `justify` does anything at all (see that prop).
 */
type Columns =
  | ColumnSpec
  | 'fit'
  | 'tile'
  | { base?: ColumnSpec; md?: ColumnSpec; lg?: ColumnSpec; xl?: ColumnSpec };

export type LayoutProps = {
  /** Element to render (default "div"; use "ul"/"ol"/"section" etc. as needed). */
  as?: ElementType;
  /**
   * Block-axis seam — the distance between ROWS. A step on the gap scale; NO default, so an
   * axis nobody sets renders 0. That is deliberate: a silent 24 looks plausible and hides the
   * omission, while a collapsed seam is wrong on sight. A vertical stack needs only this one.
   */
  rowGap?: Gap;
  /**
   * Inline-axis seam — the distance between COLUMNS. Same scale, same no-default rule. Nothing
   * to act on without `columns`, so a single-track Layout leaves it off.
   */
  colGap?: Gap;
  /** Column arrangement. Omitted → vertical (1 track). `3` → 3 equal; `[2,1]` → 2:1; `"fit"` → reflow. */
  columns?: Columns;
  /**
   * Track width for the content-driven modes (`columns="fit"` / `"tile"`) — a minimum under
   * "fit", the actual width under "tile". Default "md" (20rem). Ignored otherwise. Tracks never
   * overflow: below this width the grid drops to a single column on its own.
   */
  minTrack?: MinTrack;
  /**
   * Make every item the same height — fills its row AND keeps rows equal after wrapping
   * (`grid-auto-rows: 1fr` + forced block-axis stretch). Pair with `columns`; this overrides
   * `align` on the block axis (use `justifyItems` for inline placement). Do not use on a
   * vertical stack — it would crush heading + body to equal height.
   */
  equalRows?: boolean;
  /**
   * The first child LEADS the set: it spans every track, in a row of its own sized to its own
   * content, and the remaining children fill the tracks below it. This is the arrangement for a
   * featured item above a set of peers (BlockCard's featured card, ruling C3) — one list, one
   * grid, and the lead's span is the CONTAINER's statement about its first child rather than a
   * child deciding its own placement.
   *
   * With `equalRows`, only the rows after the lead are equalised: the lead's row is explicit and
   * `auto`, the implicit rows below it are `1fr`, and a flexible row never sizes against an item
   * in an auto one. So a tall lead does not stretch every card row to its height.
   */
  lead?: boolean;
  /**
   * Block-axis placement — how items sit vertically in their row (e.g. centre copy against a
   * taller image). Default "stretch".
   */
  align?: Place;
  /**
   * Inline-axis placement of each item WITHIN its own track. Default "stretch" (fill the
   * track); "center" shrinks each item to its content and centres it — how a centred copy
   * stack works. This is per-item. To move the tracks themselves, use `justify`.
   */
  justifyItems?: Place;
  /**
   * Inline-axis distribution of the TRACKS within the container — the counterpart to
   * `justifyItems`. Same meaning as Cluster's `justify`, `between` included. Omit for the
   * browser default.
   *
   * Requires slack to distribute, so in practice this means `columns="tile"`. Every other
   * arrangement sizes its tracks in `fr` units, which by definition consume all free space —
   * there is then nothing left for this prop to move, and setting it does nothing. That is a
   * property of fr tracks, not an oversight.
   */
  justify?: Distribute;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  id?: string;
};

/** Turn a column shape into a grid-template-columns value. */
function track(spec: ColumnSpec): string {
  return typeof spec === 'number'
    ? `repeat(${spec}, minmax(0, 1fr))`
    : spec.map((weight) => `minmax(0, ${weight}fr)`).join(' ');
}

function columnsToVars(columns?: Columns): CSSProperties {
  // Always emit all four breakpoint vars. The --tmpl-* custom properties INHERIT, so a nested
  // Layout that sets no columns would otherwise pick up an ancestor's template (e.g. a vertical
  // stack inside a 2-col hero turning into 2 columns). Pinning the unused breakpoints to
  // `initial` (the guaranteed-invalid value) makes each var() fall through its
  // smaller-breakpoint fallback chain down to 1fr — so an unset breakpoint means "single track
  // here", never "inherit".
  const vars: Record<string, string> = {
    '--tmpl-base': 'initial',
    '--tmpl-md': 'initial',
    '--tmpl-lg': 'initial',
    '--tmpl-xl': 'initial',
  };
  if (columns == null) return vars as CSSProperties;

  // Content-driven modes are set at BASE and never stepped: the same declaration holds at
  // every width, which is what makes them breakpoint-free.
  //
  // `min(track, 100%)` in both is what keeps them safe — a bare 20rem track would overflow a
  // narrower screen, whereas this lets the track shrink below its minimum once the container
  // is the smaller of the two, collapsing to a single column by itself.
  //
  // auto-FIT (not auto-fill) in both so leftover EMPTY tracks collapse rather than reserving
  // space. The difference is the second minmax argument: 1fr makes the tracks absorb slack
  // ("fit"), while its absence leaves them at their own width so `justify` can distribute it
  // ("tile").
  if (columns === 'fit') {
    vars['--tmpl-base'] = 'repeat(auto-fit, minmax(min(var(--layout-min-track), 100%), 1fr))';
    return vars as CSSProperties;
  }
  if (columns === 'tile') {
    vars['--tmpl-base'] = 'repeat(auto-fit, min(var(--layout-min-track), 100%))';
    return vars as CSSProperties;
  }

  // Bare spec → applies from the md breakpoint up; base stays 1 track → collapses on mobile.
  if (typeof columns === 'number' || Array.isArray(columns)) {
    vars['--tmpl-md'] = track(columns);
    return vars as CSSProperties;
  }
  if (columns.base != null) vars['--tmpl-base'] = track(columns.base);
  if (columns.md != null) vars['--tmpl-md'] = track(columns.md);
  if (columns.lg != null) vars['--tmpl-lg'] = track(columns.lg);
  if (columns.xl != null) vars['--tmpl-xl'] = track(columns.xl);
  return vars as CSSProperties;
}

/**
 * Layout — the columnar layout primitive. Fills the content column Section gives it, owns the
 * two seams between its children, and arranges them into tracks: equal counts, fr ratios, or
 * as many as fit. A vertical stack is just the single-track case. Children never set their own
 * outer spacing; nest Layouts to vary rhythm.
 *
 * The two seams are set separately and neither has a default — a grid has a row seam and a
 * column seam and they are rarely the same relationship, so each is stated or it is 0.
 *
 * Non-uniform rhythm comes from NESTING, not from a rhythm knob — tighten by grouping, loosen
 * by separating. A heading's spacing is a consequence of which Layout it lives in.
 */
export function Layout({
  as: Tag = 'div',
  rowGap,
  colGap,
  columns,
  minTrack = 'md',
  align = 'stretch',
  justifyItems = 'stretch',
  justify,
  equalRows = false,
  lead = false,
  className,
  style,
  children,
  id,
}: LayoutProps) {
  return (
    <Tag
      id={id}
      style={{ ...columnsToVars(columns), ...style }}
      className={cx(
        styles.layout,
        rowGap && styles[`rowgap-${rowGap}`],
        colGap && styles[`colgap-${colGap}`],
        (columns === 'fit' || columns === 'tile') && styles[`mintrack-${minTrack}`],
        styles[`align-${align}`],
        styles[`justifyitems-${justifyItems}`],
        justify && styles[`justify-${justify}`],
        equalRows && styles['equal-rows'],
        lead && styles.lead,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
