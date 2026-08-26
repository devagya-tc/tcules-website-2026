import type { ReactNode } from 'react';

import { Layout, Section, type SectionDensity, type SectionSurface } from '@/components';

import styles from './ContentSection.module.css';

export type ContentSectionProps = {
  /**
   * The band's `h2`, verbatim. Absent renders no heading and no seam — an untitled section is a
   * real shape in the content model (the run of blocks before the first heading), not a fault.
   *
   * A `string` and not a `ReactNode`, for the same reason CtaSection types it that way: it makes
   * a second heading impossible to smuggle into a band that already sits under a route's one h1.
   */
  heading?: string;
  /**
   * The heading's id, and therefore the band's accessible name. Supplied by the CALLER rather
   * than generated with `useId`, because this id is also the in-page anchor a table of contents
   * links to and a URL fragment lands on — so it belongs to the content, which knows what the
   * section is called, not to the render, which does not.
   *
   * Only applied when `heading` is present. Without a heading there is nothing to name the
   * region, so the band renders as a plain `div` and takes no `aria-labelledby` it could not
   * honour.
   */
  headingId?: string;
  /** The category label above the heading. Absent renders no element and no seam. */
  eyebrow?: string;
  /**
   * One sentence under the heading, at lede scale — what this section is about, before the
   * blocks that argue it.
   *
   * This is the slot that makes the rhythm work. Without it the heading and the first block are
   * the only two things in the band, so a single gap step has to serve both "heading to its own
   * lead" and "lead to the evidence under it" — and those are different distances. With it, the
   * eyebrow, heading and deck group into ONE unit and the blocks are a separate beat.
   */
  deck?: string;
  /**
   * Which ground `Section` paints under this band. Passed straight through and read nowhere
   * else — this component paints nothing, so taking the prop is not the same as owning the
   * ground.
   */
  surface?: SectionSurface;
  /**
   * Vertical air, passed through to `Section`. A band holding one paragraph and a band holding a
   * five-card grid do not want the same air, and that is a property of what is IN the band —
   * which only the caller knows.
   */
  density?: SectionDensity;
  /** The blocks. Each becomes one row of the body stack at `--gap-stack`. */
  children?: ReactNode;
};

/**
 * ContentSection — one CMS section as one band, built for the shape every long-form page type in
 * this repo produces: an optional eyebrow, one heading, an optional deck, then a run of blocks.
 *
 * IT EXISTS FOR THE RHYTHM, and the rhythm is nesting rather than a knob. The old composition put
 * the h2 and every block in one `Layout rowGap="stack"`, so all of them were flat siblings and
 * 48 was the only distance available: heading to body read exactly as far apart as body to the
 * cards beneath it, and the page had no internal grouping at any scale. CLAUDE.md § Layout rule 4
 * is the fix and this component is where it is applied — tighten by grouping, loosen by
 * separating:
 *
 *   tight  (8)   eyebrow → heading      a label and the thing it labels
 *   block  (24)  heading → deck         a statement and its own lead
 *   stack  (48)  head group → blocks    and between the blocks themselves
 *
 * So the head group reads as one object with air beneath it, rather than as three evenly spaced
 * rows. Nothing here is responsive and nothing here is a distance this file chose: all three are
 * gap-scale steps, and they do not shift at a breakpoint.
 *
 * It contributes TYPE AND INK only. `Section` paints the band from the `surface` handed to it,
 * `Layout` owns every seam, and the blocks own themselves. There are no state tokens, which is
 * the assertion that this component's rendering is a function of its props: nothing in it
 * responds to a pointer and nothing opens.
 *
 * Route-blind and data-blind like every pattern — it never learns that Strapi exists.
 */
export function ContentSection({
  heading,
  headingId,
  eyebrow,
  deck,
  surface,
  density,
  children,
}: ContentSectionProps) {
  /* The head group is only rendered when something is in it. An untitled section is the run of
     blocks before the first heading, and it wants no empty row above it. */
  const hasHead = Boolean(eyebrow || heading || deck);

  /* A `section` element is only honest when the band has a name. Unheaded, it is a `div` —
     an unnamed <section> is a region a screen reader announces and cannot identify. */
  const labelled = Boolean(heading && headingId);

  return (
    <Section
      as={labelled ? 'section' : 'div'}
      surface={surface}
      density={density}
      aria-labelledby={labelled ? headingId : undefined}
    >
      <Layout rowGap="stack">
        {hasHead ? (
          /* 24 between the heading and its deck. The eyebrow+heading pair nests one level
             deeper at 8, so the three rows are two groups rather than three evenly spaced
             lines — which is the whole reason this component is not a flat Layout. */
          <Layout rowGap="block">
            {eyebrow || heading ? (
              <Layout rowGap="tight">
                {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
                {heading ? (
                  <h2 id={headingId} className={styles.heading}>
                    {heading}
                  </h2>
                ) : null}
              </Layout>
            ) : null}
            {deck ? <p className={styles.deck}>{deck}</p> : null}
          </Layout>
        ) : null}

        {/* The body beat. A second Layout rather than spreading the children into the outer one,
            so the head group is ONE row of the outer stack no matter how many blocks follow —
            without it, a band with no deck would be indistinguishable from the flat composition
            this component replaces. */}
        {children !== undefined ? <Layout rowGap="stack">{children}</Layout> : null}
      </Layout>
    </Section>
  );
}
