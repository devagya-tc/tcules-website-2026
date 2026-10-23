import type { InsightResource, InsightResourceKind, InsightsPage } from '@/content';
import { blogPath, ENDPOINTS, ROUTES } from '@/lib/routes';
import { Media } from '@/components';
import { EnquiryForm } from '@/patterns';
import {
  ENQUIRY_DESK,
  ENQUIRY_DRESS,
  insightFormatPage,
  insightViews,
  type InsightItem,
  type InsightKind,
  type ListingClosing,
  type ListingIndexProps,
} from '@/templates';

/**
 * The insights family's composition: the view model mapped onto the listing template
 * (ListingIndex) — the hub's curated views, or a format page's picker and content — and the URL read
 * into the hub's view and a format page's page.
 * Shared by the live routes and their specimen (`/design/listing-index`), so they cannot drift.
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

/**
 * Each piece's SUBJECT: the name of the first topic it is filed under (industry excluded, it is a
 * reader's sector), from the CMS's own filter groups — what its meta line says in a single-format
 * set, where "11 min read" stamped on every row said nothing (beauty round 4).
 */
function subjectsOf(page: InsightsPage): Map<string, string> {
  const names = new Map<string, string>();
  for (const group of page.resources.filters) {
    if (/industry/i.test(group.label)) continue;
    for (const option of group.options) names.set(option.id, topicName(option.name));
  }
  return names;
}

function toItem(resource: InsightResource, subjects?: Map<string, string>): InsightItem {
  const image = resource.image;
  const watched = resource.kind === 'video' || resource.kind === 'podcast';
  const own = image?.src && !image.standIn && !GENERIC_COVER.test(image.src);
  const duration =
    resource.duration ?? (watched ? watchedLength(resource.readingTime) : undefined);
  return {
    id: resource.documentId,
    kind: resource.kind as InsightKind,
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
    ...(() => {
      const subject = resource.filterIds.map((id) => subjects?.get(id)).find(Boolean);
      return subject ? { subject } : {};
    })(),
  };
}

const formatTitle = (page: InsightsPage, kind: InsightResourceKind) =>
  page.formatCards.find((card) => card.kind === kind)?.title?.trim() || FORMAT_NAME[kind];

const formatLine = (page: InsightsPage, kind: InsightResourceKind) =>
  page.formatCards.find((card) => card.kind === kind)?.description?.trim() || FORMAT_LINE[kind];

/** The formats that have something published, in picker order. */
export const formatsWithContent = (page: InsightsPage) =>
  KINDS.filter((kind) => page.resources.items.some((item) => item.kind === kind));

/**
 * The Lab's offer. The templates show it only with its picture, and the CMS holds none yet (the
 * Lab's illustration is to be drawn): the band is held back until then rather than shipped as words
 * alone on tint (beauty round 3, 16 Oct 2026). Strapi recommendation logged: an image on the
 * insights page's `secondSection`.
 */
const labOf = (page: InsightsPage) =>
  page.lab?.action
    ? {
        heading: page.lab.heading,
        body: page.lab.description,
        action: { label: page.lab.action.label, href: page.lab.action.href },
      }
    : undefined;

/**
 * The close: the page's last beat, the ask on paper before the ink footer. The CMS's closing section
 * today is a newsletter prompt with no link ("Level up your UX knowledge" — Strapi's `fourthSection`
 * has no link field), and the footer directly under it already carries that newsletter form, so it
 * would be the same ask twice and an ask with nothing to click. Until the CMS's close carries its own
 * action, the close is the specimen fixture's authored one: the reader's problem, and the way to
 * tell us about it. Strapi recommendation logged: a link on `fourthSection`, which retires this.
 */
const CLOSE_STAND_IN = {
  heading: 'Talk to us',
  body: 'If one of these pieces describes a problem in your own product, tell us about it.',
  action: { label: 'Tell us about it', href: ROUTES.contact },
};

/** The close: the authored ask (or its stand-in) with the enquiry form, sent from `origin`. */
function closingOf(page: InsightsPage, origin: string, placement: string): ListingClosing {
  const copy = page.closing?.action
    ? {
        heading: page.closing.heading,
        body: page.closing.description,
        action: { label: page.closing.action.label, href: page.closing.action.href },
      }
    : CLOSE_STAND_IN;
  return {
    ...copy,
    /* The island close, as home has it: the desk beside the heading, the form in its card dress. */
    island: { surface: 'blue', art: <Media image={ENQUIRY_DESK} sizes="240px" /> },
    form: (
      <EnquiryForm
        variant="enquiry"
        urlLabel="Product or company URL"
        action={ENDPOINTS.enquiry}
        dress={ENQUIRY_DRESS.card}
        fieldScale="md"
        submit="inline"
        context={{
          originRoute: origin,
          placement,
          family: 'insights',
          serviceOrAudit: '',
          referrer: '',
          campaign: '',
        }}
      />
    ),
  };
}

/**
 * A topic's name as a heading sets it. The CMS writes the stage "0 to 1" with an arrow glyph
 * ("0→1") the serif does not carry — it fell back to the sans mid-heading and read as a broken
 * string. Said in words, the same name.
 */
const topicName = (name: string) => name.replace(/\s*→\s*/g, ' to ').trim();

export function insightsIndexProps(page: InsightsPage, query: Query): ListingIndexProps {
  const subjects = subjectsOf(page);
  const lede = page.hero.description?.trim();
  return {
    breadcrumbs: [
      { label: 'Home', href: ROUTES.home },
      { label: 'Insights', href: ROUTES.insights },
    ],
    hero: { title: page.hero.heading, lede: lede ? [lede] : undefined },
    label: 'Insights',
    railLabel: 'Browse insights',
    views: insightViews({
      items: page.resources.items.map((item) => toItem(item, subjects)),
      formats: formatsWithContent(page).map((kind) => ({
        kind: kind as InsightKind,
        title: formatTitle(page, kind),
        href: FORMAT_ROUTE[kind],
        shelfHeading:
          page.formatCards.find((card) => card.kind === kind)?.shelfHeading?.trim() || undefined,
      })),
      /* The topics the BY TOPIC view curates by: every option of the CMS's groups but industry,
         which is a reader's sector rather than a subject. */
      topics: page.resources.filters
        .filter((group) => !/industry/i.test(group.label))
        .flatMap((group) =>
          group.options.map((option) => ({
            id: option.id,
            label: topicName(option.name),
            group: group.label,
          })),
        ),
    }),
    view: first(query[VIEW_KEY]) === 'topic' ? 'topic' : undefined,
    empty: 'Nothing has been published yet.',
    offer: labOf(page),
    closing: closingOf(page, ROUTES.insights, 'insights-hub'),
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
): ListingIndexProps {
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
  const subjects = subjectsOf(page);
  const { record, content } = insightFormatPage({
    kind: kind as InsightKind,
    items: shown.map((item) => toItem(item, subjects)),
    pageSize: PAGE_SIZE,
    total: all.length,
    moreHref:
      shown.length < all.length ? `${base}?${more.toString()}#page-${current + 1}` : undefined,
    today: new Date().toISOString(),
  });

  return {
    breadcrumbs: [
      { label: 'Home', href: ROUTES.home },
      { label: 'Insights', href: ROUTES.insights },
      { label: title, href: FORMAT_ROUTE[kind] },
    ],
    hero: { title, lede: [formatLine(page, kind)], record, titleSize: 'mark' },
    label: title,
    railLabel: 'Insights by type',
    picker: {
      label: 'By type',
      items: formatsWithContent(page).map((k) => ({
        label: formatTitle(page, k),
        href: pathFor(k),
        current: k === kind,
        count: page.resources.items.filter((item) => item.kind === k).length,
      })),
      content,
    },
    empty: 'Nothing has been published here yet.',
    offer: labOf(page),
    closing: closingOf(page, FORMAT_ROUTE[kind], `insights-${FORMAT_NAME[kind].toLowerCase()}`),
  };
}
