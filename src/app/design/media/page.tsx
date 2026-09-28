import type { ReactNode } from 'react';

import {
  Layout,
  Media,
  mediaSrcSet,
  Section,
  type MediaImage,
  type SectionSurface,
} from '@/components';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/* ── The records ───────────────────────────────────────────────────────────────
   Real brand-framework assets (docs/brand/, ch05's own specimens), copied into public/design/media
   so the proving ground needs no external URL. Each carries the kind ch05 would assign it. The
   capture and the flow cut-out also carry derived widths made from their master with `sips`, so the
   srcset rows below choose between real files rather than four copies of one. None of them is the
   2560 master a production asset would be (ruling M2) — the numbers on each are its own. */

const DERIVED = (base: string, ext: string) =>
  [320, 652, 1240].map((width) => ({ src: `/design/media/${base}-${width}.${ext}`, width }));

const CAPTURE: MediaImage = {
  src: '/design/media/capture-listing.webp',
  alt: 'Listing editor with four bullet fields on the left and an AI assistance panel of benefit chips on the right.',
  width: 1436,
  height: 883,
  kind: 'capture',
  sources: DERIVED('capture-listing', 'jpg'),
};

const CUT_OUT: MediaImage = {
  src: '/design/media/cutout-flow.png',
  alt: 'Workflow node: an input connected to an AI feature card with a provider field, a file field and an output.',
  width: 1796,
  height: 1112,
  kind: 'cut-out',
  sources: DERIVED('cutout-flow', 'png'),
};

/* A light-UI part whose pale lavender edge does not hold 3:1 against paper — the B5 case. */
const PANEL_PART: MediaImage = {
  src: '/design/media/cutout-reviews.png',
  alt: 'Review-analysis panel: 64 user reviews summarised as benefit chips beside five empty benefit slots.',
  width: 855,
  height: 570,
  kind: 'cut-out',
};

const ILLUSTRATION: MediaImage = {
  src: '/design/media/illustration-seam.svg',
  alt: 'Illustration: a design plane and a build plane meeting at one seam, with a component lifted across it.',
  width: 881,
  height: 544,
  kind: 'illustration',
};

const PHOTOGRAPH: MediaImage = {
  src: '/design/media/photograph-portrait.png',
  alt: 'Portrait, head and shoulders, facing the camera in available light.',
  width: 292,
  height: 292,
  kind: 'photograph',
};

const TALL: MediaImage = {
  src: '/design/media/stress-tall.svg',
  alt: 'A settings column of twelve stacked rows above a footer panel.',
  width: 400,
  height: 2000,
  kind: 'capture',
};

const WIDE: MediaImage = {
  src: '/design/media/stress-wide.svg',
  alt: 'Five metric tiles in one row.',
  width: 2400,
  height: 300,
  kind: 'capture',
};

/* ── The sizes each arrangement on this page passes ──────────────────────────────
   Derived the way spec § 9 derives every placement's: Section's content column is
   min(100vw − 64, 1240) — the cap is reached at 1304 — and each Layout track is that column less
   its gutters, divided. Written out here because the placement, not Media, knows its width. */
const SIZES_FULL = '(min-width: 1304px) 1240px, calc(100vw - 64px)';
/* columns {base:1, md:2, lg:4}, colGap gutter (32). */
const SIZES_QUARTER =
  '(min-width: 1304px) 286px, (min-width: 1024px) calc(25vw - 40px), (min-width: 768px) calc(50vw - 48px), calc(100vw - 64px)';
/* columns {base:1, md:2}, colGap gutter (32). */
const SIZES_HALF =
  '(min-width: 1304px) 604px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 64px)';
/* A tile track at Layout's md width (320), which never exceeds the column. */
const SIZES_TRACK_MD = '320px';

const KINDS: readonly { label: string; image: MediaImage; note: string }[] = [
  {
    label: 'capture',
    image: CAPTURE,
    note: 'Hairline in the surface’s rule ink, radius 0, no shadow. Its one edge cue (ch05 §2).',
  },
  {
    label: 'cut-out',
    image: CUT_OUT,
    note: 'No edge: the silhouette is the frame, and the band shows through the alpha (§2a).',
  },
  {
    label: 'illustration',
    image: ILLUSTRATION,
    note: 'Never boxed: no edge, no panel, no shadow. Its edges are its own lines (§4a, B4).',
  },
  {
    label: 'photograph',
    image: PHOTOGRAPH,
    note: 'No edge, radius 0, never masked (§3, §6).',
  },
];

const SURFACE_NOTES: Record<SectionSurface, string> = {
  paper:
    'The capture’s hairline is neutral-300 (1.54:1) and does the most work here: a light screenshot on paper has no edge of its own. Cover it and the capture’s bottom edge disappears.',
  tint: 'The hairline steps with the ground to neutral-400 (1.90:1). The cut-out and the illustration show the tint through their alpha — nothing of theirs changes.',
  ink: 'The hairline DROPS to neutral-700 (2.10:1): a light capture on near-black already has its edge. The illustration here is its paper export, shown to make a point — an ink placement takes a second export recoloured per §4a, never this one.',
  blue: 'A reserved band (addendum D, C1). A capture, a cut-out and a photograph are legal on it; the illustration is NOT — its one solid blue plane disappears into the ground (§4a). It is rendered anyway, labelled, because Media cannot see the band it is in: the rule is enforced in review, and this is what review is looking for.',
};

/** One real Layout track of a named width — filling a narrower track is the contract, not an
    illegal placement, so this is a grid track rather than the harness's measuring frames. */
function Track({ size, children }: { size: 'xs' | 'md' | 'lg'; children: ReactNode }) {
  return (
    <Layout columns="tile" minTrack={size} colGap="gutter" rowGap="gutter">
      {children}
    </Layout>
  );
}

function Quarters({ children }: { children: ReactNode }) {
  return (
    <Layout columns={{ base: 1, md: 2, lg: 4 }} colGap="gutter" rowGap="stack" align="start">
      {children}
    </Layout>
  );
}

function Halves({ children }: { children: ReactNode }) {
  return (
    <Layout columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack" align="start">
      {children}
    </Layout>
  );
}

/** A srcset printed as the browser receives it, one candidate per line. */
function SrcSet({ image }: { image: MediaImage }) {
  const srcSet = mediaSrcSet(image);
  return (
    <p className={s.specNote}>
      {srcSet ? (
        <>
          srcset: <code>{srcSet}</code>
        </>
      ) : (
        <>
          no srcset — a single <code>src</code>, and no <code>sizes</code> emitted
        </>
      )}
    </p>
  );
}

export default function MediaSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Media</h1>
          <p>
            One image asset in one placement. It owns two things every image slot must get the
            same — the responsive delivery (a native <code>srcset</code> from the CMS&rsquo;s
            derived widths, and the <code>sizes</code> the placement states) and the
            brand&rsquo;s edge by kind — and nothing else. Width is always the parent&rsquo;s.
            There is no caption: that is <code>Figure</code>&rsquo;s.
          </p>
          <p className={s.specNote}>
            Every image below is a real asset from the brand framework. The 390 capture of this
            page is the 326 check (ch05 §2, B3): Section&rsquo;s column in a 390 viewport is
            exactly 326.
          </p>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>1 · The matrix: four kinds, one edge rule each</h2>
            <p>
              The only axis is <code>kind</code>, and it is a content fact about the asset, not
              a presentation choice — so it arrives on the record. Two further fields apply to
              one kind only: <code>panel</code> and <code>shadow</code> are cut-out fields
              (section 3).
            </p>
          </Layout>
          <Quarters>
            {KINDS.map(({ label, image, note }) => (
              <Specimen key={label} title={label} note={note}>
                <Media image={image} sizes={SIZES_QUARTER} />
              </Specimen>
            ))}
          </Quarters>
        </Layout>
      </Section>

      {(['paper', 'tint', 'ink', 'blue'] as const).map((surface) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="stack">
            <Layout rowGap="block">
              <h2>2 · Every kind on {surface}</h2>
              <p>{SURFACE_NOTES[surface]}</p>
            </Layout>
            <Quarters>
              {KINDS.map(({ label, image }) => (
                <Specimen
                  key={label}
                  title={
                    surface === 'blue' && label === 'illustration'
                      ? 'illustration — FORBIDDEN on blue'
                      : label
                  }
                  note={
                    surface === 'blue' && label === 'illustration'
                      ? 'ch05 §4a: "An illustration is not placed on blue." No runtime guard exists (spec § 17 Q3); this band is what a reviewer rejects.'
                      : undefined
                  }
                >
                  <Media image={image} sizes={SIZES_QUARTER} />
                </Specimen>
              ))}
            </Quarters>
          </Layout>
        </Section>
      ))}

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>3 · Cut-out: shadow and the contrast panel</h2>
            <p>
              A cut-out sits straight on the band by default. It may carry one shadow —{' '}
              <code>--shadow-crop</code>, drawn with <code>drop-shadow()</code> so it follows
              the silhouette rather than the transparent box. Where the part&rsquo;s own edge
              does not hold 3:1 against the ground, the asset is supplied with a{' '}
              <code>panel</code>: a flat brand ground filling the slot, the part inset by the
              container gutter, no hairline, no radius and no shadow of its own (§2a, B5, ruling
              M4).
            </p>
          </Layout>
          <Halves>
            <Specimen
              title="cut-out, no shadow"
              note="The default. The flow's own connectors and card edges hold against paper."
            >
              <Media image={CUT_OUT} sizes={SIZES_HALF} />
            </Specimen>
            <Specimen
              title="cut-out, shadow: true"
              note="One shadow, 0 0 6px at 8% neutral-950 — ch05's 12px at the 2560 master. Look at the connector ends: the shadow hugs the silhouette, not a rectangle."
            >
              <Media image={{ ...CUT_OUT, shadow: true }} sizes={SIZES_HALF} />
            </Specimen>
            <Specimen
              title="edge does not hold — no panel"
              note="The failure B5 exists for: the pale lavender card edge is under 3:1 against paper, so the part has no outline and floats."
            >
              <Media image={PANEL_PART} sizes={SIZES_HALF} />
            </Specimen>
            <Specimen
              title="panel: paper-deep"
              note="The same part on the paper-deep panel. The edge now holds against the panel, and the panel is a flat field — nothing else is added."
            >
              <Media image={{ ...PANEL_PART, panel: 'paper-deep' }} sizes={SIZES_HALF} />
            </Specimen>
            <Specimen
              title="panel: paper"
              note="For a part placed on tint or ink whose edge holds against paper. The panel is a fixed brand ground, not the band's: it is the same paper on every surface."
            >
              <Media image={{ ...PANEL_PART, panel: 'paper' }} sizes={SIZES_HALF} />
            </Specimen>
            <Specimen
              title="panel: ink, with shadow"
              note="The ink panel is for a dark-UI part; a light part is used here only to show the geometry. The part's one shadow stays on the part — the panel takes none (never stacked)."
            >
              <Media image={{ ...PANEL_PART, panel: 'ink', shadow: true }} sizes={SIZES_HALF} />
            </Specimen>
          </Halves>
        </Layout>
      </Section>

      <Section surface="ink">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>3b · The panels on ink</h2>
            <p>
              The panel does not change with the band. Paper-deep on ink is the same paper-deep
              as on paper, because it exists for the part&rsquo;s edge, not the band&rsquo;s.
            </p>
          </Layout>
          <Halves>
            <Specimen title="cut-out, no panel, on ink">
              <Media image={PANEL_PART} sizes={SIZES_HALF} />
            </Specimen>
            <Specimen title="panel: paper-deep, on ink">
              <Media image={{ ...PANEL_PART, panel: 'paper-deep' }} sizes={SIZES_HALF} />
            </Specimen>
          </Halves>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>4 · Fields a kind does not take</h2>
            <p>
              <code>panel</code> and <code>shadow</code> on anything but a cut-out are ignored,
              and the development server logs a <code>Media:</code> warning naming the asset. A
              warning rather than a throw: a wrong CMS field must not take a page down, and the
              fallback is the brand-correct rendering.
            </p>
          </Layout>
          <Quarters>
            <Specimen
              title="illustration + panel + shadow"
              note="Renders unboxed and unshadowed, exactly as section 1 — B4: never boxed, in any placement."
            >
              <Media
                image={{ ...ILLUSTRATION, panel: 'paper-deep', shadow: true }}
                sizes={SIZES_QUARTER}
              />
            </Specimen>
            <Specimen
              title="capture + shadow"
              note="Hairline only. A capture's one edge cue is its rule, and a shadow with a hairline is two (§2)."
            >
              <Media image={{ ...CAPTURE, shadow: true }} sizes={SIZES_QUARTER} />
            </Specimen>
            <Specimen
              title="photograph + panel"
              note="No panel: the panel is a cut-out device (§2a)."
            >
              <Media image={{ ...PHOTOGRAPH, panel: 'ink' }} sizes={SIZES_QUARTER} />
            </Specimen>
            <Specimen
              title="no kind — renders as a capture (M3)"
              note="The same record with kind removed. It is pixel-identical to the capture beside section 1's: every untagged image on a live route keeps today's hairline."
            >
              <Media image={{ ...CAPTURE, kind: undefined }} sizes={SIZES_QUARTER} />
            </Specimen>
          </Quarters>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>5 · Delivery: srcset, sizes and priority</h2>
            <p>
              The srcset is every derived width plus the master, ascending — read from whatever
              widths the CMS returned, never from format names. With no derived widths there is
              one <code>src</code> and no <code>sizes</code>. Every image is{' '}
              <code>loading=&quot;lazy&quot;</code> and <code>decoding=&quot;async&quot;</code>{' '}
              unless it is the page&rsquo;s LCP hero, which passes <code>priority</code> and
              gets <code>loading=&quot;eager&quot;</code> and{' '}
              <code>fetchpriority=&quot;high&quot;</code>. Inspect the elements to read the
              attributes; the chosen file is in the Network panel at each width.
            </p>
          </Layout>
          <Specimen
            title="with sources, full column, priority"
            note={`sizes: ${SIZES_FULL}. At 1440 on a 2× screen the browser wants 2480 and takes the master (1436 here; 2560 in production). At 390 on a 3× screen it wants 978 and takes 1240.`}
          >
            <Layout rowGap="text">
              <Media image={CAPTURE} sizes={SIZES_FULL} priority />
              <SrcSet image={CAPTURE} />
            </Layout>
          </Specimen>
          <Halves>
            <Specimen title="with sources, half column" note={`sizes: ${SIZES_HALF}`}>
              <Layout rowGap="text">
                <Media image={CUT_OUT} sizes={SIZES_HALF} />
                <SrcSet image={CUT_OUT} />
              </Layout>
            </Specimen>
            <Specimen
              title="no sources"
              note="A single-file asset: the illustration is vector, so it has none."
            >
              <Layout rowGap="text">
                <Media image={ILLUSTRATION} sizes={SIZES_HALF} />
                <SrcSet image={ILLUSTRATION} />
              </Layout>
            </Specimen>
          </Halves>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>6 · Fit: intrinsic against fill</h2>
            <p>
              <code>intrinsic</code> (the default) is 100% of the parent&rsquo;s width with the
              asset&rsquo;s own height — never cropped (ruling H3). <code>fill</code> covers a
              box whose ratio the <em>parent</em> owns, centre-cropped, for the placements that
              crop mechanically. The boxes here stand in for BlockCard&rsquo;s 3:2 media and
              ListCard&rsquo;s 160 thumbnail, and read their ratio tokens.
            </p>
          </Layout>
          <Halves>
            <Specimen title="intrinsic" note="1796×1112 at its own ratio.">
              <Media image={CUT_OUT} sizes={SIZES_HALF} />
            </Specimen>
            <Specimen
              title="fill, in a 3:2 box"
              note="The same asset covering a card's ratio. The crop is the box's."
            >
              <div className={s.ratioCard}>
                <Media image={CUT_OUT} sizes={SIZES_HALF} fit="fill" />
              </div>
            </Specimen>
            <Specimen
              title="fill, capture, 3:2"
              note="The hairline follows the box, not the asset. A capture in a cropping placement is a supply question (§2: captures run at full column only); the edge rule still holds."
            >
              <div className={s.ratioCard}>
                <Media image={CAPTURE} sizes={SIZES_HALF} fit="fill" />
              </div>
            </Specimen>
            <Specimen
              title="fill with a panel, 3:2"
              note="The panel fills the box and the part covers the inset content box inside it."
            >
              <div className={s.ratioCard}>
                <Media
                  image={{ ...PANEL_PART, panel: 'paper' }}
                  sizes={SIZES_HALF}
                  fit="fill"
                />
              </div>
            </Specimen>
          </Halves>
          <Specimen
            title="fill, ListCard thumbnail box — 160, 3:2"
            note="sizes: 160px — a fixed placement states a fixed width."
          >
            <div className={s.ratioThumb}>
              <Media image={CUT_OUT} sizes="160px" fit="fill" />
            </div>
          </Specimen>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>7 · Shape stress</h2>
            <p>
              Intrinsic means intrinsic. A 1:5 asset at full column is very tall, and Media does
              not clip it: a tall asset is a supply problem the 326 check catches, not a crop to
              add here (audit §3, PageHero). A 8:1 asset is a thin strip whose detail fails at
              326.
            </p>
          </Layout>
          <Halves>
            <Specimen
              title="very tall — 400×2000, half column"
              note="Rendered at 604×3020 at 1440. It does not stop."
            >
              <Media image={TALL} sizes={SIZES_HALF} />
            </Specimen>
            <Specimen
              title="very tall — in a 192 track"
              note="The same asset where it belongs, if anywhere."
            >
              <Track size="xs">
                <Media image={TALL} sizes="192px" />
              </Track>
            </Specimen>
          </Halves>
          <Specimen
            title="very wide — 2400×300, full column"
            note="155px tall at 1240; 41px at 326."
          >
            <Media image={WIDE} sizes={SIZES_FULL} />
          </Specimen>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>8 · The narrow row</h2>
            <p>
              Every kind in a 320 track — Layout&rsquo;s md, the nearest named track to the 326
              mobile column, so the 1440 capture shows the narrow case beside the wide ones. The
              true 326 check is this page&rsquo;s 390 capture, where every band above renders in
              the real 326 column.
            </p>
          </Layout>
          <Track size="md">
            {KINDS.map(({ label, image }) => (
              <Specimen key={label} title={`${label} at 320`}>
                <Media image={image} sizes={SIZES_TRACK_MD} />
              </Specimen>
            ))}
          </Track>
        </Layout>
      </Section>

      <Section surface="ink">
        <Layout rowGap="block">
          <h2>9 · Nested surface</h2>
          <p>
            An ink band, then a tint band holding a capture, then ink again. The capture&rsquo;s
            hairline must resolve tint&rsquo;s neutral-400, not ink&rsquo;s 700 — which is what
            the tint block restating its token buys.
          </p>
        </Layout>
      </Section>
      <Section surface="tint">
        <Track size="lg">
          <Specimen title="capture on tint, between two ink bands">
            <Media image={CAPTURE} sizes="384px" />
          </Specimen>
        </Track>
      </Section>
      <Section surface="ink">
        <Layout rowGap="block">
          <p>
            States: there are none. Nothing Media renders is interactive, so there is nothing to
            hover, hold or tab to, and no <code>--media-*</code> state token exists.
          </p>
        </Layout>
      </Section>
    </>
  );
}
