import { Fragment } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Button, Cluster, Layout, Prose, Section } from '@/components';
import { getCaseStudyPage, type CaseStudyBlock, type CaseStudyImage } from '@/content';
import { caseStudyPath, ROUTES } from '@/lib/routes';
import { BlockCard, Breadcrumbs, CtaSection, Figure, PageHero, Proof } from '@/patterns';

function figureImage(image: CaseStudyImage) {
  return {
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
  };
}

function renderCaseStudyBlock(block: CaseStudyBlock) {
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
              caption={block.title || block.description || 'Case-study video'}
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
              width="100%"
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

    case 'code':
      return <Prose html={block.html} />;

    case 'separator':
      return <Prose html={block.html} />;

    case 'quote':
      return <Proof arrangement="compact" quote={block.quote} />;

    case 'link':
      return (
        <Layout rowGap="tight">
          {block.description ? <p>{block.description}</p> : null}
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

export async function generateMetadata({
  params,
}: PageProps<'/case-studies/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyPage(slug);

  if (!caseStudy) {
    return {
      title: 'Case study not found | Tcules',
      robots: { index: false, follow: false },
    };
  }

  const title = caseStudy.seo?.title || caseStudy.title;
  const description = caseStudy.seo?.description || caseStudy.description;
  const canonical = caseStudy.seo?.canonical;
  const image = caseStudy.socialImage;

  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(caseStudy.seo?.robots ? { robots: caseStudy.seo.robots } : {}),
    openGraph: {
      title,
      description,
      type: 'article',
      ...(canonical ? { url: canonical } : {}),
      ...(caseStudy.publishedAt ? { publishedTime: caseStudy.publishedAt } : {}),
      ...(caseStudy.updatedAt ? { modifiedTime: caseStudy.updatedAt } : {}),
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

export default async function CaseStudyPage({ params }: PageProps<'/case-studies/[slug]'>) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyPage(slug);

  if (!caseStudy) notFound();

  const published = dateOnly(caseStudy.publishedAt);
  const updated = dateOnly(caseStudy.updatedAt);
  const heroMedia = caseStudy.heroImage
    ? {
        kind: 'image' as const,
        src: caseStudy.heroImage.src,
        alt: caseStudy.heroImage.alt,
        width: caseStudy.heroImage.width,
        height: caseStudy.heroImage.height,
      }
    : undefined;

  return (
    <>
      {caseStudy.seo?.structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdMarkup(caseStudy.seo.structuredData) }}
        />
      ) : null}

      <Breadcrumbs
        surface="paper"
        items={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Case studies', href: ROUTES.caseStudies },
          { label: caseStudy.title, href: caseStudyPath(caseStudy.slug) },
        ]}
      />

      <PageHero
        title={caseStudy.title}
        eyebrow="Case study"
        body={[caseStudy.description]}
        dates={
          published
            ? { published, ...(updated !== published && updated ? { modified: updated } : {}) }
            : undefined
        }
        media={heroMedia}
        surface="paper"
      >
        {caseStudy.profile.length > 0 ||
        caseStudy.categories.length > 0 ||
        caseStudy.tags.length > 0 ? (
          <Layout rowGap="block">
            {caseStudy.profile.length > 0 ? (
              <Layout as="dl" columns={{ base: 1, md: 3 }} colGap="gutter" rowGap="block">
                {caseStudy.profile.map((item) => (
                  <Layout key={item.id} rowGap="inline">
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </Layout>
                ))}
              </Layout>
            ) : null}
            {caseStudy.categories.length > 0 || caseStudy.tags.length > 0 ? (
              <Cluster as="ul" colGap="text" rowGap="tight">
                {[...caseStudy.categories, ...caseStudy.tags].map((label) => (
                  <li key={label}>{label}</li>
                ))}
              </Cluster>
            ) : null}
          </Layout>
        ) : null}
      </PageHero>

      {caseStudy.statements.length > 0 ? (
        <Section surface="tint" aria-labelledby="case-study-statements-heading">
          <Layout rowGap="stack">
            <h2 id="case-study-statements-heading">Problem and solution</h2>
            <Layout
              as="ul"
              columns={caseStudy.statements.length > 1 ? { base: 1, md: 2 } : { base: 1 }}
              colGap="gutter"
              rowGap="gutter"
              equalRows
            >
              {caseStudy.statements.map((statement) => (
                <BlockCard key={statement.id} title={statement.title} body={statement.body} />
              ))}
            </Layout>
          </Layout>
        </Section>
      ) : null}

      {caseStudy.blocks.length > 0 ? (
        <Section as="div" surface="paper">
          <Layout as="article" rowGap="stack">
            {caseStudy.blocks.map((block) => (
              <Fragment key={block.id}>{renderCaseStudyBlock(block)}</Fragment>
            ))}
          </Layout>
        </Section>
      ) : null}

      {caseStudy.cta ? (
        <CtaSection
          arrangement="open"
          surface="tint"
          heading={caseStudy.cta.heading}
          body={caseStudy.cta.body}
          actions={caseStudy.cta.actions}
        />
      ) : null}
    </>
  );
}
