import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CASE_INDEX_ROUTE, CaseIndexRoute } from '@/app/_corpus/case-index';
import { CaseRoute, isCorpusCase } from '@/app/_corpus/case';
import { LongformRoute, isCorpusLongform } from '@/app/_corpus/longform';
import { isCorpusOffer } from '@/app/_corpus/offer';
import { ToolRoute, isCorpusTool } from '@/app/_corpus/tool';
import { getCaseRefs, getCorpusBindings, getCorpusPage, listCorpusPages } from '@/content';
import { caseRoutesIn } from '@/lib/corpus-cases';
import { AboutPage, HomePage, OfferPage } from '@/templates';

export const metadata: Metadata = {
  title: 'CorpusPage · a page | Design',
  robots: { index: false, follow: false },
};

/* Only the pages the plan has been verified against (`PASS_1_OFFER_ROUTES`): an offer page whose
   image slots have no register row yet cannot render, by design (src/lib/placeholders.ts). */
const isMapped = (route: string) =>
  route === '/' ||
  route === CASE_INDEX_ROUTE ||
  isCorpusOffer(route) ||
  isCorpusCase(route) ||
  isCorpusTool(route) ||
  isCorpusLongform(route) ||
  route === '/about';

const fileSlug = (route: string) =>
  route === '/' ? 'home' : route.slice(1).replaceAll('/', '__');

export async function generateStaticParams() {
  const pages = await listCorpusPages();
  return pages
    .filter((page) => isMapped(page.route))
    .map((page) => ({ slug: fileSlug(page.route) }));
}

/**
 * One corpus page through its template, from its file slug (`services__product-design`). The live
 * routes gate which pages switch to the corpus (`PASS_1_OFFER_ROUTES`); this route renders exactly
 * those, in the proving ground, so a band can be judged without the site chrome. A page joins both
 * lists in one edit, when its band shapes and its image register rows exist.
 */
export default async function CorpusPageSpecimen({
  params,
}: PageProps<'/design/corpus-page/[slug]'>) {
  const { slug } = await params;
  const route = slug === 'home' ? '/' : `/${slug.replaceAll('__', '/')}`;
  const page = await getCorpusPage(route);
  if (!page) notFound();

  if (!isMapped(page.route)) notFound();
  if (page.route === '/') return <HomePage page={page} />;
  if (page.route === CASE_INDEX_ROUTE) return <CaseIndexRoute />;
  if (isCorpusCase(page.route)) return <CaseRoute route={page.route} />;
  if (isCorpusTool(page.route)) return <ToolRoute route={page.route} />;
  if (isCorpusLongform(page.route)) return <LongformRoute route={page.route} />;
  if (page.route === '/about') {
    const caseRefs = await getCaseRefs(caseRoutesIn(page));
    return <AboutPage page={page} caseRefs={caseRefs} />;
  }

  const [caseRefs, shared] = await Promise.all([
    getCaseRefs(caseRoutesIn(page)),
    getCorpusBindings(['about_studio_review']),
  ]);
  return <OfferPage page={page} caseRefs={caseRefs} shared={shared} />;
}
