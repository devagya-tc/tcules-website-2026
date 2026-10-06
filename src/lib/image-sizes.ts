/**
 * The `sizes` media list for every image placement on the site — derived once, here, rather than
 * written out at each call site (docs/specs/Media.md § 9).
 *
 * `Media` requires `sizes` because only the placement knows how wide it renders, and a missing one
 * makes the browser assume 100vw. But the placements are few and their widths all follow from the
 * same three facts, so the arithmetic lives in one leaf and each pattern imports its answer.
 *
 * ── The three facts, and the tokens they restate ─────────────────────────────────
 * TypeScript cannot read a custom property, so each number below RESTATES a token by hand. A change
 * to any of these tokens is a change to this file in the same edit, and nothing checks that for you.
 *
 *   CONTAINER  1240   --sec-container (tokens/components/section.css) — Section's content column
 *   GUTTER       32   --sec-gutter → --gap-gutter — Section's inline padding, each side
 *   the gaps          --gap-gutter 32 between cards in a set, --gap-column 64 between two halves
 *                     that must read as separate (tokens/primitives.css, the gap scale)
 *   breakpoints       768 and 1024, Layout's `md` and `lg` (Layout.module.css)
 *
 * Section's column is therefore `min(100vw − 64px, 1240px)`, and the cap is reached at
 * 1240 + 2 × 32 = 1304px. Every value below is that column, less the placement's own gaps, divided
 * by its tracks — with the 1304 term stated as a pixel width so a wide window never over-asks.
 *
 * ── Who uses what ─────────────────────────────────────────────────────────────────
 * PageHero reads FULL_COLUMN (stacked) and HERO_BESIDE (beside); Proof reads PROOF_PORTRAIT;
 * ContentSection reads MEDIA_SPLIT (`media`), and a head-track aside is placed at HEAD_TRACK.
 * Figure, BlockCard, ListCard and the SiteNav rail card move onto these as each migrates onto Media (their own PRs); until then
 * they state their own, and the values here are the ones they should converge on.
 *
 * A leaf: imports nothing.
 */

/** The unit, as a number, so the derivations below read as arithmetic rather than as strings. */
const CONTAINER = 1240; // --sec-container
const GUTTER = 32; // --sec-gutter, --gap-gutter
const SPLIT_GAP = 96; // --gap-section, the split seam (CLAUDE.md § gap scale, rule 2)
const CAP = CONTAINER + 2 * GUTTER; // 1304: the width at which the column stops growing

/** The column below the cap, as a CSS length: the viewport less both gutters. */
const FLUID_COLUMN = `calc(100vw - ${2 * GUTTER}px)`;

/**
 * The full content column: Figure, and PageHero's stacked arrangement (media below the copy).
 * 1240 at the cap; the viewport less 64 below it — 326 at a 390 phone.
 */
export const FULL_COLUMN = `(min-width: ${CAP}px) ${CONTAINER}px, ${FLUID_COLUMN}`;

/**
 * PageHero `beside`: two equal tracks from 1024 (ruling H2), `colGap="section"` 96 between them.
 * (1240 − 96) / 2 = 572 at the cap; (100vw − 64 − 96) / 2 = 50vw − 80 from 1024; below 1024 the
 * arrangement stacks and the media takes the full column.
 */
export const HERO_BESIDE =
  `(min-width: ${CAP}px) ${(CONTAINER - SPLIT_GAP) / 2}px, ` +
  `(min-width: 1024px) calc(50vw - ${GUTTER + SPLIT_GAP / 2}px), ${FLUID_COLUMN}`;

/**
 * ContentSection `media` (the B media split): the photograph's track, 5 of [5, 7] from 1024 with the
 * 96 split seam between the tracks (fdn-section-head). (1240 − 96) × 5 / 12 ≈ 477 at the cap;
 * (100vw − 64 − 96) × 5 / 12 from 1024; below it the photo sits above the copy at the full column.
 */
export const MEDIA_SPLIT =
  `(min-width: ${CAP}px) ${Math.round(((CONTAINER - SPLIT_GAP) * 5) / 12)}px, ` +
  `(min-width: 1024px) calc((100vw - ${2 * GUTTER + SPLIT_GAP}px) * 5 / 12), ${FLUID_COLUMN}`;

/**
 * CtaSection's landscape K offer (cmp-cta): the photograph's track, 7 of [5, 7] from 1024 with the
 * 96 split seam — MEDIA_SPLIT's mirror. (1240 − 96) × 7 / 12 ≈ 667 at the cap; below 1024 the photo
 * sits under the copy at the full column.
 */
export const MEDIA_SPLIT_WIDE =
  `(min-width: ${CAP}px) ${Math.round(((CONTAINER - SPLIT_GAP) * 7) / 12)}px, ` +
  `(min-width: 1024px) calc((100vw - ${2 * GUTTER + SPLIT_GAP}px) * 7 / 12), ${FLUID_COLUMN}`;

/**
 * ContentSection `beside`: the head track, 1 of [1, 2] from 1024 with the 96 split seam — where a
 * head-track aside photograph sits (visual-direction § 1.4, 3:2 at 381). (1240 − 96) / 3 ≈ 381 at the
 * cap; (100vw − 64 − 96) / 3 from 1024; below it the aside takes the full column between the head and
 * the body.
 */
export const HEAD_TRACK =
  `(min-width: ${CAP}px) ${Math.round((CONTAINER - SPLIT_GAP) / 3)}px, ` +
  `(min-width: 1024px) calc((100vw - ${2 * GUTTER + SPLIT_GAP}px) / 3), ${FLUID_COLUMN}`;

/**
 * A card in two equal tracks from 768 (`md`), `colGap="gutter"` 32.
 * (1240 − 32) / 2 = 604 at the cap; (100vw − 64 − 32) / 2 = 50vw − 48 from 768.
 */
export const CARD_TWO_TRACKS =
  `(min-width: ${CAP}px) ${(CONTAINER - GUTTER) / 2}px, ` +
  `(min-width: 768px) calc(50vw - ${GUTTER + GUTTER / 2}px), ${FLUID_COLUMN}`;

/**
 * A card in three equal tracks from 1024 (`lg`), `colGap="gutter"` 32, and ONE track below it.
 * (1240 − 64) / 3 = 392 at the cap; (100vw − 64 − 64) / 3 from 1024.
 *
 * A set that goes to two tracks at `md` first should add CARD_TWO_TRACKS's middle term; this value
 * then over-fetches between 768 and 1023, and never under-fetches, which is the safe direction.
 */
export const CARD_THREE_TRACKS =
  `(min-width: ${CAP}px) ${(CONTAINER - 2 * GUTTER) / 3}px, ` +
  `(min-width: 1024px) calc((100vw - ${2 * GUTTER + 2 * GUTTER}px) / 3), ${FLUID_COLUMN}`;

/**
 * ListCard's thumbnail: a fixed 160 box at every width — --lcrd-thumbnail-inline-md
 * (tokens/components/list-card.css). A 2× screen asks for 320, which is the ladder's smallest rung.
 */
export const LIST_CARD_THUMBNAIL = '160px';

/**
 * Proof's quote portrait: a fixed 64 square at every width — --proof-portrait-size
 * (tokens/components/proof.css). Ruling P1 makes it small and beside the name, so it never takes a
 * track's width. A 2× screen asks for 128 and a 3× for 192, both served by the ladder's smallest
 * rung, 320 (M2) — so a portrait is always the 320 derivative, never the master.
 */
export const PROOF_PORTRAIT = '64px';

/**
 * The SiteNav rail card: about 300 beside the rail from 1024, the sheet's column below it.
 * PROVISIONAL — the rail card's width is the rail's, and SiteNav confirms this when it moves onto
 * Media. The fluid term is the full column, so the sheet can over-fetch and never under-fetch.
 */
export const NAV_CARD = `(min-width: 1024px) 300px, ${FLUID_COLUMN}`;

/**
 * A placement's `sizes`, re-stated for a COVER CROP (cmp-cta final fix round, 6 Oct 2026).
 *
 * The browser picks a srcset candidate by WIDTH alone. Under `fit="fill"` the frame is cropped from
 * the master, so when the master is wider in ratio than the frame — a 3:2 landscape in a 4:5 portrait
 * box — the image is drawn at the frame's HEIGHT and its width overflows: a 477 × 596 frame needs a
 * 894-wide image, not a 477-wide one. Asked for 477, the browser fetched the 652 or 1240 rung and
 * upscaled it ~1.4–1.7× into the frame, and the K offer's photographs went soft.
 *
 * So each entry's width is multiplied by `source / frame` (both width ÷ height) wherever that is
 * above 1; a master no wider in ratio than its frame is untouched. `frames` gives one ratio per
 * entry of `sizes`, in order, and the last repeats — the frame can change shape at a breakpoint
 * (the K frame is 4:5 beside the copy, taller where the copy stretches it, 4:3 under it). Over-asking
 * by a rung costs bytes; under-asking costs the picture, so a stretched frame states its tallest.
 */
export function coverSizes(sizes: string, source: number, frames: readonly number[]): string {
  return sizes
    .split(/,\s*/)
    .map((entry, index) => {
      const frame = frames[Math.min(index, frames.length - 1)] ?? source;
      const scale = source / frame;
      if (!(scale > 1)) return entry;
      const match = /^(\([^)]*\)\s+)?(.+)$/.exec(entry.trim());
      const condition = match?.[1] ?? '';
      const length = match?.[2] ?? entry;
      const inner = length.startsWith('calc(') ? length.slice(5, -1) : length;
      return `${condition}calc((${inner}) * ${scale.toFixed(3)})`;
    })
    .join(', ');
}
