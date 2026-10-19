---
title: Each placement is served derived widths, resized from one master, under a weight ceiling
date: 2026-09-25
status: active
area: [imagery]
source: Owner, DBF consistency pass 25 Sep 2026; recorded in ch05 v1.0 §12 decision 06
supersedes: []
dbf: [ch05 §12, ch05 §9]
dbf_status: applied
enforced_by: review
legacy: ch05 §12 06; dbf-ch05-amendments item 8
---

Every placement is served derived widths and has a per-image weight ceiling, as tabled in ch05 §9.
Every derived width is resized from the one master; a derived width is a resize, never a
recomposition.

**Why.** The 16 Sep amendments found no delivery story between a 2560px master and a 160px ListCard
thumbnail: a 16× downscale, with no `srcset`, no weight budget and no loading priority. The owner
accepted the §9 widths and ceilings on 25 Sep. (The ladder itself was later set to 2560 · 1240 · 652
· 320 by Phase 2 ruling M2, `2026-09-28-image-width-ladder`.)

**The mistake it prevents.** A listing page shipping twelve 2560px masters into 392px cards, or a
per-placement re-crop that drifts from the approved asset.

**How to apply.** `Media` serves the ladder through `srcset`/`sizes` from the master. Each asset must
come in under its slot's ceiling in §9 (e.g. BlockCard 150 KB, ListCard 40 KB).
