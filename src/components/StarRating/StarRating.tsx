import type { ReactNode } from 'react';

import { cx } from '@/lib/cx';

import styles from './StarRating.module.css';

/** The star's size role. `md` (18) on a testimonial card; `sm` (14) under a supporting quote. */
export type StarRatingSize = 'sm' | 'md';

export type StarRatingProps = {
  /**
   * The rating out of 5. Rounded to the nearest half (a review score is published in halves or
   * wholes) and clamped to 0–5. The value is the component's accessible name, "Rated 4.5 out of 5",
   * so the five glyphs are decorative.
   */
  value: number;
  /**
   * The star glyph, composed by the caller — in practice `<Icon name="star" />`. Taken as a node,
   * not imported, for the reason RatingBadge takes its `icon`: a primitive does not import a sibling
   * (CLAUDE.md § Sideways has an idiom). StarRating sizes and colours whatever it is handed; a size
   * passed to the Icon is overridden.
   */
  glyph: ReactNode;
  /** Default `md`. */
  size?: StarRatingSize;
  className?: string;
};

const STARS = 5;

/** Round to the nearest half and clamp, so 4.74 reads as 4.5 and 7 as 5. */
function normalise(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(STARS, Math.max(0, Math.round(value * 2) / 2));
}

/** "4.5", "5": a half shows its decimal, a whole does not. */
const spoken = (value: number) => (Number.isInteger(value) ? String(value) : value.toFixed(1));

/**
 * StarRating — one review's score as five stars, filled, half-filled or empty (home round 2,
 * 10 Oct 2026: the rated testimonial card). A MARK, like Stat's numeral: it arranges nothing and
 * owns no distance outside its own box. Its five glyphs sit in one inline row it lays out itself,
 * as RatingBadge lays out its pill — they are the inside of one mark, not siblings a Cluster places.
 *
 * Filled stars carry the blue accent (index.css § Blue: icons and marks are blue); empty stars take
 * the quiet neutral of the surface. A half star is the empty glyph with the filled one laid over it
 * and clipped at half its width, from the inline start, so no second drawing is needed.
 *
 * It is never an aggregate platform score — that is RatingBadge, with its source link. A StarRating
 * belongs to ONE quote and says what that client rated (owner, 10 Oct 2026, superseding "never a
 * rating beside a quote" of 7 Oct, which was about the platform score).
 */
export function StarRating({ value, glyph, size = 'md', className }: StarRatingProps) {
  const score = normalise(value);
  if (process.env.NODE_ENV !== 'production' && score !== value) {
    console.warn(`StarRating: ${value} is shown as ${score} (halves, 0 to 5).`);
  }
  return (
    <span
      role="img"
      aria-label={`Rated ${spoken(score)} out of ${STARS}`}
      className={cx(styles.root, size === 'sm' ? styles.sm : styles.md, className)}
    >
      {Array.from({ length: STARS }, (_, index) => {
        const fill = Math.min(1, Math.max(0, score - index));
        return (
          <span key={index} className={styles.star} aria-hidden="true">
            <span className={styles.empty}>{glyph}</span>
            {fill > 0 ? (
              <span className={cx(styles.filled, fill < 1 && styles.half)}>{glyph}</span>
            ) : null}
          </span>
        );
      })}
    </span>
  );
}
