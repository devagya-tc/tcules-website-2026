import type { ReactNode } from 'react';

import { Layout, Section } from '@/components';
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
  Cover,
  CuratedSection,
  Dates,
  datesVary,
  hasPicture,
  Index,
  LABEL,
  Pair,
  partition,
  Screen,
  SectionClose,
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
   * The Lab: the other organisation's offer, on tint — the band the page closes on, the hub and every
   * format page alike. A compact offer (its words and its link): with the commissioned illustration
   * not yet drawn, the band carries no media slot rather than a placeholder (beauty round, 16 Oct
   * 2026). ch02 closes every page "on paper or tint before the ink footer".
   */
  lab?: InsightsLab;
  /** Rendered only with its action: a close without an ask is not one. */
  closing?: { eyebrow?: string; heading: string; body?: string; action?: HeroAction };
};

/** The Lab's offer: the family's close. */
export type InsightsLab = { heading: string; body?: string; action: HeroAction };

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
 *   B  curated   the rail (BY TYPE / BY TOPIC, and the shown view's sections) beside the view:
 *                BY TYPE  a section per format, each in its own composition, closed by "All <format>"
 *                BY TOPIC a section per topic, formats mixed, no piece in two sections, the
 *                         compositions turning so no two neighbours match
 *                Both views are in the HTML; the switch shows one and holds it in `?view=`.
 *   C  lab       the other organisation's offer, on tint — the close (the page ends on tint before
 *                the ink footer)
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
  /* The type view's first lead: the topic view must not open on the same piece, or switching looks
     as if nothing happened. */
  const typeLead = byType[0] ? leadOf(byType[0].items).lead : undefined;
  const byTopic = curateTopics(items, topics, typeLead?.id);
  const topicShapes = turnShapes(byTopic.map((section) => section.items));
  const lede = hero.lede?.trim();

  const typePanel = (
    <Layout rowGap="section-open">
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
                eyebrow={pieces(count)}
                title={section.title}
                lead={section.lead}
              />
            }
            close={
              section.href ? (
                <SectionClose
                  label={`All ${count} ${section.title.toLowerCase()}`}
                  href={section.href}
                />
              ) : undefined
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
            head={
              <SectionHead
                id={id}
                eyebrow={[section.group, pieces(section.size)].filter(Boolean).join(' · ')}
                title={section.label}
              />
            }
          >
            <TopicShape items={section.items} shape={topicShapes[index] ?? 'split'} />
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

      <InsightsClose lab={lab} closing={closing} />
    </>
  );
}

/**
 * The family's close, the hub's and every format page's: the Lab's offer on tint, then the ask on
 * paper (only with its action), so the two tinted bands never meet and every page ends alike.
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
      {lab ? (
        <CtaSection
          arrangement="offer"
          surface="tint"
          heading={lab.heading}
          body={lab.body?.trim() ? [lab.body] : undefined}
          actions={[lab.action]}
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

const pieces = (count: number) => `${count} ${count === 1 ? 'piece' : 'pieces'}`;

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
      /* Dated rows: the day as a numeral at each row's start, the picture at its end. */
      return <Dates items={byEventDate(items).slice(0, 3)} />;
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
      /* The cover, then a pair: the column's largest picture, then two at half — the format with the
         most to show opens the page at its largest. */
      const { lead, rest } = leadOf(items);
      if (!lead) return null;
      if (!hasPicture(lead)) {
        const shown = items.slice(0, 5);
        return <Split items={shown} meta={metaFor(shown)} />;
      }
      const next = partition(rest).pictured.slice(0, 2);
      const meta = metaFor([lead, ...next]);
      return (
        <Layout rowGap="stack">
          <Cover items={[lead]} meta={meta} />
          {next.length === 2 ? <Pair items={next} meta={meta} /> : null}
        </Layout>
      );
    }
  }
}

type TopicShapeName = 'split' | 'pair' | 'cover';

/**
 * The topic sections' compositions, in turn — the split, the pair, the cover — each section taking
 * the next one its pieces can fill (a pair needs two pictures), and never the one before it.
 */
function turnShapes(sets: readonly (readonly InsightsIndexItem[])[]): TopicShapeName[] {
  const order: readonly TopicShapeName[] = ['split', 'pair', 'cover'];
  const out: TopicShapeName[] = [];
  let turn = 0;
  for (const set of sets) {
    const pictured = set.filter(hasPicture).length;
    const fits = (shape: TopicShapeName) =>
      shape === 'pair' ? pictured >= 2 : shape === 'cover' ? pictured >= 1 : true;
    let shape: TopicShapeName = 'split';
    for (let step = 0; step < order.length; step += 1) {
      const candidate = order[(turn + step) % order.length] ?? 'split';
      if (fits(candidate) && candidate !== out[out.length - 1]) {
        shape = candidate;
        turn += step + 1;
        break;
      }
    }
    out.push(shape);
  }
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
    return (
      <Layout rowGap="stack">
        <Pair items={pictured.slice(0, 2)} meta={meta} />
        {items.length > 2 ? (
          <Index items={[...pictured.slice(2), ...plain]} meta={meta} />
        ) : null}
      </Layout>
    );
  }
  if (shape === 'cover') {
    const [lead, ...rest] = [...pictured, ...plain];
    return (
      <Layout rowGap="stack">
        <Cover items={lead ? [lead] : []} meta={meta} />
        {rest.length > 0 ? <Index items={rest} meta={meta} /> : null}
      </Layout>
    );
  }
  return <Split items={items} meta={meta} />;
}
