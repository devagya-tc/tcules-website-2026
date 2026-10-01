# Service pages, designed from their content

**Status:** proposal for review · 29 September 2026 · feeds tracker 3.1 (section view models) and 3.2
(`ServicePage` template).
**See it:** `/design/service-page`. Each of the six pages opens from there. Add `?slots=1` to see the
images a page is designed to carry but doesn't have yet.
**Built from:** the live CMS content of the six service lines (pulled 29 Sep), without the translation
layer. The copy is the CMS's own wherever possible. Every change is listed per page below.

---

## 0 · Third pass, 1 October 2026 — causes, not symptoms

The owner asked for the underlying issue behind each note before any fix. Five notes, four causes.

| Note | Underlying issue | Fundamental fix | Where it lives |
|---|---|---|---|
| Testimonial "too big and too condensed" | **Size was chosen by importance, not by length and width.** The display quote was 43px, h2 scale, the same size as the heading above it. Brand ch03 has one quote role, 28. And the figure was capped at `--measure-body` in the *body* font, about 640px, so 43px italic set about 30 characters a line. References (Vercel, Pentagram, YC, thoughtbot, Figma) set a lone quote at 27–34px across 800–960px, and a quote beside anything at 16–22px | **Global.** Display quote 34 / 28 / 22 at `--measure-lead`; no measure on the figure; a quote beside something is `compact` (28). Optional `quote.source` link in the attribution row. Product Design: compact quote beside the Auxentios case, a split, tops aligned | `Proof`, `--text-quote-lg`, Proof.md amendment |
| "Go deeper": heading left, two cards right | **`beside` was chosen to vary the silhouette, not by how the body reads.** A head beside its body only works when the body reads *down* (a list, an accordion, a sheet), so the head labels one long column. A row of peer cards reads *across*: the head became a third column, and the cards took their width from the two-thirds track, not from the page's grid | **Global rule** on ContentSection's `arrangement`: `beside` only for a body that reads down. Resources always sit on three tracks, so two cards are two grid cards, not two halves | `ContentSection` prop doc; `resources`; six fixtures |
| Strong splits want 96, not 64 | **One step was doing two jobs.** `--gap-column` (64) served both *peers* (two lists, the sides of a contrast) and *splits* (copy beside a form, an image, its body, a case). A split is two kinds of thing sharing a row, in effect two sections side by side | **Global.** The scale names the difference: peers take `column` (64), splits take `section` (96). Applied in every pattern that owns a split: PageHero, ContentSection, CtaSection (form and proof), Proof, SiteFooter (both rows), and the template's proof band | CLAUDE.md § gap scale rule 2; `primitives.css`; five patterns; specs |
| Specialist services uses bespoke components | **The vocabulary was designed job-first, so every job drew its own item.** Signals, Steps, Ledger and Router are four jobs and *one* item: marker, title, line, sometimes a destination. ListCard couldn't make a grid item, so the template made four. That is the 111-sections failure in miniature, inside one template file | **ListCard gains a `tile` form** (rule opens the item, marker above, flush with the track) and an optional `body`. The four jobs are now compositions: the job picks the set (columns, ordered or not, which marker), never the item. Router is ListCard rows; the worked example is a Callout | `ListCard` (spec amendment, specimen § 1b), `Blocks.tsx` |
| Image slot briefs say how the image is drawn | **The slot skipped the message.** ch05 §4 starts every image with its message; the slot was one `brief` of drawing instructions in the illustration system's own vocabulary ("UI shorthand", "peridot"), written for an illustrator rather than for the person deciding if the image is worth making | **The slot type changed:** `message` (what a reader should understand), `shows` (what's in it, named as things in the page's story), `placement` (why here). Drawing belongs in the illustration concept, after the message is agreed | `StorySlot`; both slots rewritten |

Second batch, same day:

| Note | Underlying issue | Fundamental fix | Where it lives |
|---|---|---|---|
| Modernisation: "ordered from least to most disruptive" looks bad | **The order is the argument, and only a caption encoded it.** A reader had to be told in a sentence what the rows should have shown. The first meter was cut because a filling bar reads as *progress* | A **Disruption** column with a meter drawn for that one meaning: six parts of the current product on a line; a disturbed part is knocked loose — lifted, tilted, emptied. None loose for "Leave unchanged", all six for "Retire". The caption goes when a meter is present; the row states its level in words for screen readers | `spectrum.meter`, `DisruptionMeter` |
| "The transition is part of the product" reads as boxes and text | **Nothing in the drawing encoded time or direction.** A transition is the old product still running while the new one starts; the in-between is their *overlap*, and the drawing never showed it | A three-phase timeline — Before · During the move · After. Current runs solid, then dashed ("still running"); target starts dashed ("already running"), then solid. The temporary states sit under the overlap, because they exist only there. Stacks by phase on a phone | `Bridge`, `bridge.phases` |
| Accordion is jumpy (global) | **An old trade-off that no longer holds.** Height animation was ruled out because faking it on `<details>` costs native behaviour. CSS now animates the native element (`::details-content`, `interpolate-size`) | 240ms ease on the answer's height and opacity, and on the question's inset; reduced motion is instant; unsupported browsers open at once, as before | `Accordion`, spec §13 |
| Form labels, "optional", errors, reserved hint space | **One anatomy for every field.** Every field got a label, an optional mono flag and an always-reserved message row, whatever it did. The URL field only had an error row because it rejected anything without `https://` | **A field contract**, recorded in the component: label is the noun; "(optional)" inside the label, quieter; a hint row only when there's a hint; a message row only when the field validates; errors say what to do in a few words; normalise rather than reject (URL gets `https://` added) | `EnquiryForm` `FieldGroup`, spec amendment |

Third batch, same day:

| Note | Underlying issue | Fix |
|---|---|---|
| Text selection should be peridot (global) | — a shell decision, not a component's | `::selection` peridot-500 under neutral-950 on every surface, in `globals.css` |
| Process items should run vertically | **A row is how these pages show peers.** Five 220px columns broke every step title in two and read as options to compare, not an order to follow | `steps` is an `<ol>` of numbered ListCard rows on every page |
| Disruption meter reads wrong | **Ink is read as quantity.** The squares put the most ink on "no disruption", and tilted outlines read as noise | A tremor trace: flat for "Leave unchanged", a swelling seismograph burst down to "Retire". More ink, more disruption, and a sign already read as disturbance |
| Transition still unclear | **Shared seams made three states read as one table** | Three separate panels with a gutter — Before · During the move · After — each opening on a rule; solid bar = the product in use, dashed = half-present |
| Proof: case first | The eye should enter on the work, then hear about it | Case card in the narrow leading track, quote after it in the wide one |

Fourth batch, same day:

| Note | Underlying issue | Fix |
|---|---|---|
| Should the disruption list be a table? Both it and the cards stack on a phone | **Comparison data was drawn as rows to fit a custom cell**, so it lost table semantics and collapsed like the peer cards above it | **The rule:** content compared across rows is a table at every width (scrolls sideways on a phone); peers stack. DataTable cells can now hold a composed mark, so Spectrum is a DataTable with the meter in a column |
| "Partly complete" chips; should this be a table? | **A drawing device standing in for a sentence.** The decision is named in the lead; the chip repeated it five times and said nothing | A DataTable: representation · what must stay true · when it changes alone. The `representations` block is gone; a generic `table` block replaces it |
| Five parts is crowded; heading-left/body-right still used | **Three ideas at one weight** — four parts, a bracket frame set left/right, and failure tiles with titles larger than the parts' | One drawing for the one idea: the operating model is the panel that HOLDS the four parts (tiles inside it). The three failures are one quiet note, "Any one part alone" |
| "Who owns what" doesn't read as a process | **Four peer columns for an ordered flow** — and "Product teams keep" is not a fourth stage, it is what the client holds throughout | **New pattern: ProcessFlow.** Stages in order with their items, an arrow at each head pointing to the next (down, below lg), an optional lane for what another party keeps throughout. Spec, tokens, specimen `/design/process-flow` |

Fifth batch, same day:

| Note | Underlying issue | Fix |
|---|---|---|
| AI Product UX: ordered by authority, like disruption | Same cause as disruption: the order was a sentence, not in the rows | A **Model authority** column: one slot per role, filled from the model's side — more fill, more of the decision handed over. Its own meter, because authority is not disruption |
| Responsibility record: left/right head, small questions | The head paired title left with mono meta right; the questions — the record's content — sat at h6, quieter than the mono keys over them | Head stacked (meta over title, title at h4); questions at h5 |
| 12 then eight numbered items feels wrong | **Numbers doing two jobs:** 12 is a count, 01–08 were ordinals on items with no order, so the eye read one meaningless sequence | A split: the 12 and its sentence lead; the eight responsibilities sit beside it as unnumbered rows (`stat.items`) |
| ProcessFlow: black bars, lane | The 2px ink bar is foreign to a system where items open on a hairline; the lane read as a footer box, not a duration | Stages open on the tile hairline; the lane is a span line ticked at both ends with the held things as Tags |

**Copy re-cut in this pass:** Product Design's four signal bodies take back "May be" (it was the template's key, now the body's first words). Router conditions that had a separate `settles` line now carry it as a second sentence ("It settles scope, authority, ownership and investment."), on Modernisation and Design Systems.

**Still bespoke, and next in line for the same question:** `fit` and `contrast` (lists of sentences, no titles), `stat`, `nudge`, and the seven diagrams. The diagrams are drawings and probably earn their place. The four text blocks should be checked against Prose lists, Proof figures and CtaSection before they're kept.

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
| Product Design | under the method rail | illustration, 16:9 | *Says:* moving one job is never only moving one job; before anyone confirms, the product has to show what else moves and who must agree. *Shows:* the worked example as the product would present it (rewritten 1 Oct) |
| Product Design | beside the quote | portrait, 1:1 | Ashok Mohanty (and his role: the quote has none) |
| Modernisation | transition section | illustration, 16:9 | *Says:* old and new are both live, and the same customer data has to stay correct in both until the move is done. *Shows:* the two products side by side and one record that exists in both (rewritten 1 Oct) |

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
