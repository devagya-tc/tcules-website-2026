---
title: "Which page types are long-form"
date: 2026-08-27
status: active
area: [content]
source: "Owner, 27 Aug 2026"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
legacy: "memory/long-form-page-types.md"
---

Long-form is "anything you would read like an article": insights posts, case studies, event details, podcast details and the legal documents. Services, expertise, audits and tools are categorically NOT long-form; they are composed pages with real shapes.

**Why.** Stated while diagnosing a service page that read as one narrow ribbon of text. The code cannot tell: `AuditBlock`, `ToolBlock`, `ServiceBlock` and `ExpertiseBlock` are near-identical unions and all carry `rich-text`.

**The mistake it prevents.** Rendering a service page's body through `Prose` as a reading flow.

**How to apply.** It decides where `Prose` belongs. A long-form route renders a body field as a reading flow; a non-long-form route composes structured blocks and will take text as fields.
