---
name: handoff
description: Write an end-of-session handoff note as a comment on this branch's pull request — what changed, what was decided, what's next — so the next session (anyone's) starts with it.
when_to_use: Use when someone types /handoff, says they're stopping for the day, or asks to hand over their work.
argument-hint: "[anything to add to the note, optional]"
disable-model-invocation: true
---

# Hand off this session

Extra notes from the person: **$ARGUMENTS**

1. **Who.** The session context names the person at this keyboard (from the startup hook). If no
   identity is set, ask who they are in one line and stop until they answer: a handoff under the
   wrong name is worse than none.
2. **Where.** Find this branch's pull request: `gh pr view --json number,url,state`. If the branch
   has none, offer `/ship` first (a draft pull request is fine); a handoff needs a pull request to
   live on. If the person is on `main`, say there's nothing to hand off.
3. **Gather, from this session only.**
   - What changed: `git status --short` and the commits since the session began.
   - What was decided in this conversation, and by whom. A ruling exists only once Jatin has
     approved it; anything else is a choice or a proposal, so say which.
   - What is unfinished or next, and anything waiting on someone.
4. **Draft the note**, plain sentences, names not ids, each part under 400 characters:
   ```
   **Handoff** · <Name> · <date, local time>
   **Changed:** …
   **Decided:** … (marked "Jatin approved", "proposed" or "chose")
   **Next:** …
   ```
   Fold in the person's extra notes. **The repo is public:** never put client-confidential detail,
   prices or personal data in the note; refer to it as "see Slack" instead.
5. **Post it**: write the note to a temporary file and run `gh pr comment <number> --body-file <file>`.
   Say it's posted, with the pull request link, in one line.
6. **Loose ends.** Uncommitted changes: offer to commit them to this branch first. Something that
   should become a rule: suggest it in the pull request description as a proposed ruling for Jatin;
   never write it into `docs/decisions/`.
