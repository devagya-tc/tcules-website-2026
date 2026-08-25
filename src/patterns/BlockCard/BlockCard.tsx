import { Button, Icon, Layout, type IconName } from '@/components';
import { cx } from '@/lib/cx';

import styles from './BlockCard.module.css';

/**
 * One optional media slot with two deliberately closed fills. Callers cannot pass a React node,
 * so the slot cannot acquire controls, overlays or call-site crop behaviour.
 */
export type BlockCardMedia =
  { kind: 'icon'; name: IconName } | { kind: 'image'; src: string; alt: string };

export type BlockCardTitleElement = 'h3' | 'h4';

/**
 * Which axis the card arranges on. `vertical` is the grid tile: media above copy, filling one
 * track of a multi-column Layout. `horizontal` is the stacked row: media beside copy in two equal
 * tracks, for lists of a few substantial items rather than a grid of many.
 */
export type BlockCardOrientation = 'vertical' | 'horizontal';

/**
 * Which side the media takes when the card is horizontal. Caller-set per card on purpose: there is
 * no alternation logic here, because a component that alternated would have to know its own index
 * and the parent already does.
 */
export type BlockCardImageSide = 'left' | 'right';

/** The cta label a linked card uses when the caller names none. */
const DEFAULT_CTA_LABEL = 'Read more';

/**
 * A closed card record. Grid geometry, surface and action rendering all stay outside the public
 * API: the parent owns the grid, the nearest Section owns the surface, and BlockCard owns its
 * optional whole-card link and the cue that names it.
 */
export type BlockCardProps = {
  /** Required card heading. Whitespace-only values render nothing and warn in development. */
  title: string;
  /** One supporting paragraph. Whitespace-only values omit the paragraph and warn. */
  body: string;
  /**
   * One optional quiet label above the title — a client, a category, a content type, a kicker.
   * A plain string rather than a structured record: what belongs here varies by page, so the
   * caller composes the line and the card only renders it.
   */
  eyebrow?: string;
  /** Optional decorative icon or BlockCard-owned image. */
  media?: BlockCardMedia;
  /** Heading semantics without a visual type change. Defaults to h3. */
  titleAs?: BlockCardTitleElement;
  /** A non-blank destination turns the entire card into one native link and adds its cta. */
  href?: string;
  /**
   * The cta wording on a linked card. Defaults to "Read more", which is content-type-agnostic;
   * pass a specific line ("Read the ConnectX case") where the page can name its destination.
   * Ignored without `href`, because there is nothing for it to describe. `Button` uppercases it,
   * so pass ordinary capitalisation.
   */
  ctaLabel?: string;
  /** Arrangement axis. Defaults to the grid tile. */
  orientation?: BlockCardOrientation;
  /** Media side in the horizontal arrangement. Ignored when vertical. Defaults to left. */
  imageSide?: BlockCardImageSide;
};

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`BlockCard: ${message}`);
}

function IconMedia({ name }: { name: IconName }) {
  return (
    <span className={styles.iconMedia}>
      <Icon name={name} size="xl" />
    </span>
  );
}

function ImageMedia({ src, alt, wide }: { src: string; alt: string; wide: boolean }) {
  return (
    <span className={cx(styles.imageMedia, wide && styles.imageMediaHorizontal)}>
      {/* The accepted contract owns a native image and its loading policy. `alt` remains required,
          including an intentional empty string for decorative imagery. Intrinsic dimensions encode
          the vertical 3:2 ratio; the horizontal card's 4:3 crop comes from the wrapper, and the
          rendered image always fills the available inline size either way. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- accepted native-image contract */}
      <img
        className={styles.image}
        src={src}
        alt={alt}
        width={480}
        height={320}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}

/**
 * BlockCard — one borderless card, built to docs/specs/BlockCard.md.
 *
 * The root is always an <li>. A non-blank href changes only the frame element and adds the cta:
 * the linked shape has one native anchor and one focus stop, while the static shape is complete
 * without an empty action row. The title stays dark in both — the cta, not the heading, carries
 * the link colour.
 *
 * Layout owns the block-axis groups, the horizontal orientation's two tracks and the cta's inline
 * row; this module contains no hand-written sibling arrangement.
 */
export function BlockCard({
  title,
  body,
  eyebrow,
  media,
  titleAs: Title = 'h3',
  href,
  ctaLabel,
  orientation = 'vertical',
  imageSide = 'left',
}: BlockCardProps) {
  if (title.trim().length === 0) {
    warn('title is blank; rendering nothing.');
    return null;
  }

  const hasBody = body.trim().length > 0;
  if (!hasBody) warn(`body is blank for ${JSON.stringify(title)}; omitting the paragraph.`);

  const hasEyebrow = eyebrow !== undefined && eyebrow.trim().length > 0;
  if (eyebrow !== undefined && !hasEyebrow) {
    warn(`eyebrow is blank for ${JSON.stringify(title)}; omitting the label.`);
  }

  const destination = href?.trim() ? href : undefined;

  const image = media?.kind === 'image' ? media : undefined;
  const hasImage = image !== undefined && image.src.trim().length > 0;
  if (image !== undefined && !hasImage) {
    warn('image media received a blank src; omitting the media.');
  }

  /* The horizontal arrangement needs something to put in its media track, so it is the image that
     earns the second column — not the prop on its own. An icon is a mark rather than a picture and
     stays inside the copy stack where it sits vertically, and a card with no media at all has no
     second track to fill; both fall back to the single-column stack rather than rendering a row
     with an empty half. */
  const isRow = orientation === 'horizontal' && hasImage;

  const imageNode = hasImage ? (
    <ImageMedia src={image.src} alt={image.alt} wide={isRow} />
  ) : null;

  const label = ctaLabel?.trim() ? ctaLabel : DEFAULT_CTA_LABEL;
  if (ctaLabel !== undefined && ctaLabel.trim().length === 0) {
    warn(`ctaLabel is blank for ${JSON.stringify(title)}; using ${JSON.stringify(label)}.`);
  }

  /* The cta is the shipped link Button, not a bespoke cue. Button owns the type, the case, the
     label-to-glyph seam, the trailing glyph's size, the three colour steps per surface and the
     underline wipe — so the card describes what the control IS and stops restating how it looks.

     `as="span"` is what keeps the single-anchor contract: the whole tile already navigates, so a
     nested <button> or <a> would be invalid markup and a second focus stop for one destination. A
     span still receives `.link` and `.live`, so it keeps the complete link treatment, and Button
     emits neither `type` nor `tabIndex` for a non-button tag, so it stays out of the tab order.

     A span is also never itself hovered, focused or pressed, which is what `data-btn-link-group`
     on the frame below answers: it hands the card's own states to the Button. Icon takes no size
     here because Button sizes the glyph it contains and ignores one that is passed. */
  const cta = destination ? (
    <Button as="span" emphasis="link" tone="primary" icon={<Icon name="arrow-right" />}>
      {label}
    </Button>
  ) : null;

  const content = (
    <Layout rowGap="block" className={styles.content}>
      {media?.kind === 'icon' ? <IconMedia name={media.name} /> : null}
      <Layout rowGap="tight">
        {hasEyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
        <Title className={styles.title}>{title}</Title>
        {hasBody ? <p className={styles.body}>{body}</p> : null}
      </Layout>
      {cta}
    </Layout>
  );

  /* Two arrangements, one anatomy. Both are a Layout because both are arrangements; neither is the
     frame's own block flow.

     Horizontal takes two equal tracks with the media and copy centred against each other. Both
     seams are stated because Layout defaults neither: `columns={[1, 1]}` collapses to one track
     below md, and the rowGap is what the collapsed card uses in place of the column gutter. Below
     that boundary `imageSide` describes nothing, so DOM order decides and a right-side card reads
     copy-then-image on a phone.

     Vertical stacks media above copy at the same `--gap-block`. The image is edge-to-edge and the
     copy is flush to it, so this rowGap IS the image-to-copy relationship — it used to be the
     content block's own padding, which is not where a distance between two boxes belongs. */
  const frameContent = isRow ? (
    <Layout columns={[1, 1]} colGap="column" rowGap="block" align="center">
      {imageSide === 'right' ? (
        <>
          {content}
          {imageNode}
        </>
      ) : (
        <>
          {imageNode}
          {content}
        </>
      )}
    </Layout>
  ) : (
    <Layout rowGap="block">
      {imageNode}
      {content}
    </Layout>
  );

  return (
    <li className={styles.root}>
      {destination ? (
        /* The attribute is Button's published contract, not a hook of this component's own: it
           declares that this anchor's hover, focus-visible and pressed states are the states of
           every link Button inside it. Without it the cta would sit at rest forever. */
        <a className={cx(styles.frame, styles.link)} href={destination} data-btn-link-group>
          {frameContent}
        </a>
      ) : (
        <div className={styles.frame}>{frameContent}</div>
      )}
    </li>
  );
}
