# Breadcrumbs

## 0 · Front matter

| | |
|---|---|
| **Component** | `Breadcrumbs` |
| **Tier** | 2 pattern (`src/patterns/Breadcrumbs/`) |
| **Status** | implemented · **amended 5 Oct 2026 (kit `fdn-top`)** — no band, no `surface`; lives in PageHero's `trail` slot |
| **Token prefix** | `--crumb-*` (collides with none of `--btn-` `--foot-` `--icn-` `--lay-` `--logo-` `--nav-` `--prose-` `--sec-`) |
| **Designer / date** | Design · 20 Aug 2026 |
| **Implements** | COMPONENT NAME: Breadcrumbs — the ancestor trail above the page hero (128 of 129 routes) |
| **Implemented at** | `src/patterns/Breadcrumbs/Breadcrumbs.tsx` · `src/patterns/Breadcrumbs/Breadcrumbs.module.css` · `src/styles/tokens/components/breadcrumbs.css` · specimen `src/app/design/breadcrumbs/page.tsx` |

Verified against the loaded Tcules library (`window.Tcules`, 9 components) and `guidelines/docs/vocabulary.md`. Every contrast ratio in section 6 was computed from the exact hexes in that document. Assumptions I could not check are marked **[assumed]** and collected in section 17.

**Accepted 20 Aug 2026.** All eight open questions were resolved by the owner and each carries its decision inline in section 17. Seven went to this spec's recommendation. **Q1 did not:** the trail gets its own `Section flush` band (option c) rather than being composed as a sibling of the hero inside one band. Sections 1, 3, 6, 7, 9, 10, 12, 14, 15 and 16 were rewritten to match that decision. It changes nothing about the component — `Breadcrumbs` renders no `Section` and never did — but it moves the trail↔hero seam from `--gap-block` to the hero band's own `--sec-padding-y`, and it leaves the air *above* the trail owned by nobody. That second consequence is new question **Q9**, non-blocking because it is a decision at the call site rather than a gap in what this document tells an implementer to emit.

**Composition changed by the owner, 20 Aug 2026, after the first build.** Q1 was re-opened and answered a third time: the trail **owns its own band** — a flush `Section`, with 64 of air above the trail and only the focus ring's reach below it — rather than being placed in a caller-composed `Section flush`. Sections 1, 2, 3, 7, 9, 10, 12, 14, 15 and 17 were re-cut for it. Two things follow that the earlier answers did not have: **`surface` is now a prop**, because a pattern that owns a band has no ancestor to read `data-surface` from (the same reason `SiteNav` and `SiteFooter` take it), and **Q9 is closed** — the 64 above the trail is what holds the hit extension's 23.15px upward reach clear of the sticky nav. The cost is that the trail can only be a direct child of the page: inside a `Section` its content column insets twice, and inside a `Layout` it is a band pretending to be a row.

**Amended 29 Sep 2026 (tracker 2.17, visual overhaul) — three crumbs on a phone, and a real ellipsis.** Approved by the owner. On a 390 phone a collapsed four-crumb trail wrapped onto a second line 44.85px below the first, led by a divider, and read as two elements rather than one phrase. The `rowGap="block"` that makes that distance **stays** — it is what keeps two wrapped lines' 44px targets from overlapping (§9) — so the fix is to stop the phone trail wrapping instead. Two changes:

1. **The collapse has a second depth below md.** From 768 up nothing changes: four or more levels render as four — first, collapse, parent, current. **Below 768 the parent folds into the collapse too, and the trail renders as three: first, collapse, current.** Trails of two or three levels are the same at both widths — three is already the phone's count. The mechanism is render-both-and-hide: the parent `<li>` and the wide count string carry `.wideOnly`, the narrow count carries `.narrowOnly`, and the module sets `display: none` on whichever does not apply. No prop, no client JS; it stays a server component. `display: none` rather than a visual clip is deliberate — it removes the element from the accessibility tree as well, so at any width a screen reader walks exactly one trail with exactly one count (never both counts, never a parent link that is invisible yet focusable). No id is minted, so `aria:check` has nothing new to resolve. The collapse is **still inert** (Q4 stands): the omitted levels, including the phone's folded parent, are not reachable from the trail itself — on a phone the nearest reachable ancestor is Home. That is a known cost of the owner's ruling, not an oversight; `SiteNav` remains the way to get elsewhere.
2. **The collapse mark takes the divider's ink.** It was already U+2026, but at label ink (`--crumb-collapse-ink`, the same steps as `--crumb-link-ink`) it read as three periods typed into the trail — a fourth, truncated label. It now reads `--crumb-divider-ink`, so it is punctuation between crumbs at the solidus's weight. `--crumb-collapse-ink` is **deleted** rather than remapped: a token equal to the divider's on every surface would be a second name for one decision. The mark is `aria-hidden` and its meaning is carried by the hidden count, so like the divider it is decoration and exempt from the text floor; the glyph is emitted as the escape `'\u2026'` so an editor cannot silently turn it into three periods.

§2, §3, §6, §9, §11, §12 and §17 Q4/Q7 are amended in place; each amendment is marked *29 Sep 2026*.

**Built 20 Aug 2026.** Nine decisions the build had to make that this document did not, each recorded in the section it belongs to rather than only here: `hit` is a `::before` because §2 asked for two `::after` on one element (§2); two contrast figures in §6's prose were wrong and are corrected, one of them in the direction that *strengthens* the decision (§6); `root` and `crumb` emit no class because §2 says they carry nothing and a class with no rule is a dead rule (§2); no `--crumb-shadow` and no `z-index` were minted (§7); `transform-origin` is stated as `0 50%` because CSS has no logical spelling for it (§12); the dev warning names the labels rather than the route, because naming the route would mean reading it (§12); three of §14's greps needed the comment-stripping qualifier this repo's own review step prescribes (§14); the render guard carries two truthiness checks that `noUncheckedIndexedAccess` requires (§3); and three §14 items are route-level and not yet decidable (§14). Every contrast ratio in §6's table was recomputed from `primitives.css` and all 28 matched exactly.

**Amended 5 Oct 2026 (kit `fdn-top`, visual-direction § 2.1, § 2.6) — read this first; it supersedes the band decision of 20 Aug.** The 1 Oct review found the top of every page read as a document: the trail's own band (64 above) stacked on the hero's 96 and put a service page's h1 at 296. Rulings: the trail moves **inside the hero**, and the hero eyebrow never repeats the crumb.

1. **`Breadcrumbs` renders only `<nav aria-label="Breadcrumb">` and its trail.** No `Section`. `.root` (64 above, the focus-ring clearance below) is deleted, and so is `--crumb-ring-clearance`, which existed only to keep the ring inside the old band.
2. **`surface` is deleted.** The colour comes from the enclosing band's `data-surface`, as a Button's does (token rule 7). Every per-surface token in `breadcrumbs.css` keeps its value. A trail can no longer be painted a different ground from the hero it introduces, so the "deliberately mismatched" specimen and §14's surface-match check are retired.
3. **Placement:** `PageHero`'s `trail` slot — `trail={heroTrail(items, title, (t) => <Breadcrumbs {...t} />)}` (`src/lib/trail.ts`; it was `{ crumbs, current }` until the fix round, item 5). The hero sets it 32 (`gutter`) above its split, inside its own 96 of top padding. The 44px hit extension reaches 23.15px up into that padding and leaves about 73 clear of the sticky nav; the rule offset and the hit geometry are unchanged.
4. **Measured on the six service pages at 1470 × 830:** trail top 169, split top 222 (was 296), every hero ends at or above 823. At 390 the trail starts at 161 and the h1 at 214.
5. **Fix round, 5 Oct 2026 — a second prop, `endsWith?: 'page' | 'parent'`.** On most trail pages the last crumb was the page's full title: 32px above the h1 the headline read twice, and at 390 the long crumb wrapped onto a second line led by a divider (this spec's tracker 2.17 defect, moved inside the hero). The last crumb now names the page only when the h1 does not. `heroTrail` drops a last item whose label repeats the title (`sameLabel`: zero-width characters, punctuation, case and a trailing "s" ignored) and renders `endsWith="parent"`: the last item is the parent, rendered as a **link** like every other ancestor, and nothing is `aria-current` — the h1 directly below is the current page (the GOV.UK pattern for a trail directly above its page's title). A trail left as a lone "Home" is not rendered at all, which § 12 already rules: a trail of one is noise. Where the page has a name shorter than its h1 the route passes it as the leaf (`story.name`; the nav labels "Insights", "Case studies") and it stays as the current page. The collapse is unchanged: it counts rendered items. No token, no class and no CSS changed: the parent reuses `link`.

   Result, crawled from `/` over 162 pages: 128 carry a trail, all inside the hero, none twice; 7 end at the page (the top-level pages whose h1 is a message: about, contact, careers, how-we-work, services, insights, case-studies; the six `/design/service-page` pages end at the service's name too), the other 121 end at the parent; no last crumb repeats its h1; no eyebrow repeats a crumb; every trail is one line at 390. Pages that now carry no trail because their h1 is their name: terms-of-use, privacy-policy, future-interfaces-lab, matter-design-system.

**Migration (§ 2.6).** Every rendering consumer moved its crumbs into the hero's `trail`: 20 live routes (about, audits/[slug], careers, case-studies/[slug], contact, expertise/[slug], future-interfaces-lab, future-interfaces-lab/join, glossary/[slug], how-we-work, insights, insights/[...slug], insights/events/[slug], insights/podcasts/[slug], matter-design-system, privacy-policy, services, services/[...slug], terms-of-use, tools/[slug]), 2 templates (CaseStudyIndex, ServicePage, so also /case-studies and the six /design/service-page pages), 3 specimens (design/breadcrumbs rewritten as Specimens inside Sections, design/page-hero block 9, design/section's note) and the two `.design-sync` previews. A crawl of 162 pages from `/` finds the trail on 132, always inside the hero, never twice. No route's first band is something other than a PageHero.

Eyebrows fixed on the way (the owner's ruling is "never repeats the crumb", so a repeat of the PARENT crumb counts as well as the last):

| Route | Before | After |
|---|---|---|
| how-we-work | eyebrow "How We Work" under a trail ending "How We Work" | dropped (`eyebrowBesideTrail`) |
| glossary/[slug] | "Glossary" under Home / Glossary / term | dropped (`eyebrowBesideTrail`) |
| audits/[slug] | "Audits" / "Audit" under Home / Audits / title (4 of 5) | dropped; "Product audit" kept on ai-product-ux-readiness |
| case-studies/[slug] | "Case study" under Home / Case studies / title | removed from the route |
| insights/[...slug] | "Insight" under Home / Insights / … | removed |
| insights/events/[slug] | "Event" under … / Events / title | removed |
| insights/podcasts/[slug] | "Podcast" under … / Podcasts / title | removed |
| /case-studies (CaseStudyIndex) | the page name as eyebrow over the message, and the same name as the last crumb | eyebrow dropped |
| six service pages (ServicePage) | the service name as eyebrow, and as the last crumb | eyebrow dropped; `hero.eyebrow` renamed `story.name` |
| expertise, tools, services/[...slug], matter-design-system, future-interfaces-lab/join | CMS eyebrow, never equal to a crumb today | passed through `eyebrowBesideTrail`, unchanged on screen |

`src/lib/trail.ts` holds the one definition of "the same words", `sameLabel`, and everything that asks the question uses it: `heroTrail` (does the leaf repeat the title?), `eyebrowBesideTrail` (does the eyebrow repeat any crumb?) and PageHero's two development warnings (the same two questions, for a hero built by hand).

Sections 1, 2, 3, 6, 7, 9, 10, 14 and 15 below are amended in place for this block; each amendment is marked *5 Oct 2026*. Section 17 keeps its history: Q1 carries a note that the placement it settled is now option (b). Re-verified on 6 Oct 2026 after `fdn-spacing` and `fdn-colour` landed: a crawl from `/` over 168 pages finds 131 trails, every one inside the hero's band, none twice, every one a single line at 390, trail top 169 at 1470 and 161 at 390, no last crumb repeating its h1, no eyebrow repeating a crumb, and no PageHero or Breadcrumbs warning on any live route. These counts supersede the 5 Oct ones above (128 of 162, and the migration paragraph's 132): three more insight pages are reachable from `/` today, and each carries a trail. The crawl script and its output are in the session scratchpad, `kit/fdn/fdn-top/crawl-r3.json`.

## 1 · Identity

The ancestor trail: an ordered list of the pages above this one, ending in this one. It is generated entirely from `navigation.breadcrumb` in frontmatter, so the component takes an array and renders it. It never reads the URL, and no route authors a trail by hand.

**Tier 2 pattern, and the tier is forced twice over.** It takes content shaped like a CMS record (`{ label, href }` from frontmatter), which the tier rule says makes it a pattern at the least. And its arrangement is a `Cluster` — a primitive may not import a primitive, so a trail that arranges itself with `Cluster` cannot be a primitive, and hand-rolling flex instead is forbidden. Both roads end at `src/patterns/`.

**What it is NOT**

1. **Not a way of getting elsewhere.** `SiteNav` does that — it is the control surface for navigation, one per page, sticky, with a panel. The trail's links are a by-product of stating position, not the point of it.
2. **Not the page's title or its eyebrow.** The hero's `h1` names the page, and the hero's eyebrow at `--text-eyebrow` names its category. The trail names ancestors only, and never restates the hero.
3. **Not a step or progress indicator.** Nothing in this system does that yet; a stepper would be its own pattern with its own spec. A trail's items are places that exist, not stages in a process.

**Nearest existing component, and why this is not a prop on it.** `SiteNav`. It is the wrong home for three separate reasons: a trail is a statement about where this page sits rather than a control for going elsewhere; `SiteNav` renders once in the layout shell above the route, so a per-route value would have to be threaded through the shell to reach it; and it is a pattern, so it may not import this pattern — a `breadcrumb` prop would have to accept a rendered `ReactNode`, which is a worse API than a component that takes an array.

**How many appear on a page.** Exactly one on every page whose hero has a trail of two or more items (131 of 168 crawled pages, 6 Oct 2026), always inside `PageHero`'s band, in its `trail` slot, 32 above the split (*5 Oct 2026*; until then alone in its own `Section flush` band immediately above the hero's, section 17 Q1). Zero on `/`, and zero on a top-level page whose h1 is its name, where `heroTrail` leaves a lone "Home" and renders nothing. Never two.

## 2 · Anatomy

| Part | Element | Required | Content slot | Carries |
|---|---|---|---|---|
| ~~`band`~~ | — | — | — | **Deleted 5 Oct 2026 (kit `fdn-top`).** The component renders no `Section`. It sits in `PageHero`'s band and reads that band's ground |
| `root` | `<nav aria-label="Breadcrumb">` | yes | none | the landmark, and nothing else (*5 Oct 2026*). It held the band's vertical air until then (`--gap-column` above, `--crumb-ring-clearance` below), and both are deleted: the hero's 96 of top padding is the air above the trail, and the hero's `gutter` (32) the seam below it |
| `trail` | `<ol>`, rendered by `Cluster as="ol"` | yes | none | both gaps: `colGap="inline"`, `rowGap="block"` |
| `crumb` | `<li>` — bare for the first, `Cluster as="li"` for every other | yes, 2 or more | none | nothing of its own |
| `link` | `<a href>` | one per item except the last | `items[i].label`, verbatim | link inks, `rule`, `hit`, the focus ring |
| `current` | `<span aria-current="page">` | exactly one, always last — and none with `endsWith="parent"` (*5 Oct 2026*) | the last item's `label`, verbatim | `--crumb-current-ink` |
| `divider` | `<span aria-hidden="true">` holding U+002F solidus | between every pair; count is always `crumb` count − 1 | none — a fixed character, not a slot | `--crumb-divider-ink` |
| `collapse` | `<li>` holding `<span aria-hidden="true">` U+2026 plus **two** visually hidden count strings, one `.wideOnly` and one `.narrowOnly` (*29 Sep 2026*) | only when `items.length >= 4` | none — the count strings are generated | `--crumb-divider-ink` (*29 Sep 2026*; was `--crumb-collapse-ink`, deleted) |
| `rule` | `::after` on `link`, at `inset-block-end: 0` | yes | none | `currentColor` — no token of its own, deliberately (see 6) |
| `hit` | `::before` on `link`, anchored to the box bottom and grown upward | yes | none | no value — hit area only |

> **Corrected at build.** Both were specified as `::after` on `link`, and one element has one `::after`. `Button` avoids the collision by putting its rule on an inner `.labelInk` and its hit on the outer box; here the hit takes `::before` instead, which needs no extra element and no wrapper span. Nothing else moves: the hit is invisible, so which pseudo carries it is not a visual decision.

> **`root` and `crumb` emit no class.** The Carries column says both hold nothing — no colour, no distance, no box — so the module declares no rule for either, and a class with no rule is a dead rule that `classes:check` cannot see. The `<nav>` therefore carries only `aria-label`, and the first `<li>` carries nothing at all. The remaining six parts are the six classes the module defines: `trail` `link` `current` `divider` `collapse` `collapseCount` — plus two breakpoint classes that are not parts, `wideOnly` and `narrowOnly` (*29 Sep 2026*). `wideOnly` sits on the collapsed trail's parent crumb and on the wide count; `narrowOnly` on the narrow count; each is `display: none` on the side of 768 where it does not apply.

No part is optional in the sense of being switchable: `collapse` appears as a consequence of depth, and `divider` as a consequence of position. There are no author-facing slots at all, which is the reason section 12's slot rows read as they do.

## 3 · Props / API

```
type BreadcrumbItem = { label: string; href: string }
```

| Prop | Exact literal union | Default | What it decides |
|---|---|---|---|
| `items` | `readonly BreadcrumbItem[]` | none — required | Everything: order, labels, hrefs, which item is last, and whether the middle collapses (`length >= 4`) — to four crumbs from 768 up, to three below (*29 Sep 2026*) |
| `endsWith` | `'page' \| 'parent'` (*5 Oct 2026*) | `'page'` | What the last item is. `page`: this page, the `current` part, text with `aria-current="page"`. `parent`: this page's parent, a `link` like the other ancestors, and no `current` part at all — for a page whose h1 is its name and says it directly below. Set by `heroTrail`, never by hand |
| ~~`surface`~~ | — | — | **Deleted 5 Oct 2026.** The colour comes from the enclosing band's `data-surface` |

Two props, no knobs.

**Deliberately NOT props**

| Not a prop | Why |
|---|---|
| `surface` | **Not a prop again since 5 Oct 2026.** From 20 Aug it was one, because a pattern that OWNS a band has no ancestor to read `data-surface` from (`SiteFooter` and `SiteNav` take it for that reason). Inside the hero's band the trail has that ancestor again, so it reads the ground as a `Button` does (token rule 7), and the original claim, true of anything that sits inside somebody else's band, holds |
| colour, padding, gap, radius, height, width | The token layer owns colour; the primitives own distance; the component owns its own sizes. A caller with an opinion about any of these has an argument with the system, not a prop |
| `className`, `style`, `id` | Unlike `Button`, this props type is closed. The only reason to reach in would be outer spacing, and the hero that places the trail owns that (*5 Oct 2026*; it was "this component's own band") |
| `density`, `flush` | There is no band to set them on (*5 Oct 2026*). The air above the trail is the hero's top padding and the seam below it the hero's `gutter`, the same on every page, so a route that wanted otherwise would be a route whose trail sits differently from every other trail |
| `separator` | The divider is a decision this spec makes once (section 6, section 17 Q2), not a per-caller choice. A trail with a different divider on one route is a bug |
| `collapse`, `maxItems`, `expanded` | Collapse is depth-driven and unconditional — one depth per side of the md breakpoint since 29 Sep 2026, still no knob. A knob would let a route opt out of the constraint that exists for mobile |
| `size`, `variant` | One size, one variant — see section 4 |
| `homeIcon` | Forbidden by the brief, and rightly: a glyph replacing the word "Home" costs a label and buys nothing |
| `label` (the landmark name) | Constant string `"Breadcrumb"`. One per page means there is nothing to disambiguate |
| `pathname`, `currentHref` | The hard constraint. The trail comes from frontmatter; a component that could derive a trail from a URL would eventually be asked to |
| `children` | Not in the props type. Interactive content in a trail is section 12's last row |

**Compile errors, not review comments**

1. Any prop other than `items` and `endsWith` (*5 Oct 2026*) — the props interface is closed, no index signature, no `HTMLAttributes` spread. `surface`, `className`, `separator`, `size`, `children` all fail excess-property checking at the call site.
2. An item missing `label` or missing `href` — both are required on `BreadcrumbItem`. The last item's `href` is required and deliberately ignored at render, so the frontmatter mapper stays uniform and needs no special case for the leaf.
3. Passing a mutable array where the component would mutate it is prevented by `readonly`; there is no in-place sort.
4. Depth 0 and depth 1 are **runtime** cases, not compile errors, because the frontmatter loader's return type is `BreadcrumbItem[]` **[assumed]** — a non-empty tuple prop type would fail at all 128 call sites. Section 17 Q6 asks for the loader's type to be tightened, which would move both cases into this list.

**One thing the build added to the runtime guard.** This repo compiles with `noUncheckedIndexedAccess`, so `items[0]` and `items[items.length - 1]` are `BreadcrumbItem | undefined` no matter what the length test says — the compiler does not relate a length check to an index. The render guard therefore reads `!first || !current || trail.length < 2`, and the two truthiness checks are type narrowing rather than a second runtime condition. Closing Q6 makes the whole branch unreachable and lets it go.

## 4 · Variants × sizes

| | `sm` (only size) |
|---|---|
| `trail` (only variant) | the component |

A 1 × 1 matrix, stated as a decision. The trail is identical on all 128 routes; the only dimension that actually varies is **depth**, and depth is data, not a variant. The size is named `sm` because it lines up with `Button size="sm"` — the trail is the smallest interactive type on the page and should read as smaller than any control near it.

**Steps with the single size:** nothing, there being one.
**Deliberately does not step:** the hit minimum (44px on every size there could ever be — a touch target is a floor, not a scale) and the gaps (`--gap-inline`, `--gap-block`; a trail that separated its items differently at a different size would read as a different component).

**Variants considered and rejected**

| Rejected | Why |
|---|---|
| `size="sm" \| "md"` | Nothing on the site would use `md`. A second size exists to line up with something, and there is nothing at 16px to line up with |
| `variant="compact"` | Compactness is what the collapse already does, and it is driven by depth. Two mechanisms for one outcome |
| `variant="inverse"` | This is what `data-surface` is. An inverse variant is the surface model reimplemented locally, badly |
| `variant="withBack"` (a leading back link) | A back control is a `Button emphasis="link" iconLeft={<Icon name="arrow-left" />}` in a `Cluster`, and it belongs beside the hero, not inside a statement of position |

## 5 · States

| State | Suffix | Applies to | What moves |
|---|---|---|---|
| rest | *(none)* | `link` | `--crumb-link-ink`; `rule` at zero width |
| hover | `-hover` | `link` | `--crumb-link-ink-hover`; `rule` wipes to full width |
| focus, keyboard | `-hover` + ring | `link` | the hover ink and the full-width rule, plus the ring at `--crumb-ring-color` over `--crumb-ring-gap-color` |
| pressed | `-pressed` | `link` | `--crumb-link-ink-pressed`; `rule` height steps from `--crumb-link-rule-width` to `--crumb-link-rule-width-pressed` |

**Hover ≠ pressed on all four surfaces.** On paper, tint and ink the ink itself moves two ramp steps and the rule thickens. On blue the ink has almost nowhere left to go — hover is `--color-white`, and the only lighter thing is nothing — so pressed steps back down to `--color-brandeis-50` and **the rule carries the difference**: it doubles in height. That is why `--crumb-link-rule-width-pressed` exists; without it, blue would have a rendered hover and a rendered pressed that a reviewer could not tell apart. The step is instant, not transitioned (section 13).

**States deliberately excluded**

- **disabled.** A trail never contains an unavailable level. If an ancestor has no page, frontmatter omits it from the array. No `--crumb-disabled-*` tokens exist, and their absence is the assertion that a level is either a link or the current page.
- **expanded / open.** Nothing opens. This is the whole payoff of the inert collapse (section 17 Q4): no disclosure, no `aria-expanded`, no idref pointing at a list that is not rendered, no focus to place after a state change.
- **held: active / selected / current.** The fixed model reaches "current" through a prop-driven class. Here currency is **structural** — it is the last item — so it is a *part* (`current`) and not a state. There is no `--crumb-link-ink-current`; the current page is not a link that has been marked, it is a different element with a different token.
- **loading, error.** Not in the model, and nothing here is asynchronous: the trail is in the frontmatter before the page renders.

## 6 · Per-surface colour

Seven tokens, four surfaces, twenty-eight cells, no deltas. (*29 Sep 2026:* eight until `--crumb-collapse-ink` was deleted; the collapse mark now reads `--crumb-divider-ink`.) `paper` values are declared on `:root, [data-surface=paper]` following `nav.css` and `button.css`.

| Token | paper (`--color-paper`) | tint (`--color-paper-deep`) | ink (`--color-neutral-950`) | blue (`--color-brandeis-500`) |
|---|---|---|---|---|
| `--crumb-link-ink` | `--color-neutral-600` — **4.92:1** | `--color-neutral-700` — **7.27:1** | `--color-neutral-400` — **8.05:1** | `--color-brandeis-100` — **4.91:1** |
| `--crumb-link-ink-hover` | `--color-brandeis-500` — **6.17:1** | `--color-brandeis-500` — **5.51:1** | `--color-brandeis-300` — **7.32:1** | `--color-white` — **6.23:1** |
| `--crumb-link-ink-pressed` | `--color-brandeis-700` — **10.07:1** | `--color-brandeis-700` — **8.99:1** | `--color-brandeis-100` — **13.61:1** | `--color-brandeis-50` — **5.57:1** |
| `--crumb-current-ink` | `--color-neutral-900` — **14.62:1** | `--color-neutral-900` — **13.06:1** | `--color-white` — **17.26:1** | `--color-white` — **6.23:1** |
| `--crumb-divider-ink` — also the collapse mark (*29 Sep 2026*) | `--color-neutral-400` — n/a — decoration (2.12:1) | `--color-neutral-500` — n/a — decoration (2.82:1) | `--color-neutral-700` — n/a — decoration (2.10:1) | `--color-brandeis-300` — n/a — decoration (2.64:1) |
| `--crumb-ring-color` | `--color-brandeis-500` — **6.17:1** against its gap | `--color-brandeis-500` — **5.51:1** against its gap | `--color-brandeis-300` — **7.32:1** against its gap | `--color-white` — **6.23:1** against its gap |
| `--crumb-ring-gap-color` | `--color-paper` — n/a — this is the ground the ring is measured against, one row above | `--color-paper-deep` — n/a — same | `--color-neutral-950` — n/a — same | `--color-brandeis-500` — n/a — same |

Every ratio above is text or ring against **the ground it actually sits on**. There is no hover fill and no pressed fill anywhere in this component — the trail is a bare text link, following `Button emphasis="link"`, not `SiteNav`'s tinted item box — so no `--crumb-*-bg-*` token exists, and the hover and pressed inks are measured on the surface ground because that is what is behind them. Their absence is the assertion that nothing paints a box behind a crumb.

The `rule` has **no colour token**. It paints `currentColor`, exactly as `Button`'s link rule does, so it can never disagree with the label it underlines and can never need a surface block of its own. Not a floor: it is decoration, redundant with a colour move it always accompanies.

**A check on the values, not a shortcut.** Four of these rows land exactly on mappings the surface layer already makes: `--crumb-link-ink` reproduces `--sec-ink-muted` on all four surfaces, `--crumb-current-ink` reproduces `--sec-ink`, `--crumb-divider-ink` reproduces `--sec-rule-strong`, and `--crumb-link-ink-hover` reproduces `--sec-link-ink`. That agreement is worth knowing — it says the values were derived the same way the system derives its own — but it is **not** a reason to alias the surface tokens. A component token that reads `--sec-*` silently follows it the day the surface layer is re-tuned, which is how a trail ends up quieter or louder than it was specified to be with nobody having decided that. Declare the `--color-*` value.

**paper.** The baseline. Ancestors sit at `--color-neutral-600` — the quietest ink that still clears 4.5:1 on this ground at 4.92:1 — so the trail reads as apparatus rather than content, and the current page at `--color-neutral-900` (14.62:1) is unmistakably the loudest thing in the row. Hover goes to `--color-brandeis-500` because blue in this system means clickable and appears on nothing that is not; pressed continues to `--color-brandeis-700`, two ramp steps, which is a visible darkening rather than a guess. The divider drops to `--color-neutral-400`, the same step `--sec-rule-strong` uses on paper, because a separator that competes with the labels it separates has failed at its one job.

**tint.** Every muted value steps one darker, because the ground did. `--color-neutral-600` does **not** still pass here — it is **4.39:1** on `--color-paper-deep`, under the 4.5 floor. (This spec first claimed "about 4.7:1, but"; the build recomputed it from the ramp hexes, and `section.css` already carried the same number in a comment on `--sec-ink-muted`. The correction strengthens the decision rather than changing it: stepping to 700 was presented as a preference for matching the system and is in fact required.) The system's own answer for muted ink on tint is `--color-neutral-700` (`--sec-ink-muted`), and matching it means the trail and the body copy under it are the same grey rather than two greys. The divider follows the same logic to `--color-neutral-500` (`--sec-rule-strong` on tint). The hover and pressed blues do not move: `--color-brandeis-500` still clears at 5.51:1 on the deeper ground, and moving them would have made a hovered link on tint a different blue from a hovered link on paper for no reason a reader could see.

**ink.** The direction inverts. Ancestors lift to `--color-neutral-400` (8.05:1) and the current page to `--color-white` (17.26:1); the hover blue lifts three ramp steps to `--color-brandeis-300`, because `--color-brandeis-500` on `--color-neutral-950` is far under the floor and is the exact failure the brief describes. Pressed then goes **lighter still**, to `--color-brandeis-100`, since on a dark ground "more" means brighter. The divider is the only value that goes the other way — `--color-neutral-700`, the darkest of the four surfaces — because on ink a light separator is louder than the labels.

**blue.** The ramp runs out. Ancestors sit at `--color-brandeis-100` (4.91:1 — the tightest cell in the table, and the reason nothing quieter is allowed here), hover reaches `--color-white`, and pressed steps back to `--color-brandeis-50` while the rule doubles in height, because there is no colour above white to press into. One consequence to accept knowingly: a hovered ancestor on blue is the same white as the current page. They stay distinguishable because the hovered one carries a rule and the current one never can. The ring is `--color-white` over the blue ground at 6.23:1 — blue-on-blue would have been invisible, which is why the ring is a per-surface token at all.

**Nested surfaces.** The trail sets no surface and paints nothing: it reads `data-surface` from its nearest ancestor that declares one. Because all seven tokens are declared in all four blocks, a trail inside a `tint` panel nested in an `ink` `Section` renders the tint column — `--color-neutral-700` links at **7.27:1** on the tint ground, not `--color-neutral-400` stranded on `--color-paper-deep` at 1.90:1. (This spec first quoted 4.92:1 here, which is paper's number; the tint column's link ink is 700, not 600. The 1.90:1 figure it contrasts against is correct.) That is the measured failure the brief cites (a tint panel inside an ink section rendering text at 1.13:1), and it is a failure of a deltas-only table, not of a component. The specimen route has a band for exactly this case.

**What the hero placement adds to that (*5 Oct 2026*).** The trail and the h1 share one band, so they cannot disagree about the ground. Under Q1(c) the trail band's `surface` and the hero band's were one decision made twice, and a mismatch was legible only as a tonal seam under the nav, the kind of defect that survives review. That defect can no longer be expressed, so section 14's surface-match assertion is retired.

## 7 · Geometry & spacing

**(a) Distances — gap-scale role names only**

| Where | Role | Owner |
|---|---|---|
| `link` → `divider` → `link` along the row | `--gap-inline` | `trail`'s `colGap`, and the inner `Cluster as="li"`'s `colGap`, both `inline`, so the divider has equal air on both sides |
| Wrapped line to wrapped line | `--gap-block` | `trail`'s `rowGap` |
| trail to the hero's split below it (*5 Oct 2026*) | `--gap-gutter` — 32 | **`PageHero`'s** `Layout rowGap="gutter"`, its `top` part. The trail contributes nothing. The focus ring's 4px reach falls inside those 32, inside the same band, so nothing paints over it. Until 5 Oct the seam was the hero band's own top padding (64 at `tight`, plus the ring's 4) |
| ~~`band` to the trail's own focus ring, below~~ | ~~`--crumb-band-ring-clearance`~~ | **Deleted 5 Oct 2026.** With the trail inside the hero the ring falls into the 32 above, which is the same band, so no clearance has to be held |
| the sticky `SiteNav` to the trail (*5 Oct 2026*) | `--sec-padding-y` — 96 | **`PageHero`'s** `Section`. The `hit` extension reaches 23.15px above the label into those 96 and leaves about 73 clear of the nav, which is what keeps Q9 closed now that the trail owns no air. Until 5 Oct this was the trail band's own 64, carried on the `<nav>` inside a `flush` `Section` |

`--gap-inline` on both sides of the solidus makes the trail read as one phrase — the way `Home / Services / Product Design` reads when it is typed — rather than as four separated items, which is what `--gap-tight` on both sides gave. `--gap-block` between wrapped lines is not a rhythm choice: it is the largest step `Cluster` accepts, and it is there for the touch targets (section 9).

**(b) Component sizes — t-shirt named, measured against something real**

| Name | Token | Value | Measured against |
|---|---|---|---|
| `sm` label box | — | **20.85px** — an 18.85px line box plus 2px | `--text-caption` 13px × 1.45 gives the 18.85px line box; `link` then carries `--crumb-link-rule-offset` as `padding-block-end`, which is what holds the rule INSIDE the box. Corrected at build from a flat 18.85: with the band contributing nothing downward, a rule positioned below the box was outside the band and was painted over by the next one, so the underline rendered nowhere. Every number below derives from 20.85, not 18.85 |
| ~~band ring clearance~~ | ~~`--crumb-band-ring-clearance`~~ | — | **Deleted 5 Oct 2026** with the band (section 7(a)) |
| hit floor | `--crumb-hit-min` | 44px | `--btn-hit-min` 44px. A trail link and a `Button` with `extendHitArea` have the same touch target, so a thumb learns one size for the whole site |
| narrowest specified track | — | 256px (`--lay-track-sm`) | a 4-item collapsed trail measures about 317px at `--text-caption`, so 256px is the width at which it takes two lines and still overflows nothing. Below that it renders, breaking inside labels |

**Which track this component was measured against:** the full content column — `--sec-container` 1240px with `--sec-gutter` 32px outside it — because the trail always sits in a single-track `Layout` stack, never in a grid track. The 392px three-up track and the 256px `--lay-track-sm` case appear only in the specimen (section 15).

**(c) Optical corrections reaching the space ramp — 2**

`--crumb-link-rule-offset: var(--space-2)`

> optical, not `--gap-tight`: this corrects the collision between the rule and the descenders of the label measured against the "g" and "y" in "Interaction and UI Design" set at `--text-caption`, so the day the gap scale is re-tuned this must not move.

The visually hidden count string inside `collapse` sizes its clipped box with `--space-1`, copying `SiteFooter`'s hidden field label exactly.

> optical, not `--gap-tight`: this corrects nothing visible — it is the 1px clipped box that keeps a screen-reader-only string out of the layout, measured against `SiteFooter`'s hidden field label, so the day the gap scale is re-tuned this must not move.

**Radius.** No radius at rest: `link` has no box, so no token exists for it. On `:focus-visible` the ring's corner is `--crumb-link-radius-focus: var(--radius-4)`, following `--btn-radius-bare-focus` — a 2px ring around bare text with square corners reads as a rendering artefact.

**Border width.** `--crumb-link-rule-width: var(--border-width-hairline)` (1px, same as `--btn-link-rule-width`); `--crumb-link-rule-width-pressed: var(--border-width-2)`. Ring: `--crumb-ring-width: var(--focus-ring-width)`, `--crumb-ring-offset: var(--focus-ring-offset)`, matching `--btn-ring-width` / `--btn-ring-offset`.

**Shadow.** `--shadow-none`. The focus ring is drawn as the two-shadow gap-plus-ring pair, exactly as `Button` and `SiteFooter` draw theirs; nothing here is elevated. **No `--crumb-shadow` was minted at build**: `Button` has one because it restates it on disabled, and this component has no disabled state and no second place to restate it, so the token would name a value nothing reads.

**Z-layer.** `--z-base`. Nothing in this component stacks above anything, including the `hit` extension, which is a transparent sibling of the label and must not sit over the crumb beside it (section 9 gives the one measured overlap). **No `z-index` is written at build**, for the same reason: `--z-base` is 0, which is the default, and the hit is inset to its own anchor's inline edges so it cannot reach a neighbour without one.

## 8 · Typography

| Part | Role | Tracking companion |
|---|---|---|
| `link` | `--crumb-label-text: var(--text-caption)` | none — this role has no tracking companion |
| `current` | `--crumb-label-text: var(--text-caption)` | none — this role has no tracking companion |
| `divider` | inherited `--text-caption` | none — this role has no tracking companion |
| `collapse` | inherited `--text-caption` | none — this role has no tracking companion |

One role for the whole component, and it is a **sans** role. That is the resolution of the eyebrow problem (section 17 Q3): on the 32 pages where the hero's eyebrow sits immediately below the trail, the two short labels differ in family (sans against mono), case (verbatim against the eyebrow's uppercase), tracking (none against `--text-eyebrow-tracking`) and ink (`--crumb-link-ink` against `--sec-ink-label`). Two mono labels stacked 24px apart would have read as one broken line; a sans trail over a mono eyebrow reads as apparatus over category. No prop, no media query, no change to the hero.

The current page differs from its ancestors by **ink only** — `--color-neutral-900` against `--color-neutral-600` on paper, a 3× difference in contrast against the ground. It cannot differ by weight: weight lives inside the type composite and restating it would break the type contract. It does not need to: the current crumb is also the last item, is not a link, gains no rule on hover, and carries `aria-current="page"`, so nothing about it is carried by colour alone.

**Measure.** No part carries running text — every part is a label, and the collapse caps the row at four of them — so no part names a measure. `--measure-body` (68ch) is deliberately not applied to `trail`: at `--text-caption` it caps the row around 435px, which would wrap a 4-item trail on a 1240px column that has room for it.

**Case.** Labels render verbatim from frontmatter, and the mono rule is why that needs no exception: mono is always uppercase system-wide (`tokens/primitives.css` § Type · case), and this component's one role is **sans**, so the rule does not reach it. No `text-transform` anywhere in the component: uppercasing would mangle labels like "AI Product UX", it would cost a reader the word shapes they navigate by, and it is precisely what makes the trail distinguishable from the eyebrow below it. Example copy, exactly as authored: `Home / Services / Product Design / Interaction and UI Design`.

## 9 · Responsive

**At 1023 — nothing changes.** No DOM change, no gap change, no type change. The trail is already at most four items.

**At 767 — the collapse takes its second depth (*29 Sep 2026*, superseding "nothing changes in the component").** The threshold does not move — four or more levels collapse at every width, so a 4-level route is collapsed on a 1440px desktop too — but *how much* collapses does: below 768 the parent folds into the collapse and a collapsed trail renders three crumbs, first / … / current. The DOM is the same at both widths; the module's two `@media` blocks set `display: none` on `.wideOnly` below 768 and on `.narrowOnly` from 768 up. A distance is not what changes — the gap steps and the type role are identical either side — the rendered COUNT is. That is why this does not break "the gap scale does not shift responsively". The row still wraps if a trail is wider than the track (a three-level trail with long labels, or one very long leaf); `Cluster` wraps, at `--gap-block`, as before.

**The gap scale does not shift responsively.** `--gap-inline` on the inline axis and `--gap-block` on the block axis are the distances at every width. No media query in this component may swap a gap step or a type role.

**Touch targets — 44px, by extending the hit area past the box.** `link` carries the `hit` extension: a transparent `::before` pinned to the inline edges of the label, `--crumb-hit-min` tall — the same mechanism `Button` uses for `extendHitArea`, and the reason the row does not move. The alternative, stepping the size up on touch, is not available: it would mean changing a type role or a box height at a breakpoint.

**It is anchored to the bottom of the box and grown UPWARD, not centred on it**, and that is a build correction rather than a detail. Centred, (44 − 20.85) / 2 = 11.575px of the target sits below the box — which is below the *band*, because the band contributes nothing downward, and the next band paints over it. The target would have been silently cut to about 36px on the one component whose targets are already the tightest on the site, with every check green. Anchored to the bottom it reaches 44 − 20.85 = **23.15px above the box**, entirely inside the air above it: the band's own 64 until 5 Oct 2026, the hero's 96 since.

**The wrapped-line overlap is gone, and it was removed rather than argued away.** This spec previously recorded a defect it accepted: at an 18.85px box the wrapped line pitch was 42.85px, under the 44px target, so two adjacent lines' targets overlapped by 1.15px, and the spec reasoned about which crumb won the ambiguous band. Holding the rule inside the box makes the box 20.85px, so the pitch is **44.85px** — greater than the target — and consecutive lines now clear each other by **0.85px**. Nothing overlaps, so there is no tie to break. That the fix for the invisible underline also removed this is not a coincidence: both were caused by the same thing, geometry hanging below a box that had nothing below it.

**The other consequence — raised as Q9, now closed inside the component.** The `hit` extension reaches 23.15px above the label box. When the band was `flush` that overshoot lay under the sticky `SiteNav`, which carries a higher stacking level (`--nav-z` against this component's `--z-base`), and the top of every trail link's target was occluded. **The band's own 64 of top air is what fixed it** — 64 against 23.15 cleared it comfortably — and that was the reason the band's air was asymmetric rather than flush. *5 Oct 2026:* the trail has no band now, and the hero's 96 of top padding does the same job with more room, so Q9 stays closed.

**One thing that had to be fixed for either number to be true.** The 18.85px label box is only the label box if every anchor has the same box, and at first they did not: the first crumb is a bare `<li>`, so its anchor was an ordinary inline box (~13px, the font's content area), while every other anchor is a direct child of a `Cluster as="li"` and was blockified to the full 18.85px line box. Both pseudo-elements are positioned against that box, so the rule sat tight under the first label and ~5px below all the others — which reads as the underline working on the first crumb and nowhere else — and the 44px hit was centred on two different boxes. `link` therefore takes `display: inline-block`, which makes the box the line box in both contexts. `SiteFooter`'s `.link` and `Button`'s `.label` do the same, for the same reason: a text link that draws its own rule needs a box it can rely on.

## 10 · Composition

```jsx
// The route or template writes ONE thing, the hero, and hands it the trail (5 Oct 2026, kit
// fdn-top; until then two sibling bands). PageHero is a pattern and Breadcrumbs is a pattern, so
// neither imports the other: the caller renders the trail and passes the node into the slot.
// heroTrail (src/lib/trail.ts) builds the node and its labels from one array, drops a last item
// that repeats the title (so the trail ends at the parent), and returns undefined for a lone Home.
<PageHero
  trail={heroTrail(frontmatter.navigation.breadcrumb, title, (t) => <Breadcrumbs {...t} />)}
  title={title}
  …
/>

// Inside PageHero: 96 of the band's padding above the trail, 32 (gutter) to the split
<Section surface={surface}>
  <Layout rowGap="gutter">
    {trail.crumbs}
    {split}
  </Layout>
</Section>

// Inside Breadcrumbs: no Section, no air of its own
<nav aria-label="Breadcrumb">                                          {/* root: landmark only */}
  <Cluster as="ol" colGap="inline" rowGap="block" align="baseline">    {/* trail: both axes */}

    <li>                                                              {/* crumb, first */}
      <a href={items[0].href}>{items[0].label}</a>                     {/* link + rule + hit */}
    </li>

    <Cluster as="li" colGap="inline" align="baseline" nowrap>          {/* crumb, collapsed middle */}
      <span aria-hidden="true">/</span>                               {/* divider */}
      <span aria-hidden="true">…</span>                               {/* collapse, inert */}
      <span>{n} levels omitted</span>                                 {/* visually hidden */}
    </Cluster>

    <Cluster as="li" colGap="inline" align="baseline" nowrap>          {/* crumb, parent */}
      <span aria-hidden="true">/</span>
      <a href={parent.href}>{parent.label}</a>
    </Cluster>

    <Cluster as="li" colGap="inline" align="baseline" nowrap>          {/* crumb, current */}
      <span aria-hidden="true">/</span>
      <span aria-current="page">{last.label}</span>                   {/* current: never an <a> */}
    </Cluster>

  </Cluster>
</nav>
```

`Cluster` provides every arrangement, on both axes: `colGap="inline"` on the inline axis of `trail` and of each multi-child `crumb`, `rowGap="block"` on the block axis of `trail`. The first `crumb` has one child and needs no arrangement, so it is a bare `<li>`. Each other `crumb` is `nowrap`: **the trail wraps between crumbs, never inside one**, so a divider can never be stranded at the end of a line from the label it belongs to. A single label longer than the track still wraps inside itself — `nowrap` governs the two flex children, not the text inside one of them. `colGap` is stated wherever a `Cluster` has more than one child on the inline axis, and `columns` is never set anywhere in this component, so no `colGap` is stated for a column seam that does not exist.

The component takes no `Layout`. The `<nav>` has one child, so there is no axis to state, and an axis nobody states renders 0 — which is the right answer for a landmark holding a single list rather than an omission. The seam below the trail is the hero's (*5 Oct 2026*; this paragraph used to say the same of the trail's own band).

**Restated:** no hand-rolled grid or flex — every gap above comes from `Cluster`. No margins on any child, anywhere; the container owns the gap, and the only `margin` in the module is the negative `--space-1` inside the visually hidden count string, which is a clipping technique and not spacing. Nothing in this component sets a background, a colour, a horizontal padding or a `max-width` on or over a `Section`.

## 11 · Accessibility

**Semantics.** `<nav aria-label="Breadcrumb">` → `<ol>` → `<li>` per level. Ancestors are `<a href>`. The current page is a `<span aria-current="page">`, never a link — a link to the page you are on is a control that does nothing. The ordered list is the semantics of the trail: its order is its meaning, and a screen reader announces position ("2 of 4") from the list, not from anything the component writes.

**Keyboard**

| Key | Behaviour |
|---|---|
| `Tab` | Move to the next `link` in the trail. DOM order is trail order |
| `Shift + Tab` | Move to the previous `link` |
| `Enter` | Follow the focused link — native anchor behaviour, no handler |
| `Space` | **Deliberately unbound.** These are links, not buttons; binding it would make the trail behave unlike every other link on the site |
| `←` `→` `Home` `End` | **Deliberately unbound.** The trail is a list of links, not a composite widget. A roving `tabindex` would take the links out of the tab order and make the trail worse for the keyboard users it was meant to help |
| `Escape` | **Deliberately unbound.** Nothing opens |

**Focus order and focus after a state change.** Focus order is DOM order: first ancestor to last ancestor. `current` is not focusable and is skipped. `collapse` is not focusable — it is inert text. **No state in this component moves focus, because no state changes anything but colour**: there is no expansion, no removal and no re-render on interaction. That is the accessibility argument for the inert collapse recommended in section 17 Q4.

**ARIA per state**

| Attribute | Value | When |
|---|---|---|
| `aria-label` on `root` | `"Breadcrumb"` | always, constant |
| `aria-current` on `current` | `"page"` | always, whenever the component renders at all |
| `aria-hidden` on each `divider` | `"true"` | always. A solidus announced as "slash" three times is noise |
| `aria-hidden` on the visible `…` | `"true"` | whenever `collapse` renders. The meaning is carried by the sibling hidden string, not the character |

`SiteNav` already sets `aria-current="page"` on a matching top-level item, so a page can carry two. That is valid ARIA and correct in both places: one says "this is the section you are in", the other says "this is the page you are on".

**Where ids come from: nowhere.** This component mints no id and holds no idref — no `aria-controls`, no `aria-describedby`, no `aria-labelledby`. Nothing can point at an element that is not rendered, because nothing points at anything. The expanding collapse would have needed an `aria-controls` naming a list that does not exist until it opens, which is the harder half of that option's cost.

**Focus ring.** `:focus-visible` only, never `:focus`. `--crumb-ring-width` over `--crumb-ring-offset` of `--crumb-ring-gap-color`, cornered at `--crumb-link-radius-focus`, drawn as the two-shadow pair. Focus also shows what hover shows: the hover ink and the full-width rule.

**Contrast floors, restated.** Labels are text at 4.5:1 minimum and the table's tightest cell is 4.91:1. The collapse mark is decoration since *29 Sep 2026* — `aria-hidden`, meaning carried by the hidden count, painted in divider ink — and exempt like the divider. Nothing here is 24px or larger, so the 3:1 large-text allowance never applies. The ring is 3:1 against its own gap colour and measures 5.51:1 at worst. The divider is decoration and exempt. No state is carried by colour alone: hover and focus add a rule, pressed thickens it, `current` is a different element with `aria-current`.

**Reduced motion.** Under `prefers-reduced-motion: reduce` the rule's wipe becomes an instant appearance at `--duration-instant`, matching `Button`'s own reduce block; colour still changes at `--duration-fast`, because a colour change is not motion. Nothing else in the component moves at all.

**What a screen reader says** — the 8-level glossary route, collapsed to four rendered items (from 768 up):

> "Breadcrumb, navigation. List, 4 items. Home, link, 1 of 4. 5 levels omitted, 2 of 4. Design tokens, link, 3 of 4. Token naming, current page, 4 of 4. End of list, end of Breadcrumb navigation."

Below 768 (*29 Sep 2026*) the same route reads "List, 3 items. Home, link, 1 of 3. 6 levels omitted, 2 of 3. Token naming, current page, 3 of 3." — the parent is not announced, because `display: none` takes it out of the tree, and only the narrow count is present. Never both counts at once. At depth 4 the strings read "1 level omitted" wide and "2 levels omitted" narrow. Exact phrasing varies by screen reader; what the component controls is the label, the singular/plural count string, and `aria-current`.

## 12 · Content edge cases

| Case | Required handling |
|---|---|
| Longest realistic string | No truncation, ever. Labels wrap as whole crumbs — each `crumb` is a `nowrap` `Cluster`, so the break always falls between crumbs and a divider never separates from its label — and the row wraps at `--gap-block`; the collapse holds the rendered count at four regardless of depth. An ellipsis on a label is forbidden — there is already an ellipsis in this component and it means something else |
| One long unbroken token (a URL or a slug) | The label breaks inside the word rather than pushing the row past its track. No horizontal scrollbar, no overflow out of the content column, no ellipsis |
| Zero items | Render nothing — no `<nav>`, so no empty landmark. `/` does not render the component at all; this is the defence against a bad frontmatter record. Dev-mode warning naming **the labels it was handed**, not the route: naming the route would mean reading it, which is the one thing this component may never do, and the labels identify the offending frontmatter record anyway |
| One item | Render nothing, same as zero, same warning. A trail of one is a statement about nothing; a lone "Home" above a hero is noise |
| Many items (2× expected: 16) | Renders identically to depth 4 — first, `collapse`, parent, `current` from 768 up; first, `collapse`, `current` below (*29 Sep 2026*). Depth is free after four, which is why there is no `maxItems` prop |
| Missing image or missing optional slot | **None, and why:** the component has no image and no optional slot. Every part is derived from `items`; a home glyph is forbidden by the brief and would be the only candidate |
| Empty required-ish text | An item whose `label` is empty or whitespace is dropped before render, so the divider count stays correct. If dropping leaves fewer than two items, the component renders nothing, as above |
| The narrow track at 767 | *29 Sep 2026:* a collapsed trail drops its parent and renders three crumbs, so a realistic trail holds one line. A trail that is still wider than the track — three authored levels with long labels, or a single very long leaf — wraps between crumbs at `--gap-block`; no DOM change and no gap change. The 44px targets **clear each other by 0.85px** — see section 9; the earlier 1.15px overlap was a consequence of the rule hanging below the box and went away with it |
| A parent that does not size it | **Cannot arise, and that is now structural.** The trail brings its own full-width band, so it has no parent that could fail to size it: it is a direct child of the page. `trail` is a wrapping `Cluster` row of text, not a grid track, so nothing can collapse it to zero — its intrinsic minimum is the widest label, and a label wider than the column breaks inside the word. No `min-inline-size` token is needed and none exists. **It must not be placed in a `Layout` track at all** — not `fit`, not `tile`, not a numbered column — because a band is not a row; nor inside a `Section`, which would apply the content column a second time. The wrap is therefore driven by VIEWPORT width, exactly as it is on a real route |
| Logical properties rather than left/right | The `divider` sits at each crumb's inline start; `rule` spans the inline axis via `inset-inline`; `hit` is pinned to the inline edges and centred on the block axis. No `left`, `right`, `margin-left` or `padding-right` anywhere — verified at build with comments stripped. (`Button`'s older `hit` uses `left`/`right`; this component uses the logical pair, and that difference is deliberate.) **Two physical values survive because CSS has no logical spelling for them:** `transform-origin` is written `0 50%` rather than `left center`, which states the origin as a position instead of as the forbidden keyword and is the inline start in LTR; and the hit's centring is `translateY(-50%)`, the block axis, exactly as `Button` does it |
| This component's surface nested inside a different one | Correct by construction: all seven tokens declared on all four surfaces, so a trail in a `tint` panel inside an `ink` section renders the tint column. Section 6's last paragraph, and a specimen band |
| Two of this component adjacent | Not valid on a route — one per page. The component does not defend against it and would produce two identical `Breadcrumb` landmarks, which a screen reader lists twice; since the landmark name is not a prop, there is nothing to disambiguate them with. The specimen band that shows two adjacent is labelled as a specimen-only arrangement with that consequence noted |
| Interactive content inside a slot | Impossible by design: there are no slots and `children` is not in the props type. `items` carries strings and hrefs only. A control inside a trail would make a statement of position into a toolbar; controls belong in `SiteNav` or in a `Cluster` of `Button`s beside the hero |

## 13 · Motion

| Property | Duration | Easing |
|---|---|---|
| `color` on `link` (rest → hover → pressed) | `--duration-fast` | `--easing-standard` |
| `transform: scaleX` on `rule`, 0 → 1, origin at the inline start | `--duration-fast` | `--easing-standard` |

The rule's wipe is **the existing precedent, not a second one**: it is the same part in the same system — a drawn underline on a text link, wiping along its own axis, on the same duration as the colour — as `Button emphasis="link"`. Nothing about it is new except the component it appears in.

**What does not move.** No transform other than that one `scaleX`. No rotation. No fade — `opacity` appears nowhere in this component, including for disabled, which does not exist. No height animation: the pressed rule's step from `--crumb-link-rule-width` to `--crumb-link-rule-width-pressed` happens at `--duration-instant`, so it is a change and not a growth. `divider`, `current` and `collapse` have no states and therefore no transitions. The focus ring appears instantly. Nothing about the collapse animates, because the collapse never changes.

**Reduced motion.** `--duration-instant` on the rule's transform; the colour transition stays at `--duration-fast`. The global `prefers-reduced-motion` reset already covers anything missed.

## 14 · Do's and Don'ts

**Do**

1. Every page renders at most one `<nav aria-label="Breadcrumb">`, and every page whose hero is handed a trail renders exactly one. *Decided by:* the crawl from `/` (*6 Oct 2026*: 168 pages, 131 with one landmark, none with two). It was deferred until a page consumed the component; all 20 live routes and both templates do now.
2. `items` at every call site is the frontmatter value. *Decided by:* `grep -rn "items={\[" src/app` returning no `Breadcrumbs` call site. **Not yet decidable — deferred, same reason.** The specimen route is the one legitimate exception in perpetuity: `/design/breadcrumbs` builds its trails from local fixture data on purpose, because a proving ground has no frontmatter, and its deep paths are deliberately absent from `src/lib/routes.ts` rather than polluting the route table with paths the site does not have.
3. Depth 4, 6, 8 and 16 all render exactly 4 `<li>`. *Decided by:* a rendered-DOM snapshot per depth.
4. The `<li>` count minus the `divider` count is exactly 1, at every depth. *Decided by:* the same snapshots.
5. With `endsWith="page"` the last `<li>` contains no `<a>` and carries `aria-current="page"`; with `endsWith="parent"` (*5 Oct 2026*) the last `<li>` is a link and nothing in the trail is `aria-current`. *Decided by:* a rendered-DOM assertion, and the specimen's endsWith band.
6. All seven `--crumb-*` colour tokens appear in all four surface blocks — 28 declarations (eight and 32 until `--crumb-collapse-ink` was deleted on 29 Sep 2026). *Decided by:* `tokens:check`, which fails a surface block that omits one.
7. Every `Breadcrumbs` renders inside `PageHero`'s band, in its `trail` slot (*5 Oct 2026*; this item asserted the opposite, a direct child of the page in a band of its own, until then). *Decided by:* the crawl, which checks that each `<nav aria-label="Breadcrumb">` has the h1's `<section>` as its nearest band and that band's `data-surface` as its nearest surface (*6 Oct 2026*: 131 of 131). The surface-match half is retired: one band cannot disagree with itself.

**Every grep below strips comments first.** Added at build, and it is not a loosening: this file's
module comments name what is deliberately absent — "No `text-transform`", "No `display: grid`" —
because that is the house style (`button.css` says "there is no `--btn-solid-*-fg-pressed`" for the
same reason), and a bare `grep` therefore hits the prose that asserts the absence and reports it as
the violation. The repo's own review step already prescribes the fix: *strip comments before
believing a grep — prose in this repo names other components constantly.* So each grep below means
**in a declaration**. Run them as:

```bash
perl -0pe 's{/\*.*?\*/}{}gs' src/patterns/Breadcrumbs/Breadcrumbs.module.css | grep -c '<pattern>'
```

Verified at build with comments stripped: `text-transform` 0 · `display` 0 · `grid` 0 · `flex` 0 ·
`:has(` 0 · `@container` 0 · hex 0 · `rgb(` 0 · `hsl(` 0 · `left` 0 · `right` 0 · raw px/rem 0 ·
`margin` **1**, the clip box; `display` **1**, the `inline-block` on `link` that section 9 argues for — items 11's two greps, `display: grid` and `display: flex`, are both 0, which is what that item actually asserts.

**Don't**

8. No `text-transform` in the module. *Decided by:* `grep -n "text-transform" Breadcrumbs.module.css` → zero **in a declaration**.
9. No `px`, no hex, no `rgb(`, no `hsl(` in the module. *Decided by:* grep → zero for each. Literal values live in the token file.
10. No `margin` in the module except inside the visually hidden count string. *Decided by:* `grep -n "margin" Breadcrumbs.module.css` → exactly one hit, in the hidden-text block.
11. No `display: grid` or `display: flex` in the module. *Decided by:* grep → zero. Arrangement is `Cluster`.
12. No `:has(`, no `@container`, no selector that walks upward. *Decided by:* grep → zero.
13. No `surface`, `className`, `style` or `separator` on any `Breadcrumbs` call site. *Decided by:* the type check failing the diff.
14. No pattern imports `Breadcrumbs`, and nothing renders it inside `SiteNav` or `SiteFooter`. `PageHero` places the node it is handed in `trail`; the routes and the two templates (ServicePage, CaseStudyIndex) render it only to hand it over (*5 Oct 2026*). *Decided by:* the pattern-import lint rule (a pattern may not import `@/patterns`), plus PageHero's imports: `@/components` and `@/lib` only.
15. No second `--crumb-*` colour token introduced without its four declarations. *Decided by:* the build check that fails on a token declared on one surface only.

## 15 · Specimen plan — `/design/breadcrumbs`

Every trail below is the real component with real labels. **Re-cut 5 Oct 2026 (kit `fdn-top`):** the trail renders no band now, so every band on the route is a `Section` holding `Specimen`s, and a trail sits inside a `Specimen` like any other control. The four surface ladders are four `Section`s; the in-situ band is a real `PageHero` with a `trail`, under the harness's stand-in for the sticky nav. The list below describes the 20 Aug cut where it differs; the route is the authority. *(20 Aug text:* the trail brings its own `Section`, so it can only be a top-level sibling on this route — never inside a `Specimen`, which is a `Layout`, and never inside another `Section`. Each trail's note therefore sits in its own band *below* it, which puts 64 between a trail and its note and 128 between groups, because the trail band gives 0 downward. The route reads as five shapes: a surface ladder, a depth ladder, a hero-scale in-situ band, a state reference table, and a stress list.*)*

1. **Matrix — variant × size.** One cell, labelled "one variant, one size", with the sentence from section 4 about depth being the real dimension. Beside it, the depth ladder: depths 2, 3, 4, 6, 8 stacked in a `Layout rowGap="stack"`, each labelled with its authored depth and its rendered item count (2, 3, 4, 4, 4).
2. **States.** Rest is the default and needs no prop. **No state in this component can be forced from outside** — there is no `active`, no `disabled`, no `expanded`. Hover, pressed and keyboard focus must be **pointed at, held, and tabbed to**; the band carries that note in place of the labelled state columns, plus **one reference row per state** — rest, hover, pressed, focus — each naming what moves and where to look, set in the eyebrow role against a description. Built as a four-row `Layout columns={[1, 3]}` rather than a drawing: a diagram of a colour change is less use than the sentence saying which two ramp steps it travels.
3. **Four surfaces as sibling bands, identical markup.** Four `Section`s — `paper`, `tint`, `ink`, `blue` — each containing the same depth-4 trail, in that order, each with its section 6 paragraph printed beneath as the per-surface note.
4. **Nested surface.** An `ink` `Section` containing a `tint` panel containing the trail, with the 1.13:1 failure named in the note and the rendered ratio (**7.27:1** — the tint column's `--color-neutral-700`, corrected at build from 4.92:1) stated beside it.
5. **In situ, and the eyebrow.** The real composition from section 10: the trail's own band, immediately above a `paper` `Section density="tight"` holding a title at `--text-h1` scale — rendered twice, once without a hero eyebrow and once with. This is the band that settles Q3, so the eyebrow is the **real `--text-eyebrow` role** (mono, uppercase, tracked, `--sec-ink-label`), not a note describing one: a paragraph about the eyebrow set in the note's own sans face proves nothing, which is exactly how the first build shipped this band unproven. The title is an `h2` element carrying an h1-scale class from the specimen harness, so the page keeps one `<h1>`; that gap — an element whose name should not decide its scale — is the `Heading` component this repo has not built yet.
6. **Edge cases**, one labelled row each, in a `Layout rowGap="stack"`: longest realistic label; a long unbroken slug; depth 2; depth 16; an item with an empty label (rendered beside the same trail without it, to show the divider count holding); zero items and one item (each rendering nothing, with the empty result outlined so the absence is visible).
7. ~~**Narrow tracks.**~~ **Struck at build.** The trail is a full-width band now, so it cannot be placed in a `[1, 2]` track or a 256px tile — section 12 forbids both, and it would inset its own content column inside the outer one. The wrap it was meant to show is driven by viewport width instead, and bands 6 and 9 both say to narrow the window. Nothing a track was proving is lost: the intrinsic minimum is still the widest label, which the long-slug row in band 6 demonstrates.
8. **Two adjacent.** Two trails in a `Layout rowGap="block"`, labelled "specimen only — invalid on a route", with the duplicate-landmark consequence noted.
9. **Touch.** The depth-4 trail rendered **directly under a stand-in for the sticky `SiteNav`** — the harness's `mockBar`, carrying the nav's own bottom hairline and compact height — so the relationship the arithmetic is about can be looked at rather than described. Beside it a 44px floor outlined for comparison, and the note states both numbers: the 23.15px upward reach, comfortably cleared by the band's 64 of top air, and the 0.85px by which consecutive wrapped lines' targets now clear each other. This band is the proof Q9 is closed rather than merely answered.

## 16 · New token requests

**None — every value in this spec is an existing token.**

The `--crumb-*` names in sections 6 and 7 are this component's own component-layer declarations, which is what a component spec produces; each resolves to an existing token: `--color-*` for all seven colour tokens (eight before 29 Sep 2026), `--border-width-hairline` and `--border-width-2`, `--radius-4`, `--focus-ring-width`, `--focus-ring-offset`, `--text-caption`, `--duration-fast`, `--duration-instant`, `--easing-standard`, `--space-1`, `--space-2`, and the literal 44px matching `--btn-hit-min`. The Q1(c) composition adds nothing either: `flush` is an existing `Section` prop and the trail→hero seam is the hero band's own `--sec-padding-y`, so the seam is spent out of the existing band vocabulary rather than out of a new token.

No new gap step: the two distances are `--gap-inline` and `--gap-block`. No new colour: every cell is an existing ramp step. **No new glyph:** the divider is U+002F in the label's own face, and the collapse mark is U+2026 — neither is an `Icon`, so neither touches the 17-glyph set. No new mechanism: the collapse is inert, so there is no disclosure, no animation beyond the existing underline precedent, no portal and no scroll behaviour.

## 17 · Open questions

All eight questions below were resolved by the owner on **20 Aug 2026**. Each keeps its original
options and recommendation, with the decision recorded inline as **Resolved**, so a reader can see
what was chosen *and* what was rejected. Q9 is new: it exists because of what Q1's answer left open.
Nothing here is BLOCKING, which is what `Status: accepted` requires.

**1 · Where the trail↔hero seam lives. Resolved — was BLOCKING.**
`PageHero` is a pattern and so is this, so neither may import the other; something has to own the distance between them on 128 routes. Options: (a) the page template composes them as siblings in a `Layout rowGap="block"` inside the hero's `Section`; (b) `PageHero` gains a `breadcrumbs?: ReactNode` prop and the page passes the element in, the documented sibling escape hatch; (c) the trail gets its own `Section flush` band above the hero. **Recommendation was (a).** It changes no other component's API, keeps the trail inside the hero's `Section` so it inherits the hero's surface (some heroes are `blue`), and puts the one distance in the template that all 128 routes already share. (c) was argued against on the grounds that a separate band either doubles the vertical air or has to be flushed to fake being in the same one.

> **Superseded 5 Oct 2026 (kit `fdn-top`, visual-direction § 2.1–2.2): option (b) is in effect.** `PageHero` has a `trail` slot and the caller passes the rendered trail into it, so the trail sits inside the hero's band, 32 above the split, under the band's 96 of top padding. The 1 Oct review found the trail's own 64-above band stacked on the hero's 96 and put a service page's h1 at 296; it is 222 now. What the 20 Aug recommendation wanted from (a), a trail that inherits the hero's surface, is what (b) now delivers. The (d) and (c) records below are history.
>
> **Re-resolved 20 Aug 2026, after the first build — a fourth option (d): the trail owns its band.** The owner's second instruction was that the trail sits in its own `Section` with tight air above and zero below, and that this is the only way it may ever be placed. Under (c) the *caller* wrote that `Section`; under (d) the *component* does. The difference is not cosmetic — it is what makes "the only way" true by construction rather than by convention, and it removes 128 chances to get the padding, the surface or the ordering wrong on a band no check can see.
>
> What (d) settles that (c) left open:
>
> 1. **Q9 is closed.** The band gives 64 above the trail, which clears the hit extension's 23.15px upward reach from the sticky nav. (c) gave 0 and left that reach under the bar.
> 2. **`surface` becomes a prop**, joining `SiteNav` and `SiteFooter`. A pattern that owns a band has no ancestor to read `data-surface` from. Section 3 strikes it from the not-a-prop list and says why the original claim was true only of controls.
> 3. **The asymmetry has a home.** Section's densities are symmetric, so the band is `flush` and the module ADDS `padding-block-start`. Additive on purpose: `density="tight"` plus `padding-block-end: 0` would pit two single-class rules against each other and leave a 64px gap under every trail to stylesheet order.
>
> What (d) costs, stated plainly: **the trail can only be a direct child of the page.** Inside a `Section` its content column insets twice; inside a `Layout` it is a band pretending to be a row. Section 12 records it and section 14 item 7 asserts it. The specimen route had to be restructured around it, and the narrow-track bands are gone — a full-width band cannot be put in a 256px track, so the wrap is now shown by viewport width, which is how it actually happens.
>
> An independent audit of the first build **rejected** this reversal on the grounds that a spec cannot be overturned by a builder. That is right, and it is not what happened: the owner directed it. The audit's substantive findings against the interim state — a four-surface ladder that rendered paper four times, a doubled content column, and a band placed inside a `Layout` twenty times — were real and are fixed. Its finding that Section should perhaps grow a per-edge density instead is open; see the note under Q10.

> **Superseded — the (c) reasoning, kept because the argument still holds against (a) and (b).** The trail gets its own `Section flush` band. Section 10 is the composition, and three things follow from it, all of them now specified rather than left to a builder:
>
> 1. **The seam is the hero band's own top padding**, not `--gap-block` — 64 with the hero band at `density="tight"`, 96 standard. `flush` is `padding-block: 0` on both edges, so adjacent bands are separated by the sum of their facing paddings. Section 7(a).
> 2. **The two bands' `surface` values must match**, and matching them is the caller's job on every one of the 128 routes, where (a) would have inherited it for free. Section 3, section 6, and the assertion at section 14 item 7.
> 3. **The air above the trail is owned by nobody**, which is Q9.
>
> The reason this is not a blocking change to the component: `Breadcrumbs` renders no `Section` and never did. The band is the caller's, so (a), (b) and (c) all build the same component — the decision moves 128 call sites, not one line of this component.

**2 · What the divider is drawn as. Resolved — non-blocking.**
Options: a text solidus; `Icon name="alt-arrow-right"`; a new glyph. **Recommendation: the text solidus**, aria-hidden. It is in the label's own face, so it aligns on the baseline and scales with the type for free; it needs no glyph request; and it does not imply a direction or a control, which a chevron does everywhere else in this system (`SiteNav` rows, `Button` icons). A chevron would also mean a `Cluster align="center"` and an icon-size decision for a 13px row.

> **Resolved: the text solidus**, U+002F, as recommended and as sections 2, 6 and 16 already specify. No glyph request, no change to the 17-glyph set.

**3 · The relationship to the hero's eyebrow. Resolved — non-blocking.**
Two short labels stacked on 32 pages. Options: (a) differentiate typographically — trail in sans `--text-caption`, eyebrow stays mono `--text-eyebrow`; (b) the hero drops its eyebrow when a trail is present; (c) the trail replaces the eyebrow on those 32 pages. **Recommendation: (a)**, which is what section 8 specifies. It resolves the collision inside this component, needs nothing from the hero, and keeps the eyebrow's category label, which the trail cannot replace: "Services" as an ancestor and "Interaction design" as a category are different facts. (b) needs a prop on `PageHero` and a decision about 32 pages of copy; specimen band 5 exists so the owner can look at (a) and (b) side by side before agreeing.

> **Resolved: (a).** Section 8 stands as written — sans trail over mono eyebrow, differing in family, case, tracking and ink. `PageHero` needs no prop and no page loses its eyebrow. Specimen band 5 still renders both, now with the Q1(c) band structure, because the pair is worth looking at even once it is decided.

**4 · How the middle collapses. Resolved — non-blocking.**
Options: an ellipsis that expands on click; an inert ellipsis; dropping levels silently. **Recommendation: the inert ellipsis**, with a visually hidden "{n} levels omitted". It is the honest one — it says levels were dropped without pretending to be a control — and it is the cheap one: no `aria-expanded`, no `aria-controls` pointing at a list that is not rendered at rest, no keyboard contract, no focus to place after expansion, no state token, nothing that moves. Dropping levels silently was rejected because the visual and the announced trail would then disagree with the sitemap for no gain. If the owner wants the expanding version it is a **new mechanism request** with its own argument, and that request would be blocking.

> **Resolved: the inert ellipsis**, as recommended. No new mechanism request. Sections 5, 11 and 13 stand: nothing opens, nothing takes focus, nothing animates, and no `--crumb-expanded-*` token exists.
>
> **Still inert after 29 Sep 2026.** The phone collapse folds the parent into the same inert mark, so below 768 the parent is not reachable from the trail either. Accepted with the owner's three-crumb ruling; an expanding collapse remains a separate mechanism request.

**5 · The 6- and 8-level outliers: content or design. Resolved — non-blocking.**
**Recommendation: content, and the design already absorbs it.** After the collapse both render identically to a 4-level trail, so they cost nothing visually and need no special case. What they do reveal is an information architecture eight levels deep on a glossary term route, which is a question for the content owner, not for this component. No action here either way.

> **Resolved: content.** No action in this component. The eight-level glossary route is referred to the content owner as an IA question, and the depth ladder in specimen band 1 keeps rendering it so the outlier stays visible.

**6 · Tighten the frontmatter loader's return type. Resolved — non-blocking.**
Today `items` is `readonly BreadcrumbItem[]` **[assumed]**, so depth 0 and depth 1 are runtime cases. If the loader's parse asserted a non-empty pair — `readonly [BreadcrumbItem, BreadcrumbItem, ...BreadcrumbItem[]]` — both would become compile errors and the two "render nothing" rows in section 12 would become unreachable. **Recommendation: do it**, in the loader, in a separate change. Not blocking: the runtime behaviour is specified either way.

> **Resolved: do it, in a separate change to the loader.** This spec is unchanged by it — section 3 item 4 and the two section 12 rows describe the runtime behaviour that must exist until the loader lands, and remain correct after it as unreachable defence. Building `Breadcrumbs` does not wait on it.

**7 · Collapsing at exactly 4. Resolved — non-blocking.**
At depth 4 the collapse hides exactly one level and saves the width of one label. The constraint says 4 or more and this spec honours it as written; the alternative is a threshold of 5, which would leave 39 pages uncollapsed on desktop and would need the mobile case handled some other way. **Recommendation: keep 4.** One rule at every depth and every width is worth more than the width of one label.

> **Resolved: keep 4.** `items.length >= 4`, at every width, with no breakpoint and no prop. Sections 2, 3 and 9 stand.
>
> **Amended 29 Sep 2026 (tracker 2.17).** The threshold is still 4 at every width and there is still no prop, but the collapse now has a breakpoint: below 768 it also folds the parent, rendering three crumbs. "One rule at every depth and every width" gave way to a phone trail that wrapped onto two lines; see front matter.

**8 · Confirm the path. Resolved — non-blocking.**
`src/patterns/Breadcrumbs/` per section 1. If anyone reads a trail as a primitive: a primitive may not import `Cluster`, and hand-rolled flex is forbidden, so the two rules together force tier 2. Named here only so the tier is not re-litigated in review.

> **Resolved: tier 2 pattern, `src/patterns/Breadcrumbs/`**, confirmed by the owner. Not to be re-litigated in review. Q1(c) is a second, independent reason the tier is right: the trail is composed as a band-level sibling of `PageHero`, which is pattern-level work.

**9 · What supplies the air above the trail. CLOSED by Q1(d).**
> **Closed.** The component supplies it: 64, from `--gap-column`, on the `<nav>` inside its own `flush` `Section`. The hit reaches 23.15px up, so it clears with room to spare, and no call site can forget it. The options below were written when the band belonged to the caller; recommendation (b) — move the `flush` to the hero band — is no longer needed and was not taken.


Created by Q1's answer. `flush` is `padding-block: 0` on **both** edges, and the trail's band is the first thing in `<main>`, which sits directly under a sticky `SiteNav` with no spacer. So the trail's label box begins at y=0 of the band, and the 12.575px by which its 44px `hit` extension overshoots the label upward lies under a bar with a higher stacking level — the top of every trail link's touch target is occluded (section 9). Options: (a) accept it — the trail reads as a continuation of the nav chrome, and only the extension is covered, never the label or the visible row; (b) keep the trail in its own band and move the `flush` to the hero band instead — the trail band takes `density="tight"`, so the pair renders 64 above the trail, 64 between trail and hero, and the hero's bottom air is handed to the band below it exactly as `flush` is documented for; (c) `className` padding on the trail's `Section` — **not an option**, forbidden outright by the layout rules. **Recommendation: (b).** It is a one-word change at the call site, it keeps the trail in a band of its own as decided, it produces the same 64px seam the accepted composition produces, and it is the only one of the three that puts the touch target back in the page. Non-blocking, and this is why: the band belongs to the caller, not to this component, so a builder implementing this spec emits the same `Breadcrumbs` under either answer, and section 10 tells them exactly what to write in the meantime.

**10 · Should `Section` express asymmetric vertical air? OPEN, non-blocking.**
Raised by the audit of the first build, and it is a fair question. This component needs 64 above and 0 below; `Section` offers 96 / 64 / 128 / flush, all symmetric. The rule in CLAUDE.md is "if a tier needs something the tier below does not provide, build it in the tier below" — which argues for a `flushEnd` boolean, or a per-edge `density`, on `Section`. Against: `flush` is documented for precisely this ("a composition that supplies its own" air), `SiteNav` already uses `flush` and supplies its own bar geometry on top of it, and this is one component with one asymmetric band — a prop on the most load-bearing primitive in the system earns its place when a *second* caller needs it, not the first. **Recommendation: leave `Section` alone for now**, and revisit the moment another band wants asymmetric air; at two callers the prop is clearly right. Non-blocking either way: the rendered result is identical, and the change would be a refactor of one declaration.

---

## Appendix — self-audit

```
STRUCTURE
[x] All 18 sections present, in order, with the exact headings.
[x] Front matter states a tier (2 pattern), a Status (implemented — built 20 Aug 2026, every
    question in section 17 resolved inline the same day), and a token prefix (--crumb-*) that
    collides with nothing in the taken list. The collision grep was empty AND the reservation
    grep was checked: two hits, both prose in src/lib/routes.ts naming breadcrumbs as a consumer
    of routes, neither reserving a prefix. No migration to discharge.
[x] Every part named in Anatomy appears in the colour table, the geometry list, or both —
    root, trail, crumb and hit are explicitly marked as carrying no value of their own.

NAMES
[x] Count of distinct token names used: 49. Existing (33): --color-paper, --color-paper-deep,
    --color-neutral-400, --color-neutral-500, --color-neutral-600, --color-neutral-700,
    --color-neutral-900, --color-neutral-950, --color-white, --color-brandeis-50,
    --color-brandeis-100, --color-brandeis-300, --color-brandeis-500, --color-brandeis-700,
    --gap-inline, --gap-block, --gap-tight (named only as what an optical reach is not),
    --text-caption, --text-eyebrow, --border-width-hairline, --border-width-2, --radius-4,
    --focus-ring-width, --focus-ring-offset, --duration-fast, --duration-instant,
    --easing-standard, --space-1, --space-2, --shadow-none, --z-base. Plus --lay-track-sm,
    --measure-body, --sec-container, --sec-gutter, --sec-ink-muted, --sec-rule-strong,
    --btn-hit-min, --btn-link-rule-width, --btn-radius-bare-focus, --btn-ring-width,
    --btn-ring-offset, --text-eyebrow-tracking, --sec-padding-y (the Q1(c) seam), --nav-z
    (named once, as the stacking level that occludes the hit extension in Q9) — all cited as
    precedent, all verbatim from the vocabulary. New (16): the --crumb-* component layer,
    section 6 and section 7. I checked them ONE AT A TIME against vocabulary.md, not by
    pattern. Q1(c) introduced no token: the seam is spent out of the existing band vocabulary.
    AS BUILT the layer declares 19 distinct --crumb-* names — 11 geometry plus 8 surface-dependent
    — for 43 declarations in total (11 + 8 × 4). Nineteen declared, nineteen read by the module:
    no dead token, no undeclared read. Two names the spec discussed were deliberately NOT minted,
    --crumb-shadow and a z-index, each argued in section 7.
[x] Every glyph I named is in the glyph set, or is a NEW GLYPH REQUEST describing a filled
    shape. I named no Icon glyph at all: the divider is U+002F text and the collapse mark is
    U+2026 text. alt-arrow-right is named once, in Q2, as the option NOT taken.
[x] Every prop and every prop VALUE I gave for Section, Layout or Cluster appears in the prop
    unions: Section surface=paper|tint|ink|blue, density=tight, flush; Layout rowGap=block|
    stack, colGap=gutter, columns={[1,2]}|"tile", minTrack=sm; Cluster as, colGap=inline,
    rowGap=block, align=baseline, nowrap.
[x] Zero hex codes / rgb() / hsl() / colour words outside the contrast measurements.
[x] Zero Tailwind class names. Zero CSS declarations, selectors or @media blocks. Property
    names appear only in prose (section 13's transition list, section 14's greps).
[x] Every --text-* role I paired with a tracking companion is on the list that has one:
    --text-eyebrow-tracking, cited for the hero's eyebrow. --text-caption is named four times
    in section 8 as "none — this role has no tracking companion".
[x] Every layout distance is a gap-scale role name, referred to by name: --gap-inline,
    --gap-block, and — since Q1(c) — the hero band's own --sec-padding-y for the trail-to-hero
    seam, which resolves to --gap-section / --gap-column / --gap-section-open. No layout
    distance is written as a number except as a parenthetical gloss on a token's own value.
[x] Every space-ramp reach carries its justification sentence in the required form. Count: 2.
[x] Every literal pixel value is a component size or a container cap, t-shirt named, and says
    what it was measured against. Count: 3 (44px hit floor vs --btn-hit-min; 18.85px label box
    as the arithmetic of --text-caption; 256px narrowest specified track vs --lay-track-sm and
    a measured 317px trail). Plus the measured consequences quoted as arithmetic rather than as
    declared values: the 20.85px anchor box (18.85 line box plus the rule's 2px clearance held
    inside it), the 44.85px wrapped pitch, the 0.85px by which consecutive targets therefore
    clear each other, and the 23.15px the bottom-anchored hit reaches above the box. The earlier
    42.85px pitch and its 1.15px overlap are cited in section 9 as what the geometry fix removed,
    not as live values.

COLOUR AND CONTRAST
[x] The colour table has one row per token and four columns: paper, tint, ink, blue.
[x] No cell is empty, "same as paper", or a delta. Rows: 8 × 4 cells = 32.
[x] Every text colour has a measured ratio against the exact ground or fill it sits on. There
    is no hover fill and no pressed fill in this component — stated as an assertion under the
    table — so the hover and pressed inks are measured on the surface ground, which is what
    is behind them.
[x] Every text ratio is >= 4.5:1. Tightest: 4.91:1 (--crumb-link-ink on blue; also
    --crumb-collapse-ink until it was deleted on 29 Sep 2026). No disabled state exists, so
    the exemption is never used.
[x] The focus ring is measured against its own gap colour on every surface: 6.17 / 5.51 /
    7.32 / 6.23, floor 3:1.
[x] Decoration is marked "n/a — decoration" rather than left blank — the divider row, with the
    measured number given in brackets for information. The ring-gap row is marked as the
    ground the row above is measured against.
[x] One paragraph per surface explains what moved and why. Four paragraphs.
[x] The nested-surface case is addressed, with the 1.13:1 failure named and the rendered ratio
    given — 7.27:1, corrected at build from the 4.92:1 this spec first quoted, which was paper's
    number rather than tint's. ALL 28 measured cells in the section 6 table were recomputed from
    the primitives.css hexes at build: every one matched to the stated precision. The two errors
    were both in the surrounding PROSE, not in the table.

STATES
[x] Every state I claim comes from the fixed model, with the repo's suffix: rest, -hover
    (hover and focus), -pressed.
[x] The rendered hover state differs from the rendered pressed state on all four surfaces.
    On blue the ink move is one ramp step (white → --color-brandeis-50) and the note says the
    rule width carries the difference.
[x] Every state token I introduced MOVES on at least one surface. --crumb-link-ink-hover and
    -pressed move on all four. No --crumb-*-bg-* token exists (no fill), no --crumb-disabled-*
    exists (no disabled), no --crumb-link-ink-current exists (currency is a part, not a
    state), no --crumb-expanded-* exists (nothing opens) — each absence stated as an assertion.
[x] Every state token is declared on all four surfaces, including where it equals rest:
    --crumb-link-ink-hover on tint is the same --color-brandeis-500 as on paper and is
    declared in both blocks.
[x] Disabled uses its own tokens and no opacity — vacuously: there is no disabled state, and
    opacity appears nowhere. No colour-only state: hover and focus add a rule, pressed
    thickens it, current is a different element carrying aria-current.

LAYOUT, TYPE, SEMANTICS
[x] Every arrangement is a Section, Layout or Cluster. columns is never set inside the
    component, so no colGap is stated for a column seam; colGap="inline" is stated on both
    Clusters that have an inline seam. The specimen's columns={[1,2]} states colGap="gutter".
    The Q1(c) trail band takes no Layout at all: one child, no axis to state, and an axis
    nobody states renders 0 — correct for a single-element band rather than an omission.
[x] No margin on any child, anywhere in the spec. The single margin in the module is the
    negative --space-1 of the clipped hidden-text box, declared as such in 7(c), 10 and 14.
[x] No media query changes a gap step or a type role. Section 9 says nothing changes at 1023
    or 767.
[x] Every part carrying running text names a measure — none does, and section 8 says so and
    says why --measure-body is declined.
[x] Every interactive target reaches 44px on touch, by extending the hit area past the box
    (Button's mechanism), so the row does not move — and the FULL 44 is live, which took a
    correction: centred on the box, 11.575px of it fell below the band and was painted over by
    the next one, cutting the real target to about 36px with every check green. It is anchored to
    the box bottom and grown upward instead, reaching 23.15px into the band's 64 of top air.
    Both consequences are measured and stated: consecutive wrapped rows' targets CLEAR each
    other by 0.85px (the 1.15px overlap this spec used to accept went away with the same fix),
    and the upward reach reaching under a sticky nav is what the band's 64 answers. Q9 closed.
[x] Every ARIA idref I specified points at an element that is ALWAYS rendered — vacuously and
    deliberately: the component holds no idref at all, and section 11 says why.
[x] No selector walks upward; no :has(); every state a parent needs is a prop or a class.
    Nothing here needs a parent to detect anything.

COMPLETENESS
[x] All thirteen content edge-case rows answered — none skipped; the two "none" rows say why.
[x] The "parent that does not size it" row names a minimum: no min-inline-size token, the
    intrinsic floor is the widest label, and the narrowest specified track is --lay-track-sm.
[x] Do's and Don'ts are testable: each of the 15 names the grep, the rendered-DOM assertion or
    the type check that decides it. Item 7 is new — it is the Q1(c) band, asserted from the
    rendered DOM: computed padding-block 0px, one element child, data-surface equal to the
    next band's.
[x] The specimen plan renders the 1 × 1 matrix and the depth ladder, forces every state that
    can be forced (none — noted as such), includes all four surfaces as sibling bands with
    identical markup, the nested-surface band, every edge case above, two adjacent, and two
    two adjacent. CORRECTED AFTER AUDIT: the first build ticked bands 2, 5 and 9 off without
    building them — band 2 had prose where reference rows belong, band 5 described an eyebrow in
    the note's own sans face instead of rendering the mono role, so Q3 was unproven, and band 9
    did not exist. All three are built now, and band 7 is struck with its reason. Verified in the
    rendered output rather than asserted. The surface ladder was ALSO broken in the first build
    and is the sharper lesson: it rendered `paper` in all 24 instances, because a wrapping Section
    sets data-surface for its subtree but the trail paints its own band and needed the prop passed.
    Four grounds, one right by accident, every check green.
[x] Section 16 says None, with the reading of why --crumb-* declarations are not requests.
[x] Every open question has options, a recommendation, and a BLOCKING / non-blocking mark.
    Nine questions, every one resolved inline on 20 Aug 2026 and marked Resolved; ZERO blocking,
    which is what Status: accepted requires. Q1 was decided AGAINST this spec's recommendation
    — option (c), the trail's own Section flush band — and Q9 is new, created by that answer:
    a flush band supplies no air above the trail either. Q9 is non-blocking because the band is
    the caller's, so the component built from this document is the same under either answer.
[x] Squint test: the specimen route reads as five shapes — a wide surface ladder, a tight
    depth ladder, a hero-scale in-situ band, a two-track narrow pair, a stress list — not one
    rectangle repeated.
```
