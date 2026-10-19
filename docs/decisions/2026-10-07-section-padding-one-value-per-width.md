---
title: "Section padding is one value per width: 96, and 64 below 768"
date: 2026-10-07
status: active
area: [spacing, layout]
source: "CLAUDE.md § Section and gap-scale rule 4 (owner, 7 Oct 2026)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
legacy: "CLAUDE.md"
---
`Section`'s vertical padding is **one value per width — 96, and 64 below 768** — with the page's first band
taking **48 (tablet) / 32 (phone)** above its content below 1024. `density="strip"` (24) and `flush` (0) are
the only exceptions. Every value comes from `--sec-*` in `tokens/components/section.css` and nowhere else.

**Why.** It is the band's air against the screen, not a distance between two things, so it is the one
place the gap scale may change at a breakpoint. One value per width keeps every band on a page in step.

**The mistake it prevents.** Bands chosen tight or open per instance, so a page's rhythm differs band to
band; or a media query elsewhere swapping one gap step for another.

**How to apply.** `Section` contributes no values of its own; it reads `--sec-*`. No other rule in the
system swaps a step at a breakpoint.
