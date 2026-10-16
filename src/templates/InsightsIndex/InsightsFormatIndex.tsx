import { Section } from '@/components';
import { heroTrail } from '@/lib/trail';
import { Breadcrumbs, CtaSection, PageHero, type BreadcrumbItem } from '@/patterns';

import {
  Archive,
  FormatRow,
  LeadCard,
  isCovered,
  pictured,
  type InsightsIndexArchive,
  type InsightsIndexClosing,
  type InsightsIndexFilterOption,
  type InsightsIndexItem,
  type InsightsIndexKind,
} from './shared';

export type InsightsFormatIndexProps = {
  /** The format this page lists. Decides the latest band and the archive's shape. */
  kind: InsightsIndexKind;
  breadcrumbs: readonly BreadcrumbItem[];
  hero: { title: string; lede?: string };
  /** The family's format row, this format selected and "All" back to the hub. See `FormatRow`. */
  formatRow?: readonly InsightsIndexFilterOption[];
  /**
   * The format's featured item, or its newest, at full column — shown only for the covered kinds
   * (articles, videos, podcasts): a text-only lead is just a bigger row. The page leaves it out of
   * the archive and counts it into the archive's `above`.
   */
  latest?: InsightsIndexItem;
  archive: InsightsIndexArchive;
  /** The hub's close, rendered only with its action. */
  closing?: InsightsIndexClosing;
};

/** Whether a format shows its latest item at full column above the archive. */
export const hasLatest = (kind: InsightsIndexKind) => isCovered(kind);

/**
 * InsightsFormatIndex — one insights format's own page, /insights/articles and its siblings (the
 * listings redesign, 15 Oct 2026; claude.com/resources/articles): the second level under the hub,
 * holding everything the hub previews.
 *
 *   A  hero      the trail (Home / Insights / Articles), the h1 and lede at the index density, and
 *                the family's tab row with this format current — the one way between the formats
 *   B  latest    the featured or newest item at full column, its cover beside its copy (covered
 *                kinds only)
 *   C  archive   "All articles": the topic filters, then every item, twelve at a time, newest first
 *   D  close     the hub's ask, on tint, only with its action
 */
export function InsightsFormatIndex({
  kind,
  breadcrumbs,
  hero,
  formatRow = [],
  latest,
  archive,
  closing,
}: InsightsFormatIndexProps) {
  const lede = hero.lede?.trim();
  const showLatest = latest !== undefined && hasLatest(kind);
  /* Cover tiles for the covered kinds, and for guides when the set is pictured (from 80% carrying an
     image of their own, the rest their assigned stand-in); hairline text rows otherwise, every one
     without a picture. Decided once, by the set (critique 16 Oct 2026). Never hybridised. */
  const covered = isCovered(kind) || (kind === 'guide' && pictured(archive.items));

  return (
    <>
      <PageHero
        data-fold-hero=""
        trail={heroTrail(breadcrumbs, hero.title, (t) => (
          <Breadcrumbs {...t} />
        ))}
        title={hero.title}
        body={lede ? [lede] : undefined}
        density="index"
        surface="paper"
      >
        {formatRow.length > 1 ? <FormatRow options={formatRow} /> : null}
      </PageHero>

      {showLatest ? (
        <Section surface="paper" aria-label="Latest">
          {/* Directly under the h1 with no band heading between, so its title is an h2. */}
          <LeadCard item={latest} titleAs="h2" />
        </Section>
      ) : null}

      <div data-fold-exempt="Index list: the format's whole archive, read by scrolling (visual-direction § 1.3).">
        <Archive archive={archive} kind={kind} covered={covered} />
      </div>

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
