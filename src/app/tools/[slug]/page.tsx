import { Fragment } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Button, Cluster, Layout, Prose, Section, type LayoutProps } from '@/components';
import { getToolPage, type ToolBlock, type ToolContentColumn } from '@/content';
import { ROUTES, toolPath } from '@/lib/routes';
import { BlockCard, Breadcrumbs, Callout, Figure, ListCard, PageHero, Proof } from '@/patterns';

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

function renderColumn(column: ToolContentColumn) {
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
            />
          ))}
        </Layout>
      ) : null}
    </Layout>
  );
}

function renderToolBlock(block: ToolBlock) {
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
              eyebrow={card.eyebrow}
            />
          ))}
        </Layout>
      );

    case 'comparison-cards':
      return (
        <Layout as="ul" columns="fit" minTrack="sm" colGap="gutter" rowGap="gutter" equalRows>
          {block.cards.map((card) => (
            <BlockCard
              key={`${block.id}-${card.title}`}
              title={card.title}
              body={card.body}
              eyebrow={card.eyebrow}
            />
          ))}
        </Layout>
      );

    case 'table':
      return <Prose html={block.html} />;

    case 'quote':
      return <Proof arrangement="compact" quote={block.quote} />;

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
            />
          ))}
        </Layout>
      );
    }

    case 'two-column': {
      const columns = [block.left, block.right].filter(
        (column): column is ToolContentColumn => column !== undefined,
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
                external={link.external}
              />
            ))}
          </Layout>
        </Layout>
      );

    case 'media':
      return (
        <Layout rowGap="block">
          <Figure image={block.image} caption={block.caption} />
          {block.download ? (
            <Cluster>
              <Button
                as="a"
                href={block.download.href}
                emphasis="link"
                tone="neutral"
                size="md"
                extendHitArea
              >
                {block.download.label}
              </Button>
            </Cluster>
          ) : null}
        </Layout>
      );
  }
}

function jsonLdMarkup(data: Record<string, unknown> | unknown[]): string {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

export async function generateMetadata({
  params,
}: PageProps<'/tools/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolPage(slug);

  if (!tool) {
    return {
      title: 'Tool not found | Tcules',
      robots: { index: false, follow: false },
    };
  }

  const title = tool.seo?.title || tool.title;
  const description = tool.seo?.description || tool.hero.description;
  const canonical = tool.seo?.canonical;

  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(tool.seo?.robots ? { robots: tool.seo.robots } : {}),
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

export default async function ToolPage({ params }: PageProps<'/tools/[slug]'>) {
  const { slug } = await params;
  const tool = await getToolPage(slug);

  if (!tool) notFound();

  const title = tool.title || tool.hero.highlightedText || '';
  const navigation = tool.sections.flatMap((section) =>
    section.heading?.navigationLabel
      ? [
          {
            label: section.heading.navigationLabel,
            href: `#${section.heading.anchorId}`,
          },
        ]
      : [],
  );

  return (
    <>
      {tool.seo?.structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdMarkup(tool.seo.structuredData) }}
        />
      ) : null}

      <Breadcrumbs
        surface="paper"
        items={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Tools', href: ROUTES.tools },
          { label: title, href: toolPath(tool.slug) },
        ]}
      />

      <PageHero
        title={title}
        eyebrow={tool.hero.eyebrow}
        body={[tool.hero.description]}
        dates={tool.publishedAt ? { published: tool.publishedAt } : undefined}
        surface="paper"
      />

      {navigation.length > 0 ? (
        <Section as="div" density="tight" surface="tint">
          <Layout rowGap="block">
            <h2>On this page</h2>
            <nav aria-label="On this page">
              <Cluster as="ul" colGap="text" rowGap="tight">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Button
                      as="a"
                      href={item.href}
                      emphasis="link"
                      tone="neutral"
                      size="md"
                      extendHitArea
                    >
                      {item.label}
                    </Button>
                  </li>
                ))}
              </Cluster>
            </nav>
          </Layout>
        </Section>
      ) : null}

      {tool.sections.length > 0 ? (
        <Section as="div" surface="paper">
          <Layout rowGap="section">
            {tool.sections.map((section) => {
              const content = (
                <Layout rowGap="stack">
                  {section.heading ? (
                    <h2 id={section.heading.anchorId}>{section.heading.text}</h2>
                  ) : null}
                  {section.blocks.map((block) => (
                    <Fragment key={block.id}>{renderToolBlock(block)}</Fragment>
                  ))}
                </Layout>
              );

              return section.heading ? (
                <section key={section.id} aria-labelledby={section.heading.anchorId}>
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
