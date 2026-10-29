---
title: "The case-study index sets its cases in the listing's three-card grid; the paper-deep CaseCard is home's"
date: 2026-10-29
status: active
area: [layout, cards, proof]
source: "Owner second review of the 26 Oct copy pages, 29 Oct 2026 (feat/new-copy → feat/r2-listings)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (caseViews and ListingGrid in src/templates/ListingIndex/cases.tsx and compositions.tsx)"
---

/case-studies uses the SAME three-column card grid as /insights: every case group's cases are
BlockCards in the listing's one grid (`ListingGrid`). The horizontal `CaseCard` on its paper-deep
ground is "for the homepage only". Where the page features cases at the top, each is "the card-less
horizontal version" — the insights hub's lead (cover across two thirds, copy in the third, no ground),
one case to a row.

**Why.** "The /case-studies page is horrible. What happened to using the same 3 card grid?" The listings
share one structure (2026-10-22-listings-share-one-structure), and home's paper-deep case cards are
the one place that ground means a case study (2026-10-29-paper-deep-is-for-case-cards).

**The mistake it prevents.** feat/new-copy's `caseViews`, which shaped each group by its position and
count: featured CaseCards on paper-deep, a `lead="auto"` featured set, two columns of thumbnail rows
("Best for" as a ListCard ledger) and 2-up large covers, so the case index read as four different
pages and none of them was the insights grid.

**How to apply.** `src/templates/ListingIndex/cases.tsx`: featured cases as BlockCard `horizontal`
`size="lg"` `split="grid"` with a cta, one to a row, the cover leading at every width; every other case
a BlockCard at `size="sm"` `tracks={3}` in `ListingGrid` (the same component `CardGrid` sets the hub's
cards in). A case listed before its page exists keeps its place in the grid, unlinked. The copy's bands
around the list (client recognition, testimonials, enquiry, FAQ) are unchanged.
