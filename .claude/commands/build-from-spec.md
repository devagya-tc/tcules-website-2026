---
description: Build a component, pattern or template from an approved spec, working through gates that stop rather than guess
argument-hint: docs/specs/<Component>.md — or paste the spec text
---

# Build from spec

The spec: **$ARGUMENTS**

If that is a path, read it. If it is pasted text, use it as given. If it is empty, ask for the spec
and stop — do not infer a component from the conversation.

`CLAUDE.md` is the law for everything below; read it now if it is not in context, along with
`src/styles/tokens/index.css`. The reference implementation is `src/components/Button/**` +
`src/styles/tokens/components/button.css` + `src/app/design/button/page.tsx`, and its spec is
`docs/specs/Button.md` — read the spec and the code side by side before you write anything. Match
their shape, their comment density and their argued reasoning, not just their syntax. That is about
1,150 lines of code plus a 700-line spec before you write your first file, and it is deliberate: the
comment density is the house style and cannot be inferred from the rules.

Work the gates in order. A gate means: **state the answer in one line, then stop if the gate says
stop.** Do not batch gates. Do not write a file before its gate has passed.

---

## GATE 0 — Is this spec even admissible?

Two checks, before you read the spec for content. Both are mechanical and both stop the build.

1. **`Status:` in the front matter must be `accepted`.** The vocabulary is `draft | accepted |
   implemented` and nothing else. If it says `draft`, stop and say so: a draft is a spec whose
   blocking questions have not been answered, and building it means building on a guess. Ask the
   owner to answer them inline and flip the line. If it says `implemented`, stop too, but for the
   opposite reason — this spec already has code. Ask whether you are adding a variant to what exists
   (then the spec moves back to `accepted` with the new decisions written in, and its BLOCKING marks
   become the gate again) or whether you were handed the wrong path.
2. **No open question may be marked BLOCKING and unanswered.** Read section 17 and list any that
   are. If there are none, say "no blocking questions".

Do not skip these because the spec looks complete. The reference spec that shaped this command was
`Status: draft` with an unanswered blocking question and read as perfectly buildable.

## GATE 1 — Restate the spec, and stop on any gap

Print this table and nothing else first:

| Question | The spec says |
|---|---|
| Name / what it is | |
| Tier claimed | |
| Token prefix | |
| Anatomy — the named parts | |
| Props, and the compile-error combinations | |
| Variant axes and members | |
| Sizes | |
| States | |
| Per-surface colour — complete, 4 columns? | |
| Geometry: distances / sizes / optical corrections | |
| Typography roles and tracking companions | |
| Responsive behaviour and the touch-target means | |
| Composition — which primitives, which gap steps | |
| Accessibility: keyboard, ARIA, where ids come from | |
| Content edge cases — all thirteen answered? | |
| Specimen plan | |
| New token requests | |

Then **stop and ask** if any of these is true. Do not guess, and do not "pick the nearest":

- a **distance** that is not one of the gap steps. Run `npm run design:brief` and read the gap
  table — `none` is a legal value on `Layout`/`Cluster` and means "these two share an edge", so it
  is not a gap violation. Say which value is wrong, and ask: new step, or the wrong step chosen?
- a **colour** that is not on a ramp in `src/styles/tokens/primitives.css`;
- a **type size or line height** that is not one of the `--text-*` roles, or a tracking companion
  paired with a role that has none. Do not trust a remembered count of the roles —
  `npm run design:brief` prints the live list and marks which have tracking;
- an **incomplete per-surface table** — a state given on paper only, or a value missing on `blue`;
- a **NEW TOKEN REQUEST** for a primitive or a usage token — a new ramp step, a new gap step, a new
  type role. These are system changes with a blast radius past this component. List them, say what
  each would be worth, and wait.
- a **selector that walks upward** — `:has()`, or a state the parent is expected to detect. There is
  no precedent for either. It needs to become a prop or a class the component emits.
- an **`aria-controls` / `aria-labelledby` / `aria-describedby` that names an element the spec
  conditionally renders.** A dangling idref is an accessibility defect that no check catches; the
  spec must say either that the target is always rendered, or what the attribute does when it is not.

A **NEW GLYPH REQUEST** is not a stop. A glyph is an asset, not a system change: add it to
`src/components/Icon/glyphs.ts` at Step 7. But read how the set is drawn first — the glyphs are
**solid shapes filled in `currentColor` with counters cut through the mass** (`fill-rule: evenodd`,
`stroke: none`). There is no stroke-width token. A glyph described in the spec as strokes or line
work must be redrawn as a filled shape, or it renders **nothing** and no check will tell you.

Grep before you claim something is missing:
`grep -n "<value>" src/styles/tokens/primitives.css`.

## GATE 2 — Tier, composition, and "is this a prop instead?"

Four answers, one line each. Stop for confirmation if any is a close call.

1. **Tier.** `src/components/**` (tier 1 — arranges nothing, knows nothing above it) /
   `src/patterns/**` (tier 2 — composes primitives into a block) / `src/templates/**` (tier 3 — a
   page shape). A card-like thing that composes primitives is a **pattern**, whatever the spec calls
   it. The tier decides the folder, the barrel, the `SPECIMENS` group and which
   `no-restricted-imports` group applies.
2. **Does it compose siblings in its own tier?** If a tier-1 component needs `Icon`, `Layout` or
   another primitive *inside* it, it cannot import them — lint fails on sideways imports, and there
   is no legal deep-path route either. Two legal answers: take the sibling as a `ReactNode` prop and
   let the caller compose it, exactly as `Button` takes `icon` rather than importing `Icon`; or it
   is not a primitive and belongs in `src/patterns/**`. Say which, before any file exists. This is
   the gate a rehearsal build walked straight past, producing a component that passed every
   automated check and violated the tier rule.
3. **Is a new folder right at all?** The alternatives, checked explicitly:
   - a new `emphasis` / `tone` / `size` / boolean on `Button`;
   - a glyph in `src/components/Icon/glyphs.ts`;
   - a `surface` or `density` on `Section`;
   - a `columns` / `rowGap` / `colGap` arrangement in `Layout` or `Cluster`;
   - a rule inside `Prose`;
   - a prop, variant or slot on an existing pattern.

   Per CLAUDE.md: "would every other instance want this same change? Does the component need a new
   prop, variant or slot to take it cleanly — and would it be better for having one?" The previous
   codebase answered "new folder" 111 times; that is what this gate exists to stop.
4. **The name and the token abbreviation.** Grep for a **collision**:
   `grep -rn -- "--<abbrev>-" src/styles/`, and check it against the taken list in
   `npm run design:brief`. Note the live precedent: the ramp is `--icon-size-*` and Icon's component
   layer is `--icn-*`, and `icon.css` argues why.

   Then grep for a **RESERVATION**, which is not the same thing and is the gate that has already
   been missed once:

   ```bash
   grep -rni '<name>' src/styles/tokens/components/ src/components src/patterns
   ```

   and read the header comments you hit. An existing layer may have already named your component
   and reserved its prefix — `footer.css`'s header says its `--foot-field-*` block "belongs in
   `src/components/Input` with its own `--inp-*` layer … when Input lands, this block moves here
   unchanged." A spec's designer cannot see that, so a spec will happily propose `TextField` and
   `--fld-*`; a rehearsal did exactly that and renamed 23 tokens after the fact. An empty collision
   grep is not evidence that nobody has planned this component.

## GATE 3 — The matrix, before any file

Write out, in the conversation:

- the **TS unions** the axes become;
- the **token list**: `--{abbrev}-{variant}-{part}-{state}`. `bg`/`fg` for a control,
  `ground`/`ink` for a surface — never mixed. A **state token only if the value moves on at least
  one surface**; once it is in the set, every surface declares it;
- **geometry** tokens (t-shirt names), and for anything reaching `--space-*` rather than the gap
  scale, why: an **optical correction** (the usual case, in the spec's own words), a **deliberate
  zero**, or **a technique's own geometry** — a visually-hidden clip box's 1px is none of the first
  two and an honest comment saying so is not a violation;
- the **class list the TSX will emit**.

Confirm the token count equals rows × 4 surfaces + geometry. If it does not, the matrix is wrong.

## STEP 4 — Token layer + its `@import`, in ONE edit

Create `src/styles/tokens/components/<component>.css` — named for the **component**, not the
abbreviation: `button.css` holds `--btn-*`, `section.css` holds `--sec-*`, `nav.css` holds
`--nav-*`. Add `@import 'components/<component>.css';` to `src/styles/tokens/index.css` **in the
same edit, before you write anything else.**

Why one edit: `tokens:check` collects definitions by globbing `src/styles/tokens/**`, so for a long
time an unregistered layer still counted as defined — every `var()` resolved in the check and
resolved to nothing in the browser. That hole is closed now (the check asserts registration), but
the reason to keep them together stands: the file and its cascade position are one decision.

Shape: the header comment (naming convention, the state model, why every surface restates every
token), geometry in `:root`, then `:root, [data-surface='paper']`, `[data-surface='tint']`,
`[data-surface='ink']`, `[data-surface='blue']`. Every surface block declares **every**
surface-dependent token — deltas-only fails the build. Where a colour is a contrast floor rather
than a preference, put the spec's measured ratio in a comment, as `button.css` does.

A component with genuinely no per-surface colour declares no surface blocks at all — `icon.css` and
`layout.css` are both in that position and both argue it in their header. Do not stub four empty
blocks to satisfy a shape.

## STEP 5 — TSX, then the module, in that order and in one pass

`src/<tier>/<Name>/<Name>.tsx` first: exported types, props with doc comments, `cx` from
`@/lib/cx`. The TSX is authoritative for the class list — `styles.foo` with no `.foo` is
`undefined` and `cx` drops it, and a selector nobody emits is a dead rule. Neither errors, so one
side has to be the source of truth.

Then `src/<tier>/<Name>/<Name>.module.css`. It states **no value of its own**: every colour,
distance, radius, duration and easing is a `var(--<abbrev>-*)`; type is `font: var(--text-*)` plus
`letter-spacing: var(--text-*-tracking)`. If rule order is load-bearing, say so in a comment.

Then `src/<tier>/<Name>/index.ts`, re-exporting the component and every exported type.

**`'use client'`**: needed only if the component holds state, an effect, a ref or a DOM event
handler. `SiteNav` is the only file in the tree that carries it — `SiteFooter` is deliberately a
server component, because it holds no state and reads no URL, so it ships no client bundle. A
presentational component must not carry it. If a component takes an `onChange`-style prop but holds no state itself, the
directive belongs to whatever owns the state — which is usually the page, including the specimen page.

## STEP 6 — Tier barrel

Add the export to `src/<tier>/index.ts`, **and add a sentence to that file's header comment** saying
what kind of thing this is — an arrangement primitive, a control, a mark, an exception. That comment
is curated prose that classifies the tier, not a generated list.

## STEP 7 — Design route + SPECIMENS, in ONE edit

`src/app/design/<kebab>/page.tsx`, rendering **every** arrangement: every variant × tone × size ×
state, on all four surfaces, plus disabled and any held state, plus the nested-surface band and the
edge cases from the spec's section 12. `src/app/design/button/page.tsx` is the standard to match,
including its honesty about what a static page cannot show — where hover, pressed and tab focus have
no props, say so on the page rather than showing five states and calling it six.

Reuse `../_specimen/Specimen`. **Before you use `specimenStyles`, list what it actually defines:**
`grep -oE "^\.[a-zA-Z]+" src/app/design/_specimen/specimen.module.css`. A `s.label` that does not
exist is `undefined`, renders unstyled, and passes every check — this exact mistake survived a full
rehearsal build with four green checks. If the specimen needs new scaffolding, add it to
`_specimen/` (the one sanctioned place a component may be defined under `src/app/design/**`) rather
than inventing a class name and hoping.

Then the `SPECIMENS` entry in `src/app/design/page.tsx` — right tier group, `{ href, name, note }`,
with a `note` that names the coverage. `npm run specimens:check` fails if you forget, and it matches
on `name`, so the name must equal the folder name.

**Then read the spec's § 14 do's and don'ts and check the page makes each one decidable.** They are
written to be settled by looking at a rendered page, so a Don't about behaviour in a narrow track
needs a narrow-track band to look at, and one about two instances adjacent needs two adjacent. If a
statement has nowhere on the page that decides it, add the block — a spec whose tests cannot be run
is a spec nobody runs.

## STEP 8 — Conditional edits

Only if they apply, and say which you are doing and why:

- `src/components/Icon/glyphs.ts` — a glyph the set does not have, drawn as a **filled** shape.
  Then **rasterise it and look at it**, because a stroke-described glyph renders nothing at all and
  no check can see an empty box:

  ```bash
  qlmanage -t -s 240 -o . /tmp/glyph.svg     # or any renderer; then read the image
  ```

  State the smallest counter's size in px at 16 and at 14 — `glyphs.ts`'s own header warns that "two
  marks that read alike at row size are worse than none", and arithmetic is not the same as looking;
- `src/lib/routes.ts` — the component needs a path (never a literal at a call site);
- `scripts/tokens-check.mjs` → `JS_INJECTED` — the component writes a custom property from an inline
  `style` object, as `Layout` does with `--tmpl-*`. Without the entry `tokens:check` fails; the entry
  must name the file that writes it;
- `src/styles/tokens/primitives.css` — **only** if a new ramp step or type role was approved at
  Gate 1, and a new size arrives with its paired line height in the same edit;
- `src/content/types.ts` + `src/content/sources/fixtures/*` — only when a *page* will consume it.

## STEP 9 — Self-review against the acceptance checklist

Go through all of these, numbered, one line each: `n. PASS` or `n. FAIL — file:line — what and
why`. Fix every FAIL, then re-run the list. An unnumbered "all good" is not a review.

**Tokens**
1. Every `--<abbrev>-*` the module reads is declared in `<abbrev>.css`, spelled identically.
2. `<abbrev>.css` is `@import`ed in `tokens/index.css`, after `primitives.css`.
3. All four surface blocks declare the identical token set — or the file has none at all, argued.
4. Every state token exists on all four surfaces; no state token exists whose value never moves.
5. `bg`/`fg` on controls, `ground`/`ink` on surfaces — never mixed.
6. Distances are gap-scale role names; component sizes are t-shirt names.
7. Every reach into `--space-*` carries a comment naming the optical correction it makes.
8. No token reads another component's prefix. Check the taken list from `npm run design:brief`, and
   strip comments before believing a grep — prose in this repo names other components constantly.
9. The rendered hover state differs from the rendered pressed state on all four surfaces. Where one
   token holds the same value in both, a comment names the part that carries the difference.

**Module CSS**
10. No hex, `rgb()`, `hsl()` or named colour. (`tokens:check` proves the **hex** case only — an
    `rgb()`, `hsl()` or colour keyword passes it, so that half is on your eye.)
11. No raw `px`/`rem` distance in a declaration. (`tokens:check` proves this for `*.module.css`;
    at-rule preludes and comments are exempt, and an `em`-relative font size is the one accepted
    case and needs a comment.)
12. No font family, weight, size or line height restated — `--text-*` composites only.
13. No `margin` for outer spacing. A margin inside the component's own box is legitimate as an
    optical correction and must carry a comment saying what it corrects.
14. No `display: grid` / `display: flex` for **arrangement**. A control laying out its own label and
    glyph is fine and must say so in a comment; arranging siblings is `Layout` / `Cluster`.
15. No override of `Section`'s content column or ground from outside.
16. `data-surface` is read, never written, unless this component owns a band.

**TSX**
17. No import from a higher tier, none from `@/content`, and none sideways within the tier. Lint
    proves all three now — but know the idiom rather than leaning on the rule: a sibling arrives as
    a `ReactNode` prop.
18. No new npm dependency. `cx` from `@/lib/cx` joins classes.
19. No inline `style` object for anything a class can express.
20. Every path comes from `@/lib/routes`.
21. Accessible name guaranteed by the type where the visual alone cannot carry it — the icon-only
    `Button` variant requiring `'aria-label': string` is the precedent.
22. Every ARIA idref points at an element that is always rendered, or the component does not emit
    the attribute when its target is absent.

**Wiring**
23. Folder `index.ts` and the tier barrel both export the component and every type; the barrel's
    header comment gained a sentence.
24. `src/app/design/<kebab>/page.tsx` renders every arrangement on all four surfaces, uses only
    classes `specimen.module.css` actually defines, defines no component the site could use, and the
    `SPECIMENS` entry is registered.
25. Every one of the spec's do's, don'ts and edge cases is either implemented or listed as
    deliberately deferred, with a reason.

## STEP 10 — Run the checks and paste real output

```bash
npm run verify
```

That chains `lint`, `typecheck`, `tokens:check`, `specimens:check` and `design:check`. Paste the
actual output. If it fails, fix and re-run — do not report a failure as a caveat.

If the component is interactive or carries any ARIA relationship, also run:

```bash
npm run build && npm run aria:check
```

It follows every `aria-controls` / `aria-labelledby` / `aria-describedby` / `for` in the rendered
output and fails on any that names an id nothing carries. It is not in `verify` because it needs a
build, and it is the only check that sees a broken ARIA graph — a rehearsal build shipped 95
dangling `aria-controls` on one specimen page with every other check green.

Then run the independent audit, which has no stake in your conclusions:

```
/audit-component <Name>
```

Know what none of it covers. Every one of these has passed a fully green build here: a child margin,
a hand-rolled arrangement, a restated font size, a token name that exists but is the wrong step, a
dangling ARIA idref, a class name that does not exist, and a composition that is one rectangle
repeated. Those need eyes.

## STEP 11 — Look at it in a browser

**If you cannot open a browser, say so explicitly in the Step 12 report** and hand over the list of
what is therefore unverified: the three stateless states (hover, pressed, `:focus-visible`) × four
surfaces × every size, plus anything behind a `(pointer: coarse)` or `prefers-reduced-motion` query.
A green `verify` is not a substitute for having looked, and a report that does not say which of the
two happened is the one that gets believed.

`npm run dev`, open `/design/<kebab>`, and on **each of the four surfaces**: hover it, hold the
pointer down, and tab to it. Those three states have no props by design, so no static render and no
script can assert them. Then apply CLAUDE.md's squint test to the specimen page itself: does it read
as more than one idea?

## STEP 12 — Report, and close the loop on the spec

- files created and edited, as a list;
- the tier decision, the composition decision and the "prop vs component" decision, one line each;
- **any migration the reservation grep at Gate 2.4 turned up, and whether you discharged it.** If a
  layer said its block moves here when this component lands and you did not move it, the repo now
  holds two implementations of one thing — which that layer's own comment calls wrong. Say so, say
  why (often the migration changes a *design*, not just a stylesheet, and needs its own decision),
  and say who owns the follow-up;
- any new token or glyph that was approved, and what it cost;
- anything in the spec that is not implemented, and why;
- `npm run verify` and `/audit-component` verdicts.

Then **update the spec**: flip `Status: accepted` to `Status: implemented`, add the path of the
implementation under the front matter, and record any decision the build had to make that the spec
did not — with the reason. A spec that stops matching the code stops being read, and then the next
person re-litigates every argued value in it.

**A divergence goes in the section it contradicts, not only in a change log at the top.** § 14's
do's and don'ts are written as greps a reviewer will actually run, and § 10 makes promises about
what the module contains. If the build had to break one — a `display: flex` the component genuinely
needs to lay out its own inside, an `opacity: 1` pinning a UA default — then edit that line, in
place, with the argument. A rehearsal recorded two such divergences faithfully in a new front
section and still failed its own § 14 greps, which is the single most likely thing to come back.

---

## FORBIDDEN — these are the known failure modes, not style preferences

1. Building from a `draft` spec, or one with an unanswered BLOCKING question.
2. A hex, `rgb()`/`hsl()`, named colour, or raw `px`/`rem` literal in a `*.module.css`.
3. A plausible-but-wrong token name. Grep the name before you use it; a wrong-but-existing name
   renders perfectly and no check can see it.
4. A surface block carrying only the deltas from paper.
5. A state token declared on some surfaces and not others.
6. A margin on a child, for outer spacing. The container owns the gap.
7. A hand-rolled `display: grid` / `display: flex` for arrangement.
8. An import from a higher tier, sideways within a tier, or from `@/content` in a component,
   pattern or template.
9. A component reading another component's tokens.
10. Restating a font size, weight, family or line height instead of a `--text-*` composite.
11. Adding an npm dependency — runtime deps are `next`, `react`, `react-dom`, and a fourth needs a
    reason from the owner, not from you.
12. Defining a component the site could use inside `src/app/design/**`. `_specimen/` is the one
    sanctioned exception and it is for the harness, never the thing under test.
13. Using a `specimenStyles` class without checking that it exists.
14. Skipping the `SPECIMENS` registration.
15. Guessing at a spec gap instead of stopping at Gate 1.
16. A glyph drawn as strokes. The set is solid; strokes render nothing.
17. Reporting a check as passed without pasting its output.
