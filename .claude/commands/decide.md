---
description: Log an owner ruling in docs/decisions/ — one file, validated, indexed, in the same change that applies it
argument-hint: the ruling in a sentence, or nothing to log the one just made in this conversation
---

# Log a decision

The ruling: **$ARGUMENTS**

If that is empty, the ruling is the one the owner just made in this conversation. If there is more than
one, log each as its own entry. If you cannot tell what was ruled, ask in one line and stop. Never log a
proposal, a critic's note or your own recommendation: only what the owner decided.

1. **Is it already logged?** Run `npm run decisions`, read the index in `docs/decisions/INDEX.md` for the ruling's area, and
   `grep -ril` the log for its key words. If an entry already says this, stop and say which. If an entry
   says something this contradicts, the new entry **supersedes** it. Set the old one to
   `status: superseded`, list its id in the new entry's `supersedes`, and say so in one line. A
   contradiction is never logged side by side with the ruling it overturns.
2. **Write the entry.** Copy `docs/decisions/_template.md` to `docs/decisions/<today>-<slug>.md`. The
   slug is three to six words naming the rule, not the occasion: `hover-is-a-move`, not
   `review-notes-oct-19`.
   - **Use the owner's words where they gave them.** Quote short phrases. Do not paraphrase a ruling into
     something softer or broader than what was said.
   - **The mistake it prevents** names the actual thing: the component, page or PR that got it wrong.
   - **`source`** gives the date and where it was ruled: the PR, the review or the spec question.
3. **Does it change the brand framework?** Search `docs/brand/*.html` for what the chapter currently
   says on the subject.
   - If a chapter states something this ruling changes, or is silent where the ruling belongs, set
     `dbf` to those sections (e.g. `[ch03 §4]`) and `dbf_status: pending`.
   - If the chapter already says it, set `dbf_status: applied`.
   - If it is a site-implementation or process ruling the framework has no business stating, set
     `dbf: []` and `dbf_status: none`.
   - Do not edit the chapter here. `/dbf-update` does that in batches.
4. **Is a check enforcing it?** Name the check in `enforced_by` if one does. If one obviously could and
   doesn't, mention it in your reply as a follow-up. Don't build it unasked.
5. **Does CLAUDE.md need it?** A ruling that changes a rule CLAUDE.md states must change CLAUDE.md in the
   same edit, so the two never disagree. Cite the entry beside the dated ruling, e.g.
   `(owner, 19 Oct 2026; decisions/2026-10-19-hover-is-a-move)`.
6. Run `npm run decisions` (it validates the log and rewrites the git-ignored index). The entry ships in the same commit as the
   change that applies the ruling. If there is no such change, it ships on its own.

Reply in two lines: the entry's path, and its brand-framework status (pending in which chapter, applied,
or none).
