# Texture — component specification

## 0 · Front matter

|                     |                                                                                                                                                                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Component**       | Texture (with its child `TextureShape`)                                                                                                                                                                                                                                          |
| **Tier**            | 1 · primitive (`src/components/`)                                                                                                                                                                                                                                                |
| **Status**          | `implemented` · **parked** (owner, 29 Sep 2026)                                                                                                                                                                                                                                  |
| **Token prefix**    | `--tex-`                                                                                                                                                                                                                                                                         |
| **Designer / date** | None. This is a **reconstruction**, written from the shipped implementation by Claude Code on 2026-09-28. The texture itself was measured from a Figma shader (node `435:2744`, frame `385:72`).                                                                                 |
| **Implements**      | Owner ruling **O3** (`docs/phase-2-decisions.md`) and the Texture entry in `docs/component-audit.md` §3 (tracker 2.16).                                                                                                                                                          |
| **Implemented at**  | `src/components/Texture/Texture.tsx` · `src/components/Texture/Texture.module.css` · `src/styles/tokens/components/texture.css` · `src/styles/textures/pixel-grid.json` · specimen `src/app/design/texture/page.tsx` · exporter `scripts/texture.mjs` · guide `docs/textures.md` |
| **Amended**         | 29 Sep 2026, tracker 2.17: parked; limit 6 (blur ≥ 100 in the column); no shape under a heading; ink/blue rows out                                                                                                                                                               |

> **Parked — owner, 29 Sep 2026 (tracker 2.17).** Texture is parked until a real placement exists.
> It stays in the library and in `/design/texture`, but it is not to be made stronger, more visible
> or more capable, and no ink is to be settled, until a page composition asks for it. The 2.17 pass
> fixed a rule breach and the specimen's hygiene only: no shape sits under a heading at any width
> (§9 names the cause), limit 6 below was added, and the ink and blue rows the specimen printed were
> removed because limit 3 bans those grounds. Nothing about the component or its tokens' values
> changed.

> **What this document is.** Texture shipped in #55 without a spec. The audit kept it (ruling O3,
> 28 Sep) on one condition: its spec records **where it may sit**, so the next reader does not
> remove it as decoration the brand bans. §1 carries those limits. Every value in this document can
> be checked against the files named above. Contrast figures marked **[c]** were computed for this
> spec from the ramp hexes in `primitives.css` (WCAG 2.x relative luminance, grid at its 21% peak
> over the ground). Figures marked **[q]** are quoted from a comment in `texture.css`.

---

## 1 · Identity

**What it is.** A decorative ground element. It is the pixel grid (a 5px tile of 3px LCD columns)
shown as a field inside a band. The grid is visible only through the shapes the caller places in
it: place a shape, blur it, and the grid fades out along with it. The workflow is the same as in
Figma: shapes, then blur, then texture. **Job (O3): it is placed where it lifts a composition.** It
is an accent that one page earns, not a surface treatment every page carries.

**Tier, and why.** Tier 1. It imports `@/lib/cx`, its own CSS module and the geometry spec in
`src/styles/textures/`, and nothing above `src/lib` / `src/styles`. It arranges nothing and says
nothing. It is a bleed layer that fills its nearest positioned ancestor, and a `Section` is one.

**What it is NOT, and who does each instead:**

| Not this                                        | Who does it                                                                                                                                                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A ground or a surface                           | `Section` `surface="paper \| tint \| ink \| blue"`. Texture never changes a band's ground; it sits on top of one.                                                                                                  |
| A treatment on or behind an image               | Nothing, ever. ch05 §5–6 bans any wash, tint, filter, gradient or decorative pattern on or behind an image. The only things around an image are the edges its placement draws (Figure / `Media`).                  |
| The dot grid or hatching inside an illustration | The illustration artwork itself (ch05 §4a "Texture": a dot grid marks a raw surface, hatching a cut face). That texture is part of the drawing and is authored in the asset, not laid over it with this component. |
| A band separator or rhythm device               | Ground and whitespace (`Section`). Bands are told apart by the change of ground, and the arrangement varies between blocks.                                                                                        |

**Nearest existing component, and why this is not a prop on it.** `Section`. A `texture` prop on
Section looks tidy, but the composition (which shapes, where, how blurred) changes with every
placement, so the prop would have to accept a shape list. That is a child tree passed through a
prop. Keeping it a child also keeps Section's contract to ground, column and air, and makes the
rare opt-in visible in the markup. Section supplies the two things Texture needs:
`position: relative` and `isolation: isolate` (`Section.module.css`).

**How many appear on a page.** **At most one.**

### Placement limits (ruling O3, audit §3; binding)

Limits 1–5 come from `docs/component-audit.md` §3 exactly; limit 6 is the owner's (2.17). They are what keeps Texture on the right
side of ch05:

1. **Never under an image.**
2. **Never under body text or a heading.**
3. **Never on ink or blue.** Those grounds are reserved.
4. **At most one per page.**
5. **Never as a rhythm device between bands.**
6. **Blur ≥ 100 on any shape inside the content column.** Added by the owner, 29 Sep 2026 (tracker
   2.17). A shape whose box enters Section's content column (the 1240 cap less its gutters, i.e.
   anywhere text could be at some width) takes `blur` of 100 or more. A hard or lightly feathered
   edge inside the column reads as a shape, not as texture, and at 390 the column is the whole band.
   Only a shape wholly outside the column — in a gutter, or off the field — may be harder.
7. **Never a stepped, hard-edged block** (owner, 9 Oct 2026). The PageHero `foot` and `field`
   staircases were retired: a hard-edged block reads as an object competing with the copy, not as
   rhythm. Shown under "Never" on `/design/texture`.

**How "under" is judged.** A shape's box is the rectangle or ellipse before blur, where the grid is
at full strength. It must not intersect the box of a heading, a body paragraph or an image. The
blur's feather may fade out beneath content. That is how the measured frame works: two bands
hanging 180px off the top and bottom edges, with the field strongest in the band's air and gone
by the copy. A placement whose full-strength field sits behind words is the one the rule forbids.
See §17 Q3.

**Where it may sit, therefore:** paper (and tint), in a band's air or beside its content: an edge
glow, a corner, or the empty half of an asymmetric `Layout`. One band per page. **The band's air is
the only region that is clear at every width:** at 390 the content column is the whole band, so the
top and bottom padding are all that is left. A shape that must clear content at any width is
anchored to the top or bottom edge with its box inside that padding, or percent-sized and hung off
an edge so that it is.

---

## 2 · Anatomy

| Part    | Required                       | Element                                                                                             | Class      | Token `{part}`             |
| ------- | ------------------------------ | --------------------------------------------------------------------------------------------------- | ---------- | -------------------------- |
| Field   | always                         | `<svg aria-hidden>`, absolutely positioned, `inset: 0`                                              | `.texture` | `ink`, `layer`             |
| Pattern | always                         | `<pattern>` in `<defs>`, one `<rect>` per cell of `pixel-grid.json`                                 | —          | — (geometry is the spec's) |
| Mask    | always                         | `<mask>` holding the children                                                                       | —          | —                          |
| Shape   | at least one, or nothing shows | `TextureShape`: nested `<svg>` viewports around a `<rect>` or `<ellipse>`, filled white in the mask | —          | —                          |
| Feather | when `blur > 0`                | `<filter>` + `<feGaussianBlur>` wrapping the shape                                                  | —          | —                          |

The only content slot is `children`, and it takes `TextureShape`s only. A `TextureShape` outside a
`Texture` paints a white box (see §12).

---

## 3 · Props / API

**`Texture`**

| Prop        | Type                              | Default  | Decides                             |
| ----------- | --------------------------------- | -------- | ----------------------------------- |
| `children`  | `ReactNode` (the `TextureShape`s) | required | where the grid shows                |
| `className` | `string`                          | —        | position overrides only (see below) |

**`TextureShape`**

| Prop               | Type                                                                     | Default  | Decides                                                                    |
| ------------------ | ------------------------------------------------------------------------ | -------- | -------------------------------------------------------------------------- |
| `top` / `bottom`   | `TextureLength` (`number` px, or `` `${number}%` `` of the field height) | —        | vertical anchor. Neither means centred; both means `top` wins              |
| `left` / `right`   | `TextureLength` (px or % of field width)                                 | —        | horizontal anchor, same rules                                              |
| `width` / `height` | `TextureLength`                                                          | required | the shape's box                                                            |
| `kind`             | `'rect' \| 'ellipse'`                                                    | `'rect'` | shape                                                                      |
| `radius`           | `number` (px)                                                            | `0`      | corner radius of a `rect`                                                  |
| `blur`             | `number`, in Figma's Layer blur units                                    | `0`      | feather. Rendered as `stdDeviation = blur / 2`, fitted to the Figma render |

**Deliberately not a prop:** `surface` (read from the ancestor `data-surface`), colour / ink (it is
`--tex-ink`, per surface), strength or opacity (the alphas are the texture, set in
`pixel-grid.json`), pitch or cell geometry (fixed, since they _are_ the texture), z-index (fixed at
`--tex-layer`), animation, and any padding, gap or size of the field itself (it always fills its
ancestor). `className` exists for position only. On the site it must not set `--tex-ink` or
colour. The specimen's `.texInk*` classes do, and they are proving-ground scaffolding (see §17 Q1).

**Should be a compile error, and is not today:** a `TextureShape` giving both sides of an axis
(`left` and `right`). It compiles and `left` silently wins. See §17 Q4.

---

## 4 · Variants × sizes

None. There is one texture (`pixel-grid`) and no strength or size variants. Shapes are sized by
the composition in px or %, not from a t-shirt scale, because a shape is artwork coordinates (the
Figma numbers) and not a component size. **Rejected:** a `strength` prop (it turns texture into
pattern, as the tint note in `texture.css` records for neutral-700), and a second texture (no job
asks for one).

---

## 5 · States

None apply. The field is decorative, `pointer-events: none` and never focusable, so there is no
hover, focus, active, disabled, busy or selected state. Nothing about it changes with interaction.

---

## 6 · Per-surface colour

One token. The grid is drawn in `currentColor`, and the colour is set from `--tex-ink`.

| Token       | paper                                   | tint                                      | ink                                                   | blue                                           |
| ----------- | --------------------------------------- | ----------------------------------------- | ----------------------------------------------------- | ---------------------------------------------- |
| `--tex-ink` | `--color-brandeis-500` · 1.42:1 **[c]** | `--color-neutral-400` · 1.13:1 **[q][c]** | `--color-brandeis-500` · 1.14:1 **[c]** (provisional) | `--color-white` · 1.44:1 **[c]** (provisional) |

Every cell is **n/a: decoration**. There is no contrast floor, because nothing that must be read
sits over the field (limit 2). The ratios describe how present the grid is, not whether it is
legible.

- **paper:** the measured value. The Figma render is blue on paper.
- **tint:** neutral, not blue, and quieter than paper on purpose. A blue haze over paper-deep reads
  as a tint on a tint, and a strength-matched neutral-700 (1.38:1) read as pattern **[q]**.
  neutral-300 (1.07:1) is the quieter alternative.
- **ink / blue:** declared because every surface block must be self-contained (CLAUDE.md token
  rule 2), **not** because Texture may be placed there. Limit 3 forbids both. The values stay as
  shipped, are labelled in `texture.css` as declared for self-containment only, and are no longer
  "provisional": there is nothing to choose, so the specimen's ink and blue candidates were removed
  (29 Sep 2026, 2.17). Blue cannot take brandeis-500, because that is its own ground.

**Nested surface.** The token re-declares on every `[data-surface]`, so a Texture inside a tint
panel nested in a paper band takes tint's ink. Which positioned ancestor it fills is a separate
matter from which surface it reads (see §12).

---

## 7 · Geometry & spacing

**(a) Distances.** None. Texture owns no gap and takes part in no Layout. Shape offsets
(`top={-180}`) are composition coordinates inside the field, not separations between elements, so
the gap scale does not apply. The same goes for a Figma frame's x/y.

**(b) Component sizes.** Fixed by `pixel-grid.json`: pitch 5px, and each column a 3×1 cell at
alphas 0.035 / 0.21 / 0.07 / 0.21 / 0.035. The field size is always its ancestor's padding box.

**(c) Optical corrections.** None.

**Radius** is a shape prop (`radius`, px). There is no border, no shadow, and never a blur on the
grid itself (it stays crisp; only the mask is blurred, which is why this is SVG and not a CSS
filter). **Z-layer:** `--tex-layer: -1`. That puts it between the band's ground and its content,
and it relies on Section's `isolation: isolate`.

---

## 8 · Typography

None. It renders no text.

---

## 9 · Responsive

Nothing changes at 1023 or 767. Percentage shapes reflow with the band; px shapes keep their size
and anchor. So an edge glow placed `top` or `bottom` holds its edge at every width. At 767 and
below, the content column fills the band. A shape that sat in empty space at 1440 may now sit
behind text, so a placement must be checked at 390 against limit 2. The recommended approach is
edge-anchored shapes in the band's air, which survive the reflow.

**The top air is not always there — found 29 Sep 2026 (tracker 2.17).** Since the same-surface seam
rule (`Section.module.css`), a band that directly follows a band of its own surface drops its
**top** padding. A textured paper band placed after another paper band therefore starts its content
at y = 0, and a shape anchored at `top` whose box was measured against 128 of air sits behind the
heading. That is what the specimen was showing at 390. A top-anchored placement must be checked
against the band's actual top padding in its page, not its density: follow a different surface, or
a `flush` band, or anchor at the bottom. **Touch targets:** not
applicable, since the element is not hit-tested.

---

## 10 · Composition

```tsx
<Section>
  {' '}
  {/* paper; positioned + isolated, one per page */}
  <Texture>
    <TextureShape top={-180} width="92%" height={288} blur={164} />
  </Texture>
  <Layout columns={[2, 1]} colGap="column">
    {' '}
    {/* content above the field, in its own arrangement */}…
  </Layout>
</Section>
```

Texture is the first child of the band, and content is arranged by `Layout` / `Cluster` as usual.
There is no hand-rolled grid or flex, no margins, and nothing overrides Section's column or ground.
Inside any box other than a Section, that box needs `position: relative; isolation: isolate` from
its own module, stated as a positioning context and not as a background.

---

## 11 · Accessibility

- `<svg aria-hidden="true" focusable="false">`. It is not in the accessibility tree and is never a
  tab stop. **A screen reader says nothing.**
- `pointer-events: none`, so it never intercepts a click or hover meant for content above it.
- Keyboard: nothing is bound, because nothing is interactive.
- Ids: the pattern, mask and filter ids come from `useId`, sanitised for `url(#…)`. They are
  internal to the svg, referenced by `fill` / `mask` / `filter` and never by ARIA. Two Textures on
  one page (which the ruling forbids anyway) still get distinct ids.
- Contrast: there is no floor of its own. Limit 2 is what protects text contrast, because the
  field's full strength never sits behind words.
- Reduced motion: nothing moves.
- Forced colours: the field is decoration and may be dropped or flattened by the UA. No meaning is
  lost.

---

## 12 · Content edge cases

| Case                                  | Handling                                                                                                                                      |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| No shapes                             | The mask is empty, so nothing shows. Valid, and pointless.                                                                                    |
| Shape fully off the field             | The band clips it. Its blur may still bleed in, which is the intended edge-glow technique.                                                    |
| Very large blur                       | The filter region is the field ±50% in user space, so a large feather is not clipped into a visible rectangle.                                |
| Both sides of an axis given           | `left` / `top` wins silently (§17 Q4).                                                                                                        |
| `TextureShape` outside `Texture`      | Renders a white box. Do not do it.                                                                                                            |
| Not inside a positioned, isolated box | It fills the wrong ancestor, or with `z-index: -1` paints under the band's ground and vanishes. Put it in a Section.                          |
| Narrow track / 390                    | Re-check limit 2 (§9).                                                                                                                        |
| Nested surface                        | It takes the nearest `data-surface` ink. On ink or blue it is forbidden regardless.                                                           |
| Two adjacent textured bands           | Forbidden (limits 4 and 5).                                                                                                                   |
| Band with an image                    | The shape box must not intersect the image box (limit 1). A band whose only content is an image gets no Texture.                              |
| Logical properties                    | `left` / `right` are physical, like Figma coordinates. In an RTL context the composition does not mirror. The site is LTR; noted, not solved. |

---

## 13 · Motion

None. Nothing transitions or animates. A moving field would compete with the content it sits
under. Reduced motion needs no handling.

---

## 14 · Do's and Don'ts

- **Do** place it as the first child of a paper or tint `Section`.
- **Do** anchor shapes to a band edge or corner, in the band's air, so the field clears content at
  every width.
- **Don't** let a shape's box intersect an `<img>`, a `Figure`, or `Media`.
- **Don't** let a shape's box intersect a heading or a body paragraph, at 1440 or at 390.
- **Don't** render a `Texture` inside a `surface="ink"` or `surface="blue"` band, or inside
  anything nested in one.
- **Don't** render more than one `Texture` on a route.
- **Don't** place Texture in alternating bands, or in every band of a kind, to mark rhythm.
- **Don't** set `--tex-ink`, `color` or `opacity` on a Texture from a route or pattern `className`.
- **Don't** blur the grid with a CSS `filter`. Blur the shape.

---

## 15 · Specimen plan

`/design/texture` renders, as revised 29 Sep 2026 (tracker 2.17):

- the Figma workflow step by step. Steps 1 and 2 (hard shape, blurred shape, both centred) are
  **mechanism bands with no content**, labelled "mechanism, not a placement", because a centred
  shape sits behind wherever content would be and a blur-0 shape in the column breaks limit 6;
- the measured frame rebuilt, with its content: each box ends 108 into a band with 128 of top air;
- three anchors — an ellipse hung off the top-left, a 30%-wide rounded rect off the bottom-right
  corner, a 40%-wide glow on the bottom edge — every box in the band's air and blurred ≥ 100, so no
  shape is under the heading or body at 1440 or 390;
- tint with the measured frame, and tint's two candidate inks (400, 300) side by side.

Every caption band before a textured band is `flush`, so the textured band keeps its full top air
(§9). The ink and blue bands and their candidates are removed (limit 3). Still open, and parked with
the component: a "correct placement" band beside an asymmetric Layout (§17 Q2).

---

## 16 · New token requests

None. Every value in this spec is an existing token.

---

## 17 · Open questions

All non-blocking. The spec states the correct behaviour for each, so an implementer following it
would not encode anything known to be wrong.

1. **The ink and blue `--tex-ink` values are "provisional", but the grounds are now forbidden.**
   _Options:_ (a) keep the values, relabel them in `texture.css` as declared for
   self-containment only, and delete the ink and blue `.texInk*` candidates from the specimen;
   (b) keep choosing between the candidates.
   _Recommendation:_ (a). Settling an ink for a ground Texture may not use is wasted work, and
   rule 2 still requires the declaration. Tint's 400 vs 300 can be settled when tint first gets a
   placement. **non-blocking** — **Resolved (a), 29 Sep 2026 (tracker 2.17):** values kept and
   relabelled in `texture.css`; the ink and blue candidates are deleted from the specimen and from
   `specimen.module.css`. Tint's choice waits on the first placement, with the component parked.
2. **The specimen models placements the limits forbid (§15).**
   _Recommendation:_ keep one layering-proof band, captioned as such, and add a correct-placement
   band at 1440 and 390. Relabel ink and blue per Q1. **non-blocking** — **Partly resolved, 29 Sep
   2026 (tracker 2.17):** no band now puts a shape under a heading or body at any width, and ink and
   blue are gone. The correct-placement band is not added: Texture is parked until a real placement
   exists, and that placement will be the band.
3. **"Under" is interpreted as "the shape's full-strength box".** Without that, the measured frame
   itself would be illegal, because its feather reaches the copy.
   _Options:_ (a) the box rule in §1; (b) the feather must also clear content (so the shape box
   plus about one `blur` must clear); (c) no rule, and judge by eye.
   _Recommendation:_ (a), and the owner may tighten it to (b) on sight of the first comp.
   **non-blocking**
4. **Both sides of an axis compiles.**
   _Options:_ (a) a discriminated union per axis; (b) leave it documented.
   _Recommendation:_ (a) when the component is next touched. It is a small type change.
   **non-blocking**
5. **Limits 1–5 are review-only; no check sees them.**
   _Recommendation:_ a cheap `specimens`-style script could fail on a Texture inside an
   ink or blue Section, or on two Textures in one route file. Intersection with content stays with
   the eye and the shots. **non-blocking**
6. **First placement.** The audit puts it in a tracker 1.2 comp. That is not a component question.
   **non-blocking**

---

## Appendix — self-audit

| Check                       | Count / result                                                                                                                   |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Sections 0–17 present       | 18 of 18                                                                                                                         |
| Tokens named                | 1 surface-dependent (`--tex-ink`) + 1 geometry (`--tex-layer`), both declared in `texture.css`; `--tex-ink` on all four surfaces |
| Colour cells                | 4 of 4 filled with an existing `--color-*`; 0 blank; 0 deltas                                                                    |
| Contrast figures            | 4, all marked decoration (n/a floor)                                                                                             |
| Distances off the gap scale | 0 (the field owns no gap; shape offsets are composition coordinates, argued in §7)                                               |
| `--space-*` reaches         | 0                                                                                                                                |
| Type roles                  | 0 (renders no text)                                                                                                              |
| New tokens requested        | 0                                                                                                                                |
| Placement limits recorded   | 6 — 5 from audit §3, 1 from the owner (2.17)                                                                                     |
| BLOCKING questions          | 0                                                                                                                                |

## Amendment · 6 Oct 2026 — `page-product-design` fix round 2: TextureCorner

A named recipe beside TextureHorizon and TextureClosing: a stepped pixel field (10px pixels, two grid
pitches, no blur) in a band's top-end corner, `--tex-corner-inline-size` (`min(280px, 40%)`) ×
`--tex-corner-block-size` (80), dense where the top and end edges meet and dithering out on both axes
(a seeded field, the same every render). For a band whose type is centred and leaves the corner as
the only clear ground — the Statement's `texture="corner"`. In an `open` band it ends 48 above the
eyebrow, so it is drawn at every width. Paper only. Specimen: `/design/statement` § 5.

## Amendment · 9 Oct 2026 — owner texture review: two variations, and the documented patterns

Approved as drawn: the end-edge corner fade (Statement `head-half`), the seam strip
(`TextureHorizon`) and the single corner cluster (`TextureCorner`, Statement `corner`). Added:

- **`TextureCorner at?: 'top-end' | 'bottom-start'`** (default `top-end`). `bottom-start` is the
  partner of a balanced pair: the same box (`--tex-corner-*`), pixel and falloff law, but its own
  seed and a steeper falloff along the edge, so it reads as a related, lighter cluster rather than
  the top-end field flipped. Never used alone. No new tokens.
- **End-edge horizontal fade** — head-half's rect run from −50% to 150% of the band's height (end
  −120, 30% wide, blur 160), so the field is full strength top to bottom along the end edge and
  fades only toward the start. Drawn by Statement `texture="end-fade"`; from 1024.

`/design/texture` is now the documented page: purpose, rules (rhythm not decoration; one signature
per band; air and edges only; paper only, peridot never; not with an illustration hero; contrast),
the five placements live with when / never, then the mechanism specimens.

## Amendment · 16 Oct 2026 — `TextureTwoLights`, and texture on tint (owner, the home close)

- **`TextureTwoLights({ edge = 50 })`** — study 09A as built: two soft ellipses on an island's ground,
  on a diagonal across the raised form panel. The top light is centred where the panel's start edge
  crosses the island's top (left edge−16%, width 30%, top −150, height 300, blur 170); the foot light is
  in the island's far foot corner, past the panel (right −8%, width 30%, bottom −130, height 260, blur
  180). Widths are percentages so they track the split; heights are px. Both at the panel's start edge
  was tried and merged into one vertical band.
- **Soft, by owner choice.** The hard placements stay hard; this one is feathered because it was picked
  from the soft studies (09) over the hard ones.
- **Texture on tint.** The first placement on a tint ground, so the rule "paper only" now reads "paper,
  and the tint island of the home close". A new per-surface `--tex-ink-soft` is the soft placement's
  ink (`.soft` in Texture.module.css): neutral-900 on tint, the same as `--tex-ink` on every other
  surface. Through a feathered mask the grid never reaches its 21% peak over an edge, and at the hard
  placements' 400 the pools vanished; the approved mock drew them in ink. `--tex-ink` on tint stays
  400, so the hard placements are unchanged.
- Specimen: `/design/island` § 7 (on the overhang island) and the home close itself.
- **`TextureHalo`** (same day). One soft ellipse on the BAND, centred on the island close's form panel
  (left 37%, width 60%, height 760, blur 200, vertically centred). The island paints over it, so it
  shows only where the panel rises out of the island and at the island's sides. `--tex-ink-soft` on
  paper is neutral-900, because the approved study 11A drew it in ink. `--tex-ink` on paper stays blue.
- **The halo is light blue** (owner, same day). `--tex-ink-soft` on paper is brandeis-400. At 300 the
  feathered field all but vanished. The home island carries no texture now, so `TextureTwoLights` and
  the tint `--tex-ink-soft` stay as provisions with no site placement.
- **Final (same day): `TextureFrame` replaces `TextureTwoLights` and `TextureHalo`**, both removed. One
  soft rounded field on the island, framing the form in the end column (right −2%, width 65%, top −24,
  height 106%, radius 120, blur 88), in `--tex-ink-soft`: white on blue and on ink.
- **Frame, softened (same day, owner: "right behind the form and smaller … it feels harsh").** The field
  now reaches about 40 past the panel on every side (right 56, width 51%, top 24, height 92%, radius 56,
  blur 40), and `--tex-ink-soft` is brandeis-200 on blue and neutral-500 on ink (white read harsh).
