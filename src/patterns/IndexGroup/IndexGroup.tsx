import type { ReactNode } from 'react';

import { Layout } from '@/components';

import styles from './IndexGroup.module.css';

export type IndexGroupProps = {
  /** The section's anchor. Distinct from `headingId`, which is what an outline points at. */
  id: string;
  /** The group's name: "Articles", "New products". Under 40 characters, so it serves the rail too. */
  heading: string;
  /** The heading's id: what the page's TableOfContents links to and the section is labelled by. */
  headingId: string;
  /** One sentence on what the group holds. Absent, the head is the heading alone. */
  lead?: string;
  /**
   * A fact derived from the items, never authored: "5 cases", "42 articles". The label voice, under
   * the heading. Passed in sentence case ("5 cases"); the role uppercases it in presentation.
   */
  meta?: string;
  /**
   * The group's way out, at the end of the heading's row: the caller composes the CtaRow (a pattern
   * does not import a pattern), so the control is its own and this only places it.
   */
  actions?: ReactNode;
  /** The items. Whatever card set or rows the caller chose for this group. */
  children: ReactNode;
};

/**
 * IndexGroup — one category of an index page, as a section that sits in a column beside the page's
 * outline rail (docs/specs/IndexGroup.md, 15 Oct 2026). The claude.com/resources idea in Tcules'
 * vocabulary: a hairline, a serif heading with its count and its line, the way out at the row's end,
 * and the items under the head.
 *
 * It exists because ContentSection is a whole band — it owns a Section — and cannot be nested in the
 * column beside a TableOfContents; building the same unit inline in the insights hub and the case
 * index would be the sideways duplication the tier rule forbids.
 *
 *   head   the rule across the full column, then the heading (an h2 at the h3 role) with the
 *          actions at its row's end from md, on the heading's baseline; then its meta and lead
 *   body   the children, a `stack` (48) under the head
 *
 * It owns its own separator — the hairline on the head's top edge — the way a ListCard row owns its
 * rule, and sets no outer margin: the stack that holds the groups owns the distance between them,
 * at `stack` (48), block to block inside one section (16 Oct 2026; IndexGroup.md § 7). A row list
 * in the body ends without its own closing rule (ListCard `rule="none"` on the last row), because
 * the next group's hairline is the seam and two rules 48 apart read as a stutter.
 * The first group draws its rule too, so the column starts on the same top edge as the rail beside it.
 * It paints no ground: it reads the surface from the Section it stands in.
 */
export function IndexGroup({
  id,
  heading,
  headingId,
  lead,
  meta,
  actions,
  children,
}: IndexGroupProps) {
  const leadText = lead?.trim();
  const metaText = meta?.trim();
  const title = (
    <h2 id={headingId} className={styles.heading}>
      {heading}
    </h2>
  );

  return (
    <section id={id} aria-labelledby={headingId}>
      <Layout rowGap="stack">
        <Layout rowGap="tight" className={styles.head}>
          {/* The heading and the way out share ONE row, set on the heading's baseline (critique 16
              Oct 2026: bottom-aligned to the whole head, "All 42 articles" sat 14px under the h2's
              baseline whenever a count or a line followed it). Layout's `baseline` aligns last
              baselines, which on a heading of one line is its only one; a heading that wraps puts
              the action on its last line, still beside the words it belongs to. The count and the
              line run under that row at the full column. Below md the action drops under the
              heading, a `block` down. */}
          {actions ? (
            <Layout
              columns={{ base: 1, md: [1, 'auto'] }}
              colGap="block"
              rowGap="block"
              align="baseline"
            >
              {title}
              <div>{actions}</div>
            </Layout>
          ) : (
            title
          )}
          {metaText ? <p className={styles.meta}>{metaText}</p> : null}
          {leadText ? <p className={styles.lead}>{leadText}</p> : null}
        </Layout>
        {children}
      </Layout>
    </section>
  );
}
