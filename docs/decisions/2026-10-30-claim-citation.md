---
title: "A claim's citation: the client's mark, then the case's own title as the one link"
date: 2026-10-30
status: proposed
area: [proof, cards]
source: "Owner, 30 Oct 2026, round 6 build of the hard-parts claims; proposed until the owner sees it"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

Under a claim's words, its example is cited in one line: the client's approved mark at citation size
(`ClientMark size="sm"`), then the case's own title as the one link, with an arrow that moves on hover.
The Example sentence stays as written and is unlinked, so each claim has exactly one link. A client with
no approved mark shows no mark and no typeset stand-in: the case title already starts with the client's
name.

**Why.** The claim is pictured by its illustration (claim-visual-depicts-the-claim); the example is the
proof, so it is named and linked, not pictured. Two links to the same case in one row read as a mistake.

**The mistake it prevents.** A typeset wordmark standing in for a mark we do not have (ch05 §10), and an
Example sentence and a citation both linking the same case.

**How to apply.** `ChallengesBand` (src/templates/CorpusPage/CopyBands.tsx). Proposed: it becomes a rule
when the owner has seen it in the browser.
