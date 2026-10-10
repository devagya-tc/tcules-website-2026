# BrandMark

| | |
|---|---|
| **Tier** | 1 component (`src/components/BrandMark/`) — moved up from `src/patterns/SiteFooter/` on 1 Oct 2026 |
| **Status** | implemented |
| **Token prefix** | `--bmark-*` |
| **Implemented at** | `src/components/BrandMark/` · `tokens/components/brand-mark.css` · specimen `/design/brand-mark` |

Third-party marks — LinkedIn, YouTube, Clutch — each at the viewBox its owner published, monochrome on
`currentColor`, always `aria-hidden` (the platform name beside it is the accessible name). Not glyphs:
redrawing a trademark onto Icon's 24 box would stop it being the mark.

**Why it moved.** It lived beside SiteFooter with a note that it would move up a tier when a second
consumer needed it. RatingBadge on the service pages' testimonial band is that consumer.

**Tokens.** It used to read Icon's `--icn-size-sm` and Section's `--sec-ground`; a component never reads
another's tokens, so it declares `--bmark-size` (the icon ramp's 14, by value) and `--bmark-knockout`
(the surface ground LinkedIn's letters are cut out in) per surface.
