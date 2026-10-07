# Banner

| | |
|---|---|
| Status | **implemented** (cmp-banner, 6 Oct 2026) |
| Tier | 2 · pattern, `src/patterns/Banner` |
| Tokens | `src/styles/tokens/components/banner.css` (`--bnr-*`) |
| Specimens | `/design/banner` (coverage), `/design/kit/banner` (the family page) |
| Authority | `docs/kit/visual-direction.md` § 1.4 (I rows), § 3.2, § 3.4 (I, announcement strip), § 5.3, § 5.4 |

## What it is

The I band: one photograph at the band's full weight, a head that names it, at most one action.
Plus the announcement strip, which is the same family's one-line form.

| Form | Arrangement | Image | Air |
|---|---|---|---|
| `below` (default) | eyebrow row, then h2 in 1 of [1, 2] beside lead + action in 2, top-aligned; photograph a `stack` beneath | photograph only, 3:1 from 1024, 3:2 below (a 3:1 at 326 is a 109px sliver) | `tight` |
| `beside` | copy in 5 of [5, 7], image in 7, `section` apart, copy centred on the image (§ 3.2 rule 1's exception: head + action only). `mediaSide="start"` mirrors from 1024; copy stays first in the DOM, image follows it below 1024 | photograph 3:2, or an illustration rendered whole and unboxed | `tight` |
| `strip` | Cluster: optional mono label, one line of body-sm, one blue link with the arrow; `aside` landmark named "Announcement" | none | Section `density="strip"` (24), tint by default |

## Props

`heading` (required), `headingId`, `eyebrow`, `lead`, `actions` (a slot: compose a `CtaRow` with
`rule={false}`), `image` (a `MediaImage`), `surface`; `beside` adds `mediaSide`. `strip` takes
`message`, `label`, `link: { label, href }`, `surface`, `aria-label`. A discriminated union on
`form`, so a strip cannot take an image and a banner cannot omit one.

## Rules it carries

- No frame on a photograph, radius 8: Media's `kind="photograph"` (§ 5.3). No overlay slot exists, so
  there is no way to put type on the image (§ 5.1 rule 6).
- `below` warns in development when handed a non-photograph (only a photograph takes a ratio).
- An illustration band carries no texture (§ 4.3 band rule); the banner has no texture slot at all.
- Rhythm is ContentSection's: `block` inside the head, `stack` head to image, `section` across a
  split. Lead to action is `stack` in `beside` and `block` in `below`, where the lead and its link
  are one trailing unit against the heading (fix round 1).
- The eyebrow carries a blue mark (the kit's 6px eyebrow square, the one every eyebrow carries — it was the Statement's 32 × 2 rule until `cmp-services` fix round 2) and the strip's mono label is blue:
  one accent grammar across I and J (fix round 1). Below 768 the lead steps to the body role
  (28 : 16 rather than 28 : 18).
- A solid ask is `CtaRow emphasis="solid"` with a required `converts`: blue when the action converts
  (the hero's treatment; one ask, one colour for it everywhere), ink when it is a lead action that does
  not (owner, 7 Oct 2026, visual-direction § 4.5). Its ghost partner is blue either way.
- Never two `beside` banners within sight of each other on a page (adjacent, or split only by a strip
  or a short band): mirrored or not, they are one rectangle repeated. Separate them with a band of
  another arrangement, or make one `below`. The family specimen shows three in a row as a set only.
- `beside` with an illustration zooms to 180% of the column below 768, centred on the record's
  `focus.x`, so callouts stay legible. Choose `focus.x` so every callout left in the window keeps its
  label: drop a callout whole (arrow and label) rather than leave an arrow pointing at nothing. A photograph must have defined edges: no frame, so a
  blown-out edge dissolves into the paper. The pattern does not import ContentSection (a pattern never imports a
  pattern); it repeats the head's twelve lines of Layout.
- Emits `data-band="I"` (or `strip`) and `data-copy` on eyebrow, h2, lead and the strip message for
  `fold:check`.

## Measured (1470 × 830)

`below` 728 tall with a 2-line lead and a link, 722 without (fix round 1). `beside` 573 (photograph 445), 623
with the illustration. Strip 70. At 390: 572 to 733, strip 136. No overflow at 390.

## Deviation recorded

- The brief says "one neutral link" for the strip; § 3.4 and the 6 Oct blue ruling (§ 4.1) say blue.
  Built blue: a text link is blue at rest everywhere (§ 4.2).

## Open questions

None blocking.

## Amendment · 7 Oct 2026 — `actionsAt="end"` (owner)

`below` takes `actionsAt: 'below' | 'end'` (default `below`), the same decision as ContentSection's.
`end` sets the action at the inline end of the heading's row from 1024 — eyebrow on its own line,
heading and lead in `1fr`, the action in a content-sized track `column` (64) away, top on the
heading's top — and under the lead below 1024. The service page's I banner uses it: its one link is
the way deeper, so the head and the photograph keep the full column. Specimen: `/design/banner` § 2b.

