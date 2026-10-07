import type { ReactNode } from 'react';

import {
  Layout,
  Media,
  mediaSrcSet,
  Section,
  type MediaImage,
  type MediaRatio,
  type SectionSurface,
} from '@/components';
import { cropScale, getKitPhoto, type PhotoId } from '@/lib/photos';

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

/* `art`: a service illustration and its numbered cut (scripts/illustrations-phone.mjs), one viewBox. */
const ART_DRAWING: MediaImage = {
  src: '/illustrations/services/product-design.paper.svg',
  alt: '',
  width: 962,
  height: 714,
  kind: 'illustration',
};
const ART_CUT = '/illustrations/services/product-design.paper.phone.svg';

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
/* The harness's 326 mobile column. */
const SIZES_MOBILE = '326px';

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
    note: 'No edge, the photograph radius 8 (--media-photo-radius, visual-direction § 5.3), never masked (§3).',
  },
];

/* ── Section 9's photographs ──────────────────────────────────────────────────────
   One registry photo per ratio, each at a placement § 5.4 admits it to; `box` is the placement's
   inline size at 1470, the number the resolution note divides by. */
const PLACEMENT_FOR: Record<MediaRatio, string> = {
  '4/5': 'B, K and L-photo: the media split',
  '5/4': 'the photograph hero',
  '3/1': 'I banner below its head',
  '4/1': 'the title-led hero panorama (PageHero display; /design/kit/hero)',
  '2/1': 'the title-led hero wide shape, its default (PageHero display)',
  '3/2':
    'banner beside, the head-track aside, and every card box (BlockCard and ListCard crop at 3:2)',
  '16/9':
    '§ 5.4 names it for card sets of three or more; no card renders it (cards crop at 3:2)',
  '4/3': '§ 5.4 names it for the horizontal card; no card renders it (cards crop at 3:2)',
  '1/1': 'portraits',
};

const RATIO_ROW: readonly { ratio: MediaRatio; id: PhotoId; box: number }[] = [
  { ratio: '4/5', id: 'studio-sticky-board-ux', box: 477 },
  { ratio: '5/4', id: 'whiteboard-two-hands', box: 572 },
  { ratio: '3/2', id: 'studio-session-talk', box: 381 },
  { ratio: '1/1', id: 'portrait-woman-grey', box: 477 },
];

/* Section 9b's row: the same three crops on tint, ink and blue, each at a placement § 5.4 admits. */
const SURFACE_ROW: readonly { ratio: MediaRatio; id: PhotoId; box: number }[] = [
  { ratio: '4/5', id: 'studio-sticky-board-ux', box: 477 },
  { ratio: '3/2', id: 'studio-session-talk', box: 381 },
  { ratio: '1/1', id: 'portrait-woman-grey', box: 477 },
];

/** The capture hairline each 9b band shows, from media.css's surface blocks. */
const SURFACE_RULE: Record<'tint' | 'ink' | 'blue', string> = {
  tint: 'neutral-400 on tint',
  ink: 'neutral-700 on ink',
  blue: 'brandeis-300 on blue',
};

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

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>3c · The panel inset: gutter and text</h2>
            <p>
              <code>inset</code> is the one geometry a placement chooses, and only between two
              gap-scale steps. <code>gutter</code> (<code>--gap-gutter</code>, 32) is the
              default and every full-column, track and card placement keeps it.{' '}
              <code>text</code> (<code>--gap-text</code>, 16, &ldquo;cell padding&rdquo;) is for
              a small box, where 32 on each side leaves no part to recognise — ListCard&rsquo;s
              160 × 107 thumbnail kept 96 × 43 of part at <code>gutter</code> and keeps 128 × 75
              at <code>text</code>. Only a cut-out takes a panel, so it is the only kind with an
              inset; each panel ground is shown at both steps, in <code>intrinsic</code> and in{' '}
              <code>fill</code> (29 Sep 2026, tracker 2.17).
            </p>
          </Layout>
          <Quarters>
            {(['paper-deep', 'paper', 'ink'] as const).flatMap((panel) =>
              (['gutter', 'text'] as const).map((inset) => (
                <Specimen
                  key={`${panel}-${inset}`}
                  title={`panel: ${panel} · inset: ${inset}`}
                  note={
                    inset === 'gutter'
                      ? 'The default: 32 of panel round the part.'
                      : '16 of panel round the part.'
                  }
                >
                  <Media image={{ ...PANEL_PART, panel }} sizes={SIZES_QUARTER} inset={inset} />
                </Specimen>
              )),
            )}
            {(['gutter', 'text'] as const).map((inset) => (
              <Specimen
                key={`fill-${inset}`}
                title={`fill, 3:2 · inset: ${inset}`}
                note="The panel fills the parent's box; the part covers the content box inside the inset."
              >
                <div className={s.ratioCard}>
                  <Media
                    image={{ ...PANEL_PART, panel: 'paper-deep' }}
                    sizes={SIZES_QUARTER}
                    fit="fill"
                    inset={inset}
                  />
                </div>
              </Specimen>
            ))}
          </Quarters>
          <Halves>
            {(['gutter', 'text'] as const).map((inset) => (
              <Specimen
                key={`thumb-${inset}`}
                title={`ListCard thumbnail box — 160, 3:2 · inset: ${inset}`}
                note={
                  inset === 'gutter'
                    ? '96 × 43 of part: fails ch05 § 9’s 160 check. Not what ListCard passes.'
                    : '128 × 75 of part — what ListCard passes, and the reason the prop exists.'
                }
              >
                <div className={s.ratioThumb}>
                  <Media
                    image={{ ...PANEL_PART, panel: 'paper-deep' }}
                    sizes="160px"
                    fit="fill"
                    inset={inset}
                  />
                </div>
              </Specimen>
            ))}
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
            <h2>6 · Fit: intrinsic, fill and contain</h2>
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
          <Halves>
            <Specimen
              title="contain, illustration, 3:2"
              note="fit='contain': the same parent-sized box, but the whole asset shows, centred, at the largest size that fits. For an object a crop would damage — here the drawing's labels. The parent gives it its air (BlockCard's illustration covers)."
            >
              <div className={s.ratioCard}>
                <Media image={ILLUSTRATION} sizes={SIZES_HALF} fit="contain" />
              </div>
            </Specimen>
            <Specimen
              title="contain, cut-out, 3:2"
              note="The part keeps its whole edge and its shadow instead of being cut at the box. Compare 'fill, in a 3:2 box' above, which crops the run button off."
            >
              <div className={s.ratioCard}>
                <Media image={{ ...CUT_OUT, shadow: true }} sizes={SIZES_HALF} fit="contain" />
              </div>
            </Specimen>
          </Halves>
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
            <h2>8 · The 326 row</h2>
            <p>
              Every kind in the mobile column — 326, a 390 viewport less Section&rsquo;s two
              gutters, the width ch05 B3 approves every image at. The harness&rsquo;s{' '}
              <code>trackMobile</code> frame puts that column on the 1440 capture beside the
              wide bands; the 390 capture of this page renders every band above in the real one.
            </p>
          </Layout>
          <Layout columns="fit" minTrack="lg" colGap="gutter" rowGap="stack" align="start">
            {KINDS.map(({ label, image }) => (
              <Specimen key={label} title={`${label} at 326`}>
                <div className={s.trackMobile}>
                  <Media image={image} sizes={SIZES_MOBILE} />
                </div>
              </Specimen>
            ))}
          </Layout>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>9 · Photographs: ratio, focus and the photograph radius</h2>
            <p>
              A photograph whose box is Media&rsquo;s own &mdash; B, K, the banner, the aside,
              the hero photograph &mdash; is cut to one of seven ratios with <code>ratio</code>,
              and the cover crop is anchored at the record&rsquo;s focal point (
              <code>focus</code>, from the catalogue). Every photograph carries the 8px
              photograph radius and no frame; a capture keeps radius 0 and its hairline
              (visual-direction § 5.3). The photos come from the kit registry,{' '}
              <code>getKitPhoto</code>, with their derived 1240 · 652 · 320 rungs. Each tile
              names the crop&rsquo;s resolution against its box at 1470 (§ 5.4: ≥ 1.9×). A
              placement whose crop changes with its arrangement passes{' '}
              <code>ratio=&#123;&#123; base, lg &#125;&#125;</code> instead: one ratio below
              1024, another from it.
            </p>
          </Layout>
          <Quarters>
            {RATIO_ROW.map(({ ratio, id, box }) => (
              <Specimen
                label="below"
                key={ratio}
                title={`ratio ${ratio.replace('/', ':')} · ${id}`}
                note={`${PLACEMENT_FOR[ratio]}. At ${box}px the crop is ${cropScale(id, ratio, box).toFixed(2)}× the box.`}
              >
                <Media image={getKitPhoto(id)} sizes={SIZES_QUARTER} ratio={ratio} />
              </Specimen>
            ))}
          </Quarters>
          <Halves>
            <Specimen
              label="below"
              title="ratio 16:9 · workshop-hands-writing"
              note={`${PLACEMENT_FOR['16/9']}. At 392px the crop is ${cropScale('workshop-hands-writing', '16/9', 392).toFixed(2)}× the box.`}
            >
              <Media
                image={getKitPhoto('workshop-hands-writing')}
                sizes={SIZES_HALF}
                ratio="16/9"
              />
            </Specimen>
            <Specimen
              label="below"
              title="ratio 4:3 · pair-laptop-notebook"
              note={`${PLACEMENT_FOR['4/3']}. At 604px the crop is ${cropScale('pair-laptop-notebook', '4/3', 604).toFixed(2)}× the box.`}
            >
              <Media
                image={getKitPhoto('pair-laptop-notebook')}
                sizes={SIZES_HALF}
                ratio="4/3"
              />
            </Specimen>
          </Halves>
          <Halves>
            <Specimen
              label="below"
              title="ratio { base: 4:3, lg: 4:5 } · studio-sticky-board-ux"
              note={`One crop below 1024 and another from it: the B split's, 4:5 beside its copy and 4:3 above it on a phone (§ 3.7 item 4). Two named breakpoints only, because the ratio follows the arrangement and arrangements change at 1024. This tile is 4:5 in the 1440 capture and 4:3 in the 390 one. At 604px the 4:5 crop is ${cropScale('studio-sticky-board-ux', '4/5', 604).toFixed(2)}× the box.`}
            >
              <Media
                image={getKitPhoto('studio-sticky-board-ux')}
                sizes={SIZES_HALF}
                ratio={{ base: '4/3', lg: '4/5' }}
              />
            </Specimen>
            <Specimen
              label="below"
              title="the same photo, ratio 4:5 at every width"
              note="The control: a bare MediaRatio is one crop at every width, so this tile stays 4:5 in the 390 capture while the pair beside it cuts to 4:3 (408 tall at 326, against 244)."
            >
              <Media
                image={getKitPhoto('studio-sticky-board-ux')}
                sizes={SIZES_HALF}
                ratio="4/5"
              />
            </Specimen>
          </Halves>
          <Specimen
            label="below"
            title="ratio 3:1 · sticky-wall-soft-focus"
            note={`${PLACEMENT_FOR['3/1']}. At 1240px the crop is ${cropScale('sticky-wall-soft-focus', '3/1', 1240).toFixed(2)}× the box.`}
          >
            <Media
              image={getKitPhoto('sticky-wall-soft-focus')}
              sizes={SIZES_FULL}
              ratio="3/1"
            />
          </Specimen>
          <Quarters>
            <Specimen
              label="below"
              title="focus from the record"
              note="pair-desk-through-plants, 4:5, anchored at its catalogue focal point (0.6, 0.45): the pair at the desk."
            >
              <Media
                image={getKitPhoto('pair-desk-through-plants')}
                sizes={SIZES_QUARTER}
                ratio="4/5"
              />
            </Specimen>
            <Specimen
              label="below"
              title="focus on the prop — crop from the right"
              note="The same record, the placement's override { x: 1, y: 0.5 }: the crop moves off the leaves on the left (§ 5.6's 'crop from the right')."
            >
              <Media
                image={getKitPhoto('pair-desk-through-plants')}
                sizes={SIZES_QUARTER}
                ratio="4/5"
                focus={{ x: 1, y: 0.5 }}
              />
            </Specimen>
            <Specimen
              label="below"
              title="photograph, intrinsic"
              note="No ratio: the whole frame at its own 3:2, still radius 8 and no frame."
            >
              <Media image={getKitPhoto('hands-sticky-blue-pen')} sizes={SIZES_QUARTER} />
            </Specimen>
            <Specimen
              label="below"
              title="capture beside it: radius 0, hairline"
              note="ratio is passed and IGNORED (a development warning): a capture renders whole (H3)."
            >
              <Media image={CAPTURE} sizes={SIZES_QUARTER} ratio="4/5" />
            </Specimen>
          </Quarters>
          <Halves>
            <Specimen
              label="below"
              title="art · a numbered cut below 1440"
              note="art={[{ media: '(max-width: 1439.98px)', src: …phone.svg }]}: a <picture> whose <source> swaps in a different FILE where the query matches, the <img> the fallback that carries alt, loading and priority. The drawing at 1440 and up, its numbered cut below (this tile shows the cut in the 390 capture). Not resolution switching — that is the record's sources."
            >
              <Media
                image={ART_DRAWING}
                sizes={SIZES_HALF}
                art={[{ media: '(max-width: 1439.98px)', src: ART_CUT }]}
              />
            </Specimen>
            <Specimen
              label="below"
              title="the same drawing, no art"
              note="The control: a bare <img>, the drawing with its own labels at every width."
            >
              <Media image={ART_DRAWING} sizes={SIZES_HALF} />
            </Specimen>
          </Halves>
          <Specimen
            label="below"
            title="what the gates read"
            note="Every photograph emits its master's pixels and its measured tone on the <img>, for fold:check's resolution and tone rules. A stand-in cover also carries data-stand-in. None of it is visible."
          >
            <Layout rowGap="text">
              <div className={s.trackMd}>
                <Media
                  image={getKitPhoto('studio-whiteboard-crit', { standIn: true })}
                  sizes="384px"
                  ratio="3/2"
                />
              </div>
              <p className={s.specNote}>
                <code>
                  data-src-w=&quot;898&quot; data-src-h=&quot;610&quot;
                  data-photo-temp=&quot;neutral&quot; data-photo-sat=&quot;quiet&quot;
                  data-stand-in
                </code>
              </p>
              <SrcSet image={getKitPhoto('studio-whiteboard-crit')} />
            </Layout>
          </Specimen>
        </Layout>
      </Section>

      {(['tint', 'ink', 'blue'] as const).map((surface) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="stack">
            <Layout rowGap="block">
              <h2>9b · Photographs on {surface}</h2>
              <p>
                A photograph reads no surface token: no frame, the same 8px radius and the same
                crop on every ground. The capture beside them is the control &mdash; its
                hairline is the one edge here that steps with the surface (
                {SURFACE_RULE[surface]}).
              </p>
            </Layout>
            <Quarters>
              {SURFACE_ROW.map(({ ratio, id, box }) => (
                <Specimen
                  key={ratio}
                  label="below"
                  title={`ratio ${ratio.replace('/', ':')} · ${id}`}
                  note={`${PLACEMENT_FOR[ratio]}. ${cropScale(id, ratio, box).toFixed(2)}× at ${box}px.`}
                >
                  <Media image={getKitPhoto(id)} sizes={SIZES_QUARTER} ratio={ratio} />
                </Specimen>
              ))}
              <Specimen
                label="below"
                title="capture: radius 0, hairline"
                note="The surface's rule ink, and ratio ignored (H3)."
              >
                <Media image={CAPTURE} sizes={SIZES_QUARTER} ratio="4/5" />
              </Specimen>
            </Quarters>
          </Layout>
        </Section>
      ))}

      <Section surface="ink">
        <Layout rowGap="block">
          <h2>10 · Nested surface</h2>
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
