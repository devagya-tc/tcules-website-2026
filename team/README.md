# The website team in Claude Code

Several people work in this repo with Claude, several on a shared Claude account, and every Claude
session starts blank. This setup gives every session the same context, whoever is signed in:

| What | Where | Changed by |
|---|---|---|
| The rules: rulings, brand chapters, components, `CLAUDE.md` | this repo | Devagya, through pull requests. A ruling is valid once Devagya logs it: Devagya's own, or Jatin's from a feedback session |
| What's happening: open work, recent merges, handoff notes | GitHub: pull requests and their "Handoff" comments | everyone, through `/ship` and `/handoff` |
| Who is at the keyboard, and their role's settings | your own clone folder, never pushed; copied into new worktrees (`.worktreeinclude`) | you, once, with `/onboard` |

Claude account memory and chat history are not used for shared context: they can't be shared between
accounts, and several of us share one.

## Set up once

Paste the prompt in **[`team/onboard.md`](onboard.md)** into Claude Code (the desktop app's **Code**
tab works; no terminal needed) and answer its questions. It checks your tools, signs you in to GitHub,
clones the repo, sets who you are, your role's settings and your commit email, and installs the
checks. In an existing clone, type `/onboard`.

Then open Claude Code on the clone folder and accept "trust this folder": project hooks only run in a
trusted folder. The first reply should name you and say what's happening.

## What happens when a session opens

The startup hook (`.claude/hooks/session-start.mjs`) works out who you are, then brings the folder up
to date **without ever touching unsaved work**:

- It always checks GitHub for new work.
- It brings new work in only when the folder has nothing unsaved and the branch is linked to GitHub,
  and only by moving forward (a fast-forward).
- Otherwise it leaves everything as it is and tells you, in plain words, what's waiting and what's
  unsaved. It never stashes, resets, rebases or checks out over your changes.
- In a worktree, it also tells you about unsaved work left in the main folder.
- If anything gets in the way, the session says what and carries on with your work.

Claude then opens with a short catch-up: what's new, what's open and whose, and the latest handoff.

## What each role's settings do

| Role | Guardrails (in `.claude/settings.local.json`) | Checks after each edit | Git terms |
|---|---|---|---|
| designer | Can't edit rulings, brand chapters, `CLAUDE.md`, `.claude/`, `scripts/`, package files, `.design-sync/`, `.github/`, `team/`; can't push to `main` or force-push | Yes | Never: plain words and plain choices |
| gtm | None for now | No | Never: plain words and plain choices |
| engineer | Can't edit rulings, brand chapters, `CLAUDE.md`, `.claude/`, `team/`; can't push to `main` | Yes | Yes |
| owner | None | No | Yes |

Guardrails stop accidents, not people. The deny rules cover Claude's own file edits; for designer and
engineer, a hook that runs before every shell command (`.claude/hooks/before-shell-guard.mjs`) refuses ones that
would write to the same paths, reading them from those rules. A command that builds its path at run
time can still get past it, so the real gate is GitHub: branch protection on `main`, and Devagya as
code owner. Anything they block is a conversation with Devagya.

Every hook runs `node` from PATH. Without Node installed the hooks don't run at all, and nothing says
so: no catch-up at startup and no checks after edits is the sign. A clone set up before a template
changed picks the change up by running `/onboard` again, which merges the template in.

## Every day

| When | Do |
|---|---|
| Opening Claude | Nothing: it tells you who you are and what's happening |
| Working | Ask for what you need; the checks run after every edit and Claude fixes what they find |
| Work is ready | `/ship`: checks, saves and sends it to Devagya as a pull request |
| Stopping | `/handoff`: a note on your pull request for whoever picks it up |
| "This should be a rule" | Suggest it in your pull request; it's a ruling once Devagya logs it |

Nothing is discarded, overwritten or set aside unless you choose it, and no worktree or folder is
deleted before it's checked for unsaved work and you're asked. Handoff notes are public (the repo is
public): no client-confidential detail in them.
