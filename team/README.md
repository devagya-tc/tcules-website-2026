# The website team in Claude Code

Several people work in this repo with Claude, several on a shared Claude account, and every Claude
session starts blank. This setup gives every session the same context, whoever is signed in:

| What | Where | Changed by |
|---|---|---|
| The rules: rulings, brand chapters, components, `CLAUDE.md` | this repo | Devagya, through pull requests; a ruling is logged only after Jatin approves it |
| What's happening: open work, recent merges, handoff notes | GitHub: pull requests and their "Handoff" comments | everyone, through `/ship` and `/handoff` |
| Who is at the keyboard, and their role's guardrails | your own clone folder, never pushed | you, once, with `/onboard` |

Claude account memory and chat history are not used for shared context: they can't be shared between
accounts, and several of us share one.

## Set up once

Paste the prompt in **[`team/onboard.md`](onboard.md)** into Claude Code (the desktop app's **Code**
tab works; no terminal needed) and answer its questions. It checks your tools, signs you in to GitHub,
clones the repo, sets who you are, your role's guardrails and your commit email, and installs the
checks. In an existing clone, type `/onboard`.

Then open Claude Code on the clone folder and accept "trust this folder": project hooks only run in a
trusted folder. The first reply should name you and say what's happening on GitHub.

## What each role's setup does

| Role | Guardrails (in `.claude/settings.local.json`) | Checks after each edit |
|---|---|---|
| designer, gtm | Can't edit rulings, brand chapters, `CLAUDE.md`, `.claude/`, `scripts/`, package files, `.design-sync/`, `.github/`, `team/`; can't push to `main` or force-push | Yes |
| engineer | Can't edit rulings, brand chapters, `CLAUDE.md`, `.claude/`, `team/`; can't push to `main` | Yes |
| owner | None | No |

Guardrails stop accidents, not people: anything they block is a conversation with Devagya, and GitHub
(branch protection, code owners) is the real gate.

## Every day

| When | Do |
|---|---|
| Opening Claude | Nothing: it tells you who you are and what's happening on GitHub |
| Working | Ask for what you need; the checks run after every edit and Claude fixes what they find |
| Work is ready | `/ship`: branch, checks, commit, pull request for Devagya |
| Stopping | `/handoff`: a note on your pull request for whoever picks it up |
| "This should be a rule" | Suggest it in your pull request; it waits for Jatin's approval |

Handoff notes are public (the repo is public): no client-confidential detail in them.
