import { useId } from 'react';

import { Texture } from './Texture';
import styles from './TextureHorizon.module.css';

/* ── The stepped `horizon` (visual-direction § 6.3, redrawn in cmp-services fix round 2) ──────────
   A PIXEL FIELD, not a haze. § 6.3's horizon is a blurred rect in the band's foot (bottom −200,
   110% × 260, blur 200; or bottom −80, 120% × 152, blur 24 below 1024). Both drew the grid through a
   soft gradient that started 16 to 20 under a card set's last line, and at the grid's fixed 21% the
   feathered edge read as a moiré or a gradient smear rather than as a placement — the same failure
   the counterweight and the closing equaliser were redrawn for.

   This one is QuantumLab's stepped field in Tcules' grid: four rows of 10px pixels (two grid pitches
   each, so every pixel holds whole cells of the grid) at the band's bottom edge, dithered from full
   at the foot to sparse at the top — 100%, 70%, 38%, 14% — so the paper reads as breaking up into the
   change of ground beneath it. Hard-edged pixels, because the silhouette is the craft; no blur.

   The dither is one fixed 640-wide tile (64 columns), generated once from a seeded sequence so every
   render and every band draws the same field, repeated across the band. 640 is wider than any
   stretch of it the eye compares at once, so the repeat does not read as a rhythm.

   Its box is the foot of its positioned ancestor, --tex-horizon-block-size (40) tall, so in a band's
   96 of foot padding it starts 56 under the last line of copy: past a `stack`, never behind a glyph.
   Paper only, like every texture (§ 6.2); the band's slot enforces it. */

const PIXEL = 10;
const COLUMNS = 64;
/** Fill density per row, from the foot up. */
const ROWS = [1, 0.7, 0.38, 0.14] as const;

/** A small seeded LCG: the same field every render, no Math.random in a server component. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

type Pixel = { x: number; y: number };

const FIELD: readonly Pixel[] = (() => {
  const next = seeded(7);
  const pixels: Pixel[] = [];
  ROWS.forEach((density, fromFoot) => {
    const y = (ROWS.length - 1 - fromFoot) * PIXEL;
    for (let column = 0; column < COLUMNS; column += 1) {
      if (next() < density) pixels.push({ x: column * PIXEL, y });
    }
  });
  return pixels;
})();

/**
 * TextureHorizon — the `horizon` placement as one named recipe, so no call site writes a number
 * (§ 6.3). Rendered into a paper band's texture slot (ContentSection `texture`) directly above a
 * change of ground, it fills the band's foot.
 */
export function TextureHorizon() {
  const tile = `tex-horizon-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <div className={styles.horizon}>
      <Texture>
        <defs>
          <pattern
            id={tile}
            width={COLUMNS * PIXEL}
            height={ROWS.length * PIXEL}
            patternUnits="userSpaceOnUse"
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
