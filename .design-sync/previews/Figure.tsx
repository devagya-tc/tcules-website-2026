import { Figure, Layout, Section } from 'tcules-website-2026';

/* NOTE: these preview files are type-STRIPPED, not type-checked (see .design-sync/NOTES.md), so an
   invalid prop value fails silently at render. Two things to keep honest here: `Figure` has NO
   `className`, `children` or DOM spread — it is a closed record of three props — and it has no
   `size`, `width` or `crop`, because the parent decides the width and nothing crops. */

/* Every image source is inlined. A preview renders outside the Next app, so the `/public` paths the
   specimen route uses resolve to nothing here and fail as a broken frame the render check does not
   flag. These are the same three shapes as `/design/figure`, simplified: what matters is that they
   are LIGHT — a near-white UI screenshot is the case the hairline exists for. */
const svg = (body, w, h) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">` +
      `<rect width="${w}" height="${h}" fill="#fdfdfb"/>${body}</svg>`,
  );

/* Wide, 16:9 — an approval queue with a toolbar, five rows and a comparison chart. */
const WIDE = {
  src: svg(
    '<rect width="1600" height="72" fill="#f3f1ea"/><circle cx="44" cy="36" r="10" fill="#c3dd2a"/>' +
      '<path d="M74 30h150v12H74z" fill="#71706a"/><rect x="1360" y="20" width="200" height="32" rx="6" fill="#0048ff"/>' +
      '<rect y="72" width="248" height="828" fill="#f8f7f2"/>' +
      '<path d="M32 118h140v10H32zm0 44h112v10H32zm0 44h150v10H32z" fill="#91908d"/>' +
      '<path d="M296 120h260v14H296zm0 34h420v10H296z" fill="#504f49"/>' +
      '<path d="M296 200h1272v1H296zm0 68h1272v1H296zm0 68h1272v1H296zm0 68h1272v1H296z" fill="#e5e1d6"/>' +
      '<path d="M312 222h180v9H312zm240 0h120v9H552zm-240 68h204v9H312zm240 0h150v9H552zm-240 68h168v9H312z" fill="#71706a"/>' +
      '<path d="M1440 216h96v20h-96zm0 136h96v20h-96z" fill="#c3dd2a"/>' +
      '<path d="M336 700h60v140h-60zm104-40h60v180h-60zm104-64h60v244h-60zm104 32h60v212h-60zm104-88h60v300h-60z" fill="#0048ff"/>' +
      '<path d="M856 664h60v176h-60zm104-28h60v204h-60zm104 44h60v160h-60zm104-72h60v232h-60z" fill="#b8c8ff"/>' +
      '<path d="M312 848h1224v1H312z" fill="#91908d"/>',
    1600,
    900,
  ),
  alt: 'Approval queue with five rows, two status chips and a ten-bar comparison chart.',
  width: 1600,
  height: 900,
};

/* Tall, roughly 9:13 — a settings column. Proves the intrinsic-ratio decision on a portrait asset. */
const TALL = {
  src: svg(
    '<rect width="720" height="64" fill="#f3f1ea"/><path d="M28 26h132v12H28z" fill="#504f49"/>' +
      '<circle cx="680" cy="32" r="12" fill="#c3dd2a"/><path d="M40 116h300v16H40z" fill="#504f49"/>' +
      '<path d="M40 152h520v10H40zm0 26h420v10H40z" fill="#91908d"/>' +
      '<path d="M40 220h640v1H40zm0 116h640v1H40zm0 116h640v1H40zm0 116h640v1H40zm0 116h640v1H40z" fill="#e5e1d6"/>' +
      '<path d="M40 252h180v10H40zm0 28h280v8H40zm0 88h204v10H40zm0 28h240v8H40zm0 88h168v10H40zm0 28h300v8H40zm0 88h192v10H40z" fill="#71706a"/>' +
      '<rect x="596" y="246" width="84" height="28" rx="14" fill="#0048ff"/>' +
      '<rect x="596" y="478" width="84" height="28" rx="14" fill="#0048ff"/>' +
      '<rect x="596" y="362" width="84" height="28" rx="14" fill="#cfcfce"/>' +
      '<rect x="40" y="820" width="640" height="152" rx="8" fill="#f3f1ea"/>' +
      '<path d="M64 852h240v12H64zm0 32h420v9H64z" fill="#71706a"/>',
    720,
    1040,
  ),
  alt: 'Settings column with six labelled rows, three toggles and a footer panel.',
  width: 720,
  height: 1040,
};

/* Small, 8:5 — one metric tile. Small enough that a wide track upscales it visibly. */
const SMALL = {
  src: svg(
    '<path d="M24 28h96v10H24z" fill="#91908d"/><path d="M24 56h124v34H24z" fill="#292824"/>' +
      '<path d="M160 66h44v20h-44z" fill="#c3dd2a"/><path d="M24 116h272v1H24z" fill="#e5e1d6"/>' +
      '<path d="M24 152h32v28H24zm48-8h32v36H72zm48-16h32v52h-32z" fill="#0048ff"/>' +
      '<path d="M168 160h32v20h-32zm48-12h32v32h-32zm48-20h32v52h-32z" fill="#b8c8ff"/>',
    320,
    200,
  ),
  alt: 'Single metric tile with a delta chip above a six-bar sparkline.',
  width: 320,
  height: 200,
};

const CAPTION = 'Fictional approval-queue surface.';
const NOTE = 'Bars compare 31 current records with a projected set.';

/**
 * Figure — an image with a caption and an optional quieter note.
 *
 * **Three props, and none of them is a width.** `image`, `caption`, `note`. The figure fills
 * whatever inline space its parent gives it, at the image's own intrinsic ratio, and that is the
 * whole sizing contract: whether a screenshot runs the width of the text or the width of the
 * section is the PAGE's decision, made by the `Layout` track or `Section` around it. There is no
 * `size`, no `width`, no `crop` and no `aspectRatio`, deliberately — building the width in would
 * give two places the power to disagree about it.
 *
 * **Nothing is cropped, ever.** The images this site carries are product screenshots: light,
 * detailed, full of small type. Any fixed ratio cuts that type out of some of them, which is why
 * `ListCard`'s and `BlockCard`'s fixed 3:2 centre crop — right for a marker and for a tile, where a
 * set has to line up — is deliberately not generalised here. A portrait asset gets taller as its
 * track widens. That is the honest consequence, not a bug.
 *
 * **`caption` is required; `image` and `note` are both optional.** A caption with no image is a
 * first-class rendering rather than a degraded one — see `EmptyState`. Both text props are `string`
 * and not nodes, which is what makes "text laid over the image" and "a link smuggled into a
 * caption" impossible to express rather than merely discouraged.
 *
 * The note is a SECOND CAPTION, not a callout: it belongs to the image, moves with it, sets quieter
 * than the caption above it, and says what the image does NOT establish.
 *
 * It paints no ground and takes no `surface` — it reads `data-surface` from the `Section` above it.
 * Nothing in it is interactive, so it has no hover, focus, pressed or disabled state at all.
 *
 * **In long-form content a figure is its own BLOCK, beside the prose, never inside it.** An article
 * alternates: rich text, then a figure, then rich text. An image never arrives inside a rich-text
 * body string, because a body string cannot carry the note, the hairline or a choice of width.
 */
export function Default() {
  return <Figure image={WIDE} caption={CAPTION} note={NOTE} />;
}

/**
 * The slot ladder, and what an absent slot does: it renders no element AND no seam. No note means
 * no eight-pixel gap sitting empty under the caption; no image means no `<img>`, no hairline and no
 * sixteen-pixel gap above the legend.
 *
 * Side by side rather than stacked so the two legends compare at a glance — and because a card cell
 * fits roughly one full-width figure, which is a property of the frame rather than of the component.
 */
export function SlotLadder() {
  return (
    <Layout columns={2} colGap="gutter" rowGap="gutter">
      <Figure image={SMALL} caption={CAPTION} />
      <Figure image={SMALL} caption={CAPTION} note={NOTE} />
    </Layout>
  );
}

/**
 * The empty state — a caption and note with no image, and the most consequential decision in the
 * component. There is no placeholder box, no reserved space and no broken-image glyph.
 *
 * A placeholder promises an image that is coming. These evidence notes explain a PERMANENT absence:
 * they are written to be read alone, and rendering the text by itself is the only option that is
 * true of them.
 */
export function EmptyState() {
  return (
    <Figure
      caption="Code-rendered evidence note."
      note="The original screenshot is omitted because its unfinished values cannot support an operational battery decision."
    />
  );
}

/**
 * Three intrinsic ratios in three EQUAL tracks, uncropped: 16:9, 9:13 and a small 8:5. Nothing is
 * letterboxed or padded to a common shape, so the three bottom edges land at three different
 * heights — which is the whole decision, visible in one glance.
 *
 * Three across rather than stacked, because the point is a comparison and because a stacked set of
 * full-width figures runs past any card cell: a 16:9 image at 1280 is already 720px before its
 * legend. The track is narrower here than in `Default`; what matters is that all three share it.
 *
 * If such a set needs matching heights, that is `equalRows` on the parent `Layout` — the parent's
 * tool, not the figure's.
 */
export function Shapes() {
  return (
    <Layout columns={3} colGap="gutter" rowGap="gutter">
      <Figure image={WIDE} caption="Wide — 1600×900." />
      <Figure image={TALL} caption="Tall — 720×1040." />
      <Figure image={SMALL} caption="Small — 320×200, upscaled." />
    </Layout>
  );
}

/**
 * Two adjacent figures, same asset, different legends — so what varies between neighbours is the
 * text rather than the image. Two figures in sequence is an expected pattern rather than a bug.
 *
 * The parent owns the gap: neither figure sets any outer spacing of its own, so `colGap` here is the
 * only thing that moves that distance. `Shapes` above is where the mismatched-height case lives.
 */
export function TwoUp() {
  return (
    <Layout columns={2} colGap="gutter" rowGap="gutter">
      <Figure image={SMALL} caption="Caption only." />
      <Figure image={SMALL} caption="Caption and note." note={NOTE} />
    </Layout>
  );
}

/**
 * In a narrow track. The image scales down with the track at its own ratio and the legend's measure
 * goes inert once the column is narrower than it. 192px is the floor below which the caption starts
 * breaking on very short lines; `columns="tile"` holds the track at exactly its named width instead
 * of stretching it.
 */
export function NarrowTrack() {
  return (
    <Layout columns="tile" minTrack="md" colGap="gutter" rowGap="gutter">
      <Figure image={SMALL} caption={CAPTION} note={NOTE} />
      <Figure image={SMALL} caption={CAPTION} note={NOTE} />
    </Layout>
  );
}

/**
 * On tint. The caption steps DARKER than it is on paper — neutral-800 rather than neutral-700 —
 * because the note has to step up to 700 on this ground (neutral-600 measures 4.39:1 here and fails
 * as text), and the two share one type role with no other difference between them, so a collision
 * would be total. The hairline steps with the ground, neutral-300 to neutral-400.
 */
export function OnTint() {
  return (
    <Section surface="tint">
      <Figure image={WIDE} caption={CAPTION} note={NOTE} />
    </Section>
  );
}

/**
 * On ink the neutrals invert and lift — caption to 300, note to 400 — but the hairline DROPS to
 * neutral-700 rather than following them, all but disappearing into the ground. A light screenshot
 * on a near-black band already has all the edge it needs from its own pixels; a pale rule there
 * would read as a second surface sitting on the dark one. This is the surface where the honest
 * amount of rule is almost none.
 */
export function OnInk() {
  return (
    <Section surface="ink">
      <Figure image={WIDE} caption={CAPTION} note={NOTE} />
    </Section>
  );
}

/**
 * On blue only the light end of the ramp clears AA: caption at brandeis-50, note at brandeis-100.
 * No third step is left, so the hairline goes the other way to brandeis-300 — darker than either
 * text ink. On a saturated ground, stepping toward the ground is what keeps the distinction slight.
 */
export function OnBlue() {
  return (
    <Section surface="blue">
      <Figure image={SMALL} caption={CAPTION} note={NOTE} />
    </Section>
  );
}
