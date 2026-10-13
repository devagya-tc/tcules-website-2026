import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCaseRefs, getCorpusPage } from '@/content';
import { caseRoutesIn } from '@/lib/corpus-cases';
import { corpusMetadata } from '@/lib/corpus-metadata';
import { LongformPage } from '@/templates';

/**
 * The corpus-backed case-study routes (`/case-studies/[slug]`). Only the cases whose band shapes the
 * page-mapping has verified switch to the corpus; the rest keep their current source until their own
 * batch maps them (page-mapping § 1.2). Adding a page to the list is the whole act of switching it.
 */
export const PASS_1_CASE_ROUTES: ReadonlySet<string> = new Set([
  '/case-studies/benchmark-gensuite-enterprise-suite-modernisation',
]);

export const isCorpusCase = (route: string): boolean => PASS_1_CASE_ROUTES.has(route);

export const caseSlugs = (): string[] =>
  [...PASS_1_CASE_ROUTES].map((route) => route.slice('/case-studies/'.length));

export async function caseMetadata(route: string): Promise<Metadata | null> {
  if (!isCorpusCase(route)) return null;
  const page = await getCorpusPage(route);
  return page ? corpusMetadata(page) : null;
}

/** Whether the corpus has a page for this case route (the fallback for a case the CMS source lacks). */
export async function hasCorpusCase(route: string): Promise<boolean> {
  return Boolean(await getCorpusPage(route));
}

/** A corpus case's metadata whether or not it is on the pass-1 list (the fallback's metadata). */
export async function corpusCaseMetadata(route: string): Promise<Metadata | null> {
  const page = await getCorpusPage(route);
  return page ? corpusMetadata(page) : null;
}

export async function CaseRoute({ route }: { route: string }) {
  const page = await getCorpusPage(route);
  if (!page) notFound();
  const caseRefs = await getCaseRefs(caseRoutesIn(page));
  return <LongformPage page={page} family="case" caseRefs={caseRefs} />;
}
