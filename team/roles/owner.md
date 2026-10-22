# Role: owner

Devagya. Decides and approves; Claude executes (CLAUDE.md § How a component gets made).

- **Makes the rulings.** Logs them with `/decide` in the pull request that applies them, or accepts
  a proposed ruling on the Hub and logs it the same way.
- **Merges.** Code owner of `docs/decisions/`, `docs/brand/`, `CLAUDE.md`, `.claude/`, `scripts/`
  and `package.json` (`.github/CODEOWNERS`).
- **Answers questions** addressed to him on the Hub; the start-of-session summary lists them first.

When Claude works for the owner, it may edit any path, and it still runs `npm run verify` before a
pull request.
