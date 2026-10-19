# Accordion

> **Amended, home round 3 (11 Oct 2026).** The question rests at full ink and no longer moves on hover (`--acc-question-ink-hover` deleted); the answer takes `--acc-answer-ink`, one clear step quieter, so the question reads as the question. Only the chevron answers the pointer. See docs/page-mapping.md § 19.

## 0 · Front matter

|                     |                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Component**       | `Accordion`                                                                                                             |
| **Tier**            | 2 pattern (`src/patterns/Accordion/`)                                                                                   |
| **Status**          | implemented                                                                                                             |
| **Token prefix**    | `--acc-*`                                                                                                               |
| **Designer / date** | Codex / 24 Aug 2026 · redesign resolved 25 Aug 2026 (Direction A) · amended 29 Sep 2026 (tracker 2.17: mark, open seam)   |
| **Implements**      | `docs/briefs/14-accordion.md`                                                                                           |
| **Implemented at**  | `src/patterns/Accordion/` · `src/styles/tokens/components/accordion.css` · specimen `src/app/design/accordion/page.tsx` |

## 1 · Identity

`Accordion` is one set of two to eight question-and-answer disclosures. Each question is a native
disclosure summary; opening it reveals one rich-text answer rendered by `Prose`. It is Tier 2
because it consumes a CMS-shaped array and composes the Tier 1 `Layout`, `Icon`, and `Prose`
components.

It is not page navigation: `SiteNav` owns navigation panels, route awareness, outside-click
dismissal and focus return after Escape. It is not a generic rich-text flow: `Prose` owns arbitrary
CMS markup and its internal rhythm, while Accordion owns disclosure relationships around a small
answer field. It is not a grouped card set: `BlockCard` owns bounded tiles in a parent grid;
Accordion is one continuous rule ladder with no item ground and no grid.

This cannot be a prop on `Prose`: opening and closing multiple sibling records, the native summary
control, the disclosure mark and the separator ladder are structure outside a rich-text field. It
cannot be a `SiteNav` variant because the content has no destinations, panel geometry, route state,
outside-click behavior or navigation semantics.

The component appears on 21 routes in 22 sections, once per route except
`/services/product-design/interaction-ui-design`, which carries two. Each set has 2–8 items, most
often 5–7, and normally ends the page.

## 2 · Anatomy

| Part       | Required | Element / owner        | Content and responsibility |
| ---------- | -------- | ---------------------- | -------------------------- |
| root       | yes      | `Layout as="div"`      | Owns the zero-gap block axis for one complete disclosure set and its leading rule. |
| item       | yes      | native `details`       | One question/answer relationship and its block-end rule. It is the only element that owns open state. |
| trigger    | yes      | `Cluster as="summary"` | The full-width interactive target, and the only inline arrangement in the component. Owns pointer and keyboard states and contains only the question and decorative mark. |
| question   | yes      | `h3` / `h4`            | One plain-text question, normally ending in a question mark. It is not caller-authored markup and cannot contain a control. A heading element at the h4 composite — see section 8. |
| mark       | yes      | one `span`, two `Icon` | Decorative disclosure direction. Both chevrons sit in the DOM at all times and `[open]` picks which one shows, so nothing rotates. |
| answer     | yes      | `Prose`                | One trusted, sanitised rich-text field, normally one or two paragraphs. Prose owns markup rhythm, inline links and colour; Accordion restates the size and nothing else. |
| rule       | yes      | root/item logical edge | One leading hairline for the set and one block-end hairline per item. Every rule is `--acc-rule-ink` in every state. |

There is no optional media, icon slot, nested item slot, grouping label, action slot, header or
footer. `ContentSection` owns the section heading and any eyebrow outside the array seam.

There is no `triggerContent` wrapper. The `summary` IS the Cluster, which is what removed a span
and a class from the build; the mark is a direct child of the row it sits at the end of.

## 3 · Props / API

```ts
export type AccordionQuestionElement = 'h3' | 'h4';

export type AccordionItem = {
  question: string;
  answerHtml: string;
};

export type AccordionProps = {
  items: readonly AccordionItem[];
  questionAs?: AccordionQuestionElement;
};
```

| Prop         | Exact type                   | Default | What it decides |
| ------------ | ---------------------------- | ------- | --------------- |
| `items`      | `readonly AccordionItem[]`   | none    | Ordered disclosures. Zero valid items render nothing; expected production count is 2–8. |
| `questionAs` | `'h3' \| 'h4'`               | `'h3'`  | Heading level for every question. Semantics only — the question renders at the h4 composite either way. |
| `question`   | `string`                     | none    | Native summary accessible name and visible question text. Whitespace-only values invalidate that item. |
| `answerHtml` | `string`                     | none    | Trusted, content-seam-sanitised HTML handed directly to `Prose html`. Whitespace-only values invalidate that item. |

`questionAs` is the one API surface change in the redesign, and it takes the shape `titleAs`
already has on `BlockCard` and `ListCard` rather than inventing a second idiom. `h3` is correct on
every audited route because `ContentSection` owns the section's `h2`; `h4` exists for the route
that ever nests a set under an `h3`. Hard-coding `h3` would have been one prop fewer and no way
out of that case short of a code change.

The API deliberately has no `mode`, `multiple`, `defaultOpen`, `openItems`, `onToggle`,
`allowCollapse`, `mark`, `markPosition`, `variant`, `size`, `surface`, `tone`, `finish`,
`group`, `children`, `className` or `style`. Disclosure mode and initial state are site-wide
decisions, not per-call choices. Mark, placement, separator, type, gap, radius, shadow, colour and
width belong to the component contract. Surface comes only from the nearest `data-surface`.

Passing an icon, nested items, grouped items, arbitrary children, a React node question, or a
caller-owned `Prose` element must be a compile error because the public record exposes no such
field. Passing anything other than a string for either content field must fail type checking.
The type cannot express a 2–8 tuple without making CMS data awkward; counts outside that range warn
in development but valid records still render without truncation.

## 4 · Variants × sizes

| Rendering | `md` |
| --------- | ---- |
| default   | the only supported rendering |

There is one rendering and one size. Question type, mark size, block insets, rules and answer
relationship never step independently. Single-open versus multi-open is not a variant: the owner
selects one mode once in section 17 and the component implements only that mode everywhere.

Rejected variants are boxed, filled, numbered, icon-led, nested, grouped, compact, spacious and
borderless. A seven-item stack of bounded boxes is specifically rejected; the rule ladder makes
one content block without painting seven grounds.

## 5 · States

**The component paints no ground, in any state, on any surface.** Not at rest, not on hover, not
on press, not when open. State is carried entirely by the ink of the question and its mark, which
is where the reader is already looking. `--acc-trigger-bg-hover` filled the whole 68ch trigger with
a square-cornered warm-grey slab — the largest thing that happened on the page in response to a
pointer moving, and it read as a selected table row rather than as a control. Both ground tokens
are deleted; there is nothing to search the module for.

| State              | Trigger / owner                | What visibly or semantically changes |
| ------------------ | ------------------------------ | ------------------------------------- |
| rest · closed      | native base state              | Question at `--acc-question-ink` and down chevron (`alt-arrow-down`) at the quieter `--acc-mark-ink`, over the inherited ground; the quiet rule closes the row. |
| hover              | trigger pointer hover          | Question and mark rise to `--acc-question-ink-hover` and `--acc-mark-ink-hover`. No ground appears. |
| focus · keyboard   | trigger `focus-visible`        | The raised ink plus the two-part surface ring. Native focus remains on the summary. |
| pressed            | trigger pointer down           | The raised ink is held and the question gains a hairline underline at `--acc-mark-ink`, so pressed differs from hover by more than colour. |
| expanded · open    | native item open state         | Answer becomes available, mark swaps to `alt-arrow-up`, the summary's block-end inset drops to `--gap-text`, and question and mark hold the raised ink. The rule does not change. |

Hover, pressed and expanded resolve the question to one raised ink, so the set holds two ink values
rather than five. That is why there is no `--acc-question-ink-pressed` or `-expanded`: token rule 3
says a state token exists only if the value moves on at least one surface, which is the same reason
there is no `--btn-solid-*-fg-pressed`.

**The expanded rule is gone.** `--acc-rule-ink-expanded` put the action colour on a decoration, and
put it at the *bottom* of the answer — often 300px below the question whose state it described. An
open disclosure is already self-evidently open: the answer is on screen.

The open mark swap is immediate; it does not rotate or fade. The two ink transitions run at
`--acc-transition-duration`, but answer height does not. In the recommended multi-open mode, expanding one item does not alter
any sibling. In the recommended initial state, the first valid item begins expanded and every
remaining item begins closed.

Held/current, disabled, selected, loading, busy and error are excluded. The questions are always
available disclosures, not navigation, selection, asynchronous work or validation. There is no
disabled opacity and no state sniffed from answer content.

## 6 · Per-surface colour

The trigger owns two ink ladders — one for the question, one for the mark — and no ground at all,
so every value below is measured directly against the Section ground. The answer owns no colour:
`Prose` resolves its own complete surface palette and Accordion never overrides it, because a
`strong`, a link or a `code` span inside an answer has to match Prose everywhere else on the site.
There is deliberately no `--acc-answer-ink`; the 22/16 size step and the serif-to-sans shift carry
the hierarchy instead.

The mark is decoration — an unlabelled, `aria-hidden` `Icon` whose state the native control already
announces — so it is measured against the 3:1 non-text floor rather than 4.5:1. Rules are
decoration too, and are marked as such.

| Token                         | paper                                              | tint                                               | ink                                                | blue                                             |
| ----------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------ |
| `--acc-question-ink`          | `--color-neutral-800` — 11.81:1                   | `--color-neutral-800` — 10.54:1                   | `--color-neutral-300` — 11.07:1                   | `--color-brandeis-100` — 4.91:1                 |
| `--acc-question-ink-hover`    | `--color-neutral-950` — 17.10:1                   | `--color-neutral-950` — 15.27:1                   | `--color-white` — 17.26:1                         | `--color-white` — 6.23:1                        |
| `--acc-mark-ink`              | `--color-neutral-500` — 3.16:1, decoration        | `--color-neutral-600` — 4.39:1, decoration        | `--color-neutral-500` — 5.41:1, decoration        | `--color-brandeis-200` — 3.78:1, decoration     |
| `--acc-mark-ink-hover`        | `--color-neutral-950` — 17.10:1                   | `--color-neutral-950` — 15.27:1                   | `--color-white` — 17.26:1                         | `--color-white` — 6.23:1                        |
| `--acc-rule-ink`              | `--color-neutral-200` — 1.33:1, decoration        | `--color-neutral-300` — 1.38:1, decoration        | `--color-neutral-800` — 1.45:1, decoration        | `--color-brandeis-400` — 1.62:1, decoration     |
| `--acc-ring-color`            | `--color-brandeis-500` — 6.17:1 against its gap   | `--color-brandeis-500` — 5.51:1 against its gap   | `--color-brandeis-300` — 7.32:1 against its gap   | `--color-white` — 6.23:1 against its gap        |
| `--acc-ring-gap-color`        | `--color-paper` — paired ring 6.17:1              | `--color-paper-deep` — paired ring 5.51:1         | `--color-neutral-950` — paired ring 7.32:1        | `--color-brandeis-500` — paired ring 6.23:1     |

**Paper.** The question rests one step below full ink at neutral-800 and rises to neutral-950, so
the open question is the darkest thing in the set and needs no rule to say so. The mark rests
quieter at neutral-500 — it is the affordance cue, not the content — and converges on the
question's raised ink, so hover reads as one gesture rather than two things moving separately. The
neutral-200 hairline is one step lighter than the old neutral-300, which at 5–7 rows turned the set
into a table. Blue appears in exactly one place: the focus ring. Note that the mark's 3.16:1 is the
thinnest margin in the set; it clears the non-text floor and nothing quieter would.

**Tint.** The question ink holds at the paper values against paper-deep. The mark steps one further
down the ramp to neutral-600, because neutral-500 on this ground is 2.82:1 and misses the non-text
floor. The resting rule steps to neutral-300; focus remains Brandeis 500.

**Ink.** The ladder inverts. Neutral-300 rests and white is the raised step, so the open question is
the brightest thing in the band without a pale panel appearing behind it. The quiet rule deepens to
neutral-800 and focus lifts to Brandeis 300.

**Blue.** Both steps come out of the Brandeis tints rather than a second colour family: brandeis-100
rests and white raises, which is the same top of the ladder the ink surface uses. The rule quietens
to brandeis-400 against the brandeis-500 ground, and the focus ring's gap resolves to that ground.

Every surface block redeclares all seven surface-dependent tokens. A tint Accordion nested inside
an ink section resolves the complete tint column, including both ink ladders and the focus gap; no
outer ink value may leak through an omitted declaration.

## 7 · Geometry & spacing

### (a) Distances

- Root item seam: `Layout rowGap="none"`; rule edges meet as one ladder.
- Trigger block inset: `--gap-block` above and below the h5 question, up from `--gap-text`. With no
  ground defining the row, the inset is the only thing that makes it one — and it clears the 44px
  floor with room to spare.
- Question-to-mark seam: `Cluster colGap="block"`, `justify="between"`, `nowrap`, `align="start"`,
  on the `summary` itself.
- Trigger-to-answer seam: **0** at the answer's block start. The open trigger's own block-end
  inset is the whole seam, and it has to be, because that inset is also the hit area. **Amended
  29 Sep 2026 (tracker 2.17):** for an open item that inset is `--gap-text` (16), not
  `--gap-block`. At 24 the answer sat exactly as far from its question as from the next rule, so it
  read as floating between two questions; at 16 it attaches to its own. Closed items keep
  `--gap-block` both ways. An existing gap step, so no new token.
- Answer-to-item edge inset: `--gap-block` at block end. `Prose` owns every internal paragraph
  relationship and Accordion adds no margin inside it.
- Production Accordion-to-neighbour relationship: the containing page `Layout` chooses its normal
  block or stack relationship; Accordion sets no outer margin.

### (b) Component sizes

- `md`: the only size. Root inline size is 100%, capped by `--measure-body`; it has no fixed block
  size and grows instantly with native disclosure content.
- Question/answer measure: `--measure-body` (68ch). The disclosure mark stays at the measure's
  inline end rather than at the far edge of the 1240px Section cap.
- Mark: `Icon size="lg"`, resolving to `--icon-size-18`, measured against the h5 summary line.
- Rule: `--acc-rule-width` resolves to `--border-width-hairline` at rest and expanded.
- Focus: `--acc-ring-width` and `--acc-ring-offset` resolve to the shared focus geometry.
- Radius: `--acc-radius` resolves to `--radius-0`.
- Shadow: `--acc-shadow` resolves to `--shadow-none`.
- Layer: none. This line specified `--acc-layer` resolving to `--z-base`, and the build did not
  take it: `--z-base` is 0, no item overlaps another, and the only thing that must paint over a
  neighbour is the focus ring, which `.trigger:focus-visible` handles with its own
  `position: relative`. A one-component token renaming a primitive is what CLAUDE.md's token
  rule 6 deletes, and Breadcrumbs and Figure had already settled it the same way. See
  `Accordion.module.css`.

### (c) Optical corrections

None (owner, 7 Oct 2026). The pressed underline and its offset token were removed: the press no
longer draws a rule under the question.

Trigger and answer insets remain layout relationships named by the gap scale, and the mark uses an
existing icon size.

## 8 · Typography

| Part     | Role             | Tracking companion       | Measure |
| -------- | ---------------- | ------------------------ | ------- |
| question | `--text-h4`      | `--text-h4-tracking`     | `--measure-body` |
| answer   | owned by `Prose` | owned by `Prose`         | `Prose`'s `--measure-body` |

Question copy is sentence case and retains its authored question mark: “How long does a product
design engagement take?” It is an `h3` by default (`h4` via `questionAs`) inside the native summary,
and it takes the h4 composite whichever element it is (h5 until 19 Oct 2026; see
`docs/decisions/2026-10-19-faq-question-h4-head-md.md`) — the heading is semantics, not a size step.

This overturns the original decision, which was that the question should stay a `span` because the
summary is already a named interactive control. That holds for a single disclosure. It does not
hold for this component's deployment: 5–7 questions, on 21 routes, normally as the last block on a
long page. Screen-reader and voice-control users navigate a page like that by heading, and without
one the entire FAQ is absent from the heading tree with no way to jump to it or scan it. The summary
keeps its role, its expanded state and its accessible name either way; the heading is additive.

**The answer is 16px, and Accordion says nothing to make it so.** 18px under a 22px question is a
1.22 ratio and neither element leads; 16 gives 1.38. `Prose`'s flow is `--text-body`, so the ratio
the redesign asked for is what the answer already renders at. The answer is never retyped and never
recoloured — there is no `--acc-answer-ink`, because a `strong`, a link or a `code` span inside an
answer has to match Prose everywhere else on the site. Accordion's `.answer` class owns the inset,
the measure and the wrapping, and nothing else.

**How that was settled, because it took three passes.** The first proposal was that `Prose` gain
`size?: "lg" | "md"` — its single type size being the actual defect, on the evidence that `Proof`
already escapes it with `font: inherit`. That was rejected by the owner on 25 August 2026. The
fallback in the redesign brief was to re-implement a paragraph/list/link subset inside Accordion's
module, which would leave an answer carrying an `h4`, a `blockquote` or a table rendering unstyled
the first time content went off the audited shape; the build did not do that either. It restated the
size alone, at the answer root, with a selector strong enough to beat Prose's — and then `Prose`
stepped its whole flow from `--text-body-lg` to `--text-body`, which made that override a no-op and
retired it. The 18px this section used to describe is gone from the system, not overridden in one
component.

## 9 · Responsive

Accordion has no internal arrangement breakpoint. At 1023 and 767 the shared h5 composite steps
through the type layer; no component rule swaps the type role or any gap. The question wraps while
the fixed lg mark remains at inline end, and the answer keeps the Prose measure.

At 767 the component shrinks to the parent track. At the 192px stress track, full inline sizing,
`min-inline-size: 0` and anywhere wrapping on the question prevent horizontal overflow. There is no
hard component minimum: a disclosure remains operable below 192px, so inventing one would only
widen an illegal parent.

The trigger clears the 44px touch floor through its h5 line plus its insets: 22/1.28 is a 28.16px
line, so a closed summary (two `--gap-block` insets) measures ~76px, and ~74px at the mobile h5 step
where 20/1.3 gives 26px. An open summary (`--gap-block` above, `--gap-text` below) measures ~68px,
and ~66px at the mobile step. No invisible hit extension or responsive size step is needed. The gap scale does not shift
responsively, the answer never clamps, and the mark never overlaps the question.

## 10 · Composition

```tsx
<Layout as="div" rowGap="none">
  {items.map((item, index) => (
    <details open={index === 0}>
      <Cluster as="summary" colGap="block" justify="between" align="start" nowrap>
        <Question>{item.question}</Question>
        <span>
          <Icon name="alt-arrow-down" size="lg" />
          <Icon name="alt-arrow-up" size="lg" />
        </span>
      </Cluster>
      <Prose html={item.answerHtml} />
    </details>
  ))}
</Layout>
```

This skeleton communicates ownership, not runtime syntax: native `details` owns open state, and both
chevrons sit in the DOM at all times so `[open]` can pick which one shows without rotating either.
`Question` is the `questionAs` element, `h3` by default.

`Layout` owns the zero-gap item axis and the `summary` IS the Cluster that owns the only inline
arrangement — which is what removed the `triggerContent` span the first build carried. There is no
hand-written grid or flex arrangement, no margin on a child and no external override of Section's
ground, padding or content column.

## 11 · Accessibility

Each item is one native `details` with a direct native `summary` followed by its `Prose` answer.
The browser supplies disclosure role, expanded/collapsed state, activation behavior and the
summary's accessible name from the question. The two chevrons are unlabelled `Icon` instances and
therefore `aria-hidden`; they do not repeat the state the native control already announces.

The question is a heading inside that summary — `h3` by default, `h4` via `questionAs` — so a set of
5–7 questions appears in the heading tree of a page it normally ends. That is the point of it:
screen-reader and voice-control users navigate a long page by heading, and the first build left the
entire FAQ absent from that tree with no way to jump to it or scan it. The heading is additive and
costs the summary nothing: role, expanded state and accessible name are unchanged either way.

| Key / input     | Closed item | Open item | Focus after action |
| --------------- | ----------- | --------- | ------------------ |
| `Tab`           | Moves to the next summary. | Moves from the summary into any focusable Prose link, otherwise to the next summary. | The newly focused native element. |
| `Shift+Tab`     | Moves to the previous focusable element. | Reverses through answer links then the summary. | The newly focused native element. |
| `Enter`         | Opens the item. | Closes the item. | Remains on the same summary. |
| `Space`         | Opens the item. | Closes the item. | Remains on the same summary; page does not scroll. |
| pointer click   | Opens the item. | Closes the item. | Browser focus moves to the clicked summary. |
| `Escape`        | Unbound. | Unbound; this is inline content, not a modal or navigation panel. | Unchanged. |
| Arrow/Home/End  | Unbound; Accordion is not a composite widget with managed focus. | Same. | Unchanged. |

Accordion authors no `role`, `aria-expanded`, `aria-controls`, `aria-labelledby` or IDs. Native
details/summary means there is no idref to generate and no hidden or missing panel for an
`aria-controls` value to point at. Prose answer markup remains in the DOM when collapsed but is not
rendered or focusable under the native closed details behavior.

Focus follows document order: summary, any open answer links, then the next summary. In the
recommended multi-open mode, opening one item leaves siblings and focus untouched. Closing from
the focused summary leaves focus on that summary. There is no programmatic close while focus is in
an answer.

The focus ring appears only for `focus-visible`, using the measured ring/gap pairs in section 6, and
it is unchanged by the redesign. Keyboard focus resolves the question and mark to the same raised
ink as hover — a focused row that read quieter than a hovered one would be a regression, and the old
build avoided it only because the ring arrived alongside the hover ground.

Question contrast is at least 4.5:1 at rest, hover and pressed on all four surfaces; the mark is
decoration and clears the 3:1 non-text floor on all four. Prose retains its own measured contrast.
Reduced motion makes the two ink transitions instant; no height or mark transform exists to reduce.

A screen reader announces a closed item as “How long does a product design engagement take?,
collapsed, button” and after activation as “How long does a product design engagement take?,
expanded, button”, followed by the answer in normal reading order.

## 12 · Content edge cases

| Case                                      | Required handling |
| ----------------------------------------- | ----------------- |
| Longest realistic string                  | Render a 120-character question and a two-paragraph, 500-character answer. Question and Prose wrap and grow; neither clamps or truncates. |
| One long unbroken token                   | A URL in `answerHtml` wraps or scrolls according to Prose's own element rule without widening Accordion; a long question token uses anywhere wrapping. |
| Zero items                                | After invalid records are removed, render `null` and warn in development. Do not emit an empty root. |
| One item                                  | Render the one valid disclosure and warn that production content is below the expected minimum of two. It still keeps the leading and final rule. |
| Many items (2× expected)                  | Render all 16 valid disclosures and warn above the expected maximum of eight. Do not paginate, clamp, group or hide later items. |
| Missing image or missing optional slot    | No image or optional slot exists. Omitting one is impossible because the public item type has only required question and answer strings. |
| Empty required-ish text                   | A whitespace-only question or answer invalidates that item and warns in development. The first remaining valid item receives the site-wide initial-open treatment. |
| Narrow track at 767                       | One column, unchanged gaps and h5 role. Question wraps before the mark; answer remains below and no height animation runs. |
| Parent that does not size it              | Root requests the full available line up to `--measure-body`, uses `min-inline-size: 0`, and has no hard minimum. In a wrapping `Cluster`, it does not collapse to the mark's intrinsic width. |
| Logical properties rather than left/right | Trigger/answer use block and inline insets; mark sits at inline end. No left/right positioning is authored. |
| Surface nested inside a different one     | The nearest surface redeclares all seven Accordion colour tokens; a tint set inside ink resolves the full tint column. Prose resolves its own nearest-surface palette independently. |
| Two components adjacent                   | Each root keeps its leading rule and each final item keeps its ending rule. A production parent uses its normal block/stack gap; a zero-gap stress harness intentionally shows two hairlines where two complete sets meet. |
| Interactive content inside a slot         | The question cannot contain controls because it is a string. Sanitised Prose may contain an inline link; it appears after its open summary in focus order and never nests inside the summary control. Other form controls are outside the audited one/two-paragraph content shape. |

## 13 · Motion

**Amended 1 Oct 2026 (owner: "add subtle motion to the opening and closing … so it doesn't feel so
jumpy", global).** The answer now opens and closes with motion, on the native element:

- `.item { interpolate-size: allow-keywords }` lets `block-size` transition to `auto`, scoped to the
  component rather than set on `:root`.
- `.item::details-content` (the UA box around everything after the summary) goes from `block-size: 0;
  opacity: 0; overflow: clip` to `block-size: auto; opacity: 1` under `[open]`, over
  `--acc-reveal-duration` (`--duration-medium`, 240ms) with `--acc-transition-easing`.
  `content-visibility` is transitioned `allow-discrete`, so a closing answer stays painted until its
  height has gone.
- The open state's tighter inset under the question (`padding-block-end` 24 → 16) eases on the same
  duration, so it does not arrive as a second, smaller jump.

Why 240: the answer travels its own height, often 150–300px; at 140 that reads as a snap, and 360 made
a seven-item FAQ heavy to scan.

**Progressive, not polyfilled.** Where `::details-content` or `interpolate-size` is unsupported, the
answer appears at once, as it did before. No JavaScript, no height measurement, no max-height guess,
so the native behaviour this component exists to keep (find-in-page, keyboard, independent items) is
untouched. This supersedes the earlier "no height interpolation" ruling, which was right while the
only way to animate `<details>` was to fake it.

Unchanged: question and mark ink transition on `--acc-transition-duration` (`--duration-fast`); the
chevron swap is immediate; no transform, rotation, slide or rule wipe. Reduced motion resolves every
transition, the answer's included, to `--duration-instant`.

## 14 · Do's and Don'ts

**Do**

1. Render a native `details`/`summary` pair for every valid record; inspect the accessibility tree
   and native open state.
2. Hand every answer string to `Prose html`; inspect one- and two-paragraph answers and an inline
   link. Accordion's module says exactly one thing about the answer — its size — and nothing about
   its colour, flow rhythm, links or lists.
3. Use `Layout rowGap="none"` for the set and `Cluster as="summary"` for question/mark placement;
   the module must contain no sibling-arranging grid or flex declaration, and no `triggerContent`
   wrapper.
4. Render the identical record set on paper, tint, ink and blue and inspect all seven resolved
   colour tokens, including the nearest nested surface.
5. Keep the summary taller than 44px, the mark at inline end and the question wrappable at 192px.
6. Count rendered valid items and development warnings for zero, one, sixteen and blank records.
7. Point, hold, Tab, press Enter and press Space on every surface; compare hover, pressed, focus,
   closed and expanded renderings.

**Don't**

8. Do not add a mode, initial-open, icon, placement, grouping, nesting, variant, size, surface,
   children, className or style prop; attempted calls must fail type checking.
9. Do not paint an item or trigger ground in ANY state — rest, hover, focus, pressed or open — and
   do not surround each item with four borders. Search the module for `background` and for inline
   edges and expect neither. Do not give the open item a rule colour of its own either: search for
   an `[open]` border rule and expect none.
10. Do not animate height or rotate the mark; search the module for height/max-height transitions
    and transforms and expect none. Both chevrons are in the DOM and `[open]` picks between them.
11. Do not author ARIA disclosure attributes or IDs on top of native details/summary; the rendered
    tree must carry no duplicate role/state wiring.
12. Do not import a pattern, content or route. Accordion may import only Tier 1 components and
    leaves.
13. Do not sanitize answer HTML inside Accordion or Prose. The content seam must supply trusted,
    sanitised HTML before rendering.
14. Do not truncate after eight, close siblings through content sniffing, or infer groups from a
    stray eyebrow outside the `items` array.

## 15 · Specimen plan — `/design/accordion`

The exact block list, in order:

1. **Identity and finish.** One five-item set with the recommended initial state. Annotate the
   continuous leading/block-end rule ladder, absent item grounds and trailing chevron swap.
2. **Count ladder.** Real 2-, 5- and 8-item sets with distinct question/answer records. No variants
   or sizes are implied by count.
3. **Disclosure behavior.** One set proving the accepted site-wide single/multi-open choice. For
   the recommended mode, open three non-adjacent answers simultaneously and show that siblings
   remain untouched.
4. **Initial state.** Reload instructions and a labelled first-valid-item proof; show the all-closed
   alternative only as prose, not a second component behavior.
5. **States.** One closed and one expanded item at rest plus a five-row reference for rest, hover,
   focus, pressed and expanded. Hover, pointer-down and keyboard focus have no props and must be
   pointed at, held and tabbed to.
6. **Rich answer shapes.** Identical questions with one paragraph, two paragraphs and one inline
   link. Prose owns every inner relationship and link state.
7. **All four surfaces as sibling bands with identical markup.** Each band renders the same three
   records and prints the matching section 6 surface rationale.
8. **Nested surfaces.** Tint inside ink and ink inside paper, with the same three records and all
   seven resolved Accordion colour tokens listed beside each.
9. **Long content.** The required 120-character question, two-paragraph 500-character answer and
   unbroken question/answer URL cases.
10. **Counts and invalid records.** Visible empty harness for zero items, one valid item, sixteen
    valid items, blank question, blank answer and a blank first record followed by a valid one.
11. **Native semantics and focus order.** Print the details/summary element map, then include an
    answer link between two summaries for Tab/Shift+Tab testing. State that Escape and arrow keys
    are deliberately unbound.
12. **Narrow and unsized parents.** The same three-item set at 256px and 192px, then inside a
    wrapping `Cluster` with no explicit track. No question/mark collision or page overflow.
13. **Two adjacent Accordions.** Zero-gap stress shows the deliberate double hairline between
    complete sets, followed by the production block-gap composition.
14. **What a static page cannot force.** Manual instructions for hover, held pointer, Tab focus,
    Enter/Space, reload initial state, 767px and reduced motion.

The squint test reads as four shapes: one long five-row rule ladder, a count-density progression,
four surface bands and two narrow vertical rails. Open answers interrupt the ladder with real copy,
so the page does not become one rectangle repeated.

## 16 · New token requests

**None — every value in this spec is an existing token.**

The `--acc-*` component layer maps existing colour ramps, h5/body typography, measures, gap roles,
icon sizes, hairline, focus geometry, radius, shadow, duration and easing into Accordion's
parts and states. It introduces no primitive, usage token, glyph or motion mechanism. That is still
true after the redesign: every new value is an existing ramp step.

The layer as built, for the record:

- **New.** `--acc-question-ink`, `--acc-question-ink-hover`, `--acc-mark-ink`, `--acc-mark-ink-hover`
  (four surfaces each), and a geometry token for the pressed underline's offset (removed with the
  underline, 7 Oct 2026).
- **Changed.** `--acc-rule-ink` lightens one step on every surface: neutral-200 paper, neutral-300
  tint, neutral-800 ink, brandeis-400 blue.
- **Dropped.** `--acc-trigger-fg` (split into a question ink and a mark ink, which no longer move
  together), `--acc-trigger-bg-hover`, `--acc-trigger-bg-pressed`, `--acc-rule-ink-expanded`.
- **Unchanged.** `--acc-ring-color`, `--acc-ring-gap-color`, `--acc-ring-width`, `--acc-ring-offset`,
  `--acc-rule-width`, `--acc-radius`, `--acc-shadow`, `--acc-transition-duration`,
  `--acc-transition-easing`.

The surface-dependent count is seven either way, so section 6's table keeps its shape.

## 17 · Open questions

**1 · Site-wide open mode — resolved (was BLOCKING).**

- **(a) Multi-open.** Every native `details` owns its state. Opening a question leaves previously
  opened answers available for comparison. There is no client state, managed focus or sibling
  side effect.
- **(b) Single-open.** Opening one question closes the previously open sibling. The implementation
  must coordinate the group consistently and prove focus remains on the newly activated summary.

**Owner decision — accepted 24 August 2026: (a), multi-open.** Answers are short—one or two
paragraphs—and sets top out at
eight. Keeping several open lets a reader compare audit scope or engagement questions without
reopening them. It also uses the native disclosure contract with no client state, while a
single-open group saves height by destroying context and creates a sibling side effect the reader
must learn. Every native `details` therefore owns its state independently.

**2 · Initial state — non-blocking.** Options: all items closed; or first valid item open.
**Recommendation and draft decision: first valid item open.** The set is normally the last block on
a long page. One visible answer proves that content continues below the rule ladder and teaches the
mark without opening half the component. It remains closable and, under recommended multi-open,
does not prevent any other answer opening.

**3 · Disclosure mark and placement — non-blocking.** Options: trailing existing chevrons; leading
existing chevrons; or a new plus/minus glyph request. **Recommendation and draft decision: trailing
`alt-arrow-right` closed and `alt-arrow-down` open.** Both glyphs exist, their direction describes the
revealed axis without rotation, and trailing placement preserves one clean question start across
wrapped rows. Plus/minus adds glyphs while conveying no more state.

**Amended 29 Sep 2026 (tracker 2.17, owner decision): `alt-arrow-down` closed, `alt-arrow-up`
open.** A resting right chevron is the convention for "this row navigates", and a disclosure does
not leave the page. Down says "opens here", up says "closes". Still trailing, still two glyphs in
the DOM with `[open]` choosing, still no rotation.

**4 · Item separation — non-blocking.** Options: one rule ladder; a gap; or a ground per item.
**Recommendation and draft decision: one leading rule and one block-end rule per item.** Rules
preserve a single set at 5–7 rows. A gap weakens the question/answer grouping, and repeated grounds
create the rejected stack of boxes.

The draft added "with the expanded item's ending rule stepping to action ink", and the redesign of
25 August 2026 removed that half: it put the action colour on a decoration, at the bottom of an
answer often 300px below the question whose state it described. The ladder itself is unchanged and
the rule is one step lighter on every surface. See sections 5 and 6.

**5 · The three redesign decisions — resolved 25 August 2026.**

- **(a) Answer ink.** Inherit Prose's own, or add `--acc-answer-ink` at neutral-700. **Accepted:
  inherit.** Section 8 has the reasoning.
- **(b) Question element.** Hard-code `h3`, or add `questionAs`. **Accepted: `questionAs`, defaulting
  to `h3`**, following the `titleAs` precedent on `BlockCard` and `ListCard`.
- **(c) A `size` prop on `Prose`.** **Rejected.** Accordion restates the answer's size from outside
  instead, at the answer root, so Prose keeps every other decision it owns. Section 8 has the
  reasoning and what was given up.

## Appendix · Self-audit

```text
STRUCTURE
[x] All 18 sections present, in order, with the exact headings.
[x] Front matter states Tier 2 pattern, Status implemented and token prefix --acc-*; repository search
    finds no collision.
[x] Every Anatomy part appears in colour, geometry or is explicitly delegated to native semantics
    or Prose.

NAMES
[x] Distinct token-name count: 50, of which 22 are --acc-*. Every referenced existing name resolves
    in the repository token layer; --acc-* names are the component layer declared by this spec.
    Seven --acc-* names appear ONLY in prose recording what was deleted or never built —
    --acc-trigger-fg, --acc-trigger-bg-hover, --acc-trigger-bg-pressed, --acc-rule-ink-expanded,
    --acc-question-ink-pressed, --acc-answer-ink and --acc-layer. The token layer declares 12.
[x] Glyphs are existing: alt-arrow-down and alt-arrow-up (ch04 names; amended 29 Sep 2026).
[x] Section, Layout and Cluster prop/value names are existing unions: as, rowGap, colGap, justify,
    align, nowrap; div, span, none, block, between, start.
[x] Zero hex codes, rgb(), hsl(), Tailwind names, CSS declarations, selectors or media blocks.
[x] h5 uses its required tracking companion; Prose owns the answer composite.
[x] Every layout distance is a gap-scale role.
[x] Space-ramp reaches: none (the pressed-underline offset was removed 7 Oct 2026).
[x] Literal pixels appear only as existing breakpoint, touch, track and Section-cap measurements
    used to explain verification; no literal becomes an implementation value.

COLOUR AND CONTRAST
[x] Colour table has 7 rows × 4 complete cells; no delta and no blank.
[x] Question ink is at least 4.5:1 at rest, hover and pressed on all four surfaces (lowest 4.91:1,
    brandeis-100 on blue). The mark is decoration and clears the 3:1 non-text floor on all four
    (lowest 3.16:1, neutral-500 on paper). Ratios were recomputed for this redesign, not copied.
[x] Focus ring is measured against its own gap on all four surfaces.
[x] Rules are explicitly marked decoration.
[x] One paragraph per surface explains the mapping; nested surfaces are specified.

STATES
[x] Rest, hover, focus, pressed and expanded come from the fixed model.
[x] There are no backgrounds. Pressed differs from hover by a hairline underline rather than by a
    ground, on all four surfaces.
[x] Every state token moves on at least one surface and is declared in all four columns. The
    redesign brief listed --acc-question-ink-pressed and --acc-question-ink-expanded with the same
    four values as -hover; they were not built, per token rule 3.
[x] Excluded states have no tokens; no disabled opacity and no colour-only state.

LAYOUT, TYPE, SEMANTICS
[x] Every arrangement belongs to Layout or Cluster; no columns declaration requires a colGap.
[x] No child margin and no responsive gap/type-role swap.
[x] Question and answer name measures.
[x] Native summary clears the 44px floor: ~76px closed (two --gap-block insets), ~74px at the
    mobile h5 step; ~68px / ~66px open (--gap-block above, --gap-text below).
[x] Native details/summary needs no authored ARIA idref or upward-walking selector.

COMPLETENESS
[x] All thirteen required content edge cases are answered.
[x] The unsized-parent row says no hard minimum is needed and names the 192px stress track.
[x] Do's and Don'ts name a rendered tree, type check, search or computed style decision.
[x] Specimen plan covers the one rendering/size, all states, four surfaces, nested surfaces, every
    edge case, adjacent sets, counts and narrow tracks.
[x] Section 16 says None and explains why component tokens are not a new request.
[x] Every open question has options, recommendation and a recorded resolution; zero blockers remain.
[x] Squint test: four shapes, with open answer depth and count density rather than repeated boxes.
```

## Amendment — final fix round (cmp-media-split, 6 Oct 2026)

- `.question` wraps with `--text-running-wrap` (pretty), not the title's balance: a balanced break
  halved a question at 390 and left the space before the chevron empty.
