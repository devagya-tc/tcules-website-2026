import { Layout } from '@/components';

import styles from './Figure.module.css';

/**
 * The image asset, as four fields rather than a caller-owned node.
 *
 * All four arrive together or not at all, which is the type-level reason there is no way to
 * ship a `src` and discover the missing dimension at runtime. `width` and `height` are the
 * asset's INTRINSIC pixel dimensions — they are not a size request. CSS scales the box to the
 * parent's track; these two are what let the browser reserve the right block-size before the
 * stylesheet arrives, so the page does not shift when the image lands. Every real asset already
 * carries both numbers before it is uploaded.
 *
 * `alt` is required and must NOT restate the caption. `alt` describes what the image shows; the
 * caption and note explain what it means and what it does not establish. A product screenshot is
 * evidentiary content, so the empty-string convention that suits `ListCard`'s decorative
 * thumbnail is wrong here — there, the row's title and body already carry the meaning.
 */
export type FigureImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * A closed content record. Three props, none of them a size, a position or a container hint.
 *
 * There is no `className`, `style`, `id`, `size`, `variant`, `surface` or `crop`: no
 * `HTMLAttributes` spread and no index signature, so excess-property checking rejects all of
 * them at the call site. Width in particular is deliberately absent — WIDTH IS THE PARENT'S JOB,
 * and a `size` prop would be a second place it could be set, which is the failure this contract
 * exists to make unreachable rather than merely discouraged.
 */
export type FigureProps = {
  /**
   * The image. Absent renders no `<img>`, no rule and no seam — a caption alone, which is a
   * first-class rendering rather than a degraded one: the written evidence notes this component
   * was built for routinely explain a PERMANENT absence, and a placeholder box would promise an
   * image that is coming.
   */
  image?: FigureImage;
  /**
   * The caption, verbatim. Required, and a `string` rather than a `ReactNode` — that is what
   * makes "text laid over the image" and "a heading or link smuggled into a caption" impossible
   * to express.
   */
  caption: string;
  /**
   * The quieter second caption. It belongs to the image, moves with it, and says what the image
   * does NOT establish. Absent — or empty — renders no element and no seam.
   */
  note?: string;
};

/**
 * Figure — an image with a caption and an optional quieter note, built to docs/specs/Figure.md.
 *
 * It fills whatever inline space its parent gives it and asks nothing of that parent: no slot, no
 * context, no surface prop. Whichever `Section`, `PageHero` or future `ContentSection` established
 * `data-surface` is what the three `--fig-*` colours resolve against, so the same markup is
 * correct on paper, on a tint panel, in an ink band and on the blue pivot — including a tint panel
 * nested inside an ink section.
 *
 * `<figure>` and `<figcaption>` are what associate the caption with the image, so this component
 * emits no ARIA, generates no id and holds no idref. Nothing in it is focusable, nothing hovers
 * and nothing moves; the render is a pure function of the three props.
 *
 * The image renders at its own intrinsic ratio, uncropped, at 100% of the given track. Product
 * screenshots are light, detailed and full of small type, and they vary too widely in shape for
 * any one fixed ratio not to cut that type out of some of them — which is why the fixed 3:2
 * centre crop that is right for `ListCard`'s marker is deliberately not generalised here.
 */
export function Figure({ image, caption, note }: FigureProps) {
  /* An empty note is treated as absent, an empty caption is not, and the asymmetry is deliberate
     rather than an oversight. `note` is optional, so `note=""` is indistinguishable from no note
     at all and collapsing it is the honest reading. `caption` is required, so an empty one is a
     content defect: rendering the empty <p> anyway keeps it visible and auditable instead of
     hiding it behind a fallback string nobody wrote. */
  const hasNote = note !== undefined && note.trim().length > 0;

  return (
    <Layout as="figure" rowGap="text" className={styles.root}>
      {image ? (
        /* A native image, owned here rather than accepted as a node: the repository has no Image
           primitive and no next/image precedent, and the accepted spec chose src/alt/width/height
           fields. One src at one resolution — there is no srcset, because there is no responsive
           image pipeline in this codebase to feed one. */
        /* eslint-disable-next-line @next/next/no-img-element -- accepted native-image contract */
        <img
          className={styles.image}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          /* Unconditional, as ListCard's thumbnail is. The one case this would mis-serve — an
             above-the-fold hero image — cannot exist yet: PageHero has no image slot. When it
             gains one, this becomes a joint amendment to both specs rather than a `priority` prop
             added speculatively today. */
          loading="lazy"
          decoding="async"
        />
      ) : null}
      {/* <figcaption> must be the figure's first or last child. It is last, because a caption
          above an image reads as an eyebrow — a label for what is coming — and this system
          already assigns that role a different meaning on PageHero. */}
      <Layout as="figcaption" rowGap="tight" className={styles.legend}>
        <p className={styles.caption}>{caption}</p>
        {hasNote ? <p className={styles.note}>{note}</p> : null}
      </Layout>
    </Layout>
  );
}
