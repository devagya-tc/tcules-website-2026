You are writing a **component specification** for the tcules.com design system. Another Claude,
working inside the repository, will implement it directly from your document. It will not ask you
follow-up questions, and it cannot see anything you did not write down.

Produce **prose and tables**. Do not produce CSS, and no implementation code beyond one short JSX
*skeleton* showing which layout primitive nests inside which. The one thing you must get exactly
right is the **names**: every colour, distance, type role, glyph and prop you name must appear
verbatim in that vocabulary.

## FIRST — specify only what does not already exist

If this project has the **Tcules component library** loaded — the real components on
`window.Tcules`, named under *What already exists* in the vocabulary document — then **compose your
mockup out of those real components** rather than describing them. Read that list rather than any
roster written into prose: components ship between briefs, and a name missing from a hand-kept list
is how a designer ends up specifying something that already exists.
They are the actual shipped code — correct on all four surfaces, correct in every state — so a mockup
built from them is already true, and anything you would write about how they behave is a worse copy
of something the implementer can just read.

Your spec then covers **only the part that does not exist yet**: the new component's own anatomy,
props, states, per-surface colour, geometry and edge cases. Where the new thing sits inside or
beside an existing one, say which existing component and which props — do not re-specify it.

Two consequences worth being deliberate about:

- **If the answer is "nothing new is needed",** say that and stop. A composition of existing
  components with existing props is not a spec, it is a page — and the most valuable outcome this
  document can have is establishing that no new component is required. The previous codebase grew
  111 bespoke section folders because nobody ever reached that conclusion.
- **If you cannot render the library** (no bundle in this project), the vocabulary document is all you
  have, and every prop union in it is exact. Work from it literally and mark anything you had to
  assume.

## BRIEF — the component to specify

```
COMPONENT NAME: PageHero

WHAT IT IS (one sentence): The opening block of every page — the single H1, an optional eyebrow,
one to six lead paragraphs, up to two actions, and on long-form pages an author-and-date line.

WHERE IT APPEARS (which pages, how many per page): All 129 routes, exactly once, always first.
Three arrangements at launch, by page family: Text-left on 100 pages (26 Service L3, 18 glossary
terms, 12 expertise, 8 company, 7 hubs, 7 tools, 6 audits, 6 indexes, 6 Service L2, 3 legal, home);
Article hero on 15 long reads (5 articles, 8 guides, 2 podcasts); Case-study hero on 14 case
studies.

CLOSEST THING THAT ALREADY EXISTS: Nothing. It is a Section holding a Layout holding a Cluster of
Buttons, but the ordering rules, the eyebrow, the author line and the image slot are the component.
Compose the mockup from the real Section / Layout / Cluster / Button / Prose.

REFERENCES (links, screenshots, described precedents): Real content — an audit hero carries the
eyebrow plus two actions; 13 of 14 case-study heroes are bare title and body; a case-study eyebrow
reads "ConnectX · AI-native building energy product"; /contact puts the form heading in the H1 and
a stat block inside the hero region.

HARD CONSTRAINTS (must / must not):
- MUST hold 1 to 6 body paragraphs. Measured: 1 on 34 pages, 2 on 58, 3 on 10, 4 on 25, 5 on 1,
  6 on 1. A hero built for one paragraph breaks on 95 pages.
- MUST take an author as a LIST, not a string. Two guides credit two people each. The two podcasts
  replace author with host and guest, and one has three guests.
- MUST take dates as a PAIR — published and modified — plus a reviewer field that is null on all 15
  long pages. Specify what renders when reviewer is absent, because today it always is.
- MUST take 0 actions (70 pages), 1 (33) or 2 (26).
- MUST tolerate a child block inside the hero region: /contact carries an H3 stat block there.
- MUST NOT put text over an image. Ruled out, and the reasons are settled: the scrim needed to keep
  a title legible over a product screenshot is a scrim heavy enough that the image stops earning its
  place; it fixes a minimum height regardless of title length; and it breaks when the image is
  missing. Use text-left-image-right, or text-above-image-below.
- MUST NOT be the place a second H1 can appear. One page, one H1, and the body never carries one.
- Eyebrow is a slot that switches on and off — present on 32 of 129 heroes. It is not a variant.

OPEN TO YOUR JUDGEMENT (what I have not decided):
- Whether Article hero and Case-study hero are two arrangements of one component or one arrangement
  with an author-line slot that switches to a client-name eyebrow. I lean to the second; argue me
  out of it if the anatomy comes out cleaner as two.
- How the eyebrow relates to Breadcrumbs, which sits directly above the hero on 128 pages. Two
  short labels stacked is the risk.
- Where the lead body's measure sits, given it must not collapse at six paragraphs.
- Whether the three text-only arrangements need any image provision at launch at all, given there
  are zero images in the corpus and Figure (brief 13) is not built.
```

## The system you are designing into

A Next.js site. CSS Modules — no Tailwind, no CSS-in-JS, no utility classes. A three-layer
custom-property token system: **primitives** (ramps and ladders), **usage** (one curated answer per
question — the gap scale and the type roles), **components** (what a value means for one component,
re-declared once per surface).

**Colour has no shared usage layer, and that is deliberate.** What a colour means depends entirely
on the surface under it: `--color-brandeis-50` is a hover tint on paper and invisible on a tint
ground; blue as text fails on an ink ground and has to lift several steps. A shared
`--color-bg-hover` would be wrong three times out of four. So **you specify colour per surface, per
token, four times over.** That repetition is the design work, not a formatting chore — and a table
that carries only the deltas from paper is the one mistake that has already caused a measured
accessibility failure here (a tint panel nested inside an ink section rendered its text at 1.13:1,
and the button inside it lost its label, its link and its focus ring).

### The tier you are specifying into — decide this first

| Tier | Path | What lives there | Examples |
|---|---|---|---|
| 1 · primitive | `src/components/**` | arranges nothing above itself, knows nothing above itself | `Section`, `Layout`, `Cluster`, `Button`, `Icon`, `Logo`, `Prose` |
| 2 · pattern | `src/patterns/**` | a composed block — hero, content section, CTA, card | `SiteNav`, `SiteFooter` |
| 3 · template | `src/templates/**` | a whole page-type layout | none yet |

A **card is a pattern**, not a primitive: it composes primitives and it is a block on a page. A
control, a mark or an arrangement mechanism is a primitive. If a thing needs content shaped like a
CMS record, it is a pattern at the least.

**A primitive may not import another primitive, and a pattern may not import another pattern** —
lint fails the build on it. To compose a sibling, a component takes it as a `ReactNode` prop and
the caller passes it in: `Button` never imports `Icon`, it accepts `icon`. If your component needs
another component inside it, either say which prop hands it in, or specify it as the tier above.

### What you cannot assume exists

- **There is no `Heading` component.** Headings are bare `h1`–`h6`, styled by base rules. If your
  component needs an h2-level element at h3 scale, say so in Open Questions — do not invent `<H>`.
- **There is no image component and no `next/image` usage anywhere yet.** If your component holds
  an image, specify the aspect ratio, the crop behaviour and the empty state as an explicit open
  question, and expect it to need a decision before build.
- **`:has()` has no precedent in this codebase.** Neither does container-query syntax. A state that
  must reach a parent needs a class the component emits, not a selector that walks upward. Specify
  the state as a prop or a class, never as "the parent detects it".
- Assume modern CSS otherwise: custom properties, grid, flexbox, logical properties
  (`padding-inline`, `margin-block`), `:focus-visible`, `@media (prefers-reduced-motion)`.

### The content column, precisely

`Section` caps its content at **1240px** and the 32px gutter sits **outside** that cap. So a
three-up grid inside a section at full width has tracks of **392px**, not 413 — 1240 minus two
32px column gaps, divided by three. Measure your component against the track it will actually get,
and say which track you assumed.

### The vocabulary — read it from this project's guidelines

Every colour, distance, type role, glyph and prop union this system has is in **`vocabulary.md`**,
a guidelines document in this project. It is generated from the repository's token layer, the hex
values in it are exact, and it is the only place a token name may come from.

**If you cannot see it, stop and say so** rather than working from memory of a similar system. A
plausible-but-wrong token name renders perfectly and is wrong forever, and no build check catches
it.

### The state model is FIXED. Select from it; do not redesign it.

| State | Token suffix | Trigger |
|---|---|---|
| rest | *(none)* | base |
| hover | `-hover` | `:hover` |
| focus, keyboard | `-hover` **plus the ring** | `:focus-visible` — focus shows what hover shows |
| pressed | `-pressed` | `:active` |
| held: active / selected / current | `-pressed` | a prop-driven class |
| disabled | its own tokens | never `opacity` |
| expanded / open | `-expanded` | only if a value actually moves |

- **The rendered hover state and the rendered pressed state must differ on every surface.** If two
  parts make that true together — the fill moves and the label does not — the label's token may
  legitimately hold the same value in both, and your table says so in a note. What is forbidden is
  a component whose *whole appearance* is identical hovered and pressed.
- **A state token exists only if the value MOVES on at least one surface.** If a part's colour is
  identical at rest and pressed on all four, the token must not exist — its absence is the
  assertion that nothing changes.
- **Once a token is in the set, every surface declares it**, including the surfaces where it equals
  that surface's own rest value. A build check enforces this.
- **Disabled is exempt from the 4.5:1 floor.** Unavailable should look unavailable.
- **Loading and error are not in the model.** Nothing here is asynchronous and nothing fades. If
  the component needs one, that is a NEW MECHANISM REQUEST with its own argument, not a token.

### Layout rules you must respect and restate

1. **No hand-rolled grid or flex for arrangement.** If the primitives cannot express it, that is a
   conversation about the primitive, not a local grid. An `inline-flex` centring a label and a
   glyph inside one control box is not arrangement and is allowed — say so where you use it.
2. **Children never set their own outer spacing. No margins, ever.** The container owns the gap.
3. **Non-uniform rhythm comes from nesting**, not from a rhythm knob: tighten by grouping, loosen
   by separating.
4. **Never override `Section`'s content column or ground from outside** — no horizontal padding, no
   `max-width`, no background, no colour.
5. **A distance that is not one of the gap steps is a mistake or a new step.** Decide which. Never
   split the difference, and never write "20" or "12" as a layout distance. Refer to a distance by
   its role name, never by its pixel value.
6. **The scale does not shift responsively.** The layout changes at a breakpoint; the distance does
   not. Never ask for a media query that swaps one step for another, and never ask for one that
   changes a type role — the title roles re-declare themselves at 1023px and 767px already.

### Contrast — measure it, and then trust your number

The hex values in the vocabulary are exact and are given so you can compute WCAG ratios. Do the
arithmetic and **state the number plainly**. Do not hedge it, do not write "approximately", and do
not defer it to the implementer as something to verify — a measured ratio in the spec is the reason
a colour choice survives review, and the implementer copies your number into a code comment so the
next person who wants to lighten that value has it in front of them.

Text and meaningful glyphs: **4.5:1 minimum**. Large text (24px+): 3:1. Focus ring against its own
gap colour: 3:1. Disabled: exempt, and marked as the deliberate exception.

### Design quality — the bar

A layout that repeats one shape down the page is a failure even when every piece is correct. Clean
does not mean plain, and "not busy" is not an argument for "not designed".

- Visual weight comes from **scale, imagery and position** — not from decoration, borders, or a
  tinted background band.
- Vary the arrangement between blocks rather than the ground behind them.
- A secondary column that is only text is a missed opportunity; give every item a shape.
- If you squint at your composition, does it read as more than one idea? If every block is the same
  rectangle at the same size, it is not finished.

## What to produce

**One markdown file**, saved into the repo at `docs/specs/<Component>.md`. Eighteen sections, in
this order, with these headings. A section with nothing to say says **"None, and why"** — an empty
heading proves the question was considered; a missing one proves it was not.

```
0.  Front matter — Component · Tier (1 primitive / 2 pattern / 3 template) · Status: draft ·
    Token prefix --xxx-* · Designer + date · Which brief this implements
1.  Identity — what it is · tier and why · what it is NOT (three things, each naming what does
    do that instead) · nearest existing component and why this is not a prop on it · how many
    appear on a page
2.  Anatomy — a table of named parts. These names BECOME the token {part} slot and the CSS
    class names, so name them carefully. Which are required, which optional, and every
    content slot
3.  Props / API — a table: prop · exact literal union · default · what it decides. Then what is
    deliberately NOT a prop and why (surface is always on that list; so are colour, padding,
    gap, radius, height and width). Then which prop combinations must be a COMPILE error
    rather than a review comment
4.  Variants × sizes — a matrix. T-shirt names for sizes, role names for variants. Which
    dimensions step with size and which deliberately do not, and why. Any variant considered
    and rejected
5.  States — which states from the fixed model apply, the parts whose value moves in each, and
    any state deliberately excluded, with the reason
6.  Per-surface colour — ONE ROW PER TOKEN, ONE COLUMN PER SURFACE (paper · tint · ink · blue).
    Every cell an existing --color-* name. A measured contrast ratio in every cell that is an
    accessibility floor — text on its own ground, text on its own hover and pressed fills, the
    focus ring against its gap. Mark decoration "n/a — decoration"; never leave a cell blank,
    never write "same as paper". Then ONE PARAGRAPH PER SURFACE saying what moved and why —
    that prose becomes the comment above each surface block and it is the most valuable thing
    in the spec. Then the nested-surface case: this component's surface inside a different one
7.  Geometry & spacing — three SEPARATE lists. (a) distances, by gap-scale role name;
    (b) component sizes, t-shirt named, literal px allowed, each measured against something
    real; (c) optical corrections reaching the space ramp, each with its justification
    sentence in the required form below. Then radius, border width, shadow, z-layer
8.  Typography — part → --text-* role → its tracking companion, or "none — this role has no
    tracking companion". Measure for anything carrying running text. Case as a decision, with
    the example copy written in sentence case
9.  Responsive — what changes at 1023 and at 767, and what must NOT. Restate that the gap
    scale does not shift responsively. Touch targets: 24×24 CSS px is the FLOOR and never the
    goal (WCAG 2.2 SC 2.5.8, AA; 44×44 is SC 2.5.5, AAA). The number above it is this component's
    decision, argued from what it is and where it is tapped — a standalone control on a phone
    wants 44; a mark in a dense wrapping row wants the smallest target that stays unambiguous.
    State the number, state how it is reached (stepping the size up, or extending the hit area
    past the box so the row does not move), and where targets sit near each other, prove no two
    intersect
10. Composition — a short JSX skeleton naming which primitive provides each arrangement and
    which gap step is on each axis. Plus an explicit restatement of: no hand-rolled grid or
    flex, no margins on children, no overriding Section from outside
11. Accessibility — semantics and elements · a key-by-key keyboard table including what is
    deliberately unbound and why · focus order, and where focus goes after every state change ·
    every ARIA attribute and its value per state · WHERE IDS COME FROM, and what an
    `aria-controls` points at when the thing it names is not rendered · the focus ring
    (:focus-visible only) · contrast floors restated · reduced-motion behaviour · what a
    screen reader actually says, as a quoted string
12. Content edge cases — every one of these rows, each with its REQUIRED handling: longest
    realistic string · one long unbroken token (a URL) · zero items · one item · many items
    (2× expected) · missing image or missing optional slot · empty required-ish text · the
    narrow track at 767 · **a parent that does not size it** (a wrapping row rather than a
    grid track — say what stops it collapsing, and name the minimum) · logical properties
    rather than left/right · this component's surface nested inside a different one · two of
    this component adjacent · interactive content inside a slot
13. Motion — which properties transition, with the duration and easing token; then an explicit
    list of what does NOT move (no transform, no rotation, no fade, no height animation) and
    the reduced-motion behaviour
14. Do's and Don'ts — TESTABLE statements. Each must pass or fail on a rendered page or in a
    diff, so a reviewer can point at it. Not "keep it clean"
15. Specimen plan — the exact block list for the /design/<component> route: the full variant ×
    size matrix; every state that can be forced from outside, in labelled columns, plus a note
    that hover, pressed and tab focus have no props and must be pointed at, held and tabbed
    to; all four surfaces as sibling bands with IDENTICAL markup and a per-surface note; the
    nested-surface band; every edge case from section 12; two of the component adjacent; the
    component in a narrow track
16. New token requests — in the block form below, or "None — every value in this spec is an
    existing token"
17. Open questions — numbered, each with the options, your recommendation, and a BLOCKING or
    non-blocking mark. A BLOCKING question stops implementation until it is answered
```

### The optical-correction sentence, in this exact form

The implementer copies it into a code comment, so it has to stand alone:

> optical, not `--gap-tight`: this corrects <the specific optical error> measured against <the
> specific thing>, so the day the gap scale is re-tuned this must not move.

A reach into the space ramp with no such sentence will be read as a layout distance in disguise and
sent back.

### NEW TOKEN REQUEST — the mechanism, and why it is strict

The build has a check that catches a custom property nothing defines. It **cannot** catch a name
that exists but is wrong: `--color-neutral-800` where you meant 700 renders perfectly and is wrong
forever. A plausible-but-wrong token name is the single most damaging thing you can put in this
document — worse than an omission, because an omission gets a question and a wrong name gets built.

So: **never write a token name that is not in the vocabulary.** When a value genuinely does not
exist, stop and write a block in section 16 in exactly this form:

```
NEW TOKEN REQUEST
Name:         --<proposed-name>
Layer:        1 primitive | 2 usage | 3 component
Value:        <the exact value>
Why nothing existing works:  <which existing token was closest, and precisely what is wrong with
              it — a measured contrast number, a specific optical error>
Blast radius: <what else in the system would want this, and what breaks if it changes>
```

- A **new gap step** must argue that the distance is a tenth *relationship*, not a tenth number.
  "24 is too tight and 32 is too loose" is splitting the difference, which is forbidden.
- A **new colour** gives the ramp and the step, and its measured contrast on every surface it will
  appear on.
- A **new glyph** uses the same block, names the glyph, and describes a FILLED drawing — a solid
  shape on the 24 box, counters cut through the mass. A glyph described as strokes renders nothing.
- A **new mechanism** (a loading state, an animation, a portal, a scroll behaviour) uses the same
  block and says what part of the system it changes.

## What NOT to do

- **No Tailwind class names.** None. Not `p-4`, not `flex`, not `text-neutral-900`.
- **No hex codes, `rgb()`, `hsl()`, colour names, or "a slightly darker blue".** Token names only.
  The hexes in the vocabulary exist so you can measure contrast, and for nothing else.
- **No px for a layout distance.** Distances are gap-scale role names. Pixels are legal only for a
  component size and for an optical correction that carries its justification sentence.
- **No CSS.** No selectors, no declarations, no `@media` blocks. Prose, tables, one JSX skeleton.
- **No invented brand colours, faces or scales.** Peridot never fills an action. Blue never appears
  on anything that is not clickable.
- **No colour-only state.** A state carried by colour alone is not a state — pair it with a glyph,
  a rule, a weight or an ARIA attribute.
- **No motion beyond colour and border**, with exactly one precedent: a *rule* may wipe in along
  its own axis — `Button`'s link underline goes `scaleX(0)` → `scaleX(1)` on the same 140ms as the
  colours, because a drawn underline can otherwise only appear all at once. Nothing else moves,
  scales, rotates or fades, and a second precedent needs asking for, not assuming.
- **No deltas-only surface table.** Four full columns, every row.
- **No "TBD" in place of a decision you can make.** Decide it, and put the alternative in Open
  Questions. Save "TBD" for what genuinely needs the client.

## SELF-AUDIT — run this before you hand the spec over, and print it at the end of the spec

If a line fails, fix the spec. Do not hand over a spec with a failing line and a note about it.

```
STRUCTURE
[ ] All 18 sections present, in order, with the exact headings.
[ ] Front matter states a tier, a Status, and a token prefix that collides with nothing in the
    taken list.
[ ] Every part named in Anatomy appears in the colour table, the geometry list, or both — or is
    explicitly marked as carrying no value of its own.

NAMES  (this is the section that matters most)
[ ] Count of distinct token names used: ____ . Every one appears verbatim in the vocabulary, or
    in a NEW TOKEN REQUEST. I checked them ONE AT A TIME, not by pattern.
[ ] Every glyph I named is in the glyph set, or is a NEW GLYPH REQUEST describing a filled shape.
[ ] Every prop and every prop VALUE I gave for Section, Layout or Cluster appears in the prop
    unions above.
[ ] Zero hex codes / rgb() / hsl() / colour words outside the contrast measurements.
[ ] Zero Tailwind class names. Zero CSS declarations, selectors or @media blocks.
[ ] Every --text-* role I paired with a tracking companion is on the list that has one.
[ ] Every layout distance is a gap-scale role name, referred to by name.
[ ] Every space-ramp reach carries its justification sentence in the required form. Count: ____ .
[ ] Every literal pixel value is a component size or a container cap, t-shirt named, and says
    what it was measured against. Count: ____ .

COLOUR AND CONTRAST
[ ] The colour table has one row per token and four columns: paper, tint, ink, blue.
[ ] No cell is empty, "same as paper", or a delta. Rows: ____ × 4 cells.
[ ] Every text colour has a measured ratio against the exact ground or fill it sits on —
    including the hover and pressed fills, not just the surface ground.
[ ] Every text ratio is ≥ 4.5:1, except disabled, marked as the deliberate exception.
[ ] The focus ring is measured against its own gap colour on every surface.
[ ] Decoration is marked "n/a — decoration" rather than left blank.
[ ] One paragraph per surface explains what moved and why.
[ ] The nested-surface case is addressed.

STATES
[ ] Every state I claim comes from the fixed model, with the repo's suffix.
[ ] The rendered hover state differs from the rendered pressed state on all four surfaces. Where
    one token holds the same value in both, a note says which other part carries the difference.
[ ] Every state token I introduced MOVES on at least one surface. Any that does not has been
    deleted, and its absence is stated as an assertion.
[ ] Every state token is declared on all four surfaces, including where it equals rest.
[ ] Disabled uses its own tokens and no opacity. No colour-only state.

LAYOUT, TYPE, SEMANTICS
[ ] Every arrangement is a Section, Layout or Cluster. colGap is stated wherever columns is set,
    and omitted where it is not.
[ ] No margin on any child, anywhere in the spec.
[ ] No media query changes a gap step or a type role.
[ ] Every part carrying running text names a measure.
[ ] Every interactive target clears 24×24 with no two targets intersecting, and the spec argues
    the number it chose rather than restating a default.
[ ] Every ARIA idref I specified points at an element that is ALWAYS rendered, or the spec says
    what the attribute does when that element is absent.
[ ] No selector walks upward; no `:has()`; every state a parent needs is a prop or a class.

COMPLETENESS
[ ] All thirteen content edge-case rows answered — none skipped, none "n/a" without a reason.
[ ] The "parent that does not size it" row names a minimum, or says why none is needed.
[ ] Do's and Don'ts are testable: I can name the grep, the rendered page or the diff that
    decides each one.
[ ] The specimen plan renders every variant × every size × all four surfaces, forces every
    printable state, includes the nested-surface band, and covers every edge case above.
[ ] Section 16 lists justified requests in the block form, or says "None".
[ ] Every open question has options, a recommendation, and a BLOCKING / non-blocking mark.
[ ] Squint test: this composition reads as more than one idea, and is not one rectangle repeated.
```

## After you hand it over

Save the spec to `docs/specs/<Component>.md` with `Status: draft`. It stays `draft` until the owner
answers every BLOCKING question — inline, in the spec — and changes the line to `Status: accepted`.
The build command refuses to start on a `draft`, and that refusal is the point: a spec with an
unanswered blocking question produces a component built on a guess.
