/**
 * The Sketch scenes (components/Sketch) and which one a service page takes. Named here, once, so the
 * About services selector and home's situation selector draw the same scene for the same service
 * without either template writing the map (templates may not import each other).
 */
export type SketchName =
  | 'new-product'
  | 'product-design'
  | 'product-modernisation'
  | 'design-systems'
  | 'ai-product-ux'
  | 'design-engineering'
  | 'software-development'
  /** The Future Interfaces Lab: experiments on the bench, one promoted into a product. */
  | 'lab';

const BY_ROUTE: Readonly<Record<string, SketchName>> = {
  '/services/new-product-design-first-release': 'new-product',
  '/services/product-design': 'product-design',
  '/services/product-modernisation': 'product-modernisation',
  '/services/design-systems': 'design-systems',
  '/services/ai-product-ux': 'ai-product-ux',
  '/services/design-engineering': 'design-engineering',
  '/services/software-development': 'software-development',
};

/** The scene for a service page's route, or undefined for a route that has none. */
export function sketchForRoute(href: string): SketchName | undefined {
  return BY_ROUTE[href.split('#')[0] ?? href];
}
