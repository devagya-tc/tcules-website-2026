---
title: "The rating badge has a small size, and the footer uses it"
date: 2026-10-30
status: active
area: [proof, components]
source: "Owner, 30 Oct 2026"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (RatingBadge size prop; SiteFooter passes size=\"sm\")"
---

RatingBadge takes `size`: `md` (default, 14px text and 16px marks, 2026-10-29-rating-badge-text-14-marks-16)
and `sm` (12px text, 14px marks, the size before 29 Oct). The site footer uses `sm`; every badge a band
makes as a claim stays `md`.

**Why.** The larger badge was right where the rating is part of a band's argument, and too loud in the
footer beside the tagline and its button.

**The mistake it prevents.** Shrinking the one size back for everyone, or styling the footer badge locally.

**How to apply.** Pass `size="sm"` only where the badge is site chrome. The specimen shows both sizes.
