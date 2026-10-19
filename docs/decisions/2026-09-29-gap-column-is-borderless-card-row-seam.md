---
title: "gap-column is the row seam of a borderless card set"
date: 2026-09-29
status: active
area: [spacing, cards]
source: "CLAUDE.md § The gap scale (29 Sep 2026; landed in kit fdn-spacing, 68aa75b)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
legacy: "CLAUDE.md"
---
`--gap-column` (64) is the column gutter between two peer halves that must read as separate, **and the
row seam of a borderless card set.**

**Why.** A borderless card has no edge to separate it from the row below; at a `stack` or `gutter` seam
the rows run together and the set reads as one block of text. The seam has to do the work the border
would.

**The mistake it prevents.** A borderless card set set at `rowGap="gutter"` (32), where one card's body
reads straight into the next row's title.

**How to apply.** A borderless card set's `Layout` takes `rowGap="column"`. A bordered or boxed card set
keeps its own seam; the two variants are not hybridised.
