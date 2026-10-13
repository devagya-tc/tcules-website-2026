import type { ReactNode } from 'react';

import {
  Button,
  Cluster,
  Icon,
  Layout,
  Section,
  Tag,
  type IconName,
  type SketchName,
} from '@/components';
import { heroTrail } from '@/lib/trail';
import {
  BlockCard,
  BlockCardSet,
  Breadcrumbs,
  ContentSection,
  CtaRow,
  CtaSection,
  ListCard,
  PageHero,
  Slider,
  type BlockCardImage,
  type BlockCardSetItem,
  type BreadcrumbItem,
  type HeroAction,
  type ListCardMarker,
} from '@/patterns';

import styles from './InsightsIndex.module.css';

/* ── The template's own shapes ────────────────────────────────────────────────────
   A template may not import @/content, so the page maps the view model onto these and the
   template never learns whether the CMS or the specimen's fixture answered. */

/** The seven formats. The template decides each one's shape and position from this. */
export type InsightsIndexKind =
  'article' | 'guide' | 'research' | 'podcast' | 'video' | 'event' | 'interview';

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
   * The generated graphics that suit this item, best first — Sketch scenes chosen by the page from
   * the item's topic, service or format (the mapping is data, in the page's mapping, never here). A
   * missing cover takes the first that its neighbour did not just take, before any photograph.
   */
  graphics?: readonly SketchName[];
};

/** What the page says about one format: its band title, its one sentence, where "All …" goes. */
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
  /** The URL with this option applied — or, when `selected`, with its group cleared. */
  href: string;
  selected: boolean;
};

export type InsightsIndexFilterGroup = {
  id: string;
  label: string;
  options: readonly InsightsIndexFilterOption[];
};

export type InsightsIndexFeed = {
  /** The band's id: the fragment every filter and "Show more" href ends in. */
  id: string;
  heading: string;
  lead?: string;
  /** The rows on screen: already filtered and paged by the page. */
  items: readonly InsightsIndexItem[];
  /** How many items match the held filters (all of them, with none held). */
  total: number;
  /** How many items exist. */
  all: number;
  filters: readonly InsightsIndexFilterGroup[];
  /** Clears every filter. Present only while one is held. */
  clearHref?: string;
  /** The next page. Present only while more match than are shown. */
  moreHref?: string;
};

export type InsightsIndexProps = {
  breadcrumbs: readonly BreadcrumbItem[];
  hero: { title: string; lede?: string; eyebrow?: string };
  /** Every resource, newest first. */
  items: readonly InsightsIndexItem[];
  /** The editor's lead story. Absent, the newest item with a cover, else the newest. */
  featuredId?: string;
  formats?: readonly InsightsIndexFormat[];
  collections?: readonly InsightsIndexCollection[];
  lab?: { heading: string; body?: string; action: HeroAction };
  feed: InsightsIndexFeed;
  /** Rendered only with its action: a close without an ask is not one. */
  closing?: { eyebrow?: string; heading: string; body?: string; action?: HeroAction };
  /**
   * Catalogue photographs for missing covers that no generated graphic suits (visual-direction
   * § 5.7: never labelled, replaced when the real cover exists). Taken in order down the page.
   * Absent or empty, the fallback is the card's own texture field.
   */
  standIns?: readonly BlockCardImage[];
};

/* ── Decisions the template owns ──────────────────────────────────────────────── */

/**
 * The formats in page order, each with its shape (docs/specs/InsightsIndex.md § 2). The order
 * alternates covered and text shapes, so two text bands never meet, and a format's shape follows
 * what the format IS rather than how many it has.
 */
const FORMAT_ORDER: readonly InsightsIndexKind[] = [
  'article',
  'event',
  'podcast',
  'research',
  'video',
  'interview',
  'guide',
];

const LABEL: Record<InsightsIndexKind, { one: string; many: string }> = {
  article: { one: 'Article', many: 'Articles' },
  guide: { one: 'Guide', many: 'Guides' },
  research: { one: 'Research', many: 'Research' },
  podcast: { one: 'Podcast', many: 'Podcasts' },
  video: { one: 'Video', many: 'Videos' },
  event: { one: 'Event', many: 'Events' },
  interview: { one: 'Interview', many: 'Interviews' },
};

/** How many a format's band shows at most. The feed below holds the rest. */
const CAPACITY: Record<InsightsIndexKind, number> = {
  article: 3,
  event: 4,
  podcast: 4,
  research: 3,
  video: 8,
  interview: 3,
  guide: 6,
};

/** The front page's curated mix beside the lead. */
const MIX = 4;

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

/** A label line from its parts, blanks dropped: "Podcast · 7 Oct 2026". */
const line = (...parts: (string | undefined)[]) =>
  parts.filter((part): part is string => Boolean(part?.trim())).join(' · ') || undefined;

/** The length of the thing: reading time for the read formats, duration for the watched ones. */
const lengthOf = (item: InsightsIndexItem) => item.duration ?? item.readingTime;

const bodyOf = (item: InsightsIndexItem) =>
  item.description?.trim() ? item.description : undefined;

const coverOf = (item: InsightsIndexItem): BlockCardSetItem['media'] =>
  item.cover?.src.trim() ? { type: 'image', image: item.cover } : undefined;

type CoverMedia = NonNullable<BlockCardSetItem['media']>;
/**
 * Hands out a cover for an item that has none, in the owner's order (13 Oct 2026): a GENERATED
 * graphic wherever the item maps to one (its `graphics`, skipping the scenes the last two stand-ins
 * used so neighbours differ), else the next catalogue photograph, else a texture field.
 */
type StandIn = (item: InsightsIndexItem) => CoverMedia;

function standInPool(pool: readonly BlockCardImage[]): StandIn {
  let next = 0;
  let recipe = 0;
  /* The last two scenes handed out: a row of three never shows one scene twice. */
  let recent: SketchName[] = [];
  return (item) => {
    const graphics = item.graphics ?? [];
    const sketch =
      graphics.find((name) => !recent.includes(name)) ??
      graphics.find((name) => name !== recent[recent.length - 1]);
    if (sketch) {
      recent = [...recent, sketch].slice(-2);
      return { type: 'sketch', name: sketch };
    }
    const image = pool.length > 0 ? pool[next++ % pool.length] : undefined;
    return image
      ? { type: 'image', image: { ...image, standIn: true } }
      : { type: 'texture', recipe: (recipe++ % 3) as 0 | 1 | 2 };
  };
}

/**
 * The front page: the lead, then up to four more — one per format before any format repeats, in
 * date order, so the mix reads as the hub's range rather than its four newest articles.
 */
function frontPage(items: readonly InsightsIndexItem[], featuredId: string | undefined) {
  const lead =
    items.find((item) => item.id === featuredId) ??
    items.find((item) => coverOf(item) !== undefined) ??
    items[0];
  if (!lead) return { lead: undefined, mix: [] as InsightsIndexItem[] };

  const rest = items.filter((item) => item.id !== lead.id);
  const mix: InsightsIndexItem[] = [];
  const kinds = new Set<InsightsIndexKind>([lead.kind]);
  for (const item of rest) {
    if (mix.length === MIX) break;
    if (!kinds.has(item.kind)) {
      kinds.add(item.kind);
      mix.push(item);
    }
  }
  for (const item of rest) {
    if (mix.length === MIX) break;
    if (!mix.includes(item)) mix.push(item);
  }
  return { lead, mix };
}

/* ── The template ─────────────────────────────────────────────────────────────── */

/**
 * InsightsIndex — the insights hub as a front page over an archive (owner, 13 Oct 2026; reference:
 * The Verge's home page). docs/specs/InsightsIndex.md.
 *
 *   A  masthead       the trail, the h1, the lede, and a jump to every format on the page
 *   B  front page     one lead story with its cover, and a curated mix beside it
 *   C  collections    "start with your problem": reading lists by topic, each with its service
 *   D  format bands   one per format, each its OWN shape, so the page never repeats one rectangle
 *   E  lab            the other organisation's offer, the page's one reserved (blue) band
 *   F  feed           everything, newest first, with the filters beside it, held in the URL
 *   G  close          the ask, on tint, only with an action
 *
 * The live /insights and /design/insights-index render this one composition: the route passes what
 * the CMS holds, the specimen passes the stress fixture.
 */
export function InsightsIndex({
  breadcrumbs,
  hero,
  items,
  featuredId,
  formats = [],
  collections = [],
  lab,
  feed,
  closing,
  standIns = [],
}: InsightsIndexProps) {
  const standIn = standInPool(standIns);
  const { lead, mix } = frontPage(items, featuredId);
  const onFront = new Set([lead, ...mix].filter(Boolean).map((item) => item!.id));

  const present = FORMAT_ORDER.flatMap((kind) => {
    const all = items.filter((item) => item.kind === kind);
    if (all.length === 0) return [];
    const fresh = all.filter((item) => !onFront.has(item.id));
    const format = formats.find((candidate) => candidate.kind === kind);
    return [
      {
        kind,
        title: format?.title?.trim() || LABEL[kind].many,
        lead: format?.lead,
        href: format?.href,
        count: all.length,
        /* Items already on the front page step aside when the band has others to show. */
        items: (fresh.length > 0 ? fresh : all).slice(0, CAPACITY[kind]),
      },
    ];
  });
  const bands = alternate(present, standIns.length > 0);

  const lede = hero.lede?.trim();
  const jumps =
    bands.length >= 2 ? (
      <nav aria-label="Formats on this page">
        <Cluster as="ul" colGap="block" rowGap="text">
          {bands.map((band) => (
            <li key={band.kind}>
              <Button
                as="a"
                href={`#${anchorOf(band.kind)}`}
                emphasis="link"
                tone="neutral"
                icon={<Icon name="alt-arrow-down" />}
              >
                {/* The count joins the label inside the Button's one label run, after an en space:
                    a typographic space in the text, not a box with spacing of its own (a Cluster
                    here broke the Button's inline row and dropped its glyph to a second line). */}
                {band.title}
                <span className={styles.jumpCount}>
                  <span className={styles.hidden}>,</span>
                  {'\u2002'}
                  {band.count}
                </span>
              </Button>
            </li>
          ))}
        </Cluster>
      </nav>
    ) : null;

  return (
    <>
      <PageHero
        data-fold-hero=""
        trail={heroTrail(breadcrumbs, hero.title, (t) => (
          <Breadcrumbs {...t} />
        ))}
        eyebrow={hero.eyebrow}
        title={hero.title}
        body={lede ? [lede] : undefined}
        texture
        surface="paper"
      >
        {jumps}
      </PageHero>

      {lead ? (
        <Section surface="paper" aria-label="Featured">
          {/* The set sits directly under the h1 with no band heading between, so its titles are the
              page's h2s (the case index's reason). The mix are HEADLINES — format, date, title, no
              standfirst — so four of them stand as tall as the lead's cover and copy, the way a
              front page's rail of headlines balances its lead story. */}
          <BlockCardSet
            lead="beside"
            cue="title"
            titleAs="h2"
            items={[lead, ...mix].map((item, index) => ({
              id: item.id,
              title: item.title,
              body: index === 0 ? bodyOf(item) : undefined,
              eyebrow:
                index === 0
                  ? line(LABEL[item.kind].one, dateOf(item.publishedAt), lengthOf(item))
                  : line(LABEL[item.kind].one, dateOf(item.publishedAt)),
              href: item.href,
              media: index === 0 ? (coverOf(item) ?? standIn(item)) : undefined,
            }))}
          />
        </Section>
      ) : null}

      {collections.length > 0 ? <Collections collections={collections} /> : null}

      {bands.map((band) => {
        const head = {
          id: anchorOf(band.kind),
          heading: band.title,
          headingId: `${anchorOf(band.kind)}-heading`,
          lead: band.lead,
        };
        const shape = (
          <FormatShape
            kind={band.kind}
            items={band.items}
            title={band.title}
            standIn={standIn}
          />
        );
        /* "All …" at the end of the heading's row: the band's way out to the rest of its format. */
        return band.href ? (
          <ContentSection
            key={band.kind}
            {...head}
            actionsAt="end"
            actions={
              <CtaRow
                rule={false}
                actions={[{ label: `All ${band.title.toLowerCase()}`, href: band.href }]}
              />
            }
          >
            {shape}
          </ContentSection>
        ) : (
          <ContentSection key={band.kind} {...head}>
            {shape}
          </ContentSection>
        );
      })}

      {lab ? (
        <CtaSection
          arrangement="offer"
          surface="blue"
          heading={lab.heading}
          body={lab.body?.trim() ? [lab.body] : undefined}
          actions={[lab.action]}
        />
      ) : null}

      <Feed feed={feed} />

      {closing?.action ? (
        <CtaSection
          arrangement="open"
          surface="tint"
          eyebrow={closing.eyebrow || undefined}
          heading={closing.heading}
          body={closing.body?.trim() ? [closing.body] : undefined}
          actions={[closing.action]}
        />
      ) : null}
    </>
  );
}

const anchorOf = (kind: InsightsIndexKind) => `format-${kind}`;

/** A band whose shape carries an image: the covered shapes, and the catalogue when it has covers. */
function isVisual(
  band: { kind: InsightsIndexKind; items: readonly InsightsIndexItem[] },
  hasPool: boolean,
) {
  if (band.kind === 'guide')
    return (
      hasPool ||
      band.items.every(
        (item) => coverOf(item) !== undefined || (item.graphics?.length ?? 0) > 0,
      )
    );
  return band.kind === 'article' || band.kind === 'podcast' || band.kind === 'video';
}

/**
 * The bands in FORMAT_ORDER, re-dealt so a covered band and a text band take turns (CLAUDE.md:
 * never two text-heavy bands back to back) whichever formats are present and whichever have covers.
 * Each kind keeps its place within its own group; a surplus of text bands can only go at the end,
 * which the specimen's sparse state shows does not happen with the CMS's formats.
 */
function alternate<T extends { kind: InsightsIndexKind; items: readonly InsightsIndexItem[] }>(
  bands: readonly T[],
  hasPool: boolean,
): T[] {
  const visual = bands.filter((band) => isVisual(band, hasPool));
  const text = bands.filter((band) => !isVisual(band, hasPool));
  const out: T[] = [];
  while (visual.length > 0 || text.length > 0) {
    const v = visual.shift();
    if (v) out.push(v);
    const t = text.shift();
    if (t) out.push(t);
  }
  return out;
}

/* ── C · collections ──────────────────────────────────────────────────────────── */

/**
 * Reading lists by problem, four across: each a glyph, a title and its sentence, then its pieces as
 * rows, then the service that answers the same problem. A set is all-glyph or no-glyph.
 */
function Collections({ collections }: { collections: readonly InsightsIndexCollection[] }) {
  const glyphs = collections.every((collection) => collection.icon !== undefined);
  return (
    <ContentSection
      id="start-with-your-problem"
      heading="Start with your problem"
      headingId="start-with-your-problem-heading"
      surface="paper"
    >
      <Layout
        as="ul"
        columns={{ base: 1, md: 2, lg: collections.length >= 4 ? 4 : collections.length }}
        colGap="gutter"
        rowGap="stack"
      >
        {collections.map((collection) => (
          <li key={collection.id}>
            <Layout rowGap="block">
              <Layout rowGap="text">
                {glyphs && collection.icon ? (
                  <span className={styles.topicIcon}>
                    <Icon name={collection.icon} />
                  </span>
                ) : null}
                <h3 className={styles.topicTitle}>{collection.title}</h3>
                <p className={styles.topicBody}>{collection.description}</p>
              </Layout>
              {collection.items.length > 0 ? (
                <Layout as="ul" rowGap="none">
                  {collection.items.map((piece) => (
                    <ListCard
                      key={piece.id}
                      arrangement="stacked"
                      size="sm"
                      title={piece.title}
                      href={piece.href}
                    />
                  ))}
                </Layout>
              ) : null}
              {collection.related ? (
                <Cluster>
                  <Button
                    as="a"
                    href={collection.related.href}
                    emphasis="link"
                    tone="primary"
                    icon={<Icon name="arrow-right" />}
                  >
                    {collection.related.label}
                  </Button>
                </Cluster>
              ) : null}
            </Layout>
          </li>
        ))}
      </Layout>
    </ContentSection>
  );
}

/* ── D · the format shapes ────────────────────────────────────────────────────── */

function FormatShape({
  kind,
  items,
  title,
  standIn,
}: {
  kind: InsightsIndexKind;
  items: readonly InsightsIndexItem[];
  title: string;
  standIn: StandIn;
}): ReactNode {
  switch (kind) {
    case 'article':
      return <Wide items={items} standIn={standIn} />;
    case 'event':
      return <Ledger items={items} />;
    case 'podcast':
      return <Episode items={items} standIn={standIn} />;
    case 'research':
      return <Reports items={items} />;
    case 'video':
      return <Rail items={items} label={title} standIn={standIn} />;
    case 'interview':
      return <Voices items={items} />;
    case 'guide':
      return <Catalogue items={items} standIn={standIn} />;
  }
}

/** A card record for a set, eyebrowed with what the band does not already say: date, length. */
const card = (item: InsightsIndexItem): BlockCardSetItem => ({
  id: item.id,
  title: item.title,
  body: bodyOf(item),
  eyebrow: line(dateOf(item.publishedAt), lengthOf(item)),
  media: coverOf(item),
  href: item.href,
});

/** Articles — the wide row: three covers in [2, 1, 1], so the newest is twice the others. */
function Wide({ items, standIn }: { items: readonly InsightsIndexItem[]; standIn: StandIn }) {
  return (
    <BlockCardSet
      lead={items.length === 3 ? 'wide' : 'none'}
      cue="title"
      items={items.map((item) => ({ ...card(item), media: coverOf(item) ?? standIn(item) }))}
    />
  );
}

/** Events — the ledger: each row led by its date, the place on the label line. */
function Ledger({ items }: { items: readonly InsightsIndexItem[] }) {
  return (
    <Layout as="ul" rowGap="none">
      {items.map((item) => {
        const date = parse(item.event?.startsAt);
        return (
          <ListCard
            key={item.id}
            titleAs="h3"
            size={items.length > 3 ? 'sm' : 'md'}
            eyebrow={item.event?.place}
            title={item.title}
            body={bodyOf(item)}
            href={item.href}
            /* An event with no date yet keeps the date column, saying so, so every row's copy
               starts on one edge; the publish date is never passed off as the event's. */
            marker={
              date && item.event
                ? {
                    type: 'date',
                    dateTime: item.event.startsAt,
                    day: DAY_OF_MONTH.format(date),
                    label: MONTH_YEAR.format(date),
                  }
                : { type: 'date', day: '—', label: 'Date TBC' }
            }
          />
        );
      })}
    </Layout>
  );
}

/** Podcasts — the episode: the newest as one wide card you press play on, earlier ones as rows. */
function Episode({
  items,
  standIn,
}: {
  items: readonly InsightsIndexItem[];
  standIn: StandIn;
}) {
  const [latest, ...earlier] = items;
  if (!latest) return null;
  return (
    <Layout rowGap="stack">
      <ul>
        <BlockCard
          orientation="horizontal"
          imageSide="left"
          size="lg"
          title={latest.title}
          body={bodyOf(latest)}
          eyebrow={dateOf(latest.publishedAt)}
          media={coverOf(latest) ?? standIn(latest)}
          href={latest.href}
          cue="cta"
          ctaLabel="Listen"
          meta={latest.duration}
        />
      </ul>
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

/** Research — the reports: each a head beside its body, the title at the band's largest card step. */
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
function Rail({
  items,
  label,
  standIn,
}: {
  items: readonly InsightsIndexItem[];
  label: string;
  standIn: StandIn;
}) {
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
          media={coverOf(item) ?? standIn(item)}
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
      standIns={false}
      items={items.map((item) => ({ ...card(item), media: undefined }))}
    />
  );
}

/**
 * Guides — the catalogue: rows in two columns, with thumbnails when every guide has a cover and as
 * text when any lacks one (a set is all-image or all-text, never one with holes).
 */
function Catalogue({
  items,
  standIn,
}: {
  items: readonly InsightsIndexItem[];
  standIn: StandIn;
}) {
  /* Each guide's thumbnail: its cover, else a generated scene or a stand-in photograph (a texture
     field has no thumbnail form, so it counts as missing). */
  const thumbs = items.map((item): ListCardMarker | undefined => {
    if (item.cover?.src.trim()) {
      return {
        type: 'thumbnail',
        image: {
          ...item.cover,
          width: item.cover.width ?? 1600,
          height: item.cover.height ?? 900,
        },
      };
    }
    const media = standIn(item);
    if (media.type === 'sketch') return { type: 'sketch', name: media.name };
    if (media.type === 'image') {
      const image = media.image;
      return {
        type: 'thumbnail',
        image: { ...image, width: image.width ?? 1600, height: image.height ?? 900 },
      };
    }
    return undefined;
  });
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

/* ── F · the feed ─────────────────────────────────────────────────────────────── */

/**
 * Everything, newest first, with its filters beside it (owner: the filters move from the top of the
 * page onto the feed they filter). Every control is a link the page built, so the state is the URL:
 * shareable, back-button safe, and indexable without script.
 */
function Feed({ feed }: { feed: InsightsIndexFeed }) {
  const filtered = feed.clearHref !== undefined;
  const count = filtered
    ? `${feed.total} of ${feed.all} match`
    : `${feed.all} ${feed.all === 1 ? 'piece' : 'pieces'}, newest first`;

  const held = feed.filters.reduce(
    (sum, group) => sum + group.options.filter((option) => option.selected).length,
    0,
  );
  const panel = (
    <Layout rowGap="gutter">
      {feed.filters.map((group) => (
        <Layout key={group.id} rowGap="text">
          <h3 className={styles.filterLabel}>{group.label}</h3>
          {/* Both gaps `text` (16): a Tag is 24 x 24, which MEETS the AA target floor without
              margin, so the clearance comes from the row (the old page's argument, kept). */}
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
                  {option.label}
                </Tag>
              </li>
            ))}
          </Cluster>
        </Layout>
      ))}
      {feed.clearHref ? (
        <Cluster>
          <Button
            as="a"
            href={feed.clearHref}
            emphasis="link"
            tone="neutral"
            icon={<Icon name="close-circle" />}
          >
            Clear all filters
          </Button>
        </Cluster>
      ) : null}
    </Layout>
  );

  /* Nothing published: no rail of filters over nothing, just the sentence that says so. */
  if (feed.all === 0) {
    return (
      <ContentSection
        id={feed.id}
        heading={feed.heading}
        headingId={`${feed.id}-heading`}
        lead={feed.lead}
      >
        <p>Nothing has been published yet.</p>
      </ContentSection>
    );
  }

  return (
    <ContentSection
      id={feed.id}
      heading={feed.heading}
      headingId={`${feed.id}-heading`}
      lead={feed.lead}
      surface="paper"
    >
      <Layout columns={{ base: 1, lg: [1, 2] }} colGap="section" rowGap="stack" align="start">
        <aside aria-label="Filter the feed" className={styles.rail}>
          <Layout rowGap="gutter">
            <p className={styles.feedCount}>{count}</p>
            {/* Below 1024 the groups fold into a native disclosure, closed, its control saying how
                many filters are held (owner, 13 Oct 2026); from 1024 they are the open sticky rail.
                Two renderings of one panel, each `display: none` at the other's widths, so exactly
                one is in the page and the accessibility tree at a time — and both work with no
                script: a <details> is the browser's own, and every chip is a link. */}
            <details className={styles.narrow}>
              <summary className={styles.toggle}>
                <Cluster as="span" justify="between" align="center" colGap="block" nowrap>
                  <span>
                    Filters
                    {held > 0 ? (
                      <span className={styles.toggleCount}>{`\u2002${held} active`}</span>
                    ) : null}
                  </span>
                  <span className={styles.toggleGlyph}>
                    <Icon name="alt-arrow-down" />
                  </span>
                </Cluster>
              </summary>
              <div className={styles.panel}>{panel}</div>
            </details>
            <div className={styles.wide}>{panel}</div>
          </Layout>
        </aside>

        <Layout rowGap="stack">
          {feed.items.length > 0 ? (
            <Layout as="ul" rowGap="none">
              {feed.items.map((item) => (
                <ListCard
                  key={item.id}
                  titleAs="h3"
                  size="sm"
                  arrangement="stacked"
                  eyebrow={line(LABEL[item.kind].one, dateOf(item.publishedAt), lengthOf(item))}
                  title={item.title}
                  body={bodyOf(item)}
                  href={item.href}
                />
              ))}
            </Layout>
          ) : (
            <p>Nothing matches these filters.</p>
          )}
          {feed.moreHref ? (
            <Cluster>
              <Button
                as="a"
                href={feed.moreHref}
                emphasis="link"
                tone="primary"
                icon={<Icon name="alt-arrow-down" />}
              >
                Show more
              </Button>
            </Cluster>
          ) : null}
        </Layout>
      </Layout>
    </ContentSection>
  );
}
