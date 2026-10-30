/**
 * Home's Why Tcules reasons as EVIDENCE (owner, 29 Oct 2026; decisions/2026-10-29-home-reasons-show-their-proof):
 * "A product design partner for ambitious SaaS teams" names checkable proof in every reason, so each
 * reason's visual is its proof, not a drawing. Keyed by the reason's title as the copy authors it.
 *
 *   marks    the clients the reason's sentence links, in its order: each its approved mark, else its
 *            name typeset (never an invented mark)
 *   case     the case study the sentence links, by its own cover, with one figure set from the
 *            sentence
 *   figures  figures set from the sentence, as the owner set them
 *
 * The figures restate words of the authored sentence, which still renders in full under the title;
 * none is new copy. The template checks each against the sentence in development, so an edit to the
 * copy that drops a fact warns rather than leaving a figure the sentence no longer supports.
 *
 * Home only. Offer pages' reasons take isometric illustrations, never covers or figure panels
 * (decisions/2026-10-30-reasons-take-illustrations); their case links stay in the text.
 */
export type ReasonProofFigure = {
  value: string;
  label?: string;
  /** The words of the authored sentence the figure is set from, checked in development. */
  from: string;
};

export type ReasonProofSpec =
  | { kind: 'marks' }
  | { kind: 'case'; figure: ReasonProofFigure }
  | { kind: 'figures'; figures: readonly ReasonProofFigure[] };

export const HOME_REASON_PROOF: Readonly<Record<string, ReasonProofSpec>> = {
  'Products customers rely on': { kind: 'marks' },
  'AI that reached production': {
    kind: 'case',
    figure: { value: 'Live since late 2025', label: 'ConnectX', from: 'since late 2025' },
  },
  'Relationships that last': {
    kind: 'figures',
    figures: [
      { value: '3 years', label: 'Primelis', from: 'for three years' },
      { value: 'Since first concept', label: 'Vovisto', from: 'since its first concept' },
      {
        value: 'Since the first coded prototypes',
        label: 'Benchmark Gensuite',
        from: 'since the first coded prototypes',
      },
    ],
  },
};
