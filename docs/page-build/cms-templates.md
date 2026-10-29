# CMS templates: which pages take which blocks

**For Mihir (CMS owner) · 29 Oct 2026 · launch Fri 6 Nov, content freeze Wed 4 Nov.**
Read from the 26 Oct copy in `_pages/` (153 files) through the site's own parser
(`src/content/sources/corpus/load.ts`), with `docs/page-build/census.json` for tiers and live case slugs.
Every count below was measured from the copy, not estimated.

**What this gives you.** The page types that ship, grouped into CMS templates. For each template: the sections
in order, which block each one is, whether it is required, and the fields. Then the shared records, the
collections, and a template × block matrix. One filled JSON example per template is in
`docs/page-build/cms-templates/<template>.json`.

**The rule this follows.** A block is a *kind of content*, never a layout. Strapi stores what a section says;
the front end decides how it looks. Nothing here is a variant, a column count, a colour or a surface. If a field
only changes how something looks, it does not belong in Strapi (`docs/strapi-changes.md` § 1).

**Field names.** `src/lib/corpus-types.ts` is the only authority. Where it names a field (`seo.ogImageAlt`,
`conversion.visibleFields`, `hero.proofLines`, `testimonialId`), the examples use that name. Where it does not
yet model one, the examples keep the copy's frontmatter name (`social.og_title`, `editorial.reading_time_as_displayed`
appears as `readingTimeAsDisplayed`) and this file says so. Block field names are new; they are proposed here.

**Rich text** in this document means Markdown limited to inline marks: bold, italic, links and inline code, with
lists and tables only where a field says so. Links must survive storage; the site parses Markdown into
structured runs (`src/content/sources/corpus/parse-inline.ts`). Never store it as flattened plain text.

---

## 0 · What does not ship from the copy

- **The 17 rewritten case studies** (`_pages/case-studies__*.md`) do not ship. The 20 live case studies keep the
  existing Strapi case-study model as they are (`src/content/sources/strapi/case-study.ts`). The copy's case
  pages are left out of every count below. **136 copy files ship.**
- **Live insights not in the copy** (about 70 articles, videos and events) stay on the current Strapi blog as they
  are.
- **Every Selected work reference must resolve to a live case's current slug.** The copy uses planned slugs for
  11 cases. All 272 such references resolve, but only through a redirect: store the **live** slug. The mapping
  is `CASE_SLUG_REDIRECTS` in `src/lib/routes.ts` (e.g. `auxentios-cpq-product-mvp-design` →
  `consumer-grade-ux-in-enterprise-saas-a-case-study-on-mvp-design-for-cpq-software`). The JSON examples
  already store the live slug in `case` and keep the copy's slug in `copySlug` for checking.
- **Two clients the copy treats as cases have no case page**: CuramCare and Vovisto (`CASE_STUDY_PLACEHOLDERS`
  in `src/lib/routes.ts`). A Selected work entry or a comparison row naming them has no case to point at.

---

## 1 · Page types → CMS templates

The copy's `page_type` values, grouped into the templates that need different section rules.

| Template | Copy `page_type` | Files | Tier | Which files |
|---|---|---|---|---|
| **Service, level 1** | `service` | 7 | A | `services__{ai-product-ux, design-engineering, design-systems, new-product-design-first-release, product-design, product-modernisation, software-development}.md` |
| **Service, level 2** | `service` | 26 | B | every `services__<parent>__<child>.md` |
| **Audit / assessment** | `audit` (4), `assessment` (2) | 6 | B | `audits__{ux-product-audit, ai-product-ux-readiness, design-system-audit, design-to-code-audit, product-modernisation-assessment, prototype-readiness-review}.md` |
| **Expertise: product type** | `expertise` with `expertise_kind: product_shape` | 6 | A | `expertise__{ai-products-developer-tools, b2b-saas-workflow-software, commerce-transactional-products, content-knowledge-discovery-platforms, data-analytics-decision-products, marketplaces-multi-sided-platforms}.md` |
| **Expertise: industry** | `expertise` with `expertise_kind: domain_context` | 6 | A | `expertise__{climatetech-energy, edtech-learning, fintech, healthtech, martech-salestech, proptech-contech-field-operations}.md` |
| **Hub** | `service` (`/services`), `expertise_hub`, `page` (`/audits`), `proof_hub` (`/case-studies`) | 4 | A/B | `services.md`, `expertise.md`, `audits.md`, `case-studies.md` |
| **Listing** | `knowledge_hub`, `knowledge_collection` (4), `tool_hub`, `glossary_hub`, `author_index` | 8 | B/C | `insights.md`, `insights__{articles, guides, podcasts, events}.md`, `tools.md`, `glossary.md`, `insights__authors.md` |
| **Article** | `article` | 12 | B | 8 under `insights__articles__*`, plus `insights__{cpq-ux-design, vibe-coded-app-production-ready, when-to-hire-a-design-system-consultant, confidence-scores-dont-fix-trust-when-review-step-never}.md` |
| **Guide** | `guide` | 10 | B | `insights__guides__*.md` |
| **Podcast** | `podcast` | 2 | B | `insights__podcasts__*.md` |
| **Glossary term** | `defined_term` (18), `glossary` (1) | 19 | C | `glossary__*.md` (the one `glossary` file, `ai-native-product-design`, is a term page with a different type label) |
| **Tool** | `tool` | 6 | B | `tools__*.md` |
| **Author** | `author` | 8 | C | `insights__authors__*.md` |
| **Legal / policy** | `legal` (3), `policy` (1) | 4 | C | `cookie-policy.md`, `privacy-policy.md`, `terms-of-use.md`, `how-we-work__ai-transparency.md` |
| **One-off page** | `page` (6), `company`, `lab`, `lab_artefact`, `practice`, `proof_hub` (`/clients`), `utility` | 12 | A/B/C | `home.md`, `about.md`, `contact.md`, `future-interfaces-lab.md`, `future-interfaces-lab__join.md`, `careers.md`, `clients.md`, `why-tcules.md`, `how-we-work.md`, `how-we-work__ai-native-product-design.md`, `matter-design-system.md`, `sitemap.md` |
| | | **136** | | |

Notes on the grouping:

- **Product type and industry are one template in content.** All 12 expertise pages have the identical section
  order. The only difference is the hero image: a product type carries an illustration, an industry a sector
  photograph. Model one expertise type with an `expertiseKind` field (`product_shape` · `domain_context`, the
  copy's own values).
- **Article, guide and podcast differ only in envelope fields** (podcast adds hosts, guests and a recording link).
  Their bodies are free sequences of the same four blocks. One `insight` type with a `format` field
  (`article` · `guide` · `podcast`) serves all three. See open question Q3 on whether they join the live blog model.
- **`/how-we-work/ai-transparency`** is filed under legal/policy: it is policy text with an FAQ and the standard
  enquiry form settings, but no enquiry section.
- **`/sitemap`** is in the one-offs only for completeness. It is 13 lists of links to routes; it should be
  generated from the routes, not authored (open question Q8).

### Proposed Strapi content types

| Content type | Templates it holds | Pages | Why one type |
|---|---|---|---|
| `offer-page` (collection) | service L1, service L2, audit, expertise (both kinds) | 51 | Same blocks, same fixed closing run (§ 4). Fields `offerKind` (`service` · `audit` · `assessment` · `expertise`), `level` (1 · 2), `parent` (relation to its L1, L2 only), `expertiseKind`. |
| `hub-page` (collection) | hub | 4 | Offer blocks plus Client recognition and Routes; no What you get. |
| `listing-page` (collection) | listing | 8 | Page lists, comparisons, FAQ. |
| `insight` (collection) | article, guide, podcast | 24 | One body model; `format` decides the envelope extras. |
| `glossary-term` (collection) | glossary term | 19 | |
| `tool` (collection) | tool | 6 | Adds the tool mount. |
| `author` (collection) | author | 8 | The page is the author record (§ 6). |
| `legal-page` (collection) | legal / policy | 4 | Plain sections, no band ids authored on 3 of 4. |
| `page` (collection) | one-off | 12 | Every block allowed; each page is composed once. |

---

## 2 · The page envelope (every template)

Identical across all 136 files. The full spec is `docs/cms-ready.md` § 1; field names are `CorpusPage` in
`src/lib/corpus-types.ts`.

| Group | Fields (type) | Notes |
|---|---|---|
| Identity | `route` (string, unique) · `slug` (uid) · `name` (string) · `pageType` (enum: the copy's values) · `template` (enum, § 1) | |
| SEO | `seo.title` · `seo.description` · `seo.canonical` (url) · `seo.robots` (string) · `seo.ogImageAlt` (string) | |
| Social | `og_title` · `og_description` · `og_image` (media) · `og_image_alt` · `og_type` · `twitter_card` | Frontmatter names; not in `corpus-types.ts`. Mostly a copy of SEO: store overrides only. **`og_image` is `IMAGE_ASSET_REQUIRED` on 85 of 136 pages.** |
| Breadcrumb | `breadcrumb[]`: `name`, `url` (repeatable) | |
| Search context | `searchContext.primaryIntent` · `primaryBuyerQuestion` · `supportingQuestions[]` · `primaryQuery` · `secondaryQueries[]` · `keyEntities[]` | Editorial. Never rendered. |
| Structured data | `structuredData.types[]` (enum list: `WebPage`, `Service`, `FAQPage`, `Article`…) | `FAQPage` is emitted from the FAQ block; the list says which types the page claims. |
| Release | `release.contentState` · `release.siteReleaseState` | Every page is `SITE_RELEASE_HOLD` today. |
| Conversion | `conversion`: relation to a **Form** record (§ 5), or empty | Present on 63 pages: every offer page, hub and enquiry one-off, plus `/how-we-work/ai-transparency`. |
| Hero | component, § 3.1 | Every page. |
| Sections | the ordered list of section blocks, § 3.2 | **Its order IS `band_order`.** |

**`band_order` is authoritative and must be storable.** It is stored as the order of the sections list, with each
section carrying its band id as `anchor`. Do not store `band_order` as a second field beside the sections: two
lists that must agree will eventually disagree (the census already caught one page where they did). The three
legal pages author no band ids or order; their sections keep document order and take the anchors the copy's
headings slug to (`bandOrderAuthored: false` in the legal example).

**Anchors are content.** Band ids are linked to from other pages (`/how-we-work#engagement-shapes`, every
`#enquiry` hero action). Store them verbatim, unique within the page, and never regenerate them from a heading.

### Envelope extras by template

| Template | Extra fields (type) | Source in the copy |
|---|---|---|
| expertise | `expertiseKind` (enum `product_shape` · `domain_context`) | `expertise_kind` |
| article, guide, podcast | `editorial`: `authors` (relation → Author, many, ordered; **2 guides have two authors**) · `authorRole` (string) · `reviewer` (relation → Author, optional) · `publishedAt` (date, optional) · `modifiedAt` (date) · `dateAsDisplayed` (string) · `readingTimeAsDisplayed` (string) · `topicTags` (string list) · `standfirst` (text) · `keyTakeaways` (string list, required: all 24 carry them) · `series` (string, optional) | `editorial.*`. The hero's byline line ("By … · Updated … · 12 min read") is built from these; do not store it twice. |
| article, guide, podcast | `subscription`: relation to the **Newsletter** form record (§ 5) | `subscription`, identical on all 20 pages that carry it (8 articles, 10 guides, 2 podcasts) |
| article, guide, podcast | `relatedContent[]`: `anchor` (string), `target` (route) | `page_composition.related_content`: editorial link remapping notes; optional |
| podcast | `podcast`: `host[]` and `guest[]` (each `name`, `jobTitle`, `worksFor`, `profileUrl`) · `recordingUrl` (url) · `series` | `podcast.*`; the recording link is the hero's "Watch the recording" line |
| tool | `tool`: `id` (string, the tool the front end mounts) · `mountAnchor` (the section it mounts in, always `workspace`) · `mode` · `processing` · `persistence` · `export` · `methodVersion` | `page_composition.tool` |
| author | the author record itself, § 6 | `structured_data.main_entity` |

---

## 3 · Block catalogue

Every section block has two common fields: **`anchor`** (string, required, the band id) and **`heading`**
(rich text, inline only, required). Fields below are in addition to those.

"Bands" counts sections across the 136 shipping pages. The roadmap's counts (FAQ 138, Enquiry 79…) included the 17
case studies; these do not.

| Block | Bands · pages | Holds | Front end |
|---|---|---|---|
| Hero | 136 · 136 | eyebrow, title, lede, actions, proof lines, media | PageHero |
| FAQ | 123 · 123 | question and answer pairs | Accordion + FAQPage schema |
| Enquiry | 62 · 62 | the section's words around the form; the form is the page's Form record | EnquiryForm close |
| Testimonials | 61 · 61 | references to Testimonial records | Proof (featured) |
| Selected work | 56 · 56 | references to case studies, each with this page's own write-up | CaseCard set |
| Why Tcules | 55 · 55 | shared intro + 3 numbered reasons, each with this page's evidence | Reasons |
| How we work together | 55 · 55 | this page's opening line + the shared engagement record | EngagementOptions |
| Industries | 54 · 54 | references to expertise pages | Industries band |
| What you get | 51 · 51 | outcomes list + three fixed terms | OfferSheet |
| Related reading | 65 · 46 | references to pages, each with an optional blurb | Teaser / ListCard |
| Comparison | 100 · 74 | one table (rows × columns) with optional lines around it | DataTable |
| Routes | 20 · 19 | references to sibling or child pages, as table rows | Bento grid |
| Client recognition | 7 · 7 | references to Client records | LogoGrid |
| Tool workspace | 6 · 6 | the section the tool mounts in | the tool itself |
| Rich section | 415 · 119 | heading + Markdown body + optional media | ContentSection (fallback) |

**Tool workspace** is the one block added to the agreed vocabulary: each tool page has exactly one section the
interactive tool mounts into, named by `tool.mountAnchor`. Its content is a Rich section; the block exists so the
front end can find the mount without reading the anchor string. If you would rather not add a component, a Rich
section whose `anchor` equals `tool.mountAnchor` works the same.

How a band was assigned to a block, so you can check any page: a band with a form is Enquiry; the ids `faq` /
`frequently-asked-questions`, `testimonials`, `why-tcules`, `selected-work` / `featured`, `how-we-work-together`,
`industries`, `client-recognition`, `related-reading` / `related-terms` name their block; a band with a bold
"What you receive" list is What you get; `services-on-their-own`, `routes`, `service-guide`, `choose`,
`product-types` are Routes; a listing page's groups of linked entries are Related reading; a band that is only
a table with up to two lines around it is Comparison; everything else is a Rich section.

### 3.1 Hero (shared component, not in the sections list)

| Field | Type | Req. | Evidence |
|---|---|---|---|
| `eyebrow` | rich text, inline | optional | 133 of 136 (the 3 legal pages have none) |
| `title` | rich text, inline | required | 136 |
| `lede` | rich text, repeatable paragraphs | required | 1 to 8 paragraphs |
| `actions` | repeatable: `label` (string), `href` (string: route, `#anchor` or url) | optional | 69 pages have one, 1 has two |
| `proofLines` | rich text, repeatable | optional | e.g. `*Selected work: Doodle · Auxentios · …*` on service pages |
| `studioFacts` | boolean → shows the shared **Studio facts** record | optional | **60 pages carry the identical line** "Founded 2017 · More than 90 projects · Clients in 19 countries · Studio in Ahmedabad, India" (all 51 offer pages, the 4 hubs, 5 one-offs). Store it once. |
| `media` | Media slot (§ 6) | optional | Not in the copy yet. Tier A needs it: an illustration on the 6 product-type pages, a sector photograph on the 6 industry pages. |

### 3.2 Section blocks: fields

**FAQ** — `intro` (rich, optional; 4 sections have one) · `items[]` (repeatable, required, 3 to 10): `question`
(string, required), `answer` (rich, lists allowed, required). Per page: **609 questions across 123 FAQ sections,
none repeated on two pages.**

**Enquiry** — `intro` (rich, optional) · `after` (rich, optional, e.g. contact's "Or email hello@tcules.com").
The form is the page's `conversion` Form record; the section stores only its own words. 62 sections, 62 different
intros: per page.

**Testimonials** — `intro` (rich, optional; 8 of 61 sections) · `testimonials` (relation → Testimonial, many, ordered,
required, 3 to 6: 31 sections hold 3, 24 hold 4, 5 hold 5, 1 holds 6) · `showPlatformRating` (boolean; the
"4.8 on Clutch from 13 reviews" line under the quotes is identical in all 59 sections that show it, so it comes
from the **Rating source** record, never typed per page).

**Selected work** — `intro` (rich, optional) · `cases[]` (repeatable, required; exactly 3 in all 56 sections): `case` (relation → Case
study, required except for a placeholder client, see § 0), `heading` (string, required), `body` (rich, required),
`linkLabel` (string, optional: "Read the Doodle case"), `media` (Media slot, optional) · `media[]` (slots that
support the section but no single case; home has two). **165 case write-ups, none repeated on two pages**: the
case is a reference, the words are the page's.

**Why Tcules** — `shared` (relation → **Why Tcules** record, required) · `reasons[]` (repeatable, exactly 3):
`reason` (relation → **Reason** record 1–7, required), `evidence` (rich, required) · `override` (rich, optional;
home only). Evidence in § 5.

**How we work together** — `intro` (rich, required; the page's opening line, 55 different on 55 pages) · `shared`
(relation → **How we work together** record, required) · `override` (rich, optional; home only). Evidence in § 5.

**Industries** — `expertise` (relation → expertise `offer-page`, many, ordered, 0 to 12) · `note` (rich,
optional; 5 sections hold only a note and no references). **40 different lists on 53 pages**: a per-page choice, not a shared record. 7 pages add a note, e.g.
"The review is new, so no industry has registered review work yet…" on `/audits/ai-product-ux-readiness`. All 12
expertise pages head it "Other industries we know"; the rest "Industries we know well". Home's `expertise` band is
this block.

**What you get** — `intro` (rich, required) · `items[]` (repeatable, required, 4 to 8): `title` (string,
optional; the bold claim where the copy has one), `body` (rich, required), `media` (slot, optional) ·
`whoDoesTheWork` (rich, required) · `whatWeNeedFromYou` (rich, required) · `whereOurPartStops` (rich, required) ·
`after` (rich, tables allowed, optional). **All 51 sections have the same structure**: a "What you receive" list,
then "Who does the work.", "What we need from you." and "Where our part stops.", in that order. Those four labels
are identical on all 51, so they are fixed labels in code, not fields. `after` carries what follows on some pages:
the 12 expertise pages' closing line, and on 6 audits the worked example finding with its table.

**Routes** — `intro` (rich, optional) · `rowHeader` (string, e.g. "Service") · `columns` (string list, e.g. "What
it covers", "Best for") · `rows[]` (repeatable, required, 4 to 12): `page` (route string, optional; empty for a row that is
this page or "Your own research team"), `label` (string, required), `cells` (rich list, one per column; empty
when the copy gives only links), `group` (string, optional: `/expertise` splits its rows into "By product type"
and "By industry", each with a short intro) · `after` (rich, optional). Used by `services-on-their-own` (5 L1 pages), `routes` (10 L2 pages), `service-guide`
(`/services`), `choose` (`/audits`), `product-types` and `services` (`/expertise`), `services` (`/matter-design-system`).

**Comparison** — `intro` (rich, optional) · `table` (required, exactly one per section: `columns` (string list),
`rows` (list of lists of rich cells; links allowed), 2 to 16 rows) · `after` (rich, optional). A page with several
tables in a row (`/case-studies` has four) has several Comparison sections. Store a table as JSON
`{ columns: string[], rows: string[][] }` or as a repeatable row component; either keeps the row header once
(`docs/strapi-changes.md` § 10).

**Related reading** — `intro` (rich, optional) · `entries[]` (repeatable, optional): `href` (route or url,
required), `label` (string, optional: the target page's own title is the default), `blurb` (rich, optional) ·
`after` (rich, optional). Some guides write related reading as one paragraph of prose with inline links: that is
`intro` with no entries. Listing pages use this block for each group of linked entries ("AI UX articles: …").
`href` rather than a relation because targets cross content types, including live blog posts.

**Client recognition** — `clients` (relation → Client, many, ordered, required, 7 to 24) · `label` (string,
optional). The copy's frontmatter `page_composition.client_recognition.clients` is the list; `/case-studies` names
its clients only in the band text.

**Tool workspace** — `body` (rich, tables allowed, required) · `media` (slots, optional; all 6 tools have one
`ASSET_REQUIRED` slot here).

**Rich section** — `body` (rich, required; `###` subheads, lists, tables and links allowed) · `media` (Media slots,
repeatable, optional). The fallback for every section that is not one of the kinds above.

---

## 4 · Templates: ordered slots

Required = every page of the template carries it. Optional = some do, with the count. "×n" = the most times the
block appears on one page.

**One closing run is identical on all 51 offer pages** (service L1, L2, audit, expertise):
`Testimonials > How we work together > Why Tcules > Industries > FAQ > Enquiry`. Only what precedes it differs.

### Service, level 1 (7) — example `cms-templates/service-l1.json` (`/services/product-design`)

| # | Slot | Block | Req. | Repeat |
|---|---|---|---|---|
| — | Hero | Hero | required | no |
| 1 | `selected-work` | Selected work | required 7/7 | no |
| 2 | `what-you-get` | What you get | required 7/7 | no |
| 3 | middle: page-specific | Rich section 7/7 (×2) · Comparison 4/7 · Routes (`services-on-their-own`) 5/7 | 1 to 4 sections | yes |
| 4–9 | closing run | as above | required 7/7 each | no |

Middle sequences seen: Rich > Comparison (2) · Rich > Routes (2) · Comparison > Rich > Routes · Comparison > Rich >
Rich > Routes · Rich > Rich > Routes. **Order: restricted dynamic zone** for the middle (allowed: Rich section,
Comparison, Routes); positions 1–2 and the closing run fixed.

### Service, level 2 (26) — example `service-l2.json` (`/services/product-design/ux-research`)

| # | Slot | Block | Req. | Repeat |
|---|---|---|---|---|
| — | Hero | Hero | required | no |
| 1 | `what-you-get` (or `scope`, `change-types`, `what-we-design`) | What you get | required 26/26 | no |
| 2 | `selected-work` | Selected work | required 26/26 | no |
| 3 | middle | Rich section 22/26 · Comparison 14/26 (×2) · Routes (`routes`) 10/26 | 1 to 2 sections | yes |
| 4–9 | closing run | | required 26/26 each | no |

Middle sequences: Rich > Comparison (10) · Rich > Routes (7) · Rich (5) · Comparison > Routes (3) · Comparison >
Comparison (1). Note L2 puts What you get **before** Selected work; L1 the other way round, on every page. **Order:
restricted dynamic zone** for the middle; the rest fixed.

### Audit / assessment (6) — example `audit.json` (`/audits/ux-product-audit`)

| # | Slot | Block | Req. |
|---|---|---|---|
| — | Hero | Hero | required |
| 1 | `deliverables` (`gap-map` on the prototype review) | What you get (with `after`: the worked example finding) | required 6/6 |
| 2 | `method` (`trace` on design-to-code) | Rich section | required 6/6 |
| 3 | `compare` | Comparison | required 6/6 |
| 4 | `selected-work` | Selected work | required 6/6 |
| 5–10 | closing run | | required 6/6 each |

Identical order on all 6. **Order: fixed** fits; a dynamic zone also works and keeps one model with services.
Audits also carry `method_governance` and, on one, `redirect_from` in frontmatter (`docs/cms-ready.md` § 1,
Governance).

### Expertise: product type (6) and industry (6) — examples `expertise-product-type.json`, `expertise-industry.json`

| # | Slot | Block | Req. |
|---|---|---|---|
| — | Hero | Hero (media: illustration for product type, sector photograph for industry) | required |
| 1 | `what-we-design` | Rich section (a list of the products, each with a case or a one-line promise) | required 12/12 |
| 2 | `selected-work` | Selected work | required 12/12 |
| 3 | `hard-parts` | Rich section (`###` subheads, tables) | required 12/12 |
| 4 | `what-you-get` | What you get | required 12/12 |
| 5–10 | closing run (Industries headed "Other industries we know") | | required 12/12 each |

Identical order on all 12. **Order: fixed.** Every expertise page also authors `why_tcules_reasons` (e.g.
`[1, 6, 4]`) in frontmatter, which is exactly the Reason references the Why Tcules block stores.

### Hub (4) — example `hub.json` (`/services`)

| Page | Sections in order |
|---|---|
| `/services` | Client recognition > Routes (`service-guide`) > Selected work > closing run |
| `/expertise` | Client recognition > Routes (`product-types`) > Selected work > Testimonials > How we work together > Why Tcules > Routes (`services`, in place of Industries) > FAQ > Enquiry |
| `/audits` | Routes (`choose`) > Rich section (`prototype`) > Selected work > closing run |
| `/case-studies` | Client recognition > Selected work (`featured`) > Comparison ×4 (cases by stage) > Testimonials > FAQ > Enquiry |

Required: Selected work, Testimonials, FAQ, Enquiry (4/4). Optional: Client recognition 3/4, Routes 3/4 (×2),
How we work together 3/4, Why Tcules 3/4, Industries 2/4, Comparison 1/4 (×4), Rich section 1/4. **Order:
restricted dynamic zone.** `/case-studies` here is the copy's curated index; the cards themselves still come from the
live case-study collection.

### Listing (8) — example `listing.json` (`/insights/articles`)

| Page | Sections in order |
|---|---|
| `/insights` | Related reading ×5 (by problem) > Comparison (`formats`) > FAQ > Rich section (`talk`) |
| `/insights/articles` | Comparison (`which-article`) > Related reading ×5 > FAQ > Rich section (`talk`) |
| `/insights/guides` | Comparison > Related reading ×5 > FAQ > Rich section |
| `/insights/podcasts` | Comparison > Related reading > FAQ > Rich section |
| `/insights/events` | Rich section (`sessions`) > FAQ > Rich section |
| `/tools` | Related reading > Comparison > Related reading ×3 > FAQ |
| `/glossary` | Rich section (`how-to-use`) > Related reading ×5 > FAQ |
| `/insights/authors` | Related reading (`writers`), derivable from the Author collection |

Required: none on all 8. Related reading 7/8 (×5), FAQ 7/8, Rich section 6/8 (×2), Comparison 5/8. **Order:
restricted dynamic zone** (allowed: Related reading, Comparison, Rich section, FAQ). Each group's entries are
written for this page ("What an AI-built app must answer…"), so they are entries with a blurb, not an automatic
feed.

### Article (12), guide (10), podcast (2) — examples `article.json`, `guide.json`, `podcast.json`

| # | Slot | Block | Article | Guide | Podcast |
|---|---|---|---|---|---|
| — | Hero | Hero (byline built from `editorial`) | 12/12 | 10/10 | 2/2 |
| 1… | body | Rich section (×1 to ×11) and Comparison (×0 to ×5), in any order | 12/12 · 10/12 | 10/10 · 9/10 | 2/2 · 2/2 |
| n−1 | `faq` | FAQ | required 12/12 | required 10/10 | required 2/2 |
| n | `related-reading` | Related reading | required 12/12 | optional 8/10 | required 2/2 |

FAQ is always second-last or last; Related reading, where present, always last. Two guides end on a Rich section
after the FAQ (`how-we-measure-up`, `how-to-choose-a-product-design-agency`). **Order: restricted dynamic zone**
for the body (Rich section, Comparison); FAQ and Related reading fixed at the end, except allow a Rich section
after FAQ.

### Glossary term (19) — example `glossary-term.json` (`/glossary/design-system-drift`)

| # | Slot | Block | Req. |
|---|---|---|---|
| — | Hero | Hero (eyebrow "Glossary · <Term>", the definition is the lede) | required |
| 1… | body | Rich section (×1 to ×5), Comparison (×1 to ×2) | Rich 19/19 · Comparison 17/19 |
| n−2 | `related-terms` | Related reading | optional 9/19 |
| n−1 | `faq` | FAQ | required 19/19 |
| n | `next` | Rich section (one paragraph and a link to the tool or service) | optional 18/19 |

**Order: restricted dynamic zone** for the body; the last three fixed.

### Tool (6) — example `tool.json` (`/tools/design-system-drift-checker`)

| # | Slot | Block | Req. |
|---|---|---|---|
| — | Hero | Hero (action "Open the checker" → `#workspace`) | required |
| 1… | body | Rich section (×4 to ×7), Comparison 2/6 | required |
| k | `workspace` | Tool workspace | required 6/6, one per page, position varies (2nd to 4th) |
| n | `faq` | FAQ | required 6/6, always last |

**Order: restricted dynamic zone** (Rich section, Comparison, Tool workspace), FAQ last.

### Author (8) — example `author.json` (`/insights/authors/varun-mashru`)

Hero (eyebrow "Insights · Authors", title "<Name>, <Role> at Tcules", role line, a 1–2 paragraph bio) and one
section, `articles`: the author's pieces. **Derive that list** from insights whose `editorial.authors` include the
author rather than storing it twice; the copy's `structured_data.has_part_routes` is the same list. No dynamic zone.

### Legal / policy (4) — example `legal.json` (`/privacy-policy`)

Rich section ×5 to ×12, in document order. `/how-we-work/ai-transparency` ends with an FAQ (1/4). The three legal
pages author no band ids and no eyebrow. **Order: one dynamic zone** of Rich section and FAQ.

### One-off pages (12) — example `one-off.json` (`/`, home)

Each is one page; use the `page` type with every block allowed, in the authored order.

| Page | Sections in order |
|---|---|
| `/` home | Client recognition > Rich (`product-situations`) > Rich (`product-design`) > Selected work > Why Tcules (override) > Testimonials > How we work together (override) > Rich (`people`) > Rich (`ai-native-practice`) > Rich (`insights`) > Industries (`expertise`) > FAQ > Enquiry |
| `/about` | Rich ×5 (`what-we-do`, `difference`, `who-uses-tcules`, `leadership`, `how-we-work`) > Comparison (`company-record`) > Testimonials > FAQ > Rich (`work-with-tcules`) |
| `/contact` | Enquiry (first) > Rich (`brief`) > Rich (`next-steps`) > Testimonials > Rich (`confidentiality`) > FAQ |
| `/why-tcules` | Client recognition > Rich ×3 (`principles`, `signature-work`, `studio`) > Comparison (`alternatives`) > Testimonials > FAQ > Enquiry |
| `/how-we-work` | Client recognition > Rich ×6 (`engagement-shapes` … `essentials`) > Testimonials > FAQ > Enquiry |
| `/clients` | Client recognition (15 clients) > Rich (`product-responsibility`) > Comparison (`client-list`) > Testimonials > Rich ×2 > FAQ > Enquiry |
| `/careers` | Rich ×6 (incl. `open-roles`) > FAQ > Rich (`apply`) |
| `/future-interfaces-lab` | Rich ×6 > FAQ > Rich (`join`) > Rich (`talk`) |
| `/future-interfaces-lab/join` | Rich ×5 > FAQ > Rich (`artefact-access`) |
| `/matter-design-system` | Rich ×3 > Routes (`services`) > FAQ > Enquiry |
| `/how-we-work/ai-native-product-design` | Comparison ×2 > Rich ×4 > FAQ > Enquiry |
| `/sitemap` | Rich ×13 (link lists). Generate, do not author (Q8). |

Careers' `open-roles` holds the four current openings as `###` items; the copy records a jobs source and a
verified date (`page_composition.jobs_source`, `openings_verified_on`). If roles change often, a Job collection
is worth it (Q9).

---

## 5 · Shared records: store once, reference from many pages

Decided by comparing the actual text across pages.

| Record | Evidence | Model |
|---|---|---|
| **How we work together** | 55 sections. After the page's own first line, **54 of 55 are word-for-word identical**: "Bring what you have…", the three options (A focused engagement · A defined project · An ongoing partnership), "We can stop at designs your engineers build…", "Our studio is in Ahmedabad…", and the links "How we work together · Tell us what you're working on". The first line is different on all 55 ("For UX research, a good first piece of work is…"). Home differs throughout (its options read "A focused problem or assessment…", "An ongoing product relationship…", and it has no studio paragraph). | Single type: `lead` (rich), `options[]` (`name`, `body`), `scope` (rich), `location` (rich), `links[]`. The block stores the page's `intro` and a reference; home uses `override`. |
| **Why Tcules** | 55 sections. The opening paragraph ("Product designers, design engineers and developers work side by side…") and the closing links ("Why teams choose Tcules · Meet the studio") are **identical on 54 of 55**. Every one of the 54 has exactly 3 reasons, and the reason titles come from **a set of 7** (uses: 33, 31, 30, 29, 24, 8, 7). The evidence under each title differs: 49 different reason sets on 54 pages. Home is its own (heading "A product design partner for ambitious SaaS teams", three titled items). | Single type `why-tcules` (`intro`, `links[]`) + collection **Reason** (`number` 1–7, `title`). The block stores 3 × (`reason`, `evidence`). |
| **Reason** (the 7) | The copy already numbers them: `why_tcules_reasons: [1, 6, 4]` on 15 pages, matching titles exactly. 1 "We work out what the product has to know before we draw it." · 2 "We know what to leave alone in a product people rely on." · 3 "We prove the hard parts in code while they can still change." · 4 "One studio can take it into working software, with the designers staying in the build." · 5 "We design AI that people can check and correct." · 6 "Senior people do the work, and clients keep us for years." · 7 "We tell you what is really wrong." (3 is inferred: it is the only title never numbered.) | Collection, 7 entries. |
| **Studio facts** | The hero line "Founded 2017 · More than 90 projects · Clients in 19 countries · Studio in Ahmedabad, India" is identical on 60 pages (and in `/contact`'s next steps). The copy marks it `institutional_trust: founded_2017, projects_90plus, client_countries_19, studio_ahmedabad` with "reconfirm at publication". | Single type: `founded`, `projects`, `clientCountries`, `studio`, and the display line. Hero `studioFacts: true`. |
| **Rating source** | "**4.8 on Clutch** from 13 reviews. Read the reviews" is identical in 59 Testimonials sections. Frontmatter: snapshot 8 Oct 2026, gate `REVERIFY_LIVE_RATING_AND_COUNTS`. | Collection (`docs/cms-ready.md` § 2): `platform`, `score`, `scale`, `reviewCount`, `url`, `snapshotDate`. Testimonials `showPlatformRating: true`. |
| **Form: project enquiry** | 63 pages name `project_enquiry`. Submit label "Send enquiry" and success copy ("Your enquiry has reached us." / "We'll reply within one business day.") identical on 63/63; fields (Email · What are you working on? · Product or company URL, optional) identical on 60/63. The other 3 (`/services/design-systems`, `/matter-design-system`, `/how-we-work/ai-transparency`) list no fields: an omission in the copy, not a different form. | Collection **Form**: `key` (`project_enquiry`), `visibleFields[]` (`label`, `optional`), `submitLabel`, `hiddenContext[]`, `onSuccess` (`heading`, `body`, `retainEnteredData`), `processor`, `schedulingLabel`. The page's `conversion` references it; `anchor` stays on the page. |
| **Form: newsletter** | `insights_newsletter`, identical on all 20 long-form pages that carry it: Email only, explicit opt-in checkbox, "Subscribe", success "You are subscribed". | Same Form collection, key `insights_newsletter`, plus `consent`. |

**Not shared, though they look it:**

- **Industries** is a per-page selection (40 different lists on 53 pages), so it is references to expertise
  pages, not one record.
- **FAQ**: 609 questions, none on two pages.
- **Selected work**: 165 case write-ups, none on two pages. The case is shared (a reference); the words are not.
- **Enquiry** section words: 62 different intros on 62 pages.

---

## 6 · Collections

| Collection | Entries | Fields (type) | Notes |
|---|---|---|---|
| **Case study** (existing) | 20 live | existing model: `title`, `slug`, `description`, `heroImage`, `thumbnail`, `profile`, `statement`, `caseStudyContents` … Recommended additions already logged: `client` (relation → Client, or short text until it exists) and a one-line `description` of 8–15 words (`docs/strapi-changes.md` § 13); `cover` / `banner` (`docs/strapi-changes.md` § 5). | Unchanged for launch. Selected work references it by **live** slug. |
| **Testimonial** | 57 ids, 219 references | `testimonialId` (uid, e.g. `DRAFT-CONNECTX-GHOSHAL`) · `quote` (rich, paragraphs) · `speaker` (string, required) · `role` (string, optional) · `company` (string) · `client` (relation → Client) · `rating` (decimal 0–5 in halves, optional) · `ratingSource` (enum `clutch` · `upwork` · `google` · `direct`) · `portrait` (media, optional, with a consent flag) · `pendingSignoff` (boolean) | Fields per `docs/cms-ready.md` § 2 and `docs/strapi-changes.md` § 4, § 11. Id prefixes in use: DRAFT- 35, FP- 11, SSOT- 5, CL- 3, UW- 2, CLUTCH- 1. **Clean-up needed before import, see § 9.** |
| **Client** | 24 named across the client strips | `name` (string, required) · `logo` (media: single-colour SVG, with `width`, `height`, `weightCorrection`) · `caseStudy` (relation, optional) · `logoRights` (boolean) | Names in use: Benchmark Gensuite, ConnectX, Eden AI, Dealpath, Doodle, GT Tools, BuildTwin, Ryzeo, Gold Image Printing, Auxentios, Omny AI, Novus Insights, Ringier Media Switzerland, JoVE, CuramCare, The Chain Hut, Scissors, The Wandering Raven, Vovisto, Primelis, OctiFi, TreadCommand, Knovos, and "Merchant payments client" (an anonymised client: name only, never a logo). The copy's rule: "Approved logo rights required; otherwise render accurate client names as text". A client with no logo renders its name. |
| **Author** | 8 | `name` · `slug` · `jobTitle` · `bio` (rich, 1–2 paragraphs: the hero lede) · `portrait` (media; `IMAGE_ASSET_REQUIRED` on all 8) · `knowsAbout` (string list) · `linkedin` (url, optional) · plus the envelope (SEO, breadcrumb) | The author page renders from the record; the article list is derived. All 8 author at least one of the 24 copy insights (Yash Bhatt 9, Jatin Leuva 6); 2 guides have two authors. |
| **Expertise** | 12 | The expertise `offer-page` entries themselves. | Industries references them; no separate record. |
| **Service** | 33 services + 6 audits | The service and audit `offer-page` entries themselves, with `level` and `parent`. | Routes rows and links point at them by route. |
| **Media asset** | see below | `file` · `alt` · `kind` (enum `capture` · `cut-out` · `illustration` · `photograph`) · `panel` (cut-outs) · `shadow` (cut-outs) · `focalPoint` | `docs/strapi-changes.md` § 3, § 7, § 9. |
| **Media slot** (component, not a collection) | 162 slots on shipping pages | `id` (string) · `role` (string: `demonstrate` 151, `proof`, `people`…) · `asset` (relation → Media asset, empty when not supplied) · `assetUri` (url, for an asset not yet in the library) · `altIntent` (text) · `status` (enum below) · `source` · `caption` · `attribution` · `card` (which case it belongs to, Selected work only) | Lives inside the block it supports (the copy's `supports_section`). |

**Media slot `status`** (enum, the copy's values; `CorpusMediaStatus` in `corpus-types.ts`):

| Status | Slots | Meaning |
|---|---|---|
| `BOUND_EXISTING_PUBLIC_ASSET` | 114 | Has a real URL. Use it. |
| `SATISFIED_BY_EXISTING_ASSET` | 1 | Names an asset bound elsewhere. |
| `SCREEN_REQUIRED` | 27 | A product screen is needed (mostly Selected work cards with no screen). |
| `IMAGE_ASSET_REQUIRED` | 10 | An image is needed. Also the value of `og_image` on 85 pages and every author portrait. |
| `ASSET_REQUIRED` | 10 | An asset is needed (all 6 tool workspaces, plus 4 more). |

A slot whose status is not `BOUND_…` renders a labelled placeholder, so the status must be stored, not inferred
from an empty URL.

---

## 7 · Matrix: template × block

✓ required (every page of the template) · ○ optional (some pages; count in brackets) · — never.

| Template (pages) | Hero | Client recog. | What you get | Selected work | Routes | Comparison | Rich section | Tool workspace | Testimonials | How we work together | Why Tcules | Industries | Related reading | FAQ | Enquiry |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Service L1 (7) | ✓ | — | ✓ | ✓ | ○ (5) | ○ (4) | ✓ | — | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ |
| Service L2 (26) | ✓ | — | ✓ | ✓ | ○ (10) | ○ (14) | ○ (22) | — | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ |
| Audit / assessment (6) | ✓ | — | ✓ | ✓ | — | ✓ | ✓ | — | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ |
| Expertise: product type (6) | ✓ | — | ✓ | ✓ | — | — | ✓ | — | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ |
| Expertise: industry (6) | ✓ | — | ✓ | ✓ | — | — | ✓ | — | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ |
| Hub (4) | ✓ | ○ (3) | — | ✓ | ○ (3) | ○ (1) | ○ (1) | — | ✓ | ○ (3) | ○ (3) | ○ (2) | — | ✓ | ✓ |
| Listing (8) | ✓ | — | — | — | — | ○ (5) | ○ (6) | — | — | — | — | — | ○ (7) | ○ (7) | — |
| Article (12) | ✓ | — | — | — | — | ○ (10) | ✓ | — | — | — | — | — | ✓ | ✓ | — |
| Guide (10) | ✓ | — | — | — | — | ○ (9) | ✓ | — | — | — | — | — | ○ (8) | ✓ | — |
| Podcast (2) | ✓ | — | — | — | — | ✓ | ✓ | — | — | — | — | — | ✓ | ✓ | — |
| Glossary term (19) | ✓ | — | — | — | — | ○ (17) | ✓ | — | — | — | — | — | ○ (9) | ✓ | — |
| Tool (6) | ✓ | — | — | — | — | ○ (2) | ✓ | ✓ | — | — | — | — | — | ✓ | — |
| Author (8) | ✓ | — | — | — | — | — | — | — | — | — | — | — | ✓ (derived) | — | — |
| Legal / policy (4) | ✓ | — | — | — | — | — | ✓ | — | — | — | — | — | — | ○ (1) | — |
| One-off (12) | ✓ | ○ (4) | — | ○ (1) | ○ (1) | ○ (4) | ✓ | — | ○ (6) | ○ (1) | ○ (1) | ○ (1) | — | ○ (11) | ○ (7) |

---

## 8 · Ordering: fixed or dynamic zone

**Recommendation: one restricted dynamic zone per content type, holding every section in order, each with its
`anchor`.** Strapi keeps dynamic-zone order, so the order the editor sees is `band_order`, stored once.

- Where order never varies (audits 6/6, expertise 12/12), a fixed order would also fit. A dynamic zone costs nothing
  there and keeps one model for all 51 offer pages, which share their components.
- Where it varies (service middle sections, hubs, listings, long-form bodies, tools), a fixed order cannot store
  what the copy says.
- **Enforce the required blocks with validation**, not with the schema: a dynamic zone cannot require a component.
  A lifecycle hook (or a pre-publish check) per template: offer pages must end with the closing run in order; FAQ
  required on offer, long-form, glossary and tool pages; exactly one Tool workspace on a tool; and so on, from § 4.
- Allowed components per content type: offer-page = What you get, Selected work, Routes, Comparison, Rich section,
  Testimonials, How we work together, Why Tcules, Industries, FAQ, Enquiry. hub-page = those plus Client
  recognition. listing-page = Related reading, Comparison, Rich section, FAQ. insight / glossary-term = Rich
  section, Comparison, Related reading, FAQ. tool = Rich section, Comparison, Tool workspace, FAQ. legal-page = Rich
  section, FAQ. page = all.

---

## 9 · Problems in the copy to fix on import

1. **Testimonial ids do not always mean one quote.** Of 57 ids, 43 carry one text everywhere. The other 14 do not:
   - **Same speaker, different words under one id** (split into separate records): `CL-KNOVOS-CANDOUR` and
     `DRAFT-KNOVOS-CANDOUR` hold the same two Knovos quotes in swapped proportions (merge to two ids, one per
     quote); `DRAFT-CONNECTX-SCENARIOS` (8 pages one quote, home another); `FP-GOLDIMAGE-NAVIGATION` (2 + 2);
     `SSOT-RUSSELL-MILER-COO-RYZEO` (2 + 1); `SSOT-TREADCOMMAND` (1 + 1); `FP-DOODLE-EFFICIENCY` (3 + 1);
     `DRAFT-CONNECTX-GHOSHAL` (punctuation only).
   - **Ids listed in a different order from the quotes on the page**, so the id lands on the wrong speaker:
     `/expertise` (Novus ↔ CuramCare) and `/services/design-engineering` (Gold Image ↔ CuramCare). Fix the page's
     `testimonial_ids` order.
   - **14 quotes have no id**: 5 on `/case-studies`, 5 on `/clients`, 4 on
     `/services/product-design/interaction-ui-design`. They need ids before they can be references.
   - Typography only (straight vs curly quotes, bold attribution): `FP-EDEN-USERS`, `CL-RINGIER-COLLAB`,
     `DRAFT-PRIMELIS-TEAM`. Normalise; same record.
2. **3 pages name the enquiry form with no fields** (`/services/design-systems`, `/matter-design-system`,
   `/how-we-work/ai-transparency`). Point them at the shared Form record.
3. **11 cases are cited by planned slugs** (272 references). Store live slugs (§ 0).
4. **CuramCare and Vovisto** are cited as case work with no case page (Selected work and comparison rows).
5. **No enquiry endpoint exists.** The copy says `processor: cms_record_and_notify`; the site posts to
   `/api/enquiry`, which is not served (`docs/cms-ready.md` § 5.4). Who receives the record, and where, is open.

---

## 10 · Open questions

**For Mihir**

- **Q1 · BLOCKING.** Dynamic zone per content type with lifecycle validation (§ 8), or fixed fields where order is
  identical (audits, expertise)? The recommendation is the dynamic zone everywhere.
- **Q2 · BLOCKING.** Rich text storage: Markdown string (the site's parser reads it today) or Strapi's Blocks editor
  (then the seam needs a Blocks → runs mapper). Links must survive either way.
- **Q3 · BLOCKING.** Do the 24 copy insights (articles, guides, podcasts) go into the existing blog model beside the
  ~70 live posts, or a new `insight` type? Listing pages and author pages need to read both.
- **Q4.** Tables in Comparison and Routes: JSON field or repeatable row components?
- **Q5.** Related reading and Routes targets as route strings (proposed, because they cross content types and
  include live blog posts) or polymorphic relations?
- **Q6.** Where does the enquiry record go on submit (`cms_record_and_notify`), and who is notified?

**For the owner**

- **Q7 · BLOCKING for import.** The testimonial clean-up in § 9.1: confirm which quote each split id keeps, and give
  ids to the 14 unlabelled quotes. Are DRAFT- quotes cleared to publish at launch?
- **Q8.** Sitemap: generate it from the routes (proposed) or author it as the copy does?
- **Q9.** Careers openings: keep them as text in the page, or a Job collection?
- **Q10.** Hero media for the 12 expertise pages (illustration / sector photograph) is not in the copy. Confirm it is
  a design asset supplied by the studio, stored as the hero's media slot.
- **Q11.** The Tool workspace block (§ 3): add it, or use a Rich section matched by `tool.mountAnchor`?
