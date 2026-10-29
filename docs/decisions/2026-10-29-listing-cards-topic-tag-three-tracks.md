---
title: "Listing cards: the topic is a tag under the title, the grid is always three tracks"
date: 2026-10-29
status: active
area: [layout, cards, type]
source: "Devagya, insights finder rounds 28–29 Oct 2026 (after claude.com/resources), approved built 29 Oct 2026 (design/insights-filters)"
supersedes: ["2026-10-23-listing-group-lead-and-grid"]
dbf: []
dbf_status: none
enforced_by: "structure (cardOf, CardGrid and Feature in src/templates/ListingIndex/compositions.tsx; BlockCard `tag`, `aside`)"
---

On the insights hub a piece's topic is a quiet tag under its title (under the body where there is one,
over any action), the same shape in the curated view and in the finder's results. A curated card has
no eyebrow, because its section already names the format. A results card's label line says its format
and, at the line's end, its date ("ARTICLE … 28 OCT 2026"), because the results mix formats. The
horizontal lead carries no tag: its title and action are its whole copy column. A card grid is always
three tracks: two pieces take two of the three, never halves.

Kept from 2026-10-23-listing-group-lead-and-grid: every group opens on its lead, the horizontal card
(cover across two thirds, copy in the third, an action in its format's verb), its pictured cards in rows
of three under it (1 + 3, or 1 + 6); BlockCard at the small step (an 18 title), compact rows on a phone;
events keep their dated rows; section heads read "See more", no count; group heads h2, groups a
section-open (128) apart.

**Why.** "Why 2 shapes for tags? one is displayed as an eyebrow when in the unfiltered view, the other
is a tag." "Why not just hide the eyebrow in the curated view and show the tag?" On the pictured cards
the tag pinned to the card's foot "don't read as a part of the card" ("go with the tag under the
title"); on the lead "the tag feels like an impediment". "3 items in one row is too much info … we can
add the date to the top right and the topic to the bottom." "The grid should never be 2 cols."

**The mistake it prevents.** The same piece showing its topic as an eyebrow, then as a tag one tick
later; a tag floating at a box-less card's foot, away from its words; a three-fact meta line; two
results stretched to halves.

**How to apply.** `cardOf` (tag without an eyebrow, or the format as eyebrow with `withKind`), `CardGrid`
(`facts` for the results: the date as BlockCard's `aside`, the panel for a piece without a picture),
`Feature` (the lead's `tag={undefined}`). BlockCard places `tag` in its copy group in every arrangement.
The 23 Oct ruling's "no date on a card's line" still holds for the curated view.
