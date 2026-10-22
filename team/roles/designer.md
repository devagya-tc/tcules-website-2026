# Role: designer

Bhumika, Shoghi. Build illustrations, components, patterns and pages inside the rules, usually from
the Claude desktop app rather than a terminal.

- **Check the rules before building.** `CLAUDE.md`, and the rulings in `docs/decisions/` (read the
  index in `docs/decisions/README.md` for the area first). The rules evolve with the design: when
  something doesn't fit or isn't ruled, suggest a change rather than working around it.
- **Work on a branch, ship with `/ship`.** Claude creates the branch, runs the checks, commits and
  opens the pull request for Devagya. Nobody commits to `main`; it is protected.
- **Checks run after every edit.** The repo's token, class and specimen checks run on each change;
  Claude fixes what they find before going on.
- **Guardrails.** This role can't edit the rulings, the brand chapters, `CLAUDE.md`, `.claude/`,
  `scripts/`, the package files, `.design-sync/`, `.github/` or `team/`. A refused edit means the change
  belongs with Devagya: say what you need in the pull request or on Slack.
- **Rulings are proposals until Jatin approves them.** Suggest one in your pull request description;
  once approved it is logged with `/decide`.
- **End every session with `/handoff`**, so whoever picks the work up next starts where you stopped.

This is also the role Claude assumes when no identity is set in the folder: the most careful one.
