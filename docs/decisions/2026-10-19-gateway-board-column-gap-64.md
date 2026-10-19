---
title: The gateway board's items are 64 apart, not the 32 card-set gutter
date: 2026-10-19
status: active
area: [spacing, cards]
source: "Owner, 19 Oct 2026, reviewing the home gateway board after PR #127 merged (fix/gateway-board-gap)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

Gateway's `board` arrangement (home "What do you need next?") sets its items `colGap="column"` (64),
not the card-set `gutter` (32). Owner: "gap between cards is 32px is too small. make it 64px".

**Why.** The board's items have no box, no ground and no rule, so the space between them is the only
thing that separates one situation from the next. At 32 the three columns read as one block of text.

**The mistake it prevents.** PR #127 shipped the board at `colGap="gutter"` (32), the step for cards
in a set, which assumes the cards have something else (a box, a cover) holding them apart.

**How to apply.** Applies to Gateway `board` only. Other card sets keep `gutter` unless the owner rules
otherwise. The row seam is a separate axis, covered by decisions/2026-09-29-gap-column-is-borderless-card-row-seam.
