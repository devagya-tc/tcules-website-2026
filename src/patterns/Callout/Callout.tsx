import { Prose } from '@/components';

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
};

/**
 * Callout — a quiet boundary on the claim immediately before it.
 *
 * The wrapper supplies the note semantic and nothing visual beyond the fixed quiet text role.
 * It paints no ground or edge, sets no outer spacing and takes no surface prop; the nearest
 * Section supplies the palette and the parent Layout supplies the seam. Prose remains the one
 * place that renders and styles trusted rich text.
 */
export function Callout({ html }: CalloutProps) {
  if (html.trim().length === 0) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Callout: html must contain visible content; rendering nothing.');
    }
    return null;
  }

  return (
    <div role="note" className={styles.root}>
      <Prose html={html} className={styles.content} />
    </div>
  );
}
