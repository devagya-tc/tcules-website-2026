---
title: "Case study cards never hold a testimonial"
date: 2026-10-22
status: active
area: [proof, cards, components]
source: "Jatin review, 22 Oct 2026 (triage checklist A2 and Q2; PR feat/case-cards-stage)"
supersedes: ["2026-10-16-testimonial-case-card", "2026-10-16-case-card-is-one-view"]
dbf: []
dbf_status: none
enforced_by: "review"
---

"Case study cards never hold testimonials in them (for now)." A featured case is ONE card, `CaseCard`: the 16:9 cover beside eyebrow, claim, result and the "Read the … case" cue, the whole card its case's link. No stars, quote, portrait or speaker inside it. "Homepage keeps the testimonial section as is": the client's words live in their own band.

The card is still one view, designed as a single object; the cover is a fixed slot, not the thing being redesigned (carried from `2026-10-16-case-card-is-one-view`, minus the testimonial).

**Why.** "Current content looks dense", and the reviewer agreed: the case card with its quote boxed inside read as too much for one card.

**The mistake it prevents.** `TestimonialCase` (PR #111, and the case index's quoted cases in PR #131), which put the client's words in a box inside the case card.

**How to apply.** `src/patterns/CaseCard/` (TestimonialCase renamed and stripped of its voice box; tokens `--ccd-*`). Home's selected work and the case index still feature the cases whose clients the corpus quotes, but show the card without the quote. A later branded-card experiment may change the card's look; it does not bring the quote back without a new ruling.
