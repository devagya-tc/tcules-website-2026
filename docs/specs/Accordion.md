# Accordion

## 0 · Front matter

|                     |                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Component**       | `Accordion`                                                                                                             |
| **Tier**            | 2 pattern (`src/patterns/Accordion/`)                                                                                   |
| **Status**          | implemented                                                                                                             |
| **Token prefix**    | `--acc-*`                                                                                                               |
| **Designer / date** | Codex / 24 Aug 2026                                                                                                     |
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
| trigger    | yes      | native `summary`       | The full-width interactive target. Owns pointer and keyboard states and contains only the question and decorative mark. |
| question   | yes      | text `span`            | One plain-text question, normally ending in a question mark. It is not caller-authored markup and cannot contain a control. |
| mark       | yes      | `Icon`                 | Decorative disclosure direction: `chevron-right` while closed and `chevron-down` while open. |
| answer     | yes      | `Prose`                | One trusted, sanitised rich-text field, normally one or two paragraphs. Prose alone owns markup rhythm, inline links and body typography. |
| rule       | yes      | root/item logical edge | One leading hairline for the set and one block-end hairline per item. The expanded item's final rule steps to the action ink. |

There is no optional media, icon slot, nested item slot, grouping label, action slot, header or
footer. `ContentSection` owns the section heading and any eyebrow outside the array seam.

## 3 · Props / API

```ts
export type AccordionItem = {
  question: string;
  answerHtml: string;
};

export type AccordionProps = {
  items: readonly AccordionItem[];
};
```

| Prop         | Exact type                   | Default | What it decides |
| ------------ | ---------------------------- | ------- | --------------- |
| `items`      | `readonly AccordionItem[]`   | none    | Ordered disclosures. Zero valid items render nothing; expected production count is 2–8. |
| `question`   | `string`                     | none    | Native summary accessible name and visible question text. Whitespace-only values invalidate that item. |
| `answerHtml` | `string`                     | none    | Trusted, content-seam-sanitised HTML handed directly to `Prose html`. Whitespace-only values invalidate that item. |

The API deliberately has no `mode`, `multiple`, `defaultOpen`, `openItems`, `onToggle`,
`allowCollapse`, `mark`, `markPosition`, `variant`, `size`, `surface`, `tone`, `finish`, `heading`,
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

| State              | Trigger / owner                | What visibly or semantically changes |
| ------------------ | ------------------------------ | ------------------------------------- |
| rest · closed      | native base state              | Question and right chevron render over the inherited ground; the quiet rule closes the row. |
| hover              | trigger pointer hover          | `--acc-trigger-bg-hover` appears behind the full trigger. Question/mark ink does not move. |
| focus · keyboard   | trigger `focus-visible`        | Hover background plus the two-part surface ring. Native focus remains on the summary. |
| pressed            | trigger pointer down           | `--acc-trigger-bg-pressed` replaces hover, so pressed differs on every surface without relying on colour alone. |
| expanded · open    | native item open state         | Answer becomes available, mark swaps to `chevron-down`, and the item's `--acc-rule-ink-expanded` replaces its quiet rule. |

The open mark swap is immediate; it does not rotate or fade. The expanded rule colour transitions,
but answer height does not. In the recommended multi-open mode, expanding one item does not alter
any sibling. In the recommended initial state, the first valid item begins expanded and every
remaining item begins closed.

Held/current, disabled, selected, loading, busy and error are excluded. The questions are always
available disclosures, not navigation, selection, asynchronous work or validation. There is no
disabled opacity and no state sniffed from answer content.

## 6 · Per-surface colour

The trigger owns a control palette; the answer owns none because `Prose` resolves its own complete
surface palette. At rest the trigger paints no background, so `--acc-trigger-fg` is measured against
the Section ground. Hover and pressed background cells include the unchanged trigger foreground's
contrast against that fill.

| Token                         | paper                                              | tint                                               | ink                                                | blue                                             |
| ----------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------ |
| `--acc-trigger-fg`            | `--color-neutral-900` — 14.62:1                   | `--color-neutral-900` — 13.06:1                   | `--color-white` — 17.26:1                         | `--color-white` — 6.23:1                        |
| `--acc-trigger-bg-hover`      | `--color-neutral-100` — foreground 12.37:1        | `--color-neutral-200` — foreground 10.97:1        | `--color-neutral-900` — foreground 14.75:1        | `--color-brandeis-600` — foreground 7.59:1      |
| `--acc-trigger-bg-pressed`    | `--color-neutral-200` — foreground 10.97:1        | `--color-neutral-300` — foreground 9.46:1         | `--color-neutral-800` — foreground 11.92:1        | `--color-brandeis-700` — foreground 10.16:1     |
| `--acc-rule-ink`              | `--color-neutral-300` — n/a, decoration           | `--color-neutral-400` — n/a, decoration           | `--color-neutral-700` — n/a, decoration           | `--color-brandeis-300` — n/a, decoration        |
| `--acc-rule-ink-expanded`     | `--color-brandeis-500` — n/a, decoration          | `--color-brandeis-500` — n/a, decoration          | `--color-brandeis-300` — n/a, decoration          | `--color-white` — n/a, decoration                |
| `--acc-ring-color`            | `--color-brandeis-500` — 6.17:1 against its gap   | `--color-brandeis-500` — 5.51:1 against its gap   | `--color-brandeis-300` — 7.32:1 against its gap   | `--color-white` — 6.23:1 against its gap        |
| `--acc-ring-gap-color`        | `--color-paper` — paired ring 6.17:1              | `--color-paper-deep` — paired ring 5.51:1         | `--color-neutral-950` — paired ring 7.32:1        | `--color-brandeis-500` — paired ring 6.23:1     |

**Paper.** The question and mark use neutral-900. Neutral-100 and 200 distinguish hover and
press without turning every question blue; blue is reserved for the expanded rule and focus ring.
The neutral-300 resting hairline keeps a seven-row set quiet.

**Tint.** The trigger ink holds at neutral-900, while interaction grounds deepen to neutral-200
and 300 so they remain visible on paper-deep. The resting rule steps to neutral-400; expanded and
focus remain Brandeis 500 because both clear their floor.

**Ink.** White carries the trigger. Neutral-900 and 800 supply hover and pressed grounds without
introducing a pale-blue panel into the dark band. The quiet rule stays neutral-700; expanded rule
and focus lift to Brandeis 300.

**Blue.** The trigger stays white. Hover and pressed deepen the existing surface through Brandeis
600 and 700; the component never introduces a second ground family. The expanded rule and focus
ring use white, with the ring's gap resolving to the Section's actual Brandeis-500 ground.

Every surface block redeclares all seven surface-dependent tokens. A tint Accordion nested inside
an ink section resolves the complete tint column, including interaction grounds and focus gap; no
outer ink value may leak through an omitted declaration.

## 7 · Geometry & spacing

### (a) Distances

- Root item seam: `Layout rowGap="none"`; rule edges meet as one ladder.
- Trigger block inset: `--gap-text` above and below the h5 question, making the natural target
  comfortably taller than the 44px floor.
- Question-to-mark seam: `Cluster colGap="block"`, `justify="between"`, `nowrap`, `align="start"`.
- Trigger-to-answer seam: `--gap-tight` at the answer's block start.
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
- Layer: `--acc-layer` resolves to `--z-base`; no item overlaps another.

### (c) Optical corrections

None. Accordion does not reach the space ramp. Trigger and answer insets are layout relationships
named by the gap scale; the mark uses an existing icon size.

## 8 · Typography

| Part     | Role             | Tracking companion       | Measure |
| -------- | ---------------- | ------------------------ | ------- |
| question | `--text-h5`      | `--text-h5-tracking`     | `--measure-body` |
| answer   | owned by `Prose` | owned by `Prose`         | `Prose`'s `--measure-body` |

Question copy is sentence case and retains its authored question mark: “How long does a product
design engagement take?” It is a `span` inside the native summary, not a heading element. The
summary is already a named interactive control, and adding a second heading-navigation system for
the same eight questions would duplicate rather than clarify the page structure.

The answer is never retyped or recoloured by Accordion. `Prose` renders its existing body-lg role,
links, lists and one/two-paragraph rhythm on every surface.

## 9 · Responsive

Accordion has no internal arrangement breakpoint. At 1023 and 767 the shared h5 composite steps
through the type layer; no component rule swaps the type role or any gap. The question wraps while
the fixed lg mark remains at inline end, and the answer keeps the Prose measure.

At 767 the component shrinks to the parent track. At the 192px stress track, full inline sizing,
`min-inline-size: 0` and anywhere wrapping on the question prevent horizontal overflow. There is no
hard component minimum: a disclosure remains operable below 192px, so inventing one would only
widen an illegal parent.

The trigger clears the 44px touch floor through its h5 line plus two `--gap-text` block insets; no
invisible hit extension or responsive size step is needed. The gap scale does not shift
responsively, the answer never clamps, and the mark never overlaps the question.

## 10 · Composition

```tsx
<Layout as="div" rowGap="none">
  {items.map((item, index) => (
    <details open={index === 0}>
      <summary>
        <Cluster as="span" colGap="block" justify="between" align="start" nowrap>
          <span>{item.question}</span>
          <Icon name={open ? 'chevron-down' : 'chevron-right'} size="lg" />
        </Cluster>
      </summary>
      <Prose html={item.answerHtml} />
    </details>
  ))}
</Layout>
```

This skeleton communicates ownership, not runtime syntax: native `details` owns open state and the
implementation exposes the correct mark through that state without rotating it. `Layout` owns the
zero-gap item axis; `Cluster` owns the only inline arrangement. There is no hand-written grid or
flex arrangement, no margin on a child and no external override of Section's ground, padding or
content column.

## 11 · Accessibility

Each item is one native `details` with a direct native `summary` followed by its `Prose` answer.
The browser supplies disclosure role, expanded/collapsed state, activation behavior and the
summary's accessible name from the question. The two chevrons are unlabelled `Icon` instances and
therefore `aria-hidden`; they do not repeat the state the native control already announces.

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

The focus ring appears only for `focus-visible`, using the measured ring/gap pairs in section 6.
Question contrast is at least 4.5:1 at rest, hover and pressed on all surfaces. Prose retains its
own measured contrast. Reduced motion makes background and border-colour transitions instant; no
height or mark transform exists to reduce.

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

Trigger background colour and item border colour transition with
`--acc-transition-duration: --duration-fast` and
`--acc-transition-easing: --easing-standard`. The disclosure opens and closes at native layout
speed with no height interpolation. The chevron swap is immediate.

There is no transform, translation, rotation, scale, rule wipe, fade, opacity change, height
animation, max-height animation, answer slide or mark movement. Reduced motion resolves the two
colour transitions to `--duration-instant`; content visibility and native keyboard behavior are
unchanged.

## 14 · Do's and Don'ts

**Do**

1. Render a native `details`/`summary` pair for every valid record; inspect the accessibility tree
   and native open state.
2. Hand every answer string to `Prose html`; inspect one- and two-paragraph answers and an inline
   link without adding answer typography to Accordion's module.
3. Use `Layout rowGap="none"` for the set and `Cluster` for question/mark placement; the module must
   contain no sibling-arranging grid or flex declaration.
4. Render the identical record set on paper, tint, ink and blue and inspect all seven resolved
   colour tokens, including the nearest nested surface.
5. Keep the summary taller than 44px, the mark at inline end and the question wrappable at 192px.
6. Count rendered valid items and development warnings for zero, one, sixteen and blank records.
7. Point, hold, Tab, press Enter and press Space on every surface; compare hover, pressed, focus,
   closed and expanded renderings.

**Don't**

8. Do not add a mode, initial-open, icon, placement, grouping, nesting, variant, size, surface,
   children, className or style prop; attempted calls must fail type checking.
9. Do not paint an item ground at rest or surround each item with four borders; search for a rest
   background and inline edges and expect neither.
10. Do not animate height or rotate the mark; search the module for height/max-height transitions
    and transforms and expect none.
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
icon sizes, hairline, focus geometry, radius, shadow, z-layer, duration and easing into Accordion's
parts and states. It introduces no primitive, usage token, glyph or motion mechanism.

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
`chevron-right` closed and `chevron-down` open.** Both glyphs exist, their direction describes the
revealed axis without rotation, and trailing placement preserves one clean question start across
wrapped rows. Plus/minus adds glyphs while conveying no more state.

**4 · Item separation — non-blocking.** Options: one rule ladder; a gap; or a ground per item.
**Recommendation and draft decision: one leading rule and one block-end rule per item, with the
expanded item's ending rule stepping to action ink.** Rules preserve a single set at 5–7 rows. A
gap weakens the question/answer grouping, and repeated grounds create the rejected stack of boxes.

## Appendix · Self-audit

```text
STRUCTURE
[x] All 18 sections present, in order, with the exact headings.
[x] Front matter states Tier 2 pattern, Status implemented and token prefix --acc-*; repository search
    finds no collision.
[x] Every Anatomy part appears in colour, geometry or is explicitly delegated to native semantics
    or Prose.

NAMES
[x] Distinct token-name count: 45. Every referenced existing name resolves in the repository token
    layer; --acc-* names are the component layer declared by this spec.
[x] Glyphs are existing: chevron-right and chevron-down.
[x] Section, Layout and Cluster prop/value names are existing unions: as, rowGap, colGap, justify,
    align, nowrap; div, span, none, block, between, start.
[x] Zero hex codes, rgb(), hsl(), Tailwind names, CSS declarations, selectors or media blocks.
[x] h5 uses its required tracking companion; Prose owns the answer composite.
[x] Every layout distance is a gap-scale role.
[x] Space-ramp reaches: 0.
[x] Literal pixels appear only as existing breakpoint, touch, track and Section-cap measurements
    used to explain verification; no literal becomes an implementation value.

COLOUR AND CONTRAST
[x] Colour table has 7 rows × 4 complete cells; no delta and no blank.
[x] Trigger foreground is at least 4.5:1 at rest, hover and pressed on all surfaces.
[x] Focus ring is measured against its own gap on all four surfaces.
[x] Rules are explicitly marked decoration.
[x] One paragraph per surface explains the mapping; nested surfaces are specified.

STATES
[x] Rest, hover, focus, pressed and expanded come from the fixed model.
[x] Hover and pressed backgrounds differ on all four surfaces.
[x] Every state token moves on at least one surface and is declared in all four columns.
[x] Excluded states have no tokens; no disabled opacity and no colour-only state.

LAYOUT, TYPE, SEMANTICS
[x] Every arrangement belongs to Layout or Cluster; no columns declaration requires a colGap.
[x] No child margin and no responsive gap/type-role swap.
[x] Question and answer name measures.
[x] Native summary clears the 44px floor through its line plus block insets.
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
