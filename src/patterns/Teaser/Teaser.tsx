import { Icon, Layout, Media, type MediaImage, Sketch } from '@/components';
import { cx } from '@/lib/cx';
import { CARD_TWO_TRACKS } from '@/lib/image-sizes';
import type { ArticleSceneName } from '@/lib/sketches';

import styles from './Teaser.module.css';

/** The image record, with intrinsic size optional: the item owns its 16:9 box (BlockCard's argument). */
export type TeaserImage = Omit<MediaImage, 'width' | 'height'> & {
  width?: number;
  height?: number;
};

/**
 * The item's OWN picture: its cover, or the scene drawn for it from its own argument. There is no
 * stand-in and no texture: an item without a picture of its own is typographic (owner, 16 Oct 2026).
 */
export type TeaserMedia =
  | { type: 'image'; image: TeaserImage }
  | { type: 'sketch'; name: ArticleSceneName };

/**
 * How the item arranges. A placement decision, never a CMS field.
 *
 *   stack   the picture above the copy: a tile in a row, a lead in a mosaic.
 *   beside  the picture beside the copy, in two equal halves: a section's one featured piece. Equal,
 *           because insight titles run long: at 3 : 2 an 80-character title stood six lines deep.
 *   row     the copy, then the picture as a small thumbnail at the row's END, so every row in a list
 *           starts its copy on one edge whether or not it has a picture.
 */
export type TeaserArrangement = 'stack' | 'beside' | 'row';

/** The title step (see tokens/components/teaser.css). A component size, so a t-shirt name. */
export type TeaserSize = 'xl' | 'lg' | 'md' | 'sm';

/** A date anchor: the day as a numeral, the month and year (or "Date TBC") under it. */
export type TeaserDate = { day: string; label: string; dateTime?: string };

export type TeaserProps = {
  title: string;
  href: string;
  /**
   * The quiet line over the title — "Video · 13 min". Authored case; mono uppercases it. As parts,
   * the item joins them with " · " and a compact row keeps only the first on a phone.
   */
  meta?: string | readonly string[];
  /** The standfirst. Blank renders none. */
  body?: string;
  media?: TeaserMedia;
  /** A date heads the copy in place of the meta line's position (the meta line follows it). */
  date?: TeaserDate;
  /**
   * A play mark on the picture: the piece is watched, not read. Ignored without a picture, and on a
   * row, whose thumbnail is too small to carry a mark.
   */
  play?: boolean;
  arrangement?: TeaserArrangement;
  size?: TeaserSize;
  titleAs?: 'h2' | 'h3' | 'h4';
  /** The root element: an item of a list (default), or a plain block inside one. */
  as?: 'li' | 'div';
  /** The picture's `sizes` — the item cannot see its track, so the caller states it. */
  sizes?: string;
  /**
   * A stacked tile that becomes a ROW below 768: copy first, the picture as a thumbnail at its end.
   * For the secondary pieces of a set, so a phone's single column is not a run of full-width
   * pictures; the lead of a set never takes it.
   */
  compact?: boolean;
};

const SIZE_CLASS: Record<TeaserSize, string | undefined> = {
  xl: styles.sizeXl,
  lg: styles.sizeLg,
  md: styles.sizeMd,
  sm: styles.sizeSm,
};

const FILL_BOX = { width: 16, height: 9 } as const;

function mediaRecord(image: TeaserImage): MediaImage {
  if (image.width && image.height) return { ...image, width: image.width, height: image.height };
  return { ...image, ...FILL_BOX, sources: undefined, placeholderSize: true };
}

const CONTAINED_KINDS: ReadonlySet<string> = new Set(['illustration', 'cut-out']);

/**
 * TIER 2 — Teaser, one linked piece held without an edge (insights hub and format pages, 16 Oct
 * 2026). The whole item is one link; its title takes the accent on hover and focus and its picture
 * leans in. Proximity binds it: 16 from picture to copy, 8 inside the copy. The set around it owns
 * the generous distance between items. It draws no rule, no box and no stand-in.
 */
export function Teaser({
  title,
  href,
  meta,
  body,
  media,
  date,
  play = false,
  arrangement = 'stack',
  size = 'md',
  titleAs: Title = 'h3',
  as: Root = 'li',
  sizes = CARD_TWO_TRACKS,
  compact = false,
}: TeaserProps) {
  const hasImage = media?.type === 'image' && media.image.src.trim().length > 0;
  const picture =
    media && (media.type === 'sketch' || hasImage) ? (
      <span className={styles.media} aria-hidden={media.type === 'sketch' ? true : undefined}>
        <span className={styles.zoom}>
          {media.type === 'image' ? (
            <Media
              image={mediaRecord(media.image)}
              sizes={sizes}
              fit={CONTAINED_KINDS.has(media.image.kind ?? 'capture') ? 'contain' : 'fill'}
              edge="placement"
            />
          ) : (
            <Sketch name={media.name} />
          )}
        </span>
        {play && arrangement !== 'row' ? (
          <span className={styles.play} aria-hidden="true">
            <Icon name="chrome-play" />
          </span>
        ) : null}
      </span>
    ) : null;

  const metaParts = (typeof meta === 'string' ? [meta] : (meta ?? [])).filter(
    (part) => part.trim().length > 0,
  );
  const bodyText = body?.trim() ? body : undefined;

  const copy = (
    <Layout rowGap="tight">
      {date ? (
        <span className={styles.date}>
          <time className={styles.day} dateTime={date.dateTime}>
            {date.day}
          </time>
          <span className={styles.dateLabel}>{date.label}</span>
        </span>
      ) : null}
      {metaParts.length > 0 ? (
        <p className={styles.meta}>
          {metaParts[0]}
          {metaParts.slice(1).map((part) => (
            <span key={part} className={styles.metaMore}>
              {` · ${part}`}
            </span>
          ))}
        </p>
      ) : null}
      <Title className={styles.title}>{title}</Title>
      {bodyText ? <p className={styles.body}>{bodyText}</p> : null}
    </Layout>
  );

  let inner;
  if (!picture) {
    inner = copy;
  } else if (arrangement === 'beside') {
    inner = (
      <Layout columns={{ md: [1, 1] }} colGap="gutter" rowGap="text" align="center">
        {picture}
        {copy}
      </Layout>
    );
  } else if (arrangement === 'row') {
    inner = (
      <Layout columns={{ base: [1, 'auto'] }} colGap="block" align="start">
        {copy}
        <span className={styles.thumb}>{picture}</span>
      </Layout>
    );
  } else if (compact) {
    /* One Layout, two arrangements: below md the picture takes the auto track at the row's END
       (reverse mirrors the template, so the weight travels with it); from md the single-track stack. */
    inner = (
      <Layout
        columns={{ base: ['auto', 1], md: 1 }}
        reverse={{ base: true, md: false }}
        colGap="block"
        rowGap="text"
        align="start"
      >
        <span className={styles.compactPicture}>{picture}</span>
        {copy}
      </Layout>
    );
  } else {
    inner = (
      <Layout rowGap="text">
        {picture}
        {copy}
      </Layout>
    );
  }

  return (
    <Root
      className={cx(
        styles.root,
        SIZE_CLASS[size],
        arrangement === 'row' && styles.row,
        compact && styles.compact,
      )}
    >
      <a className={styles.link} href={href}>
        {inner}
      </a>
    </Root>
  );
}
