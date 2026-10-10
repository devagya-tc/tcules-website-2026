import type { ComponentType } from 'react';

import {
  BrandMark,
  Icon,
  Layout,
  Media,
  RatingBadge,
  Section,
  Stat,
  type StatProps,
} from '@/components';
import {
  Banner,
  BlockCard,
  BlockCardSet,
  ContentSection,
  ContentSectionText,
  CtaRow,
  LogoGrid,
  TestimonialBeside,
  TestimonialCard,
  type BlockCardSetItem,
  type LogoGridMark,
} from '@/patterns';
import { clientMark } from '@/lib/client-marks';
import { corpusImage } from '@/lib/corpus-images';
import type {
  CorpusBand,
  CorpusBlock,
  CorpusCaseRef,
  CorpusMediaBinding,
  CorpusPage,
} from '@/lib/corpus-types';
import { glyphForRoute } from '@/lib/glyphs';
import { CARD_TWO_TRACKS } from '@/lib/image-sizes';
import { placeholderImage } from '@/lib/placeholders';

import {
  CorpusHero,
  EnquiryBand,
  FaqItems,
  QuoteGroupBand,
  bodyOf,
  head,
  headingIdOf,
  testimonialItem,
  type RatingsById,
} from './blocks';
import { bindingNamed, slugOf } from './images';
import { formBeforeFaq, isFaqBand, isFormBand } from './order';
import styles from './CorpusPage.module.css';
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
 * TIER 3 — the home page, from the `_pages/` corpus (page-mapping § 4.1, as redrawn in Home rounds 1
 * and 2, 10 Oct 2026).
 *
 * The narrative is the content team's, band for band. Inside each band the information is DESIGNED,
 * never paraphrased (owner, 10 Oct 2026: "we are allowed to design the content"): the hero's record
 * line becomes three figures, the client names become the logo wall the Clutch score leads, the
 * situations become a scannable set of decisions, the two quoted cases are featured with their
 * clients' rated words beside them, each reason leads its row with the client's words in support, and
 * the client voices are a wall of rated cards. The one reorder is shared by every corpus page: the
 * form sits directly above the questions (order.ts).
 *
 * Shapes down the page, so no two neighbours are one rectangle: a split hero · three figures on tint
 * · a boxed logo wall · six situation cards, two up, type only · two featured cases with a quote card
 * beside each, then a lighter pair · six icon boxes · four claim rows with a quiet quote · a wall of
 * rated cards on tint · a photo banner · eight sector cards · the form on tint · the questions. The
 * hero's solid is the page's one blue ask; the form repeats it.
 */
export function HomePage({ page, ratings }: HomePageProps) {
  return (
    <>
      <CorpusHero
        page={page}
        arrangement="beside"
        media={{ type: 'image', image: placeholderImage(page.route, 'hero') }}
        proofLine={false}
      />
      <StudioRecord page={page} />
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
        return Band ? <Band key={b.id} page={page} b={b} ratings={ratings} /> : null;
      })}
    </>
  );
}

type BandProps = { page: CorpusPage; b: CorpusBand; ratings?: RatingsById };

/* ── 0 · the studio's record, as three figures ────────────────────────────────────── */

/**
 * The hero's record line ("Founded 2017 · More than 90 projects · Clients in 19 countries · Based in
 * Ahmedabad, India") is the page's first credibility, so it is set as figures rather than a bullet
 * line (owner, 10 Oct 2026, note 1): one Stat per fact, the figure large and blue, what it counts
 * under it. The split designs the words and never rewords the information: "More than 90" is set as
 * "90+" (proposal P33 asks the content team to confirm the form).
 *
 * THREE figures, not four (owner, home round 2, 10 Oct 2026: "remove the 'based in India' stat").
 * A place is not a measure of the studio, and as a figure it was the one that read as filler. The
 * fact is not lost: the FAQ answers "How do you work with teams outside India?" and the footer
 * carries the studio's address. A `null` form is a fact the record deliberately leaves out.
 *
 * Its own band on tint, directly under the hero: the studio's record is one proof type and never
 * shares a band with the logos or the rating (visual-direction § 5.8).
 */
const RECORD_FORMS: Readonly<
  Record<string, Pick<StatProps, 'value' | 'unit' | 'label'> | null>
> = {
  'Founded 2017': { value: '2017', label: 'Founded' },
  'More than 90 projects': { value: '90+', label: 'Projects' },
  'Clients in 19 countries': { value: '19', label: 'Countries with clients' },
  'Based in Ahmedabad, India': null,
};

function recordFact(fact: string): Pick<StatProps, 'value' | 'unit' | 'label'> | null {
  const known = RECORD_FORMS[fact];
  if (known !== undefined) return known;
  /* A fact the table does not know still renders, its number as the figure and its words as the
     line, and says so in development so the table catches up. */
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`HomePage: record fact "${fact}" has no figure form; add it to RECORD_FORMS.`);
  }
  return { value: /\d[\d.,]*/.exec(fact)?.[0] ?? fact, label: fact };
}

function StudioRecord({ page }: { page: CorpusPage }) {
  const [line] = page.hero.proofLines;
  if (!line) return null;
  const facts = plain(line)
    .split(' · ')
    .map((fact) => fact.trim())
    .flatMap((fact) => {
      const form = recordFact(fact);
      return form ? [{ fact, form }] : [];
    });
  return (
    <Section surface="tint" data-band="facts" aria-label={facts.map((f) => f.fact).join(' · ')}>
      <Layout as="ul" columns={{ base: 1, md: facts.length }} colGap="gutter" rowGap="stack">
        {facts.map(({ fact, form }) => (
          <Stat key={fact} as="li" {...form} />
        ))}
      </Layout>
    </Section>
  );
}

/* ── 1 · who has worked with us, led by the one independent score ─────────────────── */

/**
 * The kit home's approved band (kit/home 2): the boxed LogoGrid led by the Clutch RatingBadge, one
 * band, centred (owner, 10 Oct 2026, notes 2 and 3). Every client is a mark: Doodle's approved SVG,
 * and a typeset wordmark for each of the five whose file has not arrived (register: "client logo SVG
 * needed").
 *
 * NO LINE UNDER THE GRID (owner, home round 2, 10 Oct 2026: "remove the line under the logo wall").
 * The authored sentence ("4.8 out of 5 on Clutch across 13 independent client reviews. Read the
 * reviews") said what the badge already says, and its link went where the badge goes: the badge IS
 * the link to the Clutch profile, so the reviews stay one click away. The review count leaves the
 * page with the sentence; P35 asks the content team whether the badge should carry it.
 */
function Recognition({ b }: BandProps) {
  const [namesBlock, ratingBlock] = b.blocks.filter(
    (block): block is ParagraphBlock => block.type === 'paragraph',
  );
  const names = namesBlock ? plain(namesBlock.runs).split(' · ') : [];
  const marks: LogoGridMark[] = names.map((name) => clientMark(name) ?? { name: name.trim() });
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
 * The page's gateway, built for a quick decision (owner, home round 2, 10 Oct 2026: the band "is now
 * focusing more on the images than on the actual services … the title of each item is why they
 * would want to explore the service further"). Round 1 led each situation with a 3:2 service drawing
 * two up, and the band ran 2,280 with the pictures doing the talking.
 *
 * Now the situation IS the card: six text cards, two across, each opening on a hairline, the
 * situation as an h3-scale title (the reader's own reason, in their words), its paragraph, and the
 * service named on the card's one action. No imagery at all: an icon per card would repeat the glyphs
 * the "What we do" boxes carry for the same services two bands later, and a drawing out-shouts the
 * title. The titles scan down two columns in one screen and a half.
 */
function Situations({ b }: BandProps) {
  const cards: BlockCardSetItem[] = items(b).map((item) => {
    const link = item.blocks.find((x) => x.type === 'links');
    const para = item.blocks.find((x): x is ParagraphBlock => x.type === 'paragraph');
    const target = link?.type === 'links' ? link.links[0] : undefined;
    return {
      id: item.headingText,
      title: item.headingText,
      ...(para ? bodyOf(para.runs) : {}),
      href: target?.href,
      ctaLabel: target?.labelText,
    };
  });
  return (
    <ContentSection {...head(b)} data-band="C-text" headingSize="display">
      <BlockCardSet items={cards} lead="none" across={2} size="lg" cue="cta" scroll="never" />
    </ContentSection>
  );
}

/* ── 3 · selected work: two cases with their clients' words, then two more ───────── */

/**
 * Where a case cover is cropped (Media `focus`). The four bound artefacts run from 1.5:1 (Dealpath)
 * to 3.3:1 (Benchmark Gensuite); the featured covers are framed at 2:1 (BlockCard `double`) and the
 * listed pair at 16:5 (`pair`), both 16:9 stacked below 1024. Benchmark's board is nearly 16:5
 * already; Dealpath, the tallest, anchors on its top. At 2:1 Doodle shows its map and the tablet, Eden AI is near its own
 * shape, Benchmark's two panels sit centred, and only Dealpath (the tallest) gives up the foot of its
 * second listing, so it anchors on the top. Art direction a CMS field would carry as a focal point
 * (docs/strapi-changes.md); here it is the template's, keyed by binding id.
 */
const COVER_FOCUS: Readonly<Record<string, { x: number; y: number }>> = {
  home_doodle_object_model: { x: 0, y: 0.5 },
  home_dealpath_workflow: { x: 0.5, y: 0 },
  home_benchmark_scope_selector: { x: 0.5, y: 0.5 },
};

/**
 * Featured, then listed (owner, home round 2, 10 Oct 2026: "the 4 items just one after the other is
 * not the best visually looking layout … it could be 2 rows for the case studies with quotes, and
 * then the other case studies listed in a 2-col layout").
 *
 *   1. The two cases whose clients spoke (Doodle, Eden AI) each get a featured row: the case card in
 *      the 7 — its 2:1 artefact, the title, its paragraph and its link — and the client's rated
 *      quote in its own card in the 5, beside it (TestimonialBeside). ADJACENT, never inside: "if a
 *      quote is embedded in the case it might as well be in the testimonial section". The second
 *      row mirrors the first, so the quotes zig-zag down the band.
 *   2. The cases without a quote (Dealpath, Benchmark Gensuite) follow as a lighter pair, two across,
 *      one type step down, their covers the linked pair's 16:5 (BlockCard `pair`, 16:9 stacked) so
 *      the pair reads as the list after the features rather than two more features.
 *
 * The cases keep their authored words in authored order within each group; the grouping is the IA
 * the owner asked for. "See all case studies" stays at the head's end.
 */
function SelectedWork({ page, b, ratings }: BandProps) {
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
        ratio={featured ? 'double' : 'pair'}
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
          work={<ul>{card(item, index, true)}</ul>}
          item={testimonialItem(quote!, ratings)}
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

/* ── 5 · four reasons: the claim leads, the client's words support it ────────────── */

/**
 * Claim first, proof second (owner, home round 2, 10 Oct 2026: "the main highlight is the thing we
 * claim to be doing and the testimonial supports it … right now everything is fighting for
 * attention"). Round 1 set each reason opposite a display quote at the same 34 as the reason's
 * title, behind a blue rule, alternating sides, so the eye could not tell which side was the point.
 *
 * Every row now reads the same way, start to end: the claim in the 7 — its index, the reason at the
 * h2 role and its sentences at the lead size — and, in the 5, the client's words as the SUPPORTING
 * testimonial (TestimonialCard `sm`, unboxed): the reading quote in the quiet ink, small stars, the
 * speaker, no panel and no rule. One primary per row, and it never changes sides.
 *
 * Reason 3 has no quote, so its supporting side is the work it names: The Wandering Raven, built
 * into Moodle, at 2:1 in the same 5 (a register placeholder until the case binds a screen).
 */
function WhyTcules({ page, b, ratings }: BandProps) {
  const reasons = items(b);
  /* The band's closing link is authored after the last reason, so the parser files it there. */
  const closing = linkLines(reasons.at(-1))[0];
  return (
    <ContentSection
      {...head(b)}
      data-band="B-rows"
      headingSize="display"
      footer={
        closing ? (
          <CtaRow actions={[{ label: closing.labelText, href: closing.href }]} />
        ) : undefined
      }
    >
      <Layout rowGap="stack">
        {reasons.map((item, index) => {
          const quote = quoteIn(item.blocks);
          const support = quote ? (
            <TestimonialCard item={testimonialItem(quote, ratings)} size="sm" frame="none" />
          ) : (
            <Media
              image={placeholderImage(
                page.route,
                b.id,
                slugOf(
                  /For ([^,]+),/.exec(paragraphRuns(item.blocks).map(plain).join(' '))?.[1] ??
                    '',
                ),
              )}
              sizes={CARD_TWO_TRACKS}
            />
          );
          return (
            <Layout
              key={item.headingText}
              columns={{ lg: [7, 5] }}
              colGap="column"
              rowGap="block"
              className={styles.banner}
            >
              <Layout rowGap="block">
                <span className={styles.index} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.reasonTitle}>{item.headingText}</h3>
                {paragraphRuns(item.blocks).map((runs, i) => (
                  <p key={i} className={styles.reasonBody}>
                    {plain(runs)}
                  </p>
                ))}
              </Layout>
              <div className={styles.reasonSupport}>{support}</div>
            </Layout>
          );
        })}
      </Layout>
    </ContentSection>
  );
}

/* ── 6 · what clients say: the voices as one wall of rated cards ─────────────────── */

function ClientVoices({ b, ratings }: BandProps) {
  return <QuoteGroupBand band={b} ratings={ratings} />;
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
