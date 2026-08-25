import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Layout, Prose, Section } from '@/components';
import { getPrivacyPolicyPage } from '@/content';
import { ROUTES } from '@/lib/routes';
import { Breadcrumbs, PageHero } from '@/patterns';

const PRIVACY_POLICY_SLUG = ROUTES.privacy.slice(1);

function jsonLdMarkup(data: Record<string, unknown> | unknown[]): string {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

function dateOnly(date: string | undefined): string | undefined {
  return date?.slice(0, 10);
}

export async function generateMetadata(): Promise<Metadata> {
  const privacyPolicy = await getPrivacyPolicyPage(PRIVACY_POLICY_SLUG);

  if (!privacyPolicy) {
    return {
      title: 'Privacy policy not found | Tcules',
      robots: { index: false, follow: false },
    };
  }

  const title = privacyPolicy.seo?.title || privacyPolicy.title;
  const description = privacyPolicy.seo?.description || privacyPolicy.description;
  const canonical = privacyPolicy.seo?.canonical;

  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(privacyPolicy.seo?.robots ? { robots: privacyPolicy.seo.robots } : {}),
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

export default async function PrivacyPolicyPage() {
  const privacyPolicy = await getPrivacyPolicyPage(PRIVACY_POLICY_SLUG);

  if (!privacyPolicy) notFound();

  const published = dateOnly(privacyPolicy.publishedAt);
  const updated = dateOnly(privacyPolicy.updatedAt);

  return (
    <>
      {privacyPolicy.seo?.structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdMarkup(privacyPolicy.seo.structuredData) }}
        />
      ) : null}

      <Breadcrumbs
        surface="paper"
        items={[
          { label: 'Home', href: ROUTES.home },
          { label: privacyPolicy.title, href: ROUTES.privacy },
        ]}
      />

      <PageHero
        title={privacyPolicy.title}
        body={[privacyPolicy.description]}
        dates={
          published
            ? { published, ...(updated && updated !== published ? { modified: updated } : {}) }
            : undefined
        }
        surface="paper"
      />

      {privacyPolicy.sections.length > 0 ? (
        <Section as="div" surface="paper">
          <Layout as="article" rowGap="section">
            {privacyPolicy.sections.map((section) => {
              const content = (
                <Layout rowGap="block">
                  {section.heading ? (
                    <h2 id={`privacy-policy-section-${section.id}`}>{section.heading}</h2>
                  ) : null}
                  {section.bodyHtml ? <Prose html={section.bodyHtml} /> : null}
                </Layout>
              );

              return section.heading ? (
                <section
                  key={section.id}
                  aria-labelledby={`privacy-policy-section-${section.id}`}
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
