import type { ReactNode } from 'react';

import styles from './RatingBadge.module.css';

export type RatingBadgeProps = {
  /** The score as published — '4.8', a string: nothing formats it, and '5.0' stays '5.0'. */
  score: string;
  /** The platform, in words. It is the badge's accessible name with the score: "4.8 on Clutch". */
  platform: string;
  /** The profile the score is read from. A claim with a source has to be reachable. */
  href: string;
  /**
   * The leading glyph, composed by the caller — in practice `<Icon name="star" />`. Taken as a node
   * for the same reason as `mark`: a primitive does not import a sibling. Decorative.
   */
  icon?: ReactNode;
  /**
   * The platform's mark, composed by the caller — in practice `<BrandMark name="clutch" />`. Taken
   * as a node, not imported, so the badge does not weld itself to one mark set (CLAUDE.md §
   * Sideways has an idiom). Decorative: the platform name beside it is the accessible name.
   */
  mark?: ReactNode;
  /**
   * Whether the score is printed inside the pill. Default `true`. `false` when the score is already
   * set large beside the badge — the rating-led testimonial (cmp-testimonials, 6 Oct 2026) prints
   * "4.8" at stat scale directly above it, and "4.8 / ★ 4.8 on Clutch" says the number twice. The
   * pill then reads "Rated on Clutch". The score is never dropped from the claim: it follows the
   * platform in visually hidden text, so the link's name starts with what the eye reads (WCAG 2.5.3,
   * a voice user can say "Rated on Clutch") and still carries the number — "Rated on Clutch, 4.8
   * (opens in a new tab)".
   */
  showScore?: boolean;
};

/**
 * RatingBadge — a third-party score and the profile it comes from, as one outline pill that links
 * to the source. Built 1 Oct 2026 out of the footer's private badge, when the service pages'
 * testimonial band needed the same claim: one badge, one score source, two placements.
 *
 * An OUTLINE, not a fill: it is a claim with a source, and a filled chip beside a solid button reads
 * as a second action. It always leaves the site, so it opens in a new tab and says so in words.
 * Every arrangement inside it is the pill's own (star, score, mark and name on one line), so it
 * arranges itself with inline-flex rather than a Cluster: a primitive does not import a sibling.
 *
 * It sets NO placement of its own. Where the badge sits — start, end — is the parent's decision; a
 * `justify-self` here once overrode the footer column's `justify-items: end` and moved the badge.
 */
export function RatingBadge({
  score,
  platform,
  href,
  icon,
  mark,
  showScore = true,
}: RatingBadgeProps) {
  return (
    <a
      className={styles.badge}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      {/* Decorative: "4.8 on Clutch" is the whole claim. A glyph from the set, not a ★ character:
          the mono face has no ★, so every browser fell back to a different font and the star's
          centre landed somewhere different on each (1 Oct 2026). An SVG centres exactly. */}
      {icon ? (
        <span className={styles.star} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {/* Each run of text is its own box, trimmed to the capitals (see .text), so the flex row
          centres the star and the mark on the middle of the caps rather than on a line box that
          carries the face's descender space below them. */}
      <span className={styles.text}>{showScore ? `${score} on` : 'Rated on'}</span>
      <span className={styles.lockup}>
        {mark ? (
          <span className={styles.mark} aria-hidden="true">
            {mark}
          </span>
        ) : null}
        <span className={styles.text}>{platform}</span>
      </span>
      {showScore ? null : <span className={styles.hint}>, {score}</span>}
      <span className={styles.hint}> (opens in a new tab)</span>
    </a>
  );
}
