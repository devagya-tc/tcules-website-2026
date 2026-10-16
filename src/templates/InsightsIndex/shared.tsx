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
  /** ISO 8601. Orders nothing here (the page passes items newest first); it is shown. */
  publishedAt?: string;
  /** "11 min read". */
  readingTime?: string;
  /** "48 min". */
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
   * A catalogue photograph standing in for the missing cover (visual-direction § 5.7), assigned to
   * THIS item in data, one photograph per item over the family, so an item keeps one stand-in on
   * every page and no photograph repeats. Never chosen by the template.
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

/** The length of the thing: reading time for the read formats, duration for the watched ones. */
export const lengthOf = (item: InsightsIndexItem) => item.duration ?? item.readingTime;

export const bodyOf = (item: InsightsIndexItem) =>
  item.description?.trim() ? item.description : undefined;

export const coverOf = (item: InsightsIndexItem): BlockCardSetItem['media'] =>
  item.cover?.src.trim() ? { type: 'image', image: item.cover } : undefined;

type CoverMedia = NonNullable<BlockCardSetItem['media']>;

/** A stable small number from an id, so a texture field belongs to its item, not to render order. */
function hashOf(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return hash;
}

/**
 * The cover for an item that has none (owner, 13 Oct 2026): the scene drawn for that article where
 * it has one, else the stand-in photograph the page assigned it in data, else a texture field whose
 * recipe follows from the item's id. A pure function of the item (critique 16 Oct 2026): the
 * template never deals photographs out in call order, so an item looks the same on every page and
 * a photograph cannot repeat once a small pool runs out. Never a generic scene.
 */
export function standInOf(item: InsightsIndexItem): CoverMedia {
  if (item.scene) return { type: 'sketch', name: item.scene };
  if (item.standIn?.src.trim())
    return { type: 'image', image: { ...item.standIn, standIn: true } };
  return { type: 'texture', recipe: (hashOf(item.id) % 3) as 0 | 1 | 2 };
}

/** The kinds whose items are pictures first: a cover leads the card. */
const COVERED: ReadonlySet<InsightsIndexKind> = new Set(['article', 'video', 'podcast']);
export const isCovered = (kind: InsightsIndexKind) => COVERED.has(kind);

/** The kinds present in `items`, in the family's order. */
export const kindsPresent = (items: readonly InsightsIndexItem[]) =>
  FORMAT_ORDER.filter((kind) => items.some((item) => item.kind === kind));

/** Whether every item carries an image of its own — a real cover or the scene drawn for it. */
export const allOwnImages = (items: readonly InsightsIndexItem[]) =>
  items.length > 0 && items.every((item) => coverOf(item) !== undefined || item.scene);

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
 * The family's one way between its pages (15 Oct 2026; the claude.com/resources sub-nav, in Tcules'
 * vocabulary): "All", then every format with content and its count, each a link to that format's
 * page, the current one selected. In the hero of the hub and of every format page, so they navigate
 * as one family. One line at every width: it scrolls sideways where it runs out of room, never wraps.
 */
export function FormatRow({ options }: { options: readonly InsightsIndexFilterOption[] }) {
  if (options.length < 2) return null;
  return (
    <nav aria-label="Insights formats" className={styles.formats}>
      {/* Both gaps `text` (16): a Tag is 24 x 24, the AA target floor, so the clearance comes from
          the row. */}
      <Cluster as="ul" colGap="text" nowrap>
        {options.map((option) => (
          <li key={option.id}>
            {/* Each link is a page of the family, so the selected one is the page you are on. */}
            <Tag variant="filter" href={option.href} selected={option.selected} current="page">
              {chip(option)}
            </Tag>
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

/** A group whose shape carries an image: the covered shapes, and the catalogue when it has thumbnails. */
export function isVisual(group: {
  kind: InsightsIndexKind;
  items: readonly InsightsIndexItem[];
}) {
  if (group.kind === 'guide') return group.items.every((item) => thumbOf(item) !== undefined);
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
      return <Ledger items={items} />;
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

/** A card record for a set, eyebrowed with what the group does not already say: date, length. */
export const card = (item: InsightsIndexItem): BlockCardSetItem => ({
  id: item.id,
  title: item.title,
  body: bodyOf(item),
  eyebrow: line(dateOf(item.publishedAt), lengthOf(item)),
  media: coverOf(item),
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
        eyebrow={
          podcast ? dateOf(item.publishedAt) : line(dateOf(item.publishedAt), lengthOf(item))
        }
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
 * covered cards under it. Size contrast in one group, where four equal tiles read as one rectangle.
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
          cue="title"
          items={rest.map((item) => ({
            ...card(item),
            media: coverOf(item) ?? standInOf(item),
          }))}
        />
      ) : null}
    </Layout>
  );
}

/** Events — the ledger: each row led by its date, the place on the label line. */
export function Ledger({ items }: { items: readonly InsightsIndexItem[] }) {
  return (
    <Layout as="ul" rowGap="none">
      {items.map((item) => (
        <ListCard
          key={item.id}
          titleAs="h3"
          size="md"
          eyebrow={item.event?.place}
          title={item.title}
          body={bodyOf(item)}
          href={item.href}
          /* An event with no date yet keeps the date column, saying so, so every row's copy starts
             on one edge; the publish date is never passed off as the event's. */
          marker={eventMarker(item)}
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
          {earlier.map((item) => (
            <ListCard
              key={item.id}
              titleAs="h3"
              size="sm"
              eyebrow={line(dateOf(item.publishedAt), item.duration)}
              title={item.title}
              body={bodyOf(item)}
              href={item.href}
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
          eyebrow={dateOf(item.publishedAt)}
          href={item.href}
          cue="cta"
          ctaLabel="Read the research"
          meta={item.readingTime}
        />
      ))}
    </Layout>
  );
}

/** Videos — the rail: covered cards you scrub through, three in view. */
function Rail({ items, label }: { items: readonly InsightsIndexItem[]; label: string }) {
  return (
    <Slider label={label} perView={3}>
      {items.map((item) => (
        <BlockCard
          key={item.id}
          tracks={3}
          size="md"
          title={item.title}
          body={bodyOf(item)}
          eyebrow={line(dateOf(item.publishedAt), item.duration)}
          media={coverOf(item) ?? standInOf(item)}
          href={item.href}
          cue="title"
        />
      ))}
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
      standIns={false}
      items={items.map((item) => ({ ...card(item), media: undefined }))}
    />
  );
}

/** A row's thumbnail from a cover, a drawn scene or a stand-in; a texture field has no thumbnail form. */
function thumbOf(item: InsightsIndexItem): ListCardMarker | undefined {
  if (item.cover?.src.trim()) {
    return { type: 'thumbnail', image: item.cover };
  }
  const media = standInOf(item);
  if (media.type === 'sketch') return { type: 'sketch', name: media.name };
  if (media.type === 'image') return { type: 'thumbnail', image: media.image };
  return undefined;
}

/**
 * Guides — the catalogue: rows in two columns, with thumbnails when every guide has one and as text
 * when any lacks one (a set is all-image or all-text, never one with holes).
 */
function Catalogue({ items }: { items: readonly InsightsIndexItem[] }) {
  const thumbs = items.map((item) => thumbOf(item));
  const thumbnails = thumbs.every(Boolean);
  const half = Math.ceil(items.length / 2);
  const indexed = items.map((item, i) => ({
    item,
    marker: thumbnails ? thumbs[i] : undefined,
  }));
  const columns = items.length > 3 ? [indexed.slice(0, half), indexed.slice(half)] : [indexed];
  return (
    <Layout columns={{ base: 1, lg: columns.length }} colGap="gutter" rowGap="none">
      {columns.map((column, index) => (
        <Layout as="ul" rowGap="none" key={index}>
          {column.map(({ item, marker }) => (
            <ListCard
              key={item.id}
              titleAs="h3"
              size="sm"
              arrangement="stacked"
              eyebrow={item.readingTime}
              title={item.title}
              body={bodyOf(item)}
              href={item.href}
              marker={marker}
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
 * Above the items, ONE compact row: the first topic group as a line of options with counts ("All"
 * first; a sideways scroll on a phone, never a wrap), and every other group behind one native "More
 * filters" disclosure on the same row. While something is held, a short summary says so, each item
 * removable, with "Clear all". Every control is a link the page built: the state is the URL, and
 * nothing needs script.
 *
 * The items in one anatomy, so the eye learns it once and scans:
 *   covered kinds   borderless cover tiles, three across — cover, date · length, serif title, line
 *   text kinds      hairline rows — events led by their date, the record's date, never the publish
 * Never the two hybridised.
 */
export function Archive({
  archive,
  kind,
  covered,
}: {
  archive: InsightsIndexArchive;
  kind: InsightsIndexKind;
  /** Cover tiles, or rows. The page decides from the kind and whether every item has an image. */
  covered: boolean;
}) {
  const moreHeld = archive.filters.reduce(
    (sum, group) => sum + group.options.filter((option) => option.selected).length,
    0,
  );
  const above = archive.above ?? 0;

  const topicLine =
    archive.primary.length > 1 ? (
      <nav aria-label="Topic" className={styles.formats}>
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
        <summary className={styles.toggle}>
          <Cluster as="span" colGap="tight" align="center" nowrap>
            {/* "More" folds away on a phone so the line keeps the room; the word
                "filters" and the count still say what it is. */}
            <span>
              <span className={styles.moreWord}>More </span>filters
            </span>
            {moreHeld > 0 ? <span className={styles.toggleCount}>{moreHeld}</span> : null}
            <span className={styles.toggleGlyph}>
              <Icon name="alt-arrow-down" />
            </span>
          </Cluster>
        </summary>
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
          {/* The arrangement follows what is present: the topic line and the disclosure share a row
              ([1, auto]) only when both exist; alone, the line takes the column and the disclosure
              sits at its end. */}
          {topicLine && moreFilters ? (
            <Layout columns={{ base: [1, 'auto'] }} colGap="block" align="center">
              {topicLine}
              {moreFilters}
            </Layout>
          ) : moreFilters ? (
            <Layout justifyItems="end">{moreFilters}</Layout>
          ) : (
            topicLine
          )}

          {archive.held.length > 0 ? (
            <Cluster colGap="text" rowGap="text" align="center">
              <p className={styles.count}>
                {`${archive.total} of ${archive.all}`}
                <VisuallyHidden> {archive.noun} match.</VisuallyHidden>
              </p>
              <span className={styles.count}>Showing</span>
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
                scroll="never"
                cue="title"
                items={archive.items.map((item) => ({
                  ...card(item),
                  media: coverOf(item) ?? standInOf(item),
                }))}
              />
            ) : (
              <Layout as="ul" rowGap="none">
                {archive.items.map((item) =>
                  kind === 'event' ? (
                    <ListCard
                      key={item.id}
                      titleAs="h3"
                      size="md"
                      eyebrow={item.event?.place}
                      title={item.title}
                      body={bodyOf(item)}
                      href={item.href}
                      marker={eventMarker(item)}
                    />
                  ) : (
                    <ListCard
                      key={item.id}
                      titleAs="h3"
                      size="md"
                      arrangement="stacked"
                      eyebrow={line(dateOf(item.publishedAt), lengthOf(item))}
                      title={item.title}
                      body={bodyOf(item)}
                      href={item.href}
                      marker={thumbOf(item)}
                      markerPosition="end"
                    />
                  ),
                )}
              </Layout>
            )}
            {/* Where the reader is, then the way on: "13 of 42 shown", and "Show more" as a link to
                the next page, so it works without script and a reader can share where they got to. */}
            <Cluster colGap="block" rowGap="text" align="center">
              <p className={styles.count}>
                {`${archive.items.length + above} of ${archive.total + above} shown`}
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
            <p>Nothing matches these filters.</p>
            {archive.clearHref ? (
              <Button as="a" href={archive.clearHref} emphasis="link" tone="primary">
                Clear all
              </Button>
            ) : null}
          </Cluster>
        )}
      </Layout>
    </ContentSection>
  );
}
