import { Fragment } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Cluster, Layout, Prose, Section, Tag } from '@/components';
import { getBlogPage, type BlogBlock, type BlogImage } from '@/content';
import { blogPath, ROUTES } from '@/lib/routes';
import {
  BlockCard,
  Breadcrumbs,
  Callout,
  CtaSection,
  Figure,
  PageHero,
  TableOfContents,
  type TocItem,
} from '@/patterns';
import type { BreadcrumbItem } from '@/patterns';

type BlogPageProps = { params: Promise<{ slug: string[] }> };

function requestedSlug(slug: readonly string[]): string {
  return slug
    .map((segment) => segment.trim())
    .filter(Boolean)
    .join('/');
}

function figureImage(image: BlogImage) {
  return {
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
    /* The derived widths and the kind fields travel with the record so Figure's Media can serve
       a srcset and draw the edge by kind; `mime` is the one field left behind. */
    sources: image.sources,
    kind: image.kind,
    panel: image.panel,
    shadow: image.shadow,
  };
}

function renderBlogBlock(block: BlogBlock, blogTitle: string) {
  switch (block.type) {
    case 'prose':
    case 'code':
    case 'separator':
      return <Prose html={block.html} />;

    case 'callout':
      return <Callout html={block.html} />;

    case 'figures':
      return (
        <Layout
          columns={block.figures.length > 1 ? { base: 1, md: 2 } : { base: 1 }}
          colGap={block.figures.length > 1 ? 'gutter' : undefined}
          rowGap="gutter"
        >
          {block.figures.map((figure, index) => (
            <Figure
              key={`${block.id}-${figure.image.src}-${index}`}
              image={figureImage(figure.image)}
              caption={figure.caption}
            />
          ))}
        </Layout>
      );

    case 'video':
      return (
        <Layout rowGap="block">
          {block.title || block.description ? (
            <Layout rowGap="tight">
              {block.title ? <h2>{block.title}</h2> : null}
              {block.description ? <p>{block.description}</p> : null}
            </Layout>
          ) : null}
          {block.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${block.youtubeId}`}
              title={block.title || `${blogTitle} video`}
              width="100%"
              height="698"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
              allowFullScreen
            />
          ) : block.video ? (
            <video
              controls
              autoPlay={block.video.autoplay}
              muted={block.video.autoplay}
              loop={block.video.loop}
              playsInline
              poster={block.video.poster}
              width={block.video.width}
              height={block.video.height}
              preload="metadata"
            >
              <source src={block.video.src} type={block.video.mime} />
            </video>
          ) : block.thumbnail ? (
            <Figure
              image={figureImage(block.thumbnail)}
              caption={block.title || block.description || `${blogTitle} video`}
            />
          ) : null}
        </Layout>
      );

    case 'embed':
      return (
        <Layout rowGap="block">
          <Layout rowGap="tight">
            <h2>{block.title}</h2>
            {block.description ? <p>{block.description}</p> : null}
          </Layout>
          {block.url ? (
            <iframe
              src={block.url}
              title={block.title}
              width={block.width ?? '100%'}
              height={block.height ?? 720}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : block.thumbnail ? (
            <Figure image={figureImage(block.thumbnail)} caption={block.title} />
          ) : null}
        </Layout>
      );
  }
}

function jsonLdMarkup(data: Record<string, unknown> | unknown[]): string {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

function dateOnly(date: string | undefined): string | undefined {
  return date?.slice(0, 10);
}

function displayDate(date: string | undefined): string {
  if (!date) return 'Latest insight';
  const parsed = new Date(date);
  return Number.isNaN(parsed.valueOf())
    ? 'Latest insight'
    : new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(parsed);
}

const ACRONYMS: Record<string, string> = {
  ai: 'AI',
  api: 'API',
  b2b: 'B2B',
  saas: 'SaaS',
  ui: 'UI',
  ux: 'UX',
};

function breadcrumbLabel(segment: string): string {
  return segment
    .split('-')
    .filter(Boolean)
    .map((word, index) => {
      const acronym = ACRONYMS[word.toLowerCase()];
      if (acronym) return acronym;
      return index === 0 ? `${word.charAt(0).toUpperCase()}${word.slice(1)}` : word;
    })
    .join(' ');
}

function blogBreadcrumbs(slug: string, title: string): BreadcrumbItem[] {
  const segments = slug.split('/').filter(Boolean);
  const parents = segments.slice(0, -1).map((segment, index) => ({
    label: breadcrumbLabel(segment),
    href: blogPath(segments.slice(0, index + 1).join('/')),
  }));

  return [
    { label: 'Home', href: ROUTES.home },
    { label: 'Insights', href: ROUTES.insights },
    ...parents,
    { label: title, href: blogPath(slug) },
  ];
}

function uniqueLabels(labels: readonly string[]): string[] {
  return [...new Set(labels.map((label) => label.trim()).filter(Boolean))];
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogPage(requestedSlug(slug));

  if (!blog) {
    return {
      title: 'Insight not found | Tcules',
      robots: { index: false, follow: false },
    };
  }

  const title = blog.seo?.title || blog.title;
  const description = blog.seo?.description || blog.description;
  const canonical = blog.seo?.canonical;
  const image = blog.socialImage;

  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(blog.seo?.robots ? { robots: blog.seo.robots } : {}),
    openGraph: {
      title,
      description,
      type: 'article',
      ...(canonical ? { url: canonical } : {}),
      ...(blog.publishedAt ? { publishedTime: blog.publishedAt } : {}),
      ...(blog.updatedAt ? { modifiedTime: blog.updatedAt } : {}),
      ...(blog.authors.length > 0
        ? { authors: blog.authors.map((author) => author.name) }
        : {}),
      images: image
        ? [
            {
              url: image.src,
              width: image.width,
              height: image.height,
              alt: image.alt,
            },
          ]
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

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogPage(requestedSlug(slug));

  if (!blog) notFound();

  /* The outline the seam derived from this body's level-2 headings, mapped to what the component
     takes. An article is a long-form document, which is what earns it a rail —
     page type decides, not heading count (docs/specs/TableOfContents.md § 1).

     The anchors are opaque and already on the rendered headings; see
     docs/guides/long-form-outline.md. */
  const outline: TocItem[] = blog.outline.map((entry) => ({
    label: entry.label,
    href: `#${entry.anchorId}` as const,
  }));

  /* The component's own floor is two. Below it there is no rail AND no reserved track — a [1, 4]
     grid would otherwise squeeze the document into four-fifths of the content column for nothing. */
  const hasOutline = outline.length >= 2;

  const published = blog.publishedContent || dateOnly(blog.publishedAt);
  const updated = dateOnly(blog.updatedAt);
  const authorNames = blog.authors.map((author) => author.name);
  const credits = authorNames[0]
    ? [
        {
          role: 'author' as const,
          people: authorNames as [string, ...string[]],
        },
      ]
    : undefined;
  const heroMedia = blog.heroVideo
    ? {
        kind: 'youtube' as const,
        id: blog.heroVideo.id,
        title: blog.heroVideo.title,
      }
    : blog.featureImage
      ? {
          kind: 'image' as const,
          src: blog.featureImage.src,
          alt: blog.featureImage.alt,
          width: blog.featureImage.width,
          height: blog.featureImage.height,
        }
      : undefined;
  const labels = uniqueLabels([...blog.categories, ...blog.tags]);

  return (
    <>
      {blog.seo?.structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdMarkup(blog.seo.structuredData) }}
        />
      ) : null}

      <Breadcrumbs surface="paper" items={blogBreadcrumbs(blog.slug, blog.title)} />

      <PageHero
        title={blog.title}
        eyebrow="Insight"
        body={[blog.description || `Read ${blog.title}.`]}
        credits={credits}
        dates={
          published
            ? { published, ...(updated !== published && updated ? { modified: updated } : {}) }
            : undefined
        }
        media={heroMedia}
        surface="paper"
      >
        {labels.length > 0 ? (
          <Cluster as="ul" colGap="text" rowGap="tight">
            {labels.map((label) => (
              <li key={label}>
                <Tag>{label}</Tag>
              </li>
            ))}
          </Cluster>
        ) : null}
      </PageHero>

      {blog.blocks.length > 0 ? (
        <Section as="div" surface="paper">
          {/* The shell from docs/specs/TableOfContents.md § 10. The rail is a TRACK, not a band, so it
              sits inside this Section — which is what makes the two arrangements one piece of markup:
              below 1024 the columns collapse and the first track becomes the first block of the
              Section, nothing moved in the DOM. `align="start"` is required, not stylistic: a
              stretched grid item fills the row and has nowhere to stick. The <article> stays around
              the document — the outline is about the article, not part of it. */}
          <Layout
            columns={hasOutline ? { base: 1, lg: [1, 4] } : { base: 1 }}
            colGap="column"
            rowGap="stack"
            align="start"
          >
            {hasOutline ? <TableOfContents items={outline} /> : null}
            <Layout as="article" rowGap="stack">
              {blog.blocks.map((block) => (
                <Fragment key={block.id}>{renderBlogBlock(block, blog.title)}</Fragment>
              ))}
            </Layout>
          </Layout>
        </Section>
      ) : null}

      {blog.resources.length > 0 ? (
        <Section surface="tint" aria-labelledby="blog-resources-heading">
          <Layout rowGap="stack">
            <h2 id="blog-resources-heading">Explore other resources</h2>
            <Layout
              as="ul"
              columns={{ base: 1, md: 2, lg: 3 }}
              colGap="gutter"
              rowGap="gutter"
              equalRows
            >
              {blog.resources.map((resource) => (
                <BlockCard
                  key={resource.documentId}
                  title={resource.title}
                  body={[displayDate(resource.publishedAt), resource.tags.join(' · ')]
                    .filter(Boolean)
                    .join(' — ')}
                  eyebrow={resource.categories.join(' · ') || 'Insight'}
                  media={
                    resource.image
                      ? { kind: 'image', src: resource.image.src, alt: resource.image.alt }
                      : undefined
                  }
                  href={blogPath(resource.slug)}
                  ctaLabel="Read insight"
                />
              ))}
            </Layout>
          </Layout>
        </Section>
      ) : null}

      {blog.cta ? (
        <CtaSection
          arrangement="open"
          surface="tint"
          heading={blog.cta.heading}
          body={blog.cta.body}
          actions={blog.cta.actions}
        />
      ) : null}
    </>
  );
}
