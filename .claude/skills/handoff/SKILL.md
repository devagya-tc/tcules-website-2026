---
name: handoff
description: Write an end-of-session handoff note to the Design Hub — what changed, what was decided, what's next — so the next person's session starts with it.
when_to_use: Use when someone types /handoff, says they're stopping for the day, or asks to hand over their work.
argument-hint: "[anything to add to the note, optional]"
disable-model-invocation: true
---

# Hand off this session

Extra notes from the person: **$ARGUMENTS**

1. **Who.** The session context names the person at this keyboard and their member id (from the
   startup hook). If no identity is set, ask who they are in one line and stop until they answer;
   a handoff under the wrong name is worse than none.
2. **Gather, from this session only.**
   - The branch, and what changed: `git branch --show-current`, `git status --short`, and the
     commits since the session began (`git log --oneline` against the branch's base).
   - What was decided in this conversation, and by whom. A ruling exists only once Jatin has
     approved it; anything else is a choice or a proposal, so say which.
   - What is unfinished or next, and anything waiting on someone.
3. **Draft the note** in three short fields, plain sentences, names not ids:
   - `changed`: what is different now, with branch and PR if any
   - `decided`: decisions made, marked "Jatin approved", "proposed" or "chose"
   - `next`: what the next person should pick up first
   Fold in the person's extra notes. Each field under 400 characters.
4. **Show the draft and write it.** With the ArtifactData tool (load it with ToolSearch if deferred),
   `set` a document in collection `handoffs` on the URL in `team/hub.json`:
   - `doc_id`: `<member>-<YYYYMMDD>-<HHMM>` in the local time
   - `data`: `{ "member", "at", "branch", "changed", "decided", "next" }`, with `at` the current time (read it
     from the system clock, never estimate it) in UTC ending in `Z` (`2026-10-22T07:00:00Z`), the format the board writes, so entries sort in time order
   Then say it's on the board, in one line.
5. **Loose ends.** If the person still holds claims on the board, list them and ask whether to keep
   or release each. If something in the session should become a rule, offer to add it to
   `proposals` for Jatin's approval; never log it in `docs/decisions/`.
