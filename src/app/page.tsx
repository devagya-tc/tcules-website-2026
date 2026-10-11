import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  getBorrowedQuotes,
  getCorpusPage,
  getTestimonialAvatars,
  getTestimonialRatings,
} from '@/content';
import { corpusMetadata } from '@/lib/corpus-metadata';
import { ROUTES } from '@/lib/routes';
import { HomePage } from '@/templates';

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
  /* A band item whose source authors no quote takes a real one from another corpus page
     (PLACEHOLDER, home round 3); its testimonial id joins the page's for ratings and avatars. */
  const borrowedQuotes = await getBorrowedQuotes(page.route);
  const ids = [
    ...page.composition.testimonialIds,
    ...borrowedQuotes.flatMap((entry) =>
      entry.quote.testimonialId ? [entry.quote.testimonialId] : [],
    ),
  ];
  const [ratings, avatars] = await Promise.all([
    getTestimonialRatings(ids),
    getTestimonialAvatars(ids),
  ]);
  return (
    <HomePage page={page} ratings={ratings} avatars={avatars} borrowedQuotes={borrowedQuotes} />
  );
}
