import type { ReactNode } from 'react';

import { Layout, Prose } from '@/components';
import { BlockCard, ServiceTile, TEASER_FORMAT_ICON } from '@/patterns';
import type { SketchName } from '@/lib/sketches';

import styles from './ListingIndex.module.css';
import type { ListingFinder, ListingSection, ListingView } from './ListingIndex';
import { listingFinder, type FinderArgs } from './listingFinder';
import {
  byEventDate,
  CardGrid,
  hasPicture,
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

/* ── BY PROBLEM · the copy's shelves ─────────────────────────────────────────────
   The 26 Oct 2026 copy curates the hub by the problem a reader is working on ("sorted by the problem
   you are working on"): five shelves of two or three pieces, each closing on the related service.
   The view the hub opens on while nothing is picked; the finder still holds every piece. */

/** One shelf: the problem as its head, the pieces the copy names, and its closing line. */
export type InsightShelf = {
  /** The section's anchor (the copy's band id). */
  id: string;
  heading: string;
  /** The pieces, in the copy's order, each as the copy titles and describes it. */
  items: readonly InsightItem[];
  /** The shelf's closing line ("Our related service: …") as trusted inline HTML, its link kept. */
  noteHtml?: string;
  /**
   * The related service or expertise the closing line names: a card in the shelf's grid (owner,
   * 29 Oct 2026; decisions/2026-10-29-named-services-are-service-tiles,
   * decisions/2026-10-29-related-destination-is-a-card). `eyebrow` is the line's own words before
   * the link ("Our related service"), set as the tile's eyebrow. A service draws its own `scene`; an
   * expertise shows its sector `picture` (or its labelled placeholder), composed by the route.
   */
  related?: ShelfRelated;
};

/** What a shelf's closing line names, as its tile. */
export type ShelfRelated = {
  kind: 'service' | 'expertise';
  eyebrow: string;
  title: string;
  href: string;
  scene?: SketchName;
  picture?: ReactNode;
};

/**
 * The shelves as listing sections. Three pieces led by a pictured one open on the horizontal lead
 * with the other two under it (the hub's group, 2026-10-29-listing-cards-topic-tag-three-tracks);
 * two pieces, or three without a pictured first, are cards in two or three of the three tracks. A
 * piece with no picture is still a card: the panel led by its format's glyph. The closing line
 * follows the cards, a `block` under them: it answers the shelf, it does not head it.
 */
export function shelfSections(shelves: readonly InsightShelf[]): ListingSection[] {
  return shelves
    .filter((shelf) => shelf.items.length > 0)
    .map((shelf) => ({
      id: shelf.id,
      heading: shelf.heading,
      count: shelf.items.length,
      content: <Shelf items={shelf.items} noteHtml={shelf.noteHtml} related={shelf.related} />,
    }));
}

/** The related tile's action: one wording for every tile of its kind (owner, 29 Oct 2026). */
const RELATED_ACTION: Record<ShelfRelated['kind'], string> = {
  service: 'Explore the service',
  expertise: 'Explore the expertise',
};

function Shelf({
  items,
  noteHtml,
  related,
}: {
  items: readonly InsightItem[];
  noteHtml?: string;
  related?: ShelfRelated;
}) {
  const [first, ...rest] = items;
  const led = first && items.length >= 3 && hasPicture(first);
  /* The related service or expertise is a card in the grid, after the pieces: eyebrow, title, its
     visual in the middle, the action at its foot (2026-10-29-related-destination-is-a-card). Where
     the pieces fill whole rows, it would sit alone on a row, so it takes the whole row instead, its
     words beside its visual (2026-10-29-media-rows-take-a-whole-row). */
  const inGrid = led ? rest.length : items.length;
  const wide = inGrid > 0 && inGrid % 3 === 0;
  const after = related ? (
    <li data-media-row={wide ? '' : undefined}>
      <ServiceTile
        title={related.title}
        href={related.href}
        eyebrow={related.eyebrow}
        scene={related.scene}
        picture={related.picture}
        action={RELATED_ACTION[related.kind]}
        wide={wide}
      />
    </li>
  ) : undefined;
  /* A shelf with no pictured piece is a row of panels, the results' card for a piece without a
     picture (2026-10-29-pictureless-piece-is-a-panel-card): the ruled text tiles it took before were
     a third card look on one page, the rows that ruling dropped (review 29 Oct). */
  return (
    <Layout rowGap="block">
      {led ? (
        <Feature lead={first} cards={rest} shelf after={after} />
      ) : (
        <CardGrid cards={items} shelf after={after} />
      )}
      {noteHtml ? <Prose html={`<p>${noteHtml}</p>`} /> : null}
    </Layout>
  );
}

/* ── The formats, as tiles ──────────────────────────────────────────────────────
   The copy's "Browse Tcules insights by format" table (Format | What you will find | Best for) as the
   format tiles the hub's approved front page had (owner, 16 Oct 2026: keep main's format tiles;
   29 Oct 2026: "render it as cards"; decisions/2026-10-29-format-table-is-tiles): each format's glyph
   heads its tile, its name (the link) is the title, what you will find is the body and "Best for"
   a labelled line under it. Every authored word stays. */

/** One row of the format table: a format (with its glyph) or another way in (the authors index). */
export type FormatTileRow = {
  /** The format, for its glyph. Absent: not a format (Authors), set as a quiet line under the tiles. */
  kind?: InsightKind;
  name: string;
  /** Where the name goes: the finder with the format picked. Absent: no page yet, the name unlinked. */
  href?: string;
  /** "What you will find", as trusted inline HTML. */
  findHtml: string;
  /** "Best for", as trusted inline HTML, and its label as the table heads its column. */
  bestFor?: { label: string; html: string };
};

/**
 * The format tiles: one tile per format, four in a row where the column holds them (1440) and two by
 * two below, so four tiles never leave one alone on a row; a row that is not a format (Authors: no
 * glyph of its own, an index of people rather than a kind of piece, and no page yet) is a quieter
 * line under the set, rather than a fifth tile that would sit alone.
 */
export function FormatTiles({ rows }: { rows: readonly FormatTileRow[] }) {
  const tiles = rows.filter((row) => row.kind);
  const others = rows.filter((row) => !row.kind);
  const escape = (text: string) =>
    text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const bestForHtml = (row: FormatTileRow) =>
    row.bestFor ? `<strong>${row.bestFor.label}:</strong> ${row.bestFor.html}` : undefined;
  return (
    <Layout rowGap="stack">
      <Layout as="ul" columns={{ base: 1, md: 2, xl: 4 }} colGap="gutter" rowGap="column">
        {tiles.map((row) => (
          <BlockCard
            key={row.name}
            title={row.name}
            href={row.href}
            icon={TEASER_FORMAT_ICON[row.kind as InsightKind]}
            bodyHtml={[row.findHtml, ...(row.bestFor ? [bestForHtml(row) as string] : [])]}
            size="md"
            tracks={3}
            cue="title"
          />
        ))}
      </Layout>
      {others.length > 0 ? (
        /* Each a quiet pair of lines: the name and what you will find, then "Best for". */
        <Layout rowGap="text">
          {others.map((row) => (
            <Layout key={row.name} rowGap="tight">
              <p
                className={styles.aside}
                dangerouslySetInnerHTML={{
                  __html: `<strong>${row.href ? `<a href="${escape(row.href)}">${escape(row.name)}</a>` : escape(row.name)}:</strong> ${row.findHtml}`,
                }}
              />
              {row.bestFor ? (
                <p
                  className={styles.aside}
                  dangerouslySetInnerHTML={{ __html: bestForHtml(row) as string }}
                />
              ) : null}
            </Layout>
          ))}
        </Layout>
      ) : null}
    </Layout>
  );
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
   The listing's one finder (finder.tsx) with the insights' results: one grid of cards, each saying
   its format and date, a piece without a picture its panel. */

/** The insights finder for ListingIndex: the groups the route read, and the pieces they let through. */
export function insightFinder({
  items,
  shown,
  ...rest
}: Omit<FinderArgs, 'total' | 'results'> & {
  /** Every piece the picks let through, newest first. */
  items: readonly InsightItem[];
}): ListingFinder {
  return listingFinder({
    ...rest,
    shown,
    total: items.length,
    results: (
      <CardGrid
        cards={items.slice(0, shown)}
        meta={{ withKind: true }}
        titleAs="h2"
        facts
      />
    ),
  });
}
