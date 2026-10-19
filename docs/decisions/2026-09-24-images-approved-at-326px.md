---
title: Every image is approved at the 326px mobile column
date: 2026-09-24
status: active
area: [imagery, illustration]
source: Owner ruling, 24 Sep 2026; docs/dbf-ch05-amendments.md addendum B3, applied to ch05 v0.9
supersedes: []
dbf: [ch05 §8, ch05 §2]
dbf_status: applied
enforced_by: review
legacy: dbf-ch05-amendments B3
---

An image is approved at the narrowest width it renders at on the site: 326px in a 390px viewport
(390 minus two 32px gutters), for full-column and card placements alike, and 160px for a ListCard
thumbnail. One asset serves every width. No image may depend on a mobile-only crop to pass. A
cut-out's scale floor (leading label at least 15px, smallest at least 11px) is measured at that width.
An image that fails is not used, whatever it looks like on desktop.

**Why.** Most readers meet the site on a phone, and an asset approved at desktop size hides its
failure until then.

**The mistake it prevents.** Whole-screen captures at full column that read on a 1440 monitor and
turn to grey noise at 326px; art-directed mobile crops that double the supply.

**How to apply.** Specimens and `npm run shots` show images at 390. Judge every asset there first.
This is why full-column client work is a cut-out
(`2026-09-25-client-work-is-a-cut-out-at-every-size`).
