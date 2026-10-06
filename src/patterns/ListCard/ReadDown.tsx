import { Layout, Texture, TextureShape, type IconName } from '@/components';
import { cx } from '@/lib/cx';

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

/** Which outer margin the `rail` texture takes, from 1440 (§ 6.3 `rail`). */
export type ReadDownRail = 'start' | 'end';

export type ReadDownProps = {
  rows: readonly ReadDownRow[];
  /** Default 1. See `ReadDownColumns`. */
  columns?: ReadDownColumns;
  /** The row titles' element. Default `h3`, under the band's h2. */
  titleAs?: ListCardTitleElement;
  /**
   * The `rail` texture recipe (§ 6.3): a long D band's one placement, in the outer margin, from 1440
   * only — below that the margin is the 32 gutter and the field would sit under the rows. The band
   * must be on paper (§ 6.2), and it spends one of the band's two blue masses (§ 4.3).
   */
  rail?: ReadDownRail;
};

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
export function ReadDown({ rows, columns = 1, titleAs = 'h3', rail }: ReadDownProps) {
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

  const size = rows.length >= 4 || columns === 2 ? 'sm' : 'md';

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

  if (!rail) return list;

  /* The rail is the band's, not the list's: Texture fills its nearest positioned ancestor, and
     nothing between this fragment and the Section is positioned, so the field covers the band and
     its one shape stands in the outer margin. Geometry is § 6.3's `rail`, exactly.

     The fragment makes the svg a second child of the caller's container. Out of flow, it takes no
     track and no gap; but a container that counts its children (`pinLast`, `reverse`, a `lead`
     offset) would count it, so place a railed set as the LAST block of a plain body stack, as
     ContentSection's beside body is. If ContentSection gains a texture slot, the rail moves there,
     where the band's surface is also known (the paper-only rule, § 6.2, is the caller's here). */
  return (
    <>
      <Texture className={styles.rail}>
        <TextureShape
          {...(rail === 'start' ? { left: -140 } : { right: -140 })}
          top="15%"
          width={220}
          height="70%"
          blur={120}
        />
      </Texture>
      {list}
    </>
  );
}
