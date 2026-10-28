import type { ReactNode } from 'react';

import { Button, Chip, Cluster, Icon, Input, Layout, Tag } from '@/components';
import { Accordion, FilterPanel, type FilterPanelGroup } from '@/patterns';

import styles from './ListingIndex.module.css';
import type { ListingFinder, ListingSection, ListingView } from './ListingIndex';
import {
  byEventDate,
  CardGrid,
  Dates,
  Feature,
  followCount,
  leadFirst,
  LABEL,
  partition,
  Rows,
  Showcase,
  type InsightItem,
  type InsightKind,
  type MetaOptions,
} from './compositions';

/* ── The insights family, as ListingIndex data ─────────────────────────────────────
   What the insights hub and a format page put in the listing's sections. The hub's VIEWS
   (`insightViews`) and a format page's CONTENT (`insightFormatPage`) are built here and handed to
   ListingIndex, which places them as it places every listing's — so the hub, the format pages and
   the case-study index share one opening, one rail, one section head and one close. */

/** What the page says about one format: its section title and its own page. */
export type InsightFormat = {
  kind: InsightKind;
  title?: string;
  /** The format's page (/insights/articles …), where the section's "See more" goes. */
  href?: string;
};

/** One topic from the CMS taxonomy the BY TOPIC view curates by, and the group it is filed in. */
export type InsightTopic = { id: string; label: string; group?: string };

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

/** A topic with fewer pieces than this left to give is not a section. */
const TOPIC_FLOOR = 3;

const typeAnchor = (kind: InsightKind) => `type-${kind}`;
/** A topic's anchor from its label ("Design System" → #topic-design-system): a fragment a reader can
    read and share. The CMS id stands in where a label has no letters or digits. */
const topicAnchor = (topic: { id: string; label: string }) => {
  const slug = topic.label
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `topic-${slug || topic.id}`;
};

/**
 * The insights hub's two views (owner, 16 Oct 2026; the idea of claude.com/resources):
 *
 *   BY TYPE   a section per format: its lead as the horizontal card, its pictured cards in rows
 *             of three under it; events dated
 *   BY TOPIC  a section per topic, formats mixed, no piece in two sections, in the same shape
 *
 * Every section's head carries the same "See more" (owner, 23 Oct 2026). BY TYPE first, the
 * default. BY TOPIC only where the topics fill a section.
 */
export function insightViews({
  items,
  formats = [],
  topics = [],
}: {
  /** Every resource, newest first. */
  items: readonly InsightItem[];
  formats?: readonly InsightFormat[];
  /** The topics, industry excluded (a reader's sector, not a subject). */
  topics?: readonly InsightTopic[];
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
  /* The type view's first lead: the topic view must not open on the same piece, or switching looks
     as if nothing happened. */
  const typeLead = byType[0] ? typeGroup(byType[0].kind, byType[0].items).lead : undefined;
  const byTopic = curateTopics(items, topics, typeLead?.id);

  const typeSections: ListingSection[] = byType.map((section) => ({
    id: typeAnchor(section.kind),
    heading: section.title,
    count: section.items.length,
    link: section.href ? { href: section.href } : undefined,
    content: <TypeShape kind={section.kind} items={section.items} />,
  }));
  const topicSections: ListingSection[] = byTopic.map((section) => ({
    id: topicAnchor(section),
    heading: section.label,
    count: section.size,
    content: (
      <Feature
        lead={section.group.lead}
        cards={section.group.cards}
        meta={{ withKind: true }}
      />
    ),
  }));

  return [
    { id: 'type', label: 'By type', sections: typeSections },
    ...(topicSections.length > 0
      ? [{ id: 'topic', label: 'By topic', sections: topicSections }]
      : []),
  ];
}

/* ── A group: its lead, then its cards ──────────────────────────────────────────── */

/** A hub section's pieces: the lead and the cards under it. */
type Group = { lead?: InsightItem; cards: InsightItem[] };

/**
 * A group from a set of pieces, in the order they should be shown (owner, 23 Oct 2026). The best
 * pictured piece leads; under it, the pictured pieces in rows of three (six where there are six),
 * or two as halves. Pieces without a picture stay on their format page. `avoidLead` keeps a piece
 * from leading (the topic view's first section must not open on the type view's lead).
 */
function groupOf(
  items: readonly InsightItem[],
  { avoidLead }: { avoidLead?: string } = {},
): Group {
  const { pictured } = partition(items);
  const open = pictured.filter((item) => item.id !== avoidLead);
  const [lead, ...others] = leadFirst(open.length > 0 ? open : pictured);
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

/**
 * A format's hub group. Articles skip the
 * three the format page opens on, where there are enough to spare, so "See more" opens on a reveal
 * rather than a reprint.
 */
function typeGroup(kind: InsightKind, items: readonly InsightItem[]): Group {
  if (kind === 'article') {
    const { pictured } = partition(items);
    const skip = pictured.length >= 12 ? 3 : 0;
    return groupOf(items.filter((item) => !pictured.slice(0, skip).includes(item)));
  }
  return groupOf(items);
}

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
  const group = typeGroup(kind, items);
  return <Feature lead={group.lead} cards={group.cards} />;
}

/* ── BY TOPIC · curation ──────────────────────────────────────────────────────── */

/**
 * The topic sections: the largest topics first, each a group of the pieces no earlier section took —
 * never the type view's first lead in the first section. A piece sits in one section only; a topic
 * left with too few is dropped.
 */
function curateTopics(
  items: readonly InsightItem[],
  topics: readonly InsightTopic[],
  avoidLead?: string,
) {
  const members = (id: string) => items.filter((item) => item.topics?.includes(id));
  const ordered = [...topics]
    .map((topic) => ({ ...topic, size: members(topic.id).length }))
    .sort((a, b) => b.size - a.size);
  const used = new Set<string>();
  const sections: {
    id: string;
    label: string;
    group: Group;
    size: number;
  }[] = [];
  for (const topic of ordered) {
    const free = members(topic.id).filter((item) => !used.has(item.id));
    if (free.length < TOPIC_FLOOR) continue;
    const group = groupOf(free, { avoidLead: sections.length === 0 ? avoidLead : undefined });
    const picked = [...(group.lead ? [group.lead] : []), ...group.cards];
    if (picked.length < 2) continue;
    picked.forEach((item) => used.add(item.id));
    sections.push({ id: topic.id, label: topic.label, group, size: topic.size });
  }
  return sections;
}

/* ── Per format: the hub's group, then the archive ──────────────────────────────────
   A format page opens on its format's hub group, drawn from every piece it has (owner, 23 Oct 2026,
   after claude.com/resources/product-announcements): the lead as the horizontal card, then its
   pictured pieces as cards in rows of three. Then the rest, newest first, as ruled rows. Events keep
   their dates. */

type FormatShape = 'cards' | 'dates';

const SHAPE: Record<InsightKind, FormatShape> = {
  article: 'cards',
  guide: 'cards',
  research: 'cards',
  interview: 'cards',
  video: 'cards',
  podcast: 'cards',
  event: 'dates',
};

/** A page's anchor: where "Show more" lands, on the first piece the new page adds. */
const pageAnchor = (index: number) => (index > 0 ? `page-${index + 1}` : undefined);

/**
 * A format page's filters, built by the route (which owns the URLs): the search form's target and the
 * query it carries forward, and the filter panel's groups — each option's value a readable slug.
 */
export type FormatFilters = {
  search: {
    /** The form's action: the page's own path. */
    action: string;
    /** The query the search keeps (the filters in effect, a specimen's own parameters). */
    params: readonly (readonly [string, string])[];
    /** The search in effect. */
    value?: string;
    /** The field's name for a reader ("Search guides"). */
    label: string;
  };
  panel: {
    groups: readonly FilterPanelGroup[];
    /** The query the panel keeps (the search in effect). */
    params: readonly (readonly [string, string])[];
    /** The page with no filter in effect, the search kept. */
    resetHref: string;
  };
  /** A search or a filter is in effect. */
  active: boolean;
  /** The page with neither. */
  clearHref: string;
};

/** The search field and, at the row's end, the filters (owner, 23 Oct 2026, after claude.com). */
function FilterBar({ filters }: { filters: FormatFilters }) {
  const { search, panel } = filters;
  return (
    <Layout columns={{ base: [1, 'auto'], md: [1, 1] }} colGap="block" align="center">
      <form role="search" action={search.action} method="get">
        {search.params.map(([key, value]) => (
          <input key={`${key}=${value}`} type="hidden" name={key} value={value} />
        ))}
        <Input
          type="search"
          name="q"
          defaultValue={search.value}
          placeholder={search.label}
          aria-label={search.label}
          enterKeyHint="search"
        />
      </form>
      <Cluster justify="end">
        <FilterPanel
          id="format-filters"
          action={search.action}
          params={panel.params}
          groups={panel.groups}
          resetHref={panel.resetHref}
        />
      </Cluster>
    </Layout>
  );
}

/**
 * A format's own page (/insights/articles …; owner, 16 Oct 2026, after
 * claude.com/resources/articles): the hero's RECORD (how many there are and how fresh) and the
 * page's content, beside the rail's picker of formats, at the format's composition at its largest —
 *
 *   every format  its hub group — the lead as the horizontal card, its pictured pieces as cards in
 *                 rows of three — then the rest as ruled rows, newest first
 *   events        the next (or latest) event as a showcase, then dated rows, upcoming above past
 *
 * — with a search and a filter panel over it, and a server-rendered "Show more". The filters are
 * links and a GET form, so the URL holds them: a filtered page works without script and can be shared.
 */
export function insightFormatPage({
  kind,
  items,
  page,
  pageSize,
  moreHref,
  today,
  filters,
}: {
  kind: InsightKind;
  /** Every piece of this format that the filters let through, newest first. */
  items: readonly InsightItem[];
  /** How many pages the reader has opened, from 1. */
  page: number;
  /** How many a page holds (the first page adds the lead). */
  pageSize: number;
  /** The next page's URL (server-rendered "Show more"). Present while more exist. */
  moreHref?: string;
  /** Now, as ISO 8601: what splits an events page into upcoming and past. The route states it, so the
      template stays pure. */
  today?: string;
  /** The search and the filters over the page (owner, 23 Oct 2026). Absent, none are drawn. */
  filters?: FormatFilters;
}): ReactNode {
  const shape = SHAPE[kind];
  const meta: MetaOptions = {};
  const now = Date.parse(today ?? '') || 0;
  const total = items.length;

  /* The pages read so far: the lead and a page's worth, then a page's worth more per "Show more". */
  const shownCount = 1 + page * pageSize;
  const pageOf = (index: number) => (index === 0 ? 0 : Math.floor((index - 1) / pageSize));
  const more = moreHref ? (
    /* Where the reader is, then the way on — only while there is more to show. */
    <Cluster colGap="block" rowGap="text" align="center">
      <p className={styles.count}>{`${Math.min(shownCount, total)} of ${total}`}</p>
      <Button
        as="a"
        href={moreHref}
        emphasis="link"
        tone="primary"
        icon={<Icon name="alt-arrow-down" />}
      >
        Show more
      </Button>
    </Cluster>
  ) : null;

  let content: ReactNode;
  if (items.length === 0) {
    content = filters?.active ? null : <p>Nothing has been published here yet.</p>;
  } else if (shape === 'dates') {
    /* Events: upcoming above past, each a run of dated rows. */
    const dated = byEventDate(items.slice(0, shownCount));
    const upcoming = dated.filter((item) => Date.parse(item.event?.startsAt ?? '') >= now);
    const past = dated.filter((item) => !upcoming.includes(item));
    /* The newest-to-come (else the latest) is the SHOWCASE — its picture large, its day at the
       largest numeral on the page; the rest are dated rows, the numeral clearly outweighing the
       title. A group's name is a label in the date column's voice, not a heading competing with
       the titles. */
    const [showcase] = [...[...upcoming].reverse(), ...past];
    const groups = [
      {
        id: 'upcoming',
        title: 'Upcoming',
        items: [...upcoming].reverse().filter((item) => item !== showcase),
      },
      { id: 'past', title: 'Past', items: past.filter((item) => item !== showcase) },
    ].filter((group) => group.items.length > 0);
    content = (
      <Layout rowGap="section">
        {showcase ? (
          <section aria-labelledby="events-next">
            <Layout rowGap="block">
              <h2 id="events-next" className={styles.groupTitle}>
                {upcoming.includes(showcase) ? 'Next' : 'Latest'}
              </h2>
              <Showcase items={[showcase]} titleAs="h3" />
            </Layout>
          </section>
        ) : null}
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`events-${group.id}`}>
            <Layout rowGap="block">
              <h2 id={`events-${group.id}`} className={styles.groupTitle}>
                {group.title}
              </h2>
              <Dates items={group.items} titleAs="h3" size="lg" />
            </Layout>
          </section>
        ))}
        {more}
      </Layout>
    );
  } else {
    /* The order the pages run in: the lead, its cards (every pictured piece, in threes), then the
       rest as rows. The hub's lead leads here too, so its group reads as the same group, opened up. */
    const { pictured } = partition(items);
    const [lead, ...others] = leadFirst(pictured);
    const cardCount =
      others.length >= 3 ? others.length - (others.length % 3) : others.length === 2 ? 2 : 0;
    const cards = others.slice(0, cardCount);
    const rows = items.filter((item) => item !== lead && !cards.includes(item));
    const order = [...(lead ? [lead] : []), ...cards, ...rows];
    /* Each page's cards and rows, so "Show more" lands on the first piece it added. A page is a
       multiple of three, so every page's cards fill their rows. */
    const pages: { cards: InsightItem[]; rows: InsightItem[] }[] = [];
    order.slice(0, shownCount).forEach((item, index) => {
      const at = pageOf(index);
      pages[at] ??= { cards: [], rows: [] };
      if (cards.includes(item)) pages[at].cards.push(item);
      else if (item !== lead) pages[at].rows.push(item);
    });
    const shownRows = pages.some((entry) => entry.rows.length > 0);
    const rowList = (
      <Layout rowGap="none">
        {pages.map((entry, index) => (
          <Rows
            key={index}
            /* A page that opened on cards took the anchor there. */
            id={entry.cards.length === 0 ? pageAnchor(index) : undefined}
            items={entry.rows}
            meta={meta}
          />
        ))}
      </Layout>
    );
    content = (
      <Layout rowGap="section">
        {lead ? (
          <Layout rowGap="column">
            <Feature lead={lead} cards={pages[0]?.cards ?? []} titleAs="h2" />
            {pages.slice(1).map((entry, index) => (
              <CardGrid
                key={index}
                id={pageAnchor(index + 1)}
                cards={entry.cards}
                meta={meta}
                titleAs="h2"
              />
            ))}
          </Layout>
        ) : null}
        {shownRows && (lead || !filters?.active) ? (
          <section aria-labelledby="format-more">
            <Layout rowGap="stack">
              <h2 id="format-more" className={styles.sectionTitle}>
                {`${lead ? 'More' : 'All'} ${LABEL[kind].many.toLowerCase()}`}
              </h2>
              {rowList}
            </Layout>
          </section>
        ) : shownRows ? (
          /* A search's results with no lead: the rows under the results line, no heading. */
          rowList
        ) : null}
        {more}
      </Layout>
    );
  }

  if (!filters) return content;
  return (
    <Layout rowGap="stack">
      <FilterBar filters={filters} />
      {filters.active ? (
        <Cluster colGap="block" rowGap="text" align="center">
          <p className={styles.count} role="status">
            {total === 0 ? 'Nothing matches' : `${total} ${total === 1 ? 'result' : 'results'}`}
            {filters.search.value ? ` for “${filters.search.value}”` : ''}
          </p>
          <Button as="a" href={filters.clearHref} emphasis="link" tone="primary">
            Clear
          </Button>
        </Cluster>
      ) : null}
      {total > 0 ? content : null}
    </Layout>
  );
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
         back to the curated page. One wrapping row, the chips at the tight step. */
      <Layout columns={{ base: 1, md: ['auto', 1] }} colGap="text" rowGap="tight" align="center">
        <p className={styles.count} role="status">
          {total === 0
            ? 'Nothing matches'
            : `${total} ${total === 1 ? 'result' : 'results'} for`}
        </p>
        <Cluster as="ul" colGap="tight" rowGap="tight" align="center">
          {picks.map((pick) => (
            <li key={pick.removeHref}>
              <Tag
                variant="filter"
                href={pick.removeHref}
                selected
                icon={<Icon name="close-circle" label="Remove" />}
              >
                {pick.label}
              </Tag>
            </li>
          ))}
          {/* The way back to the curated page, the row's last entry, a step clear of the chips. */}
          <li className={styles.clear}>
            <Button as="a" href={clearHref} emphasis="link" tone="primary">
              Clear all
            </Button>
          </li>
        </Cluster>
      </Layout>
    ),
    results:
      total === 0 ? null : (
        <Layout rowGap="column">
          <CardGrid cards={items.slice(0, shown)} meta={{ withKind: true }} titleAs="h2" />
          {moreHref ? (
            <Cluster colGap="block" rowGap="text" align="center">
              <p className={styles.count}>{`${Math.min(shown, total)} of ${total}`}</p>
              <Button
                as="a"
                href={moreHref}
                emphasis="link"
                tone="primary"
                icon={<Icon name="alt-arrow-down" />}
              >
                Show more
              </Button>
            </Cluster>
          ) : null}
        </Layout>
      ),
  };
}
