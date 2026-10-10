---
route: /tools/ai-product-ux-readiness-check
slug: ai-product-ux-readiness-check
page_name: AI Product UX Readiness Check
page_type: tool
seo:
  title: 'AI Product UX readiness check: free worksheet | Tcules'
  description: Review one AI use case for purpose, authority, evidence and recovery. Download unresolved product decisions and the tests needed before release.
  canonical: https://www.tcules.com/tools/ai-product-ux-readiness-check
  robots: index,follow
social:
  og_title: 'AI Product UX readiness check: free worksheet | Tcules'
  og_description: Review one AI use case for purpose, authority, evidence and recovery. Download unresolved product decisions and the tests needed before release.
  og_image: https://www.tcules.com/assets/og/tools.png
  og_image_alt: Tcules social card headed Tools, on a white background with the Tcules wordmark.
  og_type: website
  og_url: https://www.tcules.com/tools/ai-product-ux-readiness-check
  og_site_name: Tcules
  og_locale: en_GB
  twitter_card: summary_large_image
  twitter_title: 'AI Product UX readiness check: free worksheet | Tcules'
  twitter_description: Review one AI use case for purpose, authority, evidence and recovery. Download unresolved product decisions and the tests needed before release.
  twitter_image: https://www.tcules.com/assets/og/tools.png
search_context:
  primary_intent: check whether an AI feature is ready to build
  primary_buyer_question: Which product decisions and interaction tests remain open for this AI use case?
  supporting_questions:
  - What evidence should I record?
  - How should I interpret an unknown or a gap?
  - What can I take into the next team review?
  key_entities:
  - AI product UX
  - human oversight
  - AI failure and recovery
  - evaluation
  - AI feature design
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
  - name: AI Product UX Readiness Check
    url: /tools/ai-product-ux-readiness-check
render:
  band_order:
  - how-to-use-it
  - workspace
  - reading-your-results
  - what-this-does-not-tell-you
  - next
page_composition:
  visual_plan: tool_record_and_worked_example
  tool:
    id: ai-product-ux-readiness-check
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
      how-to-use-it: argument_thesis
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
    supports_section: how-to-use-it
    communication_job: Show the actual tool or a representative interactive state.
    asset_uri: null
    alt_caption_intent: Describe what the artefact demonstrates, not merely what it looks like.
    mobile_treatment: Preserve the decision-relevant detail; use a crop or progressive reveal instead of shrinking dense artefacts below readable size.
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
content_governance:
  master_contract: Tcules Website V11, Editorial Embodiment & Visual Proof Pass
  repair_pass: V10.1_AUDIT_REPAIR
  editorial_pass: V11_EDITORIAL_EMBODIMENT_VISUAL_PROOF
  pre_review_repair: V11.1_PRE_REVIEW_REPAIR
  language: en-GB
---

*Free tools · AI product decisions*

# Work out what still needs deciding before your AI feature ships

The AI Product UX Readiness Check tests whether one AI use case is ready for product work, including what the AI may do, what users can inspect and how mistakes are handled. An AI feature that drafts a reply and one that sends it are different products to the person responsible for the customer relationship.

You leave with unresolved decisions and tests for the next product review.
[Check one AI use case](#workspace)

## Treat an unknown as a release question, not a score {#how-to-use-it}
In the AI Product UX Readiness Check, an unknown means the team does not yet have enough evidence or an accepted decision for that item. Keep it open rather than scoring it as a failure or assuming a default. The next useful step is to identify what evidence, owner or product decision would close it.

Name the user, the task and the change the AI is meant to make. Record how the person does that work today. Bring someone who understands the task and someone who can explain the feature's actual behaviour.

Use evidence available, decision only, open or not applicable for each check. A written decision is useful, but it is not evidence that the interaction works.

## Build a decision record before judging AI readiness {#workspace}

| Decision area | Questions to answer | Evidence worth bringing |
|---|---|---|
| Purpose | What outcome improves? What would make the AI version worse than the current route? | A real task and a comparison plan |
| Authority | Does the AI suggest, prepare or act? Which action needs approval? Who is accountable? | Role rules and the actual confirmation path |
| Basis | What data supports the output? What happens when sources are missing, stale or contradictory? | Representative inputs and visible source behaviour |
| Failure | What specific wrong result matters? How is it detected and contained? | A deliberately failed or ambiguous example |
| Recovery | What can be corrected? Which effects cannot be undone? Who handles downstream changes? | A tested recovery path and named responsibility |
| Evaluation over time | What will you observe after release? When should the feature be limited or withdrawn? | Evaluation cases, monitoring owner and decision criteria |

Record each unresolved question separately. That makes it possible to assign the permission rule to one owner and the recovery test to another.

## A missing decision should produce a test, not a prediction {#reading-your-results}

Worked example, not a client result. A support assistant prepares a reply using an account record. The record may be out of date, and the interface does not show when it was last refreshed.

The finding is an untested stale-data condition. The next test is to use an outdated account record and observe whether the reviewer can detect and correct the error before sending. The product decision is what the assistant should do when freshness cannot be established.

Review unresolved authority and recovery questions before enabling consequential actions. Purpose questions need a task comparison. Missing source behaviour needs representative inputs. A decision with no test belongs in the evaluation queue. These categories do not add up to a release score.

## This check covers the interaction around the model {#what-this-does-not-tell-you}

The questions draw on [Microsoft's human-AI interaction guidelines](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/) and the context, measurement and responsibility concerns in the [NIST AI RMF playbook](https://airc.nist.gov/airmf-resources/playbook/).

The AI Product UX Readiness Check does not assess model performance, security, privacy or regulatory compliance. Those reviews may change what the interaction is allowed to do. A complete record here is a product-review input, not permission to launch.

## Take one consequential output further {#next}

Use the [AI Trust and Control Canvas](/tools/ai-trust-control-canvas) to specify inspection, approval and recovery for the output carrying the greatest consequence.

If the team needs help resolving the questions against its product, bring the record to a conversation about [AI Product UX](/services/ai-product-ux).

