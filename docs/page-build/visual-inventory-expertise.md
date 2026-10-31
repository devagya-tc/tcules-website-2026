# Visual inventory: the 12 expertise pages

**Status:** inventory, 30 Oct 2026 (owner asked for it before any change). Nothing here is drawn or built.
It lists every section on `/expertise/*` that should carry a visual and what each visual shows, so one
drawing workflow can make them all at once. Reuse is marked: an `x-` id is one drawing used on several
pages, and it is only used where the item argues the same thing (treatment rules § 2; never twice on
one page).

**Tiers** (`decisions/2026-10-26-flat-or-isometric-two-questions`; treatment rules § 1):
- **flat**: the Sketch grammar, for a surface, a product kind, a deliverable, a mechanism or a worked scenario.
- **iso**: the small isometric drawing, for a claim. Drawn in the hand derived from Bhumika's work
  (`docs/research/illustration-evolution-2026-10-30.md` § 3: one solid blue hero object with thickness,
  1–2 supporting parts, one lime focal fill, a tint inset as the floor, a 1.25 outline, no numbers or logos).
- **photo**: an IRL photograph under the one tone layer.
- **hero**: a page-hero illustration from Bhumika's list.

Every visual below is a message, not a keyword picture. "Shows" is what someone should read in it with
the words covered.

---

## 0 · Why the shared parts keep missing on these pages

The service pages were designed in round 5, and the expertise pages run on the same template. They still
looked unfinished, for four reasons, and they all have the same root: **a design that's been approved
only switches on when every drawing for it exists. Until then the page silently falls back to the
design that came before the approval.**

| What you saw | Cause in the code |
|---|---|
| What you get on every expertise page is the old ruled grid, not the approved four rows | `WhatYouGetBand` renders `OfferParts` only when every deliverable has a registered drawing, a "What you receive" label and a title of its own. One miss and it falls back to `SheetBand`, with only a console warning in development. No expertise page has drawings, and their deliverables are written as untitled sentences. |
| Hard parts is a two-column wall of text on 7 pages and proof rows with grey boxes on 5 | `ChallengesBand` uses the approved proof rows only when *every* claim has an "Example:" paragraph; otherwise it uses the old `ReadDown`. Expertise claims carry an example 60% of the time. A table inside a claim is dropped in both forms. |
| The blue-tick ruled cell carries content (What we design, the What you get fallback) | `OfferSheet` / `ReadDown` are the fallback for any list-shaped band. Owner, 30 Oct: that cell is for stats and figures, not content. To be logged with `/decide` in the PR that replaces it. |
| A drawing approved on one page never reaches the next | Drawings are registered per route (`OFFER_SCENES[route]`), so a new page starts with none. The approved layout has no "drawing to come" state, so it can't render without them. |

**Fix (to build after this inventory is agreed):** the approved arrangement always renders, with a labelled
placeholder wherever a drawing is still missing, and the old fallbacks go. A missing drawing then shows up as
a visible placeholder, not as the old design. The same applies to the audit pages, which share the template.

---

## 1 · What each section takes

| Section | Visual | Per | Notes |
|---|---|---|---|
| Hero | **hero**: Bhumika's illustration for the 6 product types; **photo**: the sector photo for the 6 industries | page | Launch roadmap split. HealthTech's copy binds an illustration slot ("each seeing their own view of one shared case"); owner to choose. |
| What we design | **flat**, one per product kind | item | Replaces the blue-tick cells. The client named after "·" stays as the item's proof line. |
| Selected work | the cases' own covers | case | Already right. |
| Hard parts | **none** (owner, 31 Oct 2026: "we won't be drawing illustrations for this content"; the tabs carry no drawing slot). Was: iso per claim; a table of people or questions becomes a voice ledger or drawn items | claim | See § 3 for the band update. |
| Worked example ("Illustration, not client work") | **flat story**: one animated flat graphic, or 3–5 frames, of the moments the words name | example | Its own section kind (treatment rules § 2), not a hard part. 4 expertise pages (§ 2.16); 24 pages site-wide carry one (services, audits, tools), so it is one component built once. |
| What you get: deliverables | **flat**, one per deliverable, each under a title pulled from its own words | item | Content change logged in `docs/content-changes.md`. |
| What you get: the three terms | **flat**: reuse `team-product-design`, `needs-product-design`, `stops-product-design` on every expertise page | page | Zero new drawings. Same message on every page. |
| Testimonials | none | — | Already right. |
| How we work together | existing engagement drawings | — | Already right. |
| Why Tcules | **iso** reason figures | reason | 3 reasons have no drawing yet (§ 2.13). |
| Other industries | **photo** | sector | 4 sector photos missing (§ 2.14). The band's weight is a separate design question. |

---

## 2 · Item by item

`x-` ids are shared drawings; their full description is in § 2.0 and each use names the id only.

### 2.0 Shared drawings

| id | Tier | Used on | Shows |
|---|---|---|---|
| x-deal-pipeline | flat | B2B 1, PropTech 1 | Pipeline columns of deal cards; a new listing card checked against an existing deal before it joins. |
| x-shared-quote | flat | B2B 2, MarTech 3 | One quote sheet in the middle, several role tabs each editing its own section of it. |
| x-ehs-suite | flat | B2B 5, ClimateTech 3 | A suite screen with an organisation tree picker, one site chosen, its modules below. |
| x-ai-signoff | flat | AI 2, PropTech 3 | A list of AI-checked results, each waiting on a person's sign-off; one changed, with its reason attached. |
| x-ai-survey | flat | AI 4, MarTech 4 | A questionnaire where an AI-drafted question carries its prompt tag, and the rewritten version keeps the original visible underneath. |
| x-omny-listing | flat | AI 5, Commerce 4, MarTech 2 | A product listing being written, the AI's suggestions held to the side and one accepted with its author marked. |
| x-report-next-step | flat | Data 1, MarTech 1 | A report chart where the figure that moved has its next action placed beside it. |
| x-fit-before-buy | flat | Commerce 1, Content 3 | A product list with spec filters on the list itself; one item marked as fitting before anyone opens it. |
| x-care-match | flat | HealthTech 1, Marketplaces 1 | A family's request and a carer's profile meeting on one platform screen. |
| x-wyg-prototype | flat | every page's "prototypes …" deliverable | A clickable prototype on a phone and a screen, a person's hand testing it; code brackets on one. |
| x-wyg-build | flat | every page's "designs/specs your engineers build from, or Tcules developers …" | One design sheet handed two ways: to the client's engineers, or into code beside it. |
| x-wyg-research | flat | Commerce 1, EdTech 1, FinTech 5, HealthTech 3, Marketplaces 2, MarTech 1, PropTech 2 | Research sessions on real devices: a phone, a laptop and a notebook of findings joined into one sheet. |
| x-wyg-beside-path | flat | B2B 2, FinTech 2 | A main path of screens with each exception or failure designed as its own screen beside it, not after it. |
| x-claim-one-record | iso, **existing** `claims/one-record-many-roles` | B2B hp1, Marketplaces hp1, MarTech hp3 | Already drawn; redraw in the new hand (§ 4). |
| x-claim-read-same | iso, **existing** `claims/order-reads-the-same` | FinTech hp1 | Already drawn; redraw in the new hand (§ 4). |
| x-claim-next-step | iso | Data (table row 4), MarTech hp1 | A figure that moved, with a step leading off it to one action. |
| x-claim-ai-draft | iso | AI hp3, MarTech hp2 | A document leaving the product under a person's seal; the AI-written lines marked apart from the person's. |

### 2.1 AI products & developer tools (product type)

**Hero:** hero (Bhumika).

| What we design | Tier | Shows |
|---|---|---|
| 1 Model and API platforms · Eden AI | flat | A workflow builder canvas of joined nodes; the node in focus has its docs open beside it. |
| 2 AI review tools · BuildTwin | x-ai-signoff | |
| 3 AI-native products from an early idea · ConnectX | flat | A rough sketch sheet behind, a working AI workspace screen in front of it. |
| 4 AI-assisted survey and research · Novus | x-ai-survey | |
| 5 AI writing suggestions · Omny AI | x-omny-listing | |
| 6 UX troubleshooting · Knovos | flat | A live screen with three trouble spots ringed and a short fix list beside it. |

| Hard part | Tier | Shows |
|---|---|---|
| A first session that ends in a working call | iso | A path from key to code sample to a lit "works" response, the one job of day one. |
| Results an expert has to sign | iso | An AI result on a plinth with its sources stacked beside it; a person's stamp held over it. |
| AI drafts that go out under a person's name | x-claim-ai-draft | |

| What you get (pulled title) | Tier | Shows |
|---|---|---|
| A first working result | flat | Sign-up, key, code sample and result in one line, the error message marked on the way. |
| Documentation beside the work | flat | A workspace with docs and a usage meter docked at its side. |
| A written split | flat | A step list divided in two: what the system proposes, outlined; what a person checks, solid. |
| Sources and limits | flat | A result card with source chips; the original kept beside the correction. |
| Prototypes tested | x-wyg-prototype | |
| Specs your developers build from | x-wyg-build | |

### 2.2 B2B SaaS & workflow software (product type)

**Hero:** hero (Bhumika).

| What we design | Tier | Shows |
|---|---|---|
| 1 Deal and pipeline software · Dealpath | x-deal-pipeline | |
| 2 Quoting, pricing and approvals (CPQ) · Auxentios | x-shared-quote | |
| 3 Staffing and people operations · Scissors | flat | Client, candidate and job as three record cards joined; one candidate on two shortlists. |
| 4 Scheduling across teams and companies · Doodle | flat | A week of meetings from two organisations; one meeting flagged by priority. |
| 5 EHS and sustainability suites · Benchmark Gensuite | x-ehs-suite | |
| 6 Back-office software for a single trade · TreadCommand | flat | A trade job board, bays and jobs, with the stock list beside it. |

| Hard part | Tier | Shows |
|---|---|---|
| Several roles working on one record | x-claim-one-record | |
| Records that outlast any one workflow | iso | Lasting records as solid blocks on the floor; workflows as thin screens passing over them. |
| The exceptions your customers live in | iso | A main path with side branches (missing, override, duplicate), each ending at an owner and a status, not a spreadsheet. |
| Enterprise admins and permissions | iso | An organisation tree of sites and teams; an admin's key opens one branch; an audit strip runs under it. |
| AI agents acting on SaaS records | iso | An agent as one more figure at the record, with a limit around it and a person's review gate before the record changes. |

| What you get (pulled title) | Tier | Shows |
|---|---|---|
| The workflow map | flat | Records as boxes, roles as figures, states as a strip under them. |
| Screens for each role | x-wyg-beside-path | |
| Admin, permission and audit screens | flat | A role and permission grid with an audit trail beside it. |
| How an agent's work appears | flat | An agent's change in a record's history, with review and undo on it. |
| Prototypes tested | x-wyg-prototype | |
| Parts your engineers can build from | x-wyg-build | |

### 2.3 ClimateTech & energy (industry)

**Hero:** photo, sector photo (missing: Yash).

| What we design | Tier | Shows |
|---|---|---|
| 1 Building energy products · ConnectX | flat | A building's twin outline with live meter tiles beside it. |
| 2 Peak-price events and battery suggestions · ConnectX | flat | A price curve with one peak band flagged and a battery suggestion card under it. |
| 3 Safety and sustainability software · Benchmark Gensuite | x-ehs-suite | |
| 4 EV charging and fleet electrification | flat | Depot bays of vans, each with a charge bar and a ready-by marker. |
| 5 Renewable and storage asset monitoring | flat | An asset list with three line styles: live solid, forecast dashed, a fault flagged. |
| 6 Carbon accounting and emissions reporting | flat | A total that opens down into its sources, with an approver's stamp. |

| Hard part | Tier | Shows |
|---|---|---|
| Readings, forecasts and targets that look alike | iso | Three bars side by side, told apart: measured solid, forecast dashed, target a hollow outline. |
| Three roles reading one building (table) | iso + drawn items | One building with three views lifted off it; the table's three roles as figures, one per row. |
| Emissions totals an assurer will question | iso | A total block with its source blocks traced underneath; an inspector figure checking one. |
| Automation that acts overnight (scenario) | flat scenario | Vans charging overnight against a price line, the two where price and readiness pull apart flagged. |

| What you get (pulled title) | Tier | Shows |
|---|---|---|
| Each role's view of the same figures | flat | One set of figures fanning into three screens of different depth. |
| Readings, forecasts and targets marked apart | flat | One chart with three line styles and a stated baseline. |
| A digital twin or site view | flat | A site plan with the two assets that matter now lit. |
| Totals that open onto their sources | flat | A total with a drawer open beneath it: sources, estimates, approver. |
| The limits people set, and a morning view | flat | A limit control and a morning summary card of what the system did. |
| A coded demo on sample data | flat | A coded screen on sample data, its live-integration plugs dashed and not yet connected. |
| Specs your engineers build from | x-wyg-build | |

### 2.4 Commerce & transactional products (product type)

**Hero:** hero (Bhumika).

| What we design | Tier | Shows |
|---|---|---|
| 1 Specialist Shopify stores · GT Tools | x-fit-before-buy | |
| 2 Web-to-print and made-to-order ordering · Gold Image Printing | flat | A product configurator with an artwork upload slot and size options. |
| 3 Production and fulfilment systems · Gold Image Printing | flat | An order leaving the store screen into a production board: artwork, print, ship. |
| 4 Listing-content tools · Omny AI | x-omny-listing | |
| 5 B2B ordering and trade portals | flat | A reorder list at account prices, the basket waiting on an approval above its limit. |
| 6 Subscriptions and repeat ordering | flat | A delivery timeline with skip and swap on the next box. |

| Hard part | Tier | Shows |
|---|---|---|
| Fit, variant and stock, answered before payment | iso | A product with fit, variant and stock tags answered before a payment gate. |
| The order after checkout | iso | An order passing through the checkout wall into production stations; a customer's window looking in on its status. |
| Checkouts for made-to-measure goods (scenario) | flat scenario | A blind order: recess or wall chosen, measuring steps shown, the figures read back before pay. |

| What you get (pulled title) | Tier | Shows |
|---|---|---|
| Research from support emails and search terms | flat | Support emails, search terms and an abandoned basket gathered into one findings sheet. |
| Product pages that answer fit | flat | A product page with answer chips (fit, stock, delivery, warranty) beside the price. |
| A checkout with the checks your products need | flat | Checkout steps with a measuring and approval check before pay. |
| Order, production and delivery status | flat | One status track read from a customer's screen and a staff screen. |
| One set of components | flat | One component sheet feeding both the store and the back office. |
| Prototypes tested with buyers | x-wyg-prototype | |
| The store built on Shopify or Magento | x-wyg-build | |

### 2.5 Content, knowledge & discovery platforms (product type)

**Hero:** hero (Bhumika).

| What we design | Tier | Shows |
|---|---|---|
| 1 Search and documentation · Eden AI | flat | Search results as preview cards, one opening its docs in a side panel. |
| 2 AI review feeds · BuildTwin | flat | A feed of findings, each with its source document clipped to it. |
| 3 Product discovery · GT Tools | x-fit-before-buy | |
| 4 Internal knowledge bases and enterprise search | flat | One search box: an exact code and a description both arrive at the same page. |
| 5 Policy and document libraries | flat | A stack of versions, the current one on top with its owner and date. |
| 6 Media and publishing products · Ringier | flat | An article page with the editor's queue standing behind it. |

| Hard part | Tier | Shows |
|---|---|---|
| Which version is current, and who owns it | iso | Six near-identical sheets; one stands solid with an owner's badge, the rest faded. |
| AI answers people can trace to a passage | iso | An answer block with a line running on the axes down to one lit passage in a source. |
| The expert's exact name and the newcomer's description (scenario) | flat scenario | One box: a part number goes straight to its page; a description is asked "which machine?" first. |

| What you get (pulled title) | Tier | Shows |
|---|---|---|
| A review of the searches that fail | flat | A query log with empty results flagged and their support tickets attached. |
| Experts and newcomers in the same box | flat | One search box holding two kinds of query. |
| Results that show source and owner | flat | A result row with source, owner, version and date tags. |
| AI answers linked to their passages | flat | An answer with markers pointing to the passages behind it. |
| A route to the next task | flat | A result with its next actions: add, share, cite, configure. |
| Prototypes tested with your real documents | x-wyg-prototype | |
| What the screens need from your search engine | flat | A spec sheet joined by a dashed line to the engine block. |

### 2.6 Data, analytics & decision products (product type)

**Hero:** hero (Bhumika).

| What we design | Tier | Shows |
|---|---|---|
| 1 Customer-facing reports and dashboards · Ryzeo | x-report-next-step | |
| 2 Scores that show what they are based on · Doodle | flat | A score gauge with its three inputs drawn beneath it. |
| 3 Multi-site data · Benchmark Gensuite | flat | A scope picker over an organisation tree, the chosen branch's data below. |
| 4 Operational dashboards · TreadCommand | flat | A shop dashboard: bays busy, stock running low. |
| 5 Ask-the-data analytics | flat | A typed question, answered as a chart carrying its scope chips. |

| Hard part | Tier | Shows |
|---|---|---|
| The four questions (band table) | 4 drawn items, flat | What am I looking at: a frame with its filter chips. Compared with what: a bar beside its baseline. Can I trust this: a figure with its calculation and freshness. What now: x-claim-next-step. |
| The three claims | none | The four drawn questions are the band's visuals; the claims expand them. A second drawing per claim would repeat the table. |

| What you get (pulled title) | Tier | Shows |
|---|---|---|
| A definition for each figure | flat | A figure card with its definition, scope and freshness lines. |
| Views at different depths | flat | Three screens of decreasing detail on one shared definition. |
| Charts that show their baseline | flat | A chart with its baseline and a source note. |
| The next step beside the figure | flat | A figure with its action button beside it. |
| Screens for missing and late data | flat | Four small chart states: empty, late, partial, restricted. |
| Saved views and filters | flat | A filter bar with saved-view chips. |
| Prototypes with realistic figures | x-wyg-prototype | |

### 2.7 EdTech & learning (industry)

**Hero:** photo, sector photo (missing: Yash).

| What we design | Tier | Shows |
|---|---|---|
| 1 LMS and Moodle course experiences · The Wandering Raven | flat | A course page with a custom theme and a plugin block. |
| 2 Creative learning products for 8–18 · The Wandering Raven | flat | A world of activities with a character pointing to the next one. |
| 3 Growth projects inside a product team · JoVE | flat | A product team's board with a Tcules designer's seat among theirs. |
| 4 Workplace training and apprenticeship apps | flat | A phone with one short practice card between shift blocks. |
| 5 Assessment and skills sign-off | flat | One record: evidence photo, witness tick, assessor's signature. |
| 6 Teacher dashboards | flat | A class grid with two learners flagged as stuck. |

| Hard part | Tier | Shows |
|---|---|---|
| Learners who miss the next step | iso | A pile of content blocks; one lit stepping stone to the next activity. |
| Teachers who need to see who is stuck | iso | A class of figures, two marked stuck, none reduced to a score. |
| Rules for children, students and public bodies | iso | A product behind a consent gate that a parent's key opens. |
| Practical skills an assessor signs off (scenario) | flat scenario | Two photos and a sentence recorded at work, confirmed on a mentor's phone, signed beside the standard. |

| What you get (pulled title) | Tier | Shows |
|---|---|---|
| Research with learners and educators | x-wyg-research | |
| An audit with a plain verdict | flat | Four rows, each closed by a verdict mark. |
| Content regrouped | flat | Scattered blocks put in order, "now" and "next" marked. |
| Views built around who needs help | flat | A list of learners with help flags. |
| Hybrid wireframes | flat | One screen, half wireframe, half in the visual direction. |
| Parent views for younger learners | flat | A consent step with a parent's approval. |
| Configured in Moodle or your LMS | flat | A settings panel with plugin toggles. |

### 2.8 FinTech (industry)

**Hero:** photo, sector photo (`phone-qr-counter-scan` exists).

| What we design | Tier | Shows |
|---|---|---|
| 1 Mobile lending apps · OctiFi | flat | A phone stepping through sign-up, offer and funded. |
| 2 Payment apps for small shops | flat | A shop counter phone showing a QR code and a payment-received tick. |
| 3 Business finance tools | flat | A spend request with its approval limit and the next signer. |
| 4 Staff review screens | flat | A case screen with evidence documents and the reviewer's limit. |
| 5 Banking and money management apps | flat | A balance card whose transfers each carry one plain status. |
| 6 Insurance quote, claims and underwriting | flat | A quote card with cover, cost and terms set out before the pay button. |

| Hard part | Tier | Shows |
|---|---|---|
| One status, read the same way (and its moments table) | x-claim-read-same; the table as a voice ledger | The customer's questions per moment as quotes, as HealthTech's ledger does. |
| Approvals with a limit and a name | iso | A request rising to a gate where a figure with a limit bar signs. |
| Money that moves in parts | iso | One sum split into blocks: funded solid, held dashed, each with its own status. |
| Declines, checks and holds with a way forward | iso | A barrier with a door in it: the next step. |
| Insurance quotes, claims and underwriter screens | iso | A policy sheet, a claim with a photo slot, an underwriter's queue sorted by what needs a person. |

| What you get (pulled title) | Tier | Shows |
|---|---|---|
| A status map | flat | A state diagram with a customer lane and a staff lane. |
| Customer journeys | x-wyg-beside-path | |
| Review and approval screens | flat | An approval chain: case, evidence, the approver's limit, who acts next. |
| Reasons, disclosures and consent wording | flat | A phone with a wording block and a compliance tick. |
| Research with the people the product is for | x-wyg-research | |
| Prototypes with realistic figures | x-wyg-prototype | |
| Designs ready for your engineers | x-wyg-build | |

### 2.9 HealthTech (industry)

**Hero:** photo, sector photo (`hand-over-hand-table` exists); the copy's slot asks for an illustration (owner to choose).

| What we design | Tier | Shows |
|---|---|---|
| 1 Care platforms · CuramCare | x-care-match | |
| 2 Apps for carers on home visits · CuramCare | flat | A phone with a visit checklist and a clear "note saved" state. |
| 3 Portals and admin tools · Vovisto | flat | A trip record: budget, flight, hotel and an approval. |
| 4 Clinician tools beside the patient record | flat | A patient record with a slim side panel surfacing the one result. |
| 5 Patient portals | flat | A result card with "what happens next" under it. |
| 6 Remote check-in apps | flat | A phone sending a photo, answered with the time it will be seen. |

| Hard part | Tier | Shows |
|---|---|---|
| The people around one patient (band table) | voice ledger (built) | Already shipped as quotes. |
| Each person's view of the same case | iso | One case block with four figures, each looking through their own window onto it. |
| Consent, and who reads what | iso | A shared item passing a consent gate, its readers visible beyond it. |
| Reviewers who need the reasoning in writing | iso | Wireframe sheets with written reasoning stacked beside them; a reviewer's stamp. |
| Care away from the ward and the desk | iso | A carer figure in a home with a phone; weak signal, note saved. |

| What you get (pulled title) | Tier | Shows |
|---|---|---|
| Each role's journey around one patient | flat | One patient at the centre, role journeys passing around, what each hands on. |
| Consent, sharing and access steps | flat | A consent step listing who will read what. |
| Research with patients, families, clinicians and carers | x-wyg-research | |
| Wireframes with the reasoning written down | flat | A wireframe with its reasoning note pinned beside each step. |
| Screens designed for accessibility | flat | Large type, strong contrast and a visible focus ring on one screen. |
| Designs your developers build from | x-wyg-build | |

### 2.10 Marketplaces & multi-sided platforms (product type)

**Hero:** hero (Bhumika).

| What we design | Tier | Shows |
|---|---|---|
| 1 Care marketplaces · CuramCare | x-care-match | |
| 2 Separate apps for each side · CuramCare | flat | Two phones joined to one web platform screen. |
| 3 Booking and rental marketplaces | flat | A booking card with its cancellation terms in view. |
| 4 Freelance and talent marketplaces | flat | A request card a provider weighs: scope, budget, accept. |
| 5 Local service marketplaces | flat | A provider's phone with the arrival time and the payout. |
| 6 B2B marketplaces | flat | A supplier catalogue at contract prices, with an approval on the order. |

| Hard part | Tier | Shows |
|---|---|---|
| Buyer, provider and operations, before and after (band table) | voice ledger | Two quote columns per side, as HealthTech's ledger. |
| One record, three angles | x-claim-one-record | |
| Trust that people can check | iso | A provider profile where availability, price and response time are the solid facts; a rating small beside them. |
| The way back: cancellations, changes, refunds, disputes | iso | A booking path with return lanes; one rule block feeding three views. |
| Tools for the team that runs the market | iso | An operations desk above the market floor, exception flags rising to it. |

| What you get (pulled title) | Tier | Shows |
|---|---|---|
| What changes hands | flat | One booking with its states and the moment it binds. |
| Research with buyers, providers and your operations staff | x-wyg-research | |
| Screens drawn together on one record | flat | Buyer, provider and operations screens on one shared record. |
| Cancellations and disputes as stages | flat | A booking timeline whose later stages are cancel, change, refund and dispute. |
| Operations and trust tools | flat | An exceptions queue with a record of who changed what. |
| Screens your engineers build from | x-wyg-build | |

### 2.11 MarTech & SalesTech (industry)

**Hero:** photo, sector photo (`hands-laptop-collection-page` exists).

| What we design | Tier | Shows |
|---|---|---|
| 1 Marketing automation and reporting · Ryzeo | x-report-next-step | |
| 2 Budget and listing-content tools · Omny AI | x-omny-listing | |
| 3 Quoting (CPQ) tools · Auxentios | x-shared-quote | |
| 4 AI-assisted survey and market research · Novus | x-ai-survey | |
| 5 CRM, pipeline and commission tools | flat | A deal card showing its commission and the plan rule behind it. |
| 6 Lead management and sales enablement | flat | A lead card with one next-action button. |

| Hard part | Tier | Shows |
|---|---|---|
| Reports that point to a next step | x-claim-next-step | |
| AI drafts your customers answer for | x-claim-ai-draft | |
| One quote, deal or campaign on one record | x-claim-one-record | |
| Commission and pipeline people can check | iso | A closed deal block with its commission slab and the plan rule beside it. |
| Consent before the send | iso | An email leaving through a consent gate; some contacts on the list barred. |

| What you get (pulled title) | Tier | Shows |
|---|---|---|
| Interviews with marketers and reps | x-wyg-research | |
| Reports with the next action | flat | A dashboard where the figure that matters has its action on the same screen. |
| AI draft review | flat | Suggestions kept apart, one accepted deliberately, AI and human lines marked. |
| The shared record | flat | One campaign record with every role and tool it passes through. |
| Consent and unsubscribe states | flat | A contact list with consent and unsubscribe states readable before a send. |
| Shared filters, states and data displays | flat | One filter and state set applied to two reports alike. |
| Designs your engineers build from | x-wyg-build | |

### 2.12 PropTech, ConTech & field operations (industry)

**Hero:** photo, sector photo (missing: Yash).

| What we design | Tier | Shows |
|---|---|---|
| 1 Acquisition and deal-pipeline software · Dealpath | x-deal-pipeline | |
| 2 Listing screens · Dealpath | flat | A listing card in three zones: image, source and status; identity; comparison values. |
| 3 AI drawing checks · BuildTwin | x-ai-signoff | |
| 4 Field apps for inspections and site visits | flat | A phone with large tap targets, a photo as the record and a "saved offline" state. |
| 5 Defect and handover apps | flat | A defect card with before and after photos and its plot pin. |
| 6 Property management and tenant portals | flat | One repair job carrying tenant, manager and contractor. |

| Hard part | Tier | Shows |
|---|---|---|
| One property, one identity on every screen | iso | One property block shown the same way on a dashboard, a map pin and a list. |
| The source travels with the sign-off | iso | A finding with its drawings and photos clipped to it, climbing a sign-off ladder. |
| Designed for the site as well as the office | iso | A site with a gloved hand on a phone and its sync state; the office desk far behind. |
| Tenants, managers and contractors on one job | iso | One building with three figures around one job ticket. |

| What you get (pulled title) | Tier | Shows |
|---|---|---|
| An audit of the live product | flat | A live screen with parts marked "trouble" and parts marked "relied on". |
| Research at desks and on site | x-wyg-research | |
| Every role in the sign-off chain | flat | A chain of named roles, each with what it must see before acting. |
| One record of each property | flat | One property record with the roles around it. |
| Field moments tried in working prototypes | flat | A coded prototype on a phone at a location pin, offline and interrupted states shown. |
| A change that fits your existing product | flat | A new part slotted into an existing product's frame, its limits drawn as the frame. |

### 2.13 Why Tcules: reasons without a drawing

| Reason (as authored) | Pages | Shows |
|---|---|---|
| One studio can take it into working software, with the designers staying in the build. | 10 | The designer's seat stays beside the product as it moves from design into code. |
| We know what to leave alone in a product people rely on. | B2B, MarTech | A product where one part is changed and the rest are pinned in place, untouched. |
| We design AI that people can check and correct. | AI | An AI output that a person checks and corrects, with authorship marked. |

`known-before-drawn` and `same-seat-years` exist and are used as they are, then redrawn with the rest (§ 4).

### 2.14 Photographs

| Photo | For | Status |
|---|---|---|
| Sector photo: ClimateTech | hero + Other industries | missing (Yash) |
| Sector photo: EdTech | hero + Other industries | missing (Yash) |
| Sector photo: PropTech | hero + Other industries | missing (Yash) |
| Sector photo: Content & knowledge | Other industries | missing (Yash) |

### 2.16 Worked examples: the frames each one shows

Each is a story told in frames (or one animation running through them). They are listed separately from
hard parts because they're a different kind of section; the "flat scenario" rows in § 2 point here.

| Page | Example | Frames |
|---|---|---|
| ClimateTech | Overnight charging for a delivery fleet | 1 · vans plugged in at dusk, each with a ready-by-six marker · 2 · the price forecast overnight, cheap hours lit · 3 · two vans flagged where readiness and price pull apart, the fleet manager picking · 4 · morning: every van ready, a summary of what the system did |
| Commerce | A made-to-measure blind | 1 · the product page asks which blind and recess or wall · 2 · measuring steps for that choice · 3 · before payment, the figures read back, an unusual one questioned · 4 · the blind fits |
| Content | The veteran's part number and the newcomer's description | 1 · one search box, a part number typed, straight to its page · 2 · the same box, "pump making a grinding noise" · 3 · "which machine?" asked first · 4 · the right manual page, matched on the words senior engineers hear |
| EdTech | An apprentice's circuit signed off | 1 · at work: two photos and a sentence recorded · 2 · the mentor confirms on a phone between jobs, in under a minute · 3 · the assessor sees the record beside the standard and signs |

The rows in § 2.3, 2.4, 2.5 and 2.7 marked "flat scenario" are these; one drawing set per example, not one per frame
plus one for the claim.

### 2.15 IRL photographs from the Tcules gallery

The gallery pass is a task of its own (owner, 30 Oct). This is the list it matches against: every slot where
a photo of the studio, its people or real work is the right visual (treatment rules § 1: people, the studio, a
place → an IRL photograph). Sector photos (§ 2.14) are a different job, because they show a client's user,
not us.

**On the expertise pages:**

| Slot | Pages | Shows | Note |
|---|---|---|---|
| How we work together: the closing terms ("Our studio is in Ahmedabad … you work directly with the people doing the work") | 12 | The people a client works with, at work in the studio: a designer and a developer at one screen, or a review at the wall | One photo per page from the gallery, so sibling pages don't all repeat one image (studio photos may recur, § 5.1 rule 4, but 12 of one is a wall of sameness). Today the closing terms are loose text under the tiles. |
| What you get: "Who does the work" | 12 | A senior designer leading a session with the client's team | **Owner's call.** The WYG ruling keeps every visual in the band flat (one register per section). A real photo is more truthful here, so it's listed in case that ruling is reopened. |
| What you get: research deliverables (x-wyg-research) | 7 | A real research session: a person using the product on their own device, a Tcules researcher beside them | Same register question as the row above. |

**Elsewhere on the site, for the same pass.** These pages are not inventoried yet; the list is what is known today.

| Page | Slot | Status |
|---|---|---|
| Home, About, How we work, Why Tcules | team outside the studio; in-studio review session | The same 2 photos on all 4 pages (`home_team`, `about_team`, `why_team`; `home_studio_review`, `about_studio_review`, `how_we_work_studio`). The gallery can give each page its own. |
| About: leadership | a portrait per leader | Missing; initials stand in (review 29 Oct). |
| About: unused bindings | `about_work_wall`, `about_studio_review` | Unused on the page today (review 29 Oct, Q13). |
| Contact: hero | the empty right half | Accepted for now (review 29 Oct); a studio photo is a candidate. |
| Careers, Future Interfaces Lab | — | Not reviewed yet (tracker 2.35). |

---

## 3 · Hard parts: the content it has to hold

Read from every page with the band (services, audits and expertise), 30 Oct.

| | Service pages | Expertise pages |
|---|---|---|
| Claims | 2–4, labelled paragraphs | 3–5, `###` sub-sections |
| Length per claim | one paragraph + one "Example:" line | 1–6 paragraphs |
| Named example | every claim | 31 of 48 claims |
| Worked scenario ("Illustration, not client work") | none | 5 pages, one claim each |
| A table | none | 3 at band level (Data, HealthTech, Marketplaces), 2 inside a claim (ClimateTech, FinTech) |
| Rules and regulation paragraphs | none | 13 claims on 9 pages |
| Reading links (insights, research) | rare | in about 1 claim in 4 |

The round-5 band (one row per claim: a 168 drawing, then title and text, the example as a footnote) was
built for the service shape. It breaks on the expertise shape in four ways:
1. A claim without an example drops the whole band to the text grid.
2. A claim of 4–6 paragraphs beside a 168 drawing becomes a tall column of 14px text.
3. A scenario has nowhere to go: it is a story, not an example.
4. A table is dropped.

**What the update must hold:**
- any mix of claims with and without examples;
- long claims;
- a scenario as its own kind of item, with its flat drawing;
- a band-level table rendered as a voice ledger or drawn items (§ 2);
- a claim's own table kept in place.

**One visual per claim:**
- iso as listed above;
- a scenario claim takes its flat scenario drawing instead of an iso;
- Data's claims take none, because its drawn table carries them.

Design to follow, with references first.

---

## 4 · Redraw in the new hand

These exist but are in the older hands, which will read as another studio next to the new heroes
(`illustration-evolution-2026-10-30.md` § 3):
- the claim drawings in `public/illustrations/claims/` (4)
- the offer reason figures `known-before-drawn`, `proved-in-code`, `same-seat-years` (3)

The flat Sketch scenes already used on these pages (engagement, team/needs/stops) stay in the flat grammar.

---

## 5 · Totals

| Kind | New | Reused |
|---|---|---|
| Hero illustrations (Bhumika's list) | 6 | — |
| Sector photographs | 4 | 6 exist |
| Flat: What we design | 52 + 9 shared | 19 slots filled by the 9 shared |
| Flat: What you get deliverables | 56 + 4 shared | 25 slots filled by the 4 shared |
| Flat: hard-parts scenarios and drawn table items | 4 + 7 | — |
| Flat: What you get terms | 0 | 36 slots from product design's 3 |
| Iso: hard-parts claims | 34 + 2 shared | 5 slots from 2 existing claims, 4 from 2 shared |
| Iso: Why Tcules reasons | 3 | 2 existing |
| Redraws in the new hand | 7 | — |

About 170 new flat and iso drawings across the 12 pages. Audit pages share the template and will add
their own set once inventoried.
