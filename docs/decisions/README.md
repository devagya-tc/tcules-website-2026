# Decision log

**Every ruling the owner makes about this site, one file each.** A ruling is any answer that closes a
question: a design call, a brand rule, a component contract, a process change. It is logged in the same
PR as the change that applies it, the way `docs/TRACKER.md` is ticked. A ruling that exists only in a
chat, a review note or an agent's memory will be broken by the next session that never saw it.

Before you design, build or review anything, read the entries for its area in [INDEX.md](INDEX.md). **A logged ruling is
not reopened by a spec, a critic or a reference.** If it is wrong, the owner overturns it with a new
entry that names it in `supersedes`, and the old one is kept, marked `superseded`, so the reversal and
its reason stay readable.

## How an entry is made

`/decide` writes one. By hand: copy `_template.md` to `YYYY-MM-DD-short-slug.md`. The filename is the
id, so parallel worktrees never collide on a number.

| Field | Values |
|---|---|
| `status` | `active` · `proposed` · `superseded`. `proposed` is a design rule not yet designed and tested: context, never applied, kept out of the backlog, promoted to `active` by the owner (decisions/2026-10-22-test-before-ruling). Superseded only when a later entry lists it in `supersedes` |
| `area` | one or more of the areas in the index (`INDEX.md`) |
| `source` | where it was ruled: a review, a PR, a spec's open question, a chat with its date |
| `dbf` | the Digital Branding Framework sections the ruling changes, e.g. `[ch03 §4, ch05 §9]`. Empty when it changes none |
| `dbf_status` | `pending` (the chapter does not say it yet) · `applied` (it does) · `none` (no `dbf`) |
| `enforced_by` | the check that catches a breach (`tokens:check`, `lint`, a fixture), or `review` when only an eye can |
| `legacy` | optional: the id the ruling had before this log, e.g. `phase-2 M2` |

Body: the ruling, then **Why**, **The mistake it prevents**, **How to apply**.

## Keeping the brand framework current

A ruling that changes a chapter of `docs/brand/` is logged `dbf_status: pending` and appears in the
backlog in `INDEX.md`. `/dbf-update <chapter>` applies a chapter's whole backlog in one edit, bumps its version
in the chapter and in `docs/brand/README.md`, and flips those entries to `applied`. The owner then runs
`/ds-publish` to carry the chapter to the Design System artifact. `npm run decisions` (part of
`npm run verify`) warns while a backlog is open but never fails on one: batching is the point.

## The index

**[INDEX.md](INDEX.md)** lists every ruling by area, the brand framework backlog, and what superseded
what. It is generated and git-ignored: `npm run decisions` writes it, and so does `npm run verify`.
It is not committed because every PR that logged a ruling rewrote it, and each merge then left the
other open PRs in conflict (owner, 22 Oct 2026). In a fresh clone or worktree, run `npm run decisions`
before reading it.
