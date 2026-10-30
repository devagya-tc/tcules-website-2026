---
title: "A tile set ends in one dotted card per question"
date: 2026-10-30
status: active
area: [cards, layout]
source: "Owner, 30 Oct 2026, product design review after round 7"
supersedes: [2026-10-30-cta-card-is-dotted-halves]
dbf: []
dbf_status: none
enforced_by: review
---

Each routing question that closes a tile set is its own dotted card in the grid: the question as title, its sentence,
its destinations as arrow links pinned to the foot. Tracks (3 or 4) are chosen so tiles plus cards fill whole rows; when
neither does, the last card spans what its row leaves.

**Why.** Two questions in one split card read as one cramped object; the content is two things, so it is two cards.

**The mistake it prevents.** Forcing separate content into one container.

**How to apply.** Bento `onward` renders one cell per route; `ctaTracks` counts tiles plus cards.
