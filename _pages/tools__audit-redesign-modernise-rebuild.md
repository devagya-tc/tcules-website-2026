---
route: /tools/audit-redesign-modernise-rebuild
slug: audit-redesign-modernise-rebuild
page_name: Application Modernisation Options Worksheet
page_type: tool
seo:
  title: Free modernisation options worksheet | Tcules
  description: 'Compare modernisation options for one part of your product: record what you know, the cost of the move and the next test before you commit to a rebuild.'
  canonical: https://www.tcules.com/tools/audit-redesign-modernise-rebuild
  robots: index,follow
social:
  og_title: Free modernisation options worksheet | Tcules
  og_description: 'Compare modernisation options for one part of your product: record what you know, the cost of the move and the next test before you commit to a rebuild.'
  og_image: https://www.tcules.com/assets/og/tools.png
  og_image_alt: Tcules social card headed Tools, on a white background with the Tcules wordmark.
  og_type: website
  og_url: https://www.tcules.com/tools/audit-redesign-modernise-rebuild
  og_site_name: Tcules
  og_locale: en_GB
  twitter_card: summary_large_image
  twitter_title: Free modernisation options worksheet | Tcules
  twitter_description: 'Compare modernisation options for one part of your product: record what you know, the cost of the move and the next test before you commit to a rebuild.'
  twitter_image: https://www.tcules.com/assets/og/tools.png
search_context:
  primary_intent: compare application modernisation options and transition requirements
  primary_buyer_question: What would justify repair, redesign, replatforming or rebuilding this application capability?
  supporting_questions:
  - What evidence should I record?
  - How should I interpret an unknown or a gap?
  - What can I take into the next team review?
  key_entities:
  - application modernisation
  - options comparison
  - SaaS
  - transition cost
  - replatforming
  - refactoring
  - rebuild
  - retirement
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
  - name: Application Modernisation Options Worksheet
    url: /tools/audit-redesign-modernise-rebuild
render:
  band_order:
  - arguing-about-the-whole-product-is-the-mistake
  - workspace
  - step-4-test-the-rebuild-candidates-properly
  - step-3-read-the-pattern
  - reading-your-results
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
  route_dependencies:
  - CLAIM_EVIDENCE_VERIFICATION
  feature_dependencies:
  - TOOL_PRODUCTION_ACCEPTANCE
  legal_dependencies: []
migration:
  redirects_from: []
page_composition:
  visual_plan: tool_record_and_worked_example
  tool:
    id: audit-redesign-modernise-rebuild
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
      arguing-about-the-whole-product-is-the-mistake: argument_thesis
      workspace: argument_thesis
      step-4-test-the-rebuild-candidates-properly: argument_thesis
      step-3-read-the-pattern: argument_thesis
      reading-your-results: argument_thesis
      next: argument_thesis
  media_bindings: []
  commercial_system:
    testimonial_ids: []
    version: commercial-v11
    composition_rule: semantic_jobs_and_evidence_not_fixed_counts
  visual_requirements:
  - id: v11_tool_interface
    status: ASSET_REQUIRED
    supports_section: arguing-about-the-whole-product-is-the-mistake
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

*Free tools · Software modernisation decisions*

# Compare the rebuild with the options it would replace

The Audit, Redesign, Modernise or Rebuild worksheet compares credible options for one product capability, including the transition each option would require. A rebuild proposal can describe the destination in detail and leave the transition almost blank. Customers still need their records, integrations still run and someone has to support both versions until the move is complete.

You leave with an options brief: reasons for and against each route, missing evidence and the next test before commitment.
[Compare your options](#workspace)

## Name a capability with a boundary you can investigate {#arguing-about-the-whole-product-is-the-mistake}

Choose work such as creating a quote, approving an order or running a saved report. Record who depends on it, what is becoming costly and why change is being considered now. Include a product owner, an engineer and someone who understands its operational use.

Several capabilities may share the same data or service. Comparing them separately helps expose their needs; it does not make their technical boundaries independent.

## Build an options brief before choosing redesign, modernisation or rebuild {#workspace}

Compare at least two credible routes, including retaining the current capability where viable. For each, record the constraint it resolves, evidence, transition work, dependencies, acceptance conditions and the finding that would rule it out.

| Option | When it deserves investigation | What the comparison must include |
|---|---|---|
| Retain or repair | Current behaviour remains useful; a bounded issue creates the pressure | Ongoing support cost, vendor support and the consequence of delay |
| Redesign | The task, information or interaction is the main constraint | Existing-user learning, changed rules and enabling engineering |
| Rehost or replatform | Hosting or platform constraints drive the move | Compatibility, data meaning, integration behaviour and operating cost |
| Refactor or progressively replace | Selected boundaries can change while useful behaviour remains | Dependency separation, coexistence, migration and temporary work |
| Rebuild or replace with another product | Current implementation or product fit cannot justify further extension | Recovered business rules, fit gaps, total transition effort and exit conditions |
| Retire | Value no longer justifies continued operation | Dependants, contracts, retained records and a substitute where needed |

An audit is evidence-gathering before or during those choices. It is not an alternative architecture. “Modernisation” covers several of the interventions, rather than being one mutually exclusive option beside them.

## Compare the cost of reaching the new system {#step-4-test-the-rebuild-candidates-properly}

Include discovery, implementation, migration, integration changes, parallel operation, support, training and eventual retirement. Record the estimate range, time horizon, assumptions and source. Use unknown where the work has not been assessed; zero means there is evidence of no cost.

Do not add speculative revenue to a saving to manufacture a business case. Keep expected benefits separate from the cost comparison and identify how each could be measured.

## A saved report can make a small rebuild larger {#step-3-read-the-pattern}

Worked example, not a client result. A report builder is expensive to extend. Rebuilding its editor looks attractive, but saved queries depend on the old query service.

Compare a focused repair, an editor redesign using the existing service, and progressive replacement of the query boundary. Before selecting the third option, test whether representative saved reports return the intended results and whether old and new paths can operate together. If the boundary cannot support that, the proposed sequence must change.

Testing representative saved reports distinguishes the options. A generic “technical cost: high” rating does not.

## Keep unknowns separate from rejected options {#reading-your-results}

Mark each route candidate, needs evidence, ruled out or preferred for next test. A preference is provisional. Record the evidence and decision owner before presenting it as the agreed direction.

The worksheet is informed by [AWS's application portfolio assessment guidance](https://docs.aws.amazon.com/prescriptive-guidance/latest/application-portfolio-assessment-guide/introduction.html). It cannot inspect architecture, discover dependencies or produce a reliable quote from your answers. It makes the reasoning and investigation work visible.

## Take a decision brief into the modernisation conversation {#next}

Download the comparison and review it with the people who will own delivery and operations. If the options remain disputed, the [Application Modernisation Assessment](/audits/product-modernisation-assessment) investigates the boundary and next move.

When the direction is ready for delivery, see [Legacy Application Modernisation Services](/services/product-modernisation/legacy-software-modernisation).

