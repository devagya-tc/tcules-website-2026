---
title: Cut-outs are mastered as PNG with alpha and served as WebP with alpha
date: 2026-09-25
status: active
area: [imagery]
source: Owner, DBF consistency pass 25 Sep 2026; recorded in ch05 v1.0 §12 decision 18
supersedes: []
dbf: [ch05 §12, ch05 §8, ch05 §2a]
dbf_status: applied
enforced_by: review
legacy: ch05 §12 18; memory/brand-imagery-rulings-sep-2026.md
---

A cut-out's master is PNG with alpha. What is served is WebP with alpha, derived from that master.

**Why.** The placement's own ground has to show through a cut-out, so the silhouette is the frame;
that needs alpha at every stage. PNG keeps the master lossless; WebP keeps alpha at a fraction of the
weight, so cut-outs can meet the §9 ceilings.

**The mistake it prevents.** A JPG cut-out with a baked-in white or tint ground that shows as a box
on any other surface, or a PNG served at full weight.

**How to apply.** Supply cut-outs as PNG-with-alpha masters at 2560; the image pipeline serves WebP
with alpha at the derived widths.
