import { ILLUSTRATION_LEGENDS } from './illustration-legends';
import { ROUTES, servicePath } from './routes';

/**
 * The hero illustrations, by route: the approved isometric heroes (owner, 30 Oct 2026), each 820 wide
 * in `public/illustrations/heroes/`, its viewBox trimmed to the drawing (16 above and below) so no hero
 * carries a band of empty floor. A route here takes its drawing whole (an illustration is never
 * cropped); every other page's hero is a bound asset or a labelled placeholder.
 */
/** Each trimmed drawing's height in its 820-wide viewBox. */
const HERO_HEIGHTS: Readonly<Record<string, number>> = {
  audits: 627,
  expertise: 464,
  'services-ai-product-ux': 466,
  'services-design-engineering': 597,
  'services-design-systems': 535,
  'services-new-product-design-first-release': 519,
  'services-product-design': 563,
  'services-product-modernisation': 518,
  'services-software-development': 693,
};

const HERO_ILLUSTRATIONS: Readonly<Record<string, string>> = {
  [servicePath('product-design')]: 'services-product-design',
  [servicePath('product-modernisation')]: 'services-product-modernisation',
  [servicePath('design-systems')]: 'services-design-systems',
  [servicePath('ai-product-ux')]: 'services-ai-product-ux',
  [servicePath('design-engineering')]: 'services-design-engineering',
  [servicePath('software-development')]: 'services-software-development',
  [servicePath('new-product-design-first-release')]:
    'services-new-product-design-first-release',
  [ROUTES.expertise]: 'expertise',
  [ROUTES.audits]: 'audits',
};

export type ServiceIllustration = {
  src: string;
  width: number;
  height: number;
  alt: '';
  kind: 'illustration';
  cut: (typeof ILLUSTRATION_LEGENDS)[string] | undefined;
};

/** The hero illustration for a route. Undefined for a route with none. */
export function serviceIllustration(route: string): ServiceIllustration | undefined {
  const file = HERO_ILLUSTRATIONS[route];
  if (!file) return undefined;
  const src = `/illustrations/heroes/${file}.svg`;
  return {
    src,
    width: 820,
    height: HERO_HEIGHTS[file] ?? 820,
    alt: '',
    kind: 'illustration',
    cut: ILLUSTRATION_LEGENDS[src],
  };
}

/**
 * Every service line's drawing (ch05 isometric family, `public/illustrations/services/`), by the
 * service's route — for a card that stands for the service rather than a hero that explains it (home
 * round 1, 10 Oct 2026: the six situations of "What do you need next?" each lead with their
 * service's drawing). Decorative in a card: the card's title names the service, so `alt` is empty.
 *
 * `/services/new-product-design-first-release` has no drawing of its own yet. Until it does it takes
 * Software Development's — the end-to-end build from system to release, the first release's own
 * promise ("design a first release … and build it too") — and docs/page-mapping.md (Home round 1)
 * lists the interim for the owner.
 */
const SERVICE_DRAWINGS: Readonly<
  Record<string, { file: string; width: number; height: number }>
> = {
  '/services/product-design': { file: 'product-design', width: 962, height: 714 },
  '/services/product-modernisation': { file: 'product-modernisation', width: 787, height: 695 },
  '/services/ai-product-ux': { file: 'ai-product-ux', width: 879, height: 747 },
  '/services/design-systems': { file: 'design-systems', width: 681, height: 569 },
  '/services/design-engineering': { file: 'design-engineering', width: 737, height: 560 },
  '/services/software-development': { file: 'software-development', width: 714, height: 610 },
  '/services/new-product-design-first-release': {
    file: 'software-development',
    width: 714,
    height: 610,
  },
};

export type ServiceDrawing = {
  src: string;
  width: number;
  height: number;
  alt: '';
  kind: 'illustration';
};

/** The drawing for a service route, on paper. Undefined for a route with none. */
export function serviceDrawing(route: string): ServiceDrawing | undefined {
  const drawing = SERVICE_DRAWINGS[route];
  if (!drawing) return undefined;
  return {
    src: `/illustrations/services/${drawing.file}.paper.svg`,
    width: drawing.width,
    height: drawing.height,
    alt: '',
    kind: 'illustration',
  };
}
