---
title: "A rating is always the RatingBadge, never text and a link; the review count and \"Read the reviews\" are its accessible name"
date: 2026-10-29
status: active
area: [proof, components]
source: "Owner review of the built 26 Oct copy pages, 29 Oct 2026 (feat/new-copy, round 2; branch feat/r2-proof)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (CorpusPage `ratingOf` → `ScoreBadge`: every authored score line renders as the RatingBadge; CtaSection `rating` slot; RatingBadge `detail`)"
---

A third-party rating is shown only as the RatingBadge: "always use the badge for showing the rating,
never a text + link." Wherever a badge is shown, the count is not visible text ("i'd like to not show the
'from 13 reviews' in the text wherever a rating badge is shown"), and "Read the reviews" is not visible
either: the badge is the link to the reviews and carries those words "as a label that can be read by
machines". Its accessible name is the visible words, then the copy's own: "4.8 on Clutch from 13 reviews.
Read the reviews (opens in a new tab)".

**Why.** "This was just added as text. not good." A score set as a sentence with a link beside it reads as
body copy, not as proof, and the same claim showed as a badge on one band and a sentence on another.

**The mistake it prevents.** The home enquiry island's contact cell "4.8 on Clutch from 13 reviews · Read
the reviews" as a key and a link, and "from 13 reviews." printed beside the badge under every testimonial
band (/services/product-design, /contact, /case-studies, /expertise).

**How to apply.** The copy keeps its line word for word; the renderer parses it (`ratingOf`) and draws
`ScoreBadge`, which passes the words after the score and the link's words to RatingBadge `detail`
(visually hidden text after the visible words, so the name still starts with what the eye reads, WCAG
2.5.3; never an `aria-label` that would replace them). A close takes it through CtaSection's `rating`
slot, never as a contact cell.
