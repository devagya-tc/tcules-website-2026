---
title: "Insight detail pages take three shapes: read, watch/listen, attend"
date: 2026-10-29
status: proposed
area: [layout, content]
source: "Owner, 29 Oct 2026, answering docs/research/insight-structured-data.md § 5 (PR #166)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
---

An insight detail page takes one of three shapes, chosen by format:
- **read**: article, guide, research and interview;
- **watch / listen**: video, podcast and a past event;
- **attend**: an upcoming event.

Case studies keep `CaseStory`. A format that needs more than its shape gives it (research's findings,
an interview's Q&A) is a variant of that shape, not a fourth template.

**Why.** Each format carries different facts and a different main action (read, play, register), and
the structured data each one needs follows from those facts (docs/research/insight-structured-data.md
§ 3). One shape for all seven formats hides the player, the guests and the event's date. Seven bespoke
templates repeat the same byline, takeaways, FAQ and related reading seven times.

**The mistake it prevents.** Every article, podcast, event, video and case study rendering hero, body
and related in one shape (`src/app/insights/[...slug]`, podcasts and events today), and the opposite
error: one template per format.

**How to apply.** Proposed until the three shapes are designed and the owner has seen them. Shared
slots (byline, dates, takeaways, FAQ, related) are built once and shared by all three shapes.
