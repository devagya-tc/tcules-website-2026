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
