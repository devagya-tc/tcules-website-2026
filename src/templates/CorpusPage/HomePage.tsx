import type { ComponentType } from 'react';

import { BrandMark, Button, Icon, Layout, RatingBadge, Section, Sketch } from '@/components';
import {
  Banner,
  BlockCard,
  BlockCardSet,
  ContentSection,
  ContentSectionText,
  CtaRow,
  Gateway,
  LogoGrid,
  Reasons,
  TestimonialCase,
  type BlockCardSetItem,
  type GatewayItem,
  type HeroStat,
  type LogoGridMark,
} from '@/patterns';
import { CLIENT_MARKS, clientMark } from '@/lib/client-marks';
import { corpusImage } from '@/lib/corpus-images';
import type {
  CorpusBand,
  CorpusBlock,
  CorpusCaseRef,
  CorpusMediaBinding,
  CorpusPage,
  PlaceholderReasons,
} from '@/lib/corpus-types';
import { glyphForRoute } from '@/lib/glyphs';
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
   * The reasons "Why teams choose Tcules" shows (PLACEHOLDERS: fixtures/placeholder-reasons.ts, P48).
   * With none the band is not shown: the corpus's four reasons do not fill the Reasons band.
   */
  reasons?: PlaceholderReasons | null;
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
 * their clients' words as each case's twin panel, the reasons are a set each drawn beside its
 * claim, and the client voices are a wall of rated cards. The one reorder is shared by
 * every corpus page: the form sits directly above the questions (order.ts).
 *
 * Shapes down the page, so no two neighbours are one rectangle: a split hero with its figures · a
 * boxed logo wall · the six situations as a one-column typographic router · two case-and-quote
 * diptychs, then a lighter pair · six icon boxes · six reasons, each beside its drawing · a wall
 * of rated cards on tint · a photo banner · eight sector cards · the form panel on tint · the
 * questions. The hero's solid is the page's one blue ask; the form's submit repeats it.
 */
export function HomePage({ page, ratings, avatars, reasons }: HomePageProps) {
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
          return (
            <EnquiryBand
              key={b.id}
              page={page}
              band={b}
              island={{ surface: 'blue', dress: 'card' }}
            />
          );
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
            reasons={reasons}
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
  reasons?: PlaceholderReasons | null;
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
              visual: <Sketch name={sketchForRoute(target.href)!} />,
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
      <Gateway items={gatewayItems(b)} />
    </ContentSection>
  );
}

/* ── 3 · selected work: two cases with their clients' words, then two more ───────── */

/**
 * Where a case cover is cropped (Media `focus`) in the one 16:9 card box (home round 3). Every
 * cover is cut. The two featured cases carry their case-study thumbnails, the covers /case-studies
 * shows (19 Oct 2026). Those are square masters, so each keeps a band 56% of its height: Doodle's
 * its mark and booking header over the bookable rows, Eden AI's the toolbar and the workflow's nodes. The listed pair carry
 * wide artefacts, 1.5:1 (Dealpath) and 3.3:1 (Benchmark Gensuite): Benchmark anchors on its first
 * panel (at 16:9 the centre of the board cut both panels in half), Dealpath on its top. Art
 * direction a CMS field would carry as a focal point (docs/strapi-changes.md); here it is the
 * template's, keyed by binding id. Each case needs a 16:9 master (docs/image-register.md), which
 * ends the cropping.
 */
const COVER_FOCUS: Readonly<Record<string, { x: number; y: number }>> = {
  home_doodle_cover: { x: 0.5, y: 0.15 },
  home_dealpath_workflow: { x: 0.5, y: 0 },
  home_benchmark_scope_selector: { x: 0, y: 0.5 },
  home_eden_ai_cover: { x: 0.5, y: 0.3 },
};

/**
 * Featured, then listed (owner, home round 2: "2 rows for the case studies with quotes, and then the
 * other case studies listed in a 2-col layout").
 *
 *   1. The two cases whose clients spoke (Doodle, Eden AI) are each ONE card (TestimonialCase,
 *      16 Oct 2026, the shape approved in round 7). The round-3 diptych, a case card beside a quote
 *      panel, read as "disjointed, and as 3 units instead of one". Now the cover and the claim share
 *      a ground with the client's words, boxed inside the card under both. The client's name before
 *      the title's colon becomes the card's eyebrow, the rest its claim. The two cards are a set, a
 *      `gutter` apart, and the second mirrors the first.
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

  /* What a case card and a featured case both read from one authored item. */
  const parts = (item: ItemBlock, index: number) => {
    const lines = linkLines(item);
    const link = index === cases.length - 1 && closing ? lines.at(-2) : lines.at(-1);
    /* The client's name before the colon names the artefact: a title's other words can name
       another case's ("Eden AI: one way into the workflow builder" against Dealpath's
       `home_dealpath_workflow`). */
    const binding = bindingNamed(page, item.headingText.split(':')[0] ?? item.headingText);
    const focus = binding ? COVER_FOCUS[binding.id] : undefined;
    const paragraphs = paragraphRuns(item.blocks);
    const story =
      paragraphs.length === 1 && paragraphs[0]
        ? bodyOf(paragraphs[0])
        : { bodyHtml: paragraphs.map((runs) => `<p>${plain(runs)}</p>`) };
    const image = binding
      ? { ...corpusImage(binding), ...(focus ? { focus } : {}) }
      : undefined;
    return { link, story, image };
  };

  const card = (item: ItemBlock, index: number) => {
    const { link, story, image } = parts(item, index);
    return (
      <BlockCard
        key={item.headingText}
        size="md"
        titleAs="h3"
        title={item.headingText}
        {...story}
        href={link?.href}
        ctaLabel={link?.labelText}
        cue="cta"
        media={image ? { type: 'image', image } : undefined}
      />
    );
  };

  const indexed = cases.map((item, index) => ({ item, index, quote: quoteIn(item.blocks) }));
  const featured = indexed.filter((entry) => entry.quote);
  const listed = indexed.filter((entry) => !entry.quote);

  /* "Doodle: meeting times people will actually keep" → eyebrow "Doodle", claim "Meeting times
     people will actually keep". Presentation of the authored words, not a rewrite: only the claim's
     first letter is raised. A title with no colon stays whole, with no eyebrow. */
  const claimOf = (heading: string) => {
    const at = heading.indexOf(':');
    if (at < 1) return { title: heading };
    const rest = heading.slice(at + 1).trim();
    return {
      eyebrow: heading.slice(0, at).trim(),
      title: rest.charAt(0).toUpperCase() + rest.slice(1),
    };
  };

  const body = (
    <Layout rowGap="section">
      <Layout rowGap="gutter">
        {featured.map(({ item, index, quote }, row) => {
          const { link, story, image } = parts(item, index);
          /* A featured case without its link or cover falls back to the plain card. */
          if (!link || !image) return <ul key={item.headingText}>{card(item, index)}</ul>;
          return (
            <TestimonialCase
              key={item.headingText}
              {...claimOf(item.headingText)}
              {...story}
              href={link.href}
              ctaLabel={link.labelText}
              image={image}
              item={testimonialItem(quote!, ratings, avatars)}
              reverse={row % 2 === 1}
            />
          );
        })}
      </Layout>
      {listed.length > 0 ? (
        <Layout as="ul" columns={{ md: 2 }} colGap="gutter" rowGap="stack">
          {listed.map(({ item, index }) => card(item, index))}
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

/* ── 5 · why Tcules: six reasons, each beside its drawing ────────────────────────── */

/**
 * The Reasons band, `open` (owner, 19 Oct 2026): six short reasons with no rules, each drawing
 * beside its words, one fold at 1440. It replaces the round-3 run of four photo banners, which took
 * four screens and put three quotes next to the client-voices band. No proof inside the band: the
 * quotes stay in "What clients say" (P48).
 *
 * The reasons are PLACEHOLDERS (P48's length guide) until the content team writes six; the heading
 * and the closing link stay the corpus's.
 */
function WhyTcules({ b, reasons }: BandProps) {
  if (!reasons || reasons.band !== b.id) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`HomePage: "${b.id}" has no reasons to show; the band is not rendered.`);
    }
    return null;
  }
  /* The band's closing link is authored after the last reason, so the parser files it there. */
  const closing = linkLines(items(b).at(-1))[0];
  return (
    <Reasons
      id={b.id}
      heading={b.headingText}
      headingId={headingIdOf(b)}
      items={reasons.items.map((item) => ({
        title: item.title,
        body: item.body,
        figure: { ...item.figure, alt: '', kind: 'illustration' },
      }))}
      action={
        closing ? (
          <Button
            as="a"
            href={closing.href}
            emphasis="link"
            size="md"
            icon={<Icon name="arrow-right" />}
          >
            {closing.labelText}
          </Button>
        ) : undefined
      }
    />
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
