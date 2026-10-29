import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Media } from '@/components';
import {
  getCaseIndustries,
  getCaseRefs,
  getCaseStudyListingPage,
  getCorpusPage,
  getTestimonialAvatars,
  getTestimonialRatings,
  listCorpusPages,
  type CaseStudyListingItem,
} from '@/content';
import { caseRoutesIn } from '@/lib/corpus-cases';
import type {
  CaseIndustry,
  CorpusBand,
  CorpusBlock,
  CorpusCaseRef,
  CorpusPage,
} from '@/lib/corpus-types';
import { corpusMetadata } from '@/lib/corpus-metadata';
import { inlineToHtml, inlineToText, type InlineRun } from '@/lib/inline';
import { caseStudyPath, CASE_SLUG_REDIRECTS } from '@/lib/routes';
import {
  CorpusBandView,
  ENQUIRY_DRESS,
  ENQUIRY_SKETCH_TO_SHIPPED,
  ListingIndex,
  caseViews,
  corpusEnquiryForm,
  coverFor,
  type CaseGroup,
  type CaseItem,
  type CaseView,
  type ListingIndexProps,
} from '@/templates';

/**
 * `/case-studies`, from the 26 Oct 2026 copy and the Strapi list of live cases (component-map G10,
 * C13; owner, 29 Oct 2026). The template takes no corpus type, so this module is the one place the
 * page's shapes are read onto its props:
 *
 *   hero                 the eyebrow, title and lede; the studio record ("Founded 2017 · …") as the
 *                        masthead's record line
 *   client-recognition   the client wall, under the opening (C13)
 *   featured             three `###` cases, the page's featured cases: each the listing's card-less
 *                        horizontal lead, one to a row (never home's CaseCard; owner, 29 Oct 2026)
 *   four stage tables    the BY STAGE view: one group per table, a card per row ("Case | What we did
 *                        | Best for") in the listing's three-track grid, as /insights sets its
 *                        cards; "Best for" is kept as the card's second line (Q9)
 *   testimonials         the proof wall after the list (decisions/2026-10-29-case-index-carries-
 *                        testimonials, superseding the 22 Oct ruling)
 *   enquiry              the close: home's halves island (2026-10-29-listing-close-is-home-halves)
 *   faq                  after the close: the form comes before the FAQ (`formBeforeFaq`)
 *
 * Covers come from the live case's Strapi thumbnail. A live case no table names (three today) is not
 * dropped: it is filed in the BY INDUSTRY view, under "Other industries" where the proposed filing
 * has no sector for it. It decides no layout: every group takes the template's one shape
 * (`caseViews`).
 *
 * `_corpus` is underscore-prefixed, so Next does not route it.
 */
export const CASE_INDEX_ROUTE = '/case-studies';

export async function caseIndexMetadata(): Promise<Metadata> {
  const page = await getCorpusPage(CASE_INDEX_ROUTE);
  return page ? corpusMetadata(page) : { title: 'Case studies | Tcules' };
}

type Link = Extract<InlineRun, { type: 'link' }>;
type QuoteBlock = Extract<CorpusBlock, { type: 'quote' }>;

const text = inlineToText;

/** The bands the page places itself, around the listing (C13). Every other band is the listing. */
const RECOGNITION = 'client-recognition';
const TESTIMONIALS = 'testimonials';
const FAQ = 'faq';

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

/** The link that closes a run list ("… [Read the Doodle case](/…)"), if one does. */
const trailingLink = (runs: readonly InlineRun[]): Link | undefined => {
  const last = runs.at(-1);
  return last?.type === 'link' ? last : undefined;
};

/** What the route reads besides the copy: the cases' own records, by live route. */
type Sources = {
  page: CorpusPage;
  refs: Readonly<Record<string, CorpusCaseRef>>;
  /** The Strapi list, by live route. */
  live: ReadonlyMap<string, CaseStudyListingItem>;
};

/**
 * A case's cover: the live case's own Strapi thumbnail (the picture its record carries), else what
 * the copy binds for it, else the register's labelled placeholder (`coverFor`), so a set of covers
 * never has a hole.
 */
function coverOf(sources: Sources, name: string, href: string | undefined, band: string) {
  const thumb = href ? sources.live.get(href)?.thumbnail : undefined;
  if (thumb?.src) {
    return {
      src: thumb.src,
      alt: thumb.alt,
      ...(thumb.width && thumb.height ? { width: thumb.width, height: thumb.height } : {}),
      ...(thumb.sources ? { sources: thumb.sources } : {}),
    };
  }
  return coverFor(sources.page, name, href ? sources.refs[href] : undefined, band);
}

/**
 * A `###` case: its paragraph, then its "**Our role:** … [Read the … case](…)" line. The line gives
 * the card its link and cta wording only: the role itself is the case page's ("At a glance"), never
 * the card's (owner, 16 Oct 2026).
 */
function featuredItem(
  sources: Sources,
  block: Extract<CorpusBlock, { type: 'item' }>,
  band: string,
): CaseItem | null {
  const bodyHtml: string[] = [];
  let link: Link | undefined;
  for (const inner of block.blocks) {
    if (inner.type === 'paragraph') bodyHtml.push(inlineToHtml(inner.runs));
    if (inner.type === 'labelled') link = trailingLink(inner.body);
  }
  const href = link?.href;
  if (!href?.startsWith('/case-studies/')) return null;
  const name = block.headingText.split(':')[0] ?? block.headingText;
  return {
    id: href,
    href,
    title: block.headingText,
    description: '',
    bodyHtml,
    ctaLabel: link ? text(link.children) : undefined,
    cover: coverOf(sources, name, href, band),
    featured: true,
  };
}

/**
 * A stage table's row: the case's name (a link where the case is published), what we did, and who
 * it is best for. The name is the card's title; "What we did" its body; "Best for" its second line,
 * under the column's own header, so the words the copy gives every case survive on the card (Q9).
 * A row with no link ("Case study coming soon") is shown, unlinked: the copy lists it.
 */
function rowItem(
  sources: Sources,
  header: readonly InlineRun[][],
  row: readonly InlineRun[][],
  band: string,
): CaseItem | null {
  const [nameCell = [], didCell = [], bestCell = []] = row;
  const name = text(nameCell).trim();
  if (!name) return null;
  const link = firstLink(nameCell);
  const href = link?.href.startsWith('/case-studies/') ? link.href : undefined;
  const bestLabel = text(header[2] ?? []).trim();
  const best = text(bestCell).trim();
  return {
    id: href ?? `${band}-${name}`,
    href,
    title: name,
    description: '',
    bodyHtml: [
      inlineToHtml(didCell),
      ...(best
        ? [`${bestLabel ? `<strong>${bestLabel}:</strong> ` : ''}${inlineToHtml(bestCell)}`]
        : []),
    ],
    cover: coverOf(sources, name, href, band),
  };
}

/** One listing band as its group: the featured `###` cases, or a stage table's rows. */
function groupOf(sources: Sources, band: CorpusBand): CaseGroup {
  const items = band.blocks.flatMap((block): CaseItem[] => {
    if (block.type === 'item') {
      const item = featuredItem(sources, block, band.id);
      return item ? [item] : [];
    }
    if (block.type === 'table') {
      return block.rows.flatMap((row) => {
        const item = rowItem(sources, block.header, row, band.id);
        return item ? [item] : [];
      });
    }
    return [];
  });
  return { id: band.id, heading: band.headingText, items };
}

/** A live case no table names: its Strapi record, as the industry view lists it. */
function liveItem(sources: Sources, route: string, record: CaseStudyListingItem): CaseItem {
  return {
    id: route,
    href: route,
    title: record.client ? `${record.client}: ${record.title}` : record.title,
    description: record.description,
    cover: coverOf(sources, record.client ?? record.title, route, 'live'),
  };
}

const anchorOf = (prefix: string, label: string) =>
  `${prefix}-${label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;

/** A case route the filing names by its planned slug, moved to the live one as every link is. */
function liveRoute(route: string): string {
  const slug = /^\/case-studies\/([^/#?]+)$/.exec(route)?.[1];
  const moved = slug ? CASE_SLUG_REDIRECTS[slug] : undefined;
  return moved ? caseStudyPath(moved) : route;
}

/**
 * BY INDUSTRY (PROPOSED, P50): every published case once, under the sector the filing names, in the
 * filing's order; a case the filing does not name goes under "Other industries" rather than out of
 * the view.
 */
function byIndustry(cases: readonly CaseItem[], filing: readonly CaseIndustry[]): CaseGroup[] {
  const byRoute = new Map<string, CaseItem>();
  for (const item of cases)
    if (item.href && !byRoute.has(item.href)) byRoute.set(item.href, item);
  const done = new Set<string>();
  const grouped = filing.map((group) => {
    const items = group.cases.flatMap((planned) => {
      const route = liveRoute(planned);
      const item = byRoute.get(route);
      if (!item || done.has(route)) return [];
      done.add(route);
      return [item];
    });
    return { id: anchorOf('industry', group.label), heading: group.label, items };
  });
  const rest = [...byRoute.values()].filter((item) => !done.has(item.href ?? ''));
  const other = 'Other industries';
  return [
    ...grouped,
    ...(rest.length > 0
      ? [{ id: anchorOf('industry', other), heading: other, items: rest }]
      : []),
  ].filter((group) => group.items.length > 0);
}

/* ── The proof wall's ratings ─────────────────────────────────────────────────────
   The copy's testimonials band quotes five clients but its frontmatter lists two ids, so the seam's
   positional match (load.ts) gives none of the five an id, and a quote without one shows no stars
   (2026-10-12: a testimonial always shows its rating). Each quote is matched instead by its words to
   the same quote where another page's copy gives it an id, then by the frontmatter id whose name the
   attribution carries ("DRAFT-CONNECTX-GHOSHAL" ← "Pratik Ghoshal, CEO, ConnectX"), then by the
   register (`REGISTER_IDS`), then by the id another page gives the same speaker — the first of them
   that carries a rating. */

const normal = (value: string) =>
  value
    .toLowerCase()
    .replace(/[“”"’']/g, '')
    .replace(/\s+/g, ' ')
    .trim();
const quoteKey = (block: QuoteBlock) => normal(block.paragraphs.map(text).join(' '));

function quotesOf(blocks: readonly CorpusBlock[]): QuoteBlock[] {
  return blocks.flatMap((block) =>
    block.type === 'quote' ? [block] : block.type === 'item' ? quotesOf(block.blocks) : [],
  );
}

/**
 * The testimonial register's ids for the two speakers no page's copy gives an id (Gold Image
 * Printing's "find their way around", Ryzeo's reporting method): the register names them, the copy's
 * frontmatter does not yet. CONTENT GAP: the content team adds all five ids to /case-studies'
 * `testimonial_ids` and this table goes.
 */
const REGISTER_IDS: Readonly<Record<string, string>> = {
  'david aghaei': 'FP-GOLDIMAGE-NAVIGATION',
  'russell miler': 'UW-RAZEO-METHOD',
};

/** Who a quote is from, as a key: the attribution's first part, the speaker's name. */
const speakerKey = (block: QuoteBlock) =>
  normal(text(block.attribution ?? []).split(',')[0] ?? '');

async function withTestimonialIds(page: CorpusPage, band: CorpusBand): Promise<CorpusBand> {
  const known = new Map<string, string>();
  const bySpeaker = new Map<string, string>();
  for (const other of await listCorpusPages()) {
    for (const quote of quotesOf(other.bands.flatMap((b) => b.blocks))) {
      if (!quote.testimonialId) continue;
      if (!known.has(quoteKey(quote))) known.set(quoteKey(quote), quote.testimonialId);
      const speaker = speakerKey(quote);
      if (speaker && !bySpeaker.has(speaker)) bySpeaker.set(speaker, quote.testimonialId);
    }
  }
  const declared = page.composition.testimonialIds;
  /* Every id each quote could take, in order: the same words; the id the page declares for this
     speaker; the register's; the id another page gives the same speaker (one client, one rating). */
  const candidatesOf = (block: QuoteBlock) => {
    const who = normal(text(block.attribution ?? []));
    const byName = declared.find((id) =>
      id
        .toLowerCase()
        .split('-')
        .slice(1)
        .some((token) => token.length > 3 && who.includes(token)),
    );
    return [
      known.get(quoteKey(block)),
      byName,
      REGISTER_IDS[speakerKey(block)],
      bySpeaker.get(speakerKey(block)),
    ].filter((id): id is string => Boolean(id));
  };
  const quotes = band.blocks.filter((block): block is QuoteBlock => block.type === 'quote');
  const rated = await getTestimonialRatings([...new Set(quotes.flatMap(candidatesOf))]);
  return {
    ...band,
    blocks: band.blocks.map((block) => {
      if (block.type !== 'quote' || block.testimonialId) return block;
      const candidates = candidatesOf(block);
      /* The first that carries a rating, so the card shows its stars; else the first. */
      const id = candidates.find((candidate) => rated[candidate]) ?? candidates[0];
      return id ? { ...block, testimonialId: id } : block;
    }),
  };
}

type Query = Record<string, string | string[] | undefined>;

/**
 * The page's ListingIndex props, from the copy, the Strapi list and the URL (`?view=industry`).
 * `adjust` lets the specimen (`/design/listing-index?data=cases`) run this same mapping over a
 * stressed set of views, so the live page and its specimen cannot drift.
 */
export async function caseIndexProps(
  query: Query = {},
  adjust: (views: CaseView[]) => CaseView[] = (views) => views,
): Promise<ListingIndexProps | null> {
  const page = await getCorpusPage(CASE_INDEX_ROUTE);
  if (!page) return null;

  const bandById = (id: string) => page.bands.find((band) => band.id === id);
  const anchor = page.conversion?.anchor ?? 'enquiry';
  const closeBand = bandById(anchor);
  const recognition = bandById(RECOGNITION);
  const faq = bandById(FAQ);
  const quotesBand = bandById(TESTIMONIALS);
  const proof = quotesBand ? await withTestimonialIds(page, quotesBand) : undefined;
  const ids = proof
    ? quotesOf(proof.blocks).flatMap((quote) =>
        quote.testimonialId ? [quote.testimonialId] : [],
      )
    : [];

  const [refs, ratings, avatars, industries, listing] = await Promise.all([
    getCaseRefs(caseRoutesIn(page)),
    getTestimonialRatings(ids),
    getTestimonialAvatars(ids),
    getCaseIndustries(),
    /* The live list; without it the page still renders from the copy, covers from the copy. */
    getCaseStudyListingPage('case-studies').catch(() => null),
  ]);
  const live = new Map(
    (listing?.items ?? []).map((record) => [caseStudyPath(record.slug), record] as const),
  );
  const sources: Sources = { page, refs, live };

  /* The listing: every band the page does not place itself, in the copy's order. */
  const own = new Set([RECOGNITION, TESTIMONIALS, FAQ, anchor]);
  const groups = page.bands
    .filter((band) => !own.has(band.id))
    .map((band) => groupOf(sources, band))
    .filter((group) => group.items.length > 0);

  /* Every published case for BY INDUSTRY: the copy's, then the live ones it does not name. */
  const named = groups.flatMap((group) => group.items).filter((item) => item.href);
  const namedRoutes = new Set(named.map((item) => item.href));
  const unnamed = [...live.entries()]
    .filter(([route]) => !namedRoutes.has(route))
    .map(([route, record]) => liveItem(sources, route, record));
  const industry = byIndustry([...named, ...unnamed], industries);

  const views: CaseView[] = [
    { id: 'stage', label: 'By stage', groups },
    ...(industry.length > 0
      ? [{ id: 'industry', label: 'By industry', groups: industry }]
      : []),
  ];

  const requested = query.view;
  const view = Array.isArray(requested) ? requested[0] : requested;
  const lead = closeBand?.blocks.find((block) => block.type === 'paragraph');
  /* The studio record the copy sets in bold under the lede ("Founded 2017 · More than 90 projects
     · …"): the masthead's record line, each fact its own word-group. */
  const record = page.hero.proofLines
    .map((line) => text(line).trim())
    .find((line) => line.includes(' · '))
    ?.split(' · ')
    .map((fact) => fact.trim())
    .filter(Boolean);

  /* The listing's opening takes no ask (PageHero `masthead`: a listing's ask is its list; the
     29 Sep ruling kept a button off the index), so the hero's "Tell us about your product" is not
     shown — proposal P15. The close below is the page's ask. */
  return {
    breadcrumbs: page.breadcrumb.map((crumb) => ({ label: crumb.name, href: crumb.url })),
    hero: {
      title: page.hero.titleText.trim() || page.name,
      eyebrow: page.hero.eyebrow ? text(page.hero.eyebrow) : undefined,
      lede: page.hero.lede.map(text),
      record,
    },
    label: 'Case studies',
    railLabel: 'Browse case studies',
    views: caseViews(adjust(views)),
    view,
    empty: 'No case studies have been published yet.',
    bands: {
      afterHero: recognition ? <CorpusBandView page={page} band={recognition} /> : undefined,
      afterListing: proof ? (
        <CorpusBandView page={page} band={proof} ratings={ratings} avatars={avatars} />
      ) : undefined,
      afterClose: faq ? <CorpusBandView page={page} band={faq} /> : undefined,
    },
    closing: closeBand
      ? {
          id: closeBand.id,
          heading: closeBand.headingText,
          body: lead?.type === 'paragraph' ? text(lead.runs) : undefined,
          /* Home's close, as /insights has it (2026-10-29-listing-close-is-home-halves): the proof
             wall above it is tint, so the plain tint close would touch it. */
          island: {
            surface: 'blue',
            art: <Media image={ENQUIRY_SKETCH_TO_SHIPPED} sizes="300px" />,
          },
          form: corpusEnquiryForm(page, closeBand, { dress: ENQUIRY_DRESS.card }),
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
