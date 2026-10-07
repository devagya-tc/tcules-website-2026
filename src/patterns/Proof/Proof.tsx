import type { ReactNode } from 'react';

import {
  BrandMark,
  Button,
  Cluster,
  Icon,
  Layout,
  Media,
  Prose,
  RatingBadge,
  type BrandMarkName,
  type MediaImage,
} from '@/components';
import { cx } from '@/lib/cx';
import { MEDIA_SPLIT, PROOF_PORTRAIT } from '@/lib/image-sizes';

import styles from './Proof.module.css';

/**
 * The speaker's portrait: the asset record without the fields Proof decides for it. A portrait is
 * a photograph by definition (ch05 §3), so there is no `kind`; it is shown beside the name it
 * depicts, so there is no `alt` (it renders as decorative, `alt=""` — see Portrait below); and a
 * photograph takes no panel or shadow. Shot square (ch05 §3); a non-square master is centre-cropped
 * to 1:1 with a development warning, never letterboxed and never masked to a circle (ch05 §6).
 */
export type ProofPortrait = Pick<MediaImage, 'src' | 'width' | 'height' | 'sources'>;

export type ProofQuote = {
  /** Trusted, content-seam-sanitised rich text. Attribution never belongs in this field. */
  quoteHtml: string;
  /** The speaker. Required: named attribution is mandatory (CS; strapi-changes.md entry 4). */
  name: string;
  /** The speaker's title. Optional (HO §4): a blank or missing role leaves no separator or gap. */
  role?: string;
  /** The client, named in the attribution line. */
  company: string;
  /** Optional 1:1 photograph beside the attribution (ruling P1). No portrait, no gap. */
  portrait?: ProofPortrait;
  /**
   * Optional link to where the quote is documented — in practice the case study it came from. It
   * sits in the attribution row beside the speaker, so the claim and the place to check it read as
   * one line (1 Oct 2026). Leave it off when the caller already shows the case beside the quote:
   * the same destination twice is noise.
   */
  source?: { label: string; href: string };
  /* No client mark (removed 30 Sep 2026, owner): the company is already named in the role line,
     and a logo under a person's name competes with the portrait beside it. */
};

export type ProofFigure = {
  /** Verbatim audited value, for example "90+" or "4.8/5". */
  value: string;
  /** What the value counts. */
  label: string;
  /** Optional source destination. External destinations are named by the caller's route layer. */
  sourceHref?: string;
};

/**
 * A third-party score, as the content seam holds it (`fixtures/ratings.ts`): Proof composes the
 * RatingBadge from it, so every testimonial that carries the score renders the same pill, a `block`
 * under the attribution (1 Oct 2026, owner: the client's words, then the market's score, as one
 * piece of evidence). A REAL rating sits only beside a real quote (visual-direction § 5.8).
 */
export type ProofRating = {
  /** As published, a string: "4.8", and "5.0" stays "5.0". */
  score: string;
  /** The platform in words, the badge's accessible name with the score. */
  platform: string;
  /** The profile the score is read from. */
  href: string;
  /** The platform's mark beside its name. */
  mark?: BrandMarkName;
  /**
   * The top of the platform's scale, as published — "5" for Clutch, G2 and Trustpilot. Rating-led
   * prints it at the score's side ("4.8 / 5"), so the numeral reads as a score out of something
   * rather than a lone number in an empty field (fix round 2, 6 Oct 2026). Default "5".
   */
  scale?: string;
  /**
   * What the score measures, in words, under the scale in rating-led. Default "Average client
   * rating" — what Clutch, G2 and Trustpilot each publish (the mean of client reviews). Pass the
   * platform's own phrase where its score is something else, such as a product score.
   */
  basis?: string;
};

/**
 * How the quote aligns in `display`. `center` is the typographic G band under a centred head
 * (§ 3.5): the quote, its attribution and the badge centred on one axis, and the quote rule — which
 * has no inline-start edge to run down — turned on its side above the quote. Presentation only.
 */
export type ProofAlign = 'start' | 'center';

type ProofCompactProps = {
  /** Embedded quote treatment. Compact is quote-only by contract. */
  arrangement: 'compact';
  quote: ProofQuote;
  figures?: never;
  /** The score, a `block` under the attribution. Real quotes only (§ 5.8). */
  rating?: ProofRating;
};

type ProofDisplayProps =
  | {
      arrangement?: 'display';
      quote: ProofQuote;
      figures?: readonly ProofFigure[];
      /** Default `start`. See `ProofAlign`. Ignored when figures share the band. */
      align?: ProofAlign;
      /** The score, a `block` under the attribution. Real quotes only (§ 5.8). */
      rating?: ProofRating;
    }
  | {
      arrangement?: 'display';
      quote?: never;
      figures: readonly ProofFigure[];
      align?: never;
      rating?: never;
      /**
       * The figures' scale. `lg` (default) is the display stat role, 54 — a figure that leads a
       * band beside its title. `xl` is --text-stat-xl, 96 / 80 / 64: a figure that IS the band's
       * one idea, set as its hero (the H band's sourced rating beside the head, kit cmp-logos).
       * Figures-only by type: beside a quote the quote is the moment and a 96 numeral would
       * outshout it.
       */
      figureSize?: ProofFigureSize;
    };

/** The figures' scale — see `figureSize`. */
export type ProofFigureSize = 'lg' | 'xl';

/**
 * G featured (§ 1.4): the speaker's portrait, 1:1 at the 5 of [5, 7] (477 at 1470), beside the
 * quote at the display role. The portrait is required — without one this is the typographic band,
 * and Proof renders `display` with a development warning rather than an empty square.
 */
type ProofFeaturedProps = {
  arrangement: 'featured';
  quote: ProofQuote;
  /**
   * The band's ask under the quote — in practice one `CtaRow` with `rule={false}`, composed by the
   * caller (a pattern does not import a pattern). It sits a `block` under the attribution, on the
   * name's indent, and the whole stack — quote, attribution, ask — stays centred on the portrait
   * (§ 3.2 rule 2). It used to stretch to the portrait and pin the row to its foot (rule 1), which
   * left a 190px void above a stranded footer (fix round 1, 6 Oct 2026): the ask is part of the
   * testimonial, so it travels with it.
   */
  footer?: ReactNode;
  /**
   * The mirror: the portrait at the END of the row from 1024, the quote at the start — [7, 5] with
   * the quote in the 7 (fix round 2, 6 Oct 2026: four featured bands down a page were one
   * silhouette). Visual only, through Layout's `reverse`, so the DOM keeps the portrait first and a
   * phone still sees the person before what they said; the portrait is decorative (`alt=""`), so
   * the two orders carry no meaning against each other. Two service pages that both use G-featured
   * take opposite sides.
   */
  reverse?: boolean;
  figures?: never;
};

/**
 * G-case (§ 3.6, owner 1 Oct: "the work first, then what the client said"): [1, 2] at `section`,
 * the case in the 381 track and the quote in the 763, the score a `block` under the attribution.
 * The quote is the display role (34), not the reading one (fix round 1): at 28 it matched the
 * card's title and neither led.
 *
 * The quote column is CENTRED on the card (page-product-design fix round 1, 7 Oct 2026), and the
 * attribution follows the quote a `block` under it. Fix round 2 had stretched the column to the
 * card and pinned the attribution to its foot, and under a three-line quote that opened a ~200 void
 * between the words and the name — the quote and who said it read as two objects. Centred, the
 * quote and its speaker are one group, and the card's height is shared as air above and below it,
 * the way a quote beside a picture sits in the references. Below 1024 the tracks stack and the
 * centring is a no-op.
 */
type ProofCaseProps = {
  arrangement: 'case';
  /**
   * The work — in practice one linked `BlockCard` (3:2 cover, a stand-in allowed: § 5.7) inside a
   * one-item `<ul>`, because a BlockCard is an `<li>`. A slot for the reason `footer` is one.
   */
  work: ReactNode;
  quote: ProofQuote;
  rating?: ProofRating;
  figures?: never;
};

/**
 * G group (§ 1.4): two or three compact quotes as peers, 3 or 2 across from 1024 at `gutter`, each
 * with its 64 portrait BESIDE the name in the attribution row, as Quantum pairs avatar and name: the
 * face and the name read as one person (fix round 1, 6 Oct 2026 — above the quote, the whole quote
 * stood between them). The attributions are pinned to the foot of the row, so peers of unequal
 * length still share one baseline; the quotes share their top. Stacked below 1024, `column` apart
 * (§ 1.2, the row seam of a borderless set).
 */
type ProofGroupProps = {
  arrangement: 'group';
  quotes: readonly [ProofQuote, ProofQuote] | readonly [ProofQuote, ProofQuote, ProofQuote];
  figures?: never;
};

/**
 * G rating-led (§ 1.4): the score is the band's large thing (§ 3.3). [5, 7] at `section`, like
 * featured, with the score where the portrait would be: the numeral at the score role (105) and
 * the platform pill under it (the RatingBadge, its score carried in the link's name), the quote at the
 * display role in the 7, the two centred on each other. Its own silhouette, not the centred typographic
 * column with a number for a rule (fix round 1). Real rating, real quote, no portrait (§ 5.8).
 */
type ProofRatingProps = {
  arrangement: 'rating';
  rating: ProofRating;
  quote: ProofQuote;
  figures?: never;
};

export type ProofProps =
  | ProofCompactProps
  | ProofDisplayProps
  | ProofFeaturedProps
  | ProofCaseProps
  | ProofGroupProps
  | ProofRatingProps;

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`Proof: ${message}`);
}

function isFilled(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function validQuote(quote: ProofQuote | undefined): quote is ProofQuote {
  if (!quote) return false;

  const blankFields = (['quoteHtml', 'name', 'company'] as const).filter(
    (field) => !isFilled(quote[field]),
  );

  if (blankFields.length > 0) {
    warn(
      `quote has blank ${blankFields.join(', ')} field${blankFields.length === 1 ? '' : 's'}; omitting the quote.`,
    );
    return false;
  }

  return true;
}

function normaliseFigures(figures: readonly ProofFigure[] | undefined): ProofFigure[] {
  if (!figures) return [];

  return figures.flatMap((figure, index) => {
    const blankFields = (['value', 'label'] as const).filter(
      (field) => !isFilled(figure[field]),
    );

    if (blankFields.length > 0) {
      warn(
        `figure ${index + 1} has blank ${blankFields.join(', ')} field${blankFields.length === 1 ? '' : 's'}; omitting the figure.`,
      );
      return [];
    }

    if (figure.sourceHref !== undefined && !isFilled(figure.sourceHref)) {
      warn(`figure ${index + 1} has a blank sourceHref; omitting the source link.`);
      return [{ ...figure, sourceHref: undefined }];
    }

    return [figure];
  });
}

function hasDimensions(asset: { width: number; height: number }): boolean {
  return asset.width > 0 && asset.height > 0 && Number.isFinite(asset.width / asset.height);
}

/** A portrait that can render, or undefined with a development warning saying why not. */
function acceptPortrait(portrait: ProofPortrait | undefined, name: string) {
  if (!portrait) return undefined;
  if (!isFilled(portrait.src) || !hasDimensions(portrait)) {
    warn(`portrait for "${name}" needs a src, width and height; omitting the portrait.`);
    return undefined;
  }
  if (portrait.width !== portrait.height) {
    warn(
      `portrait for "${name}" is ${portrait.width} × ${portrait.height}; portraits are shot square (ch05 §3). Centre-cropped to 1:1.`,
    );
  }
  return portrait;
}

/**
 * The portrait, square, through Media, as a photograph: no frame, never masked. Two sizes —
 * `compact`, 64 at radius 4, beside the name in the attribution row; `featured`, the whole 5 of
 * [5, 7] (477 at 1470) at radius 8, beside a featured quote.
 *
 * `alt=""` is deliberate. The image sits beside the speaker's name, so a text alternative could only
 * restate that name ("Portrait of Ashok Mohanty") and a screen reader would hear it twice. That is
 * ch05 §7's decorative case. The box owns the 1:1 ratio and the 4 corner
 * (--proof-portrait-radius-compact, § 5.3), so Media is told the placement rules its edge
 * (`edge="placement"`) and fills the box with a cover crop; left at `edge="kind"` it would add the
 * photograph radius, 8, inside it.
 */
/* Centre. Without it a fill crop anchors at --media-fill-position (inline start, 20% down), the
   product-UI anchor — and a non-square portrait would lose the right of the face rather than be the
   centre crop this file, the spec and the specimen all promise. A ProofPortrait carries no focal
   point of its own, so the centre is the whole answer. */
const PORTRAIT_FOCUS = { x: 0.5, y: 0.5 };

function Portrait({
  portrait,
  size = 'compact',
}: {
  portrait: ProofPortrait;
  size?: 'compact' | 'featured';
}) {
  return (
    <span className={size === 'featured' ? styles.portraitFeatured : styles.portrait}>
      <Media
        image={{ ...portrait, alt: '', kind: 'photograph' }}
        sizes={size === 'featured' ? MEDIA_SPLIT : PROOF_PORTRAIT}
        fit="fill"
        edge="placement"
        focus={PORTRAIT_FOCUS}
      />
    </span>
  );
}

/**
 * The quote's presentation, decided by the arrangement that places it — never by the caller.
 *
 *   size      `xl` the centred role (43 / 34 / 25): a typographic band's one idea, alone on the
 *             column. `lg` the display role (34 / 28 / 22) beside a portrait, a score or a case.
 *             `md` the reading role (28) among peers or in a reading flow.
 *   align     `center` sets the rule above the quote and centres every part (typographic).
 *   portrait  `inline` beside the name (compact, display, group); `none` when the arrangement
 *             shows it elsewhere (featured) or not at all.
 *   pin       the attribution pinned to the foot of a stretched figure (group peers).
 */
type QuotePresentation = {
  size: 'xl' | 'lg' | 'md';
  align?: ProofAlign;
  portrait?: 'inline' | 'none';
  pin?: boolean;
  /**
   * What travels with the attribution — the score's pill (case) — set a `block` under it inside
   * the figcaption, so a pinned attribution takes it to the foot too. Who said it, then how the
   * market rates them, as one caption.
   */
  trailing?: ReactNode;
};

/**
 * Bind a one-letter word to the word after it with a no-break space, in the text of trusted quote
 * HTML (tags untouched). A display-size quote is the band's one idea, and a line that ends on a lone
 * "I" or "a" — "seamless. I / found" (fix round 2, 6 Oct 2026) — is the ragged break a reader sees
 * first. The typesetter's rule, applied once here so no CMS editor has to type an entity.
 */
function bindShortWords(html: string): string {
  return html
    .split(/(<[^>]*>)/)
    .map((part) =>
      part.startsWith('<') ? part : part.replace(/(^|[\s(“"‘'])(I|a|A) (?=\S)/g, '$1$2\u00a0'),
    )
    .join('');
}

const SIZE_CLASS = { xl: styles.sizeXl, lg: styles.sizeLg, md: styles.sizeMd } as const;

function Quote({
  quote,
  size,
  align = 'start',
  portrait: portraitPlace = 'inline',
  pin = false,
  trailing,
}: { quote: ProofQuote } & QuotePresentation) {
  const inlinePortrait =
    portraitPlace === 'none' ? undefined : acceptPortrait(quote.portrait, quote.name);
  const centred = align === 'center';
  const role = isFilled(quote.role) ? quote.role : undefined;
  const source =
    quote.source && isFilled(quote.source.label) && isFilled(quote.source.href)
      ? quote.source
      : undefined;
  if (quote.source && !source) {
    warn(`source for "${quote.name}" needs a label and an href; omitting the link.`);
  }

  const indented = !inlinePortrait && !centred;
  /* The speaker — portrait and name never part, so they are a nowrap Cluster of their own, the
     two-line name and role centred on the 64 portrait so face and name read as one person (fix
     round 2, 6 Oct 2026: top-aligned, the text hung from the portrait's top edge over dead space). */
  const speaker = (
    <Cluster nowrap colGap="block" align="center" className={styles.speaker}>
      {inlinePortrait ? <Portrait portrait={inlinePortrait} /> : null}
      <Layout rowGap="inline" className={styles.attributionText}>
        <span className={styles.name}>{quote.name}</span>
        <span className={styles.role}>
          {role ? `${role}, ${quote.company}` : quote.company}
        </span>
      </Layout>
    </Cluster>
  );
  /* The source link: beside the speaker while the row has room, beneath when it does not. Who
     said it, then where to check it. */
  const sourceLink = source ? (
    <Button
      as="a"
      href={source.href}
      emphasis="link"
      tone="primary"
      size="md"
      extendHitArea
      icon={<Icon name="arrow-right" />}
    >
      {source.label}
    </Button>
  ) : null;
  const row = sourceLink ? (
    <Cluster
      colGap="gutter"
      rowGap="text"
      align="center"
      justify={centred ? 'center' : undefined}
    >
      {speaker}
      {sourceLink}
    </Cluster>
  ) : (
    speaker
  );

  return (
    <Layout
      as="figure"
      rowGap="block"
      justifyItems={centred ? 'center' : undefined}
      pinLast={pin}
      className={cx(styles.quote, SIZE_CLASS[size], centred && styles.centred)}
    >
      {/* Centred: the quote rule on its side, a block above the quote. Decorative. */}
      {centred ? <span className={styles.mark} aria-hidden="true" /> : null}
      <blockquote className={styles.quoteText}>
        <Prose html={bindShortWords(quote.quoteHtml)} className={styles.quoteProse} />
      </blockquote>
      {/* The figcaption is the attribution row, and the figure's last child. With a portrait, the
          portrait sits flush on the left margin, under the rule, and the text starts a bind (block,
          24) to its right; without one, the text is indented so the name lands on the quote's first
          letter (ch10 B2.07). Centred, there is no edge to land on: the row centres. With a
          `trailing` part the caption is a stack — the row, then the part a block under it, both on
          the same indent. */}
      {trailing ? (
        <Layout
          as="figcaption"
          rowGap="block"
          justifyItems={centred ? 'center' : 'start'}
          className={cx(styles.attribution, indented && styles.attributionIndented)}
        >
          {row}
          {trailing}
        </Layout>
      ) : (
        <Cluster
          as="figcaption"
          colGap="gutter"
          rowGap="text"
          align="center"
          justify={centred ? 'center' : undefined}
          className={cx(styles.attribution, indented && styles.attributionIndented)}
        >
          {speaker}
          {sourceLink}
        </Cluster>
      )}
    </Layout>
  );
}

function validRating(rating: ProofRating | undefined): rating is ProofRating {
  if (!rating) return false;
  const blank = (['score', 'platform', 'href'] as const).filter((f) => !isFilled(rating[f]));
  if (blank.length > 0) {
    warn(`rating has blank ${blank.join(', ')}; omitting the badge.`);
    return false;
  }
  return true;
}

/** The pill, composed once: every testimonial that carries the score renders the same one. */
function ratingBadge(rating: ProofRating, showScore = true) {
  return (
    <RatingBadge
      score={rating.score}
      platform={rating.platform}
      href={rating.href}
      icon={<Icon name="star" size="sm" />}
      mark={rating.mark ? <BrandMark name={rating.mark} /> : undefined}
      showScore={showScore}
      scale={showScore ? undefined : scaleOf(rating)}
    />
  );
}

/** The top of the rating's scale, "5" unless the platform publishes another. */
function scaleOf(rating: ProofRating): string {
  return isFilled(rating.scale) ? rating.scale.trim() : '5';
}

function Figures({
  figures,
  size,
}: {
  figures: readonly ProofFigure[];
  size: ProofFigureSize;
}) {
  return (
    <Layout
      as="ul"
      columns="tile"
      minTrack="sm"
      colGap="gutter"
      rowGap="block"
      justify="between"
      className={styles.figures}
    >
      {figures.map((figure, index) => (
        <li className={styles.figure} key={`${index}-${figure.value}-${figure.label}`}>
          <Layout rowGap="text">
            <Layout rowGap="tight" className={styles.valueLabel}>
              <span className={cx(styles.value, size === 'xl' && styles.valueXl)}>
                {figure.value}
              </span>
              <span className={styles.label}>{figure.label}</span>
            </Layout>
            {/* Rendered only when it holds something: an empty grid item would still take the
                text seam above it. No "checked on" date (owner, 7 Oct 2026): it was visual noise
                that added no credibility; a figure is backed by its attribution and its source. */}
            {figure.sourceHref ? (
              <Button
                as="a"
                href={figure.sourceHref}
                emphasis="link"
                tone="primary"
                size="sm"
                extendHitArea
                aria-label={`View source for ${figure.label}`}
                className={styles.source}
                icon={<Icon name="arrow-right" />}
              >
                View source
              </Button>
            ) : null}
          </Layout>
        </li>
      ))}
    </Layout>
  );
}

/**
 * Proof — attributed client evidence, figures, or both, built to docs/specs/Proof.md.
 *
 * The content seam decides whether a markdown blockquote is an attributed Proof or an unattributed
 * Callout; this pattern never sniffs HTML for a name. A quote follows the site blockquote (ch10
 * B2.07): italic serif behind a 6px rule, the attribution beneath. Six arrangements — the G family
 * of the UI kit (visual-direction § 1.4, § 3.4 G, 6 Oct 2026):
 *
 *   display   the typographic band: the quote at --text-quote-lg, or centred (`align`) at
 *             --text-quote-xl, with
 *             an optional score; or figures; or the quote in a 2:1 lead track beside them.
 *   compact   one quote at --text-quote embedded in a reading flow; figures are a compile error.
 *   featured  a 1:1 portrait at 477 beside the display quote, [5, 7] at section, an optional footer.
 *   case      the work (a BlockCard, passed in) in 381 beside the display quote in 763 — G-case.
 *   group     two or three compact quotes as peers, each portrait beside its name, feet aligned.
 *   rating    the score at --text-score over its pill, [5, 7] with the display quote.
 *
 * Layout owns every relationship, Prose owns trusted inline markup, Button owns source-link
 * interaction, Media owns the portrait, RatingBadge owns the score's pill, and the nearest surface
 * owns the ground. Slots (`work`, `footer`) take what a pattern may not import: BlockCard, CtaRow.
 */
export function Proof(props: ProofProps) {
  switch (props.arrangement) {
    case 'featured':
      return <Featured {...props} />;
    case 'case':
      return <Case {...props} />;
    case 'group':
      return <Group {...props} />;
    case 'rating':
      return <RatingLed {...props} />;
    default:
      return <Evidence {...props} />;
  }
}

/* ── display and compact ─────────────────────────────────────────────────────────── */

function Evidence(props: ProofCompactProps | ProofDisplayProps) {
  const arrangement = props.arrangement ?? 'display';
  const { quote, figures } = props;
  /* Only the figures-only member carries it; a quote beside it keeps the figures at lg. */
  const figureSize: ProofFigureSize =
    'figureSize' in props && props.figureSize && !quote ? props.figureSize : 'lg';
  const acceptedQuote = validQuote(quote) ? quote : undefined;
  const acceptedFigures = arrangement === 'compact' ? [] : normaliseFigures(figures);

  if (arrangement === 'compact' && figures !== undefined) {
    warn('compact arrangement does not accept figures; omitting the figure list.');
  }

  if (acceptedFigures.length > 4) {
    warn(
      `received ${acceptedFigures.length} valid figures; production content should contain at most four.`,
    );
  }

  if (arrangement === 'compact' && !acceptedQuote) {
    warn('compact arrangement has no valid quote; rendering nothing.');
    return null;
  }

  if (!acceptedQuote && acceptedFigures.length === 0) {
    warn('no valid quote or figures remain; rendering nothing.');
    return null;
  }

  const both = Boolean(acceptedQuote && acceptedFigures.length > 0);
  /* Centring is the typographic band's; a quote beside figures leads its track and stays start. */
  const align: ProofAlign = !both && 'align' in props && props.align ? props.align : 'start';
  const centred = align === 'center';
  if (both && 'align' in props && props.align === 'center') {
    warn('align="center" does not apply beside figures; the quote is start-aligned.');
  }

  /* Quote plus figures: the quote leads in the wide track and the figures stack in the narrow one
     beside it (2:1 from lg), so the testimonial is the moment and the numbers are its evidence.
     Below lg it is one column, the quote first; the figure tiles then reflow across the width. */
  return (
    <Layout
      columns={both ? { base: 1, lg: [2, 1] } : undefined}
      colGap={both ? 'section' : undefined}
      rowGap={both ? 'stack' : undefined}
      justifyItems={centred ? 'center' : undefined}
      className={styles.root}
    >
      {acceptedQuote ? (
        <Quote
          quote={acceptedQuote}
          size={arrangement === 'compact' ? 'md' : centred ? 'xl' : 'lg'}
          align={align}
          trailing={validRating(props.rating) ? ratingBadge(props.rating) : undefined}
        />
      ) : null}
      {acceptedFigures.length > 0 ? (
        <Figures figures={acceptedFigures} size={figureSize} />
      ) : null}
    </Layout>
  );
}

/* ── featured ───────────────────────────────────────────────────────────────────── */

function Featured({ quote, footer, reverse = false }: ProofFeaturedProps) {
  if (!validQuote(quote)) {
    warn('featured arrangement has no valid quote; rendering nothing.');
    return null;
  }
  const portrait = acceptPortrait(quote.portrait, quote.name);
  if (!portrait) {
    warn(
      `featured quote from "${quote.name}" has no portrait; rendering the typographic quote${footer ? ' with its footer' : ''}.`,
    );
    const typographic = <Evidence arrangement="display" quote={quote} />;
    return footer ? (
      <Layout rowGap="stack" className={styles.root}>
        {typographic}
        {footer}
      </Layout>
    ) : (
      typographic
    );
  }
  const copy = <Quote quote={quote} size="lg" portrait="none" />;
  /* Reversed, the template mirrors with its children — [5, 7] becomes 7fr 5fr with the portrait
     still in the 5, now at the row's end. From 1024 only: below it the row is one track and the
     portrait leads, as it does forward. */
  return (
    <Layout
      columns={{ base: 1, lg: [5, 7] }}
      reverse={reverse ? { lg: true } : undefined}
      colGap="section"
      rowGap="stack"
      align="center"
      className={styles.root}
    >
      <Portrait portrait={portrait} size="featured" />
      {footer ? (
        /* The ask a `block` under the attribution, on the name's indent (the badge's rule): the
           quote's words, who said them, and where to read more, as one stack. */
        <Layout rowGap="block" className={styles.quote}>
          {copy}
          <div className={styles.attributionIndented}>{footer}</div>
        </Layout>
      ) : (
        copy
      )}
    </Layout>
  );
}

/* ── case ───────────────────────────────────────────────────────────────────────── */

function Case({ work, quote, rating }: ProofCaseProps) {
  if (!validQuote(quote)) {
    warn('case arrangement has no valid quote; rendering nothing.');
    return null;
  }
  /* Centred on the card (`align="center"`): the quote and its attribution are one group, set in
     the middle of the card's height (see ProofCaseProps). */
  return (
    <Layout
      columns={{ base: 1, lg: [1, 2] }}
      colGap="section"
      rowGap="stack"
      align="center"
      className={styles.root}
    >
      {work}
      <Quote
        quote={quote}
        size="lg"
        trailing={validRating(rating) ? ratingBadge(rating) : undefined}
      />
    </Layout>
  );
}

/* ── group ──────────────────────────────────────────────────────────────────────── */

function Group({ quotes }: ProofGroupProps) {
  const accepted = quotes.filter((quote) => validQuote(quote));
  if (accepted.length < 2) {
    warn(`group needs two or three valid quotes (got ${accepted.length}); rendering nothing.`);
    return null;
  }
  return (
    <Layout
      as="ul"
      columns={{ base: 1, lg: accepted.length }}
      colGap="gutter"
      rowGap="column"
      className={styles.root}
    >
      {/* The row stretches every item to the tallest; the figure fills its item and pins its
          attribution to the foot, so the peers share one baseline however long each quote runs.
          Below 1024 the items stack and each is its own height, so the pin is a no-op there. */}
      {accepted.map((quote, index) => (
        <li key={`${index}-${quote.name}`} className={styles.groupItem}>
          <Quote quote={quote} size="md" pin />
        </li>
      ))}
    </Layout>
  );
}

/* ── rating-led ─────────────────────────────────────────────────────────────────── */

function RatingLed({ rating, quote }: ProofRatingProps) {
  const hasRating = validRating(rating);
  if (!validQuote(quote)) {
    warn('rating arrangement has no valid quote; rendering nothing.');
    return null;
  }
  if (!hasRating) {
    return <Evidence arrangement="display" align="center" quote={quote} />;
  }
  return (
    <Layout
      columns={{ base: 1, lg: [5, 7] }}
      colGap="section"
      rowGap="stack"
      align="center"
      className={styles.root}
    >
      {/* The score and its platform pill are one unit, a `block` apart: the number, then where
          it is read. The numeral is the eye's; the badge's link text carries the score for a
          screen reader ("Rated on Clutch, 4.8"), so the numeral is hidden from it rather than said
          twice. */}
      <Layout rowGap="block" justifyItems="start">
        {/* The score with its context at its side (fix round 2, 6 Oct 2026): "/ 5" on the
            numeral's baseline, what the number is under it. Alone, a 105 numeral over a small pill
            read as a lone figure in an empty field rather than a confident score. All of it is the
            eye's: the pill's link name says "Rated on Clutch, 4.8 out of 5". */}
        <div aria-hidden="true">
          <Cluster nowrap colGap="text" align="baseline">
            <span className={styles.score}>{rating.score}</span>
            <Layout rowGap="tight">
              <span className={styles.scoreScale}>/ {scaleOf(rating)}</span>
              <span className={styles.scoreLabel}>
                {isFilled(rating.basis) ? rating.basis : 'Average client rating'}
              </span>
            </Layout>
          </Cluster>
        </div>
        {ratingBadge(rating, false)}
      </Layout>
      <Quote quote={quote} size="lg" portrait="none" />
    </Layout>
  );
}
