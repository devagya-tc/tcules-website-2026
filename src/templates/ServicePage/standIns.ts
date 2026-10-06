import {
  CARD_RATIO,
  cropScale,
  getKitPhoto,
  MIN_CROP_SCALE,
  pickStandIn,
  type PhotoId,
} from '@/lib/photos';
import type { ServiceStory, StoryBlock, StoryCase, StoryCover } from '@/lib/service-story';

/* ── Cover stand-ins (visual-direction § 5.7) ───────────────────────────────────
   Every card that cites a case or a resource carries an image, and a card with no cover takes a
   catalogue photograph in its place: an empty hairline frame is a bug, and a set that is half
   images and half text is not a set (§ 3.1). The page names a pool (`story.photos.standIns`); this
   walks the page in reading order and gives each coverless card the first pool photo that is unused
   on the page, in the page's family, quiet, and at least 1.9× the box it lands in.

   A card for which no pool photo qualifies keeps no cover and renders as a text card, with a
   development warning — never an empty frame. A real cover always wins: the listing's cover reaches
   a case before this runs, so a stand-in fills only what the CMS does not have. */

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
  const used = new Set<PhotoId>();

  const take = (label: string, width: number): StoryCover | undefined => {
    const id = pickStandIn(standIns, used, family, { ratio: CARD_RATIO, width });
    if (!id) {
      warn(
        `no stand-in in the ${story.slug} pool fits ${JSON.stringify(label)} at ${Math.round(width)}px; it renders as a text card.`,
      );
      return undefined;
    }
    used.add(id);
    return getKitPhoto(id, { standIn: true });
  };

  const coverCase = (item: StoryCase, width: number): StoryCase =>
    item.cover ? item : { ...item, cover: take(item.title, width) };

  const fill = (block: StoryBlock): StoryBlock => {
    switch (block.kind) {
      case 'cases':
        return {
          ...block,
          items: block.items.map((item, index) =>
            coverCase(item, caseWidth(block.items.length, index)),
          ),
        };
      case 'proof':
        return block.case ? { ...block, case: coverCase(block.case, CARD_WIDTH.proof) } : block;
      case 'resources':
        return {
          ...block,
          items: block.items.map((item) =>
            item.cover ? item : { ...item, cover: take(item.title, CARD_WIDTH.three) },
          ),
        };
      default:
        return block;
    }
  };

  /* Development check on the pool itself, so a pool entry that can never be used is visible as one
     rather than silently skipped: out of family, vivid, or too small even for the smallest card. */
  if (process.env.NODE_ENV !== 'production') {
    for (const id of standIns) {
      const photo = getKitPhoto(id);
      const reasons = [
        photo.tone.temperature !== 'neutral' && photo.tone.temperature !== family
          ? `${photo.tone.temperature} on a ${family} page`
          : '',
        photo.tone.saturation === 'vivid' ? 'vivid' : '',
        cropScale(id, CARD_RATIO, CARD_WIDTH.four) < MIN_CROP_SCALE
          ? 'under 1.9× even a four-across card'
          : '',
      ].filter(Boolean);
      if (reasons.length > 0)
        warn(
          `stand-in ${id} in the ${story.slug} pool is never usable: ${reasons.join(', ')}.`,
        );
    }
  }

  return {
    ...story,
    sections: story.sections.map((section) =>
      section.type === 'offer' ? section : { ...section, blocks: section.blocks.map(fill) },
    ),
  };
}
