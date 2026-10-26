---
title: "A worked example reads as one strip: problem and fix drawn, the result shown"
date: 2026-10-26
status: active
area: [layout, proof]
source: "Devagya, 26 Oct 2026, product-design service page mock rounds 1–4 (https://claude.ai/artifact/8d5ZWF4hQTMkJ57iZDc4Em), approved to build; branch design/service-page-pd"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
---

A worked example band names its kind in the eyebrow and the case in the heading ("Example" over "Dealpath"),
on tint. The problem and what we did are drawn on the same screen, so the change is the only difference, and
the result is the real capture: three pictures on one ground read left to right, each step's words under its
picture.

**Why.** "'Example: Dealpath', use 'Example' as eyebrow to the section. maybe a tinted band here as well?"
The story reads in its authored order (2026-10-11-case-example-tells-the-story-in-order) and now shows it.

**The mistake it prevents.** The round-6 CaseSpread with an empty evidence slot and the story as text beside
it on paper.

**How to apply.** CaseSpread `scenes` and `eyebrow`; OfferBands splits an authored "Example: X" heading
into eyebrow and heading and plans the band on tint unless a neighbour is tint.
