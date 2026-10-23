---
title: "A listing group is its lead as the horizontal card, then its cards in rows of three"
date: 2026-10-23
status: proposed
area: [layout, cards, type]
source: "Owner, 23 Oct 2026 (listings round, checklist S3)"
supersedes: ["2026-10-22-listing-group-heads-h3"]
dbf: []
dbf_status: none
enforced_by: "structure (Feature in src/templates/ListingIndex/compositions.tsx)"
---

On the insights hub every group opens on its lead, the horizontal card: its cover across two thirds,
its copy in the third, centred on the cover, with an action in its format's verb ("Read more", "Watch",
"Listen"). Under it, its pictured cards in rows of three (1 + 3, or 1 + 6 where there are more), or two
as halves. No list beside or under the cards: a piece with no picture stays on its format page. Cards
are the site's BlockCard at the small step (an 18 title), compact rows on a phone; a missing eyebrow is
not drawn. Events keep their dated rows: the numeral one step down (stat), the month and year in small
body, titles at h4. Eyebrows say the topic, at 12px. Section heads read "See more", with no count.
Group heads are h2, groups a section-open (128) apart. The close is the island.

A format page (/insights/articles …) opens on the same group, drawn from every piece it has: the lead,
then all its pictured pieces as cards in rows of three. The rest follow as ruled rows (eyebrow, title,
standfirst, a thumbnail at the row's end where there is one) under a "More articles" label, newest
first, with "Show more". Events keep their showcase and dated rows.

**Why.** "Take the page as it exists today, change the first card in each group to a horizontal card,
place the other cards in a 3-col grid below it, standardize what the eyebrow says." A list column beside a 2 × 2,
and a boxed list of text rows, were both built and dropped ("i don't think this is working. lets drop
this idea"). Smaller card
titles "a step smaller (18px instead of 22px)". Text without a picture in a card grid "would be hard to consume".
The h3 group head (2026-10-22, proposed) tied with the lead's h3 serif title in the build and the two
competed; claude.com/resources sets 44 heads over 32 leads and keeps the page calm with the air between
groups, which is what this does.

**The mistake it prevents.** Each group in its own composition, two card components that drew one piece
two ways, eyebrows that said a topic on one card and a date on the next, head links that each carried a
count, and a group head the same size as the title under it.

**How to apply.** `insights.tsx` assigns the groups (`groupOf`) and a format page's order (`insightFormatPage`); `Feature` draws them with BlockCard
(`split="grid"`, `compact`, `play`, a cta), `CardGrid` the later pages' cards, and `Rows` the rest with ListCard. Proposed until the owner has reviewed the built hub; promoted in the PR that
shows it.
