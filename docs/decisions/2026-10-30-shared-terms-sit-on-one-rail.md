---
title: "Terms shared by every option sit on one rail under the set"
date: 2026-10-30
status: proposed
area: [layout, cards]
source: "Owner, 30 Oct 2026, round 6 brief: a single full-width base that visibly spans and joins all three options; arrangement designed in round 6"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

Under a set of options, the terms that hold for all of them sit on one rail, drawn as a join: a stem rises from a port on the rail to each option's own text (its length absorbs the difference in text height), the rail runs only from the first stem to the last and turns into the outer two at a rounded corner, and the terms sit under it on their own track count, each led by a small mark in a fixed slot, end-aligned beside its words from 768 (words alone below). Below 768 the stacked options share no row, so the three stems cluster into one short bracket. The rail is a drawn connector (flat grammar: lines on the axes turning at corners, accent ports on a softer line) and never appears without its stems, which would make it a ruled divider; a full-width run, or ports hung under the text, would read as a timeline of ordered stages.

**Why.** The two-tier ruling needs the shared tier to be visible as shared; a different track count alone still read as more items, and a box would be a container reflex.

**The mistake it prevents.** Terms set on the options' tracks (five items), a grey hairline divider, or a tinted base box.

**How to apply.** EngagementOptions renders it whenever `terms` are passed; any future set + shared-terms band uses the same rail.
