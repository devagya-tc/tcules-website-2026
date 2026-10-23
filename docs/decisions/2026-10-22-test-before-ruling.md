---
title: "Design and test before ruling; untested rules are proposals"
date: 2026-10-22
status: active
area: [process]
source: "Devagya, 22 Oct 2026, after four illustration rules were logged as active before anything was drawn"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "decisions (scripts/decisions.mjs)"
---

A design rule becomes a ruling only after it has been designed and tested. A rule that hasn't been is
logged with `status: proposed`: it is stored as context and marked as an untested proposal, never applied as
a rule, and kept out of the brand-framework backlog. The owner promotes a proposal to `active` once the test
has been seen. Process rulings, and rulings made by looking at a built result, can be `active` straight away.

**Why.** Devagya: "the ruling workflow is wrong. we should design and test first before making any thing a
ruling at all. if we do store them, then they should be marked as untested proposals."

**The mistake it prevents.** On 22 Oct, the illustration acceptance gates, "show the USP", "subject as an
object on one base" and "corners, thickness, fills" were logged as active rulings, pending for ch05, before a
single illustration had been drawn against them. `/dbf-update 05` would have written untested rules into the
brand chapter. All four were withdrawn the same day; what was tried and why it failed is recorded in
`docs/research/illustration-exploration-retro-2026-10-22.md`.

**How to apply.**
- `/decide` asks whether a rule has been tested before logging it (step 0).
- `scripts/decisions.mjs` accepts `proposed`, lists proposals in their own index section, and leaves them out
  of the active count and the brand-framework backlog.
- Promoting a proposal means changing `status` to `active` in the PR that shows the tested result.
