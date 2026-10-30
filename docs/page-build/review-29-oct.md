# Critic review, 29 Oct 2026: eleven routes before the owner's browser pass

An independent design critic who did not build these pages reviewed branch `feat/new-copy` (b77bb0cd) on `next dev` at
port 3331. The critic took full-page captures of every route at 1440 and 390 (`npm run shots -- --routes=…`: 22
captures, **0 with horizontal overflow, 0 page errors**). The critic also took one crop per band at both widths,
with the sticky nav made static so it does not cover the crops, and looked at every one. The critic judged beauty
first, then the rules. The binding owner answers of 29 Oct (Q1, Q4, Q5, Q7; nothing cut) are treated as settled.

Gates run: `lint` 0 errors (31 unused-var warnings), `tokens:check` clean, `classes:check` clean. Tier imports are
enforced by lint and pass.

## Scores at a glance

| Route | Score | One line |
|---|---|---|
| `/` | 7 | The strongest page. Varied, rhythmic, and the approved bands hold. Two placeholders weaken the top half. |
| `/services/product-design` | 7 | Q1 and Q7 landed well. What-you-get's titles and the dev captions in Industries let it down. |
| `/case-studies` | 7 | A rich, image-led listing with three group shapes. The testimonials band is back (Q4). |
| `/about` | 6 | Good bones. The portrait placeholders look broken, and two OfferSheets read the same. |
| `/contact` | 6 | The peer halves work. The page ends in three text bands, and the steps split a sentence. |
| `/insights` | 5 | The finder works, but each shelf mixes three card looks and leaves a hole in its third track. |
| `/services` | 5 | The router table is right. The hero is a 7-line h1 beside a dev-caption placeholder, and one case has no cover. |
| `/expertise` | 5 | Product-types is a fine set, but 5 of its 12 photos are dev-caption placeholders. |
| `/audits` | 5 | The table is right. The `prototype` band is one lonely row. |
| `/tools` | 4 | The card art is a big Solar icon on half a texture, and five same-shaped bands. |
| `/glossary` | 4 | Seven text bands in a row, with no visual relief anywhere. |

## Cross-site must-fix (cause first; each one fixes several routes)

1. **Developer text shows to visitors.** Every unbound studio-photo slot prints *"FALLBACK, not a slot: what a page
   shows where its copy (26 Oct 2026) needs an image this register has no row for yet."* The cause is
   `src/lib/placeholders.generated.ts:20`: the register's generic fallback carries its internal note as the visible
   caption. It shows on the heroes of /services, /expertise, /audits, /tools and /glossary; on 4 of 12 Industries
   cards on /services/product-design; on 5 of 12 product-type cards on /expertise; on PropTech on /audits; and on
   the Gold Image Printing cover on /services. **Fix:** the fallback renders the same presentable
   `IMAGE TO COME · <kind>` panel as a registered row, with no sentence, or gets a row per slot. The 4 sector
   photographs are still owed (§ E).
2. **The same case shows a cover on one page and a placeholder on another.** Home shows Auxentios as "IMAGE TO
   COME", yet /services/product-design shows a real Auxentios screenshot. /services shows Gold Image Printing as
   the dev fallback, yet /case-studies shows its real tablet photograph. The cause is in `coverFor`
   (`src/templates/CorpusPage/images.ts:75`), which resolves page binding → `caseRef.cover` → placeholder. The
   home and /services refs reach no cover. For Gold Image Printing the copy links the live Strapi slug
   (`boosting-web-to-print-…`), while the case fixtures use `gold-image-printing-web-to-print-erp-modernisation`
   (307 to the live slug), so the ref does not match. **Fix:** resolve a case's cover by the case, through the
   redirect/alias table in `routes.ts`, the same way the /case-studies listing does. That gives one cover per case
   on every route.
3. **On a phone, `Reasons beside` renders the same as `Reasons open`.** At 390 both stack each item as copy with
   the figure at the right. On every offer page and hub, How-we-work-together (open) sits directly on Why Tcules
   (beside), so the phone shows one shape twice in a row. That is the exact failure Q1 was answered to prevent.
   The cause is the `Reasons` pattern's phone tracks: `beside` changes only the head placement, which collapses
   below `md`. **Fix:** under `md`, `beside` puts the drawing above its words (glyph → title → body, as the "icon
   heads its card" rule wants anyway), or `open` does. One of the two must change silhouette on a phone.
4. **The `open` Reasons item is cramped at 1440.** Each item puts its copy in a ~185px track beside its figure, so
   titles break into four-word stubs ("A focused / engagement.", "Products / customers rely on"), and the band's
   action floats mid-height on the right, detached from the lead. This is approved (PR #161), so it is an owner
   note rather than a change. If the owner agrees, the smallest fix is a wider copy track (figure narrower) and the
   action set under the lead, as `beside` already does.

## Per route

### `/` (score 7)
The order is hero · logo wall · situations · One-studio bento · selected work · Why Tcules (open) · quotes on tint ·
engagements (beside) · people Banner · AI Banner · insights rows · sector photos · island · FAQ. The squint reads
as many ideas, and Q1 is applied correctly (Why Tcules open, engagements beside).

Must fix:
- **Hero.** The illustration is still a placeholder panel, so the fold is half an empty grey box (expected; Bhumika's
  illustration).
- **`selected-work`.** The Auxentios cover is a placeholder while product-design has a real one (cross-site 2).
- **`product-design` (One studio).** The lead's two paragraphs are set as two side-by-side body columns over the
  bento, so they read as a split rather than a lead. Cause: the C11 head renders `lead` in a 2-track Layout. Fix:
  one lead column at the head's measure, with the paragraphs stacked (`rowGap="text"`).
- **`testimonials`.** Three of six quotes carry a portrait and three do not, so the wall looks unevenly finished.
  Cause: portraits are present only for some fixture rows. Fix: show none until all are in, or supply all six (an
  owner call).

Notes: the people and ai-native Banners sit together, "photo, photo" (Q17, accepted for tomorrow). The ai-native
photograph is a placeholder. At 390 the bento is four tall tiles with mostly empty texture, which is long but
acceptable.

### `/about` (score 6)
Must fix:
- **`leadership`.** The ProfileCard portraits are 80px placeholder squares with unreadable 6px "IMAGE TO COME" text,
  which look like broken images in front of Jatin. Cause: the placeholder panel is rendered at avatar size. Fix:
  at avatar size a placeholder shows initials or a plain ground, with no caption. Better still, supply the two
  portraits.
- **`difference` (3 + 2) and `how-we-work` (3 + 3).** Both are `OfferSheet` with the same blue-tick rule head, three
  bands apart, so the page shows one text look twice. `difference` also leaves a hole in the sixth cell. This is an
  owner call: per § E it is the accepted default. The better fix is `difference` as a DataTable (Tcules vs the named
  studio per row). It is a comparison, and a table is visual by the plan's classing.
- **`who-uses-tcules`.** The GT Tools cover is a Strapi screenshot dominated by an outlined "HEADER" word, which
  reads as a template. The Omny AI cover is a placeholder. Content: ask for a GT Tools crop.

Notes: `leadership-2` reuses the home team photograph (the same image on two pages; Q13 leaves `about_work_wall` and
`about_studio_review` unused). The close is `CtaSection open` on tint after a paper FAQ, which is legal.

### `/contact` (score 6)
Must fix:
- **`brief` + `next-steps` peer halves (Q18 default applied).** Step 01 reads "**We read your message**" as a title,
  then "and a senior designer writes back…" as a lowercase body: one authored sentence cut into a heading and a
  fragment. Cause: Steps (and OfferSheet) promote a bold lead to the title even when the lead does not end a
  sentence. Fix: when the bold lead has no terminal punctuation, render it run-in (bold inline in the body), not
  as a title. Words unchanged.
- **Rhythm.** After the halves come the testimonials (text, tint), `confidentiality` (text, a head beside one muted
  paragraph) and the FAQ (text): three text-heavy bands. Fix: `confidentiality` as the G20 `Callout` with its
  glyph (the plan's own mapping, not yet applied). That gives the close one shaped object.
- **Nav.** "ABOUT" is highlighted on /contact. Cause: the active-section match in SiteNav treats /contact as under
  Company/About. Fix: no active item, or Contact's own.

Notes: the hero has no image, so its right half is empty. That is accepted for a contact hero, but it is the only
hero like that among the tier-A routes.

### `/services/product-design` (score 7)
Q1 is applied (engagements open, Why Tcules beside). Q7 is applied: `Bento tracks={4}`, 4 + 3, with the closing
paragraph as the eighth text cell, and the two new scenes (New Product Design, UX & Product Audit) are drawn and
sit well. The squint reads covers · drawn promises · photo + rows · bento · quotes · drawn · drawn · photo cards ·
island · FAQ.

Must fix:
- **`what-you-get`.** Item 1 is a title ("A tested brief") plus a 14px body. Items 2–5 have no bold lead, so their
  whole sentence renders in the **title** role (20px, up to five lines). The set reads as one card and four
  shouting paragraphs. Cause: `OfferSheet` maps an un-led item's text to `title`. Fix: an item without a bold lead
  renders its text in the body role under the scene (or the set takes `title` only when every item has one). Words
  unchanged.
- **`industries`.** 4 of 12 cards show the dev fallback caption (cross-site 1). The sector photos for PropTech,
  ClimateTech, Content platforms and EdTech are owed.
- **On a phone**, `how-we-work-together` and `why-tcules` render as one shape twice (cross-site 3).

Notes: `hard-parts` uses the Doodle case artefact as its full-width photograph, and Doodle is not among this page's
three cases, which is fine. The Clutch line is a RatingBadge footer (Q3 default).

### `/insights` (score 5)
Must fix:
- **Every shelf mixes card variants.** A covered piece is a borderless tile (image, then text). A piece with no
  cover is a **hairline-boxed card** with a 10px glyph and ~140px of empty top. The SaaS shelf switches to a third
  look, ruled text rows with a format eyebrow. This breaks "card variants stay distinct; never hybridise borderless
  tile + hairline card". Cause: the Teaser's no-media fallback in `ListingIndex` draws a box to hold the cover's
  height. Fix: a no-cover piece in a covered shelf takes the same borderless tile with a drawn/placeholder cover at
  the same ratio; or a shelf with any un-covered piece renders entirely as the ruled-row variant. Never mix the two.
- **Two-piece shelves sit in a three-track grid**, so four of five shelves have an empty right third. Fix: a shelf
  sizes its tracks to its count when it has fewer than three (`across={2}` at the wider tile).
- **Phone: the `formats` table** keeps three columns at 390 and clips the third under a sideways scroll. Fix:
  DataTable's stacked phone form (key → rows) for this table, or drop to two columns (Format · What you will find)
  below `md`.

Notes: the Q5 finder is in place and the rail works. Covers are missing for the new pieces (expected). Q8 is at its
default: the reader-segment sentences are not shown. Group heads are ~h2 size. The 22 Oct h3 ruling is superseded
and back to proposed, so there is nothing to apply.

### `/case-studies` (score 7)
Q4 is applied: the testimonials wall (5 quotes, Clutch footer) sits before the island. Featured CaseCards on their
grounds, then rows (MVPs), 2-up large covers (established), 3-up (AI) and 2-up (built). The variation is good and
the images carry it.

Must fix:
- **Hero.** The record renders as a mono run-on line ("FOUNDED 2017 · MORE THAN 90 PROJECTS · …"), while every
  other hero sets figures. "Presentation is designed (stats → figures)". Cause: the ListingIndex hero has no
  `stats` slot. Fix: pass the record to the same figures row the CorpusHero uses, or drop the line here, since the
  hero lede already sells it (owner call).
- **Placeholders.** Vovisto (rows) and CuramCare (built, 2-up large: the biggest placeholder on the page). For
  CuramCare, consider the row form until a cover exists. The copy calls it "Case study coming soon", and § E notes
  the card has no link.

Notes: "Best for" is kept as a meta line (Q9 default). BY STAGE / BY INDUSTRY is a re-sort of the same set, not a
tab hiding cards. The testimonial wall's 3 + 2 leaves the bottom-right empty, which is acceptable.

### `/services` (score 5)
Must fix:
- **Hero.** The h1 "UI/UX design services and software development for new and established products" breaks into
  **7 lines** of display in the half-width title track, so the hero is 1260px tall and the router sits two screens
  down. Cause: the CorpusHero `beside` title track caps the display measure at half the column regardless of
  length. Fix: a long title (over ~60 characters) takes the hero's full-width title row with the media below or
  beside the lead, or the display step drops one size. A global rule in CorpusHero, not a one-off.
- **Hero media** is the dev fallback (cross-site 1).
- **`selected-work`.** Gold Image Printing has no cover (cross-site 2), and ConnectX's cover is a grey-framed
  screenshot that reads darker than its neighbours.

Notes: `service-guide` as a DataTable with linked keys is right (Q6 default) and reads well. The shared offer bands
are as product-design, including cross-site 3 on a phone.

### `/expertise` (score 5)
Must fix:
- **`product-types`.** 5 of 12 cards are dev-caption placeholders (Content, EdTech, PropTech, ClimateTech; cross-site 1).
- **Hero.** Dev fallback media, and the h1 breaks "expertise" onto a line of its own (the long-title rule in the
  /services item would fix both).

Notes: the closing `services` icon set (glyph above title, 4 × 2) is clean and light, a good shape after the photo
grid. `product-types` at 2354px is the page's whole middle: fine, it is the job of the page.

### `/audits` (score 5)
Must fix:
- **`prototype`.** One ListCard row (title left, 14px body right) under a head and lead: ~500px of band for one item.
  It reads as a stub. Q6 default: a single horizontal `BlockCard` with the audit's scene would carry it. The
  Prototype Readiness scene exists on the tools page's card set, so reuse that drawing.
- **Hero media** is the dev fallback.

Notes: `choose` as a DataTable is right. Industries is 3-across here (6 links), so it differs from the 4-across
elsewhere, which is correct by count.

### `/tools` (score 4)
Must fix:
- **Card art.** Every tool card is a hairline box with one oversized Solar glyph in a corner and a dot texture filling
  a seemingly random half or strip. It reads as unfinished rather than drawn, and the texture has no reason to be
  where it is. Cause: the G23 card set uses `sketchForRoute`/glyph as art, with the texture as a stand-in ground.
  Fix: draw the tool scene in the kit Sketch style (the product-design deliverable drawings are the bar). If that
  can't happen by the freeze, use the borderless icon set (glyph heads the card, as /expertise `services`), not a
  boxed panel.
- **`modernisation`.** One card renders as a box-left / text-right split while its siblings stack, so the same card
  takes two shapes on one page. Fix: a single-item set takes the stacked card at the set's track width, like the
  others.
- **Rhythm.** ai (cards + table) · compare (table) · design-systems (cards) · modernisation (card) · prototypes
  (card): five bands of one shape (flagged in § E). Fixing the art fixes most of it.
- **Hero media** is the dev fallback.

### `/glossary` (score 4)
Must fix:
- **Seven text-heavy bands in a row** (how-to-use, five term groups, FAQ), which breaks "no two text-heavy bands in
  a row" six times. The term rows are good typography, but the page has no shape. Fix, without new art: set
  `how-to-use` as a `Callout` or a 3-step `Steps` (its three paragraphs are three instructions), and give each term
  group head its group glyph (the AI, design-systems and code glyphs exist), so the bands alternate icon-led and
  plain. A real fix needs a visual every second band: an owner decision for a tier-B page.
- **Hero media** is the dev fallback.

Notes: the definitions start lower-case ("working software built…"). That is authored, and it reads as a run-in
after the term, which is fine. The terms are links, but the rows carry no link cue (no arrow, no hover move). Add
the ListCard `cue` so it is clear they open term pages.

## Rule compliance

- **Tokens:** `tokens:check` passes (all vars resolve, no hex, no raw px in modules, layers registered).
- **Imports and tiers:** lint passes with 0 errors (`no-restricted-imports`). There are 31 unused-variable warnings,
  e.g. `ROUTES` in `src/templates/ServicePage/ServicePage.tsx:9`. These are cosmetic; clean them before the PR.
- **Arrangement:** in the branch's CSS diff, `src/components/Chip/Chip.module.css` adds `.index { display: flex }`
  for the rail's index-look option (one face in a control, sizing rather than arranging). It is borderline. Say so
  in the comment, or use `display: block` on the face, which already sets `display: block`. The negative
  `margin-*` in the IRL controls is an argued ring-room optical correction with its comment. There are no new child
  margins.
- **Display type:** heroes only. The `CtaSection open` close heading is `--text-h1`, which is legal.
- **Body sizes:** card bodies are 14, body 16 and quotes 18, as ruled. The exception is the what-you-get item titles
  above.
- **Two tints touching:** none. About's tint testimonials → paper FAQ → tint close is legal.
- **Hover:** not exercised in captures. No keyframe or fade was seen in the CSS diff.

## For the owner (open, not blocking tomorrow)

- Placeholders still in view: the home hero illustration, the ai-native photo, 2 portraits, the Auxentios/Omny
  AI/Vovisto/CuramCare covers, 4 sector photos, and 5 hub hero images. Cross-site 1 makes them presentable;
  supplying them is § E/C1.
- Q17 (photo, photo on home), Q13 (unused about photographs), Q11 (/how-we-work, not reviewed) and Q15 (two
  Industries looks by count: here 4-across photo cards everywhere they fit) are at their defaults.
- The cut list (§ D) is untouched, as instructed.
- The Reasons `open` cramping (cross-site 4) belongs to an approved composition, so it is shown for a decision, not
  changed.

## Fixes applied

Applied on `feat/new-copy` on 29 Oct, after the critic pass. Each must-fix item is fixed where it is caused
(a component, a token, the content seam or a plan rule), with the smallest change that fixes it. Approved
compositions are unchanged. Format: note → cause → fix. Items that were not changed are listed afterwards,
each with the reason.

### Cross-site

1. **Developer text in image slots** (hub heroes, Industries, product types, PropTech, Gold Image Printing) →
   `scripts/placeholders.mjs` drew the register's FALLBACK row note as the panel's brief → the generator
   now draws only the head on a FALLBACK row (`IMAGE TO COME · STUDIO PHOTO`), regenerated. Every
   unregistered slot now shows the same plain panel as a registered row. The sector photographs are still
   owed (§ E).
2. **One case, two covers** (Auxentios on home, Gold Image Printing on /services) → case refs carried only
   the case page's corpus binding, and home passed no refs at all → `getCaseRefs` (content seam) now also
   reads the live case's Strapi thumbnail, matched through `CASE_SLUG_REDIRECTS`, and adds it as
   `CorpusCaseRef.thumbnail`. `coverFor` resolves in this order: the page's binding, the case's binding,
   the case's thumbnail, then the placeholder. The home route now reads its case refs, and `SelectedWork`
   passes each case's ref (`caseRouteOf`, lib). Both covers now render: Auxentios on home and the tablet
   photograph on /services.
3. **`beside` Reasons looked like `open` on a phone** → `Reasons` set the `beside` item as copy with the
   drawing at its side below `md` → a `beside` item is one track at every width, with the drawing above
   its words (`.figureAbove` is no longer behind a media query). On every offer page and hub, the phone
   now shows two different shapes.

### Per route

- **`/` One studio**: the lead's two paragraphs sat side by side → `OneStudio` set them in a 2-track
  Layout → they are now one stacked column (`rowGap="text"`).
- **`/` testimonials**: 3 of 6 cards had portraits → `TestimonialWall` showed whatever each card had →
  a wall now shows portraits on every card or on none, so all six show none until the last portrait
  lands. This rule is global to every wall.
- **`/about` leadership**: 80px placeholder panels with unreadable labels → the template passed a
  labelled register panel at avatar size → `ProfileCard` with no portrait now shows the person's initials
  on a plain ground in the portrait square (new tokens `--pfc-initials-*` on every surface). The about
  template no longer passes a placeholder there.
- **`/contact` next-steps**: "We read your message" was a title over the lowercase body "and a senior
  designer…" → Steps promoted a bold fragment to the title → new `sentenceLead` (text.ts). Where a bold
  lead has no end punctuation and the body runs on in lower case, the title takes the rest of that first
  sentence: "We read your message and a senior designer writes back." The words are unchanged. This
  applies to every Steps mapping (`ContactPage`, `stepOf`).
- **`/contact` rhythm**: confidentiality was a muted sentence, the third text band in a row → `Callout`
  had no way to carry a mark → new `Callout icon` slot (glyph, then key, then sentence, each on its own
  row). The confidentiality note now carries `shield-check`. It is a light touch. If the owner wants a
  heavier object, that is a design call.
- **`/contact` nav**: ABOUT was lit → About's `matchPaths` in the nav fixture included `/contact` → it no
  longer does. The bar's own "Start a project" action is the way to the contact page.
- **`/services/product-design` what-you-get**: four 20px five-line "titles" → `sheetItem` promoted an
  un-led item's whole sentence to the title → `OfferSheetItem.title` is now optional. A list item with no
  lead is a statement in the body role, and a set is titled throughout or not at all (`sheetParts`). The
  drawings stay, matched by the item's words. This applies to every OfferSheet built from a list.
- **`/services`, `/expertise`, `/glossary` heroes**: a 7-line (and a 5-line) display h1 in the half-width
  track → CorpusHero always put the title in the copy track → new `PageHero titleAcross`. The eyebrow and
  title read across the column above the `beside` split, still at display (owner, 29 Sep: display on
  every hero), with the lead, actions and figures beside the media under it. CorpusHero turns it on when
  a title would set five or more display lines in the half track (a word-wrap estimate at 18 characters
  a line, measured against /services 7, /expertise 5, /glossary 5, product-design 4, /tools 4, /audits 4).
  Results at 1440: /services 7 → 3 lines (hero 1262 → 1007), /expertise 5 → 3, /glossary 5 → 3. The
  approved product-design hero (4 lines) is unchanged. Other offer pages whose titles cross the line,
  e.g. /expertise/healthtech, now take the across head too.
- **`/insights` shelves**: three card looks → a shelf with no pictured piece fell back to ruled
  ListCard tiles, the rows that 2026-10-29-pictureless-piece-is-a-panel-card dropped → every shelf now
  uses CardGrid, so a piece without a picture is the ruled panel card in every shelf. One look for a
  covered piece and one for an uncovered piece, as that ruling sets.
- **`/case-studies` CuramCare**: the largest placeholder on the page, unlinked → a case listed before its
  page exists took a cover card → in a covers group, an unlinked case now reads as a plain row under the
  group's cards (`CaseGroupShape`). The built group is now three real covers, then the CuramCare row.
  In a group of rows it keeps its place. Vovisto, in the rows group, is unchanged.
- **`/audits` prototype**: one row under a full-width head (~500px for one item) → `RelatedBand` always
  set the head above → a related band with a single entry now sets it beside its head
  (`ContentSection arrangement="beside"`), so the band is one head tall.
- **`/tools` card art and modernisation**: a boxed Solar glyph on a texture, and a single card in a
  box-left/text-right split → `DirectoryBand` used texture stand-in covers and a horizontal card for a
  group of one → every tool group is now the borderless icon set (glyph, then title, then body), as
  /expertise `services` is, two across. A single tool is the same card at the same track width. The
  tool scenes are still to be drawn in the Sketch style, which would also fix the run of one shape.
- **`/glossary` how-to-use**: the first of seven text bands → the band was planned as `text` → it is
  planned as `method`, and `MethodBand` now sets 2–5 plain, link-free paragraphs as numbered Steps (first
  sentence as the title, the rest as the body, every word kept). Only this band takes that path today;
  every other method band has a list or bold claims.

Specimens: `/design/callout` (icon), `/design/offer-sheet` (2b statements), `/design/page-hero` (2c
titleAcross), and `/design/profile-card` (P.2 now the initials state).

### Declined, with why

- **Home hero illustration**: Bhumika's illustration is in progress. Nothing to change in code.
- **`/about` difference as a DataTable**: an owner call. § E's default (OfferSheet) holds until the owner
  rules.
- **`/about` GT Tools cover, Omny AI cover, `/case-studies` Vovisto**: content. A GT Tools crop and the
  covers are owed.
- **`/insights` two pieces in three tracks**: 2026-10-29-listing-cards-topic-tag-three-tracks (active) says
  "a card grid is always three tracks: two pieces take two of the three, never halves" ("The grid should
  never be 2 cols").
- **`/insights` a no-cover piece as a borderless tile with a placeholder cover**: 2026-10-29-pictureless-piece-is-a-panel-card
  (active) makes the panel the card for a piece without a picture beside covered ones. The third look (the
  ruled rows) is what was removed above.
- **`/insights` formats table on a phone**: DataTable's contract is "a table at every width … the body is
  never re-laid out as a stack" (owner, 7 Oct, tables are boxed). It scrolls sideways with an edge fade,
  and two columns would drop a column of authored words.
- **`/case-studies` hero record as figures**: the masthead's one mono record line is the approved
  listing opening (beauty round 4, 16 Oct). It conflicts with the standing "stats → figures" rule, so it
  is left for the owner to decide.
- **`/audits` prototype as a BlockCard with "the Prototype Readiness scene"**: no such scene exists. The
  tools cards were glyphs, and the only prototype drawing is an article cover (`prototype-to-production`).
  Reusing it is a keyword-mapped stand-in, which the owner has ruled out. The beside head above is the
  fix without new art.
- **`/glossary` link cue on term rows**: ListCard has "no arrow cue (owner, 7 Oct 2026)". The row's hover
  is the link cue. A group glyph on each term head needs new glyph assignments: an owner decision for a
  tier-B page.
- **Reasons `open` cramping (cross-site 4), the Q17 photo pair, the contact hero with no image**: owner
  notes on approved compositions. Not changed.
- **`sentenceLead` on OfferSheet bold leads** ("**Questions for your specialists** on accuracy…" on the
  audit pages): not applied. There the bold lead is a noun phrase that reads as a title. The critic's item
  was the Steps fragment only.

### Gates

`npm run verify` passes (lint 0 errors / 31 pre-existing warnings, typecheck, tokens, classes, specimens,
design, photos, placeholders current, decisions valid). `npm run build` passes, and `npm run aria:check`
passes (112 pages, 1953 idrefs, all resolve). `npm run shots` on all eleven review routes at 1440 and
390 found 22 captures with 0 overflow and 0 page errors. A second run on the changed specimens and on
/contact, /glossary, /tools and /expertise/healthtech also found 0 problems. Band crops were checked by
eye for home selected-work, One studio and testimonials, about leadership, contact next-steps and
confidentiality, the product-design what-you-get, Why Tcules at 390 and Industries, the /services hero and
selected-work, the /expertise hero, the /audits prototype, the /tools bands, the /glossary how-to-use,
the insights SaaS shelf and the case-studies built group.

The new presentation rules (portraits all or none, statement items, the long-title head, a single
related entry beside its head, an unlinked case as a row) are not logged as rulings. They are for the
owner to see in the browser tomorrow, and the owner can promote them with `/decide`.
