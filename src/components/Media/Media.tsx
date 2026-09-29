import { cx } from '@/lib/cx';

import styles from './Media.module.css';

/**
 * What the image IS — which decides its edge, and nothing else about it.
 *
 *   capture       a flat screenshot of a whole layout. Takes the placement's hairline in the
 *                 surface's rule ink, radius 0, no shadow — "its one edge cue is the hairline"
 *                 (ch05 §2). Full column only, and only where the layout is the subject.
 *   cut-out       product UI lifted out of its page onto our ground, alpha all round (ch05 §2a).
 *                 No edge: the silhouette is the frame. May carry one shadow, and sits on a
 *                 contrast panel when its own edge does not hold against the ground (B5).
 *   illustration  our own line-led drawing (ch05 §4a). Never boxed: no edge, no panel, no
 *                 shadow, in any placement (B4). Never placed on blue.
 *   photograph    team and studio (ch05 §3). No edge, radius 0, never masked.
 *
 * A kind is a CONTENT fact about the asset — it passes the Strapi test in strapi-changes.md §1
 * because it changes what the image is, not how one page wants it to look — so it arrives on
 * the record, never as a presentation prop a placement chooses.
 */
export type MediaKind = 'capture' | 'cut-out' | 'illustration' | 'photograph';

/**
 * The contrast panel behind a cut-out whose UI edge does not hold against the ground (ch05 §2a,
 * B5). One of three fixed brand grounds, chosen at supply for the ASSET (ruling M4) — code never
 * guesses it from the surface, because the surface does not know what colour the product's edge is.
 */
export type MediaPanel = 'paper' | 'paper-deep' | 'ink';

/** One derived width of the master, resized and never recomposed (ch05 §9). */
export type MediaSource = {
  src: string;
  /** The file's intrinsic pixel width — the `w` descriptor in the srcset. */
  width: number;
};

/**
 * The image asset — a record, not a size request.
 *
 * `src`, `width` and `height` are the MASTER: the one production file, supplied at 2560 (ruling
 * M2). They are the intrinsic pixel dimensions, and they are required together, so there is no
 * way to ship a `src` and discover a missing dimension at runtime; the two numbers are what let
 * the browser reserve the right block-size before the image arrives.
 *
 * `sources` are the derived widths Strapi generated from that master (its `formats`). Media reads
 * whatever widths arrive rather than knowing their names — the ladder is 2560 · 1240 · 652 · 320
 * today (M2), and a breakpoint change in Strapi changes nothing here.
 *
 * `kind`, `panel` and `shadow` are content fields that Strapi does not record yet
 * (strapi-changes.md entries 3 and 7). Until it does they arrive undefined, and an image with no
 * kind renders as a capture — today's hairline — so nothing on a live route changes look (M3).
 *
 * `alt` is required and must not restate a caption: it says what the image shows. An empty string
 * is the decorative convention (ch05 §7) and is legal; omitting it is not.
 */
export type MediaImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind?: MediaKind;
  /** Cut-outs only. Ignored, with a development warning, on any other kind. */
  panel?: MediaPanel;
  /** Cut-outs only: the one `--shadow-crop`. Ignored, with a development warning, elsewhere. */
  shadow?: boolean;
  sources?: readonly MediaSource[];
};

/**
 * How the image meets its box.
 *
 *   intrinsic  100% of the parent's inline size, height from the asset's own ratio, never
 *              cropped (ruling H3, ch05 §9). Every full-column and track placement.
 *   fill       fills a box the PARENT has already given a ratio, with a centre cover crop. For the
 *              placements that crop mechanically — BlockCard, ListCard's thumbnail, the nav card —
 *              where the pattern owns the ratio and the asset is authored for it (ch05 B4, §9a).
 */
export type MediaFit = 'intrinsic' | 'fill';

/**
 * Who draws the image's edge.
 *
 *   kind       Media does, by kind: a capture its hairline, everything else none. Every placement
 *              that shows the asset as itself.
 *   placement  the crop box around it does, and Media draws none — not even a capture's hairline,
 *              which would otherwise sit inside the placement's rule as a second line. For a
 *              placement that crops every kind mechanically to a ratio of its own, where the edge
 *              is a cut the placement made rather than the object's own boundary (BlockCard, ch05
 *              amendment 5a). A cut-out's panel and shadow are unaffected: they are not edges.
 */
export type MediaEdge = 'kind' | 'placement';

export type MediaProps = {
  image: MediaImage;
  /**
   * The rendered width of this placement, as a `sizes` media list. Required, because only the
   * placement knows it and a missing `sizes` makes the browser assume 100vw — which fetches the
   * 2560 master into a 160px thumbnail. Each pattern passes its own; docs/specs/Media.md §9 lists
   * the value for every placement, derived from Section's 1240 column and 32 gutter.
   */
  sizes: string;
  fit?: MediaFit;
  /** Who draws the edge. Defaults to `kind`; `placement` only inside a crop box that rules itself. */
  edge?: MediaEdge;
  /**
   * The page's LCP image: eager, and fetched ahead of the document's other images. One per page
   * at most, and only a hero's. Everything else is lazy and decodes off the main thread.
   */
  priority?: boolean;
};

/**
 * The `srcset` for an image: every derived width plus the master, ascending, one entry per width.
 * `undefined` when there is nothing to choose between, so a single-file asset renders a plain
 * `src` and emits no `sizes` either.
 *
 * Exported because it is a pure function of the record and the specimen prints what it produced;
 * a preload link for a hero would want the same string.
 */
export function mediaSrcSet(image: MediaImage): string | undefined {
  const byWidth = new Map<number, string>();
  const add = (src: string, width: number) => {
    if (src && Number.isFinite(width) && width > 0) byWidth.set(Math.round(width), src);
  };
  for (const source of image.sources ?? []) add(source.src, source.width);
  /* The master last, so it wins a tie: if Strapi hands back a format as wide as the original,
     the original is the better file at that width. It passes the same check as a source, so a
     zero or fractional width can never write an invalid `w` descriptor. */
  add(image.src, image.width);
  if (byWidth.size < 2) return undefined;
  return [...byWidth.entries()]
    .sort(([a], [b]) => a - b)
    .map(([width, src]) => `${src} ${width}w`)
    .join(', ');
}

const PANEL_CLASS: Record<MediaPanel, string | undefined> = {
  paper: styles.panelPaper,
  'paper-deep': styles.panelPaperDeep,
  ink: styles.panelInk,
};

/* Development-only, and deliberately a warning rather than a throw: a wrong field on a CMS record
   must not take a page down, and the rendering it falls back to is the brand-correct one. */
function warn(message: string, image: MediaImage) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`Media: ${message} (${image.src})`);
  }
}

/**
 * Media — one image asset in one placement, built to docs/specs/Media.md.
 *
 * Renders a native `<img>`, or — for a cut-out on a contrast panel — that `<img>` inside the panel.
 * It owns the delivery (srcset, sizes, loading) and the edge (by kind); the PLACEMENT owns
 * everything else. Width is always the parent's: intrinsic fills the parent's inline size, fill
 * fills the parent's box. There is no className, no style and no size prop, so no placement can
 * restyle an image's edge one call site at a time.
 *
 * It reads `data-surface` through the token layer only, like every other unit, so a capture's
 * hairline is right on paper, tint, ink and blue without being told which. It cannot see the
 * surface in JavaScript, which is why "no illustration on blue" is a review rule rather than a
 * runtime guard (spec § 17 Q3).
 */
export function Media({
  image,
  sizes,
  fit = 'intrinsic',
  edge = 'kind',
  priority = false,
}: MediaProps) {
  const kind: MediaKind = image.kind ?? 'capture';
  const isCutOut = kind === 'cut-out';
  const article = kind === 'illustration' ? 'an' : 'a';

  if (!isCutOut && image.panel) {
    warn(
      `${article} ${kind} takes no panel — only a cut-out does (ch05 §2a, B4). Ignored`,
      image,
    );
  }
  if (!isCutOut && image.shadow) {
    warn(
      `${article} ${kind} takes no shadow — only a cut-out does (ch05 §2, B2). Ignored`,
      image,
    );
  }

  const panel = isCutOut ? image.panel : undefined;
  const shadow = isCutOut && image.shadow === true;
  const srcSet = mediaSrcSet(image);

  const img = (
    /* A native image rather than next/image: ruling M1 serves Strapi's own formats as a native
       srcset, with no build-time pipeline, and next/image would add one. */
    /* eslint-disable-next-line @next/next/no-img-element -- the ruled native-srcset contract (M1) */
    <img
      className={cx(
        styles.image,
        fit === 'fill' ? styles.fill : styles.intrinsic,
        edge === 'kind' && kind === 'capture' && styles.capture,
        shadow && styles.shadow,
      )}
      src={image.src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? undefined : 'async'}
      fetchPriority={priority ? 'high' : undefined}
    />
  );

  if (!panel) return img;

  /* A span rather than a div so Media stays legal inside phrasing content — a card's link, a
     caption-adjacent slot — wherever a bare <img> would be. It is display:block in the module. */
  return (
    <span className={cx(styles.panel, fit === 'fill' && styles.panelFill, PANEL_CLASS[panel])}>
      {img}
    </span>
  );
}
