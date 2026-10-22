import type { ReactNode } from 'react';

import { Button, Cluster, Icon, Layout } from '@/components';

import styles from './ListingIndex.module.css';
import type { ListingSection, ListingView } from './ListingIndex';
import {
  byEventDate,
  Cinema,
  Dates,
  dateOf,
  datesVary,
  Halves,
  hasPicture,
  hasStandfirst,
  Headlines,
  Index,
  leadFirst,
  LABEL,
  Lead,
  Ledger,
  partition,
  pictureRun,
  Showcase,
  Trio,
  type InsightItem,
  type InsightKind,
  isWatched,
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
  /** The format's page (/insights/articles …), where "All articles" goes. */
  href?: string;
};

/** One topic from the CMS taxonomy the BY TOPIC view curates by, and the group it is filed in. */
export type InsightTopic = { id: string; label: string; group?: string };

/**
 * BY TYPE, in page order, each format in its own composition (beauty round 4, 16 Oct 2026) —
 * articles a LEAD over a TRIO, events DATES, videos a CINEMA, guides an INDEX — so no two neighbours
 * share a silhouette and the view opens on its strongest shape: the lead's picture breaks the fold.
 */
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
 *   BY TYPE   a section per format, each in its own composition — articles a lead over a trio,
 *             events dated, videos a cinema, guides an index — its head carrying "All …"
 *   BY TOPIC  a section per topic, formats mixed, no piece in two sections, each in the composition
 *             its pieces can fill (a cinema where it has a video, an index where it is mostly words,
 *             a lead where it has pictures), no two neighbours alike
 *
 * BY TYPE first, the default. BY TOPIC only where the topics fill a section.
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
  const typeLead = byType[0] ? typeSet(byType[0].kind, byType[0].items)[0] : undefined;
  const byTopic = curateTopics(items, topics, typeLead?.id);

  const typeSections: ListingSection[] = byType.map((section) => ({
    id: typeAnchor(section.kind),
    heading: section.title,
    count: section.items.length,
    link: section.href
      ? {
          label: `All ${section.items.length} ${section.title.toLowerCase()}`,
          href: section.href,
        }
      : undefined,
    content: <TypeShape kind={section.kind} items={section.items} />,
  }));
  const topicSections: ListingSection[] = byTopic.map((section) => ({
    id: topicAnchor(section),
    heading: section.label,
    count: section.size,
    content: <TopicShape items={section.items} shape={section.shape} />,
  }));

  return [
    { id: 'type', label: 'By type', sections: typeSections },
    ...(topicSections.length > 0
      ? [{ id: 'topic', label: 'By topic', sections: topicSections }]
      : []),
  ];
}

/* ── BY TYPE · the pieces each format shows ─────────────────────────────────────── */

/** How many pieces each format's hub composition takes. */
const TYPE_TAKE: Record<InsightKind, number> = {
  article: 6,
  event: 3,
  video: 5,
  podcast: 5,
  guide: 5,
  research: 5,
  interview: 5,
};

/**
 * The pieces a format's hub section shows, in the order its composition places them. Articles: six
 * pictured, skipping the three the format page opens on, so "All articles" opens on a reveal rather
 * than a reprint (all pictured from the newest where there are too few to skip). Events by when they
 * happen. Watched pieces newest first. Guides and the other indexed formats: one pictured, then the
 * typographic ones.
 */
function typeSet(kind: InsightKind, items: readonly InsightItem[]) {
  const { pictured, plain } = partition(items);
  switch (kind) {
    case 'event':
      return byEventDate(items).slice(0, TYPE_TAKE.event);
    case 'video':
    case 'podcast':
      return [...pictured, ...plain].slice(0, TYPE_TAKE[kind]);
    case 'guide':
    case 'research':
    case 'interview':
      return [...pictured.slice(0, 1), ...plain, ...pictured.slice(1)].slice(
        0,
        TYPE_TAKE[kind],
      );
    case 'article':
    default: {
      const skip = pictured.length >= 9 ? 3 : 0;
      const shown = leadFirst(pictured.slice(skip, skip + TYPE_TAKE.article));
      return shown.length >= 3 ? shown : items.slice(0, 3);
    }
  }
}

function TypeShape({
  kind,
  items,
}: {
  kind: InsightKind;
  items: readonly InsightItem[];
}): ReactNode {
  const set = typeSet(kind, items);
  /* The meta line is worded for the pieces SHOWN: the subject leads it (each piece's topic, the
     fact that differs), the dates only where they tell the pieces apart. */
  const meta: MetaOptions = { withSubject: true, withDate: datesVary(set) };
  switch (kind) {
    case 'event':
      return <Dates items={set} size="md" />;
    case 'video':
    case 'podcast':
      return <Cinema items={set} meta={meta} />;
    case 'guide':
    case 'research':
    case 'interview':
      return <Index items={set} meta={meta} />;
    case 'article':
    default: {
      if (!set.every(hasPicture)) return <Ledger items={set} meta={meta} />;
      /* The newest typographic piece is the lead's companion, should its column need one. */
      const companion = partition(items).plain.slice(0, 1);
      return (
        <Layout rowGap="column">
          <Lead items={[...set.slice(0, 3), ...companion]} meta={meta} />
          {set.length >= 6 ? <Trio items={set.slice(3, 6)} meta={meta} /> : null}
        </Layout>
      );
    }
  }
}

/* ── BY TOPIC · curation ──────────────────────────────────────────────────────── */

type TopicShapeName = 'cinema' | 'lead' | 'index' | 'halves' | 'ledger';

/**
 * What a topic's free pieces can fill, best first: a CINEMA where it has a watched piece and two
 * more pictures; an INDEX where it is mostly words; a LEAD where it has three pictures; HALVES where
 * two; else a LEDGER. Each a complete rectangle, so no composition is asked for more than it has.
 */
function shapesFor(free: readonly InsightItem[]): TopicShapeName[] {
  const pictured = free.filter(hasPicture);
  const watched = pictured.some((item) => isWatched(item.kind));
  const plain = free.length - pictured.length;
  const out: TopicShapeName[] = [];
  if (watched && pictured.length >= 3) out.push('cinema');
  if (pictured.length >= 1 && plain >= 3) out.push('index');
  if (pictured.length >= 3) out.push('lead');
  if (pictured.length >= 2) out.push('halves');
  out.push('ledger');
  return out;
}

/** Pieces in an order that shows a topic's range: one of each format before any repeats. */
function byRange(items: readonly InsightItem[]) {
  const seen = new Set<InsightKind>();
  const first: InsightItem[] = [];
  const later: InsightItem[] = [];
  for (const item of items) {
    if (seen.has(item.kind)) later.push(item);
    else {
      seen.add(item.kind);
      first.push(item);
    }
  }
  return [...first, ...later];
}

/** The pieces a shape takes from a topic's free pieces, in the order the shape places them. */
function fill(
  shape: TopicShapeName,
  free: readonly InsightItem[],
  avoidLead?: string,
): InsightItem[] {
  const pictured = byRange(free.filter(hasPicture));
  const plain = byRange(free.filter((item) => !hasPicture(item)));
  const leadFrom = (pool: InsightItem[]) => {
    const open = pool.filter((item) => item.id !== avoidLead);
    return open.find(hasStandfirst) ?? open[0] ?? pool[0];
  };
  switch (shape) {
    case 'cinema': {
      const lead =
        pictured.find((item) => isWatched(item.kind) && item.id !== avoidLead) ??
        pictured.find((item) => isWatched(item.kind));
      if (!lead) return [];
      return [lead, ...pictured.filter((item) => item !== lead).slice(0, 3)];
    }
    case 'index': {
      const lead = leadFrom(pictured);
      return lead ? [lead, ...plain.slice(0, 4)] : plain.slice(0, 4);
    }
    case 'lead': {
      const lead = leadFrom(pictured);
      /* With a typographic companion, should the lead's column need one (see Lead). */
      return lead
        ? [lead, ...pictured.filter((item) => item !== lead).slice(0, 2), ...plain.slice(0, 1)]
        : [];
    }
    case 'halves':
      return pictured.slice(0, 2);
    case 'ledger':
    default:
      return [...pictured, ...plain].slice(0, 4);
  }
}

/**
 * The topic sections: the largest topics first, each in the best composition its free pieces can
 * fill that differs from the section before it, taking exactly the pieces that composition places —
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
    group?: string;
    size: number;
    shape: TopicShapeName;
    items: InsightItem[];
  }[] = [];
  for (const topic of ordered) {
    const free = members(topic.id).filter((item) => !used.has(item.id));
    if (free.length < TOPIC_FLOOR) continue;
    const previous = sections[sections.length - 1]?.shape;
    const taken = new Set(sections.map((section) => section.shape));
    const options = shapesFor(free).filter((candidate) => candidate !== previous);
    /* A composition not yet used in the view, before one that has been. */
    const shape = options.find((candidate) => !taken.has(candidate)) ?? options[0] ?? 'ledger';
    const picked = fill(shape, free, sections.length === 0 ? avoidLead : undefined);
    if (picked.length < 2) continue;
    picked.forEach((item) => used.add(item.id));
    sections.push({
      id: topic.id,
      label: topic.label,
      group: topic.group,
      size: topic.size,
      shape,
      items: picked,
    });
  }
  return sections;
}

function TopicShape({
  items,
  shape,
}: {
  items: readonly InsightItem[];
  shape: TopicShapeName;
}) {
  /* A topic mixes formats: the format leads each piece's meta line. */
  const meta: MetaOptions = { withKind: true, withDate: datesVary(items) };
  switch (shape) {
    case 'cinema':
      return <Cinema items={items} meta={meta} />;
    case 'index':
      return <Index items={items} meta={meta} />;
    case 'lead':
      return <Lead items={items} meta={meta} />;
    case 'halves':
      return <Halves items={items} meta={meta} />;
    case 'ledger':
    default:
      return <Ledger items={items} meta={meta} />;
  }
}
/* ── Per format: the hub's composition, larger ──────────────────────────────────────
   A format page opens on the composition its format has on the hub, at its largest (beauty round 4,
   16 Oct 2026): a read format on a LEAD (the newest picture at two thirds, the next two beside it —
   a complete rectangle, never a picture beside a void), a watched one on a CINEMA, events on their
   dates. Then the archive, in phrases. */

type FormatShape = 'editorial' | 'screens' | 'dates';

const SHAPE: Record<InsightKind, FormatShape> = {
  article: 'editorial',
  guide: 'editorial',
  research: 'editorial',
  interview: 'editorial',
  video: 'screens',
  podcast: 'screens',
  event: 'dates',
};

/** A run of typographic pieces is cut into phrases of this many, so no list is a wall. */
const LEDGER_RUN = 4;

/**
 * The archive, composed in PHRASES from what the pieces have (beauty round 4) — each phrase a
 * complete rectangle, and no two neighbours alike:
 *
 *   pictured  TRIO (three) and HALVES (two), cut so none is left alone (`pictureRun`)
 *   words     LEDGER (four rows, one per line) and HEADLINES (three across), alternating
 *
 * The two kinds alternate, words first (the page's lead above is pictures). A lone picture joins the
 * typographic pieces in date order, where the ledger shows it as its row's thumbnail; a short run at
 * the end joins the phrase before it, so the page ends on a full phrase.
 */
function editorial(items: readonly InsightItem[], meta: MetaOptions): ReactNode[] {
  const { pictured } = partition(items);
  const runs = pictureRun(pictured.length);
  const inRuns = pictured.slice(
    0,
    runs.reduce((sum, n) => sum + n, 0),
  );
  const words = items.filter((item) => !inRuns.includes(item));

  /* The typographic phrases: fours and threes alternating, a remainder of one or two folded into
     the phrase before it (a ledger, which takes any count). */
  const wordPhrases: { kind: 'ledger' | 'headlines'; items: InsightItem[] }[] = [];
  let at = 0;
  while (at < words.length) {
    const kind = wordPhrases.length % 2 === 0 ? 'ledger' : 'headlines';
    const take = kind === 'ledger' ? LEDGER_RUN : 3;
    const chunk = words.slice(at, at + take);
    at += take;
    /* Headlines are typographic only; a chunk carrying a picture is a ledger. */
    const resolved = kind === 'headlines' && chunk.some(hasPicture) ? 'ledger' : kind;
    const last = wordPhrases[wordPhrases.length - 1];
    if (chunk.length < 3 && last) {
      last.kind = 'ledger';
      last.items.push(...chunk);
    } else {
      wordPhrases.push({ kind: resolved, items: chunk });
    }
  }
  /* Two ledgers side by side in the sequence would read as one long list: a pictured phrase sits
     between them where there is one. */
  const picPhrases = runs.map((n, i) => {
    const start = runs.slice(0, i).reduce((sum, m) => sum + m, 0);
    return inRuns.slice(start, start + n);
  });

  const out: ReactNode[] = [];
  const total = Math.max(wordPhrases.length, picPhrases.length);
  for (let i = 0; i < total; i += 1) {
    const word = wordPhrases[i];
    if (word) {
      out.push(
        word.kind === 'ledger' ? (
          <Ledger key={`w${i}`} items={word.items} meta={meta} titleAs="h2" />
        ) : (
          <Headlines key={`w${i}`} items={word.items} meta={meta} titleAs="h2" />
        ),
      );
    }
    const pic = picPhrases[i];
    if (pic) {
      out.push(
        pic.length === 3 ? (
          <Trio key={`p${i}`} items={pic} meta={meta} titleAs="h2" />
        ) : (
          <Halves key={`p${i}`} items={pic} meta={meta} titleAs="h2" />
        ),
      );
    }
  }
  return out;
}

/** The format page's body below its lead: one page's worth, in the format's own composition. */
function body(shape: FormatShape, items: readonly InsightItem[], meta: MetaOptions): ReactNode {
  if (items.length === 0) return null;
  if (shape === 'screens') {
    /* Screens in twos and threes, every one a picture — opening on two, so the first row under the
       cinema's filmstrip is never a second row of threes. */
    const runs = pictureRun(items.length, 2);
    const out: ReactNode[] = [];
    let start = 0;
    runs.forEach((n, i) => {
      const run = items.slice(start, start + n);
      start += n;
      out.push(
        n === 3 ? (
          <Trio key={i} items={run} meta={meta} titleAs="h2" />
        ) : (
          <Halves key={i} items={run} meta={meta} titleAs="h2" />
        ),
      );
    });
    const rest = items.slice(start);
    if (rest.length > 0) out.push(<Ledger key="rest" items={rest} meta={meta} titleAs="h2" />);
    return <Layout rowGap="column">{out}</Layout>;
  }
  return <Layout rowGap="column">{editorial(items, meta)}</Layout>;
}

/**
 * A format's own page (/insights/articles …; owner, 16 Oct 2026, after
 * claude.com/resources/articles): the hero's RECORD (how many there are and how fresh) and the
 * page's content, beside the rail's picker of formats, at the format's composition at its largest —
 *
 *   read formats  a LEAD (the newest picture at two thirds, the next two beside it), then the
 *                 archive in phrases: trios and halves of pictures between ledgers and headlines
 *   videos        a CINEMA (the newest at the column's width, a filmstrip), then screens
 *   events        the next (or latest) event as a showcase, then dated rows, upcoming above past
 *
 * — with a server-rendered "Show more" and no filters.
 */
export function insightFormatPage({
  kind,
  items,
  pageSize,
  total,
  moreHref,
  today,
}: {
  kind: InsightKind;
  /** Every piece of this format the page shows, newest first: the pages read so far, in order. */
  items: readonly InsightItem[];
  /** How many a page holds (the first page adds the feature). */
  pageSize: number;
  /** How many of this format exist. */
  total: number;
  /** The next page's URL (server-rendered "Show more"). Present while more exist. */
  moreHref?: string;
  /** Now, as ISO 8601: what splits an events page into upcoming and past. The route states it, so the
      template stays pure. */
  today?: string;
}): { record: string[]; content: ReactNode } {
  const shape = SHAPE[kind];
  const meta: MetaOptions = { withSubject: true, withDate: datesVary(items) };
  /* The hero's record: how many there are and how fresh, as ONE mono line under the lede (beauty
     round 4). An events page dates itself by its events, never by when their pages were filed: the
     next one to come, else the last one held — so the line matches the date numerals under it. */
  const now = Date.parse(today ?? '') || 0;
  const eventTimes = items
    .map((item) => Date.parse(item.event?.startsAt ?? ''))
    .filter((time) => !Number.isNaN(time));
  const nextEvent = eventTimes.filter((time) => time >= now).sort((a, b) => a - b)[0];
  const lastEvent = eventTimes.filter((time) => time < now).sort((a, b) => b - a)[0];
  const freshness =
    shape === 'dates'
      ? nextEvent !== undefined
        ? `Next ${dateOf(new Date(nextEvent).toISOString())}`
        : lastEvent !== undefined
          ? `Last held ${dateOf(new Date(lastEvent).toISOString())}`
          : undefined
      : (() => {
          const newest = dateOf(items[0]?.publishedAt);
          return newest ? `Latest ${newest}` : undefined;
        })();
  const record = [`${total} published`, ...(freshness ? [freshness] : [])];

  let content: ReactNode;
  if (items.length === 0) {
    content = <p>Nothing has been published here yet.</p>;
  } else if (shape === 'dates') {
    /* Events: upcoming above past, each a run of dated rows. */
    const dated = byEventDate(items);
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
      </Layout>
    );
  } else {
    /* The lead: the newest pieces with pictures — a read format's LEAD (the newest at two thirds,
       the next two stacked beside it, the rectangle closed), a watched format's CINEMA (the newest
       at the column's width over a filmstrip of the next three). The hub skips these pieces, so
       arriving here is a reveal. */
    const { pictured, plain } = partition(items);
    /* The newest pictured piece leads — unless it has no standfirst and the next pictured one does:
       a lead's words run its picture's height, and the newest stays in the stack beside it. */
    const newest = pictured[0];
    const [first, ...others] =
      shape === 'screens' || !newest || hasStandfirst(newest)
        ? pictured
        : [...leadFirst(pictured.slice(0, 3)), ...pictured.slice(3)];
    /* A read format with too few pictures for a picture stack sets its next three typographic
       pieces beside the lead instead, each with its standfirst, so the stack still runs the lead's
       height. */
    const leadShown: InsightItem[] = !first
      ? []
      : shape === 'screens'
        ? [first, ...others.slice(0, 3)]
        : others.length >= 2
          ? /* With the newest typographic piece as the lead's companion, should its column need
               one (see Lead). */
            [first, ...others.slice(0, 2), ...(hasStandfirst(first) ? [] : plain.slice(0, 1))]
          : [first, ...plain.slice(0, 3)];
    const rest = items.filter((item) => !leadShown.includes(item));
    const pages: InsightItem[][] = [];
    for (let start = 0; start < rest.length; start += pageSize) {
      pages.push(rest.slice(start, start + pageSize));
    }
    const leadMeta = { ...meta, withDate: true };
    content = (
      <Layout rowGap="column">
        {leadShown.length > 0 ? (
          shape === 'screens' ? (
            <Cinema items={leadShown} meta={leadMeta} titleAs="h2" />
          ) : (
            <Lead items={leadShown} meta={leadMeta} titleAs="h2" />
          )
        ) : null}
        {pages.map((page, index) => (
          <div
            key={index}
            id={index > 0 ? `page-${index + 1}` : undefined}
            className={styles.page}
          >
            {body(shape, page, meta)}
          </div>
        ))}
        {moreHref ? (
          /* Where the reader is, then the way on — only while there is more to show. */
          <Cluster colGap="block" rowGap="text" align="center">
            <p className={styles.count}>{`${items.length} of ${total}`}</p>
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
    );
  }

  return { record, content };
}
