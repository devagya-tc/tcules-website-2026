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
- The words stay ink. The eyebrow carries no mark (owner, 7 Oct 2026; the blue square is withdrawn).
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

## Amendment · 6 Oct 2026 — `page-product-design` fix rounds 1 and 2

- **`size?: 'h1' | 'display'`** (fix round 1). `display` sets the sentence at the hero's display role,
  measure `--stmt-sentence-measure-display` (26ch): for the one J a page spends as its display-scale
  moment. Default `h1`, as specified above.
- **`align?: 'split' | 'center'`** (fix round 2). `split` (default) is the `[1, 2]` arrangement above.
  `center` is one column at every width — eyebrow, sentence and action centred on the band's axis
  across the full measure (Meridian's overview line). For a page whose neighbouring bands already
  start their content on the 1/3 line: a split J between two beside bands read as one long split.
- **`texture?: 'head-half' | 'corner'`** (fix round 2). `corner` is TextureCorner: a stepped pixel
  field (10px pixels, no blur) in the band's top-end corner, `min(280px, 40%)` × 80, dense at the
  corner and dithering out. At `open` density it ends 48 above the eyebrow, so it is drawn at every
  width, 390 included. It replaces `head-half` on the service page's J: at 1470 the blurred head-half
  read as a pale gradient smudge, its feather reached the sentence's first line, and below 1024 it
  was not drawn. Paper only, like every texture.
- Specimen: `/design/statement` § 4 (display) and § 5 (centre + corner, and centre at h1).

## Amendment · 7 Oct 2026 — owner design review: no split form

- **`align?: 'start' | 'center'`**, default **`start`**. The `split` form is removed: it set the eyebrow
  alone in the `[1, 2]` head track, ~480 from its sentence, and the band had no anchor — a label
  belongs on the thing it labels. Recorded in `docs/kit/visual-direction.md`, "Owner rulings · 7 Oct
  2026", rule 4.
- **Both forms are one column**: the eyebrow directly above the sentence at `block` (24), the action a
  `stack` (48) under it. `start` keeps every part on the start edge, the sentence on its own measure
  (`--stmt-sentence-measure`, the title measure, or `--stmt-sentence-measure-display`), so the
  band's end is open air — which is also where the `head-half` and `corner` textures sit. `center`
  centres every part on the band's axis, as before.
- Both are kept: the service page centres its J unless a neighbour is centred (plan § 3.5), and
  starts it otherwise; kit/home's J is `start`, kit/about's `center`.
- The empty head cell (`.headEmpty`) is gone with the track it held. No token changed; the token
  file's header and measure comment now describe the one-column band.
- Measured (1440): a 2-line display sentence with its link is 498 tall in either form (open air 256
  + 14 + 24 + 140 + 48 + 16); the centred h1 three-line form 434.
- Specimen: `/design/statement` § 4 adds the start form at display with the corner field and a link
  (the service page's shape), beside § 5's centred pair; every other row is the start form.
