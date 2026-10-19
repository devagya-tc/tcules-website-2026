---
title: "A client mark in a strip is capped at about 40px tall"
date: 2026-09-28
status: active
area: [proof]
source: "docs/phase-2-decisions.md, owner rulings for Phase 2 (28 Sep 2026), P2"
supersedes: []
dbf: ["ch05 §10"]
dbf_status: applied
enforced_by: review
legacy: "phase-2 P2"
---
ClientMark size in a strip is **capped at ~40px tall**, and sized to equal visual weight by area
(ch05 §10).

**Why.** Marks vary wildly in proportion; equal width makes wordmarks huge and symbols tiny. Matching
area, under one cap, makes the set read as one weight.

**The mistake it prevents.** A logo strip where a wide wordmark dominates and a square mark disappears,
or marks scaled up past what a strip should carry.

**How to apply.** `ClientMark` sizes each mark to the set's target area, capped at ~40px tall, with the
±15% correction recorded on the asset (ch05 §10). The gap between marks belongs to the `Cluster`. ch05
§10 states the area rule and the cap; the 40px value is the site's.
