import { Cluster, Prose } from '@/components';
import { cx } from '@/lib/cx';

import styles from './Callout.module.css';

export type CalloutProps = {
  /**
   * Trusted, content-seam-sanitised rich text for one parenthetic note.
   *
   * The field supports the same inline markup as Prose. It does not support headings, figures,
   * blockquotes or other block schemas: the content seam owns that narrower authoring contract,
   * while Prose remains responsible for rendering the trusted HTML it receives.
   */
  html: string;
  /**
   * An optional short key naming what kind of boundary this is — "Scope", "Note", "Method".
   * Authored in sentence case and passed as written: the mono label voice uppercases it in CSS,
   * never in the string (tracker 2.17). Absent — or blank — renders the note exactly as it was
   * before the key existed: no Cluster, no empty span, no seam.
   */
  label?: string;
};

/**
 * Callout — a quiet boundary on the claim immediately before it.
 *
 * The wrapper supplies the note semantic and nothing visual beyond the fixed quiet text role.
 * It paints no ground or edge, sets no outer spacing and takes no surface prop; the nearest
 * Section supplies the palette and the parent Layout supplies the seam. Prose remains the one
 * place that renders and styles trusted rich text.
 *
 * With a `label`, a mono key leads the sentence in a baseline-aligned Cluster at `tight`: beside
 * the text while the line has room, wrapping above it when it does not. The key tells a scope note
 * from a caption at a glance, which ink and size alone did not (owner decision, tracker 2.17).
 */
export function Callout({ html, label }: CalloutProps) {
  if (html.trim().length === 0) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Callout: html must contain visible content; rendering nothing.');
    }
    return null;
  }

  const keyText = label?.trim();

  if (!keyText) {
    return (
      <div role="note" className={styles.root}>
        <Prose html={html} className={styles.content} />
      </div>
    );
  }

  return (
    <div role="note" className={styles.root}>
      <Cluster colGap="tight" rowGap="tight" align="baseline">
        <span className={styles.label}>{keyText}</span>
        <Prose html={html} className={cx(styles.content, styles.keyed)} />
      </Cluster>
    </div>
  );
}
