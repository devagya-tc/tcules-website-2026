# CtaSection

> **Amended 6 Oct 2026 (`cmp-cta`, visual-direction § 3.4 K / L, § 1.4, § 7.1) — the kit's offer and
> close.** This note supersedes the body below wherever they differ; the lines it names are amended
> in place.
>
> - **New props.** `media?: { image: MediaImage; side?: 'start' | 'end' }` (`CtaMedia`) on the
>   offer-with-actions member only — `never` on split, open and the offer with a form. `markers?:
>   'number' | 'icon' | 'plain'` (`CtaPointMarker`), paired with the points in one union so
>   `markers="icon"` requires `CtaIconPoint` (`{ label; detail?; icon: IconName }`). `texture?:
>   ReactNode` on split and open (the closes take the `closing` placement, § 6.3), `never` on the
>   offer (§ 4.3: K spends its solid, and its photo fills the band).
> - **The offer, by shape.** With `media`: `[7, 5]` at `section`, copy (H-full, ≤ 3 one-line points,
>   actions) in 667, the photo 4:5 in 477 (4:3 below 1024, after the copy), `sizes` =
>   `MEDIA_SPLIT`; the copy column stretches to the photo and `pinLast` pins the actions to its foot
>   when points sit between (§ 3.2 rule 1), and is centred on it otherwise; `side="start"` is
>   `reverse={{ lg: true }}`. Without media, asking with actions: `[1, 2]`, the lede (lead at
>   body-lg) and actions in 381, the points as ruled rows in 763 (§ 1.4 "K without a photo"). With a
>   form: unchanged, stacked, the points as a 2- and 3-up strip.
> - **§ 7(b) measures.** `split` is `[7, 5]` (was `[3, 2]`): content **667**, form **477**. § 3.4 L
>   draws the close as `[5, 7]` with the form in 667; the full set's one-field rows read as stretched
>   at 667, so the close keeps the form in 5. EnquiryForm no longer carries a measure (cmp-form, 6 Oct
>   2026: `--enq-form-max-inline` 470 is deleted and every variant fills its track), so in 477 the
>   form meets the band's end edge by filling the track. The
>   offer's copy column is 667 beside media, 381 | 763 beside nothing. `open` is unchanged.
> - **§ 8 type.** Every heading is `--text-h2` (§ 7.1: "Close: `--text-h2`"); the
>   `[data-arrangement='offer']` remap is deleted, so § 8's "offer selector" no longer exists and the
>   heading's size and tracking are one `:root` pair. Point labels stay `--text-h5` (approved 30 Sep;
>   at § 7.1's h6 the 18px label sat under the 20px numeral). A ruled point's detail is
>   `--cta-detail-reading-text: var(--text-body)` (§ 7.2: a row's body steps with the track).
>   New tokens: `--cta-detail-reading-text`, `--cta-rule-width`, and `--cta-rule-ink` on all four
>   surfaces (neutral 300 / 400 / 700, brandeis-300 on blue) — six inks per surface, not five.
> - **Points, four shapes.** `stack` (beside a photo or a form), `rows` (ruled, the beside offer's
>   body), `row` (open's 3-up, each point opened by a hairline the width of its track, the text-card
>   top edge of § 3.1) and `grid` (the offer with a form). An `<ol>` only under `markers="number"`;
>   icon and plain points are an offer's contents, a `<ul>`. Glyphs are `xl` (24), `--cta-marker-ink`.
> - **Actions.** The second action is `link` / `primary`, blue at rest (§ 4.2; it was `ghost`), with
>   `block` (24) between the two, PageHero's shape.
> - **§ 12 row 6 holds for falsy slots.** `proof` (split, open) and `form` (offer) are tested with
>   `present()` — `null`, `undefined`, a boolean and `''` are absent — not `!== undefined`, so
>   `proof={false}` no longer reserves a column, a 48 seam and an empty div.
> - **`scheduleHref`, scope of the 29 Sep amendment.** It removed the prop from CtaSection only.
>   EnquiryForm's `enquiry` and `audit` variants require it, and that is the whole of the
>   constraint; the cmp-cta changes do not touch it.

> **Amended 5 Oct 2026 (`fdn-spacing`, visual-direction § 1.1 S5) — label → detail is `--gap-tight`.**
> A point's label over its detail line moves from `--gap-inline` (4) to `--gap-tight` (8). `inline` is
> a key and its value; a step name over the sentence describing it is a tight pair. The point → point
> seam in `split` stays `--gap-block` (24, amended 29 Sep), so the bind-and-separate ratio in § 7 is
> now 8:24 — three-fold, still enough to bind a pair and separate a row. The lede (`block` for
> eyebrow → heading → copy) does not change: it is the rhythm `ContentSection` now adopts (S1).
> § 7's table, its ratio paragraph and § 10's composition are amended in place; visual-direction.md
> wins where this document still differs.
>
> **Audit pass, same day.** `/audit-component CtaSection` found older drift the S5 edit had walked
> past, now amended in place: § 2's point row and § 10's compositions (a nowrap baseline `Cluster`
> since 30 Sep, not a two-track `Layout`), § 7's halves seam and the tracks measured from it
> (`--gap-section` 96 since 1 Oct: content 686, form/proof 458, not 706/470), § 8's marker role
> (`--text-index`) and the `offer` heading's key (`[data-arrangement='offer']`), and § 10's `open`
> primary action (no glyph since 1 Oct). The point's label-and-detail wrapper is a `<div>`, not a
> `<span>`: it holds a `Layout`, and a div inside a span is invalid HTML. Later sections that quote
> 706 or 470 as an aside (§ 4's rejected variants, § 12, § 15, § 17) predate 1 Oct and read ~20 and
> ~13px wide; no conclusion drawn from them changes.

> **Amended 29 Sep 2026 (tracker 2.17) — `scheduleHref` removed.** "See available times" moved into
> `EnquiryForm`'s own action row, beside its submit (see `docs/specs/EnquiryForm.md`, amendment at
> the top). `CtaSection` no longer takes `scheduleHref` or renders the link; the `form` members of
> the union are `{ form: ReactNode; actions?: readonly [] }`. The hard constraint — every one of the
> 56 form instances offers the link — now lives in `EnquiryForm`, whose `enquiry` and `audit`
> variants require `scheduleHref`. The exactly-one-per-band test in §15 still holds. Where this
> document says otherwise below (§3 props, §3 rejected combination 1, §10 composition), this note
> supersedes it.

## 0 · Front matter

| | |
|---|---|
| **Component** | `CtaSection` |
| **Tier** | 2 pattern (`src/patterns/CtaSection/`) |
| **Status** | implemented (amended 6 Oct 2026, cmp-cta) |
| **Token prefix** | `--cta-*` (collides with none of `--btn-` `--crumb-` `--foot-` `--icn-` `--lay-` `--logo-` `--nav-` `--prose-` `--sec-`) |
| **Designer / date** | Design · 21 Aug 2026 |
| **Implements** | COMPONENT NAME: CtaSection — the block that closes a commercial page. 76 routes, 113 instances |
| **Implemented at** | `src/patterns/CtaSection/CtaSection.tsx` · `src/patterns/CtaSection/CtaSection.module.css` · `src/styles/tokens/components/cta-section.css` · specimen `src/app/design/cta-section/page.tsx` |

Composed and checked against the loaded Tcules library (`window.Tcules`, 10 real components) and `guidelines/docs/vocabulary.md`. The mockup at `docs/specs/CtaSection-specimen.html` is built out of the real `Section`, `Layout`, `Cluster`, `Button`, `Icon` and `Prose`, so nothing in sections 7, 9 or 10 is a claim about arrangement that has not been rendered. Every ratio in section 6 was computed from the exact hexes in the vocabulary; all nineteen pairs used here also appear in `docs/specs/PageHero.md` and `docs/specs/Breadcrumbs.md` and agree with both. Assumptions I could not check are marked **[assumed]** and collected in section 17.

**Amended 29 Sep 2026 (tracker 2.17):** three changes, all recorded in place below. (1) In `split` and `offer` a point is a two-track `Layout` row — marker track, label track — never a wrapping `Cluster`, and `offer`'s list is a `Layout` grid (`{ base: 1, md: 2, lg: 3 }`), not a wrapping row: the `Cluster` let a numeral wrap onto its own line above its label at 390 and let a second row of six points disagree with the first about where labels start. (2) Points have a shape: `label` at `--text-h5` (serif title voice), `marker` at `--text-stat` (mono numeral). `split`'s point-to-point seam steps from `--gap-text` to `--gap-block` with them. (3) The close's heading is set at `--text-h1` in `split` and `open`, paired with `PageHero` moving to display scale so the ladder holds, and `offer`'s steps from `--text-h3` to `--text-h2` — still one rung below the close, and no longer smaller than its own 40px numerals. The element is an `h2` throughout.

**Amended 30 Sep 2026 (owner):** the marker drops from `--text-stat` (40) to `--text-index` (20) —
the numerals out-shouted the close's heading and its form. With a 20px marker the two-track row is
replaced by a non-wrapping `Cluster` (`nowrap`, `colGap="text"`, `align="baseline"`): it cannot
orphan the numeral, and two mono digits are a constant width, so labels still start on one line.

**Two findings, before the form starts.**

**One.** The eleven arrangements are **three**, and the three are not three densities of one shape — they are one slot set with three different jobs on the page. `split` closes a page that asks for an enquiry (56 routes). `open` closes a page that asks for a click (20 routes). `offer` interrupts a page mid-scroll with the free audit (37 routes). Everything else on the resolution sheet is one of those three with a slot filled or empty, and section 4 lays the eight rejections out against their page counts.

**Two.** `Stat` and `Testimonial` should not both be built. The proof slot holds one thing — a **`Proof`** pattern with a `figures` slot and a `quote` slot, either of which may be empty — because `/how-we-work` and `/clients` already put the 4.8/5 rating, the review themes and a client quote in one block, and two components cannot render one block. Section 1 specifies the three together, as the brief requires, and section 3 says why `CtaSection` still takes it as a `ReactNode` rather than as a typed union: a pattern may not import a pattern, so a typed union would name a component this one is forbidden to render.


> **1 Oct 2026 — split gap.** Two regions of different kind side by side are a *split* and take `--gap-section` (96), not `--gap-column` (64), which is now for peer halves only (CLAUDE.md § gap scale, rule 2). Owner, 1 Oct: "64px is fine but 96px … gives it just a bit more breathing space."

## 1 · Identity

The block that closes a commercial page: an optional eyebrow, one `h2`, one or two paragraphs, a short ordered list of what happens next, nought to two actions, an optional enquiry form and an optional proof block. It paints no ground of its own — it hands a `surface` to `Section` and `Section` paints the band. It appears **once or twice per route**: 76 routes, 113 instances, because 37 routes carry a mid-page free-audit offer as well as the closing block.

**Tier 2 pattern, forced twice over.** It takes content shaped like a CMS record — `eyebrow`, `heading`, `body`, `points`, `actions` straight off frontmatter — which the tier rule says makes it a pattern at the least. And it arranges itself with `Section`, `Layout`, `Cluster` and `Button`, four primitives; a primitive may not import a primitive, and hand-rolling flex instead is forbidden. Both roads end at `src/patterns/`.

**What it is NOT**

1. **Not the enquiry form.** The form from brief 09 does that, as a sibling pattern passed in through the `form` slot. It owns its fields, its labels, its validation, its submit button and the label set that switches between project enquiry (49 routes) and free audit (7). `CtaSection` never sees a field and never sees a form kind — section 3 says why `formKind` is deliberately not a prop here.
2. **Not the proof block.** `Proof` does that, in the `proof` slot: a figure row, a client quote, or both in one block. `CtaSection` decides where proof sits and how much air is around it. It decides nothing about what proof looks like.
3. **Not the page's ground.** `Section` does that, from the `surface` value handed to it. `CtaSection` declares no background property anywhere, paints no panel and draws no band of its own — which is the hard constraint "must not own its ground", read as a rule about what the stylesheet may contain rather than about which props exist. Section 3 argues the pass-through, section 14 names the grep that proves it.

**Nearest existing component, and why this is not a prop on it.** `PageHero`. The two are close enough that the comparison is worth making in full: both are bands, both take a `surface`, both hold a heading, copy and a `Cluster` of actions. They part on three things. The hero carries the page's only `h1` and this carries an `h2` — a prop that switched between them is how a page ends up with two `h1`s. The hero appears exactly once and first; this appears once or twice and last, or once mid-page. And the hero holds no interactive content of its own beyond its actions, while this holds a form: a hero with an optional form is a hero whose tab order, whose second column and whose narrow-track behaviour all change with a slot, which is two components sharing a name. They are siblings in `src/patterns/`, and neither may import the other.

**How many appear on a page.** One or two. Two is the normal case on 37 routes and section 12 row 12 says what must be true of the pair: the mid-page instance is `offer`, the closing instance is `split` or `open`, and two instances of the **same** arrangement on one route is a content bug that section 14 names the grep for.

### The proof slot, and the two components it shares — `Stat`, `Testimonial`, `Proof`

The brief asks for the three specified together, and specified together they turn out to be one component. Laid against each other by part:

| Part | `Stat` as briefed | `Testimonial` as briefed | `Proof` as specified |
|---|---|---|---|
| a big number | yes, one per figure | no | `figure` — `value` at `--text-stat`, `label` at `--text-micro` |
| a caption under the number | yes | no | the same `label` part |
| a row of several | yes, 2–4 figures | no | `figures` — `Layout columns="fit" minTrack="xs" colGap="gutter" rowGap="block"` |
| a quotation | no | yes, one | `quote` — `<blockquote>` at `--text-quote` |
| an attribution | no | name, role, company | `source` — one `<figcaption>` at `--text-body-sm` |
| a rating | in both briefs | in both briefs | a `figure` whose `value` is `4.8/5`. Not a third component |
| review themes | ambiguous | ambiguous | `figures` with three entries, or a `Prose` list in the `quote` slot's place |

`Stat` is `Proof` with an empty `quote`. `Testimonial` is `Proof` with an empty `figures`. `/how-we-work` and `/clients` are `Proof` with both filled, which is the block that exists on those pages today and which neither briefed component can render alone. Building both means building the attribution twice, the surface table twice and the narrow-track behaviour twice, and it means the day someone needs a quote beside a rating they write a third folder. One component, two slots, and its own spec — this document specifies its shape and its relationship to the slot, not its colour table.

Section 17 Q3 carries that recommendation as a question addressed to briefs 15 and 17, because it is not this component's decision to close. It is **non-blocking here**: `CtaSection` takes a `ReactNode` either way.

## 2 · Anatomy

| Part | Element | Required | Content slot | Carries |
|---|---|---|---|---|
| `root` | `<section>`, rendered by `Section surface={surface}` | yes | none | the band — ground, content column, vertical air, all from `--sec-*`. No `--cta-*` value of its own |
| `stack` | `<div>`, `Layout rowGap="stack"` | yes | none | the seam between `frame` and the full-width `proof` row |
| `frame` | `<div>`, `Layout` with `columns` | yes | none | the two-column seam — `colGap="column"`, `rowGap="stack"` when it wraps. In `open` without `proof` it is a single track and states neither seam |
| `column` | `<div>`, `Layout rowGap="stack"` | yes | none | the seam between `lede`, `points` and `actions` inside the content column |
| `lede` | `<div>`, `Layout rowGap="block"` | yes | none | the seams between `eyebrow`, `heading` and `copy` — one step, three children |
| `eyebrow` | `<p>` | no | `eyebrow`, uppercased at render | `--cta-eyebrow-ink`, `--cta-eyebrow-text`, `--measure-body` |
| `heading` | `<h2>` | yes | `heading`, verbatim | `--cta-heading-ink`, `--cta-heading-text`, `--measure-title` |
| `copy` | `<div>`, `Layout rowGap="text"` | yes | none | the seam between the two paragraphs |
| `lead` | `<p>` — the first paragraph | yes | `body[0]`, verbatim | `--cta-body-ink`, `--cta-lead-text`, `--measure-body` |
| `body` | `<p>` — the second paragraph | no | `body[1]`, verbatim | `--cta-body-ink`, `--cta-body-text`, `--measure-body` |
| `points` | `<ol>`, a `Layout` — single-track in `split`, `columns={{base:1,md:3}}` in `open`, `columns={{base:1,md:2,lg:3}}` in `offer` (amended 29 Sep 2026; was a `Cluster`) | no | none | both seams between points |
| `point` | `<li>`, a nowrap `Cluster` with `colGap="text"` and `align="baseline"` in `split` and `offer` (amended 30 Sep 2026; it was a two-track `Layout`, `{base:[1,4], md:[1,8]}`), a single-track `Layout` in `open`; the label and detail sit in one `<div>` that grows from a zero basis beside the marker | one per entry | none | the seam between `marker`, `label` and `detail` |
| `marker` | `<span aria-hidden>` — the position numeral | one per `point` | none — the component writes it from the index | `--cta-marker-ink`, `--cta-marker-text`, `--cta-marker-tracking` |
| `label` | `<span>` | one per `point` | `points[n].label`, verbatim | `--cta-point-ink`, `--cta-point-text`, `--cta-point-tracking` |
| `detail` | `<span>` | no | `points[n].detail`, verbatim | `--cta-point-ink`, `--cta-detail-text`, `--measure-body` |
| `actions` | `<div>`, `Cluster colGap="tight" rowGap="tight"` | no | `actions`, plus the scheduling link when `form` is present, as `Button`s | both seams. No colour: `Button` owns every value it paints, via `--btn-*` |
| `form` | `<div>` | no — 56 of 113 | `form` | nothing of its own. The form reads `--sec-*` from the band it stands in |
| `proof` | `<div>` | no | `proof` | nothing of its own, for the same reason |

Five parts carry colour (`eyebrow`, `heading`, `lead` and `body` together on one token, `marker`, `label` and `detail` together on one token) and they are the five rows of section 6. Nine parts carry distance only (`root`, `stack`, `frame`, `column`, `lede`, `copy`, `points`, `point`, `actions`) and they are the nine component rows of 7(a). Two parts carry nothing at all (`form`, `proof`), and that is the point of them: a slot that imposed a colour or a distance on the caller's block would be a slot the caller had to fight.

**There is no `panel` part, no `rule` part and no `card` part.** A tinted box behind the form and a hairline above the proof row were both drawn and both cut. The design bar says visual weight comes from scale, imagery and position rather than from decoration, borders or a tinted band — and this component's whole job is to be the loudest block on the page, which it gets from a 43px serif heading against a 470px form and a `--text-stat` figure row underneath. A CTA that needs a box around its form has not used enough air. Their absence is why section 7 has no border-width above zero and no radius above zero.

## 3 · Props / API

```ts
type CtaPoint  = { label: string; detail?: string }
type CtaAction = { label: string; href: string }

type CtaFormSlot =
  | { form: ReactNode; scheduleHref: string; actions?: readonly [] }
  | { form?: never;    scheduleHref?: never; actions: readonly [CtaAction] | readonly [CtaAction, CtaAction] }
```

| Prop | Exact literal union | Default | What it decides |
|---|---|---|---|
| `arrangement` | `'split' \| 'open' \| 'offer'` | `'split'` | Which of the three shapes renders. It changes where four slots sit and two type roles; it changes no slot's presence and no gap step |
| `heading` | `string` | none — required | The block's `h2`, verbatim. A `string` and not a `ReactNode`, which is what makes a second heading impossible to smuggle in |
| `body` | `readonly [string] \| readonly [string, string]` | none — required | One or two paragraphs. `body[0]` renders as `lead`, `body[1]` as `body`. A third paragraph does not compile — this block asks, it does not explain |
| `eyebrow` | `string \| undefined` | `undefined` | Whether the `eyebrow` part exists. Absent renders no element and no seam |
| `points` | `readonly CtaPoint[]` | `[]` | What happens next, in order. Empty renders no `<ol>` at all. Order is meaning, which is why it is an ordered list and why `marker` is an index rather than a glyph |
| `actions` | see `CtaFormSlot` | `[]` | Nought, one or two controls. Position decides emphasis: the first is `solid` / `primary`, the second `link` / `primary` (amended 6 Oct 2026, cmp-cta; was `ghost` / `neutral`). Neither carries a glyph (1 Oct 2026, owner: the first used to take `arrow-right` by position, so the same action looked different here than in the hero and the nav) |
| `form` | `ReactNode` (in `CtaFormSlot`) | `undefined` | Whether the block asks in place or asks by link. Present in 56 of 113 instances |
| `scheduleHref` | `string` (required when `form` is present) | none | Where "See available times" goes. Required by the type whenever a form is rendered, which is the mechanism for the hard constraint that all 56 form instances carry it |
| `proof` | `ReactNode` | `undefined` | The `Proof` block. Full-width row beneath `frame` in `split`; the right-hand column in `open`; a compile error in `offer` |
| `surface` | `'paper' \| 'tint' \| 'ink' \| 'blue'` | `'paper'` | Which ground `Section` paints under this band. Passed straight through and read nowhere else in the component |

**`surface` is a pass-through prop, and that is not the same thing as owning the ground.** The rule says `surface` is never a prop, and it is right for everything that stands inside a band: a `Button` three levels down reads `data-surface` and is correct without being told. This component **is** the band. It has no ancestor that declares a surface, so there is nothing to inherit and the value must arrive as a prop — the same conclusion `Breadcrumbs` and `PageHero` reached, so this is a precedent followed rather than one set. What the hard constraint forbids is the component painting anything: `CtaSection.module.css` contains no `background`, no `color` on the root, no `padding-inline`, no `max-width` and no `--cta-*-bg-*` token, so the ground is `--sec-ground` and nothing else. Section 14 item 8 names the grep. Section 17 Q5 records the stricter reading of the constraint and why it is not the one taken.

**Deliberately NOT props**

| Not a prop | Why |
|---|---|
| colour, padding, gap, radius, height, width | The token layer owns colour; `Section`, `Layout` and `Cluster` own distance; the component owns its own sizes. A caller with an opinion about any of these has an argument with the system, not a prop |
| `formKind` — `'project' \| 'audit'` | The label set that switches with the form kind belongs to the form (brief 09), which is the thing whose labels they are. `CtaSection` renders a `ReactNode` and cannot inspect it; a `formKind` here would be a second copy of the same fact, and the day the two disagreed the page would render an audit form under project-enquiry framing. The section's own copy switches because the frontmatter passes different strings |
| `density`, `padding`, `compact` | `arrangement="offer"` sets `Section density="tight"` internally and the other two take the default. Three shapes, three densities, decided once — a route that wanted 64px of air under a closing block is asking for the mid-page shape |
| `columns`, `ratio`, `reverse`, `formSide` | The content-left / form-right default is a decision, not a setting. A route that wanted the form on the left would put the form on the left on one page out of 56, and the constraint is that the drift is visible on whichever page the visitor sees second |
| `headingLevel`, `as`, `titleAs` | The heading is an `h2` in all three arrangements, rendered at `--text-h2` scale in all three (amended 6 Oct 2026, cmp-cta; from 29 Sep `split` and `open` were `--text-h1` and `offer` `--text-h2`), which is a type role and not a level — section 17 Q4 raises that as the open question the tier rules require, because there is no `Heading` component to ask |
| `variant="withForm" \| "withoutForm"` | The hard constraint, as a type. The presence of the form slot is the difference; naming it a variant is the first step to two components |
| `showProof`, `proofPosition` | Proof's presence is its content's presence, and its position is a consequence of the arrangement. A position prop would let one route put proof in the column while 112 put it in the row |
| `lazy`, `loadForm`, `onSubmit` | Loading is not in the state model and nothing here is asynchronous. The scheduling secondary is an anchor to `scheduleHref`; the booking widget lives on that route and therefore cannot load with this block. That is what "lazy" means here, and it needs no mechanism |
| `className`, `style`, `id` | The props interface is closed. The only reason to reach in would be outer spacing on the band, and the page owns that by ordering its bands |

**Compile errors, not review comments**

1. **A form with no scheduling link.** `CtaFormSlot`'s first member requires `scheduleHref`. The hard constraint is that all 56 form instances carry "See available times"; this is that constraint as a type rather than as a review.
2. **A form with its own `actions`.** The same member allows only the empty tuple. The form's submit is the primary ask; a second primary beside it is two asks in one block.
3. **No form and no actions.** The second member requires at least one action. A closing block that asks for nothing is a block with no reason to exist.
4. **Three or more actions.** The union has a 1- and a 2-tuple and no third member.
5. **A third paragraph.** `body` is a 1- or 2-tuple.
6. **`arrangement="offer"` with `proof`.** A discriminated overload rejects it. The mid-page offer and the closing block appear on the same 37 pages, and the fastest way to make them look identical is to give them both a figure row.
7. **`arrangement="split"` with no form.** `split` is the two-column form shape; a split with an empty right-hand column is the `open` arrangement misnamed.
8. **`heading` as an element.** It is `string`, so `heading={<span>…</span>}` does not compile and no second heading, link or control can enter through it. The same is true of every entry in `body`, `points[n].label` and `points[n].detail`.
9. **`className`, `style`, `id`, `variant`, `formKind`, `density`.** No `HTMLAttributes` spread and no index signature, so excess-property checking rejects them at the call site.

## 4 · Variants × sizes

Variants are role-named, and there is **one size**.

**One correction from the build.** The `actions` row of the table below said `1` for `offer` while
section 3's `CtaFormSlot` says "one or two" and the implementation accepts both. The table was the
half that was never narrowed — nothing in the corpus or the constraints argues for capping `offer`
at one action, and section 14's don't-19 holds either way, because index 1 is always `ghost`. So the
table is corrected to match the type rather than the type to the table.

| | `md` (only size) |
|---|---|
| `split` — the enquiry close, 56 instances | the component, two columns, form right |
| `open` — the action close, 20 instances | the component, two columns with proof right; **one column when there is no proof** |
| `offer` — the mid-page audit interrupt, 37 instances | the component, one column, tight band |

**Why three and not eleven.** Every arrangement on the resolution sheet is this slot set laid out differently, so the question is not which shapes are possible but which shapes have a job. Three jobs exist: ask in place, ask by link, interrupt. Laid out by slot:

| | `split` (56) | `open` (20) | `offer` (37) |
|---|---|---|---|
| `eyebrow` | optional | optional | optional |
| `heading` | `--text-h2`, always (was `--text-h1` until 6 Oct) | `--text-h2`, always (was `--text-h1`) | `--text-h2`, always |
| `lead` + `body` | 1–2 | 1–2 | 1–2 |
| `points` | vertical list, content column | 3-up row — ~214px tracks beside proof, 392px without it | 1-up, 2-up from md, 3-up from lg — 392px tracks at 1440 |
| `actions` | the scheduling link only, under the form | 1–2, under the points | **1 or 2**, under the points |
| `form` | required, right column | forbidden | optional, under the copy |
| `proof` | optional, full-width row | optional, right column; absent → no column | forbidden |
| band | `--sec-padding-y` 96px | `--sec-padding-y` 96px | `--sec-padding-y-tight` 64px |

No row differs in **slot set**. Every difference is a position, a type role or a density — which is the hard constraint that eleven arrangements must not be eleven builds, satisfied by making them one build with three positions for four slots.

**Steps with the single size:** nothing, there being one.

**Deliberately does not step with the arrangement:** every gap step in 7(a); both measures; `Button size="md"`, which is the site's default control height on all three shapes, because a CTA whose buttons were taller than every other button would be making a claim about its actions that the design does not intend; and the content column, which is `Section`'s on all three.

**Variants considered and rejected**

| Rejected | Why |
|---|---|
| `centred` — heading and actions centred, no second column | The shape a marketing page reaches for, and it fails on the form: a centred 470px form under a centred heading is a funnel page, and this block ends an article. It also cannot hold a left-set ordered list, which is the one part that carries "what happens next" |
| `formLeft` / `reverse` | The default exists to be the same on 56 pages. A mirrored instance is the drift the hard constraint names |
| `banner` — one line, heading and button on one row | Tempting for the mid-page interrupt, and it loses the points. The free audit's value is the three things that happen next; a banner is an ask with no reason attached, and 37 pages is too many to make that trade on |
| `card` — the whole block in a bordered, radiused box on the page ground | Decoration doing the work of scale and position. It also breaks the "must not own its ground" constraint in the most literal way available |
| `stacked` — form above the copy, single column at all widths | This is `split` at 1023 and below. A separate variant for a rendering the responsive rule already produces is one more name for the same pixels |
| `twoUpPoints` — points as a 2-up grid in `split` | A 2-up inside a 706px track gives 337px tracks, which is narrower than the `--lay-track-md` 320px floor plus a gutter can carry with a detail line under each label. The vertical list is the answer to the brief's open question about the narrow column |
| `withProofPanel` — proof in a tinted panel inside the band | A tint panel nested inside an ink band is the measured 1.13:1 failure the brief cites. `Proof` reads `--sec-*` from this band's surface and paints nothing |
| `compact` — a fourth density between `offer` and the closing block | Splitting the difference. `Section` has two densities and a default, and three shapes map onto them exactly |

## 5 · States

**None of the fixed model's states applies to any part this component renders**, and section 5 is that assertion with its reasons. Every stateful thing in the band belongs to something else: `Button` has hover, focus, pressed and disabled through `--btn-*`; the form's fields have their own; `Proof` has none.

| State | Suffix | Applies to | Why not |
|---|---|---|---|
| rest | *(none)* | every part | The only rendering. This row is the component |
| hover | `-hover` | nothing | No part of `CtaSection` responds to a pointer. The `Button`s and the form's controls do, and their own specs own that |
| focus, keyboard | `-hover` + ring | nothing | Nothing the component itself renders is focusable. The actions are, the form's fields are, and anything interactive inside `proof` is |
| pressed | `-pressed` | nothing | As hover |
| held: active / selected / current | `-pressed` | nothing | A closing block is never "the current one". Two on a page are not two options; they are two moments |
| disabled | its own tokens | nothing | The block cannot be unavailable. A form that cannot be submitted is the form's disabled state, not the section's. No `--cta-disabled-*` token exists |
| expanded / open | `-expanded` | nothing | Nothing opens. No disclosure, no `aria-expanded`, no idref pointing at a panel that is not rendered, and no focus to place after a change that never happens |

**So zero `--cta-*` state tokens exist**, and their absence is the assertion that this component's rendering is a function of its props alone: the same props render the same pixels at every moment of its life, on every surface, at every width.

**The hover-differs-from-pressed rule, answered rather than dodged.** The component has no rendered hover and no rendered pressed, so there is no pair of renderings that could be identical. The interactive things standing in the band satisfy the rule in their own specs on all four surfaces, and the reason that is enough is that they are the only things in the band a pointer can reach.

**Loading and error are not in the model, and this is the component most likely to be asked for them.** A form submits, and a submit is asynchronous. That belongs to the form: its pending state, its error summary and its success rendering are brief 09's mechanism requests to make, and `CtaSection` renders whatever the slot hands it at whatever size it comes out. What the section must not do is reserve space for a state it cannot see or shift its own layout when the form's height changes — the `frame` rows are content-sized and the band grows, which is the correct behaviour and needs no rule.

## 6 · Per-surface colour

Five tokens, four surfaces, twenty cells, no deltas. `paper` values are declared on `:root, [data-surface=paper]`, following `nav.css`, `button.css` and `breadcrumbs.css`.

| Token | paper (`--color-paper`) | tint (`--color-paper-deep`) | ink (`--color-neutral-950`) | blue (`--color-brandeis-500`) |
|---|---|---|---|---|
| `--cta-heading-ink` | `--color-neutral-900` — **14.62:1** | `--color-neutral-900` — **13.05:1** | `--color-white` — **17.26:1** | `--color-white` — **6.23:1** |
| `--cta-body-ink` | `--color-neutral-800` — **11.81:1** | `--color-neutral-800` — **10.54:1** | `--color-neutral-100` — **14.47:1** | `--color-brandeis-50` — **5.57:1** |
| `--cta-point-ink` | `--color-neutral-700` — **8.15:1** | `--color-neutral-700` — **7.27:1** | `--color-neutral-300` — **11.07:1** | `--color-brandeis-100` — **4.91:1** |
| `--cta-eyebrow-ink` | `--color-neutral-600` — **4.92:1** | `--color-neutral-700` — **7.27:1** | `--color-neutral-400` — **8.05:1** | `--color-brandeis-100` — **4.91:1** |
| `--cta-marker-ink` | `--color-neutral-600` — **4.92:1** | `--color-neutral-700` — **7.27:1** | `--color-neutral-400` — **8.05:1** | `--color-brandeis-100` — **4.91:1** |

Every ratio is text against **the ground it actually sits on**, which here is always the band's own ground: this component paints no fill behind any part, has no hover or pressed fill to measure against, and draws no rule. The absence of every `--cta-*-bg-*` token is the assertion that nothing in this block is boxed — the form's box is the form's, and it measures its own field fills in its own spec.

**The `marker` is a text ratio, not a decoration ratio, and that is why it is in the table at 4.91:1 on blue rather than marked "n/a — decoration".** It is `aria-hidden` because a screen reader gets the position from the `<ol>` — but it is a visible numeral that a sighted reader uses to count the steps, so it is meaningful glyph-shaped text and it takes the 4.5:1 floor. There is no decoration row anywhere in this table, because there is no decoration: the nine parts that carry no colour carry no colour *token*, not a decorative one, and section 2 marks each of them.

**The focus ring has no row**, and that is a consequence of section 5: nothing the component renders can take focus. The rings inside the band belong to `Button` and to the form's controls, measured against their own gap colours on all four surfaces in their own specs. `CtaSection` declares no ring token, which is the assertion that it never draws one.

**A check on the values, not a shortcut.** Three of these rows land on mappings the surface layer already makes — `--cta-heading-ink` reproduces `--sec-ink` and the two mono tokens reproduce `--sec-ink-label` on all four surfaces. That agreement says the values were derived the way the system derives its own. It is **not** a reason to alias `--sec-*`: a component token that reads a surface token silently follows it the day the surface layer is re-tuned, which is how the loudest block on the site ends up quieter than it was specified to be with nobody having decided that. Declare the `--color-*` value.

**paper.** The baseline, and a four-step ramp that maps onto the reading order. The heading at `--color-neutral-900` (14.62:1) is the loudest ink in the band and the reason the block reads as a close rather than as another section. The two paragraphs sit together at `--color-neutral-800` (11.81:1), one token for both, because a lead and a body paragraph in a block this short are one voice at two sizes. The points drop to `--color-neutral-700` (8.15:1) — quieter than the ask, because they are the reassurance and not the ask. The eyebrow and the numerals sit quietest at `--color-neutral-600` (4.92:1), which they can afford because mono, semibold and their tracking already make them read louder than their size. Nothing here is blue: blue means clickable in this system and appears on nothing that is not, so the only blue on a paper CTA is inside a `Button` or a form control.

**tint.** The heading and the paragraphs hold their ramp steps, losing about a point of ratio each to the deeper ground and staying far clear of the floor. The one real move is at the quiet end and it is measured: `--color-neutral-600` on `--color-paper-deep` computes **4.39:1** and fails the 4.5 floor, so the eyebrow and the numerals step to `--color-neutral-700` — which is where the points already are. On tint, and only on tint, those three parts share an ink. They stay distinguishable by family, case, size and tracking rather than by colour, which is the rule anyway; and the alternative — leaving 600 in place because it is "nearly" 4.5 — is exactly the class of failure a deltas-only table produces. Tint is also the surface this block appears on most often, because a closing band sitting under a paper article is the one place the site changes ground, so this is the cell that matters most.

**ink.** The direction inverts and the ramp gets more room. The heading lifts to `--color-white` (17.26:1), the paragraphs to `--color-neutral-100` (14.47:1), the points to `--color-neutral-300` (11.07:1) and the eyebrow and numerals to `--color-neutral-400` (8.05:1) — the same step `Breadcrumbs` lifts its links to and `PageHero` lifts its eyebrow to, so a trail, a hero label and a CTA numeral on an ink ground are one grey rather than three. Every cell on ink clears 8:1, which matters here more than in the hero: an ink CTA is the loudest thing on a page that has been light for two thousand pixels, and a 43px serif heading on that ground is the moment the type is most at risk of looking thin.

**blue.** The ramp runs out and the four-step structure survives on three values. White for the heading (6.23:1), `--color-brandeis-50` for both paragraphs (5.57:1), `--color-brandeis-100` for the points, the eyebrow and the numerals (4.91:1) — the tightest cells in the table, and the reason nothing quieter than 100 is allowed on this ground. Two consequences to accept knowingly. On blue the points collapse onto the same ink as the eyebrow and the numerals, so blue loses one of the four steps and keeps its typographic difference only. And a blue CTA is the one surface where the primary action cannot be blue, which is `Button`'s problem and is solved in `Button`'s spec — it is named here because a reviewer looking at a blue band will look for it.

**Nested surfaces.** This component paints its own band, so it is never nested in the ordinary sense — but the band is a `[data-surface]` scope and all five tokens resolve from whichever block that attribute selects. A `tint` CTA between two `ink` bands renders the tint column: an 11.81:1 lead on `--color-paper-deep`, not `--color-neutral-100` stranded on a light ground at **1.13:1**, which is the measured failure the brief cites and which is a failure of a deltas-only table rather than of a component. The same applies inside the band, and here it does real work: the form and `Proof` both read `--sec-*` from this band's surface, so a figure row inside a blue CTA is white-on-blue and a field rule inside it is a blue-surface rule, with neither component being told where it is. What the two slots may **not** contain is another `Section` — the content column would inset twice — and section 12 row 11 says so as a rule.

## 7 · Geometry & spacing

**(a) Distances — gap-scale role names only**

| Where | Role | Owner |
|---|---|---|
| `eyebrow` → `heading` → `copy` | `--gap-block` | `lede`'s `rowGap` — head to body inside a block, the most used step |
| paragraph → paragraph | `--gap-text` | `copy`'s `rowGap` |
| `lede` → `points` → `actions` | `--gap-stack` | `column`'s `rowGap` — block to block inside a section |
| content column → form column (`split`), content column → proof column (`open`) | `--gap-section` (96; `--gap-column` until 1 Oct) | `frame`'s `colGap` — the step for two halves that must read as separate. Not stated in `open` without proof: one track has no column seam |
| the columns when `frame` wraps at 1023 | `--gap-stack` | `frame`'s `rowGap` |
| `frame` → full-width `proof` row (`split`) | `--gap-stack` | `stack`'s `rowGap` |
| point → point, vertical list (`split`) | `--gap-block` | `points`' `rowGap`. Amended 29 Sep 2026 from `--gap-text`: at 16 a 40px numeral sat nearer the next step's numeral than its own detail |
| point → point, 3-up row (`open`) | `--gap-gutter` both axes | `points`' `colGap` and `rowGap` — the step between cards in a set, which is what a 3-up row of steps is |
| point → point, grid (`offer`) | `--gap-gutter` both axes | `points`' `Layout` `colGap` and `rowGap` — the same step as `open`'s, cards in a set. Amended 29 Sep 2026 from a `Cluster` at `--gap-block` |
| `marker` → `label` (`split`, `offer`) | `--gap-tight`, plus the marker track's slack | Superseded 30 Sep 2026: now `--gap-text` in a nowrap `Cluster`, no marker track. Was: `point`'s `Layout` `colGap` — the marker's track was an fr share (`[1,4]`, or `[1,8]` in `split` from md) sized to land at 64–106px at every width, wide enough for a two-digit `--text-stat` numeral (≈48px at 40, ≈38px at 32). A track cannot wrap, so the numeral cannot orphan, and every point in one list takes the same share of the same track width, so every label starts on one line — including a second row of `offer` points under the first |
| `marker` → `label` (`open`, stacked) | `--gap-tight` | `point`'s `Layout` `rowGap` |
| `label` → `detail` | `--gap-tight` (was `--gap-inline` until 5 Oct, S5) | the inner `Layout`'s `rowGap` — a label over its description is a tight pair, not a key and its value |
| action → action, both axes | `--gap-tight` | `actions`' `colGap` and `rowGap` |
| the band's vertical air, `split` and `open` | `--sec-padding-y` (96px) | `Section` at its default density. Not this component's to set |
| the band's vertical air, `offer` | `--sec-padding-y-tight` (64px) | `Section density="tight"` |
| `root` → whatever precedes or follows it | none | **the page**, by ordering its bands. `CtaSection` sets no outer spacing |

The non-uniform rhythm comes entirely from nesting rather than from a knob: 8 inside a point (label to detail, S5), 16 beside a numeral and between paragraphs, 24 inside the lede and between `split`'s steps, 32 between the cards of a step row, 48 between blocks, 96 between the halves (the split seam, 1 Oct 2026; it was 4 inside a point, 8 beside a numeral and 64 between the halves). Tighten by grouping, loosen by separating — which is why `stack`, `frame`, `column`, `lede` and `copy` all exist as parts even though none renders anything visible. They are the five levels the rhythm needs.

**`--gap-section` between the halves, not `--gap-gutter` (amended 1 Oct 2026; it was `--gap-column`).** 32px between a paragraph of copy and a form field reads as one dense two-column block, and the reader's eye runs the wrong way across it — from the end of a sentence into a field label. The copy and the form are two regions of different kind side by side — one asks, the other answers — which is a *split*, and a split takes 96 (CLAUDE.md § gap scale). 64 is for peer halves only. It costs the form about 13px of track against the 64 it replaced, which is the trade being made deliberately.

**The points in `split` are the brief's open question, answered by the ratio rather than by a shape.** In a 706px column, a numeral 16px beside its label (`--gap-text`, a nowrap `Cluster` since 30 Sep), with 8px to a detail line under it (`--gap-tight`, S5, 5 Oct 2026) and 24px to the next step (`--gap-block`, 29 Sep), reads as a numbered sequence with no rule, no dot and no bullet character. The 8:24 ratio does the same work `SiteFooter` gets from its meta-key tracking: a three-fold difference is enough to bind a pair and separate a row. (It was 4:16 — four-fold — before both seams moved; the ratio narrowed and the argument did not change.) That is why the narrow column does not need the 3-up row's 32px, and why the answer is one `rowGap` value rather than a second arrangement.

**(b) Component sizes — t-shirt named, each measured against something real**

| Name | Value | Measured against |
|---|---|---|
| `content` track, `split` and `open` with proof | **686px** (706 before 1 Oct) | `--sec-container` 1240px less `--gap-section` 96px, at `columns={[3,2]}`: 1144 × 3/5 = 686.4. Every measure in this component was measured against this track (then 706, with `--gap-column`), not against the 1240 column |
| `form` track, `split`; `proof` track, `open` | **458px** (470 before 1 Oct) | the same arithmetic, 1144 × 2/5 = 457.6. It is 202px wider than `--foot-field-min-inline` 256px, so a two-field row inside the form still fits — which is the reason the ratio is 3:2 and not 2:1 |
| `point` track, `open` | **392px** without proof · **~214px** with it | without proof the frame is one track, so the 3-up row divides the whole 1240 content column less two `--gap-gutter` 32px: (1240 − 64) / 3 = 392, the brief's own figure. With proof it divides the 686 track: (686 − 64) / 3 ≈ 207 (≈214 in the 706 track before 1 Oct). Below 1024 both are the same full-column 3-up shape, ≈298px at 1023, until it drops at 767 |
| `heading` measure | `--measure-title`, 22ch ≈ **473px** at `--text-h2` | the 706px content track. The heading takes 67% of its track and wraps to two or three lines, which is the shape a closing ask should have — a one-line heading in a 706px track reads as a section label |
| `copy` measure | `--measure-body`, 68ch ≈ **748px** at `--text-lead` | the same 706px track, which it exceeds and therefore goes inert. Stated because a reviewer will find it: the measure is there for `offer`, whose copy runs the full 1240px column and needs the cap |
| `detail` measure | `--measure-body`, 68ch ≈ **535px** at `--text-body-sm` | the 392px (or ~214px) `open` point track, which it exceeds and goes inert, and the 1240px `offer` row, where it is the only thing stopping a detail line running the full band |
| action height | `--btn-height-md`, **40px** | the site's default control height. It is 4px short of `--btn-hit-min` 44px, which is why every action sets `extendHitArea` — section 9 |
| minimum inline size | **320px**, `--lay-track-md` | the longest single word in a corpus heading at `--text-h2`'s 767 re-declaration **[assumed]**. Below 320 the component renders and breaks inside words |

Eight values, of which three are declared and five are computed consequences stated so a reviewer can check them.

**Which track this component was measured against:** the **706px** content track of `columns={[3,2]}` inside `--sec-container` 1240px with `--gap-column` 64px between the halves — **686px** since the 1 Oct split seam (96). The measures are `ch` caps, so none of them moved; only the track they sit in narrowed by 20px. Not the 1240px column, and not the three-up point track except where 7(b) names it for `open`'s points.

**`open` without proof is one track, and it needs no new measure.** The frame reserves a second track only when `proof` is passed — the same idiom as `Proof`'s `columns={both ? 'fit' : undefined}` — because a 3:2 frame with an empty right-hand track left the 470px proof track (534 with its gap) as dead ground at 1440 on ten of the eleven `open` routes (tracker 2.4). The one-track frame does not let the ask run to 1240: the heading keeps `--measure-title` (≈473px), and `body` (≈673px) and `detail` (≈535px) keep `--measure-body` at the widths they had. The one running part that grows is the `lead`: 68ch at `--text-lead` is ≈748px, which the 706 track used to clamp, and it now renders at its own measure. That is accepted rather than corrected — 748 is the body measure doing its job, not a new width, and inventing a narrower lead measure for one arrangement would be a second answer to one question. Only the points row takes the full column, as three 392px tracks, which is the same full-column 3-up shape `open` has always had between 768 and 1023. So the band reads as a capped statement over a wide sequence of steps, and the empty column is gone rather than filled.

**(c) Optical corrections reaching the space ramp — none, and why**

**Amended 30 Sep 2026:** the marker is `--text-index` (≈20px) and the row is a nowrap `Cluster` with `align="baseline"`, so the numeral sits on the label's first baseline and the paragraph below is history. **Amended 29 Sep 2026:** the marker is now `--text-stat` (40px, line-height 1) beside a `--text-h5` label (22px), and the row is a `Layout` with `align="start"` — the two share a top edge, not a baseline, and the numeral's cap top sits within a few pixels of the label's. The correction below stays declined for the same reason, and its sizes are historical. There is a real correction available and this spec declines it. Geist Mono's numerals at `--text-micro` sit a fraction above the baseline of Public Sans at `--text-body`, so in `split` and `offer` a numeral and its label do not quite share a baseline; `align="baseline"` on the `point` `Cluster` fixes the alignment but not the optical rise, and pulling the marker down by `--space-1` would. It is declined because the numeral is 11px against a 16px label and the rise is under a pixel at the sizes that ship — a correction that small is a value someone will later read as a layout distance in disguise, which is the failure mode the justification-sentence rule exists to catch. It is also the wrong axis: if the numerals ever look wrong it will be in `open`, where they sit *above* their labels and the correction would not apply at all.

So the component reaches into `--space-*` nowhere, and it carries **no margin on any node**, which keeps layout rule 2 intact with zero exceptions. `Prose`'s documented margin exception applies only inside a `Prose`, which this component renders only if the caller puts one in a slot.

**Radius.** `--radius-0`. No part of this component has a box, so there is no corner to round. The `Button`s bring `--btn-radius` and the form brings its own field radius.

**Border width.** `--border-width-0`, everywhere, as a decision rather than an omission — see the note at the end of section 2. Nothing this component renders is ruled, bordered or underlined.

**Shadow.** `--shadow-none`. Nothing here is elevated and nothing draws a ring.

**Z-layer.** `--z-base`. Nothing in this component stacks above anything. `SiteNav` sits above it at `--z-sticky`, which is `SiteNav`'s business.

## 8 · Typography

| Part | Role | Tracking companion |
|---|---|---|
| `eyebrow` | `--cta-eyebrow-text: var(--text-eyebrow)` | `--text-eyebrow-tracking` |
| `heading`, every arrangement (6 Oct 2026; `split` and `open` were `--text-h1`) | `--cta-heading-text: var(--text-h2)` | `--text-h2-tracking` |
| `heading`, `offer` | `--cta-heading-text: var(--text-h2)` | `--text-h2-tracking` |
| `lead` | `--cta-lead-text: var(--text-lead)` | none — this role has no tracking companion |
| `body` | `--cta-body-text: var(--text-body-lg)` | none — this role has no tracking companion |
| `label` | `--cta-point-text: var(--text-h5)` | `--cta-point-tracking: var(--text-h5-tracking)`; `text-wrap: var(--text-title-wrap)` |
| `detail` | `--cta-detail-text: var(--text-body-sm)` | none — this role has no tracking companion |
| `marker` | `--cta-marker-text: var(--text-index)` (30 Sep 2026; was `--text-stat`) | `--text-index-tracking`; `text-transform: var(--text-mono-case)` |
| `actions` | — | `Button` owns it, through `--btn-text-tracking` |

~~`--cta-heading-text` is one token re-declared under `[data-arrangement='offer']`~~ (superseded 6 Oct 2026: every arrangement is h2 and the remap is deleted) (the band's own data attribute; there is no `.offer` class, § 14 Do 8), which is the component layer doing what it is for: one name, one meaning — "the size this block's heading is" — with a different answer in one arrangement. It is not a second token and it is not a media query.

**Three families in one band, and that is the design.** The heading and the point labels are display serif, the copy and the point details are sans, the eyebrow and the numerals are mono (amended 29 Sep 2026: the labels were sans). A CTA built from one family has to earn its structure from rules and boxes, which section 2 refused; a CTA with three families gets it from the type. Squint at `split` and it reads as four things — a big serif ask, a grey paragraph, a numbered sequence in two sizes, and a form — not as one rectangle.

**Why the lead and the body are different roles.** `body[0]` at `--text-lead` (20px) and `body[1]` at `--text-body-lg` (18px) gives the copy an internal hierarchy without a prop and without a count-driven rule the caller cannot see. The 18px matters as much as the 20px: the page's `Prose` runs at `--text-body` (16px), so this block's paragraphs stay above body scale and continue to read as an ask rather than as one more section of the article. ~~The points sit *at* 16px deliberately.~~ **Amended 29 Sep 2026:** the points no longer sit at body scale. At 16px sans with an 11px numeral they read as a paragraph with digits in front, and the list is the one part of the band that can give each step a shape; the label is now a `--text-h5` title and the numeral a `--text-stat` mark, and only the `detail` stays at `--text-body-sm`, one clear rung under a 22px step name.

**Measure.** `heading` takes `--measure-title`. `lead`, `body`, `eyebrow` and `detail` take `--measure-body`. `label` takes none: a point label is a phrase of three to six words and the list's track caps it. Section 7(b) records which of those measures are inert in which arrangement, which is a consequence worth having written down rather than a fault.

**Case — settled by the token layer. Amended 25 Aug 2026:** mono is always uppercase system-wide (`tokens/primitives.css` § Type · case), so the `eyebrow` and the `marker` — this component's two mono parts — both read `text-transform: var(--text-mono-case)`, and there are two `text-transform` declarations rather than one. The `eyebrow` renders **uppercase**. `--text-eyebrow` is mono semibold with tracking on it, and tracking that wide exists for capitals: set lower-case, a tracked mono label reads as letter-spaced body text rather than as a label — which is why the case belongs to the role and not to this block. The `marker` is a numeral and has nothing for the transform to do; it states it anyway, so the omission never has to be read as a decision. Everything else — heading, copy, points, actions — is **verbatim**, and the transform is applied in CSS rather than in the data, so the frontmatter keeps its authored casing and reversing this is one declaration.

Example copy, exactly as it would be authored — the eyebrow in sentence case, uppercased at render:

- eyebrow — `Next step`
- heading — `Tell us what you are trying to ship`
- lead — `We reply to every enquiry with a named person and a date, not an acknowledgement.`
- point label / detail — `A 30-minute call` / `We ask what you have tried and what it cost.`
- marker — `01`

Numerals render two-digit and zero-padded (`01`, `02`, `03`) rather than `1.` — mono at 11px with tracking needs the second digit to hold its column, and a full stop after a tracked numeral reads as a tenth of a step.

## 9 · Responsive

**At 1023 — `frame` collapses and nothing else changes.** `columns={{base: 1, lg: [3, 2]}}` when `open` has proof, and `{{ base: 1, lg: [7, 5] }}` in `split` (amended 6 Oct 2026; it was `[3, 2]`), so below 1024 the two halves become one track: in `split` the form drops beneath the content column, in `open` proof drops beneath it. The seam between them becomes `frame`'s `rowGap`, `--gap-stack`, which was declared for exactly this and is not a substituted value. DOM order is unchanged, so reading order is unchanged. `open` without proof has no frame change to make: it is one track at every width. `open`'s points stay 3-up here — the 959px column at 1023 less two 32px gutters gives ≈298px tracks — and drop at 767.

**At 767 — `open`'s points collapse to one track.** `columns={{base: 1, md: 3}}` on `points`, so below 768 the 3-up row becomes a vertical list at the same `--gap-gutter` **[assumed: `md` is the 768 breakpoint]**. `offer`'s points step 3 → 2 at 1023 and 2 → 1 at 767 (`columns={{base:1, md:2, lg:3}}`, amended 29 Sep 2026; they were a `Cluster` that wrapped on its own, which is what let a numeral orphan). `actions` wraps on its own at `--gap-tight`. Nothing reorders and no type role changes.

**What must not change:** the part order, the three arrangements, the twelve gap assignments in 7(a), the two measures, the eight type roles, and the ratio above 1024 wherever a second column has content (3:2 in `open` with proof, 7:5 in `split` and the K offer with media, 1:2 in the beside offer — cmp-cta, 6 Oct 2026). `CtaSection.module.css` contains **zero media queries** — the two breakpoint changes above are `Layout`'s `columns` object, which is the primitive's mechanism and not a rule in this component's stylesheet. Section 14 names the grep.

**The gap scale does not shift responsively.** `--gap-inline`, `--gap-tight`, `--gap-text`, `--gap-block`, `--gap-gutter`, `--gap-stack` and `--gap-column` are the same distances at 1440 and at 375. No media query in this component may swap a gap step, and none may change a type role — the title roles re-declare themselves at 1023 and 767 in the type layer already **[assumed]**, and this component must not touch them.

**Touch targets — 44px, reached by extending the hit area past the box, not by stepping the size up.** Every action is `Button size="md"`, whose box is `--btn-height-md` 40px, 4px short of `--btn-hit-min` 44px, so every action also sets `extendHitArea` — `Button`'s own mechanism for reaching the floor without changing the box. That is the choice between the two legal means, and it is right here for a specific reason: this block sits directly above `SiteFooter`, whose controls are 40px, and a CTA whose buttons were 48px would make the last two rows of every page disagree by 8px. The extension is a transparent overlay on the control's block axis, so the `--gap-tight` seam between two actions is unaffected and the row does not grow. The component renders no other interactive element; the form's controls and anything inside `proof` reach the floor by their own means.

## 10 · Composition

```jsx
// arrangement="split" — the enquiry close. 56 instances.
<Section surface={surface}>                                    {/* root — band, column, 96 of air */}
  <Layout rowGap="stack">                                      {/* stack — 48: frame to proof row */}

    <Layout columns={{ base: 1, lg: [7, 5] }} colGap="section" rowGap="stack" align="start">
      {/* frame — 96 between the halves (split seam, 1 Oct), 48 when it wraps at 1023 */}

      <Layout rowGap="stack">                                  {/* column — 48: block to block */}
        <Layout rowGap="block">                                {/* lede — 24: label, heading, copy */}
          <p>{eyebrow}</p>                                     {/* eyebrow — no element when absent */}
          <h2 id={headingId}>{heading}</h2>                    {/* heading — --text-h1 scale */}
          <Layout rowGap="text">                               {/* copy — 16: paragraph to paragraph */}
            <p>{body[0]}</p>                                   {/* lead — --text-lead */}
            <p>{body[1]}</p>                                   {/* body — --text-body-lg, ×0-1 */}
          </Layout>
        </Layout>

        <Layout as="ol" rowGap="block">                         {/* points — 24 between steps */}
          <Cluster as="li" nowrap colGap="text" align="baseline">
                                                                {/* point — marker beside label, 30 Sep */}
            <span aria-hidden="true">01</span>                  {/* marker */}
            <div>                                               {/* grows from 0 beside the marker */}
              <Layout rowGap="tight">                           {/* 8: label to detail (S5) */}
                <span>{points[0].label}</span>
                <span>{points[0].detail}</span>
              </Layout>
            </div>
          </Cluster>
        </Layout>
      </Layout>

      <Layout rowGap="stack">                                   {/* the form half */}
        <div>{form}</div>                                       {/* form — brief 09, passed in */}
        <Cluster colGap="tight" rowGap="tight">                 {/* actions — 8 both axes */}
          <Button as="a" href={scheduleHref} emphasis="link" tone="neutral" size="md" extendHitArea>
            See available times
          </Button>
        </Cluster>
      </Layout>
    </Layout>

    <div>{proof}</div>                                          {/* proof — full-width row, or absent */}
  </Layout>
</Section>

// arrangement="open" — the action close. 20 instances. Same slot set; three positions move.
//   frame: with proof   — columns={{ base: 1, lg: [3, 2] }} colGap="section" rowGap="stack"; proof takes the right half
//          without proof — no columns, no colGap, no rowGap: one track, the ask alone
//   points: Layout as="ol" columns={{ base: 1, md: 3 }} colGap="gutter" rowGap="gutter"
//           point: Layout rowGap="tight" — marker ABOVE label
//   actions: in the content column, under the points —
//           Button emphasis="solid" tone="primary" (no glyph since 1 Oct, § 16) then
//           Button emphasis="ghost" tone="neutral"
//   stack: one child, so its 48 seam does not render

// arrangement="offer" — the mid-page audit interrupt. 37 instances. One column, tight band.
//   Section density="tight"; heading at --text-h2; proof is a compile error
//   points: Layout as="ol" columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="gutter"
//           point: Cluster nowrap colGap="text" align="baseline" — marker BESIDE label, as split
//   form optional, under the copy; actions under the points
```

**No hand-rolled grid or flex for arrangement.** Every distance above belongs to a `Section`, a `Layout` or a `Cluster`. The one `inline-flex` in the band is `Button`'s, centring a label and a glyph inside one control box, which is not arrangement and is allowed. `colGap` is stated on `frame` and on `open`'s `points`, which are the only `Layout`s that set `columns`, and on every `Cluster`, which is inline by nature; it is omitted from the five single-track stacks, which have no column seam to size.

**No margins on children, ever.** Zero margins in `CtaSection.module.css`, zero reaches into `--space-*`, and 7(c) says which correction was available and why it was declined.

**Never override `Section` from outside.** No horizontal padding, no `max-width`, no background, no colour, and no `className`, `style` or `id` prop to try any of them with. The only thing the caller decides about the band is which of the four grounds it paints and, through `arrangement`, which of the two densities it takes.

## 11 · Accessibility

**Semantics and elements.** `root` is `Section`'s `<section>`, and here it **is** a labelled region: `aria-labelledby` pointing at the `heading`. That is the opposite of the call `PageHero` made, and the reason is the page count — 37 routes carry two of these, and an unlabelled pair is two identical generic containers at the end of a document. Labelled, a screen reader user gets "Tell us what you are trying to ship, region" and "Request a free audit, region", which is the fastest way to reach the ask on a long service page. `heading` is `<h2>` in all three arrangements. `points` is an `<ol>` because the order is the meaning, each `point` an `<li>`. `marker` is `aria-hidden` — the list already announces position, and "01, A 30-minute call" reads the number twice. `actions` are anchors (`Button as="a"`), because every one of them navigates.

**Keyboard, key by key**

| Key | Behaviour |
|---|---|
| `Tab` | DOM order, which is visual order in every arrangement: any link inside the copy, then the points (nothing focusable), then in `split` the form's fields, its submit, and then "See available times"; in `open` and `offer` the actions, then anything focusable inside `proof` |
| `Shift + Tab` | The reverse, same order |
| `Enter` | On an action, follows its `href` — `Button`'s behaviour as an anchor, not this component's. Inside the form, the form's |
| `Space` | Nothing on the actions. They are anchors and an anchor does not activate on Space; a CTA action always navigates, so making it respond to Space would be making it lie about what it is |
| `Escape` | **Deliberately unbound.** Nothing here opens, so there is nothing to close, and binding it would take it from whatever the page binds it to |
| Arrow keys | **Deliberately unbound.** The points are a list to read, not a list to traverse; there is no selection and no roving index. A CTA that ate an arrow key would have stolen the page's scroll |
| `Home` / `End` | **Deliberately unbound**, for the same reason |

**Focus order, and where focus goes after a state change.** DOM order throughout, and DOM order equals visual order at every width because `frame` collapses by stacking rather than by reordering. **Focus never moves as a consequence of this component**: it has no state changes, nothing opens, closes, toggles or replaces content (section 5). The one place focus does move in this band is on form submission, and that is the form's business — brief 09 owns where focus lands on an error summary or a success message, and this component neither helps nor interferes.

**ARIA attributes, per state.** There are no states, so there is one row: `aria-labelledby` on `root`, always, pointing at `heading`. `aria-hidden="true"` on every `marker`, always. Nothing else — no `aria-current`, no `aria-expanded`, no `aria-describedby`, no `aria-live`. Any ARIA on a control in the band arrives with that control.

**Where ids come from, and what an idref does when its target is absent.** The component generates **exactly one** id, from `useId()`, and puts it on `heading`. `heading` is required and always rendered, which is the only reason `aria-labelledby` is allowed to point at it — the attribute can never dangle, because the element it names cannot be absent. The component accepts no `id` prop, holds no `aria-controls` and no `for`, and generates no id for any optional part; an idref pointing at an optional slot is the failure mode this rule exists to prevent, and the way it is avoided here is by not having one. Ids inside the form and inside `proof` are those components' own, and this component never reads or writes them.

**The focus ring.** `:focus-visible` only, and it is not this component's. `CtaSection` declares no ring token and paints no ring; the rings in the band are `Button`'s and the form's, each measured against its own gap colour on all four surfaces in its own spec. Section 6 says why there is no row for one here.

**Contrast floors, restated.** Every one of the twenty cells in section 6 clears **4.5:1**. The heading at `--text-h2` 43px qualifies for the 3:1 large-text allowance and sits at 14.62:1 on paper anyway, so the allowance is never used and never needed. The loosest cells are 4.91:1 (the points, the eyebrow and the numerals on blue) and 4.92:1 (the eyebrow and the numerals on paper). There is no disabled state in this component, so the disabled exemption is not taken anywhere in it. There is no colour-only state, vacuously: there are no states.

**Reduced motion.** Nothing in this component moves, so `prefers-reduced-motion: reduce` has nothing to switch off and the rendering under it is byte-identical. The stylesheet contains no `@media` block of any kind, including that one.

**What a screen reader actually says.** A `split` instance on a Service L3 page, in browse mode, reading from the region:

> "Tell us what you are trying to ship, region. Next step. Heading level 2, Tell us what you are trying to ship. We reply to every enquiry with a named person and a date, not an acknowledgement. List, 3 items. 1, A 30-minute call. We ask what you have tried and what it cost. 2, A written plan. 3, A fixed price. Send an enquiry, form. Email address, edit text, required. What are you working on, edit text, required. Site or product URL, edit text, optional. Send enquiry, button. Link, See available times."

Three things that string is meant to prove: the region arrives with the heading as its name, so two of these on a page are two distinguishable landmarks; the numerals are not read twice, because `marker` is hidden and the `<ol>` supplies the position; and "See available times" is announced as a link and not as a second submit, which is what `as="a"` buys.

## 12 · Content edge cases

| Case | Required handling |
|---|---|
| **1 · Longest realistic string** | The longest ask in the corpus is a tailored per-page-type label — `Discuss the relevant project` at 28 characters, and section 17 Q1 is the reason a longer one may arrive. A `Button` label never wraps and never truncates; the `actions` `Cluster` wraps to the next line instead, at `--gap-tight`. In `split` the actions sit in the 470px form column, which holds a 28-character `md` label on one line with room to spare; two such labels wrap to two rows, which is why the constraint that a form instance carries exactly one action matters geometrically as well as editorially. The `heading` wraps inside `--measure-title` to three lines at most and the lines **balance** rather than leaving one word alone on the last |
| **2 · One long unbroken token (a URL)** | Every text part breaks inside a word rather than overflow — `eyebrow`, `heading`, `lead`, `body`, `label`, `detail` alike. The band never produces a horizontal scrollbar, at any width, for any content. The heading is included deliberately: a 60-character unbroken token in an `h2` is a content fault and should look like one, but it must not take the page's layout with it. A `Button` label is not in this list: it is typed `string` and a URL in it is a copy bug that shows as a wide button |
| **3 · Zero items** | `points={[]}` renders no `<ol>` and no `--gap-stack` seam, because a `Layout` gap exists only between rendered children — 20 of the 113 instances are expected to be pointless in exactly this way. `actions` empty is legal only when `form` is present (section 3), and then the scheduling link is still rendered, so the `Cluster` is never empty. `body` empty and `points[n].label` empty do not compile |
| **4 · One item** | One point renders one `<li>` and no seam; in `open` it renders one track of a three-track grid and sits left, not centred, because a lone centred step reads as a caption. One action renders one `solid` / `primary` `Button` and no `ghost` — the second emphasis is a consequence of a second entry, not a slot waiting to be filled. One paragraph renders `lead` only |
| **5 · Many items (2× expected)** | Three points is the expected count; six is 2×. No cap, no truncation, no warning. In `split` the vertical list grows and the content column gets taller than the form, which is correct — `align="start"` means the form does not stretch and the band grows. In `open` six points render as two rows of three at `--gap-gutter` on both axes, which is what `columns={3}` does and is the reason `equalRows` is not set: a step with a two-line detail should not pad the two beside it. In `offer` six points render as two rows of three at `--gap-gutter`, and four or five as a full first row with the rest starting under its first label — amended 29 Sep 2026; the `Cluster` this replaced wrapped by content width, so row two did not align with row one. Six is where a reviewer should ask whether the block is still an ask (section 17 Q6) |
| **6 · Missing image or missing optional slot** | There is no image slot: this component holds no image, requests none, and section 17 Q7 says why a logo row inside `proof` is `Proof`'s question and not this one. For the five optional slots the rule is one sentence and it is the most important one in this section: **an absent slot renders no element and no seam.** `eyebrow` absent → `lede` has two children and the heading sits at the top of the band with only the band's padding above it. `points` absent → no `<ol>`. `form` absent → no form column, and `frame` renders one track (which is `open`). `proof` absent → no full-width row in `split`, and `stack`'s 48 seam does not render; in `open` no right-hand column — `frame` is one track, not a 3:2 frame with an empty half. `body[1]` absent → `copy` has one child and shows no seam. No instance ever renders a 48px gap above nothing |
| **7 · Empty required-ish text** | `heading=""` renders the `<h2>` anyway, empty — and `aria-labelledby` then names an empty element, which exposes the region as unnamed. That is worse-looking than a placeholder and it is deliberate: **no fallback copy, ever**, because a fallback is how a content fault ships to 76 routes. An empty string in `body` or in a `label` is filtered before render, producing no element and no seam around nothing |
| **8 · The narrow track at 767** | The band stays full width; the content column becomes the viewport less `--sec-gutter` each side. `frame` is already single-track (it collapsed at 1023). `open`'s points collapse to one track at `--gap-gutter`. `offer`'s points collapse to one track at `--gap-gutter`, each numeral still in its own track beside its label; the `actions` `Cluster` wraps on its own. Both `--measure-*` values exceed the column and go inert, which is correct and needs no rule. The heading wraps to more lines and `--text-h2` re-declares itself in the type layer **[assumed]**, not here. Nothing reorders |
| **9 · A parent that does not size it** | This is a band and may only be a direct child of the page or its template. It must not be placed inside a `Section` (the content column would inset twice), inside a `Layout` track (a band is not a row), or inside a `Cluster` (a wrapping row does not size a band, and the block would shrink to its longest word). For the case where it happens anyway, the named minimum is **320px, `--lay-track-md`** — the width at which the longest single word in a corpus heading still fits without overflow at the 767 type scale. Below 320 it renders and breaks inside words rather than overflowing, and the real `EnquiryForm`, whose `--enq-form-min-inline` is 256px, is the part that shows the fault first |
| **10 · Logical properties rather than left/right** | Every distance in the component is a `Layout` or `Cluster` gap, which are logical by construction, or a measure, which is `max-inline-size`. There is no `margin`, no `padding`, no `left`/`right` and no positioned part anywhere in the stylesheet, so there is no physical-direction property to get wrong. "Content-left / form-right" is `columns={[3, 2]}` in source order and mirrors correctly under RTL with no work, which is the cleanest available answer to this row |
| **11 · This component's surface nested inside a different one** | Addressed in section 6. The band is the `[data-surface]` scope and all five tokens are declared in all four blocks, so a `tint` CTA between two `ink` bands renders the tint column at 11.81:1 rather than a light ink stranded on a light ground at 1.13:1. Inside the band, the form and `proof` read `--sec-*` from this band's surface. Neither slot may contain a `Section` — the column would inset twice — nor a `Breadcrumbs`, nor a `PageHero`, nor another `CtaSection` |
| **12 · Two of this component adjacent** | **The normal case, on 37 routes** — and the constraint is that they must not look identical, so it is enforced by shape rather than by review: the mid-page instance is `offer` (tight band, a photograph or a beside head, no proof) and the closing instance is `split` or `open` (96px band, a form or a 3-up row of ruled points, the `closing` texture — both headings are h2 since 6 Oct 2026, so scale is no longer a difference; proof available — scales amended 29 Sep 2026). Two instances of the **same** arrangement on one route is the bug; the component cannot detect a sibling — no `:has()`, no upward selector — so section 14 item 15 names the frontmatter grep that catches it. An `offer` and a standard close placed directly adjacent produce 160px of facing band air (64 + 96); two adjacent standard closes produce 192px (96 + 96). Both are invalid because the real mid-page placement always leaves page content between the two `h2`s |
| **13 · Interactive content inside a slot** | `form` and `proof` may both hold interactive content, and the first one always does. It enters the tab order in DOM order and the component adds no `tabindex`, no focus trap and no roving index. Anything focusable there reaches the 44px floor by its own means. The other slots **cannot** hold interactive content, and that is a compile-time guarantee rather than a rule: `heading`, `eyebrow`, every entry in `body`, and both fields of every `CtaPoint` are typed `string`, so no element — no control, no link, no second heading — can be passed into them. `CtaAction` is `{ label: string; href: string }` for the same reason: a `ReactNode` label is how an icon, a `<br>` and eventually a nested button get into a control |

## 13 · Motion

**Nothing in this component transitions, and nothing in it moves.** It has no states (section 5), so there is no value to interpolate between. `CtaSection.module.css` declares no `transition`, no `transform`, no `animation`, no `opacity` and no height change, and section 14 names the grep that proves it.

The only motion in the band belongs to the controls: `Button`'s colours on `--duration-fast` with `--easing-standard`; the scheduling action's `link` emphasis also wipes its rule in along its own axis, which is the system's one motion precedent. The form's own controls inherit the same duration and easing through their own tokens.

**What does not move, explicitly:** the heading does not rise or fade on scroll; the points do not stagger; the numerals do not count up; the form does not slide in; the band does not animate its height when the form's error summary appears (the band grows, instantly, because nothing here animates height); the actions do not scale, lift or shadow on hover. A scroll-triggered entrance on the closing block is the single most-requested CTA motion and it is refused: it delays the ask, it fires at the moment the reader has decided, and it would be a second motion precedent, which the brief says must be asked for rather than assumed. If it is genuinely wanted it is a NEW MECHANISM REQUEST with its own argument.

**Reduced motion.** Nothing to switch off. Under `prefers-reduced-motion: reduce` this component renders identically, and there is no `@media` block in its stylesheet to express that with — the identity is structural, not conditional.

## 14 · Do's and Don'ts

**Do**

1. Every instance with a form renders exactly one "See available times" anchor — grep the built HTML per route for the string and expect a count equal to the route's form-instance count (1 on 55 routes, 2 on the one route that has two forms).
2. That anchor is an `<a href>` and never a `<button>`, and its `href` is not the current route — assert in the rendered DOM. It is the check that proves the booking widget is not loaded with the form.
3. Every instance renders exactly one `<h2>` for its own heading, and `aria-labelledby` on the `<section>` resolves to a non-empty accessible name — assert in the rendered DOM on all 113 instances.
4. Every route with a mid-page instance renders `offer` for it and `split` or `open` for the closing one — diff the frontmatter against the rendered `data-arrangement` attribute on all 37.
5. An absent slot renders no element — with `points` undefined, the rendered DOM contains no `<ol>`, and the computed distance between `lede` and `actions` equals `--gap-stack` exactly once, not twice.
6. Every action is `Button size="md"` with `extendHitArea` — each action's computed box height is 40px and its rendered hit area is 44px. Assert both; an action missing the extension is the one failure this component can ship that a screenshot will not show.
7. `points` renders as an `<ol>` with an `<li>` per entry and an `aria-hidden` numeral in each when the markers are numbers (the default); under `markers="icon"` or `"plain"` it is a `<ul>`, because those points are contents rather than a sequence (6 Oct 2026). Assert in the rendered DOM. A `<div>` role-listed is a diff comment.
8. The component's stylesheet contains no `background` and no `padding-inline`; there is no `.offer` class and no arrangement remap at all (6 Oct 2026: every heading is h2); the nine `color` declarations belong to text parts and to the icon marker's wrapper (`.glyph`); and the six `max-inline-size` declarations belong only to `eyebrow`, `heading`, `lead`, `body`, `detail` and `detailReading`, using the two approved `--measure-*` roles. Strip comments, grep each declaration and inspect its selector. This is "must not own its ground", as a check.

**Don't**

9. No margin on any node this component renders — grep `CtaSection.module.css` for `margin` and expect zero matches.
10. No media query — grep for `@media` and expect zero matches, including the reduced-motion one. The two breakpoint changes are `Layout` `columns` objects in the TSX, and the grep for `@media` in the TSX is zero too.
11. No motion — grep for `transition`, `transform`, `animation` and `opacity` and expect zero matches.
12. No state token — grep the token file for `--cta-` followed by `-hover`, `-pressed`, `-expanded` or `-disabled` and expect zero matches.
13. No pixel literal in the stylesheet outside the sizes 7(b) names — grep for `px` and reconcile every hit against that eight-row table. There should be none: every value in the file is a token reference.
14. Exactly **two** `text-transform` declarations, and both read the token — grep for `text-transform` and expect `var(--text-mono-case)` on the `eyebrow` and on the `marker`, this component's two mono parts, and nowhere else. A literal `uppercase` is a failure rather than a synonym. **Amended 25 Aug 2026:** this check read "exactly one, `uppercase`, on `eyebrow`" before mono's case moved to the token layer.
15. No route renders two instances of the same arrangement — grep the frontmatter for routes declaring two CTA blocks and assert the pair is `offer` plus one other.
16. No `Section`, `PageHero`, `Breadcrumbs` or `CtaSection` inside `form` or `proof` — grep the call sites.
17. No `CtaSection` inside a `Section`, a `Layout` or a `Cluster` — grep the call sites; it is a band and takes only the page as its parent.
18. No `line-clamp` and no `text-overflow` — grep and expect zero matches, which is edge case 1 and 2 as a check.
19. No second `emphasis="solid"` in one instance — grep the rendered DOM per instance for solid buttons and expect at most one, the form's submit included.

## 15 · Specimen plan

The block list for `/design/cta-section`, in order.

1. **The matrix**, printed as section 4's slot table beside three live renderings — `split`, `open`, `offer` at the one size — so the reader sees the argument that collapsed eleven arrangements into three before they see any rendering. Beside it, the eight rejections as a list with their reasons.
2. **The form ladder** — `split` with the real `EnquiryForm` project variant (49 routes); `split` with its audit variant (7); `offer` with the audit variant (7 of the 37); `offer` with no form, actions only (30); `open` with two actions (20). Each labelled with its corpus count, so a reviewer can see that the actions-only case is a fifth of the site and not an edge case.
3. **The ask ladder — the accepted copy decision, rendered.** The `split` instances use the real `EnquiryForm`, which owns the fixed `Send enquiry` / `Request free audit` submit copy from brief 09. The `open` instances render the CTA action standard fallbacks (`Start a project`, `Request free audit`) and the two longest tailored labels (`Discuss the relevant project`, `Apply the decision`). This records both copy contracts without using a specimen-only form.
4. **The points ladder** — 0, 1, 3 and 6 points, in all three arrangements: twelve bands, each labelled. The `split` column at 3 points is the brief's open question rendered; the `open` row at 6 is the two-row case that proves `equalRows` is off.
5. **States: none to force**, as a printed note. There is no state on this component to point at, hold or tab to. Hover, pressed and tab focus exist on the `Button`s and on the real `EnquiryForm` controls; their lifecycle remains owned and exhaustively tested on `/design/button` and `/design/enquiry-form` rather than forced through CTA-only props.
6. **All four surfaces as sibling bands with identical markup** — the same `split` instance rendered four times, `paper` · `tint` · `ink` · `blue`, with section 6's per-surface paragraph printed beside each band. The 4.39:1 failure that moved the eyebrow and the numerals on tint is annotated on the tint band, because that is the one cell a future reviewer will want to lighten. The blue band carries the note that its primary action cannot be blue.
7. **The nested-surface band** — a `tint` CTA between two `ink` bands, and an `ink` CTA between two `paper` bands, each with its five resolved values listed, plus a form and a `Proof` inside each so the two slots' inheritance is a rendering rather than a claim.
8. **The proof ladder** — `Proof` with figures only (the `Stat` case), quote only (the `Testimonial` case), and both (the `/how-we-work` case), each shown in `split`'s full-width row and in `open`'s 470px column. Six bands, and they are the argument for section 1's collapse of two briefed components into one. Then **`open` with and without proof**, the same close twice, so the one-track frame is seen against the 3:2 one at 1440 and 390.
9. **The two-per-page band** — a full page fragment: an `offer` mid-scroll, two paragraphs of `Prose` between, then a `split` close, on the surfaces they would really take. Annotated with what makes them not look identical: 64 against 96 of band air, `--text-h2` against `--text-h1` (amended 29 Sep 2026), a grid of points against a vertical list, no proof against proof.
10. **The wrong version of the same band** — two `split` instances on one page, labelled "this is the bug section 12 row 12 names", with the 192px of facing band air and the two `h2`s measured.
11. **Every edge case from section 12**, each labelled with its row number: the 28-character and 60-character labels; a bare URL in `body[1]`; `heading=""` with its unnamed region annotated; an empty string in a point label; the 1023, 767 and 375 columns; the 320px floor and a 256px sub-floor.
12. **Interactive content in `proof`** — a `Proof` whose quote carries a link, with the tab order annotated: copy, actions, proof.
13. **The component in a narrow track** — 320px and 256px, both marked as illegal placements, with the rendering shown rather than described.

**The squint test.** The route reads as five shapes: a three-up arrangement matrix, a tall ladder of form variants, a four-surface stack of wide two-column bands, a dense proof grid, and a stress list of narrow columns. Not one rectangle repeated.

## 16 · New token requests

**None — every value in this spec is an existing token.**

The five `--cta-*-ink` and seven `--cta-*-text` declarations are this component's own component-layer tokens, which is the layer the system expects a new component to add: each resolves to a `--color-*` or `--text-*` name that appears verbatim in `guidelines/docs/vocabulary.md`, and they are enumerated in sections 6 and 8 rather than requested here. A component token is not a new token in the sense this section means; a new `--color-*`, `--gap-*`, `--text-*` or glyph would be.

Four values were checked against the ramps and found, and the near-misses are worth recording because each one is a request someone will otherwise make later:

- **A step between `--gap-gutter` 32 and `--gap-stack` 48** for the seam between the two halves when `frame` wraps. Declined: `--gap-stack` is the block-to-block step and a wrapped half is a block, so 48 is the relationship and not a compromise. A new step here would be splitting the difference, which is forbidden.
- **A dedicated measure role for the point labels.** Declined: `label` needs no measure at all, because its track caps it in all three arrangements.
- **A `--cta-rule` hairline above the proof row.** Declined on the design bar, and the 48px seam does the work. Its absence is why `--border-width-0` is a decision in 7 rather than an omission.
- **A glyph for the point markers** — a numbered-circle or a `check`. Declined: `check` is in the glyph set but means "included", not "third", and the points are a sequence. Two-digit mono numerals carry the order and need no glyph, so this component requests none. It rendered `arrow-right` on the primary action until 1 Oct 2026; it now renders no glyph.

## 17 · Open questions

**1 · The ask itself — two labels or ten tailored ones. — ANSWERED, 21 Aug 2026**

The content uses two labels: `Start a project` (72 instances) and `Request free audit` (38). The sitemap specifies ten tailored per-page-type asks instead — `Discuss the relevant project`, `Apply the decision`, and eight more. The accepted rule is to use a tailored ask where the sitemap specifies one and fall back to the two standard labels otherwise.

- **(a) The two-label set.** Two strings, 18 characters at the longest, one `md` button each. Every instance of the same page family asks the same thing, which is what makes a site feel like one site.
- **(b) The ten tailored asks.** Up to 28 characters, and a label that means something specific on the page it is on. Ten strings to keep in sync with ten page types, and the closing action on `/services/x` no longer matches the one on `/services/x/y`.
- **(c) Both: tailored where the sitemap specifies one, the two-label set as the fallback.** Which is ten strings *and* two, with the ambiguity landing on whoever writes route 77.

**Owner decision — accepted 21 Aug 2026: (c).** Use tailored labels where the sitemap specifies one; otherwise use `Start a project` and `Request free audit` as fallbacks. The page/content layer selects the label; `CtaSection` still accepts a string and does not encode the copy table.

**What this spec does about it, so that implementation is not blocked on the geometry.** It is specified against **both**: `CtaAction.label` is a `string` with no length cap; a `Button` label never wraps or truncates; the `actions` `Cluster` wraps at `--gap-tight` instead; and section 12 row 1 measures the 28-character case in the narrowest place it can land, the 470px form column of `split`, where it fits on one line. So no geometry in this document changes with the answer.

**What is now resolved.** The specimen route renders tailored labels and the two standard fallbacks within the same accepted geometry. No component API or token decision changed as a result of the copy choice.

**2 · Whether the proof slot takes a `ReactNode` or a typed union. — ANSWERED, 21 Aug 2026**

**A `ReactNode`, and the tier rule decides it rather than taste.** A typed union — `proof: StatProps | TestimonialProps` — would require this pattern to render those patterns, and a pattern may not import a pattern; lint fails the build on it. The union would be a type describing components the component is forbidden to construct. So `proof: ReactNode`, the caller passes `<Proof … />` in, and what makes that honest rather than open-ended is section 1's finding that there is exactly **one** thing it holds. The typed-union instinct was right about the arity and wrong about the mechanism.

Non-blocking. Nothing here is gated.

**3 · Whether `Stat` and `Testimonial` collapse into one `Proof`. — non-blocking here, BLOCKING for briefs 15 and 17**

Section 1 specifies the three together and concludes one component with a `figures` slot and a `quote` slot, either of which may be empty. Options: two components as briefed; one `Proof` as specified here; or three, adding a rating component.

**Recommendation: one `Proof`.** `/how-we-work` and `/clients` already render a rating, review themes and a client quote as one block, which neither briefed component can do alone, and building both duplicates the attribution, the surface table and the narrow-track behaviour. `CtaSection` is unaffected either way — it takes a `ReactNode` — which is why this is non-blocking here and needs deciding before either of those two is built.

**4 · An `<h2>` at `--text-h3` scale in `offer`. — non-blocking**

There is no `Heading` component, headings are bare `h1`–`h6` styled by base rules, and the tier rules require this to be raised rather than invented. `offer` needs an `h2` element — it is a section-level block on the page, and its heading must not sit below the article's `h3`s in the outline — set at `--text-h3` scale, because a 43px serif heading mid-article competes with the page's own `h2`s.

- **(a)** As specified: `<h2>` with `--cta-heading-text` re-declared to `--text-h3` under the arrangement's class. One component token, two values, no new mechanism.

**Amended 29 Sep 2026 (tracker 2.17):** the mechanism in (a) stands; the values moved one rung. The close is now `--text-h1` and `offer` `--text-h2`, which is the same one-step relationship. That does put `offer`'s heading at the page's own `h2` scale, which this question set out to avoid, and it is taken knowingly: with the points at `--text-stat` numerals, a 34px `offer` heading was smaller than the 40px marks under it, and a heading outweighed by its own list is a worse fault than a mid-page ask that matches the page's section headings. Reverting is the two-line `[data-arrangement='offer']` block in `cta-section.css`.
- **(b)** `<h3>` in `offer`, matching the scale to the level. Cheaper, and wrong: it puts the mid-page ask inside whatever `h2` precedes it in the outline, which on a Service L3 page is usually a list of deliverables.
- **(c)** A `headingLevel` prop. Refused in section 3 — it is how a second `h1` eventually reaches a page.

**Recommendation: (a).** Level and scale are different questions and the type layer is the right place to answer the second one. It is non-blocking because it changes one declaration.

**5 · "Must not own its ground", and whether `surface` may be a prop at all. — non-blocking**

Two readings. **(a)** The one taken: the constraint forbids the component painting a ground — no `background`, no panel, no tint band — and the `surface` value is handed to `Section`, which paints. **(b)** The stricter one: the component takes no `surface` at all and the page wraps it in its own `Section`, making this a content block rather than a band.

**Recommendation: (a).** (b) would make every one of 113 call sites responsible for remembering a `Section` with the right density, which is 113 chances to get the band wrong, and it would put `arrangement="offer"`'s tight density outside the component that decides it. `Breadcrumbs` and `PageHero` both took (a) for the same reason. Section 14 item 8 is the check that keeps (a) honest.

**6 · Whether `points` should be capped. — non-blocking**

Three is expected; the corpus maximum a route could reasonably declare is unbounded. Options: no cap, as specified; cap at four and drop the rest; warn in development.

**Recommendation: no cap.** A cap loses content silently and a warning is a mechanism this system does not have. Beyond about four, the block has stopped being an ask and become a process section, which is a review comment on a route.

**7 · Whether `proof` will need a client-logo row. — non-blocking**

Not in this component either way: a logo row is a third slot on `Proof`, or it is `Logo` instances inside its `figures` slot. It is raised here only because it is the first thing anyone will ask for after this ships, and because there is no image component and no `next/image` precedent anywhere in the codebase — so if the answer is real images rather than `Logo`, aspect ratio, crop behaviour and empty state all need deciding before `Proof` is built.

**Recommendation: `Logo` instances in `figures`** until someone needs a mark `Logo` does not have.

**8 · Whether the mid-page `offer` should be allowed a `proof`. — non-blocking**

Specified as a compile error. Options: as specified; allow it; allow it only when the closing block has none.

**Recommendation: as specified.** The third option is a rule no type can express and no component can check — it needs to know about its sibling, and nothing here may look upward or sideways. The first is a type. On the 37 routes that carry two blocks, proof appearing once is what keeps the second one from reading as a repeat.

---

## Appendix — self-audit

```
STRUCTURE
[x] All 18 sections present, in order, with the exact headings.
[x] Front matter states Tier 2 pattern, Status implemented, and token prefix
    --cta-*, which collides with none of the nine taken prefixes and with no primitive family.
[x] Every part named in Anatomy appears in the colour table, the geometry list, or both.
    Eighteen parts: five carry colour and are the five rows of section 6 (four parts share
    two tokens — lead and body on --cta-body-ink, label and detail on --cta-point-ink); nine
    carry distance only and are the nine component rows of 7(a); two (form, proof) are
    explicitly marked as carrying no value of their own.

NAMES
[x] Count of distinct token names used: 60. Every one appears verbatim in
    guidelines/docs/vocabulary.md, or is a --cta-* component token this spec declares. I
    checked them ONE AT A TIME, not by pattern. They are: 14 --color-* (paper, paper-deep,
    white, neutral-100/300/400/600/700/800/900/950, brandeis-50/100/500); 12 --cta-*
    component tokens declared here (5 ink, 7 text); 7 --gap-* (inline, tight, text, block,
    gutter, stack, column); 12 --text-* (eyebrow + tracking, h2 + tracking, h3 + tracking,
    micro + tracking, lead, body-lg, body, body-sm); 2 --measure-* (title, body); --radius-0;
    --border-width-0; --shadow-none; --z-base; 4 --sec-* referenced (container, gutter,
    padding-y, padding-y-tight); --lay-track-md referenced as a measuring stick; 2 --btn-*
    referenced (height-md, hit-min); --foot-field-min-inline referenced as a measuring stick;
    2 motion tokens referenced as Button's (--duration-fast, --easing-standard). Two further
    names appear only as things this component does NOT declare (--sec-ground, --sec-ink,
    --sec-ink-label) and are in the vocabulary too.
[x] Every glyph I named is in the glyph set: arrow-right, on the primary action in `open` and
    `offer`. `check` is named once, in section 16, as a glyph considered and declined. No new
    glyph is requested.
[x] Every prop and every prop VALUE I gave for Section, Layout, Cluster and Button appears in
    the prop unions above: Section surface|density tight; Layout as|rowGap
    stack|block|text|tight|inline|gutter|colGap column|gutter|columns {base,lg}/{base,md} with
    1 and [3,2] and 3|align start; Cluster as|colGap tight|block|rowGap tight|block|align
    baseline; Button as|href|emphasis solid|ghost|tone primary|neutral|size md|icon|
    extendHitArea. `equalRows` is named once, as a prop deliberately NOT set.
[x] Zero hex codes / rgb() / hsl() / colour words outside the contrast measurements. The
    hexes appear nowhere in this document; the ratios computed from them are in section 6.
[x] Zero Tailwind class names. Zero CSS declarations, selectors or @media blocks. Sections 13
    and 14 name properties as things ABSENT from a stylesheet, which is a testable claim about
    a file rather than a declaration.
[x] Every --text-* role I paired with a tracking companion is on the list that has one:
    --text-eyebrow, --text-h2, --text-h3, --text-micro. The four that have none are marked
    "none — this role has no tracking companion": --text-lead, --text-body-lg, --text-body,
    --text-body-sm.
[x] Every layout distance is a gap-scale role name, referred to by name. The seven steps in
    7(a) are the only distances in the component, and 7(a) also names the two --sec-padding-y
    values as Section's rather than this component's.
[x] Every space-ramp reach carries its justification sentence. Count: 0. Section 7(c) names
    the one correction that was available — the mono numeral's optical rise against a sans
    label — and argues it down on two grounds.
[x] Every literal pixel value is a component size or a container cap, t-shirt named, and says
    what it was measured against. Count: 8, all in 7(b) — three declared (the two measures
    resolved to px for the reader, the 40px control height) and five computed consequences
    (706, 470, 392, 320, and 256 quoted from --foot-field-min-inline). The 160px and 192px of
    facing band air in section 12 row 12 are respectively 64 + 96 and 96 + 96, all Section's,
    and are named as visual tells rather than as values this component sets.

COLOUR AND CONTRAST
[x] The colour table has one row per token and four columns: paper, tint, ink, blue.
[x] No cell is empty, "same as paper", or a delta. Rows: 5 × 4 cells = 20.
[x] Every text colour has a measured ratio against the exact ground it sits on. There is no
    hover fill and no pressed fill in this component — no --cta-*-bg-* token exists — so there
    is no fill to measure against, and that absence is stated as an assertion. The fills that
    DO appear in the band are Button's and the form's, measured in their own specs.
[x] Every text ratio is >= 4.5:1. The loosest are 4.91:1 (point, eyebrow and marker on blue)
    and 4.92:1 (eyebrow and marker on paper). The disabled exemption is not used, there being
    no disabled state. The large-text 3:1 allowance is not used either, though the h2 at 43px
    would qualify for it.
[x] The focus ring is measured against its own gap colour on every surface — in Button's spec
    and in the form's, not here. This component declares no ring token and paints no ring,
    because nothing it renders can take focus. Section 6 states that as the assertion.
[x] Decoration is marked rather than left blank — vacuously: there is no decoration. Section 6
    argues the one arguable case, the marker numeral, INTO the table at the 4.5 floor rather
    than out of it. Sections 2 and 16 record that the rule and the panel were both drawn and
    both cut, which is why --border-width-0 and --radius-0 are decisions.
[x] One paragraph per surface explains what moved and why. Four paragraphs, and the tint one
    carries the measured 4.39:1 failure that moved the eyebrow and the numerals.
[x] The nested-surface case is addressed, with the 1.13:1 failure named and the rendered
    11.81:1 given, plus the rule that neither slot may contain a Section and the note that the
    form and Proof inherit --sec-* from this band.

STATES
[x] Every state I claim comes from the fixed model — I claim none, and section 5 walks all
    seven rows and says why each does not apply, part by part.
[x] The rendered hover state differs from the rendered pressed state on all four surfaces —
    answered rather than dodged: this component has no rendered hover and no rendered pressed,
    so there is no pair that could be identical. Button and the form's controls satisfy the
    rule in their own specs, and they are the only things in the band a pointer can reach.
[x] Every state token I introduced MOVES on at least one surface — I introduced none. Zero
    --cta-*-hover, -pressed, -expanded and -disabled tokens exist, and their absence is the
    assertion that this component renders as a function of its props alone.
[x] Every state token is declared on all four surfaces — vacuously, there being none. All
    twelve tokens that DO exist are declared by the component layer; all five surface-dependent
    ink tokens are repeated in every surface block, and the seven text tokens are shared in `:root`.
[x] Disabled uses its own tokens and no opacity — vacuously; opacity appears nowhere and
    section 14 item 11 names the grep. No colour-only state, there being no state.

LAYOUT, TYPE, SEMANTICS
[x] Every arrangement is a Section, Layout or Cluster. colGap is stated on the two Layouts
    that set columns (frame, and open's points) and on every Cluster; it is omitted from the
    five single-track stacks, which have no column seam to size.
[x] No margin on any child, anywhere in the spec. Zero margins and zero space-ramp reaches —
    7(c), 10, 12 row 10 and 14 item 9 each say so.
[x] No media query changes a gap step or a type role. There is no media query in this
    component at all: the two breakpoint changes are Layout `columns` objects, which is the
    primitive's own mechanism, and section 9 lists what must not change at 1023 and 767.
[x] Every part carrying running text names a measure: heading takes --measure-title; lead,
    body, eyebrow and detail take --measure-body; label takes none, and section 8 says why.
    7(b) records which measures are inert in which arrangement.
[x] Every interactive target reaches 44px on touch, by extending the hit area past the box
    rather than stepping the size up: Button size="md" is --btn-height-md 40px with
    extendHitArea reaching --btn-hit-min 44px. Section 9 says which of the two legal means was
    chosen and why the other would have put this block 8px out of step with SiteFooter.
[x] Every ARIA idref I specified points at an element that is ALWAYS rendered:
    aria-labelledby on the root points at `heading`, which is a required prop and cannot be
    absent. That is the only idref in the component; it generates exactly one id, from
    useId(), and accepts none. Section 12 row 7 says what the attribute exposes when the
    heading string is empty.
[x] No selector walks upward; no :has(); every state a parent needs is a prop or a class. The
    two things a parent might want to detect — two instances of the same arrangement on one
    route, and a Section inside a slot — are frontmatter greps and call-site greps (section 14
    items 15 to 17), because the component cannot and must not look outward. `arrangement` is
    emitted as a data attribute so the check has something to grep.

COMPLETENESS
[x] All thirteen content edge-case rows answered — none skipped, none "n/a" without a reason.
    Row 6's image half is answered by this component holding no image and by Q7 rather than
    waved off; rows 3, 7 and 13 are answered partly by the type system, which is stronger than
    a runtime handler.
[x] The "parent that does not size it" row names a minimum: 320px, --lay-track-md, plus the
    rule that a band takes only the page as its parent, plus which part shows the fault first.
[x] Do's and Don'ts are testable: each of the 19 names the grep, the rendered-DOM assertion or
    the call-site diff that decides it.
[x] The specimen plan renders all three arrangements at the one size, the form ladder with its
    corpus counts, both label regimes for the blocking question, the points ladder in all
    three arrangements, all four surfaces as sibling bands with identical markup, the
    nested-surface band, the proof ladder that argues section 1's collapse, the two-per-page
    page fragment and its bug twin, every edge case above, two adjacent, and two illegal
    narrow tracks. It states that no state can be forced, and why looking for one would be a
    mistake.
[x] Section 16 says None, with the reading of why --cta-* declarations are not requests, and
    records four near-miss requests with the reason each was declined.
[x] Every open question has options, a recommendation, and a BLOCKING / non-blocking mark. No
    CTA question remains BLOCKING: Q1 was answered by the owner on 21 Aug 2026 — tailored
    labels where specified, with the two standard labels as fallbacks. Q2 and Q3 remain
    non-blocking for this build.
[x] Squint test: the block reads as four ideas in three families — a serif ask, a grey
    paragraph, a numbered sequence in two sizes, and a form or a figure row at --text-stat —
    and the three arrangements put those four in three different places. The specimen route
    reads as five shapes, not one rectangle repeated.
```
