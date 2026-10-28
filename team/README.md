# The website team in Claude Code

Everyone working on this repo with Claude gets the same project context, and each person stays
themselves, even when two people use the same Claude account on different computers.

## How it works

| What | Where | Why it works |
|---|---|---|
| **The project context**: rules, rulings, docs, what's in progress | this repo: `CLAUDE.md`, `docs/decisions/`, the docs, the pull requests | Claude Code reads `CLAUDE.md` on every computer, every session. Everyone who pulls has the same context |
| **Who is at the keyboard** | `CLAUDE.local.md` in your own copy of the repo, never pushed | Claude Code reads it automatically too. Bhumika on a shared account still sees "Bhumika" |
| **Not used** for project context | Claude account chat history and memory | It can't be shared between accounts, and a shared account mixes people |

The rule that keeps it true: **anything the team should know goes into the repo** (through a pull
request), not only into a chat.

No installs beyond Git and Claude, no scripts, no background hooks: both files are read by Claude Code
itself.

## Set up once

Paste the prompt in **[`team/onboard.md`](onboard.md)** into Claude Code and answer "who are you?".
In a copy you already have, type `/onboard`.

## What a session does

When you open Claude in the repo, it greets you by name, gets the latest from GitHub (only if
nothing of yours is unsaved; otherwise it tells you and leaves your work alone), and gives a short
catch-up: what changed, what's open, the latest handoff note. These steps are written in `CLAUDE.md`.

## Roles

| Role | Read-only for this role (`.claude/settings.local.json`) | Git terms |
|---|---|---|
| designer | rulings, brand chapters, `CLAUDE.md`, `.claude/`, `scripts/`, package files, `.design-sync/`, `.github/`, `team/`; no pushing to `main` | Never: plain words and plain choices |
| engineer | rulings, brand chapters, `CLAUDE.md`, `.claude/`, `team/`; no pushing to `main` | Yes |
| gtm, owner | nothing | gtm: plain words; owner: yes |

These are built into Claude Code and need no installs. They stop accidents; the real gate is GitHub:
`main` is protected and Devagya reviews every pull request.

## Optional helpers

With the GitHub CLI installed (`gh auth login`): `/ship` sends finished work to Devagya as a pull
request, and `/handoff` leaves a note on it for whoever picks it up next.
