---
title: "An illustration set's craft: start-aligned in its shared box, routes one opaque colour, one base plate and one centrepiece"
date: 2026-10-30
status: proposed
area: [illustration]
source: "Owner, 30 Oct 2026 (\"go ahead with all the changes, log the rules\"), round 6 critic pass on the hard-parts claims and Why Tcules reasons; proposed until the owner sees it in the browser"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

Four rules for an isometric set drawn for a band, where the drawings share one box and sit beside their words:

1. **Start-aligned in the shared box.** A set drawn for a start-anchored slot puts each drawing's left edge on
   the box's margin (scripts/illustrations/claims.mjs, and the `offer` set in reasons.mjs). The box is shared so the
   set keeps one scale; the start alignment puts every drawing's visible edge on its text column.
2. **A route that crosses the blue plane is one opaque colour.** peridot-200, butt-ended, mitred corners
   (lib `routeSolid`), clipped to the plane where it comes up over the edge, ending inside the item's footprint.
   A dashed thread on the blue plane is paper, never ink.
3. **One light base plate, one blue centrepiece.** The blue slab is never the base the whole drawing stands on;
   it sits on the plate, as in every other drawing of the set. Standing screens carry the thin edge.
4. **Every mark is explained.** No empty frame (an outline must carry the idea it stands for), no connector
   diamond left under an item's foot (a connector that feeds an item ends on its footprint edge), and one solid
   peridot per drawing with at most its echoes.

**Why.** The critic's read-back of round 6: centred drawings in a start-anchored slot left ragged edges 22–70px in
from the titles; the 55% route turned grey-teal over blue and showed a second cap at the plane change; a slab used
as the base became the page's heaviest blue mass; an empty dashed frame took 40% of one drawing and read as nothing.

**The mistake it prevents.** A set that is correct piece by piece and still reads as unaligned, muddy or unexplained
at the size it is shown.

**How to apply.** `npm run illustrations:claims -- --check` and `illustrations:reasons -- --check` regenerate and
check the files; the drawing rules are checked at 4× zoom before showing. Home's reason set predates rule 1 and
stays centred.
