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

## Sending it to someone without a checkout

    npm run guide:dist

Writes two files into `dist/guide/`, both **generated** from the HTML beside this one:

- `tcules-component-workflow.html` — the same page wrapped in the doctype, head and two reset rules
  the artifact shell was supplying. The authored file is a fragment, so mailing it raw renders as
  unstyled text in the wrong font; this one opens by double-click.
- `tcules-component-workflow.md` — for a reader in Slack, a ticket or a phone. The conversion is
  written per construct rather than generic, because the structure _is_ the content: every command
  keeps its "where do I run this" label, the numbered spine keeps its numbers, the decision fork
  keeps both branches, and the ownership table stays a table.

`dist/` is gitignored on purpose. Committing the output would be the two-copies-of-one-truth failure
this file already argues against, just with a build step in front of it. Regenerate instead.

## What it covers

The path from an empty machine to a merged pull request, for someone who is not the repo owner:

- one-time setup, including the prompt that clones the repo and briefs you on it — and the second
  invite people forget to ask for, access to the Tcules project in Claude Design
- getting current and branching, every session
- the phase-one gate — whether a new component is needed at all
- writing the spec **in that project** (not a plain Claude conversation, which is where the library
  and therefore the whole point of it goes missing), and landing it in `docs/specs/`
- `/build-from-spec`, the six checks, and `/audit-component`
- committing, pushing, opening a pull request, what CI does with it, and how it gets merged
- **phase seven — the re-sync**: why merging does not put the component in the design library, why a
  contributor cannot run the sync (`.ds-sync/` and `ds-bundle/` are gitignored, and grading the
  preview sheets needs a person), and what to ask the owner for
- every command with **where** it runs, and prompts for the steps worth handing to Claude Code
- the five things that genuinely need the owner

## If you change it

Edit the HTML, then republish it to the same URL so the link keeps working. Three facts a reader
depends on — that a branch protection rule for `main` exists but is **not enforced**, that a GitHub
Action runs `verify` on every pull request, and that `npm ci` installs a `pre-push` hook refusing
pushes to `main` — are true of `.github/workflows/verify.yml`, `.githooks/pre-push` and the repo's
plan as of 2026-08-26. If any of them changes, this guide is wrong in a way nothing will catch.

The plan fact is the one worth writing down, because it has already been misdiagnosed once.
Enforcement on a private repository needs a **GitHub Team or Enterprise organization account** — not
GitHub Pro, whatever `docs.github.com`'s plan comparison says. GitHub's own banner on the add-rule
screen states the requirement, and every REST call refuses outright with
`403 "Upgrade to GitHub Pro or make this repository public"` — a string that names what unblocks the
*endpoint*, not what unblocks *enforcement*, and reading it as the latter is how the wrong answer
gets reached. A non-admin gets `404` on the same endpoint, which reads as a permissions problem and
is not one. So the rule in Settings records intent, the hook is the only thing that actually pushes
back, and the day this repo moves to a Team org both this section and the guide's
"Get current, then branch" paragraph need rewriting.
