---
title: "The first card is featured when the set has 4 or more"
date: 2026-09-28
status: superseded
area: [cards]
source: "docs/phase-2-decisions.md, owner rulings for Phase 2 (28 Sep 2026), C3"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
legacy: "phase-2 C3"
---
A card is featured **automatically: the first item, when the set has 4 or more items.** No CMS field. A
featured card is the horizontal arrangement spanning the row.

**Why.** Featuring is a property of the set's size, so it needs no editorial input and cannot be
mis-set.

**The mistake it prevents.** A "featured" toggle in the CMS, set on two items at once or on an item in a
set of two.

**How to apply.** `BlockCardSet` gives its first item the featured arrangement when it holds 4 or more;
`BlockCard` never decides it for itself. The horizontal card takes the 4:3 media crop.
