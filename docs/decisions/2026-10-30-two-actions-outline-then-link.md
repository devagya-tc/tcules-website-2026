---
title: "Two actions side by side are an outlined button then a link, everywhere, never two identical links"
date: 2026-10-30
status: active
area: [components, layout]
source: "Owner (Devagya), 30 Oct 2026, round 5 notes: any time two buttons appear next to each other in a section, design them as two distinct buttons"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (CorpusPage LinkActions renders two links as CtaRow's pair by default: outline Button, then the link)"
---

Wherever a section carries two actions together, in a head's end slot or at its close, they are one
row with a hierarchy: the first an outlined Button, the second the link with its arrow, a `block`
apart, wrapping on a narrow column. Never two link buttons stacked or side by side, and never a blue
solid (the page's one main action). Three or more links are a list, not a pair, and stay links.

**Why.** Two identical link buttons read as one action said twice; the owner wants each visibly its
own button. It generalises the Banner's pair (2026-10-29-banner-two-actions-one-row) to every band.

**The mistake it prevents.** Why Tcules' "Why teams choose Tcules" and "Meet the studio" stacked as two
blue links at the heading's end on every service page.

**How to apply.** Templates pass a band's links to `LinkActions`, which now pairs two by default;
patterns that take an action slot get the pair as one node. Two actions are never split between a
head and the band's close.
