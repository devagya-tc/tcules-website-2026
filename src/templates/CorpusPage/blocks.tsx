import { Fragment, type ReactNode } from 'react';

import { Cluster, Icon, Layout, Media, type SectionSurface } from '@/components';
import {
  Accordion,
  Breadcrumbs,
  CtaRow,
  CtaSection,
  DataTable,
  ContentSection,
  EnquiryForm,
  type EnquiryDress,
  ListCard,
  PageHero,
  Proof,
  type AccordionItem,
  type HeroActions,
  type HeroCredit,
  type HeroDates,
  type HeroMedia,
  type HeroStat,
  type ProofQuote,
  TestimonialWall,
  type TestimonialItem,
} from '@/patterns';
import { parseAttribution } from '@/lib/attribution';
import type {
  CorpusBand,
  CorpusBlock,
  CorpusPage,
  TestimonialAvatarRecord,
  TestimonialRating,
} from '@/lib/corpus-types';
import { inlineToHtml, type InlineRun } from '@/lib/inline';
import { linkProofLine } from '@/lib/case-links';
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
  /** The record as figures, a row under the actions (PageHero `stats`, home round 3). */
  stats?: readonly HeroStat[];
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
  stats,
  texture,
}: CorpusHeroProps) {
  const { hero } = page;
  const crumbs = page.breadcrumb.map((crumb) => ({ label: crumb.name, href: crumb.url }));
  const paragraphs = (ledes ?? hero.lede).map(plain).filter(Boolean);
  const actions = hero.actions.slice(0, 2).map((action) => ({
    label: action.labelText,
    href: action.href,
  })) as unknown as HeroActions;
  const eyebrow = hero.eyebrow ? plain(hero.eyebrow) : undefined;
  const byline = editorialByline(page);
  /* The authored byline line is the same record the byline strip now presents, so it is not shown
     twice; any other proof line still is. */
  const [firstProof] = byline
    ? hero.proofLines.filter((line) => !plain(line).includes(byline.author))
    : hero.proofLines;
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
      stats={stats}
      texture={texture}
      credits={byline?.credits}
      dates={byline?.dates}
      readingTime={byline?.readingTime}
    >
      {proofLine && firstProof ? (
        <p className={styles.proofLine}>{renderInline(linkProofLine(firstProof))}</p>
      ) : null}
    </PageHero>
  );
}

/**
 * The page's byline from its frontmatter's `editorial` record — author, who they are, reviewer, the
 * dates and the reading time — for PageHero's byline strip (owner, 11 Oct 2026: the article template
 * "had a provision for this metadata to be nicely presented"). The reading time is the one the page
 * states ("11 min read" → "11 min"). Null when the page credits no author.
 */
function editorialByline(page: CorpusPage) {
  const editorial = page.frontmatter.editorial as Record<string, unknown> | undefined;
  const str = (key: string) => {
    const value = editorial?.[key];
    return typeof value === 'string' && value.trim() ? value.trim() : undefined;
  };
  const author = str('author');
  if (!author) return null;
  const role = str('author_role');
  const reviewer = str('reviewer');
  const published = str('published_at');
  const modified = str('modified_at');
  const minutes = /(\d+)\s*min/i.exec(str('reading_time_as_displayed') ?? '')?.[1];
  const credits: HeroCredit[] = [
    { role: 'author', people: [author], ...(role ? { detail: role } : {}) },
    ...(reviewer ? [{ role: 'reviewer' as const, people: [reviewer] as const }] : []),
  ];
  const dates: HeroDates | undefined = published
    ? { published, ...(modified ? { modified } : {}) }
    : modified
      ? { modified }
      : undefined;
  return { author, credits, dates, readingTime: minutes ? `${minutes} min` : undefined };
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

/** Per-testimonial ratings by testimonial id, as the route read them from the content seam. */
export type RatingsById = Readonly<Record<string, TestimonialRating>>;

/** Per-testimonial avatar portraits by testimonial id, as the route read them (home round 3). */
export type AvatarsById = Readonly<Record<string, TestimonialAvatarRecord>>;

/**
 * A corpus quote as a rated testimonial card's item: the words and the speaker as `proofQuote`
 * splits them, and the rating the page was handed for this quote's testimonial id (none when the
 * quote has no id or the id no rating: the card then shows no stars). The rating is DATA the route
 * passed down (home round 2: placeholders at the content seam until real ones replace them), never a
 * value written here.
 */
export function testimonialItem(
  block: QuoteBlock,
  ratings?: RatingsById,
  avatars?: AvatarsById,
): TestimonialItem {
  const quote = proofQuote(block);
  const rating = block.testimonialId ? ratings?.[block.testimonialId]?.value : undefined;
  /* The speaker's portrait, when the route passed one for this id (PLACEHOLDER stock portraits
     today, home round 3); without one the card shows no avatar at all. */
  const portrait = block.testimonialId ? avatars?.[block.testimonialId] : undefined;
  return {
    id: block.testimonialId ?? undefined,
    quoteHtml: quote.quoteHtml,
    name: quote.name,
    role: quote.role,
    company: quote.company,
    ...(rating !== undefined ? { rating } : {}),
    ...(portrait
      ? {
          avatar: {
            src: portrait.src,
            width: portrait.width,
            height: portrait.height,
            sources: portrait.sources,
          },
        }
      : {}),
  };
}

/** M7 — a quote inside a story, after the work: the compact Proof. */
export function QuoteCompact({ block }: { block: QuoteBlock }) {
  return <Proof arrangement="compact" quote={proofQuote(block)} />;
}

/* ── Quotes only (M5) ─────────────────────────────────────────────────────────── */

/**
 * M5 — a band that is only client quotes, shown as ONE composed group of rated testimonial cards
 * (home round 2, 10 Oct 2026: "a better component so we can show the testimonial and a star rating
 * alongside"). Never a slider: a slider hides every quote but the first from most readers (round 1).
 * On the page's tint under a centred head, with the band's lead when it authors one; the cards are
 * paper on the tint. The wall decides its own shape from the count (TestimonialWall): up to three is
 * one row of peers, four a 2 × 2, five or six three columns of stacks in authored order.
 *
 * A quote awaiting client sign-off renders as written; the flag is a comment in the source.
 */
export function QuoteGroupBand({
  band,
  ratings,
  avatars,
}: {
  band: CorpusBand;
  ratings?: RatingsById;
  avatars?: AvatarsById;
}) {
  const lead = band.blocks.find((block) => block.type === 'paragraph');
  const items = band.blocks.flatMap((block) =>
    block.type === 'quote' ? [testimonialItem(block, ratings, avatars)] : [],
  );
  return (
    <ContentSection
      {...head(band)}
      data-band="G"
      surface="tint"
      align="center"
      lead={lead?.type === 'paragraph' ? plain(lead.runs) : undefined}
    >
      <TestimonialWall items={items} />
    </ContentSection>
  );
}

/* ── Tiles ────────────────────────────────────────────────────────────────────── */

export type TileRow = { title: string; body?: string; bodyHtml?: readonly string[] };

/**
 * A set of hairline tiles (ListCard `tile`), `columns` across from md: peers whose title is a claim and
 * whose body is the proof of it. The one tile shape every media split's copy column uses.
 */
export function ListTiles({
  rows,
  columns = 2,
}: {
  rows: readonly TileRow[];
  columns?: 1 | 2 | 3;
}) {
  return (
    <Layout as="ul" columns={{ base: 1, md: columns }} colGap="gutter" rowGap="stack">
      {rows.map((row) => (
        <ListCard
          key={row.title}
          form="tile"
          size="sm"
          titleAs="h3"
          title={row.title}
          {...(row.bodyHtml ? { bodyHtml: row.bodyHtml } : { body: row.body })}
        />
      ))}
    </Layout>
  );
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
        /* A lone link line inside an answer ("Read about … at Tcules") is part of the answer: its own
           paragraph, the link as authored. Dropping it lost words. */
        case 'links':
          return block.links
            .map(
              (link) =>
                `<p>${inlineToHtml([{ type: 'link', href: link.href, children: link.label }])}</p>`,
            )
            .join('');
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
 * The island close's drawing (owner, 16 Oct 2026): a designer's desk with nobody at it, facing the
 * form. Generated by scripts/enquiry-desk.mjs; decorative, so its alt is empty — the heading and
 * lede beside it carry the meaning.
 */
export const ENQUIRY_DESK = {
  src: '/illustrations/enquiry/designer-desk.svg',
  alt: '',
  width: 396,
  height: 459,
  kind: 'illustration',
} as const;

/** The halves close's drawing (owner, 25 Oct 2026; scripts/enquiry-sketch-to-shipped.mjs). */
const ENQUIRY_SKETCH_TO_SHIPPED = {
  src: '/illustrations/enquiry/sketch-to-shipped.svg',
  alt: '',
  width: 455,
  height: 379,
  kind: 'illustration',
} as const;

/**
 * The island close's two form dresses (owner, 16 Oct 2026). Their framing words are not in the
 * corpus: the owner approved them for shipping, and they are logged in docs/content-changes.md for
 * the content team. The message dress's person is a PLACEHOLDER from the studio photo catalogue
 * until the owner names who answers enquiries.
 */
const ENQUIRY_PROMPT = 'A link, a Figma file, or two lines about the problem.';
const ENQUIRY_WRITE_TO = 'hello@tcules.com';
export const ENQUIRY_DRESS: Record<'card' | 'message', EnquiryDress> = {
  /* No title of its own (owner, 25 Oct 2026; every card, Jatin, 26 Oct 2026): the band's heading
     already asks. Its fields carry no placeholder, so it takes no prompt. */
  card: {
    kind: 'card',
    reply: 'We reply in 1 business day',
  },
  message: {
    kind: 'message',
    from: {
      name: 'Rushali',
      role: 'Design lead · Tcules',
      portrait: '/kit/photos/studio-portrait-rushali.webp',
    },
    note: 'Tell us what you’re building. I’ll reply within a working day.',
    prompt: ENQUIRY_PROMPT,
    writeTo: ENQUIRY_WRITE_TO,
  },
};

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
  island,
}: {
  page: CorpusPage;
  band: CorpusBand;
} & (
  | { surface: SectionSurface; island?: never }
  | {
      /**
       * The island close (home, owner 16 Oct 2026): the desk drawing, heading and lede beside the
       * form, all on a blue or ink island on a paper band, the form on a paper panel in one of its
       * two dresses, the island's texture framing it. It takes no `surface`: the band goes paper.
       */
      island: {
        surface: 'blue' | 'ink';
        dress: 'card' | 'message';
        /**
         * `beside` (default): the desk drawing, heading and lede beside the form, TextureFrame
         * framing it. `halves` (owner, 25 Oct 2026): the island split 1:1, the sketch-to-shipped
         * drawing above the words, the TextureFlow field across the island, fading at the start.
         * The drawing and the field come with the arrangement, so the two never mix.
         */
        arrangement?: 'beside' | 'halves';
      };
      surface?: never;
    }
)) {
  const lead = band.blocks.find((block) => block.type === 'paragraph');
  const body = lead && lead.type === 'paragraph' ? ([plain(lead.runs)] as const) : undefined;
  if (island?.arrangement === 'halves') {
    return (
      <CtaSection
        id={band.id}
        data-band="L"
        island={island.surface}
        islandArrangement="halves"
        islandTexture="flow"
        art={<Media image={ENQUIRY_SKETCH_TO_SHIPPED} sizes="300px" />}
        heading={band.headingText}
        body={body}
        form={corpusEnquiryForm(page, band, { dress: ENQUIRY_DRESS[island.dress] })}
      />
    );
  }
  if (island) {
    return (
      <CtaSection
        id={band.id}
        data-band="L"
        island={island.surface}
        islandTexture="frame"
        art={<Media image={ENQUIRY_DESK} sizes="240px" />}
        heading={band.headingText}
        body={body}
        form={corpusEnquiryForm(page, band, { dress: ENQUIRY_DRESS[island.dress] })}
      />
    );
  }
  return (
    <CtaSection
      id={band.id}
      data-band="L"
      surface={surface}
      /* A conversation glyph as the eye's entry into the close (owner, 11 Oct 2026). */
      mark={<Icon name="chat-round-dots" size="xl" />}
      heading={band.headingText}
      body={lead && lead.type === 'paragraph' ? [plain(lead.runs)] : undefined}
      form={corpusEnquiryForm(page, band)}
    />
  );
}

/**
 * The enquiry form the page's `conversion` describes: fields, submit label and success words as
 * authored, hidden context naming the page and its family. Shared by the template's close and by a
 * route that hands the form to a template which takes it as a slot (ListingIndex).
 */
export function corpusEnquiryForm(
  page: CorpusPage,
  band?: CorpusBand,
  /** The island close's treatment: a dress for the form. Default: lg boxes, the full submit. */
  treatment: { dress?: EnquiryDress } = {},
) {
  const conversion = page.conversion;
  /* The band's own "After sending:" line ("We'll reply within one business day.") is the caption
     under the submit, in the page's words (home round 3), where the form used to print its own. */
  const formBlock = (band ?? page.bands.find((b) => b.id === conversion?.anchor))?.blocks.find(
    (block): block is Extract<CorpusBlock, { type: 'form' }> => block.type === 'form',
  );
  const after = formBlock?.after ? plain(formBlock.after) : undefined;
  return (
    <EnquiryForm
      variant="enquiry"
      urlLabel="Product or company URL"
      action={ENDPOINTS.enquiry}
      /* The form is the band's primary object (home round 3): lg fields, the submit across the
         panel, so the one solid on the band is the widest thing in it. */
      dress={treatment.dress}
      /* A dressed form is compact (owner, 16 Oct 2026: the close fits one laptop screen). */
      fieldScale={treatment.dress ? 'md' : 'lg'}
      submit={treatment.dress ? 'inline' : 'full'}
      caption={after}
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
  );
}

/* ── Legend (M17) ─────────────────────────────────────────────────────────────── */

/**
 * M17's legend: a table whose rows are peers becomes cards, and its two header words are set ONCE
 * above the set, "header 1 → header 2", so they survive without a repeated eyebrow on every card.
 * Template-local markup in the eyebrow voice; the arrow is decoration.
 */
export function TableLegend({ from, to }: { from: string; to: string }) {
  return (
    <Cluster colGap="tight" align="center" className={styles.legend}>
      <span>{from}</span>
      <span className={styles.legendMark}>
        <Icon name="arrow-right" size="sm" />
      </span>
      <span>{to}</span>
    </Cluster>
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
