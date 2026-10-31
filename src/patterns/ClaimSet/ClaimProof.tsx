import styles from './ClaimSet.module.css';

export type ClaimExample = {
  /** The panel's label as the copy writes it ("Example", "Example, from related work"). Default "Example". */
  label?: string;
  /** The example's sentence as HTML, without its "Example:" label (the panel names it). */
  bodyHtml: string;
  /** The case it points to, as authored ("Read the Auxentios case"). */
  link?: { href: string; label: string };
};

/**
 * A claim's example: its label ("Example", or the copy's qualified one), the sentence, and the case link, on a tinted panel. Proof,
 * not a case card: no cover and no client mark (hard-parts-claims-lead-proof-footnotes).
 */
export function ClaimProof({ example }: { example: ClaimExample }) {
  return (
    <aside className={styles.proof}>
      <p className={styles.label}>{example.label ?? 'Example'}</p>
      <p className={styles.says} dangerouslySetInnerHTML={{ __html: example.bodyHtml }} />
      {example.link ? (
        <a className={styles.caseLink} href={example.link.href}>
          {example.link.label}{' '}
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </a>
      ) : null}
    </aside>
  );
}
