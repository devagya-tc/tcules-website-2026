---
title: "Format pages: a plain head, the formats as one menu, and search with a filter panel"
date: 2026-10-23
status: proposed
area: [layout, components, content]
source: "Owner, 23 Oct 2026 (listings round, after claude.com/resources/product-announcements)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (ListingIndex hero `plain`, IndexRail `menu`, FilterPanel, FilterBar in src/templates/ListingIndex/insights.tsx)"
---

A format's own page (/insights/articles …) opens without a hero band: its title as an h1 and its one
line under it, at the head of the content column beside the rail. The rail is one menu naming the
current format, opening the list of the others under it; there is no in-page list to jump through.
Under the head, a search field (half the column) and, at the row's end, "Filters", after
claude.com's: it opens a side panel (FilterPanel) of the CMS's filter groups — Topic, Product, then
Industry — each a disclosure of chips, with Reset and Apply. Any option within a group, every group at
once. Both are GET forms, so the URL holds them in readable words (`?topic=design-system`, never a CMS
record id) and a filtered page can be shared. A filter in effect adds a results line with "Clear". A
search field draws no browser clear cross ("the 'x' is not on brand"); that is Input's, everywhere. The rows after the cards sit under a section
head ("More guides"), the hub's h2.

**Why.** "These pages should have search and filters." "Let's also just do the filters like the claude reference." "The 'jump to' now needs to change to become a
dropdown … because we're no longer doing in-page nav." "The heroes of these pages are extremely bad.
Let's keep it simple like the claude reference." "'More guides' can be a section title."

**The mistake it prevents.** A one-word display title and a record line in a textured band over a page
whose job is finding a piece; a "Jump to" rail that jumped nowhere.

**How to apply.** Format pages only. The hub stays curated with no filtering
(2026-10-16-insights-hub-is-curated); once this is promoted, that ruling is superseded by an entry that
keeps its hub half and drops its format-page half. Proposed until the owner has reviewed the pages.
