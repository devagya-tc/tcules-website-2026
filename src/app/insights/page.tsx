import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Button, Cluster, Icon, Layout, Section, Tag } from '@/components';
import {
  getInsightsPage,
  type InsightFilterGroup,
  type InsightResource,
  type InsightResourceKind,
} from '@/content';
import { blogPath, ROUTES } from '@/lib/routes';
import { BlockCard, Breadcrumbs, CtaSection, PageHero } from '@/patterns';

const INSIGHTS_SLUG = ROUTES.insights.slice(1);
const RESOURCES_ID = 'insights-resources';
const FILTER_QUERY_PREFIX = 'filter-';

type InsightsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function resourceLabel(kind: InsightResourceKind): string {
  return kind === 'article' ? 'Article' : `${kind.charAt(0).toUpperCase()}${kind.slice(1)}`;
}

function resourceCta(kind: InsightResourceKind): string {
  switch (kind) {
    case 'podcast':
      return 'Listen to podcast';
    case 'event':
      return 'View event';
    case 'interview':
      return 'Read interview';
    case 'article':
      return 'Read article';
  }
}

function filterKey(groupId: string): string {
  return `${FILTER_QUERY_PREFIX}${groupId}`;
}

function firstQueryValue(candidate: string | string[] | undefined): string {
  return Array.isArray(candidate) ? (candidate[0] ?? '') : (candidate ?? '');
}

function selectedFilters(
  groups: readonly InsightFilterGroup[],
  query: Record<string, string | string[] | undefined>,
): Map<string, string> {
  const selected = new Map<string, string>();

  for (const group of groups) {
    const candidate = firstQueryValue(query[filterKey(group.id)]);
    if (group.options.some((option) => option.id === candidate)) {
      selected.set(group.id, candidate);
    }
  }

  return selected;
}

function filterHref(
  selected: ReadonlyMap<string, string>,
  groupId?: string,
  optionId?: string,
) {
  const next = new Map(selected);
  if (groupId) {
    if (optionId) next.set(groupId, optionId);
    else next.delete(groupId);
  }

  const query = new URLSearchParams();
  [...next.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .forEach(([id, value]) => query.set(filterKey(id), value));
  const search = query.toString();

  return `${ROUTES.insights}${search ? `?${search}` : ''}#${RESOURCES_ID}`;
}

function matchesFilters(resource: InsightResource, selected: ReadonlyMap<string, string>) {
  return [...selected.values()].every((filterId) => resource.filterIds.includes(filterId));
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getInsightsPage(INSIGHTS_SLUG);

  if (!page) {
    return {
      title: 'Insights not found | Tcules',
      robots: { index: false, follow: false },
    };
  }

  const title = page.seo?.title || page.hero.heading;
  const description = page.seo?.description || page.hero.description;
  const canonical = page.seo?.canonical;
  const image = page.formatCards.find((card) => card.image)?.image;

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
      images: image ? [{ url: image.src, alt: image.alt }] : [],
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image.src] : [],
    },
  };
}

export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  const [page, query] = await Promise.all([getInsightsPage(INSIGHTS_SLUG), searchParams]);

  if (!page) notFound();

  const selected = selectedFilters(page.resources.filters, query);
  const visibleResources = page.resources.items.filter((resource) =>
    matchesFilters(resource, selected),
  );

  return (
    <>
      <Breadcrumbs
        surface="paper"
        items={[
          { label: 'Home', href: ROUTES.home },
          { label: page.hero.heading, href: ROUTES.insights },
        ]}
      />

      <PageHero title={page.hero.heading} body={[page.hero.description]} surface="paper" />

      {page.formatCards.length > 0 ? (
        <Section as="div" surface="tint">
          <Layout
            as="ul"
            columns={{ base: 1, md: 2, lg: 4 }}
            colGap="gutter"
            rowGap="gutter"
            equalRows
          >
            {page.formatCards.map((card) => (
              <Layout as="li" key={card.id} rowGap="block">
                {card.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element -- CMS-authored format artwork */
                  <img
                    src={card.image.src}
                    alt={card.image.alt}
                    width={480}
                    height={320}
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
                <h2>{card.title}</h2>
              </Layout>
            ))}
          </Layout>
        </Section>
      ) : null}

      {page.lab ? (
        page.lab.action ? (
          <CtaSection
            arrangement="offer"
            surface="blue"
            heading={page.lab.heading}
            body={[page.lab.description]}
            actions={[page.lab.action]}
          />
        ) : (
          <Section surface="blue" aria-labelledby="insights-lab-heading">
            <Layout rowGap="block">
              <h2 id="insights-lab-heading">{page.lab.heading}</h2>
              {page.lab.description ? <p>{page.lab.description}</p> : null}
            </Layout>
          </Section>
        )
      ) : null}

      <Section id={RESOURCES_ID} surface="paper" aria-labelledby="insights-resources-heading">
        <Layout rowGap="stack">
          <h2 id="insights-resources-heading">{page.resources.heading}</h2>

          {page.resources.filters.length > 0 ? (
            <Layout columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="gutter">
              {page.resources.filters.map((group) => {
                const activeOption = selected.get(group.id);

                return (
                  <Layout key={group.id} rowGap="text">
                    <h3>{group.label}</h3>
                    {/* Both gaps are `text` (16), and that is the touch-target argument rather
                        than a preference: a Tag is 24 x 24, which MEETS the AA floor without
                        margin, so the clearance has to come from the row. `tight` (8) would leave
                        two 24px targets 8px apart. The gap belongs to the caller, which is why it
                        is here and not in the component. */}
                    <Cluster as="ul" colGap="text" rowGap="text">
                      {group.options.map((option) => {
                        const isActive = activeOption === option.id;
                        return (
                          <li key={option.id}>
                            {/* The held chip's href CLEARS its group — `filterHref` with no
                                option id deletes the key — which is what makes the `close` glyph
                                a control rather than a decoration, and what replaced the "All"
                                chip. "All" is the absence of a filter, not a filter: rendering it
                                as a held, aria-current chip told a reader that "no constraint" was
                                a constraint they had chosen. A group with nothing selected now
                                says so by having no held chip in it.

                                `aria-current` is not set here any more. Tag emits it from
                                `selected`, so the attribute and the paint cannot drift apart. */}
                            <Tag
                              variant="filter"
                              href={
                                isActive
                                  ? filterHref(selected, group.id)
                                  : filterHref(selected, group.id, option.id)
                              }
                              selected={isActive}
                              icon={
                                isActive ? (
                                  <Icon name="close" label="Clear filter" />
                                ) : undefined
                              }
                            >
                              {option.name}
                            </Tag>
                          </li>
                        );
                      })}
                    </Cluster>
                  </Layout>
                );
              })}
            </Layout>
          ) : null}

          {visibleResources.length > 0 ? (
            <Layout
              as="ul"
              columns={{ base: 1, md: 2, lg: 3 }}
              colGap="gutter"
              rowGap="gutter"
              equalRows
            >
              {visibleResources.map((resource) => {
                const taxonomy = resource.categories.map((category) => category.name);
                const eyebrow = [resourceLabel(resource.kind), ...taxonomy].join(' · ');

                return (
                  <BlockCard
                    key={`${resource.kind}-${resource.documentId}`}
                    title={resource.title}
                    body={resource.description}
                    eyebrow={eyebrow}
                    media={
                      resource.image
                        ? { kind: 'image', src: resource.image.src, alt: resource.image.alt }
                        : undefined
                    }
                    href={blogPath(resource.slug)}
                    ctaLabel={resourceCta(resource.kind)}
                  />
                );
              })}
            </Layout>
          ) : (
            <Layout rowGap="block">
              <p>
                {page.resources.items.length > 0
                  ? 'No insights match the selected filters.'
                  : 'No insights are available yet.'}
              </p>
              {selected.size > 0 ? (
                <Cluster>
                  <Button
                    as="a"
                    href={filterHref(new Map())}
                    emphasis="ghost"
                    tone="neutral"
                    icon={<Icon name="arrow-right" />}
                  >
                    Clear filters
                  </Button>
                </Cluster>
              ) : null}
            </Layout>
          )}
        </Layout>
      </Section>

      {page.closing ? (
        <Section
          surface="tint"
          aria-labelledby={page.closing.heading ? 'insights-closing-heading' : undefined}
        >
          <Layout
            columns={{ base: 1, lg: [3, 2] }}
            colGap="column"
            rowGap="block"
            align="start"
          >
            {page.closing.heading ? (
              <h2 id="insights-closing-heading">{page.closing.heading}</h2>
            ) : null}
            {page.closing.description ? <p>{page.closing.description}</p> : null}
          </Layout>
        </Section>
      ) : null}
    </>
  );
}
