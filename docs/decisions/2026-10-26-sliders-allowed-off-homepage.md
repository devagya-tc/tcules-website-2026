---
title: "Sliders are allowed off the homepage when search can read every slide"
date: 2026-10-26
status: active
area: [cards, layout]
source: "Devagya, 26 Oct 2026, product-design service page mock rounds 1–4 (https://claude.ai/artifact/8d5ZWF4hQTMkJ57iZDc4Em), approved to build; branch design/service-page-pd"
supersedes: ["2026-10-16-no-hidden-cards"]
dbf: []
dbf_status: none
enforced_by: "review"
---

The homepage never hides a card behind a slider, tab or click-through. Other pages may use a slider
"as long as it doesn't hurt SEO, GEO, AEO": every slide is in the page as it loads, every card is a real
link, and nothing autoplays. Information the reader must not miss is never put in one ("all information
there is crucial and shouldn't rely on the user to find" — Where we start).

**Why.** "The no card is hidden ruling applies on the homepage but i feel like we can be a little liberal
on other pages." Four case cards in one row were "too dense"; a slider with three showing and the fourth
peeping gives each card room.

**The mistake it prevents.** Four cases crammed across one row on the product-design page (mock round 1),
and the opposite: a slider hiding content a buyer needs, like the starting points.

**How to apply.** The kit Slider, variant 2a (`bleed`): heading left, the row running to the viewport's
edge so the next card peeks. Offer pages run a linked case set of four or more this way
(templates/CorpusPage/OfferBands.tsx `CaseSet`). The homepage keeps every card visible.
