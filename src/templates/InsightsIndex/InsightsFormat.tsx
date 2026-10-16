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
  Index,
  Pair,
  partition,
  TextBlock,
  type InsightsIndexItem,
  type InsightsIndexKind,
  type MetaOptions,
} from './shared';

export type InsightsFormatProps = {
  breadcrumbs: readonly BreadcrumbItem[];
  kind: InsightsIndexKind;
  hero: { title: string; lede?: string };
  /** The rail's picker: every format with content, the current one marked. */
  formats: readonly { label: string; href: string; current?: boolean }[];
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

/** A pictured beat every this many: the feature beside its words instead of a pair. */
const FEATURE_EVERY = 3;
/** The most headlines one text block holds: three rows of two. */
const TEXT_BLOCK = 6;

/**
 * The editorial run: pieces placed by what they have. Pictures in pairs at the larger step, with a
 * feature (picture beside words) taking every third pictured beat, so scale changes on purpose; the
 * typographic pieces between them as a block of headlines, never in a picture row.
 */
function editorial(items: readonly InsightsIndexItem[], meta: MetaOptions): ReactNode[] {
  const { pictured, plain } = partition(items);
  const out: ReactNode[] = [];
  let beat = 0;
  while (pictured.length > 0 || plain.length > 0) {
    if (pictured.length > 0) {
      beat += 1;
      const feature = beat % FEATURE_EVERY === 0 || pictured.length === 1;
      const set = pictured.splice(0, feature ? 1 : 2);
      out.push(
        feature ? (
          <Feature key={`p${beat}`} items={set} meta={meta} titleAs="h2" />
        ) : (
          <Pair key={`p${beat}`} items={set} meta={meta} titleAs="h2" />
        ),
      );
    }
    if (plain.length > 0) {
      out.push(
        <TextBlock
          key={`t${out.length}`}
          items={plain.splice(0, TEXT_BLOCK)}
          meta={meta}
          titleAs="h2"
        />,
      );
    }
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
      return <Index items={items} meta={meta} titleAs="h2" size="md" start={start} />;
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
  /* The hero's partner: how many there are and how fresh, a quiet line under the lede — so the
     one-word title has a reason for its height. Not the eyebrow (a hero with a trail carries none,
     owner, 11 Oct 2026) and not the record row (40px blue figures outweighed the title). */
  const facts = [`${total} published`, newest ? `latest ${newest}` : undefined]
    .filter(Boolean)
    .join(' · ');

  let content: ReactNode;
  if (items.length === 0) {
    content = <p>Nothing has been published here yet.</p>;
  } else if (shape === 'dates') {
    /* Events: upcoming above past, each a run of dated rows. */
    const now = Date.parse(today ?? '') || 0;
    const dated = byEventDate(items);
    const upcoming = dated.filter((item) => Date.parse(item.event?.startsAt ?? '') >= now);
    const past = dated.filter((item) => !upcoming.includes(item));
    const groups = [
      { id: 'upcoming', title: 'Upcoming', items: [...upcoming].reverse() },
      { id: 'past', title: 'Past', items: past },
    ].filter((group) => group.items.length > 0);
    content = (
      <Layout rowGap="section">
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`events-${group.id}`}>
            <Layout rowGap="stack">
              <h2 id={`events-${group.id}`} className={styles.groupTitle}>
                {group.title}
              </h2>
              <Dates items={group.items} titleAs="h3" size="xl" />
            </Layout>
          </section>
        ))}
      </Layout>
    );
  } else {
    /* The lead: the newest piece with a picture, at the column's full width (a guide's beside its
       words, so the index under it starts at once). */
    const lead = items.find(hasPicture);
    const rest = items.filter((item) => item !== lead);
    const pages: InsightsIndexItem[][] = [];
    for (let start = 0; start < rest.length; start += pageSize) {
      pages.push(rest.slice(start, start + pageSize));
    }
    content = (
      <Layout rowGap="column">
        {lead ? (
          shape === 'index' ? (
            <Feature items={[lead]} meta={meta} titleAs="h2" />
          ) : (
            <Cover items={[lead]} meta={meta} titleAs="h2" />
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
        body={lede ? [lede, facts] : [facts]}
        texture
        surface="paper"
      />

      <Section surface="paper" aria-label={hero.title}>
        <IndexRail
          ariaLabel="Insights by type"
          modes={[{ id: 'type', label: 'By type', items: formats }]}
        >
          {content}
        </IndexRail>
      </Section>

      <InsightsClose lab={lab} closing={closing} />
    </>
  );
}
