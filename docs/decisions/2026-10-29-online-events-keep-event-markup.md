---
title: "Online-only events keep Event markup"
date: 2026-10-29
status: active
area: [content]
source: "Owner, 29 Oct 2026, answering docs/research/insight-structured-data.md § 5 (PR #166)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
---

An online-only event is marked up as `Event`, with:
- `eventAttendanceMode` set to online;
- `location` as a `VirtualLocation`;
- `eventStatus`;
- `organizer` → the Tcules organization.

This holds even though Google's event result requires a physical venue and so shows nothing for these
events. A past event that has a recording also gets the recording's `VideoObject`.

**Why.** The markup is still valid schema.org, other engines read it, and it costs nothing once the
event fields are generated. Treating webinars as video premieres instead would mislabel what they are.

**The mistake it prevents.** Dropping the markup from webinars because the Rich Results Test shows
nothing for them, or forcing them into a video-only shape.

**How to apply.** The event structured-data builder in `src/lib/`. Fields come from the live Strapi
event as it ships (decisions/2026-10-29-launch-writes-nothing-beyond-the-content).
