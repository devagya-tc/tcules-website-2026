import type { ReactNode } from 'react';

import { Button, Icon, Layout } from '@/components';
import {
  CARD_THREE_TRACKS,
  CARD_TWO_TRACKS,
  FULL_COLUMN,
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
 * The meta line: what the section does not already say. A watched or heard piece's running time
 * ("Watch · 7 min", "Listen · 48 min"), a read piece's reading time, an event's date and place
 * (never its publish date), and the publish date only where it tells pieces apart.
 */
export function metaOf(
  item: InsightsIndexItem,
  { withKind = false, withDate = false }: MetaOptions = {},
) {
  if (item.kind === 'event') {
    return line(dateOf(item.event?.startsAt) ?? 'Date TBC', item.event?.place);
  }
  /* Where the format leads the line, it keeps to one fact more, so a narrow row holds one line. */
  if (withKind) return line(item.duration ?? item.readingTime);
  const date = withDate ? dateOf(item.publishedAt) : undefined;
  if (WATCHED.has(item.kind)) {
    const verb = item.kind === 'podcast' ? 'Listen' : 'Watch';
    return line(item.duration ? `${verb} · ${item.duration}` : verb, date);
  }
  return line(item.readingTime, date);
}

/** An event's date anchor: the day as a numeral, its month under it. "Date TBC" without one. */
export function dateMarkerOf(item: InsightsIndexItem): TeaserProps['date'] {
  const date = parse(item.event?.startsAt);
  return date && item.event
    ? {
        day: DAY_OF_MONTH.format(date),
        label: MONTH_YEAR.format(date),
        dateTime: item.event.startsAt,
      }
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
    (a, b) =>
      (Date.parse(b.event?.startsAt ?? '') || 0) - (Date.parse(a.event?.startsAt ?? '') || 0),
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
   picture the column's full width, its words under it), the FEATURE (a picture beside its words,
   either side), the PAIR (two pictures at half), the GRID (pictures in threes), the SCREEN (a wide
   picture and two beside it), the HEADLINES (typographic pieces in a row, their meta line the
   anchor), the INDEX (a typographic ordinal list), the SPLIT (a picture beside an index) and the
   DATES (a day numeral heading each row). The templates choose and order them.

   A shape decides its pictures per INSTANCE, never per row: a pictured shape takes only pieces with
   a picture, and the typographic ones (HEADLINES, INDEX) show none even where a piece has one — so
   no list carries a thumbnail on some rows and not others (beauty round 3, 16 Oct 2026). Secondary
   pieces of a pictured set turn `compact` on a phone, so a single column is not a run of identical
   full-width pictures. */

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

/**
 * The FEATURE: one piece, its picture beside its words, hung from one top edge. `flip` sets the
 * picture at the end (a run of features zigzags); `weight="picture"` gives the picture seven twelfths
 * — a page's featured lead.
 */
export function Feature({
  items,
  meta,
  titleAs = 'h3',
  flip = false,
  weight = 'even',
}: Shape & { flip?: boolean; weight?: 'even' | 'picture' }) {
  const [lead] = items;
  if (!lead) return null;
  return (
    <ul>
      <Teaser
        {...teaserOf(lead, meta)}
        arrangement="beside"
        size="xl"
        titleAs={titleAs}
        flip={flip}
        weight={weight}
        sizes={CARD_TWO_TRACKS}
      />
    </ul>
  );
}

/** The PAIR: two pieces at the larger step, side by side (the second a compact row on a phone). */
export function Pair({ items, meta, titleAs = 'h3' }: Shape) {
  return (
    <Layout as="ul" columns={{ md: 2 }} colGap="gutter" rowGap="stack">
      {items.map((item, i) => (
        <Teaser
          key={item.id}
          {...teaserOf(item, meta)}
          size="lg"
          titleAs={titleAs}
          sizes={CARD_TWO_TRACKS}
          compact={i > 0}
        />
      ))}
    </Layout>
  );
}

/** The GRID: threes, each a picture over its words; on a phone the first leads and the rest are rows. */
export function Grid({ items, meta, titleAs = 'h3' }: Shape) {
  return (
    <Layout as="ul" columns={{ md: 2, lg: 3 }} colGap="gutter" rowGap="stack">
      {items.map((item, i) => (
        <Teaser
          key={item.id}
          {...teaserOf(item, meta)}
          size="md"
          titleAs={titleAs}
          sizes={CARD_THREE_TRACKS}
          compact={i > 0}
        />
      ))}
    </Layout>
  );
}

/**
 * The HEADLINES: typographic pieces in one row (two or three across), each anchored by its meta line
 * — an event's date, a watched piece's running time, a read one's reading time — and carrying its
 * standfirst: a deliberate run of words, never a picture row with its pictures missing. Pictures
 * are not shown here even where a piece has one, and every title starts on one line across the row.
 */
export function Headlines({ items, meta, titleAs = 'h3' }: Shape) {
  const across = Math.min(3, Math.max(1, items.length)) as 1 | 2 | 3;
  return (
    <Layout as="ul" columns={{ md: across }} colGap="gutter" rowGap="stack">
      {items.map((item) => (
        <Teaser
          key={item.id}
          {...teaserOf(item, meta)}
          media={undefined}
          size="md"
          titleAs={titleAs}
        />
      ))}
    </Layout>
  );
}

/**
 * The SPREAD: one piece with its picture across two thirds, two typographic pieces stacked in the
 * third beside it — a format page's opening phrase, picture and words sharing one row.
 */
export function Spread({ items, meta, titleAs = 'h3' }: Shape) {
  const [lead, ...rest] = items;
  if (!lead) return null;
  return (
    <Layout columns={{ lg: [2, 1] }} colGap="gutter" rowGap="stack" align="start">
      <ul>
        <Teaser {...teaserOf(lead, meta)} size="lg" titleAs={titleAs} sizes={CARD_TWO_TRACKS} />
      </ul>
      {rest.length > 0 ? (
        <Layout as="ul" rowGap="stack">
          {rest.slice(0, 2).map((item) => (
            <Teaser
              key={item.id}
              {...teaserOf(item, meta)}
              media={undefined}
              size="md"
              titleAs={titleAs}
            />
          ))}
        </Layout>
      ) : null}
    </Layout>
  );
}

/**
 * The SCREEN: the newest large, the next two stacked beside it — the watched shape, pictures
 * leading, because a video is one.
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
              compact
            />
          ))}
        </Layout>
      ) : null}
    </Layout>
  );
}

/**
 * The INDEX: a typographic ordinal list — the number in the marker column, the title, a line of
 * standfirst. No thumbnails: an index is words, and a picture on some rows only jagged its edge. A
 * list of one is a row, not a list: it carries no number. `across={2}` sets it in two columns (a
 * format page's long index).
 */
export function Index({
  items,
  meta,
  titleAs = 'h3',
  start = 1,
  size = 'sm',
  across = 1,
}: Shape & { start?: number; size?: TeaserSize; across?: 1 | 2 }) {
  return (
    <Layout
      as="ol"
      columns={across === 2 ? { md: 2 } : undefined}
      colGap={across === 2 ? 'column' : undefined}
      rowGap={across === 2 ? 'stack' : 'gutter'}
    >
      {items.map((item, i) => (
        <Teaser
          key={item.id}
          {...teaserOf(item, meta)}
          media={undefined}
          index={items.length > 1 ? String(start + i).padStart(2, '0') : undefined}
          arrangement="row"
          size={size}
          titleAs={titleAs}
        />
      ))}
    </Layout>
  );
}

/** The SPLIT: one piece with its picture, beside an index of the rest (the index alone without one). */
export function Split({ items, meta, titleAs = 'h3' }: Shape) {
  const { pictured, plain } = partition(items);
  const lead = pictured[0];
  /* Without a picture to lead, a lone typographic piece beside the index would leave a hole under
     it: the set is the index alone. */
  if (!lead)
    return items.length > 0 ? <Index items={items} meta={meta} titleAs={titleAs} /> : null;
  const rest = [...pictured.slice(1), ...plain];
  return (
    <Layout columns={{ md: [1, 1] }} colGap="gutter" rowGap="stack" align="start">
      <ul>
        <Teaser {...teaserOf(lead, meta)} size="xl" titleAs={titleAs} sizes={CARD_TWO_TRACKS} />
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

/** The SHOWCASE: one event featured, its picture beside the day at its largest, then its words. */
export function Showcase({ items, titleAs = 'h3' }: Shape) {
  const [lead] = items;
  if (!lead) return null;
  return (
    <ul>
      <Teaser
        {...teaserOf(lead)}
        date={dateMarkerOf(lead)}
        meta={lead.event?.place}
        arrangement="beside"
        weight="picture"
        size="xl"
        titleAs={titleAs}
        sizes={CARD_TWO_TRACKS}
      />
    </ul>
  );
}

/* ── A curated section ────────────────────────────────────────────────────────── */

/**
 * A section's head — one line, one grammar for both views (beauty round 3, 16 Oct 2026): the name as
 * a quiet serif h2 and, on the same baseline at the row's end, the way to all of it ("All 42 articles
 * →"). No eyebrow and no lead sentence: the head is a signpost, so the first piece under it is the
 * loudest thing in the section, and the section ends on its last piece rather than on a link.
 */
export function SectionHead({
  id,
  title,
  link,
}: {
  id: string;
  title: string;
  link?: { label: string; href: string };
}) {
  return (
    <Layout columns={{ base: [1, 'auto'] }} colGap="block" align="baseline">
      <h2 id={`${id}-heading`} className={styles.sectionTitle}>
        {title}
      </h2>
      {link ? (
        <Button
          as="a"
          href={link.href}
          emphasis="link"
          tone="primary"
          icon={<Icon name="arrow-right" />}
        >
          {link.label}
        </Button>
      ) : null}
    </Layout>
  );
}

/** One curated section of a view: a jump target with its one-line head over its shape. */
export function CuratedSection({
  id,
  head,
  children,
}: {
  id: string;
  head: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={styles.curated}>
      <Layout rowGap="gutter">
        {head}
        {children}
      </Layout>
    </section>
  );
}
