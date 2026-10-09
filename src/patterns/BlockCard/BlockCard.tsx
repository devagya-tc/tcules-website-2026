import type { ComponentProps } from 'react';

import {
  Button,
  Cluster,
  Icon,
  type IconName,
  Layout,
  Media,
  type MediaImage,
  Texture,
  TextureShape,
} from '@/components';
import { cx } from '@/lib/cx';
import { CARD_THREE_TRACKS, CARD_TWO_TRACKS, FULL_COLUMN } from '@/lib/image-sizes';

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
 * a guessed one would make the browser pick the wrong file. It is also flagged `placeholderSize`,
 * so Media reports no master pixels for it to the resolution gate.
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
 *
 * `texture` is the one cover the card draws itself (cmp-feature, 6 Oct 2026): the Tcules pixel grid
 * (the Texture primitive) through one of three blurred fields, inside the same ruled box, with the
 * card's `icon` — if it has one — centred on it in blue. It is the stand-in for an ARTEFACT with no
 * cover yet (a resource, a template, a checklist): a stock photograph of sticky notes said nothing
 * about the thing, and the texture is the brand's own surface (visual-direction § 6). `recipe`
 * picks the field; BlockCardSet assigns them in order so three neighbours never repeat. No type is
 * ever drawn on it.
 */
export type BlockCardTextureRecipe = 0 | 1 | 2;
export type BlockCardMedia =
  | { type: 'image'; image: BlockCardImage }
  | { type: 'texture'; recipe?: BlockCardTextureRecipe };

/**
 * The title's element. `h2` exists for one case: a set that IS the page's list, directly under the
 * page's h1 with no band heading between them (the case-study index, `/case-studies`). There the
 * cards are the page's sections, and an h3 under an h1 skips a level (axe heading-order).
 */
export type BlockCardTitleElement = 'h2' | 'h3' | 'h4';

/**
 * The crop a cover takes (visual-direction § 1.4 rule 1, 6 Oct 2026). A presentation choice the SET
 * makes, because it depends on the count:
 *
 *   cover  3:2   one or two cards, and the horizontal arrangement. The default.
 *   wide   16:9  a set of three or more across. At 392 a 3:2 cover is 261 tall and the band runs
 *                past the fold; 16:9 is 221, which is what § 1.4's Card-3 (381) is built on.
 *   panorama  21:9  the tall lead of a spotlight set (BlockCardSet `lead="beside"`): 802 wide in
 *                the 2:1 track, where 16:9 would be 451 and put the band past the fold.
 *   double  2:1 from 1024, 16:9 below   the wide lead of BlockCardSet `lead="wide"`, in the 2fr of
 *   square  1:1 from 1024, 16:9 below   [2, 1, 1]; its companions take `square`. 2:1 of a 2fr track
 *                is 1:1 of a 1fr one, so the row's covers share one height at every width. Below
 *                1024 the row is the ordinary set, so both are its 16:9. The ratio follows the
 *                arrangement, and the arrangement changes at 1024 (Media's `{ base, lg }` rule).
 *   headshot  1:1 at EVERY width   a person's face (page-showcase fix round 2, 7 Oct 2026). A
 *                square portrait set 16:9 cut heads at the hat and the chin at every width; the
 *                headshot keeps the source's own square, so the face is never the crop's casualty.
 *                Composed by the caller in its own Layout; BlockCardSet's count rule never picks it.
 */
export type BlockCardRatio = 'cover' | 'wide' | 'panorama' | 'double' | 'square' | 'headshot';

/**
 * How a WHOLE-CARD link says it navigates. One cue per card, never both.
 *
 *   title  the title itself (owner, 7 Oct 2026): no glyph at rest, and on hover and focus the
 *          title takes the accent ink (and a cover leans in). It replaced `arrow`, a blue arrow
 *          after the title's last word: on nearly every card in the kit it read as bulky, and the
 *          whole card is already the link. ListCard's linked items answer the same way.
 *   cta    a link-style action under the copy ("Read more", or `ctaLabel`), blue at rest, with its
 *          arrow; the title stays dark. The per-card CTA of § 1.4 (+64: 24 + a 40 row). For a card
 *          whose action is NOT obvious from its title; a card whose title names its destination
 *          needs none.
 *
 *   download  the cta again, with the download glyph and "Download" (or `ctaLabel`): a resource
 *          that is a file says so before it is opened (M, cmp-feature 6 Oct 2026). Pair it with
 *          `meta` ("PDF · 12 pages"), which sits beside it on the action row.
 *
 * Defaults: `title` on a card with a cover or an icon, `cta` on a text-only card — the shape every
 * live route already renders. A feature set states it for the whole set (BlockCardSet `cue`).
 */
export type BlockCardCue = 'title' | 'cta' | 'download';

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

/** One modifier per crop, on the image box; the module reads the ratio token under it. */
const RATIO_CLASS: Record<BlockCardRatio, string | undefined> = {
  cover: undefined,
  wide: styles.wide,
  panorama: styles.panorama,
  double: styles.double,
  square: styles.square,
  headshot: styles.headshot,
};

/**
 * The three texture fields, in TextureShape's own terms (percent of the cover, Figma blur). Each
 * leaves the grid strongest in a different region, so a row of three stand-ins reads as three
 * covers of one family rather than one cover thrice: a glow off the top end, a bank across the
 * foot, a field off the start edge.
 */
const TEXTURE_RECIPES: Record<
  BlockCardTextureRecipe,
  readonly ComponentProps<typeof TextureShape>[]
> = {
  /* Fix round 2 (6 Oct 2026): the fields were blurred 60 to 70 inside a box 220 tall, so the grid
     never reached full strength anywhere and the cover read as an empty frame — a placeholder. Each
     field is now a HARD-EDGED block of the grid at full strength: the brand's pixel geometry, a
     panel, a band and a step, set clear of the foot-start corner the glyph sits in. A blurred edge
     at this size only ever showed the fade. */
  0: [{ top: 0, right: 0, width: '58%', height: '100%', kind: 'rect', blur: 0 }],
  1: [{ top: 0, left: 0, width: '100%', height: '40%', kind: 'rect', blur: 0 }],
  2: [
    { top: 0, right: 0, width: '36%', height: '100%', kind: 'rect', blur: 0 },
    { top: 0, right: '36%', width: '28%', height: '46%', kind: 'rect', blur: 0 },
  ],
};

/** An index numeral, two digits: 1 → "01". The mono index voice ListCard's numbered rows use. */
const indexLabel = (value: number) => String(value).padStart(2, '0');

/** The cta label a linked card uses when the caller names none. */
const DEFAULT_CTA_LABEL = 'Read more';

/** The `download` cue's label when the caller names none. */
const DOWNLOAD_LABEL = 'Download';

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
  /**
   * One supporting paragraph. Whitespace-only values omit the paragraph and warn. Optional: a card
   * whose description is said by something beside it — the case card in Proof's G-case, where the
   * quote is the description (owner, 7 Oct 2026) — leaves it off, and no warning is raised.
   */
  body?: string;
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
   * A non-blank destination turns the entire card into one native link, which says it navigates by
   * ONE cue (`cue`): its title, which takes the accent on hover and focus, or a link-style cta under
   * the copy. By default a card with a cover or an icon is title-cued and a text-only card takes the
   * cta.
   */
  href?: string;
  /**
   * The cta wording when the card's cue is `cta`. Defaults to "Read more", which is
   * content-type-agnostic; pass a specific line where the page can name its destination. Ignored
   * without `href` and under the title cue. `Button` uppercases it, so pass ordinary capitalisation.
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
  /** The cover's crop. Defaults to `cover` (3:2). Ignored when horizontal, which is always 3:2. */
  ratio?: BlockCardRatio;
  /**
   * A Solar Bold glyph on the title's first line of a card with NO cover — the icon card of C-icon.
   * Sized to the title beside it, from --bcrd-icon-size (owner, 7 Oct 2026: the 32 glyph heading
   * the card was far too big). Blue, because icons carry the foreground accent (§ 4.2). Ignored
   * when the card has a cover: a card has one object at its head, never two.
   */
  icon?: IconName;
  /**
   * An index numeral above the title, set as `01`, `02` … in mono, blue (§ 4.2: index numerals
   * carry the accent). The text card's head (§ 3.1: hairline, 24, then an index or an eyebrow).
   * Usually passed by BlockCardSet `numbered`, which knows each card's position.
   */
  index?: number;
  /** How a linked card says it navigates. See `BlockCardCue`. Ignored without `href`. */
  cue?: BlockCardCue;
  /**
   * The cover takes the card's spare height when the card is stretched taller than its own
   * content, never dropping below its ratio (Layout `fillFirst`). A set's decision, for the one
   * card stretched to a taller neighbour: the spotlight's lead beside its two notes. Vertical
   * cards with a cover only; ignored otherwise.
   */
  grow?: boolean;
  /**
   * One short format line for an artefact — "PDF · 12 pages", "Template · Figma" — in the mono
   * label voice, after the copy: on the action row beside a `download` or `cta` cue, or on its own
   * row when the card has none. Facts about the file, never a second description.
   */
  meta?: string;
};

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`BlockCard: ${message}`);
}

/** The record `Media` receives: the caller's, with the box's proportions where it had none. */
function mediaRecord(image: BlockCardImage): MediaImage {
  if (image.width && image.height) {
    return { ...image, width: image.width, height: image.height };
  }
  return { ...image, ...FILL_BOX, sources: undefined, placeholderSize: true };
}

/** Kinds a cover crop would damage: shown whole, centred, with air inside the ruled box. */
const CONTAINED_KINDS: ReadonlySet<string> = new Set(['illustration', 'cut-out']);

function ImageMedia({
  image,
  sizes,
  ratio,
}: {
  image: BlockCardImage;
  sizes: string;
  ratio: BlockCardRatio;
}) {
  /* An illustration or a cut-out is not cropped (cmp-feature, 6 Oct 2026): the cover crop took the
     label off the top of the drawing and the run button off the part. `contain` shows the whole
     object at the largest size that fits, and the box's inset gives it the air a lifted part needs
     — a cut-out cut at the frame edge reads as a bad capture. A photograph and a capture still
     cover-crop: a photograph is atmosphere, and a capture is supplied cropped to its region. */
  const contained = CONTAINED_KINDS.has(image.kind ?? 'capture');
  return (
    /* The card owns the ratio box and Media fills it: `fit="fill"` is a cover crop, anchored where
       Media anchors it, of a box the parent has already sized — which is what this wrapper is. One
       ratio per card, set by its set: 3:2 for one or two and in the row, 16:9 for three or more
       across (§ 1.4 rule 1, 6 Oct 2026).

       The box also owns the EDGE, for every kind (29 Sep, ch05 amendment 5a). A card crops every
       asset mechanically to its own ratio, so the boundary is a cut the card made, not the
       object's: the box draws one hairline, and Media is told `edge="placement"` so a capture's
       own rule does not sit inside it as a second line. A cut-out keeps its panel and shadow.

       The inner span is what zooms. It scales inside the box, so the ruled edge never moves and
       the overflow is clipped at it; scaling the <img> itself would reach into Media's element.
       Lazy is Media's default: a card is never the page's LCP. */
    <span className={cx(styles.imageMedia, RATIO_CLASS[ratio], contained && styles.contained)}>
      <span className={styles.imageZoom}>
        <Media
          image={mediaRecord(image)}
          sizes={sizes}
          fit={contained ? 'contain' : 'fill'}
          edge="placement"
        />
      </span>
    </span>
  );
}

/**
 * The texture cover: the same ruled box, the pixel grid through one recipe's field, and the card's
 * glyph set large in its foot-start corner (fix round 2: a 48 glyph centred in a 390 well read as a
 * placeholder, not a cover). The box is the Texture's positioned, isolated ancestor (`.textureCover`), so
 * the field fills exactly the box and sits beneath the glyph. Decoration, like every cover here.
 */
function TextureMedia({
  recipe = 0,
  ratio,
  icon,
}: {
  recipe?: BlockCardTextureRecipe;
  ratio: BlockCardRatio;
  icon?: IconName;
}) {
  return (
    <span className={cx(styles.imageMedia, RATIO_CLASS[ratio])} aria-hidden="true">
      <span className={styles.imageZoom}>
        <span className={styles.textureCover}>
          <Texture>
            {TEXTURE_RECIPES[recipe].map((shape, i) => (
              <TextureShape key={i} {...shape} />
            ))}
          </Texture>
          {icon ? (
            <span className={styles.coverGlyph}>
              <Icon name={icon} size="xl" />
            </span>
          ) : null}
        </span>
      </span>
    </span>
  );
}

/**
 * BlockCard — one borderless card, built to docs/specs/BlockCard.md.
 *
 * The root is always an <li>. A non-blank href changes the frame element and, on a card with no
 * cover, adds the cta: the linked shape has one native anchor and one focus stop, while the static
 * shape is complete without an empty action row. A covered linked card says it navigates by its
 * title, which goes blue as the cover zooms; a text-only one by the cta, under a title that stays
 * dark.
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
  ratio = 'cover',
  icon,
  index,
  cue,
  meta,
  grow = false,
}: BlockCardProps) {
  if (title.trim().length === 0) {
    warn('title is blank; rendering nothing.');
    return null;
  }

  const hasBody = body !== undefined && body.trim().length > 0;
  if (body !== undefined && !hasBody) warn(`body is blank for ${JSON.stringify(title)}; omitting the paragraph.`);

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

  const coverRatio: BlockCardRatio = horizontal ? 'cover' : ratio;
  const imageNode = hasImage ? (
    <ImageMedia
      image={image}
      sizes={
        coverRatio === 'panorama'
          ? FULL_COLUMN
          : horizontal || tracks === 2
            ? CARD_TWO_TRACKS
            : CARD_THREE_TRACKS
      }
      ratio={coverRatio}
    />
  ) : media?.type === 'texture' ? (
    /* The card's icon, if any, moves onto the texture: one head object, never two. */
    <TextureMedia recipe={media.recipe} ratio={coverRatio} icon={icon} />
  ) : null;

  /* The icon heads a card with no cover; a cover wins, because a card has one head object. */
  const iconNode =
    icon !== undefined && !imageNode ? (
      <span className={styles.icon}>
        <Icon name={icon} />
      </span>
    ) : null;

  /* A card with no cover — a text card or an icon card — takes a hairline at its own top edge, the
     width of the card (visual-direction § 3.1, 6 Oct 2026). It stands in for the top edge an image
     would give; the set's 32 gutter breaks it between cards, so a row reads as three objects and
     not as a table. It is a row of the frame's Layout, so the 24 under it is that Layout's `block`
     seam — the image-to-copy distance, which is exactly the relationship it replaces. The icon card
     took it when the box went (owner, 7 Oct 2026: "the boxed card variant goes"): the rule is what
     separates six open icon cards, as it already does ListCard's icon tile. Decoration: hidden. */
  const textOnly = !imageNode && !iconNode;
  const ruleNode = !imageNode ? <span className={styles.textRule} aria-hidden="true" /> : null;

  /* Which cue a linked card carries. The caller's, or the shape's default: a covered or icon card
     is title-cued, a text-only card carries the cta (every live route's shape). */
  const cueKind: BlockCardCue | undefined = destination
    ? (cue ?? (textOnly ? 'cta' : 'title'))
    : undefined;

  const download = cueKind === 'download';
  const label = ctaLabel?.trim() ? ctaLabel : download ? DOWNLOAD_LABEL : DEFAULT_CTA_LABEL;
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
     Cluster starts its items. No gap is stated because there is one child.

     The tone is primary: a text link is blue at rest, label and arrow (visual-direction § 4, owner
     6 Oct 2026 — blue is the recurring foreground accent; fdn-colour's neutral tone was reversed). */
  const hasMeta = meta !== undefined && meta.trim().length > 0;
  const metaNode = hasMeta ? <span className={styles.meta}>{meta}</span> : null;
  /* The action row: the cta, with the format line a `block` after it on the same row when there is
     one, so "DOWNLOAD   PDF · 12 PAGES" reads as one statement about the file. */
  const ctaButton =
    cueKind === 'cta' || download ? (
      <Button
        as="span"
        emphasis="link"
        tone="primary"
        icon={<Icon name={download ? 'download' : 'arrow-right'} />}
      >
        {label}
      </Button>
    ) : null;
  const cta =
    ctaButton || metaNode ? (
      <Cluster colGap="block" rowGap="tight" align="center">
        {ctaButton}
        {metaNode}
      </Cluster>
    ) : null;

  const hasIndex = index !== undefined && Number.isFinite(index);
  const indexNode = hasIndex ? <span className={styles.index}>{indexLabel(index)}</span> : null;
  const eyebrowText = hasEyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null;
  /* The label line: an index, an eyebrow, or both on one line a `block` apart — a numeral and a
     category are two labels, and the 24 keeps them from reading as one string. */
  const eyebrowNode =
    indexNode && eyebrowText ? (
      <Cluster colGap="block" rowGap="tight" align="baseline">
        {indexNode}
        {eyebrowText}
      </Cluster>
    ) : (
      (indexNode ?? eyebrowText)
    );
  /* A title-cued card's title is its affordance (owner, 7 Oct 2026): no glyph after it — the blue
     arrow that stood here on nearly every card read as bulky — and on hover and focus it takes the
     accent ink while a cover leans in. The whole card is the one anchor, so the title needs no
     mark at rest to be the link; a card whose action is not obvious from its title takes the cta. */
  const cued = cueKind === 'title';
  const titleNode = <Title className={cx(styles.title, cued && styles.cued)}>{title}</Title>;
  const bodyNode = hasBody ? <p className={styles.body}>{body}</p> : null;

  /* The copy: eyebrow, title and body as one group at `text` (16), then the cta a block (24) below
     it. 16 is one step under the section head's 24, so a card reads as a smaller unit of the same
     system (visual-direction § 1.1, S2). It was `tight` (8): three rows at one step have no
     hierarchy, and a 12px label 8px over a 28px serif read as cramped. */
  /* An icon card sets its glyph on the title's FIRST LINE, before it, at every width (owner, 7 Oct
     2026: size each icon to the card title beside it). The glyph's box is the title's line box
     (.icon), so `start` alignment is first-line centring without measuring anything; the auto
     track is the glyph's own width and `tight` is the icon-to-label step. An eyebrow or index, if
     any, labels the pair from above. */
  const titleRow = iconNode ? (
    <Layout columns={{ base: ['auto', 1] }} colGap="tight" align="start">
      {iconNode}
      {titleNode}
    </Layout>
  ) : (
    titleNode
  );
  const head = (
    <>
      {eyebrowNode}
      {titleRow}
    </>
  );
  const content = (
    <Layout rowGap="block" className={styles.content}>
      <Layout rowGap="text">
        {head}
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
      <Layout rowGap="block">
        {ruleNode}
        <Layout columns={[1, 1]} colGap="column" rowGap="text" align="start">
          <Layout rowGap="text" className={styles.content}>
            {head}
          </Layout>
          <Layout rowGap="block" className={styles.content}>
            {bodyNode}
            {cta}
          </Layout>
        </Layout>
      </Layout>
    );
  } else {
    /* `grow`: the stack fills the stretched frame and its first row — the cover — takes what is
       spare, so a lead beside taller notes ends level with them instead of over a dead strip. */
    const grows = grow && imageNode !== null;
    if (cta && !grows) {
      /* An action row sits on the card's FOOT (§ 3.1 item 4, "pinLast for the CTA"; owner, 7 Oct
         2026: "a link button at its foot"). The stack is flattened so the cta is its own last row,
         and `pinLast` gives that row the spare height of a card stretched to its row's tallest, so
         every action in a row sits on one line. The seams are the ones the nested stack had: `block` from the cover or rule to
         the copy, and from the copy to the cta. */
      frameContent = (
        <Layout rowGap="block" pinLast className={styles.grow}>
          {imageNode}
          {ruleNode}
          <Layout rowGap="text" className={styles.content}>
            {head}
            {bodyNode}
          </Layout>
          {cta}
        </Layout>
      );
    } else {
      frameContent = (
        <Layout rowGap="block" fillFirst={grows} className={grows ? styles.grow : undefined}>
          {imageNode}
          {ruleNode}
          {content}
        </Layout>
      );
    }
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
          data-btn-link-group={ctaButton ? true : undefined}
        >
          {frameContent}
        </a>
      ) : (
        <div className={styles.frame}>{frameContent}</div>
      )}
    </li>
  );
}
