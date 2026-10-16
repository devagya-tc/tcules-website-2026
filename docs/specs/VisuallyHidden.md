# VisuallyHidden

## 0 · Front matter

| | |
|---|---|
| **Tier** | 1 primitive (`src/components/`) |
| **Status** | implemented |
| **Token prefix** | `--vhid-*` |
| **Designer / date** | Claude, 16 Oct 2026 (spec written after the build, critique 16 Oct 2026: the component skipped the contract step) |
| **Implements** | The listings redesign's archive count ("11 of 42" read as "11 of 42 articles match") and the audit entry in `docs/component-audit.md` § 3 |
| **Implemented at** | `src/components/VisuallyHidden/`, `src/styles/tokens/components/visually-hidden.css`, `/design/visually-hidden` |

## 1 · Identity
Words for a screen reader that take no room on screen: the one copy of the clip recipe. Tier 1
because it composes nothing and is needed by primitives and patterns alike (ListCard, Slider,
EnquiryForm, SiteFooter, Thread, Breadcrumbs, RatingBadge and the insights archive each wrote the
recipe by hand). It is NOT a skip link (focusable content needs its own visible-on-focus rule and is
refused here); NOT `aria-label` (which replaces an element's name rather than adding words in reading
order — use it on a control with no visible text); NOT `display: none` / `hidden` (which remove the
words from the accessibility tree, the opposite job). Any number per page, each a few words.

## 2 · Anatomy
| Part | Element | Required |
|---|---|---|
| hidden | `span` (default), `p` or `div` with `.hidden` | yes |
| children | text, or inline text-level nodes | yes |

## 3 · Props / API
| Prop | Type | Default | Decides |
|---|---|---|---|
| `as` | `'span' \| 'p' \| 'div'` | `'span'` | the element: `span` for words inside a line, `p` / `div` for a sentence of its own |
| `children` | `ReactNode` | — | what a screen reader reads |

Deliberately not props: `className` and `style` (it arranges nothing and paints nothing; a class could
only undo the clip), `id` (an idref target should be a visible element), any heading in the `as`
union (a heading the eye cannot see is an outline only one audience gets), `focusable` /
`tabIndex` (a focused element nobody can see is a keyboard trap). `surface` — it has no colour.

## 4 · Variants × sizes
None. One recipe. The element is the only choice, and it is semantic, not visual.

## 5 · States
None. It never receives focus and nothing in it responds to a pointer.

## 6 · Per-surface colour
None, and why: it paints nothing — the text is clipped to an empty box — so there is no colour to
declare and no surface block (the layout.css precedent). `tokens:check`'s self-containment rule has
nothing to check.

## 7 · Geometry & spacing
(a) Distances: none — it takes no room, so it separates nothing. (b) Component sizes:
`--vhid-size` (1px via `--space-1`), the clip box, the smallest box a screen reader will not skip
(some skip a zero-size node). (c) Optical corrections: none. No radius, border, shadow or z-layer.
`position: absolute`, `overflow: hidden`, `clip-path: inset(50%)`, `white-space: nowrap`. No margin:
the absolute box is already out of the flow.

## 8 · Typography
None: it inherits whatever role surrounds it, and nothing of it is seen.

## 9 · Responsive
Nothing changes at any width. Touch targets: n/a, never interactive.

## 10 · Composition
```tsx
<p className={styles.count}>
  11 of 42
  <VisuallyHidden> articles match the filters</VisuallyHidden>
</p>
```
Inline inside the element whose sentence it completes. Never wraps a focusable child, never a
heading, never a whole region.

## 11 · Accessibility
The words stay in the accessibility tree and in reading order, so they are read where they sit,
joined to the visible text around them: "11 of 42 articles match the filters". They must be true, and
must not repeat what is visible beside them. Not focusable; no ARIA of its own; no idref.

## 12 · Content edge cases
Longest realistic string: a short sentence; `nowrap` keeps it one reading line. Empty children:
renders an empty element (harmless, and visible in an audit). Inside a flex or grid row: absolute, so
it takes no track and adds no gap. Two adjacent: each is read in order. Interactive content in the
slot: refused by contract (see § 3) and flagged in review.

## 13 · Motion
None.

## 14 · Do's and Don'ts
- Do take this instead of writing the clip recipe in a module (`clip-path: inset(50%)` outside
  `VisuallyHidden.module.css` is a review finding for any component edited after 16 Oct 2026).
- Don't put a link, button or input inside it.
- Don't use it to hide a heading or a landmark's name.
- Don't repeat visible text in it.

## 15 · Specimen plan
`/design/visually-hidden`: `as="span"` inside a line, with the sentence a screen reader reads in the
caption; `as="p"` between two visible lines, proving no seam is added; a long phrase, proving
`nowrap` keeps it out of the layout.

## 16 · New token requests
`--vhid-size` in `tokens/components/visually-hidden.css`, registered in `tokens/index.css`.

## 17 · Open questions
None. Moving the remaining hand-written copies is not a question: each moves when its component is
next edited (ListCard moved 16 Oct 2026).

## Appendix — self-audit
Sections 0–17 present; 1 token, 0 surface blocks (no colour), 0 states, 0 open questions.
