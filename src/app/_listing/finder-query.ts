import type { FinderGroup, FinderPick } from '@/templates';

/**
 * The listing finder's URL, read once for every listing (owner, 22 Oct 2026: the listings share one
 * structure; 29 Oct 2026: /case-studies is the same finder as /insights). The URL is the state:
 * `?<group>=<value>` per pick (repeatable), `?q=` the search, `?page=<n>` how far down the results the
 * reader has asked to see. Any option within a group, every group at once. What differs between two
 * listings is data — the groups, and how an item answers an option — never a branch on which listing.
 *
 * `_listing` is underscore-prefixed, so Next does not route it.
 */

export type Query = Record<string, string | string[] | undefined>;

/** One option: its id in the item's data, its readable URL value, its label. */
export type FinderOptionDef = { id: string; value: string; label: string };

/** One group: its URL parameter, its label, its options. */
export type FinderGroupDef = { name: string; label: string; options: readonly FinderOptionDef[] };

export const SEARCH_KEY = 'q';
export const PAGE_KEY = 'page';
/** The results' page: twelve cards, then "Show more". */
export const PAGE_SIZE = 12;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? (value[0] ?? '') : (value ?? '');

/** Every value of a repeated query parameter (`?topic=a&topic=b`). */
const valuesOf = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value : value ? [value] : [])
    .map((entry) => entry.trim())
    .filter(Boolean);

/** A readable URL value from a name: "Modernise & Replatform" → "modernise-replatform". */
export const slugOf = (name: string) =>
  name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * The finder's state from the URL: the groups with their picks, the search, the items they let
 * through (in the order given), the chips (each with the page without it), and the paging.
 */
export function readFinder<T>({
  path,
  query,
  groups,
  items,
  matches,
  text,
}: {
  /** The page's own path, with any query it always carries (a specimen's `?data=`). */
  path: string;
  query: Query;
  groups: readonly FinderGroupDef[];
  items: readonly T[];
  /** Whether an item answers one option of one group. */
  matches: (item: T, group: string, optionId: string) => boolean;
  /** The words the search looks in. */
  text: (item: T) => string;
}) {
  const chosen = groups.map((group) => {
    const values = valuesOf(query[group.name]);
    return { ...group, picked: group.options.filter((option) => values.includes(option.value)) };
  });
  const q = first(query[SEARCH_KEY]).trim();
  const needle = q.toLowerCase();
  const filtered = items.filter(
    (item) =>
      chosen.every(
        (group) =>
          group.picked.length === 0 ||
          group.picked.some((option) => matches(item, group.name, option.id)),
      ) && (!needle || text(item).toLowerCase().includes(needle)),
  );
  const [base = path, own] = path.split('?');
  const pairs = chosen.flatMap((group) =>
    group.picked.map((option) => [group.name, option.value] as const),
  );
  const searchPair = q ? [[SEARCH_KEY, q] as const] : [];
  const hrefWith = (next: readonly (readonly [string, string])[]) => {
    const params = new URLSearchParams(own);
    for (const [key, value] of next) if (value) params.append(key, value);
    const search = params.toString();
    return `${base}${search ? `?${search}` : ''}`;
  };
  const current = Math.max(1, Number.parseInt(first(query[PAGE_KEY]), 10) || 1);
  const shown = current * PAGE_SIZE;

  const finderGroups: FinderGroup[] = chosen.map((group) => ({
    name: group.name,
    label: group.label,
    options: group.options.map((option) => ({
      value: option.value,
      label: option.label,
      picked: group.picked.includes(option),
    })),
  }));
  const picks: FinderPick[] = [
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
  ];

  return {
    action: base,
    query: new URLSearchParams([...searchPair, ...pairs].map(([k, v]) => [k, v])).toString(),
    search: q || undefined,
    groups: finderGroups,
    picks,
    clearHref: hrefWith([]),
    filtered,
    shown,
    moreHref:
      shown < filtered.length
        ? hrefWith([...searchPair, ...pairs, [PAGE_KEY, String(current + 1)]])
        : undefined,
  };
}
