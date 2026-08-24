# Callout

## 0 · Front matter

|                     |                                      |
| ------------------- | ------------------------------------ |
| **Component**       | `Callout`                            |
| **Tier**            | 2 pattern (`src/patterns/Callout/`)  |
| **Status**          | implemented                          |
| **Token prefix**    | `--call-*`                           |
| **Designer / date** | Codex / 24 Aug 2026                  |
| **Implements**      | `docs/briefs/16-callout.md`          |
| **Implemented at**  | `src/patterns/Callout/` · `src/styles/tokens/components/callout.css` · specimen `src/app/design/callout/page.tsx` |

This spec was checked against the current repository vocabulary and the twenty shipped
components. The brief proposes Tier 1, but the hard constraint that rich text “takes Prose” changes
that answer: a primitive may not import another primitive, while a Tier 2 pattern may compose
`Prose`. The owner accepted the new Tier 2 pattern in section 17 question 1; the remaining
non-blocking recommendations are accepted as drafted.

## 1 · Identity

`Callout` is a quiet, unattributed scope note that immediately follows the claim it limits. It says
what the surrounding argument, example or evidence does not establish. It appears ten times across
eight routes; `/services/product-design` contains three and the other seven routes contain one.

It is a Tier 2 pattern because it owns the semantic boundary around a trusted rich-text field and
composes the Tier 1 `Prose` primitive. The content seam routes a scope limitation to this typed
record, an ordinary quotation into the surrounding `Prose`, and an attributed quotation to
`Proof`. Callout never inspects HTML to decide which one it received.

It is not a quotation. `Prose` owns ordinary unattributed quotations inside a rich-text flow and
renders them at its established quote scale with a leading rule. It is not client evidence:
`Proof` owns a quote with name, role and company, plus optional audited figures. It is not an alert:
there is no warning, error, success, urgency, dismissal or recovery action in the ten records, and
no alert component exists to borrow. It is not a caption: `Figure` owns the note that qualifies an
image and moves with that image.

This is not a `Prose` size prop. Prose has one reading treatment for an arbitrary body flow; adding
a quiet size to it would let any page diminish any paragraph without saying why. Callout makes the
meaning, fixed quiet treatment and note semantics arrive together. It is also not the existing
Prose blockquote: that treatment increases visual weight through quote type and a deck rule, while
this record must recede from the claim it qualifies.

## 2 · Anatomy

| Part | Required | Element / owner | Content and responsibility |
| ---- | -------- | --------------- | -------------------------- |
| root | yes | element with native-equivalent `role="note"` | Establishes one parenthetic scope note. Owns no ground, edge, outer seam or interactive behavior. |
| content | yes | existing `Prose` | One trusted, sanitised rich-text field containing one or two paragraphs and inline rich text. Callout owns its quiet type and ink; Prose owns the HTML seam, internal flow and inline links. |

There is no eyebrow, heading, label, icon, mark, quotation glyph, attribution, portrait, logo,
image, action, dismissal control, severity marker, panel or ground. The claim being limited is not a
slot: it remains a preceding sibling so the content model does not duplicate page prose inside a
note record.

## 3 · Props / API

```ts
export type CalloutProps = {
  /** Trusted, content-seam-sanitised rich text for one scope limitation. */
  html: string;
};
```

| Prop | Exact type | Default | What it decides |
| ---- | ---------- | ------- | --------------- |
| `html` | `string` | none | The trusted rich-text limitation rendered through `Prose`. A blank value is invalid at runtime. |

`surface`, tone, severity, size, colour, padding, gap, radius, height, width, heading, icon,
attribution, actions, `children`, `className`, `style`, `id` and arbitrary DOM attributes are not
props. The nearest `Section` owns the surface; the parent owns placement and the seam from the
claim; one content meaning owns the treatment; and the closed string seam prevents a caller from
putting a control, nested landmark or unrelated block into the note.

There are no valid prop combinations beyond one non-blank `html` string. Omitting `html`, passing a
React node, or passing a second content slot must be a compile error. TypeScript cannot know whether
an HTML string is blank or contains a heading; the content seam guarantees the permitted schema,
and runtime handles only the blank-string failure without sniffing tags or sentence count.

## 4 · Variants × sizes

| Treatment | md — the only size | Intended context |
| --------- | ------------------ | ---------------- |
| `scope` — the only treatment, with no public prop | supported | Immediately after the claim it limits, whether the parent calls that position child or Note. |

One tone and one size are deliberate. The content uses body-small type at every width; there is no
free size prop and no responsive role swap. A warning, error, success, info and branded emphasis
were considered and rejected because none exists in 129 content files. A quotation treatment was
rejected because it raises the note into evidence or voice. A leading-rule treatment was considered
and rejected in the recommended decision: the smaller role, quieter ink and trailing position
already establish the boundary, while adding the existing quote motif would make it look like a
second kind of quotation.

## 5 · States

Callout itself has only rest. It is not clickable, selectable, expandable, dismissible, disabled or
asynchronous, so it has no hover, focus, pressed, held, disabled or expanded tokens. Trusted inline
links inside `html` retain Prose's existing rest, hover and keyboard behavior; those states belong
to Prose and are not forceable through Callout props.

There is no state conveyed only by colour. Rendering or omitting invalid content happens before
interaction and moves no focus.

## 6 · Per-surface colour

The component introduces one surface-dependent token. Ratios are measured against the exact
`Section` ground. All are normal text and therefore clear 4.5:1.

| Token / part | paper · `--color-paper` | tint · `--color-paper-deep` | ink · `--color-neutral-950` | blue · `--color-brandeis-500` |
| ------------ | ----------------------- | -------------------------- | ----------------------------- | ------------------------------- |
| `--call-content-ink` · content | `--color-neutral-600` · 4.92:1 | `--color-neutral-700` · 7.27:1 | `--color-neutral-400` · 8.05:1 | `--color-brandeis-100` · 4.91:1 |

**Paper.** Neutral-600 is the quietest neutral that still clears normal-text AA on paper. It steps
down from the surrounding Prose body without becoming disabled-looking or borrowing blue's link
meaning.

**Tint.** Neutral-700 replaces paper's neutral-600 because the latter is only 4.39:1 on
paper-deep. The deeper step preserves the quiet role and restores a comfortable text floor without
painting a corrective panel behind it.

**Ink.** Neutral-400 gives the note less emphasis than the surrounding light body ink while
remaining 8.05:1 against neutral-950. Darker here would mean lower contrast, so quietness comes from
the middle neutral ramp rather than an arbitrary opacity.

**Blue.** Brandeis-100 stays within the surface family and clears 4.91:1. White would compete with
the claim; a darker blue would disappear into the ground; a grey note would look like an accidental
neutral pasted onto a brand band.

Every surface block redeclares `--call-content-ink`, even where a value could have been inherited.
A tint section nested in ink therefore resolves neutral-700 from its own nearest surface rather
than inheriting neutral-400 from the enclosing band. Prose independently resolves link and inline
mark tokens from the same nearest scope; the nested specimen prints `--prose-link-ink`,
`--prose-link-ink-hover` and `--prose-link-rule` beside the Callout token. Callout never aliases or
reads those Prose tokens.

## 7 · Geometry & spacing

### (a) Distances

- Claim-to-Callout: the containing `Layout rowGap="block"`; this relationship belongs to the
  parent because the claim is not a Callout child.
- Paragraph-to-paragraph inside the trusted field: Prose's existing `--gap-text` flow rule.
- Root-to-content: none. There is one child and therefore no internal seam to size.
- Callout-to-following-content: the containing layout's next declared gap; Callout contributes no
  outer margin.

### (b) Component sizes

- Inline size: full available parent width, capped by the content's existing `--measure-body`.
- Narrow stress reference: `--lay-track-xs`, 192px, because it is the smallest existing layout
  track and one or two body-small sentences must wrap there without widening the page.
- Minimum inline size: none beyond zero. This is text, not a control or media object; imposing a
  hard floor would create overflow in a parent narrower than 192px.

### (c) Optical corrections

None. There is no glyph, border, underline owned by Callout, or control box whose optical alignment
needs the space ramp.

Radius: none. Border width: none. Shadow: none. Z-layer: none. The absence is the design: nothing
is bounded, elevated or stacked, so component tokens that merely rename zero-radius, no-shadow or
base-layer primitives would add names without adding meaning.

## 8 · Typography

| Part | Type role | Tracking | Measure | Case |
| ---- | --------- | -------- | ------- | ---- |
| content | `--text-body-sm` | none — this role has no tracking companion | `--measure-body` | authored sentence case; no transform |

The one- and two-sentence examples retain the same role. Length never chooses typography and no
line is clamped. Prose continues to own inline emphasis and links, but the field schema excludes
headings, lists, blockquotes, figures, tables and code panels: those are different blocks, not
scope-note typography.

Example: “A small qualitative study can expose a serious problem. It cannot estimate how common
the problem is.”

## 9 · Responsive

At 1023, nothing changes in Callout. At 767, nothing changes in Callout. The existing body-small
composite may re-resolve from the shared type layer if that role changes globally; Callout does not
select a new role, change a gap or add a breakpoint of its own. The gap scale does not shift
responsively.

Callout owns no touch target. An inline link remains Prose's anchor and keeps Prose's existing
keyboard, pointer and underline treatment; Callout does not wrap or extend it with another target.

## 10 · Composition

```tsx
<Layout rowGap="block">
  <Prose html={claimHtml} />
  <Callout html={scopeHtml} />
</Layout>

// Inside Callout: one semantic wrapper, one existing primitive, no arrangement axis.
<div role="note">
  <Prose html={html} />
</div>
```

The parent `Layout` owns the claim-to-note relationship. Callout has one child, so introducing an
internal `Layout` would pretend there is an axis or gap that does not exist. There is no hand-rolled
grid or flex, no margin on a child, and no override of Section's content column or ground. A future
`ContentSection` may expose a `note: ReactNode` slot, but it passes `<Callout>` through that seam and
does not import the sibling pattern.

## 11 · Accessibility

The root uses `role="note"`, the ARIA semantic for parenthetic or ancillary content, rather than an
`aside` landmark. That lets a screen reader identify the boundary without adding up to three
unlabelled complementary landmarks on `/services/product-design`. Prose writes the content markup.
There is no visible or hidden heading and no fixed accessible label that would repeat across notes.

| Key / input | Callout root | Inline Prose link | Focus after action |
| ----------- | ------------ | ----------------- | ------------------ |
| `Tab` | Not focusable; skipped. | Moves to the link in document order. | The link. |
| `Shift+Tab` | Not focusable; skipped. | Moves to the previous focusable element. | The previous element. |
| `Enter` | Unbound. | Navigates to the link destination. | Browser navigation behavior. |
| `Space` | Unbound; normal page scrolling. | Unbound for an anchor; normal page scrolling. | Unchanged. |
| pointer click | No behavior. | Navigates to the link destination. | Browser navigation behavior. |
| `Escape` | Unbound; this is not a disclosure or dialog. | Unbound. | Unchanged. |
| Arrow/Home/End | Unbound; this is not a composite widget. | Browser/page behavior only. | Unchanged. |

Callout authors `role="note"` and no other ARIA. It accepts no ARIA prop, generates no id and owns
no idref, `aria-controls`, `aria-labelledby`, `aria-describedby`, live region or focus management.
There is therefore no missing target when blank content renders nothing. Prose inline links retain
their existing focus-visible behavior; Callout owns no focus ring.

Content contrast is at least 4.5:1 on every surface. Reduced motion changes nothing because
Callout has no motion; delegated links keep Prose's existing behavior. A screen reader encounters:
“Note. A small qualitative study can expose a serious problem. It cannot estimate how common the
problem is.” Exact role phrasing is user-agent dependent, but the note semantic and full text remain.

## 12 · Content edge cases

| Case | Required handling |
| ---- | ----------------- |
| Longest realistic string | Render the real two-sentence qualitative-study example in full at body-small, without clamp, ellipsis or role change. |
| One long unbroken token | A URL in trusted inline content wraps anywhere inside the content measure and never widens the page. |
| Zero items | A whitespace-only `html` value warns in development and renders `null`, leaving no empty root or parent-owned seam around a hidden node. |
| One item | One Callout renders one note immediately after its claim; there is no collection wrapper. |
| Many items (2× expected) | A parent may compose twenty Callouts, or four sentences may arrive in one trusted field. Render all authored content and warn only on a blank field; do not truncate, paginate or infer sentence boundaries. |
| Missing image or missing optional slot | There is no image or optional slot. No placeholder, icon, heading or empty action row renders. |
| Empty required-ish text | Whitespace-only `html` is invalid at runtime: warn in development and render `null`. Do not substitute fallback copy. |
| Narrow track at 767 | The same body-small role and content measure wrap naturally; no gap or type-role swap. |
| Parent that does not size it | The root requests full available inline size with a zero automatic minimum. In a wrapping `Cluster` it takes a row rather than collapsing to its shortest word. No hard minimum is needed because all content can wrap; prove it at the existing 192px xs track and below. |
| Logical properties rather than left/right | Inline and block sizing are logical. No left/right edge exists, so RTL needs no mirrored decoration and preserves authored sentence order. |
| Surface nested inside a different one | The nearest surface redeclares the Callout ink and Prose independently resolves its inline-link palette there. No intervening ground is painted. |
| Two components adjacent | Each root has no margin, panel or separator. The parent supplies the intended gap; a zero-gap stress harness still leaves two semantic notes rather than fusing their DOM. |
| Interactive content inside a slot | Trusted HTML may contain inline links and inline emphasis through Prose. Forms, buttons, headings, nested landmarks and arbitrary React children are outside the content schema and API. |

## 13 · Motion

None on Callout. The root and content do not transition, transform, translate, rotate, scale, wipe,
fade, animate height, change opacity or reveal progressively. There is no reduced-motion query
because there is nothing to disable. Prose links retain their current instantaneous state changes;
Callout adds no duration or easing token.

## 14 · Do's and Don'ts

**Do**

1. Route a scope limitation to `Callout` at the content seam and inspect the rendered root for
   `role="note"`.
2. Place Callout after the claim it limits in a parent `Layout rowGap="block"`; inspect the parent,
   not the Callout stylesheet, for that seam.
3. Render the same real two-sentence example on paper, tint, ink and blue and inspect one resolved
   `--call-content-ink` value from the nearest surface each time.
4. Pass trusted, sanitised HTML and inspect that it renders through one real `Prose` root.
5. Render a Prose inline link and verify its underline, hover and keyboard focus remain Prose-owned.
6. Render whitespace-only content in development and verify there is a warning and no Callout root.

**Don't**

7. Do not add `warning`, `error`, `success`, `info`, `tone`, `severity` or `size` props; inspect the
   public type and expect only `html`.
8. Do not add a heading, icon, mark, quote glyph, attribution or action; inspect the rendered tree
   and component imports.
9. Do not paint a background, four-sided edge, leading rule, radius or shadow; inspect computed
   style and the module diff.
10. Do not render the note at Prose's quote role or inside a `blockquote`; inspect the DOM and
    computed font role.
11. Do not sniff tags, punctuation or sentence count to decide whether content is a Callout; search
    the implementation for parsing or regular expressions and expect none.
12. Do not import Callout into a future `ContentSection`; the caller passes it through a ReactNode
    slot, which is testable from the import graph.
13. Do not use margins, a local grid/flex arrangement or a responsive gap/type override; search the
    module and rendered styles and expect none.
14. Do not attach focus, click, dismissal or expansion behavior to the note root; it has no tab stop
    and no state attribute beyond its fixed semantic role.

## 15 · Specimen plan — `/design/callout`

The exact block list, in order:

1. **Identity.** A realistic claim in Prose followed by the real composite-product Callout,
   annotated as a boundary rather than warning, quotation or caption.
2. **Treatment × size matrix.** The one scope treatment at the one md size, once with one sentence
   and once with two; print the resolved body-small role.
3. **Routing comparison.** Ordinary Prose blockquote, Callout note and attributed Proof rendered as
   three separate real components with an annotation naming the content-seam test. The page
   composes the siblings; Callout imports neither pattern.
4. **Rich inline content.** Emphasis, strong text and one inline Prose link inside a two-paragraph
   note; headings, lists, nested blockquotes and controls are printed as rejected schema.
5. **All four surfaces as sibling bands with identical markup.** Each uses the qualitative-study
   example, prints the matching section 6 rationale and the resolved Callout ink value.
6. **Nested surfaces.** Tint inside ink and ink inside paper, with identical markup and resolved
   Callout plus relevant Prose link tokens listed.
7. **States are delegated.** Rest annotation plus instructions to point and Tab to the inline Prose
   link. Hover, pressed and keyboard focus have no Callout props and cannot be forced.
8. **Placement equivalence.** The same Callout after a child-flow claim and in a labelled future
   Note-slot harness; both render identically because placement is the parent's concern.
9. **Long and invalid content.** Longest two-sentence case, one unbroken URL, four-sentence 2×
   stress, blank HTML with no root and twenty parent-composed instances.
10. **Narrow and unsized parents.** The real two-sentence note at 320px, 256px and the existing
    192px xs track, then in a wrapping `Cluster`; no horizontal page overflow or intrinsic collapse.
11. **Two adjacent Callouts.** Production block gap followed by a zero-gap stress harness, proving
    the roots paint no joining ground or separator.
12. **Semantics and focus order.** Print `role="note"`, one Prose root, no generated ids and no root
    tab stop; include two inline links to verify ordinary document order.
13. **Negative provisions.** A text-only annotation confirms no heading, mark, icon, attribution,
    severity, dismissal or ground exists; no placeholder renders.
14. **What a static page cannot force.** Manual instructions for Prose-link hover, held pointer,
    Tab focus, 1023/767 widths and reduced motion.

The squint test reads as three ideas: a full-weight claim followed by a smaller scope boundary, a
three-way semantic routing comparison, and a quiet repeated rhythm across surfaces. No sequence of
filled rectangles is introduced to manufacture variety.

## 16 · New token requests

**None — every value in this spec is an existing token.**

`--call-content-ink` is the expected component-layer declaration mapping existing ramp values on
four surfaces, not a new primitive or usage token. Body-small, body measure, parent gap and xs
stress track already exist. No new glyph, gap step, type role, radius, shadow, rule, z-layer or
motion mechanism is requested.

## 17 · Open questions

**1 · Component identity — resolved.**

- **(a) One new Tier 2 `Callout` pattern wrapping Prose.** The content seam gains a semantic note
  record; Callout fixes the quiet treatment and `role="note"`; Prose remains the general body flow.
- **(b) Add a Callout role or quiet variant to `Prose`.** This avoids a folder but lets arbitrary
  rich text opt into a smaller treatment without encoding why, and Prose would need to own note
  semantics it does not currently have.
- **(c) Use the existing Prose blockquote unchanged.** This adds no code, but renders a scope
  limitation as prominent quotation typography with a quote rule and preserves no typed
  distinction between ordinary quotation and boundary note.

**Owner decision — accepted 24 August 2026: (a), one new Tier 2 `Callout` pattern.** The content
model already maps block discriminants one-to-one to patterns,
the meaning has ten real records, and the wrapper is the only option that makes semantic routing
testable without broadening Prose. The Tier is 2, not the brief table's proposed 1, because it
composes a primitive.

**2 · Quiet treatment — non-blocking; accepted as recommended 24 August 2026.** Options: smaller body role only; a leading rule at ordinary
body scale; or smaller role plus a rule. **Recommendation: smaller `--text-body-sm` with the quiet
surface ink, and no rule.** Position immediately after the claim completes the hierarchy. The rule
belongs to Prose quotations and would blur the routing distinction; both mechanisms would overstate
one or two sentences.

**3 · Semantics — non-blocking; accepted as recommended 24 August 2026.** Options: native `aside`; a neutral `div`; or `role="note"`.
**Recommendation: `role="note"`.** `aside` creates up to three complementary landmarks on one page
without a permitted heading to name them; `div` loses the boundary entirely. Note states the
parenthetic relationship without generated labels or ids.

**4 · Child slot versus future Note slot — non-blocking; accepted as recommended 24 August 2026.** Options: two renderings; or one Callout
passed through either parent position. **Recommendation: one rendering.** Both positions contain
the same record after the claim, and arrangement remains the parent's job. A future pattern accepts
the node through a sibling-safe ReactNode seam.

**5 · Rich-text API — non-blocking; accepted as recommended 24 August 2026.** Options: arbitrary React children; one trusted HTML string;
or one/two plain strings. **Recommendation: one trusted `html` string rendered through Prose.** It
meets the brief, keeps inline emphasis and links, and leaves sanitisation/schema enforcement at the
content seam. React children admit controls and headings; plain strings erase the stated rich-text
contract.

---

## Appendix · Self-audit

```text
STRUCTURE
[x] All 18 sections present, in order, with the exact headings.
[x] Front matter states Tier 2 pattern, Status implemented and token prefix --call-*; repository search
    finds no collision.
[x] Both Anatomy parts are accounted for: root carries semantics and sizing; content carries the
    sole colour and type decisions and delegates HTML flow to Prose.

NAMES
[x] Distinct existing token-name count: 16. Eight colour tokens: paper, paper-deep, neutral-950,
    brandeis-500, neutral-600, neutral-700, neutral-400, brandeis-100. Eight system/component
    names: text-body-sm, measure-body, gap-block, gap-text, lay-track-xs, prose-link-ink,
    prose-link-ink-hover and prose-link-rule. Every one resolves in the current vocabulary.
[x] Glyph count: 0.
[x] Layout prop/value names are existing unions: rowGap and block. Cluster is named only as the
    unsized-parent harness and receives no invented prop.
[x] Zero hex codes, rgb(), hsl(), Tailwind names, CSS declarations, selectors or media blocks.
[x] body-sm correctly has no tracking companion.
[x] Every layout distance is a gap-scale role.
[x] Space-ramp reaches: 0.
[x] Literal measurements are existing route breakpoints or the 192px xs stress track; none becomes
    a new implementation value.

COLOUR AND CONTRAST
[x] Colour table has 1 row × 4 complete cells; no delta and no blank.
[x] Every content colour is at least 4.5:1 on its exact ground: 4.92, 7.27, 8.05 and 4.91.
[x] Callout owns no focusable part; Prose owns inline-link states and focus treatment.
[x] There is no decoration row because Callout renders no decoration.
[x] One paragraph per surface explains the mapping; nested surfaces are specified.

STATES
[x] Callout claims only rest. Delegated link states remain with Prose.
[x] No Callout hover/pressed tokens exist, so the hover-versus-pressed requirement does not apply
    to its static parts.
[x] Excluded states have no tokens; no disabled opacity and no colour-only state.

LAYOUT, TYPE, SEMANTICS
[x] The only production relationship is the parent's Layout; Callout itself has one child and no
    invented axis.
[x] No child margin and no responsive gap/type-role swap.
[x] Content names the body measure.
[x] Callout owns no touch target; Prose owns inline links.
[x] role=note needs no authored ARIA idref, generated id or upward-walking selector.

COMPLETENESS
[x] All thirteen required content edge cases are answered.
[x] The unsized-parent row explains why no hard minimum is needed and names the 192px stress track.
[x] Do's and Don'ts name a type, DOM assertion, import graph, computed style or search.
[x] Specimen plan covers the one treatment/size, delegated states, all four surfaces, nested
    surfaces, every edge case, adjacent instances, routing/placement contexts and narrow tracks.
[x] Section 16 says None and explains why the component colour mapping is not a new request.
[x] Every open question has options, recommendation and recorded resolution; zero blockers remain.
[x] Squint test: claim/note hierarchy, semantic routing comparison and surface rhythm rather than
    one filled rectangle repeated.
```
