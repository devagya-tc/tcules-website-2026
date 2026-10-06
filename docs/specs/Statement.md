# Statement

| | |
|---|---|
| Status | **implemented** (cmp-banner, 6 Oct 2026) |
| Tier | 2 · pattern, `src/patterns/Statement` |
| Tokens | `src/styles/tokens/components/statement.css` (`--stmt-*`) |
| Specimens | `/design/statement` (coverage), `/design/kit/banner` (the family page) |
| Authority | `docs/kit/visual-direction.md` § 1.4 (J row), § 1.5, § 3.3, § 3.4 (J), § 6.3, § 7.1 |

## What it is

The J band: one sentence at the `--text-h1` role, and almost nothing else. [1, 2] from 1024 at
`section`: a short blue mark and the eyebrow in the head track, the sentence in the two-thirds track
(763 at 1470), top edges level. `open` density (128). Below 1024 one column, eyebrow then sentence a
`block` beneath.

## Props

`children` (the sentence, a string, ≤ 14 words / 3 lines), `eyebrow`, `as` (`h2` default, or `p`;
never `h1` — the page's only h1 is the hero's), `id` (the h2's id and the band's name), `actions`
(optional slot, a `stack` under the sentence), `texture` (`'head-half'`, paper only), `surface`.

## Rules it carries

- The element marks the outline; the role sets the scale. `as="p"` keeps a restating sentence out of
  a heading navigator.
- The words stay ink. The blue is the mark (`--stmt-mark-ink`: brandeis-500, 300 on ink), a small
  graphic mark (§ 4.2), so the band never reads black and white even with no texture or link.
- Texture is paper only (development warning elsewhere) and from 1024 only.
- Emits `data-band="J"` and `data-copy="statement"`.

## Deviation recorded: the head-half placement

§ 6.3 places `head-half` at "rect, top −200, end −120, 34% × 296, blur 160". Built that way, the
band's own clip cut the grid at its top edge at ~88% strength: a hard line across a paper-to-paper
seam. Nothing lower is free in the end track, which the sentence's box fills. The built placement
(fix round 1) is the HEAD CELL's own field: the cell is positioned, the Texture's box runs from a
`stack` under the cell's top to the band's bottom edge, and one rect sits centred in it at 80% × 62%,
blur 40. The core reaches the grid's strength, the feather is spent inside the box, and the nearest
feather stops ~30 under the eyebrow. (The first build's ellipse, blurred 160 off the viewport edge,
read as a ~3% smudge.) Consequence for the kit/home signature (§ 6.4): head-half is a START-side
placement, so `cmp-showcase` should pair it with an end-side hero-foot or accept start, start,
start. Owner check.

## Measured (1470 × 830)

370 tall with a 2-line sentence (114 + 256 open air); every kit sentence holds ≤ 3 lines at 1024. 390: 409 to 447.

## Open questions

1. Owner: is the head-track placement of head-half (above) acceptable, or should the recipe keep the
   end side and accept the seam line? Not blocking.
