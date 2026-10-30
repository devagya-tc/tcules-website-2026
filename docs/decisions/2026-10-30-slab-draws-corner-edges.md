---
title: A slab draws its corner edges
date: 2026-10-30
status: proposed
area: [illustration]
source: "Devagya, 30 Oct 2026, polish notes on Bhumika's finals (PD V18, Modernisation J11, DE F4, DS R4, AI-UX B4, C2); applied in docs/illustrations/polish-2026-10-30/ and shown for review"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

A thick plane draws the edges that run between its front and back faces at the corners. "Cuboidal plates
dont have edge markers on the line running perpendicular to the faces at the corners; maybe we can add a
line there?" Each slab gets three such edges:
- the crease, where its two visible side faces meet, drawn mid-corner;
- the two silhouette edges, drawn where the rounded corner turns away.

They take the front outline's weight.

**Why.** Without them, a rounded slab's side reads as a flat colour band rather than a volume.

**The mistake it prevents.** The map plate (PD V18), the trays and bars (DS R4, AI-UX B4 and C2) and every
standing screen. They were drawn as 13–31 stacked fills with no edge between the faces.

**How to apply.** `scripts/illustrations/polish.mjs` adds them from the slab's own geometry. It works out
which faces are visible from the depth direction. If promoted, it belongs to ch05 §4a's Construction row.
