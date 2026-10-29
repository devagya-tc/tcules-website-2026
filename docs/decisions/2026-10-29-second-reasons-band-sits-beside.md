---
title: "Two drawn Reasons bands on a page: the first open, the second beside"
date: 2026-10-29
status: superseded
area: [layout]
source: "Owner, 29 Oct 2026, component-map § F Q1 (feat/new-copy)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "plan.ts `reasonsArrangements` (the plan sets it; no template sets an arrangement by hand)"
---

How we work together and Why Tcules both stay drawn Reasons bands. The FIRST Reasons band on a page
keeps the approved `open` arrangement and the SECOND takes `beside`. Offer pages: How we work together
`open`, Why Tcules `beside`. Home: Why Tcules `open`, How we work together `beside`.

**Why.** On all 54 offer pages the copy puts How we work together directly above Why Tcules; two drawn
sets in the same arrangement back to back read as one idea twice when squinted. `beside` is an existing
arrangement (the head and its links in the leading third, the set in the trailing two thirds) that
changes the silhouette without a new component, and the approved `open` keeps its place.

**The mistake it prevents.** Both bands rendered `open` one under the other on /services/product-design,
or engagements sent back to `EngagementOptions` or Why Tcules flattened to make them differ; and an
arrangement typed by hand per page, which drifts the first time a band moves.

**How to apply.** `reasonsArrangements` in `src/templates/CorpusPage/plan.ts` assigns `open` to the first
`reasons` or `tiles` band in reading order and `beside` to the second; OfferPage and HomePage read it from
the plan. Until a reason has its figure (component-map C1), Why Tcules renders as an OfferSheet three
across, and the arrangement applies once the figures are drawn. Proposed until the owner has seen both
pages built.
