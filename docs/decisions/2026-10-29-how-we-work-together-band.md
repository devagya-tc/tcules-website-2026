---
title: "How we work together: flat options under a stacked lead, closing terms side by side, one action pair at the end"
date: 2026-10-29
status: superseded
area: [layout, illustration, components]
source: "Owner second review, 29 Oct 2026 (feat/new-copy, /services: \"objectively wrong\"; \"i argue against your logic for #4. both read as different drawings\")"
supersedes: [2026-10-26-service-items-drawn-per-item]
dbf: []
dbf_status: none
enforced_by: "structure (OfferBands `tiles` always renders EngagementOptions; EngagementOptions takes `lead` paragraphs, `terms` and `actions`, and draws only Sketch `scope-*` scenes)"
---

How we work together (and any engagement band, kind `tiles`) is EngagementOptions, on every offer page
and home. The head is the heading and the band's opening paragraphs as its lead, stacked (the page's own
line, then the shared "Bring what you have…"). Each option is drawn in the FLAT grammar (Sketch
`scope-*`), the drawing above its name and words, three options on three tracks. The closing paragraphs
(what we stop at; where the studio is) are equal terms side by side under the options, each on its
hairline, the What you get terms' grammar. The two links are one action pair at the band's end: an
outlined button, then the link (the Banner pair). Nothing sits at the heading's far end. Why Tcules keeps
its isometric reason illustrations; both bands put the head above, the items below, the drawing above
its words, and no hairline between items.

What it keeps from 2026-10-26-service-items-drawn-per-item: every promise in What you get, every
complaint in Where we start and every specialist service carries its own flat drawing, made from that
item's words and assigned item by item at the content seam; a set of peers gets equal weight. What it
drops: Ways to work with us "drawn like home's Why Tcules, an isometric figure per engagement".

**Why.** On /services the band was "objectively wrong": two lead paragraphs, two links floating at the
far right of the heading, three isometric items that read as a second Why Tcules directly above the
real one, then two orphan grey paragraphs. The owner rejected the claim that the two isometric sets read
alike only by arrangement: they read as different drawings once one is flat.

**The mistake it prevents.** The engagement band as a Reasons set with isometric engagement figures; its
closing paragraphs as Callouts or loose muted text; its two links stacked at the heading's end; three
options in a four-track grid.

**How to apply.** `src/patterns/EngagementOptions/` (`lead` as paragraphs, `terms`, `actions`; three
options take three tracks), `--eop-term-*` in tokens/components/engagement-options.css, OfferBands
`tiles` (`LinkActions pair`). Specimen: /design/engagement-options 0. The isometric engagement figures
(public/illustrations/engagement/) are no longer drawn by any page.
