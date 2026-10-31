---
title: "Home's two paths: a small label and its words, then its services as graphic cards on equal tracks"
date: 2026-10-31
status: active
area: [layout, components, illustration]
source: "Owner (Devagya), 31 Oct 2026, home `product-situations` redesigned from scratch: reference board, then mock round 2 (direction 3b with phone B), https://claude.ai/artifact/B5TWF1fiska75aKZjHKXU2"
supersedes: [2026-10-29-paths-service-rows, 2026-10-30-paths-share-lines]
dbf: []
dbf_status: none
enforced_by: "structure (GatewayPaths: no `visual`; links render only as graphic cards with the service's own scene from `serviceSceneFor`)"
---

"Start where your product is" reads its two paths one under the other, the head at the band's left.
Each path is a small label (h5, the sans) over its words (body-sm); its services are flat graphic
cards: the service's own Sketch scene on its plate, the action's authored words under it (h5-lg) and
an arrow at the first line's end. No box, no border: the plate is the card, and the whole card links.
From 1024 the words and the cards are a split (1 : 2, 96 apart). From 768 the cards stand on three
EQUAL tracks for both paths, so a two-service path leaves its third track empty ("lets do equal cards
on desktop"). Below 768 each card is a row: the scene at 144 beside the words, the arrow trailing the
last word ("phone b is good"). The situations carry no drawing of their own.

**Why.** The owner restarted the band "from SCRATCH" after rows, columns and a link list all failed.
The destinations are the content, so they carry the pictures and the larger type; the situation only
says which group you are in, so it is small and never competes with its links (round 6b's clash).
Equal widths keep the five services peers wherever they sit.

**The mistake it prevents.** A situation title set as large as or larger than its links, so the two
fight; a footnote-style list of links under a hero drawing; card widths that change between the two
paths; and a phone card whose thumbnail is too small to read with the arrow squeezing the words onto
four lines.

**How to apply.** `GatewayPaths` (src/patterns/Gateway) and the `--gwy-path-*` / `--gwy-service-*`
tokens; `Situations` in the home template. Specimen: /design/kit/gateway. A band still written as six
single-link situations keeps Gateway's `board`.
