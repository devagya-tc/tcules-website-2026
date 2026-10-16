import type { ReactNode } from 'react';

import { Layout, Media, Section, type MediaImage } from '@/components';
import { CARD_TWO_TRACKS, FULL_COLUMN } from '@/lib/image-sizes';
import { heroTrail } from '@/lib/trail';
import {
  Breadcrumbs,
  ContentSection,
  CtaRow,
  CtaSection,
  IndexRail,
  PageHero,
  Teaser,
  type BreadcrumbItem,
  type HeroAction,
} from '@/patterns';

import {
  CuratedSection,
  dateMarkerOf,
  hasPicture,
  LABEL,
  Pair,
  Rows,
  SectionHead,
  teaserOf,
  Trio,
  type InsightsIndexItem,
  type InsightsIndexKind,
} from './shared';

/** What the page says about one format: its section title, its one line, its own page. */
export type InsightsIndexFormat = {
  kind: InsightsIndexKind;
  title?: string;
  lead?: string;
  /** The format's page (/insights/articles …), where "All articles" goes. */
  href?: string;
};

/** One topic from the CMS taxonomy the BY TOPIC view curates by. */
export type InsightsIndexTopic = { id: string; label: string };

/** The two ways the hub is curated. */
export type InsightsIndexView = 'type' | 'topic';

export type InsightsIndexProps = {
  breadcrumbs: readonly BreadcrumbItem[];
  hero: { title: string; lede?: string; eyebrow?: string };
  /** Every resource, newest first. */
  items: readonly InsightsIndexItem[];
  formats?: readonly InsightsIndexFormat[];
  /** The topics, industry excluded (a reader's sector, not a subject). */
  topics?: readonly InsightsIndexTopic[];
  /** The view the page opens on: the route reads it from `?view=`. */
  view?: InsightsIndexView;
  /**
   * The Lab: the other organisation's offer, on tint — the band the page closes on. It was ink while
   * the feed stood between it and the footer; with the feed gone an ink Lab ran straight into the ink
   * footer as one dark slab, and ch02 closes every page "on paper or tint before the ink footer"
   * (16 Oct 2026). `visual` is the image it carries beside its words — a register placeholder until
   * the commissioned illustration exists.
   */
  lab?: { heading: string; body?: string; action: HeroAction; visual?: MediaImage };
  /** Rendered only with its action: a close without an ask is not one. */
  closing?: { eyebrow?: string; heading: string; body?: string; action?: HeroAction };
};

/* ── Decisions the template owns ──────────────────────────────────────────────── */

/**
 * BY TYPE, in page order. A picture-led shape and a typographic one take turns — articles' feature,
 * events' dated rows, videos' screen and playlist, guides' shelf — so the column never repeats one
 * rectangle and two text-heavy sections never meet.
 */
const TYPE_ORDER: readonly InsightsIndexKind[] = [
  'article',
  'event',
  'video',
  'guide',
  'podcast',
  'research',
  'interview',
];

/** How many a topic section holds: a few, so the view reads as picked, not filtered. */
const PER_TOPIC = 4;
/** A topic with fewer pieces than this left to give is not a section. */
const TOPIC_FLOOR = 3;

const typeAnchor = (kind: InsightsIndexKind) => `type-${kind}`;
/** A topic's anchor from its label ("Design System" → #topic-design-system): a fragment a reader can
    read and share. The CMS id stands in where a label has no letters or digits. */
const topicAnchor = (topic: { id: string; label: string }) => {
  const slug = topic.label
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `topic-${slug || topic.id}`;
};

/**
 * InsightsIndex — the insights hub as a CURATED page (owner, 16 Oct 2026; the idea of
 * claude.com/resources): the hero, then directly the curated column with the rail beside it.
 *
 *   A  hero      the trail, the display h1, the lede, the texture
 *   B  curated   the rail (BY TYPE / BY TOPIC, and the shown view's sections) beside the view:
 *                BY TYPE  a section per format, each in its own shape, ending in "All <format>"
 *                BY TOPIC a section per topic, formats mixed, no piece in two sections
 *                Both views are in the HTML; the switch shows one and holds it in `?view=`.
 *   C  lab       the other organisation's offer, on tint (the page closes on tint before the ink footer)
 *   D  close     the ask, on paper, only with an action
 *
 * There is no in-page filtering and no full feed: everything of a format lives on its own page.
 */
export function InsightsIndex({
  breadcrumbs,
  hero,
  items,
  formats = [],
  topics = [],
  view = 'type',
  lab,
  closing,
}: InsightsIndexProps) {
  const byType = TYPE_ORDER.flatMap((kind) => {
    const all = items.filter((item) => item.kind === kind);
    if (all.length === 0) return [];
    const format = formats.find((candidate) => candidate.kind === kind);
    return [
      {
        kind,
        title: format?.title?.trim() || LABEL[kind].many,
        lead: format?.lead,
        href: format?.href,
        items: all,
      },
    ];
  });
  const byTopic = curateTopics(items, topics);
  const lede = hero.lede?.trim();

  const typePanel = (
    <Layout rowGap="section-open">
      {byType.map((section) => {
        const id = typeAnchor(section.kind);
        return (
          <CuratedSection
            key={section.kind}
            id={id}
            head={
              <SectionHead
                id={id}
                title={section.title}
                lead={section.lead}
                all={
                  section.href
                    ? { label: `All ${section.title.toLowerCase()}`, href: section.href }
                    : undefined
                }
              />
            }
          >
            <TypeShape kind={section.kind} items={section.items} />
          </CuratedSection>
        );
      })}
    </Layout>
  );

  const topicPanel = (
    <Layout rowGap="section-open">
      {byTopic.map((section, index) => {
        const id = topicAnchor(section);
        return (
          <CuratedSection
            key={section.id}
            id={id}
            head={<SectionHead id={id} title={section.label} />}
          >
            <TopicShape items={section.items} turn={index} />
          </CuratedSection>
        );
      })}
    </Layout>
  );

  const modes = [
    {
      id: 'type',
      label: 'By type',
      items: byType.map((section) => ({
        label: section.title,
        href: `#${typeAnchor(section.kind)}`,
      })),
      panel: typePanel,
    },
    ...(byTopic.length > 0
      ? [
          {
            id: 'topic',
            label: 'By topic',
            items: byTopic.map((section) => ({
              label: section.label,
              href: `#${topicAnchor(section)}`,
            })),
            panel: topicPanel,
          },
        ]
      : []),
  ];

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
      />

      <Section surface="paper" aria-label="Insights">
        {byType.length > 0 ? (
          <IndexRail
            ariaLabel="Browse insights"
            modes={modes}
            initialMode={view}
            param="view"
          />
        ) : (
          <p>Nothing has been published yet.</p>
        )}
      </Section>

      {lab ? (
        lab.visual ? (
          <ContentSection
            id="lab"
            heading={lab.heading}
            headingId="lab-heading"
            lead={lab.body?.trim() ? lab.body : undefined}
            surface="tint"
            arrangement="beside"
            actions={<CtaRow rule={false} actions={[lab.action]} />}
          >
            <Media image={lab.visual} sizes={FULL_COLUMN} />
          </ContentSection>
        ) : (
          <CtaSection
            arrangement="offer"
            surface="tint"
            heading={lab.heading}
            body={lab.body?.trim() ? [lab.body] : undefined}
            actions={[lab.action]}
          />
        )
      ) : null}

      {closing?.action ? (
        /* Paper, so it never touches the tint Lab: two tinted bands are never adjacent. */
        <CtaSection
          arrangement="open"
          surface="paper"
          eyebrow={closing.eyebrow || undefined}
          heading={closing.heading}
          body={closing.body?.trim() ? [closing.body] : undefined}
          actions={[closing.action]}
        />
      ) : null}
    </>
  );
}

/* ── BY TOPIC · curation ──────────────────────────────────────────────────────── */

/**
 * The topic sections: the largest topics first, each taking a few pieces nobody has taken yet — the
 * newest piece with a picture as its lead, then one of each other format before any repeats, so a
 * section reads as the topic's range, not its four newest articles. A piece sits in one section
 * only; a topic left with too few to say anything is dropped.
 */
function curateTopics(
  items: readonly InsightsIndexItem[],
  topics: readonly InsightsIndexTopic[],
) {
  const members = (id: string) => items.filter((item) => item.topics?.includes(id));
  const ordered = [...topics]
    .map((topic) => ({ ...topic, size: members(topic.id).length }))
    .sort((a, b) => b.size - a.size);
  const used = new Set<string>();
  const sections: { id: string; label: string; items: InsightsIndexItem[] }[] = [];
  for (const topic of ordered) {
    const free = members(topic.id).filter((item) => !used.has(item.id));
    if (free.length < TOPIC_FLOOR) continue;
    const picked: InsightsIndexItem[] = [];
    const lead = free.find(hasPicture);
    if (lead) picked.push(lead);
    const kinds = new Set(picked.map((item) => item.kind));
    for (const item of free) {
      if (picked.length === PER_TOPIC) break;
      if (!picked.includes(item) && !kinds.has(item.kind)) {
        kinds.add(item.kind);
        picked.push(item);
      }
    }
    for (const item of free) {
      if (picked.length === PER_TOPIC) break;
      if (!picked.includes(item)) picked.push(item);
    }
    picked.forEach((item) => used.add(item.id));
    sections.push({ id: topic.id, label: topic.label, items: picked });
  }
  return sections;
}

/* ── The shapes ───────────────────────────────────────────────────────────────── */

/** Split a set into the pieces with a picture and the typographic ones, each in date order. */
function partition(items: readonly InsightsIndexItem[]) {
  return {
    pictured: items.filter(hasPicture),
    plain: items.filter((item) => !hasPicture(item)),
  };
}

/** A set's lead: its newest piece with a picture, else its newest; then the rest in order. */
function leadOf(items: readonly InsightsIndexItem[]) {
  const lead = items.find(hasPicture) ?? items[0];
  return { lead, rest: items.filter((item) => item !== lead) };
}

/** The FEATURE: one piece with its picture large beside its words. */
function Feature({ item, withKind }: { item: InsightsIndexItem; withKind: boolean }) {
  return (
    <ul>
      <Teaser
        {...teaserOf(item, withKind)}
        arrangement="beside"
        size="xl"
        sizes={CARD_TWO_TRACKS}
      />
    </ul>
  );
}

/**
 * The MIX under a feature: pictured tiles beside a column of headlines, so a row of three reads as
 * two objects and a reading list, not three equal boxes.
 */
function Mix({
  pictured,
  plain,
  withKind,
}: {
  pictured: readonly InsightsIndexItem[];
  plain: readonly InsightsIndexItem[];
  withKind: boolean;
}) {
  if (pictured.length === 0) return <Trio items={plain.slice(0, 3)} withKind={withKind} />;
  if (plain.length === 0) return <Trio items={pictured.slice(0, 3)} withKind={withKind} />;
  const tiles = pictured.slice(0, 2);
  const headlines = plain.slice(0, tiles.length === 2 ? 2 : 3);
  return (
    <Layout as="ul" columns={{ md: 3 }} colGap="gutter" rowGap="column">
      {tiles.map((item) => (
        <Teaser key={item.id} {...teaserOf(item, withKind)} size="md" compact />
      ))}
      <li>
        <Layout as="ul" rowGap="gutter">
          {headlines.map((item) => (
            <Teaser key={item.id} {...teaserOf(item, withKind)} size="md" />
          ))}
        </Layout>
      </li>
    </Layout>
  );
}

function TypeShape({
  kind,
  items,
}: {
  kind: InsightsIndexKind;
  items: readonly InsightsIndexItem[];
}): ReactNode {
  switch (kind) {
    case 'event':
      /* Events — dated rows: the day as a numeral heads each, the place under the title, the
         event's picture at the row's end. The date is what a reader scans an events list for. */
      return (
        <Layout as="ul" rowGap="stack">
          {items.slice(0, 3).map((item) => (
            <Teaser
              key={item.id}
              {...teaserOf(item, false)}
              date={dateMarkerOf(item)}
              meta={item.event?.place}
              arrangement="row"
              size="lg"
            />
          ))}
        </Layout>
      );
    case 'video':
    case 'podcast': {
      /* Watched and listened — the screen and the next two: the newest large with its play mark,
         two smaller beside it, stacked to its height. Pictures lead, because a video is one. */
      const { lead, rest } = leadOf(items);
      if (!lead) return null;
      const next = [...rest.filter(hasPicture), ...rest.filter((item) => !hasPicture(item))];
      return (
        <Layout columns={{ md: [2, 1] }} colGap="gutter" rowGap="gutter" align="start">
          <ul>
            <Teaser {...teaserOf(lead, false)} size="lg" sizes={CARD_TWO_TRACKS} />
          </ul>
          {next.length > 0 ? (
            <Layout as="ul" rowGap="gutter">
              {next.slice(0, 2).map((item) => (
                <Teaser key={item.id} {...teaserOf(item, false)} size="sm" compact />
              ))}
            </Layout>
          ) : null}
        </Layout>
      );
    }
    case 'guide':
    case 'research':
    case 'interview': {
      /* The shelf: two pictured ones at the larger step, the rest as a row of headlines under them —
         a different weight from the articles' feature, so the two never read as one shape twice. */
      const { pictured, plain } = partition(items);
      const pair = pictured.slice(0, 2);
      const headlines = [...plain, ...pictured.slice(2)].slice(0, 3);
      return (
        <Layout rowGap="column">
          {pair.length > 0 ? <Pair items={pair} withKind={false} /> : null}
          {headlines.length > 0 ? <Trio items={headlines} withKind={false} /> : null}
        </Layout>
      );
    }
    case 'article':
    default: {
      /* Articles — the feature, then the mix. */
      const { lead, rest } = leadOf(items);
      if (!lead) return null;
      const more = partition(rest);
      return (
        <Layout rowGap="column">
          {hasPicture(lead) ? (
            <Feature item={lead} withKind={false} />
          ) : (
            <Trio items={[lead]} withKind={false} />
          )}
          <Mix pictured={more.pictured} plain={more.plain} withKind={false} />
        </Layout>
      );
    }
  }
}

/**
 * A topic section's shape, turning through three so neighbouring topics never repeat one: the
 * feature over a row, a pictured lead beside a list, and pairs at the larger step.
 */
function TopicShape({ items, turn }: { items: readonly InsightsIndexItem[]; turn: number }) {
  const [lead, ...rest] = items;
  if (!lead) return null;
  const pictured = hasPicture(lead);
  const shape = pictured ? turn % 3 : 2;
  if (shape === 0) {
    return (
      <Layout rowGap="column">
        <Feature item={lead} withKind />
        <Trio items={rest} withKind />
      </Layout>
    );
  }
  if (shape === 1) {
    /* The lead and the rows are pieces of one set, not two regions of different kind: the set's
       gutter, not a split. */
    return (
      <Layout columns={{ lg: [1, 1] }} colGap="gutter" rowGap="stack" align="start">
        <ul>
          <Teaser {...teaserOf(lead, true)} size="lg" sizes={CARD_TWO_TRACKS} />
        </ul>
        <Rows items={rest} withKind />
      </Layout>
    );
  }
  /* Pairs at the larger step: pictures in the first row, words under them, never a column of each. */
  return <Pair items={[...items.filter(hasPicture), ...items.filter((item) => !hasPicture(item))]} withKind />;
}
