import type { ReactNode } from 'react';

import styles from './VisuallyHidden.module.css';

export type VisuallyHiddenProps = {
  /**
   * The element. `span` (the default) for words inside a line — "42 articles match" where the eye
   * reads "42 of 60" — `p` or `div` for a whole sentence of its own. Never a heading: a heading the
   * eye cannot see is an outline only one audience gets.
   */
  as?: 'span' | 'p' | 'div';
  /** What a screen reader needs and the eye does not. */
  children: ReactNode;
};

/**
 * VisuallyHidden — words for a screen reader that take no room on screen (16 Oct 2026).
 *
 * The one copy of the clip recipe. Before it, nine components — ListCard, Slider, EnquiryForm,
 * SiteFooter, Thread, Breadcrumbs, RatingBadge, ServicePage's diagrams and the insights archive —
 * each hand-wrote the same `clip-path: inset(50%)` block, and one needed a token of its own for the
 * box. Take this instead; the older copies move over as their components are next touched.
 *
 * It hides from the EYE only. The text stays in the accessibility tree and in the reading order,
 * so it must be true and must not repeat what is visible beside it. Not for focusable content: a
 * focused element nobody can see is a keyboard trap (a skip link wants its own visible-on-focus
 * rule). Arranges nothing and takes no class.
 */
export function VisuallyHidden({ as: Element = 'span', children }: VisuallyHiddenProps) {
  return <Element className={styles.hidden}>{children}</Element>;
}
