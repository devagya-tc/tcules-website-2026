---
name: ship
description: Take finished work from the working folder to a pull request for Devagya — branch, checks, commit, push, PR — so nobody needs the terminal.
when_to_use: Use when someone types /ship, says their work is ready, done, or should go for review, or asks to open a pull request.
argument-hint: "[a short title for the work, optional]"
disable-model-invocation: true
---

# Ship this work

Title, if given: **$ARGUMENTS**

Explain each step to the person in one plain line as you go; they may never have used git.

1. **Branch.** If on `main`, create a branch first: `git switch -c <member>/<short-topic>` (member id
   from the session context, topic from the title or the work, lowercase with hyphens). Never commit to
   `main`: it is protected and a push there is refused.
2. **Checks.** Run `npm run verify`. If `node_modules` is missing, run `npm ci` once first. A failing
   check is fixed at its cause, then verify runs again; if a fix needs a path this person can't edit
   (guardrails), stop and say what Devagya needs to change.
3. **Commit.** Stage only the files this work changed (`git status` first; never commit
   `.claude/settings.local.json` or `CLAUDE.local.md`). One commit, message in the repo's style: a
   short summary line, then what changed and why. The author is already set in this clone.
4. **Push and open the pull request.** `git push -u origin <branch>`, then
   `gh pr create --base main --fill` with a body that says, in plain words: what changed, how to see it
   (the `/design` route or page), what was checked, and any proposed ruling for Jatin. Draft
   (`--draft`) if the person says it isn't finished.
5. **Report** the pull request link in one line. Offer `/handoff` if they're stopping.

If anything fails (no GitHub access, push refused, gh not signed in), say what failed in one line and
what fixes it: `gh auth login`, or ask Devagya for repo access.
