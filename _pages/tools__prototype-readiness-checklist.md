---
route: /tools/prototype-readiness-checklist
slug: prototype-readiness-checklist
redirect_from:
- /tools/prototype-hardening-checklist
page_name: Prototype Readiness Checklist
page_type: tool
seo:
  title: Prototype readiness checklist and build brief | Tcules
  description: Separate demonstrated behaviour, simulation and unknowns in a prototype. Download a build brief with decisions, dependencies and acceptance checks.
  canonical: https://www.tcules.com/tools/prototype-readiness-checklist
  robots: index,follow
social:
  og_title: Prototype readiness checklist and build brief | Tcules
  og_description: Separate demonstrated behaviour, simulation and unknowns in a prototype. Download a build brief with decisions, dependencies and acceptance checks.
  og_image: https://www.tcules.com/assets/og/tools.png
  og_image_alt: Tcules social card headed Tools, on a white background with the Tcules wordmark.
  og_type: website
  og_url: https://www.tcules.com/tools/prototype-readiness-checklist
  og_site_name: Tcules
  og_locale: en_GB
  twitter_card: summary_large_image
  twitter_title: Prototype readiness checklist and build brief | Tcules
  twitter_description: Separate demonstrated behaviour, simulation and unknowns in a prototype. Download a build brief with decisions, dependencies and acceptance checks.
  twitter_image: https://www.tcules.com/assets/og/tools.png
search_context:
  primary_intent: assess a prototype and prepare a development brief
  primary_buyer_question: What has our prototype actually proved, and what must engineering still investigate or build?
  supporting_questions:
  - What evidence should I record?
  - How should I interpret an unknown or a gap?
  - What can I take into the next team review?
  key_entities:
  - AI-built prototype
  - Lovable
  - Bolt
  - v0
  - Figma Make
  - production readiness
  answer_unit_strategy: utility decision; worked interpretation; limitations; related practice
  buyer_question_evidence:
    source_registry: _system/buyer-question-coverage-v7.yaml
    editorial_method: manual_readthrough_in_v7
    questions_retained_or_exposed:
    - What evidence should I record?
    - How should I interpret an unknown or a gap?
    - What can I take into the next team review?
    questions_withheld: []
navigation:
  breadcrumb:
  - name: Home
    url: /
  - name: Tools
    url: /tools
  - name: Prototype Readiness Checklist
    url: /tools/prototype-readiness-checklist
render:
  band_order:
  - before-you-start
  - workspace
  - reading-your-results
  - what-this-does-not-tell-you
  - next
structured_data:
  types:
  - WebPage
  - BreadcrumbList
  organization_ref: https://www.tcules.com/#organization
  page_creator_ref: https://www.tcules.com/#organization
release:
  content_state: CONTENT_READY
  site_release_state: SITE_RELEASE_HOLD
  composition: NOT_COMPOSITION_VALIDATED
  production: NOT_PRODUCTION_VALIDATED
  free_audit_role: DOES_NOT_DEPEND_ON_FREE_AUDIT
  site_dependencies:
  - SITE_PRODUCTION_QA
  - MIGRATION_EXECUTION
  - SITEMAP_DEPLOYMENT
  - SOCIAL_IMAGE_ASSET_VALIDATION
  - HUMAN_MARKETING_REVIEW
  route_dependencies: []
  feature_dependencies:
  - TOOL_PRODUCTION_ACCEPTANCE
  legal_dependencies: []
migration:
  redirects_from: []
page_composition:
  visual_plan: tool_record_and_worked_example
  tool:
    id: prototype-readiness-checklist
    mount_anchor: workspace
    mode: manual_evidence_record
    processing: browser_only
    persistence: none
    export: markdown
    method_version: '2026-09-08'
  cms_contract:
    version: semantic-v11
  editorial_review:
    section_components:
      before-you-start: argument_thesis
      workspace: argument_thesis
      reading-your-results: argument_thesis
      what-this-does-not-tell-you: argument_thesis
      next: argument_thesis
  media_bindings: []
  commercial_system:
    testimonial_ids: []
    version: commercial-v11
    composition_rule: semantic_jobs_and_evidence_not_fixed_counts
  visual_requirements:
  - id: v11_tool_interface
    status: ASSET_REQUIRED
    supports_section: before-you-start
    communication_job: Show the actual tool or a representative interactive state.
    asset_uri: null
    alt_caption_intent: Describe what the artefact demonstrates, not merely what it looks like.
    mobile_treatment: Preserve the decision-relevant detail; use a crop or progressive reveal instead of shrinking dense artefacts below readable size.
content_governance:
  master_contract: Tcules Website V11, Editorial Embodiment & Visual Proof Pass
  repair_pass: V10.1_AUDIT_REPAIR
  editorial_pass: V11_EDITORIAL_EMBODIMENT_VISUAL_PROOF
  pre_review_repair: V11.1_PRE_REVIEW_REPAIR
  language: en-GB
---

*Free tools · From prototype to build brief*

# Show a developer what the prototype has proved and what it has skipped

The Prototype Readiness Checklist separates demonstrated behaviour, simulation and unknowns so engineering can see what a prototype has actually proved. The demo saves an order. That may mean it wrote to a database, stored something in this browser, or changed a number on the screen. Those are different starting points for a build.

You leave with the questions, dependencies and acceptance checks needed for a useful development brief.
[Review a prototype workflow](#workspace)

## Choose the decision this prototype was built to test {#before-you-start}

Was it meant to test demand, task comprehension, a difficult interaction or technical feasibility? Judge it against that purpose first. A prototype can answer its research question while deliberately leaving persistence, permissions and operational support unfinished.

Open the prototype and follow one workflow from start to finish. Use sample data you are authorised to work with. If you cannot determine how a behaviour works, record unknown and ask the builder; guessing creates a misleading brief.

## An unproven condition belongs in the build plan {#workspace}
In the Prototype Readiness Checklist, an unknown is behaviour the prototype does not establish. It is not automatically a defect. Record whether the missing answer concerns persistence, permissions, recovery, an external dependency or another product rule, then name the decision or implementation evidence required before the prototype becomes a reliable build reference.

| Inspect | Questions for the brief |
|---|---|
| Records and persistence | What gets saved, where, and what survives refresh or another session? |
| Roles and access | Who should see and change the record? Where are those rules enforced? |
| State and recovery | What happens during delay, failure, repeat submission or concurrent edits? |
| Dependencies | Which APIs, payments, messages or AI responses are real, mocked or still to be selected? |
| Product decisions | Which names, defaults, rules and states have been chosen deliberately? |
| Usability and access | Can the intended person complete the task with realistic content, narrow screens and keyboard input? |
| Evidence | What did participants actually do, what was observed and what remains untested? |

Record demonstrated, simulated, unknown or not applicable for each item. “Demonstrated” describes the recorded example; it does not imply production acceptance.

## A simulated success needs a different next step from a failed interaction {#reading-your-results}

Worked example, not a client result. An invitation flow always displays “Invitation sent”, but no email service is connected.

If the research question was whether a team owner understands invitations, the simulation may have served its purpose. The build brief still needs delivery behaviour, expired links, existing users, resend rules and what happens when delivery fails. A developer can then assess the implementation instead of estimating from the success screen alone.

Group the output into decisions to settle, research to run and implementation to scope. Give each item an owner and a check that would close it. Do not require every product decision to be settled before involving engineering; some need engineering evidence to become decidable.

## Production readiness needs more than this worksheet {#what-this-does-not-tell-you}

[GOV.UK's prototyping guidance](https://www.gov.uk/service-manual/design/making-prototypes) explains why realistic prototype code may not be suitable for production. This checklist does not audit security, infrastructure, data protection or code quality. Record the need for those reviews in the brief and assign them to the appropriate specialists.

## Bring the record into the build conversation {#next}

Download the brief alongside the prototype link. It should tell a developer which behaviour to preserve, which assumptions to challenge and what evidence is still needed.

For a practitioner review of one workflow, see the [Prototype Readiness Review](/audits/prototype-readiness-review). If the main uncertainty is whether the idea works for users, start with [Prototyping and Usability Testing](/services/product-design/prototyping-usability-testing).

