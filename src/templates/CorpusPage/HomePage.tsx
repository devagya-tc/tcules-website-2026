import { Button, Icon, Layout, Media, Section, Stat } from '@/components';
import {
  Banner,
  BlockCardSet,
  ContentSection,
  ContentSectionText,
  CtaRow,
  ListCard,
  LogoGrid,
  Proof,
  Slider,
  type BlockCardSetItem,
} from '@/patterns';
import { corpusImage } from '@/lib/corpus-images';
import type {
  CorpusBand,
  CorpusBlock,
  CorpusCaseRef,
  CorpusMediaBinding,
  CorpusPage,
} from '@/lib/corpus-types';
import { glyphForRoute } from '@/lib/glyphs';
import { placeholderImage } from '@/lib/placeholders';
import { FULL_COLUMN } from '@/lib/image-sizes';

import {
  EnquiryBand,
  FaqItems,
  QuoteCompact,
  QuoteSliderBand,
  CorpusHero,
  bodyOf,
  head,
  headingIdOf,
  proofQuote,
} from './blocks';
import { bindingNamed, slotImage } from './images';
import styles from './CorpusPage.module.css';
import { bandLinks, labelTitle, leadOf, plain } from './text';

export type HomePageProps = {
  page: CorpusPage;
  caseRefs?: Readonly<Record<string, CorpusCaseRef>>;
  shared?: Readonly<Record<string, CorpusMediaBinding>>;
};

const band = (page: CorpusPage, id: string): CorpusBand => {
  const found = page.bands.find((b) => b.id === id);
  if (!found) throw new Error(`HomePage: the corpus page has no band "${id}".`);
  return found;
};

/* An external link opens in a new tab and says so to the engine's privacy default. */
const NEW_TAB = { target: '_blank', rel: 'noopener' } as const;

type ItemBlock = Extract<CorpusBlock, { type: 'item' }>;
const items = (b: CorpusBand): ItemBlock[] =>
  b.blocks.filter((block): block is ItemBlock => block.type === 'item');

const paragraphRuns = (blocks: readonly CorpusBlock[]) =>
  blocks.flatMap((block) => (block.type === 'paragraph' ? [block.runs] : []));

/**
 * TIER 3 — the home page, from the `_pages/` corpus (page-mapping § 4.1).
 *
 * The one page of its type, composed band by band from the kit's units in the content team's order:
 * a boxed name grid, a numeral strip, six situations as icon cards, four cases one at a time, six
 * services as rows, four reasons beside photographs, a slider of client voices, a photo banner, eight
 * sectors, the questions, and the form. No two neighbours share a shape, no two tints touch, and the
 * hero's solid is the page's one blue ask (the close repeats it as the form).
 */
export function HomePage({ page }: HomePageProps) {
  const heroTags = page.hero.proofLines[0] ? plain(page.hero.proofLines[0]).split(' · ') : [];

  return (
    <>
      <CorpusHero
        page={page}
        arrangement="beside"
        media={{ type: 'image', image: placeholderImage(page.route, 'hero') }}
        tags={heroTags}
        proofLine={false}
      />
      <Recognition page={page} />
      <Situations page={page} />
      <SelectedWork page={page} />
      <Capabilities page={page} />
      <WhyTcules page={page} />
      <ClientVoices page={page} />
      <AiPractice page={page} />
      <Expertise page={page} />
      <ContentSection {...head(band(page, 'faq'))} data-band="D-faq" align="center">
        <ContentSectionText>
          <FaqItems band={band(page, 'faq')} />
        </ContentSectionText>
      </ContentSection>
      <EnquiryBand page={page} band={band(page, 'enquiry')} surface="tint" />
    </>
  );
}

/* ── 1a · 1b — who has trusted us, and the one independent score ─────────────────── */

/**
 * The band's two proof types are two bands (owner, 9 Oct): logos never share a band with the
 * aggregate rating. Five of the six clients have no approved mark, so the whole set renders as names
 * (LogoGrid G1: a set is all marks or all names, so weights stay equal).
 */
function Recognition({ page }: { page: CorpusPage }) {
  const b = band(page, 'client-recognition');
  const [namesBlock, ratingBlock] = b.blocks;
  const names = namesBlock?.type === 'paragraph' ? plain(namesBlock.runs).split(' · ') : [];
  const id = headingIdOf(b);
  return (
    <>
      <Section data-band="H" id={b.id} aria-labelledby={id}>
        <LogoGrid
          marks={names.map((name) => ({ name }))}
          context={b.headingText}
          contextAs="h2"
          headingId={id}
          align="center"
          edges="closed"
        />
      </Section>
      {ratingBlock?.type === 'paragraph' ? (
        <RatingStrip block={ratingBlock} id={`${b.id}-2`} />
      ) : null}
    </>
  );
}

/**
 * The kit's rating-led facts move, without its head (the band's heading went to the grid above):
 * "4.8 out of 5 on Clutch across 13 independent client reviews." split across Stat's value, unit and
 * label in the order it was written, and the link in Stat's own `source` slot.
 */
function RatingStrip({
  block,
  id,
}: {
  block: Extract<CorpusBlock, { type: 'paragraph' }>;
  id: string;
}) {
  const [first, ...rest] = block.runs;
  const link = rest.find((run) => run.type === 'link');
  const between = rest
    .filter((run) => run.type === 'text')
    .map((run) => run.text)
    .join('');
  const match =
    first?.type === 'strong'
      ? /^(\d+(?:\.\d+)?)\s+(out of \d+)\s+(.+)$/.exec(plain(first.children))
      : null;
  if (!match || !link || link.type !== 'link') {
    return (
      <Section surface="tint" id={id} data-band="facts">
        <p>{plain(block.runs)}</p>
      </Section>
    );
  }
  const [, value = '', unit = '', onPlatform = ''] = match;
  return (
    <Section surface="tint" id={id} data-band="facts" aria-label={plain(block.runs)}>
      <Layout justifyItems="center">
        <Stat
          size="xl"
          align="center"
          value={value}
          unit={unit}
          label={`${onPlatform}${between}`.trim()}
          source={
            <Button
              as="a"
              href={link.href}
              {...NEW_TAB}
              emphasis="link"
              icon={<Icon name="arrow-right-up" />}
            >
              {plain(link.children)}
            </Button>
          }
        />
      </Layout>
    </Section>
  );
}

/* ── 2 · six situations, each with its own destination ───────────────────────────── */

function Situations({ page }: { page: CorpusPage }) {
  const b = band(page, 'product-situations');
  const cards: BlockCardSetItem[] = items(b).map((item) => {
    const link = item.blocks.find((x) => x.type === 'links');
    const para = item.blocks.find((x) => x.type === 'paragraph');
    const target = link?.type === 'links' ? link.links[0] : undefined;
    return {
      id: item.headingText,
      title: item.headingText,
      ...(para?.type === 'paragraph' ? bodyOf(para.runs) : {}),
      href: target?.href,
      ctaLabel: target?.labelText,
      icon: target ? glyphForRoute(target.href) : undefined,
    };
  });
  return (
    <ContentSection {...head(b)} data-band="C-icon">
      <BlockCardSet items={cards} lead="none" across={3} frame="box" cue="cta" scroll="never" />
    </ContentSection>
  );
}

/* ── 3 · selected work: four cases, one at a time ────────────────────────────────── */

function SelectedWork({ page }: { page: CorpusPage }) {
  const b = band(page, 'selected-work');
  const cases = items(b);
  /* Each case ends on its own "Read the … case" link line. The band's closing link ("See all case
     studies") is authored after the last case, so the parser files it under that case's item: the
     last link line of the last case is the band's, and the case keeps the one before it. */
  const lastLines = linkLines(cases.at(-1));
  const closingLink = lastLines.length > 1 ? lastLines.at(-1) : undefined;
  const slider = (
    <Slider label={b.headingText} slideName="case" perView={1}>
      {cases.map((item, index) => (
        <li key={item.headingText}>
          <CaseSlide
            page={page}
            item={item}
            dropLast={index === cases.length - 1 && Boolean(closingLink)}
          />
        </li>
      ))}
    </Slider>
  );
  /* The band's link sits at the end of the heading's row (7 Oct ruling 5), not as a foot a stack
     under the slider: a footer row and its rule would cost ~100 of a band that already carries the
     tallest slide and its controls. */
  return closingLink ? (
    <ContentSection
      {...head(b)}
      data-band="M"
      actionsAt="end"
      actions={
        <CtaRow
          rule={false}
          actions={[{ label: closingLink.labelText, href: closingLink.href }]}
        />
      }
    >
      {slider}
    </ContentSection>
  ) : (
    <ContentSection {...head(b)} data-band="M">
      {slider}
    </ContentSection>
  );
}

/** Every lone-link line of an item, as links, in order. */
function linkLines(item: ItemBlock | undefined) {
  return (item?.blocks ?? []).flatMap((block) => (block.type === 'links' ? block.links : []));
}

/**
 * One case as a slide: the artefact is the one large thing, the copy beside it (h3, the paragraph,
 * the client's words where authored, the link). No card frame and no rating, so it stays clear of
 * the rejected case-with-rating band; a template-local composition (page-mapping G15), promoted only
 * if a second page needs it.
 */
function CaseSlide({
  page,
  item,
  dropLast,
}: {
  page: CorpusPage;
  item: ItemBlock;
  /** The case's last link line is the band's own closing link, not the case's. */
  dropLast: boolean;
}) {
  const binding = bindingNamed(page, item.headingText);
  const paragraphs = paragraphRuns(item.blocks);
  const quote = item.blocks.find((x) => x.type === 'quote');
  const lines = linkLines(item);
  const link = dropLast ? lines.at(-2) : lines.at(-1);
  return (
    <Layout columns={{ lg: [1, 1] }} colGap="section" rowGap="stack" align="center">
      {binding ? <Media image={corpusImage(binding)} sizes={FULL_COLUMN} /> : null}
      <Layout rowGap="block">
        <h3 className={styles.itemTitle}>{item.headingText}</h3>
        {paragraphs.map((runs, index) => (
          <p key={index}>{plain(runs)}</p>
        ))}
        {quote?.type === 'quote' ? (
          <Proof arrangement="compact" quote={proofQuote(quote)} />
        ) : null}
        {link ? (
          <CtaRow rule={false} actions={[{ label: link.labelText, href: link.href }]} />
        ) : null}
      </Layout>
    </Layout>
  );
}

/* ── 4 · what we do: six services as linked rows ─────────────────────────────────── */

function Capabilities({ page }: { page: CorpusPage }) {
  const b = band(page, 'capabilities');
  const intro = b.blocks.find((x) => x.type === 'paragraph');
  const rows = b.blocks.flatMap((block) => {
    const lead = leadOf(block);
    if (!lead) return [];
    const link = lead.label.find((run) => run.type === 'link');
    return [
      {
        title: labelTitle(lead.label),
        body: lead.body,
        href: link?.type === 'link' ? link.href : undefined,
      },
    ];
  });
  return (
    <ContentSection
      {...head(b)}
      data-band="D"
      lead={intro?.type === 'paragraph' ? plain(intro.runs) : undefined}
    >
      <Layout as="ul" columns={{ lg: 2 }} colGap="column" rowGap="none">
        {rows.map((row) => (
          <ListCard
            key={row.title}
            arrangement="stacked"
            size="md"
            titleAs="h3"
            title={row.title}
            href={row.href}
            {...bodyOf(row.body)}
          />
        ))}
      </Layout>
    </ContentSection>
  );
}

/* ── 5a · 5b — four reasons, each with its client's words ────────────────────────── */

function Reason({ item }: { item: ItemBlock }) {
  const quote = item.blocks.find((x) => x.type === 'quote');
  return (
    <Layout rowGap="block">
      <h3 className={styles.itemTitle}>{item.headingText}</h3>
      {paragraphRuns(item.blocks).map((runs, index) => (
        <p key={index}>{plain(runs)}</p>
      ))}
      {quote?.type === 'quote' ? <QuoteCompact block={quote} /> : null}
    </Layout>
  );
}

function WhyTcules({ page }: { page: CorpusPage }) {
  const b = band(page, 'why-tcules');
  const reasons = items(b);
  /* The band's closing link ("How to choose a product design studio") is authored after the last
     reason, so the parser files it under that reason's item. */
  const closing = linkLines(reasons.at(-1))[0];
  return (
    <>
      <ContentSection
        {...head(b)}
        data-band="B"
        arrangement="media"
        media={{ image: slotImage(page, b.id), side: 'end', head: 'title' }}
      >
        <Layout columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
          {reasons.slice(0, 2).map((item) => (
            <Reason key={item.headingText} item={item} />
          ))}
        </Layout>
      </ContentSection>
      <ContentSection
        id={`${b.id}-2`}
        data-band="B"
        arrangement="media"
        media={{
          image: placeholderImage(page.route, `${b.id}-2`),
          side: 'start',
          head: 'title',
        }}
        footer={
          closing ? (
            <CtaRow actions={[{ label: closing.labelText, href: closing.href }]} />
          ) : undefined
        }
      >
        <Layout rowGap="stack">
          {reasons.slice(2).map((item) => (
            <Reason key={item.headingText} item={item} />
          ))}
        </Layout>
      </ContentSection>
    </>
  );
}

/* ── 6 · what clients say: one quote at a time ───────────────────────────────────── */

function ClientVoices({ page }: { page: CorpusPage }) {
  return <QuoteSliderBand band={band(page, 'client-voices')} />;
}

/* ── 7 · how we use AI: one idea and one link ────────────────────────────────────── */

function AiPractice({ page }: { page: CorpusPage }) {
  const b = band(page, 'ai-native-practice');
  const lead = b.blocks.find((x) => x.type === 'paragraph');
  const link = bandLinks(b)[0];
  return (
    <Banner
      form="beside"
      mediaSide="end"
      headingId={headingIdOf(b)}
      heading={b.headingText}
      lead={lead?.type === 'paragraph' ? plain(lead.runs) : undefined}
      actions={
        link ? (
          <CtaRow rule={false} actions={[{ label: link.labelText, href: link.href }]} />
        ) : undefined
      }
      image={{ ...placeholderImage(page.route, b.id), kind: 'photograph' }}
    />
  );
}

/* ── 8 · the sectors we know: eight destinations, titles only ────────────────────── */

function Expertise({ page }: { page: CorpusPage }) {
  const b = band(page, 'expertise');
  const links = bandLinks(b);
  const glyphs = links.map((link) => glyphForRoute(link.href));
  const cards: BlockCardSetItem[] = links.map((link, index) => ({
    id: link.href,
    title: link.labelText,
    href: link.href,
    icon: glyphs.every(Boolean) ? glyphs[index] : undefined,
  }));
  return (
    <ContentSection {...head(b)} data-band="C-icon">
      <BlockCardSet
        items={cards}
        lead="none"
        across={4}
        frame="box"
        cue="title"
        scroll="never"
      />
    </ContentSection>
  );
}
