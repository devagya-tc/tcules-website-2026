---
title: "Fix the cause of a review note, not the note"
date: 2026-10-01
status: active
area: [process]
source: "Owner, 1 Oct 2026 (service page review)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
legacy: "memory/fix-causes-not-notes.md"
---

"Instead of taking my feedback as action items, i'd like you to first understand and analyze what the actual underlying issue is and then fix it fundamentally. pull as many references as you like."

**Why.** Note-by-note patches are how the old repo grew 111 bespoke sections; the same symptom returns elsewhere unless its cause is fixed.

**The mistake it prevents.** A one-instance tweak that leaves the component, token or rule that produced the note unchanged.

**How to apply.** For each note, name the cause in one line before changing anything; fix it where it lives (a component variant, a token, a CLAUDE.md rule, a type contract) and let the instance follow. Gather real references when the question is design quality. Report as note → cause → fix → where it lives.
