import { useId } from 'react';

import { cx } from '@/lib/cx';

import { Texture } from './Texture';
import styles from './TextureCorner.module.css';

/* ── The `corner` mark (page-product-design fix round 2, 6 Oct 2026) ─────────────────────────────
   A PIXEL FIELD anchored in a band's top-end corner, for a band whose type is centred and leaves the
   corner as the only ground clear of it — the J statement. It replaces `head-half` there: § 6.3's
   head-half is a blurred rect (blur 160) and at the grid's fixed 21% it read at 1470 as a pale blue
   gradient smudge rather than as the Tcules field, its feather reached the sentence's first line,
   and below 1024 it was not drawn at all.

   This one is the horizon's stepped field turned into a corner: 10px pixels (two grid pitches, so
   every pixel holds whole cells of the grid), dense where the band's top and end edges meet and
   dithering out toward the content — the density falls with distance from the corner on both axes.
   Hard-edged pixels, no blur, because the silhouette is the craft (the counterweight's, the
   horizon's and the closing equaliser's lesson).

   Its box is --tex-corner-inline-size × --tex-corner-block-size at the positioned ancestor's
   top-end corner. In a band with `open` density (128 of top air) the box is 80 tall, so it ends 48
   above the eyebrow — past a `stack`, never behind a glyph. From 1024 only (page-showcase fix round
   2): below it the box was a stranded fragment between bands, and § 3.7 runs only `horizon` there.
   Paper only, like every texture (§ 6.2); the band's slot enforces it. */

const PIXEL = 10;
const COLUMNS = 28;
const ROWS = 8;

/** A small seeded LCG: the same field every render, no Math.random in a server component. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

type Pixel = { x: number; y: number };

/** Which corner of the band the field is anchored in. */
export type TextureCornerAt = 'top-end' | 'bottom-start';

/* Column 0 is the ANCHORED edge (the end edge for top-end, the start edge for bottom-start), row 0
   the anchored top or bottom edge. Drawn in field order, then placed into the corner it belongs to.

   `bottom-start` is the counterweight of a balanced pair (owner, 9 Oct 2026: "a matching cluster in
   the opposite corner, so the composition feels balanced — not a mirror copy"). Same pixel, same box,
   same falloff law — the density family — but its own seed and a steeper falloff along the edge
   (exponent 1.4 rather than 1), so it is a related, smaller-reading cluster rather than the top-end
   field flipped. A diagonal pair of equal masses would read as a frame; the lighter one lets the
   top-end corner stay the lead. */
function field(seed: number, along: number, at: TextureCornerAt): readonly Pixel[] {
  const next = seeded(seed);
  const pixels: Pixel[] = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < COLUMNS; column += 1) {
      const across = (1 - column / COLUMNS) ** along;
      const down = 1 - row / ROWS;
      const density = Math.min(1, 1.15 * across * down);
      if (next() >= density) continue;
      pixels.push(
        at === 'top-end'
          ? { x: (COLUMNS - 1 - column) * PIXEL, y: row * PIXEL }
          : { x: column * PIXEL, y: (ROWS - 1 - row) * PIXEL },
      );
    }
  }
  return pixels;
}

const FIELDS: Record<TextureCornerAt, readonly Pixel[]> = {
  'top-end': field(11, 1, 'top-end'),
  'bottom-start': field(29, 1.4, 'bottom-start'),
};

export type TextureCornerProps = {
  /**
   * The corner the field is anchored in. `top-end` (default) is the single corner mark;
   * `bottom-start` is only ever its partner in a balanced pair — on its own it reads as debris at
   * the band's foot rather than as a mark arriving from outside the band.
   */
  at?: TextureCornerAt;
};

/**
 * TextureCorner — the `corner` placement as one named recipe, so no call site writes a number.
 * Rendered as a direct child of a paper Section, it fills the band's top-end corner.
 */
export function TextureCorner({ at = 'top-end' }: TextureCornerProps) {
  const tile = `tex-corner-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <div className={cx(styles.corner, at === 'bottom-start' && styles.bottomStart)}>
      <Texture>
        <defs>
          <pattern
            id={tile}
            width={COLUMNS * PIXEL}
            height={ROWS * PIXEL}
            patternUnits="userSpaceOnUse"
            /* Anchored to the box's anchored edge, so the dense column always sits on the band's edge
               whatever width the box resolves to. */
            x={at === 'top-end' ? '100%' : '0'}
          >
            {FIELDS[at].map((pixel) => (
              <rect
                key={`${pixel.x}-${pixel.y}`}
                x={pixel.x}
                y={pixel.y}
                width={PIXEL}
                height={PIXEL}
                fill="white"
              />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${tile})`} />
      </Texture>
    </div>
  );
}
