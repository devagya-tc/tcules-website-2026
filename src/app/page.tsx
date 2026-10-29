import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  getCorpusPage,
  getPlaceholderReasons,
  getProposedEyebrows,
  getTestimonialAvatars,
  getTestimonialRatings,
} from '@/content';
import { corpusMetadata } from '@/lib/corpus-metadata';
import { ROUTES } from '@/lib/routes';
import { HomePage } from '@/templates';

import { landedReasonFigure } from './_corpus/reason-figure';

/**
 * `/` — read from the `_pages/` corpus and composed by the home template. Composition only: the
 * route reads the page and passes it down; every arrangement decision is the template's.
 */
export async function generateMetadata(): Promise<Metadata> {
  const page = await getCorpusPage(ROUTES.home);
  return page ? corpusMetadata(page) : { title: 'Tcules' };
}

export default async function Home() {
  const page = await getCorpusPage(ROUTES.home);
  if (!page) notFound();
  const ids = page.composition.testimonialIds;
  /* "Why teams choose Tcules" shows stand-in reasons (PLACEHOLDER, P48) until the content team
     writes the six the Reasons band is built for. */
  /* Bands the owner asked to carry an eyebrow the corpus does not author (PROPOSED, P49). */
  const [ratings, avatars, reasons, eyebrows] = await Promise.all([
    getTestimonialRatings(ids),
    getTestimonialAvatars(ids),
    getPlaceholderReasons(page.route),
    getProposedEyebrows(page.route),
  ]);
  return (
    <HomePage
      page={page}
      ratings={ratings}
      avatars={avatars}
      reasons={reasons}
      eyebrows={eyebrows}
      reasonFigure={landedReasonFigure}
    />
  );
}
