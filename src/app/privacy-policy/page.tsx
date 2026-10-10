import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Layout, Prose, Section } from '@/components';
import { getPrivacyPolicyPage } from '@/content';
import { ROUTES } from '@/lib/routes';
import { heroTrail } from '@/lib/trail';
import { Breadcrumbs, PageHero, TableOfContents, type TocItem } from '@/patterns';

const PRIVACY_POLICY_SLUG = ROUTES.privacy.slice(1);

/**
 * The one place this page's section anchors are spelled. The outline and the heading both read it,
 * so an entry can never point at an id the document does not carry — which is the failure
 * TableOfContents can only report at runtime, and only in development.
 */
const anchorId = (id: string) => `privacy-policy-section-${id}`;

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

  /* The outline. A privacy policy IS a long-form document — read end to end, cited by section, linked to
     by fragment — which is what earns it a rail; page type decides, not heading count
     (docs/specs/TableOfContents.md § 1).

     The label is the heading itself, and here that is the right answer rather than a fallback: these
     headings are already navigation labels. Measured over what Strapi returns today, terms-of-use
     runs 11 sections at a median of 16 characters and a maximum of 26, privacy-policy 7 at 22 and
     27 — none over the component's 40-character warning, where the corpus's editorial section
     headings run to a median of 35 and a maximum of 87. Legal headings are terse by convention, so
     no navigationLabel field is needed for these two.

     Typed rather than inferred: `href` is `#${string}` and a bare template expression in a
     standalone const widens to `string`. */
  const outline: TocItem[] = privacyPolicy.sections.flatMap((section) =>
    section.heading
      ? [{ label: section.heading, href: `#${anchorId(section.id)}` as const }]
      : [],
  );

  /* The component's own floor is two. Below it there is no rail AND no reserved track — a [1, 4]
     grid would otherwise squeeze the document into four-fifths of the content column for nothing. */
  const hasOutline = outline.length >= 2;

  return (
    <>
      {privacyPolicy.seo?.structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdMarkup(privacyPolicy.seo.structuredData) }}
        />
      ) : null}

      <PageHero
        trail={heroTrail(
          [
            { label: 'Home', href: ROUTES.home },
            { label: privacyPolicy.title, href: ROUTES.privacy },
          ],
          privacyPolicy.title,
          (t) => (
            <Breadcrumbs {...t} />
          ),
        )}
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
          {/* The shell from docs/specs/TableOfContents.md § 10. The rail is a TRACK, not a band, so
              it sits inside this Section rather than above it — which is what makes the two
              arrangements one piece of markup: below 1024 the columns collapse and the first track
              becomes the first block of the Section, with nothing moved in the DOM.

              `align="start"` is required rather than stylistic: a stretched grid item fills the row
              and has nowhere to stick. The <article> stays around the document itself — the outline
              is about the article, not part of it. */}
          <Layout
            columns={hasOutline ? { base: 1, lg: [1, 4] } : { base: 1 }}
            colGap="column"
            rowGap="stack"
            align="start"
          >
            {hasOutline ? <TableOfContents items={outline} /> : null}
            <Layout as="article" rowGap="section">
              {privacyPolicy.sections.map((section) => {
                const content = (
                  <Layout rowGap="block">
                    {section.heading ? (
                      <h2 id={anchorId(section.id)}>{section.heading}</h2>
                    ) : null}
                    {section.bodyHtml ? <Prose html={section.bodyHtml} /> : null}
                  </Layout>
                );

                return section.heading ? (
                  <section key={section.id} aria-labelledby={anchorId(section.id)}>
                    {content}
                  </section>
                ) : (
                  <div key={section.id}>{content}</div>
                );
              })}
            </Layout>
          </Layout>
        </Section>
      ) : null}
    </>
  );
}
