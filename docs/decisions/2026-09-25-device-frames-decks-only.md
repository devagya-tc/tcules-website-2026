---
title: Device frames are permitted in decks and proposals only
date: 2026-09-25
status: active
area: [imagery]
source: Owner, DBF consistency pass 25 Sep 2026; recorded in ch05 v1.0 §12 decision 15
supersedes: []
dbf: [ch05 §12, ch05 §2]
dbf_status: applied
enforced_by: review
legacy: ch05 §12 15; memory/brand-imagery-rulings-sep-2026.md
---

A device frame is permitted in decks and proposals only. On the website and on social, none.

**Why.** On the website the hairline rule on a capture is the frame, and a cut-out's silhouette is its
own edge; a device adds nothing but hardware. Where a frame is allowed, it is a plain rectangle with
the device's own corner radius, one stroke, no hardware detail and no manufacturer marks.

**The mistake it prevents.** Phone and laptop mockups around client work, photoreal device renders,
hands holding phones, 3D renders.

**How to apply.** No component has a device-frame option. `Figure` and `PageHero` render a capture
with a hairline and `--radius-0`, and a cut-out with no edge.
