---
title: Every flat drawing is drawn in one grammar, and only the bento's move
date: 2026-10-26
status: proposed
area: [illustration, motion]
source: "Devagya, 25 Oct 2026, accepting the six rules and the round-3 techniques (docs/research/flat-graphics-grammar.md; round-1 mock https://claude.ai/artifact/KSwSSJaqigrWBTYkxGcSCd); built 26 Oct on design/s2-flat-grammar for the S2 review (tracker 2.26)"
supersedes: []
dbf: ["ch05 §4"]
dbf_status: pending
enforced_by: "review; tokens:check holds the weights and dash to the token layer"
---

Every flat drawing on the site (Sketch on every plate and in the bento; EngagementOptions, TracePlates,
EngagementModel) is drawn in one grammar:

- **Two weights.** 1 for every outline, 2 for every line that carries (copy, the route, a tick, a token).
  The same at every size, so a small drawing gets denser, not fainter. What floats (a cursor, a lens)
  takes the darker lift outline with a flat offset under it.
- **One dash, 6 4**, for whatever is not built yet, a trail, a gap, a level, a drop. The same dash as the
  isometric illustrations.
- **Corners.** 8 for a screen or panel, 4 for anything inside it, pills stay pills.
- **Routes** leave the middle of an edge, run on the axes, turn on one 6-unit arc and end on a port or
  the one arrowhead (filled, 7 long, 8 wide). Ports, turns and line ends sit on the field's 20-unit dots.
- **No words inside a drawing**, and "no improvised marks": people, locks, flags and sparkles are Solar
  glyphs, arcs are true arcs.
- **One focal point**, solid on a soft blue ground. **Hatching** inside a dashed outline for what is not
  built. **Sheets behind** for one of many.

Only the home bento's drawings move (`2026-10-25-bento-drawings-tell-their-story`). Every plate (cards,
list markers, teasers, covers, the studio page) shows the same drawing still, held in its solved state:
"not all of them need to have motion... an article card image doesn't need to be animated".

**Why.** The four flat families each set the style themselves and had drifted: strokes of 1, 2 and 3,
dashes of 5 4, 6 5, 4 4 and 2 3, corners of 4 to 10. One page could show the bento's thin drawings
beside the kit's heavy ones. Devagya liked the bento's thin strokes and asked for drawings
"composed not assembled", with connectors that are not "simply lines from a to b". When round 1 put
words inside the drawings, they "read as some kind of a diagram".

**The mistake it prevents.** The heavy 3-unit Sketch scenes on the home situation selector, cards and
covers beside the bento's light ones. A drawing with labels in it. A new flat family that picks its own
dash. Animating every flat drawing.

**How to apply.** Every flat drawing is a `Sketch` scene: the service and article scenes, and the kit
scenes EngagementOptions (`scope-*`) and TracePlates (`trace-*`) render, so one component and one token
layer draw them all and they cannot drift. A pattern that needs a new flat drawing adds a Sketch scene;
it never draws its own. Applying the grammar means redrawing to all of the list above, not changing the
weights: "the grammar was applied but the drawing is the same as before" (Devagya, 26 Oct, on a
token-only first pass). EngagementModel is a chart, not a scene, and takes the weights and the dash
through its own tokens. Sketch has one weight: the `weight` prop is gone.

Would refine `2026-10-19-bento-sketches-are-light` (light becomes every drawing's weight) once active.
