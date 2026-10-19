---
title: A cut-out sits on a flat contrast panel only where its edge falls below 3:1
date: 2026-09-24
status: active
area: [imagery, colour]
source: Owner ruling, 24 Sep 2026; docs/dbf-ch05-amendments.md addendum B5, applied to ch05 v0.9
supersedes: []
dbf: [ch05 §2a, ch05 §5]
dbf_status: applied
enforced_by: review
legacy: dbf-ch05-amendments B5
---

A cut-out sits straight on the placement's ground by default. Where the UI's own edge does not hold
against that ground, below 3:1 against the adjacent ground, it sits on a flat panel of `paper`,
`paper-deep` or `ink` that fills the slot. No hairline, no radius and no second shadow on the panel.
The panel is chosen for contrast, not for decoration: if the cut-out holds its edge, there is no panel.

**Why.** A white-UI cut-out on paper loses its silhouette, and the silhouette is its only frame.
3:1 is the non-text contrast threshold, which makes the rule checkable rather than a matter of taste.
It is the second exception to §5's "nothing of ours over or around an image", beside the annotation
ring.

**The mistake it prevents.** Panels behind every cut-out as decoration, or a white UI vanishing into
a paper band.

**How to apply.** The panel is an asset field set at supply
(`2026-09-28-cutout-contrast-panel-set-at-supply`); `Media` paints it, never a local background.
