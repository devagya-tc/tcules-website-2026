# Media

## 0 · Front matter

| | |
|---|---|
| **Component** | `Media` |
| **Tier** | 1 primitive (`src/components/Media/`) |
| **Status** | implemented |
| **Token prefix** | `--media-*` (checked against the live taken list: no collision, and no reservation — no existing layer names a Media or Image component or holds a block waiting for one) |
| **Designer / date** | Claude Code, tracker 2.6 · 28 Sep 2026 |
| **Implements** | tracker 2.6; `docs/component-audit.md` §1 "Responsive image slot" and "Media ratios", §2 media-kind table; `docs/phase-2-decisions.md` M1–M4, H3 |
| **Revised** | **Tracker 2.17 / 29 Sep 2026** — `inset: 'gutter' \| 'text'` (owner-approved; § 3, § 7(a), § 17 Q2). The centre crop stays. |
| **Implemented at** | `src/components/Media/` · `src/styles/tokens/components/media.css` · `--shadow-crop` in `src/styles/tokens/primitives.css` · `src/content/sources/strapi/image.ts` · `/design/media` |

**How this spec was admitted.** Every design question in it was answered before it was written — by the owner
in `docs/phase-2-decisions.md` (cited by ruling ID throughout) and by the brand chapter (ch05 v1.0 §2, §2a,
§4a, §5, §6, §8, §9, and amendments B2–B5). It went straight to `accepted` with no BLOCKING question, and to
`implemented` in the same PR. §17 lists the calls the build had to make, each non-blocking and each with the
choice taken.

## 1 · Identity

The one way the site renders an image asset in a placement. It decides the two things every image slot
must get the same — **responsive delivery** (a native `srcset` from Strapi's own formats plus a `sizes` the
placement supplies, ruling M1) and **the brand's edge by kind** (capture hairline, cut-out silhouette,
illustration never boxed) — and nothing else.

**Tier 1, because it arranges nothing.** It renders one `<img>`, or that `<img>` inside a flat contrast
panel. It imports nothing but `@/lib/cx`. Every pattern with an image slot (Figure, PageHero, BlockCard,
ListCard, SiteNav's rail card) will compose it; Figure moves first (tracker 2.7).

**What it is NOT**

1. **Not a figure.** No caption, no note, no `<figure>`. A captioned image is `Figure`, which composes
   Media. ch05 §7's caption rules therefore live in Figure, not here.
2. **Not a crop owner.** `fit="fill"` covers a box whose ratio the *parent* already owns (BlockCard's 3:2,
   ListCard's thumbnail, the nav card's 16:7). Media holds no ratio token and no aspect-ratio; the ratio
   ladder is `--ratio-cover` and the patterns (tracker 2.3).
3. **Not a video or an embed.** PageHero's YouTube frame keeps its own 16:9 box; that box is the embed's
   ratio, not an image's (audit §3, PageHero).

**Nearest existing thing, and why this is not a prop on it.** Five patterns each render their own `<img>`
with one `src` (audit §1). Adding `srcset` and kind rules to each would be five copies of one decision; that
is exactly the duplication a primitive exists to remove.

**How many on a page.** Any number. At most one carries `priority` (the hero's LCP image).

## 2 · Anatomy

| Part | Element | Required | Carries |
|---|---|---|---|
| `image` | `<img>` | yes | `src`, `srcset`, `sizes`, `alt`, `width`, `height`, `loading`, `decoding`, `fetchpriority`; `--media-radius`; the capture hairline (`--media-capture-rule-width`, `--media-capture-rule-ink`); the cut-out shadow (`--media-cutout-shadow`) |
| `panel` | `<span>`, `display: block` | only when a cut-out carries `panel` | `--media-panel-inset` padding, or `--gap-text` at `inset="text"`; one of `--media-panel-paper-ground`, `--media-panel-paper-deep-ground`, `--media-panel-ink-ground` |

A `<span>` rather than a `<div>` so Media stays valid inside phrasing content (a card's link).

## 3 · Props / API

```ts
type MediaKind = 'capture' | 'cut-out' | 'illustration' | 'photograph'
type MediaPanel = 'paper' | 'paper-deep' | 'ink'
type MediaSource = { src: string; width: number }
type MediaImage = {
  src: string; alt: string; width: number; height: number   // the master (2560, ruling M2)
  kind?: MediaKind                                           // absent → capture (M3)
  panel?: MediaPanel                                         // cut-out only (M4)
  shadow?: boolean                                           // cut-out only
  sources?: readonly MediaSource[]                           // Strapi's formats, any widths
}
type MediaFit = 'intrinsic' | 'fill'
type MediaEdge = 'kind' | 'placement'
type MediaInset = 'gutter' | 'text'                          // 29 Sep 2026, 2.17
```

| Prop | Union | Default | Decides |
|---|---|---|---|
| `image` | `MediaImage` | required | the record — which file, its intrinsic size, what it is |
| `sizes` | `string` | required | the placement's rendered width, as a `sizes` list (§9) |
| `fit` | `'intrinsic' \| 'fill'` | `'intrinsic'` | intrinsic: 100% of the parent's inline size, height from the asset, never cropped (H3). fill: covers a parent-owned ratio box, anchored at `--media-fill-position` (0 20%, amendment 29 Sep) |
| `edge` | `'kind' \| 'placement'` | `'kind'` | kind: Media draws the edge the image's kind calls for. placement: the crop box around it rules every kind itself, so Media draws none — amendment · 29 Sep below |
| `inset` | `'gutter' \| 'text'` | `'gutter'` | the panel inset step, and only that. gutter: `--gap-gutter` (32), every full-column, track and card placement. text: `--gap-text` (16, "cell padding"), for a small box — ListCard's 160 × 107 thumbnail. Ignored when no panel renders (29 Sep 2026, 2.17) |
| `priority` | `boolean` | `false` | true: `loading="eager"`, `fetchpriority="high"`. false: `loading="lazy"`, `decoding="async"` |

**The record, and where its type lives.** `MediaImage` is Media's. The view model's `ImageRecord`
(`src/content/types.ts`) is the same shape, declared independently — the precedent `FigureImage` set — so a
page passes one straight to a pattern and neither side imports the other. `src/content/sources/strapi/image.ts`
is the one place a Strapi upload file (`url`, `width`, `height`, `alternativeText`, `formats`) becomes an
`ImageRecord`, with `sources` built from `formats` by width, never by format name. `kind`, `panel` and `shadow`
do not exist in Strapi yet (strapi-changes.md entries 3, 7 and 9) and arrive undefined.

**`kind`, `panel` and `shadow` are content, not presentation.** They say what the asset is and how it was
supplied, so they ride on the record. A placement cannot override them. The one thing a placement may say about the edge is
*who draws it* (`edge`), never *what it is*: `placement` hands the whole edge to the crop box and is closed,
so no call site can restyle a hairline, only take it over whole.

**Deliberately NOT props:** `surface` (read from the ancestor's `data-surface` through the token layer, like
every unit); `className`, `style`, `id` (a closed record — no call site can restyle an edge); `width`/`size`
(width is the parent's); `ratio`/`aspectRatio` (the parent owns it in `fill`, the asset in `intrinsic`);
`radius` (0 on every image, ch05 §6); `border` (decided by kind, or taken over whole by `edge`); `loading` (derived from `priority`);
`caption` (Figure's).

**Compile errors:** a partial master (any of `src`, `alt`, `width`, `height` missing); `sizes` omitted; a
`kind` or `panel` outside its union; any of the not-props above (no index signature, no attribute spread).

**Runtime, not compile-time, and why:** `panel` or `shadow` on a non-cut-out is legal to the type because
it arrives from a CMS, where a type cannot reach. It is ignored and the development server logs
`Media: … Ignored (<src>)`. A warning rather than a throw: a wrong field must not take a page down, and the
fallback is the brand-correct rendering.

## 4 · Variants × sizes

One axis, on the record: `kind` × its edge. No size axis — the size is the parent's.

| kind | Edge | Radius | Shadow | Panel | Allowed in (ch05, audit §2) |
|---|---|---|---|---|---|
| `capture` (and no kind, M3) | hairline, surface rule ink | 0 | never | never | full column only, only when the layout is the subject |
| `cut-out` | none — the silhouette | 0 | optional, one `--shadow-crop` | optional: paper · paper-deep · ink | every placement |
| `illustration` | none, ever | 0 | never | never | not on blue; not as case-study evidence |
| `photograph` | none | 0 | never | never | about, careers, bylines; never masked |

Plus `fit`: intrinsic · fill, orthogonal to kind.

**Rejected:** `fit: 'contain'` (the audit's first sketch said cover|contain). Intrinsic already shows the whole
asset at its own ratio; contain inside a fixed box would letterbox it with a ground the placement did not
choose, which ch05 §5 forbids ("no separate imagery fill colour"). A per-call `edge` prop — rejected for the
reason Figure rejected `border`: the edge follows from what the image is.

## 5 · States

None. Nothing Media renders is interactive; a link around an image is the pattern's element and the pattern's
state. No `--media-*` state token exists. Loading is not a state here either: the width and height attributes
reserve the box, and there is no skeleton or placeholder.

## 6 · Per-surface colour

One surface-dependent token. The panel grounds are fixed brand grounds, declared once in `:root` (below).

| Token | paper | tint | ink | blue |
|---|---|---|---|---|
| `--media-capture-rule-ink` | `--color-neutral-300` — 1.54:1, decoration | `--color-neutral-400` — 1.90:1, decoration | `--color-neutral-700` — 2.10:1, decoration | `--color-brandeis-300` — 2.64:1, decoration |

The house decorative ladder, duplicated by value from Figure (owner ruling on Figure's rule, 24 Aug 2026), not
read from it — a component never reads another component's tokens. When Figure moves onto Media (2.7) its own
rule token goes away. **paper**: the rule does the most work, because a light screenshot has no edge of its own
on paper. **tint**: steps with the ground. **ink**: drops to 700; a light capture on near-black already has its
edge. **blue**: steps toward the ground so the distinction stays slight.

**Fixed, surface-independent (M4, B5):** `--media-panel-paper-ground` `--color-paper` · `--media-panel-paper-deep-ground`
`--color-paper-deep` · `--media-panel-ink-ground` `--color-neutral-950`. A panel exists for the product UI's
edge, not the band's, so a `paper-deep` panel is paper-deep on every surface.

**Nested surfaces:** every surface block declares the one token, so a tint band inside ink resolves 400, not 700
(specimen band 9).

## 7 · Geometry & spacing

**(a) Distances:** `--media-panel-inset` = `--gap-gutter`. It separates a container's edge from the content it
holds, which is the container gutter by definition (Section's own gutter is the same step). Chosen by the
relationship, not by how it looks at one width; it does not shift responsively. Nothing else: the seam around an
image is the parent's.

**Amended 29 Sep 2026 (2.17): the placement may choose `inset="text"`.** A small BOX, not a narrow viewport,
is the one case the gutter does not serve: in ListCard's 160 × 107 thumbnail, 32 on each side left 96 × 43 of
part, which fails ch05 § 9's 160 check. `text` takes `--gap-text` ("cell padding" — the container-inset role for
a dense cell), leaving 128 × 75. It is read from the gap scale directly in `Media.module.css` (`.insetText`,
after `.panel` at equal specificity), not through a second `--media-*` name, because a token that only renamed
`--gap-text` is what token rule 6 forbids. Two named steps and no length, so a placement cannot split the
difference, and the step still does not shift responsively — a placement states it for its box at every width.

**(b) Sizes:** none of Media's own. Intrinsic: `inline-size: 100%`, `block-size: auto`. Fill: `inline-size:
100%`, `block-size: 100%`, `object-fit: cover`. The panel in fill mode takes `block-size: 100%`.

**(c) Optical corrections:** none.

**Radius** `--media-radius` = `--radius-0` (ch05 §6; SiteNav's `--radius-4` belongs to its card). **Border**
`--media-capture-rule-width` = `--border-width-hairline`, capture only. **Shadow** `--media-cutout-shadow` =
`--shadow-crop`, cut-out only, applied as `filter: drop-shadow()` so it follows the alpha silhouette (a
box-shadow would draw a rectangle round the transparent box — a frame §2a forbids). **Z:** none.

**New primitive, `--shadow-crop`:** ch05's `--img-crop-elevation`, "0 0 12px rgba(27, 27, 24, .08) at the 2560
export". 12 device px at the master is 6 CSS px in the 1240 column at 2×, so the token is `0 0 6px` with the
colour derived from `--color-neutral-950` at 8% (identical to the chapter's rgba). It is the second elevation
step, and it is not for UI (primitives.css says so).

## 8 · Typography

None — Media renders no text. `alt` is not rendered type.

## 9 · Responsive

Nothing in Media changes at 1023 or 767. The browser picks the file from `srcset` against `sizes`; the image
scales with its track.

**`srcset`** is built by `mediaSrcSet(image)`: every `sources` entry plus the master, de-duplicated by width
(the master wins a tie), ascending, `"<url> <w>w"`. No `sources`, or only the master → no `srcset` and no
`sizes` attribute: a single `src`. The ladder is 2560 · 1240 · 652 · 320 (M2, and ch05 §9 as corrected in this
PR), but nothing here knows it — a changed Strapi breakpoint changes nothing in code.

**`sizes`, per placement.** Section's column is `min(100vw − 64px, 1240px)` (`--sec-gutter` 32 each side,
`--sec-container` 1240), so the cap is reached at 1304px. Each value below is that column less the placement's
gutters, divided:

| Placement | `sizes` |
|---|---|
| Full column — Figure, PageHero stacked / below | `(min-width: 1304px) 1240px, calc(100vw - 64px)` |
| PageHero beside (1 : 1 from 1024, H2; `colGap="column"` 64 assumed) | `(min-width: 1304px) 588px, (min-width: 1024px) calc(50vw - 64px), calc(100vw - 64px)` |
| Two tracks, `colGap="gutter"` (BlockCard in two) | `(min-width: 1304px) 604px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 64px)` |
| Three tracks, `colGap="gutter"` (BlockCard in three) | `(min-width: 1304px) 392px, (min-width: 1024px) calc((100vw - 128px) / 3), calc(100vw - 64px)` — adjust the middle term to the pattern's own md arrangement |
| ListCard thumbnail | `160px` |
| SiteNav rail card | about `300px` beside the rail; the sheet width below it. Set when SiteNav migrates |

Each pattern states its own when it moves onto Media (2.7, 2.9–2.11); these are the derivations it starts from.
**28 Sep 2026 (2.9):** these values now live once in `src/lib/image-sizes.ts` (`FULL_COLUMN`, `HERO_BESIDE`,
`CARD_TWO_TRACKS`, `CARD_THREE_TRACKS`, `LIST_CARD_THUMBNAIL`, `NAV_CARD`), each commented with the tokens it restates.
PageHero reads it; Figure, BlockCard, ListCard and SiteNav should import from it as they migrate rather than restate a string.
At 390 the column is 326, so a 3× phone asks for 978 and gets 1240; a 2× desktop at the full column asks for
2480 and gets the 2560 master.

**Touch targets:** none; nothing is interactive.

## 10 · Composition

```jsx
// no panel
<img class="image intrinsic|fill [capture] [shadow]" … />
// cut-out with a panel
<span class="panel [panelFill] panelPaper|panelPaperDeep|panelInk">
  <img class="image intrinsic|fill [shadow]" … />
</span>
```

No arrangement at all, so no Layout or Cluster. The two `display: block` declarations de-inline an element;
neither arranges siblings. No margins. Nothing reaches a Section.

## 11 · Accessibility

`alt` is required by the type. An empty string is the decorative convention (ch05 §7) and is legal; it must not
restate a caption. Width and height attributes are always emitted, so the box is reserved before the file lands
(no layout shift). No ARIA, no ids, nothing focusable. The capture hairline is decoration and holds no contrast
floor. A screen reader announces the `alt` and nothing else. Reduced motion: nothing moves.

## 12 · Content edge cases

| Row | Handling |
|---|---|
| Longest string | n/a (no text); a 125-character alt is the chapter's limit and renders nowhere |
| Long unbroken token | n/a |
| Zero / one / many | one image per Media; any number per page |
| Missing optional slot | no `sources` → single `src`; no `kind` → capture (M3); no `panel` → none |
| Empty required-ish text | `alt=""` → decorative, rendered as an empty attribute, never omitted |
| Narrow track at 767 / 326 | scales with its track; band 8 of `/design/media` renders every kind at 326, and the 390 capture renders the whole page there |
| Parent that does not size it | intrinsic in an unsized flex row resolves `100%` against the row; the pattern gives it a track. No minimum of its own — a figure's 192 floor is Figure's |
| Logical properties | `inline-size`/`block-size` throughout |
| Nested surface | the rule token is declared on all four surfaces (§6) |
| Two adjacent | no outer spacing; the parent's gap |
| Interactive content in a slot | no slot |
| **Very tall asset** | rendered tall and uncropped; a supply problem the 326 check catches (audit §3) |
| **Very wide asset** | a thin strip; fails detail at 326, same answer |
| **Illustration on blue** | rendered as-is; forbidden by ch05 §4a and enforced in review (§17 Q3) |
| **panel/shadow on a non-cut-out** | ignored, development warning (§3) |
| **A format as wide as the master** | dropped by the seam; the master wins |

## 13 · Motion

None. No transition, no animation, no reduced-motion query.

## 14 · Do's and Don'ts

- **Do** pass a `sizes` derived from the placement's real track (§9). **Don't** pass `100vw` for anything that
  is not full-bleed — no image on this site is.
- **Don't** find `object-fit` anywhere but `.fill`, or `aspect-ratio` anywhere in `Media.module.css`.
- **Don't** find `box-shadow` in `Media.module.css`; the one shadow is `filter: drop-shadow(var(--media-cutout-shadow))`.
- **Don't** find a `border` on any image whose record says `cut-out`, `illustration` or `photograph` (inspect `/design/media` bands 1–4).
- **Do** see an identical rendering for a record with no kind and one with `kind: 'capture'` (band 4).
- **Don't** see a panel or shadow on the illustration, capture or photograph in band 4 despite their records asking.
- **Don't** find `loading="lazy"` on a `priority` image, or `fetchpriority` on any other (band 5).
- **Don't** find a `srcset` on an image with no `sources` (band 5, "no sources").
- **Don't** find `border-radius` other than `var(--media-radius)` in the module, or a `--media-radius` other than `--radius-0`.
- **Don't** place an illustration in a blue band (band 2, blue, shows the failure).

## 15 · Specimen plan

`/design/media`: (1) the four kinds side by side; (2) every kind on paper, tint, ink and blue as sibling bands with
identical markup, the illustration on blue labelled forbidden; (3) cut-out without and with shadow, the B5 part
without a panel, then on each of the three panels, one with a shadow; (3b) panels on ink; (4) panel/shadow on
kinds that refuse them, and the no-kind record beside the capture; (5) delivery — sources with the printed
srcset, priority, and a no-sources asset; (6) intrinsic vs fill in a 3:2 card box, a capture and a panel in fill,
and a 160 thumbnail box; (3c, 29 Sep 2026) the panel inset — each of the three panels at `gutter` and `text`
in intrinsic, both in a 3:2 fill box, and both in the 160 ListCard thumbnail box; (7) a 1:5 and an 8:1 asset; (8) every kind in the harness's 326 `trackMobile` column (and
the whole page at 390, where every band is in the real 326); (9) tint nested between ink bands; states: none, said on the page.

## 16 · New token requests

One primitive, approved in this build: **`--shadow-crop`**, ch05 §2's `--img-crop-elevation`, which the
primitive layer did not have (§7). The component layer adds `--media-radius`, `--media-capture-rule-width`,
`--media-capture-rule-ink` (×4 surfaces), `--media-cutout-shadow`, `--media-panel-inset` and three panel grounds.

## 17 · Open questions

All non-blocking; each records the choice the build made.

1. **Specimen assets are not 2560 masters.** The brand framework's own images (1436, 1796, 855…) with derived
   widths made by `sips`. The srcset logic is width-agnostic, so this proves the mechanism, not the ladder.
2. **The panel inset step — ANSWERED 29 Sep 2026 (2.17).** `--gap-gutter` by relationship (§7). At a 160 thumbnail
   in `fill` it left 96 of 160 for the part. The owner approved making the inset the placement's, as two named
   steps: `inset: 'gutter' | 'text'`, default `gutter`, no new token. ListCard's thumbnail passes `text`; BlockCard
   and every other placement keep the default. The centre crop is unchanged.
3. **Illustration on blue has no runtime guard.** Media cannot see its band in JavaScript, and a CSS guard would
   hide content in production. Chosen: a review rule, shown failing in the specimen. Alternative: a per-surface
   token that outlines an illustration on blue in development only.
4. **A cut-out on a panel keeps its own shadow when `shadow` is set.** B5 says "no second shadow on the panel": read
   as the panel casting none, not as the part losing its one. The part's shadow is still the only shadow.
5. **Cut-out bleed and the panel.** §2a lets a cut-out bleed off one or two edges; an inset panel floats that edge.
   Chosen: the inset holds on all four sides; a bleeding composition should be supplied without a panel.
6. **The shadow's scale.** 12px at the 2560 export is rendered as 6 CSS px at every width, so it is relatively
   heavier at 326. Chosen: one fixed value (a responsive shadow would be a media query swapping a value).
7. **Name collision with pattern discriminants.** PageHero, BlockCard and ListCard take `media: { kind: 'image', … }`,
   and the record's `kind` is a different field. `about/page.tsx` now names the hero's fields instead of spreading
   the record. When PageHero moves onto Media (2.9) it should nest the record (`{ kind: 'image', image }`) rather
   than spread it.
8. **Figure's `sizes`.** Figure cannot see its track, so 2.7 gives it the full-column value, which over-fetches in
   a gallery track and never under-fetches. A `sizes` pass-through on Figure waits for a real gallery.
9. **`next/image`.** Not used (M1). Native `<img>` with the lint rule disabled per line, as before.

## Appendix — self-audit

```
[x] 18 sections, in order.                       [x] Tier 1; imports only @/lib/cx.
[x] Every part in Anatomy has a token row.       [x] One surface token, declared on all 4 surfaces.
[x] Panel grounds argued as surface-independent. [x] No state tokens; no state exists.
[x] One distance, a gap-scale step, argued.      [x] No --space-* reach.
[x] No hex/rgb in the module; the shadow colour  [x] Every token named here resolves (design:check).
    is derived in primitives.css.                [x] 326 row: trackMobile, plus the 390 capture.
[x] Do's and Don'ts are greps or specimen bands. [x] §17: 9 questions, none blocking.
```

## Amendment · 29 Sep 2026 — `edge`

**What changed.** A closed `edge?: 'kind' | 'placement'` prop, default `kind`. `placement` suppresses the
capture's hairline; nothing else moves (a cut-out keeps its panel and shadow, which are not edges).

**Why.** The owner ruled that a BlockCard image takes a hairline whatever its kind (29 Sep, ch05 amendment
5a). In a card every kind is cropped mechanically to the card's ratio, so the edge is a cut the card made,
not the object's own; the card's crop box draws it. Media's own capture rule would then sit inside the
card's as a second line, and under the card's hover zoom it would scale and be clipped at the box. The
alternative — a `className` on Media — reopens every edge from every call site, which is exactly what §3
closes. A closed prop naming *who* draws the edge keeps the edge decided in two places only: by kind here,
or by the one placement that rules its own box.

**Readers.** `BlockCard` only. ListCard's thumbnail and Figure keep `kind`.

## Amendment · 29 Sep 2026 — the fill anchor

`fill` anchors its cover crop at `--media-fill-position: 0 20%` (inline start, a fifth down) instead of the
centre, at the owner's direction. Case-study covers are product UI, which reads from its top-left, so the
crop keeps the part that orients a reader. One anchor for every cropping placement. **Brand note:** ch05 §9a
and the amendments' inset arithmetic assume a *central* 4:3 safe area; a cover authored to that rule can now
lose its right-hand side in a 3:2 or 4:3 crop. The supply rule should move to match — the safe area sits at
the top-left — or covers keep their concept left of centre.

## Amendment · 6 Oct 2026 — `fdn-media`: `ratio`, `focus`, the photograph radius, the gate attributes

Built to `docs/kit/visual-direction.md` § 5.3 to § 5.7, which wins where it conflicts with this spec.

**`ratio?: MediaRatio`** — `'4/5' | '5/4' | '3/1' | '3/2' | '16/9' | '4/3' | '1/1'`, the closed set of § 5.4's
placements, each read from a `--media-ratio-*` token. A photograph whose box is Media's own (B, K and
L-photo at 4:5, the hero photograph at 5:4, the I banner at 3:1 or 3:2, the head-track aside at 3:2) is
cut to the ratio in its own box: full inline size, block size from the ratio, `object-fit: cover`.
- **Photographs only.** A capture, a cut-out and an illustration still render whole (ruling H3); on them
  `ratio` is ignored with a development warning. This is the one change to § 3's "no aspect-ratio":
  the ratio has nowhere else to live when the box is Media's.
- **Ignored under `fit="fill"`**, with a warning: the parent already owns that ratio.

**`focus`** — `{ x, y }`, each 0 to 1 from the top-left, on the record (`MediaImage.focus`, the
catalogue's `focalPoint`) and optionally on the prop, which wins for one placement ("crop from the
right", § 5.6). It is an `object-position`, so the point x% across the image sits x% across the box and
the focus is always inside the crop. Written as one custom property on the element's style
(`--media-focus`, ClientMark's per-asset idiom) over a stylesheet default: the centre
(`--media-crop-position`) for a ratio crop, `--media-fill-position` (0 20%) for a fill. So a card's
stand-in photograph crops on its subject, and a product-UI cover keeps the 29 Sep top-left anchor.

**The photograph radius.** `kind: 'photograph'` with `edge="kind"` takes `--media-photo-radius:
var(--radius-8)` and no frame. This revises § 7's "radius 0 on every image" for photographs only: the
29 Sep 8px on card images is extended to every photograph, so a page never shows rounded card photos
beside a square 4:5 photo (§ 5.3). Captures stay at radius 0 with the hairline; cut-outs and
illustrations are unchanged. A placement that rules its own crop box (`edge="placement"`: BlockCard,
now ListCard's thumbnail) draws its own radius on the box, and Media adds none inside it.

**New optional record fields.** `focus`, `tone` (`{ temperature, saturation }`, measured by
`npm run photos:tone`) and `standIn` (a catalogue photo standing in for a missing cover, § 5.7). None
renders anything a reader sees. `placeholderSize` (below) says the `width` / `height` are not the
master's.

**Gate attributes.** A photograph's `<img>` carries `data-src-w` and `data-src-h` (the master's pixels)
and `data-photo-temp` / `data-photo-sat` (its tone), and a stand-in carries `data-stand-in`. They are
what `fold:check` (`fdn-gates`) reads to compare the crop with the rendered box (≥ 1.9×, § 5.4) and to
count a page's photo families and vivid photos (§ 5.5). Photographs only, and the pixels only when they
are real: a record flagged `placeholderSize: true` emits no `data-src-w` / `-h`. BlockCard sets the flag
on a cover that arrived without dimensions, which it gives its box's 3 × 2 (fix round, 6 Oct 2026: until
then the flag did not exist, and such a photograph would have reported a 3px master).

**Where the photos come from.** `src/lib/photos.ts` (`getKitPhoto`, `cropScale`, `qualifies`,
`pickStandIn`) over the generated `src/lib/photo-catalogue.ts`. The data is never typed by hand:
`npm run photos:tone` measures the tags into `public/kit/photos/catalogue.json`, and
`npm run photos:derive` writes the 1240 · 652 · 320 rungs (`public/kit/photos/derived/`) and the
registry. `npm run photos:check`, in `verify`, fails when either is stale.

**Specimen:** `/design/media` § 9 — one photo per ratio with its crop scale at 1470, the record's focus
against a prop override, a photograph intrinsic beside a capture (radius 8 against 0 and the hairline,
and `ratio` ignored on the capture), and the gate attributes on a stand-in.

### Fix round · 6 Oct 2026

- **The card ratio has one answer: 3:2.** § 5.4's table gives card sets of three or more 16:9 and the
  horizontal card 4:3, but no card renders either: BlockCard's crop box is `--bcrd-media-ratio` →
  `--ratio-cover` (3/2) in both orientations, and ListCard's thumbnail is the same. `src/lib/photos.ts`
  now exports `CARD_RATIO = '3/2'`, every card placement in `PHOTO_PLACEMENTS` (`card3`, `card4`,
  `cardPair`, `cardHorizontal`, `thumbnail`) measures against it, and the stand-in picker reads the same
  constant, so `qualifies(id, 'card3')` measures the box a card actually draws. **§ 5.4 drift:** its 16:9
  and 4:3 card rows describe a BlockCard that does not exist; adopting them would be a BlockCard change
  (a ratio per set size), which `CARD_RATIO` would then follow. `16/9` and `4/3` stay in `MediaRatio`
  because the set is § 5.4's, but no shipped placement passes them.
- **A 64 portrait is a placement-ruled box.** Proof's compact portrait now passes `edge="placement"`
  and draws `--proof-portrait-radius-compact` (`--radius-4`, § 5.3) on its own clipping box. At the
  default `edge="kind"` it picked up the photograph radius, 8, which § 5.3 does not give it.
- **`--media-focus` is registered** in `scripts/tokens-check.mjs`'s `JS_INJECTED`, beside ClientMark's
  per-asset properties, so the check no longer relies on `.fill` and `.crop` happening to declare a
  local default.
- **Specimen § 9** sets each label beneath its image, so a title that wraps no longer drops one image
  below its neighbours, and § 9b renders the photographs on tint, ink and blue as well as paper.


## Amendment · 6 Oct 2026 — `fdn-section-head`: a ratio per arrangement

**`ratio?: MediaRatioSpec`**, where `MediaRatioSpec = MediaRatio | { base: MediaRatio; lg: MediaRatio }`.
A bare ratio is unchanged: one crop at every width. The object form crops `base` below 1024 and `lg`
from 1024 — Layout's `lg`, where every split in the kit opens — for the placements whose crop follows
the arrangement rather than only its width: the media split and the offer are 4:5 beside their copy and
4:3 above or below it (visual-direction § 3.7 item 4). A 4:5 photograph at the 326 phone column is 408
tall before a word of the copy; the 4:3 crop is 244.

- Two named breakpoints, both required, and no others: arrangements change at 1024 and nowhere else.
- Mechanism: the base class as before (`.ratio4x3`), plus an `lg` class (`.lgRatio4x5`) inside the
  module's one `@media (min-width: 1024px)`, declared after the base classes at equal specificity so it
  wins inside the query. Media emits the `lg` class only where the two halves differ. Same tokens
  (`--media-ratio-*`); no new token.
- This is the one change to § 3's "no `@media`" note: the crop is a layout fact once it differs by
  arrangement, and it has nowhere else to live when the box is Media's own.
- Still photographs only, still ignored under `fit="fill"`.
- First consumer: ContentSection `arrangement="media"` (`ratio={{ base: '4/3', lg: '4/5' }}`, `sizes`
  `MEDIA_SPLIT`). `cmp-cta`'s K offer photo is the second.
- § 14's "Don't find `aspect-ratio` anywhere in `Media.module.css`" was already superseded by the
  `fdn-media` amendment above; the `lg` classes are the same declaration under a query.
- **Specimen:** `/design/media` § 9 renders the object form beside its control: `{ base: '4/3', lg:
  '4/5' }` next to the same photo at a bare `4/5`. The pair is 4:5 in the 1440 capture and 4:3 in the
  390 one; the control stays 4:5 at both (added in the `fdn-section-head` fix round).
