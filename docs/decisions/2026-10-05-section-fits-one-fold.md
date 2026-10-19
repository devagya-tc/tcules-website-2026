---
title: "A section fits one fold"
date: 2026-10-05
status: active
area: [layout, spacing]
source: "Owner, 5 Oct 2026; refined in the home review, 11 Oct 2026"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "fold:check"
legacy: "memory/ui-kit-direction-oct-2026.md; memory/home-review-patterns-oct-2026.md"
---

A section must fit in one MacBook Air M2 viewport, treated as the median screen. Section seams of 96+96 are fine. If a band runs taller than about 830px at 1440, split it so each part is one fold. Hero padding past the fold is fine; only the content must fit.

**Why.** A band that needs scrolling to read is no longer one idea on one screen.

**The mistake it prevents.** The home "why" band run as one tall stack of claims; it became one banner per claim, alternating.

**How to apply.** Every band at 1440. `npm run fold:check` measures each band against 830 at 1470 × 830 (and 1700 at 390). When the fold and a full card set collide, shrink or rearrange; never hide cards.
