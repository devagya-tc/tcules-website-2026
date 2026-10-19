---
title: "A cut-out's contrast panel is an asset field set at supply"
date: 2026-09-28
status: active
area: [imagery, content]
source: "docs/phase-2-decisions.md, owner rulings for Phase 2 (28 Sep 2026), M4"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
legacy: "phase-2 M4"
---
The cut-out contrast panel (ch05 B5) is an optional **`panel: paper · paper-deep · ink` field on the
asset**, set at supply. Code never guesses it.

**Why.** Whether a cut-out's edge holds against a ground is a judgement made on the asset, by whoever
supplies it. It cannot be inferred reliably from pixels at render time.

**The mistake it prevents.** A component deciding for itself whether to put a panel behind a cut-out, so
the same asset gets a panel in one placement and none in another.

**How to apply.** `Media`/`Figure` render the panel only when the asset carries `panel`, in the named
ground. The field is a Strapi recommendation (`docs/strapi-changes.md`); fixtures set it by hand.
