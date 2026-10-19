---
title: Client work is a cut-out at every size, Figure and PageHero included
date: 2026-09-25
status: active
area: [imagery]
source: Owner, DBF consistency pass 24–25 Sep 2026; recorded in ch05 v1.0 §12 decision 02
supersedes: []
dbf: [ch05 §12, ch05 §2, ch05 §2a]
dbf_status: applied
enforced_by: review
legacy: ch05 §12 02; memory/brand-imagery-rulings-sep-2026.md
---

Client work is a cut-out at every placement, including `Figure` and `PageHero` media. A flat capture
is used only where the whole layout is itself the subject, at full column, and the caption says so.

**Why.** Every image is also read at the 326px mobile column, and a rectangular capture stops working
somewhere under 600px. The 24 Sep mobile rule (B3) answered §12's "composed mockups above 600px"
question the other way from its recommendation: cut-outs, always.

**The mistake it prevents.** A whole-screen screenshot as a hero or figure, which reads as a grey
rectangle on a phone. Equally, treating "full column" as licence for a flat capture when the layout
is not the point.

**How to apply.** `Media` and its callers state a `kind`; client work defaults to `cut-out`. Reach for
`capture` only when the layout is the subject, and caption it as such. A cut-out takes no edge; a
capture takes the hairline and `--radius-0`.
