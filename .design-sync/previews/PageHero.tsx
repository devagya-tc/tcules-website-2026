import { Button, Cluster, Layout, PageHero } from 'tcules-website-2026';
import type { HeroCredit } from 'tcules-website-2026';

/* NOTE: these preview files are type-STRIPPED, not type-checked (see .design-sync/NOTES.md), so an
   invalid prop value fails silently at render rather than at build. Two unions to keep honest here:
   `body` is a NON-EMPTY tuple and `actions` is a 0-, 1- or 2-tuple, so neither can be widened to a
   plain array in a story without the real API rejecting it at a real call site. And Cluster caps at
   `stack` — the actions row below uses `tight`, which is inside the cap. */

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

/* The media slot is a DISCRIMINATED UNION, so `kind` is not decoration: an image carries
   src/alt/width/height and a video carries an id and a title, and neither shape can be handed the
   other's fields. width/height are the asset's INTRINSIC pixels, not a size request — the image
   always renders at the band's full content column — and the id is the eleven-character YouTube id,
   never a URL and never an iframe. Deliver an image at 1240 or wider; there is no cap, so a
   narrower asset upscales. */
/* The source is INLINED, following Figure's preview for the same reason: a preview renders outside
   the Next app, so the `/public` path the specimen route uses resolves to nothing here and fails as
   a broken frame the render check does not flag. This is the same dashboard shape as
   `/design/page-hero`, simplified, and it is LIGHT on purpose — a near-white screenshot is the case
   the hairline exists for. */
const svg = (body, w, h) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">` +
      `<rect width="${w}" height="${h}" fill="#fdfdfb"/>${body}</svg>`,
  );

const IMAGE = {
  kind: 'image',
  src: svg(
    '<rect width="2400" height="96" fill="#f3f1ea"/><circle cx="56" cy="48" r="13" fill="#c3dd2a"/>' +
      '<path d="M96 40h200v16H96z" fill="#71706a"/>' +
      '<rect x="2040" y="26" width="272" height="44" rx="8" fill="#0048ff"/>' +
      '<rect y="96" width="336" height="1254" fill="#f8f7f2"/>' +
      '<path d="M44 160h188v13H44zm0 60h150v13H44zm0 60h200v13H44zm0 60h128v13H44z" fill="#91908d"/>' +
      '<rect x="44" y="212" width="248" height="25" fill="#dbe4ff"/>' +
      '<path d="M400 164h352v20H400zm0 46h568v13H400z" fill="#504f49"/>' +
      '<path d="M400 272h1956v1H400zm0 94h1956v1H400zm0 94h1956v1H400z" fill="#e5e1d6"/>' +
      '<path d="M420 302h244v12H420zm324 0h162v12H744zm-324 94h276v12H420zm324 0h202v12H744z" fill="#71706a"/>' +
      '<path d="M420 610h1936v1H420z" fill="#292824"/>' +
      '<path d="M420 652h188v13H420z" fill="#91908d"/>' +
      /* Three stat tiles. They fill the band between the table and the charts, which read as a
         half-empty screenshot without them — and a light, BUSY screenshot is the case the
         per-surface hairline exists for, so an empty one understates the card. */
      '<path d="M420 700h620v170H420zm658 0h620v170h-620zm658 0h620v170h-620z" fill="#f8f7f2"/>' +
      '<path d="M452 744h180v34H452zm658 0h150v34h-150zm658 0h206v34h-206z" fill="#292824"/>' +
      '<path d="M452 806h300v13H452zm658 0h336v13h-336zm658 0h268v13h-268z" fill="#91908d"/>' +
      '<path d="M984 730h24v24h-24z" fill="#c3dd2a"/>' +
      '<path d="M1642 730h24v24h-24zm658 0h24v24h-24z" fill="#0048ff"/>' +
      '<path d="M452 1010h80v230h-80zm140-54h80v284h-80zm140-86h80v370h-80zm140 44h80v326h-80z" fill="#0048ff"/>' +
      '<path d="M1240 956h80v284h-80zm140-38h80v322h-80zm140 60h80v262h-80zm140-98h80v360h-80z" fill="#b8c8ff"/>' +
      '<path d="M420 1256h1936v1H420z" fill="#91908d"/>',
    2400,
    1350,
  ),
  alt: 'The ConnectX portfolio dashboard: a sidebar of buildings, a table of meter readings and a bar chart comparing forecast against actual consumption.',
  width: 2400,
  height: 1350,
} as const;

const VIDEO = {
  kind: 'youtube',
  id: 'aqz-KE-bpKQ',
  title: 'Big Buck Bunny — Blender Foundation, Creative Commons',
} as const;

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
 *
 * `media` is the one part of the band that is a BOX and the only one that reaches both edges of
 * the content column — everything else is left-set text inside a measure. It is what stops a hero
 * reading as three sizes of the same rectangle, and it goes LAST, below the actions.
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
    rest are body copy at 16px, the same size the page's Prose body takes, so the copy gets its
    hierarchy from the count with no prop. 20 against 16 is a wide enough step that the lead reads
    as a lead without the paragraphs needing to sit above body scale themselves. The measure does
    NOT narrow as the copy grows: a hero that tightened its measure would turn its longest pages
    into ribbons. */
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


/** An image under the hero, LAST in the band — below the actions, not beside the copy. It renders
    at its own intrinsic ratio, uncropped, at the full width of the content column, so a portrait
    asset makes a tall band and that is a content decision rather than a missing crop prop. The
    hairline around it is a per-surface token: visible on paper where a light screenshot has no edge
    of its own, and almost nothing on ink where it already does. */
export function WithImage() {
  return (
    <PageHero
      title={TITLE}
      body={[LEAD]}
      eyebrow={EYEBROW}
      credits={CREDITS}
      dates={DATES}
      actions={[{ label: 'Read the case study', href: '/case-studies/connectx' }]}
      media={IMAGE}
    />
  );
}

/** A YouTube embed in the same slot. Pass an id and a title, never a URL and never an iframe: the
    component builds the src, so every route embeds on the same host (youtube-nocookie.com, which
    withholds tracking cookies until a visitor presses play) with the same parameters. The frame is
    16/9 because that is YouTube's ratio — it is not applied to images. Autoplay is not in the allow
    list, and the title is the frame's accessible name, so say what the video is.

    THE CARD BELOW SHOWS AN EMPTY OUTLINED BOX, AND THAT IS CORRECT. This preview renders in an
    isolated frame with no route to youtube-nocookie.com, so the player never loads and what is
    left is exactly what this component owns: the 16/9 box and the per-surface hairline around it.
    In the app the same box holds the player. Read the empty card as the geometry, not as a broken
    component — everything inside the frame belongs to another origin and was never ours to draw. */
export function WithVideo() {
  return <PageHero title={TITLE} body={[LEAD, SECOND]} eyebrow={EYEBROW} media={VIDEO} />;
}
