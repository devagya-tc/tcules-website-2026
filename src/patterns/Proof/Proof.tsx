import { Button, Layout, Prose } from '@/components';

import styles from './Proof.module.css';

export type ProofQuote = {
  /** Trusted, content-seam-sanitised rich text. Attribution never belongs in this field. */
  quoteHtml: string;
  /** First attribution field. */
  name: string;
  /** Second attribution field. */
  role: string;
  /** Third attribution field. */
  company: string;
};

export type ProofFigure = {
  /** Verbatim audited value, for example "90+" or "4.8/5". */
  value: string;
  /** What the value counts. */
  label: string;
  /** Visible per-figure integrity line, including "checked on". */
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

  const blankFields = (['quoteHtml', 'name', 'role', 'company'] as const).filter(
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

function Quote({ quote }: { quote: ProofQuote }) {
  return (
    <Layout as="figure" rowGap="block" className={styles.quote}>
      <blockquote className={styles.quoteText}>
        <Prose html={quote.quoteHtml} className={styles.quoteProse} />
      </blockquote>
      <figcaption className={styles.attribution}>
        {quote.name}, {quote.role}, {quote.company}
      </figcaption>
    </Layout>
  );
}

function Figures({ figures }: { figures: readonly ProofFigure[] }) {
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
            <Layout rowGap="tight" className={styles.metadata}>
              <span className={styles.checked}>{figure.checkedOn}</span>
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
          </Layout>
        </li>
      ))}
    </Layout>
  );
}

/**
 * Proof — attributed client evidence, checked figures, or both, built to docs/specs/Proof.md.
 *
 * The content seam decides whether a markdown blockquote is an attributed Proof or an
 * unattributed Callout; this pattern never sniffs HTML for a name. Display may render quote,
 * figures, or both. Compact embeds one quote in a reading flow and forbids figures at compile
 * time. Layout owns every relationship, Prose owns trusted inline markup, Button owns source-link
 * interaction, and the nearest surface owns the ground.
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

  return (
    <Layout
      columns={both ? 'fit' : undefined}
      minTrack="md"
      colGap={both ? 'column' : undefined}
      rowGap={both ? 'stack' : undefined}
      className={`${styles.root} ${styles[arrangement]}`}
    >
      {acceptedQuote ? <Quote quote={acceptedQuote} /> : null}
      {acceptedFigures.length > 0 ? <Figures figures={acceptedFigures} /> : null}
    </Layout>
  );
}
