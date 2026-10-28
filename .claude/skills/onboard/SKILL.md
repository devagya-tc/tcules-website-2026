---
name: onboard
description: Save who is at the keyboard in this copy of the repo (CLAUDE.local.md), their role's read-only rules and their commit name, or check an existing setup. Asks only what a person must answer.
when_to_use: Use when someone types /onboard, is new to the repo, there is no CLAUDE.local.md in the repo folder, or their identity or commit email needs fixing.
argument-hint: "[member id, if they already said who they are]"
disable-model-invocation: true
---

# Onboard this copy of the repo

Member id from the person, if given: **$ARGUMENTS**

The repo is already here, so follow the prompt in `team/onboard.md` from **step 3** ("Who I am") to
the end, in this folder.

If `CLAUDE.local.md` already exists, show what it says and ask whether to keep it before changing
anything. Never infer who someone is from the Claude account or the computer's user name.
