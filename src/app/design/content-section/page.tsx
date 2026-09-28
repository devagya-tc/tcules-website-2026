import type { ReactNode } from 'react';

import { Layout, Prose, Section, type SectionSurface } from '@/components';
import {
  BlockCard,
  ContentSection,
  ListCard,
  Proof,
  type ContentSectionArrangement,
} from '@/patterns';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/* ── Content ─────────────────────────────────────────────────────────────────────────────────
   Realistic copy at the lengths the content actually reaches, plus the stress ceilings the audit
   names (docs/component-audit.md §1, "Heading wrap"): an H2 of ten words, a lead of forty-five,
   and one unbroken token. Every band that is not a stress row uses the ORDINARY copy, so the
   stress rows read as stress by comparison. */

const HEADING = 'The screen is often where a deeper product problem becomes visible.';
const LEAD = 'What the interface may be telling you, before anyone opens a ticket about it.';

/* Ten words, eighty characters, and the longest words the corpus uses in a heading. */
const HEADING_LONG =
  'Modernisation programmes stall when nobody owns the operational product decisions';

/* Forty-five words, one sentence with two internal pauses — the longest lead a section carries. */
const LEAD_LONG =
  'Most modernisation work is scoped as a rebuild of screens, but the decisions that slow a ' +
  'team down live between those screens: who approves a change, which record is authoritative, ' +
  'and what happens when two operators disagree about the same customer at the same time.';

/* No space, no hyphen: the only break opportunity is the one overflow-wrap makes. At 43px in a
   one-third track at 1024 this is roughly twice the track's width. */
const TOKEN_HEADING = 'ProductModernisationAssessmentWorkbench';
const TOKEN_LEAD =
  'https://tcules.com/services/product-design/design-systems/a-single-unbroken-token-that-must-wrap-before-it-can-widen-the-page';

const BODY_HTML =
  '<p>A product decision is only settled once it survives the workflow it lives in. ' +
  'That is what this section argues, at whatever length the argument needs.</p>' +
  '<p>A second paragraph, so the seam inside Prose can be read against the seam between blocks.</p>';

const BODY_SHORT_HTML = '<p>One sentence is the whole of the body here.</p>';

const BODY_LONG_HTML =
  '<p>The first thing we look at is not the interface. It is the sequence of decisions the ' +
  'interface is asking people to make, in the order it asks them, and who is allowed to make ' +
  'each one. Most of the friction a team reports lives in that sequence rather than on any single ' +
  'screen.</p>' +
  '<p>The second is the record. Two teams working from two versions of the same customer will ' +
  'produce two correct answers that disagree, and no amount of visual polish settles which one ' +
  'ships. Settling it is product work, and it has to happen before the screens are drawn.</p>' +
  '<h3>What that changes</h3>' +
  '<p>It changes what gets designed first. The model comes first, then the behaviour, and the ' +
  'surface last — which is the reverse of how most briefs arrive, and the reason most briefs ' +
  'arrive twice.</p>';

const CARDS = [
  { title: 'A confusing action', body: 'The label is fine. The authority behind it is not.' },
  { title: 'A slow workflow', body: 'Every step is fast. The sequence is the wrong sequence.' },
  { title: 'A crowded dashboard', body: 'Nothing here is wrong, and nothing here is decided.' },
];

const STEPS = [
  { title: 'Read the real work', body: 'Who does what, in which order, under whose authority.' },
  { title: 'Settle the product model', body: 'Which records exist and which rules bind them.' },
  { title: 'Design the behaviour', body: 'What the interface does, not what it looks like.' },
];

const SURFACES: readonly SectionSurface[] = ['paper', 'tint', 'ink', 'blue'];
const ARRANGEMENTS: readonly ContentSectionArrangement[] = ['stacked', 'beside'];

/* ── Blocks ──────────────────────────────────────────────────────────────────────────────────
   Real patterns, composed exactly as a route composes them. Each owns its own set; the band only
   owns the 48 beat between blocks. */

function Cards() {
  return (
    <Layout as="ul" columns={{ base: 1, md: 3 }} colGap="gutter" rowGap="gutter" equalRows>
      {CARDS.map((card) => (
        <BlockCard key={card.title} title={card.title} body={card.body} />
      ))}
    </Layout>
  );
}

function Steps() {
  return (
    <Layout as="ol" rowGap="none">
      {STEPS.map((step, index) => (
        <ListCard
          key={step.title}
          title={step.title}
          body={step.body}
          titleAs="h3"
          marker={{ kind: 'number', value: index + 1 }}
        />
      ))}
    </Layout>
  );
}

/**
 * A labelling band between groups of specimens. The specimens on this page are BANDS, so they
 * cannot sit inside a Specimen block without being nested inside another Section's column — which
 * would move their content column and make every measurement on the page wrong. The label is a
 * band of its own instead, tight, so the specimen bands beneath it sit edge to edge exactly as
 * they do on a route.
 */
function Label({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Section density="tight">
      <Layout rowGap="block">
        <h2>{title}</h2>
        <p className={s.specNote}>{children}</p>
      </Layout>
    </Section>
  );
}

/**
 * ContentSection — the proving ground.
 *
 * Every specimen band is a live ContentSection, and therefore a live Section: the bands sit edge
 * to edge exactly as they do on a route, which is the only way to read the 96 + 96 seam between two
 * of them and the only way `beside` can be judged against a real 1240 column.
 *
 * The page is ordered so the one comparison that matters comes first — the same content in both
 * arrangements — and everything after it is coverage: both arrangements on all four surfaces with
 * identical markup, the stress ceilings, a short and a long body beside a head, every absent slot
 * and the two degradations `beside` makes, the densities, nested surfaces, a 390 viewport, and two
 * adjacent bands.
 *
 * `beside` is a breakpoint arrangement (1024 up), so it cannot be forced inside a narrow frame on a
 * wide window. The 390 capture of this page is the proof that every `beside` band collapses to
 * `stacked`; section 8's frame shows the stacked band at 390 for comparison inside a wide window.
 */
export default function ContentSectionSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>ContentSection</h1>
          <p className={s.specNote}>
            One CMS section as one band: an optional eyebrow, heading and lead, then the blocks the
            caller hands it. The gap ladder is the reason it exists — 8 eyebrow to heading, 24
            heading to lead, 48 head group to the blocks and between the blocks. The{' '}
            <code>arrangement</code> prop places that head group above the blocks (
            <code>stacked</code>, the default) or, from 1024 up, in a one-third leading track
            beside them (<code>beside</code>, ruling O2: static, 1 : 2, 64 between the halves).
            Below 1024 the two are identical.
          </p>
        </Layout>
      </Section>

      {/* ── 1 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="1 · The two arrangements, same content">
        Identical props but one. Stacked puts the head group above the body; beside puts it in the
        leading third, top-aligned, and does not stick. Compare the silhouettes: stacked is a heading
        over a paragraph over three cards, the shape a long page repeats; beside is two columns of
        different weight. Resize below 1024 and the second band becomes the first.
      </Label>
      {ARRANGEMENTS.map((arrangement) => (
        <ContentSection
          key={arrangement}
          arrangement={arrangement}
          eyebrow={`arrangement="${arrangement}"`}
          heading={HEADING}
          headingId={`csec-compare-${arrangement}`}
          lead={LEAD}
        >
          <Prose html={BODY_HTML} />
          <Cards />
        </ContentSection>
      ))}

      {/* ── 2 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="2 · Four surfaces × two arrangements, identical markup">
        Eight bands, one markup, the eyebrow naming the cell. Every ink is restated per surface in
        content-section.css: heading, lead and eyebrow each hold their contrast floor on all four
        grounds. The arrangement moves no colour — it is geometry only, so no token changes between
        a stacked band and a beside band on the same ground. Blue follows ink here only because this
        is a matrix; on a route the two are never adjacent.
      </Label>
      {SURFACES.flatMap((surface) =>
        ARRANGEMENTS.map((arrangement) => (
          <ContentSection
            key={`${surface}-${arrangement}`}
            surface={surface}
            arrangement={arrangement}
            eyebrow={`${surface} · ${arrangement}`}
            heading="Every ink is restated per surface"
            headingId={`csec-surface-${surface}-${arrangement}`}
            lead="Heading, lead and eyebrow each hold their contrast floor on all four grounds."
          >
            <Prose html={BODY_HTML} />
            <Steps />
          </ContentSection>
        )),
      )}

      {/* ── 3 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="3 · The longest realistic heading and lead">
        A ten-word H2 of eighty characters and a forty-five-word lead. Stacked, the heading breaks at
        the title measure (22ch) and balances; beside, the one-third track is narrower than that
        measure, so the track sets the line and the heading runs to more lines — the head column is
        allowed to be taller than a short body, and section 5 shows what that looks like.
      </Label>
      {ARRANGEMENTS.map((arrangement) => (
        <ContentSection
          key={arrangement}
          arrangement={arrangement}
          eyebrow={`Long copy · ${arrangement}`}
          heading={HEADING_LONG}
          headingId={`csec-long-${arrangement}`}
          lead={LEAD_LONG}
        >
          <Prose html={BODY_HTML} />
          <Cards />
        </ContentSection>
      ))}

      {/* ── 4 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="4 · One unbroken token">
        A heading and a lead with no break opportunity. The tracks are minmax(0, fr), so neither can
        widen its column, and the base element rule breaks the word rather than the page. The 390
        capture of this page is the check that nothing scrolls sideways.
      </Label>
      {ARRANGEMENTS.map((arrangement) => (
        <ContentSection
          key={arrangement}
          surface="tint"
          arrangement={arrangement}
          eyebrow={`Unbroken · ${arrangement}`}
          heading={TOKEN_HEADING}
          headingId={`csec-token-${arrangement}`}
          lead={TOKEN_LEAD}
        >
          <Prose html={BODY_SHORT_HTML} />
        </ContentSection>
      ))}

      {/* ── 5 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="5 · Beside, with a short and a long body">
        The head is static and top-aligned, so with a one-sentence body the head is the taller
        column and the band ends under the head; with a long body the head sits at the top of a
        column that is mostly air. Neither is corrected — a sticking head is ruling O2&rsquo;s
        rejected option, and stretching the head would put the lead at the band&rsquo;s foot.
      </Label>
      <ContentSection
        arrangement="beside"
        eyebrow="Short body"
        heading={HEADING}
        headingId="csec-beside-short"
        lead={LEAD}
      >
        <Prose html={BODY_SHORT_HTML} />
      </ContentSection>
      <ContentSection
        surface="tint"
        arrangement="beside"
        eyebrow="Long body"
        heading="The model comes before the screens"
        headingId="csec-beside-long"
        lead="Three blocks of different shape in the wide track, the head static beside them."
      >
        <Prose html={BODY_LONG_HTML} />
        <Cards />
        <Steps />
      </ContentSection>

      {/* ── 6 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="6 · Absent slots, and how beside degrades">
        Each head slot renders no element and no seam when absent — an empty string counts as
        absent. Without an eyebrow the heading is the head&rsquo;s first row; without a lead the
        eyebrow and heading are the whole head; a lead alone is a valid head. Beside needs both
        halves: with no head the blocks take the full column, and with no blocks the head does —
        both are the stacked band exactly, because an empty third or an empty two-thirds is a hole.
        An empty children array counts as no blocks, so no 48 seam hangs under the head.
      </Label>
      <ContentSection
        arrangement="beside"
        heading="No eyebrow — heading and lead, beside"
        headingId="csec-absent-eyebrow"
        lead={LEAD}
      >
        <Steps />
      </ContentSection>
      <ContentSection
        surface="tint"
        arrangement="beside"
        eyebrow="No lead"
        heading="Eyebrow and heading only, beside"
        headingId="csec-absent-lead"
      >
        <Prose html={BODY_HTML} />
      </ContentSection>
      <ContentSection
        arrangement="beside"
        heading="Heading only — no eyebrow, no lead"
        headingId="csec-heading-only"
      >
        <Steps />
      </ContentSection>
      <ContentSection
        surface="tint"
        arrangement="beside"
        eyebrow=""
        heading=""
        lead="A lead with no heading: the band is an unlabelled div, and the lead is the whole head."
      >
        <Prose html={BODY_HTML} />
      </ContentSection>
      <ContentSection arrangement="beside">
        <Prose
          html={
            '<p><strong>No head, beside.</strong> The blocks take the full column: nothing is ' +
            'drawn in a leading third, and the band is a div with no accessible name.</p>'
          }
        />
        <Cards />
      </ContentSection>
      <ContentSection
        surface="tint"
        arrangement="beside"
        eyebrow="No blocks, beside"
        heading="A heading with nothing under it takes the full column"
        headingId="csec-absent-children"
        lead="The children prop is omitted. The head renders as the stacked head, measures intact."
      />
      <ContentSection
        arrangement="stacked"
        eyebrow="Empty children array, stacked"
        heading="Zero blocks mapped leaves no seam"
        headingId="csec-empty-array"
        lead="A CMS section whose block list maps to [] renders no body row beneath this lead."
      >
        {[]}
      </ContentSection>

      {/* ── 7 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="7 · Density">
        Vertical air passes straight through to Section. It is independent of arrangement: a tight
        band beside and an open band beside keep the same 64 between their halves.
      </Label>
      <ContentSection
        arrangement="beside"
        heading="One block, tight"
        headingId="csec-density-tight"
        lead="A band holding a paragraph does not want the air a five-card grid wants."
        density="tight"
      >
        <Prose html={BODY_HTML} />
      </ContentSection>
      <ContentSection
        surface="tint"
        arrangement="beside"
        heading="One block, open"
        headingId="csec-density-open"
        lead="The other direction, for a band that carries the page's turn."
        density="open"
      >
        <Prose html={BODY_HTML} />
      </ContentSection>

      {/* ── 8 ──────────────────────────────────────────────────────────────────────────────── */}
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>8 · Nested surfaces, any block, and a 390 viewport</h2>
            <p className={s.specNote}>
              A band inside another band is not a route composition; it is here to prove that
              every ink resolves from the NEAREST surface. The 390 frame is the phone viewport, so
              the band&rsquo;s own gutter produces the 326 column.
            </p>
          </Layout>
          <Specimen
            title="tint nested in ink · beside"
            note="The case that once rendered at 1.13:1. Heading neutral-900, lead neutral-700, eyebrow neutral-700: tint's own block, nothing from ink."
          >
            <Section as="div" surface="ink" density="tight">
              <ContentSection
                surface="tint"
                arrangement="beside"
                eyebrow="Tint in ink"
                heading={HEADING}
                headingId="csec-nested-tint"
                lead={LEAD}
              >
                <Prose html={BODY_HTML} />
              </ContentSection>
            </Section>
          </Specimen>
          <Specimen
            title="ink nested in paper · stacked"
            note="Heading white, lead neutral-300, eyebrow neutral-400 — inverts in full."
          >
            <ContentSection
              surface="ink"
              eyebrow="Ink in paper"
              heading={HEADING}
              headingId="csec-nested-ink"
              lead={LEAD}
            >
              <Prose html={BODY_HTML} />
            </ContentSection>
          </Specimen>
          <Specimen
            title="Proof in the body · blue · beside"
            note="Any block goes in the body slot; the band never enumerates what may. Blue is the pivot ground — one appearance per page, and never adjacent to an ink band."
          >
            <ContentSection
              surface="blue"
              arrangement="beside"
              eyebrow="On blue"
              heading="The pivot ground"
              headingId="csec-proof-blue"
              lead="One appearance per page, and never adjacent to an ink band."
            >
              <Proof
                arrangement="compact"
                quote={{
                  quoteHtml: '<p>The workflow between our teams was seamless.</p>',
                  name: 'A client',
                  role: 'Head of Product',
                  company: 'Tcules',
                }}
              />
            </ContentSection>
          </Specimen>
          <Specimen
            title="390 viewport · stacked · longest copy"
            note="What every beside band on this page becomes below 1024. A frame cannot fire a media query, so inside it the type stays at desktop scale and only Prose goes in the body: a ListCard would render its split row and a card set its three tracks. The 390 capture of the whole page is the real phone check, beside included."
          >
            <div className={s.viewportMobile}>
              <ContentSection
                eyebrow="390 · stacked"
                heading={HEADING_LONG}
                headingId="csec-narrow"
                lead={LEAD_LONG}
              >
                <Prose html={BODY_HTML} />
              </ContentSection>
            </div>
          </Specimen>
        </Layout>
      </Section>

      {/* ── 9 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="9 · Two adjacent bands, same ground">
        Paper after paper, beside then stacked — the arrangement changing between two bands is what
        a long page uses instead of changing the ground. The seam between them is Section&rsquo;s 96
        + 96 and nothing else; neither band adds a margin.
      </Label>
      <ContentSection
        arrangement="beside"
        eyebrow="Adjacent · first"
        heading="How the work is sequenced"
        headingId="csec-adjacent-1"
        lead="Three steps, in the order they happen."
      >
        <Steps />
      </ContentSection>
      <ContentSection
        eyebrow="Adjacent · second"
        heading="What the interface may be telling you"
        headingId="csec-adjacent-2"
        lead={LEAD}
      >
        <Cards />
      </ContentSection>
    </>
  );
}
