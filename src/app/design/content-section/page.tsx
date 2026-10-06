import type { ReactNode } from 'react';

import {
  Layout,
  Media,
  Prose,
  Section,
  type IconName,
  type SectionSurface,
} from '@/components';
import {
  Accordion,
  BlockCard,
  ContentSection,
  ContentSectionText,
  CtaRow,
  DataTable,
  ListCard,
  Proof,
  type DataTableProps,
} from '@/patterns';
import { HEAD_TRACK } from '@/lib/image-sizes';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { ROUTES } from '@/lib/routes';

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
  {
    title: 'Read the real work',
    body: 'Who does what, in which order, under whose authority.',
  },
  { title: 'Settle the product model', body: 'Which records exist and which rules bind them.' },
  { title: 'Design the behaviour', body: 'What the interface does, not what it looks like.' },
];

/* A four-column table: wide enough that a 68ch cap would visibly crush it, which is the failure the
   body measure must NOT reintroduce. It is a sibling of the text, so it keeps the full track. */
const cell = (html: string) => `<p>${html}</p>`;
const TABLE: DataTableProps = {
  caption: 'Where each design-system representation lives',
  keyColumn: { heading: 'Representation' },
  columns: [{ heading: 'Source of truth' }, { heading: 'Owner' }, { heading: 'Drift signal' }],
  rows: [
    {
      header: 'Design tokens',
      cellsHtml: [
        cell('The token layer in the repository'),
        cell('Design engineering'),
        cell('A value in Figma with no token behind it'),
      ],
    },
    {
      header: 'Components',
      cellsHtml: [
        cell('The coded component and its specimen'),
        cell('Product engineering'),
        cell('A variant that exists in one tool only'),
      ],
    },
    {
      header: 'Guidance',
      cellsHtml: [
        cell('The documentation site'),
        cell('Design operations'),
        cell('A rule nobody can find the reason for'),
      ],
    },
  ],
};

const SURFACES: readonly SectionSurface[] = ['paper', 'tint', 'ink', 'blue'];

/* The two arrangements the comparison rows show side by side. Not every arrangement: `split-head`
   and `media` have sections of their own (11 to 14), because what goes in their bodies differs. */
const PAIR = ['stacked', 'beside'] as const;
type Pair = (typeof PAIR)[number];

/* The body each of the pair takes in a comparison row. A card set reads ACROSS, so it never goes in
   a beside body (1 Oct 2026, owner; visual-direction § 1.4 rule 5): beside takes rows. */
const pairBody = (arrangement: Pair) => (arrangement === 'beside' ? <Steps /> : <Cards />);

/* Photographs for the aside, media and pair rows (src/lib/photos.ts). Atmosphere photos: alt="". */
const photo = (id: PhotoId) => getKitPhoto(id);

const ICON_CARDS: readonly { title: string; body: string; icon: IconName }[] = [
  {
    title: 'A product model',
    body: 'The records, their owners and the rules that bind them.',
    icon: 'database',
  },
  {
    title: 'Flows that hold',
    body: 'Every path through the work, including the unhappy ones.',
    icon: 'layers',
  },
  {
    title: 'A component set',
    body: 'Built once in code, documented where the team works.',
    icon: 'widget',
  },
  {
    title: 'A handover plan',
    body: 'What your team runs after us, written down and rehearsed.',
    icon: 'checklist',
  },
];

const TILES = [
  {
    title: 'Workshops, not decks',
    body: 'Decisions get made in the room with the people who own them.',
  },
  {
    title: 'One shared board',
    body: 'Every open question lives in one place the whole team can see.',
  },
  {
    title: 'Weekly working reviews',
    body: 'Real screens against real tasks, every week, from week one.',
  },
  {
    title: 'A written trail',
    body: 'Each decision recorded with the reason, so it is not reopened.',
  },
];

const PAIR_CARDS = [
  {
    title: 'Rebuilding a claims workflow around one record',
    body: 'Two teams, one customer, and the rule that settled which answer ships.',
    image: 'pair-laptop-notebook' as PhotoId,
  },
  {
    title: 'A design system the engineers asked for',
    body: 'Tokens and components the product team adopted without being told to.',
    image: 'whiteboard-pair-laptop' as PhotoId,
  },
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
  {
    question: 'Who owns what we make together?',
    answerHtml: '<p>You do, from the first commit. Nothing is held back as a licence.</p>',
  },
];

const SEE_WORK = { label: 'See the work', href: ROUTES.caseStudies };
const HOW = { label: 'How we work', href: ROUTES.howWeWork };
const START = { label: 'Start a project', href: ROUTES.contact };

/* ── Blocks ──────────────────────────────────────────────────────────────────────────────────
   Real patterns, composed exactly as a route composes them. Each owns its own set; the band only
   owns the 48 beat between blocks. */

function Cards() {
  return (
    <Layout as="ul" columns={{ base: 1, md: 3 }} colGap="gutter" rowGap="column" equalRows>
      {CARDS.map((card) => (
        <BlockCard key={card.title} title={card.title} body={card.body} />
      ))}
    </Layout>
  );
}

/** Four icon cards, two across — the beside body C-icon takes (§ 1.4 rule 5). Icons are ink (§ 4.3). */
function IconCards() {
  return (
    <Layout as="ul" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="column">
      {ICON_CARDS.map((card) => (
        <ListCard
          key={card.title}
          form="tile"
          titleAs="h3"
          title={card.title}
          body={card.body}
          marker={{ type: 'icon', name: card.icon }}
        />
      ))}
    </Layout>
  );
}

/** B tiles: up to four, two across at gutter, rows at column (§ 1.2) — or two with a CtaRow. */
function Tiles({ count = 4 }: { count?: 2 | 4 }) {
  return (
    <Layout as="ul" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="column">
      {TILES.slice(0, count).map((tile) => (
        <ListCard
          key={tile.title}
          form="tile"
          titleAs="h3"
          title={tile.title}
          body={tile.body}
        />
      ))}
    </Layout>
  );
}

/** Two pair cards with photographs — the beside body C-pair takes (§ 1.4 rule 5). */
function PairCards() {
  return (
    <Layout as="ul" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="column">
      {PAIR_CARDS.map((card) => (
        <BlockCard
          key={card.title}
          title={card.title}
          body={card.body}
          href={ROUTES.caseStudies}
          tracks={2}
          media={{ type: 'image', image: photo(card.image) }}
        />
      ))}
    </Layout>
  );
}

/** A head-track aside: a 3:2 photograph at the head track's sizes (§ 1.4, 381 × 254). */
function AsidePhoto({ id }: { id: PhotoId }) {
  return <Media image={photo(id)} ratio="3/2" sizes={HEAD_TRACK} />;
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
          marker={{ type: 'number', value: index + 1 }}
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
 * arrangements — then the body measure (text capped at 68ch, a table and a card grid still spanning
 * the track), and everything after it is coverage: both arrangements on all four surfaces with
 * identical markup, the stress ceilings, a short and a long body beside a head, every absent slot
 * and the two degradations `beside` makes, the densities, nested surfaces, a 390 viewport, and two
 * adjacent bands.
 *
 * `beside` is a breakpoint arrangement (1024 up), so it cannot be forced inside a narrow frame on a
 * wide window. The 390 capture of this page is the proof that every `beside` band collapses to
 * `stacked`; section 9's frame shows the stacked band at 390 for comparison inside a wide window.
 */
export default function ContentSectionSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>ContentSection</h1>
          <p className={s.specNote}>
            One CMS section as one band: an optional eyebrow, heading and lead, the head&rsquo;s
            own actions or aside, then the blocks and a foot. The gap ladder is the reason it
            exists — 24 eyebrow to heading to lead, 48 lead to actions, head to aside, head to
            body, block to block and body to footer, 96 across every split. Four arrangements:{' '}
            <code>stacked</code> (the default), <code>beside</code> (1 : 2 from 1024, the head
            static, an aside or actions in its track), <code>split-head</code> (the H-row: title
            1, lead and actions 2, the body full column beneath) and <code>media</code> (a 4:5
            photograph in 5 of [5, 7] beside the copy, 4:3 above it below 1024). One alignment
            axis: <code>align=&quot;center&quot;</code> centres a stacked head and its body as a
            block. Below 1024 every arrangement is one column in DOM order.
          </p>
        </Layout>
      </Section>

      {/* ── 1 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="1 · The four arrangements, same head">
        One head, four arrangements, each with the body it is for. Stacked puts the head over a
        card set. Beside puts it in the leading third, static, over rows — a set that reads
        across never goes beside (§ 1.4 rule 5). Split-head turns the head into one row under
        its eyebrow, heading left and lead and actions right, with the set full column beneath
        (the H-row). Media sets the copy beside a 4:5 photograph, centred on it because the copy
        does not end in an action. Resize below 1024 and all four are one column.
      </Label>
      {PAIR.map((arrangement) => (
        <ContentSection
          key={arrangement}
          arrangement={arrangement}
          eyebrow={`arrangement="${arrangement}"`}
          heading={HEADING}
          headingId={`csec-compare-${arrangement}`}
          lead={LEAD}
        >
          <ContentSectionText>
            <Prose html={BODY_HTML} />
          </ContentSectionText>
          {pairBody(arrangement)}
        </ContentSection>
      ))}
      <ContentSection
        arrangement="split-head"
        eyebrow='arrangement="split-head"'
        heading="Where products slow down"
        headingId="csec-compare-split-head"
        lead={LEAD}
        actions={<CtaRow actions={[SEE_WORK]} rule={false} />}
      >
        <Cards />
      </ContentSection>
      <ContentSection
        arrangement="media"
        media={{ image: photo('studio-sticky-board-ux') }}
        eyebrow='arrangement="media"'
        heading="How a week with us actually runs"
        headingId="csec-compare-media"
        lead={LEAD}
      >
        <Tiles />
      </ContentSection>

      {/* ── 2 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="2 · Text at the body measure, every other block at the track">
        Prose has no measure — the caller owns the reading column — and this band is the caller.
        A rich-text block wrapped in ContentSectionText stops at 68ch, 666px at 1440, which is
        about 90–95 characters of this face a line (a ch is the width of a zero, wider than the
        average letter). It caps in both arrangements: stacked against the 1240 column, beside
        against the two-thirds track. The table and (stacked) the card grid are siblings of the
        text, not children, so they still run the whole track; beside carries no card set. At
        1024 the beside track is narrower than 68ch and the track wins — the cap is a ceiling,
        never a width.
      </Label>
      {PAIR.map((arrangement) => (
        <ContentSection
          key={arrangement}
          arrangement={arrangement}
          eyebrow={`Measure · ${arrangement}`}
          heading="The model comes before the screens"
          headingId={`csec-measure-${arrangement}`}
          lead={LEAD}
        >
          <ContentSectionText>
            <Prose html={BODY_LONG_HTML} />
          </ContentSectionText>
          <DataTable {...TABLE} />
          {arrangement === 'stacked' ? <Cards /> : null}
        </ContentSection>
      ))}

      {/* ── 3 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="3 · Four surfaces × two arrangements, identical markup">
        Eight bands, one markup, the eyebrow naming the cell. Every ink is restated per surface
        in content-section.css: heading, lead and eyebrow each hold their contrast floor on all
        four grounds. The arrangement moves no colour — it is geometry only, so no token changes
        between a stacked band and a beside band on the same ground. Blue follows ink here only
        because this is a matrix; on a route the two are never adjacent.
      </Label>
      {SURFACES.flatMap((surface) =>
        PAIR.map((arrangement) => (
          <ContentSection
            key={`${surface}-${arrangement}`}
            surface={surface}
            arrangement={arrangement}
            eyebrow={`${surface} · ${arrangement}`}
            heading="Every ink is restated per surface"
            headingId={`csec-surface-${surface}-${arrangement}`}
            lead="Heading, lead and eyebrow each hold their contrast floor on all four grounds."
          >
            <ContentSectionText>
              <Prose html={BODY_HTML} />
            </ContentSectionText>
            <Steps />
          </ContentSection>
        )),
      )}

      {/* ── 4 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="4 · The longest realistic heading and lead">
        A ten-word H2 of eighty characters and a forty-five-word lead. Stacked, the heading
        breaks at the title measure (22ch) and balances; beside, the one-third track is narrower
        than that measure, so the track sets the line and the heading runs to more lines — the
        head column is allowed to be taller than a short body, and section 6 shows what that
        looks like.
      </Label>
      {PAIR.map((arrangement) => (
        <ContentSection
          key={arrangement}
          arrangement={arrangement}
          eyebrow={`Long copy · ${arrangement}`}
          heading={HEADING_LONG}
          headingId={`csec-long-${arrangement}`}
          lead={LEAD_LONG}
        >
          <ContentSectionText>
            <Prose html={BODY_HTML} />
          </ContentSectionText>
          {pairBody(arrangement)}
        </ContentSection>
      ))}

      {/* ── 5 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="5 · One unbroken token">
        A heading and a lead with no break opportunity. The tracks are minmax(0, fr), so neither
        can widen its column, and the base element rule breaks the word rather than the page.
        The 390 capture of this page is the check that nothing scrolls sideways.
      </Label>
      {PAIR.map((arrangement) => (
        <ContentSection
          key={arrangement}
          surface="tint"
          arrangement={arrangement}
          eyebrow={`Unbroken · ${arrangement}`}
          heading={TOKEN_HEADING}
          headingId={`csec-token-${arrangement}`}
          lead={TOKEN_LEAD}
        >
          <ContentSectionText>
            <Prose html={BODY_SHORT_HTML} />
          </ContentSectionText>
        </ContentSection>
      ))}

      {/* ── 6 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="6 · Beside, with a short and a long body">
        The head is static and top-aligned, so with a one-sentence body the head is the taller
        column and the band ends under the head; with a long body the head sits at the top of a
        column that is mostly air. Neither is corrected — a sticking head is ruling O2&rsquo;s
        rejected option, and stretching the head would put the lead at the band&rsquo;s foot.
        The long body mixes prose, icon cards two across and rows — what a beside body may hold
        (§ 1.4 rule 5); never a three-up set.
      </Label>
      <ContentSection
        arrangement="beside"
        eyebrow="Short body"
        heading={HEADING}
        headingId="csec-beside-short"
        lead={LEAD}
      >
        <ContentSectionText>
          <Prose html={BODY_SHORT_HTML} />
        </ContentSectionText>
      </ContentSection>
      <ContentSection
        surface="tint"
        arrangement="beside"
        eyebrow="Long body"
        heading="The model comes before the screens"
        headingId="csec-beside-long"
        lead="Three blocks of different shape in the wide track, the head static beside them."
      >
        <ContentSectionText>
          <Prose html={BODY_LONG_HTML} />
        </ContentSectionText>
        <IconCards />
        <Steps />
      </ContentSection>

      {/* ── 7 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="7 · Absent slots, and how beside degrades">
        Each head slot renders no element and no seam when absent — an empty string counts as
        absent. Without an eyebrow the heading is the head&rsquo;s first row; without a lead the
        eyebrow and heading are the whole head; a lead alone is a valid head. Beside needs both
        halves: with no head the blocks take the full column, and with no blocks the head does —
        both are the stacked band exactly, because an empty third or an empty two-thirds is a
        hole. An empty children array counts as no blocks, so no 48 seam hangs under the head.
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
        <ContentSectionText>
          <Prose html={BODY_HTML} />
        </ContentSectionText>
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
        <ContentSectionText>
          <Prose html={BODY_HTML} />
        </ContentSectionText>
      </ContentSection>
      <ContentSection arrangement="beside">
        <ContentSectionText>
          <Prose
            html={
              '<p><strong>No head, beside.</strong> The blocks take the full column: nothing is ' +
              'drawn in a leading third, and the band is a div with no accessible name.</p>'
            }
          />
        </ContentSectionText>
        <Steps />
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

      {/* ── 8 ──────────────────────────────────────────────────────────────────────────────── */}
      <Label title="8 · Density">
        Vertical air passes straight through to Section. It is independent of arrangement: a
        tight band beside and an open band beside keep the same 96 between their halves.
      </Label>
      <ContentSection
        arrangement="beside"
        heading="One block, tight"
        headingId="csec-density-tight"
        lead="A band holding a paragraph does not want the air a five-card grid wants."
        density="tight"
      >
        <ContentSectionText>
          <Prose html={BODY_HTML} />
        </ContentSectionText>
      </ContentSection>
      <ContentSection
        surface="tint"
        arrangement="beside"
        heading="One block, open"
        headingId="csec-density-open"
        lead="The other direction, for a band that carries the page's turn."
        density="open"
      >
        <ContentSectionText>
          <Prose html={BODY_HTML} />
        </ContentSectionText>
      </ContentSection>

      {/* ── 9 ──────────────────────────────────────────────────────────────────────────────── */}
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>9 · Nested surfaces, any block, and a 390 viewport</h2>
            <p className={s.specNote}>
              A band inside another band is not a route composition; it is here to prove that
              every ink resolves from the NEAREST surface. The 390 frame is the phone viewport,
              so the band&rsquo;s own gutter produces the 326 column.
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
                <ContentSectionText>
                  <Prose html={BODY_HTML} />
                </ContentSectionText>
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
              <ContentSectionText>
                <Prose html={BODY_HTML} />
              </ContentSectionText>
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
                <ContentSectionText>
                  <Prose html={BODY_HTML} />
                </ContentSectionText>
              </ContentSection>
            </div>
          </Specimen>
        </Layout>
      </Section>

      {/* ── 10 ─────────────────────────────────────────────────────────────────────────────── */}
      <Label title="10 · Two adjacent bands, same ground">
        Paper after paper, beside then stacked — the arrangement changing between two bands is
        what a long page uses instead of changing the ground. The seam between them is
        Section&rsquo;s 96 + 96 and nothing else; neither band adds a margin.
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

      {/* ── 11 ─────────────────────────────────────────────────────────────────────────────── */}
      <Label title='11 · align="center"'>
        Eyebrow, heading and lead centred, each on its own measure (title 32ch, lead 56ch), and
        the body centred as a block beneath. Under a ruled ladder (the accordion) the foot
        passes rule=&#123;false&#125;: the ladder&rsquo;s last rule already closes the body, and
        a second hairline 48 under it reads as a double rule. Otherwise: a card set still spans
        the column, a capped block (the accordion in ContentSectionText, a centred CtaRow) sits
        in the middle at its cap, and text inside every block stays start-aligned. Always
        stacked; actions never sit in a centred head (the type refuses them) — a centred
        band&rsquo;s ask is its footer.
      </Label>
      <ContentSection
        align="center"
        eyebrow="Centred · a set"
        heading="Three places products slow down"
        headingId="csec-centre-set"
        lead="Each looks like an interface problem, and none of them starts on a screen."
      >
        <Cards />
      </ContentSection>
      <ContentSection
        align="center"
        eyebrow="Centred · D-faq"
        heading="Questions we are asked first"
        headingId="csec-centre-faq"
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
        align="center"
        eyebrow="Centred · longest copy"
        heading={HEADING_LONG}
        headingId="csec-centre-long"
        lead={LEAD_LONG}
      >
        <ContentSectionText>
          <Prose html={BODY_HTML} />
        </ContentSectionText>
      </ContentSection>
      <ContentSection
        align="center"
        surface="tint"
        eyebrow="Centred · tint"
        heading="Surface proof"
        headingId="csec-centre-tint"
        lead="Surface proof — on pages, tint is the proof band only (§ 1.7)."
        footer={
          <CtaRow
            actions={[SEE_WORK]}
            tone="primary"
            align="center"
            note="The rule and the note restate their ink per surface."
          />
        }
      >
        <ContentSectionText>
          <Prose html={BODY_HTML} />
        </ContentSectionText>
      </ContentSection>

      {/* ── 12 ─────────────────────────────────────────────────────────────────────────────── */}
      <Label title="12 · beside, with an aside or actions in the head track">
        The head track takes one large object a stack under the head text — a 3:2 photograph (or
        one stat figure) — or the head&rsquo;s actions, never both (§ 1.4 rule 6; the type
        refuses the pair). The lead steps to body-lg in a split head track. Below 1024 the aside
        sits between the head and the body. The body is a reads-down body, icon cards two
        across, or two pair cards; a footer CtaRow closes the body track. Tint rows are surface
        proof — on pages, tint is the proof band only (§ 1.7).
      </Label>
      <ContentSection
        arrangement="beside"
        eyebrow="Aside · C-icon-4"
        heading="What you receive"
        headingId="csec-aside-icons"
        lead="Four things your team keeps, each one built to be run without us."
        aside={<AsidePhoto id="hand-sketch-wireframe" />}
        footer={<CtaRow actions={[HOW]} />}
      >
        <IconCards />
      </ContentSection>
      <ContentSection
        arrangement="beside"
        eyebrow="Aside · D"
        heading="How the work is sequenced"
        headingId="csec-aside-rows"
        lead="Three steps, in the order they happen, each with what it hands over."
        aside={<AsidePhoto id="moodboard-wall-desk" />}
      >
        <Steps />
      </ContentSection>
      <ContentSection
        arrangement="beside"
        eyebrow="Actions · C-pair"
        heading="Two pieces of work that argue the same point"
        headingId="csec-beside-actions"
        lead="A rebuilt workflow and a design system, both settled at the model before a screen was drawn."
        actions={
          <CtaRow actions={[START, SEE_WORK]} emphasis="solid" tone="primary" rule={false} />
        }
      >
        <PairCards />
      </ContentSection>
      <ContentSection
        arrangement="beside"
        surface="tint"
        eyebrow="Aside · longest copy"
        heading={HEADING_LONG}
        headingId="csec-aside-long"
        lead={LEAD_LONG}
        aside={<AsidePhoto id="studio-session-talk" />}
      >
        <Steps />
      </ContentSection>

      {/* ── 13 ─────────────────────────────────────────────────────────────────────────────── */}
      <Label title='13 · arrangement="split-head" (the H-row)'>
        The head becomes one row from 1024 under its eyebrow: the heading in the leading third,
        lead and actions in the trailing two-thirds, 96 apart, top edges level. The body runs
        the full column under it, which is what a three-up set wants. Below 1024 it is the
        stacked head exactly (eyebrow → heading → lead 24, lead → actions 48). With only a title
        there is nothing for the trailing track, and the head is stacked. Tint rows are surface
        proof — on pages, tint is the proof band only (§ 1.7).
      </Label>
      <ContentSection
        arrangement="split-head"
        eyebrow="H-row · with an action"
        heading="What we do"
        headingId="csec-split-action"
        lead="Product design, design systems and the engineering that ships them, as one team."
        actions={
          <CtaRow
            actions={[{ label: 'All services', href: ROUTES.services }]}
            tone="primary"
            rule={false}
          />
        }
      >
        <Cards />
      </ContentSection>
      <ContentSection
        arrangement="split-head"
        surface="tint"
        eyebrow="H-row · lead only, and a footer"
        heading="Three places products slow down"
        headingId="csec-split-lead"
        lead={LEAD}
        footer={
          <CtaRow
            actions={[SEE_WORK]}
            note="Each one is a case study you can read in five minutes."
          />
        }
      >
        <Cards />
      </ContentSection>
      <ContentSection
        arrangement="split-head"
        eyebrow="H-row · longest copy"
        heading={HEADING_LONG}
        headingId="csec-split-long"
        lead={LEAD_LONG}
        actions={<CtaRow actions={[START, HOW]} emphasis="solid" tone="primary" rule={false} />}
      >
        <Cards />
      </ContentSection>
      <ContentSection
        arrangement="split-head"
        eyebrow="H-row · title only — degrades to stacked"
        heading="Nothing for the trailing track"
        headingId="csec-split-degrade"
      >
        <Cards />
      </ContentSection>

      {/* ── 14 ─────────────────────────────────────────────────────────────────────────────── */}
      <Label title='14 · arrangement="media" (the B split)'>
        A 4:5 photograph in 5 of [5, 7], radius 8, the copy in 7, 96 apart. When the copy ends
        in an action — a footer, or head actions with nothing after them — the copy column
        stretches to the photo and pins the action to its bottom edge, so the two share a top
        and a bottom edge (§ 3.2 rule 1). Otherwise the copy is centred on the photo (rule 2).
        media.side flips the photo to the end. Below 1024 the photo sits above the copy at 4:3.
        Tint rows are surface proof — on pages, tint is the proof band only (§ 1.7).
      </Label>
      <ContentSection
        arrangement="media"
        media={{ image: photo('studio-sticky-board-ux') }}
        eyebrow="Photo start · 4 tiles · centred"
        heading="How a week with us actually runs"
        headingId="csec-media-tiles"
        lead="Working sessions, one shared board and a written trail, from the first week."
      >
        <Tiles />
      </ContentSection>
      <ContentSection
        arrangement="media"
        media={{ image: photo('designer-desk-monitor'), side: 'end' }}
        eyebrow="Photo end · 2 tiles + CtaRow · pinned"
        heading="The team you work with is the team that ships"
        headingId="csec-media-ctarow"
        lead="No hand-off between a pitch team and a delivery team. The people in the room build it."
        footer={<CtaRow actions={[HOW]} tone="primary" />}
      >
        <Tiles count={2} />
      </ContentSection>
      <ContentSection
        arrangement="media"
        media={{ image: photo('stylus-tablet-sketch') }}
        eyebrow="Lead only + CtaRow"
        heading="Drawn first, then built properly"
        headingId="csec-media-lead"
        lead="Every interface starts as a sketch on paper, because a sketch is cheap to throw away and a coded screen is not."
        footer={
          <CtaRow
            actions={[SEE_WORK]}
            note="Twelve case studies, each with its first sketch."
          />
        }
      />
      <ContentSection
        arrangement="media"
        media={{ image: photo('whiteboard-two-hands'), side: 'end' }}
        eyebrow="Head actions, no blocks · pinned"
        heading="Start with the decision in front of you"
        headingId="csec-media-actions"
        lead="A thirty-minute call about the decision you are facing, and a written note of what we would do first."
        actions={<CtaRow actions={[START, HOW]} emphasis="solid" tone="primary" rule={false} />}
      />
      <ContentSection
        arrangement="media"
        media={{ image: photo('studio-sticky-board-ux') }}
        surface="tint"
        eyebrow="Longest copy · taller than the photo"
        heading={HEADING_LONG}
        headingId="csec-media-long"
        lead={LEAD_LONG}
        footer={<CtaRow actions={[SEE_WORK]} />}
      >
        <Tiles />
      </ContentSection>

      {/* ── 15 ─────────────────────────────────────────────────────────────────────────────── */}
      <Label title="15 · Footer in every arrangement, and footer alone">
        The footer is the body&rsquo;s last row, a stack under the blocks, in every arrangement
        (sections 11 to 14 show it centred, beside, split-head and media). Stacked here, and
        beside with a footer and no blocks: the footer is then the whole body track, so the band
        still splits rather than leaving the head alone.
      </Label>
      <ContentSection
        eyebrow="Footer · stacked"
        heading="Three places products slow down"
        headingId="csec-footer-stacked"
        lead={LEAD}
        footer={
          <CtaRow
            actions={[SEE_WORK, HOW]}
            note="Each one is a case study you can read in five minutes."
          />
        }
      >
        <Cards />
      </ContentSection>
      <ContentSection
        arrangement="beside"
        surface="tint"
        eyebrow="Footer only · beside"
        heading="Not sure which of these fits?"
        headingId="csec-footer-only"
        lead="Tell us the decision you are facing and we will say which, in writing."
        footer={
          <CtaRow
            actions={[START]}
            emphasis="solid"
            tone="primary"
            note="Every engagement starts with a thirty-minute call."
          />
        }
      />
    </>
  );
}
