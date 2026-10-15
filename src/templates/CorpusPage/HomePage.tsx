import type { ComponentType } from 'react';

import { BrandMark, Icon, Layout, RatingBadge, Section, Sketch } from '@/components';
import {
  Banner,
  BlockCard,
  BlockCardSet,
  ContentSection,
  ContentSectionText,
  CtaRow,
  Gateway,
  LogoGrid,
  TestimonialBeside,
  TestimonialCard,
  type BlockCardSetItem,
  type GatewayItem,
  type HeroStat,
  type LogoGridMark,
} from '@/patterns';
import { linkCaseMentions } from '@/lib/case-links';
import { CLIENT_MARKS, clientMark } from '@/lib/client-marks';
import { corpusImage } from '@/lib/corpus-images';
import type {
  BorrowedQuote,
  CorpusBand,
  CorpusBlock,
  CorpusCaseRef,
  CorpusMediaBinding,
  CorpusPage,
} from '@/lib/corpus-types';
import { glyphForRoute } from '@/lib/glyphs';
import { renderInline } from '@/lib/inline-render';
import { placeholderImage } from '@/lib/placeholders';
import { sketchForRoute } from '@/lib/sketches';

import {
  CorpusHero,
  EnquiryBand,
  FaqItems,
  QuoteGroupBand,
  bodyOf,
  head,
  headingIdOf,
  testimonialItem,
  type AvatarsById,
  type RatingsById,
} from './blocks';
import { bindingNamed, slugOf } from './images';
import { formBeforeFaq, isFaqBand, isFormBand } from './order';
import { bandLinks, labelTitle, leadOf, plain } from './text';

export type HomePageProps = {
  page: CorpusPage;
  caseRefs?: Readonly<Record<string, CorpusCaseRef>>;
  shared?: Readonly<Record<string, CorpusMediaBinding>>;
  /**
   * Star ratings for the page's testimonials, by testimonial id, as the route read them from the
   * content seam (PLACEHOLDERS today: fixtures/testimonial-ratings.ts). A quote with none shows no
   * stars.
   */
  ratings?: RatingsById;
  /**
   * Avatar portraits for the page's testimonials, by testimonial id (PLACEHOLDERS today:
   * fixtures/testimonial-avatars.ts, home round 3). A quote with none shows no avatar.
   */
  avatars?: AvatarsById;
  /**
   * Real quotes from other corpus pages for a band item whose source authors none (PLACEHOLDERS:
   * fixtures/borrowed-quotes.ts, home round 3 — "We can build what we design").
   */
  borrowedQuotes?: readonly BorrowedQuote[];
};

type ItemBlock = Extract<CorpusBlock, { type: 'item' }>;
type QuoteBlock = Extract<CorpusBlock, { type: 'quote' }>;
type ParagraphBlock = Extract<CorpusBlock, { type: 'paragraph' }>;

const items = (b: CorpusBand): ItemBlock[] =>
  b.blocks.filter((block): block is ItemBlock => block.type === 'item');

const paragraphRuns = (blocks: readonly CorpusBlock[]) =>
  blocks.flatMap((block) => (block.type === 'paragraph' ? [block.runs] : []));

const quoteIn = (blocks: readonly CorpusBlock[]): QuoteBlock | undefined =>
  blocks.find((block): block is QuoteBlock => block.type === 'quote');

/** Every lone-link line of an item, as links, in order. */
const linkLines = (item: ItemBlock | undefined) =>
  (item?.blocks ?? []).flatMap((block) => (block.type === 'links' ? block.links : []));

/**
 * TIER 3 — the home page, from the `_pages/` corpus (page-mapping § 4.1, as redrawn in Home rounds
 * 1 to 3, 10–11 Oct 2026).
 *
 * The narrative is the content team's, band for band. Inside each band the information is DESIGNED,
 * never paraphrased (owner, 10 Oct 2026: "we are allowed to design the content"): the hero's record
 * line becomes three figures inside the hero, the client names become the logo wall the Clutch score
 * leads, the situations become a scannable set of decisions, the two quoted cases are featured with
 * their clients' words as each case's twin panel, each reason is its own banner with the client's
 * words in support, and the client voices are a wall of rated cards. The one reorder is shared by
 * every corpus page: the form sits directly above the questions (order.ts).
 *
 * Shapes down the page, so no two neighbours are one rectangle: a split hero with its figures · a
 * boxed logo wall · the six situations as a one-column typographic router · two case-and-quote
 * diptychs, then a lighter pair · six icon boxes · a run of four alternating photo banners, one
 * reason each · a wall of rated cards on tint · a photo banner · eight sector cards · the form panel
 * on tint · the questions. The hero's solid is the page's one blue ask; the form's submit repeats it.
 */
export function HomePage({ page, ratings, avatars, borrowedQuotes = [] }: HomePageProps) {
  return (
    <>
      <CorpusHero
        page={page}
        arrangement="beside"
        media={{ type: 'image', image: placeholderImage(page.route, 'hero') }}
        proofLine={false}
        stats={recordStats(page)}
      />
      {formBeforeFaq(page.bands).map((b) => {
        if (isFormBand(b))
          return <EnquiryBand key={b.id} page={page} band={b} surface="tint" />;
        if (isFaqBand(b)) {
          return (
            <ContentSection key={b.id} {...head(b)} data-band="D-faq" align="center">
              <ContentSectionText>
                <FaqItems band={b} />
              </ContentSectionText>
            </ContentSection>
          );
        }
        const Band = BANDS[b.id];
        if (!Band && process.env.NODE_ENV !== 'production') {
          console.warn(`HomePage: band "${b.id}" has no renderer; it is not shown.`);
        }
        return Band ? (
          <Band
            key={b.id}
            page={page}
            b={b}
            ratings={ratings}
            avatars={avatars}
            borrowed={borrowedQuotes}
          />
        ) : null;
      })}
    </>
  );
}

type BandProps = {
  page: CorpusPage;
  b: CorpusBand;
  ratings?: RatingsById;
  avatars?: AvatarsById;
  borrowed: readonly BorrowedQuote[];
};

/* ── 0 · the studio's record, as three figures in the hero ───────────────────────── */

/**
 * The hero's record line ("Founded 2017 · More than 90 projects · Clients in 19 countries · Based in
 * Ahmedabad, India") is the page's first credibility, so it is set as figures rather than a bullet
 * line (owner, 10 Oct 2026, note 1): one Stat per fact, the figure large and blue, what it counts
 * under it. The split designs the words and never rewords the information: "More than 90" is set as
 * "90+" (proposal P33 asks the content team to confirm the form).
 *
 * THREE figures, not four (owner, home round 2: "remove the 'based in India' stat"). A place is not a
 * measure of the studio; the FAQ and the footer still name India. A `null` form is a fact the record
 * deliberately leaves out.
 *
 * INSIDE THE HERO (owner, home round 3, 11 Oct 2026: "could the facts/figures section be integrated
 * into the hero so it doesn't take one entire section"): PageHero's `stats` row, under the actions.
 * Rounds 1 and 2 gave it a tint band of its own (~330 at 1440) between the hero and the logo wall.
 */
const RECORD_FORMS: Readonly<Record<string, HeroStat | null>> = {
  'Founded 2017': { value: '2017', label: 'Founded' },
  'More than 90 projects': { value: '90+', label: 'Projects' },
  'Clients in 19 countries': { value: '19', label: 'Countries with clients' },
  'Based in Ahmedabad, India': null,
};

function recordFact(fact: string): HeroStat | null {
  const known = RECORD_FORMS[fact];
  if (known !== undefined) return known;
  /* A fact the table does not know still renders, its number as the figure and its words as the
     line, and says so in development so the table catches up. */
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`HomePage: record fact "${fact}" has no figure form; add it to RECORD_FORMS.`);
  }
  return { value: /\d[\d.,]*/.exec(fact)?.[0] ?? fact, label: fact };
}

function recordStats(page: CorpusPage): HeroStat[] {
  const [line] = page.hero.proofLines;
  if (!line) return [];
  return plain(line)
    .split(' · ')
    .map((fact) => fact.trim())
    .flatMap((fact) => {
      const form = recordFact(fact);
      return form ? [form] : [];
    });
}

/* ── 1 · who has worked with us, led by the one independent score ─────────────────── */

/**
 * The kit home's approved band (kit/home 2): the boxed LogoGrid led by the Clutch RatingBadge, one
 * band, centred (owner, 10 Oct 2026, notes 2 and 3).
 *
 * EVERY CELL IS A REAL LOGO FILE (owner, home round 3, 11 Oct 2026: "we probably have logos for most
 * if not all the clients. please use them"). The corpus names six clients; the studio holds files
 * for two of them (Doodle's SVG, Eden AI's trimmed PNG), so those lead, in the corpus's order, and the
 * rest of the approved in-house set follows — the full wall the kit home was approved with (nine
 * marks) plus Eden AI, ten in all: 4 + 4 + a closing pair at 1440, 2 × 5 on a phone. A client with no
 * file (Dealpath, Benchmark Gensuite, JoVE, Ringier) is NOT typeset as a wordmark any more: names in
 * a wall of logos read as a list (round 3). Their files are registered as needed
 * (docs/image-register.md); each replaces nothing and joins the wall when it arrives. P41 notes the
 * wall shows clients the corpus does not name.
 *
 * NO LINE UNDER THE GRID (owner, home round 2): the badge IS the link to the Clutch profile.
 */
function Recognition({ b }: BandProps) {
  const [namesBlock, ratingBlock] = b.blocks.filter(
    (block): block is ParagraphBlock => block.type === 'paragraph',
  );
  const names = namesBlock ? plain(namesBlock.runs).split(' · ') : [];
  const named = names.flatMap((name) => {
    const mark = clientMark(name);
    return mark ? [mark] : [];
  });
  const marks: LogoGridMark[] = [
    ...named,
    ...CLIENT_MARKS.filter((mark) => !named.includes(mark)),
  ];
  const rating = ratingBlock ? ratingOf(ratingBlock) : undefined;
  const id = headingIdOf(b);
  return (
    <Section id={b.id} data-band="H" aria-labelledby={id}>
      <LogoGrid
        marks={marks}
        badge={
          rating ? (
            <RatingBadge
              score={rating.score}
              platform={rating.platform}
              href={rating.href}
              icon={<Icon name="star" size="sm" />}
              mark={<BrandMark name="clutch" />}
            />
          ) : undefined
        }
        context={b.headingText}
        contextAs="h2"
        headingId={id}
        align="center"
        edges="closed"
      />
    </Section>
  );
}

/** "**4.8 out of 5 on Clutch** across 13 independent client reviews. [Read the reviews](…)" */
function ratingOf(block: ParagraphBlock) {
  const link = block.runs.find((run) => run.type === 'link');
  if (!link || link.type !== 'link') return undefined;
  const sentence = plain(block.runs.filter((run) => run !== link)).trim();
  const match = /^(\d+(?:\.\d+)?)\s+out of \d+\s+on\s+(\S+)/.exec(sentence);
  if (!match) return undefined;
  return { score: match[1] ?? '', platform: match[2] ?? '', href: link.href };
}

/* ── 2 · six situations, the gateway to the services ──────────────────────────────── */

/**
 * The situation band's items as Gateway rows: each `###` situation, its one paragraph (plain: the
 * band authors no inline link in a situation), and its lone link line, whose label names the
 * service. Exported so /design/kit/gateway proves every arrangement on the real corpus words.
 */
export function gatewayItems(b: CorpusBand): GatewayItem[] {
  return items(b).flatMap((item) => {
    const para = item.blocks.find((x): x is ParagraphBlock => x.type === 'paragraph');
    const target = linkLines(item)[0];
    if (!target) return [];
    return [
      {
        id: slugOf(item.headingText),
        title: item.headingText,
        body: para ? plain(para.runs) : '',
        href: target.href,
        service: target.labelText,
        /* A drawing of the service each situation leads to, in the answer (owner, 12 Oct 2026:
           "similar design here on the homepage with some visual element in the content area"). */
        ...(sketchForRoute(target.href)
          ? {
              visual: (
                <Sketch name={sketchForRoute(target.href)!} />
              ),
            }
          : {}),
      },
    ];
  });
}

/**
 * The page's gateway: "which of these is me?" (owner, round 6, 11 Oct 2026: "i may not know if i
 * need product design service or design system service, but i'll probably know if i want to launch
 * a new product"). Rounds 1–5 restyled one shape — illustrated cards, text cards, a list, ruled
 * grids, glyph discs — and the owner rejected each. Round 6 designs for the band's job instead:
 * Gateway's selector, six situations down one column with one lit and its answer beside it
 * (page-mapping § 22).
 */
function Situations({ b }: BandProps) {
  return (
    <ContentSection {...head(b)} data-band="C-router">
      <Gateway items={gatewayItems(b)} arrangement="tiles" />
    </ContentSection>
  );
}

/* ── 3 · selected work: two cases with their clients' words, then two more ───────── */

/**
 * Where a case cover is cropped (Media `focus`) in the one 16:9 card box (home round 3). The four
 * bound artefacts run from 1.5:1 (Dealpath) to 3.3:1 (Benchmark Gensuite), so every one is cut: the
 * three wide boards lose their sides and Dealpath its foot. Doodle anchors on its start (the map and
 * the tablet), Benchmark on its first panel (at 16:9 the centre of a 3.3:1 board cut both panels in
 * half), Dealpath on its top. Art direction a CMS field would carry as a focal point
 * (docs/strapi-changes.md); here it is the template's, keyed by binding id. Each case needs a 16:9
 * master (docs/image-register.md), which ends the cropping.
 */
const COVER_FOCUS: Readonly<Record<string, { x: number; y: number }>> = {
  home_doodle_object_model: { x: 0, y: 0.5 },
  home_dealpath_workflow: { x: 0.5, y: 0 },
  home_benchmark_scope_selector: { x: 0, y: 0.5 },
  home_eden_unified_search: { x: 0.5, y: 0.5 },
};

/**
 * Featured, then listed (owner, home round 2: "2 rows for the case studies with quotes, and then the
 * other case studies listed in a 2-col layout").
 *
 *   1. The two cases whose clients spoke (Doodle, Eden AI) each take a featured row, now a DIPTYCH
 *      (owner, home round 3, 11 Oct 2026: the quote card beside the case "feels randomly floaty"):
 *      the case card in one half — its 16:9 cover, the title, its paragraph and its link — and in
 *      the other half the client's rated words on a quiet panel, top-aligned, the speaker and their
 *      avatar pinned inside its foot (round 4: "avatar inside the card please"). From 1440 the panel
 *      is the cover's 16:9, so its top and foot are the cover's; at 1024–1439 it stretches to the
 *      row (TestimonialBeside states why). Attached by shared edges, never embedded ("if a
 *      quote is embedded in the case it might as well be in the testimonial section"). The second
 *      row mirrors the first.
 *   2. The cases without a quote (Dealpath, Benchmark Gensuite) follow as a lighter pair, two across,
 *      one type step down, at the same 16:9 (there is no other card crop since round 3).
 *
 * A HOME shape (page-mapping § 19): a service or expertise page features one case with its quote as
 * the [7, 5] card (TestimonialBeside `card`), because there the case serves the offer.
 */
function SelectedWork({ page, b, ratings, avatars }: BandProps) {
  const cases = items(b);
  /* Each case ends on its own "Read the … case" line. The band's closing link ("See all case
     studies") is authored after the last case, so the parser files it under that case: the last link
     line of the last case is the band's, and the case keeps the one before it. */
  const lastLines = linkLines(cases.at(-1));
  const closing = lastLines.length > 1 ? lastLines.at(-1) : undefined;

  const card = (item: ItemBlock, index: number, featured: boolean) => {
    const lines = linkLines(item);
    const link = index === cases.length - 1 && closing ? lines.at(-2) : lines.at(-1);
    /* The client's name before the colon names the artefact: a title's other words can name
       another case's ("Eden AI: one way into the workflow builder" against Dealpath's
       `home_dealpath_workflow`). */
    const binding = bindingNamed(page, item.headingText.split(':')[0] ?? item.headingText);
    const focus = binding ? COVER_FOCUS[binding.id] : undefined;
    const paragraphs = paragraphRuns(item.blocks);
    return (
      <BlockCard
        key={item.headingText}
        size={featured ? 'lg' : 'md'}
        titleAs="h3"
        title={item.headingText}
        {...(paragraphs.length === 1 && paragraphs[0]
          ? bodyOf(paragraphs[0])
          : { bodyHtml: paragraphs.map((runs) => `<p>${plain(runs)}</p>`) })}
        href={link?.href}
        ctaLabel={link?.labelText}
        cue="cta"
        media={
          binding
            ? {
                type: 'image',
                image: { ...corpusImage(binding), ...(focus ? { focus } : {}) },
              }
            : undefined
        }
      />
    );
  };

  const indexed = cases.map((item, index) => ({ item, index, quote: quoteIn(item.blocks) }));
  const featured = indexed.filter((entry) => entry.quote);
  const listed = indexed.filter((entry) => !entry.quote);

  const body = (
    <Layout rowGap="section">
      {featured.map(({ item, index, quote }, row) => (
        <TestimonialBeside
          key={item.headingText}
          arrangement="diptych"
          work={<ul>{card(item, index, true)}</ul>}
          item={testimonialItem(quote!, ratings, avatars)}
          reverse={row % 2 === 1}
        />
      ))}
      {listed.length > 0 ? (
        <Layout as="ul" columns={{ md: 2 }} colGap="gutter" rowGap="stack">
          {listed.map(({ item, index }) => card(item, index, false))}
        </Layout>
      ) : null}
    </Layout>
  );
  return closing ? (
    <ContentSection
      {...head(b)}
      data-band="M"
      actionsAt="end"
      actions={
        <CtaRow rule={false} actions={[{ label: closing.labelText, href: closing.href }]} />
      }
    >
      {body}
    </ContentSection>
  ) : (
    <ContentSection {...head(b)} data-band="M">
      {body}
    </ContentSection>
  );
}

/* ── 4 · what we do: six services as linked icon boxes ───────────────────────────── */

/**
 * The second way into the services, and visibly a different one from the gateway above it (owner,
 * 10 Oct 2026, note 6): the kit home's approved band 5 — a stacked head and its lead over six linked
 * icon cards in borderless boxes, three across, each led by its service's glyph. Pass 1 set them as
 * ruled text rows with no glyph. The label's closing full stop is the run-in's punctuation, not part
 * of the service's name, so the card title drops it.
 */
function Capabilities({ b }: BandProps) {
  const intro = b.blocks.find((x): x is ParagraphBlock => x.type === 'paragraph' && !leadOf(x));
  const cards: BlockCardSetItem[] = b.blocks.flatMap((block) => {
    const lead = leadOf(block);
    if (!lead) return [];
    const link = lead.label.find((run) => run.type === 'link');
    const href = link?.type === 'link' ? link.href : undefined;
    const title = labelTitle(lead.label).replace(/\.$/, '');
    return [
      {
        id: title,
        title,
        ...bodyOf(lead.body),
        href,
        icon: href ? glyphForRoute(href) : undefined,
      },
    ];
  });
  return (
    <ContentSection
      {...head(b)}
      data-band="C-icon"
      lead={intro ? plain(intro.runs) : undefined}
    >
      {/* A router shows every route at once, on a phone too: never a scroll row (BlockCardSet). */}
      <BlockCardSet items={cards} lead="none" across={3} frame="box" scroll="never" />
    </ContentSection>
  );
}

/* ── 5 · four reasons: one banner each, the claim leads, the client's words support it ── */

/**
 * ONE FOLD PER REASON (owner, home round 3, 11 Oct 2026: "it is taller than 1 fold, in which case i
 * feel like each section should be one fold … /design/kit/banner i3 and i4 could be used here? i
 * also particularly don't like the numbering"). Round 2 stacked four claim rows under one head in a
 * single band (1,595 at 1440), so no screen ever held one complete reason.
 *
 * Now a RUN of four beside banners (kit I.3 and I.4), alternating — photograph at the end, then the
 * start — each its own Section, so each reason is one screen: the band's h1 heading opens the
 * first banner (`bandHead`), the closing link ends the last (`footer`). In each, the claim is the h3
 * at the h2 role, its sentence the lead, and the client's words the quiet supporting testimonial
 * under it (TestimonialCard `sm`, unboxed): claim first, proof second (home round 2). The index
 * numerals are gone. The banner rule "never two beside banners within sight" is the owner's to
 * override here: the run IS the band, and the alternation is its rhythm.
 *
 * Every reason has a quote now ("assume all 4 have a quote"): "We can build what we design"
 * authors none, so it takes a REAL testimonial from another corpus page that is not shown elsewhere
 * on home — Trishanya Raju's, from /case-studies, about the work the reason names (The Wandering
 * Raven) — read from that page by the content seam and flagged PLACEHOLDER (P39).
 *
 * Each banner's photograph is a register placeholder (a studio photograph or product shot per
 * reason, 3:2) until the shoot.
 */
function WhyTcules({ page, b, ratings, avatars, borrowed }: BandProps) {
  const reasons = items(b);
  /* The band's closing link is authored after the last reason, so the parser files it there. */
  const closing = linkLines(reasons.at(-1))[0];
  return (
    <>
      {reasons.map((item, index) => {
        const quote =
          quoteIn(item.blocks) ??
          borrowed.find((entry) => entry.band === b.id && entry.item === item.headingText)
            ?.quote;
        const first = index === 0;
        const last = index === reasons.length - 1;
        const slug = slugOf(item.headingText);
        return (
          <Banner
            key={item.headingText}
            form="beside"
            mediaSide={index % 2 === 0 ? 'end' : 'start'}
            id={first ? b.id : undefined}
            bandHead={first ? { heading: b.headingText, headingId: headingIdOf(b) } : undefined}
            heading={item.headingText}
            headingAs="h3"
            headingId={`${b.id}-${slug}`}
            lead={renderInline(
              linkCaseMentions(
                paragraphRuns(item.blocks).flatMap((runs, at) =>
                  at === 0 ? [...runs] : [{ type: 'text' as const, text: ' ' }, ...runs],
                ),
              ),
            )}
            support={
              quote ? (
                <TestimonialCard
                  item={testimonialItem(quote, ratings, avatars)}
                  size="sm"
                  frame="none"
                  voice="italic"
                />
              ) : undefined
            }
            footer={
              last && closing ? (
                <CtaRow actions={[{ label: closing.labelText, href: closing.href }]} />
              ) : undefined
            }
            image={{ ...placeholderImage(page.route, b.id, slug), kind: 'photograph' }}
          />
        );
      })}
    </>
  );
}

/* ── 6 · what clients say: the voices as one wall of rated cards ─────────────────── */

function ClientVoices({ b, ratings, avatars }: BandProps) {
  return <QuoteGroupBand band={b} ratings={ratings} avatars={avatars} />;
}

/* ── 7 · how we use AI: one idea and one link ────────────────────────────────────── */

function AiPractice({ page, b }: BandProps) {
  const lead = b.blocks.find((x): x is ParagraphBlock => x.type === 'paragraph');
  const link = bandLinks(b)[0];
  return (
    <Banner
      form="beside"
      mediaSide="start"
      headingId={headingIdOf(b)}
      heading={b.headingText}
      lead={lead ? plain(lead.runs) : undefined}
      actions={
        link ? (
          <CtaRow rule={false} actions={[{ label: link.labelText, href: link.href }]} />
        ) : undefined
      }
      image={{ ...placeholderImage(page.route, b.id), kind: 'photograph' }}
    />
  );
}

/* ── 8 · the products we know: eight sectors, each with its picture ──────────────── */

/**
 * Eight sectors as image cards (owner, 10 Oct 2026, note 9), four across from 1024 and two across on a
 * phone — never one per row, never a scroll row (BlockCardSet `phone="pair"`). Each card's picture is
 * its sector's own register slot: no studio photograph depicts a sector, so the set is drawn whole.
 */
function Expertise({ page, b }: BandProps) {
  const cards: BlockCardSetItem[] = bandLinks(b).map((link) => ({
    id: link.href,
    title: link.labelText,
    href: link.href,
    media: {
      type: 'image',
      image: placeholderImage(page.route, b.id, slugOf(link.labelText)),
    },
  }));
  return (
    <ContentSection {...head(b)} data-band="C-image">
      <BlockCardSet items={cards} lead="none" across={4} cue="title" phone="pair" />
    </ContentSection>
  );
}

/* ── The band table: the content team's ids, each to its renderer ─────────────────── */

const BANDS: Readonly<Record<string, ComponentType<BandProps>>> = {
  'client-recognition': Recognition,
  'product-situations': Situations,
  'selected-work': SelectedWork,
  capabilities: Capabilities,
  'why-tcules': WhyTcules,
  'client-voices': ClientVoices,
  'ai-native-practice': AiPractice,
  expertise: Expertise,
};
