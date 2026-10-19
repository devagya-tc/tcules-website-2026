---
title: "Prose has no measure; the caller owns the width"
date: 2026-08-27
status: active
area: [components, layout]
source: "Owner, 27 Aug 2026"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
legacy: "memory/prose-has-no-measure.md"
---

`Prose` declares no max-width at all. The caller owns the reading column.

**Why.** A cap could only be narrowed by a caller, never widened, so the primitive decided a page-type question for every route: a 3-to-5-column table was crushed to 668px inside a 1176px column. The owner dropped it rather than relocating it, since the TableOfContents rail narrows long-form tracks anyway.

**The mistake it prevents.** Restoring `max-width: var(--measure-body)` on `.prose`.

**How to apply.** A `Prose` with no track around it runs the full content column; that is expected, not a regression. The argument is in `Prose.module.css` and on `/design/typography`.
