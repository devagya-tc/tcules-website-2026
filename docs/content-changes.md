# Content changes — for Devagya

Added to as the components find them (tracker 0.5): places where the copy or its structure needs
to change so a component can do its job. This covers lengths that break a layout, a field a section
needs but the copy doesn't have, and items that don't form a set.

Each entry: **page / section** · **what's needed** · **why** · **found in** (task or component).

---

## 2. Case-study cards: client out of the title, one-line description

**Page / section.** `/case-studies` (every card), and anywhere a case study appears as a card.

**What's needed.** For every case study:
- Fill the new **client** field (strapi-changes §13) with the client's name only.
- Take the client out of the **title** where it leads it ("ConnectX: Building Energy Management…" →
  "Building energy management as a 0 to 1 AI product").
- Keep the **description** to **8–15 words**, one sentence. Most are 15–17 words today, and three are
  about 40.
- Titles should aim for the Copy × UI card-title range (2–8 words). The live ones run 37–87 characters.
  The card now holds an 87-character title in three balanced lines, so this is about scanning, not a
  broken layout.

**Why.** The card shows client, title, one line and the categories. When the client sits inside the
title, half the cards name it and half don't. A description longer than one line was the largest block
on the card and repeated the title.

- **Categories** no longer show on the card once the client is filled in: one label line per card.

**Worked example.** `/design/case-study-index` shows the live index with this copy applied to every
entry (`src/content/sources/fixtures/ideal/case-study-listing.ts`). That copy is illustrative, and the
client names in it were read from titles, slugs and cover filenames, so they need confirming.

**Found in.** BlockCard revision, 29 Sep 2026.

## 3. Six service pages: re-cut copy and new copy to approve

**Page / section.** All six service lines. Each section's changes are listed in
`docs/service-pages-design.md` §4.

**What's needed.** Approve, rewrite or reject every item marked **NEW COPY** there. The largest are the
AI Product UX model-role rows (four of seven "what the product needs" cells, and every "introduces"
cell, are new), the Software Development router conditions, and the case titles on every page. The
re-cut copy (tightened leads, split lists) needs a lighter read. Added 30 Sep: every resources
card's one-line description, and each close's two steps (the second step's detail is new copy).

**Why.** The designed pages give each block a job, and some jobs need words the CMS never held: a
condition for each route, a title that says what a case shows *on this page*, a short line under each
stage. The pages were designed against realistic copy rather than waiting for it.

**Found in.** Service pages designed from content, 29 Sep 2026.

## 4. Six service heroes: title ≤ 48 characters, lead ≤ 26 words, no eyebrow, body to the first band

**Page / section.** The six designed service pages (`/design/service-page/<slug>`), the hero and the first band's lead. Fixtures: `src/content/sources/fixtures/ideal/services/*.ts`.

**What's needed.** Approve, rewrite or reject the edits below. The ceilings are visual-direction § 2.3 and § 1.5: a hero title of at most 48 characters is three balanced lines at 572, a lead of at most 26 words is three lines. The hero eyebrow is gone on all six (the trail's last crumb is the service's name, so it said it twice); the name moved to `story.name`. The old second hero paragraph (`hero.body`) moved into the first band's lead, merged with that band's own lead where it had one. The merged leads are over the 18-word stacked-lead ceiling; `cmp-service-pages` re-cuts them when it recomposes the bands.

**Why.** The h1 now starts at 222 instead of 296 and every service hero ends at or above 823 at 1470 × 830 (it ran 859 to 1014), so the first scroll lands on the next band.

**Found in.** Kit `fdn-top`, 5 Oct 2026.

**product-design**

- Title: "A finished interface can still contain an unresolved product." (61 chars) → "Finished screens can hide an unresolved product." (48).
- Lead: "Tcules takes responsibility for the product beneath the screens: who does what, which records and rules make it possible, how the experience behaves, and what the team must learn before it commits." (32 words) → "Tcules takes responsibility for the product beneath the screens: who does what, the records and rules behind it, how it behaves, and what to learn first." (26).
- Eyebrow "Product Design": removed from the hero; now `name`, the last crumb.
- Hero body "For new products, and for established B2B, workflow, data-rich and AI-enabled software where the interface shows only part of the problem." moved to band `signals`, merged with its lead "A visual change may reveal a workflow, data or authority problem that the same project must resolve." → "For new products and for established B2B, workflow, data-rich and AI-enabled software, where a visual change may reveal a workflow, data or authority problem.".

**design-engineering**

- Title: "Keep product intent alive when the work becomes software" (56 chars) → "Keep product intent alive as it becomes software" (48).
- Lead: unchanged.
- Eyebrow "Design Engineering": removed from the hero; now `name`, the last crumb.
- Hero body "Design Engineering keeps product thinking and frontend reasoning in one responsibility. Tcules uses it to create coded evidence before a roadmap commits, implement shared frontend systems, and check the running product still carries the intended behaviour." moved to band `pressures` (no lead before) as "Design Engineering keeps product thinking and frontend reasoning in one responsibility: coded evidence before a roadmap commits, shared frontend systems, and a running product that still behaves as intended.".

**ai-product-ux**

- Title: "Design the relationship between people, models and product state" (64 chars) → "Design how people, models and product state meet" (48).
- Lead: unchanged.
- Eyebrow "AI Product UX": removed from the hero; now `name`, the last crumb.
- Hero body "The work combines product strategy, UX, interaction, evaluation and implementation responsibility." moved to band `model-roles`, merged with its lead "AI Product UX is the wider relationship: how people understand, direct, evaluate, control and recover from model behaviour. It starts with what the model is allowed to do." → "The work combines product strategy, UX, interaction, evaluation and implementation: how people understand, direct, control and recover from model behaviour. It starts with what the model may do.".

**design-systems**

- Title: "A design system must earn its place in product work" (51 chars) → "A design system must earn its place in the work" (47).
- Lead: unchanged.
- Eyebrow "Design Systems": removed from the hero; now `name`, the last crumb.
- Hero body "Tcules helps product organisations define, build and operate design systems — across product semantics, foundations, tokens, components, Figma, code, documentation, contribution, release and adoption." moved to band `library-is-one-representation`, merged with its lead "A library can be visually consistent and still fail as shared infrastructure. A local workaround can be rational; a system earns use only when the supported route is easier to understand, extend and release than the workaround." → "Tcules helps teams define, build and operate the whole system, from product semantics and tokens to Figma, code, release and adoption. A system earns use only when its route is easier than the workaround.".

**software-development**

- Title: "Software development under product-design responsibility" (56 chars) → "Software development, led by product design" (43).
- Lead: unchanged.
- Eyebrow "Design-led Software Development": removed from the hero; now `name`, the last crumb.
- Hero body "Product Design stays the centre of gravity. Engineering carries its decisions into running software, as agreed:" moved to band `what-changes`, merged with its lead "The delivery record keeps these connected, so edge states and change can be implemented rather than guessed." → "Product Design stays the centre of gravity and engineering carries its decisions into running software. The delivery record keeps them connected, so edge states are implemented, not guessed.".

**product-modernisation**

- Title: "Change the product without losing the work it carries" (53 chars) → "Change the product, keep the work it carries" (44).
- Lead: "Tcules helps the team find the layer causing the cost, protect what still works, and carry the right intervention through product design, design systems, coded evidence or software delivery." (29 words) → "Tcules helps the team find the layer causing the cost, protect what still works, and carry the right change through design, systems, code or delivery." (25).
- Eyebrow "Product Modernisation": removed from the hero; now `name`, the last crumb.
- No hero body.

## 5. The trail names the page; the h1 argues it

**Page / section.** The trail at the top of every hero, on all 128 pages that carry one. Mechanism: `heroTrail` in `src/lib/trail.ts`; component change in `docs/specs/Breadcrumbs.md` (5 Oct amendment, item 5).

**What's needed.** Nothing blocking: the fix is in code. Three content asks follow from it.

1. **Future Interfaces Lab heading.** "Future , Interfaces Lab by Tcules" carries a stray comma from the CMS, and it is the page's name rather than a line the page argues. Fix the comma now. Better: give the page a message as its h1 (what the lab is for, 2 to 10 words). The trail will then name it "Future Interfaces Lab", as the parent crumb on `/future-interfaces-lab/join` already does.
2. **Matter Design System heading.** "Save time | Build consistency. Matter | Design System" joins a message and the name with pipes, and carries a U+200D before "Matter". Same ask: a message as the h1, the name left to the trail.
3. **A short name on every record whose h1 is a headline** (service, expertise, case study). Today these trails stop at the parent ("Home / Services", "Home / Case studies"), because the record has no name shorter than its title and the h1 already says the title. With a name, the trail can end in it ("Home / Services / Product Design"), as the six designed service pages do from `story.name`. Recorded as a model change in `docs/strapi-changes.md` § 16; the case-study `client` field (§ 2 above, strapi-changes § 13) serves the same purpose for case studies.

**Why.** The trail sits 32px above the h1 (kit `fdn-top`). On most pages its last crumb was the page's full title, so the headline read twice, and on a phone a headline-length crumb wrapped onto a second line led by a divider. The last crumb now names the page only when the h1 does not:

| Pages | Trail | Why |
|---|---|---|
| about, contact, careers, how-we-work, services, insights, case-studies | Home / *name* | the h1 is a message; the crumb is the page's nav label |
| six `/design/service-page` pages | Home / Services / *story.name* | the h1 is a headline; `story.name` is the name |
| services/* (since the second 6 Oct fix round) | Home / Services / … / *name* | the name from the slug, or the CMS eyebrow where it spells that name out |
| expertise/*, case-studies/*, audits/*, glossary/*, tools/*, insights articles, guides, podcasts and events, future-interfaces-lab/join | Home / … / *parent* (a link) | the h1 is the page's only name, so it is the current page |
| terms-of-use, privacy-policy, future-interfaces-lab, matter-design-system | none | the h1 is the name and the parent is Home; a lone "Home" is not a trail |

Eyebrows on services/* and expertise/* now stand under "Home / Services" or "Home / Expertise" and name the page ("Product Modernisation", "B2B SaaS and workflow software"). That is what an eyebrow under a trail may carry.

*Fix round, 6 Oct 2026.* An eyebrow that SAYS a crumb is a repeat, not only one that equals it (`src/lib/trail.ts`, `repeatsTrail`). Ten CMS eyebrows did, and the routes now drop them: "Product Design specialist" on the five product-design L2 pages (under "… / Product design"), "Product Design services" on /services/product-design (under "Home / Services"), "Design-System Strategy", "Design-System Implementation" and "Design-System Governance and Adoption" (under "… / Design systems"), and "Product audit" on /audits/ai-product-ux-readiness (under "Home / Audits"). Content need do nothing for the page to be right. When the records gain a short `name` (`docs/strapi-changes.md` § 16) the eyebrow field on these types can be retired; until then, an eyebrow written for them should be a category or format no crumb says.

*Second fix round, 6 Oct 2026.* That rule cost four pages their name: on /services/product-design and the three design-systems L2 pages the trail ended at the parent, so the dropped eyebrow had been the only place the page was named. The service trail now ends at the page's name (above), so every service eyebrow restates the trail and is dropped, all 27, and none is the only name on its page. Two corrections to the list above: the section crumbs ("Home", "Services", "Audits", "Case studies") are repeated only by an eyebrow that EQUALS them, so "Product audit" on /audits/ai-product-ux-readiness is shown again, and "Case study · Fintech" is a valid case-study eyebrow. **For content:** in development each dropped eyebrow logs `eyebrowBesideTrail: dropped the hero eyebrow …`, naming the crumb it says, once per distinct eyebrow and crumb. *Third fix round, 6 Oct:* an eyebrow that IS the page's name ("Trust, Control and Recovery", "How We Work") now becomes the crumb instead of being reported, so the records left to act on are the ones the trail genuinely repeats, six distinct values over 165 pages: "Product Design services" and "Design-led Software Development" on two service lines, "Product Design specialist" on the five product-design specialisms, "Audit" / "Audits" on four audits, and "Glossary" on the glossary terms. Each can be cleared in the CMS, or replaced with a category or format no crumb says.

**Found in.** Kit `fdn-top` review round, 5 Oct 2026.

## 6. Product Design recomposed from the UI kit (6 Oct 2026)

**Page / section.** `/design/service-page/product-design`, every band (`src/content/sources/fixtures/ideal/services/product-design.ts`).

**What's needed.** Approve, rewrite or reject each edit below. Each one meets the § 1.5 budget of the band the template now gives that section (visual-direction § 8.2). Hero title (48 characters) and lead (26 words) were already in budget and are unchanged.

| Band | Field | Old | New |
|---|---|---|---|
| B signals | eyebrow | What the interface may be telling you | What the screen says |
| B signals | heading | The screen is often where a deeper product problem becomes visible. | Where the problem shows first |
| B signals | lead | For new products and for established B2B, workflow, data-rich and AI-enabled software, where a visual change may reveal a workflow, data or authority problem. | In B2B, workflow, data-rich and AI products, a visual complaint points at a workflow, data or authority problem. |
| B signals | tile 2 body | May be protecting a real control, or compensating for a hand-off the product never modelled. | May be protecting a real control, or covering a hand-off the product never modelled. |
| B signals | tile 4 title / body | A polished AI interaction / May be hiding what the model used, what it changed, and who is accountable when it is wrong. | A polished AI feature / May be hiding what the model used, what it changed, and who answers when it is wrong. |
| B signals | tile icons | none | question-circle, clock-circle, widget, cpu (NEW) |
| H clients | whole band | none | NEW: eyebrow "Clients", heading "Teams we have shipped with", six real marks and the Clutch rating |
| F method | eyebrow / heading | What Product Design owns / How one product decision moves through the work | What Product Design owns / From the real work to the build |
| F method | lead | One product rule, explained, challenged, implemented and tested. | One product rule, explained, challenged, implemented and tested. Each step leaves an artefact the team keeps using. |
| F method | step bodies (5 rows hold one line, ≤ 10 words) | What triggers rescheduling, who decides, who is affected, and which commitment cannot silently move. · The job, dependency, owner and committed date — and the difference between blocked, proposed and accepted. · Preview affected work before confirming, name who must respond, keep the reason after the change. · Conflicting jobs, limited permissions, partial updates and a mistaken change: consequence and recovery. · Interface states, service responses, notifications and history all use the same accepted rule. | Who decides, who is affected. It leaves a research record. · Objects, roles, states and authority, written as one model. · Every state and recovery, in an interaction specification. · The riskiest question, prototyped and tested on real cases. · An implementation trace from the rule to components and tests. |
| — | "What you receive" section | five deliverables as a ledger (Product model, Research record, Interaction specification, Prototype and evaluation, Implementation trace) with their descriptions | folded into the five steps, one artefact per step; the long descriptions move to the deep page |
| E worked example | whole band | the worked-example Callout above the steps, plus an illustration slot | NEW band: eyebrow "Worked example · fictional", heading "Moving one job moves others", lead "A job is rescheduled after a required input falls through. The product must show what moves with it.", a five-stage Thread (Input unavailable → New date proposed → Dependent work shown → Owner responds → Change accepted) with the return path "A mistaken change has a safe way back to the last accepted plan." Stage lines are NEW COPY |
| G proof | heading | A client’s view of the working relationship | In a client’s words |
| G proof | portrait | stand-in square portrait | removed (§ 5.8: no stock face beside a real name) |
| G proof | case body | Qualitative research across specialist roles, carried into a product model and component-led interface work. | Research across specialist roles, carried into a product model and component-led interface work. |
| C-pair work | lead | none | Two more products where the model was settled before the screens were drawn. (NEW) |
| C-pair work | Doodle title / body | Priority and bookability, modelled before they were drawn / Meeting type, organisational priority, tentative availability and bookability confidence, connected in one scheduling model. | Priority and bookability, modelled first / Meeting type, priority, tentative availability and bookability confidence, connected in one scheduling model. |
| C-pair work | scope note | Each case establishes the research, modelling and design responsibility it names. Implementation and outcome are bounded by its own record. | Each case proves the research, modelling and design it names; outcomes are bounded by its own record. |
| K offer | heading | A workflow that keeps raising questions about rules, roles or recovery? | A workflow that keeps raising questions? |
| K offer | body | Examine that slice before the team commits to more screens. | Examine that slice of rules, roles and recovery before the team commits to more screens. |
| K offer | points (one line beside a photo) | The workflow, walked through — With the people who run it, on real cases. · The rules it depends on — Who decides, what state things are in, and the way back. · What to design first — And what can wait until the rule is settled. | The workflow, walked through with its people · The rules, roles and way back beneath it · What to design first, and what can wait |
| C-icon router | eyebrow / lead | Go narrower when the problem is located / none | Go narrower / When the problem is located, a narrower service settles it faster. |
| C-icon router | card names (one line at h5) | Information Architecture & Workflow Design · Prototyping & Usability Testing | IA & Workflow Design · Prototyping & Testing (the routes are unchanged) |
| C-icon router | conditions (≤ 14 words) | The open question is about people, context, current behaviour, or an assumption that could change direction. · Records, roles, state, permissions, navigation and the operating work no longer agree. · The rule is understood, but its behaviour, hierarchy, states and responsive form are not. · Someone must notice, compare, interpret and act — with clear definitions, freshness, uncertainty and source. · The next commitment depends on evidence a diagram or a static screen cannot provide. · You can see the problem but not yet where it sits: research, model, behaviour or evidence. | When people, context or one risky assumption could change the direction. · When records, roles, state and navigation no longer agree with the work. · When the rule is understood, but its states and responsive form are not. · When someone must compare, interpret and act, with clear definitions and sources. · When the next commitment needs evidence a static screen cannot give. · When you can see the problem but not yet where it sits. |
| C-icon router | icons | none | users-group-rounded, layers, ruler-pen, graph-up, monitor, eye (NEW) |
| N fit | eyebrow / heading / lead | none / Who is involved / The work runs on real access and on people who can decide. | Who is involved / Real access, people who decide / none |
| N fit | items | A client-side owner who can resolve consequential choices and technical constraints · The brief allows visual styling only, and forbids discussing product behaviour · No realistic product, user, data or implementation context can be shared | An owner who can settle consequential choices and technical constraints · The brief allows visual styling only, and forbids discussing behaviour · No realistic product, user, data or build context can be shared |
| I banner | whole band | "Go deeper / Read before you brief" with two resource cards (Design thinking vs CX vs UX; How we work) | Eyebrow "Before you brief", heading "How an engagement runs", lead "How a Product Design engagement runs, from the first question to the build.", link "See how we work". The article card moves to the deep page |
| L close | body | The decision, the roles it affects and the evidence you already have. A rough brief is enough. | The decision, the roles it affects and the evidence you already have. |
| L close | points | Send the decision and what you know — A rough brief is enough. · A reply within one business day — With the questions we need answered. | Send the decision — And what you already know about it. A rough brief is enough. · A reply within a day — One business day, with the questions we need answered first. |

**Why.** The 1 Oct review found the page read as a document: one shape repeated, one image, bands over the fold. The kit sets each section in its own band shape with a photograph or diagram every second band, and every band now fits 1470 × 830. Copy over its band's line budget was cut, or moved to the deep page.

**Found in.** `kit/page-product-design`, 6 Oct 2026.

### 6.1 Fix round 1 (7 Oct 2026)

**Page / section.** `/design/service-page/product-design` (`src/content/sources/fixtures/ideal/services/product-design.ts`).

| Band | Field | Old | New |
|---|---|---|---|
| B signals | lead | A visual complaint usually points at a workflow, data or authority problem. | A visual complaint often points at a rule underneath. |
| G proof | eyebrow | none | Proof |
| G proof | rating | the Clutch pill under the attribution | removed: the H band directly above already carries it beside the marks |
| C-pair work | lead | Two more products where the model was settled before the screens were drawn. | Two more products where the model was settled before the screens were drawn. Each case claims only what its own record shows. |
| C-pair work | scope note | Each case proves the research, modelling and design it names; outcomes are bounded by its own record. | removed, folded into the lead (it floated under the lead as an orphaned footnote) |
| J statement | whole band | none | NEW: eyebrow "How we work", sentence "One accountable team, from the first question to the shipped build.", link "See how we work" |
| I banner | whole band | Before you brief / How an engagement runs / How a Product Design engagement runs, from the first question to the build. / See how we work | removed: its one link moves to the J statement, and its lead restated its heading |
| K offer | actions | Start a project · Start with a UX Product Audit (the hero's pair, a second time) | Start with a UX Product Audit (one ask: the audit is the slice the offer names) |
| L close | eyebrow | none | Start a project |

**Why.** The round-1 review: no band had real scale, the banner spent 660 px on one link, the hero's two CTAs appeared three times, and the eyebrows drifted. **Found in.** `kit/page-product-design`, fix round 1.

### page-product-design fix round 2 (6 Oct 2026)

| Fixture | Field | Old | New |
|---|---|---|---|
| product-design | `photos` stand-in pool | … `workshop-brick-room`, `hands-trackpad` | … `workshop-brick-room` (`hands-trackpad` is now B's photo, § 5.6, so it leaves the stand-in pool) |
| product-design | file header, `signals` line | what the screen may be telling you — B, beside the studio board | what the screen may be telling you — B, beside a screen in use |
| stress | capped band's `more` label | Every option, on the deep page | The full list, on the deep page (it now also labels the capped bridge) |
| stress | spectrum and bridge caps | spectrum 6 of 7 options | spectrum 5 of 7, bridge 6 of 7, matching the template's structural caps |

## Product Modernisation recomposed from the UI kit (6 Oct 2026)

**Page / section.** `/design/service-page/product-modernisation`, every band (`src/content/sources/fixtures/ideal/services/product-modernisation.ts`).

**What's needed.** Approve, rewrite or reject each edit below. Each meets the § 1.5 budget of the band the template now gives that section. The page went from 12 bands with two over the fold (1168 and 1275 at 1470; 2329 at 390) to 12 bands that all fit (tallest 816 at 1470, 1550 at 390). Hero title (44 characters) and lead (25 words) were already in budget and are unchanged.

| Band | Field | Old | New |
|---|---|---|---|
| A hero | second action | Request free audit | Request the free assessment (one name for the assessment across hero, K and the router) |
| B four views | eyebrow / heading | One product, four problems / Established software rarely has one modernisation problem. | Four views, one product / Established software rarely has one problem |
| B four views | tiles | four tiles: Sales — sees an ageing product. · Support — sees recurring exceptions. · Engineering — sees dependencies that make every change expensive. · Customers — know the current behaviour — including the workarounds. | two tiles, so the B band carries the counterweight (§ 6.4): Inside the company — Sales sees an ageing product, support sees recurring exceptions, engineering sees costly dependencies. · Outside it — Customers know the current behaviour, workarounds included. Their learning is what a modernisation must not break. |
| H clients | whole band | none | NEW: eyebrow "Clients", heading "Teams we have shipped with", six real marks (Knovos, Quoter, SafeXpay, GT Tools, Doodle, Omny) |
| E choose | heading / lead | Choose the least disruptive change that resolves the real constraint / Every intervention is right somewhere, and expensive when one label is applied to the whole product. A programme may use several: the point is the right change for each meaningful capability. | The least disruptive change that works / Every intervention is right somewhere, and costly when one label is applied to the whole product. |
| E choose | four-item "what goes wrong" ledger (A visual refresh / A replatform / A full redesign / A selective repair) | above the spectrum | removed; the lead carries the point |
| E choose | spectrum rows | seven: Leave unchanged, Repair, Redesign, Progressive modernisation, Replatform, Selective rebuild, Retire, each with a full-sentence condition and question | five (the template's cap): Leave unchanged — A stable capability costs little. — What evidence would reopen it? · Repair — Local friction hides useful behaviour. — Which defect can change without reopening the model? · Redesign — Roles, sequence or exceptions no longer fit. — What should stay recognisable? · Replatform — The platform is the binding constraint. — Which behaviour and data must survive? · Selective rebuild — One subsystem is beyond extension. — Can its boundary hold against hidden dependencies? Progressive modernisation and Retire move to the worksheet, linked "All seven, in the worksheet" (NEW) |
| C-text continuity | eyebrow / lead | none / Users have invested in terminology, sequence, saved records, shortcuts, integrations and recovery paths. Some of that learning reflects a sound model; some is effort spent compensating for weak design. Modernisation has to tell the two apart. | What must survive / Some familiarity reflects a sound model; some is effort spent on weak design. The plan tells them apart. |
| C-text continuity | card bodies | Essential work still completes. · Familiar objects and rules change only with reason. · Records, history and meaning survive the transition. · … · Each release generates evidence for the next decision. | Essential work still completes, during the move and after it. · Familiar objects and rules change only with a stated reason. · Records, history and their meaning survive the transition. · … · Each release produces evidence for the next decision. Learning icon graph-up → refresh |
| C-text continuity | "Why record it" note | The record stops "keep it familiar" and "make it modern" being opposing opinions. … | removed (deep page) |
| E transition | eyebrow / heading / lead | none / The transition is part of the product / Live modernisation creates temporary product and technical work that a final mock-up never shows. It shapes the experience, data meaning, operating risk and scope — so it is designed, not discovered after approval. | Both products live / The transition is designed too / Live modernisation creates temporary product work a final mock-up never shows. Tcules designs it before approval. |
| E transition | bridge items | seven, including "Support for changed behaviour" | six (the template's cap); that item moves to the deep page |
| G proof | whole band | none | NEW: eyebrow "Proof", heading "In a client’s words", the Auxentios quote (Ashok Mohanty) with the Clutch rating. CONTENT ASK: a modernisation client's own quote when the testimonial register lands (tracker 0.4); this is the only real quote in the fixtures and it is not specific to modernisation |
| F method | section | "How the work comes together", a seven-row numbered ledger (Diagnosis, Intervention, Product direction, Proof, System and build, Transition, Evolution) plus an "Ownership" note | eyebrow "How the work runs", heading "From diagnosis to the next release", lead "End-to-end responsibility, or inside a team that keeps engineering, data or release. Ownership is written first.", five steps: Diagnose the running product — Its model, evidence, dependencies and change process. · Decide each intervention — Preserve, repair, redesign, replatform, rebuild or retire. · Prove it in a slice — A prototype or coded slice tests the decision. · Build and transition — Foundations, code, migration and recovery, as scoped. · Review the evidence — Then decide whether the next capability moves. |
| — | "Where AI changes modernisation" section (flow: AI accelerates / A person still decides) | its own band | removed; to the deep page |
| M work | section | "Test the decision inside a feature that matters", two cases (C-pair) with long bodies | eyebrow "Modernisation work", heading "Change at the layer causing the cost", lead "Three products where the change went as deep as the cost, and stopped there.", three cases: Benchmark Gensuite · went deeper — A visual upgrade exposed the IA — A reused scope selector showed unclear boundaries; the IA changed, continuity held. · Dealpath · stayed selective — Density kept, one path changed — Listings gained a clearer reading order; one creation path changed. · Gold Image Printing · Legacy ERP — A legacy ordering flow, rebuilt — An ordering flow rebuilt so print buyers finish what they start. (NEW, from the listing's own description) |
| K offer | whole band | none | NEW: eyebrow "Not sure where to start?", heading "Settle the boundary before delivery starts", body "The Product Modernisation Assessment decides repair, redesign, replatform or rebuild, capability by capability.", points The product, walked through · Each capability’s change, decided · What stays familiar, recorded, action "Request the free assessment" |
| C-icon router | eyebrow / lead | Assessment or delivery / none | Go narrower / When the boundary is clear, a narrower service settles it faster. |
| C-icon router | conditions | The team still disagrees about repair, redesign, progressive change, replatforming or rebuild. It settles the boundary, before delivery starts. · The problem is a contained experience problem. · Dependencies and accumulated change cost are the constraint. It settles staged continuity. · The platform move is already decided. It settles the behaviour that must survive the move. | The team still disagrees on repair, redesign, replatform or rebuild (the assessment, now `also`). · The cost sits in the experience, and the model underneath still holds. · Dependencies and accumulated change cost are the binding constraint. · The platform move is decided; the behaviour that must survive is not. Icons checklist, ruler-pen, server, layers (NEW) |
| — | FAQ "Ownership and release acceptance, before the roadmap" (three questions) | its own band | removed; ownership is in the F lead, what to send is in the close, release acceptance moves to the deep page |
| — | Resources "Run the comparison yourself" (worksheet, definition) | its own band | removed; the worksheet is the E band's link, the definition moves to the deep page |
| L close | eyebrow / heading / body | none / Start with the capability that cannot safely stay as it is / The capability, the operational dependency and the change that can no longer be deferred. A rough brief is enough. | Start a project / Start with the capability that cannot stay as it is / The capability, what depends on it, and the change that can no longer wait. |
| L close | points | Send the capability and what depends on it — One workflow is enough to start. · A reply within one business day — Incomplete evidence becomes uncertainty to test. | Send one capability — And what depends on it. A rough brief is enough. · A reply within a day — One business day. Incomplete evidence becomes uncertainty to test. |
| — | `photos` stand-in pool | studio-whiteboard-crit, studio-session-talk, workshop-brick-room, hands-trackpad | studio-whiteboard-crit, studio-session-talk, studio-desk-pairing, workshop-brick-room (hands-trackpad is product-design's B photo) |

**Why.** The 1 Oct review found the page read as a document. Two bands ran past the fold, and the page had no proof band, no offer and no logos. Now every section has its own band shape, there is an image every second band, and all twelve bands fit 1470 × 830. **Found in.** `kit/page-product-modernisation`, 6 Oct 2026.

### Product Modernisation fix round 1 (6 Oct 2026)

**What's needed.** Approve, rewrite or reject each edit. The round removes the repeated "rule, icon, serif title, two-line body" tile from three of its four bands, puts imagery into the spectrum-to-proof stretch, and drops the router's duplicate of the offer. Still 12 bands; tallest 791 at 1470, 1440 at 390.

| Band | Field | Old | New |
|---|---|---|---|
| B four views | tiles | two: Inside the company — Sales sees an ageing product, support sees recurring exceptions, engineering sees costly dependencies. · Outside it — Customers know the current behaviour, workarounds included. Their learning is what a modernisation must not break. | four, so the eyebrow's "four views" are shown: Sales — Sees an ageing product, and a roadmap slowed by what it carries. · Support — Sees recurring exceptions, handled by hand, release after release. · Engineering — Sees dependencies that make every change expensive. · Customers — Know the current behaviour, workarounds included. That learning must not break. (No counterweight: the template gives it only to two tiles.) |
| C-pair work | position / lead | band 9, after the method / Three products where the change went as deep as the cost, and stopped there. | band 5, straight after the spectrum it evidences / Two products where the change went exactly as deep as the cost, and stopped there. |
| C-pair work | cases | three, including Gold Image Printing · Legacy ERP — A legacy ordering flow, rebuilt | two (Benchmark Gensuite, Dealpath); Gold Image Printing is reachable from "All case studies" |
| C-pair work | Dealpath title | Density kept, one path changed | The density stayed; one path changed (the old title broke "one / path") |
| N continuity | block | six icon tiles: Operational · Conceptual · Data · Access · Commercial · Learning | a contrast pair, which is the lead's own distinction. Keep what still carries the work — Essential work, completing during the move and after it · Records, history and what they mean · Roles, permissions and approval authority · Contractual and service commitments. Let go of what only carries habit — Steps that exist only because the old platform required them · Workarounds built around a defect the change removes · Labels and groupings the work has outgrown (NEW). Conceptual continuity is the lead; Learning is the method's last step |
| G proof | case | none | the Auxentios CPQ case the quote came from (G-case), as on product-design. CONTENT ASK unchanged: a modernisation client's own quote |
| K offer | body / points | The Product Modernisation Assessment decides repair, redesign, replatform or rebuild, capability by capability. / The product, walked through · Each capability’s change, decided · What stays familiar, recorded | The Product Modernisation Assessment walks the product through and decides, capability by capability, what to repair, redesign, replatform or rebuild, and what stays familiar. / none (the three points are the sentence) |
| K offer | photograph | `pencil-wireframe-violet` | `office-calm-interior` (the violet cast read as a stock filter; slot table in src/lib/photos.ts) |
| Router | heading / lead | Choose where to start / When the boundary is clear, a narrower service settles it faster. | When the layer is already clear / A narrower service settles a known boundary faster. |
| Router | routes | four icon cards, the fourth "Product Modernisation Assessment" | three linked rows, no icons (the assessment is band 10's offer, one scroll earlier) |

