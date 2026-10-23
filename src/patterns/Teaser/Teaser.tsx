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
  { type: 'image'; image: TeaserImage } | { type: 'sketch'; name: ArticleSceneName };

/**
 * How the item arranges. A placement decision, never a CMS field.
 *
 *   stack   the picture above the copy: a tile in a row, a lead in a mosaic.
 *   beside  the picture beside the copy, in two equal halves, the copy hung from the picture's TOP
 *           edge so the meta line and the image start on one line (beauty round, 16 Oct 2026).
 *           Equal, because insight titles run long: at 3 : 2 an 80-character title stood six lines deep.
 *   row     a list entry: an optional marker (a date or an ordinal) in a fixed column at the START,
 *           the copy, then the picture as a thumbnail at the row's END — so every row's copy starts on
 *           one edge whether or not it has a picture. On a phone a marked row keeps its marker at the
 *           start and lays its picture over the copy in the copy's column (`weight`, `flip` and
 *           the date's scale are placement choices too — see those props and teaser.css).
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
   * The format, where the set mixes formats ("Video", "Guide"): it leads the meta line in the
   * title's ink, so the format is read first and the rest of the line stays quiet. Authored case.
   */
  label?: string;
  /**
   * The quiet line over the title — "Video · 13 min". Authored case; mono uppercases it. As parts,
   * the item joins them with " · " and a compact row keeps only the first on a phone.
   */
  meta?: string | readonly string[];
  /** The standfirst. Blank renders none. */
  body?: string;
  media?: TeaserMedia;
  /**
   * A date anchor: the day as a numeral over its month. In a row it takes the marker column at the
   * row's start; elsewhere it heads the copy, the meta line following it.
   */
  date?: TeaserDate;
  /** An ordinal ("01") in a row's marker column: an indexed list. Ignored outside a row, or with a date. */
  index?: string;
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
  /**
   * `beside` only: the picture at the row's END rather than its start — a set of features alternating
   * sides, so a column of them zigzags instead of stacking one silhouette. Ignored elsewhere.
   */
  flip?: boolean;
  /**
   * `beside` only: how the row is shared. `even` (default) halves it, for the long titles insights
   * carry; `picture` gives the picture seven twelfths and the copy five — a page's featured lead,
   * where the picture is the larger of the two at the one 16:9 ratio. Ignored elsewhere.
   */
  weight?: 'even' | 'picture';
  /**
   * `row` only: reserve the thumbnail track even when this piece has no picture, so every row of a
   * list ends its copy on one edge (beauty round 4, 16 Oct 2026). The caller sets it on every row of
   * a list in which ANY row has a picture; the reserved track draws nothing — no box, no stand-in.
   */
  slot?: boolean;
  /**
   * The picture is a GRAPHIC on a white ground (an event's card): its white takes the picture box's
   * own pale ground, so the graphic keeps an edge on paper instead of dissolving into it. Never for
   * a photograph — photographs share one tone layer and are never treated locally.
   */
  graphic?: boolean;
  /**
   * `row` only, and only without a date or an ordinal: from 768 the meta line leaves the copy for a
   * fixed column at the row's START, its facts one per line — an archive's ledger, where the title
   * then starts on one edge down the list and reads at a measure rather than across the column
   * (beauty round 4). On a phone the line stays over the title.
   */
  metaAside?: boolean;
};

const SIZE_CLASS: Record<TeaserSize, string | undefined> = {
  xl: styles.sizeXl,
  lg: styles.sizeLg,
  md: styles.sizeMd,
  sm: styles.sizeSm,
};

const FILL_BOX = { width: 16, height: 9 } as const;

/**
 * The record Media receives. The cover is DECORATIVE inside the item (alt cleared): the item is one
 * link, and its accessible name is its meta line and title — a cover's alt read first would bury
 * them. The meaning is in the words beside it.
 */
function mediaRecord(image: TeaserImage): MediaImage {
  const decorative = { ...image, alt: '' };
  if (image.width && image.height) {
    return { ...decorative, width: image.width, height: image.height };
  }
  return { ...decorative, ...FILL_BOX, sources: undefined, placeholderSize: true };
}

const CONTAINED_KINDS: ReadonlySet<string> = new Set(['illustration', 'cut-out']);

/**
 * TIER 2 — Teaser, one linked piece held without an edge (insights hub and format pages, 16 Oct
 * 2026). The whole item is one link; on hover and focus its title takes the accent and its picture
 * leans in. Proximity binds it: 16 from picture to copy, 8 inside the copy. The set around it owns
 * the generous distance between items. It draws no rule, no box and no stand-in.
 */
export function Teaser({
  title,
  href,
  label,
  meta,
  body,
  media,
  date,
  index,
  play = false,
  arrangement = 'stack',
  size = 'md',
  titleAs: Title = 'h3',
  as: Root = 'li',
  sizes = CARD_TWO_TRACKS,
  compact = false,
  flip = false,
  weight = 'even',
  slot = false,
  graphic = false,
  metaAside = false,
}: TeaserProps) {
  const hasImage = media?.type === 'image' && media.image.src.trim().length > 0;
  const picture =
    media && (media.type === 'sketch' || hasImage) ? (
      <span className={styles.media} aria-hidden="true">
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

  const row = arrangement === 'row';
  const asideMeta =
    row && metaAside && !date && !index && (Boolean(label) || metaParts.length > 0);
  const dateBlock = date ? (
    <Layout rowGap="none" className={styles.date}>
      <time className={styles.day} dateTime={date.dateTime}>
        {date.day}
      </time>
      <span className={styles.dateLabel}>{date.label}</span>
    </Layout>
  ) : null;
  /* The row's marker column: a date, else an ordinal. */
  const marker = row
    ? (dateBlock ?? (index ? <span className={styles.index}>{index}</span> : null))
    : null;

  const copy = (
    <Layout rowGap="tight">
      {!row ? dateBlock : null}
      {label || metaParts.length > 0 ? (
        <p className={cx(styles.meta, asideMeta && styles.metaInline)}>
          {label ? <span className={styles.label}>{label}</span> : null}
          {metaParts.map((part, i) =>
            /* The first fact always shows; the rest drop on a phone's narrow row. */
            i === 0 && !label ? (
              <span key={i}>{part}</span>
            ) : (
              <span key={i} className={styles.metaMore}>
                {` · ${part}`}
              </span>
            ),
          )}
        </p>
      ) : null}
      <Title className={styles.title}>{title}</Title>
      {bodyText ? <p className={styles.body}>{bodyText}</p> : null}
    </Layout>
  );

  /* A row's copy beside its marker, in the marker's fixed column, so every row's copy starts on one
     edge whatever its date or ordinal says. */
  const marked = marker ? (
    <Layout columns={{ base: ['auto', 1] }} colGap="block" align="start">
      <span className={date ? styles.markerDate : styles.markerIndex}>{marker}</span>
      {copy}
    </Layout>
  ) : (
    copy
  );

  let inner;
  if (asideMeta) {
    /* The ledger row: the meta's facts in a fixed column at the start (from md), the copy at its
       measure, the thumbnail's track at the end where the list holds one. Below md the column is
       not drawn and the meta line is over the title, as in every other row. */
    const facts = [...(label ? [label] : []), ...metaParts];
    const thumb = picture || slot;
    inner = (
      <Layout
        columns={
          thumb ? { base: [1, 'auto'], md: ['auto', 1, 'auto'] } : { base: 1, md: ['auto', 1] }
        }
        colGap="gutter"
        align="start"
      >
        <Layout rowGap="inline" className={styles.markerAside}>
          {facts.map((fact, i) => (
            <span key={i} className={cx(styles.meta, i === 0 && label && styles.label)}>
              {fact}
            </span>
          ))}
        </Layout>
        {copy}
        {thumb ? (
          <span className={styles.thumb} aria-hidden={picture ? undefined : 'true'}>
            {picture}
          </span>
        ) : null}
      </Layout>
    );
  } else if (!picture && row && slot) {
    /* A row of a list in which other rows have pictures: the thumbnail's track is held, empty, so
       this row's copy ends on the same edge as theirs. */
    inner = (
      <Layout columns={{ base: [1, 'auto'] }} colGap="block" align="start">
        {marked}
        <span className={styles.thumb} aria-hidden="true" />
      </Layout>
    );
  } else if (!picture) {
    inner = marked;
  } else if (arrangement === 'beside') {
    inner = (
      /* Copy beside its picture is a split, so the column step — BlockCard's beside, the same. Hung
         from the picture's top edge: the meta line and the image start on one line. */
      <Layout
        columns={{ md: weight === 'picture' ? [7, 5] : [1, 1] }}
        reverse={flip ? { md: true } : undefined}
        colGap="column"
        rowGap="text"
        align="start"
      >
        {picture}
        {copy}
      </Layout>
    );
  } else if (row && marker) {
    /* A marked row (a date, an ordinal): the marker always heads the row at its start, so the row
       stays marker-led at every width. Beside it, from md, the copy then the picture as a thumbnail
       at the row's end; on a phone the picture over the copy in the copy's own column — at the
       row's end beside a marker the copy was left 140px. The source puts the picture first so the
       phone shows it on top; reverse mirrors it to the end from md, the auto track travelling with it. */
    inner = (
      <Layout columns={{ base: ['auto', 1] }} colGap="block" align="start">
        <span className={date ? styles.markerDate : styles.markerIndex}>{marker}</span>
        <Layout
          columns={{ base: 1, md: ['auto', 1] }}
          reverse={{ md: true }}
          colGap="column"
          rowGap="text"
          align="start"
        >
          <span className={cx(styles.thumb, styles.markedThumb)}>{picture}</span>
          {copy}
        </Layout>
      </Layout>
    );
  } else if (row) {
    inner = (
      <Layout columns={{ base: [1, 'auto'] }} colGap="block" align="start">
        {marked}
        <span className={styles.thumb}>{picture}</span>
      </Layout>
    );
  } else if (compact && arrangement === 'stack') {
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
        row && styles.row,
        arrangement === 'beside' && styles.beside,
        compact && arrangement === 'stack' && styles.compact,
        graphic && styles.graphic,
      )}
    >
      <a className={styles.link} href={href}>
        {inner}
      </a>
    </Root>
  );
}
