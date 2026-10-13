# VideoTestimonial

## 0 · Front matter

| | |
|---|---|
| **Tier** | 2 pattern (`src/patterns/VideoTestimonial/`) |
| **Status** | implemented — `featured` and `wide` built before this spec existed (r7-video, 7 Oct; owner review 9 Oct); `portrait` specified and built 13 Oct 2026. Sections below cover the first two briefly, as built, and `portrait` in full. |
| **Token prefix** | `--vt-*` |
| **File** | `src/styles/tokens/components/video-testimonial.css` |
| **Designer / date** | Claude Code · 13 Oct 2026 |
| **Implements** | 7 Oct review r7-video; owner rule 9 Oct (one film, alone); owner request 13 Oct (vertical video, beauty first) |
| **Implemented at** | `src/patterns/VideoTestimonial/` · `src/styles/tokens/components/video-testimonial.css` · specimen `src/app/design/kit/video-testimonial/page.tsx` (`/design/kit/video-testimonial`) · stand-in films `public/kit/video/interview-*-portrait.webm` |

There was no spec before this file. The component's docblock was its spec; it still carries the
contract, and this file must agree with it.

## 1 · Identity

A client interview on film: a poster photograph with one play control, the line pulled from the
interview, and who said it. Tier 2 because it composes `Layout`, `Media` and `Icon`.

It is NOT:
- a group of voices — that is `Proof` (and the Slider of testimonials);
- a text testimonial with a portrait — that is `Testimonial` / `Proof`'s featured portrait;
- a hero film — that is `PageHero`'s video media (16:9, YouTube-shaped).

**One film, alone (owner rule, 9 Oct).** Exactly one video, and the only testimonial in its band:
never two films in a band, never a film in a row or beside text quotes. Every variant is therefore
a single-film layout; none is a group. One per band; rarely more than one per page.

`portrait` is a variant rather than a new component: the contract (poster, play, swap, focus,
captions, reduced motion) is identical; only the box ratio and the arrangement change.

## 2 · Anatomy

| Part | Class / token part | Required | Notes |
|---|---|---|---|
| figure | `.root` | yes | `<figure>`, a `Layout` |
| screen | `.screen` / `poster` | yes | the one box the poster and player share |
| player | `.video` / `player` | yes | `<video preload="none">`, under the poster |
| poster | `.poster`, `.frame`, `.zoom` | yes | one `<button>`; a `Media` photograph inside, no type on it |
| play disc | `.play` / `play` | yes | aria-hidden affordance inside the button |
| caption | `.caption` | yes | `<figcaption>`, a `Layout` |
| label | `.meta` / `meta` | yes | label · running time · "Captions" when captioned |
| quote | `.quote` / `quote` | yes | `<blockquote>`, the rule beside it |
| speaker | `.attribution`, `.name`, `.role` / `name`, `attribution` | name yes, role optional | |

Slots: `film.captions` is the track slot (one `<track kind="captions">` per file).

## 3 · Props / API

| Prop | Type | Default | Decides |
|---|---|---|---|
| `variant` | `'featured' \| 'wide' \| 'portrait'` | required | the arrangement and the poster ratio |
| `poster` | `MediaImage` | required | the photograph; its `alt` is ignored (the button is named instead) |
| `film` | `{ sources; captions?; duration }` | required | sources best first, the track slot, `m:ss` |
| `quote` | `string` | required | the pulled line, no quotation marks |
| `name` | `string` | required | named attribution is mandatory |
| `role` | `string` | — | missing, it leaves no separator |
| `company` | `string` | required | |
| `label` | `string` | `'Client interview'` | sentence case as authored; mono uppercases it in presentation |
| `sizes` | `string` | per variant | override only when the caller's track differs |

Not props: `surface` (inherited through `data-surface`), colour, gap, padding, radius, the poster
width, the disc size, autoplay (never), a "playing" initial state (a reader's press is the only way
in — see § 15).

## 4 · Variants × sizes

| Variant | Poster (rest) | Player | Arrangement | Disc |
|---|---|---|---|---|
| featured | 16:9, the 3 of `[3, 2]` | 16:9, same box | quote beside from 1024, under below | lg from 1024, md below |
| wide | 3:1 across the column | opens to 16:9 | caption as one row under it from 1024 | lg from 1024, md below |
| **portrait** | **9:16 from 768 (352 / 240 wide); 4:5 below 768** | **9:16 at every width** | **quote beside from 768, under below** | **md at every width** |

Rejected for portrait: a 9:16 poster at full phone width (580 of an 844 screen before the quote);
a centred narrow poster below 768 (it breaks the column's left edge every other band holds); the
88 disc (a quarter of a 352 poster).

## 5 · States

| State | What moves |
|---|---|
| rest | poster visible, player hidden (`visibility: hidden`, `aria-hidden`, `tabIndex -1`) |
| hover / focus-visible | poster push-in (`--vt-poster-scale-hover`), disc swells and darkens (`--vt-play-bg-hover`) |
| pressed | disc `--vt-play-bg-pressed` |
| playing | poster removed; player visible with native controls and focus; portrait below 768 and wide open the box to the film's ratio |

No disabled, loading or error state: a failed `play()` leaves the native controls showing.

## 6 · Per-surface colour

Unchanged by `portrait` — the variant adds geometry only. Every cell is in
`tokens/components/video-testimonial.css` with its measured ratio.

| Token | paper | tint | ink | blue |
|---|---|---|---|---|
| `--vt-quote-ink` | neutral-800 (11.81) | neutral-800 (10.54) | white (17.26) | white (6.23) |
| `--vt-name-ink` | neutral-900 (14.62) | neutral-900 (13.06) | white (17.26) | white (6.23) |
| `--vt-attribution-ink` | neutral-600 (4.92) | neutral-700 (7.27) | neutral-400 (8.05) | brandeis-100 (4.91) |
| `--vt-meta-ink` | brandeis-500 (6.17) | brandeis-500 (5.51) | brandeis-300 (7.32) | white (6.23) |
| `--vt-quote-rule` | brandeis-500 (decoration) | brandeis-500 (decoration) | brandeis-300 (decoration) | white (decoration) |
| `--vt-play-bg` / `-hover` / `-pressed` | brandeis-500/600/700 | brandeis-500/600/700 | brandeis-500/600/700 | paper / neutral-200 / neutral-300 |
| `--vt-play-fg` | white | white | white | brandeis-500 |
| `--vt-player-ground` | neutral-950 | neutral-950 | neutral-950 | neutral-950 |
| `--vt-ring-color` | brandeis-500 | brandeis-500 | brandeis-300 | white |

Blue is never a ground (owner ruling); its block exists so a nested surface cannot inherit the
wrong ink. Every block declares the full set (tokens:check enforces it).

## 7 · Geometry & spacing

(a) Distances — portrait:
- poster ↔ caption, from 768: `section` (96). Copy beside an image is a **split** (CLAUDE.md gap
  rule 2). Below 768: `stack` (48), as featured.
- label ↔ quote: `block` (24). label+quote ↔ speaker: `stack` (48).

(b) Sizes (all in the token file):
- `--vt-poster-ratio-portrait` 9 / 16 — the film's ratio; poster and player share it from 768.
- `--vt-poster-ratio-portrait-crop` 4 / 5 — the poster below 768 only (326 × 408 at 390).
- `--vt-portrait-width-lg` 352px — from 1024. 352 × 16/9 = 626; Section's 96 above and below makes
  the band **818, inside the 830 fold at 1470** (measured by `fold:check`).
- `--vt-portrait-width-md` 240px — 768–1023. 427 tall; at 768 it leaves the quote 368 of 704.
- The disc stays `--vt-play-size-md` (64) for portrait at every width.

(c) Optical corrections: none new (`--vt-play-glyph-nudge` is shared).

Radius `--vt-poster-radius` (8). No border, no shadow. Layers `--vt-layer-poster/-control`.

## 8 · Typography

| Part | Role | Tracking |
|---|---|---|
| label | `--text-eyebrow` + `--text-mono-case` | `--text-eyebrow-tracking` |
| quote | `--text-quote-lg` (34 / 28 / 22) | `--text-quote-lg-tracking` |
| name | `--text-h6` | `--text-h6-tracking` |
| role, company | `--text-body-sm` | none — no tracking companion |

Measure: the quote caps at `--measure-lead`. `--text-quote-xl` was considered for portrait's wider
text column and rejected: the role is "not for a quote beside anything" (primitives.css).

## 9 · Responsive

Portrait:
- **≥ 1024** — `[auto, 1]`: the poster's own 352 in a content-sized track, caption in the rest, 96
  apart, caption centred on the poster's height.
- **768–1023** — the same row with a 240 poster.
- **< 768** — stacked: a 4:5 poster across the column, the caption under it at 48. Play opens the
  box to 9:16 (326 × 580 at 390: under an 844 screen, so the whole film is visible at once). Only
  content below the film moves, and only because the reader asked.

Target: the whole poster is the button (≥ 240 × 427 from 768; 326 × 408 below) — far past 44.

## 10 · Composition

```tsx
<Layout as="figure" columns={{ base: 1, md: ['auto', 1] }} colGap="section" rowGap="stack" align="center">
  <div class="screen">{/* video under, poster button over */}</div>
  <Layout as="figcaption" rowGap="stack">
    <Layout rowGap="block">{label}{quote}</Layout>
    {speaker}
  </Layout>
</Layout>
```

No hand-rolled grid or flex (the one `display: grid` centres the glyph in its disc — a control's
interior), no margins, nothing overrides Section.

## 11 · Accessibility

Unchanged by portrait. `<figure>` / `<figcaption>` / `<blockquote>`. The poster is one `<button>`
named "Play {label}: {name}, {n minutes n seconds}[, captioned]", `aria-describedby` the quote (always
rendered). Enter/Space press it; focus then moves to the `<video>` (now `tabIndex 0`, `controls`), so
Space and the arrows reach the player. The player is `aria-hidden` and untabbable until then. Ring:
`--vt-ring-*` on the poster and the player, never clipped (no overflow on `.screen`). Reduced motion
drops the push-in and the swell; the hover darkening stays (a state, not motion).

## 12 · Content edge cases

- Long quote: wraps at `--measure-lead`; at 1024 the text column is 512, at 768 it is 368 — a 40-word
  line runs past the poster's height at 768 and the row grows; the poster stays centred, acceptable.
- One-line quote: centred caption, no hole (the reason the pinned-speaker arrangement was rejected).
- Unbroken token: `overflow-wrap: anywhere` on quote, name, role.
- No captions: the label drops "Captions", the name drops "captioned" (specimen 05).
- No role: no separator.
- Landscape film in a portrait variant: letterboxed on `--vt-player-ground`. Wrong content, not a
  layout failure — choose the variant for the film's shape.
- Nested surface: self-contained blocks; no inheritance leak.
- Two adjacent: forbidden by the 9 Oct rule.

## 13 · Motion

Transitions: the poster's `transform` (`--vt-duration`, `--vt-easing`), the disc's `background-color`
and `scale` (`--vt-duration-play`). Nothing else moves; the box change on play is instant. Reduced
motion: both transitions instant, push-in and swell removed.

## 14 · Do's and Don'ts

- Do give a 9:16 film the `portrait` variant; never a 16:9 film.
- Don't set the portrait poster's width anywhere but `--vt-portrait-width-*`.
- Don't put a head above a portrait band without re-measuring the fold: 818 of 830 leaves 12.
- Don't render two VideoTestimonials in one Section, or one beside a Proof.
- `grep -n "margin" src/patterns/VideoTestimonial/VideoTestimonial.module.css` returns nothing.

## 15 · Specimen plan

`/design/kit/video-testimonial`: 01 featured under a head (paper) · 02 featured alone (tint) · 03 wide
· **04 portrait, captioned (paper) · 05 portrait, uncaptioned (tint)** · 06 featured on ink · **07
portrait on ink**. Blue is not shown as a ground (owner ruling). The playing state has no prop: press
the poster (it is exercised in review by clicking it; the box measured 352 × 626 at 1440, 240 × 427
at 800, 326 × 580 at 390, focus on the `<video>` every time).

## 16 · New token requests

Added to the existing layer: `--vt-poster-ratio-portrait`, `--vt-poster-ratio-portrait-crop`,
`--vt-portrait-width-lg`, `--vt-portrait-width-md`. No colour tokens.

## 17 · Open questions

1. **Featured's seam is 64, portrait's is 96.** CLAUDE.md gap rule 2 calls copy beside an image a
   split (96); featured, built and approved before the rule was written down this way, uses
   `column` (64). Portrait follows the rule. Options: (a) leave featured at 64 as approved;
   (b) move featured to 96 for consistency. Recommend (b), but only on the owner's word — featured
   is a locked approved piece. Non-blocking.
2. **Disc position on a talking head.** The disc is centred, the universal affordance; on a close
   9:16 portrait it sits on the speaker's mouth. Option: drop it to the lower third for portrait.
   Recommend keeping it centred. Non-blocking.
3. **A head above a portrait band** exceeds the 830 fold (818 + head). Options: portrait stands
   alone in its band (as built and specified); or a smaller lg poster (~300 wide) when a head is
   present. Recommend alone. Non-blocking.
4. **Real vertical films** are not yet delivered; the stand-ins are 8-second clips recorded from the
   poster photographs (fictional speakers). Non-blocking.

## Appendix — self-audit

- Variants: 3, sizes: 2 portrait widths + 2 discs. Surfaces: 4 blocks, identical sets (tokens:check).
- New tokens: 4, all geometry, all in the component's layer, all argued in its header.
- Margins: 0. Hand-rolled arrangement: 0 (the disc's glyph centring is argued).
- Fold: 818 at 1470 (fold:check ok). 390 bands ≤ 1257 (ceiling 1700).
