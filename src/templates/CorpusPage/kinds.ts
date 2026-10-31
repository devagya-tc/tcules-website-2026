import type { OfferKind } from './plan';

/**
 * One kind of section, one component (owner, 30 Oct 2026). Every band the plan classifies renders
 * through its kind's approved component and nothing else; a missing drawing is a labelled placeholder
 * inside that component, never an older design. Until 30 Oct two kinds (hard parts, What you get)
 * chose between their approved component and a fallback by the content's shape, and the fallback
 * hid the approved design on every expertise page.
 *
 * Each entry names the `data-band` value(s) its component writes on the band's `<section>`.
 * `npm run kinds:check` (after a build) joins this to the built pages: a band whose section carries
 * any other value fails, so a new fallback cannot ship unseen.
 *
 *   approved   designed, reviewed by the owner: the only component the kind may render.
 *   to-design  renders today, but the owner has not approved its design. Listed by the check as work,
 *              not failed.
 *
 * A kind missing from this list fails the check: register it in the same change that adds it.
 */
export type KindStatus = 'approved' | 'to-design';

export const KIND_COMPONENTS: Readonly<
  Partial<Record<OfferKind, { component: readonly string[]; status: KindStatus; note?: string }>>
> = {
  challenges: { component: ['D-claims'], status: 'approved', note: 'Hard parts. A redesign is next (visual-inventory-expertise § 3).' },
  outcomes: { component: ['offer-parts'], status: 'approved', note: 'What you get, four parts.' },
  personas: { component: ['voice-ledger'], status: 'approved' },
  catalog: {
    component: ['offer-sheet'],
    status: 'to-design',
    note: 'What we design. The ruled blue-marker cell is for figures only (owner, 30 Oct 2026); flat drawing per product kind.',
  },
  cases: { component: ['M'], status: 'approved' },
  quotes: { component: ['G'], status: 'approved' },
  tiles: { component: ['engagement-options'], status: 'approved' },
  reasons: { component: ['reasons'], status: 'approved' },
  industries: { component: ['C-image'], status: 'to-design', note: 'Eleven photo cards; the band is heavy for a set of links (inventory § 1).' },
  enquiry: { component: ['L'], status: 'approved' },
  faq: { component: ['D-faq'], status: 'approved' },
  router: { component: ['C-icon'], status: 'approved' },
  method: { component: ['F'], status: 'approved', note: 'How we do it: numbered steps beside one flat graphic (owner, 30 Oct 2026).' },
  deliverables: { component: ['offer-sheet'], status: 'to-design' },
  table: { component: ['E', 'drawn-table'], status: 'approved', note: 'A table read across rows stays a table (E); a table of peer items is drawn (drawn-table).' },
  thread: { component: ['E'], status: 'approved', note: 'A trace read across its columns (design-to-code audit).' },
  text: { component: ['C-text'], status: 'to-design' },
};
