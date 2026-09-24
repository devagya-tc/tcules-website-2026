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

- [ ] **0.1** Land `feat/content-section-per-heading`: Tag, the Prose changes, the route edits, both docs.
- [ ] **0.2** Put the brand framework in the repo at `docs/brand/`: illustration concept, image rules,
      product UI treatment, ch05 Imagery, ch10 Social. Every later task reads it, so it has to be
      readable from here.
- [~] **0.3** Brand rulings applied to ch05 v0.9 and ch10 v0.6 (24 Sep; see the addendum in
      `docs/dbf-ch05-amendments.md`). Still to decide, in ch05 §12: cut-outs at full column (02),
      the cover registry (03), the banner ratio (04), other card thumbnails (05), delivery (06),
      drawings on blue (07), client logos (08). In ch10 §F2: what signals the family (02), the QR frame
      (04), inks on brandeis-500 (05). ch02 Colour still lists brandeis-900 as a surface.
      Blocks 1.2 and every media variant.
- [ ] **0.4** Get `V10-REPORT.md` and `TESTIMONIAL-REGISTER-V10.csv`. They're referenced by the handoff
      but missing from the package. Blocks Phase 4.

## Phase 1 — Component audit (decide before building)

Read-only. The output is a decision, not code.

- [ ] **1.1** Write `docs/component-audit.md`. For each of the 25 shipped components, record:
      - **Jobs it must serve:** from the handoff's page families and semantic inventory.
      - **Arrangements it must offer:** from the brand's visual treatments. For example, PageHero
        currently has one left-aligned layout, but has to serve routing, situation-led, proof-led and
        article/definition intros, each with illustration, product capture, photography or no visual.
      - **What it has today:** read from its specimen.
      - **Brand fit:** no type on images, media kind (capture / cut-out / drawing), images checked at
        326px, and ink/blue reserved (addendum D). The ink/blue bands on routes today get reviewed here.
      - **Verdict:** keep · extend (new variants) · rebuild. Rebuild gets a sentence saying why.
      - **Missing components:** jobs nothing serves yet (logo strip, case selection, mechanism/steps,
        comparison, related content).
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
- [ ] **2.x** Figure/media: `kind` capture · cut-out · drawing. A capture takes the hairline; a cut-out
      takes no edge, one shadow and a contrast panel when needed; a drawing is never boxed (addendum B2–B5).
- [ ] **2.x** BlockCard: put `orientation` / `imageSide` to use. They have zero usages today.
- [ ] **2.x** Proof: portrait and client mark
- [ ] **2.x** DataTable (brief 10): the comparison job
- [ ] **2.x** *(rest from 1.3)*

## Phase 3 — Slice 1: `/services/product-design`

- [ ] **3.1** Semantic section view models in `src/content/types.ts`: Situation, Capability set,
      Mechanism, Proof, FAQ, Related, Enquiry. Map today's Strapi blocks onto them in the source.
- [ ] **3.2** `ServicePage` template in `src/templates/` + the section renderer.
- [ ] **3.3** Route down to composition only (~50 lines).
- [ ] **3.4** Handoff acceptance checks + Copy × UI review on the real page.

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
- [ ] **6.2** SEO/meta helper, canonical, social image. No FAQPage schema.
- [ ] **6.3** Draft preview, and an empty optional section renders nothing.
- [ ] **6.4** Strapi schema changes written up for the CMS owner.
- [ ] **6.5** Rewrite ch05 §9 placement specs from the shipped components (addendum B6).

## Parked (handoff says don't freeze yet)

Homepage · About · Careers · final positioning copy · migrating all 135 routes · share-preview generator.
