---
title: "Components are decided in specs, not in whole-page comps"
date: 2026-09-28
status: active
area: [process]
source: "docs/TRACKER.md task 1.2 (dropped 28 Sep 2026)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
legacy: "tracker 1.2"
---
Comping the five contexts as whole pages in Claude Design is **dropped.** Each component's design is
decided in its own spec (Phase 2), and "is the page beautiful" is answered in Phase 3 on the real page.
The one idea kept: the no-visual page is designed first (3.2).

**Why.** Whole pages are the wrong unit before the components are fixed.

**The mistake it prevents.** Page comps built on components that then change under them, so every comp
is redrawn.

**How to apply.** Design work happens per component in `docs/specs/`; page composition is judged on the
built template. `ServicePage` designs its no-visual state first.
