# Component spec — the blank form

Copy this file to `docs/specs/<Component>.md` and fill it in. Eighteen sections, in this order,
with these headings.

Two companions, and they are not this file:

- **`docs/prompts/component-spec-brief.md`** explains what each section is for and what makes an
  answer acceptable. It is also the prompt pasted into Claude Design — run `npm run design:brief` to
  print it with the live token vocabulary spliced in. That file is the authority; this one is the
  form.
- **`docs/specs/Button.md`** is the worked example: a spec for a component this repo actually ships,
  so every value in it can be checked against the code next to it.

**A section with nothing to say says "None, and why."** An empty heading proves the question was
considered; a missing heading proves it was not. `/build-from-spec` restates all eighteen back at
you and stops on the ones that are missing.

**Status is a gate, not a label.** A spec stays `draft` until every BLOCKING question in section 17
is answered inline and the line is changed to `accepted`. `/build-from-spec` refuses to start on a
draft. After the build it becomes `implemented`, and it is updated to match what was actually built.

---

```markdown
# <Component>

## 0 · Front matter

| | |
|---|---|
| **Tier** | 1 primitive (`src/components/`) · 2 pattern (`src/patterns/`) · 3 template (`src/templates/`) |
| **Status** | draft \| accepted \| implemented |
| **Token prefix** | `--xxx-*` |
| **Designer / date** | |
| **Implements** | <which brief> |
| **Implemented at** | <paths, once built> |

## 1 · Identity
What it is. Which tier and why. What it is NOT — three things, each naming what does that instead.
The nearest existing component and why this is not a prop on it. How many appear on a page.

## 2 · Anatomy
Table of named parts. These names become the token `{part}` slot and the CSS class names. Which are
required, which optional, and every content slot.

## 3 · Props / API
Table: prop · exact literal union · default · what it decides. Then what is deliberately NOT a prop
and why — `surface` is always on that list, and so are colour, padding, gap, radius, height, width.
Then which prop combinations must be a compile error rather than a review comment.

## 4 · Variants × sizes
The matrix. T-shirt names for sizes, role names for variants. Which dimensions step with size and
which deliberately do not. Any variant considered and rejected.

## 5 · States
Which states from the fixed model apply, and the parts whose value moves in each. Any state
deliberately excluded, with the reason.

## 6 · Per-surface colour
One row per token, one column per surface — paper · tint · ink · blue. Every cell an existing
`--color-*` name; no cell blank, no "same as paper", no delta. A measured contrast ratio in every
cell that is an accessibility floor. Decoration marked "n/a — decoration". Then one paragraph per
surface saying what moved and why. Then the nested-surface case.

## 7 · Geometry & spacing
Three separate lists: (a) distances, by gap-scale role name; (b) component sizes, t-shirt named,
each measured against something; (c) optical corrections reaching `--space-*`, each with its
justification sentence. Then radius, border width, shadow, z-layer.

## 8 · Typography
Part → `--text-*` role → its tracking companion, or "none — this role has no tracking companion".
Measure for anything carrying running text. Case as a decision.

## 9 · Responsive
What changes at 1023 and 767, and what must not. Touch targets: 24×24 CSS px is the floor (WCAG 2.2
SC 2.5.8, AA; 44×44 is SC 2.5.5, AAA) and never the goal — state the number this component needs and
the argument for it, which of the two means gets there, and where targets sit near each other, that
no two intersect.

## 10 · Composition
A short JSX skeleton naming which primitive provides each arrangement and which gap step is on each
axis. Plus the restatement: no hand-rolled grid or flex, no margins on children, no overriding
Section from outside.

## 11 · Accessibility
Semantics and elements. A key-by-key keyboard table, including what is deliberately unbound. Focus
order and where focus goes after each state change. Every ARIA attribute and its value per state.
Where ids come from, and what an idref does when its target is not rendered. The focus ring.
Contrast floors. Reduced motion. What a screen reader says, as a quoted string.

## 12 · Content edge cases
Every row, each with its required handling: longest realistic string · one long unbroken token ·
zero items · one item · many items (2× expected) · missing image or optional slot · empty
required-ish text · the narrow track at 767 · a parent that does not size it (a wrapping row rather
than a grid track — name the minimum) · logical properties rather than left/right · this surface
nested inside a different one · two of this component adjacent · interactive content in a slot.

## 13 · Motion
Which properties transition, with duration and easing tokens. Then the explicit list of what does
not move. Reduced-motion behaviour.

## 14 · Do's and Don'ts
Testable statements only — each must be decidable from a rendered page or a diff.

## 15 · Specimen plan
The block list for `/design/<component>`: the full variant × size matrix; every state that can be
forced from outside; all four surfaces as sibling bands with identical markup; the nested-surface
band; every edge case above; two adjacent; the component in a narrow track. Note which states have
no props and must be pointed at, held or tabbed to.

## 16 · New token requests
The block form from the brief, or "None — every value in this spec is an existing token."

## 17 · Open questions
Numbered. Each with options, a recommendation, and a BLOCKING / non-blocking mark.

## Appendix — self-audit
The checklist from the brief, with every count filled in. Not a nineteenth section: sections 0-17 are
the spec, and this is the proof it was checked.
```
