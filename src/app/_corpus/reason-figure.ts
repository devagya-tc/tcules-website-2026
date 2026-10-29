import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { getReasonFigure } from '@/content';

/**
 * A Why Tcules reason's drawing (component-map C1), only once its file is in `public/`: the drawings
 * are filed by title at the content seam, so a reason whose drawing has not landed resolves to
 * nothing and the band keeps its undrawn form (OfferBands `reasons`) rather than pointing at a
 * missing file. One reader for every route that renders a Reasons band: the offer families, the
 * composed hubs and home.
 */
export function landedReasonFigure(title: string, ground: 'paper' | 'paper-deep') {
  const figure = getReasonFigure(title, ground);
  return figure && existsSync(join(process.cwd(), 'public', figure.src)) ? figure : undefined;
}
