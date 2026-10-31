---
title: "A kind is approved on the real pages the census names, not on a /design specimen"
date: 2026-10-31
status: active
area: [process]
source: "Devagya, 31 Oct 2026, expertise pages pass (branch design/expertise-pages)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

A kind of section is reviewed on the live pages that stress it, listed by `npm run corpus:census` under
"Review list" (longest, shortest, most items, a table, a worked example, claims without an example). Kinds get
no `/design` route. `/design` takes a route only for a genuinely new component; the worked-example component
is that exception.

**Why.** "don't build anything in /design because that'll consume tokens … there's already so much clutter in
/design." The real pages already hold the hardest content, and the owner reviews routes in the browser.

**The mistake it prevents.** A specimen per kind fed with copied corpus extremes: a second place to build and
keep current for every kind, adding to /design's clutter.

**How to apply.** Before approving or redesigning a kind, open its review-list links on the running site.
Components still follow CLAUDE.md § Nothing gets a page route before it has a `design/` route.
