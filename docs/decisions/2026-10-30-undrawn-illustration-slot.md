---
title: An undrawn claim or reason shows the labelled illustration slot
date: 2026-10-30
status: proposed
area: [illustration]
source: "Owner, 30 Oct 2026, round 6 build; proposed until the owner sees it"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

A claim or reason whose isometric illustration has not been drawn shows the labelled register placeholder
keyed by its title (`placeholderIllustration`), one slot per claim on every page that carries it, in the
same box as a drawing. Never an older drawing at another scale, and never a cover or a figure panel in its place.

**Why.** The first illustrations were drawn at one scale; a band that mixes two scales, or fills a gap with
a drawing made for another argument, reads as finished when it is not (no-reused-graphics-as-standins).

**The mistake it prevents.** The 140px offer reason drawings left in a band beside the new band-scale ones.

**How to apply.** `docs/image-register.md` rows with page `/_illustrations`; `npm run placeholders`.
A title with no row of its own takes `illustration:pending`, which draws the head alone.
