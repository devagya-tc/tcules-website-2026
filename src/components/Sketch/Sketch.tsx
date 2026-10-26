import type { CSSProperties } from 'react';

import { cx } from '@/lib/cx';

import styles from './Sketch.module.css';
import { STILL } from './scenes';
import { STORY, STORY_DRAWN } from './stories';
import type { SketchName } from '@/lib/sketches';

/**
 * What a sketch shows (the names live in @/lib/sketches, with the route map). One scene per service,
 * each drawing only what the service's name says, in the flat-graphics grammar
 * (docs/research/flat-graphics-grammar.md): the dot field, quiet frames, one blue focal point.
 *   new-product            the product dashed, its first release built, the parts still to come
 *                          hatched, the launch lit
 *   product-design         a screen whose flow reaches a decision, both branches drawn out of it
 *   product-modernisation  a cluttered legacy screen rebuilt as the same screen, clean
 *   design-systems         a library of components, one of them placed into a screen
 *   ai-product-ux          a suggestion, and the person's cursor accepting it
 *   design-engineering     the design and its code side by side, one component shared
 *   software-development   three layers of a product, joined, the release lit
 * And the ARTICLE scenes, each drawn for one insight from its own argument, its cover until a real
 * one exists (owner, 13 Oct 2026; @/lib/sketches `ArticleSceneName`): code-review,
 * security-checklist, prototype-to-production.
 */
export type { SketchName };

export type SketchProps = {
  name: SketchName;
  /**
   * `plate` (default): the drawing on its 16:9 dot-field plate, filling its box's width.
   * `bare`: the drawing alone, cropped to its own drawn edge and set at its own size in drawing
   * units, for a parent that supplies the ground and the scale (Bento, owner 19 Oct 2026). Cropped
   * so its left edge is the drawing's, not the plate's margin: a bare scene set on a title's edge
   * starts exactly there. Its size is its width in drawing units times `--skt-scale` (default 1),
   * which the parent sets on an ancestor to scale it, per breakpoint if it needs to.
   */
  frame?: 'plate' | 'bare';
  /**
   * Let a scene with a STORY (./stories) move: the problem at rest and solved when the link it sits in
   * is hovered or focused (owner, 25 Oct 2026, home What we do). Bare frame only, because the moving
   * route assumes its scale. Without it, a story scene is drawn still, held solved, as every plate
   * draws it: a cover or a card image does not move (owner, 25 Oct 2026).
   */
  story?: boolean;
  /** A story drawing held in its solved state, for a specimen showing both. */
  end?: boolean;
};

const W = 320;
const H = 180;

/**
 * The still scenes' drawn edge in the 320 × 180 drawing, for the bare frame: the one shared area every
 * scene is centred in (round 3), halos included. A story scene's is in ./stories.
 */
const DRAWN: Partial<Record<SketchName, readonly [number, number, number, number]>> = {
  'new-product': [26, 26, 268, 128],
};

/**
 * Sketch — a small drawing on its plate (16:9, the photograph radius), a stand-in for an illustration
 * where a block needs a visual subject and no illustration exists (owner, 12 Oct 2026, the About
 * services selector: "some visual element with the text on the right side would be nice").
 * Decorative: `aria-hidden`, the words beside it carry the meaning. Strokes are non-scaling and come
 * in the grammar's two weights, 1 and 2, at every size (owner, 26 Oct 2026, S2). The dot field is the
 * plate's CSS background and the drawings use no ids, so any number can share a page.
 */
export function Sketch({ name, frame = 'plate', story = false, end = false }: SketchProps) {
  const bare = frame === 'bare';
  const storyDrawing = STORY[name];
  /* A story scene moves only where it is asked to, in the bare frame; anywhere else it is held solved. */
  const moving = storyDrawing !== undefined && story && bare;
  const Still = STILL[name];
  const [x, y, w, h] =
    (bare && (storyDrawing ? STORY_DRAWN[name] : DRAWN[name])) || ([0, 0, W, H] as const);
  return (
    <svg
      className={cx(
        styles.sketch,
        bare && styles.bare,
        storyDrawing !== undefined && !moving && styles.still,
        storyDrawing !== undefined && (end || !moving) && styles.end,
      )}
      viewBox={`${x} ${y} ${w} ${h}`}
      width={bare ? w : undefined}
      height={bare ? h : undefined}
      /* The bare drawing's width in drawing units, for its own stylesheet to scale (--skt-scale). */
      style={bare ? ({ '--skt-units': w } as CSSProperties) : undefined}
      focusable="false"
      aria-hidden="true"
    >
      {storyDrawing ?? (Still ? <Still /> : null)}
    </svg>
  );
}
