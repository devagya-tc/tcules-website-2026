import type { ReactNode } from 'react';

import { Button, Chip, Cluster, Icon, Input, Layout, Tag } from '@/components';
import { Accordion } from '@/patterns';

import { FinderMore } from './Finder';
import type { ListingFinder } from './ListingIndex';
import styles from './ListingIndex.module.css';

/* ── The listing's finder ─────────────────────────────────────────────────────────
   Jatin, 26 Oct 2026, after myntra.com's list pages: "there is a permanent location for some main
   filters … whatever you are selecting, it keeps on adding here … and you can easily remove it".
   Owner, 28 Oct 2026: the rail's switch and "Jump to" give way to the groups, each a disclosure (the
   FAQ's, at the rail's scale), the first open; the listing stays curated until something is picked;
   a pick adds a chip over the results, which are one grid of cards. Owner, 29 Oct 2026: /case-studies
   is the same finder (decisions/2026-10-29-case-index-takes-the-finder) — so the controls, the picks and
   the paging are built here once, and a listing hands in only its results. */

/** One option in a group: the value it puts in the URL, its label, and whether it is picked. */
export type FinderOption = { value: string; label: string; picked: boolean };

/** One group of options: its URL parameter ("topic"), its label, its options. */
export type FinderGroup = { name: string; label: string; options: readonly FinderOption[] };

/** One pick, as its chip: the label and the page without it. */
export type FinderPick = { label: string; removeHref: string };

/** What every listing's finder is built from. */
export type FinderArgs = {
  /** The page's own path. */
  action: string;
  /** The query in effect, as a string. */
  query: string;
  /** The search in effect and its label ("Search insights"). */
  search: { value?: string; label: string };
  groups: readonly FinderGroup[];
  /** Every pick in effect, the search's included, in rail order. Empty: the curated view. */
  picks: readonly FinderPick[];
  /** The page with nothing picked. */
  clearHref: string;
  /** How many items the picks let through. */
  total: number;
  /** The results' grid: the first `shown` of them, composed by the listing. */
  results: ReactNode;
  /** How many of them the reader has opened. */
  shown: number;
  /** The next page's URL, while more exist. */
  moreHref?: string;
};

/**
 * The finder's three parts for ListingIndex, from the groups the route read out of the URL and the
 * listing's results.
 */
export function listingFinder({
  action,
  query,
  search,
  groups,
  picks,
  clearHref,
  total,
  results,
  shown,
  moreHref,
}: FinderArgs): ListingFinder {
  const controls = (
    <Layout rowGap="block">
      <Input
        type="search"
        name="q"
        defaultValue={search.value}
        placeholder={search.label}
        aria-label={search.label}
        enterKeyHint="search"
      />
      <Accordion
        size="sm"
        items={groups.map((group, index) => ({
          question: group.label,
          /* Type open; another group opens only when it holds a pick. */
          open: index === 0 || group.options.some((option) => option.picked),
          content: (
            <fieldset className={styles.options}>
              <legend className={styles.hidden}>{group.label}</legend>
              <Layout rowGap="text">
                {group.options.map((option) => (
                  <Chip
                    key={option.value}
                    look="index"
                    type="checkbox"
                    name={group.name}
                    value={option.value}
                    defaultChecked={option.picked}
                    tick={<Icon name="chrome-check" />}
                  >
                    {option.label}
                  </Chip>
                ))}
              </Layout>
            </fieldset>
          ),
        }))}
      />
    </Layout>
  );

  const count = picks.length;
  const label = count > 0 ? `Filters · ${count}` : 'Filters';
  if (count === 0) return { action, query, controls, label };

  return {
    action,
    query,
    controls,
    label,
    picks: (
      /* "Showing results for", then each pick as a held filter chip with its close, then the way
         back to the curated page. */
      <Layout
        columns={{ base: 1, md: ['auto', 1] }}
        colGap="text"
        rowGap="tight"
        align="center"
      >
        <p className={styles.count} role="status">
          {total === 0
            ? 'Nothing matches'
            : `${total} ${total === 1 ? 'result' : 'results'} for`}
        </p>
        {/* The chips at the tight step, and the way back to the curated page a text step clear of
            them (owner, 28 Oct 2026: "8px is too tight"): grouping, not a gap knob. */}
        <Cluster colGap="text" rowGap="tight" align="center">
          <Cluster as="ul" colGap="tight" rowGap="tight" align="center">
            {picks.map((pick) => (
              <li key={pick.removeHref}>
                <Tag
                  variant="filter"
                  href={pick.removeHref}
                  selected
                  icon={<Icon name="chrome-close" label="Remove" />}
                >
                  {pick.label}
                </Tag>
              </li>
            ))}
          </Cluster>
          <span className={styles.clear}>
            <Button as="a" href={clearHref} emphasis="link" tone="primary">
              Clear all
            </Button>
          </span>
        </Cluster>
      </Layout>
    ),
    results:
      total === 0 ? null : (
        <Layout rowGap="column">
          {results}
          {moreHref ? (
            <Cluster colGap="block" rowGap="text" align="center">
              <p className={styles.count}>{`${Math.min(shown, total)} of ${total}`}</p>
              <FinderMore href={moreHref} icon={<Icon name="alt-arrow-down" />}>
                Show more
              </FinderMore>
            </Cluster>
          ) : null}
        </Layout>
      ),
  };
}
