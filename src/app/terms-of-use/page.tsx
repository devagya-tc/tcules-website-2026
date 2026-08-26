import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Layout, Prose, Section } from '@/components';
import { getTermsOfUsePage } from '@/content';
import { ROUTES } from '@/lib/routes';
import { Breadcrumbs, PageHero } from '@/patterns';

const TERMS_OF_USE_SLUG = ROUTES.terms.slice(1);

function jsonLdMarkup(data: Record<string, unknown> | unknown[]): string {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

function dateOnly(date: string | undefined): string | undefined {
  return date?.slice(0, 10);
}

export async function generateMetadata(): Promise<Metadata> {
  const termsOfUse = await getTermsOfUsePage(TERMS_OF_USE_SLUG);

  if (!termsOfUse) {
    return {
      title: 'Terms of use not found | Tcules',
      robots: { index: false, follow: false },
    };
  }

  const title = termsOfUse.seo?.title || termsOfUse.title;
  const description = termsOfUse.seo?.description || termsOfUse.description;
  const canonical = termsOfUse.seo?.canonical;

  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(termsOfUse.seo?.robots ? { robots: termsOfUse.seo.robots } : {}),
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

export default async function TermsOfUsePage() {
  const termsOfUse = await getTermsOfUsePage(TERMS_OF_USE_SLUG);

  if (!termsOfUse) notFound();

  const published = dateOnly(termsOfUse.publishedAt);
  const updated = dateOnly(termsOfUse.updatedAt);

  return (
    <>
      {termsOfUse.seo?.structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdMarkup(termsOfUse.seo.structuredData) }}
        />
      ) : null}

      <Breadcrumbs
        surface="paper"
        items={[
          { label: 'Home', href: ROUTES.home },
          { label: termsOfUse.title, href: ROUTES.terms },
        ]}
      />

      <PageHero
        title={termsOfUse.title}
        body={[termsOfUse.description]}
        dates={
          published
            ? { published, ...(updated && updated !== published ? { modified: updated } : {}) }
            : undefined
        }
        surface="paper"
      />

      {termsOfUse.sections.length > 0 ? (
        <Section as="div" surface="paper">
          <Layout as="article" rowGap="section">
            {termsOfUse.sections.map((section) => {
              const content = (
                <Layout rowGap="block">
                  {section.heading ? (
                    <h2 id={`terms-of-use-section-${section.id}`}>{section.heading}</h2>
                  ) : null}
                  {section.bodyHtml ? <Prose html={section.bodyHtml} /> : null}
                </Layout>
              );

              return section.heading ? (
                <section
                  key={section.id}
                  aria-labelledby={`terms-of-use-section-${section.id}`}
                >
                  {content}
                </section>
              ) : (
                <div key={section.id}>{content}</div>
              );
            })}
          </Layout>
        </Section>
      ) : null}
    </>
  );
}
