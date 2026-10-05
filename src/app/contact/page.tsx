import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Button, Cluster, Icon, Layout, Section } from '@/components';
import { getContactPage, type ContactAction } from '@/content';
import { ENDPOINTS, ROUTES } from '@/lib/routes';
import { Breadcrumbs, EnquiryForm, ListCard, PageHero } from '@/patterns';

const CONTACT_SLUG = ROUTES.contact.slice(1);

function externalAnchorProps(action: ContactAction) {
  return action.external ? { target: '_blank', rel: 'noreferrer' } : {};
}

function jsonLdMarkup(data: Record<string, unknown> | unknown[]): string {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage(CONTACT_SLUG);

  if (!page) {
    return {
      title: 'Contact page not found | Tcules',
      robots: { index: false, follow: false },
    };
  }

  const title = page.seo?.title || page.heading;
  const description = page.seo?.description || page.description;
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
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function ContactPage() {
  const page = await getContactPage(CONTACT_SLUG);

  if (!page) notFound();

  return (
    <>
      {page.seo?.structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdMarkup(page.seo.structuredData) }}
        />
      ) : null}

      <PageHero
        trail={{
          crumbs: (
            <Breadcrumbs
              items={[
                { label: 'Home', href: ROUTES.home },
                { label: 'Contact', href: ROUTES.contact },
              ]}
            />
          ),
          current: 'Contact',
        }}
        title={page.heading}
        body={[page.description]}
        surface="paper"
      >
        <EnquiryForm variant="contact" action={ENDPOINTS.contact} />
      </PageHero>

      {page.cards.length > 0 || page.socialMedia.length > 0 ? (
        <Section as="div" surface="tint">
          <Layout rowGap="stack">
            {page.cards.length > 0 ? (
              <Layout as="ul" rowGap="none">
                {page.cards.map((card) => {
                  const action = card.action;

                  /* No marker. The CMS still sends `card.icon` / `action.icon` — small line-icon
                     PNGs — and they rendered as 160px cover thumbnails, blurred and cropped. A
                     thumbnail is for case-study and insight/resource rows only (ruling C1, ch05
                     § 9), and a glyph that is not Solar Bold is not an icon marker either (ch04).
                     The title names the channel; docs/strapi-changes.md logs the unused field. */
                  return (
                    <ListCard
                      key={card.id}
                      title={card.heading}
                      body={
                        action
                          ? [action.label, action.description].filter(Boolean).join(' — ')
                          : ''
                      }
                      href={action?.href}
                      external={action?.external}
                    />
                  );
                })}
              </Layout>
            ) : null}

            {page.socialMedia.length > 0 ? (
              <nav aria-label="Social media">
                <Layout
                  as="ul"
                  columns={{ base: 1, md: 2, lg: 4 }}
                  colGap="gutter"
                  rowGap="block"
                >
                  {page.socialMedia.map((social) => (
                    <Layout as="li" key={social.id} rowGap="tight">
                      <Cluster>
                        <Button
                          as="a"
                          href={social.href}
                          emphasis="link"
                          tone="neutral"
                          icon={<Icon name="arrow-right" />}
                          extendHitArea
                          {...externalAnchorProps(social)}
                        >
                          {social.label}
                        </Button>
                      </Cluster>
                      {social.description ? <p>{social.description}</p> : null}
                    </Layout>
                  ))}
                </Layout>
              </nav>
            ) : null}
          </Layout>
        </Section>
      ) : null}
    </>
  );
}
