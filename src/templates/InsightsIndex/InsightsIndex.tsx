import { Button, Cluster, Icon, Layout, Media, Section, type MediaImage } from '@/components';
import { FULL_COLUMN } from '@/lib/image-sizes';
import { heroTrail } from '@/lib/trail';
import {
  BlockCardSet,
  Breadcrumbs,
  ContentSection,
  CtaRow,
  CtaSection,
  IndexGroup,
  ListCard,
  PageHero,
  TableOfContents,
  type BreadcrumbItem,
  type HeroAction,
} from '@/patterns';

import styles from './InsightsIndex.module.css';
import {
  CAPACITY,
  FormatRow,
  FormatShape,
  LABEL,
  alternate,
  kindsPresent,
  bodyOf,
  coverOf,
  dateOf,
  lengthOf,
  line,
  parse,
  standInOf,
  type InsightsIndexClosing,
  type InsightsIndexCollection,
  type InsightsIndexFilterOption,
  type InsightsIndexFormat,
  type InsightsIndexItem,
  type InsightsIndexKind,
} from './shared';

export type InsightsIndexProps = {
  breadcrumbs: readonly BreadcrumbItem[];
  hero: { title: string; lede?: string; eyebrow?: string };
  /**
   * The family's format row in the hero: "All" (selected here), then each format with content and
   * its count, each linking to that format's own page. See `FormatRow`.
   */
  formatRow?: readonly InsightsIndexFilterOption[];
  /** Every resource, newest first. */
  items: readonly InsightsIndexItem[];
  /** The editor's lead story. Absent, the newest item with a cover, else the newest. */
  featuredId?: string;
  /** Each format's title, sentence and page. "All 42 articles" goes to `href`. */
  formats?: readonly InsightsIndexFormat[];
  collections?: readonly InsightsIndexCollection[];
  /**
   * The Lab: the other organisation's offer, the page's one dark band (owner, 13 Oct 2026: ink, not
   * blue). `visual` is the image it carries beside its words — the commissioned Lab illustration,
   * a register placeholder until it exists (owner, 13 Oct 2026). The page passes the record.
   */
  lab?: { heading: string; body?: string; action: HeroAction; visual?: MediaImage };
  /** Rendered only with its action: a close without an ask is not one. */
  closing?: InsightsIndexClosing;
};

/** The front page's curated mix beside the lead. */
const MIX = 4;

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

/** Events by when they happen, newest first; everything else in the order given. */
const byRecord = (items: InsightsIndexItem[]) =>
  items[0]?.kind === 'event'
    ? items.sort(
        (a, b) =>
          (parse(b.event?.startsAt)?.valueOf() ?? -Infinity) -
          (parse(a.event?.startsAt)?.valueOf() ?? -Infinity),
      )
    : items;

const anchorOf = (kind: InsightsIndexKind) => `format-${kind}`;

/** The fold rule's exception for the railed run (visual-direction § 1.3). */
const FOLD_EXEMPT =
  'Index list: read by scrolling beside its outline (visual-direction § 1.3).';

/**
 * InsightsIndex — the insights hub (docs/specs/InsightsIndex.md; the listings redesign, 15 Oct 2026,
 * after claude.com/resources: a listing organised by category that makes every section one click
 * away).
 *
 *   A  hero          the trail, the h1, the lede, and the format row — the family's sub-nav
 *   B  featured      one lead story with its cover, and four headlines beside it, full width
 *   C  formats       one IndexGroup per format beside a sticky "On this page" rail: each group its
 *                    OWN shape, so the run never repeats one rectangle, each with "All 42 …" out to
 *                    the format's own page, where its whole archive lives
 *   D  collections   "start with your problem": reading lists by topic, each with its service
 *   E  lab           the other organisation's offer, the page's one dark (ink) band — on tint
 *                    as the last band when there is no close, never ink on the ink footer
 *   F  close         the ask, on tint, only with an action
 *
 * The live /insights and /design/insights-index render this one composition: the route passes what
 * the CMS holds, the specimen passes the stress fixture.
 */
export function InsightsIndex({
  breadcrumbs,
  hero,
  formatRow = [],
  items,
  featuredId,
  formats = [],
  collections = [],
  lab,
  closing,
}: InsightsIndexProps) {
  const { lead, mix } = frontPage(items, featuredId);
  const onFront = new Set([lead, ...mix].filter(Boolean).map((item) => item!.id));

  const present = kindsPresent(items).flatMap((kind) => {
    const all = byRecord(items.filter((item) => item.kind === kind));
    const fresh = all.filter((item) => !onFront.has(item.id));
    const format = formats.find((candidate) => candidate.kind === kind);
    return [
      {
        kind,
        title: format?.title?.trim() || LABEL[kind].many,
        lead: format?.lead,
        href: format?.href,
        count: all.length,
        /* Items already in Featured step aside when the group has others to show. */
        items: (fresh.length > 0 ? fresh : all).slice(0, CAPACITY[kind]),
      },
    ];
  });
  const groups = alternate(present);
  /* The Lab is the page's one dark band only while the close stands between it and the footer
     (critique 16 Oct 2026: with no close, ink met the ink footer and the two read as one slab). With
     no close the Lab IS the page's last ask, so it takes the close's ground: the order no longer
     depends on whether the content carries an action. Two tinted bands cannot meet: the close is
     absent exactly when the Lab is tint, and the band above the Lab is always paper. */
  const closes = closing?.action !== undefined;
  const labSurface = closes ? 'ink' : 'tint';
  const railed = groups.length >= 2;
  const lede = hero.lede?.trim();

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
        {formatRow.length > 1 ? <FormatRow options={formatRow} /> : null}
      </PageHero>

      {lead ? (
        <Section surface="paper" aria-label="Featured">
          {/* The set sits directly under the h1 with no band heading between, so its titles are the
              page's h2s. The mix are HEADLINES — format, date, title, no standfirst — so four of them
              stand as tall as the lead's cover and copy, the way a front page's rail of headlines
              balances its lead story. Full width, outside the rail: the page's visual anchor. */}
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
              media: index === 0 ? (coverOf(item) ?? standInOf(item)) : undefined,
            }))}
          />
        </Section>
      ) : null}

      {items.length === 0 ? (
        /* Nothing published: no outline over nothing, just the sentence that says so. */
        <Section surface="paper">
          <p>Nothing has been published yet.</p>
        </Section>
      ) : null}

      {groups.length > 0 ? (
        <div data-fold-exempt={FOLD_EXEMPT}>
          <Section as="div" surface="paper" data-band="index">
            {/* The claude "Jump to": the rail stays put while the groups scroll, so every format is
                one click away from anywhere in the run (TableOfContents; LongformShell's shell). */}
            <Layout
              columns={railed ? { base: 1, lg: [1, 4] } : { base: 1 }}
              colGap="column"
              rowGap="stack"
              align="start"
            >
              {railed ? (
                <TableOfContents
                  items={groups.map((group) => ({
                    label: group.title,
                    href: `#${anchorOf(group.kind)}-heading` as const,
                  }))}
                />
              ) : null}
              <Layout rowGap="column">
                {groups.map((group) => (
                  <IndexGroup
                    key={group.kind}
                    id={anchorOf(group.kind)}
                    heading={group.title}
                    headingId={`${anchorOf(group.kind)}-heading`}
                    lead={group.lead}
                    actions={
                      group.href ? (
                        <CtaRow
                          rule={false}
                          actions={[
                            {
                              label: `All ${group.count} ${group.title.toLowerCase()}`,
                              href: group.href,
                            },
                          ]}
                        />
                      ) : undefined
                    }
                  >
                    <FormatShape kind={group.kind} items={group.items} title={group.title} />
                  </IndexGroup>
                ))}
              </Layout>
            </Layout>
          </Section>
        </div>
      ) : null}

      {collections.length > 0 ? <Collections collections={collections} /> : null}

      {lab ? (
        lab.visual ? (
          /* The Lab on ink (owner, 13 Oct 2026), its words in the head track and its illustration
             filling the two-thirds track at 16:9: a band with one thing to show, not an empty slab
             of colour. A register placeholder holds the slot until the illustration is drawn. */
          <ContentSection
            id="lab"
            heading={lab.heading}
            headingId="lab-heading"
            lead={lab.body?.trim() ? lab.body : undefined}
            surface={labSurface}
            arrangement="beside"
            actions={<CtaRow rule={false} actions={[lab.action]} />}
          >
            <Media image={lab.visual} sizes={FULL_COLUMN} />
          </ContentSection>
        ) : (
          <CtaSection
            arrangement="offer"
            surface={labSurface}
            heading={lab.heading}
            body={lab.body?.trim() ? [lab.body] : undefined}
            actions={[lab.action]}
          />
        )
      ) : null}

      {closes && closing?.action ? (
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

/* ── D · collections ──────────────────────────────────────────────────────────── */

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
