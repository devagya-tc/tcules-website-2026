import { Layout, Sketch } from '@/components';
import { cx } from '@/lib/cx';
import type { SketchName } from '@/lib/sketches';

import styles from './Bento.module.css';

/** One tile: where it goes, what it is called, the line that says what it is, and its drawing. */
export type BentoItem = {
  id: string;
  /** The destination's name ("Product Design"). The tile's heading. */
  title: string;
  /** One or two lines on what it is. Plain text, about 60–90 characters: a tile is not a page. */
  body: string;
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
};

const TRACKS = 4;

type Placed = { item: BentoItem; row: number; col: number; span: 1 | 2 };

/** Each tile's row and first track on the four-track grid, read from the spans in order. */
function place(items: readonly BentoItem[]): Placed[] {
  let row = 0;
  let col = 0;
  return items.map((item) => {
    const span = item.span ?? 1;
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
export function Bento({ items, titleAs: Title = 'h3' }: BentoProps) {
  if (items.length === 0) return null;
  const placed = place(items);

  return (
    <Layout
      as="ul"
      className={styles.set}
      columns={{ base: 1, md: 2, lg: 4 }}
      colGap="gutter"
      rowGap="gutter"
    >
      {placed.map(({ item, row, col, span }) => {
        const wide = span === 2;
        const words = (
          <Layout rowGap="tight">
            <Title className={styles.title}>{item.title}</Title>
            <p className={styles.body}>{item.body}</p>
          </Layout>
        );
        const art = (
          <div className={styles.art}>
            <Sketch name={item.scene} frame="bare" weight="light" story />
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
    </Layout>
  );
}
