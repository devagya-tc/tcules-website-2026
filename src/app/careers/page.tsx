import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Button, Cluster, Icon, Layout, Section } from '@/components';
import { getCareerPage, type CareerAction } from '@/content';
import { ROUTES } from '@/lib/routes';
import { heroTrail } from '@/lib/trail';
import { BlockCard, Breadcrumbs, PageHero } from '@/patterns';

const CAREERS_SLUG = ROUTES.careers.slice(1);

function externalAnchorProps(action: CareerAction) {
  return action.external ? { target: '_blank', rel: 'noreferrer' } : {};
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCareerPage(CAREERS_SLUG);

  if (!page) {
    return {
      title: 'Careers not found | Tcules',
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
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function CareersPage() {
  const page = await getCareerPage(CAREERS_SLUG);

  if (!page) notFound();

  return (
    <>
      <PageHero
        trail={heroTrail(
          [
            { label: 'Home', href: ROUTES.home },
            { label: 'Careers', href: ROUTES.careers },
          ],
          page.hero.heading,
          (t) => (
            <Breadcrumbs {...t} />
          ),
        )}
        title={page.hero.heading}
        body={[page.hero.description]}
        surface="paper"
      />

      {page.secondSection ? (
        <Section
          surface="tint"
          aria-labelledby={page.secondSection.heading ? 'careers-values-heading' : undefined}
        >
          <Layout rowGap="stack">
            {page.secondSection.heading ? (
              <h2 id="careers-values-heading">{page.secondSection.heading}</h2>
            ) : null}

            {page.secondSection.cards.length > 0 ? (
              <Layout
                as="ul"
                columns={{ base: 1, md: 2, lg: 4 }}
                colGap="gutter"
                rowGap="column"
                equalRows
              >
                {page.secondSection.cards.map((card) => (
                  <Layout as="li" key={card.id} rowGap="block">
                    {card.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element -- CMS-authored careers icon
                      <img
                        src={card.icon.src}
                        alt={card.icon.alt}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                    <h3>{card.heading}</h3>
                    {card.action ? (
                      <Cluster>
                        <Button
                          as="a"
                          href={card.action.href}
                          emphasis="link"
                          tone="primary"
                          icon={<Icon name="arrow-right" />}
                          extendHitArea
                          {...externalAnchorProps(card.action)}
                        >
                          {card.action.label}
                        </Button>
                      </Cluster>
                    ) : null}
                  </Layout>
                ))}
              </Layout>
            ) : null}
          </Layout>
        </Section>
      ) : null}

      {page.thirdSection ? (
        <Section
          surface="paper"
          aria-labelledby={page.thirdSection.heading ? 'careers-openings-heading' : undefined}
        >
          <Layout rowGap="stack">
            <Layout
              columns={{ base: 1, lg: [2, 3] }}
              colGap="column"
              rowGap="block"
              align="start"
            >
              {page.thirdSection.heading ? (
                <h2 id="careers-openings-heading">{page.thirdSection.heading}</h2>
              ) : null}
              {page.thirdSection.description ? <p>{page.thirdSection.description}</p> : null}
            </Layout>

            {page.thirdSection.openings.length > 0 ? (
              <Layout
                as="ul"
                columns={{ base: 1, md: 2 }}
                colGap="gutter"
                rowGap="column"
                equalRows
              >
                {page.thirdSection.openings.map((opening) => {
                  const body = [opening.roleLocation, opening.roleDescription]
                    .filter(Boolean)
                    .join(' — ');

                  return (
                    <BlockCard
                      key={opening.documentId}
                      title={opening.roleName}
                      body={body}
                      eyebrow={opening.roleDomain || undefined}
                      href={opening.action?.href}
                      ctaLabel={opening.action?.label}
                    />
                  );
                })}
              </Layout>
            ) : null}
          </Layout>
        </Section>
      ) : null}

      {page.fourthSection ? (
        <Section
          surface="ink"
          aria-labelledby={page.fourthSection.heading ? 'careers-lab-heading' : undefined}
        >
          <Layout rowGap="stack">
            <Layout
              columns={{ base: 1, lg: [3, 2] }}
              colGap="column"
              rowGap="block"
              align="start"
            >
              <Layout rowGap="block">
                {page.fourthSection.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element -- CMS-authored careers icon
                  <img
                    src={page.fourthSection.icon.src}
                    alt={page.fourthSection.icon.alt}
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
                {page.fourthSection.heading ? (
                  <h2 id="careers-lab-heading">{page.fourthSection.heading}</h2>
                ) : null}
              </Layout>
              {page.fourthSection.action ? (
                <Cluster>
                  <Button
                    as="a"
                    href={page.fourthSection.action.href}
                    /* The page's closing ask ("Begin engagement", to the Lab's application form):
                       the blue solid (r7-buttons, 8 Oct 2026). */
                    emphasis="solid"
                    size="lg"
                    {...externalAnchorProps(page.fourthSection.action)}
                  >
                    {page.fourthSection.action.label}
                  </Button>
                </Cluster>
              ) : null}
            </Layout>

            {page.fourthSection.cards.length > 0 ? (
              <Layout
                as="ul"
                columns={{ base: 1, md: 3 }}
                colGap="gutter"
                rowGap="column"
                equalRows
              >
                {page.fourthSection.cards.map((card) => (
                  <Layout as="li" key={card.id} rowGap="block">
                    {card.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element -- CMS-authored careers icon
                      <img
                        src={card.icon.src}
                        alt={card.icon.alt}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                    <h3>{card.heading}</h3>
                    {card.action ? (
                      <Cluster>
                        <Button
                          as="a"
                          href={card.action.href}
                          emphasis="link"
                          tone="primary"
                          icon={<Icon name="arrow-right" />}
                          extendHitArea
                          {...externalAnchorProps(card.action)}
                        >
                          {card.action.label}
                        </Button>
                      </Cluster>
                    ) : null}
                  </Layout>
                ))}
              </Layout>
            ) : null}

            {page.fourthSection.bottomHeading || page.fourthSection.bottomAction ? (
              <Layout
                columns={{ base: 1, lg: [3, 2] }}
                colGap="column"
                rowGap="block"
                align="start"
              >
                {page.fourthSection.bottomHeading ? (
                  <h3>{page.fourthSection.bottomHeading}</h3>
                ) : null}
                {page.fourthSection.bottomAction ? (
                  <Cluster>
                    <Button
                      as="a"
                      href={page.fourthSection.bottomAction.href}
                      emphasis="ghost"
                      tone="primary"
                      icon={<Icon name="arrow-right" />}
                      {...externalAnchorProps(page.fourthSection.bottomAction)}
                    >
                      {page.fourthSection.bottomAction.label}
                    </Button>
                  </Cluster>
                ) : null}
              </Layout>
            ) : null}
          </Layout>
        </Section>
      ) : null}
    </>
  );
}
