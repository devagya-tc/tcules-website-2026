---
title: "Reasons: the head above, the items below, each drawing above its words, no hairlines"
date: 2026-10-29
status: superseded
area: [components, layout]
source: "Owner home review, 29 Oct 2026 (feat/new-copy)"
supersedes: [2026-10-29-second-reasons-band-sits-beside]
dbf: []
dbf_status: none
enforced_by: "structure (Reasons has no `beside`; the plan assigns no arrangement)"
---

Every Reasons band puts its head (eyebrow, heading, lead, action) ABOVE, full width, and its items below.
Each item is the drawing above, then the title, then the body, at the full width of its track. No
hairline rules between items. The `beside` arrangement is retired, and with it the plan's rule that the
second Reasons band on a page sits beside.

**Why.** Beside its words the drawing left the text a narrow column ("Why teams choose Tcules" on home:
short titles on three lines), and `beside` split the head into a third with hairlines between the
columns. The owner rejected both on the built home page.

**The mistake it prevents.** A drawing set beside its title and body in a 2×2; a Reasons head in a
leading third with the reasons ruled into columns beside it; the open-then-beside alternation brought
back to tell two adjacent Reasons bands apart.

**How to apply.** `src/patterns/Reasons/` (one item shape; `open` and the specimen-only `boxed`
remain), `--rsn-figure-height` and `--rsn-figure-ratio` in tokens/components/reasons.css, and plan.ts
(no `reasonsArrangements`). How How we work together and Why Tcules, two drawn Reasons bands adjacent
on every offer page, are told apart is the owner's open decision (component-map § F TODO); nothing
substitutes for `beside` until then.
