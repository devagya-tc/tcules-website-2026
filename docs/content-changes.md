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

## 7. Software Development recomposed from the UI kit (6 Oct 2026)

**Page / section.** `/design/service-page/software-development`, every band (`src/content/sources/fixtures/ideal/services/software-development.ts`).

**What's needed.** Approve, rewrite or reject each edit below. Each meets the § 1.5 budget of the band the template now gives that section (visual-direction § 8.2). The page goes from 12 bands of four shapes (E, D, E, E, D, E, M, D-faq, M: no photograph outside a card, two bands over the fold) to 12 bands of eleven: A, B, H, F, E, G, M, J, C-icon, K, D-faq, L, every one ≤ 789 at 1470.

| Band | Field | Old | New |
|---|---|---|---|
| A hero | title | Software development, led by product design | Software built on settled product decisions (43 characters) |
| A hero | lead | Tcules builds software where product behaviour, interaction and implementation need one accountable delivery path. | Tcules designs and builds running software in one accountable path, so roles, rules and edge states reach the code decided, not guessed. (22 words) |
| A hero | second action | none | Prototype Hardening Review → `/audits/prototype-hardening-review` (NEW; the hero carries one solid action and one link, § 2.3) |
| B signals | whole band | none | NEW: eyebrow "Where builds go wrong", heading "Where builds break", lead "The trouble starts where a decision never reached the code.", two tiles: "Every layer is done — Each team finished its part, yet no path a user takes works end to end." (from the slice argument) and "Edge states are guessed — The screens showed the happy path, so the code had to invent the rest." (from the old what-changes lead). Icons layers, question-circle. Two tiles, so the band carries the `counterweight` (§ 6.4) |
| H clients | whole band | none | NEW: eyebrow "Clients", heading "Teams we have shipped with", six real marks (GT Tools, Omny, LatitudePay, SafeXpay, Quoter, Knovos) and the Clutch rating |
| — | "What design-led development changes" Thread (6 stages) | Product decision · Role, rule and state model · Interaction · Data and API contract · Implementation constraint · Acceptance and release, each with a line | folded into the F steps below: it and the delivery trace were one argument told twice |
| F delivery trace | eyebrow / heading | Software delivery trace / Every stage cites the one before it | What design-led changes / Engineering receives the decisions |
| F delivery trace | lead | Requirements cite product decisions. Acceptance covers behaviour and implementation. What production shows enters the next decision. | Every stage cites the one before it, so edge states are implemented, not guessed. |
| F delivery trace | stages | a nine-stage Thread with no bodies (Requirement · Decision owner · Design state · Technical contract · Implementation · Automated and manual acceptance · Deployment · Observation · Change) and the loop "Production observation returns to the next product decision." | five steps (NEW COPY, ≤ 9 words each): Settle the behaviour — Roles, rules and states, decided with their owner. · Write the contract — The data and API terms each part owes. · Build the slice — Interface, services and data along one path. · Accept it twice — Automated and manual tests, behaviour and code. · Ship and observe — What production shows enters the next decision. |
| E slice | eyebrow / heading | none / A release is a complete product slice | How a release is cut / A release is a complete slice |
| E slice | lead | A credible release connects a user condition to the records, rules, interfaces and operations that complete it. Organised only by layer, every team can be locally complete while the product path stays unusable. | Organised by layer, every team can finish its part while no user path works. |
| E slice | layer / release notes | Each team builds half its layer, each on different paths. No path has every piece, so nothing a user can do works yet, and nothing can ship. · The same amount of work, with every layer building the same paths. Two things a user can do work end to end, and ship. | Each team builds half its layer, each on different paths. Nothing a user can do works yet, and nothing can ship. · The same work, with every layer building the same paths. Two things a user can do work end to end, and ship. |
| E slice | acceptance levels | "A release is accepted at three levels": Product behaviour · System behaviour · Release behaviour, under the grids (the band ran 1038) | moved to the FAQ "When is a release accepted?", text unchanged |
| G proof | whole band | none | NEW: eyebrow "Proof", heading "In a client’s words", the approved Auxentios quote (Ashok Mohanty) beside the Auxentios case: "A quotation model, carried into components" (NEW title) / "Research across specialist roles, carried into a product model and component-led interface work." **Ask:** the only approved quote is Product Design's; a software-delivery quote would replace it here |
| M evidence | eyebrow / heading | none / Evidence of implemented responsibility | Evidence / Work that reached code |
| M evidence | lead (was the scope note) | note: Each case establishes only the responsibility stated in its record. ConnectX is not a production deployment claim. | lead: Each case claims only its own record. ConnectX is a coded demonstration, not a deployment. |
| M evidence | ConnectX title / body | AI architecture, scenario modelling and a hybrid workspace / A coded demonstration connecting all three, for a bounded engagement. | AI architecture in a hybrid workspace / A coded demonstration of AI architecture, scenario modelling and a hybrid workspace. |
| J statement | whole band (was the AI section, an E flow) | eyebrow AI-assisted engineering, heading "Production responsibility does not move to the model", lead "Versatility matters more as frameworks change. Accountability does not.", a two-stage flow (AI accelerates: architecture exploration, implementation, test generation, documentation · Tcules reviews it against: the product and system model, security and data requirements, coding standards, acceptance) | J: eyebrow "AI-assisted engineering", statement "Production responsibility does not move to the model.", link "AI Product Engineering". The flow and the lead move to the FAQ "How does Tcules use AI in engineering?" |
| C-icon router | eyebrow / lead | Go to the part that binds / none | Where the risk sits / When one part of the system carries the risk, a narrower service settles it faster. (NEW) |
| C-icon router | conditions | A SaaS product or web application is the binding part. · The model, its data and its interaction are the product. · The interface layer carries the risk. · Services, data and integrations carry it. · It has to run on a phone. · The product has launched and has to keep changing. | each now opens "When …" (same words) |
| C-icon router | card names (≤ 5 words, one line) | SaaS and Web Application Development · Backend and API Development · Mobile Application Development · Product Maintenance and Evolution | SaaS and Web Apps · Backend and API · Mobile App Development · Maintenance and Evolution (routes unchanged) |
| C-icon router | icons | none | widget, cpu, monitor, server, smartphone, refresh (NEW) |
| K offer (was a D ledger) | eyebrow / heading / body | none / Three ways to hand over responsibility / none | Ways to engage / Choose how much responsibility to hand over / Tcules can own a whole product, one technical surface, or a launched product’s next change. (NEW) |
| K offer | points | Build a product or major capability — Tcules owns product definition through implementation for an agreed scope, with your domain, product and technology leadership. · Deliver one technical surface — Frontend, backend, API, integration, AI or mobile responsibility, bounded inside your existing architecture. · Continue an existing product — Maintenance and product evolution after launch, under project-specific terms, priorities and support. | A product or capability — Definition through build, with your domain and technology leads. · One technical surface — Frontend, backend, API, AI or mobile, inside your architecture. · An existing product — Maintenance and evolution after launch, on project terms. |
| K offer | actions | none | Start a project · See how we work (the old resources card "How we work") |
| — | Ownership ledger (6 icon rows) | Ownership and handover are delivery decisions: Repository and environment access · Credential custody · Deployment ownership · Documentation · Third-party licences · Post-launch handover, and its lead | folded into the FAQ "Will we control the code and delivery assets?" |
| D-faq | eyebrow | none | Questions |
| D-faq | "Will we control the code…" answer | Yes, for the client-controlled repositories, credentials and deployment assets defined in the delivery scope — and continuously, not only at a final handover. The signed agreement states legal ownership, third-party licences, pre-existing materials and any managed-service dependency. If an asset cannot be transferred or independently controlled, that constraint is visible before the implementation choice is accepted. | Yes, from the start. You hold repository and environment access; credential custody and deployment ownership are named before work starts; documentation is enough to continue without us. The agreement states ownership and third-party licences, and any constraint is visible before a choice is accepted. |
| D-faq | new questions | none | "When is a release accepted?" (the three levels, plus the accessibility answer and its guide link) · "How does Tcules use AI in engineering?" (the old AI flow and lead) |
| D-faq | infrastructure answer | … not a standalone managed-cloud, enterprise-infrastructure, security-operations or penetration-testing provider … | … not a standalone managed-cloud, security-operations or penetration-testing provider … |
| D-faq | "Where does accessibility acceptance come from?" | its own question | merged into "When is a release accepted?" (four questions keep the open answer in the fold) |
| — | Go deeper resources (2 cards) | Inclusive product design guide · How we work | the guide is a link in the release-acceptance answer; How we work is K's link |
| L close | eyebrow / heading | none / Start with the product slice that needs to ship | Start a project / Start with the slice that needs to ship |

**Why.** The 1 Oct review: the page read as a document. Now every band is ≤ 789 at 1470 and ≤ 1671 at 390. No two bands without an image sit next to each other. Seven of the ten bands between hero and close carry a photograph, a diagram or covers. The § 6.4 texture signature is in place: counterweight on B, horizon above G, closing on L.

**Found in.** `kit/page-software-development`, 6 Oct 2026.

### 7.1 Fix round 1 (6 Oct 2026)

| Band | Field | Old | New |
|---|---|---|---|
| B signals | eyebrow | Where builds go wrong | Design to code (the old one restated the heading) |
| B signals | tiles | two: Every layer is done · Edge states are guessed | four, adding "Contracts are assumed — Each side guessed what the other would send, so integration found the gaps." (icon code) and "Done was never agreed — No one set what a release must prove, so acceptance became a debate." (icon checklist), both NEW COPY. Four tiles fill the copy column, so B's head is the h2 role, not display, and the texture placement moves from B's counterweight to J's corner |
| C-icon router | position | after the J statement | after the clients band, before the method: the first head-track band, so its head sits on the start side and F's photo moves to the end side (copy unchanged) |
| G proof | case beside the quote | Auxentios · Industrial CPQ / A quotation model, carried into components / Research across specialist roles, carried into a product model and component-led interface work. | removed: the quote is the band's point, so it takes the display role alone. The case stays on Product Design, which carries the same card |
| M evidence | ConnectX meta | ConnectX · Integrated product and software | ConnectX · Product and software (one line at 390) |
| M evidence | Benchmark meta | Benchmark Gensuite · Feasibility in code | Benchmark Gensuite · Feasibility (one line at 390) |
| K offer | heading | Choose how much responsibility to hand over | Choose how much of the build we own (two balanced lines) |
| L close | eyebrow | Start a project | Next step (the old one repeated the CTA label) |

**Why.** Fix round 1 review. **Found in.** `kit/page-software-development`, fix round 1.

### 7.2 Fix round 2 (6 Oct 2026)

| Band | Field | Old | New |
|---|---|---|---|
| — | band order | A B H C-icon F E G M J K D-faq L | A B H E F M C-icon G K D-faq J L: the slice and the method argue before the router offers six services; the router's photo moves to the end side; J follows the centred FAQ, so it sets left, not as a second centred serif column after G (copy unchanged) |
| E slice | layers | Interface · Services · Integrations · AI service · Data | Interface · Services · Integrations · Data (three paths, so "Path 1" sets on one line at 390 and the resolved grid is one full column) |
| E slice | lead | Organised by layer, every team can finish its part while no user path works. | Cut by release, every layer builds the same path, so each release does something a user can finish. (the old lead restated B's first tile two bands up) |
| E slice | layer note | Each team builds half its layer, each on different paths. Nothing a user can do works yet, and nothing can ship. | Each team builds a third of its layer, each on a different path. Nothing a user can do works yet, and nothing can ship. |
| E slice | release note | The same work, with every layer building the same paths. Two things a user can do work end to end, and ship. | The same work, with every layer building the same path. One thing a user can do works end to end, and ships. |
| F delivery trace | heading | Engineering receives the decisions | Decisions reach the code (two lines at 1024 and 1470, not three) |
| G proof | case beside the quote | none (removed in fix round 1) | Auxentios · Industrial CPQ / Specialist research, carried into an MVP (NEW title) / Research across specialist roles, carried into a product model and its interface components. The case card brings the quote onto the head's start edge (G-case), and gives a general quote the specifics of the work it came from. **Ask:** this is still the one approved quote, shared with Product Design; a quote about decisions reaching code would replace it |
| M evidence | GT Tools title | Web design and development, end to end | Design and build, end to end (two lines at 1024, like its neighbours) |
| L close | step 01 | Send the slice that needs to ship — Its users, constraints and release outcome. | Attach what already exists — A prototype, a spec or screens, if there are any. (the old step repeated the heading and the body above it) |
| Photos | router aside / F aside (src/lib/photos.ts, this page's row only) | studio-session-talk / team-laptops-table | whiteboard-two-hands / stylus-tablet-sketch: both dim frames replaced by bright process frames, both freed by design-engineering's fix round 1 |

**Why.** Fix round 2 review. **Found in.** `kit/page-software-development`, fix round 2.

## 8. AI Product UX recomposed from the UI kit (6 Oct 2026)

**Page / section.** `/design/service-page/ai-product-ux`, every band (`src/content/sources/fixtures/ideal/services/ai-product-ux.ts`).

**What's needed.** Approve, rewrite or reject each edit below. Each one meets the § 1.5 budget of the band the template now gives that section. The page runs 12 bands (hero, B, H, E, F, J, E, K, M, D-faq, C-icon, L), every one ≤ 830 at 1470 and ≤ 1700 at 390. The hero title (48 characters) and lead (20 words) were already in budget and are unchanged.

| Band | Field | Old | New |
|---|---|---|---|
| B signals | whole band | none | NEW COPY: eyebrow "Where trust breaks", heading "Where an AI feature loses people", lead "The symptom shows in the interface. The cause is usually the role the model was given.", four tiles: Every answer re-checked (eye) — People cannot see the sources behind an output, or what is missing from them. · Edits undone by hand (undo-left) — The model changes what a person owns without showing the difference or keeping the original. · A confident guess (question-circle) — Uncertainty is hidden where it should be stated, with a way to dispute it. · An agent nobody stops (cpu) — A run of steps has no visible state, no preview and no way to halt it. Each tile restates a row of the model-role spectrum as the symptom a user sees |
| H clients | whole band | none | NEW: eyebrow "Clients", heading "Teams we have shipped with", the six real marks and the Clutch rating (as product-design) |
| E model roles | eyebrow | Before chat, copilot or agent | Before chat or agent |
| E model roles | lead | The work combines product strategy, UX, interaction, evaluation and implementation: how people understand, direct, control and recover from model behaviour. It starts with what the model may do. | Each role brings something a person must be able to inspect, direct or undo. |
| E model roles | rows | seven: … Predicts or detects (Confidence that can be wrong in both directions / Uncertainty stated, and a way to dispute it) · Orchestrates steps (A sequence nobody watched step by step / State per step, and a way to stop) … | five (the spectrum's structural cap): Generates, Transforms, Retrieves and synthesises, Recommends, Acts with delegated authority. The two cut rows live on as the B tiles "A confident guess" and "An agent nobody stops", and on the deep page |
| E model roles | deep-page link | none | Copilots and agents, in depth → /services/ai-product-ux/ai-copilots-agents (NEW) |
| F authority | eyebrow | Authority changes with consequence | Authority by consequence |
| F authority | lead | Four different product roles. For each: the consequence, whether it can be reversed, the evidence a person can inspect, the human gate and the recovery path — decided per action, not as one label for the whole feature. | Decided per action, never once per feature: the consequence, whether it reverses, the evidence and the way back. |
| J statement | whole band | none | NEW: eyebrow "What we hold to", sentence "An interface should never sound more certain than the system has earned." (re-cut from the record's old lead), link "See how we work" |
| E record | eyebrow / heading | none / The AI product responsibility record | Written down once / Eight questions per scenario |
| E record | lead | It follows the product into design and engineering, and stops an interface label carrying more certainty than the system has earned. | The responsibility record follows the product into design and engineering. (its second half is now the J statement) |
| E record | fields | seven | eight: NEW field "Accountability — Who answers for the result when it is wrong?" (flag), before Recovery; seven left a hole in the two-column sheet |
| K offer | whole band | the readiness assessment was the router's `also` row: "The scope is still uncertain, and the first evidence has to be created before the route can be chosen." | NEW band: eyebrow "Scope still unclear?", heading "Not sure what the model should do yet?", body "The readiness assessment creates the first evidence, so the route is chosen from the work rather than the technology.", points "The user work worth assisting · The product state the model touches · The authority it should receive" (from the router's old lead), action "Request the readiness assessment" |
| M evidence | heading | Evidence across different AI products | Evidence across AI products |
| M evidence | lead | none | Three of the twelve AI products we have worked on, each under a different condition. (NEW, from the stat's "twelve AI products") |
| M evidence | cases | ConnectX · BuildTwin · Eden AI (Workflow creation through search / For a developer-facing AI platform.) · Novus Insights (A survey builder that drafts, so researchers refine / Public responsibility is bounded by the available source.) | ConnectX · BuildTwin · OmnyAI (NEW: "OmnyAI · Decision support", Decision control, returned to people / The AI–human relationship reframed around the people the AI was meant to help.). Four covers stacked to 2008 at 390; OmnyAI argues the page's subject, authority. Eden AI and Novus stay on the case-study index |
| M evidence | ConnectX client / body | ConnectX · AI-native energy product / Demonstrated in code: conversational intent connected to data, dashboard modules and a digital-twin state. | ConnectX · AI-native energy / Intent connected to data, dashboards and a digital-twin state, shown in code. |
| M evidence | scope note | Tcules also uses AI in its own research synthesis, exploration, prototyping, coding and QA. That is a separate claim: … | moved to the FAQ as "Does Tcules use AI in its own work?" |
| — | "Evaluate against real decisions, not model accuracy alone" band | eyebrow, heading, lead "The acceptance set starts from representative user decisions and failure conditions.", six titles-only checks and the "Who approves" note | folded into the FAQ: "How is an AI feature evaluated before release?" (the lead and the six checks as one answer) and "Who approves the residual risk?" (the note, unchanged) |
| — | "How product responsibility combines" band | the stat 12 / AI products, its body and eight responsibilities | folded into the FAQ: "What has the work combined across twelve AI products?" (the eight responsibilities as one answer); the figure moves to the M lead |
| — | "Before the first scenario" resources band | three cards: Readiness Check, Generative AI patterns for SaaS, AI Product UX definition | folded into the FAQ: "Where should a team read first?", the three as links; the heading becomes the FAQ's |
| D-faq questions | whole band | none | eyebrow "Questions", heading "Before the first scenario", the five questions above |
| C-icon router | eyebrow / heading | Define the first AI decision / Choose the route from what the product is delegating | Go narrower / Choose by what is delegated |
| C-icon router | lead | Useful inputs are the user work, the current product state, and the authority you expect AI to receive. | Useful inputs: the user work, the current product state, and the authority you expect AI to receive. |
| C-icon router | conditions | The product is delegating a bounded task. · Review, escalation and correction are central to the work. · Failure is consequential and oversight is the question. · Retrieval and ranking decide what a person sees, and why. | When the product is delegating a bounded task to a model. · When review, escalation and correction are central to the work. · When failure is consequential and oversight is the open question. · When retrieval and ranking decide what a person sees, and why. |
| C-icon router | icons / also | none / the readiness assessment | cpu, users-group-rounded, shield-check, graph-up (NEW) / removed: it is the K offer |
| L close | eyebrow | none | Start a project |
| L close | body | The interaction, the evidence behind it and the decision rule that needs to become explicit. A rough brief is enough. | The interaction, the evidence behind it and the decision rule that needs to become explicit. |
| L close | points | Send one consequential scenario — What the model does, and what it may affect. · A reply within one business day — With what the record needs next. | Send one scenario — What the model does, and what it may affect. A rough brief is enough. · A reply within a day — One business day, with what the record needs next. |

**Not done, for content.** There is no G proof band: no attributable quote from an AI engagement exists, and the one approved quote (Auxentios) is CPQ work. A real quote from ConnectX, BuildTwin or OmnyAI, added as a `proof` section, gives the page its tint band and the `horizon` above it.

**Found in.** `kit/page-ai-product-ux`, 6 Oct 2026.

### 8.1 Fix round 1 (6 Oct 2026)

The review found three ruled text lists in a row (spectrum, steps, record), the signals and the router as one mirrored unit, a stacked double head on the record, weak SaaS-stock photographs and no texture on B. The page now runs hero, B, H, E spectrum, E thread, C-text record, K, J, M, D-faq, D router, L: every band ≤ 830 at 1470 (tallest 805) and ≤ 1700 at 390 (tallest 1628).

| Band | Field | Old | New |
|---|---|---|---|
| B signals | heading | Where an AI feature loses people | Where AI loses people (one line at the display role the counterweight gives B) |
| B signals | lead | The symptom shows in the interface. The cause is usually the role the model was given. | The symptom is in the interface. The cause is the model’s role. |
| B signals | tiles | four: Every answer re-checked · Edits undone by hand · A confident guess · An agent nobody stops | two, so the band carries the § 6.4 counterweight: Every answer re-checked (eye) — People cannot see the sources behind an output, or how sure the model is, so they redo the work. · Changes nobody can undo (undo-left) — The model edits what a person owns, or runs steps with no preview and no way to stop. The four symptoms remain, merged in pairs, and each is a row of the spectrum below |
| E model roles | meter label | Model authority | Authority (the header no longer clips at 390) |
| E model roles | rows | Output a person may not have asked for in that form. / Editing, and constraints on source. · Claims that rest on evidence the reader cannot see. / The sources, and what is missing from them. · Consequence in the product, on someone’s behalf. | Output a person did not ask for in that form. / Editing, and limits on source. · Claims on evidence the reader cannot see. / The sources, and what is missing. · Consequence on someone’s behalf. (shorter cells, shorter rows at 390) |
| E authority | block | `steps`, four numbered ruled rows beside the wireframe photo (F) | `thread`, a horizontal flow (E, centred): Inform — The model tells a person something. The person decides. · Suggest — The model proposes. A person chooses, and sees why. · Prepare — The model does the work. A person reviews it first. · Execute — The model acts. A person can watch, stop and undo it. Return path: Every level keeps a way back to a person. |
| E authority | lead | Decided per action, never once per feature: the consequence, whether it reverses, the evidence and the way back. | Set per action, never once per feature, from what the action changes and whether it reverses. |
| Record | block | `record` (E) with its own title "Responsibility record" and meta "One per consequential AI scenario" under the band head | an eight-tile icon grid (`signals`, four across): the record's name is the band's eyebrow, so there is one head |
| Record | eyebrow / lead | Written down once / The responsibility record follows the product into design and engineering. | The responsibility record / One record for every AI scenario that matters, kept through design and engineering. |
| Record | questions | Which decision or task deserves assistance? · What may the model produce or influence? · What data and sources support the output? · What can happen without human approval? · What counts as useful and safe performance here? · Who answers for the result when it is wrong? · How can a person correct or reverse the result? | Which task deserves assistance? · What may the model influence? · Which sources support the output? · What happens without human approval? · What counts as useful and safe here? · Who answers when the result is wrong? · How can a person reverse the result? (one line each at 390; Uncertainty unchanged) |
| Record | Recovery icon | undo-left | refresh (undo-left is B's "Changes nobody can undo") |
| Record | position | after the statement | after the thread, before the offer (no two bands without an image are adjacent, § 5.1 rule 1) |
| K offer | points | The user work worth assisting · The product state the model touches · The authority it should receive (titles only) | The work worth assisting — The decision or task where help changes the outcome. · The state it touches — The records and screens the model may read or change. · The authority it receives — What it may do alone, and what waits for a person. |
| Router | icons | cpu, users-group-rounded, shield-check, graph-up | none: the list router, so it no longer repeats the signals' icon tiles |
| Router | lead | Useful inputs: the user work, the current product state, and the authority you expect AI to receive. | Bring the user work, the current product state and the authority you expect the model to receive. |
| Router | position | before the FAQ | after the FAQ, the last band before the close |
| — | photos (src/lib/photos.ts § 5.6 row) | B pair-testing-overhead · K conversation-chalkboard · aside 2 pencil-wireframe-red | B workshop-brick-room · K pair-at-laptop-sticky-wall · aside 2 studio-whiteboard-crit (the router's aside) |
| — | stand-in pool | studio-session-talk, studio-whiteboard-crit, workshop-brick-room, hands-trackpad | studio-session-talk, pair-laptop-notebook (the other two are now slot photos, hands-trackpad is product-design's B) |

**Found in.** `kit/page-ai-product-ux` fix round 1, 6 Oct 2026.

### 8.2 Fix round 2 (6 Oct 2026)

The review found no proof moment at scale, the same icon-tile shape three times in four bands (B, the 4×2 record grid, K's points), B's counterweight reading as an empty placeholder, an undersized router aside, and photo swaps with effects on other pages. The page now runs 13 bands (hero, B, H, E spectrum, E thread, E record, K, J, D stat, M, D-faq, D router, L; the owner's ruling is not to cap section counts), every one ≤ 803 at 1470 and ≤ 1628 at 390. The one tile set left is B's. B carries four tiles, so the plan spends the texture placement on J's corner field rather than the counterweight.

| Band | Field | Old | New |
|---|---|---|---|
| B signals | tiles | two: Every answer re-checked · Changes nobody can undo | four: the two above, plus **NEW COPY, owner sign-off needed:** "Help nobody asked for — Output arrives in a form nobody requested, and fixing it takes longer than doing the work." (chat-round-dots; from the spectrum's first row) · "Nobody owns the error — When a result is wrong, no one can say who should have caught it, or where." (close-circle; from the record's Accountability question) |
| E record | block / eyebrow | an eight-tile icon grid (`signals`, four across) / The responsibility record | the `record` sheet: meta "One per AI scenario", title "Responsibility record", eight fields paired in two columns / Kept through delivery (the record's name is the sheet's title now) |
| E record | Accountability field | logged as NEW in § 8 | still NEW: it is the studio's eighth question, not CMS text ("Who answers when the result is wrong?"). **Owner sign-off needed.** Without it the heading goes back to seven questions and the sheet has a hole |
| K offer | body | The readiness assessment creates the first evidence, so the route is chosen from the work rather than the technology. | The readiness assessment names the work worth assisting, the state the model touches and the authority it receives, so the route is chosen from the work. |
| K offer | points | The work worth assisting — The decision or task where help changes the outcome. · The state it touches — The records and screens the model may read or change. · The authority it receives — What it may do alone, and what waits for a person. | none: folded into the body above, so K is copy beside its photograph rather than a third tile row |
| D stat | whole band | none (round 0 folded the stat into the FAQ) | eyebrow "Across AI products", heading "From framing into code", lead "Copilots, AI-native tools, AI-powered products and integrations: the same four strands of work in each.", stat 12 / "AI products we have worked on", four rows re-cut from the CMS's eight responsibilities: Framing and research · Interaction and control · Evaluation and acceptance · Prototypes into product |
| D-faq | questions | five, including "What has the work combined across twelve AI products?" | four: that answer is the stat band now |
| D router | lead | Bring the user work, the current product state and the authority you expect the model to receive. | none. The aside photograph takes the height instead (381 × 283, was 381 × 175), and the close already asks for the scenario |
| D router | route label | Human-in-the-Loop Workflows | Human‑in‑the‑Loop Workflows (U+2011 non-breaking hyphens, so it no longer wraps at a hyphen at 390) |
| Photos | B / K (src/lib/photos.ts, this page's row, and § 5.6's row) | workshop-brick-room / pair-at-laptop-sticky-wall (fix round 1) | pair-testing-overhead (back to § 5.6) / pair-laptop-notebook (3:2). Round 1's B is in five pages' stand-in pools, and its K is held for the home hero. Both swaps are reverted, and the § 5.6 note on the home hero is restored |
| Photos | stand-in pool | studio-session-talk, pair-laptop-notebook | studio-session-talk, team-laptops-table (pair-laptop-notebook is K now) |

**Template, not fixable here.** At 390 the spectrum's DataTable scrolls sideways, which hides two of its four columns. The Stat numeral is mono at ~48 px in ink, so it is not a display-scale moment. The case wells are short letterboxes. The thread is thin under a centred head. `columns` is a required content field on `signals` and `ledger`. No G band is possible until an attributable AI quote exists.

**Found in.** `kit/page-ai-product-ux`, fix round 2.
