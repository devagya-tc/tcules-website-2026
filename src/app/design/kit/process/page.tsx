import { Layout, Media, Section, Stat, Texture, TextureShape } from '@/components';
import {
  Callout,
  ContentSection,
  CtaRow,
  ListCard,
  ProcessFlow,
  Thread,
  type ThreadStage,
} from '@/patterns';
import { HEAD_TRACK } from '@/lib/image-sizes';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { ROUTES } from '@/lib/routes';

import { Specimen } from '../../_specimen/Specimen';
import t from '../../_specimen/typeroles.module.css';

/**
 * Kit family `cmp-process-stats` — F process and S stats, and the two units promoted for them:
 * Stat (src/components/Stat) and Thread (src/patterns/Thread). visual-direction § 3.4 F and S,
 * § 1.4 for the arithmetic, § 3.6 for the approved Steps.
 *
 * Laid out as the family's showcase page: an intro band, then every variation as a titled band at
 * full width, exactly as a page would place it. Each caption strip is flush scaffolding; the band
 * under it is the real thing. Showcase copy is free and in Tcules' voice (§ 8.4). Every numeral on
 * this page is ILLUSTRATIVE, and no band here carries a client mark (§ 5.8).
 *
 * Warm-family page (§ 5.5): every photograph is warm or neutral, and none is vivid.
 */

const photo = (id: PhotoId) => getKitPhoto(id);

function AsidePhoto({ id }: { id: PhotoId }) {
  return <Media image={photo(id)} ratio="3/2" sizes={HEAD_TRACK} />;
}

/** A caption strip above a band: the variation's name and what to look for. Scaffolding. */
function Variation({ id, title, note }: { id: string; title: string; note: string }) {
  return (
    <Section flush id={id}>
      <Specimen title={title} note={note}>
        {null}
      </Specimen>
    </Section>
  );
}

/* ── Steps: the approved F body (§ 3.6) ─────────────────────────────────────────────────────
   Numbered ListCard rows in an <ol>, read top to bottom. Four rows or more take `sm` (h5 over
   body, § 7.2); three keep `md`. */
type Step = { title: string; body: string };

function Steps({ steps }: { steps: readonly Step[] }) {
  const size = steps.length >= 4 ? 'sm' : 'md';
  return (
    <Layout as="ol" rowGap="none">
      {steps.map((step, index) => (
        <ListCard
          key={step.title}
          size={size}
          titleAs="h3"
          title={step.title}
          body={step.body}
          marker={{ type: 'number', value: index + 1 }}
        />
      ))}
    </Layout>
  );
}

const FOUR_STEPS: readonly Step[] = [
  {
    title: 'Frame the decision',
    body: 'We agree what the product must decide, who owns it, and what evidence would settle it.',
  },
  {
    title: 'Probe the risk',
    body: 'Coded probes and user sessions test the riskiest assumption before anything is specified.',
  },
  {
    title: 'Specify and build',
    body: 'Design and engineering build from one record of states, rules and contracts.',
  },
  {
    title: 'Ship and observe',
    body: 'Release against a measure agreed up front, and carry what we learn forward.',
  },
];

const FIVE_STEPS: readonly Step[] = [
  { title: 'Map', body: 'The problem, the people and the one question to answer.' },
  { title: 'Sketch', body: 'Competing answers, each drawn by a different hand.' },
  { title: 'Decide', body: 'One direction, chosen against the question we framed.' },
  { title: 'Prototype', body: 'A realistic surface, built in a single working day.' },
  { title: 'Test', body: 'Five people use it; we watch where it breaks.' },
];

const THREE_STEPS: readonly Step[] = [
  {
    title: 'Trace the record',
    body: 'Follow one order from intake to invoice, marking every screen where its status changes.',
  },
  {
    title: 'Name the owner',
    body: 'For each change of status, find the team that decides it, and the ones that only see it.',
  },
  {
    title: 'Redraw the seam',
    body: 'Design the one screen where the decision actually happens, and retire the copies of it.',
  },
];

/* ── Stats: illustrative numerals (§ 5.8, § 8.4) ──────────────────────────────────────────── */
const FOUR_STATS = [
  { value: '38', unit: 'products', label: 'Shipped with product teams in fintech, health and logistics.' },
  { value: '6–8', unit: 'weeks', label: 'From the first question to a tested, reviewable prototype.' },
  { value: '92%', label: 'Of engagements extended past their first agreed phase.' },
  { value: '1', unit: 'record', label: 'Every decision, state and contract, kept where both teams read it.' },
] as const;

const THREE_STATS = [
  { value: '40%', label: 'Fewer support tickets in the first quarter after the redesign shipped.' },
  { value: '3×', label: 'Faster from approved design to running, reviewed code.' },
  { value: '11', unit: 'days', label: 'Median time to the first change a customer could see.' },
] as const;

/* ── Thread: one decision across its representations ──────────────────────────────────────── */
const THREAD: readonly ThreadStage[] = [
  { title: 'Open question', body: 'What the product must decide.' },
  { title: 'Coded probe', body: 'The cheapest version that could answer it.' },
  { title: 'Contract', body: 'States, rules and data the build owes.' },
  { title: 'Running behaviour', body: 'Shipped behind a measure.' },
  { title: 'Review finding', body: 'What production showed us.' },
  { title: 'Accepted decision', body: 'Recorded, and cited by the next.' },
];

export default function KitProcessPage() {
  return (
    <main>
      {/* ── Intro ──────────────────────────────────────────────────────────────────────── */}
      <Section density="open">
        <Texture>
          <TextureShape kind="ellipse" top={-220} right={-160} width="40%" height={420} blur={200} />
        </Texture>
        <Layout columns={{ lg: [1, 1] }} colGap="section" rowGap="stack" align="end">
          <Layout rowGap="block">
            <p className={t.eyebrow}>UI kit · family F and S</p>
            <h1>Process and stats</h1>
            <p className={t.lead}>
              How the work runs, read top to bottom, and the few numbers that say what it returned.
              Steps for a method, a thread for a chain of artefacts, a flow for stages with contents,
              and a stat that keeps its numeral in ink.
            </p>
          </Layout>
          <Layout as="ul" columns={{ md: 2 }} colGap="gutter" rowGap="tight" className={t.uiLg}>
            <li><a href="#f-four">F · four steps, photo aside</a></li>
            <li><a href="#f-five">F · five one-line steps</a></li>
            <li><a href="#f-example">F · worked example above</a></li>
            <li><a href="#f-cta">F · with a CtaRow</a></li>
            <li><a href="#s-four">S · four stats, centred</a></li>
            <li><a href="#s-three">S · three stats and a CtaRow</a></li>
            <li><a href="#d-stat">D · a stat in the head track</a></li>
            <li><a href="#stat-sizes">Stat · two sizes</a></li>
            <li><a href="#e-thread">E · a thread, full column</a></li>
            <li><a href="#flow">ProcessFlow · a flow, not a method</a></li>
          </Layout>
        </Layout>
      </Section>

      {/* ── F · four steps ─────────────────────────────────────────────────────────────── */}
      <Variation
        id="f-four"
        title="F · four steps, two-line bodies, photo aside"
        note="The approved Steps (§ 3.6): numbered ListCard rows in the body track of a beside head, a 3:2 photograph in the head track. Head track 542, body 4 × 116 = 464. Steps carry blue numerals; the words stay ink."
      />
      <ContentSection
        arrangement="beside"
        eyebrow="How an engagement runs"
        heading="From one question to a shipped decision"
        headingId="kit-f-four"
        lead="Four stages, each ending in something you can review, so nothing moves on until it is agreed."
        aside={<AsidePhoto id="moodboard-wall-desk" />}
      >
        <Steps steps={FOUR_STEPS} />
      </ContentSection>

      {/* ── F · five steps ─────────────────────────────────────────────────────────────── */}
      <Variation
        id="f-five"
        title="F · five steps, one-line bodies"
        note="Five rows take one-line bodies (≤ 9 words, § 1.5): 5 × 90 = 450 beside the 542 head track."
      />
      <ContentSection
        arrangement="beside"
        eyebrow="Design sprint"
        heading="Five days, one tested answer"
        headingId="kit-f-five"
        lead="A sprint compresses months of debate into a week, and ends with real people using the result."
        aside={<AsidePhoto id="studio-whiteboard-crit" />}
      >
        <Steps steps={FIVE_STEPS} />
      </ContentSection>

      {/* ── F · worked example ─────────────────────────────────────────────────────────── */}
      <Variation
        id="f-example"
        title="F · three steps, worked example above"
        note="The Callout sets the scene the steps are walked through, a stack above them (§ 3.3: F's example goes above the rows). With it, three rows at most: ≈ 158 + 48 + 3 × 116."
      />
      <ContentSection
        arrangement="beside"
        eyebrow="How an audit reads a product"
        heading="Follow one record, not every screen"
        headingId="kit-f-example"
        lead="Most product problems live between screens. We follow one real record until we find the seam."
        aside={<AsidePhoto id="hands-sketches-markers" />}
      >
        <Callout
          label="Worked example"
          html="<p>A logistics team’s dispatch screen: three teams edit one order, and nobody trusts its status. We traced a single order through all of them.</p>"
        />
        <Steps steps={THREE_STEPS} />
      </ContentSection>

      {/* ── F · with a CtaRow ──────────────────────────────────────────────────────────── */}
      <Variation
        id="f-cta"
        title="F · four steps and a CtaRow"
        note="The CtaRow is the body's last row, a stack under the steps: 464 + 96 = 560. Its rule is off, because the last row's rule already closes the ladder (§ 3.1)."
      />
      <ContentSection
        arrangement="beside"
        eyebrow="Working together"
        heading="What the first month looks like"
        headingId="kit-f-cta"
        lead="A fixed first month, so you can judge the work before committing to a longer engagement."
        aside={<AsidePhoto id="workshop-whiteboard-lounge" />}
        footer={
          <CtaRow
            rule={false}
            actions={[{ label: 'See how we work', href: ROUTES.howWeWork }]}
          />
        }
      >
        <Steps
          steps={[
            { title: 'Week one', body: 'Interviews with your team and users, and a walk through the product as it ships today.' },
            { title: 'Week two', body: 'The decision map: what is being decided, by whom, and where the evidence is missing.' },
            { title: 'Week three', body: 'A coded probe of the riskiest answer, put in front of five real users.' },
            { title: 'Week four', body: 'A readout with a plan, a cost, and the first release we would make together.' },
          ]}
        />
      </ContentSection>

      {/* ── S · four stats ─────────────────────────────────────────────────────────────── */}
      <Variation
        id="s-four"
        title="S · four stats, centred"
        note="H-compact centred over one row of four Stats at 286: 217 + 114 = 331 (§ 1.4). Numerals are ink at stat-lg; the blue is the mark on each stat's opening rule. Illustrative numerals, and no client mark in the band (§ 5.8)."
      />
      <ContentSection
        align="center"
        eyebrow="In numbers"
        heading="A year of work, counted"
        headingId="kit-s-four"
        lead="What twelve months of product engagements added up to, measured the same way every quarter."
      >
        <Layout as="ul" columns={{ base: 2, lg: 4 }} colGap="gutter" rowGap="column">
          {FOUR_STATS.map((stat) => (
            <Stat key={stat.label} as="li" {...stat} />
          ))}
        </Layout>
      </ContentSection>

      {/* ── S · three stats + CtaRow ───────────────────────────────────────────────────── */}
      <Variation
        id="s-three"
        title="S · three stats and a CtaRow"
        note="Three Stats at 392, then a centred CtaRow a stack under the row: 331 + 96 = 427. The row's rule is on: the stats end on copy, not on a rule."
      />
      <ContentSection
        align="center"
        eyebrow="After the redesign"
        heading="What changed in one quarter"
        headingId="kit-s-three"
        lead="Three measures we agreed before the work started, read again ninety days after release."
        footer={
          <CtaRow
            align="center"
            actions={[{ label: 'Read the case study', href: ROUTES.caseStudies }]}
          />
        }
      >
        <Layout as="ul" columns={{ md: 3 }} colGap="gutter" rowGap="column">
          {THREE_STATS.map((stat) => (
            <Stat key={stat.label} as="li" {...stat} />
          ))}
        </Layout>
      </ContentSection>

      {/* ── D · stat aside ─────────────────────────────────────────────────────────────── */}
      <Variation
        id="d-stat"
        title="Stat as the D head aside"
        note="One stat-lg figure as the head track's large thing (§ 3.3: D always has an aside). Head track 240 + 48 + 114 = 402; body three one-column rows."
      />
      <ContentSection
        arrangement="beside"
        eyebrow="AI product experience"
        heading="Where AI meets the product"
        headingId="kit-d-stat"
        lead="The responsibilities our AI engagements combined, from the product boundary to the review loop."
        aside={
          <Stat
            value="12"
            unit="AI products"
            label="Copilots, AI-native tools and integrations, designed and shipped since 2022."
          />
        }
      >
        <Layout as="ul" rowGap="none">
          <ListCard
            titleAs="h3"
            title="Opportunity framing"
            body="Where a model earns its place in the product, and where a better default does the job."
            marker={{ type: 'icon', name: 'flag' }}
          />
          <ListCard
            titleAs="h3"
            title="Trust and recovery"
            body="How the product shows confidence, admits a wrong answer, and hands control back."
            marker={{ type: 'icon', name: 'shield-check' }}
          />
          <ListCard
            titleAs="h3"
            title="Evaluation in the loop"
            body="Review sets and acceptance criteria written with domain experts, so quality is measured."
            marker={{ type: 'icon', name: 'checklist' }}
          />
        </Layout>
      </ContentSection>

      {/* ── Stat sizes ─────────────────────────────────────────────────────────────────── */}
      <Variation
        id="stat-sizes"
        title="Stat · stat-lg and stat"
        note="lg (54) is a band's large thing; md (40) sits beside other content. Same rule, mark, unit and label at both sizes. On tint below: surface proof — on pages, tint is the proof band only (§ 1.7)."
      />
      <Section>
        <Layout columns={{ md: [1, 1] }} colGap="column" rowGap="stack">
          <Layout rowGap="block">
            <p className={t.eyebrow}>size=&quot;lg&quot; · stat-lg</p>
            <Stat value="6–8" unit="weeks" label="From the first question to a tested, reviewable prototype." />
          </Layout>
          <Layout rowGap="block">
            <p className={t.eyebrow}>size=&quot;md&quot; · stat</p>
            <Stat
              size="md"
              value="6–8"
              unit="weeks"
              label="From the first question to a tested, reviewable prototype."
            />
          </Layout>
        </Layout>
      </Section>
      <Section surface="tint" density="tight">
        <Layout columns={{ md: 4 }} colGap="gutter" rowGap="column" as="ul">
          {FOUR_STATS.map((stat) => (
            <Stat key={stat.label} as="li" size="md" {...stat} />
          ))}
        </Layout>
      </Section>

      {/* ── E · thread ─────────────────────────────────────────────────────────────────── */}
      <Variation
        id="e-thread"
        title="Thread in a full-column E band"
        note="H-compact over a Thread of six stages, the full 1240 column (§ 3.4 E: a diagram ≤ 380). One blue line, an arrowhead into each next node, the last node filled where the thread lands. The horizon texture sits in the bottom padding, clear of the copy."
      />
      <ContentSection
        eyebrow="One decision, every representation"
        heading="The decision outlives the prototype"
        headingId="kit-e-thread"
        lead="Prototype code may be thrown away. What survives is the decision, and the evidence that what shipped meets it."
      >
        <Texture>
          <TextureShape bottom={-200} width="110%" height={260} blur={200} />
        </Texture>
        <Thread stages={THREAD} loop="What production shows becomes the next open question." />
      </ContentSection>

      {/* ── ProcessFlow, for comparison ─────────────────────────────────────────────────── */}
      <Variation
        id="flow"
        title="ProcessFlow lane, for comparison: a flow, not a method"
        note="Stages that each hold several things, with what the client keeps throughout as a lane. It is the existing, approved ProcessFlow, unchanged — shown here so the three forms can be told apart: Steps are a method, a Thread is a chain of artefacts, a flow is stages with contents."
      />
      <ContentSection
        arrangement="split-head"
        eyebrow="How a release moves"
        heading="Three stages, one owner"
        headingId="kit-flow"
        lead="Each stage hands the next a reviewed artefact. Your team keeps the record from the first day."
      >
        <ProcessFlow
          stages={[
            { label: 'Shape', items: ['Decision map', 'Coded probe', 'Acceptance criteria'] },
            { label: 'Build', items: ['Component contract', 'Running behaviour', 'Weekly review'] },
            { label: 'Release', items: ['Measured rollout', 'Production finding'] },
          ]}
          throughout={{
            label: 'Your team keeps, throughout',
            items: ['The decision record', 'Repository access', 'Every review'],
          }}
        />
      </ContentSection>
    </main>
  );
}
