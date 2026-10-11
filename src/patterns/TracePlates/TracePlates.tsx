import { useId } from 'react';

import { Layout } from '@/components';

import styles from './TracePlates.module.css';

/**
 * What a stage's plate shows: the same screen at that point in its life. Each draws only what the
 * stage's name says.
 *   design   the approved screen: clean frame, the action filled
 *   handoff  the spec: measure marks on the action, and a dashed box where a state was left out
 *   code     the screen as code: indented lines, the action one token-blue line
 *   product  the running product: browser chrome, the action loading
 *   signoff  the accepted screen: the action filled, a tick
 */
export type TraceScene = 'design' | 'handoff' | 'code' | 'product' | 'signoff';

export type TraceStage = {
  /** As authored ("The approved design"). */
  title: string;
  /** What we look at there, as authored. */
  body?: string;
  scene: TraceScene;
};

export type TracePlatesProps = {
  /** Two to six stages, in order. */
  stages: readonly TraceStage[];
  /**
   * `across` (default): the plates in a row, the trace running left to right through each action.
   * `down`: one row per stage, the plate beside its words, the trace running down through each
   * action from plate to plate (owner, 11 Oct 2026: "lets try putting the trace in a vertical
   * layout"). Compact so five stages fit a fold: the plate takes the leading 1 of [1, 3] and rows
   * are a `block` apart.
   */
  orientation?: 'across' | 'down';
};

const W = 320;
const H = 180;
/* The plate shows the middle of the drawing, zoomed so the screen fills it: a 240 × 135 window
   (still 16:9) from (40, 22.5). The dot field runs under all of it. */
const VB = { x: 40, y: 22.5, w: 240, h: 135 };
/* The action sits at x 96–160, y 106–126. The trace (TracePlates.module.css) runs through its centre
   (128, 116): across at y 116, down at x 128, read there as shares of the plate. */
const TRACE_Y = 116;

/** The screen's frame and its two lines of copy, shared by the scenes that show the screen. */
function Frame({ chrome = false }: { chrome?: boolean }) {
  return (
    <>
      <rect className={styles.frame} x="80" y="34" width="160" height="112" rx="8" />
      {chrome ? (
        <>
          <path className={styles.rule} d="M80,50 L240,50" />
          {[92, 101, 110].map((cx) => (
            <circle key={cx} className={styles.dot} cx={cx} cy="42" r="2.5" />
          ))}
        </>
      ) : (
        <path className={styles.copy} d="M96,54 L150,54" />
      )}
      <path className={styles.copy} d="M96,74 L210,74" />
      <path className={styles.copy} d="M96,88 L182,88" />
    </>
  );
}

function Scene({ scene, uid }: { scene: TraceScene; uid: string }) {
  const field = `${uid}-field`;
  return (
    <svg
      className={styles.drawing}
      viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
      focusable="false"
      aria-hidden="true"
    >
      <defs>
        <pattern id={field} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle className={styles.field} cx="10" cy="10" r="1.1" />
        </pattern>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill={`url(#${field})`} />

      {scene === 'design' ? (
        <>
          <Frame />
          <rect className={styles.action} x="96" y="106" width="64" height="20" rx="4" />
        </>
      ) : null}

      {scene === 'handoff' ? (
        <>
          <Frame />
          <rect className={styles.actionOpen} x="96" y="106" width="64" height="20" rx="4" />
          {/* The spec's measure on the action, end ticks and all. */}
          <path className={styles.mark} d="M96,98 L160,98 M96,94 L96,102 M160,94 L160,102" />
          {/* The state nobody specified: a dashed box, left to guesswork. */}
          <rect className={styles.gap} x="172" y="106" width="52" height="20" rx="4" />
        </>
      ) : null}

      {scene === 'code' ? (
        <>
          <rect className={styles.frame} x="80" y="34" width="160" height="112" rx="8" />
          <path className={styles.copy} d="M96,52 L132,52" />
          <path className={styles.copy} d="M108,66 L196,66" />
          <path className={styles.copy} d="M108,80 L176,80" />
          <path className={styles.copy} d="M120,94 L210,94" />
          <path className={styles.token} d={`M108,${TRACE_Y} L172,${TRACE_Y}`} />
          <path className={styles.copy} d="M96,132 L126,132" />
        </>
      ) : null}

      {scene === 'product' ? (
        <>
          <Frame chrome />
          <rect className={styles.action} x="96" y="106" width="64" height="20" rx="4" />
          {/* Loading: an open arc beside the action. */}
          <path className={styles.mark} d="M178,109 A7,7 0 1 1 171,116" />
        </>
      ) : null}

      {scene === 'signoff' ? (
        <>
          <Frame />
          <rect className={styles.action} x="96" y="106" width="64" height="20" rx="4" />
          <path className={styles.tick} d="M200,60 L208,68 L224,52" />
        </>
      ) : null}
    </svg>
  );
}

/** The trace's end node on the first and last plates: open where it starts, filled where it lands. */
function End({ index, last }: { index: number; last: number }) {
  if (index !== 0 && index !== last) return null;
  return <span className={styles.node} data-end={index === 0 ? 'first' : 'last'} aria-hidden="true" />;
}

/**
 * TracePlates — one screen followed from the approved design to what users actually see (the
 * design-to-code audit's "What we trace", owner 11 Oct 2026).
 *
 * The Thread it replaces drew five identical hollow nodes on a line: a full row of drawing that
 * said nothing the words did not ("too dense and too much information for the amount of space it
 * takes … there has to be a 1000x better way"). The band's claim is that we FOLLOW ONE THING through
 * every hand-over, so each stage's plate draws that same screen as it is at that stage — clean, then
 * specified with a gap, then as code, then running and loading, then accepted — and one blue trace
 * runs through its action on every plate and across the gutters between them, starting on an open
 * node and landing on a filled one. The trace is drawn in CSS, not in the drawing, so every segment
 * — inside a plate and across a gutter — has the same dash at every plate width. The drawings are what make the stages legible before a word is
 * read; the words under each say what we look at there.
 *
 * Five across from 1024 (the connector drawn across each gutter at the action's height), three from
 * 768, two below. Plates are 16:9 on the dot field, in EngagementOptions' drawing language.
 */
export function TracePlates({ stages, orientation = 'across' }: TracePlatesProps) {
  const uid = useId().replace(/:/g, '');
  const shown = stages.filter((stage) => stage.title.trim().length > 0);
  const across = Math.min(Math.max(shown.length, 2), 6);
  if (orientation === 'down') {
    return (
      <Layout as="ol" rowGap="block" className={styles.down}>
        {shown.map((stage, index) => (
          <li key={stage.title} className={styles.stage}>
            <Layout columns={{ base: 1, md: [1, 3] }} colGap="gutter" rowGap="block" align="center">
              <div className={styles.plate}>
                <Scene scene={stage.scene} uid={`${uid}-${index}`} />
                <End index={index} last={shown.length - 1} />
              </div>
              <Layout rowGap="tight">
                <h3 className={styles.title}>{stage.title}</h3>
                {stage.body ? <p className={styles.body}>{stage.body}</p> : null}
              </Layout>
            </Layout>
          </li>
        ))}
      </Layout>
    );
  }
  return (
    <Layout
      as="ol"
      columns={{ base: 2, md: Math.min(3, across), lg: across }}
      colGap="gutter"
      rowGap="stack"
      className={styles.across}
    >
      {shown.map((stage, index) => (
        <li key={stage.title} className={styles.stage}>
          <Layout rowGap="block">
            <div className={styles.plate}>
              <Scene scene={stage.scene} uid={`${uid}-${index}`} />
              <End index={index} last={shown.length - 1} />
            </div>
            <Layout rowGap="tight">
              <h3 className={styles.title}>{stage.title}</h3>
              {stage.body ? <p className={styles.body}>{stage.body}</p> : null}
            </Layout>
          </Layout>
        </li>
      ))}
    </Layout>
  );
}
