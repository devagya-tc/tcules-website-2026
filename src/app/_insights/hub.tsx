import type { InsightResource, InsightResourceKind, InsightsPage } from '@/content';
import type { CorpusBand, CorpusBlock, CorpusPage } from '@/lib/corpus-types';
import { inlineToHtml, inlineToText, type InlineRun } from '@/lib/inline';
import { blogPath, ENDPOINTS, FORMAT_PAGE_REDIRECTS, ROUTES } from '@/lib/routes';
import { Media } from '@/components';
import { DataTable, EnquiryForm } from '@/patterns';
import {
  CorpusBandView,
  ENQUIRY_SKETCH_TO_SHIPPED,
  ENQUIRY_DRESS,
  insightFinder,
  insightViews,
  shelfSections,
  type InsightItem,
  type InsightKind,
  type InsightShelf,
  type ListingClosing,
  type ListingIndexProps,
  type ListingView,
} from '@/templates';

import { isCorpusLongform } from '../_corpus/longform';

/**
 * The insights hub's composition: the view model mapped onto the listing template (ListingIndex) —
 * the curated view, and the finder the URL drives. Shared by the live route and its specimen
 * (`/design/listing-index`), so they cannot drift.
 *
 * The URL is the state (owner, 28 Oct 2026): `?type=articles&topic=design-systems` picks, `?q=` the
 * search, `?page=<n>` how far down the results the reader has asked to see. With no pick, the
 * curated view.
 */

type Query = Record<string, string | string[] | undefined>;

const PAGE_KEY = 'page';
/** The finder's search. */
const SEARCH_KEY = 'q';
/** The results' page: twelve cards, then "Show more". */
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

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
/** Every value of a repeated query parameter (`?topic=a&topic=b`). */
const valuesOf = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value : value ? [value] : [])
    .map((entry) => entry.trim())
    .filter(Boolean);

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
function closingOf(
  page: InsightsPage,
  origin: string,
  placement: string,
  /** The 26 Oct copy's close (`talk`), which wins over the CMS's and the stand-in. */
  authored?: { id?: string; heading: string; body?: string },
): ListingClosing {
  const copy = authored
    ? { ...authored, action: CLOSE_STAND_IN.action }
    : page.closing?.action
      ? {
          heading: page.closing.heading,
          body: page.closing.description,
          action: { label: page.closing.action.label, href: page.closing.action.href },
        }
      : CLOSE_STAND_IN;
  return {
    ...copy,
    /* The island close, as home has it: the halves, the sketch-to-shipped drawing over the words, the
       moving field across the island, the form in its card dress (owner, 28 Oct 2026). */
    island: { surface: 'blue', art: <Media image={ENQUIRY_SKETCH_TO_SHIPPED} sizes="300px" /> },
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
/** A filter group's place in the panel: the topic first, the industry last. */
const rank = (label: string) => (/topic/i.test(label) ? 0 : /industry/i.test(label) ? 2 : 1);

/** A readable URL value from a name: "Modernise & Replatform" → "modernise-replatform". */
const slugOf = (name: string) =>
  name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const topicName = (name: string) => name.replace(/\s*→\s*/g, ' to ').trim();

/** The finder's format group: each format's plural name in the URL (`?type=articles`). */
const TYPE_KEY = 'type';
const typeValue = (kind: InsightResourceKind) => slugOf(FORMAT_NAME[kind]);

/** The CMS's "Product" group holds a product's STAGE (0 to 1, growth, modernise): named for that. */
const groupName = (label: string) => (/^product$/i.test(label.trim()) ? 'Stage' : label);

type FilterOptionOf = { id: string; value: string; label: string };
type FilterGroupOf = { name: string; label: string; options: FilterOptionOf[] };

/**
 * The CMS's filter groups with pieces among `pool`, each a URL parameter named for the group
 * ("topic", "stage", "industry") whose values are its options' names as slugs — never the CMS's
 * record ids. What a piece is about first, the reader's own sector last.
 */
function filterGroupsOf(page: InsightsPage, pool: readonly InsightResource[]): FilterGroupOf[] {
  return page.resources.filters
    .map((group) => ({
      name: slugOf(groupName(group.label)),
      label: groupName(group.label),
      options: group.options
        .filter((option) => pool.some((item) => item.filterIds.includes(option.id)))
        .map((option) => ({
          id: option.id,
          value: slugOf(topicName(option.name)),
          label: topicName(option.name),
        })),
    }))
    .filter(
      (group) =>
        group.name &&
        group.options.length > 0 &&
        group.name !== SEARCH_KEY &&
        group.name !== PAGE_KEY &&
        group.name !== TYPE_KEY,
    )
    .sort((a, b) => rank(a.label) - rank(b.label));
}

/* ── The 26 Oct 2026 copy (_pages/insights.md) over the CMS ────────────────────────
   The hub's words are the copy's: its opening, its five problem shelves (component-map G8), its
   format table (G9), its FAQ (after the list, C13) and its close (`talk`). The pieces themselves —
   covers, formats, the finder's whole catalogue — stay the CMS's: a piece the copy names is matched
   to its CMS record for its picture and, until the copy's own page is routed, its live address. */

type Labelled = Extract<CorpusBlock, { type: 'labelled' }>;
type Link = Extract<InlineRun, { type: 'link' }>;

const FAQ_ID = 'faq';
const CLOSE_ID = 'talk';

/** The format a copy path names by its segment (`/insights/guides/…` → guide). */
const KIND_BY_SEGMENT: Readonly<Record<string, InsightResourceKind>> = {
  articles: 'article',
  guides: 'guide',
  podcasts: 'podcast',
  events: 'event',
  videos: 'video',
  research: 'research',
  interviews: 'interview',
};

function firstLink(runs: readonly InlineRun[]): Link | undefined {
  for (const run of runs) {
    if (run.type === 'link') return run;
    if ('children' in run) {
      const found = firstLink(run.children);
      if (found) return found;
    }
  }
  return undefined;
}

const lastSegment = (href: string) =>
  href.split(/[?#]/)[0]?.split('/').filter(Boolean).at(-1) ?? '';
const words = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/**
 * The CMS record a copy link names: the same path; else the same last segment (the copy files its
 * pieces under a format segment the CMS does not use), the copy's format first; else a slug one
 * extends ("silent-ui-regression-debt" → "silent-ui-regression-debt-erodes-…"); else, for a link to
 * a whole format ("/insights/events"), the record with the same title.
 */
function recordFor(
  items: readonly InsightItem[],
  href: string,
  title: string,
  kind: InsightResourceKind | undefined,
): InsightItem | undefined {
  const exact = items.find((item) => item.href === href);
  if (exact) return exact;
  const seg = lastSegment(href);
  const same = items.filter((item) => lastSegment(item.href) === seg);
  const bySeg = same.find((item) => item.kind === kind) ?? same[0];
  if (bySeg && !KIND_BY_SEGMENT[seg]) return bySeg;
  const longer = items.find((item) => {
    const other = lastSegment(item.href);
    return (
      seg.length >= 12 && (other.startsWith(seg) || seg.startsWith(other)) && other.length >= 12
    );
  });
  if (longer && !KIND_BY_SEGMENT[seg]) return longer;
  return items.find((item) => words(item.title) === words(title));
}

/** A copy piece ("**[Title](/insights/…).** One line.") as the hub's item, its record's picture kept. */
function pieceOf(block: Labelled, records: readonly InsightItem[]): InsightItem | null {
  const link = firstLink(block.label);
  if (!link?.href.startsWith(ROUTES.insights)) return null;
  const title = inlineToText(link.children).trim().replace(/\.$/, '');
  const segments = link.href.split('/').filter(Boolean);
  const kind = KIND_BY_SEGMENT[segments[1] ?? ''];
  const record = recordFor(records, link.href, title, kind);
  /* The copy's own page once it is routed; until then the live record's, so no card 404s. */
  const href = isCorpusLongform(link.href) || !record ? link.href : record.href;
  return {
    ...(record ?? {}),
    id: link.href,
    kind: (record?.kind ?? kind ?? 'article') as InsightKind,
    title,
    href,
    description: inlineToText(block.body).trim() || undefined,
  };
}

/** A band of the copy's pieces as a shelf: its labelled links, then its closing line. */
function shelfOf(band: CorpusBand, records: readonly InsightItem[]): InsightShelf | null {
  const pieces = band.blocks.flatMap((block) => {
    if (block.type !== 'labelled') return [];
    const piece = pieceOf(block, records);
    return piece ? [piece] : [];
  });
  if (pieces.length === 0) return null;
  /* The line after the pieces ("Our related service: [Design Systems](…)"). The reader-segment
     sentence before them has no slot: a listing head carries no lead (component-map G8, Q8). */
  const lastPiece = band.blocks.reduce(
    (last, block, index) => (block.type === 'labelled' ? index : last),
    -1,
  );
  const note = band.blocks
    .slice(lastPiece + 1)
    .find(
      (block): block is Extract<CorpusBlock, { type: 'paragraph' }> =>
        block.type === 'paragraph',
    );
  return {
    id: band.id,
    heading: band.headingText,
    items: pieces,
    ...(note ? { noteHtml: inlineToHtml(note.runs) } : {}),
  };
}

/**
 * A link in the format table: a retired format page goes straight to the finder with its type
 * picked (where its redirect would take it); the authors index has no route yet (component-map
 * C14), so its name stays, unlinked, until it does.
 */
function formatHref(href: string, base: string): string | null {
  const moved = FORMAT_PAGE_REDIRECTS.find((entry) => entry.from === href);
  if (moved) return moved.to.replace(ROUTES.insights, base);
  if (href === `${ROUTES.insights}/authors`) return null;
  return href;
}

/** The copy's format table as the section's content: every word, the key column linked (C6). */
function formatTable(band: CorpusBand, base: string) {
  const table = band.blocks.find(
    (block): block is Extract<CorpusBlock, { type: 'table' }> => block.type === 'table',
  );
  if (!table) return null;
  const [key = [], ...columns] = table.header;
  return (
    <DataTable
      labelledBy={`${band.id}-heading`}
      keyColumn={{ heading: inlineToText(key) }}
      columns={columns.map((cell) => ({ heading: inlineToText(cell) }))}
      rows={table.rows.map((row) => {
        const cell = row[0] ?? [];
        const name = inlineToText(cell).trim();
        const link = firstLink(cell);
        const href = link ? formatHref(link.href, base) : null;
        return {
          header: name,
          ...(href
            ? { headerHtml: inlineToHtml([{ type: 'link', href, children: link!.children }]) }
            : {}),
          cellsHtml: row.slice(1).map((value) => inlineToHtml(value)),
        };
      })}
    />
  );
}

/** What the copy changes on the hub: its opening, the curated view, its bands and its close. */
function fromCopy(copy: CorpusPage, records: readonly InsightItem[], base: string) {
  const shelves = copy.bands.flatMap((band) => {
    const shelf = shelfOf(band, records);
    return shelf ? [shelf] : [];
  });
  const formatsBand = copy.bands.find(
    (band) =>
      !shelves.some((shelf) => shelf.id === band.id) &&
      band.blocks.some((b) => b.type === 'table'),
  );
  const formats = formatsBand ? formatTable(formatsBand, base) : null;
  const view: ListingView = {
    id: 'problem',
    label: 'By problem',
    sections: [
      ...shelfSections(shelves),
      ...(formatsBand && formats
        ? [{ id: formatsBand.id, heading: formatsBand.headingText, content: formats }]
        : []),
    ],
  };
  const faq = copy.bands.find((band) => band.id === FAQ_ID);
  const close = copy.bands.find((band) => band.id === CLOSE_ID);
  const closeLine = close?.blocks.find((block) => block.type === 'paragraph');
  return {
    hero: {
      title: copy.hero.titleText.trim(),
      eyebrow: copy.hero.eyebrow ? inlineToText(copy.hero.eyebrow) : undefined,
      lede: copy.hero.lede.map((runs) => inlineToText(runs)),
    },
    view,
    faq: faq ? <CorpusBandView page={copy} band={faq} /> : undefined,
    close: close
      ? {
          id: close.id,
          heading: close.headingText,
          body: closeLine?.type === 'paragraph' ? inlineToText(closeLine.runs) : undefined,
        }
      : undefined,
  };
}

export function insightsIndexProps(
  page: InsightsPage,
  query: Query,
  path: string = ROUTES.insights,
  /** The hub's copy (_pages/insights.md). Absent, the CMS's words and the BY TYPE view. */
  copy?: CorpusPage | null,
): ListingIndexProps {
  const subjects = subjectsOf(page);
  const lede = page.hero.description?.trim();
  const all = page.resources.items;

  /* The finder (owner, 28 Oct 2026): Type, then the CMS's groups, each read out of the URL. Type
     lists EVERY format the site routes, in picker order, not only the ones the CMS has filled
     (owner, 29 Oct 2026: "type interviews filter item missing"): each retired format page redirects
     to `?type=<format>` (FORMAT_PAGE_REDIRECTS), so each format must be an option to land on, and a
     format with nothing published yet says so in the finder's empty state rather than vanishing. */
  const groups: FilterGroupOf[] = [
    {
      name: TYPE_KEY,
      label: 'Type',
      options: KINDS.map((kind) => ({
        id: kind,
        value: typeValue(kind),
        label: formatTitle(page, kind),
      })),
    },
    ...filterGroupsOf(page, all),
  ];
  const chosen = groups.map((group) => {
    const values = valuesOf(query[group.name]);
    return {
      ...group,
      picked: group.options.filter((option) => values.includes(option.value)),
    };
  });
  const q = first(query[SEARCH_KEY]).trim();
  const needle = q.toLowerCase();
  /* Any option within a group, every group at once: "design system for SaaS". */
  const filtered = all.filter(
    (item) =>
      chosen.every(
        (group) =>
          group.picked.length === 0 ||
          group.picked.some((option) =>
            group.name === TYPE_KEY
              ? item.kind === option.id
              : item.filterIds.includes(option.id),
          ),
      ) &&
      (!needle || `${item.title} ${item.description ?? ''}`.toLowerCase().includes(needle)),
  );
  const [base = path, own] = path.split('?');
  const pairs = chosen.flatMap((group) =>
    group.picked.map((option) => [group.name, option.value] as const),
  );
  const searchPair = q ? [[SEARCH_KEY, q] as const] : [];
  const hrefWith = (next: readonly (readonly [string, string])[], hash = '') => {
    const params = new URLSearchParams(own);
    for (const [key, value] of next) if (value) params.append(key, value);
    const search = params.toString();
    return `${base}${search ? `?${search}` : ''}${hash}`;
  };
  const current = Math.max(1, Number.parseInt(first(query[PAGE_KEY]), 10) || 1);
  const shown = current * PAGE_SIZE;
  const finder = insightFinder({
    action: base,
    query: new URLSearchParams([...searchPair, ...pairs].map(([k, v]) => [k, v])).toString(),
    search: { value: q || undefined, label: 'Search insights' },
    groups: chosen.map((group) => ({
      name: group.name,
      label: group.label,
      options: group.options.map((option) => ({
        value: option.value,
        label: option.label,
        picked: group.picked.includes(option),
      })),
    })),
    picks: [
      ...(q ? [{ label: `“${q}”`, removeHref: hrefWith(pairs) }] : []),
      ...pairs.map(([name, value]) => ({
        label:
          chosen.find((group) => group.name === name)?.picked.find((o) => o.value === value)
            ?.label ?? value,
        removeHref: hrefWith([
          ...searchPair,
          ...pairs.filter((pair) => !(pair[0] === name && pair[1] === value)),
        ]),
      })),
    ],
    clearHref: hrefWith([]),
    items: filtered.map((item) => toItem(item, subjects)),
    shown,
    moreHref:
      shown < filtered.length
        ? hrefWith([...searchPair, ...pairs, [PAGE_KEY, String(current + 1)]])
        : undefined,
  });

  const records = page.resources.items.map((item) => toItem(item, subjects));
  const authored = copy ? fromCopy(copy, records, base) : undefined;

  return {
    breadcrumbs: [
      { label: 'Home', href: ROUTES.home },
      { label: 'Insights', href: ROUTES.insights },
    ],
    hero: authored?.hero ?? { title: page.hero.heading, lede: lede ? [lede] : undefined },
    label: 'Insights',
    railLabel: 'Browse insights',
    /* The copy's shelves are the hub's curated view (by the problem a reader brings); without the
       copy, BY TYPE. Either way the finder holds every piece. */
    views: authored
      ? [authored.view]
      : insightViews({
          items: records,
          formats: formatsWithContent(page).map((kind) => ({
            kind: kind as InsightKind,
            title: formatTitle(page, kind),
            /* "See more" opens this page with the format picked (owner, 28 Oct 2026). */
            href: `${base}?${TYPE_KEY}=${typeValue(kind)}`,
          })),
        }),
    finder,
    empty: 'Nothing has been published yet.',
    offer: labOf(page),
    /* The FAQ after the list, the close last (component-map C13: the copy's order). */
    bands: authored?.faq ? { afterListing: authored.faq } : undefined,
    closing: closingOf(page, ROUTES.insights, 'insights-hub', authored?.close),
  };
}
