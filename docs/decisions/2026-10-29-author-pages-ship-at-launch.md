---
title: "Author pages ship at launch"
date: 2026-10-29
status: active
area: [content, process]
source: "Owner, 29 Oct 2026, answering docs/research/insight-structured-data.md § 5 (PR #166)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
---

`/insights/authors` and the eight `/insights/authors/<person>` pages ship on 6 Nov. The owner's
condition: "yes if it isn't changing anything in the timeline". The condition holds, because the 26 Oct
copy already carries all nine pages and the copy build plan already has an author template (tier C,
`docs/page-build/cms-templates.md` § 4 on `feat/new-copy`).

**Why.** Every byline on an article, guide and podcast links to an author page. The page is the `url`
that Google's author markup asks for, and it is where a named, credentialed person becomes an entity
(`ProfilePage` plus `Person`). A byline that links nowhere loses both.

**The mistake it prevents.** Shipping bylines as plain names, or as links to a route that does not
exist. Today `/insights/authors/*` falls through to `[...slug]`.

**How to apply.** The author page is the one Person record that authors, hosts, guests and speakers
link to. If launch dates ever push it out, this ruling falls with its condition, and the owner decides
again.
