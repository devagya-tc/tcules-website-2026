import type { ReactNode } from 'react';

import { Button, Cluster, Icon, Layout } from '@/components';
import {
  CARD_THREE_TRACKS,
  CARD_TWO_TRACKS,
  FULL_COLUMN,
  TEASER_THUMBNAIL,
} from '@/lib/image-sizes';
import type { ArticleSceneName } from '@/lib/sketches';
import {
  Teaser,
  type TeaserImage,
  type TeaserMedia,
  type TeaserProps,
  type TeaserSize,
} from '@/patterns';

import styles from './InsightsIndex.module.css';

/* ── The shapes both insights templates take ─────────────────────────────────────
   A template may not import @/content, so the route maps the view model onto these and the
   template never learns whether the CMS or the specimen's fixture answered. The hub
   (InsightsIndex) and a format page (InsightsFormat) are one family and share them — the same
   compositions, the hub's smaller, a format page's larger. */

/** The seven formats. The templates decide each one's shape and position from this. */
export type InsightsIndexKind =
  'article' | 'guide' | 'research' | 'podcast' | 'video' | 'event' | 'interview';

export type InsightsIndexItem = {
  id: string;
  kind: InsightsIndexKind;
  title: string;
  href: string;
  /** The standfirst. Absent or blank renders the title alone. */
  description?: string;
  /** The item's own cover. Absent, the item is typographic: never a stand-in. */
  cover?: TeaserImage;
  /** ISO 8601. The route passes items newest first; this is shown, not sorted on. */
  publishedAt?: string;
  /** "11 min read". */
  readingTime?: string;
  /** "48 min". */
  duration?: string;
  /** When and where an event happens. `startsAt` is ISO 8601. */
  event?: { startsAt: string; place?: string };
  /** The scene DRAWN for this article from its own argument: its own picture until a cover exists. */
  scene?: ArticleSceneName;
  /** The CMS topics it is filed under (option ids): what the hub's BY TOPIC view curates by. */
  topics?: readonly string[];
};

export const LABEL: Record<InsightsIndexKind, { one: string; many: string }> = {
  article: { one: 'Article', many: 'Articles' },
  guide: { one: 'Guide', many: 'Guides' },
  research: { one: 'Research', many: 'Research' },
  podcast: { one: 'Podcast', many: 'Podcasts' },
  video: { one: 'Video', many: 'Videos' },
  event: { one: 'Event', many: 'Events' },
  interview: { one: 'Interview', many: 'Interviews' },
};

const DAY = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});
const DAY_OF_MONTH = new Intl.DateTimeFormat('en-GB', { day: 'numeric', timeZone: 'UTC' });
const MONTH_YEAR = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

function parse(iso: string | undefined): Date | undefined {
  if (!iso) return undefined;
  const date = new Date(iso);
  return Number.isNaN(date.valueOf()) ? undefined : date;
}

export const dateOf = (iso: string | undefined) => {
  const date = parse(iso);
  return date ? DAY.format(date) : undefined;
};

/** A label line's parts, blanks dropped — Teaser joins them with " · ". */
const line = (...parts: (string | undefined)[]) => {
  const kept = parts.filter((part): part is string => Boolean(part?.trim()));
  return kept.length > 0 ? kept : undefined;
};

const WATCHED: ReadonlySet<InsightsIndexKind> = new Set(['video', 'podcast']);

/** The item's own picture: its cover, or the scene drawn for it. Nothing else stands in. */
export function pictureOf(item: InsightsIndexItem): TeaserMedia | undefined {
  if (item.cover?.src.trim()) return { type: 'image', image: item.cover };
  if (item.scene) return { type: 'sketch', name: item.scene };
  return undefined;
}

export const hasPicture = (item: InsightsIndexItem) => pictureOf(item) !== undefined;

/** Publish dates closer than this do not tell pieces apart. */
const DATE_SPREAD_DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Whether a set's publish dates say anything: only when the pieces were published apart — more
 * than a week between the set's newest and oldest. A set published within days (a migration stamps
 * every piece with one of two dates) would stack identical date lines down the page, so its meta
 * keeps to what does differ, the length (beauty round, 16 Oct 2026). Asked of the set SHOWN.
 */
export function datesVary(items: readonly InsightsIndexItem[]) {
  const times = items
    .map((item) => parse(item.publishedAt)?.valueOf())
    .filter((time): time is number => time !== undefined);
  if (times.length < 2) return false;
  return Math.max(...times) - Math.min(...times) > DATE_SPREAD_DAYS * DAY_MS;
}

/** How a placement words an item's meta line. */
export type MetaOptions = {
  /** The set mixes formats (BY TOPIC): the format leads the line, in the title's ink. */
  withKind?: boolean;
  /** Show the publish date — only where the set's dates differ (`datesVary`). */
  withDate?: boolean;
};

/**
 * The meta line: what the section does not already say. A watched piece's running time ("Watch · 7
 * min"), a read piece's reading time, an event's date and place (never its publish date), and the
 * publish date only where it tells pieces apart.
 */
export function metaOf(item: InsightsIndexItem, { withDate = false }: MetaOptions = {}) {
  if (item.kind === 'event') {
    return line(dateOf(item.event?.startsAt) ?? 'Date TBC', item.event?.place);
  }
  const date = withDate ? dateOf(item.publishedAt) : undefined;
  if (WATCHED.has(item.kind)) {
    return line(item.duration ? `Watch · ${item.duration}` : 'Watch', date);
  }
  return line(item.readingTime, date);
}

/** An event's date anchor: the day as a numeral, its month under it. "Date TBC" without one. */
export function dateMarkerOf(item: InsightsIndexItem): TeaserProps['date'] {
  const date = parse(item.event?.startsAt);
  return date && item.event
    ? { day: DAY_OF_MONTH.format(date), label: MONTH_YEAR.format(date), dateTime: item.event.startsAt }
    : { day: '—', label: 'Date TBC' };
}

/** The bits every placement shares: title, link, standfirst, the picture and its play mark. */
export function teaserOf(
  item: InsightsIndexItem,
  options: MetaOptions = {},
): Omit<TeaserProps, 'arrangement' | 'size'> {
  return {
    title: item.title,
    href: item.href,
    body: item.description,
    label: options.withKind ? LABEL[item.kind].one : undefined,
    meta: metaOf(item, options),
    media: pictureOf(item),
    play: WATCHED.has(item.kind),
  };
}

/** Events by when they happen, the latest first (the CMS orders them by when they were filed). */
export const byEventDate = (items: readonly InsightsIndexItem[]) =>
  [...items].sort(
    (a, b) => (Date.parse(b.event?.startsAt ?? '') || 0) - (Date.parse(a.event?.startsAt ?? '') || 0),
  );

/** Split a set into the pieces with a picture and the typographic ones, each in date order. */
export function partition(items: readonly InsightsIndexItem[]) {
  return {
    pictured: items.filter(hasPicture),
    plain: items.filter((item) => !hasPicture(item)),
  };
}

/* ── The compositions ────────────────────────────────────────────────────────────
   Each a distinct silhouette, so a column built from them never repeats one rectangle: the COVER (a
   picture the column's full width, its words under it), the PAIR (two pictures at half), the SCREEN
   (a wide picture and two beside it), the INDEX (an ordinal list), the SPLIT (a picture beside an
   index), the DATES (a day numeral heading each row), the GRID (threes) and the TEXT block (two
   columns of headlines under one rule). The templates choose and order them. */

type Shape = {
  items: readonly InsightsIndexItem[];
  meta?: MetaOptions;
  titleAs?: 'h2' | 'h3' | 'h4';
};

/** The COVER: one piece, its picture the full width of the column, its words under it. */
export function Cover({ items, meta, titleAs = 'h3' }: Shape) {
  const [lead] = items;
  if (!lead) return null;
  return (
    <ul>
      <Teaser {...teaserOf(lead, meta)} size="xl" titleAs={titleAs} sizes={FULL_COLUMN} />
    </ul>
  );
}

/** The FEATURE: one piece, its picture beside its words, in two halves hung from one top edge. */
export function Feature({ items, meta, titleAs = 'h3' }: Shape) {
  const [lead] = items;
  if (!lead) return null;
  return (
    <ul>
      <Teaser
        {...teaserOf(lead, meta)}
        arrangement="beside"
        size="xl"
        titleAs={titleAs}
        sizes={CARD_TWO_TRACKS}
      />
    </ul>
  );
}

/** The PAIR: two pieces at the larger step, side by side. */
export function Pair({ items, meta, titleAs = 'h3' }: Shape) {
  return (
    <Layout as="ul" columns={{ md: 2 }} colGap="gutter" rowGap="stack">
      {items.map((item) => (
        <Teaser
          key={item.id}
          {...teaserOf(item, meta)}
          size="lg"
          titleAs={titleAs}
          sizes={CARD_TWO_TRACKS}
        />
      ))}
    </Layout>
  );
}

/** The GRID: threes, each a picture over its words (or its words alone). */
export function Grid({ items, meta, titleAs = 'h3' }: Shape) {
  return (
    <Layout as="ul" columns={{ md: 2, lg: 3 }} colGap="gutter" rowGap="stack">
      {items.map((item) => (
        <Teaser
          key={item.id}
          {...teaserOf(item, meta)}
          size="md"
          titleAs={titleAs}
          sizes={CARD_THREE_TRACKS}
        />
      ))}
    </Layout>
  );
}

/**
 * The SCREEN: the newest large, the next two stacked beside it to its height — the watched shape,
 * pictures leading, because a video is one.
 */
export function Screen({ items, meta, titleAs = 'h3' }: Shape) {
  const [lead, ...rest] = items;
  if (!lead) return null;
  return (
    <Layout columns={{ md: [2, 1] }} colGap="gutter" rowGap="stack" align="start">
      <ul>
        <Teaser {...teaserOf(lead, meta)} size="lg" titleAs={titleAs} sizes={CARD_TWO_TRACKS} />
      </ul>
      {rest.length > 0 ? (
        <Layout as="ul" rowGap="gutter">
          {rest.slice(0, 2).map((item) => (
            <Teaser
              key={item.id}
              {...teaserOf(item, meta)}
              size="sm"
              titleAs={titleAs}
              sizes={CARD_THREE_TRACKS}
            />
          ))}
        </Layout>
      ) : null}
    </Layout>
  );
}

/**
 * The INDEX: an ordinal list — the number in the marker column, the title, a line of standfirst, a
 * thumbnail at the row's end where the piece has a picture. A list of one is a row, not a list:
 * it carries no number. The numbers are the anchor, so the list
 * needs no rule between its rows.
 */
export function Index({
  items,
  meta,
  titleAs = 'h3',
  start = 1,
  size = 'sm',
}: Shape & { start?: number; size?: TeaserSize }) {
  return (
    <Layout as="ol" rowGap="gutter">
      {items.map((item, i) => (
        <Teaser
          key={item.id}
          {...teaserOf(item, meta)}
          index={items.length > 1 ? String(start + i).padStart(2, '0') : undefined}
          arrangement="row"
          size={size}
          titleAs={titleAs}
          sizes={TEASER_THUMBNAIL}
        />
      ))}
    </Layout>
  );
}

/** The SPLIT: one piece with its picture, beside an index of the rest. */
export function Split({ items, meta, titleAs = 'h3' }: Shape) {
  const { pictured, plain } = partition(items);
  const lead = pictured[0] ?? items[0];
  if (!lead) return null;
  const rest = [...pictured.slice(1), ...plain].filter((item) => item !== lead);
  return (
    <Layout columns={{ md: [1, 1] }} colGap="gutter" rowGap="stack" align="start">
      <ul>
        <Teaser {...teaserOf(lead, meta)} size="lg" titleAs={titleAs} sizes={CARD_TWO_TRACKS} />
      </ul>
      {rest.length > 0 ? <Index items={rest} meta={meta} titleAs={titleAs} /> : null}
    </Layout>
  );
}

/** The DATES: a row per event, the day as a numeral at its start, its picture at its end. */
export function Dates({ items, titleAs = 'h3', size = 'lg' }: Shape & { size?: TeaserSize }) {
  return (
    <Layout as="ul" rowGap="stack">
      {items.map((item) => (
        <Teaser
          key={item.id}
          {...teaserOf(item)}
          date={dateMarkerOf(item)}
          meta={item.event?.place}
          arrangement="row"
          size={size}
          titleAs={titleAs}
          sizes={CARD_THREE_TRACKS}
        />
      ))}
    </Layout>
  );
}

/**
 * The TEXT block: typographic pieces in two columns under one rule — a deliberate list of headlines,
 * so pieces without a picture never stand in a picture row looking as if theirs failed to load.
 */
export function TextBlock({ items, meta, titleAs = 'h3' }: Shape) {
  return (
    <div className={styles.textBlock}>
      <Layout as="ul" columns={{ md: 2 }} colGap="column" rowGap="stack">
        {items.map((item) => (
          <Teaser key={item.id} {...teaserOf(item, meta)} size="md" titleAs={titleAs} />
        ))}
      </Layout>
    </div>
  );
}

/* ── A curated section ────────────────────────────────────────────────────────── */

/**
 * A section's head — one grammar for both views: a small label over the serif title, the one line
 * under it in the same column. The way to everything in it closes the section (`SectionClose`).
 */
export function SectionHead({
  id,
  eyebrow,
  title,
  lead,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  const line = lead?.trim();
  return (
    <Layout rowGap="text">
      <Layout rowGap="tight">
        {eyebrow ? <p className={styles.sectionEyebrow}>{eyebrow}</p> : null}
        <h2 id={`${id}-heading`} className={styles.sectionTitle}>
          {title}
        </h2>
      </Layout>
      {line ? <p className={styles.sectionLead}>{line}</p> : null}
    </Layout>
  );
}

/** The stated close of a section: the way to all of it, under its last items. */
export function SectionClose({ label, href }: { label: string; href: string }) {
  return (
    <Cluster>
      <Button
        as="a"
        href={href}
        emphasis="link"
        tone="primary"
        icon={<Icon name="arrow-right" />}
      >
        {label}
      </Button>
    </Cluster>
  );
}

/** One curated section of a view: a jump target with its head over its shape, and its close. */
export function CuratedSection({
  id,
  head,
  close,
  children,
}: {
  id: string;
  head: ReactNode;
  close?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={styles.curated}>
      <Layout rowGap="stack">
        {head}
        {children}
        {close}
      </Layout>
    </section>
  );
}
