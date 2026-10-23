---
title: "A listing group is its lead as the horizontal card, then a grid of three under it"
date: 2026-10-23
status: proposed
area: [layout, cards, type]
source: "Owner, 23 Oct 2026 (listings round, checklist S3)"
supersedes: ["2026-10-22-listing-group-heads-h3"]
dbf: []
dbf_status: none
enforced_by: "structure (Feature and Shelf in src/templates/ListingIndex/compositions.tsx)"
---

On the insights hub every group's first piece is the horizontal card and the rest sit in a 3-column
grid under it: one row of three, two where the group has more to show, two leftovers as halves, one
alone not shown ("See more" holds it). The lead locks to the grid: its cover spans two columns and its
copy hangs in the third, from the cover's top edge. The cards are the site's one card, BlockCard — the
same card a piece is under an article — and on a phone the grid's cards are compact rows. Where a group
has pieces without pictures, one grid cell is a list (a glyph, an eyebrow, ruled rows), for variety
inside the row; guides always open their grid on it, "Start here". Events keep their dated rows: the
numeral one step down (stat), the month and year in small body, titles at h4. Every card's eyebrow is
the piece's topic and nothing else, at 12px. Every section head reads "See more", with no count. The
group heads are h2, groups a section-open (128) apart. The close is the island.

**Why.** "Take the page as it exists today, change the first card in each group to a horizontal card,
place the other cards in a 3-col grid below it, standardize what the eyebrow says." "One card on 3-col
grid is built as a list for variety." Text without a picture in a card grid "would be hard to consume".
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
