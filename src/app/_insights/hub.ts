import type { IconName } from '@/components';
import type { InsightResource, InsightResourceKind, InsightsPage } from '@/content';
import { glyphForRoute } from '@/lib/glyphs';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { placeholderImage } from '@/lib/placeholders';
import { blogPath, ROUTES } from '@/lib/routes';
import type {
  InsightsIndexFilterGroup,
  InsightsIndexFilterOption,
  InsightsIndexItem,
  InsightsIndexKind,
  InsightsIndexProps,
} from '@/templates';

/**
 * The insights hub's composition: the view model mapped onto InsightsIndex, and the URL read into
 * the feed's filters and page. Shared by the live `/insights` and its specimen
 * (`/design/insights-index`), so the two cannot drift; each passes its own path, because every
 * filter link must come back to the page it was clicked on.
 *
 * The URL is the state, as it was before the redesign: `?filter-<group>=<option>` per group (one
 * option per group), `?page=<n>` for "Show more". A held option's own link clears its group, which
 * is what makes its `close-circle` a control (see the old route's note, kept in Tag's spec). Every
 * link ends in the feed's fragment, so a filter lands the reader on the feed rather than the top.
 */

type Query = Record<string, string | string[] | undefined>;

/**
 * Stand-in covers for insights that have none yet (visual-direction § 5.7): catalogue photographs of
 * the work itself — whiteboards, sketches, sticky walls — with no legible screen, at masters large
 * enough for the front page's lead. Never labelled; replaced when the real cover exists. The
 * template takes them in order down the page, so neighbours do not repeat.
 */
const STAND_INS: readonly PhotoId[] = [
  'whiteboard-two-hands',
  'hand-sketch-wireframe',
  'workshop-sticky-sort',
  'desk-sketch-flatlay',
  'workshop-hands-writing',
  'pair-testing-overhead',
];

const FILTER_PREFIX = 'filter-';
const PAGE_KEY = 'page';
/** The feed's page: twelve rows, then "Show more". */
const PAGE_SIZE = 12;
/** The format filter is the page's own group, built from the kinds that exist. */
const FORMAT_GROUP = 'format';

const KINDS: readonly InsightResourceKind[] = [
  'article',
  'guide',
  'research',
  'podcast',
  'video',
  'event',
  'interview',
];
const FORMAT_NAME: Record<InsightResourceKind, string> = {
  article: 'Articles',
  guide: 'Guides',
  research: 'Research',
  podcast: 'Podcasts',
  video: 'Videos',
  event: 'Events',
  interview: 'Interviews',
};

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? (value[0] ?? '') : (value ?? '');

/** `path` may carry a query of its own (the specimen's `?state=`), which every link keeps. */
function hrefFor(
  path: string,
  feedId: string,
  selected: ReadonlyMap<string, string>,
  page = 1,
) {
  const [base = path, own] = path.split('?');
  const query = new URLSearchParams(own);
  [...selected.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([group, option]) => query.set(`${FILTER_PREFIX}${group}`, option));
  if (page > 1) query.set(PAGE_KEY, String(page));
  const search = query.toString();
  return `${base}${search ? `?${search}` : ''}#${feedId}`;
}

function toItem(resource: InsightResource): InsightsIndexItem {
  const image = resource.image;
  return {
    id: resource.documentId,
    kind: resource.kind as InsightsIndexKind,
    title: resource.title,
    /* Every insight slug carries its family's segment where it has one ("podcasts/…",
       "guides/…"), so one builder serves every format and the route tree resolves it. */
    href: blogPath(resource.slug),
    description: resource.description,
    ...(image?.src
      ? {
          cover: {
            src: image.src,
            alt: image.alt,
            ...(image.width && image.height
              ? { width: image.width, height: image.height }
              : {}),
            ...(image.sources ? { sources: image.sources } : {}),
            ...(image.kind ? { kind: image.kind } : {}),
            ...(image.standIn ? { standIn: true } : {}),
          },
        }
      : {}),
    ...(resource.publishedAt ? { publishedAt: resource.publishedAt } : {}),
    ...(resource.readingTime ? { readingTime: resource.readingTime } : {}),
    ...(resource.duration ? { duration: resource.duration } : {}),
    ...(resource.event ? { event: resource.event } : {}),
    /* A scene DRAWN for this article, assigned in data (never by keyword): its cover until a real
       one exists. docs/specs/InsightsIndex.md § 12a. */
    ...(resource.coverScene ? { scene: resource.coverScene } : {}),
  };
}

export function insightsIndexProps(
  page: InsightsPage,
  query: Query,
  path: string,
): InsightsIndexProps {
  /* The feed's anchor: one stable name, whatever id the CMS gives its section. */
  const feedId = 'feed';
  const resources = page.resources.items;
  const kinds = KINDS.filter((kind) => resources.some((item) => item.kind === kind));

  /* The groups the feed filters by: format first, then the CMS's own. */
  const groups: { id: string; label: string; options: { id: string; label: string }[] }[] = [
    ...(kinds.length > 1
      ? [
          {
            id: FORMAT_GROUP,
            label: 'Format',
            options: kinds.map((kind) => ({ id: kind, label: FORMAT_NAME[kind] })),
          },
        ]
      : []),
    ...page.resources.filters
      .filter((group) => group.options.length > 0)
      .map((group) => ({
        id: group.id,
        label: group.label,
        options: group.options.map((option) => ({ id: option.id, label: option.name })),
      })),
  ];

  const selected = new Map<string, string>();
  for (const group of groups) {
    const wanted = first(query[`${FILTER_PREFIX}${group.id}`]);
    if (group.options.some((option) => option.id === wanted)) selected.set(group.id, wanted);
  }

  const matches = resources.filter((item) =>
    [...selected.entries()].every(([group, option]) =>
      group === FORMAT_GROUP ? item.kind === option : item.filterIds.includes(option),
    ),
  );
  const pages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const current = Math.min(
    pages,
    Math.max(1, Number.parseInt(first(query[PAGE_KEY]), 10) || 1),
  );
  const visible = matches.slice(0, current * PAGE_SIZE);

  /* Whether an item passes every held filter except the named group's: what that group's own
     options are counted against, so a count says what choosing it would show. */
  const passesExcept = (item: InsightResource, except: string) =>
    [...selected.entries()].every(
      ([group, option]) =>
        group === except ||
        (group === FORMAT_GROUP ? item.kind === option : item.filterIds.includes(option)),
    );
  const toggle = (group: string, option: string | undefined) => {
    const next = new Map(selected);
    if (option === undefined || selected.get(group) === option) next.delete(group);
    else next.set(group, option);
    return hrefFor(path, feedId, next);
  };

  /* FORMAT, the primary filter: one line, "All" first, each with its count (owner, 13 Oct 2026). */
  const formatPool = resources.filter((item) => passesExcept(item, FORMAT_GROUP));
  const formatOptions: InsightsIndexFilterOption[] =
    kinds.length > 1
      ? [
          {
            id: 'all',
            label: 'All',
            count: formatPool.length,
            href: toggle(FORMAT_GROUP, undefined),
            selected: !selected.has(FORMAT_GROUP),
          },
          ...kinds
            .map((kind) => ({
              id: kind,
              label: FORMAT_NAME[kind],
              count: formatPool.filter((item) => item.kind === kind).length,
              href: toggle(FORMAT_GROUP, kind),
              selected: selected.get(FORMAT_GROUP) === kind,
            }))
            .filter((option) => option.count > 0 || option.selected),
        ]
      : [];

  /* The rest behind "More filters": only options with results, and a group with one option or none
     is dropped (owner, 13 Oct 2026). A held option always stays, so it can be cleared. */
  const filters: InsightsIndexFilterGroup[] = groups
    .filter((group) => group.id !== FORMAT_GROUP)
    .map((group) => {
      const pool = resources.filter((item) => passesExcept(item, group.id));
      return {
        id: group.id,
        label: group.label,
        options: group.options
          .map((option) => ({
            id: option.id,
            label: option.label,
            count: pool.filter((item) => item.filterIds.includes(option.id)).length,
            href: toggle(group.id, option.id),
            selected: selected.get(group.id) === option.id,
          }))
          .filter((option) => option.count > 0 || option.selected),
      };
    })
    .filter((group) => group.options.length > 1 || group.options.some((o) => o.selected));

  /* What is held, as a short removable summary: each chip's link drops its own filter. */
  const held = groups.flatMap((group) => {
    const option = group.options.find((candidate) => candidate.id === selected.get(group.id));
    return option
      ? [
          {
            id: `${group.id}-${option.id}`,
            label: option.label,
            href: toggle(group.id, undefined),
          },
        ]
      : [];
  });

  const formatTitle = (kind: InsightResourceKind) =>
    page.formatCards.find((card) => card.kind === kind)?.title || FORMAT_NAME[kind];

  return {
    standIns: STAND_INS.map((id) => getKitPhoto(id, { standIn: true })),
    breadcrumbs: [
      { label: 'Home', href: ROUTES.home },
      { label: 'Insights', href: ROUTES.insights },
    ],
    hero: { title: page.hero.heading, lede: page.hero.description },
    items: resources.map(toItem),
    featuredId: resources.find((item) => item.featured)?.documentId,
    /* "All podcasts" goes to the feed filtered by format until the format pages exist
       (docs/specs/InsightsIndex.md § 17 Q1): routes.ts names them, but none renders yet. */
    formats: kinds.map((kind) => ({
      kind: kind as InsightsIndexKind,
      title: formatTitle(kind),
      lead: page.formatCards.find((card) => card.kind === kind)?.description,
      href: hrefFor(path, feedId, new Map([[FORMAT_GROUP, kind]])),
    })),
    collections: (page.collections ?? []).map((collection) => ({
      id: collection.id,
      title: collection.title,
      description: collection.description,
      icon: collection.related
        ? (glyphForRoute(collection.related.href) as IconName | undefined)
        : undefined,
      items: collection.items,
      related: collection.related
        ? { label: collection.related.label, href: collection.related.href }
        : undefined,
    })),
    lab: page.lab?.action
      ? {
          heading: page.lab.heading,
          body: page.lab.description,
          action: { label: page.lab.action.label, href: page.lab.action.href },
          /* The Lab illustration, commissioned later: its register placeholder holds the slot. */
          visual: placeholderImage(ROUTES.insights, 'lab'),
        }
      : undefined,
    feed: {
      id: feedId,
      heading: page.resources.heading || 'Everything we’ve published',
      items: visible.map(toItem),
      total: matches.length,
      all: resources.length,
      formats: formatOptions,
      filters,
      held,
      clearHref: selected.size > 0 ? hrefFor(path, feedId, new Map()) : undefined,
      moreHref: current < pages ? hrefFor(path, feedId, selected, current + 1) : undefined,
    },
    closing: page.closing?.action
      ? {
          heading: page.closing.heading,
          body: page.closing.description,
          action: { label: page.closing.action.label, href: page.closing.action.href },
        }
      : undefined,
  };
}
