---
title: "The Strapi model is frozen; reach for the seam first"
date: 2026-08-27
status: superseded
area: [content]
source: "Owner, 27 Aug 2026"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
legacy: "memory/strapi-model-frozen-aug-2026.md"
---

From 27 Aug the Strapi model was frozen: fixes reached for the content seam first, and work needing a model change (splitting `rich-text` into fields on the service, expertise, audit and tool unions) was parked.

**Why.** Stability of the CMS while the rebuild found its shape.

**The mistake it prevents.** Proposing CMS changes for things the seam could do; `renderTable` in `sources/strapi.ts` showed a lot is seam-only.

**How to apply.** Superseded 16 Sep by `2026-09-16-cms-is-not-a-design-constraint`. The durable habit: check whether a fix needs Strapi at all before claiming it does.
