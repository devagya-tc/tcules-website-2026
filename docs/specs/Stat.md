# Stat

## 0 · Front matter

| | |
|---|---|
| **Component** | `Stat` |
| **Tier** | 1 component (`src/components/Stat/`) |
| **Status** | implemented — `cmp-process-stats`, 6 Oct 2026. Built to the family brief and `docs/kit/visual-direction.md` (§ 3.3, § 3.4 S, § 1.4 "Stat aside", § 1.5 "Stat label", § 7.1 Stats), which win where this spec differs. |
| **Token prefix** | `--stat-*` |
| **File** | `tokens/components/stat.css` |
| **Designer / date** | Claude Code · 6 Oct 2026 |
| **Implemented at** | `src/components/Stat/` · `src/styles/tokens/components/stat.css` · specimens `src/app/design/stat/page.tsx`, `src/app/design/kit/process/page.tsx` |

## 1 · Identity

One figure, its unit, and the line that says what it counts. The large thing of the S band (a row of
three or four) and the D band's head-track aside (§ 3.3: "D always has an aside: a photograph or one
stat-lg figure"). Promoted from the ServicePage template's local `Stat`; `cmp-service-pages` swaps it in.

## 2 · Anatomy

| Part | Role | Ink |
|---|---|---|
| Opening rule | hairline, the stat's top edge (as a text-only card's, § 3.1) | neutral, decoration |
| Mark | 2 × 32 segment over the rule's start | **blue** — the stat's foreground accent (§ 4.2 small graphic mark) |
| Value | `--text-stat-lg` (`lg`) or `--text-stat` (`md`), mono, tabular | **blue** (`--stat-value-ink`, page-showcase fix round 2, 7 Oct; brand-amendments.md): numerals are a foreground mark under the owner's blue ruling (§ 4.1). Was ink, never blue (6 Oct) |
| Unit | `--text-ui-lg`, mono, on the value's baseline, `tight` after it | ink, muted |
| Label | `--text-body-sm`, ≤ 2 lines, ≤ 12 words, capped at `--measure-title` | ink, muted |
| Tally (optional, r7-facts, 9 Oct) | the figure drawn as its count, between the rule and the value: `dot` squares (8 on a 4 seam), `bar` ticks (4 wide on an 8 seam), or the caller's glyph (24). At lg and md, from 768, a fixed field (eight dot rows, 92) with the marks on its floor, so a row's figures share a line; xl and phones take the field's own height. A fractional `filled` clips the partial mark to its share. `aria-hidden` | filled **blue** (`--stat-tally-ink`), unfilled share neutral (`--stat-tally-empty-ink`) |
| Source (optional) | the caller's node after the label, at its own width — a RatingBadge with `showScore={false}` under a rating | the node's own |

Seams: rule → first part `block` (24, padding); tally → value → label → source `text` (16). No margin.

## 3 · Props

| Prop | Type | Default | |
|---|---|---|---|
| `value` | `string` | — | the figure verbatim; symbols that belong to it (%, ×, +) are part of it. Blank renders nothing |
| `unit` | `string?` | — | a WORD that counts the figure (weeks, products); sentence case, uppercase is presentation |
| `label` | `string` | — | what the figure means; blank warns |
| `size` | `'xl' \| 'lg' \| 'md'` | `lg` | lg = the band's large thing; md = beside other content, never in one row with an lg (54 vs 40 is too close a step); xl = `--text-score` (105, serif), ONE figure that is the band's hero — a facts band's rating (r7-facts), never a set. A decimal in mono opens into three cells, so a rating takes xl |
| `tally` | `{ marks, filled?, columns?, form?: 'dot' \| 'bar', glyph? }?` | — | see Anatomy. `marks` 1–120, whole; `filled` defaults to all and may be fractional; `columns` marks per row, default one row |
| `source` | `ReactNode?` | — | where the figure is checked; set after the label |
| `align` | `'start' \| 'center'` | `start` | at every width; `center` under a centred head (S) centres figure, label and mark. One form at every width — figure line (unit inline, nowrap), then label; the beside-below-768 form was removed in the final fix round (6 Oct 2026): units wrapped in some cells and not others, and a centred head sat over start-set rows |
| `as` | `'div' \| 'li'` | `div` | `li` inside `<Layout as="ul">` |

## 4 · Surfaces

All four declare every token (`stat.css`). The mark lifts to brandeis-300 on ink and white on blue.

## 5 · Rules the composition keeps

- S: centred H-compact over one row of 3 (`columns={{ md: 3 }}`) or 4 (`columns={{ base: 2, lg: 4 }}`)
  stats, `colGap="gutter"`, `rowGap="stack"`, each `align="center"` so the band has one axis (fix
  round 1, 6 Oct); `density="open"`, with the generated texture in the bottom padding under the row.
- Facts and figures (`/design/kit/facts`, r7-facts): the rating at xl with a star tally and its badge
  as `source`, beside or over lg/md stats tallied as their counts — the scoreboard ([5, 7]) and the
  client-list band (rating beside the logo grid, the studio facts under the marks at md).
- Illustrative numerals never share a band with real client marks (§ 5.8). The facts band's years,
  products and team are owner-approved placeholders for the studio's own figures (8 Oct), and must
  be the real ones before a page carries them beside client marks.
- A stat set is never a box: no ground, no border beyond the opening rule.
