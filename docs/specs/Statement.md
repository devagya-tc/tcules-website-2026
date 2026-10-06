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

## The head-half placement

Built to § 6.3 exactly (fix round 2): rect, top −200, end −120, 34% × 296, blur 160, on the band's own
field (a direct child of Section). It arrives from the band's top-end corner, off both edges, and its
box stops 96 into the band, inside the 128 of open air, so only the feather reaches the sentence. Two
earlier builds hung a field mid-track under the eyebrow; with no edge to bleed from it read as a
smudge rather than as atmosphere. The kit/home signature (§ 6.4) is end-side again, as written.

The mark leads the eyebrow and goes with it: with no eyebrow the head track is empty (from 1024 an
empty cell holds the 1 track; below 1024 nothing is rendered).

## Measured (1470 × 830)

370 tall with a 2-line sentence (114 + 256 open air); every kit sentence holds ≤ 3 lines at 1024. 390: 409 to 447.

## Open questions

None blocking.
