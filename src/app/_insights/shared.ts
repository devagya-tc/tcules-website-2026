import type { InsightResource, InsightResourceKind, InsightsPage } from '@/content';
import { INSIGHT_FORMAT_LABEL, INSIGHT_FORMAT_ORDER } from '@/lib/insight-formats';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { blogPath } from '@/lib/routes';
import type { BlockCardImage } from '@/patterns';
import type {
  InsightsIndexArchive,
  InsightsIndexFilterGroup,
  InsightsIndexFilterOption,
  InsightsIndexItem,
  InsightsIndexKind,
} from '@/templates';

/**
 * What the insights hub (`hub.ts`) and each format's page (`format.tsx`) map the same way: an
 * insight onto the template's item, the family's format row, the stand-in pool, and the archive's
 * URL-held filters. `_insights` is underscore-prefixed, so Next does not route it.
 *
 * The URL is the state: `?<group>=<option>` per group, both slugs of their CMS names (one option per
 * group), `?page=<n>` for "Show more". A held option's own link clears its group, which is what makes
 * its `close-circle` a control (Tag's spec). Every link ends in the archive's fragment, so a filter lands the reader on
 * the archive rather than the top.
 */

export type Query = Record<string, string | string[] | undefined>;

/**
 * Stand-in covers for insights that have none yet (visual-direction § 5.7): catalogue photographs of
 * the work itself — whiteboards, sketches, sticky walls — with no legible screen, at masters large
 * enough for a lead. Never labelled; replaced when the real cover exists.
 *
 * Assigned HERE, in data, the way a drawn `coverScene` is — never by the template in render order
 * (critique 16 Oct 2026: a round-robin in call order gave one article a different photograph on the
 * hub than on its format page, and cycled the small pool so one photograph showed twice a screen).
 * Each photograph goes to ONE insight: the newest coverless insights of the covered kinds, over the
 * whole family, so the assignment depends on the corpus and not on which page renders it. Once the
 * pool is used up the rest get no photograph and the template falls back to a texture field.
 */
const STAND_INS: readonly PhotoId[] = [
  'whiteboard-two-hands',
  'hand-sketch-wireframe',
  'workshop-sticky-sort',
  'desk-sketch-flatlay',
  'workshop-hands-writing',
  'pair-testing-overhead',
];

/** The kinds whose cards lead with a picture, and so can carry a stand-in. */
const STAND_IN_KINDS: ReadonlySet<InsightResourceKind> = new Set([
  'article',
  'video',
  'podcast',
  'guide',
]);

export type StandIns = ReadonlyMap<string, BlockCardImage>;

/** Which insight carries which stand-in photograph, one photograph per insight, over the family. */
export function standInsFor(page: InsightsPage): StandIns {
  const map = new Map<string, BlockCardImage>();
  const needing = page.resources.items.filter(
    (item) => STAND_IN_KINDS.has(item.kind) && !item.image?.src && !item.coverScene,
  );
  needing.slice(0, STAND_INS.length).forEach((item, index) => {
    map.set(item.documentId, getKitPhoto(STAND_INS[index]!, { standIn: true }));
  });
  return map;
}

const PAGE_KEY = 'page';
/** Query keys a topic group may not take: the page's own, and the specimen's state. */
const RESERVED_KEYS: ReadonlySet<string> = new Set([PAGE_KEY, 'state']);

/** A readable URL word from a CMS label: "SaaS & fintech" → "saas-fintech". */
const slugOf = (label: string) =>
  label
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** `base`, or `base-2`, `base-3` … — the first not yet in `taken`, which it then joins. */
function unique(base: string, taken: Set<string>) {
  let name = base;
  for (let n = 2; taken.has(name) || name === ''; n += 1) name = `${base || 'topic'}-${n}`;
  taken.add(name);
  return name;
}
/** The archive's page: twelve items, then "Show more". */
export const PAGE_SIZE = 12;
/** From how many items an archive offers filters (more than one screen of tiles). */
const FILTER_FROM = 6;

/** The kinds in the family's order, for the format row: the one list, in lib. */
export const KINDS = INSIGHT_FORMAT_ORDER;

/** A format's plural name: the one label, in lib. */
export const FORMAT_NAME: Record<InsightResourceKind, string> = Object.fromEntries(
  INSIGHT_FORMAT_ORDER.map((kind) => [kind, INSIGHT_FORMAT_LABEL[kind].many]),
) as Record<InsightResourceKind, string>;

export const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? (value[0] ?? '') : (value ?? '');

/**
 * `path` may carry a query of its own (the specimen's `?state=`), which every link keeps. `params` is
 * key → value, already in the URL's words (a group's slug → an option's slug).
 */
export function hrefFor(
  path: string,
  fragment: string,
  params: ReadonlyMap<string, string>,
  page = 1,
) {
  const [base = path, own] = path.split('?');
  const query = new URLSearchParams(own);
  [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([key, value]) => query.set(key, value));
  if (page > 1) query.set(PAGE_KEY, String(page));
  const search = query.toString();
  return `${base}${search ? `?${search}` : ''}#${fragment}`;
}

export function toItem(resource: InsightResource, standIns?: StandIns): InsightsIndexItem {
  const image = resource.image;
  const standIn = standIns?.get(resource.documentId);
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
    ...(standIn ? { standIn } : {}),
  };
}

/** The kinds the page holds items of, in the family's order. */
export const kindsIn = (page: InsightsPage) =>
  KINDS.filter((kind) => page.resources.items.some((item) => item.kind === kind));

/** A format's title: the CMS's format card, else the family's name for it. */
export const formatTitle = (page: InsightsPage, kind: InsightResourceKind) =>
  page.formatCards.find((card) => card.kind === kind)?.title?.trim() || FORMAT_NAME[kind];

/** A format's one sentence, from the CMS's format card. */
export const formatLead = (page: InsightsPage, kind: InsightResourceKind) =>
  page.formatCards.find((card) => card.kind === kind)?.description;

/** Where "All" and each format link: the live routes, or the specimen's own states. */
export type FormatHref = (kind: InsightResourceKind | 'all') => string;

/**
 * The family's format row: "All" first, then each format with content and its count, each a link to
 * its page, `current` selected ("All" on the hub). Fewer than two formats: no row.
 */
export function formatRow(
  page: InsightsPage,
  current: InsightResourceKind | 'all',
  hrefOf: FormatHref,
): InsightsIndexFilterOption[] {
  const kinds = kindsIn(page);
  if (kinds.length < 2) return [];
  const items = page.resources.items;
  return [
    {
      id: 'all',
      label: 'All',
      count: items.length,
      href: hrefOf('all'),
      selected: current === 'all',
    },
    ...kinds.map((kind) => ({
      id: kind,
      label: FORMAT_NAME[kind],
      count: items.filter((item) => item.kind === kind).length,
      href: hrefOf(kind),
      selected: current === kind,
    })),
  ];
}

/**
 * The archive over `resources`: the CMS's topic groups read from the URL, the matches, the page, and
 * every link — each option's count is against the other held filters, so it says what choosing it
 * would show; only options with results are offered, and a group with one option or none is
 * dropped (owner, 13 Oct 2026). A held option always stays, so it can be cleared.
 *
 * The first group is the primary line, "All" first; the rest go behind "More filters". The format
 * is not a group: the page is the format.
 */
export function archiveOf(
  page: InsightsPage,
  resources: readonly InsightResource[],
  query: Query,
  path: string,
  fields: {
    id: string;
    heading: string;
    noun: string;
    /** The item the page shows above the archive (the latest), left out while nothing is held. */
    exclude?: string;
    /** Which insight carries which stand-in photograph (`standInsFor`). */
    standIns?: StandIns;
  },
): InsightsIndexArchive {
  /* A short archive is read whole: filtering six items is noise, so it takes no filters at all. */
  /* The URL speaks in words, not CMS ids (critique 16 Oct 2026): a group's key is its label's slug
     and an option's value its name's slug — `?industry=saas`, a link a reader can read. Matching
     still runs on the ids; the slugs are only how the state is written down. */
  const keys = new Set(RESERVED_KEYS);
  const groups = (resources.length > FILTER_FROM ? page.resources.filters : [])
    .filter((group) => group.options.length > 0)
    .map((group) => {
      const values = new Set<string>();
      return {
        id: group.id,
        key: unique(slugOf(group.label), keys),
        label: group.label,
        options: group.options.map((option) => ({
          id: option.id,
          slug: unique(slugOf(option.name), values),
          label: option.name,
        })),
      };
    });

  const selected = new Map<string, string>();
  for (const group of groups) {
    const wanted = first(query[group.key]);
    const option = group.options.find((candidate) => candidate.slug === wanted);
    if (option) selected.set(group.id, option.id);
  }
  /* The held state in the URL's words. */
  const paramsOf = (held: ReadonlyMap<string, string>) =>
    new Map(
      groups.flatMap((group) => {
        const option = group.options.find((candidate) => candidate.id === held.get(group.id));
        return option ? [[group.key, option.slug] as const] : [];
      }),
    );

  const passesExcept = (item: InsightResource, except?: string) =>
    [...selected.entries()].every(
      ([group, option]) => group === except || item.filterIds.includes(option),
    );
  /* The latest stands above the archive only while nothing is held; a filtered archive is complete. */
  const excluding = selected.size === 0 && fields.exclude !== undefined;
  const matches = resources.filter(
    (item) => passesExcept(item) && !(excluding && item.documentId === fields.exclude),
  );
  const pages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const current = Math.min(
    pages,
    Math.max(1, Number.parseInt(first(query[PAGE_KEY]), 10) || 1),
  );
  const visible = matches.slice(0, current * PAGE_SIZE);

  const toggle = (group: string, option: string | undefined) => {
    const next = new Map(selected);
    if (option === undefined || selected.get(group) === option) next.delete(group);
    else next.set(group, option);
    return hrefFor(path, fields.id, paramsOf(next));
  };

  const built: InsightsIndexFilterGroup[] = groups
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

  const [lead, ...rest] = built;
  const primary: InsightsIndexFilterOption[] = lead
    ? [
        {
          id: 'all',
          label: 'All',
          count: resources.filter((item) => passesExcept(item, lead.id)).length,
          href: toggle(lead.id, undefined),
          selected: !selected.has(lead.id),
        },
        ...lead.options,
      ]
    : [];

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

  return {
    id: fields.id,
    heading: fields.heading,
    noun: fields.noun,
    items: visible.map((item) => toItem(item, fields.standIns)),
    total: matches.length,
    all: resources.length,
    above: excluding ? 1 : 0,
    primary,
    filters: rest,
    held,
    clearHref: selected.size > 0 ? hrefFor(path, fields.id, new Map()) : undefined,
    moreHref:
      current < pages ? hrefFor(path, fields.id, paramsOf(selected), current + 1) : undefined,
  };
}
