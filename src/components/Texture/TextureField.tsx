import { useId } from 'react';

import { Texture } from './Texture';

/* ── The `field` mark (page-showcase fix round 1, 7 Oct 2026) ────────────────────────────────────
   A PIXEL FIELD that frames a clearing, for the no-media hero: Quantum's hero art in Tcules' grid
   (references.md, Quantum item 6 — "the type sits in a clearing the imagery leaves for it"). It
   replaces the three-step staircase the hero carried, which at the grid's fixed 21% read as a pale
   placeholder slab, and was the same silhouette as the photograph hero's foot.

   10px pixels (two grid pitches, so every pixel holds whole cells), hard-edged, drawn from the
   field's END-BOTTOM corner: a solid mass on the end edge that rises the full height, dithering out
   toward the start, and a floor along the bottom that runs under the clearing and dies away before
   the start edge. The copy beside it stands in the empty top-start of the box. The density is a
   function of the distance from the end edge and from the floor, sampled by a seeded LCG, so the
   field is the same on every render and on the server.

   It fills its nearest positioned ancestor, like Texture. The caller places it — PageHero puts it
   in the no-media hero's end track. Paper only, like every texture (§ 6.2); the slot enforces it. */

const PIXEL = 10;
const COLUMNS = 56;
const ROWS = 80;

/** A small seeded LCG: the same field every render, no Math.random in a server component. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const clamp = (v: number) => Math.min(1, Math.max(0, v));

type Pixel = { x: number; y: number };

/* Column 0 is the END edge, row 0 the BOTTOM edge. The tile is drawn from its top-left, so a pixel
   at (column, row) sits at x = (COLUMNS − 1 − column), y = (ROWS − 1 − row). */
const FIELD: readonly Pixel[] = (() => {
  const next = seeded(23);
  const pixels: Pixel[] = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < COLUMNS; column += 1) {
      /* The mass: solid for the first 14 columns (140px) from the end, thinning to nothing by 42. Its
         top edge falls toward the start, so the clearing opens upward as well as inward. */
      const across = clamp(1 - (column - 14) / 28);
      const ceiling = ROWS * (1 - 0.55 * (column / COLUMNS));
      const height = clamp((ceiling - row) / 10);
      const mass = across ** 1.4 * height;
      /* The floor: seven rows (70px), dense at the end, running under the clearing to fade out. */
      const floor = clamp(1 - row / 7) * clamp(1.2 - column / COLUMNS);
      const density = Math.max(mass, floor);
      if (next() < density) {
        pixels.push({ x: (COLUMNS - 1 - column) * PIXEL, y: (ROWS - 1 - row) * PIXEL });
      }
    }
  }
  return pixels;
})();

/**
 * TextureField — the no-media hero's `field` as one named recipe, so no call site writes a number.
 * Fills its positioned ancestor, anchored to its end-bottom corner.
 */
export function TextureField() {
  const tile = `tex-field-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <Texture>
      <defs>
        <pattern
          id={tile}
          width={COLUMNS * PIXEL}
          height={ROWS * PIXEL}
          patternUnits="userSpaceOnUse"
          /* Anchored to the box's end and bottom edges, so the dense corner always sits on them
             whatever size the box resolves to; the sparse start and top are what a smaller box
             clips. */
          x="100%"
          y="100%"
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
  );
}
