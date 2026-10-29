---
title: "The insights finder's Type group lists every format, Interviews included"
date: 2026-10-29
status: active
area: [content, components]
source: "Owner second review of the 26 Oct copy pages, 29 Oct 2026 (feat/new-copy, /insights)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (insightsIndexProps in src/app/_insights/hub.tsx: the Type options are KINDS)"
---

The Type group in the /insights finder lists every format the site routes, in picker order: Articles,
Guides, Videos, Events, Podcasts, Research, Interviews. "Type interviews filter item missing."

**Why.** Every retired format page redirects to the hub with its type picked (`/insights/interviews` →
`/insights?type=interviews`, FORMAT_PAGE_REDIRECTS), so every format must be an option a reader can see
picked and unpick. A format with nothing published yet says so in the finder's "Nothing matches" state
rather than vanishing from the list.

**The mistake it prevents.** feat/new-copy built the Type options from `formatsWithContent`, the
formats the CMS listing had filled, so Interviews (and, with the live list as it stands, Podcasts and
Research) were missing while `?type=interviews` still worked.

**How to apply.** `src/app/_insights/hub.tsx`: the Type group maps `KINDS`. The curated BY TYPE view
(used only without the copy) still shows only formats with pieces, because a shelf with nothing on it
is a hole, not a filter.
