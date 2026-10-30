---
title: "What you get: the deliverables across, three peer parts under them, each led by its visual"
date: 2026-10-30
status: superseded
area: [layout, illustration]
source: "Owner, 30 Oct 2026, round 6 ('go ahead with all the changes. log the rules.'); arrangement designed against 2026-10-30-what-you-get-is-four-parts"
supersedes: [2026-10-30-what-you-get-titled-terms-foot]
dbf: []
dbf_status: none
enforced_by: "structure (OfferParts; WhatYouGetBand gate in CopyBands.tsx)"
---

Deliverables carry titles, as before: on /services/product-design the five are the owner's ("A tested
brief", "A model", "Interaction & Visual Design", "Prototypes", "Ready to build"); elsewhere the
authored bold lead, and a run-on lead is titled by its opening with the whole sentence as the body.

**The arrangement.** "What you get" is four parts, each an h3 at ONE role followed by its content.
Part 1, "What you receive" (the authored label, which now names the first part rather than sitting
over a set), holds the drawn deliverables in one row: tracks = count, six read three over three. Parts
2 to 4 are one row of three on the column seam (64), each a 16:9 visual over its words: the studio
photograph (`about_studio_review`, the one photograph grade) for who does the work; one NEEDS drawing
(the handover: the client's inputs on their region panel, routed into our frame, the decisive input
lit); one STOPS drawing (the boundary: our last piece left of a dashed line with the lit check, what
stays theirs on their panel). Run-in punctuation drops from a part title ("Who does the work."
becomes "Who does the work"); the words are unchanged. One body role (14) throughout. No numbers, no
hairlines, no containers: sequence is the reading order.

**Why.** Equal standing comes from structure: the same heading level, the same role, the same
head-to-content seam and part seam. The row of three runs on different tracks (3, not 5), a wider seam
and visuals larger than the deliverables', so it never reads as a sixth row of the set, and none of
the three is small print.

**The mistake it prevents.** The terms as a text foot, or as more items on the deliverables' tracks.

**How to apply.** Any band with deliverables and the three terms renders `OfferParts` once its
deliverable scenes and its needs/stops drawings exist; until then the old `OfferSheet` stands (the L2
services and expertise pages: a follow-up, once their drawings are made). `WhatYouGetBand` in
`CopyBands.tsx` is the gate, and in development it warns with every title that did not resolve.
