import { Layout, Section } from '@/components';
import { EngagementModel, type EngagementPoint } from '@/patterns';
import { ROUTES } from '@/lib/routes';

import { Specimen } from '../../_specimen/Specimen';
import t from '../../_specimen/typeroles.module.css';

/**
 * Kit package `r7-howwework` — the "How we work" USP band, EngagementModel
 * (src/patterns/EngagementModel), per docs/kit/review-7-oct.md.
 *
 * Laid out as the package's showcase page: an intro band, then every arrangement as a titled band
 * at full width, exactly as a page would place it. Each caption strip is flush scaffolding; the
 * band under it is the real thing.
 *
 * COPY. No claim here is invented. The heading is the service fixtures' own how-we-work statement;
 * the lead is tcules.com/about verbatim; the three points restate the owner's engagement model
 * (review-7-oct.md: one accountable team from the first question to ship; part-time assignment with
 * the idle cost absorbed by Tcules; the team stretches so the client never suffers). The stress
 * band's longer lead is tcules.com/about; its points carry the delivery loop of tcules.com/how-we-work.
 */

const POINTS: readonly [EngagementPoint, EngagementPoint, EngagementPoint] = [
  {
    title: 'One team, first question to ship',
    body: 'The people who ask the first question are the people who ship the build, so nothing is lost in a handoff.',
  },
  {
    title: 'Part-time, and the idle time is ours',
    body: 'People are assigned to your product part-time. When the work goes quiet, the cost of that idle time is absorbed by Tcules.',
  },
  {
    title: 'A team that stretches',
    body: 'When the work peaks, the team stretches to meet it, so your product never waits on our capacity.',
  },
];

const AXIS = ['First question', 'Shipped build'] as const;
const HEADING = 'One accountable team, from the first question to the shipped build.';
const LEAD = 'Less translation loss. Fewer handoffs. More ownership in the messy middle.';

/* Stress: the longest copy the band is designed to hold at the 830 fold — a two-line heading
   (~68 characters), a two-sentence lead, five-word titles and 22-word bodies. */
const STRESS_POINTS: readonly [EngagementPoint, EngagementPoint, EngagementPoint] = [
  {
    title: 'Read the reality, then decide',
    body: 'The team that reads the product reality makes the decision visible and carries its intent into implementation, with no handoff.',
  },
  {
    title: 'Part-time; idle time absorbed',
    body: 'People are assigned part-time. When the work pauses between decisions, the cost of that idle time is absorbed by Tcules.',
  },
  {
    title: 'Stretches for the release',
    body: 'When a release needs more hands than the assignment holds, the team stretches to meet it, then evaluates and continues.',
  },
];

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

export default function KitHowWeWorkPage() {
  return (
    <>
      {/* ── Intro ──────────────────────────────────────────────────────────────────────── */}
      <Section>
        <Layout columns={{ lg: [1, 1] }} colGap="section" rowGap="stack" align="end">
          <Layout rowGap="block">
            <p className={t.eyebrow}>UI kit · the USP band</p>
            <h1>How we work</h1>
            <p className={t.lead}>
              The engagement model drawn rather than listed: one line for one accountable team, a
              dashed level for the part-time assignment, the idle time below it hatched as ours,
              and the field above it where the team stretches. The three points are the chart&rsquo;s
              key, each introduced by the mark it names and nothing else.
            </p>
          </Layout>
          <Layout as="ul" columns={{ md: 2 }} colGap="gutter" rowGap="tight" className={t.uiLg}>
            <li><a href="#full">Full · paper</a></li>
            <li><a href="#full-tint">Full · tint, with an action</a></li>
            <li><a href="#compact">Compact · service page</a></li>
            <li><a href="#compact-tint">Compact · tint, no lead</a></li>
            <li><a href="#stress">Full · stress copy</a></li>
          </Layout>
        </Layout>
      </Section>

      {/* ── Full · paper ───────────────────────────────────────────────────────────────── */}
      <Variation
        id="full"
        title="Full · the how-we-work and home band"
        note="The heading beside its lead, then the drawing (7) beside the keyed points (5). Each point opens on the mark it names — the line, the hatch, the field — and that shape is its only separator: no hairline, no icon, no box. The drawing is aria-hidden; the points carry every claim in text."
      />
      <EngagementModel
        eyebrow="How we work"
        heading={HEADING}
        headingId="kit-eng-full"
        lead={LEAD}
        points={POINTS}
        axis={AXIS}
      />

      {/* ── Full · tint ────────────────────────────────────────────────────────────────── */}
      <Variation
        id="full-tint"
        title="Full · on tint, with a link action"
        note="The same band on the page's one tint ground. The field, hatch and dot grid step one shade deeper so the drawing holds its contrast; the line stays the blue accent as foreground. The action is a link button (r7-buttons), set under the lead."
      />
      <EngagementModel
        surface="tint"
        eyebrow="The engagement model"
        heading={HEADING}
        headingId="kit-eng-tint"
        lead={LEAD}
        points={POINTS}
        axis={AXIS}
        action={{ label: 'Start a conversation', href: ROUTES.contact }}
      />

      {/* ── Compact ────────────────────────────────────────────────────────────────────── */}
      <Variation
        id="compact"
        title="Compact · the band a service page carries"
        note="The head, lead and action (2) beside a shallower drawing (3) keyed by the three titles alone. It names the model and sends the reader to the full page; the bodies stay there."
      />
      <EngagementModel
        arrangement="compact"
        eyebrow="How we work"
        heading={HEADING}
        headingId="kit-eng-compact"
        lead={LEAD}
        points={POINTS}
        axis={AXIS}
        action={{ label: 'See how we work', href: ROUTES.howWeWork }}
      />

      {/* ── Compact · tint ─────────────────────────────────────────────────────────────── */}
      <Variation
        id="compact-tint"
        title="Compact · on tint, heading and action only"
        note="The leanest form: no lead. The drawing centres on the head, so the band stays one idea at a glance."
      />
      <EngagementModel
        arrangement="compact"
        surface="tint"
        eyebrow="How we work"
        heading={HEADING}
        headingId="kit-eng-compact-tint"
        points={POINTS}
        axis={AXIS}
        action={{ label: 'See how we work', href: ROUTES.howWeWork }}
      />

      {/* ── Stress ─────────────────────────────────────────────────────────────────────── */}
      <Variation
        id="stress"
        title="Full · stress copy"
        note="The longest copy the band is built for: a two-line heading, a two-sentence lead with an action, five-word titles and bodies of about 22 words, three lines each at 1440. The band still holds the 830 fold at 1470."
      />
      <EngagementModel
        eyebrow="How we work"
        heading="Design that survives production, from one accountable team."
        headingId="kit-eng-stress"
        lead="Design is the lens here. Code is how it becomes real. Less translation loss, fewer handoffs, more ownership in the messy middle."
        points={STRESS_POINTS}
        axis={AXIS}
        action={{ label: 'See how we work', href: ROUTES.howWeWork }}
      />
    </>
  );
}
