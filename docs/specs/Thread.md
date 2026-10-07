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
| Node | 16px ring, `--thread-node-border` 2px, hollow in the band's ground; the **last node filled** | blue |
| Line | 2px (`--border-width-2`) from each node to the next, across the `gutter` (lg) or down the `stack` (below lg) | blue (a connector is a mark, § 4.3) |
| Arrowhead | 10px two-border chevron at the line's end, pointing into the next node | blue |
| Title | h5 (≤ 4 across), h6 (5 or 6 across, lg only) | ink |
| Body | body-sm, optional, ≤ 9 words | ink, muted |
| Return path | `undo-left` glyph beside the sentence, on the column line under the stages, at every width. From lg on a ONE-row thread, also an arc over the row: rising from the last node, back above the stages, down into the first node with an arrowhead (fix round 1, 6 Oct: drawn beneath it could not start or end on a node). Two-row threads draw no arc | blue line / muted text |

## 3 · Arrangement

- From 1024: one row up to six stages; 7–12 break into two balanced rows (`ceil(n / 2)`); the line at
  a row's last stage carries no connector (fix round 1: it pointed off the column). `colGap="gutter"`, `rowGap="stack"`.
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

## Amendment · 6 Oct 2026 — `page-product-design` fix round 1: `align`

| Prop | Type | Default | |
|---|---|---|---|
| `align` | `'start' \| 'center'` | `start` | `center` centres the stages on their tracks from 1024, so the rail sits on a centred head's axis; below 1024 the vertical thread starts at the column edge whatever the value |

The service page passes `center` when its E band centres its head over a thread (ContentSection
`center-lg`). § 5's "H-compact (left)" stays the default band.

## Amendment · 7 Oct 2026 — the loop labels the arc (owner)

- On a one-row thread from 1024 the `loop` sentence is the arc's LABEL: centred on the arc's top run
  between its legs, on a patch of the band's ground (`--thread-node-fill`) that cuts the line. The root
  keeps half the label's line above the arc (`--thread-arc-label-half`).
- Where no arc is drawn (below 1024; a two-row thread) the sentence closes the thread under the last
  stage, in the copy column, led by **"Back to {first stage}:"** and a return arrow drawn in the node
  column in the thread's own stroke and head. The generic `undo-left` glyph is gone: it matched nothing
  in the drawing.
- One element at every width; on the arc the "Back to" lead-in is clipped for sight only, so a screen
  reader still hears where the path goes.
- `loop` is at most eight words (a development warning past eight on an arc thread).
- **Below 1024 (revised the same day, owner):** the vertical thread draws the return path as a LANE down
  the start edge — out of the last node, up a lane a `block` (24) from the nodes, and back into the
  first node with the connectors' arrowhead. Each stage draws its own stretch of the lane (first,
  middle, last), so no piece needs the list's height. An annotation marker (`--thread-marker-size`, the
  kit's blue square with a ring of the ground) sits on the lane at the middle stage, and the same square
  leads the sentence under the thread; the "Back to" lead-in is clipped for sight there too. The
  closing line with the drawn up-arrow is now only the two-row case from 1024.

