import { Layout, Media, Section, Stat, Texture, TextureShape } from '@/components';
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
 *
 * Texture appears ONCE (final fix round): a defined field under the S row, where it reads as the
 * Tcules grid rather than as a faint fog repeated band after band.
 */

const photo = (id: PhotoId) => getKitPhoto(id);

/** The head-track aside: a 3:2 photograph at the 381 track (§ 1.4 "photo aside, 3:2 at 381"). */
const asidePhoto = (id: PhotoId) => <Media image={photo(id)} ratio="3/2" sizes={HEAD_TRACK} />;

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

/* Body budgets (Steps.tsx): each body sits UNDER its h4 title at the lead measure (56ch, ~11 words
   a line). Two-line bodies 12–20 words; one-line ≤ 10, which still holds one line at 1024. */
const FOUR_STEPS: readonly Step[] = [
  { title: 'Frame the decision', body: 'What the product must decide, who owns the decision, and what evidence would settle it.' },
  { title: 'Probe the risk', body: 'A coded probe puts the riskiest assumption in front of real users before anything is specified.' },
  { title: 'Specify and build', body: 'Design and engineering build from one record of states, rules and data, reviewed every week.' },
  { title: 'Ship and observe', body: 'Released against a measure agreed up front, then read again once real use has settled.' },
];

const FIVE_STEPS: readonly Step[] = [
  { title: 'Map', body: 'The problem, the people, and the one question worth answering.' },
  { title: 'Sketch', body: 'Competing answers from different hands, before anyone argues.' },
  { title: 'Decide', body: 'One direction, chosen against the question rather than taste.' },
  { title: 'Prototype', body: 'A realistic surface, built in a day so it can be tested.' },
  { title: 'Test', body: 'Five people use it while the whole team watches.' },
];

const THREE_STEPS: readonly Step[] = [
  { title: 'Trace the record', body: 'Follow one order from intake to invoice.' },
  { title: 'Name the owner', body: 'For each change, find the one team that decides it.' },
  { title: 'Redraw the seam', body: 'Design the screen where it happens, and retire its copies.' },
];

const MONTH_STEPS: readonly Step[] = [
  { title: 'Week one', body: 'Interviews, and the product as your customers meet it.' },
  { title: 'Week two', body: 'A map of who decides what, and where it breaks.' },
  { title: 'Weeks three and four', body: 'A coded probe in front of users, then a readout and a cost.' },
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
            <li><a href="#f-four">F · four steps, photo aside</a></li>
            <li><a href="#f-example">F · worked example above</a></li>
            <li><a href="#f-five">F · five one-line steps</a></li>
            <li><a href="#f-cta">F · with a CtaRow</a></li>
            <li><a href="#s-four">S · four stats, centred</a></li>
            <li><a href="#s-three">S · three stats and a CtaRow</a></li>
            <li><a href="#d-stat">D · a stat in the head track</a></li>
            <li><a href="#stat-sizes">Stat · two sizes</a></li>
            <li><a href="#e-thread">E · a thread, full column</a></li>
            <li><a href="#flow">ProcessFlow · a flow</a></li>
          </Layout>
        </Layout>
      </Section>

      {/* ── F · four steps ─────────────────────────────────────────────────────────────── */}
      <Variation
        id="f-four"
        title="F · four steps, two-line bodies, a photo aside"
        note="The approved form (§ 3.6): a beside head with its 3:2 photograph, and Steps read top to bottom in the body track. Each row is the blue index beside an h4 title, the body under the title, on the content edge the head and the rules share. The first title starts on the eyebrow's line."
      />
      <ContentSection
        arrangement="beside"
        density="tight"
        eyebrow="How an engagement runs"
        heading="Four stages, each one reviewed"
        headingId="kit-f-four"
        lead="Each stage ends in something your team can read, question and push back on before the next one begins."
        aside={asidePhoto('workshop-brick-room')}
      >
        <Steps steps={FOUR_STEPS} />
      </ContentSection>

      {/* ── F · worked example ─────────────────────────────────────────────────────────── */}
      <Variation
        id="f-example"
        title="F · three steps, worked example above"
        note="A media split, the photograph at the end, running the copy's height between a 4:5 floor and a 2:3 ceiling. Callout tone=example sets the scene the steps walk through: body-lg in ink, a blue key and a blue rule on the content edge — a mark, not a box. Three rows at most beneath it."
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

      {/* ── F · five steps ─────────────────────────────────────────────────────────────── */}
      <Variation
        id="f-five"
        title="F · five steps, one-line bodies"
        note="Five rows hold one-line bodies (≤ 10 words, one line at 1440 and at 1024). The head track carries its photograph, so the band has its large thing and the rows read against it rather than against an empty column."
      />
      <ContentSection
        arrangement="beside"
        density="tight"
        eyebrow="Design sprint"
        heading="Five days, one tested answer"
        headingId="kit-f-five"
        lead="A sprint compresses months of debate into one week, and ends with real people using the result."
        aside={asidePhoto('whiteboard-pair-laptop')}
      >
        <Steps steps={FIVE_STEPS} />
      </ContentSection>

      {/* ── F · with a CtaRow ──────────────────────────────────────────────────────────── */}
      <Variation
        id="f-cta"
        title="F · three steps and a CtaRow"
        note="The photograph leads; the copy is a heading, three one-line steps and the CtaRow pinned to the photograph's foot. Its rule is off, because the last row's rule already closes the ladder (§ 3.1)."
      />
      <ContentSection
        arrangement="media"
        density="tight"
        media={{ image: photo('pair-laptop-notebook'), height: 'copy' }}
        eyebrow="Working together"
        heading="A fixed first month, then you decide"
        headingId="kit-f-cta"
        footer={<CtaRow rule={false} actions={[{ label: 'See how we work', href: ROUTES.howWeWork }]} />}
      >
        <Steps steps={MONTH_STEPS} />
      </ContentSection>

      {/* ── S · four stats ─────────────────────────────────────────────────────────────── */}
      <Variation
        id="s-four"
        title="S · four stats, centred"
        note="H-compact centred over one row of four Stats, the head a step down (headingSize md, the h3 role) so the stat-lg figures are clearly the band's large thing. The page's one texture: a defined field of the Tcules grid under the row, clear of every label. Numerals ink; the blue is each stat's mark. Illustrative numerals, no client mark (§ 5.8)."
      />
      <ContentSection
        align="center"
        density="open"
        headingSize="md"
        eyebrow="In numbers"
        heading="A year of work, counted"
        headingId="kit-s-four"
        lead="Twelve months of product engagements, measured the same way every quarter."
      >
        <Texture>
          <TextureShape bottom={0} width="84%" height={88} blur={24} />
        </Texture>
        <Layout as="ul" columns={{ md: 2, lg: 4 }} colGap="gutter" rowGap="gutter">
          {FOUR_STATS.map((stat) => (
            <Stat key={stat.label} as="li" align="center" {...stat} />
          ))}
        </Layout>
      </ContentSection>

      {/* ── S · three stats + CtaRow ───────────────────────────────────────────────────── */}
      <Variation
        id="s-three"
        title="S · three stats and a CtaRow"
        note="Three centred Stats, then a centred CtaRow a stack under the row with its rule OFF: the stats' own rules already mark the row. One form and one axis at every width — at 390 the stats stack in one centred column under the centred head."
      />
      <ContentSection
        align="center"
        density="open"
        headingSize="md"
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
        <Layout as="ul" columns={{ md: 3 }} colGap="gutter" rowGap="gutter">
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
        heading="AI that earns its place"
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
            body="Where a model genuinely helps the product, and where a better default does the job."
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
        note="H-compact over a Thread of six stages, the full 1240 column (§ 3.4 E). The thread is the figure: a 2px blue line, 16px nodes, an arrowhead into each next node, the last node filled where it lands — and the return arc rising from that node, back over the row, down into the first. The sentence sits on the column line beneath."
      />
      <ContentSection
        eyebrow="One decision, every representation"
        heading="The decision outlives the prototype"
        headingId="kit-e-thread"
        lead="Prototype code may be thrown away. What survives is the decision, and the evidence that what shipped meets it."
      >
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
