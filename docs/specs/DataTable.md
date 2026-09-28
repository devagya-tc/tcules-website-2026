# DataTable

## 0 · Front matter

|                     |                                                                                                                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Component**       | `DataTable`                                                                                                                                                                                                                      |
| **Tier**            | 2 pattern (`src/patterns/DataTable/`)                                                                                                                                                                                            |
| **Status**          | approved — brief 10 is RESOLVED (27 Aug 2026: build it); every question in § 17 is non-blocking and carries the choice that was built                                                                                            |
| **Token prefix**    | `--dtab-*` (no collision: `--dtab-` is unused by any other layer)                                                                                                                                                                |
| **Designer / date** | Claude Code, 28 Sep 2026, tracker 2.15. Written in the repo from the brief; no Claude Design spec existed for this component                                                                                                     |
| **Implements**      | `docs/briefs/10-table.md` · the Comparison job in `docs/component-audit.md` § 4 ("options × dimensions, with a caveat or source")                                                                                                |
| **Implemented at**  | `src/patterns/DataTable/` · `src/styles/tokens/components/data-table.css` · the seam `src/content/sources/strapi/table.ts` · view model `ContentTable` in `src/content/types.ts` · specimen `src/app/design/data-table/page.tsx` |

## 1 · Identity

**What it is.** The site's one table: a key column whose cells are the row headers, one to five
data columns, three to eight rows, an optional caption and an optional summary — and a stacked
reading order whenever the track it is given is narrower than the md content column. It is what a
CMS `table` BLOCK becomes on every route that has one (audits, services, expertise, tools, glossary,
how-we-work): 39 published tables on 28 Sep 2026, always as a `ContentSection` child.

**Tier, and why.** Tier 2. It consumes a content shape (columns × rows of rich text), and it
composes two primitives — `Layout` (the summary-to-table seam and each label/value pair) and
`Prose` (every cell's trusted rich text, and the summary) — which a primitive may not import.

**What it is NOT:**

| Not this                                 | Who does it                                                                                                                                                                   |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A markdown table inside a long-form body | `Prose`, which keeps its `table` / `th` / `td` / `caption` rules for the bodies that legitimately contain one. DataTable is the `table` block, not a table found in a string. |
| A set of options presented as objects    | `BlockCard` in a `Layout` — "comparison cards" are cards. A comparison becomes a table only when it is options × dimensions and must read across a row.                       |
| A data grid                              | Nothing, deliberately. No sorting, filtering, pagination, selection or sticky columns — these are five-row reference tables.                                                  |

**Nearest existing component, and why this is not a prop on it.** `Prose`. It is where tables
render today, and the brief measured both ways it falls short: it cannot stack (a stack needs
per-cell markup and Prose receives a string), and an opaque string cannot carry per-column
behaviour — a key column that must not wrap, an aligned numeric column, a column that must not
shrink. A `variant="table"` on Prose would still receive a string. The seam already receives the
structure from Strapi, so the answer is to stop flattening it.

**How many on a page.** Zero to two in live content (Design Systems and Product Redesign carry
two). Two adjacent is legal; the caller's Layout owns the seam (§ 12).

## 2 · Anatomy

| Part             | Required                       | Element                                            | CSS class                    | Token `{part}`         |
| ---------------- | ------------------------------ | -------------------------------------------------- | ---------------------------- | ---------------------- |
| Root             | always                         | `Layout` (div), the container the stack queries    | `.root`                      | —                      |
| Summary          | optional                       | `Prose` > `<p>`, before the table                  | — (Prose's own)              | — (Prose's ink)        |
| Table            | always                         | `<table role="table">`                             | `.table`                     | —                      |
| Caption          | optional                       | `<caption>`, the table's first child               | `.caption`                   | `caption`              |
| Head row         | always                         | `<thead role="rowgroup">` > `<tr role="row">`      | `.head`                      | —                      |
| Column head      | one per column, key included   | `<th scope="col" role="columnheader">`             | `.colHead`                   | `head`, `head-rule`    |
| Body             | always                         | `<tbody role="rowgroup">`                          | `.body`                      | —                      |
| Row              | 1+ (3–8 designed)              | `<tr role="row">`                                  | `.row`                       | `rule`                 |
| Row header       | one per row                    | `<th scope="row" role="rowheader">` > span         | `.key` > `.keyText`          | `key`                  |
| Cell             | one per data column per row    | `<td role="cell">` > `Layout`                      | `.cell`                      | `rule`                 |
| Stacked label    | per cell, when its head is set | `<span aria-hidden="true">`, the column head again | `.label`                     | `head` (reads its ink) |
| Cell value       | when the cell has content      | `Prose` with the cell's HTML                       | `.value`                     | — (Prose's ink)        |
| Empty mark       | when the cell is empty         | `<span aria-hidden="true">—</span>`                | `.empty`                     | `empty`                |
| Column behaviour | per column                     | modifier class on the head AND the cells           | `.nowrap` `.hold` `.numeric` | `hold-size`            |

Content slots: `caption`, `summary`, each column's `heading`, each row's `header`, each cell's
HTML. Nothing else is a slot; there is no action slot (§ 12, "interactive content").

## 3 · Props / API

| Prop        | Type                                                                                     | Default             | Decides                                                                         |
| ----------- | ---------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------- |
| `caption`   | `string`                                                                                 | —                   | The `<caption>`: the table's name and accessible name. Omitted → none.          |
| `summary`   | `string`                                                                                 | —                   | A plain-text lead-in paragraph before the table. Omitted → none.                |
| `keyColumn` | `{ heading: string; behaviour?: 'fluid' \| 'nowrap' \| 'hold' }`                         | behaviour `'hold'`  | The first column's head and how the row headers behave.                         |
| `columns`   | `readonly { heading: string; behaviour?: 'fluid' \| 'nowrap' \| 'hold' \| 'numeric' }[]` | behaviour `'fluid'` | The data columns, in order. The COUNT is data, never a variant.                 |
| `rows`      | `readonly { header: string; cellsHtml: readonly string[] }[]`                            | —                   | Each row: a plain-text header and one trusted rich-text string per data column. |

**Column behaviour** (presentation, set by the caller):

| Value     | Wide arrangement                                                               |
| --------- | ------------------------------------------------------------------------------ |
| `fluid`   | wraps and shrinks to share the width. Data default.                            |
| `nowrap`  | never wraps, so never narrows below its longest line. Short keys, identifiers. |
| `hold`    | wraps, but never narrows below `--dtab-hold-size`. Key default.                |
| `numeric` | end-aligned, tabular figures, never wraps. Head and cells align together.      |

All four are released in the stacked order: one value per line, start-aligned, wrapping.

**Deliberately not props:** `surface` (read from the ancestor `data-surface`, like everything
else); colour; padding; gap; radius; width and height; density (the brief rules there is no
compact density); zebra (forbidden); sort / filter / paginate (forbidden); a stacked-mode switch
(the track decides, § 9); `className` (nothing outside may restyle a table it did not author).

**Compile errors, not review comments:** `numeric` on `keyColumn` (its behaviour union omits it — a
number is not a row's name); a row without `header` or `cellsHtml`; any behaviour outside the
unions.

**The view model.** `ContentTable` in `src/content/types.ts` carries `caption?`, `summary?`,
`keyColumn: { heading }`, `columns: { heading }[]` and `rows: { header, cellsHtml }[]` — structurally
a `DataTableProps` with no behaviours, so a route renders `<DataTable {...block.table} />` and the
pattern still never imports `@/content`.

## 4 · Variants × sizes

**None, and why.** One treatment, one size. Column count is data (key + 1 to 5); column behaviour is
a per-column presentation choice, not a variant of the table. The stacked order is an arrangement
the track selects, not a variant a caller picks.

Considered and rejected: a compact density (brief: nothing in the live tables asks for one, and it
would create an arbitrary choice on every page); zebra stripes (brief: decoration standing in for
structure); a bordered-grid variant (vertical rules make every column look equally important,
which is exactly what a key column says is not true); a horizontally scrolling variant (the stack
is the answer to a narrow track, § 9).

## 5 · States

**None, and why.** The table is not interactive. Nothing in it has a hover, a press, a selection or
an expansion, and no row highlights on hover — a hover ground is a ground, which the table must not
own, and a highlighted row in a five-row reference table reads as selected. A link inside a cell is
`Prose`'s link and takes Prose's rest / hover states and focus ring; DataTable declares no state
tokens. Disabled, loading and error do not apply.

## 6 · Per-surface colour

Grounds: paper `--color-paper`, tint `--color-paper-deep`, ink `--color-neutral-950`, blue
`--color-brandeis-500`. Ratios are WCAG 2.x, computed from the ramp hexes in `primitives.css`.

| Token                  | paper                                           | tint                                   | ink                                    | blue                                    |
| ---------------------- | ----------------------------------------------- | -------------------------------------- | -------------------------------------- | --------------------------------------- |
| `--dtab-head-ink`      | `--color-neutral-700` 8.14:1                    | `--color-neutral-700` 7.27:1           | `--color-neutral-400` 8.05:1           | `--color-brandeis-100` 4.91:1           |
| `--dtab-key-ink`       | `--color-neutral-950` 17.10:1                   | `--color-neutral-950` 15.27:1          | `--color-white` 17.26:1                | `--color-white` 6.23:1                  |
| `--dtab-caption-ink`   | `--color-neutral-600` 4.92:1                    | `--color-neutral-700` 7.27:1           | `--color-neutral-400` 8.05:1           | `--color-brandeis-100` 4.91:1           |
| `--dtab-head-rule-ink` | `--color-neutral-800` 11.81:1 (non-text, ≥ 3:1) | `--color-neutral-800` 10.54:1          | `--color-neutral-300` 11.07:1          | `--color-brandeis-100` 4.91:1           |
| `--dtab-rule-ink`      | `--color-neutral-200` n/a — decoration          | `--color-neutral-300` n/a — decoration | `--color-neutral-800` n/a — decoration | `--color-brandeis-400` n/a — decoration |
| `--dtab-empty-ink`     | `--color-neutral-500` 3.16:1 (non-text)         | `--color-neutral-600` 4.39:1           | `--color-neutral-500` 5.41:1           | `--color-brandeis-200` 3.78:1           |

The cells, the summary, and every link / strong / code span inside them take `--prose-*` through
Prose, on every surface. That is not a gap in this table: it is the decision that a link in a table
is the same link as in a paragraph.

**Paper.** The origin. Column heads rest two steps below full ink in the mono label voice — they
name, they do not compete with what they name. Row headers take full ink in the title voice: that
is the whole of the key column's distinction, and it is voice, not ground. The rule under the head
row is the one strong line; the rules between rows are the quietest hairline that still separates.

**Tint.** Paper-deep has spent the lightest step, so the quiet values move one rung darker: the
caption 600→700 (600 is 4.39:1 here and fails), the row rule 200→300, the empty mark 500→600 (500
is 2.82:1 and misses the non-text floor). Head and key ink hold.

**Ink.** The ladder inverts. White is the raised step and the row headers take it; heads and caption
sit at neutral-400, the muted step Prose uses on this ground. The head rule lifts to 300 and the row
rule drops to 800 — a hairline has to be darker than the text to stay a hairline.

**Blue.** The ground is the interaction colour, so every value comes from the Brandeis tints and
white is the top of the ladder. brandeis-100 is the quietest step that clears 4.5:1 for 12px mono
heads (brandeis-200 would be 3.78:1).

**Nested surfaces.** Every surface block declares all six tokens, so a table in a tint panel inside
an ink section resolves entirely from the tint block (specimen § 8 renders tint-in-ink, ink-in-paper
and blue-in-paper).

## 7 · Geometry & spacing

### (a) Distances

| Seam                                               | Step                                                           |
| -------------------------------------------------- | -------------------------------------------------------------- |
| Summary to table (Layout `rowGap`)                 | `--gap-block`                                                  |
| Caption to head row (caption inset)                | `--gap-text`                                                   |
| Cell inset, block axis (head and body)             | `--gap-text` — the scale's own "cell padding on a dense table" |
| Column seam (end inset of every cell but the last) | `--gap-block`                                                  |
| Stacked: label to value (Layout `rowGap`)          | `--gap-inline` — "inside a key and its value"                  |
| Stacked: pair to pair (cell inset)                 | `--gap-text`                                                   |
| Stacked: group padding above and below its rule    | `--gap-block`                                                  |

### (b) Component sizes

| Token              | Value | Measured against                                                                                                                                                            |
| ------------------ | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--dtab-hold-size` | 192px | Key + 5 data columns in the 1176 content column is 196 a column, so one held column at 192 costs its neighbours nothing; at the 704 tablet column the other five share 512. |

### (c) Optical corrections

- `--dtab-hidden-size: var(--space-1)` — the 1px clip box that visually hides the head row in the
  stacked order while keeping it in the accessibility tree. Same technique as `--crumb-hidden-size`.

Radius: none (a table has no box). Border width: `--dtab-rule-width` = `--border-width-hairline`, for
both the head rule and the row rules — the head rule is distinguished by ink, not weight. Shadow:
none. Z-layer: none; nothing stacks.

## 8 · Typography

| Part          | Role                  | Tracking                                   | Case                                                    |
| ------------- | --------------------- | ------------------------------------------ | ------------------------------------------------------- |
| Column head   | `--text-ui-sm`        | `--text-ui-sm-tracking`                    | `--text-mono-case` — e.g. authored "Typical disruption" |
| Stacked label | `--text-ui-sm`        | `--text-ui-sm-tracking`                    | `--text-mono-case`                                      |
| Row header    | `--text-h6`           | `--text-h6-tracking`                       | as authored — "Progressive modernisation"               |
| Cell value    | Prose (`--text-body`) | none — this role has no tracking companion | as authored                                             |
| Summary       | Prose (`--text-body`) | none                                       | as authored                                             |
| Caption       | `--text-caption`      | none — this role has no tracking companion | as authored — "Modernisation route comparison"          |
| Empty mark    | `--text-body`         | none                                       | —                                                       |

The row header is the title voice rather than bold body sans: `--text-h6` is the display face at
medium weight, so the key column is distinct by voice without restating a weight, and in the
stacked order it reads as what it is — the title of its group. Numeric columns add
`font-variant-numeric: tabular-nums`, which changes figure widths, not the role. Measure: none — a
table is not a reading column; `Prose` has no measure and the cells take their column's width.

## 9 · Responsive

**The stack is a container query, not a media query.** The root is an inline-size container, and
below `704px` of its own width every row becomes a group: the row header as its title, then each
data cell as its column head above its value. 704 is the md content column (768 − 2 × 32 gutter),
so for every live table — a `ContentSection` child at the full column — it fires at exactly the
viewports `@media (max-width: 767px)` would. It also answers the brief's open question about a
five-column table in the 392 three-up track: it stacks, because the query reads the track.

At 1023 nothing changes in the component; the table stays tabular in the 960 column. The gap scale
does not shift responsively: the same steps are used in both arrangements, re-assigned to the
seams the new arrangement has. No type role changes (`--text-h6`, `--text-ui-sm`, `--text-body` and
`--text-caption` hold at every width).

**No horizontal scroll, at any width.** A long unbroken string breaks (`overflow-wrap: anywhere`);
`nowrap` and `numeric` are released when stacked. Checked with `npm run shots`: 0 overflow at 390.

**Touch targets.** The table has none of its own. The only targets are inline links inside cells,
which are Prose's, and fall under the inline exception of WCAG 2.2 SC 2.5.8 (a target in a sentence
or block of text). In the stacked order each link sits on its own line with `--gap-text` or more to
the next target, so no two target boxes intersect.

## 10 · Composition

```tsx
<Layout rowGap="block" className={root}>
  {' '}
  {/* container; summary → table */}
  <Prose>
    <p>{summary}</p>
  </Prose>
  <table role="table">
    <caption>{caption}</caption>
    <thead role="rowgroup">
      <tr role="row">
        <th scope="col" role="columnheader">
          {keyColumn.heading}
        </th>
        {columns.map((c) => (
          <th scope="col" role="columnheader">
            {c.heading}
          </th>
        ))}
      </tr>
    </thead>
    <tbody role="rowgroup">
      {rows.map((r) => (
        <tr role="row">
          <th scope="row" role="rowheader">
            <span>{r.header}</span>
          </th>
          {r.cellsHtml.map((html, i) => (
            <td role="cell">
              <Layout rowGap="inline">
                {' '}
                {/* label above value */}
                <span aria-hidden="true">{columns[i].heading}</span>
                <Prose html={html} />
              </Layout>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</Layout>
```

**Why the table's display is not hand-rolled arrangement.** A `<table>` is the element whose
semantics are the arrangement, laid out by the table algorithm it carries. Nothing in the module
writes `display: grid` or `display: flex`. The stacked order sets the table's own elements to
`display: block`, which turns every row, header and cell into an ordinary block in document order —
and document order already IS the reading order the brief asks for. There is no arrangement left
for a primitive to do, and none could do it: a `<tr>` cannot be a `Layout` at one width and a table
row at another.

**Why the spacing is padding.** A cell's inset is the table's spacing mechanism at every width:
there is no gap on a table, and `border-spacing` does not exist under `border-collapse`. The stacked
order keeps that mechanism rather than switching to margins. No margin anywhere; no outer spacing
on the root; `Section`'s column is never touched.

## 11 · Accessibility

- **Semantics.** A real `<table>` with `<caption>` (when given), `<th scope="col">` column heads and
  a `<th scope="row">` first cell per row. The explicit ARIA table roles restate the elements; they
  are redundant wide and load-bearing stacked, because WebKit drops table semantics from elements
  whose `display` has changed.
- **Stacked order.** The head row is visually hidden (1px clip), never `display: none`, so the
  column headers stay in the tree and every cell keeps its header association. The repeated labels
  are `aria-hidden`, so nothing is read twice.
- **Accessible name.** The caption. With no caption the table has no name of its own and the
  preceding summary (or the section heading) introduces it; § 17 Q4.
- **Keyboard.** Nothing is bound. Tab reaches only the links inside cells, in DOM order — row by row,
  left to right, which is also the stacked reading order.
- **Ids / idrefs.** None. No `aria-describedby` from the table to the summary (§ 17 Q3), so there is
  nothing to dangle.
- **Focus ring / contrast / motion.** Links use Prose's ring. Floors are in § 6. Nothing moves.
- **What a screen reader says** (VoiceOver, a row cell): "Modernisation route comparison, table, 3
  columns, 4 rows" on entry; then for a cell "Typical disruption, Repair, Low".
- **Empty cell.** Announced blank by the reader on its own; the dash is `aria-hidden`.

## 12 · Content edge cases

| Case                                   | Handling                                                                                                                                                                     |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Longest realistic string               | Wraps within its column; a long row header wraps inside the held key column (specimen § 2).                                                                                  |
| One long unbroken token                | `overflow-wrap: anywhere` breaks it; in a `nowrap` / `numeric` column it widens the table, which the specimen marks as an authoring error.                                   |
| Zero rows                              | Renders nothing, warns in development. The seam already drops a block with no rows.                                                                                          |
| One / two rows                         | Renders, warns (designed range 3–8).                                                                                                                                         |
| Many rows (9+)                         | Renders every row, warns. Nothing truncates or paginates (specimen § 9).                                                                                                     |
| No data columns (the key column alone) | Renders the row headers, warns: "a key column alone is a list, not a table" (specimen § 9).                                                                                  |
| More than five data columns            | Renders, warns. Live: `product-modernisation-assessment` sends six; it still fits 1176 and stacks (§ 17 Q6).                                                                 |
| Cell count ≠ column count              | Padded with empty cells or truncated, warns. The seam already makes CMS rows agree.                                                                                          |
| Missing caption / summary              | Closes up; nothing reserves space (specimen § 5).                                                                                                                            |
| Empty cell                             | A quiet dash, `aria-hidden`; the cell is still a cell.                                                                                                                       |
| Blank row header                       | Renders an empty `<th scope="row">`, warns.                                                                                                                                  |
| Narrow track at 767                    | Stacked (the column is 703).                                                                                                                                                 |
| A parent that does not size it         | Inline-size containment means the root cannot take its width from content, so it needs a block or a Layout track. In a Cluster row it would collapse; do not place it there. |
| Logical properties                     | `padding-inline`, `border-block-*`, `inline-size`, `text-align: start / end` throughout.                                                                                     |
| Nested surface                         | Resolves from its own surface block (§ 6).                                                                                                                                   |
| Two adjacent                           | The caller's Layout owns the seam (`--gap-stack` in ContentSection).                                                                                                         |
| Interactive content in a slot          | Inline links only, through Prose. No buttons, no forms; a cell is not an action slot.                                                                                        |

## 13 · Motion

**None, and why.** Nothing transitions, animates or transforms; the change of arrangement at the
threshold is a re-layout, not a motion. There is no `prefers-reduced-motion` block because there is
nothing to reduce.

## 14 · Do's and Don'ts

- **Do** render a `<th scope="row">` as the first cell of every body row. Check:
  `grep -c 'scope="row"'` on a rendered route equals its row count.
- **Do** keep every column head in the accessibility tree at every width. Check: the module never
  sets `display: none` on `.head` or `.colHead`.
- **Don't** hand-roll arrangement. Check:
  `perl -0pe 's{/\*.*?\*/}{}gs' src/patterns/DataTable/DataTable.module.css | grep -nE 'display:\s*(grid|flex|inline-flex)'` → nothing.
- **Don't** use margins. Check: `perl -0pe 's{/\*.*?\*/}{}gs' src/patterns/DataTable/DataTable.module.css | grep -n margin` → nothing.
- **Don't** give the table a ground. Check: `grep -n background src/patterns/DataTable/DataTable.module.css src/styles/tokens/components/data-table.css` → nothing.
- **Don't** zebra-stripe, sort, filter or paginate. Check: no `:nth-child(odd|even)`, no `'use client'` in `DataTable.tsx`.
- **Don't** scroll horizontally. Check: `npm run shots -- data-table` → 0 overflow at 390.
- **Don't** flatten cells to plain text at the seam. Check: `grep -n richTextToPlainText src/content/sources/strapi/table.ts` finds one call, the row-header line.

## 15 · Specimen plan — `/design/data-table`

1. Column counts: key + 2 (the live product-modernisation-test table), key + 3, key + 5.
2. Rows: 8; long row headers.
3. Column behaviour: `numeric`; a mono key (a `nowrap` key column beside a `nowrap` column of inline
   code); `hold` beside a greedy prose column.
4. Inline marks, links and two paragraphs in one cell; empty cells, including a fully empty row.
5. Caption and summary: both, caption only, summary only, neither.
6. The stacked order: key + 5, marks/empty, numeric/nowrap in `.trackMobile` (326), and three
   tables in the 392 three-up track — all stacked at 1440 because the query reads the track.
7. Four surfaces as sibling bands with identical markup, each with a wide and a stacked table.
8. Nested surfaces: tint in ink, ink in paper, blue in paper.
9. Out of contract: 1 column, 9 rows, 6 data columns, mismatched cell counts and a blank row header.
10. Two adjacent.

No state needs pointing at: the only interactive parts are Prose links.

## 16 · New token requests

```
--dtab-rule-width        :root  var(--border-width-hairline)
--dtab-hold-size         :root  192px — component size, § 7(b)
--dtab-hidden-size       :root  var(--space-1) — optical, § 7(c)
--dtab-head-ink          per surface, § 6
--dtab-key-ink           per surface, § 6
--dtab-caption-ink       per surface, § 6
--dtab-head-rule-ink     per surface, § 6
--dtab-rule-ink          per surface, § 6
--dtab-empty-ink         per surface, § 6
```

Registered in `tokens/index.css` in the same edit. Every other value is an existing token.

## 17 · Open questions

All non-blocking. Each was decided in the direction most consistent with CLAUDE.md and the brief,
and built that way; the owner may overturn any of them without a structural change.

**1 · How the stack is triggered — non-blocking.** (a) `@media (max-width: 767px)`, the precedent;
(b) a container query on the table's own track. **Built: (b).** Identical to (a) for every live
table (full content column), and it makes the 392 three-up case work instead of crushing. The
brief notes container-query syntax has no precedent; `SiteNav` already uses `container-type`, and
this is the first `@container` rule. The cost: the root needs a parent that sizes it (§ 12).

**2 · What the stacked form looks like, and the row header — non-blocking.** (a) key-above-value
pairs under the row header as the group's title; (b) a definition list with keys beside values.
**Built: (a).** At 326 a beside-arrangement leaves the value ~180px. The row header is the group's
title and carries no key-column label: it is the NAME of the group, and a label repeated over every
title ("Route", "Route", "Route") buried the line that says which row this is. Every data value
carries its column head.

**3 · Caption above or below; summary relative to it — non-blocking.** **Built: the seam's
precedent** — summary as a paragraph before the table, caption at the top of the table as its name.
Title-before-intro was considered, but a paragraph cannot sit between a `<caption>` and the head
row, and moving the summary after the table would turn an intro into a caveat. No
`aria-describedby` from table to summary: the summary is immediately before the table in reading
order, and an idref adds a dangling-reference risk for no gain.

**4 · A table without a caption has no accessible name — non-blocking.** 3 of 39 live tables send no
caption. **Built: render without a name**; the ContentSection heading above introduces it. A
content recommendation, not a component change: every table block should carry a caption.

**5 · Row header distinction — non-blocking.** The brief offers weight or ground. Ground is not
available (the table must not own one). **Built: voice** — `--text-h6`, the display face at medium
weight, plus the raised ink — rather than restating a weight on body sans, which the audit rules
forbid in a module.

**6 · Column range — non-blocking.** The brief says "2 to 5 data columns", but its own counts (2 on
12 tables, 3 on 34 …) and the live data (39 tables, 2–5 columns in total, key included, plus one of 7) show those are TOTAL columns. **Built: key + 1 to 5 data columns designed**, warnings outside it.
The live `product-modernisation-assessment` audit sends 6 data columns: it renders and stacks, and
is flagged as a content trim.

**7 · Where column behaviour comes from on live routes — non-blocking.** Strapi has no field for it,
so every live table renders the defaults (key `hold`, data `fluid`). **Built: presentation props,
defaults on routes.** Logged as `docs/strapi-changes.md` § 9: an optional semantic column kind
(text · numeric · identifier), which is content meaning, not layout. No inference from cell content —
code does not guess.

**8 · Rich text in the row header — non-blocking.** **Built: plain text**, as the seam had it. A row
header is a name, the stacked title and the cell's header for a screen reader; no live table puts a
mark or link in the first column.

**9 · The seam's cell format — non-blocking.** (a) sanitised HTML strings; (b) a small inline-mark
structure. **Built: (a)**, through the same `richTextToHtml` every other rich-text field uses, rendered
by Prose — one sanitiser, one set of mark styles.

## Appendix · Self-audit

```text
STRUCTURE
[x] All 18 sections present, in order.
[x] Tier 2 pattern, Status approved, prefix --dtab-* with no collision.
[x] Every Anatomy part appears in colour, geometry or typography, or is delegated to Prose.

NAMES
[x] --dtab-* tokens declared: 9 (3 geometry in :root, 6 colour × 4 surfaces).
[x] Every existing name referenced resolves in the token layer (npm run design:check).
[x] Every layout distance is a gap-scale role; one component size (hold 192) and one optical
    reach (--space-1) are stated and commented.
[x] Zero hex in the module; px only in the @container prelude (exempt) and the token layer.

COLOUR AND CONTRAST
[x] 6 rows × 4 complete cells. Every text token ≥ 4.5:1 on every surface (lowest 4.91:1,
    brandeis-100 on blue). Non-text marks ≥ 3:1 (lowest 3.16:1). Rules marked decoration.
[x] One paragraph per surface; nested surfaces specified and rendered.

STATES
[x] None; the table is not interactive. Links are Prose's.

LAYOUT
[x] No display grid/flex, no margins, no ground, no Section override. The table's display and the
    stacked blocks are argued in § 10.
[x] No horizontal overflow at 390 (npm run shots: 0 problems).
```
