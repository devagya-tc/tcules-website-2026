# ClientMark — component specification

## 0 · Front matter

|                     |                                                                                                                                                                                                                                                                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Component**       | ClientMark                                                                                                                                                                                                                                                                                                                         |
| **Tier**            | 1 · primitive (`src/components/`)                                                                                                                                                                                                                                                                                                  |
| **Status**          | `implemented` — accepted without a design round on owner ruling **P2** (`docs/phase-2-decisions.md`: "capped at ~40px tall, and sized to equal visual weight by area") and **DBF ch05 §10** (client logos: source, colour, size, never). See §17 Q1.                                                                               |
| **Token prefix**    | `--cmark-`                                                                                                                                                                                                                                                                                                                         |
| **Designer / date** | None. Written by Claude Code on 2026-09-28 from ch05 §10, ruling P2 and the audit's §4 "Client logos" row (`docs/component-audit.md`). Tracker 2.8.                                                                                                                                                                                |
| **Implements**      | `docs/component-audit.md` §4, job "Client logos": "a tier-1 primitive, `ClientMark`… The _strip_ is still not a component."                                                                                                                                                                                                        |
| **Implemented at**  | `src/components/ClientMark/ClientMark.tsx` · `src/components/ClientMark/ClientMark.module.css` · `src/styles/tokens/components/client-mark.css` · specimen `src/app/design/client-mark/page.tsx` · client set `public/clients/*.svg` · stress marks `public/design/client-mark-*.svg` · `scripts/tokens-check.mjs` (`JS_INJECTED`) |

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
width  = min( fitted × (1 + correction) ,  height-max × r ,  width-max )
height = width / r
```

The caps apply again after the correction, so a correction never breaks P2's 40px cap: a
downward correction always takes effect, an upward one only up to the cap (§17 Q3).

**Rejected:** a `size` t-shirt prop (sets differ in density, but no job asks for a second size
yet, §17 Q4); a full-colour variant (that is a Figure, §1); a hover-to-colour variant (ch05 §10:
never the client's colours in a set, and never animated).

---

## 5 · States

None. The mark is not interactive and nothing about it changes. When it sits in a link, the
link owns hover and focus; the mark's ink does not move (it is a token, not `currentColor`).

---

## 6 · Per-surface colour

| Token         | paper                                   | tint                                                  | ink                                              | blue                                             |
| ------------- | --------------------------------------- | ----------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------ |
| `--cmark-ink` | `--color-neutral-900` · 14.62:1 **[c]** | `--color-neutral-900` · 13.06:1 on paper-deep **[c]** | `--color-white` · 17.26:1 on neutral-950 **[c]** | `--color-white` · 6.23:1 on brandeis-500 **[c]** |

Logotypes are exempt from SC 1.4.3, and SC 1.4.11 does not apply to a logo; the ratios are
recorded, not floors.

- **paper, tint:** ch05 §10 verbatim ("neutral-900 on paper and paper-deep").
- **ink:** ch05 §10 verbatim ("white on ink").
- **blue:** ch05 §10 names no value for blue. "The ground's ink" there is white (`--sec-ink`), and
  ch02 puts our own wordmark "white throughout" on blue. Never a blue step: a mark in blue on blue
  is a tint, which §10 bans. §17 Q2.

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
Cluster's (`colGap` / `rowGap` = `block`, the Cluster's ceiling; §17 Q5).

**(b) Component sizes** (explicit names, literals in the token file with their measurement):

| Token                 | Value | Measured against                                                                                       |
| --------------------- | ----- | ------------------------------------------------------------------------------------------------------ |
| `--cmark-target-side` | 56px  | the side of the target square (area 3136 px²). A 4:1 wordmark → 112 × 28, 3:1 → 97 × 32; under the cap |
| `--cmark-height-max`  | 40px  | ruling P2, "~40px tall"                                                                                |
| `--cmark-width-max`   | 160px | a 4:1 wordmark at the height cap. A 12:1 wordmark stops at 160 × 13                                    |

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

Nothing changes at 1023 or 767, by rule: the distance and the size do not shift responsively. In a
narrow column the Cluster wraps the strip into rows; no mark shrinks to stay on one line (widest is
160, inside the 326 column). **Touch targets:** not applicable; the mark is not a target. When it
is wrapped in a link, the link's box is the mark's box (≥ 13 × 160 or 40 × 40); a linked strip
needs the link to meet 24 × 24, which a 12:1 mark (13 tall) does not on its own. §17 Q6.

---

## 10 · Composition

```tsx
<Section>
  <Cluster as="ul" colGap="block" rowGap="block" align="center">
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
| Many marks (2×)               | The Cluster wraps.                                                                                                                                                                                                                                                                                  |
| Narrow track (326)            | Wraps into rows (specimen).                                                                                                                                                                                                                                                                         |
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

- **Do** put marks in a set in a `Cluster` (`as="ul"`, each in an `li`).
- **Do** pass the viewBox width and height as `width` / `height`.
- **Do** record a correction beside the asset, and only for unusually heavy or light strokes.
- **Don't** set `margin`, `padding`, `background`, `border`, `box-shadow`, `border-radius` or
  `animation` on a `.mark` from any stylesheet: `grep -rn "ClientMark" src --include=*.tsx` call
  sites carry no `className` other than a position.
- **Don't** pass "… logo" in `name`.
- **Don't** redraw, trace or recolour a client file to make it fit; supply the client's own SVG.
- **Don't** use ClientMark for a mark shown alone in full colour; that is a Figure.
- **Don't** use a real client's mark on `/design/**`.

---

## 15 · Specimen plan

`/design/client-mark` renders: the strip of six shapes (wide 6:1, square 1:1, stacked 4:5, mid 3:1,
heavy −10%, hairline +12%); the arithmetic per mark with computed sizes; the correction with and
without, and a clamped 0.4; the width cap (12:1); a lone mark; marks inside links; a 404 src
between two marks, outlined; the 326 column; paper, tint, ink and blue bands with identical markup;
a tint band nested in ink. The strip is the real client set (`public/clients/*.svg`, nine
wordmarks from the previous site's logo wall); the shapes it lacks (square, stacked, 12:1, heavy,
hairline) are fictional stress files (`public/design/client-mark-*.svg`, drawn black). Blueghost
and Rudo are held back: their files paint knock-outs white (§14). Forced colours is checked by emulation, not on the page.

---

## 16 · New token requests

Added in `src/styles/tokens/components/client-mark.css`, registered in `tokens/index.css`:

```
--cmark-target-side   56px          geometry, :root
--cmark-height-max    40px          geometry, :root (P2)
--cmark-width-max     160px         geometry, :root
--cmark-ink-forced    CanvasText    forced colours, :root
--cmark-ink           per surface   neutral-900 · neutral-900 · white · white
```

---

## 17 · Open questions

All non-blocking. Each records the choice built.

1. **Status word.** The brief asked for `approved`; the lifecycle is `draft | accepted |
implemented`. Built, so `implemented`, with the acceptance cited. **non-blocking**
2. **Ink on blue.** ch05 §10 names paper, paper-deep and ink only. _Built:_ white, the ground's ink
   there and ch02's wordmark rule. _Alternative:_ forbid marks on blue. **non-blocking**
3. **Correction vs caps.** _Built:_ correction applies to the fitted size and the caps apply again,
   so P2's 40px cap is absolute. _Alternative:_ correction after the caps (a +15% capped mark
   reaches 46). **non-blocking**
4. **One target and one set of caps site-wide.** ch05 speaks of "the set's" target and caps. _Built:_
   tokens, no prop. A client wall wanting larger marks gets a `size` prop when it exists.
   **non-blocking**
5. **Gap between marks.** Cluster caps at `block` (24). A strip may want more air (32–48). That is a
   Cluster conversation, not a margin. _Built:_ `block`. **non-blocking**
6. **Linked marks and 24 × 24.** A 12:1 mark is 13 tall; as a link it misses SC 2.5.8 unless the
   spacing exception applies (it does in a Cluster with 24 gaps). _Built:_ nothing extra.
   **non-blocking**
7. **404 behaviour.** _Built:_ reserve the box, paint nothing, keep the name. _Rejected:_ render
   nothing (needs client-side detection, shifts the row) and name-as-text (retypes the mark, banned
   by ch05 §10). **non-blocking**
8. **Test asset location.** The brief said `public/design-assets/`; the repo's specimen assets live
   in `public/design/`. _Built:_ stress marks in `public/design/client-mark-*.svg`; real client files in
   `public/clients/`, since a page will place them too. **non-blocking**

---

## Appendix — self-audit

| Check                       | Count / result                                                      |
| --------------------------- | ------------------------------------------------------------------- |
| Sections 0–17 present       | 18 of 18                                                            |
| Tokens named                | 1 surface-dependent (`--cmark-ink`, 4 of 4 surfaces) + 4 in `:root` |
| Colour cells                | 4 of 4 with an existing `--color-*`; 0 blank; 0 deltas              |
| Contrast figures            | 4, recorded (logotype exemption)                                    |
| Distances off the gap scale | 0 (owns no gap)                                                     |
| `--space-*` reaches         | 0                                                                   |
| Type roles                  | 0                                                                   |
| JS-injected properties      | 4, in `JS_INJECTED` with the file named                             |
| BLOCKING questions          | 0                                                                   |
