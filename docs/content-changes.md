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
| services/*, expertise/*, case-studies/*, audits/*, glossary/*, tools/*, insights articles, guides, podcasts and events, future-interfaces-lab/join | Home / … / *parent* (a link) | the h1 is the page's only name, so it is the current page |
| terms-of-use, privacy-policy, future-interfaces-lab, matter-design-system | none | the h1 is the name and the parent is Home; a lone "Home" is not a trail |

Eyebrows on services/* and expertise/* now stand under "Home / Services" or "Home / Expertise" and name the page ("Product Modernisation", "B2B SaaS and workflow software"). That is what an eyebrow under a trail may carry.

*Fix round, 6 Oct 2026.* An eyebrow that SAYS a crumb is a repeat, not only one that equals it (`src/lib/trail.ts`, `repeatsTrail`). Ten CMS eyebrows did, and the routes now drop them: "Product Design specialist" on the five product-design L2 pages (under "… / Product design"), "Product Design services" on /services/product-design (under "Home / Services"), "Design-System Strategy", "Design-System Implementation" and "Design-System Governance and Adoption" (under "… / Design systems"), and "Product audit" on /audits/ai-product-ux-readiness (under "Home / Audits"). Content need do nothing for the page to be right. When the records gain a short `name` (`docs/strapi-changes.md` § 16) the eyebrow field on these types can be retired; until then, an eyebrow written for them should be a category or format no crumb says.

**Found in.** Kit `fdn-top` review round, 5 Oct 2026.
