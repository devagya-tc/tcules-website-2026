import type { ReactNode } from 'react';

import styles from './SetHeading.module.css';

/**
 * The heading over a set of titled items inside a band: a ledger's named things, a slice's
 * acceptance levels, a record's fields. ONE place sets its scale, so no block can invert it.
 *
 * THE RULE (owner, 7 Oct 2026): a set's heading always outranks its items — at least one type step
 * above the largest item title. The ledger's h5 heading sat over h4 numbered rows, so the name of
 * the set read smaller than the things in it. The heading takes the h3 ROLE, one step above the
 * largest title a set in this template carries (ListCard `md`, h4) and two above `sm` (h5); a set
 * of BlockCard `lg` (h3) titles never takes a heading here. It is an `h3` element in the band's h2
 * outline, so the items under it take `h4`.
 */
export function SetHeading({ children }: { children: ReactNode }) {
  return <h3 className={styles.heading}>{children}</h3>;
}
