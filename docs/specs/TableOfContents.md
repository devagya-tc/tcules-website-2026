# TableOfContents

## 0 · Front matter

| | |
|---|---|
| **Component** | `TableOfContents` |
| **Tier** | 2 pattern (`src/patterns/TableOfContents/`) |
| **Status** | implemented |
| **Token prefix** | `--toc-*` (collides with none of `--acc-` `--bcrd-` `--crumb-` `--btn-` `--call-` `--cta-` `--enq-` `--fig-` `--foot-` `--icn-` `--inp-` `--lay-` `--lcrd-` `--logo-` `--nav-` `--hero-` `--proof-` `--prose-` `--sec-`) |
| **Designer / date** | Design · 26 Aug 2026 |
| **Implements** | `docs/briefs/19-table-of-contents.md` |
| **Implemented at** | `src/patterns/TableOfContents/` · `src/styles/tokens/components/table-of-contents.css` · specimen `src/app/design/table-of-contents/page.tsx` |

**Verified against the loaded Tcules library** (`window.Tcules`, 20 components) and `guidelines/docs/vocabulary.md`. The hand-off mockup (`TableOfContents-specimen.html`, consumed and deleted once the build landed — the live proving ground at `/design/table-of-contents` replaces it) was composed from the real `Section`, `Layout`, `Cluster`, `Prose`, `ListCard`, `Accordion`, `Button` and `Icon`, with only the new rail hand-built to this document, so every number in sections 6, 7 and 9 was **measured in a browser** rather than reasoned about. Where a figure is measured rather than declared it says so.

**Something new IS needed, and this is why.** The composition around the rail is entirely existing components with existing props — `Section` for the band, `Layout` with breakpoint `columns` for the two-track shell, `Prose`/`ListCard`/`Accordion` for the body. None of that is specified below. What does not exist is a *control column that reports the document's scroll position*: a part with its own geometry (a sticky box that caps its own inline size and scrolls internally), its own colour set on four surfaces, and a mechanism the codebase has never had. That mechanism is the whole reason this is a component and not a page. If the current-section mark were dropped, the honest answer would be "nothing new is needed — this is a `Layout` and a list of links", and the spec would stop here.

**Two names in the brief were reported as absent from the vocabulary, and both in fact exist** — **`--text-index`** (section 8) and **`--lcrd-number-baseline-offset`** (section 7). The designer's guidelines copy predated both, and it was regenerated on 26 Aug 2026. Neither is used here, and section 16 says why each is declined rather than missing.

**Owner decisions, 26 Aug 2026 — six things moved after hand-over, and this document has been edited to match rather than annotated.** (1) The outline now renders **below 1024** as a static full-width block immediately after the hero, one column at every width, same markup, one media query — §9, and §17 Q3 is overturned. (2) Which pages get it is decided by **page type**, not by heading count — §17 Q1. (3) The band is deleted from **all six** route modules that carry it. (4) The mechanism in §16 is **approved**, with the observer gated to ≥ 1024. (5) §17 Q6 is **struck: its premise is false** — `reset.css` already resets `ol`. (6) §14's twelve-token count, its `display` rules and its three computed-geometry checks are corrected to what this repo can actually assert. Each edit says so where it lands.

## 1 · Identity

The outline of a long page: an ordered, author-curated list of that page's section headings, held in a sticky rail beside the body, marking the section the reader is currently in. It takes an array of `{ label, href }` and renders exactly what it is handed. It never reads the DOM to *discover* headings; it resolves the targets it was already given, in order to know which one the reader has reached.

**Tier 2 pattern, and the tier is forced by the mechanism rather than by an import.** Internally this component composes nothing — its two zero-gap stacks are not arrangements (section 10) — so the primitive-may-not-import-a-primitive rule does not decide it. Two other things do. It takes content shaped like a CMS record: `{ label, href }` derived from `AuditSection.heading`'s `navigationLabel` and `anchorId`, which is the same shape and the same seam that makes `Breadcrumbs` a pattern. And a primitive "knows nothing above itself" — this one resolves ids that live *outside its own subtree*, in the page's body, and reports where that body has been scrolled to. That is the strongest possible form of knowing something above itself. `src/patterns/`.

**What it is NOT**

1. **Not navigation.** `SiteNav` is the control surface for getting to another page — sticky, one per page, with a panel and a rail compartment. This component's links never leave the page: the type forbids it (`href` is `` `#${string}` ``, section 3). An outline is a map of one document.
2. **Not the ancestor trail.** `Breadcrumbs` states where the page sits in the site and ends in the current page. This states what is inside the page and ends in the last section. They answer opposite questions and appear at the same time on the same routes without competing — one is a horizontal phrase above the hero, the other a vertical rail beside the body.
3. **Not the retired "On this page" band.** The block shipping in **six** route modules today — `tools/[slug]`, `services/[...slug]`, `how-we-work`, `audits/[slug]`, `expertise/[slug]`, `glossary/[slug]`, each a tint `Section`, a heading and a `Cluster` of `emphasis="link"` Buttons under the hero — is a *horizontal band*, and it is being deleted from all six and replaced on only one of them (§17 Q1: five are standard pages and get no outline at all). This component has two arrangements — the rail at 1024 and up, a static list below — and neither is a prop: they are one media query on one piece of markup (§9). There is no band variant, and section 4 records the band as rejected rather than as an option.

**Nearest existing component, and why this is not a prop on it.** `SiteNav`, which already has a sticky box, a rail compartment and a `'use client'` boundary. Three reasons it is the wrong home: `SiteNav` renders once in the layout shell above the route, so a per-route outline would have to be threaded through the shell to reach it; it is site chrome, and an outline is page content, which is why one is announced as "Main" navigation and the other as "On this page"; and a pattern may not import a pattern, so a `toc` prop on `SiteNav` would have to take a rendered `ReactNode` — a worse API than a component that takes an array.

**How many appear on a page.** At most one, and **page type decides, not heading count** (§17 Q1, answered 26 Aug 2026). Long-form documents render it — `insights`, `case-studies`, `terms-of-use`, `privacy-policy`. Standard pages do not, including `services`, `expertise`, `tools`, `how-we-work`, `glossary` and `audits`, which carried the retired band.

**CORRECTED AT ADOPTION (26 Aug 2026): `audits` was on the long-form list and should not have been, and the error is instructive because this very sentence names the criterion it broke.** `audits` can only have qualified on heading count — median 11 H2s, the highest in the corpus — which is the one basis this rule disavows. On page type it is a standard page and the content model says so plainly: `AuditPage` and `ServicePage` are the same shape (a hero with `eyebrow`, `highlightedText`, `description`, `tags` and `actions`, then `sections`, `faq`, `cta`), and `HowWeWorkPage` is literally `AuditPage & {…}` — so if an audit page is long-form, so is a service page and so is how-we-work, both of which this sentence excludes. The six audit routes are productised service offerings — "Design-System Audit", "Product Modernisation Assessment", "Prototype Hardening Review" — carrying a hero CTA, an FAQ and a closing CTA. The footer files them in the same column as AI Product UX and Design Engineering. They are sales pages with a lot of headings, not documents read end to end.

**Adopted on `terms-of-use` and `privacy-policy` at the same time.** Both were briefly written off as blocked on the absence of a `navigationLabel` field — wrongly, and the lesson is that a type does not tell you what is in it. Measured against what Strapi returns: terms-of-use is 11 sections at a median of 16 characters and a maximum of 26, privacy-policy 7 at 22 and 27, **none over the 40-character warning**, where the corpus's editorial headings run to a median of 35 and a maximum of 87. Legal headings are terse by convention, so the heading IS the navigation label here rather than a fallback for one. Both routes already carried ids on every `h2`.

**`case-studies`, `insights` and podcasts are adopted too, via a documented workaround; events are not.** The blocker was more specific than "no heading field", and worth stating because the fix is shaped by it. `BlogBlock`, `CaseStudyBlock` and `PodcastBlock` (which `EventBlock` aliases) do carry a `title`, but only on their `video` and `embed` members: it is the label on a media embed, and the `<h2>` the routes render from it is a caption, not a section heading. **The real headings are inside the `prose` blocks' `html`**, which `Prose` renders with `dangerouslySetInnerHTML` and which carries no ids — the same opacity this spec cites for H3s, one level up. An outline built from what those routes currently put in an `h2` would list video titles.

What ships instead is collection **during** the markdown conversion the seam already performs: `markdownToHtml` recognises headings in order to emit them, so it now optionally puts an opaque positional id (`toc-1`, `toc-2`) on the level-2 ones and returns the list. Level 2 only, because this component renders one flat level and 12 of 16 articles mix h2 with h3. Events have zero level-2 headings in all three entries, so they render nothing — correctly. **`docs/guides/long-form-outline.md`** carries the design, the limits, the root fix and the deletion path.

The labels turned out to need no new field, and the earlier claim here that they would is worth keeping as a correction: it came from the old repo's corpus (case-study headings median 44, over half above 40) rather than from the live CMS, which says **median 20, 16 of 93 above 40**. Measured on what Strapi actually returns, the headings were already navigation labels — the same mistake, and the same lesson, as the legal pages two paragraphs up. There is no editorial threshold and no minimum entry count beyond the component's own structural floor of two. It renders at **every** width (§9): a sticky rail at 1024 and up, a static block below. Never two: section 12's last-but-two row says what breaks.

## 2 · Anatomy

| Part | Element | Required | Content slot | Carries |
|---|---|---|---|---|
| `rail` | `<nav aria-labelledby>` | yes | none | the landmark, the sticky inset, the inline cap and floor, the block cap, the internal scroll, and its own inline-end padding. Paints no ground and no border |
| `title` | `<p id>` | yes | none — the fixed string "On this page" | `--toc-title-ink`, and the rail's accessible name via the id `rail` points at. **It carries no rule.** The air below it is the only thing separating the head from the ladder |
| `list` | `<ol>` | yes | none | nothing but the reset it applies to itself — no marker, no inset, no gap. Deliberately not a `Layout`; see section 10 |
| `entry` | `<li>` | yes, 2 or more | none | nothing of its own, and therefore **no class of its own** — the build dropped `styles.entry` rather than ship a class name with no rule behind it, which renders unstyled and passes every check. The `<li>` carries `current` when marked and nothing otherwise |
| `link` | `<a href>` | one per entry | none | the control box: the 45.70px target, the block padding, the inline gap between its two columns, the label ink and its states, and `aria-current` when current |
| `ordinal` | `<span aria-hidden="true">` | yes | none — generated from position, zero-padded to two digits | `--toc-ordinal-ink` / `--toc-current-ordinal-ink`. A flex item with a **fixed `--toc-ordinal-inline` basis and no shrink**, so the rule beside it holds one inline position at every rail width |
| `label` | `<span>` | yes | none | the underline's positioning context, and the flex item that takes the remaining inline space |
| `labelInk` | `<span>` | yes | `items[i].label`, verbatim | `--text-body-sm` and the two-line clamp. Separate from `label` because the clamp needs `overflow: hidden`, which would otherwise crop the underline drawn outside the box — the same split, and the same name, as `Button`'s `labelInk` |
| `rule` | `::before` on `link`, at `inset-inline-start: var(--toc-ordinal-inline)`, spanning `inset-block: 0` | yes | none | `--toc-rule` / `--toc-current-rule`, and the 1px → 3px width step. **It sits between the two columns, not on the leading edge**, and because entries are contiguous the per-entry segments butt into one unbroken line |
| `underline` | `::after` on `label` | yes | none | `currentColor` — no token of its own, deliberately, exactly as `Button`'s link rule and `Breadcrumbs`' `rule` do it, so it can never disagree with the label above it |
| `current` | a class on `entry` | only on the marked entry | none | no value of its own — it re-points `label`, `ordinal` and `rule` at their `--toc-current-*` values |
| `ring` | `:focus-visible` on `link` | yes | none | `--toc-ring-color` over `--toc-ring-gap-color`, drawn **inward** |

**One drawn line, and it is inside the rail.** The earlier draft put a hairline under `title` *and* a hairline down the leading edge of every `link`; the two met at a corner and read as a box nobody finished. Both are gone. What replaces them is a single hairline **between the ordinal column and the label column**, running the ladder's full height and turning no corners, with the head separated by air alone. The rail's outer edge is now one straight alignment — title and ordinals flush at the content column's inline start — and the only interior structure is the rule the mark lives on.

**Two parts do the drawing, and they divide the work.** `rule` carries **currency** and nothing else: 1px is structure, 3px in `--toc-current-rule` is "you are here". `underline` carries the **pointer** and nothing else: it wipes in on hover and focus and thickens on press. Nothing in the rail is ever ambiguous about which of those two things it is reporting.

Nothing here is optional in the sense of being switchable. `current` appears as a consequence of scroll position; the internal scroll appears as a consequence of entry count. There are no author-facing slots at all, which is why section 12's slot rows read as they do.
## 3 · Props / API

```
type TocItem = { label: string; href: `#${string}` }
```

| Prop | Exact literal union | Default | What it decides |
|---|---|---|---|
| `items` | `readonly TocItem[]` | none — required | Everything: membership, order, the labels, the targets, and therefore the ordinals, which are generated from position rather than passed |

**One prop.** The seam decides which sections are in the outline (a section with no `navigationLabel` is absent), the component renders what it is handed above its own floor of two.

**Deliberately NOT props**

| Not a prop | Why |
|---|---|
| `surface` | The rail paints no ground. It sits **inside** the page's `Section`, so it reads `data-surface` from an ancestor, exactly as `Button`, `ListCard` and `Accordion` do. It is not like `Breadcrumbs`, `SiteNav` or `SiteFooter` — those take `surface` because they own a band and have no ancestor to ask. This one owns a track, not a band |
| colour, padding, gap, radius, height, width | The token layer owns colour; the primitives own distance; the component owns its own sizes. The rail's inline size in particular is not a caller decision: it caps itself at `--sec-rail` inside whatever ratio track it is given (section 7) |
| `className`, `style`, `id` | The props type is closed. The only reason to reach in would be outer spacing or width, and both are answered above |
| `title`, `showTitle`, `label` | "On this page" is one string decided once. A rail titled differently on one route is a bug, and the visible title *is* the accessible name (section 11), so a boolean that hid it would silently rename the landmark |
| `depth`, `levels`, `maxDepth` | The hard constraint, and it is a content-model fact: H3s live inside opaque rich-text strings that `Prose` renders with `dangerouslySetInnerHTML`, carry no ids, and nothing generates any. One level. No nested case is specified "for later" |
| `arrangement`, `variant`, `compact` | Two arrangements, and neither is a prop: the sticky rail at 1024 and up, the static block below it, switched by one media query on identical markup (§9). A prop would let two routes disagree about what a phone gets. The retired horizontal band is not one of the two |
| `size` | One size (section 4). A smaller one would put the entry box under 44px |
| `threshold`, `minItems` | Which pages get an outline is a **page-type** decision the route makes (§17 Q1), and there is no heading-count threshold anywhere in the system. The component's own floor of two is structural, not tunable |
| `activeId`, `currentIndex`, `onChange` | The whole point is that the component observes. A controlled current index would move the mechanism into 82 call sites |
| `offset`, `rootMargin`, `scrollLine` | The reading line is `--toc-sticky-inset`, and the observer reads it off the rail's own computed style rather than restating it (section 16). One literal, one place |
| `children` | Not in the props type. Interactive content in an outline is section 12's last row |

**Compile errors, not review comments**

1. **An `href` that is not a fragment.** `` `#${string}` `` makes `href: '/services/design-systems'` fail at the call site. This is the type expressing the hard constraint that the component resolves its own targets from its own props: every href is `#id`, so there is no registration API, no context and no `ref` handshake.
2. Any prop other than `items` — closed props interface, no index signature, no `HTMLAttributes` spread. `surface`, `className`, `activeId`, `children` all fail excess-property checking.
3. An item missing `label` or missing `href`; a mutable array where the component would reorder it (`readonly`, and there is no in-place sort).
4. **Not** compile errors, and deliberately: fewer than two labelled items (runtime, section 12) and an `href` whose fragment matches nothing in the document (a template-literal type cannot know the DOM — section 11 says what happens instead).

## 4 · Variants × sizes

| | `md` (only size) |
|---|---|
| `rail` (only variant) | the component |

A 1 × 1 matrix, stated as a decision — one variant, one size. Two things vary and neither is a prop: **entry count**, which is data, and **arrangement**, which is one media query on the same markup (§9). The size is named `md` because the entry box is 45.70px, which is the touch floor rather than a scale step — it lines up with `--inp-height-touch` 44 and `--btn-hit-min` 44, not with `--btn-height-sm` 32.

**Steps with the single size:** nothing, there being one.
**Deliberately does not step:** the 44px target floor (a floor is not a scale), the two gap roles inside the rail, and the type roles — a rail with a different label size would read as a different component beside the same body.

**Variants considered and rejected**

| Rejected | Why |
|---|---|
| `arrangement="band"` (the horizontal row under the hero) | This is what ships today and what is being deleted. Keeping it as a variant guarantees 33 routes never migrate |
| `variant="compact"` / a mobile substitute **as a prop** | The component does render below 1024 (§9, owner-directed) — but as the same markup under one media query, not as a switchable variant. What section 9 still rejects is the *sticky* compact bar: a permanent 44px of a 640px viewport, and the band being retired wearing another name |
| `size="sm"` | Would need the entry box under 44px, or a hit extension that overlaps its contiguous neighbours — the measured `Breadcrumbs` defect |
| `variant="inverse"` | This is what `data-surface` is. An inverse variant is the surface model reimplemented locally, badly |
| `numbered` / `plain` as a variant | Numbering is decided once, here, and the digits are load-bearing: they are the second column that stops the ladder being grey, and the non-colour half of the current mark |

## 5 · States

| State | Suffix | Applies to | What moves |
|---|---|---|---|
| rest | *(none)* | `link` | `--toc-label-ink`; `underline` at `scaleX(0)` |
| hover | `-hover` | `link` | `--toc-label-ink-hover` — a **dark neutral**, not blue; `underline` wipes to full width at `--toc-underline-width` |
| focus, keyboard | `-hover` **plus the ring** | `link` | the hover ink and the full-width underline, plus the ring at `--toc-ring-color` over `--toc-ring-gap-color` |
| pressed | `-pressed` | `link` | `--toc-label-ink-pressed`; `underline` steps from `--toc-underline-width` to `--toc-underline-width-pressed` |

**Blue is not a pointer state in this component, and that is the deliberate inversion.** Everywhere else in this system — `Button emphasis="link"`, `Breadcrumbs`, `Prose`'s inline links — blue is what a link turns when you point at it. Here blue means **"you are here"**, and the pointer states run the other way, into dark neutral. The house rule survives intact, because it is *"blue never appears on anything that is not clickable"* and every entry is a link; what changes is which of two clickable meanings blue is spent on. **The cost, stated:** this rail's hover language differs from every other link on the site, so a reader who has learned "blue = I can click this" gets no blue when they point at an entry — they get ink and an underline instead. The underline is what pays for that: it is the same affordance `Button`'s link emphasis draws, so the *shape* of the hover is familiar even though the colour is not. Owner-directed; recorded as a departure in section 17 Q11.

**Hover ≠ pressed on all four surfaces.** The label ink moves on every one — `--color-neutral-900` → `950` on paper and tint, `--color-neutral-200` → `--color-white` on ink, `--color-brandeis-50` → `--color-white` on blue — **and** the underline doubles in height, so the two states differ in a second, non-colour way on every surface rather than only where the ramp allowed it.

**`rule` does not respond to the pointer, and no `--toc-rule-hover` exists.** Its absence is the assertion that the rule reports currency only. A hairline that brightened on hover would give the rail two things that both mean "attention" and no way to tell which is which — which is exactly the failure the earlier draft had, where the same rule carried hover *and* current.

**`current` is a PART, not a state, and that is the one place this spec departs from the fixed model's naming.** The model routes "held: active / selected / current" to `-pressed` through a prop-driven class. Taking that literally would make the current entry look pressed, which is wrong twice over: it would hand currency the pointer's tokens, and it would forbid the blue the owner has chosen for it. `Breadcrumbs` already established the escape and it applies for a second reason here — the model's held states describe a control **the user selected**, and nobody selected this; it is a report of where the document is scrolled to. So currency is a part with part-named tokens (`--toc-current-label-ink`, `--toc-current-ordinal-ink`, `--toc-current-rule`), and the naming keeps the two ideas separable in the sheet.

**The current part and the pointer states compose, and the precedence is specified:** hover and pressed **win** on `label`, because the reader is pointing at that row and the live thing should answer; the 3px `--toc-current-rule` and the blue `--toc-current-ordinal-ink` **persist** through hover, press and focus, so the mark can never be hidden by a pointer. Hovering the current row therefore renders a blue ordinal, a blue 3px rule, a dark neutral label *and* an underline — visibly the current row being pointed at, not either state alone.

**States deliberately excluded**

- **disabled.** An entry is either in the outline or absent from it. No `--toc-disabled-*` tokens exist, and their absence is the assertion that a section is never listed-but-unavailable. Nothing here uses `opacity`.
- **expanded / open.** Nothing opens. One level, no disclosure, no `aria-expanded`, no `aria-controls` pointing at something unrendered, no focus to place after a change.
- **loading, error.** Not in the model, and nothing here is asynchronous: the items are in the page's data before it renders. The observer is not a loading state — it resolves synchronously on mount, and "no row current" is a legitimate rest condition (the reader is above the first heading), not an empty state.
**Owner-approved amendment, 29 Sep 2026 (tracker 2.17, the visual overhaul) — three things moved, and this document has been edited in place to match; each edit is marked "Amended 29 Sep 2026".** (1) The rail cap `--toc-max-inline` is **232px**, up from 180, measured so no realistic label wraps where the grid allows it — §7. (2) The title and the ordinals are legible rather than grey on grey: the ordinal takes `--text-ui-sm` (12px), the title `--text-eyebrow` (12px), and both take an ink **one step darker than the labels** on every surface — §6, §8. (3) **Below 1024 the outline is a native `<details>`, closed by default** — one 44px "On this page" row rather than an eleven-row block before the first paragraph; at 1024 and up the same `<details>` is forced open through `::details-content` and is the rail — §9, §11.

## 6 · Per-surface colour

Eleven tokens, four surfaces, forty-four cells, no deltas. `paper` values are declared on `:root, [data-surface=paper]` following `nav.css` and `button.css`. Every ratio was computed from the exact hexes in `vocabulary.md`.

| Token | paper (`--color-paper`) | tint (`--color-paper-deep`) | ink (`--color-neutral-950`) | blue (`--color-brandeis-500`) |
|---|---|---|---|---|
| `--toc-title-ink` | `--color-neutral-700` — **8.14:1** *(amended 29 Sep 2026; was 600)* | `--color-neutral-800` — **10.54:1** *(was 700)* | `--color-neutral-400` — **8.05:1** *(was 500)* | `--color-brandeis-50` — **5.57:1** *(was 100)* |
| `--toc-label-ink` | `--color-neutral-600` — **4.92:1** | `--color-neutral-700` — **7.27:1** | `--color-neutral-500` — **5.41:1** | `--color-brandeis-100` — **4.91:1** |
| `--toc-label-ink-hover` | `--color-neutral-900` — **14.62:1** | `--color-neutral-900` — **13.06:1** | `--color-neutral-200` — **12.83:1** | `--color-brandeis-50` — **5.57:1** |
| `--toc-label-ink-pressed` | `--color-neutral-950` — **17.10:1** | `--color-neutral-950` — **15.27:1** | `--color-white` — **17.26:1** | `--color-white` — **6.23:1** |
| `--toc-ordinal-ink` | `--color-neutral-700` — **8.14:1** *(amended 29 Sep 2026; was 600)* | `--color-neutral-800` — **10.54:1** *(was 700)* | `--color-neutral-400` — **8.05:1** *(was 500)* | `--color-brandeis-50` — **5.57:1** *(was 100)* |
| `--toc-current-label-ink` | `--color-neutral-900` — **14.62:1** | `--color-neutral-900` — **13.06:1** | `--color-neutral-100` — **14.47:1** | `--color-white` — **6.23:1** |
| `--toc-current-ordinal-ink` | `--color-brandeis-500` — **6.17:1** | `--color-brandeis-500` — **5.51:1** | `--color-brandeis-300` — **7.32:1** | `--color-white` — **6.23:1** |
| `--toc-rule` | `--color-neutral-300` — n/a — decoration (1.54:1) | `--color-neutral-400` — n/a — decoration (1.90:1) | `--color-neutral-700` — n/a — decoration (2.10:1) | `--color-brandeis-300` — n/a — decoration (2.64:1) |
| `--toc-current-rule` | `--color-brandeis-500` — **6.17:1** as a graphical object, floor 3:1 | `--color-brandeis-500` — **5.51:1** | `--color-brandeis-300` — **7.32:1** | `--color-white` — **6.23:1** |
| `--toc-ring-color` | `--color-brandeis-500` — **6.17:1** against its gap | `--color-brandeis-500` — **5.51:1** against its gap | `--color-brandeis-300` — **7.32:1** against its gap | `--color-white` — **6.23:1** against its gap |
| `--toc-ring-gap-color` | `--color-paper` — n/a — this is the ground the ring is measured against, one row above | `--color-paper-deep` — n/a — same | `--color-neutral-950` — n/a — same | `--color-brandeis-500` — n/a — same |

Every text ratio above is measured against **the ground the text actually sits on**. There is no hover fill and no pressed fill anywhere in this component — no `--toc-*-bg-*` token exists — and that absence is an assertion, not an omission: the hard constraint is that the rail must not own its ground, so nothing paints a box behind a row on any surface, and the hover and pressed inks are measured on the band's own ground because that is what is behind them. **`underline` has no colour token at all:** it paints `currentColor`, so it can never disagree with the label it underlines and can never need a surface block of its own. Not a floor — it is decoration, redundant with a colour move it always accompanies.

**`--toc-current-rule` is measured, not marked decoration, and `--toc-rule` is.** The 1px hairline between the columns is redundant structure — remove it and nothing is lost but shape — so it is decoration at 1.54:1 on paper. The 3px segment is the current mark, so it is a meaningful non-text graphical object held to 3:1; it clears that by twice over on the tightest surface, and it shares its value with `--toc-current-ordinal-ink` on every surface rather than being tuned separately, so the mark reads as one blue thing rather than two.

**The ordinal is held to the text floor even though it is `aria-hidden`.** A sighted reader navigates by those digits. `aria-hidden` describes what a screen reader skips — the `<ol>` already announces "4 of 11" — not what a designer may under-contrast. So `--toc-ordinal-ink` is a 4.5:1 row, and the reason the digit column still reads as quieter than the labels is **size and family** (12px mono against 14px sans), not ink. **Amended 29 Sep 2026, tracker 2.17 —** the floor alone proved not to be enough: at 11px mono and 4.92:1 the digits and the head read as grey on grey, so both now sit **one ramp step darker than the unmarked labels on every surface** — the step `--sec-ink-label` takes on paper, tint and ink — and clear 4.5:1 with room: 8.14 / 10.54 / 8.05 / 5.57. The current ordinal is unchanged — the mark's own full-strength ink, brandeis-500 / 500 / 300 / white — so the blue ordinal and the 3px rule remain the only blue in the rail and still read as one thing.

**paper.** *(Amended 29 Sep 2026: the title and ordinals moved to `--color-neutral-700`, 8.14:1; the labels below are unchanged.)* The unmarked rows sit at `--color-neutral-600` — the quietest ink that clears the floor on this ground, at 4.92:1 — and `--toc-title-ink` now sits there too. That is the answer to "the head should be lighter": it was `--color-neutral-900` at 14.62:1 and it is now the same value as an unmarked row, which is as quiet as it can legally go, and it still reads as quieter because it is 11px mono against 14px sans. Currency is `--color-brandeis-500` on the ordinal and the rule (6.17:1) with the label at `--color-neutral-900` (14.62:1) — three times the contrast of its neighbours, and the only blue in the rail. The pointer runs the other way: hover to `--color-neutral-900`, pressed two steps further to `--color-neutral-950` (17.10:1), the darkest ink in the system. **Hover and current therefore hold the same label value on this surface, and that is deliberate**: pointing at a row previews what being in it looks like, and the blue says which one you are actually in. The rule stays `--color-neutral-300`, quieter than `--sec-rule-strong`'s 400, because it runs the ladder's full height rather than separating two items.

**tint.** *(Amended 29 Sep 2026: the title and ordinals moved to `--color-neutral-800`, 10.54:1.)* Every muted value steps one darker, because the ground did, and here it is forced rather than preferred: `--color-neutral-600` measures **4.39:1** on `--color-paper-deep` and fails the floor. So the title, the labels and the ordinals sit at `--color-neutral-700` (7.27:1), which is also `--sec-ink-muted` on this surface — the rail and the body copy beside it are then the same grey rather than two greys. The honest cost: **the rail cannot be as quiet on tint as it is on paper.** Both blues hold: `--color-brandeis-500` still clears at 5.51:1 on the deeper ground, so the mark is the same blue on tint as on paper, which matters more than a tuned value would — a reader moving down a page of alternating bands should not see the mark change hue.

**ink.** *(Amended 29 Sep 2026: the title and ordinals moved to `--color-neutral-400`, 8.05:1 — 12px mono is not what glows; the labels stay at 500.)* The direction inverts and the unmarked rows get **quieter**, not louder: `--color-neutral-500` at 5.41:1, one step below `--sec-ink-muted`'s `--color-neutral-400` (8.05:1), which is a deliberate departure from the surface layer's own answer — nineteen rows at 8.05:1 on a dark ground glow, and compete with the body copy beside them. The mark lifts three ramp steps to `--color-brandeis-300` (7.32:1), because `--color-brandeis-500` on `--color-neutral-950` is **2.77:1** and is exactly the failure the brief describes. The current label is `--color-neutral-100` (14.47:1) rather than white, which leaves `--color-white` free to be the pressed value (17.26:1) — so on the one surface where the ramp runs out at the top, currency and press still hold different values. The rule is the only thing that goes the other way, to `--color-neutral-700`: on ink a light hairline is louder than the labels it sits behind. This is the `Callout` trap, and the way through it is that the rail has no fill to get wrong — only inks, and every ink moves away from the ground rather than towards it.

**blue.** *(Amended 29 Sep 2026: the title and ordinals moved to `--color-brandeis-50`, 5.57:1 — the only step between the labels' 100 and the mark's white.)* This is the surface where the owner's decision cannot be taken literally, and saying so is the whole job of this column: **blue on blue is 1:1, so the mark cannot be blue.** It becomes `--color-white` (6.23:1) on both the ordinal and the rule, and the non-colour half of the mark — the 3px rule against 1px — does proportionally more work here than anywhere else. The unmarked rows sit at `--color-brandeis-100` (4.91:1, the tightest cell in the table and the reason nothing quieter is allowed). Hover goes to `--color-brandeis-50` (5.57:1) rather than to a neutral, because `--color-neutral-200` measures 4.63:1 here and reads as muddy grey on a saturated ground; pressed then reaches `--color-white` (6.23:1). One consequence to accept knowingly: **pressed and current hold the same white on this surface.** They stay distinguishable because pressed draws a 2px underline and current draws a 3px rule and a white ordinal, and because a press lasts as long as a finger is down.

**Nested surfaces.** The rail sets no surface and paints nothing: it reads `data-surface` from its nearest ancestor that declares one. Because all eleven tokens are declared in all four blocks, a rail inside a `tint` panel nested in an `ink` `Section` renders the **tint** column — `--color-neutral-700` labels at **7.27:1** on the tint ground, not `--color-neutral-500` stranded on `--color-paper-deep` at **2.82:1**. Recomputed on the build read — the spec said 1.63:1; the exact hexes give 2.82:1, still well under the 4.5 floor. That 2.82:1 is this component's version of the measured 1.13:1 failure the brief cites, and it is a failure of a deltas-only table rather than of a component. The specimen has a band for exactly this case, and it is the reason the `ink` column may not be written as "paper, but lighter".
## 7 · Geometry & spacing

**(a) Distances — gap-scale role names only**

| Where | Role | Owner |
|---|---|---|
| `title` down to the first `entry` | `--gap-block` | `rail`'s inner `Layout rowGap="block"`. **This distance replaced a rule.** With no hairline under the head, air is the only separator, so it takes the step that means "head to body inside a block" rather than the tighter one that meant "label above a rule" |
| `ordinal` to `label` across the control box | `--gap-text` | `link`'s own `gap`. The `rule` sits at the start of this gap, so the 16 is doing two jobs at once: it is the column seam and it is the clearance the rule needs on both sides |
| `entry` to `entry` | **none — stated as `none`, not omitted** | `list`. Contiguous boxes are what make the per-entry `rule` segments read as one unbroken line, and what make the pitch equal the target (section 9). This is `ListCard`'s reason for `rowGap="none"`, arrived at from the same place |
| `label` to the rail's inline end | `--gap-text` | `rail`'s `padding-inline-end`. Not decoration: on a platform with classic scrollbars the internal scroll draws its track here, and without it the scrollbar sits over the last characters of every label. Measured — with the padding the label column is 124px at the cap, and the longest label in the corpus still clamps at two lines |
| `rail` to the body track | `--gap-column` | **the page's** `Layout colGap="column"`. Two halves that must read as separate |
| the block-end air inside `--toc-max-block` | `--gap-gutter` | `rail`, as a term in the cap's arithmetic below |
| the air above the sticky rail | `--gap-gutter` | `rail`, as a term in `--toc-sticky-inset` below |

**(b) Component sizes — t-shirt named, each measured against something real**

| Name | Token | Value | Measured against |
|---|---|---|---|
| sticky inset | `--toc-sticky-inset` | `calc(var(--space-72) + var(--gap-gutter))` = **104px** — **corrected at build; this row said `var(--nav-bar-height)`** | `SiteNav` is `position: sticky; top: 0`, does not shrink on scroll, and is **72px at 1024 and up** — verified in the sheet: `.SiteNav_barRow` takes `min-height: var(--nav-bar-height)` inside `@media (min-width: 1024px)`. Composed as a calc rather than written as 104 so it cannot drift from the bar. `--nav-bar-height-compact` 64 never applies, because the rail does not render below 1024 |
| rail cap | `--toc-max-inline` | **232px** | **Amended 29 Sep 2026, tracker 2.17 —** was 180. Measured in the specimen at 1440: the label column is the cap less 56, so 124px at 180, and six of the eleven realistic labels wrapped to two lines beside ~55px of unused track. The widest, "Governance and ownership", is **175.6px** at `--text-body-sm`, so the column needs 176 and the cap 232; at 220 two still wrapped (166.5 and 175.6). The body is not crowded: the `[1, 4]` body track is 940.8px whatever the cap says, and at 232 the rail fills all but 3.2px of its 235.2px track. Below a 1304px viewport the track binds (179.2px at 1024) and labels wrap there, which is where the grid genuinely lacks the width. Verified in Chromium, WebKit and Firefox: all eleven rows 45.7px at 1440. **Earlier history:** Changed at build, and §17 Q14 is reversed with it.** This spec said `var(--sec-rail)`; the build declares this component's own 180px and names `--sec-rail` in a comment as the same intent. `breadcrumbs.css` records the doctrine and the reason: it quotes Section's former tight padding's value rather than reading it, because "a component token that reads `--sec-*` silently follows it the day the surface layer is re-tuned". A width this component depends on and Section never consumes is a COINCIDENCE, not a coupling. See the ratio arithmetic below |
| rail floor | `--toc-min-inline` | **160px** | The label-column arithmetic: 232 *(amended 29 Sep 2026; was 180)* less `--gap-text` 16 (the inline-end padding), less `--toc-ordinal-inline` 24, less `--gap-text` 16 (the column seam) leaves **176px** of label at the cap and **104px** at the floor — which at `--text-body-sm` holds 14 characters a line and 28 across the two-line clamp, enough for the longest three-word navigation label in the corpus. Also measured against a `[1, 6]` track inside the 1240 column, which computes to 160.6px: the floor is the width at which the rail is narrow rather than broken |
| ordinal column | `--toc-ordinal-inline` | **24px** | `--prose-marker-inset` 24px — this system's existing answer to how far a list marker sits from its text — and the measured two-digit mono column — 15.41px at `--text-micro`, about 16.3px at `--text-ui-sm` since 29 Sep 2026, which leaves 7.7 of clearance before the rule. It is a **fixed flex basis, not a ratio**, which is what holds the rule at one inline position on a 232px rail and on a 160px one alike |
| block cap | `--toc-max-block` | `calc(100dvh - var(--toc-sticky-inset) - var(--gap-gutter))` | The visible viewport below the sticky inset, less the same 32 of air at the block end. `dvh` rather than `vh` so resizing browser chrome cannot clip the last entry |
| entry block padding | `--toc-entry-padding-block` | **12px** | `--nav-sheet-row-padding-block` 12px, the closest analogue in the system (a stacked column of nav rows), **and** the 44px touch floor: a `--text-body-sm` line box is 21.7px, so 21.7 + 24 = **45.70px measured**, clearing 44 by 1.70. A two-line row measures **67.39px**. Both figures are from the browser |

**Four of these are ≥ 1024 only.** `--toc-sticky-inset`, `--toc-max-block`, the `--sec-rail` cap and the `--toc-min-inline` floor all describe a *column*. Below 1024 the outline is a full-width closed disclosure (§9, amended 29 Sep 2026), so it takes none of the four — and it takes one of its own, `--toc-summary-min-block` 44px, the summary's touch floor. `--toc-ordinal-inline` and `--toc-entry-padding-block` apply at every width, which is what keeps the 45.70px row and the digit column identical in both arrangements.

**No value here reads another component's layer, and §17 Q14 is reversed.** This spec proposed reading `--nav-bar-height` and `--sec-rail`. Neither ships. `--toc-sticky-inset` reads **`--space-72`** — the primitive `--nav-bar-height` itself resolves to — and `--toc-max-inline` declares its own **180px**, naming `--sec-rail` in a comment as the same intent. That is the idiom `Breadcrumbs.module.css:67` established and the reason it gives: it reads `--gap-column`, the step Section's former tight padding resolved to, rather than Section's token, because "a component token that reads `--sec-*` silently follows it the day the surface layer is re-tuned". Reading the shared primitive keeps the value in one place without the silent following; writing a bare `72px` would have put a literal in a layer that has a step for it. Both carry the re-check obligation in a comment. Grep for every other component's prefix in this layer returns **zero**.

**Which track this component was measured against, and the ratio arithmetic.** `Section` caps content at `--sec-container` 1240 with `--sec-gutter` 32 *outside* it, and `Layout`'s numeric tracks are `fr` ratios, so a fixed 180 is not expressible as a track. With `colGap="column"` (64) inside 1240:

| `columns` | rail track at 1240 | body track | rail track at 1024 viewport |
|---|---|---|---|
| `[1, 3]` | 294.0 | 882.0 | 224.0 |
| **`[1, 4]`** | **235.2** | **940.8** | **179.2** |
| `[1, 5]` | 196.0 | 980.0 | 149.3 |

**`[1, 4]` is the recommendation, and the 1024 column is what decides it.** At the breakpoint where the rail first appears, the `[1, 4]` track measures 179.2px — the `--sec-rail` cap less 0.8px — so the ratio and the existing token agree to within a rounding error at exactly the width where the rail is tightest. `[1, 5]` collapses to 149.3px there, below the 160 floor, which is the rail broken at the one width it cannot afford to be. `[1, 3]` is comfortable at 1024 but spends 294px at 1240 on a 180px rail and takes 59px off the body for nothing. Above about 1030 the cap binds and the 55px of slack sits at the rail's inline end, which widens the *apparent* gutter to about 119 and is welcome: the rail's title and ordinals stay flush with the content column's inline-start edge, so they line up with the hero title, every `h2` and every card edge on the page.

**What that leaves, stated rather than routed around.** The body track is 940.8px and `Prose` caps itself at `--measure-body` 68ch, about 571px at `--text-body`. Prose will not fill the track, and it should not: the composition is a single-column stack in the body track whose **text children cap themselves and whose block children fill it** — `ListCard` ladders, `BlockCard` grids, `Accordion` sets and tables run the full 940 while the paragraphs sit at 571 against the same inline-start edge. The ragged inline end that produces is the rhythm, not a defect, and it is what stops a page-with-a-rail reading as one narrow column.

**(c) Reaches into the space ramp — 4 at build, of which 1 is an optical correction**

`--toc-underline-offset: var(--space-2)`

> optical, not `--gap-tight`: this corrects the collision between the underline and the descenders of the label measured against the "y" and "g" in "Governance and ownership" set at `--text-body-sm`, so the day the gap scale is re-tuned this must not move.

**Three more at build, and none of them is optical — they are values with no gap-scale name, reading the step they would otherwise have restated.** The spec had all three as literals; the build reads the ramp instead, which is what keeps this layer's only numbers the two caps.

`--toc-sticky-inset: calc(var(--space-72) + var(--gap-gutter))`

> not a gap step and not a literal: 72 is the primitive `--nav-bar-height` resolves to, and reading the shared step rather than Nav's token is what stops this component following Nav silently. Re-check if the bar moves off this step.

`--toc-ordinal-inline: var(--space-24)`

> the step `--prose-marker-inset` reads for the same geometry. Explicitly NOT `--gap-block`, which is the same 24: this is the WIDTH OF a column, not the distance BETWEEN two things, and the gap scale names only the second.

`--toc-entry-padding-block: var(--space-12)`

> the step `--nav-sheet-row-padding-block` reads. 12 has no gap-scale name, which makes the ramp its only honest source.

The ring's inset needs no reach at all: it is the existing `--focus-ring-offset`.

**Radius.** No radius at rest: `link` paints no box, so no token exists for one. On `:focus-visible` the ring's corner is `--toc-entry-radius-focus: var(--radius-4)`, following `--btn-radius-bare-focus` — a 2px ring around bare text with square corners reads as a rendering artefact.

**Border width.** `--toc-rule-width: var(--border-width-hairline)` (1px, matching `--sec-rule-width`, `--acc-rule-width` and `--lcrd-rule-width`); `--toc-current-rule-width: var(--border-width-3)` (3px). The step is 1 → 3 rather than 1 → 2 on purpose: at `--proof-quote-rule-width`'s 2px the difference between a marked and an unmarked row is one device pixel on a 45.70px row, which is not a mark. The underline is `--toc-underline-width: var(--border-width-hairline)` (1px, same as `--btn-link-rule-width`) stepping to `--toc-underline-width-pressed: var(--border-width-2)`, following `--crumb-link-rule-width-pressed`. All four widths measured in the browser.

**Shadow.** `--shadow-none`. The focus ring is drawn as the two-shadow gap-plus-ring pair exactly as `Button`, `Breadcrumbs` and `SiteFooter` draw theirs, with one difference: **it is drawn inward.** An outset ring at `--focus-ring-offset` would reach 4px above and below a box whose neighbours are contiguous, so it would overlap the rows either side, and 4px past the rail's inline start. Inset, the ring's outer edge is the row's own edge and nothing collides. The gap is still `--toc-ring-gap-color` and is still the surface ground, because the row paints no fill — so the ring's 3:1 measurement in section 6 is against the same thing it would have been outset.

**Z-layer.** `--z-base`. A sticky element needs no stacking level of its own unless something must pass *under* it, and the rail's only overlap is the `SiteNav` bar crossing its top edge — which the nav must win. So the rail must **not** take `--z-sticky`: that would put the outline over the site's own bar. Nothing else in this component stacks.
## 8 · Typography

| Part | Role | Tracking companion | Case |
|---|---|---|---|
| `title` (and the summary label) | `--text-eyebrow` *(amended 29 Sep 2026; was `--text-micro`)* | `--text-eyebrow-tracking` | `--text-mono-case` |
| `ordinal` | `--text-ui-sm` *(amended 29 Sep 2026; was `--text-micro`)* | `--text-ui-sm-tracking` | `--text-mono-case` — a no-op on digits, which have no case |
| `labelInk` | `--text-body-sm` | none — this role has no tracking companion | verbatim, authored |

**One mono role and one sans role in the whole component, and the split is not a preference.** The vocabulary settles it: *"A label that must stay sentence case is not a mono label — give it a sans role."* A `navigationLabel` is authored sentence case by an editor — "Limitation of liability", "Your account" — and mono is always uppercase in this system, in presentation, with tracking cut for capitals. So the row label **cannot** be a mono role, and the brief's own worry about nineteen uppercase 40-character mono entries is not a risk to weigh, it is a rule that already decided. `--text-body-sm` at 14px is one step below body: quieter than the copy beside it, and the smallest sans role that is still comfortably a reading size at 28 characters across two lines.

**Mono earns the two parts where it is a label rather than content.** "On this page" is fixed chrome authored once, and it reads correctly shouted. The digits have no case at all, so the transform is a no-op on them and the mono role costs nothing while buying two things: the monospaced column, in which two digits are always the same width, so every label starts on a straight edge without a track token declaring it; and a **baseline** the ordinal can sit on. `ordinal` and `label` are in-flow flex items on `align-items: baseline`, so the digits sit on the label's *first* line's baseline at every row height — a one-line row and a two-line row read as the same ladder. An earlier draft positioned the ordinal absolutely, which took it out of baseline alignment and left every digit floating a few pixels above its label; that is the failure this row of the table exists to prevent.

~~The two mono parts share `--text-micro`.~~ **Amended 29 Sep 2026, tracker 2.17 —** they are two roles at the same 12px. `--text-micro` at 11px was the grey-on-grey half of the problem, so both parts step to the mono role at caption size. The **ordinal** takes `--text-ui-sm` (12px, 0.08em) because 0.08em is the correction `--text-index` borrows to keep two digits reading as one token, where eyebrow's 0.12em splits "04". The **title** takes `--text-eyebrow` (12px, 0.12em) because that is what it is — a label over a block — and it is the summary's label below 1024 too, so the phone and the rail speak in one voice. Both remain under the 14px label, so the head and the digits still read as the quieter voice. `--text-index` at 20px stays declined for the reason below; 12px is the low end of the 12–13px the ratio argument lands on.

**`--text-index` exists, and it is declined on scale rather than absent.** `primitives.css` declares it — 20px mono semibold with `--text-index-tracking` — and `ListCard` consumes it as `--lcrd-marker-text`; the designer's guidelines copy simply predated it. It is still the wrong role here, and **`ListCard`'s own comment is the argument against it.** That comment records a 40px ordinal which "made the ordinal the loudest thing in a row whose content is the title", and 20px is the fix **against a 22px `--text-h4` title** — a number slightly smaller than the thing it indexes. This component's label is `--text-body-sm`, 14px. A 20px ordinal beside it is 1.4x the label and reproduces the very failure that comment describes, in a component whose content is even more purely the titles. Holding `ListCard`'s ratio against a 14px label lands at 12-13px; `--text-micro` at 11px is the nearest role and is also the smallest label in the system, which is the second reason to take it. Owner-confirmed 26 Aug 2026 — §17 Q18. *(Amended 29 Sep 2026: 11px proved too small in practice; the ordinal is now `--text-ui-sm` at 12px, inside the 12–13 the ratio argument lands on.)*

**Measure.** No part carries running text, so no part names a measure. What caps a label's line is the rail's own inline size — `--toc-max-inline` less the inline-end padding, the ordinal column and the column seam, so 176px since 29 Sep 2026 (124 before) — plus the two-line clamp, not a `--measure-*` token. `--measure-body` 68ch is deliberately **not** applied to anything here: at `--text-body-sm` it caps around 500px, four times the label column, so it would name a constraint that never binds and imply the rail is a reading column. It is not; the body track beside it is.

**Case as a decision, with the copy in sentence case.** The title is authored `On this page` and the sheet does the shouting — never `ON THIS PAGE` in a string, a prop or an `aria-label`, because the authored capitalisation is what a screen reader announces and what an editor edits. Labels render verbatim from the content model with no transform anywhere: uppercasing them would mangle "AI product UX", cost the reader the word shapes they navigate by, and break the one typographic difference between the rail and the site chrome above it. Example copy exactly as authored: `On this page` · `01 Scope and boundaries` · `07 Client materials`.
## 9 · Responsive

**Amended 29 Sep 2026, tracker 2.17 — below 1024 the list is a closed `<details>`.** Owner-directed. The eleven-row, ~500px block the paragraph below describes pushed every phone reader past a screen and a half of outline before the first paragraph. The outline is now a native `<details>`, **closed by default**, whose `<summary>` reads "On this page" (sentence case in source, `--text-eyebrow` mono in presentation) with a chevron, between two `--toc-rule` hairlines — one 46px row (a 44px summary floor, `--toc-summary-min-block`, plus the hairlines). Tap it and the same `<ol>` opens in place. It is SiteFooter's mobile directory idiom: no script, and every link in the markup open or closed.

**The mechanism is one DOM, and CSS decides whether it discloses.** At 1024 and up, inside `@supports selector(::details-content)`, the module sets `::details-content { content-visibility: visible }` — the one override of a closed `<details>` that works; SiteFooter records that `display` on the children does not — hides the summary, shows the rail's own title, and removes the hairlines, so the rail renders exactly as before. `open` is never set or read by the component: there is no client viewport detection. One DOM was chosen over the footer's two renderings because it keeps **one landmark, one list and one set of links** for the observer to mark; the footer duplicated its directory only because, before `::details-content`, it had no choice. **The fallback is designed:** a browser without `::details-content` fails the `@supports` and keeps the working closed disclosure at every width, never a rail with hidden links. Verified in Chromium, WebKit and Firefox: forced open, laid out and keyboard-focusable at 1440; closed at 390, opening on tap; the observer marks at 1440 and marks nothing at 390, open or closed.

**Superseded paragraph, kept as the record of the 26 Aug decision — at 1023 the rail stops being a rail and becomes a list.** Owner-directed, 26 Aug 2026, overturning §17 Q3: below 1024 the outline renders as a **static, full-width, single-column block sitting immediately after the hero**, so a phone reader still gets the map of the page. It is the *same markup* — same `<nav>`, same `<ol>`, same entries, same 45.70px rows — under one media query, and **nothing moves in the DOM**: the page's shell is `Layout columns={{ base: 1, lg: [1, 4] }}` and the outline is the shell's first track, so at `base: 1` it is already the first block of the body `Section` and therefore already directly below the hero. `Layout`'s `lg` is `@media (min-width: 1024px)` — verified in the sheet — so **the two literals agree by construction**: the track and the rail appear at exactly the same width. A JS viewport test was rejected: it would need the viewport before hydration, and it would flash.

**What the media query changes, and it is five things.** Below 1024 the outline drops `position: sticky` and its inset; drops `--toc-max-block`, the internal scroll and `overscroll-behavior-block`; drops the `--sec-rail` cap and the `--toc-min-inline` floor, taking the full content column instead; and **is never marked** — the observer does not run below 1024 (§16), so no entry carries `aria-current`, every `rule` segment stays 1px, and the four `--toc-current-*` values go unused. What it does *not* change: the head, the ordinals, the interior rule, the two-line clamp, both gap roles, both type roles, and the 45.70px row.

**One column, at every width below 1024.** Owner-directed. *(The ~500px cost described here is the one the 29 Sep amendment removed: the block is now closed by default.)* Two columns on tablets would have roughly halved the block's height and was declined, so 767 changes nothing. The cost, stated plainly: at the corpus median of eleven entries the block is about 500px, so a phone reader scrolls past a screen and a half of outline before the first paragraph. That is the price of the outline existing on a phone at all, and it is paid once on arrival rather than continuously — which remains the argument against the *sticky* compact bar considered here before: that one costs 44px of a 640px viewport permanently, and it is the horizontal band being retired under another name. A bottom sheet or drawer is still forbidden outright by the constraints.

**The gap scale does not shift responsively.** `--gap-block` above the ladder and `--gap-text` inside the control box, `--gap-column` on the shell's column seam, are the distances at every width the rail exists at. No media query in this component may swap a gap step or a type role. The one media query it has changes position, the two caps and the internal scroll — never a gap step and never a type role.

**Touch targets — 44px, reached by the box itself rather than by an extension.** The entry box measures **45.70px** (a 21.7px line box plus twice `--toc-entry-padding-block`), so the pitch equals the target and consecutive rows clear each other by 1.70px. That is the first of the two legal means — stepping the box up — and the second is unavailable here for a reason worth writing down: entries are contiguous, so a hit extension past the box would overlap the entries above and below, which is precisely the defect `Breadcrumbs` measured and had to fix. There is also nothing for an extension to hold still: the box has no visible edge, so growing it moves nothing. `--toc-entry-min-block` deliberately **does not exist** — the target is produced by the padding, and a floor token alongside it could silently disagree with the padding the day the type role changes.

**1024 is a touch width.** iPad landscape is exactly 1024, which is why the 44px floor applies to a component that only appears on "desktop" and why `--toc-entry-padding-block` is sized against it rather than against a comfortable mouse row of 32.

## 10 · Composition

```jsx
// THE PAGE (or a template, once src/templates/ exists) owns the two-column shell.
// The rail is a track, not a band: it goes INSIDE the Section, unlike Breadcrumbs.
<Section surface="paper">
  <Layout columns={{ base: 1, lg: [1, 4] }}   // 235.2 / 940.8 at 1240; 179.2 / 716.8 at 1024
          colGap="column"                      // stated because columns is set: the 64 seam
          rowGap="stack"                       // the seam below lg, where the outline is a
                                               // block ABOVE the body rather than a column beside it
          align="start">                       // REQUIRED — a stretched grid item fills the row
                                               // and has nowhere to stick
    <TableOfContents items={sections
      .filter((s) => s.heading.navigationLabel)
      .map((s) => ({ label: s.heading.navigationLabel, href: `#${s.heading.anchorId}` }))} />

    <Layout rowGap="stack">                    {/* the body track: block to block inside a section */}
      {sections.map((s) => (
        {/* CORRECTED AT BUILD: `Layout`'s props type is CLOSED — as, rowGap, colGap, columns,
            minTrack, equalRows, align, justifyItems, justify, className, style, id, children —
            so `aria-labelledby` on a Layout is a compile error. The labelled region is a plain
            <section>; the Layout goes inside it. */}
        <section key={s.heading.anchorId} aria-labelledby={s.heading.anchorId}>
          <Layout rowGap="block">
            <h2 id={s.heading.anchorId}>{s.heading.text}</h2> {/* the observer's target */}
            <Prose html={s.bodyHtml} />                        {/* caps itself at 68ch */}
          </Layout>
        </section>
      ))}
    </Layout>
  </Layout>
</Section>

// INSIDE TableOfContents
<nav aria-labelledby={titleId}>                  {/* rail: sticky at --toc-sticky-inset, capped at
                                                      --sec-rail, scrolls internally */}
  <Layout rowGap="block">                        {/* the head's air, now that no rule separates it */}
    <p id={titleId}>On this page</p>             {/* title — no rule under it */}

    <Layout as="ol" rowGap="none">               {/* list: contiguous rows, stated as none */}
      <li>                                       {/* entry — gains `current` when marked */}
        <a href="#the-token-layer" aria-current="location">  {/* link: the 45.70px control box;
                                                      gap --gap-text, rule at 24 inside that gap */}
          <span aria-hidden="true">04</span>     {/* ordinal: fixed 24px basis, no shrink */}
          <span>                                 {/* label: takes the rest, holds the underline */}
            <span>The token layer</span>         {/* labelInk: the two-line clamp */}
          </span>
        </a>
      </li>
      {/* … one entry per item, contiguous */}
    </Layout>
  </Layout>
</nav>
```

**Two `Layout`s inside the component, and no bare list.** The head-to-ladder distance is a real gap now that no rule separates them, so `Layout rowGap="block"` owns it. The list is `Layout as="ol" rowGap="none"` — contiguous rows, stated rather than omitted, which is what makes the per-entry `rule` segments butt into one unbroken line. An earlier draft made it a bare `<ol>` on the grounds that the reset covers `ul` but not `ol`; **that premise is false.** `src/styles/reset.css` declares `ol, ul { padding: 0; list-style: none }` for both elements, with a comment naming `Layout as="ul"` as the reason it exists. So there is no marker to defend against, `ListCard`'s documented `<Layout as="ol" rowGap="none">` composition has no defect either, and §17 Q6 is struck.

**Restated:** no hand-rolled grid or flex for arrangement — the one vertical distance comes from `Layout`, and entry-to-entry is `none`. The one `flex` in this component is **inside `link`**, laying an ordinal and a label on one baseline in a single control box, which rule 1 permits explicitly and which is named here as that rule requires; it arranges nothing and no sibling depends on it, and its `gap` is a gap-scale role rather than a margin. No margins on any child, anywhere: the head's air is the `Layout`'s, the row's air is its own padding, and the container owns every gap between things. Nothing here sets a background, a colour, a horizontal padding or a `max-width` on or over a `Section`.
## 11 · Accessibility

**Semantics.** `<nav aria-labelledby>` → `<ol>` → `<li>` per section → `<a href="#id">`. The ordered list is the semantics of an outline: its order is its meaning, and the screen reader announces position ("4 of 11") from the list rather than from anything this component writes — which is why `ordinal` is `aria-hidden`, following `ListCard`'s rule for a number under an `<ol>`. The landmark and the list are identical in both arrangements — a phone reader gets the same `<nav>` named "On this page" and the same eleven links, in reading order, immediately after the hero (§9). The current entry carries **`aria-current="location"`**, at 1024 and up. Not `"page"`: `SiteNav` already puts `aria-current="page"` on the matching top-level item and `Breadcrumbs` puts it on the current crumb, and this marks a position *within* the current page rather than the page itself. `"location"` is the exact ARIA value for that, and it keeps three simultaneous marks distinct in the accessibility tree.

**Amended 29 Sep 2026 — the disclosure.** Below 1024 the tree is `<nav aria-labelledby>` → `<details>` (group) → `<summary>` (the disclosure button, named by its text, "On this page", with native expanded/collapsed state) → the `<ol>`. The landmark keeps its name at every width: `aria-labelledby` points at the rail's `<p>` title, which is `display: none` below 1024, and a labelledby reference resolves a hidden element's text. `Enter` or `Space` on the summary toggles it — native, no handler; `Escape` stays unbound. The summary has a 44px floor (`--toc-summary-min-block`), the same inset focus ring as the rows, and hover to `--toc-label-ink-hover`. At 1024 and up the summary is `display: none`, so no expanded state is exposed on the rail, and the forced-open content is exposed as ordinary content — verified in the Chromium and Firefox accessibility trees; **WebKit's tree could not be read headlessly** (Playwright substitutes an "is the `<details>` open" heuristic there), so a VoiceOver-on-Safari pass is owed by hand.

**Keyboard**

| Key | Behaviour |
|---|---|
| `Tab` | Move to the next `link`. DOM order is outline order |
| `Shift + Tab` | Move to the previous `link` |
| `Enter` | Follow the focused link — native anchor behaviour, no handler. The browser scrolls, `scroll-padding-block-start` lands the heading below the bar, and focus stays on the link |
| `Space` | **Deliberately unbound.** These are links, not buttons |
| `↑` `↓` `←` `→` `Home` `End` | **Deliberately unbound.** A list of links, not a composite widget. A roving `tabindex` would take up to nineteen links out of the tab order to save nineteen tab presses, which is a bad trade for the users it claims to help |
| `Escape` | **Deliberately unbound.** Nothing opens |
| `Page Up` / `Page Down` inside the rail | Native, when the rail is scrolling internally. The rail is a focusable scroll container only in the sense that a focused entry scrolls into view natively; nothing is bound |

**Focus order, and focus after every state change.** Focus order is DOM order: entry 01 to entry *n*, ahead of the body track, which is the reading order too. **No state in this component moves focus.** The current mark changes continuously as the reader scrolls and never touches focus, never re-renders a link's identity, and never removes an element — which is the accessibility argument for making currency a class on an existing `<li>` rather than a re-render. Following a link leaves focus on the link and moves only the viewport. When a focused entry is outside the rail's internal scroll, the browser scrolls the rail to it natively.

**ARIA per state**

| Attribute | Value | When |
|---|---|---|
| `aria-labelledby` on `rail` | the `title`'s minted id | always |
| `aria-current` on `link` | `"location"` | on exactly one entry, whenever an entry is current. **Absent entirely** when no entry is current — the reader is above the first heading — rather than present with a falsy value. Absent from every entry **below 1024**, where the observer does not run (§9, §16), so nothing there is ever announced as current |
| `aria-hidden` on `ordinal` | `"true"` | always. The `<ol>` announces position; announcing "zero four" before every label is noise |

**Where ids come from.** One id is minted, by `useId`, for `title`, and `rail`'s `aria-labelledby` points at it. The title is not optional, so **that idref always resolves** — which is the reason the title is not a prop and cannot be switched off: a boolean that hid it would leave the landmark either unnamed or named by a string nobody can see. This component holds **no `aria-controls`**, because nothing here controls anything that might not be rendered.

**The *n* idrefs it does not own, and what happens when one is absent.** Every `href` fragment names an id the page owns — the audit route writes `<h2 id={anchorId}>` inside `<section aria-labelledby={anchorId}>`, and the ids are derived and de-duplicated at the seam (`anchorSlug` / `uniqueAnchor` in `sources/strapi.ts`), so no page in the corpus has a collision. When a fragment matches nothing: the entry still renders and still links, the browser's jump does nothing visible, the entry can **never** become current, and a development-mode warning names the unresolved hrefs. The rail does not hide the entry — hiding it would make a content bug invisible, and the outline would then disagree with the page for a reader who can see both.

**Focus ring.** `:focus-visible` only, never `:focus`. `--toc-ring-width` over `--toc-ring-offset` of `--toc-ring-gap-color`, cornered at `--toc-entry-radius-focus`, drawn **inward** for the reason in section 7. Focus also shows what hover shows: the hover label ink and the hover rule.

**Contrast floors, restated.** Labels, digits and the title are text at 4.5:1 minimum, and the tightest cell in the table is 4.91:1. Nothing here is 24px or larger, so the 3:1 large-text allowance never applies. The current rule is a meaningful graphical object at 3:1 and measures 6.23:1 at worst. The focus ring is 3:1 against its own gap and measures 5.51:1 at worst. The 1px rule between the columns and the underline are decoration and exempt. **No state is carried by colour alone:** hover and focus move the label ink *and* wipe in an underline, pressed doubles that underline's height, and the current mark is a 3px blue rule and an `aria-current` as well as two inks.

**Reduced motion.** Under `prefers-reduced-motion: reduce` the underline's wipe becomes an instant appearance and the three colour transitions drop to `--duration-instant`. The underline still appears, because it is the affordance. Nothing else moves: no fade, no height animation, no smooth scrolling (section 13). The observer is unaffected — observing scroll position is not motion.

**What a screen reader says** — the eleven-section audit route, with the reader inside section 4:

> "On this page, navigation. List, 11 items. Scope and boundaries, link, 1 of 11. What we review, link, 2 of 11. Component inventory, link, 3 of 11. The token layer, current location, link, 4 of 11. Accessibility findings, link, 5 of 11. … End of list, end of On this page navigation."

Exact phrasing varies by screen reader. What this component controls is the landmark's name (from the visible title, in the case an editor authored), the labels, the list order, the absence of the digits, and `aria-current`.

## 12 · Content edge cases

| Case | Required handling |
|---|---|
| **Longest realistic string** | The 87-character fallback heading. The label wraps and is **clamped to two lines** with an ellipsis, and the clamp is visual only: the full string stays in the DOM, so the accessible name and the accessible label are complete and a screen reader reads the whole heading. Two lines rather than free wrapping because at 28 characters a line, free wrapping lets one row be three rows tall and the ladder loses its pitch; and rather than one line, because a single line cuts most real fallback headings mid-word. The cost, stated: a sighted reader loses the tail of a label over ~28 characters and cannot recover it from the rail — which is exactly what `navigationLabel` exists to prevent, so a development-mode warning names any label over 40 characters. The clamp is `-webkit-line-clamp` with `display: -webkit-box` and `-webkit-box-orient: vertical`, plus the unprefixed `line-clamp` declared alongside it: the standard form is **not Baseline in 2026** — Firefox still needs the prefix — so both are written and §14 item 10 permits the one `-webkit-box` (§17 Q15) |
| **One long unbroken token (a URL)** | Breaks inside the word rather than pushing the rail past `--sec-rail`. No horizontal scrollbar, no overflow out of the track, and the two-line clamp still applies, so a pasted URL renders as two broken lines and an ellipsis. The warning above catches it |
| **Zero items** | Render nothing — no `<nav>`, so no empty landmark, and no track content. Development-mode warning naming the page's item count |
| **One item** | Render nothing, same as zero, same warning. This is the component's own **floor of two**: a `<nav>` landmark holding one link is worse than no landmark, because a screen reader user must enter it to discover that. Distinct from the editorial threshold of six, which the page applies and the component does not know about |
| **Many items (2× expected: 16, and the real worst is 19)** | Renders every one. Nineteen 45.70px rows plus the head and its air measure about 870px, so the rail **scrolls inside its own sticky box** at `--toc-max-block` on any viewport under roughly 1000px tall — which is most of them. It does not stop being sticky (the outline would vanish on the one page that needs it most) and it does not cap the count (an outline that silently omits sections is a lie). `overscroll-behavior-block: contain` so scrolling out of the rail does not chain into the page, and the rail's `--gap-text` of inline-end padding — which lives inside the media query, because its whole reason is this scrollbar — is what keeps a classic scrollbar off the last characters of every label — measured, and the reason that padding appears in section 7(a) as a distance rather than being left out as trim. Cost: the head scrolls with the entries; section 17 Q4 |
| **Missing image or missing optional slot** | **None, and why:** there is no image and no optional slot. Every part is derived from `items` and every one is required. No `Icon` appears anywhere in this component, which is why section 16 raises no glyph request |
| **Empty required-ish text** | An item whose `label` is empty or whitespace is dropped **before** numbering, so the ordinals stay contiguous — 01, 02, 03 with no gap where the dropped one was. If fewer than two survive, the component renders nothing, as above |
| **The narrow track at 767** | Not a track: below 1024 the outline is a full-width single-column block (§9), so the label column is the content column less the 24px ordinal column and the 16px seam — about 296px at a 360 viewport and 656px at 720. Two-line labels become one-line labels, the clamp still applies and nothing new breaks. 767 itself changes nothing, because the arrangement already changed at 1023 |
| **A parent that does not size it** | It must be placed in a `Layout` **ratio** track and nowhere else. `--toc-min-inline: 160px` is what stops it collapsing, and it is a real floor rather than a formality: in a `Cluster` (a wrapping row) or a `columns="fit"` track the rail's intrinsic minimum would be its widest unbreakable word, about 60px, which is not a narrow rail but a broken one. `columns="tile"` with `minTrack="xs"` (192) would work arithmetically and is still forbidden, because a tile track is a repeating unit and the rail is not one of a set. At the floor the label column is 104px, holds 14 characters a line and 28 across the clamp, and the specimen has a `[1, 6]` band — 160.6px — rendering exactly there so the degradation can be looked at |
| **Logical properties rather than left/right** | `inset-inline-start` for the `rule`, `inset-block-end` and `inset-inline` for the `underline`, `padding-block` and `padding-inline-end` for the row and the rail, `inset-block-start` for the sticky inset, `max-inline-size` / `min-inline-size` / `max-block-size` for the caps, `overflow-block` for the internal scroll — **but see the amendment below**. No `left`, `right`, `top`, `bottom`, `margin-left` or `padding-right` anywhere. **One physical value survives, because the API has no logical spelling:** `IntersectionObserver`'s `rootMargin` is written `"-104px 0px 0px 0px"` — top, right, bottom, left, in that order, always — and in a right-to-left document the block-start margin is still the first value, so the mechanism is unaffected by direction and only the string looks physical. **AMENDED AT BUILD, three more:** `overflow-y: auto` is the load-bearing declaration and `overflow-block: auto` sits beside it as the enhancement — `overflow-block`'s support could not be confirmed and its failure mode is a CLIPPED nineteen-entry outline on the one page that most needs one; this site is horizontal-tb throughout, so `overflow-y` IS the block axis and only the spelling is lost. `overscroll-behavior: contain` is the shorthand rather than the `-block` longhand, for the same reason and at no cost, the rail never scrolling on the inline axis. And the clamp needs `display: -webkit-box` with `-webkit-box-orient: vertical`, because unprefixed `line-clamp` is not Baseline in 2026 |
| **This component's surface nested inside a different one** | Correct by construction: all eleven tokens declared in all four blocks, so a rail in a `tint` panel inside an `ink` `Section` renders the tint column at 7.27:1 rather than `--color-neutral-500` stranded on `--color-paper-deep` at 2.82:1. Section 6's last paragraph, and a specimen band |
| **Two of this component adjacent** | Not valid on a route — one per page. The component does not defend against it and would produce two `navigation` landmarks with the identical accessible name "On this page"; because the name comes from the title and the title is not a prop, **there is nothing to tell them apart with**, and a screen reader lists both. Two observers would also both be live, marking two entries at once. The specimen band that shows two adjacent is labelled specimen-only with that consequence noted |
| **Interactive content inside a slot** | Impossible by design: there are no slots and `children` is not in the props type. `items` carries strings and fragments only. A control inside an outline would make a map of the page into a toolbar, and the one link per entry is the whole contract — one entry, one destination |

## 13 · Motion

| Property | Part | Duration | Easing |
|---|---|---|---|
| `color` | `label` (rest → hover → pressed, and → current) | `--duration-fast` | `--easing-standard` |
| `color` | `ordinal` (rest → current) | `--duration-fast` | `--easing-standard` |
| `background-color` | `rule` (rest → current) | `--duration-fast` | `--easing-standard` |
| `transform: scaleX` | `underline`, 0 → 1, origin at the inline start | `--duration-fast` | `--easing-standard` |

**The underline's wipe is the existing precedent, not a second one.** It is the same part in the same system as `Button emphasis="link"` and `Breadcrumbs`' `rule`: a drawn underline on a text link, wiping along its own axis, on the same duration as the colour, because a drawn underline can otherwise only appear all at once. Nothing about it is new except the component it appears in. `transform-origin` is written `0 50%` rather than `left center`, exactly as `Breadcrumbs` writes it, because CSS has no logical spelling for the keyword.

**What does not move, and one thing that deliberately does not wipe.** The `rule`'s width step from `--toc-rule-width` to `--toc-current-rule-width` happens at **`--duration-instant`** — it is a change, not a growth, following `Breadcrumbs`' `--crumb-link-rule-width-pressed`. **The current mark does not use the wipe even though the component now contains one**, and the distinction is the whole point: a wipe is right for a rule the *reader* summoned by pointing at something, and wrong for a rule the *document* moved by being scrolled. Animating the mark would be the current section chasing the scroll, which is the exact motion the constraint forbids. The underline's pressed step to `--toc-underline-width-pressed` is instant for the same reason. No fade — `opacity` appears nowhere in this component, including for disabled, which does not exist. No height animation: the rail's block size changes only when the viewport does. Nothing rotates or scales except that one `scaleX`. **No `scroll-behavior: smooth`**: nothing in this codebase sets it, an anchor jump already lands correctly because the reset supplies `scroll-padding-block-start`, and smooth scrolling would be a second new mechanism needing its own argument — section 17 Q5 records the option and declines it.

**Reduced motion.** Under `prefers-reduced-motion: reduce` the underline's wipe becomes an instant appearance at `--duration-instant`, matching `Button`'s own reduce block — the underline still **appears**, because it is the affordance; it simply stops travelling. The three colour transitions also drop to `--duration-instant`. Strictly a colour change is not motion and the global reset already covers the transform, so half of that block is belt-and-braces; it is specified because a nineteen-row rail re-colouring on every scroll is the one place in this system where a 140ms colour tween could read as movement to a motion-sensitive reader.
## 14 · Do's and Don'ts

**Do**

1. Exactly one `<nav>` whose accessible name is "On this page" per route that renders the component, and none on any route with fewer than six labelled sections. *Decided by:* a route-level test counting the landmark against the labelled-section count per route.
2. Every `TableOfContents` call site is inside a `Section`, in the first track of a `Layout columns={{ base: 1, lg: [1, 4] }} colGap="column" rowGap="stack" align="start"`. **Corrected at build: this line said `rowGap="none"`, which §10 and the specimen both contradict** — below 1024 that gap is the seam between the outline block and the body, and `none` would butt them together. *Decided by:* a rendered-DOM assertion — the rail's parent has a computed `grid-template-columns` of two tracks whose ratio is 1:4, its `align-items` is `start`, and its `column-gap` is `64px`.
3. The rail's computed `inset-block-start` is `104px` and its computed `max-inline-size` is `232px` *(amended 29 Sep 2026; was 180px)*, on every route. *Decided by:* the same assertion. A route that has overridden either has overridden the component.
4. Every `href` in `items` is a fragment. *Decided by:* the type check, plus `grep -rn "href: '/" src/app` returning no `TableOfContents` call site.
5. Every `href` fragment resolves to an element in the rendered page. *Decided by:* a per-route test resolving each fragment; the dev warning is the runtime half of the same check.
6. All **eleven** `--toc-*` colour tokens appear in all four surface blocks — **44** declarations. (An earlier draft said twelve and 48; the twelfth was `--toc-rule-hover`, deleted in review, and this line was not updated.) *Decided by:* the existing build check, or `grep -c "\-\-toc-" src/styles/tokens/components/table-of-contents.css` per block.
7. Every entry box is at least 44px tall at every width the rail renders at. *Decided by:* a rendered-DOM measurement of the first and last `link`; the expected value is 45.70.

**Three of these seven are measured by hand, and saying so is part of the check.** Items 3 and 7 name computed geometry and item 2 names a computed grid; this repo has **no browser test runner** — `verify` is six node scripts, and the dev dependencies are eslint, prettier and typescript — so there is nothing to assert them in, and one is not being added for three numbers (§17 Q16). They are verified **once, in the specimen, with devtools**. Item 2's call-site half is a real grep: `grep -rn 'lg: \[1, 4\]' src/app` must return one hit per route module that renders the component and nothing else. Item 5's per-route half is the dev-mode warning in §11 doing the same job at runtime.

**Every grep below means "in a declaration"** — strip comments first, because this repo's module comments name what is deliberately absent and a bare grep hits the prose asserting the absence:

```bash
perl -0pe 's{/\*.*?\*/}{}gs' src/patterns/TableOfContents/TableOfContents.module.css | grep -c '<pattern>'
```

**Don't**

8. No hex, no `rgb(`, no `hsl(` in the module, and no `px` **in a declaration**. *Decided by:* grep → zero for the three colour forms; for `px`, exactly one hit and it is the `@media (min-width: 1024px)` prelude §9 mandates, which `tokens:check` exempts for the same reason. **Corrected at build: this line said zero `px` and forgot the media query it also requires.** Every other literal lives in the token file.
9. No `margin` anywhere in the module. *Decided by:* `grep -n "margin" TableOfContents.module.css` → zero. Unlike `Breadcrumbs` there is not even a clip-box exception: this component has no visually hidden text.
10. No `display: grid`; exactly one `display: flex`, inside `link`; and exactly one `display: -webkit-box`, on `labelInk`, which is what `-webkit-line-clamp` requires. *Decided by:* grep → `grid` zero, `flex` one hit in the `.link` block, `-webkit-box` one hit in the `.labelInk` block.
11. No `:has(`, no `@container`, no selector that walks upward. *Decided by:* grep → zero. The `current` part is a class the component emits on the `<li>`; nothing detects anything.
12. No `text-transform` written as a keyword — only `var(--text-mono-case)`. *Decided by:* `grep -n "text-transform" | grep -v "text-mono-case"` → zero.
13. No `left`, `right`, `top` or `bottom` in the module. *Decided by:* grep → zero. `rootMargin` is in the `.tsx`, not the sheet, and is the single documented physical value.
14. Exactly **two** `@media` blocks in the module, and no more: `min-width: 1024px`, changing only `position`, the two inline caps, the block cap, the internal scroll and the scrollbar's clearance; and `prefers-reduced-motion: reduce`, which §13 has required all along. **Corrected at build — this line said "exactly one" and forgot the reduced-motion block it also specifies.** *Decided by:* grep for `@media` → two hits; read both. A gap step or a type role inside either is the defect this catches, and a THIRD block is the defect the count catches.
15. No `surface`, `className`, `style`, `activeId` or `children` on any call site. *Decided by:* the type check failing the diff.
16. No `TableOfContents` inside `SiteNav`, `SiteFooter`, `PageHero`, `CtaSection` or any other pattern. *Decided by:* `grep -rn "TableOfContents" src/patterns` → zero, plus the pattern-import lint rule.
17. `z-index` is `--z-base` or absent, never `--z-sticky`. *Decided by:* grep → zero hits for `--z-sticky`. A rail over the site's own nav bar is the failure this prevents.
18. **NOT YET DISCHARGED, and deliberately: this is route work, and no route consumes the component yet.** CLAUDE.md gives the order — nothing gets a page route before it has a `design/` route, and that route now exists, which is what unblocks this. Items 1-5 above are route-level and are outstanding with it. When it happens: the retired band goes from **all six** route modules that carried it — `tools/[slug]`, `services/[...slug]`, `how-we-work`, `audits/[slug]`, `expertise/[slug]`, `glossary/[slug]` — and is replaced on `audits` only; the other five are standard pages and get no outline. *Decided by:* `grep -rn "On this page" src/app` returning only this component's consumers.

## 15 · Specimen plan — `/design/table-of-contents`

The designer's hand-off mockup was built from the real library and is now deleted; what follows is the plan the live route at `/design/table-of-contents` implements, in nine bands. The route reads as five shapes: a scrolling in-situ page, a four-band surface ladder, a tall-rail study, a state grid and a stress list — not one rectangle repeated.

1. **In situ, scrolling, paper.** The real composition from section 10 under a `SiteNav` stand-in at `--nav-bar-height`: eleven sections, the audit-family median, each with a real `h2 id`, and a body that alternates `Prose`, a `ListCard` ladder, an `Accordion` and a three-up tile grid — so the capped-text-beside-full-width-block composition can be squinted at rather than described. **This is the band where the mechanism is proved:** scroll it and the mark tracks; land above the first heading and nothing is marked; use the two `Button` jump links at the top and watch where `scroll-padding-block-start` puts the heading relative to the rail's head.
2. **Four surfaces as sibling bands, identical markup.** `paper`, `tint`, `ink`, `blue`, in that order, each with the same eight-section rail and its own section 6 paragraph printed beside it — and the `blue` band is the one to read, because it is the surface where "blue means you are here" cannot be taken literally. Each band's rail observes its own band's headings, so all four are live at once and the four colour columns can be compared while marked.
3. **Nineteen entries — terms-of-use.** The longest outline in the corpus, with the sticky box forced to 520px so the internal scroll is visible on a tall display, entry 07 marked, and a note carrying the ~870px measurement and the scrolling-head cost.
4. **Nested surface.** An `ink` band holding a `tint` panel holding the rail, with the 2.82:1 failure named and the rendered 7.27:1 stated beside it.
5. **States. CORRECTED AT BUILD: `current` is NOT forcible from outside, and cannot be** — §3 rules out `activeId` on purpose, so the mark comes only from the observer and no prop can set it. What the specimen does instead is better than four posed rails: every rail on the page is LIVE and derives its own mark from where its own headings sit relative to the reading line, so scrolling the page moves all nine at once. The above-the-first-heading case (nothing marked) is free at the top of the page and the below-the-last case (the last entry held) is free once you have scrolled past a band. It is also the band that proves the ordinals sit on their labels' first baseline, in one-line and two-line rows alike, and that hover in dark neutral cannot be mistaken for the blue mark. **Hover, pressed and keyboard focus have no props and must be pointed at, held and tabbed to**; the band carries that note in place of columns it cannot render, and the inward focus ring and the underline's wipe in particular have to be tabbed into to be believed.
6. **Edge cases**, one labelled column each: the three real 71–77-character fallback headings clamped to two lines; a pasted URL breaking inside the word; two items, the component's own floor; one item, rendering nothing, outlined so the absence is visible.
7. **Two adjacent**, labelled "specimen only — invalid on a route", with the duplicate-landmark and double-observer consequences noted.
8. **The floor.** The rail in a `[1, 6]` track — 160.6px — rendering at `--toc-min-inline`, with the note stating what starts to fail below it.

9. **Below 1024 — the other arrangement.** The same eleven-section outline as a static full-width single-column block under a hero, at a 390 and a 768 viewport, with a note carrying the ~500px measurement, the absence of any mark at any scroll position, and the instruction to widen past 1024 and watch identical markup become a rail.

**The 1 × 1 matrix** is stated in band 1's note rather than drawn: one variant, one size, and the dimension that actually varies is entry count, which bands 1, 3, 6 and 8 ladder from two to nineteen.

**Two things the specimen cannot prove, and says so.** The `{ base: 1, lg: [1, 4] }` switch needs a viewport either side of 1024 — narrow the window, and the note says what to expect at each side. And the `display: none` below 1024 is proved by the rail being *absent*, which is only convincing if the note tells you it should be.

## 16 · New token requests

**One request, and it is a mechanism rather than a value.** Every colour, distance, type role and border width in this document is an existing token; the `--toc-*` names in sections 6, 7 and 8 are this component's own component-layer declarations, each resolving to one: `--color-*` for all eleven colour tokens, `--border-width-hairline`, `--border-width-2` and `--border-width-3`, `--radius-4`, `--focus-ring-width`, `--focus-ring-offset`, `--text-micro` and `--text-micro-tracking`, `--text-body-sm`, `--text-mono-case`, `--duration-fast`, `--duration-instant`, `--easing-standard`, `--shadow-none`, `--z-base`, and — read as primitives rather than as another component's tokens — `--space-72`, `--space-24`, `--space-12`, `--space-2`, plus the gap roles `--gap-text`, `--gap-block`, `--gap-gutter`, `--gap-column`. **Two** literal pixel values at build — **three since 29 Sep 2026**, `--toc-summary-min-block` 44 being a floor like `--crumb-hit-min` — both of them caps, which is the one place this repo writes a number (`--btn-height-md` 40, `--nav-bar-height` 72, `--crumb-hit-min` 44): `--toc-max-inline` 180 (232 since 29 Sep 2026) and `--toc-min-inline` 160. The three the spec listed as literals — the ordinal column, the row's padding and the sticky inset — each read the ramp step they would otherwise have restated.

**No new gap step** — the four distances are existing roles and the one zero distance is `none`. **No new colour** — every cell is an existing ramp step, including the blue the owner chose for the mark. **No new glyph** — this component renders no `Icon` at all; the mark is a rule, a digit and an underline, so the 17-glyph set is untouched. **No new motion precedent** — the underline's wipe is the one that already exists, and the current mark deliberately does not use it (section 13).

```
NEW MECHANISM REQUEST
Name:         scroll-position observation (current-section marking)
Layer:        3 component — one 'use client' pattern, one IntersectionObserver, no new token
Value:        A single IntersectionObserver, created on mount over the elements resolved from
              items' href fragments, with rootMargin block-start set to the negative of the
              reading line and threshold [0, 1]. The reading line IS --toc-sticky-inset, read
              off the rail's own computed style rather than restated as 104, so the literal
              exists in exactly one place and cannot drift from the nav bar. On every callback,
              and once directly on mount, the current row is recomputed as THE LAST TARGET
              WHOSE START EDGE IS AT OR ABOVE THE READING LINE. Recomputed on resize.
              Above the first heading: NO row is current, aria-current is absent from all of
              them, and every rule is 1px — the reader is in the hero, which is not in the
              outline, and marking row 01 there would be a claim about where they are that
              is false. Below the last heading: the LAST row stays current, through the CTA
              and the footer, because it is the last thing the outline knows about and dropping
              the mark would make it blink off at the bottom of all 82 pages.
Why nothing existing works:  There is no scroll-observation precedent in this codebase at all.
              The closest existing thing is a client boundary — SiteNav, EnquiryForm and
              SiteFooter are 'use client' — so the boundary is not new; reading scroll position
              is. Nothing else can supply the mark: the constraint forbids a registration API,
              a context, a ref handshake and any prop the sections pass upward, and it is right
              to, because every href is already an id on a rendered heading. The alternative to
              observing is not marking, and the mark is the hard constraint.
              An IntersectionObserver rather than a scroll listener because it does no
              per-frame work and fires exactly when the answer changes: a heading crossing the
              reading line IS the event, so there is nothing to throttle and no layout thrash.
              The recompute is O(n) with n at most 19, on a crossing.
Blast radius: Everything a scroll observer usually breaks is already handled or absent here.
              It adds no motion — section 13 states that the mark deliberately does NOT use the
              underline wipe the component now contains — so prefers-reduced-motion has nothing
              new to suppress.
              It adds no ARIA that can dangle: aria-current sits on an element that is always
              rendered, and the observer touches nothing else. It never moves focus, never
              re-renders a link's identity and never removes a node, so an assistive technology
              user scrolling past a heading gets a changed attribute and nothing more. It does
              NOT read the DOM to discover headings — only to resolve targets it was handed —
              so the seam stays the source of truth and this cannot become a crawler later.
              What it does introduce, and what the owner is being asked to accept: the first
              dependency in this system on where the page is scrolled to, and therefore the
              first component whose rendered output is not a function of its props alone. If a
              second component ever wants it, this should become a shared hook rather than a
              second observer. It also creates one silent failure mode — a page whose ids do
              not match its hrefs marks nothing and looks merely quiet — which is why the
              dev-mode warning in section 11 is part of the request and not a nicety.
```

**Approved 26 Aug 2026, with one addition** (§17 Q10). The owner accepted the mechanism as specified. The addition: the observer is **gated to ≥ 1024** — created only while `matchMedia('(min-width: 1024px)')` matches, torn down when it stops — because below 1024 the outline is a static block that marks nothing (§9; a closed `<details>` since 29 Sep 2026, which still marks nothing). Without the gate it would mount, resolve up to nineteen ids and stay live on every phone visit to five page types, to produce a mark that is never rendered.

**Two names the brief supplied, recorded so nobody builds them.** Neither is used in this document. **Both turn out to exist** — the designer's guidelines copy predated both, which is the stale-vocabulary failure CLAUDE.md warns about rather than two invented names.

- **`--text-index`** — named in the brief as the voice for an ordinal. **It exists** — 20px mono semibold in `primitives.css`, consumed by `ListCard` as `--lcrd-marker-text` — and the designer's guidelines copy predated it. It is **declined on scale, not on absence**: §8 carries the arithmetic and §17 Q18 records the owner's confirmation. No new token is requested either way.
- **`--lcrd-number-baseline-offset`** — named in the brief as `ListCard`'s prior art for a numbered arrangement. **This one exists** — `list-card.css` declares it (4px as of 26 Aug 2026, moved from 6px), and the designer's guidelines copy simply predated it, which is the stale-vocabulary failure CLAUDE.md warns about rather than an invented name. It is still **not needed here**, for the reason below. `list-card.css` also ships `--lcrd-marker-tracking`, `--lcrd-title-tracking`, `--lcrd-content-min-xs`, `--lcrd-thumbnail-inline-md`, `--lcrd-rule-width`, `--lcrd-radius`, `--lcrd-ring-width`, `--lcrd-ring-offset`. The prior art for a numbered arrangement is real — `ListCard`'s `marker={{ kind: 'number' }}` and its `aria-hidden` rule under an `<ol>`, both of which this spec follows — but there is no baseline-offset token behind it, and **this component needs none**: `ordinal` and `label` are in-flow flex items on `align-items: baseline`, so the digit sits on the label's first baseline with nothing declared. That is exactly what such a token would have been correcting for, and the correction becomes unnecessary once the ordinal is in flow rather than absolutely positioned — which is the bug an earlier draft of this spec shipped into the specimen and had to fix.

## 17 · Open questions

**Answered by the owner, 26 Aug 2026. `Status` is `accepted` on the strength of this block; where an answer contradicts the question's own recommendation, the answer wins and the body of this document has been edited to match.**

| # | Answer |
|---|---|
| 1 | **Not a heading count at all.** Page type decides: `insights`, `case-studies`, `audits`, `terms-of-use`, `privacy-policy` render an outline; every standard page does not, including the five carrying the band today. No editorial threshold, no minimum beyond the component's floor of two. §1 |
| 2 | `[1, 4]`, as recommended |
| 3 | **Overturned.** Below 1024 the outline renders as a static full-width block immediately after the hero — same markup, one media query, **one column** at every width below 1024. Not nothing, and not a second component. §9 |
| 4 | (a) accept the head scrolling away, as recommended |
| 5 | (a) native jump, as recommended |
| 6 | **Struck — the premise is false.** §10 |
| 7 | `"location"`, as recommended |
| 8 | (b) a bare anchor, as recommended |
| 9 | (a) the page owns the shell — and the repetition is **five route modules**, not 82, which argues for (a) harder than the question does |
| 10 | **YES**, with the observer gated to ≥ 1024. §16 |
| 11 | Confirmed as chosen: blue marks currency, the pointer runs to dark neutral plus an underline |
| 12 | Confirmed as chosen: one hairline between the two columns |
| 13 | Confirmed: the head sits at `--color-neutral-600`, the floor |

**Four more, raised on the implementation read of this spec and answered in the same pass.**

| # | Question, and the answer |
|---|---|
| 14 | **Two cross-component token reads** — `--nav-bar-height` and `--sec-rail`. **REVERSED AT BUILD, and the repo decided it rather than taste.** `breadcrumbs.css` records the doctrine explicitly: it quotes Section's value BY VALUE with a re-check comment rather than reading `--sec-*`, "because a component token that reads `--sec-*` silently follows it the day the surface layer is re-tuned". So neither read ships: `--toc-sticky-inset` is `calc(72px + var(--gap-gutter))` and `--toc-max-inline` is `180px`, each with a comment naming the token whose value it quotes and stating that a change there must be re-checked here. The module reads no other component's prefix at all — grep returns zero. §7 |
| 15 | **The two-line clamp needs `display: -webkit-box`,** which §14 item 10 forbade. **Permitted** — unprefixed `line-clamp` is not Baseline in 2026. Both forms are declared; item 10 amended |
| 16 | **Five "Do" items claimed automated checks this repo cannot run.** Two are real greps; the three computed-geometry ones are **verified by hand in the specimen** and no test runner is added. §14 |
| 17 | **The seam around the interior rule is asymmetric** — about 9px of air on the ordinal side, 16 on the label side. **Accepted as drawn** |
| 19 | **The geometry token count is 20, not 13.** §7 enumerated thirteen; §8's type composites and §13's transition pair were implied rather than listed, and `--toc-max-inline` and `--toc-label-lines` are new. 31 distinct names, 64 declarations. §7 |
| 18 | **`--text-index` exists (20px) and §8 claimed it did not.** The ordinal **stays `--text-micro`, 11px** *(amended 29 Sep 2026: now `--text-ui-sm`, 12px — still not `--text-index`)*: 20px is the right index size against `ListCard`'s 22px title and the wrong one against this component's 14px label, where it would make the number louder than the title it indexes. §8 |

**1 · The editorial threshold: how many labelled sections earn a rail. Non-blocking.**
Options: (a) four — 100 of 129 pages; (b) **six** — 82 pages; (c) eight — 53 pages. **Recommendation: (b), six.** The corpus distribution is the argument, not instinct: at four, the two families that would gain rails are case studies (median 5) and the shorter insights, which are narrative pages a reader is meant to read through rather than jump around — and four entries is a rail whose whole content fits in one screen of the page it is describing, so it restates what is already visible. At six the rail lands on every audit (median 11), service (8), expertise (8), tool (8) and the how-we-work and home pages (11, 12), which are the reference pages readers arrive at with a specific question, and it correctly excludes the glossary (median 0) and most case studies. Eight was rejected because it drops insights (median 6) entirely, and a 6-section insight is exactly the length where an outline starts saving scrolling. Non-blocking: the threshold lives in the page, the component's own floor is two, and changing it later changes no code in this component.

**2 · The `Layout` ratio, and therefore the rail's width. Non-blocking — decided, with the arithmetic.**
Options: `[1, 3]` (294/882), **`[1, 4]` (235.2/940.8)**, `[1, 5]` (196/980). **Recommendation: `[1, 4]`,** and section 7 carries the reason: at a 1024 viewport `[1, 4]` computes to 179.2px, which is `--sec-rail` less 0.8px, so the ratio and the cap agree at the one width where the rail is tightest, while `[1, 5]` collapses to 149.3px there — below the 160 floor — and `[1, 3]` spends 59 more pixels of body track at 1240 than a 180px rail can use. Non-blocking because it is a call-site prop: if the owner prefers a wider rail, `[1, 3]` renders this component unchanged, and only `--sec-rail` would want revisiting.

**3 · Below 1024: nothing, or a compact substitute. Non-blocking — OVERTURNED 26 Aug 2026: neither. The outline renders below 1024 as a static full-width single-column block immediately after the hero, same markup, one media query, and §9 is written to that. What follows is the question as asked.**
Options: (a) **nothing at all**; (b) a sticky compact bar; (c) a bottom sheet or drawer. **Recommendation: (a),** argued in section 9 — the substitute is the band being retired, it costs a permanent 44px of a 640px viewport, and every problem in this document that comes from the rail being a column disappears with it. (c) is forbidden outright by the constraints. Non-blocking, and this is why: (a) is what the component built from this document does, and (b) would be a second component with its own spec and its own four-column table rather than a prop added to this one. If the owner wants (b), nothing here has to be rebuilt.

**4 · Whether the head pins inside the scrolling rail. Non-blocking.**
At nineteen entries the rail scrolls internally and "On this page" scrolls away with the first few entries. Options: (a) **accept it** — the head goes out of view only while the reader is actively scrolling inside the rail, at which point they know what it is; (b) a wrapper element around `list` with the overflow on it and a `1fr` row on the rail, so the head stays; (c) `position: sticky` on the head inside the scroll box — **not an option**, because the head would need a ground to stop entries passing under it, and the rail may not own its ground. **Recommendation: (a).** (b) needs a grid row relationship the primitives do not express, which means either a hand-rolled grid in this component or a new prop on `Layout` — and a prop on the most load-bearing primitive in the system earns its place at the second caller, not the first. Non-blocking: (b) is one wrapper and one declaration if the owner disagrees after looking at specimen band 3.

**5 · Smooth scrolling on click. Non-blocking — declined.**
Options: (a) **native jump**, which is what happens today; (b) `scroll-behavior: smooth` on the scroll container, guarded by the reduced-motion block already in the reset. **Recommendation: (a), and it is declined rather than deferred.** Nothing in this codebase sets `scroll-behavior`, the reset's `scroll-padding-block-start` already lands the heading below the bar, and a smooth scroll over a 19-section legal page is a long animation the reader cannot interrupt without fighting it. It is also a **second new mechanism** and section 16 has one; asking for both in one spec makes the argument for the one that matters harder to read. Non-blocking, and cheap to add later: one declaration, no change to this component.

**6 · `Layout as="ol"` renders UA list markers. STRUCK 26 Aug 2026 — the premise is false.** `src/styles/reset.css` declares `ol, ul { padding: 0; list-style: none }` for **both** elements, with a comment naming `Layout as="ul"` as the reason. There is no reset change to make, `ListCard` has no defect, and §10's list is a `Layout as="ol"`. What follows is the question as asked.
**Struck: every clause below is false.** The file is `src/styles/reset.css`, not `styles.css`, and it resets **both** elements. The build's `list` is a `Layout as="ol" rowGap="none"` that resets nothing. Kept as the record of what was asked. As asked: `styles.css` resets `padding: 0; list-style: none` on `ul` but not on `ol`, so a `Layout as="ol"` outside `Prose` gets decimal markers and a 40px inset. This component is unaffected — `list` is a bare `<ol>` it resets itself, for the reason in section 10 — but **`ListCard`'s documented composition, `<Layout as="ol" rowGap="none">`, has the defect today**, on every numbered ladder in the system. Options: (a) extend the reset to `ol`; (b) reset it inside `Layout`; (c) leave it and document it. **Recommendation: (a)**, in the reset, as a separate change: it is one selector, it matches what the reset already asserts for `ul`, and `Prose` re-establishes its own markers explicitly so nothing there regresses. Non-blocking for this build; raised because an implementer working from this document will hit it within an hour.

**7 · `aria-current="location"` versus `"true"`. Non-blocking.**
Options: (a) **`"location"`**; (b) `"true"`. **Recommendation: (a).** `SiteNav` and `Breadcrumbs` both use `"page"`, and a reader can meet all three at once; `"location"` is the ARIA value defined for a position within an environment, which is exactly a section within the current page, and it keeps the three announcements distinct. (b) announces as "current" with no qualifier, which is not wrong, only vaguer. Non-blocking: a one-word change with no visual consequence.

**8 · The entry: a `Button emphasis="link"` or a bare anchor. Non-blocking — decided, three reasons.**
Options: (a) `Button emphasis="link" tone="neutral" size="sm" as="a" href extendHitArea active` — what ships in the retired band, and it brings a focus ring, a 44px hit area and an underline wipe with it; (b) **a bare anchor with its own `--toc-` treatment**. **Recommendation: (b),** and the sheet decides it rather than taste. `Button`'s label is `font: var(--btn-text-md)` — `--text-ui`, **mono** — with `letter-spacing: var(--btn-text-tracking)`, `text-transform: var(--text-mono-case)` and **`white-space: nowrap`**. Three consequences, each disqualifying on its own: a sentence-case `navigationLabel` in a mono role is exactly what the vocabulary says is not a mono label; `nowrap` means a 22-character label cannot wrap in a 180px rail and must overflow it; and there is no slot for the index and no two-line clamp. What this component takes from `Button` instead is its geometry and its habits — `--btn-ring-width` / `--btn-ring-offset` for the ring, `--btn-radius-bare-focus` for its corner, `--btn-hit-min` 44 for the target floor — which is the right kind of borrowing between a pattern and a primitive it may not wear. Non-blocking: decided, recorded so review does not re-litigate it.

**9 · Who owns the two-column shell. Non-blocking.**
Today the page writes the `Layout`, and section 10's skeleton is what 82 routes would repeat. Options: (a) **the page, for now**; (b) a tier-3 template in `src/templates/`, which is empty, so this would be the first one; (c) a `hasOutline` prop on some page wrapper. **Recommendation: (a) now, (b) at the second page family that adopts it.** 82 repetitions of six props is a real argument for (b), and the shell is exactly what a template is for — but a template built from one caller encodes that caller, and the audit, service and legal families do not yet agree on what sits between the hero and the outline. (c) is rejected: it hides an arrangement behind a boolean. Non-blocking either way — the component this document specifies is identical under all three, and section 14 item 2 asserts the shell from the rendered DOM rather than from where it was written.

**11 · Blue marks the current section, and hover loses it. Non-blocking — owner-directed, recorded as a departure.**
Raised in review, and it is the decision that reorganised sections 2, 5, 6 and 13. Options: (a) blue for hover, ink for current — the system's existing pointer language, and what this spec had first; (b) **blue for current, dark neutral plus an underline for hover.** **The owner chose (b).** The house rule survives — *"blue never appears on anything that is not clickable"*, and every row is a link — so what changed is which of two clickable meanings blue is spent on, and spending it on "you are here" is defensible: the mark is the reason this component exists, and it is the only thing in the rail a reader needs to find without looking for it. **The cost, recorded so review does not rediscover it:** this rail's hover language differs from every other link on the site, and a reader who has learned "blue = clickable" gets ink and an underline instead. Two things pay for it — the underline is the same affordance `Button emphasis="link"` draws, so the *shape* of the hover is familiar even though the hue is not; and on the `blue` surface, where blue can mean nothing at all, the mark falls back to `--color-white` and the 3px rule carries it (section 6). Non-blocking: decided, and the four-column table is complete under it.

**12 · The rule moved inside, and the head lost its own. Non-blocking — resolved.**
The first draft drew a hairline under `title` *and* a hairline down the leading edge of every row. Raised in review as reading like "an incomplete box", which is exactly right: two perpendicular hairlines meeting at a corner are a rectangle nobody finished. Options considered: (a) a ledger — a horizontal hairline per row, no vertical; (b) the leading spine with no head rule; (c) nothing drawn but the mark; (d) a deliberate full bracket; (e) **one hairline between the ordinal column and the label column.** **The owner chose (e),** and it is the strongest of the five for a reason worth writing down: it puts the rule *inside* the rail rather than on its boundary, so it reads as a table's column seam rather than as a border that stopped early; it gives the mark a track that already exists rather than one invented for it; and it leaves the rail's outer edge as a single clean alignment with the content column. The head is separated by `--gap-block` of air alone. Non-blocking: resolved and built.

**13 · The head's ink. Non-blocking — resolved, and it hit a floor.**
Raised in review as too loud. It was `--color-neutral-900` (14.62:1 on paper). It is now `--color-neutral-600` — 4.92:1, the same value as an unmarked row, and **the quietest it can legally be**: `--color-neutral-500` measures 3.16:1 on paper and fails the text floor. So "lighter" bottomed out at the floor rather than at a preference, and what still makes the head read as quieter than the ladder is 11px mono against 14px sans, not ink. If it needs to recede further the only honest routes are dropping it entirely (round-one option, not taken) or accepting a sub-floor value on a visible label, which this spec will not specify. Non-blocking.

**10 · The mechanism itself. BLOCKING — ANSWERED YES, 26 Aug 2026.**
Section 16's NEW MECHANISM REQUEST. The owner has to accept the first scroll-position dependency in this system — a component whose rendered output is not a function of its props alone — before this can be built, and there is no fallback design to build in the meantime: the mark is the hard constraint, and without it this document should not exist, because a rail of links with no mark is a `Layout` and a list and needs no component at all (section 1). The specific things being accepted, so the answer can be a yes to something concrete: one `IntersectionObserver` per rendered rail; the reading line read from computed style rather than restated; **no entry marked above the first heading** and **the last entry held below the last one**; and a dev-mode warning as the only defence against a page whose ids and hrefs disagree. **Answered yes on 26 Aug 2026**, with one addition the owner asked for: the observer is gated to ≥ 1024 and does not run at all below it, since there is no mark below 1024 (§9, §16). Nothing in this list now stops implementation.

---

## Appendix — self-audit

```
STRUCTURE
[x] All 18 sections present, in order, with the exact headings.
[x] Front matter states a tier (2 pattern), a Status (accepted — Q10 answered yes 26 Aug 2026),
    and a token prefix (--toc-*) checked one at a time against all 19 taken prefixes.
[x] Every part named in Anatomy appears in the colour table, the geometry list, or both.
    rail, title, list, entry and current are explicitly marked as carrying no ink of their own —
    rail carries geometry only, title carries one ink, list and entry carry nothing, and current carries no
    value at all: it re-points three other parts.

NAMES
[x] Count of distinct token names used: 64. Existing (40): --color-paper, --color-paper-deep,
    --color-white, --color-neutral-300, --color-neutral-400, --color-neutral-500,
    --color-neutral-600, --color-neutral-700, --color-neutral-900, --color-neutral-950,
    --color-neutral-100, --color-neutral-200,
    --color-brandeis-50, --color-brandeis-100, --color-brandeis-300,
    --color-brandeis-500, --gap-text, --gap-block, --gap-gutter,
    --gap-column, --text-micro, --text-micro-tracking, --text-body-sm, --text-mono-case,
    --border-width-hairline, --border-width-2, --border-width-3, --radius-4, --space-2,
    --focus-ring-width,
    --focus-ring-offset, --duration-fast, --duration-instant, --easing-standard, --shadow-none,
    --z-base, --sec-rail, --sec-container, --sec-gutter, --nav-bar-height. Cited as precedent
    or as a value NOT taken: --nav-bar-height-compact, --nav-sheet-row-padding-block,
    --btn-hit-min, --btn-ring-width, --btn-ring-offset, --btn-radius-bare-focus,
    --btn-text-tracking, --btn-text-md, --text-ui, --inp-height-touch, --lay-track-sm,
    --lay-track-md, --measure-body, --sec-ink-muted, --sec-rule-strong, --sec-rule-width,
    --acc-rule-width, --lcrd-rule-width, --lcrd-marker-tracking, --proof-quote-rule-width,
    --prose-quote-rule-width, --z-sticky, --breakpoint-1024, --gap-block, --gap-stack,
    --gap-none as the 'none' keyword. New (24): the 11 --toc-* colour names of section 6 plus
    the 13 --toc-* geometry names of section 7 — 57 declarations in total (11 × 4 surfaces, plus
    13 that do not vary by surface). --toc-rule-hover was DELETED in review: the rule reports
    currency only, and a hairline that also brightened on hover gave the rail two marks that
    meant the same thing. I checked every one ONE AT A TIME against
    vocabulary.md, not by pattern. TWO NAMES SUPPLIED BY THE BRIEF WERE REPORTED AS ABSENT AND
    BOTH IN FACT EXIST — --text-index and --lcrd-number-baseline-offset — because the designer's
    guidelines copy predated them. Neither is used here: --text-index is DECLINED ON SCALE
    (section 8, section 17 Q18) and the baseline offset is unnecessary once the ordinal is an
    in-flow flex item. The stale copy was regenerated on 26 Aug 2026.
[x] Every glyph I named is in the glyph set, or is a NEW GLYPH REQUEST describing a filled
    shape. I named no Icon glyph at all — this component renders no Icon. arrow-right appears
    once, in the specimen's jump Buttons, and is on the list.
[x] Every prop and every prop VALUE I gave for Section, Layout or Cluster appears in the prop
    unions: Section surface=paper|tint|ink|blue, density=tight|open; Layout as, columns={base,
    lg} | [1,4] | [1,3] | [1,5] | [1,6] | 3 | 4 | 2, colGap=column|gutter, rowGap=none|tight|
    text|block|stack|gutter, align=start, equalRows; Cluster colGap=tight, rowGap=tight.
    columns="fit" / "tile" and minTrack="xs" are named once each, in section 12, as placements
    that are FORBIDDEN — both are in the unions.
[x] Zero hex codes / rgb() / hsl() / colour words outside the contrast measurements. The four
    surface ground hexes appear only as the column headers' identification, as in Breadcrumbs.
[x] Zero Tailwind class names. Zero CSS declarations, selectors or @media blocks. Property
    names appear in prose only — section 13's transition list, section 14's greps, section 7's
    geometry sentences — and never as a declaration.
[x] Every --text-* role I paired with a tracking companion is on the list that has one:
    --text-micro-tracking, twice. --text-body-sm is named in section 8 as "none — this role has
    no tracking companion", which is correct: it is on the list of 7 that have none.
[x] Every layout distance is a gap-scale role name, referred to by name: --gap-block,
    --gap-text, --gap-gutter, --gap-column, and one distance stated as `none` rather than
    omitted. No layout distance is written as a number anywhere except as a parenthetical gloss
    on a token's own value.
[x] Every space-ramp reach carries its justification sentence in the required form. Count: 4 AT
    BUILD, 1 as specified — the optical one below, plus --space-72, --space-24 and --space-12,
    each reading the step it would otherwise have restated. Section 7(c) carries all four. The
    optical one is —
    --toc-underline-offset: var(--space-2), correcting the underline against the descenders of
    "Governance and ownership" at --text-body-sm. The two other places a reach would have been
    tempting are answered without one, and 7(c) says which.
[x] Every literal pixel value is a component size or a container cap, t-shirt named, and says
    what it was measured against. Count: 7 — --toc-ordinal-inline 24 (--prose-marker-inset 24
    and the measured 15.41px two-digit mono column); --toc-sticky-inset 104 (a calc of --nav-bar-height
    and --gap-gutter, against the verified 72px bar at 1024+ and the reset's 5rem);
    --sec-rail 180 (existing, the cap); --toc-min-inline 160 (the label-column arithmetic and a
    [1,6] track's 160.6); --toc-max-block (a calc, against the viewport);
    --toc-entry-padding-block 12 (--nav-sheet-row-padding-block and the 44px floor); and the
    44px floor itself (--btn-hit-min, --crumb-hit-min, --inp-height-touch). Plus figures
    MEASURED IN THE BROWSER and quoted as consequences rather than declared as values: the
    45.70px entry box, the 67.39px two-line box, the 15.41px index column, the 21.7px line box,
    the 1.70px by which consecutive rows clear the target, the 235.2/940.8 and 179.2/716.8
    tracks, the 160.6px [1,6] track, the 124px label column at the cap and 104px at the floor,
    and the ~870px nineteen-entry rail.

COLOUR AND CONTRAST
[x] The colour table has one row per token and four columns: paper, tint, ink, blue.
[x] No cell is empty, "same as paper", or a delta. Rows: 11 × 4 cells = 44.
[x] Every text colour has a measured ratio against the exact ground or fill it sits on. There
    is no hover fill and no pressed fill in this component — stated as an assertion under the
    table, and required by the constraint that the rail must not own its ground — so the hover
    and pressed inks are measured on the surface ground, which is what is behind them.
[x] Every text ratio is >= 4.5:1. Tightest: 4.91:1 (--toc-label-ink and --toc-ordinal-ink on
    blue). No disabled state exists, so the exemption is never used. The ordinal is held to the
    text floor rather than marked decoration despite being aria-hidden, and section 6 says why.
[x] The focus ring is measured against its own gap colour on every surface: 6.17 / 5.51 / 7.32
    / 6.23, floor 3:1. The gap is the surface ground because the entry paints no fill, so the
    inward-drawn ring measures against the same thing an outset one would have.
[x] Decoration is marked "n/a — decoration" rather than left blank — the --toc-rule row, with
    the measured number in brackets for information, plus the underline, which carries no colour
    token at all because it paints currentColor. The
    ring-gap row is marked as the ground the row above is measured against.
    --toc-current-rule is NOT marked decoration: it is the current mark, so it is measured as a
    graphical object at the 3:1 floor.
[x] One paragraph per surface explains what moved and why. Four paragraphs, and two of them
    record a value that is FORCED rather than chosen: --color-neutral-600 fails on tint at
    4.39:1, and --color-brandeis-500 fails on ink at 2.77:1.
[x] The nested-surface case is addressed, with the failure it prevents measured: 2.82:1 for
    ink's --color-neutral-500 stranded on the tint ground, against 7.27:1 for the tint column.

STATES
[x] Every state I claim comes from the fixed model, with the repo's suffix: rest, -hover (hover
    and focus), -pressed. ONE DEPARTURE, named and argued in section 5: `current` is a PART with
    part-named tokens rather than the model's -pressed held state, following Breadcrumbs'
    precedent, because the model's held states describe a control the user selected and nobody
    selected this — and, since review, because -pressed is where the POINTER lives here and the
    owner has given blue to currency instead. A SECOND DEPARTURE, argued in section 5 and
    recorded as §17 Q11: blue is not a pointer state in this component. The house rule survives
    (every row is a link) but this rail's hover language differs from every other link on the
    site, and the underline is what pays for it.
[x] The rendered hover state differs from the rendered pressed state on all four surfaces: the
    label ink moves on every one (n900→n950, n900→n950, n200→white, b50→white) AND the underline
    doubles in height, so the two differ in a second, non-colour way on every surface rather
    than only where the ramp allowed it.
[x] Every state token I introduced MOVES on at least one surface. --toc-rule-hover was DELETED
    in review — the rule reports currency only, and a hairline that also brightened on hover
    gave the rail two marks meaning the same thing. No --toc-*-bg-* exists (no fill, by
    constraint), no --toc-disabled-* exists (no disabled), no --toc-expanded-* exists (nothing
    opens), no --toc-entry-min-block exists (the padding produces the target), and the underline
    has no colour token (it paints currentColor) — each absence stated as an assertion rather
    than left silent.
[x] Every state token is declared on all four surfaces, including where it equals rest:
    --toc-label-ink-hover on tint is the same --color-neutral-900 as on paper and is declared in
    both blocks; --toc-current-ordinal-ink equals --toc-current-rule on all four and is declared
    in all four; on blue --toc-label-ink-pressed and --toc-current-label-ink are both
    --color-white, and section 6 says which non-colour part carries the difference.
[x] Disabled uses its own tokens and no opacity — vacuously: there is no disabled state, and
    `opacity` appears nowhere. No colour-only state: hover moves the label AND wipes in an
    underline, pressed doubles that underline, focus adds the ring, and current adds a 3px blue
    rule and an aria-current. This is the check the owner's chosen mark ("label full-strength,
    everything else fainter") would have failed on its own, and the rule width is what answers it.

LAYOUT, TYPE, SEMANTICS
[x] Every arrangement is a Section, Layout or Cluster. colGap="column" is stated on the one
    Layout that sets columns, and omitted on the single-track body stack. The two zero-distance
    stacks inside the component are stated as `none` and section 10 argues why they are bare
    elements rather than Layouts — the ol reset the primitive cannot apply is the reason, and it
    is raised as Q6 rather than worked around silently.
[x] No margin on any child, anywhere in the spec. Section 14 item 9 asserts zero `margin` in
    the module, with no exception — this component has no visually hidden text to clip.
[x] No media query changes a gap step or a type role. There is exactly one media query in the
    component; it changes position, the two caps and the internal scroll, and section 14 item 14
    is the check.
[x] Every part carrying running text names a measure — none does, and section 8 says so and
    says why --measure-body is declined rather than applied.
[x] Every interactive target reaches 44px on touch, by stepping the BOX up rather than by
    extending the hit area: 45.70px measured, clearing 44 by 1.70. Section 9 says which of the
    two legal means and why the other is unavailable here — contiguous rows, so an extension
    would overlap its neighbours, which is the defect Breadcrumbs measured and fixed. 1024 is
    an iPad landscape width, which is why the floor applies at all.
[x] Every ARIA idref I specified points at an element that is ALWAYS rendered: aria-labelledby
    points at the title, which is not a prop and cannot be switched off — stated in section 3 as
    the reason it is not a prop. The n href fragments are idrefs this component does NOT own,
    and section 11 says exactly what happens when one resolves to nothing: the link still
    navigates, the entry can never be current, and a dev warning names it.
[x] No selector walks upward; no :has(); every state a parent needs is a prop or a class. The
    `current` part is a class this component emits on the <li>. Section 14 item 11 is the grep.

COMPLETENESS
[x] All thirteen content edge-case rows answered — none skipped; the one "none" row (missing
    image or optional slot) says why there is neither.
[x] The "parent that does not size it" row names a minimum: --toc-min-inline 160px, with the
    label-column arithmetic behind it, the ~60px intrinsic collapse it prevents, and the three
    placements that are forbidden (Cluster, columns="fit", columns="tile") rather than merely
    discouraged.
[x] Do's and Don'ts are testable: each of the 18 names the grep, the rendered-DOM assertion or
    the type check that decides it, and the greps carry the comment-stripping qualifier this
    repo's review step prescribes.
[x] The specimen plan renders the 1 × 1 matrix, all four surfaces as sibling bands with
    identical markup, the nested-surface band, every edge case in section 12, two adjacent, and
    the component in a narrow track — and it is BUILT, at
    /design/table-of-contents, replacing the designer's deleted hand-off mockup, which is where the 45.70,
    67.39 and 15.41 figures come from. It states the two things it cannot prove (the 1024
    switch, which needs a viewport either side, and the absence below 1024, which is only
    convincing if the note says it should be absent) rather than ticking them off.
[x] Section 16 lists one justified request in the block form — a NEW MECHANISM REQUEST for
    scroll observation — and states that no new colour, gap, glyph or value is needed. It also
    records the two token names the brief supplied that do not exist, so nobody builds them.
[x] Every open question has options, a recommendation, and a BLOCKING / non-blocking mark.
    THIRTEEN questions as handed over, ONE BLOCKING (Q10, the mechanism) — ANSWERED YES on
    26 Aug 2026, which is why Status is now accepted. Four more (14-17) were raised on the
    implementation read and answered in the same pass. Q3 was overturned (the outline does
    render below 1024) and Q6 was struck (its premise was false: the reset already covers ol).
[x] Squint test: the rail reads as more than one idea and is not one rectangle repeated — a
    quiet mono head separated by air alone, a monospaced digit column that aligns every label
    for free, ONE hairline running BETWEEN the two columns rather than around them, a sans label
    column, and one 3px blue segment with a blue digit marking where the reader is. REVISED IN
    REVIEW: the first draft drew a rule under the head AND a rule down the leading edge, which
    met at a corner and read as a box nobody finished. Both are gone; §17 Q12 records the five
    options considered and why the interior seam won. The specimen route reads as five shapes: a
    scrolling in-situ page, a four-band surface ladder, a tall-rail study, a state grid and a
    stress list.
```

## Amendment · 16 Oct 2026 — an entry's count (`TocItem.meta`)

`TocItem` gains an optional `meta: string`, rendered at the entry's end in the ordinal's mono voice and
ink (`.meta`), not shrinking. For an index page's outline, where each entry is a category and its
count is the one fact a reader wants before jumping (the insights hub, the case index). Never authored
copy, never a second label; long-form documents pass none and render as before. The one-prop contract
is unchanged: it is a field of the items, not a prop.
