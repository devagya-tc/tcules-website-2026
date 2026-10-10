import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCaseRefs, getCorpusPage } from '@/content';
import { caseRoutesIn } from '@/lib/corpus-cases';
import { corpusMetadata } from '@/lib/corpus-metadata';
import { ROUTES } from '@/lib/routes';
import { AboutPage } from '@/templates';

/**
 * `/about` — read from the `_pages/` corpus and composed by the About template. Composition only: the
 * route reads the page and the cases it cites and passes them down; every arrangement decision is the
 * template's.
 */
export async function generateMetadata(): Promise<Metadata> {
  const page = await getCorpusPage(ROUTES.about);
  return page ? corpusMetadata(page) : { title: 'About Tcules' };
}

export default async function About() {
  const page = await getCorpusPage(ROUTES.about);
  if (!page) notFound();
  const caseRefs = await getCaseRefs(caseRoutesIn(page));
  return <AboutPage page={page} caseRefs={caseRefs} />;
}
