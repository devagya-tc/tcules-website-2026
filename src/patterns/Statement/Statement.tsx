import type { ReactNode } from 'react';

import {
  Cluster,
  Layout,
  Section,
  Texture,
  TextureShape,
  type SectionSurface,
} from '@/components';

import styles from './Statement.module.css';

/**
 * Which element carries the sentence. Never `h1`: the page's only h1 is the hero's (§ 3.4).
 *
 *   h2  the default. The statement opens a part of the page and belongs in its outline.
 *   p   a statement that only restates what the page already argues, kept out of the outline —
 *       a heading navigator would otherwise list a sentence as a section.
 *
 * The element marks the outline; the ROLE (`--text-h1`) sets the scale, whichever element it is.
 */
export type StatementElement = 'h2' | 'p';

/**
 * The texture recipe a statement may carry (§ 6.3, as amended by cmp-banner). `head-half` fills the
 * head track under the eyebrow, the empty half of the [1, 2] row, from 1024 only, and spends the
 * band's one blue mass (§ 4.3: J with head-half — the sentence stays ink). Paper only.
 */
export type StatementTexture = 'head-half';

export type StatementProps = {
  /** The sentence, ≤ 14 words so it holds ≤ 3 lines at the h1 role in the 763 track (§ 1.5). */
  children: string;
  /** The label in the head track. Never repeats the band before it (§ 7.3). */
  eyebrow?: string;
  /** The sentence's element. Default `h2`. */
  as?: StatementElement;
  /** The h2's id — the band's accessible name and its anchor. Ignored when `as="p"`. */
  id?: string;
  /** One action under the sentence, a `stack` beneath — in practice a CtaRow, `rule={false}`. */
  actions?: ReactNode;
  /** `head-half` adds the texture (paper only; it is ignored with a warning on any other ground). */
  texture?: StatementTexture;
  /** Default `paper`. */
  surface?: SectionSurface;
};

/**
 * Statement — the J band: one sentence, large, and almost nothing else.
 *
 * [1, 2] from 1024 at the split seam (96): the eyebrow and its blue mark in the head track, the
 * sentence in the two-thirds track (763 at 1470), top edges level. `open` density (128) — the
 * references give a statement ~1.6× the standard air, and that maps to `--gap-section-open`, never to
 * an invented 208 (references § Meridian). Below 1024 one column: eyebrow, then the sentence a
 * `block` (24) beneath, the head rhythm.
 *
 * The blue mark is the band's foreground accent: a statement has no image, no icon and often no
 * link, and without the mark the band reads black and white (§ 4.1). The sentence stays ink.
 *
 * It contributes type, ink and the mark only. Section paints the band and its air, Layout and
 * Cluster own every seam, Texture owns the field.
 */
export function Statement({
  children,
  eyebrow,
  as: Tag = 'h2',
  id,
  actions,
  texture,
  surface = 'paper',
}: StatementProps) {
  const heading = Tag === 'h2';
  const labelled = heading && Boolean(id);
  const textured = texture === 'head-half' && surface === 'paper';

  if (process.env.NODE_ENV !== 'production' && texture && surface !== 'paper') {
    console.warn(`Statement: texture sits on paper only (§ 6.2); ignored on "${surface}".`);
  }

  const sentence = (
    <Tag id={heading ? id : undefined} className={styles.sentence} data-copy="statement">
      {children}
    </Tag>
  );

  return (
    <Section
      as={labelled ? 'section' : 'div'}
      surface={surface}
      density="open"
      aria-labelledby={labelled ? id : undefined}
      data-band="J"
    >
      {/* `stretch` when textured, so the head cell is the row's full height and the field has a
          box to fill; the Cluster stays at the cell's top either way. */}
      <Layout
        columns={{ lg: [1, 2] }}
        colGap="section"
        rowGap="block"
        align={textured ? 'stretch' : 'start'}
      >
        <div className={textured ? styles.head : undefined}>
          {textured ? (
            /* head-half, rebuilt in fix round 1. The first build hung a 160-tall ellipse blurred
               160 off the viewport's start edge: a thin shape under that much blur never reaches
               the grid's strength, so it read as a ~3% smudge with no edge, and its feather rose
               behind the eyebrow. Now the field belongs to the HEAD CELL. The cell is positioned
               (not isolated, so the layer still resolves against Section's stacking context); the
               Texture's box starts a `stack` (48) under the cell's top and runs to the band's
               bottom edge (Statement.module.css). One rect, centred in that box at 80% × 62%, blur
               40 (a 20 deviation): the core reaches the grid's full strength, the feather is spent
               before the box's edges, so nothing is cut hard, and the nearest feather stops ~30
               under the eyebrow's line and ~80 short of the sentence. A deliberate field under the
               mark, in the head track's empty half, touching no text. From 1024 only. */
            <Texture className={styles.texture}>
              <TextureShape width="80%" height="62%" blur={40} />
            </Texture>
          ) : null}
          <Cluster colGap="text" align="center" nowrap>
            <span aria-hidden="true" className={styles.mark} />
            {eyebrow ? (
              <p className={styles.eyebrow} data-copy="eyebrow">
                {eyebrow}
              </p>
            ) : null}
          </Cluster>
        </div>
        {actions ? (
          <Layout rowGap="stack">
            {sentence}
            {actions}
          </Layout>
        ) : (
          sentence
        )}
      </Layout>
    </Section>
  );
}
