/**
 * The Sketch scenes (components/Sketch) and which one a service page takes. Named here, once, so the
 * About services selector and home's situation selector draw the same scene for the same service
 * without either template writing the map (templates may not import each other).
 */
export type ServiceSceneName =
  | 'new-product'
  | 'product-design'
  | 'product-modernisation'
  | 'design-systems'
  | 'ai-product-ux'
  | 'design-engineering'
  | 'software-development';

/**
 * ARTICLE scenes (owner, 13 Oct 2026): each drawn for ONE insight, from that article's own argument,
 * to stand as its cover until a real one exists. A service scene is never a cover — it stays in the
 * selectors and the nav — so a cover field is typed to this union and cannot name one. Assigned on
 * purpose, item by item (src/content/sources/cover-scenes.ts), never by keyword.
 *
 *   code-review              "Accepting AI-generated front-end code": a lens on the two lines a
 *                            reviewer must judge, the rest of the generated file ticked through
 *   security-checklist       "Vibe-coded app security checklist": a checklist standing as a gate
 *                            between the app and the people arriving at it
 *   prototype-to-production  "I vibe-coded an app. Now what?": a rough sketch's path through four
 *                            questions into a stored, running system
 */
export type ArticleSceneName = 'code-review' | 'security-checklist' | 'prototype-to-production';

/**
 * KIT scenes (owner, 26 Oct 2026, S2): the drawings EngagementOptions and TracePlates show, drawn in the
 * same grammar as every other sketch so the flat families cannot drift apart. The patterns name them
 * by their own scope or stage; the prefix keeps them apart from the service and article scenes.
 */
export type ScopeSceneName =
  | 'scope-feature'
  | 'scope-area'
  | 'scope-embedded'
  | 'scope-build'
  | 'scope-start'
  | 'scope-direct'
  | 'scope-inside'
  | 'scope-overlap'
  | 'scope-commercial';
export type TraceSceneName =
  'trace-design' | 'trace-handoff' | 'trace-code' | 'trace-product' | 'trace-signoff';

/**
 * OFFER scenes (owner, 26 Oct 2026, product-design page): drawn for one item of a service page's
 * band from that item's own words, and assigned item by item at the content seam
 * (src/content/sources/offer-scenes.ts). `outcome-*` for "What you get", `symptom-*` for "Where we
 * start", `specialist-*` for the specialist services bento, `case-*` for a worked example's story.
 */
export type OfferSceneName =
  | 'outcome-explain'
  | 'outcome-rules'
  | 'outcome-build'
  | 'outcome-finished'
  | 'symptom-stuck'
  | 'symptom-messy'
  | 'symptom-test'
  | 'symptom-consistent'
  | 'symptom-match'
  | 'specialist-research'
  | 'specialist-ia'
  | 'specialist-ui'
  | 'specialist-dataviz'
  | 'specialist-prototype'
  | 'specialist-new-product'
  | 'specialist-audit'
  | 'case-dealpath-problem'
  | 'case-dealpath-did';

export type SketchName =
  ServiceSceneName | ArticleSceneName | ScopeSceneName | TraceSceneName | OfferSceneName;

const BY_ROUTE: Readonly<Record<string, ServiceSceneName>> = {
  '/services/new-product-design-first-release': 'new-product',
  '/services/product-design': 'product-design',
  '/services/product-modernisation': 'product-modernisation',
  '/services/design-systems': 'design-systems',
  '/services/ai-product-ux': 'ai-product-ux',
  '/services/design-engineering': 'design-engineering',
  '/services/software-development': 'software-development',
};

/** The scene for a service page's route, or undefined for a route that has none. */
export function sketchForRoute(href: string): ServiceSceneName | undefined {
  return BY_ROUTE[href.split('#')[0] ?? href];
}

/**
 * Which offer scene draws which item of a corpus page's band (owner, 26 Oct 2026), keyed by band id,
 * then by the item's title as authored (or a router item's href), and a worked example's two story
 * scenes by its band id. Assigned item by item at the content seam (content/sources/offer-scenes.ts);
 * an item with no row is drawn by nothing, and a band draws only when every item has one.
 */
export type OfferScenes = {
  items: Readonly<Record<string, Readonly<Record<string, OfferSceneName>>>>;
  stories: Readonly<Record<string, readonly [OfferSceneName, OfferSceneName]>>;
};

/** An item's key in `OfferScenes.items`: its words without case, quote marks or end punctuation. */
export function offerSceneKey(title: string): string {
  return title
    .toLowerCase()
    .replace(/[“”"‘’'.!?]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
