# Tag

## 0 · Front matter

| | |
|---|---|
| **Component** | `Tag` |
| **Tier** | 1 primitive (`src/components/Tag/`) |
| **Status** | implemented |
| **Token prefix** | `--tag-*` (collides with none of `--acc-` `--bcrd-` `--crumb-` `--btn-` `--call-` `--csec-` `--cta-` `--enq-` `--fig-` `--foot-` `--icn-` `--inp-` `--lay-` `--lcrd-` `--logo-` `--nav-` `--hero-` `--proof-` `--prose-` `--sec-` `--toc-`) |
| **File** | `tokens/components/tag.css` |
| **Designer / date** | Design · 26 Aug 2026, revised 27 Aug 2026 |
| **Implements** | COMPONENT NAME: Tag — the inert taxonomy mark and the interactive filter mark, two variants, one geometry |
| **Implemented at** | `src/components/Tag/` · `src/styles/tokens/components/tag.css` · `src/app/design/tag/page.tsx` · built 28 Aug 2026 |

**Revised 27 Aug 2026 — twice, and this is the second pass.** The first draft gave both variants a hairline edge, separated them by edge weight, and filled the held chip with a pale blue ground inside a doubled edge. The revision after that inverted the enclosure — a **ground with no edge** for the mark, an **edge with no ground** for the chip — and filled the held chip with `--color-neutral-950`. This pass keeps the inversion and removes the rest of it, on the owner's three notes: a full fill takes more attention than a held filter deserves, so **the chip never fills, in any state, on any surface but one**; blue at rest was doing work it should not, so **nothing is blue until it is pointed at**; and the box comes down from 32 to **24**. The held chip is now an outline and a label both drawn in the surface's own ink, plus a `close-circle` glyph. `--tag-edge-width-selected` and `--tag-filter-bg-hover` are deleted. Sections 4, 5, 6, 7, 9 and 14 carry the reasoning; the rejected treatments are recorded in section 4 rather than dropped.

**Verified against the loaded Tcules library** (`window.Tcules`, 20 components) and `guidelines/docs/vocabulary.md`. It was drafted against a browser mockup that composed the real `Section`, `Layout`, `Cluster`, `PageHero`, `BlockCard`, `Button` and `Prose`, with only the mark hand-built to this document — so the row behaviour, the hero stack, the filter band and the card band below it were the shipped components behaving as they already behave, and **every number in sections 6, 7, 9 and 12 was measured** rather than reasoned about. Where a figure is measured it says so. That mockup ran against Claude Design's bundle rather than this repo, and it is not kept: it was the instrument, and section 15 is the record of what it showed. **The measurements were independently re-checked against `src/styles/tokens/` on 28 Aug 2026** — all 38 contrast ratios in section 6 recomputed from the primitive hexes, and every token name, prop union, glyph and call-site claim confirmed in the repo.

**Something new IS needed, and the composition around it is not.** The rows are `Cluster` with existing props. The band is `PageHero`'s `children` slot on the inert side and `Layout` columns on the filter side. The cards below the filters are `BlockCard` with its existing `eyebrow`. None of that is specified here. What does not exist is **the mark itself** — ten route modules write `<li>{tag}</li>` and get body type, and the filter row borrows a ghost `Button` for a job it was not named for. That mark has its own anatomy, its own two type roles, its own eleven colour tokens across four surfaces and its own touch-target argument, and it is the only thing below.

**One name in the brief is not in the vocabulary and I have not used it as a value.** `--sec-rule-strong` (what `Section`'s firmer rules resolve to) is real in the browser but absent from `vocabulary.md`, so section 6 names the `--color-*` steps directly and states the alignment in prose rather than reading the token. Tokens the brief itself quotes — `--prose-mark-bg`, `--prose-mark-ink`, `--btn-ghost-neutral-bg-pressed` — appear here as citations of the brief, never as values.

**Revised 28 Aug 2026 — third pass, on the owner's answers to the open questions and a verification pass against the repo.** Six things moved. **No tag ever wraps to a second line**, exactly as no button does (sections 3, 7, 8 and 12 rows 1, 2, 5, 8). The **focus ring is a two-layer outward `box-shadow`**, matching all eight components that ship one, rather than the `outline` an earlier draft's mockup drew (sections 2, 6, 7, 11). The **glyph gap follows `--btn-gap`'s precedent** and is an optical correction rather than `--gap-inline`, which takes section 7(c)'s count to 2. **Q1-Q5 are answered** — the element and its `aria-current`, the held chip's composed name, the 24px box, the ring mechanism and the glyph gap — so no BLOCKING question remains and the Status went to `accepted`. The questions were also renumbered: the previous pass skipped Q8 and claimed eleven where there were ten. The `/insights` migration is **out of scope for the build** and recorded as a follow-up (section 17). And the stale 32s the 24px pass left behind in sections 12, 15 and the appendix are corrected.

**Built 28 Aug 2026 — fourth pass, and this one is the code.** Status is `implemented`; the paths are in the front matter. Three divergences from what this document asked for are recorded in the sections they contradict rather than only here — section 7(b) (the `:root` block carries eleven names, not eight), section 12 row 2 (a containment boundary the mockup's measurements could not see, filed as Q13), and section 15 band 10 (the measured readout ships static). An independent audit then caught four more, all fixed in this pass: a contrast figure mis-stated in a comment as 3.00:1 where it is **2.97:1** — the number that decides whether `--color-brandeis-950` clears the outline floor on blue, and it does not; a missing specimen tile (section 15 band 9's comparison against the ghost `Button`); a narrow track quoted at 240 that the proving ground renders at 256; and the state columns in section 15's bands 4–7, which contradicted that section's own closing paragraph.

**Fixed 28 Sep 2026 — tracker 2.5, found by `npm run shots`.** Two faults on `/design/tag`, neither a change of design. (1) The hydration mismatch at both widths was the specimen, not this component: it wrapped each `BlockCard` in an `<li>`, and `BlockCard`'s root already is one, so the card band rendered `li` inside `li`. The wrapper is gone. (2) The 18px overflow at 390 was section 12 row 2's own `Cluster` row — the documented Q13 boundary — whose 376px URL row is wider than a phone's 326px column, so the demonstration dragged the page sideways. It now scrolls inside the harness's `scrollX` box, as `/design/cluster`'s nowrap row does, so the push stays visible and nothing is clipped. Q13 is unchanged, and so is its recommendation, (b). Measuring the fix turned up one real code/spec disagreement, now fixed in the component: row 2 promises a clip **at the inline end**, but the box's `justify-content: center` split the overflow across both edges, so a pasted URL lost `https://` as well as its tail. The box is now `safe center`, with plain `center` kept first as the fallback. No box at any measured size moves: every figure in section 7(b) still holds.

**Amended 29 Sep 2026 — tracker 2.17, the ch04 Solar Bold icon set.** The held chip's glyph is now `close-circle` (the pre-ch04 `close` is retired; see `docs/specs/Icon.md`), and `--tag-glyph-size` moves from 14 to **16**. The new glyph has a counter — its cross is a hole in a disc — and Icon.md sets a 16px floor for every such glyph, because at 14 the 1.5-unit hole is under a device pixel and fills in. Solar's 2-unit clearance means the disc itself measures 13.3px in the 24 box, so the section 7 argument against a 16px glyph (that it crowds the box) applied to the old full-bleed cross, not to this one. The held chip is therefore 2px wider: re-measured at 101.28 × 24.00 (was 99.28), 21px wider than unheld (was 19). Nothing else moves.

**Amended 29 Sep 2026 — tracker 2.17, the visual overhaul, on the owner's approval.** Two changes. **The held chip fills on every surface**, on the model blue already had: `--tag-filter-bg-pressed` becomes `--color-neutral-950` on paper and tint and `--color-paper` on ink (blue unchanged at `--color-white`), `--tag-filter-ink-pressed` is reversed to match — `--color-paper` on paper and tint, `--color-neutral-950` on ink — and the `close-circle` glyph reads the same colour through `currentColor`. Every reversed label measures 17.10:1 (10.16:1 on blue). This reinstates the second draft's fill (section 4) that the 27 Aug pass rejected; the ink-drawn outline read as a firmer rest chip rather than as a selection. **`--tag-filter-edge` moves one step firmer on every surface** — `-600` on paper (4.92:1), `-700` on tint (7.27:1), `-500` on ink (5.41:1), `--color-brandeis-100` on blue (4.91:1); on the two dark grounds firmer means lighter. No ring token moves: the ring's gap layer separates it from every new fill. The held chip is still not mistakable for a mark — a 1.12:1 tint against a full reversal. Sections 3, 4, 6, 7, 11 and 13 are amended in place.

## 1 · Identity

The site's small label mark: one word to a short phrase, in a box of its own, sitting in a row of its siblings. Two variants. The **mark** names what a page is filed under and does nothing. The **filter** offers a query the reader can apply and behaves like the control it is. They share a box and differ in enclosure, voice and behaviour.

**Tier 1 primitive.** It arranges nothing above itself and knows nothing above itself: it takes a string and a destination and renders one element. It imports no component — the row is the caller's `Cluster`, and the one glyph it can hold arrives as an `icon` `ReactNode` from the call site, exactly as `Button` takes its own. It takes no CMS-shaped record either: `hero.tags: string[]`, `hero.labels: string[]` and `InsightTaxonomy.name` all arrive at the call site as a plain string, and the mark never learns which. `src/components/Tag/`.

**What it is NOT**

1. **Not a row.** `Cluster` is the row — it owns wrap, `colGap` and `rowGap`, and it is already at all eleven call sites. There is no `TagList`, no `tags: string[]`, no overflow affordance, no `max`. A component that owns its own row is a pattern; this is a mark.
2. **Not a button.** `Button` is the control that performs the page's ask, with three emphases, three sizes, a busy state and a 44px hit-area option. The filter variant navigates and nothing more. Nothing here fills a brand band, nothing here is bare with a fill that arrives on the pointer, nothing here rules its label — those three signatures are Button's and section 5 keeps its hands off all three.
3. **Not a highlight in running text.** `Prose`'s `<mark>` — the brief's `--prose-mark-bg` on `--prose-mark-ink`, identical on all four surfaces — means "this phrase, inside this sentence, highlighted". A tag is not inside a sentence. It is one of a row of siblings outside the prose column, and it carries the surface's own colour logic rather than one ground everywhere.

**And not a status badge.** `src/content/types.ts` has no `status`, `state`, `isNew`, `upcoming`, `comingSoon`, `available`, `live` or `badge` on any page type; `EventPage` carries `details`, `tags`, `categories` and `publishedAt` and no notion of whether the event has happened. Semantic colour in this system is `--color-danger-{100,300,600}` and `--color-success-500`, used only by form validation. So there is no `tone` prop, no third variant, no reserved slot and no new ramp. The day a content field exists to feed it, this component gets extended by a spec that starts from that field.

**Nearest existing component, and why this is not a prop on it.** The ghost `Button` the filter row uses today — `emphasis="ghost" tone="neutral" size="sm" active extendHitArea` rendered `as="a"`. It gets four things right and Tag keeps all four: a held-selected state, the selected option announced, a focus ring, and four correct surfaces. Three reasons it is the wrong home. **Semantics:** a taxonomy label is not a control, and a `Button` that renders inert would be a control with its behaviour removed — the API would grow a prop that turns off every state it has. **Vocabulary:** the inert mark is 13px sans in the author's own case, and every Button label in the system is mono uppercase by role; an `emphasis="tag"` would have to fork Button's type as well as its paint. **Ownership:** `extendHitArea` is exactly the prop Tag must not inherit (section 9), so the inherited API would be wrong at its most load-bearing point. The reason to move is not that the Button is broken; it is that a filter chip and a taxonomy label are the same object to a reader, and they should be one component with two variants.

**How many appear on a page.** Inert: one row, three to eight marks, on ten route modules covering most of the 129-page corpus — `services/[...slug]` (32), `insights/[...slug]` plus `insights/events/[slug]` and `insights/podcasts/[slug]` (21), `glossary/[slug]` (18), `case-studies/[slug]` (14), `expertise/[slug]` (12), `audits/[slug]` (6), `services/page.tsx` and `how-we-work/page.tsx`. Every row is optional per record and an empty one renders nothing, so those are ceilings, not a census. Interactive: one page, `src/app/insights/page.tsx`, three rows, roughly eleven chips — three to five real options per group **and no `"All"`**, which is not a filter and is dropped (Q12). **The two never appear in the same band, and on `/insights` they appear on the same page** — that page is the specimen that decides whether this works.

> **Owner amendment, 7 Oct 2026 — Tag or a bulleted label.** A `Tag` labels ONE item in a set (`mark`)
> or applies a query (`filter`). Facets that describe the page the reader is on are not Tags: they are
> PageHero's bulleted tag list. The full rule and its decision test are in
> `docs/kit/visual-direction.md` § 3.8.

## 2 · Anatomy

| Part | Element | Required | Content slot | Carries |
|---|---|---|---|---|
| `tag` | `<span>` (mark) or `<a href>` (filter) | yes — it is the whole component | none | everything: the box, `--tag-size-md` in both axes as a **minimum**, the inline and block padding, `--tag-radius`, the edge, the ground when one exists, the label's type role and its case, and `aria-current` when selected |
| `label` | **no element** — the text node inside `tag` | yes | `children`, verbatim | nothing of its own, and **it never wraps**. A blank or whitespace-only string renders **nothing** and warns in development (`Tag.tsx`), so no box and no nameless target can ship — section 12 row 7: `tag` sets `white-space: nowrap`, so the label is one line in every case. There is no inner span, no clamp and no ellipsis. The containment backstop is on the box (`max-inline-size: 100%`, `overflow: hidden`) rather than on a second element, which is what keeps the anatomy at one element — an ellipsis would need an inner block container, and section 12 row 2 says a pasted URL should look wrong rather than look tidy |
| `edge` | an **inset `box-shadow` layer** on `tag`, not a border box and not an `outline` | **filter only** | none | `--tag-filter-edge` / `-hover` / `-pressed`, at `--tag-edge-width`, **one width in every state**. Drawn inward, so a ground and an edge occupy the same box without either variant's label sitting a pixel off the other's. An `outline` is not available for it: `outline` is what the ring would want, and one element has one outline |
| `ground` | a fill on `tag` | **mark always; filter when pressed or held, on all four surfaces** | none | `--tag-mark-bg`, and `--tag-filter-bg-pressed`, which is a reversed fill on every surface (29 Sep 2026, tracker 2.17). **There is no `--tag-filter-bg` and no `--tag-filter-bg-hover`** — at rest and on hover the chip is an outline and a label, and those two absences are the assertion |
| `glyph` | the `icon` node, centred beside the label by the box's own `flex` | filter only, and in practice the held chip only | `icon` | no colour of its own: it inherits the label's `currentColor`, so it carries the label's measured ratio by construction. Sized `--tag-glyph-size`, set off by `--tag-glyph-gap` — an optical correction, not a gap step (section 7(c)) |
| `ring` | `:focus-visible` on `tag` | filter only | none | `--tag-ring-color` at `--tag-ring-width`, offset `--tag-ring-offset` outward over `--tag-ring-gap-color`. Drawn as the **two outward `box-shadow` layers** every other component in this system uses — `outline: none`, then a gap layer and a ring layer — with the `edge`'s inset layer composed into the same declaration, since one element has one `box-shadow`. `Button.module.css:408` is the shape to copy |
| `selected` | a class on `tag`, set from the `selected` prop | filter only | none | no colour of its own — it re-points the ink, the ground and the edge at their `-pressed` values, and it is the one paint state that survives `:hover` and `:focus-visible`. Paired with `aria-current` and, at the one call site, the `close-circle` glyph |

**Enclosure is the categorical difference, and it is an inversion rather than a degree.** The inert mark is a ground with no edge. The chip is an edge with no ground. Neither can be read as a paler version of the other, which is exactly what one treatment separated only by strength produces — a firmer line and a deeper fill read as the same object at two weights, and a reader's first guess about the quieter one is that it is disabled.

**Inside the chip the two parts then divide the work.** The `edge` carries *what kind of thing this is* — one hairline, present at rest, blue on every surface. The `ground` carries *the pointer and the hold*, and it is absent until one of them arrives. Nothing is ever ambiguous about which of those two things it is reporting.

**Two author-facing slots, and the second is narrow.** `children` is the label. `icon` is one glyph on the held chip, which is what section 12 rows 6 and 13 answer.

## 3 · Props / API

```
type TagProps =
  | { variant?: 'mark';   children: string }
  | { variant:  'filter'; href: string; selected?: boolean; icon?: ReactNode; children: string }
```

| Prop | Exact literal union | Default | What it decides |
|---|---|---|---|
| `variant` | `'mark' \| 'filter'` | `'mark'` | The element (`span` vs `a`), the type role, the colour set and whether there are states at all. Defaulted to `mark` because ten call sites are inert and one is not |
| `children` | `string` | none — required | The label, in the capitalisation somebody authored. A `string` and not a `ReactNode`, which is the enforcement mechanism for section 8: markup in a label is how a case, a weight or a second colour gets smuggled past the stylesheet |
| `href` | `string` | none — **required when `variant="filter"`** | The destination. It is a query-string rewrite on the same route today; the component neither builds it nor parses it |
| `selected` | `boolean` | `false` | The held state: the `-pressed` ink, ground and edge, held through hover and focus, plus `aria-current="true"`. Meaningless on `mark`, and a compile error there |
| `icon` | `ReactNode` | `undefined` | One glyph after the label. `Button` takes its `icon` the same way and for the same reason — a primitive may not import `Icon` — so the call site passes the node. The one caller passes `<Icon name="close-circle" label="Clear filter" />` on the held chip, beside an `href` that clears that group's parameter, which is what makes the glyph a control rather than a decoration. Legal on `filter` only |

**Deliberately NOT props**

| Not a prop | Why |
|---|---|
| `surface` | The mark paints no band. It reads `data-surface` from an ancestor, exactly as `Button`, `ListCard` and `Accordion` do. Only a component that owns a band takes `surface` |
| colour, background, padding, gap, radius, height, width | The token layer owns colour; `Cluster` owns the distance to the next mark; the component owns its own box. All four would be a way to make one row disagree with the other ten |
| `as` | The element is decided by `variant` and there is no third case. `as="li"` in particular must be impossible: the caller supplies the `li`, and section 12 covers the `dd` |
| `size` | One size (section 4). A second one forfeits the shared geometry the whole spec rests on |
| `tone`, `variant="status"`, `color` | No content field feeds a status, and this system has never used a colour to mean a state outside form validation |
| `iconLeft`, `iconOnly` | One glyph, after the label, and no second position. A leading glyph puts the label's first pixel at a distance that varies with whether a glyph is there; an icon-only tag has no label, which is the one thing a tag is |
| `onClick`, `onSelect`, `as="button"` | Every filter navigates today. A filter that mutates client state without a URL is a different control and needs its own argument |
| `truncate`, `maxWidth`, `lines`, `nowrap` | Section 12 row 1 decides this and there is nothing to configure: **a tag is always one line, never wraps and never truncates a label that fits.** No tag wraps for the same reason no `Button` wraps — a control-shaped object that grows a second line stops being one object in a row of siblings. Every measured label fits the narrowest real column, so the cap is a containment backstop rather than a feature, and it is unconditional. A `maxWidth` would let one row disagree with the other ten |
| `count`, `dismissible`, `onRemove` | No call site has a count, and nothing here removes anything by itself. The held chip's `close-circle` is not a dismiss handler: it is a glyph beside an `href` that clears the group, so the navigation does the work and the component keeps no state and fires no callback |
| `disabled` | No filter is ever unavailable (section 5) |
| `className`, `style`, `id`, `...rest` | The props type is closed. The only reasons to reach in are colour, spacing and width, and all three are answered above |
| `aria-label`, `title` | The visible label is the accessible name. A second name is how they drift apart |

**Compile errors, not review comments**

1. **`href` on the inert variant.** The union has no `href` in the `mark` member, so `<Tag href="/insights?tag=lab">Lab</Tag>` fails at the call site. This is the hard constraint expressed as a type: there is no taxonomy archive to link to — `src/lib/routes.ts:64` says so outright, *"Insights — formats are index pages, not tags."*
2. **`selected` on the inert variant.** Same mechanism. An inert mark has no held state to be in.
3. **`variant="filter"` with no `href`.** A control that navigates nowhere is a focusable dead end.
4. **A non-string child.** `<Tag><em>Lab</em></Tag>` fails. Case, weight and colour belong to the stylesheet.
5. **`icon` on the inert variant.** The `mark` member has no `icon`, so a glyph cannot be attached to a label that is not a control.
6. **Any other prop.** Closed interface, no index signature, no `HTMLAttributes` spread: `className`, `size`, `tone`, `onClick` all fail excess-property checking.

## 4 · Variants × sizes

| | `mark` (inert) | `filter` (interactive) |
|---|---|---|
| Element | `span` | `a href` |
| Type role | `--text-caption` — 13px sans, verbatim case | `--text-ui-sm` — 12px mono, uppercase by role |
| Hue at rest | neutral, on all four surfaces | neutral, on all four surfaces. Blue arrives on the pointer and nowhere else |
| Edge at rest | **none** | hairline, neutral, 4.91–7.27:1 across the four surfaces |
| Ground at rest | a quiet tint of its own, 1.12–1.63:1 against the section it sits in | **none — and none in any other state either**, on three of the four surfaces |
| States | none at all | rest · hover · focus · pressed · held |
| Height (min) | `--tag-size-md` — 24 | `--tag-size-md` — 24 |
| Inline padding | `--gap-tight` | `--gap-tight`, less `--tag-label-trim` on the end edge — restored in full when a glyph is present |
| Radius | `--tag-radius` | `--tag-radius` |

**One size, named `md`, and the size axis does not exist.** There is no `sm` and no `lg`. The two variants share height, both paddings and radius with **no per-variant fork**, because a reader meets both rows on the same site and often the same page, and a size difference between them would read as importance rather than as affordance. What steps between the variants is paint, type and behaviour — three axes, all categorical, all visible at rest:

- **Enclosure, and it is an inversion rather than a degree.** The mark is a ground with no edge; the chip is an edge with no ground. There is no amount of fading that turns an outline into a fill, so the two cannot be read as one treatment at two strengths — which is the failure a hairline on both, or a fill on both, walks into. It also settles the collision that matters most: an inert mark can never be mistaken for a *selected* filter, because a held chip is a reversal to the far end of the ramp and the mark is a tint at 1.12:1.
- **Voice.** Mono uppercase is the label voice every control in the system speaks (`--btn-text-tracking`, `--nav-item-text-tracking`, `--foot-social-tracking` are all 0.08em mono). Sans in the author's own case is the voice of content. A 32-character sentence-case free-text label is not a mono label, and the vocabulary's own rule resolves it: give it a sans role.
- **Nothing is blue at rest, and that is the third decision rather than an absence of one.** Blue appears on nothing in this system that is not clickable, which makes it the strongest affordance code in the vocabulary — and spending it on fourteen chips that are merely present, on the one page that also carries real links, is spending it on the wrong thing. So blue is what a chip does **under the pointer**: rest is neutral, hover takes the label and the line into `--color-brandeis-600` and `-500`, and the meaning lands at the moment a reader is asking the question. The mark is never blue on paper, tint or ink; on blue it takes a blue-on-blue ground, which is the surface speaking and not the mark.

**Variants considered and rejected**

| Rejected | Why |
|---|---|
| A `status` / `tone` variant | No content field feeds it. Out with the reason on the record, not deferred |
| `size="sm"` at 24 or 28 | 24 is a floor to clear, never a size to aim at (section 9), and a second size forfeits the one geometry |
| A `--radius-full` pill | The footer's rating badge is the one pill in the system and its geometry is private to the footer. A pill is a single distinguished object in a quiet band; this is one of eight siblings |
| An edge on the inert mark and no ground | The previous draft's answer, and the one this replaces. It left the variants separated by edge *weight* — 2.12 against 3.82:1 — which is a degree rather than a category, and it drew eight hairline rectangles at the bottom of every hero for a reader to parse. A ground draws none: at 1.12:1 it is a change of paper. `--prose-mark-bg` is the precedent for a small non-control mark carrying its own ground |
| A pale brand fill and a doubled edge for the held chip | The first draft's answer. Three blues doing one job — a `--color-brandeis-100` ground under `--color-brandeis-700` type inside a 2px `--color-brandeis-600` edge — and the width step moved the box when it changed |
| A full `--color-neutral-950` fill for the held chip | The second draft's answer, rejected on 27 Aug on the owner's note that a black capsule in a row of hairlines is the loudest object in the band. **Reinstated 29 Sep 2026 by the owner (tracker 2.17)**, on blue's model: the ink-drawn outline that replaced it read as a firmer rest chip rather than as a selection, and on three of four surfaces the held state was carried by one hairline and a glyph. The fill is now the reversal on every surface — 950 on paper and tint, paper on ink, white on blue |
| A 32px box matching `--btn-height-sm` | Rejected with the fill, and for the same reason: matching the button's height made a taxonomy label a button-sized object. At 24 the row reads as a band of marks inside a column of text. The cost is real and section 9 states it — 24 is the AA target floor exactly, so the row gap becomes the thing that keeps two targets apart |
| A boxless inert mark | Legitimate, and it forfeits the shared geometry. Rejected because the shared box is what makes the two rows siblings, and because a boxless mark in a wrapping row has nothing to align to at the row's second line |
| A `check-circle` glyph on the selected chip | Rejected in favour of `close-circle`. A check confirms what the reversal has already said; `close-circle` gives the glyph a job — it clears that group — which is the whole difference between a glyph and a decoration. **With `"All"` dropped (Q12) the glyph is the only way to clear a group, so it is load-bearing rather than merely justified**, and Q2's decision to give it an accessible name follows from that rather than from politeness. Its cost is real and stated: the chip is wider by `--tag-glyph-size` plus `--tag-glyph-gap` plus the restored trim, so a row can re-wrap when a selection changes. That happens on a navigation, never under the pointer |
| A separate treatment for `categories` vs `tags` | One treatment. A category and a free-text tag mean the same thing to a reader, and the case-study hero's `[...categories, ...tags]` concatenation is therefore **correct** and stays |

## 5 · States

**The inert variant has no states, and the absence is the argument.** No hover, no focus, no pressed, no disabled, no `href`, no `onClick`, no `as="a"`, no `button`. Nothing is hit, so no touch-target floor applies to it at all; nothing is focusable, so there is no ring; there is no archive route to link to. A state token exists only if a value moves, and nothing on the inert mark ever moves — so **there is no `--tag-mark-ink-hover` and no `--tag-mark-edge-hover`, and their absence is the assertion.** A hover added "for symmetry" would be a lie about whether the thing can be operated, on ten routes at once.

**The interactive variant takes the model whole.**

| State | Token suffix | Trigger | What moves |
|---|---|---|---|
| rest | *(none)* | base | `--tag-filter-ink`, `--tag-filter-edge`. No ground |
| hover | `-hover` | `:hover` | ink → `-hover`, edge → `-hover`. **No ground appears** — there is no `--tag-filter-bg-hover` and its absence is the assertion |
| focus, keyboard | `-hover` **plus the ring** | `:focus-visible` | exactly what hover shows, plus `--tag-ring-color` at `--tag-ring-width` and `--tag-ring-offset` |
| pressed | `-pressed` | `:active` | ink → `-pressed`, edge → `-pressed`, ground → `--tag-filter-bg-pressed`: a reversed fill on every surface (tracker 2.17), so a press previews exactly what selecting leaves |
| held: selected | `-pressed` | the `selected` prop's class | the `-pressed` ink, edge and ground, plus `aria-current="true"`, plus the `close-circle` glyph the call site passes. **It is the one paint state that survives hover and focus** |

**Hover and pressed differ on all four surfaces, and they differ in kind as well as in hue.** Hover moves both the label and the line into the blue — `--color-brandeis-600` on `-500` on paper and tint, `--color-brandeis-200` on `-300` on ink, `--color-white` on white on blue. Pressed REVERSES the box: a `--color-neutral-950` fill under a `--color-paper` label on paper and tint, a `--color-paper` fill under a `--color-neutral-950` label on ink, a `--color-white` fill under `--color-brandeis-700` on blue. So the two states are not two depths of one colour; one is a blue outline and one is a filled box, which is legible at a glance.

**Held is distinguished from pressed by permanence, a glyph and an attribute — never by a second colour set.** They share the `-pressed` paint because the fixed model says so, and the sharing is exactly right here: a held chip is a chip that stays pressed. It is a reversed fill — the far end of the surface's ramp as a ground, the label and glyph turned to the other end on it at 17.10:1 (10.16:1 on blue), 29 Sep 2026, tracker 2.17. What separates it from a momentary press is that it does not go away: it survives `:hover` and `:focus-visible`, it carries `aria-current="true"`, and it carries the `close-circle` glyph beside its label. So the held state is never colour alone, and it never asks for a width step.

**The held chip has no hover response, and that is a decision rather than an omission.** Its box is already at the end of the ramp — there is nowhere louder to go — and repainting it back into the pale hover tint under the pointer would say *deselected* at the exact moment the reader is deciding whether to clear it. The feedback for that action is the cursor, the `close-circle` glyph, and on keyboard the ring, which still appears because the ring is the one thing focus adds that paint does not. **There is no `-selected` colour set and no `--tag-filter-bg-selected-hover`; their absence is the assertion.**

**Excluded, with reasons**

- **Disabled.** No filter is ever unavailable: every option in every group is reachable, and an empty result set is a page-level message, not a dead chip. What would make it so — a facet count of zero rendered from the seam — is a content-model change, and the day it exists disabled arrives with its own tokens and no `opacity`.
- **Expanded.** Nothing opens.
- **Busy / loading.** Nothing here is asynchronous. A navigation is the browser's business.
- **Visited.** A filter is a state of this page, not a place you have been.

## 6 · Per-surface colour

Eleven tokens, four surfaces, every cell declared. **Text is measured against the exact thing it sits on** — the surface ground at rest, the hover fill on hover, the pressed fill when pressed or held.

| Token | paper (`--color-paper`) | tint (`--color-paper-deep`) | ink (`--color-neutral-950`) | blue (`--color-brandeis-500`) |
|---|---|---|---|---|
| `--tag-mark-ink` | `--color-neutral-700` · **7.27:1** on its own ground | `--color-neutral-700` · **6.11:1** on its own ground | `--color-neutral-400` · **5.55:1** on its own ground | `--color-brandeis-100` · **8.01:1** on its own ground |
| `--tag-mark-bg` | `--color-paper-deep` · n/a — decoration (1.12:1 vs the section ground) | `--color-neutral-200` · n/a — decoration (1.19:1) | `--color-neutral-800` · n/a — decoration (1.45:1) | `--color-brandeis-700` · n/a — decoration (1.63:1) |
| `--tag-filter-ink` | `--color-neutral-700` · **8.14:1** on ground | `--color-neutral-700` · **7.27:1** on ground | `--color-neutral-200` · **12.83:1** on ground | `--color-brandeis-100` · **4.91:1** on ground |
| `--tag-filter-ink-hover` | `--color-brandeis-600` · **7.53:1** on ground | `--color-brandeis-600` · **6.72:1** on ground | `--color-brandeis-200` · **10.48:1** on ground | `--color-white` · **6.23:1** on ground |
| `--tag-filter-ink-pressed` | `--color-paper` · **17.10:1** on the held fill | `--color-paper` · **17.10:1** on the held fill | `--color-neutral-950` · **17.10:1** on the held fill | `--color-brandeis-700` · **10.16:1** on the held fill |
| `--tag-filter-edge` | `--color-neutral-600` · n/a — decoration (4.92:1 non-text) | `--color-neutral-700` · n/a — decoration (7.27:1) | `--color-neutral-500` · n/a — decoration (5.41:1) | `--color-brandeis-100` · n/a — decoration (4.91:1) |
| `--tag-filter-edge-hover` | `--color-brandeis-500` · n/a — decoration (6.17:1) | `--color-brandeis-500` · n/a — decoration (5.51:1) | `--color-brandeis-300` · n/a — decoration (7.32:1) | `--color-white` · n/a — decoration (6.23:1) |
| `--tag-filter-edge-pressed` | `--color-neutral-950` · n/a — decoration (17.10:1; equals the fill, one silhouette) | `--color-neutral-950` · n/a — decoration (15.27:1) | `--color-paper` · n/a — decoration (17.10:1) | `--color-white` · n/a — decoration (6.23:1) |
| `--tag-filter-bg-pressed` | `--color-neutral-950` · n/a — decoration (17.10:1 vs the section ground) | `--color-neutral-950` · n/a — decoration (15.27:1) | `--color-paper` · n/a — decoration (17.10:1) | `--color-white` · n/a — decoration (6.23:1) |
| `--tag-ring-color` | `--color-brandeis-500` · **6.17:1** vs its gap | `--color-brandeis-500` · **5.51:1** vs its gap | `--color-brandeis-300` · **7.32:1** vs its gap | `--color-white` · **6.23:1** vs its gap |
| `--tag-ring-gap-color` | `--color-paper` · n/a — decoration (it *is* the gap) | `--color-paper-deep` · n/a — decoration | `--color-neutral-950` · n/a — decoration | `--color-brandeis-500` · n/a — decoration |

Eleven rows × four cells = 44 declarations, none blank, none a delta, none "same as paper". Every text ratio is ≥ 4.5:1; every ring ratio is ≥ 3:1 against the ground it is offset over; every edge at rest is ≥ 3:1, which is the threshold an outline has to clear to be an outline. Nothing here is exempt, because there is no disabled state.

**`--tag-filter-bg-pressed` is the one token that earns a paragraph of its own.** Until 29 Sep 2026 it moved on the blue surface only, where it was forced: the label cannot go darker there (`--color-neutral-950` measures **2.77:1** on `#0048ff`) and the line cannot go lighter than the white it reaches at hover, so pressed and held took a `--color-white` ground under a `--color-brandeis-700` label at 10.16:1. On paper, tint and ink the token was declared as the surface's own ground, so nothing filled. The owner approved carrying blue's model to all four (tracker 2.17): the fill is now the far end of each surface's ramp — `--color-neutral-950` on paper and tint, `--color-paper` on ink — with the label reversed on it at 17.10:1 and the edge set to the fill's own value so the box has one silhouette. The mark is still unmistakable: its ground is a 1.12–1.63:1 change of paper, the held fill a 6.23–17.10:1 reversal — opposite ends of the ramp.

**`--tag-ring-gap-color` is read, not merely declared.** The ring is two outward `box-shadow` layers — a gap layer in `--tag-ring-gap-color` at `--tag-ring-offset`, then the ring itself at `+ --tag-ring-width` — which is how all eight components in this system that ship a focus ring draw one, and it is why the token is a value rather than documentation. An `outline` with a positive `outline-offset` would show the real ground through the gap and leave this token unread; it is not used, because one element has one `outline` and `outline: none` is already spent suppressing the browser's, and because a component whose ring is drawn differently from every other component's is a difference a reader notices and cannot explain.

**The edge's four steps are two steps firmer than `--sec-rule-strong` on every surface, and that is the relationship rather than four separate measurements.** `Section` resolves its firmer hairline to `--color-neutral-400` on paper, `-500` on tint, `-700` on ink and `--color-brandeis-300` on blue; the chip takes `-600`, `-700`, `-500` and `--color-brandeis-100` — toward the ink on the light surfaces, toward the light on the dark ones, which is the same relationship read in both directions. Each moved one step firmer on 29 Sep 2026 (tracker 2.17; was `-500`, `-600`, `-600`, `--color-brandeis-200`) so the rest chip reads as a box rather than a hint. "One step darker" is one step *firmer* on ink and blue, where firmer means lighter: the literally darker step would sink below 3:1 on both. A chip's outline is a box a reader may operate, so it has to sit above the rules that merely divide the page. The token itself is not read (it is not in `vocabulary.md`, section 0 records why); the steps are named directly.

**Paper.** The only ground either row stands on today, and the trap is exactly that. The mark sits on `--color-paper-deep` — the system's own tint, so the ground is warm rather than grey, and at 1.12:1 it is a change of paper rather than a drawn box — with `--color-neutral-700` on it at 7.27:1. The chip is the inverse and paints nothing at rest: one `--color-neutral-600` hairline at **4.92:1** (`-400` measures 2.13:1 and fails the 3:1 outline floor; `-500` cleared it at 3.16:1 but read as a hint), under the same `--color-neutral-700` label at 8.14:1. Hover is the only place blue appears — `--color-brandeis-600` at 7.53:1 on a `--color-brandeis-500` line at 6.17:1 — so the chip says *link* when a reader asks and says nothing before. Pressed and held fill: a `--color-neutral-950` ground under a `--color-paper` label at **17.10:1**, and the held chip carries the `close-circle` glyph in the label's colour.

**Tint.** The mark's ground goes to `--color-neutral-200`, because `--color-paper-deep` on `--color-paper-deep` is 1.00:1 — the tint surface *is* the mark's paper colour, so here the mark borrows the neutral ramp; at 1.19:1 it reads as the same quiet patch it was, label 6.11:1. The chip's hairline is `--color-neutral-700` at **7.27:1**, one step firmer than paper's because the ground is one step down (`-600` measures 4.39:1 here and `-500` fails at 2.82:1). Held is paper's reversal unchanged — `--color-neutral-950` at 15.27:1 against the section, with a `--color-paper` label at 17.10:1 rather than `--color-paper-deep`: the reversed label is the lightest value in the system, not this surface's ground. The blue of hover is as legible here as on paper and is restated rather than re-decided.

**Ink.** Every step runs the other way up, which is why this column cannot be a delta. The chip's rest label lifts to `--color-neutral-200` at 12.83:1 where `--color-neutral-700` would be unreadable, over a `--color-neutral-500` hairline at 5.41:1 — the same relationship the grey line has on paper, inverted. Hover takes the **pale** end of the blue ramp rather than the deep end, `--color-brandeis-200` on a `--color-brandeis-300` line at 10.48:1, because no dark blue lifts off `#1b1b18` at all: `--color-brandeis-950` measures 1.07:1. Pressed and held fill with `--color-paper` under a `--color-neutral-950` label at 17.10:1, because on a dark section **the loud state is the light one**. The mark's ground steps to `--color-neutral-800` rather than `-900`: at 1.45:1 it separates from the section, which a dark ground needs in order to be seen at all.

**Blue.** Every neutral is gone on brand ground, and this is the column where an outline first could not carry the whole ladder. Rest is `--color-brandeis-100` at 4.91:1 — the tightest text cell in the table — on a line of the same `--color-brandeis-100` at 4.91:1 (was `-200` at 3.78:1). Hover takes both to `--color-white`, 6.23:1. And there the ramp runs out: nothing is lighter than white, and no dark ink clears the floor on `#0048ff` (`--color-neutral-950` measures **2.77:1**, `--color-brandeis-950` 2.97:1), so pressed and held fill — a `--color-white` ground under a `--color-brandeis-700` label at 10.16:1. It was forced here first, and it is the model the other three surfaces now follow. The mark takes `--color-brandeis-700` as its ground at 1.63:1 with `--color-brandeis-100` on it at 8.01:1 — the loudest of the four mark grounds, because against `#0048ff` a quiet ground has to work harder to exist.

**Nested surfaces.** Every one of the eleven tokens is declared in full in all four surface blocks, so a `data-surface` on any ancestor resolves the whole set and nothing inherits half of one. The specimen renders the case that caused the 1.13:1 failure — a tint panel inside an ink `Section` — and the marks inside it take the tint column entire. The inert mark is insulated by construction, because its label is measured against its own ground rather than the section's; **the chip is the part that depends on the surface being declared**, since at rest it paints no ground and its label sits directly on whatever is behind it. So the caller obligation stands: **a panel that changes the ground says so with `data-surface`.** Painting a ground from outside is already forbidden by the layout rules; this is the accessibility consequence of breaking that rule.

## 7 · Geometry & spacing

**(a) Distances — gap-scale role names.**

| Distance | Role | Where |
|---|---|---|
| Inline padding | `--gap-tight` | inside the box, both edges. The gap scale names this step "chip padding" itself, which is the answer rather than a coincidence |
| Block padding | **none — `--space-0`** | there is none, and its absence is what makes one geometry possible at 24px. A 13px sans label's line box is 18.85 and a 12px mono label's is 14.4; centred in a 24px minimum, both variants are exactly 24 tall with no padding to reconcile. When a label wraps, the line boxes define the height and the box grows — measured below |
| Mark to mark, along the row | `--gap-text` | **the caller's `colGap`.** Twice the box's own inline padding, so two adjacent marks read as two marks. This is what the inert rows already pass, and it is the one change the filter rows need: today they pass `colGap="tight"`, which puts the same 8px between two boxes as inside each of them, and outlined boxes at that spacing read as one lozenge pair |
| Row to row, inert rows | `--gap-tight` | **the caller's `rowGap`**, unchanged from today. Nothing in an inert row is a target, so the only clearance it owes is optical |
| Row to row, filter rows | `--gap-text` | **the caller's `rowGap`, and it steps up from what ships today.** At a 24px box the row gap is the whole of the touch-target argument: 16 keeps two stacked targets 16px apart where `--gap-tight` would leave 8. Section 9 does the arithmetic. It is still the caller who passes it |

No margins anywhere. The box's padding is its own; every distance outside it belongs to `Cluster`.

**(b) Component sizes — literal px, t-shirt named.**

| Size | Value | Measured against |
|---|---|---|
| `--tag-size-md` | **24px**, applied as the minimum in *both* axes | `--icon-size-24` is 24px — the system's largest glyph box — and that is the right referent: a tag is a glyph-sized object in a row of text, not a control-sized one. `--btn-height-sm` at 32 was the previous referent and it made a taxonomy label the height of a button. In the inline axis the same number does a second job — a one-character filter measures **24.00 × 24.00** in the browser, so the narrowest possible target is a square that meets the 24px floor in both axes without a special case. It **meets** that floor rather than clearing it, which section 9 states as the cost of the number rather than hiding |

That is the only literal pixel value in this spec. Everything else is a token.

**As built, the `:root` block carries eleven names rather than the eight this section lists.** The three extra — `--tag-shadow`, `--tag-transition-duration`, `--tag-transition-easing` — are `button.css`'s shape rather than new decisions: `--shadow-none`, `--duration-fast` and `--easing-standard` routed through the component's own prefix the way `--btn-shadow` and `--btn-transition-*` route them, so the motion values in section 13 are read from one place. Total: 11 colour × 4 surfaces + 11 geometry = **55**.

**Measured boxes** (in the specimen, in a 392px track — the real track a filter group gets at full width: `--sec-container` 1240 less two `--sec-gutter` column gaps, divided by three):

| Case | Measured |
|---|---|
| mark, 3 characters — "Lab" | 38.24 × 24.00 |
| mark, 32 characters — "Product Modernisation Assessment" | 229.88 × 24.00 — one line |
| filter, 8 characters — "Podcasts" | 80.28 × 24.00 |
| filter, 8 characters, **held, with its glyph** | 101.28 × 24.00 — 21px wider (99.28 and 19px before the 29 Sep glyph floor), all of it inline |
| filter, 1 character — the narrowest target | 24.00 × 24.00 |
| filter, 31 characters — "AI Products and Developer Tools" | 267.96 × 24.00 — one line |
| mark holding a 49-character URL, in a narrow track | **one line, 24.00 tall, clipped at the box's inline end.** It does not wrap and it does not push the row past the content column |
| filter, 31 characters, in a narrow track | one line, 24.00 tall, clipped. Its natural 267.96 exceeds the track, which is the only condition under which anything is ever clipped |

**The narrow-track rows name a condition rather than a width, and that is a correction.** Earlier passes quoted `240.00 × 24.00`, measured in a mockup that no longer exists. The proving ground renders these two cases at **`--lay-track-sm`, 256px** — the system's own compact-card track, and a real number rather than an invented one — where 267.96 still exceeds it by arithmetic and both cases still clip. What is being asserted is not a width: it is that the box is **one line and 24 tall at every width**, and that the only thing a track narrower than the label changes is where the clip falls.

**The held chip is wider than the same chip unselected** by `--tag-glyph-size` plus `--tag-glyph-gap` plus the restored trim — measured at 21px on an 80px box (19px at the old 14px glyph) — which is why a filter row can re-wrap when a selection changes. It re-wraps on a navigation, never under the pointer, because nothing but `selected` puts a glyph there.

**Every box in that table is 24 tall, and that is the point of the nowrap rule.** Height is not merely shared where it is specified — the minimum, the radius, the inline padding — it is shared *everywhere*, because neither variant can ever reach a second line box. Without the rule the two would diverge the moment they wrapped, at 37.69 for a mark and 28.80 for a filter, since `--text-caption` has a 1.45 ratio and `--text-ui-sm` has 1.2. One geometry survives the narrow track only because nothing wraps in it.

**How the label is contained, and what it costs.** `white-space: nowrap` on the box, `max-inline-size: 100%` so a tag can never be wider than the column it sits in, and `overflow: hidden` so the overflow that implies is clipped rather than scrolled. The last two rows above are the only cases that reach it: everything shorter than the track renders whole. **No ellipsis**, for two reasons — `text-overflow` needs a block container, which means the inner span the anatomy does not have; and a reader choosing from a filter label is worse served by a tidy "…" than by a label that visibly runs out of box. The clipped case is a content defect and looks like one. The measured worst realistic label, 31 mono characters at 267.96, fits the 311px column a 375px phone gives it and the 392px track a filter group gets, so nothing on the site clips today.

**(c) Optical corrections reaching the space ramp. Count: 2.**

`--tag-label-trim: var(--space-1)`, removed from the filter's inline-end padding, and only when no glyph follows the label.

> optical, not `--gap-tight`: this corrects the trailing letter-space `--text-ui-sm-tracking` adds after the label's last capital — 0.08em at 12px, measured at 0.96px — against the mark's own inline padding on the leading edge, so the day the gap scale is re-tuned this must not move.

It is the same correction `--btn-label-margin` makes for the same reason on a mono control label, and it applies to the filter variant only: `--text-caption` has no tracking companion, so the mark has nothing to trim. On a held chip the padding is restored in full, because the trailing element is then the glyph rather than a tracked capital and there is no letter-space to take back.

`--tag-glyph-gap: var(--space-4)`, between the label and the glyph on a held chip.

> optical, not `--gap-inline`: `--gap-tight` is the gap scale's own answer to "icon to label", and this declines it, so it is not a scale step chosen by what it separates — it is a correction for a 14px glyph beside a 12px label in a 24px box, where the scale's answer exceeds the label's cap height. `--btn-gap` is 4px for this exact relationship and carries this exact justification; taking `--gap-inline` instead would have been the same value wearing a name that claims a system-wide relationship it does not have.

**Radius, border, shadow, z.**

| | Value | Why |
|---|---|---|
| `--tag-radius` | `--radius-4` | A corner treatment, not an identity. 4 is this system's small-object radius (`--prose-code-radius`, `--nav-card-image-radius`); 8 is its control radius (`--btn-radius`, `--inp-radius`, `--nav-item-radius`); 999 is the footer's one distinguished pill. A mark is a small object, and taking the control radius would have put the tag box inside the button's silhouette at the exact moment section 5 is arguing it is not a button |
| `--tag-edge-width` | `--border-width-hairline` | One line, the filter variant only, all four surfaces, **and it never steps.** `--crumb-link-rule-width-pressed` and `--inp-invalid-rule-width` are precedents for stepping a rule to 2 to mean something, and this component declines both: the reversal already carries the held state, and a width step is geometry moving inside a row that wraps |
| `--tag-glyph-size` | `--icon-size-16` (was `--icon-size-14`; see the 29 Sep amendment) | The smallest glyph the system has, and the only one that fits: at a 24px box a 16px glyph leaves 4px of clearance and reads as an icon with a label bolted on. 14 against a 12px label's 8.5px cap height is the same relationship `--btn-icon-size-sm` has to a small button's label |
| Shadow | `--shadow-none` — **no elevation shadow**, which is not the same as no `box-shadow` | Nothing here is raised off the page. `box-shadow` is nevertheless the drawing mechanism for two flat things, because it is the only property that composes: the `edge` is one **inset** layer and the ring is two **outward** layers, and on `:focus-visible` a chip declares all three in one declaration. The edge is inward rather than a border box for one reason — an outlined chip and a filled mark are then the same box at the same size, and the label sits in the same place in both. A border would put the chip's text 1px in from the mark's, which at 24px is visible in a row that mixes them. `outline` is spent on nothing: `outline: none` is set on `:focus`, as everywhere else in this system. **As built**, `Tag.module.css` composes the three layers in `.filter:focus-visible` and again in `.selected:focus-visible`, copying `Button.module.css:411` |
| Z-layer | `--z-base` | Nothing overlaps. The ring is offset outward and clears its neighbours (section 9) |

## 8 · Typography

| Part | Role | Tracking companion | Case |
|---|---|---|---|
| `tag` label — `mark` | `--text-caption` (13px sans, 1.45) | **none — this role has no tracking companion** | verbatim, `children` as authored |
| `tag` label — `filter` | `--text-ui-sm` (12px mono semibold, 1.2) | `--text-ui-sm-tracking` | `--text-mono-case`, written beside the `font:` |

**No measure, on either variant, and no second line either.** A measure caps running text at a comfortable line length; a tag holds a phrase between 3 and 32 characters that must be read as a unit, on one line. `white-space: nowrap` on both variants, for the reason no `Button` wraps: a small boxed object that reaches a second line stops reading as one item in a row of siblings and starts reading as a paragraph in a border. It is also what holds the two variants to one height — section 7 does that arithmetic. The containment backstop for a label that cannot fit its column is a clip, never an ellipsis and never a wrap.

**Case is the stylesheet's, on both variants.** The prop, the Strapi `listText` field, the `InsightTaxonomy.name` and the accessible name all keep the capitalisation somebody authored: "Product Modernisation Assessment", never `PRODUCT MODERNISATION ASSESSMENT` in the data. The filter's uppercase is `text-transform: var(--text-mono-case)` beside its `font:` — one token, so the whole decision reverses in one declaration.

**Why the inert mark is sans, and it is the load-bearing decision in this spec.** Free text arrives as `listText` with no constraint of any kind. The honest proxy is the site's own 65 authored navigation labels: median 12 characters, mean 14, max 32, with 14 of 65 over 20 — "Content and Knowledge Platforms" (31), "AI Products and Developer Tools" (31), "Audits and starting points" (26). The vocabulary's rule decides it: **a label that must stay sentence case is not a mono label.** Set "Product Modernisation Assessment" in mono uppercase at 0.08em and it is neither a label nor a phrase — it is 40 tracked capitals in a row that has to survive beside a 3-character sibling. So the inert mark is sans, and the filter — a short, controlled, authored-once vocabulary — is exactly the label voice and takes it.

**And the hero collision is the second reason.** `PageHero` stacks a mono uppercase eyebrow at `--hero-eyebrow-tracking` 0.12em, an `h1`, one to six paragraphs of lede, an optional byline, and then the tag row. A mono uppercase row eight lines under a mono uppercase eyebrow reads as a second eyebrow that has slipped down the page — two mono bands in one band, distinguished only by size. Sans breaks that flatly: at 13px sans in the author's case, the row reads as metadata about the page, which is what it is.

## 9 · Responsive

**What changes at 1023 and at 767: nothing.** No size step, no type change, no display change, no arrangement swap.

**What must not change.** The gap scale does not shift responsively: the gaps a row passes at 1440 are the gaps it passes at 375 — `colGap="text" rowGap="tight"` on an inert row, `colGap="text" rowGap="text"` on a filter row. Neither type role re-declares itself at a breakpoint — the title roles already do that and a 12px label has nothing to gain from it. The row's wrap is `Cluster`'s existing behaviour and needs no media query at all: at 767 the content column is 703px (767 less two `--sec-gutter` gutters) and the row simply takes another line, which is what section 12 row 8 shows.

**The touch target is 24 × 24 — the AA floor exactly — and the spacing around it is what does the rest of the work.** 24 × 24 is the floor (SC 2.5.8, AA); 44 × 44 is SC 2.5.5, AAA. The box is `--tag-size-md`, and the measured narrowest case is **24.00 × 24.00** (a one-character label), so SC 2.5.8 is met by size in both axes rather than by the spacing exception, and no hit-area extension of any kind is specified.

**The cost of that number is stated rather than hidden.** A floor is something to clear, and this meets it without margin: the owner chose 24 so that a taxonomy mark reads as a mark in a row of text rather than as a control, and the previous draft's 32 — `--btn-height-sm`, cleared the floor by 8 — is what that decision replaced. Two things pay for it. First, **the filter rows step their row gap up to `--gap-text`**, so every target on the one page that is tapped has 16px of clear space above, below and beside it instead of 8; that is a caller-side change and section 7(a) records it as one. Second, the inert rows keep `rowGap="tight"`, which costs nothing at all, because nothing in them is a target. **Q3 asked whether a thumb would overturn the number and the owner has closed it: 24 is the size.** The row gap does the rest of the work and no hit-area extension is specified.

**Why 44 is unavailable, by mechanism.** Both means the system offers fail here.

1. **`extendHitArea` extends the block axis only, and a tag row wraps.** `.hit::after` is `left: 0; right: 0; height: 44px` centred on the box, and its own documentation scopes it to "a toolbar, a dense table row" — single-row contexts with nothing above or below to collide with. Do the arithmetic on a wrapping row: a 24px box extended to 44 grows **10px above and 10px below**. At `rowGap="text"` (16) two vertically adjacent rows leave 16 − 20 = **−4px: the targets overlap by 4px**, and at `rowGap="tight"` they overlap by 12. A tap in that seam lands on whichever element wins the stacking order and the reader cannot see why, which is worse than a smaller target. Clearing it would need `--gap-block` (24) between rows — and **the row gap is the caller's prop, not the component's.** A component cannot own the distance that makes its own extended hit area safe, so it must not extend.
2. **Stepping the box to 44** makes the mark taller than `--btn-height-md` (40) — a tag larger than the site's default button — which loses the third hard constraint outright and, with the shared geometry, drags the inert mark up with it: eight 44px boxes at the bottom of every hero.

**So spacing is the mechanism, and here is the proof no two targets intersect.** Box: 24 × ≥24, measured. On a filter row both gaps are `--gap-text` → **16px** between neighbours along the row and 16px between rows. Both are positive, so no two target boxes touch, let alone intersect; the 24px-circle test in SC 2.5.8's spacing exception is not needed, because every target is 24 in both axes and the exception only applies below that. The focus ring is the one thing that reaches outside the box: `--tag-ring-offset` (2) + `--tag-ring-width` (2) = **4px**, against 16px of gap on both axes, so a focused chip's ring clears its neighbours with 12px to spare either way. That clearance is also the floor on the row gap: `rowGap="inline"` (4) would put the ring on the neighbouring box, and `rowGap="tight"` (8) would leave a 24px target 8px from the next one — legal, and the reason the filter rows do not use it. The specimen renders the 16px case with a focused chip in it so the clearance can be seen rather than trusted.

## 10 · Composition

```jsx
// The inert row — PageHero's children slot, one per page, ten route modules
<PageHero title={title} body={body} eyebrow={eyebrow} actions={actions}>
  <Cluster as="ul" colGap="text" rowGap="tight">
    {tags.map((tag) => (
      <li key={tag}>
        <Tag>{tag}</Tag>
      </li>
    ))}
  </Cluster>
</PageHero>

// The interactive row — src/app/insights/page.tsx, one Cluster per filter group
<Layout columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="gutter">
  {groups.map((group) => (
    <Layout key={group.id} rowGap="text">
      <h3>{group.label}</h3>
      <Cluster as="ul" colGap="text" rowGap="text">
        {group.options.map((option) => (
          <li key={option.slug}>
            <Tag variant="filter" href={hrefFor(group, option)} selected={option.slug === group.current}>
              {option.name}
            </Tag>
          </li>
        ))}
      </Cluster>
    </Layout>
  ))}
</Layout>
```

`Cluster` provides the row, the wrap and both gaps — `colGap="text"` along the row on both, `rowGap="tight"` down an inert row and `rowGap="text"` down a filter row, for the target reason in section 9. `Layout` provides the filter columns and each group's own stack (`rowGap="text"`, no `colGap` because there is no column seam). **The filter columns are `columns={{ base: 1, md: 2, lg: 3 }}` and stay that way** — that is what `insights/page.tsx:198` passes today, and it is the page's decision, not this component's. A flat `columns={3}` would put three filter groups side by side on a phone. The `h3` is a bare heading styled by base rules; there is no `Heading` component and this spec does not invent one. **There is no `"All"` chip** — "all" is the absence of a filter, not a filter, and a group with nothing selected already says so by having no held chip in it. Clearing a group is the held chip's `close-circle` glyph, whose `href` removes that group's parameter. The group label and the `href` arithmetic are the page's business either way.

**The one arrangement inside the component** is a `flex` centring the label in its own box (block-level and `fit-content` wide, so an `li` wrapping it makes no line box) — one box, one label span (trimmed to cap height and baseline, so the capitals are what the box centres), optionally one glyph. That is not arrangement and it is allowed. Anything that arranges two marks is `Cluster`'s job.

**Restated.** No hand-rolled grid or flex for arrangement. No margins on any child, anywhere — the box's padding is internal, every outside distance is `Cluster`'s. No overriding `Section` from outside: no horizontal padding, no `max-width`, no background and no colour applied to or around the `Section` or the `Cluster` that holds a row.

## 11 · Accessibility

**Semantics and elements.** The mark is a `<span>` — a styled text node, announced as text. The filter is a native `<a href>` — a link, because it navigates. Neither emits its own `<li>`, and neither requires one: `Cluster as="ul"` supplies it at all eleven call sites today, and the same mark works in a `<dd>`, in a hero, and eventually inside a card. No `role` is ever set: the element supplies it.

**Keyboard**

| Key | Filter | Mark |
|---|---|---|
| `Tab` / `Shift+Tab` | moves to and from the chip, in DOM order | not in the tab order at all — nothing is focusable |
| `Enter` | follows the link (the browser's own behaviour) | — |
| `Space` | **deliberately unbound.** An anchor is not a button; binding Space would make one chip behave unlike every other link on the site | — |
| `←` `→` `↑` `↓` | **deliberately unbound.** A filter row is a list of links, not a composite widget: there is no roving `tabindex`, no `aria-activedescendant` and no owner to manage them. Arrow keys stay the browser's | — |
| `Escape`, `Home`, `End` | **deliberately unbound.** Nothing opens and nothing is a range | — |

**Focus order and focus after a state change.** Focus order is DOM order: within a group, each option in source order; across groups, the `Layout`'s. Selecting a filter is a navigation — the URL's query string changes and the route re-renders — so focus goes wherever the app router leaves it, exactly as it does today with the ghost Button. That is a page-level concern and Q8 files it; the component's contribution is to be an ordinary anchor, so nothing the browser would otherwise do is intercepted.

**ARIA, per state**

| Attribute | Value | rest | hover | pressed | held |
|---|---|---|---|---|---|
| `aria-current` | `"true"` | absent | absent | absent | **`"true"`** |
| `aria-pressed` | never set — this is a link, not a toggle; `aria-pressed` on an anchor is a role contradiction | — | — | — | — |
| `role` | never set — the element supplies it | — | — | — | — |
| `aria-label`, `aria-labelledby`, `aria-describedby` | never set. The visible label is the accessible name | — | — | — | — |
| `aria-disabled`, `aria-busy`, `aria-expanded`, `aria-controls`, `aria-haspopup` | never set — no such state exists (section 5) | — | — | — | — |

**Where ids come from: nowhere.** `Tag` emits no `id` and takes no idref, so there is no dangling-reference case to answer — `aria-current` is a token value, not a pointer. The one association the page owes is between a filter group's `h3` and its list; that is the page's `aria-labelledby` to make, on an element the page renders, and this component neither supplies nor requires it. **And the inert row gets no `aria-label`, which is the answer to Q9 rather than an oversight.** An earlier pass recommended `aria-label="Filed under"` on the `Cluster as="ul"` at all ten call sites. The owner's rule rules it out: *the experience for a screen user and a screen-reader user must be the same.* A sighted reader gets no label on that row — they read it as page metadata from its position under the lede and from its treatment. An `aria-label` would hand a screen-reader user a name nobody else can see, which is a different experience, not a better one; it is the invisible-label anti-pattern one level up from the `aria-label` section 3 already forbids on the component. An unlabelled `ul` is not a defect — no success criterion asks a list for a name — and both audiences get the same ambiguity, resolved the same way, by DOM order.

**The held chip's glyph label is the same rule, not an exception to it.** `<Icon name="close-circle" label="Clear filter" />` names a thing that is *drawn*: a sighted reader sees the ✕ and knows the chip clears; a screen-reader user hears "Clear filter" and knows the same. One experience, described twice. That is exactly why Q2 keeps the label and Q9 refuses one — the test is not "does it help", it is "does everyone get it".

If the row should be labelled, the label is **visible**, in `PageHero`, above the row, where both audiences read it. That is a hero design decision and not this component's; nothing here blocks it.

**The focus ring** appears on `:focus-visible` only, never on `:focus`, so a pointer press never draws it. It is `--tag-ring-color` at `--tag-ring-width`, offset `--tag-ring-offset` outward over `--tag-ring-gap-color`, drawn as two outward `box-shadow` layers composed with the edge's inset layer in one declaration, and it measures 6.17, 5.51, 7.32 and 6.23:1 against its gap on paper, tint, ink and blue — every one above the 3:1 floor. On a held chip the gap layer sits between the fill and the ring, so the ring never touches the fill: the gap separates from the fill at 17.10, 15.27, 17.10 and 6.23:1, and no ring token moved when the held chip began to fill. Focus also shows what hover shows, per the fixed model, so a keyboard user gets the fill and the firmer edge as well as the ring.

**Contrast floors, restated.** Label text at 13px and 12px is small text: 4.5:1, met at **4.91:1** in the tightest cell (the chip's rest label on blue) and 5.55:1 or better in the other fifteen text cells. The ring: 3:1 against its own gap, met four times over. Every edge at rest also clears 3:1 — 4.92, 7.27, 5.41 and 4.91:1 — which matters because at rest the outline is the only thing that says a box is there. The glyph is a meaningful non-text element and inherits `currentColor` from the label, so on the held fill it carries the label's measured ratio by construction: 17.10:1 on paper, tint and ink, 10.16:1 on blue. Nothing is exempt, because there is no disabled state.

**Reduced motion.** `prefers-reduced-motion: reduce` sets the filter's transition duration to `--duration-instant`. Every state still renders — colour and edge arrive at once instead of over 140ms — because the states are paint, not movement.

**What a screen reader says.** The inert row, VoiceOver on the hero: *"list, 8 items. Design systems. 1 of 8."* — then each mark as its own item, in the case the author typed. A filter at rest: *"Podcasts, link."* The selected filter, whose glyph is passed as `<Icon name="close-circle" label="Clear filter" />`: *"Podcasts Clear filter, current, link."* The `label` is what makes the clear action reachable without sight — the glyph is meaningful, not decorative, and `aria-current` alone would say which chip is held while saying nothing about what tapping it now does. Nothing announces the box, the edge or the fill, which is correct: they are how a sighted reader is told what the announcement already carried.

**The held chip's accessible name is "Podcasts Clear filter", and that is the correct name rather than a compromise.** Its `href` clears the group, so a name of "Podcasts" alone would be a link that says one thing and does the opposite — the taxonomy term is *what the chip is about*, not where it goes, and the glyph's `<title>` is what supplies the missing half. It satisfies SC 2.5.3 Label in Name by construction, because the visible string is the first token of the accessible name; the rule this component states twice — the visible label is the accessible name — is intact, since the glyph is visible too and contributes its own. What is still forbidden is the thing that would break it: an `aria-label` on the chip, which would *replace* the taxonomy term rather than extend it. This is the one place the composed name is longer than the text node, and it is composed from two visible parts (Q2, answered).

## 12 · Content edge cases

| # | Case | Required handling |
|---|---|---|
| 1 | **Longest realistic string** — 32 characters, and unbounded in principle | **One line, always. No wrap, no ellipsis, no line clamp, and no truncation of anything that fits.** Measured: 229.88 × 24 as a mark, 267.96 × 24 as a filter — one line in the 392px track a filter group gets and one line in the 311px column a 375px phone gives it, so no real label on the site meets the backstop. A tag never wraps for the reason a `Button` never wraps: a small boxed object on a second line reads as a paragraph in a border rather than as one of a row of siblings, and it breaks the one geometry the two variants share (section 7) |
| 2 | **One long unbroken token** (a URL) | **Clipped at the box's inline end, not wrapped and not scrolled**: `max-inline-size: 100%` caps the box at its column and `overflow: hidden` takes the remainder. One line and 24.00 tall in any track; the proving ground renders it at `--lay-track-sm`, 256px. A mark is authored free text and a pasted URL is a plausible accident; it must look wrong *inside* the box rather than push the row past the content column or open a horizontal scroll (SC 1.4.10). No ellipsis: a tidy "…" would make a content defect look intentional. **Boundary found at build, and it is not a defect in this component:** the containment holds wherever the box's containing block has a definite width — a grid track, a `dd`, a block container, which is what every measurement above was taken in. Inside `Cluster as="ul"` the `li` is the flex item, and an `li` at the default `min-width: auto` takes its minimum from the nowrap text inside it, so a tag wider than the whole line pushes the row instead of clipping. Only a pasted URL reaches it. The fix is `min-inline-size: 0` on the flex item, which belongs to `Cluster` and is filed as Q13 |
| 3 | **Zero items** | The **caller** renders no `Cluster` at all — not an empty one, so no seam and no stray gap. Every inert row is optional per record. `Tag` itself has no zero case: it is one mark |
| 4 | **One item** | Renders one mark. No "and" logic, no minimum count, nothing in the component knows how many siblings it has |
| 5 | **Many items — 16, twice the expected ceiling** | **The row** wraps to as many lines as it needs at whichever `rowGap` the caller passed — that is `Cluster`'s wrap, and it is the only wrapping in this component; nothing collapses, no "+3 more". Each tag stays one line inside it. The specimen renders 16 including the longest string, at full width. At 24px a wrapped inert row is measurably tighter than the previous draft's — four lines of marks is 96px of band plus gaps, not 128 |
| 6 | **Missing optional slot** | `icon` is the one optional slot and its empty case is the ordinary one: every chip but the held one passes no glyph, and a chip without one renders exactly its label plus the `--tag-label-trim` correction that applies only then. No reserved space, no placeholder box, no layout shift for the chips that never get one |
| 7 | **Empty required-ish text** — `children` is `''` or whitespace | **Render nothing and warn in development**, matching `BlockCard`'s handling of a whitespace title. The alternative is what the specimen prints beside the note: a 24 × 24 empty box, and for the filter a focusable control with no accessible name. Returning `null` is the only handling that cannot ship a nameless target |
| 8 | **The narrow track at 767** | Nothing changes (section 9). The content column is 703px and the *row* takes another line; no tag does. On a 375px phone the column is 311px, and both extremes still fit one line in it — the 32-character mark at 229.88 and the 31-character filter at 267.96 — so the clip is unreached at every real width. A phone is also where the 24px target is thinnest, which is why the filter rows pass `rowGap="text"` |
| 9 | **A parent that does not size it** — a wrapping `Cluster`, not a grid track | **The minimum is `--tag-size-md` in both axes and the maximum is the column**, so a mark is never narrower than 24 × 24 and never wider than what holds it. Measured on a one-character filter: 24.00 × 24.00. There is no block padding to absorb and nothing wraps, so the minimum *is* the height in every case — 24, at every width, for both variants |
| 10 | **Logical properties rather than left/right** | Everything is logical: `padding-inline`, `padding-block`, `min-inline-size`, `min-block-size`, and the inward edge is a ring on all four sides rather than a directional border. The one directional value is `--tag-label-trim` on the inline-**end** edge, which is correct in RTL by construction — it trims the tracking after the label's last letter, whichever edge that is |
| 11 | **This surface nested inside a different one** | Correct with no change at the call site: all eleven colour tokens are declared in all four surface blocks (section 6), so the nearest `data-surface` ancestor resolves the whole set. The caller obligation is the one in section 6 — a panel that changes the ground declares `data-surface`, because the mark's ink is measured against the nearest declared surface |
| 12 | **Two of this component adjacent** | `Cluster` owns the gap on both axes and neither mark contributes a margin, so two adjacent marks are exactly `--gap-text` apart with no collapsing and no double gap. Two *variants* adjacent is the case that matters more and the specimen renders it: a mark beside a filter is legible as two different things by hue and voice alone |
| 13 | **Interactive content inside a slot** | Two slots, two answers. `children` is `string`, so a link, a button or a tooltip trigger inside a label fails at compile time. `icon` is a `ReactNode` and cannot be typed that tightly, so the rule is stated and tested instead: **the glyph is presentational markup only** — an `Icon`, nothing focusable, no `href`, no `onClick`, no `tabindex`. A control inside a chip would be a nested interactive; a control inside an inert mark would be an unannounced one. *Testable: grep every `icon={` passed to a `Tag` for `href`, `onClick` or `tabIndex`; zero hits* |

## 13 · Motion

| Property | Duration | Easing | Where |
|---|---|---|---|
| `color` | `--duration-fast` | `--easing-standard` | filter only: rest ↔ hover ↔ pressed |
| `background-color` | `--duration-fast` | `--easing-standard` | filter only — the pressed and held fill, on every surface. A press itself is `--duration-instant`; the ease applies on release |
| the edge's colour | `--duration-fast` | `--easing-standard` | filter only, on the same 140ms as the other two, so the box never looks half-changed |
| all three, on `:active` | `--duration-instant` | — | a press is immediate; easing a press makes a control feel unresponsive |

**What does not move.** No transform, no scale, no rotation, no translation. No fade and no opacity of any kind. No height, width or padding animation. **No geometry moves in any state at all** — the edge holds one width, the box holds one minimum, and the glyph does not animate in: it arrives with the render that selected the chip, which is a navigation. There is no rule to wipe: the one motion precedent in the system is `Button`'s link underline going `scaleX(0)` → `scaleX(1)`, and it exists because a drawn underline can otherwise only appear all at once. This component draws no underline, so it does not get that precedent, and it does not ask for a second one.

**The inert variant transitions nothing at all**, because it has no state to transition to. That absence is the assertion.

**Reduced motion.** `prefers-reduced-motion: reduce` → every duration above becomes `--duration-instant`. Nothing is lost: each state's full appearance still renders.

## 14 · Do's and Don'ts

**Do**

1. Pass the row's gaps at the call site: `Cluster as="ul" colGap="text" rowGap="tight"`. *Testable: grep for `<Tag` and check the enclosing `Cluster`'s props in the diff.*
2. Wrap every mark in the `li` the `Cluster as="ul"` expects. *Testable: the rendered DOM has no `span` or `a` as a direct child of the `ul`.*
3. Pass `variant="filter"` with an `href` and let `selected` say which one is held. *Testable: no `variant="filter"` appears without an `href` — and it cannot, it is a compile error.*
4. Keep the string in the case somebody authored it. *Testable: grep the repo for an all-caps string literal passed to `Tag`; there must be none.*
5. Concatenate `categories` and `tags` into one row, as `case-studies/[slug]/page.tsx:248` already does. *Testable: one `Cluster` per hero, in the diff.*
6. Pass `<Icon name="close-circle" label="Clear filter" />` as `icon` on the held chip, beside an `href` that clears that group's parameter. *Testable: on `/insights`, the held chip's `href` is the only one in its row that removes a parameter rather than setting one.*

**Don't**

7. Don't pass a `tags` array to anything. *Testable: grep for `tags={` on a `Tag`; there is no such prop and the type rejects it.*
8. Don't reach for `extendHitArea`, a `min-height` override or a wrapper that inflates the box to 44. *Testable: `tag.css` and `Tag.module.css` contain no `--btn-hit-min` and no `44`, and no call site passes `extendHitArea` to a `Tag` (the prop does not exist on it, so tsc fails first). A `Button` beside a `Tag` may still extend its own hit area — the specimen's comparison tile does exactly that.*
9. Don't put a `Tag` inside `BlockCard`'s `eyebrow` or anywhere in a card. Card metadata is out of scope and stays the joined string it is today. *Testable: grep for `<Tag` inside `BlockCard` props; none.*
10. Don't add a hover, a focus or a cursor to the inert variant. *Testable: grep `tag.css` for `--tag-mark-*-hover`; the token must not exist.*
11. Don't give the chip a ground in any state except the blue surface's pressed value, and don't paint a brand-500 ground on anything. *Testable: `tag.css` declares no `--tag-filter-bg` and no `--tag-filter-bg-hover`; `--tag-filter-bg-pressed` resolves to the surface's own ground on paper, tint and ink; `--color-brandeis-500` never appears as a background value.*
12. Don't step the edge width, the box height or the padding in any state. *Testable: grep `tag.css` for `--border-width-2`; zero hits.*
13. Don't put blue on a chip at rest. *Testable: in `tag.css`, no `--color-brandeis-*` appears in a `--tag-filter-ink` or `--tag-filter-edge` declaration without a `-hover` or `-pressed` suffix — except on the blue surface, where the ground is brand and every value is a blue.*
14. Don't repaint the held chip on hover or focus, and don't add a `-selected` colour token. *Testable: grep `tag.css` for `-selected`; the only hit is the class that selects the `-pressed` values.*
15. Don't pass a glyph to a chip that is not held, or a `check-circle` where `close-circle` is specified. *Testable: in the diff, `icon=` appears only on the same element as `selected`.*
16. Don't set a margin on a `Tag`, ever. *Testable: grep `margin` in `tag.css`; zero hits.*
17. Don't let a `Tag` set a colour, a padding, a radius or a width from the call site. *Testable: there is no `className` or `style` prop to do it with.*

## 15 · Specimen plan

**The deliverable is the route: `src/app/design/tag/page.tsx`, registered by hand in `SPECIMENS`.** One band per block, `Section` per band, and it is built as part of the component rather than after it — nothing gets a page route before it has a `design/` route.

The browser mockup this plan was measured in was a design-side instrument, not a specimen: it ran against Claude Design's bundle rather than this repo, it has done its job — every number in sections 6, 7, 9 and 12 came out of it — and it is not kept. **This table is the whole brief for `/design/tag`**, and it is written to be built from without it.

| # | Band | Contents |
|---|---|---|
| 1 | **The two variants, side by side** | Two marks and two filters (one held, carrying its `close-circle` glyph) with the two static axes named underneath — enclosure and voice — and the measured 1.12:1 ground against the 4.92:1 outline, plus the note that blue is what arrives under the pointer |
| 2 | **The page that decides it** | `/insights` in miniature on tint: three `Layout` columns, each an `h3` group label over a `Cluster as="ul"` of filters — no `"All"` chip, one group holding a selection and one holding none, so the empty-group case is on the page beside the held one — and below the rule a three-up of real `BlockCard`s whose eyebrows carry the same taxonomy as joined strings. The band exists to be squinted at |
| 3 | **The hero** | A real `PageHero` — eyebrow, `h1`, two paragraphs of lede, two actions — with eight inert marks in its `children` slot, including the 3-character and the 32-character extremes and both 31-character navigation labels. Captioned with the squint-test argument |
| 4–7 | **The four surfaces** | Four sibling `Section`s — paper, tint, ink, blue — each rendering the same `Matrix` component, **byte-identical markup**: a row of three marks, then the filter states that **have props** — rest and held, the held ones carrying the `close-circle` glyph — plus the narrowest chip. Hover, pressed and focus are not printed, because they have no props and the closing paragraph below says why; the band names them instead and asks for them to be exercised by hand on that ground. Each band carries its own per-surface paragraph from section 6 |
| 8 | **The nested case** | An ink `Section` containing `<Section as="div" surface="tint" density="tight">` with the whole `Matrix` inside it |
| 9 | **Section 12, every row** | Ten labelled tiles: longest string both variants · unbroken URL · zero items (with the note that no `ul` renders) · one item · 16 items · the empty string, captioned as the failure it is · the narrow track at `--lay-track-sm`, holding the two cases that reach the clip, rendered TWICE — once in a `Layout` where the box clips and once in a `Cluster` where the `li` pushes the row instead, so Q13's boundary is on the page rather than described (the `Cluster` rendering scrolls inside its own box, so the pushed row never pushes the page) · two adjacent plus a mark in a `dd` · ring clearance (four filters at `rowGap="tight"` with one focused) · the component beside the `Button emphasis="ghost" size="sm" active extendHitArea` it replaces, so the drop from `--btn-height-sm` 32 to 24 can be seen |
| 10 | **Measured readout** | **Built as a static band, not a live one, and that is a divergence.** The spec asked for section 7(b)'s numbers read out of the DOM on mount; a `useEffect` measuring `getBoundingClientRect` would make the whole specimen a client component for a readout nobody could trust more than a table, since the person reading it cannot check the measuring code either. What ships instead is every box that produces those numbers, rendered on the page at the real tracks, with the six figures printed beside them and the instruction to measure in devtools — so the claim is falsifiable by anyone with the page open, which is what "checked rather than believed" was asking for. If a box disagrees with a number, the spec is wrong and not the code |

**Three states have no prop and cannot be printed by the API.** Hover must be pointed at, pressed must be held, and the tab ring must be tabbed to. The design-side mockup printed them with a `force` prop that existed only in that mockup; it is not in section 3 and **was not implemented**, so `/design/tag` prints rest and held and says on the page that the other three have to be exercised by hand on each of the four surfaces — which is what `design/button/page.tsx` does for the same reason. `selected` is a real prop and is printed both alone and combined with forced focus, because "selected and focused" is the state a keyboard user is in immediately after choosing.

## 16 · New token requests

**None — every value in this spec resolves to an existing primitive or usage token.** The `--tag-*` names are the component layer this document creates — **twenty-two as built**: eleven colour, declared four times each, and eleven geometry and motion (section 7(b) records why that is eleven and not the eight this document first counted). Fifty-five declarations. Each resolves to a token already in `vocabulary.md`: `--color-*` for every colour, `--gap-tight` for the inline padding, `--space-0` for the block padding that is not there, `--radius-4`, `--border-width-hairline`, `--focus-ring-width`, `--focus-ring-offset`, `--icon-size-14` for the glyph, `--space-1` and `--space-4` for the two optical corrections, `--duration-fast` / `--duration-instant` / `--easing-standard` for motion, `--shadow-none` and `--z-base`. `--border-width-2`, `--color-brandeis-50` and `--color-brandeis-400` were in earlier drafts and are now used nowhere. The glyph is `close-circle`, which is in the set of 17. No new colour, no new gap step, no new glyph, no new mechanism. The one literal is `--tag-size-md: 24px`, a component size measured against `--icon-size-24`.

## 17 · Open questions

**All twelve are answered. Every rejected option is kept on the record rather than deleted, because the next pass over this component will re-ask them otherwise.**

1. **`aria-current="true"` on an anchor, or `aria-pressed` on a button?** ✅ **Answered — (a), and it was already precedent.** The chip is an `<a href>` and carries `aria-current="true"` when held. *Options were:* (a) anchor + `aria-current="true"` — the chip navigates, the URL is the state, and `aria-current` is what "this is the one in effect" means; (b) `<button>` + `aria-pressed` — correct for a toggle, but it makes the filter a client-side control and throws away the shareable URL; (c) anchor + `aria-current="page"` — wrong, the page has not changed. This was marked BLOCKING on the belief that the codebase had never answered it. It has: `insights/page.tsx:214` and `:229` already set `aria-current={isActive ? 'true' : undefined}` on the ghost `Button` they render `as="a"`, on both the `"All"` chip and every option. Tag inherits a decision that shipped rather than making one. What is still open is `Button`'s own open question 9 — that `active` is colour-only and announced nowhere *inside the component* — and Tag closes it for itself by owning the attribute instead of leaving it to the call site. **No longer blocking; the Status went to `accepted`, and to `implemented` when the build landed.**

2. **The `close-circle` glyph's accessible name, and the name of the chip that carries it.** ✅ **Answered — (a), with the reasoning now written into section 11.** The glyph is `<Icon name="close-circle" label="Clear filter" />`, so a held chip announces *"Podcasts Clear filter, current, link."* *Options were:* (a) keep the label; (b) no label, leaving the glyph decorative and the announcement *"Podcasts, current, link"* — which is what `aria-current` already said, and which hides the clear affordance from anyone not looking at it; (c) an `aria-label` on the whole chip, which would replace the taxonomy name. The sharper form of the question — a held chip's `href` clears its group, so a link named "Podcasts" navigates to *not* Podcasts — is what settles it for (a): the taxonomy term names what the chip is *about*, the glyph names what it *does*, and both are visible. SC 2.5.3 is met because the visible string is the first token of the composed name. (c) remains forbidden for the reason it always was.

3. **Is 24 the right box on a phone?** ✅ **Answered — (a), 24, closed by the owner.** *Options were:* (a) 24, with `rowGap="text"` on the filter rows buying the clearance; (b) 28 for both, clearing the AA floor by 4 and costing the inert row 4px a line; (c) 24 for the mark and 28 for the chip, which forfeits the one geometry. Section 9 states plainly that 24 *meets* SC 2.5.8 rather than clearing it, and that the row gap is what keeps two targets apart. No hit-area extension, at any breakpoint.

4. **The focus ring's mechanism.** ✅ **Answered — two outward `box-shadow` layers, matching all eight components in this system that ship a ring.** An earlier mockup drew it as `outline` + `outline-offset`, which is arguably the more correct property and would have left `--tag-ring-gap-color` unread. It is not used: one element has one `outline`, `outline: none` is already spent, and a ring drawn differently from every other ring is a difference a reader notices and cannot explain. Recorded so the trade is on the file if the system ever moves to `outline` wholesale — at which point it moves for all nine at once, not for this one.

5. **The glyph gap: `--gap-inline`, or an optical correction?** ✅ **Answered — an optical correction, `--tag-glyph-gap: var(--space-4)`, count 2 in section 7(c).** The gap scale names `tight` (8) as "icon to label" outright, and this declines it; a step is chosen by what it separates, never by how it looks at one width, so declining the scale's own answer means the value is not a step. `--btn-gap` is 4px for this exact relationship and carries this exact justification. Taking `--gap-inline` would have been the same pixel wearing a name that claims a system-wide relationship it does not have.

**Answered in the same pass, and none of them changed a token.**

6. **The variant prop's name.** ✅ **Answered — (a), `variant="mark | filter"`.** *Options were:* (a) the union; (b) a boolean `interactive`; (c) the presence of `href` implying it. A boolean cannot name what the thing *is*, and (c) is the cheapest and the most likely to be misused, since the inert variant must never take an `href` — under (c) that constraint could not be expressed as a type at all. If a second, non-filter interactive case ever appears, that is the moment to rename the union, not to loosen it now.

7. **The mark's ground on the two dark surfaces.** ✅ **Answered — (a), keep them.** `--color-neutral-800` at 1.45:1 on ink and `--color-brandeis-700` at 1.63:1 on blue, against 1.12:1 on paper. *Options were:* (a) keep, so the mark is legible on all four; (b) hold every column near 1.12:1 and let the mark all but disappear on ink; (c) drop the ground on the dark surfaces and give those two columns an edge. A quiet ground has to work harder to be seen the darker the section gets, so the numbers differ because the surfaces do — that is the column doing its job, not drift. (c) would have forked the treatment by surface, which is the one thing a four-column table exists to prevent.

8. **Focus after a filter navigation.** ✅ **Answered — (a), the page restores focus to the chip the reader acted on.** *Options were:* (a) restore to the matching chip; (b) move focus to the results heading; (c) leave it to the router. Dropping `"All"` (Q12) makes (a) simpler than it was when the question was asked: the chip a reader operates is still in the row afterwards, in the same position, having only gained or lost its held paint and its glyph — so there is a real element to return to in both directions. Implemented on `insights/page.tsx`, not here: the component stays an ordinary anchor and intercepts nothing. **Follow-up piece 3.**

9. **An accessible name on the inert row.** ✅ **Answered — no `aria-label`, on the principle that the experience for a screen user and a screen-reader user must be the same.** *Options were:* (a) `aria-label="Filed under"` on the `Cluster as="ul"` at each of the ten call sites — the earlier recommendation, now rejected; (b) a visible label above the row; (c) leave it. (a) hands a screen-reader user a name nobody can see, which is a different experience rather than a better one, and it is the same invisible-label anti-pattern section 3 already forbids on the component itself. (c) gives both audiences the same unlabelled row, resolved the same way by position and DOM order, and no success criterion asks a list for a name. (b) stays available and is the only version of "label the row" that satisfies the principle — it is a `PageHero` design decision, not this component's. Section 11 carries the reasoning, including why the `close-circle` glyph's label is the same rule rather than an exception to it.

10. **`as={Link}` for the filter.** ✅ **Answered — (a), a native anchor.** *Options were:* (a) keep `as="a"`, matching what ships; (b) accept a component through an `as` prop so the app router does a soft navigation. The destination is a query-string change on the same route, so the round trip is cheap; (b) would put a component-shaped prop on a primitive to buy something not yet measured as a problem. Revisit if the filter round trip ever measures badly — it is one prop then, and nothing about the paint or the geometry moves.

11. **Should the blue column exist at all?** ✅ **Answered — (a), keep it, and the reason is forward-looking rather than defensive.** No filter row stands on a blue `Section` today, and blue is the one surface where the outline cannot carry the ladder — the only place this component fills anything, and the fill is forced by the ramp rather than chosen. *(Amended 29 Sep 2026, tracker 2.17: the fill is no longer blue's alone — every surface now fills when held, on this column's model.)* *Options were:* (a) keep the column; (b) declare the interactive variant unsupported on blue, keeping the "never fills" rule absolute; (c) keep it and accept a 4.91:1 rest label with no pressed state, which breaks the fixed model. **Blue is a highly reserved surface colour, and the column is kept against the possibility of branded surfaces** — the day one exists the chip on it is already correct, measured, and does not need this argument had again. (b) would have traded a real completeness guarantee for a rhetorical one.

12. **Does the `"All"` chip survive?** ✅ **Answered — no. `"All"` is not a filter.** *Options were:* (a) keep it; (b) drop it. "All" is the *absence* of a filter, and rendering an absence as a chip in a row of filters — held, carrying `aria-current`, indistinguishable in treatment from a real option — tells a reader that "no constraint" is a constraint they have chosen. A group with nothing selected already says so by having no held chip in it. Three consequences, all recorded where they land: the row is three chips shorter (section 1); **the held chip's `close-circle` glyph becomes the only way to clear a group**, so it is load-bearing rather than merely justified (section 4), which in turn is why Q2's accessible name on it is not optional; and Q8's focus restoration gets easier, because the chip a reader acts on stays in the row either way. Nothing in the component changes — it never knew how many siblings it had. Follow-up piece 2 deletes the chip and its `filterHref(selected, group.id)` branch.

13. **Should a `Cluster` item be allowed to shrink?** Opened by the build, not by the design. A tag never wraps, so its min-content width is its whole label; an `li` inside `Cluster as="ul"` inherits that as its automatic minimum, and a tag wider than the line pushes the row rather than being clipped by its own `max-inline-size` (section 12 row 2). *Options:* (a) `min-inline-size: 0` on `Cluster`'s items, which lets any over-wide child clip or scroll itself instead of widening the row; (b) leave it, since only a pasted URL reaches the case; (c) fix it in `Tag`, which is impossible — the `li` is the caller's element. *Recommendation:* (b) for now and (a) if it is ever seen, because (a) changes the behaviour of every `Cluster` on the site to fix a case no real content produces. **Belongs to `Cluster`, not to this component.** *Non-blocking.*

**Nothing else is open. No BLOCKING question remains, none of the twelve changed a token, and Q13 changes a different component.**

**Scope: what this spec builds, and what it does not.**

The build is the component and its proving ground — `src/components/Tag/`, `tokens/components/tag.css` registered in `tokens/index.css`, and `src/app/design/tag/page.tsx` registered in `SPECIMENS`. **Nothing under `src/app/` outside `design/` changes.**

The call-site migration is a **follow-up**, and it is three separate pieces of work rather than one.

**Piece 1 landed 28 Aug 2026.** All ten inert rows now render `Tag`, verified against live CMS data rather than against a fixture: `/case-studies/ai-native-building-energy-product-connectx` renders four marks (`0 → 1`, `Agentic Systems`, `AI UX`, `Context Architecture`) and `/insights/silent-ui-regression-debt-erodes-adoption-before-it-shows` renders three, each in the author's own capitalisation, each a `<span>` inside the `li` the `Cluster` already supplied. No gap changed and no ARIA changed. The blank-label guard fired **only** on the specimen's two deliberate tiles across four renders and never on a content route, which is what the seam predicts: every mapper runs its strings through a trimming `value()` and drops the empties.

1. ~~**Ten inert rows**~~ — **done** — `services/[...slug]`, `insights/[...slug]`, `insights/events/[slug]`, `insights/podcasts/[slug]`, `glossary/[slug]`, `case-studies/[slug]`, `expertise/[slug]`, `audits/[slug]`, `services/page.tsx`, `how-we-work/page.tsx`. Each is `<li key={t}>{t}</li>` → `<li key={t}><Tag>{t}</Tag></li>`. All ten already pass `colGap="text" rowGap="tight"`, so no gap changes and no ARIA changes — Q9 declines the `aria-label`. These ten are the whole of piece 1.
2. ~~**One filter page**~~ — **done, 28 Aug 2026.** `insights/page.tsx`: every ghost `Button` became a `Tag variant="filter"`; both `Cluster` gaps went `tight` → `text` (section 9's target arithmetic depends on it, and it is a caller-side change); `extendHitArea` is gone; and **the `"All"` chip was deleted** (Q12) along with its standalone `filterHref(selected, group.id)` call — that expression now serves the held chip, which is what makes the `close-circle` glyph the only route back to an unfiltered group.

   The manual `aria-current` at both call sites was removed: `Tag` emits it from `selected`, so the attribute and the paint can no longer drift apart. Verified on live CMS data — ten chips render, no `"All"` survives, and a held chip comes back as
   `<a href="/insights#insights-resources" aria-current="true" class="… selected hasGlyph">SaaS<svg role="img"><title>Clear filter</title>…`
   with the group's key **absent** from its own href, so tapping it clears the filter it represents. Filtering itself still works: 42 resource cards unfiltered, 16 with that group held.
3. **Q8's focus restoration**, on `insights/page.tsx` only — the one piece still outstanding.

Pieces 1 and 2 have landed, so the filter rows now carry 16px between 24px targets rather than the 8px between 32px targets they shipped with. Only (3) remains, and it is a page-level focus concern that this component deliberately does not participate in.

---

## Appendix — self-audit

```
STRUCTURE
[x] All 18 sections present, in order, with the exact headings.
[x] Front matter states a tier (1 primitive), a Status (implemented — no BLOCKING question
    remains, and the paths are in the front matter), and a token prefix (--tag-*) that collided
    with none of the 21 taken prefixes and is now the 22nd.
[x] Every part named in Anatomy appears in the colour table, the geometry list, or both. `label`
    is explicitly marked as carrying no value of its own; `glyph` as inheriting the label's
    currentColor; `selected` as carrying no colour of its own and re-pointing three other parts.

NAMES
[x] Count of distinct token names used: 52 — 33 existing (16 colour, 2 gap, 4 type, 1 radius,
    1 border width, 2 focus ring, 1 icon size, 3 motion, 3 space, shadow, z) and 19 declared
    --tag-* component tokens. Every existing name appears verbatim in vocabulary.md. Checked ONE AT A TIME against
    the document, not by pattern. Tokens named only as citations of other components
    (--btn-height-sm, --btn-radius, --btn-hit-min, --btn-label-margin, --btn-text-tracking,
    --btn-height-md, --inp-radius, --inp-invalid-rule-width, --nav-item-radius,
    --nav-item-text-tracking, --nav-card-image-radius, --prose-code-radius, --foot-badge-radius,
    --foot-social-tracking, --crumb-link-rule-width-pressed, --hero-eyebrow-tracking,
    --sec-container, --sec-gutter, --color-danger-*, --color-success-500) are all in the
    vocabulary too. --sec-rule-strong is NOT, and is named nowhere; the alignment it would have
    described is stated in prose instead (section 0 records this).
[x] One glyph is named — `close-circle` — and it is in the set of 17. It arrives as a ReactNode through
    `icon`, because a primitive may not import Icon. No NEW GLYPH REQUEST needed.
[x] Every prop and prop VALUE given for Section, Layout and Cluster is in the unions:
    Section surface="paper|tint|ink|blue", as="div", density="tight";
    Layout columns={3}, colGap="gutter", rowGap="stack|text";
    Cluster as="ul", colGap="text", rowGap="tight".
[x] Zero hex codes / rgb() / hsl() / colour words outside the contrast measurements. The three
    hexes that appear (#f3f1ea, #1b1b18, #0048ff) are quoted only inside measurement prose in
    section 6, as the three grounds whose luminance forced a decision.
[x] Zero Tailwind class names. Zero CSS declarations, selectors or @media blocks. Property names
    are quoted inline where naming them is the point (padding-inline, text-transform,
    prefers-reduced-motion, .hit::after) — description, not declarations to copy.
[x] Every --text-* role paired with a tracking companion is on the list that has one:
    --text-ui-sm → --text-ui-sm-tracking. --text-caption is explicitly marked "none — this role
    has no tracking companion".
[x] Every layout distance is a gap-scale role name: --gap-tight, --gap-text. The label-to-glyph
    distance is deliberately NOT one -- it declines --gap-tight, the scale's own "icon to label",
    so it is a correction rather than a step and is declared as one.
[x] Every space-ramp reach carries its justification sentence in the required form. Count: 2
    (--tag-label-trim: --space-1; --tag-glyph-gap: --space-4, on --btn-gap's precedent).
[x] Every literal pixel value is a component size, t-shirt named, measured against something
    real. Count: 1 (--tag-size-md: 24px, against --icon-size-24 and the measured 24.00 × 24.00
    one-character chip). The other numbers in sections 7, 9 and 12 are browser measurements and
    arithmetic, labelled as such, and all 38 contrast ratios in section 6 were recomputed from
    primitives.css.

COLOUR AND CONTRAST
[x] One row per token, four columns: paper, tint, ink, blue. Rows: 11 × 4 cells = 44.
[x] No cell is empty, "same as paper", or a delta.
[x] Every text colour is measured against the exact ground or fill it sits on — the surface
    ground for rest, the hover fill for -hover, the pressed fill for -pressed.
[x] Every text ratio ≥ 4.5:1. Lowest: 4.91:1 (--tag-filter-ink at rest on blue). No disabled
    state exists, so nothing is exempt.
[x] The focus ring is measured against its own gap colour on all four: 6.17, 5.51, 7.32, 6.23:1.
[x] Decoration is marked "n/a — decoration" in every decorative cell, with the measured non-text
    number in brackets rather than omitted.
[x] One paragraph per surface says what moved and why, each carrying the measurement that forced
    it (1.00:1 on tint, 1.07:1 on ink). Two further paragraphs carry the tokens that needed one:
    --tag-filter-bg-pressed, and the edge's relationship to --sec-rule-strong.
[x] The nested-surface case is addressed, with the caller obligation it implies.

STATES
[x] Every state claimed comes from the fixed model with the repo's suffix: -hover, -hover + ring,
    -pressed, -pressed for held.
[x] Hover differs from pressed on all four surfaces, and by hue rather than by depth: hover is
    blue in the label and the line, pressed is a reversed fill (29 Sep, tracker 2.17). No token holds the
    same value at hover and pressed on any surface.
[x] Every state token introduced moves on at least one surface. --tag-mark-*-hover,
    --tag-filter-bg (rest), --tag-filter-bg-hover and every -selected colour token were deleted,
    and each absence is stated as an assertion in sections 2 and 5. --tag-filter-bg-pressed moves
    on exactly one surface, which is the rule's threshold; section 6 gives it its own paragraph
    rather than leaving that to be noticed.
[x] Every state token is declared on all four surfaces, including --tag-filter-bg-pressed where it
    equals the surface ground.
[x] No disabled state, so no opacity and no exemption. No colour-only state: the held case adds
    the close glyph, aria-current, and paint that does not answer the pointer.

LAYOUT, TYPE, SEMANTICS
[x] Every arrangement is a Section, Layout or Cluster. colGap is stated where columns is set
    (Layout columns={{base:1,md:2,lg:3}} colGap="gutter" -- the responsive union insights/page.tsx
    already passes) and omitted where it is not (Layout rowGap="text").
[x] No margin anywhere in the spec.
[x] No media query changes a gap step or a type role. Section 9 states that nothing changes at
    1023 or 767.
[x] No part carries running text, and section 8 says so explicitly rather than naming a measure
    that would not apply.
[x] Every interactive target is 24 × 24, measured; no two intersect at colGap="text" (16) and
    rowGap="text" (16); the ring's 4px reach clears both by 12. Section 9 states plainly that 24
    MEETS the AA floor rather than clearing it, names the row-gap step that pays for it, rules out
    44 by mechanism rather than by taste. Q3 recorded the number as the one a real thumb could
    overturn and it has been closed at 24, so no size question remains open.
[x] No ARIA idref is specified — the component emits none and takes none, and section 11 says so.
[x] No selector walks upward, no :has(). The held state is a prop-driven class.

COMPLETENESS
[x] All thirteen content edge-case rows answered.
[x] The "parent that does not size it" row names the minimum (--tag-size-md in both axes,
    measured at 24.00 × 24.00) and the maximum (100% of the column, with the overflow clipped).
[x] Do's and Don'ts are testable: each names the grep, the rendered DOM or the diff that decides
    it.
[x] The specimen plan names src/app/design/tag/page.tsx as the deliverable and the HTML mockup as
    the measuring instrument it already was. It renders both variants (there is one size), all
    four surfaces as sibling bands with identical markup, every printable state plus the three that must be pointed at,
    the nested band, all of section 12, two adjacent, and the narrow track. The held state is
    printed twice — alone and with focus forced — because that pair is what proves the reversal
    survives focus.
[x] Section 16 says None, with the reason.
[x] Every open question has options, a decision and a mark. Twelve questions, numbered without a
    gap, ALL TWELVE ANSWERED and ZERO BLOCKING; every rejected option is kept with the reason it
    lost. Two answers changed the design rather than merely closing: Q9 refuses the inert row's
    aria-label on the principle that both audiences must get the same experience, and Q12 deletes
    the "All" chip, which makes the held chip's close glyph the only route back to an unfiltered
    group. Section 17 closes with the scope split -- the component and its design/ route are the
    build; the eleven call sites are a follow-up in three pieces.
[x] Nothing wraps to a second line, on either variant, at any width -- so both variants are 24
    tall in every measured case and the shared geometry holds everywhere rather than only on one
    line. The clip is a containment backstop no real label reaches (worst case 267.96 in a 311px
    column), never a truncation feature, and there is no ellipsis.
[x] Squint test: the composition reads as more than one idea. The inert row is a soft band of
    tinted sans phrases with no drawn edges at all; the filter rows are grey outlined mono chips
    with one drawn in full ink and carrying a glyph; the hero band sets both against display type,
    lede and two solid buttons. Fill against line against inked line is three shapes, not one
    rectangle repeated, and no element in either row is louder than the heading above it — which
    at 24px is the difference this pass was asked for.
```
