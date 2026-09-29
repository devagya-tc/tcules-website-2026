import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCaseStudyListingPage } from '@/content';
import { caseStudyPath, ROUTES } from '@/lib/routes';
import { CaseStudyIndex } from '@/templates';

const CASE_STUDIES_SLUG = ROUTES.caseStudies.slice(1);

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCaseStudyListingPage(CASE_STUDIES_SLUG);

  if (!page) {
    return {
      title: 'Case studies not found | Tcules',
      robots: { index: false, follow: false },
    };
  }

  const title = page.seo?.title || page.hero.heading;
  const description = page.seo?.description || page.hero.description;
  const canonical = page.seo?.canonical;

  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(page.seo?.robots ? { robots: page.seo.robots } : {}),
    openGraph: {
      title,
      description,
      type: 'website',
      ...(canonical ? { url: canonical } : {}),
      images: [],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [],
    },
  };
}

export default async function CaseStudiesPage() {
  const page = await getCaseStudyListingPage(CASE_STUDIES_SLUG);

  if (!page) notFound();

  return (
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
      closing={
        page.misc
          ? {
              eyebrow: page.misc.label,
              heading: page.misc.heading,
              body: page.misc.description,
              action: page.misc.action
                ? { label: page.misc.action.label, href: page.misc.action.href }
                : undefined,
            }
          : undefined
      }
    />
  );
}
