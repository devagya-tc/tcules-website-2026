---
title: "A ruling is valid once Devagya logs it; Jatin's approvals are logged by him"
date: 2026-10-22
status: active
area: [process]
source: "Owner, 22 Oct 2026: review of PR #144, point 1"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

A ruling is valid once Devagya logs it with `/decide`. Jatin has the final approval, but he gives it in
feedback sessions, and Devagya logs those rulings on his behalf. Devagya also makes rulings of his own,
and a later session with Jatin may supersede them. Anyone else's idea, a designer's included, is a
proposal until Devagya logs it.

**Why.** Jatin isn't in the repo day to day, so "logged only after Jatin approves" would leave Devagya's
own calls unrecorded until a session that may be weeks away, and the log would lag the site.

**The mistake it prevents.** The first Design Hub draft (#144) told every session that a ruling exists
only after Jatin approves it, which would have treated Devagya's rulings as proposals.

**How to apply.** Only Devagya runs `/decide`. A ruling from a session with Jatin cites that session as
its `source`; one of Devagya's own cites where he ruled. When Jatin later reverses one of Devagya's
rulings, the new entry `supersedes` it as usual. Designers suggest rulings in their pull request.
