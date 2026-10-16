import type { ReactNode } from 'react';

import { Icon, Layout, Section, type MediaImage } from '@/components';
import { ENDPOINTS } from '@/lib/routes';
import { heroTrail } from '@/lib/trail';
import {
  Breadcrumbs,
  CtaSection,
  EnquiryForm,
  IndexRail,
  PageHero,
  type BreadcrumbItem,
  type HeroAction,
} from '@/patterns';

import {
  byEventDate,
  Cinema,
  CuratedSection,
  Dates,
  datesVary,
  Halves,
  hasPicture,
  hasStandfirst,
  Index,
  leadFirst,
  LABEL,
  Lead,
  Ledger,
  partition,
  SectionHead,
  Trio,
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
  /** The page's last beat: the close every family ends on. See `InsightsClosing`. */
  closing?: InsightsClosing;
};

/**
 * The family's close (beauty round 4, 16 Oct 2026): the site's closing split on TINT — the copy
 * left-aligned to the content column, the enquiry form beside it — so the page ends on its one
 * primary action with the weight of its opening, keeping the column's axis, instead of a centred
 * heading and a lone button on bare paper. `origin` names the route the enquiry is sent from.
 */
export type InsightsClosing = {
  eyebrow?: string;
  heading: string;
  body?: string;
  /** The route the form posts from, for the enquiry's hidden context. */
  origin: string;
  /** Where the page is in the family ("insights-hub", "insights-articles"), for the same context. */
  placement: string;
  /** The ask as a link, for a close that cannot carry the form. Unused while the form renders. */
  action?: HeroAction;
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
 * BY TYPE, in page order, each format in its own composition (beauty round 4, 16 Oct 2026) —
 * articles a LEAD over a TRIO, events DATES, videos a CINEMA, guides an INDEX — so no two neighbours
 * share a silhouette and the view opens on its strongest shape: the lead's picture breaks the fold.
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
 *                BY TYPE  a section per format, each in its own composition — articles a lead
 *                         over a trio, events dated, videos a cinema, guides an index
 *                BY TOPIC a section per topic, formats mixed, no piece in two sections, each in
 *                         the composition its pieces can fill (a cinema where it has a video, an
 *                         index where it is mostly words, a lead where it has pictures), no two
 *                         neighbours alike
 *                Both views are in the HTML; the switch shows one and holds it in `?view=`.
 *   C  lab       the other organisation's offer, on tint — only with its picture
 *   D  close     the ask: the copy and the enquiry form, on tint, before the ink footer
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
  const typeLead = byType[0] ? typeSet(byType[0].kind, byType[0].items)[0] : undefined;
  const byTopic = curateTopics(items, topics, typeLead?.id);
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
      {byTopic.map((section) => {
        const id = topicAnchor(section);
        return (
          <CuratedSection
            key={section.id}
            id={id}
            head={<SectionHead id={id} title={section.label} />}
          >
            <TopicShape items={section.items} shape={section.shape} />
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
        arrangement="masthead"
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
 * The family's close, the hub's and every format page's: the Lab's offer on tint (only with its
 * picture), else the ask — the copy and the enquiry form on tint, after the paper curated column, so
 * two tinted bands never meet and tint hands off to the ink footer as every other page's close does.
 */
export function InsightsClose({
  lab,
  closing,
}: {
  lab?: InsightsLab;
  closing?: InsightsClosing;
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
      {closing ? (
        <CtaSection
          /* With the Lab's band on tint above, the close drops to paper: never two tints adjacent. */
          surface={lab?.image ? 'paper' : 'tint'}
          eyebrow={closing.eyebrow || undefined}
          /* A conversation glyph as the eye's entry into the close, as every corpus close has. */
          mark={<Icon name="chat-round-dots" size="xl" />}
          heading={closing.heading}
          body={closing.body?.trim() ? [closing.body] : undefined}
          form={
            <EnquiryForm
              variant="enquiry"
              urlLabel="Product or company URL"
              action={ENDPOINTS.enquiry}
              fieldScale="lg"
              submit="full"
              context={{
                originRoute: closing.origin,
                placement: closing.placement,
                family: 'insights',
                serviceOrAudit: '',
                referrer: '',
                campaign: '',
              }}
            />
          }
        />
      ) : null}
    </>
  );
}

/* ── BY TYPE · the pieces each format shows ─────────────────────────────────────── */

/** How many pieces each format's hub composition takes. */
const TYPE_TAKE: Record<InsightsIndexKind, number> = {
  article: 6,
  event: 3,
  video: 5,
  podcast: 5,
  guide: 5,
  research: 5,
  interview: 5,
};

/**
 * The pieces a format's hub section shows, in the order its composition places them. Articles: six
 * pictured, skipping the three the format page opens on, so "All articles" opens on a reveal rather
 * than a reprint (all pictured from the newest where there are too few to skip). Events by when they
 * happen. Watched pieces newest first. Guides and the other indexed formats: one pictured, then the
 * typographic ones.
 */
function typeSet(kind: InsightsIndexKind, items: readonly InsightsIndexItem[]) {
  const { pictured, plain } = partition(items);
  switch (kind) {
    case 'event':
      return byEventDate(items).slice(0, TYPE_TAKE.event);
    case 'video':
    case 'podcast':
      return [...pictured, ...plain].slice(0, TYPE_TAKE[kind]);
    case 'guide':
    case 'research':
    case 'interview':
      return [...pictured.slice(0, 1), ...plain, ...pictured.slice(1)].slice(
        0,
        TYPE_TAKE[kind],
      );
    case 'article':
    default: {
      const skip = pictured.length >= 9 ? 3 : 0;
      const shown = leadFirst(pictured.slice(skip, skip + TYPE_TAKE.article));
      return shown.length >= 3 ? shown : items.slice(0, 3);
    }
  }
}

function TypeShape({
  kind,
  items,
}: {
  kind: InsightsIndexKind;
  items: readonly InsightsIndexItem[];
}): ReactNode {
  const set = typeSet(kind, items);
  /* The meta line is worded for the pieces SHOWN: the subject leads it (each piece's topic, the
     fact that differs), the dates only where they tell the pieces apart. */
  const meta: MetaOptions = { withSubject: true, withDate: datesVary(set) };
  switch (kind) {
    case 'event':
      return <Dates items={set} size="md" />;
    case 'video':
    case 'podcast':
      return <Cinema items={set} meta={meta} />;
    case 'guide':
    case 'research':
    case 'interview':
      return <Index items={set} meta={meta} />;
    case 'article':
    default: {
      if (!set.every(hasPicture)) return <Ledger items={set} meta={meta} />;
      /* The newest typographic piece is the lead's companion, should its column need one. */
      const companion = partition(items).plain.slice(0, 1);
      return (
        <Layout rowGap="column">
          <Lead items={[...set.slice(0, 3), ...companion]} meta={meta} />
          {set.length >= 6 ? <Trio items={set.slice(3, 6)} meta={meta} /> : null}
        </Layout>
      );
    }
  }
}

/* ── BY TOPIC · curation ──────────────────────────────────────────────────────── */

type TopicShapeName = 'cinema' | 'lead' | 'index' | 'halves' | 'ledger';

const WATCHED_KINDS: ReadonlySet<InsightsIndexKind> = new Set(['video', 'podcast']);

/**
 * What a topic's free pieces can fill, best first: a CINEMA where it has a watched piece and two
 * more pictures; an INDEX where it is mostly words; a LEAD where it has three pictures; HALVES where
 * two; else a LEDGER. Each a complete rectangle, so no composition is asked for more than it has.
 */
function shapesFor(free: readonly InsightsIndexItem[]): TopicShapeName[] {
  const pictured = free.filter(hasPicture);
  const watched = pictured.some((item) => WATCHED_KINDS.has(item.kind));
  const plain = free.length - pictured.length;
  const out: TopicShapeName[] = [];
  if (watched && pictured.length >= 3) out.push('cinema');
  if (pictured.length >= 1 && plain >= 3) out.push('index');
  if (pictured.length >= 3) out.push('lead');
  if (pictured.length >= 2) out.push('halves');
  out.push('ledger');
  return out;
}

/** Pieces in an order that shows a topic's range: one of each format before any repeats. */
function byRange(items: readonly InsightsIndexItem[]) {
  const seen = new Set<InsightsIndexKind>();
  const first: InsightsIndexItem[] = [];
  const later: InsightsIndexItem[] = [];
  for (const item of items) {
    if (seen.has(item.kind)) later.push(item);
    else {
      seen.add(item.kind);
      first.push(item);
    }
  }
  return [...first, ...later];
}

/** The pieces a shape takes from a topic's free pieces, in the order the shape places them. */
function fill(
  shape: TopicShapeName,
  free: readonly InsightsIndexItem[],
  avoidLead?: string,
): InsightsIndexItem[] {
  const pictured = byRange(free.filter(hasPicture));
  const plain = byRange(free.filter((item) => !hasPicture(item)));
  const leadFrom = (pool: InsightsIndexItem[]) => {
    const open = pool.filter((item) => item.id !== avoidLead);
    return open.find(hasStandfirst) ?? open[0] ?? pool[0];
  };
  switch (shape) {
    case 'cinema': {
      const lead =
        pictured.find((item) => WATCHED_KINDS.has(item.kind) && item.id !== avoidLead) ??
        pictured.find((item) => WATCHED_KINDS.has(item.kind));
      if (!lead) return [];
      return [lead, ...pictured.filter((item) => item !== lead).slice(0, 3)];
    }
    case 'index': {
      const lead = leadFrom(pictured);
      return lead ? [lead, ...plain.slice(0, 4)] : plain.slice(0, 4);
    }
    case 'lead': {
      const lead = leadFrom(pictured);
      /* With a typographic companion, should the lead's column need one (see Lead). */
      return lead
        ? [lead, ...pictured.filter((item) => item !== lead).slice(0, 2), ...plain.slice(0, 1)]
        : [];
    }
    case 'halves':
      return pictured.slice(0, 2);
    case 'ledger':
    default:
      return [...pictured, ...plain].slice(0, 4);
  }
}

/**
 * The topic sections: the largest topics first, each in the best composition its free pieces can
 * fill that differs from the section before it, taking exactly the pieces that composition places —
 * never the type view's first lead in the first section. A piece sits in one section only; a topic
 * left with too few is dropped.
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
    shape: TopicShapeName;
    items: InsightsIndexItem[];
  }[] = [];
  for (const topic of ordered) {
    const free = members(topic.id).filter((item) => !used.has(item.id));
    if (free.length < TOPIC_FLOOR) continue;
    const previous = sections[sections.length - 1]?.shape;
    const taken = new Set(sections.map((section) => section.shape));
    const options = shapesFor(free).filter((candidate) => candidate !== previous);
    /* A composition not yet used in the view, before one that has been. */
    const shape = options.find((candidate) => !taken.has(candidate)) ?? options[0] ?? 'ledger';
    const picked = fill(shape, free, sections.length === 0 ? avoidLead : undefined);
    if (picked.length < 2) continue;
    picked.forEach((item) => used.add(item.id));
    sections.push({
      id: topic.id,
      label: topic.label,
      group: topic.group,
      size: topic.size,
      shape,
      items: picked,
    });
  }
  return sections;
}

function TopicShape({
  items,
  shape,
}: {
  items: readonly InsightsIndexItem[];
  shape: TopicShapeName;
}) {
  /* A topic mixes formats: the format leads each piece's meta line. */
  const meta: MetaOptions = { withKind: true, withDate: datesVary(items) };
  switch (shape) {
    case 'cinema':
      return <Cinema items={items} meta={meta} />;
    case 'index':
      return <Index items={items} meta={meta} />;
    case 'lead':
      return <Lead items={items} meta={meta} />;
    case 'halves':
      return <Halves items={items} meta={meta} />;
    case 'ledger':
    default:
      return <Ledger items={items} meta={meta} />;
  }
}
