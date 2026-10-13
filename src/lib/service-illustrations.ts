import { ILLUSTRATION_LEGENDS } from './illustration-legends';

/**
 * The service lines whose page keeps a live hero illustration in the corpus pass.
 *
 * `/services/product-design` keeps its existing drawing and its numbered cut (page-mapping § 0 rule
 * 5, the one deliberate exception to "a hero takes a bound asset or a placeholder"): it is the
 * page's own live hero asset and was owner-approved in the kit, so keep-what-was-approved applies.
 * The content team's `visual_plan` for the page asks for a different drawing, which the image
 * register carries as its replacement. A line is added here only when its page is mapped and its
 * drawing is kept on purpose; every other page's hero is a bound asset or a labelled placeholder.
 */
const SERVICE_ILLUSTRATIONS: Readonly<
  Record<string, { src: string; width: number; height: number }>
> = {
  'product-design': {
    src: '/illustrations/services/product-design.paper.svg',
    width: 962,
    height: 714,
  },
};

export type ServiceIllustration = {
  src: string;
  width: number;
  height: number;
  alt: '';
  kind: 'illustration';
  cut: (typeof ILLUSTRATION_LEGENDS)[string] | undefined;
};

export function serviceIllustration(slug: string): ServiceIllustration | undefined {
  const drawing = SERVICE_ILLUSTRATIONS[slug];
  if (!drawing) return undefined;
  return { ...drawing, alt: '', kind: 'illustration', cut: ILLUSTRATION_LEGENDS[drawing.src] };
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
