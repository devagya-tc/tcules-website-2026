---
title: "ContentSection head beside body is static, 1 : 2"
date: 2026-09-28
status: active
area: [layout, components]
source: "docs/phase-2-decisions.md, owner rulings for Phase 2 (28 Sep 2026), O2"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
legacy: "phase-2 O2"
---
ContentSection head-beside-body is **static (not sticky), head 1 : body 2**, from 1024 up.

**Why.** The head names the body; a third of the row is enough for it, and the body needs the reading
width. Sticky was not wanted.

**The mistake it prevents.** A sticky head that follows the reader down a long body, or an even split
that squeezes the body column.

**How to apply.** `ContentSection` `beside` sets tracks `[1,2]` from 1024 through `Layout`, with the split
gap (`section`, 96). Below 1024 it stacks.
