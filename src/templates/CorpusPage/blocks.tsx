import { Fragment, type ReactNode } from 'react';

import { Layout, Media, type SectionSurface } from '@/components';
import {
  Accordion,
  Breadcrumbs,
  CtaRow,
  CtaSection,
  DataTable,
  EnquiryForm,
  PageHero,
  Proof,
  type AccordionItem,
  type HeroActions,
  type HeroMedia,
  type ProofQuote,
} from '@/patterns';
import { parseAttribution } from '@/lib/attribution';
import type { CorpusBand, CorpusBlock, CorpusPage } from '@/lib/corpus-types';
import { inlineToHtml, type InlineRun } from '@/lib/inline';
import { renderInline } from '@/lib/inline-render';
import { HEAD_TRACK } from '@/lib/image-sizes';
import { ENDPOINTS } from '@/lib/routes';
import { heroTrail } from '@/lib/trail';

import styles from './CorpusPage.module.css';
import { hasLink, html, inline, plain } from './text';

/**
 * The corpus pages' shared renderers: one content shape, one component, on every page type
 * (page-mapping § 2). They live in ONE template folder because a template may not import a sibling
 * template, and the renderers cannot live in `src/lib` (it may not import a pattern) or in
 * `src/patterns` (a pattern may not know a corpus type). The same arrangement ServicePage chose.
 *
 * Nothing here writes a word: every string comes from the corpus page as authored, through the
 * label rules in text.ts.
 */

export type CorpusFormContext = {
  /** Where the enquiry posts. Named in `ENDPOINTS`, never a literal here. */
  action: string;
};

/** A heading's id: `<band>-heading` (page-mapping § 3). */
export const headingIdOf = (band: CorpusBand): string => `${band.id}-heading`;

/** The head every ContentSection band shares: its id, its heading and the heading's id. */
export function head(band: CorpusBand) {
  return { id: band.id, heading: band.headingText, headingId: headingIdOf(band) } as const;
}

/* ── Hero ─────────────────────────────────────────────────────────────────────── */

export type CorpusHeroProps = {
  page: CorpusPage;
  arrangement?: 'stacked' | 'beside';
  media?: HeroMedia;
  /** A bare run of facts (home's studio record), one tag each, after the actions. */
  tags?: readonly string[];
  /** The lede paragraphs the hero keeps; the rest are split into the next band by the template. */
  ledes?: readonly InlineRun[][];
  /** The labelled proof line goes above the actions as the extras row. */
  proofLine?: boolean;
  texture?: boolean;
};

/**
 * M1 — the hero. Eyebrow, h1 and lede verbatim, the page's asks in order (the first is the page's one
 * blue solid), the trail from the frontmatter's breadcrumb. A labelled proof line ("Selected work:
 * …") renders above the actions as the extras row, in its authored italic; a label-less run of facts
 * becomes `tags`.
 */
export function CorpusHero({
  page,
  arrangement = 'stacked',
  media,
  tags,
  ledes,
  proofLine = true,
  texture,
}: CorpusHeroProps) {
  const { hero } = page;
  const crumbs = page.breadcrumb.map((crumb) => ({ label: crumb.name, href: crumb.url }));
  const paragraphs = (ledes ?? hero.lede).map(plain).filter(Boolean);
  const actions = hero.actions
    .slice(0, 2)
    .map((action) => ({
      label: action.labelText,
      href: action.href,
    })) as unknown as HeroActions;
  const eyebrow = hero.eyebrow ? plain(hero.eyebrow) : undefined;
  const [firstProof] = hero.proofLines;
  return (
    <PageHero
      data-band="A"
      data-fold-hero=""
      surface="paper"
      trail={heroTrail(crumbs, hero.titleText, (trail) => (
        <Breadcrumbs {...trail} />
      ))}
      eyebrow={eyebrow}
      title={hero.titleText}
      body={paragraphs.length > 0 ? (paragraphs as [string, ...string[]]) : undefined}
      actions={actions}
      arrangement={media ? arrangement : 'stacked'}
      media={media}
      tags={tags}
      texture={texture}
    >
      {proofLine && firstProof ? (
        <p className={styles.proofLine}>{renderInline(firstProof)}</p>
      ) : null}
    </PageHero>
  );
}

/* ── Quotes ───────────────────────────────────────────────────────────────────── */

type QuoteBlock = Extract<CorpusBlock, { type: 'quote' }>;

/**
 * A corpus quote as a Proof quote. The authored marks stay inside the quote's HTML — Proof draws
 * none of its own — and the attribution line splits into name, role and company (G13). A quote that
 * awaits client sign-off renders as written: the flag is a comment in the source and changes nothing
 * on the page.
 */
export function proofQuote(block: QuoteBlock): ProofQuote {
  const attribution = parseAttribution(block.attribution ?? []);
  return {
    quoteHtml: block.paragraphs.map(html).join(''),
    name: attribution.name,
    role: attribution.role,
    company: attribution.company,
  };
}

/** M7 — a quote inside a story, after the work: the compact Proof. */
export function QuoteCompact({ block }: { block: QuoteBlock }) {
  return <Proof arrangement="compact" quote={proofQuote(block)} />;
}

/* ── Body shapes shared by item sets ──────────────────────────────────────────── */

/**
 * A card or row's body from runs: a plain string when the runs carry no markup that a string would
 * lose, trusted HTML (one paragraph) when they carry a link, so the link survives (G3).
 */
export function bodyOf(runs: readonly InlineRun[]): { body: string } | { bodyHtml: string[] } {
  return hasLink(runs) || runs.some((run) => run.type !== 'text')
    ? { bodyHtml: [inline(runs)] }
    : { body: plain(runs) };
}

/** The HTML of a block list as one run of paragraphs and lists, for an accordion answer. */
export function blocksHtml(blocks: readonly CorpusBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'paragraph':
          return html(block.runs);
        case 'labelled':
          return `<p><strong>${inlineToHtml(block.label)}</strong> ${inlineToHtml(block.body)}</p>`;
        case 'list': {
          const tag = block.ordered ? 'ol' : 'ul';
          return `<${tag}>${block.items.map((item) => `<li>${inlineToHtml(item)}</li>`).join('')}</${tag}>`;
        }
        default:
          return '';
      }
    })
    .join('');
}

/* ── Image helper ─────────────────────────────────────────────────────────────── */

/** A photograph, capture or placeholder filling a head-track aside box (ContentSection `asideFill`). */
export function AsidePhoto({ image }: { image: Parameters<typeof Media>[0]['image'] }) {
  return <Media image={image} fit="fill" sizes={HEAD_TRACK} />;
}

/* ── FAQ (M4) ─────────────────────────────────────────────────────────────────── */

export function faqItems(band: CorpusBand): AccordionItem[] {
  return band.blocks.flatMap((block) =>
    block.type === 'item' && block.level === 3
      ? [{ question: block.headingText, answerHtml: blocksHtml(block.blocks) }]
      : [],
  );
}

/** M4 — the accordion, closed by default but the first; the question is the h3. Centred head. */
export function FaqItems({ band }: { band: CorpusBand }) {
  return <Accordion items={faqItems(band)} />;
}

/* ── Enquiry (M2) ─────────────────────────────────────────────────────────────── */

/**
 * M2 — the enquiry band: the L close, split (copy | form), `id="enquiry"` so the hero's "#enquiry"
 * lands on it. Fields, submit label and success words come from the page's `conversion` as
 * authored; the lead is the band's one paragraph. Hidden context names the page and its family so
 * a submission is attributable. A scheduling link appears only where `conversion.schedulingLabel`
 * is set, and none is yet (no scheduling destination exists in `routes.ts`).
 */
export function EnquiryBand({
  page,
  band,
  surface,
}: {
  page: CorpusPage;
  band: CorpusBand;
  surface: SectionSurface;
}) {
  const lead = band.blocks.find((block) => block.type === 'paragraph');
  const conversion = page.conversion;
  return (
    <CtaSection
      id={band.id}
      data-band="L"
      surface={surface}
      heading={band.headingText}
      body={lead && lead.type === 'paragraph' ? [plain(lead.runs)] : undefined}
      form={
        <EnquiryForm
          variant="enquiry"
          urlLabel="Product or company URL"
          action={ENDPOINTS.enquiry}
          success={
            conversion?.onSuccess
              ? { heading: conversion.onSuccess.heading, body: conversion.onSuccess.body }
              : undefined
          }
          context={{
            originRoute: page.route,
            placement: 'corpus-close',
            family: page.pageType,
            serviceOrAudit: page.slug,
            referrer: '',
            campaign: '',
          }}
        />
      }
    />
  );
}

/* ── Generic fallback ─────────────────────────────────────────────────────────── */

/**
 * A band whose shape no template rule names yet: every block in order, as plain kit units. It exists
 * so a page of a shape the plan has not met still shows every word in its place, never a dropped
 * band. A shape that reaches here is a planning gap, and the template says so in development.
 */
export function GenericBlocks({ band }: { band: CorpusBand }) {
  return (
    <Layout rowGap="block">
      {band.blocks.map((block, index) => (
        <Fragment key={index}>{genericBlock(block)}</Fragment>
      ))}
    </Layout>
  );
}

function genericBlock(block: CorpusBlock): ReactNode {
  switch (block.type) {
    case 'paragraph':
      return <p>{renderInline(block.runs)}</p>;
    case 'labelled':
      return (
        <p>
          <strong>{renderInline(block.label)}</strong> {renderInline(block.body)}
        </p>
      );
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag>
          {block.items.map((item, index) => (
            <li key={index}>{renderInline(item)}</li>
          ))}
        </Tag>
      );
    }
    case 'table':
      return (
        <DataTable
          keyColumn={{ heading: plain(block.header[0] ?? []) }}
          columns={block.header.slice(1).map((cell) => ({ heading: plain(cell) }))}
          rows={block.rows.map((row) => ({
            header: plain(row[0] ?? []),
            cellsHtml: row.slice(1).map(inline),
          }))}
        />
      );
    case 'quote':
      return <QuoteCompact block={block} />;
    case 'links':
      return (
        <Layout rowGap="block">
          {block.links.map((link, index) => (
            <CtaRow
              key={index}
              rule={false}
              actions={[{ label: link.labelText, href: link.href }]}
            />
          ))}
        </Layout>
      );
    case 'item':
      return (
        <Layout rowGap="text">
          <h3>{block.headingText}</h3>
          {block.blocks.map((inner, index) => (
            <Fragment key={index}>{genericBlock(inner)}</Fragment>
          ))}
        </Layout>
      );
    case 'form':
    case 'comment':
      return null;
  }
}
