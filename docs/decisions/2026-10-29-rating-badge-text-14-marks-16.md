---
title: "The RatingBadge's text is 14px and its marks 16px"
date: 2026-10-29
status: active
area: [proof, components, type]
source: "Owner review of the built 26 Oct copy pages, 29 Oct 2026 (feat/new-copy, round 2; branch feat/r2-proof)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "token (tokens/components/rating-badge.css: --rbadge-text = --text-ui-lg, --rbadge-mark-size = --icon-size-16; RatingBadge sizes the star and the platform mark it is handed)"
---

"Increase the rating badge size so the text is 14px and the marks are 16px." One size wherever the badge
appears: a testimonial band's footer, the enquiry close, the logo grid, the footer and a hero's eyebrow.

**Why.** At 12px text and 14px marks the badge read too small for the claim it carries, beside 16px body
and 18px quotes.

**The mistake it prevents.** The 12 / 14 badge under the testimonial bands and on the enquiry island.

**How to apply.** Through the badge's own tokens, never at a call site: the badge sizes the star Icon and
the BrandMark it is handed, as Button sizes its glyph, so a caller's `size="sm"` no longer decides it.
