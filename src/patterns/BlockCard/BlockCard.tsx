import { Button, Cluster, Icon, Layout, Media, type MediaImage } from '@/components';
import { cx } from '@/lib/cx';
import { CARD_THREE_TRACKS, CARD_TWO_TRACKS } from '@/lib/image-sizes';

import styles from './BlockCard.module.css';

/**
 * The card's image record: `Media`'s own `MediaImage` — master `src`, `alt`, derived `sources`, and
 * the `kind` that decides its edge — with the intrinsic `width` and `height` OPTIONAL.
 *
 * They are optional here, and required on `Media`, because a card never lays out by them: the
 * image fills a box whose ratio the CARD owns (`fit="fill"`), so the two numbers are only the
 * attributes on the `<img>`, which the fill rule overrides. Several view models still arrive
 * without them (spec § 17 Q15). A record with no dimensions is given the box's own proportions and
 * loses its `sources`, because a srcset needs the master's true width for its `w` descriptor and
 * a guessed one would make the browser pick the wrong file.
 */
export type BlockCardImage = Omit<MediaImage, 'width' | 'height'> & {
  width?: number;
  height?: number;
};

/**
 * The one media slot, and one closed fill: the card's cover image, nested as a record. Callers
 * cannot pass a React node, so the slot cannot acquire controls, overlays or call-site crop
 * behaviour.
 *
 * The discriminant is `type`, not `kind`, because the record carries its own `kind` (capture,
 * cut-out, illustration, photograph) and `media.kind === 'image'` beside `media.image.kind` would
 * read as one field twice — PageHero's A3, followed here for one vocabulary.
 *
 * There is no icon fill any more. Under ruling C1 the families that carry media carry a cover
 * image, and the service, audit, glossary and capability cards that used to be the icon's home are
 * media-less; ch04 wants one icon per tile in ink, and a 24px glyph heading a card is not what any
 * family is now given. It had no route use (spec § 17 Q14).
 */
export type BlockCardMedia = { type: 'image'; image: BlockCardImage };

export type BlockCardTitleElement = 'h3' | 'h4';

/**
 * Which axis the card arranges on. A PRESENTATION choice, never a CMS field.
 *
 *   vertical    the grid tile: media above copy, filling one track of a multi-column Layout.
 *   horizontal  the row: two equal tracks from md, 64 apart. With an image, media beside copy at
 *               3:2, the tile's own crop. Without one, the copy splits instead — eyebrow and title in the first track,
 *               body and cta in the second — so a text-only row is a head beside its body rather
 *               than a single column with an empty half. Either way it defaults to the `lg` size,
 *               because a row spanning the column carries more weight than a tile. This is the
 *               featured arrangement `BlockCardSet` gives its first item (ruling C3).
 */
export type BlockCardOrientation = 'vertical' | 'horizontal';

/**
 * Which side the media takes when the card is horizontal and has an image. Caller-set per card on
 * purpose: there is no alternation logic here, because a component that alternated would have to
 * know its own index and the parent already does.
 */
export type BlockCardImageSide = 'left' | 'right';

/**
 * How many tracks the card's set runs at its widest — which is all the card needs to know to state
 * its image's `sizes` (src/lib/image-sizes.ts). A card cannot see its track, so the set says.
 *
 *   2  CARD_TWO_TRACKS. The default, because it never under-fetches in a set of two, three or
 *      four tracks: at worst a 3-up card fetches the 2-up file.
 *   3  CARD_THREE_TRACKS. For a set that reaches three tracks at lg; it over-fetches below 1024,
 *      never under.
 *
 * Ignored when horizontal: the media then takes half the row, which is CARD_TWO_TRACKS's width
 * less 16px, so the featured card always reads that one.
 */
export type BlockCardTracks = 2 | 3;

/**
 * The card's type step: title and body roles together (visual-direction § 7.2, 5 Oct 2026). A
 * COMPONENT SIZE, so a t-shirt name. The card does not know its count, so the set passes it.
 *
 *   lg  h3 title, body-lg   the one featured, horizontal card
 *   md  h4 title, body      two to three cards; text cards
 *   sm  h5 title, body-sm   four to six cards across
 *
 * Defaults by orientation — `lg` when horizontal, `md` when vertical — so a caller that states
 * neither gets the arrangement's own weight. The set, not the card, decides `sm`.
 */
export type BlockCardSize = 'lg' | 'md' | 'sm';

/** One modifier per step, on the root; the module sets title and body roles under it. */
const SIZE_CLASS: Record<BlockCardSize, string | undefined> = {
  lg: styles.sizeLg,
  md: styles.sizeMd,
  sm: styles.sizeSm,
};

/** The cta label a linked card uses when the caller names none. */
const DEFAULT_CTA_LABEL = 'Read more';

/**
 * The attributes a record with no intrinsic size is given: the proportions of the box it fills,
 * restating --bcrd-media-ratio (--ratio-cover, 3/2) by hand, because TypeScript cannot read a
 * custom property. They never lay anything out — `fill` sizes the image to the box — so they are a
 * well-formed pair, not a measurement.
 */
const FILL_BOX = { width: 3, height: 2 } as const;

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
  /**
   * The optional cover image. Case studies and every insight or resource with a cover (articles,
   * videos, podcasts) carry one; service, audit, glossary and capability cards do not (ruling C1).
   */
  media?: BlockCardMedia;
  /** Heading semantics without a visual type change. Defaults to h3. */
  titleAs?: BlockCardTitleElement;
  /**
   * A non-blank destination turns the entire card into one native link. A linked card WITHOUT a
   * cover also gets its cta; one with a cover does not (29 Sep): the cover and its hover zoom
   * already say the tile navigates, and a line repeated under every tile in a grid is noise. A
   * text-only card has nothing else to say it, so it keeps the line.
   */
  href?: string;
  /**
   * The cta wording on a linked text-only card. Defaults to "Read more", which is
   * content-type-agnostic; pass a specific line where the page can name its destination. Ignored
   * without `href`, and ignored on a card with a cover, because neither renders a cta. `Button`
   * uppercases it, so pass ordinary capitalisation.
   */
  ctaLabel?: string;
  /** Arrangement axis. Defaults to the grid tile. */
  orientation?: BlockCardOrientation;
  /** Media side in the horizontal arrangement. Ignored when vertical. Defaults to left. */
  imageSide?: BlockCardImageSide;
  /** The widest track count of the card's set, for the image's `sizes`. Defaults to 2. */
  tracks?: BlockCardTracks;
  /** The type step. Defaults to `lg` when horizontal and `md` when vertical. */
  size?: BlockCardSize;
};

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`BlockCard: ${message}`);
}

/** The record `Media` receives: the caller's, with the box's proportions where it had none. */
function mediaRecord(image: BlockCardImage): MediaImage {
  if (image.width && image.height) {
    return { ...image, width: image.width, height: image.height };
  }
  return { ...image, ...FILL_BOX, sources: undefined };
}

function ImageMedia({ image, sizes }: { image: BlockCardImage; sizes: string }) {
  return (
    /* The card owns the ratio box and Media fills it: `fit="fill"` is a cover crop, anchored where
       Media anchors it, of a box the parent has already sized — which is what this wrapper is. One
       ratio in both orientations (3:2, 29 Sep), so a cover crops alike in the row and the tile.

       The box also owns the EDGE, for every kind (29 Sep, ch05 amendment 5a). A card crops every
       asset mechanically to its own ratio, so the boundary is a cut the card made, not the
       object's: the box draws one hairline, and Media is told `edge="placement"` so a capture's
       own rule does not sit inside it as a second line. A cut-out keeps its panel and shadow.

       The inner span is what zooms. It scales inside the box, so the ruled edge never moves and
       the overflow is clipped at it; scaling the <img> itself would reach into Media's element.
       Lazy is Media's default: a card is never the page's LCP. */
    <span className={styles.imageMedia}>
      <span className={styles.imageZoom}>
        <Media image={mediaRecord(image)} sizes={sizes} fit="fill" edge="placement" />
      </span>
    </span>
  );
}

/**
 * BlockCard — one borderless card, built to docs/specs/BlockCard.md.
 *
 * The root is always an <li>. A non-blank href changes the frame element and, on a card with no
 * cover, adds the cta: the linked shape has one native anchor and one focus stop, while the static
 * shape is complete without an empty action row. The title stays dark in both; a covered linked
 * card says it navigates by its hover zoom, and a text-only one by the cta.
 *
 * Layout owns the block-axis groups, the horizontal orientation's two tracks and the cta's inline
 * row; this module contains no hand-written sibling arrangement. The card knows nothing about its
 * siblings: whether it is featured is the set's decision (`BlockCardSet`), which it expresses by
 * passing `orientation`.
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
  tracks = 2,
  size,
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

  const image = media?.type === 'image' ? media.image : undefined;
  const hasImage = image !== undefined && image.src.trim().length > 0;
  if (image !== undefined && !hasImage) {
    warn('image media received a blank src; omitting the media.');
  }

  const horizontal = orientation === 'horizontal';
  const step = size ?? (horizontal ? 'lg' : 'md');

  const imageNode = hasImage ? (
    <ImageMedia
      image={image}
      sizes={horizontal || tracks === 2 ? CARD_TWO_TRACKS : CARD_THREE_TRACKS}
    />
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
     here because Button sizes the glyph it contains and ignores one that is passed.

     The Cluster is what keeps the cta at the copy's inline start. A grid item is blockified, so the
     Button's `inline-flex` would become `flex` and take the whole track, centring its label; a
     Cluster starts its items. No gap is stated because there is one child. */
  const cta =
    destination && !imageNode ? (
      <Cluster>
        <Button as="span" emphasis="link" tone="primary" icon={<Icon name="arrow-right" />}>
          {label}
        </Button>
      </Cluster>
    ) : null;

  const eyebrowNode = hasEyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null;
  const titleNode = <Title className={styles.title}>{title}</Title>;
  const bodyNode = hasBody ? <p className={styles.body}>{body}</p> : null;

  /* The copy: eyebrow, title and body as one group at `text` (16), then the cta a block (24) below
     it. 16 is one step under the section head's 24, so a card reads as a smaller unit of the same
     system (visual-direction § 1.1, S2). It was `tight` (8): three rows at one step have no
     hierarchy, and a 12px label 8px over a 28px serif read as cramped. */
  const content = (
    <Layout rowGap="block" className={styles.content}>
      <Layout rowGap="text">
        {eyebrowNode}
        {titleNode}
        {bodyNode}
      </Layout>
      {cta}
    </Layout>
  );

  /* Three arrangements, one anatomy. Every one is a Layout; none is the frame's own block flow.

     Horizontal with an image: two equal tracks, media and copy centred against each other, 64
     apart. Both seams are stated because Layout defaults neither: `columns={[1, 1]}` collapses to
     one track below md, and the rowGap is what the collapsed card uses in place of the column
     gutter. Below that boundary `imageSide` describes nothing, so DOM order decides and a
     right-side card reads copy-then-image on a phone.

     Horizontal without one: the same two tracks, with the COPY split across them — the head
     (eyebrow and title) in the first, the body and cta in the second, top-aligned so the title's
     first line and the body's sit on one line. The row reads as a head beside its body, the
     arrangement ContentSection uses a level up, rather than one text column with a void beside
     it. It collapses to the same order as a vertical card.

     Vertical: media above copy at `--gap-block`. The image is edge-to-edge and the copy is flush to
     it, so this rowGap IS the image-to-copy relationship. */
  let frameContent;
  if (horizontal && imageNode) {
    frameContent = (
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
    );
  } else if (horizontal) {
    frameContent = (
      <Layout columns={[1, 1]} colGap="column" rowGap="text" align="start">
        <Layout rowGap="text" className={styles.content}>
          {eyebrowNode}
          {titleNode}
        </Layout>
        <Layout rowGap="block" className={styles.content}>
          {bodyNode}
          {cta}
        </Layout>
      </Layout>
    );
  } else {
    frameContent = (
      <Layout rowGap="block">
        {imageNode}
        {content}
      </Layout>
    );
  }

  return (
    <li className={cx(styles.root, SIZE_CLASS[step])}>
      {destination ? (
        /* The attribute is Button's published contract, not a hook of this component's own: it
           declares that this anchor's hover, focus-visible and pressed states are the states of
           every link Button inside it. Without it the cta would sit at rest forever. Emitted only
           when there is a cta: a covered card contains no Button for it to address. */
        <a
          className={cx(styles.frame, styles.link)}
          href={destination}
          data-btn-link-group={cta ? true : undefined}
        >
          {frameContent}
        </a>
      ) : (
        <div className={styles.frame}>{frameContent}</div>
      )}
    </li>
  );
}
