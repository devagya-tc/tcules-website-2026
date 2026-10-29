---
title: "The insights hub is the finder: filters in the rail, picks as chips, no format pages"
date: 2026-10-29
status: active
area: [layout, components, content]
source: "Jatin, feedback session 26 Oct 2026 (filters, transcript ~315–368); Devagya ruled the model 28 Oct 2026 and approved the built mock 29 Oct 2026 (design/insights-filters)"
supersedes: ["2026-10-23-format-pages-search-filters-plain-head"]
dbf: []
dbf_status: none
enforced_by: "structure (ListingIndex `finder`, insightFinder in src/templates/ListingIndex/insights.tsx, FORMAT_PAGE_REDIRECTS in src/lib/routes.ts)"
---

/insights is the one place to find any piece. The rail holds the filters, always in the same spot: a
search, then the groups Type, Topic, Stage and Industry, each a disclosure (the FAQ's Accordion at the
rail's `sm` size), Type open and the rest shut. Options are rail entries, not checkboxes. Any option
within a group, every group at once ("design system for SaaS"). A tick applies at once: the URL
changes (`?type=articles&topic=design-systems`, readable slugs), the results change, the page does not
move. With nothing picked the page is the curated BY TYPE view; anything picked, the content column
shows "N results for", each pick as a removable chip, "Clear all" 16 after the chips, then the results
as one grid of cards, twelve at a time. "Show more" adds the next twelve where the reader is, with the
link busy ("Loading more") while they arrive; it never jumps to the top. With nothing matching, the
picks stay ("Nothing matches") so one can be removed.

The format pages (/insights/articles …) and the BY TOPIC view are gone. A section's "See more" opens
the finder with its type picked, and each old format path redirects there (temporary). A podcast's or
an event's own page keeps its path under its format.

**Why.** Jatin: keep the filters "in a permanent location", multi-select across groups, a Myntra-style
"showing results for" row where "whatever you are selecting, it keeps on adding here … and you can easily
remove it"; "URL change hogi, result change hoga, woh more or less stable rahega". Devagya: "we're
replacing the current nav system with what jatin is proposing … then we don't really need the second
level pages as then this page itself becomes the one place to find all and any content"; "the filter
groups need to be collapsible (use the FAQs pattern)"; "show more shouldn't bring me back to the top of
the page". No format URL was live or indexed, and the old site filtered by URL parameters too.

**The mistake it prevents.** A hub with a BY TYPE / BY TOPIC switch, a "Jump to" list and filters only
on seven separate format pages behind a side panel with Apply; a filter tick that reloads to the top;
"Show more" that scrolls the reader away; a zero-result filter that silently shows the unfiltered page.

**How to apply.** `insightsIndexProps` (src/app/_insights/hub.tsx) reads the URL into groups and picks;
`insightFinder` composes the controls, picks and results; ListingIndex's `finder` places them;
Finder.tsx (`FinderForm`, `FinderLinks`, `FinderMore`) applies them in place. The curated view keeps
2026-10-29-listing-cards-topic-tag-three-tracks. Search stays though Jatin called it "not a requirement".
FilterPanel is kept as a pattern but no page uses it now.
