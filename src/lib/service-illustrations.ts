import { ILLUSTRATION_LEGENDS } from './illustration-legends';

/**
 * The service pages whose hero carries a finished drawing, by page slug.
 *
 * Six of Bhumika's finals, frozen by Jatin on 30 Oct 2026, then polished. The polish gave every slab one
 * outline weight and its corner edges, and made every line stop at the edge of what it reaches (source,
 * before/after and the pass: docs/illustrations/polish-2026-10-30/). The owner approved them for the pages
 * the same day: "use the updated drawings on the pages". They replace Product Design's earlier drawing and
 * its numbered phone cut. These drawings carry no labels, so the same file serves every width. Every other
 * page's hero is a bound asset or a labelled placeholder until its drawing lands
 * (docs/research/illustration-call-2026-10-30.md lists which are still open).
 */
const SERVICE_ILLUSTRATIONS: Readonly<
  Record<string, { src: string; width: number; height: number }>
> = {
  'product-design': { src: '/illustrations/heroes/product-design.svg', width: 786, height: 543 },
  'product-modernisation': {
    src: '/illustrations/heroes/product-modernisation.svg',
    width: 700,
    height: 499,
  },
  'design-engineering': {
    src: '/illustrations/heroes/design-engineering.svg',
    width: 772,
    height: 577,
  },
  'design-systems': { src: '/illustrations/heroes/design-systems.svg', width: 802, height: 515 },
  'ai-product-ux': { src: '/illustrations/heroes/ai-product-ux.svg', width: 792, height: 446 },
  'ai-copilots-agents': {
    src: '/illustrations/heroes/ai-copilots-agents.svg',
    width: 788,
    height: 609,
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
