---
title: "The article outline's entries are 14px and wrap; nothing is truncated"
date: 2026-10-29
status: active
area: [components, type]
source: "Owner second review of the 26 Oct copy pages, 29 Oct 2026 (feat/new-copy, /insights/cpq-ux-design)"
supersedes: ["2026-10-26-toc-in-the-index-rail-grammar"]
dbf: []
dbf_status: none
enforced_by: "structure (--toc-item-text in tokens/components/table-of-contents.css; TableOfContents.module.css)"
---

In `TableOfContents`, an entry is set at 14px ("item font size 14px") with "no truncation, wrap to new
line": a name longer than the rail wraps, in the rail and in the phone bar's current-section label,
and the sliding marker grows with the row it marks.

Kept from 2026-10-26-toc-in-the-index-rail-grammar: no ordinals; each entry a short contextual marker
authored as `navigationLabel` (the dev warning still names any label over 26 characters); IndexRail's
rail (an "On this page" eyebrow over one rule, then names alone); one 2px marker that grows in at the
first section and slides from row to row by transform only, with no track; the full list always shown on
desktop; below 1024 a sticky bar under the nav names the section in view and opens the list under
itself, spreading to the screen's edges. IndexRail keeps its own marker and its h6 entries.

**Why.** The owner's ruling at the 29 Oct review: the 16px entries cut with an ellipsis hid most of a
whole-heading fallback, and the outline is for reading where you are.

**The mistake it prevents.** The 26 Oct outline's `white-space: nowrap` and `text-overflow: ellipsis`
on every entry ("CPQ software design: wh…"), which the article pages' full-heading labels hit on every row.

**How to apply.** `--toc-item-text: var(--text-body-sm)` (14 / 1.55, regular) and the entries'
`overflow-wrap: break-word` with no ellipsis, in `TableOfContents` only.
