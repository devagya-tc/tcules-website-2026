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

/** The register's fallback row, for a slot that has no row of its own yet. */
const UNREGISTERED = '/_unregistered#slot';

function record(key: string): PlaceholderImage {
  /* A slot with no register row takes the register's one FALLBACK row rather than crash the build:
     the 26 Oct 2026 copy added bands whose slots the register has not met yet. It warns in
     development, and each such slot still wants a row of its own. */
  const slot = PLACEHOLDER_SLOTS[key] ?? PLACEHOLDER_SLOTS[UNREGISTERED];
  if (!PLACEHOLDER_SLOTS[key] && process.env.NODE_ENV !== 'production') {
    console.warn(
      `No placeholder for "${key}": showing the fallback. Add a row to docs/image-register.md and run \`npm run placeholders\`.`,
    );
  }
  if (!slot) throw new Error(`The register has no fallback row (${UNREGISTERED}).`);
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

const slugOf = (text: string) =>
  text
    .toLowerCase()
    .replace(/[`']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * The labelled slot for a claim or reason whose isometric illustration is not drawn yet, keyed by its
 * title as authored (decisions/2026-10-30-undrawn-illustration-slot). A title with no row takes the
 * `illustration:pending` row, which draws the head alone, then the register's fallback; each warns in
 * development. The slug is scripts/placeholders.mjs's.
 */
export function placeholderIllustration(title: string): PlaceholderImage {
  const own = `illustration:${slugOf(title)}`;
  const key = own in PLACEHOLDER_SLOTS ? own : 'illustration:pending';
  if (key !== own && process.env.NODE_ENV !== 'production') {
    console.warn(
      `No illustration slot for "${title}": showing "${key}". Add a row to docs/image-register.md (page \`/_illustrations\`) to label it.`,
    );
  }
  return record(key);
}

/** Whether a slot has a register row (a page that can fall back to a bound asset asks first). */
export function hasPlaceholder(route: string, band: string, qualifier?: string): boolean {
  return `${route}#${band}${qualifier ? `:${qualifier}` : ''}` in PLACEHOLDER_SLOTS;
}
