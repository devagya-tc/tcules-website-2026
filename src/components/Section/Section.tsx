import type { ElementType, ReactNode } from 'react';

import { cx } from '@/lib/cx';

import styles from './Section.module.css';

export type SectionProps = {
  /** Element to render. Defaults to a semantic <section>; use "div"/"header"/"footer" as needed. */
  as?: ElementType;
  /**
   * Drop the band's vertical rhythm to zero, for a composition that supplies its own — a
   * full-bleed immersive hero being the case that needs it.
   */
  flush?: boolean;
  /**
   * Extra classes. Do NOT set horizontal padding or max-width here — Section owns the
   * content column, and overriding it from outside puts one band out of alignment with
   * every other band on the page.
   */
  className?: string;
  children: ReactNode;
  id?: string;
};

/**
 * Section — the full-width band that insets its content to the one shared content column,
 * applies the system-owned vertical rhythm, and provides the positioning context for
 * full-bleed layers. Drop a Layout inside it to arrange the content.
 *
 * DEFERRED: the tonal `surface` prop (default / muted) and the `theme="dark"` island both
 * emitted data attributes that the token layer resolved into colour. They come back when the
 * token system lands — this is the one primitive that needs re-wiring at that point. Until
 * then Section is purely structural and paints nothing.
 */
export function Section({
  as: Tag = 'section',
  flush = false,
  className,
  children,
  id,
}: SectionProps) {
  return (
    <Tag id={id} className={cx(styles.section, flush && styles.flush, className)}>
      {children}
    </Tag>
  );
}
