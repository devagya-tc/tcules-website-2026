import { Button, Cluster, Icon, Layout, Media, Prose, type MediaImage } from '@/components';
import { cx } from '@/lib/cx';
import { PROOF_PORTRAIT } from '@/lib/image-sizes';

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
  /**
   * Visible integrity line, including "checked on". Required on every figure. When every figure in
   * the group carries the same string it renders ONCE, as the group's caption; mixed dates render
   * under their own figures.
   */
  checkedOn: string;
  /** Optional source destination. External destinations are named by the caller's route layer. */
  sourceHref?: string;
};

type ProofCompactProps = {
  /** Embedded quote treatment. Compact is quote-only by contract. */
  arrangement: 'compact';
  quote: ProofQuote;
  figures?: never;
};

type ProofDisplayProps =
  | {
      arrangement?: 'display';
      quote: ProofQuote;
      figures?: readonly ProofFigure[];
    }
  | {
      arrangement?: 'display';
      quote?: never;
      figures: readonly ProofFigure[];
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

export type ProofProps = ProofCompactProps | ProofDisplayProps;

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
    const blankFields = (['value', 'label', 'checkedOn'] as const).filter(
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
 * The portrait: small, square, radius 4, through Media as a photograph (no frame, never masked).
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

function Portrait({ portrait }: { portrait: ProofPortrait }) {
  return (
    <span className={styles.portrait}>
      <Media
        image={{ ...portrait, alt: '', kind: 'photograph' }}
        sizes={PROOF_PORTRAIT}
        fit="fill"
        edge="placement"
        focus={PORTRAIT_FOCUS}
      />
    </span>
  );
}

function Quote({ quote }: { quote: ProofQuote }) {
  const portrait = acceptPortrait(quote.portrait, quote.name);
  const role = isFilled(quote.role) ? quote.role : undefined;
  const source =
    quote.source && isFilled(quote.source.label) && isFilled(quote.source.href)
      ? quote.source
      : undefined;
  if (quote.source && !source) {
    warn(`source for "${quote.name}" needs a label and an href; omitting the link.`);
  }

  return (
    <Layout as="figure" rowGap="block" className={styles.quote}>
      <blockquote className={styles.quoteText}>
        <Prose html={quote.quoteHtml} className={styles.quoteProse} />
      </blockquote>
      {/* The figcaption is the attribution row. With a portrait, the portrait sits flush on the
          left margin, under the rule, and the text starts a bind (block, 24) to its right; without
          one, the text is indented so the name lands on the quote's first letter (ch10 B2.07). */}
      <Cluster
        as="figcaption"
        colGap="gutter"
        rowGap="text"
        align="center"
        className={cx(styles.attribution, !portrait && styles.attributionIndented)}
      >
        {/* The speaker — portrait and name never part, so they are a nowrap Cluster of their own.
            The source link is the figcaption's second child: beside the speaker while the row has
            room, beneath when it does not. Who said it, then where to check it. */}
        <Cluster nowrap colGap="block" align="start" className={styles.speaker}>
          {portrait ? <Portrait portrait={portrait} /> : null}
          <Layout rowGap="inline" className={styles.attributionText}>
            <span className={styles.name}>{quote.name}</span>
            <span className={styles.role}>
              {role ? `${role}, ${quote.company}` : quote.company}
            </span>
          </Layout>
        </Cluster>
        {source ? (
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
        ) : null}
      </Cluster>
    </Layout>
  );
}

/**
 * The one date every figure shares, or undefined when there is one figure or the dates differ.
 * Compared trimmed, so a trailing space in the CMS does not split a group that reads as one date.
 */
function sharedCheckedOn(figures: readonly ProofFigure[]): string | undefined {
  const [head, ...rest] = figures;
  if (!head || rest.length === 0) return undefined;
  const first = head.checkedOn.trim();
  return figures.every((figure) => figure.checkedOn.trim() === first) ? first : undefined;
}

function FigureList({
  figures,
  showDates,
  size,
}: {
  figures: readonly ProofFigure[];
  showDates: boolean;
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
                text seam above it. */}
            {showDates || figure.sourceHref ? (
              <Layout rowGap="tight" className={styles.metadata}>
                {showDates ? <span className={styles.checked}>{figure.checkedOn}</span> : null}
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
                  >
                    View source
                  </Button>
                ) : null}
              </Layout>
            ) : null}
          </Layout>
        </li>
      ))}
    </Layout>
  );
}

/**
 * The figure set. When every figure was checked on the same date, the date is said once: the list
 * and the date become one `figure` whose `figcaption` is that date. The caption is the group's
 * accessible name, so a screen reader announces "figure, checked on 8 August 2026" before the list
 * and the date covers every item in it programmatically, with no idref and no repeated string.
 * Mixed dates keep the per-figure line, inside each `li` beside the value it qualifies.
 */
function Figures({
  figures,
  size,
}: {
  figures: readonly ProofFigure[];
  size: ProofFigureSize;
}) {
  const shared = sharedCheckedOn(figures);

  if (!shared) return <FigureList figures={figures} showDates size={size} />;

  return (
    <Layout as="figure" rowGap="gutter" className={styles.figureGroup}>
      <FigureList figures={figures} showDates={false} size={size} />
      <figcaption className={styles.checked}>{shared}</figcaption>
    </Layout>
  );
}

/**
 * Proof — attributed client evidence, checked figures, or both, built to docs/specs/Proof.md.
 *
 * The content seam decides whether a markdown blockquote is an attributed Proof or an
 * unattributed Callout; this pattern never sniffs HTML for a name. A quote follows the site
 * blockquote (ch10 B2.07): italic serif behind a 6px rule, the attribution beneath, and an optional
 * 1:1 portrait left of it (ruling P1; the client mark of P2 was removed 30 Sep 2026). Display may render quote,
 * figures, or both — together, the quote in a 2:1 lead track beside the stacked figures — at the
 * display roles (--text-quote-lg, --text-stat-lg), and says a date every figure shares once, as
 * the set's caption (tracker 2.17). Compact embeds one quote in a reading flow and forbids figures at compile
 * time. Layout owns every relationship, Prose owns trusted inline markup, Button owns source-link
 * interaction, Media owns the portrait, and the nearest surface owns the ground.
 */
export function Proof(props: ProofProps) {
  const { arrangement = 'display', quote, figures } = props;
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

  /* Quote plus figures: the quote leads in the wide track and the figures stack in the narrow one
     beside it (2:1 from lg), so the testimonial is the moment and the numbers are its evidence.
     Below lg it is one column, the quote first; the figure tiles then reflow across the width. */
  return (
    <Layout
      columns={both ? { base: 1, lg: [2, 1] } : undefined}
      colGap={both ? 'section' : undefined}
      rowGap={both ? 'stack' : undefined}
      className={`${styles.root} ${styles[arrangement]}`}
    >
      {acceptedQuote ? <Quote quote={acceptedQuote} /> : null}
      {acceptedFigures.length > 0 ? (
        <Figures figures={acceptedFigures} size={figureSize} />
      ) : null}
    </Layout>
  );
}
