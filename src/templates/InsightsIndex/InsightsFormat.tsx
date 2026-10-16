import { Button, Cluster, Icon, Layout, Section } from '@/components';
import { CARD_TWO_TRACKS } from '@/lib/image-sizes';
import { heroTrail } from '@/lib/trail';
import {
  Breadcrumbs,
  CtaSection,
  IndexRail,
  PageHero,
  Teaser,
  type BreadcrumbItem,
  type HeroAction,
} from '@/patterns';

import styles from './InsightsIndex.module.css';
import {
  dateMarkerOf,
  hasPicture,
  Pair,
  teaserOf,
  type InsightsIndexItem,
  type InsightsIndexKind,
} from './shared';

export type InsightsFormatProps = {
  breadcrumbs: readonly BreadcrumbItem[];
  kind: InsightsIndexKind;
  hero: { title: string; lede?: string };
  /** The rail's picker: every format with content, the current one marked. */
  formats: readonly { label: string; href: string; current?: boolean }[];
  /** Every piece of this format the page shows, newest first: the pages read so far, in order. */
  items: readonly InsightsIndexItem[];
  /** How many pages `items` spans, and how many a page holds (the first page adds the feature). */
  pageSize: number;
  /** How many of this format exist. */
  total: number;
  /** The next page's URL (server-rendered "Show more"). Present while more exist. */
  moreHref?: string;
  closing?: { eyebrow?: string; heading: string; body?: string; action?: HeroAction };
};

/** A beat of the grid: a pictured row of two or three, a lone picture laid beside its words, or a
    row of headlines. */
type Beat = 'pair' | 'trio' | 'single' | 'plain';

/**
 * How a run of pictured pieces splits into rows: twos and threes, turning, and never a row with a
 * hole in it — a remainder of one borrows from the row before, and a lone piece is laid beside its
 * words instead of standing in half a row.
 */
function rowsOf(n: number, turn = 0): number[] {
  if (n <= 0) return [];
  if (n <= 3) return [n];
  if (n === 4) return [2, 2];
  const first = turn % 2 === 0 ? 2 : 3;
  const rest = n - first;
  return rest === 1
    ? [first === 2 ? 3 : 2, ...rowsOf(n - (first === 2 ? 3 : 2), turn + 1)]
    : [first, ...rowsOf(rest, turn + 1)];
}

/**
 * One page's worth of pieces composed into beats, each its own shape — a pair of pictures at the
 * larger step, a row of three, a row of headlines — turning so the grid never runs one rectangle
 * down the page. Pictured and typographic pieces each keep their date order; a row of headlines
 * follows every pictured row while there are headlines to give.
 */
function beats(items: readonly InsightsIndexItem[]) {
  const pictured = items.filter(hasPicture);
  const plain = items.filter((item) => !hasPicture(item));
  const out: { beat: Beat; items: InsightsIndexItem[] }[] = [];
  for (const size of rowsOf(pictured.length)) {
    const set = pictured.splice(0, size);
    out.push({ beat: size === 1 ? 'single' : size === 2 ? 'pair' : 'trio', items: set });
    if (plain.length > 0) out.push({ beat: 'plain', items: plain.splice(0, 3) });
  }
  while (plain.length > 0) out.push({ beat: 'plain', items: plain.splice(0, 3) });
  return out;
}

/**
 * InsightsFormat — one format's own page (/insights/articles …; owner, 16 Oct 2026, after
 * claude.com/resources/articles): a big hero with the format's name and one line, the rail beside
 * the content as a picker of formats, the newest piece with a picture featured large, then every
 * other piece in a grid of turning beats, with a server-rendered "Show more". No filters.
 */
export function InsightsFormat({
  breadcrumbs,
  kind,
  hero,
  formats,
  items,
  pageSize,
  total,
  moreHref,
  closing,
}: InsightsFormatProps) {
  const feature = items.find(hasPicture);
  const rest = items.filter((item) => item !== feature);
  const firstPage = pageSize;
  const pages = [rest.slice(0, firstPage)];
  for (let start = firstPage; start < rest.length; start += pageSize) {
    pages.push(rest.slice(start, start + pageSize));
  }
  const dated = kind === 'event';
  const lede = hero.lede?.trim();

  /* An event's typographic piece is headed by its date: the numeral is what a reader scans for. */
  const shape = (item: InsightsIndexItem) =>
    dated && !hasPicture(item) ? { date: dateMarkerOf(item), meta: item.event?.place } : {};

  return (
    <>
      <PageHero
        data-fold-hero=""
        trail={heroTrail(breadcrumbs, hero.title, (t) => (
          <Breadcrumbs {...t} />
        ))}
        title={hero.title}
        body={lede ? [lede] : undefined}
        texture
        surface="paper"
      />

      <Section surface="paper" aria-label={hero.title}>
        <IndexRail
          ariaLabel="Insights by type"
          label="Browse by type"
          modes={[{ id: 'type', label: 'By type', items: formats }]}
        >
          {items.length === 0 ? (
            <p>Nothing has been published here yet.</p>
          ) : (
            <Layout rowGap="column">
              {feature ? (
                <ul>
                  <Teaser
                    {...teaserOf(feature, false)}
                    arrangement="beside"
                    size="xl"
                    titleAs="h2"
                    sizes={CARD_TWO_TRACKS}
                  />
                </ul>
              ) : null}
              {pages.map((page, index) =>
                page.length > 0 ? (
                  <div
                    key={index}
                    id={index > 0 ? `page-${index + 1}` : undefined}
                    className={styles.page}
                  >
                    <Layout rowGap="column">
                      {beats(page).map(({ beat, items: set }, b) =>
                        beat === 'pair' ? (
                          <Pair key={b} items={set} withKind={false} titleAs="h2" />
                        ) : beat === 'single' && set[0] ? (
                          <ul key={b}>
                            <Teaser
                              {...teaserOf(set[0], false)}
                              arrangement="beside"
                              size="lg"
                              titleAs="h2"
                              sizes={CARD_TWO_TRACKS}
                            />
                          </ul>
                        ) : (
                          <Layout
                            key={b}
                            as="ul"
                            columns={{ md: 3 }}
                            colGap="gutter"
                            rowGap="column"
                          >
                            {set.map((item) => (
                              <Teaser
                                key={item.id}
                                {...teaserOf(item, false)}
                                {...shape(item)}
                                size="md"
                                titleAs="h2"
                                compact
                              />
                            ))}
                          </Layout>
                        ),
                      )}
                    </Layout>
                  </div>
                ) : null,
              )}
              {moreHref ? (
                /* Where the reader is, then the way on — only while there is more to show. */
                <Cluster colGap="block" rowGap="text" align="center">
                  <p className={styles.count}>{`${items.length} of ${total}`}</p>
                  <Button
                    as="a"
                    href={moreHref}
                    emphasis="link"
                    tone="primary"
                    icon={<Icon name="alt-arrow-down" />}
                  >
                    Show more
                  </Button>
                </Cluster>
              ) : null}
            </Layout>
          )}
        </IndexRail>
      </Section>

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
