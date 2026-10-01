# ProcessFlow

## 0 · Front matter

| | |
|---|---|
| **Tier** | 2 pattern (`src/patterns/ProcessFlow/`) |
| **Status** | implemented |
| **Token prefix** | `--flow-*` |
| **Designer / date** | Claude Code, at the owner's instruction / 1 Oct 2026 |
| **Implements** | Owner, 1 Oct 2026, on Design Systems' "Who owns what": *"the 4 columns don't read as a process. could it be a process like flow … take the liberty to design a new component for this kind of a section where a process has to take items as well. these aren't steps, this is a process or a workflow."* |
| **Implemented at** | `src/patterns/ProcessFlow/` · `src/styles/tokens/components/process-flow.css` · specimen `src/app/design/process-flow/page.tsx` |

## 1 · Identity

Work that moves through a few **stages**, each stage holding its own **items**, read in one direction,
with an optional **lane**: what another party holds for the whole flow. Tier 2, because it takes a
content shape and composes `Layout`, `Cluster` and `Icon`.

It is not:
- **Steps.** One action per row, read top to bottom, is ListCard rows in an `<ol>`. A process has fewer
  stages and several things in each; the reader needs the direction between them.
- **A contrast of peers.** Two to four sides of one statement under one rule are the service template's
  `contrast`. Peers have no order; stages do.
- **A diagram of a loop.** The service template's `thread` (stages joined by arrows, a return path) is
  the nearest thing and should be folded into this once it needs items; until then it stays, see §17.

Why a new component and not a composition (the job-is-not-a-component test): the arrow belongs to the
stage head and turns with the layout, and the lane is a second axis — neither is expressible as
ListCard tiles in a Layout without inventing both inside a template, which is how the service pages
grew four bespoke items before.

## 2 · Anatomy

| Part | Required | Element | Owns |
|---|---|---|---|
| `actor` | no | `<p>` | who carries the stages, said once over the flow; `--flow-actor-ink` |
| `stages` | yes | `<ol>` from a `Layout` | order; 1 track below lg, N from lg |
| `stage` | 2–5 | `<li>` | the opening thick rule `--flow-rule-*`, `--gap-block` under it |
| `number` | yes | `<span aria-hidden>` | `--text-index`, `--flow-number-ink`; the `<ol>` carries order |
| `label` | yes | `h3` (or `h4`) | `--text-h4`, `--flow-label-ink` |
| `arrow` | every stage but the last | `Icon arrow-right`, aria-hidden | `--flow-arrow-ink`; turned 90° below lg |
| `items` | ≥ 1 per stage | `<ul>` of `<li>` rows | `--text-body`, hairline `--flow-item-rule-*` |
| `lane` | no | `<div>` | `--flow-lane-ground`; label in the eyebrow voice, items in a 1/2/N-track list |

## 3 · Props / API

```ts
type ProcessFlowStage = { label: string; items: readonly string[] };
type ProcessFlowLane = { label: string; items: readonly string[] };
type ProcessFlowProps = {
  stages: readonly ProcessFlowStage[];   // 2–5, in order
  actor?: string;
  throughout?: ProcessFlowLane;
  stageHeading?: 'h3' | 'h4';            // default h3; semantics only
};
```

Plain text throughout: a stage item is a line, not rich text.

## 4 · Variants × sizes

None, and why: the stage COUNT is data (2–5), not a variant, and the lane is present or absent by
content. One size.

## 5 · States

None, and why: nothing responds to a pointer. A stage is not a link — a flow describes work; if a stage
needs a destination, the section beneath it is where it goes.

## 6 · Per-surface colour

`tokens/components/process-flow.css` declares every token on all four surfaces. Paper: track, labels and
arrow `neutral-900`; items `neutral-800`; number `neutral-500` (aria-hidden, the `<ol>` states the
order, so it is held at 3:1 like ListCard's); lane `paper-deep` with a `neutral-700` label. Tint swaps
the lane to `paper` so it still steps off the band. Ink and blue lift track, labels and arrow to white;
the lane takes `neutral-900` / `brandeis-600`.

## 7 · Geometry & spacing

| Where | Step |
|---|---|
| actor → stages | `block` (24) — the actor labels the stages |
| stages → lane | `stack` (48) — the lane is a separate block |
| stage → stage | `gutter` (32) — stages are a set, the gutter is the handover |
| stacked stages (below lg) | `stack` (48) |
| rule → head, head → items | `block` |
| number → label, head → arrow | `text` (16) |
| item rows | `text` padding, hairline between |
| lane inset | `block` × `gutter` |

Rule `--border-width-2`; item hairline `--border-width-hairline`.

## 8 · Typography

Label `--text-h4` + tracking; number `--text-index` + mono case; items and lane items `--text-body`,
running wrap; actor and lane label `--text-eyebrow` + mono case.

## 9 · Responsive

From 1024 the stages sit side by side and the arrows point right. Below it they stack in order and every
arrow turns 90° to point down at the next stage. The lane's items go 1 → 2 → N tracks. No distance
changes at a breakpoint.

## 10 · Composition

The caller places it inside a ContentSection band (`stacked`): it is a set read across, so never in
`beside` (ContentSection's arrangement rule). First use: Design Systems, "Who owns what once the system
ships" — actor "Tcules", Assess · Build · Operate, lane "Product teams keep, throughout".

## 11 · Accessibility

The stages are an `<ol>`, so order is announced; each stage name is a heading (h3 under the band's h2),
so the flow is navigable by heading. Numbers and arrows are aria-hidden: both restate what the `<ol>`
already says. The lane is a list named by its label (`aria-labelledby`, `useId`), after the stages, which is also its reading order.

## 12 · Content edge cases

A stage with a blank label or no items is omitted with a warning. Fewer than two valid stages renders
nothing ("a flow needs somewhere to go"). More than five warns and renders. A lane with no items is
omitted. Long items wrap; a long label wraps in its own column beside the number, which stays on the first line.

## 13 · Motion

None, and why: nothing changes state.

## 14 · Do's and Don'ts

**Do** use it when the content has an order AND each stage holds several things. **Do** put a party that
works alongside every stage in the lane. **Don't** use it for one-action-per-row steps (ListCard rows),
for peers without an order (`contrast`, tiles), or to make a fourth "stage" out of what someone else
keeps — that is the lane.

## 15 · Specimen plan

`/design/process-flow`: three stages with actor and lane; two and five stages; all four surfaces with
identical markup; a blank stage omitted. Resize below 1024 for the turned arrows.

## 16 · New token requests

`--flow-rule-width`, `--flow-item-rule-width`; per surface `--flow-rule-ink`, `--flow-number-ink`,
`--flow-label-ink`, `--flow-arrow-ink`, `--flow-item-ink`, `--flow-item-rule-ink`, `--flow-actor-ink`,
`--flow-lane-ground`, `--flow-lane-label-ink`. Registered in `tokens/index.css` in the same edit.

## 17 · Open questions

1. *(not blocking)* Fold the service template's `thread` into ProcessFlow? Thread's stages carry an
   optional body rather than items, and Software Development's runs to nine stages with a return path,
   which this does not draw. Decide when one of them is next reviewed.
2. *(not blocking)* The owner's note suggested a fourth stage, "Deliver". The content's fourth column is
   what product teams keep, not a stage Tcules runs, so it is the lane. If a real fourth stage exists,
   it is content to add.

## Appendix — self-audit

[x] Tier direction: imports `@/components` only. [x] No margins, no grid/flex of its own. [x] Every
value is a token; every surface declares every token. [x] Gap steps by role. [x] Mono roles carry the
mono case. [x] Specimen registered in `SPECIMENS`.
