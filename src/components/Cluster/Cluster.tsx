import type { CSSProperties, ElementType, ReactNode } from 'react';

import { cx } from '@/lib/cx';

import styles from './Cluster.module.css';

/**
 * The gap scale, capped at `block` (24). A wrapping row of chips or buttons has no use for a
 * 48px block beat, let alone a 96px section one — the ceiling is the only place Cluster and
 * Layout differ, and both read the same --gap-* usage tokens.
 *
 *   inline   4   inside a key and its value
 *   tight    8   icon to label, chip padding, a stat and its unit
 *   text    16   items in a metadata row
 *   block   24   a button group set apart from its neighbours
 */
type ClusterGap = 'inline' | 'tight' | 'text' | 'block';
type ClusterAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
type ClusterJustify = 'start' | 'center' | 'end' | 'between';

export type ClusterProps = {
  /** Element to render (default "div"; use "ul", "nav", etc.). */
  as?: ElementType;
  /**
   * Block-axis seam — the distance between WRAPPED LINES. NO default, so an axis nobody sets
   * renders 0: a silent 12 looks plausible and hides the omission, a collapsed seam is wrong on
   * sight. A `nowrap` cluster has no second line and leaves this off.
   */
  rowGap?: ClusterGap;
  /** Inline-axis seam — the distance between items ON a line. Same ramp, same no-default rule. */
  colGap?: ClusterGap;
  /** Cross-axis (vertical) alignment. Default "center". */
  align?: ClusterAlign;
  /** Main-axis (horizontal) distribution. Default "start". */
  justify?: ClusterJustify;
  /** Keep items on one line (default wraps). */
  nowrap?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  id?: string;
};

/**
 * Cluster — the inline-flow layout primitive (the horizontal counterpart to Layout). A wrapping
 * flex row that owns the gaps between its children: button groups, tag/chip rows,
 * icon-beside-label, dot-separated metadata. Wraps by default. Children never set their own
 * outer spacing; the Cluster owns the gaps.
 *
 * Because it wraps, it has TWO seams — between items on a line, and between the lines
 * themselves — so they are set separately, and neither has a default.
 */
export function Cluster({
  as: Tag = 'div',
  rowGap,
  colGap,
  align = 'center',
  justify = 'start',
  nowrap = false,
  className,
  style,
  children,
  id,
}: ClusterProps) {
  return (
    <Tag
      id={id}
      style={style}
      className={cx(
        styles.cluster,
        rowGap && styles[`rowgap-${rowGap}`],
        colGap && styles[`colgap-${colGap}`],
        styles[`align-${align}`],
        styles[`justify-${justify}`],
        nowrap && styles.nowrap,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
