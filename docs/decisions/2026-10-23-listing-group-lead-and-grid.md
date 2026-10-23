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

On the insights hub every group opens on its lead, the horizontal card: its cover across two thirds,
its copy in the third, centred on the cover, with an action in its format's verb ("Read more", "Watch",
"Listen"). Under it, by what the group has: four cards as a 2 × 2 beside a LIST down the third track
(from 1440; under the cards below it); or the cards in rows of three; or, with no pictures, the list
alone across the column. The list is one hairline box of ruled rows, each its eyebrow and title, sharing
the cards' height so its foot is theirs. Only the guides' list has a head ("Start here"); no other group
needs one, and a topic group shows cards only unless the 2 × 2 fits. Cards are the site's BlockCard at
the small step (an 18 title), compact rows on a phone; a missing eyebrow is not drawn. Events keep their
dated rows: the numeral one step down (stat), the month and year in small body, titles at h4. Eyebrows
say the topic, at 12px. Section heads read "See more", with no count. Group heads are h2, groups a
section-open (128) apart, the 2 × 2 and its list a column (64) apart. The close is the island.

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
(`split="grid"`, `compact`, `play`, a cta) and the list with ListCard (`density="compact"`) in a
Layout that `fillRows`. Proposed until the owner has reviewed the built hub; promoted in the PR that
shows it.
