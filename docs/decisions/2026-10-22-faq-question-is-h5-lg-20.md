---
title: "An FAQ question is 20px, on a standard h5-lg step"
date: 2026-10-22
status: active
area: [type, components]
source: "Owner, 22 Oct 2026 (Jatin review, checklist Q1)"
supersedes: []
dbf: ["ch03 §2"]
dbf_status: pending
enforced_by: "review"
---

An FAQ question is set at 20px. The size is a standard title step, `--text-h5-lg`: the sans at medium,
20 / 1.26 with title-fine tracking, 18 on phones and no tablet step. It sits between h4 (22) and h5 (18),
and Accordion's question reads it through `--acc-question-text`. The answer is unchanged ("Answer as is").

**Why.** Jatin's review asked for "Question 20px". The owner preferred a standard step over a one-off:
"if we can introduce a 20px and standardize it, that'd be awesome". It refines
`2026-10-11-faq-question-outranks-answer`, since a larger size is how the question out-ranks its answer.

**The mistake it prevents.** The Accordion question set at h5 (18), the same size as a card title, and a
one-off 20px written into one component's tokens where the next row title could not reach it.

**How to apply.** Accordion's question, and any later title that heads its own row in a list read one
row after another. Nothing else moved to h5-lg in this change; a role moves to it only with a reason.
