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
 *   head   the rule across the full column, then the heading (an h2 at the h3 role), its meta and
 *          lead, with the actions at the row's end from md
 *   body   the children, a `stack` (48) under the head
 *
 * It owns its own separator — the hairline on the head's top edge — the way a ListCard row owns its
 * rule, and sets no outer margin: the stack that holds the groups owns the distance between them.
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
  const head = (
    <Layout rowGap="tight">
      <h2 id={headingId} className={styles.heading}>
        {heading}
      </h2>
      {metaText ? <p className={styles.meta}>{metaText}</p> : null}
      {leadText ? <p className={styles.lead}>{leadText}</p> : null}
    </Layout>
  );

  return (
    <section id={id} aria-labelledby={headingId}>
      <Layout rowGap="stack">
        {actions ? (
          <Layout
            columns={{ base: 1, md: [1, 'auto'] }}
            colGap="block"
            rowGap="block"
            align="end"
            className={styles.head}
          >
            {head}
            <div>{actions}</div>
          </Layout>
        ) : (
          <div className={styles.head}>{head}</div>
        )}
        {children}
      </Layout>
    </section>
  );
}
