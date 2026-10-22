---
name: onboard
description: Set up this clone for a teammate — who they are, their commit email, and Hub access — or check an existing setup. Asks only what a person must answer.
when_to_use: Use when someone types /onboard, is new to the repo, the startup context says no identity is set, or their Hub access or commit email needs fixing.
argument-hint: "[member id, if they already said who they are]"
disable-model-invocation: true
---

# Onboard this clone

Member id from the person, if given: **$ARGUMENTS**

This repo is already cloned, so follow the prompt in `team/onboard.md` from **step 3** ("Who I am")
to the end, in this folder. Step 1's Node check still matters: if `node --version` is missing or below
20.11.1, say so first, because the startup hook needs it.

If an identity is already set (`.claude/settings.local.json` has `TCULES_MEMBER`), show it and ask
whether to keep it before changing anything. Never infer who someone is from the Claude account or the
computer's user name.
