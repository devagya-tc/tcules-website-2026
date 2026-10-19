---
title: "No ground that exists only on hover"
date: 2026-10-19
status: active
area: [motion, cards]
source: "Owner, 19 Oct 2026 (gateway round 11)"
supersedes: ["2026-10-09-boxed-card-has-no-edge"]
dbf: []
dbf_status: none
enforced_by: "review"
legacy: "memory/review-15-oct-2026-queue.md; memory/hover-is-a-move.md"
---

No ground that appears only on hover.

**Why.** The gateway selector's ground showed only on hover, so its indent looked optically wrong at rest; "the whole component must change".

**The mistake it prevents.** BlockCardSet `frame="box"`, which puts a 24 inset in for a hover-only ground (home, About, OfferBands, ServicePage Blocks).

**How to apply.** Any hover state. The plan logged with it is to retire `frame="box"` globally; CLAUDE.md's "a boxed card's inset exists for the hover ground" reads against this ruling.
