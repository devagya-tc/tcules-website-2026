---
title: The nav card takes its own 16:7 asset, never a recropped cover
date: 2026-09-25
status: active
area: [imagery, components]
source: Owner, DBF consistency pass 25 Sep 2026; recorded in ch05 v1.0 §12 decision 14
supersedes: []
dbf: [ch05 §12, ch05 §9]
dbf_status: applied
enforced_by: review
legacy: ch05 §12 14; memory/brand-imagery-rulings-sep-2026.md
---

The SiteNav rail card crops 16:7 and takes its own asset composed for 16:7. Project covers and card
images are not reused there.

**Why.** A 3:2 cover's subject sits in its central 4:3; a 16:7 crop of it cuts through the concept.
The question was deferred to the nav/IA rework on 24 Sep and settled on 25 Sep.

**The mistake it prevents.** Feeding the nav card the nearest cover and letting `object-fit` crop
it, which slices through the subject.

**How to apply.** Nav card content carries a dedicated 16:7 image field. An illustration sits
unboxed within the crop; client work is one cut-out part. Ceiling 80 KB (§9).
