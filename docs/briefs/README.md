# Component briefs

One file per component the content audit identified. **Open the file, select all of it, paste it into
the Tcules project in Claude Design.** That is the whole step — each one is a complete document:
the spec-writing prose and that component's own filled brief, in one place.

What comes back is a spec, saved to `docs/specs/<Component>.md`, and built with
`/build-from-spec docs/specs/<Component>.md`.

**Edit these by hand.** Nothing generates them and nothing overwrites them.

**The token vocabulary is not in them.** Every colour with its hex values, the gap scale, the type
roles, the glyph set, the taken prefixes and the primitives' real prop unions live once in the Claude
Design project as a guidelines document. Regenerate it with
`node scripts/design-brief.mjs --vocabulary > docs/vocabulary.md` and push that file to the project's
`guidelines/docs/`. Nothing checks the pushed copy is current, so **after a token rename it has to be
regenerated and pushed again.**

## The eighteen

Eight are pasteable. Ten are not: nine describe components that **already ship** — do not specify
them, compose from the library instead — and one is blocked on content. Brief 09 shipped **two**
components rather than one: `EnquiryForm` and the `Input` primitive it needed, which also absorbed
SiteFooter's private newsletter field tokens. Each says so in its Status
cell, and the five that never had a `BRIEF` block say so at the top of the file too.

**This table is the first thing a designer reads, so a stale Status cell is the most expensive kind
of staleness in the repo.** It sends someone off to specify a component that already exists, which
is the exact waste the library was built to prevent — and nothing checks it. When a component ships,
move its row to "ships today" in the same change that merges it.

| # | Brief | Proposed name · tier · prefix | Launch scope | Status |
|---|---|---|---|---|
| 01 | [Buttons](01-buttons.md) | `Button` · 1 · `--btn-` | 305 actions, all pages | **ships today — do not specify** |
| 02 | [Rich Text](02-rich-text.md) | `Prose` · 1 · `--prose-` | 129 pages | **ships today — do not specify** |
| 03 | [Nav](03-nav.md) | `SiteNav` · 2 · `--nav-` | 129 pages | **ships today — do not specify** |
| 04 | [Footer](04-footer.md) | `SiteFooter` · 2 · `--foot-` | 129 pages | **ships today — do not specify** |
| 05 | [Page Hero](05-page-hero.md) | `PageHero` · 2 · `--hero-` | 129 routes · 1 arrangement | **ships today — do not specify** |
| 06 | [Breadcrumbs](06-breadcrumbs.md) | `Breadcrumbs` · 2 · `--crumb-` | 128 routes · 1 | **ships today — do not specify** |
| 07 | [Content Section](07-content-section.md) | `ContentSection` · 2 · `--csec-` | 110 routes · 738 instances · 4 | paste |
| 08 | [CTA Section](08-cta-section.md) | `CtaSection` · 2 · `--cta-` | 76 routes · 113 instances · 3 | **ships today — do not specify** |
| 09 | [Form](09-form.md) | `EnquiryForm` · 2 · `--enq-` (+ `Input` · 1 · `--inp-`) | 56 routes · 2 variants | **ships today — do not specify** |
| 10 | [Table](10-table.md) | `DataTable` · 1 · `--tbl-` | 56 routes · 61 tables · 1 | paste — carries an `UNRESOLVED` |
| 11 | [List Card](11-list-card.md) | `ListCard` · 2 · `--lcrd-` | 53 routes · 70 sections · 5 | **ships today — do not specify** |
| 12 | [Block Card](12-block-card.md) | `BlockCard` · 2 · `--bcrd-` | 38 routes · 78 clusters · 2 | paste |
| 13 | [Figure](13-figure.md) | `Figure` · 1 · `--fig-` | 0 images · 21 captions written | paste — run it last |
| 14 | [Accordion](14-accordion.md) | `Accordion` · 1 · `--acc-` | 21 routes · 22 sections · 1 | paste |
| 15 | [Testimonial](15-testimonial.md) | `Testimonial` · 2 · `--tstm-` | 6 routes · 2 | paste — with 17 |
| 16 | [Callout](16-callout.md) | `Callout` · 1 · `--call-` | 8 routes · 10 instances · 1 | paste |
| 17 | [Stat](17-stat.md) | `Stat` · 2 · `--stat-` | 1 route resolved, 3 claimed · 2 | paste — with 15 |
| 18 | [Filters](18-filters.md) | `Filters` · 2 · unassigned | none | **blocked on content — do not specify** |

Every proposed prefix was checked against the fourteen already taken — `--btn-`, `--crumb-`,
`--cta-`, `--enq-`, `--foot-`, `--hero-`, `--icn-`, `--inp-`, `--lay-`, `--lcrd-`, `--logo-`,
`--nav-`, `--prose-`, `--sec-`. That list is generated into `docs/vocabulary.md`; read it there
rather than trusting this sentence, which has been stale twice.

## The order to run them in

Dependency order, plus what unblocks the most pages.

1. **Page Hero** · 05 — 129 routes, and no page renders without it.
2. **Content Section** · 07 — 738 instances. Everything below is a child of it.
3. **Accordion** · 14 and **Table** · 10 — one rendering each, and Table may turn out to be a
   `Prose` change rather than a component.

*(Breadcrumbs · 06 was third on this list and now ships — `src/patterns/Breadcrumbs/`, spec at
`docs/specs/Breadcrumbs.md`, specimen at `/design/breadcrumbs`. Do not specify it again; compose
against the shipped component in the library.)*
5. **Block Card** · 12 — one of the two shapes the section's child slot takes.

*(List Card · 11 was the other half of this step and now ships — `src/patterns/ListCard/`, spec at
`docs/specs/ListCard.md`, specimen at `/design/list-card`. Do not specify it again; compose against
the shipped component in the library. `BlockCard` is still to be specified, and the distinction is
load-bearing: `ListCard` is a ruled ROW with no ground, `BlockCard` is the filled object.)*
6. **Proof, as one session** — **Testimonial** · 15 and **Stat** · 17 together. Split apart, Stat
   duplicates half of Testimonial.
7. **CTA Section** · 08 and **Form** · 09 — CTA depends on the proof slot, Form on whether a field
   control is a primitive.
8. **Callout** · 16.
9. **Figure** · 13 — the image slot has to exist in Hero, Content Section and Block Card first.
10. **Filters** · 18 — after a taxonomy exists. Content work, not design work.

## Three carry a decision that is not the designer's

08 (the ask itself), 09 (whether a `Field` primitive comes first) and 10 (whether the component is
needed at all). Each says so **inside its own brief block**, marked `UNRESOLVED`, so the question
travels with the document and comes back as a BLOCKING open question rather than a silent guess.
Settling them first is still better.

## Two decisions that cross several briefs

**The CTA label system.** The content uses two asks — "Start a project" 72×, "Request free audit"
38×. The sitemap specifies ten per-page-type asks instead. Both are defensible and **both cannot
ship.** It is a copy decision, not a component decision, and it changes the arrangement — the shape
that suits one long tailored label is not the shape that suits "Start a project". Appears in 01, 08
and 09.

**Blockquote routing.** Markdown has one blockquote and this system has three destinations for it:
`Prose`'s own quote treatment, `Callout` (unattributed — a boundary on a claim) and `Testimonial`
(attributed — name, role, company). Attribution is the entire test, and it is applied at the content
seam, not by a component sniffing its children. Appears in 02, 15 and 16.

## Where the numbers come from

The old repo's content audit over the 129 files in `cms-ready/`: `docs/eighteen-components.md`,
`docs/extraction/table2-arrangement-resolution.csv` (which arrangement each of 706 route-component
pairs resolves to), `table6-component-behaviours.csv` (the decisions that must settle first) and
`section3-reconciliations.md`, which re-derives the sheet's counts and corrects several of them.

**Where the sheet and the reconciliation disagree, these briefs carry the reconciled figure** — Block
Card holds 78 clusters and not 112, List Card 70 sections and not 49, Accordion releases 15 pages and
not 27. The sheet's own histograms do not sum to its totals.
