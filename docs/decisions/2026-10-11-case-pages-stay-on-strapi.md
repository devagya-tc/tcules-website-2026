---
title: "Case study pages stay on Strapi content and slugs"
date: 2026-10-11
status: active
area: [content]
source: "Owner, 11 Oct 2026"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
legacy: "memory/home-review-patterns-oct-2026.md"
---

Case study detail pages stay on Strapi content and Strapi slugs, not the corpus rewrite. Corpus slugs redirect to them via `CASE_SLUG_REDIRECTS`.

**Why.** The owner kept the published case pages as the source of record.

**The mistake it prevents.** Case pages re-sourced from the `_pages` corpus with a second set of slugs.

**How to apply.** Case detail routes read Strapi; any corpus slug is added to `CASE_SLUG_REDIRECTS`.
