import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Button, Cluster, Icon, Layout, Section } from '@/components';
import {
  getFutureInterfacesLabJoinPage,
  type FutureInterfacesLabJoinAction,
  type FutureInterfacesLabJoinCard,
} from '@/content';
import { ROUTES } from '@/lib/routes';
import {
  Accordion,
  BlockCard,
  Breadcrumbs,
  ListCard,
  PageHero,
  type HeroAction,
} from '@/patterns';

const FUTURE_INTERFACES_LAB_JOIN_SLUG = ROUTES.futureInterfacesLabJoin.slice(1);

type PageActions = readonly [] | readonly [HeroAction] | readonly [HeroAction, HeroAction];

function firstTwoActions(actions: readonly FutureInterfacesLabJoinAction[]): PageActions {
  const first = actions[0];
  const second = actions[1];
  if (!first) return [];

  const firstAction = { label: first.label, href: first.href };
  return second ? [firstAction, { label: second.label, href: second.href }] : [firstAction];
}

function cardGrid(cards: readonly FutureInterfacesLabJoinCard[]) {
  if (cards.length === 0) return null;

  return (
    <Layout
      as="ul"
      columns={{ base: 1, md: 2, lg: cards.length >= 3 ? 3 : 2 }}
      colGap="gutter"
      rowGap="gutter"
      equalRows
    >
      {cards.map((card) => {
        const needsCompositeCard =
          Boolean(card.icon) ||
          Boolean(card.action?.external) ||
          Boolean(card.action?.description);

        if (!needsCompositeCard) {
          return (
            <BlockCard
              key={card.id}
              title={card.title}
              body={card.body}
              href={card.action?.href}
              ctaLabel={card.action?.label}
            />
          );
        }

        return (
          <Layout as="li" key={card.id} rowGap="block">
            {card.icon ? (
              /* eslint-disable-next-line @next/next/no-img-element -- CMS-authored section icon */
              <img src={card.icon.src} alt={card.icon.alt} loading="lazy" decoding="async" />
            ) : null}

            <Layout rowGap="tight">
              <h3>{card.title}</h3>
              {card.body ? <p>{card.body}</p> : null}
              {card.action?.description ? <p>{card.action.description}</p> : null}
            </Layout>

            {card.action ? (
              <Cluster>
                <Button
                  as="a"
                  href={card.action.href}
                  emphasis="link"
                  tone="primary"
                  size="md"
                  icon={<Icon name="arrow-right" />}
                  extendHitArea
                >
                  {card.action.label}
                </Button>
              </Cluster>
            ) : null}
          </Layout>
        );
      })}
    </Layout>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getFutureInterfacesLabJoinPage(FUTURE_INTERFACES_LAB_JOIN_SLUG);

  if (!page) {
    return {
      title: 'Future Interfaces Lab join page not found | Tcules',
      robots: { index: false, follow: false },
    };
  }

  const title = page.seo?.title || page.hero.heading;
  const description = page.seo?.description || page.hero.body.join(' ');
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

export default async function FutureInterfacesLabJoinPage() {
  const page = await getFutureInterfacesLabJoinPage(FUTURE_INTERFACES_LAB_JOIN_SLUG);

  if (!page) notFound();

  return (
    <>
      <Breadcrumbs
        surface="paper"
        items={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Future Interfaces Lab', href: ROUTES.futureInterfacesLab },
          { label: page.hero.heading, href: ROUTES.futureInterfacesLabJoin },
        ]}
      />

      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.heading}
        body={page.hero.body}
        actions={firstTwoActions(page.hero.actions)}
        surface="paper"
      />

      {page.secondSection ? (
        <Section surface="tint" aria-labelledby="future-interfaces-lab-join-second-heading">
          <Layout rowGap="stack">
            <Cluster colGap="block" rowGap="block" align="center">
              {page.secondSection.icon ? (
                /* eslint-disable-next-line @next/next/no-img-element -- CMS-authored section icon */
                <img
                  src={page.secondSection.icon.src}
                  alt={page.secondSection.icon.alt}
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
              <h2 id="future-interfaces-lab-join-second-heading">
                {page.secondSection.heading}
              </h2>
            </Cluster>
            {page.secondSection.description ? <p>{page.secondSection.description}</p> : null}
            {cardGrid(page.secondSection.cards)}
          </Layout>
        </Section>
      ) : null}

      {page.thirdSection ? (
        <Section surface="ink" aria-labelledby="future-interfaces-lab-join-third-heading">
          <Layout rowGap="stack">
            <Layout
              columns={{ base: 1, lg: [2, 3] }}
              colGap="column"
              rowGap="block"
              align="start"
            >
              <Cluster colGap="block" rowGap="block" align="center">
                {page.thirdSection.icon ? (
                  /* eslint-disable-next-line @next/next/no-img-element -- CMS-authored section icon */
                  <img
                    src={page.thirdSection.icon.src}
                    alt={page.thirdSection.icon.alt}
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
                <h2 id="future-interfaces-lab-join-third-heading">
                  {page.thirdSection.heading}
                </h2>
              </Cluster>
              {page.thirdSection.description ? <p>{page.thirdSection.description}</p> : null}
            </Layout>
            {cardGrid(page.thirdSection.cards)}
          </Layout>
        </Section>
      ) : null}

      {page.fourthSection ? (
        <Section
          surface="paper"
          aria-labelledby={
            page.fourthSection.content ? 'future-interfaces-lab-join-fourth-heading' : undefined
          }
        >
          <Layout rowGap="stack">
            {page.fourthSection.body.length > 0 ? (
              <Layout rowGap="text">
                {page.fourthSection.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Layout>
            ) : null}

            {page.fourthSection.content ? (
              <Layout rowGap="stack">
                <Cluster colGap="block" rowGap="block" align="center">
                  {page.fourthSection.content.icon ? (
                    /* eslint-disable-next-line @next/next/no-img-element -- CMS-authored section icon */
                    <img
                      src={page.fourthSection.content.icon.src}
                      alt={page.fourthSection.content.icon.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                  <h2 id="future-interfaces-lab-join-fourth-heading">
                    {page.fourthSection.content.heading}
                  </h2>
                </Cluster>
                {page.fourthSection.content.description ? (
                  <p>{page.fourthSection.content.description}</p>
                ) : null}
                {cardGrid(page.fourthSection.content.cards)}
              </Layout>
            ) : null}
          </Layout>
        </Section>
      ) : null}

      {page.fifthSection ? (
        <Section surface="tint" aria-labelledby="future-interfaces-lab-join-fifth-heading">
          <Layout rowGap="stack">
            <Layout
              columns={{ base: 1, lg: [2, 3] }}
              colGap="column"
              rowGap="block"
              align="start"
            >
              <h2 id="future-interfaces-lab-join-fifth-heading">{page.fifthSection.heading}</h2>
              {page.fifthSection.description ? <p>{page.fifthSection.description}</p> : null}
            </Layout>
            {cardGrid(page.fifthSection.cards)}
          </Layout>
        </Section>
      ) : null}

      {page.sixthSection ? (
        <Section surface="blue" aria-labelledby="future-interfaces-lab-join-sixth-heading">
          <Layout rowGap="stack">
            <Layout
              columns={{ base: 1, lg: [2, 3] }}
              colGap="column"
              rowGap="block"
              align="start"
            >
              <h2 id="future-interfaces-lab-join-sixth-heading">{page.sixthSection.heading}</h2>
              {page.sixthSection.description ? <p>{page.sixthSection.description}</p> : null}
            </Layout>

            <Layout
              columns={{ base: 1, lg: [2, 3] }}
              colGap="column"
              rowGap="gutter"
              align="start"
            >
              {page.sixthSection.leftCard ? (
                <Section as="div" surface="paper" density="tight">
                  <Layout rowGap="block">
                    <h3>{page.sixthSection.leftCard.heading}</h3>
                    <p>{page.sixthSection.leftCard.description}</p>
                    {page.sixthSection.leftCard.bottomText ? (
                      <p>{page.sixthSection.leftCard.bottomText}</p>
                    ) : null}
                  </Layout>
                </Section>
              ) : null}

              {page.sixthSection.rightCards.length > 0 ? (
                <Layout as="ol" rowGap="none">
                  {page.sixthSection.rightCards.map((card, index) => (
                    <ListCard
                      key={card.id}
                      title={card.heading}
                      body={card.description}
                      marker={{ kind: 'number', value: index + 1 }}
                      titleAs="h3"
                    />
                  ))}
                </Layout>
              ) : null}
            </Layout>
          </Layout>
        </Section>
      ) : null}

      {page.seventhSection ? (
        <Section surface="paper" aria-labelledby="future-interfaces-lab-join-seventh-heading">
          <Layout rowGap="stack">
            <Layout rowGap="block">
              <h2 id="future-interfaces-lab-join-seventh-heading">
                {page.seventhSection.heading}
              </h2>
              {page.seventhSection.description ? (
                <p>{page.seventhSection.description}</p>
              ) : null}
            </Layout>

            {page.seventhSection.faqs.length > 0 ? (
              <Accordion
                items={page.seventhSection.faqs.map((faq) => ({
                  question: faq.question,
                  answerHtml: faq.answerHtml,
                }))}
              />
            ) : (
              <p>No questions are available yet.</p>
            )}
          </Layout>
        </Section>
      ) : null}

      {page.eighthSection ? (
        <Section surface="ink" aria-labelledby="future-interfaces-lab-join-eighth-heading">
          <Layout
            columns={{ base: 1, lg: [3, 2] }}
            colGap="column"
            rowGap="block"
            align="start"
          >
            <Layout rowGap="block">
              <h2 id="future-interfaces-lab-join-eighth-heading">
                {page.eighthSection.heading}
              </h2>
              {page.eighthSection.description ? <p>{page.eighthSection.description}</p> : null}
            </Layout>
            {page.eighthSection.icon ? (
              /* eslint-disable-next-line @next/next/no-img-element -- CMS-authored closing icon */
              <img
                src={page.eighthSection.icon.src}
                alt={page.eighthSection.icon.alt}
                loading="lazy"
                decoding="async"
              />
            ) : null}
          </Layout>
        </Section>
      ) : null}
    </>
  );
}
