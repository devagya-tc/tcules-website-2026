---
title: "Text never crosses an island's edge"
date: 2026-10-16
status: active
area: [layout, components]
source: "Owner review, 16 Oct 2026 (PR #113)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
legacy: "memory/island-copy-on-ground.md"
---

Only the form panel and an illustration may cross an island edge. Type hanging off the island is "illegal".

**Why.** An island's job is to hold its content; text off its edge reads as broken, unlike a drawing or the form panel deliberately breaking out.

**The mistake it prevents.** The island close with no drawing, where the eyebrow and heading sat above the tint island on the paper band.

**How to apply.** A text column in an overhang island takes head and foot padding that keeps every glyph on the ground (CtaSection `.islandCopyGround`, Island `IslandOnGround`). Check the stress specimens (no art, long copy), not just the home instance.
