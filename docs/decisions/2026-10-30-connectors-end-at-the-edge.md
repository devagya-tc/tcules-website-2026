---
title: A line or strip ends at the edge of what it reaches, and passes behind what is nearer
date: 2026-10-30
status: proposed
area: [illustration]
source: "Devagya, 30 Oct 2026, polish notes on Bhumika's finals (PD V18, Modernisation J11, DE F4, DS R4, AI-UX B4, C2); applied in docs/illustrations/polish-2026-10-30/ and shown for review"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

A connector, leader or peridot strip stops at the edge of the thing it reaches. It never runs on into it
or over it with a cap or a dot. Where it passes something nearer to the viewer, it goes behind it. The
owner: "I'd also like to avoid [this] where a path overlaps an object… it'd have been cleaner if that
peridot strip ended at the base of the button."

**Why.** A line drawn over its target, or over something in front of it, flattens the drawing into a
diagram laid on top. Ending at the edge keeps the 3D reading, as does
`2026-10-23-illustration-lines-follow-iso-axes`.

**The mistake it prevents.**
- The round-3 strips that bend into and over a button.
- DE F4's rod knobs sitting over both cards.
- DS R4's dashed lines starting on top of the tray's button and cutting across the people.
- PD V18's leaders starting on top of the map's nodes.
- Modernisation J11's dotted line drawn over the nearer screens.

**How to apply.**
- Trim the end to the target's outline. The circle at a line's end stays: "i don't mind keeping the circles
  at the end of lines". It moves to the new end.
- Lines that left one point still leave one point, on the edge, with one dot.
- Mask the line where a nearer object covers it.

`scripts/illustrations/polish.mjs` does both from a per-drawing list of targets and occluders. If promoted,
it belongs to ch05 §4a's Occlusion row.
