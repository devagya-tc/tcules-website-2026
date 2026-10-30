---
title: "A slider's countdown bar empties; it never refills before handing over"
date: 2026-10-30
status: active
area: [motion]
source: "Owner round 5 review, 30 Oct 2026 (feat/r5)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

The countdown indicator shows where the carousel is heading, not where its scroll is. On hand-over the old bar stays empty and the next is full from the first frame; a wrap or jump never lights the bars it passes.
