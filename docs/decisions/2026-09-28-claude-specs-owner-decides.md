---
title: "Claude writes the spec and builds; the owner decides and approves"
date: 2026-09-28
status: active
area: [process]
source: "CLAUDE.md § How a component gets made (changed 28 Sep 2026)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
legacy: "CLAUDE.md"
---
**The owner decides; Claude executes.** Claude Code writes the spec, builds it, verifies it and shows the
result. The owner answers the questions only they can answer and approves what they see. Nothing is done
by hand that a script or Claude can do, and nothing waits on the owner except a decision. Claude Design is
optional, for visual exploration only.

**Why.** The previous workflow had the designer paste a brief into Claude Design to get a spec. That step
was manual, and Claude Design cannot see this repo.

**The mistake it prevents.** Specs written by a tool blind to the token layer and shipped components, and
the owner spending time on transcription rather than decisions.

**How to apply.** Specify (`docs/specs/<Component>.md`, open questions marked BLOCKING) → owner decides →
`/build-from-spec` → verify and show → owner approves → PR → `/design-sync`.
