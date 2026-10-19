---
title: A share preview's 64px hero holds three lines, 50 characters
date: 2026-09-25
status: active
area: [type, content]
source: Owner, DBF consistency pass 25 Sep 2026; recorded in ch10 v1.0 §F2 decision 06
supersedes: []
dbf: [ch10 §F2, ch10 §C3, ch10 §A3]
dbf_status: applied
enforced_by: review
legacy: ch10 §F2 06
---

In the 600px type column of share-preview layouts D and P, the 64px hero holds 3 lines and 50
characters. Copy past it is cut, not accommodated. A3's 55 remains the split-column ceiling on a feed
canvas.

**Why.** A preview is read at unfurl size; a fourth line or a smaller size to fit more makes it
illegible. The limit is set by the column and the size, so the copy gives way.

**The mistake it prevents.** Shrinking the hero or adding a line to fit a long article title.

**How to apply.** Preview generators and briefs count to 50 characters for layouts D and P and write
a shorter preview line where the title runs over.
