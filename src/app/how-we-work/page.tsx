import { Fragment } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Button, Cluster, Layout, Prose, Section, Tag, type LayoutProps } from '@/components';
import {
  getHowWeWorkPage,
  type HowWeWorkAction,
  type HowWeWorkBlock,
  type HowWeWorkContentColumn,
} from '@/content';
import { ROUTES } from '@/lib/routes';
import {
  Accordion,
  BlockCard,
  Breadcrumbs,
  Callout,
  ContentSection,
  CtaSection,
  DataTable,
  Figure,
  ListCard,
  PageHero,
  Proof,
  type HeroAction,
} from '@/patterns';

const HOW_WE_WORK_SLUG = ROUTES.howWeWork.slice(1);

type HeroActions = readonly [] | readonly [HeroAction] | readonly [HeroAction, HeroAction];

function firstTwoHeroActions(actions: readonly HowWeWorkAction[]): HeroActions {
  const first = actions[0];
  const second = actions[1];
  if (!first) return [];
  return second ? [first, second] : [first];
}

function cardColumns(count: 1 | 2 | 3 | 4): LayoutProps['columns'] {
  switch (count) {
    case 1:
      return { base: 1 };
    case 3:
      return { base: 1, md: 2, lg: 3 };
    case 4:
      return { base: 1, md: 2, lg: 4 };
    default:
      return { base: 1, md: 2 };
  }
}

function renderColumn(column: HowWeWorkContentColumn) {
  return (
    <Layout key={column.id} rowGap="block">
      <Layout rowGap="tight">
        {column.eyebrow ? <p>{column.eyebrow}</p> : null}
        <h3>{column.heading}</h3>
        {column.bodyHtml ? <Prose html={column.bodyHtml} /> : null}
      </Layout>

      {column.items.length > 0 ? (
        <Layout as="ul" rowGap="none">
          {column.items.map((item) => (
            <ListCard
              key={`${column.id}-${item.title}`}
              title={item.title}
              body={item.body}
              titleAs="h4"
              arrangement="stacked"
              href={item.href}
            />
          ))}
        </Layout>
      ) : null}

      {column.links.length > 0 ? (
        <Cluster colGap="tight" rowGap="tight">
          {column.links.map((link) => (
            <Button
              key={`${column.id}-${link.href}-${link.label}`}
              as="a"
              href={link.href}
              emphasis="link"
              tone="neutral"
              size="md"
              extendHitArea
            >
              {link.label}
            </Button>
          ))}
        </Cluster>
      ) : null}
    </Layout>
  );
}

function renderHowWeWorkBlock(block: HowWeWorkBlock) {
  switch (block.type) {
    case 'rich-text':
      return <Prose html={block.html} />;

    case 'card-grid':
      return (
        <Layout
          as="ul"
          columns={cardColumns(block.columns)}
          colGap="gutter"
          rowGap="gutter"
          equalRows
        >
          {block.cards.map((card) => (
            <BlockCard
              key={`${block.id}-${card.title}`}
              title={card.title}
              body={card.body}
              href={card.href}
            />
          ))}
        </Layout>
      );

    case 'comparison-cards':
      return (
        <Layout as="ul" columns="fit" minTrack="sm" colGap="gutter" rowGap="gutter" equalRows>
          {block.cards.map((card) => (
            <BlockCard key={`${block.id}-${card.title}`} title={card.title} body={card.body} />
          ))}
        </Layout>
      );

    case 'table':
      return <DataTable {...block.table} />;

    case 'quote':
      return (
        <Layout rowGap="block">
          <Proof arrangement="compact" quote={block.quote} />
          {block.source ? (
            <Cluster>
              <Button
                as="a"
                href={block.source.href}
                emphasis="link"
                tone="neutral"
                size="md"
                extendHitArea
              >
                {block.source.label}
              </Button>
            </Cluster>
          ) : null}
        </Layout>
      );

    case 'callout':
      return <Callout html={block.html} />;

    case 'labelled-list': {
      const numbered = block.displayStyle === 'numbered';
      return (
        <Layout as={numbered ? 'ol' : 'ul'} rowGap="none">
          {block.items.map((item, index) => (
            <ListCard
              key={`${block.id}-${item.title}`}
              title={item.title}
              body={item.body}
              marker={numbered ? { kind: 'number', value: index + 1 } : undefined}
              titleAs="h3"
              href={item.href}
            />
          ))}
        </Layout>
      );
    }

    case 'two-column': {
      const columns = [block.left, block.right].filter(
        (column): column is HowWeWorkContentColumn => column !== undefined,
      );
      return (
        <Layout
          columns={columns.length > 1 ? { base: 1, lg: 2 } : { base: 1 }}
          colGap={columns.length > 1 ? 'column' : undefined}
          rowGap="stack"
          align="start"
        >
          {columns.map(renderColumn)}
        </Layout>
      );
    }

    case 'link-group':
      return (
        <Layout rowGap="block">
          <Layout rowGap="tight">
            <h3>{block.heading}</h3>
            {block.description ? <p>{block.description}</p> : null}
          </Layout>
          <Layout as="ul" rowGap="none">
            {block.links.map((link) => (
              <ListCard
                key={`${block.id}-${link.href}-${link.title}`}
                title={link.title}
                body={link.body}
                titleAs="h4"
                href={link.href}
              />
            ))}
          </Layout>
        </Layout>
      );

    case 'media':
      return <Figure image={block.image} caption={block.caption} note={block.note} />;
  }
}

function jsonLdMarkup(data: Record<string, unknown> | unknown[]): string {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHowWeWorkPage(HOW_WE_WORK_SLUG);

  if (!page) {
    return {
      title: 'How We Work not found | Tcules',
      robots: { index: false, follow: false },
    };
  }

  const title = page.seo?.title || page.title;
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

export default async function HowWeWorkPage() {
  const page = await getHowWeWorkPage(HOW_WE_WORK_SLUG);

  if (!page) notFound();

  const heroActions = firstTwoHeroActions(page.hero.actions);

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
          { label: page.hero.eyebrow || page.title, href: ROUTES.howWeWork },
        ]}
      />

      <PageHero
        title={page.title}
        eyebrow={page.hero.eyebrow}
        body={[page.hero.description]}
        actions={heroActions}
        surface="paper"
      >
        {page.hero.tags.length > 0 ? (
          <Cluster as="ul" colGap="text" rowGap="tight">
            {page.hero.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </Cluster>
        ) : null}
      </PageHero>

      {/* ONE BAND PER SECTION. Every band is paper: tint marks a section that matters and the
          page's asks, and nothing here has a field that could say which section that is — so the
          ground is left alone rather than alternated. See the services route for the one place
          that reads an accent out of block shape.

          ContentSection's `lead` is not passed because this page type has no source for one.
          `liftLead` recovers a lead from an italic opening paragraph, and that convention was
          measured across this corpus and found only on product-design; wiring it here would be
          dead code. When the CMS grows a real field, it arrives as one prop. */}
      {page.sections.map((section) => (
        <ContentSection
          key={section.id}
          heading={section.heading?.text}
          headingId={section.heading?.anchorId}
        >
          {section.blocks.map((block) => (
            <Fragment key={block.id}>{renderHowWeWorkBlock(block)}</Fragment>
          ))}
        </ContentSection>
      ))}

      {page.faq ? (
        <Section surface="tint" aria-labelledby="how-we-work-faq-heading">
          <Layout rowGap="stack">
            <Layout rowGap="block">
              {page.faq.eyebrow ? <p>{page.faq.eyebrow}</p> : null}
              <h2 id="how-we-work-faq-heading">{page.faq.heading}</h2>
              {page.faq.description ? <p>{page.faq.description}</p> : null}
            </Layout>
            <Accordion items={page.faq.items} />
          </Layout>
        </Section>
      ) : null}

      {page.cta ? (
        <CtaSection
          arrangement="open"
          surface="tint"
          heading={page.cta.heading}
          body={page.cta.body}
          eyebrow={page.cta.eyebrow}
          points={page.cta.points}
          actions={page.cta.actions}
        />
      ) : null}
    </>
  );
}
