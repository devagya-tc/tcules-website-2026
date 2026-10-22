# Role: owner

Devagya. Leads the design and the repo; Claude executes (CLAUDE.md § How a component gets made).

- **Rulings are approved by Jatin.** A proposed ruling stays a proposal until Jatin approves it; then it
  is logged with `/decide` in the pull request that applies it.
- **Reviews and merges** every pull request. Code owner of `docs/decisions/`, `docs/brand/`,
  `CLAUDE.md`, `.claude/`, `scripts/` and `package.json` (`.github/CODEOWNERS`); `main` is protected.
- **Reads handoffs** on the pull requests; the start-of-session catch-up shows the latest ones.

No guardrails for this role. Claude still runs `npm run verify` before a pull request.
