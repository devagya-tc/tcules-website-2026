# PageHero

## 0 · Front matter

| | |
|---|---|
| **Component** | `PageHero` |
| **Tier** | 2 pattern (`src/patterns/PageHero/`) |
| **Status** | accepted |
| **Token prefix** | `--hero-*` (collides with none of `--btn-` `--crumb-` `--foot-` `--icn-` `--lay-` `--logo-` `--nav-` `--prose-` `--sec-`) |
| **Designer / date** | Design · 21 Aug 2026 |
| **Implements** | COMPONENT NAME: PageHero — the opening block of every page, all 129 routes, exactly once, always first |
| **Implemented at** | — not built |

Verified against the loaded Tcules library (`window.Tcules`, 10 components) and `guidelines/docs/vocabulary.md`. Every contrast ratio in section 6 was computed from the exact hexes in that document; the luminance arithmetic was checked against nineteen ratios already published in `docs/specs/Breadcrumbs.md` and agrees with all nineteen. Assumptions I could not check are marked **[assumed]** and collected in section 17.

**The headline finding, before the form starts.** The brief describes three arrangements — text-left, article hero, case-study hero. There are not three. There is **one arrangement with two independent optional slots**, and the case-study hero is not one of them: 13 of its 14 pages are bare title and body, which is byte-for-byte the text-left hero, and the 14th fills the `eyebrow` slot that 31 other pages already fill. So section 4 is a 1 × 1 matrix, and the brief's lean — one arrangement with a slot that switches — is right but does not go far enough. The author line and the client eyebrow are not two settings of one slot. They are two slots, they are independent, and a podcast episode with a client eyebrow and a host-and-guests byline renders both, in order, with no new code and no new prop.

## 1 · Identity

The opening block of a page: one `h1`, an optional eyebrow above it, one to six paragraphs of lead copy, an optional byline of credits and dates, an optional caller-supplied block, and nought to two actions. It paints its own band. It is the first thing inside `<main>` on all 129 routes and there is never a second one.

**Tier 2 pattern, and the tier is forced twice over.** It takes content shaped like a CMS record — `title`, `eyebrow`, `body`, `credits`, `dates` straight off frontmatter — which the tier rule says makes it a pattern at the least. And it composes `Section`, `Layout`, `Cluster` and `Button`, all four of them primitives; a primitive may not import a primitive, so a hero that arranges itself with `Layout` cannot be one, and hand-rolling flex instead is forbidden. Both roads end at `src/patterns/`.

**What it is NOT**

1. **Not the page's navigation context.** `Breadcrumbs` does that, in its own band directly above, on 128 of 129 routes. It is a pattern, so `PageHero` may not import it, and it does not need to: the two are siblings in the page template and the only thing they share is a `surface` value.
2. **Not the page's body copy.** `Prose` does that, in the `Section`s below, at `--text-body`. The hero's one to six paragraphs are the abstract, not the article — which is why they are `string`s rather than a rich-text field, and why a link belongs in the body and not here.
3. **Not a section header.** A bare `<h2>` inside a `Layout` does that, many times per page. A hero happens once and carries the `h1`; a section header happens often and never does. A component that could do both would be a component that could put a second `h1` on the page, which the hard constraint forbids.

**Nearest existing component, and why this is not a prop on it.** `Section`. It is the wrong home for three separate reasons: `Section` is a tier-1 primitive that arranges nothing above itself and knows nothing about content, so a `title` / `eyebrow` / `credits` API would make a primitive that reads CMS records, which the tier rule forbids outright; a primitive may not import `Layout`, `Cluster` or `Button`, and the hero needs all three; and `Section` is used roughly nine times on a page while the hero is used once, so every band on the site would carry an API that one band uses. The hero **uses** `Section`. It is not a mode of it.

**How many appear on a page.** Exactly one, on all 129 routes, always first inside `<main>`. Never zero — a page with no `h1` is a page with no hero. Never two: two heroes are two `h1`s. Section 12 says what that looks like when it happens and section 14 says which grep catches it.

## 2 · Anatomy

| Part | Element | Required | Content slot | Carries |
|---|---|---|---|---|
| `root` | `<section>`, rendered by `Section surface={surface}` | yes | none | the band — ground, content column and vertical air, all from `--sec-*`. No `--hero-*` value of its own |
| `stack` | `<div>`, `Layout rowGap="stack"` | yes | none | the seam between `opening`, `byline`, `extras` and `actions` |
| `opening` | `<div>`, `Layout rowGap="block"` | yes | none | the seams between `eyebrow`, `title` and `copy` — one step, three children |
| `eyebrow` | `<p>` | no — 32 of 129 | `eyebrow`, uppercased | `--hero-eyebrow-ink`, `--text-eyebrow` and its tracking, `--measure-body` |
| `title` | `<h1>` | yes — exactly one, always rendered | `title`, verbatim | `--hero-title-ink`, `--text-h1` and its tracking, `--measure-title` |
| `copy` | `<div>`, `Layout rowGap="text"` | yes | none | the seam between paragraphs |
| `lead` | `<p>` — the first paragraph | yes | `body[0]`, verbatim | `--hero-lead-ink`, `--text-lead`, `--measure-body` |
| `body` | `<p>` — paragraphs 2…n | no — 95 of 129 have at least one | `body[1…]`, verbatim | `--hero-body-ink`, `--text-body-lg`, `--measure-body` |
| `byline` | `<dl>`, `Cluster as="dl" colGap="block" rowGap="block" align="start"` | no — 15 of 129 | none | both seams between pairs |
| `pair` | `<div>`, `Layout rowGap="inline"` | one per credit group, one per rendered date | none | the seam between `key` and `value` |
| `key` | `<dt>` | one per `pair` | none — the label is the component's, mapped from `role` | `--hero-key-ink`, `--text-micro` and its tracking |
| `value` | `<dd>` | one per `pair` | the joined people, or a `<time>` | `--hero-value-ink`, `--text-body-sm` |
| `extras` | `<div>` | no — 1 of 129 | `children` | nothing of its own — the caller's content reads `--sec-*` from the band it is standing in |
| `actions` | `<div>`, `Cluster colGap="tight" rowGap="tight"` | no — 59 of 129 | `actions`, as `Button`s | both seams. No colour: `Button` owns every value it paints, via `--btn-*` |

Six parts carry colour (`eyebrow`, `title`, `lead`, `body`, `key`, `value`) and they are the six rows of section 6. Seven parts carry distance only (`root`, `stack`, `opening`, `copy`, `byline`, `pair`, `actions`) and they are the seven component rows of 7(a). One part carries nothing at all (`extras`), and that is the point of it: a slot that imposed a colour or a distance on the caller's block would be a slot the caller had to fight.

**There is no `rule` part and no `panel` part.** A hairline above the byline and a tinted box behind the copy were both drawn and both cut: the design bar says visual weight comes from scale, imagery and position rather than from decoration, borders or a tinted band, and a hero that needs a rule to separate its byline from its copy has not used enough air. The 48px seam does that work. Their absence is why section 7 has no border-width token above zero.

## 3 · Props / API

```ts
type HeroCreditRole = 'author' | 'host' | 'guest' | 'reviewer'
type HeroCredit     = { role: HeroCreditRole; people: readonly [string, ...string[]] }
type HeroDates      = { published: string; modified?: string }
type HeroAction     = { label: string; href: string }
```

| Prop | Exact literal union | Default | What it decides |
|---|---|---|---|
| `title` | `string` | none — required | The page's one `h1`, rendered verbatim. A `string` and not a `ReactNode`, which is what makes a second heading impossible to smuggle in |
| `body` | `readonly [string, ...string[]]` | none — required | The paragraphs, in order. `body[0]` renders as `lead` at `--text-lead`; `body[1…]` render as `body` at `--text-body-lg`. Non-empty by type, because all 129 routes have at least one |
| `eyebrow` | `string \| undefined` | `undefined` | Whether the `eyebrow` part exists. Absent renders no element and no seam — it is a slot, not a variant |
| `credits` | `readonly HeroCredit[]` | `[]` | The credit pairs, in array order, before the dates. Empty renders no `<dl>` at all |
| `dates` | `HeroDates \| undefined` | `undefined` | The date pairs. `published` always renders when `dates` is given; `modified` renders only when it is present **and** differs from `published` |
| `actions` | `readonly [] \| readonly [HeroAction] \| readonly [HeroAction, HeroAction]` | `[]` | Nought, one or two controls — the three counts the corpus has, as a type. Position decides emphasis: the first is `solid` / `primary`, the second is `ghost` / `neutral` |
| `surface` | `'paper' \| 'tint' \| 'ink' \| 'blue'` | `'paper'` | The ground this component's own band paints. A prop here rather than an inherited attribute, for the reason below |
| `children` | `ReactNode` | `undefined` | The `extras` row — `/contact`'s `h3` stat block. Renders after the byline and before the actions |

**`surface` is a prop, and it is the one place this spec departs from the global rule.** The rule says `surface` is never a prop, and it is right everywhere it applies: a component that stands inside a band reads `data-surface` from that band and is correct without being told. `PageHero` **is** the band. It has no ancestor that declares a surface, so there is nothing to inherit and the value has to arrive as a prop. `Breadcrumbs` reached the same conclusion for the same reason and shipped with the same prop, so this is a precedent being followed rather than one being set. The composition rule that comes with it: the page template holds one surface constant and passes it to `Breadcrumbs` and `PageHero` both, because a mismatched pair renders as a two-tone split across the seam and neither component can check for it. At launch every route takes the default and no route passes the prop at all.

**Deliberately NOT props**

| Not a prop | Why |
|---|---|
| colour, padding, gap, radius, height, width | The token layer owns colour; `Section`, `Layout` and `Cluster` own distance; the component owns its own sizes. A caller with an opinion about any of these has an argument with the system, not a prop |
| `density` | `Section` has `tight` and `open` and the hero uses neither. One band shape on 129 pages is the thing that makes a page opening recognisable; a route that wanted 64px of air would be asking for a quieter hero, which is a content problem |
| `variant`, `size` | One variant, one size — section 4 gives the matrix and the four rejections |
| `align`, `centred` | A centred hero cannot hold six paragraphs at `--measure-body` without becoming a column of ribbons, cannot hold a left-set `<dl>`, and would need a second measure regime. The whole site grid is left-set |
| `as`, `headingLevel`, `titleAs` | The title is an `h1`. The hard constraint is that this is the only place an `h1` can appear, and a level prop is how that constraint gets broken by a route six months from now |
| `image`, `media`, `figure` | Section 17 Q4. Zero images in the corpus, no image component, no `next/image` precedent, and `Figure` (brief 13) unbuilt. A slot added now would carry three undecided answers — aspect ratio, crop, empty state — with nothing to test them against |
| `icon` on a `HeroAction` | Nought of the 59 actioned heroes needs a glyph. An optional prop nobody uses is an invitation; when a download action arrives it is a one-line amendment to `HeroAction` |
| `showByline`, `hideDates`, `dateFormat`, `authorLabel` | The byline's presence is its content's presence. The labels and the date format are decisions this spec makes once (section 8, section 11) — a hero whose date read differently on one route is a bug |
| `breadcrumb`, `items` | `Breadcrumbs` is a pattern and so is this; a pattern may not import a pattern. They are siblings, and the template composes them |
| `className`, `style`, `id` | The props interface is closed. The only reason to reach in would be outer spacing on the band, and the page owns that by ordering its bands |

**Compile errors, not review comments**

1. **Three or more actions.** `actions` is a union of a 0-, a 1- and a 2-tuple, so a third entry has no member to match. The hard constraint is 0 / 1 / 2 and this is that constraint as a type.
2. **An empty `body`.** `readonly [string, ...string[]]` has no empty member. A hero with no copy is not a runtime fallback case; it is a call site that does not compile.
3. **A credit group with no people.** `people` is the same non-empty tuple. `{ role: 'guest', people: [] }` would have rendered a "With" label above nothing.
4. **A `role` outside the four.** The literal union, so a typo fails at the call site rather than rendering an unmapped label.
5. **`title` as an element.** It is `string`. `title={<span>…</span>}` does not compile, and that is the mechanism that enforces one `h1` per page — not a lint rule, not a review.
6. **`modified` without `published`.** `published` is required on `HeroDates`, so a modified-only date cannot be expressed.
7. **`className`, `style`, `id`, `variant`, `density`, `headingLevel`.** No `HTMLAttributes` spread and no index signature, so excess-property checking rejects all of them at the call site.

Depth of `body` beyond six is **not** a compile error — see section 12, row 5, and section 17 Q8.

## 4 · Variants × sizes

| | `md` (only size) |
|---|---|
| `default` (only variant) | the component |

A 1 × 1 matrix, and it is the most consequential decision in this document.

**The three arrangements in the brief are one arrangement.** Laid against each other by part:

| | text-left (100) | case-study (14) | article (15) |
|---|---|---|---|
| `eyebrow` | filled on 18 | filled on 1 | filled on 13 |
| `title` | always | always | always |
| `lead` + `body` | always | always | always |
| `byline` | never | never | always |
| `extras` | 1 (`/contact`) | never | never |
| `actions` | 0 / 1 / 2 | 0 | 0 / 1 |

No row differs in **arrangement**. Every difference is a slot that is filled or is not, and the two slots that do the differentiating — `eyebrow` and `byline` — are independent of each other, so the matrix of what can render is 2 × 2 and not a three-way switch. The case-study hero in particular is not an arrangement at all: 13 of its 14 pages are bare title and body, which is the text-left hero exactly, and the 14th fills the eyebrow with `ConnectX · AI-native building energy product`, which is the same slot that 31 non-case-study pages fill with a category. A `variant="caseStudy"` would have been a name for a page family, styled identically to the default, and the first thing it would have done is make the eyebrow a consequence of the variant — which the hard constraint forbids in as many words.

**Steps with the single size:** nothing, there being one.

**Deliberately does not step:** the band density (one shape on 129 pages, so a reader learns one page opening); the two measures (`--measure-title` on the title, `--measure-body` on everything that runs); every gap step in 7(a); and `Button size="md"`, which is the hero's action size on every route because `md` is the site's default control height, and a hero whose buttons were taller than every other button on the site would be making a claim about its actions that the design does not intend.

**Variants considered and rejected**

| Rejected | Why |
|---|---|
| `variant="article" \| "caseStudy" \| "default"` | Three names for one arrangement. The moment they exist a route asks for `article` on a non-article, and the eyebrow becomes variant-driven, which the brief rules out |
| `variant="imageRight" \| "imageBelow"` | Deferred, not designed — section 17 Q4. Zero images in the corpus and no `Figure`. When `Figure` lands, the hero takes it as a `ReactNode` in a new slot and the arrangement question gets asked against real images, at which point it is a real question |
| `size="sm" \| "lg"` | A second size exists to line up with something, and there is nothing for a hero to line up with — it is the largest block on the page by definition. A small hero is a section header, which is a bare `h2` and needs no component |
| `variant="centred"` | Cannot hold six paragraphs, cannot hold the left-set `<dl>`, needs a second measure regime, and disagrees with every other band on the site |
| `variant="split"` (title left, copy right, `columns={[3,2]}`) | Genuinely tempting, and it fails on the paragraph count. Six paragraphs in a two-fifths track is a 480px ribbon beside a short title, and 27 of 129 routes have four or more. A hero that breaks on a fifth of the site is not a variant, it is a bug with a name |

## 5 · States

**None of the fixed model's states applies to any part of this component**, and the whole of section 5 is that assertion with its reasons.

| State | Suffix | Applies to | Why not |
|---|---|---|---|
| rest | *(none)* | every part | The only rendering. This row is the component |
| hover | `-hover` | nothing | No part of `PageHero` responds to a pointer. The `Button`s inside it do, through `--btn-*-hover`, which is their spec's business |
| focus, keyboard | `-hover` + ring | nothing | Nothing the component renders is focusable. The `Button`s are, and anything the caller puts in `extras` may be |
| pressed | `-pressed` | nothing | As hover |
| held: active / selected / current | `-pressed` | nothing | A hero is never "the current one". There is one per page, so there is nothing for it to be current among |
| disabled | its own tokens | nothing | A page opening cannot be unavailable. No `--hero-disabled-*` token exists |
| expanded / open | `-expanded` | nothing | Nothing opens. No disclosure, no `aria-expanded`, no idref pointing at a panel that is not rendered, and no focus to place after a change that never happens |

**So zero `--hero-*` state tokens exist**, and their absence is the assertion that this component's rendering is a function of its props alone: given the same props it renders the same pixels at every moment of its life, on every surface, at every width.

**The hover-differs-from-pressed rule, answered rather than dodged.** The component has no rendered hover and no rendered pressed, so there is no pair of renderings that could be identical. The only stateful thing standing in the band is `Button`, whose own spec satisfies the rule on all four surfaces — and the reason that is enough is that `Button` is the only thing in the band a pointer can reach.

**Loading and error.** Not in the model, and nothing here is asynchronous. Every value the component renders is in the frontmatter before the page is built. There is no skeleton, no placeholder copy, and section 12 row 7 says what an empty title does instead of substituting a string.

## 6 · Per-surface colour

Six tokens, four surfaces, twenty-four cells, no deltas. `paper` values are declared on `:root, [data-surface=paper]`, following `nav.css`, `button.css` and `breadcrumbs.css`.

| Token | paper (`--color-paper`) | tint (`--color-paper-deep`) | ink (`--color-neutral-950`) | blue (`--color-brandeis-500`) |
|---|---|---|---|---|
| `--hero-title-ink` | `--color-neutral-900` — **14.62:1** | `--color-neutral-900` — **13.05:1** | `--color-white` — **17.26:1** | `--color-white` — **6.23:1** |
| `--hero-lead-ink` | `--color-neutral-800` — **11.81:1** | `--color-neutral-800` — **10.54:1** | `--color-neutral-100` — **14.47:1** | `--color-brandeis-50` — **5.57:1** |
| `--hero-body-ink` | `--color-neutral-700` — **8.15:1** | `--color-neutral-700` — **7.27:1** | `--color-neutral-300` — **11.07:1** | `--color-brandeis-100` — **4.91:1** |
| `--hero-value-ink` | `--color-neutral-800` — **11.81:1** | `--color-neutral-800` — **10.54:1** | `--color-neutral-100` — **14.47:1** | `--color-brandeis-50` — **5.57:1** |
| `--hero-eyebrow-ink` | `--color-neutral-600` — **4.92:1** | `--color-neutral-700` — **7.27:1** | `--color-neutral-400` — **8.05:1** | `--color-brandeis-100` — **4.91:1** |
| `--hero-key-ink` | `--color-neutral-600` — **4.92:1** | `--color-neutral-700` — **7.27:1** | `--color-neutral-400` — **8.05:1** | `--color-brandeis-100` — **4.91:1** |

Every ratio is text against **the ground it actually sits on**, which here is always the band's own ground: this component paints no fill behind any part, has no hover or pressed fill to measure against, and draws no rule. The absence of every `--hero-*-bg-*` token is the assertion that nothing in the hero is boxed. There is no decoration row and therefore no "n/a — decoration" cell, because there is no decoration — the parts that carry no colour (`root`, `stack`, `opening`, `titles`, `copy`, `pair`, `extras`, `actions`) carry no colour *token*, not a decorative one, and section 2 marks each of them.

**The focus ring has no row**, and that is a consequence of section 5: nothing the component renders can take focus. The rings that appear inside the band belong to `Button` and are measured in `Button`'s spec against `--btn-ring-gap-color` on all four surfaces. `PageHero` declares no ring token, which is the assertion that it never draws one.

**A check on the values, not a shortcut.** Four of these rows land on mappings the surface layer already makes — `--hero-title-ink` reproduces `--sec-ink`, and `--hero-eyebrow-ink` reproduces `--sec-ink-label` on all four surfaces. That agreement is worth knowing, because it says the values were derived the way the system derives its own. It is **not** a reason to alias `--sec-*`. A component token that reads a surface token silently follows it the day the surface layer is re-tuned, which is how a page opening ends up quieter than it was specified to be with nobody having decided that. Declare the `--color-*` value.

**paper.** The baseline, and a three-step ramp: the title at `--color-neutral-900` (14.62:1) is the loudest ink on the page; the lead and the byline values sit together at `--color-neutral-800` (11.81:1); the body paragraphs drop to `--color-neutral-700` (8.15:1); and the two mono labels — the eyebrow and the credit keys — sit quietest at `--color-neutral-600` (4.92:1), which they can afford because mono, semibold and `--text-eyebrow-tracking` already make them read louder than their size. The lead and the byline value share an ink deliberately: the two things a reader takes from an article opening are what it is about and who wrote it, and at 20px and 14px respectively they need the same weight of ink to arrive together. Nothing here is blue, because blue in this system means clickable and appears on nothing that is not — the only blue in the band is inside a `Button`.

**tint.** The title and the lead hold their ramp steps, losing about a point of ratio each to the deeper ground and staying far clear of the floor. The one real move is at the quiet end, and it is a measured one: `--color-neutral-600` on `--color-paper-deep` computes **4.39:1** and fails the 4.5 floor, so the eyebrow and the credit keys step to `--color-neutral-700` — which is where the body paragraphs already are. On tint, and only on tint, those three parts share an ink. They stay distinguishable by family, case and tracking rather than by colour, which is the rule anyway; and the alternative — leaving 600 in place because it is "nearly" 4.5 — is exactly the class of failure a deltas-only table produces.

**ink.** The direction inverts and the ramp gets more room. The title lifts to `--color-white` (17.26:1), the lead and the byline values to `--color-neutral-100` (14.47:1), the body to `--color-neutral-300` (11.07:1) and the mono labels to `--color-neutral-400` (8.05:1) — the same step `Breadcrumbs` lifts its links to on this ground, so a trail and an eyebrow standing 96px apart on an ink band are the same grey rather than two greys. Every cell on ink is at least 8:1, which is the surface where a serif display title at 67px is most at risk of looking thin; the ink is not the reason it reads, but it is the reason it does not shimmer.

**blue.** The ramp runs out and the three-step structure survives on the last three values it has. White for the title (6.23:1), `--color-brandeis-50` for the lead and the byline values (5.57:1), `--color-brandeis-100` for the body and both mono labels (4.91:1) — the tightest cells in the table, and the reason nothing quieter than 100 is allowed on this ground. One consequence to accept knowingly: on blue the eyebrow and the body paragraphs are the same ink, as they are on tint, so blue and tint both lose the eyebrow's colour distinction and keep its typographic one. A blue hero has 71 fewer available steps than a paper one, and this is what that costs.

**Nested surfaces.** `PageHero` paints its own band, so it is never nested in the ordinary sense — but the band is a `[data-surface]` scope, and the six tokens resolve from whichever block that attribute selects. A `tint` hero standing between two `ink` bands renders the tint column: an 11.81:1 lead on `--color-paper-deep`, not `--color-neutral-100` stranded on a light ground at **1.13:1**, which is the measured failure the brief cites and which is a failure of a deltas-only table rather than of a component. The same applies inside the band: anything the caller passes to `extras` reads `--sec-*` from the hero's own surface, so a `Layout` of stats inside a `blue` hero is white-on-blue and not neutral-900-on-blue. What `extras` may **not** contain is another `Section` — the content column would inset twice — and section 12 row 11 says so as a rule.

## 7 · Geometry & spacing

**(a) Distances — gap-scale role names only**

| Where | Role | Owner |
|---|---|---|
| `eyebrow` → `title` → `copy` | `--gap-block` | `opening`'s `rowGap` — head to body inside a block, the most used step |
| paragraph → paragraph inside `copy` | `--gap-text` | `copy`'s `rowGap` |
| `opening` → `byline` → `extras` → `actions` | `--gap-stack` | `stack`'s `rowGap` — block to block inside a section |
| `key` → `value` inside a `pair` | `--gap-inline` | `pair`'s `rowGap` — a key and its value, which is what this step is for |
| `pair` → `pair`, both axes | `--gap-block` | `byline`'s `colGap` and `rowGap` |
| action → action, both axes | `--gap-tight` | `actions`' `colGap` and `rowGap` |
| the band's own vertical air | `--sec-padding-y` (96px) | `Section`, at its default density. Not this component's to set |
| `root` → whatever precedes or follows it | none | **the page**, by ordering its bands. `PageHero` sets no outer spacing |

Five of the nine steps, and the non-uniform rhythm comes entirely from nesting rather than from a knob: 24 inside the opening, 16 between paragraphs, 48 between blocks. Tighten by grouping, loosen by separating — which is why `stack`, `opening` and `copy` all exist as parts even though none of them renders anything visible. They are the three levels the rhythm needs.

**The eyebrow sits at `--gap-block`, not `--gap-tight`, and that is a deliberate reversal.** 8px under a 12px label reads as a caption stuck to the title — a subtitle in the wrong place. 24px reads as a label *above* a title, which is what an eyebrow is: it names the category the page belongs to, not the page. It also means `opening` is one `Layout` with three children rather than two nested ones, because the eyebrow-to-title seam and the title-to-copy seam are now the same step. One fewer part, one fewer level, identical pixels.

The byline's two steps are the one place the ratio does real work: 4px between a key and its value against 24px between one pair and the next is a six-fold difference, so a `Written by / Alice Chen and Ben Ndlovu` block reads as one unit and the three units read as a row, with no rule, no dot and no separator character between them. That is the same result `SiteFooter` gets from `--foot-meta-key-tracking` and it is the reason the byline needs no decoration.

**(b) Component sizes — t-shirt named, each measured against something real**

| Name | Token | Value | Measured against |
|---|---|---|---|
| `title` measure | `--measure-title` | 22ch ≈ 594px at `--text-h1` | `--sec-container` 1240px. The title takes 48% of the column and leaves the right half open, which is the hero's silhouette and the reason it does not need a second column to look composed |
| `copy` measure | `--measure-body` | 68ch ≈ 748px at `--text-lead`, ≈ 673px at `--text-body-lg` | The same 1240px column. Answers the brief's open question 3: the measure is one value and it does not narrow at six paragraphs — a hero that tightened its measure as its copy grew would turn its longest pages into ribbons |
| `eyebrow` measure | `--measure-body` | 68ch ≈ 548px at `--text-eyebrow` | The longest eyebrow in the corpus, `CONNECTX · AI-NATIVE BUILDING ENERGY PRODUCT` at 44 characters, which measures about 380px uppercased and sits on one line. The measure is there to cap the one that does not |
| action height | `--btn-height-md` | 40px | The site's default control height. It is 4px short of `--btn-hit-min` 44px, which is why every action sets `extendHitArea` — see section 9 |
| minimum inline size | — | 320px, `--lay-track-md` | The longest single word in a corpus `h1` — "Modernisation", 13 characters — which still fits at `--text-h1`'s 767 re-declaration **[assumed]**. Below 320 the component renders and breaks inside words |
| two-adjacent dead air | — | 192px, 2 × `--sec-padding-y` | The visual tell of the bug in section 12 row 12: two 96px band paddings meeting between two display titles |

Six values, of which three are declared and three are computed consequences stated so a reviewer can check them.

**Which track this component was measured against:** the full content column — `--sec-container` 1240px with `--sec-gutter` 32px sitting outside it — because the hero is always a band and its `stack` is always a single-track `Layout`. It is never a grid track child, and section 12 row 9 says what to do about the case where somebody makes it one. The 392px three-up track appears nowhere in this component.

**(c) Optical corrections reaching the space ramp — none, and why**

There is a real correction available and this spec declines it. Newsreader at `--text-h1` carries a left side-bearing that sets the title's ink a couple of pixels inside its box, while the mono eyebrow above it starts nearly at its own box edge, so on the pages that have both, the two left edges do not quite agree. Pulling the title inline-start by `--space-2` would fix that — and would be wrong, because the eyebrow is absent on 97 of 129 heroes. A correction measured against a part that usually is not there would move the title's left edge depending on whether a route happened to fill a slot, which is a worse fault than the 2px it removes: the title's left edge is the strongest vertical line on the page and it must be in the same place on all 129 of them.

So the component reaches into `--space-*` nowhere, and it carries **no margin on any node**, which keeps layout rule 2 intact with zero exceptions. `Prose`'s documented margin exception does not apply here, because every paragraph in this component is a React child that a `Layout` can hold.

**Radius.** `--radius-0`. No part of this component has a box, so there is no corner to round. The `Button`s bring `--btn-radius`.

**Border width.** `--border-width-0`, everywhere, as a decision rather than an omission — see the note at the end of section 2. Nothing is ruled, bordered or underlined.

**Shadow.** `--shadow-none`. Nothing here is elevated and nothing draws a ring.

**Z-layer.** `--z-base`. Nothing in this component stacks above anything. It is the first band in `<main>` and `SiteNav` sits above it at `--z-sticky`, which is `SiteNav`'s business.

## 8 · Typography

| Part | Role | Tracking companion |
|---|---|---|
| `eyebrow` | `--hero-eyebrow-text: var(--text-eyebrow)` | `--text-eyebrow-tracking` |
| `title` | `--hero-title-text: var(--text-h1)` | `--text-h1-tracking` |
| `lead` | `--hero-lead-text: var(--text-lead)` | none — this role has no tracking companion |
| `body` | `--hero-body-text: var(--text-body-lg)` | none — this role has no tracking companion |
| `key` | `--hero-key-text: var(--text-micro)` | `--text-micro-tracking` |
| `value` | `--hero-value-text: var(--text-body-sm)` | none — this role has no tracking companion |
| `actions` | — | `Button` owns it, through `--btn-text-tracking` |

**Three families in one band, and that is the design.** The title is display serif, the copy is sans, the byline keys are mono. A hero built from one family is a hero that has to earn its structure from rules and boxes; a hero with three families gets it from the type, which is what the design bar means by weight coming from scale and position rather than decoration. Squint at it and it reads as three things — a big serif statement, a block of grey text, a row of small mono keys — not as one rectangle.

**Why the lead and the body are different roles.** `body[0]` at `--text-lead` (20px) and `body[1…]` at `--text-body-lg` (18px) gives the copy an internal hierarchy that scales from one paragraph to six without a prop and without a count-driven rule the caller cannot see: one paragraph is a lead, six are a lead and five paragraphs. The 18px matters as much as the 20px — the page's `Prose` body runs at `--text-body` (16px), so the hero's paragraphs stay above body scale and continue to read as hero copy even on the two pages that have five and six of them.

One measured consequence, stated because a reviewer will find it: `ch` resolves against each part's own role, so the lead's measure computes about 75px wider than the paragraphs beneath it. That is a 10% difference down the left-set column and it reads as a lead rather than as an error. The alternative — one measure declared on `copy` — would resolve against the band's inherited `--text-body` and come out narrower than either.

**Measure.** `title` takes `--measure-title`. `lead`, `body` and `eyebrow` take `--measure-body` — the eyebrow included, because a 44-character phrase is running text however small it is set. `key` and `value` take none: a mono role label and a joined list of two or three names are labels, and the byline's `Cluster` caps the row by wrapping.

**Case — a decision, and it agrees with a sibling spec.** The eyebrow renders **uppercase**. It is the one `text-transform` in the component and the only part that has one. `--text-eyebrow` is a mono semibold role with `--text-eyebrow-tracking` on it, and tracking that wide exists for capitals — set lower-case, a tracked mono label reads as letter-spaced body text rather than as a label. Uppercasing also settles the brief's open question 2 outright: the trail above is sans and verbatim, the eyebrow below is mono, tracked and capitalised, so the two short labels differ in family, case, tracking and size, and `Breadcrumbs.md` §8 keeps all four of the differentiators it claims. The 96px of `--sec-padding-y` between them is then the fourth defence rather than the only one.

What uppercasing costs, stated so nobody rediscovers it: the corpus's longest eyebrow becomes `CONNECTX · AI-NATIVE BUILDING ENERGY PRODUCT`, which loses the internal shape of `ConnectX` and of `AI-native`. That is the price of a label that reads as a label, and at 44 characters it still sits on one line inside `--measure-body`. The transform is applied in CSS, not in the data, so the frontmatter keeps the authored casing and a future decision to reverse this is one declaration.

The `title` is **verbatim** and takes no transform. So is every other part.

Example copy, exactly as it would be authored — the eyebrow in sentence case, uppercased at render:

- eyebrow — `ConnectX · AI-native building energy product`
- title — `A building energy product that pays for its own rollout`
- key — `Written by`

## 9 · Responsive

**At 1023 — nothing in this component changes.** No DOM change, no reordering, no gap change, no type change. `--text-h1` re-declares itself at 1023 in the type layer **[assumed]**, and `PageHero` must not touch it; because both measures are `ch`-based they follow the type down on their own, with no media query and no second value to keep in sync.

**At 767 — nothing in this component changes either.** The `stack` is single-track at every width, so there is nothing to collapse. The `byline` `Cluster` wraps to one pair per line by itself, at `--gap-block`. The `actions` `Cluster` wraps by itself, at `--gap-tight`, and each `Button` keeps its 48px. The measures exceed the content column below about 800px and go inert, which is the correct behaviour and needs no rule.

**What must not change:** the part order, the band density, the four gap steps, the two measures, the six type roles. `PageHero.module.css` contains **zero media queries**, and section 14 names the grep.

**The gap scale does not shift responsively.** `--gap-tight`, `--gap-text`, `--gap-block`, `--gap-stack` and `--gap-inline` are the distances at 1440 and at 375 alike. No media query in this component may swap a gap step or a type role.

**Touch targets — 44px, reached by extending the hit area past the box, not by stepping the size up.** Every action is `Button size="md"`, whose box is `--btn-height-md` 40px — 4px short of `--btn-hit-min` 44px — so every action also sets `extendHitArea`, which is `Button`'s own mechanism for reaching the floor without changing the box. That is the choice between the two legal means, and the reason it is the right one here is that the alternative would have made the hero's controls 48px while every other control on the site stayed at 40: the row would move, and the hero would be claiming a loudness the design does not intend. The extension is a transparent overlay on the control's own block axis, so the `--gap-tight` seam between two actions is unaffected and the `actions` row does not grow. The component renders no other interactive element; anything the caller puts in `extras` reaches the floor by its own means.

## 10 · Composition

```jsx
// The page template composes the two bands as siblings. Breadcrumbs is a pattern and
// PageHero is a pattern, so neither may import the other. Both take `surface`, because
// both paint their own band — one constant, passed twice, or the seam goes two-tone.
<main>
  <Breadcrumbs items={frontmatter.navigation.breadcrumb} surface={surface} />
  <PageHero surface={surface} title={…} body={…} eyebrow={…} credits={…} dates={…} actions={…} />
  {/* the page's body Sections follow */}
</main>

// Inside PageHero
<Section surface={surface}>                                {/* root — band, column, 96 of air */}
  <Layout rowGap="stack">                                  {/* stack — 48: block to block */}

    <Layout rowGap="block">                                {/* opening — 24: label, title, copy */}
      <p>{eyebrow}</p>                                     {/* eyebrow — no element when absent */}
      <h1>{title}</h1>                                     {/* title — the page's only h1 */}
      <Layout rowGap="text">                               {/* copy — 16: paragraph to paragraph */}
        <p>{body[0]}</p>                                   {/* lead — --text-lead */}
        <p>{body[1]}</p>                                   {/* body — --text-body-lg, ×0-5 */}
      </Layout>
    </Layout>

    <Cluster as="dl" colGap="block" rowGap="block" align="start">   {/* byline — 24 both axes */}
      <Layout rowGap="inline">                             {/* pair — 4: key over value */}
        <dt>Written by</dt>
        <dd>Alice Chen and Ben Ndlovu</dd>
      </Layout>
      <Layout rowGap="inline">
        <dt>Published</dt>
        <dd><time dateTime="2026-03-03">3 March 2026</time></dd>
      </Layout>
    </Cluster>

    <div>{children}</div>                                  {/* extras — no element when absent */}

    <Cluster colGap="tight" rowGap="tight">                {/* actions — 8 both axes */}
      <Button as="a" href={actions[0].href} emphasis="solid" tone="primary" size="md" extendHitArea>
        {actions[0].label}
      </Button>
      <Button as="a" href={actions[1].href} emphasis="ghost" tone="neutral" size="md" extendHitArea>
        {actions[1].label}
      </Button>
    </Cluster>

  </Layout>
</Section>
```

**No hand-rolled grid or flex for arrangement.** Every distance in the tree above belongs to a `Section`, a `Layout` or a `Cluster`. The one inline-flex inside the band is `Button`'s, centring a label in one control box, which is not arrangement and is allowed. `columns` is set nowhere in this component, so `colGap` is stated only on the two `Cluster`s that have a genuine inline seam and is omitted from every `Layout`, all three of which are single-track stacks with no column seam to size.

**No margins on children, ever.** Zero margins in `PageHero.module.css`, zero reaches into `--space-*`, and section 7(c) says which correction was available and why it was declined.

**Never override `Section` from outside.** No horizontal padding, no `max-width`, no background, no colour — and no `className`, `style` or `id` prop exists to try any of them with. The only thing the caller decides about the band is which of the four grounds it paints.

## 11 · Accessibility

**Semantics and elements.** `root` is `Section`'s default `<section>`, **unlabelled and deliberately not a landmark**. `SiteNav` owns `banner`, `main` owns `main`, `SiteFooter` owns `contentinfo` and `Breadcrumbs` owns its `navigation`; a fifth landmark at the top of every page would be one more region to navigate past rather than to. `<section>` is kept over `<div>` because the hero is a self-contained thematic opening and because adding `aria-labelledby` later is then a one-line change — section 17 Q6 holds that question open. `title` is `<h1>`, exactly one, always rendered. `byline` is a `<dl>`, each `pair` a `<div>` holding one `<dt>` and one `<dd>`, which is the structure HTML has for key-and-value metadata and the reason the byline needs no punctuation to be understood. Dates are wrapped in `<time dateTime>` with an ISO value.

**Keyboard, key by key**

| Key | Behaviour |
|---|---|
| `Tab` | Moves through the band in DOM order, which is visual order: any focusable content in `extras`, then the first action, then the second. No `tabindex` anywhere, positive or otherwise |
| `Shift + Tab` | The reverse, same order |
| `Enter` | On an action, follows its `href` — `Button`'s behaviour as an anchor, not this component's |
| `Space` | Nothing. The actions are anchors (`as="a"`), and an anchor does not activate on Space. Deliberate: a hero action always navigates, so it is a link, and making it respond to Space would be making it lie about what it is |
| `Escape` | **Deliberately unbound.** Nothing here opens, so there is nothing to close, and binding it would take it from whatever the page does bind it to |
| Arrow keys | **Deliberately unbound.** Nothing here is a composite widget or a list with a selection. A hero that ate an arrow key would have stolen the page's scroll |
| `Home` / `End` | **Deliberately unbound**, for the same reason |

**Focus order, and where focus goes after a state change.** DOM order throughout, and DOM order equals visual order at every width because `stack` is a single-track `Layout` that never reflows. **Focus never moves as a consequence of this component**, because the component has no state changes — nothing opens, closes, toggles or replaces content (section 5). That is the whole answer to the question, and it is the payoff of a component with no states.

**ARIA attributes, per state.** None, there being no states and no ambiguous semantics. No `aria-label` on the root, because it is not a landmark and an unlabelled `<section>` is exposed as a generic container. No `aria-current`, no `aria-expanded`, no `aria-describedby`. The only ARIA in the band arrives with a `Button` or with the caller's `extras` content.

**Where ids come from, and what an idref does when its target is absent.** The component **generates no id and accepts no id**, and holds no idref of any kind — no `aria-labelledby`, no `aria-controls`, no `aria-describedby`, no `for`. So the question of a dangling idref cannot arise, and that is the assertion rather than an omission: there is no attribute in this component that could point at an element that is not rendered. If Q6 is answered in favour of labelling the region, the id comes from `useId()` on the `h1`, which is a part that is always rendered — which is the only reason that option is even open.

**The focus ring.** `:focus-visible` only, and it is not this component's. `PageHero` declares no ring token and paints no ring; the rings inside the band are `Button`'s, drawn as its gap-plus-ring shadow pair and measured against `--btn-ring-gap-color` on all four surfaces in `Button`'s spec. Section 6 says why there is no row for one here.

**Contrast floors, restated.** Every one of the twenty-four cells in section 6 clears **4.5:1**, including the parts that would have qualified for the 3:1 large-text allowance — the title at `--text-h1` 54px is large text and sits at 14.62:1 on paper anyway, so the allowance is never used and never needed. The loosest cells in the table are 4.91:1 (`--hero-body-ink`, `--hero-eyebrow-ink` and `--hero-key-ink` on blue) and 4.92:1 (the eyebrow and the keys on paper). There is no disabled state, so the disabled exemption is not taken anywhere in this component. There is no colour-only state, vacuously: there are no states.

**Reduced motion.** Nothing in this component moves, so `prefers-reduced-motion: reduce` has nothing to switch off and the component's rendering under it is byte-identical. `PageHero.module.css` contains no `@media` block of any kind, including this one — section 14 names the grep.

**What a screen reader says.** An article hero with an eyebrow, two authors and both dates, in browse mode, reading top to bottom:

> "Design systems. Heading level 1, A building energy product that pays for its own rollout. A short lead paragraph, set at twenty pixels. Description list, three items. Written by, Alice Chen and Ben Ndlovu. Published, 3 March 2026. Updated, 12 June 2026. Link, Read the full guide."

Two things that sentence is meant to prove: the eyebrow arrives as plain text before the heading, not as a second heading; and each `<dt>` is announced immediately before its own `<dd>`, so "Written by" attaches to the names rather than floating in a row of unlabelled strings — which is the whole reason the byline is a `<dl>` and not a `Cluster` of spans.

**Credit labels and joining, since they are what the screen reader reads.** `role` maps to a fixed label — `author` → "Written by", `host` → "Hosted by", `guest` → "With", `reviewer` → "Reviewed by" — and the label does not change with the count, so two authors are still "Written by". People are joined into one `<dd>` per group: one name alone, two joined with "and", three or more comma-separated with "and" before the last. One `<dd>` per group rather than one per person is what keeps the label from being repeated three times for a podcast with three guests.

## 12 · Content edge cases

| Case | Required handling |
|---|---|
| **1 · Longest realistic string** | The longest `h1` in the corpus is a Service L3 name of about 58 characters. It wraps inside `--measure-title` to three lines at `--text-h1`, and the lines **balance** rather than leaving one word alone on the last — the title is the strongest shape in the band and a widow in it is visible from across a room. Never truncated, never clamped, no ellipsis: no `line-clamp` and no `text-overflow` anywhere in this component |
| **2 · One long unbroken token (a URL)** | Every text part breaks inside a word rather than overflow — `eyebrow`, `title`, `lead`, `body`, `key` and `value` alike. The band never produces a horizontal scrollbar, at any width, for any content. The title is included deliberately: a 60-character unbroken token in an `h1` is a content fault and should look like one, but it must not take the page's layout with it |
| **3 · Zero items** | `body` empty is a **compile error** (section 3), and so is a `credits` group with no people. The runtime cases that remain: `credits` empty renders no `<dl>`; `actions` empty renders no `Cluster`; and in both cases the `--gap-stack` seam disappears with the row, because a `Layout` gap exists only between rendered children. If an empty `body` reaches the renderer anyway, `copy` renders no element at all — never an empty `<div>` holding 16px of nothing |
| **4 · One item** | One paragraph (34 pages) renders as a single `--text-lead` `<p>` and `copy` shows no seam. One credit group renders one `pair` and `byline` shows no seam. One action renders one `solid` / `primary` `Button` and no `ghost` — the second emphasis is a consequence of a second entry, not a slot waiting to be filled |
| **5 · Many items (2× expected)** | Six paragraphs is the corpus maximum; twelve is 2×. No cap, no truncation, no warning — the stack grows and the `lead` role still applies to the first only, so a twelve-paragraph hero renders as a lead and eleven body paragraphs and looks exactly like what it is, a page whose opening should have been a section. That is a review comment, not a runtime behaviour (section 17 Q8). Four actions is a compile error |
| **6 · Missing image or missing optional slot** | There is no image slot at launch (section 17 Q4), so the image half of this row is answered by its absence. For the four optional slots the rule is one sentence and it is the most important one in this section: **an absent slot renders no element and no seam.** `eyebrow` absent on 97 pages → `titles` has one child and the title sits at the top of the band with only `--sec-padding-y` above it. `credits` and `dates` absent on 114 → no `<dl>`, not an empty one. `children` absent on 128 → no `extras` div. `actions` absent on 70 → no `Cluster`. No route ever renders a 48px gap above nothing |
| **7 · Empty required-ish text** | `title=""` renders the `<h1>` anyway, empty. A page with no `h1` is worse than a page with a visibly empty one, and the empty element is what makes the fault findable in an audit. **No placeholder copy, ever** — no "Untitled", no em dash, no fallback string, because a fallback is how a content fault ships. An empty string inside `body` is filtered before render, so it produces no `<p>` and no seam around nothing |
| **8 · The narrow track at 767** | The band stays full-width; the content column becomes the viewport less `--sec-gutter` on each side. Both measures exceed the column below about 800px and go inert. The title wraps to more lines and `--text-h1` re-declares itself in the type layer **[assumed]**, not here. `byline` wraps to one pair per line at `--gap-block`; `actions` wraps at `--gap-tight` with each `Button` keeping its 48px. Nothing reorders and no media query fires in this component |
| **9 · A parent that does not size it** | `PageHero` is a band and may only be a direct child of the page or its template, exactly as `Breadcrumbs` may. It must not be placed inside a `Section` (the content column would inset twice), inside a `Layout` track (a band is not a row), or inside a `Cluster` (a wrapping row does not size a band, and the hero would shrink to its longest word). For the case where it happens anyway, the named minimum is **320px, `--lay-track-md`** — the width at which the longest single word in a corpus `h1` still fits without overflow. Below 320 it renders and breaks inside words rather than overflowing |
| **10 · Logical properties rather than left/right** | Every distance in the component is a `Layout` or `Cluster` gap, which are logical by construction, or a measure, which is `max-inline-size`. There is no `margin`, no `padding` and no positioned part anywhere in `PageHero.module.css`, so there is no physical-direction property to get wrong — which is the cleanest possible answer to this row and is a consequence of 7(c) declining the one optical correction on offer |
| **11 · This component's surface nested inside a different one** | Addressed in section 6. The band is the `[data-surface]` scope and all six tokens are declared in all four blocks, so a `tint` hero between two `ink` bands renders the tint column at 11.81:1 rather than a light ink stranded on a light ground at 1.13:1. Inside the band, `extras` content reads `--sec-*` from the hero's own surface. `extras` **must not contain a `Section`** — the column would inset twice — nor a `Breadcrumbs`, nor another `PageHero` |
| **12 · Two of this component adjacent** | Forbidden: two heroes are two `h1`s, and one page has one `h1`. The component cannot detect a sibling — no `:has()`, no upward selector — so this is a lint rule and a review, not a runtime guard. The visual tell, for the specimen band that shows it: two `--sec-padding-y` paddings meet and leave **192px** of dead air between two display titles, which is unmistakable once it has been seen once |
| **13 · Interactive content inside a slot** | `extras` may hold interactive content. It enters the tab order in DOM order, before the actions, and the component adds no `tabindex`, no focus trap and no roving index. Anything focusable there reaches the 44px floor by its own means, and a `Button size="md" extendHitArea` already does. The other slots **cannot** hold interactive content, and that is a compile-time guarantee rather than a rule: `title`, `eyebrow` and every entry in `body` are typed `string`, so no element — and therefore no control, no link and no second heading — can be passed into them. That typing is the enforcement mechanism for the one-`h1` constraint |

## 13 · Motion

**Nothing in this component transitions, and nothing in it moves.** It has no states (section 5), so there is no value to interpolate between. `PageHero.module.css` declares no `transition`, no `transform`, no `animation`, no `opacity` and no height change, and section 14 names the grep that proves it.

The only motion inside the band belongs to `Button`: its colours on `--duration-fast` with `--easing-standard`, and — on a `link` emphasis, which the hero does not use — its rule wiping in along its own axis. Both are `Button`'s to own and neither is re-specified here.

**What does not move, explicitly:** the title does not fade or rise on load or on scroll; the eyebrow does not animate in ahead of it; the byline does not stagger; the actions do not scale, lift or shadow on hover; nothing in the band rotates, translates, or changes height. The entrance animation on a page title is the single most-requested hero motion and it is refused: it delays the one thing a reader arrived for, and it would be a second motion precedent, which the brief says must be asked for rather than assumed. If it is genuinely wanted it is a NEW MECHANISM REQUEST with its own argument.

**Reduced motion.** Nothing to switch off. Under `prefers-reduced-motion: reduce` this component renders identically, and there is no `@media` block in its stylesheet to express that with — the identity is structural, not conditional.

## 14 · Do's and Don'ts

**Do**

1. Every route renders exactly one `<h1>` — grep the built HTML per route for `<h1` and expect a count of 1.
2. An absent slot renders no element — with `eyebrow` undefined, the rendered DOM contains no `eyebrow` node, and the computed distance above the `<h1>` equals `--sec-padding-y` alone, not `--sec-padding-y` plus 8.
3. `body[0]` computes `font-size: 20px` and `body[1]` computes `18px`, on every route that has two or more paragraphs.
4. Every action is `Button size="md"` with `extendHitArea` — each action's computed box height is 40px and its rendered hit area is 44px. Assert both in the rendered DOM; an action missing the extension is the one failure this component can ship that a screenshot will not show.
5. The byline is a `<dl>` in which every `<dt>` has exactly one `<dd>` — assert it in the rendered DOM for the 15 long-read routes.
6. Every date `<dd>` contains a `<time>` with an ISO `datetime` attribute.
7. The hero's `surface` equals the `Breadcrumbs` `surface` immediately above it, on all 128 routes that have both — a single template constant, so the diff shows any route that passes two.

**Don't**

8. No margin on any node this component renders — grep `PageHero.module.css` for `margin` and expect zero matches.
9. No media query — grep `PageHero.module.css` for `@media` and expect zero matches, including the reduced-motion one.
10. No motion — grep `PageHero.module.css` for `transition`, `transform`, `animation` and `opacity` and expect zero matches.
11. No state token — grep the token file for `--hero-` followed by `-hover`, `-pressed`, `-expanded` or `-disabled` and expect zero matches.
12. No pixel literal in `PageHero.module.css` outside the sizes 7(b) names — grep for `px` and reconcile every hit against that six-row table.
13. Exactly one `text-transform` — grep `PageHero.module.css` for `text-transform` and expect one match, `uppercase`, on the `eyebrow` part and nowhere else. The title, the copy and the byline are verbatim.
14. No `line-clamp` and no `text-overflow` — grep and expect zero matches, which is edge case 1 as a check.
15. No `h1` or `h2` inside `children` — grep the call sites; `/contact`'s stat block starts at `h3`, because the page's body sections use `h2` and a hero adjunct is subordinate to them.
16. No `Section` inside `children` — grep the call sites.
17. No `PageHero` inside a `Section`, a `Layout` or a `Cluster` — grep the call sites; it is a band and takes only the page as its parent.

## 15 · Specimen plan

The block list for `/design/page-hero`, in order.

1. **The matrix**, as a note rather than a grid: 1 variant × 1 size, with section 4's four-column slot table printed beside it, so the reader sees the argument that collapsed three arrangements into one before they see any rendering.
2. **The slot-presence ladder** — eight bands, each labelled with its corpus count: bare title and body (13 case studies + the plain text-left pages); + eyebrow; + one action; + two actions; + eyebrow and two actions (the audit hero, 6 pages); + credits and dates (the article hero, 15 pages); + eyebrow, credits and dates (the podcast-with-client case, 1 page); + `children` (the `/contact` case, 1 page).
3. **The paragraph ladder** — seven bands at 1, 2, 3, 4, 5, 6 and 12 paragraphs, each labelled with its corpus count (34, 58, 10, 25, 1, 1, and "2× the maximum, no cap"), so the measure and the lead-body split can be judged at every real length.
4. **The credit shapes** — one author; two authors; host and one guest; host and three guests; author and reviewer, the shape that exists in the type and on no page, shown so that its absence is visibly a choice.
5. **The date shapes** — published only; published and modified; published and modified equal, which must render one pair and not two.
6. **States: none to force**, as a printed note. There is no state on this component to point at, hold or tab to. The `Button`s in the band do have hover, pressed and focus, they take no props, and they are tested on `/design/button` rather than re-tested here — the note says so, so a reviewer does not go looking for a control column that should not exist.
7. **All four surfaces as sibling bands with identical markup** — the audit hero (eyebrow, three paragraphs, two actions) rendered four times, `paper` · `tint` · `ink` · `blue`, with section 6's per-surface paragraph printed beside each band. The 4.39:1 failure that moved the eyebrow on tint is annotated on the tint band, because that is the one cell a future reviewer will want to lighten.
8. **The nested-surface band** — a `tint` hero between two `ink` bands, and an `ink` hero between two `paper` bands, each with its six resolved values listed, so the tint-in-ink case is a rendering rather than a claim.
9. **The `Breadcrumbs` seam** — the trail above the hero on all four surfaces, matched; then one band with the two deliberately mismatched (`paper` trail over `ink` hero), labelled as the bug neither component can detect. Beside it, the 96px separation that answers the eyebrow-versus-trail question, with both labels visible.
10. **Every edge case from section 12**, each labelled with its row number: the 58-character title with its balanced lines; a bare URL in paragraph 3; `title=""`; an empty string inside `body`; the 767 and 375 columns; the 320px floor; the 256px sub-floor.
11. **Two adjacent** — two heroes in sequence, with the 192px of dead air measured and annotated, and the band marked "this is a bug; the specimen shows what the bug looks like".
12. **Interactive content in `extras`** — a `Cluster` of two `Button`s inside the slot, with the tab order annotated: extras first, then the actions.
13. **The component in a narrow track** — 320px and 256px, both marked as illegal placements, with the rendering shown rather than described.

**The squint test.** The route reads as five shapes: a wide four-surface ladder, a tall thin paragraph ladder, a dense byline matrix, a pair of seam bands with two components in them, and a stress list of narrow columns. Not one rectangle repeated.

## 16 · New token requests

**None — every value in this spec is an existing token.**

The six `--hero-*-ink` and six `--hero-*-text` declarations are this component's own component-layer tokens, which is the layer the system expects a new component to add: each one resolves to a `--color-*` or `--text-*` name that appears verbatim in `guidelines/docs/vocabulary.md`, and they are enumerated in sections 6 and 8 rather than requested here. A component token is not a new token in the sense this section means; a new `--color-*`, `--gap-*`, `--text-*` or glyph would be.

Three values were checked against the ramps and found: `--measure-body` is right for a 44-character eyebrow at 12px, so no `--measure-label` is needed; `--gap-stack` is right for the four block seams, so no step between `--gap-gutter` and `--gap-stack` is needed; and `--btn-height-lg` already clears the touch floor, so no hero-specific hit token is needed. No glyph appears in this component at all, so there is no glyph request.

## 17 · Open questions

**1 · Which type role the `h1` takes. — ANSWERED, 21 Aug 2026**

The vocabulary has both `--text-display` (67px) and `--text-h1` (54px), and the hero is the only `h1` on the site.

**Answered: `--text-h1`, on every route in scope.** `--text-display` is reserved for the home-page hero, which is out of scope for this build. The consequences, all of which are already applied above: the title measure resolves to about 594px rather than 737px, so the title takes 48% of the content column instead of 59% and the band's open right-hand half gets wider; section 4 keeps its 1 × 1 matrix, because a reserved role on an out-of-scope page is not a size axis on this component; and if the home page hero is later built on `PageHero` rather than on its own template, that is the moment a size axis gets argued for, against a real second page.

No longer blocking. Nothing in this spec is gated.

**2 · The eyebrow's case. — RESOLVED, 21 Aug 2026**

**Uppercase**, as section 8 now specifies. `--text-eyebrow`'s tracking exists for capitals, and uppercasing keeps all four of the differentiators `Breadcrumbs.md` §8 claims against the trail above — family, case, tracking and size — so no amendment to that spec is needed and the cross-spec conflict this question used to carry is gone.

The cost is recorded in section 8 rather than hidden: `CONNECTX · AI-NATIVE BUILDING ENERGY PRODUCT` loses the internal shape of two words. The transform is CSS, not data, so the frontmatter keeps its authored casing and reversing this is one declaration.

**3 · Image provision at launch. — non-blocking**

The brief's own open question 4. Options: none, as specified; an `image?: ReactNode` slot now with the arrangement decided later; or the full text-left-image-right and text-above-image-below arrangements now.

**Recommendation: none.** Zero images in the corpus, no image component, no `next/image` precedent anywhere in the codebase, and `Figure` (brief 13) unbuilt. A slot added now would carry three undecided answers — aspect ratio, crop behaviour, empty state — with no content to test any of them against, and the empty state is the one that matters, because a hero whose image is missing on 129 of 129 pages is a hero with a hole in it. When `Figure` lands, the hero takes it as a `ReactNode` and the arrangement question is asked against real images.

**4 · `children` versus a named `extras` slot. — non-blocking**

One caller (`/contact`) and one block. Options: `children`, as specified; or `aside?: ReactNode`.

**Recommendation: `children`.** It is what a JSX author reaches for, and a named slot with one consumer is a name to maintain. If a second and third caller appear with different kinds of block, the name will have earned itself by then.

**5 · The `reviewer` role, null on all 15 long pages. — non-blocking**

As specified, `reviewer` is a role inside `credits`, so absent means no group, no `<dt>`, no label and no space — which is the brief's question answered structurally rather than with a conditional. Options: as specified; or a separate `reviewer?: string[]` prop.

**Recommendation: as specified.** A separate prop is a "Reviewed by" hole waiting for the day someone writes `reviewer={[]}` instead of omitting it, and this way the empty case cannot be expressed.

**6 · Whether the hero `<section>` should be a labelled region. — non-blocking**

- **(a)** Unlabelled, not a landmark, no id anywhere — as section 11 specifies.
- **(b)** `useId()` on the `h1` and `aria-labelledby` on the section, making the hero a navigable region.

**Recommendation: (a).** A screen reader user reaches the hero by heading, which is the fastest route to it; a region adds a landmark to skip past rather than one to arrive at, and the page already has four.

**7 · Whether `--hero-eyebrow-ink` and `--hero-key-ink` should be one token. — non-blocking**

They hold identical values on all four surfaces. Options: two tokens, as specified; or one `--hero-label-ink`.

**Recommendation: two.** Anatomy names become token slots, the two parts take different type roles (`--text-eyebrow` and `--text-micro`), and one is a category while the other is a field label. Section 6 notes the agreement rather than aliasing it, which is the same call `Breadcrumbs.md` made for `--crumb-link-ink` and `--crumb-collapse-ink`.

**8 · The twelve-paragraph case. — non-blocking**

Options: accept, with no cap and no warning; cap at six and drop the rest; or warn in development.

**Recommendation: accept.** A cap loses content silently, and a warning is a mechanism this system does not have. Beyond six paragraphs the content belongs in the page body, and that is a review comment on a route, not a behaviour in a component.

---

## Appendix — self-audit

```
STRUCTURE
[x] All 18 sections present, in order, with the exact headings.
[x] Front matter states Tier 2 pattern, Status draft, and token prefix --hero-*, which
    collides with none of the nine taken prefixes.
[x] Every part named in Anatomy appears in the colour table, the geometry list, or both.
    Six parts carry colour and are the six rows of section 6; seven carry distance only and
    are the seven component rows of 7(a); one (extras) is explicitly marked as carrying no
    value. Fourteen parts, fourteen accounted for.

NAMES
[x] Count of distinct token names used: 48. Every one appears verbatim in
    guidelines/docs/vocabulary.md. I checked them ONE AT A TIME, not by pattern. They are:
    14 --color-* (paper, paper-deep, white, neutral-100/300/400/600/700/800/900/950,
    brandeis-50/100/500); 12 --hero-* component tokens declared by this spec; 5 --gap-*
    (inline, tight, text, block, stack); 9 --text-* (h1 + tracking, eyebrow + tracking,
    micro + tracking, lead, body-lg, body-sm); 2 --measure-* (title, body); --radius-0;
    --border-width-0; --shadow-none; --z-base; 3 --sec-* referenced (container, gutter,
    padding-y); --lay-track-md referenced as a measuring stick; 2 --btn-* referenced
    (height-md, hit-min); 2 motion tokens referenced as Button's (--duration-fast,
    --easing-standard).
[x] Every glyph I named is in the glyph set — vacuously: this component renders no glyph at
    all, takes no icon prop, and section 3 says why HeroAction has no icon field.
[x] Every prop and every prop VALUE I gave for Section, Layout, Cluster and Button appears in
    the prop unions: Section surface; Layout rowGap stack|block|text|inline;
    Cluster as|colGap block|tight|rowGap block|tight|align start; Button as|href|emphasis
    solid|ghost|tone primary|neutral|size md|extendHitArea.
[x] Zero hex codes / rgb() / hsl() / colour words outside the contrast measurements. The
    hexes appear nowhere in this document; the ratios computed from them appear in section 6.
[x] Zero Tailwind class names. Zero CSS declarations, selectors or @media blocks. Sections 13
    and 14 name properties as things that are ABSENT from a stylesheet, which is a testable
    claim about a file rather than a declaration.
[x] Every --text-* role I paired with a tracking companion is on the list that has one:
    --text-h1, --text-eyebrow, --text-micro. The three that have none are marked
    "none — this role has no tracking companion": --text-lead, --text-body-lg, --text-body-sm.
[x] Every layout distance is a gap-scale role name, referred to by name. The five steps in
    7(a) are the only distances in the component.
[x] Every space-ramp reach carries its justification sentence. Count: 0. Section 7(c) names
    the one correction that was available and argues it down, because the part it would have
    been measured against is absent on 97 of 129 pages.
[x] Every literal pixel value is a component size or a container cap, t-shirt named, and says
    what it was measured against. Count: 6 — three declared (title measure, copy measure,
    eyebrow measure, all as ch resolved to px for the reader), two referenced from other
    components' tokens (48px --btn-height-lg, 320px --lay-track-md), one computed consequence
    (192px of dead air between two adjacent heroes, 40px --btn-height-md).

COLOUR AND CONTRAST
[x] The colour table has one row per token and four columns: paper, tint, ink, blue.
[x] No cell is empty, "same as paper", or a delta. Rows: 6 × 4 cells = 24.
[x] Every text colour has a measured ratio against the exact ground it sits on. There is no
    hover fill and no pressed fill in this component — no --hero-*-bg-* token exists — so
    there is no fill to measure against, and that absence is stated as an assertion.
[x] Every text ratio is >= 4.5:1. The loosest are 4.91:1 (body, eyebrow and key on blue) and
    4.92:1 (eyebrow and key on paper). The disabled exemption is not used, there being no
    disabled state. The large-text 3:1 allowance is not used either, though the title would
    qualify for it.
[x] The focus ring is measured against its own gap colour on every surface — in Button's
    spec, not here. This component declares no ring token and paints no ring, because nothing
    it renders can take focus. Section 6 states that as the assertion.
[x] Decoration is marked rather than left blank — vacuously: there is no decoration. Sections
    2 and 7 record that the rule and the panel were both drawn and both cut, which is why
    --border-width-0 is a decision rather than an omission.
[x] One paragraph per surface explains what moved and why. Four paragraphs, and the tint one
    carries the measured 4.39:1 failure that moved the eyebrow.
[x] The nested-surface case is addressed, with the 1.13:1 failure named and the rendered
    11.81:1 given, plus the rule that extras may not contain a Section.

STATES
[x] Every state I claim comes from the fixed model — I claim none, and section 5 walks all
    seven rows of the model and says why each does not apply.
[x] The rendered hover state differs from the rendered pressed state on all four surfaces —
    answered rather than dodged: the component has no rendered hover and no rendered pressed,
    so there is no pair that could be identical. The only stateful thing in the band is
    Button, whose own spec satisfies the rule.
[x] Every state token I introduced MOVES on at least one surface — I introduced none. Zero
    --hero-*-hover, -pressed, -expanded and -disabled tokens exist, and their absence is
    stated as the assertion that this component renders as a function of its props alone.
[x] Every state token is declared on all four surfaces — vacuously, there being none. All
    twelve tokens that DO exist are declared in all four blocks.
[x] Disabled uses its own tokens and no opacity — vacuously; opacity appears nowhere in the
    component, and section 14 names the grep. No colour-only state, there being no state.

LAYOUT, TYPE, SEMANTICS
[x] Every arrangement is a Section, Layout or Cluster. columns is set nowhere in this
    component, so colGap is omitted from all four Layouts (single-track stacks with no column
    seam) and stated on both Clusters, which have a real inline seam.
[x] No margin on any child, anywhere in the spec. Zero margins and zero space-ramp reaches —
    the component's stylesheet has no margin property in it, and 7(c), 10, 12 row 10 and 14
    each say so.
[x] No media query changes a gap step or a type role. There is no media query in this
    component at all, including the reduced-motion one; section 9 says nothing changes at 1023
    or 767 and section 14 names the grep.
[x] Every part carrying running text names a measure: title takes --measure-title; lead, body
    and eyebrow take --measure-body. key and value take none, and section 8 says why.
[x] Every interactive target reaches 44px on touch, by extending the hit area past the box
    rather than stepping the size up: Button size="md" is --btn-height-md 40px with
    extendHitArea reaching --btn-hit-min 44px. Section 9 says which of the two legal means
    was chosen and why the other one would have moved the row.
[x] Every ARIA idref I specified points at an element that is ALWAYS rendered — vacuously and
    deliberately: the component holds no idref of any kind, generates no id and accepts none,
    and section 11 says so as an assertion rather than an omission.
[x] No selector walks upward; no :has(); every state a parent needs is a prop or a class. The
    two cases a parent might want to detect — two heroes adjacent, and a Section inside extras
    — are lint rules and reviews (section 14, items 15 to 17), because the component cannot
    and must not look outward.

COMPLETENESS
[x] All thirteen content edge-case rows answered — none skipped. The image half of row 6 is
    answered by section 17 Q3 rather than waved off, and rows 3 and 13 are answered partly by
    the type system, which is stronger than a runtime handler.
[x] The "parent that does not size it" row names a minimum: 320px, --lay-track-md, measured
    against the longest single word in a corpus h1 — plus the rule that a band takes only the
    page as its parent.
[x] Do's and Don'ts are testable: each of the 17 names the grep, the rendered-DOM assertion or
    the call-site diff that decides it.
[x] The specimen plan renders the 1 × 1 matrix with its argument, the slot ladder, the
    paragraph ladder, the credit and date shapes, all four surfaces as sibling bands with
    identical markup, the nested-surface band, the Breadcrumbs seam matched and mismatched,
    every edge case above, two adjacent, and two illegal narrow tracks. It states that no
    state can be forced, and why looking for one would be a mistake.
[x] Section 16 says None, with the reading of why --hero-* declarations are not requests.
[x] Every open question has options, a recommendation, and a BLOCKING / non-blocking mark.
    None blocking: Q1 (--text-h1 against --text-display) and Q2 (the eyebrow's case) are both
    answered inline, dated, with their consequences applied above. Status is accepted.
[x] Squint test: the component reads as three ideas in three families — a serif title, a sans
    copy block, a row of tracked mono capitals — and the specimen route reads as five shapes,
    not one rectangle repeated.
```
