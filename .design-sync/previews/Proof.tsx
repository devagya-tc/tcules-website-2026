import { Proof, Section } from 'tcules-website-2026';

/* NOTE: these preview files are type-STRIPPED, not type-checked (see .design-sync/NOTES.md), so an
   invalid prop value fails silently at render. Two shapes are unrepresentable in TS here and will
   simply misbehave rather than error: `arrangement="compact"` with `figures`, and a call with
   neither `quote` nor `figures`. Both warn in development and render what they can. */

/* `quoteHtml` is a rich-text field, not plain text — Prose renders it, so it arrives as trusted,
   sanitised markup from the content seam. Keep it to one or two paragraphs of real speech. */
const QUOTE = {
  quoteHtml:
    '<p>They turned a broad product problem into a sequence the whole team could act on, and the first release was the one we could put in front of customers.</p>',
  name: 'Product director',
  role: 'Head of product',
  company: 'Workflow software',
};

/* A figure is a CHECKED statistic: the value as authored, what it counts, and the date somebody
   verified it. `checkedOn` is not decoration — it is the reason the number is allowed on the page,
   and a figure that cannot carry one does not belong in this component. */
const FIGURES = [
  { value: '31', label: 'records reconciled per run', checkedOn: 'Checked Aug 2026' },
  {
    value: '11 weeks',
    label: 'to first measurable value',
    checkedOn: 'Checked Aug 2026',
    sourceHref: '/case-studies',
  },
  {
    value: '4.8/5',
    label: 'client rating',
    checkedOn: 'Checked Aug 2026',
    sourceHref: '/clients',
  },
];

/**
 * Proof — attributed client evidence, checked figures, or both.
 *
 * **It is one component because splitting it duplicates half of it.** A quotation and a statistic
 * are the same editorial act — a claim someone else can check — and they routinely appear together
 * in one band. Two components would have meant two attribution treatments, two source-link rules
 * and two answers to "what happens when there is only one of them".
 *
 * **Every figure carries `checkedOn`, and that is the point of the type.** A number on a marketing
 * page with no date and no source is a claim nobody can audit; requiring the field is how that
 * stops being optional. `sourceHref` is optional because not every figure has a public source, but
 * a figure with a score and no reachable profile is weaker than no figure at all.
 *
 * TWO ARRANGEMENTS:
 *
 *   `display` (default)  the band shape. Takes a quote, figures, or both — and at least one of the
 *                        two is required by the type, so an empty Proof does not compile.
 *   `compact`            one quote embedded in a reading flow. `figures` is `never` here: a
 *                        statistic row inside running prose reads as a pull-out that lost its band.
 *
 * At most four figures in production content; more warns rather than clamping, because silently
 * dropping evidence is worse than a wide row.
 *
 * It paints no ground and takes no `surface` — put it in a `Section` and it reads `data-surface`.
 * Its position in a page argument is the caller's business, not the component's.
 *
 * **Do not confuse a `ProofFigure` with the `Figure` pattern.** They share a noun and nothing else:
 * this is a checked statistic; `Figure` is a captioned image.
 */
export function Default() {
  return <Proof quote={QUOTE} figures={FIGURES} />;
}

/** A quotation alone — the most common shape, and the one a case study closes on. */
export function QuoteOnly() {
  return <Proof quote={QUOTE} />;
}

/**
 * Figures alone, with no quotation. Legal by the type: `display` requires a quote OR figures, not
 * both, so an evidence row with nothing to attribute is a first-class shape rather than a
 * degraded one.
 */
export function FiguresOnly() {
  return <Proof figures={FIGURES} />;
}

/** One figure. Nothing about the row assumes a set — no divider left hanging, no empty tracks. */
export function OneFigure() {
  return <Proof figures={FIGURES.slice(0, 1)} />;
}

/**
 * The compact arrangement: one quote, sized to sit inside a reading flow rather than to open or
 * close a band. `figures` is not accepted here at all.
 */
export function Compact() {
  return <Proof arrangement="compact" quote={QUOTE} />;
}

/** On tint. The quote rule and the figure values hold their light-surface steps. */
export function OnTint() {
  return (
    <Section surface="tint">
      <Proof quote={QUOTE} figures={FIGURES} />
    </Section>
  );
}

/** On ink, where the direction inverts and the source links lift to the light Brandeis steps. */
export function OnInk() {
  return (
    <Section surface="ink">
      <Proof quote={QUOTE} figures={FIGURES} />
    </Section>
  );
}

/** On blue, where only the light end of the ramp clears AA for the value, label and source link. */
export function OnBlue() {
  return (
    <Section surface="blue">
      <Proof figures={FIGURES} />
    </Section>
  );
}
