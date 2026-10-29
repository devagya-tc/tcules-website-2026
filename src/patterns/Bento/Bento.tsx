import type { ReactNode } from 'react';

import { Layout, Sketch } from '@/components';
import { cx } from '@/lib/cx';
import type { SketchName } from '@/lib/sketches';

import styles from './Bento.module.css';

/** One tile: where it goes, what it is called, the line that says what it is, and its drawing. */
export type BentoItem = {
  id: string;
  /** The destination's name ("Product Design"). The tile's heading. */
  title: string;
  /**
   * One or two lines on what it is. Plain text, about 60–90 characters: a tile is not a page.
   * Optional (component-map C11/C17): a set whose copy names each destination and says nothing more
   * (home's "One studio" row of four services) is title and drawing alone. Give every tile a body or
   * none, so the set reads as one.
   */
  body?: string;
  /** The whole tile is the link. */
  href: string;
  /** The destination's own Sketch scene, drawn bare on the tile's texture. */
  scene: SketchName;
  /**
   * Tracks the tile takes from 1024: 1 (default) or 2. A wide tile puts its drawing beside its words
   * and takes a size up for both. Each row of four tracks must fill exactly: 2 + 1 + 1, 1 + 1 + 2,
   * 1 + 1 + 1 + 1 or 2 + 2.
   */
  span?: 1 | 2;
};

export type BentoProps = {
  /** The tiles, in reading order. Built for six on two rows: two wide, four single. */
  items: readonly BentoItem[];
  /** The tiles' heading element. Default h3, under a band's h2. */
  titleAs?: 'h2' | 'h3';
  /**
   * Tracks from 1024. `4` (default): home's two sizes. `3`: a set of PEERS, every tile one size, three
   * a row (owner, 26 Oct 2026, the specialist services: "we can't weigh any 2 items heavier"); spans
   * are ignored.
   */
  tracks?: 3 | 4;
  /**
   * A TEXT CELL after the tiles: the band's closing words in the grid's own last row, where the tiles
   * leave a hole (owner, 29 Oct 2026, /services/product-design: seven services on four tracks, 4 + 3,
   * "the band's closing paragraph sits in the empty eighth cell"). Unframed, no texture, not a link:
   * it reads as the row's last word, never as an eighth destination. It takes every track the last
   * row leaves, or a whole row when the tiles fill theirs. Inline content the caller renders (its
   * links included).
   */
  note?: ReactNode;
};

type Placed = { item: BentoItem; row: number; col: number; span: 1 | 2 };

/** Each tile's row and first track on the grid, read from the spans in order. */
function place(items: readonly BentoItem[], TRACKS: 3 | 4): Placed[] {
  let row = 0;
  let col = 0;
  return items.map((item) => {
    const span = TRACKS === 3 ? 1 : (item.span ?? 1);
    if (col + span > TRACKS) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          `Bento: row ${row + 1} does not fill its ${TRACKS} tracks before "${item.title}".`,
        );
      }
      row += 1;
      col = 0;
    }
    const placed = { item, row, col, span };
    col += span;
    if (col === TRACKS) {
      row += 1;
      col = 0;
    }
    return placed;
  });
}

/**
 * Bento — a set of linked tiles of two sizes on four tracks, each its destination's name, one line
 * and its drawing (home "What we do", owner 19 Oct 2026, after Supabase's product grid). The sizes
 * carry the content's own weight: on home, Product Design is wide at the start because it is at the
 * heart of every project, and Software Development wide at the end. The whole set is always in view;
 * no tile hides behind a scroll or a tab.
 *
 * Every tile shows its hairline edge at rest, so its inset is honest (no ground exists only on
 * hover). Behind the drawings runs one continuous texture per row: the site's pixel grid seen
 * through a feathered wave drawn across the whole row (public/textures/bento-wave-*.svg) and
 * clipped by each tile, so the field reads as one while every seam stays a clean tile edge. Each
 * tile's window onto its row is set from its track (`data-col`), so the grid's cells line up from
 * tile to tile. Neutral at rest; on hover the tile's own texture turns blue, its hairline turns
 * light blue, it lifts and its title takes the accent.
 *
 * Tiles carry no icon: the drawing is the tile's visual, and a glyph above the title made two marks
 * compete in one tile (owner, 19 Oct 2026).
 */
export function Bento({ items, titleAs: Title = 'h3', tracks = 4, note }: BentoProps) {
  if (items.length === 0) return null;
  const placed = place(items, tracks);
  if (
    process.env.NODE_ENV !== 'production' &&
    items.some((item) => item.body) &&
    items.some((item) => !item.body)
  ) {
    console.warn('Bento: some tiles carry a body and some do not; give every tile one or none.');
  }
  /* The tracks the last row leaves open, which the text cell fills (a full row when none are). */
  const last = placed.at(-1);
  const used = last ? last.col + last.span : 0;
  const noteSpan = used === tracks ? tracks : tracks - used;

  return (
    <Layout
      as="ul"
      className={styles.set}
      data-tracks={tracks}
      columns={{ base: 1, md: 2, lg: tracks }}
      colGap="gutter"
      rowGap="gutter"
    >
      {placed.map(({ item, row, col, span }) => {
        const wide = span === 2;
        const words = (
          <Layout rowGap="tight">
            <Title className={styles.title}>{item.title}</Title>
            {item.body ? <p className={styles.body}>{item.body}</p> : null}
          </Layout>
        );
        const art = (
          <div className={styles.art}>
            <Sketch name={item.scene} frame="bare" story />
          </div>
        );
        return (
          <li
            key={item.id}
            className={cx(styles.cell, wide && styles.wide)}
            data-row={row % 2 === 0 ? 'a' : 'b'}
            data-col={col}
          >
            <a href={item.href} className={styles.tile}>
              {wide ? (
                <Layout
                  className={styles.fill}
                  columns={{ base: 1, md: [1, 1] }}
                  colGap="gutter"
                  rowGap="block"
                >
                  {words}
                  {art}
                </Layout>
              ) : (
                <Layout className={styles.fill} rowGap="block" pinLast>
                  {words}
                  {art}
                </Layout>
              )}
            </a>
          </li>
        );
      })}
      {note ? (
        <li className={styles.note} data-span={noteSpan}>
          <p className={styles.noteText}>{note}</p>
        </li>
      ) : null}
    </Layout>
  );
}
