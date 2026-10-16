import type { ReactNode } from 'react';

import { Button, Icon, Layout } from '@/components';
import { CARD_THREE_TRACKS, CARD_TWO_TRACKS, FULL_COLUMN } from '@/lib/image-sizes';
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
  /** Its first topic's NAME ("Design System"): what its meta line says about it where the section
      does not already say it — never a reading time stamped identically down a list. */
  subject?: string;
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

/** Has a standfirst: a lead's words then run its picture's height (beauty round 4). */
export const hasStandfirst = (item: InsightsIndexItem) => Boolean(item.description?.trim());

/** A set with its best lead first: the first piece with a picture AND a standfirst, else with a
    picture, else the first — the rest in their order. */
export function leadFirst(items: readonly InsightsIndexItem[]): InsightsIndexItem[] {
  const lead =
    items.find((item) => hasPicture(item) && hasStandfirst(item)) ??
    items.find(hasPicture) ??
    items[0];
  return lead ? [lead, ...items.filter((item) => item !== lead)] : [];
}

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
  /** The set is one format across topics: the piece's subject leads the line (beauty round 4). */
  withSubject?: boolean;
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
  { withKind = false, withSubject = false, withDate = false }: MetaOptions = {},
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
  /* A read piece: what it is about, then how long — the subject is the fact that differs down a
     list; the reading time alone, "11 min read" on every row, said nothing. */
  return line(withSubject ? item.subject : undefined, item.readingTime, date);
}

/** An event's date anchor: the day as a numeral, its month under it. "Date TBC" without one. */
export function dateMarkerOf(item: InsightsIndexItem): TeaserProps['date'] {
  const date = parse(item.event?.startsAt);
  return date && item.event
    ? {
        /* Zero-padded ("02"), so the tabular day takes one width on every row. */
        day: DAY_OF_MONTH.format(date).padStart(2, '0'),
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
   Beauty round 4 (16 Oct 2026): a small set of FIXED compositions, each a complete rectangle with a
   scale ladder inside it — one large piece, a middle tier, a small tier — and no column that ends
   in empty paper. The templates assign them per section so no two neighbours match, in both views
   and on the format pages.

     LEAD     a 16:9 lead at two thirds, two pictured pieces stacked beside it
     TRIO     three pictured pieces in a row
     CINEMA   a lead at the column's full width, a filmstrip of pictured pieces under it
     INDEX    one pictured piece beside a numbered index of typographic ones (the hub's short index)
     HALVES   two pictured pieces at half
     LEDGER   a list of pieces, one per row, its copy and a thumbnail track at the row's end
     DATES    a row per event, the day as a numeral at its start
     SHOWCASE one event featured beside its day at the largest numeral

   A piece shows its picture wherever it has one: a picture is decided by the DATA, never dropped by
   a slot (beauty round 4). The pictured compositions are handed pictured pieces; the typographic
   ones (INDEX's list, LEDGER) carry a piece's picture as a thumbnail where it has one, in a track
   every row of that list holds, so the copy ends on one edge whether or not a row has a picture.
   A piece without a picture is typographic, never a stand-in. On a phone the secondary pieces of a
   pictured set turn `compact` (a row, its picture a thumbnail at the end), so a single column is not
   a run of identical full-width pictures. */

type Shape = {
  items: readonly InsightsIndexItem[];
  meta?: MetaOptions;
  titleAs?: 'h2' | 'h3' | 'h4';
};

/**
 * The LEAD: the first piece at two thirds — its picture, meta, title at the largest item step and
 * its standfirst — and the next two stacked in the third beside it, each its picture over its words,
 * so the stack runs the lead's height and the rectangle closes. Below 1024 the lead takes the column
 * and the two sit side by side under it (rows on a phone).
 */
export function Lead({ items, meta, titleAs = 'h3' }: Shape) {
  const [lead, ...rest] = items;
  if (!lead) return null;
  /* Two pictured pieces beside the lead run its height; typographic ones need three, each with its
     standfirst, to run it. */
  const sidePictures = rest.filter(hasPicture).slice(0, 2);
  const pictured = sidePictures.length === 2;
  const side = pictured ? sidePictures : rest.slice(0, 3);
  return (
    <Layout columns={{ lg: [2, 1] }} colGap="gutter" rowGap="stack">
      <Layout rowGap="gutter">
        <ul>
          <Teaser
            {...teaserOf(lead, meta)}
            size="xl"
            titleAs={titleAs}
            sizes={CARD_TWO_TRACKS}
          />
        </ul>
      </Layout>
      {side.length > 0 ? (
        <Layout as="ul" columns={{ md: side.length, lg: 1 }} colGap="gutter" rowGap="gutter">
          {side.map((item) => (
            <Teaser
              key={item.id}
              {...teaserOf(item, meta)}
              body={pictured ? undefined : item.description}
              size={pictured ? 'sm' : 'md'}
              titleAs={titleAs}
              sizes={CARD_THREE_TRACKS}
              compact={pictured}
            />
          ))}
        </Layout>
      ) : null}
    </Layout>
  );
}

/** The TRIO: three pictured pieces in a row, the small tier — on a phone the first leads, the rest rows. */
export function Trio({ items, meta, titleAs = 'h3' }: Shape) {
  return (
    <Layout as="ul" columns={{ md: 3 }} colGap="gutter" rowGap="stack">
      {items.slice(0, 3).map((item, i) => (
        <Teaser
          key={item.id}
          {...teaserOf(item, meta)}
          size="sm"
          titleAs={titleAs}
          sizes={CARD_THREE_TRACKS}
          compact={i > 0}
        />
      ))}
    </Layout>
  );
}

/**
 * The CINEMA: the lead at the column's full width — the watched shape, a screen — then a filmstrip
 * of the next pieces in one row under it (three or four across; on a phone a row that scrolls
 * sideways, one in view and the next peeking).
 */
export function Cinema({ items, meta, titleAs = 'h3' }: Shape) {
  const [lead, ...rest] = items;
  if (!lead) return null;
  const strip = rest.slice(0, 4);
  return (
    <Layout rowGap="stack">
      <ul>
        <Teaser {...teaserOf(lead, meta)} size="xl" titleAs={titleAs} sizes={FULL_COLUMN} />
      </ul>
      {strip.length > 0 ? (
        <Layout
          as="ul"
          columns={{ md: strip.length }}
          scroll="until-md"
          colGap="gutter"
          rowGap="stack"
        >
          {strip.map((item) => (
            <Teaser
              key={item.id}
              {...teaserOf(item, meta)}
              body={undefined}
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

/** The HALVES: two pictured pieces at half, the middle tier (the second a compact row on a phone). */
export function Halves({ items, meta, titleAs = 'h3' }: Shape) {
  return (
    <Layout as="ul" columns={{ md: 2 }} colGap="gutter" rowGap="stack">
      {items.slice(0, 2).map((item, i) => (
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

/**
 * The LEDGER: one piece per row — its meta's facts in a column at the row's start, its title and two
 * lines of standfirst at a measure, and its picture as a thumbnail at the row's end. Where any row has a picture every row holds the thumbnail's track,
 * so the copy ends on one edge; where none has, the copy takes the width.
 */
export function Ledger({ items, meta, titleAs = 'h3' }: Shape) {
  const slot = items.some(hasPicture);
  return (
    <Layout as="ul" rowGap="stack">
      {items.map((item) => (
        <Teaser
          key={item.id}
          {...teaserOf(item, meta)}
          arrangement="row"
          size="md"
          titleAs={titleAs}
          sizes={CARD_THREE_TRACKS}
          slot={slot}
          metaAside
        />
      ))}
    </Layout>
  );
}

/**
 * The HEADLINES: typographic pieces in one row (two or three across), each anchored by its meta line
 * and carrying two lines of sans standfirst under a balanced, three-line title — a deliberate run of
 * words for pieces that have no picture, never a picture row with its pictures missing. Handed only
 * typographic pieces.
 */
export function Headlines({ items, meta, titleAs = 'h3' }: Shape) {
  const across = Math.min(3, Math.max(1, items.length)) as 1 | 2 | 3;
  return (
    <Layout as="ul" columns={{ md: across }} colGap="gutter" rowGap="stack">
      {items.map((item) => (
        <Teaser key={item.id} {...teaserOf(item, meta)} size="md" titleAs={titleAs} />
      ))}
    </Layout>
  );
}

/**
 * The INDEX: one piece with its picture beside a list of the rest — the hub's short index. The
 * list's rows carry a piece's thumbnail where it has one, in a track every row holds. No numerals
 * (owner, 16 Oct 2026: the 01–04 column made it "messy").
 */
export function Index({ items, meta, titleAs = 'h3' }: Shape) {
  const { pictured, plain } = partition(items);
  const lead = pictured[0];
  const rest = lead ? items.filter((item) => item !== lead) : [...plain];
  const slot = rest.some(hasPicture);
  const list = (
    <Layout as="ul" rowGap="gutter">
      {rest.map((item) => (
        <Teaser
          key={item.id}
          {...teaserOf(item, meta)}
          body={undefined}
          arrangement="row"
          size="md"
          titleAs={titleAs}
          sizes={CARD_THREE_TRACKS}
          slot={slot}
        />
      ))}
    </Layout>
  );
  if (!lead) return list;
  return (
    /* A feature beside a list of balanced titles: balanced wrapping leaves the list's right edge
       ragged and short, so the pair reads as two regions and takes the column step (owner, 16 Oct
       2026: "for such layouts, we can have bigger gutter"). */
    <Layout columns={{ md: [1, 1] }} colGap="column" rowGap="stack" align="start">
      <ul>
        <Teaser {...teaserOf(lead, meta)} size="lg" titleAs={titleAs} sizes={CARD_TWO_TRACKS} />
      </ul>
      {rest.length > 0 ? list : null}
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
          graphic
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
        graphic
      />
    </ul>
  );
}

/**
 * How a set of pictured pieces is cut into TRIO and HALVES phrases — threes and twos alternating,
 * never leaving one alone: 4 is 2 + 2, 6 is 3 + 3, 7 is 3 + 2 + 2. `first` says which opens the run
 * (a run under a filmstrip of threes opens on two). One alone is not a phrase (the caller files it
 * into a list with its thumbnail).
 */
export function pictureRun(count: number, first: 2 | 3 = 3): number[] {
  const parts: number[] = [];
  let left = count;
  let three = first === 3;
  while (left >= 2) {
    let take = three ? 3 : 2;
    if (left - take === 1) take = take === 3 ? 2 : 3;
    if (take > left) take = left;
    parts.push(take);
    left -= take;
    three = !three;
  }
  return parts;
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
