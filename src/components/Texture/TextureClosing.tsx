import { useId } from 'react';

import { Texture, TextureShape } from './Texture';

import styles from './TextureClosing.module.css';

/**
 * Which edge the equaliser rises from. `start` / `end` for a close whose copy column is the field
 * (CtaSection `split` hands it a field under the copy's foot); `both` for a centred close, whose two
 * flanks are the only ground clear of text.
 */
export type TextureClosingSide = 'start' | 'end' | 'both';

export type TextureClosingProps = {
  /** Default `start` (visual-direction § 6.4: the service-page signature's `closing` is start side). */
  side?: TextureClosingSide;
};

/* ── The `closing` recipe (visual-direction § 6.3, redrawn in cmp-cta's final fix round) ──────────
   An EQUALISER, not a haze: the reference close (references.md, Quantum item 4) is a row of pixel
   columns that rise from the band's bottom edge to ~444 and fade as they rise. A blurred rect — § 6.3
   as first drawn, then a near-hard strip — has no silhouette, and at the texture's fixed 21% cell
   alpha a shape without a silhouette reads as a pale tinted band: the blue ground the owner banned.

   So the bars are HARD at the sides (the silhouette is the craft) and FADE UPWARD through one
   field-wide gradient (full strength to ~45% up, ~28% at the top), and each carries a one-row "peak hold" dash
   a pitch-and-a-half above it, the equaliser's own mark. Heights are irregular around a falling
   envelope, so the skyline rises at its edge and dies away before it reaches anything else.

   Every number is a FRACTION of the field the recipe is placed in, never a pixel, because the
   field is the caller's: under CtaSection's split copy column it is the column's width and whatever
   height sits clear under the copy; in the centred close it is the whole band. A fraction scales the
   same skyline into either without a breakpoint of its own.

   Below 1024 a single-edge close draws the same equaliser at half the columns (fix round 1: the
   band's foot is its field at every width, so it reads as § 3.7 rule 5's horizon there — a field
   on the band's bottom edge, full width). A centred close keeps § 6.3's horizon below 1024:
   rect, bottom −200, 110% × 260, blur 200. */

/** Bar heights for a single-edge field, edge first: ~22 columns falling from 0.86 to nothing. */
const FIELD_BARS = [
  0.86, 0.7, 0.8, 0.62, 0.72, 0.5, 0.6, 0.44, 0.52, 0.34, 0.42, 0.28, 0.34, 0.2, 0.25, 0.14,
  0.18, 0.1, 0.12, 0.06, 0.08, 0.04,
] as const;

/**
 * Bar heights for one flank of a centred band, outer edge first, as a fraction of the BAND: 12
 * columns over the outer 24% of its width, tallest (~0.58 — about 444 in a 760 close) at the edge
 * and under ~0.12 by the time they reach the centred column's track.
 */
const FLANK_BARS = [
  0.58, 0.47, 0.54, 0.4, 0.45, 0.31, 0.36, 0.22, 0.25, 0.14, 0.11, 0.07,
] as const;
const FLANK_SPAN = 0.24;

/** A bar's share of its pitch: the rest is the dark gap that makes the columns read as columns. */
const BAR_FILL = 0.64;

/** The peak-hold dash: one pitch of the grid tall, a pitch and a half above its bar (px). */
const PEAK_HEIGHT = 5;
const PEAK_LIFT = 12;

type Bar = { x: number; width: number; height: number };

function bars(heights: readonly number[], span: number, fromEnd: boolean): Bar[] {
  const pitch = span / heights.length;
  return heights.map((height, index) => {
    const x = index * pitch;
    const width = pitch * BAR_FILL;
    return { x: fromEnd ? 1 - x - width : x, width, height };
  });
}

/** The fade's strength at a height up the field — the gradient's three stops, linearly. */
const FADE = [
  [0, 1],
  [0.45, 0.82],
  [1, 0.28],
] as const;

function fadeAt(height: number): number {
  const [[a, oa], [b, ob], [c, oc]] = FADE;
  const t = Math.min(Math.max(height, a), c);
  return t <= b ? oa + ((ob - oa) * (t - a)) / (b - a) : ob + ((oc - ob) * (t - b)) / (c - b);
}

const pct = (fraction: number) => `${(fraction * 100).toFixed(3)}%`;

/**
 * TextureClosing — the L close's texture, as one named recipe so no call site writes a number
 * (§ 6.3). It fills its nearest positioned ancestor, like any Texture; WHERE that is belongs to the
 * band that places it (CtaSection's split close gives it a field under the copy column).
 */
export function TextureClosing({ side = 'start' }: TextureClosingProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  /* A single-edge close draws the equaliser at every width (page-product-design fix round 1, 7 Oct
     2026): the band's foot is its field from 390 up (CtaSection), and the blurred horizon that stood
     in below 1024 was all but invisible under the form. Below 1024 it draws every other column, so
     a bar keeps a width of whole grid cells in a 390 field. A centred close keeps § 6.3's horizon
     below 1024: its flanks are the band's outer quarters, and at 390 there are none. */
  if (side === 'both') {
    return (
      <>
        <Equaliser
          fade={`tex-closing-fade-${id}`}
          columns={[
            ...bars(FLANK_BARS, FLANK_SPAN, false),
            ...bars(FLANK_BARS, FLANK_SPAN, true),
          ]}
          className={styles.wide}
        />
        <Texture className={styles.narrow}>
          <TextureShape bottom={-200} width="110%" height={260} blur={200} />
        </Texture>
      </>
    );
  }
  const fromEnd = side === 'end';
  return (
    <>
      <Equaliser
        fade={`tex-closing-fade-${id}`}
        columns={bars(FIELD_BARS, 1, fromEnd)}
        className={styles.wide}
      />
      <Equaliser
        fade={`tex-closing-fade-narrow-${id}`}
        columns={bars(
          FIELD_BARS.filter((_, index) => index % 2 === 0),
          1,
          fromEnd,
        )}
        className={styles.narrow}
      />
    </>
  );
}

/** The equaliser's columns on the grid: hard-sided bars under one upward fade, each with its peak. */
function Equaliser({
  fade,
  columns,
  className,
}: {
  fade: string;
  columns: readonly Bar[];
  className?: string;
}) {
  return (
    <Texture className={className}>
      <defs>
        {/* userSpaceOnUse, so the fade is the FIELD's: a tall column fades further than a short
            one, which is what makes the skyline rise rather than sit as a row of equal blocks. */}
        <linearGradient id={fade} gradientUnits="userSpaceOnUse" x1="0" y1="100%" x2="0" y2="0">
          {FADE.map(([offset, opacity]) => (
            <stop key={offset} offset={offset} stopColor="white" stopOpacity={opacity} />
          ))}
        </linearGradient>
      </defs>
      {columns.map((bar, index) => (
        <g key={index}>
          <rect
            x={pct(bar.x)}
            y={pct(1 - bar.height)}
            width={pct(bar.width)}
            height={pct(bar.height)}
            fill={`url(#${fade})`}
          />
          {/* The peak dash sits a fixed distance above a fractional top, which one SVG attribute
              cannot say, so a nested viewport moves the origin to the bar's top first. Its
              strength is the fade's at that height, solid, because a gradient in user space
              would restart inside the nested viewport. */}
          <svg x={pct(bar.x)} y={pct(1 - bar.height)} overflow="visible">
            <rect
              y={-PEAK_LIFT - PEAK_HEIGHT}
              width={pct(bar.width)}
              height={PEAK_HEIGHT}
              fill="white"
              fillOpacity={fadeAt(bar.height)}
            />
          </svg>
        </g>
      ))}
    </Texture>
  );
}
