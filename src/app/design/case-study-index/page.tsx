import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CaseIndexRoute } from '@/app/_corpus/case-index';
import { getIdealCaseStudyListingPage } from '@/content';
import { caseStudyPath, ROUTES } from '@/lib/routes';
import { CaseStudyIndex } from '@/templates';

export const metadata: Metadata = {
  title: 'CaseStudyIndex | Design',
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * CaseStudyIndex, in both of its forms.
 *
 *   (default)     the GROUPED form the live /case-studies renders, from the corpus
 *                 (`_pages/case-studies.md`, the same route module): "Four to start with" full width,
 *                 then the four situations as IndexGroups beside the sticky outline rail, each shaped
 *                 by its count, and the enquiry close.
 *   ?state=flat   the FLAT form a CMS route renders: the live entries — real covers, order and links —
 *                 with the IDEAL copy laid over them (src/content/sources/fixtures/ideal/
 *                 case-study-listing.ts). Put it beside the live page and the difference is the
 *                 content ask, not the design.
 */
export default async function CaseStudyIndexSpecimen({ searchParams }: Props) {
  const query = await searchParams;
  const state = Array.isArray(query.state) ? query.state[0] : query.state;
  if (state !== 'flat') return <CaseIndexRoute />;

  const page = await getIdealCaseStudyListingPage(ROUTES.caseStudies.slice(1));
  if (!page) notFound();

  return (
    <CaseStudyIndex
      breadcrumbs={[
        { label: 'Home', href: ROUTES.home },
        { label: 'Case studies', href: ROUTES.caseStudies },
      ]}
      hero={{ name: page.hero.heading, message: page.hero.description }}
      items={page.items.map((caseStudy) => ({
        id: caseStudy.documentId,
        href: caseStudyPath(caseStudy.slug),
        title: caseStudy.title,
        description: caseStudy.description,
        client: caseStudy.client,
        categories: caseStudy.categories.map((category) => category.name),
        cover: caseStudy.thumbnail,
      }))}
    />
  );
}
