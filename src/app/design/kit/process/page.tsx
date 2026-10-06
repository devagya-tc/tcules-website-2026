import { Layout, Section, Stat, Texture, TextureShape } from '@/components';
import {
  Callout,
  ContentSection,
  CtaRow,
  ListCard,
  ProcessFlow,
  Steps,
  Thread,
  type Step,
  type ThreadStage,
} from '@/patterns';
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

/* Body budgets (Steps.tsx): ≤ 12 words for two lines in the 583 media copy row, ≤ 6 for one line. */
const FOUR_STEPS: readonly Step[] = [
  { title: 'Frame the decision', body: 'What the product must decide, who owns it, and what would settle it.' },
  { title: 'Probe the risk', body: 'A coded probe puts the riskiest assumption in front of real users.' },
  { title: 'Specify and build', body: 'Design and engineering build from one record of states and rules.' },
  { title: 'Ship and observe', body: 'Released against a measure agreed up front, and read again after.' },
];

const FIVE_STEPS: readonly Step[] = [
  { title: 'Map', body: 'The problem, the people, the question.' },
  { title: 'Sketch', body: 'Competing answers from different hands.' },
  { title: 'Decide', body: 'One direction, chosen against the question.' },
  { title: 'Prototype', body: 'A realistic surface, built in a day.' },
  { title: 'Test', body: 'Five people use it; we watch.' },
];

const THREE_STEPS: readonly Step[] = [
  { title: 'Trace the record', body: 'Follow one order from intake to invoice, marking each status change.' },
  { title: 'Name the owner', body: 'For every change, find the one team that actually decides it.' },
  { title: 'Redraw the seam', body: 'Design the screen where the decision happens, and retire its copies.' },
];

const MONTH_STEPS: readonly Step[] = [
  { title: 'Week one', body: 'Interviews, and the product as it ships.' },
  { title: 'Week two', body: 'A map of who decides what.' },
  { title: 'Week three', body: 'A coded probe, in front of users.' },
  { title: 'Week four', body: 'A readout, a plan and a cost.' },
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
/* Titles that hold one line in a 165 track at 1024, so every body in the row starts level. */
const THREAD: readonly ThreadStage[] = [
  { title: 'Open question', body: 'What the product must decide.' },
  { title: 'Coded probe', body: 'The cheapest version that could answer it.' },
  { title: 'Contract', body: 'States, rules and data the build owes.' },
  { title: 'Live code', body: 'Shipped behind an agreed measure.' },
  { title: 'Finding', body: 'What production showed us.' },
  { title: 'Decision', body: 'Recorded, and cited by the next.' },
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
              Steps for a method, a thread for a chain of artefacts, a flow for stages with
              contents, and a stat that keeps its numeral in ink.
            </p>
          </Layout>
          <Layout as="ul" columns={{ md: 2 }} colGap="gutter" rowGap="tight" className={t.uiLg}>
            <li><a href="#f-four">F · four steps, a tall photograph</a></li>
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
        title="F · four steps, two-line bodies, a tall photograph"
        note="Steps (ListCard's set mode) in the copy column of a media split, the photograph running the copy's height: it starts on the eyebrow's line and ends on the last row's rule (media.height = copy). Every step title one size (h5), one 184 title track, the body a block after it."
      />
      <ContentSection
        arrangement="media"
        density="tight"
        media={{ image: photo('workshop-brick-room'), height: 'copy' }}
        eyebrow="How an engagement runs"
        heading="Four stages, each one reviewed"
        headingId="kit-f-four"
        lead="Each stage ends in something you can read and push back on before the next begins."
      >
        <Steps steps={FOUR_STEPS} />
      </ContentSection>

      {/* ── F · five steps ─────────────────────────────────────────────────────────────── */}
      <Variation
        id="f-five"
        title="F · five steps, one-line bodies"
        note="The approved beside form: the head static in its track, five rows in the body track. Five rows hold one-line bodies (≤ 6 words). No photograph here; the generated texture weighs the head track's empty lower corner, clear of every line of copy."
      />
      <ContentSection
        arrangement="beside"
        eyebrow="Design sprint"
        heading="Five days, one tested answer"
        headingId="kit-f-five"
        lead="A sprint compresses months of debate into a week, and ends with real people using the result."
      >
        <Texture>
          <TextureShape kind="ellipse" bottom={-180} left={-200} width="44%" height={320} blur={180} />
        </Texture>
        <Steps steps={FIVE_STEPS} />
      </ContentSection>

      {/* ── F · worked example ─────────────────────────────────────────────────────────── */}
      <Variation
        id="f-example"
        title="F · three steps, worked example above"
        note="The photograph at the end this time. Callout tone=example sets the scene the steps walk through: body-lg in ink, a blue key and a blue rule down its start edge — a mark, not a box. Three rows at most beneath it, at the family's one title size."
      />
      <ContentSection
        arrangement="media"
        density="tight"
        media={{ image: photo('hands-sketches-markers'), side: 'end', height: 'copy' }}
        eyebrow="How an audit reads a product"
        heading="Follow one record, not every screen"
        headingId="kit-f-example"
      >
        <Callout
          tone="example"
          label="Worked example"
          html="<p>A dispatch screen where three teams edit one order, and nobody trusts its status. We followed a single order through all of them.</p>"
        />
        <Steps steps={THREE_STEPS} />
      </ContentSection>

      {/* ── F · with a CtaRow ──────────────────────────────────────────────────────────── */}
      <Variation
        id="f-cta"
        title="F · four steps and a CtaRow"
        note="One-line weeks, then the CtaRow a stack under the ladder; its rule is off, because the last row's rule already closes the ladder (§ 3.1). The photograph ends on the button's foot."
      />
      <ContentSection
        arrangement="media"
        density="tight"
        media={{ image: photo('moodboard-wall-desk'), height: 'copy' }}
        eyebrow="Working together"
        heading="What the first month looks like"
        headingId="kit-f-cta"
        lead="A fixed first month, so you can judge the work before you commit to more."
        footer={<CtaRow rule={false} actions={[{ label: 'See how we work', href: ROUTES.howWeWork }]} />}
      >
        <Steps steps={MONTH_STEPS} />
      </ContentSection>

      {/* ── S · four stats ─────────────────────────────────────────────────────────────── */}
      <Variation
        id="s-four"
        title="S · four stats, centred"
        note="H-compact centred over one row of four Stats, each centred on its track (align=center), so the band has one axis. The band takes the open padding, and the generated texture fills the bottom of it under the row — the band's visual event — clear of the labels. Numerals ink at stat-lg; the blue is each stat's mark. Illustrative numerals, no client mark (§ 5.8)."
      />
      <ContentSection
        align="center"
        density="open"
        eyebrow="In numbers"
        heading="A year of work, counted"
        headingId="kit-s-four"
        lead="Twelve months of product engagements, measured the same way every quarter."
      >
        <Texture>
          <TextureShape bottom={-150} width="96%" height={200} blur={80} />
        </Texture>
        <Layout as="ul" columns={{ md: 2, lg: 4 }} colGap="gutter" rowGap="stack">
          {FOUR_STATS.map((stat) => (
            <Stat key={stat.label} as="li" align="center" {...stat} />
          ))}
        </Layout>
      </ContentSection>

      {/* ── S · three stats + CtaRow ───────────────────────────────────────────────────── */}
      <Variation
        id="s-three"
        title="S · three stats and a CtaRow"
        note="Three centred Stats, then a centred CtaRow a stack under the row with its rule OFF: the stats' own rules already mark the row, and a shorter centred rule under them aligned with nothing. Below 768 every stat sets its figure beside its label, so three and four keep one compact rhythm."
      />
      <ContentSection
        align="center"
        density="open"
        eyebrow="After the redesign"
        heading="What changed in one quarter"
        headingId="kit-s-three"
        lead="Three measures agreed before the work started, read again ninety days after release."
        footer={
          <CtaRow
            align="center"
            rule={false}
            actions={[{ label: 'Read the case study', href: ROUTES.caseStudies }]}
          />
        }
      >
        <Texture>
          <TextureShape kind="ellipse" bottom={-150} width="80%" height={200} blur={80} />
        </Texture>
        <Layout as="ul" columns={{ md: 3 }} colGap="gutter" rowGap="stack">
          {THREE_STATS.map((stat) => (
            <Stat key={stat.label} as="li" align="center" {...stat} />
          ))}
        </Layout>
      </ContentSection>

      {/* ── D · stat aside ─────────────────────────────────────────────────────────────── */}
      <Variation
        id="d-stat"
        title="Stat as the D head aside"
        note="One stat-lg figure as the head track's large thing (§ 3.3: D always has an aside). The body is three icon rows, their glyphs blue."
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
        note="Two sizes for two jobs, never one row: lg (54) is a band's large thing — the S row, the D aside; md (40) sits beside other content, here a paragraph. 54 against 40 is too close a step to read as a hierarchy side by side, so the two never share a row."
      />
      <Section>
        <Layout columns={{ lg: [1, 1] }} colGap="column" rowGap="stack">
          <Layout rowGap="block">
            <p className={t.eyebrow}>size=&quot;lg&quot; · stat-lg · the band&rsquo;s large thing</p>
            <Stat value="6–8" unit="weeks" label="From the first question to a tested, reviewable prototype." />
          </Layout>
          <Layout rowGap="block">
            <p className={t.eyebrow}>size=&quot;md&quot; · stat · beside other content</p>
            <Layout columns={{ md: [3, 2] }} colGap="gutter" rowGap="block" align="start">
              <p>
                The first engagement is fixed: four weeks, one decision, and a prototype your team can
                put in front of users. Most teams decide on the next phase from what that prototype
                shows them.
              </p>
              <Stat size="md" value="4" unit="weeks" label="A fixed first engagement." />
            </Layout>
          </Layout>
        </Layout>
      </Section>

      {/* ── E · thread ─────────────────────────────────────────────────────────────────── */}
      <Variation
        id="e-thread"
        title="Thread in a full-column E band"
        note="H-compact over a Thread of six stages, the full 1240 column (§ 3.4 E). The thread is the figure: a 2px blue line, 16px nodes, an arrowhead into each next node, the last node filled where it lands — and the return arc rising from that node, back over the row, down into the first. The sentence sits on the column line beneath; the texture rises from the bottom corner under the last stages, clear of the sentence and every body."
      />
      <ContentSection
        eyebrow="One decision, every representation"
        heading="The decision outlives the prototype"
        headingId="kit-e-thread"
        lead="Prototype code may be thrown away. What survives is the decision, and the evidence that what shipped meets it."
      >
        <Texture>
          <TextureShape kind="ellipse" bottom={-250} right={-120} width="64%" height={300} blur={120} />
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
