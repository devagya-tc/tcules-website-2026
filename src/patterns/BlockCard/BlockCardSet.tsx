import type { ComponentProps } from 'react';

import { Layout } from '@/components';

import { BlockCard, type BlockCardProps, type BlockCardTracks } from './BlockCard';

/**
 * One card in a set: a BlockCard record with an `id` for its key, and WITHOUT the three
 * presentation props. Orientation, image side and track count describe a card's place among its
 * siblings, which is exactly what the set knows and the card does not — so the set decides them
 * and a caller cannot contradict it one item at a time.
 */
export type BlockCardSetItem = Omit<BlockCardProps, 'orientation' | 'imageSide' | 'tracks'> & {
  id: string;
};

export type BlockCardSetProps = {
  /** The cards, in order. Zero renders nothing — no empty list. */
  items: readonly BlockCardSetItem[];
};

/**
 * From how many items the first one is featured (ruling C3, 28 Sep 2026). Not a CMS field and not
 * a prop: a featured card is the set's arrangement, not something an item says about itself.
 */
export const FEATURED_FROM = 4;

type Columns = ComponentProps<typeof Layout>['columns'];

/**
 * The grid for the peers — the items the featured card leads, or the whole set when nothing is
 * featured — by how many there are. Every shape collapses to one track below md.
 *
 *   1–2  two tracks from md. One card sits in half the row rather than stretching across it.
 *   3    two from md, three from lg.
 *   4    two from md, four from xl: 2×2 through 1439, one deliberate row at 1440 (spec § 17 Q4).
 *   5+   two from md, three from lg; a part-full last row is the honest answer to the count.
 *
 * `tracks` is the widest count that shape reaches before xl, which is what the image `sizes` must
 * never under-fetch for; the four-across row at xl reads the two-track value and over-fetches.
 */
function peerGrid(count: number): { columns: Columns; tracks: BlockCardTracks } {
  if (count <= 2) return { columns: { base: 1, md: 2 }, tracks: 2 };
  if (count === 4) return { columns: { base: 1, md: 2, xl: 4 }, tracks: 2 };
  return { columns: { base: 1, md: 2, lg: 3 }, tracks: 3 };
}

/**
 * BlockCardSet — a set of BlockCards, and the one place that knows how many there are.
 *
 * A card does not know its siblings (spec § 10), so the rules that depend on the count live here:
 * the grid shape, the image `sizes`, and whether the first item is featured. From four items it is
 * (ruling C3): the first card takes the horizontal arrangement and spans the row above its peers —
 * media beside copy when it has a cover, head beside body when it does not — and the rest fill the
 * grid below.
 *
 * It is ONE list and ONE grid. The lead's span is Layout's `lead`, the container's statement about
 * its first child, so a screen reader hears "list, five items" rather than two lists, and the
 * peers' `equalRows` is not stretched to the featured row's height.
 *
 * It lives beside BlockCard, in the same pattern folder, because it renders nothing but BlockCards
 * and a Layout: it is the pattern's own set, not a second pattern.
 */
export function BlockCardSet({ items }: BlockCardSetProps) {
  if (items.length === 0) return null;

  const featured = items.length >= FEATURED_FROM;
  const peers = featured ? items.slice(1) : items;
  const { columns, tracks } = peerGrid(peers.length);

  return (
    /* Rows sit a `stack` apart, columns a `gutter` (29 Sep). The two seams separate different
       things: across a row the cards are peers read together, and down the grid each row is the
       next set of objects. At one shared 32 a borderless tile's copy ran straight into the image
       below it, so the grid read as one field rather than as rows. */
    <Layout as="ul" columns={columns} colGap="gutter" rowGap="stack" equalRows lead={featured}>
      {items.map(({ id, ...card }, index) =>
        featured && index === 0 ? (
          <BlockCard key={id} {...card} orientation="horizontal" imageSide="left" />
        ) : (
          <BlockCard key={id} {...card} tracks={tracks} />
        ),
      )}
    </Layout>
  );
}
