import type { ReactNode } from 'react';

import { Button, Cluster, Icon, Layout } from '@/components';
import { CARD_THREE_TRACKS, CARD_TWO_TRACKS, TEASER_THUMBNAIL } from '@/lib/image-sizes';
import type { ArticleSceneName } from '@/lib/sketches';
import { Teaser, type TeaserImage, type TeaserMedia, type TeaserProps } from '@/patterns';

import styles from './InsightsIndex.module.css';

/* ── The shapes both insights templates take ─────────────────────────────────────
   A template may not import @/content, so the route maps the view model onto these and the
   template never learns whether the CMS or the specimen's fixture answered. The hub
   (InsightsIndex) and a format page (InsightsFormat) are one family and share them. */

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

const dateOf = (iso: string | undefined) => {
  const date = parse(iso);
  return date ? DAY.format(date) : undefined;
};

/**
 * A label line's parts, blanks dropped — Teaser joins them with " · " and, on a phone's compact
 * row, keeps only the first, so the line never wraps in a narrow column.
 */
const line = (...parts: (string | undefined)[]) => {
  const kept = parts.filter((part): part is string => Boolean(part?.trim()));
  return kept.length > 0 ? kept : undefined;
};

/** The length of the thing: duration for the watched formats, reading time for the read ones. */
const lengthOf = (item: InsightsIndexItem) => item.duration ?? item.readingTime;

const WATCHED: ReadonlySet<InsightsIndexKind> = new Set(['video', 'podcast']);

/** The item's own picture: its cover, or the scene drawn for it. Nothing else stands in. */
export function pictureOf(item: InsightsIndexItem): TeaserMedia | undefined {
  if (item.cover?.src.trim()) return { type: 'image', image: item.cover };
  if (item.scene) return { type: 'sketch', name: item.scene };
  return undefined;
}

export const hasPicture = (item: InsightsIndexItem) => pictureOf(item) !== undefined;

/**
 * The meta line. Where the section already names the format (BY TYPE, a format page) the line
 * carries what the section does not — date, length; where it mixes formats (BY TOPIC) the format
 * leads. An event's line is its own date and place, never its publish date.
 */
export function metaOf(item: InsightsIndexItem, withKind: boolean): string[] | undefined {
  /* With the format leading, the line keeps to one more fact, so it holds one line in a tile. */
  if (withKind) return shortMetaOf(item, true);
  if (item.kind === 'event') {
    return line(dateOf(item.event?.startsAt) ?? 'Date TBC', item.event?.place);
  }
  return line(dateOf(item.publishedAt), lengthOf(item));
}

/**
 * The short meta line a row carries, where the column is narrow: one fact past the format — an
 * event's date, a watched piece's date, a read piece's length.
 */
export function shortMetaOf(item: InsightsIndexItem, withKind: boolean): string[] | undefined {
  const kind = withKind ? LABEL[item.kind].one : undefined;
  if (item.kind === 'event') return line(kind, dateOf(item.event?.startsAt) ?? 'Date TBC');
  if (WATCHED.has(item.kind)) return line(kind, item.duration ?? dateOf(item.publishedAt));
  return line(kind, item.readingTime ?? dateOf(item.publishedAt));
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
  withKind: boolean,
): Omit<TeaserProps, 'arrangement' | 'size'> {
  return {
    title: item.title,
    href: item.href,
    body: item.description,
    meta: metaOf(item, withKind),
    media: pictureOf(item),
    play: WATCHED.has(item.kind),
  };
}

/* ── Shared arrangements ────────────────────────────────────────────────────────── */

/**
 * A row of three, each item its own shape: a picture tile where it has one, a typographic tile
 * where it does not, all starting on one top edge (the picture's top, or the meta line's).
 */
export function Trio({
  items,
  withKind,
  titleAs = 'h3',
}: {
  items: readonly InsightsIndexItem[];
  withKind: boolean;
  titleAs?: 'h2' | 'h3' | 'h4';
}) {
  return (
    <Layout as="ul" columns={{ md: 3 }} colGap="gutter" rowGap="column">
      {items.map((item) => (
        <Teaser
          key={item.id}
          {...teaserOf(item, withKind)}
          size="md"
          titleAs={titleAs}
          sizes={CARD_THREE_TRACKS}
          compact
        />
      ))}
    </Layout>
  );
}

/** Two pieces at the larger step: a pair of pictures that should read bigger than a trio. */
export function Pair({
  items,
  withKind,
  titleAs = 'h3',
}: {
  items: readonly InsightsIndexItem[];
  withKind: boolean;
  titleAs?: 'h2' | 'h3' | 'h4';
}) {
  return (
    <Layout as="ul" columns={{ md: 2 }} colGap="gutter" rowGap="column">
      {items.map((item) => (
        <Teaser
          key={item.id}
          {...teaserOf(item, withKind)}
          size="lg"
          titleAs={titleAs}
          sizes={CARD_TWO_TRACKS}
          compact
        />
      ))}
    </Layout>
  );
}

/** A list in rows: copy first, the picture (where there is one) as a thumbnail at the row's end. */
export function Rows({
  items,
  withKind,
  titleAs = 'h3',
  dated = false,
}: {
  items: readonly InsightsIndexItem[];
  withKind: boolean;
  titleAs?: 'h2' | 'h3' | 'h4';
  dated?: boolean;
}) {
  return (
    <Layout as="ul" rowGap="gutter">
      {items.map((item) => (
        <Teaser
          key={item.id}
          {...teaserOf(item, withKind)}
          meta={dated ? item.event?.place : shortMetaOf(item, withKind)}
          {...(dated ? { date: dateMarkerOf(item) } : {})}
          arrangement="row"
          size="sm"
          titleAs={titleAs}
          sizes={TEASER_THUMBNAIL}
        />
      ))}
    </Layout>
  );
}

/** A section's head: its h2, the line under it, and the way to everything in it. */
export function SectionHead({
  id,
  title,
  lead,
  all,
}: {
  id: string;
  title: string;
  lead?: string;
  all?: { label: string; href: string };
}) {
  return (
    <Layout rowGap="text">
      <Cluster justify="between" align="baseline" colGap="gutter" rowGap="text">
        <h2 id={`${id}-heading`} className={styles.sectionTitle}>
          {title}
        </h2>
        {all ? (
          <Button
            as="a"
            href={all.href}
            emphasis="link"
            tone="primary"
            icon={<Icon name="arrow-right" />}
          >
            {all.label}
          </Button>
        ) : null}
      </Cluster>
      {lead?.trim() ? <p className={styles.sectionLead}>{lead}</p> : null}
    </Layout>
  );
}

/** One curated section of a view: a jump target with its head over its shape. */
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
      <Layout rowGap="stack">
        {head}
        {children}
      </Layout>
    </section>
  );
}
