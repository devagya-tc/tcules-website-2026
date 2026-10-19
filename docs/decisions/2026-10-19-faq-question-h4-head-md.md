---
title: An FAQ's questions take h4 at medium weight, under a 34 head
date: 2026-10-19
status: active
area: [type, components]
source: Owner review, 19 Oct 2026 (stakeholder note on FAQ contrast, home/service FAQ)
supersedes: []
dbf: ["ch03 §5"]
dbf_status: pending
enforced_by: review
---

An FAQ question takes the h4 role (22 / 20 / 18 down the breakpoints, sans, medium 500), not h5, and
the FAQ band's heading takes `ContentSection` `headingSize="md"` (the h3 role, 34) rather than the
default h2 (43). The answer stays body-sm (14) at `--acc-answer-ink`.

**Why.** The stakeholder said the question and answer still lacked contrast. The 11 Oct fix had
separated them by face, size and ink; the 16 Oct sans move for h5 and the 19 Oct body ceiling took the
face and shrank the size step to 18 / 14. The owner judged 600 "too bold", 22 "too large" and 18
"small" against the 43 head; 20 "feels perfect but isn't in the system". Dropping the head to 34 lets
the existing 22 step read right without adding a new size.

**The mistake it prevents.** The Accordion question at h5 (18, 500) over a 14 answer, under a 43 h2:
the pair read as one paragraph slightly bigger than the next. Also rules out the alternative the owner
raised and set aside — replacing the FAQ heading with an eyebrow, which removes the band's h2 from the
heading tree and leaves the questions without a head.

**How to apply.** `--acc-question-text` / `--acc-question-tracking` read the h4 composite in
`tokens/components/accordion.css`. Every band whose job is an Accordion passes `headingSize="md"`:
ServicePage's `D-faq` archetype (`Bands.tsx`) and StudioPage's FAQ. Question weight stays medium;
reaching for semibold to add contrast is ruled out. Refines, does not replace,
`2026-10-11-faq-question-outranks-answer`.
