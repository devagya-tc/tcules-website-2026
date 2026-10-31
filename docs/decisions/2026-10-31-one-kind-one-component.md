---
title: "One kind of section, one component, no fallbacks"
date: 2026-10-31
status: active
area: [layout, process]
source: "Devagya, 30–31 Oct 2026, expertise pages pass (branch design/expertise-pages)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "kinds:check (after a build) against src/templates/CorpusPage/kinds.ts"
---

Every band renders through its kind's one approved component, whatever shape its content takes. A missing
drawing is a labelled placeholder inside that component, and content the component does not expect is shown,
never dropped. A component never falls back to an older design.

**Why.** "how are we messing up on shared components?" The approved hard-parts rows and the four-part What you
get rendered only when every claim had an "Example:" line and every deliverable had a drawing; otherwise they
fell back, silently, to the designs before approval. The owner asked for "a more surgical approach instead of
relying on an agent", efficient on tokens without giving up quality.

**The mistake it prevents.** All twelve expertise pages showing the rejected ruled grid for What you get, eight
hard-parts bands as a text wall (/expertise/content-knowledge-discovery-platforms because one example opened
"Example, for what a result shows:"), HealthTech's four hard parts and two tables on the design-to-code audit
missing from the page.

**How to apply.** Register each kind in `src/templates/CorpusPage/kinds.ts` with the `data-band` its component
writes and its status (`approved` or `to-design`), in the same change that adds it. Run
`npm run build && npm run kinds:check`: it fails on a band rendered by another component, an unregistered
kind, or copy that does not reach its band, and lists the `to-design` kinds as the design queue.
