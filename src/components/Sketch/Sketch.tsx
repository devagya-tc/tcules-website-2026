import styles from './Sketch.module.css';
import type { SketchName } from '@/lib/sketches';

/**
 * What a sketch shows (the names live in @/lib/sketches, with the route map). One scene per service,
 * each drawing only what the service's name says, in the kit's plate language (EngagementOptions,
 * TracePlates): the dot field, quiet frames, one blue subject.
 *   new-product            the whole product dashed, its first release built solid, the launch lit
 *   product-design         a screen whose one flow is drawn through it, the decision point lit
 *   product-modernisation  a cluttered legacy screen becoming the same screen, clean
 *   design-systems         a set of components, one of them placed into a screen
 *   ai-product-ux          a suggestion card with the person's accept, the AI's sparkle beside it
 *   design-engineering     the design and its code side by side, one component shared
 *   software-development   three layers of a product, joined, the release lit
 */
export type { SketchName };

export type SketchProps = {
  name: SketchName;
};

const W = 320;
const H = 180;

/**
 * Sketch — a small drawing on its plate (16:9, the photograph radius), a stand-in for an illustration
 * where a block needs a visual subject and no illustration exists (owner, 12 Oct 2026, the About
 * services selector: "some visual element with the text on the right side would be nice").
 * Decorative: `aria-hidden`, the words beside it carry the meaning. Strokes are non-scaling. The dot
 * field is the plate's CSS background, so a sketch carries no id and any number can share a page.
 */
export function Sketch({ name }: SketchProps) {
  return (
    <svg
      className={styles.sketch}
      viewBox={`0 0 ${W} ${H}`}
      focusable="false"
      aria-hidden="true"
    >
      {name === 'new-product' ? (
        <>
          <rect className={styles.trailFrame} x="50" y="30" width="220" height="120" rx="8" />
          <rect className={styles.region} x="70" y="50" width="96" height="80" rx="6" />
          <path className={styles.copy} d="M84,72 L140,72" />
          <path className={styles.copy} d="M84,88 L126,88" />
          <rect className={styles.solid} x="84" y="104" width="44" height="14" rx="4" />
          <path className={styles.line} d="M166,90 L222,90" />
          <circle className={styles.halo} cx="236" cy="90" r="15" />
          <circle className={styles.node} cx="236" cy="90" r="7" />
        </>
      ) : null}

      {name === 'product-design' ? (
        <>
          <rect className={styles.frame} x="60" y="30" width="200" height="120" rx="8" />
          <path className={styles.rule} d="M60,50 L260,50" />
          <path className={styles.line} d="M90,105 L160,75 L230,105" />
          <circle className={styles.nodeOpen} cx="90" cy="105" r="6" />
          <circle className={styles.halo} cx="160" cy="75" r="15" />
          <circle className={styles.node} cx="160" cy="75" r="7" />
          <circle className={styles.nodeOpen} cx="230" cy="105" r="6" />
          <path className={styles.copy} d="M90,128 L150,128" />
        </>
      ) : null}

      {name === 'product-modernisation' ? (
        <>
          <rect className={styles.frameQuiet} x="30" y="40" width="110" height="100" rx="8" />
          {[58, 70, 82, 94, 106, 118].map((y, i) => (
            <path
              key={y}
              className={styles.copyQuiet}
              d={`M44,${y} L${i % 2 ? 110 : 126},${y}`}
            />
          ))}
          <path className={styles.line} d="M152,90 L170,90" />
          <path className={styles.line} d="M163,83 L170,90 L163,97" />
          <rect className={styles.frame} x="180" y="40" width="110" height="100" rx="8" />
          <path className={styles.copy} d="M196,62 L250,62" />
          <rect className={styles.region} x="196" y="80" width="78" height="22" rx="5" />
          <path className={styles.copy} d="M196,122 L236,122" />
        </>
      ) : null}

      {name === 'design-systems' ? (
        <>
          {[
            [40, 40],
            [84, 40],
            [40, 84],
            [84, 84],
            [40, 128],
          ].map(([x, y]) => (
            <rect
              key={`${x}-${y}`}
              className={styles.tile}
              x={x}
              y={y}
              width="34"
              height="24"
              rx="5"
            />
          ))}
          <rect className={styles.solid} x="84" y="128" width="34" height="24" rx="5" />
          <path className={styles.trail} d="M124,140 L176,112" />
          <rect className={styles.frame} x="170" y="36" width="120" height="110" rx="8" />
          <path className={styles.copy} d="M186,58 L246,58" />
          <rect className={styles.solid} x="186" y="100" width="34" height="24" rx="5" />
          <rect className={styles.tile} x="228" y="100" width="46" height="24" rx="5" />
        </>
      ) : null}

      {name === 'ai-product-ux' ? (
        <>
          <rect className={styles.frame} x="70" y="40" width="180" height="100" rx="10" />
          <path className={styles.copy} d="M92,66 L196,66" />
          <path className={styles.copy} d="M92,82 L170,82" />
          <rect className={styles.solid} x="92" y="104" width="64" height="20" rx="10" />
          <path className={styles.tick} d="M114,114 L120,120 L132,108" />
          <rect className={styles.frameQuiet} x="164" y="104" width="64" height="20" rx="10" />
          <path
            className={styles.mark}
            d="M232,22 L236,34 L248,38 L236,42 L232,54 L228,42 L216,38 L228,34 Z"
          />
        </>
      ) : null}

      {name === 'design-engineering' ? (
        <>
          <rect className={styles.frame} x="36" y="40" width="112" height="100" rx="8" />
          <rect className={styles.region} x="54" y="94" width="76" height="24" rx="5" />
          <path className={styles.copy} d="M54,62 L120,62" />
          <rect className={styles.frame} x="172" y="40" width="112" height="100" rx="8" />
          <path className={styles.copyQuiet} d="M188,60 L230,60" />
          <path className={styles.copyQuiet} d="M200,76 L262,76" />
          <path className={styles.line} d="M200,106 L256,106" />
          <path className={styles.copyQuiet} d="M188,122 L214,122" />
          <path className={styles.trail} d="M130,106 L200,106" />
        </>
      ) : null}

      {name === 'software-development' ? (
        <>
          {[44, 82, 120].map((y, i) => (
            <rect
              key={y}
              className={i === 0 ? styles.region : styles.frameQuiet}
              x="60"
              y={y}
              width="150"
              height="24"
              rx="6"
            />
          ))}
          <path className={styles.trail} d="M135,68 L135,82 M135,106 L135,120" />
          <path className={styles.line} d="M210,132 L244,132 L244,90" />
          <circle className={styles.halo} cx="244" cy="76" r="16" />
          <circle className={styles.node} cx="244" cy="76" r="8" />
        </>
      ) : null}
    </svg>
  );
}
