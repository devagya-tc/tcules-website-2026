---
title: "The image width ladder is 2560, 1240, 652, 320"
date: 2026-09-28
status: active
area: [imagery]
source: "docs/phase-2-decisions.md, owner rulings for Phase 2 (28 Sep 2026), M2"
supersedes: []
dbf: ["ch05 §8", "ch05 §9"]
dbf_status: applied
enforced_by: photos:check
legacy: "phase-2 M2"
---
The width ladder is **2560 · 1240 · 652 · 320.** 2560 is the master (ch05 §8), served as-is; 1240 and 652
are the desktop and mobile columns at 1×; 320 is the ListCard thumbnail at 2×. This replaces ch05 §9's 2480.

**Why.** Assets are produced at 2560, and serving the master costs ~3% width and saves a derivative. One
ladder for every placement lets the browser pick by the width the placement states.

**The mistake it prevents.** A 2480 rung that no asset is produced at, forcing an extra resize of every
master, and per-placement ladders that drift apart.

**How to apply.** Strapi upload breakpoints match the ladder (`docs/strapi-changes.md`). `Media` serves
these rungs only. The kit photo catalogue derives 1240, 652 and 320 below each master
(`scripts/photos-derive.mjs`, checked by `photos:check`). ch05 §9 was corrected in the 2.6 PR and now
states the ladder.
