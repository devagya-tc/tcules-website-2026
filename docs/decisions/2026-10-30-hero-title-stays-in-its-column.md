---
title: "A hero's title stays in the copy column, never across the illustration"
date: 2026-10-30
status: active
area: [components, layout]
source: "Owner, 30 Oct 2026"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (CorpusHero no longer passes titleAcross)"
---

A hero's title sits on the left, in the copy column beside the media, however long it is. It never runs across
the column over the copy and the illustration.

**Why.** A title stretched over both halves broke the split: the illustration lost its pairing with the words and
the breadcrumb ended up stranded under the title.

**The mistake it prevents.** Solving a long title by widening it over the media.

**How to apply.** CorpusHero does not set PageHero `titleAcross`. A long title sets more lines in its column.
