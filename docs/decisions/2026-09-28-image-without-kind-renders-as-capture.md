---
title: "An image with no kind renders as a capture"
date: 2026-09-28
status: active
area: [imagery, components]
source: "docs/phase-2-decisions.md, owner rulings for Phase 2 (28 Sep 2026), M3"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
legacy: "phase-2 M3"
---
An image with no `kind` renders **as a capture** (hairline), i.e. today's look, until Strapi records kind.

**Why.** Strapi does not yet carry `kind`, and the capture treatment is what every image had before
`Media` existed, so defaulting to it changes nothing for content that predates the field.

**The mistake it prevents.** Code guessing a cut-out or an illustration from a file name or a ratio, and
dropping the hairline, shadow or panel onto the wrong asset.

**How to apply.** `Media` and `Figure` treat a missing `kind` as `capture`. When Strapi records kind
(`docs/strapi-changes.md`), the field decides; the default only covers its absence.
