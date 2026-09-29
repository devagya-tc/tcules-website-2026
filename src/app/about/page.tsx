import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Button, Cluster, Icon, Layout, Section } from '@/components';
import { getAboutPage } from '@/content';
import { ROUTES } from '@/lib/routes';
import { BlockCard, Breadcrumbs, ListCard, PageHero } from '@/patterns';

const ABOUT_SLUG = ROUTES.about.slice(1);

function jsonLdMarkup(data: Record<string, unknown> | unknown[]): string {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage(ABOUT_SLUG);

  if (!page) {
    return {
      title: 'About not found | Tcules',
      robots: { index: false, follow: false },
    };
  }

  const title = page.seo?.title || page.hero.heading;
  const description = page.seo?.description || page.hero.description;
  const canonical = page.seo?.canonical;
  const heroImage = page.hero.image;
  const openGraphImages = heroImage
    ? [
        {
          url: heroImage.src,
          width: heroImage.width,
          height: heroImage.height,
          alt: heroImage.alt,
        },
      ]
    : [];

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
      images: openGraphImages,
    },
    twitter: {
      card: heroImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: heroImage ? [heroImage.src] : [],
    },
  };
}

export default async function AboutPage() {
  const page = await getAboutPage(ABOUT_SLUG);

  if (!page) notFound();

  const breadcrumbLabel = page.slug
    .split('-')
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');

  return (
    <>
      {page.seo?.structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdMarkup(page.seo.structuredData) }}
        />
      ) : null}

      <Breadcrumbs
        surface="paper"
        items={[
          { label: 'Home', href: ROUTES.home },
          { label: breadcrumbLabel, href: ROUTES.about },
        ]}
      />

      <PageHero
        title={page.hero.heading}
        body={[page.hero.description]}
        media={
          /* The record nested, never spread: the hero's `type: 'image'` discriminates the media
             union, and the record keeps its own `kind` (capture, cut-out…), which is Media's. */
          page.hero.image ? { type: 'image', image: page.hero.image } : undefined
        }
        surface="paper"
      />

      {page.introduction ? (
        <Section
          surface="tint"
          aria-labelledby={page.introduction.heading ? 'about-introduction-heading' : undefined}
        >
          <Layout
            columns={{ base: 1, lg: [3, 2] }}
            colGap="column"
            rowGap="block"
            align="start"
          >
            {page.introduction.heading ? (
              <h2 id="about-introduction-heading">{page.introduction.heading}</h2>
            ) : null}
            {page.introduction.description ? <p>{page.introduction.description}</p> : null}
          </Layout>
        </Section>
      ) : null}

      {page.secondSection ? (
        <Section
          surface="paper"
          aria-labelledby={
            page.secondSection.heading
              ? `about-section-${page.secondSection.id}-heading`
              : undefined
          }
        >
          <Layout rowGap="stack">
            <Layout
              columns={{ base: 1, lg: [3, 2] }}
              colGap="column"
              rowGap="block"
              align="start"
            >
              {page.secondSection.heading ? (
                <h2 id={`about-section-${page.secondSection.id}-heading`}>
                  {page.secondSection.heading}
                </h2>
              ) : null}
              {page.secondSection.description ? <p>{page.secondSection.description}</p> : null}
            </Layout>

            {page.secondSection.images.length > 0 ? (
              <Layout
                columns={{ base: 1, md: 2, lg: 3 }}
                colGap="gutter"
                rowGap="gutter"
                align="start"
              >
                {page.secondSection.images.map((image) => (
                  // eslint-disable-next-line @next/next/no-img-element -- CMS-authored about gallery
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </Layout>
            ) : null}
          </Layout>
        </Section>
      ) : null}

      {page.thirdSection ? (
        <Section
          surface="ink"
          aria-labelledby={
            page.thirdSection.heading
              ? `about-section-${page.thirdSection.id}-heading`
              : undefined
          }
        >
          <Layout rowGap="stack">
            <Layout
              columns={{ base: 1, lg: [2, 3] }}
              colGap="column"
              rowGap="block"
              align="start"
            >
              {page.thirdSection.heading ? (
                <h2 id={`about-section-${page.thirdSection.id}-heading`}>
                  {page.thirdSection.heading}
                </h2>
              ) : null}
              {page.thirdSection.description ? <p>{page.thirdSection.description}</p> : null}
            </Layout>

            {page.thirdSection.images.length > 0 ? (
              <Layout
                columns={{ base: 1, md: 2, lg: 3 }}
                colGap="gutter"
                rowGap="gutter"
                align="start"
              >
                {page.thirdSection.images.map((image) => (
                  // eslint-disable-next-line @next/next/no-img-element -- CMS-authored about gallery
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </Layout>
            ) : null}
          </Layout>
        </Section>
      ) : null}

      {page.principles ? (
        <Section
          surface="paper"
          aria-labelledby={page.principles.heading ? 'about-principles-heading' : undefined}
        >
          <Layout
            columns={{ base: 1, lg: [2, 3] }}
            colGap="column"
            rowGap="stack"
            align="start"
          >
            {page.principles.heading ? (
              <h2 id="about-principles-heading">{page.principles.heading}</h2>
            ) : null}
            {page.principles.items.length > 0 ? (
              <Layout as="ul" rowGap="block">
                {page.principles.items.map((item) => (
                  <Layout as="li" key={item.id} rowGap="tight">
                    <h3>{item.title}</h3>
                    {item.body ? <p>{item.body}</p> : null}
                  </Layout>
                ))}
              </Layout>
            ) : null}
          </Layout>
        </Section>
      ) : null}

      {page.voices ? (
        <Section
          surface="tint"
          aria-labelledby={page.voices.heading ? 'about-voices-heading' : undefined}
        >
          <Layout rowGap="stack">
            {page.voices.heading ? (
              <h2 id="about-voices-heading">{page.voices.heading}</h2>
            ) : null}
            {page.voices.cards.length > 0 ? (
              <Layout
                as="ul"
                columns={{ base: 1, md: 2, lg: 3 }}
                colGap="gutter"
                rowGap="gutter"
                equalRows
              >
                {page.voices.cards.map((card) => (
                  <BlockCard
                    key={card.id}
                    title={card.title}
                    body={card.body}
                    eyebrow={card.eyebrow}
                    media={
                      card.image
                        ? { type: 'image', image: card.image }
                        : undefined
                    }
                  />
                ))}
              </Layout>
            ) : null}
          </Layout>
        </Section>
      ) : null}

      {page.checklist ? (
        <Section
          surface="paper"
          aria-labelledby={page.checklist.heading ? 'about-checklist-heading' : undefined}
        >
          <Layout rowGap="stack">
            {page.checklist.heading ? (
              <h2 id="about-checklist-heading">{page.checklist.heading}</h2>
            ) : null}
            {page.checklist.cards.length > 0 ? (
              <Layout as="ol" rowGap="none">
                {page.checklist.cards.map((card, index) => (
                  <ListCard
                    key={card.id}
                    title={card.title}
                    body={card.body}
                    marker={{ type: 'number', value: index + 1 }}
                    titleAs="h3"
                  />
                ))}
              </Layout>
            ) : null}
          </Layout>
        </Section>
      ) : null}

      {page.closing ? (
        <Section
          surface="tint"
          aria-labelledby={page.closing.heading ? 'about-closing-heading' : undefined}
        >
          <Layout rowGap="stack">
            <Layout
              columns={{ base: 1, lg: [3, 2] }}
              colGap="column"
              rowGap="block"
              align="start"
            >
              {page.closing.heading ? (
                <h2 id="about-closing-heading">{page.closing.heading}</h2>
              ) : null}
              {page.closing.action ? (
                <Cluster>
                  <Button
                    as="a"
                    href={page.closing.action.href}
                    emphasis="solid"
                    tone="primary"
                    size="lg"
                    icon={<Icon name="arrow-right" />}
                  >
                    {page.closing.action.label}
                  </Button>
                </Cluster>
              ) : null}
            </Layout>

            {page.closing.cards.length > 0 ? (
              <Layout
                as="ul"
                columns={{ base: 1, md: 2 }}
                colGap="gutter"
                rowGap="gutter"
                equalRows
              >
                {page.closing.cards.map((card) => {
                  const headingId = `about-closing-card-${card.id}-heading`;

                  return (
                    <Section
                      as="li"
                      key={card.id}
                      surface={card.surface}
                      density="tight"
                      aria-labelledby={headingId}
                    >
                      <Layout rowGap="block">
                        {card.icon ? (
                          // eslint-disable-next-line @next/next/no-img-element -- CMS-authored card mark
                          <img
                            src={card.icon.src}
                            alt={card.icon.alt}
                            width={card.icon.width}
                            height={card.icon.height}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : null}
                        <Layout rowGap="tight">
                          <h3 id={headingId}>{card.title}</h3>
                          {card.body ? <p>{card.body}</p> : null}
                        </Layout>
                        {card.action ? (
                          <Cluster>
                            <Button
                              as="a"
                              href={card.action.href}
                              emphasis="link"
                              tone="neutral"
                              size="md"
                              icon={<Icon name="arrow-right" />}
                              extendHitArea
                            >
                              {card.action.label}
                            </Button>
                          </Cluster>
                        ) : null}
                      </Layout>
                    </Section>
                  );
                })}
              </Layout>
            ) : null}
          </Layout>
        </Section>
      ) : null}
    </>
  );
}
