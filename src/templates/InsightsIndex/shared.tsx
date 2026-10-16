import type { ReactNode } from 'react';

import {
  Button,
  Cluster,
  Icon,
  Layout,
  Tag,
  VisuallyHidden,
  type IconName,
} from '@/components';
import { cx } from '@/lib/cx';
import {
  INSIGHT_FORMAT_LABEL,
  INSIGHT_FORMAT_ORDER,
  type InsightFormatKind,
} from '@/lib/insight-formats';
import type { ArticleSceneName } from '@/lib/sketches';
import {
  BlockCard,
  BlockCardSet,
  ContentSection,
  ListCard,
  Slider,
  type BlockCardImage,
  type BlockCardSetItem,
  type HeroAction,
  type ListCardMarker,
} from '@/patterns';

import styles from './InsightsIndex.module.css';

/* ── The family's own shapes ──────────────────────────────────────────────────────
   Shared by the hub (InsightsIndex) and each format's page (InsightsFormatIndex): files in one
   template folder, the way ListCard ships ReadDown and Steps, so neither page imports the other.
   A template may not import @/content, so the page maps the view model onto these and the template
   never learns whether the CMS or the specimen's fixture answered. */

/** The seven formats (the one union, in lib). The template decides each one's shape and position. */
export type InsightsIndexKind = InsightFormatKind;

export type InsightsIndexItem = {
  id: string;
  kind: InsightsIndexKind;
  title: string;
  href: string;
  /** The standfirst. Absent or blank renders the title alone. */
  description?: string;
  cover?: BlockCardImage;
  /**
   * THE date of the item, ISO 8601 — resolved per format at the content seam (an event's when it
   * happens, anything else's when it was published) and already the order the page passes items in.
   * The template shows it and never chooses another (critique 16 Oct 2026).
   */
  date?: string;
  /** "11 min read" — on the formats that are read. */
  readingTime?: string;
  /** "48 min" — on the formats that are watched or heard. */
  duration?: string;
  /** When and where an event happens. `startsAt` is ISO 8601. */
  event?: { startsAt: string; place?: string };
  /**
   * The scene DRAWN for this article from its own argument (owner, 13 Oct 2026), assigned to it on
   * purpose in data: its cover until a real one exists. Typed to the article scenes, so a service
   * scene can never stand as a cover.
   */
  scene?: ArticleSceneName;
  /**
   * What stands in for the missing cover, assigned to THIS item in data, never chosen by the
   * template: a catalogue photograph (visual-direction § 5.7) while the family's small pool lasts,
   * one per item so an item keeps one stand-in on every page and none repeats; then the register's
   * labelled "Image to come" placeholder. Never a decorative texture (critique 16 Oct 2026).
   */
  standIn?: BlockCardImage;
};

/** What the page says about one format: its group title, its one sentence, where "All …" goes. */
export type InsightsIndexFormat = {
  kind: InsightsIndexKind;
  title?: string;
  lead?: string;
  href: string;
};

export type InsightsIndexCollection = {
  id: string;
  title: string;
  description: string;
  /** The glyph heading the column. Absent on any collection, the set renders without glyphs. */
  icon?: IconName;
  items: readonly { id: string; title: string; href: string }[];
  related?: HeroAction;
};

export type InsightsIndexFilterOption = {
  id: string;
  label: string;
  /** How many pieces choosing it would show, given the other held filters. */
  count?: number;
  /** The URL with this option applied — or, when `selected`, with its group cleared. */
  href: string;
  selected: boolean;
};

export type InsightsIndexFilterGroup = {
  id: string;
  label: string;
  options: readonly InsightsIndexFilterOption[];
};

/**
 * A format page's archive: every item of the format, filtered and paged by the page. The URL is the
 * state; every link the page built ends in the archive's fragment.
 */
export type InsightsIndexArchive = {
  /** The band's id: the fragment every filter and "Show more" href ends in. */
  id: string;
  /** "All articles". */
  heading: string;
  /** The plural noun the count line uses: "articles". */
  noun: string;
  /** The items on screen: already filtered and paged by the page. */
  items: readonly InsightsIndexItem[];
  /** How many items match the held filters. */
  total: number;
  /** How many items the format holds. */
  all: number;
  /**
   * How many of the format's items the page shows ABOVE the archive and the archive leaves out (the
   * latest, at full column). Counted into "13 of 42 shown", so the line is true of the page.
   */
  above?: number;
  /** The primary filter line: "All" first, then the first topic group's options, with counts. */
  primary: readonly InsightsIndexFilterOption[];
  /**
   * The primary line's accessible name, from the group it holds ("Filter by industry"): whatever
   * group the CMS puts first, the line is named for it, never a fixed word that may name another.
   */
  primaryLabel: string;
  /** The other groups, behind "More filters": only options with results, no one-option groups. */
  filters: readonly InsightsIndexFilterGroup[];
  /** What is held, each with the link that removes it. Empty when nothing is. */
  held: readonly { id: string; label: string; href: string }[];
  /** Clears every filter. Present only while one is held. */
  clearHref?: string;
  /** The next page. Present only while more match than are shown. */
  moreHref?: string;
};

/** The close: rendered only with its action, because a close without an ask is not one. */
export type InsightsIndexClosing = {
  eyebrow?: string;
  heading: string;
  body?: string;
  action?: HeroAction;
};

/* ── Decisions the family owns ────────────────────────────────────────────────── */

/**
 * The formats in page order. The hub re-deals them (`alternate`) so a covered group and a text group
 * take turns; the format row lists them in this order too, so the family reads the same everywhere.
 */
export const FORMAT_ORDER = INSIGHT_FORMAT_ORDER;

export const LABEL = INSIGHT_FORMAT_LABEL;

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

export function parse(iso: string | undefined): Date | undefined {
  if (!iso) return undefined;
  const date = new Date(iso);
  return Number.isNaN(date.valueOf()) ? undefined : date;
}

export const dateOf = (iso: string | undefined) => {
  const date = parse(iso);
  return date ? DAY.format(date) : undefined;
};

/** A label line from its parts, blanks dropped: "Podcast · 7 Oct 2026". */
export const line = (...parts: (string | undefined)[]) =>
  parts.filter((part): part is string => Boolean(part?.trim())).join(' · ') || undefined;

/**
 * How long the thing takes, BY FORMAT (critique 16 Oct 2026: a video card said "13 MIN READ"): the
 * reading time for what is read, the running time for what is watched or heard — nothing when it
 * has none, never the other one — and nothing for an event, which is dated, not timed.
 */
export function lengthOf(item: InsightsIndexItem): string | undefined {
  switch (item.kind) {
    case 'video':
    case 'podcast':
      return item.duration;
    case 'event':
      return undefined;
    default:
      return item.readingTime;
  }
}

/**
 * The item's label line, the one resolver every card and row reads, per format: its date, then its
 * length (articles, guides, research, interviews: the reading time; videos, podcasts: the running
 * time) or, for an event, its place. `date: false` where something beside the line already says the
 * date (an event row's date marker). Never assembled in a card.
 */
export function metaOf(item: InsightsIndexItem, { date = true }: { date?: boolean } = {}) {
  const day = date ? dateOf(item.date) : undefined;
  return item.kind === 'event' ? line(day, item.event?.place) : line(day, lengthOf(item));
}

export const bodyOf = (item: InsightsIndexItem) =>
  item.description?.trim() ? item.description : undefined;

export const coverOf = (item: InsightsIndexItem): BlockCardSetItem['media'] =>
  item.cover?.src.trim() ? { type: 'image', image: item.cover } : undefined;

type CoverMedia = NonNullable<BlockCardSetItem['media']>;

/**
 * The cover for an item that has none (owner, 13 Oct 2026): the scene drawn for that article where
 * it has one, else whatever the page assigned it in data — a stand-in photograph or the labelled
 * placeholder. A pure function of the item, so it looks the same on every page. Never a generic
 * scene and never a texture field: three identical dot fields in a row read as broken images and
 * repeated the hero's own texture (critique 16 Oct 2026).
 */
export function standInOf(item: InsightsIndexItem): CoverMedia | undefined {
  if (item.scene) return { type: 'sketch', name: item.scene };
  if (item.standIn?.src.trim()) return { type: 'image', image: item.standIn };
  return undefined;
}

/** The kinds whose items are pictures first: a cover leads the card. */
const COVERED: ReadonlySet<InsightsIndexKind> = new Set(['article', 'video', 'podcast']);
export const isCovered = (kind: InsightsIndexKind) => COVERED.has(kind);

/** The kinds present in `items`, in the family's order. */
export const kindsPresent = (items: readonly InsightsIndexItem[]) =>
  FORMAT_ORDER.filter((kind) => items.some((item) => item.kind === kind));

/** Whether an item carries an image of its own — a real cover or the scene drawn for it. */
const ownImage = (item: InsightsIndexItem) =>
  coverOf(item) !== undefined || Boolean(item.scene);

/** The share of a set that must carry its own image for the set to be shown as pictures. */
const PICTURED_FROM = 0.8;

/**
 * Whether a set of a text-first format is shown WITH pictures — decided once, by the set, never item
 * by item (critique 16 Oct 2026: thumbnails on five of ten guide rows left a ragged right edge and a
 * list that looked half-loaded). From 80% carrying their own image, the set takes pictures and the
 * rest show their assigned stand-in or placeholder; below it, every item is a text row.
 */
export const pictured = (items: readonly InsightsIndexItem[]) =>
  items.length > 0 && items.filter(ownImage).length / items.length >= PICTURED_FROM;

/** An event's date marker: the record's date, never the publish date; "Date TBC" without one. */
export function eventMarker(item: InsightsIndexItem): ListCardMarker {
  const date = parse(item.event?.startsAt);
  return date && item.event
    ? {
        type: 'date',
        dateTime: item.event.startsAt,
        day: DAY_OF_MONTH.format(date),
        label: MONTH_YEAR.format(date),
      }
    : { type: 'date', day: '—', label: 'Date TBC' };
}

/* ── The format row ───────────────────────────────────────────────────────────── */

/**
 * The format pages' one way between the family's pages (15 Oct 2026; the claude.com/resources
 * sub-nav, in Tcules' vocabulary): "All" back to the hub, then every format with content and its
 * count, the current one marked. Tabs on one hairline — words in sans, counts in mono, the current
 * page in ink on a mark — so it reads as navigation and never as the topic filters under it, which
 * are Tags (critique 16 Oct 2026: chips over chips read as one control). On the format pages only:
 * the hub's own outline is its category navigation. One line at every width: it scrolls sideways
 * where it runs out of room, never wraps.
 */
export function FormatRow({ options }: { options: readonly InsightsIndexFilterOption[] }) {
  if (options.length < 2) return null;
  return (
    <nav aria-label="Insights formats" className={styles.scroller}>
      {/* `gutter` (32) between tabs: words, not boxed chips, so the air is the separation. */}
      <Cluster as="ul" colGap="gutter" nowrap className={styles.tabs}>
        {options.map((option) => (
          <li key={option.id}>
            <a
              href={option.href}
              aria-current={option.selected ? 'page' : undefined}
              className={cx(styles.tab, option.selected && styles.tabCurrent)}
            >
              {option.label}
              {option.count === undefined ? null : (
                <>
                  {' '}
                  <span className={styles.tabCount}>{option.count}</span>
                </>
              )}
            </a>
          </li>
        ))}
      </Cluster>
    </nav>
  );
}

const chip = (option: InsightsIndexFilterOption) =>
  option.count === undefined ? option.label : `${option.label} ${option.count}`;

/* ── The format shapes ────────────────────────────────────────────────────────── */

/** How many a format's group on the hub shows at most. The format's own page holds the rest. */
export const CAPACITY: Record<InsightsIndexKind, number> = {
  article: 4,
  event: 3,
  podcast: 3,
  research: 3,
  video: 6,
  interview: 3,
  guide: 6,
};

/** A group whose shape carries an image: the covered shapes, and the catalogue when it is pictured. */
export function isVisual(group: {
  kind: InsightsIndexKind;
  items: readonly InsightsIndexItem[];
}) {
  if (group.kind === 'guide') return pictured(group.items);
  return isCovered(group.kind);
}

/**
 * The groups in FORMAT_ORDER, re-dealt so a covered group and a text group take turns (CLAUDE.md:
 * never two text-heavy blocks back to back) whichever formats are present and whichever have covers.
 * Each kind keeps its place within its own run; a surplus of text groups can only go at the end.
 */
export function alternate<
  T extends { kind: InsightsIndexKind; items: readonly InsightsIndexItem[] },
>(groups: readonly T[]): T[] {
  const visual = groups.filter((group) => isVisual(group));
  const text = groups.filter((group) => !isVisual(group));
  const out: T[] = [];
  while (visual.length > 0 || text.length > 0) {
    const v = visual.shift();
    if (v) out.push(v);
    const t = text.shift();
    if (t) out.push(t);
  }
  return out;
}

/**
 * One format's group on the hub, in the format's own shape. Every shape's titles in a SET step down
 * to the small card step (h5) and only a lead keeps the large one (h3), so a group has one clear
 * lead and the set under it reads as its list (critique 16 Oct 2026: 28 against 34, the lead barely
 * led). A list of rows ends without its closing rule: the next group's hairline is the seam.
 */
export function FormatShape({
  kind,
  items,
  title,
}: {
  kind: InsightsIndexKind;
  items: readonly InsightsIndexItem[];
  title: string;
}): ReactNode {
  switch (kind) {
    case 'article':
      return <Lead items={items} />;
    case 'event':
      return <Ledger items={items} open />;
    case 'podcast':
      return <Episode items={items} />;
    case 'research':
      return <Reports items={items} />;
    case 'video':
      /* The group is already a region named by its heading ("Videos"); the carousel inside it
         takes a name of its own, or a screen reader meets two nested regions called the same.
         Slider's roledescription adds "carousel", so the label names the contents, not the device. */
      return <Rail items={items} label={`Latest ${title.toLowerCase()}`} />;
    case 'interview':
      return <Voices items={items} />;
    case 'guide':
      return <Catalogue items={items} />;
  }
}

/** A cover tile for a set: the cover (or its assigned stand-in), the label line, the title, its line. */
export const tile = (item: InsightsIndexItem): BlockCardSetItem => ({
  id: item.id,
  title: item.title,
  body: bodyOf(item),
  eyebrow: metaOf(item),
  media: coverOf(item) ?? standInOf(item),
  href: item.href,
});

/**
 * One item at full column: the cover on the left, the label line, the title at the lead step and
 * its standfirst. The newest article in its group, and the latest item on a format's page.
 * A podcast is pressed play on: "Listen", with its duration as the meta.
 */
export function LeadCard({
  item,
  titleAs = 'h3',
}: {
  item: InsightsIndexItem;
  titleAs?: 'h2' | 'h3';
}) {
  const podcast = item.kind === 'podcast';
  return (
    <ul>
      <BlockCard
        orientation="horizontal"
        imageSide="left"
        size="lg"
        titleAs={titleAs}
        title={item.title}
        body={bodyOf(item)}
        eyebrow={podcast ? dateOf(item.date) : metaOf(item)}
        media={coverOf(item) ?? standInOf(item)}
        href={item.href}
        {...(podcast
          ? { cue: 'cta' as const, ctaLabel: 'Listen', meta: item.duration }
          : { cue: 'title' as const })}
      />
    </ul>
  );
}

/**
 * Articles — the lead: the newest at full column with its cover beside its copy, then a row of three
 * covered cards under it at the small step. Size contrast in one group, where four equal tiles read
 * as one rectangle. Stacked on a phone, never a sideways row: the video rail is the hub's one
 * sideways device, and two scrollers back to back made the groups look alike (critique 16 Oct 2026).
 */
function Lead({ items }: { items: readonly InsightsIndexItem[] }) {
  const [first, ...rest] = items;
  if (!first) return null;
  return (
    <Layout rowGap="stack">
      <LeadCard item={first} />
      {rest.length > 0 ? (
        <BlockCardSet
          lead="none"
          across={3}
          size="sm"
          scroll="never"
          cue="title"
          items={rest.map(tile)}
        />
      ) : null}
    </Layout>
  );
}

/**
 * Events — the ledger: each row led by its date (in the title's ink), the place on the label line.
 * `open` leaves the last row without its closing rule, for a list whose container draws the seam.
 */
export function Ledger({
  items,
  open = false,
}: {
  items: readonly InsightsIndexItem[];
  open?: boolean;
}) {
  return (
    <Layout as="ul" rowGap="none">
      {items.map((item, index) => (
        <ListCard
          key={item.id}
          titleAs="h3"
          size="sm"
          eyebrow={metaOf(item, { date: false })}
          title={item.title}
          body={bodyOf(item)}
          href={item.href}
          /* An event with no date yet keeps the date column, saying so, so every row's copy starts
             on one edge; the publish date is never passed off as the event's. */
          marker={eventMarker(item)}
          rule={open && index === items.length - 1 ? 'none' : 'end'}
        />
      ))}
    </Layout>
  );
}

/** Podcasts — the episode: the newest as one wide card you press play on, earlier ones as rows. */
function Episode({ items }: { items: readonly InsightsIndexItem[] }) {
  const [latest, ...earlier] = items;
  if (!latest) return null;
  return (
    <Layout rowGap="stack">
      <LeadCard item={latest} />
      {earlier.length > 0 ? (
        <Layout as="ul" rowGap="none">
          {earlier.map((item, index) => (
            <ListCard
              key={item.id}
              titleAs="h3"
              size="sm"
              eyebrow={metaOf(item)}
              title={item.title}
              body={bodyOf(item)}
              href={item.href}
              rule={index === earlier.length - 1 ? 'none' : 'end'}
            />
          ))}
        </Layout>
      ) : null}
    </Layout>
  );
}

/** Research — the reports: each a head beside its body, the title at the group's largest card step. */
function Reports({ items }: { items: readonly InsightsIndexItem[] }) {
  return (
    <Layout as="ul" rowGap="column">
      {items.map((item) => (
        <BlockCard
          key={item.id}
          orientation="horizontal"
          size="md"
          title={item.title}
          body={bodyOf(item)}
          eyebrow={dateOf(item.date)}
          href={item.href}
          cue="cta"
          ctaLabel="Read the research"
          meta={lengthOf(item)}
        />
      ))}
    </Layout>
  );
}

/** Videos — the rail: covered cards you scrub through, three in view, at the small step. */
function Rail({ items, label }: { items: readonly InsightsIndexItem[]; label: string }) {
  return (
    <Slider label={label} perView={3}>
      {items.map((item) => {
        const card = tile(item);
        return (
          <BlockCard
            key={card.id}
            tracks={3}
            size="sm"
            title={card.title}
            body={card.body}
            eyebrow={card.eyebrow}
            media={card.media}
            href={card.href}
            cue="title"
          />
        );
      })}
    </Slider>
  );
}

/** Interviews — voices: text tiles, the headline is the conversation. */
function Voices({ items }: { items: readonly InsightsIndexItem[] }) {
  return (
    <BlockCardSet
      lead="none"
      cue="title"
      across={3}
      size="sm"
      standIns={false}
      items={items.map((item) => ({ ...tile(item), media: undefined }))}
    />
  );
}

/** A row's thumbnail from a cover, a drawn scene or the assigned stand-in. */
function thumbOf(item: InsightsIndexItem): ListCardMarker | undefined {
  if (item.cover?.src.trim()) return { type: 'thumbnail', image: item.cover };
  const media = standInOf(item);
  if (media?.type === 'sketch') return { type: 'sketch', name: media.name };
  if (media?.type === 'image') return { type: 'thumbnail', image: media.image };
  return undefined;
}

/**
 * Guides — the catalogue: rows in two columns, with thumbnails when the set is pictured (`pictured`)
 * and as text otherwise — a set is all-image or all-text, never one with holes. Each column ends
 * without its closing rule: the next group's hairline is the seam.
 */
function Catalogue({ items }: { items: readonly InsightsIndexItem[] }) {
  const thumbnails = pictured(items);
  const half = Math.ceil(items.length / 2);
  const columns = items.length > 3 ? [items.slice(0, half), items.slice(half)] : [items];
  return (
    <Layout columns={{ base: 1, lg: columns.length }} colGap="gutter" rowGap="none">
      {columns.map((column, index) => (
        <Layout as="ul" rowGap="none" key={index}>
          {column.map((item, row) => (
            <ListCard
              key={item.id}
              titleAs="h3"
              size="sm"
              arrangement="stacked"
              eyebrow={lengthOf(item)}
              title={item.title}
              body={bodyOf(item)}
              href={item.href}
              marker={thumbnails ? thumbOf(item) : undefined}
              /* The last row of the list as a whole: below lg the columns stack into one list,
                 so only the second column's last row (or the only column's) opens. */
              rule={row === column.length - 1 && index === columns.length - 1 ? 'none' : 'end'}
            />
          ))}
        </Layout>
      ))}
    </Layout>
  );
}

/* ── The archive ──────────────────────────────────────────────────────────────── */

/**
 * A format's whole archive, on its own page (15 Oct 2026: the hub's feed moved here, the claude
 * model — the hub previews every category, each category's page holds all of it).
 *
 * Above the items, ONE compact row: the first topic group as a line of filter Tags with counts
 * ("All" first; a sideways scroll on a phone, never a wrap), and every other group behind one
 * "More filters" Tag (`variant="disclosure"`, the chip's own height) on the same row. While
 * something is held, a short summary says so — "Showing", each held filter removable, "Clear all".
 * Every control is a link the page built: the state is the URL, and nothing needs script.
 *
 * The items in one anatomy, so the eye learns it once and scans:
 *   covered      borderless cover tiles, three across — cover, date · length, serif title, line
 *   text         hairline rows — events led by their date (the record's date, never the publish
 *                date) in one column; the rest title and standfirst, two columns from lg, with no
 *                thumbnail
 * Never the two hybridised, and never a row set where some rows have a picture and some do not.
 */
export function Archive({
  archive,
  kind,
  covered,
}: {
  archive: InsightsIndexArchive;
  kind: InsightsIndexKind;
  /** Cover tiles, or rows. The page decides from the kind and whether the set is pictured. */
  covered: boolean;
}) {
  const moreHeld = archive.filters.reduce(
    (sum, group) => sum + group.options.filter((option) => option.selected).length,
    0,
  );
  const above = archive.above ?? 0;

  const topicLine =
    archive.primary.length > 1 ? (
      <nav aria-label={archive.primaryLabel} className={styles.scroller}>
        <Cluster as="ul" colGap="text" nowrap>
          {archive.primary.map((option) => (
            <li key={option.id}>
              <Tag variant="filter" href={option.href} selected={option.selected}>
                {chip(option)}
              </Tag>
            </li>
          ))}
        </Cluster>
      </nav>
    ) : null;
  const moreFilters =
    archive.filters.length > 0 ? (
      <details className={styles.more}>
        <Tag variant="disclosure" icon={<Icon name="alt-arrow-down" />}>
          {moreHeld > 0 ? `More filters ${moreHeld}` : 'More filters'}
        </Tag>
        <div className={styles.panel}>
          <Layout rowGap="gutter">
            {archive.filters.map((group) => (
              /* A control group, not a document section: its name is a label the group points at,
                 so the heading outline holds only content (h2 "All …" → h3 item titles). */
              <div
                key={group.id}
                role="group"
                aria-labelledby={`${archive.id}-filter-${group.id}`}
              >
                <Layout rowGap="text">
                  <p id={`${archive.id}-filter-${group.id}`} className={styles.filterLabel}>
                    {group.label}
                  </p>
                  <Cluster as="ul" colGap="text" rowGap="text">
                    {group.options.map((option) => (
                      <li key={option.id}>
                        <Tag
                          variant="filter"
                          href={option.href}
                          selected={option.selected}
                          icon={
                            option.selected ? (
                              <Icon name="close-circle" label="Clear filter" />
                            ) : undefined
                          }
                        >
                          {chip(option)}
                        </Tag>
                      </li>
                    ))}
                  </Cluster>
                </Layout>
              </div>
            ))}
          </Layout>
        </div>
      </details>
    ) : null;
  const controls =
    topicLine && moreFilters ? (
      /* The arrangement follows what is present: the topic line and the disclosure share a row
         ([1, auto]) only when both exist; alone, the line takes the column and the disclosure sits
         at its end. One height across the row: both are Tags. */
      <Layout columns={{ base: [1, 'auto'] }} colGap="block" align="center">
        {topicLine}
        {moreFilters}
      </Layout>
    ) : moreFilters ? (
      <Layout justifyItems="end">{moreFilters}</Layout>
    ) : (
      topicLine
    );

  return (
    <ContentSection
      id={archive.id}
      heading={archive.heading}
      headingId={`${archive.id}-heading`}
      headingSize="md"
      surface="paper"
    >
      <Layout rowGap="stack">
        <Layout rowGap="text">
          {controls}

          {archive.held.length > 0 ? (
            /* What is held, read in order: "Showing [SaaS ×] · Clear all". The count is the line
               under the items, said once (critique 16 Oct 2026: "11 of 16 showing" read backwards
               and repeated it). */
            <Cluster colGap="text" rowGap="text" align="center">
              <p className={styles.count}>Showing</p>
              <Cluster as="ul" colGap="text" rowGap="text">
                {archive.held.map((held) => (
                  <li key={held.id}>
                    <Tag
                      variant="filter"
                      href={held.href}
                      selected
                      icon={<Icon name="close-circle" label="Remove filter" />}
                    >
                      {held.label}
                    </Tag>
                  </li>
                ))}
              </Cluster>
              {archive.clearHref ? (
                <Button
                  as="a"
                  href={archive.clearHref}
                  emphasis="link"
                  tone="neutral"
                  className={styles.keep}
                >
                  Clear all
                </Button>
              ) : null}
            </Cluster>
          ) : (
            /* Nothing held: the size of the archive and its order. */
            <p className={styles.count}>{`${archive.all} ${archive.noun} · newest first`}</p>
          )}
        </Layout>

        {archive.items.length > 0 ? (
          <Layout rowGap="stack">
            {covered ? (
              <BlockCardSet
                lead="none"
                across={3}
                size="sm"
                scroll="never"
                cue="title"
                items={archive.items.map(tile)}
              />
            ) : kind === 'event' ? (
              <Ledger items={archive.items} />
            ) : (
              /* Two columns from lg, read across: a text row is a title and a line, and one column
                 of them at 1240 left most of the band empty to the right of a 500px title (critique
                 16 Oct 2026). Rows in one grid line their rules up across the pair. */
              <Layout as="ul" columns={{ base: 1, lg: 2 }} colGap="gutter" rowGap="none">
                {archive.items.map((item) => (
                  <ListCard
                    key={item.id}
                    titleAs="h3"
                    size="sm"
                    arrangement="stacked"
                    eyebrow={metaOf(item)}
                    title={item.title}
                    body={bodyOf(item)}
                    href={item.href}
                  />
                ))}
              </Layout>
            )}
            {/* Where the reader is, then the way on: "13 of 42 shown", and "Show more" as a link to
                the next page, so it works without script and a reader can share where they got to. */}
            <Cluster colGap="block" rowGap="text" align="center">
              <p className={styles.count}>
                {`${archive.items.length + above} of ${archive.total + above} shown`}
                {archive.held.length > 0 ? (
                  <VisuallyHidden>{` — ${archive.total} of ${archive.all} ${archive.noun} match the filters`}</VisuallyHidden>
                ) : null}
              </p>
              {archive.moreHref ? (
                <Button
                  as="a"
                  href={archive.moreHref}
                  emphasis="link"
                  tone="primary"
                  icon={<Icon name="alt-arrow-down" />}
                >
                  Show more
                </Button>
              ) : null}
            </Cluster>
          </Layout>
        ) : (
          <Cluster colGap="block" rowGap="text" align="center">
            <p className={styles.empty}>Nothing matches these filters.</p>
            {archive.clearHref ? (
              <Button
                as="a"
                href={archive.clearHref}
                emphasis="link"
                tone="primary"
                className={styles.keep}
              >
                Clear all
              </Button>
            ) : null}
          </Cluster>
        )}
      </Layout>
    </ContentSection>
  );
}
