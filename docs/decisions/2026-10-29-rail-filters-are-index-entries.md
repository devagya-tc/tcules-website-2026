---
title: "Rail filters: options are rail entries, group heads and chevrons are quiet"
date: 2026-10-29
status: active
area: [components]
source: "Devagya, insights finder rounds 28 Oct 2026, approved built 29 Oct 2026 (design/insights-filters)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (Chip `look=\"index\"`, Accordion `size=\"sm\"`; tokens --chip-index-*, --acc-label-*)"
---

A filter option in a rail is a rail entry (Chip `look="index"`): the old "Jump to" list's look, grey at
rest, ink on hover and when picked, a picked option marked by the blue bar at its start. No checkbox
square, no tick, no pill. The groups are the FAQ's Accordion at `size="sm"`: each head in the mono label
voice in a quiet grey (not the title ink), its chevron neutral and darkening on hover and when open.
The FAQ's own chevrons stay blue.

**Why.** "I want the options to stay like that. checkboxes look old school." "Filter group titles don't
need to be dark." "Dropdown arrows can be neutral. blue is too much for them."

**The mistake it prevents.** A rail of checkboxes; four blue chevrons and four title-ink heads down a
rail, out-shouting the content beside it.

**How to apply.** Any listing's filter rail (the insights finder today). The rail's scroll box leaves a
focus ring's room on every side (`--irl-controls-ring-room`), so the search field's ring is never cut.
