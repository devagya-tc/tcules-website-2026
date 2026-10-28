---
title: "The enquiry close may split 1:1, the form weighted by its panel, not its column"
date: 2026-10-23
status: active
area: [forms, layout]
source: "Owner, 23 Oct 2026 (enquiry close round, PR feat/enquiry-close-flow)"
supersedes: [2026-10-11-form-is-the-primary-object]
dbf: []
dbf_status: none
enforced_by: "review"
---

The island close may split 1:1 (`CtaSection islandArrangement="halves"`): "make the form narrower. 1:1 split is good so there's negative space there naturally. and that negative space becomes the playground." The form keeps the weight by being the one raised paper panel with the one solid primary, not by taking the larger column. The full-width chip form keeps the full width "because it needs it".

**Why.** A narrower form leaves the start half as open ground for the field and the drawing, and the panel still reads as the band's primary object.

**The mistake it prevents.** Holding every enquiry close to a [5, 7] split for the form's sake, so that the close has no open ground and its texture is squeezed into a frame behind the form.

**How to apply.** CtaSection's halves arrangement: the split keeps its 96; the words pinned to the foot of the start half with the title at a two-line measure; the drawing at ~300 a `stack` (48) above the title, "so it balances with the title"; the panel centred in the end half with a `gutter` (32) inset (owner, 25 Oct 2026). Every enquiry close still gets a raised panel and one solid primary (from 2026-10-11-form-is-the-primary-object, which this replaces). The chip dress stays on `islandArrangement="above"`. Home carries the halves close with the sketch-to-shipped drawing and a card with no title (owner, 25 Oct 2026; `EnquiryBand` `arrangement: 'halves'`, `dress: 'card'`, every card untitled since 2026-10-28-enquiry-card-no-title-no-placeholders).
