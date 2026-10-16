import type { ReactNode } from 'react';

import { Button, Cluster, Icon, Layout, Section } from '@/components';
import { heroTrail } from '@/lib/trail';
import {
  Breadcrumbs,
  IndexRail,
  PageHero,
  type BreadcrumbItem,
  type HeroAction,
} from '@/patterns';

import styles from './InsightsIndex.module.css';
import { InsightsClose, type InsightsLab } from './InsightsIndex';
import {
  byEventDate,
  Cover,
  Dates,
  dateOf,
  datesVary,
  Feature,
  Grid,
  hasPicture,
  Headlines,
  Index,
  Pair,
  partition,
  Showcase,
  Spread,
  type InsightsIndexItem,
  type InsightsIndexKind,
  type MetaOptions,
} from './shared';

export type InsightsFormatProps = {
  breadcrumbs: readonly BreadcrumbItem[];
  kind: InsightsIndexKind;
  hero: { title: string; lede?: string };
  /** The rail's picker: every format with content, its count, the current one marked. */
  formats: readonly { label: string; href: string; current?: boolean; count?: number }[];
  /** Every piece of this format the page shows, newest first: the pages read so far, in order. */
  items: readonly InsightsIndexItem[];
  /** How many a page holds (the first page adds the feature). */
  pageSize: number;
  /** How many of this format exist. */
  total: number;
  /** The next page's URL (server-rendered "Show more"). Present while more exist. */
  moreHref?: string;
  /** Now, as ISO 8601: what splits an events page into upcoming and past. The route states it, so the
      template stays pure. */
  today?: string;
  /** The Lab's offer: the family's close, as on the hub. */
  lab?: InsightsLab;
  closing?: { eyebrow?: string; heading: string; body?: string; action?: HeroAction };
};

/* ── Per format: the hub's composition, larger ──────────────────────────────────────
   A format page carries the shape its format has on the hub, at a larger size (beauty round, 16 Oct
   2026), so each format keeps its character where it should be strongest: articles an editorial
   run, guides an index, videos screens, events dates. */

type FormatShape = 'editorial' | 'index' | 'screens' | 'dates';

const SHAPE: Record<InsightsIndexKind, FormatShape> = {
  article: 'editorial',
  guide: 'index',
  research: 'index',
  interview: 'index',
  video: 'screens',
  podcast: 'screens',
  event: 'dates',
};

/**
 * The editorial run, composed in PHRASES from what the pieces have (beauty round 3, 16 Oct 2026) —
 * never slots filled in order, so no row is orphaned and no hairline is needed between groups: the
 * change of shape is the separator, the row seam is the column step.
 *
 *   spread     one picture across two thirds, two headlines stacked beside it
 *   headlines  three typographic pieces in a row (two where only four remain, so none is left alone)
 *   pair       two pictures at half
 *
 * The three turn in that order, each taken only when there are pieces to fill it; what is left at
 * the end (a lone picture, one or two headlines) closes the run as a feature and a short row.
 */
function editorial(items: readonly InsightsIndexItem[], meta: MetaOptions): ReactNode[] {
  const { pictured, plain } = partition(items);
  const out: ReactNode[] = [];
  let idle = 0;
  let turn = 0;
  while (idle < 3 && (pictured.length > 0 || plain.length > 0)) {
    const key = `r${out.length}`;
    const phrase = turn % 3;
    turn += 1;
    if (phrase === 0 && pictured.length >= 1 && plain.length >= 2) {
      out.push(
        <Spread
          key={key}
          items={[...pictured.splice(0, 1), ...plain.splice(0, 2)]}
          meta={meta}
          titleAs="h2"
        />,
      );
    } else if (phrase === 1 && plain.length >= 3) {
      out.push(
        <Headlines
          key={key}
          items={plain.splice(0, plain.length === 4 ? 2 : 3)}
          meta={meta}
          titleAs="h2"
        />,
      );
    } else if (phrase === 2 && pictured.length >= 2) {
      out.push(<Pair key={key} items={pictured.splice(0, 2)} meta={meta} titleAs="h2" />);
    } else {
      idle += 1;
      continue;
    }
    idle = 0;
  }
  if (pictured.length > 0) {
    out.push(
      <Feature key="last-p" items={pictured.splice(0, 1)} meta={meta} titleAs="h2" flip />,
    );
  }
  if (plain.length > 0) {
    out.push(<Headlines key="last-t" items={plain.splice(0)} meta={meta} titleAs="h2" />);
  }
  return out;
}

/** The format page's body below its lead: one page's worth, in the format's own composition. */
function body(
  shape: FormatShape,
  items: readonly InsightsIndexItem[],
  meta: MetaOptions,
  start: number,
): ReactNode {
  if (items.length === 0) return null;
  switch (shape) {
    case 'screens':
      return <Grid items={items} meta={meta} titleAs="h2" />;
    case 'index':
      return <Index items={items} meta={meta} titleAs="h2" size="md" start={start} across={2} />;
    case 'editorial':
    default:
      return <Layout rowGap="column">{editorial(items, meta)}</Layout>;
  }
}

/**
 * InsightsFormat — one format's own page (/insights/articles …; owner, 16 Oct 2026, after
 * claude.com/resources/articles): a big hero with the format's name, its count and one line, the
 * rail beside the content as a picker of formats, then the format's composition at its largest —
 *
 *   articles  the newest picture as a cover, then an editorial run (pairs, a feature every third
 *             pictured beat, the typographic pieces as blocks of headlines)
 *   guides    the newest picture as a feature, then every other guide as a numbered index
 *   videos    the newest as a cover, then screens in threes
 *   events    dated rows, upcoming above past
 *
 * — with a server-rendered "Show more", no filters, and the family's close.
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
  today,
  lab,
  closing,
}: InsightsFormatProps) {
  const shape = SHAPE[kind];
  const meta: MetaOptions = { withDate: datesVary(items) };
  const lede = hero.lede?.trim();
  const newest = dateOf(items[0]?.publishedAt);
  /* The hero's record: how many there are and how fresh, in the hero's mono record (its tags, the
     label voice), never a second sentence under the lede and never a ruled facts strip. Not the
     eyebrow (a hero with a trail carries none, owner, 11 Oct 2026). */
  const record = [`${total} published`, ...(newest ? [`Latest ${newest}`] : [])];

  let content: ReactNode;
  if (items.length === 0) {
    content = <p>Nothing has been published here yet.</p>;
  } else if (shape === 'dates') {
    /* Events: upcoming above past, each a run of dated rows. */
    const now = Date.parse(today ?? '') || 0;
    const dated = byEventDate(items);
    const upcoming = dated.filter((item) => Date.parse(item.event?.startsAt ?? '') >= now);
    const past = dated.filter((item) => !upcoming.includes(item));
    /* The newest-to-come (else the latest) is the SHOWCASE — its picture large, its day at the
       largest numeral on the page; the rest are dated rows, the numeral clearly outweighing the
       title. A group's name is a label in the date column's voice, not a heading competing with
       the titles. */
    const [showcase] = [...[...upcoming].reverse(), ...past];
    const groups = [
      {
        id: 'upcoming',
        title: 'Upcoming',
        items: [...upcoming].reverse().filter((item) => item !== showcase),
      },
      { id: 'past', title: 'Past', items: past.filter((item) => item !== showcase) },
    ].filter((group) => group.items.length > 0);
    content = (
      <Layout rowGap="section">
        {showcase ? (
          <section aria-labelledby="events-next">
            <Layout rowGap="block">
              <h2 id="events-next" className={styles.groupTitle}>
                {upcoming.includes(showcase) ? 'Next' : 'Latest'}
              </h2>
              <Showcase items={[showcase]} titleAs="h3" />
            </Layout>
          </section>
        ) : null}
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`events-${group.id}`}>
            <Layout rowGap="block">
              <h2 id={`events-${group.id}`} className={styles.groupTitle}>
                {group.title}
              </h2>
              <Dates items={group.items} titleAs="h3" size="lg" />
            </Layout>
          </section>
        ))}
      </Layout>
    );
  } else {
    /* The lead: the newest piece with a picture, featured — beside its words with the picture at
       seven twelfths (the one 16:9 ratio, so it is large without filling the screen), its meta line
       and standfirst under the title; a video's at the column's full width, a screen. The hub never
       shows this piece, so arriving here is a reveal. */
    const lead = items.find(hasPicture);
    const rest = items.filter((item) => item !== lead);
    const pages: InsightsIndexItem[][] = [];
    for (let start = 0; start < rest.length; start += pageSize) {
      pages.push(rest.slice(start, start + pageSize));
    }
    content = (
      <Layout rowGap="column">
        {lead ? (
          shape === 'screens' ? (
            <Cover items={[lead]} meta={{ ...meta, withDate: true }} titleAs="h2" />
          ) : (
            <Feature
              items={[lead]}
              meta={{ ...meta, withDate: true }}
              titleAs="h2"
              weight="picture"
            />
          )
        ) : null}
        {pages.map((page, index) => (
          <div
            key={index}
            id={index > 0 ? `page-${index + 1}` : undefined}
            className={styles.page}
          >
            {body(shape, page, meta, index * pageSize + 1)}
          </div>
        ))}
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
    );
  }

  return (
    <>
      <PageHero
        data-fold-hero=""
        trail={heroTrail(breadcrumbs, hero.title, (t) => (
          <Breadcrumbs {...t} />
        ))}
        title={hero.title}
        titleSize="mark"
        body={lede ? [lede] : undefined}
        tags={record}
        texture
        surface="paper"
      />

      <Section surface="paper" aria-label={hero.title}>
        <IndexRail
          ariaLabel="Insights by type"
          label="Formats"
          modes={[{ id: 'type', label: 'By type', items: formats }]}
        >
          {content}
        </IndexRail>
      </Section>

      <InsightsClose lab={lab} closing={closing} />
    </>
  );
}
