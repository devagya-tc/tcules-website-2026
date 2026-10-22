# Role: designer

Bhumika, Shoghi. Build components, patterns and pages inside the rules.

- **Check the rules before building.** `CLAUDE.md`, and the owner's rulings in `docs/decisions/`
  (read the index in `docs/decisions/README.md` for the area first). When nothing is ruled, propose a
  ruling on the Hub rather than deciding it.
- **Claim before starting**, and release when done, so two people never edit the same component
  unknowingly. Until `/claim` ships, use the "Claim something" form on the Hub page.
- **End every session with `/handoff`**, so the next person starts where you stopped.
- **Rulings are proposals until Jatin approves them.** Suggest one on the Hub or in your pull request;
  never write a file in `docs/decisions/` on your own judgement. Once approved, it is logged with
  `/decide`.
- **Ask Devagya before changing** `CLAUDE.md`, `.claude/`, `scripts/` or `package.json`. They are
  owner-reviewed on GitHub, so a change there waits for him anyway.

This is also the role Claude assumes when no identity is set in the folder: the most careful one.
