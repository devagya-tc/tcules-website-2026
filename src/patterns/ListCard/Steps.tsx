import { Layout } from '@/components';

/* Bound as `Row`: the set's items are ListCard rows. (Also keeps classes:check from reading the
   stylesheet's path below as a member access on the component.) */
import { ListCard as Row, type ListCardTitleElement } from './ListCard';
import styles from './ListCard.module.css';

/** One step of a method: an action, and one sentence on what it produces. */
export type Step = {
  title: string;
  /**
   * One sentence. At four rows or fewer it may run to two lines (≤ 12 words in a 583 copy column);
   * at five or more it must hold one line (≤ 6 words), or the ladder reads as a wall (§ 3.6).
   */
  body?: string;
};

export type StepsProps = {
  /** Two to five steps, in order. More than five warns: a method past five is two methods. */
  steps: readonly Step[];
  /** The step titles' element. Default `h3`; `h4` when the set sits under an h3. */
  titleAs?: ListCardTitleElement;
};

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`Steps: ${message}`);
}

/**
 * Steps — the approved F body (visual-direction § 3.6): numbered ListCard rows in an `<ol>`, read
 * top to bottom. A SET MODE of ListCard, in ListCard's own folder, because the set is ListCard's
 * rows and nothing else — a `Steps` pattern beside it would be a pattern importing a pattern.
 * Promoted from the two private copies (the kit specimen and ServicePage's Blocks) in the
 * cmp-process-stats fix round, 6 Oct 2026, so the rules about a method live here once:
 *
 *   ONE TITLE SIZE. Every Steps set takes `sm` (h5 over body) whatever its count. ListCard's own
 *   rule (`md` up to three rows) is about a list's weight; a method is read against the other
 *   methods on the same page, and a three-step set at h4 beside a four-step set at h5 read as two
 *   systems ("Trace the record" at 28 against "Frame the decision" at 22, panel note).
 *
 *   A COMPACT TITLE TRACK. A step title is an action of one to three words. In the plain split it
 *   grew to its 340 measure and left ~150 of nothing before the body; here it holds one fixed track
 *   (--lcrd-step-title-track), so every body in the set starts on one line, close to its title.
 *
 *   ROW COUNT. Two to five. The body budget per count is the caller's copy, stated on `Step.body`.
 */
export function Steps({ steps, titleAs = 'h3' }: StepsProps) {
  if (steps.length < 2) warn('fewer than two steps is not a method.');
  if (steps.length > 5) warn(`received ${steps.length} steps; the designed maximum is five.`);

  return (
    <Layout as="ol" rowGap="none" className={styles.steps}>
      {steps.map((step, index) => (
        <Row
          key={`${index}-${step.title}`}
          size="sm"
          titleAs={titleAs}
          title={step.title}
          body={step.body}
          marker={{ type: 'number', value: index + 1 }}
        />
      ))}
    </Layout>
  );
}
