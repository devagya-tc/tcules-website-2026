---
title: "A service tile's drawing always moves on hover"
date: 2026-10-30
status: active
area: [cards, illustration]
source: "Owner, 30 Oct 2026, round 5 review of /services/product-design and the L1 service pages"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

Every service tile (texture + flat drawing) has a hover interaction in its drawing: a move on transform only
(hover-is-a-move), rest to end state and back on one curve. Every tile drawing is checked at zoom for polish:
no stray marks (the UX Research mic), highlights sized to what they highlight (the Data Visualisation bar).

**Why.** The tile is a link; its drawing is the thing that should answer the pointer.

**The mistake it prevents.** Static drawings on some tiles and moving ones on others, and unchecked drawing details.

**How to apply.** ServiceTile's drawing gets one transform-only hover move per scene; check every scene at zoom.
