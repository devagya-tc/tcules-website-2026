import type { ComponentProps } from 'react';

import { Layout } from '@/components';

import {
  BlockCard,
  type BlockCardCue,
  type BlockCardImage,
  type BlockCardProps,
  type BlockCardRatio,
  type BlockCardSize,
  type BlockCardTitleElement,
  type BlockCardTracks,
} from './BlockCard';

/**
 * One card in a set: a BlockCard record with an `id` for its key, and WITHOUT the presentation
 * props. Orientation, image side, track count, type size, crop, index, cue and title element
 * describe a card's place among its siblings, which is exactly what the set knows and the card
 * does not — so the set decides them and a caller cannot contradict it one item at a time.
 */
export type BlockCardSetItem = Omit<
  BlockCardProps,
  'orientation' | 'imageSide' | 'tracks' | 'size' | 'ratio' | 'index' | 'cue' | 'titleAs'
> & {
  id: string;
};

/**
 * Whether the first item is featured.
 *
 *   auto  from FEATURED_FROM items the first card takes the horizontal row above its peers
 *         (ruling C3, 28 Sep 2026). The case-study index's shape, and the default.
 *   none  never. Every feature band passes it (visual-direction § 1.4 rule 4): a feature set is
 *         peers, and a featured row would make one option look recommended.
 */
export type BlockCardSetLead = 'auto' | 'none';

/** How many tracks the set reaches at its widest. See `peerGrid`. */
export type BlockCardSetAcross = 2 | 3 | 4;

export type BlockCardSetProps = {
  /** The cards, in order. Zero renders nothing — no empty list. */
  items: readonly BlockCardSetItem[];
  /** Whether the first item is featured. Default `auto`. See `BlockCardSetLead`. */
  lead?: BlockCardSetLead;
  /**
   * The widest track count, when the count alone would pick the wrong one: a set in a `beside`
   * body (763 wide) takes `2`, because four icon cards across 763 would be 167 each; a set of six
   * the caller wants as two rows of three takes `3`. Absent, the count decides (`peerGrid`).
   */
  across?: BlockCardSetAcross;
  /**
   * The peers' type step, when the caller knows better than the track width. Absent, the set
   * decides (`peerSize`): icon cards `sm`, text cards `md`, image cards by their track.
   */
  size?: BlockCardSize;
  /**
   * What a MIXED set — some items with a cover, some without — does about the missing ones
   * (visual-direction § 3.1: a set is all-image or all-text, never one with holes):
   *
   *   images  stand-in covers, taken in order, one per item that lacks one (§ 5.7). Each is
   *           marked `standIn` and never labelled on the page. Too few for the gap and the set
   *           falls back to text, because a set with one missing frame is the bug this prevents.
   *           A set with NO covers at all takes them too when the pool covers every item — the
   *           resources band (M) before real covers exist; with too short a pool it stays text.
   *   false   no stand-ins: every card drops its media and the set renders as C-text.
   *
   * Absent behaves as `false`. An all-image set ignores it. Icon cards are not missing a cover —
   * an item with an `icon` and no image is never given a stand-in.
   */
  standIns?: readonly BlockCardImage[] | false;
  /**
   * Number the cards `01`, `02` … above their titles, in blue mono — the text card's index
   * (§ 3.1: hairline, 24, then an index or an eyebrow). Default false.
   */
  numbered?: boolean;
  /** How every linked card says it navigates. Absent, each card's own default. See `BlockCardCue`. */
  cue?: BlockCardCue;
  /**
   * The cards' heading element. Default h3, under a band's h2. `h2` only where the set IS the
   * page's list directly under its h1 (the case-study index), so the outline does not skip h2.
   */
  titleAs?: BlockCardTitleElement;
};

/** From how many items the first one is featured (ruling C3, 28 Sep 2026), under `lead="auto"`. */
export const FEATURED_FROM = 4;

/** From how many tracks across the image cards step down to `sm` (visual-direction § 7.2). */
export const SMALL_FROM = 4;

type Columns = ComponentProps<typeof Layout>['columns'];

/**
 * The grid for the peers — the items the featured card leads, or the whole set when nothing is
 * featured. Every shape is one track below md (or a scroll row: see the component).
 *
 *   across 2   two from md. Pairs, and any set in a beside body.
 *   across 3   two from md, three from lg. A set of three, or five and more (rows of three).
 *   across 4   two from md, four from xl: 2×2 through 1439, one row at 1440 (spec § 17 Q4).
 *
 * By count when `across` is absent: 1–2 → 2, 4 → 4, otherwise 3.
 *
 * `tracks` is the widest count the shape reaches before xl, which is what the image `sizes` must
 * never under-fetch for; the four-across row at xl reads the two-track value and over-fetches.
 */
function peerGrid(
  count: number,
  across: BlockCardSetAcross | undefined,
): { columns: Columns; tracks: BlockCardTracks; widest: BlockCardSetAcross } {
  const widest = across ?? (count <= 2 ? 2 : count === 4 ? 4 : 3);
  if (widest === 2) return { columns: { base: 1, md: 2 }, tracks: 2, widest };
  if (widest === 4) return { columns: { base: 1, md: 2, xl: 4 }, tracks: 2, widest };
  return { columns: { base: 1, md: 2, lg: 3 }, tracks: 3, widest };
}

const hasCover = (item: BlockCardSetItem) => Boolean(item.media?.image.src.trim());

/**
 * The peers' type step (§ 7.2), decided by TRACK WIDTH, not by count (cmp-feature, 6 Oct 2026).
 *
 * The count used to decide it — four peers or more stepped to `sm` — which put six or eight image
 * cards in a 3-up grid (392 wide, or a Slider showing three) at h5, when § 1.4's Card-3, which
 * the band is budgeted on, is h4 at 392. A title's line length depends on the track it runs in, so
 * the step follows the track:
 *
 *   icon cards          sm   h5 + body-sm at any width: the icon is the head object (§ 1.4).
 *   text-only cards     md   h4 at any count: the title is the card's only object (§ 3.1).
 *   image, 4 across     sm   286 wide at 1470 — h4 there set five words a line.
 *   image, 2–3 across   md   365 to 392 (and a Slider of three), the Card-3 and Card-pair step.
 */
function peerSize(
  peers: readonly BlockCardSetItem[],
  widest: BlockCardSetAcross,
  covered: boolean,
): BlockCardSize {
  if (peers.length > 0 && peers.every((item) => !hasCover(item) && item.icon !== undefined)) {
    return 'sm';
  }
  if (!covered) return 'md';
  return widest >= SMALL_FROM ? 'sm' : 'md';
}

/**
 * Settle a mixed set before it renders (§ 3.1): fill every missing cover from the stand-ins, in
 * order, or — with no pool, or too short a one — drop every cover so the set is C-text.
 */
function settleMedia(
  items: readonly BlockCardSetItem[],
  standIns: readonly BlockCardImage[] | false | undefined,
): readonly BlockCardSetItem[] {
  const covered = items.filter(hasCover).length;
  if (covered === items.length) return items;
  if (items.every((item) => !hasCover(item) && item.icon !== undefined)) return items;

  const missing = items.length - covered;
  const pool = standIns === false || standIns === undefined ? [] : standIns;

  if (pool.length < missing) {
    return covered === 0 ? items : items.map((item) => ({ ...item, media: undefined }));
  }

  let next = 0;
  return items.map((item) => {
    if (hasCover(item)) return item;
    const image = pool[next++];
    return image ? { ...item, media: { type: 'image', image: { ...image, standIn: true } } } : item;
  });
}

/**
 * BlockCardSet — a set of BlockCards, and the one place that knows how many there are.
 *
 * A card does not know its siblings (spec § 10), so the rules that depend on the set live here:
 * the grid shape, the image `sizes` and crop (3:2 for one or two, 16:9 for three or more across,
 * § 1.4 rule 1), the type step, mixed-set handling, numbering, the phone scroll row, and — under
 * `lead="auto"` from four items (ruling C3) — the featured first card: horizontal, spanning the
 * row above its peers, media beside copy when it has a cover and head beside body when it does not.
 *
 * It is ONE list and ONE grid. The lead's span is Layout's `lead`, the container's statement about
 * its first child, so a screen reader hears "list, five items" rather than two lists, and the
 * peers' `equalRows` is not stretched to the featured row's height.
 *
 * On a phone a LINKED set of more than three scrolls sideways (§ 3.7 item 2: Layout
 * `scroll="until-md"`, one card per view with the next peeking): every card is then a link, so Tab
 * moves the row. An unlinked set stays stacked, because a scroll row of things nobody can focus
 * fails WCAG 2.1.1 — and so does an icon set of up to six, which is short enough stacked.
 *
 * A set of five or more IMAGE cards in a feature band is a Slider showing three (§ 1.4 rule 3). The
 * Slider is composed by the caller around BlockCards; this set never imports it, because a pattern
 * does not import a pattern.
 *
 * It lives beside BlockCard, in the same pattern folder, because it renders nothing but BlockCards
 * and a Layout: it is the pattern's own set, not a second pattern.
 */
export function BlockCardSet({
  items: given,
  lead = 'auto',
  across,
  size: sizeOverride,
  standIns,
  numbered = false,
  cue,
  titleAs,
}: BlockCardSetProps) {
  if (given.length === 0) return null;

  const items = settleMedia(given, standIns);
  const featured = lead === 'auto' && items.length >= FEATURED_FROM;
  const peers = featured ? items.slice(1) : items;
  const covered = items.some(hasCover);
  const { columns, tracks, widest } = peerGrid(peers.length, across);
  const size = sizeOverride ?? peerSize(peers, widest, covered);
  const ratio: BlockCardRatio = widest >= 3 ? 'wide' : 'cover';
  const linked = items.every((item) => Boolean(item.href?.trim()));
  const iconSet = !covered && items.every((item) => item.icon !== undefined);
  /* § 3.7 item 2: a linked set of more than three scrolls below 768; icon sets of up to six stay
     stacked (136 each, so six stacked is one phone screen, and a glyph row is not a gallery). */
  const scrolls = linked && items.length > 3 && !(iconSet && items.length <= 6);

  return (
    /* Rows sit a `column` apart, columns a `gutter` (29 Sep). The two seams separate different
       things: across a row the cards are peers read together, and down the grid each row is the
       next set of objects, which must read as separate — the `column` step's own job, turned to
       the block axis. At one shared 32 a borderless tile's copy ran into the image below it;
       `stack` (48) was tried and still read as one field. */
    <Layout
      as="ul"
      columns={columns}
      colGap="gutter"
      rowGap="column"
      equalRows
      lead={featured}
      scroll={scrolls ? 'until-md' : undefined}
    >
      {items.map(({ id, ...card }, index) => {
        const shared = { index: numbered ? index + 1 : undefined, cue, titleAs };
        return featured && index === 0 ? (
          <BlockCard
            key={id}
            {...card}
            {...shared}
            orientation="horizontal"
            imageSide="left"
            size="lg"
          />
        ) : (
          <BlockCard key={id} {...card} {...shared} tracks={tracks} size={size} ratio={ratio} />
        );
      })}
    </Layout>
  );
}
