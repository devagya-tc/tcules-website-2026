---
title: "A shelf's related service or expertise is a card: eyebrow, title, its visual in the middle, an action at the foot"
date: 2026-10-29
status: active
area: [cards, components, illustration]
source: "Owner (Devagya), listing pages of the 26 Oct copy rebuild, 29 Oct 2026 (feat/r3-listings)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (ServiceTile `eyebrow`, `scene` | `picture`, `action`, `wide` in src/patterns/Bento; Shelf and RELATED_ACTION in src/templates/ListingIndex/insights.tsx; relatedOf in src/app/_insights/hub.tsx)"
---

An insights shelf's closing line ("Our related service: …", "Our related expertise: …") is ONE card in the
shelf's grid, read top to bottom: the line's own words before the link as a mono eyebrow, the destination's
name as the title, its visual in the MIDDLE of the card, and a button at the foot. One wording per kind on
every such card: "Explore the service", "Explore the expertise". A service's visual is its own flat drawing
on the service tile's texture; an expertise's is its sector photograph (the one home shows it with), else
its labelled placeholder, never another subject's picture. Where the shelf's pieces fill whole rows, the
card takes the whole row instead of sitting alone on one: words and button beside the visual.

**Why.** The owner asked for the service tile to be restructured as "eyebrow, title, the flat drawing in the
middle, a button at the bottom", and for "Our related expertise: …" lines to take the same structure rather
than stay plain text under a shelf.

**The mistake it prevents.** The 29 Oct service tile with the title over "Our related service" and the drawing
at its foot; "Our related expertise: B2B SaaS and workflow software" as a text line under the SaaS shelf; a
fourth card alone on a row of three.

**How to apply.** Amends 2026-10-29-named-services-are-service-tiles (the tile's line is now its eyebrow; the
tile, texture and own-scene rule stand). Specimen: /design/bento 7, 8, 9.
