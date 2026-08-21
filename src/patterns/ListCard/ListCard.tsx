import { Cluster, Icon, Layout, type IconName } from '@/components';
import { cx } from '@/lib/cx';

import styles from './ListCard.module.css';

/**
 * One slot, three fills. The discriminator is content, not a visual variant: every member lands in
 * the same leading position and the row around it keeps the same rule, inset and type.
 *
 * Thumbnail fields are owned here rather than accepted as a node. That makes the native image,
 * intrinsic ratio, centre crop and blank-source behaviour one decision across every caller. `alt`
 * stays required even when its correct value is an empty string, so decoration has to be chosen
 * explicitly rather than arriving through an omitted attribute.
 */
export type ListCardMarker =
  | { kind: 'number'; value: number }
  | { kind: 'icon'; name: IconName }
  | { kind: 'thumbnail'; src: string; alt: string };

export type ListCardArrangement = 'split' | 'stacked';
export type ListCardTitleElement = 'span' | 'h3' | 'h4';

/**
 * A closed content record. There is no `children`, `className` or DOM-attribute spread: allowing
 * any of them would reopen nested controls, call-site geometry and a second source for the cue.
 */
export type ListCardProps = {
  /** Primary label. Whitespace-only values render nothing and warn in development. */
  title: string;
  /** One explanatory paragraph. Whitespace-only values omit the paragraph and warn. */
  body: string;
  /** Optional leading content. Absence removes both the slot and its adjacent seam. */
  marker?: ListCardMarker;
  /** Title/body geometry only. Defaults to the corpus's highest-volume split arrangement. */
  arrangement?: ListCardArrangement;
  /** Heading semantics without a visual type change. */
  titleAs?: ListCardTitleElement;
  /** A non-blank destination turns the entire row into one native link and adds its cue. */
  href?: string;
};

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`ListCard: ${message}`);
}

/** The marker slot. Blank thumbnail sources collapse rather than leaving a broken-image frame. */
function Marker({ marker }: { marker: ListCardMarker }) {
  if (marker.kind === 'number') {
    /* At least two digits, not exactly two: the expected 01–12 align, while an out-of-range 100
       stays honest rather than being truncated. The <ol> announces position, so the visual copy
       is hidden and cannot be read twice. */
    const value = String(marker.value).padStart(2, '0');

    return (
      <span aria-hidden="true" className={cx(styles.marker, styles.number)}>
        {value}
      </span>
    );
  }

  if (marker.kind === 'icon') {
    /* The title names the subject, so Icon's unlabelled form is the right one: it emits
       aria-hidden and cannot duplicate the row name. */
    return (
      <span className={cx(styles.marker, styles.icon)}>
        <Icon name={marker.name} size="xl" />
      </span>
    );
  }

  if (marker.src.trim().length === 0) {
    warn('thumbnail marker received a blank src; omitting the marker.');
    return null;
  }

  return (
    <span className={cx(styles.marker, styles.thumbnail)}>
      {/* This contract deliberately owns a native image: the repository has no Image primitive or
          next/image precedent, and the accepted spec chose src/alt fields over a caller-owned
          media node. Intrinsic dimensions encode the same 3:2 ratio as the crop frame and prevent
          layout shift before the stylesheet arrives. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- accepted native-image contract */}
      <img
        className={styles.thumbnailImage}
        src={marker.src}
        alt={marker.alt}
        width={480}
        height={320}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}

/**
 * ListCard — one ruled row, built to docs/specs/ListCard.md.
 *
 * The root is always an <li>; its parent decides whether the list is ordered. A non-blank href
 * changes only the frame element and the cue: one <a> wraps the row, giving it one focus stop and
 * one accessible name, while the static shape is an inert <div> with no pointer states.
 *
 * Every arrangement is a primitive. The outer Cluster puts marker beside the content core and may
 * wrap the larger thumbnail above it. The inner nowrap Cluster keeps the cue at the core's inline
 * end. Layout owns the 2:3 title/body split and its single-track collapse. The module contains no
 * grid or flex arrangement; its flex declarations only size children inside those primitives.
 */
export function ListCard({
  title,
  body,
  marker,
  arrangement = 'split',
  titleAs: Title = 'span',
  href,
}: ListCardProps) {
  if (title.trim().length === 0) {
    warn('title is blank; rendering nothing.');
    return null;
  }

  const hasBody = body.trim().length > 0;
  if (!hasBody) warn(`body is blank for ${JSON.stringify(title)}; omitting the paragraph.`);

  const destination = href?.trim() ? href : undefined;
  const isSplit = arrangement === 'split';

  const row = (
    <Cluster colGap="block" rowGap="block" align="start">
      {marker ? <Marker marker={marker} /> : null}
      <Cluster colGap="block" align="start" nowrap className={styles.core}>
        <Layout
          columns={isSplit ? { base: 1, md: [2, 3] } : undefined}
          colGap={isSplit ? 'column' : undefined}
          rowGap="tight"
          className={styles.content}
        >
          <Title className={styles.title}>{title}</Title>
          {hasBody ? <p className={styles.body}>{body}</p> : null}
        </Layout>
        {destination ? (
          <span className={styles.cue}>
            <Icon name="arrow-right" size="lg" />
          </span>
        ) : null}
      </Cluster>
    </Cluster>
  );

  return (
    <li className={styles.root}>
      {destination ? (
        <a className={cx(styles.frame, styles.link)} href={destination}>
          {row}
        </a>
      ) : (
        <div className={styles.frame}>{row}</div>
      )}
    </li>
  );
}
