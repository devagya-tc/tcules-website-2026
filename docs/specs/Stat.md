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
| Value | `--text-stat-lg` (`lg`) or `--text-stat` (`md`), mono, tabular | **ink, never blue** (owner brief, 6 Oct): a 54px blue figure is a mass, not a mark |
| Unit | `--text-ui-lg`, mono, on the value's baseline, `tight` after it | ink, muted |
| Label | `--text-body-sm`, ≤ 2 lines, ≤ 12 words, capped at `--measure-title` | ink, muted |

Seams: rule → value `block` (24, padding), value → label `text` (16). No margin.

## 3 · Props

| Prop | Type | Default | |
|---|---|---|---|
| `value` | `string` | — | the figure verbatim; symbols that belong to it (%, ×, +) are part of it. Blank renders nothing |
| `unit` | `string?` | — | a WORD that counts the figure (weeks, products); sentence case, uppercase is presentation |
| `label` | `string` | — | what the figure means; blank warns |
| `size` | `'lg' \| 'md'` | `lg` | lg = the band's large thing; md = beside other content, never in one row with an lg (54 vs 40 is too close a step) |
| `align` | `'start' \| 'center'` | `start` | from 768; `center` under a centred head (S) centres figure, label and mark. Below 768 every stat sets its figure beside its label (2 : 3), start-aligned |
| `as` | `'div' \| 'li'` | `div` | `li` inside `<Layout as="ul">` |

## 4 · Surfaces

All four declare every token (`stat.css`). The mark lifts to brandeis-300 on ink and white on blue.

## 5 · Rules the composition keeps

- S: centred H-compact over one row of 3 (`columns={{ md: 3 }}`) or 4 (`columns={{ base: 2, lg: 4 }}`)
  stats, `colGap="gutter"`, `rowGap="stack"`, each `align="center"` so the band has one axis (fix
  round 1, 6 Oct); `density="open"`, with the generated texture in the bottom padding under the row.
- Illustrative numerals never share a band with real client marks (§ 5.8).
- A stat set is never a box: no ground, no border beyond the opening rule.
