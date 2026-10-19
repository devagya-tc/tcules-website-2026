---
title: "Every component gets a visual pass before Phase 3"
date: 2026-09-29
status: active
area: [process]
source: "docs/TRACKER.md task 2.17 (owner, 29 Sep 2026)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
legacy: "tracker 2.17"
---
**Visual pass before Phase 3.** Every component works; now make each one beautiful. Review every shipped
component's specimen at 1440 and 390 against CLAUDE.md § Design quality and the brand chapters, and
propose per component what to change. The owner approves each proposal before it is built.

**Why.** Phase 2 made components correct; correct is not the bar. Slices built on plain components
inherit their plainness on every page.

**The mistake it prevents.** Starting the service-page slice on components nobody has judged by eye.

**How to apply.** One component (or one tight family) per PR, each proposal approved first, each re-shot
with `npm run shots`.
