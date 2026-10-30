---
title: "A tile set ends in a mini call-to-action card spanning two columns"
date: 2026-10-30
status: active
area: [cards, layout]
source: "Owner, 30 Oct 2026, round 5 review of /services/product-design and the L1 service pages"
supersedes: [2026-10-30-onward-cell]
dbf: []
dbf_status: none
enforced_by: "structure (Bento `cta`; Router picks 3 or 4 tracks and builds the card from the closing routes)"
---

A set of service tiles whose band closes with a routing line ("Want the riskiest screens tried in code…")
ends in a mini call-to-action card, two columns wide, holding ALL that content (every question and link).
Columns are 3 or 4, chosen so the last row leaves exactly two cells for the card; when neither does, the card
takes the whole last row.

**Why.** A routing line placed in the last cell read as leftover text; it is an onward action and should be designed as one.

**The mistake it prevents.** Plain text in the eighth cell, and a 2-column cell holding one short line.

**How to apply.** Bento picks 3 or 4 tracks from the item count; the card holds every question and link, its actions as outline button then links.
Five tiles on four tracks (4 + 1) have no two-cell gap: the card takes the whole REST of the last row (three
cells beside the fifth tile), never a row of its own, so the tile rows keep no hole. Actions are numbered across
the whole card in reading order: the first is an outline button, every later one a link with the arrow.

**Card arrangement (30 Oct 2026, round 6 fix pass).** A one-route card stacks as a two-route card does: its question
and sentence in one `tight` group, the actions a `block` below at the foot, at every width. Only a card of three tracks
or more has room to carry a small flat route drawing beside its words (from 1024), so it is designed rather than padded.
From 768 to 1023 a card of two or more routes takes the whole row, its routes side by side, and an odd last tile takes
the row above it, words beside drawing, so the two-track grid keeps no hole and no stretched tile.
