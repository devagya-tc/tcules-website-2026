---
title: "What you get: titled deliverables, and the band's terms in its foot"
date: 2026-10-30
status: proposed
area: [components, layout]
source: "Owner, 30 Oct 2026, /services/product-design review (round 5)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (OfferSheet `terms` foot; SheetBand drops listLabel; sheetItem titles on what-you-get)"
---

Deliverables carry titles. On /services/product-design the five titles are the owner's ("A tested
brief", "A model", "Interaction & Visual Design", "Prototypes", "Ready to build"), stored as bold leads in
`_pages`. Elsewhere the title is the authored bold lead, and a run-on lead ("**The build,** alongside...")
titles with its own opening while its whole sentence stays as the body. No mono "What you receive"
label sits over the set: the h2 and the lead name it.

The band's terms (who does the work, what we need, where our part stops) belong to the whole section, not
to the grid above them. HOW they are arranged is not ruled: the owner is still changing it (30 Oct), so
the build's current foot is provisional and nothing here fixes its shape.

**Why.** Untitled drawn cards "read off". The terms, on the set's own three tracks and gap with per-item
hairlines, read as attached to the cards just above them rather than as conditions of the whole band.

**The mistake it prevents.** Terms laid on the set's own tracks and gap with per-item rules.

**How to apply.** `OfferSheet` `terms` renders the foot; `SheetBand` splits the trailing labelled paragraphs into terms and no longer passes `listLabel`; `sheetItem` titles a `what-you-get` list item from its bold lead.
