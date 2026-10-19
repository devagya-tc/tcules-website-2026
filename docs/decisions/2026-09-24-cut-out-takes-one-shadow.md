---
title: A cut-out part may carry one drop shadow, never stacked, coloured or in perspective
date: 2026-09-24
status: active
area: [imagery]
source: Owner ruling, 24 Sep 2026; docs/dbf-ch05-amendments.md addendum B2, applied to ch05 v0.9
supersedes: []
dbf: [ch05 §2a]
dbf_status: applied
enforced_by: review
legacy: dbf-ch05-amendments B2
---

A cut-out may carry one drop shadow, `--img-crop-elevation`: never stacked, never coloured, never
with perspective. The old clause "none on the satellites around it" is dropped, so each part of an
assembled cut-out may take its own one shadow.

**Why.** A cut-out has no frame, and one quiet shadow is what lifts a part off the ground it sits on.
More than one, or a coloured or perspective shadow, turns the product into a render.

**The mistake it prevents.** Layered or tinted shadows, glows, perspective tilts on a cut-out
(§2a "Fails if": "more than one shadow on a part"), and a flat capture taking a shadow (it takes
none; its edge is the hairline).

**How to apply.** Read the elevation token, never a local `box-shadow`. One per part; the contrast
panel takes no second shadow.
