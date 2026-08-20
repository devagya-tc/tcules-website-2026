# Making a component: the designer's path

**The guide lives in `designer-workflow.html`, beside this file.** That is the source of truth and
the thing that gets published — not a copy of a copy.

Rendered, for anyone without a checkout:

    https://claude.ai/code/artifact/91357961-a5b2-4976-8769-314cf308b2cd

This file is a pointer and nothing more, on purpose. The first version of it held the full text and
the page held the same text again, which is two copies of one truth — the exact failure the six
checks in `npm run verify` exist to prevent, reintroduced by the document explaining them. The HTML
is authored because the guide needs structure Markdown cannot carry: a "where do I run this" label on
every single command, the decision fork, and an ownership table.

## What it covers

The path from an empty machine to a merged pull request, for someone who is not the repo owner:

- one-time setup, including the prompt that clones the repo and briefs you on it
- getting current and branching, every session
- the phase-one gate — whether a new component is needed at all
- writing the spec in Claude Design, and landing it in `docs/specs/`
- `/build-from-spec`, the six checks, and `/audit-component`
- committing, pushing, opening a pull request, and what CI does with it
- every command with **where** it runs, and prompts for the steps worth handing to Claude Code
- the four things that genuinely need the owner

## If you change it

Edit the HTML, then republish it to the same URL so the link keeps working. Both facts a reader
depends on — that `main` is unprotected, and that a GitHub Action runs `verify` on every pull request
— are true of `.github/workflows/verify.yml` and the repo's plan as of 2026-08-20. If either changes,
this guide is wrong in a way nothing will catch.
