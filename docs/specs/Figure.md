# Figure

## 0 · Front matter

| | |
|---|---|
| **Component** | `Figure` |
| **Tier** | 2 pattern (`src/patterns/Figure/`) |
| **Status** | implemented |
| **Token prefix** | `--fig-*` (re-checked at build against the live taken list, now sixteen: `--acc-` `--bcrd-` `--btn-` `--crumb-` `--cta-` `--enq-` `--foot-` `--hero-` `--icn-` `--inp-` `--lay-` `--lcrd-` `--logo-` `--nav-` `--prose-` `--sec-`. `--acc-` and `--bcrd-` landed after this spec was written; neither collides) |
| **Designer / date** | Design · 24 Aug 2026 |
| **Implements** | `docs/briefs/13-figure.md` |
| **Implemented at** | `src/patterns/Figure/` · `src/styles/tokens/components/figure.css` · `/design/figure` |

Verified against the loaded Tcules library (`window.Tcules`, 15 components) and `guidelines/docs/vocabulary.md`. Every contrast ratio in section 6 was computed from the exact hexes in that document with the standard WCAG relative-luminance formula; six of the nine text-ink pairs reuse values already published and checked in `docs/specs/PageHero.md` §6 and agree with all six — `--color-neutral-{600,700}` against paper and tint, `--color-neutral-{300,400}` against ink, `--color-brandeis-{50,100}` against blue. The remaining three (one text pair, two rule pairs) are computed fresh here. Assumptions I could not check are marked **[assumed]** and collected in section 17.

**The headline finding, before the form starts.** Nothing in the library covers this today — the closest thing, `Prose`'s bare-`figure` CSS rule, styles a tag a CMS body string wrote, not a component a template composes (section 1). But of the three call sites the brief names, **two don't exist as components yet** (`ContentSection`, `BlockCard`) and the third has already been asked and has already answered no: `PageHero.md` §17 Q3 considered an `image` slot and rejected it — "Zero images in the corpus, no image component, no `next/image` precedent anywhere in the codebase, and `Figure` (brief 13) unbuilt... When `Figure` lands, the hero takes it as a `ReactNode` and the arrangement question is asked against real images." `PageHero.d.ts` confirms it today: `children` is the only open slot, and it renders between the byline and the actions — not a hero-width image position. So this spec builds `Figure` as a fully self-sufficient component that asks nothing of any container, and treats "which container gets a slot for it" as a separate, later, non-blocking question (§17 Q9). The one call site that is real today, and the one this spec is measured against, is standalone use on case-study pages, where 21 caption-and-note lines are already written with no component to hold them.

## 1 · Identity

An image with a caption and an optional quieter note, sized to whatever inline space its parent gives it. It renders zero, one or many times on a page — there is no per-page limit, unlike a band component that appears exactly once.

**Tier 2 pattern, forced the same two ways `PageHero` and `ListCard` were.** It takes content shaped like a CMS record — an image asset plus a caption field plus an optional note field, exactly the shape `21` already-written lines arrive in — which the tier rule says makes it a pattern at the least. And arranging an image above a caption above a note is arrangement, which under the layout rule can only come from a primitive; a component that calls `Layout` cannot itself be one. Both roads end at `src/patterns/`.

**What it is NOT**

1. **Not a rich-text flow.** `Prose` is that, and it already has a CSS rule for a bare `figure` tag (`.Prose_prose > * + :is(..., figure, ...)`, `_ds_bundle.css`) — but that rule styles a `<figure>` a CMS `html` string wrote inline, which `Prose` cannot see the inside of. `Figure` is a typed component with a closed, three-prop contract, composed in JSX. The two are unrelated except by coincidence of tag name — and if a caller ever authors `<Prose><Figure .../></Prose>` (JSX `children`, not the `html` string), Prose's own sibling-margin rule already fires on the `<figure>` tag `Figure` renders, spacing it correctly with no work on either side. That is a happy accident of using the correct semantic element, not a designed integration.

   **As built, one half of that accident is a hazard and it is recorded here rather than fixed.** `Prose` also carries `.prose figcaption { margin-block-start: var(--gap-tight) }` — a descendant selector, so it lands on the `<figcaption>` this component renders and adds 8px on top of `root`'s own 16px seam, giving 24px inside a `Prose`. Its `font` and `color` on the same selector are harmlessly overridden, because `Figure` sets both on the `<p>`s rather than the container. The leaking margin is `Prose`'s rule and is correct for the CMS figures it was written for, so neither component was changed: composing `<Figure>` inside `<Prose>`'s JSX children is simply not a supported arrangement today, and a page that wants a figure inside flowing copy puts it beside the `Prose` block rather than in it. If that arrangement is ever wanted, the fix belongs in `Prose` — scoping its rule to the figures it actually authored — and is its own decision.
2. **Not a bounded card or a row marker.** `ListCard`'s `thumbnail` marker fill is the only other image in this system today (`ListCard.md` §17): a caller-agnostic 160px, 3:2, centre-cropped native `<img>`, fixed on purpose because a marker's job is to be recognisable at a glance inside a repeating row. A product screenshot's job is the opposite — to be read, not glanced at, at whatever size it is given — so the fixed-crop answer that is right for `ListCard` is the one this component must not copy (section 4). The future `BlockCard` will supply the filled or edged tile; `Figure` paints no ground and holds no fill (Hard constraint: MUST NOT own its ground).
3. **Not a page or section opening.** `PageHero` owns the page's one `h1` and its own band; a bare `<h2>` inside a `Layout` opens a section. `Figure` renders no heading at all, contributes no `<h1>`/`<h2>`, and — see above — has no per-page cardinality limit to enforce, which is the opposite constraint `PageHero`'s whole spec is organised around.

**Nearest existing component, and why this is not a prop on it.** `Prose`, by the brief's own answer, for the reason in point 1. `ListCard`'s `marker: { kind: 'thumbnail' }` fill is the second-nearest and worth ruling out explicitly, because it is the one place in the codebase that already made an image decision: `ListCard` chose a fixed frame and a `cover` crop because it needed twelve rows to line up. Adding a `crop="none"` escape hatch to that union would let one marker in a list ignore the frame every sibling respects, which breaks the ladder `ListCard.md` §2 exists to protect. A full-bleed, uncropped, caption-carrying image is a different content model, not a variant of a marker.

**How many appear on a page.** Zero, one, or many, with no maximum — the opposite of `PageHero` and `Breadcrumbs`, which are exactly-one band components. A case-study page may run several in sequence, each independent, each sized by whatever contains it.

## 2 · Anatomy

| Part | Element | Required | Content slot | Carries |
|---|---|---|---|---|
| `root` | `<figure>`, rendered by `Layout as="figure" rowGap="text"` | yes | none | the seam between `image` and `legend` (16px). Fills 100% of the parent's given inline size. No ground, no padding, no colour of its own |
| `image` | `<img>` | no — renders only when the `image` prop is supplied | `image.src`, `image.alt`, `image.width`, `image.height` | `--fig-rule-ink` at `--fig-rule-width` (its own hairline border); native `width`/`height` attributes; scales to the box's full inline size at its own intrinsic ratio |
| `legend` | `<figcaption>`, rendered by `Layout as="figcaption" rowGap="tight"` | yes | none | the seam between `caption` and `note` (8px). No colour or type of its own — it is a container, like `stack` or `opening` in `PageHero` |
| `caption` | `<p>` | yes — always rendered | `caption`, verbatim | `--fig-caption-ink`, `--fig-caption-text`, `--measure-body` |
| `note` | `<p>` | no — renders only when the `note` prop is supplied | `note`, verbatim | `--fig-note-ink`, `--fig-note-text`, `--measure-body` |

Three parts carry colour (`image`, via its rule; `caption`; `note`) and they are the three rows of section 6. Two parts carry distance only (`root`, `legend`) and both are rows in 7(a). No part carries nothing — unlike `PageHero`'s `extras`, every part here has a value to declare, because `Figure` has no free caller-supplied slot at all (section 3).

**`<figcaption>` must be `<figure>`'s first or last child, by the HTML spec.** It is last, because section 17 Q3 puts the caption below the image.

## 3 · Props / API

```ts
type FigureImage = { src: string; alt: string; width: number; height: number }
```

| Prop | Exact literal union | Default | What it decides |
|---|---|---|---|
| `image` | `FigureImage \| undefined` | `undefined` | Whether the `image` part renders. All four fields arrive together or not at all — there is no way to supply a `src` without a `width` |
| `caption` | `string` | none — required | The `caption` part's text, verbatim. A `string` and not a `ReactNode`, for the same reason `PageHero.title` is: it makes "text laid over the image" and "a link or heading smuggled into a caption" both impossible to express, not just discouraged |
| `note` | `string \| undefined` | `undefined` | Whether the `note` part renders |

That is the whole surface — three props, none of them a size, a position or a container hint.

**Deliberately NOT props**

| Not a prop | Why |
|---|---|
| `surface` | `Figure` paints no ground of its own — no `--fig-bg-*` token exists anywhere in this spec. It is not a band; it reads `data-surface` from whichever `Section`, `PageHero` or future `ContentSection`/`BlockCard` already established one, exactly as `Button`, `Icon` and `ListCard` do |
| colour, padding, gap, radius, height, width | The token layer owns colour; whatever contains `Figure` owns the gap around it; `Figure` owns only its own internal 16px and 8px seams |
| `size` | Section 4. `Figure` has exactly one size: whatever inline space its parent gives it (hard constraint: WIDTH IS THE PARENT'S JOB). A `size` prop would be a second place width could be set, and the brief is explicit that two places setting it means they will disagree |
| `crop`, `objectFit`, `aspectRatio` | Section 17 Q2. The image always renders at its own intrinsic ratio; there is no frame for it to fill and nothing for a crop mode to do |
| `captionPosition` | Section 17 Q3. The caption always follows the image |
| `variant` | There is one arrangement regardless of which container holds `Figure` or whether one does at all. A `variant` prop would be this component naming its container's context, which the container already knows and `Figure` does not need to |
| `as` | The root is always `<figure>`, the legend always `<figcaption>`. That native pairing is what associates the caption with the image with zero ARIA; an escape hatch would make the association optional by accident |
| `border`, `showBorder` | Section 17 Q5 and section 4's rejected-variants row. The rule is not a per-call decision |
| `loading`, `priority` | Section 17 Q7 — **still not, and now for a better reason than "no use exists".** `PageHero` gained a `media` slot on 25 Aug 2026 and did **not** take a `Figure` to fill it: it owns its own `<img>`, eager and `fetchPriority="high"`. So the above-the-fold case moved out of this component rather than into it, and a `Figure` remains a page-body figure, correctly lazy |
| `className`, `style`, `id` | Closed record, as `ListCard` and `PageHero` are. The only things this component says about itself are its content and which optional slots are filled |

**Compile errors, not review comments**

1. **A partial `image`.** `FigureImage` requires `src`, `alt`, `width` and `height` together; an object missing any one of the four does not compile. There is no way to ship a `src` with no `width` and discover the missing dimension at runtime.
2. **`caption` omitted.** It is a required `string` with no default, so a call site with no caption does not compile — this is the type-level enforcement of the hard constraint "caption is required."
3. **`caption` or `note` given an element.** Both are `string`. `caption={<span>…</span>}` does not compile, which is what makes "text laid over the image" (the hard constraint MUST NOT put text over the image) structurally unreachable rather than merely discouraged.
4. **`className`, `style`, `id`, `size`, `variant`, `surface`, `crop`.** No `HTMLAttributes` spread and no index signature, so excess-property checking rejects all of them at the call site.

## 4 · Variants × sizes

| | (only size) |
|---|---|
| (only variant) | the component |

A 1 × 1 matrix, and the reason is simpler than `PageHero`'s: there is no size axis because `Figure` has no size of its own to step — its one dimension is "100% of what the parent gave it," which is not a t-shirt scale, it is the absence of one. There is no variant axis because there is exactly one arrangement — an optional image, then a required caption, then an optional note — and nothing about where `Figure` sits changes that shape.

**Variants considered and rejected**

| Rejected | Why |
|---|---|
| `size="sm" \| "md" \| "lg"` (a max-width cap) | Directly contradicts WIDTH IS THE PARENT'S JOB. A size prop is a second place width is decided, and the brief names that as the exact failure mode to avoid |
| `crop="cover" \| "contain"` | Section 17 Q2. Product screenshots have arbitrarily different shapes; a fixed crop mode necessarily cuts small type out of some of them, which is the one thing this component exists to avoid doing |
| `captionPosition="above" \| "below"` | Section 17 Q3. `<figcaption>` must be the first or last child of `<figure>`; "above" is legal HTML but reads as a label for what is coming, which this system already has a name for (`eyebrow`, on `PageHero`) and it means something else there |
| `variant="hero" \| "card" \| "standalone"` | The same rejection `PageHero.md` §1 gives `variant="caseStudy"`: a name for which container holds the component, styled identically underneath. Whichever of `PageHero`, `ContentSection`, `BlockCard` or nothing contains `Figure` decides its own layout around it; `Figure` does not need to know which one it is in |
| `border="none" \| "hairline"` (opt out of the rule) | Section 17 Q5. `Figure` cannot see its own image's pixels and so cannot judge whether a given screenshot needs the edge; a per-call toggle would hand the crop-adjacent decision back to callers one at a time, which is the inconsistency a single system-wide answer exists to prevent |
| A hover or focus treatment on the image | Considered and rejected outright, not merely undersized. Nothing here is interactive (section 5); a hover state would visually promise a click that does nothing |

## 5 · States

**None of the fixed model's states applies to any part**, for the same structural reason as `PageHero`: nothing this component renders is interactive.

| State | Suffix | Applies to | Why not |
|---|---|---|---|
| rest | *(none)* | every part | The only rendering there is |
| hover | `-hover` | nothing | `Figure` contains no link, button or other pointer target. It is presentational only, by design (Identity, point 3) |
| focus, keyboard | `-hover` + ring | nothing | Nothing here is focusable. No `tabindex`, no interactive element, no ring token |
| pressed | `-pressed` | nothing | As hover |
| held: active / selected / current | `-pressed` | nothing | There is no set `Figure` belongs to on the page in which one instance could be "current" |
| disabled | its own tokens | nothing | An image and a caption cannot be unavailable. No `--fig-disabled-*` token exists |
| expanded / open | `-expanded` | nothing | Nothing opens. A click-to-enlarge or lightbox treatment is a real, plausible future ask — and it is a NEW MECHANISM REQUEST with its own spec, not a state this component quietly grows |

**So zero `--fig-*` state tokens exist.** Given the same three props, `Figure` renders the same pixels every time, on every surface, forever — there is no pair of renderings the hover-differs-from-pressed rule could even apply to, so, as in `PageHero.md` §5, the rule is satisfied vacuously rather than dodged.

**Loading and error.** Not in the model, and nothing here is asynchronous — `image`, `caption` and `note` are all present at render time or they are not (section 12, row 6). There is no skeleton and no spinner.

## 6 · Per-surface colour

Three tokens, four surfaces, twelve cells, no deltas.

| Token | paper (`--color-paper`) | tint (`--color-paper-deep`) | ink (`--color-neutral-950`) | blue (`--color-brandeis-500`) |
|---|---|---|---|---|
| `--fig-caption-ink` | `--color-neutral-700` — **8.14:1** | `--color-neutral-800` — **10.54:1** | `--color-neutral-300` — **11.07:1** | `--color-brandeis-50` — **5.57:1** |
| `--fig-note-ink` | `--color-neutral-600` — **4.92:1** | `--color-neutral-700` — **7.27:1** | `--color-neutral-400` — **8.05:1** | `--color-brandeis-100` — **4.91:1** |
| `--fig-rule-ink` | `--color-neutral-300` — **1.54:1** | `--color-neutral-400` — **1.90:1** | `--color-neutral-700` — **2.10:1** | `--color-brandeis-300` — **2.64:1** |

**Built as `--fig-rule-ink`, not `--fig-rule`.** The spec named one token for the hairline's colour; the build split it into `--fig-rule-ink` (the colour, per surface) and `--fig-rule-width` (`--border-width-hairline`, geometry). Every other hairline in the system is already shaped that way — `--acc-rule-ink`, `--bcrd-edge-ink`, `--lcrd-rule-ink`, each paired with its own `-width` — and a bare `--fig-rule` would have been the only colour token in the layer carrying no register suffix. Read `--fig-rule` below as `--fig-rule-ink` throughout; every value and every measured ratio is unchanged. One thing this layer does NOT copy from those three: they are all annotated `decoration`, because they confirm a boundary the layout has already made. This one carries the boundary itself, which is why it is held to 3:1 rather than exempted.

`--fig-caption-ink` and `--fig-note-ink` are text and are held to the **4.5:1** floor; every cell clears it, the tightest being 4.91:1 (note on blue) and 4.92:1 (note on paper) — both values this system has already validated at exactly this ratio in `PageHero.md` §6. **`--fig-rule-ink` is the decoration row, and the values above are the second set.** This spec first argued the rule was non-text meaningful content and held it to the **3:1** floor this vocabulary uses for a focus ring against its own gap, which put it at `--color-neutral-500` on paper (3.16:1), `--color-neutral-600` on tint (4.39:1) and on ink (3.48:1), and `--color-brandeis-200` on blue (3.78:1). **Reviewed on the specimen and rejected by the owner, 24 Aug 2026:** at those steps the rule takes more attention than the screenshot it surrounds, and its only job is a slight distinction from the ground where one is needed. That is decoration by this system's own definition, so the floor does not apply and every cell above now sits deliberately below 3:1.

The replacement values are not a fresh judgement either. `--acc-rule-ink`, `--bcrd-edge-ink` and `--lcrd-rule-ink` already ship one identical ladder for exactly this job — 300 on paper, 400 on tint, 700 on ink, brandeis-300 on blue — so `Figure` takes it unchanged, and a fourth component agreeing is worth more than a fourth opinion. Each ratio is still stated, so a later "this is too quiet" has the number in front of it rather than an adjective.

The two parts that carry no colour at all (`root`, `legend`) are marked so in section 2 rather than listed here as "n/a — decoration" cells, because they are not decorative — they hold no colour, which is the distinction `PageHero.md` §6 draws for its own colourless parts.

**paper.** The baseline. `--fig-caption-ink` at `--color-neutral-700` (8.14:1) is the same step `PageHero` uses for its own body copy — a caption reads with the same weight as running prose, not as a label. `--fig-note-ink` steps quieter to `--color-neutral-600` (4.92:1), the step `PageHero` uses for its quietest parts, clearing the floor by the same thin margin on purpose: a note is meant to read as an aside. `--fig-rule-ink` sits at `--color-neutral-300` (1.54:1), and this is the surface where it does the most work: a light-UI screenshot on `--color-paper` is nearly the colour of the ground and has no edge of its own. A grey hairline on near-white is visible without being a frame — which `--color-neutral-500` at 3.16:1, the first answer here, was.

**tint.** The ground darkens and reproduces the exact collision `PageHero.md` §6 found on this surface: `--color-neutral-600` measures **4.39:1** against `--color-paper-deep` and fails 4.5. Since `--fig-note-ink` already lived there, it steps up one rung to `--color-neutral-700` (7.27:1) — which is `--fig-caption-ink`'s own paper value. Left alone, caption and note would render in the identical ink on this one surface, and because they share one type role (`--text-caption`) with no family, case or tracking difference between them — unlike `PageHero`'s eyebrow-versus-body pair — that collision would be total, not partial. So `--fig-caption-ink` also steps, to `--color-neutral-800` (10.54:1), keeping a full rung of daylight between the two on every surface. The cost, stated plainly: the caption is measurably darker on tint than on paper, a per-surface move this system's colour model explicitly allows and expects. `--fig-rule-ink` steps with the ground, 300 to `--color-neutral-400` (1.90:1). It has less to do here than on paper: the tint ground is already darker than a light screenshot, so part of the distinction is made before the rule draws anything.

**ink.** The direction inverts. `--fig-caption-ink` lifts to `--color-neutral-300` (11.07:1) — `PageHero`'s own body-on-ink step — and `--fig-note-ink` lifts to `--color-neutral-400` (8.05:1), `PageHero`'s own quiet-label step. `--fig-rule-ink` does the opposite and drops to `--color-neutral-700` (2.10:1 against the ground). A screenshot on a near-black band already has all the edge it needs from its own light pixels, so a pale hairline would read as a second surface sitting on the black one. 700 all but disappears into the ground, which is the point: this is the one surface where the honest amount of rule is almost none. Note which neighbour that ratio is measured against — the same value reads 8.07:1 against the screenshot's own near-white pixels, and it is the quiet side that matters here.

**blue.** The ramp runs out fastest here and all three values sit inside the tightest window this system has. `--fig-caption-ink` takes `--color-brandeis-50` (5.57:1) — `PageHero`'s own lead-and-byline step on this ground — and `--fig-note-ink` takes `--color-brandeis-100` (4.91:1), the tightest passing cell in this table and, again, a value `PageHero` already validated at this exact ratio. `--fig-rule-ink` takes `--color-brandeis-300` (2.64:1) — *darker* than either text ink rather than lighter, and quieter than the `--color-brandeis-200` it replaced. On a saturated ground the distinction wanted is a slight one, and stepping toward the ground is what makes it slight.

**Nested surfaces.** `Figure` paints no ground of its own, so it is never a surface scope — it only ever reads whichever of the four blocks above it an ancestor `Section`, `PageHero` or future `ContentSection`/`BlockCard` has already declared. A `Figure` standing inside a `tint` block nested between two `ink` sections renders the tint column throughout: a 10.54:1 caption, not an ink-tuned value stranded on a lighter ground. There is no case where `Figure`'s own markup needs to know this is happening — the three tokens above resolve correctly by nothing more than sitting under the right `[data-surface]` attribute.

## 7 · Geometry & spacing

**(a) Distances — gap-scale role names only**

| Where | Role | Owner |
|---|---|---|
| `image` → `legend` | `--gap-text` | `root`'s `rowGap` — the step this vocabulary names for "paragraph to paragraph," reused here because a caption block under an image is read the same way |
| `caption` → `note` | `--gap-tight` | `legend`'s `rowGap` — tighter than the image seam, because the note is a second caption that moves with the first, not a new block |
| `root` → whatever precedes or follows it | none | the parent, by whichever `Layout`, `Cluster`, `Section` or `Prose` seam contains `Figure`. It sets no outer spacing of its own |

Two steps, and the ratio between them (16px to 8px, 2:1) is what keeps the caption reading as "under the image" while the note reads as "attached to the caption" rather than as a third, equal block — the same nesting-creates-rhythm principle `PageHero.md` §7(a) uses for its own two-level seam.

**(b) Component sizes**

There is exactly one: **inline-size 100% of the parent's given track, block-size auto.**

This is not t-shirt-named because there is nothing to name — `Figure` has no fixed box, by the hard constraint, so "the size" is a rule (fill what you're given) rather than a value. The image inherits this directly: `inline-size: 100%`, `block-size: auto`, `box-sizing: border-box` so that its 1px `--fig-rule-ink` border sits inside the 100% rather than adding to it — the rendered box is exactly the parent's track at every width, border included. (`box-sizing` is not restated in the module: `reset.css` sets it globally.)

**As built, `root` carries no `inline-size` declaration at all, and that absence is deliberate — do not add one.** Filling the track needs no declaration: `root` is a `Layout`, so it is a grid container and therefore a block-level box, which a block parent already sizes to full width and a `Layout` track already stretches (`Layout`'s `justifyItems` defaults to `stretch`). An `inline-size: 100%` was written here first and removed after looking at it: in the one parent that does NOT size its children — a `Cluster`, i.e. a wrapping flex row — 100% resolves against the whole row, so every figure claimed the full width, forced a wrap, and made the minimum below unobservable. The image keeps its own `inline-size: 100%`; that one is filling the figure's box and is a different declaration.

**Minimum, for a parent that does not size it.** 192px, declared here as **`--fig-min-xs`** — the same value and the same reasoning `ListCard.md` §7 already established for its own content core: it is `Layout`'s own smallest named track, small enough to be a real constraint and large enough that a caption in `--text-caption` still wraps on real words rather than one character per line.

**As built, this is `--fig-min-xs` and not a read of `--lay-track-xs`.** A component never reads another component's tokens, so the value is matched deliberately rather than referenced — exactly as `list-card.css` does, whose own comment on `--lcrd-content-min-xs` records hitting this same wall. It is applied as `min-inline-size: min(100%, var(--fig-min-xs))`, which is what makes the floor safe in both directions: 192px is the minimum where a caption wraps on words, and the `100%` term lets the box shrink below it inside a genuinely narrower parent rather than pushing the page sideways.

**What that floor does and does not reach, measured rather than assumed.** It bites wherever the parent's own inline size is definite — the case that matters, a `Cluster` handing out no tracks, where two two-word captions stack instead of sitting side by side because each is held at 192. It does nothing where the box is already being stretched to a track, which is every `Layout` and every block parent, and it correctly does nothing where the figure's containing block is itself indefinite (a shrink-to-fit wrapper inside a flex row), because a percentage minimum resolves to zero during intrinsic sizing. That last case is why the specimen proves the floor by what does not fit rather than by drawing a box around it: an outlined wrapper around the figure changes the answer.

**(c) Optical corrections reaching the space ramp — none, and why**

Both seams in this component (16px, 8px) are used exactly as declared gap-scale steps. There is no rule, no panel and no second box anywhere in the component whose edge could visually disagree with another's, so there is no misalignment here for a `--space-*` reach to correct — unlike `PageHero`'s Newsreader-versus-mono left edge, `Figure` has no two type families sharing a visual edge that could drift apart.

**Radius.** `--radius-0`. Rounding the image's corners would clip screenshot content at exactly the corners a screenshot is least likely to spare — the same family of reasoning that rules out cropping generally (section 17 Q2).

**Border width.** `--border-width-hairline` (1px), on `image` only, as a decision rather than an omission (section 17 Q5). `root` and `legend` carry no border.

**Shadow.** `--shadow-none`. Nothing here is elevated; `Figure` is not a bounded card (Identity, point 2).

**Z-layer.** `--z-base`. Nothing in this component stacks above anything else.

**As built there is no z token and no `z-index` declaration, which is this section's one unrecorded delta.** Nothing in the component is positioned, so writing `z-index: 0` would manufacture a stacking context purely to assert an absence. `--z-base` therefore drops out of the token count below: nine `--fig-*` declarations, not ten.

## 8 · Typography

| Part | Role | Tracking companion |
|---|---|---|
| `caption` | `--fig-caption-text: var(--text-caption)` | none — this role has no tracking companion |
| `note` | `--fig-note-text: var(--text-caption)` | none — this role has no tracking companion |

**Caption and note share one type role, `--text-caption`, and are told apart by ink alone (section 6), not by size or family.** The vocabulary's `--text-caption` (13px, sans, regular) is the only sans role at or below body-small scale, and mono roles at that size (`--text-micro`) come bundled with semibold weight and tracking meant for short capitalised labels — wrong voice entirely for a sentence explaining what an image does not establish. There is no smaller sans role to reach for, so "quieter" here is a colour decision, and section 6 shows the two inks are never the same value on any one surface.

**Measure.** Both `caption` and `note` take `--measure-body` (68ch). Since `Figure` can be given a track far wider than a comfortable line of 13px text — a full 1240px section is 41 words per line uncapped — the measure keeps the legend readable under a wide image without `Figure` needing to know how wide the image actually is. Both lines left-align to `root`'s own inline-start edge, the same edge the image starts from; they never centre under the image and never try to match a text column the component has no way to know about (section 17 Q4).

**Case.** Sentence case throughout. No `text-transform` on any part — both roles here are **sans**, so the system's mono-is-always-uppercase rule does not reach them, and that is the same decision seen from the other side: unlike `PageHero`'s eyebrow, a caption is read as a sentence rather than announced as a label, which is precisely why § 7 chose `--text-caption` over the mono role at that size.

Example copy, exactly as it would be authored (from the brief's own reference lines):

- caption — `Fictional approval-queue surface.`
- note — `Bars compare 31 current records with a projected set.`
- caption, empty-state — `Illustrative page preview: foundation tokens, a component family and states.`

## 9 · Responsive

**At 1023 and at 767, nothing in this component changes.** `--text-caption` carries whatever its own re-declaration does at those widths **[assumed]**, and `Figure` does not touch it. The two gap steps in 7(a) do not shift — the gap scale never does. The image simply scales down with its own track, at its own intrinsic ratio, and the `--measure-body` cap on the legend goes inert below about 800px exactly as it does in `PageHero` and `Breadcrumbs`, because a viewport that narrow is already narrower than the measure.

**Touch targets.** Not applicable. `Figure` renders no interactive element at any width (section 5), so the 44px floor has nothing to check.

**Image delivery, stated as a boundary rather than a gap.** `Figure` renders one `<img src>` at one resolution — no `srcset`, no `sizes`. There is no responsive-image pipeline anywhere in this codebase yet (vocabulary: "no `next/image` usage anywhere yet"), so this is out of scope by the same fact that makes an image component new work in the first place, not a hole this spec is leaving open.

## 10 · Composition

```jsx
// image, caption and note are this component's own props.
<Layout as="figure" rowGap="text">                          {/* root — 16: image to legend */}
  {image && (
    <img src={image.src} alt={image.alt} width={image.width} height={image.height} />
  )}
  <Layout as="figcaption" rowGap="tight">                    {/* legend — 8: caption to note */}
    <p>{caption}</p>
    {note && <p>{note}</p>}
  </Layout>
</Layout>
```

**No hand-rolled grid or flex.** The two seams in the tree above are both `Layout` `rowGap`s; nothing here is a bare `<div>` with manual spacing.

**No margins on children, ever.** `image`, `caption` and `note` set no outer spacing of their own — `root` and `legend` own both gaps, and section 7(c) found no optical correction that would need one.

**Nothing here overrides a `Section` from outside.** `Figure` is not a `Section` and contains none; it accepts no `className`, `style` or `id` with which a caller could reach into it, and it imposes no background, padding or max-width of its own on whatever contains it.

## 11 · Accessibility

**Semantics and elements.** `<figure>` and `<figcaption>` are native HTML, and the pairing is what associates the caption (and the note, both living inside the one `<figcaption>`) with the image as its accessible description — no `aria-label` and no `aria-describedby` are needed for that link to exist. `image.alt` is the image's accessible name, required whenever `image` is present (section 3) — never empty by convention for this component, because a product screenshot is evidentiary content, not decoration (contrast `ListCard`'s thumbnail, where `alt=""` is common because the title and body already carry the row's meaning). **`alt` must not restate the caption verbatim** — `alt` describes what the image shows; the caption and note explain what it means and what it does not establish. They are written for different reading orders and should not be the same sentence.

**Keyboard, key by key**

| Key | Behaviour |
|---|---|
| `Tab` / `Shift + Tab` | Nothing in `Figure` is focusable. Focus passes over it entirely, in DOM order, exactly as if it were plain text on the page |
| `Enter`, `Space` | Nothing to activate |
| `Escape`, arrow keys, `Home` / `End` | **Deliberately unbound.** Nothing here opens, scrolls itself or holds a selection |

**Focus order.** Not applicable — there is no focusable node, so there is no order to state and no state change to move focus after (section 5).

**ARIA, per state.** None. No state exists to attach one to, and the native `<figure>`/`<figcaption>` pairing already supplies the association a landmark or `aria-describedby` would otherwise be reaching for.

**Where ids come from.** `Figure` generates no id, accepts none, and holds no idref of any kind — the same clean answer `PageHero.md` §11 gives, for the same reason: there is no attribute anywhere in this component that could point at an element that is not rendered.

**The focus ring.** None. Nothing here can take focus, so no ring token exists and none is drawn.

**Contrast floors, restated.** All six text cells in section 6 clear 4.5:1; the tightest are 4.91:1 and 4.92:1, both values this system has already shipped at that exact ratio in `PageHero`. **The rule is exempt, as decoration** — see section 6: it carries no information, it makes a slight distinction from the ground, and holding it to a floor is what made it too loud in the first place. Nothing about the caption or the note moved. The disabled exemption is not used — there is no disabled state — and there is no colour-only state, vacuously, there being no state.

**Reduced motion.** Nothing here moves (section 13).

**What a screen reader says.** For an image with a caption and a note, reading through in browse mode:

> "Fictional approval-queue surface interface with a bar chart, graphic. Fictional approval-queue surface. Bars compare 31 current records with a projected set."

The image's `alt` is announced first, as its accessible name; the caption and the note follow as the two paragraphs they are, read in the order they appear, with no added prefix. Whether the browser/AT pair additionally announces the word "figure" on entering the element varies **[assumed]** — the caption-to-image association does not depend on that word being spoken, only on the native element pairing itself. For the empty-state case (no `image`), the same figure reads as the caption and note alone, with no image announced and no broken-image indication of any kind, because no `<img>` is rendered at all.

## 12 · Content edge cases

| Case | Required handling |
|---|---|
| **1 · Longest realistic string** | The longest of the brief's own reference lines is 78 characters (`Illustrative page preview: foundation tokens, a component family and states.`). It wraps normally inside `--measure-body`; captions are read prose, not a shape glimpsed at once like a heading, so there is no balanced-wrapping requirement the way `PageHero`'s title has one. No `line-clamp`, no truncation, ever |
| **2 · One long unbroken token (a URL)** | `caption` and `note` break inside the word rather than overflow. `Figure` never produces a horizontal scrollbar at any width, for any text content |
| **3 · Zero items** | The image and the note are both optional; `caption` cannot be zero by type (section 3). With both optional slots empty, `Figure` renders `<figure><figcaption><p>{caption}</p></figcaption></figure>` — a caption alone, with no image element, no placeholder box and no broken-image glyph. This is the brief's own most-consequential question, and it is answered as a first-class, intentional rendering, not a degraded one: the 21 existing lines that name their own missing artefact (e.g. "the original screenshot is omitted because…") are written to be read exactly this way, alone |
| **4 · One item** | Image and caption, no note: `legend` renders one `<p>`, no 8px seam. Caption and note, no image: `root` renders one child, no 16px seam, and `legend` sits at the top of whatever space `root` was given |
| **5 · Many items (2× expected)** | Does not apply structurally — `image`, `caption` and `note` are each exactly one value, never a list, so there is nothing here that repeats. The nearest real question is caption/note length, which row 1 answers: no cap, no truncation, at any length |
| **6 · Missing image or missing optional slot** | This is row 3, restated as the general rule: **an absent optional slot renders no element and no seam.** `image` absent → no `<img>`, no `--fig-rule-ink`, no 16px gap. `note` absent → no second `<p>`, no 8px gap |
| **7 · Empty required-ish text** | `caption=""` renders the empty `<p>` anyway — visible and auditable, never substituted with a fallback string, the same rule `PageHero.md` §12 row 7 applies to an empty `title`. `note=""`, by contrast, is treated as absent (filtered before render, no element, no seam) because `note` is genuinely optional and an empty note is indistinguishable from no note at all. **As built this is a `trim()` test, so a whitespace-only `note` is also absent** — one step beyond what this row asked for, and the same reading `ListCard` already applies to its own optional body. `caption` is deliberately NOT trimmed: a whitespace-only caption renders its `<p>`, because the whole point of the asymmetry is that a required field's emptiness stays visible |
| **8 · The narrow track at 767** | The image scales down with its track at its own intrinsic ratio; `--measure-body` on the legend exceeds the column below about 800px and goes inert, exactly as in `PageHero` and `Breadcrumbs`. Nothing reorders and no media query fires |
| **9 · A parent that does not size it** | Named minimum: **192px, `--fig-min-xs`** (section 7b), matching `ListCard`'s own content-core minimum by value. Below that, `caption` in `--text-caption` starts breaking on very short lines rather than overflowing |
| **10 · Logical properties rather than left/right** | `Figure` has no `margin`, no `padding` and no positioned part anywhere — its only distances are the two `Layout` gaps in 7(a), which are logical by construction, and its only measure is `max-inline-size`. There is no physical-direction property in this component to get wrong |
| **11 · This component's surface nested inside a different one** | Addressed in section 6. All three tokens are declared on all four surfaces, so a `Figure` in a `tint` block between two `ink` sections renders the tint column throughout with no additional handling |
| **12 · Two of this component adjacent** | Unlike `PageHero`, this is an expected, encouraged pattern, not a bug. Stacked in sequence, each `Figure` sets no outer margin, so whatever `Layout rowGap` contains the pair decides the seam between them cleanly — no margin-collapse risk, because gaps are not margins. Side by side in a `Layout columns={2}` for comparison, each `Figure` fills its own track independently; if the two source images differ in intrinsic ratio their bottom edges will not align, which is the honest, accepted cost of never cropping (section 17 Q2) — a caller who wants matched heights reaches for `Layout`'s own `equalRows`, which is the parent's tool, not `Figure`'s |
| **13 · Interactive content inside a slot** | Structurally impossible. `image` is a plain data object of a string and three primitives, `caption` and `note` are `string`s — none of the three props can carry a `ReactNode`, so no control, no link, and no second heading can be passed into any of them. This is the same enforcement mechanism `PageHero.md` §12 row 13 relies on for `title` and `body` |

## 13 · Motion

**Nothing in this component transitions, and nothing moves.** It has no states (section 5), so there is no pair of values to interpolate between, and no `image`, `caption` or `note` re-render triggers anything but a plain content swap.

**Reduced motion.** Nothing to switch off. Under `prefers-reduced-motion: reduce` this component renders identically, because it was already identical under every other condition.

## 14 · Do's and Don'ts

**Do**

1. An absent `image` renders no `<img>` and no `--fig-rule-ink` — inspect the rendered DOM and expect zero `img` elements when the prop is undefined.
2. An absent `note` renders no second `<p>` and no 8px seam.
3. `caption=""` still renders an empty `<p>` — grep the rendered DOM; it must not be replaced with a fallback string.
4. The rendered `<img>`, when present, carries `width` and `height` attributes matching `image.width`/`image.height` exactly, and no CSS `aspect-ratio` or fixed `height` overrides them.
5. `<figcaption>` is always the last child of `<figure>`.
6. Every `image` ships a non-restating `alt` distinct from `caption`'s text.

**Don't**

7. No `object-fit: cover`, no `object-fit: contain`, no crop of any kind on the image — grep the module and expect zero matches (section 17 Q2).
8. No `max-height`, `min-height` or fixed `aspect-ratio` on the image — grep and expect zero matches.
9. No `position: absolute` or `position: fixed` text node inside the `image` part's box — enforces MUST NOT put text over the image.
10. No `background` or fill colour on `root` — enforces MUST NOT own its ground.
11. No margin on any node this component renders — grep `Figure.module.css` for `margin` and expect zero matches.
12. No media query — grep for `@media` and expect zero matches, including the reduced-motion one.
13. No `className`, `style`, `id`, `size`, `variant`, `surface` or `crop` prop accepted — excess-property check at the call site.
14. No placeholder box, skeleton or broken-image glyph rendered in place of a missing `image` — grep the module for any such asset and expect none.

## 15 · Specimen plan

The block list for `/design/figure`, in order.

1. **The matrix, as a note.** 1 variant × 1 size, with the reasoning from section 4 printed beside it — there is no axis to show because there is nothing here that steps.
2. **The slot-presence ladder** — four bands: image + caption; image + caption + note; caption alone (the empty state, labelled with one of the 21 real corpus lines); caption + note with no image.
3. **The shape-stress set** — the same caption and note under a wide landscape screenshot, a tall portrait screenshot, and a small screenshot narrower than its own column, all at one fixed 1240px track, to show the intrinsic-ratio decision holds for all three without cropping or a fixed frame.
4. **All four surfaces as sibling bands with identical markup** — one image + caption + note figure, rendered on `paper`, `tint`, `ink` and `blue`, with section 6's per-surface paragraph beside each band and the rule's contrast annotated on the two surfaces where it is doing the most work (paper and ink).
5. **The nested-surface band** — a `tint` figure between two `ink` sections, with its three resolved values listed.
6. **States: none to force**, as a printed note — there is nothing on this component to point at, hold or tab to, and the note says so explicitly rather than leaving a blank control column.
7. **Every edge case from section 12**, each labelled with its row number: the 78-character caption; a bare URL inside a note; the empty state; caption-only versus caption+note-only; `caption=""` rendered visibly empty; the 767 column; the 192px floor.
8. **Two adjacent, both arrangements** — stacked in sequence with the seam measured, and side by side in a two-column `Layout` using two images of different intrinsic ratios, with the resulting height mismatch left visible and labelled as the accepted cost of section 17 Q2, not a bug.
9. **The component in a narrow track** — 192px and 320px, to show where the caption starts breaking on short lines.

**The squint test.** This is a small, single-purpose component, so its specimen page's variety has to come from the diversity of images it is proven against rather than from internal variants: a wide screenshot, a tall one, a small one, an absent one, four surfaces, two adjacents. Nine bands, no two showing the same shape of content.

## 16 · New token requests

**None — every value in this spec is an existing token.**

`--fig-caption-ink`, `--fig-note-ink`, `--fig-rule-ink`, `--fig-rule-width`, `--fig-caption-text`, `--fig-note-text`, `--fig-min-xs`, `--fig-image-radius` and `--fig-image-shadow` are this component's own component-layer declarations, the layer a new component is expected to add — each resolves to a `--color-*` or `--text-*` name that appears verbatim in `guidelines/docs/vocabulary.md`, and none of them is a request in the sense this section means. Checked against the ramps and found unnecessary: a caption-specific measure narrower than `--measure-body` (the longest reference line still sits comfortably inside 68ch); a new gap step between `--gap-tight` and `--gap-text` for the two seams (the existing 8px/16px pair already gives the 2:1 ratio section 7(a) wants); and a dedicated hairline token narrower than `--border-width-hairline` (1px is already the thinnest border this system draws). No glyph appears in this component at all.

## 17 · Open questions

**1 · The empty state — no image, caption (and note) alone. — ANSWERED, 24 Aug 2026.**

The brief's own most-consequential question. Options were: a placeholder box; caption alone with no image element; or omit the whole figure. **Answered: caption alone, no placeholder, no broken-image glyph** (section 12, row 3). A placeholder promises an image that is coming, which is false for at least some of the 21 corpus lines that explain a permanent, not a temporary, absence; omitting the figure would delete a written evidence note that is the actual content on a page with no other artefact. Rendering the text alone is the only option that is true in every one of the 21 real cases.

**2 · Aspect ratio and crop. — ANSWERED, 24 Aug 2026.**

Options: a fixed ratio and a crop mode, as `ListCard` chose for its thumbnail; or the image's own intrinsic ratio, uncropped. **Answered: intrinsic, uncropped** — `inline-size: 100%`, `block-size: auto`, no `object-fit`. Product screenshots vary too widely in shape for one fixed ratio not to cut small type out of some of them, which is the brief's own reasoning and is why this spec deliberately does not generalise `ListCard`'s answer (Identity).

**3 · Caption position and case. — ANSWERED, 24 Aug 2026.**

Options: caption above the image (label-like, echoing `PageHero`'s `eyebrow`); or below (the native `<figcaption>`-as-last-child convention). **Answered: below**, sentence case, no transform. Above reads as an eyebrow, a role this system already assigns a different meaning to; below is both the standard editorial convention for a caption and the only placement `<figcaption>` supports as the figure's trailing, rather than leading, child without extra ARIA.

**4 · Caption/note alignment when narrower than the image. — ANSWERED, 24 Aug 2026.**

Options: centre the legend under the image; or cap it at a measure and left-align it to the same edge the image starts from. **Answered: capped at `--measure-body`, left-aligned to `root`'s own inline-start edge.** `Figure` has no visibility into any external "text column" a page might have — it only knows its own given track — so aligning to a column it cannot see is not implementable; aligning to its own edge is.

**5 · Whether the image needs a hairline edge. — ANSWERED, 24 Aug 2026.**

Options: no edge at all; a filled inset panel behind the image; or a hairline border on the image itself. **Answered: a hairline border, `--fig-rule-ink`, always present** (section 6, section 7b). The brief names the real problem directly — "on paper a light screenshot has no edge at all" — and a light-UI screenshot on `--color-paper` is close enough in value that its boundary can otherwise disappear. A filled panel was rejected as the kind of decorative ground this system's design bar already argues against (`PageHero.md` §2 cut the same idea for its own byline); a 1px rule on the image itself is a boundary, not a ground, and costs nothing on the three surfaces that do not need it.

**Amended 24 Aug 2026, after looking at it: the rule stays, its weight does not.** The first answer treated the hairline as meaningful and held it to 3:1 on every surface. On the specimen that read as a frame competing with the screenshot inside it. The owner's correction is that the rule's only job is a slight distinction from the ground where one is needed, which makes it decoration — so it now takes the house's decorative ladder (300 / 400 / 700 / brandeis-300) and every cell sits below 3:1 on purpose. Section 6 carries both sets of values and the reasoning for the move.

**6 · Whether `image.width`/`image.height` should be required. — non-blocking. ACCEPTED as recommended, 24 Aug 2026.**

As specified, both are required alongside `src` and `alt`, so the native `<img>` can set them and prevent layout shift while CSS scales the box. **Recommendation: required, as specified.** The alternative — optional, with a shift accepted when absent — trades a known, avoidable defect for a smaller content-authoring burden, and every real image asset already has these two numbers before it is ever uploaded.

**7 · Loading strategy. — non-blocking. ACCEPTED as recommended, 24 Aug 2026.**

`ListCard`'s thumbnail ships `loading="lazy" decoding="async"` unconditionally. **Recommendation: the same, unconditionally, for now.** The one real tension — a `Figure` used as a hero's above-the-fold image would be mis-served by unconditional lazy-loading — cannot be resolved yet because no such use exists: `PageHero` has no image slot (this document's headline finding). Revisit when it does, as a joint amendment to both specs, not as a `priority` prop added speculatively today.

**RESOLVED, 25 Aug 2026 — the joint amendment, and `Figure` is unchanged by it.** `PageHero` gained a `media` slot, so the above-the-fold hero image now exists. It is not a `Figure`: the hero owns its own `<img>` — eager, `decoding="async"`, `fetchPriority="high"`, because a hero image is the LCP element on the routes that have one. See `PageHero.md` §10 and §17 Q3.

So the tension this question named is **resolved by separation rather than by a prop**, which is the better outcome and was not the expected one. `Figure` keeps `loading="lazy"` unconditionally and gains no `loading` or `priority` prop, because every real `Figure` is a page-body figure below the fold. The `Figure.tsx` comment that predicted this amendment has been updated to record it rather than to keep predicting it.

**8 · The caption/note split of the brief's three reference lines. — non-blocking, and a stated assumption. ACCEPTED as recommended, 24 Aug 2026.**

The brief gives three lines and calls them tone samples, not a worked example split across two fields. This spec reads each as a short label sentence followed by a qualifying one, and assigns the first half to `caption` and the second to `note` (section 8). **[assumed]** — if the 21 real lines are not written in this two-part shape, the example copy in section 8 should be swapped for real ones, but the component contract (two independent optional string fields) does not change either way.

**9a · How an image reaches a long-form page at all — the question that decides whether this component is load-bearing. — ANSWERED by the owner, 24 Aug 2026.**

Raised after the build, when a sweep found no existing call site: an article's images could either be embedded in the rich-text body field, in which case `Prose` renders them and `Figure` is never called (a React component cannot go inside an HTML string), or they could be structured fields the template places between prose blocks, in which case `Figure` is the renderer.

**Answered: the block list. Rich text, then a figure, then rich text — and an image never appears inside a body field.** Editors do not inline images; that is the only way a figure stays consistent across the site. The content seam already assumed this shape — `PageBlock`'s discriminant "maps 1:1 onto a pattern in `@/patterns`" — so a `figure` block rendering through this pattern is the model the seam was built for, with `Prose` rendering the text blocks beside it.

This is what makes the component load-bearing rather than ornamental, and it is worth recording why the alternative fails: three of the brief's five hard constraints cannot be expressed inside a body string. `Prose` sets one colour for a whole `<figcaption>`, so **the note** would need a micro-format the CMS must emit correctly forever; `Prose` styles the caption and leaves the image untouched, so **the hairline** that ends a light screenshot on a light ground has nowhere to live; and inside `.prose` an image fills the text measure, so **WIDTH IS THE PARENT'S JOB** — the brief's hardest constraint — becomes unsayable. A body-embedded image is not badly rendered today. It is a different, poorer figure, and two kinds of figure on one site is the inconsistency this answer exists to prevent.

The rule is enforced where sanitisation already happens, in `src/content/sources/*`: a body field arriving with `<img>` or `<figure>` is a content-model violation that should fail loudly rather than be absorbed. Recorded on `PageBlock` in `src/content/types.ts`, in the `strapiSource` stub that will implement it, and on `Prose`'s own `html` prop. Nothing is coded yet, deliberately: there is no page pipeline to hang it on, and a validator with no caller is worse than a stated contract.

**9b · Whether `PageHero`, `ContentSection` or `BlockCard` should gain a slot for `Figure`. — non-blocking, out of scope for this spec. DEFERRED as recommended, 24 Aug 2026.**

`PageHero.md` §17 Q3 already deferred this on the hero side, pending `Figure` existing; `ContentSection` and `BlockCard` do not exist yet to defer anything. **Recommendation: amend `PageHero` separately, once `Figure` ships, adding an `image?: ReactNode` slot** rather than an `image` prop that constructs `Figure` internally — `PageHero` is a pattern and may not import another pattern, so the slot must stay a `ReactNode` the caller fills, exactly as `CtaSection.form` takes `EnquiryForm`. `ContentSection` and `BlockCard` should do the same when they are specified. None of this blocks building `Figure` itself, which asks nothing of any container (section 3).

**ANSWERED, 25 Aug 2026 — `PageHero` gained the slot, and this recommendation was NOT followed.** Recorded here rather than quietly superseded, because the divergence is the interesting part.

The half that held: `PageHero` may not import `Figure`, so it does not — and it does not construct one internally either. The half that did not: the slot is **not** a `ReactNode`. `PageHero.media` is a closed discriminated union of an image and a YouTube embed, and the component owns both renderings. The reason is in `PageHero.md` §3: a `ReactNode` would have put the 16/9 box, the hairline, the four surface inks and the embed's host at the **call site**, on 129 routes, in a tier whose whole job is composition. `CtaSection.form` is not the precedent it looked like — `EnquiryForm` is a whole pattern with its own spec, its own tokens and its own states, and handing it over as a node hands over something already finished. A bare hero image is not finished until somebody has decided its width, its edge and its four surface inks, and the hero is the only thing that can decide those.

So the hero's media is **not a `Figure`**, and that is now a settled distinction rather than an oversight: a `Figure` is an image with a **caption**, and a hero image has no caption — the copy above it is the caption. Nothing about `Figure` changed. `ContentSection` and `BlockCard` are still open, and the question for them is now sharper: does the container need a *captioned* figure (take a `Figure`, or a `ReactNode`) or a bare image it must style per surface (own it, as the hero does)?

**10 · Equalising height across two side-by-side figures. — non-blocking. ACCEPTED as recommended, 24 Aug 2026.**

Section 12, row 12 leaves two adjacent figures with mismatched intrinsic heights when their source images differ in shape. **Recommendation: no built-in equalisation.** `Layout` already has `equalRows`; a caller who wants matched heights sets it on the containing `Layout`, which is where that opinion belongs (WIDTH IS THE PARENT'S JOB extends naturally to height here, since `Figure` never crops to fit one).

---

## Appendix — self-audit

```
STRUCTURE
[x] All 18 sections present, in order, with the exact headings.
[x] Front matter states Tier 2 pattern and token prefix --fig-*, which collides with none of
    the taken prefixes — fourteen when this was written, sixteen when it was built, and none of
    the two that landed in between collides either. Status read `draft` at hand-over, `accepted`
    at sign-off and `implemented` once the code shipped; the front matter is the live value and
    this line is not.
[x] Every part named in Anatomy appears in the colour table, the geometry list, or both.
    Three parts (image, caption, note) carry colour and are the three rows of section 6;
    two (root, legend) carry distance only and are the two rows of 7(a). Five parts, five
    accounted for.

NAMES
[x] Count of distinct token names used: 27 as written. As built it is 26 — --z-base dropped out,
    because the honest way to say "nothing stacks" is to declare nothing (see § 7). Every one appears verbatim in
    guidelines/docs/vocabulary.md, checked ONE AT A TIME. They are: 13 --color-*
    (paper, paper-deep, neutral-950, brandeis-500 as the four grounds; neutral-300/400/
    500/600/700/800; brandeis-50/100/200); 2 --gap-* (text, tight); --text-caption;
    --measure-body; --radius-0; --border-width-hairline; --shadow-none; --z-base;
    --lay-track-xs. Plus 5 of this component's own declarations, listed separately in
    section 16 rather than counted as vocabulary tokens: --fig-caption-ink, --fig-note-ink,
    --fig-rule-ink, --fig-rule-width, --fig-caption-text, --fig-note-text, --fig-min-xs,
    --fig-image-radius, --fig-image-shadow. (As built: the spec wrote one --fig-rule and the
    build split it into ink + width, and named the 192px minimum --fig-min-xs. See § 6 and § 7b.)
[x] Every glyph I named is in the glyph set — vacuously: this component renders no Icon and
    takes no icon-shaped prop.
[x] Every prop and value given for Layout appears in its prop union: as="figure" |
    "figcaption", rowGap="text" | "tight". No Section, Cluster, Button or Icon is used.
[x] Zero hex codes / rgb() / hsl() / colour words outside the contrast measurements.
[x] Zero Tailwind class names. Zero CSS declarations, selectors or @media blocks. Section 14
    names properties and values as things ABSENT from a stylesheet, a testable claim about a
    file rather than a declaration.
[x] Every --text-* role paired with a tracking companion is on the list that has one — moot
    here: --text-caption has none, and section 8 says so rather than inventing one.
[x] Every layout distance is a gap-scale role name. The two steps in 7(a) are the only
    distances in the component.
[x] Every space-ramp reach carries its justification sentence. Count: 0 — section 7(c)
    found no optical correction to make and says why, rather than manufacturing one.
[x] Every literal pixel value is a component size or container cap, t-shirt named where
    applicable, and says what it was measured against. Count: 2, both referenced from other
    components' own tokens (192px --fig-min-xs, matching ListCard's content-core minimum by
    value; 1px --border-width-hairline). Figure declares no pixel value of its own — its one size is
    a percentage, not a literal.

COLOUR AND CONTRAST
[x] The colour table has one row per token and four columns: paper, tint, ink, blue.
[x] No cell is empty, "same as paper", or a delta. Rows: 3 × 4 cells = 12.
[x] Every text colour has a measured ratio against the exact ground it sits on. There is no
    fill or hover state behind any text part, so there is nothing else to measure against.
[x] Every text ratio is >= 4.5:1. The loosest are 4.91:1 (note on blue) and 4.92:1 (note on
    paper), both values already shipped at this exact ratio in PageHero.md. The disabled
    exemption is not used, there being no disabled state.
[x] The rule was held to 3:1 as written (3.16 to 4.39) and is NOT as built: reviewed on the
    specimen, reclassified as decoration by the owner, and moved to the house's decorative
    ladder at 1.54 / 1.90 / 2.10 / 2.64. Both sets of values and the argument are in § 6, and
    § 17 Q5 carries the amendment. Text was untouched: all six caption/note cells still clear
    4.5:1.
[x] Decoration: --fig-rule-ink is it, marked as such in § 6 and in every surface block of
    figure.css. root and legend carry no colour token at all, decorative or otherwise, and
    section 2 says so rather than giving them "n/a" cells here.
[x] One paragraph per surface explains what moved and why, including the tint collision this
    spec had to resolve independently of PageHero's (caption stepping to neutral-800 to stay
    distinct from note, since the two share one type role with no other differentiator).
[x] The nested-surface case is addressed in section 6's closing paragraph.

STATES
[x] Every state I claim comes from the fixed model — I claim none, and section 5 walks all
    seven rows and says why each does not apply.
[x] The rendered hover state differs from the rendered pressed state on all four surfaces —
    vacuously true: there is no rendered hover and no rendered pressed to compare.
[x] Every state token I introduced MOVES on at least one surface — I introduced none. Zero
    --fig-*-hover, -pressed, -expanded, -disabled tokens exist.
[x] Every state token is declared on all four surfaces — vacuously, there being none. All
    five tokens that do exist are declared in all four blocks.
[x] Disabled uses its own tokens and no opacity — vacuous; no disabled state, no opacity
    anywhere in this component, section 14 names the grep.

LAYOUT, TYPE, SEMANTICS
[x] Every arrangement is a Layout. columns is set nowhere, so colGap is never stated —
    both instances are single-track stacks with rowGap only.
[x] No margin on any child, anywhere in the spec.
[x] No media query changes a gap step or a type role — there is no media query in this
    component at all, section 9 and section 14 both say so.
[x] Every part carrying running text names a measure: caption and note both take
    --measure-body, stated in section 8 along with the alignment answer in section 17 Q4.
[x] Every interactive target reaches 44px on touch — vacuous: there is no interactive target
    in this component, and section 9 says so rather than leaving the row silently answered.
[x] Every ARIA idref points at an element that is always rendered — vacuously: no id is
    generated or accepted, and no idref of any kind exists (section 11).
[x] No selector walks upward; no :has(); every state a parent needs is a prop or a class —
    moot, there being no state and no parent-detectable condition this component defines.

COMPLETENESS
[x] All thirteen content edge-case rows answered, including row 3 (the empty state) as the
    brief's own most-consequential question, resolved rather than deferred.
[x] The "parent that does not size it" row names a minimum: 192px, matched to ListCard's own
    precedent rather than invented fresh. As built it is this component's own --fig-min-xs,
    because a component never reads another component's tokens.
[x] Do's and Don'ts are testable: each of the fourteen names the grep or the rendered-DOM
    assertion that decides it.
[x] The specimen plan renders the 1x1 matrix with its reasoning, the slot-presence ladder,
    a shape-stress set proving the no-crop decision against three real image shapes, all four
    surfaces as sibling bands, the nested-surface band, a note that no state can be forced,
    every edge case above, two adjacents in both arrangements, and two narrow tracks.
[x] Section 16 says None, with the token-layer reading of why the five --fig-* declarations
    are not requests, and three ramp values checked and found unnecessary.
[x] Every open question has options, a recommendation, and a BLOCKING / non-blocking mark.
    None blocking: five are answered inline above with their reasoning applied throughout the
    document; five are left open with a recommendation. Status is draft regardless, per the
    brief's own closing instruction, pending the owner's sign-off rather than this document's
    own confidence.
[x] Squint test: the specimen reads as nine different shapes of the same small idea — wide,
    tall, small, absent, four grounds, two kinds of adjacency — not one rectangle repeated.
```
