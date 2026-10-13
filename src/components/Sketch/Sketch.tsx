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
 * And the ARTICLE scenes, each drawn for one insight from its own argument, its cover until a real
 * one exists (owner, 13 Oct 2026; @/lib/sketches `ArticleSceneName`): code-review,
 * security-checklist, prototype-to-production.
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
      {name === 'code-review' ? (
        <>
          {/* The generated file: a gutter, then indented lines of code. */}
          <rect className={styles.frame} x="118" y="22" width="172" height="136" rx="8" />
          <path className={styles.rule} d="M142,22 L142,158" />
          {(
            [
              [40, 154, 232],
              [52, 166, 258],
              [64, 166, 220],
              [110, 178, 246],
              [122, 166, 236],
              [134, 154, 210],
              [146, 166, 250],
            ] as const
          ).map(([y, x1, x2]) => (
            <path key={y} className={styles.copyQuiet} d={`M${x1},${y} L${x2},${y}`} />
          ))}
          {/* Ticked through: the lines a reviewer no longer reads one by one. */}
          {[40, 52, 146].map((y) => (
            <path key={y} className={styles.line} d={`M124,${y} L128,${y + 4} L136,${y - 4}`} />
          ))}
          {/* The two lines that carry the judgement, held under the lens. */}
          <rect className={styles.region} x="160" y="76" width="112" height="28" rx="4" />
          <path className={styles.copy} d="M172,84 L256,84" />
          <path className={styles.copy} d="M172,96 L232,96" />
          {/* The lens faces left, its handle out towards the copy. */}
          <circle className={styles.rule} cx="164" cy="90" r="30" />
          <path className={styles.line} d="M142,111 L112,141" />
        </>
      ) : null}

      {name === 'security-checklist' ? (
        <>
          {/* The checklist, three checks done and the last still open. */}
          <rect className={styles.frame} x="30" y="22" width="132" height="136" rx="8" />
          {[44, 72, 100].map((y) => (
            <g key={y}>
              <rect className={styles.solid} x="46" y={y} width="16" height="16" rx="4" />
              <path className={styles.tick} d={`M50,${y + 8} L53,${y + 11} L58,${y + 5}`} />
              <path className={styles.copy} d={`M74,${y + 8} L${y === 72 ? 130 : 146},${y + 8}`} />
            </g>
          ))}
          <rect className={styles.tile} x="46" y="128" width="16" height="16" rx="4" />
          <path className={styles.copyQuiet} d="M74,136 L136,136" />
          {/* The gate the checks hold shut. */}
          <rect className={styles.frame} x="186" y="34" width="12" height="112" rx="6" />
          <circle className={styles.halo} cx="192" cy="90" r="16" />
          <circle className={styles.node} cx="192" cy="90" r="6" />
          {/* Real users arriving from the right, walking left towards it. */}
          {[226, 256, 286].map((x) => (
            <g key={x}>
              <circle className={styles.nodeOpen} cx={x} cy="78" r="8" />
              <path className={styles.rule} d={`M${x - 12},${108} Q${x},${90} ${x + 12},${108}`} />
            </g>
          ))}
          <path className={styles.trail} d="M298,128 L214,128" />
          <path className={styles.line} d="M222,122 L214,128 L222,134" />
        </>
      ) : null}

      {name === 'prototype-to-production' ? (
        <>
          {/* The prototype: a rough, dashed sketch of a screen. */}
          <rect className={styles.trailFrame} x="228" y="24" width="72" height="52" rx="6" />
          <path className={styles.copyQuiet} d="M240,40 L280,40" />
          <path className={styles.copyQuiet} d="M240,52 L266,52" />
          {/* The path it has to travel, through the four questions, leftwards into production. */}
          <path
            className={styles.line}
            d="M264,76 L264,108 Q264,120 252,120 L160,120 Q148,120 148,108 L148,100 Q148,88 136,88 L120,88"
          />
          <circle className={styles.nodeOpen} cx="264" cy="96" r="6" />
          <circle className={styles.nodeOpen} cx="222" cy="120" r="6" />
          <circle className={styles.nodeOpen} cx="180" cy="120" r="6" />
          <circle className={styles.nodeOpen} cx="148" cy="104" r="6" />
          <path className={styles.line} d="M126,82 L118,88 L126,94" />
          {/* Production: the stored, running system the answers lead to. */}
          <path className={styles.frame} d="M44,58 L44,128 A34,9 0 0 0 112,128 L112,58" />
          <ellipse className={styles.region} cx="78" cy="58" rx="34" ry="9" />
          <path className={styles.rule} d="M44,82 A34,9 0 0 0 112,82" />
          <path className={styles.rule} d="M44,106 A34,9 0 0 0 112,106" />
          <circle className={styles.node} cx="96" cy="118" r="4" />
        </>
      ) : null}
    </svg>
  );
}
