import type { ReactNode } from 'react';

import { Layout } from '@/components';

import styles from './specimen.module.css';

/**
 * A labelled specimen: the props under test, a note on what to look for, and the rendering.
 * Route-local scaffolding for the proving ground — not a pattern, not reusable outside
 * src/app/design.
 */
export function Specimen({
  title,
  note,
  label = 'above',
  children,
}: {
  title: string;
  note?: string;
  /**
   * Where the title and note sit. `below` for a ROW of specimens whose renderings must share a top
   * edge: above, a title that wraps to two lines pushes its rendering lower than its neighbours',
   * and the row stops comparing like with like.
   */
  label?: 'above' | 'below';
  children: ReactNode;
}) {
  const caption = (
    <Layout rowGap="tight">
      <p className={styles.specTitle}>{title}</p>
      {note ? <p className={styles.specNote}>{note}</p> : null}
    </Layout>
  );
  return (
    <Layout as="section" rowGap="block" className={styles.spec}>
      {label === 'above' ? caption : null}
      {children}
      {label === 'below' ? caption : null}
    </Layout>
  );
}

/** A demo block — visible fill and edge so a seam between two of them can be seen and measured. */
export function Box({
  children,
  tall = false,
  accent = false,
}: {
  children?: ReactNode;
  tall?: boolean;
  accent?: boolean;
}) {
  const classes = [styles.box, tall && styles.boxTall, accent && styles.boxAccent]
    .filter(Boolean)
    .join(' ');
  return <div className={classes}>{children}</div>;
}

export { styles as specimenStyles };
