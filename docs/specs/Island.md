# Island

## 0 · Front matter

| | |
|---|---|
| **Tier** | 1 primitive (`src/components/Island`), a surface like `Section` |
| **Status** | approved (owner, 13 Oct 2026). Q1–Q4 answered: the recommended default on each. Amended 16 Oct 2026 (blue and ink admitted, radius 24, inset 48); documented to the code 19 Oct 2026 |
| **Token prefix** | `--isl-*` (`src/styles/tokens/components/island.css`, registered in `tokens/index.css` straight after `section.css`) |
| **Designer / date** | Claude, 13 Oct 2026, from the owner's brief: "an island variant for CtaSection and Statement — a floating box within a section", ground set per instance |
| **Implements** | CtaSection `island` (`open`; and `split`, the enquiry close, since 16 Oct 2026) and Statement `island` (amendments in both specs) |
| **Implemented at** | `src/components/Island/*`, `src/styles/tokens/components/island.css`, `/design/island`, `/design/cta-section` § 1b and § 16, `/design/enquiry-form` (the island close), `/design/statement` J · 7 |

## 1 · Identity

A bounded ground inside a band, with the band's own ground around it on every side. It paints one
surface (paper or tint; blue or ink for the enquiry close since 16 Oct 2026), declares it with `data-surface`, and insets its content by the band's air.

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
| `surface` | `'paper' \| 'tint' \| 'blue' \| 'ink'` (`IslandSurface`; blue and ink since 16 Oct 2026) | — required | the island's ground, per instance (owner) |
| `children` | `ReactNode` | — | content |

Helpers exported beside it (used by the patterns, so the rule lives in one place):
- `ISLAND_BAND: Record<IslandSurface, …>` — the band an island floats on when not told (tint ↔ paper;
  blue → paper, ink → paper).
- `islandSurfaceOn(band, requested)` — refuses an island equal to its band; returns the other light
  ground and warns in development.

**Deliberately not props:** `className` (ground, inset and radius ARE the component; overriding them is
rule 5 one level down), padding, gap, radius, width (it fills Section's column), colour, shadow, edge.

**Compile errors rather than review comments:** ~~`surface="blue"` and `surface="ink"` do not compile
(§ 6). CtaSection `island` on `split` or `offer` does not compile (`island?: never`).~~ *Superseded
16 Oct 2026 (amendment at the foot):* both surfaces compile, and CtaSection takes `island` on `split`
(the enquiry close). CtaSection `island` on `offer` still does not compile (`island?: never`).

## 4 · Variants × sizes

One size. Two surfaces, four since 16 Oct 2026 (paper and tint anywhere; blue and ink for the enquiry
close only). Rejected: a narrower centred island (e.g. 10 of 12) — it breaks the column
alignment every other band keeps, and the full column is what gives it scale; an edge-to-edge phone
island — it stops being an island and becomes a band within a band.

## 5 · States

None. Nothing responds to a pointer; the controls inside own their states.

## 6 · Per-surface colour

| Token | paper | tint | ink | blue |
|---|---|---|---|---|
| `--isl-ground` | `--color-paper` | `--color-paper-deep` | `--color-neutral-900` (was 950 until 16 Oct 2026) | `--color-brandeis-500` |
| `--isl-ink` | `--color-neutral-900` 14.62:1 | `--color-neutral-900` 13.06:1 | `--color-white` 14.75:1 (17.26:1 on the old 950) | `--color-white` 6.23:1 |

Grounds and inks duplicate Section's by value (token rule 6), so an island matches a band of the same
surface exactly — except ink, which since 16 Oct 2026 is neutral-900, one step off the ink band's and
the footer's 950, so the close and the footer a band below do not read as one dark block. ~~The ink and
blue blocks exist for self-containment only: `IslandSurface` admits paper and tint. Blue is never a
ground (§ 4.1); ink is the footer's ground (§ 1.7), see Q3.~~ *Superseded 16 Oct 2026:* `IslandSurface`
admits all four. Blue and ink are owner exceptions for one placement, the enquiry close, an island
on a paper band that carries a paper form.

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
| ≥ 768 | `--gap-stack` 48 (was `--gap-section` 96 until 16 Oct 2026) | `--gap-stack` 48 (was 96) |
| < 768 | `--gap-stack` 48 (was `--gap-column` 64) | `--gap-gutter` 32 (container gutter; unchanged) |

The air *around* the island is Section's (its band padding and its gutter). The island has no margin.

(b) Sizes — none; it fills the column.
(c) Optical corrections — none.
Radius `--isl-radius: var(--radius-24)` (was 8, the system box radius; 24 since 16 Oct 2026, see the amendment below).
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
- A blue band: no band is blue (§ 4.1), so `islandSurfaceOn` does not guard it. A blue *island* is a
  different thing (16 Oct 2026): it sits on a paper band.
- CtaSection's proof shape inside an island: the [3, 2] proof track is ~381 at 1440, against 470 in a
  bare band; checked by eye in `/design/cta-section` § 16 and it holds the quote on four lines.

## 13 · Motion

None.

## 14 · Do's and Don'ts

- Do: at most one island per page.
- Do: give the island a different surface from its band (the patterns enforce it).
- Don't: put a box inside an island (a boxed card set). The one exception is the enquiry close's paper
  form panel on a blue or ink island (16 Oct 2026): the panel is the island's one object.
- Don't: paint an island through a class. ~~Don't set `data-surface="ink"` or `"blue"` on an island.~~
  *Superseded 16 Oct 2026:* `surface="blue" | "ink"` is the enquiry close's island; don't use either
  for any other placement.
- Don't: place an island in a tint band beside a tint band — the band rule still holds for the band.

## 15 · Specimen plan

`/design/island`: four pairings (tint on paper, paper on tint, paper on ink, tint on ink) with
identical content including the solid + ghost pair; texture inside a paper island (corner, head-half);
the blue and ink islands as the real enquiry close (card on blue, message on ink, since 19 Oct 2026).
Pattern use: `/design/cta-section` § 1b (the enquiry close) and § 16 (four blocks), `/design/enquiry-form`
(the island close, five blocks) and `/design/statement` J · 7 (four blocks).

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
   primitive. **Decided (owner, 13 Oct): 8.** *Superseded 16 Oct 2026: 24.*
3. **Ink island (non-blocking).** The ink ground would be the most striking island but ink is the
   footer's, and an ink close would sit a band's air above it. **Decided (owner, 13 Oct): excluded**; the token
   block is ready if the owner wants one mid-page moment. *Amended 16 Oct 2026: admitted for the enquiry
   close, at neutral-900 rather than the footer's 950.*
4. **Texture on the CTA island (non-blocking).** Statement carries its textures inside the island;
   the close has no texture today ("the close carries no texture for now"). `corner-pair` inside a
   paper close island would be the natural first try. **Decided (owner, 13 Oct): deferred to the next texture review.**

## Appendix — self-audit

- Tokens: 5, all aliases; 4 surface blocks × 2 surface tokens, identical sets (tokens:check).
- Distances: 3 gap steps (`section`, `column`, `gutter`); 0 space-ramp reaches; 0 margins.
- Arrangement: 0 `display` declarations. Literal colours: 0. Restated type: 0.
- Cross-component reads: 0 (Section's grounds duplicated by value).
- `data-surface` written by a primitive: yes — the argued exception; Island is a surface (§ 1).

## Amendment · 16 Oct 2026 — radius 24, `overhang`, `ground`, `IslandOnGround` (owner, the home close)

- **`--isl-radius` is 24** (`--radius-24`, new). At 8, the radius of every photograph and panel, the
  island read as one more card; at 24 it floats. Every island takes it: an island is one kind of
  object. Closes Q2.
- **`overhang?: boolean`.** From 1024 the ground stops `--isl-overhang` (64, `column`) short of the box at
  the top and foot, and the box drops its block inset and its clip, so a child that stretches to the
  row stands proud of the island at both edges. The ground becomes its own element (absolute, the
  island's radius, isolated, clipped). Below 1024 the island is a plain island. Built for CtaSection's
  island close, whose form panel rises out of the island.
- **`ground?: ReactNode`.** A layer on the ground, under the content: a Texture, which then fills and is
  clipped by the ground rather than the taller box. Hidden from assistive tech with the ground.
- **`IslandOnGround`.** In overhang mode every child starts at the box's top, in the overhang. Content
  that must stay on the ground wraps in `IslandOnGround`, which puts the overhang and the island's own
  block inset back as its padding (from 1024; nothing below). The island owns that geometry, so no
  caller restates it. CtaSection's copy column does not use it: there the drawing rises on purpose.
- Specimen: `/design/island` § 7 — a tint island on paper with a stretched child and the two-lights
  ground.

## Amendment · 16 Oct 2026, final — blue and ink admitted; overhang removed

- **`IslandSurface` is `paper | tint | blue | ink`.** Blue and ink are owner exceptions for the home
  enquiry close: an island that carries a paper form. Ink is **neutral-900**, one step off the footer's
  950 (Q3 amended). `ISLAND_BAND` puts both on paper.
- **The overhang, `ground` and `IslandOnGround` are removed**: the close now holds its form inside the
  island. The radius stays 24.
- Specimen: `/design/island` — blue and ink islands with `TextureFrame`.
- **Block inset 64 at every width** (same day, owner: the home close fits one laptop screen). The
  inline inset keeps 96 from 768.
- **Inset 48 on every side from 768** (same day, owner: "padding 48px all around inside the island"),
  replacing 96 and the morning's 64 block inset. Below 768: 48 block, 32 inline (48 left the island
  close's form under its floor).

## Amendment · 19 Oct 2026 — the spec brought to the code (documents the 16 Oct owner ruling)

No behaviour changed on 19 Oct; this records what `src/components/Island/Island.tsx` and
`tokens/components/island.css` already do, and the contradicted lines above are corrected in place or
struck through and marked *Superseded*.

- **`IslandSurface = 'paper' | 'tint' | 'blue' | 'ink'`** (owner, 16 Oct 2026). Paper and tint are the
  general islands. Blue and ink are for **one placement, the enquiry close** (CtaSection `split` with
  `island`): an island on a paper band that carries a paper form. Blue is an owner exception to "blue is
  never a ground" (visual-direction § 4.1); ink is `--color-neutral-900`, one step off the footer's 950.
- **`ISLAND_BAND`**: paper → tint, tint → paper, blue → paper, ink → paper. `islandSurfaceOn` still
  refuses an island equal to its band (an ink island asked for on an ink band renders paper and warns).
- **Contrast**: white on the ink island (neutral-900) is 14.75:1; the 17.26:1 previously quoted was the
  950 ground. Blue stays 6.23:1.
- **Geometry as built**: radius 24; inset `--gap-stack` 48 on every side from 768; below 768, 48 block
  and the 32 `gutter` inline. (CLAUDE.md gap-scale rule 4 still quotes the 13 Oct values, 96 / 64 + 32;
  the exception it grants is unchanged, only the values moved.)
- **No `overhang`, `ground` or `IslandOnGround`**: removed with the overhang study on 16 Oct.
- **Specimens**: `/design/island` renders blue and ink as the real enquiry close (CtaSection with
  `islandTexture="frame"`, the desk drawing and a dressed EnquiryForm), no longer a grey stand-in box;
  `/design/enquiry-form` § "The island close" renders every form dress on both islands.
