---
name: onboard
description: Set up this clone for a teammate — who they are, their role's settings, their commit email and GitHub access — or check an existing setup. Asks only what a person must answer.
when_to_use: Use when someone types /onboard, is new to the repo, the session context says no identity is set, or their role settings, commit email or GitHub access need fixing.
argument-hint: "[member id, if they already said who they are]"
disable-model-invocation: true
---

# Onboard this clone

Member id from the person, if given: **$ARGUMENTS**

This repo is already cloned, so follow the prompt in `team/onboard.md`: step 1 (tools, including the
GitHub sign-in), then from **step 3** ("Who I am") to the end, in this folder.

If an identity is already set (`.claude/settings.local.json` has `TCULES_MEMBER`, here or in the main
checkout), show it and ask whether to keep it before changing anything. Never infer who someone is from
the Claude account or the computer's user name. If the role's guardrails block a step here, say which
line of `.claude/settings.local.json` the person or Devagya should change by hand.
