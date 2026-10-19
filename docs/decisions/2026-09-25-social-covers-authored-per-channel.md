---
title: Social and share-preview covers are authored per channel, not taken from the project cover
date: 2026-09-25
status: active
area: [imagery]
source: Owner, DBF consistency pass 25 Sep 2026; recorded in ch05 v1.0 §12 decision 13
supersedes: []
dbf: [ch05 §12, ch05 §9a, ch10 §C1]
dbf_status: applied
enforced_by: review
legacy: ch05 §12 13; memory/brand-imagery-rulings-sep-2026.md
---

A social cover or share preview is not the website's project cover. Each is authored for its
channel; no image is cropped to fit a different ratio.

**Why.** A share preview is designed type on a flat ground at 1.91:1, with a cut-out or illustration
beside the type, never under it. A project cover is a 3:2 image with no type. Recropping one into the
other fails both.

**The mistake it prevents.** Generating OG images or carousel covers by cropping the project cover,
which loses the concept's subject area and leaves no place for the title.

**How to apply.** Every case study's social cover and share preview is a separate brief and file
(ch10 Part C, D1). Pipelines that generate previews compose them; they never derive them from
`cover`.
