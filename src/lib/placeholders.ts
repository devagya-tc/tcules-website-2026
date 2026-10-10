import { PLACEHOLDER_SLOTS } from './placeholders.generated';

/**
 * An image record for a slot the corpus does not yet bind (page-mapping § 5).
 *
 * The record is structurally a `MediaImage` (lib is a leaf and cannot name the primitive's type):
 * `kind: 'capture'` is what makes Media render it whole, with its hairline, at the ratio the SVG
 * reserves, in every slot that takes an image, and keeps it out of the photograph tone and
 * resolution gates. The panel is drawn by `scripts/placeholders.mjs` from `docs/image-register.md`,
 * so a slot with no register row has no panel — and asking for one is a build error, not a blank
 * box, which is what keeps the register honest about what the design needs.
 *
 * Keys are `<route>#<band>` (`/services/product-design#starting-points`), with `:<qualifier>` where
 * one band holds two slots (`/expertise/healthtech#proof:curamcare`), and `case-cover:<slug>` for a
 * case's cover (`placeholderCover('scissors')`).
 */
export type PlaceholderImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: 'capture';
};

function record(key: string): PlaceholderImage {
  const slot = PLACEHOLDER_SLOTS[key];
  if (!slot) {
    throw new Error(
      `No placeholder for "${key}". Add a row to docs/image-register.md and run \`npm run placeholders\`.`,
    );
  }
  return {
    src: slot.src,
    alt: `Image to come: ${slot.kind}`,
    width: slot.width,
    height: slot.height,
    kind: 'capture',
  };
}

/** A band's own slot. */
export function placeholderImage(
  route: string,
  band: string,
  qualifier?: string,
): PlaceholderImage {
  return record(`${route}#${band}${qualifier ? `:${qualifier}` : ''}`);
}

/** A case's cover placeholder, by the slug of the name the register uses. */
export function placeholderCover(slug: string): PlaceholderImage {
  return record(`case-cover:${slug}`);
}

/** Whether a slot has a register row (a page that can fall back to a bound asset asks first). */
export function hasPlaceholder(route: string, band: string, qualifier?: string): boolean {
  return `${route}#${band}${qualifier ? `:${qualifier}` : ''}` in PLACEHOLDER_SLOTS;
}
