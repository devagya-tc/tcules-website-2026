# RatingBadge

| | |
|---|---|
| **Tier** | 1 component (`src/components/RatingBadge/`) |
| **Status** | implemented |
| **Token prefix** | `--rbadge-*` |
| **Designer / date** | Claude Code, at the owner's request / 1 Oct 2026 |
| **Implements** | Owner, 1 Oct 2026: *"for the testimonial section, can we add a clutch rating badge?"* |
| **Implemented at** | `src/components/RatingBadge/` · `tokens/components/rating-badge.css` · specimen `/design/rating-badge` |

## Why it exists

The footer already drew a Clutch rating badge, as private markup inside SiteFooter with its tokens in
`footer.css`. A second placement (the service pages' testimonial band) would have meant a copy — the
way the old repo grew 111 bespoke sections. So the badge was lifted out, unchanged in look, into one
component both placements use, and the score moved to one source (`fixtures/ratings.ts`) so the two can
never print different numbers.

## Anatomy and API

`{ score: string; platform: string; href: string; icon?: ReactNode; mark?: ReactNode }`. One `<a>`
(new tab, `rel="noreferrer noopener"`): the leading icon (in practice `<Icon name="star" size="sm" />`,
aria-hidden), the score, "on", then the mark and the platform name as one lockup, then a visually hidden "(opens in a new
tab)". The accessible name reads "4.8 on Clutch (opens in a new tab)".

The mark is a node the caller composes — in practice `<BrandMark name="clutch" />` — because a
primitive does not import a sibling (CLAUDE.md § Sideways has an idiom).

## Look

An outline pill, not a fill: a claim with a source, and a filled chip beside a solid button reads as a
second action. `--text-ui-sm`, mono case; `--gap-tight` block padding, `--rbadge-padding-inline` (14,
optical) inline; hairline rule; full radius. Hover/focus moves the ink and the rule to the link ink
together; the star holds. Focus ring per surface. Reduced motion: instant.

## Surfaces

All four declare every token (values as the footer badge shipped): paper and tint in neutral ink with a
neutral-900 star (brandeis-500 until 6 Oct 2026, see the amendment below); ink lifts to neutral-300 with a
brandeis-300 star; blue runs brandeis-50 with a white star.

## Placements

- SiteFooter brand block, beside the primary action.
- ServicePage proof band: under the client's quote, a block (24) below the attribution — the client's
  words, then the market's score, read as one piece of evidence (`proof.rating`; was a stack until the
  owner's note, 1 Oct 2026).

## Content rule

The score is copy, not arithmetic: a string as published ("4.8", "5.0"). Re-read the profile when
updating `fixtures/ratings.ts`; a score that drifts from its source is the failure the single source
prevents. A checked-on date is not shown, matching the footer; if the owner wants one, it belongs in
`ratings.ts` and both placements get it together.

## Amendment · 1 Oct 2026 — alignment pass (owner: "the star doesn't align well … the badge itself moved")

- **The star is a glyph, not a character.** It was a `★` at 1.35em in the mono face, which has no ★, so
  each browser fell back to a different font and the star's centre landed differently on each. It is now
  Solar's `star-bold` in the glyph set, passed as `icon` (a primitive does not import a sibling), at the
  same 14px as the platform mark beside the name. Measured at 4×: star, mark and badge centres sit within
  about half a pixel of the capitals' centre.
- **No placement of its own.** The component set `justify-self: start`, which overrode the footer
  column's `justify-items: end` and moved the badge off its right edge. Where a badge sits is the parent's
  decision; the proof band wraps it in a Cluster so its grid cell does not stretch it.
- **Centring, verified two ways.** Layout boxes: the trimmed text box and the icons share one centre
  (16.0px in a 32px badge). Rendered ink at 8×: WebKit puts star, capitals and mark on one centre
  exactly; Chromium leaves the icons 0.3px low, under a device pixel, from the face's cap-height metric
  sitting a hair inside its drawn capitals. The trim (`text-box: trim-both cap alphabetic`) is what makes
  the result independent of the line box; where it is unsupported (Firefox today) the line box returns.

## Amendment · 6 Oct 2026 — `fdn-colour` (visual-direction § 4.3)

- **The star is ink on paper and tint.** `--rbadge-star-ink` brandeis-500 → neutral-900 on both. An icon
  at rest is never blue on a light ground (§ 4.3, "icons are ink"); blue is spent on where you act, and the
  badge's link state already takes it on hover (`--rbadge-ink-hover`), so nothing about the affordance
  changes.
- **Ink and blue are unchanged.** The live badge sits in the ink footer, and chrome keeps its approved
  colours (§ 4.3). Blue's star was already white.

## Amendment · 6 Oct 2026 (cmp-testimonials)

`showScore?: boolean` (default `true`). `false` is for a placement that sets the score large beside
the badge (Proof `arrangement="rating"`): the pill reads "★ Rated on [mark] Clutch", and the score
follows the platform in visually hidden text, so the accessible name is "Rated on Clutch, 4.8 (opens
in a new tab)" — the visible label first (WCAG 2.5.3), the score still in the claim.
