# Page mapping — `_pages` corpus, pass 1

**Status:** the builders' design document for the ten first-level pages, 10 Oct 2026, branch
`feat/pages-pass-1`. The owner judges the **built pages in the browser**, not this document (owner,
10 Oct: "i wouldn't be able to make judgements on the mapping document"). Critics review this; the
builders follow it.

**Inputs read in full:** the ten source files; `docs/kit/visual-direction.md` (incl. the 7 Oct and
9 Oct owner rulings at its top); `docs/kit/review-7-oct.md`; `docs/kit/references.md` (headings and
the conflict sections); `docs/component-audit.md` § 4 and § 6; `docs/service-pages-design.md`; the kit
showcases under `src/app/design/kit/**`; the owner rulings in memory (ui-kit-direction, review-7-oct
outcome, keep-what-was-approved, fix-causes-not-notes, illustration standard, brand imagery,
content-narrative-is-fixed, job-is-not-a-component); every pattern's props as they are in the code
today.

**Companion files written in the same pass:** `docs/content-proposals.md` (19 proposals after the critic pass) and
`docs/image-register.md` (every placeholder slot). Section 8 indexes both. A critic pass the same day edited this sheet in place and added P18–P19, three register rows and one ratio change; section 10 lists every change.

---

## 0 · The rules this document never bends

1. **Copy.** Every word in a source file renders, in its order. No rewording, no trimming, no
   paraphrase. Punctuation that a component draws itself (a quote's marks, a list's bullets) may
   replace the authored glyph, never both. `comment` blocks never render. Labels follow one rule
   on every page (critic, so every builder does the same thing):
   - a bold label's trailing **colon** is not rendered when the label becomes a title above its
     body ("**The approved design:**" → title "The approved design"), because the title/body
     structure now does the colon's job;
   - a label's trailing **full stop or comma** stays in the title ("The problem.", "Every
     difference we found,");
   - a body that starts lower-case mid-sentence (a run-in: "dealing with complex workflows…",
     "find out how people…") renders lower-case. Nothing is capitalised. P18 asks the content team
     about run-ins;
   - a lone link line's closing full stop is not rendered when that link becomes a button.
2. **Band order** is `render.band_order`, which is also document order. Nothing is reordered,
   merged or dropped.
3. **Allowed.** Split one band into two consecutive sections. Change how an item is **shown**: a
   table as cards, a list as a diagram, labelled paragraphs as tiles, a run of case names as case
   cards, a quote moved to the end of its band. Re-lay content inside a band, keeping every word.
   A split's second part keeps the reading order: it follows the first.
4. **Content that pulls the design down** gets a proposal in `docs/content-proposals.md`, never an
   edit. The page renders the copy as written in the meantime, even when that means a fold
   overrun. Section 7 lists the overruns we expect, so a red `fold:check` on those bands is a known
   cost and not a build fault. The builders never shrink a gap, a type step or a lead to make a
   band fit (visual-direction § 1.3).
5. **Images.** Decided in this order, first match wins:
   1. a `media_bindings` asset with `bound: true` that supports this band;
   2. **a case's cover:** wherever a case is cited, the case page's own first bound asset. Each
      case file binds its artefacts, so it is a pre-existing image the corpus already points at;
   3. **a studio photograph the corpus binds elsewhere** (`about_studio_review`,
      `about_work_wall`), only where this document names the reuse and the slot's subject is
      "Tcules people at work". visual-direction § 5.1 rule 4 lets studio photos recur across
      pages. The builder checks the § 5.4 resolution rule (crop ≥ 1.9× the box). If it fails, the
      slot becomes a placeholder and the builder adds a row to the register;
   4. otherwise, a **labelled placeholder** (§ 5, G5) and a row in `docs/image-register.md`.
   - Kit catalogue photographs (`public/kit/photos`, `getKitPhoto`) are **not used**: nothing in
     the corpus points at them.
   - One deliberate exception: `/services/product-design` keeps its existing service-line
     illustration (`public/illustrations/services/product-design.paper.svg`, with its cut legend).
     It is the page's own live hero asset and was owner-approved in the kit, so
     keep-what-was-approved applies. The register also carries the illustration the content
     team's visual plan asks for, as its replacement.
6. **Kit pieces are locked.** Compose them. Extend one only with the smallest prop the job needs
   (section 6). Never restyle one.
7. **Eyebrow vs. crumb.** Six hero eyebrows repeat a crumb, against the owner's 5 Oct ruling.
   Copy wins, so they render as written, PageHero's development warning fires, and proposal P1
   asks the content team to change them. The builders do not call `eyebrowBesideTrail` on corpus
   pages, because it would drop authored words.

---

## 1 · Architecture

### 1.1 Templates

| Template | Status | Serves (this pass) | Serves later (same template, no new layout) |
|---|---|---|---|
| `CorpusPage/HomePage` | new | `/` | — (one page type, one page) |
| `CorpusPage/AboutPage` | new | `/about` | — |
| `CorpusPage/OfferPage` | new | `/services/product-design`, `/audits/design-to-code-audit`, `/expertise/healthtech` | all 33 service pages (6 lines + 27 specialist), the 6 audits, the 12 expertise pages: **51** |
| `CorpusPage/LongformPage` | new | `/case-studies/benchmark-gensuite-…`, `/insights/cpq-ux-design`, `/glossary/design-system` | the 16 new-format cases, 29 insights, 19 glossary terms: **64** |
| `CorpusPage/ToolPage` | new | `/tools/design-system-drift-checker` | the 6 tools |
| `CaseStudyIndex` | **reused, extended** (G9) | `/case-studies` | — |
| `ServicePage` | **not reused** | — | stays as the kit's proving ground at `/design/service-page/*` |

**Why one `CorpusPage` folder with five exports rather than five folders.** The five share one
vocabulary of corpus-block renderers (labelled run → tiles, quote → Proof, table → DataTable, form →
EnquiryForm…). CLAUDE.md forbids a sideways import between template folders, and the renderers
cannot live in `src/lib` (it may not import patterns) or in `src/patterns` (a pattern may not know a
corpus type). One folder with internal modules (`blocks.tsx`, `plan.ts`) is how ServicePage already
solved the same problem (`Bands.tsx`, `Blocks.tsx`, `plan.ts`). Each export is a whole page type.

**Why ServicePage is not reused for `/services/product-design`.**
1. It takes a `ServiceStory`, an authored design shape whose copy was rewritten to the § 1.5 budgets.
   Corpus copy is fixed and does not fit those blocks.
2. `planBands` assigns catalogue stock photographs by slug (`SERVICE_PHOTO_SLOTS`). Pass 1 uses
   none.
3. It inserts template-authored bands (K offer, I banner, J statement) that the corpus does not
   have.

OfferPage's `plan.ts` re-implements its page rules: centred-head adjacency, tint adjacency, the
`textHeavy` / `textHeavyPairs` warning and the DRAWN set. It cites ServicePage's `plan.ts` and does
not import it. Extracting the shared checks to `src/lib/band-rhythm.ts` is a follow-up, so pass 1
does not edit an approved template.

**Why CaseStudyIndex is extended rather than replaced.** It *is* the case-study index page type,
and it already composes the featured BlockCardSet the corpus's "Four to start with" needs. What it
lacks is grouped sections, a hero action and a form close (G9). Its props stay corpus-blind: the
route maps the corpus onto them.

### 1.2 Routes (pass 1 switches only these ten)

| Route file | Change |
|---|---|
| `src/app/page.tsx` | `getCorpusPage('/')` → `HomePage` |
| `src/app/about/page.tsx` | → `AboutPage` |
| `src/app/services/[...slug]/page.tsx` | `product-design` → `OfferPage`; every other slug unchanged |
| `src/app/audits/[slug]/page.tsx` | `design-to-code-audit` → `OfferPage` |
| `src/app/expertise/[slug]/page.tsx` | `healthtech` → `OfferPage` |
| `src/app/case-studies/[slug]/page.tsx` | `benchmark-gensuite-enterprise-suite-modernisation` → `LongformPage family="case"` |
| `src/app/case-studies/page.tsx` | → `CaseStudyIndex` (extended), mapped from the corpus |
| `src/app/tools/[slug]/page.tsx` | `design-system-drift-checker` → `ToolPage` |
| `src/app/insights/[...slug]/page.tsx` | `cpq-ux-design` → `LongformPage family="article"` |
| `src/app/glossary/[slug]/page.tsx` | `design-system` → `LongformPage family="term"` |

Gate each dynamic route with one allowlist (`PASS_1_ROUTES` in the route module) so the 86 unverified
corpus pages do not switch silently. `generateMetadata` reads `seo` (title, description, canonical,
robots) and `ogImageAlt`. `og_image` is `IMAGE_ASSET_REQUIRED` on most pages and is out of scope.

### 1.3 Foundation additions the builders need first

- **G7, corpus types where a template can see them.** Move or re-export the view-model types from
  `src/content/corpus-types.ts` into `src/lib/corpus-types.ts`, with `@/content` re-exporting
  them. A template may not import `@/content`. This is the same move `src/lib/service-story.ts`
  made.
- **G6, `inlineToHtml(runs)`** in `src/lib/inline.ts`, for the four patterns whose rich slots take
  trusted HTML: Accordion `answerHtml`, DataTable `cellsHtml`, Proof `quoteHtml` and Callout /
  Prose `html`. `renderInline` stays the renderer for ReactNode slots (`ContentSectionText`,
  PageHero `children`).
- **G13, quote attribution parsing** (`src/lib/attribution.ts`): `"Name, Role…, Company"` →
  `{ name, role, company }` (first / middle / last; the middle may itself hold commas: "Director,
  Product Management"). About's two-line form (name, then "Role, Company") folds to the same
  shape.
- **G12, glyph maps** (`src/lib/glyphs.ts`): route → IconName for the icon routers (services,
  product-design specialist services, expertise sectors) and a named map for HealthTech's personas.
  It starts from the kit's choices (`kit/home`: product design `ruler-pen`, design systems `layers`,
  AI product UX `stars`, design engineering `monitor`, software development `database`, product
  modernisation `shield-check`).
- **Form endpoint.** No live enquiry endpoint exists, and `FORM_ENDPOINT_VERIFICATION` is a release
  dependency on every page. Name `ENDPOINTS.enquiry` (`/api/enquiry`, not served yet) in
  `src/lib/routes.ts` and post there.
- **Routes.** `ROUTES.healthtech` is `/expertise/healthtech-care`, but the corpus route is
  `/expertise/healthtech`. Correct the name in `src/lib/routes.ts`. Corpus links are content and
  pass through `renderInline` as authored. `routes.ts` governs only the paths the code itself builds
  (trails, case-cover lookups via `caseStudyPath`).

---

## 2 · Shared mappings (one content shape → one component, everywhere)

Every page section below refers to these by **M-number**. A page departs only where its row says
why.

| # | Content shape (corpus) | Component and arrangement | Notes |
|---|---|---|---|
| **M1** | **Hero:** eyebrow line, h1, lede, link-only asks, proof lines | `PageHero`: `trail` = `heroTrail(navigation.breadcrumb)` + `Breadcrumbs` (none on `/`); `eyebrow` = the italic line verbatim; `title` = `titleText`; `body` = lede paragraphs; `actions` = `hero.actions` (the first is the page's one blue solid; no ghost is invented, because none is authored). **Proof lines, two forms:** a bare run of facts split by " · " with no label (home's studio record) → **`tags`**, one tag per fact, which is the hero's bulleted label (§ 3.8 "a hero's facts") and renders after the actions, as authored; a line that opens with a label ("Selected work: …") → **`children`** (the extras row: one quiet line, `renderInline`), which renders above the actions — a re-lay inside the band, words unchanged. `tags` only where the title holds 3 lines. | Arrangement per page: an illustration hero is `beside`; a page with no hero image is `stacked` with `texture` (the end-fade). A hero with more than one lede paragraph keeps at most two and splits the rest into the next band (rule 3). |
| **M2** | **Enquiry band** (`enquiry`: heading, lead, form block or `conversion`) | `CtaSection` **split** (the L close), `id="enquiry"` (ANCHORS), `body={[lead]}`, `form=<EnquiryForm variant="enquiry">`. Fields from `conversion.visibleFields`: Email · What are you working on? · Product or company URL (optional). Submit label from "**Submit:**". The success view takes `conversion.onSuccess` (G2). | Tint, unless the band above is tint (two tints never touch, 9 Oct). The "After sending" line is the success body, not a second caption. A scheduling link appears only where `conversion.schedulingLabel` is set (the case: "See available times"). No eyebrow, because none is authored. Hidden context: `family` = pageType, `serviceOrAudit` = slug. |
| **M3** | **Close with a link and no form** | Copy with **no** inline links → `CtaSection open`: heading, `body=[para]`, the link as `actions[0]` (the page's one solid). Copy **with** inline links → `ContentSection` on tint + `ContentSectionText` + `CtaRow rule={false}` (link button). | CtaSection's `body` is strings, and inline links must survive. |
| **M4** | **FAQ band** | D-faq: `ContentSection align="center"` + `Accordion` (question h3; `answerHtml` = `inlineToHtml`). | Paper. FAQ sits directly before the close on most pages, which breaks the § 3.3 rule that a D-faq is followed by an image band and then the close. The narrative is fixed, so this is accepted everywhere and is not a proposal. |
| **M5** | **Quotes-only band** | G slider: `ContentSection align="center"` (heading, lead) + `Slider perView={1} align="center" autoplay` of `Proof` display quotes (G·02, the owner's favourite) + no rating. | Tint. Also used for About's testimonials. |
| **M6** | **A set band ending in a client quote** (cases + quote, outcomes + quote) | Short enough to fit: the quote stays as `Proof arrangement="compact"`, a `stack` under the set. Too tall: **split**. Part 1 is the set; part 2 is the quote alone as G typographic (`Proof` display, centred, no heading) on tint. | The split is the cure for "too much in one place" that keeps every word. It recurs on product-design `complex-products` and audit `proof`. |
| **M7** | **A quote inside a case story** (h3 case, paragraph, quote) | `Proof compact` in the case's copy column, after the paragraphs | "The work first, then what the client said" (1 Oct). Never with a rating. |
| **M8** | **Case reference** (a labelled `**Client.**` paragraph, a link line, or an h3 case) | Case card: `BlockCardSet lead="none"` of `BlockCard`s with the case's cover (rule 5.2), `title` = the case name as authored, `body` = the rest. Linked only where a link is authored (`ctaLabel` = the link text, `cue="cta"`). **Where only a link line is authored** ("Read the Dealpath case"), the title is the linked case page's own h1, read from the corpus (`getCorpusPage(href).hero.titleText`): the content team's words for that case, taken from its page, as rule 5.2 takes its cover. Never a title the builder writes. | The set picks the crop from the count (`cover` 3:2 for one or two, `wide` 16:9 from three, `pair` for a linked pair); the builder passes no `ratio`. `lead="none"` always: BlockCardSet's default `auto` features the first card from four items, which is for `/case-studies` only. Never a decorative image in the same band. |
| **M9** | **A lone link closing a band** ("Read the X case", "See all case studies", a service link) | `CtaRow` in the band's `footer` (link button with its arrow) | Inline links inside sentences stay inline. |
| **M10** | **Symptom set:** labelled items whose titles are quoted customer voices ("Customers keep getting stuck.") | D: `ContentSection arrangement="beside"` + `aside` photo (3:2, `asideFill`) + `ReadDown columns={2}`, row title = the quoted line as written | product-design `starting-points`, audit `recognition`. `ReadDown` rows take no `href`, so ReadDown is only for rows nobody clicks. A run of **linked** rows is `ListCard` rows with `href` in the caller's `Layout as="ul" rowGap="none"` (home `capabilities`). |
| **M11** | **Two labelled reasons** (`why-tcules`) | B: `ContentSection arrangement="media"`, photo weight (6:5 in 667), two tiles | Where B would make a third B in a row, use D with a photo aside and `ReadDown columns={1}` (healthtech). |
| **M12** | **Labelled claims, 3–6** (outcomes, principles, differentiators) | Text cards: `BlockCardSet` text form (the hairline top, `lead="none"`); or B tiles beside a photo where the page needs an image there | The choice follows page rhythm (section 3) and is stated per band. |
| **M13** | **Service or destination links with a description** | Icon router: `BlockCardSet frame="box" lead="none"`, a glyph per destination (G12), stacked head above, no photograph. A set whose count leaves a short last row (five → 3 + 2) starts that row at the start edge; it is never centred. | Owner, 9 Oct: a clickable set takes its head above and no decorative image. |
| **M14** | **A bare run of destination links** (expertise list) | Icon router, title only: `BlockCardSet frame="box" lead="none" across={4}`, `cue="title"` (each title is its destination's name) | |
| **M15** | **Comparison table** (a key column compared across rows) | Boxed `DataTable` (7 Oct ruling 1) | A boxed table is a drawn band (E) for the rhythm rules, as ServicePage's Record and Matrix are (`plan.ts` DRAWN). |
| **M16** | **Key/value record** ("At a glance", "Tcules at a glance") | `DataTable` record. Six or more rows set as two boxed halves side by side from 1024 (7 Oct ruling 1). "At a glance" has no real header row: its first row is a pair, so it uses the head-less record mode (G4). | |
| **M17** | **A table whose rows are peers, not compared** (personas, impact dimensions) | Cards (`BlockCardSet lead="none"`, unlinked, `frame="none"`: the box is for routers only), with the two header cells rendered **once** above the set as a legend: header 1 → header 2. The legend is template-local markup: a `Cluster colGap="tight"` of two `<p>`s in `--text-eyebrow` with `text-transform: var(--text-mono-case)` and `Icon name="arrow-right" size="sm"` (blue, `aria-hidden`) between them. It is the set's first block, a `stack` under the head. | The header words survive without a repeated card eyebrow (§ 7.3). |
| **M18** | **Ordered list on a composed page** | `Steps` (numbered ListCard rows) or `Thread` where the order is a path | |
| **M19** | **Long-form section** | Inside LongformPage's one shell `Section`: `Layout columns={{ base: 1, lg: [1, 4] }}` with the `TableOfContents` rail + `<article>`, as `case-studies/[slug]` already does. Each band is an `<section>`: h2, then `Prose` (`inlineToHtml`), with `DataTable`, `Steps` and `Media` placed between Prose runs. | Long-form is "anything you would read like an article" (memory: long-form-page-types). Prose has no measure, so the rail's track sets it. |
| **M20** | **Scope note** ("We are at our best when…", "Worked example, not a client result…") | `Callout` | A quiet boundary on the claim just before it, which is Callout's job. |
| **M21** | **One standalone sentence split from a band** | `Statement` (J), `as="p"`, `align="start"` unless a neighbour is centred | Never an h1. |
| **M22** | **Bound artefact image in a band** | `Media kind="capture"` (hairline, radius 0) in a media split or the article track, `alt` from `altIntent` | A Figure needs a caption, and the corpus has none (`caption: null`), so use plain Media. |
| **M23** | **Related services** | Inline in a sentence → stays inline. Alone at a band's foot → M9. Three or more in a band of their own → M13. | Owner: "cards, chips, or whatever best suits the visual design of that page". |
| **M24** | **Tool mount** | A labelled placeholder panel (G10) | |

**Item bodies with inline links** (product-design `engagement` item 4, healthtech `why-tcules` item 1,
About `what-we-do` Software Development) take `bodyHtml` (G3). A card whose body carries a link is
never a whole-card link, because that would nest one interactive element inside another.
**`cue="cta"` alone does not prevent that:** BlockCard renders its whole frame as the `<a>` whenever
`href` is set, whatever the cue, so a link in the body would sit inside it. G3 therefore adds a
static-frame mode: the frame stays a `<div>` and the cta is the card's only anchor. It is a set's
decision, like `frame`. In About `what-we-do`, all six cards take it because one of them needs it, so
the six answer the pointer the same way. Unlinked tiles and rows with `bodyHtml` (engagement,
healthtech) need nothing more.

---

## 3 · Page-level rules, applied to every page below

- **Rhythm classification** (visual-direction § 1.7, `plan.ts`):
  - **visual:** a band with a photograph, illustration, capture, diagram (E, including a boxed
    table), marks (H), covers (M / case cards / case slides) or an icon set (C-icon);
  - **text-heavy:** everything else;
  - **not counted:** the close (L).
  - Composed pages (home, about, offer, tool, index) never put two text-heavy bands next to each
    other, except where the fixed narrative forces it. Each such pair is marked ⚠ with its reason.
  - Long-form pages instead never run **more than two Prose-only sections in a row**. The breaks
    are a table, Steps, a Media artefact, a Statement or a diagram slot. The first draft said "at
    least every second section"; the case (6–7) and the CPQ article (4–8) broke it, so the rule is
    now stated as a run length, and both pages meet it (see each page).
- **Archetypes** never repeat in adjacent bands, except B after B with the media side flipped.
  There are at most two D bands per page, D-faq included.
- **Centred heads:** never two adjacent bands.
- **Tint** marks the proof bands (a G quote band, home's rating strip) and the close. More than
  one mid-page tint is fine when they sit well apart (visual-direction § 1.7). Two tints never
  touch, and no ground is ever blue. The first draft said "at most one proof band mid-page", which
  home broke on its own sheet (1b and 6). § 1.7 is the rule, so the line now quotes it.
- **Blue solid:** one main action per page, the hero's or the close's (the same ask may repeat).
  Every other action is a link button.
- **Texture** (paper only, at most 3, never adjacent): the end-fade on a no-media hero; `horizon` at
  the foot of the paper band directly above a tint proof band, never above ruled rows or a logo
  grid. Closes carry none (§ 1.7: "the close carries no texture for now").
- **Sliders:** `autoplay` only on a testimonial slider (M5). Every other slider (home's case
  slides, About's service cards) is still and steps on its controls.
- **Media sides** alternate between consecutive media bands. No photograph appears twice on one
  page.
- **Ids:** a band's `id` is its corpus id. A split's second part is `<id>-2`. A heading's id is
  `<id>-heading`. `#enquiry` and `#workspace` (hero actions) must resolve. The builders run
  `aria:check`.
- **`data-band`** carries the archetype letter for `fold:check`. Add the ten routes to
  `fold.config.json`. Index list bands keep CaseStudyIndex's `data-fold-exempt`.

---

## 4 · Pages

### 4.1 `/` — HomePage

**Hero (M1):** `beside`, with an **illustration placeholder** (register: the product-decision
survival model, the content team's `visual_plan`). The eyebrow is "Digital product design studio".
The proof line "Founded 2017 · More than 90 projects · Clients in 19 countries · Based in Ahmedabad,
India" becomes PageHero **`tags`**, four of them: "Founded 2017", "More than 90 projects", "Clients in
19 countries", "Based in Ahmedabad, India". That is the studio record, its own proof type, set in the
kit's bulleted hero-facts form after the action, where the line is authored (M1). The title is 43
characters, so tags are allowed. "Start a conversation" is the solid. The lede is 33 words (P3).

| # | Band id | Component and arrangement | Surface | Why this shape | Split | Image | Proposal |
|---|---|---|---|---|---|---|---|
| 1a | `client-recognition` | H: `LogoGrid edges="closed" align="center"`, `context` = the heading (`contextAs="h2"`), six cells (3 × 2) | paper | The boxed logo grid (owner, 8 Oct). Five of the six clients have no approved SVG, and the asset policy says "render names as fallback", so the whole set renders as **name cells** for equal weight (G1). | **split**: the rating moves to 1b. Logos and the aggregate rating are separate proof types and never share a band (owner, 9 Oct). | client logo SVGs ×5 → register | — |
| 1b | `client-recognition-2` | Rating strip, head-less band (`data-band="facts"`): `Stat size="xl" align="center"`, value "4.8", unit "out of 5", label "on Clutch across 13 independent client reviews.", `source` = Button `emphasis="link"` "Read the reviews" (external: `arrow-right-up`, opens in a new tab). No RatingBadge: its Clutch mark would say "Clutch" a second time. | **tint** | The kit's rating-led facts move (`kit/facts` 01) without its head, because the band's heading went to 1a. The sentence's words stay in order across value, unit and label. | from 1a | — | — |
| 2 | `product-situations` | C-icon router: stacked start head, `BlockCardSet frame="box" lead="none" across={3}`, six icon cards (glyph by destination per G12, title = h3, body = paragraph, `cue="cta"`, `ctaLabel` = the link text, e.g. "Product Design"). `lead="none"` is required: six items would otherwise feature the first card. | paper | A reader picks "which one is me" from six conditions, each with its own destination. The icons make it the visual band after the rating strip. | — | — | P4 (bodies 15–27 words; fold) |
| 3 | `selected-work` | Case slider: stacked start head (H-title) + `Slider perView={1}` (no `autoplay`) of four slides. Each slide `<li>` is a template-local composition, `Layout columns={{ lg: [7, 5] }} colGap="section"`: `Media` (the case artefact, capture) + copy (h3, paragraph, `Proof compact` where authored, link button "Read the … case"). `footer`: `CtaRow` "See all case studies". The artefact is the one large thing. There is no card frame and no rating, which keeps it clear of the rejected G-case. | paper | Four real artefacts, each the case's best evidence. One at a time gives each the weight of a media split without four stacked bands. | — | **bound ×4**: `home_doodle_object_model`, `home_dealpath_workflow`, `home_benchmark_scope_selector`, `home_eden_unified_search` | — |
| 4 | `capabilities` | List router: stacked start head, `lead` = the intro paragraph, then six **linked `ListCard` rows** (`href`, title = the service link text with its authored full stop, body = the rest) in a `Layout as="ul" columns={{ lg: 2 }} colGap="column" rowGap="none"`, 3 + 3. It is not `ReadDown`, which takes no `href` and would drop the six links. | paper | The same six services as band 2 but a different job (what each is, not which is mine), so a different shape: rows, not boxes | — | — | P5 (Software Development entry, 40 words) |
| 5a | `why-tcules` | B: `ContentSection arrangement="media"`, photo at the **end**; copy = heading + reasons 1–2 as two side-by-side blocks (h3, paragraph, `Proof compact`) | paper | Reasons with their own client's words (M7). The photograph is the band's large thing. | **split**: reasons 3–4 go to 5b. Four reasons and three quotes (211 words) do not fit one band. | placeholder → register | P7 |
| 5b | `why-tcules-2` | B, media side **flipped** (photo at the start); copy = reasons 3–4 (h3 + paragraph each), the Primelis `Proof compact`, `CtaRow` "How to choose a product design studio" pinned to the photo's foot | paper | B after B with the side flipped is the one sanctioned repeat, and two photo bands keep the run visual before the quote band. `horizon` at its foot if it clears the copy. | from 5a | reuse `about_studio_review` ("We work as part of your team") | — |
| 6 | `client-voices` | M5: G slider, centred head (heading + lead), six slides | **tint** | Quotes only; testimonials are the one sanctioned slider content | — | — | P6 (two quotes over 35 words; speakers repeated from band 3) |
| 7 | `ai-native-practice` | I: `Banner form="beside"` (3:2 photo, copy 477): heading, `lead` = paragraph, action = link button "How we use AI at Tcules" | paper | One idea and one link. The banner gives the short band a photograph instead of a lonely paragraph. | — | placeholder → register | — |
| 8 | `expertise` | M14: icon router, title only, `BlockCardSet frame="box" lead="none" across={4}` (4 × 2), a sector glyph each (G12) | paper | Eight destinations with no copy. Boxed icon cells scan faster than a link line, and they differ from band 2 in count, size and density. | — | — | — |
| 9 | `faq` | M4 | paper | | — | — | — |
| 10 | `enquiry` | M2 | tint | | — | — | — |

**Squint, top to bottom:** split hero with drawing and its four fact tags · name grid (centred) · tinted numeral strip ·
3 × 2 boxes · one big artefact slide · two-column rows · photo-end split · photo-start split ·
centred quote slider (tint) · photo banner · 4 × 2 small boxes · centred accordion · form split
(tint). No two neighbours share a shape.

- **Rhythm:** visual / text-heavy runs V T V V T V V T V V T, then the close: no adjacent
  text-heavy pair.
- **Centred heads:** 1a, 6 and 9, never adjacent.
- **Tints:** 1b, 6 and 10, none touching. 1b and 6 are two proof bands four bands apart, which
  § 1.7 allows.
- **Blue:** the hero's solid only. Every in-band action is a link.
- **Texture:** `horizon` on 5b only (the hero has an illustration).
- **Band count:** 12.

---

### 4.2 `/services/product-design` — OfferPage

**Hero (M1):** `beside` with the **existing product-design illustration** and its cut legend (rule
5, exception). The planned replacement, the content team's
`uncertainty_to_design_medium_map_with_case_pins`, is in the register. The eyebrow "Product Design
services" repeats a crumb (P1). The title is 71 characters (P2) and the lede 32 words (P3). "Start a
Product Design enquiry" is the solid. The proof line "Selected Product Design work: Doodle ·
Dealpath · Eden AI · Auxentios · Scissors" opens with a label, so it goes in `children` (M1), above
the action.

| # | Band id | Component and arrangement | Surface | Why this shape | Split | Image | Proposal |
|---|---|---|---|---|---|---|---|
| 1 | `outcomes` | M12 text cards: centred head, `BlockCardSet lead="none"` text, four across (`size="sm"`; title = the bold label with its full stop), then M6 `Proof compact` (VideoPlasty) a `stack` under | paper | Four outcomes of equal weight, each a short claim and its gloss: peers read across. The quote fits under them (≈ 548). | — | — | — |
| 2 | `starting-points` | M10 D: beside head (start), photo aside, `ReadDown columns={2}` (3 + 2) | paper | Five symptoms in the customer's voice read down beside the heading that frames them | — | placeholder → register | — |
| 3 | `worked-example` | B: `ContentSection arrangement="media"`, the Dealpath artefact at the **end**; copy = heading, three ListCard rows ("The problem." / "What we did." / "The result." as titles), `CtaRow` "Read the Dealpath case" pinned | paper | One story with its proof beside it. The labelled problem, action and result are a record, so they read as rows. | — | **bound** `product_design_dealpath` | — |
| 4a | `complex-products` | M8 case cards: start head (H-full), `BlockCardSet lead="none"` four across (the set takes `wide` 16:9), **unlinked** (no link is authored in this band). An unlinked covered set of three or more scrolls sideways on a phone and is a tab stop, so it takes `label` = the band heading. | paper | Four named products, each with its artefact or cover | **split** (M6): the Auxentios quote goes to 4b | **bound** `product_design_doodle`, `product_design_eden`; Scissors, Auxentios covers → register | P8 |
| 4b | `complex-products-2` | M6 G typographic: `Proof` display, centred, no heading | **tint** | A lone quote gets the type scale it deserves instead of a footnote under four cards. `horizon` at 4a's foot. | from 4a | — | — |
| 5 | `engagement` | B: `ContentSection arrangement="media"`, photo at the **start**; copy = heading, four tiles (2 × 2; "Design and build." takes `bodyHtml`, G3), then M20 `Callout` (the "We are at our best…" paragraph) | paper | Four ways in are peers. The closing paragraph limits the claim, which is the Callout's job. | — | placeholder → register | — |
| 6 | `specialist-capabilities` | M13 icon router: stacked start head, `BlockCardSet frame="box" lead="none" across={3}`, five cards, 3 + 2 with the short row at the start (title = link text, `cue="title"`; body = text after the colon, lower-case as authored, § 0 rule 1) | paper | Five destinations, each a deeper page | — | — | — |
| 7 | `faq` | M4 | paper | | — | — | — |
| 8 | `enquiry` | M2 | tint | | — | — | — |

**Squint:** split hero with drawing · four text cards under a centred head · head-and-photo beside
two columns of rows · copy beside a product capture (end) · four covers · a tinted centred quote ·
photo (start) beside a 2 × 2 and a note · 3 + 2 boxes · centred accordion · form split.

- **Rhythm:** T V V V T V V T. The "complex products" pair splits the only long run of text.
- **Centred heads:** 1, 4b and 7.
- **Tints:** 4b and 8.
- **Media sides:** 2 start, 3 end, 5 start.
- **Band count:** 9.

---

### 4.3 `/audits/design-to-code-audit` — OfferPage

**Hero (M1):** `beside` with an **illustration placeholder** (`visual_plan`
`intent_design_system_implementation_runtime_acceptance`, register). The eyebrow
"Design-to-Code Audit" equals the last crumb (P1). The title is 62 characters (P2) and the lede 31
words (P3). "Start a conversation" is the solid. The proof line "Selected work: Benchmark Gensuite · GT
Tools" goes in `children` (M1, labelled line). The frontmatter's `institutional_trust` and `client_recognition` hints
are not rendered in pass 1: they carry no authored strings (section 9).

| # | Band id | Component and arrangement | Surface | Why this shape | Split | Image | Proposal |
|---|---|---|---|---|---|---|---|
| 1 | `recognition` | M10 D: beside head, photo aside, `ReadDown columns={2}` (2 + 2) | paper | The same symptom-set shape as product-design's `starting-points`, so the family reads as one system | — | placeholder → register | — |
| 2 | `trace` | E: `ContentSection align="center"`, `lead` = the first paragraph; body = `Thread align="center"` (five stages, one row from 1024: title = the bold label without its colon, body = the text after it, all within Thread's 9-word body line), then `ContentSectionText` = the closing paragraph | paper | The list *is* a path from the approved design to sign-off. The visual plan names exactly this chain, so it is drawn on the blue line rather than bulleted. | — | — | — |
| 3 | `classify` | M15: boxed `DataTable` (key "Type of gap"; columns "What happened", "Where the fix belongs"), start head + lead | paper | Five gap types compared on cause and fix: a real table | — | — | — |
| 4 | `deliverables` | B: `ContentSection arrangement="media"`, product shot at the **end** (4:5); copy = heading, four `ListCard form="tile"` tiles in a 2 × 2 `Layout` (title = the bold run-in with its comma, "Every difference we found,"; body = the rest, lower-case as authored), `ContentSectionText` (the paragraph with its Implementation QA link) | paper | What you get is concrete: the difference record shown beside the list | — | placeholder → register | — |
| 5a | `proof` | M8 case cards: start head, `BlockCardSet lead="none"` three across (`wide`), linked: each card's trailing "Read the case" link becomes its `ctaLabel` and `href` (`cue="cta"`), so no link is left in a body. Benchmark's two paragraphs go via `bodyHtml`. | paper | Three real cases with real artefacts | **split** (M6): the Eden quote goes to 5b | **bound** `dtc_audit_benchmark`; GT Tools and Eden AI case covers (their case pages' bound assets) | P9 |
| 5b | `proof-2` | M6 G typographic, centred, no heading | **tint** | As product-design 4b. `horizon` at 5a's foot. | from 5a | — | — |
| 6 | `why-tcules` | M11 B: photo weight, photo at the **start**, two tiles | paper | | — | placeholder → register | — |
| 7 | `faq` | M4 | paper | | — | — | — |
| 8 | `enquiry` | M2 | tint | | — | — | — |

**Squint:** split hero with drawing · head-and-photo beside rows · a centred five-stage line ·
boxed table · copy beside a product shot (end) · three covers · a tinted centred quote · photo
(start) beside two tiles · centred accordion · form split.

- **Rhythm:** V V V V V T V T. Two E bands sit adjacent (2 and 3): a line diagram under a centred
  head against a boxed table under a start head. Their shapes and alignments differ, which is the
  intent of § 3.4's rule. This is a deliberate exception, recorded here.
- **Centred heads:** 2, 5b and 7.
- **Tints:** 5b and 8.
- **Media sides:** 1 start, 4 end, 6 start.
- **Band count:** 9.

---

### 4.4 `/expertise/healthtech` — OfferPage

**Hero (M1):** `beside` with an **illustration placeholder** (`signature_model`: person, question,
sensitive information, connected systems, specialist rules; register). The eyebrow "Expertise ·
HealthTech product design" repeats two crumbs (P1). The title is 74 characters (P2) and the lede 54
words (P3). "Start a conversation" is the solid. The proof line "Selected work: CuramCare · Vovisto" goes
in `children` (M1, labelled line). CuramCare and Vovisto are named as text only (asset policy). The
`independent_reputation` and `institutional_trust` hints are not rendered (section 9).

| # | Band id | Component and arrangement | Surface | Why this shape | Split | Image | Proposal |
|---|---|---|---|---|---|---|---|
| 1a | `hard-parts` | C-icon: start head + lead; M17 legend "Who is using it → What they are wondering"; `BlockCardSet lead="none" frame="none" across={3}`, six **unlinked** icon cards (glyph per persona from G12's HealthTech map, title = who, body = the quoted question with its authored quote marks) | paper | Six people with six questions are peers, not data compared across rows, so they read as people with a glyph each rather than as a grid of cells | **split**: the closing sentence goes to 1b | — | — |
| 1b | `hard-parts-2` | M21 `Statement` "These people rarely meet, so the product has to carry what one of them knows to the next." `align="center"` | paper | The band's conclusion, given the weight of a statement | from 1a | — | — |
| 2a | `approach` | B: `ContentSection arrangement="media"`, photo at the **start** (4:5); copy 667 = heading + principles 1–2 as two side-by-side tiles | paper | Research with real people is the first principle, and the photograph shows it | **split**: principles 3–5 go to 2b | placeholder → register | P10 |
| 2b | `approach-2` | M12 text cards: `BlockCardSet lead="none"` text, three across, no head (title = the bold label with its full stop) | paper | The remaining principles as peers | from 2a | — | — |
| 3a | `proof` | B: `ContentSection arrangement="media"`, product shot at the **end**; copy = band heading (h2), CuramCare h3, two paragraphs, M7 `Proof compact` (sign-off pending: render as written) | paper | A case story, the work first and then the client | **split**: Vovisto goes to 3b | placeholder → register | — |
| 3b | `proof-2` | B, side **flipped** (product shot at the start); copy = Vovisto h3 + two paragraphs | paper | The second case as its mirror. The authoring comments render nothing. | from 3a | placeholder → register | — |
| 4 | `why-tcules` | M11 alternate, D: beside head with `headSide="end"`, photo aside, `ReadDown columns={1}` (two rows; row 1 `bodyHtml`, G3) | paper | A B here would make three B bands in a row (3a, 3b, 4) | — | reuse `about_studio_review` ("Research, design and code in one studio") | — |
| 5 | `faq` | M4 | paper | | — | — | — |
| 6 | `enquiry` | M2 | tint | | — | — | — |

The frontmatter asks for **one** asset here (`healthtech_asset`: "an approved CuramCare **or** Vovisto
screen"). The design reserves a slot for each case, and the register says so. If only one screen is
approved, it goes in 3a, and 3b drops its media to become a head-less `ContentSection` (h3 + two
`ContentSectionText` paragraphs at the body measure). That stays legal: 3b would be text-heavy
between 3a and 4, which are both visual.

**Squint:** split hero with drawing · 3 × 2 persona glyph cards · a centred statement · photo
(start) beside two tiles · three text cards · copy beside a product shot (end) · product shot
(start) beside copy · rows beside a head with the photo at the end · centred accordion · form split.

- **Rhythm:** V T V T V V V T.
- **Centred heads:** 1b and 5.
- **Tints:** the close only. The page has no testimonial band; its one quote lives in its case
  (M7).
- **D bands:** 4 and 5 (two, the cap).
- **Band count:** 9 (6 authored + 3 splits).

---

### 4.5 `/case-studies/benchmark-gensuite-enterprise-suite-modernisation` — LongformPage, case

**Hero (M1):** `stacked`, no media, `texture`. The eyebrow is "Case study · Benchmark Gensuite"
(`case_meta` company). `body` = [lede 1, lede 2]. No actions are authored. The case has no bound
hero image, and its `visual_plan` binds media to bands only, so the hero needs no placeholder.

| # | Band id | Component and arrangement | Surface | Why this shape | Split | Image | Proposal |
|---|---|---|---|---|---|---|---|
| J | `case-thesis` (from the hero) | M21 `Statement` = lede 3 (the technical-leadership line, verbatim), `align="start"`, no eyebrow | paper | The client's own principle, given a statement's weight. A hero holding three paragraphs ran past the fold. | **split from the hero** | — | P11 |
| 1 | `case-context` | Stacked start head "At a glance"; M16 `DataTable` head-less record (4 rows, markdown's header row promoted to the first pair, G4), named by the band heading through `labelledBy` with no visible caption, so "At a glance" is not printed twice; `ContentSectionText` "Related Tcules services: …" (M23 inline) | paper | The facts a skimmer needs, boxed as a record | — | — | — |
| 2–7 | `the-opportunity-…` · `what-the-scope-selector-…` · `scope-selection-…` · `the-prototypes-were-code-…` · `where-the-work-stands` · `what-another-suite-owner-…` | **One shell band** (M19): rail + article. In 2, the "1. Stabilise…" list becomes `Steps` (title "Stabilise.", body the rest). In 4, `Media` scope selector after the list. In 5, `Media` attachments prototype after the third paragraph, the one that names it. The rest is `Prose`. | paper | The argument reads as an article. The steps and the two artefacts break the column every section or two. | — | **bound** `benchmark_scope_selector`, `benchmark_attachments_prototype` | P12 (`where-the-work-stands` repeats itself) |
| 8 | `delivery-impact` | M17 impact cards: centred head; legend "Impact dimension → What changed"; `BlockCardSet lead="none"` text, three across (title = dimension, body = change) | paper | The case's outcome as three equal claims at card scale: a visual peak after the column | — | — | — |
| 9 | `related` | Stacked start head + lead; M8 two linked case cards, `BlockCardSet lead="none"` (the set picks the linked pair's crop). Only link lines are authored, so per M8 each **title is the destination case page's h1**: "A clearer path from print order to production" and "A better way to add listings to Dealpath’s pipeline". `ctaLabel` = the authored link text ("Read the Gold Image Printing case"), `cue="cta"`. `footer`: `CtaRow` "Product Modernisation" (M9). | paper | Two cases to read next, with their covers | — | Dealpath case cover (bound on its case page); Gold Image Printing cover → register | — |
| 10 | `enquiry` | M2 with the scheduling link "See available times" and this case's `on_success` copy | tint | | — | — | — |

**Squint:** stacked title with the end-fade · one large statement · a boxed record · rail beside a
reading column (numbered steps, two full-width artefacts) · three big text cards under a centred
head · two covers · form split. TOC entries are the six shell sections.

- **Long-form rhythm (§ 3):** 2 Steps · 3 Prose · 4 Media · 5 Media · 6 Prose · 7 Prose, then the
  impact cards. The longest Prose-only run is two (6–7). Nothing is added to section 6 or 7: no
  artefact is bound there, and a pull quote would repeat words.
- **J statement:** lede 3 is 21 words against Statement's 14-word ceiling, so it runs four lines at
  the h1 role. That is a known overrun under P11. `as="p"`, because the sentence is a quotation and
  not a heading.

---

### 4.6 `/case-studies` — CaseStudyIndex (extended, G9)

**Hero (M1):** `stacked`, no media, `texture`. The eyebrow "Case studies" equals the crumb (P1). The
title is 61 characters (P2) and the lede 32 words (P3). The action "Tell us about your product" is
authored, so it renders as the solid. The template's 29 Sep rule against a hero action is overridden
by copy, and proposal P15 asks the content team to drop it.

The template decides each section's arrangement from its **position and count**. No band id is
special-cased.

| # | Band id | Component and arrangement | Surface | Why this shape | Image | Proposal |
|---|---|---|---|---|---|---|
| 1 | `featured` | The first section: `BlockCardSet` with `lead="auto"` (the first card featured, ruling C3), titles h3, `bodyHtml` = the paragraph, then the "**Our role:** …" line as a second paragraph (G3; BlockCard's `meta` is an action-row tag such as "PDF · 12 pages" and is too small for a sentence), `ctaLabel` = "Read the … case", `href` = its link, `cue="cta"`. Once the link is lifted out, no body carries a link, so the frame can stay the anchor. | paper | The four the content team leads with, one featured | covers bound on the Doodle, Benchmark, ConnectX and GT Tools case pages | — |
| 2 | `new-products` | 2–4 items: C-image-4, `BlockCardSet lead="none"` (only the first section features), linked whole cards, `cue="title"` (title = the bold run verbatim, e.g. "Auxentios: one quoting product for six specialist roles."; the inline name link becomes the card's `href`, so the title holds no nested link) | paper | Four products at equal weight | Auxentios, Novus, Kirana, OctiFi covers → register | — |
| 3 | `established-products` | 5 or more items: `ListCard` rows, linked, `marker` thumbnail (3:2, 160), two columns (3 + 2) | paper | A denser catalogue shape, so neighbours differ | Dealpath and Chain Hut bound; Gold Image, Ryzeo, Scissors → register | — |
| 4 | `ai-products` | 3 items: C-image-3, `BlockCardSet lead="none"`, linked as band 2 | paper | | Eden AI and BuildTwin (GIF) bound; Omny → register | — |
| 5 | `designed-and-built` | 1 item: a story split, `ContentSection arrangement="media"` with the cover at the start; copy = heading, the linked title line, body, M7 `Proof compact` | paper | One case and its client's words | The Wandering Raven cover → register | P16 |
| 6 | `enquiry` | M2 (the closing gains `form`, G9) | tint | | — | — |

**Squint:** stacked title · one big card and three · four equal covers · thumbnail rows in two
columns · three covers · photo beside a quote · form split. The bands are list bands and keep the
fold exemption.

Every cover in `new-products` is a placeholder (no bound asset exists for Auxentios, Novus, Kirana
or OctiFi), so that band renders four labelled panels until the covers land. This is a known cost of
the image rule, not a builder fault.

---

### 4.7 `/tools/design-system-drift-checker` — ToolPage

**Hero (M1):** `stacked`, no media, `texture`. The eyebrow is "Free tools · Design systems".
`body` = [lede 1, lede 2]. "Open the checker" (`#workspace`) is the page's one solid. No conversion
is authored, so the page has no form.

| # | Band id | Component and arrangement | Surface | Why this shape | Split | Image | Proposal |
|---|---|---|---|---|---|---|---|
| 1 | `how-to-use-it` | B: `ContentSection arrangement="media"`, photo weight (6:5 in 667), product shot at the **end**; copy = heading + two paragraphs (`ContentSectionText`) | paper | `visual_requirements` asks for the tool beside the instructions | — | placeholder (`v11_tool_interface`) → register | — |
| 2a | `workspace` | Stacked start head + `lead` (paragraph) + M24 the tool-mount panel at full column | paper | The tool is this page's large object | **split**: the h3 item goes to 2b | — (tool, G10) | — |
| 2b | `workspace-2` | Head-less `ContentSection` (ContentSection's heading is always an h2, so it cannot carry this h3). Its body is one `Layout rowGap="block"`: a template-rendered `<h3 id="what-should-a-design-system-drift-check-inspect">` (the base h3 role from `globals.css`), then the M15 boxed `DataTable` (key "Follow the component through", `labelledBy` = that h3's id), then a `stack` to `ContentSectionText` (the closing paragraph). | paper | A checklist compared across four stages. It stays a table: two different columns are read across each stage, which is 7 Oct ruling 1's test. | from 2a | — | — |
| 3a | `reading-your-results` | Stacked start head + `lead` (paragraph 1) + M20 `Callout` (the worked-example paragraphs 2–3) | paper | The worked example is explicitly bounded ("not a client result") | **split**: the table goes to 3b | — | P13 |
| 3b | `reading-your-results-2` | M15 boxed `DataTable` (key "Finding") | paper | | from 3a | — | — |
| 4 | `what-this-does-not-tell-you` | Stacked start head + `ContentSectionText` (two paragraphs, the external Storybook link) | paper | A limits note. It stays plain. | — | — | — |
| 5 | `next` | M3 (inline links): `ContentSection` on tint + `ContentSectionText`, no CtaRow (the links are in the sentences) | tint | The page's close position | — | — | — |

**Squint:** stacked title · copy beside a tool shot · the tool panel · boxed table · head with a
note box · boxed table · two plain paragraphs · tinted close.

- **Rhythm:** V V V T V T, then the close.
- **Band count:** 7. Tools are utility pages; the 8–12 band rule is the service and showcase
  pages'.

---

### 4.8 `/insights/cpq-ux-design` — LongformPage, article

**Hero (M1):** `stacked`, no media, `texture`. The eyebrow is "Insights · SaaS · Data-heavy". The
byline line (author, role, "Last updated on 7 Oct ’26 · 11 min read") goes in `children`, verbatim.
PageHero's `credits` / `dates` would replace its words, so they are not used. `body` = [the
standfirst]. At 57 words the standfirst is over the hero budget, but it is the article's answer-first
summary on an SEO page, which may compromise (7 Oct). No proposal.

| # | Band id | Component and arrangement | Surface | Why this shape | Image |
|---|---|---|---|---|---|
| 1–9 | `how-should-…` → `cpq-ux-checklist` | **One shell band** (M19), with nine sections in the rail. In 2, a boxed `DataTable` (empty key head as authored; columns "Rep-assembled quote", "Expert-assembled quote"; `labelledBy` = the section's h2 id, since an empty key head would otherwise name the region " table", G4). In 3, a **diagram slot** after the "responsibility map" paragraph, and the five questions as Prose `<ol>`. **In 4, the four design moves as `Steps`**: "Four design moves follow." stays Prose, then four numbered rows, each title = the paragraph's first sentence ("Say why an option is unavailable.") and body = the rest of the paragraph via `bodyHtml` (G3; the citation links survive). Prose resumes at "The people who maintain the rules…". **In 6, a second diagram slot** after the bulleted list: two versions of one quote side by side, the changed lines marked and the change that moved the price called out. It is the list's "compare versions side by side" made visible. In 9, the checklist as a boxed `DataTable` (8 rows, `labelledBy` = the h2). Everything else is `Prose`. | paper | A reading page. Two tables, two diagrams and the numbered moves break the column. The longest Prose-only run is two (7–8). Without the Steps and the second diagram, 4–8 was five Prose sections in a row. | two diagram placeholders (the six roles around one quote; the version comparison) → register |
| 10 | `where-this-work-sits` | M3 (inline links): `ContentSection` on tint + `ContentSectionText` + `CtaRow rule={false}` "Tell us where quotes slow down or need rework" (→ `/contact`) | tint | The close | — |

**Squint:** stacked title with byline · rail beside a long column (table, diagram, numbered list,
numbered moves, diagram, table) · tinted close.

---

### 4.9 `/glossary/design-system` — LongformPage, term

**Hero (M1):** `stacked`, no media, `texture`. The eyebrow "Glossary · Design System" repeats both
crumbs (P1). The title is "Design system". `body` = [lede 1], one paragraph: the definition with
its "When it matters:" clause inline, as authored (P14). Ledes 2 to 5 leave the hero (J, then
`definition-2`).

| # | Band id | Component and arrangement | Surface | Why this shape | Split |
|---|---|---|---|---|---|
| J | `definition` (from the hero) | M21 `Statement` = lede 2 ("The boundary between … component count.") | paper | The term's sharpest sentence as a statement | **split from the hero** |
| — | `definition-2` + `practice` + `comparison` | **One shell band** (M19): the rail lists `practice` and `comparison`. The head-less `definition-2` section holds `Prose` (ledes 3–5 with their links). `comparison` has a lead sentence + a boxed `DataTable` (key "Component library"; column "Design system"; `labelledBy` = the h2). It stays a table rather than a Contrast: its rows pair up line by line (what each is, what it answers, what it needs), and two free lists would lose that pairing. | paper | A definition page reads as an article | from the hero |
| — | `next` | M3 (no inline links): `CtaSection open`: heading, `body=[sentence]`, `actions=[See Design Systems]` (the solid) | tint | | — |

**Squint:** stacked title · statement · rail beside the column (prose, prose, a boxed table) ·
centred ask. Images: none. The term family carries none by default.

---

### 4.10 `/about` — AboutPage

**Hero (M1):** `stacked`, no media, `texture`. The eyebrow "About Tcules" repeats the crumb (P1).
The title is a 126-character sentence, authored in bold; it renders as plain h1 text, since a bold
h1 says nothing (P2). `body` = [lede 1]. No actions are authored.

| # | Band id | Component and arrangement | Surface | Why this shape | Split | Image | Proposal |
|---|---|---|---|---|---|---|---|
| S | `studio` (from the hero) | B, head-less: `ContentSection arrangement="media"`, photo at the **end** (4:5); copy = `ContentSectionText` × 3 (ledes 2–4), centred on the photo (§ 3.2 rule 2: no action) | paper | The founding facts and "Product Design sits at the centre" stay together as the opening paragraphs. As plain paragraphs under a no-media hero, the page's first two viewports were all text: a 126-character title, a lede and three paragraphs. With a photograph, S and band 1 open as a zig-zag (photo end, then photo start), which is B after B with the side flipped. | **split from the hero** | placeholder → register (studio photo) | P17 |
| 1 | `ahmedabad-is-part-of-how-we-work` | B: `ContentSection arrangement="media"`, photo at the **start**; copy = heading + four paragraphs | paper | The studio and its people, the band's own bound photograph | — | **bound** `about_studio_review` | — |
| 2 | `the-practice-keeps-moving` | Stacked start head + `ContentSectionText` (four paragraphs) | paper | An argument in prose | — | — | P17 |
| 3 | `what-we-do` | C-icon slider: stacked start head + `Slider perView={3}` (no `autoplay`) of six `BlockCard frame="box"` icon cards (glyph per G12, h3, two paragraphs via `bodyHtml`, `cue="cta"`, `ctaLabel` = the authored "Explore …" link text, `href` = its link). Software Development's body carries the AI engineering link, so all six take G3's static frame, with the cta as each card's one anchor. | paper | Six services with long bodies: three in view keeps each readable without a 2 × 3 wall past the fold | — | — | — |
| 4 | `who-we-work-with` | Centred head, `lead` "Three situations recur:", M12 text cards `BlockCardSet lead="none"` three across (the bold run-in = title; body = the rest, lower-case as authored), then `ContentSectionText` (the two closing sentences) | paper | Three client situations as peers | — | — | — |
| 5a | `difference` | B: `ContentSection arrangement="media"`, photo at the **end**; copy = heading + items 1–2 as two `ListCard form="tile"` tiles (h3 + paragraphs via `bodyHtml`) | paper | | **split**: items 3–5 go to 5b | placeholder → register | P17 |
| 5b | `difference-2` | M12 text cards, `BlockCardSet lead="none"` three across, no head (bodies of two paragraphs via `bodyHtml`); `footer`: `CtaRow` "How AI-native Product Design works at Tcules" | paper | | from 5a | — | — |
| 6 | `how-we-work` | D: beside head (start), photo aside, body = `Accordion` (five items: question = h3, answer = paragraphs) | paper | Five working principles, two paragraphs each. Closed, the titles alone tell the story: this is the fold remedy § 1.3 names first. | — | placeholder → register | P17 |
| 7 | `leadership` | B, photo at the **end**; copy = heading, two leader blocks (h3, bio, LinkedIn link button), the studio paragraph, "Follow Tcules on LinkedIn" (links stacked one per line) | paper | Two people and the team behind them | — | **bound** `about_team` | — |
| 8a | `work-you-can-inspect` | M8 case cards: start head, `BlockCardSet lead="none"` four across (`wide`), linked whole cards, `cue="title"` (title = the link text, `href` = its link, body = the rest of the sentence, lower-case as authored, e.g. "shows research changing …") | paper | Four cases, each named for what it proves | **split**: the Lab paragraph and the all-cases link go to 8b, because the band's bound photo may not sit beside clickable cards (9 Oct) | Doodle, Benchmark, GT Tools covers (bound on their case pages); Omny → register | — |
| 8b | `work-you-can-inspect-2` | B, head-less, photo at the **start**; copy = `ContentSectionText` (the Lab paragraph) + `CtaRow` "Explore all case studies", centred on the photo | paper | The working wall shows the practice | from 8a | **bound** `about_work_wall` | — |
| 9 | `testimonials` | M5 G slider, centred head (no lead), three slides | **tint** | | — | — | — |
| 10 | `company-record` | M16: start head + two boxed `DataTable` halves (8 + 8 rows, each with the authored header row "Fact · Current public record") side by side from 1024 | paper | Sixteen facts as a record that holds the fold | — | — | — |
| 11 | `frequently-asked-questions` | M4 (nine questions) | paper | | — | — | P17 |
| 12 | `what-remains-constant` | B: `ContentSection arrangement="media"`, photo at the **end** (4:5); copy = heading + `ContentSectionText` × 4 (the four short paragraphs), centred on the photo | paper | The coda: "Ahmedabad is where the practice took shape. The world is where the work goes." is a sentence about place, which a photograph of the studio in its city shows and a paragraph cannot. It also ends the T–T pair the first draft accepted (the FAQ, then a text coda), which broke the owner's 7 Oct rule. A photograph fixes it without touching the order. | — | placeholder → register (studio photo) | — |
| 13 | `work-with-tcules` | M3: `CtaSection open` (heading, `body=[para]`, `actions=[Start a conversation → /contact]`, the page's one solid) | tint | | — | — | — |
| 14 | `careers` | I: `Banner form="below"` (`tight`): a stacked head (heading, `lead` = paragraph, link-button action "Explore careers at Tcules") over a 3:1 photograph | paper | A second ask after the close is authored, so it takes a link and a photograph rather than a second solid. It is `below` and not `beside`, so it does not repeat 12's photo-beside-copy two bands later, and a wide studio panorama ends the page the way kit/about's Holi frame opened it. | — | placeholder → register | P19 |

**Squint:** stacked long title · paragraphs beside a photo (end) · photo (start) beside text ·
plain prose · three-up card rail · three text cards (centred) · photo (end) beside two tiles · three
text cards · head-and-photo beside an accordion · photo (end) beside two people · four covers ·
photo (start) beside a note · tinted quote slider · two boxed halves · centred accordion · coda
beside a photo (end) · tinted ask · head over a panorama.

- **Rhythm:** V V T V T V T V V V V T V T V, then the close and the careers banner. There is no
  text-heavy pair, and no ⚠ is needed.
- **Media sides:** S end, 1 start, 5a end, 6 aside (start), 7 end, 8b start, 12 end; 14 is centred
  (`below`).
- **Texture:** the hero's end-fade, and `horizon` at the foot of 8b, the paper band directly above
  the tint testimonials. Two placements, none adjacent.
- **Centred heads:** 4, 9 and 11.
- **Tints:** 9 and 13.
- **D bands:** 6 and 11.
- **Band count: 17** (14 authored + 3 splits). This is over the 8–12 cap. `fold:check` will report
  it, and P17 asks the content team to consolidate.

---

## 5 · Placeholders (how a deferred image renders)

**G5, no component change.** A script, `npm run placeholders`, reads `docs/image-register.md` and
writes one SVG per row to `public/placeholders/<route-slug>--<band>--<n>.svg`, at the row's ratio. A
case-cover row is one asset for every page that cites it, written once as
`public/placeholders/case-cover--<case-slug>.svg` at 16:9 and cropped by each placement.
Each SVG carries a neutral ground, a hairline and a label: "Image to come · <kind>" plus the "what it
shows" line.

The page passes the SVG as an ordinary image record with `kind: 'capture'`. A capture renders whole,
with its hairline, at the reserved ratio, in every slot that already exists (PageHero `media`,
ContentSection `media` and `aside`, BlockCard cover, Banner image, ListCard thumbnail). It never
enters the photograph tone and resolution gates.

When the real asset lands, the record's `src` changes and the register row is deleted. Labels are
part of the placeholder, not type laid over an image, so the "no type on images" rule is not
engaged.

The illustration-hero placeholders use the illustration slot's ratio (5:4). They are captures, not
`kind: 'illustration'`, so PageHero does not try to centre an unboxed drawing.

---

## 6 · Gaps: what no kit unit expresses today

The test for each (job-is-not-a-component): composition first; a prop only where composition
cannot; a new unit only for its own markup, behaviour or arrangement.

| # | Need | Why composition cannot serve it | Smallest change | Unit owner |
|---|---|---|---|---|
| **G1** | Client names without an approved logo | `LogoGridMark` is a `ClientMark` (an SVG mask) and has no text form. The asset policy says "render names as fallback; never invent a logo asset". | `LogoGridMark` accepts `{ name }` with no `src`. When any mark in a set lacks one, every cell renders its name (set-level, so weights stay equal) in a sans title role, centred in the cell. | LogoGrid |
| **G2** | The corpus enquiry form | The `enquiry` variant's fields match (email, work, URL), but: the URL label "Product or company URL" is not in `EnquiryUrlLabel`; `scheduleHref` is **required**, while only cases author a scheduling link and no scheduling destination exists anywhere in `routes.ts`; and the success heading and body are hard-coded where the corpus authors them (`on_success`) | (a) add `'Product or company URL'` to `EnquiryUrlLabel`; (b) make `scheduleHref` optional on `enquiry`; (c) add `success?: { heading: string; body: string }` | EnquiryForm |
| **G3** | An item body that carries inline links, bold runs or several paragraphs | BlockCard, ListCard and ReadDown take `body: string`, so a link would be flattened. BlockCard also renders its whole frame as the `<a>` whenever `href` is set, whatever the cue, so a link in its body would be an anchor inside an anchor (invalid, and it breaks the inner link). | (a) `bodyHtml?: string` (trusted, seam-sanitised: the contract DataTable cells already use), exclusive with `body`, on BlockCard and ListCard, passed through by ReadDown, Steps and BlockCardSet items. (b) A **static-frame mode** on BlockCard: with `href` and `cue="cta"`, a prop (`linkScope: 'card' \| 'cta'`, default `card`) keeps the frame a `<div>` and makes the cta Button the card's only anchor. BlockCardSet takes it for the whole set, like `frame`. Only About `what-we-do` needs (b) in pass 1. | BlockCard; ListCard |
| **G4** | A key/value record with no header row ("At a glance"), and tables whose name is the section heading | DataTable requires `keyColumn.heading` and `columns[].heading`, so the head row would be invented or empty. Without a `caption` it names its scroll region `` `${keyColumn.heading} table` ``, which is " table" when the key head is empty (the CPQ decision table). A caption that repeats the band heading would print it twice. | (a) A `head={false}` record form: rows only, at most one value column. (b) `labelledBy?: string`, the id of the heading that already names the table, used for the region and the `<table>` when there is no caption. Every corpus table passes its section or band heading's id. No visible caption anywhere in pass 1, because none is authored. | DataTable |
| **G5** | Labelled image placeholders | — | none: script-generated SVGs (section 5) | script |
| **G6** | Inline runs → HTML for the rich slots | — | `inlineToHtml` in `src/lib/inline.ts` | lib |
| **G7** | Templates typing against corpus pages | Templates may not import `@/content` | the view-model types move to `src/lib/corpus-types.ts` | content seam |
| **G9** | The case index's groups, hero action and form close | CaseStudyIndex renders one flat set, refuses a hero action and closes with `open` only | `hero.action?`; `sections?: { id, heading, items, quote? }[]` (each section's arrangement decided by position and count, section 4.6); `closing.form?`; `bodyHtml` passed through to BlockCard (G3) | CaseStudyIndex |
| **G10** | The Drift Checker record builder (manual evidence record, browser-only, markdown export) | It has its own behaviour and markup, so it qualifies as a new unit. It is a product feature, not a page layout, and is gated by `TOOL_PRODUCTION_ACCEPTANCE`. | Pass 1 renders a labelled panel in `#workspace`. The tool gets its own spec (`docs/specs/DriftChecker.md`) later. | — |
| **G12 / G13** | Glyphs per destination; quote attributions | — | lib maps and a parser (section 1.3). The maps, from the glyphs that exist today (`iconNames`): **services** product design `ruler-pen`, product modernisation `shield-check`, design systems `layers`, AI product UX `stars`, design engineering `monitor`, software development `database`, new product design & first release `flag`. **Product-design specialists:** UX research `eye`, IA & workflow `widget`, interaction & UI `smartphone`, data visualisation `graph-up`, prototyping & usability testing `clipboard-check`. **HealthTech personas:** patient or family member `user`, clinician `checklist`, carer on a phone `smartphone`, professional in a portal `monitor`, operations team `users-group-rounded`, compliance lead `shield-check`. **Expertise sectors:** B2B SaaS `widget`, AI & developer tools `cpu`, data & analytics `graph-up`, marketplaces `users-group-rounded`, MarTech & SalesTech `chat-round-dots`. Commerce, FinTech and HealthTech have no fitting glyph, so the builder adds three Solar Bold glyphs to `src/components/Icon/glyphs.ts` (a cart, a wallet, a heart-pulse) in the same solid family. That is data in a primitive, not a new unit. | lib; Icon glyph data |
| **G15** | The case slide (home `selected-work`) | — | none: template-local composition of Slider + Layout + Media + Proof + CtaRow. It is not reused outside HomePage. If a second page ever needs it, promote it then. | HomePage |

**Considered and not needed:**
- a new "related services" unit (M23 covers it);
- a facts-row component (Stat composes the rating);
- a statement with a body (split instead);
- a testimonial-group unit (Slider + Proof);
- a placeholder primitive (G5).

---

## 7 · Expected fold overruns (copy as written; each has a proposal)

| Page · band | Why | Proposal |
|---|---|---|
| every hero with a title > 48 characters or a lede > 26 words | 4–5 title lines at display scale, plus a long lede, beside 424–505 of illustration | P2, P3 |
| `/` · `product-situations` | six card bodies of 15–27 words, against the ≤ 14-word budget | P4 |
| `/` · `client-voices` | two quotes run 42 and 47 words in a quote-lg slide | P6 |
| `/services/product-design` · `complex-products` | card bodies of 17–33 words, against ≤ 12 | P8 |
| `/audits/design-to-code-audit` · `proof` | the Benchmark card body runs 60 words over two paragraphs | P9 |
| `/expertise/healthtech` · `approach` (2a) | principle bodies of 27 and 32 words | P10 |
| `/about` · page | 17 bands; FAQ of nine items (budget ≤ 7 closed) | P17 |
| `/case-studies/benchmark-gensuite-…` · `case-thesis` (J) | 21 words against the statement's 14, so four lines at the h1 role | P11 |
| `/insights/cpq-ux-design` · section 4 Steps | Step bodies of 50–90 words: a reading column, so no fold rule applies inside the shell; listed so nobody trims them | — |

---

## 8 · Companion files

- **`docs/content-proposals.md`:** P1–P19, one entry each (page · band · problem · proposal · why).
  P18 and P19 were added by the critic.
- **`docs/image-register.md`:** one row per placeholder slot. A case cover cited on several pages is
  one row naming every page, so one asset is briefed once.

---

## 9 · Open issues for the next stage

1. **Frontmatter hints with no authored strings are not rendered:** `institutional_trust` (audit,
   healthtech), `independent_reputation` (healthtech), `client_recognition` (audit), and
   `trust_module_policy: required_commercial_relation_module` (home, product-design). Rendering
   them means writing labels, which is the content team's call. Home's hero proof line already
   carries the institutional facts verbatim.
2. **Studio photo reuse** (rule 5.3) depends on the Cloudinary masters' size, which is unmeasured.
   If `about_studio_review` fails the 1.9× rule at a slot, that slot becomes a placeholder and its
   row is added to the register.
3. **Duplicate speakers on `/`:** Stephanie Leue (Doodle) and Samy Melaine (Eden AI) are each quoted
   in both `selected-work` and `client-voices`, with different quotes. They render as written (P6).
4. **The scheduling destination** for "See available times" is named nowhere, so G2 (b) is needed
   even on the case page until it is.
5. **`/services/product-design` hero:** the interim illustration predates this copy. The register's
   illustration replaces it when it is drawn, to the illustration standard.

---

## 10 · Critic changes (10 Oct 2026)

What the critic checked: every band of the ten source files against this sheet, in order (band
order, splits, words, bound images); the squint test per page; each named component and prop
against the code on `origin/main`; the kit rulings (visual-direction 7 and 9 Oct, review-7-oct,
the owner memory). No band was found reordered, merged or dropped, no copy was implied cut, and no
bound asset was ignored. The changes below are fixes to feasibility, kit fidelity and beauty.

| # | Where | What was wrong | Change |
|---|---|---|---|
| C1 | home · `capabilities` | `ReadDown` rows take no `href`. Built as written, the six service links would have been dropped silently. | Linked `ListCard` rows in a two-column `Layout`. M10 now says ReadDown is for rows nobody clicks. |
| C2 | every 4+ card set (home 2 and 8, product-design 1, 4a and 6, healthtech 1a, about 4 and 8a, index 2) | BlockCardSet's `lead` defaults to `auto`, which features the first card from four items. Unstated, every feature set would have rendered a featured lead, against § 1.4 rule 4. | `lead="none"` stated on every set; M8, M13, M14 and M17 carry it. `auto` remains only on `/case-studies` `featured`. |
| C3 | M2 note, G3, about `what-we-do` | "A card with a body link takes `cue="cta"`, not a whole-card link" was not true of the code: BlockCard wraps the whole frame in the `<a>` whenever `href` is set, so a body link would be nested. | G3 adds a static-frame mode (`linkScope`), set-level. About's six service cards take it together. |
| C4 | G4, case `case-context`, CPQ tables, glossary, tool 2b | "The band heading as `caption`" would print "At a glance" twice. An empty key head (CPQ) named the table region " table". | G4 adds `labelledBy`. Every corpus table is named by its existing heading, with no visible caption. |
| C5 | case · `related` | Only link lines are authored, so M8's "title = the case name as authored" had nothing to read. A builder would have had to write a title. | M8: where only a link line exists, the title is the destination case page's own h1, from the corpus. Both titles are written into the row. |
| C6 | tool · `workspace-2` | ContentSection's heading is always an h2, so the authored h3 with its id had no home. | A template-rendered `<h3>` with its authored id as the band body's first block, and the table `labelledBy` it. |
| C7 | CPQ article, sections 4–8 | Five Prose-only sections in a row broke the sheet's own long-form rule. | Section 4's four design moves become `Steps` (first sentence = title, every word kept). Section 6 gets a version-comparison diagram slot, now in the register. § 3 states the rule as "never more than two Prose-only sections in a row". The case meets it (6–7). |
| C8 | about · hero → S → 1 | A 126-character title, a lede and then three head-less paragraphs made the page's first two viewports pure text. | S becomes a head-less B with a studio-photo placeholder, photo at the end. It and band 1 open as a flipped pair. |
| C9 | about · 11 → 12 | The FAQ and then a text coda, marked ⚠ and accepted, broke the owner's 7 Oct rule ("never two text-heavy bands back to back"). | The coda becomes a B with a studio-photo placeholder (photo at the end). Order unchanged. The ⚠ is gone. |
| C10 | about · `careers` | With C9, a beside banner two bands after the coda's B would repeat photo-beside-copy. | `Banner form="below"`, a head over a 3:1 panorama. The register row moves from 3:2 to 3:1. |
| C11 | home · hero | The studio record sat in `children`, which renders **above** the action, although it is authored below it. It was also a quiet line where the kit has a form for exactly this: § 3.8's bulleted hero facts. | `tags`, four of them, rendered after the action. M1 now separates label-less fact runs (`tags`) from labelled lines (`children`). |
| C12 | home · `client-recognition-2` | The strip used a CtaRow, and its exact Stat props were left open. | `Stat size="xl" align="center"` with the link in Stat's own `source` slot. No RatingBadge, because its mark would repeat "Clutch". |
| C13 | § 3 tint rule | The sheet's own rule ("at most one proof band mid-page") contradicted its home page and visual-direction § 1.7. | The rule now quotes § 1.7: proof bands and the close; more than one is fine when apart; never adjacent. |
| C14 | § 0 rule 1 | Labels were handled differently from row to row: colons dropped silently, full stops sometimes kept, run-in bodies unaddressed. | One rule: a colon goes when a label becomes a title, a full stop or comma stays, a lower-case run-in stays lower-case, and a lone link line's full stop goes when the link becomes a button. P18 logs the run-ins for the content team. |
| C15 | G12 | "A glyph per destination" named no glyphs, and the set has about fifty, so a builder would have guessed. | A concrete map for all four routers, from `iconNames`. Three missing sector glyphs (commerce, FinTech, HealthTech) get added to `glyphs.ts`. |
| C16 | healthtech · `proof` | The frontmatter asks for one asset ("CuramCare **or** Vovisto"), and the sheet reserved two slots without saying so. | A stated fallback: one screen goes in 3a, and 3b becomes a head-less text band, still legal between two visual bands. |
| C17 | sliders | Autoplay was unstated outside M5. | § 3: `autoplay` only on testimonial sliders. |
| C18 | audit · `trace`, `deliverables`, `proof` | "Centred head from 1024" was not a prop. Run-in tiles and lifted case links were not specified. | `ContentSection align="center"` + `Thread align="center"`; `ListCard` tiles with comma titles; each "Read the case" link lifted to its card's `ctaLabel`/`href`. |
| C19 | about · `careers` (after the close) | A second ask after the close went unlogged, although the close is meant to be last. | P19 (proposal only; the order stands). |

**Left as the mapper had it, on purpose:**
- the product-design hero's existing illustration (keep-what-was-approved);
- home's case slider (the artefact is the one large thing, there is no card and no rating, and the
  slides stay in the DOM);
- audit 2 → 3, a line diagram then a table (two E-class bands, different shapes and alignments);
- the glossary and audit tables, which stay tables because their rows pair or compare;
- healthtech's persona cards (a table whose rows are peers, which the owner's "change how an item
  is shown" allows).

---

## 11 · Build notes, batch B1 (`/`, `/services/product-design`, `/audits/design-to-code-audit`, `/expertise/healthtech`)

Where the build departs from this sheet, and why. Everything else is built as specified.

| # | Where | Sheet said | Built | Why |
|---|---|---|---|---|
| B1.1 | `/` · `selected-work` | slide tracks `[7, 5]`; the band's "See all case studies" a `CtaRow` footer | tracks `[1, 1]`; the link at the end of the heading's row (`actionsAt="end"`, 7 Oct ruling 5) | at `[7, 5]` the Doodle slide's 38-word quote ran 5 lines at 477 and the band measured 979; `[1, 1]` and the head link bring it to 807, inside the fold. A layout decision, not a gap or a type step |
| B1.2 | `/` · `why-tcules-2` | reuse `about_studio_review` | a placeholder (register row added: `/` `why-tcules-2`, studio photo, 4:5) | the file is 960 × 720; the 4:5 slot needs 906 × 1133 (§ 5.4). The same file passes at healthtech `why-tcules` (head-track aside 3:2 needs 724 × 483), so it is used there |
| B1.3 | `/` hero | four `tags` | `PageHero` sets exactly four tags 2 × 2 | in three columns a 21-character mono tag filled its 175 column and touched its neighbour's pixel, and four set 3 + 1. A count rule on the kit's tags grid, shown at `/design/kit/hero` |
| B1.4 | the three family routes | "switch the family" | one allowlist (`PASS_1_OFFER_ROUTES`, `src/app/_corpus/offer.tsx`); the other pages of each family keep their current source | § 1.2: the 86 unverified corpus pages must not switch silently. `generateStaticParams` returns the allowlisted slugs; every other slug still renders from its current source (`dynamicParams` is the default) |
| B1.5 | `kit` extensions | G3 `linkScope`, G4 head-less record | not built | no B1 page needs either (no card with a link in its body carries an `href`; no table lacks a header row). They belong to the About and case batches |
| B1.6 | item titles inside a band | "h3" | an `h3` element at the h4 role (`.itemTitle`) | the h3 role beside the band's h2 read as a second band title (a reason, a case in a slide, a case story) |
| B1.7 | `/` · `client-recognition` | name cells | name cells for all six, Doodle included | LogoGrid's set-level rule: one client without a mark and every cell is its name, so weights stay equal |

Extensions to approved pieces, each the smallest the job needed and none a restyle: `LogoGridMark`
accepts a name (G1); `EnquiryForm` takes `urlLabel="Product or company URL"`, an optional
`scheduleHref` on `enquiry` and `success` (G2); `BlockCard`, `ListCard`, `ReadDown` and `Steps` take
`bodyHtml` (G3a); `DataTable` takes `labelledBy` (G4b); `ContentSection` takes `id`; `PageHero`'s tag grid
is 2 × 2 at four tags; `Icon` gains `cart`, `wallet` and `heart-pulse`.


## 12 · Critic pass, batch B1 (10 Oct 2026)

Shot at 1440 and 390 and read band by band. Copy fidelity was re-checked against the raw markdown
(not the corpus parser): every sentence of the four sources renders verbatim and every `##` band is in
document order. The one fragment not on the page at rest is each form's "After sending" line, which is
the success view's body and appears after a submit. Each note below names its cause and where the fix
lives.

| # | Where | Seen | Cause | Fix | Lives in |
|---|---|---|---|---|---|
| C1.1 | `/` · `why-tcules` | two reasons side by side, each quote at 28 in a ~306 track: four words a line, the Eduard Stinga quote ran seven lines, and the quotes outweighed the photograph | the compact quote's size ignored the measure it is set in | Proof's compact figure is its own size container; under a 30rem track it takes the new `--text-quote-sm` (22 / 1.4, `--text-quote`'s own phone step, no breakpoint step). The two quotes drop to four and three lines and the band reads as photo + two reasons. The group arrangement (approved, three peers at ~390) is untouched | `Proof.module.css`, `tokens/primitives.css`; specimen `/design/proof` § 18 |
| C1.2 | `/expertise/healthtech` · `approach` / `approach-2` | the split's last three principles set as BlockCardSet text cards a type step above the first two ListCard tiles; at 390 the bodies were 16 against 14 | the split's two halves were drawn with two different components | `approach-2` renders the same `ListCard` tiles as `approach`, three across (`tiles(rows, 3)`) | `OfferBands.tsx` |
| C1.3 | `/expertise/healthtech` · `hard-parts-2` | the statement split carried no anchor (§ 3: a split's second part is `<id>-2`) | `Statement` applied `id` to its h2 only, and a `p` statement has none | with `as="p"`, `Statement`'s `id` goes on the band; the template passes `hard-parts-2` | `Statement.tsx`, `OfferBands.tsx` |

Looked at and kept, with the reason:

- **`/expertise/healthtech` · `why-tcules`** sets its head at the end (`headSide="end"`). The photo
  alternates with Vovisto's start-side photo directly above (§ 3, media sides). The arrangement is the
  kit's approved mirror; the head stays first in the DOM and on a phone.
- **`approach` → `approach-2`** keeps a full section seam between the two halves. Unsplit, the band runs
  past the fold (P10). With one tile type the second half reads as the set's continuation.
- **Placeholders** in small slots (an aside of 3:2 at 381, a 16:9 cover) print their label small.
  They are stand-ins for the register's assets and do not ship.


## 13 · Build notes, batch B2 (`/case-studies/benchmark-gensuite-…`, `/case-studies`, `/tools/design-system-drift-checker`)

Where the build departs from this sheet, and why. Everything else is built as specified.

| # | Where | Sheet said | Built | Why |
|---|---|---|---|---|
| B2.1 | `/case-studies/benchmark-gensuite-…` · `enquiry` | M2 with the scheduling link "See available times" | no scheduling link | G2 (b) made `scheduleHref` optional, but no scheduling destination exists anywhere in `routes.ts`, so a link would point nowhere. The link is not authored copy (it is a frontmatter label), so no word is lost. It arrives with the destination |
| B2.2 | `/case-studies/benchmark-gensuite-…` · `related` | the cards' covers: Dealpath bound, Gold Image Printing a placeholder | as specified | The Gold Image Printing card shows the register's labelled placeholder until its cover lands |
| B2.3 | `/case-studies/benchmark-gensuite-…` · outline | "TOC entries are the six shell sections" | the six headings as labels | each is 38–74 characters and clamps to two lines in the rail. No label was shortened (copy rule); P24 asks for navigation labels |
| B2.4 | `/case-studies` · `designed-and-built` | the cover at the start, the Wandering Raven placeholder | as specified, but the placeholder is the 16:9 master cropped to 4:5, so its label is cut at the crop | a register row at 4:5 would fix it once; the real cover replaces the panel |
| B2.5 | the three family routes | "switch the family" / `generateStaticParams` from the corpus list | one allowlist per family (`PASS_1_CASE_ROUTES`, `PASS_1_TOOL_ROUTES`), as B1.4 | § 1.2: the unverified corpus pages must not switch silently |
| B2.6 | `CaseStudyIndex` | G9 | `hero.{eyebrow, lede, action, texture}`, `sections`, `closing.{form, id}`, `bodyHtml` and `ctaLabel` on an item, all optional; the flat `items` form and its callers are untouched | a section's arrangement is decided from its position and count (see the type's doc) |
| B2.7 | `DataTable` | G4 (a), a head-less record | `head={false}` | B1.5 deferred it to this batch |
| B2.8 | the tool mount | M24, a labelled panel | `ToolMount` in `ToolPage`, with `--cpg-panel-*` tokens in `tokens/components/corpus-page.css` on all four surfaces | the panel is a hairline box with two lines of text; the tool is gated by `TOOL_PRODUCTION_ACCEPTANCE` |

`LongformPage` was built for the case family only (`family="case"`). Its shell, Steps detection, artefact
placement and renderers are structure-driven, so the article and the term families (a later batch) add
their own composed bands around the same shell without a new template.
