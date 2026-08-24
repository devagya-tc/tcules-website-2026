import type { ElementType, ReactNode } from 'react';

import { cx } from '@/lib/cx';

import styles from './Prose.module.css';

export type ProseProps = {
  /**
   * Element to render. Defaults to `div`.
   *
   * `as="article"` where the flow is the page's main body. Prose is a wrapper around a flow it
   * did not author, so it never assumes a landmark for you.
   */
  as?: ElementType;

  /**
   * A rich-text field as an HTML string — the shape a CMS body arrives in.
   *
   * The contract: **the string is already trusted and sanitised**, and it is sanitised at the
   * content seam (`src/content/sources/*`), never here. Prose is a presentation unit; it cannot
   * know whether a given field is author-controlled or user-submitted, and a sanitiser sitting
   * in a tier-1 component is a sanitiser everyone assumes is running and nobody can see. If the
   * source cannot make that guarantee, it must not hand the field to this prop.
   *
   * **It also carries no images.** Long-form bodies are a block list — rich text, then a figure,
   * then rich text — so an image is its own `figure` block rendered by the `Figure` pattern, and
   * never an `<img>` or `<figure>` inside this string. See the contract on `PageBlock` in
   * `@/content/types`. The `figcaption` rule in this component's stylesheet is therefore a safety
   * net for a violation rather than a supported path — it still earns its place styling a table's
   * `<caption>`, which a body field legitimately does contain.
   *
   * Ignored when `children` is given.
   */
  html?: string;

  /** A flow authored in JSX. Takes precedence over `html`. */
  children?: ReactNode;

  className?: string;
};

/**
 * The rich-text flow.
 *
 * Every other component in this repo styles markup it wrote. Prose is the exception: a CMS body
 * field arrives as an opaque string of `<p>`, `<ul>`, `<blockquote>`, `<table>` and six inline
 * marks, and something has to make that read like the rest of the site. That something is one
 * component with one stylesheet, so the answer is in a single place rather than re-derived per
 * template.
 *
 * ── Why this one is allowed to use margins ──────────────────────────────────────────────────
 * The layout rule says children never set their own outer spacing — the container owns the gap,
 * and `Layout` is how a container owns it. That rule assumes you can wrap each child. Here you
 * cannot: there is no React child to wrap, only a string, and the vertical rhythm of a flow is
 * not uniform anyway — the air before an `h2` is not the air between two paragraphs, and a
 * single `row-gap` cannot say both.
 *
 * So `Prose.module.css` sets margins on adjacent siblings, and that is the documented exception
 * rather than a lapse. It is contained: every margin is written inside `.prose`, none of them
 * can escape it, and Prose itself sets no outer spacing — the `Layout` that holds it still owns
 * the gap between Prose and whatever sits above.
 *
 * ── What it does not do ─────────────────────────────────────────────────────────────────────
 * No `size` prop, no variants, no measure override. One rich-text treatment, on four surfaces.
 * A second one is a conversation, not a prop added ahead of a call site that needs it.
 *
 * Surface comes from the enclosing `data-surface`, as everywhere else — Prose is never told
 * where it is.
 */
export function Prose({ as: Tag = 'div', html, children, className }: ProseProps) {
  if (children !== undefined) {
    return <Tag className={cx(styles.prose, className)}>{children}</Tag>;
  }

  return (
    <Tag
      className={cx(styles.prose, className)}
      // See the `html` prop: sanitised at the content seam, never here.
      dangerouslySetInnerHTML={{ __html: html ?? '' }}
    />
  );
}
