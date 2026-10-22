import { Layout } from '@/components';
import { splitClaim } from '@/lib/claim';
import { BlockCardSet, CaseCard, ListCard, type BlockCardImage } from '@/patterns';

import type { ListingView } from './ListingIndex';

/* ── The case-study index, as ListingIndex data ────────────────────────────────────
   What the case-study index puts in the listing's sections: its groups of cases, each shaped by its
   position and its count. Built here and handed to ListingIndex, which places them as it places the
   insights hub's — one opening, one rail, one section head and one close (owner, 22 Oct 2026). */

/**
 * One case study as the index shows it. The template's own shape, not the view model's: a template
 * may not import @/content, so the page maps its record onto this and the template never learns
 * where the record came from.
 */
export type CaseItem = {
  id: string;
  href: string;
  title: string;
  /** The one line under the title: 8–15 words (strapi-changes.md §13). */
  description: string;
  cover?: BlockCardImage;
  /**
   * The description as trusted inline HTML, one entry per paragraph (page-mapping G3). Exclusive
   * with `description`, which it replaces where a card carries more than a line ("Our role: …").
   */
  bodyHtml?: readonly string[];
  /** The cta wording on a featured card ("Read the Doodle case"). Absent, the card's default. */
  ctaLabel?: string;
  /**
   * A case the page features: it leads its group as ONE card (CaseCard, home's selected-work shape),
   * in whichever group and view it falls. The card carries no testimonial (owner, 22 Oct 2026:
   * "case study cards never hold testimonials in them").
   */
  featured?: boolean;
};

/** One group of cases under its own heading (page-mapping G9), one jump target in the rail. */
export type CaseGroup = {
  /** The group's anchor, unique across every view (every view is in the HTML). */
  id: string;
  heading: string;
  items: readonly CaseItem[];
};

/** One way of sorting the cases (BY STAGE, BY INDUSTRY) and its groups. */
export type CaseView = {
  id: string;
  label: string;
  groups: readonly CaseGroup[];
};

/**
 * The case-study index's views as listing views. A group's ARRANGEMENT is decided here from its
 * position and its count, never from its id, so a new group arrives already shaped. Its featured
 * cases lead (CaseCard, a `gutter` apart, the second mirrored as on home); the rest take:
 *
 *   first, four or more   the featured set: the first case leads at full width, the rest under it
 *                         (BlockCardSet `auto`, ruling C3), each with a cta
 *   five or more          thumbnail rows in two columns, a denser catalogue shape than the covers
 *   one to four           covers, linked whole cards: four as two pairs, the rail's column being
 *                         too narrow for four across
 *
 * Neighbouring groups differ because their counts differ, which is the variation the page needs
 * without a ground change.
 */
export function caseViews(views: readonly CaseView[]): ListingView[] {
  return views.map((view) => ({
    id: view.id,
    label: view.label,
    sections: view.groups
      .filter((group) => group.items.length > 0)
      .map((group, index) => ({
        id: group.id,
        heading: group.heading,
        count: group.items.length,
        content: <CaseGroupShape items={group.items} first={index === 0} />,
      })),
  }));
}

/** The record's body: its HTML paragraphs where it has them, else its one line. */
const bodyOf = (item: CaseItem) =>
  item.bodyHtml ? { bodyHtml: item.bodyHtml } : { body: item.description };

const coverOf = (item: CaseItem) =>
  item.cover ? { media: { type: 'image' as const, image: item.cover } } : {};

/** A cover with its intrinsic size, 16:9 where the record states none. */
const sized = (cover: BlockCardImage) => ({
  ...cover,
  width: cover.width ?? 1600,
  height: cover.height ?? 900,
});

/** One group's cases: its featured cases, then the rest in the shape their position and count call for. */
function CaseGroupShape({ items, first }: { items: readonly CaseItem[]; first: boolean }) {
  /* A featured case needs its cover to be the one card: without one it joins the set. */
  const featured = items.filter((item) => item.featured && item.cover);
  const rest = items.filter((item) => !featured.includes(item));

  return (
    <Layout rowGap="stack">
      {featured.length > 0 ? (
        <Layout rowGap="gutter">
          {featured.map((item, row) => (
            <CaseCard
              key={item.id}
              {...splitClaim(item.title)}
              {...bodyOf(item)}
              href={item.href}
              ctaLabel={item.ctaLabel ?? 'Read the case'}
              image={sized(item.cover!)}
              reverse={row % 2 === 1}
            />
          ))}
        </Layout>
      ) : null}
      {rest.length > 0 ? <CaseSet items={rest} first={first} /> : null}
    </Layout>
  );
}

/** A group's other cases, in the shape their position and count call for. */
function CaseSet({ items, first }: { items: readonly CaseItem[]; first: boolean }) {
  /* The first group, four or more: the featured set. */
  if (first && items.length >= 4) {
    return (
      <BlockCardSet
        lead="auto"
        cue="cta"
        scroll="never"
        items={items.map((item) => ({
          id: item.id,
          title: item.title,
          ...bodyOf(item),
          ...coverOf(item),
          href: item.href,
          ctaLabel: item.ctaLabel,
        }))}
      />
    );
  }

  /* Five or more: thumbnail rows, two columns, filled down the first and then the second. */
  if (items.length >= 5) {
    const half = Math.ceil(items.length / 2);
    const columns = [items.slice(0, half), items.slice(half)];
    return (
      <Layout columns={{ base: 1, lg: 2 }} colGap="gutter" rowGap="none">
        {columns.map((column, index) => (
          <Layout as="ul" rowGap="none" key={index}>
            {column.map((item) => (
              <ListCard
                key={item.id}
                titleAs="h3"
                title={item.title}
                href={item.href}
                marker={
                  item.cover ? { type: 'thumbnail', image: sized(item.cover) } : undefined
                }
                {...bodyOf(item)}
              />
            ))}
          </Layout>
        ))}
      </Layout>
    );
  }

  /* One to four: covers, each a whole-card link, stacked on a phone (no case sliders, home round
     1). Four go as two pairs: four across the rail's column would be about 220 a card. */
  return (
    <BlockCardSet
      lead="none"
      cue="title"
      scroll="never"
      across={items.length === 4 ? 2 : undefined}
      items={items.map((item) => ({
        id: item.id,
        title: item.title,
        ...bodyOf(item),
        ...coverOf(item),
        href: item.href,
      }))}
    />
  );
}
