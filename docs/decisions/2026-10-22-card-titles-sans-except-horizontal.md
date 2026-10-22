---
title: "Card titles are sans, except the horizontal card"
date: 2026-10-22
status: active
area: [type, cards]
source: "Owner, 22 Oct 2026 (review with Jatin, triage Q10)"
supersedes: []
dbf: ["ch03 §6"]
dbf_status: pending
enforced_by: "review"
---

Every card's title is set in the sans. The one exception is the horizontal card, where "serif reads nicer for the title": BlockCard horizontal at `lg`, Teaser `beside` at `xl`, and TestimonialCase's cover-beside-claim, each at h3, the smallest serif role.

**Why.** Jatin: "The card's serif font is competing for attention." The owner added that "the larger case study cards also have a quite large title" and chose "the sans-serif font for cards except the horizontal variation".

**The mistake it prevents.** The insights hub's stacked `xl` lead Teaser and BlockCard `lg` set in serif h3 (34px) directly under the section heads, competing with them.

**How to apply.** `--bcrd-title-text-lg` is h4, and only `.horizontal.sizeLg` reads `--bcrd-title-text-horizontal` (h3). `--tsr-title-text-xl` is h4, and only `.beside.sizeXl` reads `--tsr-title-text-xl-beside` (h3). A new card pattern takes a sans role for its title unless it is a horizontal arrangement.
