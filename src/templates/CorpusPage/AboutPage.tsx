import { Button, Cluster, Icon, Layout, Prose } from '@/components';
import {
  Accordion,
  Banner,
  BlockCard,
  BlockCardSet,
  ContentSection,
  ContentSectionText,
  CtaRow,
  CtaSection,
  DataTable,
  Slider,
  type BlockCardSetItem,
} from '@/patterns';
import type { CorpusBand, CorpusBlock, CorpusCaseRef, CorpusPage } from '@/lib/corpus-types';
import { glyphForRoute } from '@/lib/glyphs';
import { inlineToHtml, type InlineRun } from '@/lib/inline';
import { placeholderImage } from '@/lib/placeholders';

import {
  AsidePhoto,
  CorpusHero,
  FaqItems,
  ListTiles,
  QuoteGroupBand,
  bodyOf,
  faqItems,
  head,
  headingIdOf,
} from './blocks';
import { coverFor, slotImage } from './images';
import styles from './CorpusPage.module.css';
import { bandLinks, blocksOf, boldLead, html, labelTitle, plain, trimStart } from './text';

export type AboutPageProps = {
  page: CorpusPage;
  /** The cases the page cites, as each case's own page describes them (title, cover). */
  caseRefs?: Readonly<Record<string, CorpusCaseRef>>;
};

type ItemBlock = Extract<CorpusBlock, { type: 'item' }>;

const band = (page: CorpusPage, id: string): CorpusBand => {
  const found = page.bands.find((b) => b.id === id);
  if (!found) throw new Error(`AboutPage: the corpus page has no band "${id}".`);
  return found;
};

const items = (b: CorpusBand): ItemBlock[] =>
  b.blocks.filter((block): block is ItemBlock => block.type === 'item');

const paragraphRuns = (blocks: readonly CorpusBlock[]): InlineRun[][] =>
  blocks.flatMap((block) => (block.type === 'paragraph' ? [block.runs] : []));

/** A run of paragraphs as running text at the body measure. */
function Text({
  paragraphs,
  align,
}: {
  paragraphs: readonly InlineRun[][];
  align?: 'start' | 'center';
}) {
  return (
    <ContentSectionText align={align}>
      <Prose html={paragraphs.map(html).join('')} />
    </ContentSectionText>
  );
}

/* An external link opens in a new tab and says so to the engine's privacy default. */
const NEW_TAB = { target: '_blank', rel: 'noopener' } as const;

/**
 * TIER 3 — the About page, from the `_pages/` corpus (page-mapping § 4.10).
 *
 * The one page of its type, composed band by band in the content team's order. No two neighbours share
 * a shape: the studio paragraphs beside a photograph, a photograph beside the studio's story, plain
 * prose, a rail of six services, three situations, two tiles beside a photograph, three differences,
 * the principles in an accordion beside a photograph, two people, four cases, the working wall, client
 * voices, the company record as two halves, the questions, a coda beside a photograph, the ask and a
 * careers banner. The hero holds the title and its first paragraph; the rest of the opening splits into
 * `studio`, so the first viewport is not a wall of text.
 */
export function AboutPage({ page, caseRefs = {} }: AboutPageProps) {
  const [lede1, ...opening] = page.hero.lede;
  return (
    <>
      <CorpusHero page={page} ledes={lede1 ? [lede1] : []} texture />
      <Studio page={page} opening={opening} />
      <Ahmedabad page={page} />
      <Practice page={page} />
      <WhatWeDo page={page} />
      <WhoWeWorkWith page={page} />
      <Difference page={page} />
      <HowWeWork page={page} />
      <Leadership page={page} />
      <WorkYouCanInspect page={page} caseRefs={caseRefs} />
      <QuoteGroupBand band={band(page, 'testimonials')} />
      <CompanyRecord page={page} />
      <Faq page={page} />
      <Constant page={page} />
      <WorkWithUs page={page} />
      <Careers page={page} />
    </>
  );
}

/* ── S · the opening, split from the hero ────────────────────────────────────── */

/**
 * Three short paragraphs and no head, so the photograph carries the band (`weight: 'photo'`, 6:5 in
 * the 7 track). Copy-weighted, the paragraphs sat as a 130-tall island in the middle of a 596-tall
 * 4:5 column, the band's large thing nowhere (critic C3.5).
 */
function Studio({ page, opening }: { page: CorpusPage; opening: readonly InlineRun[][] }) {
  return (
    <ContentSection
      id="studio"
      data-band="B"
      arrangement="media"
      media={{ image: slotImage(page, 'studio'), side: 'end', pin: false, weight: 'photo' }}
    >
      <Text paragraphs={opening} />
    </ContentSection>
  );
}

/* ── 1 · Ahmedabad: the studio and its people, the band's own photograph ─────── */

function Ahmedabad({ page }: { page: CorpusPage }) {
  const b = band(page, 'ahmedabad-is-part-of-how-we-work');
  return (
    <ContentSection
      {...head(b)}
      data-band="B"
      arrangement="media"
      media={{ image: slotImage(page, b.id), side: 'start', pin: false, head: 'title' }}
    >
      <Text paragraphs={paragraphRuns(b.blocks)} />
    </ContentSection>
  );
}

/* ── 2 · the practice: an argument in prose ──────────────────────────────────── */

function Practice({ page }: { page: CorpusPage }) {
  const b = band(page, 'the-practice-keeps-moving');
  return (
    <ContentSection {...head(b)} data-band="C-text">
      <Text paragraphs={paragraphRuns(b.blocks)} />
    </ContentSection>
  );
}

/* ── 3 · what we do: six services, three in view ─────────────────────────────── */

/**
 * Six services with long bodies, three in view so each stays readable without a 2 × 3 wall. Each is a
 * boxed icon card whose body may carry a link of its own (Software Development's), so every card takes
 * the static frame (G3b): the cta is each card's one anchor, and all six answer the pointer alike.
 */
function WhatWeDo({ page }: { page: CorpusPage }) {
  const b = band(page, 'what-we-do');
  return (
    <ContentSection {...head(b)} data-band="C-icon">
      <Slider label={b.headingText} slideName="service" perView={3}>
        {items(b).map((item) => {
          const link = blocksOf({ ...b, blocks: item.blocks }, 'links')[0]?.links[0];
          return (
            <BlockCard
              key={item.headingText}
              title={item.headingText}
              bodyHtml={paragraphRuns(item.blocks).map((runs) => inlineToHtml(runs))}
              icon={link ? glyphForRoute(link.href) : undefined}
              href={link?.href}
              ctaLabel={link?.labelText}
              frame="box"
              linkScope="cta"
              size="sm"
              tracks={3}
            />
          );
        })}
      </Slider>
    </ContentSection>
  );
}

/* ── 4 · who we work with: three situations as peers ─────────────────────────── */

function WhoWeWorkWith({ page }: { page: CorpusPage }) {
  const b = band(page, 'who-we-work-with');
  const [leadBlock, list, ...closing] = b.blocks;
  const cards: BlockCardSetItem[] =
    list?.type === 'list'
      ? list.items.flatMap((runs) => {
          const lead = boldLead(runs);
          return lead
            ? [
                {
                  id: labelTitle(lead.label),
                  title: labelTitle(lead.label),
                  ...bodyOf(lead.body),
                },
              ]
            : [];
        })
      : [];
  return (
    <ContentSection
      {...head(b)}
      data-band="C-text"
      align="center"
      lead={leadBlock?.type === 'paragraph' ? plain(leadBlock.runs) : undefined}
    >
      <BlockCardSet items={cards} lead="none" across={3} scroll="never" />
      <Text paragraphs={paragraphRuns(closing)} align="center" />
    </ContentSection>
  );
}

/* ── 5a · 5b · what makes the practice different, in two halves ──────────────── */

/**
 * Five differences. The first two sit beside a photograph as tiles; the last three are the same
 * tiles three across under them, the set's continuation, with the band's closing link as the foot
 * (the split keeps the reading order: part b follows part a). One tile type for both halves: drawn
 * as text cards, the last three set a type step above the first two (critic C3.2, as C1.2).
 */
function Difference({ page }: { page: CorpusPage }) {
  const b = band(page, 'difference');
  const all = items(b);
  const row = (item: ItemBlock) => ({
    title: item.headingText,
    bodyHtml: paragraphRuns(item.blocks).map((runs) => inlineToHtml(runs)),
  });
  const link = bandLinks({ ...b, blocks: all.at(-1)?.blocks ?? [] })[0];
  return (
    <>
      <ContentSection
        {...head(b)}
        data-band="B"
        arrangement="media"
        media={{ image: slotImage(page, b.id), side: 'end', head: 'title' }}
      >
        <ListTiles rows={all.slice(0, 2).map(row)} columns={2} />
      </ContentSection>
      <ContentSection
        id={`${b.id}-2`}
        data-band="C-text"
        footer={
          link ? <CtaRow actions={[{ label: link.labelText, href: link.href }]} /> : undefined
        }
      >
        <ListTiles rows={all.slice(2).map(row)} columns={3} />
      </ContentSection>
    </>
  );
}

/* ── 6 · how Tcules works: five principles, closed ───────────────────────────── */

function HowWeWork({ page }: { page: CorpusPage }) {
  const b = band(page, 'how-we-work');
  return (
    <ContentSection
      {...head(b)}
      data-band="D"
      arrangement="beside"
      asideFill
      aside={<AsidePhoto image={slotImage(page, b.id)} />}
    >
      <Accordion items={faqItems(b)} />
    </ContentSection>
  );
}

/* ── 7 · the people behind the studio ────────────────────────────────────────── */

/**
 * Two people and the team behind them, beside the team photograph. Each leader is a name, a bio and a
 * link; what follows the second leader's own link (the studio paragraph and its link) belongs to the
 * band, not to her, so it is set after both.
 */
function Leadership({ page }: { page: CorpusPage }) {
  const b = band(page, 'leadership');
  const leaders = items(b).map((item) => {
    const at = item.blocks.findIndex((block) => block.type === 'links');
    return { item, own: item.blocks.slice(0, at + 1), after: item.blocks.slice(at + 1) };
  });
  const after = leaders.flatMap((leader) => leader.after);
  return (
    <ContentSection
      {...head(b)}
      data-band="B"
      arrangement="media"
      media={{ image: slotImage(page, b.id), side: 'end', pin: false, head: 'title' }}
    >
      <Layout rowGap="stack">
        {leaders.map(({ item, own }) => (
          <Layout key={item.headingText} rowGap="block">
            <h3 className={styles.itemTitle}>{item.headingText}</h3>
            <Blocks blocks={own} />
          </Layout>
        ))}
        {after.length > 0 ? (
          <Layout rowGap="block">
            <Blocks blocks={after} />
          </Layout>
        ) : null}
      </Layout>
    </ContentSection>
  );
}

/** Paragraphs and lone-link lines in order: running text, and each link as a link button. */
function Blocks({ blocks }: { blocks: readonly CorpusBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === 'paragraph') return <Prose key={index} html={html(block.runs)} />;
        if (block.type !== 'links') return null;
        return (
          <Cluster key={index} colGap="block" rowGap="tight">
            {block.links.map((link) => (
              <Button
                key={link.href}
                as="a"
                href={link.href}
                {...NEW_TAB}
                emphasis="link"
                tone="primary"
                icon={<Icon name="arrow-right-up" />}
              >
                {link.labelText}
              </Button>
            ))}
          </Cluster>
        );
      })}
    </>
  );
}

/* ── 8a · 8b · the work you can inspect ──────────────────────────────────────── */

/**
 * Four cases, each named for what it proves, as linked covers; then the Lab paragraph and the link to
 * every case beside the working wall. The band's bound photograph may not sit beside clickable cards
 * (9 Oct), so the band splits: the cards first, then the wall.
 */
function WorkYouCanInspect({
  page,
  caseRefs,
}: {
  page: CorpusPage;
  caseRefs: NonNullable<AboutPageProps['caseRefs']>;
}) {
  const b = band(page, 'work-you-can-inspect');
  const cases = b.blocks.flatMap((block) => {
    if (block.type !== 'paragraph') return [];
    const [first, ...tail] = block.runs;
    return first?.type === 'link' ? [{ link: first, body: trimStart(tail) }] : [];
  });
  const cards: BlockCardSetItem[] = cases.map(({ link, body }) => {
    const name = plain(link.children);
    return {
      id: link.href,
      title: name,
      ...bodyOf(body),
      media: { type: 'image', image: coverFor(page, name, caseRefs[link.href]) },
      href: link.href,
    };
  });
  const wall = blocksOf(b, 'links').flatMap((block) => block.links)[0];
  const labParagraph = b.blocks.find(
    (block) => block.type === 'paragraph' && block.runs[0]?.type !== 'link',
  );
  return (
    <>
      <ContentSection {...head(b)} data-band="M">
        <BlockCardSet items={cards} lead="none" across={4} cue="title" />
      </ContentSection>
      <ContentSection
        id={`${b.id}-2`}
        data-band="B"
        arrangement="media"
        media={{ image: slotImage(page, b.id), side: 'start', pin: false }}
        footer={
          wall ? <CtaRow actions={[{ label: wall.labelText, href: wall.href }]} /> : undefined
        }
      >
        {labParagraph?.type === 'paragraph' ? <Text paragraphs={[labParagraph.runs]} /> : null}
      </ContentSection>
    </>
  );
}

/* ── 10 · the company record, two halves ─────────────────────────────────────── */

/**
 * Sixteen facts as a record that holds the fold: DataTable's `split`, two boxed halves of eight side
 * by side from 1024, each with the authored header row, and one continuous table where the layout is
 * one column (owner, 10 Oct 2026). The band's heading names it.
 */
function CompanyRecord({ page }: { page: CorpusPage }) {
  const b = band(page, 'company-record');
  const table = blocksOf(b, 'table')[0];
  if (!table) return null;
  const [key = [], ...columns] = table.header;
  return (
    <ContentSection {...head(b)} data-band="E">
      <DataTable
        split
        labelledBy={headingIdOf(b)}
        keyColumn={{ heading: plain(key) }}
        columns={columns.map((cell) => ({ heading: plain(cell) }))}
        rows={table.rows.map((row) => ({
          header: plain(row[0] ?? []),
          cellsHtml: row.slice(1).map((cell) => inlineToHtml(cell)),
        }))}
      />
    </ContentSection>
  );
}

/* ── 11 · the questions ──────────────────────────────────────────────────────── */

function Faq({ page }: { page: CorpusPage }) {
  const b = band(page, 'frequently-asked-questions');
  return (
    <ContentSection {...head(b)} data-band="D-faq" align="center">
      <ContentSectionText>
        <FaqItems band={b} />
      </ContentSectionText>
    </ContentSection>
  );
}

/* ── 12 · what remains constant: the coda beside a photograph ────────────────── */

/** A head and four short lines: short copy, so the photograph takes the 7 track (as `studio`). */
function Constant({ page }: { page: CorpusPage }) {
  const b = band(page, 'what-remains-constant');
  return (
    <ContentSection
      {...head(b)}
      data-band="B"
      arrangement="media"
      media={{
        image: slotImage(page, b.id),
        side: 'end',
        pin: false,
        head: 'title',
        weight: 'photo',
      }}
    >
      <Text paragraphs={paragraphRuns(b.blocks)} />
    </ContentSection>
  );
}

/* ── 13 · the ask · 14 · careers ─────────────────────────────────────────────── */

function WorkWithUs({ page }: { page: CorpusPage }) {
  const b = band(page, 'work-with-tcules');
  const link = bandLinks(b)[0];
  const [lead] = paragraphRuns(b.blocks);
  if (!link) return null;
  return (
    <CtaSection
      id={b.id}
      data-band="L"
      arrangement="open"
      surface="tint"
      heading={b.headingText}
      body={lead ? [plain(lead)] : undefined}
      actions={[{ label: link.labelText, href: link.href }]}
    />
  );
}

/**
 * A second ask after the close is authored (P19), so it takes a link and a photograph rather than a
 * second solid: a head over a wide panorama, so the page ends the way the studio opens.
 */
function Careers({ page }: { page: CorpusPage }) {
  const b = band(page, 'careers');
  const link = bandLinks(b)[0];
  const [lead] = paragraphRuns(b.blocks);
  return (
    <Banner
      form="below"
      headingId={headingIdOf(b)}
      heading={b.headingText}
      lead={lead ? plain(lead) : undefined}
      actions={
        link ? (
          <CtaRow rule={false} actions={[{ label: link.labelText, href: link.href }]} />
        ) : undefined
      }
      image={{ ...placeholderImage(page.route, b.id), kind: 'photograph' }}
    />
  );
}
