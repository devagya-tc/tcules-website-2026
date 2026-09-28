# ContentSection

## 0 · Front matter

| | |
|---|---|
| **Component** | `ContentSection` |
| **Tier** | 2 pattern (`src/patterns/ContentSection/`) |
| **Status** | approved — the `beside` arrangement implements ruling **O2** (`docs/phase-2-decisions.md`: head beside body is *static, not sticky, head 1 : body 2, from 1024 up*). No BLOCKING question is open (§17). |
| **Token prefix** | `--csec-*` |
| **File** | `tokens/components/content-section.css` |
| **Designer / date** | Claude Code · 28 Sep 2026 (Phase 2 task 2.13) |
| **Implements** | `docs/briefs/07-content-section.md` (the band every long page is made of) · `docs/component-audit.md` §3 ContentSection: *"Extend. Add a head arrangement: head beside body ([1,2] from lg), as well as head above."* · ruling O2 |
| **Implemented at** | `src/patterns/ContentSection/` · `src/styles/tokens/components/content-section.css` · specimen `src/app/design/content-section/page.tsx` |

This spec is written **after** the component, not before it. `ContentSection` shipped without one
(brief 07 was never pasted into Claude Design; the component was built directly to fix the flat
`rowGap="stack"` composition every long-form route used). It records today's behaviour and the one
extension Phase 2 adds: the `arrangement` prop, `stacked | beside`.

**Nothing new is needed beyond one prop.** The audit's §4 composition table routes five jobs through
this component — Situation, Capability set, Mechanism, Related content, Rich explanation — and the
thing that stops those five reading as one repeated shape is an arrangement, not a new pattern. The
`beside` arrangement is one `Layout`'s props. It adds no token, no module class, no state and no ARIA.

## 1 · Identity

`ContentSection` is **one CMS section as one band**: an optional eyebrow, one optional `h2`, an
optional lead, then the blocks the caller hands it as children. It exists for the rhythm — the head
group nests at 8 and 24 so it reads as one object, and the blocks are a separate 48 beat beneath (or,
under `beside`, 64 beside) it. A flat `Layout` cannot say that.

It is a Tier 2 pattern because it composes `Section` and `Layout` (a primitive may not import a
sibling primitive), and because it consumes a content shape — the section record's heading, anchor
id, eyebrow and lead.

What it is **not**:

1. **Not a page opening.** The one `h1` and the page's first statement are `PageHero`'s.
2. **Not a close.** The page's ask, its action and its what-happens-next are `CtaSection`'s. A band
   that carries a button group or a form is a `CtaSection`.
3. **Not a block.** It never renders cards, lists, prose or figures of its own; the children do
   (`BlockCard`, `ListCard`, `Prose`, `Figure`, `Accordion`, `Proof`, `Callout`). It never
   enumerates what may go in its body slot.

Nearest existing thing: `Section` itself, which this composes. The grouping is not a `Section` prop
because `Section` is a primitive that knows nothing about headings; a heading slot on it would weld
type roles into the band primitive.

Frequency: many per page. A service page runs 5–11 in sequence, which is why the arrangement
matters: the same silhouette eleven times fails the squint test however correct each band is.

## 2 · Anatomy

| Part | Element | Required | Notes |
|---|---|---|---|
| `band` | `section` when labelled, else `div` | yes | `Section`. `section` only when `heading` **and** `headingId` are both present, with `aria-labelledby` pointing at the heading. |
| `head` | `div` (a `Layout`) | no | Rendered only when at least one of eyebrow, heading, lead is present. |
| `eyebrow` | `p` | no | Mono label above the heading. Class `.eyebrow`. |
| `heading` | `h2` | no | Class `.heading`. `id={headingId}`. |
| `lead` | `p` | no | Class `.lead`. One sentence under the heading. |
| `body` | `div` (a `Layout`) | no | Rendered only when `children` has at least one renderable child. Each child is one row at `--gap-stack`. |

The class names `.eyebrow`, `.heading`, `.lead` are the token `{part}` slots
(`--csec-eyebrow-*`, `--csec-heading-*`, `--csec-lead-*`). `head` and `body` carry no token: they
are arrangement, and arrangement is `Layout`'s.

## 3 · Props / API

| Prop | Type | Default | Decides |
|---|---|---|---|
| `heading` | `string` | — | The band's `h2`, verbatim. A string, not a `ReactNode`, so a second heading cannot be smuggled in. |
| `headingId` | `string` | — | The heading's id, the band's accessible name and the in-page anchor. Caller-supplied, never `useId`: it belongs to the content. Applied only when `heading` is present. |
| `eyebrow` | `string` | — | The category label above the heading. |
| `lead` | `string` | — | One sentence under the heading. |
| `surface` | `SectionSurface` = `'paper' \| 'tint' \| 'ink' \| 'blue'` | Section's default (paper) | Passed straight to `Section`. This component paints nothing. |
| `density` | `SectionDensity` = `'tight' \| 'open'` | Section's default | Vertical air, passed to `Section`. |
| `arrangement` | `ContentSectionArrangement` = `'stacked' \| 'beside'` | `'stacked'` | Where the head sits against the body. **New in 2.13.** |
| `children` | `ReactNode` | — | The blocks. |

**`arrangement` is a presentation prop and never a CMS field** (`docs/strapi-changes.md` §1: *"does
it change what the section says, or only how it looks?"* — only how it looks). The template that
places the band chooses it; the section record never carries it.

Deliberately **not** props: colour of any part (per-surface tokens); padding and the content column
(`Section`'s); any gap (the three steps are the component's reason to exist, and a gap prop would
let a call site undo them); the track ratio (O2 fixes 1 : 2; a ratio prop would be a rhythm knob);
the breakpoint (1024 is `Layout`'s `lg`); sticky (O2 rejects it); heading level (the band is always
an `h2` under the route's one `h1`); `className` and `style` (Rule 5: nothing overrides `Section`
from outside).

Compile-time guarantees: `arrangement` is a closed union, so `'sticky'` or `'rail'` fail to
typecheck. `heading` being `string` makes a `ReactNode` heading a type error. `headingId` without
`heading` compiles and is harmlessly ignored — making it a discriminated union would force every
route mapping a nullable CMS heading into a branch, for no rendered difference.

## 4 · Variants × sizes

One size. Two arrangements.

| | below 1024 | 1024 up |
|---|---|---|
| `stacked` | head above body, 48 | head above body, 48 |
| `beside` | head above body, 48 — **identical to stacked** | head in the leading 1/3, body in the trailing 2/3, 64 between, head top-aligned and static |

`beside` **degrades to `stacked`** whenever one half is absent (§12): no head → the body takes the
full column; no body → the head takes the full column. An empty track is never drawn.

Considered and rejected:

- **Sticky head (a rail).** Rejected by O2. A sticking head needs a scroll container contract, a
  top offset under the sticky `SiteNav`, and a reduced-motion answer, for a benefit that only
  appears when the body is several viewports long — which the section corpus rarely is.
- **`[2, 1]` or `[1, 1]`.** O2 fixes 1 : 2. A half-and-half split makes the head read as a peer of the
  body rather than its label.
- **`beside` from 768.** At 768 the head track would be ~200px, less than two words of `--text-h2`.
- **A third, `split`-style arrangement with media beside the copy.** That is `Figure` in the body
  under `beside`, or a `PageHero`; not a variant of this.

## 5 · States

None. Nothing in this component responds to a pointer, takes focus, opens, loads or fails. Its
rendering is a pure function of its props. Interactive children bring their own states; this band
neither styles nor observes them. There are no state tokens in `content-section.css`, and that is
the assertion.

## 6 · Per-surface colour

Unchanged by 2.13 — `arrangement` moves no colour. Ratios are against the surface ground.

| Token | paper | tint | ink | blue |
|---|---|---|---|---|
| `--csec-heading-ink` | `--color-neutral-900` · 14.62:1 | `--color-neutral-900` · 13.05:1 | `--color-white` · 17.26:1 | `--color-white` · 6.23:1 |
| `--csec-lead-ink` | `--color-neutral-700` · 8.15:1 | `--color-neutral-700` · 7.27:1 | `--color-neutral-300` · 11.07:1 | `--color-brandeis-100` · 4.91:1 |
| `--csec-eyebrow-ink` | `--color-neutral-600` · 4.92:1 | `--color-neutral-700` · 7.27:1 | `--color-neutral-400` · 8.05:1 | `--color-brandeis-100` · 4.91:1 |

- **Paper** — the reference: dark heading, 700 lead, 600 eyebrow at the AA floor.
- **Tint** — the eyebrow steps to 700 because 600 fails on the deeper ground; heading and lead hold.
- **Ink** — every ink inverts: white heading, 300 lead, 400 eyebrow.
- **Blue** — white heading; lead and eyebrow at `--color-brandeis-100`, the lightest step that clears
  4.5:1. Blue is reserved site-wide (audit §2, ruling 2): one argued band per page, never adjacent to
  ink. The component supports it; routes spend it.

**Nested surfaces.** Every surface block declares all three inks, so a tint `ContentSection` inside
an ink `Section` resolves tint's values and nothing from ink (the measured 1.13:1 failure this rule
exists for). The specimen's section 8 renders exactly that case.

## 7 · Geometry & spacing

(a) Distances, all gap-scale steps, none responsive:

| Seam | Step | Why that step |
|---|---|---|
| eyebrow → heading | `--gap-tight` (8) | a label and the thing it labels |
| heading → lead | `--gap-block` (24) | head to body inside a block |
| head → body (rows) | `--gap-stack` (48) | block to block inside a section — `stacked`, and `beside` below 1024 |
| head track → body track | `--gap-column` (64) | **new in 2.13.** Two halves that must read as separate. Not `--gap-gutter` (32): that is the seam between peers in a set, and a head is not a peer of its blocks — at 32 the head reads as a narrow first card. |
| block → block | `--gap-stack` (48) | between the blocks in the body |

(b) Component sizes: none of its own. The tracks are `Layout`'s `[1, 2]` fr ratio, so at a 1440 window
(1240 column) the head track is 392 and the body 784; at 1024 (960 column) they are 299 and 597.

(c) Optical corrections reaching `--space-*`: none.

Measures: `--csec-heading-measure` → `--measure-title` (22ch) and `--csec-lead-measure` →
`--measure-lead` (40ch). Under `beside` both measures exceed the head track, so the **track sets the
line** and the measures only cap `stacked`. That is intended: the head track is narrower than the
title measure on purpose, which is what makes the head read as a column.

Radius, border, shadow, z-layer: none. The band has no edge; `Section` owns the ground.

## 8 · Typography

| Part | Role | Tracking | Wrap | Case |
|---|---|---|---|---|
| eyebrow | `--text-eyebrow` via `--csec-eyebrow-text` | `--text-eyebrow-tracking` via `--csec-eyebrow-tracking` | — | `--text-mono-case` (uppercase in presentation; the string keeps its authored case) |
| heading | `--text-h2` via `--csec-heading-text` | `--text-h2-tracking` via `--csec-heading-tracking` | `--text-title-wrap` (balance) | as authored |
| lead | `--text-lead` via `--csec-lead-text` | none — `--text-lead` is a body role with no tracking companion | `--text-running-wrap` (pretty) | as authored |

The heading stays at `--text-h2` in both arrangements. The element is an `h2` and the band is the
same section either way; stepping the scale down in `beside` would make the arrangement decide the
heading's importance. §17 Q1 records the alternative.

## 9 · Responsive

- **1024 up** (`Layout` `lg`): `beside` splits 1 : 2 with a 64 column seam. `stacked` does not change.
- **1023 and below**: `beside` is one track, and the head-to-body seam is `--gap-stack` — the same
  `Layout`, the same `rowGap`, the same DOM order as `stacked`. Identical, not similar.
- Type re-declares at 1023 and 767 through the title roles (`--font-size-h2` → `-t` 34 → `-m` 28);
  nothing here adds a breakpoint for type.
- No distance swaps at a breakpoint. The layout changes at 1024; the steps do not.
- Touch targets: none of its own. Children own theirs.

Note for templates: the body track under `beside` is 597 wide at 1024. A three-up card set
(`columns={{ md: 3 }}`) in it gives ~178px cards with two-line titles (specimen §3 at 1024). A
template composing cards into a `beside` band should give the set `md: 2` or `xl: 3`. That is the
caller's column choice, not this component's.

## 10 · Composition

```tsx
<Section as={labelled ? 'section' : 'div'} surface={surface} density={density}
         aria-labelledby={labelled ? headingId : undefined}>
  <Layout rowGap="stack"                                  // head → body as rows (48)
          colGap={split ? 'column' : undefined}           // head track → body track (64)
          columns={split ? { lg: [1, 2] } : undefined}    // 1 : 2 from 1024, O2
          align={split ? 'start' : undefined}>            // static, top-aligned head
    {hasHead && (
      <Layout rowGap="block">                             // heading → lead (24)
        {(eyebrow || heading) && (
          <Layout rowGap="tight">                         // eyebrow → heading (8)
            <p className={styles.eyebrow} /> <h2 className={styles.heading} />
          </Layout>
        )}
        <p className={styles.lead} />
      </Layout>
    )}
    {hasBody && <Layout rowGap="stack">{children}</Layout>}   // block → block (48)
  </Layout>
</Section>
```

where `split = arrangement === 'beside' && hasHead && hasBody`, and
`hasBody = Children.toArray(children).length > 0`.

No hand-rolled grid or flex: the only arrangement is `Layout`'s. No margins on any part. Nothing
overrides `Section`'s column, gutter or ground. `align="start"` is what makes the head static in
the honest sense — sized to its content, not stretched to the body's height pretending to be a rail.

## 11 · Accessibility

- **Semantics.** Labelled band: `<section aria-labelledby={headingId}>` with the `h2` as its name.
  Unlabelled (no heading, or no id): a `div`, because an unnamed `section` is a region a screen
  reader announces and cannot identify.
- **Reading order = DOM order = visual order** in both arrangements: eyebrow, heading, lead, blocks.
  `beside` moves the head sideways, never after the body, so there is no order mismatch (SC 1.3.2).
- **Keyboard.** Nothing focusable of its own; nothing bound. Tab order is the children's.
- **ARIA.** `aria-labelledby` only when its target is rendered (heading **and** id present);
  otherwise omitted. `npm run aria:check` proves it on the built specimen.
- **Ids.** `headingId` comes from the content (the section's anchor), so it is stable across renders
  and unique per page by the content's own contract. The specimen gives every band a unique id.
- **Focus ring, motion:** none.
- **Contrast floors:** §6; lowest 4.91:1 (lead and eyebrow on blue).
- **Screen reader, labelled band:** *"The screen is often where a deeper product problem becomes
  visible., region"* then *"heading level 2, The screen is often …"*. Unlabelled: no landmark.

## 12 · Content edge cases

| Case | Handling |
|---|---|
| Longest realistic heading (10 words, 80 characters) | Balances. `stacked`: breaks at 22ch. `beside`: the track sets the line — 5 lines at 1440, 7 at 1024 (§17 Q1). Specimen §3. |
| Longest lead (45 words) | Pretty-wraps at 40ch (`stacked`) or the track (`beside`). Specimen §3. |
| One long unbroken token | `overflow-wrap: break-word` from `reset.css` on `p` and `h2`; every track is `minmax(0, fr)`, so nothing widens the column. Specimen §4; the 390 capture shows no horizontal overflow. |
| No eyebrow | No element, no 8 seam; the heading is the head's first row. |
| No heading | No `h2`; the band is a `div`. The eyebrow (if any) and the lead remain. |
| Empty string for eyebrow / heading / lead | Treated as absent (falsy). No empty element, no seam. |
| No lead | The eyebrow+heading group is the whole head. |
| No head at all | No head row. Under `beside` the body takes the full column (degrades to `stacked`). |
| No children / `children` omitted | No body row and no 48 seam under the head. Under `beside` the head takes the full column. |
| Empty children array (`[]`, a CMS section with zero blocks) | Same as omitted — `Children.toArray` is empty. **Changed in 2.13**: previously an empty `Layout` rendered, leaving a phantom 48 seam below the head. |
| One block / many blocks | One row per block at 48; the component never counts, clamps or paginates. |
| `beside` with a short body | The head is the taller column; the band ends under the head. Not corrected (specimen §5). |
| `beside` with a long body | The head sits at the top of a mostly empty column; it does not stick (O2). Specimen §5. |
| The narrow track at 767 / 390 | One track in both arrangements; the 326 column. Specimen §8 and the 390 capture. |
| A parent that does not size it | Not applicable — a band belongs to the page, never to a grid track. |
| Logical properties | The module uses `max-inline-size` only; the leading track is the inline-start one, so an RTL page puts the head on the right with no change. |
| Nested inside a different surface | Every ink resolves from the nearest surface (§6). Specimen §8. |
| Two adjacent | Section's own vertical air, nothing else. Specimen §9 renders two paper bands, beside then stacked. |
| Interactive content in the body | Owned by the child; this band adds nothing around it. |

## 13 · Motion

None. Nothing transitions, including across the 1024 breakpoint (the grid template swaps without
animation). Reduced motion: nothing to reduce.

## 14 · Do's and Don'ts

- **Do** choose `arrangement` in the template or route composition. **Don't** map it from a CMS
  field — `grep -rn "arrangement" src/content` returns no ContentSection mapping.
- **Don't** hand-roll the split: `perl -0pe 's{/\*.*?\*/}{}gs' src/patterns/ContentSection/ContentSection.module.css | grep -nE 'display|grid|flex'` returns nothing.
- **Don't** give any part a margin: the same grep for `margin` returns nothing.
- **Don't** make the head sticky: no `position` in the module.
- **Do** keep the column seam at `column`: `grep -n "colGap" src/patterns/ContentSection/ContentSection.tsx` shows only `'column'`.
- **Don't** pass `className`/`style` to reach `Section` — the props type has neither.
- **Do** render the same DOM order in both arrangements — the head precedes the body in the source.
- **Don't** draw a one-third track with nothing in it: a `beside` band with no head or no body
  renders no `--tmpl-lg` template (inspect the outer Layout's inline style: `--tmpl-lg: initial`).

## 15 · Specimen plan

`/design/content-section`, every band a live `ContentSection` so bands sit edge to edge as on a
route. Labelling bands (tight, paper) separate the groups.

1. The two arrangements, same content (stacked, beside).
2. Four surfaces × two arrangements, identical markup (8 bands), the eyebrow naming the cell.
3. Longest realistic heading (10 words) and lead (45 words), both arrangements.
4. One unbroken token in heading and lead, both arrangements.
5. `beside` with a short body and with a long body (prose with an h3, cards, steps).
6. Absent slots: no eyebrow; no lead; heading only; empty-string eyebrow and heading with a lead
   (unlabelled div); no head under `beside` (full column); no children under `beside` (full column);
   an empty children array under `stacked` (no phantom seam).
7. Density tight and open under `beside`.
8. Nested surfaces (tint in ink, `beside`; ink in paper, `stacked`), a `Proof` body on blue, and a
   390 viewport frame (`viewportMobile`) with the longest copy.
9. Two adjacent paper bands, beside then stacked.

No states to force. `beside` cannot be forced inside a narrow frame at a wide window (a frame
cannot fire a media query), so the 390 capture of the whole page is the proof that `beside`
collapses; the frame in §8 is labelled as showing `stacked`.

## 16 · New token requests

None — every value in this spec is an existing token. `beside` uses `--gap-column` through
`Layout`'s `colGap` and `Layout`'s own `lg` breakpoint.

## 17 · Open questions

1. **Heading scale under `beside`.** At 1024 the head track is 299px and a 10-word H2 at 43px runs to
   seven lines (specimen §3). *Options:* (a) keep `--text-h2` in both arrangements; (b) step the
   heading to h3 scale under `beside`; (c) start `beside` at 1440 (`xl`) instead of 1024.
   *Chosen:* **(a)**. O2 fixes 1024, (c) contradicts it; (b) would let an arrangement decide a
   heading's importance and needs a new `--csec-heading-text-beside` token. Section headings in the
   corpus are mostly shorter than the stress row. Revisit if Phase 3 templates put long headings in
   `beside` bands. *Non-blocking.*
2. **What `beside` does with one half missing.** *Options:* (a) degrade to `stacked` (full column);
   (b) keep the empty track so a run of `beside` bands aligns its body column. *Chosen:* **(a)** —
   an empty third is a hole in the page, and alignment across bands is not something this band can
   know about. *Non-blocking.*
3. **Column seam: `column` (64) or `gutter` (32).** *Chosen:* **`column`**. The scale names 64 for
   "two halves that must read as separate"; 32 is between peers in a set, and at 32 the head reads as
   a narrow first card. *Non-blocking.*
4. **Empty children array.** *Chosen:* treat `[]` as no body (removes a phantom 48 seam that
   `stacked` used to render). No route renders a zero-block section today, so no route output
   changes. *Non-blocking.*
5. **Card sets inside a `beside` body.** The 597 body track at 1024 cramps a three-up set. *Chosen:*
   leave it to the caller's `columns` (§9 note), not a prop here. *Non-blocking; a Phase 3 template
   note.*
6. **Brief 07's Note slot and the "rail" arrangement.** Brief 07 asked for a Callout slot and asked
   whether a sticky rail is worth specifying. *Chosen:* no Note slot — a `Callout` is a child in the
   body, which already takes any block; the rail is rejected by O2. *Non-blocking.*

No BLOCKING question is open.

## Appendix — self-audit

```
STRUCTURE
[x] Sections 0–17 present in order with the template's headings.
[x] Tier 2, Status approved (O2 cited), prefix --csec-*.

NAMES
[x] Component tokens named: --csec-eyebrow-text, --csec-eyebrow-tracking, --csec-heading-text,
    --csec-heading-tracking, --csec-lead-text, --csec-heading-measure, --csec-lead-measure,
    --csec-heading-ink, --csec-lead-ink, --csec-eyebrow-ink — all declared in content-section.css.
    None added.
[x] Usage tokens: --gap-tight, --gap-block, --gap-stack, --gap-column, --gap-gutter; --text-h2,
    --text-h2-tracking, --text-lead, --text-eyebrow, --text-eyebrow-tracking, --text-mono-case,
    --text-title-wrap, --text-running-wrap; --measure-title, --measure-lead. `npm run design:check`
    resolves every one.
[x] Layout props used are in its unions: rowGap stack|block|tight, colGap column, columns {lg:[1,2]},
    align start.

COLOUR
[x] 3 tokens × 4 surfaces = 12 cells, none blank, none a delta. Lowest text ratio 4.91:1.

STATES
[x] None, and no state tokens.

LAYOUT, TYPE, SEMANTICS
[x] No hand-rolled grid, no margins, no Section override. DOM order equals visual order.
[x] aria-labelledby only when its target renders.
```
