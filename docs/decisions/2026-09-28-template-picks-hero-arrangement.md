---
title: "The page-type template picks the hero arrangement, never the CMS"
date: 2026-09-28
status: active
area: [components, layout]
source: "docs/phase-2-decisions.md, owner rulings for Phase 2 (28 Sep 2026), H1"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
legacy: "phase-2 H1"
---
Who picks PageHero's arrangement (stacked · beside · below): **the page-type template, per family, in
code.** Never a CMS field. PageHero exposes the arrangement as a presentation prop; templates set it.

**Why.** The arrangement is a property of the page family, not of one page's content. A CMS field would
let one service page look unlike its siblings.

**The mistake it prevents.** An editor-facing layout switch on the hero, and per-page drift inside one
family.

**How to apply.** `PageHero` takes `arrangement` as a prop; each template in `src/templates/` fixes it for
its family. "Media below" is served by `stacked`. No view model in `src/content/types.ts` carries it.
