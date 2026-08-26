import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Cluster, Layout, Section } from '@/components';
import { getMatterDesignSystemPage } from '@/content';
import { ROUTES } from '@/lib/routes';
import { BlockCard, Breadcrumbs, CtaSection, Figure, PageHero } from '@/patterns';

const MATTER_DESIGN_SYSTEM_SLUG = ROUTES.matterDesignSystem.slice(1);

function jsonLdMarkup(data: Record<string, unknown> | unknown[]): string {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getMatterDesignSystemPage(MATTER_DESIGN_SYSTEM_SLUG);

  if (!page) {
    return {
      title: 'Matter design system not found | Tcules',
      robots: { index: false, follow: false },
    };
  }

  const heroTitle = [page.hero.headingOne, page.hero.headingTwo].filter(Boolean).join(' ');
  const title = page.seo?.title || heroTitle;
  const description = page.seo?.description || page.hero.description;
  const canonical = page.seo?.canonical;
  const image = page.hero.image;

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
      images: image
        ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }]
        : [],
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image.src] : [],
    },
  };
}

export default async function MatterDesignSystemPage() {
  const page = await getMatterDesignSystemPage(MATTER_DESIGN_SYSTEM_SLUG);

  if (!page) notFound();

  const heroTitle = [page.hero.headingOne, page.hero.headingTwo].filter(Boolean).join(' ');
  const heroActions = page.hero.action
    ? ([{ label: page.hero.action.label, href: page.hero.action.href }] as const)
    : ([] as const);
  const heroMedia = page.hero.image
    ? {
        kind: 'image' as const,
        src: page.hero.image.src,
        alt: page.hero.image.alt,
        width: page.hero.image.width,
        height: page.hero.image.height,
      }
    : undefined;

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
          {
            label: page.hero.headingTwo || page.hero.headingOne,
            href: ROUTES.matterDesignSystem,
          },
        ]}
      />

      <PageHero
        title={heroTitle}
        eyebrow={page.hero.eyebrow || undefined}
        body={[page.hero.description]}
        actions={heroActions}
        media={heroMedia}
        surface="paper"
      />

      {page.secondSection ? (
        <Section surface="tint" aria-labelledby={`matter-second-${page.secondSection.id}`}>
          <Layout rowGap="stack">
            <Cluster colGap="tight" nowrap>
              {page.secondSection.icon ? (
                /* eslint-disable-next-line @next/next/no-img-element -- CMS-authored decorative mark */
                <img
                  src={page.secondSection.icon.src}
                  alt={page.secondSection.icon.alt}
                  width={page.secondSection.icon.width}
                  height={page.secondSection.icon.height}
                />
              ) : null}
              <h2 id={`matter-second-${page.secondSection.id}`}>
                {page.secondSection.heading}
              </h2>
            </Cluster>
            {page.secondSection.cards.length > 0 ? (
              <Layout
                as="ul"
                columns={{ base: 1, md: 3 }}
                colGap="gutter"
                rowGap="gutter"
                equalRows
              >
                {page.secondSection.cards.map((card) => (
                  <BlockCard
                    key={card.id}
                    title={card.title}
                    body={card.body}
                    media={
                      card.image || card.icon
                        ? {
                            kind: 'image',
                            src: (card.image || card.icon)?.src || '',
                            alt: (card.image || card.icon)?.alt || '',
                          }
                        : undefined
                    }
                    href={card.action?.href}
                    ctaLabel={card.action?.label}
                  />
                ))}
              </Layout>
            ) : null}
          </Layout>
        </Section>
      ) : null}

      {page.thirdSection ? (
        <Section surface="paper" aria-labelledby={`matter-third-${page.thirdSection.id}`}>
          <Layout rowGap="stack">
            <Cluster colGap="tight" nowrap>
              {page.thirdSection.icon ? (
                /* eslint-disable-next-line @next/next/no-img-element -- CMS-authored decorative mark */
                <img
                  src={page.thirdSection.icon.src}
                  alt={page.thirdSection.icon.alt}
                  width={page.thirdSection.icon.width}
                  height={page.thirdSection.icon.height}
                />
              ) : null}
              <h2 id={`matter-third-${page.thirdSection.id}`}>{page.thirdSection.heading}</h2>
            </Cluster>
            {page.thirdSection.cards.length > 0 ? (
              <Layout as="ul" columns="fit" minTrack="lg" colGap="gutter" rowGap="gutter">
                {page.thirdSection.cards.map((card) => (
                  <BlockCard
                    key={card.id}
                    title={card.title}
                    body={card.body}
                    media={
                      card.image || card.icon
                        ? {
                            kind: 'image',
                            src: (card.image || card.icon)?.src || '',
                            alt: (card.image || card.icon)?.alt || '',
                          }
                        : undefined
                    }
                    href={card.action?.href}
                    ctaLabel={card.action?.label}
                  />
                ))}
              </Layout>
            ) : null}
          </Layout>
        </Section>
      ) : null}

      {page.stripOne ? (
        page.stripOne.action ? (
          <CtaSection
            arrangement="offer"
            surface="blue"
            heading={page.stripOne.heading}
            body={[page.stripOne.description]}
            actions={[{ label: page.stripOne.action.label, href: page.stripOne.action.href }]}
          />
        ) : (
          <Section surface="blue" aria-labelledby={`matter-strip-one-${page.stripOne.id}`}>
            <Layout rowGap="block">
              <h2 id={`matter-strip-one-${page.stripOne.id}`}>{page.stripOne.heading}</h2>
              {page.stripOne.description ? <p>{page.stripOne.description}</p> : null}
            </Layout>
          </Section>
        )
      ) : null}

      {page.fourthSection ? (
        <Section surface="tint" aria-labelledby={`matter-fourth-${page.fourthSection.id}`}>
          <Layout rowGap="stack">
            <Cluster colGap="tight" nowrap>
              {page.fourthSection.icon ? (
                /* eslint-disable-next-line @next/next/no-img-element -- CMS-authored decorative mark */
                <img
                  src={page.fourthSection.icon.src}
                  alt={page.fourthSection.icon.alt}
                  width={page.fourthSection.icon.width}
                  height={page.fourthSection.icon.height}
                />
              ) : null}
              <h2 id={`matter-fourth-${page.fourthSection.id}`}>
                {page.fourthSection.heading}
              </h2>
            </Cluster>
            {page.fourthSection.cards.length > 0 ? (
              <Layout
                as="ul"
                columns={{ base: 1, md: 2, lg: 4 }}
                colGap="gutter"
                rowGap="gutter"
              >
                {page.fourthSection.cards.map((card) => (
                  <Layout as="li" key={card.id} rowGap="block">
                    {card.heading ? <h3>{card.heading}</h3> : null}
                    {card.images.map((image, index) =>
                      image.width && image.height ? (
                        <Figure
                          key={`${card.id}-${image.src}`}
                          image={{
                            src: image.src,
                            alt: image.alt,
                            width: image.width,
                            height: image.height,
                          }}
                          caption={index === 0 ? card.description : ''}
                        />
                      ) : null,
                    )}
                    {card.icon && card.icon.width && card.icon.height ? (
                      <Figure
                        image={{
                          src: card.icon.src,
                          alt: card.icon.alt,
                          width: card.icon.width,
                          height: card.icon.height,
                        }}
                        caption={card.description}
                      />
                    ) : null}
                    {card.images.length === 0 && !card.icon && card.description ? (
                      <p>{card.description}</p>
                    ) : null}
                  </Layout>
                ))}
              </Layout>
            ) : null}
          </Layout>
        </Section>
      ) : null}

      {page.fifthSection ? (
        <Section surface="paper" aria-labelledby={`matter-fifth-${page.fifthSection.id}`}>
          <Layout rowGap="stack">
            <Cluster colGap="tight" nowrap>
              {page.fifthSection.icon ? (
                /* eslint-disable-next-line @next/next/no-img-element -- CMS-authored decorative mark */
                <img
                  src={page.fifthSection.icon.src}
                  alt={page.fifthSection.icon.alt}
                  width={page.fifthSection.icon.width}
                  height={page.fifthSection.icon.height}
                />
              ) : null}
              <h2 id={`matter-fifth-${page.fifthSection.id}`}>{page.fifthSection.heading}</h2>
            </Cluster>
            {page.fifthSection.cards.length > 0 ? (
              <Layout
                as="ul"
                columns={{ base: 1, md: 2 }}
                colGap="gutter"
                rowGap="gutter"
                equalRows
              >
                {page.fifthSection.cards.map((card) => (
                  <BlockCard
                    key={card.id}
                    title={card.title}
                    body={card.body}
                    media={
                      card.image || card.icon
                        ? {
                            kind: 'image',
                            src: (card.image || card.icon)?.src || '',
                            alt: (card.image || card.icon)?.alt || '',
                          }
                        : undefined
                    }
                    href={card.action?.href}
                    ctaLabel={card.action?.label}
                  />
                ))}
              </Layout>
            ) : null}
          </Layout>
        </Section>
      ) : null}

      {page.stripTwo ? (
        page.stripTwo.action ? (
          <CtaSection
            arrangement="open"
            surface="ink"
            heading={page.stripTwo.heading}
            body={[page.stripTwo.description]}
            actions={[{ label: page.stripTwo.action.label, href: page.stripTwo.action.href }]}
            proof={
              page.stripTwo.backgroundImage ? (
                /* eslint-disable-next-line @next/next/no-img-element -- CMS-authored CTA artwork */
                <img
                  src={page.stripTwo.backgroundImage.src}
                  alt={page.stripTwo.backgroundImage.alt}
                  width={page.stripTwo.backgroundImage.width}
                  height={page.stripTwo.backgroundImage.height}
                  loading="lazy"
                  decoding="async"
                />
              ) : undefined
            }
          />
        ) : (
          <Section surface="ink" aria-labelledby={`matter-strip-two-${page.stripTwo.id}`}>
            <Layout rowGap="block">
              <h2 id={`matter-strip-two-${page.stripTwo.id}`}>{page.stripTwo.heading}</h2>
              {page.stripTwo.description ? <p>{page.stripTwo.description}</p> : null}
            </Layout>
          </Section>
        )
      ) : null}

      {page.contactUs ? (
        <Section surface="tint" aria-labelledby={`matter-contact-${page.contactUs.id}`}>
          <Layout rowGap="block">
            <Cluster colGap="tight" nowrap>
              {page.contactUs.icon ? (
                /* eslint-disable-next-line @next/next/no-img-element -- CMS-authored decorative mark */
                <img
                  src={page.contactUs.icon.src}
                  alt={page.contactUs.icon.alt}
                  width={page.contactUs.icon.width}
                  height={page.contactUs.icon.height}
                />
              ) : null}
              <h2 id={`matter-contact-${page.contactUs.id}`}>
                {[page.contactUs.headingOne, page.contactUs.headingTwo]
                  .filter(Boolean)
                  .join(' ')}
              </h2>
            </Cluster>
            {page.contactUs.description ? <p>{page.contactUs.description}</p> : null}
          </Layout>
        </Section>
      ) : null}
    </>
  );
}
