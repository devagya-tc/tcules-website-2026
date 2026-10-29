---
title: "A Banner's two actions are one row with a hierarchy: an outlined button, then a link"
date: 2026-10-29
status: active
area: [components, layout]
source: "Owner home review, 29 Oct 2026 (feat/new-copy; home `people`)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (CtaRow's pair: `actions` takes one action or two, the first an outline Button, the second the link; Banner sets its actions a `block` under the text)"
---

A Banner with two actions sets them in ONE row directly under the text they finish, a `block` (24)
from it, with a clear hierarchy: the first a Button with the outlined emphasis, the second the quieter
link. Never a blue solid: that is the page's one main action. Home's people band: "Meet the studio"
the button, "Careers at Tcules" the link.

**Why.** The two links stacked under the lead a `stack` (48) apart from it read as two equal actions
floating away from the words they finish.

**The mistake it prevents.** Two links of one emphasis stacked under a banner's lead (home `people`,
feat/new-copy); a second solid in a band; two links side by side.

**How to apply.** `CtaRow` `actions` takes a pair (`[first, second]`), rendering an outline Button
then the link in a Cluster `block` apart; `Button` `emphasis="outline"` now takes a label (primary only,
at the button's radius, never beside a solid). `Banner` sets its actions a `block` under the lead in
every form. Templates pass a banner's two links with `LinkActions pair`.
