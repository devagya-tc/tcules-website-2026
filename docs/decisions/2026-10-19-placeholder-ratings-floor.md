---
title: "Placeholder ratings are never below 4.5"
date: 2026-10-19
status: active
area: [proof]
source: "Owner, 19 Oct 2026 (PR #120)"
supersedes: ["2026-10-10-placeholder-ratings-four-to-five"]
dbf: []
dbf_status: none
enforced_by: "fixture: src/content/sources/fixtures/testimonial-ratings.ts (rating() throws below 4.5)"
legacy: "memory/placeholder-ratings-floor.md"
---

Every testimonial star rating is invented, so none is ever shown below 4.5. This replaces the 10 Oct "4 to 5".

**Why.** The ratings are fake, so a low invented score only costs the site and proves nothing.

**The mistake it prevents.** A 4 or 4.0 placeholder in a fixture, stress specimen or mock.

**How to apply.** Any new placeholder is 4.5 or 5. The floor lives in the fixture's `rating()`, never in `StarRating`, because a real published rating must render as published. The star-rating specimen's 4, 3.5 and 0 prove component states and are not ratings data.
