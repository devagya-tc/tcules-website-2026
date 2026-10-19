---
title: "Hero media sits at its intrinsic ratio, never cropped"
date: 2026-09-28
status: active
area: [imagery, components]
source: "docs/phase-2-decisions.md, owner rulings for Phase 2 (28 Sep 2026), H3"
supersedes: []
dbf: ["ch05 §9", "ch05 §9a"]
dbf_status: applied
enforced_by: review
legacy: "phase-2 H3"
---
Hero media ratio is **intrinsic**, never cropped (owner, 28 Sep; ch05 §9). Illustrations come from a 1:1
canvas and cut-outs have no fixed ratio; only a case-study banner is authored at 16:9.

**Why.** Only a cropping placement owns a ratio. Full-column media is shown as itself, which is what lets
an illustration and a cut-out sit in a hero at all.

**The mistake it prevents.** A shared hero box (the old 16:9 `--hero-media-ratio`) cropping a 1:1
illustration or a cut-out to fit.

**How to apply.** `PageHero` and `Figure` render stills at intrinsic size. The 16:9 box exists for video
only. A case-study banner is composed at 16:9 at supply (ch05 §9a), not cropped by the component.
