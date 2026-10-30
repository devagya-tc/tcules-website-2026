---
title: "A service page's items are drawn from their own words, peers at equal weight"
date: 2026-10-26
status: superseded
area: [illustration, layout, components]
source: "Devagya, 26 Oct 2026, product-design service page mock rounds 1–4 (https://claude.ai/artifact/8d5ZWF4hQTMkJ57iZDc4Em), approved to build; branch design/service-page-pd"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
---

Each section of a service page is "visualized in a way that shows what the content says": every promise in
What you get, every complaint in Where we start and every specialist service carries its own drawing, made
from that item's words (flat Sketch scenes, assigned item by item at the content seam). Ways to work with us
is drawn like home's Why Tcules: the Reasons band, an isometric figure per engagement. A set of peers gets
equal weight: "we can't weigh any 2 items heavier", so the specialist services are the bento's tiles on three
equal tracks.

**Why.** The owner's brief for the service pages ("each section is visualized… contextual for every section
but also reusable"), then: "why tcules uses illustrations on the homepage… could we use illustrations for the
ways to work with us section as well?" and "please build… with the same component" for the services.

**The mistake it prevents.** Text-only offer sheets and ledgers, the specialist services weighted wide and
narrow like home's bento, and the round-1 Where we start drawings crammed five across ("too dense and
crammed").

**How to apply.** OfferSheet and VoiceLedger `scene`, Bento `tracks={3}`, Reasons `note`; the offer
scenes in components/Sketch/offer.tsx; assignments in content/sources/offer-scenes.ts; engagement figures from
scripts/illustrations/engagement.mjs. A band draws only when every item has a scene.
