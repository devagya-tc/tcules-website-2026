import { Cluster, Icon, Layout, Prose } from '@/components';

import styles from './Accordion.module.css';

/**
 * Heading semantics for the question, without a visual type change — the question renders at the
 * h5 composite whichever element it is. `h3` is right on every audited route, because
 * `ContentSection` owns the section's `h2`; `h4` exists for the day a route nests a set under an
 * `h3`. Same shape and same reason as `titleAs` on `BlockCard` and `ListCard`.
 */
export type AccordionQuestionElement = 'h3' | 'h4';

export type AccordionItem = {
  /** Plain-text native summary label. Whitespace-only values invalidate the record. */
  question: string;
  /** Trusted, content-seam-sanitised rich text. Whitespace-only values invalidate the record. */
  answerHtml: string;
};

export type AccordionProps = {
  /** Ordered disclosures. Production content is expected to contain two to eight valid records. */
  items: readonly AccordionItem[];
  /** Heading level for every question. Defaults to `h3`. */
  questionAs?: AccordionQuestionElement;
};

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`Accordion: ${message}`);
}

/**
 * Accordion — one multi-open question-and-answer set, built to docs/specs/Accordion.md.
 *
 * Every valid record is a native details/summary pair. Native disclosure state keeps the pattern
 * operable without a client boundary, authored ARIA or managed focus; the first valid record is
 * initially open and every sibling remains independent. Layout owns the item axis, the summary
 * itself is the Cluster that places question and mark, and Prose alone owns the trusted rich-text
 * answer flow — Accordion restates its size and nothing else.
 *
 * ── Why the question is a heading ───────────────────────────────────────────────────────────
 * The summary is already a named interactive control, so the heading adds nothing for a single
 * disclosure — which is what the spec originally argued. It does not hold for this component's
 * actual deployment: 5–7 questions, on 21 routes, normally as the last block on a long page.
 * Screen-reader and voice-control users navigate a page like that by heading, and without one the
 * entire FAQ is absent from the heading tree with no way to jump to it or scan it. The summary
 * keeps its role, its expanded state and its accessible name either way; the heading is additive.
 */
export function Accordion({ items, questionAs: Question = 'h3' }: AccordionProps) {
  const validItems = items.filter((item, index) => {
    if (typeof item.question !== 'string' || item.question.trim().length === 0) {
      warn(`item ${index + 1} has a blank question; omitting the item.`);
      return false;
    }

    if (typeof item.answerHtml !== 'string' || item.answerHtml.trim().length === 0) {
      warn(`item ${index + 1} has a blank answer; omitting the item.`);
      return false;
    }

    return true;
  });

  if (validItems.length === 0) {
    warn('no valid items remain; rendering nothing.');
    return null;
  }

  if (validItems.length === 1) {
    warn('received one valid item; production content should contain at least two.');
  } else if (validItems.length > 8) {
    warn(
      `received ${validItems.length} valid items; production content should contain at most eight.`,
    );
  }

  return (
    <Layout rowGap="none" className={styles.root}>
      {validItems.map((item, index) => (
        <details className={styles.item} open={index === 0} key={`${index}-${item.question}`}>
          <Cluster
            as="summary"
            colGap="block"
            justify="between"
            align="start"
            nowrap
            className={styles.trigger}
          >
            <Question className={styles.question}>{item.question}</Question>
            {/* Both chevrons, always in the DOM, both decorative: [open] picks which one shows, so
                the mark never rotates and the module carries one class instead of a pair. The
                order is load-bearing — closed first, open second. See .mark in the stylesheet. */}
            <span className={styles.mark}>
              <Icon name="chevron-right" size="lg" />
              <Icon name="chevron-down" size="lg" />
            </span>
          </Cluster>
          <Prose html={item.answerHtml} className={styles.answer} />
        </details>
      ))}
    </Layout>
  );
}
