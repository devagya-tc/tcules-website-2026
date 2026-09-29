import { Cluster, Icon, Layout, Media, type IconName, type MediaImage } from '@/components';
import { cx } from '@/lib/cx';
import { LIST_CARD_THUMBNAIL } from '@/lib/image-sizes';

import styles from './ListCard.module.css';

/**
 * One slot, three fills. The discriminator is content, not a visual variant: every member lands in
 * the same leading position and the row around it keeps the same rule, inset and type.
 *
 * The discriminant is `type`, not `kind`, for the reason PageHero's and BlockCard's media unions
 * switched (docs/specs/Media.md § 17 Q7): the thumbnail carries an image RECORD, and the record has
 * its own `kind` — capture, cut-out, illustration, photograph — which decides the image's edge.
 * Two fields called `kind` one level apart is a spread away from one overwriting the other.
 *
 * `number` is the ordered-steps fill (the Mechanism's semantic variant). It is only legal inside an
 * `<ol>`: the numeral is aria-hidden because the list announces position, so in a `<ul>` the order
 * would be visual only. The caller's `Layout as="ol"` owns that — see the component comment.
 *
 * `thumbnail` takes `Media`'s own `MediaImage` record, whole and untouched, exactly as a page
 * received it from `@/content`. ListCard owns the box — 160 inline, the shared 3:2 cover crop — and
 * `Media` owns everything inside it: the srcset, the lazy load and the edge by kind. `alt` is
 * required by the record even when its right value is `""`, so decoration is chosen, never omitted.
 *
 * Per ch05 § 9 and ruling C1 a thumbnail is for case-study and insight/resource rows only, and it
 * carries one cut-out part or one illustration shape. That is a supply rule, not a type: the
 * pattern cannot tell a case study from a glossary term, so the route decides whether to pass one.
 */
export type ListCardMarker =
  | { type: 'number'; value: number }
  | { type: 'icon'; name: IconName }
  | { type: 'thumbnail'; image: MediaImage };

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
  /**
   * The destination leaves tcules.com. Opens in a new tab, swaps the cue for the "leaves the
   * site" arrow (`arrow-right-up`) and appends a visually hidden "(opens in a new tab)" to the row's accessible name.
   * Ignored on a row with no destination.
   */
  external?: boolean;
};

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`ListCard: ${message}`);
}

/** The marker slot. Blank thumbnail sources collapse rather than leaving a broken-image frame. */
function Marker({ marker }: { marker: ListCardMarker }) {
  if (marker.type === 'number') {
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

  if (marker.type === 'icon') {
    /* The title names the subject, so Icon's unlabelled form is the right one: it emits
       aria-hidden and cannot duplicate the row name. */
    return (
      <span className={styles.marker}>
        <Icon name={marker.name} size="xl" />
      </span>
    );
  }

  if (marker.image.src.trim().length === 0) {
    warn('thumbnail marker received a blank src; omitting the marker.');
    return null;
  }

  /* The box is ListCard's and Media fills it: `fill` covers a ratio the PARENT set, from the centre,
     which is the whole of what a mechanical crop is (Media.md § 3). The record's own width and height
     still reach the <img>, so the browser reserves the right box before the file lands, and the
     160 `sizes` means a 2× screen asks for the ladder's 320 rung rather than the 2560 master.
     Never `priority`: a thumbnail is never a page's LCP image, so it stays lazy and async.

     `inset="text"`: a B5 cut-out on its contrast panel keeps 16px of panel round it here rather than
     the 32 a full-column placement takes, because at 160 × 107 the gutter inset left the part
     96 × 43 — not one recognisable shape (ch05 § 9). Media owns the value; ListCard only names the
     step, since only the placement knows how small its box is (29 Sep 2026, 2.17). */
  return (
    <span className={cx(styles.marker, styles.thumbnail)}>
      <Media image={marker.image} sizes={LIST_CARD_THUMBNAIL} fit="fill" inset="text" />
    </span>
  );
}

/**
 * ListCard — one ruled row, built to docs/specs/ListCard.md.
 *
 * The root is always an <li>; its parent decides whether the list is ordered. That is the caller's
 * on purpose: the set is a `Layout as="ol" | "ul"` with `rowGap="none"`, because Layout owns the list
 * axis and the seam between rows, and a row cannot see its siblings. Every route composes it that
 * way today — `as={numbered ? 'ol' : 'ul'}` beside `marker={numbered ? { type: 'number', … } : …}`,
 * one boolean driving both — so a numbered set is a real <ol> and an unordered one a <ul>. A
 * wrapper pattern that owned the list would be a pattern importing a pattern, or a second Layout.
 *
 * A non-blank href
 * changes only the frame element and the cue: one <a> wraps the row, giving it one focus stop and
 * one accessible name, while the static shape is an inert <div> with no pointer states.
 *
 * Every arrangement is a primitive. The outer Cluster puts marker beside the content core and may
 * wrap the larger thumbnail above it. The inner nowrap Cluster keeps the cue at the core's inline
 * end. The title/body split is a third, wrapping Cluster whose break point is the two children's
 * minimum tracks — the row's own width decides, never the viewport's (29 Sep 2026, 2.17). A stacked
 * row is a single-track Layout. The module contains no grid or flex arrangement; its flex
 * declarations only size children inside those primitives.
 */
export function ListCard({
  title,
  body,
  marker,
  arrangement = 'split',
  titleAs: Title = 'span',
  href,
  external = false,
}: ListCardProps) {
  if (title.trim().length === 0) {
    warn('title is blank; rendering nothing.');
    return null;
  }

  const hasBody = body.trim().length > 0;
  if (!hasBody) warn(`body is blank for ${JSON.stringify(title)}; omitting the paragraph.`);

  const destination = href?.trim() ? href : undefined;
  const isSplit = arrangement === 'split';
  const leaves = destination !== undefined && external;

  const row = (
    <Cluster colGap="block" rowGap="block" align="start">
      {marker ? <Marker marker={marker} /> : null}
      <Cluster colGap="block" align="start" nowrap className={styles.core}>
        {isSplit ? (
          /* The split reads the row's OWN width, not the viewport's. A wrapping Cluster puts title
             and body side by side only while both of their minimum tracks fit on one line, and
             wraps the body under the title the moment they do not — so a row in a 390px grid
             track stacks even on a 1440 screen, and the title is never squeezed into a track
             narrower than its words. The two maxima (--measure-title, --measure-body) are the cap:
             past them the leftover stays at the core's inline end instead of prising the title
             and its sentence apart. The module only sizes the two children inside Cluster. */
          <Cluster colGap="block" rowGap="tight" align="start" className={styles.content}>
            <Title className={cx(styles.title, styles.splitTitle)}>{title}</Title>
            {hasBody ? <p className={cx(styles.body, styles.splitBody)}>{body}</p> : null}
          </Cluster>
        ) : (
          <Layout rowGap="tight" className={styles.content}>
            <Title className={styles.title}>{title}</Title>
            {hasBody ? <p className={styles.body}>{body}</p> : null}
          </Layout>
        )}
        {destination ? (
          <span className={styles.cue}>
            {/* One glyph per meaning (ch04): `arrow-right` is "go, next", `arrow-right-up` is
                "leaves the site". Both are Solar Bold's plain arrows, the same drawing turned 45°,
                so an off-site row sits in a list of internal ones without a filled square among
                bare arrows (29 Sep 2026, 2.17). The cue is replaced, never doubled — one icon per
                row — and it keeps the cue's slot, size and ink, so an external row differs from an
                internal one by its glyph's angle alone. Trailing either way: both are movement. */}
            <Icon name={leaves ? 'arrow-right-up' : 'arrow-right'} size="lg" />
            {/* The glyph is aria-hidden, so the new tab is said in words, at the END of the
                accessible name so the title is still what a screen reader leads with. */}
            {leaves ? <span className={styles.hint}> (opens in a new tab)</span> : null}
          </span>
        ) : null}
      </Cluster>
    </Cluster>
  );

  return (
    <li className={styles.root}>
      {destination ? (
        <a
          className={cx(styles.frame, styles.link)}
          href={destination}
          target={leaves ? '_blank' : undefined}
          rel={leaves ? 'noreferrer' : undefined}
        >
          {row}
        </a>
      ) : (
        <div className={styles.frame}>{row}</div>
      )}
    </li>
  );
}
