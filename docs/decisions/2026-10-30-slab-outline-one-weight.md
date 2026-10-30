---
title: A slab's outline is one weight, front and back
date: 2026-10-30
status: proposed
area: [illustration]
source: "Devagya, 30 Oct 2026, polish notes on Bhumika's finals (PD V18, Modernisation J11, DE F4, DS R4, AI-UX B4, C2); applied in docs/illustrations/polish-2026-10-30/ and shown for review"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

A thick plane (a screen, tray, plate or card with depth) draws its back outline at the same weight and
colour as its front. The owner: "the outlines of a frame are thick in the front and light in the back so
we can probably fix that."

**Why.** A lighter back edge reads as a second line weight with no meaning. ch05 §4a holds one weight.

**The mistake it prevents.** Bhumika's finals draw the back face at 1.1–1.3 and the front at 1.5–1.6. On
the floor plates the back stroke also scaled with the matrix, so it was thinner still.

**How to apply.** The back outline copies the front's stroke, width and `non-scaling-stroke`.
`scripts/illustrations/polish.mjs` does it for any stacked slab. If promoted, it belongs to ch05 §4a's
Line weight row.
