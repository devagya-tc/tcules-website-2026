import type { InsightResource, InsightResourceKind, InsightsPage } from '@/content';
import { blogPath, ROUTES } from '@/lib/routes';
import type {
  InsightsFormatProps,
  InsightsIndexItem,
  InsightsIndexKind,
  InsightsIndexProps,
} from '@/templates';

/**
 * The insights family's composition: the view model mapped onto the hub (InsightsIndex) and onto a
 * format page (InsightsFormat), and the URL read into the hub's view and a format page's page.
 * Shared by the live routes and their specimen (`/design/insights-index`), so they cannot drift.
 *
 * The URL is the state: `?view=topic` opens the hub's BY TOPIC view (BY TYPE is the default and
 * has no parameter); `?page=<n>` is how far down a format page the reader has asked to see.
 */

type Query = Record<string, string | string[] | undefined>;

const VIEW_KEY = 'view';
const PAGE_KEY = 'page';
/** A format page's page: twelve pieces under the feature, then "Show more". */
const PAGE_SIZE = 12;

/** The formats in the order the format picker lists them. */
const KINDS: readonly InsightResourceKind[] = [
  'article',
  'guide',
  'video',
  'event',
  'podcast',
  'research',
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

/** Each format's own page, as routes.ts names it. */
export const FORMAT_ROUTE: Record<InsightResourceKind, string> = {
  article: ROUTES.articles,
  guide: ROUTES.guides,
  research: ROUTES.research,
  podcast: ROUTES.podcasts,
  video: ROUTES.videos,
  event: ROUTES.events,
  interview: ROUTES.interviews,
};

/**
 * Each format's one line, until the CMS's format cards carry a description of their own (Strapi
 * holds a title and an image per card today): stand-in copy, replaced by the card's own line the
 * moment it has one.
 */
const FORMAT_LINE: Record<InsightResourceKind, string> = {
  article: 'Essays and field notes from building complex products.',
  guide: 'Step-by-step guides and checklists to work through with your team.',
  research: 'Studies and surveys, with the data behind them.',
  podcast: 'Conversations with the people who build products.',
  video: 'Talks, workshops and short answers, on camera.',
  event: 'Workshops, meetups and talks we have run, and the ones coming up.',
  interview: 'Product leaders on the decisions that shaped their work.',
};

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? (value[0] ?? '') : (value ?? '');

/**
 * The CMS's GENERIC covers: the brand's abstract leaf graphic, uploaded as the "cover" of pieces that
 * had none of their own (Blog_13, Blog_14, Blog_15). It is a stand-in, not the piece's picture, and
 * set beside its siblings it read as a repeated texture in the most prominent places (beauty round,
 * 16 Oct 2026) — so a piece carrying one is typographic, as the brief rules for a piece without a
 * picture. A curation rule, here once, never per template. Strapi recommendation logged: a `generic`
 * flag on the media record would retire this list.
 */
const GENERIC_COVER = /\/Blog_1[345]_[0-9a-f]+\.[a-z]+$/i;

/**
 * A standfirst the CMS cut at its field limit mid-word ("…integration issues, and mor"): a long
 * excerpt with no closing punctuation loses its broken last word and ends on an ellipsis. A short
 * line without a full stop is left alone — it is a fragment by choice, not a cut.
 */
const CUT_AT = 140;
function tidyExcerpt(text: string | undefined): string | undefined {
  const trimmed = text?.trim();
  if (!trimmed) return undefined;
  if (trimmed.length < CUT_AT || /[.!?…"”')\]]$/.test(trimmed)) return trimmed;
  const cut = trimmed.replace(/\s+\S*$/, '').replace(/[,;:\s]+$/, '');
  return `${cut}…`;
}

/** A watched piece's length: the CMS files a video's running time as "13 min read". */
const watchedLength = (value: string | undefined) => value?.replace(/\s*read$/i, '').trim();

function toItem(resource: InsightResource): InsightsIndexItem {
  const image = resource.image;
  const watched = resource.kind === 'video' || resource.kind === 'podcast';
  const own = image?.src && !image.standIn && !GENERIC_COVER.test(image.src);
  const duration = resource.duration ?? (watched ? watchedLength(resource.readingTime) : undefined);
  return {
    id: resource.documentId,
    kind: resource.kind as InsightsIndexKind,
    title: resource.title,
    /* Every insight slug carries its family's segment where it has one ("podcasts/…",
       "guides/…"), so one builder serves every format and the route tree resolves it. */
    href: blogPath(resource.slug),
    description: tidyExcerpt(resource.description),
    /* Only the item's OWN cover: a catalogue stand-in or the generic leaf graphic is not its picture
       (owner, 16 Oct 2026). */
    ...(image && own
      ? {
          cover: {
            src: image.src,
            alt: image.alt,
            ...(image.width && image.height
              ? { width: image.width, height: image.height }
              : {}),
            ...(image.sources ? { sources: image.sources } : {}),
            ...(image.kind ? { kind: image.kind } : {}),
          },
        }
      : {}),
    ...(resource.publishedAt ? { publishedAt: resource.publishedAt } : {}),
    ...(resource.readingTime && !watched ? { readingTime: resource.readingTime } : {}),
    ...(duration ? { duration } : {}),
    ...(resource.event ? { event: resource.event } : {}),
    /* A scene DRAWN for this article, assigned in data (never by keyword): its own picture until a
       real cover exists. docs/specs/InsightsIndex.md § 12a. */
    ...(resource.coverScene ? { scene: resource.coverScene } : {}),
    topics: resource.filterIds,
  };
}

const formatTitle = (page: InsightsPage, kind: InsightResourceKind) =>
  page.formatCards.find((card) => card.kind === kind)?.title?.trim() || FORMAT_NAME[kind];

const formatLine = (page: InsightsPage, kind: InsightResourceKind) =>
  page.formatCards.find((card) => card.kind === kind)?.description?.trim() || FORMAT_LINE[kind];

/** The formats that have something published, in picker order. */
export const formatsWithContent = (page: InsightsPage) =>
  KINDS.filter((kind) => page.resources.items.some((item) => item.kind === kind));

/** The Lab: the family's close, on the hub and on every format page, so they end alike. */
const labOf = (page: InsightsPage) =>
  page.lab?.action
    ? {
        heading: page.lab.heading,
        body: page.lab.description,
        action: { label: page.lab.action.label, href: page.lab.action.href },
      }
    : undefined;

const closingOf = (page: InsightsPage) =>
  page.closing?.action
    ? {
        heading: page.closing.heading,
        body: page.closing.description,
        action: { label: page.closing.action.label, href: page.closing.action.href },
      }
    : undefined;

export function insightsIndexProps(page: InsightsPage, query: Query): InsightsIndexProps {
  return {
    breadcrumbs: [
      { label: 'Home', href: ROUTES.home },
      { label: 'Insights', href: ROUTES.insights },
    ],
    hero: { title: page.hero.heading, lede: page.hero.description },
    items: page.resources.items.map(toItem),
    view: first(query[VIEW_KEY]) === 'topic' ? 'topic' : 'type',
    formats: formatsWithContent(page).map((kind) => ({
      kind: kind as InsightsIndexKind,
      title: formatTitle(page, kind),
      lead: formatLine(page, kind),
      href: FORMAT_ROUTE[kind],
    })),
    /* The topics the BY TOPIC view curates by: every option of the CMS's groups but industry, which
       is a reader's sector rather than a subject. */
    topics: page.resources.filters
      .filter((group) => !/industry/i.test(group.label))
      .flatMap((group) =>
        group.options.map((option) => ({ id: option.id, label: option.name, group: group.label })),
      ),
    lab: labOf(page),
    closing: closingOf(page),
  };
}

/**
 * A format page. `pathFor` names where each format's page is — the live routes, or the specimen's
 * own path with its `?format=` — so "Show more" and the picker come back to the page they were
 * clicked on.
 */
export function insightsFormatProps(
  page: InsightsPage,
  kind: InsightResourceKind,
  query: Query,
  pathFor: (kind: InsightResourceKind) => string = (k) => FORMAT_ROUTE[k],
): InsightsFormatProps {
  const all = page.resources.items.filter((item) => item.kind === kind);
  /* The first page holds the feature and twelve more; each "Show more" adds twelve. */
  const pages = Math.max(1, Math.ceil(Math.max(0, all.length - 1) / PAGE_SIZE));
  const current = Math.min(
    pages,
    Math.max(1, Number.parseInt(first(query[PAGE_KEY]), 10) || 1),
  );
  const shown = all.slice(0, 1 + current * PAGE_SIZE);
  const path = pathFor(kind);
  const [base = path, own] = path.split('?');
  const more = new URLSearchParams(own);
  more.set(PAGE_KEY, String(current + 1));
  const title = formatTitle(page, kind);

  return {
    breadcrumbs: [
      { label: 'Home', href: ROUTES.home },
      { label: 'Insights', href: ROUTES.insights },
      { label: title, href: FORMAT_ROUTE[kind] },
    ],
    kind: kind as InsightsIndexKind,
    hero: { title, lede: formatLine(page, kind) },
    formats: formatsWithContent(page).map((k) => ({
      label: formatTitle(page, k),
      href: pathFor(k),
      current: k === kind,
    })),
    items: shown.map(toItem),
    pageSize: PAGE_SIZE,
    total: all.length,
    moreHref:
      shown.length < all.length ? `${base}?${more.toString()}#page-${current + 1}` : undefined,
    today: new Date().toISOString(),
    lab: labOf(page),
    closing: closingOf(page),
  };
}
