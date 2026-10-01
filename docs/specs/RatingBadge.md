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

`{ score: string; platform: string; href: string; mark?: ReactNode }`. One `<a>` (new tab, `rel=
"noreferrer noopener"`): an aria-hidden ★ at 1.35em (an optical correction against the numeral), the
score, "on", then the mark and the platform name as one lockup, then a visually hidden "(opens in a new
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
brandeis star; ink lifts to neutral-300 with a brandeis-300 star; blue runs brandeis-50 with a white star.

## Placements

- SiteFooter brand block, beside the primary action.
- ServicePage proof band: under the client's quote, a stack below it — the client's words, then the
  market's score (`proof.rating`).

## Content rule

The score is copy, not arithmetic: a string as published ("4.8", "5.0"). Re-read the profile when
updating `fixtures/ratings.ts`; a score that drifts from its source is the failure the single source
prevents. A checked-on date is not shown, matching the footer; if the owner wants one, it belongs in
`ratings.ts` and both placements get it together.
