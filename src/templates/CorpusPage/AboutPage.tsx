import { Button, Cluster, Icon, Layout, Media, Prose } from '@/components';
import {
  Banner,
  BlockCard,
  BlockCardSet,
  ContentSection,
  ContentSectionText,
  CtaRow,
  CtaSection,
  DataTable,
  EngagementOptions,
  OfferSheet,
  VoiceLedger,
  type BlockCardSetItem,
  type EngagementScope,
  type HeroStat,
} from '@/patterns';
import type { CorpusBand, CorpusBlock, CorpusCaseRef, CorpusPage } from '@/lib/corpus-types';
import { glyphForRoute } from '@/lib/glyphs';
import { inlineToHtml, type InlineRun } from '@/lib/inline';
import { HEAD_TRACK } from '@/lib/image-sizes';
import { placeholderImage } from '@/lib/placeholders';

import {
  CorpusHero,
  FaqItems,
  QuoteGroupBand,
  bodyOf,
  head,
  headingIdOf,
  type RatingsById,
} from './blocks';
import { coverFor, slotImage, slugOf } from './images';
import styles from './CorpusPage.module.css';
import { bandLinks, blocksOf, boldLead, html, labelTitle, plain, trimStart } from './text';

export type AboutPageProps = {
  page: CorpusPage;
  /** The cases the page cites, as each case's own page describes them (title, cover). */
  caseRefs?: Readonly<Record<string, CorpusCaseRef>>;
  /** Star ratings for the page's testimonials, by id (PLACEHOLDERS today; see the content seam). */
  ratings?: RatingsById;
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
export function AboutPage({ page, caseRefs = {}, ratings }: AboutPageProps) {
  const [lede1, ...opening] = page.hero.lede;
  return (
    <>
      <CorpusHero page={page} ledes={lede1 ? [lede1] : []} stats={recordStats(page)} texture />
      <Studio page={page} opening={opening} />
      <Ahmedabad page={page} />
      <Practice page={page} />
      <WhatWeDo page={page} />
      <WhoWeWorkWith page={page} />
      <Difference page={page} />
      <HowWeWork page={page} />
      <Leadership page={page} />
      <WorkYouCanInspect page={page} caseRefs={caseRefs} />
      <QuoteGroupBand band={band(page, 'testimonials')} ratings={ratings} />
      <CompanyRecord page={page} />
      <Faq page={page} />
      <Constant page={page} />
      <WorkWithUs page={page} />
      <Careers page={page} />
    </>
  );
}

/* ── the record as the hero's figures ─────────────────────────────────────────── */

/**
 * The studio's three figures from its own record table ("Tcules at a glance"), in the hero's stats
 * row as on home (home round 3): founded, projects, countries. The table still prints every fact.
 */
const RECORD_FIGURES: Readonly<Record<string, (value: string) => HeroStat>> = {
  Founded: (value) => ({ value, label: 'Founded' }),
  Projects: (value) => ({ value: value.replace(/^More than (\d+)$/u, '$1+'), label: 'Projects' }),
  'Client reach': (value) => ({
    value: /\d+/u.exec(value)?.[0] ?? value,
    label: 'Countries with clients',
  }),
};

function recordStats(page: CorpusPage): HeroStat[] {
  const table = blocksOf(band(page, 'company-record'), 'table')[0];
  if (!table) return [];
  return Object.entries(RECORD_FIGURES).flatMap(([fact, form]) => {
    const row = table.rows.find((cells) => plain(cells[0] ?? []) === fact);
    return row ? [form(plain(row[1] ?? []))] : [];
  });
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
      media={{ image: slotImage(page, b.id), side: 'start', pin: false, head: 'lg' }}
    >
      <Text paragraphs={paragraphRuns(b.blocks)} />
    </ContentSection>
  );
}

/* ── 2 · the practice: an argument in prose ──────────────────────────────────── */

function Practice({ page }: { page: CorpusPage }) {
  const b = band(page, 'the-practice-keeps-moving');
  return (
    <ContentSection {...head(b)} data-band="C-text" arrangement="beside">
      <Text paragraphs={paragraphRuns(b.blocks)} />
    </ContentSection>
  );
}

/* ── 3 · what we do: six services, all in view ───────────────────────────────── */

/**
 * Six services with long bodies, as one grid of linked icon cards: three across from 1024, two from
 * 768, stacked on a phone. Every service stays in view (owner, 10 Oct 2026, home round 1: a slider
 * hides everything past its first view from most readers; this band was a Slider showing three). Each
 * card's body may carry a link of its own (Software Development's), so every card takes the static
 * frame (G3b): the cta is each card's one anchor, and all six answer the pointer alike.
 */
function WhatWeDo({ page }: { page: CorpusPage }) {
  const b = band(page, 'what-we-do');
  const cards: BlockCardSetItem[] = items(b).map((item) => {
    const link = blocksOf({ ...b, blocks: item.blocks }, 'links')[0]?.links[0];
    return {
      id: item.headingText,
      title: item.headingText,
      bodyHtml: paragraphRuns(item.blocks).map((runs) => inlineToHtml(runs)),
      icon: link ? glyphForRoute(link.href) : undefined,
      href: link?.href,
      ctaLabel: link?.labelText,
    };
  });
  return (
    <ContentSection {...head(b)} data-band="C-icon">
      <BlockCardSet
        items={cards}
        lead="none"
        across={3}
        frame="box"
        linkScope="cta"
        cue="cta"
        scroll="never"
      />
    </ContentSection>
  );
}

/* ── 4 · who we work with: three situations as peers ─────────────────────────── */

function WhoWeWorkWith({ page }: { page: CorpusPage }) {
  const b = band(page, 'who-we-work-with');
  const [leadBlock, list, ...closing] = b.blocks;
  const rows =
    list?.type === 'list'
      ? list.items.flatMap((runs) => {
          const lead = boldLead(runs);
          return lead ? [{ voice: labelTitle(lead.label), reply: plain(lead.body) }] : [];
        })
      : [];
  /* The three situations as the questions layout (pattern 32: the reader recognises their own
     situation in the large line, what it involves beside it); the closing two lines under the rows,
     in the same band. */
  return (
    <VoiceLedger
      id={b.id}
      heading={b.headingText}
      headingId={headingIdOf(b)}
      lead={leadBlock?.type === 'paragraph' ? plain(leadBlock.runs) : undefined}
      items={rows}
      note={<Text paragraphs={paragraphRuns(closing)} />}
    />
  );
}

/* ── 5 · what makes the practice different: five principles, one set ───────────── */

/**
 * Five principles as ONE OfferSheet, three across (3 + 2), the band's link under the set. It was two
 * tiles beside a photograph and three more under it, the set running on past the image into a second
 * row (owner, 11 Oct 2026: an image beside a set whose items extend into the next row is illegal).
 * Each principle's two paragraphs read as one body.
 */
function Difference({ page }: { page: CorpusPage }) {
  const b = band(page, 'difference');
  const all = items(b);
  const link = bandLinks({ ...b, blocks: all.at(-1)?.blocks ?? [] })[0];
  return (
    <OfferSheet
      id={b.id}
      heading={b.headingText}
      headingId={headingIdOf(b)}
      across={3}
      items={all.map((item) => ({
        title: item.headingText,
        bodyHtml: paragraphRuns(item.blocks)
          .map((runs) => inlineToHtml(runs))
          .join(' '),
      }))}
      note={
        link ? (
          <CtaRow rule={false} actions={[{ label: link.labelText, href: link.href }]} />
        ) : undefined
      }
    />
  );
}

/* ── 6 · how Tcules works: five principles, closed ───────────────────────────── */

/* Each principle's drawing, in the authored order (EngagementOptions' scopes). */
const HOW_SCOPES: readonly EngagementScope[] = ['start', 'direct', 'inside', 'overlap', 'commercial'];

/**
 * Five working principles as the "Ways to work with us" cards (owner, 11 Oct 2026): a drawing each on
 * its plate, the principle under it, its two paragraphs as one body. Five across from 1440. They were
 * five tiles in two columns beside a stand-in photograph — "a hella lot of content for this one
 * section"; the drawings make the five comparable before a word is read.
 */
function HowWeWork({ page }: { page: CorpusPage }) {
  const b = band(page, 'how-we-work');
  return (
    <EngagementOptions
      id={b.id}
      heading={b.headingText}
      headingId={headingIdOf(b)}
      options={items(b).map((item, index) => ({
        title: item.headingText,
        body: paragraphRuns(item.blocks).map(plain).join(' '),
        scope: HOW_SCOPES[index],
      }))}
    />
  );
}

/* ── 7 · the people behind the studio ────────────────────────────────────────── */

/**
 * PROFILE CARDS, then the studio's LinkedIn item (owner, 11 Oct 2026). Each leader is a card: a 16:9
 * photograph (every card image is 16:9), the role as the quiet line above the name, the bio, and the
 * LinkedIn link as the card's one action. The heading "Jatin Leuva, Founder & CEO" is split at its
 * first comma into the name and the role. Then the wider studio: the team photograph beside the
 * studio sentence and the link to follow Tcules.
 */
function Leadership({ page }: { page: CorpusPage }) {
  const b = band(page, 'leadership');
  const leaders = items(b).map((item) => {
    const at = item.blocks.findIndex((block) => block.type === 'links');
    const [name = item.headingText, ...role] = item.headingText.split(', ');
    const own = item.blocks.slice(0, at + 1);
    const link = blocksOf({ ...b, blocks: own }, 'links')[0]?.links[0];
    return {
      name,
      role: role.join(', '),
      bio: paragraphRuns(own),
      link,
      after: item.blocks.slice(at + 1),
    };
  });
  const cards: BlockCardSetItem[] = leaders.map((leader) => ({
    id: leader.name,
    eyebrow: leader.role || undefined,
    title: leader.name,
    ...(leader.bio.length > 0
      ? { bodyHtml: leader.bio.map((runs) => inlineToHtml(runs)) }
      : {}),
    media: {
      type: 'image',
      image: { ...placeholderImage(page.route, b.id, slugOf(leader.name)), kind: 'photograph' },
    },
    href: leader.link?.href,
    ctaLabel: leader.link?.labelText,
  }));
  const after = leaders.flatMap((leader) => leader.after);
  const studioLink = blocksOf({ ...b, blocks: after }, 'links')[0]?.links[0];
  const studioText = paragraphRuns(after);
  /* One row from 1024: the two profile cards, then the studio item in the third track with the same
     anatomy (16:9 photograph, then the words, then the link), so the LinkedIn item reads as the set's
     close rather than a second section under it. */
  return (
    <ContentSection {...head(b)} data-band="P">
      <Layout as="ul" columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="stack">
        {/* BlockCard is its own <li>. */}
        {cards.map(({ id, ...card }) => (
          <BlockCard key={id} {...card} tracks={3} cue="cta" linkScope="cta" />
        ))}
        {studioText.length > 0 || studioLink ? (
          <li>
            <Layout rowGap="block">
              <Media image={slotImage(page, b.id)} ratio="16/9" sizes={HEAD_TRACK} />
              <Text paragraphs={studioText} />
              {studioLink ? (
                <Cluster>
                  <Button
                    as="a"
                    href={studioLink.href}
                    {...NEW_TAB}
                    emphasis="link"
                    tone="primary"
                    icon={<Icon name="arrow-right-up" />}
                  >
                    {studioLink.labelText}
                  </Button>
                </Cluster>
              ) : null}
            </Layout>
          </li>
        ) : null}
      </Layout>
    </ContentSection>
  );
}

/* ── 8a · 8b · the work you can inspect ──────────────────────────────────────── */

/**
 * Four cases, each named for what it proves, as linked covers, FEATURED THEN LISTED (home round 2,
 * 10 Oct 2026: four identical items in a row is the shape the owner called boring): the first leads
 * at full width beside its copy and the other three sit under it (BlockCardSet `auto`, ruling C3),
 * the arrangement the case-study index's "Four to start with" already uses. Then the Lab paragraph
 * and the link to every case beside the working wall. The band's bound photograph may not sit beside clickable cards
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
      <ContentSection
        {...head(b)}
        data-band="M"
        footer={
          wall ? <CtaRow actions={[{ label: wall.labelText, href: wall.href }]} /> : undefined
        }
      >
        <BlockCardSet items={cards} lead="auto" cue="title" scroll="never" />
      </ContentSection>
      {labParagraph?.type === 'paragraph' ? (
        <Lab page={page} band={b} runs={labParagraph.runs} />
      ) : null}
    </>
  );
}

/**
 * The Future Interfaces Lab, as a band of its own after the cases (owner, 11 Oct 2026: "the FIL section
 * is just text and image. i think that can be designed really well"). The cases' link to every case
 * moves to the cases band's foot, where it belongs; the Lab is a Banner beside its working-wall
 * photograph, on the tint ground, its name (the sentence's own link words) as the banner's heading and
 * the sentence as the lead, and the Lab's link as the banner's one action (its own link words).
 */
function Lab({
  page,
  band: b,
  runs,
}: {
  page: CorpusPage;
  band: CorpusBand;
  runs: readonly InlineRun[];
}) {
  const link = runs.find((run): run is Extract<InlineRun, { type: 'link' }> => run.type === 'link');
  const name = link ? plain(link.children) : 'Future Interfaces Lab';
  return (
    <Banner
      form="beside"
      mediaSide="end"
      id={`${b.id}-lab`}
      headingId={`${b.id}-lab-heading`}
      heading={name}
      lead={plain(runs)}
      actions={
        link ? <CtaRow rule={false} actions={[{ label: name, href: link.href }]} /> : undefined
      }
      image={{ ...slotImage(page, b.id), kind: 'photograph' }}
      surface="tint"
    />
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

/**
 * The coda: four short lines that close the argument, set as type rather than beside a stand-in
 * photograph. The short declarative lines ("Software is our material.") are large, the one sentence
 * that explains them reads at the lead step between them.
 */
function Constant({ page }: { page: CorpusPage }) {
  const b = band(page, 'what-remains-constant');
  const lines = paragraphRuns(b.blocks).map(plain);
  return (
    <ContentSection {...head(b)} data-band="B" arrangement="beside">
      <Layout rowGap="stack">
        {lines.map((line, index) => (
          <p key={index} className={line.length > 60 ? styles.codaBody : styles.codaLine}>
            {line}
          </p>
        ))}
      </Layout>
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
