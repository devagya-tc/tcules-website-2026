# Island

## 0 · Front matter

| | |
|---|---|
| **Tier** | 1 primitive (`src/components/Island`), a surface like `Section` |
| **Status** | approved (owner, 13 Oct 2026). Q1–Q4 answered: the recommended default on each |
| **Token prefix** | `--isl-*` (`src/styles/tokens/components/island.css`, registered in `tokens/index.css` straight after `section.css`) |
| **Designer / date** | Claude, 13 Oct 2026, from the owner's brief: "an island variant for CtaSection and Statement — a floating box within a section", ground set per instance |
| **Implements** | CtaSection `island` (open only) and Statement `island` (amendments in both specs) |
| **Implemented at** | `src/components/Island/*`, `src/styles/tokens/components/island.css`, `/design/island`, `/design/cta-section` § 16, `/design/statement` J · 7 |

## 1 · Identity

A bounded ground inside a band, with the band's own ground around it on every side. It paints one
surface (paper or tint), declares it with `data-surface`, and insets its content by the band's air.

**Why "Island".** The defining property is that it is *surrounded* by the band's ground on every
side, at every width: it never reaches the band's edge and never leaves Section's column. "Panel" is
already the CtaSection form panel (a raised holder for a control set); "card" is an item in a set and
carries the no-box ruling; "box" is the specimen harness. "Island" names the one thing that makes it
different from all three — the surround — and it is the word the owner used.

**Tier 1, and why.** Patterns may not import patterns, and two patterns need the same box. It knows
nothing about content, routes or the CMS; it is a ground and an inset, like Section at a smaller scale.

**What it is NOT:**
- not a band — `Section` paints bands and owns the column; Island lives inside one;
- not a card — `BlockCard frame="box"` / `ListCard` own items in a set (the island is one per band);
- not the form panel — CtaSection's `.formPanel` raises a form beside copy; the island holds the whole
  band's argument.

At most one island per page (§ 14): a floating object is an event, and two make a pattern of boxes.

## 2 · Anatomy

| Part | Required | What |
|---|---|---|
| `island` (root `div`) | yes | the box: ground, inset, radius, `data-surface` |
| children | yes | one region, laid out by the caller's `Layout` (and an optional `Texture` bleed layer) |

## 3 · Props / API

| Prop | Union | Default | Decides |
|---|---|---|---|
| `surface` | `'paper' \| 'tint'` (`IslandSurface`) | — required | the island's ground, per instance (owner) |
| `children` | `ReactNode` | — | content |

Helpers exported beside it (used by the patterns, so the rule lives in one place):
- `ISLAND_BAND: Record<IslandSurface, …>` — the band an island floats on when not told (tint ↔ paper).
- `islandSurfaceOn(band, requested)` — refuses an island equal to its band; returns the other light
  ground and warns in development.

**Deliberately not props:** `className` (ground, inset and radius ARE the component; overriding them is
rule 5 one level down), padding, gap, radius, width (it fills Section's column), colour, shadow, edge.

**Compile errors rather than review comments:** `surface="blue"` and `surface="ink"` do not compile
(§ 6). CtaSection `island` on `split` or `offer` does not compile (`island?: never`).

## 4 · Variants × sizes

One size. Two surfaces. Rejected: a narrower centred island (e.g. 10 of 12) — it breaks the column
alignment every other band keeps, and the full column is what gives it scale; an edge-to-edge phone
island — it stops being an island and becomes a band within a band.

## 5 · States

None. Nothing responds to a pointer; the controls inside own their states.

## 6 · Per-surface colour

| Token | paper | tint | ink | blue |
|---|---|---|---|---|
| `--isl-ground` | `--color-paper` | `--color-paper-deep` | `--color-neutral-950` | `--color-brandeis-500` |
| `--isl-ink` | `--color-neutral-900` 14.62:1 | `--color-neutral-900` 13.06:1 | `--color-white` 17.26:1 | `--color-white` 6.23:1 |

Grounds and inks duplicate Section's by value (token rule 6), so an island matches a band of the same
surface exactly. The ink and blue blocks exist for self-containment only: `IslandSurface` admits paper
and tint. Blue is never a ground (§ 4.1); ink is the footer's ground (§ 1.7), see Q3.

**Nested surface.** The island sets `data-surface`, so every component token inside resolves the
island's surface — proven on `/design/island` and both pattern specimens by a paper or tint island on
an ink band (white ink and lifted blue do not leak in). The island/band step is the edge: paper on
paper-deep is 1.12:1, the same step the form panel and the tint close already rely on.

**Same-surface nesting is refused** (decided here): with no edge and no shadow a paper island on a
paper band draws nothing, and tint on tint is two tints touching (§ 1.7 one level down). The primitive
cannot see its band, so the patterns call `islandSurfaceOn`, which renders the other light ground and
warns.

## 7 · Geometry & spacing

(a) Distances — the inset is the island's air against its own edge, the band's air in miniature, so
it takes the band's value per width:

| Width | block | inline |
|---|---|---|
| ≥ 768 | `--gap-section` 96 | `--gap-section` 96 (square air; a start-aligned sentence sits evenly) |
| < 768 | `--gap-column` 64 (the band's phone air) | `--gap-gutter` 32 (container gutter; 64 left 198 for an h1 in the 326 column) |

The air *around* the island is Section's (its band padding and its gutter). The island has no margin.

(b) Sizes — none; it fills the column.
(c) Optical corrections — none.
Radius `--isl-radius: var(--radius-8)` (the system box radius: photographs, form panel, boxed card).
No border, no shadow (`--shadow-none` by omission), no z-layer; it is `position: relative; isolation:
isolate; overflow: clip` so a `Texture` fills the island and clips at its radius.

## 8 · Typography

None — the island sets `color: var(--isl-ink)` for bare text only; every part inside brings its role.

## 9 · Responsive

The inset steps at 767 (above). The island keeps the page gutter at every width. No touch targets of
its own.

## 10 · Composition

```tsx
<Section surface="paper">                {/* band: ground, column, air */}
  <Island surface="tint">                {/* box: ground, inset, radius */}
    <Texture>…</Texture>                 {/* optional bleed layer, fills the island */}
    <Layout rowGap="stack">…</Layout>    {/* every seam */}
  </Island>
</Section>
```
No hand-rolled grid or flex, no margins on children, no override of Section from outside.

## 11 · Accessibility

A plain `div`: no role, no name; the band (Section) keeps `aria-labelledby` to its heading. No focus
behaviour; `overflow: clip` (not `hidden`) creates no scroll container, so focus rings inside are not
trapped. Contrast floors in § 6. A screen reader announces nothing for the island itself.

## 12 · Content edge cases

- Long or unbroken text: the content's own `overflow-wrap` rules apply; the island never scrolls.
- Empty children: renders an empty box at its inset — a findable fault, not guarded.
- 767 narrow track: 262 of content inside a 326 island; verified with an h1 close and a statement.
- Logical properties throughout (`padding-block`, `padding-inline`).
- Nested inside ink: proven (§ 6). Two islands adjacent: refused by § 14, not by code.
- Interactive content: allowed (buttons, links); the island's surface reaches them.
- Content that bleeds past its box (a `Layout scroll` row's bleed, a Slider) is cut by `overflow:
  clip`. Nothing of that kind sits in an island today; it does not belong in one.
- A blue band: no band is blue (§ 4.1), so `islandSurfaceOn` does not guard it.
- CtaSection's proof shape inside an island: the [3, 2] proof track is ~381 at 1440, against 470 in a
  bare band; checked by eye in `/design/cta-section` § 16 and it holds the quote on four lines.

## 13 · Motion

None.

## 14 · Do's and Don'ts

- Do: at most one island per page.
- Do: give the island a different surface from its band (the patterns enforce it).
- Don't: put a box inside an island (a form panel, a boxed card set).
- Don't: set `data-surface="ink"` or `"blue"` on an island, or paint one through a class.
- Don't: place an island in a tint band beside a tint band — the band rule still holds for the band.

## 15 · Specimen plan

`/design/island`: four pairings (tint on paper, paper on tint, paper on ink, tint on ink) with
identical content including the solid + ghost pair; texture inside a paper island (corner, head-half).
Pattern use: `/design/cta-section` § 16 (four blocks) and `/design/statement` J · 7 (four blocks).

## 16 · New token requests

`--isl-inset-block`, `--isl-inset-inline`, `--isl-radius`, `--isl-ground`, `--isl-ink` — all aliases of
existing primitives and gap steps. No new primitive.

## 17 · Open questions

1. **The per-width inset (non-blocking, built).** CLAUDE.md gap-scale rule 4 names Section's padding
   as the only per-width distance. The island claims the same exception on the same grounds (its air
   against its edge, not a distance between two things). Options: (a) ratify the exception for
   `island.css` and add it to CLAUDE.md; (b) one value at every width (`gutter` all round — cramped at
   1440). **Decided (owner, 13 Oct): (a)** — recorded in CLAUDE.md gap-scale rule 4.
2. **Radius (non-blocking).** 8 keeps the island in the photograph/panel family; a 1240-wide box at 8
   reads crisp and editorial. A softer 16 would be the first radius over 8 on the site and a new
   primitive. **Decided (owner, 13 Oct): 8.**
3. **Ink island (non-blocking).** The ink ground would be the most striking island but ink is the
   footer's, and an ink close would sit a band's air above it. **Decided (owner, 13 Oct): excluded**; the token
   block is ready if the owner wants one mid-page moment.
4. **Texture on the CTA island (non-blocking).** Statement carries its textures inside the island;
   the close has no texture today ("the close carries no texture for now"). `corner-pair` inside a
   paper close island would be the natural first try. **Decided (owner, 13 Oct): deferred to the next texture review.**

## Appendix — self-audit

- Tokens: 5, all aliases; 4 surface blocks × 2 surface tokens, identical sets (tokens:check).
- Distances: 3 gap steps (`section`, `column`, `gutter`); 0 space-ramp reaches; 0 margins.
- Arrangement: 0 `display` declarations. Literal colours: 0. Restated type: 0.
- Cross-component reads: 0 (Section's grounds duplicated by value).
- `data-surface` written by a primitive: yes — the argued exception; Island is a surface (§ 1).
