---
title: "Home's two paths: each its own drawing, its title and words, then its services as compact service rows"
date: 2026-10-29
status: active
area: [layout, components, illustration]
source: "Owner (Devagya), 29 Oct 2026, home `product-situations` on the site rebuilt from the 26 Oct copy, rejecting the one-drawing version (3e7f6c8f)"
supersedes: [2026-10-29-paths-one-drawing-two-states]
dbf: []
dbf_status: none
enforced_by: "structure (GatewayPaths: a `visual` per path, `links` rendered only as service rows with the service's own scene from `serviceSceneFor`)"
---

"Start where your product is" is two EQUAL paths, two columns from 1024 and stacked below. Each path
reads down: its OWN drawing (the path's SituationFigure), then the authored title (the serif, the
path's hero) and its paragraphs, then its two or three actions as COMPACT SERVICE ROWS, one per line
under the body: the service's small flat Sketch scene on its plate (the scene the service tile already
draws for that service), the action's authored words as the label, an arrow. The whole row is the
link; hover moves on transform only. No container, no paper-deep, no buttons. Two rows against three
simply makes one column a row longer.

**Why.** "the drawings were never the problem; the cards with 2 and 3 buttons was the problem; one
drawing is a bad idea." The actions are services, so each is shown as that service, in the drawing the
site already uses for it, rather than as a stack of link buttons.

**The mistake it prevents.** The one wide `product-paths` drawing over both columns (3e7f6c8f), and
before it each path closing on a stack of two or three link buttons that read as cards of buttons.

**How to apply.** `GatewayPaths` takes a `visual` per path again and renders each link as a service
row; a link's `scene` comes from `serviceSceneFor` (src/lib/sketches.ts), so a row draws its service's
own scene or none. A service with no scene of its own is never given another subject's: its row shows
the empty plate (`Sketch` with no name) until one is drawn. Today that is the Prototype Readiness Review
(/audits/prototype-readiness-review). The `product-paths` drawing, its generator entry and
SituationFigure's `fit="width"` are removed. Specimen: /design/kit/gateway G.P. Content words never
change: the label is the action as authored ("Design and launch your MVP"), not the service's name.
