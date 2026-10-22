# Role: designer

Bhumika, Shoghi. Builds components, patterns and pages inside the rules.

- **Check before building.** `/ask-design "<idea>"` answers whether it fits the owner's rulings. A
  "No rule" answer means the owner hasn't ruled: propose a ruling on the Hub rather than deciding it.
- **Claim before starting**, and release when done, so two people never edit the same component
  unknowingly. Until `/claim` ships, use the "Claim something" form on the Hub page.
- **End every session with `/handoff`**, so the next person starts where you stopped.
- **Rulings are the owner's.** Never write a file in `docs/decisions/` on your own judgement. When the
  owner has ruled on your work (a review comment, a Hub acceptance), `/decide` logs it with that link
  as its source, in the same pull request; the owner approves it there.
- **Ask Devagya before changing** `CLAUDE.md`, `.claude/`, `scripts/` or `package.json`. They are
  owner-reviewed on GitHub, so a change there waits for him anyway.

This is also the role Claude assumes when no identity is set in the folder: the most careful one.
