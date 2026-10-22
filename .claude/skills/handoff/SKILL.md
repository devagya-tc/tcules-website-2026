---
name: handoff
description: Write an end-of-session handoff note as a comment on this branch's pull request — what changed, what was decided, what's next — so the next session (anyone's) starts with it.
when_to_use: Use when someone types /handoff, says they're stopping for the day, or asks to hand over their work.
argument-hint: "[anything to add to the note, optional]"
disable-model-invocation: true
---

# Hand off this session

Extra notes from the person: **$ARGUMENTS**

Talk in plain words for roles that aren't technical (the session context says which): no git terms,
say what happens to their work. Nothing is discarded or set aside unless the person chooses it.

1. **Who.** The session context names the person at this keyboard. If it doesn't, ask once who they
   are, then carry on.
2. **Unsaved work first.** If the folder has changes that aren't saved yet, say what they are in terms
   of the work and offer: save them to this piece of work now, keep them here for later, or leave them
   out. Do what they choose. Never discard anything.
3. **Where the note goes.** This branch's pull request: `gh pr view --json number,url`. If there isn't
   one, offer `/ship` first (a draft is fine): the note needs a pull request to live on. On `main`,
   there's nothing to hand off.
4. **Gather, from this session only**: what changed, what was decided and by whom, what's next. A
   ruling exists only once Devagya logs it; anything else is a choice or a suggestion, so say which.
5. **Write the note**, plain sentences, names not ids, each part under 400 characters:
   ```
   **Handoff** · <Name> · <date, local time>
   **Changed:** …
   **Decided:** … (marked "Devagya logged", "suggested" or "chose")
   **Next:** …
   ```
   Fold in the person's extra notes. **The repo is public:** no client-confidential detail, prices or
   personal data; write "see Slack" instead.
6. **Post it** with `gh pr comment <number> --body-file <file>`, and say it's posted, with the link.
7. **Suggested rulings** go in the pull request description for Devagya, never into `docs/decisions/`.
