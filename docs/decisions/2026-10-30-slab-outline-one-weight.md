---
title: A slab's outline is one weight, front and back, and nothing draws over an outline
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
we can probably fix that." No shape draws on top of an outline: "shapes shouldn't draw on top of outlines"
(second round, 30 Oct).

**Why.** A lighter back edge reads as a second line weight with no meaning. ch05 §4a holds one weight.

**The mistake it prevents.** Bhumika's finals draw the back face at 1.1–1.3 and the front at 1.5–1.6. On
the floor plates the back stroke also scaled with the matrix, so it was thinner still.

**How to apply.**
- Only the visible part of the back outline is drawn, as one stroke with the two silhouette edges, above the
  stacked fills. The fills covered the inner half of the old back stroke, which is part of why it read thin.
- The front outline is drawn after the face's own content, such as a header band, so it sits on top.
- Every part of the outline (front, back, silhouettes, crease) is `non-scaling-stroke` at one on-screen width. A
  scaling stroke on a skewed plate drew heavier on some sides than others (third round, 30 Oct: "varying stroke
  weights on the plates").
`scripts/illustrations/polish.mjs` does it for any stacked slab. If promoted, it belongs to ch05 §4a's
Line weight row.
