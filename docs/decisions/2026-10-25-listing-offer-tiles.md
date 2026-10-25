---
title: "A listing's offers stand among its cards as tiles; the newsletter is one of them, not a rail card"
date: 2026-10-25
status: proposed
area: [layout, components, cards]
source: "Owner, 25 Oct 2026 (listings round, after claude.com/resources: the newsletter card and CTA cards)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (OfferTile, NewsletterField, Island `size=\"sm\"`, `offersAt` in src/templates/ListingIndex/insights.tsx)"
---

An offer in a listing is a tile among the cards (OfferTile): an Island at the tile size on tint, a
block inset and the cards' 8 radius, the pixel field in its far corner. Its glyph heads it, then an
eyebrow naming the kind of offer in the cards' eyebrow voice, a card title's sans and its line. Its
foot sits on the tile's floor: an arrowed link onward, or a form that acts in place. It takes a card's
cell and is as tall as the cards in its row; two cards and a tile are a row of three, not halves.

Each offer appears once per view, one to a group. They start at the second group with cards, so a
reader meets the first after one whole group of pieces, and run on in order. On the insights hub the
newsletter comes first, in its own tile with the address field (NewsletterField, the arrow inside the
field's box), then the Lab. A format page has one, the newsletter, closing its first grid, which
holds one card fewer; a search or a filter in effect drops it. The newsletter is the footer's own,
read from the same content.

The rail carries no card. Its 1-of-5 track is too narrow to hold one.

**Why.** "I don't like the newsletter card. It's too boring and too dense. I think that rail is not
appropriately wide to handle the card. I do like the offer tile idea but the corner rounding is too
off." The Lab's band waited on a picture it does not have; as a tile its ground and field are its shape.

**The mistake it prevents.** A form squeezed into the rail; a tile rounded like a floating band
island in a row of 8-radius covers; an ask in every group; a promo dressed as one more article.

**How to apply.** The insights hub and format pages; case studies when its listing offers anything.
Island's 24 radius stays for a band's island. Proposed until the owner has reviewed it in the browser.
