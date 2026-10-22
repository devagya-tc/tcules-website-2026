---
title: "The case-study index opens by stage"
date: 2026-10-22
status: active
area: [content, components]
source: "Jatin review, 22 Oct 2026 (triage checklist S5 and Q11; PR feat/case-cards-stage)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
---

The case-study index's rail offers BY STAGE and BY INDUSTRY, and opens on BY STAGE: "replace 'type' with stage and make stage the default". BY TYPE, the corpus's own bands, is gone as a view.

**Why.** The reviewer asked for the case studies to be grouped by stage, where the client's product stood when the work began, so a 0–1 founder finds work like theirs first.

**The mistake it prevents.** Keeping BY TYPE as the default and adding stage as a third switch, which stacks three ways of sorting on one rail (see `2026-10-16-insights-hub-is-curated`: one switch, not stacked mechanisms).

**How to apply.** `src/app/_corpus/case-index.tsx` (`viewsOf`). The stages are PLACEHOLDERS until the owner names them (`src/content/sources/fixtures/case-stages.ts`, docs/content-proposals.md P51); the CMS field is `stage` (docs/strapi-changes.md § 21). A case nobody filed shows under "Other stages".
