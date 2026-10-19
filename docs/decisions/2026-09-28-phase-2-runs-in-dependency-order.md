---
title: "Phase 2 runs in dependency order, parallel where safe"
date: 2026-09-28
status: active
area: [process]
source: "docs/phase-2-decisions.md, owner rulings for Phase 2 (28 Sep 2026), W3"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
legacy: "phase-2 W3"
---
Phase 2 pacing: **dependency order, parallel where safe.** Independent tasks run side by side in separate
worktrees. The media chain (Media → Figure → PageHero → cards) runs in sequence, each task branched on
the last merged one.

**Why.** Independent tasks gain nothing from waiting; dependent ones break if built on an unmerged base.

**The mistake it prevents.** A card or hero built against a `Media` API that later changed under it, or
foundation tasks serialised for no reason.

**How to apply.** Run independent tasks in their own worktrees. Branch each media-chain task from the
last merged one in the chain.
