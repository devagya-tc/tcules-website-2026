---
title: "Claude makes the Strapi calls and logs them"
date: 2026-09-25
status: active
area: [content, process]
source: "Owner, 25 Sep 2026"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
legacy: "memory/strapi-model-frozen-aug-2026.md"
---

"I don't want to spend a lot of time on the Strapi end because my primary objective is the design of the website. any recommendation i can make about Strapi, I should make." Claude makes the Strapi recommendation itself and writes it up in `docs/strapi-changes.md`.

**Why.** The owner's time goes to design, not CMS modelling.

**The mistake it prevents.** Effort studies or Strapi-side tasks put to the owner for a decision.

**How to apply.** Keep `sources/strapi/*` adapters as thin as the page allows; record each model recommendation in `docs/strapi-changes.md`.
