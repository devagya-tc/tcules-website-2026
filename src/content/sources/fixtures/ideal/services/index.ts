import type { ServiceStory } from '@/lib/service-story';

import { aiProductUx } from './ai-product-ux';
import { designEngineering } from './design-engineering';
import { designSystems } from './design-systems';
import { productDesign } from './product-design';
import { productModernisation } from './product-modernisation';
import { softwareDevelopment } from './software-development';
import { stressStory } from './stress';

/**
 * IDEAL CONTENT — the six service lines, designed.
 *
 * Not a source and not an overlay: each story is the page's CMS copy re-cut into the shape its
 * content asks for (`@/lib/service-story`), with the edits listed per page in
 * docs/service-pages-design.md. The copy is the CMS's own wherever it could be; where it is not,
 * the change is in that list for the content team to accept or reject.
 */
export const IDEAL_SERVICE_STORIES: Readonly<Record<string, ServiceStory>> = {
  [productDesign.slug]: productDesign,
  [productModernisation.slug]: productModernisation,
  [designSystems.slug]: designSystems,
  [aiProductUx.slug]: aiProductUx,
  [designEngineering.slug]: designEngineering,
  [softwareDevelopment.slug]: softwareDevelopment,
  /* Not a service line: every StoryBlock variant on one route, the template's own specimen. */
  [stressStory.slug]: stressStory,
};
