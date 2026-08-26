# Component briefs

One file per component. Eighteen came out of the content audit; **19 and 20 did not** — a brief may
also be raised for a component a real call site turns out to need. **Open the file, select all of it, paste it into
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

## The twenty

Three are pasteable. Seventeen are not: sixteen describe components that **already ship** — do not
specify them, compose from the library instead — and one is blocked on content. Brief 09 shipped **two**
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
| 12 | [Block Card](12-block-card.md) | `BlockCard` · 2 · `--bcrd-` | 38 routes · 78 clusters · 2 | **ships today — do not specify** |
| 13 | [Figure](13-figure.md) | `Figure` · 2 · `--fig-` | 0 images · 21 captions written | **ships today — do not specify** |
| 14 | [Accordion](14-accordion.md) | `Accordion` · 2 · `--acc-` | 21 routes · 22 sections · 1 | **ships today — do not specify** |
| 15 | [Testimonial](15-testimonial.md) | `Proof` · 2 · `--proof-` | 6 routes · 2 | **ships today in shared Proof — do not specify** |
| 16 | [Callout](16-callout.md) | `Callout` · 2 · `--call-` | 8 routes · 10 instances · 1 | **ships today — do not specify** |
| 17 | [Stat](17-stat.md) | `Proof` · 2 · `--proof-` | 1 route resolved, 3 claimed · 2 | **ships today in shared Proof — do not specify** |
| 18 | [Filters](18-filters.md) | `Filters` · 2 · unassigned | none | **blocked on content — do not specify** |
| 19 | [Table of Contents](19-table-of-contents.md) | `TableOfContents` · 2 · `--toc-` | 82 routes ≥ 6 headings · 1 arrangement | **ships today — do not specify** |
| 20 | [Tag](20-tag.md) | `Tag` · 1 · `--tag-` | 10 route modules · 2 variants · 1 arrangement | paste |

Every proposed prefix was checked against the ones already taken. **That list is generated into
`docs/vocabulary.md` — read it there.** It is deliberately not copied here: this sentence used to
carry the list and went stale three times, most recently when `--toc-` landed with
`TableOfContents`.

## The order to run them in

Dependency order, plus what unblocks the most pages.

1. **Page Hero** · 05 — 129 routes, and no page renders without it.
2. **Content Section** · 07 — 738 instances. Everything below is a child of it.
3. **Table** · 10 — one rendering, and it may turn out to be a `Prose` change rather than a
   component.

*(Accordion · 14 was the other half of this step and now ships — `src/patterns/Accordion/`, spec at
`docs/specs/Accordion.md`, specimen at `/design/accordion`. Do not specify it again; compose against
the shipped component. Note it landed as a tier-2 **pattern**, not the tier-1 primitive this table
proposed: it composes Layout, Cluster, Icon and Prose, and a primitive may not do that.)*

*(Breadcrumbs · 06 was third on this list and now ships — `src/patterns/Breadcrumbs/`, spec at
`docs/specs/Breadcrumbs.md`, specimen at `/design/breadcrumbs`. Do not specify it again; compose
against the shipped component in the library.)*

*(Block Card · 12 now ships — `src/patterns/BlockCard/`, spec at `docs/specs/BlockCard.md`, specimen
at `/design/block-card`. Do not specify it again; compose against the shipped component.)*

*(List Card · 11 was the other half of this step and now ships — `src/patterns/ListCard/`, spec at
`docs/specs/ListCard.md`, specimen at `/design/list-card`. Do not specify it again; compose against
the shipped component in the library. The distinction remains load-bearing: `ListCard` is a ruled
ROW, while `BlockCard` is a four-sided edge-bounded TILE; neither paints a ground.)*

6. **Proof, as one session** — **Testimonial** · 15 and **Stat** · 17 together. Split apart, Stat
   duplicates half of Testimonial.

*(Proof now ships — `src/patterns/Proof/`, spec at `docs/specs/Proof.md`, specimen at
`/design/proof`. Brief 15's quote-only case, brief 17's figures-only case and their combined
evidence block are one pattern. Do not specify Testimonial, Stat or Rating separately.)*

7. **CTA Section** · 08 and **Form** · 09 — CTA depends on the proof slot, Form on whether a field
   control is a primitive.
8. **Callout** · 16 — **now ships** at `src/patterns/Callout/`, with its spec at
   `docs/specs/Callout.md` and specimen at `/design/callout`. Do not specify it again; compose the
   shared semantic scope note from the library.
9. **Figure** · 13 — **shipped early, and the dependency stated here turned out to be backwards.**
   `src/patterns/Figure/`, spec at `docs/specs/Figure.md`, specimen at `/design/figure`. Do not
   specify it again; compose against the shipped component.

   The premise was that Figure had to wait for an image slot in Hero, Content Section and Block
   Card. It did not: Figure asks nothing of any container — it fills whatever inline space it is
   given, paints no ground and takes no `surface` — so it was buildable against the one call site
   that is real today, standalone use in case studies, where 21 caption-and-note lines were already
   written with nothing to hold them. The slot question runs the other way and is now the blocked
   one: `PageHero` deferred it pending Figure existing (`PageHero.md` §17 Q3), and when those
   containers gain a slot it must be an `image?: ReactNode` the caller fills, because a pattern may
   not import a pattern. Recorded as `Figure.md` §17 9b.

   What Figure DID need was a content-model decision, answered 24 Aug 2026 and recorded as
   `Figure.md` §17 9a: long-form bodies are a block list — rich text, then a figure, then rich text
   — and an image never arrives inside a rich-text body string. Three of the brief's five hard
   constraints (the quieter note, the hairline, parent-decided width) cannot be expressed inside
   one, so `Prose` is not an alternative route for a figure.
10. **Filters** · 18 — after a taxonomy exists. Content work, not design work.
11. **Table of Contents** · 19 — **now ships**: `src/patterns/TableOfContents/`, spec at
    `docs/specs/TableOfContents.md`, specimen at `/design/table-of-contents`. Do not specify it
    again; compose against the shipped component. It brought the system its first **scroll
    observation**, which nothing here had before.

    **The six routes carrying the retired band did not all become rails, and an earlier version of
    this paragraph said they would.** They do not, because **page type decides, not heading
    count** — `TableOfContents.md` § 1. Long-form documents get an outline; standard pages get
    none. Of the six, only `audits/[slug]` is long-form: it now composes the rail. The band was
    **deleted outright** from `services/[...slug]`, `expertise/[slug]`, `glossary/[slug]`,
    `tools/[slug]` and `how-we-work`, which are standard pages and should never have carried a
    page outline.

    The content seam was already ahead of it and still is. `AuditSection.heading` is
    `{ text, anchorId, navigationLabel? }` — the id is derived and de-duplicated in
    `sources/strapi.ts`, and the optional short label is what makes an outline readable at all: the
    corpus's section headings run to a median of 35 characters and a maximum of 87, so heading text
    is a fallback and not the label. A route that adopts the rail passes the short label, not the
    heading, and a section without one is simply absent from the outline.

    **Three of § 1's long-form types cannot render an outline yet, and it is a content-model gap
    rather than route work.** `terms-of-use` and `privacy-policy` carry
    `{ id, heading: string, bodyHtml }` — the route generates the heading ids, but there is no
    `navigationLabel`, so every entry would fall back to full heading text. `case-studies` and
    `insights` are further back: `CaseStudyBlock` and `BlogBlock` have **no heading member at
    all** — the bodies are opaque rich text and the `<h2>`s the routes render from `block.title`
    carry no id. Giving either an outline means deriving anchors at the seam first, the way
    `sources/strapi.ts` already does for the five section types that have them.
12. **Tag** · 20 — **runnable now, and blocked by nothing.** Ten route modules already render its
    row as bare `<li>` text inside a `Cluster`, so the call sites are real, shipped and identical.
    It is one mark and `Cluster` keeps the row, which is why the brief forbids a `TagList` in its
    first hard constraint.

    Two variants, decided rather than left open: an **inert** taxonomy mark and an **interactive**
    filter chip that takes over the insights filter rows from `Button emphasis="ghost" size="sm"`.
    So the insights route's filter band changes shape when it lands, and the component carries the
    full state model on one variant and none of it on the other. A **status** variant was
    considered and is explicitly out — `src/content/types.ts` has no status field of any kind on
    any page type, and the brief records that so it does not get re-raised.

    The one constraint worth knowing before reading it: an inert mark must not read as touchable,
    an interactive mark must not read as inert, and neither may borrow a button's rest signature.
    That third leg is satisfiable because `Button.module.css:207` rules out an edge at rest for
    every emphasis, deliberately — so an edged box is unclaimed territory and is what both tag
    variants can safely take.

    It is also **the brief that changed the shared touch-target rule.** §9 used to state a flat
    44px minimum; it now states 24×24 as the floor (WCAG 2.2 SC 2.5.8, AA; 44×44 is SC 2.5.5,
    AAA) and asks each component to argue the number above it. Tag is the worked case: neither
    means §9 offers reaches 44 on a wrapping row — `extendHitArea` grows the target vertically
    only, so at `rowGap="tight"` the extended targets of two adjacent rows overlap, and stepping
    the box up to 44 makes a tag button-sized, which the legibility constraint forbids. **24 is a
    floor to clear, not a size to aim at**, and the brief says so in terms, because a filter row
    operated by thumb deserves better than the minimum.

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
