---
title: "Listing group heads take h3, a stack above their pieces"
date: 2026-10-22
status: superseded
area: [type, spacing]
source: "Owner, 22 Oct 2026 (review with Jatin, triage Q10)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
---

A group head inside a listing column ("Articles", "Podcasts", a topic) is the h3 role, and it sits a `stack` (48) above its pieces.

**Why.** "The group title is quite big and quite close to the group below." claude.com/resources sets its group heads at about 36 with 48 under them.

**The mistake it prevents.** The insights hub's curated sections at h2 (43) with a `gutter` (32) to their pieces.

**How to apply.** `--iix-section-title-text` and `CuratedSection` in InsightsIndex. These groups sit inside one page column beside the rail, not bands of their own, so `2026-10-11-display-type-hero-only` (band heads take h1/h2) does not reach them. The case-studies index's group heads are the same job and should follow.

**Proposed, 23 Oct 2026.** Moved back from `active`. The owner judged the 22 Oct title and gap changes as
treating symptoms, and h3 with a `stack` was never tested on a designed listing. The listings design round on
`ListingIndex` tests it; the owner promotes it, changes it or drops it there.
