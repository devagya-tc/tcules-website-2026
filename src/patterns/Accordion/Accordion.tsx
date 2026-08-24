import { Cluster, Icon, Layout, Prose } from '@/components';

import styles from './Accordion.module.css';

export type AccordionItem = {
  /** Plain-text native summary label. Whitespace-only values invalidate the record. */
  question: string;
  /** Trusted, content-seam-sanitised rich text. Whitespace-only values invalidate the record. */
  answerHtml: string;
};

export type AccordionProps = {
  /** Ordered disclosures. Production content is expected to contain two to eight valid records. */
  items: readonly AccordionItem[];
};

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`Accordion: ${message}`);
}

/**
 * Accordion — one multi-open question-and-answer set, built to docs/specs/Accordion.md.
 *
 * Every valid record is a native details/summary pair. Native disclosure state keeps the pattern
 * operable without a client boundary, authored ARIA or managed focus; the first valid record is
 * initially open and every sibling remains independent. Layout owns the item axis, Cluster owns
 * question/mark placement, and Prose alone owns the trusted rich-text answer flow.
 */
export function Accordion({ items }: AccordionProps) {
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
          <summary className={styles.trigger}>
            <Cluster
              as="span"
              colGap="block"
              justify="between"
              align="start"
              nowrap
              className={styles.triggerContent}
            >
              <span className={styles.question}>{item.question}</span>
              <span className={styles.markClosed}>
                <Icon name="chevron-right" size="lg" />
              </span>
              <span className={styles.markOpen}>
                <Icon name="chevron-down" size="lg" />
              </span>
            </Cluster>
          </summary>
          <Prose html={item.answerHtml} className={styles.answer} />
        </details>
      ))}
    </Layout>
  );
}
