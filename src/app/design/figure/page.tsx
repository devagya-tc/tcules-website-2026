import type { ReactNode } from 'react';

import { Cluster, Layout, Section, type SectionSurface } from '@/components';
import { Figure, type FigureImage } from '@/patterns';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/* Three assets of deliberately different intrinsic ratio, all on a near-white ground. That ground
   is the point rather than a convenience: it is what has no edge of its own on paper, which is the
   whole argument for the capture hairline existing (spec § 17 Q5) — since tracker 2.7 it is Media's
   --media-capture-rule-ink, drawn because these records carry no kind and so render as captures (M3). Cover the hairline on the paper band
   below and the screenshot has no bottom edge at all. It is also deliberately the QUIETEST
   rule that still does that: a first pass held the hairline to 3:1 on every surface and it
   read as a frame competing with the screenshot inside it. */
const WIDE: FigureImage = {
  src: '/design/figure-sample-wide.svg',
  alt: 'Approval queue with five rows, two status chips and a ten-bar comparison chart.',
  width: 1600,
  height: 900,
};

const TALL: FigureImage = {
  src: '/design/figure-sample-tall.svg',
  alt: 'Settings column with six labelled rows, five toggles and a footer panel.',
  width: 720,
  height: 1040,
};

const SMALL: FigureImage = {
  src: '/design/figure-sample-small.svg',
  alt: 'Single metric tile with a delta chip above a six-bar sparkline.',
  width: 320,
  height: 200,
};

/* One record per kind, from the Media specimen's brand-framework assets. The caption follows ch05
   §7's structure per category. */
const KINDS: readonly { title: string; note: string; image: FigureImage; caption: string }[] = [
  {
    title: 'capture',
    note: 'The hairline in the surface’s rule ink — the one edge cue, identical to every untagged figure above.',
    image: {
      src: '/design/media/capture-listing.webp',
      alt: 'Listing editor with four bullet fields beside an AI assistance panel of benefit chips.',
      width: 1436,
      height: 883,
      kind: 'capture',
      sources: [320, 652, 1240].map((width) => ({
        src: `/design/media/capture-listing-${width}.jpg`,
        width,
      })),
    },
    caption:
      'Fictional marketplace · listing editor · the whole layout, which is the subject here.',
  },
  {
    title: 'cut-out',
    note: 'No edge: the silhouette is the frame. This record also sets shadow, so it carries the one --shadow-crop.',
    image: {
      src: '/design/media/cutout-flow.png',
      alt: 'Workflow node: an input connected to an AI feature card and an output.',
      width: 1796,
      height: 1112,
      kind: 'cut-out',
      shadow: true,
    },
    caption: 'Fictional workflow tool · one AI step, composed from the live product.',
  },
  {
    title: 'cut-out on a panel',
    note: 'The part’s pale edge does not hold against paper, so the asset is supplied with panel: paper-deep (B5, M4).',
    image: {
      src: '/design/media/cutout-reviews.png',
      alt: 'Review-analysis panel summarising 64 user reviews as benefit chips.',
      width: 855,
      height: 570,
      kind: 'cut-out',
      panel: 'paper-deep',
    },
    caption: 'Fictional review tool · the benefit picker, composed from the live product.',
  },
  {
    title: 'illustration',
    note: 'Never boxed — no edge, no panel, no shadow (§4a, B4).',
    image: {
      src: '/design/media/illustration-seam.svg',
      alt: 'Illustration: a design plane and a build plane meeting at one seam.',
      width: 881,
      height: 544,
      kind: 'illustration',
    },
    caption: 'Design and build meeting at one seam',
  },
  {
    title: 'photograph',
    note: 'No edge, radius 0, never masked (§3).',
    image: {
      src: '/design/media/photograph-portrait.png',
      alt: 'Portrait, head and shoulders, facing the camera.',
      width: 292,
      height: 292,
      kind: 'photograph',
    },
    caption: 'A studio portrait, stand-in.',
  },
];

/* The brief's own reference lines, split into the two fields as spec § 8 reads them. */
const CAPTION = 'Fictional approval-queue surface.';
const NOTE = 'Bars compare 31 current records with a projected set.';

/* One of the 21 written corpus lines that names its own missing artefact. This is what the empty
   state is FOR, and reading it makes the case better than any placeholder box could. */
const EVIDENCE_CAPTION = 'Code-rendered evidence note.';
const EVIDENCE_NOTE =
  'The original screenshot is omitted because its unfinished values cannot support an operational battery decision.';

/**
 * One real Layout track, at a named track width, holding one thing.
 *
 * Every narrow rendering on this page goes through here rather than through the harness's
 * .trackMd / .trackXs measuring chrome. Those two are documented as illegal-placement frames for
 * components that own a BAND, and they carry an instruction to label the band as illegal — which
 * would be a lie here: filling a narrower track is not an illegal placement for a Figure, it is
 * the contract. `columns="tile"` keeps the track at exactly its stated width instead of stretching
 * it, so what surrounds the figure below is a genuine grid track of the size named.
 *
 * The one exception is the 326 row, which uses the harness's .trackMobile. 326 is not a Layout
 * track and should not become one: it is the phone's content column (ch05 B3), and .trackMobile is
 * the harness frame that stands in for it — not an illegal-placement frame.
 */
function Track({ size, children }: { size: 'xs' | 'md' | 'lg'; children: ReactNode }) {
  return (
    <Layout columns="tile" minTrack={size} colGap="gutter" rowGap="gutter">
      {children}
    </Layout>
  );
}

const SURFACES: readonly { surface: SectionSurface; note: string }[] = [
  {
    surface: 'paper',
    note: 'Caption at neutral-700 (8.14:1) reads with the weight of body copy; the note steps one rung quieter to 600 (4.92:1). The rule is neutral-300 at 1.54:1 — decoration, and this is the surface where it does the most work: a light screenshot here is nearly the colour of the ground, so cover the hairline and the image has no edge of its own. It replaced a neutral-500 that cleared 3:1 and read as a frame.',
  },
  {
    surface: 'tint',
    note: 'neutral-600 measures 4.39:1 here and fails as text, so the note steps up to 700 — which was the caption’s paper value. Both move rather than colliding: the caption goes to 800 (10.54:1). The rule steps with the ground to neutral-400 (1.90:1) and has less to do than on paper: this ground is already darker than a light screenshot, so part of the distinction is made before the rule draws anything.',
  },
  {
    surface: 'ink',
    note: 'The neutrals invert and lift — caption 300 (11.07:1), note 400 (8.05:1) — but the rule DROPS to 700 instead of following them, all but disappearing into the ground at 2.10:1. A screenshot already has all the edge it needs from its own light pixels here, so this is the one surface where the honest amount of rule is almost none.',
  },
  {
    surface: 'blue',
    note: 'The tightest window in the system: only the light end of the ramp clears AA. Caption 50 (5.57:1), note 100 (4.91:1) — and no third step is left, so the rule goes the other way to brandeis-300 (2.64:1), darker than either text ink. On a saturated ground, stepping toward the ground is what makes the distinction slight.',
  },
] as const;

const NESTED_TINT_TOKENS: readonly (readonly [string, string])[] = [
  ['--fig-caption-ink', '--color-neutral-800'],
  ['--fig-note-ink', '--color-neutral-700'],
  ['--media-capture-rule-ink', '--color-neutral-400'],
] as const;

function ResolvedTokens() {
  return (
    <Layout as="dl" rowGap="tight">
      {NESTED_TINT_TOKENS.map(([token, value]) => (
        <Cluster as="div" key={token} colGap="inline" rowGap="inline" align="baseline">
          <dt>
            <code>{token}</code>
          </dt>
          <dd>
            <code>{value}</code>
          </dd>
        </Cluster>
      ))}
    </Layout>
  );
}

export default function FigureSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Figure</h1>
          <p>
            An image with a required caption and an optional quieter note, filling whatever
            inline space its parent gives it. It paints no ground, owns no width, crops nothing
            and has no state to be in — so the variety below comes from the shapes it is proven
            against and the tracks it is given, not from variants it does not have.
          </p>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>1 · The matrix</h2>
            <p>
              One variant × one size. There is no size axis because the component has no size of
              its own to step — its one dimension is 100% of what the parent gave it, which is
              the absence of a scale rather than a step on one. There is no variant axis because
              an optional image, a required caption and an optional note is the only
              arrangement, and nothing about which container holds it changes that shape. A{' '}
              <code>variant=&quot;hero&quot; | &quot;card&quot;</code> would be this component
              naming its container, which the container already knows.
            </p>
          </Layout>
          <Specimen
            title="The component, at the full 1240 content column"
            note="Everything else on this page is this same markup, given different content, a different ground or a different track."
          >
            <Figure image={WIDE} caption={CAPTION} note={NOTE} />
          </Specimen>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>2 · The slot-presence ladder</h2>
            <p>
              Two optional slots, four combinations, all in one 384px track so the four are
              comparable at a glance. An absent slot renders no element <em>and no seam</em> —
              inspect the DOM and expect zero <code>img</code> elements in the third and fourth
              bands, and one <code>p</code> rather than two in the first. Every image on this
              page also carries an <code>alt</code> that does not restate its caption — read the
              two together: the <code>alt</code> says what the picture shows, the caption says
              what it means. A screenshot here is evidence, so the empty <code>alt</code> that
              suits <code>ListCard</code>&rsquo;s decorative thumbnail would be wrong.
            </p>
          </Layout>
          <Specimen
            title="image + caption"
            note="No note: the legend holds one paragraph, and there is no 8px seam sitting empty below it."
          >
            <Track size="lg">
              <Figure image={SMALL} caption={CAPTION} />
            </Track>
          </Specimen>
          <Specimen
            title="image + caption + note"
            note="The complete object: 16 from image to legend, then 8 from caption to note. The 2:1 ratio is what makes the note read as attached to the caption rather than as a third equal block."
          >
            <Track size="lg">
              <Figure image={SMALL} caption={CAPTION} note={NOTE} />
            </Track>
          </Specimen>
          <Specimen
            title="caption + note, no image — THE EMPTY STATE"
            note="A real corpus line, rendered as it was written to be read: alone. No placeholder box, no reserved space, no broken-image glyph. A placeholder would promise an image that is coming, and this note explains a permanent absence."
          >
            <Track size="lg">
              <Figure caption={EVIDENCE_CAPTION} note={EVIDENCE_NOTE} />
            </Track>
          </Specimen>
          <Specimen
            title="caption alone"
            note="The floor of the contract. caption is the one required prop, so this is the least a Figure can be — and it is still a valid figure with a legend."
          >
            <Track size="lg">
              <Figure caption={EVIDENCE_CAPTION} />
            </Track>
          </Specimen>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>3 · The shape-stress set</h2>
            <p>
              The same caption and note under three assets of very different intrinsic ratio,
              all at the one full-width track. Nothing is cropped, letterboxed or padded to a
              common shape: each renders at its own ratio, which is why a fixed frame was
              rejected. Grep Media&rsquo;s module for <code>object-fit</code> outside{' '}
              <code>.fill</code>, <code>aspect-ratio</code>, <code>max-block-size</code> and{' '}
              <code>min-block-size</code> and expect zero matches. The <code>width</code> and{' '}
              <code>height</code> attributes on each <code>img</code> are the asset&rsquo;s own
              numbers — 1600×900, 720×1040, 320×200 — and nothing in CSS overrides them.
            </p>
          </Layout>
          <Specimen title="Wide — 1600×900" note="A landscape screenshot at the full track.">
            <Figure image={WIDE} caption={CAPTION} note={NOTE} />
          </Specimen>
          <Specimen
            title="Tall — 720×1040"
            note="A portrait asset. It gets TALLER as the track widens, which is the honest consequence of never cropping — and the reason the page, not the figure, decides how wide to make it."
          >
            <Figure image={TALL} caption={CAPTION} note={NOTE} />
          </Specimen>
          <Specimen
            title="Small — 320×200, upscaled 3.9× to the full track"
            note="This is the cost of fill-what-you-are-given, shown rather than hidden: a small asset in a wide track is soft, and no crop mode would have saved it. A caller who does not want this narrows the TRACK — bands 2 and 9 — instead of asking the figure for a size."
          >
            <Figure image={SMALL} caption={CAPTION} note={NOTE} />
          </Specimen>
        </Layout>
      </Section>

      {SURFACES.map(({ surface, note }) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="stack">
            <Layout rowGap="block">
              <h2>4 · Surface: {surface}</h2>
              <p>{note}</p>
            </Layout>
            <Specimen
              title={`Identical markup on ${surface}`}
              note="No surface prop, no className, no ground of its own: the two --fig-* inks and Media's capture rule resolve from the Section's data-surface and nothing else."
            >
              <Figure image={WIDE} caption={CAPTION} note={NOTE} />
            </Specimen>
          </Layout>
        </Section>
      ))}

      <Section surface="ink">
        <Layout rowGap="block">
          <h2>5 · Nested surface</h2>
          <p>
            An ink band, immediately above a tint one holding the same figure. The tint figure
            must resolve the tint column throughout — a 10.54:1 caption on a light ground — and
            not an ink-tuned value stranded on the wrong ground. That is what every surface
            block restating every token buys; a deltas-only block would inherit ink here.
          </p>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Specimen
            title="A tint figure between two ink sections"
            note="Compare its caption against the ink bands above and below: darker, not lighter. Compare its rule too — neutral-400 against this tint ground, not the neutral-700 the ink figures use."
          >
            <Track size="lg">
              <Figure image={SMALL} caption={CAPTION} note={NOTE} />
            </Track>
          </Specimen>
          <Layout rowGap="block">
            <p>The three values this figure resolves:</p>
            <ResolvedTokens />
          </Layout>
        </Layout>
      </Section>

      <Section surface="ink">
        <Layout rowGap="block">
          <p>
            The closing ink band. Nothing in the figure above knows it is nested; it reads the
            nearest <code>data-surface</code> and there is no second mechanism.
          </p>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="block">
          <h2>6 · States: there are none to force</h2>
          <p>
            Every other specimen in this proving ground has a state column, and this one
            deliberately does not. Nothing <code>Figure</code> renders is interactive: no link,
            no button, no <code>tabindex</code>, nothing focusable. So there is nothing here to
            point at, nothing to hold the pointer down on and nothing to tab to — and unlike
            hover and focus elsewhere in this proving ground, that is not a limitation of a
            static page. It is the component. Zero <code>--fig-*</code> state tokens exist, and
            their absence is the assertion that, given the same three props, this draws the same
            pixels forever.
          </p>
          <p>
            A click-to-enlarge or lightbox treatment is a plausible future ask, and it would be
            a new mechanism with its own spec — not a state this component grows quietly.
          </p>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>7 · Content edge cases</h2>
            <p>Each band is labelled with its row number from the spec&rsquo;s section 12.</p>
          </Layout>
          <Specimen
            title="Row 1 — the longest realistic string, under a full-width image"
            note="78 characters, wrapping inside --measure-body while the image beside it runs to 1240. That difference is the point: the legend is capped at a comfortable measure and left-aligned to the image's own inline-start edge, because a Figure cannot see any external text column to align to. No line-clamp and no truncation, ever."
          >
            <Figure
              image={WIDE}
              caption="Illustrative page preview: foundation tokens, a component family and states."
              note="A second line at the same length, to show the two share one measure and one left edge rather than centring under the image."
            />
          </Specimen>
          <Specimen
            title="Row 2 — one long unbroken token"
            note="A bare URL breaks inside the word rather than overflowing. No horizontal scrollbar appears here or in the 192px track at the foot of this page."
          >
            <Figure
              caption="https://tcules.com/case-studies/operational-battery-decision-support-evidence-note-appendix"
              note="tcules.com/case-studies/operational-battery-decision-support/appendix/figure-14-source-data"
            />
          </Specimen>
          <Specimen
            title="Rows 3 and 6 — an absent optional slot renders no element and no seam"
            note="No img, no rule, no 16px gap. Nothing in the DOM stands in for the image."
          >
            <Figure caption={EVIDENCE_CAPTION} note={EVIDENCE_NOTE} />
          </Specimen>
          <Specimen
            title='Row 7 — caption="" renders the empty paragraph anyway'
            note="Visible and auditable: an empty required field is a content defect, and substituting a fallback string would hide it. Inspect the DOM and expect an empty p element where the caption belongs, and the 8px seam still holding the note below it."
          >
            <Track size="lg">
              <Figure image={SMALL} caption="" note={NOTE} />
            </Track>
          </Specimen>
          <Specimen
            title='Row 7 — note="" is treated as absent'
            note="The other half of the asymmetry: note is genuinely optional, so an empty one is indistinguishable from no note at all. Expect one p element rather than two, and no seam."
          >
            <Track size="lg">
              <Figure image={SMALL} caption={CAPTION} note="" />
            </Track>
          </Specimen>
          <Specimen
            title="Row 13 — interactive content inside a slot is unreachable"
            note="Nothing to show, and that is the point: image is a plain data object and caption and note are strings, so no control, link or heading can be passed into any of them. It is a compile error rather than a review comment — as are className, style, id, size, variant, surface and crop."
          >
            <Track size="lg">
              <Figure image={SMALL} caption={CAPTION} note={NOTE} />
            </Track>
          </Specimen>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>8 · Two adjacent — row 12</h2>
            <p>
              Unlike a hero, two figures in sequence is an expected pattern rather than a bug.
              Neither sets any outer spacing, so the containing <code>Layout</code> decides the
              seam between them cleanly and there is no margin here to collapse. Grep{' '}
              <code>Figure.module.css</code> for <code>margin</code> and expect zero matches.
            </p>
          </Layout>
          <Specimen
            title="Stacked in one 384px track, seam = rowGap 'stack' (48)"
            note="Change the parent's rowGap and this distance changes; nothing inside either figure does. The seam is visibly larger than the 16 inside each figure, which is what keeps the two reading as two objects."
          >
            <Track size="lg">
              <Layout rowGap="stack">
                <Figure image={SMALL} caption={CAPTION} note={NOTE} />
                <Figure image={SMALL} caption="A second figure, immediately below the first." />
              </Layout>
            </Track>
          </Specimen>
          <Specimen
            title="Side by side, two different intrinsic ratios"
            note="The bottom edges do not align, and that is the accepted cost of never cropping rather than a defect. A caller who wants matched heights sets equalRows on THIS Layout — the parent's tool, not the figure's — and accepts what that does to the images."
          >
            <Layout columns={2} colGap="gutter" rowGap="gutter">
              <Figure image={WIDE} caption="Wide — 16:9." note={NOTE} />
              <Figure image={TALL} caption="Tall — 9:13." note={NOTE} />
            </Layout>
          </Specimen>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>9 · Narrow tracks — rows 8 and 9</h2>
            <p>
              The image scales down with its track at its own ratio, the{' '}
              <code>--measure-body</code> cap on the legend goes inert once the column is
              narrower than the measure, and nothing reorders: there is no media query in this
              component to fire. 192px is the named floor — <code>--fig-min-xs</code>, matching{' '}
              <code>ListCard</code>&rsquo;s content core by value rather than by reading another
              component&rsquo;s token.
            </p>
          </Layout>
          <Specimen
            title="320px tracks — the standard card width"
            note="Two real Layout tracks. The caption still wraps on words and the note still reads as the quieter of the two."
          >
            <Track size="md">
              <Figure image={SMALL} caption={CAPTION} note={NOTE} />
              <Figure image={SMALL} caption={CAPTION} note={NOTE} />
            </Track>
          </Specimen>
          <Specimen
            title="326 · mobile column"
            note="The width every image is approved at (ch05 B3): a 390 viewport less two 32px gutters, derived by the harness from --viewport-390 and --sec-gutter rather than written. Wide capture, portrait and the small asset, each at the full 326. Read the pixels, not the layout — the wide capture's type is where a whole-screen capture fails this check, and that failure belongs to the asset, not to Figure."
          >
            <div className={s.trackMobile}>
              <Layout rowGap="stack">
                <Figure image={WIDE} caption={CAPTION} note={NOTE} />
                <Figure image={TALL} caption={CAPTION} note={NOTE} />
                <Figure image={SMALL} caption={CAPTION} note={NOTE} />
              </Layout>
            </div>
          </Specimen>
          <Specimen
            title="192px tracks — the floor"
            note="Where the caption starts breaking on short lines. This is the smallest track the component claims to be readable in, and it is Layout's own xs track rather than a number this page invented."
          >
            <Track size="xs">
              <Figure image={SMALL} caption={CAPTION} note={NOTE} />
              <Figure image={SMALL} caption={CAPTION} note={NOTE} />
            </Track>
          </Specimen>
          <Specimen
            title="Row 9 — a parent that does not size it"
            note="A Cluster is a wrapping row, not a grid: it hands its children no track at all, so each figure is sized by its own content — the image one by its 320px asset, the text one by its longest line. Nothing collapses, because a figure's content is self-sizing."
          >
            {/* block, not gutter: Cluster caps at block on purpose — a wrapping row has no use
                for a 48px block beat. The seam is the parent's either way. */}
            <Cluster colGap="block" rowGap="block" align="start">
              <Figure image={SMALL} caption={CAPTION} note={NOTE} />
              <Figure caption="No image, in the same unsized row." note={NOTE} />
            </Cluster>
          </Specimen>
          <Specimen
            title="Row 9 — the floor, made visible by what does NOT fit"
            note="Two two-word captions in a Cluster inside a 384px track. Their content wants about 60px each, so without a floor they would sit side by side with room to spare. They stack instead, because min-inline-size: min(100%, --fig-min-xs) holds each at 192 and 192 + 24 + 192 overflows 384. That wrap IS the floor — the only way to see the width of a box that paints nothing."
          >
            <Track size="lg">
              <Cluster colGap="block" rowGap="block" align="start">
                <Figure caption="Two words." />
                <Figure caption="Two more." />
              </Cluster>
            </Track>
          </Specimen>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>10 · Kinds, through Media</h2>
            <p>
              Since tracker 2.7 the image is a <code>Media</code>, so its edge follows the
              asset&rsquo;s <code>kind</code> (ch05 §2, §2a, §4a) and Figure draws none of its
              own. Every figure above carries no kind and renders as a capture (ruling M3),
              which is why those bands look exactly as they did. Radius is 0 on every kind (§6).
              The caption is still required, and caption-only is still first-class (band 2).
            </p>
          </Layout>
          <Layout columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack" align="start">
            {KINDS.map(({ title, note, image, caption }) => (
              <Specimen key={title} title={title} note={note}>
                <Figure image={image} caption={caption} />
              </Specimen>
            ))}
          </Layout>
        </Layout>
      </Section>
    </>
  );
}
