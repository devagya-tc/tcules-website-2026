---
title: "The listings share one structure: a change to one applies to the other"
date: 2026-10-22
status: active
area: [layout, components, process]
source: "Owner, 22 Oct 2026 (after the batch-1 review of the Jatin feedback)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (one template, src/templates/ListingIndex/)"
---

The insights hub, its format pages and the case-study index are ONE template, `ListingIndex`: one
opening (PageHero `masthead`), one rail (curated views, or a picker beside a format page's content),
one section head and one close. What differs between them is data handed in — the views and their
sections, which cards a section's pieces take, the hero's words, the close — never a branch on which
listing it is. A change to one listing is a change to the template, so it reaches every listing.

**Why.** "`/insights` page and `/case-studies` page should share the exact same structure so any
updates to one should apply to the other as well." The 22 Oct group-head fix landed on /insights only,
because the two pages were two templates (InsightsIndex, CaseStudyIndex) sharing only IndexRail.

**The mistake it prevents.** A listing fix that reaches one page and not the other, and two listings
drifting apart one local edit at a time, as the old codebase's 111 sections did. Also the symptom-level
fix: the owner judged the 22 Oct title and gap changes as treating symptoms rather than the root cause,
so the listing's design round is done once, on this template.

**How to apply.** `src/templates/ListingIndex/`: the shell is `ListingIndex.tsx`; what goes in a
section is built beside it (`insights.tsx` for the insights family, `cases.tsx` for case groups) and
handed over as `content`. A new listing (tools, for example) composes the same shell with its own
section builder. Never add a prop that names a listing; add the data the difference needs.
