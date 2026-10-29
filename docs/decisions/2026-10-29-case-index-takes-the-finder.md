---
title: "/case-studies is the insights finder: Stage, Industry and Service in the rail, a curated lead, then the stage shelves"
date: 2026-10-29
status: active
area: [layout, cards, components, content, proof]
source: "Owner (Devagya), listing pages of the 26 Oct copy rebuild, 29 Oct 2026 (feat/r3-listings)"
supersedes: ["2026-10-29-case-index-is-the-listing-grid", "2026-10-22-case-index-opens-by-stage"]
dbf: []
dbf_status: none
enforced_by: "structure (caseFinder, caseViews in src/templates/ListingIndex/cases.tsx; listingFinder in src/templates/ListingIndex/listingFinder.tsx; readFinder in src/app/_listing/finder-query.ts; finderData in src/app/_corpus/case-index.tsx)"
---

/case-studies is the same FINDER as /insights: a search and the groups Stage (the copy's four stage tables: new
product, established product, AI product, carried into working software), Industry and Service in the rail,
picks as chips, results as one grid of the listing's cards, twelve at a time. Every live case is in it. A tag
comes only from a source: stage from the copy's stage tables; industry from the filing read off the expertise
pages (P50); service from the case page's own "Related Tcules services" line, rolled up to its service line. A
case no source files stays untagged in that group. Nothing picked, the curated view: one featured case LEADS,
large, its cover across two of the grid's three tracks, the other featured cases as ordinary cards under it,
then the stage shelves in the three-track grid. The BY STAGE / BY INDUSTRY switch is gone. The bands around the
finder (client recognition, testimonials, enquiry, FAQ) stay as they are.

**Why.** The owner: "/case-studies becomes the same FINDER as /insights … never invent a tag"; featured as "the
finder's curated opening view as /insights has it … instead of one card shape repeated".

**The mistake it prevents.** Three featured cases as three identical horizontal leads, one per row; a view
switch where the insights hub has filters; stage or industry tags guessed from a case's title or Strapi's
unreliable categories.

**How to apply.** Kept from 2026-10-29-case-index-is-the-listing-grid: every case is a BlockCard in
`ListingGrid`; the paper-deep CaseCard is home's. The URL logic is `readFinder`, shared with /insights; the
controls, chips and paging are `listingFinder`, shared too. Untagged today: Stage — Benchmark Gensuite, ConnectX,
Doodle (featured, in no stage table) and the three live-only cases (Ringier, Chestnut, Phoenix); Industry and
Service — Vovisto, CuramCare and the three live-only cases.
