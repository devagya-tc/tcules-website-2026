---
title: "A listing group is its lead as the horizontal card, then four cards beside a list column"
date: 2026-10-23
status: proposed
area: [layout, cards, type]
source: "Owner, 23 Oct 2026 (listings round, checklist S3)"
supersedes: ["2026-10-22-listing-group-heads-h3"]
dbf: []
dbf_status: none
enforced_by: "structure (Feature and Shelf in src/templates/ListingIndex/compositions.tsx)"
---

On the insights hub every group's first piece is the horizontal card, its cover across two of three
columns and its copy in the third, hung from the cover's top edge. Under it: four cards as a 2 × 2 under
the cover, and a list down the third column beside them (a glyph, an eyebrow, ruled rows), as many rows
as end level with the cards — six from 1280, five from 1024; below 1024 the list sits under the cards.
A group without four cards and a list's worth of rows after its lead falls back to a 3-column grid with
one list cell (guides: "Start here" first). The cards are the site's one card, BlockCard, at the small
step (an 18 title); on a phone they are compact rows. Events keep their dated rows: the numeral one step
down (stat), the month and year in small body, titles at h4. Every card's eyebrow is the piece's topic
and nothing else, at 12px. Every section head reads "See more", with no count. Group heads are h2,
groups a section-open (128) apart. The close is the island.

**Why.** "Take the page as it exists today, change the first card in each group to a horizontal card,
place the other cards in a 3-col grid below it, standardize what the eyebrow says." "The large card, then in a
3x2 grid, the first two columns are cards so that's 2x2, and the last column is the 'more articles'
vertical list; designed so it fits well in the space with no awkward gaps or overshoots." Smaller card
titles "a step smaller (18px instead of 22px)". Text without a picture in a card grid "would be hard to consume".
The h3 group head (2026-10-22, proposed) tied with the lead's h3 serif title in the build and the two
competed; claude.com/resources sets 44 heads over 32 leads and keeps the page calm with the air between
groups, which is what this does.

**The mistake it prevents.** Each group in its own composition, two card components that drew one piece
two ways, eyebrows that said a topic on one card and a date on the next, head links that each carried a
count, and a group head the same size as the title under it.

**How to apply.** `insights.tsx` assigns the groups (`groupOf`); `Feature` draws them with BlockCard
(`split="grid"`, `copyAlign="start"`, `compact`, `eyebrowSlot`, `play`) and the list cell with ListCard
(`density="compact"`). Proposed until the owner has reviewed the built hub; promoted in the PR that
shows it.
