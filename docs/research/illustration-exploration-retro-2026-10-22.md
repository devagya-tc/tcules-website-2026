# Illustration exploration, 22 Oct 2026: what failed and why

**Status:** closed. Claude's illustration exploration stopped on 22 Oct. The guidelines will now be derived from
an illustration Bhumika (designer) is refining, which Devagya and Yash both liked. This is a record of the failure so it
isn't repeated. It is not a ruling.

**Owner's verdict on the output:** "the concepts are shallow, unpolished, and with no clear meaning." The
agents' own judges reached the same conclusion independently (scores below).

## What was tried, in order

| # | Attempt | What it was | How it ended |
|---|---|---|---|
| 1 | Design Systems, round 5 | Three concepts: proved on the product, built to run without us, shared once settled | Each carried several ideas plus devices that need a label (an owner's seat, an exceptions shelf, a sorting gate). Failed read-back. |
| 2 | "Five parts, held in register" | An exploded four-plane stack held by pipes, with the product on top, in three label variants | "Too busy", "reads too much like the intent stack". Nothing happens in it: "holds its shape" is not an event. |
| 3 | Re-test of the six shipped service heroes | Scored against eight gates drafted that day | None passed. Exposed that legibility and meaning are separate (Design Systems is legible and says nothing). |
| 4 | Shared base from the mark | Three bases: the logo's bar as a stage, a sheet with the bar above it, the ū as a cradle | "None are well thought out. All forced." The bar wasn't recognisable as the bar over the u. |
| 5 | Looped workflow, Product Design | Insight agent, four designers, four judges (beauty, depth, craft, brand fit), three rounds, 25 agents, about 3.4M tokens | Best average 6.0/10 against a target of 9. No concept scored 7 on every lens. Results: https://claude.ai/artifact/5aBWfF6ixxgnB2XNKePzhE |

Final judge scores, round 3:

| Concept | Beauty | Depth | Craft | Brand | Avg |
|---|---|---|---|---|---|
| The Thrown Switch (product as object) | 6.5 | 6 | 6.5 | 5 | 6.0 |
| The Gate (wild card) | 5.5 | 4.5 | 6 | 6 | 5.5 |
| The Swap (decision object) | 5 | 5.5 | 5.5 | 5.5 | 5.4 |
| The Square (T plate) | 4.5 | 4 | 4.5 | 4 | 4.3 |

Across three rounds of critique, averages moved by less than half a point.

## Why it failed

1. **Meaning was decided while drawing, never before.** Every attempt asked for the idea, the picture and the
   system in a single pass. The idea was then settled by whatever could be drawn, so it became a device: pipes,
   a frame, a cradle, a switch, a knob, a ball in a cup. Each device needs explaining, which is why the owner kept
   saying "forced" and "no clear meaning". The lesson ("find the idea in words first") was written down
   mid-session and then not applied to the workflow that came straight after.
2. **Process was used in place of taste.** Gates, proposal statuses, decision entries and finally a 25-agent loop.
   All of them can *reject* weak work, and none of them can *produce* a strong idea. Asked for top-1% work, the
   answer was a bigger machine, not a better idea.
3. **Iteration polished a local optimum.** The judges were the same kind of model as the designers. Their critique
   was accurate but incremental: fix the framing, move the knob, tidy a join. Refining a weak idea gives a
   tidier weak idea. The loop never had a step that could say "the idea is wrong, start again" except the
   round-1 replacement, and the replacements fell back into the same family.
4. **Divergence was declared, not enforced.** All four designers got the same brief, both owner seeds and the
   same strongest insight ("change the default"). Three converged on one family: the T cut into a plate with a
   switch or knob. Separate stance labels weren't enough when the inputs were identical.
5. **The medium has a craft ceiling.** Agents writing SVG by hand produce clean geometry but not illustration.
   Nothing scored above 6.5 on craft, even under a 3× zoom review. Each designer also had to produce a hero, a
   system sheet and several renders per round, so effort was spread thin, which is why the work was unpolished.
6. **Old rules constrained new ideas.** Earlier rounds pushed every new idea through ch05 §4a (flat planes, one
   blue plane, square corners, line-led) before it could exist, which pulled all of them back to the old look.
   The loop dropped that constraint, but the habit of reaching for the same constructions remained.

## What survived

- **Five truths about Tcules' product design**, from the loop's insight agent, with evidence from the cases:
  - change the default, not the screen;
  - model what the product keeps track of before any screen;
  - research is valued for the one missing variable;
  - design where accountability sits;
  - decisions are written down and carried intact.

  These hold whatever the illustrations become. They are on the results artifact above.
- **Two real links to the brand, neither invented:**
  - In the Omny work, blue meant "a person decided this".
  - The wordmark's T has the proportions of a drafting T-square, to within 0.3%.
- **Untested proposals** in `docs/decisions/` (status `proposed`): the eight acceptance gates, "show the USP",
  "subject as an object on one base", and corners, thickness and fills. The designer's work should confirm,
  change or replace them.
- **The process change:** a design rule is designed and tested before it becomes a ruling
  (`docs/decisions/2026-10-22-test-before-ruling.md`).
- **The owner's reference set:** `docs/research/illustration-references.md`.

## What to do differently

- Settle the meaning in words, with the owner, before anything is drawn. Treat an idea that needs a device to be
  understood as unfinished.
- Keep Claude on research, meaning, critique and guidelines. Final illustration craft belongs to a human
  designer (or a medium that can reach it), not to hand-written SVG.
- When exploring with several agents, give each a different input (a different truth, a different reference),
  not the same brief under a different label. Ban a family once it appears twice.
- Judge meaning with a viewer who has no brief: the depth score rests on what a naive viewer says the image
  shows, not on the designer's explanation.
- Prefer one idea taken far over many ideas taken a little way.
