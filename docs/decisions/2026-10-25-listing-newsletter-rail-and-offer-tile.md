---
title: "A listing's rail carries the newsletter's card; one offer stands among the cards as a tile"
date: 2026-10-25
status: proposed
area: [layout, components, cards]
source: "Owner, 25 Oct 2026 (listings round, after claude.com/resources: the newsletter card and CTA cards)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (IndexRail `aside`, NewsletterCard, OfferTile, Island `size=\"sm\"`, `offerAt` in src/templates/ListingIndex/insights.tsx)"
---

Under a listing's rail, from 1024, the newsletter's card: the letter glyph heading it, the
newsletter's name and line, and the address field with its arrow inside the field's box. A panel
with a white ground and a hairline, as the menu and the filter panel are, and it sticks with the rail.
It is the footer's newsletter, read from the same content. Below 1024 the rail is a one-line bar and
the card is not drawn; the footer's sign-up is the page's last beat.

One offer per view stands among the cards as a tile (OfferTile): an Island at the tile size (a block
inset, every island's radius) on tint, with the pixel field in its far corner, its glyph, a card
title's sans, its line and an arrowed link. It takes the last cell of the second group that has
cards (the first, where only one has), so it is met after one whole group, and it is as tall as the
cards in its row. Two cards and the tile are a row of three, not halves. On a format page it closes
the first grid, which holds one card fewer; a search or a filter in effect drops it. The insights
listings' offer is the Lab.

**Why.** "Maybe we could do a 'subscribe to newsletter' card in the left rail like claude does it. But
I don't mind experimenting with CTA cards in the grid." The Lab's band waited on a picture it does
not have; as a tile its ground and field are its shape.

**The mistake it prevents.** A second newsletter form under the first on a phone; an ask in every
group; a promo dressed as one more article.

**How to apply.** The insights hub and format pages; case studies when its listing takes the same
rail. Proposed until the owner has reviewed it in the browser.
