---
title: The SiteNav rail card's image takes radius 4, the named exception to radius 0
date: 2026-09-25
status: active
area: [imagery, components]
source: Owner, DBF consistency pass 25 Sep 2026; recorded in ch05 v1.0 §12 decision 09
supersedes: []
dbf: [ch05 §12, ch05 §6, ch05 §9]
dbf_status: applied
enforced_by: review
legacy: ch05 §12 09; memory/brand-imagery-rulings-sep-2026.md
---

Every image takes `--radius-0`, in every medium, with a named exception: the SiteNav rail card's
image takes `--radius-4`.

**Why.** The card around that image is a control, not an image placement, so it follows the
control's geometry. The question was deferred to the nav/IA rework on 24 Sep and closed on 25 Sep:
keep radius 4 and name it, rather than leave a silent contradiction with §6.

**The mistake it prevents.** Either squaring the nav card to satisfy §6 against its control
geometry, or reading the nav card as precedent for rounding images generally.

**How to apply.** Only `SiteNav`'s rail card rounds its image at `--radius-4`. `Figure`, `PageHero`
and ListCard thumbnails stay at 0. (BlockCard's media crop took a second exception on 29 Sep; see
`2026-09-29-card-image-radius-8`.)
