import type { ReactNode } from 'react';

import { Button, Cluster, Icon, Layout, Section } from '@/components';
import { heroTrail } from '@/lib/trail';
import { Breadcrumbs, IndexRail, PageHero, type BreadcrumbItem } from '@/patterns';

import styles from './InsightsIndex.module.css';
import { InsightsClose, type InsightsClosing, type InsightsLab } from './InsightsIndex';
import {
  byEventDate,
  Cinema,
  Dates,
  dateOf,
  datesVary,
  Halves,
  hasPicture,
  hasStandfirst,
  Headlines,
  leadFirst,
  Lead,
  Ledger,
  partition,
  pictureRun,
  Showcase,
  Trio,
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
  closing?: InsightsClosing;
};

/* ── Per format: the hub's composition, larger ──────────────────────────────────────
   A format page opens on the composition its format has on the hub, at its largest (beauty round 4,
   16 Oct 2026): a read format on a LEAD (the newest picture at two thirds, the next two beside it —
   a complete rectangle, never a picture beside a void), a watched one on a CINEMA, events on their
   dates. Then the archive, in phrases. */

type FormatShape = 'editorial' | 'screens' | 'dates';

const SHAPE: Record<InsightsIndexKind, FormatShape> = {
  article: 'editorial',
  guide: 'editorial',
  research: 'editorial',
  interview: 'editorial',
  video: 'screens',
  podcast: 'screens',
  event: 'dates',
};

/** A run of typographic pieces is cut into phrases of this many, so no list is a wall. */
const LEDGER_RUN = 4;

/**
 * The archive, composed in PHRASES from what the pieces have (beauty round 4) — each phrase a
 * complete rectangle, and no two neighbours alike:
 *
 *   pictured  TRIO (three) and HALVES (two), cut so none is left alone (`pictureRun`)
 *   words     LEDGER (four rows, one per line) and HEADLINES (three across), alternating
 *
 * The two kinds alternate, words first (the page's lead above is pictures). A lone picture joins the
 * typographic pieces in date order, where the ledger shows it as its row's thumbnail; a short run at
 * the end joins the phrase before it, so the page ends on a full phrase.
 */
function editorial(items: readonly InsightsIndexItem[], meta: MetaOptions): ReactNode[] {
  const { pictured } = partition(items);
  const runs = pictureRun(pictured.length);
  const inRuns = pictured.slice(
    0,
    runs.reduce((sum, n) => sum + n, 0),
  );
  const words = items.filter((item) => !inRuns.includes(item));

  /* The typographic phrases: fours and threes alternating, a remainder of one or two folded into
     the phrase before it (a ledger, which takes any count). */
  const wordPhrases: { kind: 'ledger' | 'headlines'; items: InsightsIndexItem[] }[] = [];
  let at = 0;
  while (at < words.length) {
    const kind = wordPhrases.length % 2 === 0 ? 'ledger' : 'headlines';
    const take = kind === 'ledger' ? LEDGER_RUN : 3;
    const chunk = words.slice(at, at + take);
    at += take;
    /* Headlines are typographic only; a chunk carrying a picture is a ledger. */
    const resolved = kind === 'headlines' && chunk.some(hasPicture) ? 'ledger' : kind;
    const last = wordPhrases[wordPhrases.length - 1];
    if (chunk.length < 3 && last) {
      last.kind = 'ledger';
      last.items.push(...chunk);
    } else {
      wordPhrases.push({ kind: resolved, items: chunk });
    }
  }
  /* Two ledgers side by side in the sequence would read as one long list: a pictured phrase sits
     between them where there is one. */
  const picPhrases = runs.map((n, i) => {
    const start = runs.slice(0, i).reduce((sum, m) => sum + m, 0);
    return inRuns.slice(start, start + n);
  });

  const out: ReactNode[] = [];
  const total = Math.max(wordPhrases.length, picPhrases.length);
  for (let i = 0; i < total; i += 1) {
    const word = wordPhrases[i];
    if (word) {
      out.push(
        word.kind === 'ledger' ? (
          <Ledger key={`w${i}`} items={word.items} meta={meta} titleAs="h2" />
        ) : (
          <Headlines key={`w${i}`} items={word.items} meta={meta} titleAs="h2" />
        ),
      );
    }
    const pic = picPhrases[i];
    if (pic) {
      out.push(
        pic.length === 3 ? (
          <Trio key={`p${i}`} items={pic} meta={meta} titleAs="h2" />
        ) : (
          <Halves key={`p${i}`} items={pic} meta={meta} titleAs="h2" />
        ),
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
): ReactNode {
  if (items.length === 0) return null;
  if (shape === 'screens') {
    /* Screens in twos and threes, every one a picture — opening on two, so the first row under the
       cinema's filmstrip is never a second row of threes. */
    const runs = pictureRun(items.length, 2);
    const out: ReactNode[] = [];
    let start = 0;
    runs.forEach((n, i) => {
      const run = items.slice(start, start + n);
      start += n;
      out.push(
        n === 3 ? (
          <Trio key={i} items={run} meta={meta} titleAs="h2" />
        ) : (
          <Halves key={i} items={run} meta={meta} titleAs="h2" />
        ),
      );
    });
    const rest = items.slice(start);
    if (rest.length > 0) out.push(<Ledger key="rest" items={rest} meta={meta} titleAs="h2" />);
    return <Layout rowGap="column">{out}</Layout>;
  }
  return <Layout rowGap="column">{editorial(items, meta)}</Layout>;
}

/**
 * InsightsFormat — one format's own page (/insights/articles …; owner, 16 Oct 2026, after
 * claude.com/resources/articles): a big hero with the format's name, its count and one line, the
 * rail beside the content as a picker of formats, then the format's composition at its largest —
 *
 *   read formats  a LEAD (the newest picture at two thirds, the next two beside it), then the
 *                 archive in phrases: trios and halves of pictures between ledgers and headlines
 *   videos        a CINEMA (the newest at the column's width, a filmstrip), then screens
 *   events        the next (or latest) event as a showcase, then dated rows, upcoming above past
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
  const meta: MetaOptions = { withSubject: true, withDate: datesVary(items) };
  const lede = hero.lede?.trim();
  /* The hero's record: how many there are and how fresh, as ONE mono line under the lede (beauty
     round 4). An events page dates itself by its events, never by when their pages were filed: the
     next one to come, else the last one held — so the line matches the date numerals under it. */
  const now = Date.parse(today ?? '') || 0;
  const eventTimes = items
    .map((item) => Date.parse(item.event?.startsAt ?? ''))
    .filter((time) => !Number.isNaN(time));
  const nextEvent = eventTimes.filter((time) => time >= now).sort((a, b) => a - b)[0];
  const lastEvent = eventTimes.filter((time) => time < now).sort((a, b) => b - a)[0];
  const freshness =
    shape === 'dates'
      ? nextEvent !== undefined
        ? `Next ${dateOf(new Date(nextEvent).toISOString())}`
        : lastEvent !== undefined
          ? `Last held ${dateOf(new Date(lastEvent).toISOString())}`
          : undefined
      : (() => {
          const newest = dateOf(items[0]?.publishedAt);
          return newest ? `Latest ${newest}` : undefined;
        })();
  const record = [`${total} published`, ...(freshness ? [freshness] : [])];

  let content: ReactNode;
  if (items.length === 0) {
    content = <p>Nothing has been published here yet.</p>;
  } else if (shape === 'dates') {
    /* Events: upcoming above past, each a run of dated rows. */
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
    /* The lead: the newest pieces with pictures — a read format's LEAD (the newest at two thirds,
       the next two stacked beside it, the rectangle closed), a watched format's CINEMA (the newest
       at the column's width over a filmstrip of the next three). The hub skips these pieces, so
       arriving here is a reveal. */
    const { pictured, plain } = partition(items);
    /* The newest pictured piece leads — unless it has no standfirst and the next pictured one does:
       a lead's words run its picture's height, and the newest stays in the stack beside it. */
    const newest = pictured[0];
    const [first, ...others] =
      shape === 'screens' || !newest || hasStandfirst(newest)
        ? pictured
        : [...leadFirst(pictured.slice(0, 3)), ...pictured.slice(3)];
    /* A read format with too few pictures for a picture stack sets its next three typographic
       pieces beside the lead instead, each with its standfirst, so the stack still runs the lead's
       height. */
    const leadShown: InsightsIndexItem[] = !first
      ? []
      : shape === 'screens'
        ? [first, ...others.slice(0, 3)]
        : others.length >= 2
          ? /* With the newest typographic piece as the lead's companion, should its column need
               one (see Lead). */
            [first, ...others.slice(0, 2), ...(hasStandfirst(first) ? [] : plain.slice(0, 1))]
          : [first, ...plain.slice(0, 3)];
    const rest = items.filter((item) => !leadShown.includes(item));
    const pages: InsightsIndexItem[][] = [];
    for (let start = 0; start < rest.length; start += pageSize) {
      pages.push(rest.slice(start, start + pageSize));
    }
    const leadMeta = { ...meta, withDate: true };
    content = (
      <Layout rowGap="column">
        {leadShown.length > 0 ? (
          shape === 'screens' ? (
            <Cinema items={leadShown} meta={leadMeta} titleAs="h2" />
          ) : (
            <Lead items={leadShown} meta={leadMeta} titleAs="h2" />
          )
        ) : null}
        {pages.map((page, index) => (
          <div
            key={index}
            id={index > 0 ? `page-${index + 1}` : undefined}
            className={styles.page}
          >
            {body(shape, page, meta)}
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
        record={record}
        arrangement="masthead"
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
