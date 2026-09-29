# Service pages, designed from their content

**Status:** proposal for review · 29 September 2026 · feeds tracker 3.1 (section view models) and 3.2
(`ServicePage` template).
**See it:** `/design/service-page`. Each of the six pages opens from there. Add `?slots=1` to see the
images a page is designed to carry but doesn't have yet.
**Built from:** the live CMS content of the six service lines (pulled 29 Sep), without the translation
layer. The copy is the CMS's own wherever possible. Every change is listed per page below.

---

## 0 · Second pass, 30 September 2026

The owner's review of the first iteration, and what changed.

| Note | Change | Where it lives |
|---|---|---|
| Section seams felt crammed | **Global.** The single-seam rule of 2.17 is reverted: same-ground bands keep both paddings, 96 + 96 | `Section.module.css`, Section specimen |
| "Read next" rows looked bad, mid-page | A **Go deeper** resources section before the close: text BlockCards with the content type as eyebrow and a named cta, beside its heading | `resources` block |
| Peridot statements out of place | Removed. Each thesis line became its section's lead; peridot now appears on no service page | `statement` block deleted |
| Run-in list beside a checklist | **Contrast** is one list split into 2–4 columns under one rule, the same row on every side. Design Systems' ownership split became Assess · Build · Operate · Product teams keep | `contrast` block |
| Key + text laid out left and right | **Global.** Callout's key sits above its sentence. Also stacked: the record's field above its question, the ledger's title above its line, the worked example's label above its text, the stat above its sentence | `Callout`, record, ledger, steps, stat |
| Serif titles used as links, in the right half | **Router** is a grid of tiles. The condition is the content and the service is a plain link line at the foot. The audit or self-check leads as a full-width "Not sure yet" tile when it would otherwise leave a hole | `router` block |
| Decorative marks | Each mark was kept only if it says something. **Kept:** the parts bracket, the slice, the bridge's dashed zone, the thread arrows. **Cut:** the per-row disruption meter (it read as progress), the dashed thread and its nodes, the dot on every step's rule, the bridge's dashed bullets | Diagrams |
| Form numerals too loud | **Global.** CtaSection's marker drops from the 40px stat numeral to the 20px index role, on one non-wrapping row with the label. The six closes now list a real two-step sequence (send, then reply) | `CtaSection`, closes |
| Portrait left of name and role; no client logo | **Global.** Proof's client mark is removed. Product Design shows the ch05 **stand-in** portrait until Ashok Mohanty's is supplied | `Proof`, Product Design proof |

Also in this pass, for density:
- Modernisation's "wrong intervention" and "choose an intervention" merged into one section (labels fail, so choose per capability).
- AI Product UX's evaluation became a checklist beside its heading, with approvals as a note, because the old contrast was not two halves of one statement.

The tables in §2 and §4 below describe the first pass. Where they disagree with this section, this
section wins.

## 1 · What was pulling the pages down

Read on the live `/services/product-design` at 1440, and true of all six:

1. **One shape, repeated.** Every section was an h2, a grey lead, then two columns of text.
   Squint and the page is eight identical rectangles.
2. **The translation layer flattens meaning.** Five failures recur:
   - a pull-line authored as a `quote` with no attribution rendered as nothing, or as a quote from nobody;
   - an eyebrow authored as the first line of `rich-text` rendered as body copy;
   - `Start a project` authored as a paragraph rendered as an inline text link;
   - a card grid's closing paragraph was stored inside its last card;
   - every table row repeats its header cell (already logged as strapi-changes §10).
3. **No images at all.** The case studies these pages cite have real covers, and none were shown.
   The service-line illustrations exist (round 1) and weren't placed.
4. **Questions written as sections.** "Does the code ship to production?" and "How should adoption
   be measured?" were each a whole band holding one paragraph.
5. **A close with nothing to act on.** The final band was a heading, a sentence and a disclaimer,
   with no form and no button.
6. **Order carried no meaning.** Seven modernisation interventions and seven AI model roles were
   listed in no order, even though each set is a scale.

## 2 · The approach

The CMS says *what kind of markup* a block is: rich text, card grid, table, quote. The page needs to
know *what job* it does. So each page is authored as a **ServiceStory** (`src/lib/service-story.ts`), a
list of sections where every block names its job, and the template gives each job its own shape.

**The vocabulary** (Blocks.tsx, Diagrams.tsx):

| Job | Shape | Used where the content is… |
|---|---|---|
| `signals` | 2–5 tiles on a top rule: the thing you see (h4), then keyed "may be" meaning | symptoms, viewpoints, pressures |
| `steps` | numbered rail with a node per step; horizontal at five or fewer | a method, where order matters |
| `ledger` | glyph- or number-marked rows or tiles, in 1, 2 or 3 columns | deliverables, dimensions, questions |
| `router` | tiles: the condition is the content, the service a link line at the foot; each tile is one link | "which specialist service is mine" |
| `cases` | `BlockCardSet` with **real covers**, then a scope Callout | client work |
| `proof` | quote beside the case it came from | the testimonial |
| `fit` | check-circle list against close-circle list | "what we need from you / not the right service" |
| `spectrum` | rows ordered on one scale, the order stated once over the list | interventions, model roles |
| `representations` | one decision as the **same chip in every row** | design systems' "Partly complete" |
| `record` | a sheet with a header strip and one row per field | the AI responsibility record |
| `contrast` | one list split into 2–4 columns under one rule | every "where AI changes the work" section; ownership splits |
| `parts` | four peers and a **bracketing frame** beneath them | the five parts of a design system |
| `slice` | layers stacked, with the release cut through all of them | software development |
| `bridge` | two solid ends and a dashed temporary zone between them | modernisation's transition states |
| `thread` | stages joined by arrows, with an optional return path | delivery trace, design-to-code chain |
| `nudge` | a one-line ask between two rules, inside the section that earned it | mid-page CTA |
| `resources` | text BlockCards, content type as eyebrow, beside the heading, once per page | further reading, near the end |
| `faq` | Accordion, heading beside it | the question-shaped sections, gathered |

**Where the brand lets visual weight come from** (ch02, CLAUDE.md § Design quality):
- scale (the statement, the stat, the router's serif destinations);
- imagery (hero illustrations, case covers);
- position (the statement's offset, head-beside-body sections);
- drawing (the diagrams).

Grounds stay out of it. Every page is paper except two tint bands: the proof band on Product Design,
and the close on all six. There is no ink or blue anywhere, because both are reserved and the close
sits above the ink footer. There is no peridot either (removed in the second pass).

**Icons** follow ch04: one glyph per row, in the text's ink, never on a heading, never in a disc. I
added 24 Solar Bold glyphs verbatim from `@iconify-json/solar` (see `glyphs.ts`); 11 of them are
ch04's starter set.

## 3 · Images

**What exists, and is placed:**
- **Hero illustrations, all six.** Round 1 from `docs/illustrations/`, copied to
  `public/illustrations/services/`. These are **placeholders**: round 1 was judged too simple, and round 4
  concepts (`docs/illustration-concepts.md` §1) are the ones to draw. The slot, arrangement (`beside`)
  and export (paper) are final.
- **Case covers, 10 cases.** Real, from the case-study listing, with the same edge as the case-study
  index. No new asset was needed.

**What should exist** (shown with `?slots=1`):

| Page | Slot | Kind | Brief |
|---|---|---|---|
| Product Design | under the method rail | illustration, 16:9 | The reschedule in UI shorthand: the job tile (peridot) moving from blocked to proposed, three dependent tiles previewed dashed, and the owner seat that must respond |
| Product Design | beside the quote | portrait, 1:1 | Ashok Mohanty (and his role: the quote has none) |
| Modernisation | transition section | illustration, 16:9 | Current and target planes side by side, one record converted on one and unconverted on the other, with a dashed compatibility layer between. It replaces the chip bridge if it reads back |

**Asked and answered:**
- *Should the testimonial have an image though there isn't one?* **Yes, a 1:1 portrait.** Proof already
  supports one and has a designed no-portrait state, so the page ships correctly without it. The
  design route now shows the ch05 **stand-in** portrait so the layout can be judged; it is not the
  client and must be replaced before shipping. The quote also stands **beside the Auxentios case
  cover**. Auxentios was
  moved out of the cases grid so its cover isn't shown twice.
- *Illustrations in the body?* Only where a body section argues something the hero doesn't: the two
  slots above. Everywhere else a diagram does the job in type and rules, and costs nothing to produce.
- *Client work in the body?* Yes, where the text already cites a case: the modernisation pair
  (Benchmark Gensuite went deeper, Dealpath stayed selective) and the design-engineering pair. Those
  were paragraphs; now they're cards with covers.
- *Can existing assets be reused?* Covers yes. Client marks no: Auxentios, ConnectX and the other AI
  clients aren't in `public/clients/`.

## 4 · Page by page

Each row gives the CMS shape, what it became, and why. **NEW COPY** marks words I wrote, as opposed to
re-cut; each one needs a content decision.

### Product Design
| Section | CMS | Designed as | Why |
|---|---|---|---|
| Hero | two long paragraphs | lead and body, illustration beside, actions "Start a project" and "UX Product Audit" | the first action scrolls to the form rather than leaving for /contact |
| Screen as symptom | rich-text eyebrow, 4 cards, attribution-less quote | eyebrow; 4 `signals` keyed "May be"; the quote as the page's `statement` | a symptom → hypothesis reading; the thesis gets scale instead of vanishing |
| One decision through the work | intro, 5-item list, quote, "next step" text | lead (from the quote); worked example beside a 5-node `steps` rail; `nudge`; read-next link | the example is set as context rather than as body copy; the ask sits where it's earned |
| What you receive | 5 cards | head beside a glyph `ledger` (widget, document-text, ruler-pen, monitor, code) | an artefact list reads down, not across a grid with a hole in it |
| Specialist services | 5 cards | `router`, condition first | nobody arrives knowing the service name |
| Relevant work | 3 text cards | `cases`: Doodle and Scissors with covers, scope Callout | images, and a title that says what the case shows *here* |
| Client's view | quote | tint band: `proof` beside the Auxentios case | the one band that earns tint |
| Who is involved | paragraph and bullet list | `fit`: 4 checks against 4 crosses | the paragraph was already four needs; now it mirrors the list |

Copy: hero lead tightened; symptom bodies lose their repeated "may be" (it's the key); step bodies
trimmed by a clause each; case titles are **NEW COPY** (e.g. "Priority and bookability, modelled before
they were drawn"); the section lead "One product rule, explained, challenged, implemented and tested"
is re-cut from the quote.

### Product Modernisation
| Section | CMS | Designed as | Why |
|---|---|---|---|
| Hero | 2 paragraphs, the first a list of four viewpoints | lead is the second paragraph; the viewpoints become section 1 | four viewpoints are a shape, not a sentence |
| Four views | (hero copy) | `signals` with glyphs: Sales, Support, Engineering, Customers | |
| Wrong intervention | one paragraph of four failures | 2-column cross-marked `ledger` | four claims read as four claims |
| Choose an intervention | 7-row table, unordered | `spectrum`, least to most disruptive, with meters | the table was a menu; ordered, it's the page's argument |
| Continuity | 6-item bullet list | 3×2 glyph `ledger`, then a "Why record it" note | |
| Diagnose | 3 paragraphs naming two cases | two `cases` with covers and the `statement` | the paragraphs were case studies without their images |
| Transition | 7-item list | `bridge`: current, dashed temporary zone, target | the states literally sit between before and after |
| How it comes together | 7 bold-led bullets | head beside a numbered `ledger`, with an ownership note | |
| AI | 2 paragraphs | `contrast`: what AI accelerates against what a person still decides | the same shape on all six pages, so it reads as one recurring stance |
| Assessment or delivery | 3 paragraphs naming 4 routes | `router` | |
| Ownership and acceptance | 2 h3s in rich text | `faq`, plus "What do you need to start?" (re-cut from the assessment section) | |

Copy: section headings for four views, intervention, diagnose and choose are **NEW COPY**; the four
viewpoints and continuity lines are re-cut.

### Design Systems
| Section | CMS | Designed as |
|---|---|---|
| Library as one representation | paragraph with 4 failures and 6 questions | 4 `signals`; `statement` ("the supported route is easier"); the 6 questions as their own numbered section |
| Five parts | 5 cards, trailing paragraph inside card 5 | `parts`: 4 peers and the Operating model as the frame beneath; the trailing paragraph as 3 cross-marked lines |
| One decision | 6-row table | `representations`: the "Partly complete" chip in every row, on a thread |
| Choose the responsibility | 5-row table | `router`, with the Audit as the `also` route |
| How Tcules shapes / Released system needs ownership | 2 sections of prose | one `contrast`: "Tcules can own" (13 terms) against "Product teams keep" |
| Evidence | 3 text cards | `cases` Auxentios and Doodle with covers; Matter as a read-next link (it has no cover) |
| AI | 2 paragraphs | `contrast` |
| Adoption / start / Figma first | 2 prose sections | `faq`, 3 questions |

Copy: signal titles ("One name, two behaviours", "A version nobody runs") are **NEW COPY**; the
CMS typo "Ignoring one product" is read as "Ignoring one part".

### AI Product UX
| Section | CMS | Designed as |
|---|---|---|
| Model roles | 7-item list and 3 example sentences | `spectrum` ordered by authority |
| Authority | 2 paragraphs | 4-step rail (Inform, Suggest, Prepare, Execute) and `statement` ("per action") |
| Responsibility record | 2-column table | `record` sheet, head beside it, a glyph per field |
| Evaluation | question heading and paragraph | `contrast`: 7 tested conditions against who approves |
| Product responsibility | 8-item list and "12 AI products" sentence | a stat (12) and a numbered 2-column `ledger` |
| Evidence | link group, no images | 4 `cases` with covers, ConnectX featured; the "AI-assisted delivery" section as its scope note |
| First decision | paragraph naming 4 routes | `router`, with the Readiness Check as the `also` route |

**NEW COPY, needs a content decision:**
- The CMS gives "what the product needs" for three of the seven roles (drafting, recommendation,
  action). The other four rows, and every "Introduces" cell, are mine.
- The four authority step bodies are mine.
- The "12" is a claim with no checked date, so it is rendered as a stat and not a `Proof` figure.
  Proof requires `checkedOn`.

### Design Engineering
| Section | CMS | Designed as |
|---|---|---|
| Hero | 2 paragraphs, the first a list of 5 pressures | lead and body; the pressures become 5 glyph `signals` (database, lock, clock-circle, smartphone, code) |
| Code answers | 2 paragraphs and 6 bullets | `contrast` (static screens against a coded slice), then 6 numbered questions |
| Its job is declared first | one sentence naming 4 levels | 4-step rail: proof, system, slice, candidate |
| Three ways in | 3 cards of 2–3 paragraphs each | 3 glyph tiles, then the two cited cases with covers |
| One decision | paragraph | `thread` of 6 stages and `statement` |
| AI | 3 paragraphs | `contrast` and "For AI products" note |
| Leaves behind | 9 bullets | 3×3 glyph `ledger` |
| First slice | 3 paragraphs naming 5 routes | `router` with the Audit as `also` |
| Production? / Real delivery context | 2 sections | `faq` |

Copy: step bodies and the "Five pressures" heading are **NEW COPY**. The implementation-QA
classification list (five kinds of difference) was dropped from the tile body for length; restore it as
a note if it's wanted.

### Software Development
| Section | CMS | Designed as |
|---|---|---|
| Hero | one paragraph ending in a list of 9 disciplines | lead and body, with the disciplines as Tags in the hero's extras slot |
| What changes | 6 bullets | numbered `thread` with a line each |
| Responsibility options | 3 cards, trailing paragraph naming 6 routes | 3 numbered tiles; the routes as their own `router` section |
| Release slice | paragraph and 3 bullets | `slice` through 5 layers, and 3 acceptance levels with glyphs |
| Delivery trace | 2 bold-led paragraphs | a 9-stage `thread` with its return path |
| Ownership / control / includes | 3 prose sections | 6 glyph tiles, then `faq` (control, infrastructure and SLA, accessibility) |
| AI | paragraph | `contrast` |
| Evidence | 2 paragraphs naming 3 cases | `cases` with covers |

Copy: router conditions are **NEW COPY** (the CMS names the six routes with no condition); every
thread line is mine; "Before you sign" and "Every stage cites the one before it" are **NEW COPY**
headings.

## 5 · Rules bent, and why

| Rule | Where | Argument |
|---|---|---|
| Layout rule 1 (no hand-rolled flex/grid) | bridge end label (`grid` to centre) | it is the inside of one mark, not an arrangement of siblings |
| Components own no ground | the `record` sheet paints `--svc-sheet-ground` | a record is an object the team keeps; the sheet is what says so |
| One layer per component | `service-page.css` serves every composition | they live and die together as the template's vocabulary; a composition that graduates to a pattern takes its tokens with it |
| Types live in `@/content` | `src/lib/service-story.ts` | content and templates can't import each other, and one definition beats two copies of a 25-case union |
| Headings aren't actions | router destinations are sans link lines, not serif titles | owner, 30 Sep |

## 6 · What this means for the CMS

The shapes above are a proposal for **tracker 3.1**: section view models named for their job. The
matching Strapi recommendation is `docs/strapi-changes.md` §15. The translation-layer failures in §1
stop being translation problems once a block says what it is for.

## 7 · Open decisions for the owner

1. **Adopt the vocabulary as 3.1/3.2?** The template is built; wiring it to Strapi is the remaining work.
2. **The NEW COPY items** in §4. Accept, rewrite, or send back to content.
3. **Illustrations:** draw the round 4 concepts for the six heroes, plus the two body slots in §3.
4. **Portrait and role for Ashok Mohanty**, and client marks for the cited clients.
5. **Broken case links in the CMS.** The live pages link Auxentios to `/case-studies/cpq-software-mvp-ux`
   and Novus to `/case-studies/ai-market-research-automation`, and neither slug exists in the listing.
   The designed pages use the listing's slugs.
