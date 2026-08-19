import type { ElementType, ReactNode } from 'react';

import { cx } from '@/lib/cx';

import styles from './Section.module.css';

/**
 * The four grounds. Declared in tokens/components/section.css, which remaps every
 * --sec-* role per surface — so a button three components deep gets the right treatment
 * without being told what it is sitting on.
 *
 * `blue` is a pivot: one appearance per page, and never adjacent to an `ink` section.
 */
export type SectionSurface = 'paper' | 'tint' | 'ink' | 'blue';

/**
 * Vertical air. Omit for the standard band (--sec-padding-y, 96). The two variants are the token
 * layer's own, and there is no arbitrary value: a band is standard, tight, open, or flush.
 */
export type SectionDensity = 'tight' | 'open';

export type SectionProps = {
  /** Element to render. Defaults to a semantic <section>; use "div"/"header"/"footer" as needed. */
  as?: ElementType;
  /**
   * The ground this band paints, and the ink, rules, accents and links that read on it.
   * Defaults to `paper`.
   *
   * The attribute is emitted even for `paper`, deliberately: paper is the `:root` default, so
   * omitting it would work at the top level but leave a paper band nested inside an `ink` one
   * inheriting dark roles.
   */
  surface?: SectionSurface;
  /** Vertical air — `tight` (64) or `open` (128) against the standard 96. */
  density?: SectionDensity;
  /**
   * Drop the vertical air to zero, for a composition that supplies its own — a full-bleed
   * immersive hero being the case that needs it. Overrides `density`.
   */
  flush?: boolean;
  /**
   * Extra classes. Do NOT set horizontal padding, max-width, background or colour here —
   * Section owns the content column and the ground, and overriding either from outside puts
   * one band out of alignment with every other band on the page.
   */
  className?: string;
  children: ReactNode;
  id?: string;
};

/**
 * Section — the full-width band. Paints the ground, insets its content to the shared content
 * column, applies the vertical rhythm, and provides the positioning context for full-bleed
 * layers. Drop a Layout inside it to arrange the content.
 *
 * Every value it uses comes from the --sec-* component token layer; this component contributes
 * no distances and no colours of its own.
 */
export function Section({
  as: Tag = 'section',
  surface = 'paper',
  density,
  flush = false,
  className,
  children,
  id,
}: SectionProps) {
  return (
    <Tag
      id={id}
      data-surface={surface}
      className={cx(
        styles.section,
        !flush && density && styles[density],
        flush && styles.flush,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
