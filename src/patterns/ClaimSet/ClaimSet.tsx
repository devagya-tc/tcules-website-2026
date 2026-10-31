import type { ReactNode } from 'react';

import { Layout } from '@/components';

import { ClaimProof, type ClaimExample } from './ClaimProof';
import { ClaimWords } from './ClaimWords';
import { ClaimTabs } from './ClaimTabs';
import styles from './ClaimSet.module.css';

/** One hard part: its drawing, its title, its words, and its example where it has one. */
export type ClaimSetItem = {
  title: string;
  /** The claim's drawing (or its labelled placeholder), drawn for this claim. At most 200 wide. */
  figure: ReactNode;
  /**
   * The claim's words, one node per block in order: paragraphs, and a table or list in place. Blocks,
   * not one node, so a claim with no example can spread them over two columns.
   */
  words: readonly ReactNode[];
  example?: ClaimExample;
};

export type ClaimSetProps = {
  /** Prefix for the tab and panel ids: the band's id. */
  id: string;
  /** The band's heading id: the set's accessible name. */
  labelledBy: string;
  /** Two to six claims. */
  items: readonly ClaimSetItem[];
  /**
   * `tabs` (default): one claim at a time on a stage, the claims as tabs along its top; below 1024
   * every claim is on the page, stacked. `page`: every claim on the page, ruled, in three columns.
   */
  layout?: 'tabs' | 'page';
};

/**
 * ClaimSet — a page's hard parts (owner, 31 Oct 2026; docs/page-build/hard-parts-brief.md). The
 * tabs layout is the client half; the page layout renders here with no script.
 */
export function ClaimSet({ id, labelledBy, items, layout = 'tabs' }: ClaimSetProps) {
  if (layout === 'tabs') return <ClaimTabs id={id} labelledBy={labelledBy} items={items} />;
  /* Each row: the drawing beside the claim (a split of an image and its copy, held at `column` so the
     drawing stays the row's lead rather than a separate region), then the words beside the example,
     two peer text columns. Rows are ruled; the rule and the row's own padding are the seam. */
  return (
    <Layout as="ol" rowGap="none">
      {items.map((item) => (
        <li key={item.title} className={styles.row}>
          <Layout columns={{ md: ['auto', 1] }} colGap="column" rowGap="block" align="start">
            <div className={styles.art}>{item.figure}</div>
            <Layout columns={{ lg: [1, 'auto'] }} colGap="column" rowGap="block" align="start">
              <Layout rowGap="block">
                <h3 className={styles.title}>{item.title}</h3>
                <ClaimWords words={item.words} />
              </Layout>
              {item.example ? (
                <div className={styles.proofColumn}>
                  <ClaimProof example={item.example} />
                </div>
              ) : null}
            </Layout>
          </Layout>
        </li>
      ))}
    </Layout>
  );
}
