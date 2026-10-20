---
title: "The repo is public, so main's protection is enforced"
date: 2026-10-20
status: active
area: [process]
source: "Owner, 20 Oct 2026 (Claude Code session; docs/main-protected PR)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "GitHub ruleset \"main\" (id 25475637); gh api repos/devagya-tc/tcules-website-2026/branches/main --jq .protected"
legacy: "memory/branch-protection-needs-team-org.md"
---

`devagya-tc/tcules-website-2026` is public so that GitHub enforces protection on `main`. The ruleset "main" requires a pull request and blocks force-pushes and deletion, and nothing can bypass it. `verify` is not a required check yet.

**Why.** GitHub records a rule on a private repo owned by a personal account but does not enforce it. Enforcement there needs a Team or Enterprise organization. Going public was the free route. The client content in `_pages/` was cleared for this because every case study in it is already live on tcules.com, and the owner's words were: "whatever is on the website is already approved to be on the website".

**The mistake it prevents.** From 26 Aug to 20 Oct the rule in Settings for `main` existed but enforced nothing, and a direct push (`ad9fdc4`) went straight through. The `pre-push` hook was the only guard. A second mistake was nearly made in the same session: planning to strip `_pages/` from history over an NDA worry, when the 11 case studies that returned 404 on the new slugs were live under their old ones.

**How to apply.** Every change reaches `main` through a PR. If the repo ever goes private again, protection stops without any warning. Check `protected` on the branches endpoint rather than trusting the Settings page. Before committing client material that is not on the live site, check it against `2026-09-25-written-client-approval-always`, because the repo is now as public as the site.
