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
export function RatingBadge({ score, platform, href, icon, mark }: RatingBadgeProps) {
  return (
    <a className={styles.badge} href={href} target="_blank" rel="noreferrer noopener">
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
      <span className={styles.text}>{score} on</span>
      <span className={styles.lockup}>
        {mark ? (
          <span className={styles.mark} aria-hidden="true">
            {mark}
          </span>
        ) : null}
        <span className={styles.text}>{platform}</span>
      </span>
      <span className={styles.hint}> (opens in a new tab)</span>
    </a>
  );
}
