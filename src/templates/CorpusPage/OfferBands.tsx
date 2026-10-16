import { Layout } from '@/components';
import {
  BlockCard,
  BlockCardSet,
  Callout,
  CaseSpread,
  ContentSection,
  ContentSectionText,
  CtaRow,
  DataTable,
  EngagementOptions,
  ListCard,
  OfferSheet,
  TestimonialBeside,
  TestimonialCard,
  Thread,
  TracePlates,
  VoiceLedger,
  type BlockCardSetItem,
  type EngagementScope,
  type TraceScene,
  type TraceStage,
} from '@/patterns';
import { caseStudyLink } from '@/lib/case-links';
import { corpusImage } from '@/lib/corpus-images';
import type {
  CorpusBand,
  CorpusBlock,
  CorpusCaseRef,
  CorpusMediaBinding,
  CorpusPage,
} from '@/lib/corpus-types';
import { glyphForRoute } from '@/lib/glyphs';
import { inlineToHtml, type InlineRun } from '@/lib/inline';
import { renderInline } from '@/lib/inline-render';

import {
  EnquiryBand,
  FaqItems,
  GenericBlocks,
  ListTiles,
  bodyOf,
  head,
  testimonialItem,
  type RatingsById,
} from './blocks';
import { bindingNamed, coverFor, hasSlot, slotImage, slugOf, type SlotImage } from './images';
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

/**
 * Which scope an engagement option's drawing shows, read from the option's own name (EngagementOptions
 * draws only what the name says). A name none of these fit shows no drawing rather than a wrong one.
 */
function scopeOf(title: string): EngagementScope | undefined {
  const name = title.toLowerCase();
  if (/\bbuild\b/.test(name)) return 'build';
  if (/\b(team|designer|embedded)\b/.test(name)) return 'embedded';
  if (/\b(area|whole|new product)\b/.test(name)) return 'area';
  if (/\b(workflow|feature)\b/.test(name)) return 'feature';
  return undefined;
}

/**
 * Which plate a traced stage draws, read from the stage's own name (TracePlates draws only what the
 * name says). A thread with any stage none of these fit keeps Thread's beads.
 */
function sceneOf(title: string): TraceScene | undefined {
  const name = title.toLowerCase();
  if (/\bsign-?off\b|\baccept/.test(name)) return 'signoff';
  if (/\bhand-?off\b|\bspec/.test(name)) return 'handoff';
  if (/\brunning\b|\blive\b|\bproduct\b/.test(name)) return 'product';
  if (/\bcode\b|\bbuild\b/.test(name)) return 'code';
  if (/\bdesign\b/.test(name)) return 'design';
  return undefined;
}

/** A list item as a stage: its bold lead as the title, the rest as the body. */
function stagesOf(items: readonly InlineRun[][]) {
  return items.map((item) => {
    const split = leadOf({ type: 'paragraph', runs: item });
    return split
      ? { title: labelTitle(split.label), body: plain(split.body) }
      : { title: plain(item) };
  });
}

/**
 * The stages as a trace, when every stage names a point in one screen's life (design, handoff,
 * code, the running product, sign-off); otherwise undefined and the path keeps Thread's beads.
 */
function traceOf(items: readonly InlineRun[][]): TraceStage[] | undefined {
  const stages = stagesOf(items);
  const scenes = stages.map((stage) => sceneOf(stage.title));
  return scenes.every(Boolean)
    ? stages.map((stage, index) => ({ ...stage, scene: scenes[index] as TraceScene }))
    : undefined;
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

    /* What you get — the outcomes as ONE offer, the client's words anchored beside it (OfferSheet;
       product-design round 6, 11 Oct 2026, page-mapping § 23). The promises are the primary object:
       the h2 and two rows of two in the leading 2 of [2, 1]; the rated testimonial card fills the
       trailing 1 from the heading's top to the last promise's foot, so the voice shares the offer's
       edges and reads as its proof. Round 2 set four text cards under a centred head with the quote
       unboxed beneath them: four equal rectangles, nothing to guide the eye. */
    case 'outcomes': {
      const quote = quoteOf(band);
      return (
        <OfferSheet
          {...head(band)}
          items={leads(band).map((row) => ({
            title: row.title,
            ...(hasLink(row.body) || row.body.some((run) => run.type !== 'text')
              ? { bodyHtml: inlineToHtml(row.body) }
              : { body: plain(row.body) }),
          }))}
          aside={
            quote ? (
              <TestimonialCard item={testimonialItem(quote, ctx.ratings)} fill voice="italic" />
            ) : undefined
          }
        />
      );
    }

    /* Symptoms in the customer's own words, each answered by where we start (VoiceLedger;
       product-design round 6, page-mapping § 23). The reader knows what is going wrong before they
       know which service they need, so the complaint is the band's large thing, set in the speech
       voice down one edge, and the answer is the reply beside it. Round 1–5 set them as a two-column
       read-down beside a placeholder photograph: the eye zigzagged and the voices read as titles. */
    case 'symptoms':
      return (
        <VoiceLedger
          {...head(band)}
          lead={leadText(band)}
          items={leads(band).map((row) => ({
            voice: row.title,
            reply: renderInline(row.body),
          }))}
        />
      );

    /* A worked example, with the emphasis where the argument is (CaseSpread; product-design round 6,
       page-mapping § 23): the OUTCOME ("The result.") is the claim, beside the evidence at 16:9; the
       problem and what we did are the backstory under both; the case link is the claim's action.
       Round 1 set three equal ruled rows beside the shot, so the result read as the third of three. */
    case 'record': {
      const binding = bindingNamed(page, band.headingText);
      /* A product capture is read from its top: the 16:9 frame keeps the screen's header and loses
         the foot (the master is 3:2). */
      const image = binding
        ? { ...corpusImage(binding), focus: { x: 0, y: 0 } }
        : slotImage(page, band.id);
      const rows = leads(band);
      const at = rows.findIndex((row) => /^the result/i.test(row.title));
      const claimAt = at >= 0 ? at : rows.length - 1;
      const claim = rows[claimAt];
      if (!claim) return null;
      const [link] = bandLinks(band);
      return (
        <CaseSpread
          {...head(band)}
          claim={{ title: claim.title, body: renderInline(claim.body) }}
          action={
            link ? (
              <CtaRow rule={false} actions={[{ label: link.labelText, href: link.href }]} />
            ) : undefined
          }
          image={image}
          story={rows
            .filter((_, index) => index !== claimAt)
            .map((row) => ({ title: row.title, body: renderInline(row.body) }))}
        />
      );
    }

    /* M8 — cited cases as covers; the case a quote is about featured with the quote beside it. */
    case 'cases':
      return (
        <ContentSection {...head(band)} data-band="M">
          <CaseSet ctx={ctx} band={band} />
        </ContentSection>
      );

    /* Ways to work with us — four peers, comparable at a glance (EngagementOptions; product-design
       round 6, page-mapping § 23): each option's scope drawn on one dot field, its name, what it is;
       the limit on the claim closes the band as a note. Round 1 set four hairline tiles beside a
       placeholder photograph: "boring and plain", and nothing showed how the four differ. */
    case 'tiles': {
      const note = trailingParagraphs(band);
      return (
        <EngagementOptions
          {...head(band)}
          options={leads(band).map((row) => ({
            title: row.title,
            body: renderInline(row.body),
            scope: scopeOf(row.title),
          }))}
          note={
            note.length > 0 ? (
              <Layout rowGap="text">
                {note.map((runs, index) => (
                  <Callout key={index} html={`<p>${inlineToHtml(runs)}</p>`} />
                ))}
              </Layout>
            ) : undefined
          }
        />
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
      const trace = list ? traceOf(list.items) : undefined;
      const leadText = hasLink(leadRuns) ? undefined : plain(leadRuns);
      const leadLinked = hasLink(leadRuns) ? (
        <ContentSectionText>
          <p>{renderInline(leadRuns)}</p>
        </ContentSectionText>
      ) : null;
      const after = closing.map((runs, index) => (
        <ContentSectionText key={index}>
          <p>{renderInline(runs)}</p>
        </ContentSectionText>
      ));
      /* A trace — one screen followed through every hand-over — runs DOWN beside the head: one row
         per stage, the screen drawn at that stage beside what we look at there, the trace running
         down through it (TracePlates `down`; owner, 11 Oct 2026). */
      if (trace) {
        /* The closing stance sits in the head track under the lead, so the five rows fit a fold. */
        const plates = leadLinked ? (
          <Layout rowGap="stack">
            {leadLinked}
            <TracePlates orientation="down" stages={trace} />
          </Layout>
        ) : (
          <TracePlates orientation="down" stages={trace} />
        );
        return after.length > 0 ? (
          <ContentSection
            {...head(band)}
            data-band="E"
            arrangement="beside"
            lead={leadText}
            aside={<Layout rowGap="text">{after}</Layout>}
          >
            {plates}
          </ContentSection>
        ) : (
          <ContentSection {...head(band)} data-band="E" arrangement="beside" lead={leadText}>
            {plates}
          </ContentSection>
        );
      }
      return (
        <ContentSection {...head(band)} data-band="E" align="center" lead={leadText}>
          {leadLinked}
          {list ? <Thread align="center" stages={stagesOf(list.items)} /> : null}
          {after}
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
    /* What you receive — the deliverables as ONE offer (OfferSheet, as "What you get" on the service
       page; owner, 11 Oct 2026): two rows of two promises, each on its rule and blue mark, the
       product shot filling the trailing 1 beside them, and the next step closing their column. */
    case 'deliverables': {
      const list = blocksOf(band, 'list')[0];
      const rows: Lead[] = (list?.items ?? []).flatMap((item) => {
        const split = leadOf({ type: 'paragraph', runs: item });
        return split ? [{ title: labelTitle(split.label), body: split.body }] : [];
      });
      const after = trailingAfterList(band);
      return (
        <OfferSheet
          {...head(band)}
          items={rows.map((row) => ({
            title: row.title,
            ...(hasLink(row.body) || row.body.some((run) => run.type !== 'text')
              ? { bodyHtml: inlineToHtml(row.body) }
              : { body: plain(row.body) }),
          }))}
          {...(hasSlot(page, band.id) ? { asideImage: slotImage(page, band.id) } : {})}
          note={
            after.length > 0 ? (
              <ContentSectionText>
                {after.map((runs, index) => (
                  <p key={index}>{renderInline(runs)}</p>
                ))}
              </ContentSectionText>
            ) : undefined
          }
        />
      );
    }

    /* M11 — two reasons: a media split, or (a third in a row) a read-down beside the photograph. */
    case 'reasons': {
      const rows = leads(band);
      /* D — the "why" band as a run of beside banners, one reason each, alternating sides (as
         home's "Why teams choose Tcules", owner 11 Oct 2026): the reason leads at the banner's
         heading, its sentence under it, a photograph beside. The first reason takes the studio
         photograph the page binds; each other reason its own slot. */
      if (unit.variant === 'D') {
        const studio = ctx.shared['about_studio_review'];
        /* D — the "why" band as one section of image cards, a reason each: a 16:9 photograph, the
           reason as the card's title, its sentence under it. The first reason takes the studio
           photograph the page binds; each other reason its own slot. Home's one-banner-per-reason
           run is for reasons that fill a fold (a claim, a paragraph and a client's words); a
           sentence each, as here, left every banner a short caption floating beside a large photo
           (owner, 12 Oct 2026, healthtech: "idk what but this looks bad"). */
        const cards: BlockCardSetItem[] = rows.flatMap((row, index) => {
          const slug = slugOf(row.title);
          const image: SlotImage | undefined = hasSlot(page, band.id, slug)
            ? { ...slotImage(page, band.id, slug), kind: 'photograph' as const }
            : index === 0
              ? studio
                ? corpusImage(studio)
                : hasSlot(page, band.id)
                  ? { ...slotImage(page, band.id), kind: 'photograph' as const }
                  : undefined
              : undefined;
          return [
            {
              id: slug,
              title: row.title,
              ...(hasLink(row.body) || row.body.some((run) => run.type !== 'text')
                ? { bodyHtml: [inlineToHtml(row.body)] }
                : { body: plain(row.body) }),
              ...(image ? { media: { type: 'image' as const, image } } : {}),
            },
          ];
        });
        return (
          <ContentSection {...head(band)} data-band="C-cards">
            <BlockCardSet
              items={cards}
              lead="none"
              across={cards.length >= 3 ? 3 : 2}
              size="lg"
              scroll="never"
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

    /* People who each have a question, in their own words (VoiceLedger, as the service page's
       "Where we start"; owner, 11 Oct 2026: the icon-card grid was "too dense and doesn't make
       sense"). Each question is the row's large thing — what a visitor recognises — and the person
       asking stands beside it; the closing line sits under the rows, in the same band (it was a
       Statement band of its own, part b, which read as a second section). */
    case 'personas': {
      if (unit.part === 'b') return null;
      const table = blocksOf(band, 'table')[0];
      const closing = trailingAfterTable(band);
      return (
        <VoiceLedger
          {...head(band)}
          lead={leadText(band)}
          items={(table?.rows ?? []).map((row) => ({
            voice: plain(row[1] ?? []),
            reply: plain(row[0] ?? []),
          }))}
          note={
            closing.length > 0 ? (
              <ContentSectionText>
                {closing.map((runs, index) => (
                  <p key={index}>{renderInline(runs)}</p>
                ))}
              </ContentSectionText>
            ) : undefined
          }
        />
      );
    }

    /* Principles: ONE set (OfferSheet, as "What you get"; owner, 11 Oct 2026: two beside a
       photograph and three more in a band under it read as "2 sections or one?"). The principles three
       across (3 + 2 for five) on their rules and blue marks, in the full column: with the photograph
       beside them five ran two up to a lonely fifth and past the fold, so the band takes no photo. */
    case 'principles': {
      if (unit.part === 'b') return null;
      const rows = leads(band);
      return (
        <OfferSheet
          {...head(band)}
          items={rows.map((row) => ({
            title: row.title,
            ...(hasLink(row.body) || row.body.some((run) => run.type !== 'text')
              ? { bodyHtml: inlineToHtml(row.body) }
              : { body: plain(row.body) }),
          }))}
          across={rows.length % 3 === 0 || rows.length === 5 ? 3 : 2}
        />
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
      /* The story's client links to its case (owner, 11 Oct 2026), found by the name before the
         colon; a client whose case is unpublished gets a flagged PLACEHOLDER link (P43). */
      const caseLink = caseStudyLink(item.headingText.split(':')[0] ?? '');
      const image = hasSlot(page, band.id, qualifier)
        ? slotImage(page, band.id, qualifier)
        : undefined;
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
                    {...(caseLink ? { href: caseLink.href, cue: 'title' as const } : {})}
                  />
                </ul>
              }
              item={testimonialItem(quote, ctx.ratings)}
            />
          </ContentSection>
        );
      }
      /* A story with no client quote is still a case (owner, 11 Oct 2026: "that's probably going
         to be a case study so treat it as such"): one horizontal case card, its cover beside its
         words, linked to the case (a flagged placeholder until it publishes, P43). */
      const paragraphs = item.blocks.flatMap((b) =>
        b.type === 'paragraph' ? [inlineToHtml(b.runs)] : [],
      );
      return (
        <ContentSection {...headProps} data-band="M">
          <ul>
            <BlockCard
              title={item.headingText}
              bodyHtml={paragraphs}
              size="lg"
              orientation="horizontal"
              {...(image ? { media: { type: 'image' as const, image } } : {})}
              {...(caseLink ? { href: caseLink.href, cue: 'title' as const } : {})}
            />
          </ul>
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
  /* Every case links to its case page (owner, 11 Oct 2026). An authored "Read the case" line keeps
     its words as the card's cta; a case named without one finds its page by its name (routes.ts
     CASE_STUDY_SLUGS, or a flagged PLACEHOLDER). Where a set mixes the two, the found cards take the
     band's own authored label when every authored label agrees, so no card invents a wording. */
  const authoredLabels = new Set(
    groups.flatMap((group) => (group.link ? [plain(group.link.children)] : [])),
  );
  const sharedLabel = authoredLabels.size === 1 ? [...authoredLabels][0] : undefined;
  const items: BlockCardSetItem[] = groups.map((group) => {
    const found = group.link ? undefined : caseStudyLink(group.title);
    const href = group.link?.href ?? found?.href;
    const ctaLabel = group.link ? plain(group.link.children) : sharedLabel;
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
      ...(href ? { href, ...(ctaLabel ? { ctaLabel } : {}) } : {}),
    };
  });
  const quote = quoteOf(band);
  const testimonial = quote ? testimonialItem(quote, ctx.ratings) : undefined;
  const featuredAt = testimonial ? quotedGroup(groups, testimonial.company) : -1;
  const featured = featuredAt >= 0 ? items[featuredAt] : undefined;
  const rest = items.filter((_, index) => index !== featuredAt);
  const linked = rest.every((item) => item.href);
  /* A set whose cards all carry a cta wording reads its cta; one whose links were all found by name
     has no authored wording, so its titles are the cue. */
  const labelled = rest.every((item) => item.ctaLabel);
  const set =
    rest.length > 0 ? (
      <BlockCardSet
        lead="none"
        across={rest.length === 4 ? 4 : undefined}
        scroll="never"
        cue={linked ? (labelled ? 'cta' : 'title') : undefined}
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
              cue={card.href ? (card.ctaLabel ? 'cta' : 'title') : undefined}
            />
          </ul>
        }
        item={testimonial}
      />
      {set}
    </Layout>
  );
}
