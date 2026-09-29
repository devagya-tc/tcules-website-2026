# Illustration concepts and asset inventory

**Status:** concepts · 28 September 2026 · tracker 1.4. No image has been generated.
**Reads:** `docs/visual-assets-plan.md`, `docs/brand/05 Imagery.html` (ch05 v1.0) §1, §4–§4d, §9a, §10.
**Content read from:** the live CMS on 28 Sep (6 service lines, 17 case studies, 17 blog entries, the About
page), and `V10-REPORT.md` §2 for each page's answer block.

Section numbers (§) are ch05's. Nothing here restates a ch05 rule; it applies them.

---

## How to read an entry

Each illustration gets four things:

- **Message:** the one line from §4, written before anything is made and filed with the asset.
- **Brief:** answered in §4d order: 01 idea · 02 item · 03 system · 04 route · 05 detail · 06 labels.
- **Vocabulary:** the §4b forms, devices, UI shorthand and echo treatments it uses.
- **Read-back:** what someone should say when they're shown it with labels off and no message in front of
  them, plus the most likely wrong reading. If the wrong reading is what comes back, it gets remade (§4).

**Held by every entry, so not repeated:**
- One carried item in peridot, solid once. One solid blue plane.
- Made for paper and paper-deep, exported once per ground (§4a, §9a).
- No figures, no numbers, and the annotation layer is removable.
- Checked with labels off at the smallest placement.

**Smallest placement.** Every illustration in this file except the case-study covers sits in `PageHero` (or a
`Figure`), because non-case-study cards carry no media (§9). So the smallest size to check is the **326px
mobile column**, with no 160px check.

**The set has to vary.** CLAUDE.md § Design quality applies across the set as well as within a page. The six
service lines appear together on `/services` and in the nav's mental map, so each uses a different lead form
(recorded in the summary table below). Two readers comparing them should not see the same picture six times.

**The ch05 examples are not assets.** Intent → shipped, The Seam, The Cutaway and Closed loop show the method.
They're never placed on a page as they are, and they will be refined too (ruling, 28 Sep). Every page in this
file gets its own illustration.

**Generated, not drawn.** `node scripts/illustrations/build.mjs` writes every illustration to
`docs/illustrations/`, one SVG per ground, with the labels in their own group. Every point is placed by the
§4a formula. Round 1 (service lines) is published for review.

---

## 1 · Service lines (6) · round 4 concepts

**Status:** concepts, written, awaiting a ruling. Nothing is drawn. Rounds 1–3 are superseded; the generator in `scripts/illustrations/` stays for when drawing restarts.

**Frame** (28 Sep):
- Each concept comes from what its own page argues. The six are independent concepts, and each gets the construction that suits it.
- Everything carries up. The top layer is the end goal, and nothing flows down except a return path that means recovery or feedback.
- The standard is complexity in simplicity, with the Intent Stack as the model: the item changes form at every layer, and every device means something where it sits.
- Kept: left-facing, not much wider than tall, and the round-2 Design Systems deck unchanged inside its new concept.

### 1.1 Product Design: Surface last

**What it means at Tcules.** Product Design at Tcules takes an unresolved product condition and resolves it into a designed, evaluated experience. The page's own argument is that the visible interface is only part of the problem: a confusing screen is often expressing an unclear rule, such as who owns a piece of work, what a role may do, or what state a record is in. Tcules works backwards from that condition, through the product model and its behaviour, and designs the screen last.

**Idea.** The screen is the last thing resolved.

**Message.** A clear screen is the last thing to be resolved: it stands on evidence, a product model and designed behaviour beneath it.

**Item.** One product decision: who owns a piece of work. This is the page's own reassignment example.

**Construction.** Four planes rising, like the Intent Stack. What makes it different is that the item changes kind at every layer, from signal to rule to behaviour to control, rather than only becoming more finished.

| Layer (top = end goal) | Plane | The item, here | What it means |
|---|---|---|---|
| 4 · Interface | Paper, a finished screen | One solid control. The prior owner sits beside it as a small mark | What the person sees is the rule, made operable |
| 3 · Behaviour | Paper, outline wireframe | A row of three state tiles joined by connectors: assigned, reassigned, restored | The rule now has behaviour, including recovery, not just the happy path |
| 2 · Product model | The blue plane, dots now ordered | One tile with one solid connector to one owner seat, a dashed connector to a delegate, and history as three thin stacked tiles | The doubled outline has resolved to one. The model permits exactly one owner |
| 1 · Product condition | Paper, loose dot field | The work tile with two offset dashed outlines, claimed by two role marks whose connectors cross | A doubled outline is a rule nobody has settled |

**Read-back target.** "Something tangled at the bottom gets settled, then given behaviour, then becomes one clear control at the top."

**Risk.** Structurally the closest to the Intent Stack. It is kept distinct by the item changing kind, and by the doubled outline resolving to a single one.

### 1.2 Product Modernisation: Rebuilt around what people rely on

**What it means at Tcules.** Modernisation at Tcules is for established software whose interface, model, workflow and implementation have become one problem. Tcules gives every capability its own verdict (preserve, repair, redesign, replatform, rebuild or retire) and protects continuity across operations, concepts, data and access, so the people using it never have to start again.

**Idea.** Every part gets its own verdict, and what people rely on carries up untouched.

**Message.** Every part of an established product gets its own verdict, and the work people rely on arrives in the new version exactly where they left it.

**Item.** The workflow people rely on most.

**Construction.** Three planes. The middle one is a sorting layer, where each part gets its verdict. Two cylinders stand unbroken from the bottom plane to the top one: data and access continuity. The new product rests on what was carried through.

| Layer (top = end goal) | Plane | The item, here | What it means |
|---|---|---|---|
| 3 · New version | Paper, clean | Solid, in the same position and the same shape as at the bottom | Conceptual continuity: nobody has to relearn where it is |
| 2 · Verdicts | The blue plane | Named echo with its patch removed, still in place. Kept tiles unchanged, rebuilt tiles dashed over dots, the retired tile faint with nothing above it | Each part sorted on its merits. The empty slot above the retired tile is the retirement |
| 1 · Current product | Paper, a regular grid of capability tiles | A built tile with a small off-grid patch stuck to it. Patches and dots on other tiles too | Patches are workarounds, and dots are accumulated debt |

**Also.** Pillars: two cylinders from plane 1 to plane 3, uninterrupted. They are the data and access that the change must not break.

**Read-back target.** "A cluttered old product is sorted piece by piece and rebuilt, but one part keeps its place all the way up, and the whole thing rests on the same foundations."

**Risk.** Cylinders passing through the planes have to be drawn cleanly (occlusion at each plane). If they cost clarity, they go, and the item's unchanged position carries continuity alone.

### 1.3 Design Systems: One answer, everywhere

**What it means at Tcules.** A design system at Tcules is shared infrastructure, not a bigger library: a dependable answer to decisions that product teams would otherwise keep making alone. The failure it prevents is drift. The same component name behaves differently in Figma and in code, teams fork it, and old versions linger. The page's test is that one shared decision must survive every representation: semantic definition, token, design component, runtime component, documentation and release.

**Idea.** Many local answers become one, and it holds in every representation.

**Message.** A decision each team was making alone becomes one shared answer that means the same thing in the token, the design file, the code and every product that ships it.

**Item.** One recurring product decision. This is the page's own example, the status "Partly complete".

**Construction.** A drift plane at the bottom, and above it the blue system plane carrying the round-2 deck (the construction you called good), standing as it did then. The products are the tallest panels at the back of the deck, so the sequence rises as it goes.

| Layer (top = end goal) | Plane | The item, here | What it means |
|---|---|---|---|
| Top · Products | The tallest standing panels | The identical tile: solid in one product, built echoes in the others | Same meaning where it ships |
| Middle · Representations | Standing panels on the blue plane: definition, tokens, component, code | The same tile at the same point on every face, joined by the dashed thread | The decision survives every representation |
| Base · The shared answer | The blue plane | One definition tile with its states listed, and a small token row beside it | Four versions collapse into one |
| Bottom · Drift | Paper, dot field | Four dashed echoes of different sizes and proportions, scattered across four product footprints | One decision, remade four ways. This is the Intent Stack's unequal circles, used for drift |

**Read-back target.** "Four slightly different versions of something at the bottom become one, and that one appears identically on every panel and in every product above."

**Risk.** The round-2 deck stays as it was: its order, spacing and thread are not re-derived. Only the drift plane beneath it and the rising product panels are new.

### 1.4 AI Product UX: Authority is earned

**What it means at Tcules.** AI Product UX at Tcules designs the relationship between people, models and product state. It decides which role the model plays (generate, recommend, retrieve, act) and records, for each one, the evidence behind an output, its uncertainty, what it may do without a person, and how it is reversed. The page's line is that an interface should never carry more certainty than the system has earned.

**Idea.** An output gains authority only as it earns it.

**Message.** A model's output gains authority only as it earns it: shown with its evidence, chosen by a person, and reversible once it acts.

**Item.** One proposed action.

**Construction.** Four planes rising. This is the round-2 stack (model, review, product) with a sources plane added beneath it. Here the item's change is in certainty: dot density is how sure the system is.

| Layer (top = end goal) | Plane | The item, here | What it means |
|---|---|---|---|
| 4 · Product | Paper, finished UI | The chosen action, solid. A dashed undo connector runs back down to the person | It acts, and it can be reversed |
| 3 · Review | Paper | Three discrete option tiles, each tied by a thin connector down to the source it rests on. One person's station, and one option chosen (spec'd echo). The other two stay dashed blue | The evidence is visible, and a person decides |
| 2 · Model | The blue plane, dense paper dots | Three glimmers of different density rising out of it | Uncertainty: the looser the dots, the less the system knows |
| 1 · Sources | Paper | Outlined document blocks with text bars | What the model reads, and what an output can later point back to |

**Read-back target.** "A fuzzy cloud of suggestions becomes three clear options tied to their sources, a person picks one, and only that one reaches the product, with a way back."

**Risk.** Four planes with options and connectors is the densest of the six. The option connectors to sources must stay short and orthogonal, or the review layer turns into wiring.

### 1.5 Design Engineering: Changes shape, keeps its meaning

**What it means at Tcules.** Design Engineering at Tcules keeps product intent alive when the work becomes software. A design can be persuasive in a prototype and still weaken in production: real data expands, permissions remove actions, latency creates in-between states, narrow screens change the reading order. Tcules answers those questions in running code, and it judges the result by behaviour and meaning, not by pixel identity.

**Idea.** Pressure-tested in code, the interaction that ships has changed shape, not meaning.

**Message.** Real data, permissions, delays and small screens push on every design; in code the interaction changes shape to survive them, and keeps its meaning.

**Item.** One interaction: a primary control and what it shows.

**Construction.** Three planes rising. The middle one is where four pressures act on the item, each drawn as its own device. The top shows the item in a new proportion on the same plumb line. The shape is allowed to differ from the bottom one, and that difference is the point.

| Layer (top = end goal) | Plane | The item, here | What it means |
|---|---|---|---|
| 3 · Shipped | Paper, finished UI | Solid, in a new proportion (taller, stacked), with every pressure resolved. The thread still passes through it | Correspondence is behavioural, not pixel identity |
| 2 · Code, real conditions | The blue plane | Named echo, visibly stressed. Real data: text bars run past its edge. Permission: one part removed, left as a dashed gap. Latency: one part a pending dot field. Narrow screen: a frame forces it to stack | Four ways reality pushes on a design, each one legible |
| 1 · Static design | Paper, dashed | A clean, ideal tile, spec'd and dashed, with empty surroundings | The perfect case, before anything real touches it |

**Read-back target.** "A neat design gets squeezed and pulled by real conditions and comes out at the top in a different shape but still the same thing."

**Risk.** Four pressures on one small tile could merge at 326px. If they do, the tile gets larger rather than the pressures getting smaller, and at most one pressure is dropped.

### 1.6 Software Development: Split, built, whole

**What it means at Tcules.** Software Development at Tcules is design-led: product decisions, their consequences and the implementation constraints stay connected through delivery, instead of static screens being handed to engineering without the states and rules they need. A release is a product slice across interface, services, integrations and data, accepted at three levels. People can complete the work, the system stays coherent, and the team can deploy and watch it. What production shows feeds the next decision.

**Idea.** One decision becomes the parts it needs, built as one connected piece and released whole.

**Message.** One product decision becomes the interface, the service and the data it needs, built as one connected piece and released as one working capability.

**Item.** One capability.

**Construction.** Four planes rising. The item splits and rejoins: one tile at the bottom, three connected parts in the middle, one composite at the top. The parts never lose their connectors on the way up.

| Layer (top = end goal) | Plane | The item, here | What it means |
|---|---|---|---|
| 4 · Release | Paper, finished UI | The three parts rejoined as one solid capability. A small observation chart beside it, with a dashed line back down to layer 1 | Released whole, and what it shows feeds the next decision |
| 3 · Build | Paper | Each part built and raised on a plinth, with the data part as a cylinder. Connectors now solid | Implemented and still wired: no part is finished alone |
| 2 · Contract | The blue plane | The tile split into three nodes (interface, service, data) joined by connectors | The technical contract: what each part owes the others |
| 1 · Decision | Paper | One tile, with its edge states beside it as three small tiles: empty, error, no permission | The design arrives with its states, not as a static screen |

**Read-back target.** "One thing splits into three connected parts, each is built, and they come back together as one working piece at the top."

**Risk.** Splitting and rejoining must read as one item, not four. Every appearance is peridot, and the parts keep the tile's proportions, so they read as pieces of it.

Review page (round 4 concepts): https://claude.ai/artifact/DN4zFLKJcsh2Nx2Ph9YY3u

---

## 2 · How we work (1)

### 2.1 How we work · `/how-we-work`

**Message.** Every engagement starts from one decision, the evidence already in hand and the people who can
make it.

**Brief.**
1. **Idea:** `DECISION FIRST`.
2. **Item:** the product decision.
3. **System:** a flat plane on a dashed ground diamond, read left to right.
   - **Left:** a repeated tile field (the evidence already available).
   - **Centre:** the **solid blue plane**, a smaller square with three marked tiles (seats) around its edge:
     the people authorised to decide.
   - **Right:** one standing panel in dashed outline (the work that follows, not yet built).
4. **Route:**
   - Solid once, on a plinth on the blue plane: the decision, made.
   - A path runs from the tile field into it along the axis.
   - A spec'd echo on the dashed panel beyond it.
5. **Detail:** the tile field is plain blocks, a few with text bars. No dot field.
6. **Labels:** chip → the solid decision. Part labels: `EVIDENCE`, `WHAT FOLLOWS`.

**Vocabulary:** flat plane, plinth, standing panel · dashed ground diamond, repeated tile field · block, text bar ·
spec'd + shipped · path.

**Read-back.**
- **Expected:** "Material on one side and people around a table lead to one thing being decided, and only then
  does the next thing start."
- **Risk:** seats around the blue plane can read as the §9a "Together, in real time" cover (Auxentios, §4.3).
  They never appear on one page, so it's acceptable, but it's worth knowing.

---

## 3 · Audits (6)

The audit is the concept, and its evidence is the deliverable (visual-assets-plan). Each hero draws the one
thing its audit *finds*. The `/audits` index is a text-card listing and takes none.

| Audit | Message | Lead form |
|---|---|---|
| UX Product Audit | Following the workflow back finds the one step causing the friction the team keeps seeing | Flat plane, nodes |
| Design System Audit | Following one component from library to product shows the place it forked | Stack of three + thread |
| Design-to-Code Audit | Tracing one decision from design to the running screen shows the step that never carried it | Left-to-right chain |
| Product Modernisation Assessment | Of the routes forward, one is chosen on evidence and tested first | Plane + three candidate planes |
| AI Product UX Readiness | An AI feature is committed to only once what it may act on is fenced | Plane with a drawn boundary |
| Prototype Hardening Review | A convincing prototype shows one state, and hardening finds the ones it never drew | Standing panel over a tile field |

### 3.1 UX Product Audit · `/audits/ux-product-audit`

**Message.** Following the workflow back finds the one step causing the friction the team keeps seeing.

**Brief.**
1. **Idea:** `THE CAUSE`.
2. **Item:** the step causing the friction.
3. **System:** one flat plane, the **solid blue plane**, carrying a row of nodes joined by right-angled
   connectors, running left to right.
4. **Route:**
   - Glimmers (loose peridot dots in a dashed ink ring) at two downstream nodes: the symptoms.
   - A path runs back *leftward* along the connectors to an upstream node, lifted on a plinth, where the item is
     solid.
5. **Detail:** nodes as blocks with paper text bars. Nothing else.
6. **Labels:** chip → the solid node. Part label: `SYMPTOM` at a glimmer.

**Vocabulary:** flat plane, plinth · connector, block, text bar · glimmer + shipped · path.

**Read-back.**
- **Expected:** "The trouble shows up late in the flow, but the lifted step earlier on is where it comes from."
- **Risk:** the glimmers read as three separate items. Guard: all peridot is one item (§4b), so the path must
  visibly *join* the glimmers to the solid node.

### 3.2 Design System Audit · `/audits/design-system-audit`

**Message.** Following one component from library to product shows the place it forked.

**Brief.**
1. **Idea:** `WHERE IT FORKS`.
2. **Item:** a component.
3. **System:** a stack of three planes, bottom to top: design file, code library (the **solid blue plane**),
   product. A dashed ink thread holds the component's position through all three.
4. **Route:**
   - Spec'd echo on the design plane.
   - Named echo on the blue plane, both on the thread.
   - Solid once on the product plane, **offset from the thread**: the shipped copy has drifted.
   - A second, faint dashed outline marks where it should have been.
5. **Detail:** sparse text bars on the product plane. The design plane carries a dot grid.
6. **Labels:** chip → the solid, offset component. Part labels: `LIBRARY`, `PRODUCT`.

**Vocabulary:** stack (three) · dashed ink thread · dot field, text bar · spec'd + named + shipped.

**Read-back.**
- **Expected:** "The same part lines up down through the layers, except at the top, where it has moved."
- **Risk:** the offset is too small to see at 326px, so it reads as a plain continuity picture (Intent →
  shipped). Guard: offset by at least one full item width, and keep the "should be here" dashed outline.

### 3.3 Design-to-Code Audit · `/audits/design-to-code-audit`

**Message.** Tracing one decision from design to the running screen shows the step that never carried it.

**Brief.**
1. **Idea:** `THE LOST STEP`.
2. **Item:** a product decision.
3. **System:** four objects on one dashed ground, left to right:
   - a design block,
   - a component on a plinth,
   - a test plane (the **solid blue plane**),
   - a standing panel (the running screen).
4. **Route:**
   - Spec'd echo in the design block, then a built echo on the component.
   - A path runs along the axis.
   - On the blue test plane there is an **empty dashed slot where the echo should be**, and the path runs
     around it rather than through it.
   - Solid once on the running screen.
5. **Detail:** the screen is plain shorthand. The test plane has paper text bars.
6. **Labels:** chip → the empty slot. Part labels: `DESIGN`, `RUNNING`.

**Vocabulary:** flat plane, plinth, standing panel · text bar, block · spec'd + echo + shipped · path.

**Read-back.**
- **Expected:** "The same thing appears at every step except one, which it skips."
- **Risk:** highest in the audit set. An absence is harder to read than a presence.
- **Two notes:**
  - The chip points at the empty slot rather than the solid item. That's a deliberate departure from §4b's
    "chip points at the solid item", and it needs a ruling before it's made.
  - If the ruling goes against it: point the chip at the solid screen, and let the missing echo carry the
    message by structure alone.

### 3.4 Product Modernisation Assessment · `/audits/product-modernisation-assessment`

**Message.** Of the routes forward, one is chosen on evidence and tested first.

**Brief.**
1. **Idea:** `ONE ROUTE`.
2. **Item:** the chosen route's first test.
3. **System:**
   - Front: the existing product, the **solid blue plane**.
   - From its back edge, three right-angled routes lead to three small planes in dashed outline: the options.
4. **Route:**
   - Two routes are plain blue dashed connectors.
   - The third is the peridot path, ending in a plinth on its option plane, where the item is solid.
   - The other two options stay empty.
5. **Detail:** paper text bars on the blue plane. The options have no detail.
6. **Labels:** chip → the solid test. Part label: `OPTIONS`.

**Vocabulary:** flat plane ×4, plinth · connector · shipped (no echo: this concept has no stages, §4b) · path.

**Read-back.**
- **Expected:** "Several ways forward from the current product, one picked and started."
- **Risk:** "evidence" isn't drawn. That's accepted: the message line carries "on evidence", and drawing it
  would be a second idea.

### 3.5 AI Product UX Readiness · `/audits/ai-product-ux-readiness`

**Message.** An AI feature is committed to only once what it may act on is fenced.

**Brief.**
1. **Idea:** `ACTION BOUNDARY`.
2. **Item:** the AI's action.
3. **System:**
   - A product plane with a dashed rectangular boundary drawn on it, enclosing a few blocks: what the AI may
     touch.
   - Beneath it, the sources: the **solid blue plane** with a paper dot field.
4. **Route:**
   - Named echo on the sources plane.
   - A dashed ink thread up to the product plane.
   - Solid once, *inside* the boundary, beside a marked tile (the person who acts on it).
5. **Detail:** outside the boundary, the product's other blocks are plain and untouched.
6. **Labels:** chip → the solid action. Part label: `SOURCES`.

**Vocabulary:** stack (two), flat plane · dashed ink thread · dot field, block, mark · named + shipped.

**Read-back.**
- **Expected:** "The AI's output lands only inside a marked-off area of the product."
- **Risk:** the dashed boundary reads as "not built yet" (§4a: dashed = context, limit or unbuilt).
  "Limit" is in that list, but the reading is ambiguous.
- **Not drawn:** the page names four things (user decision, source basis, action boundary, failure path).
  This draws two of them. One message (§4).

### 3.6 Prototype Hardening Review · `/audits/prototype-hardening-review`

**Message.** A convincing prototype shows one state, and hardening finds the ones it never drew.

**Brief.**
1. **Idea:** `MISSING STATES`.
2. **Item:** a screen state.
3. **System:**
   - Front: a standing panel, the prototype, polished.
   - Behind it, on the ground: a repeated tile field of states. This is the **solid blue plane**, carrying a
     grid of tiles.
   - The panel is outline-only, because the message is the relationship between front and back (§4a
     occlusion).
4. **Route:**
   - Solid once on the panel.
   - Behind it: spec'd echoes on three tiles (states the review has now drawn).
   - The rest of the tiles are paper dot fields (unresolved).
5. **Detail:** the panel carries a heading bar and text bars. It looks finished.
6. **Labels:** chip → the solid state. Part label: `UNRESOLVED`.

**Vocabulary:** standing panel, flat plane · repeated tile field · dot field, heading bar, text bar · spec'd +
shipped.

**Read-back.**
- **Expected:** "The finished-looking screen in front is one of many states, most of which are still blank."
- **Risk:** the outline-only panel reads as unbuilt. Guard: the panel's solid heading bar and full shorthand
  must say "finished".

---

## 4 · Case studies · §9a · *parked 28 Sep*

> **Parked.** Covers and client work are out of scope for now. This is kept as a record and is not being
> worked on.

**17 published case studies** in the CMS on 28 Sep (the plan's "~15").

**What changed.** Every §9a input comes from the record: CMS profile, the problem/solution statement,
categories and tags. "What changed" (the one noun phrase §9a requires) isn't a CMS field today. It's derived
here from the solution statement and should be confirmed by the case owner. It's already on
`docs/strapi-changes.md` as a field.

**Step 0 depends on clearance.** Step 0's "UI available" means shipped or client-approved *and cleared per
§10*. No written approval is on file anywhere this repo can see (§5). Every "product UI" result below is
therefore **conditional on approval being confirmed**. Where approval can't be shown, the case falls through
to steps 1–4, and its fallback archetype is recorded.

**What the checks are.** The 326/160 checks are *predicted* from the current thumbnails and body images, not
measured on a finished asset. §9a says to record "the result of both checks", so each entry says "predicted"
until the asset exists.

### Results

| # | Case | Kind | Row (illustration) or part (UI) | Stopped at |
|---|---|---|---|---|
| 1 | Benchmark Gensuite | **Product UI** | The scope selector panel | 0 |
| 2 | BuildTwin | **Product UI** | One review-feed item: a check and its evidence | 0 |
| 3 | OmnyAI | **Product UI** | The AI suggestion side panel | 0 |
| 4 | Dealpath | **Product UI** | The existing-deal check before *Add to pipeline* | 0 |
| 5 | Novus Insights | **Product UI** | The prompt-to-survey generator | 0 |
| 6 | Doodle | **Product UI** | The availability grid with bookability marked | 0 |
| 7 | Eden AI | **Product UI** | The unified search entry point | 0 |
| 8 | Kirana store (payments) | **Illustration** | Activity · Research, modifier Field, mobile | 1 |
| 9 | Gold Image Printing | **Illustration** | Domain · Workflow and automation | 2 |
| 10 | Ryzeo | **Illustration** | Domain · Analytics | 2 |
| 11 | Scissors | **Illustration** | Domain · CRM | 2 |
| 12 | ConnectX | **Illustration** | Domain · AI assistant | 2 |
| 13 | Auxentios | **Illustration** | Use · Together, in real time | 4 |
| 14 | The Wandering Raven | **Blocked** | No row fits | — |
| 15 | GT Tools | **Blocked** | No row fits | — |
| 16 | The Chain Hut | **Blocked** | No row fits | — |
| 17 | OctiFi | **Blocked** | No row fits | — |

**7 product UI · 6 illustration · 4 blocked on a registry row.** §9a says: "Stop. Add a registry row … and have
it approved before anything is made. An agent never invents a motif outside the registry." The rows proposed
in §4.3 are proposals only, not approved.

### 4.1 Product-UI covers

| Case | What changed | Step 0 | Cover (3:2, one part) | Banner (16:9, up to five parts) | Source material |
|---|---|---|---|---|---|
| **Benchmark Gensuite** · enterprise EHS suite | the scope selector every application in the suite shares | UI: published. Part, not process: yes. 326 ✓ / 160 ✓ predicted: a bounded panel with tabs | The selector panel whole (a panel with its own edge is one part, §2a) | Selector + its Current/My/All tabs lifted + one result row | Current thumbnail is already close to a cut-out. 7 body images |
| **BuildTwin** · AEC, AI drawing QC | the evidence-led review feed that replaced the checklist | UI: published. Part: yes. 326 ✓ predicted. 160 ✓ only if one feed item, not the feed | One feed item: sheet thumbnail, status, AI reasoning | Two or three feed items + the pass/raise-issue controls | Current thumbnail shows the feed as a cut-out; a single item has to be cut from it. 7 body images |
| **OmnyAI** · Amazon listings AI | AI suggestions moved into a side panel the user chooses from | UI: published. Part: yes. 326 ✓ / 160 ✓ | The *AI Proposition* card | Side panel + the listing field it adds to + the *AI Listing* control | `docs/brand/omny-card-*.png`, `omny-detail-benefits.png`: cut-outs already made for ch05. `ui-mock-panel.png` in Claude Design only (over the 256 KB sync limit) |
| **Dealpath** · real-estate acquisitions | the existing-deal check before a listing enters the pipeline | UI: published. Part: yes. 326 ✓ predicted. 160: risk, the check is a dialog with text | The existing-deal check dialog | Listing summary + *Add to pipeline* + the check dialog as overhang | Thumbnail has two listing cards with property photos and a JLL mark (third-party content stays in its own colour, §2a). 5 body images |
| **Novus Insights** · survey generation | a questionnaire generated from one prompt | UI: published. Part: yes. 326 ✓ / 160 ✓ | The *Generate new survey* prompt field | Prompt field + the generated question list + the edit control | Thumbnail shows both parts. 4 body images |
| **Doodle** · enterprise scheduling | a bookability score on every candidate slot | UI: published. Part: yes. 326 ✓ predicted. 160: the grid's silhouette is one shape; the score detail won't read, which is acceptable at 160 | The availability grid with its highlighted bookable rows | Grid + the meeting-priorities panel | Thumbnail is a grid capture. 4 body images. The score values need a §2 redaction check |
| **Eden AI** · AI developer platform | one search box as the single entry point for building a workflow | UI: published. Part: yes. 326 ✓ / 160 ✓ | The unified search component | Search + one resulting workflow node + *Run workflow* | `docs/brand/ui-mock-flow.png` and `ui-mock-node.png` are Eden AI cut-outs already (node, not search). 9 body images |

**Adjacency (§9a "Across a page").** Four of the seven covers are panels (Benchmark, OmnyAI, Dealpath, Novus).
A listing must not put two panel covers next to each other. Interleave them with BuildTwin (a feed item),
Doodle (a grid), Eden (a field) and the illustration covers.

**Fallback archetypes** if approval isn't confirmed (steps 1–4, run anyway):

| Case | Fallback |
|---|---|
| Benchmark | Activity · Modernisation (primary deliverable: "Enterprise UX modernisation") |
| BuildTwin | Domain · AI assistant. Industry would also fire (a structural engineer's accountability is an AEC constraint), but domain is step 2 and stops first |
| OmnyAI | Domain · AI assistant |
| Dealpath | Use · Desk, dense data. Institutional real estate isn't a registered domain or industry, and the challenge names no regulation or site constraint |
| Novus | Domain · AI assistant |
| Doodle | Domain · Productivity ("the tile in motion" is the meeting slot) |
| Eden AI | Domain · Workflow and automation |

Three AI-assistant fallbacks would make adjacency hard on any AI-heavy listing. That's another reason to get
the approvals.

### 4.2 Illustration covers

Each cover is the registry row verbatim plus the emphasis and a message line (§9a Generation). Covers are
checked at 160 and 326. Cover subject area: the central 4:3. Banner subject area: 45–70% of the height.

**Kirana store (payments research).**
- **Inputs:**
  - Activity: UX research (stakeholder and user interviews, personas, strategy).
  - Domain: payments. Industry: fintech.
  - Use: retailers on a phone.
  - UI: one image; the output was a direction.
  - What changed: *a product direction grounded in what retailers actually need*.
- **Steps:**
  - Step 0: what changed is a process outcome, so illustration.
  - **Step 1: primary deliverable is research, so Activity · Research.**
- **Modifier:** Field, mobile, as the small standing panel the cluster points toward.
- **Motif:** "A loose dot field on a dashed ground, gathering into a few clustered tiles".
- **Emphasis:** the cluster that became the finding, solid peridot.
- **Message:** *What retailers said gathers into the one need the app is built around.*
- **Read-back risk:** the modifier panel competes with the cluster. Keep it small and dashed (not built).

**Gold Image Printing (web-to-print ERP).**
- **Inputs:**
  - Activity: redesign (a product surface).
  - Domain: ERP / order workflow.
  - Industry: print.
  - Use: staff at desks.
  - What changed: *the print order's path from storefront to production*.
- **Steps:**
  - Step 0: the whole ERP and storefront changed, not one part, so illustration.
  - Step 1: no.
  - **Step 2: Workflow and automation.**
- **Motif:** "Nodes on a plane joined by right-angled connectors".
- **Emphasis:** the node where work changes hands: the handover from online order to production.
- **Message:** *An order passes from the storefront to the print floor without stopping at a manual step.*
- **Current cover:** tablet in hand, which fails (device chrome).

**Ryzeo (marketing automation).**
- **Inputs:**
  - Activity: redesign.
  - Domain: marketing automation. Its problem is named as "reports that didn't provide actionable insights".
  - What changed: *a report a marketer can act on*.
- **Steps:**
  - Step 0: the statement lists six changes and no single part, so illustration.
  - **Step 2: Analytics** is chosen over Workflow, because the challenge leads with the reports.
- **Motif:** "A plane carrying a chart in the UI shorthand (§4b): bars of varied height that stand for data, not
  a plot of it".
- **Emphasis:** the bar that answers the question.
- **Message:** *Of everything the report shows, one figure tells the marketer what to do next.*
- **Current cover:** laptop on a pedestal, which fails.

**Scissors (temporary staffing).**
- **Inputs:**
  - Activity: research + object-oriented UX, then redesign.
  - Domain: staffing / ATS.
  - What changed: *the candidate record every workflow is built around*.
- **Steps:**
  - Step 0: an object model isn't a cut-out part, so illustration.
  - Step 1: no. Research fed a product surface, so the surface is the primary deliverable.
  - **Step 2: CRM.**
- **Motif:** "One central plinth with connectors to the seats around it".
- **Emphasis:** the shared record.
- **Message:** *Shortlists, talent pools and jobs all read from one candidate record.*
- **Flag:** staffing software filed under CRM is a judgement call. It's the closest registered domain (a
  shared-record product), and it's recorded here so it can be checked.

**ConnectX (building energy, AI-native).**
- **Inputs:**
  - Work: product definition + working demonstration.
  - Domain: AI-native workspace.
  - Industry: energy.
  - What changed: *a workspace that assembles around the question the user brings*.
- **Steps:**
  - Step 0: what changed is a model of the product, not a part, so illustration.
  - Step 1: no. The demonstration is a product surface.
  - **Step 2: AI assistant.**
- **Motif:** "An input tile feeding a stack of planes, one output tile beside it".
- **Emphasis:** the output a person reviews.
- **Message:** *One question in, and the workspace returns the view that person needs.*
- **Note:** the current thumbnail (a map with sites) would make a good *body* cut-out.

**Auxentios (CPQ, heavy industry).**
- **Inputs:**
  - Activity: MVP design.
  - Domain: CPQ.
  - Industry: heavy industry.
  - Use: sales teams building quotes together.
  - What changed: *one quotation built together from configured products*.
- **Steps:**
  - Step 0: collaboration across tools is a process around the product, so illustration.
  - Step 1: no.
  - Step 2: CPQ is not registered.
  - Step 3: the challenge names tool fragmentation (SAP, Salesforce), not an industry constraint, so no.
  - **Step 4: Together, in real time.**
- **Motif:** "Seats around one shared plane".
- **Emphasis:** the shared plane, which is the quote.
- **Message:** *Everyone configuring the order works on the same quote.*
- **Current cover:** laptop, which fails.

**Adjacency.** The six archetypes are all different, so any order of these six passes §9a.

### 4.3 Blocked: registry rows to approve

Four cases reach "No row fits". The proposals below are the drafted rows §9a asks for (motif, default
emphasis, sample message line), built only from §4b forms. **They need approval before anything is made.**
Once approved, they go into ch05 §9a (the chapter's registry) via `docs/dbf-ch05-amendments.md`, not here.

| Case | Why nothing fits | Proposed row |
|---|---|---|
| **The Wandering Raven** · creative-writing LMS, ages 8–18 | Step 0: the whole platform changed. Steps 1–3: redesign; learning isn't a registered domain; age isn't one of §9a's "shaped by industry" constraints. Step 4: none of the four uses fits | **Domain · Learning**. Motif: *a path of tiles rising in steps across a plane, one tile lifted as the next to do*. Emphasis: *the next step a learner takes*. Sample: *Each lesson opens the next one in reach.* |
| **GT Tools** · Shopify store, windshield repair kits | Whole site (search, navigation, product pages). Commerce isn't registered. No industry constraint. No use row fits a shopper | **Domain · Commerce** (serves both). Motif: *a plane of product tiles in rows, one lifted onto a plinth beside a single block*. Emphasis: *the product the shopper picks*. Sample: *Among everything on offer, the right product reaches the basket.* |
| **The Chain Hut** · Magento jewellery store | Same as GT Tools | Domain · Commerce. **Adjacency:** GT Tools and The Chain Hut would share an archetype, so a listing must never put them next to each other (§9a) |
| **OctiFi** · YC microlending app | Whole app flow. Lending isn't registered. The challenge names compliance, but the registered row "Legal and compliance" is an industry of legal work, not fintech | **Industry · Financial services**. Motif: *a short run of tiles on a plane, left to right, the last one a plinth*. Emphasis: *the moment the loan is issued*. Sample: *Sign-up, checks and approval run as one short path to the loan.* Current cover: phone frame, which fails |

**Alternative:** rule these four as having no cover for now, and show a text card. §9a says every project has a
cover, so that would itself need a ruling. The recommendation is to approve the rows.

---

## 5 · Articles and insights (13)

**Scope.** The 13 are the blog entries under articles, guides and the top level. Two videos and two *My
Experiments with UX* interviews are the podcast/video family (photography, per visual-assets-plan) and are
excluded.

**How the messages were written.** Titles and TLDRs were read. Bodies were not read for most of them.
- **"Title"** means the message is derived from the title and is **provisional**: an editor confirms it
  against the body before a brief is generated. That's a content ask, deferred rather than blocking.
- **"TLDR"** means it was read from the article's TLDR.

§4d order is compressed into columns.

| Article | Message | 02 Item | 03 System (blue plane) | 04 Route | Vocabulary | Read-back risk |
|---|---|---|---|---|---|---|
| **silent-ui-regression-debt…** (title) | Small interface regressions pile up unseen long before any metric moves | a regression | A stack of release planes, time rising. A flat chart plane beside it, **blue**, bars level | Built echo on each release, growing. Solid on the top release. The chart does not change | stack, chart, repeated tile | Medium: the flat chart has to read as "unchanged", not "empty" |
| **confidence-scores-don't-fix-trust…** (TLDR) | Trust comes from the review step handing control back, not from a score | control of the decision | AI plane (**blue**, dot field) → review tile → the person's station | Named echo on the AI plane. Path to review, *then back* to the station, solid there | stack (two), plinth, path, dot field | Medium: close to AI Product UX (1.4); the return path is the difference |
| **building-trust-and-transparency-in-AI-first-UIs** (title) | An AI answer earns trust when the sources it came from stay visible beneath it | the answer | An outline-only answer plane over a sources plane (**blue**): front–back relationship, §4a | Solid answer on top. Echoes on two source blocks, joined by a thread | stack, dashed ink thread, block | Low |
| **design-systems-for-saas…** (title) | Every screen is assembled from the same few shared parts | the shared tile | Registry "Design system" motif as a hero: a field of identical tiles (**blue**) and larger blocks built from them | Solid in one block. Echoes in the field | repeated tile field, block | Low. Must not look like the Design Systems hero (1.3); this one has no products |
| **guides/how-to-use-a-ux-product-audit** (title) | Following the workflow back finds the one step causing the friction | — | **Reuse 3.1 UX Product Audit** | — | — | Recommend reuse: same subject, and one asset fewer |
| **guides/saas-onboarding-strategies…** (title) | A new user reaches a first real result before being asked to set up anything else | the first result | Left-to-right run of step tiles on a plane (**blue**). Later setup steps drawn dashed, deferred | Path along the run. Solid at the second tile. Spec'd echoes on the deferred tiles | flat plane, repeated tile, path | Medium: deferred vs "not built" (dashed means both) |
| **guides/marketing-automation-software-design…** (title) | A campaign is built as one visible flow from trigger to message | the campaign | Nodes and connectors on a plane (**blue**) ending in a standing panel (the inbox) | Path along the connectors. Solid on the panel | flat plane, standing panel, connector | Medium: overlaps the Gold Image cover (Workflow). Never adjacent, so acceptable |
| **9-ux-design-tips…ecommerce-conversion** (title; listicle) | Every step between product and checkout that can be removed is removed | the purchase | A run of tiles, product → checkout, on a plane (**blue**). Removed tiles drawn in dashed outline | Path skips the dashed tiles. Solid at checkout | repeated tile, path | High: a list of nine tips has no single idea. This picks one. Needs editorial confirmation |
| **8-proven-strategies…saas-engagement** (TLDR) | What users do feeds straight back into the product | a feature | Two stacked planes: the product above, usage (**blue**) below | Solid where it ships. Echo in usage. The path loops down the left edge and back up the front | stack (two), path, dot field | Medium: the ch05 Closed loop test shares this message. Draw it new, not from that file |
| **articles/design-thinking-vs-cx-vs-ux** (title) | A product's UX sits inside the customer's whole experience of the company | the moment of use | A small plane inside a larger dashed plane (CX), outline-only | Solid on the inner plane, echo on the outer | flat plane ×2, dashed ground | High: the title names three things. Design thinking (a method) is left out on purpose, as one message |
| **guides/inclusive-product-design…** (title) | One control made clear and forgiving serves every person who reaches it | the control | One plane (**blue**) with seats at different distances and heights (places, not figures) | Solid control at the centre. Connectors to each seat | flat plane, mark, connector | High: "different people" without figures is hard. Seats must differ in *position* only, never treatment (§4a mixed treatment) |
| **guides/landing-page-design-guide…** (title) | Every block on the page leads the reader to the one action | the action | A standing page panel of blocks (**blue** ground plane under it) | Connectors from each block converge on the heading bar, solid | standing panel, block, connector | Low |
| **articles/cognitive-biases-in-ecommerce-and-saas** (title) | How a choice is framed moves which option people take | the chosen option | Three identical tiles on a plane (**blue**), one inside a drawn frame | Solid on the framed tile. Echoes on the other two | repeated tile field, plinth | Medium: the frame must read as framing rather than selection |

**Count.** 12 new illustrations + 1 reuse of 3.1 (same subject).

---

## 6 · Inventory: what's cleared for use · *parked 28 Sep*

> **Parked**, with §4. No approval or consent records exist yet, and none are being chased.

### 6.1 The finding first

**Nothing in this repo records written client approval (§10) or team consent (§3).**
- Searched: `docs/`, the handoff package, the brand folder.
- The testimonial register, which might carry some of it, is parked with the content asks (tracker 0.4).

Every client asset below is *published on the live site today*. That suggests approval was given at some point,
but §10 asks for the record, filed with the asset, "before any public use", and a cut-out is a new use. The
same goes for team photography.

**The ask** (added to `docs/content-changes.md`): for each client and each photographed person, where the written
approval or consent lives, and what surfaces it covers. Until that's answered, "cleared" below means
"published", and nothing new gets made from it.

### 6.2 Client work

| Client | CMS hero / thumbnail | Body images | Usable as a cut-out source? | Notes |
|---|---|---|---|---|
| The Wandering Raven | cover 4376×2917 · thumb 2560² | 6 | Partly | Thumbnail is a cut-out-style composition. It carries photographs of children in the client's own course cards: client content, not our photography, but flag it before a cover is built around it |
| Benchmark Gensuite | hero 12641×7114 · thumb 2560² | 7 | **Yes** | Scope selector already near cut-out. Names in the UI (Lilia Sanchez, Bhushan K S) need a §2 redaction check |
| Auxentios | cover 2188×1459 · thumb same | 4 | Not the covers | Covers are a laptop mockup (fails §9a). Body images unchecked |
| Gold Image Printing | cover 2188×1459 · thumb same | 3 | Not the covers | Tablet in hand (fails) |
| BuildTwin | hero 9600×4000 · thumb 2560² | 7 | **Yes** | Feed composition in the thumbnail |
| Ryzeo | cover 2188×1459 · thumb same | 4 | Not the covers | Angled laptop, which is perspective (fails §2a) |
| OmnyAI | hero 4800×2000 · thumb 2560² | 2 | **Yes** | Cut-outs already exist in `docs/brand/` (made for ch05) |
| Dealpath | hero 4800×2000 · thumb 2560² | 5 | **Yes** | Property photos and a JLL mark are client content |
| GT Tools | banner 2560² (hero = thumb) | 4 | Body only | Product-page capture. The case is blocked anyway (§4.3) |
| Scissors | cover 2188×1459 · thumb 2560² | 4 | Body | Dashboard cut-out, dense |
| ConnectX | hero 4800×2000 · thumb 2560² | 6 | **Yes, for the body** | Map-and-sites card |
| Kirana store | cover 2188×1459 · thumb same | 1 | No | Phone in a pocket (device, fails). Only one body image |
| Novus Insights | cover 4376×2917 · thumb 2560² | 4 | **Yes** | |
| The Chain Hut | cover 4376×2917 · thumb 2560² | 2 | Body only | Page-layout capture |
| Doodle | cover 4000×3000 · thumb 2560² | 4 | **Yes** | Score values need a redaction check |
| Eden AI | cover 4000×3000 · thumb 2560² | 9 | **Yes** | Cut-outs exist: `docs/brand/ui-mock-flow.png`, `ui-mock-node.png` |
| OctiFi | cover 4376×2917 · thumb 2560² | 1 | No | Phone frame (fails). Only one body image |

- **Files:** all in Cloudinary (`res.cloudinary.com/dbay1gb0s`). Masters at 2188px wide and above clear §8's
  2560 master only where they're 2560+, so **Auxentios, Gold Image, Ryzeo, Kirana and Scissors' covers are
  under-size masters**. None of those five is used as a cover anyway.
- **Every current cover fails §9a** in at least one way (device frames, perspective, whole screens or type on the
  image), so all 17 get new covers.
- **Also in the brand folder:** `v3-capture.webp` and `poster-c-table.png`, which are ch05/ch10 examples, not
  inventory. `v3-portrait.png` is 292² and matches the size of the About profile pictures.

### 6.3 Team and studio photography

From the About page (the only CMS page with photographs; careers carries icons only). Each is checked against
§3/§3a on content. Light, camera and tone can't be judged at contact-sheet size.

| Image | What it shows | Against §3 |
|---|---|---|
| About hero (5696×3224) | Holi celebration in the studio, whole team, faces to camera, hands up | **Fails**: posed, eye contact, more than six recognisable faces. Also can't be a hero behind type (addendum B1) |
| About §2 · 1 (1280×760) | Team group outdoors, posed | **Fails**: outdoor location, posed, more than six faces |
| About §2 · 2 (960×720) | A session: one presenting to a seated room, studio | **Passes on content** (§1a: a session, captioned as one) |
| About §2 · 3 (936×1262) | Wall of stickies mid-workshop, a hand writing | **Passes**: studio surface. Check nothing on the wall belongs to a client |
| About §3 · 1 (636×624) | Two people at a projected screen | Passes on direction. **Check the screen**: legible work on it must not be client work (§3) |
| About §3 · 2 (636×624) | Two people at one monitor | **Passes**: environmental, the §3 model shot |
| About §3 · 3 (912×624) | Presenter at a whiteboard, three seated | **Passes**: a session |
| About §3 · 4 (912×624) | Group selfie outdoors | **Fails**: outdoor, eye contact |
| About §3 · 5 (636×624) | Three people standing and talking in a non-studio room | **Borderline**: not visibly the studio (§3 Backgrounds) |
| About §3 · 6 (636×624) | Two people at a desk, talking | **Passes** |
| Profile cards: Rushali, Mihir, Shoghi (292² each) | Individual portraits | Size is **under master** for any placement above 146px at 2×. Framing unchecked |
| Byline portraits: Shoghi Bagul, Yash Bhatt, Preksha Kharidia, Jatin Leuva | `blogProfileSection.profilePicture` on 13 articles | Mapped in the CMS, not rendered (visual-assets-plan). "Tcules" and "Editorial Team" bylines carry a picture that isn't a person, so they need a no-portrait state |

**Summary.** Six About images pass on content, and every one of them is under 2560 on its long edge, so
none meets the §8 master. They can serve as interim blocks on About at their native size. The shoot
(visual-assets-plan Sequence 4) is still needed for masters, bylines and careers.

---

## 7 · Open

1. **Round 3 review** of the six service-line illustrations (link in §1).
2. **3.3 Design-to-Code Audit.** ch05 §4b says the concept chip points at the solid item. This audit's finding
   is a step that is *missing*, so the natural target is an empty slot. The question is whether the chip may
   point at the empty slot. If not, the drawing has to show the gap without a label.

**Next:** round 4 of the service lines from the round 3 review, then How we work and the six audits, to the same standard.
