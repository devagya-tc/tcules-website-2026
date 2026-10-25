---
name: ship
description: Take finished work from the working folder to a pull request for Devagya — branch, checks, commit, push, PR — so nobody needs the terminal.
when_to_use: Use when someone types /ship, says their work is ready, done, or should go for review, or asks to open a pull request.
argument-hint: "[a short title for the work, optional]"
disable-model-invocation: true
---

# Ship this work

Title, if given: **$ARGUMENTS**

**How to talk.** The session context says whether this person is technical. If not (designer, gtm),
never ask them to rebase, stash, reset, merge or force-push, and don't name git steps at all: say what
is happening to their work ("saving your changes", "sending them to Devagya for review"), offer plain
choices, and do the git work yourself once they choose. Technical roles can see the git terms.

**The one rule.** Nothing is discarded, overwritten or set aside unless the person chooses it. If
something is in the way (a conflict, work that isn't theirs, a refused step), say what it is and the
choices, then carry on with what you can; never stop and wait on it.

1. **Branch.** If on `main`, start a branch for this work: `<member>/<short-topic>` (member id from the
   session context; topic from the title or the work, lowercase with hyphens). Never commit to `main`:
   it is protected.
2. **Check what's in the folder.** `git status`. If there are changes that aren't part of this work,
   ask in plain words which belong ("There are also changes to the footer from before. Include them,
   leave them out for now, or save them as a separate piece of work?").
3. **Checks.** Run `npm run verify` (if `node_modules` is missing, run `npm ci` once first). Fix a
   failure at its cause and run it again. If the fix needs a file this person's role can't edit, say
   what Devagya needs to change, and continue with the rest.
   If `verify` can't run at all because `npm ci` fails (on Windows, often `esbuild.exe` blocked by
   Smart App Control), don't block on it: say in plain words that the full checks couldn't run on this
   laptop, open the pull request anyway, say in its body that local checks didn't run and why, and
   point the person to the checks GitHub runs on the pull request. A `verify` that runs and fails is
   still fixed before shipping.
4. **Commit.** Only the files this work changed; never `.claude/settings.local.json` or
   `CLAUDE.local.md`. One commit in the repo's style: a short summary line, then what changed and why.
5. **Bring in newer work if needed.** If `main` has moved on since this branch started, say so plainly
   ("the site has newer changes since you started"). For technical roles, offer to merge `origin/main`.
   For others, offer to bring them in, and do it with a merge, never a rebase. If it hits a conflict,
   explain which parts of their work and the newer work touch the same thing, and ask which to keep.
6. **Push and open the pull request.** `git push -u origin <branch>`, then `gh pr create --base main`
   with a body that says, in plain words: what changed, how to see it (the `/design` route or page),
   what was checked, and any suggested ruling for Devagya. Draft (`--draft`) if it isn't finished.
7. **Report** the pull request link in one line, and offer `/handoff` if they're stopping.

Never delete a branch, worktree or folder here. If one should go, check it for unsaved and untracked
files first and ask in plain words.

If something fails (no GitHub access, push refused, gh not signed in), say what failed and what fixes
it: signing in to GitHub again, or asking Devagya for access.
