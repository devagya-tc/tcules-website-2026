import { Cluster, Icon, Layout } from '@/components';
import { cx } from '@/lib/cx';

import styles from './Thread.module.css';

/** One stage the decision passes through: its name, and optionally one line on what it holds. */
export type ThreadStage = {
  title: string;
  /** One line, ≤ 9 words: what the stage holds or owes the next. Absent renders no element. */
  body?: string;
};

export type ThreadStageHeading = 'h3' | 'h4';

export type ThreadProps = {
  /** Two to twelve stages, in order. Fewer than two renders nothing: a thread needs somewhere to go. */
  stages: readonly ThreadStage[];
  /**
   * The return path, in one sentence: what the last stage feeds back into the first ("Production
   * observation returns to the next product decision."), set under the stages beside a return
   * glyph. From 1024, on a one-row thread, the path is also drawn: an arc over the nodes from the
   * last node back down into the first. Absent draws no path.
   */
  loop?: string;
  /** The stage titles' element. Default `h3`; `h4` when the thread sits under an h3. */
  stageHeading?: ThreadStageHeading;
};

/** Stages per row from 1024: one row up to six; beyond, two balanced rows (9 → 5 + 4). */
function perRow(count: number) {
  return count <= 6 ? count : Math.ceil(count / 2);
}

/* Which stage ends a row from 1024, so its line stops at its own track's edge instead of running
   into the gutter past the column. A class per count rather than a data attribute: Layout takes a
   className and nothing else, and the counts are finite (one row is 2–6, two rows 4–6). */
const ROW_CLASS: Record<number, string | undefined> = {
  2: styles.across2,
  3: styles.across3,
  4: styles.across4,
  5: styles.across5,
  6: styles.across6,
};

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`Thread: ${message}`);
}

/**
 * Thread — named stages one decision passes through, strung on one blue line, with an optional
 * return path drawn beneath. Built to docs/specs/Thread.md (cmp-process-stats, 6 Oct 2026);
 * promoted from the ServicePage template's local diagram for the E band (§ 3.4).
 *
 * NOT STEPS, AND NOT A PROCESSFLOW. Steps are a method — numbered ListCard rows read top to bottom,
 * one action each (§ 3.6). A ProcessFlow is a few stages each holding several items. A thread is a
 * chain of ARTEFACTS — question, probe, contract, behaviour, decision — whose point is that each
 * one cites the one before. So nothing is numbered and nothing is boxed: the stages are beads on a
 * line, the line carries the direction (an arrowhead into every next node), and the last node is
 * filled where the thread lands. The words stay ink; line, arrowheads and nodes are the accent.
 *
 * From 1024 the stages run across the column, one row up to six; seven to twelve break into two
 * balanced rows, and a row's last stage carries no connector (the row break is the turn). Below
 * 1024 the thread turns vertical: the line runs down the start edge, the copy beside each node.
 *
 * Layout owns the tracks and every seam. The module draws the line, arrowheads, nodes and the
 * return path with positioned pseudo-elements and one aria-hidden node per stage — marks on the
 * stage's own edges; it places no sibling and sets no margin.
 */
export function Thread({ stages, loop, stageHeading = 'h3' }: ThreadProps) {
  const valid = stages
    .map((stage) => ({ title: stage.title.trim(), body: stage.body?.trim() || undefined }))
    .filter((stage, index) => {
      if (stage.title) return true;
      warn(`stage ${index + 1} has no title; omitting it.`);
      return false;
    });

  if (valid.length < 2) {
    warn('fewer than two stages: a thread needs somewhere to go. Rendering nothing.');
    return null;
  }
  if (valid.length > 12) warn(`received ${valid.length} stages; the designed maximum is twelve.`);

  const across = perRow(valid.length);
  const Heading = stageHeading;
  const returnPath = loop?.trim();
  /* The arc is drawn on a one-row thread only; see Thread.module.css § The return path. */
  const arc = Boolean(returnPath) && valid.length <= across;

  return (
    <Layout rowGap="stack" className={styles.root}>
      <Layout
        as="ol"
        columns={{ lg: across }}
        colGap="gutter"
        rowGap="stack"
        className={cx(ROW_CLASS[across], across >= 5 && styles.dense, arc && styles.arc)}
      >
        {valid.map((stage, index) => (
          <li key={`${index}-${stage.title}`} className={styles.stage}>
            <span className={styles.node} aria-hidden="true" />
            <Layout rowGap="tight">
              <Heading className={styles.title}>{stage.title}</Heading>
              {stage.body ? <p className={styles.body}>{stage.body}</p> : null}
            </Layout>
          </li>
        ))}
      </Layout>
      {returnPath ? (
        <Cluster nowrap colGap="tight" align="start">
          <span className={styles.loopGlyph} aria-hidden="true">
            <Icon name="undo-left" size="md" />
          </span>
          <p className={styles.loopText}>{returnPath}</p>
        </Cluster>
      ) : null}
    </Layout>
  );
}
