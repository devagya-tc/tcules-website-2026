import type {
  ContentSeo,
  InsightAction,
  InsightFilterGroup,
  InsightFilterOption,
  InsightFormatCard,
  InsightImage,
  InsightResource,
  InsightResourceKind,
  InsightTaxonomy,
  InsightsContentSource,
  InsightsPage,
} from '../../types';
import { INSIGHTS_PAGE_QUERY } from './insights-query';
import type {
  StrapiInsightsImage,
  StrapiInsightsPage,
  StrapiInsightsResource,
  StrapiInsightsResponse,
  StrapiInsightsSeo,
  StrapiInsightsTaxonomy,
} from './insights-types';
import { safeContentHref } from './rich-text';

const DEFAULT_STRAPI_GRAPHQL_URL = 'https://tcules-server-production.up.railway.app/graphql';
const INSIGHTS_SLUG = 'insights';
const INSIGHTS_REVALIDATE_SECONDS = 300;
const RESOURCE_LIMIT = 100;

function value(candidate: string | null | undefined): string {
  return typeof candidate === 'string' ? candidate.trim() : '';
}

function displayHeading(candidate: string | null | undefined): string {
  return value(candidate)
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' ');
}

function normaliseSlug(candidate: string | null | undefined): string {
  return value(candidate)
    .split('/')
    .map((segment) => segment.trim())
    .filter(Boolean)
    .join('/');
}

function getStrapiGraphqlUrl(): string {
  return value(process.env.STRAPI_GRAPHQL_URL) || DEFAULT_STRAPI_GRAPHQL_URL;
}

function absoluteUrl(
  candidate: string | null | undefined,
  baseUrl: string,
): string | undefined {
  const path = value(candidate);
  if (!path) return undefined;

  try {
    const url = new URL(path, baseUrl);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function mapImage(
  image: StrapiInsightsImage | null | undefined,
  fallbackAlt: string,
  graphqlUrl: string,
): InsightImage | undefined {
  const src = absoluteUrl(image?.url, graphqlUrl);
  if (!src) return undefined;

  return {
    src,
    alt: value(image?.alternativeText) || fallbackAlt,
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
): InsightAction | undefined {
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

function taxonomyId(item: StrapiInsightsTaxonomy, kind: InsightFilterOption['kind']): string {
  const documentId = value(item.documentId);
  if (documentId) return documentId;

  const fallback =
    normaliseSlug(item.slug) || value(item.name).toLowerCase().replace(/\s+/gu, '-');
  return fallback ? `${kind}:${fallback}` : '';
}

function mapTaxonomy(
  item: StrapiInsightsTaxonomy,
  kind: InsightFilterOption['kind'],
): InsightTaxonomy | undefined {
  const name = value(item.name);
  const documentId = taxonomyId(item, kind);
  if (!name || !documentId) return undefined;

  const slug = normaliseSlug(item.slug);
  return {
    documentId,
    name,
    ...(slug ? { slug } : {}),
  };
}

function mapFilterOption(
  item: StrapiInsightsTaxonomy,
  kind: InsightFilterOption['kind'],
): InsightFilterOption | undefined {
  const taxonomy = mapTaxonomy(item, kind);
  return taxonomy ? { id: taxonomy.documentId, name: taxonomy.name, kind } : undefined;
}

function mapFilterGroup(
  group: NonNullable<NonNullable<StrapiInsightsPage['thirdSection']>['filterResource']>[number],
  index: number,
): InsightFilterGroup | undefined {
  const label = value(group.label);
  if (!label) return undefined;

  const options = [
    ...(group.categories ?? []).flatMap((category) => {
      const mapped = mapFilterOption(category, 'category');
      return mapped ? [mapped] : [];
    }),
    ...(group.tags ?? []).flatMap((tag) => {
      const mapped = mapFilterOption(tag, 'tag');
      return mapped ? [mapped] : [];
    }),
  ];

  return {
    id: value(group.id) || `insights-filter-${index + 1}`,
    label,
    options,
  };
}

function mapFormatCard(
  card: NonNullable<StrapiInsightsPage['cardDetails']>[number],
  index: number,
  graphqlUrl: string,
): InsightFormatCard | undefined {
  const title = displayHeading(card.heading);
  if (!title) return undefined;

  const image = mapImage(card.cardImage, `${title} resources`, graphqlUrl);
  return {
    id: value(card.id) || `insights-format-${index + 1}`,
    title,
    ...(image ? { image } : {}),
  };
}

function displayDate(candidate: string | null | undefined): string {
  const source = value(candidate);
  if (!source) return '';

  const date = new Date(source);
  if (Number.isNaN(date.valueOf())) return source;

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

function resourceDescription(resource: StrapiInsightsResource): string {
  const description = value(resource.description);
  const iframeDetail = value(
    resource.mainSection?.find(
      (block) => block.__typename === 'ComponentBlogAndCasestudiesIframe',
    )?.title,
  );
  const eventDetails = (resource.eventWhereAbout ?? []).flatMap((detail) =>
    [value(detail.descOne), value(detail.descTwo)].filter(Boolean),
  );
  const authoredDetails = [description, iframeDetail, ...eventDetails].filter(
    (detail, index, details) => detail && details.indexOf(detail) === index,
  );

  return authoredDetails.join(' — ') || displayDate(resource.publishedAt);
}

function mapResource(
  resource: StrapiInsightsResource,
  index: number,
  kind: InsightResourceKind,
  graphqlUrl: string,
): InsightResource | undefined {
  const title = value(resource.title);
  const slug = normaliseSlug(resource.slug);
  if (!title || !slug) return undefined;

  const image = mapImage(resource.thumbnail, `${title} thumbnail`, graphqlUrl);
  const tags = (resource.tags ?? []).flatMap((tag) => {
    const mapped = mapTaxonomy(tag, 'tag');
    return mapped ? [mapped] : [];
  });
  const categories = (resource.categories ?? []).flatMap((category) => {
    const mapped = mapTaxonomy(category, 'category');
    return mapped ? [mapped] : [];
  });
  const publishedAt = value(resource.publishedAt);

  return {
    documentId: value(resource.documentId) || `insights-${kind}-${index + 1}`,
    kind,
    title,
    slug,
    description: resourceDescription(resource),
    ...(image ? { image } : {}),
    tags,
    categories,
    filterIds: [...new Set([...tags, ...categories].map((item) => item.documentId))],
    ...(publishedAt ? { publishedAt } : {}),
  };
}

function sortResources(resources: InsightResource[]): InsightResource[] {
  return resources.sort((left, right) => {
    const leftTime = left.publishedAt ? Date.parse(left.publishedAt) : Number.NaN;
    const rightTime = right.publishedAt ? Date.parse(right.publishedAt) : Number.NaN;
    const safeLeft = Number.isNaN(leftTime) ? Number.NEGATIVE_INFINITY : leftTime;
    const safeRight = Number.isNaN(rightTime) ? Number.NEGATIVE_INFINITY : rightTime;
    return safeRight - safeLeft;
  });
}

function mapSeo(rawSeo: StrapiInsightsSeo | null | undefined): ContentSeo | undefined {
  if (!rawSeo) return undefined;

  const title = value(rawSeo.metaTitle);
  const description = value(rawSeo.metaDescription);
  const canonicalCandidate = value(rawSeo.canonicalURL);
  const canonical =
    canonicalCandidate.startsWith('http://') || canonicalCandidate.startsWith('https://')
      ? absoluteUrl(canonicalCandidate, DEFAULT_STRAPI_GRAPHQL_URL)
      : undefined;
  const robotTokens = value(rawSeo.robot)
    .toLowerCase()
    .split(/[\s,]+/u)
    .filter(Boolean);
  const robots = robotTokens.length
    ? { index: !robotTokens.includes('noindex'), follow: !robotTokens.includes('nofollow') }
    : undefined;

  return title || description || canonical || robots
    ? {
        ...(title ? { title } : {}),
        ...(description ? { description } : {}),
        ...(canonical ? { canonical } : {}),
        ...(robots ? { robots, noindex: !robots.index } : {}),
      }
    : undefined;
}

function mapInsightsPage(
  payload: StrapiInsightsResponse,
  requestedSlug: string,
  graphqlUrl: string,
): InsightsPage | null {
  const rawPage = payload.data?.resource;
  if (!rawPage) return null;

  const cmsSlug = normaliseSlug(rawPage.seo?.slug);
  if (cmsSlug && cmsSlug !== requestedSlug) return null;

  const heading = displayHeading(rawPage.heading);
  if (!heading) return null;

  const labAction = mapAction(rawPage.secondSection?.link);
  const labHeading = displayHeading(rawPage.secondSection?.heading);
  const lab =
    rawPage.secondSection && labHeading
      ? {
          id: value(rawPage.secondSection.id) || 'insights-lab',
          heading: labHeading,
          description: value(rawPage.secondSection.description),
          ...(labAction ? { action: labAction } : {}),
        }
      : undefined;
  const closingHeading = displayHeading(rawPage.fourthSection?.heading);
  const closingDescription = value(rawPage.fourthSection?.description);
  const closing =
    rawPage.fourthSection && (closingHeading || closingDescription)
      ? {
          id: value(rawPage.fourthSection.id) || 'insights-closing',
          heading: closingHeading,
          description: closingDescription,
        }
      : undefined;
  const resources = sortResources([
    ...(payload.data?.blogResources ?? []).flatMap((resource, index) => {
      const mapped = mapResource(resource, index, 'article', graphqlUrl);
      return mapped ? [mapped] : [];
    }),
    ...(payload.data?.eventResources ?? []).flatMap((resource, index) => {
      const mapped = mapResource(resource, index, 'event', graphqlUrl);
      return mapped ? [mapped] : [];
    }),
    ...(payload.data?.interviewResources ?? []).flatMap((resource, index) => {
      const mapped = mapResource(resource, index, 'interview', graphqlUrl);
      return mapped ? [mapped] : [];
    }),
    ...(payload.data?.podcastResources ?? []).flatMap((resource, index) => {
      const mapped = mapResource(resource, index, 'podcast', graphqlUrl);
      return mapped ? [mapped] : [];
    }),
  ]);
  const seo = mapSeo(rawPage.seo);

  return {
    documentId: value(rawPage.documentId) || requestedSlug,
    slug: cmsSlug || requestedSlug,
    hero: {
      heading,
      description: value(rawPage.description),
    },
    formatCards: (rawPage.cardDetails ?? []).flatMap((card, index) => {
      const mapped = mapFormatCard(card, index, graphqlUrl);
      return mapped ? [mapped] : [];
    }),
    ...(lab ? { lab } : {}),
    resources: {
      id: value(rawPage.thirdSection?.id) || 'insights-resources',
      heading: displayHeading(rawPage.thirdSection?.heading),
      filters: (rawPage.thirdSection?.filterResource ?? []).flatMap((group, index) => {
        const mapped = mapFilterGroup(group, index);
        return mapped ? [mapped] : [];
      }),
      items: resources,
    },
    ...(closing ? { closing } : {}),
    ...(seo ? { seo } : {}),
  };
}

async function fetchInsightsPage(): Promise<{
  graphqlUrl: string;
  payload: StrapiInsightsResponse;
}> {
  const graphqlUrl = getStrapiGraphqlUrl();
  const response = await fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: INSIGHTS_PAGE_QUERY,
      variables: {
        status: 'PUBLISHED',
        sort: ['publishedAt:desc'],
        blogLimit: RESOURCE_LIMIT,
        eventLimit: RESOURCE_LIMIT,
        interviewLimit: RESOURCE_LIMIT,
        podcastLimit: RESOURCE_LIMIT,
      },
    }),
    cache: 'force-cache',
    next: {
      revalidate: INSIGHTS_REVALIDATE_SECONDS,
      tags: ['insights', 'blogs', 'events', 'interviews', 'podcasts'],
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi insights request failed with HTTP ${response.status}.`);
  }

  const payload = (await response.json()) as StrapiInsightsResponse;
  const errors = payload.errors?.map((error) => value(error.message)).filter(Boolean) ?? [];
  if (errors.length > 0) {
    throw new Error(`Strapi insights query failed: ${errors.join('; ')}`);
  }

  return { graphqlUrl, payload };
}

/** The resource singleton is route-scoped here because Strapi exposes no slug filter for it. */
export const insightsSource: InsightsContentSource = {
  async getInsightsPage(slug) {
    const requestedSlug = normaliseSlug(slug);
    if (requestedSlug !== INSIGHTS_SLUG) return null;

    const { graphqlUrl, payload } = await fetchInsightsPage();
    return mapInsightsPage(payload, requestedSlug, graphqlUrl);
  },
};
