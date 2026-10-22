---
title: Generated indexes are never committed
date: 2026-10-22
status: active
area: [process]
source: "Owner, 22 Oct 2026, accepting the proposal after batch-1 merges (PRs #139–#141) conflicted on every merge"
supersedes: []
dbf: []
dbf_status: none
enforced_by: .gitignore
---

The decision log's index (`docs/decisions/INDEX.md`) and `docs/vocabulary.md` are generated and git-ignored.
`npm run decisions` writes the index and `verify` runs it; `ds:build` regenerates the vocabulary before it
publishes. The hand-written `docs/decisions/README.md` stays committed.

**Why.** Every PR that logged a ruling rewrote the committed index, so each merge left every other open PR in
conflict over a file nobody edits by hand. Resolving those conflicts took a pass per PR after every merge.

**The mistake it prevents.** Committing a file a script derives from other committed files, which turns parallel
PRs into serial ones. Once the index stopped being committed, a stale index could no longer fail CI.

**How to apply.** Read `INDEX.md` after `npm run decisions` (run it first in a fresh clone or worktree). Don't
commit a new generated file unless the app imports it at build time, as `*.generated.ts` files are.
