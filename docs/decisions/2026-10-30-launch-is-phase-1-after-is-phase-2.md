---
title: Launch is phase 1, everything after it is phase 2
date: 2026-10-30
status: active
area: [process]
source: "Owner, 30 Oct 2026, after PR #171 merged"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

A phase is a release. **Phase 1** is everything that ships on Fri 6 Nov 2026. **Phase 2** is everything
after launch. There is no phase 3: anything deferred, however far, is phase 2 until the owner splits it.

**Why.** The owner: "anything post-launch is phase 2. anything in this launch is this phase (1)." The
launch roadmap already used "phase 2" for after 6 Nov, while `docs/TRACKER.md` numbered its build stages
Phase 0 to 6, so "Phase 2" and "Phase 3" meant two different things.

**The mistake it prevents.** Reading tracker "Phase 3" (the product-design slice) as a later release, or
a roadmap "phase 2" item as part of the component overhaul. The tracker's sections are now Stage 0 to 6.

**How to apply.** Say phase 1 or phase 2 only for releases. Older specs, `docs/phase-2-decisions.md` and
the 28 Sep rulings say "Phase 2" for the component-overhaul stage and keep that meaning. New post-launch
items go under the tracker's "Phase 2 — after the 6 Nov launch" and the roadmap's phase 2 list.
