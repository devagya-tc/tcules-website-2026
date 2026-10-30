---
title: "Every /case-studies group, and the finder's results, opens on one horizontal case card, then the three-card grid"
date: 2026-10-29
status: active
area: [layout, cards, components]
source: "Owner (Devagya) notes on the site rebuilt from the 26 Oct copy, 29 Oct 2026 (feat/r4)"
supersedes: ["2026-10-29-case-index-takes-the-finder"]
dbf: []
dbf_status: none
enforced_by: "structure (CaseRun in src/templates/ListingIndex/cases.tsx, used by caseViews and caseFinder)"
---

On /case-studies EVERY group (the featured opening and each stage shelf) shows ONE horizontal card first, the
card-less horizontal form (cover beside text, the full row), followed by the standard three-column card grid
for the rest of that group. "No other card shapes." The finder stays as 2026-10-29-case-index-takes-the-finder
set it (a search; Stage, Industry and Service in the rail; picks as chips; twelve at a time; tags only from a
source), and its results follow the same rule: the first result horizontal, the rest in the grid.

**Why.** The owner wants each group to have the same opening shape, so the page reads as a set of groups of the
same kind rather than one lead followed by plain shelves.

**The mistake it prevents.** feat/new-copy round 3 led only the featured group, with the other featured cases
as ordinary cards and the stage shelves as grids alone, so the groups after the first had no lead.

**How to apply.** `CaseRun` picks the group's first featured case that has a cover and a page, else its first
such case. A case without both joins the grid. The results keep the page's order, so the first result is the
most prominent match the curated view would show. Noted for later, not built: island CTA sections or service
cards between groups on both listing pages.
