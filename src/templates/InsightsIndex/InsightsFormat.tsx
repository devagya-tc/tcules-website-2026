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

/** The grid's turn: a pictured pair, a row of headlines, a pictured trio, a row of headlines. */
type Beat = 'pair' | 'trio' | 'plain';
const BEATS: readonly Beat[] = ['pair', 'plain', 'trio', 'plain'];

/**
 * One page's worth of pieces composed into beats, each beat its own shape — a pair of pictures at
 * the larger step, a row of three, a row of headlines — turning so the grid never runs one
 * rectangle down the page. Pictured and typographic pieces each keep their date order.
 */
function beats(items: readonly InsightsIndexItem[]) {
  const pictured = items.filter(hasPicture);
  const plain = items.filter((item) => !hasPicture(item));
  const out: { beat: Beat; items: InsightsIndexItem[] }[] = [];
  let turn = 0;
  while (pictured.length > 0 || plain.length > 0) {
    const beat = BEATS[turn++ % BEATS.length]!;
    const take =
      beat === 'plain'
        ? plain.splice(0, 3)
        : pictured.splice(0, beat === 'pair' ? 2 : 3);
    if (take.length > 0) out.push({ beat, items: take });
  }
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
                  <div key={index} id={index > 0 ? `page-${index + 1}` : undefined} className={styles.page}>
                    <Layout rowGap="column">
                      {beats(page).map(({ beat, items: set }, b) =>
                        beat === 'pair' ? (
                          <Pair key={b} items={set} withKind={false} titleAs="h2" />
                        ) : (
                          <Layout key={b} as="ul" columns={{ md: 3 }} colGap="gutter" rowGap="column">
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
              <Cluster colGap="block" rowGap="text" align="center">
                <p className={styles.count}>{`${items.length} of ${total}`}</p>
                {moreHref ? (
                  <Button
                    as="a"
                    href={moreHref}
                    emphasis="link"
                    tone="primary"
                    icon={<Icon name="alt-arrow-down" />}
                  >
                    Show more
                  </Button>
                ) : null}
              </Cluster>
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
