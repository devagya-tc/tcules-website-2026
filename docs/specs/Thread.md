# Thread

## 0 · Front matter

| | |
|---|---|
| **Component** | `Thread` |
| **Tier** | 2 pattern (`src/patterns/Thread/`) |
| **Status** | implemented — `cmp-process-stats`, 6 Oct 2026. Built to the family brief and `docs/kit/visual-direction.md` (§ 3.4 E, § 4.2 connectors), which win where this spec differs. |
| **Token prefix** | `--thread-*` |
| **File** | `tokens/components/thread.css` |
| **Designer / date** | Claude Code · 6 Oct 2026 |
| **Implemented at** | `src/patterns/Thread/` · `src/styles/tokens/components/thread.css` · specimens `src/app/design/thread/page.tsx`, `src/app/design/kit/process/page.tsx#e-thread` |

## 1 · Identity

Named stages one decision passes through — question, probe, contract, behaviour, decision — strung on
one blue line, with an optional return path. The E band's full-column diagram. Promoted from the
ServicePage template's local `Thread` (`Diagrams.tsx`); `cmp-service-pages` swaps it in.

**Not Steps and not ProcessFlow.** Steps are a method: numbered ListCard rows read top to bottom (§ 3.6).
ProcessFlow is stages that each hold several items. A thread is a chain of artefacts, so nothing is
numbered and nothing is boxed (the old template drew boxed node chips; owner ruling: no boxes around text).

## 2 · Anatomy

| Part | Drawn as | Ink |
|---|---|---|
| Node | 12px ring, `--thread-node-border` 2px, hollow in the band's ground; the **last node filled** | blue |
| Line | hairline from each node to the next, across the `gutter` (lg) or down the `stack` (below lg) | blue (a connector is a mark, § 4.3) |
| Arrowhead | 8px two-border chevron at the line's end, pointing into the next node | blue |
| Title | h5 (≤ 4 across), h6 (5 or 6 across, lg only) | ink |
| Body | body-sm, optional, ≤ 9 words | ink, muted |
| Return path | lg: a line drawn back beneath the stages (down at the far end, along, up into the first node's column, arrowhead up), sentence under it. Below lg: `undo-left` glyph beside the sentence | blue line / muted text |

## 3 · Arrangement

- From 1024: one row up to six stages; 7–12 break into two balanced rows (`ceil(n / 2)`); the line at
  a row's end runs to its own track edge and points on. `colGap="gutter"`, `rowGap="stack"`.
- Below 1024: vertical — node at the start edge centred on the title's first line, line down to the
  next node, copy beside.
- Layout owns tracks and seams; the module draws marks with positioned pseudo-elements and one
  aria-hidden node per stage. No margin.

## 4 · Props

| Prop | Type | Default | |
|---|---|---|---|
| `stages` | `readonly { title: string; body?: string }[]` | — | 2–12; fewer than two renders nothing and warns; blank titles are dropped |
| `loop` | `string?` | — | the return path sentence; absent draws no path |
| `stageHeading` | `'h3' \| 'h4'` | `h3` | |

## 5 · Band

E: H-compact (left) + Thread full column, ≤ 380 tall at 1470. The `horizon` texture may sit in the
band's bottom padding (§ 4.3: E with horizon).
