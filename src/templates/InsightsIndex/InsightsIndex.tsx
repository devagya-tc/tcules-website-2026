import type { ReactNode } from 'react';

import { Layout, Section, type MediaImage } from '@/components';
import { heroTrail } from '@/lib/trail';
import {
  Breadcrumbs,
  CtaSection,
  IndexRail,
  PageHero,
  type BreadcrumbItem,
  type HeroAction,
} from '@/patterns';

import {
  byEventDate,
  CuratedSection,
  Dates,
  datesVary,
  Feature,
  Grid,
  hasPicture,
  Headlines,
  LABEL,
  Pair,
  partition,
  Screen,
  SectionHead,
  Split,
  type InsightsIndexItem,
  type InsightsIndexKind,
  type MetaOptions,
} from './shared';

/** What the page says about one format: its section title, its one line, its own page. */
export type InsightsIndexFormat = {
  kind: InsightsIndexKind;
  title?: string;
  lead?: string;
  /** The format's page (/insights/articles …), where "All articles" goes. */
  href?: string;
};

/** One topic from the CMS taxonomy the BY TOPIC view curates by, and the group it is filed in. */
export type InsightsIndexTopic = { id: string; label: string; group?: string };

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
   * The Lab: the other organisation's offer, on tint, before the close. Rendered ONLY with its
   * picture (beauty round 3, 16 Oct 2026): as words alone on tint, after a feed of pictures, it read
   * as a leftover rectangle and was the page's emptiest band. Until the Lab's illustration is drawn
   * the band is held back, not shipped empty.
   */
  lab?: InsightsLab;
  /** The page's last beat, on paper before the ink footer. Rendered only with its action. */
  closing?: { eyebrow?: string; heading: string; body?: string; action?: HeroAction };
};

/** The Lab's offer, with the picture it needs to be shown at all. */
export type InsightsLab = {
  heading: string;
  body?: string;
  action: HeroAction;
  image?: MediaImage;
};

/* ── Decisions the template owns ──────────────────────────────────────────────── */

/**
 * BY TYPE, in page order, each format in its own composition (beauty round, 16 Oct 2026) — articles'
 * cover and pair, events' dated rows, videos' screen, guides' split — so no two neighbours share a
 * silhouette and the column reads as an edit, not one section stamped four times.
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
 *   B  curated   the rail (CURATE · BY TYPE / BY TOPIC, and the shown view's sections with their
 *                counts) beside the view; every section opens on a one-line head carrying its
 *                "All …" link, so it ends on its last piece:
 *                BY TYPE  a section per format, each in its own composition — articles in threes
 *                         over a row of headlines, events dated, videos a screen, guides a split
 *                BY TOPIC a section per topic, formats mixed, no piece in two sections: a feature
 *                         (alternating sides) or a pair over a row of headlines
 *                Both views are in the HTML; the switch shows one and holds it in `?view=`.
 *   C  lab       the other organisation's offer, on tint — only with its picture
 *   D  close     the ask, on paper, before the ink footer
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
  /* The type view's first lead: the topic view must not open on the same piece, or switching looks
     as if nothing happened. */
  const typeLead = byType[0] ? leadOf(byType[0].items).lead : undefined;
  const byTopic = curateTopics(items, topics, typeLead?.id);
  const topicShapes = turnShapes(byTopic.map((section) => section.items));
  const lede = hero.lede?.trim();

  const typePanel = (
    <Layout rowGap="section">
      {byType.map((section) => {
        const id = typeAnchor(section.kind);
        const count = section.items.length;
        return (
          <CuratedSection
            key={section.kind}
            id={id}
            head={
              <SectionHead
                id={id}
                title={section.title}
                link={
                  section.href
                    ? {
                        label: `All ${count} ${section.title.toLowerCase()}`,
                        href: section.href,
                      }
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
    <Layout rowGap="section">
      {byTopic.map((section, index) => {
        const id = topicAnchor(section);
        return (
          <CuratedSection
            key={section.id}
            id={id}
            head={<SectionHead id={id} title={section.label} />}
          >
            <TopicShape items={section.items} shape={topicShapes[index] ?? 'feature'} />
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
        count: section.items.length,
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
              count: section.size,
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
            label="Curate"
            modes={modes}
            initialMode={view}
            param="view"
          />
        ) : (
          <p>Nothing has been published yet.</p>
        )}
      </Section>

      <InsightsClose lab={lab} closing={closing} />
    </>
  );
}

/**
 * The family's close, the hub's and every format page's: the Lab's offer on tint (only with its
 * picture), then the ask on paper, so tint never meets the ink footer and every page ends on its
 * one primary action.
 */
export function InsightsClose({
  lab,
  closing,
}: {
  lab?: InsightsLab;
  closing?: InsightsIndexProps['closing'];
}) {
  return (
    <>
      {lab?.image ? (
        <CtaSection
          arrangement="offer"
          surface="tint"
          heading={lab.heading}
          body={lab.body?.trim() ? [lab.body] : undefined}
          actions={[lab.action]}
          media={{ image: lab.image }}
        />
      ) : null}
      {closing?.action ? (
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

/** A set's lead: its newest piece with a picture, else its newest; then the rest in order. */
function leadOf(items: readonly InsightsIndexItem[]) {
  const lead = items.find(hasPicture) ?? items[0];
  return { lead, rest: items.filter((item) => item !== lead) };
}

/* ── BY TOPIC · curation ──────────────────────────────────────────────────────── */

/**
 * The topic sections: the largest topics first, each taking a few pieces nobody has taken yet — the
 * newest piece with a picture as its lead (never the type view's lead in the first section), then
 * one of each other format before any repeats, so a section reads as the topic's range, not its four
 * newest articles. A piece sits in one section only; a topic left with too few is dropped.
 */
function curateTopics(
  items: readonly InsightsIndexItem[],
  topics: readonly InsightsIndexTopic[],
  avoidLead?: string,
) {
  const members = (id: string) => items.filter((item) => item.topics?.includes(id));
  const ordered = [...topics]
    .map((topic) => ({ ...topic, size: members(topic.id).length }))
    .sort((a, b) => b.size - a.size);
  const used = new Set<string>();
  const sections: {
    id: string;
    label: string;
    group?: string;
    size: number;
    items: InsightsIndexItem[];
  }[] = [];
  for (const topic of ordered) {
    const free = members(topic.id).filter((item) => !used.has(item.id));
    if (free.length < TOPIC_FLOOR) continue;
    const picked: InsightsIndexItem[] = [];
    const lead =
      free.find((item) => hasPicture(item) && (sections.length > 0 || item.id !== avoidLead)) ??
      free.find(hasPicture);
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
    sections.push({
      id: topic.id,
      label: topic.label,
      group: topic.group,
      size: topic.size,
      items: picked,
    });
  }
  return sections;
}

/* ── The compositions per section ─────────────────────────────────────────────── */

function TypeShape({
  kind,
  items,
}: {
  kind: InsightsIndexKind;
  items: readonly InsightsIndexItem[];
}): ReactNode {
  /* The meta line is worded for the pieces SHOWN: their dates appear only if they tell them apart. */
  const metaFor = (shown: readonly InsightsIndexItem[]): MetaOptions => ({
    withDate: datesVary(shown),
  });
  switch (kind) {
    case 'event':
      /* Dated rows: the day as an accent numeral at each row's start, the picture at its end. */
      return <Dates items={byEventDate(items).slice(0, 3)} size="md" />;
    case 'video':
    case 'podcast': {
      /* The screen: the newest large, two beside it. */
      const { pictured, plain } = partition(items);
      const shown = [...pictured, ...plain].slice(0, 3);
      return <Screen items={shown} meta={metaFor(shown)} />;
    }
    case 'guide':
    case 'research':
    case 'interview': {
      /* The split: one with its picture beside an index of the typographic ones. */
      const { pictured, plain } = partition(items);
      const shown = [...pictured.slice(0, 1), ...plain.slice(0, 4)];
      return <Split items={shown} meta={metaFor(shown)} />;
    }
    case 'article':
    default: {
      /* Threes, then a row of headlines — a different silhouette from the format page's opening, and
         never its lead: the hub skips the newest pictured piece the format page features, so "All
         articles" opens on a reveal, not a reprint. */
      const { pictured, plain } = partition(items);
      const tiles = pictured.length >= 4 ? pictured.slice(1, 4) : pictured.slice(0, 3);
      const words = plain.slice(0, 3);
      const meta = metaFor([...tiles, ...words]);
      if (tiles.length < 3) return <Headlines items={items.slice(0, 3)} meta={meta} />;
      return (
        <Layout rowGap="column">
          <Grid items={tiles} meta={meta} />
          {words.length >= 2 ? <Headlines items={words} meta={meta} /> : null}
        </Layout>
      );
    }
  }
}

type TopicShapeName = 'feature' | 'feature-flipped' | 'pair';

/**
 * The topic view's signature, in turn: a FEATURE (the lead's picture beside its words) alternating
 * its side, with a PAIR every third section where two pictures allow — each over a row of headlines
 * in which every format keeps its own anchor (an event its date, a watched piece its running time, a
 * read one its reading time). No neighbour repeats the one before it.
 */
function turnShapes(sets: readonly (readonly InsightsIndexItem[])[]): TopicShapeName[] {
  const out: TopicShapeName[] = [];
  let side = false;
  sets.forEach((set, index) => {
    const pictured = set.filter(hasPicture).length;
    if (index % 3 === 2 && pictured >= 2) {
      out.push('pair');
      return;
    }
    out.push(side ? 'feature-flipped' : 'feature');
    side = !side;
  });
  return out;
}

function TopicShape({
  items,
  shape,
}: {
  items: readonly InsightsIndexItem[];
  shape: TopicShapeName;
}) {
  const meta: MetaOptions = { withKind: true, withDate: datesVary(items) };
  const { pictured, plain } = partition(items);
  if (shape === 'pair') {
    const two = pictured.slice(0, 2);
    const rest = items.filter((item) => !two.includes(item));
    return (
      <Layout rowGap="column">
        <Pair items={two} meta={meta} />
        {rest.length > 0 ? <Headlines items={rest} meta={meta} /> : null}
      </Layout>
    );
  }
  const lead = pictured[0];
  if (!lead) return <Headlines items={items} meta={meta} />;
  const rest = [...pictured.slice(1), ...plain];
  return (
    <Layout rowGap="column">
      <Feature items={[lead]} meta={meta} flip={shape === 'feature-flipped'} />
      {rest.length > 0 ? <Headlines items={rest} meta={meta} /> : null}
    </Layout>
  );
}
