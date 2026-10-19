---
title: "Form errors appear only after Send"
date: 2026-10-16
status: active
area: [forms]
source: "Owner, 16 Oct 2026 (PR #113)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
legacy: "memory/form-errors-on-submit.md"
---

"Errors must not show until a person clicks submit. we don't show errors on focus change." Validate on submit, focus the first invalid field, and clear a message once its field is valid; editing never adds one.

**Why.** Judging a field the moment someone leaves it nags people mid-task; the form speaks only when asked to send.

**The mistake it prevents.** EnquiryForm, blur-validated by its own spec until PR #113.

**How to apply.** Every form, mock or component: no onBlur/onChange error display.
