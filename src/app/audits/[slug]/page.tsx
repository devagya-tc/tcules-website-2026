import { Fragment, type ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Button, Cluster, Layout, Prose, Section, type LayoutProps } from '@/components';
import {
  getAuditPage,
  type AuditAction,
  type AuditBlock,
  type AuditContentColumn,
} from '@/content';
import { auditPath, ROUTES } from '@/lib/routes';
import {
  Accordion,
  BlockCard,
  Breadcrumbs,
  Callout,
  CtaSection,
  Figure,
  ListCard,
  PageHero,
  Proof,
  TableOfContents,
  type HeroAction,
  type TocItem,
} from '@/patterns';

type HeroActions = readonly [] | readonly [HeroAction] | readonly [HeroAction, HeroAction];

function firstTwoHeroActions(actions: readonly AuditAction[]): HeroActions {
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

/**
 * The two-column shell from docs/specs/TableOfContents.md § 10. The rail is a TRACK, not a band, so
 * it sits INSIDE the body Section rather than above it — which is also what makes the two
 * arrangements one piece of markup: below 1024 the columns collapse and the shell's first track
 * simply becomes the first block of the Section, with nothing moved in the DOM.
 *
 * `align="start"` is required rather than stylistic: a stretched grid item fills the row and has
 * nowhere to stick.
 *
 * Fewer than two labelled sections renders no rail AND no reserved track. The component's own floor
 * is two, so a `[1, 4]` grid would otherwise squeeze the body into four-fifths of the content column
 * to leave room for nothing.
 */
function Shell({ outline, children }: { outline: readonly TocItem[]; children: ReactNode }) {
  /* The body track keeps this page's own rhythm: `section` (96) is the beat between an audit's
     top-level sections and swapping it for the spec sketch's `stack` would retune the page under
     cover of a component swap. */
  const body = <Layout rowGap="section">{children}</Layout>;

  if (outline.length < 2) return body;

  return (
    <Layout columns={{ base: 1, lg: [1, 4] }} colGap="column" rowGap="stack" align="start">
      <TableOfContents items={outline} />
      {body}
    </Layout>
  );
}

function renderColumn(column: AuditContentColumn) {
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

function renderAuditBlock(block: AuditBlock) {
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
      return <Prose html={block.html} />;

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
        (column): column is AuditContentColumn => column !== undefined,
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

export async function generateMetadata({
  params,
}: PageProps<'/audits/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const audit = await getAuditPage(slug);

  if (!audit) {
    return {
      title: 'Audit not found | Tcules',
      robots: { index: false, follow: false },
    };
  }

  const title = audit.seo?.title || audit.title;
  const description = audit.seo?.description || audit.hero.description;
  const canonical = audit.seo?.canonical;

  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(audit.seo?.robots ? { robots: audit.seo.robots } : {}),
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

export default async function AuditPage({ params }: PageProps<'/audits/[slug]'>) {
  const { slug } = await params;
  const audit = await getAuditPage(slug);

  if (!audit) notFound();

  const heroActions = firstTwoHeroActions(audit.hero.actions);

  /* The outline. An audit is a long-form document, which is what earns it a rail — the page type
     decides, not the heading count (docs/specs/TableOfContents.md § 1). Sections without a
     navigationLabel are absent from it on purpose: the seam curates membership, and heading text
     runs to a median of 35 characters, which is a sentence rather than a label.

     Typed rather than inferred, because `href` is `#${string}` and a bare template expression in a
     standalone const widens to `string`. */
  const outline: TocItem[] = audit.sections.flatMap((section) =>
    section.heading?.navigationLabel
      ? [
          {
            label: section.heading.navigationLabel,
            href: `#${section.heading.anchorId}` as const,
          },
        ]
      : [],
  );

  return (
    <>
      {audit.seo?.structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdMarkup(audit.seo.structuredData) }}
        />
      ) : null}

      <Breadcrumbs
        surface="paper"
        items={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Audits', href: ROUTES.audits },
          { label: audit.title, href: auditPath(audit.slug) },
        ]}
      />

      <PageHero
        title={audit.title}
        eyebrow={audit.hero.eyebrow}
        body={[audit.hero.description]}
        actions={heroActions}
        surface="paper"
      >
        {audit.hero.tags.length > 0 ? (
          <Cluster as="ul" colGap="text" rowGap="tight">
            {audit.hero.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </Cluster>
        ) : null}
      </PageHero>

      {audit.sections.length > 0 ? (
        <Section as="div" surface="paper">
          <Shell outline={outline}>
            {audit.sections.map((section) => {
              const content = (
                <Layout rowGap="stack">
                  {section.heading ? (
                    <h2 id={section.heading.anchorId}>{section.heading.text}</h2>
                  ) : null}
                  {section.blocks.map((block) => (
                    <Fragment key={block.id}>{renderAuditBlock(block)}</Fragment>
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
          </Shell>
        </Section>
      ) : null}

      {audit.faq ? (
        <Section surface="tint" aria-labelledby="audit-faq-heading">
          <Layout rowGap="stack">
            <Layout rowGap="block">
              {audit.faq.eyebrow ? <p>{audit.faq.eyebrow}</p> : null}
              <h2 id="audit-faq-heading">{audit.faq.heading}</h2>
              {audit.faq.description ? <p>{audit.faq.description}</p> : null}
            </Layout>
            <Accordion items={audit.faq.items} />
          </Layout>
        </Section>
      ) : null}

      {audit.cta ? (
        <CtaSection
          arrangement="open"
          surface="ink"
          heading={audit.cta.heading}
          body={audit.cta.body}
          eyebrow={audit.cta.eyebrow}
          points={audit.cta.points}
          actions={audit.cta.actions}
        />
      ) : null}
    </>
  );
}
