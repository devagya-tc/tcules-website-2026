import { offerSceneKey } from '../../lib/sketches.ts';

/**
 * The drawing each hard-parts claim carries in the ChallengesBand (owner 30 Oct 2026,
 * decisions/2026-10-30-claim-visual-depicts-the-claim), keyed by the claim's title as the copy
 * authors it. Drawn by scripts/illustrations/claims.mjs in the Reasons house style, one drawing per
 * claim from that claim's own words (its message line is filed here with it), each exported on paper
 * and paper-deep.
 *
 * A title with no row takes the labelled illustration slot (src/lib/placeholders.ts), never an older
 * drawing at another scale. The size is the exported SVGs'; `npm run illustrations:claims -- --check`
 * fails if it drifts.
 */
export type ClaimFigureRef = {
  /** The file's name in public/illustrations/claims/. */
  name: string;
  /** What the drawing says: one sentence about the subject, written before it was drawn (ch05 §4). */
  message: string;
};

/** The set's exported size (one shared viewBox). */
export const CLAIM_FIGURE_SIZE = { width: 462, height: 413 } as const;

const CLAIMS: Record<string, ClaimFigureRef> = {
  'Rules nobody has written down.': {
    name: 'rules-unwritten',
    message:
      'Which meeting gives way is a rule people follow but never wrote down; heard in research, it is written into the calendar, so the important meeting takes the slot and the other one moves.',
  },
  'Several people working on one record.': {
    name: 'one-record-many-roles',
    message:
      'One record stands at the centre; each role reaches its own part of it, from its own place, in no fixed order.',
  },
  'Customers and staff on the same records.': {
    name: 'order-reads-the-same',
    message:
      "An order placed on the customer's screen arrives in the staff's production queue as the same card.",
  },
  'Screens people work in for hours.': {
    name: 'every-state-cared-for',
    message:
      'The empty, loading, error and no-access screens are built from the same rules, and given the same care, as the screen in the demo.',
  },
};

export const CLAIM_FIGURES: Readonly<Record<string, ClaimFigureRef>> = Object.fromEntries(
  Object.entries(CLAIMS).map(([title, ref]) => [offerSceneKey(title), ref] as const),
);
