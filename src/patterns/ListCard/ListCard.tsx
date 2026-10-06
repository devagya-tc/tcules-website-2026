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
 * `Media` owns everything inside it: the srcset, the lazy load, the panel. The edge is the box's: a
 * radius and no frame, for every kind (§ 5.3). `alt` is
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

/**
 * Where the item sits, which decides where its rule and marker go (1 Oct 2026).
 *
 *   row   one row of a one-column list. The rule CLOSES the row (block-end), the marker stands
 *         beside the content, and the title and body split or stack (`arrangement`). The default.
 *   tile  one item in a grid track. The rule OPENS the item (block-start), the marker stands above
 *         the title, and the title and body always stack. The copy sits flush with the track, so a
 *         grid of tiles aligns with the section heading over it.
 *
 * A form, not a finish: both are the same ruled, groundless item. The rule moves because of what it
 * has to line up with. Rows close on a rule so every row ends on the same line as its neighbour;
 * tiles in a grid have unequal heights, so only their TOPS align, and an opening rule is the edge
 * that does. The service pages drew their own tile for this (Signals, Steps, Ledger) because
 * ListCard could not; this is that tile, once.
 */
export type ListCardForm = 'row' | 'tile';

/**
 * The item's type step (visual-direction § 7.2, 5 Oct 2026). A COMPONENT SIZE, so a t-shirt name. A
 * row cannot see its siblings, so the composing route passes it.
 *
 *   md  h4 title, body      a set of up to three rows; the default for `form="row"`
 *   sm  h5 title            any set of four rows or more, and every tile; the default for
 *                           `form="tile"`. A tile's body steps to body-sm with it; a row's body
 *                           stays at body, because it runs at up to --measure-body and body-sm at
 *                           that measure read as fine print (6 Oct 2026; § 1.4's F step row and
 *                           one-column D row are h5 over body)
 *
 * The default follows the form (5 Oct 2026), so the rule that tiles take `sm` is the path of least
 * resistance rather than something every grid has to remember. A route still passes `sm` to a row
 * set of four or more, because only it can count.
 *
 * There is no `lg`. § 7.2's large step is the one featured, horizontal card, which is BlockCard's
 * arrangement; a ListCard is never featured, so a third step would be a size nothing may use.
 */
export type ListCardSize = 'md' | 'sm';
export type ListCardTitleElement = 'span' | 'h3' | 'h4';

/**
 * A closed content record. There is no `children`, `className` or DOM-attribute spread: allowing
 * any of them would reopen nested controls, call-site geometry and a second source for the cue.
 */
type ListCardFormProps =
  | {
      /** A row in a one-column list. See `ListCardForm`. */
      form?: 'row';
      /** Title/body geometry only. Defaults to the corpus's highest-volume split arrangement. */
      arrangement?: ListCardArrangement;
    }
  | {
      /** An item in a grid track. See `ListCardForm`. */
      form: 'tile';
      /** A tile always stacks: a split needs a row's width, and a grid track never has it. */
      arrangement?: never;
    };

export type ListCardProps = ListCardFormProps & {
  /** Primary label. Whitespace-only values render nothing and warn in development. */
  title: string;
  /**
   * One explanatory paragraph. Optional (1 Oct 2026): an item can be its name alone — a checklist
   * line, a deliverable that needs no gloss. Absent renders no paragraph and no seam; a value that
   * is present but whitespace-only is a CMS fault, so it is omitted with a warning.
   */
  body?: string;
  /** Optional leading content. Absence removes both the slot and its adjacent seam. */
  marker?: ListCardMarker;
  /** Heading semantics without a visual type change. */
  titleAs?: ListCardTitleElement;
  /** The type step, passed by the set. Defaults to `sm` on a tile and `md` on a row. */
  size?: ListCardSize;
  /** A non-blank destination turns the entire row into one native link and adds its cue. */
  href?: string;
  /**
   * The destination leaves tcules.com. Opens in a new tab, swaps the cue for the "leaves the
   * site" arrow (`arrow-right-up`) and appends a visually hidden "(opens in a new tab)" to the row's accessible name.
   * Ignored on a row with no destination.
   */
  external?: boolean;
  /**
   * Where a linked row's arrow sits (cmp-services fix round 1, 6 Oct 2026). Ignored on a tile and
   * on a row with no destination.
   *
   *   end     the default: the arrow at the row's inline end, and the row paints a ground on hover.
   *   title   BlockCard's link model: the arrow follows the title's last word, and on hover the
   *           title takes the link ink to meet it. With no ground to clear, the row drops its 16
   *           inline inset, so its marker and copy sit on the column edge the band's head and the
   *           rule share. For a router or an index, where a row is a destination, not a line item.
   *           On a 160 thumbnail row the end arrow sat 400px from its title, on the cap line.
   */
  cue?: ListCardCue;
};

export type ListCardCue = 'end' | 'title';

/** One modifier per step, on the root; the module sets title, body and ordinal offset under it. */
const SIZE_CLASS: Record<ListCardSize, string | undefined> = {
  md: styles.sizeMd,
  sm: styles.sizeSm,
};

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`ListCard: ${message}`);
}

/** The marker slot. Blank thumbnail sources collapse rather than leaving a broken-image frame. */
function Marker({ marker, form }: { marker: ListCardMarker; form: ListCardForm }) {
  if (marker.type === 'number') {
    /* At least two digits, not exactly two: the expected 01–12 align, while an out-of-range 100
       stays honest rather than being truncated. The <ol> announces position, so the visual copy
       is hidden and cannot be read twice. */
    const value = String(marker.value).padStart(2, '0');

    return (
      <span
        aria-hidden="true"
        className={cx(styles.marker, styles.number, form === 'tile' && styles.numberAbove)}
      >
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

  /* The box is ListCard's and Media fills it: `fill` covers a ratio the PARENT set, from Media's anchor,
     which is the whole of what a mechanical crop is (Media.md § 3). The record's own width and height
     still reach the <img>, so the browser reserves the right box before the file lands, and the
     160 `sizes` means a 2× screen asks for the ladder's 320 rung rather than the 2560 master.
     Never `priority`: a thumbnail is never a page's LCP image, so it stays lazy and async.

     `inset="text"`: a B5 cut-out on its contrast panel keeps 16px of panel round it here rather than
     the 32 a full-column placement takes, because at 160 × 107 the gutter inset left the part
     96 × 43 — not one recognisable shape (ch05 § 9). Media owns the value; ListCard only names the
     step, since only the placement knows how small its box is (29 Sep 2026, 2.17).

     `edge="placement"`: the box draws the thumbnail's edge, and that edge is a radius with no frame,
     for every kind (visual-direction § 5.3, fdn-media, 6 Oct 2026). A capture's own hairline would
     otherwise run round a 160px crop the row made, which is a frame (spec § 17 q9). */
  return (
    <span className={cx(styles.marker, styles.thumbnail)}>
      <Media
        image={marker.image}
        sizes={LIST_CARD_THUMBNAIL}
        fit="fill"
        edge="placement"
        inset="text"
      />
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
  form = 'row',
  arrangement = 'split',
  titleAs: Title = 'span',
  size,
  href,
  external = false,
  cue: cueAt = 'end',
}: ListCardProps) {
  if (title.trim().length === 0) {
    warn('title is blank; rendering nothing.');
    return null;
  }

  const hasBody = body !== undefined && body.trim().length > 0;
  if (body !== undefined && !hasBody) {
    warn(`body is blank for ${JSON.stringify(title)}; omitting the paragraph.`);
  }
  const isTile = form === 'tile';
  const step: ListCardSize = size ?? (isTile ? 'sm' : 'md');

  const destination = href?.trim() ? href : undefined;
  const isSplit = !isTile && arrangement === 'split';
  const leaves = destination !== undefined && external;
  const titleCue = destination !== undefined && !isTile && cueAt === 'title';

  /* The title-cued row: the arrow after the title's last word, joined by a non-breaking space so it
     never starts a line alone, and the hint inside it so the accessible name still ends on it. */
  const titleNode = (className: string | undefined) => (
    <Title className={cx(className, titleCue && styles.cuedTitle)}>
      {title}
      {titleCue ? (
        <>
          {'\u00a0'}
          <span className={styles.titleCue}>
            <Icon name={leaves ? 'arrow-right-up' : 'arrow-right'} size="lg" />
            {leaves ? <span className={styles.hint}> (opens in a new tab)</span> : null}
          </span>
        </>
      ) : null}
    </Title>
  );

  const cue =
    destination && !titleCue ? (
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
    ) : null;

  /* The tile: marker, then the title over its body, then — on a linked tile — the cue at the foot,
     pinned there so every cue in a grid row sits on one line however long its body runs.

     The marker and the copy are a wrapping Cluster (final fix round, cmp-media-split, 6 Oct 2026),
     which is what lets the tile change shape at 768 without a second layout. From md the copy takes
     a whole line, so it wraps UNDER the marker at the Cluster's `block` (24) — further than title to
     body (`text`, 16), so the tile reads as a mark over a head-and-body group rather than three
     equally loose rows. Below md the copy takes the rest of the marker's line, so a tile on a phone
     is an icon-and-title row: four tiles stacked at 390 were ~1500 of rule, icon, title, body.

     Title to body stays `text`, not `tight` (8), in every form (visual-direction § 1.1, S3): it puts
     ListCard and BlockCard on one card rhythm, and at 8 a two-line title and its sentence read as
     one paragraph in two faces. A thumbnail marker always sits above: beside a phone-width copy
     column, a 160 image leaves it ~140. */
  const tileCopy = (
    <Layout rowGap="text" className={styles.content}>
      <Title className={styles.title}>{title}</Title>
      {hasBody ? <p className={styles.body}>{body}</p> : null}
    </Layout>
  );
  const tile = (
    <Layout rowGap="text" pinLast={destination !== undefined} className={styles.tileInner}>
      {marker ? (
        <Cluster colGap="block" rowGap="block" align="start">
          <Marker marker={marker} form={form} />
          <div
            className={cx(
              styles.tileCopy,
              marker.type === 'thumbnail' ? styles.tileCopyBelow : styles.tileCopyBeside,
            )}
          >
            {tileCopy}
          </div>
        </Cluster>
      ) : (
        tileCopy
      )}
      {cue}
    </Layout>
  );

  const row = (
    <Cluster colGap="block" rowGap="block" align="start">
      {marker ? <Marker marker={marker} form={form} /> : null}
      <Cluster colGap="block" align="start" nowrap className={styles.core}>
        {isSplit ? (
          /* The split reads the row's OWN width, not the viewport's. A wrapping Cluster puts title
             and body side by side only while both of their minimum tracks fit on one line, and
             wraps the body under the title the moment they do not — so a row in a 390px grid
             track stacks even on a 1440 screen, and the title is never squeezed into a track
             narrower than its words. The two maxima (--measure-title, --measure-body) are the cap:
             past them the leftover stays at the core's inline end instead of prising the title
             and its sentence apart. The module only sizes the two children inside Cluster. */
          <Cluster colGap="block" rowGap="text" align="start" className={styles.content}>
            {titleNode(cx(styles.title, styles.splitTitle))}
            {hasBody ? <p className={cx(styles.body, styles.splitBody)}>{body}</p> : null}
          </Cluster>
        ) : (
          <Layout rowGap="text" className={styles.content}>
            {titleNode(styles.title)}
            {hasBody ? <p className={styles.body}>{body}</p> : null}
          </Layout>
        )}
        {cue}
      </Cluster>
    </Cluster>
  );

  return (
    <li
      className={cx(
        styles.root,
        SIZE_CLASS[step],
        isTile && styles.tile,
        titleCue && styles.titleCued,
      )}
    >
      {destination ? (
        <a
          className={cx(styles.frame, styles.link)}
          href={destination}
          target={leaves ? '_blank' : undefined}
          rel={leaves ? 'noreferrer' : undefined}
        >
          {isTile ? tile : row}
        </a>
      ) : (
        <div className={cx(styles.frame, styles.still)}>{isTile ? tile : row}</div>
      )}
    </li>
  );
}
