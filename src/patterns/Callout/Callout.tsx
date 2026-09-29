import { Layout, Prose } from '@/components';

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
   * before the key existed: no Layout, no empty span, no seam.
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
 * With a `label`, a mono key sits above the sentence, 8 apart (`Layout rowGap="tight"`). The key
 * tells a scope note from a caption at a glance, which ink and size alone did not (tracker 2.17);
 * it went from beside the sentence to above it on 30 Sep 2026, because a key and a sentence set
 * side by side read as two columns of one thing.
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
      {/* The key sits ABOVE the sentence, never beside it (owner, 30 Sep 2026): two lines of
          text set left and right read as two columns of one thing. The 8 seam is the key's bind
          to what it keys. */}
      <Layout rowGap="tight">
        <span className={styles.label}>{keyText}</span>
        <Prose html={html} className={styles.content} />
      </Layout>
    </div>
  );
}
