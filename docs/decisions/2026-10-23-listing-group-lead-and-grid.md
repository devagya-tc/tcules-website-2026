---
title: "A listing group is its lead as the horizontal card, then a grid of three under it"
date: 2026-10-23
status: proposed
area: [layout, cards, type]
source: "Owner, 23 Oct 2026 (listings round, checklist S3)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (Feature and Shelf in src/templates/ListingIndex/compositions.tsx)"
---

On the insights hub every group's first piece is the horizontal card (Teaser `beside`, `xl`) and the
rest sit in a 3-column grid under it: one row of three, two rows where the group has more to show.
Guides are the lead and a "Start here" shelf: rows of titles in three columns under a glyph, an eyebrow
and an editor's heading. Events keep their dated rows: the numeral one step down (stat), the month and
year in small body, titles at h4. Every card's eyebrow is the piece's topic and nothing else, at 12px.
Every section head's link reads "See more", with no count.

**Why.** "Take the page as it exists today, change the first card in each group to a horizontal card,
place the other cards in a 3-col grid below it, standardize what the eyebrow says." Text without a
picture in a card grid "would be hard to consume", so guides get a shelf of rows instead.

**The mistake it prevents.** Each group in its own composition (lead with a stack, cinema, index),
eyebrows that said a topic on one card, a reading time on the next and a date on a third, and head links
that each carried a count.

**How to apply.** `insights.tsx` assigns the groups; `Feature` and `Shelf` draw them. Proposed until the
owner has reviewed the built hub; promoted in the PR that shows it.
