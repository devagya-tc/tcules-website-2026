---
description: Apply one brand-framework chapter's pending rulings from the decision log, bump its version, mark them applied
argument-hint: the chapter number — 00 · 02 · 03 · 04 · 05 · 10 — or nothing for every chapter with a backlog
---

# Bring a brand chapter up to date

Chapter: **$ARGUMENTS**

The Digital Branding Framework in `docs/brand/` is the copy to edit (its `README.md` says so). It is
published to the Design System artifact (under `brand/`) by `/ds-publish`. Your job ends at a branch that
is ready to merge and sync.

1. **Read the backlog.** Run `npm run decisions` and read the *Brand framework backlog* in
   `docs/decisions/README.md`. If the argument is empty, take every chapter listed there, one commit
   each. If the chapter you were given has nothing pending, say so and stop.
2. **Read each pending entry in full**, then the chapter section each one names. Read the whole section,
   not a grep hit: the chapter's own wording elsewhere may contradict the ruling too, and it has to go
   in the same edit.
3. **Edit the chapter HTML.**
   - Write in the chapter's voice and structure. Use its existing markup, classes and patterns
     (`dbf.css`, `doc-page.js`), and never introduce new styling.
   - Change only what the ruling changes. A ruling that overturns a sentence replaces that sentence; it
     does not get a note appended under it.
   - If the chapter keeps a decision record (ch05 §12, ch10 §F2), add the ruling there too, in that
     record's format.
   - If applying a ruling would contradict another **active** ruling, stop and report both. That is the
     owner's call, not yours.
4. **Bump the version** in the chapter itself, wherever it states its version and date, and in the table
   in `docs/brand/README.md`. A minor bump (1.0 → 1.1) for applied rulings, unless the owner asks for
   more.
5. **Mark them applied.** Set `dbf_status: applied` on each entry you applied. Leave alone any entry whose
   other `dbf` sections, in a chapter you did not edit, are still pending, and say which.
6. **Check it.** Run `npm run decisions -- --check`. Read the edited region of the chapter back and
   confirm the markup is balanced and the section numbering is unchanged.
7. Commit per chapter: `docs(brand): ch03 v0.3 — apply 4 rulings from the decision log`, with the
   entry ids in the body. Push and open the PR (standing permission).

Reply with each chapter's new version, the rulings applied, any you held back and why. End with the
next step: **`/ds-publish`** once the PR is merged, so the artifact gets the new chapter.
