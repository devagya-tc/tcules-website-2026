# Role: designer

Bhumika, Shoghi. Build illustrations, components, patterns and pages inside the rules, usually from
the Claude desktop app rather than a terminal.

- **Check the rules before building.** `CLAUDE.md`, and the rulings in `docs/decisions/` (read the
  index in `docs/decisions/INDEX.md` for the area first; `npm run decisions` writes it). The rules evolve with the design: when
  something doesn't fit or isn't ruled, suggest a change rather than working around it.
- **Work on a branch, ship with `/ship`.** Claude creates the branch, runs the checks, commits and
  opens the pull request for Devagya. Nobody commits to `main`; it is protected.
- **Checks run after every edit.** The repo's token, class and specimen checks run on each change;
  Claude fixes what they find before going on.
- **Guardrails.** This role can't edit the rulings, the brand chapters, `CLAUDE.md`, `.claude/`,
  `scripts/`, the package files, `.design-sync/`, `.github/` or `team/`. A refused edit means the change
  belongs with Devagya: say what you need in the pull request or on Slack.
- **Suggest rulings; Devagya logs them.** Put a suggestion in your pull request description; a ruling
  is valid once Devagya logs it with `/decide`.
- **Plain language.** Claude never asks you to rebase, stash, reset, merge or force-push. It tells you
  what's happening to your work, offers plain choices, and does the git work. Nothing of yours is
  discarded or set aside unless you choose it.
- **End every session with `/handoff`**, so whoever picks the work up next starts where you stopped.
