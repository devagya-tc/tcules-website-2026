---
title: The byline carries faces, names and labelled meta; who each person is goes after the content
date: 2026-10-30
status: proposed
area: [layout, content]
source: Owner, 30 Oct 2026, byline directions A–G (https://claude.ai/artifact/9ypGtvvn1ZxJGRr5b5s5fh), picked G
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

Under an insight's title, the byline is one row: the credited people's portraits overlapping and their
names (linked to their author pages), then each meta entry as a label over its value ("Published",
"Updated", "Reading time", and whatever label/value entries the CMS adds). An article's "Written by"
is read to screen readers and not shown. Who each person is (role, company) and a link to more from
them go after the content, in "About the author(s)" or, on a podcast, "In this episode".

**Why.** The owner preferred the quiet top of direction C "because the page isn't frontloaded with
supporting content", but needed the meta structured: Mihir's CMS has dynamic meta entries, each a
label and a value, and C's prose line dropped the publish date. Roles joined under several names
("Medkart, Contrado and Knovos") were hard to read, so roles moved to the end, one per person.

**The mistake it prevents.** The byline that joined names as strings with one shared detail line
under them, and the directions that front-loaded each person's role or a credit list above the
article. Also a prose meta line ("Updated 26 Oct · 8 min read") that a CMS label/value entry cannot
drop into.

**How to apply.** PageHero credits take `HeroPerson` (name, href, portrait); the strip aligns at the
end when it has portraits. `Contributors` renders the end section from the same people with their
roles. Pages pass only the people the content carries (launch rule, 29 Oct 2026). Proposed until the
owner has seen it built on the insight routes.
