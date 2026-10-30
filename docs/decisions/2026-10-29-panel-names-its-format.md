---
title: "A pictureless insight card names its format beside its glyph"
date: 2026-10-29
status: active
area: [cards, iconography]
source: "Owner (Devagya), listing pages of the 26 Oct copy rebuild, 29 Oct 2026 (feat/r3-listings)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (CardGrid's panel in src/templates/ListingIndex/compositions.tsx carries `eyebrow: LABEL[kind].one` beside `icon`)"
---

Every panel card (an insight without a picture) shows its format's glyph WITH the format's name beside it
(Article, Guide, Podcast, Video, Interview…), as the resource rows set them, in the curated shelves as in the
finder's results.

**Why.** The owner: the glyph-only panel cards "are missing the FORMAT TEXT".

**The mistake it prevents.** The /insights shelves' panels showing a lone blue glyph at their head while the
results' panels said "ARTICLE"; a glyph never stands without its format word
(2026-10-29-resource-rows-meta-format-then-length).

**How to apply.** `CardGrid` in src/templates/ListingIndex/compositions.tsx: the panel object carries the
eyebrow, so every panel gets it whatever the placement.
