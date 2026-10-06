# CtaRow

## 0 · Front matter

| | |
|---|---|
| **Component** | `CtaRow` |
| **Tier** | 2 pattern (`src/patterns/CtaRow/`) |
| **Status** | implemented — `fdn-section-head`, 6 Oct 2026. No spec → owner step for kit foundations: `docs/kit/visual-direction.md` is the decided direction, and it wins where this spec and it differ. |
| **Token prefix** | `--ctarow-*` |
| **File** | `tokens/components/cta-row.css` |
| **Designer / date** | Claude Code · 6 Oct 2026 |
| **Implements** | visual-direction § 1.2 (body → CtaRow, `stack`), § 1.4 ("CtaRow — 48 seam + one 48 row"), § 3.1 item 5 (a hairline above a section-level CtaRow), § 4.2 (Signal and Accent budgets), § 11 item 5 |
| **Implemented at** | `src/patterns/CtaRow/` · `src/styles/tokens/components/cta-row.css` · specimen `src/app/design/cta-row/page.tsx` (also used across `src/app/design/content-section/page.tsx`) |

> **Amended 6 Oct 2026 (`fdn-section-head`, second fix round).**
> - **A link-led row defaults to `tone="primary"`.** It was `neutral`, so every link foot rendered an
>   ink label and an ink arrow, and with ink icons in the body a C-icon-4 band read fully black and
>   white. That ran against the owner's binding ruling (more blue in the foreground: links, arrows,
>   small marks). A primary link spends Signal, which § 4.2 allows (≤ 1 kind per band, counted once
>   however many links). A solid-led row still defaults to `neutral`: a solid primary spends Accent,
>   the scarcest tier, and the caller spends that on purpose. A band that already spends a different
>   kind of Signal (G's quote rule, E's diagram line) or has spent its two passes `tone="neutral"`.
>   Recorded in visual-direction § 4.2 and `docs/kit/brand-amendments.md` (ch02).
> - **Note ↔ actions wrap at `block` (24), not `text` (16).** At 326 the mono label sat tight under
>   the body-sm note; the owner rules spacing is never cramped, and 24 is the row's own action ↔ action
>   seam.
> - **A footer in a band with no blocks takes `rule={false}`.** With no body above it the hairline sits
>   48 under the lead and reads as an underline on it — the same argument as a head's actions. The row
>   cannot see its context, so the caller states it (ContentSection's `footer` doc).

## 1 · Identity

A band's row of actions: a hairline, then an optional one-line note and one or two actions. It is the
section-level ask four kit families share (feature, read-down, testimonials, logos, media split): "See
the work" under a card set, "Ask us directly" under an FAQ, "How we work" at the foot of a media split's
copy column. With its rule off it is also a section head's action row (ContentSection `actions`).

A pattern because it consumes a content shape (`{ label, href }`) and composes `Button`, `Icon`,
`Cluster` and `Layout` — a primitive may not import a sibling.

What it is **not**:

1. **Not a close.** The page's ask with points, a form or proof is `CtaSection`. A CtaRow never owns a
   band, a heading or a ground.
2. **Not navigation.** Two actions at most; three links in a row is a nav strip (`SiteNav`, or a
   ListCard set of links).
3. **Not a card CTA.** A per-card link belongs to `BlockCard` (`ctaLabel`) and moves with the card.

Frequency: zero or one per band; most kit bands carry none.

## 2 · Anatomy

| Part | Element | Required | Notes |
|---|---|---|---|
| `root` | `div` (a `Layout`, `rowGap="block"`) | yes | Class `.centredBox` when `align="center"`. |
| `rule` | empty `div` | no | `rule` (default `true`). Class `.rule`: one `border-block-start`. Decoration, so not an `<hr>`. |
| `row` | `div` (a `Cluster`) | yes | `justify` start, between (with a note) or center. |
| `note` | `p` | no | Class `.note`. Rendered only when `note` has non-whitespace content. |
| `actions` | `div` (a `Cluster`) of `Button as="a"` | yes | One or two. |

## 3 · Props / API

| Prop | Type | Default | Decides |
|---|---|---|---|
| `actions` | `readonly [CtaRowAction] \| readonly [CtaRowAction, CtaRowAction]` | — | One or two `{ label, href }`. A third does not compile. Paths from `@/lib/routes`. |
| `note` | `string` | — | One sentence before the actions, body-sm. Whitespace-only = absent. |
| `emphasis` | `'link' \| 'solid'` | `'link'` | The FIRST action: a link with the arrow cue, or a solid button (the band's Accent, no glyph). |
| `tone` | `'neutral' \| 'primary'` | `'primary'` for `link`, `'neutral'` for `solid` | The FIRST action's Button tone. Primary link = Signal (spent by default); primary solid = Accent (spent only on request). |
| `rule` | `boolean` | `true` | The hairline above. `false` in a head's actions, under a ruled ladder (Accordion, ListCard rows, DataTable) whose last rule already closes the body, and as the footer of a band with no blocks (nothing to close). |
| `align` | `'start' \| 'center'` | `'start'` | `center`: note and actions centred, the whole box capped at `--ctarow-centred-measure` (→ `--measure-body`). |

The second action is always `emphasis="link" tone="neutral"` — position decides emphasis, as in
`CtaSection` and `PageHero`. Deliberately not props: per-action emphasis, icons, size (always `md` +
`extendHitArea`), any gap, `className`/`style`.

## 4 · Variants × sizes

One size. `emphasis` × `tone` × `rule` × `align`, plus note present/absent:

| | link | solid |
|---|---|---|
| neutral | spends nothing (pass it explicitly) | the solid default; spends nothing |
| primary | the link default; Signal (§ 4.2) | Accent (§ 4.2; pass it explicitly) |

Glyph: a link-led row puts `arrow-right` on every action (the kit's one link cue, as BlockCard's
per-card CTA). A solid-led row has no glyph on either action — PageHero's shape, and the owner's 1 Oct
"no arrow here" on CtaSection's asks.

## 5 · States

None of its own. Every interactive state is `Button`'s, from `button.css`. There are no `--ctarow-*`
state tokens, and that is the assertion.

## 6 · Per-surface colour

| Token | paper | tint | ink | blue |
|---|---|---|---|---|
| `--ctarow-rule-ink` | `--color-neutral-300` · decoration | `--color-neutral-400` · decoration | `--color-neutral-700` · decoration | `--color-brandeis-300` · decoration |
| `--ctarow-note-ink` | `--color-neutral-700` · 8.15:1 | `--color-neutral-700` · 7.27:1 | `--color-neutral-300` · 11.07:1 | `--color-brandeis-100` · 4.91:1 |

The rule is decoration (the actions are their own affordance), the same argument `--lcrd-rule-ink`
makes, and it is neutral on every surface (§ 4.3: hairline rules are never blue at rest). The actions'
colours are `Button`'s per-surface tokens.

## 7 · Geometry & spacing

| Seam | Step | Why |
|---|---|---|
| rule → row | `--gap-block` (24) | head to body inside a block: the rule heads the row |
| note ↔ actions (across) | `--gap-block` (24) | Cluster `colGap` |
| note ↔ actions (wrapped) | `--gap-block` (24) | Cluster `rowGap`. Was `text` (16) until 6 Oct: at 326 the mono label sat tight under the note. 24 matches action ↔ action, so no wrapped seam in the row is tighter than another |
| action ↔ action | `--gap-block` (24) both axes | PageHero's argument: a bare link label 8 from a filled box reads as part of it; wrapped targets need clear air |

The seam ABOVE the row is the band's (`stack`, 48 — ContentSection's `footer`). Height: rule 1 + 24 +
a link label line ≈ 22 = 47, so § 1.4's "48 seam + one 48 row" holds; a solid makes the row 65.

Measures: `--ctarow-note-measure` → `--measure-lead`; `--ctarow-centred-measure` → `--measure-body`.
Rule width `--ctarow-rule-width` → `--border-width-hairline`. No radius, shadow or z-layer.

## 8 · Typography

| Part | Role | Case |
|---|---|---|
| note | `--text-body-sm` via `--ctarow-note-text`, `--text-running-wrap` | as authored |
| actions | `Button`'s mono label role | `--text-mono-case` (Button) |

**Label ceiling: four words.** Button labels never wrap (`white-space: nowrap`), so a label is a content
budget: four words of the longest corpus words ("Read the modernisation assessment", ≈ 280 with its
arrow) fit the 326 phone column. Longer is a copy fault the row will not hide (it overflows at 390).

## 9 · Responsive

No breakpoint of its own. The Clusters wrap: at 326 a note and two links stack note → actions at 24,
and two actions wrap between each other at 24, never inside a label.

## 10 · Composition

```tsx
<Layout rowGap="block" className={centred ? styles.centredBox : undefined}>
  {rule && <div className={styles.rule} />}
  <Cluster colGap="block" rowGap="block" align="center"
           justify={centred ? 'center' : note ? 'between' : 'start'}>
    {note && <p className={styles.note}>{note}</p>}
    <Cluster colGap="block" rowGap="block" align="center">{buttons}</Cluster>
  </Cluster>
</Layout>
```

No hand-rolled grid or flex, no margin, no padding. The placing band owns the seam above it.

## 11 · Accessibility

- Every action is a native anchor (`Button as="a"`); Tab order is DOM order, note first (it is text).
- `extendHitArea` on every action: the solid's box is 40 and a link is its label line, so the 44 floor
  comes from the extension.
- The arrow glyph is `Button`'s `aria-hidden` icon; the accessible name is the label.
- The rule is an empty `div`, not an `<hr>`: it is not a thematic break to announce between a band's
  body and its ask.
- No ids, no ARIA of its own. Contrast floors § 6.

## 12 · Content edge cases

| Case | Handling |
|---|---|
| No note / whitespace-only note | No `p`; the row starts the actions (no "between" around nothing). |
| A long note | Wraps at 56ch; pushes the actions below it at 24 when both cannot share the row. |
| A label at the four-word ceiling | Fits at 326 with its arrow; two such actions wrap at 24. |
| A label over the ceiling | Overflows at 390 (Button never wraps). A copy fault; rewrite it. |
| Under a ruled ladder | `rule={false}`, or two hairlines sit 48 apart and read as a double rule. |
| Footer of a band with no blocks | `rule={false}`: no body to close, so the rule would underline the lead (ContentSection § 15, the footer-only and no-blocks media bands). |
| A band already spending another kind of Signal | `tone="neutral"` on a link row (G's quote rule, E's diagram line: § 4.2, ≤ 1 kind per band). |
| In a centred band | `align="center"`; ContentSection's centred body centres the capped box. |
| In a 381 head track | Solid and link wrap to two lines at 24. |
| Nested surface | Every ink restated per surface (§ 6). |

## 13 · Motion

None of its own. Button's colour transition is Button's.

## 14 · Do's and Don'ts

- **Do** place it in ContentSection's `footer` (rule on) or `actions` (rule off). **Don't** import it
  into another pattern: `grep -rn "CtaRow" src/patterns --include=*.tsx | grep import` shows only
  `src/patterns/CtaRow/` and the barrel.
- **Don't** hand-roll layout: `perl -0pe 's{/\*.*?\*/}{}gs' src/patterns/CtaRow/CtaRow.module.css | grep -nE 'display|grid|flex|margin|padding'` returns nothing.
- **Do** let a link foot be blue: with no `tone`, a link-led row's first action is `tone="primary"`
  (Signal) and a solid-led row's is `neutral` (inspect `/design/cta-row` § 1, rows 1 and 6). **Don't**
  leave it primary in a band that already spends another kind of Signal or has spent its two — pass
  `tone="neutral"` there.
- **Don't** put a rule on the footer of a band with no blocks (`/design/content-section` § 14 and § 15).
- **Don't** double a rule under an Accordion or ListCard rows (`/design/content-section` § 11, D-faq).
- **Don't** pass a label over four words.

## 15 · Specimen plan

`/design/cta-row`: (1) the variant ladder at the full column — link primary (the default), link neutral,
two actions, with a note, solid primary + link, solid neutral (the solid default), `rule={false}`,
`align="center"`; (2) stress
— the four-word label ceiling with a long note, a whitespace-only note, the 381 head track, the 326
column with a note and centred; (3) four surfaces, identical markup, captioned as surface proof; (4) in
live ContentSection bands: beside footer, centred footer under an accordion, stacked head actions.
`/design/content-section` uses it in every arrangement (§ 1, § 11 to § 15).

## 16 · New token requests

`cta-row.css` (new layer, registered in `tokens/index.css` after `content-section.css`):
`--ctarow-rule-width`, `--ctarow-note-text`, `--ctarow-note-measure`, `--ctarow-centred-measure` in
`:root`; `--ctarow-rule-ink`, `--ctarow-note-ink` on all four surfaces.

## 17 · Open questions

1. **Default `rule`.** *Chosen:* `true`, because the section-level foot is the primary use (§ 3.1).
   Head actions and rows under a ruled ladder pass `false`. *Non-blocking.*
2. **Arrow on link actions.** *Chosen:* on every action of a link-led row, none in a solid-led row.
   *Alternative:* no glyph anywhere, as CtaSection. A foot that points somewhere reads better with the
   kit's one link cue. *Non-blocking; shown to the owner in the PR.*

3. **Default `tone`.** *Chosen (6 Oct, second fix round):* `primary` for a link-led row, `neutral` for
   a solid-led one. *Was:* `neutral` for both ("don't spend blue by default"), reversed because it ran
   against the owner's binding ruling for more blue on links and arrows. *Alternative:* `primary` for
   both; rejected because a solid primary is Accent (≤ 1 per band) and should be spent on purpose.
   *Non-blocking.*

No BLOCKING question is open.

## Appendix — self-audit

```
STRUCTURE   [x] Sections 0–17 in order. Tier 2, prefix --ctarow-*.
NAMES       [x] 6 tokens, all declared in cta-row.css; the layer is registered.
COLOUR      [x] 2 tokens × 4 surfaces = 8 cells, none blank. Lowest text ratio 4.91:1 (note on blue).
STATES      [x] None of its own; no state tokens.
LAYOUT      [x] Layout and Cluster only; no margin, padding or display in the module.
```
