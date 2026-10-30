---
title: "Seven services: Bento on four tracks, 4 + 3, the closing words in the eighth cell"
date: 2026-10-29
status: proposed
area: [layout]
source: "Owner, 29 Oct 2026, component-map § F Q7 (feat/new-copy, /services/product-design)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review (Bento warns when a row does not fill its tracks)"
---

/services/product-design's "services you can hire on their own" (seven services) is a `Bento` on four
tracks, 4 + 3, every tile one size, and the band's closing paragraph sits in the empty eighth cell as a
text cell: unframed, untextured, not a link. Two new specialist scenes draw the two services that had
none, New Product Design & First Release and the UX & Product Audit.

**Why.** Three equal tracks left one tile alone (3 + 3 + 1), and a wide tile breaks "peers at equal
weight"; ListCard rows would sit directly under the hard parts' rows, the same shape twice. The approved
form is the Bento; four tracks hold seven peers with one hole, and the band's own closing words fill it.

**The mistake it prevents.** A lone seventh tile on its own row, a wide tile weighting one service over
the others, or the closing paragraph left under the grid with an empty cell beside the last row.

**How to apply.** `Bento` takes `note` (the text cell; it spans what the last row leaves) and `body` is
optional. OfferBands' `Router` reads a table's rows (key link, "Best for" cell) and sets seven or eight
destinations on four tracks with the closing paragraphs in the cell; the scenes are assigned per href in
`content/sources/offer-scenes.ts` (`specialist-new-product`, `specialist-audit`). Proposed until the owner
has seen it built.
