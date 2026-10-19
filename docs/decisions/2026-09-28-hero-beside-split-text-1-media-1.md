---
title: "PageHero beside is text 1 : media 1 from 1024"
date: 2026-09-28
status: active
area: [layout, components]
source: "docs/phase-2-decisions.md, owner rulings for Phase 2 (28 Sep 2026), H2"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
legacy: "phase-2 H2"
---
The PageHero 'beside' split, from 1024 up, is **text 1 : media 1.** Below 1024 it stacks, text then media.

**Why.** An even split gives the media enough width to read as itself (an illustration from a 1:1 canvas,
a cut-out at intrinsic size) without starving the title.

**The mistake it prevents.** A narrow media column beside a wide text column, where the drawing shrinks
below legibility, or a media-first stack on mobile that pushes the h1 below the fold.

**How to apply.** `PageHero` `beside` sets equal tracks from 1024 through `Layout`, with the split gap
(`section`, 96). Below 1024 it is one track, text first.
