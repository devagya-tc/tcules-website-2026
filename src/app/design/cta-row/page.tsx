import { Layout, Section, type SectionSurface } from '@/components';
import { Accordion, ContentSection, ContentSectionText, CtaRow, ListCard } from '@/patterns';
import { ROUTES } from '@/lib/routes';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/* ── Content ─────────────────────────────────────────────────────────────────────────────────
   Ordinary copy at the lengths a band's foot really carries, then the stress ceilings: a label of
   seven words, a note at its 56ch cap and past it, a whitespace-only note. Paths from ROUTES. */

const SEE_WORK = { label: 'See the work', href: ROUTES.caseStudies };
const ALL_SERVICES = { label: 'All services', href: ROUTES.services };
const START = { label: 'Start a project', href: ROUTES.contact };
const HOW = { label: 'How we work', href: ROUTES.howWeWork };

const NOTE = 'Every engagement starts with a thirty-minute call.';
const NOTE_LONG =
  'Every engagement starts with a thirty-minute call about the decision in front of you, not ' +
  'about us, and you leave it with a written note of what we would do first.';
/* The label ceiling: four words (Button's "two to four words, terse and literal"), the longest the
   corpus has. Button labels never wrap (`white-space: nowrap`, by design), so a label is a content
   budget, not a layout case: this one is ~280 wide with its arrow and fits the 326 phone column. A
   longer one is a copy fault the row will not hide. */
const LABEL_LONG = {
  label: 'Read the modernisation assessment',
  href: ROUTES.productModernisationAssessment,
};

const SURFACES: readonly SectionSurface[] = ['paper', 'tint', 'ink', 'blue'];

const ROWS = [
  {
    title: 'Read the real work',
    body: 'Who does what, in which order, under whose authority.',
  },
  { title: 'Settle the product model', body: 'Which records exist and which rules bind them.' },
  { title: 'Design the behaviour', body: 'What the interface does, not what it looks like.' },
];

const FAQ = [
  {
    question: 'Do you work with an in-house design team?',
    answerHtml: '<p>Most of the time, yes. We join the team rather than replace it.</p>',
  },
  {
    question: 'How long is a typical engagement?',
    answerHtml: '<p>Eight to sixteen weeks for a product, longer for a system.</p>',
  },
  {
    question: 'Can we start with an audit?',
    answerHtml: '<p>Yes. Every audit ends in a written plan you can run without us.</p>',
  },
];

/**
 * CtaRow — the proving ground.
 *
 * Section 1 is the variant ladder at the full column, so every row is read against the width it
 * really gets as a band's foot. Section 2 is the stress rows and the narrow tracks (the 381 head
 * track, the 326 phone column). Section 3 is the four surfaces, identical markup. Section 4 puts
 * the row where it lives: a ContentSection's `footer`, start and centred, and its `actions` with the
 * rule off.
 */
export default function CtaRowSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>CtaRow</h1>
          <p className={s.specNote}>
            A band&rsquo;s row of actions: a hairline, 24, then an optional one-line note and
            one or two actions. The first action is a link (the default, every action with the
            arrow cue) or a solid (the band&rsquo;s one Accent, no glyph); the second is always
            a neutral link. A link-led row defaults to tone=&quot;primary&quot; — the
            band&rsquo;s Signal, so its foot points somewhere in blue (amended 6 Oct: the owner
            wants more blue on links and arrows); a solid-led row defaults to neutral, because a
            solid primary spends Accent and the caller spends that on purpose. Placed by a band
            — ContentSection&rsquo;s <code>footer</code>, or with{' '}
            <code>rule=&#123;false&#125;</code> its <code>actions</code>.
          </p>
        </Layout>
      </Section>

      {/* ── 1 ──────────────────────────────────────────────────────────────────────────────── */}
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>1 · The variants, at the full column</h2>
            <p className={s.specNote}>
              Without a note the actions start the row — a lone link at the far end of 1240
              reads stranded. With a note, note at the start and actions at the end. Rule → row
              is block (24); action ↔ action is block (24), as in PageHero.
            </p>
          </Layout>
          <Specimen
            title="link · primary · one action (the default)"
            note="The band's Signal (§ 4.2), label and arrow blue at rest — one kind per band, counted once however many links."
          >
            <CtaRow actions={[SEE_WORK]} />
          </Specimen>
          <Specimen
            title='link · tone="neutral"'
            note="Spends nothing: ink, blue only on hover and focus (Free). For a band that already spends another kind of Signal — G's quote rule, E's diagram line — or has spent its two."
          >
            <CtaRow actions={[SEE_WORK]} tone="neutral" />
          </Specimen>
          <Specimen
            title="link · two actions"
            note="The second is always neutral, whatever the first."
          >
            <CtaRow actions={[ALL_SERVICES, HOW]} />
          </Specimen>
          <Specimen
            title="link · with a note"
            note="Note body-sm at the start, capped at 56ch; actions at the end."
          >
            <CtaRow actions={[SEE_WORK, ALL_SERVICES]} note={NOTE} />
          </Specimen>
          <Specimen
            title="solid · primary + neutral link"
            note="The band's one Accent. No glyph on either — the hero's shape exactly."
          >
            <CtaRow actions={[START, HOW]} emphasis="solid" tone="primary" note={NOTE} />
          </Specimen>
          <Specimen
            title="solid · neutral (the solid default)"
            note="A solid that spends nothing — for a band that has already spent its two. A solid-led row is neutral unless the caller spends its Accent."
          >
            <CtaRow actions={[START]} emphasis="solid" />
          </Specimen>
          <Specimen
            title="rule={false} — a head’s actions"
            note="No hairline: in a head the row sits a stack under the lead, with no body above it to close off."
          >
            <CtaRow actions={[START, HOW]} emphasis="solid" tone="primary" rule={false} />
          </Specimen>
          <Specimen
            title='align="center"'
            note="Note and actions centred, the whole box — rule included — capped at the body measure. Here the specimen does not centre the box; a centred band does (section 4)."
          >
            <CtaRow actions={[SEE_WORK, ALL_SERVICES]} note={NOTE} align="center" />
          </Specimen>
        </Layout>
      </Section>

      {/* ── 2 ──────────────────────────────────────────────────────────────────────────────── */}
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>2 · Stress, and narrow tracks</h2>
            <p className={s.specNote}>
              At the four-word label ceiling the actions wrap between each other at 24, never
              inside a label (Button labels never wrap); a long note wraps at 56ch and pushes
              the actions below it at 24 once the row cannot hold both — the same step as action
              to action, so the wrapped seam is never tighter than the row&rsquo;s own. A
              whitespace-only note renders nothing and the row is the no-note row.
            </p>
          </Layout>
          <Specimen title="a four-word label (the ceiling) and a long note, full column">
            <CtaRow actions={[LABEL_LONG, ALL_SERVICES]} note={NOTE_LONG} />
          </Specimen>
          <Specimen title="whitespace-only note" note="Identical to the row with no note.">
            <CtaRow actions={[SEE_WORK]} note="   " />
          </Specimen>
          <Specimen
            title="the 381 head track — a beside head's actions"
            note="Solid and link wrap onto two lines at 24."
          >
            <div className={s.trackSm}>
              <CtaRow
                actions={[START, LABEL_LONG]}
                emphasis="solid"
                tone="primary"
                rule={false}
              />
            </div>
          </Specimen>
          <Specimen title="the 326 phone column, with a note">
            <div className={s.trackMobile}>
              <CtaRow actions={[SEE_WORK, ALL_SERVICES]} note={NOTE} />
            </div>
          </Specimen>
          <Specimen title="the 326 phone column, centred">
            <div className={s.trackMobile}>
              <CtaRow
                actions={[START, HOW]}
                emphasis="solid"
                tone="primary"
                note={NOTE}
                align="center"
              />
            </div>
          </Specimen>
        </Layout>
      </Section>

      {/* ── 3 ──────────────────────────────────────────────────────────────────────────────── */}
      {SURFACES.map((surface) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="stack">
            <Layout rowGap="block">
              <h2>3 · On {surface}</h2>
              <p className={s.specNote}>
                Surface proof — on pages, tint is the proof band only (§ 1.7), and no band is
                blue (§ 4.3). Identical markup on every ground: the rule and the note restate
                their ink per surface in cta-row.css; the actions are Button&rsquo;s own.
              </p>
            </Layout>
            <Specimen title={`${surface} · link, primary, with a note`}>
              <CtaRow actions={[SEE_WORK, ALL_SERVICES]} note={NOTE} />
            </Specimen>
            <Specimen title={`${surface} · solid primary + neutral link`}>
              <CtaRow actions={[START, HOW]} emphasis="solid" tone="primary" />
            </Specimen>
          </Layout>
        </Section>
      ))}

      {/* ── 4 ──────────────────────────────────────────────────────────────────────────────── */}
      <Section density="tight">
        <Layout rowGap="block">
          <h2>4 · Where it lives</h2>
          <p className={s.specNote}>
            Live ContentSection bands, edge to edge. A footer is the body&rsquo;s last row, a
            stack (48) under the blocks; under a centred head the capped row is centred as a
            block under the accordion it closes. Both bodies here are RULED ladders (ListCard
            rows, the accordion), whose last rule already closes the body, so both feet pass
            rule=&#123;false&#125; — a second hairline 48 under the first reads as a double
            rule. Section 1 shows the rule where it belongs: under a body with no rule of its
            own.
          </p>
        </Layout>
      </Section>
      <ContentSection
        arrangement="beside"
        eyebrow="Footer · beside"
        heading="How the work is sequenced"
        headingId="ctarow-in-beside"
        lead="Three steps, in the order they happen, and a way to read the rest."
        footer={
          <CtaRow
            actions={[HOW]}
            note="The full method, with what each step hands over."
            rule={false}
          />
        }
      >
        <Layout as="ol" rowGap="none">
          {ROWS.map((row, index) => (
            <ListCard
              key={row.title}
              title={row.title}
              body={row.body}
              titleAs="h3"
              marker={{ type: 'number', value: index + 1 }}
            />
          ))}
        </Layout>
      </ContentSection>
      <ContentSection
        align="center"
        eyebrow="Footer · centred"
        heading="Questions we are asked first"
        headingId="ctarow-in-centred"
        footer={
          <CtaRow
            actions={[{ label: 'Ask us directly', href: ROUTES.contact }]}
            align="center"
            rule={false}
          />
        }
      >
        <ContentSectionText>
          <Accordion items={FAQ} />
        </ContentSectionText>
      </ContentSection>
      <ContentSection
        eyebrow="Actions · stacked"
        heading="Start with the decision in front of you"
        headingId="ctarow-in-actions"
        lead="A head's own actions: a CtaRow with the rule off, a stack under the lead."
        actions={<CtaRow actions={[START, HOW]} emphasis="solid" tone="primary" rule={false} />}
      />
    </>
  );
}
