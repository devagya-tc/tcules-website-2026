---
title: "Home's selected work is the horizontal case card set; elsewhere the three-across grid"
date: 2026-10-29
status: active
area: [cards, proof, layout]
source: "Owner home review, 29 Oct 2026 (feat/new-copy; component-map § F Q2)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (HomePage `SelectedWork`: every case a `CaseCard`, `reverse` on every second; OfferBands `cases`: the BlockCard grid)"
---

On home, every selected-work case (Doodle, Auxentios, Benchmark Gensuite in the 26 Oct copy) is one
horizontal `CaseCard` on its paper-deep ground, the sides alternating (every second card `reverse`), the
client's name before the colon as the eyebrow and the rest as the claim (`splitClaim`), with the "See all
case studies" action at the head's end. Every other page sets its selected work as the three-column
BlockCard grid.

**Why.** Home emphasises its case studies, so each case gets the row. On a service, expertise or audit
page the cases are paths to more content, not the page's emphasis.

**The mistake it prevents.** Home's three unquoted cases rendered as the three-across BlockCard grid
(feat/new-copy before this ruling), or a service page's cases blown up into case-card rows.

**How to apply.** `src/templates/CorpusPage/HomePage.tsx` `SelectedWork` renders every case as a
CaseCard (a case with no link falls back to the plain card; a case with no page binding takes its own
cover via `coverFor`). OfferBands keeps the grid. Answers component-map § F Q2.
