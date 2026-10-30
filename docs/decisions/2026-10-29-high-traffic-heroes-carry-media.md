---
title: "High-traffic pages always have a hero illustration or image"
date: 2026-10-29
status: active
area: [layout, imagery]
source: "Owner second review of the 26 Oct copy pages, 29 Oct 2026 (feat/new-copy)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (src/lib/hero-media.ts `HERO_MEDIA_ROUTES`, read by CorpusHero and the Strapi service route; a `<route>#hero` row in docs/image-register.md per route)"
---

"Pages that will be highly visited like contact, about, services level 1, should all always have a hero
illustration or an image." /contact, /about and the seven level-1 services never render a text-only
hero: their hero takes the media arrangement, with the bound asset, the service's kept drawing, or the
labelled placeholder until the art arrives.

**Why.** The owner's ruling at the second review: the first screen of the pages most people land on
was words alone (/contact's right half was empty).

**The mistake it prevents.** /contact and /about on CorpusHero with no `media`, so the hero stacked;
and design-systems, design-engineering, ai-product-ux, product-modernisation and software-development
on the Strapi route's text hero.

**How to apply.** The list is `HERO_MEDIA_ROUTES` in `src/lib/hero-media.ts`. CorpusHero gives a
listed route without `media` its bound hero asset or `placeholderImage(route, 'hero')`, beside the
words; the Strapi service route does the same. Each route has a `hero` row in
docs/image-register.md (`npm run placeholders`); when the drawing or photograph lands, it replaces the
row. A route added to the list needs its row in the same edit.
