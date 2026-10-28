import type { ReactNode } from 'react';

import { cx } from '@/lib/cx';
import { glyphs, type IconName } from '@/lib/icon-glyphs';

import styles from './Sketch.module.css';
import type { SketchName } from '@/lib/sketches';

/**
 * The STORY drawings: the service scenes the home bento shows, redrawn to the flat-graphics grammar
 * (docs/research/flat-graphics-grammar.md) and drawn in two states, the problem at rest and solved
 * when the link they sit in is hovered or focused (owner, 25 Oct 2026, "lock this in for that
 * section"). One move per drawing; the parts that move carry `trace`, `grow`, `glide` or a lit class.
 *
 * The grammar, as drawn here: routes leave the middle of an edge, run on the axes, turn on one
 * 6-unit arc and end on a port or the one arrowhead; ports, turns and line ends sit on the plate's
 * 20-unit dots; 1 for every outline, 2 for copy and the route; no words inside a drawing; glyphs are
 * Solar's, in a chip; one focal point, solid on a soft blue ground.
 */

/** A Solar glyph set inside a drawing at (cx, cy), `size` drawing units square. */
function Glyph({
  name,
  cx,
  cy,
  size,
  className,
}: {
  name: IconName;
  cx: number;
  cy: number;
  size: number;
  className: string | undefined;
}) {
  const s = size / 24;
  return (
    <g
      className={className}
      transform={`translate(${cx - size / 2},${cy - size / 2}) scale(${s})`}
    >
      {glyphs[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
}

/** A route that draws itself: drawn at its own length (1), so the dash reveals it from the start. */
function Trace({ d }: { d: string }) {
  return <path className={styles.trace} d={d} pathLength={1} />;
}

/** A library cell: a quiet tile holding one component. */
function Cell({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <>
      <rect className={styles.tile} x={x} y={y} width="40" height="24" rx="4" />
      {children}
    </>
  );
}

/** A layer of the product: its frame, its glyph in a chip, a line of copy. */
function Layer({ y, glyph, to }: { y: number; glyph: IconName; to: number }) {
  return (
    <>
      <rect className={styles.frame} x="50" y={y - 12} width="140" height="24" rx="4" />
      <rect className={styles.chip} x="56" y={y - 8} width="16" height="16" rx="4" />
      <Glyph name={glyph} cx={64} cy={y} size={10} className={styles.glyph} />
      <path className={styles.copy} d={`M80,${y} L${to},${y}`} />
    </>
  );
}

/** The cursor: drawn at its place on the button, with its flat offset under it. */
const CURSOR = 'M0,0 L0,17 L4.6,12.9 L7.6,19.6 L10.6,18.3 L7.7,11.7 L13.6,11.7 Z';

export const STORY: Partial<Record<SketchName, ReactNode>> = {
  /* The decision is open, then made: both branches trace out to their screens, the decision fills. */
  'product-design': (
    <>
      <rect className={styles.frame} x="50" y="30" width="220" height="120" rx="8" />
      <path className={styles.copyQuiet} d="M70,50 L118,50" />
      <rect className={styles.frame} x="70" y="80" width="40" height="20" rx="4" />
      <path className={styles.copy} d="M80,90 L100,90" />
      <path className={styles.line} d="M110,90 L139,90" />
      <circle className={styles.node} cx="110" cy="90" r="2.5" />
      <circle className={cx(styles.halo, styles.grow)} cx="150" cy="90" r="18" />
      <path className={styles.decision} d="M150,78 L162,90 L150,102 L138,90 Z" />
      <Trace d="M162,90 L174,90 A6,6 0 0 0 180,84 L180,76 A6,6 0 0 1 186,70 L204,70" />
      <Trace d="M162,90 L174,90 A6,6 0 0 1 180,96 L180,104 A6,6 0 0 0 186,110 L204,110" />
      <path className={cx(styles.solid, styles.grow)} d="M210,70 L203,74 L203,66 Z" />
      <path className={cx(styles.solid, styles.grow)} d="M210,110 L203,114 L203,106 Z" />
      <rect className={styles.frame} x="210" y="60" width="40" height="20" rx="4" />
      <path className={styles.copy} d="M220,70 L240,70" />
      <rect className={styles.frame} x="210" y="100" width="40" height="20" rx="4" />
      <path className={styles.copy} d="M220,110 L234,110" />
    </>
  ),

  /* The rebuild runs across from the cluttered screen, and the clean screen's block lights. */
  'product-modernisation': (
    <>
      <rect className={styles.frameQuiet} x="30" y="30" width="100" height="120" rx="8" />
      <path className={styles.copyQuiet} d="M44,50 L96,50" />
      <rect className={styles.tile} x="102" y="45" width="16" height="10" rx="2" />
      <path className={styles.copyQuiet} d="M44,62 L118,62" />
      <rect className={styles.tile} x="44" y="70" width="34" height="14" rx="2" />
      <path className={styles.copyQuiet} d="M84,77 L116,77" />
      <path className={styles.copyQuiet} d="M50,92 L104,92" />
      <path className={styles.copyQuiet} d="M44,102 L112,102" />
      <rect className={styles.tile} x="60" y="110" width="54" height="12" rx="2" />
      <path className={styles.copyQuiet} d="M44,130 L74,130" />
      <path className={styles.copyQuiet} d="M82,130 L108,130" />
      <circle className={styles.node} cx="130" cy="90" r="2.5" />
      <Trace d="M130,90 L184,90" />
      <path className={cx(styles.solid, styles.grow)} d="M190,90 L183,94 L183,86 Z" />
      <rect className={styles.frame} x="190" y="30" width="100" height="120" rx="8" />
      <path className={styles.copyQuiet} d="M210,50 L254,50" />
      <path className={styles.copy} d="M210,62 L240,62" />
      <rect
        className={cx(styles.halo, styles.grow)}
        x="204"
        y="74"
        width="72"
        height="32"
        rx="8"
      />
      <rect className={styles.block} x="210" y="80" width="60" height="20" rx="4" />
      <rect className={styles.tile} x="210" y="118" width="26" height="16" rx="4" />
      <rect className={styles.tile} x="244" y="118" width="26" height="16" rx="4" />
    </>
  ),

  /* The component is placed: its route traces into the screen and it lands in the empty slot. */
  'design-systems': (
    <>
      <rect className={styles.frame} x="30" y="30" width="120" height="120" rx="8" />
      <Cell x={40} y={38}>
        <rect className={styles.frameQuiet} x="48" y="44" width="24" height="12" rx="6" />
      </Cell>
      <Cell x={100} y={38}>
        <rect className={styles.frameQuiet} x="108" y="44" width="22" height="12" rx="6" />
        <circle className={styles.knob} cx="124" cy="50" r="4" />
      </Cell>
      <Cell x={40} y={78}>
        <rect className={styles.frameQuiet} x="46" y="84" width="28" height="12" rx="3" />
        <path className={styles.hair} d="M51,87 L51,93" />
      </Cell>
      <Cell x={100} y={78}>
        <rect className={styles.frameQuiet} x="106" y="86" width="8" height="8" rx="2" />
        <path className={styles.copyQuiet} d="M118,90 L132,90" />
      </Cell>
      <Cell x={40} y={118}>
        <circle className={styles.frameQuiet} cx="52" cy="130" r="5" />
        <path className={styles.copyQuiet} d="M62,130 L72,130" />
      </Cell>
      <Cell x={100} y={118}>
        <rect className={styles.soft} x="108" y="124" width="24" height="12" rx="6" />
      </Cell>
      <circle className={styles.node} cx="140" cy="130" r="2.5" />
      <Trace d="M140,130 L164,130 A6,6 0 0 0 170,124 L170,96 A6,6 0 0 1 176,90 L190,90" />
      <rect className={styles.frame} x="190" y="30" width="100" height="120" rx="8" />
      <circle className={cx(styles.nodeOpen, styles.grow)} cx="190" cy="90" r="3" />
      <path className={styles.copyQuiet} d="M210,50 L262,50" />
      <path className={styles.copy} d="M210,62 L250,62" />
      <path className={styles.copy} d="M210,74 L234,74" />
      <rect className={styles.trailFrame} x="210" y="100" width="40" height="12" rx="6" />
      <rect
        className={cx(styles.halo, styles.grow)}
        x="202"
        y="92"
        width="56"
        height="28"
        rx="10"
      />
      <rect
        className={cx(styles.solid, styles.grow)}
        x="210"
        y="100"
        width="40"
        height="12"
        rx="6"
      />
      <path className={styles.copyQuiet} d="M210,134 L262,134" />
    </>
  ),

  /* The person accepts: the cursor moves onto Accept and it fills. */
  'ai-product-ux': (
    <>
      <rect className={styles.frame} x="50" y="30" width="220" height="120" rx="8" />
      <Glyph name="stars" cx={70} cy={50} size={12} className={styles.glyphAccent} />
      <path className={styles.copyQuiet} d="M84,50 L140,50" />
      <path className={styles.copy} d="M70,70 L226,70" />
      <path className={styles.copy} d="M70,82 L212,82" />
      <path className={styles.copy} d="M70,94 L158,94" />
      <rect className={styles.press} x="70" y="104" width="58" height="16" rx="8" />
      <rect className={styles.frameQuiet} x="136" y="104" width="62" height="16" rx="8" />
      <g className={cx(styles.glide, styles.glideToAccept)}>
        <path className={styles.liftUnder} d={CURSOR} transform="translate(123,115)" />
        <path className={styles.lift} d={CURSOR} transform="translate(121,113)" />
      </g>
    </>
  ),

  /* The component reaches the code: the route traces across and the line of code lights. */
  'design-engineering': (
    <>
      <rect className={styles.frame} x="30" y="30" width="120" height="120" rx="8" />
      <path className={styles.copyQuiet} d="M50,50 L110,50" />
      <path className={styles.copy} d="M50,62 L94,62" />
      <rect
        className={cx(styles.halo, styles.grow)}
        x="54"
        y="76"
        width="64"
        height="28"
        rx="12"
      />
      <rect className={styles.solid} x="62" y="82" width="48" height="16" rx="8" />
      <circle className={styles.node} cx="110" cy="90" r="2.5" />
      <path className={styles.copy} d="M50,122 L130,122" />
      <path className={styles.copy} d="M50,134 L102,134" />
      <rect className={styles.frame} x="170" y="30" width="120" height="120" rx="8" />
      <path className={styles.rule} d="M190,30 L190,150" />
      {(
        [
          [50, 198, 236],
          [62, 206, 270],
          [74, 206, 252],
          [106, 206, 262],
          [118, 206, 240],
          [130, 198, 222],
        ] as const
      ).map(([y, x1, x2]) => (
        <path key={y} className={styles.copyQuiet} d={`M${x1},${y} L${x2},${y}`} />
      ))}
      <rect className={styles.wash} x="194" y="82" width="86" height="16" rx="3" />
      <path className={styles.codeLine} d="M200,90 L250,90" />
      <Trace d="M110,90 L194,90" />
      <circle className={cx(styles.nodeOpen, styles.grow)} cx="150" cy="90" r="3" />
      <circle className={cx(styles.nodeOpen, styles.grow)} cx="170" cy="90" r="3" />
    </>
  ),

  /* The layers ship: the bus traces from all three and the release lights. */
  'software-development': (
    <>
      <path className={styles.rule} d="M120,62 L120,78 M120,102 L120,118" />
      <Layer y={50} glyph="monitor" to={150} />
      <Layer y={90} glyph="server" to={136} />
      <Layer y={130} glyph="database" to={120} />
      <circle className={styles.node} cx="190" cy="50" r="2.5" />
      <circle className={styles.node} cx="190" cy="90" r="2.5" />
      <circle className={styles.node} cx="190" cy="130" r="2.5" />
      <Trace d="M190,50 L204,50 A6,6 0 0 1 210,56 L210,90" />
      <Trace d="M190,130 L204,130 A6,6 0 0 0 210,124 L210,90" />
      <Trace d="M190,90 L239,90" />
      <circle className={cx(styles.node, styles.grow)} cx="210" cy="90" r="3.5" />
      <circle className={cx(styles.halo, styles.grow)} cx="250" cy="90" r="18" />
      <circle className={styles.release} cx="250" cy="90" r="11" />
      <Glyph name="arrow-right-up" cx={250} cy={90} size={12} className={styles.releaseMark} />
    </>
  ),
};

/** Each story drawing's drawn edge (its bare frame's viewBox), strokes and halos included. */
export const STORY_DRAWN: Partial<
  Record<SketchName, readonly [number, number, number, number]>
> = {
  'product-design': [46, 26, 228, 128],
  'product-modernisation': [26, 26, 268, 128],
  'design-systems': [26, 26, 268, 128],
  'ai-product-ux': [46, 26, 228, 128],
  'design-engineering': [26, 26, 268, 128],
  'software-development': [46, 26, 228, 128],
};
