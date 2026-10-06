import { cx } from '@/lib/cx';

import styles from './Stat.module.css';

/**
 * The figure's type step (visual-direction § 7.1). A component size, so a t-shirt name.
 *
 *   lg  --text-stat-lg (54). The band's large thing: the S row, the D head-track aside (§ 3.3).
 *   md  --text-stat (40). A stat that sits beside other content rather than carrying the band.
 */
export type StatSize = 'lg' | 'md';

/**
 * Where the stat's parts sit in its track, at every width. `center` for a row under a centred head
 * (S, § 3.5): figure, label and the blue mark centre on the track, so the band has one axis rather
 * than a centred head over start-set numerals — at 390 too, where the set is one column.
 */
export type StatAlign = 'start' | 'center';

/** `li` when the stat is one of a set (`<Layout as="ul">`); `div` when it stands alone. */
export type StatElement = 'div' | 'li';

export type StatProps = {
  /**
   * The figure, verbatim: "12", "98%", "3×", "6–8". A symbol that belongs to the number is part of
   * this string; a word that counts it ("weeks", "products") is the `unit`.
   */
  value: string;
  /**
   * What the figure counts, as a word: "weeks", "products". Set in the mono label voice on the
   * figure's baseline, a `tight` (8) after it — the gap scale's own "a stat and its unit". Written in
   * sentence case; the uppercase is presentation (`--text-mono-case`). Absent renders no element.
   */
  unit?: string;
  /**
   * The line that says what the number means — body-sm, ≤ 2 lines, ≤ 12 words (§ 1.5). Required: a
   * number without its meaning is decoration.
   */
  label: string;
  /** Default `lg`. See `StatSize`. */
  size?: StatSize;
  /** Default `div`. See `StatElement`. */
  as?: StatElement;
  /** Default `start`. See `StatAlign`. */
  align?: StatAlign;
};

const SIZE_CLASS: Record<StatSize, string | undefined> = {
  lg: styles.sizeLg,
  md: styles.sizeMd,
};

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`Stat: ${message}`);
}

/**
 * Stat — one figure, its unit, and what it counts, opening on a hairline with a blue mark at its
 * start. Built to docs/specs/Stat.md (cmp-process-stats, 6 Oct 2026); promoted from the ServicePage
 * template's local block so the S band, the D aside and the service pages share one stat.
 *
 * THE NUMERAL IS BLUE (page-showcase fix round 2): numerals are among the foreground marks the owner's
 * blue ruling names (§ 4.1), and an ink figure left a stat row black and white beside a blue score.
 * The unit and the label stay quiet ink; the short blue mark on the opening rule stays too.
 *
 * THE RULE IS THE STAT'S TOP EDGE, the way a text-only card's hairline stands in for the edge an
 * image would give (§ 3.1). In a row the gutter breaks it, so a set of four reads as four objects
 * rather than one table row; alone in a head track it closes the head text above it.
 *
 * It arranges its own parts with grid and inline-flex rather than a Layout or Cluster: they are the
 * inside of one unit, and a primitive does not import a sibling (RatingBadge does the same). Every
 * seam is a gap-scale step; there is no margin.
 *
 * Illustrative numerals never share a band with real client marks (§ 5.8). That is a supply rule
 * the component cannot see, so the composing page keeps it.
 */
export function Stat({
  value,
  unit,
  label,
  size = 'lg',
  as: Tag = 'div',
  align = 'start',
}: StatProps) {
  const figure = value.trim();
  const meaning = label.trim();
  if (!figure) {
    warn('`value` is blank; rendering nothing.');
    return null;
  }
  if (!meaning) warn('`label` is blank: a figure without its meaning is decoration.');
  const word = unit?.trim();

  return (
    <Tag className={cx(styles.stat, SIZE_CLASS[size], align === 'center' && styles.centred)}>
      <p className={styles.figure}>
        <span className={styles.value}>{figure}</span>
        {word ? <span className={styles.unit}>{word}</span> : null}
      </p>
      {meaning ? <p className={styles.label}>{meaning}</p> : null}
    </Tag>
  );
}
