# Button — component specification

## 0 · Front matter

|                        |                                                                                                                                                                                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Component**          | Button                                                                                                                                                                                                                                          |
| **Tier**               | 1 · primitive (`src/components/`)                                                                                                                                                                                                               |
| **Status**             | `implemented`                                                                                                                                                                                                                                   |
| **Token prefix**       | `--btn-`                                                                                                                                                                                                                                        |
| **Designer / date**    | None — this is a **reconstruction**, not a design. Written from the shipped implementation by Claude Code on 2026-08-19. No designer authored a brief for it; the component was built first and this document was recovered from it afterwards. |
| **Implements**         | No brief. `Button.tsx` and `tokens/components/button.css` both cite "the Button Spec Sheet", which resolved to nothing until this file existed — this is that sheet, and the citation is what it implements.                                    |
| **Implemented at**     | `src/components/Button/Button.tsx` · `src/components/Button/Button.module.css` · `src/styles/tokens/components/button.css` · specimen `src/app/design/button/page.tsx`                                                                          |
| **Spec reconstructed** | 2026-08-19, from the shipped implementation                                                                                                                                                                                                     |
| **Revised**            | 2026-08-25 — adds the `data-btn-link-group` contract in section 5, so a link Button can serve as the label of an enclosing whole-card or whole-row anchor.                                                                                      |

> **What this document is.** Both `Button.tsx` and `tokens/components/button.css` open by saying
> they were "built to the Button Spec Sheet". This is that sheet, reconstructed after the fact so
> the citation resolves. It is also the worked example for the spec-driven workflow: a designer
> writes one of these in Claude Design, Claude Code implements it here. Every value below is
> verifiable by opening the file beside it — no number in this document was invented for the
> document. Contrast ratios are marked **[q]** where they are quoted from a comment in the
> shipped CSS and **[c]** where they were computed for this spec from the ramp hexes in
> `primitives.css` using the WCAG 2.x relative-luminance formula.

---

## 1 · Identity

**What it is.** The one interactive control in the system. Three emphases against two tones, three
sizes, three content variants and seven states — and it contributes no colour and no distance of its
own. Every value comes from `--btn-*`, which the token layer re-declares once per surface, so one
piece of markup is correct on paper, on a tint panel, in the ink footer and on the blue pivot
without being told which ground it is standing on.

**Tier, and why.** A tier-1 primitive. It imports exactly two things — `@/lib/cx` and its own CSS
module — and nothing above `src/lib`. Notably it does **not** import `Icon`, which would be a
sideways import inside tier 1: an icon arrives as a `ReactNode` prop and the button sizes whatever
`<svg>` it is handed. It takes no data, reads no route, and knows nothing about `@/content`. That
is what makes it usable by every pattern and template without any of them being coupled to each
other.

**What it is NOT — three things, and who does each instead:**

| Not this                    | Who does it                                                                                                                                                                                                                                                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A text link in running copy | `Prose` (`--prose-link-ink`, `--prose-link-rule`, `--prose-link-underline-offset`) styles bare anchors inside rich text, and `globals.css` maps the bare `<a>` element. Button's `link` emphasis is a control that happens to read as text — uppercase mono, a wiping rule — not the anchor a paragraph produces. |
| A navigation item           | The `SiteNav` pattern, with its own token layer (`--nav-item-fg`, `--nav-item-bg-hover`, `--nav-item-height`). A nav item has a bar height, an active route and a mega-menu to open; a Button has none of those.                                                                                                  |
| The gap between two buttons | `Cluster`, which owns the inline axis and takes gap-scale step names. Button sets no outer spacing at all — see §10.                                                                                                                                                                                              |

**Nearest existing component, and why this is not a prop on it.** `Icon`. An icon-only Button and
an `<Icon>` render the same glyph at the same size, and the difference is entirely interaction: a
hit area, a focus ring, a disabled state, a cursor, a press step and four surfaces' worth of fills
and rings. Putting `onClick` on `Icon` would drag all of that into a component whose whole
contract is "a solid shape filled with `currentColor`, no colour of its own" — it would stop being
a drawing and start being a control, badly. The seam is drawn the other way instead: Button
overrides the glyph's size from `--btn-icon-size-*`, because the spec's rule is that the icon steps
with the _button_, and `Icon`'s own JSDoc records that its `size` prop is deliberately ignored
inside a control that sizes its own icons.

**How many appear on a page.** Solid: **one per view**, of either tone. A second solid means the
page has not decided which action it wants, and the reader will not decide for it. Ghost and link:
unbounded — a segmented filter set is four ghosts, a card deck is a link per card.

---

## 2 · Anatomy

| Part               | Required                                              | Element                                 | CSS class                             | Token `{part}` slot                                      |
| ------------------ | ----------------------------------------------------- | --------------------------------------- | ------------------------------------- | -------------------------------------------------------- |
| Box                | always                                                | `<button>`, or the element `as` names   | `.button` + `.{emphasis}` + `.{tone}` | `bg` (solid only) and `fg`                               |
| Fill               | solid at rest; ghost from hover onward; never on link | — (the box's `background`)              | —                                     | `bg`                                                     |
| Label              | unless `iconOnly`                                     | outer `<span>`                          | `.label`                              | — (carries `--btn-label-margin`)                         |
| Label ink          | with a label                                          | inner `<span>`                          | `.labelInk`                           | — (carries the tracking pull-back; hosts the link rule)  |
| Leading icon       | optional                                              | `<svg>`, direct child, before the label | — (matched by `.button > svg`)        | —                                                        |
| Trailing icon      | optional                                              | `<svg>`, direct child, after the label  | — (matched by `.button > svg`)        | —                                                        |
| Glyph, icon-only   | when `iconOnly`                                       | `<svg>`, the box's only child           | `.iconOnly` on the box                | —                                                        |
| Link rule          | link emphasis only                                    | `.link .labelInk::after`                | —                                     | `--btn-link-rule-width` / `-offset`                      |
| Focus ring         | keyboard focus only                                   | none — two rings in one `box-shadow`    | gated by `.live:focus-visible`        | `--btn-ring-color` / `-gap-color` / `-width` / `-offset` |
| Hit-area extension | when `extendHitArea`                                  | `.hit::after`                           | `.hit`                                | `--btn-hit-min`                                          |

**Content slots.** `children` (the label), `icon` (trailing glyph), `iconLeft` (leading glyph),
`aria-label` (the accessible name, required in place of a label when `iconOnly`).

**Where a part name became a class, and where it became a token slot.** The token grammar is
`--btn-{emphasis}-{colour}-{part}-{state}`, and `{part}` has exactly two values: `bg` and `fg`.
Everything else in the anatomy above is either a CSS class with no colour of its own (`.label`,
`.labelInk`, `.iconOnly`, `.hit`) or a shared token that drops the emphasis and colour segments
because it is the same on every variant (`--btn-height-md`, `--btn-ring-color`,
`--btn-disabled-bg`). The two vocabularies do not overlap: a _control_ has a `bg` and an `fg`;
a _surface_ has a ground and an ink, and those live in `section.css` under `--sec-*`.

The label is **two** elements and both are load-bearing. The outer span carries the optical margin;
the inner one pulls back the trailing letter-space so the 4px is measured ink to ink and a centred
label sits on true centre rather than half a pixel left of it.

---

## 3 · Props / API

| Prop            | Type                                                                   | Default                | What it decides                                                                                                                                                                                                             |
| --------------- | ---------------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`            | `ElementType`                                                          | `'button'`             | The rendered element. `'a'` for an external link, `Link` for an internal route. Also decides which disabled mechanism is emitted (§11).                                                                                     |
| `href`          | `string`                                                               | —                      | Destination when rendering as an anchor. Ignored by a native button.                                                                                                                                                        |
| `emphasis`      | `'solid' \| 'ghost' \| 'link'`                                         | `'solid'`              | How loud. Selects the `--btn-{emphasis}-*` colour block and, for `link`, drops the box entirely.                                                                                                                            |
| `tone`          | `'primary' \| 'neutral'`                                               | `'primary'`            | What it claims. Selects the `-primary-` or `-neutral-` colour axis.                                                                                                                                                         |
| `size`          | `'sm' \| 'md' \| 'lg'`                                                 | `'md'`                 | Height, label composite and icon size — together, and nothing else (§4).                                                                                                                                                    |
| `icon`          | `ReactNode`                                                            | —                      | Trailing glyph. Mutually exclusive with `iconLeft` at the type level.                                                                                                                                                       |
| `iconLeft`      | `ReactNode`                                                            | —                      | Leading glyph. Mutually exclusive with `icon` at the type level.                                                                                                                                                            |
| `iconOnly`      | `true \| false`                                                        | `false`                | Square box, no label, `aria-label` required, `emphasis` narrowed to `solid \| ghost`.                                                                                                                                       |
| `active`        | `boolean`                                                              | `false`                | The **held** second step — a selected filter, the current nav item, an open panel. Reads the same value a press reads.                                                                                                      |
| `busy`          | `boolean`                                                              | `false`                | An action in progress. Keeps the control focusable and named, emits `aria-busy="true"`, suppresses pointer-state styling and reads dedicated post-activation tokens. The caller still owns duplicate-activation prevention. |
| `disabled`      | `boolean`                                                              | `false`                | Removes the `.live` class, so no hover, press, active or focus rule can reach the control; also emits the right inert attribute for the element.                                                                            |
| `extendHitArea` | `boolean`                                                              | `false`                | Extends the pointer target to `--btn-hit-min` past the box without changing the box (§9).                                                                                                                                   |
| `type`          | `'button' \| 'submit' \| 'reset'`                                      | `'button'` when native | Only emitted for a real `<button>`. Defaulted away from the browser's `submit` so a control inside a form does not submit it by accident.                                                                                   |
| `className`     | `string`                                                               | —                      | Extra classes. Explicitly **not** for colour, background, padding, height or radius — all six live in the token layer, per surface.                                                                                         |
| `aria-label`    | `string`                                                               | —                      | Optional in general; **required** when `iconOnly`.                                                                                                                                                                          |
| …rest           | native button props minus `color`, `children`, `disabled`, `aria-busy` | —                      | Forwarded. The first two are redefined by the visual/content API; `disabled` and `aria-busy` are omitted so the mutually exclusive `disabled` / `busy` contract is authoritative.                                           |

**Deliberately not props.**

- **`hover`, `pressed`, `focus`.** The stylesheet's business, driven by `:hover`, `:active` and
  `:focus-visible`. A prop for any of them would let a caller show a state the pointer is not in.
  `active` and `busy` are the two exceptions, because application state is the only thing that
  knows which filter is selected or whether a request remains in progress.
- **`color`.** `color` is a real (if deprecated) HTML attribute, so a prop of that name collides
  with React's typing for every element this can render as, and the resulting error points at the
  DOM rather than at the design system. Hence `tone`.
- **`iconPosition`.** The side is carried by _which prop_ holds the glyph. Two props with a `never`
  on each other's field make "both sides" a compile error; a position enum would make it a runtime
  shrug.
- **`surface` / `theme` / `inverted`.** Surface is declared with `data-surface` on an ancestor —
  a `Section` — never on the control. That is what lets a button three components deep get the
  right treatment without being told where it is.
- **`outline` / `bordered`.** None of the three emphases carries an outline, on purpose. A ghost is
  always shown beside a solid, and two boxes of equal edge weight — one filled, one outlined — read
  as two buttons of the same rank before the label is parsed.
- **`margin` / `gap` / any spacing prop.** `Cluster` owns the gap.

**Prop combinations that are a compile error, not a review comment.** `ButtonProps` is
`ButtonBase & ButtonAvailability & ((WithLabel & (TrailingIcon | LeadingIcon)) | IconAlone)`, and
the `never`-typed fields in those unions are what make each of these fail `tsc` rather than fail review. All six
were verified against the shipped types:

| Written                            | Result                                                                                                                                                                                                                                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `icon` **and** `iconLeft` together | **Error.** `TrailingIcon` sets `iconLeft?: never`, `LeadingIcon` sets `icon?: never`; neither member of the union accepts both. Two glyphs read as two claims about one action, and the label loses the middle of the box.                                                                 |
| `iconOnly` with `emphasis="link"`  | **Error.** `IconAlone` declares `emphasis?: Exclude<ButtonEmphasis, 'link'>`, and intersecting that with the base's wider union removes `link`. Strip the box from an icon-only button and what is left is a bare glyph, indistinguishable from the decorative icons above a feature cell. |
| `iconOnly` without `aria-label`    | **Error.** `IconAlone` declares `'aria-label': string` as required. The glyph is `aria-hidden` (Icon hides every unlabelled glyph), so without a name the control is unlabelled to a screen reader and unfindable in a test.                                                               |
| `iconOnly` **and** `children`      | **Error.** `IconAlone` sets `children?: never`.                                                                                                                                                                                                                                            |
| No `children` and no `iconOnly`    | **Error.** `WithLabel` declares `children: ReactNode` as required, so a labelled button with nothing in it does not compile.                                                                                                                                                               |
| `busy` and `disabled` together     | **Error.** `ButtonAvailability` makes progress and unavailability mutually exclusive: busy must retain focus, while disabled must leave the tab order.                                                                                                                                     |

---

## 4 · Variants × sizes

Three emphases × two tones = **six combinations**, each available in three sizes and three content
variants.

|             | solid                                                                                                                                                                        | ghost                                                                                                             | link                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **primary** | The one action a view is asking for. Brandeis blue: on the web, blue means clickable, and nothing else on the page may borrow the colour.                                    | Secondary, same offer. No outline — the fill is the whole affordance, and it appears the moment the pointer does. | Reading rather than doing. No box at all, so it can sit in a paragraph or under a case title. |
| **neutral** | Ink. Claims nothing and gets the work done — and is the most legible button in the system. Where blue would make a utility sound like an offer: send, copy, download, close. | The default secondary.                                                                                            | Navigation.                                                                                   |

| Size | Height                 | Label composite                         | Icon                                    | Where it lands                                                                     |
| ---- | ---------------------- | --------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| `sm` | `--btn-height-sm` 32px | `--btn-text-sm` → `--text-ui-sm` (12px) | `--btn-icon-size-sm` → `--icon-size-14` | table rows, toolbars, filter sets, anything inside a dense grid cell               |
| `md` | `--btn-height-md` 40px | `--btn-text-md` → `--text-ui` (13px)    | `--btn-icon-size-md` → `--icon-size-16` | the default: headers, forms, cards, every button with no reason to be another size |
| `lg` | `--btn-height-lg` 48px | `--btn-text-lg` → `--text-ui-lg` (14px) | `--btn-icon-size-lg` → `--icon-size-18` | heroes, closing calls, and every button on a phone                                 |

**Steps with size:** height, the type composite, the icon size, and the icon-only square's width
(which is the height).

**Deliberately does not step with size:** box padding (`--btn-padding-x`), label margin
(`--btn-label-margin`), icon gap (`--btn-gap`), letter-spacing (`--btn-text-tracking`), radius,
ring width and offset, the link rule's width and offset, and every colour. The optical error those
distances correct is a property of the type at its size, not a proportion of the box — scaling them
would over-correct at 48 and under-correct at 32. The result is the point: **a button never looks
like a different button at a different size.** Letter-spacing is not even restated in the `.sm`
and `.lg` rules, because the `font` shorthand does not reset it — which is exactly what
`--btn-text-tracking` asserts by being a single value rather than three.

**Content variants:** label only (two to four words, terse and literal — most buttons should be
this); label plus one icon on one side; and icon alone (square at the size's height, `aria-label`
required).

`md` is the base rule and emits **no class**, matching the token layer where `--btn-height-md` is
what `.button` reads and `sm` / `lg` are the deltas.

---

## 5 · States

Seven states. `rest` and `disabled` are absolute; hover, focus and pressed are the interaction
ladder; `active` holds its second step; and `busy` is application progress with its own semantic
token names.

| State             | Driven by                                       | Solid                                     | Ghost                               | Link                                |
| ----------------- | ----------------------------------------------- | ----------------------------------------- | ----------------------------------- | ----------------------------------- |
| **rest**          | —                                               | `bg` + `fg`                               | `fg` only, no fill                  | `fg` only, no fill, rule hidden     |
| **hover**         | `:hover` on `.live`                             | `bg` → `-bg-hover`                        | fill appears: `-bg-hover`           | `fg` → `-fg-hover`; rule wipes in   |
| **focus**         | `:focus-visible` on `.live`                     | the hover value **plus** the ring         | the hover value **plus** the ring   | the hover value **plus** the ring   |
| **pressed**       | `:active` on `.live`                            | `bg` → `-bg-pressed`                      | `-bg-pressed` **and** `-fg-pressed` | `fg` → `-fg-pressed`; rule stays in |
| **active** (held) | `active` prop, as `.active`                     | `-bg-pressed`                             | `-bg-pressed` + `-fg-pressed`       | `-fg-pressed`; rule stays in        |
| **busy**          | `busy` prop, as `.busy` + `aria-busy="true"`    | `-bg-busy`                                | `-bg-busy` + `-fg-busy`             | `-fg-busy`; rule stays in           |
| **disabled**      | `disabled` prop → `.disabled` (and `:disabled`) | `--btn-disabled-bg` + `--btn-disabled-fg` | transparent + `--btn-disabled-fg`   | transparent + `--btn-disabled-fg`   |

### `data-btn-link-group` — link states driven by an enclosing anchor

One published contract, added 2026-08-25, and it applies to `link` emphasis only.

A whole-card or whole-row pattern — `BlockCard`, and any successor that wraps a row in one anchor —
is a single native anchor around everything it contains. Its read-more cta ought to be a real link
Button rather than a hand-drawn cue, but it cannot be an interactive element: a `<button>` or `<a>`
nested inside that anchor is invalid markup and a second focus stop for one destination. It therefore
renders `as="span"`.

A span is never hovered, focused or pressed. Every rule in the table above is gated on `.live` plus
one of those pseudo-classes, so a span-rendered Button would sit at rest permanently — the right
colour, and no underline, forever.

**The contract.** An ancestor carrying the `data-btn-link-group` attribute declares that **its**
`:hover`, `:focus-visible` and `:active` are the states of every link Button inside it. The caller
sets one attribute; Button's own stylesheet resolves the values.

| Driven by                             | What the link Button does                             |
| ------------------------------------- | ----------------------------------------------------- |
| `[data-btn-link-group]:hover`         | `fg` → `-fg-hover`; the underline wipes in            |
| `[data-btn-link-group]:focus-visible` | the same — the ancestor owns the ring, not the Button  |
| `[data-btn-link-group]:active`        | `fg` → `-fg-pressed`; the underline stays in          |

Three things about it are deliberate:

1. **It is an attribute, not a class or a custom property.** This is an agreement between two CSS
   Modules, and Modules hash class names while leaving attribute selectors global — so an attribute
   is the only name both sides can spell. The rejected alternative was for Button to expose a custom
   property the caller sets on hover; that would put a `--btn-*` name in a pattern's stylesheet and
   break the rule that a component never reads another component's tokens. The attribute keeps every
   value declared here.
2. **It adds no new token and no new value.** The driven rules read the same
   `--btn-link-{tone}-fg-hover` and `-fg-pressed` as the pointer rules, in the same order — hover and
   focus before pressed, so pointer-down wins while the pointer is also hovering. A driven Button is
   meant to be indistinguishable from a hovered one, not to have a second look.
3. **Reduced motion still applies.** The driven rules move the same `::after` pseudo-element as the
   pointer rules, so section 13's `prefers-reduced-motion` block covers them without a second media
   query. A caller cannot acquire un-answered motion by opting into the group.

It does **not** make the Button focusable, does not change its ARIA, and does not apply to `solid` or
`ghost` — a filled control inside a whole-card anchor is the thing this contract exists to avoid, not
a case to support.

**The state model is fixed, and it is not a token.**

1. **Hover and focus share `-hover`.** Focus is the hover treatment plus the ring, so a keyboard
   user is shown exactly what a pointer user is shown. `:focus-visible` is listed alongside
   `:hover` in every colour rule, which is why the fill is never restated in the focus block.
2. **Pressed and active share `-pressed`.** Pressing a stateful control therefore _previews_ the
   state it is about to hold. A call to action never enters `active`, which is why on a solid
   primary the deep step is only ever momentary.
3. **Busy has dedicated `-busy` tokens even where its values equal `-pressed`.** The state means
   request progress, not pointer pressure or selection, so its semantic contract must remain
   independently tunable. It keeps focus and the accessible name, exposes `aria-busy`, and removes
   `.live` so hover and press cannot overwrite it. It does not disable activation by itself; the
   request owner must guard duplicate work.
4. **Hover and pressed must never resolve to the same value** on any surface.
   **One caveat, and it is a defect rather than a nuance:** `active` renders identically to
   `pressed` by design, and on ghost emphasis the _only_ difference between held and not-held is a
   fill — a colour-only state, which the system's own audit forbids, announced nowhere to a screen
   reader. Link emphasis is better off only because the underline stays in. See open question 9.
5. **A state token exists only if the value MOVES on at least one surface.** Otherwise the token
   asserts a change that does not happen.
6. **Once a token is in the set, every surface declares it** — even where that surface's value
   equals its own rest. See §6.
7. **Every pointer state rule is gated on `.live`**, a class the component emits only when the
   button is neither disabled nor busy. It is derived inside the component rather than passed, so
   a caller cannot make a disabled or in-progress treatment interactive by forgetting a class. It
   is a class rather than a
   `:not(:disabled)` selector because an anchor has no `:disabled` to negate — gating on the
   enabled case is the only form that covers both elements.

**State tokens that deliberately do NOT exist:**

| Absent                                                               | Because                                                                                                                                             |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--btn-solid-primary-fg-hover` / `-fg-pressed`, and the neutral pair | A solid button's label never changes — not on hover, not on press, on any of the four surfaces. The absence is the assertion.                       |
| `--btn-solid-primary-fg-busy`, and the neutral equivalent            | A solid button's label also holds through request progress; only its field takes the busy token.                                                    |
| `--btn-ghost-*-fg-hover`                                             | A ghost's hover step _is_ the fill appearing. Its label holds still until the press.                                                                |
| `--btn-ghost-*-bg` / `--btn-link-*-bg` (rest)                        | Neither has a fill at rest. Ghost's box "is still there; it appears the moment the pointer does." Link has no box at all.                           |
| `--btn-link-*-bg-hover` / `-bg-pressed`                              | Link's hover step is a label colour, not a field.                                                                                                   |
| Any `-focus` token                                                   | Focus reads `-hover`, by rule 1.                                                                                                                    |
| Any `-active` token                                                  | `active` reads `-pressed`, by rule 2.                                                                                                               |
| Per-emphasis disabled tokens                                         | One `--btn-disabled-bg` / `--btn-disabled-fg` pair per surface. Solid takes both; ghost and link force `background: transparent` and take the `fg`. |

**Disabled is explicit tokens, never an opacity.** Opacity mixes the warm neutrals toward whatever
sits behind the control, so one declaration produces a different colour on every surface — and
over a blue fill it drops the label to roughly 2:1, an unreadable button that still looks like a
live one. A disabled label is the one thing in this component exempt from the 4.5:1 minimum,
because unavailable should look unavailable.

---

## 6 · Per-surface colour

This is the heart of the document. **34 surface-dependent tokens, declared four times each — 136
cells, none of them a delta and none of them empty.** A surface block that carried only its
differences from paper would not be self-contained: nest that surface inside a non-paper one and it
inherits the enclosing surface's values for everything it left out. The repetition is what makes
nesting safe, and `npm run tokens:check` fails the build if a block drifts.

Grounds, for reading the table: `paper` = `--color-paper`, `tint` = `--color-paper-deep`,
`ink` = `--color-neutral-950`, `blue` = `--color-brandeis-500`.

**How to read a ratio.** Each cell carries the measurement that makes it an accessibility floor: an
`fg` cell is measured against the field it sits on in that state, a `bg` cell against the label
that sits on it in that state. Text floors are AA 4.5:1; the ring is non-text and its floor is
3:1. `[q]` = quoted from a comment in `tokens/components/button.css` (or `Button.tsx` /
`Button.module.css`, noted inline). `[c]` = computed for this spec from the `primitives.css` hexes
by the WCAG relative-luminance formula. Every `[q]` value was recomputed and agreed to two
decimals, with one rounding note in §17.

### The table

| Token                            | paper                                                                                              | tint                                                                      | ink                                                               | blue                                                               |
| -------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------ |
| `--btn-solid-primary-bg`         | `--color-brandeis-500` · label 6.23:1 **[q]**                                                      | `--color-brandeis-500` · label 6.23:1 **[q]**                             | `--color-brandeis-500` · label 6.23:1 **[q]**                     | `--color-paper` · label 17.10:1 **[c]**                            |
| `--btn-solid-primary-bg-hover`   | `--color-brandeis-600` · label 7.59:1 **[c]**                                                      | `--color-brandeis-600` · label 7.59:1 **[c]**                             | `--color-brandeis-600` · label 7.59:1 **[c]**                     | `--color-neutral-200` · label 12.83:1 **[c]**                      |
| `--btn-solid-primary-bg-pressed` | `--color-brandeis-700` · label 10.16:1 **[c]**                                                     | `--color-brandeis-700` · label 10.16:1 **[c]**                            | `--color-brandeis-700` · label 10.16:1 **[c]**                    | `--color-neutral-300` · label 11.07:1 **[c]**                      |
| `--btn-solid-primary-bg-busy`    | `--color-brandeis-700` · label 10.16:1 **[c]**                                                     | `--color-brandeis-700` · label 10.16:1 **[c]**                            | `--color-brandeis-700` · label 10.16:1 **[c]**                    | `--color-neutral-300` · label 11.07:1 **[c]**                      |
| `--btn-solid-primary-fg`         | `--color-white` · 6.23:1 on rest bg **[q]**                                                        | `--color-white` · 6.23:1 on rest bg **[q]**                               | `--color-white` · 6.23:1 on rest bg **[q]**                       | `--color-neutral-950` · 17.10:1 on rest bg **[c]**                 |
| `--btn-solid-neutral-bg`         | `--color-neutral-950` · label 17.10:1 **[c]** (`Button.tsx` says "17:1")                           | `--color-neutral-950` · label 17.10:1 **[c]**                             | `--color-paper` · label 17.10:1 **[c]**                           | `--color-neutral-950` · label 17.10:1 **[c]**                      |
| `--btn-solid-neutral-bg-hover`   | `--color-neutral-800` · label 11.81:1 **[c]**                                                      | `--color-neutral-800` · label 11.81:1 **[c]**                             | `--color-neutral-200` · label 12.83:1 **[c]**                     | `--color-neutral-900` · label 14.62:1 **[c]**                      |
| `--btn-solid-neutral-bg-pressed` | `--color-neutral-700` · label 8.14:1 **[c]**                                                       | `--color-neutral-700` · label 8.14:1 **[c]**                              | `--color-neutral-300` · label 11.07:1 **[c]**                     | `--color-neutral-800` · label 11.81:1 **[c]**                      |
| `--btn-solid-neutral-bg-busy`    | `--color-neutral-700` · label 8.14:1 **[c]**                                                       | `--color-neutral-700` · label 8.14:1 **[c]**                              | `--color-neutral-300` · label 11.07:1 **[c]**                     | `--color-neutral-800` · label 11.81:1 **[c]**                      |
| `--btn-solid-neutral-fg`         | `--color-paper` · 17.10:1 on rest bg **[c]**                                                       | `--color-paper` · 17.10:1 on rest bg **[c]**                              | `--color-neutral-950` · 17.10:1 on rest bg **[c]**                | `--color-paper` · 17.10:1 on rest bg **[c]**                       |
| `--btn-ghost-primary-fg`         | `--color-brandeis-500` · 6.17:1 on ground **[c]**                                                  | `--color-brandeis-500` · 5.51:1 on ground **[c]**                         | `--color-brandeis-200` · 10.48:1 on ground **[q]**                | `--color-white` · 6.23:1 on ground **[q]**                         |
| `--btn-ghost-primary-fg-pressed` | `--color-brandeis-600` · 5.99:1 on pressed fill **[c]**                                            | `--color-brandeis-600` · 4.61:1 on pressed fill **[c]**                   | `--color-brandeis-200` · 7.23:1 on pressed fill **[c]**           | `--color-white` · 10.16:1 on pressed fill **[c]**                  |
| `--btn-ghost-primary-bg-hover`   | `--color-brandeis-50` · label 5.57:1 **[q]**                                                       | `--color-brandeis-100` · label 4.91:1 **[q]**                             | `--color-neutral-900` · label 8.95:1 **[c]**                      | `--color-brandeis-600` · label 7.59:1 **[c]**                      |
| `--btn-ghost-primary-bg-pressed` | `--color-brandeis-100` · label 5.99:1 **[c]**                                                      | `--color-brandeis-200` · label 4.61:1 **[c]**                             | `--color-neutral-800` · label 7.23:1 **[c]**                      | `--color-brandeis-700` · label 10.16:1 **[c]**                     |
| `--btn-ghost-primary-bg-busy`    | `--color-brandeis-100` · label 5.99:1 **[c]**                                                      | `--color-brandeis-200` · label 4.61:1 **[c]**                             | `--color-neutral-800` · label 7.23:1 **[c]**                      | `--color-brandeis-700` · label 10.16:1 **[c]**                     |
| `--btn-ghost-primary-fg-busy`    | `--color-brandeis-600` · 5.99:1 on busy fill **[c]**                                               | `--color-brandeis-600` · 4.61:1 on busy fill **[c]**                      | `--color-brandeis-200` · 7.23:1 on busy fill **[c]**              | `--color-white` · 10.16:1 on busy fill **[c]**                     |
| `--btn-ghost-neutral-fg`         | `--color-neutral-900` · 14.62:1 on ground **[c]** (matches `section.css`)                          | `--color-neutral-900` · 13.06:1 on ground **[c]** (matches `section.css`) | `--color-white` · 17.26:1 on ground **[c]**                       | `--color-white` · 6.23:1 on ground **[q]**                         |
| `--btn-ghost-neutral-fg-pressed` | `--color-neutral-950` · 12.83:1 on pressed fill **[c]**                                            | `--color-neutral-950` · 11.07:1 on pressed fill **[c]**                   | `--color-white` · 11.92:1 on pressed fill **[c]**                 | `--color-white` · 10.16:1 on pressed fill **[c]**                  |
| `--btn-ghost-neutral-bg-hover`   | `--color-neutral-100` · label 12.37:1 **[c]**                                                      | `--color-neutral-200` · label 10.97:1 **[c]**                             | `--color-neutral-900` · label 14.75:1 **[c]**                     | `--color-brandeis-600` · label 7.59:1 **[c]**                      |
| `--btn-ghost-neutral-bg-pressed` | `--color-neutral-200` · label 12.83:1 **[c]**                                                      | `--color-neutral-300` · label 11.07:1 **[c]**                             | `--color-neutral-800` · label 11.92:1 **[c]**                     | `--color-brandeis-700` · label 10.16:1 **[c]**                     |
| `--btn-ghost-neutral-bg-busy`    | `--color-neutral-200` · label 12.83:1 **[c]**                                                      | `--color-neutral-300` · label 11.07:1 **[c]**                             | `--color-neutral-800` · label 11.92:1 **[c]**                     | `--color-brandeis-700` · label 10.16:1 **[c]**                     |
| `--btn-ghost-neutral-fg-busy`    | `--color-neutral-950` · 12.83:1 on busy fill **[c]**                                               | `--color-neutral-950` · 11.07:1 on busy fill **[c]**                      | `--color-white` · 11.92:1 on busy fill **[c]**                    | `--color-white` · 10.16:1 on busy fill **[c]**                     |
| `--btn-link-primary-fg`          | `--color-brandeis-500` · 6.17:1 on ground **[c]**                                                  | `--color-brandeis-500` · 5.51:1 on ground **[c]**                         | `--color-brandeis-300` · 7.32:1 on ground **[q]**                 | `--color-white` · 6.23:1 on ground **[q]**                         |
| `--btn-link-primary-fg-hover`    | `--color-brandeis-600` · 7.52:1 on ground **[c]**                                                  | `--color-brandeis-600` · 6.72:1 on ground **[c]**                         | `--color-brandeis-200` · 10.48:1 on ground **[q]**                | `--color-brandeis-50` · 5.57:1 on ground **[q]**                   |
| `--btn-link-primary-fg-pressed`  | `--color-brandeis-700` · 10.07:1 on ground **[c]**                                                 | `--color-brandeis-700` · 8.99:1 on ground **[c]**                         | `--color-brandeis-100` · 13.61:1 on ground **[c]**                | `--color-brandeis-100` · 4.91:1 on ground **[q]**                  |
| `--btn-link-primary-fg-busy`     | `--color-brandeis-700` · 10.07:1 on ground **[c]**                                                 | `--color-brandeis-700` · 8.99:1 on ground **[c]**                         | `--color-brandeis-100` · 13.61:1 on ground **[c]**                | `--color-brandeis-100` · 4.91:1 on ground **[q]**                  |
| `--btn-link-neutral-fg`          | `--color-neutral-900` · 14.62:1 on ground **[c]**                                                  | `--color-neutral-900` · 13.06:1 on ground **[c]**                         | `--color-white` · 17.26:1 on ground **[c]**                       | `--color-white` · 6.23:1 on ground **[q]**                         |
| `--btn-link-neutral-fg-hover`    | `--color-brandeis-500` · 6.17:1 on ground **[c]**                                                  | `--color-brandeis-500` · 5.51:1 on ground **[c]**                         | `--color-brandeis-300` · 7.32:1 on ground **[q]**                 | `--color-brandeis-50` · 5.57:1 on ground **[q]**                   |
| `--btn-link-neutral-fg-pressed`  | `--color-brandeis-600` · 7.52:1 on ground **[c]**                                                  | `--color-brandeis-600` · 6.72:1 on ground **[c]**                         | `--color-brandeis-200` · 10.48:1 on ground **[q]**                | `--color-brandeis-100` · 4.91:1 on ground **[q]**                  |
| `--btn-link-neutral-fg-busy`     | `--color-brandeis-600` · 7.52:1 on ground **[c]**                                                  | `--color-brandeis-600` · 6.72:1 on ground **[c]**                         | `--color-brandeis-200` · 10.48:1 on ground **[q]**                | `--color-brandeis-100` · 4.91:1 on ground **[q]**                  |
| `--btn-disabled-bg`              | `--color-neutral-100` · label 2.68:1, **exempt** **[c]**                                           | `--color-neutral-200` · label 2.37:1, **exempt** **[c]**                  | `--color-neutral-800` · label 2.40:1, **exempt** **[c]**          | `--color-brandeis-600` · label 3.22:1, **exempt** **[c]**          |
| `--btn-disabled-fg`              | `--color-neutral-500` · 2.68:1 on disabled bg, **exempt** **[c]** (`Button.module.css` says 2.6:1) | `--color-neutral-500` · 2.37:1 on disabled bg, **exempt** **[c]**         | `--color-neutral-600` · 2.40:1 on disabled bg, **exempt** **[c]** | `--color-brandeis-300` · 3.22:1 on disabled bg, **exempt** **[c]** |
| `--btn-ring-color`               | `--color-brandeis-500` · 6.17:1 on the gap **[c]** — floor 3:1                                     | `--color-brandeis-500` · 5.51:1 on the gap **[c]** — floor 3:1            | `--color-brandeis-300` · 7.32:1 on the gap **[q]** — floor 3:1    | `--color-white` · 6.23:1 on the gap **[q]** — floor 3:1            |
| `--btn-ring-gap-color`           | `--color-paper` · n/a — decoration (the ground restated, so the ring reads against any fill)       | `--color-paper-deep` · n/a — decoration                                   | `--color-neutral-950` · n/a — decoration                          | `--color-brandeis-500` · n/a — decoration                          |

Two notes on the last row. The gap colour is the surface's own ground written out again in the
button's layer rather than read from `--sec-ground`, because a component never reads another
component's tokens — the duplication is deliberate, and it is what lets a button sit on a panel
that is not a `Section` and still ring correctly. And its job is geometric rather than
communicative: it is the surface-coloured hairline that separates the ring from the fill, which is
why it carries no ratio of its own.

### What moved, per surface

**paper** — the default and the origin; every other surface is measured against it. The one
non-obvious decision here is `link-neutral`, which turns **blue on hover**: rest → hover → pressed
runs `--color-neutral-900` → `--color-brandeis-500` → `--color-brandeis-600`. It used to hold
`--color-neutral-900` through both rest and hover and move only on press, which meant a neutral
link had no hover affordance at all — and because focus is "the hover treatment plus the ring", a
link with no fill degraded to ring-only for keyboard users.

**tint** — a tint that worked on paper is already the colour of this panel, so **both ghost fills
step down one** and stay one step apart: primary hover 50→100 and pressed 100→200, neutral hover
100→200 and pressed 200→300. `--btn-disabled-bg` steps with them, 100→200. `--btn-ring-gap-color`
follows the ground to `--color-paper-deep`. Everything else matches paper — and is restated anyway.
The cost of the step-down is visible in the numbers: ghost-primary on tint runs 5.51:1 at rest,
4.91:1 on the hover fill and 4.61:1 on the pressed fill, which is the tightest text margin
anywhere in the component. It clears AA and there is no room to step again.

**ink** — **blue does not move**: solid primary keeps `--color-brandeis-500` with a white label and
runs 600 / 700 exactly as on paper, so the primary action is recognisably the same object here. It
is restated rather than inherited, because inheriting it would mean an ink panel nested inside a
blue section picked up blue's _inverted_ primary. **The neutrals reverse** — solid neutral becomes
paper with an ink label, ghost and link neutral become white. Two values are contrast floors rather
than preferences: blue as ink and blue as a 2px ring both reach only **2.77:1 [q]** on
`--color-neutral-950`, so a blue label lifts to `--color-brandeis-200` (**10.48:1 [q]**) and the
ring to `--color-brandeis-300` (**7.32:1 [q]**). A ghost carries **neutral** fills in both steps,
900 then 800, and never a blue tint: at the pale end of the blue ramp there is no tint left to see.

**blue** — the one surface where the primary cannot be blue. Solid primary **inverts** to
`--color-paper` with an ink label; ghost fills with the ramp _below_ the ground, 600 then 700.
**Primary and neutral collapse for ghost and link** — all eight tokens read `--color-white` or the
same pale pair — and that is correct: on a blue field there is one voice. The link states run white
→ 50 → 100 rather than stopping at white for two steps, and stop there rather than continuing to
200 the way ink does, because only the light end of the ramp clears AA on a `--color-brandeis-500`
ground: white **6.23:1 [q]**, 50 is **5.57:1 [q]**, 100 is **4.91:1 [q]**, and 200 is already
**3.78:1 [q]**.

### The nested-surface case

The repetition above exists for exactly one specimen: **a tint panel nested inside an ink
section.** Before every block restated every token, a tint block carrying only its two ghost fills
inherited ink's values for everything it omitted, and that panel rendered ghost-neutral at
**1.13:1 [q]** (ink's white label on a tint ground), link-primary at **2.09:1 [q]** and a focus
ring at **2.09:1 [q]** against its own gap — a button that had lost its label, its link and its
ring. Both quoted figures were reproduced independently for this spec: `--color-white` on
`--color-paper-deep` is 1.13:1 **[c]**, and `--color-brandeis-300` — ink's `link-primary-fg` and
its `ring-color` — on `--color-paper-deep` is 2.09:1 **[c]**.

The rule this fixes: **buttons inside a nested surface must be indistinguishable from buttons on
that surface at the top level.** The specimen route gives it its own band so the claim can be
checked by looking, including tabbing through to see the ring.

---

## 7 · Geometry & spacing

### Gap-scale distances

**None.** Button consumes no `--gap-*` token at all — the scale appears in `button.css` only inside
comments, arguing why each internal distance is _not_ a gap-scale step. Every distance inside the
box is an optical correction (below), and every distance _between_ buttons belongs to the
`Cluster` that holds them (`tight` 8, `text` 16, `block` 24 in the specimen). That division is the
whole point of the primitive: the button owns its own optics, the container owns the layout.

### Component sizes — t-shirt names, literals allowed, each measured against something

| Token                | Value                       | Measured against                                                                                                                                                                                                              |
| -------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--btn-height-sm`    | `32px` (literal)            | a dense grid cell — a table row, a toolbar                                                                                                                                                                                    |
| `--btn-height-md`    | `40px` (literal)            | an input, a select and a status pill on the same row. Height is declared explicitly rather than derived from vertical padding precisely so a button lines up with those without any of them being measured against each other |
| `--btn-height-lg`    | `48px` (literal)            | the 44px touch floor, which it clears on its own                                                                                                                                                                              |
| `--btn-hit-min`      | `44px` (literal)            | the WCAG / platform touch-target minimum                                                                                                                                                                                      |
| `--btn-icon-size-sm` | `--icon-size-14`            | a 14px glyph inside a 32px control                                                                                                                                                                                            |
| `--btn-icon-size-md` | `--icon-size-16`            | a 16px glyph inside a 40px control                                                                                                                                                                                            |
| `--btn-icon-size-lg` | `--icon-size-18`            | an 18px glyph inside a 48px control                                                                                                                                                                                           |
| `--btn-ring-width`   | `--focus-ring-width` (2px)  | the system's one ring weight, shared by every focusable control                                                                                                                                                               |
| `--btn-ring-offset`  | `--focus-ring-offset` (2px) | as above                                                                                                                                                                                                                      |

The four literals are the only literals in the whole token file, and they are correct as literals:
a control height is a component size, not a shared distance, so it takes a t-shirt name and an
honest number rather than borrowing a role name from the gap scale.

### Optical corrections that reach `--space-*`

Five tokens reach past the gap scale into the space ramp. Four are argued together in the geometry
block, the fifth separately, and every one names the gap-scale step it is deliberately _not_:

| Token                    | Value                                       | The justification, as the CSS states it                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--btn-padding-x`        | `--space-8` — "optical, not `--gap-tight`"  | An uppercase Geist Mono glyph starts at its side bearing and ends with a trailing track, so 8px of padding around a label **reads as 6**. The number was measured against Geist Mono's uppercase side bearings at 13px, not chosen off a scale — `--gap-tight` would be a coincidence here, and the day the gap scale is re-tuned this button must not move.                                                                                                                                             |
| `--btn-label-margin`     | `--space-4` — "optical, not `--gap-inline`" | The extra 4px restores what the type gives away: the visible inset becomes 12 and **reads as 8**.                                                                                                                                                                                                                                                                                                                                                                                                        |
| `--btn-gap`              | `--space-4` — "optical, not `--gap-inline`" | An icon needs no side-bearing correction — a glyph in this set is drawn with ~2px of clearance inside its own box, so 8 to the box edge puts it optically level with a label that has 12. The 4px gap plus the label's 4px margin makes the same **8 between label ink and icon box**, so the glyph sits centred in its own field. That clearance is a convention of the set rather than a property of the artwork, which is why these three numbers survived the glyph set going from stroked to solid. |
| `--btn-gap-bare`         | `--space-8`                                 | Link emphasis has no box and no label margin, so it carries the whole 8 as its gap — there is no box padding left for the 4+4 to add to.                                                                                                                                                                                                                                                                                                                                                                 |
| `--btn-link-rule-offset` | `--space-2`                                 | An optical correction under a 13px uppercase mono baseline, not a layout distance. The spec sheet measured 3px; the ramp has no 3 between `--space-2` and `--space-4`, so this is the nearest existing step rather than a new one.                                                                                                                                                                                                                                                                       |

**The three numbers, stated once:** 8 box padding / 4 label margin / 4 icon gap. They differ
because the things they space differ, and none of them scales with the size.

### Radius, border, shadow

|                           | Value                             | Note                                                                                                                                                                                        |
| ------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--btn-radius`            | `--radius-8`                      | solid and ghost                                                                                                                                                                             |
| `--btn-radius-bare`       | `--radius-0`                      | link has no box, so it has no corner                                                                                                                                                        |
| `--btn-radius-bare-focus` | `--radius-4`                      | …but its focus ring takes one, or the ring draws a hard rectangle around a bare label and invents a box the link does not have                                                              |
| Border width              | **zero** — `border: 0` on the box | No emphasis carries an outline. Separation comes from fill and from the space around it. `--btn-link-rule-width` → `--border-width-hairline` (1px) is the link's _underline_, not a border. |
| `--btn-shadow`            | `--shadow-none`                   | There is no elevation in this system. The `box-shadow` property is used for one thing only: the focus ring.                                                                                 |

---

## 8 · Typography

| Part        | Role                                           | Tracking companion                           |
| ----------- | ---------------------------------------------- | -------------------------------------------- |
| Label, `sm` | `--btn-text-sm` → `--text-ui-sm`               | `--btn-text-tracking` → `--text-ui-tracking` |
| Label, `md` | `--btn-text-md` → `--text-ui`                  | `--btn-text-tracking` → `--text-ui-tracking` |
| Label, `lg` | `--btn-text-lg` → `--text-ui-lg`               | `--btn-text-tracking` → `--text-ui-tracking` |
| Icon        | none — a glyph, sized from `--btn-icon-size-*` | none                                         |
| Link rule   | none — a drawn rule, not `text-decoration`     | inset on the right by `--btn-text-tracking`  |

**One tracking value for all three sizes.** `--btn-text-tracking` is a single token, not three,
and the `.sm` / `.lg` rules do not restate `letter-spacing` — the `font` shorthand does not reset
it, so all three sizes track alike from the base rule. That is the assertion the single token
makes.

**The uppercase decision. Amended 25 Aug 2026 — it is no longer this component's decision.** Mono
is always uppercase system-wide, so the rule reads `text-transform: var(--text-mono-case)` and the
argument below is now the token layer's (`tokens/primitives.css` § Type · case, `CLAUDE.md` § type
rules). Nothing about this control's rendering moves; what moves is where the decision is stated,
and reversing it is one declaration for every mono label on the site rather than for this one.
`text-transform` is applied by the stylesheet, never by the
copy. Three consequences, all of them the reason: the accessible name a screen reader reads is the
sentence-case DOM text rather than shouted capitals; a label that arrives from the CMS in caps
cannot double-transform; and a designer or an editor writing "Start a project" cannot accidentally
ship "START A PROJECT" as content. Uppercase is presentation, and it lives where presentation
lives.

**Why the label restates no size.** Type is consumed as a composite: `font: var(--btn-text-md)`
carries family, weight, size and line-height ratio in one declaration, and
`letter-spacing: var(--btn-text-tracking)` is the second half. Rebuilding a font by hand out of
the ladder is how a control ends up with no line-height at all and inherits body's 1.6.

Two details worth keeping. The face is pinned to mono through the usage token rather than by
naming a family: the 8/4/4 rule was measured against Geist Mono's bearings, this repo settled on
one mono, and `--text-ui` composites it — so consuming the usage token _is_ the pinned face. And
the composite brings the ladder's line-height rather than the sheet's `1`, which changes nothing:
the height is fixed and the label is flex-centred.

---

## 9 · Responsive

**What changes at a breakpoint: nothing.** `Button.module.css` contains exactly one at-rule, and it
is `prefers-reduced-motion`. No media query swaps a size, a distance, a colour or an arrangement.
That is the system rule stated as a component: the scale does not shift responsively — the
_layout_ changes at a breakpoint, the distance does not. A button that should be bigger on a phone
is passed `size="lg"` by the composition that knows it is a phone-first hero, not by a breakpoint
inside the control.

**The 44px touch floor, and the two legal means:**

1. **`size="lg"`.** At 48 the box already clears the floor and needs no extension. This is the
   preferred answer, and the spec says so twice — in the `ButtonSize` JSDoc ("`lg` … every button
   on a phone") and in the `extendHitArea` JSDoc. Reach for it first.
2. **`extendHitArea`.** For a control that must stay at 32 or 40 on touch — a toolbar, a dense
   table row — where inflating the box would break the row it sits in.

**What `extendHitArea` does, exactly.** It adds `.hit`, which makes the box a positioning context
and hangs a `::after` pseudo-element on it: pinned `left: 0; right: 0`, `height: --btn-hit-min`
(44px), and vertically centred on the box with `top: 50%` + `translateY(-50%)`. So the _pointer
target_ grows past the box in the block axis — 6px above and below a 32px button, 2px above and
below a 40px one — while the box, the row it sits in and every alignment around it stay exactly
where they were. The layout does not move and the target is legal. It draws nothing: no background,
no border, no outline. On a disabled button it is inert along with everything else, because
`pointer-events: none` is set on the box.

**When to prefer which.** If the button can simply be `lg` at that breakpoint, make it `lg`. Use
`extendHitArea` only when the density is the point.

---

## 10 · Composition

A Button belongs **inside a `Cluster`**, and the Cluster owns the gap. A row of buttons is
`<Cluster colGap="text" rowGap="text">`; a segmented filter set is `colGap="tight"`; a pair set
apart from its neighbours is `colGap="block"`. Cluster caps at `block` (24), which is the right
ceiling for a wrapping control row.

**A Button sets no outer spacing of its own — ever.** No margin, on any side, in any emphasis. A
child with a margin breaks the container primitive's only contract, and the cause is invisible in
the markup. The margins that _do_ exist inside the component (`--btn-label-margin` on `.label`,
the negative pull-back on `.labelInk`) are internal optical corrections between two spans the
component owns; they never touch the box's outer edge.

The rest of the composition contract:

- **Surface comes from an ancestor.** Put the button inside a `Section` (or any element carrying
  `data-surface`) and the token layer does the rest. Never put `data-surface` on the button.
- **Never set colour, background, padding, height or radius via `className`.** All six live in the
  token layer, per surface, and a hand-set value is exactly the drift the layer exists to prevent.
- **Columnar arrangement is `Layout`'s.** A button in a card sits in the card's `Layout` track.
- **One solid per view**, of either tone.
- **Icons arrive as elements**, and must be _direct_ children of the box: `.button > svg` is what
  sizes them, so a wrapper `<div>` around an `<Icon>` would not be sized.

---

## 11 · Accessibility

**Semantics.** `as` decides the element, and the element decides the semantics.

|                  | `<button>` (default)              | anchor (`as="a"`, `as={Link}`)                                                                                   |
| ---------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Role             | button                            | link                                                                                                             |
| Purpose          | does something in place           | changes where you are                                                                                            |
| `type`           | emitted, defaulting to `"button"` | not emitted — meaningless on an `<a>`                                                                            |
| Disabled         | the real `disabled` attribute     | `aria-disabled` plus `tabIndex={-1}`, because `disabled` is not valid on an anchor and would be dropped silently |
| Typical emphasis | solid, ghost                      | link                                                                                                             |

Paths for the `href` come from `@/lib/routes`, never written out at the call site.

### The keyboard, key by key

The component registers **no key handler of its own** — every row below is the browser's native
behaviour for the element, which is the whole reason `as` decides the element rather than the
component faking a role. The table is therefore also the list of what a re-implementation must
_not_ add.

| Key                              | Native `<button>`                      | Anchor                                                  | Notes                                                                                                                                                                                                                                                                                                               |
| -------------------------------- | -------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`                            | moves focus in; draws the ring         | same                                                    | `:focus-visible` matches, so the ring appears                                                                                                                                                                                                                                                                       |
| `Shift+Tab`                      | moves focus out backwards              | same                                                    |                                                                                                                                                                                                                                                                                                                     |
| `Enter`                          | activates                              | activates (navigates)                                   |                                                                                                                                                                                                                                                                                                                     |
| `Space`                          | activates                              | **nothing** — scrolls the page                          | The one real behavioural difference between the two elements. It is a reason to pick the element by meaning: a control that _does_ something must be a `<button>` so Space works.                                                                                                                                   |
| `Escape`                         | **deliberately unbound**               | **deliberately unbound**                                | A button opens nothing and holds nothing to dismiss. Escape belongs to the thing a button opened — a drawer, a mega-menu panel — and binding it here would swallow the key from an ancestor that needs it.                                                                                                          |
| `Arrow` keys (all four)          | **deliberately unbound**               | **deliberately unbound**                                | Arrow navigation belongs to a composite widget — a real radiogroup, tablist or menu. The segmented filter set in the specimen is a row of independent buttons in a `Cluster`, each individually tabbable, not a roving-tabindex group. Binding arrows would half-implement a pattern and break the tab expectation. |
| `Home` / `End`                   | **deliberately unbound**               | **deliberately unbound**                                | Same reason: they are composite-widget keys.                                                                                                                                                                                                                                                                        |
| Any single character             | **deliberately unbound**               | **deliberately unbound**                                | No typeahead. There is no list to jump within.                                                                                                                                                                                                                                                                      |
| `Enter` / `Space` while disabled | nothing — the element is not focusable | nothing — `tabIndex={-1}` removes it from the tab order | See open question 8: an `aria-disabled` anchor keeps its `href`, so activation is suppressed by removal from the tab order and `pointer-events: none`, not by the platform.                                                                                                                                         |

### Focus order, and where focus goes after each state change

**Order.** Exactly DOM order. The component never sets a positive `tabIndex`, never reorders
anything, and never contains a second focusable element — the label spans are inert `<span>`s and
the glyph carries `focusable="false"`. A `Cluster` of five buttons is five tab stops, left to
right, in source order. A row that wraps is still source order, which is the same as visual order
because `Cluster` does not reverse or reflow.

**After each state change:**

| Change                                   | Where focus goes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hover / unhover                          | Unaffected. Hover is not a focus event, and the ring is `:focus-visible`-gated, so pointing at a focused button neither adds nor removes a ring.                                                                                                                                                                                                                                                                                                                                                                          |
| press and release (pointer)              | Focus lands on the button per the platform's own rules, but the ring does **not** appear: `:focus-visible` does not match a pointer interaction. This is the intended asymmetry.                                                                                                                                                                                                                                                                                                                                          |
| activate by keyboard                     | Focus **stays on the button**, ring intact. Nothing about the control moves it.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `active` toggled on or off by the caller | Focus stays exactly where it was — `active` changes one class and nothing else.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `busy` toggled on or off by the caller   | Focus stays on the control and the label stays unchanged. While busy, the ring remains available and pointer-state styling is suppressed.                                                                                                                                                                                                                                                                                                                                                                                 |
| becomes `disabled` **while focused**     | Focus is lost to the document body, because the browser blurs a `<button>` that gains the `disabled` attribute, and an anchor that gains `tabIndex={-1}` is no longer a tab stop. **A caller that disables a focused button must move focus deliberately** (to the next control, or to a status region). The component cannot do it: it does not know what should be focused instead. This is the one focus-management obligation Button pushes onto its caller, and it is stated here rather than left to be discovered. |
| becomes enabled again                    | Focus is not restored. It re-enters the tab order in DOM position.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

### Every ARIA attribute, and its value per state

Button's ARIA surface is deliberately tiny: a real `<button>` or a real `<a href>` already carries
its role, its name and its disabled semantics natively, so the only attributes present are the two
the native element cannot express. The table is complete — nothing else is emitted, on any variant,
in any state.

| Attribute                                          | rest                                                                                                             | hover  | focus  | pressed | `active` | `busy`   | `disabled`                                                                                  | Set by                                               |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------ | ------ | ------- | -------- | -------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `aria-label`                                       | the required string, **icon-only only**                                                                          | same   | same   | same    | same     | same     | same                                                                                        | the caller; **required by the type** when `iconOnly` |
| `aria-disabled`                                    | absent                                                                                                           | absent | absent | absent  | absent   | absent   | `"true"` — **anchors only**; a native `<button>` gets the real `disabled` attribute instead | the component, from `disabled` + a non-`button` `as` |
| `aria-hidden`                                      | `"true"` on the glyph                                                                                            | same   | same   | same    | same     | same     | same                                                                                        | `Icon`, for every glyph without its own `label`      |
| `tabIndex`                                         | absent                                                                                                           | absent | absent | absent  | absent   | absent   | `-1` — **anchors only**                                                                     | the component                                        |
| `role`                                             | **never set.** The element supplies it                                                                           | —      | —      | —       | —        | —        | —                                                                                           | —                                                    |
| `aria-pressed`                                     | **never set — and open question 9 argues it should be, for `active`**                                            | —      | —      | —       | —        | —        | —                                                                                           | —                                                    |
| `aria-current`                                     | **never set — same question**                                                                                    | —      | —      | —       | —        | —        | —                                                                                           | —                                                    |
| `aria-expanded`, `aria-controls`, `aria-haspopup`  | **never set.** A Button opens nothing; a control that opens a panel is `SiteNav`'s business and owns those there | —      | —      | —       | —        | —        | —                                                                                           | —                                                    |
| `aria-describedby`, `aria-labelledby`, `aria-owns` | **never set by the component.** A caller may pass one through `…rest`; see "Where ids come from"                 | —      | —      | —       | —        | —        | —                                                                                           | —                                                    |
| `aria-busy`                                        | absent                                                                                                           | absent | absent | absent  | absent   | `"true"` | absent                                                                                      | the component, from `busy`                           |

`aria-disabled`, `tabIndex` and `aria-busy` are the only attributes whose value changes with state.
The first two change together for a disabled anchor; the third changes only with request progress.
That remains a small ARIA surface, but each varying attribute is one the caller and specimen must
exercise because it can go stale.

### Where ids come from

**Button generates no id, and holds no idref.** That is the complete answer, and it is
deliberate — but it has to be written down, because a dangling idref is the one defect class that
survives `lint`, `typecheck`, `tokens:check` and `next build` (the attribute takes any string, the
id is usually computed, and nothing is visibly wrong unless you are driving a screen reader).
`npm run aria:check` exists for exactly that, reading the prerendered HTML.

Three consequences, stated as rules:

1. **No generated ids.** No `useId`, no counter, no derived key. Nothing inside Button needs to
   point at anything, so nothing needs a name.
2. **An `id` passed by a caller is forwarded verbatim** through `…rest` — Button accepts everything
   `<button>` accepts — and the component neither reads it nor depends on it. It is the caller's
   id, in the caller's namespace.
3. **An idref passed by a caller is the caller's contract to keep.** `aria-describedby` on a submit
   button pointing at a form-level error region, for instance, will pass straight through, and
   Button will not check it. The rule the caller must follow is the one `SiteNav` already
   demonstrates: **emit the attribute only while its target is rendered** —
   `aria-describedby={hasError ? errorId : undefined}` — because a relationship announced with
   nothing at the other end of it is worse than no relationship. Button cannot enforce this; a spec
   for a component that _does_ own an idref must state where the id is generated and what happens
   when the target is absent.

### The focus ring

**`:focus-visible` only.** `.button:focus { outline: none }` kills the UA outline, and the ring is
drawn on `.button.live:focus-visible`. So a mouse click never draws a ring and a tab always does.
The fill is not restated in the focus rule — `:focus-visible` is listed alongside `:hover` in every
colour rule above it, so a keyboard user is shown exactly what a pointer user is shown.

**Two rings in one `box-shadow`:**

1. an inner ring at `--btn-ring-offset` (2px) in `--btn-ring-gap-color`;
2. the ring itself at `offset + width` (4px) in `--btn-ring-color`.

The gap colour is **the surface's ground**, restated in the button's own token layer — see §6. That
surface-coloured gap is what lets a blue ring read against a blue fill, and because both halves are
surface tokens, a button in the ink footer takes an ink gap and a lighter blue ring with no change
in the stylesheet. Ring contrast against its gap runs 6.17:1 on paper, 5.51:1 on tint, 7.32:1 on
ink and 6.23:1 on blue, against a non-text floor of 3:1. A bare link's ring — and only its ring —
takes `--radius-4`, because a hard rectangle around a label reads as a box the link does not have.
The ring does **not** transition (§13): a ring that fades in reads as lag. A disabled control has
no ring at all, because every focus rule is gated on `.live`.

**The icon-only accessible name is enforced by the type**, not by review. `IconAlone` declares
`'aria-label': string` as required, and omitting it fails `tsc`. It has to be, because `Icon`
marks every unlabelled glyph `aria-hidden` — so an icon-only button with no `aria-label` is an
unlabelled control, invisible to a screen reader and unfindable in a test.

**Contrast floors, restated.** Every label clears AA 4.5:1 on every surface in every live state;
the tightest margin in the component is ghost-primary pressed on tint at 4.61:1. The focus ring
clears the 3:1 non-text floor on all four surfaces. Two values on ink are floors rather than
preferences and are commented as such in the token layer. The **only** exemption is the disabled
label (2.37:1 to 3.22:1 depending on surface), which is intended: unavailable should look
unavailable.

**Reduced motion.** Under `prefers-reduced-motion: reduce` both the colour transition and the link
rule's wipe drop to `--duration-instant`; the underline still appears, because it is the
affordance. The focus ring never animated in the first place. Full detail in §13.

**What a screen reader says.**

- Labelled: _"See the work, button"_ — the accessible name is the sentence-case DOM text, not the
  uppercase rendering, and the two label spans are inert `<span>`s that add nothing.
- With an icon: _"Read case study, button"_ — the same string. The glyph is `aria-hidden`, so it
  announces nothing and does not duplicate the label.
- Icon-only: the `aria-label` — _"Close, button"_.
- Disabled native button: _"Send enquiry, button, dimmed"_ (VoiceOver) / _"Send enquiry, button,
  unavailable"_ (NVDA).
- Anchor: _"Read case study, link"_. Disabled anchor: _"Unavailable, link, dimmed"_, from
  `aria-disabled`.
- Held `active`: _"All work, button"_ — **the same string as rest.** The held state is announced
  nowhere, which is open question 9.

---

## 12 · Content edge cases

All thirteen required rows. Where a row does not apply to a control with no collection and no image,
it says which property of the component makes it inapplicable rather than "n/a".

| #   | Case                                                                                                         | Required handling                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Verdict                                                                                                                                                                                                                                                                              |
| --- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Longest realistic string** — "Start a project" is the longest in the specimen; assume up to ~24 characters | `white-space: nowrap` on the box. The label never wraps; the box grows to fit and will overflow a track narrower than it. No truncation, no ellipsis.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Intended.** A button is two to four words, terse and literal. A label that needs to wrap is a sentence, and a sentence is not a button. Fix the copy, not the component.                                                                                                           |
| 2   | **One long unbroken token** — a URL, a product code, a hash                                                  | Identical to row 1, and worse: `nowrap` means there is no break opportunity even in principle, so the box grows to the token's full width and overflows.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **Do not put one in a button.** A URL belongs in a link inside `Prose`, which wraps. If a build needs one, that is a new spec, not a `className`.                                                                                                                                    |
| 3   | **Zero items**                                                                                               | Inapplicable **by construction**: Button renders no collection. Its content slots are one label and at most one glyph, and the zero-label case is a _compile_ error (`WithLabel` requires `children`) unless `iconOnly` is set.                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Enforced by the type, not by runtime handling.                                                                                                                                                                                                                                       |
| 4   | **One item**                                                                                                 | Inapplicable for the same reason — but the _composition_ case is real and answered: a single Button with no sibling is the ordinary case and needs no `Cluster` at all. A `Cluster` around one child is harmless and sets no gap it can use.                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Correct as-is.                                                                                                                                                                                                                                                                       |
| 5   | **Many items (2× expected)**                                                                                 | Inapplicable inside the component. Outside it: a `Cluster` of eight `sm` ghosts (2× the specimen's four-item filter set) wraps to a second line and takes `rowGap` for the seam — which is exactly why `Cluster` has no default on either axis, so a wrapped second line cannot collapse silently. Buttons contribute nothing to it.                                                                                                                                                                                                                                                                                                                                                         | Correct — and it is the `Cluster` spec's row, not this one's.                                                                                                                                                                                                                        |
| 6   | **Missing image or missing optional slot**                                                                   | Both glyph slots are optional and independently omittable. Omitting `icon` and `iconLeft` yields the label-only variant, which is the default and the commonest. The `gap` is a flex `gap`, so it collapses to nothing with a single child — an omitted glyph leaves **no phantom space**. Button never renders an image, so there is no broken-image case.                                                                                                                                                                                                                                                                                                                                  | Correct. Verifiable by diffing the rendered box width with and without a glyph.                                                                                                                                                                                                      |
| 7   | **Empty required-ish text** — `children={''}`, `children={null}`, `children={undefined}`                     | All three **compile** (`ReactNode` admits them) and all three render the two label spans with no ink, producing a box of `2 × --btn-padding-x + 2 × --btn-label-margin` = 24px wide and full height: a visible, focusable, clickable, _nameless_ control. The type catches an omitted `children`; it cannot catch an empty one.                                                                                                                                                                                                                                                                                                                                                              | **A real gap, and it belongs to the caller.** The handling required: content that can be empty must not be passed to a Button — branch on it and render nothing. Restated as a Don't in §14 and as open question 10.                                                                 |
| 8   | **The narrow track at 767**                                                                                  | Nothing in the component changes at 767 or at 1023 (§9) — no size step, no distance change, no reflow. A Button in a track narrower than its own label **overflows the track**; it does not shrink, wrap or truncate.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **A composition decision, not a component one:** choose a shorter label, a smaller `size`, or a wider track. The specimen should render one in a narrow track so the overflow is visible rather than theoretical.                                                                    |
| 9   | **A parent that does not size it** — a wrapping `Cluster` rather than a `Layout` track                       | **No minimum, and none is needed** — which is the answer, not an omission. The box is sized by its own content: `white-space: nowrap` on the label plus an explicit `height`, and no `min-inline-size`, no `flex-shrink` and no percentage width anywhere in the module. A Button in a wrapping row therefore cannot collapse below its label; it can only overflow, which is row 8's case.                                                                                                                                                                                                                                                                                                  | **Correct as-is.** Contrast a value-holding control, which has no intrinsic content and does need a floor — `--foot-field-min-inline` (16rem) exists for exactly that reason. A control with a label needs no such token, and adding one would assert a constraint that never binds. |
| 10  | **Logical properties rather than left/right**                                                                | **Mostly correct, with one real defect.** Everything in the box axis is already logical: `padding-inline`, `margin-inline`, `margin-inline-end`, and `gap`. Two pseudo-elements are not. `.hit::after` uses physical `left: 0; right: 0` — symmetric, so it has **no** RTL consequence and is a consistency wart only. `.link .labelInk::after` is the genuine defect: it pairs `left: 0` with an **asymmetric** `right: var(--btn-text-tracking)` and `transform-origin: left center`, so in an RTL context the tracking inset lands on the reading-start edge instead of the reading-end edge, and the underline wipes in **backwards** — from the end of the phrase toward its beginning. | **Defect.** The inset must become `inset-inline-start` / `inset-inline-end`; `transform-origin` has no logical keyword in CSS, so the wipe direction needs a `[dir="rtl"]` override, which is a mechanism this repo has no precedent for. Open question 11, marked BLOCKING.         |
| 11  | **This surface nested inside a different one**                                                               | Correct with no change at the call site, because every surface block in `button.css` restates every one of the 34 surface-dependent tokens rather than carrying deltas. The specimen gives a tint panel inside an ink section its own band.                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **The case the token layer's repetition exists for.** §6 carries the three measured failure ratios from before it was fixed.                                                                                                                                                         |
| 12  | **Two of this component adjacent**                                                                           | The `Cluster` owns the gap on both axes; neither button contributes a margin, in any direction, in any emphasis. Adjacent buttons never touch by accident, and the seam is a gap-scale step chosen by the composition (`tight` for a segmented set, `text` for a normal row, `block` for a pair set apart). **One solid between them.**                                                                                                                                                                                                                                                                                                                                                      | Correct. Verifiable from a diff: a `margin` on a Button is a defect.                                                                                                                                                                                                                 |
| 13  | **Interactive content inside a slot**                                                                        | **Forbidden, and it is a real hazard here.** The label slot is typed `ReactNode`, so a nested `<button>`, `<a>` or `<input>` compiles — and produces invalid HTML inside a native `<button>`, a second tab stop inside one control, and an accessible name assembled from two competing sources. The glyph slots are the same. Nothing in the component prevents it.                                                                                                                                                                                                                                                                                                                         | **Handling required: labels are text.** A slot takes a string or inline text markup, never a control. Two controls means two Buttons in a `Cluster`. Restated as a Don't in §14; the absence of an enforcement mechanism is noted in open question 10.                               |

---

## 13 · Motion

**Colour only.** The box transitions two properties — `background` and `color` — over
`--btn-transition-duration` (`--duration-fast`, 140ms) with `--btn-transition-easing`
(`--easing-standard`, `cubic-bezier(0.2,0,0,1)`).

**What deliberately does not move:**

- `transform` — no shrink on press, no lift on hover.
- `opacity` — nothing fades, including disabled, which is explicit tokens (§5).
- `box-shadow` — so the **focus ring appears instantly**. There is also no elevation to raise:
  `--btn-shadow` is `--shadow-none`.
- `height`, `width`, `padding` — the box never resizes, in any state or at any breakpoint.
- `border-radius` — including the link's focus radius, which snaps.
- The icon — no rotation, no translation, no colour of its own (it is `currentColor`, so it moves
  with the label as part of the `color` transition).

**The one exception: the link's underline.** It is drawn as a rule on `.link .labelInk::after`
rather than as `text-decoration`, because a decorated underline can only appear all at once and
this one **wipes in from the left**: `transform: scaleX(0)` → `scaleX(1)` with
`transform-origin: left center`, on the same 140ms and the same easing as the colours. It is the
single animated property in the system that is not a colour. The rule is inset on the right by
`--btn-text-tracking` so it stops under the last **glyph** rather than under the empty letter-space
after it — the same correction `.labelInk`'s negative end-margin makes, applied to the rule. It
appears on hover, focus, press and held `active`, all four gated on `.live`.

**Reduced motion.** Under `prefers-reduced-motion: reduce`, both the box's transition and the
rule's drop to `--duration-instant` (0ms). The underline still **appears** — it is the affordance,
and removing it would remove information — it simply stops travelling. That is the whole of the
component's reduced-motion answer, because the wipe is the only motion there is to answer for.

---

## 14 · Do's and Don'ts

Each of these is decidable from a diff or from a rendered page.

**Do**

1. Put every group of buttons in a `Cluster` and set both of its gaps from the gap scale.
2. Use one solid per view. A second `<Button>` with no `emphasis` prop in the same view is a
   defect.
3. Reach for `size="lg"` before `extendHitArea` when a control needs to clear the touch floor.
4. Render an icon as a **direct** child — `icon={<Icon name="arrow-right" />}` — never wrapped.
5. Use `as={Link}` with a path from `@/lib/routes` for anything that navigates internally.
6. Give an icon-only button an `aria-label` that says what it does, not what it looks like:
   "Close", not "X".
7. Put `emphasis="link"` where a reader is reading — inside a paragraph, under a case title — and
   `solid` / `ghost` where a reader is acting.
8. Add a new colour by adding it to **all four** surface blocks in `button.css`.

**Don't**

1. Don't write `style={{ … }}` or a `className` that sets colour, background, padding, height,
   width or radius on a Button. Any of the six in a diff is a defect.
2. Don't put a margin on a Button, in any direction, from any source.
3. Don't put `data-surface` on a Button.
4. Don't pass both `icon` and `iconLeft`. (It will not compile; it is listed here so the rule is
   findable.)
5. Don't add a media query to `Button.module.css` for anything but motion preference.
6. Don't add an `outline` or a `border` to any emphasis.
7. Don't use `active` on a call to action — it is the _held_ state of a stateful control.
8. Don't express disabled as an `opacity`.
9. Don't add a `-focus` or an `-active` token; focus reads `-hover`, active reads `-pressed`.
10. Don't move the `.sm` / `.lg` block below `.link`, or the hover rules below the pressed rules.
    Both are equal-specificity pairs decided by source order: sizes must come **before** `.link`
    so a bare link keeps `height: auto` at every size, and hover must come **before** pressed so
    pointer-down wins while the pointer is also hovering and a held `active` does not fall back to
    the hover fill. Moving either block breaks a state, silently.
11. Don't pass a label that can be empty. `children={maybeEmpty}` in a diff is a defect: branch on
    the value and render nothing rather than a 24px nameless control (§12 row 7).
12. Don't put a `<button>`, `<a>`, `<input>` or any other focusable element inside a label or a
    glyph slot. A control inside a control is invalid HTML, a second tab stop and a contested
    accessible name; two controls are two Buttons in a `Cluster` (§12 row 13).

---

## 15 · Specimen plan

Route `/design/button`, registered by hand in the `SPECIMENS` list on `/design` under
**Primitives** as _"3 emphases × 2 tones, 3 sizes, 3 variants, 4 surfaces"_. It is a `page.tsx`
only — it defines no component beyond two local presentation helpers (`COMBOS`, `SURFACES` and a
`SurfaceMatrix` that renders one ground's full set).

**The shipped page, block by block:**

| #    | Block                                             | What it renders                                                                                                                                                                                                                                                                                                  |
| ---- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0    | Intro                                             | `h1`, then the two claims the component is built on: that the same markup is correct on all four grounds, and that the box is 8 / 4 / 4 and none of the three scales.                                                                                                                                            |
| 1    | **The six combinations**                          | A 3-track `Layout`, one cell per emphasis × tone, each with its name and its one-line job ("The primary ask", "Default secondary", "Navigation"). The two link cells carry a trailing `arrow-right`.                                                                                                             |
| 2    | **States — four of seven are printable**          | A `[2,1,1,1,1]` `Layout`: a header row, then the six combinations down the first column and **rest / active / busy / disabled** across.                                                                                                                                                                          |
| 3    | **Variants — label, label and icon, icon alone**  | Three columns. Label-only; label with a trailing `arrow-right` and a leading `download`; and four icon-only buttons — `close-circle`, `copy`, `arrow-right`, `download` — each with its `aria-label`, in both ghost and solid.                                                                                   |
| 4    | **Size — 32 / 40 / 48**                           | One `Cluster` per size, each holding a ruler caption and five buttons: solid primary, ghost with a trailing icon, icon-only, solid neutral, link. Reading down the three rows is how you check that only the height, the label and the icon step.                                                                |
| 5    | **Groups, and the one-solid rule**                | An `lg` solid-plus-ghost pair (the hero shape), then a four-item `sm` segmented set with `active` on the first — the thing `active` exists for — and a note that pressing an item previews the state it is about to hold.                                                                                        |
| 6    | **Anchors — a button that navigates**             | Four `as="a"` buttons including a disabled one, so `aria-disabled` and the `tabIndex` removal can be inspected.                                                                                                                                                                                                  |
| 7    | **The link in a text column**                     | Two link anchors in a text block, with the paper `link-neutral` hover argument (ink → blue 500 → blue 600) written out beside them.                                                                                                                                                                              |
| 8    | **extendHitArea — 44px without changing the box** | An extended and a non-extended `sm` ghost side by side, plus a ruler caption: _both boxes 32 high — the first answers the pointer 6px above and below it._                                                                                                                                                       |
| 9–12 | **The four surfaces**                             | Four sibling `Section`s — paper, tint, ink, blue — each rendering the same `SurfaceMatrix` (the six combinations, plus held-`active`, busy and disabled controls) from identical markup, under a note naming what moved on that ground and why.                                                                  |
| 13   | **The nesting case**                              | Its own band: an ink `Section` containing `<Section as="div" surface="tint" density="tight">` with the full matrix inside it, and the three failure ratios the repetition fixed (1.13:1, 2.09:1, 2.09:1) written out. The buttons in the panel should be indistinguishable from the ones on the tint band above. |

**Its honesty about what a static page cannot show.** Hover, pressed and tab focus have no props —
they are the stylesheet's business, driven by `:hover`, `:active` and `:focus-visible` — so the
page cannot print them in a column, and it says so rather than quietly showing seven state labels
with invented controls. The block is titled _"States — four of seven are printable"_, its note
names the three that are missing and instructs the reader to point at each button, hold it down,
and tab to it, adding that the exercise has to be repeated **on each of the four surfaces below**. The same
instruction is repeated where it matters: the blue band asks the reader to tab to a button to see
a white ring with a blue gap, the tint band asks them to hover a ghost here and on paper to see the
one-step-down fill, and the nesting band asks them to tab through the panel to check the ring.

---

### What the shipped specimen does not yet render

The contract asks a specimen plan to cover every edge case in §12, two of the component adjacent,
and the component in a narrow track. Two of those are covered — adjacency is the whole of block 5,
and the nested surface has its own band — and four are not. Recorded here rather than glossed over,
because the plan is meant to be the checklist a reviewer works down:

| Missing block                                                           | What it should render                                                                                                                                                                              |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **The narrow track** (§12 row 8)                                        | A `Layout` with one deliberately narrow track holding a `lg` button with a three-word label, so the overflow is visible rather than theoretical.                                                   |
| **The longest realistic string, and one unbroken token** (§12 rows 1–2) | Two buttons side by side: a ~24-character label, and a URL-shaped token, both in a constrained track. The point is to make "a sentence is not a button" a thing you can see.                       |
| **The empty label** (§12 row 7)                                         | `children={''}` beside a normal button, captioned as the failure it is — a 24px focusable nameless control. It is the one edge case whose rendering is genuinely surprising.                       |
| **`extendHitArea` on an icon-only button** (open question 2)            | The specimen shows `extendHitArea` only on a labelled `sm` ghost, which is the case where it works. The icon-only case is the one where the inline axis stays under 44, and it is not on the page. |

None of the four is a large addition, and none needs a new component — but all four are places where
the specimen currently agrees with the spec by omission rather than by demonstration.

---

## 16 · New token requests

**None — every value is an existing token.**

Verified two ways. `npm run tokens:check` passes: every custom property resolves, every component
layer is registered, and there is no literal colour or raw distance outside the token layer.
And `Button.module.css` contains no value of its own beyond structural keywords, structural zeros
(`border: 0`, `padding-inline: 0`, `left: 0`, `right: 0`, `margin-inline: 0`, `transform:
scaleX(0)`), the two positioning halves of the centring idiom (`top: 50%` / `translateY(-50%)`),
and two `calc()` expressions that negate an existing token rather than restate a number
(`calc(-1 * var(--btn-text-tracking))` for the label pull-back,
`calc(-1 * var(--btn-link-rule-offset))` for the rule's offset). The four literals in
`button.css` — the three heights and the hit minimum — are component sizes, which the system
says are correctly literal.

---

## 17 · Open questions

Eleven loose ends found while reconstructing this spec — nine defects or unmade decisions in the
shipped code, and two gaps in the component's contract that only surfaced while answering §11 and
§12. Each carries options, a recommendation, and a **BLOCKING / non-blocking** mark.

### What the mark means for a spec at `Status: implemented`

`/build-from-spec` GATE 0 reads two things: that `Status:` is `accepted`, and that no question here
is BLOCKING and unanswered. This spec is `implemented`, so **it is not admissible to build from
today regardless** — a rebuild would first move it back to `accepted`, and at that moment these
marks become the gate. So the mark is not "how bad is the shipped bug". It answers one narrower
question:

> **If someone re-implemented Button from nothing but this document, would this item make them
> encode something known to be wrong — or is the recommendation below enough for them to proceed?**

That reframing matters, because most of the list is _not_ blocking under it. A dead `cursor`
declaration, a comment that rounds 2.68 to 2.6, a JSDoc sentence that contradicts itself — an
implementer following this spec produces correct output whether or not those are settled first,
because the spec already states the correct behaviour and the defect lives only in the shipped
file. Those are **non-blocking**: tracked repairs to the code, not gaps in the specification.

Three items are different. Each is a place where **this document cannot tell an implementer what to
emit**, so a build would proceed on a guess — which is exactly the failure the gate exists to
prevent. They are marked **BLOCKING**, and each names who has to decide.

---

1. **`cursor: not-allowed` on a disabled button is dead code.**
   `Button.module.css:344-349` sets both `cursor: not-allowed` and `pointer-events: none` in the
   same rule. With `pointer-events: none` the element is not hit-tested, so the cursor never
   resolves from it and the user sees whatever the _parent_ specifies.
   _Options:_ (a) drop `cursor: not-allowed`; (b) drop `pointer-events: none` and rely on the
   `disabled` attribute plus `.live` gating, which keeps the cursor working but re-exposes the
   anchor case, since an `aria-disabled` anchor is still clickable.
   _Recommendation:_ (a). The cursor is cosmetic; the inertness is not.
   **non-blocking** — §5 and §11 already specify the behaviour correctly; the dead declaration
   changes nothing an implementer would write.

2. **`extendHitArea` extends only the block axis, so an icon-only `sm` or `md` never reaches the
   floor.** `Button.module.css:376-384` pins the pseudo-element `left: 0; right: 0` and gives it
   `height: --btn-hit-min`. For a labelled button that is enough — the box is already wider than 44.
   For an **icon-only** button it is not: `sm` is 32×32 and `md` is 40×40, so the target becomes
   32×44 or 40×44 and stays under 44 on the inline axis, while both the CSS comment and the
   specimen assert "the target is legal".
   _Options:_ (a) give the pseudo-element `min-width: var(--btn-hit-min)` centred on the box, so the
   target reaches 44×44 and the box still does not move; (b) narrow the documented contract to
   "block axis only, for controls already ≥44 wide" and forbid `extendHitArea` with `iconOnly` at
   the type level; (c) leave it and accept a 40×44 target on touch.
   _Recommendation:_ (a) — it is a two-line change and it makes the existing claim true.
   **BLOCKING.** The prop's whole purpose is a legal touch target, and this document currently
   promises one it does not deliver for the exact case (a dense icon toolbar) the prop exists for.
   (a) and (b) are different APIs, so an implementer cannot pick without the owner: (b) adds a
   compile error that (a) does not.

3. **`as="a"` without an `href` compiles.** `href` is optional on `ButtonBase` (`Button.tsx:63`) and
   `as` is typed `ElementType` (`Button.tsx:62`), so nothing ties the two together —
   `<Button as="a">Go</Button>` type-checks (verified against the shipped types) and renders an
   anchor with no destination, which is not a link to any assistive technology. The wider version:
   because `as` is `ElementType`, the component prop-checks nothing for the element it renders, so
   `as={Link}` is not required to carry `Link`'s own required props either.
   _Options:_ (a) a discriminated union on `as` that requires `href` for anchor-like elements;
   (b) a runtime dev-only warning; (c) leave it to review.
   _Recommendation:_ (a), if and when the generic machinery is judged worth it — it is a
   substantial amount of type code for one class of mistake.
   **non-blocking** — §11's semantics table already states that an anchor is for navigating and
   needs a destination, so an implementer building from this spec writes correct call sites; the
   type merely fails to stop an incorrect one.

4. **`className` is documented as accepting a margin, one paragraph before margins are forbidden.**
   `Button.tsx:91` says _"Position and margin are the caller's business; nothing else is"_, while
   `Button.tsx:94` says _"A button never sets its own outer spacing either"_ and CLAUDE.md says
   "No margins, ever."
   _Options:_ (a) amend the sentence to "Position is the caller's business"; (b) amend the other
   two and allow margins.
   _Recommendation:_ (a). Two of the three sources are right.
   **non-blocking** — §10 and §14 state the rule unambiguously; this is a comment repair.

5. **`--btn-gap-bare` reaches `--space-8` without naming the gap-scale step it is not.**
   `button.css:55` carries a functional comment ("link emphasis has no box and no label margin")
   rather than the _optical, not `--gap-tight`_ form its three neighbours carry — and `--gap-tight`
   is also 8px, so this is precisely the token where the coincidence is live. Relatedly the
   geometry header says "These four reach past the gap scale" (`button.css:41`) while five tokens
   in the file do; the count is true only if scoped to the block immediately below it, since
   `--btn-link-rule-offset` is argued separately at `button.css:65-69`.
   _Options:_ (a) give `--btn-gap-bare` the standard justification sentence and correct the count
   to five; (b) correct the count only.
   _Recommendation:_ (a).
   **non-blocking** — §7 already prints all five reaches with justifications, so the spec is the
   correction.

6. **A rounding drift in one quoted ratio.** `Button.module.css:343` states the disabled label on
   paper as "neutral-500 on neutral-100 at 2.6:1"; recomputed it is **2.68:1**, which rounds to 2.7.
   _Options:_ (a) correct the comment to 2.68:1; (b) leave it.
   _Recommendation:_ (a). The value is exempt from the contrast floor either way, so nothing
   renders differently — but every other ratio in the token layer agrees to two decimals.
   **non-blocking.**

7. **No answer for a button that must fill its track.** The box is `inline-flex` and content-sized
   at every size, and nothing in the component or the token layer addresses the stretched case — a
   form's submit button spanning a single-track `Layout`, a card's CTA spanning the card.
   _Options:_ (a) a `fullWidth` prop; (b) no prop — the stretched case is the container's decision,
   made where the button sits; (c) defer until a call site needs it.
   _Recommendation:_ (b), documented as a refusal. Width is on the list of things that are
   deliberately not props (§3), and a button that fills a track is a statement about the track.
   **non-blocking** — nothing in the shipped specimen or in either pattern needs it, and (b) is a
   decision this spec can make on its own.

8. **A disabled anchor is inert by convention, not by the platform.** `Button.tsx:167` emits
   `aria-disabled` plus `tabIndex={-1}`, and `Button.module.css:348` adds `pointer-events: none`.
   The `href` remains, so the element is still a link: a screen-reader user navigating by virtual
   cursor or link list can still reach and activate it, and `Enter` still navigates if focus arrives
   by any route other than `Tab`.
   _Options:_ (a) drop the `href` when disabled, so the element stops being a link at all;
   (b) render a real `<button>` when `disabled`, changing the element under the caller;
   (c) keep the current treatment and document the residual gap.
   _Recommendation:_ (a) — it is the one option that makes the element's semantics match its
   intent without surprising the caller about which element it got.
   **non-blocking** — §11's keyboard table now states the residual behaviour explicitly, so an
   implementer building from this spec reproduces a known, documented state rather than guessing.

9. **The held `active` state is carried by colour alone, and is announced nowhere.** `active` adds
   one class (`Button.tsx:181`) and nothing else — no `aria-pressed`, no `aria-current`. For ghost
   emphasis the only rendered difference is a fill; for link emphasis the underline stays in, which
   is at least a non-colour cue. So the specimen's segmented filter set renders a selected item
   that a screen reader announces identically to an unselected one (§11: _"All work, button"_ in
   both), and a user who cannot distinguish the two fills gets nothing at all. This is the
   `no colour-only state` rule in the brief's own self-audit, failing on the reference component.
   _Options:_ (a) emit `aria-pressed={active}` whenever `active` is set on a native button — correct
   for a toggle, which is what a filter chip is; (b) add a prop to choose between `aria-pressed`
   and `aria-current`, since the JSDoc names both a selected filter (pressed) and the current nav
   item (current); (c) leave the ARIA to the caller through `…rest` and document that `active` is
   presentation only; (d) add a non-colour visual cue as well — a `check` glyph, or a weight change.
   _Recommendation:_ (b) plus (d). The two meanings are genuinely different and the JSDoc already
   names both, so one attribute cannot serve them; and the visual cue is what the audit rule
   actually asks for.
   **BLOCKING.** This document cannot tell an implementer what `active` emits, and every option
   changes the public API: (a) and (c) are different accessibility contracts, (b) adds a prop, and
   (d) adds an anatomy part and possibly a glyph. A build would have to guess, and the guess is
   visible to exactly the users least able to work around it. It also needs the owner rather than
   the implementer, because it is a question about what `active` _means_ in this system.

10. **Nothing prevents an empty or interactive label, and the type cannot catch either.**
    §12 rows 7 and 13. `children: ReactNode` admits `''`, `null` and `undefined` — each renders a
    24px-wide, focusable, clickable, nameless control — and equally admits a nested `<button>` or
    `<a>`, which is invalid HTML inside a native `<button>`, a second tab stop inside one control,
    and an accessible name assembled from two competing sources.
    _Options:_ (a) narrow `children` toward `string | number` plus an explicit inline-markup escape
    hatch; (b) a dev-only runtime warning on an empty or element-only label; (c) leave both to
    §14's Don'ts and to review.
    _Recommendation:_ (c) for the interactive case, whose realistic frequency is near zero, and (b)
    for the empty case, which is the one a CMS field will actually produce.
    **non-blocking** — §12 and §14 both state the required handling, so an implementer knows the
    rule; only the enforcement mechanism is open.

11. **The link rule is drawn with physical properties, so it is wrong in RTL.** §12 row 10.
    `Button.module.css:283-289` pairs `left: 0` with an asymmetric
    `right: var(--btn-text-tracking)` and `transform-origin: left center`. In an RTL context the
    tracking inset lands on the reading-_start_ edge instead of the reading-_end_ edge, and the
    underline wipes in backwards — from the end of the phrase toward its beginning. (`.hit::after`
    at `Button.module.css:379-380` is also physical but symmetric, so it is a consistency wart with
    no RTL consequence.)
    _Options:_ (a) convert the insets to `inset-inline-start` / `inset-inline-end` and add a
    `[dir="rtl"]` override for `transform-origin`, which CSS gives no logical keyword for;
    (b) convert the insets and drop the wipe in RTL, leaving the rule to appear instantly;
    (c) convert the insets only, and accept a backwards wipe;
    (d) declare the site LTR-only and convert nothing.
    _Recommendation:_ (a) if RTL is ever in scope, (d) if it is not — and say which, in writing.
    **BLOCKING.** Not because RTL is imminent, but because this document cannot answer it:
    `transform-origin` has no logical form, so any RTL fix needs a `[dir="rtl"]` mechanism that has
    **no precedent anywhere in this repo** — the first component to introduce one is setting a
    system-wide convention, and that is an owner's decision, not an implementer's. An implementer
    told only "use logical properties" would either miss the `transform-origin` half or invent the
    convention silently.

---

## Appendix — self-audit

The checklist from `docs/prompts/component-spec-brief.md`, with every count filled in. Not a
nineteenth section: sections 0–17 are the spec, and this is the proof it was checked. Two lines
below read **RECONSTRUCTION** rather than a pass or a fail, because they ask about a design process
this document did not have — it was recovered from shipped code, not written ahead of it.

### Structure

- **All 18 sections present, in order, with the exact headings** — PASS. Sections 0–17, verified
  against the heading list in `docs/component-spec-template.md`.
- **Front matter states a tier, a Status, and a token prefix that collides with nothing in the taken
  list** — PASS. Tier 1; `Status: implemented` (a legal lifecycle value — see the note below);
  prefix `--btn-`, which is the prefix `npm run design:brief` already reports as taken _by this
  component_, so the collision check is trivially satisfied: nothing else may use it.
- **Every part named in Anatomy appears in the colour table, the geometry list, or both — or is
  explicitly marked as carrying no value of its own** — PASS. 10 parts. Box and Fill are in the
  colour table; Link rule, Focus ring and Hit-area extension are in the geometry list (§7) and the
  colour table (the ring); Label, Label ink, both icon slots and the icon-only glyph are marked as
  carrying no colour of their own, taking `currentColor` and the box's `fg`.

**A note on `Status`.** The lifecycle is `draft | accepted | implemented`, and
`/build-from-spec` GATE 0 admits only `accepted`. `implemented` is correct here and it is also a
stop: this spec is a record of what exists, not a licence to rebuild. A rebuild would move it to
`accepted` first, at which point the two BLOCKING questions in §17 must be answered inline.

### Names — the section that matters most

- **Count of distinct token names used: 110 backticked names**, resolving to **107 real tokens**,
  plus three deliberate non-tokens: `--btn-` (the prefix itself, in the front matter and §0),
  `--btn-solid-primary-fg-hover` and `--btn-solid-primary-fg-busy` (named in §5 _in order to assert
  they do not exist_). Every one of the 107 was checked individually against the declared set, not by pattern: 59 `--btn-*` and 48
  others (`--color-*` 19, `--text-*` 4, `--space-*` 3, `--radius-*` 3, `--prose-*` 3, `--nav-*` 3,
  `--icon-*` 3, `--gap-*` 2, `--focus-ring-*` 2, `--duration-*` 2, and one each of `--shadow-*`,
  `--sec-*`, `--easing-*`, `--border-width-*`). PASS, and confirmed mechanically by
  `npm run design:check`.
- **Coverage in the other direction:** the 59 `--btn-*` names in this spec are **exactly** the 59
  that `tokens/components/button.css` declares — 34 surface-dependent tokens × 4 surfaces, plus 25
  geometry tokens in `:root`. Not one declared token is undocumented, and not one documented token
  is undeclared.
- **Every glyph named is in the glyph set** — PASS. Five named, all from the set of 17:
  `arrow-right`, `download`, `close-circle`, `copy`, `check`. No new glyph request. (`check` is
  named once, in open question 9, as a candidate non-colour cue.)
- **Every prop and prop value given for Section, Layout or Cluster appears in the prop unions** —
  PASS, and the list is short because Button specifies no arrangement of its own. `Section`:
  `surface="tint"`, `as="div"`, `density="tight"` — all in §15, describing the nested-surface band
  the specimen already renders. `Layout`: `justifyItems`, named once in §15. `Cluster`:
  `colGap` / `rowGap` with the values `tight`, `text` and `block` — all three inside Cluster's
  four-member cap, none reaching for `stack` or above, which would not compile.
- **Zero hex codes / `rgb()` / `hsl()` / colour words outside the contrast measurements** — PASS.
  Zero hex codes anywhere, including in the measurements: every ratio is written as
  _token on token = n:1_.
- **Zero Tailwind class names. Zero CSS declarations, selectors or `@media` blocks** — PASS. No
  fenced code block appears in the document. Property names and selectors are quoted inline where
  naming them is the point (`white-space: nowrap`, `.hit::after`, `prefers-reduced-motion`), which
  is description, not a declaration to copy.
- **Every `--text-*` role paired with a tracking companion is on the list that has one** — PASS.
  Three roles used — `--text-ui-sm`, `--text-ui`, `--text-ui-lg` — and all three are in the
  12-role group that has a companion. The one companion named, `--text-ui-tracking`, exists.
- **Every layout distance is a gap-scale role name, referred to by name** — PASS, and the count is
  the notable part: **Button consumes zero `--gap-*` tokens.** The only gap-scale names in the
  document are `--gap-tight` and `--gap-inline`, both cited in §7 to say which step a reach into
  the space ramp is deliberately _not_, plus Cluster's step names in §10 — which are the
  container's distances, not the button's.
- **Every space-ramp reach carries its justification sentence in the required form. Count: 5.**
  `--btn-padding-x`, `--btn-label-margin`, `--btn-gap`, `--btn-gap-bare`, `--btn-link-rule-offset`.
  Four carry the "optical, not `--gap-tight` / `--gap-inline`" form verbatim from the shipped CSS;
  the fifth, `--btn-gap-bare`, does **not** carry it in the shipped file, which is why §7 supplies
  the argument and open question 5 asks for the comment to be corrected. FAIL in the code, PASS in
  the spec, and the discrepancy is filed rather than hidden.
- **Every literal pixel value is a component size or a container cap, t-shirt named, and says what
  it was measured against. Count: 4.** `--btn-height-sm` 32px (a dense grid cell),
  `--btn-height-md` 40px (an input on the same row), `--btn-height-lg` 48px (the 44px touch floor),
  `--btn-hit-min` 44px (the touch minimum itself). Three are t-shirt named; `--btn-hit-min` is a
  floor rather than a step, so it takes the role name honestly. No other literal appears in the
  token file, and none appears in the stylesheet.

### Colour and contrast

- **One row per token, four columns: paper, tint, ink, blue** — PASS.
- **No cell empty, "same as paper", or a delta. Rows: 34 × 4 cells = 136.** PASS.
- **Every text colour has a measured ratio against the exact ground or fill it sits on — including
  the hover, pressed and busy fills, not just the surface ground** — PASS. 132 of the 136 cells carry a
  ratio; the four exceptions are the `--btn-ring-gap-color` row, marked "n/a — decoration".
  `fg` cells are measured against the field they sit on in that state; `bg` cells against the label
  that sits on them in that state.
- **Every text ratio ≥ 4.5:1, except disabled, marked as the deliberate exception** — PASS. The
  tightest live text margin in the component is **4.61:1** (ghost-primary pressed on tint). The
  eight disabled cells run 2.37:1 to 3.22:1 and are each marked **exempt** in the cell itself, with
  the reason given in §5 and §11.
- **The focus ring is measured against its own gap colour on every surface** — PASS. 6.17:1 paper,
  5.51:1 tint, 7.32:1 ink, 6.23:1 blue, against a 3:1 non-text floor.
- **Decoration marked "n/a — decoration" rather than left blank** — PASS, four cells.
- **One paragraph per surface explaining what moved and why** — PASS, four paragraphs.
- **The nested-surface case addressed** — PASS, with the three measured pre-fix failure ratios
  (1.13:1, 2.09:1, 2.09:1) reproduced independently.
- **Provenance:** every ratio is marked **[q]** (quoted from a comment in the shipped CSS) or
  **[c]** (computed for this spec from the `primitives.css` hexes by the WCAG relative-luminance
  formula). All 11 quoted figures were recomputed and agreed to two decimals, with one rounding
  drift filed as open question 6.

### States

- **Every state claimed comes from the fixed model, with the repo's suffix** — PASS. Seven states,
  suffixes `-hover`, `-pressed` and `-busy` only. No `-expanded`: nothing about a Button opens.
- **The rendered hover state differs from the rendered pressed state on all four surfaces** — PASS
  for solid and link, where the moving token differs at every step. For **ghost**, the fill moves
  at both steps and the label additionally moves on paper and tint, so hover and pressed differ on
  all four; §5 carries the note naming which part carries the difference where a token repeats.
- **Every state token introduced MOVES on at least one surface; any that does not has been deleted
  and its absence stated as an assertion** — PASS. §5 lists seven deliberately absent token
  families with the assertion each absence makes.
- **Every state token declared on all four surfaces, including where it equals rest** — PASS; this
  is the 136-cell table, and `tokens:check` enforces it independently.
- **Disabled uses its own tokens and no opacity** — PASS, with the measured argument for why
  (an opacity over a blue fill lands near 2:1).
- **No colour-only state** — **FAIL, and filed.** Held `active` on ghost emphasis is carried by a
  fill alone and announced nowhere. Open question 9, marked BLOCKING. This is the one audit line
  where the reference component does not meet the standard the brief sets, and saying so is more
  useful than a tick.

### Layout, type, semantics

- **Every arrangement is a Section, Layout or Cluster; `colGap` stated wherever `columns` is set** —
  PASS. The one flex in the component is the `inline-flex` centring a label and a glyph inside a
  single control box, which the brief explicitly allows as not-arrangement, and §10 says so.
- **No margin on any child, anywhere in the spec** — PASS on the outer edge: Button contributes no
  outer spacing in any emphasis. The two margins that exist (`--btn-label-margin` on `.label`, the
  negative pull-back on `.labelInk`) are internal optical corrections between two spans the
  component owns; §10 draws that distinction explicitly, and open question 4 files the JSDoc
  sentence that muddies it.
- **No media query changes a gap step or a type role** — PASS. `Button.module.css` contains exactly
  one at-rule and it is `prefers-reduced-motion`.
- **Every part carrying running text names a measure** — **N/A, stated.** No part of a Button
  carries running text. The label is `white-space: nowrap` and two to four words, so a `--measure-*`
  cap would be meaningless; §12 rows 1–2 answer the long-string case by refusing it rather than by
  wrapping it.
- **Every interactive target reaches 44px on touch, and the spec says by which legal means** —
  **PARTIAL, and filed.** Both legal means are specified and §9 says which to prefer
  (`size="lg"` first, `extendHitArea` only where density is the point). But `extendHitArea` extends
  the block axis only, so an icon-only `sm` or `md` reaches 32×44 or 40×44 rather than 44×44.
  Open question 2, marked BLOCKING.
- **Every ARIA idref points at an element that is ALWAYS rendered, or the spec says what the
  attribute does when that element is absent** — PASS by construction: **Button holds no idref and
  generates no id.** §11 states that as a rule and gives the caller the contract to keep for an
  idref passed through `…rest` — emit the attribute only while its target is rendered, which is the
  precedent `SiteNav` already sets and the defect class `npm run aria:check` exists to catch.
- **No selector walks upward; no `:has()`; every state a parent needs is a prop or a class** —
  PASS. The only ancestor dependency is `data-surface`, which is read by the _token layer_ as a
  cascade of custom properties, not by a selector reaching up out of the component.

### Completeness

- **All twelve content edge-case rows answered — none skipped, none "n/a" without a reason** —
  PASS. §12 answers all thirteen. Rows 3, 4 and 5 (zero / one / many items) are marked inapplicable
  _with the reason stated_: Button renders no collection, and the zero-label case is a compile error
  rather than a runtime state. Row 9 (logical properties) turned up a real RTL defect, filed as open
  question 11.
- **Do's and Don'ts testable: the grep, the rendered page or the diff that decides each** — PASS.
  8 Do's and 12 Don'ts, each decidable from a diff (a `margin`, a `data-surface`, a `className`
  setting one of the six forbidden properties, a media query, a rule-order move, an empty-able
  label, a focusable element in a slot) or from a rendered page (one solid per view, a wrapped
  glyph rendering at the wrong size).
- **The specimen plan renders every variant × every size × all four surfaces, forces every printable
  state, includes the nested-surface band, and covers every edge case above** — **PARTIAL, and
  itemised.** 14 blocks: the full 6-combination matrix, all three sizes, all three content variants,
  four surface bands with identical markup, the nested band, adjacency, and both touch-target means.
  Four required blocks are missing — the narrow track, the longest string, the unbroken token and
  the empty label — and §15 lists each with what it should render, rather than claiming coverage
  the page does not have.
- **Section 16 lists justified requests in the block form, or says "None"** — PASS. "None — every
  value is an existing token", verified two ways (`tokens:check`, and an inventory of every
  non-token value in the stylesheet: structural keywords, structural zeros, the two halves of the
  centring idiom, and two `calc()`s that negate an existing token).
- **Every open question has options, a recommendation, and a BLOCKING / non-blocking mark** — PASS.
  11 questions: **3 BLOCKING** — open question 2 (`extendHitArea` does not deliver the 44px target
  it promises), open question 9 (the colour-only, unannounced `active` state) and open question 11
  (the link rule's physical properties, whose RTL fix needs a `[dir="rtl"]` convention this repo has
  no precedent for) — and **8 non-blocking**. §17 opens by defining what the mark means for a spec
  at `implemented`, which is not the same thing as "how bad is the shipped bug".
- **Squint test** — **RECONSTRUCTION.** The line asks whether the _composition being specified_
  reads as more than one idea. Button is a single control, not a composition, so the question has no
  subject here; it is the specimen page that must pass it, and that page varies its arrangement
  block by block (three-up cells, a four-column state table, per-size Clusters, four full-bleed
  surface bands, a nested panel) rather than repeating one rectangle. The right place for a real
  squint test is the first pattern spec written to this template.

### Provenance

- **Designer sign-off** — **RECONSTRUCTION.** There was no brief and no designer; §0 says so. Every
  decision recorded here was recovered from `Button.tsx`, `Button.module.css`,
  `tokens/components/button.css` and the specimen route, and stated as the spec's decision because
  that is the document's job — to be the thing that would have produced this code. Where the code
  left a decision unmade, §17 says so instead of inventing one.
- **Mechanical checks run:** `npm run design:check` (every token named in `docs/` resolves),
  `npm run tokens:check` (427 tokens across 11 files, no unresolved `var()`, no literal colour or
  raw distance outside the token layer), `npm run verify` (lint, typecheck, tokens, specimens,
  design). The five prop combinations §3 claims are compile errors were confirmed by compiling them
  against the shipped types.
