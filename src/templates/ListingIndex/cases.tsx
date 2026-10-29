import { Layout } from '@/components';
import { splitClaim } from '@/lib/claim';
import { BlockCard, type BlockCardImage } from '@/patterns';

import { ListingGrid } from './compositions';
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
  /** The case's page. Absent for a case the copy lists before its page exists ("Case study coming
      soon"): its card is shown, unlinked, and it never leads a group. */
  href?: string;
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
   * A case the page features: it leads its group as the listing's horizontal card (the insights
   * hub's lead: cover across two thirds, copy in the third, no ground), one case to a row, in
   * whichever group and view it falls. Never CaseCard on its paper-deep ground, which is home's
   * alone (owner, 29 Oct 2026). The card carries no testimonial (owner, 22 Oct 2026: "case study
   * cards never hold testimonials in them").
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
 * The case-study index's views as listing views. Every group is the insights hub's shape (owner,
 * 29 Oct 2026: "the /case-studies page is horrible. what happened to using the same 3 card grid?";
 * decisions/2026-10-29-case-index-is-the-listing-grid): its featured cases first, each the card-less
 * horizontal lead on a row of its own, then every other case as a card in the listing's one
 * three-track grid (`ListingGrid`, the same the hub's shelves use). No arrangement is chosen by a
 * group's id, position or count any more: the varied shapes (a featured set, two columns of
 * thumbnail rows, 2-up large covers) were the problem, not a feature.
 */
export function caseViews(views: readonly CaseView[]): ListingView[] {
  return views.map((view) => ({
    id: view.id,
    label: view.label,
    sections: view.groups
      .filter((group) => group.items.length > 0)
      .map((group) => ({
        id: group.id,
        heading: group.heading,
        count: group.items.length,
        content: <CaseGroupShape items={group.items} />,
      })),
  }));
}

/** The record's body: its HTML paragraphs where it has them, else its one line. */
const bodyOf = (item: CaseItem) =>
  item.bodyHtml ? { bodyHtml: item.bodyHtml } : { body: item.description || undefined };

const coverOf = (item: CaseItem) =>
  item.cover ? { media: { type: 'image' as const, image: sized(item.cover) } } : {};

/** A cover with its intrinsic size, 16:9 where the record states none. */
const sized = (cover: BlockCardImage) => ({
  ...cover,
  width: cover.width ?? 1600,
  height: cover.height ?? 900,
});

/** One group's cases: its featured leads, then the rest in the listing grid. */
function CaseGroupShape({ items }: { items: readonly CaseItem[] }) {
  /* A featured case needs its cover and its page to be a lead: without them it joins the grid. */
  const featured = items.filter((item) => item.featured && item.cover && item.href);
  const rest = items.filter((item) => !featured.includes(item));

  return (
    <Layout rowGap="column">
      {featured.length > 0 ? (
        /* One lead to a row, each the hub's lead exactly: the cover leading, so a phone stacks every
           one cover-first (a mirrored lead put its cover UNDER its words below md, where the DOM
           order decides). Not compact on a phone: a case card's words ("What we did", "Best for")
           are the copy's, and the compact row drops its body. */
        <Layout as="ul" rowGap="column">
          {featured.map((item) => (
            <BlockCard
              key={item.id}
              {...splitClaim(item.title)}
              {...bodyOf(item)}
              {...coverOf(item)}
              href={item.href}
              orientation="horizontal"
              size="lg"
              tracks={2}
              titleAs="h3"
              cue="cta"
              ctaLabel={item.ctaLabel ?? 'Read the case'}
              split="grid"
            />
          ))}
        </Layout>
      ) : null}
      {rest.length > 0 ? (
        /* The hub's cards: the small step, the whole card the link. A case listed before its page
           exists ("Case study coming soon") keeps its place, unlinked, at the same size as its
           neighbours — never the largest placeholder on the page. */
        <ListingGrid>
          {rest.map((item) => (
            <BlockCard
              key={item.id}
              title={item.title}
              {...bodyOf(item)}
              {...coverOf(item)}
              href={item.href}
              size="sm"
              tracks={3}
              titleAs="h3"
              cue="title"
            />
          ))}
        </ListingGrid>
      ) : null}
    </Layout>
  );
}
