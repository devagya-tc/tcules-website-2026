---
title: "Case studies and covered insights carry an image; service cards do not"
date: 2026-09-28
status: superseded
area: [cards, imagery]
source: "docs/phase-2-decisions.md, owner rulings for Phase 2 (28 Sep 2026), C1"
supersedes: ["2026-09-25-only-case-study-cards-carry-media"]
dbf: ["ch05 §9"]
dbf_status: applied
enforced_by: review
legacy: "phase-2 C1"
---
The cards that carry an image are **case studies, plus every insight or resource with a cover image:
articles, videos, podcasts.** Service, audit, glossary and capability cards stay media-less. This overrode
ch05 v1.0 §9 ("articles, insights… no media").

**Why.** A resource with a cover has an asset that identifies it; withholding it makes a listing of
articles read as a wall of identical boxes. Service-type cards have no such asset and are text cards by
design.

**The mistake it prevents.** Either every card forced to carry a picture (stock or a reused graphic as a
stand-in), or covered articles stripped to text because v1.0 said so.

**How to apply.** `BlockCard` and `ListCard` take media only for those families; one without a cover
takes the media-less state. ch05 §9 "Card imagery by family" was corrected in the 2.10 PR and now says
this, citing C1. Superseded 5 Oct by `2026-10-05-any-card-may-carry-an-image`: any card may carry an image, of any type.
