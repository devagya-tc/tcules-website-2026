You are writing a **component specification** for the tcules.com design system. Another Claude,
working inside the repository, will implement it directly from your document. It will not ask you
follow-up questions, and it cannot see anything you did not write down.

Produce **prose and tables**. Do not produce CSS, and no implementation code beyond one short JSX
*skeleton* showing which layout primitive nests inside which. The one thing you must get exactly
right is the **names**: every colour, distance, type role, glyph and prop you name must appear
verbatim in that vocabulary.

## FIRST — specify only what does not already exist

If this project has the **Tcules component library** loaded (the twenty real components on
`window.Tcules`: `Section`, `Layout`, `Cluster`, `Input`, `Button`, `Icon`, `Logo`, `Prose`,
`SiteNav`, `SiteFooter`, `Breadcrumbs`, `PageHero`, `CtaSection`, `EnquiryForm`, `ListCard`,
`BlockCard`, `Accordion`, `Callout`, `Figure`, `Proof`), then **compose your mockup out of
those real components** rather than describing them.
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
COMPONENT NAME: Tag

TWO VARIANTS, AND THE SCOPE IS SETTLED. Three jobs were weighed; two are in, one is out, and the
reasons are recorded so none of it gets re-litigated in the spec.

(a) THE INERT MARK — the taxonomy label. Ten route modules render it today as bare `<li>` text.
    This is the one with a call site and a data source, and it is the reason the component exists.

(b) THE INTERACTIVE MARK — the filter chip. It ships today as `Button emphasis="ghost"
    tone="neutral" size="sm" active extendHitArea` rendered `as="a"` with an href that rewrites
    the query string (`src/app/insights/page.tsx` lines 197–241), and it moves to this component.
    So Tag carries an interactive variant with the full state model and an `as="a"` case, and the
    insights filter rows change shape when it lands. It does NOT carry the 44px touch target — see
    the touch-target constraint for why neither means of reaching 44 is available to a wrapping
    row. It is a control and
    it is allowed to behave like one; what it may not do is wear any of the three rest signatures
    named in the third hard constraint, or be mistakable for the inert mark beside it.

(c) THE STATUS BADGE IS OUT OF SCOPE. Not deferred vaguely — out, with the reason on the record.
    `src/content/types.ts` was searched end to end for `status`, `state`, `isNew`, `upcoming`,
    `comingSoon`, `available`, `live` and `badge`: there is no such field on any page type.
    `EventPage` carries `details`, `tags`, `categories` and `publishedAt` and no notion of whether
    the event has happened. Nothing in the corpus says "New" or "Coming soon" about anything.
    Semantic colour barely exists either — `--color-danger-{100,300,600}` and
    `--color-success-500` are the whole set, and both appear only in `input.css` and
    `enquiry-form.css`, which is to say: this system has never used a colour to mean a state
    outside form validation. The component gets extended when a content field exists to feed it.
    Until then: do not specify a status variant, do not leave a slot or a `tone` prop for one, and
    do not invent a colour ramp.

WHAT IT IS (one sentence): The site's small label mark — one word to a short phrase, sitting in a
row of its siblings, either naming what a page is filed under or offering a filter the reader can
apply.

WHERE IT APPEARS (which pages, how many per page): Two rows, in two places, and they never appear
in the same band.

**The inert row** — one per page, near the top, inside `PageHero`'s children slot; between roughly
three and eight marks. Ten site route modules render it today, covering most of the 129-page
corpus: `services/[...slug]` (32 pages), `insights/[...slug]` plus `insights/events/[slug]` and
`insights/podcasts/[slug]` (21), `glossary/[slug]` (18), `case-studies/[slug]` (14),
`expertise/[slug]` (12), `audits/[slug]` (6), `services/page.tsx` (the services index) and
`how-we-work/page.tsx` (1 each). The tool pages, the legal pages, the home page and every other
index render no row — `tools/[slug]` and `audits/[slug]` both carry a second `Cluster` that looks
identical in the source and is the hand-rolled "On this page" band, which is brief 19's territory
and not this one's.

Every inert row is optional per entry and an empty one renders nothing, so treat those counts as
the ceiling rather than the census — the strings are authored per record in Strapi and cannot be
counted from the repository.

**The interactive row** — exactly one page today, `src/app/insights/page.tsx`, and three rows on
it: one per filter group, each in its own `Layout` column under an `h3` group label, each row
opening with an "All" chip and then one chip per option. Single-select per group, driven by the
query string. That page is a client component already, so nothing new is needed to make a chip
navigate.

**And they meet on one page.** The insights route carries filter chips in its resources band and
`BlockCard` eyebrows carrying taxonomy above them. That page is the specimen that decides whether
this component works.

Two shapes feed the inert mark, which is the fact that makes it one variant rather than two:
- **Free text.** `hero.tags: string[]` on `AuditPage` (which `HowWeWorkPage` extends),
  `ServicePage`, `ExpertisePage` and `GlossaryPage`, plus `hero.labels: string[]` on
  `ServicesMasterPage` — the same thing under a second name. All of it is mapped at the seam from
  a Strapi repeatable component whose only field is `listText` (`sources/strapi/glossary.ts:576`,
  and the same three lines in the sibling mappers). Unbounded, uncontrolled, sentence case,
  authored by whoever wrote the page.
- **Taxonomy records.** `InsightTaxonomy { documentId, name, slug? }` and the case-study
  `categories` / `tags` arrays. A controlled vocabulary, and the only one with a `slug`.

The inert variant takes a string and renders a mark. It never learns which of the two it came
from.

CLOSEST THING THAT ALREADY EXISTS: **for the inert mark, nothing — and the absence is visible in
ten files.** Every one of them writes the same six lines:

    <Cluster as="ul" colGap="text" rowGap="tight">
      {tags.map((tag) => <li key={tag}>{tag}</li>)}
    </Cluster>

`src/app/glossary/[slug]/page.tsx:315`, `case-studies/[slug]/page.tsx:246`,
`audits/[slug]/page.tsx:299`, `insights/[...slug]/page.tsx:294`, and six more. An unstyled `li`
inherits body type, so the row renders as a line of ordinary sentences separated by 16px of
nothing. It is not wrong so much as absent. **That row is what this component fills, and it is the
mark that is missing, not the row** — see the first hard constraint.

**For the interactive mark, a working control** — the ghost Button described in (b). Read what it
already gets right before replacing it: a held-selected state via `active`, `aria-current` on the
selected option, a focus ring, and four correct surfaces. Whatever Tag does instead keeps all of
those. The one thing it deliberately does not inherit is `extendHitArea` — see the touch-target
constraint. The reason to move it is
not that the Button is broken; it is that a filter chip and a taxonomy label are the same object
to a reader and should be one component with two variants rather than a control borrowed for a job
it was not named for.

Elsewhere the same data is flattened rather than marked: `insights/page.tsx:255` joins category
names into `BlockCard`'s `eyebrow` with `' · '`, and `insights/[...slug]/page.tsx:331` does it
again for related-resource cards. Card metadata is explicitly OUT of scope — do not specify a
`BlockCard` slot, and do not specify the format marker ("Article", "Podcast", "Event") that shares
that string. Those are a `BlockCard` conversation for later.

Two things worth ruling out by name, with the reason:
- `Prose`'s `<mark>` — `--prose-mark-bg: --color-peridot-300` on `--prose-mark-ink:
  --color-neutral-950`, identical on all four surfaces. The system's one existing precedent for a
  small mark that carries its own ground everywhere, and worth reading before deciding what a
  tag's ground is. Not a candidate: mark means "this phrase, highlighted in running text".
- The footer rating badge — `--foot-badge-radius: 999px`, `--foot-badge-padding-inline: 14px`,
  block padding `--gap-tight`, a star glyph and a number. The one pill in the system, and the one
  enclosed mark that is not a control. It is a single distinguished object in a quiet band, not
  one of eight siblings, and its geometry is private to the footer. Precedent for how a pill was
  built here; not the answer.

REFERENCES (links, screenshots, described precedents): **The label is the design problem, and on
the inert side its length cannot be bounded.** Free text arrives as `listText` with no constraint
of any kind, so the honest measurement is a proxy: the site's own 65 authored navigation labels,
which are the same register of phrase and in several cases literally the strings a page is filed
under. Median 12 characters, mean 14, minimum 3 ("Lab"), maximum 32 ("Product Modernisation
Assessment"); 14 of 65 run over 20. Real examples at the long end, verbatim: "Content and
Knowledge Platforms" (31), "AI Products and Developer Tools" (31), "B2B SaaS and Workflow
Software" (30), "Audits and starting points" (26). So the shape has to survive a row that mixes a
3-character mark with a 32-character one, and it must not assume a one-word tag. Filter labels are
shorter and controlled, which is part of why the two variants can carry different type roles.

**The second reference is what a button looks like at rest in this system, because it is what both
variants have to avoid, and it is narrower than it sounds.** `Button` has three emphases and not
one of them draws a box at rest. `Button.module.css:207` states the reason outright: *"No outline,
deliberately. A ghost is always shown beside a solid primary, and two boxes of equal edge weight —
one filled, one outlined — read as two buttons of the same rank before the label is even parsed.
Fill-only reads as the quieter of the two immediately. The box is still there; it appears the
moment the pointer does."* So the button signature is a filled brand band (`solid`), a bare
mono-uppercase label with a fill that arrives on the pointer (`ghost`), or a ruled label (`link`).
**An edge at rest is unclaimed territory in this system, by an explicit decision, and it is the
enclosure a tag can take without being mistaken for a control it is not.** That is the fact the
third hard constraint rests on.

**The third reference is the insights page as it renders today, which is the problem in
miniature.** Unselected filters are bare mono labels. The selected one is a filled grey capsule
(`--btn-ghost-neutral-bg-pressed`). The hero's tag row and the card eyebrows are bare text. Filter
and taxonomy are currently told apart only by type role and page position — accidentally, because
an unstyled `li` inherits body type while a ghost Button is mono. Nothing designed that, and
designing it is the job.

**The fourth is the hero the inert row lands in.** `PageHero` already stacks an eyebrow (mono,
uppercase, `--hero-eyebrow-tracking` 0.12em), an `h1` capped at `--hero-title-measure` 22ch, one
to six paragraphs of lede at 68ch, an optional byline and date line, and a row of actions. The tag
row is the fifth or sixth thing in that stack. **Eight grey rectangles under all of that is the
failure mode of this component**, and it is why the treatment is open rather than specified as a
chip.

HARD CONSTRAINTS (must / must not):
- **ONE MARK. NOT A ROW.** Tag renders a single label and nothing else. `Cluster` already owns the
  row, the wrap and both gaps — it is the primitive for exactly this and it is already at every
  call site, including the filter rows. Do NOT specify a `TagList`, a `TagGroup`, a `tags:
  string[]` prop, an overflow "+3 more" affordance, a truncated row or a `max` count. If a row
  needs a different gap than the `colGap="text" rowGap="tight"` the inert rows use or the
  `colGap="tight" rowGap="tight"` the filter rows use, say which steps and why, and it is still
  the caller who passes them. A component that owns its own row is a pattern, and this is a
  primitive. The "All" chip and the group heading on the filter rows are the page's business, not
  the component's.
- **TWO VARIANTS, ONE GEOMETRY.** The inert and interactive marks share their box: the same
  height, the same inline and block padding, the same radius. State those as one set of `--tag-*`
  geometry tokens with no per-variant fork. This is decided, not open. The reason is that the two
  rows are siblings a reader meets on the same site and often the same page, and a size difference
  between them would read as importance rather than as affordance. Everything that distinguishes
  them is paint, type and behaviour.
- **THE THREE-WAY LEGIBILITY REQUIREMENT — the sharpest constraint here, and all three legs hold
  at once.** An inert mark must not read as touchable. An interactive mark must not read as inert.
  And neither may borrow a button's rest signature. That last leg is achievable rather than
  punitive because of the `Button.module.css:207` decision quoted above: at rest a button is a
  filled brand band, a bare mono label, or a ruled label, and **never an edged box**. So an edge
  at rest is available to both tag variants and reads as neither button. What is forbidden
  specifically:
  - No tag may carry a filled brand ground at rest — that is `solid`, and it means "this is the
    page's ask".
  - No tag may be a bare label whose only fill arrives on hover — that is `ghost`, and it is what
    the filter row does today.
  - No tag may carry a rule under its label — that is `link`.

  Say positively what makes each variant legible as what it is, and name the axis each difference
  rides on. Behaviour alone is not enough: hover is invisible at rest, absent on touch, and useless
  to someone scanning a page, so **the inert and interactive marks must differ statically**, before
  anything is pointed at.
- **THE INERT VARIANT HAS NO STATES, AND THAT MUST BE ARGUED RATHER THAN SKIPPED.** No hover, no
  focus, no pressed, no disabled, no `href`, no `onClick`, no `as="a"`, no `button`. No touch-target
  floor applies to it at all, because nothing is hit. There is no taxonomy archive to
  link to either: `src/lib/routes.ts:64` states it outright — *"Insights — formats are index
  pages, not tags."* Then the rule bites the other way: a state token exists only if a value
  moves, so a token the inert variant would never move must not exist for it. Do not add a hover
  "for symmetry".
- **THE INTERACTIVE VARIANT TAKES THE STATE MODEL WHOLE.** Rest, hover, `-hover` plus the ring on
  `:focus-visible`, `-pressed` on `:active`, and `-pressed` again for the held selected case driven
  by a prop. `aria-current` on the selected chip. Disabled is not in scope: no filter is ever
  unavailable today, so if you specify it, say what would make it so.
- **THE TOUCH TARGET IS ARGUED FROM WHAT A TAG IS, AND 44 IS RULED OUT BY MECHANISM RATHER THAN BY
  TASTE.** §9 below sets the frame — 24×24 is the floor, the number above it is this component's
  decision. What this brief owes is the part §9 cannot know: **why the 44 route is unavailable to a
  tag specifically.** Neither of the two means §9 offers works here.

  `extendHitArea` extends **vertically only**. `.hit::after` is
  `left:0; right:0; height:44px; top:50%; translateY(-50%)` (`Button.module.css:473`), and it is
  scoped by its own documentation to "a toolbar, a dense table row" — single-row contexts with
  nothing above or below to collide with. **A tag row wraps.** Do the arithmetic at
  `rowGap="tight"` (8): a 28px chip extended to 44 grows 8px above and 8px below, so two vertically
  adjacent rows' targets meet exactly; a 24px chip overlaps the row above it by 12px. **Overlapping
  targets are worse than smaller ones** — a tap in the seam lands on whichever element wins the
  stacking order, and the reader cannot see why. And stepping the box up to 44 instead makes a tag a
  button-sized object, which loses the third hard constraint outright.

  So **spacing is the mechanism on a wrapping row, not target inflation.** State the chip's height,
  state both gap steps, and show the arithmetic that proves no two targets intersect; below 24 in
  either axis, cite SC 2.5.8's spacing exception and show that a 24px circle centred on each target
  meets no other. That makes the row gap a stated design decision rather than something inherited
  from today's `rowGap="tight"`.

  And do not reach for the floor because it is available — **24 is a floor to clear, never a size to
  aim at.** A filter row is a primary interaction on the one page that has it, operated by thumb, so
  the smallest permitted target is very unlikely to be the right one; the honest range is nearer the
  32 the ghost Button already stands at than the 24 the standard allows. The spec owes the argument,
  not a number copied from a rule.
- **FOUR SURFACES, FOUR FULL COLUMNS, NO DELTAS — AND NOW TWICE OVER.** Every surface-dependent
  token declared for paper, tint, ink and blue, for both variants, including where a value
  repeats. The inert rows sit on `surface="paper"` in every route today and the filter rows sit on
  paper too, which is exactly the trap: an untested ink column is how a tint panel inside an ink
  section rendered its text at 1.13:1 and cost a button its label, its link and its focus ring. If
  a mark carries its own ground, its ink is measured against **its own ground**, not the
  section's, and the 4.5:1 floor is met on all four. State every number.
- **A GROUND OR AN EDGE IS PERMITTED; OVERRIDING THE SECTION'S IS NOT.** A small mark painting a
  small ground is fine — `--prose-mark-bg` is the precedent. What is forbidden is horizontal
  padding, a `max-width`, a background or a colour applied to or around the `Section` or the
  `Cluster` from outside.
- **NO MARGINS, EVER.** The mark's internal padding is its own; the distance to the next mark
  belongs to `Cluster`. If the design needs optical breathing room that is not a gap step — a side
  bearing on capitals, a ring offset — take it from the space ramp and say in a comment on the
  token that it is an optical correction, exactly as `button.css` does for `--btn-label-margin`.
- **NO HAND-ROLLED ARRANGEMENT.** An `inline-flex` centring a label beside a glyph inside the one
  mark box is not arrangement and is allowed; say where you use it. Anything that arranges two
  marks is `Cluster`'s job.
- **CASE IS THE STYLESHEET'S, NEVER THE STRING'S.** Whatever roles are chosen, the prop, the CMS
  field and any accessible name keep the capitalisation somebody authored — "Product Modernisation
  Assessment", never "PRODUCT MODERNISATION ASSESSMENT" in the data. Where a mono role is chosen
  the rule writes `text-transform: var(--text-mono-case)` beside its `font:`. And the corollary is
  load-bearing here rather than incidental: **a label that must stay sentence case is not a mono
  label.**
- **IT RENDERS INSIDE AN `li` THE CALLER SUPPLIES.** Both rows are `Cluster as="ul"` today and the
  semantics are right: a list of filed-under labels is a list, and so is a list of filters. Say
  what element each variant is and whether it takes an `as`. It must not emit its own `li`, and it
  must not require one either — the same mark has to work in a `dd`, in a hero and eventually
  inside a card.
- **ONE ARRANGEMENT.** No responsive variant, no compact variant, no breakpoint. The distance
  scale does not shift responsively and neither does a type role; the row wraps, and wrapping is
  `Cluster`'s behaviour already.
- **THE SQUINT TEST, STATED PLAINLY.** Eight inert marks in a row under an eyebrow, an h1, a lede
  and two buttons is a grey ladder at the bottom of every hero on the site. Three rows of
  interactive marks stacked in a filter band is the same failure with a different label. If the
  answer is that a mark should be quieter than a chip and louder than plain text, show what that
  is.

OPEN TO YOUR JUDGEMENT (what I have not decided):
- **The two type roles, and this is now the load-bearing decision** — it is the most likely place
  the static difference between the variants comes from. The mono roles are the label voice —
  `--text-micro` 11px, `--text-ui-sm` 12px, `--text-eyebrow` 12px, `--text-ui` 13px — uppercase in
  presentation, tracking opened to match. The sans alternative is `--text-caption` (13px, no
  tracking, verbatim case). My reading of the system's own rule is that it decides the inert side
  for you: a 32-character sentence-case free-text label is not a mono label, so the inert mark is
  sans, while a short controlled filter name is exactly the label voice and can be mono uppercase.
  That would make case the primary static difference between the variants, which is categorical
  rather than state-like and therefore hard to misread. Confirm or overturn it with a reason — and
  if the inert mark goes mono, say what stops it colliding with the hero's own eyebrow eight lines
  above it, which is `--hero-eyebrow-text` at `--hero-eyebrow-tracking` 0.12em.
- **The shared geometry itself.** Height, inline padding, block padding, and whether the radius is
  `--radius-4`, `--radius-8` or `--radius-full`. `--space-6` exists in the ramp and is commented
  as a chip inset; the footer badge is the one `--radius-full` in the system; `--btn-height-sm` is
  32px and `--btn-radius` is 8px, and matching either exactly is a choice you should make
  deliberately rather than by default, given the third hard constraint.
- **What the edge and the ground are, per variant, per surface.** A hairline edge on both with a
  ground on neither; an edge on the interactive one and nothing on the inert one; a quiet tint
  ground on the inert one and an edge on the interactive one. Argue it against the three-way
  requirement and against what a row of eight looks like on ink and on blue. Note that nothing in
  this system paints a ground at rest that is not a control: `ListCard` and `BlockCard` both paint
  none, and `BlockCard`'s four-sided hairline was **deleted** rather than set to zero
  (`block-card.css:14`). The system's stated position is that weight comes from scale, imagery and
  position rather than decoration. A boxless
  inert mark is a legitimate outcome — but it forfeits the shared geometry above, so if that is
  where you land, say so explicitly and say what carries the alignment instead.
- **Whether the held selected state is a fill, a weight, a glyph or a leading rule.** It may not
  be colour alone. Today it is a `neutral-200` fill from the ghost Button's pressed token, which
  is the cheapest possible answer and worth beating. `Proof` and `Prose` both have a leading-rule
  precedent and `ListCard` a numbered one, so there is prior art either way.
- **Whether a mark can hold a glyph, and whether the interactive one should.** The set is 17 and
  fixed; `Button` takes an `icon` as a `ReactNode` rather than importing `Icon`, and a primitive
  may not import a primitive, so a Tag glyph arrives the same way. A glyph on a taxonomy label is
  usually noise. A glyph on a *selected* filter — `check`, or `close` meaning "clear this" — is a
  different proposition and may be the honest answer to the state question above. Decide both; a
  `ReactNode` prop nobody passes is dead API.
- **Whether the mark caps its own inline size.** `Prose` caps at `--measure-body`, `Figure` fills
  what it is given. A 32-character mark is roughly 200px of body type; on a phone that is most of
  the line. Truncate with an ellipsis, wrap to two lines, or wrap freely and let the mark be as
  tall as it needs. All three have a cost. Pick one and say what it costs — and note that
  truncating a filter label is worse than truncating a taxonomy label, because the reader has to
  choose from it.
- **Whether the two data shapes behind the inert mark need any distinction.** My instinct is no —
  a category and a free-text tag mean the same thing to a reader — but the case-study and insight
  heroes currently concatenate `[...categories, ...tags]` into one undifferentiated row
  (`case-studies/[slug]/page.tsx:248`), and if you think a category should outrank a tag visually,
  that is a real argument and the data supports it. Say which; if it is one treatment, say the
  concatenation is correct.
- **The prop that selects the variant, and its name.** `interactive`, `variant="mark | filter"`,
  or the presence of `href` implying it. The last of those is the cheapest and also the most
  likely to be misused, since the inert variant must never take an `href`. Recommend one.
- **The name.** `Tag` is what I have assumed, tier 1, prefix `--tag-`, file
  `tokens/components/tag.css`. If your treatment turns out to be something else — a `Label`, a
  `Mark`, a `Pill` — say so and say why, but check the prefix against the taken list in the
  vocabulary document rather than against any count written in prose, including this brief's.
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
