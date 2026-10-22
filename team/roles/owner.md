# Role: owner

Devagya. Leads the design and the repo; Claude executes (CLAUDE.md § How a component gets made).

- **Logs the rulings.** A ruling is valid once Devagya logs it with `/decide`: his own, or Jatin's from
  a feedback session, logged on Jatin's behalf. A later session with Jatin may supersede his own
  (decisions/2026-10-22-rulings-valid-once-devagya-logs-them).
- **Reviews and merges** every pull request. Code owner of `docs/decisions/`, `docs/brand/`,
  `CLAUDE.md`, `.claude/`, `scripts/` and `package.json` (`.github/CODEOWNERS`); `main` is protected.
- **Reads handoffs** on the pull requests; the start-of-session catch-up shows the latest ones.

No guardrails for this role. Claude still runs `npm run verify` before a pull request.
