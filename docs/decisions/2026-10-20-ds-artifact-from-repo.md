---
title: The design system lives in an artifact, generated from the repo
date: 2026-10-20
status: active
area: [process]
source: Owner, Claude Code session, 20 Oct 2026 (the move from Claude Design to the Design System artifact)
supersedes: []
dbf: []
dbf_status: none
enforced_by: npm run ds:build and ds:check (/ds-publish)
---

The design system is the Design System artifact at https://claude.ai/artifact/Ait8sArmESntEWeu5zhryj,
no longer the Claude Design project, and **"repo is source of truth"**: `npm run ds:build` regenerates
it and `/ds-publish` overwrites every generated file on it, whatever was edited on the artifact page.
What the system held from the Claude Design era is moved out of it and archived without loss: **"keep
them somewhere archived so we don't lose anything, not even the discards"** — in the private repo
`devagya-tc/tcules-design-archive`, which the owner chose over two archive artifacts or a local backup.

**Why.** The owner moved the system into an artifact. A library that can be edited in two places drifts
in both, and the repo is where components, specimens and tokens are actually decided and checked.

**The mistake it prevents.** The Claude Design library stopped at 20 components while the repo grew to
70 units; its README still said "all 20", and its token vocabulary was a hand-kept copy. An edit made
on the page would have been the same drift in the other direction.

**How to apply.** Change the code, then `/ds-publish`; never edit a generated file on the artifact. Each
card's preview is its `/design` specimen, so a unit without a specimen ships a floor card until it gets
one. The built-in `/design-sync` targets the retired project and is not run. Nothing is deleted from
the archive repo; restoring a file means copying it out of `project/`.
