/**
 * PROPOSED — eyebrows for bands the corpus authors without one, keyed by route, then band id. Each
 * is a design addition the owner asked for, logged in docs/content-proposals.md (P49) for the
 * content team. Read only through `getProposedEyebrows` (source.ts).
 */
export const PROPOSED_EYEBROWS: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  '/': {
    /* Home gateway, round 11 (owner, 19 Oct 2026): a centred eyebrow over "What do you need
       next?" to balance the band. It names the band's job, not a location (an eyebrow is not a
       crumb). */
    'product-situations': 'Where to start',
  },
};
