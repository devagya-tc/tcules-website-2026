import type { CSSProperties, ReactNode } from 'react';

import { cx } from '@/lib/cx';

import styles from './Stat.module.css';

/**
 * The figure's type step (visual-direction § 7.1). A component size, so a t-shirt name.
 *
 *   lg  --text-stat-lg (54). The band's large thing: the S row, the D head-track aside (§ 3.3).
 *   md  --text-stat (40). A stat that sits beside other content rather than carrying the band.
 *   xl  --text-score (105, serif). ONE figure that is the band's hero — the rating in a facts band
 *       (kit r7-facts, 9 Oct 2026), the role the rating-led testimonial gave the score. Never for a
 *       set of figures: a set is lg, whose tabular mono aligns a column.
 */
export type StatSize = 'xl' | 'lg' | 'md';

/**
 * Where the stat's parts sit in its track, at every width. `center` for a row under a centred head
 * (S, § 3.5): figure, label and the blue mark centre on the track, so the band has one axis rather
 * than a centred head over start-set numerals — at 390 too, where the set is one column.
 */
export type StatAlign = 'start' | 'center';

/**
 * How a tally's marks are drawn when no `glyph` is given (a component's own shapes, so a word each).
 *
 *   dot  a square the size of one mark — the brand's bulleted-label square, laid out as a field.
 *        Counts of things: products, people.
 *   bar  a tall stroke the full height of the field — a tick on a calendar. Counts of time: years.
 */
export type StatTallyForm = 'dot' | 'bar';

/**
 * The figure drawn as its count (kit r7-facts, 9 Oct 2026: "never a plain row of numbers"). Every
 * mark is one unit of what the figure counts, so the shape is the number rather than an ornament
 * beside it: 64 products are 64 squares, 11 years are 11 ticks, 4.8 out of 5 is five stars with the
 * last one four-fifths full. Decorative to assistive technology — the value is the claim, the tally
 * only shows its size.
 */
export type StatTally = {
  /**
   * How many marks to draw: the count itself, or the top of a scale (5 for a rating). A whole
   * number, 1–120; a field larger than that stops being countable and reads as a texture.
   */
  marks: number;
  /** How many of them are filled. May be fractional (4.8 of 5). Default: every mark. */
  filled?: number;
  /** Marks per row. Default: every mark on one row. 64 as 8 × 8 is a square; 18 as 6 × 3 a block. */
  columns?: number;
  /** Default `dot`. Ignored when `glyph` is given. See `StatTallyForm`. */
  form?: StatTallyForm;
  /**
   * One glyph drawn for every mark, composed by the caller — in practice `<Icon name="star" />`
   * for a rating. Taken as a node because a primitive does not import a sibling (RatingBadge takes
   * its star the same way); the stat sizes whatever it is handed.
   */
  glyph?: ReactNode;
};

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
  /**
   * The figure drawn as its count, set between the opening rule and the figure. See `StatTally`.
   * At lg and md, from 768, every tally sits on the floor of one fixed-height field, so in a row the figures
   * under fields of different shapes still share one line.
   */
  tally?: StatTally;
  /**
   * Where the figure can be checked, composed by the caller — in practice a `RatingBadge` with
   * `showScore={false}` under a rating, so the score is printed once, large, and the pill carries
   * the source. Set after the label. A claim with a source has to be reachable (RatingBadge).
   */
  source?: ReactNode;
  /** Default `lg`. See `StatSize`. */
  size?: StatSize;
  /** Default `div`. See `StatElement`. */
  as?: StatElement;
  /** Default `start`. See `StatAlign`. */
  align?: StatAlign;
};

const SIZE_CLASS: Record<StatSize, string | undefined> = {
  xl: styles.sizeXl,
  lg: styles.sizeLg,
  md: styles.sizeMd,
};

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`Stat: ${message}`);
}

/** The most marks a tally draws (see `StatTally.marks`). */
const TALLY_MAX = 120;

/**
 * The tally field: one mark per unit. A full mark draws its shape once in the fill ink, an empty
 * mark once in the quiet ink, and the one partial mark draws both, the fill laid over the empty
 * shape and clipped to its share. Its arrangement is a grid inside the unit, as the figure line is.
 */
function Tally({ marks, filled, columns, form = 'dot', glyph }: StatTally) {
  const count = Math.min(Math.max(Math.round(marks), 0), TALLY_MAX);
  if (count !== marks) warn(`tally \`marks\` must be a whole number from 1 to ${TALLY_MAX}; drew ${count}.`);
  if (count === 0) return null;
  const full = Math.min(Math.max(filled ?? count, 0), count);
  const perRow = Math.min(Math.max(Math.round(columns ?? count), 1), count);
  const shape = glyph ?? <span className={form === 'bar' ? styles.bar : styles.dot} />;

  return (
    <span
      className={cx(styles.tally, !glyph && form === 'bar' && styles.tallyBar)}
      style={{ '--stat-tally-columns': perRow } as CSSProperties}
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, i) => {
        const share = Math.min(Math.max(full - i, 0), 1);
        if (share === 1) {
          return (
            <span key={i} className={cx(styles.mark, styles.filled)}>
              {shape}
            </span>
          );
        }
        if (share === 0) {
          return (
            <span key={i} className={cx(styles.mark, styles.empty)}>
              {shape}
            </span>
          );
        }
        return (
          <span
            key={i}
            className={cx(styles.mark, styles.empty)}
            style={{ '--stat-tally-share': `${share * 100}%` } as CSSProperties}
          >
            {shape}
            <span className={styles.share}>{shape}</span>
          </span>
        );
      })}
    </span>
  );
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
  tally,
  source,
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
      {tally ? <Tally {...tally} /> : null}
      <p className={styles.figure}>
        <span className={styles.value}>{figure}</span>
        {word ? <span className={styles.unit}>{word}</span> : null}
      </p>
      {meaning ? <p className={styles.label}>{meaning}</p> : null}
      {source ? <div className={styles.source}>{source}</div> : null}
    </Tag>
  );
}
