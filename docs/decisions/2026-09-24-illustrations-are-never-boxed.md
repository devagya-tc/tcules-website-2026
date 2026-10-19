---
title: An illustration is never boxed
date: 2026-09-24
status: active
area: [illustration]
source: Owner ruling, 24 Sep 2026; docs/dbf-ch05-amendments.md addendum B4, applied to ch05 v0.9
supersedes: []
dbf: [ch05 §4a]
dbf_status: applied
enforced_by: review
legacy: dbf-ch05-amendments B4
---

An illustration never sits inside a box: no hairline, no panel, no frame, no shadow, in any
placement. Its edges are its own lines. A placement that crops mechanically (BlockCard, ListCard) is
still a crop, so an illustration meant for a card is authored at the card's ratio.

**Why.** A drawing has no edge of its own; a box gives it one it does not have and turns it into a
picture of a picture. Transparent ground lets the page's ground show through.

**The mistake it prevents.** Illustrations dropped into a tinted panel or a ruled frame to "hold"
them on the page, as the 16 Sep amendment 5 proposed before this replaced it.

**How to apply.** `Media kind="illustration"` draws no edge. The one boundary an illustration meets
is a card's own crop box (`2026-09-29-card-crop-box-rules-every-kind`), which is the card's cut, not
the image's edge.
