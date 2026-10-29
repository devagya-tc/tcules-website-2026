import type { ReactNode } from 'react';

import { Layout, Section, type IconName } from '@/components';
import type { CorpusBand, CorpusBlock, CorpusPage } from '@/lib/corpus-types';
import { inlineToHtml, type InlineRun } from '@/lib/inline';
import {
  Callout,
  ContentSection,
  ContentSectionText,
  ReadDown,
  Steps,
  type HeroStat,
  type ReadDownRow,
  type Step,
} from '@/patterns';

import { CorpusHero, headingIdOf, head } from './blocks';
import { BandBody } from './CopyBands';
import { recordStats } from './HomePage';
import { UnitView, type OfferContext } from './OfferBands';
import { planOffer, type TEMPLATE_BANDS } from './plan';
import { boldLead, hasLink, labelTitle, leadOf, plain, trimStart } from './text';

export type ContactPageProps = Omit<OfferContext, 'page'> & { page: CorpusPage };

type ContactBand = (typeof TEMPLATE_BANDS)['/contact'][number];

const content = (band: CorpusBand) => band.blocks.filter((block) => block.type !== 'comment');

/** A bold-only paragraph ("**Founded 2017 · More than 90 projects · …**"): the studio's record line. */
const recordLineOf = (block: CorpusBlock): InlineRun[] | null => {
  const lead = leadOf(block);
  return lead && lead.body.length === 0 && plain(lead.label).includes(' · ')
    ? [...lead.label]
    : null;
};

/** The record line the copy ends `next-steps` on, as the hero's figures (component-map Q10 default). */
function contactStats(page: CorpusPage, steps: CorpusBand | undefined): HeroStat[] {
  const line = steps ? content(steps).map(recordLineOf).find(Boolean) : null;
  if (!line) return [];
  return recordStats({ ...page, hero: { ...page.hero, proofLines: [line] } });
}

const rowBody = (runs: readonly InlineRun[]) =>
  hasLink(runs) || runs.some((run) => run.type !== 'text')
    ? { bodyHtml: [inlineToHtml(runs)] }
    : { body: plain(runs) };

/** A body that follows a "Label:" opens on a capital, as a sheet item's does (CopyBands `sheetItem`). */
function capitalised(runs: InlineRun[]): InlineRun[] {
  const [first, ...rest] = runs;
  return first?.type === 'text'
    ? [{ type: 'text', text: first.text.charAt(0).toUpperCase() + first.text.slice(1) }, ...rest]
    : runs;
}

/* What to put in a first message, each with the glyph of what it is about: the product, the
   situation (what is seen), the milestone ahead, the people. */
const BRIEF_GLYPHS = [
  'widget',
  'eye',
  'flag',
  'users-group-rounded',
] as const satisfies readonly IconName[];

/** One half of the peer band: its own h2 over its body, the half's id the band's anchor. */
function Half({ band, children }: { band: CorpusBand; children: ReactNode }) {
  return (
    <section id={band.id} aria-labelledby={headingIdOf(band)}>
      <Layout rowGap="block">
        <h2 id={headingIdOf(band)}>{band.headingText}</h2>
        {children}
      </Layout>
    </section>
  );
}

/** What to include: the four parts of a first message as a read-down, then the line under them. */
function BriefHalf({ band }: { band: CorpusBand }) {
  const blocks = content(band);
  const list = blocks.find(
    (block): block is Extract<CorpusBlock, { type: 'list' }> => block.type === 'list',
  );
  const rows: ReadDownRow[] = (list?.items ?? []).map((runs, index) => {
    const lead = boldLead(runs);
    const body = lead ? capitalised(trimStart(lead.body)) : [];
    return {
      title: lead ? labelTitle(lead.label) : plain(runs),
      ...(body.length > 0 ? rowBody(body) : {}),
      ...(BRIEF_GLYPHS[index] ? { icon: BRIEF_GLYPHS[index] } : {}),
    };
  });
  const rest = blocks.filter((block) => block !== list);
  return (
    <Half band={band}>
      <Layout rowGap="stack">
        {rows.length > 0 ? <ReadDown rows={rows} columns={2} /> : null}
        {rest.length > 0 ? <BandBody blocks={rest} labelledBy={headingIdOf(band)} /> : null}
      </Layout>
    </Half>
  );
}

/** What happens next: the numbered claims as Steps (Steps numbers them, so the copy's "1." goes). */
function NextStepsHalf({ band }: { band: CorpusBand }) {
  const blocks = content(band).filter((block) => !recordLineOf(block));
  const steps: Step[] = [];
  const rest: CorpusBlock[] = [];
  for (const block of blocks) {
    const lead = leadOf(block);
    if (lead) {
      const body = trimStart(lead.body);
      steps.push({
        title: labelTitle(lead.label).replace(/^\d+\.\s*/, ''),
        ...(body.length > 0 ? rowBody(body) : {}),
      });
    } else rest.push(block);
  }
  return (
    <Half band={band}>
      <Layout rowGap="stack">
        {steps.length > 0 ? <Steps steps={steps} /> : null}
        {rest.length > 0 ? <BandBody blocks={rest} labelledBy={headingIdOf(band)} /> : null}
      </Layout>
    </Half>
  );
}

/**
 * `brief` and `next-steps` as ONE band of two PEER halves (component-map § E /contact, Q18 default,
 * 29 Oct 2026): what to send and what happens after are the two halves of one job, so they share a
 * row at the peer gap (`column`), each with its own h2, in the authored order, start to end. Stacked,
 * they were two text bands in a row directly under the island. Below 1024 the halves stack.
 */
function BriefAndNextSteps({ brief, next }: { brief?: CorpusBand; next?: CorpusBand }) {
  return (
    <Section as="div" data-band="C-peers">
      <Layout columns={{ base: 1, lg: 2 }} colGap="column" rowGap="section">
        {brief ? <BriefHalf band={brief} /> : null}
        {next ? <NextStepsHalf band={next} /> : null}
      </Layout>
    </Section>
  );
}

/**
 * Keep the first message high-level: a boundary on the form, under its own heading, the head in the
 * leading third and the note beside it, so the short band does not repeat the centred questions under
 * it or the wall above it.
 */
function Confidentiality({ band }: { band: CorpusBand }) {
  const html = content(band)
    .map((block) => (block.type === 'paragraph' ? `<p>${inlineToHtml(block.runs)}</p>` : ''))
    .join('');
  return (
    <ContentSection {...head(band)} data-band="C-note" arrangement="beside">
      <ContentSectionText>
        <Callout html={html} />
      </ContentSectionText>
    </ContentSection>
  );
}

/**
 * TIER 3 — the contact page from the `_pages/` copy (component-map § E /contact, 29 Oct 2026). The
 * hero with the studio's record as figures (the line `next-steps` ends on, Q10), the enquiry island,
 * then the brief and the next steps as peer halves, the client wall on tint, the confidentiality note
 * and the questions. Every other band renders as the plan names it.
 */
export function ContactPage({ page, ...rest }: ContactPageProps) {
  const units = planOffer(page);
  const ctx: OfferContext = { page, ...rest };
  const bandOf = (id: ContactBand) => page.bands.find((b) => b.id === id);
  const next = bandOf('next-steps');
  return (
    <>
      <CorpusHero page={page} stats={contactStats(page, next)} />
      {units.map((unit) => {
        if (unit.part === 'b') return <UnitView key={unit.id} unit={unit} ctx={ctx} />;
        switch (unit.band.id as ContactBand | string) {
          case 'brief':
            return <BriefAndNextSteps key={unit.id} brief={unit.band} next={next} />;
          case 'next-steps':
            /* Drawn as the brief's peer half; alone only if the copy drops the brief. */
            return bandOf('brief') ? null : (
              <BriefAndNextSteps key={unit.id} next={unit.band} />
            );
          case 'confidentiality':
            return <Confidentiality key={unit.id} band={unit.band} />;
          default:
            return <UnitView key={unit.id} unit={unit} ctx={ctx} />;
        }
      })}
    </>
  );
}
