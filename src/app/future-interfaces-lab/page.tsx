import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Button, Cluster, Layout, Prose, Section } from '@/components';
import { getFutureInterfacesLabPage, type FutureInterfacesLabAction } from '@/content';
import { ROUTES } from '@/lib/routes';
import { heroTrail } from '@/lib/trail';
import {
  Accordion,
  BlockCard,
  Breadcrumbs,
  CtaSection,
  PageHero,
  type HeroAction,
} from '@/patterns';

const FUTURE_INTERFACES_LAB_SLUG = ROUTES.futureInterfacesLab.slice(1);

type PageActions = readonly [] | readonly [HeroAction] | readonly [HeroAction, HeroAction];

function firstTwoActions(actions: readonly FutureInterfacesLabAction[]): PageActions {
  const first = actions[0];
  const second = actions[1];
  if (!first) return [];

  const firstAction = { label: first.label, href: first.href };
  return second ? [firstAction, { label: second.label, href: second.href }] : [firstAction];
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getFutureInterfacesLabPage(FUTURE_INTERFACES_LAB_SLUG);

  if (!page) {
    return {
      title: 'Future Interfaces Lab not found | Tcules',
      robots: { index: false, follow: false },
    };
  }

  const title = page.seo?.title || page.hero.heading;
  const description = page.seo?.description || page.hero.body.at(-1) || page.hero.body[0];
  const canonical = page.seo?.canonical;
  const socialImage = page.sections.flatMap((section) =>
    section.cards.flatMap((card) => (card.image ? [card.image] : [])),
  )[0];
  const openGraphImages = socialImage
    ? [
        {
          url: socialImage.src,
          ...(socialImage.width ? { width: socialImage.width } : {}),
          ...(socialImage.height ? { height: socialImage.height } : {}),
          alt: socialImage.alt,
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
      card: socialImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: socialImage ? [socialImage.src] : [],
    },
  };
}

export default async function FutureInterfacesLabPage() {
  const page = await getFutureInterfacesLabPage(FUTURE_INTERFACES_LAB_SLUG);

  if (!page) notFound();

  return (
    <>
      <PageHero
        trail={heroTrail(
          [
            { label: 'Home', href: ROUTES.home },
            /* The CMS heading is this page's NAME (decorated), not a message, so it is the leaf,
               and heroTrail drops it as a repeat of the h1: a lone Home renders no trail. */
            { label: page.hero.heading, href: ROUTES.futureInterfacesLab },
          ],
          page.hero.heading,
          (t) => (
            <Breadcrumbs {...t} />
          ),
        )}
        title={page.hero.heading}
        body={page.hero.body}
        actions={firstTwoActions(page.hero.actions)}
        surface="paper"
      />

      {page.sections.map((section, sectionIndex) => {
        const headingId = `future-interfaces-lab-section-${section.id}`;

        return (
          <Section
            key={section.id}
            surface={sectionIndex % 2 === 0 ? 'tint' : 'paper'}
            aria-labelledby={headingId}
          >
            <Layout rowGap="stack">
              <h2 id={headingId}>{section.heading}</h2>

              {section.cards.length > 0 ? (
                <Layout
                  as="ul"
                  columns={{ base: 1, md: 2, lg: section.cards.length >= 3 ? 3 : 2 }}
                  colGap="gutter"
                  rowGap="column"
                  equalRows
                >
                  {section.cards.map((card) => {
                    const hasVisibleIcon = card.showIcon && card.icon;
                    const hasSupplementalContent =
                      card.tiles.length > 0 ||
                      Boolean(card.pointsHtml) ||
                      card.details.length > 0;
                    const needsCompositeCard =
                      hasSupplementalContent ||
                      Boolean(card.image && hasVisibleIcon) ||
                      Boolean(card.action?.external) ||
                      Boolean(card.action?.icon);

                    if (!needsCompositeCard) {
                      const media = card.image || hasVisibleIcon;

                      return (
                        <BlockCard
                          key={card.id}
                          title={card.title}
                          body={card.body}
                          media={media ? { type: 'image', image: media } : undefined}
                          href={card.action?.href}
                          ctaLabel={card.action?.label}
                        />
                      );
                    }

                    return (
                      <Layout as="li" key={card.id} rowGap="block">
                        {card.image ? (
                          /* eslint-disable-next-line @next/next/no-img-element -- CMS-authored card artwork */
                          <img
                            src={card.image.src}
                            alt={card.image.alt}
                            width={card.image.width}
                            height={card.image.height}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : null}

                        <Layout rowGap="tight">
                          <Cluster colGap="tight" align="center" nowrap>
                            {hasVisibleIcon ? (
                              /* eslint-disable-next-line @next/next/no-img-element -- CMS-authored card mark */
                              <img
                                src={hasVisibleIcon.src}
                                alt={hasVisibleIcon.alt}
                                width={hasVisibleIcon.width}
                                height={hasVisibleIcon.height}
                                loading="lazy"
                                decoding="async"
                              />
                            ) : null}
                            <h3>{card.title}</h3>
                          </Cluster>
                          {card.body ? <p>{card.body}</p> : null}
                        </Layout>

                        {card.pointsHtml ? <Prose html={card.pointsHtml} /> : null}

                        {card.tiles.length > 0 ? (
                          <Layout as="ul" columns="fit" colGap="gutter" rowGap="column">
                            {card.tiles.map((tile) => (
                              <BlockCard
                                key={tile.id}
                                title={tile.title}
                                body={tile.body}
                                titleAs="h4"
                              />
                            ))}
                          </Layout>
                        ) : null}

                        {card.details.length > 0 ? (
                          <Accordion
                            items={card.details.map((detail) => ({
                              question: detail.heading,
                              answerHtml: detail.bodyHtml,
                            }))}
                          />
                        ) : null}

                        {card.action ? (
                          <Cluster>
                            <Button
                              as="a"
                              href={card.action.href}
                              emphasis="link"
                              tone="primary"
                              size="md"
                              extendHitArea
                              icon={
                                card.action.icon ? (
                                  /* eslint-disable-next-line @next/next/no-img-element -- CMS-authored action mark */
                                  <img
                                    src={card.action.icon.src}
                                    alt=""
                                    width={card.action.icon.width}
                                    height={card.action.icon.height}
                                  />
                                ) : undefined
                              }
                            >
                              {card.action.label}
                            </Button>
                          </Cluster>
                        ) : null}
                      </Layout>
                    );
                  })}
                </Layout>
              ) : null}
            </Layout>
          </Section>
        );
      })}

      {page.interfaceLabs && page.interfaceLabs.cards.length > 0 ? (
        <Section as="div" id={page.interfaceLabs.id} surface="tint">
          <Layout as="ul" columns="fit" colGap="gutter" rowGap="column" equalRows>
            {page.interfaceLabs.cards.map((card) => (
              <BlockCard
                key={card.id}
                title={card.title}
                body={card.action?.description || ''}
                media={card.icon ? { type: 'image', image: card.icon } : undefined}
                href={card.action?.href}
                ctaLabel={card.action?.label}
              />
            ))}
          </Layout>
        </Section>
      ) : null}

      {page.misc ? (
        page.misc.action ? (
          <CtaSection
            arrangement="open"
            eyebrow={page.misc.eyebrow || undefined}
            heading={page.misc.heading}
            body={page.misc.body}
            actions={[
              {
                label: page.misc.action.label,
                href: page.misc.action.href,
              },
            ]}
          />
        ) : (
          <Section
            surface="tint"
            aria-labelledby={`future-interfaces-lab-misc-${page.misc.id}`}
          >
            <Layout rowGap="block">
              {page.misc.eyebrow ? <p>{page.misc.eyebrow}</p> : null}
              <h2 id={`future-interfaces-lab-misc-${page.misc.id}`}>{page.misc.heading}</h2>
              <p>{page.misc.body[0]}</p>
            </Layout>
          </Section>
        )
      ) : null}
    </>
  );
}
