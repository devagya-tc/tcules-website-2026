import type { ReactNode } from 'react';

import { Button, Chip, Cluster, Icon, Input, Layout, Tag } from '@/components';
import { Accordion } from '@/patterns';

import styles from './ListingIndex.module.css';
import type { ListingFinder, ListingSection, ListingView } from './ListingIndex';
import { FinderMore } from './Finder';
import {
  byEventDate,
  CardGrid,
  Dates,
  Feature,
  followCount,
  leadFirst,
  LABEL,
  partition,
  type InsightItem,
  type InsightKind,
} from './compositions';

/* ── The insights family, as ListingIndex data ─────────────────────────────────────
   What the insights hub puts in the listing: its curated VIEW (`insightViews`) and its FINDER
   (`insightFinder`), built here and handed to ListingIndex, which places them as it places every
   listing's — so the hub and the case-study index share one opening, one rail and one close. */

/** What the page says about one format: its section title and its own page. */
export type InsightFormat = {
  kind: InsightKind;
  title?: string;
  /** Where the section's "See more" goes: the finder with this type picked. */
  href?: string;
};

/** BY TYPE, in page order: events second, so the dated rows break the run of leads. */
const TYPE_ORDER: readonly InsightKind[] = [
  'article',
  'event',
  'video',
  'guide',
  'podcast',
  'research',
  'interview',
];

const typeAnchor = (kind: InsightKind) => `type-${kind}`;

/**
 * The insights hub's curated view, BY TYPE (owner, 16 Oct 2026; the idea of claude.com/resources): a
 * section per format, its lead as the horizontal card, its pictured cards in rows of three under it;
 * events dated. Every section's head carries the same "See more" (owner, 23 Oct 2026), which opens
 * the finder with that type picked. BY TOPIC went with the switch (owner, 28 Oct 2026): the finder's
 * Topic group finds a topic's pieces.
 */
export function insightViews({
  items,
  formats = [],
}: {
  /** Every resource, newest first. */
  items: readonly InsightItem[];
  formats?: readonly InsightFormat[];
}): ListingView[] {
  const byType = TYPE_ORDER.flatMap((kind) => {
    const all = items.filter((item) => item.kind === kind);
    if (all.length === 0) return [];
    const format = formats.find((candidate) => candidate.kind === kind);
    return [
      {
        kind,
        title: format?.title?.trim() || LABEL[kind].many,
        href: format?.href,
        items: all,
      },
    ];
  });
  const typeSections: ListingSection[] = byType.map((section) => ({
    id: typeAnchor(section.kind),
    heading: section.title,
    count: section.items.length,
    link: section.href ? { href: section.href } : undefined,
    content: <TypeShape kind={section.kind} items={section.items} />,
  }));
  return [{ id: 'type', label: 'By type', sections: typeSections }];
}

/* ── A group: its lead, then its cards ──────────────────────────────────────────── */

/** A hub section's pieces: the lead and the cards under it. */
type Group = { lead?: InsightItem; cards: InsightItem[] };

/**
 * A group from a set of pieces, in the order they should be shown (owner, 23 Oct 2026). The best
 * pictured piece leads; under it, the pictured pieces in rows of three (six where there are six),
 * or two in two of three tracks. Pieces without a picture are found in the finder's results.
 */
function groupOf(items: readonly InsightItem[]): Group {
  const { pictured } = partition(items);
  const [lead, ...others] = leadFirst(pictured);
  if (!lead) return { cards: [] };
  const cards =
    others.length >= 3
      ? others.slice(0, followCount(others.length))
      : others.length === 2
        ? others
        : [];
  return { lead, cards };
}

/* ── BY TYPE · the pieces each format shows ─────────────────────────────────────── */

/** How many events the hub's dated rows hold. */
const EVENT_TAKE = 3;


function TypeShape({
  kind,
  items,
}: {
  kind: InsightKind;
  items: readonly InsightItem[];
}): ReactNode {
  /* Events keep their dates: the day as a numeral at each row's start, the h4 title beside it. */
  if (kind === 'event') {
    return <Dates items={byEventDate(items).slice(0, EVENT_TAKE)} size="lg" />;
  }
  const group = groupOf(items);
  return <Feature lead={group.lead} cards={group.cards} />;
}

/* ── The finder: every insight, found from the rail ─────────────────────────────────
   Jatin, 26 Oct 2026, after myntra.com's list pages: "there is a permanent location for some main
   filters … whatever you are selecting, it keeps on adding here … and you can easily remove it".
   Owner, 28 Oct 2026: the rail's switch and "Jump to" give way to the groups — Type, Topic, Stage,
   Industry — each a disclosure (the FAQ's, at the rail's scale), Type open; the hub stays curated
   until something is picked; a pick adds a chip over the results, which are one grid of cards. */

/** One option in a group: the value it puts in the URL, its label, and whether it is picked. */
export type FinderOption = { value: string; label: string; picked: boolean };

/** One group of options: its URL parameter ("topic"), its label, its options. */
export type FinderGroup = { name: string; label: string; options: readonly FinderOption[] };

/** One pick, as its chip: the label and the page without it. */
export type FinderPick = { label: string; removeHref: string };

/**
 * The finder's three parts for ListingIndex, from the groups the route read out of the URL and the
 * pieces the picks let through.
 */
export function insightFinder({
  action,
  query,
  search,
  groups,
  picks,
  clearHref,
  items,
  shown,
  moreHref,
}: {
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
  /** Every piece the picks let through, newest first. */
  items: readonly InsightItem[];
  /** How many of them the reader has opened. */
  shown: number;
  /** The next page's URL, while more exist. */
  moreHref?: string;
}): ListingFinder {
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

  const total = items.length;
  return {
    action,
    query,
    controls,
    label,
    picks: (
      /* "Showing results for", then each pick as a held filter chip with its close, then the way
         back to the curated page. */
      <Layout columns={{ base: 1, md: ['auto', 1] }} colGap="text" rowGap="tight" align="center">
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
          <CardGrid
            cards={items.slice(0, shown)}
            meta={{ withKind: true }}
            titleAs="h2"
            facts
          />
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
