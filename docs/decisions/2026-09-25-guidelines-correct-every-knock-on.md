---
title: When a brand rule changes, every knock-on is corrected or removed in the same pass
date: 2026-09-25
status: active
area: [process]
source: Owner, 24 and 25 Sep 2026, during the DBF consistency pass (docs/dbf-consistency-check-2026-09-24.md)
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
legacy: memory/brand-imagery-rulings-sep-2026.md
---

The guidelines must not contradict themselves. When one rule changes, sweep every chapter for
knock-ons and fix them, rather than marking them stale. The owner's words: "we should never leave
incorrect items in the guidelines as void or predates; we correct them or remove them". No status
flags are left in the chapters.

**Why.** A chapter carrying a "stale" or "void" flag still gets read and followed. Five check-and-fix
passes on 24–25 Sep took ch02, ch05 and ch10 to v1.0 with nothing open, deferred or flagged.

**The mistake it prevents.** The 24 Sep redlines that marked §9 "stale, do not supply against it"
and left superseded examples (the OmnyAI cover annotation, the V7 detail-capture figure) in place.

**How to apply.** `/dbf-update` applies a chapter's whole backlog in one edit and sweeps the other
chapters for anything the change contradicts. A decision record row states the outcome and the rule
it is written into, not a status.
