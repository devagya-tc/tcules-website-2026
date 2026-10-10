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
 *
 *   head-half    the end-edge CORNER fade: one feathered field arriving from past the top-end corner.
 *                Start-aligned sentences.
 *   end-fade     the end-edge HORIZONTAL fade (owner, 9 Oct 2026): the field runs the band's full
 *                height along its end edge and fades toward the start, so the gradient is right to
 *                left rather than corner-in. Start-aligned sentences only — a centred sentence
 *                reaches into its feather.
 *   corner       the stepped pixel field in the top-end corner. Centred sentences.
 *   corner-pair  `corner` plus a lighter, related cluster in the bottom-start corner (owner, 9 Oct
 *                2026), so a centred band reads balanced. Centred sentences.
 */
export type StatementTexture = 'head-half' | 'end-fade' | 'corner' | 'corner-pair';

/**
 * Where the sentence sits. One column in both: the eyebrow directly above the sentence, a `block`
 * (24) apart, the action a `stack` (48) under it.
 *
 *   start   default. On the band's start edge, the sentence on its own generous measure (the title
 *           measure), the band's end left open as air.
 *   center  eyebrow, sentence and action centred on the band's axis across the full measure —
 *           Meridian's overview line. For a page whose neighbouring bands already start their
 *           content on the start edge. Pair it with `texture="corner"`, the corner being the only
 *           ground a centred sentence leaves clear.
 *
 * There is no split form (owner, 7 Oct 2026). `split` set the eyebrow alone in a one-third track,
 * ~480 from its sentence, and the band had no anchor: a label belongs to the thing it labels.
 */
export type StatementAlign = 'start' | 'center';

export type StatementProps = {
  /** Default `start`. See `StatementAlign`. */
  align?: StatementAlign;
  /** The sentence, ≤ 14 words so it holds ≤ 3 lines at the h1 role on its measure (§ 1.5). */
  children: string;
  /**
   * An optional graphic above the eyebrow: a secondary brand shape, one per band, decorative.
   * Statement sizes the slot (--stmt-graphic-size, square) and the caller supplies the shape, so
   * the shape is chosen where the page is composed (owner, 7 Oct 2026: trying the shapes is
   * Figma work). Render it aria-hidden; it says nothing the sentence does not.
   */
  graphic?: ReactNode;
  /** The label directly above the sentence. Never repeats the band before it (§ 7.3). */
  eyebrow?: string;
  /** The sentence's element. Default `h2`. */
  as?: StatementElement;
  /** The h2's id — the band's accessible name and its anchor. Ignored when `as="p"`. */
  id?: string;
  /** One action under the sentence, a `stack` beneath — in practice a CtaRow, `rule={false}`. */
  actions?: ReactNode;
  /**
   * The texture (paper only; ignored with a warning on any other ground). `head-half` is § 6.3's
   * blurred field, from 1024; `end-fade` the same field run full-height down the end edge;
   * `corner` the stepped pixel field in the band's top-end corner, from 1024, clear of the type
   * (TextureCorner); `corner-pair` that plus its bottom-start partner. See `StatementTexture`.
   */
  texture?: StatementTexture;
  /** Default `paper`. */
  surface?: SectionSurface;
};

/**
 * Statement — the J band: one sentence, large, and almost nothing else.
 *
 * One column at every width: the eyebrow, then the sentence a `block` (24) beneath — the head
 * rhythm, so the label sits on the thing it labels — and the action a `stack` (48) under that.
 * Start-aligned (default) or centred (`align`). `open` density (128) — the references give a
 * statement ~1.6× the standard air, and that maps to `--gap-section-open`, never to an invented 208
 * (references § Meridian).
 *
 * One size, the h1 role: the display size was retired (owner, 7 Oct 2026: "way too big"). What
 * sets the sentence apart from a section title is its voice, not its scale — regular weight, one
 * uniform ink (the two-tone italic turn was retired, owner, 9 Oct 2026). An optional `graphic` sits a `block` above
 * the eyebrow.
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
  align = 'start',
  graphic,
}: StatementProps) {
  const heading = Tag === 'h2';
  const labelled = heading && Boolean(id);
  const onPaper = surface === 'paper';
  const textured = texture === 'head-half' && onPaper;
  const faded = texture === 'end-fade' && onPaper;
  const cornered = (texture === 'corner' || texture === 'corner-pair') && onPaper;
  const paired = texture === 'corner-pair' && onPaper;
  const centred = align === 'center';

  if (process.env.NODE_ENV !== 'production' && texture && surface !== 'paper') {
    console.warn(`Statement: texture sits on paper only (§ 6.2); ignored on "${surface}".`);
  }

  const sentence = (
    <Tag
      id={heading ? id : undefined}
      className={cx(styles.sentence, centred && styles.centred)}
      data-copy="statement"
    >
      {children}
    </Tag>
  );

  return (
    <Section
      as={labelled ? 'section' : 'div'}
      surface={surface}
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
      {faded ? (
        /* end-fade: head-half's rect, its horizontal geometry unchanged (end −120, 30% wide, blur
           160), but run from −50% to 150% of the band's height, so the blur's vertical falloff lands
           outside the band and is clipped: the grid is at full strength from top edge to bottom
           edge along the end, and fades only toward the start. 30% rather than 34% so the feather
           stops short of a start-aligned sentence on its title measure at 1024. From 1024 only. */
        <Texture className={styles.texture}>
          <TextureShape top="-50%" right={-120} width="30%" height="200%" blur={160} />
        </Texture>
      ) : null}
      {cornered ? <TextureCorner /> : null}
      {paired ? <TextureCorner at="bottom-start" /> : null}
      {/* One column either way. The eyebrow-to-sentence seam is the head rhythm's `block`, the
          sentence-to-action seam the band's `stack`. Centred, Layout centres each part on the
          band's axis; start-aligned, every part keeps the start edge. */}
      <Layout rowGap="stack" justifyItems={centred ? 'center' : undefined}>
        <Layout rowGap="block" justifyItems={centred ? 'center' : undefined}>
          {graphic ? (
            <div className={styles.graphic} aria-hidden="true">
              {graphic}
            </div>
          ) : null}
          {eyebrow ? (
            <p className={styles.eyebrow} data-copy="eyebrow">
              {eyebrow}
            </p>
          ) : null}
          {sentence}
        </Layout>
        {actions ?? null}
      </Layout>
    </Section>
  );
}
