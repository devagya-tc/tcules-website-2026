import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getIdealCaseStudyListingPage } from '@/content';
import { caseStudyPath, ROUTES } from '@/lib/routes';
import { CaseStudyIndex } from '@/templates';

export const metadata: Metadata = {
  title: 'CaseStudyIndex · ideal content | Design',
  robots: { index: false, follow: false },
};

/**
 * CaseStudyIndex, at the content it was designed for.
 *
 * The same template the live /case-studies renders, fed the live entries — real covers, order and
 * links — with the IDEAL copy laid over them: a client, a 2–8 word title, one 8–15 word line, one
 * label (src/content/sources/fixtures/ideal/case-study-listing.ts). Put it beside the live page and
 * the difference is the content ask, not the design; a card that still looks wrong here is the
 * design's problem.
 *
 * It reads @/content because it is a page, and the covers must be the real ones. The copy is
 * illustrative until the content team replaces it (docs/content-changes.md §2).
 */
export default async function CaseStudyIndexSpecimen() {
  const page = await getIdealCaseStudyListingPage(ROUTES.caseStudies.slice(1));

  if (!page) notFound();

  return (
    <>
      <CaseStudyIndex
        breadcrumbs={[
          { label: 'Home', href: ROUTES.home },
          { label: page.hero.heading, href: ROUTES.caseStudies },
        ]}
        hero={{
          title: page.hero.heading,
          body: page.hero.description,
          action: page.hero.action
            ? { label: page.hero.action.label, href: page.hero.action.href }
            : undefined,
        }}
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
    </>
  );
}
