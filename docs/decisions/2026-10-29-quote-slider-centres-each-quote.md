---
title: "In the testimonial slider each quote is vertically centred in a slot as tall as the tallest quote"
date: 2026-10-29
status: active
area: [proof, layout, components]
source: "Owner (Devagya) notes on the site rebuilt from the 26 Oct copy, 29 Oct 2026 (feat/r4)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (Slider `slideAlign=\"center\"`, Layout `align`; QuoteSlider in src/templates/CorpusPage/blocks.tsx)"
---

Each quote in the one-up testimonial slider is vertically centred in its slot. The slot keeps the tallest
quote's height, so the bars and the rating badge under it never move. The stars move with their quote, which the
owner accepted.

**Why.** A short quote pinned to the top of a slot sized for a long one left a hole above the controls.

**The mistake it prevents.** Short quotes top-aligned in the round 2 slider bands.

**How to apply.** `Slider` takes `slideAlign: 'stretch' | 'center'` (default stretch, so card rows end level).
The testimonial slider passes `center`.
