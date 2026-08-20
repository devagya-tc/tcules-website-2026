# Brief 03 — Nav

> **Ships today. Do not specify this.** `src/patterns/SiteNav` already answers the harder half of the
> audit's six arrangements — its panel is a **list of blocks**, so a variable column count is data
> rather than a second component, which is exactly the audit's own conclusion. What remains is
> verification, not specification.

| | |
|---|---|
| Inventory | #03 Nav — 129 pages, 100%, 6 arrangements |
| Implemented at | `src/patterns/SiteNav/` · `src/styles/tokens/components/nav.css` · `/design/site-nav` |
| API | `items: SiteNavItem[]` · `cta: SiteNavLink` · `surface` |
| Panel blocks | `rows` (1–2 columns of label + promise + optional mark) · `rail` (compartments and/or groups) · `bar` (a link to the section index) |

## The six arrangements, mapped

| Audit arrangement | What ships |
|---|---|
| Bar · at rest | the bar — logo, items, one solid primary CTA |
| Bar · condensed | `--nav-bar-height-compact` exists (64 against 72) — **verify the scroll behaviour is wired, not just the token** |
| Mega panel · 2 or 3 columns | `panel: SiteNavBlock[]`. Column count is data — a `rows` block takes `columns: 1 \| 2`, and a panel takes any number of blocks |
| Compact menu | an item with no `panel` is a plain link — Work and About |
| Mobile · top level | the drawer — `--nav-drawer-*` |
| Mobile · inside a group | the same blocks one level down — **verify** |

`SiteNavItem.matchPaths` is the answer to the audit's warning that **Audits is not a primary nav
item**: Services owns `/audits` and `/how-we-work` without them appearing in the bar, so those pages
light the right item instead of leaving the whole bar unlit.

`SiteNavRow.promise` being required rather than optional is the audit's "group headings are
structural, not decoration" rule made into a type — a panel of rows with empty second lines is worse
than a panel of plain links, so the type refuses it.

## What to verify rather than specify

1. **Condensed on scroll, reappearing on scroll up.** The token exists. Confirm the behaviour does,
   and that it respects `prefers-reduced-motion`.
2. **Mobile inside a group.** The audit is explicit that mobile renders *the same blocks* one level
   down and is not a separate component. Confirm all three block kinds render in the drawer.
3. **An entry whose target does not exist.** Four Services and four Insights menu entries have no
   content file — "Design and Development Engagements", the eight `/insights/topics/{slug}` hubs.
   The panel must render them anyway. `@/lib/routes` names paths with no page behind them for this
   reason; confirm the fixture does not quietly drop them.

## If a brief does get written

Only for item 1, and only if the behaviour turns out to be missing — in which case it is a **new
mechanism request** (a scroll listener), not a component spec.
