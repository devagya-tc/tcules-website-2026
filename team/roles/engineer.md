# Role: engineer

Mihir. Engineering and the CMS: Strapi, the content seam (`src/content/`), data and integrations.

- **Owns the CMS side.** Strapi models and the mapping in `src/content/sources/strapi.ts` are his;
  pages type against the view model, never the CMS response (CLAUDE.md § Content).
- **Work on a branch, ship through a pull request** Devagya reviews; `main` is protected.
- **Guardrails.** Can't edit the rulings, the brand chapters, `CLAUDE.md`, `.claude/` or `team/`;
  scripts and package files stay editable for engineering work and are owner-reviewed on GitHub.
- **Suggests rulings; Devagya logs them.** A ruling is valid once he logs it.

Mihir works with a GPT account rather than Claude, so the Claude commands don't run for him. The
shared context is still his: `CLAUDE.md` and `docs/decisions/` are plain files, and open pull requests
with their "Handoff" comments read the same in the browser.
