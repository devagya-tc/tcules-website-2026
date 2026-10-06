import { Layout, Media, Texture, TextureShape, type IconName, type MediaImage } from '@/components';
import { cx } from '@/lib/cx';
import { READ_DOWN_PHOTO } from '@/lib/image-sizes';

/* Bound as `Row`: the set's items are ListCard rows (and classes:check reads the stylesheet's path
   below as the stylesheet, not as a member access on the component). */
import { ListCard as Row, type ListCardTitleElement } from './ListCard';
import styles from './ListCard.module.css';

/** One read-down row: a subject, one sentence on it, and the blue glyph that gives it a shape. */
export type ReadDownRow = {
  title: string;
  /**
   * One sentence, set under the title at the lead measure (56ch). One column: ≤ 20 words, two lines
   * (the body box is ~548 at 1440, ~528 at 1024). Two columns: ≤ 19 words, three lines at 1440,
   * where the body box is 301 beside its glyph; at 1024 it is 208 and the same sentence runs a
   * line longer, so write to the 1440 ceiling and stay under it.
   */
  body?: string;
  /** A Solar Bold glyph, blue (§ 4.2). Give every row one or none: a set is all-icon or all-text. */
  icon?: IconName;
};

/**
 * One column (≤ 3 rows) or two (≤ 3 rows each). § 1.4 rule 8: a set never exceeds six, and two
 * columns with a CtaRow take ≤ 2 rows each — the band's footer is the caller's, so that half of
 * the rule is the caller's too.
 */
export type ReadDownColumns = 1 | 2;

type ReadDownBase = {
  rows: readonly ReadDownRow[];
  /** The row titles' element. Default `h3`, under the band's h2. */
  titleAs?: ListCardTitleElement;
};

/**
 * THE PHOTO FORM (fix round 1, 6 Oct 2026). A 3:2 photograph at 381 under the lead was the
 * size of a paragraph and ended 80 to 95 below the last rule, so the band finished ragged and the
 * image read as an attachment. In this form the photograph is the band's large thing and it lives
 * in the BODY: from 1440 the body track splits again into the rows and the photo, 64 (`column`)
 * apart, and the photo runs the rows' full height — about 349 × 526 with three rows, a 2:3
 * portrait, twice the area of the old aside — so the photo and the rows end on the same line, the
 * last rule. The caller passes no `aside`: the photo is it.
 *
 * One column only, two or three rows: the rows take the 349 track of the two-column set, so they
 * take that set's step (`sm`) and its arithmetic (§ 1.4, D row 186; three rows 526, a band of 718,
 * 814 with a CtaRow). Below 1440 the photo sits above the rows across the body track — 16:9 from
 * 1024, 3:2 below — first in DOM order, the phone's order (§ 3.7 item 4: aside between head and
 * body). The photograph is atmosphere (alt=""), so its visual move to the end carries no meaning.
 */
type ReadDownWithPhoto = ReadDownBase & {
  columns?: 1;
  photo: MediaImage;
  /**
   * The `rail` texture (§ 6.3), on the PHOTO's side: one field from 140 past the band's end edge,
   * 220 wide, 15% to 85% of its height, blur 120. Only with the photo, because the photo is what
   * makes the recipe honest: in the 100 to 115 margin of a 1440 to 1470 window the feather reaches
   * about 120 into the column, and on this side it passes UNDER the photograph, never under a word.
   * The field reads as the grid emerging from behind the image into the margin. From 1440 only,
   * where the photo stands in the end track. Paper only (§ 6.2); it spends one of the band's two
   * blue masses (§ 4.3).
   */
  rail?: boolean;
};

type ReadDownPlain = ReadDownBase & {
  /** Default 1. See `ReadDownColumns`. */
  columns?: ReadDownColumns;
  photo?: never;
  rail?: never;
};

export type ReadDownProps = ReadDownWithPhoto | ReadDownPlain;

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`ReadDown: ${message}`);
}

/**
 * ReadDown — the D band's body (visual-direction § 3.4 D): ruled ListCard rows in one column or
 * two, read top to bottom. A SET MODE of ListCard, in ListCard's folder, for the reason `Steps` is:
 * the set is ListCard's rows and nothing else, and a pattern beside it would be a pattern importing
 * a pattern. `Steps` is a method (numbered, read in order); this is a read-down of PEERS — what you
 * receive, who is involved, what a review covers — so its marker is a blue glyph, not an ordinal,
 * and its list is a `<ul>`.
 *
 *   THE SIZE IS THE SET'S (§ 7.2). One column (≤ 3 rows) takes `md` (h4), each row a title with its
 *   sentence under it at the lead measure, so three rows hold the head track's height rather than
 *   leaving a hole under a split. Every two-column set takes `sm` (h5), as does a one-column set
 *   pushed past its ceiling (which also warns); the body stays at body (6 Oct: a row's body does
 *   not step).
 *
 *   TWO COLUMNS ARE ONE LIST. A `<ul>` laid out two across at `column` (64, peer halves), in reading
 *   order, every grid row the height of its taller item, so the closing rules run level across the
 *   seam and the set reads as rows of a ladder rather than two ragged lists.
 *
 *   ON THE CONTENT EDGE. Read-down rows never take `href`, so they never paint the hover ground the
 *   row's 16 inline inset exists to clear: the inset goes and the glyph sits on the track's edge.
 *   The first row in each column drops its top inset, so the first title starts on the head's top
 *   line, and the ladder's rules sit between rows and after the last, never above the first.
 */
export function ReadDown({ rows, columns = 1, titleAs = 'h3', photo, rail }: ReadDownProps) {
  const perColumn = Math.ceil(rows.length / columns);
  if (rows.length > 6) warn(`received ${rows.length} rows; a read-down set never exceeds six.`);
  if (perColumn > 3) {
    warn(
      `${perColumn} rows in a column; a read-down column holds three at most (§ 1.4 rule 8).`,
    );
  }
  const icons = rows.filter((row) => row.icon).length;
  if (icons !== 0 && icons !== rows.length) {
    warn('some rows carry a glyph and some do not; a set is all-icon or all-text.');
  }

  if (photo && (rows.length < 2 || rows.length > 3)) {
    warn(`the photo form takes two or three rows; received ${rows.length}.`);
  }

  /* The photo form's rows sit in the 349 track, the two-column set's, and take its step. */
  const size = rows.length >= 4 || columns === 2 || photo ? 'sm' : 'md';

  const list = (
    <Layout
      as="ul"
      columns={columns === 2 ? { md: 2 } : undefined}
      colGap={columns === 2 ? 'column' : undefined}
      rowGap="none"
      className={cx(styles.readdown, columns === 2 && styles.readdownTwo)}
    >
      {rows.map((row, index) => (
        <Row
          key={`${index}-${row.title}`}
          size={size}
          arrangement="stacked"
          titleAs={titleAs}
          title={row.title}
          body={row.body}
          marker={row.icon ? { type: 'icon', name: row.icon } : undefined}
        />
      ))}
    </Layout>
  );

  if (!photo) return list;

  /* The photo form. Photo first in the DOM (above the rows below 1440), reversed to the end track
     from 1440. Layout owns both tracks and the 64 seam; the rows' Layout and the photo's box are its
     two children. `stretch`, so the photo's box takes the rows' height: the outer box is the
     inline-size container, the inner one reads it (cqi) below 1440 and fills the row from it.

     The rail's svg is a child of the band's body stack, out of flow: Texture fills its nearest
     positioned ancestor, and nothing between here and the Section is positioned, so the field
     covers the band. Place a railed set as the LAST block of a plain body stack, as ContentSection's
     beside body is. The geometry is § 6.3's `rail`, exactly; raw numbers because TextureShape takes
     them as props (as Statement's head-half field does). */
  return (
    <>
      {rail ? (
        <Texture className={styles.rail}>
          <TextureShape right={-140} top="15%" width={220} height="70%" blur={120} />
        </Texture>
      ) : null}
      <Layout
        columns={{ xl: [1, 1] }}
        colGap="column"
        rowGap="stack"
        reverse={{ xl: true }}
        align="stretch"
      >
        <div className={styles.readdownPhoto}>
          <div className={styles.readdownPhotoBox}>
            <Media image={photo} fit="fill" sizes={READ_DOWN_PHOTO} />
          </div>
        </div>
        {list}
      </Layout>
    </>
  );
}
