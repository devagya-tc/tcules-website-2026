import { Button, Cluster, Layout, PageHero } from 'tcules-website-2026';
import type { HeroCredit } from 'tcules-website-2026';

/* NOTE: these preview files are type-STRIPPED, not type-checked (see .design-sync/NOTES.md), so an
   invalid prop value fails silently at render rather than at build. Two unions to keep honest here:
   `body` is a NON-EMPTY tuple and `actions` is a 0-, 1- or 2-tuple, so neither can be widened to a
   plain array in a story without the real API rejecting it at a real call site. And Cluster caps at
   `block` — the actions row below uses `tight`, which is inside the cap. */

const TITLE = 'A building energy product that pays for its own rollout';
const EYEBROW = 'ConnectX · AI-native building energy product';

const LEAD =
  'A retrofit programme that pays for itself in the first year, measured on the meter rather than in the model. We built the product that proves it, and the one that sells it.';
const SECOND =
  'The client had eleven buildings, four metering vendors and no single number anybody trusted. Every quarterly review started by arguing about the data instead of the plan.';
const THIRD =
  'We began with the meter. One ingest path, one unit, one timestamp convention, and a reconciliation report that names the gap rather than smoothing it over.';

const CREDITS: HeroCredit[] = [{ role: 'author', people: ['Alice Chen', 'Ben Ndlovu'] }];
const DATES = { published: '2026-03-03', modified: '2026-06-12' };

/**
 * The opening block of a page: one h1, an optional eyebrow above it, one to six paragraphs of lead
 * copy, an optional byline of credits and dates, an optional caller block and nought to two
 * actions. It is the first thing inside <main> on every route and there is never a second one —
 * two heroes are two h1s.
 *
 * It brings its own band: a Section at default density, so 96 of air above the title and 96 below
 * the last block. That means it can only be a direct child of a page or its template — never
 * inside another Section (the content column would inset twice), never inside a Layout track (a
 * band is not a row) and never inside a Cluster (which would shrink it to its longest word).
 * `surface` must match the Breadcrumbs band immediately above it, or the seam reads as a two-tone
 * split.
 *
 * ONE variant and ONE size. The three arrangements a hero looks like it should have — plain,
 * article, case study — are one arrangement: nothing differs in how it is ARRANGED, only in which
 * optional slot is filled, and the two slots that differentiate it (eyebrow and byline) are
 * independent of each other. So compose a hero by filling slots, never by asking for a variant.
 */
export function Default() {
  return <PageHero title={TITLE} body={[LEAD, SECOND, THIRD]} />;
}

/** The eyebrow names the CATEGORY the page belongs to, not the page. Uppercased by the stylesheet,
    so the content keeps its authored casing. Absent on most routes: an absent slot renders no
    element and no seam, never an empty one. */
export function WithEyebrow() {
  return <PageHero title={TITLE} body={[LEAD, SECOND]} eyebrow={EYEBROW} />;
}

/** Nought, one or two actions — a third does not compile. POSITION decides emphasis: the first is
    solid/primary, the second ghost/neutral, so there is no emphasis prop on an action. Both are
    size="md" with the hit area extended to the 44px touch floor rather than the box stepped to 48,
    which is what keeps the hero's controls the same height as every other control on the site. */
export function WithActions() {
  return (
    <PageHero
      title={TITLE}
      body={[LEAD, SECOND]}
      eyebrow={EYEBROW}
      actions={[
        { label: 'Read the case study', href: '/case-studies/connectx' },
        { label: 'Talk to the team', href: '/contact' },
      ]}
    />
  );
}

/** The article hero. `credits` is a list of ROLE groups — author, host, guest, reviewer — and the
    role selects the label ("Written by", "Hosted by", "With", "Reviewed by"); it is never a string
    the caller writes. Names are joined into one value per group, so three guests get one "With".
    A modified date equal to the published one renders nothing, because that is a CMS timestamp
    rather than a second fact. */
export function WithByline() {
  return <PageHero title={TITLE} body={[LEAD, SECOND]} credits={CREDITS} dates={DATES} />;
}

/** Everything at once, in the only order there is: eyebrow, title, copy, byline, the caller's own
    block, actions — 48 between each. `children` is that block, and it carries no ink and no step of
    its own, so whatever goes in it reads the hero's surface. Headings inside it start at h3: the
    page's body sections use h2, and a hero adjunct is subordinate to them. */
export function WithEverything() {
  return (
    <PageHero
      title={TITLE}
      body={[LEAD, SECOND]}
      eyebrow={EYEBROW}
      credits={CREDITS}
      dates={DATES}
      actions={[
        { label: 'Read the case study', href: '/case-studies/connectx' },
        { label: 'Talk to the team', href: '/contact' },
      ]}
    >
      <Layout columns={3} colGap="gutter" rowGap="block">
        <Layout rowGap="inline">
          <h3>11 buildings</h3>
          <p>across four metering vendors</p>
        </Layout>
        <Layout rowGap="inline">
          <h3>9 weeks</h3>
          <p>from kickoff to first switch</p>
        </Layout>
        <Layout rowGap="inline">
          <h3>2 days</h3>
          <p>to close a quarter, from three weeks</p>
        </Layout>
      </Layout>
    </PageHero>
  );
}

/** Six paragraphs — the longest opening any route has. The first is always the lead at 20px and the
    rest are body copy at 18px, so the copy gets its hierarchy from the count with no prop. The
    measure does NOT narrow as the copy grows: a hero that tightened its measure would turn its
    longest pages into ribbons. */
export function LongCopy() {
  return (
    <PageHero
      title={TITLE}
      body={[
        LEAD,
        SECOND,
        THIRD,
        'The forecast is deliberately conservative: it under-promises on the buildings we know least about, so a portfolio review is a conversation about what to do rather than about whether to believe the tool.',
        'The interface is a single page per building and a single page per portfolio. Everything else is a link out to the evidence.',
        'Rollout took nine weeks and ran alongside the existing reporting rather than replacing it on day one. The first month of overlap is what earned the switch.',
      ]}
      eyebrow={EYEBROW}
    />
  );
}

/** On tint the quiet end moves and nothing else does: neutral-600 computes 4.39:1 on this ground
    and fails the 4.5 floor, so the eyebrow AND the credit keys step to neutral-700 — where the body
    paragraphs already are. Those three parts share an ink here and stay apart by family, case and
    tracking. */
export function OnTint() {
  return (
    <PageHero
      surface="tint"
      title={TITLE}
      body={[LEAD, SECOND]}
      eyebrow={EYEBROW}
      credits={CREDITS}
      dates={DATES}
    />
  );
}

/** On ink the direction inverts and the ramp gets more room: white title, neutral-100 lead,
    neutral-300 body, neutral-400 labels. Every cell is at least 8:1, which matters on the surface
    where a serif title at 54px is most at risk of looking thin. */
export function OnInk() {
  return (
    <PageHero
      surface="ink"
      title={TITLE}
      body={[LEAD, SECOND]}
      eyebrow={EYEBROW}
      credits={CREDITS}
      dates={DATES}
    />
  );
}

/** On blue the ramp runs out and the three-step structure survives on its last three values: white,
    brandeis-50, brandeis-100. Nothing quieter than 100 is allowed here — 200 is already 3.78:1 —
    so the eyebrow and the body paragraphs share an ink, as they do on tint. */
export function OnBlue() {
  return (
    <PageHero
      surface="blue"
      title={TITLE}
      body={[LEAD, SECOND]}
      eyebrow={EYEBROW}
      credits={CREDITS}
      dates={DATES}
      actions={[{ label: 'Read the case study', href: '/case-studies/connectx' }]}
    />
  );
}

/** Interactive content is allowed in `children` and nowhere else, and that is a compile-time
    guarantee rather than a rule: `title`, `eyebrow` and every entry in `body` are typed `string`,
    so no control, no link and no second heading can be passed into them. Anything focusable here
    enters the tab order before the actions. */
export function InteractiveExtras() {
  return (
    <PageHero
      title={TITLE}
      body={[LEAD]}
      actions={[{ label: 'Talk to the team', href: '/contact' }]}
    >
      <Cluster colGap="tight" rowGap="tight">
        <Button as="a" href="/case-studies" emphasis="ghost" tone="neutral" extendHitArea>
          Browse the work
        </Button>
        <Button as="a" href="/services" emphasis="ghost" tone="neutral" extendHitArea>
          See the services
        </Button>
      </Cluster>
    </PageHero>
  );
}
