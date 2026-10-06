# ClientMark — component specification

## 0 · Front matter

|                     |                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Component**       | ClientMark                                                                                                                                                                                                                                                                                                                                                         |
| **Tier**            | 1 · primitive (`src/components/`)                                                                                                                                                                                                                                                                                                                                  |
| **Status**          | `implemented` — accepted without a design round on owner ruling **P2** (`docs/phase-2-decisions.md`: "capped at ~40px tall, and sized to equal visual weight by area") and **DBF ch05 §10** (client logos: source, colour, size, never). See §17 Q1.                                                                                                               |
| **Token prefix**    | `--cmark-`                                                                                                                                                                                                                                                                                                                                                         |
| **Designer / date** | None. Written by Claude Code on 2026-09-28 from ch05 §10, ruling P2 and the audit's §4 "Client logos" row (`docs/component-audit.md`). Tracker 2.8.                                                                                                                                                                                                                |
| **Amended**         | 29 Sep 2026, tracker 2.17 (visual overhaul), owner-approved: `--cmark-ink` one step quieter on every surface (§6); equal cells in a `Layout` as the recommended composition for a set of known size, and when to use which (§10); LatitudePay's weight correction recorded (§12, §17 Q10); `max-inline-size: 100%` so a mark never spills out of a grid cell (§7). |
| **Implements**      | `docs/component-audit.md` §4, job "Client logos": "a tier-1 primitive, `ClientMark`… The _strip_ is still not a component."                                                                                                                                                                                                                                        |
| **Implemented at**  | `src/components/ClientMark/ClientMark.tsx` · `src/components/ClientMark/ClientMark.module.css` · `src/styles/tokens/components/client-mark.css` · specimen `src/app/design/client-mark/page.tsx` · client set `public/clients/*.svg` · stress marks `public/design/client-mark-*.svg` · `scripts/tokens-check.mjs` (`JS_INJECTED`)                                 |

> Contrast figures marked **[c]** were computed for this spec from the ramp hexes in
> `primitives.css` (WCAG 2.x relative luminance) and agree with ch02's pairing tables.

---

## 1 · Identity

**What it is.** One client's logo **in a set**: a logo strip, a client wall. It draws the
client's own SVG as a CSS mask filled with the ground's ink, so every mark in the set is one
colour (ch05 §10 "colour"), and it sizes each mark to **equal visual weight**: the same
bounding-box area, capped in height and width, with a recorded ±15% correction (ch05 §10
"size", ruling P2).

**Tier, and why.** Tier 1. It imports `@/lib/cx` and its own module and nothing else. It arranges
nothing; a strip arranges it. It qualifies as a unit on **behaviour** (the audit's words): no
existing primitive can recolour an external SVG to a surface token, and none can size by area.

**What it is NOT:**

| Not this                                                | Who does it                                                                                                                                 |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| A logo strip / client wall                              | `ClientMark` × n in a `Cluster` (as `ul`), which owns both seams. ch05 §10: "The gap between marks belongs to the layout… never to a logo." |
| The Tcules wordmark                                     | `Logo`. Our own mark, inline artwork, a brand-coloured bar. ClientMark owns no artwork.                                                     |
| A full-colour client logo shown alone by its case study | The client's file in a `Figure` / `Media` (ch05 §10 allows the full-colour version there). ClientMark is always one colour.                 |
| A glyph                                                 | `Icon`. ch04 set, 24-unit box. Brand marks are never glyphs (glyphs.ts header).                                                             |

**Nearest existing component, and why this is not a prop on it.** `Logo`. Both are marks at their
own ratio, but Logo is _one_ inline artwork with a fixed height ladder, and ClientMark takes any
asset by URL and computes its size from its ratio. A `src` prop on Logo would make Logo two
components.

**How many on a page.** Usually one set of 4–12, rarely two (a strip in a hero, a wall on an
about page).

---

## 2 · Anatomy

| Part | Required | Element                               | Class   | Token `{part}` |
| ---- | -------- | ------------------------------------- | ------- | -------------- |
| Mark | always   | `<span role="img" aria-label={name}>` | `.mark` | `ink`          |

One element, no children, no content slots. The drawing is the element's own background seen
through the mask; there is no `<img>` and no inline `<svg>`.

---

## 3 · Props / API

| Prop         | Type     | Default  | Decides                                                                                                    |
| ------------ | -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `src`        | `string` | required | the client's SVG (a URL). Only its alpha is used                                                           |
| `name`       | `string` | required | the accessible name. The client's name, never "… logo" (the mark is an image of the name)                  |
| `width`      | `number` | required | intrinsic width (viewBox units). Only `width / height` is used                                             |
| `height`     | `number` | required | intrinsic height                                                                                           |
| `correction` | `number` | `0`      | the weight correction recorded with the asset, as a fraction of size. Clamped to ±0.15, dev-warned outside |
| `className`  | `string` | —        | position only (never colour, size, spacing)                                                                |

**Deliberately not a prop:** `surface` (read from the ancestor `data-surface`), colour / ink
(`--cmark-ink` per surface; a mark is never the client's own colours in a set), size / height /
width of the rendered box (computed: that is the point), target area and caps (tokens, one answer
site-wide, §17 Q4), padding, gap, radius, border, shadow, animation (all banned by ch05 §10
"never"), `alt` (it is `name`), a decorative mode (there is no case: a wrapping link takes its
name from the mark).

**Compile errors vs runtime.** Missing `src`, `name`, `width` or `height` is a compile error.
An empty string, a non-positive size, or an out-of-range correction cannot be typed away; each is
a dev warning with a defined result (§12).

---

## 4 · Variants × sizes

None. There is one treatment and one size rule. The rendered size is **computed**, not chosen:

```
fitted = min( side × √r ,  height-max × r ,  width-max )        r = width / height
width  = min( fitted × (1 + correction) ,  height-max × r )
height = width / r
```

The correction scales the CAPPED size, ch05 §10's order ("corrected by up to ±15% of that size"),
and only the height cap applies again, so a correction never breaks P2's 40px cap. The width cap is
not re-applied (fix round 2, kit cmp-logos, 6 Oct 2026): a wide mark may reach 160 × 1.15 = 184,
and only when its file records an upward correction (§17 Q3, Q10).

Below 768 the three sizes step down together (`--cmark-target-side-m` 44, `--cmark-height-max-m`
32, `--cmark-width-max-m` 128), so a nine-mark set at 390 is a compact set rather than a wall; the
specimen renders both steps side by side by swapping the `-m` tokens in.

**Rejected:** a `size` t-shirt prop (sets differ in density, but no job asks for a second size
yet, §17 Q4); a full-colour variant (that is a Figure, §1); a hover-to-colour variant (ch05 §10:
never the client's colours in a set, and never animated).

---

## 5 · States

None. The mark is not interactive and nothing about it changes. When it sits in a link, the
link owns hover and focus; the mark's ink does not move (it is a token, not `currentColor`).

---

## 6 · Per-surface colour

| Token         | paper                                  | tint                                                 | ink                                                    | blue                                                    |
| ------------- | -------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------- |
| `--cmark-ink` | `--color-neutral-600` · 4.92:1 **[c]** | `--color-neutral-600` · 4.39:1 on paper-deep **[c]** | `--color-neutral-300` · 11.07:1 on neutral-950 **[c]** | `--color-brandeis-200` · 3.78:1 on brandeis-500 **[c]** |

**Amended 29 Sep 2026 (tracker 2.17, owner).** The ink was the ground's full ink — neutral-900
(14.62 / 13.06:1) and white (17.26 / 6.23:1). At that ink a strip of nine marks is nine
near-black shapes at the section heading's colour, and it competes with the heading for the first
read. It now steps down once on every surface, so the strip sits under its heading. Still **one
solid colour per strip**: a ramp step, never an opacity of the mark.

Logotypes are exempt from SC 1.4.3, and SC 1.4.11 does not apply to a logo, so WCAG sets no
floor. The component holds itself to **3:1** (1.4.11's non-text figure) on every surface anyway:
below it a mark stops being legible as a name, which is its whole job.

- **paper, tint:** neutral-600 on both, as ch05 names one ink for paper and paper-deep. It is
  `--sec-ink-muted`'s step on paper.
- **ink:** neutral-300 — visibly quieter than white, far clear of the floor.
- **blue:** brandeis-200, **chosen by measurement** against brandeis-500: 50 is 5.57:1 and 100 is
  4.91:1, and both read as white beside white at strip size; 300 is 2.64:1, under the floor; 200
  is 3.78:1 and reads as a quieter white. A neutral grey was rejected: grey on brand blue reads as
  dirt, not as a quieter white. It is a pale tint of the ground, not a brand-blue mark on brand
  blue, so it is not the tint ch05 §10 rules out. §17 Q2.
- **ch05 §10 still names the full inks.** This amendment supersedes it on the website on the
  owner's ruling; the chapter needs the same edit at its next revision. §17 Q9.

**Why a token and not `currentColor`.** Inside a link to a case study, `currentColor` is link blue,
which recolours the client's mark in our brand colour. The token keeps it the ground's ink. It
duplicates `--sec-ink`'s four values on purpose (rule 6).

**Forced colours.** `--cmark-ink-forced: CanvasText` (surface-independent, in `:root`), read only in
`@media (forced-colors: active)` with `forced-color-adjust: none`. Without it the UA forces the
background to Canvas and the mark vanishes into the ground. Verified with Chromium's forced-colours
emulation.

**Nested surface.** Every surface block restates `--cmark-ink`, so a tint band nested in ink paints
neutral-900 marks (specimen, last band).

---

## 7 · Geometry & spacing

**(a) Distances.** None. The mark owns no gap and sets no margin. The strip's gap is the
container's — the Cluster's or the Layout's, `colGap` / `rowGap` = `stack` (48) either way
(§10, §17 Q5).

**Never wider than its box.** `max-inline-size: 100%` (2.17). In a Cluster the box is the mark's
own `li`, so it does nothing; in an equal grid cell narrower than the mark (a corrected 175-wide
mark in a five-track cell between 1024 and ~1130, 154–169 wide) it stops the mark spilling out of
its track. The `block-size` does not follow, on purpose: the
mask is `contain`, so the artwork shrinks to the width and letterboxes in a box a few px taller —
the designed failure mode, never a crop or a stretch.

**(b) Component sizes** (explicit names, literals in the token file with their measurement):

| Token                 | Value | Measured against                                                                                       |
| --------------------- | ----- | ------------------------------------------------------------------------------------------------------ |
| `--cmark-target-side` | 56px  | the side of the target square (area 3136 px²). A 4:1 wordmark → 112 × 28, 3:1 → 97 × 32; under the cap |
| `--cmark-height-max`  | 40px  | ruling P2, "~40px tall"                                                                                |
| `--cmark-width-max`   | 160px | a 4:1 wordmark at the height cap. A 12:1 wordmark stops at 160 × 13. The limit BEFORE a correction; a +15% mark may reach 184 |
| `--cmark-target-side-m` | 44px | the phone step (below 768), 56 × 0.79. A 4:1 wordmark → 88 × 22 |
| `--cmark-height-max-m`  | 32px | the phone step of P2's cap, 40 × 0.8 |
| `--cmark-width-max-m`   | 128px | the phone step, 160 × 0.8. The widest real mark at 390 is LatitudePay, 119 × 1.15 = 137, inside a 139 two-track cell |

The target is a side, not an area, because a custom property cannot carry px².

**(c) Optical corrections reaching `--space-*`.** None.

**Radius, border, shadow, z-layer:** none, by ch05 §10 "never… in a box or tile of its own, with a
shadow". The mask is `contain` and `no-repeat`, so the mark is never cropped (§10 "never cropped").

**The arithmetic lives in CSS; √r does not.** `sqrt()` needs Chrome 120 / Firefox 118 / Safari
15.4, and Next 16 supports Chrome/Edge 111+. In 111–119 the width would be invalid and every mark
would collapse to zero. So TSX computes `r` and `√r` once on the server and passes them, with the
URL and `1 + correction`, as four unitless custom properties on `style` (`--cmark-src`,
`--cmark-ratio`, `--cmark-ratio-root`, `--cmark-correction`), registered in `JS_INJECTED`. Every
length is computed in the module from tokens.

---

## 8 · Typography

None. It renders no text, and on failure it deliberately does not render the name as text (§12).

---

## 9 · Responsive

The DISTANCE never shifts responsively (the Cluster's or Layout's `stack`). The SIZE steps once, at
767 (fix round 1, kit cmp-logos, 6 Oct 2026): the target side and both caps re-declare to their
`-m` tokens (44 / 32 / 128), so a nine-mark set at 390 is a compact set rather than a wall that
dwarfs its heading. In a narrow column the Cluster wraps the strip into rows; no mark shrinks to stay
on one line (the widest is 175 at desktop and 137 at 390, inside the 326 column). **Touch targets:** not applicable; the mark is not a target. When it
is wrapped in a link, the link's box is the mark's box (≥ 13 × 160 or 40 × 40); a linked strip
needs the link to meet 24 × 24, which a 12:1 mark (13 tall) does not on its own. §17 Q6.

---

## 10 · Composition

```tsx
<Section>
  <Cluster as="ul" colGap="stack" rowGap="stack" align="center">
    {clients.map((c) => (
      <li key={c.name}>
        <ClientMark
          src={c.logo}
          name={c.name}
          width={c.w}
          height={c.h}
          correction={c.correction}
        />
      </li>
    ))}
  </Cluster>
</Section>
```

The Cluster provides the inline axis and both seams; `align="center"` sets the marks on a common
centre line. No hand-rolled flex, no margins on the marks, nothing overriding Section.

### Equal cells — the recommended composition for a set of known size (29 Sep 2026, 2.17)

A Cluster packs marks by their own widths, so the last row takes whatever is left: the nine-mark
set leaves **7 + 2 at 1440 and one mark alone at 390**. When the count is known, give each mark an
equal cell in a `Layout` and choose a count the columns divide:

```tsx
<Layout as="ul" columns={{ base: 2, md: 3, lg: 5 }} colGap="stack" rowGap="stack" align="center">
  {clients.map((c) => (
    <li key={c.name}>
      <ClientMark
        src={c.logo}
        name={c.name}
        width={c.w}
        height={c.h}
        correction={c.correction}
      />
    </li>
  ))}
</Layout>
```

- **The grid is visual-direction § 5.9's** (amended 6 Oct 2026, kit cmp-logos): `{ base: 2, md: 3,
  lg: 5 }`, all nine marks — 3 × 3 at md, 5 + 4 from lg, and the last mark alone at base, which a
  start-aligned grid reads as the end of the list rather than a hole. Inside a two-thirds body
  track the caller holds it at `{ base: 2, md: 3 }`.
- **Track widths at each floor.** Two tracks at the 326 column are ~139 (the widest phone mark is
  137); three in the 704 column ~202; five in the 1240 column ~209 — all wider than the widest
  mark (175). Between 1024 and ~1130 five tracks are 154–169, so LatitudePay meets its cell and
  letterboxes by up to 12% (§7). §17 Q11.
- **`justifyItems` stays at stretch**, so each `li` fills its track and each mark sits at its
  cell's start edge: the first column lines up with the section heading, and every column starts
  on a track line. A centred `li` sizes to the mark and a mark wider than its cell would spill.
- **Still not a component.** It is `ClientMark` × n in a `Layout`, exactly as the Cluster strip is
  `ClientMark` × n in a `Cluster`. A `ClientStrip` would own one of two arrangements and hide the
  count decision, which is the whole point.

**Which to use when:**

| Use                     | When                                                                                                                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Layout, equal cells** | The default for a strip or client wall whose count is known when the page is composed. Pick a count from the list above so no row is part-full at any width.                               |
| **Cluster**             | The count is not the page's to choose (a CMS list of any length), or the set is short enough to sit on one row at every width (≤ 2 marks at 326; ≤ 7 at 1240). Orphans are accepted there. |

Specimen: "Equal cells — a set that fills its rows", beside the Cluster strip, and "The 326
column, equal cells". Every surface band renders the Layout under a section heading.

---

## 11 · Accessibility

- `<span role="img" aria-label="{name}">`, empty. A screen reader says **"Aldermoor, image"**; in
  a `ul`, "list, 6 items" first. In a link: **"Aldermoor, link"** (the link takes the image's name).
- Keyboard: nothing bound; never a tab stop of its own.
- No ids, no idrefs.
- Forced colours: painted `CanvasText` (§6).
- Print: `print-color-adjust: exact`, because the paint is a background and browsers drop
  backgrounds in print by default.
- Reduced motion: nothing moves.
- A `<img>` fallback path was considered and not needed: the mask path works in forced colours.

---

## 12 · Content edge cases

| Case                          | Handling                                                                                                                                                                                                                                                                                            |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src` 404s or fails to decode | Box reserved at its computed size, paints nothing (a failed mask image is transparent); name still announced. **Not** the name as text: that retypes the client's name in our face, which ch05 §10 forbids ("never redrawn, retyped"). The row keeps its rhythm; the asset is a CMS defect. §17 Q7. |
| `src` empty                   | Renders nothing; dev warning.                                                                                                                                                                                                                                                                       |
| `src` not `.svg`              | Renders (a PNG with alpha masks correctly) and dev-warns: ch05 §10 takes SVG only.                                                                                                                                                                                                                  |
| `name` empty / whitespace     | Renders nothing; dev warning. A nameless image is worse than none.                                                                                                                                                                                                                                  |
| `width` / `height` ≤ 0, NaN   | Renders nothing; dev warning.                                                                                                                                                                                                                                                                       |
| Stated ratio slightly wrong   | Mask is `contain`: the artwork letterboxes inside the box, never crops or stretches.                                                                                                                                                                                                                |
| SVG with its own colours      | Ignored; alpha only. A mark with a white knock-out drawn as white paint (not a hole) loses it — the client file must carry holes as holes. Recorded against the asset.                                                                                                                              |
| `correction` outside ±0.15    | Clamped; dev warning.                                                                                                                                                                                                                                                                               |
| Very wide (12:1)              | Width cap 160, height follows (13).                                                                                                                                                                                                                                                                 |
| Square / tall                 | Height cap 40; reads a little lighter than wordmarks, as ch05 orders (area, then caps).                                                                                                                                                                                                             |
| Zero marks                    | The caller renders no strip.                                                                                                                                                                                                                                                                        |
| One mark                      | Same size and ink as in a set (specimen "A lone mark").                                                                                                                                                                                                                                             |
| Many marks (2×)               | The Cluster wraps; in a Layout, pick a count the columns divide (§10).                                                                                                                                                                                                                              |
| Narrow track (326)            | Cluster: wraps into rows. Layout `{ base: 2 }`: ~139 cells, a wider mark shrinks to its cell and letterboxes (§7). Both in the specimen.                                                                                                                                                            |
| Hairline / letter-spaced mark | A recorded `correction`. LatitudePay (7.4:1, hairline spaced capitals) carries **+0.15**, judged by eye at 1440 and 390, and renders 175 wide now the width cap does not re-apply after a correction (§17 Q10).                                                                                                   |
| Parent that does not size it  | Content-sized in flex and grid (`flex: none`, `justify-self: start`); `block-size` stated so `align="stretch"` cannot stretch it.                                                                                                                                                                   |
| Logical properties            | `inline-size` / `block-size`.                                                                                                                                                                                                                                                                       |
| Nested surface                | Takes the nearest `data-surface` (§6).                                                                                                                                                                                                                                                              |
| Two adjacent                  | The Cluster's gap separates them.                                                                                                                                                                                                                                                                   |
| Interactive content           | None. A link wraps the mark, never the reverse.                                                                                                                                                                                                                                                     |

---

## 13 · Motion

None. ch05 §10: never animated. No transition, no hover colour change, no marquee.

---

## 14 · Do's and Don'ts

- **Do** put a set of known size in equal cells — a `Layout` (`as="ul"`, each in an `li`) with a
  count the columns divide; use a `Cluster` when the count is not yours to choose (§10).
- **Do** pass the viewBox width and height as `width` / `height`.
- **Do** record a correction beside the asset, and only for unusually heavy or light strokes.
- **Don't** set `margin`, `padding`, `background`, `border`, `box-shadow`, `border-radius` or
  `animation` on a `.mark` from any stylesheet: `grep -rn "ClientMark" src --include=*.tsx` call
  sites carry no `className` other than a position.
- **Don't** pass "… logo" in `name`.
- **Don't** redraw, trace or recolour a client file to make it fit; supply the client's own SVG.
- **Don't** use ClientMark for a mark shown alone in full colour; that is a Figure.
- **Don't** place a real client's mark on a PUBLIC page without the client's written approval
  filed with the asset (ch05 §10). The proving ground (`/design/**`) uses the real set, as §15 says.

---

## 15 · Specimen plan

`/design/client-mark` renders: the strip of the nine real marks; the § 5.9 grid; shapes the set does
not have yet (fictional square, stacked, heavy −10%, hairline +12%, among real marks); the arithmetic per mark with computed sizes; the correction with and
without, and a clamped 0.4; the width cap (12:1); a lone mark; marks inside links; a 404 src
between two marks, outlined; the 326 column; paper, tint, ink and blue bands with identical markup;
a tint band nested in ink. Added 6 Oct 2026 (kit cmp-logos): desktop and phone sizes side by side
(the `-m` tokens swapped in by the harness's `.cmarkPhone`), and the 326 strip and grid at the phone
sizes. The records and their corrections are shared with the kit's H family in
`src/app/design/_specimen/clients.ts`. Added 29 Sep 2026 (2.17): equal cells in a `Layout` beside the Cluster
strip, the same at the 326 column, and a section heading above the marks on every surface band, so
the stepped-down ink is judged against the thing it must not compete with. The strip is the real client set (`public/clients/*.svg`, nine
wordmarks from the previous site's logo wall); the shapes it lacks (square, stacked, 12:1, heavy,
hairline) are fictional stress files (`public/design/client-mark-*.svg`, drawn black). Blueghost
and Rudo are held back: their files paint knock-outs white (§14). Forced colours is checked by emulation, not on the page.

---

## 16 · New token requests

Added in `src/styles/tokens/components/client-mark.css`, registered in `tokens/index.css`:

```
--cmark-target-side   56px          geometry, :root
--cmark-height-max    40px          geometry, :root (P2)
--cmark-width-max     160px         geometry, :root (the limit before a correction)
--cmark-target-side-m 44px          geometry, :root; the active side below 768
--cmark-height-max-m  32px          geometry, :root; the active height cap below 768
--cmark-width-max-m   128px         geometry, :root; the active width cap below 768
--cmark-ink-forced    CanvasText    forced colours, :root
--cmark-ink           per surface   neutral-600 · neutral-600 · neutral-300 · brandeis-200   (2.17; was 900 · 900 · white · white)
```

---

## 17 · Open questions

All non-blocking. Each records the choice built.

1. **Status word.** The brief asked for `approved`; the lifecycle is `draft | accepted |
implemented`. Built, so `implemented`, with the acceptance cited. **non-blocking**
2. **Ink on blue.** ch05 §10 names paper, paper-deep and ink only. _Built (28 Sep):_ white.
   _Rebuilt (29 Sep, 2.17):_ brandeis-200, 3.78:1 — the quieter-than-white step that still clears
   3:1 (measured against 50, 100 and 300 in §6). _Alternative:_ forbid marks on blue.
   **non-blocking**
3. **Correction vs caps.** _Built (6 Oct, kit cmp-logos fix round 2):_ correction applies to the
   capped size (ch05 §10's order) and only the height cap applies again, so P2's 40px cap stays
   absolute while the width cap is the set's limit before correction. _Was:_ both caps re-applied,
   which held LatitudePay to +5%. _Alternative:_ neither cap re-applied (a +15% capped mark reaches
   46 tall). **non-blocking** — owner to confirm on the kit review.
4. **One target and one set of caps site-wide.** ch05 speaks of "the set's" target and caps. _Built:_
   tokens, no prop. A client wall wanting larger marks gets a `size` prop when it exists.
   **non-blocking**
5. **Gap between marks.** _Resolved (29 Sep 2026, owner):_ `stack` (48) on both axes; 24 was too
   little. Cluster's ceiling was raised from `block` to `stack` to express it. **resolved**
6. **Linked marks and 24 × 24.** A 12:1 mark is 13 tall; as a link it misses SC 2.5.8 unless the
   spacing exception applies (it does in a Cluster with 48 gaps). _Built:_ nothing extra.
   **non-blocking**
7. **404 behaviour.** _Built:_ reserve the box, paint nothing, keep the name. _Rejected:_ render
   nothing (needs client-side detection, shifts the row) and name-as-text (retypes the mark, banned
   by ch05 §10). **non-blocking**
8. **Test asset location.** The brief said `public/design-assets/`; the repo's specimen assets live
   in `public/design/`. _Built:_ stress marks in `public/design/client-mark-*.svg`; real client files in
   `public/clients/`, since a page will place them too. **non-blocking**
9. **ch05 §10 names the full inks.** It still says "neutral-900 on paper and paper-deep,
   white on ink". _Built (2.17, owner):_ one step quieter (§6). The chapter needs the same
   amendment at its next revision, or the two disagree. **non-blocking** — flagged to the owner.
10. **LatitudePay's correction and the width cap.** _Built (6 Oct):_ +0.15, 175 wide, because the
    width cap no longer re-applies after a correction (Q3); the heavy bold marks (Doodle, GT Tools,
    Incluude) come down the full −0.15, so a course reads as one even grey line. _Was:_ +0.05, the
    most that took effect at 160, and it read visibly lighter than its neighbours. _Rejected:_
    raising the width cap, which changes every wide mark. **non-blocking**
11. **The § 5.9 grid's lg step and the corrected widest mark.** _Built:_ `{ base: 2, md: 3, lg: 5 }`
    as § 5.9 and the kit brief set it, so between 1024 and ~1130 a five-track cell (154–169) is
    narrower than LatitudePay's corrected 175, and the mark letterboxes by up to 12% there.
    _Alternative:_ `{ base: 2, md: 3, xl: 5 }` — 3 × 3 to 1439 in tracks ≥ 288, 5 + 4 from 1440 —
    which keeps the correction whole at every width and costs § 5.9's wording. **non-blocking** —
    for the owner on the kit review.

---

## Appendix — self-audit

| Check                       | Count / result                                                      |
| --------------------------- | ------------------------------------------------------------------- |
| Sections 0–17 present       | 18 of 18                                                            |
| Tokens named                | 1 surface-dependent (`--cmark-ink`, 4 of 4 surfaces) + 4 in `:root` |
| Colour cells                | 4 of 4 with an existing `--color-*`; 0 blank; 0 deltas              |
| Contrast figures            | 4, recorded; all ≥ 3:1 (logotype exemption, self-imposed floor)     |
| Distances off the gap scale | 0 (owns no gap)                                                     |
| `--space-*` reaches         | 0                                                                   |
| Type roles                  | 0                                                                   |
| JS-injected properties      | 4, in `JS_INJECTED` with the file named                             |
| BLOCKING questions          | 0                                                                   |
