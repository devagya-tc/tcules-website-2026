import type {
  CaseStudyAction,
  CaseStudyBlock,
  CaseStudyContentSource,
  CaseStudyImage,
  CaseStudyPage,
  ContentSeo,
} from '../../types';
import { CASE_STUDY_BY_SLUG_QUERY } from './case-study-query';
import type {
  StrapiCaseStudy,
  StrapiCaseStudyBlock,
  StrapiCaseStudyFile,
  StrapiCaseStudyResponse,
  StrapiCaseStudySeo,
} from './case-study-types';
import { markdownToHtml } from './markdown';
import { escapeHtml, richTextToHtml, richTextToPlainText, safeContentHref } from './rich-text';

const DEFAULT_STRAPI_GRAPHQL_URL = 'https://tcules-server-production.up.railway.app/graphql';
const CASE_STUDY_REVALIDATE_SECONDS = 300;

function value(value: string | null | undefined): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getStrapiGraphqlUrl(): string {
  return value(process.env.STRAPI_GRAPHQL_URL) || DEFAULT_STRAPI_GRAPHQL_URL;
}

function absoluteUrl(url: string | null | undefined, baseUrl: string): string | undefined {
  const candidate = value(url);
  if (!candidate) return undefined;

  try {
    const resolved = new URL(candidate, baseUrl);
    return resolved.protocol === 'https:' || resolved.protocol === 'http:'
      ? resolved.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

function mapImage(
  file: StrapiCaseStudyFile | null | undefined,
  title: string,
  context: string,
  graphqlUrl: string,
): CaseStudyImage | undefined {
  if (!file || !value(file.mime).startsWith('image/')) return undefined;

  const src = absoluteUrl(file.url, graphqlUrl);
  const width = typeof file.width === 'number' && file.width > 0 ? file.width : undefined;
  const height = typeof file.height === 'number' && file.height > 0 ? file.height : undefined;
  if (!src || !width || !height) return undefined;

  return {
    src,
    alt: value(file.alternativeText) || `${title} — ${context}`,
    width,
    height,
    mime: value(file.mime),
  };
}

function mapAction(
  link:
    | {
        name?: string | null;
        href?: string | null;
        isExternal?: boolean | null;
      }
    | null
    | undefined,
): CaseStudyAction | undefined {
  const label = value(link?.name);
  const href = safeContentHref(link?.href);
  if (!label || !href) return undefined;

  return {
    label,
    href,
    external:
      link?.isExternal === true || href.startsWith('http://') || href.startsWith('https://'),
  };
}

function contentHtml(content: unknown, context: string): string {
  return typeof content === 'string'
    ? markdownToHtml(content, context)
    : richTextToHtml(content, context);
}

function blockId(block: StrapiCaseStudyBlock, index: number): string {
  return `${value(block.__typename) || 'case-study-block'}-${value(block.id) || index}`;
}

function embedUrl(block: StrapiCaseStudyBlock): string | undefined {
  const direct = safeContentHref(block.url);
  if (direct?.startsWith('http://') || direct?.startsWith('https://')) return direct;

  const match = value(block.embedCode).match(/\bsrc\s*=\s*["']([^"']+)["']/iu);
  const embedded = safeContentHref(match?.[1]);
  return embedded?.startsWith('http://') || embedded?.startsWith('https://')
    ? embedded
    : undefined;
}

function mapBlock(
  block: StrapiCaseStudyBlock,
  index: number,
  title: string,
  graphqlUrl: string,
): CaseStudyBlock | undefined {
  const id = blockId(block, index);

  switch (block.__typename) {
    case 'ComponentBlogAndCasestudiesBlogOrCasestudyText': {
      const html = markdownToHtml(block.blogContent, `${id} content`);
      return html ? { id, type: 'prose', html } : undefined;
    }

    case 'ComponentBlogAndCasestudiesSectionImage': {
      const figures = (block.imageSection ?? []).flatMap((file, imageIndex) => {
        const imageNumber =
          (block.imageSection?.length ?? 0) > 1
            ? `${index + 1}.${imageIndex + 1}`
            : `${index + 1}`;
        const image = mapImage(file, title, `project image ${imageNumber}`, graphqlUrl);
        if (!image) return [];
        return [
          {
            image,
            caption: value(file.alternativeText) || `${title} — project image ${imageNumber}`,
          },
        ];
      });
      return figures.length ? { id, type: 'figures', figures } : undefined;
    }

    case 'ComponentBlogAndCasestudiesVideo': {
      const src = absoluteUrl(block.videoFile?.url, graphqlUrl);
      const mime = value(block.videoFile?.mime);
      const thumbnail = mapImage(block.thumbnail, title, 'video thumbnail', graphqlUrl);
      const width =
        typeof block.videoFile?.width === 'number' && block.videoFile.width > 0
          ? block.videoFile.width
          : undefined;
      const height =
        typeof block.videoFile?.height === 'number' && block.videoFile.height > 0
          ? block.videoFile.height
          : undefined;
      const video =
        src && mime.startsWith('video/')
          ? {
              src,
              mime,
              ...(thumbnail ? { poster: thumbnail.src } : {}),
              ...(width ? { width } : {}),
              ...(height ? { height } : {}),
              autoplay: block.autoplay === true,
              loop: block.loop === true,
            }
          : undefined;
      const blockTitle = value(block.title);
      const description = value(block.videoDescription);
      return video || thumbnail || blockTitle || description
        ? {
            id,
            type: 'video',
            ...(blockTitle ? { title: blockTitle } : {}),
            ...(description ? { description } : {}),
            ...(video ? { video } : {}),
            ...(thumbnail ? { thumbnail } : {}),
          }
        : undefined;
    }

    case 'ComponentBlogAndCasestudiesIframe': {
      const blockTitle = value(block.title) || 'Embedded case-study content';
      const description = value(block.iframeDescription);
      const url = embedUrl(block);
      const width =
        typeof block.width === 'number' && block.width > 0 ? block.width : undefined;
      const height =
        typeof block.height === 'number' && block.height > 0 ? block.height : undefined;
      const thumbnail = mapImage(block.thumbnail, title, 'embed thumbnail', graphqlUrl);
      return url || thumbnail
        ? {
            id,
            type: 'embed',
            title: blockTitle,
            ...(description ? { description } : {}),
            ...(url ? { url } : {}),
            ...(width ? { width } : {}),
            ...(height ? { height } : {}),
            ...(thumbnail ? { thumbnail } : {}),
          }
        : undefined;
    }

    case 'ComponentBlogAndCasestudiesCodeSection': {
      const code = value(block.codeSnippet);
      return code
        ? { id, type: 'code', html: `<pre><code>${escapeHtml(code)}</code></pre>` }
        : undefined;
    }

    case 'ComponentBlogAndCasestudiesSepration': {
      const label = value(block.title);
      return {
        id,
        type: 'separator',
        html: `${label ? `<p><strong>${escapeHtml(label)}</strong></p>` : ''}<hr>`,
      };
    }

    case 'ComponentSharedQuote': {
      const quoteHtml = contentHtml(block.body, `${id} quote`);
      if (!quoteHtml) return undefined;
      return {
        id,
        type: 'quote',
        quote: {
          quoteHtml,
          name: value(block.title) || title,
          role: 'Case study',
          company: 'Tcules',
        },
      };
    }

    case 'ComponentElementsLink': {
      const action = mapAction(block);
      if (!action) return undefined;
      return {
        id,
        type: 'link',
        action,
        ...(value(block.linkDescription) ? { description: value(block.linkDescription) } : {}),
      };
    }

    default:
      return undefined;
  }
}

function isRecord(candidate: unknown): candidate is Record<string, unknown> {
  return typeof candidate === 'object' && candidate !== null && !Array.isArray(candidate);
}

function parseJson(candidate: unknown): unknown {
  if (typeof candidate === 'string') {
    try {
      return JSON.parse(candidate.trim()) as unknown;
    } catch {
      return undefined;
    }
  }

  if (Array.isArray(candidate)) {
    const isRichText = candidate.some(
      (item) => isRecord(item) && typeof item.type === 'string',
    );
    if (!isRichText) return candidate;

    try {
      return JSON.parse(richTextToPlainText(candidate)) as unknown;
    } catch {
      return undefined;
    }
  }

  return candidate;
}

function jsonLd(candidate: unknown): Record<string, unknown> | unknown[] | undefined {
  const parsed = parseJson(candidate);
  if (Array.isArray(parsed)) return parsed;
  if (!isRecord(parsed)) return undefined;

  const preview = parsed.full_json_ld_preview;
  return isRecord(preview) || Array.isArray(preview) ? preview : parsed;
}

function canonicalUrl(candidate: string | null | undefined): string | undefined {
  const url = absoluteUrl(candidate, DEFAULT_STRAPI_GRAPHQL_URL);
  return value(candidate).startsWith('http') ? url : undefined;
}

function mapSeo(rawSeo: StrapiCaseStudySeo | null | undefined): ContentSeo | undefined {
  if (!rawSeo) return undefined;

  const title = value(rawSeo.metaTitle);
  const description = value(rawSeo.metaDescription);
  const canonical = canonicalUrl(rawSeo.canonicalURL);
  const robotTokens = value(rawSeo.robot)
    .toLowerCase()
    .split(/[\s,]+/u)
    .filter(Boolean);
  const robots = robotTokens.length
    ? { index: !robotTokens.includes('noindex'), follow: !robotTokens.includes('nofollow') }
    : undefined;

  let structuredData: ContentSeo['structuredData'];
  for (const candidate of [rawSeo.codeJson, rawSeo.graphCode, rawSeo.structuredData]) {
    structuredData = jsonLd(candidate);
    if (structuredData) break;
  }

  return title || description || canonical || robots || structuredData
    ? {
        ...(title ? { title } : {}),
        ...(description ? { description } : {}),
        ...(canonical ? { canonical } : {}),
        ...(robots ? { robots, noindex: !robots.index } : {}),
        ...(structuredData ? { structuredData } : {}),
      }
    : undefined;
}

function mergeSeo(
  embedded: ContentSeo | undefined,
  primary: ContentSeo | undefined,
): ContentSeo | undefined {
  if (!embedded && !primary) return undefined;
  return {
    ...embedded,
    ...primary,
    robots: primary?.robots ?? embedded?.robots,
    structuredData: primary?.structuredData ?? embedded?.structuredData,
  };
}

function mapCaseStudy(raw: StrapiCaseStudy, graphqlUrl: string): CaseStudyPage | null {
  const slug = value(raw.slug);
  if (!slug) return null;

  const title = value(raw.title);
  const heroImage = mapImage(raw.heroImage, title, 'hero image', graphqlUrl);
  const thumbnail = mapImage(raw.thumbnail, title, 'thumbnail', graphqlUrl);
  const embeddedSeoBlock = raw.caseStudyContents?.find(
    (block) => block.__typename === 'ComponentSharedSeo',
  );
  const seo = mergeSeo(mapSeo(embeddedSeoBlock), mapSeo(raw.seo));
  const ctaAction = mapAction(raw.ctoSection?.link);
  const ctaHeading = value(raw.ctoSection?.heading).replaceAll('|', '');
  const cta =
    ctaHeading && ctaAction
      ? {
          heading: ctaHeading,
          body: [value(raw.ctoSection?.ctoDescription)] as const,
          actions: [ctaAction] as const,
        }
      : undefined;

  return {
    documentId: value(raw.documentId) || slug,
    slug,
    title,
    description: value(raw.shortDescription),
    ...(value(raw.publishedAt) ? { publishedAt: value(raw.publishedAt) } : {}),
    ...(value(raw.updatedAt) ? { updatedAt: value(raw.updatedAt) } : {}),
    ...(heroImage ? { heroImage } : {}),
    ...(heroImage || thumbnail ? { socialImage: heroImage ?? thumbnail } : {}),
    profile: (raw.profile ?? []).flatMap((item, index) => {
      const label = value(item.heading);
      const itemValue = value(item.description);
      return label && itemValue
        ? [{ id: value(item.id) || `profile-${index}`, label, value: itemValue }]
        : [];
    }),
    statements: (raw.statement ?? []).flatMap((item, index) => {
      const statementTitle = value(item.type);
      const body = value(item.desc);
      return statementTitle && body
        ? [{ id: value(item.id) || `statement-${index}`, title: statementTitle, body }]
        : [];
    }),
    categories: (raw.categories ?? []).flatMap((category) => {
      const name = value(category.name);
      return name ? [name] : [];
    }),
    tags: (raw.tags ?? []).flatMap((tag) => {
      const name = value(tag.name);
      return name ? [name] : [];
    }),
    blocks: (raw.caseStudyContents ?? []).flatMap((block, index) => {
      const mapped = mapBlock(block, index, title, graphqlUrl);
      return mapped ? [mapped] : [];
    }),
    ...(cta ? { cta } : {}),
    ...(seo ? { seo } : {}),
  };
}

async function fetchCaseStudyBySlug(slug: string): Promise<StrapiCaseStudy | null> {
  const graphqlUrl = getStrapiGraphqlUrl();
  const response = await fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: CASE_STUDY_BY_SLUG_QUERY,
      variables: { slug, status: 'PUBLISHED' },
    }),
    cache: 'force-cache',
    next: {
      revalidate: CASE_STUDY_REVALIDATE_SECONDS,
      tags: ['case-studies', `case-study:${slug.slice(0, 235)}`],
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi case-study request failed with HTTP ${response.status}.`);
  }

  const payload = (await response.json()) as StrapiCaseStudyResponse;
  const errors = payload.errors?.map((error) => value(error.message)).filter(Boolean) ?? [];
  if (errors.length > 0) {
    throw new Error(`Strapi case-study query failed: ${errors.join('; ')}`);
  }

  return payload.data?.currentCaseStudy?.[0] ?? null;
}

export const caseStudySource: CaseStudyContentSource = {
  async getCaseStudyPage(slug) {
    const requestedSlug = value(slug);
    if (!requestedSlug) return null;

    const graphqlUrl = getStrapiGraphqlUrl();
    const caseStudy = await fetchCaseStudyBySlug(requestedSlug);
    return caseStudy ? mapCaseStudy(caseStudy, graphqlUrl) : null;
  },
};
