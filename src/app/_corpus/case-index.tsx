import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  getCaseIndustries,
  getCaseRefs,
  getCaseStages,
  getCorpusPage,
  getTestimonialAvatars,
  getTestimonialRatings,
} from '@/content';
import { caseRoutesIn } from '@/lib/corpus-cases';
import type {
  CorpusBand,
  CorpusBlock,
  CorpusCaseRef,
  CaseIndustry,
  CaseStage,
  CorpusPage,
  TestimonialAvatarRecord,
  TestimonialRating,
} from '@/lib/corpus-types';
import { corpusMetadata } from '@/lib/corpus-metadata';
import { inlineToHtml, inlineToText, type InlineRun } from '@/lib/inline';
import {
  ListingIndex,
  caseViews,
  corpusEnquiryForm,
  coverFor,
  testimonialItem,
  type CaseGroup,
  type CaseItem,
  type CaseView,
  type ListingIndexProps,
} from '@/templates';
import type { TestimonialItem } from '@/patterns';

/**
 * `/case-studies`, from the corpus (page-mapping § 4.6). The template takes no corpus type, so this
 * module is the one place the page's shapes are read onto its props: a band of `###` cases, a band of
 * bold-led paragraphs ("**[Auxentios](/…): one quoting product.** Eight interviews…"), and a quote.
 * It decides no layout. Which arrangement a group takes is the template's call (ListingIndex's
 * `caseViews`), from its position and its count.
 *
 * `_corpus` is underscore-prefixed, so Next does not route it.
 */
export const CASE_INDEX_ROUTE = '/case-studies';

export async function caseIndexMetadata(): Promise<Metadata> {
  const page = await getCorpusPage(CASE_INDEX_ROUTE);
  return page ? corpusMetadata(page) : { title: 'Case studies | Tcules' };
}

type Paragraph = Extract<CorpusBlock, { type: 'paragraph' }>;
type Link = Extract<InlineRun, { type: 'link' }>;

const text = inlineToText;

/** A run-in's closing full stop is the paragraph's punctuation, not the card title's (as home's
    capability cards drop it). */
const runIn = (label: string) => label.trim().replace(/\.$/, '');

/** The first link anywhere in runs (a title that is a link, or holds one). */
function firstLink(runs: readonly InlineRun[]): Link | undefined {
  for (const run of runs) {
    if (run.type === 'link') return run;
    if ('children' in run) {
      const found = firstLink(run.children);
      if (found) return found;
    }
  }
  return undefined;
}

/** A trailing link lifted out of runs: the runs without it, and the link. */
function liftTrailingLink(runs: readonly InlineRun[]): { runs: InlineRun[]; link?: Link } {
  const copy = [...runs];
  const last = copy.at(-1);
  if (last?.type !== 'link') return { runs: copy };
  copy.pop();
  const tail = copy.at(-1);
  if (tail?.type === 'text')
    copy[copy.length - 1] = { type: 'text', text: tail.text.replace(/\s+$/, '') };
  return { runs: copy, link: last };
}

function itemOf(
  page: CorpusPage,
  refs: Readonly<Record<string, CorpusCaseRef>>,
  fields: {
    title: string;
    name: string;
    href?: string;
    bodyHtml: string[];
    ctaLabel?: string;
    band: string;
  },
): CaseItem {
  return {
    id: fields.href ?? fields.title,
    href: fields.href ?? '',
    title: fields.title,
    description: '',
    bodyHtml: fields.bodyHtml,
    ctaLabel: fields.ctaLabel,
    cover: coverFor(
      page,
      fields.name,
      fields.href ? refs[fields.href] : undefined,
      fields.band,
    ),
  };
}

/**
 * A `###` case: its paragraph, then its "**Our role:** … [Read the … case](…)" line. The line gives
 * the card its link and cta wording only: the role itself is the case page's ("At a glance"), never
 * the card's (owner, 16 Oct 2026). A second sentence on a card made a set unequal in height.
 */
function featuredItem(
  page: CorpusPage,
  refs: Readonly<Record<string, CorpusCaseRef>>,
  block: Extract<CorpusBlock, { type: 'item' }>,
  band: string,
): CaseItem {
  const bodyHtml: string[] = [];
  let href: string | undefined;
  let ctaLabel: string | undefined;
  for (const inner of block.blocks) {
    if (inner.type === 'paragraph') bodyHtml.push(inlineToHtml(inner.runs));
    if (inner.type === 'labelled') {
      const lifted = liftTrailingLink(inner.body);
      href = lifted.link?.href;
      ctaLabel = lifted.link ? text(lifted.link.children) : undefined;
    }
  }
  return itemOf(page, refs, {
    title: block.headingText,
    name: block.headingText.split(':')[0] ?? block.headingText,
    href,
    bodyHtml,
    ctaLabel,
    band,
  });
}

/** A paragraph that opens with a bold run holding the link: the run is the title, the rest the body. */
function boldLedItem(
  page: CorpusPage,
  refs: Readonly<Record<string, CorpusCaseRef>>,
  block: Paragraph,
  band: string,
): CaseItem | null {
  const [lead, ...rest] = block.runs;
  if (lead?.type !== 'strong') return null;
  const link = firstLink(lead.children);
  const body =
    rest[0]?.type === 'text'
      ? [{ ...rest[0], text: rest[0].text.replace(/^\s+/, '') }, ...rest.slice(1)]
      : rest;
  return itemOf(page, refs, {
    title: runIn(text(lead.children)),
    name: link ? text(link.children) : text(lead.children),
    href: link?.href,
    bodyHtml: [inlineToHtml(body)],
    band,
  });
}

/** A `labelled` block ("**[Auxentios](/…): one quoting product.** Eight interviews…"): label, then body. */
function labelledItem(
  page: CorpusPage,
  refs: Readonly<Record<string, CorpusCaseRef>>,
  block: Extract<CorpusBlock, { type: 'labelled' }>,
  band: string,
): CaseItem {
  const link = firstLink(block.label);
  return itemOf(page, refs, {
    title: runIn(text(block.label)),
    name: link ? text(link.children) : text(block.label),
    href: link?.href,
    bodyHtml: [inlineToHtml(block.body)],
    band,
  });
}

/**
 * Whose words a quote is: the case whose name the attribution carries ("Trishanya Raju, Founder,
 * The Wandering Raven" → The Wandering Raven), else the band's only case. A quote that names no case
 * in a band of several is left out rather than pinned to the wrong one.
 */
function quotedCase(items: readonly CaseItem[], quote: TestimonialItem): CaseItem | undefined {
  const company = quote.company?.toLowerCase().trim();
  const named = company
    ? items.find((item) => {
        const name = (item.title.split(':')[0] ?? '').toLowerCase().trim();
        return name && (company.includes(name) || name.includes(company));
      })
    : undefined;
  return named ?? (items.length === 1 ? items[0] : undefined);
}

function sectionOf(
  page: CorpusPage,
  refs: Readonly<Record<string, CorpusCaseRef>>,
  band: CorpusBand,
  ratings: Readonly<Record<string, TestimonialRating>>,
  avatars: Readonly<Record<string, TestimonialAvatarRecord>>,
): CaseGroup {
  const items: CaseItem[] = [];
  let quote: TestimonialItem | undefined;
  for (const block of band.blocks) {
    if (block.type === 'item') items.push(featuredItem(page, refs, block, band.id));
    else if (block.type === 'labelled') items.push(labelledItem(page, refs, block, band.id));
    else if (block.type === 'paragraph') {
      const item = boldLedItem(page, refs, block, band.id);
      if (item) items.push(item);
    } else if (block.type === 'quote') quote = testimonialItem(block, ratings, avatars);
  }
  /* The case whose client the band quotes is the band's featured case: it leads its group as one
     card in either view. The card shows no quote (owner, 22 Oct 2026: "case study cards never hold
     testimonials in them"); the quote only says which case the corpus put forward. */
  const owner = quote ? quotedCase(items, quote) : undefined;
  return {
    id: band.id,
    heading: band.headingText,
    items: items.map((item) => (item === owner ? { ...item, featured: true } : item)),
  };
}

const anchorOf = (prefix: string, label: string) =>
  `${prefix}-${label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;

/**
 * One view's sections: every case the page lists, once, under the group a filing names (BY STAGE,
 * PLACEHOLDER, P51; BY INDUSTRY, PROPOSED, P50), in the filing's order. A case no group names yet
 * goes under the view's catch-all (`other`) rather than out of the view.
 */
function filed(
  groups: readonly CaseGroup[],
  filing: readonly (CaseStage | CaseIndustry)[],
  prefix: string,
  other: string,
): CaseGroup[] {
  const cases = new Map<string, CaseItem>();
  for (const item of groups.flatMap((group) => group.items)) {
    if (item.href && !cases.has(item.href)) cases.set(item.href, item);
  }
  const done = new Set<string>();
  const grouped = filing.map((group) => {
    const items = group.cases.flatMap((route) => {
      const item = cases.get(route);
      if (!item || done.has(route)) return [];
      done.add(route);
      return [item];
    });
    return { id: anchorOf(prefix, group.label), heading: group.label, items };
  });
  const rest = [...cases.values()].filter((item) => !done.has(item.href));
  return [
    ...grouped,
    ...(rest.length > 0 ? [{ id: anchorOf(prefix, other), heading: other, items: rest }] : []),
  ].filter((group) => group.items.length > 0);
}

/**
 * The two ways the index is sorted: BY STAGE first, the default (owner, 22 Oct 2026: it replaced BY
 * TYPE, the corpus's own bands), then BY INDUSTRY. The bands still collect the cases and say which
 * one each band features; they are no longer a view of their own.
 */
function viewsOf(
  bands: readonly CaseGroup[],
  stages: readonly CaseStage[],
  industries: readonly CaseIndustry[],
): CaseView[] {
  const byStage = filed(bands, stages, 'stage', 'Other stages');
  const byIndustry = filed(bands, industries, 'industry', 'Other industries');
  return [
    { id: 'stage', label: 'By stage', groups: byStage },
    ...(byIndustry.length > 0
      ? [{ id: 'industry', label: 'By industry', groups: byIndustry }]
      : []),
  ];
}

type Query = Record<string, string | string[] | undefined>;

/**
 * The page's ListingIndex props, from the corpus and the URL (`?view=industry`). `adjust` lets the
 * specimen (`/design/listing-index?data=cases`) run this same mapping over a stressed set of views —
 * fewer cases, missing covers, no cases at all — so the live page and its specimen cannot drift.
 */
export async function caseIndexProps(
  query: Query = {},
  adjust: (views: CaseView[]) => CaseView[] = (views) => views,
): Promise<ListingIndexProps | null> {
  const page = await getCorpusPage(CASE_INDEX_ROUTE);
  if (!page) return null;
  const ids = page.composition.testimonialIds;
  const [refs, ratings, avatars, stages, industries] = await Promise.all([
    getCaseRefs(caseRoutesIn(page)),
    getTestimonialRatings(ids),
    getTestimonialAvatars(ids),
    getCaseStages(),
    getCaseIndustries(),
  ]);
  const requested = query.view;
  const view = Array.isArray(requested) ? requested[0] : requested;

  const anchor = page.conversion?.anchor ?? 'enquiry';
  const closeBand = page.bands.find((band) => band.id === anchor);
  const lead = closeBand?.blocks.find((block) => block.type === 'paragraph');

  /* The listing's opening takes no ask (PageHero `masthead`: a listing's ask is its list; the
     29 Sep ruling kept a button off the index), so a hero action the corpus authors is not shown —
     the content team is asked to drop it (proposal P15). The close below is the page's ask. */
  return {
    breadcrumbs: page.breadcrumb.map((crumb) => ({ label: crumb.name, href: crumb.url })),
    hero: {
      title: page.hero.titleText.trim() || page.name,
      eyebrow: page.hero.eyebrow ? text(page.hero.eyebrow) : undefined,
      lede: page.hero.lede.map(text),
    },
    label: 'Case studies',
    railLabel: 'Browse case studies',
    views: caseViews(
      adjust(
        viewsOf(
          page.bands
            .filter((band) => band.id !== anchor)
            .map((band) => sectionOf(page, refs, band, ratings, avatars)),
          stages,
          industries,
        ),
      ),
    ),
    view,
    empty: 'No case studies have been published yet.',
    closing: closeBand
      ? {
          id: closeBand.id,
          heading: closeBand.headingText,
          body: lead?.type === 'paragraph' ? text(lead.runs) : undefined,
          form: corpusEnquiryForm(page),
        }
      : undefined,
  };
}

type CaseIndexRouteProps = {
  searchParams?: Promise<Query>;
};

export async function CaseIndexRoute({ searchParams }: CaseIndexRouteProps) {
  const props = await caseIndexProps(await searchParams);
  if (!props) notFound();
  return <ListingIndex {...props} />;
}
