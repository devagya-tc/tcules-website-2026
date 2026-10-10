import type { ComponentType } from 'react';

import {
  BrandMark,
  Button,
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
  Proof,
  type BlockCardSetItem,
  type LogoGridMark,
  type ProofQuote,
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
import { serviceDrawing } from '@/lib/service-illustrations';

import {
  CorpusHero,
  EnquiryBand,
  FaqItems,
  QuoteGroupBand,
  bodyOf,
  head,
  headingIdOf,
  proofQuote,
} from './blocks';
import { bindingNamed, slugOf } from './images';
import { formBeforeFaq, isFaqBand, isFormBand } from './order';
import styles from './CorpusPage.module.css';
import { bandLinks, labelTitle, leadOf, plain } from './text';

export type HomePageProps = {
  page: CorpusPage;
  caseRefs?: Readonly<Record<string, CorpusCaseRef>>;
  shared?: Readonly<Record<string, CorpusMediaBinding>>;
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

/** An external link opens in a new tab. */
const NEW_TAB = { target: '_blank', rel: 'noopener' } as const;

/**
 * TIER 3 — the home page, from the `_pages/` corpus (page-mapping § 4.1, as redrawn in Home round 1,
 * 10 Oct 2026).
 *
 * The narrative is the content team's, band for band. Inside each band the information is DESIGNED,
 * never paraphrased (owner, 10 Oct 2026: "we are allowed to design the content"): the hero's record
 * line becomes four figures, the client names become the logo wall the Clutch score leads, the case
 * quotes leave the cases for a testimonial pair of their own, and the client voices are a composed
 * wall rather than a slider. The one reorder is shared by every corpus page: the form sits directly
 * above the questions (order.ts).
 *
 * Shapes down the page, so no two neighbours are one rectangle: a split hero · four figures on tint ·
 * a boxed logo wall · six large drawn cards two up · four case rows and a quote pair · six icon boxes ·
 * four reason banners, alternating · a quote wall on tint · a photo banner · eight sector cards · the
 * form on tint · the questions. The hero's solid is the page's one blue ask; the form repeats it.
 */
export function HomePage({ page }: HomePageProps) {
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
        return Band ? <Band key={b.id} page={page} b={b} /> : null;
      })}
    </>
  );
}

type BandProps = { page: CorpusPage; b: CorpusBand };

/* ── 0 · the studio's record, as four figures ─────────────────────────────────────── */

/**
 * The hero's record line ("Founded 2017 · More than 90 projects · Clients in 19 countries · Based in
 * Ahmedabad, India") is the page's first credibility, so it is set as figures rather than a bullet
 * line (owner, 10 Oct 2026, note 1): one Stat per fact, the figure large and blue, what it counts
 * under it. The split designs the words and never rewords the information: "More than 90" is set as
 * "90+" (proposal P33 asks the content team to confirm the form), and the one fact that is a place
 * takes the country as its figure and the city in its line.
 *
 * Its own band on tint, directly under the hero: the studio's record is one proof type and never
 * shares a band with the logos or the rating (visual-direction § 5.8).
 */
const RECORD_FORMS: Readonly<Record<string, Pick<StatProps, 'value' | 'unit' | 'label'>>> = {
  'Founded 2017': { value: '2017', label: 'Founded' },
  'More than 90 projects': { value: '90+', label: 'Projects' },
  'Clients in 19 countries': { value: '19', label: 'Countries with clients' },
  'Based in Ahmedabad, India': { value: 'India', label: 'Based in Ahmedabad' },
};

function recordFact(fact: string): Pick<StatProps, 'value' | 'unit' | 'label'> {
  const known = RECORD_FORMS[fact];
  if (known) return known;
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
  const text = plain(line);
  return (
    <Section surface="tint" data-band="facts" aria-label={text}>
      <Layout as="ul" columns={{ base: 2, lg: 4 }} colGap="gutter" rowGap="stack">
        {text.split(' · ').map((fact) => (
          <Stat key={fact} as="li" {...recordFact(fact.trim())} />
        ))}
      </Layout>
    </Section>
  );
}

/* ── 1 · who has worked with us, led by the one independent score ─────────────────── */

/**
 * The kit home's approved band (kit/home 2): the boxed LogoGrid led by the Clutch RatingBadge, one
 * band, centred (owner, 10 Oct 2026, notes 2 and 3: pass 1 had split the score into a band of its own
 * and listed the clients as names). Every client is a mark: Doodle's approved SVG, and a typeset
 * wordmark for each of the five whose file has not arrived (register: "client logo SVG needed").
 * The authored sentence closes the band under the grid, so "out of 5" and the 13 reviews are said as
 * written, with the reviews one link away.
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
      <Layout rowGap="stack">
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
        {rating ? (
          <Layout rowGap="text" justifyItems="center">
            <p className={styles.ratingLine}>{rating.sentence}</p>
            <Button
              as="a"
              href={rating.href}
              {...NEW_TAB}
              emphasis="link"
              icon={<Icon name="arrow-right-up" />}
            >
              {rating.linkLabel}
            </Button>
          </Layout>
        ) : null}
      </Layout>
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
  return {
    score: match[1] ?? '',
    platform: match[2] ?? '',
    sentence,
    href: link.href,
    linkLabel: plain(link.children),
  };
}

/* ── 2 · six situations, the gateway to the services ──────────────────────────────── */

/**
 * The page's gateway (owner, 10 Oct 2026, note 4: "it needs to be much much better"). Six situations,
 * each a large card two up, led by its service's drawing (the ch05 service-line set), its situation
 * as the title, its paragraph, and the service named on the card's one action. Pass 1 set them six
 * across in boxes at the icon card's h5, and every situation read as a footnote to its neighbours.
 * The head stays above the cards (9 Oct ruling 3) and the band takes no decorative image: each
 * drawing IS its card's cover.
 */
function Situations({ b }: BandProps) {
  const cards: BlockCardSetItem[] = items(b).map((item) => {
    const link = item.blocks.find((x) => x.type === 'links');
    const para = item.blocks.find((x): x is ParagraphBlock => x.type === 'paragraph');
    const target = link?.type === 'links' ? link.links[0] : undefined;
    const drawing = target ? serviceDrawing(target.href) : undefined;
    return {
      id: item.headingText,
      title: item.headingText,
      ...(para ? bodyOf(para.runs) : {}),
      href: target?.href,
      ctaLabel: target?.labelText,
      ...(drawing ? { media: { type: 'image' as const, image: drawing } } : {}),
    };
  });
  return (
    <ContentSection {...head(b)} data-band="C-image" headingSize="display">
      <BlockCardSet
        items={cards}
        lead="none"
        across={2}
        ratio="cover"
        size="lg"
        cue="cta"
        scroll="never"
      />
    </ContentSection>
  );
}

/* ── 3 · selected work: four case rows, then what two of those clients said ──────── */

/**
 * Where a case cover is cropped (Media `focus`). The four bound artefacts run from 1.5:1 to 3.3:1, so
 * the band frames every one in the same 3:2 and anchors each crop on its subject: Doodle's model on
 * the left of its board, Benchmark Gensuite's first scope panel. Art direction a CMS field would carry
 * as a focal point (docs/strapi-changes.md); here it is the template's, keyed by binding id.
 */
const COVER_FOCUS: Readonly<Record<string, { x: number; y: number }>> = {
  home_doodle_object_model: { x: 0.2, y: 0.5 },
  home_benchmark_scope_selector: { x: 0.18, y: 0.5 },
};

/**
 * Four cases as one consistent run of rows (owner, 10 Oct 2026, note 5): the artefact at 3:2 on the
 * start, the copy beside it, every row the same shape. No slider — a slider hid three of the four
 * from most readers — and no quote inside a case: the two quotes the content authored inside the
 * Doodle and Eden AI cases leave them for their own testimonial pair after the rows, each still
 * naming its client.
 */
function SelectedWork({ page, b }: BandProps) {
  const cases = items(b);
  /* Each case ends on its own "Read the … case" line. The band's closing link ("See all case
     studies") is authored after the last case, so the parser files it under that case: the last link
     line of the last case is the band's, and the case keeps the one before it. */
  const lastLines = linkLines(cases.at(-1));
  const closing = lastLines.length > 1 ? lastLines.at(-1) : undefined;
  const quotes = cases.flatMap((item) => {
    const quote = quoteIn(item.blocks);
    return quote ? [proofQuote(quote)] : [];
  });
  const body = (
    <Layout rowGap="column">
      <Layout as="ul" rowGap="column">
        {cases.map((item, index) => {
          const lines = linkLines(item);
          const link = index === cases.length - 1 && closing ? lines.at(-2) : lines.at(-1);
          /* The client's name before the colon names the artefact: a title's other words can name
             another case's ("Eden AI: one way into the workflow builder" against Dealpath's
             `home_dealpath_workflow`). */
          const binding = bindingNamed(
            page,
            item.headingText.split(':')[0] ?? item.headingText,
          );
          const focus = binding ? COVER_FOCUS[binding.id] : undefined;
          const paragraphs = paragraphRuns(item.blocks);
          return (
            <BlockCard
              key={item.headingText}
              orientation="horizontal"
              imageSide="left"
              size="lg"
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
        })}
      </Layout>
      <QuotePeers quotes={quotes} />
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

/** Two or three quotes as peers (Proof `group`); one alone as the display quote. */
function QuotePeers({ quotes }: { quotes: readonly ProofQuote[] }) {
  const [first, second, third] = quotes;
  if (!first) return null;
  if (!second) return <Proof quote={first} />;
  return (
    <Proof arrangement="group" quotes={third ? [first, second, third] : [first, second]} />
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

/* ── 5 · four reasons, each a banner with its client's words ─────────────────────── */

/**
 * One heading, then four banners (owner, 10 Oct 2026, note 7): the reason on one side, the client's
 * words on the other, the sides alternating down the band, a `section` beat between banners so each
 * has its own moment. Pass 1 packed all four into one screen with the quotes under the reasons in
 * narrow columns. Reason 3 has no quote, so its other side is the work it names: The Wandering Raven,
 * built into Moodle (a register placeholder until the case binds a screen).
 */
function WhyTcules({ page, b }: BandProps) {
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
      <Layout rowGap="section">
        {reasons.map((item, index) => {
          const quote = quoteIn(item.blocks);
          const other = quote ? (
            <Proof quote={proofQuote(quote)} />
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
              ratio="3/2"
              sizes={CARD_TWO_TRACKS}
            />
          );
          return (
            <Layout
              key={item.headingText}
              columns={{ lg: [1, 1] }}
              colGap="column"
              rowGap="stack"
              align="center"
              reverse={index % 2 === 1 ? { lg: true } : undefined}
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
              {other}
            </Layout>
          );
        })}
      </Layout>
    </ContentSection>
  );
}

/* ── 6 · what clients say: the voices as one composed group ──────────────────────── */

function ClientVoices({ b }: BandProps) {
  return <QuoteGroupBand band={b} />;
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
