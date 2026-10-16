import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCaseRefs, getCorpusPage, getTestimonialRatings } from '@/content';
import { caseRoutesIn } from '@/lib/corpus-cases';
import type {
  CorpusBand,
  CorpusBlock,
  CorpusCaseRef,
  CorpusPage,
  TestimonialRating,
} from '@/lib/corpus-types';
import { corpusMetadata } from '@/lib/corpus-metadata';
import { inlineToHtml, inlineToText, type InlineRun } from '@/lib/inline';
import { ROUTES } from '@/lib/routes';
import {
  CaseStudyIndex,
  corpusEnquiryForm,
  coverFor,
  testimonialItem,
  type CaseStudyIndexItem,
  type CaseStudyIndexSection,
} from '@/templates';

/**
 * `/case-studies`, from the corpus (page-mapping § 4.6). The template takes no corpus type, so this
 * module is the one place the page's shapes are read onto its props: a band of `###` cases, a band of
 * bold-led paragraphs ("**[Auxentios](/…): one quoting product.** Eight interviews…"), and a quote.
 * It decides no layout. The first band is the template's `featured` set and the rest its `sections`;
 * which arrangement a group takes is the template's call, from its count.
 *
 * `_corpus` is underscore-prefixed, so Next does not route it.
 */
export async function caseIndexMetadata(): Promise<Metadata> {
  const page = await getCorpusPage(ROUTES.caseStudies);
  return page ? corpusMetadata(page) : { title: 'Case studies | Tcules' };
}

type Paragraph = Extract<CorpusBlock, { type: 'paragraph' }>;
type Link = Extract<InlineRun, { type: 'link' }>;

const text = inlineToText;

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
    detail?: { label: string; value: string };
    ctaLabel?: string;
    band: string;
  },
): CaseStudyIndexItem {
  return {
    id: fields.href ?? fields.title,
    href: fields.href ?? '',
    title: fields.title,
    description: '',
    bodyHtml: fields.bodyHtml,
    detail: fields.detail,
    ctaLabel: fields.ctaLabel,
    cover: coverFor(
      page,
      fields.name,
      fields.href ? refs[fields.href] : undefined,
      fields.band,
    ),
  };
}

/** A `###` case: its paragraph, then its "**Our role:** … [Read the … case](…)" line. */
function featuredItem(
  page: CorpusPage,
  refs: Readonly<Record<string, CorpusCaseRef>>,
  block: Extract<CorpusBlock, { type: 'item' }>,
  band: string,
): CaseStudyIndexItem {
  const bodyHtml: string[] = [];
  let detail: { label: string; value: string } | undefined;
  let href: string | undefined;
  let ctaLabel: string | undefined;
  for (const inner of block.blocks) {
    if (inner.type === 'paragraph') bodyHtml.push(inlineToHtml(inner.runs));
    if (inner.type === 'labelled') {
      const lifted = liftTrailingLink(inner.body);
      href = lifted.link?.href;
      ctaLabel = lifted.link ? text(lifted.link.children) : undefined;
      /* A labelled fact ("**Our role:** research and product design") is the card's detail: the
         label over its value. The label's trailing colon is not rendered, because the stacking
         does the colon's job (page-mapping § 0 rule 1). A value that holds a link or a bold run
         keeps its words in the body instead, so nothing is flattened. */
      if (lifted.runs.every((run) => run.type === 'text')) {
        detail = {
          label: text(inner.label).replace(/:\s*$/, ''),
          value: text(lifted.runs),
        };
      } else {
        bodyHtml.push(
          `<strong>${inlineToHtml(inner.label)}</strong> ${inlineToHtml(lifted.runs)}`,
        );
      }
    }
  }
  return itemOf(page, refs, {
    title: block.headingText,
    name: block.headingText.split(':')[0] ?? block.headingText,
    href,
    bodyHtml,
    detail,
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
): CaseStudyIndexItem | null {
  const [lead, ...rest] = block.runs;
  if (lead?.type !== 'strong') return null;
  const link = firstLink(lead.children);
  const body =
    rest[0]?.type === 'text'
      ? [{ ...rest[0], text: rest[0].text.replace(/^\s+/, '') }, ...rest.slice(1)]
      : rest;
  return itemOf(page, refs, {
    title: text(lead.children),
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
): CaseStudyIndexItem {
  const link = firstLink(block.label);
  return itemOf(page, refs, {
    title: text(block.label),
    name: link ? text(link.children) : text(block.label),
    href: link?.href,
    bodyHtml: [inlineToHtml(block.body)],
    band,
  });
}

function sectionOf(
  page: CorpusPage,
  refs: Readonly<Record<string, CorpusCaseRef>>,
  band: CorpusBand,
  ratings: Readonly<Record<string, TestimonialRating>>,
): CaseStudyIndexSection {
  const items: CaseStudyIndexItem[] = [];
  let quote: CaseStudyIndexSection['quote'];
  for (const block of band.blocks) {
    if (block.type === 'item') items.push(featuredItem(page, refs, block, band.id));
    else if (block.type === 'labelled') items.push(labelledItem(page, refs, block, band.id));
    else if (block.type === 'paragraph') {
      const item = boldLedItem(page, refs, block, band.id);
      if (item) items.push(item);
    } else if (block.type === 'quote') quote = testimonialItem(block, ratings);
  }
  return { id: band.id, heading: band.headingText, items, quote };
}

export async function CaseIndexRoute() {
  const page = await getCorpusPage(ROUTES.caseStudies);
  if (!page) notFound();
  const [refs, ratings] = await Promise.all([
    getCaseRefs(caseRoutesIn(page)),
    getTestimonialRatings(page.composition.testimonialIds),
  ]);

  const anchor = page.conversion?.anchor ?? 'enquiry';
  const closeBand = page.bands.find((band) => band.id === anchor);
  const lead = closeBand?.blocks.find((block) => block.type === 'paragraph');
  const [action] = page.hero.actions;
  /* The first band is the featured set ("Four to start with"), full width under the hero; the rest
     are the situations, each a group beside the outline. The band order is the corpus's. */
  const [featuredBand, ...situationBands] = page.bands.filter((band) => band.id !== anchor);

  return (
    <CaseStudyIndex
      breadcrumbs={page.breadcrumb.map((crumb) => ({ label: crumb.name, href: crumb.url }))}
      hero={{
        name: page.name,
        message: page.hero.titleText,
        eyebrow: page.hero.eyebrow ? text(page.hero.eyebrow) : undefined,
        lede: page.hero.lede.map(text),
        action: action ? { label: action.labelText, href: action.href } : undefined,
        texture: true,
      }}
      featured={featuredBand ? sectionOf(page, refs, featuredBand, ratings) : undefined}
      sections={situationBands.map((band) => sectionOf(page, refs, band, ratings))}
      closing={
        closeBand
          ? {
              id: closeBand.id,
              heading: closeBand.headingText,
              body: lead?.type === 'paragraph' ? text(lead.runs) : undefined,
              form: corpusEnquiryForm(page),
            }
          : undefined
      }
    />
  );
}
