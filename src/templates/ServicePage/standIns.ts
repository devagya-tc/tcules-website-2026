import {
  CARD_RATIO,
  cropScale,
  getKitPhoto,
  MIN_CROP_SCALE,
  pickStandIn,
  slotPhotos,
  standInBarriers,
  type PhotoId,
} from '@/lib/photos';
import type { ServiceStory, StoryBlock, StoryCase, StoryCover } from '@/lib/service-story';

/* ── Cover stand-ins (visual-direction § 5.7) ───────────────────────────────────
   Every card that cites a case or a resource carries an image, and a card with no cover takes a
   catalogue photograph in its place: an empty hairline frame is a bug. The page names a pool
   (`story.photos.standIns`); this walks the page in reading order and gives each coverless card the
   first pool photo that is unused on the page, not reserved for any page's § 5.6 slot, in the page's
   family, quiet, and at least 1.9× the box it lands in (`pickStandIn`).

   `used` starts with the page's OWN § 5.6 slot photos, and `pickStandIn` refuses every other page's
   stock slot photos (RESERVED_STOCK), so no photo appears twice on a page and no B, I, K or aside
   stock photo appears on a second page (§ 5.1 rule 4). Neither depends on the pool being authored
   right: a pool entry that breaks a rule is skipped, and named in a development warning.

   A set is all-image or all-text (§ 3.1). When the pool cannot fill every coverless card in a set,
   the set takes none of them — its photos go back to the pool — and every card in it drops its
   media, so it renders as text cards with their named cta rather than half a set of images. A real
   cover always wins: the listing's cover reaches a case before this runs, so a stand-in fills only
   what the CMS does not have. */

/* The card image's ratio is CARD_RATIO from src/lib/photos.ts — BlockCard's real crop box, 3/2 — the
   same answer PHOTO_PLACEMENTS' card placements measure against, so there is one in the codebase. */

/**
 * The inline size each cover renders at at 1470, from the content column (1240), the card gutter
 * (32), the horizontal card's column seam (64) and the split seam (96) — the arithmetic of
 * src/lib/image-sizes.ts, restated for the layouts below.
 */
const CARD_WIDTH = {
  /** A set of one or two: two tracks. */
  pair: (1240 - 32) / 2,
  /** A set of three, the Resources grid, a set of five or more peers: three tracks. */
  three: (1240 - 2 * 32) / 3,
  /** Four peers under a featured card: four tracks at xl. */
  four: (1240 - 3 * 32) / 4,
  /** The featured card's image half. */
  featured: (1240 - 64) / 2,
  /** Proof's case card, the narrow track of [1, 2] across the split seam. */
  proof: (1240 - 96) / 3,
};

/** Where card `index` of a BlockCardSet of `count` lands, mirroring BlockCardSet's own rules. */
function caseWidth(count: number, index: number): number {
  if (count >= 4) {
    if (index === 0) return CARD_WIDTH.featured;
    return count - 1 === 4 ? CARD_WIDTH.four : CARD_WIDTH.three;
  }
  return count <= 2 ? CARD_WIDTH.pair : CARD_WIDTH.three;
}

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`ServicePage: ${message}`);
}

/**
 * The story with every coverless case and resource given a stand-in. Pure: the same story always
 * gets the same photos, so a page does not reshuffle between renders.
 */
export function withStandIns(story: ServiceStory): ServiceStory {
  const { family, standIns } = story.photos;
  const used = new Set<PhotoId>(slotPhotos(story.slug));

  /* One stand-in per gap, or none at all: `widths` is the box of each coverless card in one set.
     The picks are committed to `used` only when every gap is filled. */
  const takeAll = (label: string, widths: readonly number[]): StoryCover[] | undefined => {
    const picked: PhotoId[] = [];
    for (const width of widths) {
      const id = pickStandIn(standIns, new Set([...used, ...picked]), family, {
        ratio: CARD_RATIO,
        width,
      });
      if (!id) {
        warn(
          `the ${story.slug} pool cannot cover every card in ${label} (none left for a ${Math.round(width)}px box); the set renders as text cards.`,
        );
        return undefined;
      }
      picked.push(id);
    }
    for (const id of picked) used.add(id);
    return picked.map((id) => getKitPhoto(id, { standIn: true }));
  };

  /* Covers a set: `width(index)` is where card `index` lands. A set that cannot be covered whole
     drops every cover, real ones included, because a set is all-image or all-text. */
  const coverSet = <T extends { title: string; cover?: StoryCover }>(
    label: string,
    items: readonly T[],
    width: (index: number) => number,
  ): T[] => {
    const gaps = items.flatMap((item, index) => (item.cover ? [] : [index]));
    if (gaps.length === 0) return [...items];
    const covers = takeAll(label, gaps.map(width));
    if (!covers) return items.map((item) => ({ ...item, cover: undefined }));
    const byIndex = new Map(gaps.map((index, n) => [index, covers[n]]));
    return items.map((item, index) =>
      byIndex.has(index) ? { ...item, cover: byIndex.get(index) } : item,
    );
  };

  const fill = (block: StoryBlock): StoryBlock => {
    switch (block.kind) {
      case 'cases':
        return {
          ...block,
          items: coverSet('a case set', block.items, (index) =>
            caseWidth(block.items.length, index),
          ),
        };
      case 'proof': {
        if (!block.case) return block;
        const [item] = coverSet<StoryCase>('the proof case', [block.case], () => CARD_WIDTH.proof);
        return { ...block, case: item };
      }
      case 'resources':
        return {
          ...block,
          items: coverSet('the resources set', block.items, () => CARD_WIDTH.three),
        };
      default:
        return block;
    }
  };

  /* Development check on the pool itself, so a pool entry that can never be used is visible as one
     rather than silently skipped: reserved for a § 5.6 slot, one of this page's own slot photos, out
     of family, vivid, or too small even for the smallest card. */
  if (process.env.NODE_ENV !== 'production') {
    const own = slotPhotos(story.slug);
    for (const id of standIns) {
      const reasons = [
        ...standInBarriers(id, family),
        own.has(id) ? "one of this page's own slot photos" : '',
        cropScale(id, CARD_RATIO, CARD_WIDTH.four) < MIN_CROP_SCALE
          ? 'under 1.9× even a four-across card'
          : '',
      ].filter(Boolean);
      if (reasons.length > 0)
        warn(`stand-in ${id} in the ${story.slug} pool is never usable: ${reasons.join(', ')}.`);
    }
  }

  return {
    ...story,
    sections: story.sections.map((section) =>
      section.type === 'offer' ? section : { ...section, blocks: section.blocks.map(fill) },
    ),
  };
}
