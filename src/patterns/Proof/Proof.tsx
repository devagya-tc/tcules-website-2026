import {
  Button,
  ClientMark,
  Cluster,
  Layout,
  Media,
  Prose,
  type ClientMarkProps,
  type MediaImage,
} from '@/components';
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

/**
 * The client's mark: ClientMark's asset fields. The NAME is not here because it is the quote's
 * `company` — one field, so the mark and the attribution can never name two different clients.
 */
export type ProofClientMark = Pick<ClientMarkProps, 'src' | 'width' | 'height' | 'correction'>;

export type ProofQuote = {
  /** Trusted, content-seam-sanitised rich text. Attribution never belongs in this field. */
  quoteHtml: string;
  /** The speaker. Required: named attribution is mandatory (CS; strapi-changes.md entry 4). */
  name: string;
  /** The speaker's title. Optional (HO §4): a blank or missing role leaves no separator or gap. */
  role?: string;
  /** The client. Required, and the mark's accessible name when a mark is supplied. */
  company: string;
  /** Optional 1:1 photograph beside the attribution (ruling P1). No portrait, no gap. */
  portrait?: ProofPortrait;
  /** Optional client mark beneath the attribution text, one per quote. */
  clientMark?: ProofClientMark;
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
    };

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

/** A mark that can render, so an invalid one leaves no empty row in the attribution. */
function acceptMark(mark: ProofClientMark | undefined, company: string) {
  if (!mark) return undefined;
  if (!isFilled(mark.src) || !hasDimensions(mark)) {
    warn(`client mark for "${company}" needs a src, width and height; omitting the mark.`);
    return undefined;
  }
  return mark;
}

/**
 * The portrait: small, square, radius 0, through Media as a photograph (no edge, never masked).
 *
 * `alt=""` is deliberate. The image sits beside the speaker's name, so a text alternative could only
 * restate that name ("Portrait of Ashok Mohanty") and a screen reader would hear it twice. That is
 * ch05 §7's decorative case. The box owns the 1:1 ratio and Media fills it with a centre cover crop.
 */
function Portrait({ portrait }: { portrait: ProofPortrait }) {
  return (
    <span className={styles.portrait}>
      <Media
        image={{ ...portrait, alt: '', kind: 'photograph' }}
        sizes={PROOF_PORTRAIT}
        fit="fill"
      />
    </span>
  );
}

function Quote({ quote }: { quote: ProofQuote }) {
  const portrait = acceptPortrait(quote.portrait, quote.name);
  const mark = acceptMark(quote.clientMark, quote.company);
  const role = isFilled(quote.role) ? quote.role : undefined;

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
        nowrap
        colGap="block"
        align="start"
        className={cx(styles.attribution, !portrait && styles.attributionIndented)}
      >
        {portrait ? <Portrait portrait={portrait} /> : null}
        <Layout rowGap="text" className={styles.attributionText}>
          <Layout rowGap="inline">
            <span className={styles.name}>{quote.name}</span>
            <span className={styles.role}>
              {role ? `${role}, ${quote.company}` : quote.company}
            </span>
          </Layout>
          {/* Hidden from assistive technology because it repeats the company, which is text one
              line above: announced, it would read the client's name twice. */}
          {mark ? (
            <span aria-hidden="true" className={styles.mark}>
              <ClientMark {...mark} name={quote.company} />
            </span>
          ) : null}
        </Layout>
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
}: {
  figures: readonly ProofFigure[];
  showDates: boolean;
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
              <span className={styles.value}>{figure.value}</span>
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
                    tone="neutral"
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
function Figures({ figures }: { figures: readonly ProofFigure[] }) {
  const shared = sharedCheckedOn(figures);

  if (!shared) return <FigureList figures={figures} showDates />;

  return (
    <Layout as="figure" rowGap="gutter" className={styles.figureGroup}>
      <FigureList figures={figures} showDates={false} />
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
 * 1:1 portrait left of it and client mark under it (rulings P1, P2). Display may render quote,
 * figures, or both — together, the quote in a 2:1 lead track beside the stacked figures — at the
 * display roles (--text-quote-lg, --text-stat-lg), and says a date every figure shares once, as
 * the set's caption (tracker 2.17). Compact embeds one quote in a reading flow and forbids figures at compile
 * time. Layout owns every relationship, Prose owns trusted inline markup, Button owns source-link
 * interaction, Media owns the portrait, ClientMark owns the mark, and the nearest surface owns the
 * ground.
 */
export function Proof({ arrangement = 'display', quote, figures }: ProofProps) {
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
      colGap={both ? 'column' : undefined}
      rowGap={both ? 'stack' : undefined}
      className={`${styles.root} ${styles[arrangement]}`}
    >
      {acceptedQuote ? <Quote quote={acceptedQuote} /> : null}
      {acceptedFigures.length > 0 ? <Figures figures={acceptedFigures} /> : null}
    </Layout>
  );
}
