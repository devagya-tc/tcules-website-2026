---
title: "The case-study index renders its testimonials band"
date: 2026-10-29
status: active
area: [proof, layout]
source: "Owner, 29 Oct 2026, component-map § F Q4 (feat/new-copy)"
supersedes: [2026-10-22-no-testimonial-on-listing-index]
dbf: []
dbf_status: none
enforced_by: "review"
---

The /case-studies listing DOES render the testimonials band its copy authors (the 26 Oct copy puts one
on the case index). It is the site's testimonial wall, as on every other page: rated cards on the tint
proof band, the independent score as its footer. The case cards themselves still carry no quote
(2026-10-22-case-cards-carry-no-testimonial).

**Why.** The owner superseded the 22 Oct "for now" ruling when the 26 Oct copy authored the band: the
words are the content team's and the band order holds.

**The mistake it prevents.** Dropping the copy's testimonials band from /case-studies on the strength
of the 22 Oct ruling (the component map's earlier default), or putting the quotes back on the case
cards to bring them onto the page.

**How to apply.** The /case-studies route renders the copy's `testimonials` band around
`ListingIndex` (component-map C13) through the shared `QuoteGroupBand`, never inside a card.
