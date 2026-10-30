import { ILLUSTRATION_LEGENDS } from './illustration-legends';
import { ROUTES, servicePath } from './routes';

/**
 * The hero illustrations, by route. A route here takes its drawing whole (an illustration is never
 * cropped); every other page's hero is a bound asset or a labelled placeholder.
 *
 * Six are Bhumika's finals, frozen by Jatin on 30 Oct 2026, then polished: every slab one outline
 * weight with its corner edges, every line stopping at the edge of what it reaches (source, before/after
 * and the pass: docs/illustrations/polish-2026-10-30/). The owner approved them for the pages the same
 * day: "use the updated drawings on the pages". The other four are the approved isometric heroes
 * (owner, 30 Oct 2026), 820 wide, their viewBox trimmed to the drawing (16 above and below) so no hero
 * carries a band of empty floor. None carries a label, so one file serves every width.
 */
const HERO_ILLUSTRATIONS: Readonly<
  Record<string, { file: string; width: number; height: number }>
> = {
  [servicePath('product-design')]: { file: 'product-design', width: 786, height: 543 },
  [servicePath('product-modernisation')]: {
    file: 'product-modernisation',
    width: 700,
    height: 499,
  },
  [servicePath('design-engineering')]: { file: 'design-engineering', width: 772, height: 577 },
  [servicePath('design-systems')]: { file: 'design-systems', width: 802, height: 515 },
  [servicePath('ai-product-ux')]: { file: 'ai-product-ux', width: 792, height: 446 },
  [servicePath('ai-product-ux/ai-copilots-agents')]: {
    file: 'ai-copilots-agents',
    width: 788,
    height: 609,
  },
  [servicePath('software-development')]: {
    file: 'services-software-development',
    width: 820,
    height: 693,
  },
  [servicePath('new-product-design-first-release')]: {
    file: 'services-new-product-design-first-release',
    width: 820,
    height: 519,
  },
  [ROUTES.expertise]: { file: 'expertise', width: 820, height: 464 },
  [ROUTES.audits]: { file: 'audits', width: 820, height: 627 },
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
  const drawing = HERO_ILLUSTRATIONS[route];
  if (!drawing) return undefined;
  const src = `/illustrations/heroes/${drawing.file}.svg`;
  return {
    src,
    width: drawing.width,
    height: drawing.height,
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
