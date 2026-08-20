# Making a component: the designer's path

Canonical text for the shared guide. Lives in a subdirectory on purpose — `.design-sync`'s
`guidelinesGlob` is `docs/*.md`, and a doc about running npm commands is noise inside the design
agent's prompt.

There is a rendered version for people without a checkout — the thing to actually send designers:

    https://claude.ai/code/artifact/91357961-a5b2-4976-8769-314cf308b2cd

**If you change this file, republish that page.** Two copies of one text will drift otherwise, which
is the failure this repo spends five checks preventing. The page says the repo wins if they
disagree; that only helps if someone fixes the page.

---

## Step 0 — decide whether you need a new component at all

Open the Claude Design project that carries the Tcules library. It holds nine live components —
`Section`, `Layout`, `Cluster`, `Button`, `Icon`, `Logo`, `Prose`, `SiteNav`, `SiteFooter` — with
`.design-sync/conventions.md` as their guidelines. These are the real shipped components, not
pictures of them.

**Ask: can this be built from those nine and the props they already have?**

If yes, you are **composing**, and you are already finished when the mockup is. No spec, no build,
no code review. Every component in that mockup is the real one, so its four surfaces, its states and
its props are correct by construction.

Only if the answer is genuinely no does anything below happen. Reaching "nothing new is needed" is
the most valuable outcome available here — the previous codebase reached the opposite conclusion 111
times, and that is the reason this one exists.

Before deciding it is new, check the cheaper answers: a new `emphasis` / `tone` / `size` on `Button`;
a glyph in the icon set; a `surface` or `density` on `Section`; a `columns` / `rowGap` / `colGap`
arrangement in `Layout` or `Cluster`; a rule inside `Prose`; a prop or slot on an existing pattern.

---

## Path A — it already exists

Compose it in the design project. Hand over the mockup plus which components and which props. That
is the whole handoff.

---

## Path B — it does not exist yet

### 1. Get the brief · *someone with the repo*

```bash
npm run design:brief | pbcopy
```

Run it **fresh every time.** The whole point is that the vocabulary — every colour ramp with its hex
values, the nine gap steps, all 19 type roles and which 12 carry a tracking companion, the glyph set,
the taken token prefixes, each existing component's geometry, and the three layout primitives' real
prop unions — is read out of the repo at that moment. A saved copy is accurate for about a week and
then starts lying, which is exactly the failure it was built to prevent.

### 2. Fill in the BRIEF block · *designer*

Seven fields at the top of what you pasted: component name, what it is in one sentence, where it
appears, **the closest thing that already exists**, references, hard constraints, and what you are
leaving to Claude's judgement.

The fourth field saves the most time. It is also the field that most often turns Path B back into
Path A.

### 3. Send it — inside the project that has the library · *designer*

This matters. With the library loaded, the mockup gets composed from real components and the spec
covers only the genuinely new part. Without it, you get a spec that re-describes `Section` back at
you and an implementer who has to work out which half is new.

### 4. Read what comes back · *designer*

An eighteen-section spec ending in a self-audit with real counts. Two things to check yourself
before passing it on:

- **§ 6, per-surface colour** — one row per token, four full columns (paper, tint, ink, blue), and a
  measured contrast ratio in every cell that is an accessibility floor. No cell saying "same as
  paper". That repetition is the design work: a colour means different things on different grounds,
  and a table carrying only the deltas has already caused a measured 1.13:1 failure here.
- **§ 17, open questions** — each one marked **BLOCKING** or non-blocking.

### 5. Answer every BLOCKING question, then flip the status · *owner*

Answer them **inline, in the spec**, then change `Status: draft` to `Status: accepted`.

This is the owner's job rather than the designer's, because the questions are almost always "which
existing thing must this line up with" — and they change the build. `/build-from-spec` refuses to
start on a draft, deliberately: a spec with an unanswered blocking question produces a component
built on a guess.

### 6. Save it into the repo · *designer or developer*

`docs/specs/<Component>.md`, committed. The spec is the seam between the two halves of this
workflow, and it needs a git history because the *why* comments in the finished CSS come from it —
without one, the next person re-litigates every argued value.

---

## Handing off to code

### 7. Build it · *developer, in Claude Code*

```
/build-from-spec docs/specs/<Component>.md
```

### 8. Expect it to stop and ask

That is the feature, not a snag. In rehearsal it correctly stopped on a distance that was not one of
the nine gap steps, a colour with no ramp behind it, a state whose selector could not reach the part
it moved, and — twice — a spec asking a primitive to import its siblings. Answer the questions;
waving them through is how a guess gets built.

### 9. Check it

```bash
npm run verify                       # six checks
/audit-component <Name>              # independent read-only pass
npm run build && npm run aria:check  # if it is interactive
```

### 10. Look at it · *a person, in a browser*

`/design/<component>`, and on each of the four surfaces: hover it, hold the pointer down, tab to it.

Those three states have no props by design, so no static render and no script can assert them. This
is the one step nothing in the pipeline can do for you, and a green `verify` is not a substitute for
having looked.

### 11. Re-sync the design library · *developer*

So the new component joins the nine and the next request can be answered by composition instead of
another spec. Run `cfg.buildCmd` first or every `.d.ts` silently degrades to a stub — see
`.design-sync/NOTES.md`.

If the build added a **glyph**, update `.design-sync/config.json` → `dtsPropsFor.Icon` and
`.design-sync/previews/Icon.tsx` → `NAMES` in the same pass. `npm run design:check` fails if you
forget, which it did not used to.

---

## Who does what

| Step | Designer | Owner | Developer |
|---|---|---|---|
| 0 · does it exist? | ● | | |
| 1 · run `design:brief` | | | ● |
| 2–4 · brief, send, read | ● | | |
| 5 · answer BLOCKING, accept | | ● | |
| 6 · commit the spec | ● | | ● |
| 7–9 · build and check | | | ● |
| 10 · look at it | ● | ● | ● |
| 11 · re-sync | | | ● |

---

## Two frictions worth knowing about

**The brief needs a checkout.** A designer without one cannot run `npm run design:brief`, so a
developer has to send the output each time. Either give designers read access or make it a named
person's job. Do not commit a snapshot of the output — that reintroduces the staleness the generator
exists to remove.

**Only statically-renderable states are in the library.** `SiteNav`'s open mega-menu and mobile
drawer, and every hover, press and focus state across all nine components, need interaction and are
in no card. If your mockup depends on one of those, say so in the spec rather than assuming the card
showed you everything.
