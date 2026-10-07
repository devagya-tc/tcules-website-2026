import type { ReactNode } from 'react';

import {
  Layout,
  Section,
  Texture,
  TextureCorner,
  TextureShape,
  type SectionSurface,
} from '@/components';

import { cx } from '@/lib/cx';

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
 * The texture recipe a statement may carry (§ 6.3). `head-half` is a field in the band's empty top-end
 * corner, bleeding off its top and end edges, from 1024 only, and spends the band's one blue mass
 * (§ 4.3: J with head-half — the sentence stays ink). Paper only.
 */
export type StatementTexture = 'head-half' | 'corner';

/**
 * Where the sentence sits (page-product-design fix round 2, 6 Oct 2026).
 *
 *   split   default. [1, 2] from 1024: the eyebrow in the head track, the sentence in the 763.
 *   center  one column at every width, eyebrow, sentence and action centred on the band's axis
 *           across the full measure — Meridian's overview line. For a page whose neighbouring bands
 *           already start their content on the 1/3 line: a split J between two beside bands read as
 *           one long split. Pair it with `texture="corner"`, the corner being the only ground a
 *           centred sentence leaves clear.
 */
export type StatementAlign = 'split' | 'center';

/**
 * The sentence's scale. `h1` (default) the h1 role; `display` the display role, the hero's — for
 * the one band on a page that restates its argument at the scale of its opening.
 */
export type StatementSize = 'h1' | 'display';

export type StatementProps = {
  /** Default `split`. See `StatementAlign`. */
  align?: StatementAlign;
  /** Default `h1`. See `StatementSize`. */
  size?: StatementSize;
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
  /**
   * The texture (paper only; ignored with a warning on any other ground). `head-half` is § 6.3's
   * blurred field, from 1024; `corner` the stepped pixel field in the band's top-end corner, from
   * 1024, clear of the type (TextureCorner).
   */
  texture?: StatementTexture;
  /** Default `paper`. */
  surface?: SectionSurface;
};

/**
 * Statement — the J band: one sentence, large, and almost nothing else.
 *
 * [1, 2] from 1024 at the split seam (96): the eyebrow in the head track, the
 * sentence in the two-thirds track (763 at 1470), top edges level. `open` density (128) — the
 * references give a statement ~1.6× the standard air, and that maps to `--gap-section-open`, never to
 * an invented 208 (references § Meridian). Below 1024 one column: eyebrow, then the sentence a
 * `block` (24) beneath, the head rhythm.
 *
 * The sentence stays ink. Eyebrows carry no mark (owner, 7 Oct 2026).
 *
 * It contributes type and ink only. Section paints the band and its air, Layout owns
 * every seam, Texture owns the field.
 */
export function Statement({
  children,
  eyebrow,
  as: Tag = 'h2',
  id,
  actions,
  texture,
  surface = 'paper',
  size = 'h1',
  align = 'split',
}: StatementProps) {
  const heading = Tag === 'h2';
  const labelled = heading && Boolean(id);
  const onPaper = surface === 'paper';
  const textured = texture === 'head-half' && onPaper;
  const cornered = texture === 'corner' && onPaper;
  const centred = align === 'center';

  if (process.env.NODE_ENV !== 'production' && texture && surface !== 'paper') {
    console.warn(`Statement: texture sits on paper only (§ 6.2); ignored on "${surface}".`);
  }

  const sentence = (
    <Tag
      id={heading ? id : undefined}
      className={cx(
        styles.sentence,
        size === 'display' && styles.sentenceDisplay,
        centred && styles.centred,
      )}
      data-copy="statement"
    >
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
        /* head-half, as § 6.3 specifies it (fix round 2): one rect at top −200, end −120, 34% × 296,
           blur 160, on the BAND's field. The box runs off the band's top edge and past its end
           edge and stops 96 into the band, inside the 128 of open air, so it clears the sentence
           box at every width from 1024; only the feather reaches the sentence's first line, at
           the strength limit 2 allows. Anchored to two edges, it reads as atmosphere arriving
           from outside the band rather than as an object set in it — the first two builds hung
           a field mid-track under the eyebrow, and with no edge to bleed from it read as a
           smudge. A direct child of Section, so the field is the band's padding box and nothing
           here restates Section's density. From 1024 only (§ 6.3: below 1024, none). */
        <Texture className={styles.texture}>
          <TextureShape top={-200} right={-120} width="34%" height={296} blur={160} />
        </Texture>
      ) : null}
      {cornered ? <TextureCorner /> : null}
      {centred ? (
        /* Centred: one column, every part on the band's axis. The eyebrow-to-sentence seam is the
           head rhythm's `block`, the sentence-to-action seam the band's `stack`, as in the split. */
        <Layout rowGap="stack" justifyItems="center">
          <Layout rowGap="block" justifyItems="center">
            {eyebrow ? (
              <p className={styles.eyebrow} data-copy="eyebrow">
                {eyebrow}
              </p>
            ) : null}
            {sentence}
          </Layout>
          {actions ?? null}
        </Layout>
      ) : (
        <Layout columns={{ lg: [1, 2] }} colGap="section" rowGap="block" align="start">
          {eyebrow ? (
            <p className={styles.eyebrow} data-copy="eyebrow">
              {eyebrow}
            </p>
          ) : (
            <div className={styles.headEmpty} />
          )}
          {actions ? (
            <Layout rowGap="stack">
              {sentence}
              {actions}
            </Layout>
          ) : (
            sentence
          )}
        </Layout>
      )}
    </Section>
  );
}
