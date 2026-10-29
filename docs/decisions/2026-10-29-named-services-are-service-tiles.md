---
title: "Services named as a set are the service tile: the textured bento tile with the service's own flat drawing"
date: 2026-10-29
status: active
area: [cards, components, illustration]
source: "Owner second review, 29 Oct 2026 (feat/new-copy: /expertise \"Services we bring to every industry\" as icon + name \"is now illegal\"; the insights shelves' related service \"could be a service card with the textured bg and the flat graphics as a card in the grid of 3\")"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (one resolver, `serviceSceneFor` in src/lib/sketches.ts, feeds Router, DestinationsBand and the insights shelf; a set draws only when every service has its own scene)"
---

Wherever services are directly named as a set, each service is the service tile: the bento tile, its
hairline and pixel-grid texture with the service's own flat Sketch scene on it, as /services/product-design
shows its seven services. Never an icon and a name. A service named beside cards of another kind (an
insights shelf's "Our related service: …") is ONE such tile, a card in that grid: two pieces and their
related service fill the shelf's three tracks. The tile's line is the copy's own words before the link.

Each service draws its OWN scene: the service line's scene, else the specialist service's. A set with a
service that has no scene of its own keeps its current form until one is drawn; a scene is never
borrowed from another subject.

**Why.** "this is now illegal. we show services using the textured cards with flat graphics when services
are being directly named like here." The icon set read as a list of links; the service tile already
carries each service's argument as a drawing.

**The mistake it prevents.** /expertise's eight services as glyph-over-title cards; an insights shelf
closing on a one-line text link to its service; a service set half tiles and half icon cards; a service
given a keyword-matched drawing.

**How to apply.** `serviceSceneFor` (src/lib/sketches.ts) is the one lookup: OfferBands' Router and
CopyBands' DestinationsBand fall back to it, so any router of named services becomes a `Bento`. `ServiceTile`
(src/patterns/Bento) is one bento tile on its own, its wave fitted to itself, for a service sitting in
another set; the insights hub passes a shelf's related service to it and CardGrid / Feature take it as
their `after` card. Specimen: /design/bento 7. Not yet drawn: the sub-services of AI Product UX, Design
Systems, Product Modernisation and Software Development, so their "services you can hire on their own"
bands keep their icon cards until each has a scene.
