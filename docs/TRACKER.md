# Tracker — Design Engineer handoff

**The one list of what's next.** Work top to bottom. A phase starts when the one above it is done,
unless a task says otherwise. Update it in the same PR as the work: tick the box and add the PR number.

`[ ]` todo · `[~]` in progress · `[x]` done · `[-]` dropped (say why)

Inputs: `Tcules-Design-Engineer-Handoff-Package/` (handoff docx, content system, Copy × UI standard),
the brand framework (see 0.2), `docs/visual-assets-plan.md`, `docs/dbf-ch05-amendments.md`.

**Every task is done when:** `npm run verify` passes · the specimen has been updated · it has been
checked at 1440 and 390 · the Copy × UI hard gates pass (CU01, 03, 06, 10, 16, 21, 23, 25) · the
fix lives in the component or its tokens, not in a route.

---

## Phase 0 — Base

- [x] **0.1** Land `feat/content-section-per-heading`: Tag, Texture, the Prose changes, the route edits. (#55)
- [x] **0.2** Put the brand framework in the repo at `docs/brand/`: illustration concept, image rules,
      product UI treatment, ch05 Imagery, ch10 Social. Every later task reads it, so it has to be
      readable from here. First copy `b539e13`; re-pulled at v1.0 on 28 Sep.
- [x] **0.3** Brand guidelines complete (25 Sep): ch02, ch05 and ch10 at v1.0 in Claude Design. There are no
      open, deferred, draft or void items left, and every rule is consistent with every other.
      Record: `docs/dbf-consistency-check-2026-09-24.md`.
- [x] **0.4** `V10-REPORT.md` is in the package. `TESTIMONIAL-REGISTER-V10.csv` is deferred with the
      other content asks (see Parked). The design work is content-agnostic for now.
- [x] **0.5** Two running lists, added to *while* the work happens rather than written up at the end:
      `docs/content-changes.md` (copy and structure changes a component needs, for Devagya) and
      `docs/strapi-changes.md` (CMS recommendations, for the CMS owner). Strapi is not our work: we
      design the right thing, make the recommendation, and move on. The first entry is the
      component ↔ Strapi mirroring rule.
- [x] **0.6** Client-logo rules and the cover registry are final in ch05 v1.0 (25 Sep).
- [ ] **0.7** Bring the Claude Design templates in line with ch10 v1.0 (moved out of the chapter on 25 Sep):
      - `social-posts-v3`: marked phrase as the drawn rectangle (A5); paper on cover, closer and more than half the frames; hinge on ink or brandeis-500; `#d6e0ff` → brandeis-100.
      - `hiring-poster`: marked phrase as A5; two peridot marks (illustration, date); labels become ch05 §4b concept chip and part labels; `#9bb200` → peridot-600; QR on paper or paper-deep, ruled; mono 20 → 22px; margin 80; distances on the ladder; file message lines per ch05 §4.
      - `hiring-poster-detail`: marked phrase as A5; remove the blue fact panel, chips and two body columns (terms line and QR row carry them); margin 80; distances on the ladder; floor 22px.

## Phase 1 — Component audit (decide before building)

Read-only. The output is a decision, not code.

- [ ] **1.0** Revisit the foundations before the components that sit on them: the type ladder
      (H1/H2 and card-heading wrapping with real long titles), the gap scale, the Section/Layout
      grid and breakpoints, media ratios, focus states. Most of it has shipped; this checks it against
      the handoff's "build now" list and the brand framework, and records what to refine.
- [ ] **1.1** Write `docs/component-audit.md`. For each of the 25 shipped components, record:
      - **Jobs it must serve:** from the handoff's page families and semantic inventory.
      - **Arrangements it must offer:** from the brand's visual treatments. For example, PageHero
        currently has one left-aligned layout, but has to serve routing, situation-led, proof-led and
        article/definition intros, each with illustration, product capture, photography or no visual.
      - **What it has today:** read from its specimen.
      - **Brand fit:** no type on images, media kind (capture / cut-out / drawing), images checked at
        326px, and ink/blue reserved (addendum D). The ink/blue bands on routes today get reviewed here.
      - **Verdict:** keep · extend (new variants) · rebuild. Rebuild gets a sentence saying why.
      - **Missing jobs:** jobs nothing serves yet (logo strip, testimonial group, case selection,
        mechanism/steps, comparison, related content). **A job is not a component.** First show
        whether existing pieces already compose it; a logo strip, for example, is Figures in a
        Cluster. Only propose a new component if the composition needs something of its own:
        markup or semantics, behaviour, or an arrangement the primitives can't express. If not,
        the answer is a composition in the template.
- [ ] **1.2** Comp the five contexts from `visual-assets-plan.md` in Claude Design, using the audit's
      verdicts. Do the no-visual version first. This is where "is it beautiful" gets answered, before
      any code does.
- [ ] **1.3** Fill in Phase 2 below from 1.1 + 1.2: one task per component, in dependency order.

## Phase 2 — Component overhaul

One component per PR: spec → `/build-from-spec` → specimen with stress rows (shortest and longest
real copy, long proper nouns, 390 wide) → `/audit-component`. The list is filled by 1.3; the rows
below are known already.

- [ ] **2.x** PageHero: arrangements × media treatments (from 1.1)
- [ ] **2.x** CtaSection: `open` leaves ~466px of dead ground when there's no proof (visual-assets-plan)
- [ ] **2.x** Figure/media: `kind` capture · cut-out · illustration. A capture takes the hairline; a cut-out
      takes no edge, one shadow and a contrast panel when needed; a drawing is never boxed (addendum B2–B5).
- [ ] **2.x** BlockCard: put `orientation` / `imageSide` to use. They have zero usages today.
- [ ] **2.x** Proof: portrait and client mark
- [ ] **2.x** DataTable (brief 10): the comparison job
- [ ] **2.x** *(rest from 1.3)*

## Phase 3 — Slice 1: `/services/product-design`

- [ ] **3.1** Semantic section view models in `src/content/types.ts`: Situation, Capability set,
      Mechanism, Proof, FAQ, Related, Enquiry. Shape them as the components' content props, not
      after today's Strapi response. Keep the adapter in `sources/strapi/service.ts` as thin as it can be
      while the page still renders. Anything that doesn't map cleanly goes on `docs/strapi-changes.md`
      and isn't solved here.
- [ ] **3.2** `ServicePage` template in `src/templates/` + the section renderer.
- [ ] **3.3** Route down to composition only (~50 lines).
- [ ] **3.4** SEO/meta helper: unique title and description, canonical, social image, robots. No
      FAQPage schema. Analytics hooks at component boundaries (CTA to contact, form start/error/complete,
      case-study clicks). The handoff lists both as "build now", so the first slice ships with them.
- [ ] **3.5** Handoff acceptance checks + Copy × UI review on the real page. The first two checks
      matter most: changing copy or proof needs no code change, and reordering an allowed section
      needs no schema change.

## Phase 4 — Slice 2: `/audits/design-to-code-audit`

- [ ] **4.1** Reuse Phase 3. New only where an audit genuinely differs: what's examined, the deliverable, the boundary.
- [ ] **4.2** Count the new components it needed. More than two means Phase 3's sections were too
      specific: fix them before going on.

## Phase 5 — Slice 3: ConnectX case study

- [ ] **5.1** Reusable records as view models: Client, Testimonial, Case Study, Proof/Metric, Media.
- [ ] **5.2** Proof and logo strips reference records instead of copying text.
- [ ] **5.3** Case-study template: artefacts, outcomes with their evidence state, related work.

## Phase 6 — Rollout and plumbing

- [ ] **6.1** Remaining services, audits and expertise onto the templates.
- [ ] **6.2** Draft preview, and an empty optional section renders nothing.
- [ ] **6.3** Hand over `docs/strapi-changes.md` to the CMS owner, and `docs/content-changes.md` to Devagya.
- [ ] **6.4** Rewrite ch05 §9 placement specs from the shipped components (addendum B6).

## Parked (handoff says don't freeze yet)

Homepage · About · Careers · final positioning copy · migrating all 135 routes · share-preview generator.

**Content asks, addressed later.** The design is content-agnostic for now, so nothing here blocks
a phase: `TESTIMONIAL-REGISTER-V10.csv` (quote text behind the v10 quote IDs) · anything logged in
`docs/content-changes.md`.
