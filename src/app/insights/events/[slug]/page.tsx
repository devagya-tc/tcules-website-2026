import { Fragment } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Button, Cluster, Layout, Prose, Section, Tag } from '@/components';
import { getEventPage, type EventBlock, type EventImage } from '@/content';
import { articlePath, eventPath, ROUTES } from '@/lib/routes';
import { BlockCard, Breadcrumbs, Callout, Figure, PageHero } from '@/patterns';

type EventPageProps = { params: Promise<{ slug: string }> };

function figureImage(image: EventImage) {
  return {
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
  };
}

function renderEventBlock(block: EventBlock, eventTitle: string) {
  switch (block.type) {
    case 'prose':
      return <Prose html={block.html} />;

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
          {block.video ? (
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
              caption={block.title || block.description || `${eventTitle} video`}
            />
          ) : null}
        </Layout>
      );

    case 'shadow-card':
      return (
        <Layout rowGap="block">
          {block.heading ? <h2>{block.heading}</h2> : null}
          {block.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${block.youtubeId}`}
              title={`${eventTitle} video`}
              width="100%"
              height="698"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
              allowFullScreen
            />
          ) : block.mediaUrl ? (
            <Cluster>
              <Button
                as="a"
                href={block.mediaUrl}
                emphasis="link"
                tone="neutral"
                size="md"
                extendHitArea
              >
                View event media
              </Button>
            </Cluster>
          ) : null}
          {block.descriptionHtml ? (
            block.emphasized ? (
              <Callout html={block.descriptionHtml} />
            ) : (
              <Prose html={block.descriptionHtml} />
            )
          ) : null}
          {block.action ? (
            <Cluster>
              <Button
                as="a"
                href={block.action.href}
                emphasis="link"
                tone="neutral"
                size="md"
                extendHitArea
              >
                {block.action.label}
              </Button>
            </Cluster>
          ) : null}
        </Layout>
      );

    case 'callout':
      return <Callout html={block.html} />;

    case 'separator':
      return <Prose html={block.html} />;
  }
}

function jsonLdMarkup(data: Record<string, unknown> | unknown[]): string {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

function dateOnly(date: string | undefined): string | undefined {
  return date?.slice(0, 10);
}

function displayDate(date: string | undefined): string {
  if (!date) return 'Latest article';
  const parsed = new Date(date);
  return Number.isNaN(parsed.valueOf())
    ? 'Latest article'
    : new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(parsed);
}

function uniqueLabels(labels: readonly string[]): string[] {
  return [...new Set(labels.map((label) => label.trim()).filter(Boolean))];
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventPage(slug);

  if (!event) {
    return {
      title: 'Event not found | Tcules',
      robots: { index: false, follow: false },
    };
  }

  const title = event.seo?.title || event.title;
  const description = event.seo?.description || event.description;
  const canonical = event.seo?.canonical;
  const image = event.socialImage;

  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(event.seo?.robots ? { robots: event.seo.robots } : {}),
    openGraph: {
      title,
      description,
      type: 'article',
      ...(canonical ? { url: canonical } : {}),
      ...(event.publishedAt ? { publishedTime: event.publishedAt } : {}),
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

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventPage(slug);

  if (!event) notFound();

  const published = dateOnly(event.publishedAt);
  const labels = uniqueLabels([...event.categories, ...event.tags]);
  const hasHeroDetails = event.details.length > 0 || labels.length > 0;
  const heroMedia = event.featureImage
    ? {
        kind: 'image' as const,
        src: event.featureImage.src,
        alt: event.featureImage.alt,
        width: event.featureImage.width,
        height: event.featureImage.height,
      }
    : undefined;

  return (
    <>
      {event.seo?.structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdMarkup(event.seo.structuredData) }}
        />
      ) : null}

      <Breadcrumbs
        surface="paper"
        items={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Insights', href: ROUTES.insights },
          { label: 'Events', href: ROUTES.events },
          { label: event.title, href: eventPath(event.slug) },
        ]}
      />

      <PageHero
        title={event.title}
        eyebrow="Event"
        body={[event.description || `Explore ${event.title}.`]}
        dates={published ? { published } : undefined}
        media={heroMedia}
        surface="paper"
      >
        {hasHeroDetails ? (
          <Layout rowGap="stack">
            {event.details.length > 0 ? (
              <Layout rowGap="block">
                <h3>Event details</h3>
                <Layout
                  as="dl"
                  columns={event.details.length > 1 ? { base: 1, md: 2 } : { base: 1 }}
                  colGap="gutter"
                  rowGap="block"
                >
                  {event.details.map((detail) => (
                    <Layout as="div" key={detail.id} rowGap="tight">
                      {detail.location ? (
                        <Fragment>
                          <dt>Where</dt>
                          <dd>{detail.location}</dd>
                        </Fragment>
                      ) : null}
                      {detail.date ? (
                        <Fragment>
                          <dt>When</dt>
                          <dd>{detail.date}</dd>
                        </Fragment>
                      ) : null}
                    </Layout>
                  ))}
                </Layout>
              </Layout>
            ) : null}

            {labels.length > 0 ? (
              <Cluster as="ul" colGap="text" rowGap="tight">
                {labels.map((label) => (
                  <li key={label}>
                    <Tag>{label}</Tag>
                  </li>
                ))}
              </Cluster>
            ) : null}
          </Layout>
        ) : null}
      </PageHero>

      {event.blocks.length > 0 ? (
        <Section as="div" surface="paper">
          <Layout as="article" rowGap="stack">
            {event.blocks.map((block) => (
              <Fragment key={block.id}>{renderEventBlock(block, event.title)}</Fragment>
            ))}
          </Layout>
        </Section>
      ) : null}

      {event.resources.length > 0 ? (
        <Section surface="tint" aria-labelledby="event-resources-heading">
          <Layout rowGap="stack">
            <h2 id="event-resources-heading">Explore other resources</h2>
            <Layout
              as="ul"
              columns={{ base: 1, md: 2, lg: 3 }}
              colGap="gutter"
              rowGap="gutter"
              equalRows
            >
              {event.resources.map((resource) => (
                <BlockCard
                  key={resource.documentId}
                  title={resource.title}
                  body={displayDate(resource.publishedAt)}
                  eyebrow="Article"
                  media={
                    resource.image
                      ? { kind: 'image', src: resource.image.src, alt: resource.image.alt }
                      : undefined
                  }
                  href={articlePath(resource.slug)}
                  ctaLabel="Read article"
                />
              ))}
            </Layout>
          </Layout>
        </Section>
      ) : null}
    </>
  );
}
