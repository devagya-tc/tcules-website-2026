# Chip

## 0 · Front matter

| | |
|---|---|
| **Component** | `Chip` |
| **Tier** | 1 primitive, a control (`src/components/Chip/`) |
| **Status** | implemented (approved by the owner, 19 Oct 2026, as the hi-fi chip-form mock; built the same day) |
| **Token prefix** | `--chip-*` (collides with nothing: `--tag-*` is Tag's, `--inp-*` Input's, `--btn-*` Button's) |
| **File** | `src/styles/tokens/components/chip.css`, registered in `tokens/index.css` after `input.css` |
| **Designer / date** | Owner-approved mock, 19 Oct 2026 (`choice.src.html`, round 3); spec and build by Claude, 19 Oct 2026 |
| **Implements** | The chip enquiry form: EnquiryForm's `choice` dress and the message dress's `needs` (EnquiryForm.md, amendment of 19 Oct 2026) |
| **Implemented at** | `src/components/Chip/Chip.tsx` · `Chip.module.css` · `index.ts` · `src/styles/tokens/components/chip.css` · glyph `chrome-check` in `src/lib/icon-glyphs.ts` · specimen `src/app/design/chip/page.tsx` |

## 1 · Identity

One choice in a set: a real `<input type="checkbox">` or `<input type="radio">`, visually hidden
inside its own `<label>`, drawn as a pill. Tier 1 because it is a control a pattern arranges, like
`Input` and `Button`: it knows nothing of the question it answers or the row it sits in.

What it is NOT:

1. **Tag `filter`.** A filter chip is a LINK that applies a query, set in mono uppercase by role. A
   chip is a form input whose label is an answer in the author's case ("Product design", "A
   prototype"). A label that must keep its case is not a mono label (CLAUDE.md, type rule 8), so the
   chip is sans. Making it a Tag variant would put a form control and a link behind one prop, with
   different elements, voices and states.
2. **A group.** The question ("What do you need?") and its semantics are the composing pattern's
   `<fieldset>` and `<legend>` (EnquiryForm's `renderChoiceGroup`); the row is a `Cluster` at
   `tight`. A chip owns no distance outside its own box.
3. **A Button.** It changes a value; it never submits or navigates.

Nearest existing component: Tag's `filter`, rejected above. How many on a page: one or two groups,
three to six chips each, in an enquiry form.

## 2 · Anatomy

| Part | Element | Required | What it is |
|---|---|---|---|
| `chip` | `<label>` | yes | the hit area and the pill's box; positioned so the input can cover it |
| `input` | `<input type="checkbox \| radio">` | yes | the real control, over the whole pill, transparent; owns checked, focus, posting and the accessible name |
| `face` | `<span>` | yes | the pill: the edge, the fill when checked, the label ink; the part that lifts on hover |
| `tick` | `<span aria-hidden>` | yes (slot) | the caller's glyph (`tick`), zero width at rest, scaled in when checked |
| `label` | `<span>` | yes | the answer's words (`children`) |

## 3 · Props / API

| Prop | Type | Default | Decides |
|---|---|---|---|
| `type` | `'checkbox' \| 'radio'` | — (required) | pick-any or pick-one |
| `name` | `string` | — (required) | the posted field; a set shares one |
| `value` | `string` | — (required) | the posted value |
| `children` | `string` | — (required) | the label, sentence case as authored |
| `tick` | `ReactNode` | — (required) | the glyph shown when checked: `<Icon name="chrome-check" />` |
| …input attributes | `InputHTMLAttributes` minus `type`, `className`, `children`, `size`, `style` | — | `defaultChecked`, `checked` + `onChange`, `disabled`, `id`, `required`, `aria-*` pass to the input |

Deliberately NOT props: `surface` (an ancestor's `data-surface` decides), colour, size, padding,
gap, radius, `selected` (the input's own `checked` is the state), and any group prop (the fieldset is
the pattern's). `tick` is required so a checked chip always differs in shape as well as colour.

## 4 · Variants × sizes

One size (`md`, 34 floor) and no visual variants: checkbox and radio render identically, and the
difference is behaviour (arrow keys move a radio set). Rejected: a `sm` size (no use), a "filled at
rest" variant (it would read as already picked), and Tag's held-chip close glyph (a chip is unpicked
by clicking it again, so it needs no second affordance).

## 5 · States

| State | Mechanism | What moves |
|---|---|---|
| rest | — | edge `--chip-rule`, label `--chip-fg`, no ground, tick width 0 |
| hover | `.chip:hover` | the face lifts `--chip-lift` (2), transform only; no colour moves |
| focus | `.input:focus-visible` | a ring outside the pill, `--chip-ring-*` |
| checked | `.input:checked` | fill `--chip-bg-checked`, edge `--chip-rule-checked`, label `--chip-fg-checked`; tick opens to 14 and scales 0 → 1; tick gap opens to `tight` |
| disabled | `.input:disabled` | quiet edge and label; no lift; not-allowed cursor |
| disabled + checked | both | a quiet fill (`--chip-bg-checked-disabled`) and label, so the pick stays visible |

Excluded: a hover colour or ground (owner, 19 Oct 2026: hover is a move, never a ground that
appears only on hover), and a pressed state (no value moves on press on any surface, so by tokens
rule 3 it has no token).

## 6 · Per-surface colour

| Token | paper | tint | ink | blue |
|---|---|---|---|---|
| `--chip-fg` | neutral-800 · 11.81:1 | neutral-800 · 10.54:1 | neutral-100 · 14.47:1 | white · 6.23:1 |
| `--chip-rule` | neutral-300 · 1.54:1 (see below) | neutral-400 · 1.90:1 | neutral-600 · 3.48:1 | brandeis-300 · 2.64:1 |
| `--chip-bg-checked` | brandeis-500 · 6.17:1 vs ground | brandeis-500 · 5.51:1 | brandeis-500 · 2.77:1 (see below) | white · 6.23:1 |
| `--chip-fg-checked` | white · 6.23:1 on fill | white · 6.23:1 | white · 6.23:1 | brandeis-600 · 7.59:1 on fill |
| `--chip-rule-checked` | brandeis-500 | brandeis-500 | brandeis-500 | white |
| `--chip-fg-disabled` | neutral-500 (exempt) | neutral-500 | neutral-600 | brandeis-300 |
| `--chip-rule-disabled` | neutral-200 | neutral-300 | neutral-800 | brandeis-400 |
| `--chip-bg-checked-disabled` | neutral-200 | neutral-300 | neutral-800 | brandeis-400 |
| `--chip-fg-checked-disabled` | neutral-600 | neutral-600 | neutral-500 | brandeis-200 |
| `--chip-ring-color` | brandeis-500 · 6.17:1 | brandeis-500 · 5.51:1 | brandeis-300 · 7.32:1 | white · 6.23:1 |

**Paper.** The rest edge is the approved mock's neutral-300. The label identifies the control at
11.81:1 and the checked state, which carries the information, is a 6.17:1 blue fill; the edge is
below the 3:1 outline floor and that is recorded as Q1. **Tint.** The edge firms to 400 so the
outline survives the deeper ground. **Ink.** The label lifts, the edge firms by going lighter; the
checked fill stays the accent blue (the mock's ink treatment), 2.77:1 against neutral-950, so on ink
the reversed white label and the tick carry the checked state alongside the fill. **Blue.** Every
value is a blue or white; checked reverses to a white fill under brandeis-600, as Tag's held chip
does on blue.

**Nested surface.** Every block declares all ten tokens, so a chip inside the island close's paper
panel (`data-surface="paper"` inside a blue island) takes paper's values, not blue's.

## 7 · Geometry & spacing

(a) Distances: `--chip-tick-gap` = `--gap-tight` (icon to label), open only when checked. The row
between chips is the caller's `Cluster` at `tight` both ways.

(b) Component sizes: `--chip-height-md` 34px, a floor (`min-block-size`), measured by eye in the
approved mock against the 48 fields beside it; `--chip-tick-size` = `--icon-size-14`.

(c) Optical corrections reaching the ramp, each commented in `chip.css`: `--chip-padding-x`
(`--space-14`, the pill's inset against its round ends), `--chip-padding-y` (`--space-4`, only
reached when a label wraps), `--chip-lift` (`-2`, the hover move).

Radius `--radius-full`; edge `--border-width-hairline`; no shadow; z: the input sits one layer over
the face (`z-index: 1`) so the hover transform's layer never takes the pointer from it.

## 8 · Typography

| Part | Role | Tracking |
|---|---|---|
| label | `--chip-text` = `--text-body-sm` (14, regular, sans) | none — this role has no tracking companion |

Case: as authored. `text-wrap: balance` for a label that wraps.

## 9 · Responsive

Nothing changes at 1023 or 767. A label longer than its track wraps inside the pill, which grows
down from 34. Target: the pill is ≥ 34 × ~70, over the 24 × 24 floor (SC 2.5.8); with the caller's
`tight` gaps no two targets intersect.

## 10 · Composition

```tsx
<fieldset>                                   {/* the pattern's */}
  <legend className={hidden}>What do you need? (Pick any)</legend>
  <Layout rowGap="text">
    <Cluster colGap="tight">question · aside (aria-hidden)</Cluster>
    <Cluster colGap="tight" rowGap="tight">
      <Chip type="checkbox" name="needs" value="new-product" tick={<Icon name="chrome-check" />}>
        New product
      </Chip>
      …
    </Cluster>
  </Layout>
</fieldset>
```

The chip's `inline-flex` is a control laying out its own inside (tick and label), not an
arrangement of siblings. No margins (the input's `margin: 0` resets the UA box).

## 11 · Accessibility

Native semantics: the input is a real checkbox or radio named by its label's text. Keyboard: Tab
reaches each checkbox and one radio per set; Space toggles a checkbox; arrow keys move within a
radio set. Focus stays on the chip after a change. `aria-hidden` on the tick (the checked state is
announced from the input). The ring is drawn on the face by `:focus-visible`. Reduced motion: the lift
and tick scale take `--duration-instant`. A screen reader says: "Product design, checkbox, checked,
What do you need? (Pick any), group".

## 12 · Content edge cases

Longest realistic label (six words): wraps to two balanced lines, pill grows. One long unbroken
token: the pill caps at its track (`max-inline-size: 100%`) and the word breaks only if the browser
must. Zero chips: the pattern renders none. Many chips: the Cluster wraps. A parent that does not
size it: the chip is its content width. Logical properties throughout. Nested surface: § 6. Two
groups adjacent: separate names, separate fieldsets. Interactive content in the label: refused by
type (`children: string`).

## 13 · Motion

`transform` only, `--chip-transition-duration` (`--duration-medium`) on `--easing-standard`, on
the face (the lift) and the tick (the scale). The check's colours swap at once: a fading fill would
read as a hover ground. Reduced motion: instant.

## 14 · Do's and Don'ts

- Do pass `tick` on every chip. Don't style a checked chip by colour alone.
- Do put chips in a `Cluster` at `tight`, inside the pattern's fieldset. Don't give a chip a margin.
- Don't use a chip to navigate or filter a listing: that is Tag `filter`.
- Don't set a chip label in mono or uppercase.

## 15 · Specimen plan — `/design/chip`

Checkbox rest and checked; radio set; focus (Tab to it); disabled rest and checked; long labels
wrapping (390); all four surfaces as sibling bands with identical markup (checkbox row, radio row,
disabled row). Hover and focus have no props: point at a chip, Tab to one. The composed groups are on
`/design/enquiry-form` (the chip form and the first message with chips).

## 16 · New token requests

`--chip-*` (thirteen geometry tokens in `:root`, ten colour tokens per surface), in
`tokens/components/chip.css`. Primitives only otherwise. One glyph: `chrome-check` (Icon.md,
amendment of 19 Oct 2026).

## 17 · Open questions

1. **The paper rest edge (non-blocking).** neutral-300 is the approved mock's, 1.54:1. Options:
   (a) keep it — the label and the checked fill carry the control; (b) neutral-500, 3.16:1, the
   outline floor. Recommendation: (a) as approved; one token if the owner wants (b).
2. **Decided (owner may override, non-blocking):** both chip groups are optional; no budget group;
   the chip form is not on the home page yet (home keeps the card close).

## Appendix — self-audit

Sections 0–17 present. Token names checked against `chip.css` (23 names). Every colour cell a
`--color-*` primitive; contrast ratios computed from the primitive hexes. No hex, no raw distance in
the module (`tokens:check` passes). No hand-rolled arrangement outside the control's own inside. No
margins. Mono not used.
