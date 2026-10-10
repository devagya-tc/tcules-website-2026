import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCorpusPage } from '@/content';
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
  return <HomePage page={page} />;
}
