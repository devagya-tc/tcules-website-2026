---
title: "A text-only card set gets its weight from scale and position"
date: 2026-09-28
status: active
area: [cards]
source: "docs/phase-2-decisions.md, owner rulings for Phase 2 (28 Sep 2026), C2"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
legacy: "phase-2 C2"
---
A text-only card set avoids reading as identical boxes by **scale and position:** weight from type (the
title role, a tight body, the whole card as the link), no box or fill, and variety from `Layout`. **The
owner judges this on screenshots before it ships.**

**Why.** A box or a fill around each card is decoration standing in for hierarchy; type and arrangement
carry it without adding borders.

**The mistake it prevents.** A grid of bordered or tinted rectangles at one size, repeated down the
page.

**How to apply.** `BlockCard` with no media: title role, tight body, the whole card is the link, no edge
or ground. Vary the set through `Layout` tracks. Any card-set change is shown to the owner before merge
(2.10 was shown, not merged, until approved).
