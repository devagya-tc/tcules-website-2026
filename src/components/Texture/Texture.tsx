import { useId, type ReactNode } from 'react';

import { cx } from '@/lib/cx';
import grid from '@/styles/textures/pixel-grid.json';

import styles from './Texture.module.css';

/**
 * A length on the field: a number is px, a percentage is of the field — its width for left, right
 * and width, its height for top, bottom and height. Percentages keep a shape in place as the band
 * reflows; px keep its size fixed while it does.
 */
export type TextureLength = number | `${number}%`;

export type TextureProps = {
  /**
   * The shapes the grid shows through — `TextureShape`s. Where they are opaque the grid is at full
   * strength; where a blur feathers them, it fades. No shapes, no texture: the field is a mask.
   */
  children: ReactNode;
  className?: string;
};

/**
 * Placed like an absolutely positioned box: `left` or `right`, `top` or `bottom`, and a size. Give
 * NEITHER side on an axis and the shape is centred on it, which is the common case — a soft glow in
 * the middle of a band. Give both and `left` / `top` wins; a shape has a size, not two edges. Any
 * part of a shape may sit off the field — the band clips it, and its blur still bleeds in.
 */
export type TextureShapeProps = {
  top?: TextureLength;
  right?: TextureLength;
  bottom?: TextureLength;
  left?: TextureLength;
  width: TextureLength;
  height: TextureLength;
  /** `rect` (default) or `ellipse`, which fills the same box. */
  kind?: 'rect' | 'ellipse';
  /** Corner radius of a `rect`, in px. */
  radius?: number;
  /**
   * Feather, in FIGMA'S units — the number in a Layer blur's field, so a composition moves between
   * the file and the page without arithmetic. Rendered as a Gaussian of half that deviation, which
   * was fitted against the Figma render this texture was measured from. 0 or omitted is a hard edge.
   */
  blur?: number;
};

/* One id per render, safe inside url(#…). useId's own characters are not all valid there. */
const useSvgId = (prefix: string) => `${prefix}${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

/**
 * Texture — the pixel grid as a decorative field. Fills its nearest positioned ancestor edge to
 * edge (a Section is one, and isolates itself so the field sits between its ground and its
 * content), and shows the grid only through the shapes it is given: place a shape, blur it, and
 * the grid fades out with it. The workflow is the Figma one — shapes, then blur, then texture.
 *
 * The grid itself is never blurred, which is why this is SVG: a CSS filter would soften the
 * pattern along with the shape. The pattern's geometry is read from the spec the export script
 * reads, so the page and every exported asset are the same texture. Colour is --tex-ink, per
 * surface; strength is the spec's and is not a prop.
 *
 * Decorative only — hidden from assistive tech, and it takes no pointer events.
 */
export function Texture({ children, className }: TextureProps) {
  const pattern = useSvgId('tex-grid-');
  const mask = useSvgId('tex-mask-');

  return (
    <svg aria-hidden="true" focusable="false" className={cx(styles.texture, className)}>
      <defs>
        <pattern
          id={pattern}
          width={grid.pitch}
          height={grid.pitch}
          patternUnits="userSpaceOnUse"
        >
          {grid.cells.map((c) => (
            <rect
              key={c.y * grid.pitch + c.x}
              x={c.x}
              y={c.y}
              width={c.width}
              height={c.height}
              fillOpacity={c.alpha}
            />
          ))}
        </pattern>
        <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
          {children}
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pattern})`} mask={`url(#${mask})`} />
    </svg>
  );
}

const scale = (l: TextureLength, k: number): TextureLength =>
  typeof l === 'number' ? l * k : `${parseFloat(l) * k}%`;

/**
 * One axis of CSS-style placement, in the three terms SVG can take: which point of the field the
 * shape hangs from (0, 50 or 100%), how far from it, and how far back the shape's own origin sits
 * as a fraction of its size. `right: 24` on a 300-wide shape is: hang from 100%, move −24, and
 * start the box one full width back.
 */
function axis(start: TextureLength | undefined, end: TextureLength | undefined) {
  if (start !== undefined) return { anchor: '0%', offset: start, back: 0 };
  if (end !== undefined) return { anchor: '100%', offset: scale(end, -1), back: -1 };
  return { anchor: '50%', offset: 0, back: -0.5 };
}

/**
 * One shape in a Texture's mask. Only meaningful as a child of `Texture` — it renders SVG, and
 * outside a mask it would paint a white box.
 */
export function TextureShape({
  top,
  right,
  bottom,
  left,
  width,
  height,
  kind = 'rect',
  radius = 0,
  blur = 0,
}: TextureShapeProps) {
  const filter = useSvgId('tex-blur-');
  const h = axis(left, right);
  const v = axis(top, bottom);

  /* Two nested viewports, because an SVG attribute cannot say "100% − 24px": the outer one moves
     the origin to the anchor, the inner one by the offset, and each takes a percentage on its own.
     Neither declares a size, so both are the field's size and a percentage inside means the same
     thing at every depth. overflow is visible so the shape can extend back past the new origin. */
  const body =
    kind === 'ellipse' ? (
      <ellipse
        cx={scale(width, h.back + 0.5)}
        cy={scale(height, v.back + 0.5)}
        rx={scale(width, 0.5)}
        ry={scale(height, 0.5)}
        fill="white"
      />
    ) : (
      <rect
        x={scale(width, h.back)}
        y={scale(height, v.back)}
        width={width}
        height={height}
        rx={radius}
        fill="white"
      />
    );
  const shape = (
    <svg x={h.anchor} y={v.anchor} overflow="visible">
      <svg x={h.offset} y={v.offset} overflow="visible">
        {body}
      </svg>
    </svg>
  );

  if (!blur) return shape;

  /* The filter region is the whole field and then some, in user space: the default region is the
     shape's box plus 10%, which clips a large blur into a visible rectangle, and a region that
     stopped at the field's edge would thin a shape that is placed half off it. */
  return (
    <>
      <filter
        id={filter}
        filterUnits="userSpaceOnUse"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
      >
        <feGaussianBlur stdDeviation={blur / 2} />
      </filter>
      <g filter={`url(#${filter})`}>{shape}</g>
    </>
  );
}

/**
 * TextureCounterweight — the `counterweight` placement (visual-direction § 6.3), owned here so every
 * band that spends it reads one recipe rather than restating its numbers. The B media split's one
 * blue mass, in its copy column, opposite the photograph.
 *
 * A DEFINED FIELD, not a haze (final fix round, 6 Oct 2026). The first two drawings were blurred
 * ellipses in the band's bottom padding, bled off the viewport's side: at the grid's 21% peak a
 * feathered shape with no edge read as a moiré or a compression smear, ran past the content column
 * under empty space, and counterweighed nothing. This one is QuantumLab's pixel strip in Tcules'
 * grid — an in-flow block in the copy column, so its edges ARE the column's: hard at the inline
 * start, the inline end and the foot, where it sits on the photo's bottom edge, and feathered only
 * at the top, where it rises out of the copy's air. (Hard on all four sides was tried: a flat
 * rectangle of a grid this quiet read as an empty image slot.)
 *
 *   rect, left −25%, width 150%, top 35%, height 100%, blur 48
 *
 * The rect runs past the field on three sides, so the blur's falloff on those sides is outside the
 * field and clipped: the grid is at full strength to each edge. Its top edge is 35% down with a 24
 * deviation, so the field rises from clear to full strength over its upper half.
 * The field's height is --tex-counterweight-block-size; its width is the column it is placed in.
 * Its rule is still that it never sits behind a glyph: it is a block of its own, after the copy.
 */
export function TextureCounterweight() {
  return (
    <div className={styles.counterweight}>
      <Texture>
        <TextureShape left="-25%" width="150%" top="35%" height="100%" blur={48} />
      </Texture>
    </div>
  );
}

/**
 * TextureFrame — the `frame` placement (owner, 16 Oct 2026, the home enquiry close). One soft
 * rounded field on an island's ground, RIGHT BEHIND the form panel: it reaches about 40 past the
 * panel on every side, so the texture reads as the panel's own halo rather than as a region of the
 * island ("it feels harsh … right behind the form and smaller", owner, same day).
 *
 *   rect, right 8, width 56%, top 8, height 97%, radius 56, blur 40
 *
 * Fitted to the island close: the panel fills the end 7 of a [5, 7] split inside the island's 48
 * inset, so a field 40 larger than the panel on every side starts 8 in from the island's end and
 * top, and is about 56% of the island wide. From 1024 only: below it the form stacks under the words
 * and a field fitted to the end column would sit behind the heading. The width tracks the
 * split as it reflows. Soft, so it is drawn in --tex-ink-soft: a light blue on blue, a mid grey on
 * ink — white read harsh.
 *
 * Its rule is the others': never behind a glyph. The copy column is the island's other 5, outside
 * the field but for its feather.
 */
export function TextureFrame() {
  return (
    <Texture className={cx(styles.soft, styles.frame)}>
      <TextureShape right={8} width="56%" top={8} height="97%" radius={56} blur={40} />
    </Texture>
  );
}
