/**
 * The kit photo registry: every photograph in `public/kit/photos/`, typed, with the rules that decide
 * where each may go (docs/kit/visual-direction.md § 5.3 to § 5.7).
 *
 *   getKitPhoto(id)          the image record a placement hands to Media — master, rungs, focal
 *                            point, tone tags, kind 'photograph', and `alt: ''` unless one is given
 *   cropScale(id, ratio, w)  how many times the placement's box the crop is (the § 5.4 rule)
 *   qualifies(id, placement) cropScale ≥ MIN_CROP_SCALE at the placement's 1470 box
 *   pickStandIn(...)         the first photo in a page's pool that fits a cover slot (§ 5.7)
 *
 * The data is GENERATED (`photo-catalogue.ts`, by `npm run photos:derive`) from the catalogue JSON,
 * and the tone tags in it are MEASURED (`npm run photos:tone`), never typed by hand. This file holds
 * no per-photo fact of its own.
 *
 * ── Who uses it ─────────────────────────────────────────────────────────────────
 * The kit showcase pages and the service-page stand-ins. Live routes read CMS images through
 * `@/content`; these are stock and studio photographs for internal review (owner, 5 Oct), and a
 * public route that uses one is § 10 item 3's decision, not a call site's.
 *
 * ── Alt ─────────────────────────────────────────────────────────────────────────
 * A kit photograph is an ATMOSPHERE photograph (ch05 § 7 as amended, visual-direction § 9): it sits in
 * a split, a banner, an offer, an aside or a card, it says nothing the copy does not, and it is
 * decorative — `alt=""`. Pass `alt` only where a person is named or the image carries content.
 *
 * A leaf: imports only the generated data beside it.
 */
import { PHOTO_CATALOGUE, type PhotoId } from './photo-catalogue';

export type { PhotoId };

export type PhotoTemperature = 'warm' | 'neutral' | 'cool';
export type PhotoSaturation = 'vivid' | 'quiet';
/** A page's photo family (§ 5.5 rule 1): neutral photographs belong to both. */
export type PhotoFamily = 'warm' | 'cool';

/** A focal point, each axis 0 to 1 from the top-left: where a crop is anchored (as object-position). */
export type PhotoFocus = { x: number; y: number };

/** A crop ratio, written as Media writes it: `'4/5'`, `'3/1'`. */
export type PhotoRatio = `${number}/${number}`;

/**
 * The record Media takes. Structurally Media's `MediaImage` with every optional field filled — a
 * leaf cannot import the type from `@/components`, and does not need to: TypeScript checks the
 * shape where it is passed.
 */
export type KitPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: 'photograph';
  focus: PhotoFocus;
  tone: { temperature: PhotoTemperature; saturation: PhotoSaturation };
  sources: { src: string; width: number }[];
  /** True when the photo stands in for a missing cover (§ 5.7). Never labelled on the page. */
  standIn?: true;
};

/**
 * Every derived rung's public path. `public/kit/photos/derived/<id>-<width>.webp`, written by
 * `photos:derive` for each of 1240, 652 and 320 narrower than the master (Media.md M2's ladder).
 */
const rungPath = (id: PhotoId, width: number) => `/kit/photos/derived/${id}-${width}.webp`;

/** Is this id in the registry? For values that arrive as strings (a CMS field, a query param). */
export function isPhotoId(value: string): value is PhotoId {
  return Object.hasOwn(PHOTO_CATALOGUE, value);
}

/** The photograph as an image record, ready for Media. */
export function getKitPhoto(
  id: PhotoId,
  options: { alt?: string; standIn?: boolean } = {},
): KitPhoto {
  const entry = PHOTO_CATALOGUE[id];
  return {
    src: entry.src,
    alt: options.alt ?? '',
    width: entry.width,
    height: entry.height,
    kind: 'photograph',
    focus: { x: entry.focus.x, y: entry.focus.y },
    tone: { temperature: entry.temperature, saturation: entry.saturation },
    sources: entry.derived.map((width) => ({ src: rungPath(id, width), width })),
    ...(options.standIn ? { standIn: true as const } : {}),
  };
}

/** Studio (our own, tcules.com/about) or stock. Studio photos make the best stand-ins (§ 5.7). */
export const isStudio = (id: PhotoId) => PHOTO_CATALOGUE[id].source === 'studio';

/** Does the photo belong to the page's family? Neutral belongs to both (§ 5.5 rule 1). */
export function inFamily(id: PhotoId, family: PhotoFamily): boolean {
  const { temperature } = PHOTO_CATALOGUE[id];
  return temperature === 'neutral' || temperature === family;
}

/* ── Resolution (§ 5.4) ───────────────────────────────────────────────────────── */

/**
 * The cropped source must be at least this many times the rendered box, on both axes. 2× less a 5%
 * tolerance, which admits exactly one photograph below 2× (`studio-sticky-board-ux` at 1.93× in a
 * 4:5 slot) and nothing under it.
 */
export const MIN_CROP_SCALE = 1.9;

const ratioValue = (ratio: PhotoRatio) => {
  const [w = 1, h = 1] = ratio.split('/').map(Number);
  return w / h;
};

/**
 * How many times the box the crop is. The crop is the largest region of the master at the box's
 * ratio; since crop and box share a ratio, one axis decides, and the inline one is used.
 */
export function cropScale(id: PhotoId, ratio: PhotoRatio, boxWidth: number): number {
  const { width, height } = PHOTO_CATALOGUE[id];
  const r = ratioValue(ratio);
  const cropWidth = width / height > r ? height * r : width;
  return cropWidth / boxWidth;
}

/**
 * Every card's crop box: BlockCard's --bcrd-media-ratio and ListCard's --lcrd-thumbnail-ratio, both
 * --ratio-cover, 3/2 (owner, 29 Sep), restated by hand because TypeScript cannot read a custom
 * property. A change there is a change here. One ratio for every card placement — set, pair,
 * horizontal and thumbnail — because that is the box the cards actually render.
 *
 * DRIFT, recorded 6 Oct 2026 (fdn-media fix round): visual-direction § 5.4's table gives card sets
 * of three or more 16:9 and the horizontal card 4:3. No card renders either; BlockCard has one ratio
 * for both orientations. Measuring against those would pass or fail a photo against a box nobody
 * draws, so the code follows the real box. If § 5.4's ratios are wanted, they are a BlockCard
 * change (a ratio per set size), and this constant follows it.
 */
export const CARD_RATIO: PhotoRatio = '3/2';

/**
 * The photo placements, as they render at 1470 (§ 5.4). The inline size is the content column's
 * arithmetic (1240, 32 gutters, 96 split seams), restated by hand like src/lib/image-sizes.ts. The
 * card placements take CARD_RATIO, the box they render, not § 5.4's 16:9 and 4:3 (see above).
 */
export const PHOTO_PLACEMENTS = {
  /** B, K and L-photo: the 4:5 media split's image track. */
  split: { ratio: '4/5', width: 477 },
  /** The photograph hero, beside the copy. */
  hero: { ratio: '5/4', width: 572 },
  /** I banner below its head, full column. */
  bannerBelow: { ratio: '3/1', width: 1240 },
  /** I banner beside its head. */
  bannerBeside: { ratio: '3/2', width: 667 },
  /** The head-track aside. */
  aside: { ratio: '3/2', width: 381 },
  /** A card in a set of three across. */
  card3: { ratio: CARD_RATIO, width: 392 },
  /** A card in a set of four across. */
  card4: { ratio: CARD_RATIO, width: 286 },
  /** A card in a pair. */
  cardPair: { ratio: CARD_RATIO, width: 365 },
  /** A horizontal card, the image half. */
  cardHorizontal: { ratio: CARD_RATIO, width: 604 },
  /** ListCard's thumbnail. */
  thumbnail: { ratio: CARD_RATIO, width: 160 },
  /** The featured testimonial portrait. */
  portrait: { ratio: '1/1', width: 477 },
  /** The compact proof portrait. */
  portraitCompact: { ratio: '1/1', width: 64 },
} as const satisfies Record<string, { ratio: PhotoRatio; width: number }>;

export type PhotoPlacement = keyof typeof PHOTO_PLACEMENTS;

/** Does the photo resolve at this placement (§ 5.4)? */
export function qualifies(id: PhotoId, placement: PhotoPlacement): boolean {
  const { ratio, width } = PHOTO_PLACEMENTS[placement];
  return cropScale(id, ratio, width) >= MIN_CROP_SCALE;
}

/* ── Stand-ins (§ 5.7) ────────────────────────────────────────────────────────── */

/**
 * The first photo in `pool` that is not yet `used` on the page, is in the page's family, is not
 * vivid (§ 5.6: a page spends its one vivid photo deliberately, never by default), and resolves in
 * the cover slot's box. `undefined` when none does: the card then renders without media, which is a
 * text card and never an empty frame.
 *
 * The pool is authored per page, in order of preference — studio first, because a studio photo shows
 * our own work. The family, the vivid rule and the resolution rule are checked here, so a pool entry
 * that breaks one is skipped rather than rendered.
 */
export function pickStandIn(
  pool: readonly PhotoId[],
  used: ReadonlySet<PhotoId>,
  family: PhotoFamily,
  slot: { ratio: PhotoRatio; width: number },
): PhotoId | undefined {
  return pool.find(
    (id) =>
      !used.has(id) &&
      inFamily(id, family) &&
      PHOTO_CATALOGUE[id].saturation === 'quiet' &&
      cropScale(id, slot.ratio, slot.width) >= MIN_CROP_SCALE,
  );
}
