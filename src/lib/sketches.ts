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

export type SketchName = ServiceSceneName | ArticleSceneName;

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
