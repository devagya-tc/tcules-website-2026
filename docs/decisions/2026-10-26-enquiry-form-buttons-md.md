---
title: Enquiry form buttons are md, one step down from lg
date: 2026-10-26
status: active
area: [forms, buttons]
source: Devagya, 26 Oct 2026, seen built on /design/enquiry-form (PR for design/enquiry-form-md-buttons)
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

Every button the enquiry form renders — the submit ("Send enquiry", "Request free audit", "Send
message") and "See available times", in the form and in the success view — is `size="md"` (40), "a
step smaller" than the `lg` (48) it shipped with.

**Why.** At 48 the buttons outweighed the form they finish. The owner asked for "a step smaller
variant" and approved it built.

**The mistake it prevents.** `EnquiryForm` hard-coding `size="lg"` on all three buttons because the
form is the close's primary object. The form's prominence comes from the panel and its fields, not
from an oversized button.

**How to apply.** `src/patterns/EnquiryForm/EnquiryForm.tsx`. The buttons do not follow `fieldScale`:
where the fields are `lg` (the enquiry close), the buttons stay `md`.
