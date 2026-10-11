import { Fragment, type ReactNode } from 'react';

import { Layout } from '@/components';
import {
  BlockCard,
  BlockCardSet,
  Callout,
  ContentSection,
  ContentSectionText,
  CtaRow,
  DataTable,
  ListCard,
  ReadDown,
  Statement,
  TestimonialBeside,
  TestimonialCard,
  Thread,
  type BlockCardSetItem,
} from '@/patterns';
import { corpusImage } from '@/lib/corpus-images';
import type {
  CorpusBand,
  CorpusBlock,
  CorpusCaseRef,
  CorpusLink,
  CorpusMediaBinding,
  CorpusPage,
} from '@/lib/corpus-types';
import { glyphForPersona, glyphForRoute } from '@/lib/glyphs';
import { inlineToHtml, type InlineRun } from '@/lib/inline';
import { renderInline } from '@/lib/inline-render';

import {
  AsidePhoto,
  EnquiryBand,
  FaqItems,
  GenericBlocks,
  ListTiles,
  TableLegend,
  bodyOf,
  head,
  testimonialItem,
  type RatingsById,
} from './blocks';
import { bindingNamed, coverFor, hasSlot, slotImage, slugOf, type SlotImage } from './images';
import styles from './CorpusPage.module.css';
import type { OfferUnit } from './plan';
import {
  bandLinks,
  blocksOf,
  hasLink,
  labelTitle,
  lastIndexWhere,
  leadOf,
  linkLead,
  plain,
  trimEnd,
} from './text';

/**
 * The offer page's bands, one function per shape (page-mapping § 2 and § 4). Every arrangement is
 * Layout, Cluster and the kit's units; this file draws no tile, row or card of its own, sets no
 * margin and no distance, and never overrides a Section's column or ground. A unit arrives already
 * planned (plan.ts): its shape, its surface, its media side and its texture are decided, and every
 * word is the corpus's.
 */

export type OfferContext = {
  page: CorpusPage;
  /** The cases the page cites, as each case's own page describes them (title, cover). */
  caseRefs: Readonly<Record<string, CorpusCaseRef>>;
  /** Studio photographs the corpus binds on other pages, by binding id, for the slots that reuse them. */
  shared: Readonly<Record<string, CorpusMediaBinding>>;
  /**
   * Star ratings for the page's testimonials, by testimonial id, as the route read them (PLACEHOLDERS
   * today: fixtures/testimonial-ratings.ts). A quote with none shows no stars.
   */
  ratings?: RatingsById;
};

type Lead = { title: string; body: readonly InlineRun[] };

/** Every labelled claim of a band as a title and the runs after it, in order. */
function leads(band: CorpusBand): Lead[] {
  return band.blocks.flatMap((block) => {
    const lead = leadOf(block);
    return lead ? [{ title: labelTitle(lead.label), body: lead.body }] : [];
  });
}

/** The band's first lead-in paragraph (before any labelled claim), as plain text. */
function leadText(band: CorpusBand): string | undefined {
  const first = band.blocks.find((block) => block.type !== 'comment');
  return first?.type === 'paragraph' && !leadOf(first) && !linkLead(first)
    ? plain(first.runs)
    : undefined;
}

/** The paragraphs that follow the labelled claims (a closing note), as runs. */
function trailingParagraphs(band: CorpusBand): InlineRun[][] {
  const blocks = band.blocks.filter((block) => block.type !== 'comment');
  const lastLead = lastIndexWhere(blocks, (block) => leadOf(block) !== null);
  return blocks
    .slice(lastLead + 1)
    .flatMap((block) => (block.type === 'paragraph' ? [block.runs] : []));
}

const quoteOf = (band: CorpusBand) => blocksOf(band, 'quote')[0];

/**
 * A band's closing link as its foot. `rule` is off where the body above ends on its own rule (ruled
 * ListCard rows, an accordion): a second hairline a stack under the first reads as a double rule.
 */
function ctaRow(links: readonly CorpusLink[], rule = true): ReactNode {
  const [link] = links;
  return link ? (
    <CtaRow rule={rule} actions={[{ label: link.labelText, href: link.href }]} />
  ) : undefined;
}

const tiles = (rows: readonly Lead[], columns: 1 | 2 | 3 = 2) => (
  <ListTiles
    columns={columns}
    rows={rows.map((row) => ({ title: row.title, ...bodyOf(row.body) }))}
  />
);

/** A trailing link run lifted out of a paragraph ("… [Read the case](/…)"): the runs without it, and the link. */
function liftTrailingLink(runs: readonly InlineRun[]) {
  const last = runs.at(-1);
  if (last?.type !== 'link') return { runs: [...runs], link: undefined };
  return { runs: trimEnd(runs.slice(0, -1)), link: last };
}

/* ── Unit renderers ───────────────────────────────────────────────────────────── */

export function UnitView({ unit, ctx }: { unit: OfferUnit; ctx: OfferContext }) {
  const { page } = ctx;
  const { band } = unit;

  switch (unit.kind) {
    case 'faq':
      return (
        <ContentSection {...head(band)} data-band="D-faq" align="center">
          <ContentSectionText>
            <FaqItems band={band} />
          </ContentSectionText>
        </ContentSection>
      );

    case 'enquiry':
      return <EnquiryBand page={page} band={band} surface={unit.surface} />;

    /* M12 — labelled claims of equal weight: text cards under a centred head, the quote that ends
       the band a stack under them as the SUPPORTING testimonial (TestimonialCard `sm`, unboxed): the
       claims lead, the client's words back them (home round 2, 10 Oct 2026). Round 1 set it as a 28
       quote behind a blue rule, larger than the claims it was supporting. */
    case 'outcomes': {
      const quote = quoteOf(band);
      return (
        <ContentSection {...head(band)} data-band="C-text" align="center">
          <BlockCardSet
            lead="none"
            across={4}
            size="sm"
            scroll="never"
            items={leads(band).map((row) => ({
              id: row.title,
              title: row.title,
              ...bodyOf(row.body),
            }))}
          />
          {quote ? (
            <TestimonialCard
              item={testimonialItem(quote, ctx.ratings)}
              size="sm"
              frame="none"
            />
          ) : null}
        </ContentSection>
      );
    }

    /* M10 — symptoms in the customer's voice: the head beside a photograph, the rows read down. */
    case 'symptoms':
      return (
        <ContentSection
          {...head(band)}
          data-band="D"
          arrangement="beside"
          asideFill
          headSide={unit.side === 'end' ? 'end' : 'start'}
          aside={<AsidePhoto image={slotImage(page, band.id)} />}
        >
          <ReadDown
            columns={2}
            rows={leads(band).map((row) => ({ title: row.title, ...bodyOf(row.body) }))}
          />
        </ContentSection>
      );

    /* A story as a record: problem, what we did, result, with its proof beside it. */
    case 'record': {
      const binding = bindingNamed(page, band.headingText);
      const image = binding ? corpusImage(binding) : slotImage(page, band.id);
      return (
        <ContentSection
          {...head(band)}
          data-band="B"
          arrangement="media"
          media={{ image, side: unit.side ?? 'end', head: 'lg' }}
          footer={ctaRow(bandLinks(band), false)}
        >
          <Layout as="ul" rowGap="none">
            {leads(band).map((row) => (
              <ListCard
                key={row.title}
                arrangement="stacked"
                size="md"
                titleAs="h3"
                title={row.title}
                {...bodyOf(row.body)}
              />
            ))}
          </Layout>
        </ContentSection>
      );
    }

    /* M8 — cited cases as covers; the case a quote is about featured with the quote beside it. */
    case 'cases':
      return (
        <ContentSection {...head(band)} data-band="M">
          <CaseSet ctx={ctx} band={band} />
        </ContentSection>
      );

    /* Ways in: four peers beside a photograph, and the limit on the claim as a note. */
    case 'tiles': {
      const note = trailingParagraphs(band);
      return (
        <ContentSection
          {...head(band)}
          data-band="B"
          arrangement="media"
          media={{ image: slotImage(page, band.id), side: unit.side ?? 'start', head: 'lg' }}
        >
          {tiles(leads(band))}
          {note.map((runs, index) => (
            <Callout key={index} html={`<p>${inlineToHtml(runs)}</p>`} />
          ))}
        </ContentSection>
      );
    }

    /* M13 — destinations with a description: an icon router, the head above, no photograph. */
    case 'router':
      return (
        <ContentSection {...head(band)} data-band="C-icon">
          <Router band={band} />
        </ContentSection>
      );

    /* E — a path, drawn on the line rather than bulleted. */
    case 'thread': {
      const list = blocksOf(band, 'list')[0];
      const lead = band.blocks.find((b) => b.type === 'paragraph');
      const leadRuns = lead?.type === 'paragraph' ? lead.runs : [];
      const closing = trailingAfterList(band);
      return (
        <ContentSection
          {...head(band)}
          data-band="E"
          align="center"
          lead={hasLink(leadRuns) ? undefined : plain(leadRuns)}
        >
          {hasLink(leadRuns) ? (
            <ContentSectionText>
              <p>{renderInline(leadRuns)}</p>
            </ContentSectionText>
          ) : null}
          {list ? (
            <Thread
              align="center"
              stages={list.items.map((item) => {
                const split = leadOf({ type: 'paragraph', runs: item });
                return split
                  ? { title: labelTitle(split.label), body: plain(split.body) }
                  : { title: plain(item) };
              })}
            />
          ) : null}
          {closing.map((runs, index) => (
            <ContentSectionText key={index}>
              <p>{renderInline(runs)}</p>
            </ContentSectionText>
          ))}
        </ContentSection>
      );
    }

    /* M15 — a comparison: a key column against rows, boxed. */
    case 'table': {
      const table = blocksOf(band, 'table')[0];
      const lead = leadText(band);
      return (
        <ContentSection {...head(band)} data-band="E" lead={lead}>
          {table ? <CorpusTable table={table} labelledBy={head(band).headingId} /> : null}
        </ContentSection>
      );
    }

    /* What you receive: a list of deliverables, with the product shot beside it. */
    case 'deliverables': {
      const list = blocksOf(band, 'list')[0];
      const rows: Lead[] = (list?.items ?? []).flatMap((item) => {
        const split = leadOf({ type: 'paragraph', runs: item });
        return split ? [{ title: labelTitle(split.label), body: split.body }] : [];
      });
      const after = trailingAfterList(band);
      return (
        <ContentSection
          {...head(band)}
          data-band="B"
          arrangement="media"
          media={{ image: slotImage(page, band.id), side: unit.side ?? 'end', head: 'lg' }}
        >
          {tiles(rows)}
          {after.map((runs, index) => (
            <ContentSectionText key={index}>
              <p>{renderInline(runs)}</p>
            </ContentSectionText>
          ))}
        </ContentSection>
      );
    }

    /* M11 — two reasons: a media split, or (a third in a row) a read-down beside the photograph. */
    case 'reasons': {
      const rows = leads(band);
      if (unit.variant === 'D') {
        const studio = ctx.shared['about_studio_review'];
        const image: SlotImage | undefined = studio
          ? corpusImage(studio)
          : hasSlot(page, band.id)
            ? slotImage(page, band.id)
            : undefined;
        return (
          <ContentSection
            {...head(band)}
            data-band="D"
            {...(image
              ? {
                  arrangement: 'beside' as const,
                  asideFill: true,
                  headSide: unit.side === 'end' ? ('end' as const) : ('start' as const),
                  aside: <AsidePhoto image={image} />,
                }
              : { arrangement: 'beside' as const })}
          >
            <ReadDown
              columns={1}
              rows={rows.map((row) => ({ title: row.title, ...bodyOf(row.body) }))}
            />
          </ContentSection>
        );
      }
      return (
        <ContentSection
          {...head(band)}
          data-band="B"
          arrangement="media"
          media={{
            image: slotImage(page, band.id),
            side: unit.side ?? 'start',
            weight: 'photo',
            head: 'lg',
          }}
        >
          {tiles(rows)}
        </ContentSection>
      );
    }

    /* M17 — people who each have a question: icon cards with the table's two header words once above. */
    case 'personas': {
      if (unit.part === 'b') {
        const closing = trailingAfterTable(band);
        return (
          <Fragment>
            {closing.map((runs, index) => (
              <Statement
                key={index}
                as="p"
                align="center"
                id={index === 0 ? unit.id : `${unit.id}-${index + 1}`}
              >
                {plain(runs)}
              </Statement>
            ))}
          </Fragment>
        );
      }
      return (
        <ContentSection {...head(band)} data-band="C-icon" lead={leadText(band)}>
          <Personas band={band} />
        </ContentSection>
      );
    }

    /* Principles: the first two beside a photograph, the rest as text cards. */
    case 'principles': {
      const rows = leads(band);
      if (unit.part === 'b') {
        return (
          <ContentSection id={unit.id} data-band="C-text">
            {/* The same tiles as part a, three across: one set of five principles split across two
                bands reads as one set only when the last three are the first two's object, at the
                first two's type (pages pass 1 critic: a BlockCardSet here set the three a step
                apart from the two). */}
            {tiles(rows.slice(2), 3)}
          </ContentSection>
        );
      }
      return (
        <ContentSection
          {...head(band)}
          data-band="B"
          arrangement="media"
          media={{ image: slotImage(page, band.id), side: unit.side ?? 'start', head: 'lg' }}
        >
          {tiles(rows.slice(0, 2))}
        </ContentSection>
      );
    }

    /* Two cases told in turn: the work, each beside its artefact. A story its client spoke about is
       set as a case card with the client's rated quote BESIDE it (TestimonialBeside), so the quote
       sits with its own story and never inside it (home round 2, 10 Oct 2026; round 1 had moved
       every story quote to a tint band after the last story, away from the story it was about). */
    case 'caseStories': {
      const items = band.blocks.filter(
        (b): b is Extract<CorpusBlock, { type: 'item' }> => b.type === 'item',
      );
      const item = items[unit.itemIndex ?? 0];
      if (!item) return null;
      const qualifier = slugOf(item.headingText.split(':')[0] ?? item.headingText);
      const image = hasSlot(page, band.id, qualifier)
        ? slotImage(page, band.id, qualifier)
        : undefined;
      const story = (
        <Layout rowGap="block">
          <h3 className={styles.itemTitle}>{item.headingText}</h3>
          <Layout rowGap="text">
            {item.blocks.map((block, index) =>
              block.type === 'paragraph' ? <p key={index}>{renderInline(block.runs)}</p> : null,
            )}
          </Layout>
        </Layout>
      );
      const first = unit.part === 'a';
      const headProps = first ? head(band) : { id: unit.id };
      const quote = item.blocks.find(
        (b): b is Extract<CorpusBlock, { type: 'quote' }> => b.type === 'quote',
      );
      if (quote) {
        const paragraphs = item.blocks.flatMap((b) =>
          b.type === 'paragraph' ? [inlineToHtml(b.runs)] : [],
        );
        return (
          <ContentSection {...headProps} data-band="M">
            <TestimonialBeside
              work={
                <ul>
                  <BlockCard
                    title={item.headingText}
                    bodyHtml={paragraphs}
                    size="lg"
                    {...(image ? { media: { type: 'image' as const, image } } : {})}
                  />
                </ul>
              }
              item={testimonialItem(quote, ctx.ratings)}
            />
          </ContentSection>
        );
      }
      return image ? (
        <ContentSection
          {...headProps}
          data-band="B"
          arrangement="media"
          media={{ image, side: unit.side ?? 'end', head: 'lg' }}
        >
          {story}
        </ContentSection>
      ) : (
        <ContentSection {...headProps} data-band="C-text">
          {story}
        </ContentSection>
      );
    }

    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          `OfferPage ${page.route}: band "${band.id}" has a shape the plan has not met; rendering it plainly.`,
        );
      }
      return (
        <ContentSection {...head(band)} data-band="C-text">
          <GenericBlocks band={band} />
        </ContentSection>
      );
  }
}

/* ── Pieces ───────────────────────────────────────────────────────────────────── */

/** The blocks after a band's list (a closing paragraph), as runs. */
function trailingAfterList(band: CorpusBand): InlineRun[][] {
  const blocks = band.blocks.filter((block) => block.type !== 'comment');
  const at = lastIndexWhere(blocks, (block) => block.type === 'list');
  return blocks
    .slice(at + 1)
    .flatMap((block) => (block.type === 'paragraph' ? [block.runs] : []));
}

function trailingAfterTable(band: CorpusBand): InlineRun[][] {
  const blocks = band.blocks.filter((block) => block.type !== 'comment');
  const at = lastIndexWhere(blocks, (block) => block.type === 'table');
  return blocks
    .slice(at + 1)
    .flatMap((block) => (block.type === 'paragraph' ? [block.runs] : []));
}

type TableBlock = Extract<CorpusBlock, { type: 'table' }>;

function CorpusTable({ table, labelledBy }: { table: TableBlock; labelledBy: string }) {
  const [key = [], ...columns] = table.header;
  return (
    <DataTable
      labelledBy={labelledBy}
      keyColumn={{ heading: plain(key) }}
      columns={columns.map((cell) => ({ heading: plain(cell) }))}
      rows={table.rows.map((row) => ({
        header: plain(row[0] ?? []),
        cellsHtml: row.slice(1).map((cell) => inlineToHtml(cell)),
      }))}
    />
  );
}

/** M13 — a router: one icon card per destination, title the link's own words, body what follows the colon. */
function Router({ band }: { band: CorpusBand }) {
  const rows = band.blocks.flatMap((block) => {
    const lead = linkLead(block);
    return lead
      ? [{ href: lead.link.href, title: plain(lead.link.children), body: plain(lead.body) }]
      : [];
  });
  const glyphs = rows.map((row) => glyphForRoute(row.href));
  const items: BlockCardSetItem[] = rows.map((row, index) => ({
    id: row.href,
    title: row.title,
    body: row.body,
    href: row.href,
    icon: glyphs.every(Boolean) ? glyphs[index] : undefined,
  }));
  if (glyphs.every(Boolean)) {
    return (
      <BlockCardSet
        items={items}
        lead="none"
        across={3}
        frame="box"
        cue="title"
        scroll="never"
      />
    );
  }
  return (
    <Layout as="ul" rowGap="none">
      {rows.map((row) => (
        <ListCard
          key={row.href}
          titleAs="h3"
          title={row.title}
          body={row.body}
          href={row.href}
        />
      ))}
    </Layout>
  );
}

/** M17 — the personas: the table's two header words once as a legend, then a glyph card per person. */
function Personas({ band }: { band: CorpusBand }) {
  const table = blocksOf(band, 'table')[0];
  if (!table) return null;
  const [from, to] = table.header;
  const glyphs = table.rows.map((row) => glyphForPersona(plain(row[0] ?? [])));
  const items: BlockCardSetItem[] = table.rows.map((row, index) => ({
    id: plain(row[0] ?? []),
    title: plain(row[0] ?? []),
    body: plain(row[1] ?? []),
    icon: glyphs.every(Boolean) ? glyphs[index] : undefined,
  }));
  return (
    <Layout rowGap="block">
      <TableLegend from={plain(from ?? [])} to={plain(to ?? [])} />
      <BlockCardSet items={items} lead="none" across={3} frame="none" scroll="never" />
    </Layout>
  );
}

type CaseGroup = {
  title: string;
  paragraphs: InlineRun[][];
  link?: Extract<InlineRun, { type: 'link' }>;
};

/** Labelled claims as cases: a claim starts one, the paragraphs after it belong to it. */
function caseGroups(band: CorpusBand): CaseGroup[] {
  const groups: CaseGroup[] = [];
  for (const block of band.blocks) {
    const lead = leadOf(block);
    if (lead) {
      groups.push({ title: labelTitle(lead.label), paragraphs: [[...lead.body]] });
    } else if (block.type === 'paragraph') {
      groups.at(-1)?.paragraphs.push(block.runs);
    }
  }
  for (const group of groups) {
    const last = group.paragraphs.at(-1);
    if (!last) continue;
    const lifted = liftTrailingLink(last);
    if (lifted.link) {
      group.link = lifted.link;
      group.paragraphs[group.paragraphs.length - 1] = lifted.runs;
    }
  }
  return groups;
}

/** The case group a quote is about: the one whose name its company carries ("Auxentios" in
 *  "Auxentios Technology"), else the last, after which the content authors a case set's quote. */
function quotedGroup(groups: readonly CaseGroup[], company: string): number {
  const name = (title: string) => title.replace(/[.:]$/, '').trim().toLowerCase();
  const wanted = company.toLowerCase();
  const found = groups.findIndex(
    (group) => wanted.includes(name(group.title)) || name(group.title).includes(wanted),
  );
  return found >= 0 ? found : groups.length - 1;
}

/**
 * M8 — case cards: each case with its cover, its name as authored and the words after it. Linked only
 * where a link is authored (the trailing "Read the case" becomes the card's cta, so no card holds a
 * link in its body).
 *
 * A set that ends on a client's quote is FEATURED, THEN LISTED (home round 2, 10 Oct 2026): the case
 * the quote is about leads as a large card with the rated quote in its own card beside it
 * (TestimonialBeside), and the other cases follow as the set, two or three across. Round 1 sent the
 * quote to a tint band after the set, where it read as a testimonial about nothing in particular.
 */
function CaseSet({ ctx, band }: { ctx: OfferContext; band: CorpusBand }) {
  const groups = caseGroups(band);
  const items: BlockCardSetItem[] = groups.map((group) => {
    const href = group.link?.href;
    const ref = href ? ctx.caseRefs[href] : undefined;
    const paragraphs = group.paragraphs.filter((runs) => runs.length > 0);
    const body =
      paragraphs.length > 1 ||
      paragraphs.some((runs) => hasLink(runs) || runs.some((r) => r.type !== 'text'))
        ? { bodyHtml: paragraphs.map((runs) => inlineToHtml(runs)) }
        : { body: paragraphs[0] ? plain(paragraphs[0]) : undefined };
    return {
      id: group.title,
      title: group.title,
      ...body,
      media: { type: 'image' as const, image: coverFor(ctx.page, group.title, ref) },
      ...(href ? { href, ctaLabel: plain(group.link?.children ?? []) } : {}),
    };
  });
  const quote = quoteOf(band);
  const testimonial = quote ? testimonialItem(quote, ctx.ratings) : undefined;
  const featuredAt = testimonial ? quotedGroup(groups, testimonial.company) : -1;
  const featured = featuredAt >= 0 ? items[featuredAt] : undefined;
  const rest = items.filter((_, index) => index !== featuredAt);
  const linked = rest.every((item) => item.href);
  const set =
    rest.length > 0 ? (
      <BlockCardSet
        lead="none"
        across={rest.length === 4 ? 4 : undefined}
        scroll="never"
        cue={linked ? 'cta' : undefined}
        label={linked ? undefined : band.headingText}
        items={rest}
      />
    ) : null;
  if (!featured || !testimonial) return set;
  const card = featured;
  return (
    <Layout rowGap="section">
      <TestimonialBeside
        work={
          <ul>
            <BlockCard
              title={card.title}
              {...('bodyHtml' in card && card.bodyHtml
                ? { bodyHtml: card.bodyHtml }
                : { body: card.body })}
              media={card.media}
              href={card.href}
              ctaLabel={card.ctaLabel}
              size="lg"
              cue={card.href ? 'cta' : undefined}
            />
          </ul>
        }
        item={testimonial}
      />
      {set}
    </Layout>
  );
}
