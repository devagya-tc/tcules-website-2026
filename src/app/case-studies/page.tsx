import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Layout, Section } from '@/components';
import { getCaseStudyListingPage } from '@/content';
import { caseStudyPath, ROUTES } from '@/lib/routes';
import { BlockCard, Breadcrumbs, CtaSection, PageHero } from '@/patterns';

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

  const heroActions = page.hero.action
    ? ([{ label: page.hero.action.label, href: page.hero.action.href }] as const)
    : undefined;

  return (
    <>
      <Breadcrumbs
        surface="paper"
        items={[
          { label: 'Home', href: ROUTES.home },
          { label: page.hero.heading, href: ROUTES.caseStudies },
        ]}
      />

      <PageHero
        title={page.hero.heading}
        body={[page.hero.description]}
        actions={heroActions}
        surface="paper"
      />

      {page.items.length > 0 ? (
        <Section as="div" surface="paper">
          <Layout as="ul" columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="stack">
            {page.items.map((caseStudy) => (
              <BlockCard
                key={caseStudy.documentId}
                title={caseStudy.title}
                body={caseStudy.description}
                eyebrow={
                  caseStudy.categories.length > 0
                    ? caseStudy.categories.map((category) => category.name).join(' · ')
                    : undefined
                }
                media={
                  caseStudy.thumbnail
                    ? {
                        kind: 'image',
                        src: caseStudy.thumbnail.src,
                        alt: caseStudy.thumbnail.alt,
                      }
                    : undefined
                }
                href={caseStudyPath(caseStudy.slug)}
                ctaLabel="Read the case study"
              />
            ))}
          </Layout>
        </Section>
      ) : null}

      {page.misc ? (
        page.misc.action ? (
          <CtaSection
            arrangement="open"
            surface="tint"
            eyebrow={page.misc.label || undefined}
            heading={page.misc.heading}
            body={[page.misc.description]}
            actions={[
              {
                label: page.misc.action.label,
                href: page.misc.action.href,
              },
            ]}
          />
        ) : (
          <Section surface="tint" aria-labelledby="case-studies-misc-heading">
            <Layout rowGap="block">
              {page.misc.label ? <p>{page.misc.label}</p> : null}
              <h2 id="case-studies-misc-heading">{page.misc.heading}</h2>
              {page.misc.description ? <p>{page.misc.description}</p> : null}
            </Layout>
          </Section>
        )
      ) : null}
    </>
  );
}
