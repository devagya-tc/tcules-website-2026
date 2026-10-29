---
title: "A link button's trailing arrow never breaks onto a line of its own: it stays with the label's last word"
date: 2026-10-29
status: active
area: [components, type]
source: "Owner (Devagya) notes on the site rebuilt from the 26 Oct copy, 29 Oct 2026 (feat/r4): the /case-studies lead card's button"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (Button `GluedLabel` and `.glued` / `.labelHead` in src/components/Button)"
---

A bare link Button with a trailing glyph keeps its last word and the glyph on one line. A long label may still
wrap between its earlier words. "The button label must not break its arrow off", fixed in Button, not per page.

**Why.** At 1440 the case lead's "Read the Benchmark Gensuite case" filled its 292px track, so the arrow fell
alone onto a second line.

**The mistake it prevents.** The label on one line and the arrow by itself under it. The label's ink was an
inline-block, so it could not share a line break with the glyph.

**How to apply.** Button: for `emphasis="link"` with `icon` and a plain-string label, the link is `nowrap`.
Everything before the last word sits in `.labelHead`, which wraps normally, and the label ink is inline on a
link. Applies to every link button, so no caller has to do anything.
