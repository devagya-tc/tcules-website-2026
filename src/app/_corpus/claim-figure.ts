import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { getClaimFigure } from '@/content';

/**
 * A hard-parts claim's drawing, only once its file is in `public/`: the drawings are filed by title
 * at the content seam, so a claim whose drawing has not landed resolves to nothing and the band
 * draws the labelled illustration slot (OfferBands `challenges`) rather than pointing at a missing
 * file. One reader for every route that renders a hard-parts band.
 */
export function landedClaimFigure(title: string, ground: 'paper' | 'paper-deep') {
  const figure = getClaimFigure(title, ground);
  return figure && existsSync(join(process.cwd(), 'public', figure.src)) ? figure : undefined;
}
