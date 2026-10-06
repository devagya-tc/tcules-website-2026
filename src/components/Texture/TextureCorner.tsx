import { useId } from 'react';

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
   above the eyebrow — past a `stack`, never behind a glyph — at every width, which is why it is
   drawn at 390 too. Paper only, like every texture (§ 6.2); the band's slot enforces it. */

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

/* Column 0 is the END edge (the field is drawn from the right), row 0 the top edge. */
const FIELD: readonly Pixel[] = (() => {
  const next = seeded(11);
  const pixels: Pixel[] = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < COLUMNS; column += 1) {
      const across = 1 - column / COLUMNS;
      const down = 1 - row / ROWS;
      const density = Math.min(1, 1.15 * across * down);
      if (next() < density) pixels.push({ x: (COLUMNS - 1 - column) * PIXEL, y: row * PIXEL });
    }
  }
  return pixels;
})();

/**
 * TextureCorner — the `corner` placement as one named recipe, so no call site writes a number.
 * Rendered as a direct child of a paper Section, it fills the band's top-end corner.
 */
export function TextureCorner() {
  const tile = `tex-corner-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <div className={styles.corner}>
      <Texture>
        <defs>
          <pattern
            id={tile}
            width={COLUMNS * PIXEL}
            height={ROWS * PIXEL}
            patternUnits="userSpaceOnUse"
            /* Anchored to the box's end edge, so the dense column always sits on the band's edge
               whatever width the box resolves to. */
            x="100%"
          >
            {FIELD.map((pixel) => (
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
