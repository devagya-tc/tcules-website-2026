---
title: "Selectors mark the current option and never fade the rest"
date: 2026-10-11
status: active
area: [motion, components]
source: "Owner review, 11 Oct 2026 (home gateway)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
legacy: "memory/home-review-patterns-oct-2026.md"
---

Interactive selectors never fade unselected options; they mark the current one (a gliding ground + arrow). Movement is immediate and glides; no hover-intent lag.

**Why.** Fading the other options makes them look disabled.

**The mistake it prevents.** A selector that dimmed the five unselected situations.

**How to apply.** Gateway and any selector.
