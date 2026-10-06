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
 * The texture recipe a statement may carry (§ 6.3). `head-half` sits in the empty quadrant of the
 * head track, under the eyebrow, from 1024 only, and spends the band's one blue mass (§ 4.3: J with
 * head-half — the sentence stays ink). Paper only.
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
      {textured ? (
        /* head-half, placed in the empty quadrant of the HEAD track, under the eyebrow (cmp-banner,
           6 Oct 2026, amending § 6.3's "top −200, end −120"). Built as first written, the box sat
           200 above the band's top edge, so the band's own clip drew the grid's hard top line
           across the paper-to-paper seam at 88% strength; and nothing below the 128 of padding is
           free in the end track, which the sentence fills. Here the box is x −160 to 34% (340 at
           1470, the sentence track starts at 592) and y 176 to 336, clear of the eyebrow (128 to
           142) and of the sentence's box; the feather fades to < 10% before either band edge and
           the start edge is the viewport's. From 1024 only. */
        <Texture className={styles.texture}>
          <TextureShape
            kind="ellipse"
            left={-160}
            top={176}
            width="34%"
            height={160}
            blur={160}
          />
        </Texture>
      ) : null}
      <Layout columns={{ lg: [1, 2] }} colGap="section" rowGap="block" align="start">
        <Cluster colGap="text" align="center" nowrap>
          <span aria-hidden="true" className={styles.mark} />
          {eyebrow ? (
            <p className={styles.eyebrow} data-copy="eyebrow">
              {eyebrow}
            </p>
          ) : null}
        </Cluster>
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
