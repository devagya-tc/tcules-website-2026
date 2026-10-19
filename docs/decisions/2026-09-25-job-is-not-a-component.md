---
title: "A named job gets a component only when composition cannot serve it"
date: 2026-09-25
status: active
area: [components, process]
source: "Owner, 25 Sep 2026 (handoff proof renderers)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
legacy: "memory/job-is-not-a-component.md"
---

A named communication job (logo strip, testimonial group) is not built literally as a component. "ClientLogoStrip is really just Figures put inside a cluster… i don't want to add a component for everything if it isn't needed as one."

**Why.** A component for every job is the path back to the old repo's 111 bespoke sections.

**The mistake it prevents.** Building the handoff's ClientLogoStrip, TestimonialGroup and CaseStudySelection as components when existing pieces compose them.

**How to apply.** For any named job, first show that existing pieces compose it (in the template). Propose a new component only when the composition needs its own markup or semantics, its own behaviour, or an arrangement the primitives cannot express, and say which. Recorded in `docs/TRACKER.md` 1.1.
