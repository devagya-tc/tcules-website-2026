import { offerSceneKey } from '../../lib/sketches.ts';

/**
 * The drawing each Why Tcules reason carries in the Reasons band (component map C1, owner 29 Oct
 * 2026), keyed by the reason's title as the copy authors it. Drawn by
 * scripts/illustrations/reasons.mjs in the Reasons house style, one drawing per reason from that
 * reason's own claim (its message line is filed here with it), each exported on paper and paper-deep.
 *
 * Two sets, each drawn in one world box so a band's three sit at one scale:
 *   offer  the seven reasons the offer pages draw from (`why_tcules_reasons`, 1–7, three per page)
 *   home   home's own three (`/` why-tcules)
 *
 * A title with no row is drawn by nothing, and a Reasons band draws only when every item has one.
 * The sizes are the exported SVGs'; `npm run illustrations:reasons -- --check` fails if they drift.
 */
export type ReasonFigureRef = {
  /** The file's name in public/illustrations/reasons/. */
  name: string;
  set: 'offer' | 'home';
  /** What the drawing says: one sentence about the subject, written before it was drawn (ch05 §4). */
  message: string;
};

/** Each set's exported size (one shared viewBox per set). */
export const REASON_FIGURE_SIZE = {
  offer: { width: 416, height: 354 },
  home: { width: 352, height: 349 },
} as const;

const OFFER: Record<string, Omit<ReasonFigureRef, 'set'>> = {
  'We work out what the product has to know before we draw it.': {
    name: 'model-first',
    message: 'The screen is built on what the product knows, worked out first.',
  },
  'We know what to leave alone in a product people rely on.': {
    name: 'leave-alone',
    message: 'Almost all of a working product is kept as it is; one part is lifted out and replaced.',
  },
  'We prove the hard parts in code while they can still change.': {
    name: 'hard-parts-in-code',
    message: 'The hardest part is built and working in code while the design around it is still open.',
  },
  'One studio can take it into working software, with the designers staying in the build.': {
    name: 'into-software',
    message: "The design carries on into the software, and the designer's place stands in the build.",
  },
  'We design AI that people can check and correct.': {
    name: 'ai-checked',
    message: "An AI answer stops at a person's station to be checked before it counts.",
  },
  'Senior people do the work, and clients keep us for years.': {
    name: 'senior-years',
    message: 'The same senior seat stays on the product year after year.',
  },
  'We tell you what is really wrong.': {
    name: 'what-is-wrong',
    message: 'The problems on the screen trace down to one cause beneath them.',
  },
};

const HOME: Record<string, Omit<ReasonFigureRef, 'set'>> = {
  'Products customers rely on': {
    name: 'relied-on',
    message: "Every day's work runs through the product we designed.",
  },
  'AI that reached production': {
    name: 'ai-in-production',
    message: 'The AI feature proved in a coded demo is the same one running in production.',
  },
  'Relationships that last': {
    name: 'relationships-last',
    message: "The same seat stays with the client's product as it grows, year on year.",
  },
};

const keyed = (set: 'offer' | 'home', rows: Record<string, Omit<ReasonFigureRef, 'set'>>) =>
  Object.entries(rows).map(([title, ref]) => [offerSceneKey(title), { ...ref, set }] as const);

export const REASON_FIGURES: Readonly<Record<string, ReasonFigureRef>> = Object.fromEntries([
  ...keyed('offer', OFFER),
  ...keyed('home', HOME),
]);
